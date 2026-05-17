import type { Locale } from '@/middleware'

interface JsonLdProps {
  locale: Locale
  siteName: string
  description: string
}

const localeToLanguage: Record<Locale, string> = {
  ja: 'ja-JP',
  en: 'en-US',
  zh: 'zh-CN',
  ko: 'ko-KR',
  ru: 'ru-RU',
}

export default function JsonLd({ locale, siteName, description }: JsonLdProps) {
  const baseUrl = 'https://dtvclub.com'
  const language = localeToLanguage[locale]

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: `${baseUrl}/${locale}`,
    description,
    inLanguage: language,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DTV Club',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: ['https://discord.gg/R2gA6jchfk'],
    description:
      'DTV Club is the most comprehensive information portal for Thailand\'s Destination Thailand Visa (DTV). We provide guides, document checklists, and community support in 5 languages.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['Japanese', 'English', 'Chinese', 'Korean', 'Russian'],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
