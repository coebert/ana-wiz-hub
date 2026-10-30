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
