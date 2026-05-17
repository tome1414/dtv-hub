import type { Locale } from '@/middleware'
import { getDictionary } from '@/lib/dictionaries'
import GolfDTVClient from './GolfDTVClient'

interface GolfDTVPageProps {
  params: Promise<{ lang: string }>
}

export default async function GolfDTVPage({ params }: GolfDTVPageProps) {
  const { lang } = await params
  const locale = (lang || 'ja') as Locale
  const dict = await getDictionary(locale)
  const d = dict.golfDTV

  if (!d) return null

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faq.categories.flatMap((cat: any) =>
      cat.questions.map((qa: any) => ({
        '@type': 'Question',
        name: qa.q,
        acceptedAnswer: { '@type': 'Answer', text: qa.a },
      }))
    ),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GolfDTVClient dict={d} locale={locale} />
    </>
  )
}
