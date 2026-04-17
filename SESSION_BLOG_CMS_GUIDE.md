# 📝 セッション4：ブログ CMS 実装ガイド

## セッション概要

このセッションでは、SEO・コンテンツ戦略に基づいて、ブログ CMS と自動投稿機能を実装します。

前提条件：セッション3 で以下が完了している
- ✅ キーワード優先度付け
- ✅ コンテンツカレンダー（1ヶ月）
- ✅ 記事テンプレート・ガイドライン
- ✅ SEO メタタグ戦略

---

## セッション目標

### 成果物
- ブログ記事データベース構造
- ブログ記事管理 UI
- 記事詳細ページ（SEO最適化）
- カテゴリー・フィルター機能
- 検索機能
- 関連記事表示
- 自動投稿スケジュール機能
- SEO メタタグ自動生成
- 多言語対応
- サンプル記事の実装

---

## ブログデータベース構造

### BlogPost インターフェース定義

```typescript
export interface BlogPost {
  // 基本情報
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  
  // メタデータ
  author: string
  category: string
  tags: string[]
  language: Locale
  
  // 日付
  publishedAt: Date
  updatedAt?: Date
  
  // SEO
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  ogImage?: string
  
  // ステータス
  status: 'draft' | 'published'
  featured: boolean
}
```

---

## ファイル構造

```
src/app/[lang]/blog/
├── page.tsx
├── [slug]/
│   └── page.tsx
└── category/[category]/
    └── page.tsx

src/components/blog/
├── BlogList.tsx
├── BlogCard.tsx
├── BlogSearch.tsx
├── CategoryFilter.tsx
├── RelatedArticles.tsx
└── TableOfContents.tsx

src/lib/blog-service/
├── index.ts
├── db.ts
└── seo-generator.ts

src/content/blog/
└── [記事ファイル]
```

---

## 実装チェックリスト

### Phase 1：DB・型定義
- BlogPost インターフェース定義
- カテゴリー定義
- タグ定義

### Phase 2：Service Layer
- getBlogPosts() 実装
- getBlogBySlug() 実装
- getCategories() 実装
- searchBlog() 実装

### Phase 3：コンポーネント開発
- BlogCard 実装
- BlogList 実装
- BlogSearch 実装
- CategoryFilter 実装

### Phase 4：ページ実装
- /blog/page.tsx
- /blog/[slug]/page.tsx
- /blog/category/[category]/page.tsx

### Phase 5：SEO 最適化
- メタタグ自動生成
- JSON-LD スキーマ自動生成
- OG 画像生成

### Phase 6：自動投稿機能
- スケジュール投稿ロジック
- 公開日管理

### Phase 7：テスト・最適化
- サンプル記事作成（3-5本）
- 全5言語で表示確認
- SEO メタタグ確認

---

## 推奨スケジュール

- Phase 1-2: 3-4時間
- Phase 3-4: 4-5時間
- Phase 5-6: 2-3時間
- Phase 7: 2-3時間
- 合計: 11-16時間

---

## セッション終了時の提出物

1. 完全に動作するブログ CMS
2. サンプル記事（3-5本）
3. SEO メタタグ・スキーマの実装確認
4. 多言語対応確認
5. GitHub コミット

Last Updated: 2026-04-17
