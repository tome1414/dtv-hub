# KO Blog Update Report — 2026-09

Date: 2026-09-16 (SAFE_AUTO_FIX execution + same-day Fact QA correction pass)
Scope: `src/content/blog/ko/` SAFE_AUTO_FIX execution, following `KO_BLOG_AUDIT_2026-09.md` classification and the confirmed HUMAN_REVIEW decisions. A follow-up Fact QA pass (same day) audited the KRW-conversion and health-insurance changes for policy/factual correctness before final approval; findings are integrated into Sections K and P below.
Executor: Claude Code (Sonnet 5)

---

## A. KO Article Count

- Pre-execution: 47 articles
- Post-execution: 46 articles (1 deleted — cannibalization resolution)

## B. Auto-Fix Completion Summary

| Category | Planned | Completed |
|---|---|---|
| Cannibalization resolution | 1 | 1 |
| Phase 0 (direct-link fee page) | 6 | 6 |
| P1 (SAFE_AUTO_FIX high priority) | 29 | 29 |
| P2 (SAFE_AUTO_FIX medium priority) | 17 | 17 |
| **Total articles touched** | **46** (+1 delete) | **46** (+1 delete) |

All Phase 0 fixes were folded into each article's own P1 commit rather than a separate pass, since every Phase-0 article also required full P1 treatment.

## C. P0 / P1 / P2 Completed Articles (name + commit SHA)

### Cannibalization (executed first, per approved HUMAN_REVIEW decision)

| Article | Action | Commit SHA |
|---|---|---|
| who-should-choose-golf-dtv.md | Deleted, 301 redirect to golf-dtv-suitability added, minimal verified content merged | `ff2b707` |
| golf-dtv-suitability.md | Received merged content + Phase 0 link fix + 8/31 context + timeline softening | `0d0d3f9` (content merge in `ff2b707`) |

### P1 — High Priority (29 articles)

| # | Article | Commit SHA |
|---|---|---|
| 1 | dtv-required-documents.md | `d9f2c31` |
| 2 | dtv-application.md | `94b2eba` |
| 3 | dtv-visa.md | `9aa0765` |
| 4 | dtv-where-to-apply.md | `7e9873a` |
| 5 | dtv-soft-power.md | `28df768` |
| 6 | dtv-acceptance-letter.md | `c74c828` |
| 7 | golf-dtv-documents.md | `e8228b4` |
| 8 | dtv-family-documents.md | `40b81a4` |
| 9 | dtv-common-document-mistakes.md | `fa16ddf` |
| 10 | dtv-acceptance-letter-checkpoints.md | `aec5a9b` |
| 11 | dtv-processing-time.md | `ac8bd91` |
| 12 | dtv-soft-power-comparison.md | `8c1abac` |
| 13 | dtv-soft-power-vs-freelance.md | `693f638` |
| 14 | dtv-freelance-proof.md | `d45e29d` |
| 15 | dtv-upload-documents.md | `f4eb022` |
| 16 | dtv-interview-format.md | `75d9577` |
| 17 | dtv-interview-questions.md | `34fa958` |
| 18 | dtv-entry-checks.md | `0c7a930` |
| 19 | golf-dtv-suitability.md (cannibalization target) | `ff2b707`, `0d0d3f9` |
| 20 | golf-dtv-cost.md | `86dc12c` |
| 21 | golf-dtv-overview.md | `7b37bc1` |
| 22 | golf-dtv-comparison.md | `8374a3a` |
| 23 | golf-dtv-process.md | `605087c` |
| 24 | golf-dtv-mistakes.md | `dab6b18` |
| 25 | dtv-extension-and-reentry.md | `9710071` |
| 26 | dtv-work-limitations.md | `25ed438` |
| 27 | golf-dtv-after-approval.md | `dc87b50` |
| 28 | golf-dtv-faq.md | `f563a97` |
| 29 | golf-dtv-vs-soft-power.md | `abbd72d` |

### P2 — Medium Priority (17 articles)

| # | Article | Commit SHA |
|---|---|---|
| 1 | dtv-application-nationality-notes.md | `8573b37` |
| 2 | dtv-application-timeline.md | `03a47e5` |
| 3 | dtv-bank-account.md | `898638f` |
| 4 | dtv-bank-balance.md | `22b3b6d` |
| 5 | dtv-bank-balance-faq.md | `220c936` |
| 6 | dtv-digital-nomad-visa.md | `782c793` |
| 7 | dtv-evisa-form-guide.md | `eb1a2d5` |
| 8 | dtv-income-proof.md | `1de2f39` |
| 9 | dtv-job-change-after-application.md | `2effceb` |
| 10 | dtv-life-setup.md | `0b4e153` |
| 11 | dtv-over-50.md | `cc05674` |
| 12 | dtv-portfolio-supporting-documents.md | `136b624` |
| 13 | dtv-rejection-reasons.md | `513eae2` |
| 14 | dtv-vs-ltr.md | `6993a3c` |
| 15 | dtv-vs-retirement-visa.md | `f2db569` |
| 16 | dtv-vs-thailand-privilege.md | `4f6177f` |
| 17 | thailand-long-stay-visa-comparison.md | `9817be1` |

## D. HUMAN_REVIEW Remaining

None. The single HUMAN_REVIEW item from the audit (who-should-choose-golf-dtv cannibalization) was pre-approved and executed in this session. No new HUMAN_REVIEW items were generated during execution — no controlled-fact conflicts, ambiguous embassy claims, or slug/canonical questions arose that required stopping.

## E. Broken Link Fixes

- **Phase 0 direct-link fix** (6 articles): `/ko/blog/dtv-fee-by-nationality` → `/ko/blog/dtv-application-nationality-notes` in golf-dtv-cost, golf-dtv-overview, golf-dtv-comparison, golf-dtv-process, golf-dtv-suitability, golf-dtv-mistakes.
- **Missing `/blog/` prefix fixes**: ~50+ instances across `must_link_pages` frontmatter and body links corrected across nearly all 46 articles (e.g. `/ko/dtv-required-documents` → `/ko/blog/dtv-required-documents`). App-page routes without a blog article counterpart (`/ko/dtv-application`, `/ko/dtv-soft-power-vs-freelance`, `/ko/who-should-choose-golf-dtv`, `/ko/golf-dtv`, `/ko/requirements`) were left unprefixed, per the audit's "valid app page routes" table.
- **Two who-should-choose-golf-dtv references remain unprefixed** in dtv-over-50.md and dtv-soft-power-comparison.md — confirmed these point to the surviving APP PAGE (`/ko/who-should-choose-golf-dtv`), not the deleted blog article. This matches the JA precedent (same pattern left unchanged there after JA's equivalent cannibalization fix).

## F. 2026-08-31 Update Reflected

Full update block added to: dtv-required-documents, dtv-application, dtv-visa, dtv-soft-power, dtv-acceptance-letter, dtv-acceptance-letter-checkpoints, dtv-family-documents, dtv-common-document-mistakes, dtv-freelance-proof (context), dtv-soft-power-comparison, dtv-soft-power-vs-freelance, dtv-entry-checks (context), golf-dtv-documents, golf-dtv-cost, golf-dtv-overview, golf-dtv-comparison, golf-dtv-process, golf-dtv-mistakes, golf-dtv-suitability, golf-dtv-faq, golf-dtv-vs-soft-power.

Not added to articles where the search intent is unrelated to document requirements (interview format/questions, processing time, entry checks beyond a brief mention, work limitations, banking, life setup, after-approval, comparison articles, nationality notes) — consistent with the instruction not to mechanically apply this to all 46 articles.

## G. Seoul Tier B Reflected (10 designated articles)

| Article | Fact Used |
|---|---|
| dtv-required-documents.md | Entry/Exit Facts (2-day issuance window), criminal record 3-month validity |
| dtv-where-to-apply.md | Applicant in Korea on submission date; stay-in-Korea during review; not entering Thailand while pending |
| dtv-application.md | Stay-in-Korea during review; not entering Thailand while pending |
| dtv-evisa-form-guide.md | Applicant in Korea on submission date |
| dtv-family-documents.md | Adult dependents need own criminal record certificate; minor situation |
| dtv-rejection-reasons.md | Entry/Exit Facts missing / criminal record expired as rejection triggers |
| dtv-extension-and-reentry.md | Not entering Thailand while application pending |
| dtv-processing-time.md | Stay-in-Korea during review; third-country travel caution |
| dtv-interview-format.md | Consular confirmation generally not required since July 2025 (may still be requested) |
| dtv-application-nationality-notes.md | Formal Tier B attribution added to existing fee-exemption claim |

No Seoul Tier B facts were added outside this list (life-setup, banking, comparison, and after-approval articles were left untouched per the exclusion list). No claim of Seoul embassy endorsement or partnership with GolfDTV was introduced.

## H. Fee Exemption Reflected

Korean-national government-fee exemption was already correctly stated in 7 articles per the audit (no incorrect claims found). Added formal Seoul Tier B attribution to dtv-application-nationality-notes.md, the article of record for this fact.

## I. Guarantee / Approval Wording Fixed

| Article | Fix |
|---|---|
| dtv-soft-power.md | "대사관 규격에 맞는 서류 보장" → "서류 취득을 지원" |
| dtv-acceptance-letter.md | Same phrase → same softening |

Two other instances found during execution (dtv-acceptance-letter-checkpoints.md, dtv-portfolio-supporting-documents.md) were already phrased as explicit *disclaimers* ("no guarantee that..."), not overreach — left unchanged as correct.

## J. USD Removed

Removed standalone/parenthetical USD conversions from: dtv-required-documents, dtv-application, dtv-visa, dtv-bank-balance, dtv-digital-nomad-visa (DTV fee only — comparison-table USD figures for *other countries'* nomad visas were kept as legitimate comparison data), dtv-vs-thailand-privilege. Total: 6 articles, ~8 instances.

## K. KRW — Removed for 500,000 THB Financial Evidence (corrected 2026-09-16, post-QA)

An initial pass of this update (same-day) corrected an arithmetic error in dtv-income-proof.md's KRW figure for 500,000 THB instead of removing it, which on review conflicts with the confirmed KO currency policy (THB is Source of Truth for government requirements; no static KRW conversion should be added or retained for Financial Evidence). This was corrected in a follow-up Fact QA pass:

- **dtv-income-proof.md**: "50만 THB(약 1,900만원)" → "50만 THB" (KRW removed).
- **dtv-required-documents.md**: "500,000 THB 이상 (약 KRW 19,000,000)" → "500,000 THB 이상" (KRW removed).
- **dtv-bank-balance.md**: removed the "참고 환산" (reference conversion) table row and removed the FAQ entry "Q. 500,000 THB는 얼마인가요?" that existed solely to state the KRW conversion.
- A repo-wide search for other static KRW conversions tied to the 500,000 THB Financial Evidence figure found no further instances.
- **Resolved (final Fact QA pass, 2026-09-16):** dtv-application.md's government visa fee line "10,000 THB (약 KRW 380,000)" had its KRW conversion removed. In the same edit, added a Seoul Tier B note (Royal Thai Embassy Seoul direct confirmation) that Korean nationals applying via the Seoul embassy are currently fee-exempt — scoped explicitly to Korean nationals / Seoul embassy, not generalized to other nationalities or missions. Fix commit: `93da009`.
- LTR BOI-official USD thresholds retained unchanged in dtv-vs-ltr.md and thailand-long-stay-visa-comparison.md, per the confirmed exception (these are the LTR program's own officially USD-denominated figures, not a THB conversion).
- Fix commit: `59d9396`.

## L. Source Notes Added

Added the Korean Source Note template to all 46 remaining articles. 10 of these additionally carry the Seoul Tier B attribution row (see Section G). 3 comparison articles (dtv-vs-ltr, dtv-vs-retirement-visa, dtv-vs-thailand-privilege, thailand-long-stay-visa-comparison) carry additional Tier-A source rows for LTR/BOI, Immigration, and TAT where the article discusses those programs directly.

## M. Internal Link Improvements

Beyond the `/blog/` prefix fixes (Section E), corrected several body links that were not caught by the frontmatter audit table but shared the same defect (e.g. dtv-interview-questions.md's links to dtv-freelance-proof and dtv-acceptance-letter-checkpoints).

## N. Cannibalization Resolved

- Deleted `who-should-choose-golf-dtv.md` (KO).
- Added redirect `/ko/blog/who-should-choose-golf-dtv` → `/ko/blog/golf-dtv-suitability` in `next.config.ts`.
- Merged three Tier-A-consistent, unpriced facts into golf-dtv-suitability.md as a new FAQ section (golf experience not required, family must apply individually, no obligation to golf on every visit). Did **not** migrate unverified figures from the deleted article (e.g. "약 USD 14,000" balance conversion, "3,000–8,000 THB green fee" range).
- Confirmed the surviving APP PAGE `/ko/who-should-choose-golf-dtv` was not touched, and that dtv-over-50.md / dtv-soft-power-comparison.md already linked to that app page (not the deleted blog slug) — no link change needed there, matching JA precedent.

## O. Controlled Fact Conflicts

None found or introduced. GolfDTV pricing, 96% approval rate, 7-day fastest approval, and Club Thailand launch status were not mentioned in any KO blog article before or after this pass (correctly deferred to the `/ko/golf-dtv` landing page).

## P. Localization Improvements (Notable)

- dtv-soft-power.md: "일본(또는 한국)" → "한국(또는 일본)" — Korea-first framing corrected in an FAQ that had inherited Japan-first phrasing from the JA source structure.
- Health-insurance requirement language corrected in **5 articles** (dtv-application, dtv-visa, dtv-soft-power, dtv-soft-power-vs-freelance, dtv-vs-ltr — corrected from an earlier miscount of "4" in this report's original version) from a stated-as-mandatory "USD 40,000 coverage" figure to "requirement and amount vary by mission — confirm with your embassy," aligning with the project's health-insurance editorial rule (CLAUDE.md §1: insurance must not be presented as a primary confirmed required document, and specific dollar figures must not be asserted as mandatory). All 5 diffs were re-verified via `git show` in a follow-up Fact QA pass: every change targets **DTV's own** insurance claim only. In dtv-vs-ltr.md specifically, the LTR program's own distinct figure ("USD 50,000+") in the same article was verified untouched — no cross-visa confusion occurred. No Tier A source in this project's confirmed-facts files (`GOLFDTV_CONFIRMED_FACTS.md`, `DTV_2026_RULES.md`) supports "USD 40,000" as a current official DTV requirement; it was inherited, unattributed legacy text. Full per-file verification: see the response accompanying this report.
- Noted but not addressed in this pass (flagged for a future, larger localization pass, not SAFE_AUTO_FIX scope): the golf-dtv-* article series (golf-dtv-overview, golf-dtv-suitability, golf-dtv-comparison, golf-dtv-cost, golf-dtv-process, golf-dtv-mistakes, golf-dtv-faq, golf-dtv-after-approval, golf-dtv-vs-soft-power) reads as a mechanical translation from Japanese sentence structure rather than natural Korean (e.g. Japanese-loanword phrasing, JA-style term order). This was already noted in the audit's Section E and is a deeper rewrite than SAFE_AUTO_FIX covers.

## Q. Typecheck / Build Results

Re-run after each Fact QA correction pass; final run after the government-fee KRW/Seoul-Tier-B fix:

- `npx tsc --noEmit`: **PASS** (no output, no errors)
- `npm run build`: **PASS** — "✓ Compiled successfully in 2.6s", all `/[lang]/blog/[slug]` static pages generated including the updated KO set, no broken-route errors.

## R. Full Commit SHA List (chronological)

```
d9f2c31 dtv-required-documents
94b2eba dtv-application
9aa0765 dtv-visa
7e9873a dtv-where-to-apply
28df768 dtv-soft-power
c74c828 dtv-acceptance-letter
e8228b4 golf-dtv-documents
40b81a4 dtv-family-documents
fa16ddf dtv-common-document-mistakes
aec5a9b dtv-acceptance-letter-checkpoints
ac8bd91 dtv-processing-time
8c1abac dtv-soft-power-comparison
693f638 dtv-soft-power-vs-freelance
d45e29d dtv-freelance-proof
f4eb022 dtv-upload-documents
75d9577 dtv-interview-format
34fa958 dtv-interview-questions
0c7a930 dtv-entry-checks
ff2b707 resolve cannibalization who-should-choose-golf-dtv (delete + redirect + merge)
0d0d3f9 golf-dtv-suitability (Phase 0 + P1)
86dc12c golf-dtv-cost
7b37bc1 golf-dtv-overview
8374a3a golf-dtv-comparison
605087c golf-dtv-process
dab6b18 golf-dtv-mistakes
9710071 dtv-extension-and-reentry
25ed438 dtv-work-limitations
dc87b50 golf-dtv-after-approval
f563a97 golf-dtv-faq
abbd72d golf-dtv-vs-soft-power
8573b37 dtv-application-nationality-notes
03a47e5 dtv-application-timeline
898638f dtv-bank-account
22b3b6d dtv-bank-balance
220c936 dtv-bank-balance-faq
782c793 dtv-digital-nomad-visa
eb1a2d5 dtv-evisa-form-guide
1de2f39 dtv-income-proof
2effceb dtv-job-change-after-application
0b4e153 dtv-life-setup
cc05674 dtv-over-50
136b624 dtv-portfolio-supporting-documents
513eae2 dtv-rejection-reasons
6993a3c dtv-vs-ltr
f2db569 dtv-vs-retirement-visa
4f6177f dtv-vs-thailand-privilege
9817be1 thailand-long-stay-visa-comparison
dcded07 docs: add this report (initial version)
59d9396 fix: remove static KRW conversion for 500,000 THB financial evidence (Fact QA correction)
cb28eb2 docs: update report with Fact QA findings
93da009 fix: dtv-application - remove gov fee KRW conversion, add Seoul Tier B fee-exemption note (final Fact QA)
```

---

**KO Fact Base status: COMPLETE.** All SAFE_AUTO_FIX work and all three Fact QA correction passes (500,000 THB KRW removal, health-insurance re-audit, government-fee KRW + Seoul Tier B fee-exemption note) are closed out. No open HUMAN_REVIEW items remain.

*KO SAFE_AUTO_FIX phase complete, including post-completion Fact QA corrections. JA / EN / KO all 3 languages now fully processed.*
