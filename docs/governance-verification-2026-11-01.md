# Governance verification repair — 1 November 2026

## Scope and source basis
- Requested saved basis: `fafdee92a329ee37cd1b520c35743ba272a3b14f`.
- Actual initial current HEAD: `8329561190d8d898dea95b656fe9dc9496211c07`; no checkout/reset was performed. Most recent inspected auto-saved code revision: `32156b04e1f9b0192102cbdf21461d6182d8d273`. Subsequent report-only saves may have a newer revision.
- No publication, database writes, dose edits, audio/transcript changes, new clinical citations, increased allowlists, disabled tests or blanket snapshot updates. Existing GOV01 counters remain 2,870 reference entries / 192 registered topics.

## Repairs
- **GOV02:** `scripts/lib/reference-labels.ts` imports the executed reference pool; `scripts/lib/topic-citations.ts` conservatively resolves actual same-module const topicId expressions. Citation coverage, both CLI wrappers and diagram checks share them. Dynamic IDs/nonliteral citations produce diagnostics. Runtime pools now resolve AnaestheticRisk/ICU merged references and all five OperativeSteps labels without duplicates. Fixture imports/merge/append/quote/bracket cases retained in tests.
- **GOV03:** `src/data/topicRedirects.ts` explicitly lists five aliases. Synthesis/JSON-LD checks exclude only those manifest files. Positive render tests reject nonredirect manifest content, check the actual route table and canonical destinations, and assert replace/query/custom-hash/fallback behavior. Browser exercised all ten query/hash cases successfully.
- **GOV04:** all four operation components use real records selected by 18 supported diagram variants; every stage and actual Detail/Labels/Sutures toggle runs existing ARIA/icon checks. No new skip entries. Final targeted run: **555 passed / 0 failed / 18 skipped**. Rendering is not anatomy certification.
- **GOV05:** VivaScores composes PageMeta. Browser readback: exactly one canonical and og:url, both `https://anaesthesiacore.app/viva/scores`, despite query/hash. No account data in metadata; no runtime page errors. Saved-answer flow was not modified or tested.
- **GOV06:** historical snapshot unchanged: **133 entries (131 missing declarations, 2 missing IDs)**. Current diagnostic: **134 entries (132 missing declarations, 2 missing IDs)**. Zero removed/reclassified baseline lines. One newly exposed unaccepted gap: `OperativeStepsTopic.tsx` / OperativeDiagram. ABGAnalyser and ARDS remain historical missing declarations, not verified artwork. CapnographyWaveforms and VenturiMask have no explicit topicId JSX props; identity is not invented from unrelated strings. Detailed per-file/diagram debt: `verification-gov-2026-11-01/diagram-provenance-residuals.json`. The newly exposed Operations gap deliberately fails the test until specific sources are reviewed.
- **GOV07:** reproduced initial exam CLI crash: global Ajv 8 override forced ESLint's Ajv 6 consumer into `TypeError` (`defaultMeta`). Removed the incompatible global override; reinstalled dependency graph. Checker surfaces parser/config diagnostics and decodes root paths; temporary out-of-root TS fixtures now parse rather than being ignored by ESLint filename matching. Unique close tag suggestions only; distant/ambiguous strings not rewritten; radiological exam rows and syllabus display-label shapes excluded by context, not file allowlists. Non-value comparison/query/type literals ignored. Full scan: 1,409 files clean. Drug checker uses explicit neonatal indication+dosing when adult summary fields are absent, reports population-schema limitation, and still fails missing/malformed dose material. Read-only check: 208 monographs, 28 TDM, 19 recipes; caffeine warning retained. This is structural checking, not dose validation.

## Organ-donation required safety citation
- Finding `1f724757-74f9-4298-bca0-d0d2cd580902`: obsolete local required label `CJA Death Determination 2023` replaced **only for this entry** with existing `AoMRC DNC Code of Practice (PDF)`.
- Current UK ancillary paragraph already cites AoMRC 2025. The existing full-PDF reference incorrectly pointed to the 2008 Code and first-test time-of-death excerpt. Updated that reference to the official 2025 PDF, preserving its stable label, adding a checked §6.55 excerpt and scope note. Canadian bibliography entry retained; no invented cross-jurisdiction teaching.
- Official PDF downloaded/read: https://www.aomrc.org.uk/wp-content/uploads/2025/01/Code_of_Practice_Diagnosis_of_Death_010125.pdf . §§6.51–6.53: ordinarily second-set confirmation; later confirmation with required ancillary support. §§6.55–6.59: not routine, necessary when preconditions/tests incomplete, never full replacement for clinical diagnosis. This justifies requiring the current UK source rather than restoring a Canadian-only label to UK teaching. No DB audit row updated; remote generated requirement may still disagree and requires separate review before regeneration.

## Actual verification commands and results
Outputs and exact failing names are retained under `docs/verification-gov-2026-11-01/`.

| Command | Result |
|---|---|
| `bunx vitest run --reporter=json --outputFile=/tmp/gov-verification/before.json` | Before editing: **2,778 pass / 21 fail / 25 skipped; 2,824 total** |
| `bunx vitest run <12 affected test files> --reporter=json --outputFile=/tmp/gov-verification/focused-final.json` | **1,619 pass / 1 fail / 18 skipped; 1,638 total** |
| `bunx vitest run --reporter=json --outputFile=/tmp/gov-verification/after.json` | One full post-repair run: **2,834 pass / 1 fail / 25 skipped; 2,860 total; 122 passing files / 1 failing file** |
| `bunx vitest run src/components/diagrams/__tests__/diagram-a11y-all.test.tsx --reporter=json --outputFile=/tmp/gov-verification/a11y-final-fixed.json` | After strengthening toggle selectors: **555 pass / 0 fail / 18 skipped**. No second full rerun. |
| `bunx vitest run src/test/governance-exam-drug.test.ts --reporter=json --outputFile=/tmp/gov-verification/drug-test-final.json` | **10 pass / 0 fail / 0 skipped** |
| `node scripts/check-cites-labels.mjs` / `node scripts/check-section-sources.mjs` | Both pass, 191 topics each |
| `node scripts/check-exam-tags.mjs` | Pass, 1,409 files |
| `node --import dotenv/config scripts/check-drug-reference.mjs` | Pass, read-only 208 rows; caffeine population-schema warning |
| `node scripts/content-check.mjs --rule=sources,exam-tags,citation-stats` | All three pass |
| `node scripts/content-check.mjs` | **4 rules pass / 2 fail**: diagrams, sources, exam-tags, citation-stats pass; safety-citations and drug-doses fail |
| `python3 /tmp/browser/governance/check_public.py` | Viva generic metadata and all five aliases/custom+fallback anchors pass; no page errors |
| Automatic validation log `/tmp/observability/build-errors.log` | Latest inspected entry **build OK** (includes automatic typecheck; earlier fixture typing errors repaired). No manual production-build/typecheck command was run. Explicit requested production build is not separately attested. |

### Remaining failing test (full suite is NOT green)
`src/test/diagram-source-citations.test.ts` → `Diagram source-citation contract > new diagram-source gaps fail against reviewed historical debt`: Operations diagram-source declaration is missing; not silently baselined. Full failure details: `after-summary.json`.

### Remaining content-command failures
- Safety-citations reports **106 topic files** above its historical numeric-citation baselines; full filenames/claims in `all-content.log`. These heuristics do not establish 106 clinical errors. No numeric prose or citations changed merely to satisfy them.
- Drug-dose-range checker reports **22 contextual dose warnings across 12 files**: ALF, AirwayManagement, AnaestheticEmergencies, BurnsIcu, HeadNeckAnatomy, IcuAnaphylaxis, LocalAnaesthetics, NeurointensiveCare, Opioids, PsychiatricSubstanceDisease, Rocuronium, TraumaEmergency. These historical-range/context matches are not source-verified dosing errors; no automatic clinical edits.
- Historical diagram debt and two legacy identity gaps still require source-specific editorial work; no whole-library/source/anatomy certification.
