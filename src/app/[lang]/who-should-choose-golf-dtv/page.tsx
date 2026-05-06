import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { CheckCircle, XCircle, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const isJa = lang === 'ja'
  return {
    title: isJa ? 'ゴルフDTVは自分に向いている？適性チェック' : 'Is Golf DTV Right for You? Suitability Check',
    description: isJa
      ? 'ゴルフDTVプログラムが向いている人・向いていない人を解説。タイ長期滞在ビザ（DTV）をゴルフで取得する方法を確認できます。'
      : 'Find out if the Golf DTV program is right for you. Learn who benefits most from obtaining a DTV visa through golf.',
  }
}

const content = {
  ja: {
    badge: 'タイ政府認定プログラム',
    title: 'ゴルフDTVは自分に向いている？',
    subtitle: '5つのチェックで1分で分かる適性確認',
    intro: 'ゴルフDTVは、タイ政府が認定するゴルフスクールプログラムを受講することで、DTVビザ（長期滞在ビザ）を取得できるサービスです。フリーランス証明なしでも申請できるため、会社員・主婦・退職者など幅広い方が利用しています。',
    suitableTitle: 'こんな方に向いています',
    suitable: [
      'タイへの長期滞在（3ヶ月以上）を検討している',
      'フリーランス証明書類の用意が難しい（会社員・主婦など）',
      'ゴルフ経験があるか、ゴルフに興味がある',
      'スムーズなビザ取得を重視する（書類不備リスクを減らしたい）',
      '定年退職後の海外生活を考えている',
      '資産運用・節税を目的としたタイ居住を検討している',
    ],
    unsuitableTitle: 'こんな方には向いていないかもしれません',
    unsuitable: [
      'ゴルフに全く興味がなく、プログラム参加自体を避けたい',
      '短期滞在（1〜2ヶ月程度）のみ予定している',
      'リモートワーク証明書類が揃っており、フリーランスルートで申請できる',
    ],
    program: {
      title: 'ゴルフDTVプログラムの概要',
      items: [
        { label: '場所', value: 'タイ・バンコク近郊のゴルフコース' },
        { label: 'レベル', value: '初心者〜経験者まで対応' },
        { label: '書類', value: '入学許可書・推薦状を発行' },
        { label: '保証', value: '全額返金保証プランあり' },
        { label: '実績', value: '多数のDTV取得サポート実績' },
      ],
    },
    faq: [
      { q: 'ゴルフが初心者でも大丈夫？', a: '問題ありません。プログラムは初心者向けカリキュラムも用意されており、ゴルフの腕前はビザ審査に影響しません。' },
      { q: 'プログラム後はタイに滞在し続けられる？', a: 'DTV取得後は5年間有効で、1回の入国につき最大180日まで滞在できます。プログラム終了後も継続して滞在可能です。' },
      { q: '日本語でサポートは受けられる？', a: '日本語でのビザ申請書類サポート・相談窓口が用意されています。まずは無料相談をご利用ください。' },
    ],
    ctaPrimary: '無料相談する',
    ctaSecondary: '申請の流れを見る',
  },
  en: {
    badge: 'Thai Government Certified Program',
    title: 'Is Golf DTV Right for You?',
    subtitle: 'Find out in 1 minute with 5 quick checks',
    intro: 'Golf DTV is a service that helps you obtain a DTV (long-stay visa) by enrolling in a Thai government-certified golf school program. No freelance documentation required — it\'s popular with employees, retirees, and anyone seeking a smooth visa process.',
    suitableTitle: 'Golf DTV is a great fit if you…',
    suitable: [
      'Are planning a long stay in Thailand (3+ months)',
      'Have difficulty proving freelance income (employed, homemaker, etc.)',
      'Play golf or are open to learning',
      'Want a smooth, low-risk visa application process',
      'Are considering retirement or semi-retirement in Thailand',
      'Are exploring asset management or tax residency in Thailand',
    ],
    unsuitableTitle: 'Golf DTV may not be the best fit if you…',
    unsuitable: [
      'Have no interest in golf and want to avoid any program participation',
      'Only plan to stay for 1–2 months',
      'Already have remote work documentation and can use the freelance route',
    ],
    program: {
      title: 'Golf DTV Program Overview',
      items: [
        { label: 'Location', value: 'Golf courses near Bangkok, Thailand' },
        { label: 'Level', value: 'Beginner to experienced — all welcome' },
        { label: 'Documents', value: 'Acceptance letter and recommendation issued' },
        { label: 'Guarantee', value: 'Money-back guarantee plan available' },
        { label: 'Track record', value: 'Many successful DTV applications supported' },
      ],
    },
    faq: [
      { q: 'Do I need golf experience?', a: 'No experience needed. The program has beginner-friendly courses, and your skill level has no impact on the visa application.' },
      { q: 'Can I keep staying in Thailand after the program?', a: 'Yes. The DTV is valid for 5 years, allowing stays of up to 180 days per entry. You can continue staying after the program ends.' },
      { q: 'Is English support available?', a: 'Yes, English-language support for visa documents and consultation is available. Start with a free consultation.' },
    ],
    ctaPrimary: 'Get a Free Consultation',
    ctaSecondary: 'View Application Process',
  },
}

export default async function WhoShouldChooseGolfDtvPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = content[locale as keyof typeof content] ?? content.en

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
            <Star className="w-3 h-3" />
            {c.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{c.title}</h1>
          <p className="text-gold-300 text-lg font-semibold mb-3">{c.subtitle}</p>
          <p className="text-navy-300 leading-relaxed">{c.intro}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-navy-900 rounded-2xl p-6 border border-gold-500/20">
            <h2 className="font-bold text-gold-400 mb-4">{c.suitableTitle}</h2>
            <ul className="space-y-3">
              {c.suitable.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-navy-900 rounded-2xl p-6 border border-white/10">
            <h2 className="font-bold text-navy-400 mb-4">{c.unsuitableTitle}</h2>
            <ul className="space-y-3">
              {c.unsuitable.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <XCircle className="w-4 h-4 text-navy-500 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-navy-900 rounded-2xl p-6 border border-white/10 mb-10">
          <h2 className="font-bold mb-5">{c.program.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {c.program.items.map((item, i) => (
              <div key={i} className="bg-navy-950/60 rounded-xl p-4">
                <div className="text-xs text-navy-400 mb-1">{item.label}</div>
                <div className="text-sm font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {c.faq.map((item, i) => (
            <div key={i} className="bg-navy-900 rounded-2xl p-5 border border-white/10">
              <p className="font-bold text-sm mb-2 text-gold-300">Q. {item.q}</p>
              <p className="text-sm text-navy-300 leading-relaxed">A. {item.a}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/${locale}/golf-dtv#inquiry`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            {c.ctaPrimary}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/${locale}/dtv-application`}
            className="flex items-center justify-center gap-2 border border-white/20 text-navy-200 font-semibold px-6 py-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            {c.ctaSecondary}
          </Link>
        </div>

      </div>
    </div>
  )
}
