'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { BlogPostMeta } from '@/types/blog'
import { GolfDtvCTA } from '@/components/analytics/golf-dtv-cta'

const LIGHT = {
  bg: '#F5F8FA', bgSub: '#EDF1F5',
  text: '#1A2435', sub: '#4A5A6E', muted: '#7E8EA4',
  border: 'rgba(26,36,53,0.10)', green: '#0A7A6A', gold: '#C9A030',
}
const DARK = {
  bg: '#0D1520', bgSub: '#111E2E',
  text: '#DCE8F5', sub: '#5C7A9A', muted: '#3A5270',
  border: '#142238', green: '#0A7A6A', gold: '#C9A030',
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
          /* Hero: image on top, content below */
          .top-hero-img {
            position: relative !important;
            width: 100% !important; height: 220px !important;
            background-position: center 30% !important;
          }
          .top-hero-gradient { display: none !important; }
          .top-hero-inner { display: block !important; }
          .top-hero-left { max-width: 100% !important; padding: 28px 20px 24px !important; }
          .hero-cta-primary { max-width: 100% !important; font-size: 13px !important; padding: 12px 16px !important; }
          .hero-cta-secondary { max-width: 100% !important; font-size: 12px !important; }
          /* Other */
          .top-cat-grid { grid-template-columns: 1fr 1fr !important; }
          .top-cta-strip { flex-direction: column !important; gap: 16px !important; }
          .top-h1 { font-size: 26px !important; }
          .top-latest { grid-template-columns: 1fr !important; }
          .hero-stats { gap: 16px !important; }
        }
        @media (max-width: 480px) {
          .top-cat-grid { grid-template-columns: 1fr !important; }
          .top-h1 { font-size: 22px !important; }
          .top-hero-img { height: 180px !important; }
        }
        .top-cat-item:hover { background: ${C.bgSub} !important; }
        /* カードカラーアクセント */
        .top-cat-item { position: relative; overflow: hidden; }
        .top-cat-item::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; }
        .top-cat-c0::before { background: #0A7A6A; }
        .top-cat-c1::before { background: #4A62C4; }
        .top-cat-c2::before { background: #C9A030; }
        /* Hero CTA buttons */
        .hero-cta-primary {
          display: flex; align-items: center; justify-content: space-between;
          background: #0A7A6A; color: white;
          padding: 14px 20px; border-radius: 9px;
          font-size: 14px; font-weight: 700; margin-bottom: 8px;
          border: none; cursor: pointer; font-family: inherit;
          max-width: 360px; width: 100%; text-decoration: none;
          box-shadow: 0 3px 0 #064d41, 0 6px 18px rgba(10,122,106,0.28);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          position: relative; overflow: hidden;
        }
        .hero-cta-primary::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.25) 50%, transparent 95%);
        }
        .hero-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 0 #064d41, 0 10px 24px rgba(10,122,106,0.35); color: white; }
        .hero-cta-primary:active { transform: translateY(1px); box-shadow: 0 1px 0 #064d41; }
        .hero-cta-secondary {
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(245,248,250,0.78); backdrop-filter: blur(8px);
          padding: 11px 20px; border-radius: 9px;
          font-size: 13px; font-weight: 500; margin-bottom: 8px;
          max-width: 360px; width: 100%; text-decoration: none; color: #1A2435;
          border: 1px solid rgba(26,36,53,0.12); cursor: pointer;
          box-shadow: 0 1px 4px rgba(26,36,53,0.07);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .hero-cta-secondary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(26,36,53,0.10); color: #1A2435; }
      `}</style>

      {/* Theme toggle — desktop only */}
      <div className="hidden lg:flex" style={{
        position: 'fixed', bottom: 32, right: 24, zIndex: 100,
        alignItems: 'center', gap: 8,
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

        {/* ── Hero — Pattern B (café image right + content left) ── */}
        <div style={{ position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${C.border}`, marginLeft: '-2rem', marginRight: '-2rem' }}>
          {/* Right: café image */}
          <div className="top-hero-img" style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '58%',
            backgroundImage: 'url(/hero-cafe.webp)',
            backgroundSize: 'cover',
            backgroundPosition: '65% center',
          }} />
          {/* Image left-fade */}
          <div className="top-hero-gradient" style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '58%',
            background: `linear-gradient(to right, ${C.bg} 0%, rgba(245,248,250,0.85) 12%, rgba(245,248,250,0.40) 28%, rgba(245,248,250,0.10) 45%, transparent 65%)`,
            pointerEvents: 'none', zIndex: 2,
          }} />
          {/* Right edge vignette */}
          <div className="top-hero-gradient" style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '58%',
            background: 'linear-gradient(to left, rgba(20,33,48,0.28) 0%, transparent 50%)',
            pointerEvents: 'none', zIndex: 2,
          }} />

          {/* Left: content */}
          <div className="top-hero-inner" style={{ display: 'flex' }}>
            <div className="top-hero-left" style={{ padding: '72px 52px 60px 2rem', maxWidth: 560, position: 'relative', zIndex: 5 }}>

              {/* Eyebrow */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'rgba(10,122,106,0.08)', border: '1px solid rgba(10,122,106,0.20)',
                borderRadius: 100, padding: '4px 12px', marginBottom: 20,
                fontSize: 11, fontWeight: 500, color: C.green, letterSpacing: '0.04em',
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.green, flexShrink: 0 }} />
                {isJa ? 'Destination Thailand Visa — 専門メディア' : isKo ? 'Destination Thailand Visa — 전문 미디어' : 'Destination Thailand Visa — Media'}
              </div>

              {/* H1 */}
              <h1 className="top-h1" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 42, fontWeight: 600, lineHeight: 1.3, color: C.text, margin: '0 0 16px', letterSpacing: '-0.01em' }}>
                {isJa ? (
                  <>タイへの新しい暮らしを、<br /><span style={{ color: C.green }}>正確な情報</span>から<br />はじめる。</>
                ) : isKo ? (
                  <>태국에서의 새로운 삶을,<br /><span style={{ color: C.green }}>정확한 정보</span>로<br />시작하세요.</>
                ) : (
                  <>A new life in Thailand,<br />starting with <span style={{ color: C.green }}>accurate info.</span></>
                )}
              </h1>

              {/* Lead */}
              <p style={{ fontSize: 13, color: C.sub, lineHeight: 1.85, margin: '0 0 28px', maxWidth: 380 }}>
                {isJa
                  ? 'DTVビザの比較・申請・必要書類・生活準備まで、一次情報をもとに中立的に解説するDTV専門メディアです。'
                  : isKo
                  ? 'DTV 비자 비교·신청·필요 서류·생활 준비까지, 1차 정보를 바탕으로 중립적으로 해설하는 DTV 전문 미디어입니다.'
                  : 'Neutral guides on DTV visa comparison, application, requirements, and life in Thailand. Based on official sources.'}
              </p>

              {/* CTAs */}
              <Link href={`/${locale}/blog`} className="hero-cta-primary">
                <span>{isJa ? '自分に合うビザを比較する' : isKo ? '나에게 맞는 비자 비교하기' : 'Compare Visas for You'}</span>
                <span style={{ fontSize: 10, fontWeight: 500, background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap' }}>
                  {isJa ? '初めての方はここから' : isKo ? '처음 오신 분' : 'Start here'}
                </span>
              </Link>
              <Link href={`/${locale}/guide`} className="hero-cta-secondary">
                <span>{isJa ? 'DTV申請の流れを見る' : isKo ? 'DTV 신청 절차 보기' : 'See Application Flow'}</span>
                <span style={{ fontSize: 11, color: '#7E8EA4' }}>{isJa ? '申請準備中の方へ' : isKo ? '신청 준비 중' : 'For applicants'}</span>
              </Link>
              <Link href={`/${locale}/requirements`} className="hero-cta-secondary">
                <span>{isJa ? '必要書類を確認する' : isKo ? '필요 서류 확인하기' : 'Check Requirements'}</span>
                <span style={{ fontSize: 11, color: '#7E8EA4' }}>{isJa ? '申請直前の方へ' : isKo ? '신청 직전' : 'Before applying'}</span>
              </Link>

              {/* Stats */}
              <div className="hero-stats" style={{ display: 'flex', gap: 28, paddingTop: 24, borderTop: `1px solid ${C.border}`, marginTop: 8 }}>
                <div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 600, color: C.green }}>{posts.length}+</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{isJa ? '記事' : isKo ? '기사' : 'Articles'}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 600, color: '#C9A030' }}>3{isJa ? '言語' : isKo ? '개 언어' : ' langs'}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{isJa ? '日・英・韓' : isKo ? '일·영·한' : 'JA · EN · KO'}</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 600, color: '#4A62C4' }}>{isJa ? '一次情報' : isKo ? '1차 정보' : 'Official'}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{isJa ? '大使館公式準拠' : isKo ? '대사관 공식 기준' : 'Embassy-based'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Category grid ── */}
        {(() => {
          const cardColors = ['top-cat-c0', 'top-cat-c1', 'top-cat-c2']
          const accentColors = ['#0A7A6A', '#4A62C4', '#C9A030']
          return (
            <div className="top-cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 1px', background: C.border, borderBottom: `1px solid ${C.border}` }}>
              {cats.map((c, i) => (
                <Link key={i} href={`/${locale}${c.href}`} className={`top-cat-item ${cardColors[i]}`} style={{ textDecoration: 'none', display: 'block', background: C.bg, transition: 'background 0.15s' }}>
                  <div style={{ padding: '22px 20px 22px 24px' }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: accentColors[i], textTransform: 'uppercase', letterSpacing: '0.12em' }}>{c.cat}</span>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.45, margin: '8px 0 0' }}>{c.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          )
        })()}

        {/* ── Latest Articles (moved from hero) ── */}
        {featured && (
          <div style={{ paddingTop: 36, paddingBottom: 36, borderBottom: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: C.muted, textTransform: 'uppercase', margin: '0 0 20px' }}>
              {isJa ? '最新記事' : isKo ? '최신 기사' : 'Latest Articles'}
            </p>
            <div className="top-latest" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0 36px' }}>
              {[featured, ...secondary].map((post, i) => (
                <div key={post.slug} style={{ paddingBottom: 0 }}>
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
        )}

        {/* ── Golf DTV Banner ── */}
        <div style={{
          margin: '0 0 64px', position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, #121C10 0%, #1A2C1A 55%, #1C2A12 100%)',
          borderRadius: 12,
          border: '1px solid rgba(201,160,48,0.22)',
          boxShadow: '0 4px 0 rgba(0,0,0,0.28), 0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(201,160,48,0.12)',
        }}>
          {/* decorative radial glows */}
          <div style={{ position: 'absolute', right: -50, top: -50, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,160,48,0.13) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 80, bottom: -70, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,160,48,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

          <div className="top-cta-strip" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 36px', gap: 24, position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 1, minWidth: 0 }}>
              {/* Gold icon badge */}
              <div style={{ width: 52, height: 52, flexShrink: 0, background: 'linear-gradient(135deg, #E4B84A, #A8832A)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 12px rgba(201,160,48,0.40)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: '#E4B84A', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Golf DTV</span>
                  <span style={{ fontSize: 9, fontWeight: 700, background: 'rgba(201,160,48,0.18)', color: '#E4B84A', padding: '2px 7px', borderRadius: 4, letterSpacing: '0.06em' }}>Premium</span>
                </div>
                <p style={{ fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 700, color: '#fff', margin: '0 0 6px', lineHeight: 1.3, fontFamily: 'Georgia, serif' }}>
                  {isJa ? 'タイでゴルフを続けながら、長期滞在する。' : isKo ? '태국에서 골프를 즐기며, 장기 체류한다.' : 'Play golf in Thailand. Stay long-term.'}
                </p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.50)', margin: 0, lineHeight: 1.6 }}>
                  {isJa
                    ? 'ソフトパワールートでDTVを取得。タイ政府認定プログラムで受入レターを取得できます。'
                    : isKo
                    ? '소프트파워 경로로 DTV를 취득. 태국 정부 인증 프로그램으로 입학 허가서를 받을 수 있습니다.'
                    : 'Get your DTV via the Soft Power route with a Thai gov-approved program.'}
                </p>
              </div>
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
