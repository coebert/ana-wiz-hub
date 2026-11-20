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

**Re-measured at HEAD `91fe145e1` for the closing turn** (the table's third
column predates the commits made on this branch after it was written): 201
reference keys, **3,128 placements**, **129 holds**, 319 records without a URL
or PMID, 322 without a URL. After this turn: **3,129 placements** — the only
change is `MHRA Lasers 2015` added to the `lasers-fibreoptics` pool, which had
been citing it from a pool that did not hold it. Holds, records without a
machine-checkable identifier and records without a URL are unchanged at 129,
319 and 322.

The earlier turn moved the total from 3,117 to 3,120. Four records were added:
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
numbers were already assigned in this register. For the same reason the final
review's labels **AC-18** (the frail-patient sedation case mirror) and **AC-20**
(the anaphylaxis adrenaline pitfall) are recorded below as **AC-21** and
**AC-22**; AC-18 and AC-20 in this register remain the MRI safety and sepsis
chooser rows.

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
| AC-16 (review AC-10) | `src/components/diagrams/intensive-care/WETFLAGDiagram.tsx`; `src/pages/topics/PaediatricIcuTopic.tsx` (unstable-SVT worked example, arrhythmia table, quiz, drug table); mirror in `src/components/diagrams/clinical/PaediatricEquipmentSizer.tsx` | The first revision reversed the PALS conditional — "use anterolateral only if anteroposterior cannot be achieved without the pads touching" applied a paediatric-pads/manual exception to adult-size AED pads; the cardioversion ladder still stopped at 2 J/kg in the worked example, table, quiz and sizer; the energy card mixed the initial 4 J/kg with the refractory escalation | Infants and children, any resuscitation setting | RCUK 2025 paediatric life support, sections "Using an Automated External Defibrillator", "Defibrillation during PALS" and "Arrhythmias", https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/paediatric-basic-life-support-guidelines | Figure now labels three separate placements: **AED with adult-size pads** — anteroposterior under 25 kg, anterolateral or anteroposterior over 25 kg and in adolescents (anterolateral = below the right clavicle plus left axilla), pads off breast tissue in adolescents; **AED with paediatric pads** — anterolateral allowed at 25 kg or less by competent providers provided the pads do not touch; **manual defibrillation (PALS)** — pads must not touch, anteroposterior in under-25 kg children who can easily be turned and in whom anterolateral is hard without pad contact, anterolateral in larger children, breast tissue avoided. No boundary invented where the guideline says smaller or larger. Energy card separates 4 J/kg for the initial shocks and the adult upper-range caveat (120–200 J depending on device) from stepwise escalation to 8 J/kg (max 360 J) after more than five shocks, reusing the successful dose after ROSC. Worked example: immediate synchronised cardioversion 1 J/kg → 2 J/kg (12 J) → 4 J/kg (24 J) with a 12-lead ECG running and sedation, adenosine 0.1–0.2 mg/kg (max 6 mg) only while cardioversion is prepared and never delaying it; table, quiz and sizer carry the same ladder and limits | `clinical-audit-2026-11-20.test.ts` (7 WETFLAG and tachyarrhythmia assertions, including the removed reversed conditional and the "then 2 J/kg" string); browser: rendered figure on `/intensive-care/paediatric-icu` at 680 px | F |
| AC-17 (review AC-11) | `src/pages/topics/InfectiousDiseaseIcuTopic.tsx` worked example and LRINEC section | "LRINEC ≥6 strongly suggests necrotising soft-tissue infection" presented a score with 68.2% sensitivity as diagnostic, and the section cited IDSA SSTI 2014 for the score's performance | Adults with suspected necrotising soft-tissue infection, ICU/ED | Fernando SM, Tran A, Cheng W, et al. Necrotizing soft tissue infection: diagnostic accuracy of physical examination, imaging, and LRINEC score: a systematic review and meta-analysis. Ann Surg. 2019;269(1):58-65. PMID 29672405, https://pubmed.ncbi.nlm.nih.gov/29672405/ | Worked example now states pooled sensitivity 68.2% at ≥6 and 40.8% at ≥8, that a low score cannot exclude the diagnosis, and that early surgical assessment follows clinical suspicion; `cites` gains `Fernando 2019 LRINEC`. Section paragraph gives both thresholds with their specificity and cites the meta-analysis instead of IDSA SSTI 2014 | `clinical-audit-2026-11-20.test.ts`; browser: expanded section shows 68.2%/84.8% and early surgical assessment, and the citation popover shows the meta-analysis excerpt | F |
| AC-18 (review AC-13) | `src/pages/topics/ElectricalSafetyTopic.tsx` MRI paragraphs and MRI FAQ answer | Paragraph ended with "use the minimum necessary monitoring" and cited a held record whose publication covered a different work; RF-burn and gradient-current wording was loose and the cable routing/contact instructions were unsupported | Patients and staff in the MR environment | Wilson SR, Shinde S, Appleby I, et al. Guidelines for the safe provision of anaesthesia in magnetic resonance units 2019. Anaesthesia. 2019;74(5):638-650, https://doi.org/10.1111/anae.14578 — sections "Induced currents from time-varying magnetic fields", "Heating from radiofrequency fields", "Equipment and monitoring" | "Minimum necessary monitoring" → monitoring conforming to national guidance and the same as that provided in the operating theatre, using MR Safe or MR Conditional devices within their specified conditions, with control-room monitoring where available and all monitoring maintained during transfers. Gradient currents (peripheral nerve and muscle stimulation, with limb movement or ventricular fibrillation as the extreme) and RF heating (severe, rapid burns from conductive material on the skin; contact limited unless the device is known safe) rewritten to the article. Cable routing, loop, skin-to-skin and insulation claims omitted as unsupported. Held `BJA Educ 2019 (MRI)` replaced by `Assoc Anaesth 2019 (MRI)`; FAQ answer mirrored | `clinical-audit-2026-11-20.test.ts`; `required-citations` with the reviewed-label override for finding 33a21274 (`scripts/required-citations-reviewed-labels.json` and its snapshot entry); browser: paragraph text and citation popover on `/physics/electrical-safety`, no "minimum necessary monitoring", 375 px with no horizontal overflow | F |
| AC-19 | `src/pages/topics/LaserFibreopticsTopic.tsx` (objective, worked example, key point, safety prose, tube-table note); `src/data/references.ts` lasers pool | Prevention and the fire drill were attributed to an "Association of Anaesthetists 2023" guideline that does not contain them, the oxygen value was fixed at "typically ≤0.30", and the post-fire plan was fixed ("admit for at least 24 h", "repeat imaging"); the pool record had been renamed to `ASA 2013 OR Fire`, so seven inline labels pointed at a label that no longer existed, and `MHRA Lasers 2015` was cited from a pool that did not hold it | Adults and children having airway laser surgery, theatre/ICU | Apfelbaum JL, Caplan RA, Barker SJ, et al. Practice advisory for the prevention and management of operating room fires: an updated report by the American Society of Anesthesiologists Task Force on Operating Room Fires. Anesthesiology. 2013;118(2):271-290. PMID 23287706, https://pubmed.ncbi.nlm.nih.gov/23287706/ | Attribution → the ASA 2013 practice advisory throughout; oxygen → "as low as clinically feasible, guided by monitoring of oxygenation — the advisory sets no fixed fraction"; drill → stop the flow of all airway gases and remove the tube, pour saline into the airway, re-mask on air avoiding oxygen and nitrous oxide, consider rigid bronchoscopy for fragments, then an individual plan; the fixed 24-hour admission and imaging schedule removed in favour of "the advisory specifies no observation period / no imaging schedule"; the exam-pitfalls bullet's "FiO₂ <30%" replaced with the same qualified value; `MHRA Lasers 2015` added to the lasers pool so every inline label resolves | `clinical-audit-2026-11-20.test.ts` (label-resolution loop over every `refLabel` on the page; no "Association of Anaesthetists 2023"; no "at least 24 h"); `required-citations` with reviewed-label overrides for findings 3dc214c1 and 99cb65a0; `diagram-source-citations` baseline unchanged | A |
| AC-20 | `src/components/diagrams/pharmacology/EmpiricalSepsisChooser.tsx` | "Time-to-antibiotic < 1 h is the key quality metric for adults with suspected sepsis (NICE NG253)" and the "Sepsis-6 — within 1 hour" banner presented a universal one-hour target; NG253 1.8.3 is limited to adults at high risk of severe illness or death and times from the first NEWS2 score at emergency-department assessment or ward deterioration. The hospital-acquired-pneumonia penicillin-allergy path (aztreonam plus ciprofloxacin), "extended infusion 4 h preferred" and meropenem 1–2 g are not in NG250, and the renal selector changed nothing outside HAP | Adults 16 or over, not pregnant; ICU/ED | NICE NG253 recommendations 1.8.3, 1.8.17, 1.8.23 and 1.10.1, https://www.nice.org.uk/guidance/ng253/chapter/Antibiotic-therapy-intravenous-fluid-and-oxygen; NICE CG151 §1.4.1; NICE NG250 tables 1 and 3, https://www.nice.org.uk/guidance/ng250/chapter/Recommendations | Pearl → risk-stratified: within 1 hour only at high risk (1.8.3), timed from the first NEWS2 score, up to 3 hours at medium risk (1.8.17) and 6 hours at low risk (1.8.23) as maxima, never delaying once the decision is made; CG151 immediate therapy for suspected neutropenic sepsis. Banner → "the antibiotic clock depends on risk" with the 94–98% (88–92% if hypercapnic risk) oxygen target. HAP penicillin allergy → NG250's levofloxacin option with its "only when other first-line antibiotics are unsuitable" caveat; piperacillin/tazobactam and meropenem doses aligned to NG250; the unlisted doxycycline macrolide substitute removed from CAP. An amber panel now appears at CrCl < 30 ml/min stating the regimen is not renally adjusted (or, for HAP, that the modification is BNF-derived), and a "Not source-backed here" note holds the intra-abdominal, urinary, meningitic and skin/soft-tissue regimens and their allergy alternatives | `clinical-audit-2026-11-20.test.ts` (3 chooser assertions); browser: chooser on `/pharmacology/antimicrobials-pharm` with CrCl < 30 and with anaphylaxis selected | F |
| AC-21 (review AC-18) | `src/pages/topics/ProceduralSedationTopic.tsx` frail colonoscopy worked example (working, answer, cites); `src/data/references.ts` `BSG 2023` record | The explanation warned against stacking a benzodiazepine, an opioid and propofol, but the short answer still directed low-dose propofol top-ups (10 mg) on that same pair, and the takeaway carried a fixed, unsourced midazolam 0.5–1 mg + fentanyl 25 µg schedule; the case cited only `BJA Educ 2021`, and the BSG record's excerpt did not carry the high-risk dosing or the anaesthetist statement | Frail elderly adult (78 years, 52 kg, eGFR 38, frailty 5, on apixaban) for diagnostic colonoscopy under sedation, endoscopy unit | Sidhu R, Turnbull D, Haboubi H, et al. British Society of Gastroenterology guidelines on sedation in gastrointestinal endoscopy. Gut. 2024;73(2):219-245, https://doi.org/10.1136/gutjnl-2023-330396 — recommendation 36 (frail, elderly or comorbid ASA grade 3 or greater: half or less of the dose required for younger healthy patients and smaller incremental doses) and the deep-sedation section (deep propofol sedation or general anaesthesia requires an anaesthetic team and in the UK can only be delivered by trained anaesthetists) | Propofol top-up on the pair removed and the fixed milligram schedule deleted → one agent at a time titrated to comfort, at half or less of the dose a younger healthy adult would need and in smaller increments with peak effect allowed, stated as "not a fixed benzodiazepine–opioid–propofol schedule"; deep propofol sedation described as an anaesthetic-team pathway with ECG, non-invasive blood pressure, capnography and core temperature recorded; case `cites` → `BSG 2023` + `BJA Educ 2021`; the `BSG 2023` excerpt extended with the verbatim recommendation 36 and trained-anaesthetist sentences, and its reviewNote records that the guideline sets no fixed milligram schedule | `clinical-audit-2026-11-20.test.ts` (2 BSG assertions: removed top-up and fixed schedule, new dose and team wording, case cites, excerpt text and DOI); browser on `/clinical/procedural-sedation`: working and takeaway render the half-or-less wording, "propofol top-ups" and the fixed schedule are absent, no horizontal overflow at 680 px | F |
| AC-22 (review AC-20) | `src/pages/topics/ClinicalIncidentsTopic.tsx` anaphylaxis worked example (Common traps, answer, cites) | The Clinical Pitfalls bullet said "Using IV adrenaline 1:1,000 (1 mg/mL) — dilute to 1:100,000 first", an unsupported mandatory ratio that contradicts the same page's named RCUK peri-operative algorithm; the answer gave only "IM 0.5 mg (or IV 50 µg titrated)" without preparations, and the case cited `AAGBI 2009`, which is the post-anaesthesia recovery record | Adults and children under 12 in a monitored anaesthetic or intensive-care setting; IM route when IV access is unavailable; community IM algorithm kept separate | RCUK peri-operative anaphylaxis algorithm 2024, https://www.resus.org.uk/sites/default/files/2024-01/2526%20AAP%20RCUK%20periop%20anaphylaxis-8C.pdf ("Adult and child > 12 years: 50 micrograms IV (0.5 mL IV of 1 mg/10 mL [1:10,000])"; "Child < 12 years: 1 microgram/kg, needs careful dilution"; "If no IV access: 10 micrograms/kg IM, (max 500 micrograms IM) of 1 mg/mL (1:1,000)"); RCUK 2021 community IM algorithm preserved separately (500 micrograms IM, repeated after 5 minutes) | Pitfall → preparation and route separated: IV 1 mg in 10 mL (1:10,000), 50 micrograms (0.5 mL) in an adult or child over 12 years titrated to effect; under 12 years 1 microgram/kg of a carefully diluted preparation; IM 1 mg/mL (1:1,000), 10 micrograms/kg (maximum 500 micrograms) with no IV access; 500 micrograms IM in the community algorithm, repeated after 5 minutes; the closing sentence states the guideline does not mandate a 1:100,000 dilution, with an inline `RCUK Periop Anaphylaxis 2024` reference. Answer aligned to "IV adrenaline 50 µg of 1:10,000 … (IM 0.5 mg of 1 mg/mL if there is no IV access)"; `cites` → `RCUK Periop Anaphylaxis 2024` + `RCUK Anaphylaxis 2021` | `clinical-audit-2026-11-20.test.ts` (preparation, paediatric and IM assertions, old ratio absent, inline label resolves in the pool); browser on `/clinical/clinical-incidents`: pitfalls show "1 mg in 10 mL (1:10,000)", "child under 12 years needs 1 microgram/kg", the IM and community doses and the no-mandate sentence, with "dilute to 1:100,000 first" absent and no horizontal overflow at 680 px | F |

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

## Held / unverified selections (not counted as verified)

- **Sepsis chooser regimens outside NG250/CG151**: the intra-abdominal,
  urinary, meningitic and skin/soft-tissue regimens and their allergy
  alternatives are teaching examples compiled from the BNF and standard UK
  practice. They are not quoted from NG250, CG151 or NG253 and were not
  re-verified against a primary guideline. They are now labelled on the page as
  "Not source-backed here" rather than presented as guideline-derived.
- **Renal dose adjustment**: the chooser adjusts nothing for CrCl < 30 ml/min
  outside the hospital-acquired-pneumonia path, and that path's figures are
  BNF-derived rather than NG250 statements. A visible amber panel now says so
  whenever renal impairment is selected. No renal dose was invented or added.
- **Two-cuff technique** on the laser page is retained as a teaching practice;
  the ASA 2013 advisory specifies the tube choice, the saline-filled tinted
  cuff, the oxygen and nitrous oxide points, but not a two-cuff technique.
- The `BJA Educ 2017` and `BJA Educ 2004` records in the lasers pool remain
  held (`underReview: true`, display label "Citation under review"). They are
  not counted as verified and no hold was cleared.

## Register status

Closed for this branch. Every row above is either **F** (fixed and exercised
in the running app), **A** (fixed with automated coverage only), **S**
(screened, no change needed) or listed under access-limited / held material.
No row is left open, and no source hold was cleared to make a row pass. AC-21
and AC-22 were added in the final focused turn and are both **F**.

## Verification run

All commands were run inside the `web` compose service
(`docker compose --project-name app --project-directory "$BASE44_PROJECT_ROOT"
-f "$BASE44_CONFIG_ROOT/docker-compose.base44.yml" exec -T web ...`).

- `node_modules/.bin/tsc -p tsconfig.app.json --noEmit` — clean, exit 0.
- `node_modules/.bin/vitest run src/test/clinical-audit-2026-11-20.test.ts` —
  **37 passed (37)**. This file carries the AC-05 to AC-20 assertions.
- Focused citation and snapshot suites — `cites-labels`,
  `section-sources-labels`, `required-citations`, `sources`,
  `topic-faq-snapshots`, `diagram-source-citations`, `governance-citations`,
  `external-urls` plus the audit file — **9 files, 67 tests passed**.
- Full suite `node_modules/.bin/vitest run` — **3,311 passed, 14 failed, 25
  skipped (3,350)**. The 14 failures are the pre-existing baseline categories
  unchanged by this work: `approved-model-replacements` (6), JSON-LD
  coverage/route/params/structured-data/url-mapping (5) and SEO per-route meta
  for `/viva/voice` and `/my-enquiries` (3).
- Generated artifacts rebuilt after the content edits: FAQ snapshot
  (`src/test/__snapshots__/topic-faq-snapshots.test.ts.snap`, 2 snapshots
  updated), search index (192 topics, 1,248 heading + 16,913 prose records),
  audit corpus (192 topics), diagram registry (475 entries), viva deck (649
  cards, 151 topics, content-hash assets refreshed).
- `scripts/check-reference-integrity.ts` was not re-run this turn; the counts
  above are measured by executing `src/data/references.ts` directly. The 62
  unresolved DOIs recorded earlier are unchanged and none was relabelled.

**Final focused turn (AC-21 and AC-22).** Same `web` compose service:

- `node_modules/.bin/tsc -p tsconfig.app.json --noEmit` — clean, exit 0.
- `node_modules/.bin/vitest run src/test/clinical-audit-2026-11-20.test.ts` —
  **40 passed (40)**, including the two new BSG assertions and the
  peri-operative adrenaline-preparation assertion.
- Focused citation and snapshot suites — `cites-labels`,
  `section-sources-labels`, `required-citations`, `sources`,
  `topic-faq-snapshots`, `diagram-source-citations`, `governance-citations`,
  `external-urls` plus the audit file — **9 files, 70 tests passed**.
- Full suite `node_modules/.bin/vitest run` — **3,314 passed, 14 failed, 25
  skipped (3,353)**. The 14 failures are the same pre-existing baseline
  categories (approved-model 6, JSON-LD 5, SEO 3). The first full run after the
  content edits also caught the stale viva-deck content hash, which was
  regenerated before the final run.
- Generated artifacts rebuilt after the edits: search index (192 topics, 1,248
  heading + 16,913 prose records), audit corpus (192 topics), podcast
  topic-corpus and viva deck (649 cards, 151 topics, content hash refreshed).
  No reference placement, hold or identifier count changed — the only
  bibliography edit was the `BSG 2023` excerpt text.

### Browser verification (managed preview browser, 680 px viewport)

- `/intensive-care/paediatric-icu` — the rendered figure contains "AED with
  adult-size pads", "AED with paediatric pads" and "Manual defibrillation
  (PALS)"; the reversed conditional ("Use anterolateral only if anteroposterior
  cannot be achieved") is absent; the energy card shows "4 J/kg for the initial
  shocks", "120–200 J, depending on the type of defibrillator" and "increased
  stepwise to 8 J/kg (max 360 J)"; the manual guidance shows "who can easily be
  turned onto their side" and "use anterolateral in larger children"; the worked
  example shows "Decompensated circulatory failure means immediate synchronised
  cardioversion" and "maximum of 4 J/kg (12 J, then 24 J)". No horizontal
  overflow at 680 px.
- `/physics/lasers-fibreoptics` — "ASA 2013 practice advisory on operating-room
  fires" present; "Association of Anaesthetists 2023", "FiO₂ <30%",
  "ideally ≤0.30" and "at least 24 h" absent; with the safety subsection opened,
  the post-fire box shows "the advisory specifies no observation period" and
  "the advisory specifies no imaging schedule".
- `/pharmacology/antimicrobials-pharm` — with HAP/VAP, Anaphylaxis and
  CrCl < 30 ml/min selected: first line is the NG250 levofloxacin option with
  "only when other first-line antibiotics are unsuitable", no aztreonam, the
  amber "not verified here" panel reads "BNF-derived teaching example", and the
  "Not source-backed here" hold note is present. With Neutropenic sepsis
  selected: "within 1 hour only for adults at high risk", "on ward
  deterioration", "up to 3 hours at medium risk", "up to 6 hours at low risk"
  and "NICE CG151 requires empiric therapy immediately" are all rendered, and
  the old "key quality metric" wording is gone. The banner reads "Sepsis bundle
  — the antibiotic clock depends on risk".
- `/clinical/clinical-incidents` (AC-22) — the Common traps box renders
  "1 mg in 10 mL (1:10,000)", "child under 12 years needs 1 microgram/kg",
  "10 micrograms/kg IM (maximum 500 micrograms)", "500 micrograms IM in the
  community algorithm, repeated after 5 minutes" and "does not mandate a
  1:100,000 dilution"; "dilute to 1:100,000 first" is absent; the take-home
  reads "IV adrenaline 50 µg of 1:10,000"; no horizontal overflow at 680 px.
- `/clinical/procedural-sedation` (AC-21) — the frail colonoscopy case working
  renders "half or less of the dose a younger healthy patient would need" and
  "can only be delivered by trained anaesthetists"; the takeaway renders "half
  or less of the dose a younger healthy adult would need", "not a fixed
  benzodiazepine–opioid–propofol schedule" and the anaesthetic-team pathway;
  "propofol top-ups" and "Midazolam 0.5–1 mg + fentanyl 25 µg" are absent; no
  horizontal overflow at 680 px.
- Zero console errors across the five routes.
- Final focused re-run after the last copy edit:
  `clinical-audit-2026-11-20`, `topic-faq-snapshots`, `required-citations`,
  `diagram-source-citations` — **4 files, 47 tests passed**; typecheck clean.

### Corrected output, verbatim from the changed files

- WETFLAG energy card: "Defibrillation for VF/pulseless VT uses 4 J/kg for the
  initial shocks, and it seems reasonable not to use doses above those
  suggested for adults (120–200 J, depending on the type of defibrillator). For
  refractory VF/pVT — more than five shocks — the dose is increased stepwise to
  8 J/kg (max 360 J)."
- WETFLAG manual placement: "Use anteroposterior in infants and children under
  25 kg who can easily be turned onto their side and in whom the anterolateral
  position is more difficult without the pads touching; use anterolateral in
  larger children, because it interrupts chest compressions less."
- Paediatric ICU worked example: "Decompensated circulatory failure means
  immediate synchronised cardioversion, not drug therapy first: 1 J/kg (6 J),
  doubling with each attempt to a maximum of 4 J/kg (12 J, then 24 J)."
- Sepsis chooser: "within 1 hour only for adults at high risk of severe illness
  or death from sepsis (recommendation 1.8.3), up to 3 hours at medium risk
  (1.8.17) and up to 6 hours at low risk (1.8.23)."
- Laser page: "Prevention follows the ASA 2013 practice advisory on
  operating-room fires" and "the advisory specifies no observation period".
- Anaphylaxis pitfalls (AC-22): "The monitored peri-operative IV bolus uses the
  dilute 1 mg in 10 mL (1:10,000) preparation: 50 micrograms (0.5 mL) in an
  adult or child over 12 years, titrated to effect; a child under 12 years needs
  1 microgram/kg of a carefully diluted preparation." … "The peri-operative
  guideline does not mandate a 1:100,000 dilution for the adult IV bolus."
- Frail colonoscopy takeaway (AC-21): "Titrate one agent at a time to comfort,
  at half or less of the dose a younger healthy adult would need and in smaller
  increments, allowing peak effect before the next increment — not a fixed
  benzodiazepine–opioid–propofol schedule."

## Not attempted

- No medicine-record, podcast-transcript or viva-bank content was re-audited
  in this turn beyond the citation mirrors and generated assets above; those
  surfaces keep their existing audit status.
- The ABG tool was not compared against a second analyser-derived dataset; the
  consistency guard uses the Henderson–Hasselbalch relation only.
- No deployment was performed and nothing was published.
