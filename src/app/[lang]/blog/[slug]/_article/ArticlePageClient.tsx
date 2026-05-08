'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/types/blog'
import type { TocItem } from '@/lib/blog'

const LIGHT = {
  bg: '#F5F8FA', bgSection: '#EDF1F5', bgCard: '#FFFFFF',
  text: '#1A2435', sub: '#4A5A6E', muted: '#7E8EA4',
  border: 'rgba(26,36,53,0.10)', borderMd: 'rgba(26,36,53,0.16)',
  green: '#0A7A6A', greenLt: '#0D9280', gold: '#C9A030',
  tealDim: 'rgba(10,122,106,0.10)', tealDimmer: 'rgba(10,122,106,0.06)',
}
const DARK = {
  bg: '#0d1427', bgSection: '#0F1A2E', bgCard: '#142238',
  text: '#DCE8F5', sub: '#5C7A9A', muted: '#253D57',
  border: '#142238', borderMd: '#1E3050',
  green: '#0A6B3C', greenLt: '#0D8070', gold: '#C89A20',
  tealDim: 'rgba(10,107,60,0.15)', tealDimmer: 'rgba(10,107,60,0.08)',
}

const categoryLabelJa: Record<string, string> = {
  comparison: '比較記事', basic: '基本ガイド', process: '申請実務',
  documents: '必要書類', 'soft-power': 'ソフトパワー',
  freelance: 'フリーランス', locations: '地域ガイド', 'life-in-thailand': 'タイ生活',
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

interface Props {
  post: BlogPost
  toc: TocItem[]
  locale: string
  slug: string
}

export default function ArticlePageClient({ post, toc, locale, slug }: Props) {
  const [dark, setDark] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [tocOpen, setTocOpen] = useState(true)
  const C = dark ? DARK : LIGHT
  const isJa = locale === 'ja'
  const isKo = locale === 'ko'

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(Math.min(100, progress))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const catLabel = (isJa ? categoryLabelJa : isKo ? categoryLabelKo : categoryLabelEn)[post.primary_category] ?? post.primary_category

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', paddingTop: 56, transition: 'background 0.2s, color 0.2s' }}>

      {/* Scroll progress bar */}
      <div style={{ position: 'fixed', top: 56, left: 0, right: 0, height: 3, background: C.border, zIndex: 49 }}>
        <div style={{
          width: `${scrollProgress}%`, height: '100%',
          background: C.green,
          borderRadius: '0 2px 2px 0',
          transition: 'width 0.1s linear',
        }} />
      </div>

      <style>{`
        @media (max-width: 860px) {
          .article-grid { grid-template-columns: 1fr !important; }
          .article-sidebar { display: none !important; }
          .article-mobile-toc { display: block !important; }
          .art-cta-desktop { display: none !important; }
          .art-cta-mobile { display: block !important; }
          .article-outer-pad { padding-bottom: 80px !important; }
        }
        .article-body h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.25rem; font-weight: 700; color: ${C.text};
          margin-top: 2.5rem; margin-bottom: 0.875rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid ${C.tealDim};
          line-height: 1.4;
        }
        .article-body h3 {
          font-size: 1rem; font-weight: 700; color: ${C.text};
          margin-top: 1.75rem; margin-bottom: 0.5rem;
        }
        .article-body p { color: ${C.sub}; font-size: 0.9375rem; line-height: 1.85; margin-bottom: 1.5rem; }
        .article-body strong { color: ${C.text}; font-weight: 700; }
        .article-body ul, .article-body ol {
          margin: 1.25rem 0 1.5rem; padding-left: 1.5rem;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .article-body ul { list-style-type: disc; }
        .article-body ol { list-style-type: decimal; }
        .article-body li { color: ${C.sub}; font-size: 0.9375rem; line-height: 1.75; }
        .article-body a { color: ${C.green}; text-decoration: underline; text-underline-offset: 3px; }
        .article-body a:hover { opacity: 0.75; }
        .article-body table {
          width: 100%; border-collapse: collapse; margin: 1.5rem 0 2rem;
          font-size: 0.875rem; border-radius: 8px; overflow: hidden;
          box-shadow: 0 2px 12px rgba(26,36,53,0.08);
        }
        .article-body th {
          background: ${C.text}; color: ${dark ? C.bg : '#fff'};
          font-weight: 700; padding: 0.625rem 0.875rem;
          text-align: left; font-size: 12px;
        }
        .article-body td {
          color: ${C.sub}; padding: 0.625rem 0.875rem;
          border-bottom: 1px solid ${C.border};
          background: ${C.bgCard}; vertical-align: top;
        }
        .article-body tr:last-child td { border-bottom: none; }
        .article-body hr { border: none; border-top: 1px solid ${C.border}; margin: 2.5rem 0; }
        .article-body blockquote {
          border-left: 3px solid ${C.gold}; padding: 0.75rem 1.25rem;
          margin: 1.5rem 0; background: ${C.bgSection};
          border-radius: 0 8px 8px 0;
        }
        .article-body blockquote p { color: ${C.sub}; margin: 0; }
        /* Sidebar TOC hover */
        .sidebar-toc-link {
          display: block; font-size: 12px; color: ${C.sub};
          text-decoration: none; padding: 4px 0 4px 12px;
          border-left: 2px solid ${C.border};
          line-height: 1.45; transition: color 0.15s, border-color 0.15s;
        }
        .sidebar-toc-link:hover { color: ${C.green}; border-left-color: ${C.green}; }
        .sidebar-toc-link + .sidebar-toc-link { margin-top: 2px; }
        .sidebar-toc-link.sub { padding-left: 24px; font-size: 11px; }
      `}</style>

      {/* Theme toggle */}
      <div style={{
        position: 'fixed', bottom: 76, right: 16, zIndex: 100,
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

      <div className="article-outer-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 60px' }}>

        {/* Breadcrumb */}
        <div style={{
          padding: '14px 0',
          borderBottom: `1px solid ${C.border}`,
          fontSize: 11, color: C.muted,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Link href={`/${locale}`} style={{ color: C.muted, textDecoration: 'none' }}>
            {isJa ? 'ホーム' : isKo ? '홈' : 'Home'}
          </Link>
          <span>›</span>
          <Link href={`/${locale}/blog`} style={{ color: C.muted, textDecoration: 'none' }}>
            {isJa ? 'ブログ' : isKo ? '블로그' : 'Blog'}
          </Link>
          <span>›</span>
          <span style={{ color: C.green }}>{post.title}</span>
        </div>

        {/* Article + Sidebar grid */}
        <div className="article-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 36, paddingTop: 36 }}>

          {/* ── Article ── */}
          <article>

            {/* Category pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: C.tealDim,
              border: '1px solid rgba(10,122,106,0.2)',
              borderRadius: 100,
              padding: '3px 10px 3px 6px',
              marginBottom: 14,
            }}>
              <div style={{ width: 5, height: 5, background: C.green, borderRadius: '50%' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {catLabel}
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 28, fontWeight: 700, lineHeight: 1.35,
              color: C.text, margin: '0 0 12px', letterSpacing: '-0.01em',
            }}>
              {post.title}
            </h1>

            <p style={{
              fontSize: 11, color: C.muted, margin: '0 0 20px',
              borderBottom: `1px solid ${C.border}`, paddingBottom: 14,
            }}>
              {isJa ? 'DTV Club編集部' : isKo ? 'DTV Club 편집부' : 'DTV Club Editorial'} · {post.published_at}
              {post.updated_at !== post.published_at && ` · ${isJa ? '更新' : isKo ? '업데이트' : 'Updated'} ${post.updated_at}`}
              · {isJa ? `読了約${post.read_time_minutes}分` : isKo ? `약 ${post.read_time_minutes}분` : `${post.read_time_minutes} min read`}
            </p>

            {/* Mobile TOC accordion — hidden on desktop */}
            <div className="article-mobile-toc" style={{ display: 'none', marginBottom: 20 }}>
              {toc.length > 0 && (
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                  <button
                    onClick={() => setTocOpen(o => !o)}
                    style={{
                      width: '100%', background: C.bgSection,
                      padding: '10px 14px', fontSize: 10, fontWeight: 700, color: C.text,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                    }}
                  >
                    <span>{isJa ? '目次' : isKo ? '목차' : 'Contents'}</span>
                    <span style={{
                      fontSize: 16, color: C.muted,
                      display: 'inline-block',
                      transform: tocOpen ? 'rotate(-90deg)' : 'rotate(90deg)',
                      transition: 'transform 0.2s',
                    }}>›</span>
                  </button>
                  {tocOpen && (
                    <ul style={{ listStyle: 'none', padding: '10px 14px', margin: 0 }}>
                      {toc.map((item, i) => (
                        <li key={i} style={{
                          padding: '4px 0', fontSize: 11, color: C.sub,
                          display: 'flex', alignItems: 'flex-start', gap: 8,
                          borderBottom: `1px solid ${C.bgSection}`,
                        }}>
                          <span style={{ fontSize: 10, color: C.green, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>
                            {i + 1}
                          </span>
                          <a href={`#${item.id}`} style={{ color: C.sub, textDecoration: 'none', lineHeight: 1.5 }}>
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 15, color: C.sub, lineHeight: 1.9,
              borderLeft: `3px solid ${C.green}`,
              padding: '16px 20px',
              background: C.tealDimmer,
              borderRadius: '0 8px 8px 0',
              margin: '0 0 28px',
            }}>
              {post.excerpt}
            </div>

            <div className="article-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

            {/* Bottom CTA — Desktop */}
            <div className="art-cta-desktop" style={{
              borderTop: `1px solid ${C.border}`,
              marginTop: 48, paddingTop: 28,
              display: 'flex', gap: 10, flexWrap: 'wrap',
            }}>
              <Link href={`/${locale}/contact`} className="btn-richb-primary"
                style={{ padding: '11px 22px', fontSize: 13, fontFamily: 'inherit' }}>
                {isJa ? '無料相談はこちら' : isKo ? '무료 상담 신청' : 'Free Consultation'}
              </Link>
              <Link href={`/${locale}/requirements`} className="btn-richb-sub"
                style={{ padding: '11px 22px', fontSize: 13, fontFamily: 'inherit' }}>
                {isJa ? '必要書類を確認する' : isKo ? '필요 서류 확인' : 'Check Requirements'}
              </Link>
            </div>

            {/* Bottom CTA — Mobile gradient block */}
            <div className="art-cta-mobile" style={{
              display: 'none',
              margin: '32px 0 16px',
              padding: 18,
              background: `linear-gradient(135deg, ${C.green} 0%, ${C.greenLt} 100%)`,
              borderRadius: 12,
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: 9, fontWeight: 700,
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                marginBottom: 6,
              }}>
                CONSULTATION
              </p>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 12, lineHeight: 1.4 }}>
                {isJa ? 'DTVビザの申請を相談する' : isKo ? 'DTV 비자 신청 상담하기' : 'Consult About Your DTV Visa'}
              </p>
              <a href={`/${locale}/contact`} style={{
                display: 'block', background: 'white', color: C.green,
                fontSize: 12, fontWeight: 800, padding: 10,
                borderRadius: 8, marginBottom: 8, textDecoration: 'none',
              }}>
                {isJa ? '無料相談はこちら' : isKo ? '무료 상담 신청' : 'Free Consultation'}
              </a>
              <a href={`/${locale}/requirements`} style={{
                display: 'block', background: 'rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.9)',
                fontSize: 11, fontWeight: 600, padding: 9,
                borderRadius: 8, textDecoration: 'none',
              }}>
                {isJa ? '必要書類を確認する' : isKo ? '필요 서류 확인' : 'Check Requirements'}
              </a>
            </div>

            <div style={{ marginTop: 24 }}>
              <Link href={`/${locale}/blog`} style={{ fontSize: 12, color: C.muted, textDecoration: 'none' }}>
                ← {isJa ? 'ブログ一覧へ戻る' : isKo ? '블로그 목록으로 돌아가기' : 'Back to Blog'}
              </Link>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="article-sidebar">
            <div style={{ position: 'sticky', top: 72 }}>

              {/* TOC card */}
              {toc.length > 0 && (
                <div style={{
                  background: C.bgCard,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12, padding: 20,
                  marginBottom: 16,
                  boxShadow: '0 2px 12px rgba(26,36,53,0.08)',
                }}>
                  <p style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: C.muted, margin: '0 0 12px',
                  }}>
                    {isJa ? '目次' : isKo ? '목차' : 'Contents'}
                  </p>
                  <nav>
                    {toc.map((item, i) => (
                      <a
                        key={i}
                        href={`#${item.id}`}
                        className={`sidebar-toc-link${item.level === 3 ? ' sub' : ''}`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* CTA card */}
              <div style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 12, padding: 20,
                boxShadow: '0 2px 12px rgba(26,36,53,0.08)',
              }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.text, margin: '0 0 6px' }}>
                  {isJa ? '相談・確認' : isKo ? '상담·확인' : 'Get Help'}
                </p>
                <p style={{ fontSize: 11, color: C.sub, lineHeight: 1.7, margin: '0 0 14px' }}>
                  {isJa
                    ? 'DTVの取得ルートについて専門家に相談できます。'
                    : isKo
                    ? 'DTV 비자 취득 경로에 대해 전문가와 상담할 수 있습니다.'
                    : 'Consult an expert about your DTV visa route.'}
                </p>
                <Link
                  href={`/${locale}/contact`}
                  className="btn-richb-primary"
                  style={{
                    display: 'flex', padding: '10px', fontSize: 12, fontWeight: 700,
                    textAlign: 'center', fontFamily: 'inherit', marginBottom: 8,
                    justifyContent: 'center',
                  }}
                >
                  {isJa ? '無料相談はこちら' : isKo ? '무료 상담 신청' : 'Free Consultation'}
                </Link>
                <Link
                  href={`/${locale}/who-should-choose-golf-dtv`}
                  className="btn-richb-sub"
                  style={{
                    display: 'flex', padding: '9px', fontSize: 12,
                    textAlign: 'center', fontFamily: 'inherit',
                    justifyContent: 'center',
                  }}
                >
                  {isJa ? '自分に向いているか確認' : isKo ? '나에게 적합한지 확인' : 'Check Suitability'}
                </Link>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
