# Clinical audit integration for approval — 26 November 2026

Status: isolated development proposal. Committed locally; attempted GitHub push failed because this environment has no git credentials. No remote branch or pull request was created. No merge into main, deployment, database write, podcast release or clinical hold clearance is authorised or performed.

## Pinned integration and preservation

- Latest fetched main: `f5d32f7634619a3139a865ea6b3d575e3ee39963`.
- Audit PR #6 head: `506d18b0c10a28ccc5474d56dac149af43118317`.
- Common ancestor: `6ebab13201fe89207c8eb5df32fda306972a52b9`.
- Main has nine subsequent commits; audit has seven. PR #6 reports 70 changed files against its base. The PR API base SHA is historical; the integration uses fetched current main, not that historical base.
- Branch: `integration/clinical-audit-2026-11-26`. Both histories retained, with follow-up clinical qualifications below.
- Exactly four overlapping/conflicted files: `data-build/audit-corpus.json`, `src/data/searchIndex.generated.json`, `supabase/functions/process-podcast-rerecord/topic-corpus.json`, `tests/visual/__diagram-snapshot-manifest.generated.json`. Regenerated from combined source, rather than selecting either side's generated output.
- All 25 main-only files compared byte-for-byte with current main: unchanged. This includes the later held-podcast review workflow and homepage advert. No source conflict was silently resolved by replacing main with audit.
- Rebuilt FAQ snapshots, audit/podcast/search/KB corpora, viva deck and citation statistics. A generated text corpus is not a review of recorded audio or a runtime reindex.

## Proposed changes, in safety priority order

1. Bring across the audit's corrected deep-versus-immediate reversal teaching, post-rescue worked example, mirrored FAQs and source records. Add adult/population scope, renal re-administration qualification and a separate DAS airway reference. Remove an additional FAQ implication that failed intubation should be rescued by reversal.
2. Retain source-limited antibiotic holds. Correct the audit's false statement that NICE NG250 has no MRSA HAP treatment row. It does; the current risk toggle cannot establish suspected/confirmed infection or the appropriate monitoring plan, so the selection remains held.
3. Integrate RCUK adult/paediatric shock-energy, pad-position, cardioversion and CPR-capnography corrections; put the CPR action's guideline link beside the action.
4. Integrate the peri-operative adrenaline concentration/route correction, product-specific local-anaesthetic limits, frail-endoscopy sedation correction, MRI monitoring wording and withdrawal of unsupported laser-adjunct attribution.
5. Integrate the ABG input/consistency guard and source-scoped antimicrobial, sepsis and LRINEC teaching. Numerical consistency testing is not clinical validation of an ABG interpreter.

## Independent source review in this integration session

These are new checks, separate from the inherited register's F/A status. Resolving a citation identifier is not proof of claim support. No whole-topic certification is claimed.

| Claim group | Independent evidence and result | Limit / outstanding work |
| --- | --- | --- |
| Sugammadex | [UK Bridion SmPC](https://www.medicines.org.uk/emc/product/6409/smpc), §§4.1–4.5: adult monitored dose distinctions, agent scope, contraception and re-administration checked. Renal/population qualifications added. | Other unchanged NMBA claims are outside this focused recheck. |
| Active CICO | [DAS 2025](https://doi.org/10.1016/j.bja.2025.10.006) indexed primary article: reversal is unreliable for airway rescue; eFONA requires full blockade. Added separate source. [DAS official pathway](https://das.uk.com/guidelines/das_intubation_guidelines/) confirms current guideline. | Publisher full PDF returned 403. Relevant primary indexed passages were accessible; complete guideline was not re-read. |
| Adult shocks/cardioversion | [RCUK 2025 ALS](https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/adult-advanced-life-support-guidelines): waveform-specific initial energy and rhythm-specific cardioversion changes checked. | Unchanged pharmacological arrhythmia management not comprehensively reviewed. |
| CPR capnography | Same RCUK page: a rise alone does not justify stopping compressions; low values alone do not justify termination. Physiological targets belong to physiology-guided CPR. | No patient outcome validation of diagrams. |
| Paediatric resuscitation | [RCUK PLS 2025](https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/paediatric-basic-life-support-guidelines): initial/refractory shock distinction, adult versus paediatric AED pads, manual placement and unstable tachycardia cardioversion checked. | Paediatric emergency chart/algorithm timing and full guideline should be reconciled in final clinical review; source prose describes refractory VF/pVT as more than five shocks. |
| Peri-operative anaphylaxis | [RCUK peri-operative algorithm](https://www.resus.org.uk/sites/default/files/2024-01/2526%20AAP%20RCUK%20periop%20anaphylaxis-8C.pdf): adult IV bolus preparation, paediatric distinction and no-IV-access IM route checked. | This is the monitored peri-operative setting; does not replace the community algorithm. |
| Local-anaesthetic maximum doses | [Named lidocaine SmPC](https://www.medicines.org.uk/emc/product/15150/smpc), §4.2: audit's product/technique-specific ceilings supported. [Association 2023 LAST page](https://anaesthetists.org/Guidelines-and-publications/Guidelines/Management-of-severe-local-anaesthetic-toxicity-2023) confirms QRH 3-10 replaces the withdrawn laminate. | Entire QRH treatment algorithm was not independently re-audited. |
| Adult sepsis timing | Official indexed [NICE NG253 recommendations](https://www.nice.org.uk/guidance/ng253/chapter/Managing-suspected-sepsis), 2026 PDF and [QS213](https://www.nice.org.uk/guidance/qs213/chapter/Quality-statement-3-Urgent-assessment-and-antibiotic-treatment-for-people-at-high-risk) support risk-specific timing; medical assessment/clinical judgement remain essential. | Direct NG253 full-page/PDF fetches returned 403. Review escalation exceptions and the whole 2026 update before release; clocks must not imply permission to delay after a treatment decision. |
| Pneumonia examples / MRSA | Official indexed [NG250 tables 1 and 3](https://www.nice.org.uk/guidance/NG250/chapter/recommendations) checked for active dose examples. The MRSA row contradicts audit hold rationale; corrected without enabling a regimen. | Direct page 403; complete current table and all notes need clinician recheck. Local susceptibility, fluoroquinolone restrictions and patient factors still govern. |
| Neutropenic sepsis | Official indexed [CG151](https://www.nice.org.uk/guidance/cg151/chapter/recommendations), 1.4.1.1/1.4.3.1: immediate empiric therapy and piperacillin/tazobactam supported. | No unsupported alternative dose/regimen enabled. |
| Frail endoscopy sedation | [BSG commissioned guidance](https://www.bsg.org.uk/clinical-resource/green-endoscopy-british-society-of-gastroenterolo/) and indexed [primary guideline](https://gut.bmj.com/content/gutjnl/early/2023/10/10/gutjnl-2023-330396.full.pdf?with-ds=yes): smaller increments and half-or-less dosing supported; deeper propofol sedation requires an anaesthetic team. | No fixed combination schedule validated. |
| MRI monitoring | [Association 2019 primary guideline](https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/10.1111/anae.14578) and [2021 monitoring guideline](https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/full/10.1111/anae.15501): theatre-equivalent monitoring supported. | Individual MR safety remains equipment/setting specific. |
| SAB and vancomycin | [IDSA/ESCMID 2026](https://www.idsociety.org/practice-guideline/staphylococcus-aureus-bacteremia/) supports adult/child echo distinction; [2020 vancomycin consensus](https://www.idsociety.org/practice-guideline/vancomycin) supports serious-MRSA scope. | International sources, not UK national protocols. Full linked SAB duration manuscripts not re-read. |
| Procalcitonin | [SSC 2026](https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026): separate initiation and discontinuation recommendations checked; stopping recommendation is conditional with low certainty. | International recommendation; local UK policy applies. |
| LRINEC | [Primary meta-analysis abstract, PMID 29672405](https://pubmed.ncbi.nlm.nih.gov/29672405/): limited sensitivity and inability to exclude NSTI supported. | Abstract checked; individual included studies not re-analysed. |
| Laser adjuncts | [MHRA 2015](https://www.gov.uk/government/uploads/system/uploads/attachment_data/file/403422/Guidance_on_the_safe_use_of_lasers__intense_light_source_systems_and_LEDs_in_medical__surgical__dental_and_aesthetic_practices.pdf) indexed primary guidance supports fire-triangle/risk-assessment context. Audit's two-cuff/pledget attribution hold retained. | ASA 2013 full advisory not independently obtained; absence claims and all retained post-fire advice remain pending. |
| Sustained exhaled CO₂ | [RCoA endorsed criteria](https://www.rcoa.ac.uk/safety-standards-quality/patient-safety/sustained-exhaled-co2) independently checked: breath sequence, amplitude and clinical context supported. | Primary full PUMA article met a browser challenge; college summary checked. |
| NG254 / NG255 | Population mapping and inherited source-labelled teaching retained; official indexed NG254 material supports the high-risk urgency. | Full relevant guideline text not independently checked; do not promote inherited status to whole-guideline verification. |

## Test evidence

The historical 3,314/14/25 result is not reused as a result for this integration.

- Fresh Node main baseline: **3,252 passed, 24 failed, 31 skipped (3,307)**. The failed assertions are six approved-model replacements, five JSON-LD, three SEO, and ten live-sitemap checks. The latter throw an AbortSignal instance-compatibility error in the test harness, not a measured live HTTP regression. No collection errors under Node.
- Focused final clinical/citation/ABG/podcast-hold checks: **104 passed across 10 files**. Includes the new regression cases and the three citation-contract tests that caught an intermediate source-link implementation. They pass after correction; no citation baseline was relaxed.
- **Final full Node integration: 3,325 passed, 24 failed, 27 skipped (3,376). All 24 failed assertion identities match fresh main exactly; no new failed assertions or collection errors.** Final typecheck using `tsconfig.app.json`: clean, exit 0. The union narrowing in the chooser UI/tests was corrected for the project's non-strict compiler configuration. Machine-readable counts and shared failure identities are in `clinical-audit-integration-2026-11-26-validation.json`.
- Local Vite bundle: **final serial build passed, exit 0**, including PWA generation. An earlier concurrent attempt was killed (exit 137); the reported success is the subsequent completed build. This is not the full `npm run build` lifecycle: release prerender/SEO/postbuild hooks remain outstanding.
- Automated citation safety gate remains red across the repository. Compared with fresh main, three additional numeric-placement flags remain: two rhythm-specific energy values in the antiarrhythmics FAQ and the CPR data-record pressure target. Their guidance was independently checked and the CPR record has a visible official-source link; the scanner does not recognise those source placements. Existing baseline counts were not enlarged or silently reset. Resolve formal citation placement/scanner support before treating this gate as passed.
- Drug-dose-range gate remains red on existing repository debt. After clarifying which drug owns a paediatric dose and separating its source line, **no additional reported out-of-range dose count** remains versus main. Both gates are heuristic audits, not clinical validation.
- `git diff --check`: clean. All four generated-file conflicts resolved; no conflict markers left.
- Browser smoke attempt: failed before navigation because `/usr/bin/chromium` points to a missing executable. No browser rendering result is claimed.
- An initial Bun full-suite run had runtime-dependent collection errors. Node was used for the reproducible comparison above; Bun counts are not presented as release evidence.
- Final remote fetch reconfirmed both pinned branch tips unchanged.

## Outstanding release checks

- Complete the access-limited clinical checks above and clinician review of the proposed diff, especially current sepsis guidance and laser/fire teaching.
- Full clinical content, medicine records, quizzes, case banks and podcast audio have not all been re-audited. Existing citation/audio holds remain in force.
- Browser route/interaction/mobile layout verification outstanding: local Chromium wrapper exists but its browser binary is missing. An attempted smoke run failed before opening the application.
- No production backend, authentication, AI billing, data migration, deployed lesson, App Store build or podcast replacement was verified or changed.
- Obtain Rob's explicit approval of this specific integration before merging to main or deploying. Keep PR #6 and its audit history intact for traceability.

## Recovering the reviewed branch

The supplied Git bundle requires main commit `f5d32f7634619a3139a865ea6b3d575e3ee39963` (or a repository containing it). In an existing clone, import it without changing main:

```sh
git fetch /path/to/AnaesthesiaCore-clinical-audit-integration.bundle integration/clinical-audit-2026-11-26:integration/clinical-audit-2026-11-26
git switch integration/clinical-audit-2026-11-26
```

The bundle carries the isolated integration history and review documents. Importing it does not merge to main or deploy.
