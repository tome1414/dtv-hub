import Link from 'next/link'
import { Search, ArrowRight, Clock } from 'lucide-react'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getDictionary } from '@/lib/dictionaries'

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function WiredPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'ja') as Locale
  const dict = await getDictionary(locale)

  return (
    <div className="bg-white text-black" style={{ fontFamily: 'system-ui, -apple-system' }}>
      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section className="border-b-2 border-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-6xl sm:text-7xl font-bold leading-tight tracking-tight mb-4">
              {dict.hero.headline}
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8">
              {dict.hero.subheadline}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-1 mb-6">
              <input
                type="search"
                placeholder={dict.hero.searchPlaceholder}
                className="flex-1 border-2 border-black px-4 py-3 text-base"
                aria-label="Search"
              />
              <button className="border-2 border-black bg-black text-white px-6 py-3 font-bold hover:bg-white hover:text-black transition-all">
                {dict.hero.searchButton}
              </button>
            </div>
          </div>

          {/* Kicker / Badge */}
          <div className="text-center">
            <span className="inline-block text-xs font-mono tracking-widest uppercase font-bold">
              ▲ {dict.hero.badge}
            </span>
          </div>
        </div>
      </section>

      {/* ── Featured Story Grid ───────────────────────────────────────── */}
      <section className="border-b-2 border-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Ribbon */}
          <div className="bg-black text-white px-4 py-3 mb-12 inline-block font-mono text-sm font-bold tracking-widest">
            目的から探す
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t-2 border-b-2 border-black py-8">
            {dict.categories.items.slice(0, 2).map((item, i) => (
              <article key={i} className="border-r-2 border-black pr-8 last:border-r-0 last:pr-0">
                <div className="mb-4 text-4xl">{item.icon}</div>
                <span className="text-xs font-mono tracking-widest uppercase font-bold">
                  {item.title}
                </span>
                <h3 className="text-3xl font-bold leading-tight my-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-700 mb-4">{item.description}</p>
                <Link
                  href={`/${locale}${item.href}`}
                  className="text-xs font-mono tracking-widest uppercase font-bold border-b-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-1 py-1 inline-block transition-all"
                >
                  詳しく見る →
                </Link>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b-2 border-black py-8 mt-8">
            {dict.categories.items.slice(2, 4).map((item, i) => (
              <article key={i} className="border-r-2 border-black pr-8 last:border-r-0 last:pr-0">
                <div className="mb-4 text-4xl">{item.icon}</div>
                <span className="text-xs font-mono tracking-widest uppercase font-bold">
                  {item.title}
                </span>
                <h3 className="text-3xl font-bold leading-tight my-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-700 mb-4">{item.description}</p>
                <Link
                  href={`/${locale}${item.href}`}
                  className="text-xs font-mono tracking-widest uppercase font-bold border-b-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-1 py-1 inline-block transition-all"
                >
                  詳しく見る →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Most Popular / Latest Updates ──────────────────────────────── */}
      <section className="border-b-2 border-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Ribbon */}
          <div className="bg-black text-white px-4 py-3 mb-8 inline-block font-mono text-sm font-bold tracking-widest">
            最新情報・ナレッジベース
          </div>

          <p className="text-sm text-gray-600 mb-12 font-mono tracking-wider">
            {dict.updates.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t-2 border-black pt-8">
            {dict.updates.articles.map((article, i) => (
              <article key={i} className="border-r-2 border-black pr-8 last:border-r-0 last:pr-0">
                {/* Image Placeholder */}
                <div className="bg-gray-100 aspect-video mb-4 flex items-center justify-center text-gray-400">
                  <span className="text-sm font-mono">[Image]</span>
                </div>

                <span className="inline-block text-xs font-mono tracking-widest uppercase font-bold mb-2">
                  {article.category}
                </span>

                <h3 className="text-xl font-bold leading-tight mb-3">{article.title}</h3>

                <p className="text-sm leading-relaxed text-gray-700 mb-4">{article.excerpt}</p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gray-500 font-mono">
                    <Clock className="w-3 h-3" />
                    {article.date}
                  </div>
                  <a
                    href="#"
                    className="text-blue-600 font-bold border-b-2 border-blue-600 hover:bg-blue-600 hover:text-white px-1 py-1 transition-all"
                  >
                    {dict.updates.readMore}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium / Featured Offer ──────────────────────────────────── */}
      <section className="border-b-2 border-black py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Featured Ribbon */}
          <div className="bg-red-600 text-white px-4 py-3 mb-8 inline-block font-mono text-sm font-bold tracking-widest">
            ▲ 業界初・全額返金保証
          </div>

          <h2 className="text-5xl font-bold leading-tight mb-4">{dict.premium.title}</h2>

          <p className="text-xl font-bold text-gray-700 mb-8">{dict.premium.subtitle}</p>

          <ul className="space-y-3 mb-8 border-l-4 border-black pl-6">
            {dict.premium.features.map((feature, i) => (
              <li key={i} className="text-base leading-relaxed">
                ▪ {feature}
              </li>
            ))}
          </ul>

          <a
            href={`/${locale}/soft-power`}
            className="inline-block border-2 border-black bg-black text-white px-8 py-4 font-bold text-base hover:bg-white hover:text-black transition-all"
          >
            {dict.premium.cta} →
          </a>
        </div>
      </section>

      {/* ── Community / Discord ───────────────────────────────────────── */}
      <section className="border-b-2 border-black py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Kicker */}
          <span className="inline-block text-xs font-mono tracking-widest uppercase font-bold mb-6">
            ▲ {dict.community.memberCount} members
          </span>

          <h2 className="text-5xl font-bold leading-tight mb-6">{dict.community.title}</h2>

          <p className="text-lg leading-relaxed text-gray-700 mb-12 max-w-2xl mx-auto">
            {dict.community.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-12 border-t-2 border-b-2 border-black py-8">
            {dict.community.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-xs font-mono tracking-widest uppercase text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://discord.gg/R2gA6jchfk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-black bg-black text-white px-8 py-4 font-bold text-base hover:bg-white hover:text-black transition-all"
          >
            {dict.community.cta} →
          </a>
        </div>
      </section>

      {/* ── Comparison Link ───────────────────────────────────────────── */}
      <section className="border-b-2 border-black py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 text-center">
        <div className="max-w-6xl mx-auto text-sm">
          <Link
            href={`/${locale}`}
            className="border-b-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white px-2 py-1 transition-all"
          >
            ← オリジナルデザイン（ネイビー × ゴールド）に戻る
          </Link>
        </div>
      </section>
    </div>
  )
}
