/**
 * Meta Conversions API (CAPI) — server-side Lead event
 * Pixel ID and Access Token are read from environment variables only.
 * No PII is logged; no secrets are exposed to the client.
 */

import { createHash } from 'crypto'

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserData {
  em?: string[]
  ph?: string[]
  client_ip_address?: string
  client_user_agent?: string
  fbp?: string
  fbc?: string
}

interface EventPayload {
  event_name: 'Lead'
  event_time: number
  action_source: 'website'
  event_source_url: string
  event_id: string
  user_data: UserData
}

interface CAPIBody {
  data: EventPayload[]
  access_token: string
  test_event_code?: string
}

interface CAPIResponse {
  events_received?: number
  messages?: string[]
  fbtrace_id?: string
  error?: {
    message: string
    code: number
    type: string
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sha256hex(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

function hashEmail(email: string): string {
  return sha256hex(email.trim().toLowerCase())
}

// ─── Main export ─────────────────────────────────────────────────────────────

export interface CAPILeadParams {
  email: string
  eventId: string
  eventSourceUrl: string
  clientIp: string
  userAgent: string
  fbp?: string
  fbc?: string
}

export async function sendCapiLead(params: CAPILeadParams): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  const testEventCode = process.env.META_CAPI_TEST_EVENT_CODE

  if (!pixelId || !accessToken) {
    console.warn('[CAPI] META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not configured — skipping')
    return
  }

  const userData: UserData = {
    em: [hashEmail(params.email)],
    client_ip_address: params.clientIp,
    client_user_agent: params.userAgent,
  }

  if (params.fbp) userData.fbp = params.fbp
  if (params.fbc) userData.fbc = params.fbc

  const body: CAPIBody = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: params.eventSourceUrl,
        event_id: params.eventId,
        user_data: userData,
      },
    ],
    access_token: accessToken,
  }

  if (testEventCode) {
    body.test_event_code = testEventCode
  }

  const endpoint = `https://graph.facebook.com/v21.0/${pixelId}/events`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  })

  const json = (await res.json()) as CAPIResponse

  console.log('[CAPI] response:', JSON.stringify(json))

  if (!res.ok || json.error) {
    const code = json.error?.code ?? res.status
    const type = json.error?.type ?? 'http_error'
    console.error(`[CAPI] Lead event failed: code=${code} type=${type} event_id=${params.eventId}`)
    throw new Error(`CAPI error code=${code}`)
  }

  console.log(`[CAPI] Lead sent: events_received=${json.events_received ?? '?'} event_id=${params.eventId}`)
}
