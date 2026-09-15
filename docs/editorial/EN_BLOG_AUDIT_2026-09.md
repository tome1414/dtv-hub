# EN Blog Audit Report — 2026-09

Date: 2026-09-16
Target: `src/content/blog/en/`
Rules: GOLFDTV_CONFIRMED_FACTS / DTV_2026_RULES / SEO_AIO_EDITORIAL_RULES / LOCALIZATION_RULES / ARTICLE_UPDATE_WORKFLOW / HUMAN_APPROVAL_REQUIRED
Auditor: Claude Code (Sonnet 4.6)
Reference: JA_BLOG_AUDIT_2026-09.md / JA_BLOG_UPDATE_REPORT_2026-09.md

---

## A. Summary Statistics

| Metric | Count |
|---|---|
| **EN article count** | **47** |
| P0 / SAFE_AUTO_FIX | 5 |
| P1 / SAFE_AUTO_FIX | 24 |
| P2 / SAFE_AUTO_FIX | 17 |
| NO_CHANGE | 0 |
| HUMAN_REVIEW | 1 |

**Universal issue (all 47 articles):** Zero EN articles mention the 2026-08-31 supporting-document additions (Proof of Permanent Residence, Certificate of Criminal Record Clearance). This is the highest-impact gap in the EN blog.

**Universal issue (all 47 articles):** No Source Note section exists in any EN article.

---

## B. Full Article Classification Table

### P0 / SAFE_AUTO_FIX — Broken Critical Link

All five articles reference `/en/blog/dtv-fee-by-nationality` — an article that does not exist in the EN blog. This is a dead link that will return 404 for readers.

| # | File | updated_at | Classification | Key Issues |
|---|---|---|---|---|
| 1 | golf-dtv-cost.md | 2026-06-04 | P0 | Broken `/en/blog/dtv-fee-by-nationality` link; missing 8/31 update; no Source Note |
| 2 | golf-dtv-overview.md | 2026-06-04 | P0 | Broken `/en/blog/dtv-fee-by-nationality` link; missing 8/31 update; no Source Note |
| 3 | golf-dtv-process.md | 2026-06-04 | P0 | Broken `/en/blog/dtv-fee-by-nationality` link; fixed time claims; missing 8/31 update; no Source Note |
| 4 | golf-dtv-suitability.md | 2026-06-04 | P0 | Broken `/en/blog/dtv-fee-by-nationality` link; fixed time claims; missing 8/31 update; no Source Note |
| 5 | golf-dtv-comparison.md | 2026-06-04 | P0 | Broken `/en/blog/dtv-fee-by-nationality` link; missing 8/31 update; no Source Note |

### P1 / SAFE_AUTO_FIX — 8/31 Update Missing + Major Link Issues

| # | File | updated_at | Classification | Key Issues |
|---|---|---|---|---|
| 6 | dtv-required-documents.md | 2026-05-04 | P1 | Missing 8/31 update (Proof of Permanent Residence, Certificate of Criminal Record Clearance); broken must_link `/en/dtv-bank-balance` (→ `/en/blog/dtv-bank-balance`); no Source Note; USD conversion |
| 7 | dtv-visa.md | 2026-05-04 | P1 | Missing 8/31 update; broken must_link `/en/thailand-long-stay-visa-comparison` and `/en/dtv-required-documents` (both need `/blog/` prefix); no Source Note |
| 8 | dtv-acceptance-letter.md | 2026-05-04 | P1 | Missing 8/31 update; fixed time "1–3 weeks (varies)"; broken must_link `/en/dtv-soft-power` and `/en/dtv-required-documents`; no Source Note |
| 9 | dtv-soft-power.md | 2026-05-04 | P1 | Missing 8/31 update; broken must_link `/en/dtv-acceptance-letter`; no Source Note |
| 10 | dtv-soft-power-vs-freelance.md | 2026-05-04 | P1 | Missing 8/31 update; references `who-should-choose-golf-dtv` (cannibalization monitoring); no Source Note |
| 11 | dtv-soft-power-comparison.md | 2026-05-05 | P1 | Missing 8/31 update; broken must_link `/en/dtv-acceptance-letter` and `/en/who-should-choose-golf-dtv`; no Source Note |
| 12 | dtv-application.md | 2026-06-02 | P1 | Missing 8/31 update (Proof of Permanent Residence); fixed times ("1–3 weeks", "3–4 weeks"); broken must_link `/en/dtv-required-documents` and `/en/dtv-bank-balance`; no Source Note |
| 13 | dtv-application-timeline.md | 2026-06-03 | P1 | Missing 8/31 update; fixed times at L51/52/56/110 ("1–3 weeks", "a few days to 1 week"); no Source Note |
| 14 | dtv-processing-time.md | 2026-06-02 | P1 | Missing 8/31 update; broken must_link `/en/dtv-required-documents`; no Source Note |
| 15 | dtv-common-document-mistakes.md | 2026-05-05 | P1 | Missing 8/31 update; broken body link `/en/dtv-required-documents`; no Source Note |
| 16 | dtv-acceptance-letter-checkpoints.md | 2026-05-05 | P1 | Missing 8/31 update; broken body links `/en/dtv-acceptance-letter` and `/en/dtv-soft-power`; no Source Note |
| 17 | dtv-entry-checks.md | 2026-05-05 | P1 | Missing 8/31 update; broken body link `/en/dtv-required-documents`; no Source Note |
| 18 | dtv-extension-and-reentry.md | 2026-05-05 | P1 | Missing 8/31 update; broken body link `/en/dtv-visa`; no Source Note |
| 19 | dtv-family-documents.md | 2026-06-02 | P1 | Missing 8/31 update (Proof of Permanent Residence in family context); broken body link `/en/dtv-required-documents`; no Source Note |
| 20 | dtv-freelance-proof.md | 2026-05-05 | P1 | Missing 8/31 update; no Source Note |
| 21 | dtv-interview-format.md | 2026-05-05 | P1 | Missing 8/31 context; broken body link `/en/dtv-required-documents`; no Source Note |
| 22 | dtv-interview-questions.md | 2026-05-05 | P1 | Missing 8/31 context; no Source Note |
| 23 | dtv-work-limitations.md | 2026-05-05 | P1 | Missing 8/31 context; broken body link `/en/dtv-visa`; no Source Note |
| 24 | dtv-where-to-apply.md | 2026-05-05 | P1 | Japan over-localization (lists Tokyo, Osaka, Fukuoka, Sendai, Nagoya without Japan-specific label); broken must_link `/en/dtv-required-documents`; missing 8/31 update; no Source Note |
| 25 | golf-dtv-faq.md | 2026-06-04 | P1 | Fixed time table L97–L100 (2–4 weeks, 1–3 weeks, 6–8 weeks total); missing 8/31 update; no Source Note |
| 26 | golf-dtv-mistakes.md | 2026-06-04 | P1 | Fixed times L114/119/121 ("2–4 weeks", "1–3 weeks"); missing 8/31 update; no Source Note |
| 27 | golf-dtv-documents.md | 2026-06-04 | P1 | Fixed time L99 ("2–4 weeks"); missing 8/31 update (8/31 affects supporting docs); no Source Note |
| 28 | golf-dtv-after-approval.md | 2026-06-04 | P1 | Missing 8/31 update; no Source Note |
| 29 | golf-dtv-vs-soft-power.md | 2026-06-04 | P1 | Missing 8/31 update; no Source Note |

### P2 / SAFE_AUTO_FIX — Source Note Missing + Minor Issues

| # | File | updated_at | Classification | Key Issues |
|---|---|---|---|---|
| 30 | dtv-bank-balance.md | 2026-05-04 | P2 | No Source Note; 8/31 indirect impact low |
| 31 | dtv-bank-balance-faq.md | 2026-05-05 | P2 | No Source Note; broken body link `/en/dtv-required-documents` |
| 32 | dtv-bank-account.md | 2026-05-05 | P2 | No Source Note; broken body link `/en/dtv-visa` |
| 33 | dtv-digital-nomad-visa.md | 2026-05-04 | P2 | No Source Note; 8/31 impact low |
| 34 | dtv-income-proof.md | 2026-05-05 | P2 | No Source Note; broken body link `/en/dtv-required-documents` |
| 35 | dtv-job-change-after-application.md | 2026-05-05 | P2 | No Source Note; 8/31 impact low |
| 36 | dtv-life-setup.md | 2026-06-02 | P2 | No Source Note; broken body link `/en/dtv-visa` |
| 37 | dtv-over-50.md | 2026-05-05 | P2 | No Source Note; broken must_link `/en/dtv-soft-power`; links to `who-should-choose-golf-dtv` (monitoring) |
| 38 | dtv-portfolio-supporting-documents.md | 2026-05-05 | P2 | No Source Note |
| 39 | dtv-upload-documents.md | 2026-05-05 | P2 | No Source Note; broken body link `/en/dtv-required-documents` |
| 40 | dtv-evisa-form-guide.md | 2026-06-03 | P2 | No Source Note |
| 41 | dtv-rejection-reasons.md | 2026-06-03 | P2 | No Source Note; must_link correctly uses `/en/blog/` prefix (good model) |
| 42 | dtv-application-nationality-notes.md | 2026-06-02 | P2 | No Source Note |
| 43 | dtv-vs-ltr.md | 2026-05-04 | P2 | No Source Note; links to `who-should-choose-golf-dtv` (monitoring) |
| 44 | dtv-vs-retirement-visa.md | 2026-05-04 | P2 | No Source Note; links to `who-should-choose-golf-dtv` (monitoring) |
| 45 | dtv-vs-thailand-privilege.md | 2026-05-04 | P2 | No Source Note |
| 46 | thailand-long-stay-visa-comparison.md | 2026-06-02 | P2 | No Source Note; links to `who-should-choose-golf-dtv` (monitoring) |

### HUMAN_REVIEW

| # | File | updated_at | Classification | Reason |
|---|---|---|---|---|
| 47 | who-should-choose-golf-dtv.md | 2026-05-04 | HUMAN_REVIEW | JA version deleted (HUMAN_REVIEW outcome: delete+redirect). EN version still exists. Cannibalization with `golf-dtv-suitability.md`. Decision required: delete+redirect or differentiate. USD conversion (~USD 280) present. |

---

## C. Broken Links

### P0 — Confirmed Broken (Article Does Not Exist)

| Link | Found In | Problem | Fix |
|---|---|---|---|
| `/en/blog/dtv-fee-by-nationality` | golf-dtv-cost.md, golf-dtv-overview.md, golf-dtv-process.md, golf-dtv-suitability.md, golf-dtv-comparison.md | Article `dtv-fee-by-nationality.md` does not exist in EN blog | Remove link and inline the exemption note directly, or create the missing article (HUMAN_REVIEW if creating new article) |

### P1 — Body Links Missing `/blog/` Prefix

These links appear in article body text. The target blog articles exist, but the URL path is wrong (missing `/blog/`).

| Link Used | Affected Articles | Correct URL |
|---|---|---|
| `/en/dtv-required-documents` | dtv-entry-checks, dtv-interview-format, dtv-bank-balance-faq, dtv-income-proof, dtv-common-document-mistakes, dtv-family-documents, dtv-upload-documents | `/en/blog/dtv-required-documents` |
| `/en/dtv-visa` | dtv-extension-and-reentry, dtv-bank-account, dtv-life-setup, dtv-work-limitations | `/en/blog/dtv-visa` |
| `/en/dtv-acceptance-letter` | dtv-acceptance-letter-checkpoints | `/en/blog/dtv-acceptance-letter` |
| `/en/dtv-soft-power` | dtv-acceptance-letter-checkpoints, dtv-over-50 (body) | `/en/blog/dtv-soft-power` |

### P1 — Must_link_pages With Broken Paths

These appear in frontmatter `must_link_pages`, not body text. The same `/blog/` prefix fix applies.

| Link Used | Affected Articles | Correct URL |
|---|---|---|
| `/en/dtv-bank-balance` | dtv-required-documents, dtv-application | `/en/blog/dtv-bank-balance` |
| `/en/dtv-required-documents` | dtv-application, dtv-processing-time, dtv-where-to-apply, dtv-visa | `/en/blog/dtv-required-documents` |
| `/en/dtv-acceptance-letter` | dtv-soft-power, dtv-acceptance-letter | `/en/blog/dtv-acceptance-letter` |
| `/en/dtv-soft-power` | dtv-acceptance-letter, dtv-soft-power-vs-freelance, dtv-soft-power-comparison, dtv-acceptance-letter-checkpoints, dtv-over-50, who-should-choose-golf-dtv | `/en/blog/dtv-soft-power` |
| `/en/dtv-vs-retirement-visa` | who-should-choose-golf-dtv | `/en/blog/dtv-vs-retirement-visa` |
| `/en/thailand-long-stay-visa-comparison` | dtv-visa | `/en/blog/thailand-long-stay-visa-comparison` |
| `/en/who-should-choose-golf-dtv` | dtv-soft-power-comparison (body + must_link) | `/en/blog/who-should-choose-golf-dtv` (valid for now; pending HUMAN_REVIEW on deletion) |

**Note:** The following are valid app page routes — do NOT add `/blog/` prefix to these:
- `/en/dtv-application` ✓
- `/en/dtv-soft-power-vs-freelance` ✓
- `/en/soft-power` ✓
- `/en/who-should-choose-golf-dtv` ✓ (app LP page, different from blog article)
- `/en/golf-dtv` ✓
- `/en/guide/evisa-form` ✓
- `/en/requirements` ✓

---

## D. Outdated Factual Claims

### 2026-08-31 Supporting-Document Change — Not Reflected Anywhere

**Impact: ALL 47 EN articles.**

As of 2026-08-31, Proof of Permanent Residence and Certificate of Criminal Record Clearance became central DTV supporting-document requirements. Zero EN articles mention these terms.

Articles with highest priority to add this update:

| File | Reason for High Priority |
|---|---|
| dtv-required-documents.md | Core document reference article — most important |
| dtv-application.md | Step-by-step process — applicants read before applying |
| dtv-acceptance-letter.md | Document-focused article, closely related |
| dtv-common-document-mistakes.md | Directly about document errors |
| dtv-acceptance-letter-checkpoints.md | Checklist article, should include new requirements |
| dtv-family-documents.md | Family applications also affected |
| dtv-freelance-proof.md | Freelance supporting docs context |
| golf-dtv-documents.md | Golf DTV document guide |

### Fixed Processing Time Claims

These are variable estimates that should be softened. Embassy processing time in particular must never be stated as a fixed guarantee.

| File | Line/Location | Claim | Issue | Fix |
|---|---|---|---|---|
| golf-dtv-faq.md | Table Q7 | "Acceptance Letter procurement 2–4 weeks"; "Embassy processing 1–3 weeks"; "Total 6–8 weeks" | Fixed timeline presented as a table (implies reliability) | Add "typical" qualifier; note embassy times vary by location/season |
| golf-dtv-process.md | L42, L84, L120, L160 | "2–4 weeks" (letter); "1–3 weeks" (embassy) | Fixed times throughout | Soften with "typically", add variance note |
| golf-dtv-mistakes.md | L114/119/121 | "2–4 weeks", "1–3 weeks" | Fixed times | Add qualifier |
| golf-dtv-documents.md | L99 | "Allow 2–4 weeks" | Fixed time for letter procurement | Add qualifier |
| golf-dtv-suitability.md | L107 | "2–4 weeks", "1–3 weeks" | Fixed times | Add qualifier |
| dtv-application.md | L50, L150–151, L213 | "1–3 weeks", "3–4 weeks" (embassy) | Fixed times | Soften |
| dtv-application-timeline.md | L51, L52, L56, L110 | "a few days to ~1 week", "1–3 weeks" | Fixed times | Soften |
| dtv-acceptance-letter.md | L133 | "1–3 weeks (varies)" | Has qualifier but still specific | OK as-is due to "(varies)" qualifier |

**Note:** `dtv-processing-time.md` already uses "a few days to several weeks" — this phrasing is acceptable and should be used as the model for other articles.

---

## E. Localization Problems

| File | Issue | Recommendation |
|---|---|---|
| dtv-where-to-apply.md | Lists Japan-specific missions (Tokyo, Osaka, Fukuoka, Sendai, Nagoya) as part of the "home country rule" section without labeling them Japan-specific. English audience is international. | Rewrite to describe general principle; use Japan as one labeled example. Label Fukuoka example explicitly as "Fukuoka-specific example". |
| dtv-required-documents.md | USD conversion "approximately USD 14,000" for bank balance | LOCALIZATION_RULES: "Do not automatically add USD conversion unless current product policy requires it." Remove or move to a note. |
| golf-dtv-cost.md | USD conversion for bank balance (USD 14,000–15,000, EUR 13,000–14,000, GBP 11,000–12,000) | These conversions are approximate and fluctuate. Add disclaimer or remove. Check if product policy authorizes multi-currency display. |
| golf-dtv-process.md, golf-dtv-suitability.md | USD conversion "approximately USD 14,000–15,000" | Same issue as above |
| who-should-choose-golf-dtv.md | USD conversion "~USD 280" for DTV fee | See HUMAN_REVIEW section |

---

## F. Cannibalization Risks

### CRITICAL (HUMAN_REVIEW Required)

| Article A | Article B | Overlap | Status |
|---|---|---|---|
| `who-should-choose-golf-dtv.md` | `golf-dtv-suitability.md` | Both address "who is Golf DTV right for" with similar intent | `who-should-choose-golf-dtv.md` primary_keyword: "Golf DTV who should apply"; `golf-dtv-suitability.md` primary_keyword: "Is Golf DTV right for me" — different phrasings but same search intent. JA version of `who-should-choose-golf-dtv.md` was deleted and redirected → `/ja/blog/golf-dtv-suitability`. EN has not yet made the same decision. |

**Recommendation for HUMAN_REVIEW:**
- Option A: Delete `who-should-choose-golf-dtv.md` (EN) and set 301 redirect `/en/blog/who-should-choose-golf-dtv` → `/en/blog/golf-dtv-suitability` (mirrors JA decision). Requires: update 4 articles that currently link to `who-should-choose-golf-dtv`.
- Option B: Differentiate the two articles by focusing `who-should-choose-golf-dtv.md` on a transactional/decision-support intent and `golf-dtv-suitability.md` on informational assessment. Requires substantial rewrite of `who-should-choose-golf-dtv.md`.
- **Auto-fix cannot proceed on this item** — slug change and article deletion require human approval per HUMAN_APPROVAL_REQUIRED §18–21.

### Monitor (Currently Manageable)

| Article A | Article B | Overlap | Evaluation |
|---|---|---|---|
| `dtv-soft-power-vs-freelance.md` | `golf-dtv-vs-soft-power.md` | Soft Power comparison | Different foci: DTV route selection vs. Soft Power activity selection. Manageable with clear internal links between them. |
| `dtv-acceptance-letter.md` | `dtv-acceptance-letter-checkpoints.md` | Acceptance letter | Guide vs. checklist differentiation. Should cross-link explicitly. |
| `golf-dtv-comparison.md` | `thailand-long-stay-visa-comparison.md` | Thailand visa comparison | Golf DTV-specific comparison vs. general comparison. Different primary intent. |

---

## G. Controlled Fact Conflicts

### No Direct Violations Found

| Item | Status |
|---|---|
| Silver 20,000 / Gold 50,000 / Platinum 100,000 THB pricing | Not found in EN articles (correct — EN articles defer to /en/golf-dtv for pricing) |
| 96% approval rate | Not found in EN articles |
| 7-day fastest approval | Not found in EN articles |
| Club Thailand launch status | Not found mentioned in EN articles (correct) |
| DTV fee 10,000 THB | Consistently stated (correct) |
| 500,000 THB bank balance | Consistently stated (correct) |
| 5-year validity | Consistently stated (correct) |
| 180 days per entry | Consistently stated (correct) |
| Multiple entry | Consistently stated (correct) |

### Watchlist (Not Violations, But Monitor)

| File | Issue |
|---|---|
| golf-dtv-cost.md, golf-dtv-process.md, golf-dtv-suitability.md | USD conversion amounts (USD 14,000–15,000) are approximate and exchange-rate-dependent. Not incorrect but require disclaimer. |
| who-should-choose-golf-dtv.md | "~USD 280" for DTV fee is approximate. If exchange rate shifts significantly, could become misleading. |
| dtv-required-documents.md | "approximately USD 14,000" for bank balance — same issue |

### Embassy/Third-Country Claims (Status: Acceptable With Caveats)

| File | Claim | Assessment |
|---|---|---|
| golf-dtv-faq.md Q8 | "Technically any Thai embassy outside Thailand — but with important caveats" | Acceptable — correctly qualified with caveats and "verify with embassy" instruction |
| golf-dtv-process.md FAQ | "DTV can technically be applied for at any Thai embassy outside Thailand, but some embassies restrict applications" | Acceptable — correctly qualified |
| dtv-required-documents.md | Examples for third-country application with "hotel receipt" and "flight ticket" as evidence | Per DTV_2026_RULES, do not generalize Fukuoka-specific rules globally. The Japan/Vietnam/third-country examples in Section 3 are presented as general guidance but are actually mission-specific. Consider labeling as examples, not universal rules. |

---

## H. Missing-Topic Opportunities — JA vs EN Coverage

### EN-Only Articles (No JA Counterpart)

| EN Article | JA Equivalent | Status |
|---|---|---|
| `golf-dtv-cost.md` | `golf-dtv-plans.md` (JA) | Different focus: EN is cost breakdown; JA is plan/tier comparison. Both needed. Titles clearly differentiate. KEEP both. |
| `golf-dtv-process.md` | `golf-dtv-application.md` (JA) | Different title, same topic (application process). These are the same article under different slugs. LOW cannibalization risk since they're in different languages. KEEP. |
| `who-should-choose-golf-dtv.md` | JA version deleted (2026-09) | See HUMAN_REVIEW section. |

### JA-Only Articles (No EN Counterpart)

| JA Article | EN Status | Recommendation |
|---|---|---|
| `golf-dtv-what-is.md` | EN has `golf-dtv-overview.md` | Topics substantially overlap. EN `golf-dtv-overview.md` covers "what is Golf DTV" adequately. NOT_NEEDED as a separate EN article. |
| `golf-dtv-plans.md` | EN has `golf-dtv-cost.md` | Different enough in focus (plan tiers vs. cost breakdown). EN may benefit from a plan-comparison article if pricing structure becomes publicly documented. Currently MERGE_INTO_EXISTING — golf-dtv-cost.md can reference plans without a separate article. |
| `golf-dtv-application.md` | EN has `golf-dtv-process.md` | Same topic. NOT_NEEDED as duplicate. |

### Missing EN Topic Opportunities

| Topic | JA Coverage | EN Coverage | Recommendation |
|---|---|---|---|
| DTV fee by nationality | Covered in `dtv-application-nationality-notes.md` | No dedicated article; referenced via broken `/en/blog/dtv-fee-by-nationality` link | HUMAN_REVIEW: create dedicated `dtv-fee-by-nationality.md` in EN to resolve broken links in 5 golf-dtv articles, OR inline the exemption data into `dtv-application-nationality-notes.md` and fix links there |
| 2026-08-31 supporting document update | Updated in all JA P1 articles | Nowhere in EN blog | CREATE urgently as part of P1 updates; add update notes to affected articles |

---

## I. Recommended Auto-Update Order

### Phase 0: P0 — Fix Broken dtv-fee-by-nationality Links (5 articles)

Decision needed before auto-fixing: either inline the nationality/exemption data into each article, or fix the link target to `dtv-application-nationality-notes.md` (which does exist in EN). The fee-exemption information appears in `dtv-application-nationality-notes.md`, so the fix is to update the 5 broken links to point there instead.

1. **golf-dtv-cost.md** — Fix broken link; add 8/31 context; add Source Note; update updated_at
2. **golf-dtv-overview.md** — Fix broken link; add 8/31 context; add Source Note; update updated_at
3. **golf-dtv-process.md** — Fix broken link; soften fixed times; add 8/31 note; add Source Note; update updated_at
4. **golf-dtv-suitability.md** — Fix broken link; soften fixed times; add 8/31 note; add Source Note; update updated_at
5. **golf-dtv-comparison.md** — Fix broken link; add 8/31 note; add Source Note; update updated_at

### Phase 1: P1 — High Priority (24 articles)

6. **dtv-required-documents.md** — Add 8/31 update (Proof of Permanent Residence, Certificate of Criminal Record Clearance); fix broken must_link; add Source Note
7. **dtv-acceptance-letter.md** — Add 8/31 update; fix broken must_link; add Source Note
8. **dtv-application.md** — Add 8/31 update; soften fixed times; fix must_link; add Source Note
9. **dtv-visa.md** — Add 8/31 reference; fix broken must_link; add Source Note
10. **dtv-soft-power.md** — Add 8/31 update; fix broken must_link; add Source Note
11. **dtv-family-documents.md** — Add 8/31 update (Proof of Permanent Residence in family context); fix body link; add Source Note
12. **dtv-acceptance-letter-checkpoints.md** — Add 8/31 update; fix broken body links; add Source Note
13. **dtv-common-document-mistakes.md** — Add 8/31 note; fix broken body link; add Source Note
14. **dtv-application-timeline.md** — Soften fixed times; add 8/31 note; add Source Note
15. **dtv-processing-time.md** — Add 8/31 note; fix broken must_link; add Source Note
16. **dtv-entry-checks.md** — Add 8/31 note; fix broken body link; add Source Note
17. **dtv-extension-and-reentry.md** — Add 8/31 note; fix broken body link; add Source Note
18. **dtv-soft-power-comparison.md** — Add 8/31 note; fix broken must_link; add Source Note
19. **dtv-soft-power-vs-freelance.md** — Add 8/31 note; add Source Note
20. **dtv-freelance-proof.md** — Add 8/31 note; add Source Note
21. **dtv-interview-format.md** — Add 8/31 context; fix broken body link; add Source Note
22. **dtv-interview-questions.md** — Add 8/31 context; add Source Note
23. **dtv-work-limitations.md** — Add 8/31 context; fix broken body link; add Source Note
24. **dtv-where-to-apply.md** — Fix Japan over-localization (label Japan examples explicitly); fix broken must_link; add Source Note
25. **golf-dtv-faq.md** — Soften fixed times in Q7 table; add 8/31 note; add Source Note
26. **golf-dtv-mistakes.md** — Soften fixed times; add 8/31 note; add Source Note
27. **golf-dtv-documents.md** — Soften fixed time; add 8/31 note (Proof of Permanent Residence); add Source Note
28. **golf-dtv-after-approval.md** — Add 8/31 context; add Source Note
29. **golf-dtv-vs-soft-power.md** — Add 8/31 note; add Source Note

### Phase 2: P2 — Medium Priority (17 articles)

30–46. Each P2 article: add Source Note; fix body link issues; update updated_at; frontmatter review.

Priority within P2 (most important first):
30. dtv-bank-balance.md (high-traffic financial document article)
31. dtv-bank-balance-faq.md (fix body link + Source Note)
32. dtv-vs-ltr.md (Source Note + links)
33. dtv-vs-retirement-visa.md (Source Note + links)
34. dtv-vs-thailand-privilege.md (Source Note)
35. thailand-long-stay-visa-comparison.md (Source Note + links)
36. dtv-application-nationality-notes.md (Source Note; also target for broken dtv-fee-by-nationality redirects)
37. dtv-over-50.md (fix broken must_link `/en/dtv-soft-power`; Source Note)
38. dtv-rejection-reasons.md (Source Note; already has correct must_link format — use as model)
39. dtv-income-proof.md (fix body link; Source Note)
40. dtv-upload-documents.md (fix body link; Source Note)
41. dtv-bank-account.md (fix body link; Source Note)
42. dtv-life-setup.md (fix body link; Source Note)
43. dtv-digital-nomad-visa.md (Source Note)
44. dtv-portfolio-supporting-documents.md (Source Note)
45. dtv-job-change-after-application.md (Source Note)
46. dtv-evisa-form-guide.md (Source Note)

---

## J. HUMAN_REVIEW Decisions Required

### 1. who-should-choose-golf-dtv.md — Cannibalization + JA Parity Decision

**Current state:**
- EN: `who-should-choose-golf-dtv.md` still exists (`updated_at: 2026-05-04`, `primary_keyword: "Golf DTV who should apply"`)
- EN: `golf-dtv-suitability.md` also exists (`updated_at: 2026-06-04`, `primary_keyword: "Is Golf DTV right for me"`)
- JA: `who-should-choose-golf-dtv.md` was **deleted** in September 2026 session. 301 redirect set: `/ja/blog/who-should-choose-golf-dtv` → `/ja/blog/golf-dtv-suitability`
- EN article `who-should-choose-golf-dtv.md` is still referenced by 4 articles (dtv-soft-power.md, dtv-soft-power-vs-freelance.md, dtv-vs-ltr.md, dtv-vs-retirement-visa.md, thailand-long-stay-visa-comparison.md)

**Additional issue:** Contains USD conversion "~USD 280" for DTV fee — requires localization policy check.

**Options:**

| Option | Action | Risk |
|---|---|---|
| A | Delete EN `who-should-choose-golf-dtv.md`; set 301 redirect to `/en/blog/golf-dtv-suitability`; update 5 internal links | HUMAN_APPROVAL_REQUIRED §18 (delete article); mirrors JA decision |
| B | Differentiate: rewrite `who-should-choose-golf-dtv.md` to target transactional intent ("decide now" CTA focus), keep `golf-dtv-suitability.md` for informational assessment | Requires substantial rewrite; may not resolve cannibalization |
| C | Merge content of `who-should-choose-golf-dtv.md` into `golf-dtv-suitability.md`; delete and redirect | HUMAN_APPROVAL_REQUIRED §18-19 (delete + merge) |

**Recommended:** Option A (mirrors JA decision; simplifies architecture).
**Why automation cannot proceed:** article deletion + redirect requires HUMAN_APPROVAL_REQUIRED §18.

### 2. dtv-fee-by-nationality Broken Link Fix Strategy

**Current state:** 5 articles (all golf-dtv cluster) link to `/en/blog/dtv-fee-by-nationality` which does not exist.

**Options:**

| Option | Action |
|---|---|
| A | Change broken links to `/en/blog/dtv-application-nationality-notes` (existing article; covers fee exemptions) |
| B | Create new `dtv-fee-by-nationality.md` dedicated to fee exemptions | HUMAN_APPROVAL_REQUIRED §22 (new article where cannibalization may exist with `dtv-application-nationality-notes.md`) |

**Recommended:** Option A (safe auto-fix, no new article required). `dtv-application-nationality-notes.md` already exists and covers fee exemptions.
**This fix CAN be done automatically** under HUMAN_APPROVAL_REQUIRED safe-auto-fix rules (broken-link fix).

### 3. USD Conversion Policy Clarification

**Current state:** Multiple EN articles contain USD (and EUR/GBP) conversions for the bank balance (USD 14,000–15,000) and DTV fee (~USD 280). LOCALIZATION_RULES: "Do not automatically add USD conversion unless current product policy requires it."

**Decision needed:** Does current product policy authorize USD/multi-currency display in EN articles?

- If YES: conversions can stay; add disclaimer about exchange rate fluctuation.
- If NO: remove USD conversions; use THB only with note that applicants should check current rates.

**This is a controlled business decision, not an auto-fix.**

---

## K. JA vs EN Topic Coverage Comparison

| Topic | JA Article | EN Article | Parity Status |
|---|---|---|---|
| DTV overview | dtv-visa.md | dtv-visa.md | ✓ Parity |
| Required documents | dtv-required-documents.md | dtv-required-documents.md | ✓ Parity (8/31 update needed in both — JA done, EN pending) |
| Where to apply | dtv-where-to-apply.md | dtv-where-to-apply.md | ✗ EN over-localized for Japan; needs localization update |
| Application process | dtv-application.md | dtv-application.md | ✓ Parity (8/31 pending EN) |
| Nationality notes | dtv-application-nationality-notes.md | dtv-application-nationality-notes.md | ✓ Parity |
| Rejection reasons | dtv-rejection-reasons.md | dtv-rejection-reasons.md | ✓ Parity |
| Acceptance letter | dtv-acceptance-letter.md | dtv-acceptance-letter.md | ✓ Parity (8/31 pending EN) |
| Acceptance letter checkpoints | dtv-acceptance-letter-checkpoints.md | dtv-acceptance-letter-checkpoints.md | ✓ Parity |
| Bank balance | dtv-bank-balance.md | dtv-bank-balance.md | ✓ Parity |
| Bank balance FAQ | dtv-bank-balance-faq.md | dtv-bank-balance-faq.md | ✓ Parity |
| Bank account | dtv-bank-account.md | dtv-bank-account.md | ✓ Parity |
| Soft power activities | dtv-soft-power.md | dtv-soft-power.md | ✓ Parity |
| Soft power comparison | dtv-soft-power-comparison.md | dtv-soft-power-comparison.md | ✓ Parity |
| Soft power vs freelance | dtv-soft-power-vs-freelance.md | dtv-soft-power-vs-freelance.md | ✓ Parity |
| Freelance proof | dtv-freelance-proof.md | dtv-freelance-proof.md | ✓ Parity |
| Portfolio/supporting docs | dtv-portfolio-supporting-documents.md | dtv-portfolio-supporting-documents.md | ✓ Parity |
| Income proof | dtv-income-proof.md | dtv-income-proof.md | ✓ Parity |
| Interview format | dtv-interview-format.md | dtv-interview-format.md | ✓ Parity |
| Interview questions | dtv-interview-questions.md | dtv-interview-questions.md | ✓ Parity |
| Upload documents | dtv-upload-documents.md | dtv-upload-documents.md | ✓ Parity |
| Entry checks | dtv-entry-checks.md | dtv-entry-checks.md | ✓ Parity |
| Extension and reentry | dtv-extension-and-reentry.md | dtv-extension-and-reentry.md | ✓ Parity |
| Work limitations | dtv-work-limitations.md | dtv-work-limitations.md | ✓ Parity |
| Job change after application | dtv-job-change-after-application.md | dtv-job-change-after-application.md | ✓ Parity |
| Over 50 | dtv-over-50.md | dtv-over-50.md | ✓ Parity |
| Application timeline | dtv-application-timeline.md | dtv-application-timeline.md | ✓ Parity |
| Processing time | dtv-processing-time.md | dtv-processing-time.md | ✓ Parity |
| Family documents | dtv-family-documents.md | dtv-family-documents.md | ✓ Parity |
| Life setup | dtv-life-setup.md | dtv-life-setup.md | ✓ Parity |
| Common doc mistakes | dtv-common-document-mistakes.md | dtv-common-document-mistakes.md | ✓ Parity |
| Digital nomad visa | dtv-digital-nomad-visa.md | dtv-digital-nomad-visa.md | ✓ Parity |
| DTV vs LTR | dtv-vs-ltr.md | dtv-vs-ltr.md | ✓ Parity |
| DTV vs retirement visa | dtv-vs-retirement-visa.md | dtv-vs-retirement-visa.md | ✓ Parity |
| DTV vs Thailand Privilege | dtv-vs-thailand-privilege.md | dtv-vs-thailand-privilege.md | ✓ Parity |
| e-Visa form guide | dtv-evisa-form-guide.md | dtv-evisa-form-guide.md | ✓ Parity |
| Long-stay visa comparison | thailand-long-stay-visa-comparison.md | thailand-long-stay-visa-comparison.md | ✓ Parity |
| Golf DTV overview | golf-dtv-overview.md (EN) | golf-dtv-what-is.md (JA) | ✓ Coverage exists; slug differs (intentional localization) |
| Golf DTV overview 2 | — | golf-dtv-overview.md | (see above; JA: golf-dtv-what-is) |
| Golf DTV plans/cost | golf-dtv-cost.md (EN) | golf-dtv-plans.md (JA) | ✓ Coverage exists; different focus acceptable |
| Golf DTV process | golf-dtv-process.md (EN) | golf-dtv-application.md (JA) | ✓ Coverage exists; slug differs |
| Golf DTV documents | golf-dtv-documents.md | golf-dtv-documents.md | ✓ Parity |
| Golf DTV suitability | golf-dtv-suitability.md | golf-dtv-suitability.md | ✓ Parity |
| Golf DTV comparison | golf-dtv-comparison.md | golf-dtv-comparison.md | ✓ Parity |
| Golf DTV FAQ | golf-dtv-faq.md | golf-dtv-faq.md | ✓ Parity |
| Golf DTV mistakes | golf-dtv-mistakes.md | golf-dtv-mistakes.md | ✓ Parity |
| Golf DTV after approval | golf-dtv-after-approval.md | golf-dtv-after-approval.md | ✓ Parity |
| Golf DTV vs soft power | golf-dtv-vs-soft-power.md | golf-dtv-vs-soft-power.md | ✓ Parity |
| Who should choose Golf DTV | who-should-choose-golf-dtv.md | **DELETED (JA)** / still exists (EN) | ✗ EN not aligned with JA decision — HUMAN_REVIEW |
| DTV fee by nationality | (covered in dtv-application-nationality-notes.md) | `/en/blog/dtv-fee-by-nationality` BROKEN | ✗ Broken link target; fix by pointing to existing article |

---

## L. Source Note Template for EN Articles

All EN articles need a Source Note section before the closing disclaimer. Use this template:

```markdown
---

## Source Note

| Source | Tier | Notes |
|---|---|---|
| Thai Ministry of Foreign Affairs — DTV program | Tier A | Official visa category and conditions |
| Thai embassy / consulate guidance (general) | Tier A | Mission-specific requirements vary |
```

Adjust rows based on article content:
- Articles covering 8/31 update: add "2026-08-31 DTV supporting-document update" row (Tier A)
- GolfDTV articles: add "GolfDTV service information" row (Tier C)
- Add: "Requirements are subject to change. Verify current requirements with your intended embassy before applying."

---

*This file is an audit-only document. No article files were modified.*
*Next step: Proceed with Phase 0 (5 P0 articles), then Phase 1 (24 P1 articles) in recommended order.*
*Each article should be one commit. Batch commits require explicit human approval.*
