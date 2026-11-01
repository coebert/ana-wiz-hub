# Consolidated residual follow-up — 1 November 2026

Entry HEAD: `51bccacda8a18a4f1e13431ded0e580e29d58793`. Verified implementation checkpoint: `24f0816820ffdb9477f745bc966a517e88aed72f` (platform-managed commits; final report commit may follow).

## Scope/status
- A01–A10: all current guards matched once; D13/D20/D72/D09/D89/D26 table copies corrected, ROOT-07 wording softened, D21/D22 obstetric timing replaced with named ESAIC/ESRA educational lookup. No whole-monograph verification.
- NMB01–NMB17: current snippets matched; adult routine/immediate context, oral/nonoral advice, count-vs-ratio, no guaranteed airway rescue, burns protocol and ASA guideline identity corrected. Case-bank source links also reused the correct DOI. Receptor-occupancy teaching untouched.
- CL-20/CL-01/CL-54 four locators corrected; both renal repeats now use shared calcium text preserving the existing severe-K thresholds. Existing shared full hyperkalaemia teaching is unchanged.
- GOV: syntax diagnostics carry positions/reasons; unresolved legacy diagnostics cannot be excluded by CLI eligibility; diagram checker retains diagnostics even without detected diagrams/identity; required-citation extraction fails on syntax. Negative fixtures exercise actual CLIs, parser, extractor and diagram caller, retaining clean-wrapper exclusion and existing ID rules.
- Operations: representative vascular diagram declaration plus explicit scope explanation; all **82/82** diagram-bearing operation records have nonempty sources; **148 unique labels**, all resolve in the executed operative pool. Actual per-card source lists remain visible. Source linkage is not drawing/anatomy certification. Existing 18 real operation a11y fixtures/stages/toggles/skip list unchanged.
- Local search/audit copies refreshed; only four reviewed FAQ answers changed in the checked-in FAQ output (RSI step and three NMB answers). No blanket snapshot update.

## Primary-source verification
Bridion emc6409 (19May2025 label): T2 2mg/kg, PTC1–2 4mg/kg, adult recent-rocuronium immediate context, paediatric routine birth–17, no investigated paediatric immediate reversal, nonoral additional method7days, oral missed-dose leaflet, severe renal not recommended. ASA DOI `10.1097/ALN.0000000000004379`, PMID36520073, Anesthesiology138:13–41 and minimal TOFR0.4–<0.9 verified; former anae.16114 is NELA correspondence. Added real verbatim ASA excerpt and reused original reference records.
Salisbury burns checklist is **local 2019 material**, not a new national guideline or unconditional early safety claim. Sux emc5189 greatest-risk5–70days does not establish day5 onset. NAC emc3447 licensed21h and controlled-reaction restart conditions verified; SNAP is separately locally adopted (existing NHS SNAP source reused). RCUK May2021 supports lack of demonstrated biphasic prevention, not proof of zero effect.
DAS current remote publisher fetch limited; retained `/tmp/c3/das.pdf` full primary text re-read: DOI10.1016/j.bja.2025.10.006, BJA136:283–307, **Table1 p296** “Gentle mask ventilation or apnoeic oxygenation” / “Low-pressure mask ventilation if required”. UKKA July2026 official PDF explicitly distinguishes peri-arrest5min and CPR bolus administration.

## Exact checks/results
- `bunx vitest run src/test/consolidated-scanner-residuals.test.ts src/test/consolidated-clinical-residuals.test.ts`: initial fixture runner failure (tsx resolved from fixture cwd), corrected CLI loader resolution; rerun **90 passed**.
- `node scripts/check-cites-labels.mjs`; `node scripts/check-section-sources.mjs`: each exit0, **191 pages**; rerun after final citation reconciliation also exit0.
- `bun scripts/build-audit-corpus.ts`: **192 topics**. `bun scripts/build-search-index.ts`: **192 topics**; local files only. Generator also wrote local podcast corpus; that artifact was restored byte-for-byte to entry HEAD, no endpoint deployment/audio/script/episode work.
- Scoped pass (`bunx vitest run src/test/consolidated-scanner-residuals.test.ts src/test/consolidated-clinical-residuals.test.ts src/test/governance-citations.test.ts src/test/governance-exam-drug.test.ts src/test/diagram-source-citations.test.ts src/test/clinical-c3.test.tsx src/test/clinical-c6.test.tsx src/test/topic-faq-snapshots.test.ts src/test/topic-legacy-redirects.test.ts src/components/diagrams/__tests__/diagram-a11y-all.test.tsx src/__tests__/required-citations.test.ts src/__tests__/cites-labels.test.ts src/__tests__/section-sources-labels.test.ts`): **703 passed/3 failed/18 skipped**, 12 discovered files. Requested legacy filename did not exist; actual alias manifest exercised separately below. Two FAQ failures resolved by updating only three reviewed NMB copies; obsolete historical diagram snapshot retained.
- One full run: `bunx vitest run --reporter=json --outputFile=/tmp/consolidated/full-suite.json`: **3067 passed / 3 failed / 25 skipped**, 132 files,130 passing/2 failing files. Enclosing command timed out after report was written; JSON completion evidence retained. **Not a green final-HEAD full suite**: one failure was subsequently reconciled below, no second full run.
- Full run a11y subset: **555 passed/18 skipped**; JSON records skips as “skipped”, not “pending”. Operative provenance contract passed.
- Final narrow reconciliation: `bunx vitest run src/__tests__/required-citations.test.ts src/test/consolidated-scanner-residuals.test.ts src/test/consolidated-clinical-residuals.test.ts src/test/topic-faq-snapshots.test.ts src/test/topic-redirect-manifest.test.tsx`: **112 passed,5 files**. Old AAGBI source retained visibly and explicitly as historical provenance, **not** current timing protocol, rather than weakening snapshot or claiming a database finding was updated.
- `node scripts/content-check.mjs --rule=exam-tags,drug-doses,safety-citations`: exit1; exam-tags passed1427 files; dose checker **22 context warnings/12 files**, safety scanner **119 above-baseline topic files** now (previous106 retained as historical report, not claimed106 proven errors). Baseline files unchanged. Dose warning scopes remain AirwayManagement, BariatricAnaesthesia, CardiacArrestPostResus, ENTAnaesthesia, HeadNeckAnatomy, IcuAnaphylaxis, LocalAnaesthetics, NeurointensiveCare, Opioids, PsychiatricSubstanceDisease, Rocuronium, TraumaEmergency. No automatic numeric corrections.
- `python3 /tmp/browser/consolidated/check_residuals.py`: nine affected public topic/drug routes rendered corrected claims; actual RSI FAQ opened; comparison FAQ JSON-LD and real ASA link verified; mobile390x844 comparison/drug/obstetric no page overflow; desktop1280x1800. Runtime errors **[]**. Screenshot review confirmed rescue qualification, calcium CPR/peri-arrest distinction, mobile layout. Browser REST writes were blocked in final successful run; initial survey-prompt handling attempted before blocking, no clinical record writes intended or tools used. Older loaded/published copies not changed.
- Automatic preview validation newest observed **build OK**. **No explicit manual production build or semantic typecheck**: governing environment prohibits manual Lovable builds/typechecks; package has Vite build but no configured typecheck script. This required proof remains unavailable, not replaced by parser tests/automatic build. No publication.

## Genuine residuals, not baselined away
Full run still identified two out-of-scope `diagram-per-principle-citations.test.ts` failures: AdrenalCrisisAnimation references missing `NICE NG243 2024 recovery` and `NICE NG243 2024 sick day` in icu-endocrine-emergencies; per-principle snapshot mismatch. They were **not changed or declared accepted historical debt**. Historical133 diagram-source snapshot,106 numeric allowlist and per-principle snapshot untouched. Whole clinical/anatomical audit and monographs not certified. Remote saved content, hosted FAQ/search/storage, transcripts/audio and current publication unchanged. Phase A remains outside this request.

## Files changed
- `AGENTS.md`
- `data-build/audit-corpus.json`
- `roadmap.md`
- `scripts/check-cites-labels.mjs`
- `scripts/check-section-sources.mjs`
- `scripts/lib/check-topic-labels.ts`
- `scripts/lib/diagram-provenance.ts`
- `scripts/lib/topic-citations.ts`
- `src/__tests__/required-citations.test.ts`
- `src/components/icu/DrugResidualSources.tsx`
- `src/data/cases/pharmacologyCases.ts`
- `src/data/cases/physiologyCases.ts`
- `src/data/icuDrugDoses.ts`
- `src/data/icuDrugSafety.ts`
- `src/data/references.ts`
- `src/data/searchIndex.generated.json`
- `src/lib/clinical-audit-rules.ts`
- `src/pages/IcuDrugDoses.tsx`
- `src/pages/IcuDrugSafety.tsx`
- `src/pages/Landing.tsx`
- `src/pages/topics/AirwayManagementTopic.tsx`
- `src/pages/topics/BronchospasticFailureTopic.tsx`
- `src/pages/topics/NeuromuscularTopic.tsx`
- `src/pages/topics/ObstetricAnaesthesiaTopic.tsx`
- `src/pages/topics/OperativeStepsTopic.tsx`
- `src/pages/topics/RenalDiseaseTopic.tsx`
- `src/pages/topics/SuxVsRocComparisonTopic.tsx`
- `src/test/__snapshots__/topic-faq-snapshots.test.ts.snap`
- `src/test/consolidated-clinical-residuals.test.ts`
- `src/test/consolidated-scanner-residuals.test.ts`
