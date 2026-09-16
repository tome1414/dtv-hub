# KO GolfDTV Localization Second Pass — 2026-09

Date: 2026-09-16
Scope: 9 GolfDTV-focused KO blog articles, full ground-up Korean-market rewrite (not a translation correction pass — see project instruction).
Executor: Claude Code (Sonnet 5)

---

## A. 수정 완료 9기사

| # | 파일 | Commit SHA |
|---|---|---|
| 1 | golf-dtv-overview.md | `053efed` |
| 2 | golf-dtv-documents.md | `2a991d9` |
| 3 | golf-dtv-process.md | `151d069` |
| 4 | golf-dtv-cost.md | `414ad7e` |
| 5 | golf-dtv-comparison.md | `485c8f2` |
| 6 | golf-dtv-suitability.md | `de1b379` |
| 7 | golf-dtv-mistakes.md | `0241627` |
| 8 | golf-dtv-faq.md | `15b58d2` |
| 9 | golf-dtv-after-approval.md | `b1a02ab` |

Slug, canonical, and file location unchanged for all 9. No new articles created, none deleted, no redirects added.

## B. Primary Keyword 변경

| 파일 | 기존 | 변경 후 |
|---|---|---|
| golf-dtv-overview | Golf DTV란 | 골프 DTV란 |
| golf-dtv-documents | 골프 DTV 서류 | 골프 DTV 필요서류 |
| golf-dtv-process | Golf DTV 흐름 | 골프 DTV 신청 절차 |
| golf-dtv-cost | 골프 DTV 비용 | 골프 DTV 비용 (유지) |
| golf-dtv-comparison | 골프 DTV 비교 | 골프 DTV 비교 (유지, 범위 재설계) |
| golf-dtv-suitability | 골프 DTV 맞는 사람 | 골프 DTV 추천 대상 |
| golf-dtv-faq | 골프 DTV 자주 있는 질문 | 골프 DTV 자주 묻는 질문 |
| golf-dtv-mistakes | 골프 DTV 실패 | 골프 DTV 신청 실수 |
| golf-dtv-after-approval | 골프 DTV 취득 후 | 골프 DTV 승인 후 |

Secondary keywords redesigned per article (3–6 each), all in natural Korean search phrasing rather than mixed English/Korean ("Golf DTV FAQ" → "골프 DTV FAQ" style terms replaced with Korean-first phrasing). No keyword stuffing — each secondary keyword appears at most once or twice in body text, driven by natural phrasing rather than repetition.

## C. Title 변경

All 9 titles rewritten from a mechanical "Golf DTV, [JA-structured question]? | [subtitle]" pattern to direct Korean search-intent titles (e.g. "골프 DTV, 실제로 얼마나 드나?" → "골프 DTV 비용 | GolfDTV 이용료·정부 비자 수수료·현지 비용 완전 정리"). Full before/after is visible in each commit diff.

## D. H1/H2 주요 변경

- **golf-dtv-overview**: restructured from "명칭의 유래 → DTV 개요 → 왜 골프인가 → 서류 → 오해 → 맞는 사람 → 다른 루트와의 관계 → 정리" to a tighter Answer-First flow ending in 8/31 and 10월 update call-outs.
- **golf-dtv-documents**: reorganized entirely around a new "역할 분담" (GolfDTV 준비 vs 신청자 준비 vs 한국 신청자 추가 서류) table — this structure did not exist in the JA-derived original.
- **golf-dtv-process**: replaced the original "4단계" (검토→서류→신청→도항 후) structure with the requested 9-step flow (공관 확인 → 상담 → GolfDTV 결제 → 프로그램 서류 → 개인 서류 → e-Visa 입력 → 최종 제출 → 추가서류 대응 → 결과 확인).
- **golf-dtv-cost**: replaced the "4가지 비용 카테고리" framing with a clean A/B/C/D breakdown (GolfDTV 이용료 / Application Support / VAT / 정부 비자 수수료), plus a separate "비용이 아닌 것" section for the 500,000 THB Financial Evidence.
- **golf-dtv-comparison**: rescoped from a 4-way DTV/Retirement/Privilege/LTR comparison table (redundant with dedicated comparison articles not in this batch) to a 3-way Workcation vs Golf vs other-Soft-Power comparison, per the article-specific goal.
- **golf-dtv-suitability**: restructured to give "잘 맞는 경우" and "잘 맞지 않는 경우" strictly equal section weight (4 profiles each), removing the prior scoring-checklist format.
- **golf-dtv-mistakes**: restructured from a generic "준비/정합성/일정 부족" 3-category checklist to 5 Korea-specific mistake patterns matching the article-specific goal exactly.
- **golf-dtv-faq**: reorganized from a flat "Q1–Q10" numbered list into 5 topic clusters (기본 요건 / 비용 / 서류 / 한국에서 신청할 때 / 승인 후), expanded to 13 questions including 3 new Korea-specific ones.
- **golf-dtv-after-approval**: restructured into a linear post-approval sequence (승인 확인 → 입국 → 프로그램 참가 → 180일 → 90일 신고 → 재입국 → 확인 필요 영역), replacing the prior "할 수 있는 것/그레이 영역/의무" grouping.

## E. Seoul Tier B 반영 기사

| 파일 | 반영 사실 |
|---|---|
| golf-dtv-documents | 영문 주민등록등본, 출입국 사실증명(2일 이내), 범죄 경력 증명서(3개월 이내, 경찰서 발급 권고이나 온라인/PDF 무조건 불가 아님), 성인/미성년 부양가족 규정 |
| golf-dtv-process | 최종 제출일 한국 체류, 출입국 사실증명 2일 기준, 심사 중 한국 체류 권고, 심사 중 태국 입국 비권고 |
| golf-dtv-cost | 한국 국적자 정부 비자 수수료 면제 (Seoul Tier B로 명시적으로 라벨링) |
| golf-dtv-mistakes | 최종 제출일 체류 요건, 출입국 사실증명 발급 시점, 범죄 경력 증명서 유효기간, 공관별 혼동 방지 |
| golf-dtv-faq | 최종 제출일 한국 체류, 심사 중 태국 입국 비권고, 부양가족 규정 (Q9–Q11에 집중 배치) |

Seoul embassy endorsement/partnership with GolfDTV was not claimed anywhere; every Tier B statement is scoped to "서울 공관에서 직접 확인된 정보 / 다른 공관에 그대로 적용되지 않을 수 있음."

## F. Seoul Tier B 미반영 기사와 이유

| 파일 | 이유 |
|---|---|
| golf-dtv-overview | 검색 의도가 "정의 확인"이며 절차가 아님 — 지시대로 최소화(사실상 미포함) |
| golf-dtv-comparison | 검색 의도가 경로 간 비교이며, 과도한 Tier B 삽입은 지시에서 명시적으로 금지됨 |
| golf-dtv-suitability | 검색 의도가 적합성 판단이며, 절차적 세부사항은 문서 목적과 무관 |
| golf-dtv-after-approval | Tier B 정보는 전부 신청 단계(입국 전) 정보이며, 이 기사는 승인 후 실무만 다룸 — 지시대로 "거의 불필요" 원칙 준수 |

## G. CTA 변경

전체 9기사에서 "골프 DTV 상세·무료 상담" 같은 영업 문구 톤을 제거하고, 아래 4개 후보 중 기사 목적에 맞는 것을 1~2개씩 배치했습니다.

- GolfDTV가 나에게 맞는지 확인하기 (overview, comparison, suitability, after-approval)
- 필요한 서류 확인하기 (documents, mistakes, faq)
- 신청 절차 상담받기 (process, mistakes, faq)
- GolfDTV 플랜 확인하기 (overview, cost, suitability, after-approval)

모든 CTA는 `/ko/golf-dtv`로 자연스럽게 연결되며, 기사당 본문 내 CTA 언급은 1~2회로 제한했습니다.

## H. FAQ 변경

- golf-dtv-faq.md: 10문항 → **13문항**으로 확장, 5개 토픽 클러스터로 재구성, 한국 특화 질문 3개(최종 제출일 체류, 비자 수수료 면제, 심사 중 태국 입국) 신규 추가.
- 나머지 8기사도 각 기사 목적에 맞게 FAQ 2~4문항을 새로 작성 (기계적 번역 문장 없음, 전량 신규 작성).
- 모든 FAQ 본문 내용은 해당 기사의 본문 서술과 사실관계가 일치하도록 상호 대조 완료 (예: golf-dtv-faq의 비용 답변은 golf-dtv-cost의 A/B/C/D 구조와 동일한 용어 사용).

## I. Source Note 변경

Tier 구분을 명확히 재정비했습니다.

- **Tier A** (태국 외무부, Thai e-Visa 포털, 태국 출입국관리국): 전 기사 공통.
- **Tier B** (주한 태국 왕국 대사관 직접 확인): golf-dtv-documents, golf-dtv-process, golf-dtv-cost, golf-dtv-mistakes, golf-dtv-faq에 추가.
- **Tier C** (GolfDTV 서비스 자체 정보 — 플랜 구성, 가격, 서비스 업데이트 일정): golf-dtv-overview, golf-dtv-cost, golf-dtv-faq에 명시적으로 "GolfDTV 자체 정보, 정부 공식 정보 아님"이라고 라벨링하여 Tier B와 혼동되지 않도록 구분.

## J. Internal Links 변경

- golf-dtv-comparison.md의 must_link_pages를 golf-dtv-overview/golf-dtv-suitability 중심에서 golf-dtv-suitability + dtv-soft-power-vs-freelance 중심으로 재설계 (재설계된 3-way 비교 범위에 맞춤).
- golf-dtv-cost.md → dtv-application-nationality-notes로 연결 강화 (수수료 면제 상세 정보).
- golf-dtv-documents.md → golf-dtv-mistakes.md 상호 연결 추가.
- 9기사 전체의 internal link 대상 slug를 빌드 결과와 대조해 전부 유효한 경로임을 확인함 (Section N/QA 참조). 9기사 밖의 기존 기사(예: dtv-over-50, dtv-soft-power-comparison)에서 이 9기사로 들어오는 inbound link는 발견되지 않아 별도 수정이 필요 없었음.

## K. Controlled Fact Conflict

**없음.** GOLFDTV_CONFIRMED_FACTS.md의 수치(Silver 20,000 / Gold 50,000 / Platinum 100,000 THB, Application Support +10,000 THB, VAT 적용, 5년 유효, 멀티플 엔트리, 180일)를 golf-dtv-cost.md와 golf-dtv-overview.md에서 정확히 그대로 인용했으며 변경하지 않았습니다. 96% 승인율, 7일 최속 승인 실적은 이번 9기사 어디에도 언급하지 않았습니다(기존 관행대로 LP 페이지에만 유지). Club Thailand는 "파트너십 확정, 10월부터 서비스 예정"으로만 서술했고 "현재 예약 서비스 제공 중"이라는 표현은 사용하지 않았습니다. 새로운 가격, 새로운 승인율, 새로운 공관 승인 주장은 추가하지 않았습니다.

## L. HUMAN_REVIEW

**없음.** 9기사 모두 자동 진행 조건(Controlled Fact 충돌 없음, 새 가격/승인율/공관 승인 주장 없음, Seoul Tier B와 기존 사실 충돌 없음, 새 법적 해석 없음, cannibalization으로 인한 slug/merge 필요성 없음)을 충족하여 HUMAN_REVIEW로 보낸 기사가 없습니다.

## M. Korean Naturalness 개선 요약

원문 9기사 전체에서 일본어 직역투로 확인된 표현을 제거했습니다.

| 제거된 표현 | 원인 | 대체 |
|---|---|---|
| 코스피 | 그린피(green fee)의 오역 (코스피는 주가지수) | 그린피 |
| 레포트 (90일 레포트) | 일본어 レポート 음역 | 90일 신고 |
| 그레이 영역 | 일본어 グレー 음역 | 확인이 필요한 영역 |
| 특전 | 일본어 特典 한자어 그대로 사용 | 혜택 |
| 정주 | 일본어 定住 한자어 그대로 사용 | 정착 |
| 수강료 (골프 시설 이용료를 지칭) | 일본어식 학원비 개념 차용 | 이용료 / 프로그램 비용 |
| "~할 수 있습니다" 반복 | 일본어 ~できます 구조 반복 | 짧고 직접적인 서술형 문장으로 재작성 |
| 일본(또는 한국) 프레이밍 | (해당 기사 중 이번 9개에는 없었으나 이전 세션에서 dtv-soft-power.md에 확인·수정됨) | — |

전체 9기사를 "일본어 원고를 번역한 글"이 아니라 "한국인이 검색했을 때 바로 답을 얻는 글"로 재설계했습니다: 각 기사 리드 문단이 2~3문장 안에 핵심 답을 제시하도록 통일했고, H2마다 결론 문장을 먼저 배치했습니다.

## N. Typecheck / Build

- `npx tsc --noEmit`: **PASS** (no output, no errors)
- `npm run build`: **PASS** — "✓ Compiled successfully in 2.4s"
- Internal link audit: 9기사에서 참조하는 모든 `/ko/blog/[slug]` 링크가 실제 존재하는 파일과 일치함을 확인 (Section J)
- FAQPage schema: FAQ 섹션이 있는 9기사 전체에 `schema_types`에 `FAQPage` 포함 확인
- 금지 표현 검색: 9기사 전체에서 "반드시 승인", "100% 승인", "확실히 승인", "정부 공인 Golf DTV", "Workcation보다 쉽다"/"더 쉽다", "가장 승인받기 쉽다", "5년 연속 체류", "180일×5년", "서울 대사관이 GolfDTV를 승인", "온라인 범죄경력증명서는 불가", "현재 Club Thailand 예약 서비스 제공 중", "새로운 10월 가격" 매칭 **0건**
- KRW/USD 자동 환산: 9기사 전체에서 **0건** (THB 그대로 유지)

## O. Commit SHA 리스트

```
053efed feat(blog/ko): golf-dtv-overview - Korean-market localization second pass
2a991d9 feat(blog/ko): golf-dtv-documents - Korean-market localization second pass
151d069 feat(blog/ko): golf-dtv-process - Korean-market localization second pass
414ad7e feat(blog/ko): golf-dtv-cost - Korean-market localization second pass
485c8f2 feat(blog/ko): golf-dtv-comparison - Korean-market localization second pass
de1b379 feat(blog/ko): golf-dtv-suitability - Korean-market localization second pass
0241627 feat(blog/ko): golf-dtv-mistakes - Korean-market localization second pass
15b58d2 feat(blog/ko): golf-dtv-faq - Korean-market localization second pass
b1a02ab feat(blog/ko): golf-dtv-after-approval - Korean-market localization second pass
```

---

*KO GolfDTV Localization Second Pass complete. 9/9 articles rewritten, committed individually, QA clean, no HUMAN_REVIEW items.*
