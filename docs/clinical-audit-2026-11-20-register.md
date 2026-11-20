# Clinical content audit — 20 November 2026

Branch: `audit-learner-content`. Baseline for comparison: pinned `main` at
`6ebab1320` (merged PR #5). This register records only work verified in this
session; a citation that resolves is not treated as evidence that it supports
the claim, and no source hold was cleared.

## Corpus counts (measured, not estimated)

| Measure | Pinned main `6ebab1320` | HEAD `1d6f76126` (before this turn) | After this turn |
| --- | --- | --- | --- |
| Curriculum topics (`data-build/audit-corpus.json`) | 192 | 192 | 192 |
| Reference keys (`Object.keys(topicReferences)`) | 201 | 201 | 201 |
| Reference placements (`Object.values(...).flat()`) | 3,109 | 3,117 | 3,120 |
| Explicit source holds (`underReview: true`) | 133 | 133 | 132 |
| Records without URL or PMID | 324 | 324 | 323 |
| Records without URL (PMID-only included) | 327 | 327 | 326 |

Counts were produced by executing `src/data/references.ts` with `tsx` at each
revision, not by counting `label:` strings. Against pinned main the total rose
by eight in the previous turn: five placements were already added by the earlier
branch commit `8eab5dab`, and that turn added four (RCUK 2025 capnography,
IDSA/ESCMID SAB 2026, ASHP/IDSA vancomycin 2020, SSC 2026 procalcitonin) while
removing one uncited NG51 record.

This turn moved the total from 3,117 to 3,120. Four records were added:
`Fernando 2019 LRINEC`, `RCUK PALS 2025 pads` in the paediatric-ICU pool,
`RCUK PALS 2025 cardioversion`, and `RCUK PALS 2025 pads` in the
electrical-safety pool. The held `BJA Educ 2019 (MRI)` record was replaced
one-for-one by `Assoc Anaesth 2019 (MRI)`, and the now-unused
`RCUK Paediatric ALS 2021` record was removed. Holds and the records without a
machine-checkable identifier each fell by one, both from that replacement: the
held record carried no identifier, the replacement carries a DOI.

`scripts/check-reference-integrity.ts` currently reports **62 citation errors**
(unresolved DOIs), **1,425 warnings** and **323 unverifiable** records across
3,120 citations. The errors are pre-existing and were not cleared: an
unresolved DOI is reported, never "fixed" by relabelling. The three extra
warnings are the new guideline records that carry a bare URL rather than a DOI
or PMID, net of the removed 2021 record; no new unresolved-identifier error was
introduced. The 323 records without a machine-checkable identifier remain
unverifiable by that script and are not counted as verified.

## Register

Status key: **F** fixed and verified in the running app; **A** fixed with
automated coverage only (not separately exercised in the browser);
**S** screened, no change required; **L** access-limited (the source does not
contain the claim).

AC-01 to AC-15 are the sepsis, capnography, SAB and antimicrobial findings from
the previous turn. The follow-up review labels **AC-10**, **AC-11** and
**AC-13** refer to **AC-16**, **AC-17** and **AC-18** below, because those
numbers were already assigned in this register.

| ID | Surface | Discrepancy found | Population / setting | Source | Before → after | Verification | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| AC-01 | `src/pages/tools/ABGInterpreterTool.tsx` | Blank/zero entries were coerced to 0 and classified; the default 7.25 / 3.5 kPa / 14 mmol/L implies a Henderson–Hasselbalch pH of 7.35, so the demonstration was internally inconsistent; no same-sample check; citation had no identifier | Adult arterial blood gas, any setting | Berend K et al. NEJM 2014;371:1434–45, https://doi.org/10.1056/NEJMra1003327 | Classification always rendered → `src/lib/abg-interpretation.ts` returns `incomplete` / `inconsistent` / `interpreted`; default changed to 7.25 / 3.2 kPa / 10 mmol/L (HH pH 7.24); explicit `MMHG_PER_KPA = 7.5`; consistency tolerance ±0.06 pH; DOI added | `src/lib/abg-interpretation.test.ts` (8 tests: absent, zero, implausible, normal reference, kPa conversion, anion gap, former default flagged, consistent acidosis). Browser: default classified; cleared pH shows input check; 7.25/3.5/14 flagged "not mutually consistent" with no classification; 7.25/3.2/10 restores "Metabolic acidosis … appropriate respiratory compensation" | F |
| AC-02 | `src/pages/topics/CapnographyWaveformsTopic.tsx` (CPR pattern action) | Told readers to aim for ETCO₂ > 1.3 kPa and that < 1.3 kPa after 20 min implies very low survival (RCUK/ERC 2021). RCUK 2025 forbids using a low value alone to stop and forbids interrupting compressions on a rise alone | Adult cardiac arrest, ALS | RCUK 2025 ALS, waveform capnography, https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/adult-advanced-life-support-guidelines | 2021 thresholds → RCUK 2025 wording: monitor quality, do not interrupt on a rise alone, do not use a low value alone to stop; physiology-guided aim ETCO₂ ≥ 3.3 kPa (25 mmHg) with diastolic ≥ 30 mmHg | `clinical-audit-2026-11-20.test.ts`; browser text check on `/physics/capnography/waveforms` (new sentence present, old 20-minute sentence absent) | F |
| AC-03 | `src/pages/topics/CardiacArrestPostResusTopic.tsx` | Subsection titled "Adult ALS Algorithm — RCUK / ERC 2021"; capnography bullets carried the 2021 1.3 kPa/20 min prognostic rule and an isolated-rise instruction | Adult ALS, ICU/ED | RCUK 2025 ALS | Heading → "Adult ALS Algorithm — RCUK 2025"; three bullets replaced with ROSC-sign combination, no low-value-alone stopping, physiology-guided target; cites new `RCUK ALS 2025 capnography` record | `clinical-audit-2026-11-20.test.ts`; browser heading check on `/intensive-care/cardiac-arrest-post-resus` | F |
| AC-04 | `src/pages/topics/CapnographyTopic.tsx` learning objectives; `src/components/diagrams/physics/CapnographyWaveformDiagram.tsx` PUMA criteria | Checked for mirrors of the retired 2021 wording and the invented "6 breaths" rule | Adult airway management | PUMA 2022 (Chrimes et al., Anaesthesia 2022;77:1395–1415), RCoA sustained exhaled CO₂ criteria | No change needed: objective already cites RCUK 2025; diagram already uses "≥7 breaths", ">1 kPa above baseline" and "no single EtCO₂ value is a stand-alone stopping rule" | Existing `clinical-audit-2026-11-20.test.ts` PUMA block passes | S |
| AC-05 | `src/components/topic/SepsisCriteriaEgdtTeaching.tsx` | Screening paragraph cited "NICE NG51 risk criteria" | Adults 16+, acute hospital | NICE NG253, https://www.nice.org.uk/guidance/ng253/chapter/Managing-suspected-sepsis | NG51 → NG253 with the current high-risk definition (NEWS2 ≥ 7, or single parameter 3 with medical review), NG254/NG255 named for children and pregnancy; added `NICE NG253 2025 high risk` inline ref and lesson source | `clinical-audit-2026-11-20.test.ts` NG51 block | A |
| AC-06 | `src/pages/topics/HaematologyImmunityTopic.tsx` | "UK practice (NICE NG51)" listed 2016 red-flag features and one-hour antibiotics as current UK practice | Adults 16+, ward/ED | NICE NG253 (updated 23 September 2026) | Superseded red-flag list → NEWS2 high/medium risk framing, one-hour antibiotics for high risk, up to three hours for medium risk with reassessment, NG254/NG255 signposted; ref label `NICE NG51 Sepsis` → `NICE NG253 Sepsis` | Browser check on `/physiology/haematology-immunity`: NG253, NEWS2 wording and NG254 signpost present, NG51 absent | F |
| AC-07 | `src/pages/topics/PaediatricIcuTopic.tsx` | Sepsis risk-stratification prose and two inline refs cited NG51, a retired all-age guideline | Under-16s, paediatric ward/PICU | NICE NG254, https://www.nice.org.uk/guidance/ng254/chapter/Managing-suspected-sepsis | `cites` entry and both `refLabel="NICE NG51"` → `NICE NG254`; reference record replaced with NG254 (one-hour antimicrobial for high-risk criteria) | `clinical-audit-2026-11-20.test.ts`; browser DOM shows NG254 wired and no NG51 (label appears on citation interaction, not as visible prose) | A |
| AC-08 | `src/components/diagrams/pharmacology/EmpiricalSepsisChooser.tsx` | Figure provenance named NG51 and "Surviving Sepsis 2021" in the header comment, figure description and on-page note | Adult ICU empirical therapy; children/pregnancy named for scope | NICE NG253 / NG254 / NG255; SSC 2026 | NG51 → "NG253 (adults), NG254 (under-16s), NG255 (pregnancy)"; SSC year removed where the regimens draw on both editions | Source assertions in `clinical-audit-2026-11-20.test.ts` | A |
| AC-09 | `src/pages/topics/InfectiousDiseaseIcuTopic.tsx` | Section sources and pneumonia key point cited NG51 for adult ICU infection content | Adults, ICU | NICE NG253 | `NICE NG51` → `NICE NG253` in two section-source lists and the pneumonia key point; reference record replaced with NG253 (one-hour antibiotic excerpt) | `clinical-audit-2026-11-20.test.ts` | A |
| AC-10 | `src/pages/topics/AntimicrobialsIcuTopic.tsx` | Objectives, worked example and key points cited NG51 for vancomycin and procalcitonin claims | Adults, ICU | NICE NG253; ASHP/IDSA/PIDS/SIDP 2020; SSC 2026 | NG51 → NG253 in section sources; vancomycin worked example and key point re-cited to the vancomycin consensus; procalcitonin key point re-cited to SSC 2026 | `clinical-audit-2026-11-20.test.ts`; browser key-point text check on `/intensive-care/antimicrobials-icu` | F |
| AC-11 | `src/data/references.ts` bibliography records | Five NG51 records (antimicrobials-icu, paediatric-icu, haematology-immunity, infectious-disease-icu ×2) and an NG51 record in `immunology-intensivists` presented the retired guideline as current | All populations | NG253 / NG254 | Replaced 1:1 with population-specific records carrying the official chapter URL and a verbatim excerpt; the `immunology-intensivists` record was removed because its sepsis-pathophysiology sentence is supported by Sepsis-3, Hotchkiss and SSC 2021 and NG51 did not support it | `cites-labels`, `required-citations` (snapshot labels updated to `NICE NG253 Sepsis`) | A |
| AC-12 | `src/pages/topics/InfectiousDiseaseIcuTopic.tsx` key point and CLABSI card | "S. aureus bacteraemia always requires echocardiography, repeat cultures at 48–72 h, and minimum 2 weeks IV therapy" and "always echo + prolonged therapy", cited to NG51 | Adults and children, ICU | IDSA/ESCMID 2026 SAB consensus (published 9 September 2026), https://www.idsociety.org/practice-guideline/staphylococcus-aureus-bacteremia/ | Universal bundle → risk-stratified statement: follow-up cultures, routine TTE in all adults, TTE in children only with structural heart disease / prolonged bacteraemia / endocarditis features, prompt line removal, source control, duration guided by deep-seated focus; new `IDSA/ESCMID SAB 2026` record with adult and paediatric echo excerpts | `clinical-audit-2026-11-20.test.ts`; browser key-point text present after expanding key learning points on `/intensive-care/infectious-disease-icu` | F |
| AC-13 | `src/pages/topics/AntimicrobialsIcuTopic.tsx` vancomycin key point | "AUC24/MIC 400–600 … and a loading dose of 25–30 mg/kg are essential in ICU", cited to NG51 | Adults with serious MRSA infection | ASHP/IDSA/PIDS/SIDP 2020, https://www.idsociety.org/practice-guideline/vancomycin (doi:10.1093/ajhp/zxaa036) | "Essential in ICU" → scoped to serious MRSA infection, AUC target rather than trough-only monitoring, loading dose suggested in serious illness, local policy governs; new reference record with verbatim AUC excerpt | `clinical-audit-2026-11-20.test.ts`; browser text check | F |
| AC-14 | `src/pages/topics/AntimicrobialsIcuTopic.tsx` procalcitonin key point | "Procalcitonin-guided de-escalation safely reduces antibiotic exposure (PRORATA, SAPS) without increased mortality", cited to NG51 | Adults with sepsis/septic shock, ICU | SSC 2026, https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026; NICE NG253 (2026 update) | Unqualified de-escalation claim → SSC 2026 separation: clinical evaluation alone preferred for starting; procalcitonin plus clinical evaluation suggested for stopping only after adequate source control where duration is unclear; new `SSC 2026 procalcitonin` record with both conditional statements | `clinical-audit-2026-11-20.test.ts`; browser text check | F |
| AC-15 | `src/data/references.ts` capnography and cardiac-arrest pools | Capnography pool held an uncited RCUK 2021 ALS record while the topic cited a non-existent `RCUK 2025 ALS` label; arrest pool had no capnography-scoped ALS record | Adult ALS | RCUK 2025 ALS | RCUK 2021 ALS record replaced by `RCUK 2025 ALS` with the capnography excerpt; added `RCUK ALS 2025 capnography` (ROSC combination, no low-value-alone stopping, physiology-guided target) | `cites-labels`, `clinical-audit-2026-11-20.test.ts` | A |
| AC-16 (review AC-10) | `src/components/diagrams/intensive-care/WETFLAGDiagram.tsx`; mirror in the paediatric defibrillation paragraph of `src/pages/topics/ElectricalSafetyTopic.tsx` | Figure kept the superseded "paediatric pads <10 kg or <1 yr" rule and ended the cardioversion ladder at 2 J/kg; it did not separate AED paediatric mode from manual defibrillation and cardioversion | Infants and children, any resuscitation setting | RCUK 2025 paediatric life support — AED and defibrillation pad placement, and tachyarrhythmia with circulatory failure, https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/paediatric-basic-life-support-guidelines | Energy card: 4 J/kg for every shock, stepwise to 8 J/kg (max 360 J) once more than five shocks are needed; cardioversion 1 J/kg doubling with each attempt to a maximum of 4 J/kg. New RCUK 2025 block separates AED paediatric mode below 25 kg (approximately 8 years) from pad placement: below 25 kg anteroposterior (anterior pad left of the sternum, posterior between the scapulae, anterolateral only if the pads would touch); above 25 kg anterolateral or anteroposterior, avoiding breast tissue; pads must never touch. Electrical-safety paediatric paragraph: 10 kg rule → 25 kg AED mode with the same placement rules, 2021 label → `RCUK PALS 2025 pads`. Added `RCUK PALS 2025 pads` and `RCUK PALS 2025 cardioversion` records; retired the now-unused `RCUK Paediatric ALS 2021` record | `clinical-audit-2026-11-20.test.ts` (old pad rule absent, 25 kg and the 4 J/kg ceiling present, weight-estimate and 4 J/kg arithmetic unchanged); browser: figure block and both citation popovers on `/intensive-care/paediatric-icu`, at 1265 px and 375 px with no horizontal overflow | F |
| AC-17 (review AC-11) | `src/pages/topics/InfectiousDiseaseIcuTopic.tsx` worked example and LRINEC section | "LRINEC ≥6 strongly suggests necrotising soft-tissue infection" presented a score with 68.2% sensitivity as diagnostic, and the section cited IDSA SSTI 2014 for the score's performance | Adults with suspected necrotising soft-tissue infection, ICU/ED | Fernando SM, Tran A, Cheng W, et al. Necrotizing soft tissue infection: diagnostic accuracy of physical examination, imaging, and LRINEC score: a systematic review and meta-analysis. Ann Surg. 2019;269(1):58-65. PMID 29672405, https://pubmed.ncbi.nlm.nih.gov/29672405/ | Worked example now states pooled sensitivity 68.2% at ≥6 and 40.8% at ≥8, that a low score cannot exclude the diagnosis, and that early surgical assessment follows clinical suspicion; `cites` gains `Fernando 2019 LRINEC`. Section paragraph gives both thresholds with their specificity and cites the meta-analysis instead of IDSA SSTI 2014 | `clinical-audit-2026-11-20.test.ts`; browser: expanded section shows 68.2%/84.8% and early surgical assessment, and the citation popover shows the meta-analysis excerpt | F |
| AC-18 (review AC-13) | `src/pages/topics/ElectricalSafetyTopic.tsx` MRI paragraphs and MRI FAQ answer | Paragraph ended with "use the minimum necessary monitoring" and cited a held record whose publication covered a different work; RF-burn and gradient-current wording was loose and the cable routing/contact instructions were unsupported | Patients and staff in the MR environment | Wilson SR, Shinde S, Appleby I, et al. Guidelines for the safe provision of anaesthesia in magnetic resonance units 2019. Anaesthesia. 2019;74(5):638-650, https://doi.org/10.1111/anae.14578 — sections "Induced currents from time-varying magnetic fields", "Heating from radiofrequency fields", "Equipment and monitoring" | "Minimum necessary monitoring" → monitoring conforming to national guidance and the same as that provided in the operating theatre, using MR Safe or MR Conditional devices within their specified conditions, with control-room monitoring where available and all monitoring maintained during transfers. Gradient currents (peripheral nerve and muscle stimulation, with limb movement or ventricular fibrillation as the extreme) and RF heating (severe, rapid burns from conductive material on the skin; contact limited unless the device is known safe) rewritten to the article. Cable routing, loop, skin-to-skin and insulation claims omitted as unsupported. Held `BJA Educ 2019 (MRI)` replaced by `Assoc Anaesth 2019 (MRI)`; FAQ answer mirrored | `clinical-audit-2026-11-20.test.ts`; `required-citations` with the reviewed-label override for finding 33a21274 (`scripts/required-citations-reviewed-labels.json` and its snapshot entry); browser: paragraph text and citation popover on `/physics/electrical-safety`, no "minimum necessary monitoring", 375 px with no horizontal overflow | F |

## Access-limited material (not counted as verified)

- **IDSA/ESCMID SAB 2026, Part 1** covers risk stratification, follow-up
  cultures, echocardiography, imaging and duration. Antibiotic-choice
  statements for MRSA and MSSA bacteraemia are stated on the guideline page as
  forthcoming. No drug-selection claim was added; the new record carries a
  `reviewNote` saying so.
- The SAB consensus statements themselves were read from the publisher page
  and the two consensus-statement PDFs (follow-up cultures, TTE). Duration and
  source-control wording comes from the publisher summary; the individual
  duration manuscripts were not re-read.
- NICE NG253/NG254/NG255 were read from the official "Managing suspected
  sepsis" chapters. NG255 is named for pregnancy but its pregnancy-specific
  recommendations were not transcribed into any page.
- The 62 unresolved DOIs reported by `check-reference-integrity` remain
  unresolved; none was relabelled or removed, and no hold was cleared.

## Preserved material

- **RCUK 2021 anaphylaxis guidance** (`RCUK 2021 IM dose`, repeat IM,
  refractory definition, infusion, fluids/antihistamines, steroids, tryptase,
  mimics, biphasic in the `icu-anaphylaxis` pool) is untouched: it is still
  the current RCUK anaphylaxis guidance and is labelled by year.
- Historical trial evidence (Rivers 2001, ProCESS/ARISE/ProMISe, PRISM) remains
  labelled as trial evidence rather than current guidance.

## Verification run

- `npx tsc -p tsconfig.app.json --noEmit` — clean.
- `npx vitest run` — 3,291 passed, 14 failed, 25 skipped. The 14 failures are
  the pre-existing baseline categories: `approved-model-replacements` (6),
  JSON-LD coverage/route/structured-data/url-mapping (5) and SEO per-route meta
  for `/viva/voice` and `/my-enquiries` (3). None touches the files changed
  here.
- Focused re-run after regenerating the viva deck, FAQ snapshots and
  required-citation labels: `required-citations`, `viva-deck`,
  `topic-faq-snapshots`, `clinical-audit-2026-11-20`, `abg-interpretation`,
  `cites-labels`, `sources` — 47 tests passed. A second focused run after the
  final record review notes (41 tests) also passed.
- `scripts/check-reference-integrity.ts` — 3,117 citations checked, 62 errors,
  1,422 warnings, 324 unverifiable (unchanged categories).

## Not attempted

- No medicine-record, podcast-transcript or viva-bank content was re-audited in
  this turn beyond the citation mirrors regenerated above; those surfaces keep
  their existing audit status.
- The ABG tool was not compared against a second analyser-derived dataset; the
  consistency guard uses the Henderson–Hasselbalch relation only.
