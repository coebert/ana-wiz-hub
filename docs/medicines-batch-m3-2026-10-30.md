# Medicines display batch M3 — 2026-10-30

Scope: D39 (biological units on drug pages) and five D70/D72 residual text patches. No database edits, no publication.

## Text patches (5/5, each exact old-text guard matched once on the latest file)
- SuxVsRocComparisonTopic.tsx: sugammadex 4 mg/kg at 1–2 PTC; 16 mg/kg is for adults about 3 min after rocuronium 1.2 mg/kg, and paediatric immediate reversal has not been studied (Bridion SmPC, eMC 6409).
- SuxVsRocComparisonTopic.tsx (2 locations): burns/denervation timing now follows the Salisbury burns checklist v4 and Suxamethonium SmPC (eMC 5189).
- BurnsIcuTopic.tsx exam pitfall: avoid after the initial 24 h, assess other contraindications, no universal fixed safe end date.
- The comparison-page FAQ JSON-LD comes from these strings. The FAQ snapshot was updated (2 snapshots) and the search index regenerated.

## D39
- New `src/lib/infusion-standard.ts`: typed normalisation (mass vs units), final-volume labelling, validation, mL/h arithmetic and mass-only prose parsing.
- Legacy `amount_mg` + `unit: "units/hr"` is read as a unit count. `diluent_ml` is labelled as the nominal final volume. Optional explicit amount_unit/final_volume_ml fields are supported.
- DrugDetail: WorkedExample, InfusionCalculator and common-concentration badges use the helper. Prose with units (e.g. "50 units in 49.5 mL") no longer produces a badge.
- Expected results: insulin 1 unit/mL → 2 mL/h at 2 units/h; vasopressin 0.4 units/mL → 5 mL/h; mass regression 5.25 mL/h.

## Checks
- src/lib/infusion-standard.test.tsx 13/13 (helper + rendered components); clinical-audit-drug-science 5/5; topic-faq-snapshots 4/4; typecheck clean; vite build OK.
- topic-synthesis failures (legacy ICU cost/staffing files) are known and unrelated.

## Limitations
- Components were render-tested with the record values from the payload. Live drug pages were not opened in a browser, and database rows were not reread in this batch.
- Other "48–72 h"/TOF wording in quizzes.ts and icuCases.ts was not reviewed (out of scope). The vasopressin indication/rate is not certified. This is not a full review of any monograph or topic.
