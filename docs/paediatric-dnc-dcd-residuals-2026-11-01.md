# CL53 / ROOT02 and proposed CL86 — bounded source-copy follow-up

Date: 1 November 2026. Pinned review basis supplied: `204ba4f`; initial inspected current HEAD: `cee74d7787164dd89aa3bc02400a8eef72b2aac2`. No reset to the review basis. Latest observed code HEAD after the teaching/test changes: `e135f91f48d962d18bef56c05279a3fe4e18a0bd` (platform-managed commits; this is not a claimed final documentation commit).

## Findings and changes

| Scope | Applied correction | Boundary |
|---|---|---|
| CL53/ROOT02 paediatric key point, quiz options/explanation, safeguarding narrative and DBD donation paragraph | One local `PAEDIATRIC_DNC_2025_SUMMARY`: below 37 weeks excluded; 37 weeks to under two years corrected age; at least 24 hours after the last observed brainstem reflex/spontaneous breath and at least 24 hours between sets; ancillary investigations not recommended to establish DNC in this group; full Code and paediatric expertise required. Exactly one correct quiz option remains at index 1. | Not a bedside eligibility checklist. Full clinical requirements are not replaced; existing donor-care content and other clinical/science edits retained. |
| Superseded reference support | Both AoMRC 2008 records and RCPCH DNC 2015 / DNC Infants 2015 visibly labelled Historical/superseded, historical URLs retained, unqualified current-instruction excerpts removed and review notes direct to the 2025 Code/Appendix 2. No old active labels remain in the two affected pages. | Existing AoMRC DNC Code of Practice (PDF) 2025 entry preserved intact. Historical provenance baselines not refreshed. |
| Proposed CL86 donor proportion | Key point, both DBD/DCD cards and DCD summary now give 55% DCD / 45% DBD of UK deceased organ donors, 2025–26, or dated individual share, with NHSBT source markers. 792 appears in the key point. | Denominator excludes living donors; not a share of all transplants. Figures are NHSBT page-stated, not independently reconciled against the activity report. |
| Proposed CL86 fWIT and acceptance | Reusable local BTS definition from sustained at least two-minute SBP fall below 50 mmHg to actual cold in-situ perfusion or NRP. FAQ, worked example, key point, DCD pathway/summary/cards and warm-ischaemia discussion aligned. Removed universal organ cutoffs, withdrawal stand-down limits and ten-minute post-death deadlines. | Organ/method/current-team protocol determines acceptance and stand-down. Long withdrawal alone does not automatically exclude liver with NRP. No new universal cutoffs. |
| Proposed CL86 worked example | If sustained-low-BP begins at minute 12 and perfusion actually starts at minute 43, fWIT = 31 min. Confirmation at minute 33 is conditional on all death criteria being satisfied. | Arithmetic alone cannot establish any organ viable/nonviable; retrieval-team review required. |
| Proposed CL86 NRP outcome | Key point and remaining kidney-outcome copy now qualitative and observational, varying with organ, donor selection and comparator. | No universal 50%→20% DGF promise, no absolute-risk/adjusted-odds conflation. No numeric UK study estimate added. |
| Source attribution and visibility | Current AoMRC 2025 / NHSBT activity / BTS DCD 2023 labels matched to section sources; inline sources beside affected cards, pathways, timing and organ/outcome discussion. Review notes exposed in existing InlineRef and SectionReferences displays. | Source linkage is not whole-topic or anatomical certification. |

An additional live end-of-section exam-framing residual said legal DCD death was at the **start** of the standoff; this conflicting copy was reconciled to completion once all criteria are satisfied. Already-correct second-set DNC timing and apnoea thresholds elsewhere were not altered.

## Primary-source access

- AoMRC full 2025 PDF: downloaded and text-read; Appendix 2 A6/A7/A9 and p.57 summary confirm the under-two-year safeguards. A7.2/A8 expressly describe **minimum**, not fixed, 24-hour intervals. The reviewer initially quoted historical two-month text; root reconciled against the actual current A7/A8 and p.57 text before implementation.
  https://www.aomrc.org.uk/wp-content/uploads/2025/01/Code_of_Practice_Diagnosis_of_Death_010125.pdf
- RCPCH current page opened successfully: confirms 2025 Appendix 2 integration and archived 2015 guidance.
  https://www.rcpch.ac.uk/resources/diagnosis-death-neurological-criteria
- NHSBT paediatric care opened successfully: explicitly says 2015 guidance withdrawn.
  https://odt.nhs.uk/deceased-donation/best-practice-guidance/paediatric-care/
- NHSBT current DCD page opened successfully: explicitly gives 792 in 2025–26 and 55% of all deceased organ donors. DBD 45% is the complementary share, labelled accordingly on its card.
  https://www.odt.nhs.uk/deceased-donation/best-practice-guidance/donation-after-circulatory-death/
- Official BTS full guideline page opened successfully: sustained two-minute fWIT definition, cold perfusion/NRP endpoints, and withdrawal duration not being a liver contraindication with NRP. A linked UK Kidney-hosted consultation PDF was also read, but **the adopted citation is the official BTS guideline page**, not the consultation PDF.
  https://bts.org.uk/transplantation-from-deceased-donors-after-circulatory-death/
- Publisher-version summary PDF supplied by the user returned **403** to the independent reviewer. Bibliographic DOI/section identity retained, but no claim that this PDF was opened successfully in this turn. Official full guideline provided the accessed evidence; numeric adjusted-odds study estimates were intentionally not added.
  https://pureadmin.qub.ac.uk/ws/portalfiles/portal/508445297/The_British_transplantation_society_guidelines.pdf

No invented paediatric quotation excerpt added. New BTS/NHSBT excerpts are from actually opened official webpages (plain-space normalization only).

## Files

- `src/pages/topics/PaediatricIcuTopic.tsx`
- `src/pages/topics/OrganDonationTopic.tsx`
- `src/data/references.ts`
- `src/components/references/InlineRef.tsx`
- `src/components/topic/SectionReferences.tsx`
- `src/test/paediatric-dnc-dcd-residuals.test.tsx`
- `AGENTS.md`, `roadmap.md`, this evidence record and archived approved plan.

## Verification

Combined command:

```text
bunx vitest run src/test/paediatric-dnc-dcd-residuals.test.tsx src/test/clinical-c3.test.tsx src/test/governance-citations.test.ts src/__tests__/section-sources-labels.test.ts src/__tests__/citation-coverage.test.ts src/__tests__/required-citations.test.ts src/test/topic-faq-jsonld-schema.test.ts
```

**40 passed, 1 failed; 6 files passed, 1 failed.** New scoped tests: **7 passed**. Current-source label/section scanners, negative syntax/unresolved-legacy governance fixtures, C3 preservation tests, and FAQ schema/source extraction passed.

The retained failure is `required-citations.test.ts`: existing required-citation finding `79f406f2-1a0b-4393-83f0-da35bcbb6487` still demands active label **AoMRC 2008** in OrganDonation. Restoring misleading source support would contradict this approved correction. The stale requirement has **not** been rewritten, rebaselined, or updated in the database. Root must reconcile this recorded historical requirement separately. Existing source/provenance warnings remain genuine; there is no whole-suite or whole-topic certification.

Browser command: `python3 /tmp/browser/cl86/check_topics.py` against actual localhost pages `/intensive-care/paediatric-icu` and `/intensive-care/organ-donation`, at 1280×1800 and 390×844. **All four route/viewport cases passed**, no page errors or document overflow. Opened actual native teaching expanders and source popovers: paediatric 2025 note/link, NHSBT denominator/year record, BTS definition/limitations. Expanded actual donation FAQ and inspected conditional 31-minute example. Screenshots inspected, including mobile popover and worked example. Initial selector attempts failed because teaching uses native details and closed containers; final run used the real controls.

Automatic preview validation: latest checked log **build OK at 2026-11-01T16:46:08Z**. Separate manual production build and semantic typecheck were **not run**: governing execution instructions prohibit manual project builds/typechecks. Automatic preview evidence is not represented as independent production build/typecheck proof. No full-suite run was requested or claimed for this bounded follow-up.

No database/backend writes, migrations, endpoint deployment, audio/script work, payment work, publication, corpus replacement, reindexing or saved-content rewrite. Remote saved/generated copies remain outside scope. Phase A work and unrelated outstanding roadmap items were not activated or changed.