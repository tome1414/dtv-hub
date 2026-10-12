// 韓国向け Meta Messenger リードの KR_Messenger_Leads タブ用ロジック（純関数のみ・外部通信なし）。
// Meta の Lead Referral Webhook（referral.type = LEAD_COMPLETE / LEAD_INCOMPLETE、lead.data[]{question, answer}）を想定。
// 取得できない項目は推測せず空欄または「不明」。データに不備があるリードも捨てず、要確認の行として必ず保存する。
import { createHash } from 'crypto'

export const KR_MESSENGER_LEADS_SHEET = 'KR_Messenger_Leads'

export const KR_MESSENGER_LEADS_HEADER = [
  '受付日時（タイ時間）',
  'MessengerユーザーID',
  '表示名',
  '居住国',
  '関心事項',
  '申請希望時期',
  '流入広告',
  '対応優先度',
  '対応ステータス',
  '最終対応日時',
  '備考',
  'イベントキー（重複防止）',
] as const

export type Priority = '高' | '中' | '低' | '要確認'

// ── 韓国語 → 日本語 ─────────────────────────────────────────────
const RESIDENCE: Record<string, string> = {
  '태국': 'タイ',
  '한국': '韓国',
  '기타국가': 'その他の国',
}
const INTEREST: Record<string, string> = {
  '신청조건': '申請条件',
  '비용': '料金',
  '신청절차': '申請手続き',
}
const TIMING: Record<string, string> = {
  '1개월이내': '1か月以内',
  '1-3개월이내': '1〜3か月以内',
  '아직미정입니다': '未定',
  '미정': '未定',
}

// 空白・チルダ類・句読点を除去して比較用に正規化する
export function normalizeAnswer(raw: string): string {
  return raw
    .normalize('NFKC')
    .replace(/[\s.。!！]/g, '')
    .replace(/[~〜∼～–—ー]/g, '-')
}

export type LeadField = 'residence' | 'interest' | 'timing'

// 回答値（閉じた選択肢）から Q1/Q2/Q3 を判定する。質問文の文言に依存しない。
export function classifyAnswer(raw: string): { field: LeadField; ja: string } | null {
  const key = normalizeAnswer(raw)
  if (key in RESIDENCE) return { field: 'residence', ja: RESIDENCE[key] }
  if (key in INTEREST) return { field: 'interest', ja: INTEREST[key] }
  if (key in TIMING) return { field: 'timing', ja: TIMING[key] }
  return null
}

export function priorityFromTiming(timingJa: string | undefined): Priority {
  if (timingJa === '1か月以内') return '高'
  if (timingJa === '1〜3か月以内') return '中'
  if (timingJa === '未定') return '低'
  return '要確認'
}

// ── Webhook ペイロード ──────────────────────────────────────────
export interface LeadReferralEvent {
  psid: string
  timestampMs: number
  referralType: string // LEAD_COMPLETE | LEAD_INCOMPLETE
  adId: string
  answers: { question: string; answer: string }[]
  // Metaのペイロードに欠けていた項目（空なら不備なし）。不備があっても捨てず、要確認の行として保存する。
  dataIssues: string[]
  // 元の通知1件の内容ハッシュ（再送でも同一）。送信者ID・時刻が欠けた場合の重複判定キーに使う。
  rawHash: string
}

// Meta の Webhook ボディから、リード系イベントだけを取り出す
export function extractLeadEvents(body: unknown): LeadReferralEvent[] {
  const out: LeadReferralEvent[] = []
  const entries = (body as { entry?: unknown[] } | null)?.entry
  if (!Array.isArray(entries)) return out
  for (const entry of entries) {
    const messaging = (entry as { messaging?: unknown[] })?.messaging
    if (!Array.isArray(messaging)) continue
    for (const m of messaging as Record<string, any>[]) {
      const type = m?.referral?.type
      if (type !== 'LEAD_COMPLETE' && type !== 'LEAD_INCOMPLETE') continue
      const data = Array.isArray(m?.lead?.data) ? m.lead.data : []
      const issues: string[] = []
      const psid = m?.sender?.id != null ? String(m.sender.id) : ''
      const ts = Number(m?.timestamp) || 0
      const adId = m?.referral?.ad_id != null ? String(m.referral.ad_id) : ''
      if (!psid) issues.push('sender.id')
      if (!ts) issues.push('timestamp')
      if (!adId) issues.push('ad_id')
      if (!Array.isArray(m?.lead?.data)) issues.push('lead.data')
      out.push({
        psid,
        timestampMs: ts,
        referralType: type,
        adId,
        answers: data.map((d: any) => ({ question: String(d?.question ?? ''), answer: String(d?.answer ?? '') })),
        dataIssues: issues,
        rawHash: createHash('sha256').update(JSON.stringify(m)).digest('hex').slice(0, 32),
      })
    }
  }
  return out
}

// ── 行の組み立て ────────────────────────────────────────────────
export interface BuildOptions {
  // 広告ID → 'A' | 'C'（運用側で確定した対応表。未登録は「不明」）
  adMap?: Record<string, string>
  displayName?: string
  receivedAt?: Date // timestamp が無い場合の代替（受信時刻）
}

export function formatBangkok(d: Date): string {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }).format(d) // 例: 2026-10-12 18:30:00
}

// 重複判定キー。Metaが付けたイベント時刻を使い、受信時刻は使わない。
// 送信者IDかイベント時刻が欠けている場合は、通知内容のハッシュで代替する（再送でも同一）。
export function eventKey(ev: LeadReferralEvent): string {
  if (ev.psid && ev.timestampMs) return `${ev.psid}|${ev.adId}|${ev.timestampMs}|${ev.referralType}`
  return `raw:${ev.rawHash}`
}

export function buildKrMessengerLeadRow(ev: LeadReferralEvent, opts: BuildOptions = {}): { row: string[]; key: string } {
  const picked: Partial<Record<LeadField, string>> = {}
  const notes: string[] = []

  for (const a of ev.answers) {
    const c = classifyAnswer(a.answer)
    if (!c) {
      notes.push(`未対応の回答: ${a.answer}`)
      continue
    }
    if (picked[c.field] !== undefined) notes.push(`重複回答(${c.field}): ${a.answer}`)
    else picked[c.field] = c.ja
  }

  if (ev.referralType === 'LEAD_INCOMPLETE') notes.push('未完了リード（途中離脱または対象外の回答）')
  if (ev.dataIssues.length > 0) notes.push(`データ不備: ${ev.dataIssues.join(', ')}（要手動確認）`)

  let when: Date
  if (ev.timestampMs) when = new Date(ev.timestampMs)
  else { when = opts.receivedAt ?? new Date(); notes.push('受付日時は受信時刻で代替') }
  const ad = opts.adMap?.[ev.adId] ?? '不明'
  if (!opts.adMap?.[ev.adId] && ev.adId) notes.push(`広告ID: ${ev.adId}`)

  const key = eventKey(ev)
  const row = [
    formatBangkok(when),
    ev.psid || '不明',
    opts.displayName ?? '',
    picked.residence ?? '不明',
    picked.interest ?? '不明',
    picked.timing ?? '不明',
    ad,
    priorityFromTiming(picked.timing),
    '未対応',
    '',
    notes.join(' / '),
    key,
  ]
  return { row, key }
}
