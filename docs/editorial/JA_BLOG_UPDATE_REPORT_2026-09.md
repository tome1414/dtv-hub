# JA Blog Update Report — 2026-09 Audit

**Completed:** 2026-09-16  
**Scope:** 31 JA blog articles + 1 reference article (dtv-application.md)  
**JA実記事数（最終）:** 46本（47 - 1 deleted: who-should-choose-golf-dtv.md）  
**Build status:** PASSED (278 pages, TypeScript clean)

---

## Summary

Applied the 2026-09 editorial audit to all 31 SAFE_AUTO_FIX JA articles (17 P1 + 14 P2) plus the dtv-application reference article. Each article received one dedicated commit.

**Transforms applied per article:**
- `updated_at` bumped to 2026-09-16
- `must_link_pages`: bare `dtv-*` slugs → `/ja/blog/dtv-*` absolute paths
- Body internal links: same fix (blog articles get `/blog/` prefix; app pages kept as-is)
- Deleted-article redirect: `/ja/blog/who-should-choose-golf-dtv` → `/ja/blog/golf-dtv-suitability` (5 articles)
- 2026-08-31 update note inserted where article topic is directly affected
- Source Note table added before closing disclaimer
- Time expressions softened where flagged (no hard processing-time claims)
- `translation_targets: []` → `["en"]` where EN counterpart confirmed (3 articles)

---

## P1 Articles (17/17 complete)

| # | File | SHA | Key changes |
|---|---|---|---|
| 1 | dtv-acceptance-letter.md | 50e5242 | updated_at, must_link, 8/31 note, source note |
| 2 | dtv-common-document-mistakes.md | 87b43f7 | updated_at, must_link, 8/31 note, source note |
| 3 | dtv-application-timeline.md | 1f295fc | updated_at, translation_targets+en, 8/31 note, time softened, source note |
| 4 | dtv-processing-time.md | 5d4e968 | updated_at, must_link, 8/31 note, source note |
| 5 | dtv-entry-checks.md | 46613af | updated_at, must_link, 8/31 note, source note |
| 6 | dtv-extension-and-reentry.md | 05e1c97 | updated_at, must_link, 8/31 note, source note |
| 7 | dtv-bank-balance.md | a1cbaa8 | updated_at, source note |
| 8 | dtv-soft-power.md | 2885876 | updated_at, must_link, who-should-choose redirect, 8/31 note, source note |
| 9 | dtv-soft-power-comparison.md | 7e1cc1c | updated_at, must_link, 8/31 note, source note |
| 10 | dtv-soft-power-vs-freelance.md | 97af6d3 | updated_at, must_link, who-should-choose redirect, 8/31 note, source note |
| 11 | dtv-freelance-proof.md | 719dc3c | updated_at, must_link, 8/31 note, source note |
| 12 | dtv-interview-format.md | b07e2ee | updated_at, must_link, 8/31 note, source note |
| 13 | dtv-interview-questions.md | 7d730c6 | updated_at, must_link, 8/31 note, source note |
| 14 | dtv-acceptance-letter-checkpoints.md | 8d515bf | updated_at, must_link, 8/31 note, source note |
| 15 | dtv-work-limitations.md | 8e1eb9e | updated_at, must_link, 8/31 note, source note |
| 16 | golf-dtv-vs-soft-power.md | bdb3536 | updated_at, translation_targets+en, 書類準備の確実性→信頼性, 8/31 note, source note |
| 17 | dtv-family-documents.md | af2be31 | updated_at, must_link, 8/31 note (full), source note |

---

## P2 Articles (14/14 complete)

| # | File | SHA | Key changes |
|---|---|---|---|
| 18 | dtv-portfolio-supporting-documents.md | e379b9c | updated_at, must_link, source note |
| 19 | dtv-upload-documents.md | 60af0ad | updated_at, must_link, source note |
| 20 | dtv-income-proof.md | db3f848 | updated_at, must_link, source note |
| 21 | dtv-job-change-after-application.md | 992e0ec | updated_at, translation_targets+en, must_link, source note |
| 22 | dtv-over-50.md | 4e4609b | updated_at, must_link, 8/31 note, source note (Tier A+C) |
| 23 | dtv-bank-account.md | 4669e5a | updated_at, must_link, source note |
| 24 | dtv-bank-balance-faq.md | 57a21e8 | updated_at, must_link, 数日〜1週間 softened, source note |
| 25 | dtv-evisa-form-guide.md | a11d87e | updated_at, translation_targets+en, source note |
| 26 | dtv-life-setup.md | 128624d | updated_at, must_link, source note |
| 27 | thailand-long-stay-visa-comparison.md | 725c330 | updated_at, must_link, who-should-choose redirect, source note (Tier A×2) |
| 28 | dtv-digital-nomad-visa.md | 99a6a20 | updated_at, must_link, source note |
| 29 | dtv-vs-ltr.md | 148bec6 | updated_at, must_link, who-should-choose redirect, source note (Tier A×2) |
| 30 | dtv-vs-retirement-visa.md | 1267354 | updated_at, must_link, who-should-choose redirect, source note |
| 31 | dtv-vs-thailand-privilege.md | 65fab2e | updated_at, must_link, source note |

---

## Reference Article

| File | SHA | Key changes |
|---|---|---|
| dtv-application.md | f7769da | **P2軽微修正（時間表現のみ）**: L102「2〜4週間かかるため」→「相応の準備期間が必要なため」、L261「1〜3週間程度」→「数週間程度（公館・時期によって異なります）」、L333同様。updated_at変更なし（2026-09-13維持）。事前分類「NO_CHANGE」は誤りで実際は修正実施。 |

---

## Decisions & Exceptions

**Time expressions retained (exceptions):**
- `dtv-acceptance-letter.md` L131: Tier C service time, already qualified "（機関・サービスによる）"
- `dtv-bank-balance.md` L80: Bank processing time (non-visa activity)
- `dtv-processing-time.md` L47: Already qualified "公館や時期によって変動します"

**Links not changed (valid app pages):**
- `/ja/dtv-application` — app page, correct as-is
- `/ja/dtv-soft-power-vs-freelance` — app page, correct as-is
- `/ja/who-should-choose-golf-dtv` — app page, correct as-is in must_link

**`/ja/blog/who-should-choose-golf-dtv` → `/ja/blog/golf-dtv-suitability`** applied in **5 articles**: dtv-soft-power, dtv-soft-power-vs-freelance, dtv-vs-ltr, dtv-vs-retirement-visa, thailand-long-stay-visa-comparison. Grep confirmed 0 remaining occurrences of `/ja/blog/who-should-choose-golf-dtv`.

**`/ja/who-should-choose-golf-dtv`** (APP PAGE URL, no `/blog/` prefix) links remain in 7 articles' must_link_pages and bodies — these correctly point to the still-existing LP at `src/app/[lang]/who-should-choose-golf-dtv/page.tsx` and require no change.

**Numerical data:** No unverified prices/percentages/timeframes were migrated between articles per coordinator constraint.

**golf-dtv-suitability.md (commit 832d25c):** Golf course price FAQ (3,000〜8,000 THB/round) that was initially migrated from deleted who-should-choose-golf-dtv.md was subsequently removed. Reason: value not registered in GOLFDTV_CONFIRMED_FACTS.md and source was an outdated unverified article (2026-04-29). Removed before push to master.

**SEO処理確認（who-should-choose-golf-dtv）:**
- `/ja/blog/who-should-choose-golf-dtv`: MDファイル削除済み → SSGでページ非生成 → Sitemapから自動除外
- 301リダイレクト: `next.config.ts` に設定済み（permanent: true）
- Internal links: `/ja/blog/who-should-choose-golf-dtv` 0件（confirmed by grep）
- Canonical参照: なし（ページ非生成のため）

---

## Build Verification

```
npx tsc --noEmit   → PASS (no errors)
npx next build     → PASS (278 pages, compiled in 36.3s)
```
