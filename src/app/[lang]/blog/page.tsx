import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getAllBlogPostsMeta } from '@/lib/blog'
import type { Lang } from '@/types/blog'

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const isJa = lang === 'ja'
  const isKo = lang === 'ko'
  return {
    title: isJa ? 'DTV・タイビザ 記事一覧 | DTV Club' : isKo ? 'DTV·태국 비자 기사 목록 | DTV Club' : 'DTV & Thailand Visa Articles | DTV Club',
    description: isJa
      ? 'DTVビザ・タイ長期滞在に関する記事一覧。比較ガイド、必要書類、申請実務など。'
      : 'Browse all articles on the DTV visa and long-stay options in Thailand.',
    alternates: {
      canonical: `https://dtvclub.com/${lang}/blog`,
    },
  }
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

export default async function BlogListPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'ja') as Lang
  const posts = getAllBlogPostsMeta(locale)
  const catLabels = locale === 'ja' ? categoryLabelJa : locale === 'ko' ? categoryLabelKo : categoryLabelEn
  const isJa = locale === 'ja'
  const isKo = locale === 'ko'

  return (
    <div style={{ minHeight: '100vh', background: '#F5F8FA', color: '#1A2435', paddingTop: 64, paddingBottom: 80 }}>

      <style>{`
        .blog-card:hover { border-color: rgba(10,122,106,0.25) !important; box-shadow: 0 4px 20px rgba(26,36,53,0.10) !important; transform: translateY(-1px); }
        .blog-card { transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s; }
        .blog-card-title { transition: color 0.15s; }
        .blog-card:hover .blog-card-title { color: #0A7A6A !important; }
      `}</style>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 2rem' }}>

        {/* Header */}
        <div style={{ padding: '40px 0 32px', borderBottom: '1px solid rgba(26,36,53,0.10)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(10,122,106,0.10)', border: '1px solid rgba(10,122,106,0.2)', borderRadius: 100, padding: '3px 12px', marginBottom: 16 }}>
            <div style={{ width: 5, height: 5, background: '#0A7A6A', borderRadius: '50%' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0A7A6A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {isJa ? 'ブログ・記事' : isKo ? '블로그' : 'Articles'}
            </span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 30, fontWeight: 700, color: '#1A2435', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
            {isJa ? 'DTV Club ブログ' : isKo ? 'DTV Club 블로그' : 'DTV Club Blog'}
          </h1>
          <p style={{ fontSize: 14, color: '#4A5A6E', lineHeight: 1.7, margin: 0 }}>
            {isJa
              ? 'タイ長期滞在ビザ（DTV）の比較・申請・生活情報を一次情報に基づき解説します。'
              : isKo
              ? '태국 장기 체류 비자(DTV)의 비교·신청·생활 정보를 일차 정보에 근거하여 해설합니다.'
              : 'Neutral guides on Thailand long-stay visas, DTV applications, and life in Thailand.'}
          </p>
        </div>

        {/* Articles */}
        <div style={{ paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts.length === 0 ? (
            <div style={{ background: '#FFFFFF', border: '1px solid rgba(26,36,53,0.10)', borderRadius: 12, padding: 32, textAlign: 'center', color: '#7E8EA4', fontSize: 14 }}>
              {isJa ? '記事を準備中です。しばらくお待ちください。' : isKo ? '기사를 준비 중입니다. 잠시 기다려 주세요.' : 'Articles coming soon.'}
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="blog-card"
                style={{
                  display: 'block', textDecoration: 'none',
                  background: '#FFFFFF',
                  border: '1px solid rgba(26,36,53,0.10)',
                  borderRadius: 12, padding: '20px 24px',
                  boxShadow: '0 1px 4px rgba(26,36,53,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Category pill */}
                    <div style={{ marginBottom: 10 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        background: 'rgba(10,122,106,0.10)',
                        border: '1px solid rgba(10,122,106,0.2)',
                        borderRadius: 100, padding: '2px 9px 2px 6px',
                        fontSize: 10, fontWeight: 700, color: '#0A7A6A',
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                      }}>
                        <span style={{ width: 4, height: 4, background: '#0A7A6A', borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />
                        {catLabels[post.primary_category] ?? post.primary_category}
                      </span>
                    </div>
                    <h2 className="blog-card-title" style={{ fontSize: 16, fontWeight: 700, color: '#1A2435', margin: '0 0 8px', lineHeight: 1.45 }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: 13, color: '#4A5A6E', lineHeight: 1.65, margin: '0 0 14px' }} className="line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 11, color: '#7E8EA4' }}>
                      <span>{post.published_at}</span>
                      <span>·</span>
                      <span>
                        {isJa ? `約${post.read_time_minutes}分` : isKo ? `약 ${post.read_time_minutes}분` : `${post.read_time_minutes} min read`}
                      </span>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7E8EA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}>
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    </div>
  )
}
