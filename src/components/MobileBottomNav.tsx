'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/middleware'

interface MobileBottomNavProps {
  locale: Locale
}

const tabs = [
  {
    id: 'home',
    labelJa: 'ホーム',
    labelEn: 'Home',
    labelKo: '홈',
    href: '',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    id: 'guide',
    labelJa: 'ガイド',
    labelEn: 'Guide',
    labelKo: '가이드',
    href: '/guide',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    id: 'requirements',
    labelJa: '書類',
    labelEn: 'Docs',
    labelKo: '서류',
    href: '/requirements',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    id: 'golf',
    labelJa: 'Golf',
    labelEn: 'Golf',
    labelKo: '골프',
    href: '/golf-dtv',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="18" r="2"/>
        <line x1="12" y1="16" x2="12" y2="5"/>
        <polyline points="12 5 17 8 12 11"/>
      </svg>
    ),
  },
  {
    id: 'contact',
    labelJa: '相談',
    labelEn: 'Contact',
    labelKo: '상담',
    href: '/contact',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
]

export default function MobileBottomNav({ locale }: MobileBottomNavProps) {
  const pathname = usePathname()

  const getLabel = (tab: typeof tabs[0]) => {
    if (locale === 'ja') return tab.labelJa
    if (locale === 'ko') return tab.labelKo
    return tab.labelEn
  }

  const isActive = (tab: typeof tabs[0]) => {
    const fullHref = `/${locale}${tab.href}`
    if (tab.href === '') return pathname === `/${locale}` || pathname === `/${locale}/`
    return pathname.startsWith(fullHref)
  }

  return (
    <nav
      className="lg:hidden"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(245,248,250,0.96)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(26,36,53,0.08)',
        display: 'flex',
        paddingTop: 6,
        paddingBottom: 'env(safe-area-inset-bottom, 4px)',
      }}
      aria-label="Mobile navigation"
    >
      {tabs.map((tab) => {
        const active = isActive(tab)
        const href = `/${locale}${tab.href}`
        const label = getLabel(tab)
        return (
          <Link
            key={tab.id}
            href={href}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '4px 0 6px',
              fontSize: 9,
              fontWeight: active ? 700 : 500,
              color: active ? '#0A7A6A' : '#7E8EA4',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
          >
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: active ? 'rgba(10,122,106,0.10)' : 'transparent',
              transition: 'background 0.15s',
            }}>
              {tab.icon}
            </span>
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
