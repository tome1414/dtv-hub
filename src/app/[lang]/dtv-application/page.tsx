import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { ClipboardList, CheckCircle, AlertCircle, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const isJa = lang === 'ja'
  return {
    title: isJa ? 'DTVビザの申請方法｜ステップ別完全ガイド' : 'How to Apply for a DTV Visa | Step-by-Step Guide',
    description: isJa
      ? 'DTVビザ（Destination Thailand Visa）の申請手順を全ステップ解説。必要書類・大使館予約・審査期間まで詳しく説明します。'
      : 'Complete step-by-step guide to applying for a DTV visa. Covers documents, embassy appointments, and processing times.',
  }
}

const content = {
  ja: {
    badge: 'ソフトパワールート対応',
    title: 'DTVビザの申請方法',
    subtitle: '申請前の準備から受取まで、全ステップを解説します',
    steps: [
      {
        num: 1,
        title: 'ビザルートを決める',
        duration: '〜1週間前',
        desc: 'DTVには「フリーランス・リモートワーク」と「ソフトパワー（ゴルフ・マッサージ等）」の2ルートがあります。自分の状況に合ったルートを選択してください。',
        items: [
          'フリーランス・リモートワーク：雇用契約書・収入証明が必要',
          'ソフトパワー：タイ政府認定プログラムの入学許可書が必要',
          'どちらのルートか不明な場合は無料相談を利用してください',
        ],
      },
      {
        num: 2,
        title: '必要書類を揃える',
        duration: '2〜4週間前',
        desc: 'ルートによって必要書類が異なります。不備があると申請が却下されるため、事前にチェックリストで確認しましょう。',
        items: [
          'パスポート（残存18ヶ月以上）・証明写真・申請書',
          '財政証明：残高証明書（英語）・過去3〜6ヶ月の明細',
          '海外健康保険の証書（補償額40,000USD以上推奨）',
          'ソフトパワーの場合：入学許可書・プログラム料金支払い証明',
        ],
      },
      {
        num: 3,
        title: '大使館を予約する',
        duration: '2〜3週間前',
        desc: '管轄のタイ大使館またはタイ王国総領事館にオンライン・電話で予約します。繁忙期は予約が混むため早めに。',
        items: [
          '東京：タイ王国大使館（港区南麻布）',
          '大阪：タイ王国総領事館（北区梅田）',
          '福岡・名古屋・札幌にも領事館があります',
          '郵送申請が可能な大使館もあります（事前確認を）',
        ],
      },
      {
        num: 4,
        title: '申請窓口へ提出',
        duration: '予約当日',
        desc: '書類一式と手数料を持参して窓口へ。提出後は原則その場での確認のみで、審査は後日行われます。',
        items: [
          '手数料：10,000円前後（現金のみの窓口が多い）',
          '書類のコピーも持参しておくと安心',
          '申請後の書類返却は原則なし',
          '受取番号・領収書は大切に保管',
        ],
      },
      {
        num: 5,
        title: 'ビザを受け取る',
        duration: '申請後5〜10営業日',
        desc: '審査完了後、窓口受取またはレターパックで郵送されます。受取前にビザのページを必ず確認してください。',
        items: [
          '有効期間・入国回数・滞在可能日数を確認',
          'パスポートへの貼付位置・記載事項に誤りがないか確認',
          'ビザの有効期間は発行日から5年',
          '1回の滞在上限：180日',
        ],
      },
    ],
    tips: [
      '申請書類は大使館によって細かい要件が異なるため、必ず事前に公式サイトで確認してください',
      '財政証明は「英語」で発行してもらう必要があります。日本語の証明書には公証翻訳が必要です',
      'ソフトパワーの場合、プログラム開始前でも入学許可書があれば申請できます',
      'ビザ申請後に大使館から追加書類を求められる場合があります',
    ],
    ctaPrimary: 'ゴルフDTVで最短申請する',
    ctaSecondary: '必要書類を確認する',
  },
  en: {
    badge: 'Soft Power Route Supported',
    title: 'How to Apply for a DTV Visa',
    subtitle: 'Every step from preparation to pickup, fully explained',
    steps: [
      {
        num: 1,
        title: 'Choose Your Visa Route',
        duration: '1+ week before',
        desc: 'DTV offers two main routes: Freelance/Remote Work and Soft Power (golf, massage, etc.). Choose the route that fits your situation.',
        items: [
          'Freelance/Remote Work: requires employment contract and income proof',
          'Soft Power: requires acceptance letter from a Thai government-certified program',
          'Unsure which route? Use our free consultation service',
        ],
      },
      {
        num: 2,
        title: 'Prepare Required Documents',
        duration: '2–4 weeks before',
        desc: 'Required documents vary by route. Any missing document can result in rejection, so check the full list in advance.',
        items: [
          'Passport (18+ months validity), photos, application form',
          'Financial proof: English bank statement, 3–6 months of transactions',
          'International health insurance (USD 40,000+ coverage recommended)',
          'Soft Power only: acceptance letter and proof of program payment',
        ],
      },
      {
        num: 3,
        title: 'Book Your Embassy Appointment',
        duration: '2–3 weeks before',
        desc: 'Book online or by phone at your local Thai embassy or consulate. Availability fills up quickly during busy periods.',
        items: [
          'Book well in advance during peak travel seasons',
          'Postal applications are available at some embassies',
          'Check the embassy website for current hours and requirements',
        ],
      },
      {
        num: 4,
        title: 'Submit Your Application',
        duration: 'Appointment day',
        desc: 'Bring all documents and the application fee to the window. Documents are submitted on the day; review happens afterwards.',
        items: [
          'Fee: approx. ¥10,000 (cash only at many locations)',
          'Bring copies of all documents as backup',
          'Keep your receipt and application number safe',
        ],
      },
      {
        num: 5,
        title: 'Receive Your Visa',
        duration: '5–10 business days after submission',
        desc: 'After processing, pick up at the window or receive by mail. Always verify the visa details upon receipt.',
        items: [
          'Check validity period, entry count, and max stay per entry',
          'Verify the sticker is correctly placed in your passport',
          'Visa is valid for 5 years from issue date',
          'Maximum stay per entry: 180 days',
        ],
      },
    ],
    tips: [
      'Requirements vary by embassy — always check the official website before applying',
      'Financial documents must be in English. Japanese-language documents require certified translation',
      'For Soft Power, you can apply before the program starts as long as you have an acceptance letter',
      'The embassy may request additional documents after submission',
    ],
    ctaPrimary: 'Apply Fast with Golf DTV',
    ctaSecondary: 'Check Required Documents',
  },
}

export default async function DtvApplicationPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = content[locale as keyof typeof content] ?? content.en

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
            {c.badge}
          </span>
          <div className="flex items-center gap-3 mb-4">
            <ClipboardList className="w-8 h-8 text-gold-400" />
            <h1 className="text-3xl sm:text-4xl font-bold">{c.title}</h1>
          </div>
          <p className="text-navy-300 text-lg">{c.subtitle}</p>
        </div>

        <div className="space-y-6 mb-12">
          {c.steps.map((step) => (
            <div key={step.num} className="bg-navy-900 rounded-2xl p-6 border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold flex-shrink-0">
                  {step.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-lg font-bold">{step.title}</h2>
                    <span className="flex items-center gap-1 text-xs text-navy-400 bg-navy-800 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-navy-300 text-sm mb-4 leading-relaxed">{step.desc}</p>
                  <ul className="space-y-2">
                    {step.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-navy-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-6 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-amber-300">{locale === 'ja' ? '申請時の注意点' : 'Important Notes'}</h3>
          </div>
          <ul className="space-y-2">
            {c.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-200/80">
                <span className="text-amber-400 flex-shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/${locale}/golf-dtv`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            {c.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/${locale}/requirements`}
            className="flex items-center justify-center gap-2 border border-white/20 text-navy-200 font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            {c.ctaSecondary}
          </Link>
        </div>

      </div>
    </div>
  )
}
