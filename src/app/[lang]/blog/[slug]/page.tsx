import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Calendar, Clock, ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getBlogPost, getBlogPostSlugs } from '@/lib/blog'
import type { Lang } from '@/types/blog'

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  for (const lang of ['ja', 'en'] as Lang[]) {
    const slugs = getBlogPostSlugs(lang)
    slugs.forEach(slug => params.push({ lang, slug }))
  }
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'ja') as Lang
  const post = await getBlogPost(slug, locale)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.primary_keyword, ...post.secondary_keywords].join(', '),
  }
}

const ctaConfig: Record<string, { label: string; href: string; style: 'primary' | 'secondary' }> = {
  'DTV完全ガイドへ': { label: 'DTV完全ガイドへ', href: '/ja/blog/dtv-visa', style: 'primary' },
  '適性確認': { label: '自分に向いているか確認する', href: '/ja/who-should-choose-golf-dtv', style: 'secondary' },
  '無料相談': { label: '無料相談はこちら', href: '/ja/golf-dtv#inquiry', style: 'primary' },
  '問い合わせ': { label: 'お問い合わせ', href: '/ja/golf-dtv#inquiry', style: 'primary' },
  '必要書類を確認する': { label: '必要書類を確認する', href: '/ja/dtv-required-documents', style: 'secondary' },
  '申請方法へ': { label: '申請方法を確認する', href: '/ja/dtv-application', style: 'secondary' },
}

function CTABlock({ primary, secondary }: { primary: string; secondary: string }) {
  const p = ctaConfig[primary]
  const s = ctaConfig[secondary]
  return (
    <div className="my-10 p-6 bg-navy-900 border border-gold-500/20 rounded-2xl">
      <p className="text-sm text-navy-400 mb-4">次のステップ</p>
      <div className="flex flex-col sm:flex-row gap-3">
        {p && (
          <Link
            href={p.href}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gold-500 text-navy-950 font-bold rounded-xl hover:bg-gold-400 transition-colors text-sm"
          >
            {p.label}
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        )}
        {s && (
          <Link
            href={s.href}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-white/20 text-navy-200 font-semibold rounded-xl hover:bg-white/5 transition-colors text-sm"
          >
            {s.label}
          </Link>
        )}
      </div>
    </div>
  )
}

const categoryLabel: Record<string, string> = {
  comparison: '比較記事',
  basic: '基本ガイド',
  process: '申請実務',
  documents: '必要書類',
  'soft-power': 'ソフトパワー',
  freelance: 'フリーランス',
  locations: '地域ガイド',
  'life-in-thailand': 'タイ生活',
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'ja') as Lang
  const post = await getBlogPost(slug, locale)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.published_at,
        dateModified: post.updated_at,
        author: { '@type': 'Organization', name: 'DTV Club編集部' },
        publisher: { '@type': 'Organization', name: 'DTV Club', url: 'https://dtvclub.com' },
        inLanguage: post.lang,
        keywords: [post.primary_keyword, ...post.secondary_keywords].join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ホーム', item: `https://dtvclub.com/${locale}` },
          { '@type': 'ListItem', position: 2, name: 'ブログ', item: `https://dtvclub.com/${locale}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `https://dtvclub.com/${locale}/blog/${slug}` },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* パンくず */}
      <div className="border-b border-white/10 bg-navy-950/90 backdrop-blur-sm pt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-navy-400">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">ホーム</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">ブログ</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-navy-300 truncate max-w-48">{post.title}</span>
          </nav>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* カテゴリバッジ */}
        <div className="mb-5">
          <span className="inline-flex items-center px-3 py-1 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider rounded-full">
            {categoryLabel[post.primary_category] ?? post.primary_category}
          </span>
        </div>

        {/* タイトル */}
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-6 tracking-tight">
          {post.title}
        </h1>

        {/* メタ情報 */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-navy-400 pb-8 mb-8 border-b border-white/10">
          <span className="text-navy-300 font-medium">DTV Club編集部</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.published_at}</span>
          </div>
          {post.updated_at !== post.published_at && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs bg-navy-800 px-2 py-0.5 rounded">更新 {post.updated_at}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>読了約{post.read_time_minutes}分</span>
          </div>
        </div>

        {/* 記事本文 */}
        <div
          className="article-body mb-12"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* 末尾CTA */}
        <CTABlock primary={post.primary_cta} secondary={post.secondary_cta} />

        {/* 関連記事（静的3件） */}
        <section className="mt-14 pt-10 border-t border-white/10">
          <h2 className="text-lg font-bold mb-5">次に読む</h2>
          <div className="space-y-3">
            {post.must_link_pages.slice(0, 3).map((href) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between p-4 bg-navy-900 border border-white/5 rounded-xl hover:border-gold-500/30 transition-all group"
              >
                <span className="text-sm text-navy-200 group-hover:text-white transition-colors">{href.replace('/ja/', '').replace(/-/g, ' ')}</span>
                <ChevronRight className="w-4 h-4 text-navy-500 group-hover:text-gold-400 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* 戻るボタン */}
        <div className="mt-10">
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-2 text-sm text-navy-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            ブログ一覧へ戻る
          </Link>
        </div>
      </main>

      {/* 記事本文スタイル */}
      <style>{`
        .article-body h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-bottom: 0.625rem;
          border-bottom: 2px solid rgba(240,196,60,0.2);
          line-height: 1.35;
          letter-spacing: -0.01em;
        }
        .article-body h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #e2e8f0;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .article-body p {
          color: #94a3b8;
          font-size: 1rem;
          line-height: 1.85;
          margin-bottom: 1.5rem;
        }
        .article-body strong { color: #f0c43c; font-weight: 700; }
        .article-body ul, .article-body ol {
          margin: 1.25rem 0 1.5rem;
          padding-left: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .article-body ul { list-style-type: disc; }
        .article-body ol { list-style-type: decimal; }
        .article-body li { color: #94a3b8; font-size: 1rem; line-height: 1.75; }
        .article-body a { color: #f0c43c; text-decoration: underline; text-underline-offset: 3px; }
        .article-body a:hover { color: #fbbf24; }
        .article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0 2rem;
          font-size: 0.875rem;
        }
        .article-body th {
          background: rgba(240,196,60,0.1);
          color: #f0c43c;
          font-weight: 700;
          padding: 0.625rem 0.875rem;
          text-align: left;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .article-body td {
          color: #94a3b8;
          padding: 0.625rem 0.875rem;
          border: 1px solid rgba(255,255,255,0.06);
          vertical-align: top;
        }
        .article-body tr:nth-child(even) td { background: rgba(255,255,255,0.02); }
        .article-body hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin: 2.5rem 0;
        }
        .article-body blockquote {
          border-left: 3px solid rgba(240,196,60,0.4);
          padding: 0.75rem 1.25rem;
          margin: 1.5rem 0;
          background: rgba(240,196,60,0.04);
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .article-body blockquote p { color: #cbd5e1; margin: 0; }
      `}</style>
    </div>
  )
}
