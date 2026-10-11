import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PRIVACY_POLICY_JA, PRIVACY_POLICY_EN } from '@/lib/golf-dtv-privacy-policy'

const LOCALES = ['ja', 'en', 'zh', 'ko', 'ru']
const BASE = 'https://dtvclub.com'

interface PageProps {
  params: Promise<{ lang: string }>
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

const policyFor = (lang: string) => (lang === 'ja' ? PRIVACY_POLICY_JA : PRIVACY_POLICY_EN)
const titleFor = (lang: string) => (lang === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy')

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const url = `${BASE}/${lang}/golf-dtv/privacy`
  const title = `${titleFor(lang)} | GolfDTV`
  return {
    title,
    description: policyFor(lang).intro,
    alternates: {
      canonical: url,
      languages: {
        'ja': `${BASE}/ja/golf-dtv/privacy`,
        'en': `${BASE}/en/golf-dtv/privacy`,
        'zh-Hans': `${BASE}/zh/golf-dtv/privacy`,
        'ko': `${BASE}/ko/golf-dtv/privacy`,
        'ru': `${BASE}/ru/golf-dtv/privacy`,
        'x-default': `${BASE}/en/golf-dtv/privacy`,
      },
    },
    openGraph: { title, description: policyFor(lang).intro, url, images: [{ url: '/golf-dtv-logo.webp', width: 1200, alt: 'GolfDTV' }] },
  }
}

export default async function GolfDTVPrivacyPage({ params }: PageProps) {
  const { lang } = await params
  if (!LOCALES.includes(lang)) notFound()
  const policy = policyFor(lang)

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e6', color: '#444' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e0d5' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center' }}>
          <a href={`/${lang}/golf-dtv`} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="/golf-dtv-logo-nav.webp" alt="GolfDTV" style={{ height: 48, width: 'auto' }} />
          </a>
        </div>
      </div>
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px 64px' }}>
        <article style={{ background: '#fff', border: '1px solid #e5e0d5', borderRadius: 14, padding: '32px 24px' }}>
          <h1 style={{ margin: '0 0 24px', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 800, color: '#0a2e1f' }}>{titleFor(lang)}</h1>
          <div style={{ fontSize: '.88rem', lineHeight: 2, display: 'flex', flexDirection: 'column', gap: 16, overflowWrap: 'anywhere' }}>
            <p style={{ margin: 0 }}>{policy.intro}</p>
            {policy.sections.map(([heading, body]) => (
              <section key={heading}>
                <h2 style={{ fontSize: '.88rem', fontWeight: 700, color: '#0a2e1f', margin: '0 0 4px' }}>{heading}</h2>
                <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{body}</p>
              </section>
            ))}
            <p style={{ margin: '8px 0 0', fontSize: '.8rem', color: '#999' }}>{policy.date}</p>
          </div>
        </article>
      </main>
    </div>
  )
}
