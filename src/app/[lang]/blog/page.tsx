import Link from 'next/link'
import { Calendar, Clock, ChevronRight } from 'lucide-react'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getAllBlogPostsMeta } from '@/lib/blog'
import type { Lang } from '@/types/blog'

interface PageProps {
  params: Promise<{ lang: string }>
}

const categoryLabelJa: Record<string, string> = {
  comparison: '比較記事',
  basic: '基本ガイド',
  process: '申請実務',
  documents: '必要書類',
  'soft-power': 'ソフトパワー',
  freelance: 'フリーランス',
  locations: '地域ガイド',
  'life-in-thailand': 'タイ生活',
}

const categoryLabelEn: Record<string, string> = {
  comparison: 'Comparison',
  basic: 'Guide',
  process: 'Application',
  documents: 'Documents',
  'soft-power': 'Soft Power',
  freelance: 'Freelance',
  locations: 'Locations',
  'life-in-thailand': 'Life in Thailand',
}

const categoryLabelKo: Record<string, string> = {
  comparison: '비교 기사',
  basic: '기본 가이드',
  process: '신청 실무',
  documents: '필요 서류',
  'soft-power': '소프트파워',
  freelance: '프리랜서',
  locations: '지역 가이드',
  'life-in-thailand': '태국 생활',
}

export default async function BlogListPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'ja') as Lang
  const posts = getAllBlogPostsMeta(locale)

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">
            {locale === 'ja' ? 'DTV Club ブログ' : 'DTV Club Blog'}
          </h1>
          <p className="text-navy-400 text-lg">
            {locale === 'ja'
              ? 'タイ長期滞在ビザ（DTV）の比較・申請・生活情報を中立的に解説します。'
              : 'Neutral guides on Thailand long-stay visas, DTV applications, and life in Thailand.'}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-navy-900 rounded-2xl p-8 border border-white/10 text-center">
            <p className="text-navy-400">
              {locale === 'ja' ? '記事を準備中です。しばらくお待ちください。' : locale === 'ko' ? '기사를 준비 중입니다. 잠시 기다려 주세요.' : 'Articles coming soon.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => {
              const categoryLabel = locale === 'ja' ? categoryLabelJa : locale === 'ko' ? categoryLabelKo : categoryLabelEn
              return (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="group block bg-navy-900 border border-white/5 rounded-2xl p-6 hover:border-gold-500/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-gold-500/15 border border-gold-500/25 text-gold-400 text-xs font-bold rounded-full">
                        {categoryLabel[post.primary_category] ?? post.primary_category}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors mb-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-navy-400 line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-navy-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{post.published_at}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{locale === 'ja' ? `約${post.read_time_minutes}分` : locale === 'ko' ? `약 ${post.read_time_minutes}분` : `${post.read_time_minutes} min read`}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-navy-500 group-hover:text-gold-400 transition-colors flex-shrink-0 mt-1" />
                </div>
              </Link>
            )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
