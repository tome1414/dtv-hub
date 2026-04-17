import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { getDictionary } from '@/lib/dictionaries'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params
  const locale = (lang || 'ja') as Locale
  const dict = await getDictionary(locale)

  if (!dict.golfDTV) {
    return {}
  }

  return {
    title: dict.golfDTV.meta.title,
    description: dict.golfDTV.meta.description,
    openGraph: {
      title: dict.golfDTV.meta.title,
      description: dict.golfDTV.meta.description,
      url: `/golf-dtv`,
    },
  }
}

export default function GolfDTVLayout({ children }: LayoutProps) {
  return <>{children}</>
}
