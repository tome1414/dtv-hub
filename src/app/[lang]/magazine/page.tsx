'use client'

import Link from 'next/link'
import { Search, MessageSquare, Clock, TrendingUp } from 'lucide-react'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { useEffect, useState } from 'react'
import { getDictionary } from '@/lib/dictionaries'
import type { Dictionary } from '@/types'

interface PageProps {
  params: Promise<{ lang: string }>
}

const mockArticles = [
  {
    id: 1,
    title: '2025年DTVビザ申請フロー完全解説',
    excerpt: '東京タイ大使館での最新申請手順を実際の体験に基づいて解説します。',
    category: '申請ガイド',
    date: '2025年4月13日',
    readTime: '8分',
    views: '2.3k',
    size: 'large',
  },
  {
    id: 2,
    title: 'バンコク家賃相場2025',
    excerpt: 'プロンポン vs シーロム。最新情報を徹底比較。',
    category: 'タイ生活',
    date: '2025年4月12日',
    readTime: '6分',
    views: '1.2k',
    size: 'small',
  },
  {
    id: 3,
    title: 'ゴルフスクールDTV実体験',
    excerpt: '政府認定スクール完全レポート。費用・スケジュール解説。',
    category: 'ソフトパワー',
    date: '2025年4月11日',
    readTime: '10分',
    views: '890',
    size: 'small',
  },
  {
    id: 4,
    title: 'DTVビザ家族帯同ガイド',
    excerpt: '配偶者・子どもの手続き完全版',
    category: '家族ビザ',
    date: '2025年4月10日',
    readTime: '7分',
    views: '650',
    size: 'medium',
  },
  {
    id: 5,
    title: 'タイの税金・保険制度',
    excerpt: 'DTV取得者向けの税務ガイド',
    category: '税金・保険',
    date: '2025年4月9日',
    readTime: '12分',
    views: '540',
    size: 'small',
  },
  {
    id: 6,
    title: 'バンコク医療機関ランキング',
    excerpt: '日本語対応の病院・クリニック10選',
    category: 'タイ生活',
    date: '2025年4月8日',
    readTime: '5分',
    views: '1.8k',
    size: 'small',
  },
]

export default function MagazinePage({ params }: PageProps) {
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
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              DTV <span className="text-purple-600">MAGAZINE</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">タイ長期滞在の最新情報</p>
          </div>

          <div className="hidden md:flex flex-1 mx-8 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-300" />
              <input
                type="search"
                placeholder="検索..."
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-300 focus:border-purple-600 focus:outline-none transition"
              />
            </div>
          </div>

          <a
            href="https://discord.gg/R2gA6jchfk"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white font-bold text-sm rounded hover:bg-purple-700 transition"
          >
            <MessageSquare className="w-4 h-4" />
            Discord
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ── Hero Article (Large) ────────────────────────────────────── */}
        {mockArticles[0] && (
          <article className="mb-12 group">
            <Link href={`/${locale}/articles/${mockArticles[0].id}`}>
              <div className="h-96 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center text-purple-300 text-6xl hover:from-purple-200 hover:to-purple-300 transition duration-300">
                📰
              </div>
            </Link>

            <div className="mt-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-black uppercase">
                  {mockArticles[0].category}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> {mockArticles[0].views}
                </span>
              </div>

              <h2 className="text-4xl font-black leading-tight mb-4 group-hover:text-purple-600 transition">
                {mockArticles[0].title}
              </h2>

              <p className="text-lg text-gray-600 mb-4 max-w-3xl">{mockArticles[0].excerpt}</p>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {mockArticles[0].readTime}
                </span>
                <span>{mockArticles[0].date}</span>
              </div>
            </div>
          </article>
        )}

        {/* ── Article Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
          {mockArticles.slice(1).map((article, idx) => {
            const spanClasses = {
              large: 'md:col-span-2 md:row-span-2',
              medium: 'md:col-span-2',
              small: 'md:col-span-1',
            }

            return (
              <article
                key={article.id}
                className={`group ${spanClasses[article.size as keyof typeof spanClasses]}`}
              >
                <Link href={`/${locale}/articles/${article.id}`}>
                  <div
                    className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-300 hover:from-gray-200 hover:to-gray-300 transition duration-300 ${
                      article.size === 'large' ? 'h-96' : article.size === 'medium' ? 'h-56' : 'h-40'
                    }`}
                  >
                    <span className="text-4xl">📝</span>
                  </div>
                </Link>

                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-bold uppercase">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.views}</span>
                  </div>

                  <h3
                    className={`font-bold leading-tight mb-2 group-hover:text-purple-600 transition ${
                      article.size === 'large' ? 'text-2xl' : article.size === 'medium' ? 'text-xl' : 'text-base'
                    }`}
                  >
                    {article.title}
                  </h3>

                  {article.size !== 'small' && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.excerpt}</p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </main>

      {/* ── Footer / Variants ─────────────────────────────────────────── */}
      <footer className="border-t-2 border-gray-300 mt-16 py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p className="mb-3 font-bold">🎨 レイアウトバリアント</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-bold">
            <Link href={`/${locale}`} className="hover:text-purple-600">
              Original
            </Link>
            <span>|</span>
            <Link href={`/${locale}/sidebar`} className="hover:text-purple-600">
              Sidebar
            </Link>
            <span>|</span>
            <span className="text-purple-600">Magazine (現在)</span>
            <span>|</span>
            <Link href={`/${locale}/blog`} className="hover:text-purple-600">
              Blog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
