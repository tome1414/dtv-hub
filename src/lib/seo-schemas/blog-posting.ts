/**
 * DTV Club - JSON-LD スキーマ生成ユーティリティ
 * ブログ記事・HowTo・FAQ 用の構造化データを生成します
 */

const BASE_URL = 'https://dtvclub.com'

// ── 型定義 ──────────────────────────────────────────────

export interface BlogPostSchema {
  title: string
  description: string
  slug: string
  locale: string
  publishedAt: string
  updatedAt: string
  coverImage?: string
  author?: string
}

export interface HowToStep {
  name: string
  text: string
  image?: string
}

export interface FAQItem {
  question: string
  answer: string
}

// ── BlogPosting スキーマ ──────────────────────────────────

/**
 * 標準的なブログ記事の JSON-LD を生成
 *
 * 使用例：
 * <script
 *   type="application/ld+json"
 *   dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogPostingSchema(post)) }}
 * />
 */
export function generateBlogPostingSchema(post: BlogPostSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `${BASE_URL}/${post.locale}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.coverImage
      ? `${BASE_URL}${post.coverImage}`
      : `${BASE_URL}/images/og-default.jpg`,
    author: {
      '@type': 'Organization',
      name: 'DTV Club',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DTV Club',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    inLanguage: post.locale === 'ja' ? 'ja-JP' : 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/${post.locale}/blog/${post.slug}`,
    },
  }
}

// ── HowTo スキーマ（申請手順記事用） ────────────────────────

/**
 * DTV申請ステップのような手順記事に使用
 *
 * 使用例（申請ガイド記事）：
 * const howToSteps = [
 *   { name: 'Thai e-Visaにアクセス', text: 'thaievisa.go.thにアクセスしてアカウントを作成します。' },
 *   { name: '申請書を記入', text: 'DTV申請フォームに氏名・パスポート番号などを入力します。' },
 *   ...
 * ]
 * generateHowToSchema('DTV ビザ申請方法', howToSteps)
 */
export function generateHowToSchema(
  name: string,
  steps: HowToStep[],
  description?: string,
  totalTime?: string // ISO 8601形式 例: "PT30M" = 30分
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description: description ?? `${name}のステップバイステップガイド`,
    ...(totalTime && { totalTime }),
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: {
          '@type': 'ImageObject',
          url: `${BASE_URL}${step.image}`,
        },
      }),
    })),
  }
}

// ── FAQ スキーマ ──────────────────────────────────────────

/**
 * よくある質問セクションに使用
 * Google 検索結果にFAQ形式で表示される可能性あり
 *
 * 使用例：
 * const faqs = [
 *   { question: 'DTV ビザの有効期限は？', answer: '5年間有効なマルチプルビザです。' },
 *   { question: '50万バーツは日本の口座でもOK？', answer: '...' },
 * ]
 * generateFAQSchema(faqs)
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ── BreadcrumbList スキーマ ───────────────────────────────

/**
 * パンくずリスト用スキーマ
 *
 * 使用例：
 * generateBreadcrumbSchema([
 *   { name: 'ホーム', url: '/' },
 *   { name: 'ブログ', url: '/ja/blog' },
 *   { name: 'DTV ビザとは', url: '/ja/blog/dtv-visa-complete-guide' },
 * ])
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`,
    })),
  }
}

// ── 複合スキーマ（ブログ記事 + HowTo または FAQ） ──────────

/**
 * BlogPosting + HowTo を組み合わせた複合スキーマ
 * 申請ガイド記事に使用
 */
export function generateBlogWithHowToSchema(
  post: BlogPostSchema,
  steps: HowToStep[]
) {
  const blogSchema = generateBlogPostingSchema(post)
  const howToSchema = generateHowToSchema(
    `${post.title} - 手順`,
    steps
  )

  return {
    ...blogSchema,
    mainEntity: howToSchema,
  }
}

/**
 * BlogPosting + FAQ を組み合わせた複合スキーマ
 * Q&A・よくある質問記事に使用
 */
export function generateBlogWithFAQSchema(
  post: BlogPostSchema,
  faqs: FAQItem[]
) {
  const blogSchema = generateBlogPostingSchema(post)
  const faqSchema = generateFAQSchema(faqs)

  return [blogSchema, faqSchema]
}
