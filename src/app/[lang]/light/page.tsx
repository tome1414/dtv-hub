'use client'

import Link from 'next/link'
import { Search, ArrowRight, BookOpen, Users, Lightbulb, Globe } from 'lucide-react'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { useEffect, useState } from 'react'
import { getDictionary } from '@/lib/dictionaries'
import type { Dictionary } from '@/types'

interface PageProps {
  params: Promise<{ lang: string }>
}

export default function LightPage({ params }: PageProps) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const [locale, setLocale] = useState<Locale>('ja')

  useEffect(() => {
    params.then(async ({ lang }) => {
      const loc = (locales.includes(lang as Locale) ? lang : 'ja') as Locale
      setLocale(loc)
      const dictionary = await getDictionary(loc)
      setDict(dictionary)
    })
  }, [params])

  if (!dict) return null

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* ── Top Bar ────────────────────────────────────────────────────── */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs text-gray-600">
          <div>最新情報 2025年対応</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-gray-900">
              English
            </a>
            <a href="#" className="hover:text-gray-900">
              中文
            </a>
          </div>
        </div>
      </div>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold">
            DTV <span className="text-teal-600">HUB</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="text-gray-700 hover:text-teal-600">
              {dict.nav.guide}
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600">
              {dict.nav.requirements}
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600">
              {dict.nav.life}
            </a>
            <a href="#" className="text-gray-700 hover:text-teal-600">
              {dict.nav.softPower}
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://discord.gg/dtv-hub"
              className="hidden sm:block px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded hover:bg-teal-700 transition"
            >
              {dict.nav.joinDiscord}
            </a>
            <Link
              href={`/${locale}`}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Original
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded mb-6">
            {dict.hero.badge}
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
            {dict.hero.headline}
          </h1>

          <p className="text-xl leading-relaxed text-gray-600 mb-10 max-w-2xl mx-auto">
            {dict.hero.subheadline}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="search"
                  placeholder={dict.hero.searchPlaceholder}
                  className="w-full pl-12 pr-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  aria-label="Search"
                />
              </div>
              <button className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition whitespace-nowrap">
                {dict.hero.searchButton}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" />
              <span>10,000+ members</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Free resources</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-600" />
              <span>5 languages</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories Section ────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">{dict.categories.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.categories.items.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="group flex flex-col p-6 border border-gray-200 rounded-lg hover:border-teal-300 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 flex-grow leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 text-teal-600 font-semibold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  詳しく見る <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles Section ──────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{dict.updates.title}</h2>
            <p className="text-lg text-gray-600">{dict.updates.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.updates.articles.map((article, i) => (
              <article key={i} className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-sm text-gray-400 font-medium">Article Image</span>
                </div>

                <div className="p-6">
                  <div className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-2">
                    {article.category}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-teal-600 transition">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{article.date}</span>
                    <span className="text-sm font-semibold text-teal-600 group-hover:translate-x-1 transition-transform">
                      {dict.updates.readMore} →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-block px-6 py-3 border border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition"
            >
              すべての記事を見る
            </a>
          </div>
        </div>
      </section>

      {/* ── Premium Section ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded mb-6">
            {dict.premium.badge}
          </span>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">{dict.premium.title}</h2>
          <p className="text-lg text-gray-600 mb-10">{dict.premium.subtitle}</p>

          <ul className="space-y-3 mb-10">
            {dict.premium.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <Lightbulb className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={`/${locale}/soft-power`}
            className="inline-block px-8 py-4 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition"
          >
            {dict.premium.cta} →
          </a>
        </div>
      </section>

      {/* ── Community CTA ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-teal-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{dict.community.title}</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            {dict.community.description}
          </p>

          <a
            href="https://discord.gg/dtv-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition"
          >
            {dict.community.cta}
          </a>
        </div>
      </section>

      {/* ── Footer / Design Variants ──────────────────────────────────── */}
      <footer className="border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-600">
          <p className="mb-3 font-semibold">🎨 デザインバリアント</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium">
            <Link href={`/${locale}`} className="hover:text-teal-600">
              Original
            </Link>
            <span>|</span>
            <Link href={`/${locale}/modern`} className="hover:text-teal-600">
              Modern
            </Link>
            <span>|</span>
            <span className="text-teal-600 font-bold">Light (現在)</span>
            <span>|</span>
            <Link href={`/${locale}/dark`} className="hover:text-teal-600">
              Dark
            </Link>
            <span>|</span>
            <Link href={`/${locale}/wired`} className="hover:text-teal-600">
              WIRED
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-500">{dict.footer.legal}</p>
        </div>
      </footer>
    </div>
  )
}
