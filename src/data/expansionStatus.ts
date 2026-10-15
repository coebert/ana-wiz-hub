/**
 * Curriculum expansion tracking.
 *
 * "Expanded" means a checked, source-led teaching batch has been added to the
 * topic (mechanisms, clinical interpretation, evidence limits, learning
 * checks, curated references). It does NOT certify every claim in the topic.
 *
 * Keep this file in sync with curriculum-expansion.md and roadmap.md — update
 * it whenever a batch is completed or a new priority is identified.
 */
import type { Section } from "./curriculum";

export type ExpansionStatus = "expanded" | "in-progress" | "pending";

export interface ExpansionEntry {
  status: ExpansionStatus;
  /** What has actually been added, or what is outstanding. */
  note: string;
}

/** Section-level default status, used for topics without a topic-level entry. */
export const SECTION_EXPANSION: Record<Section, ExpansionEntry> = {
  physics: {
    status: "in-progress",
    note: "Six-subsection batch checked (Joule–Thomson, transformers, Doppler, arterial dynamic response, flow/heliox, temperature errors). Other physics subsections still need individual review.",
  },
  physiology: {
    status: "in-progress",
    note: "Renal, hepatic and fetal batches checked. Remaining physiology subsections still need individual review.",
  },
  pharmacology: {
    status: "pending",
    note: "Differential blockade batch started (local anaesthetics). Meyer–Overton evidence added (volatile agents). Antimicrobials (antibiotics, antifungals, antivirals, antimalarials, antiseptics, resistance) expanded; toxicology paracetamol and IV anaesthetics PRIS batches added; each lesson lists its sources. Remaining pharmacology subsections need individual review.",
  },
  anatomy: {
    status: "pending",
    note: "Diagram sourcing and citation work completed separately; subsection-depth review not yet done. Candidates: ankle nerves, pelvic autonomics, chest-wall block planes.",
  },
  clinical: {
    status: "pending",
    note: "First batch checked (ENT, paediatrics, renal transplant, bariatric, colorectal). Remaining surgery-specific subsections not yet reviewed.",
  },
  "intensive-care": {
    status: "pending",
    note: "APRV lesson checked. Other ICU subsections not yet reviewed; candidates: innate immunity, endocrine crises.",
  },
  perioperative: {
    status: "pending",
    note: "First batch checked. Remaining topics not yet reviewed; candidates: frailty assessment, complex needs, disease-specific decisions.",
  },
  chemistry: {
    status: "pending",
    note: "Atomic Structure & Bonding, Acids, Bases & Buffers, Solutions & Concentration, Organic Chemistry and Oxidation & Reduction source-audited (15 October 2026); invented or mismatched sources replaced. Remaining gaps: uncited paragraphs on the acids and solutions pages, Kw/temperature, drug pKa, osmometry and Donnan lessons added 15 October 2026. Not consultant-certified.",
  },
};

/** Topic-level overrides for topics with a completed expansion batch. */
export const TOPIC_EXPANSION: Record<string, ExpansionEntry> = {
  "ventilation-protocols": { status: "expanded", note: "New three-lesson page linked from Mechanical Ventilation: admission settings (ARDSNet 2000), monitoring (plateau, driving pressure Amato 2015), sedation and weaning protocols (ABC 2008, Blackwood 2014 Cochrane, closed-loop Cochrane 2025). Verbatim excerpts, learning checks and quiz. Source-checked, not consultant-reviewed." },
  "peep-management": { status: "expanded", note: "New five-lesson adult ICU page linked from Mechanical Ventilation: PEEP measurement, lung protection, titration/haemodynamic response, timing settings, recruitment and obstructive risks. Fifteen verified excerpts (ATS 2024, ESICM 2023, ART, Stather 2005, Grinnan 2005), learning checks, five-question quiz and arithmetic-only timing explorer. Source-checked, not consultant-reviewed." },
  "pics-follow-up": { status: "expanded", note: "New page: six-step NICE CG83 pathway (early short assessment, table 1 risk markers, goals and early rehab, ward step-down incl. 6-week manual, home discharge information, 2–3 month face-to-face review) plus ICU diary evidence (Jones 2010 positive; Garrouste-Orgeas 2019 JAMA negative) and PRaCTICaL. Source-checked, not consultant-reviewed." },
  "anaesthesia-basics": { status: "expanded", note: "New page with six source-led lessons; added agents (Nickalls & Mapleson 2003, ENIGMA-II, IMPACT), drug interactions (Bouillon 2004, Cavalcante 2017) and monitoring alternatives (BAG-RECALL, Sanders 2017 IFT; AoA 2021 standards abstract only). Original three: processed/raw EEG (Purdon 2015, NICE HTG292), accidental awareness (NAP5 2014; B-Aware, B-Unaware, BAG-RECALL) and TIVA (AoA/SIVA 2019, NICE HTG292). TIVA guideline full text not retrievable, so only its summary is quoted; practical pump and cannula detail lives on the TIVA page. Source-checked, not consultant-reviewed." },
  "pain-medicine": { status: "in-progress", note: "Gabapentinoid evidence lesson added (Verret 2020, 281 RCTs: pain reductions below the minimally important difference); unsupported claim that NICE recommends postoperative gabapentinoids removed. Other subsections still need source-led review." },
  "paediatric-icu": { status: "in-progress", note: "FEAST lesson added with verbatim trial results and applicability limits; hypotonic-fluid key point re-cited to NICE NG29 instead of FEAST. Other subsections still need source-led review." },
  "icu-endocrine-emergencies": { status: "expanded", note: "15 October 2026: added adrenal recognition/resuscitation/recovery, sepsis replacement versus adjunctive steroids (SSC 2021, SCCM 2024) and DKA safety/recovery (international 2024 consensus, explicit JBDS differences); 13 verified quotations, three learning checks and four additional quiz questions. Every section now has source-led lessons: DKA/HHS (JBDS) plus balanced-crystalloid evidence, thyroid storm/myxoedema (ATA), adrenal/apoplexy (SfE, UK 2011 guideline), phaeochromocytoma preparation (Endocrine Society, PRESCRIPT) and crisis (Whitelaw 2014), hyponatraemia (SALSA) and perioperative SGLT2. Unsourced crisis doses removed. Source-checked, not consultant-reviewed. Four source-led lessons added: DKA/HHS treatment and resolution; thyroid storm/myxoedema; adrenal crisis/apoplexy; perioperative SGLT2 safety. Corrected worked-example citations, BWPS arithmetic, HHS sodium/insulin rules, ATA steroid load, secondary adrenal mineralocorticoid advice and linked displays. Lesson/source tests, authenticated lesson/quiz rendering, search and private audit-copy refresh passed. SALSA hypertonic-saline lesson added to the water-balance section. Thyroid section reviewed line by line against ATA 2016 (Table 7 doses, BWPS thresholds, 8–25% mortality) and ATA 2014; unsourced aspirin, cholestyramine-dose, IV propranolol and myxoedema mortality claims removed." },
  "emergency-surgery": { status: "expanded", note: "Five lessons added: urgency/source control, airway trial interpretation, appendicitis, adhesive obstruction and hip fracture. Corrected KETASED/IRIS overclaims, appendicitis timing, hip-fracture citation and fixed-volume obstruction advice; ten-question quiz reconciled. Lesson/source tests, authenticated rendering/quiz, search and private audit-copy refresh passed. ANNEXA-I and REVERSE-AD reversal lessons, UK-REBOA damage-control lesson and NICE NG126 (2026) ectopic lesson added; outdated universal anti-D advice and unsourced ketamine preference corrected. TIVA and fasciotomy sections reviewed line by line against AoA/SIVA 2019, NAP5 and BOAST 2025 (unsourced model details removed; outdated not-elevated limb advice corrected); AoA/SIVA TIVA and McQueen 1996 lessons added. Source-checked, not consultant-reviewed." },
  "surgical-protocols": { status: "in-progress", note: "ERAS evidence lesson (Greco 2014 meta-analysis) added; all ten surgery guides source-linked (neurosurgery CO₂ target explicitly marked as consensus without a checked trial source)." },
  "cardiac-arrest-post-resus": {
    status: "expanded",
    note: "BOX oxygen and TTM2 lessons added. Older sections reviewed: temperature advice aligned to the 2022 ERC–ESICM fever-prevention update, neuroprognostication markers/timings aligned to ERC/ESICM 2021 (NSE >60, SSEP ≥24 h, status myoclonus), MAP/glucose/Hb targets softened to evidence, COACT survival figure, DOSE-VF guidance status and mismatched citations corrected.",
  },
  "neurointensive-care": {
    status: "expanded",
    note: "HEMOTION/TRAIN and RESCUEicp lessons added. Older sections reviewed: outdated 2008 apnoea-test tile fixed to AoMRC 2025, PaCO₂ targets harmonised with SIBICC, CPP >70 harm attributed to Robertson 1999, hypothermia evidence (Eurotherm/POLAR), spinal-cord MAP updated for AO Spine 2024.",
  },
  "resource-poor-anaesthesia": {
    status: "in-progress",
    note: "Evidence lessons added (WFSA workforce survey, ASOS, WHO checklist; ASOS caesarean spinal vs GA substudy) with sources lists. Lancet Commission workforce target (20 specialist SAO physicians/100,000 by 2030) verified via PubMed-indexed secondary sources and the workforce claim corrected.",
  },
  "aki-rrt": {
    status: "in-progress",
    note: "STARRT-AKI RRT-timing and RENAL CRRT-dose lessons added (abstract-verified) with sources list; timing-table verdict softened. Other subsections still need review.",
  },
  "sepsis": {
    status: "in-progress",
    note: "15 October 2026: added Sepsis-3 criteria/screening and EGDT (Rivers 2001 to PRISM 2017) lessons with verbatim Sepsis-3, SSC 2021, Rivers and PRISM quotations, learning checks and two quiz questions. Lesson added on the 65 trial (permissive hypotension) and HYPRESS (steroids before shock), with sources list and learning check. BLING III / prolonged β-lactam infusion meta-analysis and Seymour 2017 antibiotic-timing lessons added. Other subsections still need review.",
  },
  "elderly-anaesthesia": {
    status: "in-progress",
    note: "RAGA/REGAIN hip-fracture anaesthesia lesson added (death, mobility and delirium no different between spinal and general), with a correction to the NICE mortality claim and sources list. Other subsections still need review.",
  },
  "icu-nutrition": {
    status: "in-progress",
    note: "Protein/calorie trials lesson added (EFFORT Protein, NUTRIREA-2/3, TARGET), trial list corrected (TARGET year, NUTRIREA-2/3 split, EFFORT added) and three cross-wired key-point citations fixed. Other subsections still need review.",
  },
  "operating-theatre-environment": {
    status: "expanded",
    note: "Normothermia lesson added (Kurz 1996 NEJM). Line-by-line review done (WEL table, filtration, bioburden, NICE CG65 wording, harmonised temperature/humidity). Checklist evidence lesson added (Haynes 2009 before–after vs Urbach 2014 Ontario mandated roll-out); overstated 'checklist reduces mortality' key point and exam tip corrected. Theatre noise and wound-infection lesson added (Kurmann 2011); unsourced noise decibel targets replaced. Laminar-flow evidence lesson added (Lidwell 1982 vs Brandt 2008 and WHO 2016 conditional recommendation), with sources list. Other subsections still need review.",
  },
  "ophthalmic-anaesthesia": {
    status: "expanded",
    note: "Strabismus PONV lesson added (Shen 2014 meta-analysis, Splinter 2001); uncited 60–80% PONV figure replaced with sourced two-thirds. Anticoagulant/antiplatelet cataract audit lesson added (Benzimra 2009, 48,862 operations). Line-by-line review done (intraocular gas durations, N₂O solubility, suxamethonium mechanism, off-topic airway text, mislabelled citation). Peribulbar vs retrobulbar lesson added (Alhassan 2015 Cochrane); FAQ claim of less complete peribulbar akinesia corrected. Evidence lesson added (Guay 2015 Cochrane: topical vs sub-Tenon's pain outcomes and insufficient complication evidence; OCR incidence with and without sub-Tenon's bupivacaine), with sources list. Other subsections still need review.",
  },
  "interventional-radiology": {
    status: "expanded",
    note: "Staff radiation lesson added (Dagal 2011 review, Baumann 2015 real-time dose display). Contrast-kidney trials lesson added (AMACING no-hydration non-inferiority, PRESERVE bicarbonate/acetylcysteine). Line-by-line review done (contrast AKI definition, eGFR thresholds and hydration regimen per ESUR 2018, anaphylaxis per RCUK 2021, contrast premedication, metformin, mis-cited key points). Thrombectomy anaesthesia evidence lesson added (SIESTA/ANSTROKE/GOLIATH, Bai 2021 meta-analysis, GOLIATH haemodynamic analysis) and the thrombectomy FAQ answer corrected; sources list added. Other subsections still need review.",
  },
  "mass-casualty-military": {
    status: "expanded",
    note: "Requested expansion and editorial source review complete: ethics/consent/expectant triage (NHS 2020, GMC), crisis teamwork (JESIP, NICE NG116), bleeding control (European trauma 2023), military capabilities (NATO AJP-4.10 2019) and chemical incidents (PHE CBRN 2018, UKHSA nerve agents 2024). NARU TST/NHS MITT 2023 retained. Corrected expectant-category context, universal TXA/1:1:1 claims, TBI pressure targets, fixed surgical limits and blanket decontamination-first advice. Five source lists and learning checks added; cases, summaries and ten-question quiz reconciled. Twenty focused tests, authenticated desktop/phone checks, search and private audit-copy refresh passed. Completion denotes this editorial expansion, not independent clinical certification; current local protocols and TOXBASE still govern care.",
  },
  "burns-icu": {
    status: "in-progress",
    note: "Evidence lesson added (ABA 2024 burn shock resuscitation CPG: start 2 mL/kg/%TBSA, albumin, no recommendation for vitamin C/FFP/early RRT; Saffle 2007 fluid creep; Herndon 2001 and Williams 2011 propranolol RCTs; Herndon 1989 early-excision RCT vs Wang 2026 meta-analysis), with sources list and learning checks. Other subsections still need review.",
  },
  "abdominal-compartment-syndrome": {
    status: "expanded",
    note: "Whole topic reviewed against the full WSACS 2013 guideline text (PMC3680657) and Malbrain 2005: definitions, paediatric values, risk-factor table, measurement, medical algorithm with GRADE strengths, open-abdomen classification (3a/3b added), FAQs, worked examples, key points and quiz corrected. Removed unsourced figures (APP target presented as a recommendation, 250 mL/kg and 3.5 L thresholds, 7–10 day closure, 40–70% mortality, palpation <50%). Evidence-strength and IAH epidemiology lessons added.",
  },
  "atomic-structure-bonding": {
    status: "expanded",
    note: "Line-by-line audit (15 October 2026): replaced an unverifiable 'BJA Educ 2010' bonding citation, corrected the Tec 6 altitude trap (constant volume %, not partial pressure), Na–Cl ΔEN (~2.2) and the hydrogen-bond definition. Added five lessons (atoms/ions/isotopes/mole; electronegativity; hydrogen bonding and drug binding; C–F bond and volatiles; vapour pressure and the desflurane vaporiser) with IUPAC, O'Hagan, OpenAnesthesia and WFSA quotations, learning checks and three quiz questions. Textbook citations remain general references; diagram content not separately reviewed. Not consultant-certified.",
  },
  "non-technical-skills": {
    status: "in-progress",
    note: "ANTS/WHO evidence lesson retained. Added detailed operational debriefing, crisis speaking-up and TeamSTEPPS lessons with AHRQ/NICE quotations, fictional applications, learning checks and four additional quiz questions (15 October 2026). Removed conflicting unsourced STOP-5/timing and PTSD-benefit implications; canonical CUS distinguished from local adaptations. This batch does not complete review of older cognitive-bias, SHEEP, safety or introductory claims; topic remains in progress, not consultant-certified.",
  },
  "iv-anaesthetics": {
    status: "in-progress",
    note: "Propofol infusion syndrome lesson added (Hemphill 2019 case analysis: child vs adult phenotype, mortality markers, dose relationship, recognition and haemofiltration). Other subsections still need review.",
  },
  toxicology: {
    status: "in-progress",
    note: "Paracetamol poisoning subsection added (NAPQI mechanism, 2012 UK treatment line, SNAP 2014 regimen evidence, anaphylactoid reactions, learning checks). Other toxicology subsections still need review.",
  },
  "bariatric-anaesthesia": {
    status: "in-progress",
    note: "Equipment pathway added earlier. Evidence lesson added (AAGBI/SOBA 2015 status, STOP questionnaire validation, lean-body-weight dosing, ramped vs sniffing videolaryngoscopy meta-analysis) with quoted abstracts and learning checks. Older sections not yet reviewed.",
  },
  "trauma-emergency": {
    status: "expanded",
    note: "Full line-by-line review: NG39/NG41 attribution fixed, CRASH-2/CRASH-3 TXA claim corrected, quiz TBI SBP aligned to BTF age bands. Some practice details (fibrinogen yields, tourniquet placement, etomidate pharmacology) remain uncited. Haemostatic-trials lesson added (CRYOSTAT-2 and PATCH-Trauma with verbatim results). Content/source review, not consultant certification.",
  },
  "transfer-medicine": {
    status: "expanded",
    note: "Evidence lesson added (Parmentier-Decrucq 2013, Fanara 2010, Droogh 2012). Full line-by-line review: AAGBI dependency levels corrected (no Category 1–4 scheme), unsupported ST4+ grade removed, Droogh 2015 reference corrected, altitude figure harmonised. Drug-dose and neuroprotection targets remain uncited. Content/source review, not consultant certification.",
  },
  "postop-high-risk-icu": {
    status: "expanded",
    note: "Trial-evidence lesson added (OPTIMISE 2014, OPTIMISE II 2024, Kahan 2017 ISOS critical-care admission, PRISM 2021 CPAP) with quoted abstracts and learning checks; corrected overstated goal-directed therapy pitfall. Content/source review, not consultant certification.",
  },
  "antimicrobials-icu": {
    status: "expanded",
    note: "Trial-evidence lesson added (Chastre 2003 VAP 8 vs 15 days, BALANCE 2025 bacteraemia 7 vs 14 days, MERINO 2018 ESBL carbapenem-sparing) with quoted abstracts, learning checks and sources. Content/source review, not consultant certification.",
  },
  "end-of-life-communication": {
    status: "expanded",
    note: "Family-support trial lesson added (Lautrette 2007 VALUE/brochure, PARTNER 2018, Kentish-Barnes 2017 condolence letter) with quoted abstracts, learning checks and sources. Content/source review, not consultant certification.",
  },
  "antimicrobials-pharm": {
    status: "expanded",
    note: "Antibiotics (critical-illness exposure, DALI, loading doses, TDM, stewardship), antifungals (candidaemia sequencing per IDSA 2016 and Reboli 2007) antivirals (selectivity and trial interpretation), antimalarials (SEAQUAMAT/AQUAMAT) and antiseptics (Darouiche 2010, CLEAN 2015, NAP6 chlorhexidine allergy) and resistance (GBD 2022 burden, MDR/XDR definitions, spread, selection) lessons added with learning checks.",
  },
  "volatile-agents": {
    status: "in-progress",
    note: "Meyer–Overton evidence lesson added (luciferase, isoflurane isomers, non-immobilisers, modern target/pathway view, learning checks). Other subsections still need review.",
  },
  "local-anaesthetics": {
    status: "in-progress",
    note: "Differential blockade lesson added (size-principle limits from Fink 1984 and Gokin 2001, bedside testing, evidence limits, learning checks). Other subsections still need review.",
  },
  // --- Physics batch ---
  "si-units-thermodynamics": {
    status: "expanded",
    note: "Joule–Thomson effect and process boundaries added, with sources and a calculated example.",
  },
  "electricity-magnetism": {
    status: "expanded",
    note: "Transformers and the limits of isolation added.",
  },
  "ultrasound-physics": {
    status: "expanded",
    note: "Doppler spectral interpretation expanded.",
  },
  "clinical-measurement": {
    status: "expanded",
    note: "Arterial dynamic response (natural frequency, damping) expanded.",
  },
  "flow-measurement": {
    status: "expanded",
    note: "Flow-regime assumptions and heliox expanded.",
  },
  "temperature-measurement": {
    status: "expanded",
    note: "Temperature sensor/site error sources expanded.",
  },
  "critical-care-overview": {
    status: "expanded",
    note: "New page with three source-led lessons: ICU structure (ICS 2021 levels, GPICS 2.1 time standards), team roles (GPICS ratios, Pronovost 2002, Kerlin 2013) and communication (daily goals, I-PASS, discharge handover, Lautrette 2007). Verbatim excerpts; learning checks and quiz. Source-checked, not consultant-reviewed.",
  },
  "haemorrhagic-shock": {
    status: "expanded",
    note: "Three source-led lessons linked with Trauma: shock recognition (ATLS limits, shock index, lactate, lethal triad), blood pressure monitoring (Meidert cuff vs arterial, Rossaint/NG39 targets), transfusion (PROPPR, PAMPer, RePHILL, CRASH-2 timing, calcium, ITACTIC). Verbatim excerpts; learning checks and quiz. Source-checked, not consultant-reviewed.",
  },
  "fluid-balance": {
    status: "expanded",
    note: "Four source-led lessons linked from Acid-Base Disorders: tonicity basics, isotonic resuscitation, hypotonic maintenance and hospital-acquired hyponatraemia, hypertonic saline. Verbatim NICE CG174/NG29, European hyponatraemia guideline, SALSA, SMART and PLUS excerpts; learning checks and quiz. Source-checked, not consultant-reviewed.",
  },
  "metabolic-alkalosis": {
    status: "expanded",
    note: "Five source-led lessons linked from Acid-Base Disorders: mechanisms/maintenance, assessment/urine chloride, causes/post-hypercapnia, treatment/evidence, safety. Verified short Park/Sidebotham BJA Education 2023 quotations with separate AJKD Core Curriculum 2022 diagnostic excerpts; learning checks and five-question quiz. Source-checked, not consultant-reviewed.",
  },
  "icu-inpatient-journey": {
    status: "expanded",
    note: "New page linked from Critical Care Overview: four stages (referral/triage, admission, daily treatment, discharge/follow-up) linking to existing ICU pages. Verbatim ICS 2021, GPICS 2.1, Pronovost 2003, Starmer 2014 and Lautrette 2007 excerpts reused from the overview block; learning checks and five-question quiz. Source-checked, not consultant-reviewed.",
  },
  "thyroid-function": {
    status: "expanded",
    note: "New standalone page linked from Endocrine Co-Existing Disease: four lessons (synthesis/control, tests, perioperative disease, post-thyroidectomy haematoma) quoting OpenStax and DAS 2022. Physiology then perioperative care, verbatim quotations checked against the sources, learning checks and five-question quiz. Source-checked, not consultant-reviewed.",
  },
  "diabetes-management": {
    status: "expanded",
    note: "New standalone page linked from Endocrine Co-Existing Disease: four lessons (insulin physiology, preoperative/newer drugs, VRIII and hypoglycaemia, postoperative/ICU) quoting OpenStax and BJA Education 2024. Physiology then perioperative care, verbatim quotations checked against the sources, learning checks and five-question quiz. Source-checked, not consultant-reviewed.",
  },
  "endocrine-tumours": {
    status: "expanded",
    note: "New standalone page linked from Endocrine Co-Existing Disease: four lessons (catecholamine physiology, phaeochromocytoma diagnosis, anaesthesia and resection, carcinoid) quoting Gombert 2025 and Xu 2022. Physiology then perioperative care, verbatim quotations checked against the sources, learning checks and five-question quiz. Source-checked, not consultant-reviewed.",
  },
  "thyroid-storm": {
    status: "expanded",
    note: "New standalone page linked from Endocrine Emergencies: four lessons (recognition/BWPS, thionamides and iodide timing, beta-blockade/steroids/cooling/plasmapheresis, perioperative) with verbatim JTA/JES 2016 and ATA 2016 quotations; learning checks and five-question quiz. Source-checked, not consultant-reviewed.",
  },
  "adrenal-crisis": {
    status: "expanded",
    note: "New standalone page linked from Endocrine Emergencies: four lessons (recognition, immediate hydrocortisone and fluids, recovery/sick-day rules, replacement vs septic-shock adjunct) reusing verified SfE 2016 and SSC 2021 excerpts plus two new SfE quotations; five-question quiz. Source-checked, not consultant-reviewed.",
  },
  "pituitary-apoplexy": {
    status: "expanded",
    note: "New standalone page linked from Endocrine Emergencies: three lessons (recognition/imaging, emergency steroids, surgery vs conservative and follow-up) with verbatim SfE 2016 and UK 2011 quotations; five-question quiz. Source-checked, not consultant-reviewed.",
  },
  "dka": {
    status: "expanded",
    note: "New standalone page linked from Endocrine Emergencies: five source-led lessons (diagnosis/blood ketones, fluids and balanced-crystalloid evidence, fixed-rate insulin and potassium safety, resolution criteria and transition, euglycaemic DKA/SGLT2/escalation). Verified JBDS 2023, Umpierrez 2024 consensus, SMART/SALT-ED 2020 and Jung 2019 quotations reused from the endocrine reference block; learning checks and five-question quiz. Source-checked, not consultant-reviewed.",
  },
  "acid-base": {
    status: "expanded",
    note: "HAGMA, NAGMA, osmolar gap, Stewart and citrate subsections source-reviewed and complete; linked formulae, displays and toxin criteria corrected. Source-checked, not consultant-reviewed; this does not certify the remaining older sections.",
  },
  // --- Physiology batch ---
  "renal-physiology": {
    status: "expanded",
    note: "Net acid accounting, distal transport, ammonium adaptation and urine-pH interpretation added.",
  },
  "hepatic-physiology": {
    status: "expanded",
    note: "Hepatic gradients, ammonia scavenging and model limits added.",
  },
  "foetal-circulation": {
    status: "expanded",
    note: "Preload/afterload handover, experimental evidence limits; placental transfer and pulmonary flow/resistance corrections.",
  },
  // --- Earlier completed batches ---
  "mechanical-ventilation": {
    status: "expanded",
    note: "ICU weaning lesson added: AARC 2024 readiness screen, SBT method/duration, oxygen and daily-assessment cautions, intolerance and separate airway/extubation assessment; three learning checks and verified short quotations. Related RSBI example and readiness summary reconciled. Shared APRV lesson: physiology, settings, monitoring, troubleshooting and evidence-based cautions. Stress ulcer prophylaxis lesson (SUP-ICU 2018, REVISE 2024) added with sources list; care-bundle SUP-ICU misstatement corrected. PROSEVA prone-positioning lesson added; PROSEVA key-point citation fixed. Older sections reviewed: EOLIA ECMO criteria, respiratory-failure definitions, FLORALI mortality attribution, Masip 2000 (NIV not CPAP), diaphragm atrophy data and ARDS escalation order corrected. Editorial/source-led expansion, not consultant certification.",
  },
  "ent-anaesthesia": {
    status: "expanded",
    note: "Laryngectomy emergency pathway added.",
  },
  "paediatric-anaesthesia": {
    status: "expanded",
    note: "URTI decisions and fluid prescribing added.",
  },
  "paediatric-core": {
    status: "expanded",
    note: "Paediatric URTI and maintenance/resuscitation fluid decisions added.",
  },
  "renal-disease": {
    status: "expanded",
    note: "Established renal-transplant perioperative care added.",
  },
  "general-colorectal-surgery": {
    status: "expanded",
    note: "Assessment and AP-resection phases added.",
  },
};

/** Resolve the expansion entry for a topic, falling back to its section. */
export function expansionFor(
  section: Section,
  topicId: string,
): ExpansionEntry {
  return TOPIC_EXPANSION[topicId] ?? SECTION_EXPANSION[section];
}

export const STATUS_LABEL: Record<ExpansionStatus, string> = {
  expanded: "Expanded",
  "in-progress": "Section in progress",
  pending: "Pending review",
};
