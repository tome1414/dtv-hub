# 🔍 SEO メタタグ・スキーマ テンプレート

---

## ── メタタグ テンプレート（TypeScript / Next.js） ──

### ブログ記事ページ用

```typescript
// src/app/[locale]/blog/[slug]/page.tsx

import { Metadata } from 'next'

interface Props {
  params: { slug: string; locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, params.locale)
  const baseUrl = 'https://dtvclub.com'

  return {
    title: post.title,  // 60文字以内
    description: post.description,  // 120〜160文字

    openGraph: {
      title: post.title,
      description: post.description,
      url: `${baseUrl}/${params.locale}/blog/${params.slug}`,
      siteName: 'DTV Club',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ['DTV Club 編集部'],
      images: [
        {
          url: `${baseUrl}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${baseUrl}${post.coverImage}`],
    },

    alternates: {
      canonical: `${baseUrl}/${params.locale}/blog/${params.slug}`,
      languages: {
        'ja': `${baseUrl}/ja/blog/${params.slug}`,
        'en': `${baseUrl}/en/blog/${params.slug}`,
      },
    },

    robots: {
      index: true,
      follow: true,
    },
  }
}
```

---

## ── 記事別メタタグ 記入例 ──

### 記事1：DTV ビザとは？完全ガイド
```
title: "DTV ビザとは？【2026年最新版】デジタルノマドの完全ガイド"
（56文字）

description: "DTV（Destination Thailand Visa）は、デジタルノマドやリモートワーカー向けの
タイ長期滞在ビザです。申請条件・費用・手順を2026年最新情報で徹底解説。"
（94文字）
```

### 記事2：DTV 申請の全ステップ
```
title: "DTV ビザ申請の全ステップ【2026年・e-visa完全対応】手順と注意点"
（57文字）

description: "Thai e-visaシステムを使ったDTVビザ申請を図解で解説。必要書類・
審査期間・よくある失敗まで、申請前に知っておくべきことをまとめました。"
（89文字）
```

### 記事3：DTV 必要書類チェックリスト
```
title: "DTV ビザ必要書類 完全チェックリスト【2026年版・これだけ準備】"
（54文字）

description: "DTV申請に必要な書類を全カテゴリで整理。パスポート・残高証明・
在職証明など、漏れなく準備するためのチェックリストを提供します。"
（80文字）
```

### 記事4：50万バーツ証明
```
title: "DTV「50万バーツ証明」完全解説【日本の口座でもOK？】"
（47文字）

description: "DTVビザ申請で最大のハードル「50万バーツ残高証明」を徹底解説。
日本の銀行でも使える？3ヶ月保有は必要？よくある疑問を全て解消。"
（79文字）
```

### 記事5：バンコク生活費レポート
```
title: "バンコク生活費リアルレポート【2026年・DTVノマド版】月20万円の実態"
（60文字）

description: "DTV保有のリモートワーカーがバンコクで実際にかかる生活費を公開。
家賃・食費・交通費・通信費など項目別の実数値と節約術を紹介。"
（77文字）
```

---

## ── hreflang タグ（言語切り替え） ──

```html
<!-- 日本語ページ -->
<link rel="alternate" hreflang="ja" href="https://dtvclub.com/ja/blog/[slug]" />
<link rel="alternate" hreflang="en" href="https://dtvclub.com/en/blog/[slug]" />
<link rel="alternate" hreflang="x-default" href="https://dtvclub.com/ja/blog/[slug]" />
```

---

## ── ブログ一覧ページ メタタグ ──

```typescript
// src/app/[locale]/blog/page.tsx
export const metadata: Metadata = {
  title: 'DTV Club ブログ | DTVビザ・タイ長期滞在の最新情報',
  description: 'DTVビザ申請・タイ生活・バンコク情報など、デジタルノマドに役立つ情報を発信。2026年最新の申請ガイドや生活情報を掲載中。',
  openGraph: {
    title: 'DTV Club ブログ',
    description: 'DTVビザとタイ長期滞在の最新情報',
    type: 'website',
    url: 'https://dtvclub.com/ja/blog',
  },
}
```

---

*Last Updated: 2026-04-24*
