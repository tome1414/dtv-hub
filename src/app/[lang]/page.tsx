import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getAllBlogPostsMeta } from '@/lib/blog'
import type { Lang } from '@/types/blog'
import HomePageClient from './_home/HomePageClient'

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'ja') as Locale
  const posts = getAllBlogPostsMeta(locale as Lang)

  return <HomePageClient posts={posts} locale={locale} />
}
