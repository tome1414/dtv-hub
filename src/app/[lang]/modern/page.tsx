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

export default function ModernPage({ params }: PageProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 text-slate-900">
      {/* ── Navigation Bar ────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-lg font-bold">
            DTV <span className="text-blue-600">Hub</span>
          </Link>
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a href="#" className="text-slate-600 hover:text-blue-600 transition">
              {dict.nav.guide}
            </a>
            <a href="#" className="text-slate-600 hover:text-blue-600 transition">
              {dict.nav.requirements}
            </a>
            <a href="#" className="text-slate-600 hover:text-blue-600 transition">
              {dict.nav.life}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://discord.gg/dtv-hub"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Discord
            </a>
            <Link
              href={`/${locale}`}
              className="text-xs text-slate-500 hover:text-slate-700 underline"
            >
              Original
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-200 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-6">
            {dict.hero.badge}
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold leading-tight tracking-tight mb-6">
            {dict.hero.headline}
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            {dict.hero.subheadline}
          </p>

          {/* Search */}
          <div className="flex gap-2 mb-8 max-w-lg mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="search"
                placeholder={dict.hero.searchPlaceholder}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search"
              />
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              {dict.hero.searchButton}
            </button>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              10,000+ members
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Free guides
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              5 languages
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories Grid ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">{dict.categories.title}</h2>
          <div className="w-12 h-1 bg-blue-600 rounded-full mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {dict.categories.items.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="group p-6 border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:bg-blue-50"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                <span className="inline-block mt-4 text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  詳しく見る →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Articles Grid ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">{dict.updates.title}</h2>
          <p className="text-slate-600 text-base mb-12">{dict.updates.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.updates.articles.map((article, i) => (
              <article
                key={i}
                className="group border border-slate-200 rounded-xl overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-slate-100 transition-all" />

                <div className="p-5">
                  <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                    {article.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base leading-snug mb-3 group-hover:text-blue-600 transition line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{article.date}</span>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full mb-6">
            {dict.premium.badge}
          </span>

          <h2 className="text-4xl font-bold mb-4">{dict.premium.title}</h2>
          <p className="text-lg text-slate-200 mb-8">{dict.premium.subtitle}</p>

          <ul className="space-y-3 mb-8">
            {dict.premium.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <a
            href={`/${locale}/soft-power`}
            className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            {dict.premium.cta} →
          </a>
        </div>
      </section>

      {/* ── CTA / Community ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{dict.community.title}</h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            {dict.community.description}
          </p>

          <a
            href="https://discord.gg/dtv-hub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            {dict.community.cta}
          </a>
        </div>
      </section>

      {/* ── Footer / Variants ─────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 py-8 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center text-sm text-slate-600">
          <p className="mb-3">🎨 デザインバリアント</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium">
            <Link href={`/${locale}`} className="hover:text-blue-600">
              Original
            </Link>
            <span>|</span>
            <span className="text-blue-600 font-bold">Modern (現在)</span>
            <span>|</span>
            <Link href={`/${locale}/light`} className="hover:text-blue-600">
              Light
            </Link>
            <span>|</span>
            <Link href={`/${locale}/dark`} className="hover:text-blue-600">
              Dark
            </Link>
            <span>|</span>
            <Link href={`/${locale}/wired`} className="hover:text-blue-600">
              WIRED
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
