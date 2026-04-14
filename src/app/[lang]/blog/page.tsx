'use client'

import Link from 'next/link'
import { Search, MessageSquare, ArrowRight, Calendar, Clock, User } from 'lucide-react'
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
    excerpt: '東京タイ大使館での最新申請手順を実際の体験に基づいて解説します。予約方法から書類提出、取得までの全フローを詳しく説明します。',
    category: '申請ガイド',
    author: 'DTV Hub Editor',
    date: '2025年4月13日',
    readTime: '8分',
  },
  {
    id: 2,
    title: 'バンコク家賃相場2025：プロンポン vs シーロム',
    excerpt: 'DTV取得者向けの最新賃貸情報と、人気エリア別のメリット・デメリットを比較。それぞれのエリアの特性や生活レベルを詳しく解説します。',
    category: 'タイ生活',
    author: 'Bangkok Resident',
    date: '2025年4月12日',
    readTime: '6分',
  },
  {
    id: 3,
    title: 'ゴルフスクールDTV：申請から取得まで完全レポート',
    excerpt: '政府認可ゴルフスクールを利用したDTVビザ取得の全プロセスを公開。実際の費用、スケジュール、申請の注意点をまとめました。',
    category: 'ソフトパワー',
    author: 'Golf DTV Specialist',
    date: '2025年4月11日',
    readTime: '10分',
  },
  {
    id: 4,
    title: 'DTVビザで家族全員でタイに移住：配偶者・子どもの手続き',
    excerpt: '家族全員でタイに移住するための完全ガイド。配偶者ビザ、子どもの学校手続き、健康保険など、家族帯同に必要なすべての情報。',
    category: '家族ビザ',
    author: 'Family Guide Writer',
    date: '2025年4月10日',
    readTime: '7分',
  },
  {
    id: 5,
    title: 'タイの税金・保険制度：DTV取得者向け完全解説',
    excerpt: 'DTV取得後の税務申告、社会保険、医療保険の制度を詳しく解説。タイにおける税金の基本から具体的な申告手順まで、すべてをカバーします。',
    category: '税金・保険',
    author: 'Tax Advisor',
    date: '2025年4月9日',
    readTime: '12分',
  },
  {
    id: 6,
    title: 'バンコク医療機関ランキング：日本語対応の病院10選',
    excerpt: '日本語対応スタッフがいるバンコクの医療機関10選。各病院の特徴、診療科目、アクセス情報、実際の利用者の評判をまとめました。',
    category: 'タイ生活',
    author: 'Healthcare Correspondent',
    date: '2025年4月8日',
    readTime: '5分',
  },
]

export default function BlogPage({ params }: PageProps) {
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
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link href={`/${locale}`} className="text-2xl font-bold">
              DTV Hub<span className="text-green-600">Blog</span>
            </Link>
            <a
              href="https://discord.gg/dtv-hub"
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700 transition"
            >
              <MessageSquare className="w-4 h-4" />
              Discord
            </a>
          </div>

          <p className="text-gray-600 mb-6">
            タイ長期滞在の実体験に基づいた、信頼できる情報を毎日配信。DTV申請から日々の生活まで、すべてをカバーします。
          </p>

          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="記事を検索..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
              検索
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {mockArticles.map((article) => (
            <article key={article.id} className="group border-b border-gray-200 pb-12 last:border-b-0">
              <Link href={`/${locale}/articles/${article.id}`}>
                <div className="h-64 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center text-green-200 text-8xl group-hover:from-green-100 group-hover:to-green-200 transition duration-300 mb-6">
                  📄
                </div>
              </Link>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {article.date}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>

                <h2 className="text-3xl font-bold mb-3 leading-tight group-hover:text-green-600 transition">
                  <Link href={`/${locale}/articles/${article.id}`}>{article.title}</Link>
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed mb-4">{article.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    {article.author}
                  </div>

                  <Link
                    href={`/${locale}/articles/${article.id}`}
                    className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition group/cta"
                  >
                    続きを読む
                    <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50 transition">
            さらに記事を読み込む
          </button>
        </div>
      </main>

      {/* ── Footer / Variants ─────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 mt-16 py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p className="mb-3 font-semibold">🎨 レイアウトバリアント</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs font-medium">
            <Link href={`/${locale}`} className="hover:text-green-600">
              Original
            </Link>
            <span>|</span>
            <Link href={`/${locale}/sidebar`} className="hover:text-green-600">
              Sidebar
            </Link>
            <span>|</span>
            <Link href={`/${locale}/magazine`} className="hover:text-green-600">
              Magazine
            </Link>
            <span>|</span>
            <span className="text-green-600 font-bold">Blog (現在)</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
