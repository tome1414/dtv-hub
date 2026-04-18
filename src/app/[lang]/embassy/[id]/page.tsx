import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getDictionary } from '@/lib/dictionaries'
import { getEmbassyById, getRelatedEmbassies, getEmbassyMetadata } from '@/lib/embassy-service'
import EmbassyDetail from './components/EmbassyDetail'

interface PageProps {
  params: Promise<{ lang: string; id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, id } = await params

  const embassy = getEmbassyById(id)
  if (!embassy) return { title: 'Embassy Not Found' }

  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const metadata = getEmbassyMetadata(embassy, locale)

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      languages: {
        ja: `https://dtvclub.com/ja/embassy/${id}`,
        en: `https://dtvclub.com/en/embassy/${id}`,
        zh: `https://dtvclub.com/zh/embassy/${id}`,
        ko: `https://dtvclub.com/ko/embassy/${id}`,
        ru: `https://dtvclub.com/ru/embassy/${id}`,
        'x-default': `https://dtvclub.com/en/embassy/${id}`,
      },
    },
  }
}

export default async function EmbassyPage({ params }: PageProps) {
  const { lang, id } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale

  const embassy = getEmbassyById(id)
  if (!embassy) notFound()

  const dict = await getDictionary(locale)
  const relatedEmbassies = getRelatedEmbassies(embassy, 3)

  return (
    <EmbassyDetail
      embassy={embassy}
      locale={locale}
      relatedEmbassies={relatedEmbassies}
    />
  )
}
