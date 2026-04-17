'use client'

import type { Locale } from '@/middleware'
import { getDictionary } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import GolfDTVHero from './components/Hero'
import GolfDTVPlans from './components/Plans'
import GolfDTVAddon from './components/Addon'
import GolfDTVTrust from './components/Trust'
import GolfDTVFaq from './components/Faq'
import GolfDTVInquiry from './components/Inquiry'

interface GolfDTVPageProps {
  params: Promise<{ lang: string }>
}

export default function GolfDTVPage({ params }: GolfDTVPageProps) {
  const [dict, setDict] = useState<any>(null)
  const [locale, setLocale] = useState<Locale>('ja')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDictionary = async () => {
      const { lang } = await params
      const resolvedLocale = (lang || 'ja') as Locale
      setLocale(resolvedLocale)
      const dictionary = await getDictionary(resolvedLocale)
      setDict(dictionary)
      setLoading(false)
    }
    loadDictionary()
  }, [params])

  if (loading || !dict?.golfDTV) {
    return <div className="min-h-screen flex items-center justify-center">読み込み中...</div>
  }

  return (
    <main className="min-h-screen bg-navy-950">
      <GolfDTVHero data={dict.golfDTV.hero} locale={locale} />
      <GolfDTVTrust data={dict.golfDTV.trust} />
      <GolfDTVPlans data={dict.golfDTV.plans} locale={locale} />
      <GolfDTVAddon data={dict.golfDTV.addon} />
      <GolfDTVFaq data={dict.golfDTV.faq} locale={locale} />
      <GolfDTVInquiry data={dict.golfDTV.inquiry} />
    </main>
  )
}
