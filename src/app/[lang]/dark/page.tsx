'use client'

import Link from 'next/link'
import { Search, ArrowRight, BookOpen, Users, Zap, Globe } from 'lucide-react'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { useEffect, useState } from 'react'
import { getDictionary } from '@/lib/dictionaries'
import type { Dictionary } from '@/types'

interface PageProps {
  params: Promise<{ lang: string }>
}

export default function DarkPage({ params }: PageProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold">
            DTV <span className="text-cyan-400">HUB</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition">
              {dict.nav.guide}
            </a>
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition">
              {dict.nav.requirements}
            </a>
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition">
              {dict.nav.life}
            </a>
            <a href="#" className="text-gray-300 hover:text-cyan-400 transition">
              {dict.nav.softPower}
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://discord.gg/dtv-hub"
              className="hidden sm:block px-4 py-2 text-sm font-semibold text-gray-900 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition"
            >
              {dict.nav.joinDiscord}
            </a>
            <Link
              href={`/${locale}`}
              className="text-xs text-gray-400 hover:text-gray-200 underline"
            >
              Original
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-gray-800 text-cyan-400 text-xs font-bold rounded-full mb-6 border border-cyan-400/30">
            {dict.hero.badge}
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight mb-6">
            {dict.hero.headline}
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            {dict.hero.subheadline}
          </p>

          {/* Search */}
          <div className="flex gap-2 mb-8 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="search"
                placeholder={dict.hero.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500"
                aria-label="Search"
              />
            </div>
            <button className="px-6 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-lg hover:bg-cyan-400 transition">
              {dict.hero.searchButton}
            </button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              10,000+ members
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Free guides
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              5 languages
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories Grid ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">{dict.categories.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.categories.items.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="group p-6 border border-gray-800 rounded-xl bg-gray-800/30 hover:bg-gray-800/60 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-cyan-400 transition">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                <span className="inline-block mt-4 text-cyan-400 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  詳しく見る →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles Grid ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">{dict.updates.title}</h2>
          <p className="text-gray-400 text-base mb-12">{dict.updates.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.updates.articles.map((article, i) => (
              <article
                key={i}
                className="group border border-gray-800 rounded-xl overflow-hidden bg-gray-800/20 hover:bg-gray-800/40 hover:border-cyan-400/50 transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-gray-700 to-gray-800 group-hover:from-cyan-500/10 group-hover:to-gray-800 transition-all" />

                <div className="p-5">
                  <span className="inline-block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                    {article.category}
                  </span>
                  <h3 className="font-bold text-white text-base leading-snug mb-3 group-hover:text-cyan-400 transition line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{article.date}</span>
                    <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                      {dict.updates.readMore} →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium Offer ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gradient-to-r from-gray-800/50 to-cyan-500/5">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 bg-gray-800 text-cyan-400 text-xs font-bold rounded-full mb-6 border border-cyan-400/30">
            {dict.premium.badge}
          </span>

          <h2 className="text-4xl font-bold mb-4">{dict.premium.title}</h2>
          <p className="text-lg text-gray-300 mb-8">{dict.premium.subtitle}</p>

          <ul className="space-y-3 mb-8">
            {dict.premium.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={`/${locale}/soft-power`}
            className="inline-block px-8 py-4 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition"
          >
            {dict.premium.cta} →
          </a>
        </div>
      </section>

      {/* ── Community CTA ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{dict.community.title}</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-10">
            {dict.community.description}
          </p>

          <a
            href="https://discord.gg/dtv-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition"
          >
            {dict.community.cta}
          </a>
        </div>
      </section>

      {/* ── Footer / Variants ─────────────────────────────────────────── */}
      <footer className="border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
          <p className="mb-3 font-semibold">🎨 デザインバリアント</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium">
            <Link href={`/${locale}`} className="hover:text-cyan-400">
              Original
            </Link>
            <span>|</span>
            <Link href={`/${locale}/modern`} className="hover:text-cyan-400">
              Modern
            </Link>
            <span>|</span>
            <Link href={`/${locale}/light`} className="hover:text-cyan-400">
              Light
            </Link>
            <span>|</span>
            <span className="text-cyan-400 font-bold">Dark (現在)</span>
            <span>|</span>
            <Link href={`/${locale}/wired`} className="hover:text-cyan-400">
              WIRED
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-600">{dict.footer.legal}</p>
        </div>
      </footer>
    </div>
  )
}
