// Webhook 受信ロジック／API Route のローカルテスト。外部通信・実スプレッドシート・実Metaには接続しない。
// 実行: npx tsx scripts/test-messenger-webhook.ts
import { createHmac } from 'crypto'
import { NextRequest } from 'next/server'
import { handleGet, handlePost, type FetchLike } from '../src/lib/messenger-webhook-handler'
import { makeAppsScriptEnv } from './lib/apps-script-mock'

let failed = 0
const eq = (name: string, actual: unknown, expected: unknown) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  if (!ok) failed++
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${ok ? '' : `\n   actual:   ${JSON.stringify(actual)}\n   expected: ${JSON.stringify(expected)}`}`)
}

const APP_SECRET = 'test-app-secret'
const RELAY_SECRET = 'relay-secret-0123456789'
const SHEET_URL = 'https://script.google.com/macros/s/TEST/exec'
const ENV = { appSecret: APP_SECRET, verifyToken: 'verify-tok', sheetUrl: SHEET_URL, sheetSecret: RELAY_SECRET }

const payload = () => ({
  object: 'page',
  entry: [{ time: 1791800000000, id: '1048217128385544', messaging: [
    { sender: { id: 'PSID_1' }, recipient: { id: '1048217128385544' }, timestamp: 1791800000000,
      referral: { source: 'ADS', type: 'LEAD_COMPLETE', ad_id: 'AD_A', ads_context_data: { ad_title: 't', post_id: 'p', photo_url: 'u' } },
      lead: { data: [{ question: 'Q1', answer: '한국' }, { question: 'Q2', answer: '비용' }, { question: 'Q3', answer: '1개월 이내' }] } },
  ] }],
})
const sign = (raw: string, secret = APP_SECRET) => 'sha256=' + createHmac('sha256', secret).update(raw).digest('hex')
const escapeJson = (o: unknown) => JSON.stringify(o).replace(/[\u0080-￿]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'))
const quiet = () => {}
const newAs = (extra: Record<string, string> = {}) => makeAppsScriptEnv({ SPREADSHEET_ID: 'm', RELAY_SECRET, ...extra })

// Apps Script(モック)に繋いだ fetch
function relayTo(as: ReturnType<typeof makeAppsScriptEnv>) {
  const f: any = async (_u: string, init: any) => { f.calls++; return { ok: true, status: 200, text: async () => as.post(init.body) } }
  f.calls = 0
  return f as FetchLike & { calls: number }
}
const fixedFetch = (text: string, ok = true, status = 200): FetchLike => async () => ({ ok, status, text: async () => text })

let finished = false
// AbortSignal.timeout のタイマーは unref されるため、待機中にプロセスが黙って終了しないよう保持し、途中終了は失敗にする
const keepAlive = setInterval(() => {}, 1000)
process.on('exit', () => { if (!finished) { console.log('FAIL test ended early'); process.exitCode = 1 } })

async function main() {
  // ── GET 認証 ──
  eq('GET ok', handleGet({ mode: 'subscribe', token: 'verify-tok', challenge: 'abc' }, ENV), { status: 200, body: 'abc' })
  eq('GET wrong token', handleGet({ mode: 'subscribe', token: 'x', challenge: 'abc' }, ENV).status, 403)
  eq('GET unconfigured token -> 403', handleGet({ mode: 'subscribe', token: '', challenge: 'abc' }, { ...ENV, verifyToken: '' }).status, 403)

  // ── 正常系（Apps Script モックまで通す）──
  {
    const as = newAs({ AD_MAP: JSON.stringify({ AD_A: 'A' }) })
    const f = relayTo(as)
    const raw = escapeJson(payload())
    const r = await handlePost({ raw, signature: sign(raw) }, ENV, f, quiet)
    eq('valid -> 200 appended', [r.status, JSON.parse(r.body)], [200, { ok: true, appended: 1, duplicate: 0, rejected: 0 }])
    const row = as.sheets['KR_Messenger_Leads'][1]
    eq('sheet row', [row[1], row[3], row[4], row[5], row[6], row[7], row[8]], ['PSID_1', '韓国', '料金', '1か月以内', 'A', '高', '未対応'])
    eq('existing tabs untouched', as.sheets['問い合わせ一覧'], [['日時', 'お名前']])
    const r2 = await handlePost({ raw, signature: sign(raw) }, ENV, f, quiet)
    eq('Meta retry -> 200 duplicate, no new row', [r2.status, JSON.parse(r2.body).duplicate, as.sheets['KR_Messenger_Leads'].length], [200, 1, 2])
  }

  // ── 署名不正・欠落 ──
  {
    const raw = escapeJson(payload()); const f = relayTo(newAs())
    eq('bad signature -> 403, relay not called', [(await handlePost({ raw, signature: sign(raw, 'wrong') }, ENV, f, quiet)).status, f.calls], [403, 0])
    eq('missing signature -> 403', (await handlePost({ raw, signature: null }, ENV, f, quiet)).status, 403)
    eq('re-serialized body -> 403 (unicode caveat)', (await handlePost({ raw: JSON.stringify(payload()), signature: sign(raw) }, ENV, f, quiet)).status, 403)
    eq('no app secret configured -> 503', (await handlePost({ raw, signature: sign(raw) }, { ...ENV, appSecret: '' }, f, quiet)).status, 503)
  }

  // ── 入力の異常 ──
  {
    const f = relayTo(newAs())
    const bad = 'not json'
    eq('invalid JSON (valid sig) -> 400', (await handlePost({ raw: bad, signature: sign(bad) }, ENV, f, quiet)).status, 400)
    const other = escapeJson({ object: 'instagram', entry: [] })
    eq('object != page -> 404', (await handlePost({ raw: other, signature: sign(other) }, ENV, f, quiet)).status, 404)
    const msg = escapeJson({ object: 'page', entry: [{ messaging: [{ sender: { id: 'x' }, timestamp: 1, message: { mid: 'm', text: 'hi' } }] }] })
    eq('non-lead event -> 200 ignored, relay not called', [(await handlePost({ raw: msg, signature: sign(msg) }, ENV, f, quiet)).status, f.calls], [200, 0])
    const big = 'x'.repeat(1_000_001)
    eq('oversized -> 413', (await handlePost({ raw: big, signature: sign(big) }, ENV, f, quiet)).status, 413)
    const openThread = escapeJson({ object: 'page', entry: [{ messaging: [{ sender: { id: 'x' }, timestamp: 1, referral: { source: 'ADS', type: 'OPEN_THREAD', ad_id: 'a' } }] }] })
    eq('OPEN_THREAD referral (not a lead) -> 200 ignored', (await handlePost({ raw: openThread, signature: sign(openThread) }, ENV, f, quiet)).status, 200)
  }

  // ── 障害時: 503 で Meta に再送させる ──
  {
    const raw = escapeJson(payload()); const sig = sign(raw)
    const timeoutFetch: FetchLike = (_u, init) => new Promise((_, rej) => init.signal.addEventListener('abort', () => rej(Object.assign(new Error('t'), { name: 'TimeoutError' }))))
    const t0 = Date.now()
    const t = await handlePost({ raw, signature: sig }, ENV, timeoutFetch, quiet, 150)
    eq('upstream timeout -> 503 (fast)', [t.status, Date.now() - t0 < 1000], [503, true])
    eq('upstream network error -> 503', (await handlePost({ raw, signature: sig }, ENV, (async () => { throw new Error('boom') }) as FetchLike, quiet)).status, 503)
    eq('upstream http 500 -> 503', (await handlePost({ raw, signature: sig }, ENV, fixedFetch('', false, 500), quiet)).status, 503)
    eq('upstream non-JSON (e.g. Google error page) -> 503', (await handlePost({ raw, signature: sig }, ENV, fixedFetch('<html>'), quiet)).status, 503)
    eq('upstream forbidden (bad relay secret) -> 503', (await handlePost({ raw, signature: sig }, ENV, fixedFetch(JSON.stringify({ ok: false, error: 'forbidden' })), quiet)).status, 503)
    eq('sheet relay not configured -> 503', (await handlePost({ raw, signature: sig }, { ...ENV, sheetUrl: '', sheetSecret: '' }, relayTo(newAs()), quiet)).status, 503)
    eq('non-https relay URL refused -> 503', (await handlePost({ raw, signature: sig }, { ...ENV, sheetUrl: 'http://x' }, relayTo(newAs()), quiet)).status, 503)
    // ロック競合（同時受信）→ busy -> 503、その後の再送で1回だけ成功
    const as = newAs(); const f = relayTo(as)
    as.setLock(true); const busy = await handlePost({ raw, signature: sig }, ENV, f, quiet)
    as.setLock(false); const again = await handlePost({ raw, signature: sig }, ENV, f, quiet)
    eq('lock contention -> 503, retry succeeds once', [busy.status, again.status, JSON.parse(again.body).appended, as.sheets['KR_Messenger_Leads'].length], [503, 200, 1, 2])
  }

  // ── 失敗の分類: 一時的障害／設定不備／再送しても直らない ──
  {
    const raw = escapeJson(payload()); const sig = sign(raw)
    const mkLogs = () => { const l: string[] = []; return { l, f: (m: string) => l.push(m) } }
    const kinds: [string, string, string][] = [
      ['busy', JSON.stringify({ ok: false, error: 'busy' }), 'ERROR transient: relay busy'],
      ['internal', JSON.stringify({ ok: false, error: 'internal' }), 'ERROR transient: relay internal'],
      ['forbidden', JSON.stringify({ ok: false, error: 'forbidden' }), 'ERROR config: relay refused request (forbidden)'],
      ['bad events', JSON.stringify({ ok: false, error: 'bad events' }), 'ERROR config: relay refused request (bad events)'],
      ['unrecognized error text', JSON.stringify({ ok: false, error: 'PSID_1 한국 leak?' }), 'ERROR transient: relay error (unrecognized)'],
      ['result count mismatch', JSON.stringify({ ok: true, results: [] }), 'ERROR transient: relay result count mismatch'],
      ['unknown result status', JSON.stringify({ ok: true, results: [{ key: 'k', status: 'weird' }] }), 'ERROR transient: relay unknown result status'],
    ]
    for (const [name, text, expectLog] of kinds) {
      const { l, f } = mkLogs()
      const r = await handlePost({ raw, signature: sig }, ENV, fixedFetch(text), f)
      eq(`${name} -> 503 (Meta retries) + labeled log, no content leak`, [r.status, l.some((x) => x.includes(expectLog)), /PSID_1|한국/.test(l.join('\n'))], [503, true, false])
    }

    // 再送しても直らないケース（eventKey が無く重複判定できない）→ 200、ただし ERROR permanent をログ。内容はログに出さない
    const as = newAs(); const { l, f } = mkLogs()
    const poison: FetchLike = async (_u, init) => {
      const b = JSON.parse(init.body); b.events[0].eventKey = ''
      return { ok: true, status: 200, text: async () => as.post(b) }
    }
    const r = await handlePost({ raw, signature: sig }, ENV, poison, f)
    eq('permanently rejected event -> 200 + ERROR permanent (hash only)', [r.status, JSON.parse(r.body).rejected, l.some((x) => x.includes('ERROR permanent') && /keyHash=[0-9a-f]{8}/.test(x)), /PSID_1|한국/.test(l.join('\n'))], [200, 1, true, false])
  }

  // ── リードを失わない: 送信者ID・時刻・広告ID・回答が欠けたリードも保存される ──
  {
    const as = newAs(); const f = relayTo(as)
    const broken = escapeJson({ object: 'page', entry: [{ id: 'P', messaging: [{ referral: { source: 'ADS', type: 'LEAD_INCOMPLETE' }, lead: { data: [{ question: 'q', answer: '한국' }] } }] }] })
    const r1 = await handlePost({ raw: broken, signature: sign(broken) }, ENV, f, quiet)
    const row = as.sheets['KR_Messenger_Leads'][1]
    eq('broken lead -> 200 and stored for manual review', [r1.status, JSON.parse(r1.body).appended, row[1], row[3], row[7], row[10].includes('データ不備: sender.id, timestamp, ad_id（要手動確認）')], [200, 1, '不明', '韓国', '要確認', true])
    const r2 = await handlePost({ raw: broken, signature: sign(broken) }, ENV, f, quiet)
    eq('broken lead retry -> duplicate (content-hash key)', [JSON.parse(r2.body).duplicate, as.sheets['KR_Messenger_Leads'].length], [1, 2])
    const nodata = escapeJson({ object: 'page', entry: [{ messaging: [{ sender: { id: 'S' }, timestamp: 5, referral: { type: 'LEAD_COMPLETE', ad_id: 'A' } }] }] })
    const r3 = await handlePost({ raw: nodata, signature: sign(nodata) }, ENV, f, quiet)
    eq('lead without lead.data -> stored with データ不備', [JSON.parse(r3.body).appended, as.sheets['KR_Messenger_Leads'][2][10].includes('データ不備: lead.data')], [1, true])
  }

  // ── 大量バッチ: 20件ずつに分割して全件保存。途中失敗→再送で残りだけ保存（取りこぼし・二重登録なし）──
  {
    const msgs = Array.from({ length: 45 }, (_, i) => ({ sender: { id: `U${i}` }, recipient: { id: 'P' }, timestamp: 1791800000000 + i, referral: { source: 'ADS', type: 'LEAD_COMPLETE', ad_id: 'AD_A' }, lead: { data: [{ question: 'q', answer: '태국' }] } }))
    const raw = escapeJson({ object: 'page', entry: [{ id: 'P', messaging: msgs }] }); const sig = sign(raw)
    const as = newAs(); const f = relayTo(as)
    const r = await handlePost({ raw, signature: sig }, ENV, f, quiet)
    eq('45 events -> 3 relay calls, all appended', [r.status, f.calls, JSON.parse(r.body).appended, as.sheets['KR_Messenger_Leads'].length], [200, 3, 45, 46])

    const as2 = newAs(); let call = 0
    const flaky: FetchLike = async (_u, init) => { call++; if (call === 2) return { ok: false, status: 502, text: async () => '' }; return { ok: true, status: 200, text: async () => as2.post(init.body) } }
    const r1 = await handlePost({ raw, signature: sig }, ENV, flaky, quiet)
    const afterFail = as2.sheets['KR_Messenger_Leads'].length
    const r2 = await handlePost({ raw, signature: sig }, ENV, flaky, quiet)
    const body2 = JSON.parse(r2.body)
    eq('mid-batch failure -> 503, retry completes without duplicates', [r1.status, afterFail, r2.status, body2.appended, body2.duplicate, as2.sheets['KR_Messenger_Leads'].length], [503, 21, 200, 25, 20, 46])
  }

  // ── デバッグログ: 'shape' のみ有効。'answers' など他の値は無効。回答・ID・秘密をログに出さない ──
  {
    const raw = escapeJson(payload())
    const run = async (debug?: string) => { const l: string[] = []; await handlePost({ raw, signature: sign(raw) }, { ...ENV, debug }, relayTo(newAs()), (m) => l.push(m)); return l.join('\n') }
    const shape = await run('shape')
    eq("debug='shape' logs structure only (no PSID/answers/ad/secrets)", [/PSID_1|한국|비용|AD_A|test-app-secret|relay-secret/.test(shape), shape.includes('referral.type=LEAD_COMPLETE') && shape.includes('lead.items=3')], [false, true])
    const answers = await run('answers')
    eq("debug='answers' is disabled (logs nothing, never answers)", [answers, /한국|비용/.test(answers)], ['', false])
    eq('debug unset logs nothing on success', await run(undefined), '')
    const l3: string[] = []
    await handlePost({ raw, signature: sign(raw) }, ENV, (async () => { throw new Error('secret=relay-secret-0123456789 PSID_1') }) as FetchLike, (m) => l3.push(m))
    eq('error log omits error message content', /relay-secret|PSID_1/.test(l3.join('\n')), false)
    const l4: string[] = []
    await handlePost({ raw, signature: sign(raw, 'bad') }, ENV, relayTo(newAs()), (m) => l4.push(m))
    eq('invalid-signature log has no payload content', /PSID_1|한국/.test(l4.join('\n')), false)
  }

  // ── 実際の API Route（NextRequest）経由 ──
  {
    Object.assign(process.env, { META_MESSENGER_APP_SECRET: APP_SECRET, META_MESSENGER_VERIFY_TOKEN: 'verify-tok', KR_LEADS_SHEET_WEBHOOK_URL: SHEET_URL, KR_LEADS_SHEET_SECRET: RELAY_SECRET })
    const route = await import('../src/app/api/messenger-webhook/route')
    const g = await route.GET(new NextRequest('http://localhost/api/messenger-webhook?hub.mode=subscribe&hub.verify_token=verify-tok&hub.challenge=999'))
    eq('route GET challenge', [g.status, await g.text()], [200, '999'])
    const g2 = await route.GET(new NextRequest('http://localhost/api/messenger-webhook?hub.mode=subscribe&hub.verify_token=bad&hub.challenge=999'))
    eq('route GET wrong token', g2.status, 403)
    const as = newAs()
    const realFetch = globalThis.fetch
    ;(globalThis as any).fetch = async (_u: string, init: any) => ({ ok: true, status: 200, text: async () => as.post(init.body) })
    const raw = escapeJson(payload())
    const mk = (sig: string) => new NextRequest('http://localhost/api/messenger-webhook', { method: 'POST', body: raw, headers: { 'x-hub-signature-256': sig } })
    const p = await route.POST(mk(sign(raw)))
    eq('route POST end-to-end', [p.status, as.sheets['KR_Messenger_Leads']?.length], [200, 2])
    eq('route POST bad signature', (await route.POST(mk('sha256=00'))).status, 403)
    ;(globalThis as any).fetch = realFetch
    delete process.env.META_MESSENGER_APP_SECRET
    eq('route inert when env not set -> 503', (await route.POST(mk(sign(raw)))).status, 503)
  }

  finished = true
  clearInterval(keepAlive)
  console.log(failed === 0 ? '\nALL PASSED' : `\n${failed} FAILED`)
  process.exit(failed === 0 ? 0 : 1)
}
main()
