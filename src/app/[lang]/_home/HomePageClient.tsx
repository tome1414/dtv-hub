'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { BlogPostMeta } from '@/types/blog'
import { GolfDtvCTA } from '@/components/analytics/golf-dtv-cta'

const LIGHT = {
  bg: '#F8F7F3', bgSub: '#EDEAE3',
  text: '#172019', sub: '#5C665E', muted: '#9EA89E',
  border: '#DDD9CE', green: '#0F6A43', gold: '#C9A24A',
}
const DARK = {
  bg: '#08101E', bgSub: '#0D1A2F',
  text: '#DCE8F5', sub: '#5C7A9A', muted: '#253D57',
  border: '#142238', green: '#0A6B3C', gold: '#C89A20',
}

const categoryLabel: Record<string, string> = {
  comparison: '比較', basic: 'ガイド', process: '申請実務',
  documents: '必要書類', 'soft-power': 'ソフトパワー',
  freelance: 'フリーランス', locations: '地域', 'life-in-thailand': 'タイ生活',
}

const staticCategories = {
  ja: [
    { cat: '申請ガイド', href: '/requirements', label: 'DTVビザの書類と申請フロー' },
    { cat: 'ソフトパワー', href: '/soft-power', label: 'タイ政府認定プログラムで取得' },
    { cat: '比較', href: '/dtv-soft-power-vs-freelance', label: 'ルート別メリット・デメリット' },
    { cat: 'Golf DTV', href: '/golf-dtv', label: 'タイ政府認定 5日間プログラム' },
  ],
  en: [
    { cat: 'Application Guide', href: '/requirements', label: 'Documents & Application Flow' },
    { cat: 'Soft Power', href: '/soft-power', label: 'Thai Gov Certified Programs' },
    { cat: 'Comparison', href: '/dtv-soft-power-vs-freelance', label: 'Route Pros & Cons' },
    { cat: 'Golf DTV', href: '/golf-dtv', label: 'Thai Gov Certified 5-Day Program' },
  ],
}

interface Props {
  posts: BlogPostMeta[]
  locale: string
}

export default function HomePageClient({ posts, locale }: Props) {
  const [dark, setDark] = useState(false)
  const C = dark ? DARK : LIGHT
  const isJa = locale === 'ja'
  const cats = staticCategories[locale as keyof typeof staticCategories] ?? staticCategories.en

  const featured = posts[0]
  const secondary = posts.slice(1, 3)

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', paddingTop: 64, transition: 'background 0.2s, color 0.2s' }}>
      <p className="sr-only">
        {isJa
          ? 'DTV Club - タイDTVビザの比較・申請・生活情報メディア。ソフトパワービザ、必要書類、申請方法を中立的に解説します。'
          : 'DTV Club - Thailand DTV Visa information media. Neutral guides on Soft Power visa, required documents, and application.'}
      </p>

      <style>{`
        @media (max-width: 768px) {
          .top-hero { grid-template-columns: 1fr !important; }
          .top-hero-right { border-left: none !important; padding-left: 0 !important; border-top: 1px solid ${C.border}; padding-top: 28px !important; margin-top: 32px; }
          .top-cat-grid { grid-template-columns: 1fr 1fr !important; }
          .top-cta-strip { flex-direction: column !important; gap: 16px !important; }
          .top-h1 { font-size: 32px !important; }
        }
        @media (max-width: 480px) {
          .top-cat-grid { grid-template-columns: 1fr !important; }
        }
        .top-cat-item:hover { background: ${C.bgSub} !important; }
      `}</style>

      {/* Theme toggle */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 100,
        display: 'flex', alignItems: 'center', gap: 8,
        background: dark ? '#142238' : '#fff',
        border: `1px solid ${C.border}`,
        borderRadius: 99, padding: '6px 14px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
        cursor: 'pointer', fontSize: 12, fontWeight: 600,
        color: C.muted,
      }} onClick={() => setDark(d => !d)}>
        <span>{dark ? '☀' : '🌙'}</span>
        <span>{dark ? 'Light' : 'Dark'}</span>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

        {/* ── Featured hero ── */}
        {featured ? (
          <div className="top-hero" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 0, borderBottom: `1px solid ${C.border}`, paddingTop: 44 }}>
            <div style={{ paddingRight: 44, paddingBottom: 44, borderRight: `1px solid ${C.border}` }}>
              <div style={{ display: 'inline-block', background: C.green, padding: '3px 10px', marginBottom: 20 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {isJa ? '特集' : 'Featured'}
                </span>
              </div>
              <h1 className="top-h1" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 44, fontWeight: 700, lineHeight: 1.16, color: C.text, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                {isJa ? (
                  <>タイへ、長く自由に住む。<br /><span style={{ color: C.green }}>正確な情報</span>が、<br />最初の一歩を助ける。</>
                ) : (
                  <>Live in Thailand,<br /><span style={{ color: C.green }}>free and long-term.</span><br />Accurate info, first step.</>
                )}
              </h1>
              <p style={{ fontSize: 15, color: C.sub, lineHeight: 1.72, margin: '0 0 28px', maxWidth: 440 }}>
                {isJa
                  ? 'DTVビザの比較・申請・生活情報を中立的に解説。あなたに合ったビザと取得ルートを一緒に整理します。'
                  : 'Neutral guides on DTV visa comparison, application, and life in Thailand. Find the right route for you.'}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href={`/${locale}/blog`} style={{ background: C.green, color: '#fff', padding: '12px 24px', fontSize: 14, fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
                  {isJa ? 'ビザを比較する' : 'Compare Visas'}
                </Link>
                <Link href={`/${locale}/requirements`} style={{ background: 'transparent', color: C.text, border: `2px solid ${C.border}`, padding: '12px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
                  {isJa ? '必要書類を確認する' : 'Check Requirements'}
                </Link>
              </div>
            </div>
            <div className="top-hero-right" style={{ paddingLeft: 36, paddingBottom: 44 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: C.muted, textTransform: 'uppercase', margin: '0 0 16px' }}>
                {isJa ? '最新記事' : 'Latest Articles'}
              </p>
              {[featured, ...secondary].map((post, i) => (
                <div key={post.slug} style={{ paddingBottom: i < 2 ? 20 : 0, marginBottom: i < 2 ? 20 : 0, borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
                  <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: C.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      {categoryLabel[post.primary_category] ?? post.primary_category}
                    </span>
                    <p style={{ fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1.42, margin: '6px 0 4px' }}>{post.title}</p>
                    <span style={{ fontSize: 11, color: C.muted }}>{post.published_at}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ paddingTop: 60, paddingBottom: 60, borderBottom: `1px solid ${C.border}` }}>
            <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 44, fontWeight: 700, lineHeight: 1.16, color: C.text, margin: '0 0 20px' }}>
              {isJa ? 'タイへ、長く自由に住む。' : 'Live in Thailand, free and long-term.'}
            </h1>
            <Link href={`/${locale}/requirements`} style={{ background: C.green, color: '#fff', padding: '12px 24px', fontSize: 14, fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
              {isJa ? '必要書類を確認する' : 'Check Requirements'}
            </Link>
          </div>
        )}

        {/* ── Category grid ── */}
        <div className="top-cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 1px', background: C.border, borderBottom: `1px solid ${C.border}` }}>
          {cats.map((c, i) => (
            <Link key={i} href={`/${locale}${c.href}`} className="top-cat-item" style={{ textDecoration: 'none', display: 'block', background: C.bg, transition: 'background 0.15s' }}>
              <div style={{ padding: '22px 20px' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{c.cat}</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.45, margin: '8px 0 0' }}>{c.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Golf DTV CTA strip ── */}
        <div className="top-cta-strip" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1px solid ${C.border}`, borderTop: 'none', padding: '24px 28px', margin: '0 0 64px' }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: C.muted, textTransform: 'uppercase', margin: '0 0 6px' }}>Golf DTV</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: C.text, margin: 0 }}>
              {isJa ? 'タイでゴルフを続けながら、長期滞在する。' : 'Live long-term in Thailand. Play golf while you stay.'}
            </p>
          </div>
          <GolfDtvCTA locale={locale as 'ja' | 'en'} />
        </div>

        {/* ── Blog posts grid ── */}
        {posts.length > 3 && (
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, margin: 0 }}>
                {isJa ? '記事一覧' : 'Articles'}
              </p>
              <Link href={`/${locale}/blog`} style={{ fontSize: 12, color: C.green, textDecoration: 'none' }}>
                {isJa ? 'すべて見る →' : 'See all →'}
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 36px' }}>
              {posts.slice(3, 6).map((post) => (
                <div key={post.slug} style={{ paddingBottom: 24, borderBottom: `1px solid ${C.border}` }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: C.green, textTransform: 'uppercase', margin: '0 0 7px' }}>
                    {categoryLabel[post.primary_category] ?? post.primary_category}
                  </p>
                  <Link href={`/${locale}/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 16, fontWeight: 700, lineHeight: 1.45, color: C.text, margin: '0 0 8px' }}>{post.title}</h3>
                  </Link>
                  <p style={{ fontSize: 11, color: C.muted, margin: 0 }}>{post.published_at}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
