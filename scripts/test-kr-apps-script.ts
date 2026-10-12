// Apps Script (Code.gs) を Node 上でモックの SpreadsheetApp 等と一緒に実行して検証する。
// 実際のスプレッドシート・Meta・ネットワークには接続しない。
// 実行: npx tsx scripts/test-kr-apps-script.ts
import { readFileSync } from 'fs'
import { createHmac } from 'crypto'
import vm from 'vm'
import path from 'path'
import { buildKrMessengerLeadRow, extractLeadEvents, KR_MESSENGER_LEADS_HEADER } from '../src/lib/kr-messenger-leads'
import { toRelayEvents, verifySignature, verifyChallenge } from '../src/lib/meta-webhook'

let failed = 0
const eq = (name: string, actual: unknown, expected: unknown) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  if (!ok) failed++
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${ok ? '' : `\n   actual:   ${JSON.stringify(actual)}\n   expected: ${JSON.stringify(expected)}`}`)
}

// ── モック環境 ───────────────────────────────────────────────
function makeEnv(props: Record<string, string>) {
  const sheets: Record<string, any[][]> = { '問い合わせ一覧': [['日時', 'お名前']], '代理店一覧': [] }
  const formats: string[] = []
  let lockHeld = false
  const mkSheet = (name: string) => ({
    getLastRow: () => sheets[name].length,
    appendRow: (r: any[]) => { sheets[name].push(r) },
    getRange: (a: any, b?: any, c?: any, d?: any) => {
      if (typeof a === 'string') return { setNumberFormat: (f: string) => { formats.push(a + ':' + f) }, setDataValidation: () => {} }
      const row = a, col = b, nRows = c ?? 1, nCols = d ?? 1
      return {
        getValues: () => Array.from({ length: nRows }, (_, i) => Array.from({ length: nCols }, (_, j) => sheets[name][row - 1 + i]?.[col - 1 + j] ?? '')),
        setValues: (v: any[][]) => { v.forEach((r, i) => { sheets[name][row - 1 + i] = r }) },
      }
    },
    setFrozenRows: () => {},
  })
  const ctx: any = {
    console,
    Utilities: { formatDate: (d: Date, tz: string) => new Intl.DateTimeFormat('sv-SE', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(d) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: (k: string) => props[k] ?? null }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: (s: string) => ({ s, setMimeType() { return this } }) },
    LockService: { getScriptLock: () => ({ tryLock: () => { if (lockHeld) return false; lockHeld = true; return true }, releaseLock: () => { lockHeld = false } }) },
    SpreadsheetApp: {
      openById: (id: string) => ({
        getSheetByName: (n: string) => (sheets[n] ? mkSheet(n) : null),
        insertSheet: (n: string) => { sheets[n] = []; return mkSheet(n) },
      }),
      newDataValidation: () => ({ requireValueInList() { return this }, build() { return {} } }),
      flush: () => {},
    },
  }
  vm.createContext(ctx)
  vm.runInContext(readFileSync(path.join(__dirname, '../apps-script/kr-messenger-leads/Code.gs'), 'utf8'), ctx)
  const post = (body: unknown) => JSON.parse(ctx.doPost({ postData: { contents: typeof body === 'string' ? body : JSON.stringify(body) } }).s)
  return { sheets, formats, post, ctx, setLock: (v: boolean) => { lockHeld = v } }
}

const SECRET = 'test-secret-0123456789'
const PROPS = { SPREADSHEET_ID: 'mock', RELAY_SECRET: SECRET, AD_MAP: JSON.stringify({ AD_A: 'A', AD_C: 'C' }) }

// ── Meta公式仕様に基づくペイロード（Lead Generation Ads in Messenger の Referral webhook 構造）──
const payload = {
  object: 'page',
  entry: [{
    time: 1791800000000, id: 'PAGE_ID',
    messaging: [
      {
        sender: { id: 'PSID_1' }, recipient: { id: 'PAGE_ID' }, timestamp: 1791800000000,
        referral: { source: 'ADS', type: 'LEAD_COMPLETE', ad_id: 'AD_A', ads_context_data: { ad_title: 't', post_id: 'p', photo_url: 'u' } },
        lead: { data: [{ question: '현재 거주 국가는 어디인가요?', answer: '한국' }, { question: '궁금하신 정보는?', answer: '비용' }, { question: '신청 희망 시기는?', answer: '1~3개월 이내' }] },
      },
      {
        sender: { id: 'PSID_2' }, recipient: { id: 'PAGE_ID' }, timestamp: 1791800100000,
        referral: { source: 'ADS', type: 'LEAD_INCOMPLETE', ad_id: 'AD_C', ads_context_data: { ad_title: 't', post_id: 'p', photo_url: 'u' } },
        lead: { data: [{ question: 'Q1', answer: '태국' }] },
      },
    ],
  }],
}
// 公式仕様の必須フィールドがモックに揃っているか（仕様との一致確認）
const m0 = payload.entry[0].messaging[0] as any
eq('spec: required fields present', [!!payload.object, !!payload.entry[0].time, !!payload.entry[0].id, !!m0.sender.id, !!m0.recipient.id, !!m0.timestamp, m0.referral.source, ['LEAD_COMPLETE', 'LEAD_INCOMPLETE'].includes(m0.referral.type), !!m0.referral.ad_id, Array.isArray(m0.lead.data), 'question' in m0.lead.data[0] && 'answer' in m0.lead.data[0]], [true, true, true, true, true, true, 'ADS', true, true, true, true])
eq('spec: no mid/lead_id in referral payload (key must be composite)', ['mid' in m0, 'lead_id' in m0], [false, false])

const events = extractLeadEvents(payload)
const relay = toRelayEvents(events)

// ── 1. 正常系 + TS実装との一致 ─────────────────────────────────
{
  const env = makeEnv(PROPS)
  const res = env.post({ secret: SECRET, events: relay })
  eq('append 2 events', res.results.map((r: any) => r.status), ['appended', 'appended'])
  const rows = env.sheets['KR_Messenger_Leads']
  eq('tab created with header (A..L)', rows[0], [...KR_MESSENGER_LEADS_HEADER])
  eq('column A is text format', env.formats.some((f) => f.startsWith('A:A')), true)
  const ts = events.map((e) => buildKrMessengerLeadRow(e, { adMap: { AD_A: 'A', AD_C: 'C' } }).row)
  eq('parity: Apps Script rows == TS reference rows', rows.slice(1), ts)
  eq('row1 values', rows[1].slice(1, 9), ['PSID_1', '', '韓国', '料金', '1〜3か月以内', 'A', '中', '未対応'])
  eq('incomplete lead flagged + priority 要確認', [rows[2][7], rows[2][10].includes('未完了')], ['要確認', true])
  eq('existing tabs untouched', [env.sheets['問い合わせ一覧'], env.sheets['代理店一覧']], [[['日時', 'お名前']], []])

  // ── 2. 再送（Meta retry）= 同一ペイロード → 重複なし ──
  const retry = env.post({ secret: SECRET, events: relay })
  eq('retry is duplicate', retry.results.map((r: any) => r.status), ['duplicate', 'duplicate'])
  eq('no extra rows after retry', env.sheets['KR_Messenger_Leads'].length, 3)
  // 受信時刻が変わっても（再送が遅れても）キーは同じ
  eq('event key independent of receive time', relay[0].eventKey, toRelayEvents(extractLeadEvents(payload))[0].eventKey)

  // 同一リクエスト内の重複
  const dup = env.post({ secret: SECRET, events: [relay[0], relay[0]] })
  eq('duplicate within one request', dup.results.map((r: any) => r.status), ['duplicate', 'duplicate'])

  // ── 3. 同時受信: ロック中は失敗を返し（中継が5xx→Metaが再送）、行は増えない ──
  env.setLock(true)
  const busy = env.post({ secret: SECRET, events: [{ ...relay[0], eventKey: 'other', timestampMs: 1 }] })
  eq('lock busy -> error, no write', [busy.ok, busy.error, env.sheets['KR_Messenger_Leads'].length], [false, 'busy', 3])
  env.setLock(false)
}

// ── 4. 認証・入力検証 ────────────────────────────────────────
{
  const env = makeEnv(PROPS)
  eq('wrong secret rejected', env.post({ secret: 'x'.repeat(SECRET.length), events: relay }).error, 'forbidden')
  eq('missing secret rejected', env.post({ events: relay }).error, 'forbidden')
  eq('no secret configured -> fail closed', makeEnv({ SPREADSHEET_ID: 'mock' }).post({ secret: '', events: relay }).error, 'forbidden')
  eq('invalid JSON -> internal error (no leak)', env.post('not json').error, 'internal')
  eq('empty events rejected', env.post({ secret: SECRET, events: [] }).error, 'bad events')
  const rej = env.post({ secret: SECRET, events: [{ ...relay[0], eventKey: '' }, null] })
  eq('only un-dedupable events are rejected', rej.results.map((r: any) => r.status), ['rejected', 'rejected'])
  eq('nothing written for rejected', env.sheets['KR_Messenger_Leads']?.length ?? 0, 1) // ヘッダーのみ
  // 不備のあるリードは拒否せず、要確認の行として保存する（リードを失わない）
  const brokenEv = { eventKey: 'raw:abc', adId: '', type: 'LEAD_COMPLETE', answers: [{ question: 'q', answer: '한국' }], dataIssues: ['sender.id', 'timestamp', 'ad_id'] }
  const b1 = env.post({ secret: SECRET, events: [brokenEv, { ...relay[0], eventKey: 'k-type', type: 'OTHER' }] })
  eq('incomplete data and unknown type are stored, not rejected', b1.results.map((r: any) => r.status), ['appended', 'appended'])
  const brow = env.sheets['KR_Messenger_Leads'][1]
  eq('broken lead row', [brow[1], brow[3], brow[7], brow[10].includes('データ不備: sender.id, timestamp, ad_id（要手動確認）'), brow[10].includes('受付日時は受信時刻で代替')], ['不明', '韓国', '要確認', true, true])
  eq('broken lead retry -> duplicate', env.post({ secret: SECRET, events: [brokenEv] }).results[0].status, 'duplicate')
  // エラーログに入力内容（個人情報になり得る）を出さない
  const captured: string[] = []; const origErr = console.error; console.error = (...a: unknown[]) => { captured.push(a.join(' ')) }
  env.post('{"secret":"' + SECRET + '","events":[{"psid":"PSID_SECRET_MARKER", broken')
  console.error = origErr
  eq('error log has error type only (no request content)', [captured.length > 0, captured.join('').includes('PSID_SECRET_MARKER'), captured.join('').includes(SECRET)], [true, false, false])
}

// ── 5. 想定外の回答・広告ID未登録・欠落 ─────────────────────────
{
  const env = makeEnv(PROPS)
  const odd = { eventKey: 'k1', psid: 'P', adId: 'UNKNOWN', type: 'LEAD_COMPLETE', timestampMs: 1791800000000, answers: [{ question: 'x', answer: '기타' }] }
  env.post({ secret: SECRET, events: [odd] })
  const row = env.sheets['KR_Messenger_Leads'][1]
  eq('unknown answer/ad not guessed', [row[3], row[4], row[5], row[6], row[7]], ['不明', '不明', '不明', '不明', '要確認'])
  eq('notes keep raw answer and ad id', row[10], '未対応の回答: 기타 / 広告ID: UNKNOWN')
  eq('time is Bangkok (UTC+7)', row[0], '2026-10-12 17:13:20')
}

// ── 6. Webhook 署名・検証トークン ─────────────────────────────
{
  const APP_SECRET = 'app-secret-xyz'
  const escaped = JSON.stringify(payload).replace(/[\u0080-￿]/g, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'))
  const sig = 'sha256=' + createHmac('sha256', APP_SECRET).update(escaped).digest('hex')
  eq('signature valid on raw (escaped) body', verifySignature(escaped, sig, APP_SECRET), true)
  eq('signature fails on re-serialized body (unicode caveat)', verifySignature(JSON.stringify(payload), sig, APP_SECRET), false)
  eq('signature fails with wrong secret', verifySignature(escaped, sig, 'other'), false)
  eq('signature fails when header missing/malformed', [verifySignature(escaped, null, APP_SECRET), verifySignature(escaped, 'abc', APP_SECRET), verifySignature(escaped, 'sha256=zz', APP_SECRET)], [false, false, false])
  eq('empty secret never verifies', verifySignature(escaped, sig, ''), false)
  eq('challenge ok', verifyChallenge({ mode: 'subscribe', token: 'tok', challenge: '123' }, 'tok'), '123')
  eq('challenge wrong token', verifyChallenge({ mode: 'subscribe', token: 'bad', challenge: '123' }, 'tok'), null)
  eq('challenge wrong mode / no server token', [verifyChallenge({ mode: 'x', token: 'tok', challenge: '1' }, 'tok'), verifyChallenge({ mode: 'subscribe', token: '', challenge: '1' }, '')], [null, null])
  // 署名つきボディをパースしてもイベントが同じ
  eq('parse after verify yields same events', extractLeadEvents(JSON.parse(escaped)).length, 2)
}

console.log(failed === 0 ? '\nALL PASSED' : `\n${failed} FAILED`)
process.exit(failed === 0 ? 0 : 1)
