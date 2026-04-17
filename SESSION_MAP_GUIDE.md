# 🗺️ セッション2：Embassy Map 実装ガイド

## 📌 セッション概要

このセッションでは、DTV Club 内に **インタラクティブな領事館マップ** を実装します。

**所有データ**：Excel シートに領事館ピックアップ済み ✅

---

## 🎯 セッション目標

### 成果物
- [ ] インタラクティブ地図表示（Mapbox または Leaflet）
- [ ] 領事館マーカー表示
- [ ] 領事館詳細ポップアップ
- [ ] フィルター機能（国・地域別）
- [ ] 領事館検索機能
- [ ] 詳細ページ実装
- [ ] モバイル対応
- [ ] 多言語対応（5言語）
- [ ] SEO最適化

---

## 📊 必要なデータ構造

### Excel データの変換

ユーザーから Excel が提供される見込み。必要な情報：

```typescript
interface Embassy {
  id: string                    // 一意のID
  country: string              // 国名（ja/en/zh/ko/ru）
  city: string                 // 都市名
  name: string                 // 大使館/領事館名
  latitude: number             // 緯度
  longitude: number            // 経度
  address: string              // 住所
  phone: string                // 電話番号
  email?: string               // メール
  website?: string             // 公式サイト
  visaServiceHours?: string    // ビザサービス時間
  appointmentUrl?: string      // 予約URL
  notes?: string               // 備考
}
```

### 実装ステップ

1. **Excel → JSON 変換**
   ```
   src/data/embassies.json に変換
   ```

2. **TypeScript インターフェース定義**
   ```typescript
   // src/types/embassy.ts
   export interface Embassy { ... }
   ```

3. **Embassy Service 作成**
   ```
   src/lib/embassy-service/index.ts
   - getEmbassies(language)
   - getEmbassyById(id)
   - getEmbassiesByCountry(country)
   - searchEmbassies(query)
   ```

---

## 🗂️ ファイル構造（実装済み）

```
src/app/[lang]/embassy-map/
├── page.tsx                    ✅ テンプレート済み
├── embassy/[id]/
│   └── page.tsx               ← 詳細ページ（新規実装）
└── [country]/
    └── page.tsx               ← 国別フィルター（新規実装）

src/components/embassy/
├── Map.tsx                     ← メインコンポーネント
├── EmbassyMarker.tsx
├── EmbassyCard.tsx
├── FilterPanel.tsx
├── EmbassyList.tsx
└── AppointmentInfo.tsx

src/lib/embassy-service/
├── index.ts                    ← サービス関数
└── embassies.json             ← Excel データ変換

src/data/
└── embassies/
    └── embassies.json         ← マスターデータ
```

---

## 🛠️ 実装チェックリスト

### Phase 1：データ準備
- [ ] Excel ファイルを確認
- [ ] JSON フォーマットに変換
- [ ] TypeScript インターフェース定義
- [ ] embassy-service 実装

### Phase 2：マップコンポーネント
- [ ] Mapbox/Leaflet ライブラリ選定
- [ ] Map.tsx 実装（基本マップ表示）
- [ ] EmbassyMarker.tsx 実装（マーカー表示）
- [ ] ポップアップ機能実装

### Phase 3：UI・機能
- [ ] EmbassyCard.tsx 実装（カード表示）
- [ ] FilterPanel.tsx 実装（フィルター）
- [ ] 検索機能実装
- [ ] EmbassyList.tsx 実装（リスト表示）

### Phase 4：ページ実装
- [ ] /embassy-map/page.tsx → メインマップページ
- [ ] /embassy/[id]/page.tsx → 詳細ページ
- [ ] /embassy-map/[country]/page.tsx → 国別ページ

### Phase 5：最適化
- [ ] モバイル対応テスト
- [ ] 全5言語対応確認
- [ ] メタタグ・SEO設定
- [ ] パフォーマンス最適化

### Phase 6：テスト・確認
- [ ] マップ描画確認
- [ ] マーカー表示確認
- [ ] フィルター動作確認
- [ ] 検索機能確認
- [ ] リンク動作確認

---

## 💻 実装のポイント

### マップライブラリの選定

**Mapbox（推奨）**
- 美しいデザイン
- リアルタイム更新可能
- 有料（月額〜）
- 機能豊富

**Leaflet（軽量）**
- オープンソース
- 軽量
- 無料
- OpenStreetMap 連携

> **推奨**：Leaflet（コスト0、十分な機能）

### 多言語対応

```typescript
import { getDictionary } from '@/lib/dictionaries'

const dict = await getDictionary(locale)
// dict.embassy.markerTitle
// dict.embassy.appointmentButton
// etc.
```

### SEO最適化

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: `Thai Embassies - DTV Club`,
    description: `Find Thai embassies and consulates worldwide...`,
    alternates: {
      canonical: `/embassy-map`,
      languages: { /* hreflang tags */ }
    }
  }
}
```

---

## 📅 推奨スケジュール

| Phase | 内容 | 所要時間 |
|-------|------|--------|
| 1 | データ準備 | 30分 |
| 2 | マップ基本実装 | 1-2h |
| 3 | UI・フィルター | 1-2h |
| 4 | ページ実装 | 1h |
| 5 | 最適化 | 1h |
| 6 | テスト | 30分 |
| **合計** | | **5-7時間** |

---

## 🚀 開始時のチェックリスト

セッション開始時に確認：

- [ ] Excel ファイルをユーザーから受け取っている
- [ ] Leaflet v1.9+ インストール予定
- [ ] 基本的なマップ実装経験がある（または学習予定）
- [ ] メモリファイル更新用の内容を用意

---

## 📝 セッション終了時の提出物

- ✅ 完全に動作する Embassy Map
- ✅ GitHub へのコミット
- ✅ テスト完了報告
- ✅ メモリファイル更新

---

**準備完了次第、本セッション（メイン）に報告してください。**
**ガイドに沿って実装してもらえば、効率的に進むはずです！** 🎯

Last Updated: 2026-04-17
