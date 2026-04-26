import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { CheckCircle, FileText, AlertCircle, Clock } from 'lucide-react'

interface PageProps {
  params: Promise<{ lang: string }>
}

const content: Record<string, {
  title: string
  subtitle: string
  sections: { icon: string; title: string; items: string[] }[]
  notes: string[]
  timeline: { step: string; duration: string; desc: string }[]
}> = {
  ja: {
    title: 'DTVビザ 必要書類チェックリスト',
    subtitle: '申請に必要な全書類を完全リスト化。準備漏れを防ぎ、スムーズな申請をサポートします。',
    sections: [
      {
        icon: '📋',
        title: '基本書類',
        items: [
          'パスポート（残存有効期間18ヶ月以上、空白ページ2ページ以上）',
          'パスポートのコピー（写真ページ）',
          '証明写真（4×6cm、白背景、6ヶ月以内撮影）',
          'ビザ申請書（所定の様式、英語で記入）',
          '手数料：10,000円（現金のみの大使館もあり）',
        ],
      },
      {
        icon: '💰',
        title: '財政証明書類',
        items: [
          '銀行残高証明書（英語、500万円以上推奨）',
          '過去3〜6ヶ月の銀行取引明細',
          '収入証明書（給与明細・確定申告書など）',
          '資産証明（不動産、株式等。余裕があれば）',
        ],
      },
      {
        icon: '🏥',
        title: '健康・保険書類',
        items: [
          '海外旅行保険または国際健康保険の証書',
          '保険カバー期間：滞在期間をカバーすること',
          '補償額：医療費 40,000USD以上推奨',
          '緊急搬送（エバキュエーション）カバー付き',
        ],
      },
      {
        icon: '🏠',
        title: '滞在先証明',
        items: [
          'ホテルの予約確認書（最初の数週間分）',
          'アパート・コンドミニアムの賃貸契約書（あれば）',
          '知人宅滞在の場合は招待状',
        ],
      },
      {
        icon: '✈️',
        title: 'ソフトパワービザの追加書類',
        items: [
          'タイ政府認可プログラムの入学許可書（Acceptance Letter）',
          'プログラム修了証明書（修了後）',
          '主催機関からの推薦状',
          'コース料金の支払い証明',
        ],
      },
    ],
    notes: [
      '書類はすべて英語または公証済み翻訳が必要です',
      '大使館によって要求書類が異なる場合があります。事前に確認してください',
      '書類の有効期限は通常3ヶ月以内のものが必要です',
      '申請から発行まで通常5〜10営業日かかります',
    ],
    timeline: [
      { step: '書類準備', duration: '2〜4週間前', desc: '全書類を揃え、翻訳・公証手配' },
      { step: '大使館予約', duration: '2〜3週間前', desc: 'オンラインまたは電話で予約' },
      { step: '申請窓口提出', duration: '当日', desc: '書類一式持参・手数料支払い' },
      { step: 'ビザ発行', duration: '5〜10営業日後', desc: '窓口受取またはレターパック郵送' },
    ],
  },
  en: {
    title: 'DTV Visa Required Documents Checklist',
    subtitle: 'A complete list of all documents needed for your DTV visa application.',
    sections: [
      {
        icon: '📋',
        title: 'Basic Documents',
        items: [
          'Passport (valid for 18+ months, 2+ blank pages)',
          'Passport copy (photo page)',
          'Passport-size photos (4×6cm, white background, within 6 months)',
          'Visa application form (official format, in English)',
          'Application fee (approx. ¥10,000 or equivalent)',
        ],
      },
      {
        icon: '💰',
        title: 'Financial Documents',
        items: [
          'Bank statement (English, showing ¥5M+ or equivalent)',
          'Bank transaction history (3–6 months)',
          'Proof of income (pay slips, tax returns)',
          'Asset proof (real estate, stocks if available)',
        ],
      },
      {
        icon: '🏥',
        title: 'Health & Insurance',
        items: [
          'International health or travel insurance certificate',
          'Coverage period must span entire stay',
          'Recommended coverage: USD 40,000+ medical',
          'Emergency evacuation coverage recommended',
        ],
      },
      {
        icon: '🏠',
        title: 'Accommodation Proof',
        items: [
          'Hotel booking confirmation (first few weeks)',
          'Rental agreement if staying in apartment/condo',
          'Invitation letter if staying with acquaintances',
        ],
      },
      {
        icon: '✈️',
        title: 'Soft Power Visa Additional Docs',
        items: [
          'Acceptance letter from a Thai government-approved program',
          'Certificate of completion (after finishing)',
          'Recommendation letter from organizing institution',
          'Payment proof for course fees',
        ],
      },
    ],
    notes: [
      'All documents must be in English or have a certified translation',
      'Requirements may vary by embassy — always confirm in advance',
      'Documents are typically required to be within 3 months of issue',
      'Processing time is usually 5–10 business days after submission',
    ],
    timeline: [
      { step: 'Document Prep', duration: '2–4 weeks before', desc: 'Gather and translate all documents' },
      { step: 'Embassy Appointment', duration: '2–3 weeks before', desc: 'Book online or by phone' },
      { step: 'Submit Application', duration: 'Appointment day', desc: 'Bring all documents and pay fee' },
      { step: 'Visa Issued', duration: '5–10 business days later', desc: 'Pick up or receive by mail' },
    ],
  },
}

function getContent(locale: Locale) {
  return content[locale] ?? content.en
}

export default async function RequirementsPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = getContent(locale)

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-gold-400" />
            <h1 className="text-3xl sm:text-4xl font-bold">{c.title}</h1>
          </div>
          <p className="text-navy-300 text-lg">{c.subtitle}</p>
        </div>

        {/* Timeline */}
        <div className="bg-navy-900 rounded-2xl p-6 border border-white/10 mb-10">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-5 h-5 text-gold-400" />
            <h2 className="text-lg font-bold">{locale === 'ja' ? '申請スケジュール' : 'Application Timeline'}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {c.timeline.map((t, i) => (
              <div key={i} className="text-center">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold text-sm mx-auto mb-2">{i + 1}</div>
                <div className="text-xs text-gold-400 font-semibold mb-1">{t.duration}</div>
                <div className="text-sm font-bold mb-1">{t.step}</div>
                <div className="text-xs text-navy-400">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Document sections */}
        <div className="space-y-6 mb-10">
          {c.sections.map((section, si) => (
            <div key={si} className="bg-navy-900 rounded-2xl p-6 border border-white/10">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">{section.icon}</span>
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span className="text-navy-200 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-300">{locale === 'ja' ? '注意事項' : 'Important Notes'}</h3>
          </div>
          <ul className="space-y-2">
            {c.notes.map((note, i) => (
              <li key={i} className="text-sm text-amber-200/80 flex items-start gap-2">
                <span className="text-amber-400 flex-shrink-0">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
