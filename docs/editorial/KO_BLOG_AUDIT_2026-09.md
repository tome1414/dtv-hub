# KO Blog Audit Report — 2026-09

Date: 2026-09-16
Target: `src/content/blog/ko/`
Rules: GOLFDTV_CONFIRMED_FACTS / DTV_2026_RULES / SEO_AIO_EDITORIAL_RULES / LOCALIZATION_RULES / ARTICLE_UPDATE_WORKFLOW / HUMAN_APPROVAL_REQUIRED
Auditor: Claude Code (Sonnet 4.6)
Reference: JA_BLOG_AUDIT_2026-09.md / EN_BLOG_AUDIT_2026-09.md / EN_BLOG_UPDATE_REPORT_2026-09.md

---

## A. Summary Statistics

| Metric | Count |
|---|---|
| **KO article count** | **47** |
| P0 (confirmed 404 / critical factual error) | 0 |
| P1 (SAFE_AUTO_FIX — high priority) | 29 |
| P2 (SAFE_AUTO_FIX — medium priority) | 17 |
| NO_CHANGE | 0 |
| HUMAN_REVIEW | 1 |

### Universal Issues (All 47 Articles)

1. **Zero KO articles contain a Source Note section.** This is the highest-coverage gap. Every article needs a Korean-language Source Note block added.

2. **Zero KO articles mention the 2026-08-31 supporting-document additions** (Proof of Permanent Residence / 영주권 증명서, Certificate of Criminal Record Clearance / 범죄 경력 증명서). This is the highest-impact factual gap. The 8/31 change affects the core DTV document checklist.

3. **Seoul Tier B facts are largely absent.** KO content is targeted at Korean applicants, but the majority of Seoul-specific confirmed guidance (Entry/Exit Facts, 2-day issuance window, criminal record 3-month validity, stay-in-Korea-during-review recommendation, etc.) is missing from articles where it is directly relevant.

4. **Must-link and body links systematically missing `/blog/` prefix.** Approximately 50+ link instances across all 47 articles use paths like `/ko/dtv-visa` instead of `/ko/blog/dtv-visa`. These will result in 404 or incorrect routing.

---

## B. Full Article Classification Table

### P1 / SAFE_AUTO_FIX — High Priority (29 articles)

| # | File | updated_at | Classification | Key Issues |
|---|---|---|---|---|
| 1 | dtv-acceptance-letter.md | 2026-05-04 | P1 | Missing 8/31 update; must_link `/ko/dtv-soft-power` and `/ko/dtv-required-documents` both missing `/blog/`; "대사관 규격에 맞는 서류 보장" guarantee wording; no Source Note |
| 2 | dtv-acceptance-letter-checkpoints.md | 2026-06-04 | P1 | Missing 8/31 update; must_link `/ko/dtv-acceptance-letter` and `/ko/dtv-soft-power` missing `/blog/`; body links same; no Source Note |
| 3 | dtv-application.md | 2026-06-02 | P1 | Missing 8/31 update (Proof of Permanent Residence); must_link `/ko/dtv-required-documents` missing `/blog/`; fixed times "1~3주" (L123), "2~4주, 1~3주" (L159); USD conversion "약 USD 280" (L112); no Source Note |
| 4 | dtv-common-document-mistakes.md | 2026-06-04 | P1 | Missing 8/31 update; must_link `/ko/dtv-required-documents` missing `/blog/`; no Source Note |
| 5 | dtv-entry-checks.md | 2026-05-05 | P1 | Missing 8/31 update; must_link `/ko/dtv-required-documents` and `/ko/dtv-extension-and-reentry` missing `/blog/`; old updated_at; no Source Note |
| 6 | dtv-extension-and-reentry.md | 2026-05-05 | P1 | Missing 8/31 update; must_link `/ko/dtv-visa` and `/ko/dtv-entry-checks` missing `/blog/`; no Source Note |
| 7 | dtv-family-documents.md | 2026-06-02 | P1 | Missing 8/31 update (family docs + Proof of Permanent Residence context); must_link `/ko/dtv-required-documents` and `/ko/dtv-bank-balance` missing `/blog/`; no Source Note |
| 8 | dtv-freelance-proof.md | 2026-06-04 | P1 | Missing 8/31 update; must_link `/ko/dtv-required-documents` missing `/blog/`; no Source Note |
| 9 | dtv-interview-format.md | 2026-05-05 | P1 | Missing 8/31 context; must_link `/ko/dtv-interview-questions`, `/ko/dtv-required-documents`, `/ko/dtv-where-to-apply` all missing `/blog/`; no Source Note |
| 10 | dtv-interview-questions.md | 2026-05-05 | P1 | Missing 8/31 context; must_link `/ko/dtv-interview-format`, `/ko/dtv-required-documents`, `/ko/dtv-acceptance-letter` all missing `/blog/`; no Source Note |
| 11 | dtv-processing-time.md | 2026-06-04 | P1 | Fixed time "1~3주" stated as general rule at L43, L49, L51 without sufficient qualification; no 8/31 update; no Source Note |
| 12 | dtv-required-documents.md | 2026-05-04 | P1 | Missing 8/31 update (highest-priority article — core document checklist); USD conversion "약 USD 14,000" (L78); no Source Note; must_link `/ko/golf-dtv` ✓ |
| 13 | dtv-soft-power.md | 2026-05-04 | P1 | Missing 8/31 update; "대사관 규격에 맞는 서류 보장" guarantee wording (L112); must_link `/ko/golf-dtv` ✓, `/ko/dtv-soft-power-vs-freelance` ✓ (app LP); no Source Note |
| 14 | dtv-soft-power-comparison.md | 2026-05-05 | P1 | Missing 8/31 update; must_link `/ko/dtv-soft-power` and `/ko/dtv-acceptance-letter` missing `/blog/`; no Source Note |
| 15 | dtv-soft-power-vs-freelance.md | 2026-05-04 | P1 | Missing 8/31 update; must_link `/ko/dtv-soft-power` missing `/blog/`; no Source Note |
| 16 | dtv-upload-documents.md | 2026-06-04 | P1 | Missing 8/31 update; must_link `/ko/dtv-required-documents` missing `/blog/`; no Source Note |
| 17 | dtv-visa.md | 2026-05-04 | P1 | Missing 8/31 update; fixed time "1~3주" (L106); USD conversion "약 USD 280" (L49), "약 USD 14,000" (L86); no Source Note |
| 18 | dtv-where-to-apply.md | 2026-06-04 | P1 | Missing 8/31 update; body link `/ko/dtv-required-documents` missing `/blog/` (L135); missing Seoul Tier B facts (Entry/Exit Facts, 2-day window, criminal record 3-month validity, stay-in-Korea recommendation); no Source Note |
| 19 | dtv-work-limitations.md | 2026-05-05 | P1 | Missing 8/31 context; must_link `/ko/dtv-visa` and `/ko/dtv-freelance-proof` missing `/blog/`; no Source Note |
| 20 | golf-dtv-after-approval.md | 2026-05-16 | P1 | Missing 8/31 update; no Source Note; must_link all correct ✓ |
| 21 | golf-dtv-comparison.md | 2026-05-16 | P1 | Body link `/ko/blog/dtv-fee-by-nationality` (redirect — should be updated to direct link `/ko/blog/dtv-application-nationality-notes`); missing 8/31 update; no Source Note |
| 22 | golf-dtv-cost.md | 2026-05-16 | P1 | Body link `/ko/blog/dtv-fee-by-nationality` (redirect); missing 8/31 update; no Source Note |
| 23 | golf-dtv-documents.md | 2026-05-16 | P1 | Missing 8/31 update (supporting docs context); fixed time "2~4주" (L136); timeline table without 8/31 context; no Source Note |
| 24 | golf-dtv-faq.md | 2026-05-16 | P1 | Fixed time table (Q10): "입학 허가서 취득 2~4주", "대사관 심사 1~3주 정도" presented as reference figures without qualification; missing 8/31 update; no Source Note |
| 25 | golf-dtv-mistakes.md | 2026-05-16 | P1 | Body link `/ko/blog/dtv-fee-by-nationality` (redirect); fixed time "1~3주 정도" (L100); missing 8/31 update; no Source Note |
| 26 | golf-dtv-overview.md | 2026-05-16 | P1 | Body link `/ko/blog/dtv-fee-by-nationality` (redirect); missing 8/31 update; no Source Note |
| 27 | golf-dtv-process.md | 2026-05-16 | P1 | Body link `/ko/blog/dtv-fee-by-nationality` (redirect); fixed times "2~4주" (L79), "1~3주 정도" (L112); missing 8/31 update; no Source Note |
| 28 | golf-dtv-suitability.md | 2026-05-16 | P1 | Body link `/ko/blog/dtv-fee-by-nationality` (redirect); fixed times "1~3주 정도" (L98); missing 8/31 update; no Source Note |
| 29 | golf-dtv-vs-soft-power.md | 2026-05-16 | P1 | Missing 8/31 update; no Source Note |

### P2 / SAFE_AUTO_FIX — Medium Priority (17 articles)

| # | File | updated_at | Classification | Key Issues |
|---|---|---|---|---|
| 30 | dtv-application-nationality-notes.md | 2026-06-02 | P2 | No Source Note; no formal Seoul Tier B attribution (mentions 주한 태국 대사관 but doesn't label as Tier B) |
| 31 | dtv-application-timeline.md | 2026-06-04 | P2 | No Source Note; fixed times in table qualified with context note (acceptable); must_link all correct ✓ |
| 32 | dtv-bank-account.md | 2026-06-04 | P2 | Must_link `/ko/dtv-visa` missing `/blog/`; body link `/ko/dtv-visa` (L116) missing `/blog/`; no Source Note |
| 33 | dtv-bank-balance.md | 2026-05-04 | P2 | Must_link `/ko/dtv-required-documents` missing `/blog/`; USD conversion "약 USD 14,000" (L46); no Source Note |
| 34 | dtv-bank-balance-faq.md | 2026-06-04 | P2 | Must_link `/ko/dtv-bank-balance` and `/ko/dtv-required-documents` both missing `/blog/`; no Source Note |
| 35 | dtv-digital-nomad-visa.md | 2026-05-04 | P2 | Must_link `/ko/dtv-visa` missing `/blog/`; USD conversion "~USD 280" (L95); no Source Note |
| 36 | dtv-evisa-form-guide.md | 2026-06-04 | P2 | No Source Note; must_link `/ko/dtv-application` ✓, `/ko/guide/evisa-form` ✓, `/ko/blog/dtv-where-to-apply` ✓ |
| 37 | dtv-income-proof.md | 2026-06-04 | P2 | Must_link `/ko/dtv-required-documents` and `/ko/dtv-bank-balance` missing `/blog/`; no Source Note |
| 38 | dtv-job-change-after-application.md | 2026-05-05 | P2 | Must_link `/ko/dtv-freelance-proof` and `/ko/dtv-work-limitations` missing `/blog/`; no Source Note |
| 39 | dtv-life-setup.md | 2026-06-02 | P2 | Must_link `/ko/dtv-visa`, `/ko/dtv-bank-account`, `/ko/dtv-extension-and-reentry` all missing `/blog/`; no Source Note |
| 40 | dtv-over-50.md | 2026-05-05 | P2 | Must_link `/ko/dtv-vs-retirement-visa` and `/ko/dtv-soft-power` missing `/blog/`; no Source Note |
| 41 | dtv-portfolio-supporting-documents.md | 2026-06-04 | P2 | Must_link `/ko/dtv-required-documents` missing `/blog/`; no Source Note |
| 42 | dtv-rejection-reasons.md | 2026-06-04 | P2 | No Source Note; must_link all correct ✓ |
| 43 | dtv-vs-ltr.md | 2026-05-04 | P2 | Must_link `/ko/thailand-long-stay-visa-comparison` missing `/blog/`; USD conversions for LTR income thresholds (contextually necessary for LTR explanation); no Source Note |
| 44 | dtv-vs-retirement-visa.md | 2026-05-04 | P2 | Must_link `/ko/thailand-long-stay-visa-comparison` missing `/blog/`; no Source Note |
| 45 | dtv-vs-thailand-privilege.md | 2026-05-04 | P2 | Must_link `/ko/thailand-long-stay-visa-comparison` missing `/blog/`; USD conversion "약 USD 280" (L47); no Source Note |
| 46 | thailand-long-stay-visa-comparison.md | 2026-06-02 | P2 | Must_link `/ko/dtv-visa` missing `/blog/`; USD conversions for LTR thresholds (contextually necessary); no Source Note |

### HUMAN_REVIEW

| # | File | updated_at | Classification | Reason |
|---|---|---|---|---|
| 47 | who-should-choose-golf-dtv.md | 2026-05-04 | HUMAN_REVIEW | Cannibalization with `golf-dtv-suitability.md`. Same pattern as JA (deleted+redirected) and EN (pending decision). Must_link `/ko/dtv-soft-power` and `/ko/dtv-vs-retirement-visa` missing `/blog/`. USD conversion "약 USD 14,000" (L147). No Source Note. Decision required: delete+redirect or differentiate. |

---

## C. Broken Links

### Redirect Links (Not 404 — But Should Be Updated to Direct Links)

The following articles link to `/ko/blog/dtv-fee-by-nationality`. A redirect is confirmed in `next.config.ts` → `/ko/blog/dtv-application-nationality-notes`. Links will not 404, but should be updated to direct links.

| Link Used | Articles | Correct Direct URL |
|---|---|---|
| `/ko/blog/dtv-fee-by-nationality` | golf-dtv-comparison.md, golf-dtv-cost.md, golf-dtv-mistakes.md, golf-dtv-overview.md, golf-dtv-process.md, golf-dtv-suitability.md | `/ko/blog/dtv-application-nationality-notes` |

### Must_link_pages With Missing `/blog/` Prefix

These paths appear in frontmatter `must_link_pages`. They are blog article slugs that require the `/blog/` prefix.

| Path Used | Correct Path | Affected Articles |
|---|---|---|
| `/ko/dtv-required-documents` | `/ko/blog/dtv-required-documents` | dtv-acceptance-letter, dtv-bank-balance, dtv-bank-balance-faq, dtv-common-document-mistakes, dtv-entry-checks, dtv-family-documents, dtv-freelance-proof, dtv-income-proof, dtv-interview-format, dtv-interview-questions, dtv-over-50 (soft-power link), dtv-portfolio-supporting-documents, dtv-upload-documents |
| `/ko/dtv-soft-power` | `/ko/blog/dtv-soft-power` | dtv-acceptance-letter, dtv-acceptance-letter-checkpoints, dtv-over-50, dtv-soft-power-comparison, dtv-soft-power-vs-freelance |
| `/ko/dtv-visa` | `/ko/blog/dtv-visa` | dtv-bank-account, dtv-digital-nomad-visa, dtv-extension-and-reentry, dtv-life-setup, dtv-work-limitations, thailand-long-stay-visa-comparison |
| `/ko/dtv-acceptance-letter` | `/ko/blog/dtv-acceptance-letter` | dtv-acceptance-letter-checkpoints, dtv-interview-questions, dtv-soft-power-comparison, who-should-choose-golf-dtv |
| `/ko/dtv-bank-balance` | `/ko/blog/dtv-bank-balance` | dtv-bank-balance-faq, dtv-family-documents, dtv-income-proof |
| `/ko/dtv-extension-and-reentry` | `/ko/blog/dtv-extension-and-reentry` | dtv-entry-checks, dtv-life-setup |
| `/ko/dtv-entry-checks` | `/ko/blog/dtv-entry-checks` | dtv-extension-and-reentry |
| `/ko/dtv-interview-format` | `/ko/blog/dtv-interview-format` | dtv-interview-questions |
| `/ko/dtv-interview-questions` | `/ko/blog/dtv-interview-questions` | dtv-interview-format |
| `/ko/dtv-where-to-apply` | `/ko/blog/dtv-where-to-apply` | dtv-interview-format |
| `/ko/dtv-freelance-proof` | `/ko/blog/dtv-freelance-proof` | dtv-job-change-after-application, dtv-work-limitations |
| `/ko/dtv-work-limitations` | `/ko/blog/dtv-work-limitations` | dtv-job-change-after-application |
| `/ko/dtv-vs-retirement-visa` | `/ko/blog/dtv-vs-retirement-visa` | dtv-over-50, who-should-choose-golf-dtv |
| `/ko/dtv-bank-account` | `/ko/blog/dtv-bank-account` | dtv-life-setup |
| `/ko/thailand-long-stay-visa-comparison` | `/ko/blog/thailand-long-stay-visa-comparison` | dtv-vs-ltr, dtv-vs-retirement-visa, dtv-vs-thailand-privilege |

### Body Links With Missing `/blog/` Prefix

Same issue in body text (not frontmatter):

| Path Used | Correct Path | Affected Articles |
|---|---|---|
| `/ko/dtv-acceptance-letter` | `/ko/blog/dtv-acceptance-letter` | dtv-acceptance-letter-checkpoints (L117) |
| `/ko/dtv-soft-power` | `/ko/blog/dtv-soft-power` | dtv-acceptance-letter-checkpoints (L118) |
| `/ko/dtv-visa` | `/ko/blog/dtv-visa` | dtv-bank-account (L116) |
| `/ko/dtv-required-documents` | `/ko/blog/dtv-required-documents` | dtv-where-to-apply (L135) |

### Valid App Page Routes — Do NOT Add `/blog/` Prefix

| Route | Status |
|---|---|
| `/ko/dtv-application` | ✓ App LP page |
| `/ko/dtv-soft-power-vs-freelance` | ✓ App LP page |
| `/ko/soft-power` | ✓ App LP page |
| `/ko/who-should-choose-golf-dtv` | ✓ App LP page |
| `/ko/golf-dtv` | ✓ App LP page |
| `/ko/requirements` | ✓ App LP page |
| `/ko/guide/evisa-form` | ✓ App page |

---

## D. Outdated Factual Claims

### 2026-08-31 Supporting-Document Change — Not Reflected in Any Article

**Impact: ALL 47 KO articles.**

As of 2026-08-31, Proof of Permanent Residence (영주권 증명서) and Certificate of Criminal Record Clearance (범죄 경력 증명서 / 무범죄 증명서) became central DTV supporting-document requirements. Zero KO articles mention either term in this context.

Articles with highest priority to add this update:

| File | Reason for High Priority |
|---|---|
| dtv-required-documents.md | Core document checklist — most important |
| dtv-application.md | Step-by-step process guide — applicants read before applying |
| dtv-family-documents.md | Family docs context directly affected |
| dtv-common-document-mistakes.md | Document mistakes — must include new requirements |
| dtv-acceptance-letter-checkpoints.md | Document checklist — new items should appear |
| dtv-freelance-proof.md | Supporting docs for Workcation route |
| golf-dtv-documents.md | Golf DTV document guide |
| dtv-visa.md | Top-level overview — should reference 8/31 change |

### Fixed Processing Time Claims

These use fixed time estimates without the required qualifier or variance note.

| File | Line | Claim | Issue | Fix Approach |
|---|---|---|---|---|
| dtv-processing-time.md | L43, L49, L51 | "1~3주" stated as the standard | Article's core message, but should be explicit that this is a typical range, not a government guarantee | Add "일반적인 목표" qualifier; note official timelines are not published |
| dtv-application.md | L123 | "통상 1~3주" | Has "통상" qualifier — acceptable, but add variance note | Add "공관·시기에 따라 달라집니다" |
| dtv-application.md | L159 | "서류 준비에 2~4주, 심사에 1~3주" (FAQ) | Fixed times in FAQ without qualifier | Soften with "일반적으로" |
| golf-dtv-faq.md | L123, L125 | Table: "입학 허가서 취득 2~4주", "대사관 심사 1~3주 정도" | Table implies reliable reference without sufficient qualification | Add note under table: "시설·공관·시기에 따라 달라질 수 있습니다" |
| golf-dtv-process.md | L79, L112, L150–151 | "2~4주" (letter), "1~3주 정도" (embassy) | Fixed times throughout | Add qualifiers |
| golf-dtv-documents.md | L136 | "2~4주 걸리므로" | Fixed time | Add "걸리는 경우가 있으므로" |
| dtv-acceptance-letter.md | L127 | "1~3주 (시설에 따라 다름)" | Has qualifier — acceptable | No change needed for this item |

### Guarantee / Approval Language (HUMAN_APPROVAL_REQUIRED §26 — Safe Auto-Fix per HUMAN_APPROVAL_REQUIRED "safe auto-fix" section)

Removing misleading guarantee wording is a safe auto-fix per HUMAN_APPROVAL_REQUIRED.

| File | Line | Claim | Issue |
|---|---|---|---|
| dtv-soft-power.md | L112 | "대사관 규격에 맞는 서류 보장" | "보장" (guarantee) wording; soften to "취득을 지원합니다" or "목표로 합니다" |
| dtv-acceptance-letter.md | L111 | "대사관 규격에 맞는 서류 보장" | Same issue |

### Korean Fee Exemption Status

Korean nationals are confirmed exempt from the 10,000 THB government visa fee per Seoul Tier B. This is correctly stated in:

| File | Status |
|---|---|
| dtv-application-nationality-notes.md | ✓ Correctly states Korean nationals exempt; explains 양자 협정 basis |
| dtv-application.md | ✓ Correctly references dtv-application-nationality-notes.md |
| golf-dtv-cost.md | ✓ Correctly notes Korean nationals exempt (though link to dtv-fee-by-nationality needs update) |
| golf-dtv-mistakes.md | ✓ Correctly notes exemption |
| golf-dtv-comparison.md | ✓ Correctly notes exemption |
| golf-dtv-process.md | ✓ Correctly notes exemption |
| golf-dtv-suitability.md | ✓ Correctly notes exemption |

**No incorrect fee exemption claims found.** However, the Source Note in `dtv-application-nationality-notes.md` should formally attribute this to the Royal Thai Embassy Seoul (Tier B).

---

## E. KO Localization Quality

### Translation vs. Localization

Several articles show evidence of being adapted from Japanese source content rather than independently localized:

| File | Localization Issue |
|---|---|
| dtv-soft-power.md | FAQ (L123): "일본(또는 한국) 골프 클럽이 발급한 서류로..." — Japan listed first before Korea in a Korean-language article. Should be "한국(또는 일본)" or Korea-first framing. |
| dtv-processing-time.md | Appears closely modeled on JA version. No Seoul-specific context. |
| dtv-acceptance-letter.md | Structurally mirrors JA version closely. No Seoul-specific notes. |
| golf-dtv-process.md | Timeline tables appear translated from JA. No Seoul-specific application guidance. |

### Seoul Tier B Facts — Missing Where Relevant

The following Seoul-confirmed facts should appear in KO articles but are largely absent:

| Fact | Relevant Articles | Status |
|---|---|---|
| Applicant should be personally in Korea on final submission date | dtv-where-to-apply, dtv-evisa-form-guide, dtv-application | ❌ Not mentioned |
| English Entry/Exit Facts (입출국 사실증명서) may be requested | dtv-required-documents, dtv-where-to-apply | ❌ Not mentioned |
| Entry/Exit Facts must be issued within 2 days of final payment/submission | dtv-required-documents | ❌ Not mentioned |
| Criminal record certificate: issued within 3 months before application | dtv-required-documents, dtv-rejection-reasons | ❌ Not mentioned |
| Staying in Korea during review is recommended | dtv-processing-time, dtv-where-to-apply | ❌ Not mentioned |
| Entering Thailand while application is pending is NOT recommended | dtv-extension-and-reentry, dtv-entry-checks | ❌ Not mentioned |
| Third-country application may require legal permanent residence | dtv-where-to-apply | Partially addressed (mentions restrictions but not legal permanent residence requirement) |
| Adult dependents need own criminal record certificate | dtv-family-documents | ❌ Not mentioned |

### KO-Specific Strengths

| File | Positive Localization |
|---|---|
| dtv-application-nationality-notes.md | Excellent KO localization. Korean nationals' dual benefit (fee exemption + 90-day visa-free) clearly explained. Korea-first framing throughout. Well-structured for Korean search intent. |
| dtv-where-to-apply.md | Mentions 주한 태국 대사관(서울) and 태국 왕국 총영사관(부산) as Seoul/Busan options. Korean-specific application scenario described. |
| dtv-application.md | KRW conversion included alongside USD (appropriate for KO audience). Korean-first perspective on application steps. |
| dtv-bank-account.md | Well-adapted for Korean audience — assumes Korean bank accounts as baseline, discusses Wise/direct debit as practical alternatives. |

### Under-Localized Articles (No KO-Specific Adaptation)

| File | Issue |
|---|---|
| dtv-interview-format.md | No mention of Seoul embassy interview patterns. Interview language guidance doesn't address Korean-language option. |
| dtv-interview-questions.md | No Seoul-specific interview context. |
| dtv-rejection-reasons.md | No mention of Korean-specific common rejection triggers. |
| dtv-entry-checks.md | No mention of Seoul-specific entry document expectations. |
| dtv-required-documents.md | Mentions Korean consulate requirements in general, but lacks Seoul Tier B specifics (Entry/Exit Facts, criminal record 3-month validity). |

---

## F. Cannibalization Risks

### CRITICAL (HUMAN_REVIEW Required)

| Article A | Article B | Overlap | Status |
|---|---|---|---|
| `who-should-choose-golf-dtv.md` | `golf-dtv-suitability.md` | Both address "who is Golf DTV right for" — same search intent | JA version of `who-should-choose-golf-dtv.md` was deleted and redirected to `/ja/blog/golf-dtv-suitability`. EN version pending HUMAN_REVIEW. KO version still exists. Decision required: delete+redirect or differentiate. |

**Recommendation:** Mirror the JA decision. Delete `who-should-choose-golf-dtv.md` (KO) and set 301 redirect `/ko/blog/who-should-choose-golf-dtv` → `/ko/blog/golf-dtv-suitability`. Update any body links and must_link entries pointing to the old slug.

Auto-fix cannot proceed — slug change and article deletion require human approval per HUMAN_APPROVAL_REQUIRED §18–21.

### Monitor (Currently Manageable)

| Article A | Article B | Overlap | Evaluation |
|---|---|---|---|
| `dtv-soft-power-vs-freelance.md` | `golf-dtv-vs-soft-power.md` | Soft Power comparison | Different angles: route selection vs. activity selection. Manageable with clear cross-links. |
| `dtv-acceptance-letter.md` | `dtv-acceptance-letter-checkpoints.md` | Acceptance letter | Guide vs. checklist — well differentiated. Should cross-link explicitly. |
| `dtv-interview-format.md` | `dtv-interview-questions.md` | Interview preparation | Format vs. questions — complementary. Should cross-link. |
| `golf-dtv-overview.md` | `dtv-soft-power.md` | Golf DTV introduction vs. Soft Power overview | Different primary intent. Golf DTV service-specific vs. DTV route explanation. Manageable. |

---

## G. Controlled Fact Conflicts

### No Direct Violations Found

| Item | Status |
|---|---|
| GolfDTV pricing (Silver 20,000 / Gold 50,000 / Platinum 100,000 THB) | Not stated in blog articles — correctly deferred to /ko/golf-dtv LP page ✓ |
| 96% approval rate | Not mentioned in any KO article ✓ |
| 7-day fastest approval | Not mentioned in any KO article ✓ |
| Club Thailand launch status | Not mentioned in any KO article ✓ |
| DTV fee 10,000 THB | Consistently stated ✓ |
| Korean fee exemption 0 THB | Correctly stated in 7 articles ✓ |
| 500,000 THB bank balance | Consistently stated ✓ |
| 5-year validity | Consistently stated ✓ |
| 180 days per entry | Consistently stated ✓ |
| Multiple entry | Consistently stated ✓ |

### Guarantee Language — Safe Auto-Fix Required

| File | Line | Issue |
|---|---|---|
| dtv-soft-power.md | L112 | "대사관 규격에 맞는 서류 보장" — guarantee wording for service benefit. Safe auto-fix: soften. |
| dtv-acceptance-letter.md | L111 | Same wording. Safe auto-fix: soften. |

### USD/Non-KRW Conversions

KO articles use USD for the 500,000 THB bank balance conversion in several places. Per LOCALIZATION_RULES, THB is the primary currency. KRW conversions are appropriate for Korean audience. USD conversions should be reviewed.

**Policy for KO:** KRW conversions are appropriate and useful for Korean readers. USD conversions are less relevant and should either be removed or relegated to a parenthetical note.

| File | Currency Issue |
|---|---|
| dtv-bank-balance.md | "약 USD 14,000 / 약 KRW 19,000,000" — KRW is appropriate; USD can be removed |
| dtv-required-documents.md | "약 USD 14,000 / 약 KRW 19,000,000" — same |
| dtv-application.md | "약 USD 280 / 약 KRW 380,000" — KRW appropriate; USD can be removed |
| dtv-visa.md | "약 USD 280", "약 USD 14,000" — USD only; should add KRW or remove USD |
| dtv-digital-nomad-visa.md | "~USD 280" — should add KRW |
| dtv-vs-ltr.md | USD for LTR thresholds — contextually necessary (LTR is USD-denominated by design) — acceptable |
| who-should-choose-golf-dtv.md | "약 USD 14,000" — per HUMAN_REVIEW status |

---

## H. Seoul Tier B Coverage

### Articles That Should Include Seoul Tier B Facts But Don't

| File | Missing Seoul Tier B Facts |
|---|---|
| dtv-required-documents.md | English Entry/Exit Facts (입출국 사실증명서) requirement; issued within 2 days; criminal record certificate issued within 3 months |
| dtv-where-to-apply.md | Applicant personally in Korea on submission date; staying in Korea during review recommended; entering Thailand while pending not recommended |
| dtv-application.md | Staying in Korea during review; not entering Thailand while pending |
| dtv-processing-time.md | Staying in Korea during review; third-country travel risk during processing |
| dtv-evisa-form-guide.md | Applicant personally in Korea on submission date |
| dtv-interview-format.md | Seoul embassy interview format specifics |
| dtv-family-documents.md | Adult dependents need own criminal record certificate; minor situation |
| dtv-rejection-reasons.md | Korean-specific reasons (Entry/Exit Facts missing, criminal record out of 3-month window) |
| dtv-extension-and-reentry.md | Not recommended to enter Thailand while application is pending |

### Articles That Correctly Reference Seoul Tier B

| File | Coverage |
|---|---|
| dtv-application-nationality-notes.md | Fee exemption basis correctly attributed to Royal Thai Embassy Seoul and 주한 태국 왕국 대사관 |
| dtv-where-to-apply.md | Lists 주한 태국 대사관(서울) and 태국 왕국 총영사관(부산) — partial coverage |

### Articles That Over-Generalize Seoul-Specific Rules

No articles were found that present Seoul-specific rules as universal DTV rules. The opposite problem exists: Seoul Tier B facts are not included at all.

---

## I. JA/EN vs KO Coverage Comparison

### KO-Only Articles (No JA/EN Exact Counterpart)

None. All 47 KO articles have JA or EN counterparts.

### JA-Only Articles (No KO Counterpart)

| JA Article | KO Status | Notes |
|---|---|---|
| golf-dtv-what-is.md | KO has `golf-dtv-overview.md` | Different slug, overlapping topic. KO coverage adequate. |
| golf-dtv-plans.md | No direct KO equivalent | KO `golf-dtv-cost.md` covers cost but not plan tiers. Low priority gap. |
| golf-dtv-application.md | KO has `golf-dtv-process.md` | Different slug, overlapping topic. KO coverage adequate. |

### Significant Content Gaps in KO vs JA/EN

| Topic | JA/EN Coverage | KO Coverage | Gap Level |
|---|---|---|---|
| Seoul Tier B facts (Entry/Exit Facts, criminal record validity, review-period stay) | N/A (JA has Fukuoka-specific; EN is international) | Largely missing | HIGH — KO-specific critical gap |
| 2026-08-31 supporting document changes | Added to JA P1 articles (post-audit); EN pending update | Missing entirely | HIGH |
| Source Notes | JA updated; EN pending | None | HIGH |
| Korean fee exemption | JA/EN mention generally | KO has dedicated article (excellent) | Strong ✓ |
| 90-day visa-free for Korean nationals | No JA/EN equivalent | dtv-application-nationality-notes.md covers well | Strong ✓ |
| GolfDTV plan tiers (Silver/Gold/Platinum) | JA has golf-dtv-plans.md | Not covered in blog articles (correctly deferred to LP) | Acceptable ✓ |

---

## J. Source Note Template for KO Articles

All KO articles require a Source Note section added at the end of the body (before the footer timestamp line). Use the following template as the standard:

```markdown
---

## 출처 안내

| 출처 | 등급 | 비고 |
|---|---|---|
| 태국 외무부 — DTV 프로그램 | A등급 | 비자 공식 종류 및 조건 |
| 태국 정부 Thai e-Visa 포털 | A등급 | 신청 시스템 공식 안내 |

*이 정보는 공식 안내를 바탕으로 작성했습니다. 제도·운용은 변경될 수 있습니다. 신청 전에 신청 예정 공관의 최신 안내를 확인하세요.*
```

For articles covering Seoul embassy specifics (dtv-where-to-apply, dtv-required-documents, dtv-application-nationality-notes, dtv-interview-format, etc.), add a Seoul Tier B row:

```markdown
| 주한 태국 왕국 대사관 — 직접 확인 안내 | B등급 | 한국 신청자 대상 서울 공관 특정 정보 |
```

---

## K. Recommended Auto-Update Order

### Phase 0 — Fix dtv-fee-by-nationality Redirect Links (6 articles)

Fix 6 body links pointing to `/ko/blog/dtv-fee-by-nationality` → update to `/ko/blog/dtv-application-nationality-notes` directly. These redirects work but should be direct links.

1. golf-dtv-cost.md
2. golf-dtv-overview.md
3. golf-dtv-comparison.md
4. golf-dtv-process.md
5. golf-dtv-suitability.md
6. golf-dtv-mistakes.md

### Phase 1 — Core Document + Process Articles (Highest Impact)

These articles are most likely to be read by active applicants. Fix broken links + add 8/31 update + add Source Note + soften fixed times where needed.

Priority order:

7. **dtv-required-documents.md** — Add 8/31 update (영주권 증명서, 범죄 경력 증명서); fix must_link; add Seoul Tier B (Entry/Exit Facts, criminal record 3-month validity); add Source Note; remove USD conversion or add KRW alongside
8. **dtv-application.md** — Add 8/31 reference; fix must_link; soften fixed times; add Source Note
9. **dtv-visa.md** — Add 8/31 reference; fix fixed times; add KRW conversions; add Source Note
10. **dtv-where-to-apply.md** — Add Seoul Tier B facts; fix body link; add Source Note
11. **dtv-soft-power.md** — Add 8/31 update; fix "보장" guarantee wording; add Source Note
12. **dtv-acceptance-letter.md** — Add 8/31 context; fix must_link; fix "보장" guarantee wording; add Source Note
13. **golf-dtv-documents.md** — Add 8/31 update; soften fixed time; add Source Note
14. **dtv-family-documents.md** — Add 8/31 update (family docs); fix must_link; add Seoul Tier B (adult dependents, minor criminal record); add Source Note
15. **dtv-common-document-mistakes.md** — Add 8/31 update; fix must_link; add Source Note
16. **dtv-acceptance-letter-checkpoints.md** — Add 8/31 context; fix must_link + body links; add Source Note

### Phase 2 — Process Articles + Golf DTV Articles

17. dtv-processing-time.md — Qualify fixed time claims; add Source Note
18. dtv-soft-power-comparison.md — Fix must_link; add 8/31 context; add Source Note
19. dtv-soft-power-vs-freelance.md — Fix must_link; add 8/31 context; add Source Note
20. dtv-freelance-proof.md — Fix must_link; add 8/31 context; add Source Note
21. dtv-upload-documents.md — Fix must_link; add 8/31 context; add Source Note
22. dtv-interview-format.md — Fix must_link; add Seoul Tier B interview context; add Source Note
23. dtv-interview-questions.md — Fix must_link; add Source Note
24. dtv-entry-checks.md — Fix must_link; add 8/31 context; add Source Note
25. dtv-extension-and-reentry.md — Fix must_link; add Seoul Tier B (not entering Thailand while pending); add Source Note
26. dtv-work-limitations.md — Fix must_link; add Source Note
27. golf-dtv-faq.md — Qualify fixed time table; add 8/31 context; add Source Note
28. golf-dtv-process.md — Fix dtv-fee-by-nationality link (Phase 0); add 8/31 note; qualify fixed times; add Source Note
29. golf-dtv-overview.md — Fix link (Phase 0); add 8/31 note; add Source Note
30. golf-dtv-after-approval.md — Add 8/31 context; add Source Note
31. golf-dtv-vs-soft-power.md — Add 8/31 context; add Source Note
32. golf-dtv-mistakes.md — Fix link (Phase 0); qualify fixed times; add 8/31; add Source Note

### Phase 3 — P2 Articles (Missing Source Note + Minor Fixes)

33–46. All remaining P2 articles: fix must_link paths, add Source Note, update KRW conversions where relevant. See Section B for specific issues per article.

---

## L. HUMAN_REVIEW Decisions Required

### Decision 1: who-should-choose-golf-dtv.md (KO)

**APPROVED 2026-09-16 — Execute during KO SAFE_AUTO_FIX phase.**

| Item | Detail |
|---|---|
| Article | `who-should-choose-golf-dtv.md` |
| Decision | **Option A approved** — Delete KO article + set 301 redirect to `/ko/blog/golf-dtv-suitability` |
| Execution order | 1) Compare both articles; 2) Extract unique content with Tier A/B/C backing only; 3) Integrate minimal verified content into suitability.md; 4) Do NOT migrate unverified prices, times, or percentages; 5) Delete article; 6) Add redirect in next.config.ts; 7) Update internal links in dtv-soft-power-comparison.md and dtv-over-50.md |
| App LP | `/ko/who-should-choose-golf-dtv` (app page) — do NOT touch; separate from blog article |
| Status | **Pending execution** — holds until KO SAFE_AUTO_FIX phase begins |

---

## M. Confirmed Policy Decisions (2026-09-16)

### M-1: KO Currency Policy

| Currency | Policy |
|---|---|
| **THB** | Primary / Source of Truth for all government requirements (Financial Evidence, Government Visa Fee, GolfDTV pricing) |
| **USD** | Remove from KO articles unless article's primary search intent is currency conversion (if so → HUMAN_REVIEW, do not auto-delete) |
| **KRW** | Do NOT auto-generate new KRW conversions. Existing KRW conversions: do not change to new values without confirmed rate basis — send to HUMAN_REVIEW if update is needed. New KRW display only where price-comparison or fee-search intent is clearly served, and only after explicit approval. |

Rationale: Static KRW conversions can mislead readers into treating converted amounts as government-mandated KRW requirements. THB is the legally defined basis.

LTR exception: USD thresholds in dtv-vs-ltr.md / thailand-long-stay-visa-comparison.md are BOI official USD-denominated figures — retain as-is.

### M-2: Korean Government Visa Fee (Seoul Tier B)

Korean nationals are exempt from the DTV government visa fee, based on direct confirmation from the Royal Thai Embassy Seoul (Tier B). This fact may be used in relevant KO articles.

Natural Korean phrasing example:
> "한국 국적자는 현재 주한 태국대사관의 DTV 비자 수수료가 면제됩니다."

Constraints:
- Label as Seoul Tier B (주한 태국 왕국 대사관 직접 확인)
- Do NOT generalize to other nationalities
- Do NOT imply worldwide rule

### M-3: Seoul Tier B Usage Criteria

Add Seoul Tier B facts ONLY where the article's search intent is directly affected by Seoul-specific application procedures.

**Add Seoul Tier B to:**
- dtv-required-documents.md — Entry/Exit Facts, 3-month criminal record validity, 2-day issuance window
- dtv-where-to-apply.md — Applicant in Korea on submission date; stay-in-Korea recommendation; not entering Thailand while pending
- dtv-application.md — Stay-in-Korea during review; not entering Thailand while pending
- dtv-evisa-form-guide.md — Applicant in Korea on submission date
- dtv-family-documents.md — Adult dependent criminal record; minor situation
- dtv-rejection-reasons.md — Korean-specific rejection triggers (Entry/Exit Facts missing, criminal record expired)
- dtv-extension-and-reentry.md — Not entering Thailand while application pending
- dtv-processing-time.md — Stay-in-Korea recommendation; third-country travel risk
- dtv-interview-format.md — Seoul-specific interview patterns
- dtv-application-nationality-notes.md — Fee exemption formal Seoul Tier B attribution

**Do NOT add Seoul Tier B to:**
- After-approval articles (golf-dtv-after-approval, dtv-life-setup, dtv-job-change-after-application)
- Life setup / banking articles
- Visa comparison articles (dtv-vs-ltr, dtv-vs-retirement-visa, dtv-vs-thailand-privilege)
- Articles where Seoul application procedure does not affect the answer

Do NOT label Seoul embassy as endorsing or recommending GolfDTV.

### M-4: KO SAFE_AUTO_FIX Start Condition

KO SAFE_AUTO_FIX phase is **on hold** pending EN_BLOG_UPDATE_REPORT_2026-09.md review completion. No KO article body edits to be made until explicitly authorized.

---

*Audit completed: 2026-09-16 by Claude Code (Sonnet 4.6). All 47 KO articles reviewed.*
*Policy decisions recorded: 2026-09-16.*
*KO article edits: HOLD — awaiting SAFE_AUTO_FIX authorization.*
