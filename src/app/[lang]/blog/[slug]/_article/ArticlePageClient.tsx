'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/types/blog'
import type { TocItem } from '@/lib/blog'

const LIGHT = {
  bg: '#F8F7F3', bgSub: '#EDEAE3',
  text: '#172019', sub: '#5C665E', muted: '#9EA89E',
  border: '#DDD9CE', green: '#0F6A43', gold: '#C9A24A',
}
const DARK = {
  bg: '#0d1427', bgSub: '#0F1A2E',
  text: '#DCE8F5', sub: '#5C7A9A', muted: '#253D57',
  border: '#142238', green: '#0A6B3C', gold: '#C89A20',
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
  const C = dark ? DARK : LIGHT
  const isJa = locale === 'ja'

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', paddingTop: 64, transition: 'background 0.2s, color 0.2s' }}>

      <style>{`
        @media (max-width: 860px) {
          .article-grid { grid-template-columns: 1fr !important; }
          .article-sidebar { display: none !important; }
        }
        .article-body h2 {
          font-size: 1.375rem; font-weight: 700; color: ${C.text};
          margin-top: 3rem; margin-bottom: 1rem;
          padding-bottom: 0.5rem; border-bottom: 2px solid ${C.border};
          line-height: 1.35;
        }
        .article-body h3 {
          font-size: 1.0625rem; font-weight: 700; color: ${C.text};
          margin-top: 2rem; margin-bottom: 0.625rem;
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
        .article-body table { width: 100%; border-collapse: collapse; margin: 1.5rem 0 2rem; font-size: 0.875rem; }
        .article-body th { background: ${C.bgSub}; color: ${C.text}; font-weight: 700; padding: 0.625rem 0.875rem; text-align: left; border: 1px solid ${C.border}; }
        .article-body td { color: ${C.sub}; padding: 0.625rem 0.875rem; border: 1px solid ${C.border}; vertical-align: top; }
        .article-body tr:nth-child(even) td { background: ${C.bgSub}; }
        .article-body hr { border: none; border-top: 1px solid ${C.border}; margin: 2.5rem 0; }
        .article-body blockquote {
          border-left: 3px solid ${C.gold}; padding: 0.75rem 1.25rem;
          margin: 1.5rem 0; background: ${C.bgSub};
        }
        .article-body blockquote p { color: ${C.sub}; margin: 0; }
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

        {/* Breadcrumb */}
        <div style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12, color: C.muted }}>
          <Link href={`/${locale}`} style={{ color: C.muted, textDecoration: 'none' }}>{isJa ? 'ホーム' : locale === 'ko' ? '홈' : 'Home'}</Link>
          {' › '}
          <Link href={`/${locale}/blog`} style={{ color: C.muted, textDecoration: 'none' }}>{isJa ? 'ブログ' : locale === 'ko' ? '블로그' : 'Blog'}</Link>
          {' › '}
          <span style={{ color: C.sub }}>{post.title}</span>
        </div>

        {/* Article + Sidebar grid */}
        <div className="article-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 264px', gap: 60, paddingTop: 44 }}>

          {/* ── Article ── */}
          <article>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ background: C.green, width: 4, height: 18 }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: C.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                {(isJa ? categoryLabelJa : locale === 'ko' ? categoryLabelKo : categoryLabelEn)[post.primary_category] ?? post.primary_category}
              </span>
            </div>

            <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 34, fontWeight: 700, lineHeight: 1.25, color: C.text, margin: '0 0 16px', letterSpacing: '-0.01em' }}>
              {post.title}
            </h1>

            <p style={{ fontSize: 12, color: C.muted, margin: '0 0 32px', borderBottom: `1px solid ${C.border}`, paddingBottom: 16 }}>
              {isJa ? 'DTV Club編集部' : locale === 'ko' ? 'DTV Club 편집부' : 'DTV Club Editorial'} · {post.published_at}
              {post.updated_at !== post.published_at && ` · ${isJa ? '更新' : locale === 'ko' ? '업데이트' : 'Updated'} ${post.updated_at}`}
              · {isJa ? `読了約${post.read_time_minutes}分` : locale === 'ko' ? `약 ${post.read_time_minutes}분` : `${post.read_time_minutes} min read`}
            </p>

            <p style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 17, color: C.sub, lineHeight: 1.85, borderLeft: `4px solid ${C.gold}`, paddingLeft: 20, margin: '0 0 32px' }}>
              {post.excerpt}
            </p>

            <div className="article-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

            <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 48, paddingTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href={`/${locale}/golf-dtv#inquiry`} style={{ background: C.green, color: '#fff', padding: '12px 24px', fontSize: 14, fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
                {isJa ? '無料相談はこちら' : locale === 'ko' ? '무료 상담 신청' : 'Free Consultation'}
              </Link>
              <Link href={`/${locale}/requirements`} style={{ background: 'transparent', color: C.text, border: `1px solid ${C.border}`, padding: '12px 24px', fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>
                {isJa ? '必要書類を確認する' : locale === 'ko' ? '필요 서류 확인' : 'Check Requirements'}
              </Link>
            </div>

            <div style={{ marginTop: 32 }}>
              <Link href={`/${locale}/blog`} style={{ fontSize: 13, color: C.muted, textDecoration: 'none' }}>
                ← {isJa ? 'ブログ一覧へ戻る' : locale === 'ko' ? '블로그 목록으로 돌아가기' : 'Back to Blog'}
              </Link>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="article-sidebar">
            <div style={{ position: 'sticky', top: 80 }}>
              {toc.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, margin: '0 0 14px' }}>
                    {isJa ? '目次' : locale === 'ko' ? '목차' : 'Contents'}
                  </p>
                  <nav style={{ borderLeft: `2px solid ${C.border}`, paddingLeft: 16 }}>
                    {toc.map((item, i) => (
                      <a key={i} href={`#${item.id}`} style={{ display: 'block', fontSize: item.level === 2 ? 13 : 12, color: C.sub, textDecoration: 'none', padding: '4px 0', paddingLeft: item.level === 3 ? 12 : 0, lineHeight: 1.45 }}>
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.text, margin: '0 0 8px' }}>
                  {isJa ? '相談・確認' : locale === 'ko' ? '상담·확인' : 'Get Help'}
                </p>
                <p style={{ fontSize: 12, color: C.sub, lineHeight: 1.65, margin: '0 0 16px' }}>
                  {isJa ? 'DTVの取得ルートについて専門家に相談できます。' : locale === 'ko' ? 'DTV 비자 취득 경로에 대해 전문가와 상담할 수 있습니다.' : 'Consult an expert about your DTV visa route.'}
                </p>
                <Link href={`/${locale}/golf-dtv#inquiry`} style={{ display: 'block', background: C.green, color: '#fff', padding: '10px 0', fontSize: 13, fontWeight: 700, textDecoration: 'none', textAlign: 'center', marginBottom: 8, boxSizing: 'border-box' }}>
                  {isJa ? '無料相談はこちら' : locale === 'ko' ? '무료 상담 신청' : 'Free Consultation'}
                </Link>
                <Link href={`/${locale}/who-should-choose-golf-dtv`} style={{ display: 'block', background: 'transparent', color: C.text, border: `1px solid ${C.border}`, padding: '10px 0', fontSize: 13, textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box' }}>
                  {isJa ? '自分に向いているか確認' : locale === 'ko' ? '나에게 적합한지 확인' : 'Check Suitability'}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
