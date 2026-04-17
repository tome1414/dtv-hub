import Link from 'next/link'
import type { Locale } from '@/middleware'

interface HeroData {
  badge: string
  headline: string
  subheadline: string
  cta: string
}

export default function GolfDTVHero({ data, locale }: { data: HeroData; locale: Locale }) {
  return (
    <section className="relative min-h-[600px] pt-32 pb-16 px-4 sm:px-6 lg:px-8 flex items-center bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl opacity-10" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-6 inline-block">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-gold-400" />
            {data.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
          {data.headline}
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-navy-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          {data.subheadline}
        </p>

        {/* CTA Button */}
        <Link
          href="#inquiry"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gold-gradient text-navy-950 font-bold hover:opacity-90 transition-opacity shadow-lg shadow-gold-500/20 border-0 text-center"
        >
          <span>{data.cta}</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  )
}
