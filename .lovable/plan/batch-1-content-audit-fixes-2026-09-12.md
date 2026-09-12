# Batch 1 content-audit fixes

## Scope
Apply only the 24 listed findings across the seven physiology topics, preserving the current FRCA/FFICM teaching style and existing topic layouts.

## Implementation
- **Renal Physiology:** add diuretic resistance and detailed ammoniagenesis/ammonia trapping; update the hyponatraemia citation; replace the Cockcroft–Gault carboplatin example with a race-free CKD-EPI 2021 calculation, including de-indexing for Calvert dosing and a measured-GFR caveat.
- **Neuromuscular Transmission:** add Phase II suxamethonium block, critical illness polyneuropathy/myopathy, and a structured potentiation/inhibition table for neuromuscular blockade.
- **Autonomic Nervous System:** expand cranial parasympathetic pathways; add the enteric nervous system; add clinically relevant autonomic syndromes, including detailed dysreflexia, diabetes, MSA, GBS/sepsis/tetanus, and drug effects.
- **Ventilation–Perfusion Matching:** explain Fowler’s method, the alveolar gas equation with a worked A–a gradient, A–a interpretation, and the physiology of prone positioning in ARDS.
- **Lung Mechanics:** expand flow–volume loop interpretation while retaining the existing diagram; define stress, strain, static/dynamic strain, and protective targets; expand work of breathing; add recruitment manoeuvres, response assessment, PEEP titration, risks, and contraindications.
- **Cardiac Electrophysiology:** add a full Vaughan–Williams class I–IV comparison, mechanisms of arrhythmia, and corrected hypothermia electrophysiology.
- **Cardiac Cycle:** expand clinical assessment of preload, afterload, and contractility; explain physiological S2 splitting; add a dedicated pressure–volume loop walkthrough using the existing diagram and show preload, afterload, and contractility changes.

## Citations
- Reuse existing reference labels where they directly support a claim.
- Add the supplied journal/guideline sources to the reference registry, with DOI or authoritative URL and verbatim source excerpts where available.
- Place `InlineRef` citations beside newly added claims and update `sectionSources` where appropriate so the audit checker can trace each fix.

## Verification and audit sync
- Run TypeScript typecheck.
- Run `npm run check -- --rule=audit-fixes` after database updates.
- Mark only verified, citation-backed IDs fixed using the provided SQL once; if direct `psql` lacks update permission, use the managed database SQL tool for the same statement.
- Confirm the final fixed count and report any IDs left open with a reason.
