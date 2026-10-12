// Meta Messenger Webhook（韓国Messengerリード → KR_Messenger_Leads）。
// 必要な環境変数が未設定の間は GET 403 / POST 503 を返すだけで何も処理しない。
// 受信ロジックは src/lib/messenger-webhook-handler.ts（手順書: docs/meta-messenger-setup-guide.md）。
import { NextRequest, NextResponse } from 'next/server'
import { handleGet, handlePost, type FetchLike, type WebhookEnv } from '@/lib/messenger-webhook-handler'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function readEnv(): WebhookEnv {
  return {
    appSecret: process.env.META_MESSENGER_APP_SECRET,
    verifyToken: process.env.META_MESSENGER_VERIFY_TOKEN,
    sheetUrl: process.env.KR_LEADS_SHEET_WEBHOOK_URL,
    sheetSecret: process.env.KR_LEADS_SHEET_SECRET,
    debug: process.env.MESSENGER_WEBHOOK_DEBUG,
  }
}

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams
  const r = handleGet({ mode: p.get('hub.mode'), token: p.get('hub.verify_token'), challenge: p.get('hub.challenge') }, readEnv())
  return new NextResponse(r.body, { status: r.status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

export async function POST(req: NextRequest) {
  const raw = await req.text() // 署名検証は受信した生の文字列で行う
  const r = await handlePost({ raw, signature: req.headers.get('x-hub-signature-256') }, readEnv(), fetch as unknown as FetchLike)
  return new NextResponse(r.body, { status: r.status, headers: { 'Content-Type': r.body.startsWith('{') ? 'application/json' : 'text/plain; charset=utf-8' } })
}
