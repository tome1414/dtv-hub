import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getDictionary } from '@/lib/dictionaries'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import MobileBottomNav from '@/components/MobileBottomNav'
import LenaChat from '@/components/LenaChat'

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

const BASE_URL = 'https://dtvclub.com'

const localeToHreflang: Record<Locale, string> = {
  ja: 'ja',
  en: 'en',
  zh: 'zh-Hans',
  ko: 'ko',
  ru: 'ru',
}

export async function generateMetadata({ params }: LangLayoutProps): Promise<Metadata> {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const dict = await getDictionary(locale)

  // Build hreflang alternate links
  const alternates: Record<string, string> = {}
  for (const loc of locales) {
    alternates[localeToHreflang[loc]] = `${BASE_URL}/${loc}`
  }
  alternates['x-default'] = `${BASE_URL}/en`

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: alternates,
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${BASE_URL}/${locale}`,
      siteName: dict.meta.siteName,
      locale: localeToHreflang[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const dict = await getDictionary(locale)

  return (
    <>
      <JsonLd locale={locale} siteName={dict.meta.siteName} description={dict.meta.description} />
      <Header locale={locale} nav={dict.nav} />
      <main>{children}</main>
      <Footer locale={locale} footer={dict.footer} />
      <MobileBottomNav locale={locale} />
      <LenaChat lang={locale} />
    </>
  )
}
