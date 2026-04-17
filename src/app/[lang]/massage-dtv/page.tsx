'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getDictionary } from '@/lib/dictionaries'
import type { Dictionary } from '@/types'
import { Sparkles } from 'lucide-react'

interface PageProps {
  params: Promise<{ lang: string }>
}

export default function MassageDTVPage({ params }: PageProps) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    params.then(async ({ lang }) => {
      const loc = (locales.includes(lang as Locale) ? lang : 'en') as Locale
      setLocale(loc)
      const dictionary = await getDictionary(loc)
      setDict(dictionary)
    })
  }, [params])

  if (!dict) return null

  return (
    <div className="min-h-screen bg-navy-950 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-gold-400" />
          <h1 className="text-5xl font-bold">Massage & Wellness DTV</h1>
        </div>
        <p className="text-navy-400 mb-12">Thailand's holistic wellness path to long-term residency through certified massage therapy training and practice.</p>

        <div className="bg-navy-900 rounded-lg p-12 border border-white/10 text-center">
          <h3 className="text-xl font-bold mb-2">Wellness Program Details Coming Soon</h3>
          <p className="text-navy-400">Comprehensive guide to DTV visa via massage therapy schools and wellness centers.</p>
        </div>
      </div>
    </div>
  )
}
