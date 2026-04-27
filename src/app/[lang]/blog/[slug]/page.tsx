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
          { '@type': 'ListItem', position: 1, name: lang === 'ja' ? 'ホーム' : 'Home', item: `https://dtvclub.com/${locale}` },
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
