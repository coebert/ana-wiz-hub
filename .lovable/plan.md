# AnaesthesiaCore clinical content audit — discovery findings (30 Oct 2026, read-only)

None of the results below show that the content is clinically accurate. Passing tests and resolved citations only show that the content is internally consistent.

## 1. Where the content lives (exact counts)

Source code:
- `src/data/curriculum.ts` (322 lines) is the topic registry: 194 registered topics after the cost and staffing merges (the search and audit builds count 194).
- `src/routes/topicRoutes.ts` (261 lines) is the route table. 3 old cost pages now redirect to `/intensive-care/icu-costs` through `IcuCostLegacyRedirect`. The 2 old staffing pages also redirect to the merged topic.
- `src/pages/topics/`: 200 files, including 3 cost redirect stubs and the 2 staffing stubs.
- `src/components/topic/`: 175 files, 125 of them `*Teaching.tsx` lesson modules.
- `src/components/diagrams/`: 19 top-level entries. Operation diagrams sit inside these; the library has 82 operations in `src/data/operativeSteps.ts`.
- `src/data/references.ts` (3,331 lines): about 2,548 `label:` entries and 1,185 `excerpt:` quotations. About 47% of entries carry a verbatim quote. Some topics also keep references in `anaestheticRiskReferences.ts` and `anatomyReferences.ts`.
- Other clinical data in `src/data/`: `quizzes.ts`, `anaestheticRiskQuiz.ts`, `cases/`, `surgicalProtocols.ts`, ICU drug files (`icuDrugDoses`, `icuInfusions`, `icuDrugSafety`, `icuDrugInteractions`, `icuDrugMechanisms`, `icuDrugWithdrawal`), `anaesthesiaDrugDoses.ts`, `anaesthesiaCalculatorDrugs.ts`, `drug-dose-ranges.ts/.mjs`, `paediatricPk.ts`, `pk/`, `pd/`, the ICU and paediatric flow files, `icuNursingProtocols.ts`, `vivaPassRates.ts`, and `expansionStatus.ts` (413 lines).
- Rules: `AGENTS.md` (5.5 KB) plus the project knowledge notes.

Database (not in the source code; must be audited separately):
- `drugs`: 208 drug entries (28 with blood-level monitoring), the source for the Drug Reference.
- `viva_model_answers`: 993 AI-generated model answers.
- `podcasts`: 358 rows, 232 with saved scripts (transcripts).
- `ask_qa_library`: 21 saved Ask AI answers.
- `kb_chunks`: 788 chunks covering 142 topics. The newest is from 25 Jun 2026, so it is stale against the current 194 topics.
- `topic_references`: 19 rows of AI-gathered references.
- `content_overrides`: 0 rows, so no live admin edits are in effect.
- `topic_audit_findings`: 3,555 in total, 2,428 fixed and 1,127 still open.
- `audit_reference_checks` and `audit_content_gaps`: 0 rows.
- `inaccuracy_reports`: 1 row, status published.
- `srs_reviews`: 23 distinct flashcards copied out of quiz content.
- Private `audit-corpus` storage: 1 file, last uploaded 25 Oct 2026. It predates the cost, staffing and outcomes changes, so it is stale.

Generated copies:
- `src/data/searchIndex.generated.json`, `public/sitemap.xml` and `data-build/audit-corpus.json` all rebuilt themselves at 12:06 today when the checks ran. The local copies are current; the uploaded copy and `kb_chunks` are stale.
- `src/data/anatomyDiagramSources.generated.json` and `operativeSteps.generated.test.ts` also exist.

## 2. Current check results

- Type check: passes, 0 errors.
- Automated tests: 2,545 passed, 22 failed (in 9 test files), 25 skipped.
  - Citation coverage: 5 key points in `src/pages/topics/OperativeStepsTopic.tsx` lines 223–226 cite labels that resolve to no topic (topicId is null): GALA 2008, ESVS 2024 AAA, EVAR-1 2004, NICE NG156, AAGBI BCIS 2015.
  - Citation labels: `AnaestheticRiskTopic.tsx` has no `anaesthetic-risk` key in references.ts (its references live in a separate file). `IcuCostsTopic.tsx` has label mismatches. The staffing topic uses "CICM IC-1 nurse ratios", which isn't in the `icu-staffing-ratios` references.
  - Lesson structure: 10 failures, all in the 5 cost and staffing redirect stubs. These are now false alarms; the stubs should be excluded from that test.
  - Diagram accessibility: `UroPaedOperationDiagram`, `ColorectalOperationDiagram`, `PelvicSkinOperationDiagram` and `SpecialtyExpansionDiagrams` fail to render without required inputs (for example "reading 'steps'").
  - Diagram source citations: the locked baseline was exceeded.
  - Also failing: page-description and structured-data coverage (including `/viva/scores`) and 2 FAQ snapshots that are now out of date.
- `npm run check`: diagrams and citation stats pass. Sources, exam tags (the checker itself crashes on a validator option it doesn't support), safety citations and drug doses fail.
- `check:drug-reference`: 208 entries checked, 1 problem: Caffeine citrate has no dose summary.
- Not run yet: `check:references` (it uses the network), the Playwright visual and diagram suites, and calculator tests beyond what the main test run covers.

## 3. Content not yet clinically verified

- The 993 model answers, 232 podcast scripts and 21 Ask AI answers have never been checked against sources by the site's own checks.
- 1,127 audit findings are still open.
- About 1,360 references have no verbatim quotation.
- The Anaesthetic Risk topic has 10 sources without quotations (listed earlier).
- No content has been reviewed by a consultant.

## Next steps once approved (correction batches follow your instructions)

1. Fix the failures in the site's own checks: the citation labels, the redirect-stub exclusions, the diagram render inputs, the exam-tag checker crash, Caffeine citrate's dose and the out-of-date snapshots.
2. Sort the 1,127 open findings by severity and topic into source-verified correction batches.
3. Build a sampling plan to audit the database-stored model answers, podcast scripts and Ask AI answers.
4. Rebuild `kb_chunks` and re-upload the audit corpus only after the corrections are made.
