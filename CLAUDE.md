# DTV Club - Claude Code プロジェクトガイド

## プロジェクト概要

- **サイト**: https://dtvclub.com
- **技術**: Next.js 15 App Router + Vercel（自動デプロイ）
- **対応言語**: 日本語（ja）/ 英語（en）/ 韓国語（ko）
- **リポジトリ**: https://github.com/tome1414/dtv-hub.git
- **デプロイフロー**: `git push origin master` → Vercel 自動デプロイ → 本番反映（約1〜2分）

---

## ファイル構成（主要）

```
src/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx              ← Header + Footer + MobileBottomNav を配置
│   │   ├── page.tsx                ← ホームページ（HomePageClient を呼ぶ）
│   │   ├── _home/
│   │   │   └── HomePageClient.tsx  ← ホームページ本体（'use client'）
│   │   ├── blog/
│   │   │   ├── page.tsx            ← ブログ一覧
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        ← 記事ページ（ArticlePageClient を呼ぶ）
│   │   │       └── _article/
│   │   │           └── ArticlePageClient.tsx ← 記事ページ本体
│   │   ├── dtv-soft-power-vs-freelance/page.tsx
│   │   ├── who-should-choose-golf-dtv/page.tsx
│   │   ├── soft-power/page.tsx
│   │   ├── dtv-application/page.tsx
│   │   ├── requirements/page.tsx   ← 独自ライトデザイン（inline styles）
│   │   ├── golf-dtv/               ← ダークプレミアムデザイン維持（変更禁止）
│   │   │   └── components/         ← Faq / Plans / Trust / Addon / Inquiry / Hero
│   │   ├── contact/page.tsx
│   │   └── ...
│   └── globals.css                 ← btn-richb-* CSS クラス + モバイル対応
├── components/
│   ├── Header.tsx                  ← フロストガラス・ライトデザイン
│   ├── Footer.tsx                  ← ダーク #142130 + teal ヘッダー
│   ├── MobileBottomNav.tsx         ← モバイル固定タブバー（lg:hidden）
│   └── analytics/
│       └── golf-dtv-cta.tsx        ← btn-richb-gold ボタン
└── content/
    ├── blog/ja/    日本語記事（33本）
    ├── blog/en/    英語記事
    └── blog/ko/    韓国語記事（13本）
```

---

## 現在のデザインシステム

### カラートークン（全ページ共通）

```
bg:      #F5F8FA   ページ背景
bgCard:  #FFFFFF   カード背景
bgSec:   #EDF1F5   セクション背景
text:    #1A2435   見出し・本文
sub:     #4A5A6E   サブテキスト
muted:   #7E8EA4   補足・日付
border:  rgba(26,36,53,0.10)
green:   #0A7A6A   teal（メインアクセント）
greenLt: #0D9280   teal 薄め
gold:    #C9A030   ゴールド（Golf DTV）
```

### ボタン CSS クラス（globals.css 定義済み）

| クラス | 用途 |
|---|---|
| `.btn-richb-primary` | teal グラデ Shadow Pop（主要CTA） |
| `.btn-richb-sub` | 白地・枠線（サブCTA） |
| `.btn-richb-gold` | ゴールドグラデ（Golf DTV CTA） |
| `.btn-richb-header` | ヘッダー用ゴールドシャドウ |

### ヘッダー（Header.tsx）

- フロストガラス: `rgba(245,248,250,0.92)` + `backdropFilter: blur(14px)`
- ロゴ: teal グラデ正方形バッジ + "DTV Club"（teal）
- デスクトップナブ: `className="hidden lg:flex"` ← **inline style に `display:'flex'` を入れない（バグ原因）**
- 言語切替: JA/EN/KO インラインピル
- CTA: "相談する" → `btn-richb-primary`
- モバイル: ハンバーガー → スライドダウンメニュー

### モバイルタブバー（MobileBottomNav.tsx）

- `className="lg:hidden"` で固定表示
- 5タブ: ホーム / ガイド / 書類 / Golf / 相談（SVGアイコン）
- `usePathname` でアクティブ検知
- 背景: フロストガラス + teal アクティブ丸

### フッター（Footer.tsx）

- 背景: `#142130`（ダーク）
- 列ヘッダー: teal `#0A7A6A`
- リンク: `rgba(255,255,255,0.42)`
- 4カラムグリッド: ブランド / ビザ情報 / タイ生活 / サービス

### ヒーロー（HomePageClient.tsx）

- Pattern B: 右58%カフェ画像（絶対配置） + 左コンテンツ
- モバイル: 画像を上段（220px）・コンテンツを下段に積み重ね
- グラデーション div に `className="top-hero-gradient"` → モバイルで非表示
- テーマトグル: `className="hidden lg:flex"` でデスクトップのみ表示

### 記事ページ（ArticlePageClient.tsx）

- スクロールプログレスバー（fixed top: 56px）
- カテゴリタグ: teal ドット付き丸ピル
- エクスプト: teal 左ボーダー + 薄teal背景
- サイドバー: 白カード + border + shadow
- TOC: `.sidebar-toc-link` ホバーで teal + 左ボーダー変色
- CTAデスクトップ: `btn-richb-primary` + `btn-richb-sub`
- CTAモバイル: teal グラデブロック（白ボタン）
- モバイルTOC: アコーディオン（番号付き）
- テーマトグル: `className="hidden lg:flex"` デスクトップのみ

---

## 注意事項：よくある落とし穴

### inline style と Tailwind の競合

`className="hidden lg:flex"` の要素に `style={{ display: 'flex' }}` を入れると、
inline style が `hidden` クラスを上書きしてモバイルでも表示されてしまう。

```tsx
// ❌ NG（モバイルで表示されてしまう）
<nav style={{ display: 'flex', gap: 2 }} className="hidden lg:flex">

// ✅ OK（display は inline style に入れない）
<nav style={{ gap: 2 }} className="hidden lg:flex">
```

### golf-dtv ページのデザイン

`src/app/[lang]/golf-dtv/` はプレミアムダークデザイン（ゴールド×ダーク緑）で**意図的に**
ライトデザインとは別系統。変更禁止。

### ⚠️ Golf DTV ランディングページの編集禁止（別セッションで管理）

以下の5ページは別セッションで編集権限を限定管理しているため、**このセッションでは一切編集しない**：

- https://dtvclub.com/ja/golf-dtv
- https://dtvclub.com/en/golf-dtv
- https://dtvclub.com/ko/golf-dtv
- https://dtvclub.com/zh/golf-dtv
- https://dtvclub.com/ru/golf-dtv

対応するファイル：`src/app/[lang]/golf-dtv/` 配下のすべてのファイル

### モバイルのボトムナブ対策

各ページの最下部に `paddingBottom: 80` を入れるか、 CSS で `@media (max-width: 1024px)` に padding-bottom を設定する。

---

## 記事ファイルの場所

```
src/content/blog/ja/   日本語記事（33本）
src/content/blog/en/   英語記事
src/content/blog/ko/   韓国語記事（13本）
```

---

## 現在の実装済み機能（2025年5月時点）

- [x] フロストガラスヘッダー（ライトデザイン）
- [x] ホームページ Pattern B ヒーロー（カフェ画像）
- [x] Rich B Shadow Pop ボタンシステム
- [x] Golf DTV バナー（ダーク緑×ゴールド）
- [x] モバイルボトムタブバー（MobileBottomNav）
- [x] 記事ページ：PC 2カラムサイドバー（カードスタイル）
- [x] 記事ページ：スクロールプログレスバー
- [x] 記事ページ：モバイルTOCアコーディオン
- [x] 記事ページ：モバイルグラデCTAブロック
- [x] フッター刷新（ダーク + teal ヘッダー）
- [x] ブログ一覧ページ ライトデザイン化
- [x] dtv-soft-power-vs-freelance ライトデザイン化
- [x] who-should-choose-golf-dtv ライトデザイン化
- [x] soft-power ライトデザイン化
- [x] dtv-application ライトデザイン化
- [x] モバイルレイアウト修正（header nav 表示バグ修正）

---

## 次にやること（優先度順）

### 高優先度

1. **残りのダークページを確認・ライト化**
   - `contact/page.tsx` — フォームページ
   - `life/` 系 4ページ（bangkok / housing / health / finance）
   - `embassy/[id]/` と `embassy-map/` コンポーネント

2. **ブログ記事の追加**（`docs/追加記事戦略指示書` 参照）
   - 執筆ルールは本ファイルの「記事執筆ルール」セクションを厳守

### 中優先度

3. **requirements/page.tsx のカラートークン更新**
   - 現在は `#F8F7F3` / `#0F6A43` の旧トークン
   - 新トークン `#F5F8FA` / `#0A7A6A` に統一する

4. **記事一覧ページの絞り込み機能**
   - カテゴリフィルター（teal ピルで実装）
   - 現状はすべて一覧表示のみ

5. **articles/[id]/page.tsx の確認**
   - 旧ダーク Tailwind クラスが残っている可能性あり

### 低優先度

6. **多言語コンテンツ補完**
   - 英語・韓国語記事の追加
7. **SEO強化**
   - OGP画像の設定
   - sitemap.xml の確認

---

## 【最重要】記事執筆ルール

### 1. 健康保険の扱い（必ず守る）

タイ大使館のDTV公式案内では、健康保険は主要必要書類の列挙に**含まれていない**。

| ❌ やってはいけない | ✅ 正しい表現 |
|---|---|
| 必要書類テーブルに保険を主要項目として記載 | 記載しない |
| 「健康保険（40,000USD以上）が必要」と断定 | 「公館・時期によって追加確認の対象となる場合があります」 |
| FAQで「保険は必要→必要です」と答える | 「公館案内によって異なります。申請先公館の最新案内を確認してください」 |

**推奨トーン（コピー可）：**
> DTVの主要必要書類は、パスポート、写真、現在地証明、50万THB以上の残高証明、そして申請ルートに応じた根拠書類です。健康保険については公館案内や個別事情により追加確認の対象となる場合があるため、申請先公館の最新案内を確認してください。

---

### 2. 断定表現を避ける

| ❌ 避ける表現 | ✅ 推奨する置き換え |
|---|---|
| 必ず通る | 求められやすい / 確認されることがある |
| 問題ありません | 一般的には矛盾しにくい / 個別事情により異なる |
| できます | 可能な場合がある / 制度上は想定される |
| この館が通りやすい | 館差がある可能性があるが、断定は避ける |
| この銀行なら開ける | 支店・時期・担当者で対応が異なる |

---

### 3. 面接・申請地に関する記述

- 「面接がある / ない」を一律断定しない
- 申請地ごとの通りやすさ・ランキング化は**厳禁**
- 居住国原則と館差の可能性に留める

---

### 4. 家族同伴を否定しない

- 大使館案内に「spouse and children under 20 years old of DTV visa holders」が明示されている
- 家族がDTVの対象外であるかのような記述は**不整合のため厳禁**

---

### 5. 銀行口座の扱い

- 「この銀行なら口座開設できる」という印象を与えない
- 見出し表現：「体験談で名前が挙がりやすい銀行（支店差・時期差が大きい）」
- 支店・担当者・時期によって変わることを繰り返し明示する

---

### 6. 就労制限の扱い

- 「できます」「問題ありません」の断定を避ける
- **推奨トーン**：「DTVの申請根拠として想定されやすいのは、タイ国外の雇用主・クライアント向けのリモートワークです。ただし、個別の働き方がタイ国内就労に当たるかは、契約形態・提供先・業務実態によって異なります。」
- 就労・税務・法務は必ず専門家への確認導線を入れる

---

### 7. SNS・コミュニティ情報の扱い

- Facebook・インタビュー由来の情報は「よくある不安」「検索意図の把握材料」として使う
- 制度断定には**一次情報（大使館・公館・e-Visa公式案内）**を使う
- 不明点は「確認が必要」と明記する

---

### 8. 比較記事の書き方

DTVを「勝たせる」書き方ではなく、**誰にどれが向くか**という軸で書く。

| ❌ | ✅ |
|---|---|
| 「DTVの方が楽です」 | 「何をしたいかで自然に決まってくる」 |
| 「リタイアメントよりDTVがおすすめ」 | 「ゴルフ等の活動が目的ならDTVと相性が良い」 |

---

### 9. 避けるテーマ

- タイマッサージDTV
- Discord主要CTA
- 「通りやすい館」ランキング
- 地域別量産ガイド（東京・福岡など）

---

## カテゴリ別の注意点

| カテゴリ | 注意点 |
|---|---|
| 必要書類系 | 保険は主要必須書類の列挙に入れない。公館確認の補足として注記する |
| 受入レター系 | 発行主体・活動内容・期間・氏名一致・申請ストーリーとの整合を主役にする |
| 生活系 | 医療・保険セクション冒頭に必ず公館確認案内を入れる |
| 比較系 | 中立性を保つ。結論は「あなたの状況・目的で決まる」で締める |

---

## フロントマター必須項目

```yaml
title:
slug:
lang: ja | en | ko
published_at:
updated_at:
primary_keyword:
secondary_keywords:
article_type: comparison | guide | process | local | product_bridge
primary_category: basic | process | documents | comparison | soft-power | freelance | locations | life-in-thailand
search_intent_type: informational | comparison | transactional
monetization_type: none | soft-consultation | golf-dtv
update_priority: high | medium | low
primary_cta:
secondary_cta:
must_link_pages:
schema_types:
image_style:
translation_targets:
avoid_topics:
excerpt:
read_time_minutes:
```

---

## 参照ドキュメント

- `docs/article-audit-guidelines.md` — 記事監査ガイドライン（修正済み記事一覧含む）
- `docs/Claude Code向け DTV Clubブログ記事執筆指示書_最終版（AIO_LLM対応版）.pdf` — 執筆指示書
- `docs/Claude Code向け DTV Club 追加記事戦略指示書 改訂版` — 追加20記事の戦略指示書
