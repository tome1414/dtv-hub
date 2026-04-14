'use client'

import Link from 'next/link'
import { Search, MessageSquare, Clock, Bookmark, Share2, ChevronRight } from 'lucide-react'
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
    featured: true,
  },
  {
    id: 2,
    title: 'バンコク家賃相場2025：プロンポン vs シーロム',
    excerpt: 'DTV取得者向けの最新賃貸情報と、エリア別のメリット・デメリット。',
    category: 'タイ生活',
    date: '2025年4月12日',
    readTime: '6分',
  },
  {
    id: 3,
    title: 'ゴルフスクールDTV：実際の取得体験レポート',
    excerpt: '政府認定スクールでの実体験。スケジュール、費用、注意点をまとめました。',
    category: 'ソフトパワー',
    date: '2025年4月11日',
    readTime: '10分',
  },
  {
    id: 4,
    title: 'DTVビザ家族帯同：配偶者・子どもの手続き',
    excerpt: '家族全員でタイに移住するための完全ガイド。',
    category: '家族ビザ',
    date: '2025年4月10日',
    readTime: '7分',
  },
]

export default function SidebarPage({ params }: PageProps) {
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-2xl font-bold">
            DTV<span className="text-orange-500">.</span>Hub
          </Link>

          <div className="hidden md:flex flex-1 mx-8 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="記事を検索..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://discord.gg/dtv-hub"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              <MessageSquare className="w-4 h-4" />
              Discord
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main Content ────────────────────────────────────────────── */}
          <main className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            {mockArticles[0] && (
              <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-80 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <div className="text-center text-orange-300">
                    <div className="text-6xl mb-2">📰</div>
                    <span className="text-sm font-medium">Featured Article</span>
                  </div>
                </div>

                <div className="p-8">
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full mb-4">
                    {mockArticles[0].category}
                  </span>

                  <h1 className="text-3xl font-bold mb-3 hover:text-orange-600 transition">
                    <Link href={`/${locale}/articles/${mockArticles[0].id}`}>
                      {mockArticles[0].title}
                    </Link>
                  </h1>

                  <p className="text-lg text-gray-600 mb-5">{mockArticles[0].excerpt}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {mockArticles[0].readTime}
                    </div>
                    <span>{mockArticles[0].date}</span>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <Link
                      href={`/${locale}/articles/${mockArticles[0].id}`}
                      className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
                    >
                      続きを読む →
                    </Link>
                    <button className="p-3 text-gray-400 hover:text-orange-500 transition">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-3 text-gray-400 hover:text-orange-500 transition">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </article>
            )}

            {/* Regular Articles List */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">最新記事</h2>
              {mockArticles.slice(1).map((article) => (
                <article
                  key={article.id}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all group"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 group-hover:bg-orange-100 transition" />

                    <div className="flex-1">
                      <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                        {article.category}
                      </span>

                      <h3 className="text-lg font-bold mt-1 mb-2 group-hover:text-orange-600 transition">
                        <Link href={`/${locale}/articles/${article.id}`}>{article.title}</Link>
                      </h3>

                      <p className="text-sm text-gray-600 mb-3">{article.excerpt}</p>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </main>

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <aside className="space-y-6">
            {/* Categories Widget */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4">カテゴリ</h3>
              <ul className="space-y-2">
                {[
                  '申請ガイド',
                  'タイ生活',
                  'ソフトパワー',
                  '家族ビザ',
                  '税金・保険',
                  'コミュニティ',
                ].map((cat) => (
                  <li key={cat}>
                    <a href="#" className="text-gray-600 hover:text-orange-600 flex items-center gap-2 py-1">
                      <ChevronRight className="w-4 h-4" />
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Articles */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4">人気記事</h3>
              <ul className="space-y-3">
                {mockArticles.slice(0, 3).map((article, i) => (
                  <li key={article.id}>
                    <a href="#" className="text-sm font-semibold text-gray-900 hover:text-orange-600 line-clamp-2">
                      {i + 1}. {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-md">
              <h3 className="font-bold text-lg mb-2">最新情報をお届け</h3>
              <p className="text-sm text-orange-50 mb-4">週1回、DTVビザ関連の最新情報をメール配信します。</p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="メールアドレス"
                  className="w-full px-3 py-2 rounded-lg text-gray-900 focus:outline-none"
                />
                <button className="w-full bg-white text-orange-600 font-bold py-2 rounded-lg hover:bg-orange-50 transition">
                  購読
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Footer / Variants ─────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 mt-16 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p className="mb-3 font-semibold">🎨 レイアウトバリアント</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-medium">
            <Link href={`/${locale}`} className="hover:text-orange-600">
              Original
            </Link>
            <span>|</span>
            <span className="text-orange-600 font-bold">Sidebar (現在)</span>
            <span>|</span>
            <Link href={`/${locale}/magazine`} className="hover:text-orange-600">
              Magazine
            </Link>
            <span>|</span>
            <Link href={`/${locale}/blog`} className="hover:text-orange-600">
              Blog
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
