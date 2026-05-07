'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, MessageSquare, Globe } from 'lucide-react'
import type { Locale } from '@/middleware'
import type { Dictionary } from '@/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  locale: Locale
  nav: Dictionary['nav']
}

const languageLabels: Record<Locale, { short: string; full: string; flag: string }> = {
  ja: { short: 'JP', full: '日本語', flag: '🇯🇵' },
  en: { short: 'EN', full: 'English', flag: '🇺🇸' },
  zh: { short: '中文', full: '中文', flag: '🇨🇳' },
  ko: { short: 'KO', full: '한국어', flag: '🇰🇷' },
  ru: { short: 'RU', full: 'Русский', flag: '🇷🇺' },
}

const megaMenuItems = {
  guide: [
    { label: '大使館別申請ガイド', href: '/guide/embassy' },
    { label: '書類チェックリスト', href: '/requirements' },
    { label: '申請フロー図解', href: '/guide/flow' },
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

  // 言語ドロップダウン外クリックで閉じる
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-md border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl font-bold tracking-wider text-white">
              DTV <span className="text-gold-400">Club</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">

            {/* Guide - Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('guide')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-navy-100 hover:text-gold-400 hover:bg-white/5 data-[state=open]:bg-white/5"
              >
                {nav.guide}
                <ChevronDown className={cn('w-3.5 h-3.5 opacity-60 transition-transform duration-200', activeMenu === 'guide' && 'rotate-180')} />
              </Button>
              {activeMenu === 'guide' && (
                <div className="absolute top-full left-0 w-56 bg-navy-900 border border-gold-500/20 rounded-xl shadow-2xl shadow-black/50 p-2 mt-1">
                  {megaMenuItems.guide.map((item) => (
                    <Link
                      key={item.href}
                      href={`/${locale}${item.href}`}
                      className="block px-3 py-2.5 text-sm text-navy-200 hover:text-gold-400 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Button variant="ghost" size="sm" asChild className="text-navy-100 hover:text-gold-400 hover:bg-white/5">
              <Link href={`/${locale}/requirements`}>{nav.requirements}</Link>
            </Button>

            {/* Life - Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMenu('life')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-navy-100 hover:text-gold-400 hover:bg-white/5"
              >
                {nav.life}
                <ChevronDown className={cn('w-3.5 h-3.5 opacity-60 transition-transform duration-200', activeMenu === 'life' && 'rotate-180')} />
              </Button>
              {activeMenu === 'life' && (
                <div className="absolute top-full left-0 w-52 bg-navy-900 border border-gold-500/20 rounded-xl shadow-2xl shadow-black/50 p-2 mt-1">
                  {megaMenuItems.life.map((item) => (
                    <Link
                      key={item.href}
                      href={`/${locale}${item.href}`}
                      className="block px-3 py-2.5 text-sm text-navy-200 hover:text-gold-400 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Button variant="ghost" size="sm" asChild className="text-navy-100 hover:text-gold-400 hover:bg-white/5">
              <Link href={`/${locale}/soft-power`}>{nav.softPower}</Link>
            </Button>
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">

            {/* 言語ドロップダウン */}
            <div className="relative" ref={langRef}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 bg-white/10 border-gold-500/30 text-navy-100 hover:bg-white/20 hover:text-white hover:border-gold-400"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">{languageLabels[locale].short}</span>
                <ChevronDown className={cn('w-3 h-3 opacity-60 transition-transform duration-200', langOpen && 'rotate-180')} />
              </Button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 bg-navy-900 border border-gold-500/20 rounded-xl shadow-2xl shadow-black/50 p-1.5 z-50">
                  {(Object.keys(languageLabels) as Locale[]).map((lang) => (
                    <Link
                      key={lang}
                      href={`/${lang}`}
                      onClick={() => setLangOpen(false)}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-colors',
                        lang === locale
                          ? 'bg-gold-500/15 text-gold-400 font-semibold'
                          : 'text-navy-200 hover:text-gold-400 hover:bg-white/5'
                      )}
                    >
                      <span className="text-base">{languageLabels[lang].flag}</span>
                      <span>{languageLabels[lang].full}</span>
                      {lang === locale && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-400" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Discord CTA */}
            <Button
              size="sm"
              className="flex items-center gap-2 bg-gold-gradient text-navy-950 font-bold hover:opacity-90 shadow-lg shadow-gold-500/20 border-0"
              asChild
            >
              <a href="https://discord.gg/R2gA6jchfk" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="w-4 h-4" />
                {nav.joinDiscord}
              </a>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-navy-200 hover:text-gold-400 hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-950 border-t border-gold-500/20">
          <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
            <Link
              href={`/${locale}/guide`}
              className="block px-3 py-2.5 text-sm text-navy-200 hover:text-gold-400 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {nav.guide}
            </Link>
            <Link
              href={`/${locale}/requirements`}
              className="block px-3 py-2.5 text-sm text-navy-200 hover:text-gold-400 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {nav.requirements}
            </Link>
            <Link
              href={`/${locale}/life`}
              className="block px-3 py-2.5 text-sm text-navy-200 hover:text-gold-400 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {nav.life}
            </Link>
            <Link
              href={`/${locale}/soft-power`}
              className="block px-3 py-2.5 text-sm text-navy-200 hover:text-gold-400 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {nav.softPower}
            </Link>

            {/* 言語セレクター（モバイル） */}
            <div className="flex items-center gap-1 pt-3 pb-1 flex-wrap">
              {(Object.keys(languageLabels) as Locale[]).map((lang) => (
                <Link
                  key={lang}
                  href={`/${lang}`}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all',
                    lang === locale
                      ? 'bg-gold-500 text-navy-950'
                      : 'bg-white/5 text-navy-300 hover:text-gold-400'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{languageLabels[lang].flag}</span>
                  <span>{languageLabels[lang].short}</span>
                </Link>
              ))}
            </div>

            <Button
              className="w-full mt-3 bg-gold-gradient text-navy-950 font-bold border-0 hover:opacity-90"
              asChild
            >
              <a
                href="https://discord.gg/R2gA6jchfk"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                {nav.joinDiscord}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
