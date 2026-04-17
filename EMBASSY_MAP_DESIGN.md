# 🗺️ Embassy Map - 詳細設計書

## 📌 プロジェクト概要

DTV Club のメインフィーチャー「Embassy Map」。
世界中の 95 件のタイ王国領事館・大使館を、段階的拡大 UI で視覚化し、
ユーザーが最適な申請拠点を選択できるインタラクティブマップ。

---

## 🎯 要件定義

### 機能要件
- 世界地図上に 95 件の領事館・大使館をピンで表示
- **段階的ナビゲーション**：大陸選択 → 国選択 → 領事館選択
- ピンをクリック → 詳細ポップアップ表示（住所、URL、申請ページリンク）
- 各領事館の詳細ページ（独立した URL）
- リスト表示への切り替え機能
- 検索機能（国名 or 領事館名）

### UI/UX要件
- **段階的拡大 UI** - 初心者でも直感的に操作可能
- **フルレスポンシブ対応** - デスクトップ/タブレット/モバイル
- **スムーズなズーム・アニメーション** - 大陸→国→領事館への遷移
- **モバイル最適化** - タップターゲット大きめ、リスト表示優先
- **フィルター** - 難易度別表示（将来対応）

### SEO要件
- **各領事館のメタデータ最適化**
  - メタタイトル（60文字以内）
  - メタディスクリプション（160文字以内）
  - キーワード：「DTV ビザ [国名] 申請」
- **JSON-LD LocalBusiness スキーマ**
  - 住所、電話、営業時間
  - 地理座標
- **多言語 hreflang タグ**
  - ja, en, zh, ko, ru に対応
- **内部リンク最適化**
  - 関連記事へのリンク
  - 同地域の他の領事館へのリンク

### レスポンシブ要件
- **デスクトップ（1024px+）**：左サイドバー + 中央地図
- **タブレット（768-1024px）**：上部タブ + 地図 + 下部リスト
- **モバイル（-768px）**：地図/リスト切り替え UI、段階的ナビゲーション

---

## 🗺️ ユーザーフロー

### デスクトップユーザー

```
1. /embassy-map にアクセス
   → 世界地図表示（すべての大陸表示）
   → 左パネル：大陸選択

2. 「Asia」をクリック
   → 地図が Asia にズーム（300ms アニメーション）
   → 左パネルに国一覧表示
   → 「Japan」「Thailand」「China」など表示

3. 「Japan」をクリック
   → 地図が Japan にズーム
   → ピン表示（東京、大阪、福岡など）
   → 左パネルに領事館一覧表示

4. ピンをクリック
   → ポップアップ表示（名前、住所、公式URL）

5. 「詳細を見る」をクリック
   → /embassy/[id] 詳細ページへ遷移
```

### モバイルユーザー

```
1. /embassy-map にアクセス
   → 画面：大陸選択カードUI表示
   → [Asia] [Europe] [Americas] [Africa] [Oceania]

2. 「Asia」をタップ
   → 画面：国選択リスト表示
   → [← 戻る] [Japan] [Thailand] [China]...

3. 「Japan」をタップ
   → 画面：領事館リスト表示
   → [← 戻る] [地図で見る]
   → 「東京大使館」「大阪領事館」「福岡領事館」

4. 領事館をタップ
   → ポップアップ表示

5. 「詳細を見る」をタップ
   → 詳細ページへ遷移
```

---

## 💻 画面設計

### 1. メインページ：/[lang]/embassy-map

#### デスクトップレイアウト（1024px+）

```
┌─────────────────────────────────────────────────────────┐
│ Header (DTV Club ロゴ、言語切り替え)                      │
├──────────────────┬──────────────────────────────────────┤
│ LEFT PANEL       │ MAP PANEL                            │
│ (300px固定)      │ (残り)                               │
│                  │                                      │
│ 🌍 SELECT        │  ┌──────────────────────────────┐   │
│    CONTINENT     │  │  [地図表示 - Leaflet]       │   │
│ ┌──────────────┐ │  │  - 大陸表示（初期）          │   │
│ │ Asia     🌏  │ │  │  - ズーム/パン可能          │   │
│ │ Europe   🌍  │ │  │  - ポップアップ機能         │   │
│ │ Americas 🌎  │ │  │  - スムーズアニメーション   │   │
│ │ Africa   🌍  │ │  │                             │   │
│ │ Oceania  🏝️  │ │  │  [ズーム制御]               │   │
│ └──────────────┘ │  │  + −  🔍                     │   │
│                  │  └──────────────────────────────┘   │
│ 🌏 COUNTRIES     │                                      │
│ ┌──────────────┐ │  凡例：                             │
│ │ Japan   🇯🇵  │ │  🟢 Green (Marked)               │
│ │ Thailand🇹🇭  │ │  🟡 未定                        │
│ │ China   🇨🇳  │ │  🔴 未定                        │
│ │ Korea   🇰🇷  │ │                                      │
│ │ (動的リスト)  │ │                                      │
│ └──────────────┘ │                                      │
│                  │                                      │
│ 🏛️ EMBASSIES    │                                      │
│ ┌──────────────┐ │                                      │
│ │ Tokyo Emb.   │ │                                      │
│ │ Osaka Cons.  │ │                                      │
│ │ Fukuoka C.   │ │                                      │
│ │ (動的)        │ │                                      │
│ └──────────────┘ │                                      │
│                  │                                      │
│ 🔍 検索フォーム   │                                      │
│ [検索...]        │                                      │
└──────────────────┴──────────────────────────────────────┘
│ Footer                                                   │
└─────────────────────────────────────────────────────────┘
```

#### タブレットレイアウト（768-1024px）

```
┌────────────────────────────────────────┐
│ Header (コンパクト)                     │
├──────────────────────────────────────┤
│ [Asia] [Europe] [Americas] [Africa] [Oce]  ← タブ
├────────────────────────────────────────┤
│ 左：国リスト        │ 右：地図表示       │
│ - Japan             │  (Leaflet)        │
│ - Thailand          │                    │
│ - China             │                    │
├────────────────────────────────────────┤
│ Footer                                 │
└────────────────────────────────────────┘
```

#### モバイルレイアウト（-768px）

```
フェーズ 1：大陸選択
┌──────────────────────┐
│ Header               │
├──────────────────────┤
│  大陸選択カード      │
│  ┌────────────────┐  │
│  │ 🌏 Asia       │  │
│  │ 🌍 Europe     │  │
│  │ 🌎 Americas   │  │
│  │ 🌍 Africa     │  │
│  │ 🏝️ Oceania    │  │
│  └────────────────┘  │
│                      │
│ [詳細検索] [リスト]   │
├──────────────────────┤
│ Footer               │
└──────────────────────┘

フェーズ 2：国選択
┌──────────────────────┐
│ Header               │
├──────────────────────┤
│ [← 戻る]             │
│ Asia 内の国選択      │
│                      │
│ 🇯🇵 Japan            │
│ 🇹🇭 Thailand         │
│ 🇨🇳 China            │
│ 🇰🇷 Korea            │
│                      │
├──────────────────────┤
│ Footer               │
└──────────────────────┘

フェーズ 3：領事館選択
┌──────────────────────┐
│ Header               │
├──────────────────────┤
│ [← 戻る] [地図表示]   │
│ Japan 内の領事館     │
│                      │
│ 🏛️ 東京大使館        │
│ 🏛️ 大阪領事館        │
│ 🏛️ 福岡領事館        │
│                      │
├──────────────────────┤
│ Footer               │
└──────────────────────┘
```

---

## 🔍 SEO 戦略

### メインページ SEO

**URL**: `/[lang]/embassy-map`

**メタタイトル**:
```
Japanese: タイ領事館・大使館マップ | DTV ビザ申請 | DTV Club
English: Thai Embassies & Consulates Map | DTV Visa | DTV Club
```

**メタディスクリプション**:
```
Japanese: 世界95ヶ所のタイ王国領事館・大使館をインタラクティブマップで表示。DTVビザ申請に最適な拠点を簡単に検索できます。
English: Find 95 Thai embassies and consulates worldwide. Interactive map to help you choose the best DTV visa application location.
```

**キーワード**:
```
DTV visa, Thai embassies, Thai consulates, visa application map, Thailand residence
```

**JSON-LD（WebPage）**:
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Thai Embassies & Consulates Map",
  "description": "Interactive map of Thai embassies for DTV visa",
  "url": "https://dtvclub.com/en/embassy-map",
  "isPartOf": {
    "@type": "WebSite",
    "name": "DTV Club",
    "url": "https://dtvclub.com"
  }
}
```

### 各領事館詳細ページ SEO

**URL**: `/[lang]/embassy/[id]`

**例：東京大使館**

**メタタイトル** (60文字以内):
```
Japanese: 在東京タイ王国大使館 | DTV ビザ申請ガイド | DTV Club
English: Royal Thai Embassy Tokyo | DTV Visa Application | DTV Club
```

**メタディスクリプション** (160文字以内):
```
Japanese: 東京のタイ大使館でのDTVビザ申請について。住所、電話、営業時間、申請条件をご紹介。日本からのDTV申請に役立つ情報をまとめました。
English: Complete guide to DTV visa at Royal Thai Embassy Tokyo. Address, contact info, office hours, and application requirements.
```

**キーワード**:
```
DTV visa Tokyo, Thai embassy Tokyo, DTV application Japan, long-term residence
```

**JSON-LD (LocalBusiness)**:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Royal Thai Embassy Tokyo",
  "description": "Thai embassy providing DTV visa services",
  "url": "http://www.thaiembassy.jp",
  "telephone": "+81-3-1234-5678",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1-1 Yoyogi, Shibuya Ward",
    "addressLocality": "Tokyo",
    "addressRegion": "Tokyo",
    "postalCode": "150-0001",
    "addressCountry": "JP"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.6789,
    "longitude": 139.7604
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "12:00"
  }
}
```

**hreflang タグ**:
```html
<link rel="alternate" hreflang="ja" href="https://dtvclub.com/ja/embassy/embassy_3">
<link rel="alternate" hreflang="en" href="https://dtvclub.com/en/embassy/embassy_3">
<link rel="alternate" hreflang="zh" href="https://dtvclub.com/zh/embassy/embassy_3">
<link rel="alternate" hreflang="ko" href="https://dtvclub.com/ko/embassy/embassy_3">
<link rel="alternate" hreflang="ru" href="https://dtvclub.com/ru/embassy/embassy_3">
<link rel="alternate" hreflang="x-default" href="https://dtvclub.com/en/embassy/embassy_3">
```

### 内部リンク戦略

各領事館詳細ページに以下をリンク:
- メインの地図ページへ戻るリンク
- 同地域の他の領事館へのリンク
- 関連ガイド（「DTV ビザ完全ガイド」など）
- ブログ記事

---

## 🎨 UI/UX 仕様

### カラー

```css
--navy-950: #0f172a
--gold-400: #f0c43c
--green-500: #10b981    /* 申請通りやすい */
--amber-500: #f59e0b    /* 中程度（将来） */
--red-500: #ef4444      /* 審査厳しい（将来） */
--gray-500: #6b7280     /* 情報なし（現在） */
```

### 各領事館ポップアップ

```
┌─────────────────────────────────────┐
│ 在東京タイ王国大使館                 │
├─────────────────────────────────────┤
│                                     │
│ 📍 住所                             │
│ 東京都渋谷区代々木 1-1              │
│                                     │
│ 📞 電話                             │
│ +81-3-1234-5678                    │
│                                     │
│ 🌐 公式サイト                       │
│ http://www.thaiembassy.jp           │
│                                     │
│ 📅 営業時間                         │
│ 月-金 09:00-12:00                   │
│                                     │
│ [詳細を見る] [申請ガイド]            │
│                                     │
└─────────────────────────────────────┘
```

### インタラクション

- **クリック/タップ**: 大陸/国/領事館 → 次段階へスムーズに遷移（300msアニメ）
- **ホバー** (デスクトップ): リスト項目の背景色変更、ピンのスケール拡大
- **ズーム**: Leaflet 標準ズーム機能対応

---

## 📱 レスポンシブ要件

### ブレークポイント
- モバイル: 0-768px
- タブレット: 768-1024px
- デスクトップ: 1024px+

### 各デバイス での UX
- **デスクトップ**: 左サイドバー常時表示、マウスホバー活用
- **タブレット**: 上部タブ切り替え、タッチ最適化
- **モバイル**: 段階的ナビゲーション（大陸→国→領事館）、フルスクリーン地図

---

## 💾 データ構造

```typescript
interface Embassy {
  id: string
  country: string
  countryJa: string
  city: string
  cityJa: string
  name: string
  nameJa: string
  type: string
  website: string
  notes: string
  latitude: number
  longitude: number
}
```

---

## 📅 実装フェーズ

- **Phase 2a**: UI 構造設計（1-2h）
- **Phase 2b**: 地図実装（2-3h）
- **Phase 2c**: インタラクション（2-3h）
- **Phase 3**: 詳細ページ＆SEO（3-4h）
- **Phase 4**: QA＆最適化（1-2h）

---

**このドキュメント に基づいて実装を進めてください。**

Last Updated: 2026-04-18
Created by: Main Session
