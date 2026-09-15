# EN Blog Update Report — 2026-09

**Completed:** 2026-09-16
**Scope:** 46 EN blog articles (47 - 1 deleted: who-should-choose-golf-dtv.md)
**Build status:** PASSED (tsc --noEmit exit code 0; next build confirmed)

---

## Summary

All 46 remaining EN blog articles were updated as part of a three-phase audit-driven update cycle.

**Phase 0 (P0):** 5 articles — Fixed a broken `/en/blog/dtv-fee-by-nationality` link (article does not exist) across the entire golf-dtv cluster by redirecting to the existing `dtv-application-nationality-notes` article. Also removed USD conversions, softened fixed time claims, added 8/31 update notes, and added Source Notes.

**Phase 1 (P1):** 24 articles — Added the 2026-08-31 supporting-document update (Proof of Permanent Residence + Certificate of Criminal Record Clearance) to all document-focused articles. Fixed broken internal links (missing `/blog/` prefix). Softened fixed processing time claims. Added Source Notes to all articles.

**Phase 2 (P2):** 17 articles — Added Source Notes to all remaining articles. Fixed broken internal links. Removed USD/EUR/GBP conversions (THB-only policy). Added 8/31 update notes to articles directly covering supporting documents or the application process.

**Cannibalization:** `who-should-choose-golf-dtv.md` (EN) was deleted and a 301 redirect was added to `/en/blog/golf-dtv-suitability`, mirroring the JA decision. 5 internal links updated.

---

## A. EN Article Count (Final)

**46 articles** (47 total − 1 deleted: who-should-choose-golf-dtv.md)

---

## B. Auto-fix Completed Count

**46 articles processed** (all SAFE_AUTO_FIX)

---

## C. P0 Complete — Broken dtv-fee-by-nationality Links (5 articles)

| # | File | SHA | Key changes |
|---|---|---|---|
| 1 | golf-dtv-cost.md | f785055 | Fix broken link → dtv-application-nationality-notes; remove USD conversions; add 8/31 note; add Source Note |
| 2 | golf-dtv-overview.md | 80eb31b | Fix broken link; add 8/31 note; add Source Note |
| 3 | golf-dtv-process.md | 1d126e6 | Fix broken link; soften fixed times; add 8/31 note; add Source Note |
| 4 | golf-dtv-suitability.md | a6165b9 | Fix broken link; FAQ migration; remove USD; add 8/31 note; add Source Note |
| 5 | golf-dtv-comparison.md | c8589c7 | Fix broken link; add 8/31 note; add Source Note |

---

## D. P1 Complete — 8/31 Update + Links (24 articles)

| # | File | SHA | Key changes |
|---|---|---|---|
| 6 | dtv-required-documents.md | 83b0fd4 | Add 8/31 update block; fix must_link; remove USD; add Source Note |
| 7 | dtv-acceptance-letter.md | 8d769d0 | Add 8/31 update; fix must_link; add Source Note |
| 8 | dtv-application.md | 99f1dc6 | Fix must_link; soften times; add 8/31 note; add Source Note |
| 9 | dtv-visa.md | 5d390c9 | Fix must_link; remove USD; soften insurance req; add 8/31 note; add Source Note |
| 10 | dtv-soft-power.md | 52b4bb5 | Fix must_link; add 8/31 note; add Source Note |
| 11 | dtv-family-documents.md | a79fc1f | Fix must_link; fix body link; add 8/31 note; add Source Note |
| 12 | dtv-acceptance-letter-checkpoints.md | afd6790 | Fix links; add 8/31 note; add Source Note |
| 13 | dtv-common-document-mistakes.md | 4380dae | Fix links; add 8/31 note; add Source Note |
| 14 | dtv-application-timeline.md | f8decaf | Soften times; add 8/31 note; add Source Note |
| 15 | dtv-processing-time.md | 303e23d | Fix must_link; add 8/31 note; add Source Note |
| 16 | dtv-entry-checks.md | 650ebf7 | Fix must_link; fix body link; add 8/31 note; add Source Note |
| 17 | dtv-extension-and-reentry.md | 5f8c793 | Fix must_link; fix body link; add 8/31 note; add Source Note |
| 18 | dtv-soft-power-comparison.md | 69e3f9b | Fix must_link; add 8/31 note; add Source Note |
| 19 | dtv-soft-power-vs-freelance.md | aa37b7d | Fix must_link; add 8/31 note; add Source Note |
| 20 | dtv-freelance-proof.md | 91d294a | Fix must_link; add 8/31 note; add Source Note |
| 21 | dtv-interview-format.md | d2cee7e | Fix must_link; fix body link; add 8/31 note; add Source Note |
| 22 | dtv-interview-questions.md | 521066f | Fix must_link; add 8/31 note; add Source Note |
| 23 | dtv-work-limitations.md | 4e94672 | Fix must_link; fix body link; add 8/31 note; add Source Note |
| 24 | dtv-where-to-apply.md | b1f0242 | Fix must_link; label Japan examples; add 8/31 note; add Source Note |
| 25 | golf-dtv-faq.md | 91de207 | Soften Q7 time table; add 8/31 note; add Source Note |
| 26 | golf-dtv-mistakes.md | dd347bf | Soften fixed times; add 8/31 note; add Source Note |
| 27 | golf-dtv-documents.md | 3377d45 | Soften time claim; add 8/31 note; add Source Note |
| 28 | golf-dtv-after-approval.md | cadc9ba | Add brief 8/31 note; add Source Note |
| 29 | golf-dtv-vs-soft-power.md | 1d7f6e2 | Add brief 8/31 note; add Source Note |

---

## E. P2 Complete — Source Notes + Links (17 articles)

| # | File | SHA | Key changes |
|---|---|---|---|
| 30 | dtv-bank-balance.md | 9d4579b | Fix must_link; remove USD table; add 8/31 brief link; add Source Note |
| 31 | dtv-bank-balance-faq.md | a82601d | Fix must_link; fix body link; remove USD; add Source Note |
| 32 | dtv-vs-ltr.md | de06a06 | Fix must_link; add Source Note (Tier A × 2) |
| 33 | dtv-vs-retirement-visa.md | 82f9597 | Fix must_link (who-should-choose → golf-dtv-suitability); add Source Note (Tier A × 2) |
| 34 | dtv-vs-thailand-privilege.md | af6c75d | Fix must_link; remove USD conversions; add Source Note (Tier A × 2) |
| 35 | thailand-long-stay-visa-comparison.md | 7b54e54 | Fix must_link (×2); add Source Note (Tier A × 4) |
| 36 | dtv-application-nationality-notes.md | 8da3544 | Add 8/31 update note; add Source Note |
| 37 | dtv-over-50.md | 004138f | Fix must_link; fix body link dtv-soft-power; add 8/31 note; add Source Note |
| 38 | dtv-rejection-reasons.md | 98bb0be | Add 8/31 bullet (new doc requirement); add Source Note |
| 39 | dtv-income-proof.md | d7cf8cf | Fix must_link; fix body link; remove USD; add Source Note |
| 40 | dtv-upload-documents.md | 2338faf | Fix must_link; fix body link; add 8/31 note; add Source Note |
| 41 | dtv-bank-account.md | 317c26a | Fix must_link; fix body link dtv-visa; add Source Note |
| 42 | dtv-life-setup.md | 7f6f1c8 | Fix must_link; fix body link dtv-visa; add Source Note |
| 43 | dtv-digital-nomad-visa.md | 1b64b05 | Fix must_link; remove USD conversion in table; add Source Note |
| 44 | dtv-portfolio-supporting-documents.md | f083f76 | Fix must_link; add 8/31 note; add Source Note |
| 45 | dtv-job-change-after-application.md | 4404722 | Update updated_at; add Source Note |
| 46 | dtv-evisa-form-guide.md | 94f9805 | Add 8/31 note; add Source Note |

---

## F. NO_CHANGE Reclassifications

None — all 46 articles received updates.

---

## G. HUMAN_REVIEW Items

None escalated during P2 processing. The one HUMAN_REVIEW item (who-should-choose-golf-dtv.md deletion) was resolved in the prior session with deletion + 301 redirect.

---

## H. Broken Links Fixed

**Total: ~35 broken links fixed across 46 articles**

| Link Pattern | Articles Affected | Fix Applied |
|---|---|---|
| `/en/blog/dtv-fee-by-nationality` (404) | golf-dtv-cost, golf-dtv-overview, golf-dtv-process, golf-dtv-suitability, golf-dtv-comparison | → `/en/blog/dtv-application-nationality-notes` |
| `/en/dtv-required-documents` (missing /blog/) | dtv-entry-checks, dtv-interview-format, dtv-bank-balance-faq, dtv-income-proof, dtv-common-document-mistakes, dtv-family-documents, dtv-upload-documents, dtv-portfolio-supporting-documents | → `/en/blog/dtv-required-documents` |
| `/en/dtv-visa` (missing /blog/) | dtv-extension-and-reentry, dtv-bank-account, dtv-life-setup, dtv-work-limitations | → `/en/blog/dtv-visa` |
| `/en/dtv-acceptance-letter` (missing /blog/) | dtv-acceptance-letter-checkpoints | → `/en/blog/dtv-acceptance-letter` |
| `/en/dtv-soft-power` (missing /blog/) | dtv-acceptance-letter-checkpoints, dtv-over-50 | → `/en/blog/dtv-soft-power` |
| `/en/dtv-bank-balance` in must_link (missing /blog/) | dtv-required-documents, dtv-application, dtv-bank-balance | → `/en/blog/dtv-bank-balance` |
| `/en/thailand-long-stay-visa-comparison` in must_link (missing /blog/) | dtv-vs-ltr, dtv-vs-thailand-privilege, thailand-long-stay-visa-comparison, dtv-visa | → `/en/blog/thailand-long-stay-visa-comparison` |
| `/en/dtv-acceptance-letter` in must_link (missing /blog/) | dtv-soft-power, dtv-acceptance-letter | → `/en/blog/dtv-acceptance-letter` |
| `/en/dtv-soft-power` in must_link (missing /blog/) | dtv-acceptance-letter, dtv-soft-power-vs-freelance, dtv-soft-power-comparison, dtv-acceptance-letter-checkpoints, dtv-over-50 | → `/en/blog/dtv-soft-power` |
| `/en/who-should-choose-golf-dtv` in must_link | dtv-vs-retirement-visa, dtv-soft-power-comparison, thailand-long-stay-visa-comparison | → `/en/blog/golf-dtv-suitability` |
| `/en/dtv-visa` in must_link (missing /blog/) | dtv-vs-retirement-visa, dtv-bank-account, dtv-life-setup, dtv-digital-nomad-visa | → `/en/blog/dtv-visa` |

---

## I. Outdated Factual Claims Fixed

**Fixed time expressions in:**
- golf-dtv-faq.md: Q7 table "2–4 weeks" / "1–3 weeks" / "6–8 weeks total" → added "typically" qualifiers and variance note
- golf-dtv-process.md: Multiple fixed time claims → softened with "typically"
- golf-dtv-mistakes.md: Fixed times → softened
- golf-dtv-documents.md: "Allow 2–4 weeks" → "typically 2–4 weeks"
- golf-dtv-suitability.md: Fixed times → softened
- dtv-application.md: "1–3 weeks", "3–4 weeks" → softened
- dtv-application-timeline.md: Multiple fixed times → softened

**Softened insurance requirements:**
- dtv-visa.md: Removed categorical insurance statement, added "check your embassy guidance"

---

## J. 8/31 Update Added

**Added to: 22 articles**

Full blockquote/section: dtv-required-documents, dtv-acceptance-letter, dtv-application, dtv-visa, dtv-soft-power, dtv-family-documents, dtv-acceptance-letter-checkpoints, dtv-common-document-mistakes, dtv-application-timeline, dtv-processing-time, dtv-entry-checks, dtv-extension-and-reentry, dtv-freelance-proof, dtv-interview-format, dtv-interview-questions, dtv-rejection-reasons, dtv-upload-documents, dtv-portfolio-supporting-documents, dtv-evisa-form-guide, dtv-over-50, dtv-application-nationality-notes

Brief note/link: golf-dtv-cost, golf-dtv-overview, golf-dtv-process, golf-dtv-suitability, golf-dtv-comparison, golf-dtv-documents, golf-dtv-faq, golf-dtv-mistakes, golf-dtv-after-approval, golf-dtv-vs-soft-power, dtv-bank-balance, dtv-soft-power-comparison, dtv-soft-power-vs-freelance, dtv-work-limitations, dtv-where-to-apply

---

## K. 8/31 Update Intentionally Not Added

**Skipped for: 9 articles**

Reason: search intent not directly related to supporting documents or application process.

Articles: dtv-bank-balance-faq (bank balance FAQ only), dtv-vs-ltr (visa comparison), dtv-vs-retirement-visa (visa comparison), dtv-vs-thailand-privilege (visa comparison), thailand-long-stay-visa-comparison (visa comparison), dtv-bank-account (post-approval banking), dtv-life-setup (post-arrival life setup), dtv-digital-nomad-visa (general overview), dtv-job-change-after-application (post-approval work change)

---

## L. Source Notes Added

**Added to: 46 articles (all articles)**

All articles received a tailored Source Note section with appropriate tiers:
- Visa policy articles: Tier A (Thai MFA / embassy guidance)
- Comparison articles: Tier A for each visa type compared
- GolfDTV service articles: Tier A + Tier C
- Financial articles: Tier A
- e-Visa portal articles: Tier A (MFA portal)

---

## M. USD Conversion

**Removed: ~15 instances from ~10 articles**

| Article | USD Removed |
|---|---|
| dtv-required-documents.md | "approximately USD 14,000" bank balance equivalent |
| dtv-visa.md | USD conversion for bank balance |
| golf-dtv-cost.md | USD 14,000–15,000, EUR 13,000–14,000, GBP 11,000–12,000 |
| golf-dtv-process.md | "approximately USD 14,000–15,000" |
| golf-dtv-suitability.md | "approximately USD 14,000–15,000" |
| dtv-bank-balance.md | USD conversion table + inline mentions |
| dtv-bank-balance-faq.md | "approximately USD 14,000" inline + table |
| dtv-vs-thailand-privilege.md | "~USD 280", "~USD 18,000" |
| dtv-income-proof.md | "approximately USD 14,000" |
| dtv-digital-nomad-visa.md | "~USD 280" in comparison table |

**Retained:** Official LTR thresholds expressed in USD by the BOI (USD 80,000/yr, USD 1M+ assets) — these are official government figures denominated in USD, not THB-to-USD conversions.

---

## N. AIO Improvements

- All 46 articles: Added Source Note section (universal AIO structure)
- golf-dtv-suitability.md: FAQ sections migrated from who-should-choose-golf-dtv.md
- dtv-where-to-apply.md: Japan-specific embassy examples re-labeled as Japan examples (not universal)
- dtv-application-nationality-notes.md: Confirmed fee exemption info for Korean, Malaysian, Singaporean, Tunisian nationals clearly stated (serves as redirect target for broken dtv-fee-by-nationality links)

---

## O. Internal Link Improvements

All broken `/en/dtv-*` links (missing `/blog/` prefix) fixed across all articles. See Section H for full list.

---

## P. Cannibalization Handled

- `who-should-choose-golf-dtv.md` (EN): **Deleted** (SHA: c6672aa)
- 301 redirect added: `/en/blog/who-should-choose-golf-dtv` → `/en/blog/golf-dtv-suitability`
- Internal links updated in 5 articles: dtv-soft-power.md, dtv-soft-power-comparison.md, dtv-vs-ltr.md, dtv-vs-retirement-visa.md, thailand-long-stay-visa-comparison.md

---

## Q. Controlled Fact Conflicts

None detected. All GolfDTV pricing (Silver 20,000 / Gold 50,000 / Platinum 100,000 THB), 96% approval rate, 7-day fastest approval, and Club Thailand launch status references remain unchanged.

---

## R. Missing Topic Recommendations

1. `dtv-fee-by-nationality` dedicated EN article — currently broken links in 5 golf-dtv articles are redirected to `dtv-application-nationality-notes`. Consider creating a dedicated article when fee exemption data for additional nationalities is fully confirmed.

---

## S. All Commit SHAs

| # | File | SHA |
|---|---|---|
| setup | golf-dtv-suitability update | a6165b9 |
| setup | who-should-choose deletion + redirect + links | c6672aa |
| P0-1 | golf-dtv-cost | f785055 |
| P0-2 | golf-dtv-overview | 80eb31b |
| P0-3 | golf-dtv-process | 1d126e6 |
| P0-4 | golf-dtv-comparison | c8589c7 |
| P0-5 | golf-dtv-faq | 91de207 |
| P1-1 | dtv-required-documents | 83b0fd4 |
| P1-2 | dtv-acceptance-letter | 8d769d0 |
| P1-3 | dtv-application | 99f1dc6 |
| P1-4 | dtv-visa | 5d390c9 |
| P1-5 | dtv-soft-power | 52b4bb5 |
| P1-6 | dtv-family-documents | a79fc1f |
| P1-7 | dtv-acceptance-letter-checkpoints | afd6790 |
| P1-8 | dtv-common-document-mistakes | 4380dae |
| P1-9 | dtv-application-timeline | f8decaf |
| P1-10 | dtv-processing-time | 303e23d |
| P1-11 | dtv-entry-checks | 650ebf7 |
| P1-12 | dtv-extension-and-reentry | 5f8c793 |
| P1-13 | dtv-soft-power-comparison | 69e3f9b |
| P1-14 | dtv-soft-power-vs-freelance | aa37b7d |
| P1-15 | dtv-freelance-proof | 91d294a |
| P1-16 | dtv-interview-format | d2cee7e |
| P1-17 | dtv-interview-questions | 521066f |
| P1-18 | dtv-work-limitations | 4e94672 |
| P1-19 | dtv-where-to-apply | b1f0242 |
| P1-20 | golf-dtv-mistakes | dd347bf |
| P1-21 | golf-dtv-documents | 3377d45 |
| P1-22 | golf-dtv-after-approval | cadc9ba |
| P1-23 | golf-dtv-vs-soft-power | 1d7f6e2 |
| P2-1 | dtv-bank-balance | 9d4579b |
| P2-2 | dtv-bank-balance-faq | a82601d |
| P2-3 | dtv-vs-ltr | de06a06 |
| P2-4 | dtv-vs-retirement-visa | 82f9597 |
| P2-5 | dtv-vs-thailand-privilege | af6c75d |
| P2-6 | thailand-long-stay-visa-comparison | 7b54e54 |
| P2-7 | dtv-application-nationality-notes | 8da3544 |
| P2-8 | dtv-over-50 | 004138f |
| P2-9 | dtv-rejection-reasons | 98bb0be |
| P2-10 | dtv-income-proof | d7cf8cf |
| P2-11 | dtv-upload-documents | 2338faf |
| P2-12 | dtv-bank-account | 317c26a |
| P2-13 | dtv-life-setup | 7f6f1c8 |
| P2-14 | dtv-digital-nomad-visa | 1b64b05 |
| P2-15 | dtv-portfolio-supporting-documents | f083f76 |
| P2-16 | dtv-job-change-after-application | 4404722 |
| P2-17 | dtv-evisa-form-guide | 94f9805 |

---

## T. TypeScript / Build

- `npx tsc --noEmit`: **PASS** (exit code 0)
- `npx next build`: **PASS**

---

## U. Korean Audit Readiness

EN blog update complete. All 46 EN articles updated with Source Notes, 8/31 document update information, broken link fixes, and USD conversion removal. Korean audit can proceed.
