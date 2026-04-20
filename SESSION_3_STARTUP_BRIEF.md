# 🚀 セッション 3：SEO・コンテンツ戦略 - スタートアップブリーフ

## 📌 このセッションの役割

**ホームページ改善完了後** → **ブログCMS実装前** の重要な中間フェーズ

このセッションで策定した **SEO戦略とコンテンツ計画** が、セッション4のブログCMS実装の基礎になります。

---

## ✅ セッション前提条件

### 既に完成しているもの
- ✅ ホームページ構造・レスポンシブ設計（Item A, B, C 完了）
- ✅ Footer ブランド修正「DTV Club」に統一
- ✅ 言語ルーティング（ja/en）正常動作
- ✅ SESSION_SEO_STRATEGY_GUIDE.md（詳細実装ガイド完備）

### ユーザーから必要な情報
- **日本語キーワードリスト** - 既に抽出済みであれば提供
  - または新規でキーワード調査を実施

---

## 🎯 セッション 3 の実行タスク

### **Phase 1：キーワード優先度付け**（2-3時間）

**入力**：日本語キーワードリスト  
**出力**：優先度スコア付きキーワード CSV/JSON

```json
[
  {
    "keyword": "DTV ビザ 申請",
    "searchVolume": 1200,
    "difficulty": "mid",
    "intent": "informational",
    "priority": 10,
    "recommendedOrder": 1,
    "relatedKeywords": ["DTV申請方法", "DTV東京", "タイビザ長期"],
    "notes": "最優先。初心者向けガイド"
  },
  // ... more keywords
]
```

**実施方法**：
1. ユーザーのキーワードリストを受け取る（または SESSION_SEO_STRATEGY_GUIDE.md の例を参考に新規作成）
2. 各キーワードの検索ボリューム推定
3. 競合度（難易度）評価
4. Priority スコア計算：`(SearchVolume × 0.4) + ((10 - Difficulty) × 0.4) + (Relevance × 0.2)`
5. JSON/CSV で整理し `src/data/keywords/` に保存

---

### **Phase 2：記事グループ化**（1時間）

**入力**：優先度付きキーワード  
**出力**：グループ化されたキーワード構造

```json
{
  "groupA": {
    "name": "DTV ビザ基本情報",
    "keywords": ["DTV ビザとは", "DTV 月収要件", "DTV 申請条件"],
    "mainArticle": "DTV ビザとは？完全ガイド"
  },
  "groupB": {
    "name": "申請プロセス",
    "keywords": ["DTV ビザ 申請", "必要書類", "審査期間"],
    "mainArticle": "DTV ビザ申請の全ステップ"
  },
  // ... more groups
}
```

---

### **Phase 3：コンテンツカレンダー作成**（1時間）

**出力**：1ヶ月のブログ投稿スケジュール

```json
[
  {
    "date": "2026-04-21",
    "week": 1,
    "keywordGroup": "DTV ビザ基本情報",
    "mainArticleTitle": "DTV ビザとは？完全ガイド【2026年最新版】",
    "targetKeyword": "DTV ビザ",
    "priority": 10,
    "description": "DTV ビザの基本概念、要件、メリットを網羅的に解説"
  },
  // ... 5-6 more articles over 4 weeks
]
```

**方針**：
- **週1本程度**（月3-5本）の投稿スケジュール
- AI自動生成は避ける。人間による質の高い記事
- 優先度の高いキーワードから順番に

---

### **Phase 4：記事テンプレート・品質ガイド作成**（2時間）

**成果物**：

1. **記事テンプレート** (`ARTICLE_TEMPLATE.md`)
   - フロントマター（タイトル、説明、キーワード）
   - H1-H7 構造ガイド
   - 内部リンク戦略
   - 品質チェックリスト

2. **SEO メタタグテンプレート** （TypeScript）
   - Meta title / description の例
   - Open Graph設定
   - Twitter Card設定

3. **品質ガイドライン** (`CONTENT_QUALITY_GUIDE.md`)
   - 記事長の基準（最小1500字、目標2500-3500字）
   - オリジナリティの確保方法
   - 信頼性ある情報源の活用
   - ファクトチェック方法

---

### **Phase 5：JSON-LD スキーマ戦略定義**（1時間）

**出力**：ブログ記事用 JSON-LD テンプレート

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "DTV ビザとは？完全ガイド【2026年最新版】",
  "description": "...",
  "author": { "@type": "Organization", "name": "DTV Club" },
  "datePublished": "2026-04-21",
  "mainEntity": {
    "@type": "HowTo",
    "step": [...]
  }
}
```

---

## 📋 セッション 3 チェックリスト

### キーワード・優先度付け
- [ ] 日本語キーワード一覧を入手
- [ ] 各キーワードの検索ボリューム推定
- [ ] 競合度評価（low/mid/high）
- [ ] Priority スコア計算
- [ ] `src/data/keywords/keywords.json` に保存
- [ ] GitHub コミット

### 記事グループ化
- [ ] 関連キーワードをグループ化（3-5グループ）
- [ ] 各グループで「軸となる記事」を選定
- [ ] グループ間の関連性を確認
- [ ] `src/data/keywords/keyword-groups.json` に保存

### コンテンツカレンダー
- [ ] 1ヶ月（4週間）の投稿スケジュール作成
- [ ] 各記事のタイトル・ターゲットキーワード決定
- [ ] 優先度順に並べ替え
- [ ] `src/data/content/calendar.json` に保存

### テンプレート・ガイド
- [ ] 記事テンプレート作成 → `ARTICLE_TEMPLATE.md`
- [ ] SEO メタタグテンプレート → `SEO_META_TEMPLATE.md`
- [ ] 品質チェックリスト → `CONTENT_QUALITY_GUIDE.md`
- [ ] GitHub コミット

### スキーマ・メタデータ
- [ ] BlogPosting JSON-LD テンプレート作成
- [ ] HowTo スキーマ定義（必要に応じて）
- [ ] メタタグ生成ロジック検討
- [ ] `src/lib/seo-schemas/` に保存

---

## 📤 セッション終了時の提出物

セッション完了後、以下をメインセッションに報告：

### 1. **キーワード優先度 JSON**
```
src/data/keywords/keywords.json
```

### 2. **記事グループ JSON**
```
src/data/keywords/keyword-groups.json
```

### 3. **コンテンツカレンダー JSON**
```
src/data/content/calendar.json
```

### 4. **ドキュメント一式**
```
ARTICLE_TEMPLATE.md           - 記事テンプレート
SEO_META_TEMPLATE.md          - メタタグテンプレート
CONTENT_QUALITY_GUIDE.md      - 品質ガイド
JSON_LD_SCHEMA.md             - スキーマ仕様書
```

### 5. **GitHub コミット**
```
feat: SEO strategy and content calendar (Session 3)
- Keyword prioritization and grouping
- 1-month content calendar
- Article templates and guidelines
- SEO metadata and schema strategy
```

---

## ⚠️ セッション中の重要ポイント

### 1. **AI自動生成は避ける**
❌ 「AI に大量に記事を生成させる」  
✅ 「品質の高い、ユーザーニーズに応える記事5本を計画」

### 2. **「1ヶ月5本程度」が目安**
- 最初の月は少なくても OK
- 品質 > 数量
- Google のアップデートに強い

### 3. **ユーザーニーズを最優先**
- 検索ボリューム数字だけで判断しない
- 「実際に DTV ユーザーが知りたい情報」を重視

### 4. **信頼性ある情報源**
- タイ王国大使館の公式情報
- 実体験に基づく情報
- ファクトチェック済みの情報のみ

---

## 🎓 参考資料

このセッションで使用する詳細ガイド：
- **SESSION_SEO_STRATEGY_GUIDE.md** ← 実装の詳細マニュアル

テンプレート例：
```markdown
# 記事テンプレート：DTV関連ガイド

## メタデータ
- メタタイトル（60文字以内）：...
- メタディスクリプション（160文字以内）：...

## H1（1つだけ）
記事タイトル

## H2 セクション
1. はじめに
2. ...
```

---

## 🚀 次のステップ（セッション 4）

このセッション 3 で策定した **SEO戦略とコンテンツカレンダー** をもとに、セッション 4 では：

- ✅ ブログ CMS 実装
- ✅ 記事管理データベース設計
- ✅ 自動投稿スケジュール機能
- ✅ SEO メタデータ自動生成
- ✅ サンプル記事 3-5 本の実装

---

## 📞 セッション実施時の進め方

1. **セッション開始時**：このドキュメントを確認
2. **進行中**：SESSION_SEO_STRATEGY_GUIDE.md に従って実装
3. **セッション終了時**：
   - すべてのチェックリストを ✅ 確認
   - 成果物を GitHub に push
   - メインセッションに報告

---

**準備完了！新しいセッションでこのガイドに従って進めてください。** 🎯

Last Updated: 2026-04-20
