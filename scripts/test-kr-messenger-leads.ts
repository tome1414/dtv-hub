// モックデータによるローカルテスト。外部通信・スプレッドシート書き込みなし。
// 実行: npx tsx scripts/test-kr-messenger-leads.ts
import {
  KR_MESSENGER_LEADS_HEADER, buildKrMessengerLeadRow, extractLeadEvents, classifyAnswer, priorityFromTiming,
} from '../src/lib/kr-messenger-leads'

let failed = 0
const eq = (name: string, actual: unknown, expected: unknown) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected)
  if (!ok) failed++
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${ok ? '' : `\n   actual:   ${JSON.stringify(actual)}\n   expected: ${JSON.stringify(expected)}`}`)
}

// 全選択肢のマッピング（表記ゆれ込み）
const cases: [string, string, string][] = [
  ['태국', 'residence', 'タイ'], ['한국', 'residence', '韓国'], ['기타 국가', 'residence', 'その他の国'], ['기타국가', 'residence', 'その他の国'],
  ['신청 조건', 'interest', '申請条件'], ['비용', 'interest', '料金'], ['신청 절차', 'interest', '申請手続き'],
  ['1개월 이내', 'timing', '1か月以内'], ['1~3개월 이내', 'timing', '1〜3か月以内'], ['1〜3개월 이내', 'timing', '1〜3か月以内'], ['1～3개월 이내', 'timing', '1〜3か月以内'],
  ['아직 미정입니다', 'timing', '未定'], ['아직 미정입니다.', 'timing', '未定'],
]
for (const [raw, field, ja] of cases) eq(`map ${raw}`, classifyAnswer(raw), { field, ja })
eq('unknown answer', classifyAnswer('모르겠어요'), null)

eq('priority 1m', priorityFromTiming('1か月以内'), '高')
eq('priority 1-3m', priorityFromTiming('1〜3か月以内'), '中')
eq('priority undecided', priorityFromTiming('未定'), '低')
eq('priority missing', priorityFromTiming(undefined), '要確認')
eq('priority unknown', priorityFromTiming('不明'), '要確認')

// Webhook ペイロード（Meta 公式ドキュメントの構造に基づくモック）
const body = {
  object: 'page',
  entry: [{
    time: 1791800000000, id: 'PAGE_ID',
    messaging: [
      {
        sender: { id: 'PSID_1' }, recipient: { id: 'PAGE_ID' }, timestamp: 1791800000000,
        referral: { source: 'ADS', type: 'LEAD_COMPLETE', ad_id: 'AD_A', ads_context_data: { ad_title: 't' } },
        lead: { data: [
          { question: 'Q1', answer: '한국' }, { question: 'Q2', answer: '비용' }, { question: 'Q3', answer: '1~3개월 이내' },
        ] },
      },
      {
        sender: { id: 'PSID_2' }, recipient: { id: 'PAGE_ID' }, timestamp: 1791800100000,
        referral: { source: 'ADS', type: 'LEAD_INCOMPLETE', ad_id: 'AD_X' },
        lead: { data: [{ question: 'Q1', answer: '태국' }] },
      },
      { sender: { id: 'PSID_3' }, timestamp: 1, message: { text: 'hi' } }, // リード以外は無視
    ],
  }],
}
const events = extractLeadEvents(body)
eq('extract count (non-lead ignored)', events.length, 2)

const adMap = { AD_A: 'A', AD_C: 'C' }
const r1 = buildKrMessengerLeadRow(events[0], { adMap })
eq('row1', r1.row.slice(1, 9), ['PSID_1', '', '韓国', '料金', '1〜3か月以内', 'A', '中', '未対応'])
eq('row1 columns = header', r1.row.length, KR_MESSENGER_LEADS_HEADER.length)
eq('row1 time (Bangkok, UTC+7)', r1.row[0], '2026-10-12 17:13:20')

const r2 = buildKrMessengerLeadRow(events[1], { adMap })
eq('row2 partial', r2.row.slice(3, 9), ['タイ', '不明', '不明', '不明', '要確認', '未対応'])
eq('row2 note', r2.row[10].includes('未完了') && r2.row[10].includes('AD_X'), true)

// 重複防止: 同一イベントの再送は同じキー、別イベントは別キー
eq('dedupe key stable on retry', buildKrMessengerLeadRow(events[0], { adMap }).key, r1.key)
eq('dedupe key differs per event', r1.key === r2.key, false)

// 想定外の回答は推測せず「不明」＋備考へ
const odd = buildKrMessengerLeadRow({ psid: 'P', timestampMs: 0, referralType: 'LEAD_COMPLETE', adId: '', answers: [{ question: 'x', answer: '기타' }], dataIssues: [], rawHash: 'h' }, { receivedAt: new Date('2026-10-12T00:00:00Z') })
eq('odd answer not guessed', odd.row.slice(3, 8), ['不明', '不明', '不明', '不明', '要確認'])
eq('odd answer in note (+ time substituted)', odd.row[10], '未対応の回答: 기타 / 受付日時は受信時刻で代替')
eq('fallback time uses receivedAt', odd.row[0], '2026-10-12 07:00:00')

console.log(failed === 0 ? '\nALL PASSED' : `\n${failed} FAILED`)
process.exit(failed === 0 ? 0 : 1)
