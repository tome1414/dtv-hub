'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import type { Locale } from '@/middleware'
import type { Dictionary } from '@/types'
import { cn } from '@/lib/utils'

interface HeaderProps {
  locale: Locale
  nav: Dictionary['nav']
}

const languageLabels: Record<Locale, { short: string; full: string; flag: string }> = {
  ja: { short: 'JA', full: '日本語', flag: '🇯🇵' },
  en: { short: 'EN', full: 'English', flag: '🇺🇸' },
  zh: { short: '中文', full: '中文', flag: '🇨🇳' },
  ko: { short: 'KO', full: '한국어', flag: '🇰🇷' },
  ru: { short: 'RU', full: 'Русский', flag: '🇷🇺' },
}

const megaMenuItems = {
  guide: [
    { label: 'e-Visaフォーム入力ガイド', href: '/guide/evisa-form' },
    { label: '大使館・申請窓口', href: '/embassy' },
    { label: '書類チェックリスト', href: '/requirements' },
    { label: 'よくある質問', href: '/guide/faq' },
  ],
  life: [
    { label: 'バンコク生活情報', href: '/life/bangkok' },
    { label: '家賃・物件', href: '/life/housing' },
    { label: '医療・保険', href: '/life/health' },
    { label: '税金・金融', href: '/life/finance' },
  ],
}

export default function Header({ locale, nav }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Primary display languages only (JA/EN/KO)
  const primaryLangs: Locale[] = ['ja', 'en', 'ko']

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'rgba(245,248,250,0.92)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid rgba(26,36,53,0.08)',
      boxShadow: '0 1px 0 rgba(26,36,53,0.06)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 56, gap: 0 }}>

          {/* Logo */}
          <Link href={`/${locale}`} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0, marginRight: 32 }}>
            <div style={{
              width: 28, height: 28,
              background: 'linear-gradient(135deg, #0D9280, #0A7A6A)',
              borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(10,122,106,0.35)',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.02em', color: '#1A2435' }}>
              DTV <span style={{ color: '#0A7A6A' }}>Club</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ alignItems: 'center', gap: 2, flex: 1 }} className="hidden lg:flex" aria-label="Main navigation">

            {/* ビザ比較 */}
            <Link href={`/${locale}/blog`} style={{ fontSize: 13, fontWeight: 500, color: '#4A5A6E', padding: '5px 12px', borderRadius: 5, textDecoration: 'none', transition: 'color 0.15s, background 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0A7A6A'; e.currentTarget.style.background = 'rgba(10,122,106,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#4A5A6E'; e.currentTarget.style.background = 'transparent' }}>
              {locale === 'ja' ? 'ビザ比較' : locale === 'ko' ? '비자 비교' : 'Visa Compare'}
            </Link>

            {/* 申請ガイド */}
            <div className="relative"
              onMouseEnter={() => setActiveMenu('guide')}
              onMouseLeave={() => setActiveMenu(null)}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 13, fontWeight: 500, color: '#4A5A6E', padding: '5px 12px', borderRadius: 5, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'color 0.15s, background 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#0A7A6A'; e.currentTarget.style.background = 'rgba(10,122,106,0.06)' }}
                onMouseLeave={e => { e.currentTarget.style.color = '#4A5A6E'; e.currentTarget.style.background = 'transparent' }}>
                {nav.guide}
                <ChevronDown className={cn('w-3 h-3 opacity-50 transition-transform duration-200', activeMenu === 'guide' && 'rotate-180')} />
              </button>
              {activeMenu === 'guide' && (
                <div style={{ position: 'absolute', top: '100%', left: 0, width: 224, background: 'white', border: '1px solid rgba(26,36,53,0.10)', borderRadius: 12, boxShadow: '0 8px 32px rgba(26,36,53,0.12)', padding: 8, marginTop: 4, zIndex: 50 }}>
                  {megaMenuItems.guide.map((item) => (
                    <Link key={item.href} href={`/${locale}${item.href}`}
                      style={{ display: 'block', padding: '9px 12px', fontSize: 13, color: '#4A5A6E', borderRadius: 8, textDecoration: 'none', transition: 'color 0.15s, background 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#0A7A6A'; e.currentTarget.style.background = 'rgba(10,122,106,0.06)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#4A5A6E'; e.currentTarget.style.background = 'transparent' }}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 必要書類 */}
            <Link href={`/${locale}/requirements`}
              style={{ fontSize: 13, fontWeight: 500, color: '#4A5A6E', padding: '5px 12px', borderRadius: 5, textDecoration: 'none', transition: 'color 0.15s, background 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0A7A6A'; e.currentTarget.style.background = 'rgba(10,122,106,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#4A5A6E'; e.currentTarget.style.background = 'transparent' }}>
              {nav.requirements}
            </Link>

            {/* ソフトパワー */}
            <Link href={`/${locale}/soft-power`}
              style={{ fontSize: 13, fontWeight: 500, color: '#4A5A6E', padding: '5px 12px', borderRadius: 5, textDecoration: 'none', transition: 'color 0.15s, background 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0A7A6A'; e.currentTarget.style.background = 'rgba(10,122,106,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#4A5A6E'; e.currentTarget.style.background = 'transparent' }}>
              {nav.softPower}
            </Link>

            {/* マガジン */}
            <Link href={`/${locale}/blog`}
              style={{ fontSize: 13, fontWeight: 500, color: '#4A5A6E', padding: '5px 12px', borderRadius: 5, textDecoration: 'none', transition: 'color 0.15s, background 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0A7A6A'; e.currentTarget.style.background = 'rgba(10,122,106,0.06)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#4A5A6E'; e.currentTarget.style.background = 'transparent' }}>
              {locale === 'ja' ? 'マガジン' : locale === 'ko' ? '매거진' : 'Magazine'}
            </Link>
          </nav>

          {/* Right side */}
          <div style={{ alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }} className="hidden lg:flex">

            {/* Language switcher — inline buttons */}
            <div style={{ display: 'flex', gap: 2 }}>
              {primaryLangs.map((lang) => (
                <Link key={lang} href={`/${lang}`}
                  style={{
                    fontSize: 10, fontWeight: 700,
                    padding: '3px 8px', borderRadius: 5,
                    textDecoration: 'none',
                    background: lang === locale ? '#1A2435' : 'transparent',
                    color: lang === locale ? 'white' : '#7E8EA4',
                    border: '1px solid',
                    borderColor: lang === locale ? '#1A2435' : 'rgba(26,36,53,0.12)',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { if (lang !== locale) { e.currentTarget.style.color = '#1A2435'; e.currentTarget.style.borderColor = 'rgba(26,36,53,0.25)'; } }}
                  onMouseLeave={e => { if (lang !== locale) { e.currentTarget.style.color = '#7E8EA4'; e.currentTarget.style.borderColor = 'rgba(26,36,53,0.12)'; } }}>
                  {languageLabels[lang].short}
                </Link>
              ))}
            </div>

            {/* CTA: 相談する */}
            <Link href={`/${locale}/contact`}
              className="btn-richb-primary"
              style={{ padding: '8px 20px', fontSize: 13, fontFamily: 'inherit' }}>
              {locale === 'ja' ? '相談する' : locale === 'ko' ? '상담하기' : 'Contact'}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#4A5A6E', marginLeft: 'auto' }}
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: 'white', borderTop: '1px solid rgba(26,36,53,0.08)' }} className="lg:hidden">
          <nav style={{ padding: '12px 20px 20px' }} aria-label="Mobile navigation">
            {[
              { href: '/blog', label: locale === 'ja' ? 'ビザ比較' : locale === 'ko' ? '비자 비교' : 'Visa Compare' },
              { href: '/requirements', label: nav.requirements },
              { href: '/soft-power', label: nav.softPower },
              { href: '/guide', label: nav.guide },
              { href: '/blog', label: locale === 'ja' ? 'マガジン' : locale === 'ko' ? '매거진' : 'Magazine' },
            ].map((item) => (
              <Link key={item.href + item.label} href={`/${locale}${item.href}`}
                style={{ display: 'block', padding: '10px 8px', fontSize: 14, color: '#4A5A6E', textDecoration: 'none', borderBottom: '1px solid rgba(26,36,53,0.06)' }}
                onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}

            {/* Language */}
            <div style={{ display: 'flex', gap: 6, padding: '14px 0 10px' }}>
              {primaryLangs.map((lang) => (
                <Link key={lang} href={`/${lang}`}
                  style={{
                    fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6,
                    textDecoration: 'none', border: '1px solid',
                    background: lang === locale ? '#1A2435' : 'transparent',
                    color: lang === locale ? 'white' : '#7E8EA4',
                    borderColor: lang === locale ? '#1A2435' : 'rgba(26,36,53,0.15)',
                  }}
                  onClick={() => setMobileOpen(false)}>
                  {languageLabels[lang].flag} {languageLabels[lang].short}
                </Link>
              ))}
            </div>

            <Link href={`/${locale}/contact`}
              className="btn-richb-primary"
              style={{ padding: '11px 20px', fontSize: 13, fontFamily: 'inherit', width: '100%', justifyContent: 'center', marginTop: 4 }}
              onClick={() => setMobileOpen(false)}>
              {locale === 'ja' ? '相談する' : locale === 'ko' ? '상담하기' : 'Contact'}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
