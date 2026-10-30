# Calculator batch T2 (ROOT16 + ROOT17) — 2026-10-30

Scope: APACHEIICalculator.tsx and SepsisScoreCalculator.tsx only, plus a new pure helper (`src/lib/calculators/t2-scores.ts`), a shared numeric field (`_shared/NumField.tsx`) and tests. No database edits, no publication. Donation, C1, T1 and M3 files were not touched.

## ROOT16 APACHE II
- Removed: Knaus mortality %, admission-category mortality selector, the 1.22^(CFS−4) frailty multiplier, the frailty-adjusted mortality, the SOFA→mortality lookup, severity bands with outcome percentages, comfort-care/step-down/ceiling-of-care/length-of-stay advice, AUROCs and generic superiority claims.
- Kept: raw score /71 with APS, age and chronic-health breakdown; a descriptive CFS (not part of the calculation); an optional raw SOFA comparison with the Sepsis-3 Δ≥2 explanation.
- Creatinine now uses the Féry-Lemonnier 1995 Table 2 SI convention (<53→2; 53–<133→0; 133–<177→2; 177–<309→3; ≥309→4). Renal points are doubled only when the user ticks acute renal failure.
- Numeric inputs replace the sliders, so threshold values such as FiO₂ 0.50 and creatinine 133/177/309 can be entered. Arterial pH is required. Blank or invalid fields make the total incomplete.
- The Muscedere 2017 summary is corrected: 10 observational studies, 3,030 patients, hospital RR 1.71, long-term RR 1.53, described as associations.

## ROOT17 SOFA / qSOFA / NEWS2
- Inputs are split by timing: current observations (NEWS2, qSOFA) versus the worst values in the SOFA assessment period.
- Respiratory support is now an explicit input; the P/F<300 ventilation proxy is removed. Urine output is an alternative renal criterion and the worse of the two scores counts. The Singer SI bilirubin and creatinine boundaries are applied using integer µmol/L.
- Cardiovascular SOFA covers all five categories, uses doses in µg/kg/min and the ≥1 h condition. A missing or zero dose, or unknown duration, gives an incomplete score.
- NEWS2 is limited to Scale 1, with an explicit ACVPU input. SBP ≥220 can be entered. The response priority follows Chart 4. A score of 0 does not exclude illness. When Scale 2 is prescribed the tool shows "not applicable".
- Removed: the automatic sepsis diagnosis and treatment branches, NG51, mortality bands, qSOFA "3–14×", the performance table, "No organ dysfunction", "No current evidence of sepsis" and "No clinical concern".
- Added: a static Sepsis-3 explanation and separately labelled NICE NG253 (with NG254/NG255) and SSC 2026 summaries with links. Neither generates orders.

## Checks
- `src/lib/calculators/t2-scores.test.tsx`: 16/16 pass. These cover all boundary cases in the request and rendered wiring: FiO₂ 0.50 entry, creatinine 133, blank pH→incomplete, NEWS2 zero wording, RR 8 red-component response, Scale 2 not applicable, the respiratory-support control, and absence of the forbidden texts.
- Diagram a11y suite filtered to these two tools: 6 passed. Typecheck clean. Vite build OK. Search index and diagram snapshot manifest regenerated.
- Browser (localhost dev, current code): both pages render the calculators. Example totals: APACHE 23/71; NEWS2 12, qSOFA 3, SOFA 9. Neither shows a mortality figure.

## Limitations
- The cited PDFs were not re-fetched in this batch. Thresholds and guideline wording follow the payload, which the root reviewed independently. SSC 2026 and NICE NG253 summaries are taken from the payload.
- qSOFA altered mentation uses ACVPU ≠ Alert from the observation set; Seymour derived it as GCS <15.
- A single duration control applies to all vasoactive agents. Scale 2 is not implemented. No infection/baseline controls were added (static Sepsis-3 explanation only).
- This does not validate every clinical statement or the whole calculators. Not consultant-reviewed.
