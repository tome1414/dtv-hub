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
    <Button
      size="sm"
      className="flex-1 bg-gold-gradient text-navy-950 font-bold border-0 hover:opacity-90"
      asChild
      onClick={handleClick}
    >
      <Link href={`/${locale}/golf-dtv`}>{locale === 'ja' ? '詳細を見る' : locale === 'ko' ? '자세히 보기' : 'See Details'}</Link>
    </Button>
  )
}
