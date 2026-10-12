// Meta Messenger Webhook の受信ロジック（Next.js非依存・外部通信は注入された fetch のみ）。
// /api/messenger-webhook のルートはこの関数を呼ぶだけ。単体テストは scripts/test-messenger-webhook.ts。
//
// 方針: リードを失わない。「再送すれば直る可能性がある失敗」と「再送しても直らない失敗」を分ける。
//
//  [一時的障害 = 503 → Meta が再送。重複は eventKey で吸収]
//    Apps Script のタイムアウト／ネットワークエラー／HTTP 5xx／JSON以外の応答／busy(排他競合)／internal／結果件数の不一致
//  [設定不備 = 503 → 再送。ただし直るまで失敗し続けるため運用側で即対応が必要（ERROR config をログ）]
//    Apps Script が forbidden(共有シークレット不一致)／bad request／bad events、Webhook側の環境変数未設定
//  [再送しても直らない = 200]
//    リード以外のイベント（無視）。
//    Apps Script が個別イベントを rejected にした場合（eventKey が無い等。通常は到達不能）→ ERROR permanent をログ。
//    ※ 送信者ID・時刻・広告ID・回答が欠けたリードは rejected にせず、「データ不備」の要確認行として必ず保存する。
//  [Metaへの拒否 = 403/404/400/413]
//    署名不正・確認トークン不一致(403)、object が page 以外(404)、署名は正しいがJSON破損(400)、過大なボディ(413)
//
// Meta は失敗が1時間続くと購読を解除するため、503 が続く場合は運用側の通知が必要。
import { createHash } from 'crypto'
import { verifyChallenge, verifySignature, toRelayEvents } from './meta-webhook'
import { extractLeadEvents } from './kr-messenger-leads'

export interface WebhookEnv {
  appSecret?: string
  verifyToken?: string
  sheetUrl?: string
  sheetSecret?: string
  // 'shape' のみ有効（ペイロードの構造・種別・件数だけをログ。回答内容・ユーザーID・広告IDは出さない）。
  // それ以外の値（'answers' 等を含む）は無効扱い。回答内容はログに残さない設計。
  debug?: string
}

export type FetchLike = (
  url: string,
  init: { method: string; headers: Record<string, string>; body: string; signal: AbortSignal },
) => Promise<{ ok: boolean; status: number; text(): Promise<string> }>

export interface HandlerResult { status: number; body: string }

const MAX_BODY_CHARS = 1_000_000
const CHUNK_SIZE = 20 // Apps Script の1リクエスト上限(50)を超えないよう分割
export const FORWARD_TIMEOUT_MS = 4000 // Meta の応答期限（5秒）に収める。全チャンク合計の期限

type Log = (msg: string) => void
const hashPrefix = (s: string) => createHash('sha256').update(s).digest('hex').slice(0, 8)

export function handleGet(
  params: { mode?: string | null; token?: string | null; challenge?: string | null },
  env: WebhookEnv,
): HandlerResult {
  const c = verifyChallenge(params, env.verifyToken ?? '')
  return c ? { status: 200, body: c } : { status: 403, body: 'Forbidden' }
}

function describeShape(body: any): string {
  const parts: string[] = []
  for (const entry of Array.isArray(body?.entry) ? body.entry : []) {
    for (const m of Array.isArray(entry?.messaging) ? entry.messaging : []) {
      const keys = Object.keys(m || {}).sort().join(',')
      parts.push(`messaging{${keys}} referral.type=${m?.referral?.type ?? '-'} lead.items=${Array.isArray(m?.lead?.data) ? m.lead.data.length : 0}`)
    }
  }
  return parts.join(' | ') || 'no-messaging'
}

// Apps Script が返し得るエラーコード（固定集合）。それ以外はログに内容を出さない。
const RELAY_CONFIG_ERRORS = new Set(['forbidden', 'bad request', 'bad events'])
const RELAY_TRANSIENT_ERRORS = new Set(['busy', 'internal'])

export async function handlePost(
  req: { raw: string; signature: string | null },
  env: WebhookEnv,
  fetchImpl: FetchLike,
  log: Log = (m) => console.log(m),
  timeoutMs: number = FORWARD_TIMEOUT_MS,
): Promise<HandlerResult> {
  const retry: HandlerResult = { status: 503, body: 'retry' }
  if (!env.appSecret) { log('[messenger-webhook] ERROR config: app secret not set'); return { status: 503, body: 'not configured' } }
  if (req.raw.length > MAX_BODY_CHARS) return { status: 413, body: 'too large' }
  if (!verifySignature(req.raw, req.signature, env.appSecret)) { log('[messenger-webhook] invalid signature'); return { status: 403, body: 'Forbidden' } }

  let body: any
  try { body = JSON.parse(req.raw) } catch { return { status: 400, body: 'bad json' } }
  if (body?.object !== 'page') return { status: 404, body: 'not found' }

  if (env.debug === 'shape') log(`[messenger-webhook] shape: ${describeShape(body)}`)

  const events = extractLeadEvents(body)
  if (events.length === 0) return { status: 200, body: JSON.stringify({ ok: true, ignored: true }) }

  if (!env.sheetUrl || !env.sheetSecret || !env.sheetUrl.startsWith('https://')) {
    log('[messenger-webhook] ERROR config: sheet relay not set')
    return { status: 503, body: 'not configured' }
  }

  const relayEvents = toRelayEvents(events)
  const deadline = AbortSignal.timeout(timeoutMs) // 全チャンク共通の期限
  const total = { appended: 0, duplicate: 0, rejected: 0 }
  const rejectedKeys: string[] = []

  for (let i = 0; i < relayEvents.length; i += CHUNK_SIZE) {
    const chunk = relayEvents.slice(i, i + CHUNK_SIZE)
    let text: string
    try {
      const res = await fetchImpl(env.sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: env.sheetSecret, events: chunk }),
        signal: deadline,
      })
      if (!res.ok) { log(`[messenger-webhook] ERROR transient: relay http ${res.status}`); return retry }
      text = await res.text()
    } catch (e) {
      log(`[messenger-webhook] ERROR transient: relay failed (${(e as Error)?.name ?? 'error'})`) // 種別のみ
      return retry
    }

    let out: any
    try { out = JSON.parse(text) } catch { log('[messenger-webhook] ERROR transient: relay returned non-JSON'); return retry }

    if (out?.ok !== true) {
      const code = String(out?.error ?? '')
      if (RELAY_CONFIG_ERRORS.has(code)) log(`[messenger-webhook] ERROR config: relay refused request (${code}) - check KR_LEADS_SHEET_SECRET / Apps Script RELAY_SECRET`)
      else if (RELAY_TRANSIENT_ERRORS.has(code)) log(`[messenger-webhook] ERROR transient: relay ${code}`)
      else log('[messenger-webhook] ERROR transient: relay error (unrecognized)')
      return retry
    }

    const results: { key?: string; status: string }[] = Array.isArray(out.results) ? out.results : []
    if (results.length !== chunk.length) { log('[messenger-webhook] ERROR transient: relay result count mismatch'); return retry }
    for (const r of results) {
      if (r.status === 'appended') total.appended++
      else if (r.status === 'duplicate') total.duplicate++
      else if (r.status === 'rejected') { total.rejected++; rejectedKeys.push(hashPrefix(String(r.key ?? ''))) }
      else { log('[messenger-webhook] ERROR transient: relay unknown result status'); return retry }
    }
  }

  if (total.rejected > 0) {
    // 再送しても直らない（入力側の問題）。ここでは通常到達しない。リード内容はログに出さない。
    log(`[messenger-webhook] ERROR permanent: ${total.rejected} event(s) not stored (rejected, keyHash=${rejectedKeys.join(',')}) - recover from Page inbox / Ads Manager CSV`)
  }
  return { status: 200, body: JSON.stringify({ ok: true, ...total }) }
}
