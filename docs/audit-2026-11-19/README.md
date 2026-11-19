# AnaesthesiaCore learner-content audit — 19 November 2026

Status: **in progress**. Source-checked corrections applied to authored source. This record does **not** certify the app, any topic, or any reference. No consultant review has occurred. No held content was released.

Branch: `audit-content-coverage` (from `main`).

## Files

| File | What it records |
|---|---|
| `coverage-ledger.json` | Machine-readable inventory of every content surface, per-topic counts, explicit gaps, curriculum matrix and database-served tables. |
| `coverage-ledger.md` | Human-readable version of the same ledger, with one row per topic. |
| `source-verification.json` | The sources independently opened and read in this audit, what was checked, and the records that were unverifiable or superseded. |
| `changes.json` | Every correction by ID, with severity, finding, files, source and verification status. |

Regenerate the inventory with:

```bash
npx tsx scripts/build-content-coverage-ledger.ts
```

## What was inventoried

Built from the authoritative runtime sources, not from the truncated `data-build/audit-corpus.json`:

- **192 curriculum topics** from `src/data/curriculum.ts`, resolved to their real route and page file through `src/App.tsx` (309 routes), so combined/renamed pages are not reported as missing.
- **129 Teaching modules** in `src/components/topic/*Teaching.tsx`, mapped to the topics that import them.
- **923 quiz questions** across 145 named exports in `src/data/quizzes.ts`, mapped by topic slug.
- **98 case-bank cases** plus **24 perioperative cases**.
- **82 operations** in `src/data/operativeSteps.ts`.
- **507 diagram files**, **475 registry entries**, and the snapshot registry.
- **7 calculator pages** in `src/pages/tools`.
- **3,093 reference records** in `src/data/references.ts`, with URL/DOI/PMID presence per topic.
- **FAQ pairs** via the repository's existing `scripts/extract-faqs.ts`.
- **Derived indices**: search index (192 topics) and 148 viva-deck assets.
- **Database-served content** from `src/integrations/supabase/types.ts`: `content_overrides`, `topic_references`, `viva_model_answers`, `ask_qa_library`, `podcasts`, `drugs`, `home_announcement`, `public_errata`, plus learner-generated tables that are explicitly excluded.

## Curriculum mapping

The app tags every topic with exam tags (primary / final / FFICM / EDIC) and many pages with RCoA `XX_BK_NN` or FFICM codes. The ledger records both. Explicit gaps:

- **120 of 192 topics** have no explicit curriculum code in their page (they still carry exam tags).
- **111 topics** do not import a Teaching module.
- **57 topics** have no quiz questions.
- **44 topics** have no FAQ pairs.

These are coverage gaps, not clinical errors. A topic can be accurate without a quiz or a curriculum code.

## Corrections in this audit

| ID | What changed |
|---|---|
| `CAP-01` | Capnography: four PUMA criteria over at least seven breaths; default tube removal; dangerous-to-remove exception; urgent alternative verification. |
| `CAP-02` | Quiz and FAQ aligned to the same standard. |
| `LAST-01` | LAST lipid dose/timing reconciled to the Association of Anaesthetists QRH 3-10 v2 (2023) everywhere. |
| `LAST-02` | Removed the erroneous instruction to avoid amiodarone in LAST; amiodarone is used for ventricular arrhythmias, lidocaine is avoided. |
| `LAST-03` | Replaced unverifiable "2024/2020 LAST" bibliographic records with the verified QRH 2023 record. |
| `NEO-01` | Neonatal adrenaline repeat interval changed from 3-5 minutes to 4 minutes (RCUK 2025). |
| `FAST-01` | UK paediatric elective fasting separated from adult fasting and updated to APAGBI 1 h / 3 h / 6 h, with sip-til-send and exceptions. |

## How to verify

```bash
# inventory and gap ledger (regenerates the two coverage files)
npx tsx scripts/build-content-coverage-ledger.ts

# targeted regression guards for this audit
npx vitest run src/test/clinical-audit-2026-11-19.test.ts

# existing reference / citation / governance checks
npm run check:references
npm run check:anatomy-references
npm run check -- --rule=sources,safety-citations,exam-tags,diagrams
node scripts/check-curriculum-codes.mjs
node scripts/check-drug-dose-ranges.mjs
node scripts/check-duplicate-diagrams.mjs
npm run gen:diagram-snapshots
```

`npm run check:references` resolves DOIs and PMIDs against Crossref/PubMed and compares titles. It does **not** prove that a citation supports the sentence it is attached to. Passing tests are not clinical sign-off.

## Limits

- Only **7** of the **3,093** stored reference records were independently opened and read in this audit; four more were flagged unverifiable or superseded. The rest remain as-yet-unreviewed and are not validated by this document.
- The sandbox has no service-role access to the separate production database. Live `content_overrides`, `topic_references`, `viva_model_answers`, podcast rows and drug rows were not read. The ledger lists the tables from the generated type surface only.
- No private learner data was read, exported or modified.
- Held podcast scripts and audio were not touched.
- The 2010 AAGBI LAST laminate is withdrawn and is not reproduced.
- Paediatric PALS adrenaline remains every 3-5 minutes; only the newborn pathway changed to every 4 minutes.
- Passing automated checks and existing flags are not treated as clinical sign-off.
