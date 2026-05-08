'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { gtmEvents } from '@/lib/analytics'
import type { Locale } from '@/middleware'

interface GolfDtvCTAProps {
  locale: Locale
}

export function GolfDtvCTA({ locale }: GolfDtvCTAProps) {
  const handleClick = () => {
    gtmEvents.golfDtvClick('homepage-premium-card')
  }

  return (
    <Link
      href={`/${locale}/golf-dtv`}
      className="btn-richb-gold"
      style={{ padding: '12px 22px', fontSize: 13, fontFamily: 'inherit' }}
      onClick={handleClick}
    >
      {locale === 'ja' ? '詳細を見る' : locale === 'ko' ? '자세히 보기' : 'See Details'}
    </Link>
  )
}
