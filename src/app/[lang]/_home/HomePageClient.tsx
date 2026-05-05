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

const categoryLabelJa: Record<string, string> = {
  comparison: '比較', basic: 'ガイド', process: '申請実務',
  documents: '必要書類', 'soft-power': 'ソフトパワー',
  freelance: 'フリーランス', locations: '地域', 'life-in-thailand': 'タイ生活',
}

const categoryLabelEn: Record<string, string> = {
  comparison: 'Comparison', basic: 'Guide', process: 'Application',
  documents: 'Documents', 'soft-power': 'Soft Power',
  freelance: 'Freelance', locations: 'Locations', 'life-in-thailand': 'Life in Thailand',
}

const categoryLabelKo: Record<string, string> = {
  comparison: '비교 기사', basic: '기본 가이드', process: '신청 실무',
  documents: '필요 서류', 'soft-power': '소프트파워',
  freelance: '프리랜서', locations: '지역 가이드', 'life-in-thailand': '태국 생활',
}

const staticCategories = {
  ja: [
    { cat: '申請ガイド', href: '/requirements', label: 'DTVビザの書類と申請フロー' },
    { cat: 'ソフトパワー', href: '/soft-power', label: 'タイ政府認定プログラムで取得' },
    { cat: '比較', href: '/dtv-soft-power-vs-freelance', label: 'ルート別メリット・デメリット' },
  ],
  en: [
    { cat: 'Application Guide', href: '/requirements', label: 'Documents & Application Flow' },
    { cat: 'Soft Power', href: '/soft-power', label: 'Thai Gov Certified Programs' },
    { cat: 'Comparison', href: '/dtv-soft-power-vs-freelance', label: 'Route Pros & Cons' },
  ],
  ko: [
    { cat: '신청 가이드', href: '/requirements', label: 'DTV 비자 서류 및 신청 절차' },
    { cat: '소프트파워', href: '/soft-power', label: '태국 정부 공인 프로그램' },
    { cat: '비교 기사', href: '/dtv-soft-power-vs-freelance', label: '경로별 장단점' },
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
  const isKo = locale === 'ko'
  const cats = staticCategories[locale as keyof typeof staticCategories] ?? staticCategories.en
  const categoryLabel = locale === 'ja' ? categoryLabelJa : locale === 'ko' ? categoryLabelKo : categoryLabelEn

  const featured = posts[0]
  const secondary = posts.slice(1, 3)

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', paddingTop: 64, transition: 'background 0.2s, color 0.2s' }}>
      <p className="sr-only">
        {isJa
          ? 'DTV Club - タイDTVビザの比較・申請・生活情報メディア。ソフトパワービザ、必要書類、申請方法を中立的に解説します。'
          : isKo
          ? 'DTV Club - 태국 DTV 비자 비교·신청·생활 정보 미디어. 소프트파워 비자, 필요 서류, 신청 방법을 중립적으로 해설합니다.'
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
                  {isJa ? '特集' : isKo ? '특집' : 'Featured'}
                </span>
              </div>
              <h1 className="top-h1" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 44, fontWeight: 700, lineHeight: 1.16, color: C.text, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
                {isJa ? (
                  <>タイへ、長く自由に住む。<br /><span style={{ color: C.green }}>正確な情報</span>が、<br />最初の一歩を助ける。</>
                ) : isKo ? (
                  <>태국에서, 길고 자유롭게.<br /><span style={{ color: C.green }}>정확한 정보</span>가<br />첫 걸음을 돕습니다.</>
                ) : (
                  <>Live in Thailand,<br /><span style={{ color: C.green }}>free and long-term.</span><br />Accurate info, first step.</>
                )}
              </h1>
              <p style={{ fontSize: 15, color: C.sub, lineHeight: 1.72, margin: '0 0 28px', maxWidth: 440 }}>
                {isJa
                  ? 'DTVビザの比較・申請・生活情報を中立的に解説。あなたに合ったビザと取得ルートを一緒に整理します。'
                  : isKo
                  ? 'DTV 비자 비교·신청·생활 정보를 중립적으로 해설. 나에게 맞는 비자와 취득 경로를 함께 정리합니다.'
                  : 'Neutral guides on DTV visa comparison, application, and life in Thailand. Find the right route for you.'}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href={`/${locale}/blog`} style={{ background: C.green, color: '#fff', padding: '12px 24px', fontSize: 14, fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
                  {isJa ? 'ビザを比較する' : isKo ? '비자 비교하기' : 'Compare Visas'}
                </Link>
                <Link href={`/${locale}/requirements`} style={{ background: 'transparent', color: C.text, border: `2px solid ${C.border}`, padding: '12px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
                  {isJa ? '必要書類を確認する' : isKo ? '필요 서류 확인하기' : 'Check Requirements'}
                </Link>
              </div>
            </div>
            <div className="top-hero-right" style={{ paddingLeft: 36, paddingBottom: 44 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: C.muted, textTransform: 'uppercase', margin: '0 0 16px' }}>
                {isJa ? '最新記事' : isKo ? '최신 기사' : 'Latest Articles'}
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
              {isJa ? 'タイへ、長く自由に住む。' : isKo ? '태국에서, 길고 자유롭게.' : 'Live in Thailand, free and long-term.'}
            </h1>
            <Link href={`/${locale}/requirements`} style={{ background: C.green, color: '#fff', padding: '12px 24px', fontSize: 14, fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
              {isJa ? '必要書類を確認する' : isKo ? '필요 서류 확인하기' : 'Check Requirements'}
            </Link>
          </div>
        )}

        {/* ── Category grid ── */}
        <div className="top-cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 1px', background: C.border, borderBottom: `1px solid ${C.border}` }}>
          {cats.map((c, i) => (
            <Link key={i} href={`/${locale}${c.href}`} className="top-cat-item" style={{ textDecoration: 'none', display: 'block', background: C.bg, transition: 'background 0.15s' }}>
              <div style={{ padding: '22px 20px' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{c.cat}</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.45, margin: '8px 0 0' }}>{c.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Golf DTV Banner ── */}
        <div style={{ margin: '0 0 64px', position: 'relative', overflow: 'hidden', background: dark ? '#0A5C30' : '#0B3D24', borderRadius: 4, border: dark ? '1px solid rgba(201,162,74,0.35)' : 'none', boxShadow: dark ? '0 0 0 1px rgba(201,162,74,0.12)' : 'none' }}>
          {/* decorative circles */}
          <div style={{ position: 'absolute', right: -60, top: -60, width: 280, height: 280, borderRadius: '50%', background: dark ? 'rgba(201,162,74,0.12)' : 'rgba(201,162,74,0.08)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 60, bottom: -80, width: 200, height: 200, borderRadius: '50%', background: dark ? 'rgba(201,162,74,0.07)' : 'rgba(201,162,74,0.05)', pointerEvents: 'none' }} />

          <div className="top-cta-strip" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 36px', gap: 24, position: 'relative' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 28, height: 2, background: C.gold }} />
                <span style={{ fontSize: 10, fontWeight: 800, color: C.gold, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Golf DTV</span>
              </div>
              <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 700, color: '#fff', margin: '0 0 8px', lineHeight: 1.3, fontFamily: 'Georgia, serif' }}>
                {isJa ? 'タイでゴルフを続けながら、長期滞在する。' : isKo ? '태국에서 골프를 즐기며, 장기 체류한다.' : 'Play golf in Thailand. Stay long-term.'}
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>
                {isJa
                  ? 'ソフトパワールートでDTVを取得。タイ政府認定プログラムで受入レターを取得できます。'
                  : isKo
                  ? '소프트파워 경로로 DTV를 취득. 태국 정부 인증 프로그램으로 입학 허가서를 받을 수 있습니다.'
                  : 'Get your DTV via the Soft Power route with a Thai gov-approved program.'}
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <GolfDtvCTA locale={locale as import('@/middleware').Locale} />
            </div>
          </div>
        </div>

        {/* ── Blog posts grid ── */}
        {posts.length > 3 && (
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted, margin: 0 }}>
                {isJa ? '記事一覧' : isKo ? '기사 목록' : 'Articles'}
              </p>
              <Link href={`/${locale}/blog`} style={{ fontSize: 12, color: C.green, textDecoration: 'none' }}>
                {isJa ? 'すべて見る →' : isKo ? '전체 보기 →' : 'See all →'}
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
