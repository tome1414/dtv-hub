// Meta Webhook の検証・中継用の純関数（外部通信なし）。公開エンドポイントはまだ作らない。
// 仕様根拠: Meta for Developers「Webhooks」「Lead Generation Ads in Messenger」。
import { createHmac, timingSafeEqual } from 'crypto'
import { eventKey, type LeadReferralEvent } from './kr-messenger-leads'

// GET 検証: hub.mode=subscribe かつ verify_token 一致のときだけ hub.challenge を返す
export function verifyChallenge(
  params: { mode?: string | null; token?: string | null; challenge?: string | null },
  verifyToken: string,
): string | null {
  if (!verifyToken || params.mode !== 'subscribe' || !params.challenge) return null
  const a = Buffer.from(params.token ?? '')
  const b = Buffer.from(verifyToken)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  return params.challenge
}

// POST 署名検証: X-Hub-Signature-256 = "sha256=" + HMAC-SHA256(受信した生のボディ, App Secret)。
// 必ず「受信した生の文字列」で計算する（JSON.parse して再シリアライズした文字列では一致しない。
// Meta は非ASCII文字を \uXXXX（小文字16進）にエスケープした状態で署名している）。
export function verifySignature(rawBody: string, header: string | null, appSecret: string): boolean {
  if (!appSecret || !header || !header.startsWith('sha256=')) return false
  const expected = createHmac('sha256', appSecret).update(rawBody, 'utf8').digest()
  const given = Buffer.from(header.slice('sha256='.length), 'hex')
  return given.length === expected.length && timingSafeEqual(given, expected)
}

// Apps Script へ渡す形式。eventKey は Meta ペイロード由来（送信者ID・広告ID・Metaのイベント時刻・種別）で、
// 受信時刻は使わない。Meta の再送は同一ペイロードなので同じキーになる。
export function toRelayEvents(events: LeadReferralEvent[], displayNames: Record<string, string> = {}) {
  return events.map((ev) => ({
    eventKey: eventKey(ev),
    psid: ev.psid,
    adId: ev.adId,
    type: ev.referralType,
    timestampMs: ev.timestampMs,
    answers: ev.answers,
    dataIssues: ev.dataIssues,
    ...(displayNames[ev.psid] ? { displayName: displayNames[ev.psid] } : {}),
  }))
}
