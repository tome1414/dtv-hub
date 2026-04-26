import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { Sparkles, CheckCircle, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ lang: string }>
}

const content: Record<string, {
  title: string
  subtitle: string
  badge: string
  intro: string
  programs: { icon: string; name: string; duration: string; desc: string; href: string }[]
  steps: { title: string; desc: string }[]
  features: string[]
  cta: string
}> = {
  ja: {
    title: 'ソフトパワービザとは',
    subtitle: 'タイ政府公認プログラムでDTVビザを取得する最短ルート',
    badge: 'タイ政府認定',
    intro: 'ソフトパワービザは、タイ政府が推進する文化・スポーツ・ウェルネス分野の認定プログラムを受講することで、DTVビザ（Destination Thailand Visa）を取得できる制度です。通常の財政証明だけでなく、プログラムへの参加が申請の強力な根拠となります。',
    programs: [
      {
        icon: '⛳',
        name: 'ゴルフスクール DTV',
        duration: '5日間',
        desc: 'タイ政府公認ゴルフスクールでのレッスン。初心者歓迎。全額返金保証付きプランあり。',
        href: '/golf-dtv',
      },
      {
        icon: '💆',
        name: 'タイ古式マッサージ',
        duration: '5〜10日間',
        desc: 'チェンマイやバンコクの認定スクールで伝統医療を学ぶ。国際資格取得も可能。',
        href: '/massage-dtv',
      },
      {
        icon: '🥊',
        name: 'ムエタイ',
        duration: '7日間〜',
        desc: 'タイの国技・ムエタイ道場への入門。フィットネス目的から本格競技まで対応。',
        href: '/soft-power',
      },
      {
        icon: '🍜',
        name: 'タイ料理',
        duration: '5日間〜',
        desc: 'タイ政府認定の料理学校でのコース。観光客向け短期から本格的な修了証まで。',
        href: '/soft-power',
      },
    ],
    steps: [
      { title: 'プログラムを選ぶ', desc: 'ゴルフ、マッサージ、ムエタイ、料理から自分に合ったプログラムを選択' },
      { title: '入学手続き・書類取得', desc: '認定スクールに申込み。入学許可書・推薦状を発行してもらう' },
      { title: 'ビザ申請', desc: '書類一式を揃えて大使館へ申請。通常5〜10営業日で発行' },
      { title: 'タイ入国・プログラム受講', desc: 'ビザ取得後にタイへ渡航。プログラムに参加しながら長期滞在を楽しむ' },
    ],
    features: [
      '通常のフリーランス証明が不要（プログラム参加が根拠になる）',
      '初心者でも参加できるプログラムが多数',
      '認定校から公式書類が発行される',
      '5日間〜の短期プログラムでOK',
      '返金保証付きサービスもあり',
    ],
    cta: 'ゴルフDTVプログラムの詳細を見る',
  },
  en: {
    title: 'What is the Soft Power Visa?',
    subtitle: 'The fastest route to a DTV visa through Thai government-certified programs',
    badge: 'Thai Government Certified',
    intro: 'The Soft Power Visa allows you to obtain a DTV (Destination Thailand Visa) by enrolling in government-certified cultural, sports, or wellness programs. Participation in these programs serves as strong supporting evidence for your visa application.',
    programs: [
      {
        icon: '⛳',
        name: 'Golf School DTV',
        duration: '5 days',
        desc: 'Golf lessons at a Thai government-certified school. Beginner-friendly. Money-back guarantee available.',
        href: '/golf-dtv',
      },
      {
        icon: '💆',
        name: 'Thai Massage',
        duration: '5–10 days',
        desc: 'Study traditional Thai medicine at certified schools in Chiang Mai or Bangkok. International certificates available.',
        href: '/massage-dtv',
      },
      {
        icon: '🥊',
        name: 'Muay Thai',
        duration: '7+ days',
        desc: "Thailand's national sport. From fitness-focused to competitive training at certified dojos.",
        href: '/soft-power',
      },
      {
        icon: '🍜',
        name: 'Thai Cooking',
        duration: '5+ days',
        desc: 'Culinary courses at Thai government-approved cooking schools. Short-term to full certificates.',
        href: '/soft-power',
      },
    ],
    steps: [
      { title: 'Choose a Program', desc: 'Select from golf, massage, Muay Thai, or cooking based on your interest' },
      { title: 'Enroll & Get Documents', desc: 'Apply to a certified school and obtain your acceptance letter and recommendation' },
      { title: 'Apply for Visa', desc: 'Submit all documents to the embassy. Usually issued within 5–10 business days' },
      { title: 'Travel & Attend', desc: 'Fly to Thailand, attend your program, and enjoy your long-term stay' },
    ],
    features: [
      'No need for typical freelance income proof — program participation is sufficient',
      'Many programs welcome complete beginners',
      'Official documents issued by certified institutions',
      'Short programs from just 5 days qualify',
      'Money-back guarantee plans available',
    ],
    cta: 'View Golf DTV Program Details',
  },
}

function getContent(locale: Locale) {
  return content[locale] ?? content.en
}

export default async function SoftPowerPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = getContent(locale)

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

        {/* Programs */}
        <h2 className="text-xl font-bold mb-5">{locale === 'ja' ? '認定プログラム一覧' : 'Certified Programs'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {c.programs.map((prog, i) => (
            <Link
              key={i}
              href={`/${locale}${prog.href}`}
              className="bg-navy-900 rounded-2xl p-6 border border-white/10 hover:border-gold-500/40 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{prog.icon}</span>
                <span className="text-xs text-navy-400 bg-navy-800 px-2 py-1 rounded-full">{prog.duration}</span>
              </div>
              <h3 className="font-bold mb-2 group-hover:text-gold-400 transition-colors">{prog.name}</h3>
              <p className="text-sm text-navy-300">{prog.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-gold-400 text-sm font-semibold">
                <span>{locale === 'ja' ? '詳細を見る' : 'Learn more'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
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
          <h2 className="text-lg font-bold mb-4">{locale === 'ja' ? 'ソフトパワービザのメリット' : 'Why Choose Soft Power Visa'}</h2>
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
