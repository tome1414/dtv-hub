# 📋 DTV Club JSON-LD スキーマ仕様書

---

## 概要

DTV Club ブログでは、検索エンジンに記事の構造を伝えるために
**JSON-LD（構造化データ）** を使用します。

実装ファイル：
- `src/lib/seo-schemas/blog-posting.ts` — スキーマ生成関数
- `src/lib/seo-schemas/examples.ts` — 記事別の使用例

---

## 使用するスキーマタイプ一覧

| スキーマ | 使用記事タイプ | 効果 |
|---------|-------------|------|
| `BlogPosting` | すべてのブログ記事 | 記事として認識される |
| `HowTo` | 申請手順記事 | ステップが検索結果に表示 |
| `FAQPage` | Q&A・よくある質問記事 | FAQ が検索結果に展開表示 |
| `BreadcrumbList` | すべてのページ | パンくずが検索結果に表示 |

---

## 記事別スキーマ対応表

| 記事 | BlogPosting | HowTo | FAQ | Breadcrumb |
|------|------------|-------|-----|------------|
| DTV ビザとは？ | ✅ | ❌ | ✅ | ✅ |
| DTV申請の全ステップ | ✅ | ✅ | ❌ | ✅ |
| 必要書類チェックリスト | ✅ | ❌ | ✅ | ✅ |
| 50万バーツ証明 | ✅ | ❌ | ✅ | ✅ |
| バンコク生活費 | ✅ | ❌ | ❌ | ✅ |

---

## ページへの実装方法

```tsx
// src/app/[locale]/blog/[slug]/page.tsx

import {
  generateBlogWithHowToSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo-schemas/blog-posting'

export default function BlogPostPage({ post }) {
  const blogSchema = generateBlogWithHowToSchema(post, post.steps)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'DTV Club', url: `/${post.locale}` },
    { name: 'ブログ', url: `/${post.locale}/blog` },
    { name: post.title, url: `/${post.locale}/blog/${post.slug}` },
  ])

  return (
    <>
      {/* JSON-LD スキーマ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 記事本文 */}
      <article>...</article>
    </>
  )
}
```

---

## BlogPosting スキーマ 出力例

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "DTV ビザとは？【2026年最新版】デジタルノマドの完全ガイド",
  "description": "DTV（Destination Thailand Visa）は、デジタルノマドやリモートワーカー向けのタイ長期滞在ビザです。",
  "url": "https://dtvclub.com/ja/blog/dtv-visa-complete-guide",
  "datePublished": "2026-04-27",
  "dateModified": "2026-04-27",
  "image": "https://dtvclub.com/images/blog/dtv-visa-complete-guide/cover.jpg",
  "author": {
    "@type": "Organization",
    "name": "DTV Club",
    "url": "https://dtvclub.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DTV Club",
    "url": "https://dtvclub.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dtvclub.com/images/logo.png"
    }
  },
  "inLanguage": "ja-JP"
}
```

---

## HowTo スキーマ 出力例（申請手順記事）

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "DTV ビザ申請の全ステップ【2026年・e-visa完全対応】 - 手順",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Thai e-Visa サイトにアクセス",
      "text": "thaievisa.go.th にアクセスし、アカウントを作成します。",
      "image": {
        "@type": "ImageObject",
        "url": "https://dtvclub.com/images/blog/dtv-visa-application-steps/step-01.jpg"
      }
    }
  ]
}
```

---

## FAQ スキーマ 出力例

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "DTV ビザの有効期限はどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DTV（Destination Thailand Visa）は5年間有効なマルチプルビザです。1回の入国で最長180日間タイに滞在でき、出国すれば滞在期間がリセットされ再び180日間滞在可能です。"
      }
    }
  ]
}
```

---

*Last Updated: 2026-04-24*
