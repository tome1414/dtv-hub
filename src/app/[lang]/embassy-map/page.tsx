'use client'

import { useEffect, useState } from 'react'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getDictionary } from '@/lib/dictionaries'
import type { Dictionary } from '@/types'
import { MapPin } from 'lucide-react'

interface PageProps {
  params: Promise<{ lang: string }>
}

export default function EmbassyMapPage({ params }: PageProps) {
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
          <MapPin className="w-8 h-8 text-gold-400" />
          <h1 className="text-5xl font-bold">Embassy Map</h1>
        </div>
        <p className="text-navy-400 mb-12">Find Thai embassies and consulates worldwide. Interactive map with contact information and visa appointment details.</p>

        <div className="bg-navy-900 rounded-lg p-12 border border-white/10 text-center">
          <h3 className="text-xl font-bold mb-2">Interactive Map Coming Soon</h3>
          <p className="text-navy-400">We're building a comprehensive embassy locator with real-time appointment availability.</p>
        </div>
      </div>
    </div>
  )
}
