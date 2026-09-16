# Cross-Language Final QA — JA / EN / KO — 2026-09

Date: 2026-09-17
Scope: `src/content/blog/ja/`, `src/content/blog/en/`, `src/content/blog/ko/` — all articles, post-SAFE_AUTO_FIX and post-KO-GolfDTV-localization state.
Mode: READ-ONLY audit. Only unambiguous mechanical link-typo bugs were fixed inline (see Section G); everything else is reported for a human decision.
Method: three parallel read-only audits (one per language, via Explore subagents) covering checks 1–11, cross-verified by direct `grep`/`Read` spot-checks on every "clear bug" claim before inclusion here; build/typecheck run directly.

---

## A. JA Article Count

**46 articles** (47 − 1 deleted: `who-should-choose-golf-dtv.md`)

## B. EN Article Count

**46 articles** (47 − 1 deleted: `who-should-choose-golf-dtv.md`)

## C. KO Article Count

**46 articles** (47 − 1 deleted: `who-should-choose-golf-dtv.md`)

Build-verified: 46 static `.html` blog pages generated per language for ja/en/ko (see Section P). Counts match exactly.

---

## D. Controlled Fact Conflicts

**PASS — no conflicts found in any language.**

- GolfDTV pricing (Silver 20,000 / Gold 50,000 / Platinum 100,000 THB, Application Support +10,000 THB, VAT applies): consistent everywhere it appears. Only stated in blog body text in a handful of KO golf-dtv-cost.md; JA/EN correctly defer to the `/​<lang>​/golf-dtv` landing page instead. No numeric mismatch found in any of the three languages.
- 96% historical approval rate: **0 occurrences in JA**, **0 in EN**, **0 in KO** blog articles (correctly deferred to the landing page in all three — not a conflict, just a consistent absence).
- 7-day fastest approval: **1 occurrence in JA** (`golf-dtv-faq.md`, correctly hedged: "過去に最短7日の承認実績がありますが、これは標準期間や保証日数ではありません"), **0 in EN**, **0 in KO**. Not a conflict (the one JA instance is correctly worded), but flagged as a minor cross-language distribution inconsistency — not something to fix, just noted.
- October 2026 update / Club Thailand partnership: JA and KO both consistently frame this as "予定"/"예정" (planned, not yet live) with zero "already available" overreach found. **EN has zero mentions of October or Club Thailand anywhere in blog content** — not a contradiction (nothing to contradict), but a content gap: EN readers get no forward-looking messaging on this topic at all, unlike JA/KO. Noted for editorial awareness only.
- No new/different price, approval rate, or approval claim was found in any language.

## E. Mission-Specific Leakage

**PASS — no leakage found.**

- Fukuoka (JA): appears in 13 files; every substantive claim is explicitly hedged as one-mission-only (e.g. "これは福岡総領事館での確認例です。東京・大阪等の他の公館では要件が異なる場合があります"). Plain geographic listings (Fukuoka as one of several Japan consulates) are not generalizations. Fine.
- Fukuoka (EN/KO): zero mentions in either corpus. Fine — no leakage.
- Seoul Tier B (JA/EN): zero mentions of Seoul/Korean-embassy-specific procedural facts in either corpus. Fine — no leakage into JA/EN.
- Seoul Tier B (KO): ~40 occurrences across 16 files, every one scoped with either an inline disclaimer ("이는 서울 공관에서 직접 확인된 정보이며, 다른 공관에 그대로 적용되지 않을 수 있습니다") or a labeled Source Note row ("주한 태국 왕국 대사관 — 직접 확인 안내 | B등급"). No instance treats a Seoul-specific fact as a Thailand-wide rule, and no instance claims Seoul embassy endorsement/partnership with GolfDTV. Fine.

## F. Currency Issues

| Language | Status | Detail |
|---|---|---|
| **JA** | **NEEDS ATTENTION** | Static JPY conversions ("約200万円相当") for the 500,000 THB government financial-evidence figure remain in **9 files**: `dtv-bank-balance.md`, `dtv-bank-balance-faq.md`, `dtv-digital-nomad-visa.md`, `dtv-income-proof.md`, `dtv-soft-power-vs-freelance.md`, `dtv-visa.md`, `dtv-vs-ltr.md`, `dtv-vs-retirement-visa.md`, `thailand-long-stay-visa-comparison.md`. This directly contradicts the currency-cleanup goal already applied to EN and KO for the same figure, and is applied inconsistently even within JA (`dtv-required-documents.md`, `golf-dtv-documents.md`, `dtv-over-50.md` carry no such conversion for the same 500,000 THB figure). One instance also carries a static JPY conversion on the 10,000 THB government visa fee (`dtv-digital-nomad-visa.md:106`). **Clear bug, verified by direct read**: `thailand-long-stay-visa-comparison.md:164-165` — Thailand Privilege pricing conversions are off by **10×** ("650,000タイバーツ〜（約26万円）" should read ≈260万円 at the ~4円/THB rate used elsewhere in the same file; "2,500,000タイバーツ〜（約100万円）" should read ≈1,000万円). Not fixed in this pass (numeric-content correction, outside the narrow link-typo SAFE_FIX scope authorized for this audit) — recommend as the highest-priority fast-follow fix. |
| **EN** | **PASS** | No improper USD/EUR/GBP conversions found on any THB government/GolfDTV figure. LTR's own official USD-denominated thresholds correctly retained as the documented exception. |
| **KO** | **PASS** | Zero KRW conversions found anywhere (confirms the KRW-removal work from the KO Fact QA pass held). USD appears only for (a) other countries' digital-nomad-visa comparison figures and (b) LTR's own official USD thresholds — both legitimate exceptions. |

## G. Broken Links

| Language | Status | Detail |
|---|---|---|
| **JA** | **FIXED (SAFE_FIX applied this session)** | Found and fixed: `/ja/dtv-required-documents`, `/ja/dtv-bank-balance`, `/ja/dtv-where-to-apply`, `/ja/dtv-interview-format` were missing the `/blog/` prefix across 10 files (`must_link_pages` frontmatter + body links) — an exact instance of the mechanical link-typo class this audit was authorized to auto-fix. All 10 files corrected to `/ja/blog/dtv-*`; verified zero remaining instances; typecheck + build re-run clean after the fix. Commit `d583c87`. |
| **EN** | **PASS** | No missing-`/blog/`-prefix links found. Legitimate app-page exceptions (`/en/dtv-application`, `/en/dtv-soft-power-vs-freelance`, `/en/who-should-choose-golf-dtv`, `/en/guide/evisa-form`) correctly left unprefixed. |
| **KO** | **PASS** | No missing-`/blog/`-prefix links found, including inside the 9 recently-rewritten golf-dtv-* articles (every internal link target verified to resolve to an existing file). |
| **All 3** | **PASS** | `/ja/blog/who-should-choose-golf-dtv`, `/en/blog/who-should-choose-golf-dtv`, `/ko/blog/who-should-choose-golf-dtv` — **zero remaining references in any language.** All remaining `who-should-choose-golf-dtv` mentions (JA: 7 files, EN: 3 files, KO: 2 files) correctly use the unprefixed app-page path, confirmed to still resolve to the surviving app page. |

## H. Redirect Issues

**PASS.** `next.config.ts` contains all three required redirects, verified directly:
```
/ja/blog/who-should-choose-golf-dtv → /ja/blog/golf-dtv-suitability
/en/blog/who-should-choose-golf-dtv → /en/blog/golf-dtv-suitability
/ko/blog/who-should-choose-golf-dtv → /ko/blog/golf-dtv-suitability
```
The pre-existing `dtv-fee-by-nationality → dtv-application-nationality-notes` redirect is also present for all three languages. No missing or misconfigured redirects found.

## I. Canonical / Sitemap Issues

**PASS.** `src/app/sitemap.ts` generates blog URLs dynamically via `fs.readdirSync` over each language's content directory — since the deleted article no longer exists on disk in any of the three directories, it cannot appear in the sitemap for any language; no code or stale-entry fix was needed. The static `/who-should-choose-golf-dtv` entry in `sitemap.ts`'s `staticPages` array correctly refers to the surviving **app page** (applied identically across all 5 site locales including `zh`/`ru`), not the deleted blog article. `canonical` is generated per-article from `${lang}/blog/${slug}` in `generateMetadata()` — no hardcoded or cross-language canonical values found; no slug collisions detected (each language directory has its own independent 46 unique slugs). `src/app/[lang]/who-should-choose-golf-dtv/page.tsx` (the APP PAGE) confirmed intact and un-deleted.

## J. Cross-Language Contamination

| Language | Status | Detail |
|---|---|---|
| **JA** | **PASS** | Full Unicode scan for stray Hangul/unexpected fragments: zero matches. |
| **EN** | **PASS** | Full Unicode scan for stray Hiragana/Katakana/CJK/Hangul: zero matches across all 46 files. |
| **KO** | **NEEDS ATTENTION** | Stale Japanese-translation-style artifacts remain **outside** the 9 already-rewritten golf-dtv-* articles (confirmed by direct grep): **"레포트"** in `dtv-life-setup.md` (2 instances, should be "신고"); **"특전"** in `dtv-vs-thailand-privilege.md` and `thailand-long-stay-visa-comparison.md` (should be "혜택"); **"수강료"** used for a golf-program fee in `dtv-application-timeline.md` (2 instances, should be "이용료"/"프로그램 비용"). "코스피", "그레이 영역", "정주", and "일본(또는 한국)"-style framing were checked and found **clean repo-wide** (zero matches) — those specific fixes from the earlier localization pass held. Additionally: inconsistent full-width Japanese-style parentheses "（）" (vs. standard "()") found in `dtv-application-nationality-notes.md` (16×), `dtv-application.md` (4×), `dtv-visa.md` (1×), `thailand-long-stay-visa-comparison.md` (1×) — a minor typographic inconsistency, not a translation error. |

## K. 2026-08-31 Rule Issues

| Language | Status | Detail |
|---|---|---|
| **JA** | **Minor, defensible** | 16/46 articles carry the note. Two omissions are borderline: `dtv-bank-balance.md` and `dtv-vs-ltr.md` discuss DTV financial/document requirements without the 8/31 reference, while sibling articles on similar topics do include it. Not clearly wrong (financial evidence is a separate, unaffected requirement), but inconsistent enough to flag. |
| **EN** | **Minor inconsistency** | `dtv-bank-balance-faq.md` has no 2026-08-31 reference at all, while its direct sibling `dtv-bank-balance.md` (same topic) does. Verified directly (zero hits for "2026-08-31"/"Permanent Residence"/"Criminal Record" in the FAQ variant). |
| **KO** | **REGRESSION — verified, caused by this session's own GolfDTV localization rewrite** | `golf-dtv-cost.md`, `golf-dtv-comparison.md`, and `golf-dtv-suitability.md` **completely lost** their 2026-08-31 update note during the ground-up Korean-market rewrite earlier this session, despite `KO_BLOG_UPDATE_REPORT_2026-09.md` §F recording that the note had been added to all three in the prior SAFE_AUTO_FIX pass. Verified directly: zero hits for "2026-08-31" or "영주권" in any of the three files. Sibling articles from the same rewrite batch (`golf-dtv-overview.md`, `golf-dtv-documents.md`, `golf-dtv-process.md`) correctly retained/restated it, so this is an inconsistent omission, not a deliberate scope decision. Additionally, `golf-dtv-mistakes.md` and `golf-dtv-faq.md` discuss the criminal-record-certificate requirement in depth but never mention the paired "영주권 증명서" (permanent residence) requirement or the 2026-08-31 effective date, unlike every other document-adjacent KO article. **Not fixed in this pass** (content restoration, outside this audit's narrow SAFE_FIX authorization) — recommended as a priority fast-follow, since it is a genuine regression this agent introduced. |

## L. October Status Issues

**PASS in JA and KO** — every "10월"/"10月" mention uses "予定"/"예정" (planned) framing; zero "already available"/"currently offering" instances found in either language. **No content to audit in EN** (zero October/Club Thailand mentions anywhere in the EN blog corpus — see Section D; this is a gap, not a violation).

## M. Cannibalization Risks

| Language | Status | Detail |
|---|---|---|
| **JA** | **PASS** | All 46 `primary_keyword` values distinct; no duplicates or near-duplicates found. |
| **EN** | **NEEDS ATTENTION (low-moderate)** | Two near-duplicate keyword pairs flagged (not fixed — reporting only, per instructions to not merge/delete): `dtv-acceptance-letter.md` ("DTV acceptance letter Thailand") vs. `dtv-acceptance-letter-checkpoints.md` ("DTV acceptance letter checklist"); `dtv-bank-balance.md` ("DTV visa bank balance requirement") vs. `dtv-bank-balance-faq.md` ("DTV bank balance certificate FAQ"). Both pairs look like an intentional main-guide-vs-FAQ/checklist pattern rather than accidental duplication, but the second pair compounds with the Section K finding (the FAQ variant is missing the 8/31 update the main guide has), so it's worth a consistency pass rather than a structural merge. |
| **KO** | **PASS** | All 46 `primary_keyword` values distinct, including no overlap between the 9 rewritten golf-dtv-* keywords and the other 37 articles. |

## N. Schema Issues

**Two distinct findings — one structural (all languages), one per-file (each language).**

### N-1. Structural finding: `schema_types` frontmatter is entirely non-functional (all 3 languages)

Verified directly by reading `src/app/[lang]/blog/[slug]/page.tsx`: the JSON-LD actually emitted for **every** blog article, in **every** language, is hardcoded to exactly `Article` + `BreadcrumbList` — the `schema_types` frontmatter field is **never read anywhere in the codebase** (confirmed via repo-wide grep: no file outside `src/lib/seo-schemas/blog-posting.ts` even imports it, and that file's `generateFAQSchema`/`generateBlogPostingSchema` helper functions are themselves never imported or called from any page component). This means:
- Every individual "FAQPage missing from schema_types" or "schema-only FAQ" finding listed below has **zero live SEO impact** in either direction — the frontmatter value doesn't change what's actually rendered.
- More importantly: **no article in any language currently emits FAQPage JSON-LD at all**, regardless of frontmatter, so the site is not eligible for any FAQ rich results anywhere. This is a code-level gap, not a content-editorial one.
- **Classification: HUMAN_REVIEW** — fixing this requires a developer decision (wire `schema_types`/FAQ content into `page.tsx`, or remove the unused `schema_types` field and `blog-posting.ts` helpers if FAQ rich results aren't wanted). Out of scope for a content-only editorial pass.

### N-2. Per-file frontmatter/content mismatches (informational only, given N-1)

| Language | Visible FAQ but missing `FAQPage` in frontmatter | `FAQPage` in frontmatter but no visible FAQ |
|---|---|---|
| JA | `dtv-life-setup.md` | none (initial `golf-dtv-faq.md` flag was a false positive — it has a real Q1–Q15 FAQ body, just no literal "## FAQ" heading) |
| EN | `dtv-life-setup.md`, `golf-dtv-documents.md`, `golf-dtv-mistakes.md`, `golf-dtv-process.md`, `golf-dtv-suitability.md`, `golf-dtv-vs-soft-power.md` | `golf-dtv-overview.md` (has a "Common Misconceptions" Q&A-style section but not labeled/structured as FAQ — borderline) |
| KO | `dtv-application-timeline.md`, `dtv-evisa-form-guide.md`, `dtv-life-setup.md`, `dtv-rejection-reasons.md` | none confirmed (borderline: `golf-dtv-vs-soft-power.md` has a "자주 있는 오해" section, not a literal FAQ) |

Notably `dtv-life-setup.md` has this mismatch in **all three languages** — likely a shared oversight from whatever template/process originally set `schema_types` for this article. Given N-1, none of this is urgent, but if the code-level gap is ever fixed, these frontmatter values should be reconciled first.

## O. Frontmatter Issues

**PASS in all three languages.** Spot-checks (10 files per language, mixing recently-edited and untouched files) found all required fields (`title`, `slug`, `lang`, `primary_keyword`, `updated_at`, `translation_targets`, `schema_types`) present and well-formed in every sampled file. No broken YAML, no missing required fields.

## P. Build / TypeScript QA

**PASS.**

- `npx tsc --noEmit`: clean, no errors (run twice — before and after the JA link-typo SAFE_FIX in Section G).
- `npm run build` (clean `.next` cache): `✓ Compiled successfully`, `✓ Generating static pages (276/276)`, no errors, no warnings beyond the expected CRLF line-ending notices from git on Windows.
- Verified directly from the build output on disk: **46 blog `.html` pages generated for each of ja/en/ko** (exact match to source file counts); **zero** `who-should-choose-golf-dtv` blog pages generated for any of the three (correctly absent); the `who-should-choose-golf-dtv` **app page** `.html`/`.meta`/`.rsc` correctly generated for all three languages. No duplicate routes, no missing routes.

## Q. HUMAN_REVIEW Items

1. **`schema_types`/FAQPage is dead code site-wide** (Section N-1) — developer decision needed on whether to wire it up or remove it. Affects all 3 languages equally; not a content bug.
2. **KO 8/31 regression in `golf-dtv-cost.md`, `golf-dtv-comparison.md`, `golf-dtv-suitability.md`** (Section K) — needs an editorial decision on the right form of restoration (full block vs. brief context note, matching the pattern already used in the other 6 rewritten golf-dtv-* articles) before it's applied, since it's a content decision, not a pure mechanical fix.
3. **JA 10× currency-conversion math error** in `thailand-long-stay-visa-comparison.md:164-165` (Section F) — needs a decision on the correct remedy: fix the arithmetic, or drop the JPY conversion entirely to match the policy already applied to the equivalent 500,000 THB figure elsewhere in EN/KO.
4. **JA widespread static JPY conversions on the 500,000 THB figure** across 9 files (Section F) — needs an editorial decision on whether JA should adopt the same "no static conversion" policy already applied in EN/KO for this figure, given `dtv-bank-balance.md`'s entire premise currently depends on the JPY framing.

None of these were auto-fixed in this pass, per the read-only scope of this audit.

## R. Overall Status

| Category | JA | EN | KO |
|---|---|---|---|
| Controlled Fact parity | PASS | PASS | PASS |
| Mission-specific leakage | PASS | PASS | PASS |
| Currency | **NEEDS ATTENTION** (widespread + 1 math bug) | PASS | PASS |
| Broken links | **FIXED this session** | PASS | PASS |
| Redirects | PASS | PASS | PASS |
| Canonical/sitemap | PASS | PASS | PASS |
| Language contamination | PASS | PASS | **NEEDS ATTENTION** (residual JA artifacts outside the 9 rewritten articles) |
| 8/31 rule | Minor (2 borderline) | Minor (1 inconsistency) | **REGRESSION** (3 files) |
| October status | PASS | N/A (no content) | PASS |
| Cannibalization | PASS | Minor (2 pairs, reported only) | PASS |
| Schema | Structural dead-code gap (all 3 langs) + 1 file | Structural + 6 files | Structural + 4 files |
| Frontmatter | PASS | PASS | PASS |
| Build/typecheck | PASS | PASS | PASS |

**Overall: SAFE_FIX applied for the one class of issue explicitly authorized (JA broken-link-prefix typos, 10 files, commit `d583c87`). Everything else is reported, not fixed.** The most consequential items for follow-up are, in priority order: (1) the KO 8/31 regression this session introduced, (2) the JA 10× currency math error, (3) the JA-wide static-JPY-conversion policy gap versus EN/KO, (4) the residual KO translation artifacts outside the 9 rewritten articles, (5) the site-wide FAQPage schema dead-code gap (developer-level, not content).

---

*Cross-language final QA complete. Build clean (276/276 pages). One SAFE_FIX commit applied (`d583c87`). No other content changes made — all other findings are reported for human decision.*
