# DTV Club Content Ops - 運用ガイド

## 概要

**DTV Club Content Ops** は、記事制作から公開、内部リンク整備、更新管理まで、コンテンツ運用全体を一元管理する Notion データベースです。

本文ファイルはコードベース（MDX/Markdown）で管理し、Notion は「進行状況」「どこに送るか」「何で収益化するか」を見える化するための**運用台帳**として機能します。

---

## 基本操作

### 記事を新しく追加する場合

1. **CSV から一括投入**（初期）
   - `notion_content_ops_seed.csv` を Notion へインポート

2. **1件ずつ追加**（運用中）
   - Notion で「+ Add」をクリック
   - Title、Slug、URL を入力
   - Article Type、Search Intent を選択
   - Status を `idea` または `brief` に設定

### 記事の進行状況を更新する場合

毎日、以下を確認：

1. **「This Week」ビューを開く**
   - 今週やるべき記事が表示される
   
2. **記事を編集（Slug を実装したら）**
   - Title → コードベースのファイル名と一致確認
   - Status を次のステップに更新
     - `brief` → `outline`（見出し決定後）
     - `outline` → `draft`（初稿完成後）
     - `draft` → `review`（レビュー依頼時）
     - `review` → `ready`（修正完了時）
     - `ready` → `published`（公開時）

3. **Internal Links を確認**
   - 「Internal Links To」に、この記事から次に送る記事を入力
   - 例：`dtv-soft-power-vs-freelance` なら、送客先は `dtv-soft-power` や `who-should-choose-golf-dtv`

### レビュー時の使い方

1. **「Review Queue」ビューで Status = review の記事を確認**
2. **Review Notes に指示を入力**
   - 例：「一次情報（公館サイト）での確認が必要」
   - 例：「CTA のトーンを『相談』から『確認』に変更」
3. **Fact Check、Schema Ready、Thumbnail Ready を確認チェック**
   - ✓ がすべて入ったら `ready` へ

### 公開時の手順

1. Notion で Status を `published` に更新
2. コードベースに記事ファイルを追加・コミット
3. Notion で Published Date を入力
4. （後日）ブログページで公開確認

---

## ビュー別の使い方

### All Articles
- **用途** ：全記事を見たいときに使用
- **確認項目** ：プロパティ漏れ、Status 漏れ
- **毎日見るか** ：不要

### This Week
- **用途** ：今週やるべき記事の確認
- **対象** ：Status が `brief`, `outline`, `draft`, `review` の記事
- **毎日見るか** ：**毎日**
- **確認項目** ：
  - 何をやるべきか
  - 優先順位（Priority = S から始める）
  - どの記事に内部リンクを仕込むか

### Published
- **用途** ：公開済み記事の一覧確認
- **対象** ：Status = published の記事
- **毎日見るか** ：不要（月1回程度、進捗確認用）
- **確認項目** ：
  - 何個公開できたか
  - 各記事の公開日

### Review Queue
- **用途** ：レビュー待ちの記事を管理
- **対象** ：Status = review の記事
- **毎日見るか** ：不要（レビュアー向け）
- **確認項目** ：
  - 何がレビュー待ちか
  - Review Notes（修正指示）

### Internal Link Fix
- **用途** ：内部リンク未整備の記事を把握
- **対象** ：Need Internal Link Fix = true の記事
- **毎日見るか** ：不要（内部リンク整備フェーズで活用）
- **確認項目** ：
  - 内部リンク未整備の記事
  - どの記事から送客想定か

### High Priority
- **用途** ：最優先テーマの進捗確認
- **対象** ：Priority = S の記事
- **毎日見るか** ：週1回（優先度管理）
- **確認項目** ：
  - S 優先度の記事の Status はどこか
  - 次は何をやるべきか

### Golf DTV Path
- **用途** ：Golf DTV 送客に関わる記事だけを見たい
- **対象** ：Revenue Path = golf-dtv の記事
- **毎日見るか** ：不要（キャンペーン・改善時）
- **確認項目** ：
  - Golf DTV に送る導線が整っているか
  - 各ステップの CTA が統一されているか

### Status Board（推奨）
- **用途** ：制作の流れを視覚的に把握
- **表示** ：Status ごとのカラムに記事がグループ化
  - idea / brief / outline / draft / review / ready / published
- **毎日見るか** ：**見てもいい**（全体進捗確認）
- **確認項目** ：
  - 各ステップに何個の記事があるか
  - ボトルネックはどこか（例：draft に溜まっている）

---

## ステータス運用ルール

### 各ステータスの定義と遷移

| Status | 定義 | 次のアクション |
|--------|------|-------|
| **idea** | 記事候補として存在するだけ | brief へ進める決定を待つ |
| **brief** | 検索意図・CTA まで定義済み | 見出し構成を決定（outline へ） |
| **outline** | 見出し構成が確定 | 執筆を開始（draft へ） |
| **draft** | 初稿がある | レビュー依頼（review へ） |
| **review** | 人間確認中 | 修正→最終確認（ready へ） |
| **ready** | 修正完了で公開可能 | 公開実施（published へ） |
| **published** | 公開済み | メンテ不要（update-needed へ移ると修正開始） |
| **update-needed** | 制度変更など修正必要 | 修正→review へ戻す |

### ステータス更新のタイミング

| ステータス | 更新タイミング |
|---------|----------|
| idea → brief | 「この記事はやる」と決めたとき |
| brief → outline | 見出しを決めたあと |
| outline → draft | 初稿を完成させたあと |
| draft → review | レビュー依頼するとき |
| review → ready | 修正が完了したあと |
| ready → published | Notion の Status を更新 + コードベースに commit + 実際に公開確認 |

---

## CTA（Call To Action）の使い分け

各記事の「Primary CTA」は、記事の役割によって決まります：

| Primary CTA | 記事の役割 | 例 |
|---------|---------|-----|
| **read-next** | 次の記事への案内 | 比較記事が DTV 完全ガイドへ誘導 |
| **discord** | Discord コミュニティへ | 相談が必要な場合 |
| **free-consultation** | 無料相談フォームへ | 意思決定支援記事 |
| **golf-dtv** | Golf DTV LP へ | ソフトパワー関連 |
| **documents** | 必要書類ページへ | 申請前の確認 |

**基本ルール：**
- 比較記事 → `read-next`（次の判断へ）
- 判断記事 → `golf-dtv` または `free-consultation`（行動へ）
- 実務記事 → `documents` または `discord`（次の実務へ）

---

## 内部リンク計画（最重要）

記事同士の接続を設計することが、検索流入と送客を最大化するカギです。

### 考え方

記事 A から記事 B へ内部リンクを張る基準：

- **ユーザーの疑問が自然に生まれるか**
  - 例：「DTV完全ガイド」を読んだ人は、「ソフトパワーってなに？」と思う → `dtv-soft-power` へ
  
- **読んだ後の次のアクションか**
  - 例：「DTV 必要書類」の最後に「申請方法は？」→ `dtv-application` へ

- **意思決定の連鎖か**
  - 例：「ソフトパワー vs フリーランス」で迷った人 → 「Golf DTV に向いている人」で自分に合うか判断 → Golf DTV へ

### プロパティの埋め方

- **Internal Links To** ：この記事から送る先
- **Internal Links From** ：この記事へ送元

例：

```
記事「dtv-visa」(DTV完全ガイド)
  Internal Links To: dtv-soft-power, dtv-soft-power-vs-freelance, dtv-required-documents, dtv-application
  Internal Links From: （何もない。これが入口記事だから）

記事「dtv-soft-power」
  Internal Links To: who-should-choose-golf-dtv, dtv-acceptance-letter
  Internal Links From: dtv-visa, dtv-soft-power-vs-freelance
```

---

## 今週の優先記事（着手順序）

以下の5本を優先度順に制作してください：

| 順番 | 記事 | Slug | Article Type | 理由 |
|------|------|------|---------|-----|
| 1 | ソフトパワー vs フリーランス | dtv-soft-power-vs-freelance | comparison | DTV 内部判断の中核。他記事への送客ハブ |
| 2 | DTVソフトパワービザ | dtv-soft-power | soft-power | Golf DTV 導線の入口。Golf DTV への親記事 |
| 3 | DTV必要書類 | dtv-required-documents | documents | 申請段階での必須情報。相談導線へ |
| 4 | DTV申請方法・手順 | dtv-application | process | 申請段階での実務情報。申請直前の検索ニーズ |
| 5 | DTV vs Thailand Privilege | dtv-vs-thailand-privilege | comparison | 高価格帯ビザとの比較。高属性層向け |

**毎週「This Week」ビューを見て、優先度 S の Status = brief の記事から着手してください。**

---

## よくあるチェック項目

### 記事公開前

- [ ] Status が `published` に変更された
- [ ] Published Date が入力されている
- [ ] Fact Check に ✓ が入っている
- [ ] Schema Ready に ✓ が入っている
- [ ] Internal Links To が埋まっている
- [ ] URL が実際に公開されている

### 記事執筆中

- [ ] Slug がコードベースのファイル名と一致
- [ ] Article Type が正しい
- [ ] Primary Keyword が狙っているキーワード
- [ ] Primary CTA が適切
- [ ] Internal Links From の記事に逆向きリンクが必要か確認

### 内部リンク整備時

- [ ] Need Internal Link Fix = true の記事を確認
- [ ] Internal Links To/From が埋まっているか
- [ ] 実際のコードに内部リンク HTML が入っているか
- [ ] 入ったら Need Internal Link Fix を false に

---

## Notion での定期メンテナンス

### 毎日（1 分）
- 「This Week」ビューを確認
- 今日やることを Priority S から始める

### 毎週（5 分）
- Status Board を確認
- ボトルネック（draft に溜まっているなど）を認識
- 優先度 S で Status = brief の記事を明日から着手するか検討

### 毎月（10 分）
- Published ビューで先月の出版数を確認
- 「High Priority」で S 優先度の進捗を確認
- Golf DTV Path で送客ハブが整っているか確認

---

## トラブルシューティング

### Q. 記事が完成したけど、まだ公開したくない場合は？
A. Status = `ready` のまま。Published Date を入力しない。

### Q. 制度が変わって過去の記事を直す場合は？
A. Status を `update-needed` に変更。Notes に「〇〇が変わった」と記入。レビュー後に `ready` → `published` へ。

### Q. 複数人で制作する場合は？
A. Owner プロパティに「誰が書くか」を入力。Review Notes で修正指示。Status = `review` の記事をレビュアーが確認。

### Q. 内部リンク計画をあとから直したい場合は？
A. いつでも可能。Internal Links To/From を変更し、Need Internal Link Fix = true にフラグ。後日確認時に false に。

---

## このガイドと実装のギャップ

初期段階では「完璧」よりも「使える」を優先しています。

- プロパティ不足？ → あとで追加可能
- ビューが足りない？ → あとで追加可能
- Status が複雑？ → 最初は idea / brief / draft / published の4段階でもOK

ただし、「毎日見るビュー」（This Week）だけは最初から整えてください。

---

## 次のステップ

1. Notion に `DTV Club Content Ops` DB を作成
2. このガイドの「プロパティ設計」を参考に、プロパティ作成
3. `notion_content_ops_seed.csv` をインポート
4. ビューを「必須ビュー」から作成
5. 毎日「This Week」ビューを見ながら記事制作を開始
