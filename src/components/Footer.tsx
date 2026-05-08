import Link from 'next/link'
import type { Locale } from '@/middleware'
import type { Dictionary } from '@/types'

interface FooterProps {
  locale: Locale
  footer: Dictionary['footer']
}

const footerSections = [
  {
    titleJa: 'ビザ情報',
    titleEn: 'Visa Info',
    titleKo: '비자 정보',
    links: [
      { labelJa: 'DTVビザとは', labelEn: 'What is DTV?', labelKo: 'DTV 비자란?', href: '/guide/about' },
      { labelJa: '申請ガイド', labelEn: 'Application Guide', labelKo: '신청 가이드', href: '/guide/embassy' },
      { labelJa: '必要書類', labelEn: 'Required Documents', labelKo: '필요 서류', href: '/requirements' },
      { labelJa: '申請の流れ', labelEn: 'Application Process', labelKo: '신청 절차', href: '/dtv-application' },
    ],
  },
  {
    titleJa: 'タイ生活',
    titleEn: 'Life in Thailand',
    titleKo: '태국 생활',
    links: [
      { labelJa: 'バンコク', labelEn: 'Bangkok', labelKo: '방콕', href: '/life/bangkok' },
      { labelJa: '住居・物件', labelEn: 'Housing', labelKo: '주거·부동산', href: '/life/housing' },
      { labelJa: '医療・保険', labelEn: 'Health & Insurance', labelKo: '의료·보험', href: '/life/health' },
      { labelJa: '税金・金融', labelEn: 'Tax & Finance', labelKo: '세금·금융', href: '/life/finance' },
    ],
  },
  {
    titleJa: 'サービス',
    titleEn: 'Services',
    titleKo: '서비스',
    links: [
      { labelJa: 'ソフトパワービザ', labelEn: 'Soft Power Visa', labelKo: '소프트파워 비자', href: '/soft-power' },
      { labelJa: 'ゴルフDTVプラン', labelEn: 'Golf DTV Plan', labelKo: '골프 DTV 플랜', href: '/golf-dtv' },
      { labelJa: '向いている人を確認', labelEn: 'Who It\'s For', labelKo: '적합한 분 확인', href: '/who-should-choose-golf-dtv' },
      { labelJa: '無料相談', labelEn: 'Free Consultation', labelKo: '무료 상담', href: '/contact' },
    ],
  },
]

function getSectionTitle(locale: Locale, section: typeof footerSections[number]) {
  if (locale === 'ja') return section.titleJa
  if (locale === 'ko') return section.titleKo
  return section.titleEn
}

function getLinkLabel(locale: Locale, link: typeof footerSections[number]['links'][number]) {
  if (locale === 'ja') return link.labelJa
  if (locale === 'ko') return link.labelKo
  return link.labelEn
}

export default function Footer({ locale, footer }: FooterProps) {
  return (
    <footer style={{ background: '#142130', borderTop: '1px solid rgba(255,255,255,0.06)' }} role="contentinfo">

      <style>{`
        .footer-link { transition: color 0.15s; }
        .footer-link:hover { color: rgba(255,255,255,0.75) !important; }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

        {/* Main grid */}
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '220px 1fr 1fr 1fr', gap: 40, padding: '44px 0 36px' }}>

          {/* Brand column */}
          <div className="footer-brand">
            <Link href={`/${locale}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{
                width: 26, height: 26,
                background: 'linear-gradient(135deg, #0D9280, #0A7A6A)',
                borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', color: 'white' }}>
                DTV <span style={{ color: '#0A7A6A' }}>Club</span>
              </span>
            </Link>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.75, marginBottom: 16 }}>
              {footer.tagline}
            </p>
            <Link
              href={`/${locale}/contact`}
              style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, color: '#0A7A6A', border: '1px solid rgba(10,122,106,0.4)', borderRadius: 6, padding: '6px 14px', textDecoration: 'none', transition: 'all 0.15s' }}
            >
              {locale === 'ja' ? '無料相談はこちら' : locale === 'ko' ? '무료 상담' : 'Free Consultation'}
            </Link>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.titleEn}>
              <h5 style={{ fontSize: 10, fontWeight: 700, color: '#0A7A6A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
                {getSectionTitle(locale, section)}
              </h5>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href.startsWith('http') ? link.href : `/${locale}${link.href}`}
                      className="footer-link"
                      style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', textDecoration: 'none' }}
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {getLinkLabel(locale, link)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: 18, paddingBottom: 20,
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center', gap: 10,
        }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)' }}>{footer.legal}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {footer.links.map((link) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href}`}
                className="footer-link"
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
