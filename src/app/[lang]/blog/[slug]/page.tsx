import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import { getBlogPost, getBlogPostSlugs, extractToc } from '@/lib/blog'
import type { Lang } from '@/types/blog'

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []
  for (const lang of ['ja', 'en'] as Lang[]) {
    const slugs = getBlogPostSlugs(lang)
    slugs.forEach(slug => params.push({ lang, slug }))
  }
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'ja') as Lang
  const post = await getBlogPost(slug, locale)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.primary_keyword, ...post.secondary_keywords].join(', '),
  }
}

const C = {
  bg: '#F8F7F3',
  bgSub: '#EDEAE3',
  text: '#172019',
  sub: '#5C665E',
  muted: '#9EA89E',
  border: '#DDD9CE',
  green: '#0F6A43',
  gold: '#C9A24A',
}

const categoryLabel: Record<string, string> = {
  comparison: '比較記事',
  basic: '基本ガイド',
  process: '申請実務',
  documents: '必要書類',
  'soft-power': 'ソフトパワー',
  freelance: 'フリーランス',
  locations: '地域ガイド',
  'life-in-thailand': 'タイ生活',
}

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'ja') as Lang
  const post = await getBlogPost(slug, locale)
  if (!post) notFound()

  const toc = extractToc(post.content)
  const isJa = locale === 'ja'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.published_at,
        dateModified: post.updated_at,
        author: { '@type': 'Organization', name: 'DTV Club編集部' },
        publisher: { '@type': 'Organization', name: 'DTV Club', url: 'https://dtvclub.com' },
        inLanguage: post.lang,
        keywords: [post.primary_keyword, ...post.secondary_keywords].join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isJa ? 'ホーム' : 'Home', item: `https://dtvclub.com/${locale}` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `https://dtvclub.com/${locale}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `https://dtvclub.com/${locale}/blog/${slug}` },
        ],
      },
    ],
  }

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', paddingTop: 64 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <style>{`
        @media (max-width: 860px) {
          .article-grid { grid-template-columns: 1fr !important; }
          .article-sidebar { display: none !important; }
        }
        .article-body h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: ${C.text};
          margin-top: 3rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid ${C.border};
          line-height: 1.35;
        }
        .article-body h3 {
          font-size: 1.05rem;
          font-weight: 700;
          color: ${C.text};
          margin-top: 2rem;
          margin-bottom: 0.625rem;
        }
        .article-body p {
          color: ${C.sub};
          font-size: 1rem;
          line-height: 1.88;
          margin-bottom: 1.5rem;
        }
        .article-body strong { color: ${C.text}; font-weight: 700; }
        .article-body ul, .article-body ol {
          margin: 1.25rem 0 1.5rem;
          padding-left: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .article-body ul { list-style-type: disc; }
        .article-body ol { list-style-type: decimal; }
        .article-body li { color: ${C.sub}; font-size: 1rem; line-height: 1.75; }
        .article-body a { color: ${C.green}; text-decoration: underline; text-underline-offset: 3px; }
        .article-body a:hover { opacity: 0.75; }
        .article-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0 2rem;
          font-size: 0.875rem;
        }
        .article-body th {
          background: ${C.bgSub};
          color: ${C.text};
          font-weight: 700;
          padding: 0.625rem 0.875rem;
          text-align: left;
          border: 1px solid ${C.border};
        }
        .article-body td {
          color: ${C.sub};
          padding: 0.625rem 0.875rem;
          border: 1px solid ${C.border};
          vertical-align: top;
        }
        .article-body tr:nth-child(even) td { background: ${C.bgSub}; }
        .article-body hr {
          border: none;
          border-top: 1px solid ${C.border};
          margin: 2.5rem 0;
        }
        .article-body blockquote {
          border-left: 3px solid ${C.gold};
          padding: 0.75rem 1.25rem;
          margin: 1.5rem 0;
          background: ${C.bgSub};
        }
        .article-body blockquote p { color: ${C.sub}; margin: 0; }
      `}</style>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>

        {/* Breadcrumb */}
        <div style={{ padding: '16px 0', borderBottom: `1px solid ${C.border}`, fontSize: 12, color: C.muted }}>
          <Link href={`/${locale}`} style={{ color: C.muted, textDecoration: 'none' }}>{isJa ? 'ホーム' : 'Home'}</Link>
          {' › '}
          <Link href={`/${locale}/blog`} style={{ color: C.muted, textDecoration: 'none' }}>{isJa ? 'ブログ' : 'Blog'}</Link>
          {' › '}
          <span style={{ color: C.sub }}>{post.title}</span>
        </div>

        {/* Article + Sidebar grid */}
        <div
          className="article-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 264px', gap: 60, paddingTop: 44 }}
        >
          {/* ── Article ── */}
          <article>
            {/* Category */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ background: C.green, width: 4, height: 18 }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: C.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                {categoryLabel[post.primary_category] ?? post.primary_category}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 34, fontWeight: 700,
              lineHeight: 1.25, color: C.text,
              margin: '0 0 16px', letterSpacing: '-0.01em',
            }}>
              {post.title}
            </h1>

            {/* Meta */}
            <p style={{
              fontSize: 12, color: C.muted,
              margin: '0 0 32px',
              borderBottom: `1px solid ${C.border}`,
              paddingBottom: 16,
            }}>
              DTV Club編集部 · {post.published_at}
              {post.updated_at !== post.published_at && ` · 更新 ${post.updated_at}`}
              · {isJa ? `読了約${post.read_time_minutes}分` : `${post.read_time_minutes} min read`}
            </p>

            {/* Lead paragraph (excerpt) */}
            <p style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 17, color: C.sub, lineHeight: 1.85,
              borderLeft: `4px solid ${C.gold}`,
              paddingLeft: 20,
              margin: '0 0 32px',
            }}>
              {post.excerpt}
            </p>

            {/* Article body */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Bottom CTA */}
            <div style={{
              borderTop: `1px solid ${C.border}`,
              marginTop: 48, paddingTop: 36,
              display: 'flex', gap: 12, flexWrap: 'wrap',
            }}>
              <Link
                href={`/${locale}/golf-dtv#inquiry`}
                style={{
                  background: C.green, color: '#fff',
                  padding: '12px 24px', fontSize: 14, fontWeight: 800,
                  textDecoration: 'none', display: 'inline-block',
                }}
              >
                {isJa ? '無料相談はこちら' : 'Free Consultation'}
              </Link>
              <Link
                href={`/${locale}/requirements`}
                style={{
                  background: 'transparent', color: C.text,
                  border: `1px solid ${C.border}`, padding: '12px 24px',
                  fontSize: 14, textDecoration: 'none', display: 'inline-block',
                }}
              >
                {isJa ? '必要書類を確認する' : 'Check Requirements'}
              </Link>
            </div>

            {/* Back link */}
            <div style={{ marginTop: 32 }}>
              <Link
                href={`/${locale}/blog`}
                style={{ fontSize: 13, color: C.muted, textDecoration: 'none' }}
              >
                ← {isJa ? 'ブログ一覧へ戻る' : 'Back to Blog'}
              </Link>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="article-sidebar">
            <div style={{ position: 'sticky', top: 80 }}>

              {/* TOC */}
              {toc.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, margin: '0 0 14px' }}>
                    {isJa ? '目次' : 'Contents'}
                  </p>
                  <nav style={{ borderLeft: `2px solid ${C.border}`, paddingLeft: 16 }}>
                    {toc.map((item, i) => (
                      <a
                        key={i}
                        href={`#${item.id}`}
                        style={{
                          display: 'block',
                          fontSize: item.level === 2 ? 13 : 12,
                          color: C.sub,
                          textDecoration: 'none',
                          padding: '4px 0',
                          paddingLeft: item.level === 3 ? 12 : 0,
                          lineHeight: 1.45,
                        }}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Sidebar CTA */}
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 24 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: C.text, margin: '0 0 8px' }}>
                  {isJa ? '相談・確認' : 'Get Help'}
                </p>
                <p style={{ fontSize: 12, color: C.sub, lineHeight: 1.65, margin: '0 0 16px' }}>
                  {isJa
                    ? 'DTVの取得ルートについて専門家に相談できます。'
                    : 'Consult an expert about your DTV visa route.'}
                </p>
                <Link
                  href={`/${locale}/golf-dtv#inquiry`}
                  style={{
                    display: 'block', width: '100%', background: C.green, color: '#fff',
                    border: 'none', padding: '10px 0', fontSize: 13, fontWeight: 700,
                    textDecoration: 'none', textAlign: 'center', marginBottom: 8,
                    boxSizing: 'border-box',
                  }}
                >
                  {isJa ? '無料相談はこちら' : 'Free Consultation'}
                </Link>
                <Link
                  href={`/${locale}/who-should-choose-golf-dtv`}
                  style={{
                    display: 'block', width: '100%', background: 'transparent',
                    color: C.text, border: `1px solid ${C.border}`,
                    padding: '10px 0', fontSize: 13,
                    textDecoration: 'none', textAlign: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  {isJa ? '自分に向いているか確認' : 'Check Suitability'}
                </Link>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
