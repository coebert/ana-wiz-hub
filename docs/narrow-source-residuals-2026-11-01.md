# Narrow source-only residual batch — 1 November 2026

Reviewed guard baseline48c2f386cc93279ce87db9c57726740e9421a574 was not restored. Entry HEAD954e0015e4f7392e1b1903aaff0c64f05e2ba9ec; tested implementation checkpointad6ee10f99f4aeb16e59dd11b76b116257bc5c89 (platform-managed saving; final documentation commit follows).

## Scope
All17 supplied residual guards matched current claims; scoped replacements only, no true conflict. D01/ROOT05 propofol no short-duration/bridging exemption; PK withdrawal wording no longer implies short PICU sedation. D12 removed generic paediatric adult-label rate and respiratory reassurance. CL87 corrected routine atropine premedication, selected PLS20micrograms/kg/max500micrograms and poor-perfusion escalation with a pulse. D14 adult transplant/high-degree AV block WITH wide-QRS exclusions added.
D02 uses existing lookupOnly:true; calculator still calls calculateAnaesthesiaDose, which returns null. ivParacetamolLimits helper remains unchanged and unused by page. Banded emc100803 reference text has readable spacing. Existing ICU/anaesthesia paracetamol tables unchanged.
D17 narrative limits corrected for named products/procedures; arithmetic and other lookup-only entries unchanged; bupivacaine note now attributes2mg/kg to product11611 in any four-hour period including prior doses. No prescribing UI or neuraxial regimen added.
CL05/CL20 three CICO blocks updated, no saturation trigger; vertical-default/qualified transverse skin approach retained. ThreeInlineRef occurrences resolve to one real clinical-incidents DAS2025 entry, current official landinghttps://das.uk.com/new-das-2025-intubation-guidelines/ and article DOI10.1016/j.bja.2025.10.006. Removed the now-unused2015 CICO record only from this pool; other historical pools untouched. AirwayManagement and S3 science untouched.

## Sources/limits
Fresh direct official emc100803/1365/13154/15150/11611/13644 and official RCUK2025 PLS/ALS verified by read-only source review. DAS current official landing verified; incision evidence re-read from retained prior primary `/tmp/c3/das-full.txt` (719–727,758–760), not claimed as newly downloaded fullPDF. Generic limits are not patient-safe doses. No whole monograph/app certification.

## Actual checks
- `bunx vitest run src/test/narrow-source-residuals.test.tsx src/lib/anaesthesia-dose-calculation.test.ts src/test/clinical-audit-batch1.test.ts src/test/clinical-audit-drug-science.test.ts src/test/clinical-c3.test.tsx`:72passed,5files.
- Final scoped rerun adds `src/test/governance-citations.test.ts`:83passed,6files,0failed. Actual calculator component selected and weight changed5/10/14/50/70; output dd absent, lookup/source present. Guarded ClinicalIncidents and PaediatricIcu core blocks actually rendered (template/exam/reference wrappers mocked); three current source links checked. Existing helper boundary/arithmetic tests unchanged and passed. React router/SSR useLayoutEffect warnings remain, not failures.
- `node scripts/check-cites-labels.mjs`; `node scripts/check-section-sources.mjs`:each exit0,191pages.
- `node scripts/content-check.mjs --rule=drug-doses,safety-citations`:exit1; existing22dose-context warnings across12files and119above-baseline numeric-citation topic files remain. No baselines refreshed, no claim these are proven clinical errors. Warning scopes/details preserved in checker output; no full suite requested/run.
- `python3 /tmp/browser/narrow-source/check_lookup.py`:actual public calculator selection of IV paracetamol and all five weight inputs withhold dose/volume output; real emc100803 source destination present. Desktop1280x1800 screenshot of full banded note reviewed. Browser REST writes blocked before navigation.
- Automatic preview validation observed buildOK; no manual build/typecheck performed or claimed.

## Boundaries
No database/backend/function/deployment/audio/payment/publication actions. No generated FAQ/search/audit corpus refresh in this source-only batch; remote and previous generated copies may remain stale pending root coordination. No audio/script changes. Historic clinical/provenance warnings retained; S3 work not reverted or certified.

## Changed files before documentation
roadmap.md
src/data/anaesthesiaCalculatorDrugs.ts
src/data/anaesthesiaDrugDoses.ts
src/data/icuDrugDoses.ts
src/data/paediatricPk.ts
src/data/references.ts
src/pages/topics/ClinicalIncidentsTopic.tsx
src/pages/topics/PaediatricIcuTopic.tsx
src/test/narrow-source-residuals.test.tsx
