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

export default async function GolfDTVLayout({ children, params }: LayoutProps) {
  return (
    <>
      <style>{`
        /* Hide parent layout header and footer for golf-dtv */
        header {
          display: none !important;
        }
        main {
          all: unset;
        }
        body > footer,
        main ~ footer,
        #__next > footer {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  )
}
