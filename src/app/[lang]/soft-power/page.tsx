import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { Sparkles, CheckCircle, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ lang: string }>
}

const content = {
  ja: {
    badge: 'タイ政府認定',
    title: 'ソフトパワービザとは',
    subtitle: 'タイ政府公認プログラムでDTVビザを取得する最短ルート',
    intro: 'ソフトパワービザは、タイ政府が推進する文化・スポーツ・ウェルネス分野の認定プログラムを受講することで、DTVビザ（Destination Thailand Visa）を取得できる制度です。通常の財政証明だけでなく、プログラムへの参加が申請の強力な根拠となります。',
    otherPrograms: 'ソフトパワー対象プログラムには、ゴルフのほかにも、タイ古式マッサージ・ムエタイ・タイ料理などのタイ政府認定プログラムが存在します。ただし当サービスが提供・サポートしているのはゴルフDTVのみです。',
    steps: [
      { title: 'プログラムを選ぶ', desc: 'タイ政府認定のゴルフスクールプログラムを選択' },
      { title: '入学手続き・書類取得', desc: '認定スクールに申込み。入学許可書・推薦状を発行してもらう' },
      { title: 'ビザ申請', desc: '書類一式を揃えて大使館へ申請。通常5〜10営業日で発行' },
      { title: 'タイ入国・プログラム受講', desc: 'ビザ取得後にタイへ渡航。プログラムに参加しながら長期滞在を楽しむ' },
    ],
    features: [
      '通常のフリーランス証明が不要（プログラム参加が根拠になる）',
      '初心者でも参加できる',
      '認定校から公式書類が発行される',
      '5日間〜の短期プログラムでOK',
      '返金保証付きサービスあり',
    ],
    cta: 'ゴルフDTVプログラムの詳細を見る',
  },
  en: {
    badge: 'Thai Government Certified',
    title: 'What is the Soft Power Visa?',
    subtitle: 'The fastest route to a DTV visa through Thai government-certified programs',
    intro: 'The Soft Power Visa allows you to obtain a DTV (Destination Thailand Visa) by enrolling in government-certified cultural, sports, or wellness programs. Participation in these programs serves as strong supporting evidence for your visa application.',
    otherPrograms: 'Soft Power eligible programs include Thai massage, Muay Thai, Thai cooking, and other Thai government-certified activities in addition to golf. However, our service supports and provides the Golf DTV program only.',
    steps: [
      { title: 'Choose a Program', desc: 'Select a Thai government-certified golf school program' },
      { title: 'Enroll & Get Documents', desc: 'Apply to a certified school and obtain your acceptance letter and recommendation' },
      { title: 'Apply for Visa', desc: 'Submit all documents to the embassy. Usually issued within 5–10 business days' },
      { title: 'Travel & Attend', desc: 'Fly to Thailand, attend your program, and enjoy your long-term stay' },
    ],
    features: [
      'No need for typical freelance income proof — program participation is sufficient',
      'Beginner-friendly',
      'Official documents issued by certified institutions',
      'Short programs from just 5 days qualify',
      'Money-back guarantee available',
    ],
    cta: 'View Golf DTV Program Details',
  },
}

export default async function SoftPowerPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = content[locale as keyof typeof content] ?? content.en

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
            <Star className="w-3 h-3" />
            {c.badge}
          </span>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-gold-400" />
            <h1 className="text-3xl sm:text-4xl font-bold">{c.title}</h1>
          </div>
          <p className="text-gold-300 text-lg font-semibold mb-4">{c.subtitle}</p>
          <p className="text-navy-300 leading-relaxed">{c.intro}</p>
        </div>

        {/* Golf DTV featured */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">{locale === 'ja' ? '当サービスが提供するプログラム' : 'Program We Provide'}</h2>
          <Link
            href={`/${locale}/golf-dtv`}
            className="block bg-navy-900 rounded-2xl p-6 border border-gold-500/30 hover:border-gold-500/60 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">⛳</span>
              <span className="text-xs text-navy-400 bg-navy-800 px-2 py-1 rounded-full">
                {locale === 'ja' ? '5日間' : '5 days'}
              </span>
            </div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-gold-400 transition-colors">
              {locale === 'ja' ? 'ゴルフスクール DTV' : 'Golf School DTV'}
            </h3>
            <p className="text-sm text-navy-300 mb-3">
              {locale === 'ja'
                ? 'タイ政府公認ゴルフスクールでのレッスン。初心者歓迎。全額返金保証付きプランあり。'
                : 'Golf lessons at a Thai government-certified school. Beginner-friendly. Money-back guarantee available.'}
            </p>
            <div className="flex items-center gap-1 text-gold-400 text-sm font-semibold">
              <span>{locale === 'ja' ? '詳細を見る' : 'Learn more'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Other programs - brief mention */}
        <div className="bg-navy-900/50 border border-white/5 rounded-xl p-5 mb-10">
          <p className="text-xs text-navy-400 font-semibold uppercase tracking-wider mb-2">
            {locale === 'ja' ? 'その他のソフトパワー対象プログラム' : 'Other Soft Power Programs'}
          </p>
          <p className="text-sm text-navy-400 leading-relaxed">{c.otherPrograms}</p>
        </div>

        {/* Steps */}
        <div className="bg-navy-900 rounded-2xl p-6 border border-white/10 mb-10">
          <h2 className="text-lg font-bold mb-6">{locale === 'ja' ? '申請の流れ' : 'How It Works'}</h2>
          <div className="space-y-5">
            {c.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold text-sm flex-shrink-0">{i + 1}</div>
                <div>
                  <div className="font-bold mb-1">{step.title}</div>
                  <div className="text-sm text-navy-300">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-navy-900 rounded-2xl p-6 border border-white/10 mb-10">
          <h2 className="text-lg font-bold mb-4">
            {locale === 'ja' ? 'ソフトパワービザのメリット' : 'Why Choose Soft Power Visa'}
          </h2>
          <ul className="space-y-3">
            {c.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="text-navy-200 text-sm">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href={`/${locale}/golf-dtv`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            {c.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  )
}
