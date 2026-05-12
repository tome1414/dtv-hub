import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
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
    alternates: {
      canonical: `https://dtvclub.com/${lang}/dtv-application`,
    },
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
          '書類要件の詳細は申請先公館の最新案内を確認してください',
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
    tipsTitle: '申請時の注意点',
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
          'Check the latest requirements from your applying embassy',
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
    tipsTitle: 'Important Notes',
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

const C = {
  bg: '#F5F8FA', bgSection: '#EDF1F5', bgCard: '#FFFFFF',
  text: '#1A2435', sub: '#4A5A6E', muted: '#7E8EA4',
  border: 'rgba(26,36,53,0.10)',
  green: '#0A7A6A', tealDim: 'rgba(10,122,106,0.10)',
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function DtvApplicationPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = (content as Record<string, typeof content.en>)[locale] ?? content.en

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, paddingTop: 64, paddingBottom: 80 }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ padding: '40px 0 32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.tealDim, border: '1px solid rgba(10,122,106,0.2)', borderRadius: 100, padding: '3px 10px 3px 6px', marginBottom: 16 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{c.badge}</span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 30, fontWeight: 700, color: C.text, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
            {c.title}
          </h1>
          <p style={{ fontSize: 14, color: C.sub, lineHeight: 1.7, margin: 0 }}>{c.subtitle}</p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
          {c.steps.map((step) => (
            <div key={step.num} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 24px', boxShadow: '0 2px 8px rgba(26,36,53,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{
                  width: 36, height: 36, flexShrink: 0,
                  borderRadius: '50%', border: `2px solid ${C.green}`,
                  background: C.tealDim,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800, color: C.green,
                }}>
                  {step.num}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h2 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: 0 }}>{step.title}</h2>
                    <span style={{ fontSize: 11, color: C.muted, background: C.bgSection, padding: '2px 8px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {step.duration}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: C.sub, margin: '0 0 12px', lineHeight: 1.7 }}>{step.desc}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {step.items.map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span style={{ color: C.sub, lineHeight: 1.5 }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips callout */}
        <div style={{ background: '#FFF9EC', border: '1px solid #E8D5A0', borderLeft: '4px solid #C9A030', borderRadius: '0 10px 10px 0', padding: '16px 20px', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: '#7A5E1A', margin: 0 }}>{c.tipsTitle}</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {c.tips.map((tip, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#6B4F1A', lineHeight: 1.65 }}>
                <span style={{ color: '#C9A030', flexShrink: 0 }}>•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Link href={`/${locale}/golf-dtv`} className="btn-richb-gold" style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'inherit' }}>
            {c.ctaPrimary}
          </Link>
          <Link href={`/${locale}/requirements`} className="btn-richb-sub" style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'inherit' }}>
            {c.ctaSecondary}
          </Link>
        </div>

      </div>
    </div>
  )
}
