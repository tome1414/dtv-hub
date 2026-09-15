# 日本語ブログ監査レポート 2026-09

作成日: 2026-09-16
対象ディレクトリ: `src/content/blog/ja/`
使用ルール: SEO_AIO_EDITORIAL_RULES / ARTICLE_UPDATE_WORKFLOW / HUMAN_APPROVAL_REQUIRED / GOLFDTV_CONFIRMED_FACTS / DTV_2026_RULES / LOCALIZATION_RULES
監査者: Claude Code (Sonnet 4.6)

---

## A. サマリー統計

| 指標 | 件数 |
|---|---|
| **日本語記事総数** | **47本** |
| P0（緊急対応必要） | 0 |
| P1（SAFE_AUTO_FIX 高優先） | 17 |
| P2（SAFE_AUTO_FIX 中優先） | 15 |
| NO_CHANGE（変更不要） | 14 |
| HUMAN_REVIEW | 1 |

---

## B. 全記事分類一覧

### リファレンス記事（NO_CHANGE）

最近更新済み高品質リファレンス。確認のみ、本文変更なし。

| # | ファイル | updated_at | 備考 |
|---|---|---|---|
| 1 | dtv-visa.md | 2026-09-13 | NO_CHANGE |
| 2 | dtv-required-documents.md | 2026-09-13 | NO_CHANGE |
| 3 | dtv-where-to-apply.md | 2026-09-13 | 8/31更新済み |
| 4 | dtv-application-nationality-notes.md | 2026-09-13 | NO_CHANGE |
| 5 | dtv-rejection-reasons.md | 2026-09-13 | NO_CHANGE |
| 6 | golf-dtv-overview.md | 2026-09-13 | NO_CHANGE |
| 7 | golf-dtv-what-is.md | 2026-09-13 | NO_CHANGE |
| 8 | golf-dtv-plans.md | 2026-09-13 | NO_CHANGE |
| 9 | golf-dtv-documents.md | 2026-09-13 | NO_CHANGE |
| 10 | golf-dtv-application.md | 2026-09-13 | NO_CHANGE |
| 11 | golf-dtv-suitability.md | 2026-09-15 | NO_CHANGE（先週更新済み） |
| 12 | golf-dtv-comparison.md | 2026-09-15 | NO_CHANGE（先週更新済み） |
| 13 | golf-dtv-faq.md | 2026-09-15 | NO_CHANGE（先週更新済み） |
| 14 | golf-dtv-mistakes.md | 2026-09-15 | NO_CHANGE（先週更新済み） |
| 15 | golf-dtv-after-approval.md | 2026-09-15 | NO_CHANGE（今セッション更新済み） |

### リファレンス記事（P2/SAFE_AUTO_FIX）

| # | ファイル | updated_at | 理由 |
|---|---|---|---|
| 16 | dtv-application.md | 2026-09-13 | 固定時間表現「2〜4週間」「1〜3週間程度」複数箇所（L102/261/333）→ 柔軟化 |

### P1/SAFE_AUTO_FIX（高優先・自動修正推奨）

8/31更新未対応・固定時間表現・Source Note欠落・broken linkなどが複合する記事。

| # | ファイル | updated_at | 主要問題 |
|---|---|---|---|
| 17 | dtv-soft-power.md | 2026-05-05 | 8/31未対応、must_link `/ja/dtv-acceptance-letter`（broken）、Source Note欠落 |
| 18 | dtv-soft-power-comparison.md | 2026-05-05 | 8/31未対応、Source Note欠落、translation_targets要確認 |
| 19 | dtv-soft-power-vs-freelance.md | 2026-05-16 | 8/31未対応、Source Note欠落、old updated_at |
| 20 | dtv-freelance-proof.md | 2026-05-05 | 8/31未対応（個人書類文脈）、Source Note欠落 |
| 21 | dtv-interview-format.md | 2026-05-05 | 8/31コンテキスト欠落、Source Note欠落 |
| 22 | dtv-interview-questions.md | 2026-05-05 | 8/31コンテキスト欠落、Source Note欠落 |
| 23 | dtv-entry-checks.md | 2026-05-05 | 8/31未対応、updated_at古い |
| 24 | dtv-extension-and-reentry.md | 2026-05-05 | 8/31未対応、Source Note欠落 |
| 25 | dtv-acceptance-letter.md | 2026-04-29 | 8/31未対応（Proof of Permanent Residence未言及）、固定時間「1〜3週間」（L131）、Source Note欠落 |
| 26 | dtv-acceptance-letter-checkpoints.md | 2026-05-05 | 8/31未対応、Source Note欠落 |
| 27 | dtv-work-limitations.md | 2026-05-05 | 8/31コンテキスト欠落、Source Note欠落 |
| 28 | dtv-bank-balance.md | 2026-05-05 | 固定時間「数日〜1週間」（L80）、Source Note欠落 |
| 29 | golf-dtv-vs-soft-power.md | 2026-05-16 | 8/31未対応、Source Note欠落、「確実性」表現（L114/130）、translation_targets:[] |
| 30 | dtv-common-document-mistakes.md | 2026-05-05 | 8/31未対応、Source Note欠落 |
| 31 | dtv-processing-time.md | 2026-06-02 | 固定時間「1〜3週間程度」（L47）、8/31未対応 |
| 32 | dtv-family-documents.md | 2026-06-02 | 8/31未対応（家族書類文脈でProof of Permanent Residence未言及） |
| 33 | dtv-application-timeline.md | 2026-06-02 | 固定時間複数箇所（L51/52/56/99/112）、8/31未対応、translation_targets:[] |

### P2/SAFE_AUTO_FIX（中優先・自動修正推奨）

8/31直接影響は低いが、Source Note・Answer First・frontmatter更新などが必要。

| # | ファイル | updated_at | 主要問題 |
|---|---|---|---|
| 34 | dtv-portfolio-supporting-documents.md | 2026-05-05 | Source Note欠落 |
| 35 | dtv-upload-documents.md | 2026-05-05 | Source Note欠落 |
| 36 | dtv-income-proof.md | 2026-05-05 | Source Note欠落 |
| 37 | dtv-job-change-after-application.md | 2026-05-16 | 8/31直接影響低、Source Note欠落、translation_targets:[] |
| 38 | dtv-over-50.md | 2026-05-16 | 8/31未対応、Source Note欠落、translation_targets:[] |
| 39 | dtv-bank-account.md | 2026-05-05 | Source Note欠落、translation_targets:[] |
| 40 | dtv-bank-balance-faq.md | 2026-06-02 | 固定時間「数日〜1週間程度」（L65）、Source Note欠落 |
| 41 | dtv-evisa-form-guide.md | 2026-06-02 | Source Note欠落、translation_targets:[] |
| 42 | dtv-life-setup.md | 2026-06-02 | 生活ガイド・8/31直接影響低、Source Note欠落、translation_targets:[] |
| 43 | thailand-long-stay-visa-comparison.md | — | Source Note欠落、比較表更新要確認 |
| 44 | dtv-digital-nomad-visa.md | — | Source Note欠落 |
| 45 | dtv-vs-ltr.md | — | Source Note欠落 |
| 46 | dtv-vs-retirement-visa.md | — | Source Note欠落 |
| 47 | dtv-vs-thailand-privilege.md | — | Source Note欠落 |

### HUMAN_REVIEW（自動修正不可）

| # | ファイル | 理由 |
|---|---|---|
| 48 | who-should-choose-golf-dtv.md | primary_keyword重複（cannibalization）、機械的スコアリング表現 |

---

## C. Broken Link 一覧（G）

### 確定 Broken Link

| リンクURL | 使用記事（例） | 問題 | 修正案 |
|---|---|---|---|
| `/ja/dtv-acceptance-letter` | dtv-soft-power.md must_link_pages | アプリルートなし | → `/ja/blog/dtv-acceptance-letter` |
| `/ja/dtv-soft-power` | dtv-acceptance-letter-checkpoints.md, dtv-over-50.md, dtv-soft-power-comparison.md | アプリルートなし（存在するのは `/ja/soft-power`） | → `/ja/soft-power`（アプリページ）または `/ja/blog/dtv-soft-power`（ブログ） |
| `/ja/dtv-visa` | dtv-bank-account.md, dtv-life-setup.md など | アプリルートなし | → `/ja/blog/dtv-visa` |

### 要確認パターン（広範囲）

多くの記事が `/ja/dtv-[slug]` 形式でリンクしているが、ブログ記事の正規URLは `/ja/blog/[slug]`。  
アプリページとして存在するのは確認済みの6ルートのみ（`/dtv-application`, `/dtv-soft-power-vs-freelance`, `/soft-power`, `/who-should-choose-golf-dtv`, `/golf-dtv`, `/guide/evisa-form`）。  
上記以外の `/ja/dtv-*` リンクはすべて `/ja/blog/dtv-*` が正規URL。

---

## D. 制度表現（時間・期間）の問題（H）

現在進行中の審査期間は変動するため、固定数値の表記は誤解を招く。

| ファイル | 行番号 | 問題表現 | 修正方針 |
|---|---|---|---|
| dtv-acceptance-letter.md | L131 | 「1〜3週間」 | 「数週間程度（公館・時期により変動）」等に柔軟化 |
| dtv-application.md | L102, 261, 333 | 「2〜4週間」「1〜3週間程度」 | 同上 |
| dtv-application-timeline.md | L51, 52, 56, 99, 112 | 複数の固定期間表現 | 全箇所を柔軟化 |
| dtv-bank-balance.md | L80 | 「数日〜1週間」 | 「数日〜数週間（公館・時期により変動）」等 |
| dtv-bank-balance-faq.md | L65 | 「数日〜1週間程度」 | 同上 |
| dtv-processing-time.md | L47 | 「1〜3週間程度」 | 同上 |

---

## E. Cannibalization Risk 一覧（I）

### CRITICAL（HUMAN_REVIEW 必要）

| 記事A | 記事B | 重複primary_keyword | 対応 |
|---|---|---|---|
| `who-should-choose-golf-dtv.md` | `golf-dtv-suitability.md` | 両方：「Golf DTV 向いている人」（完全一致） | **HUMAN_REVIEW必須**：slug変更 or 統合 or 対象読者差別化が必要 |

### 要監視（現時点では分類可能）

| 記事A | 記事B | 重複意図 | 現状評価 |
|---|---|---|---|
| `dtv-soft-power-vs-freelance.md` | `golf-dtv-vs-soft-power.md` | ソフトパワー vs フリーランス比較 | フォーカス差（DTV汎用 vs GolfDTV特化）で分化可能。要監視 |
| `dtv-acceptance-letter.md` | `dtv-acceptance-letter-checkpoints.md` | 受入レター関連 | 「取得方法」vs「確認ポイント」で分化。内部リンクで補完関係を明確化推奨 |
| `dtv-bank-balance.md` | `dtv-bank-balance-faq.md` | 残高証明 | ガイド型 vs FAQ型で分化可能。統合候補だがP2対応 |

---

## F. Controlled Fact 問題（J）

### 要注意（HUMAN_REVIEW 対象外だが記録）

| ファイル | 行番号 | 現在の表現 | 問題 | 判定 |
|---|---|---|---|---|
| `golf-dtv-vs-soft-power.md` | L114, 130 | 「書類準備の確実性」 | 「確実」はビザ承認保証との混同リスク（書類準備文脈なので直接的違反ではない） | SAFE_AUTO_FIX（表現を「信頼性・一貫性」等に置換） |
| `who-should-choose-golf-dtv.md` | L145 | 「以下のうち3つ以上当てはまれば」（機械的スコアリング） | `golf-dtv-suitability.md` の「機械的に判断するものではありません」と矛盾 | **HUMAN_REVIEW** |
| `who-should-choose-golf-dtv.md` | L166 | 「DTV申請費用（10,000バーツ＜約4万円〉、※国籍によって免除あり）」 | 10,000 THB＝ビザ手数料（政府fee）の記載自体は正確。免除注記は韓国籍等への配慮として適切 | OK（変更不要） |

---

## G. 2026-08-31 Supporting Documents 未対応記事

以下の記事はProof of Permanent Residence / Certificate of Criminal Record Clearanceに言及しておらず、更新が必要。

**P1対象**（直接関係あり）:
- dtv-acceptance-letter.md（updated: 2026-04-29）
- dtv-acceptance-letter-checkpoints.md（updated: 2026-05-05）
- dtv-common-document-mistakes.md（updated: 2026-05-05）
- dtv-application-timeline.md（updated: 2026-06-02）
- dtv-processing-time.md（updated: 2026-06-02）
- dtv-family-documents.md（updated: 2026-06-02）
- dtv-freelance-proof.md（updated: 2026-05-05）
- dtv-interview-format.md（updated: 2026-05-05）
- dtv-interview-questions.md（updated: 2026-05-05）
- golf-dtv-vs-soft-power.md（updated: 2026-05-16）
- dtv-soft-power.md（updated: 2026-05-05）
- dtv-soft-power-comparison.md（updated: 2026-05-05）
- dtv-soft-power-vs-freelance.md（updated: 2026-05-16）
- dtv-entry-checks.md（updated: 2026-05-05）
- dtv-extension-and-reentry.md（updated: 2026-05-05）
- dtv-work-limitations.md（updated: 2026-05-05）

**P2対象**（間接的関係）:
- dtv-over-50.md
- dtv-job-change-after-application.md

---

## H. translation_targets:[] 記事一覧

以下の記事はローカライズ対象が未設定。今後の多言語展開方針で要確認。

| ファイル | 備考 |
|---|---|
| golf-dtv-vs-soft-power.md | P1修正対象にも含まれる |
| dtv-application-timeline.md | P1修正対象 |
| dtv-over-50.md | P2修正対象 |
| dtv-job-change-after-application.md | P2修正対象 |
| dtv-life-setup.md | P2修正対象 |
| dtv-bank-account.md | P2修正対象 |
| dtv-evisa-form-guide.md | P2修正対象 |

---

## I. 自動修正推奨順（K）

### Phase 1：P1 修正（高優先）

1. **dtv-acceptance-letter.md** — 8/31更新追加、固定時間「1〜3週間」柔軟化、Source Note追加
2. **dtv-common-document-mistakes.md** — 8/31更新追加、Source Note追加
3. **dtv-application-timeline.md** — 固定時間複数箇所柔軟化、8/31更新追加
4. **dtv-processing-time.md** — 固定時間「1〜3週間程度」柔軟化、8/31更新追加
5. **dtv-entry-checks.md** — 8/31更新追加、updated_at更新
6. **dtv-extension-and-reentry.md** — 8/31更新追加、Source Note追加
7. **dtv-bank-balance.md** — 固定時間「数日〜1週間」柔軟化、Source Note追加
8. **dtv-soft-power.md** — 8/31更新追加、broken link修正（`/ja/dtv-acceptance-letter`→`/ja/blog/dtv-acceptance-letter`）、Source Note追加
9. **dtv-soft-power-comparison.md** — 8/31更新追加、Source Note追加
10. **dtv-soft-power-vs-freelance.md** — 8/31更新追加、Source Note追加
11. **dtv-freelance-proof.md** — 8/31コンテキスト追加、Source Note追加
12. **dtv-interview-format.md** — 8/31コンテキスト追加、Source Note追加
13. **dtv-interview-questions.md** — 8/31コンテキスト追加、Source Note追加
14. **dtv-acceptance-letter-checkpoints.md** — 8/31更新追加、broken link修正（`/ja/dtv-soft-power`→`/ja/soft-power`）
15. **dtv-work-limitations.md** — 8/31コンテキスト追加、Source Note追加
16. **golf-dtv-vs-soft-power.md** — 8/31更新追加、「確実性」表現修正、Source Note追加、translation_targets更新
17. **dtv-family-documents.md** — 8/31家族書類コンテキスト追加

### Phase 2：P1 参照記事

18. **dtv-application.md** — 固定時間表現（L102/261/333）柔軟化のみ

### Phase 3：P2 修正（中優先）

19–32. 各P2記事：Source Note追加、Answer First整備、frontmatter更新（translation_targets含む）

---

## J. HUMAN_REVIEW 判断事項（L）

### 1. who-should-choose-golf-dtv.md — Cannibalization + Mechanical Scoring

**必要な判断:**
- `golf-dtv-suitability.md` と primary_keyword「Golf DTV 向いている人」が完全重複している
- `who-should-choose-golf-dtv.md` L145「以下のうち3つ以上当てはまれば」は機械的スコアリング → `golf-dtv-suitability.md` の「機械的に判断するものではありません」と矛盾

**選択肢:**

| 案 | 内容 | リスク |
|---|---|---|
| A | `who-should-choose-golf-dtv.md` を削除し `golf-dtv-suitability.md` に統合 | slug変更=HUMAN_APPROVAL必要, 301リダイレクト設定も必要 |
| B | 両記事のprimary_keywordを差別化（例: who側は「Golf DTV 申し込み前チェック」等） | 軽微改修で対応可 |
| C | `who-should-choose-golf-dtv.md` のスコアリング部分を削除・再設計（`golf-dtv-suitability.md`のトーンに合わせる）し、差別化維持 | 本文大改変が必要 |

**推奨:** 案B + 案Cの組合せ（keyword差別化 + スコアリング表現削除）  
**自動化が止まる理由:** slug変更・記事削除・統合はHUMAN_APPROVAL_REQUIRED §18-21対象

---

## K. 作成ファイル（M）

- `docs/editorial/JA_BLOG_AUDIT_2026-09.md`（本ファイル）

---

## L. Commit SHA（N）

→ コミット後に追記

---

## 付録：全47記事 Primary Keyword / Search Intent 一覧

| ファイル | primary_keyword | search_intent_type | update_priority |
|---|---|---|---|
| dtv-visa.md | Destination Thailand Visa | informational | low |
| dtv-required-documents.md | DTV 必要書類 | informational | high |
| dtv-where-to-apply.md | DTV 申請先 | informational | high |
| dtv-application.md | DTV 申請方法 | process | high |
| dtv-application-nationality-notes.md | DTV 国籍別 注意点 | informational | medium |
| dtv-rejection-reasons.md | DTV 不承認 理由 | informational | medium |
| golf-dtv-overview.md | Golf DTV とは | informational | high |
| golf-dtv-what-is.md | Golf DTV サービス内容 | informational | medium |
| golf-dtv-plans.md | Golf DTV プラン 料金 | comparison | high |
| golf-dtv-documents.md | Golf DTV 必要書類 | informational | high |
| golf-dtv-application.md | Golf DTV 申し込み方法 | process | high |
| golf-dtv-suitability.md | Golf DTV 向いている人 | informational | medium |
| golf-dtv-comparison.md | Golf DTV 比較 | comparison | medium |
| golf-dtv-faq.md | Golf DTV よくある質問 | informational | medium |
| golf-dtv-mistakes.md | Golf DTV よくあるミス | informational | medium |
| golf-dtv-after-approval.md | DTV 承認後 手続き | process | high |
| dtv-soft-power.md | DTVソフトパワービザ | informational | high |
| dtv-soft-power-comparison.md | DTVソフトパワー 活動比較 | comparison | medium |
| dtv-soft-power-vs-freelance.md | DTVソフトパワー フリーランス 違い | comparison | high |
| dtv-freelance-proof.md | DTV フリーランス 仕事証明 | informational | high |
| dtv-portfolio-supporting-documents.md | DTV ポートフォリオ 補強資料 | informational | medium |
| dtv-interview-format.md | DTV 面接 形式 | informational | medium |
| dtv-upload-documents.md | DTV 書類アップロード | process | medium |
| dtv-interview-questions.md | DTV 面接 質問 | informational | medium |
| dtv-entry-checks.md | DTV 入国 確認事項 | informational | medium |
| dtv-extension-and-reentry.md | DTV 180日後 延長 再入国 | informational | high |
| dtv-income-proof.md | DTV 収入証明 | informational | medium |
| dtv-job-change-after-application.md | DTV 申請後 転職 | informational | low |
| dtv-over-50.md | DTV 50代 | informational | low |
| dtv-acceptance-letter.md | DTV 受入レター | informational | high |
| dtv-acceptance-letter-checkpoints.md | DTV 受入レター 確認ポイント | informational | medium |
| dtv-bank-account.md | DTV タイ 銀行口座 | informational | low |
| dtv-work-limitations.md | DTV 仕事 制限 | informational | medium |
| dtv-bank-balance.md | DTV 残高証明 | informational | high |
| dtv-bank-balance-faq.md | DTV 残高証明 FAQ | informational | medium |
| golf-dtv-vs-soft-power.md | Golf DTV ソフトパワー 比較 | comparison | medium |
| dtv-evisa-form-guide.md | DTV e-Visa フォーム 書き方 | process | medium |
| dtv-common-document-mistakes.md | DTV 書類ミス | informational | high |
| dtv-processing-time.md | DTV 審査期間 | informational | high |
| dtv-family-documents.md | DTV 家族 書類 | informational | medium |
| dtv-life-setup.md | DTV タイ生活 準備 | informational | low |
| thailand-long-stay-visa-comparison.md | タイ 長期滞在 ビザ 比較 | comparison | medium |
| dtv-application-timeline.md | DTV 申請 スケジュール | process | high |
| dtv-digital-nomad-visa.md | タイ デジタルノマド ビザ | informational | low |
| dtv-soft-power.md | DTVソフトパワービザ | informational | high |
| dtv-vs-ltr.md | DTV LTR ビザ 比較 | comparison | medium |
| dtv-vs-retirement-visa.md | DTV リタイアメントビザ 比較 | comparison | medium |
| dtv-vs-thailand-privilege.md | DTV タイランドプリビレッジ 比較 | comparison | medium |
| who-should-choose-golf-dtv.md | Golf DTV 向いている人 (**重複**) | informational | medium |

---

*このファイルは監査専用ドキュメントです。記事本文は変更していません。*
*次ステップ: K節の推奨順に従いPhase 1修正を開始してください（各記事1コミット）。*
