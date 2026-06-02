import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getBlogPost, getBlogPostSlugs, extractToc } from '@/lib/blog'
import type { Lang } from '@/types/blog'
import ArticlePageClient from './_article/ArticlePageClient'

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  for (const lang of ['ja', 'en', 'ko'] as Lang[]) {
    const slugs = getBlogPostSlugs(lang)
    slugs.forEach(slug => params.push({ lang, slug }))
  }
  return params
}

const BASE_URL = 'https://dtvclub.com'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'ja') as Lang
  const post = await getBlogPost(slug, locale)
  if (!post) return {}

  // Build hreflang only for languages where this slug actually exists
  const langMap: Record<string, string> = { ja: 'ja', en: 'en', ko: 'ko' }
  const availableLanguages: Record<string, string> = {}
  for (const l of ['ja', 'en', 'ko'] as Lang[]) {
    const slugs = getBlogPostSlugs(l)
    if (slugs.includes(slug)) {
      availableLanguages[langMap[l]] = `${BASE_URL}/${l}/blog/${slug}`
    }
  }
  // x-default: prefer EN if available, otherwise JA
  availableLanguages['x-default'] =
    availableLanguages['en'] ?? availableLanguages['ja'] ?? `${BASE_URL}/ja/blog/${slug}`

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.primary_keyword, ...post.secondary_keywords].join(', '),
    alternates: {
      canonical: `${BASE_URL}/${locale}/blog/${slug}`,
      languages: availableLanguages,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'ja') as Lang
  const post = await getBlogPost(slug, locale)
  if (!post) notFound()

  const toc = extractToc(post.content)

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
          { '@type': 'ListItem', position: 1, name: lang === 'ja' ? 'ホーム' : lang === 'ko' ? '홈' : 'Home', item: `https://dtvclub.com/${locale}` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://dtvclub.com/${locale}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `https://dtvclub.com/${locale}/blog/${slug}` },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArticlePageClient post={post} toc={toc} locale={locale} slug={slug} />
    </>
  )
}
