import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ lang: string }>
}

const content: Record<string, {
  title: string
  subtitle: string
  categories: { icon: string; title: string; desc: string; href: string }[]
}> = {
  ja: {
    title: 'タイ生活ガイド',
    subtitle: 'バンコク・チェンマイでのDTVビザ長期滞在に役立つ情報を網羅',
    categories: [
      { icon: '🏙️', title: 'バンコク生活情報', desc: 'エリア案内・交通・おすすめスポット・生活コストの基礎知識', href: '/life/bangkok' },
      { icon: '🏠', title: '家賃・物件', desc: 'コンドミニアム・アパートの家賃相場と探し方', href: '/life/housing' },
      { icon: '🏥', title: '医療・保険', desc: '病院・クリニック情報と海外在住者向け保険の選び方', href: '/life/health' },
      { icon: '💴', title: '税金・金融', desc: '確定申告・銀行口座・外貨両替の実用ガイド', href: '/life/finance' },
    ],
  },
  en: {
    title: 'Living in Thailand',
    subtitle: 'Everything you need to know about long-term DTV life in Bangkok and Chiang Mai',
    categories: [
      { icon: '🏙️', title: 'Bangkok Living Guide', desc: 'Neighborhoods, transport, cost of living and local tips', href: '/life/bangkok' },
      { icon: '🏠', title: 'Housing & Rentals', desc: 'Condo and apartment rental prices and how to find them', href: '/life/housing' },
      { icon: '🏥', title: 'Healthcare & Insurance', desc: 'Hospitals, clinics, and insurance options for long-term residents', href: '/life/health' },
      { icon: '💴', title: 'Tax & Finance', desc: 'Tax filing, banking, and currency exchange practical guide', href: '/life/finance' },
    ],
  },
}

function getContent(locale: Locale) {
  return content[locale] ?? content.en
}

export default async function LifePage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const c = getContent(locale)

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-gold-400" />
            <h1 className="text-3xl sm:text-4xl font-bold">{c.title}</h1>
          </div>
          <p className="text-navy-300 text-lg">{c.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {c.categories.map((cat, i) => (
            <Link
              key={i}
              href={`/${locale}${cat.href}`}
              className="bg-navy-900 rounded-2xl p-6 border border-white/10 hover:border-gold-500/40 transition-colors group"
            >
              <span className="text-3xl mb-3 block">{cat.icon}</span>
              <h2 className="font-bold mb-2 group-hover:text-gold-400 transition-colors">{cat.title}</h2>
              <p className="text-sm text-navy-300 mb-4">{cat.desc}</p>
              <div className="flex items-center gap-1 text-gold-400 text-sm font-semibold">
                <span>{locale === 'ja' ? '詳しく見る' : 'Read more'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
