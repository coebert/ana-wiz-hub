# Clinical content audit — batch 1 (30 October 2026)

Status: **in progress**. Batch 1 corrections applied to source. This record does not certify any topic or the app as verified; no consultant review has occurred. Not published.

- Baseline: `308fe279a94097da689569026e2eb6c4c44f56a2`
- Working commit at time of writing: `d433f6fde5363b022127342d19eb5be1ce9043a7` (the batch-1 edits are committed automatically after this turn; see the platform history for the final hash)
- Old `topic_audit_findings` rows were **not** bulk-applied or resolved.

## Findings and corrections

| ID | Correction applied | Sources checked (retrieved 30 Oct 2026) |
|----|--------------------|------------------------------------------|
| CL-01 | Perioperative anaphylaxis rewritten to RCUK 2024 peri-operative algorithm: titrated IV adrenaline 50 micrograms boluses (0.5 mL of 1:10,000; child <12 y 1 microgram/kg), IM 10 micrograms/kg (max 500 micrograms) only if no IV access, infusion if poor response, rapid crystalloid 500–1000 mL / 20 mL/kg. Steroids/antihistamines removed from routine steps; biphasic-prevention claim removed; non-sedating oral antihistamine after stabilisation. General IM algorithm kept separate with a 5-minute repeat. Contrast-reaction diagram steroid line aligned. | resus.org.uk 2024 periop PDF; RCUK 2021 anaphylaxis PDF (Wiley anae.16206 not retrieved) |
| CL-02 | MH: remove vaporiser, do not waste time changing circuit/machine, charcoal filters in both limbs if available. | EMHG v2024 |
| CL-03 | Dantrolene 2–2.5 mg/kg actual weight, max 300 mg per dose, repeat every 10 min (or as fast as feasible); >10 mg/kg may be needed (reconsider diagnosis). 20 mg/60 mL vial labelled formulation-specific; 700 mg reframed as stock planning. | EMHG v2024 |
| CL-04 | PUMA sustained exhaled CO₂: four criteria (rise/fall with ventilation, ≥7 breaths, peak >1 kPa above baseline, clinically appropriate); if absent actively exclude oesophageal intubation, default tube removal unless removal judged more dangerous; depth confirmed separately. | rcoa.ac.uk sustained-exhaled-co2 |
| CL-05 | 80% SpO₂ FONA trigger removed from FAQ and worked example; trigger = declared failure of tube, SAD and optimised facemask. | DAS 2025 (doi 10.1016/j.bja.2025.10.006 cited; full text not retrieved) |
| CL-06 | IRIS: failed to demonstrate non-inferiority (0.6% vs 0.5%; upper CI RR 2.00 > 1.50 margin). | PubMed 30347104 |
| CL-07 | DSED removed as an algorithm option and from the physics case; DOSE-VF presented as trial evidence; RCUK 2025 vector change after 3 failed shocks; RCUK does not recommend routine dual sequential defibrillation. | RCUK 2025 ALS |
| CL-08 | Current target ≤37.5 °C in comatose survivors (RCUK/ERC–ESICM 2025), ≥72 h per March 2026 algorithm (narrative 36–72 h noted). TTM2 ≥37.8 °C described as treatment trigger; TTM 2013 "equivalence" changed to no significant difference. Copies in neuroprognostication, prognostication-ethics, arrhythmias, TTM and post-arrest diagrams, quizzes updated. | RCUK 2025 PRC (HTML); March 2026 algorithm PDF not independently re-read |
| CL-09 | Blanket 5 mL/kg DKA/trauma rule removed; NICE NG18 10 mL/kg 0.9% saline (ASAP if shocked; over 30 min if dehydrated not shocked; senior review before >1 bolus); trauma = blood products/haemorrhage control. | NICE NG18 (RCUK Feb 2026 paediatric PDF not retrieved) |
| CL-10 | 14 kg quiz key now 48 mL/hr (4-2-1); Holliday–Segar 1200 mL/day = 50 mL/hr stated; arithmetic vs clinical adjustment distinguished. | NICE NG29 + arithmetic |

## Changed paths

src/pages/topics/{ClinicalIncidents,AirwayManagement,CardiacArrestPostResus,PaediatricCore,PaediatricIcu,VolatileAgents,GeneticSyndromes,Neuroprognostication,PrognosticationEthicsIcu,ArrhythmiasEcgIcu}Topic.tsx; src/components/diagrams/intensive-care/{TtmTargetExplorerDiagram,PostCardiacArrestProgDiagram}.tsx; src/components/diagrams/clinical/ContrastReactionDiagram.tsx; src/data/cases/physicsCases.ts; src/data/quizzes.ts; src/data/references.ts (new: EMHG 2024, RCUK Periop Anaphylaxis 2024, RCUK PRC 2025, RCUK ALS 2025, RCoA Sustained Exhaled CO2, DAS 2025, NICE NG18); src/test/clinical-audit-batch1.test.ts (new); regenerated: FAQ snapshot, searchIndex.generated.json, data-build/audit-corpus.json, podcast-rerecord topic-corpus.json, citationStats, sitemap.

## Tests (30 Oct 2026)

- `src/test/clinical-audit-batch1.test.ts`: 25/25 passed.
- `tsgo --noEmit -p tsconfig.app.json`: 0 errors.
- Full vitest: 20 failed | 2572 passed | 25 skipped (baseline 22 failed | 2545 passed). Remaining failures are the pre-existing set: diagram-a11y-all (4), topic-synthesis legacy redirects (10), citation-coverage (OperativeSteps 5 labels), cites-labels (AnaestheticRisk, IcuCosts), section-sources-labels, diagram-source-citations, jsonld-route-coverage, seo-regression. None involve batch-1 files.

## Dynamic (database) content containing the unsafe claims — not rewritten

- viva_model_answers, CL-03 (10 mg/kg ceiling): c87859ec-acac-48d2-b98a-6ddf39b96144, c8b461a5-086a-4d9b-8c50-cf9a07bb3e97, dc8dda82-d8cf-4d8b-948f-6fb423cb48ea
- viva_model_answers, CL-08 (37.7 °C): 211ebdae-dcad-46fc-9c1a-4cfe9b0d1da7, 321fe4a1-740a-412c-bcc4-8b50890ba9c8, 645e17f8-2bc7-45a7-87c7-bd6f5e7f7d82, 8ed0ef2c-6df2-4470-9910-33fff0aa460f
- podcasts (all have audio; script and audio must be regenerated together): 560467c1-c5f4-49e1-858d-2571596851f3 clinical-incidents (CL-01 hydrocortisone second-line, CL-02 change circuit, CL-03 ceiling); 02327955-a79c-4113-97a4-21e3c4f30db9 genetic-syndromes (CL-02, CL-03); b06a5f2a-f0e7-4c22-8129-a4240016c4e6 volatile-agents (CL-02 vapour-free machine); d9e181c2-45e5-4f06-b52f-17366a557b34 and 471debfd-9158-4984-88db-bd352fe9a5af airway-management (CL-05 80%); 6f06ab82-a66f-40ef-9042-741e5a5793e8 cardiac-arrest-post-resus (CL-08)
- kb_chunks (Ask AI knowledge base, stale): 48d491b9-7a10-4949-9971-907d78c3248c, da7307e8-3dee-488c-ae64-e359f459d716 (CL-03); 97ca87f9-b0eb-4ae6-8ffe-e03ddbf443a3 (CL-04); 2ec5f1d2-3816-456b-876f-cce1df087082, 42ef1046-bdf3-4dc1-8b4a-32de588a52a1 (CL-05); 0de6a640-98e2-4685-ac29-c3077beb4ed4 (CL-06); 9ff9a30d-481a-417c-b061-ec112d6216d4 (CL-07); 2b6db250-4905-487d-a550-556ea138886e (CL-08). Local copy supabase/functions/kb-reindex/corpus.{ts,json} also stale.
- ask_qa_library, drugs: no matches (daptomycin "up to 10 mg/kg" is an unrelated false positive).

## Residual issues

- Private audit corpus rebuilt locally but not uploaded; Ask AI knowledge base not re-indexed.
- Paediatric trauma "5 mL/kg blood boluses" (PaediatricIcuTopic haemorrhage section) and myocarditis 5 mL/kg small boluses left unchanged — outside CL-09 scope, not reviewed.
- Elective MH-susceptible preparation (vapour-free machine) left unchanged — correct for planned cases.
- Verbatim reference excerpts quoting the superseded 37.7 °C (TTM2/ILCOR 2022 entries) left unchanged as historical quotations.
- RCUK 2026 algorithm PDFs, DAS 2025 full text and Wiley 2024 article were not re-read in this batch.

## Batch 2 (in progress, 30 Oct 2026)

- CL-08 refinement applied: TTM2 normothermia arm described as targeting ≤37.5 °C with device trigger ≥37.8 °C (CardiacArrestPostResusTopic, quizzes, Neuroprognostication, TtmTargetExplorerDiagram). The historical comparison is kept; the equivalence overclaim stays removed.
- Superseded by the implementation/readback record below; the two unsafe clearance tools have now been replaced.

## Batches 2, 3 and additional batch 12 — implementation/readback, 30 October 2026

This is a targeted correction record, not whole-topic/app verification. No publication, credential changes, user-account/progress changes or unrelated audit-row resolution. Current revision hash is managed by the platform; final hash is not available until this turn is saved.

### Corrections

- Antithrombotic tools: both existing interfaces/diagram IDs retained. Shared educational lookup differentiates every spinal/epidural/catheter-removal procedure from superficial compressible blocks. No PROCEED, suitability verdict or generated patient-specific restart/removal time. Clopidogrel European 5–7-day neuraxial interval; catheter timing independent of surgery end; dose/renal function/last dose/trauma/haemostasis/catheter checklist; routine PT/APTT/TEG cannot certify DOAC/platelet safety. ESAIC aspirin exactly-200-mg internal boundary discrepancy disclosed; ASRA 2025 linked separately, not merged.
- D01–D10, D12–D16, D18–D20: corrected ICU/narrative drug data and matching respiratory/folinic/recovery duplicates. IV paracetamol product bands separate from oral; diclofenac 150 mg/day across routes; Toradol daily ceiling and contraindicated renal disease separated; dexmedetomidine 4+46 mL=50 mL; vasopressin 0.3–2 milliunits arithmetic, not range certification; potassium 0.5/0.2=2.5 h, unsourced rapid regimen withheld; severe-hyperkalaemia adult calcium guidance separated; 21-hour NAC distinct from 12-hour SNAP; no routine folinic PCP; current Bridion birth–17 routine rocuronium context; no routine arrest atropine; reservoir-patch instructions and specialist exceptions; brand-specific epoprostenol, no inhaled/IV recipe conflation; quantitative TOF ratio ≥0.9 and delayed clonidine patch onset.
- D11: Foo 2021 explicit ideal body weight, actual-weight <40 kg exclusion, ≤1.5 mg/kg/h and absolute 120 mg/h infusion cap; outside-range result withheld, local governance/consent/monitoring and no overlapping LA interventions stated.
- D17: inspected actual calculator path; product/route-specific lidocaine limits, separated adult bupivacaine field-block and levobupivacaine infiltration scopes. Ropivacaine/prilocaine universal maximum outputs withheld pending exact product/route adoption. Limits are not “safe-dose” certification. Numeric assumptions must still be checked against local policy.
- SCI corrections implemented from available context: explicit oxygen-content/delivery/Fick units (factor 10 only for CO L/min × content mL/dL), kPa/mmHg dissolved coefficients; adiabatic example 71.7 K; temperature-only versus full BTPS; Nd:YAG case 1064 nm/1.064 µm; thermodilution/TR error qualification; fast-flush name; steep ODC relation; NICE CG65/TA49 identity and urgency exception; lung inflation/impedance; modern kelvin definition; alveolar-oxygen quiz; volatile isomer connectivity; ether flammability and aqueous formulations. SCI-017/018 P/F/MAP/PLR decisions use unrounded values, display rounded separately.
- D66–69: reread and changed remaining named drug fields: neonatal oral vitamin K first-week dose; caspofungin BSA and max70; micafungin indication/age/weight and severe hepatic limits; ticagrelor UK indication/ASA/renal/formal contraindications. D70–74 static and diagram/quiz duplicates corrected (T2 vs ratio/PTC; peripheral bleeding; burns after24h not onsetday5; current UK ranitidine removed; ester duration/amide allergy/limited not-zero placental transfer).
- D75: owner-applied calcium-gluconate record reread: NHS Tayside initial 0.11 mmol/kg=0.5 mL/kg10%, max4.5 mmol/20mL and specialist neonatal exceptions retained; not overwritten.
- Owner reported 30 fields across 11 drugs corrected and reread at 12:42:30 UTC (propofol, calcium-gluconate, bupivacaine, amikacin, angiotensin-II, co-trimoxazole, enoxaparin, methylene-blue, lorazepam, insulin-Actrapid, intralipid), plus prior propofol 500mg/50mL. This is owner-reported status, not independent certification of all those fields; this turn preserved it.

### Sources (no full-source quotations)

ESAIC/ESRA: https://esaic.org/wp-content/uploads/2023/12/regional_anaesthesia_in_patients_on_antithrom.pdf ; ASRA fifth edition: https://rapm.bmj.com/content/rapm/early/2025/10/16/rapm-2024-105766.full.pdf ; Foo: https://doi.org/10.1111/anae.15270 (full text via https://eprints.gla.ac.uk/335189/1/335189.pdf).

UK SmPC product URLs https://www.medicines.org.uk/emc/product/{ID}/smpc: propofol1365; paracetamol100803; diclofenac1043; ketorolac14193; dexmedetomidine13154; NAC3447; co-trimoxazole6999; Bridion6409; Scopoderm13379; Veletri3113; lidocaine15150 and adrenaline2397; bupivacaine11611; levobupivacaine13644; vitaminK9754; caspofungin13258; micafungin11958; ticagrelor100957; sux5189; glycopyrronium12387; lidocaine-allergy15149. Product/route scope matters.

https://www.nice.org.uk/guidance/cg65/chapter/Recommendations ; https://www.nice.org.uk/guidance/ta49 ; https://www.nist.gov/si-redefinition/kelvin ; https://pmc.ncbi.nlm.nih.gov/articles/PMC6794117/ ; https://doi.org/10.1093/bjaed/mkw012 (oxygen transport DOI corrected); https://webbook.nist.gov/cgi/cbook.cgi?ID=C13838169 ; https://webbook.nist.gov/cgi/cbook.cgi?ID=C26675467 ; https://www.cdc.gov/niosh/npg/npgd0277.html ; https://mg.salisbury.nhs.uk/media/2058/burns-checklist-v4.pdf ; https://www.nhs.uk/medicines/ranitidine/ ; https://www.gosh.nhs.uk/conditions-and-treatments/procedures-and-treatments/topical-anaesthetics/ ; https://nppg.org.uk/wp-content/uploads/2024/10/Clonidine-V1.pdf ; https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/pneumocystis ; https://www.gov.uk/drug-safety-update/calcium-chloride-calcium-gluconate-potential-risk-of-underdosing-with-calcium-gluconate-in-severe-hyperkalaemia ; https://doi.org/10.1213/ANE.0000000000002670 . Source retrieval is not independent clinical certification.

### Saved content changes and affected IDs

- Exact before/after records: `docs/content-audit-2026-10-30-viva_model_answers-changes.json` (5 rows, 12 content fields); `docs/content-audit-2026-10-30-drugs-changes.json` (7 rows, 20 fields including appended source records). Originals captured before clinical edits; final values reread. No learner answers/accounts changed.
- Viva changed: 064b58a0-a64b-479e-a771-c60fe0cf2e76, 94a4102c-ea50-48d0-9d29-2cc3b151a8d8, b0412283-c358-4ce0-8c7a-a65b5937a095, b66fde43-16ab-4c86-a2d0-22138d4c6a14; additional generic equation clarification 55a4aea1-9124-41bf-8caa-2b5617a6cbe3.
- Drugs changed: vitaminK e298ee7c-6737-452f-8870-e9931d88ac82; caspofungin b49b2faa-61c8-4ea8-9a5e-72e85cf7ea6f; micafungin755df6c9-b589-4fea-b2f0-f3f25ec86475; ticagrelor431c3b7d-d369-4690-96ba-5c556bae2749; paracetamol91a195ac-2185-40a7-b44b-df76183ea121; sugammadex2045eacd-184e-4cb9-b56c-746533af25d4; ketorolaced77b33f-39d7-4cd2-a874-c26bafe73a2e.
- Broad oxygen-formula podcast matches requiring contextual/audio review, not confirmed unsafe purely by regex: 6fe03dfa-eaa2-43cf-a251-db3a034d5d2e (cardiac-output-monitoring), e3301c8f-ccdd-40a2-ae86-34e3c11bd688 (ecmo). No transcript/audio edits.
- Ranitidine saved viva matches reported, not rewritten: 0bc9938a-f4c8-46c6-a2d6-38ab24fbb53e, ac901f15-4d9f-4128-b688-80dcf2f051f0 (gastric-acid context may be historical), 3551a97b-e040-4617-a0b9-db2674c22550 (obstetric GA; requires correction review). No matching saved Ask answers in the specified regex searches. This does not prove absence of paraphrased errors.

### Exact checks/results

- Focused run: 8 files, **84 passed**, 0 failed: clinical-audit-batch1(25), clinical-audit-drug-science(5), antithrombotic-lookup(2), anaesthesia-dose-calculation(18), icu-infusion-calculation(2), science-boundaries(21), ards-transfusion-calcs(7), icu-shock-calcs(4). Run 12:51:43 UTC.
- `bunx tsgo --noEmit -p tsconfig.app.json`: exit0, no errors (12:51–52 UTC).
- Full Vitest run before the final 5 added source regressions: **2616 passed, 20 failed, 25 skipped**, 8 failed/99 passed/1 skipped files, 2661 tests (12:49:45 UTC). Failure families retained: citation coverage, cites-labels, sectionSources, diagram source baseline, JSON-LD route coverage, viva-score SEO, ten legacy redirect synthesis failures, four operation-diagram missing-prop test failures. These were not resolved as unrelated work.
- FAQ snapshots: 4 passed, 2 snapshots updated after corrected FAQ teaching. Search refreshed:192 topics,1251 headings,16967 prose records,2464KB. Audit corpus rebuilt:192 topics, median24000chars,6982 diagram labels. Private upload/KB reindex not performed.
- `check:drug-reference`:208 monographs/28TDM checked; failed on pre-existing caffeine-citrate missing dose summary. No inference of dose accuracy from this check.
- Existing content check: diagrams/citation-stats pass; sources, exam-tags, safety-citations, drug-doses fail (existing reference gaps, exam-tag checker error, and contextual drug-name association false positives remain). Do not auto-accept those recommendations.
- Browser: both lookup wrappers rendered; clopidogrel/catheter removal selected, all7 checkboxes in each checked; no clearance/timeline output. Screenshots `/tmp/browser/final-lookups/lookup-{0,1}.png`. IV lidocaine70kg with absent IBW: no result; IBW80/100 and1.5:120mg/h/12mL/h, capped;1.5001 or actual39kg: no result. Standalone heparin70kg,18units/kg/h:1260units/h, raw2.52mL/h displayed2.5mL/h (display rounding only).
- Latest preview build signal at 12:50:09 UTC: build OK; checked again before completion.

### Residual limitations

Original complete SCI-001–016 finding payload was not available in the retained chat-history files; the concrete corrections above were implemented from retained context, but full per-ID coverage cannot be claimed. Ropivacaine/prilocaine exact route adoption is intentionally withheld. Some publisher sources were blocked; SNAP supplied PDF URL unavailable. Saved podcasts require matching audio regeneration/review and KB copies remain stale. Remaining ketorolac oral-product details, NAC saved small-child volumes, dexmedetomidine saved loading/duration and older source-record bibliographies require targeted product review rather than silently overwriting with generic advice. Full monographs and app remain unverified.
