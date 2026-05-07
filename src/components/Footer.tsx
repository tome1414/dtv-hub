import Link from 'next/link'
import { MessageSquare, Globe } from 'lucide-react'
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
      { labelJa: '更新・再申請', labelEn: 'Renewal & Re-application', labelKo: '갱신·재신청', href: '/guide/renewal' },
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
      { labelJa: 'ゴルフスクールプラン', labelEn: 'Golf DTV Plan', labelKo: '골프 DTV 플랜', href: '/soft-power/golf' },
      { labelJa: '家族ビザサポート', labelEn: 'Family Visa Support', labelKo: '가족 비자 지원', href: '/guide/family' },
      { labelJa: 'Discordコミュニティ', labelEn: 'Discord Community', labelKo: 'Discord 커뮤니티', href: 'https://discord.gg/R2gA6jchfk' },
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
    <footer className="bg-navy-950 border-t border-gold-500/20" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="inline-block">
              <span className="text-2xl font-bold tracking-wider text-white">
                DTV <span className="text-gold-400">Club</span>
              </span>
            </Link>
            <p className="text-sm text-navy-400 leading-relaxed">{footer.tagline}</p>
            <a
              href="https://discord.gg/R2gA6jchfk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-gold-500/20 rounded-lg text-sm text-gold-400 font-medium transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Discord
            </a>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.titleEn} className="space-y-4">
              <h4 className="text-sm font-semibold text-gold-400 uppercase tracking-wider">
                {getSectionTitle(locale, section)}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href.startsWith('http') ? link.href : `/${locale}${link.href}`}
                      className="text-sm text-navy-400 hover:text-gold-300 transition-colors"
                      {...(link.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
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
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-500">{footer.legal}</p>

          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-navy-500" />
            <div className="flex items-center gap-3">
              {footer.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  className="text-xs text-navy-500 hover:text-navy-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
