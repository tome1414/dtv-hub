# DTV Club Content Ops - Notion プロパティ・ビュー定義書

## データベース基本情報

| 項目 | 値 |
|------|-----|
| **DB名** | DTV Club Content Ops |
| **概要** | DTV Club 記事制作・修正・公開管理用運用台帳 |
| **本文管理場所** | コードベース（MDX/Markdown） |
| **Notion の役割** | 制作状況・内部リンク計画・CTA方針・レビュー履歴の一元管理 |

---

## プロパティ設計

### 基本情報

| プロパティ名 | 型 | 説明 | 例 |
|------------|-----|------|-----|
| **Title** | Title（必須） | 記事のタイトル | タイDTVビザ完全ガイド |
| **Slug** | Text | URLに使うスラッグ | dtv-visa |
| **URL** | URL or Text | 公開URL、制作中は予定URL | /ja/blog/dtv-visa |

### カテゴリ・キーワード

| プロパティ名 | 型 | 説明 | 選択肢 |
|------------|-----|------|--------|
| **Article Type** | Select（単一） | 記事の種類 | comparison, guide, process, documents, soft-power, product-bridge, product-lp |
| **Primary Keyword** | Text | 狙うメインキーワード | タイ DTVビザ |
| **Search Intent** | Select（単一） | 検索意図の分類 | informational（情報）, comparison（比較）, transactional（行動） |

### 優先度・ステータス

| プロパティ名 | 型 | 説明 | 選択肢 |
|------------|-----|------|--------|
| **Priority** | Select（単一） | 制作優先度 | S（最優先）, A（重要）, B（普通） |
| **Status** | Select（単一） | 制作進行状況 | idea, brief, outline, draft, review, ready, published, update-needed |

### CTA・導線設計

| プロパティ名 | 型 | 説明 | 選択肢 |
|------------|-----|------|--------|
| **Primary CTA** | Select（単一） | この記事の主CTA | discord, free-consultation, golf-dtv, read-next, documents |
| **Revenue Path** | Select（単一） | 収益化への関連度 | none（非収益）, soft-consultation（相談導線）, golf-dtv（Golf DTV導線） |

### 内部リンク計画

| プロパティ名 | 型 | 説明 | 入力例 |
|------------|-----|------|--------|
| **Internal Links To** | Multi-select or Text | この記事から次に送る記事 | dtv-soft-power, who-should-choose-golf-dtv |
| **Internal Links From** | Multi-select or Text | どの記事から送客される想定か | dtv-visa, dtv-vs-retirement-visa |
| **Need Internal Link Fix** | Checkbox | 内部リンク未整備フラグ | ✓ = 要対応 |

### レビュー・品質管理

| プロパティ名 | 型 | 説明 | 用途 |
|------------|-----|------|------|
| **Review Notes** | Text | レビュー時の修正指示・メモ | 「一次情報確認待ち」「CTAのトーン修正」など |
| **Fact Check** | Checkbox | 一次情報（公館、BOI等）で確認済みか | ✓ = 確認済み |
| **Schema Ready** | Checkbox | 構造化データ（Article, FAQPage等）対応か | ✓ = 対応済み |
| **Thumbnail Ready** | Checkbox | サムネイル画像準備済みか | ✓ = 準備済み |

### 言語・メタ

| プロパティ名 | 型 | 説明 | 選択肢 |
|------------|-----|------|--------|
| **Language** | Select（単一） | 言語 | ja, en, zh-hans（将来用） |
| **Owner** | Person or Text | 担当者（将来の複数制作用） | Claude |

### 日付・その他

| プロパティ名 | 型 | 説明 | 例 |
|------------|-----|------|-----|
| **Published Date** | Date | 記事公開日 | 2026-04-26 |
| **Last Updated** | Date | 最終更新日 | 2026-04-29 |
| **Notes** | Text | その他メモ・連絡事項 | 「公開済み・内部リンク未整備」 |

---

## ビュー設計

### ビュー一覧

| ビュー名 | 種類 | フィルタ条件 | ソート | 用途 |
|---------|-----|------------|--------|------|
| **All Articles** | Table | なし | Status → Priority | 全記事の確認 |
| **This Week** | Table | Status ∈ [brief, outline, draft, review] | Priority → Status | 今週やるべき記事の一覧 |
| **Published** | Table | Status = published | Published Date（降順） | 公開済み記事の確認 |
| **Review Queue** | Table | Status = review | Priority | レビュー待ち記事の管理 |
| **Internal Link Fix** | Table | Need Internal Link Fix = true | Article Type | 内部リンク未整備の対象把握 |
| **High Priority** | Table | Priority = S | Status | 最優先テーマの確認 |
| **Golf DTV Path** | Table | Revenue Path = golf-dtv | Priority → Status | Golf DTV送客に関わる記事 |
| **Status Board**（推奨） | Board | なし | Status（カラムグループ） | 制作フロー全体を視覚的に把握 |

### ビュー設定のコツ

- **All Articles**：デフォルトビュー。プロパティ全表示。
- **This Week**：制作中の記事だけ見える。毎日チェック用。
- **Published**：公開済みの実績確認。メタフロー計測用。
- **Review Queue**：レビューが必要な記事だけ表示。レビュー者用。
- **Internal Link Fix**：公開済み3記事の内部リンク未整備フラグを可視化。次の記事執筆時に参考。
- **Golf DTV Path**：コンバージョン導線に関わる記事を集約。キャンペーン・改善時に参考。
- **Status Board**：Kanban的に見える。「idea → brief → outline → draft → review → ready → published」の流れが直感的。

---

## プロパティ値の管理ルール

### Status フロー

```
idea
 ↓
brief（検索意図・CTA定義）
 ↓
outline（見出し構成決定）
 ↓
draft（初稿完成）
 ↓
review（人間確認待ち）
 ↓
ready（修正完了）
 ↓
published（公開）
```

**特殊ステータス：**
- `update-needed`：公開後に制度変更やリンク修正が必要になった場合

### Priority の意味

- **S：最優先** → 戦略上重要。1～2週間以内に着手
- **A：重要** → やるべき記事だが、Sの次
- **B：普通** → リソースがあれば

### Revenue Path の意味

- **none** → 直接的な収益化なし（比較記事など）
- **soft-consultation** → 相談導線へのステップ
- **golf-dtv** → Golf DTV への導線

---

## CSV から Notion へのインポート方法

1. Notion で `DTV Club Content Ops` データベースを作成
2. プロパティを上記設計通り作成
3. 「インポート → CSV」で `notion_content_ops_seed.csv` を選択
4. マッピング確認（Title → Title、Slug → Slug など）
5. インポート実行
6. ビューを上記設計通り作成

---

## 運用時の注意点

- **Status は必ず更新**：記事が進むたびに Status を変更
- **Internal Links To/From は着手前に確認**：内部リンク戦略との整合性確認
- **Fact Check は公開前に✓**：制度記事は特に一次情報確認が必須
- **Review Notes は詳しく**：何が修正が必要かを明確に
- **毎週「This Week」を確認**：その週の目標明確化

---

## 今後の拡張

- 記事ごとにコメント欄で詳細議論が必要な場合は、データベースのコメント機能を活用
- 複数言語展開時は、Language フィルタで言語ごとに振り分け
- AI 生成コンテンツ品質スコアなど、追加プロパティは運用が固まってから検討
