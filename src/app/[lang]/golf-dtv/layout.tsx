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
    alternates: {
      canonical: `https://dtvclub.com/${lang}/golf-dtv`,
      languages: {
        'ja': 'https://dtvclub.com/ja/golf-dtv',
        'en': 'https://dtvclub.com/en/golf-dtv',
        'zh-Hans': 'https://dtvclub.com/zh/golf-dtv',
        'ko': 'https://dtvclub.com/ko/golf-dtv',
        'ru': 'https://dtvclub.com/ru/golf-dtv',
        'x-default': 'https://dtvclub.com/en/golf-dtv',
      },
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon.ico' },
      ],
      apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    },
    openGraph: {
      title: dict.golfDTV.meta.title,
      description: dict.golfDTV.meta.description,
      url: `https://dtvclub.com/${lang}/golf-dtv`,
      images: [{ url: '/golf-dtv-logo.webp', width: 1200, alt: 'GolfDTV' }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/golf-dtv-logo.webp'],
    },
  }
}

export default async function GolfDTVLayout({ children, params }: LayoutProps) {
  return (
    <>
      <style>{`
        /* Hide parent layout header, footer and mobile bottom nav for golf-dtv */
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
        nav[aria-label="Mobile navigation"] {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  )
}
