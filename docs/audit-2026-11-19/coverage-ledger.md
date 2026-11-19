# AnaesthesiaCore learner-content coverage ledger

Generated: 2026-11-19T12:17:25.602Z

> Inventory and source-checked corrections only. Not clinical sign-off, not consultant review, and not a release of held content.

## What this is

A deterministic inventory built from the app's own runtime sources: `src/data/curriculum.ts`, `references.ts`, `seeAlso.ts`, `quizzes.ts`, the case banks, `operativeSteps.ts`, the diagram tree, the calculator pages, the FAQ extractor and the Supabase type surface. It records what exists and what is missing. It does not certify accuracy.

## Counts

| Surface | Count |
|---|---:|
| topics | 192 |
| sections | 8 |
| topicPageFiles | 200 |
| teachingModules | 129 |
| topicsWithTeachingModule | 81 |
| referenceRecords | 3093 |
| quizQuestions | 923 |
| caseBankCases | 98 |
| perioperativeCases | 24 |
| operations | 82 |
| diagramFiles | 507 |
| diagramRegistryEntries | 475 |
| calculatorFiles | 7 |
| searchIndexTopics | 192 |
| vivaDeckFiles | 148 |
| databaseContentTables | 11 |

## Curriculum coverage

| Section | Topics | Topics with an explicit curriculum code in the page |
|---|---:|---:|
| Physics | 25 | 3 |
| Physiology | 20 | 15 |
| Pharmacology | 15 | 9 |
| Anatomy | 9 | 3 |
| Clinical Anaesthesia | 34 | 11 |
| Intensive Care | 61 | 14 |
| Perioperative Medicine | 22 | 15 |
| Chemistry Foundations | 6 | 2 |

Exam tags: primary 96, final 175, FFICM 130, EDIC 62.

## Explicit gaps

| Gap | Topics affected |
|---|---:|
| no explicit curriculum code in page | 120 |
| no Teaching module import | 111 |
| no quiz questions | 57 |
| no FAQ pairs | 44 |

## Database-served content

| Table | Authored content | Note |
|---|---|---|
| ask_qa_library | yes | Shared Ask AI question/answer library. |
| content_overrides | yes | Admin edits rendered on top of built-in topic content (status=live). |
| drugs | yes | Drug reference records. |
| home_announcement | yes | Public home banner. |
| inaccuracy_reports | no (learner-generated) | Learner-reported inaccuracy reports (private learner data; not audited or exported). |
| kb_chunks | no (learner-generated) | Ask AI retrieval chunks derived from authored content. |
| podcasts | yes | Podcast scripts/audio records; scripts and audio must be corrected together. |
| topic_discussions | no (learner-generated) | Learner-generated discussion (private learner data; not audited or exported). |
| topic_references | yes | Cached external reference lists rendered on topic pages. |
| viva_model_answers | yes | Cached viva model answers (generated responses). |
| public_errata | yes | Public errata notices. |

## Per-topic ledger

| Topic | Section | Refs | Refs with link | Quiz | FAQs | Teaching modules | Curriculum codes | Review status | Gaps |
|---|---|---:|---:|---:|---:|---:|---|---|---|
| SI Units & Thermodynamics (`si-units-thermodynamics`) | Physics | 12 | 9 | 10 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Mathematical Concepts (`math-concepts`) | Physics | 7 | 4 | 7 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Gas Laws (`gas-laws`) | Physics | 9 | 7 | 5 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Electricity & Magnetism (`electricity-magnetism`) | Physics | 9 | 7 | 10 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Electrical Safety (`electrical-safety`) | Physics | 14 | 11 | 5 | 17 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Defibrillation & Pacing (`defibrillation-pacing`) | Physics | 9 | 8 | 10 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Optics & Light (`optics-light`) | Physics | 12 | 9 | 10 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Lasers & Fibreoptics (`lasers-fibreoptics`) | Physics | 5 | 3 | 0 | 3 | 0 | 0 | inventoried, not clinically reviewed | no quiz questions; no Teaching module import; no explicit curriculum code in page |
| Pressure Measurement (`pressure-measurement`) | Physics | 12 | 10 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Flow & Flowmeters (`flow-measurement`) | Physics | 11 | 9 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Temperature Measurement (`temperature-measurement`) | Physics | 14 | 13 | 10 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Humidity & Gas Analysis (`humidity-gas-sampling`) | Physics | 7 | 5 | 10 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Ultrasound Physics (`ultrasound-physics`) | Physics | 9 | 7 | 10 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| MRI Physics (`mri-physics`) | Physics | 8 | 6 | 10 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| X-rays & Radiation Safety (`xray-radiation-safety`) | Physics | 8 | 8 | 10 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Anaesthetic Equipment & Monitoring (`equipment-monitoring`) | Physics | 21 | 19 | 0 | 3 | 0 | 0 | inventoried, not clinically reviewed | no quiz questions; no Teaching module import; no explicit curriculum code in page |
| Anaesthetic Vaporisers (`vaporisers`) | Physics | 4 | 2 | 0 | 3 | 0 | 0 | inventoried, not clinically reviewed | no quiz questions; no Teaching module import; no explicit curriculum code in page |
| Anaesthetic Breathing Systems (`breathing-circuits`) | Physics | 10 | 8 | 10 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Ventilator Modes (`ventilator-modes`) | Physics | 11 | 9 | 10 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Capnography (`capnography`) | Physics | 15 | 14 | 10 | 6 | 0 | 0 | source-checked correction applied (not consultant sign-off) | no Teaching module import; no explicit curriculum code in page |
| Clinical Measurement (`clinical-measurement`) | Physics | 9 | 7 | 10 | 3 | 1 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Pulse Oximetry & Capnography (`pulse-oximetry`) | Physics | 7 | 6 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| ABG Analyser & Gas Measurement (`abg-analyser`) | Physics | 7 | 5 | 13 | 3 | 1 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Depth of Anaesthesia Monitoring (`depth-of-anaesthesia`) | Physics | 8 | 8 | 6 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Statistics & Evidence-Based Medicine (`statistics-ebm`) | Physics | 10 | 9 | 0 | 3 | 0 | 0 | inventoried, not clinically reviewed | no quiz questions; no Teaching module import; no explicit curriculum code in page |
| Physiology Overview: Homeostasis, Feedback & Organ Systems (`physiology-overview`) | Physiology | 8 | 8 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Renal System Overview: Filtration, Concentration & Hormonal Control (`renal-system-overview`) | Physiology | 7 | 7 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Cardiovascular System Overview: Cardiac Output & Blood Pressure (`cardiovascular-system-overview`) | Physiology | 6 | 6 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Respiratory System Overview: Ventilation, Gas Exchange & Transport (`respiratory-system-overview`) | Physiology | 8 | 8 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| The Cardiac Cycle (`cardiac-cycle`) | Physiology | 5 | 4 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Cardiac Electrophysiology (`cardiac-electrophysiology`) | Physiology | 5 | 4 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Starling Forces & Fluid Exchange (`starling-forces`) | Physiology | 9 | 7 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Lung Mechanics (`lung-mechanics`) | Physiology | 7 | 6 | 5 | 3 | 0 | 3 | inventoried, not clinically reviewed | no Teaching module import |
| Ventilation-Perfusion Matching (`ventilation-perfusion`) | Physiology | 6 | 5 | 5 | 3 | 0 | 3 | inventoried, not clinically reviewed | no Teaching module import |
| Oxygen-Haemoglobin Dissociation (`oxygen-haemoglobin`) | Physiology | 7 | 5 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Autonomic Nervous System (`autonomic-nervous`) | Physiology | 14 | 13 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Neuromuscular Transmission (`neuromuscular`) | Physiology | 13 | 11 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Renal Physiology (`renal-physiology`) | Physiology | 18 | 16 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Gastrointestinal Physiology (`gi-physiology`) | Physiology | 17 | 15 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Hepatic Physiology (`hepatic-physiology`) | Physiology | 8 | 5 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Endocrine Physiology (`endocrine-physiology`) | Physiology | 16 | 14 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Haematology & Immunity (`haematology-immunity`) | Physiology | 25 | 23 | 5 | 3 | 0 | 4 | inventoried, not clinically reviewed | no Teaching module import |
| Maternal Physiology (`maternal-physiology`) | Physiology | 5 | 4 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Foetal Circulation (`foetal-circulation`) | Physiology | 13 | 11 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Paediatric Physiology (`paediatric-physiology`) | Physiology | 8 | 8 | 0 | 0 | 0 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no Teaching module import; no explicit curriculum code in page |
| Pharmacokinetic Principles (`pharmacokinetics`) | Pharmacology | 10 | 9 | 5 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Pharmacodynamics & Drug Receptors (`pharmacodynamics`) | Pharmacology | 4 | 2 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Intravenous Anaesthetic Agents (`iv-anaesthetics`) | Pharmacology | 13 | 9 | 5 | 3 | 1 | 1 | inventoried, not clinically reviewed | — |
| Volatile Anaesthetic Agents (`volatile-agents`) | Pharmacology | 18 | 15 | 5 | 3 | 1 | 1 | inventoried, not clinically reviewed | — |
| Neuromuscular Blocking Agents (`muscle-relaxants`) | Pharmacology | 12 | 10 | 5 | 9 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Rocuronium (`rocuronium`) | Pharmacology | 8 | 7 | 0 | 6 | 0 | 1 | inventoried, not clinically reviewed | no quiz questions; no Teaching module import |
| Local Anaesthetic Agents (`local-anaesthetics`) | Pharmacology | 10 | 9 | 5 | 3 | 1 | 1 | source-checked correction applied (not consultant sign-off) | — |
| Opioid Pharmacology (`opioids`) | Pharmacology | 18 | 16 | 5 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| NSAIDs & Paracetamol (`nsaids-paracetamol`) | Pharmacology | 4 | 2 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Vasoactive & Inotropic Agents (`vasoactive-agents`) | Pharmacology | 11 | 10 | 9 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Antiarrhythmic Drugs (`antiarrhythmics`) | Pharmacology | 5 | 4 | 8 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Anticoagulant Pharmacology (`anticoagulants`) | Pharmacology | 10 | 10 | 8 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Antimicrobials (`antimicrobials-pharm`) | Pharmacology | 28 | 27 | 0 | 3 | 6 | 0 | inventoried, not clinically reviewed | no quiz questions; no explicit curriculum code in page |
| Antiemetics (`antiemetics`) | Pharmacology | 11 | 10 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Corticosteroids & Endocrine Pharmacology (`corticosteroids`) | Pharmacology | 9 | 8 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Head, Neck & Airway Anatomy (`head-neck-anatomy`) | Anatomy | 16 | 11 | 10 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Neuroanatomy (`neuroanatomy`) | Anatomy | 5 | 2 | 5 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Vertebral Column & Spinal Cord (`spinal-anatomy`) | Anatomy | 8 | 6 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Thoracic Anatomy (`thoracic-anatomy`) | Anatomy | 12 | 9 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Cardiac & Great Vessel Anatomy (`cardiac-anatomy`) | Anatomy | 6 | 3 | 5 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Abdominal & Pelvic Anatomy (`abdominal-anatomy`) | Anatomy | 9 | 5 | 5 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Upper Limb Anatomy (`upper-limb-anatomy`) | Anatomy | 15 | 11 | 10 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Brachial Plexus (`brachial-plexus`) | Anatomy | 17 | 14 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Lower Limb & Lumbosacral Plexus (`lower-limb-anatomy`) | Anatomy | 10 | 8 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| The Operating Theatre & Theatre Complex (`operating-theatre-environment`) | Clinical Anaesthesia | 14 | 12 | 8 | 3 | 4 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Airway Management (`airway-management`) | Clinical Anaesthesia | 14 | 14 | 5 | 10 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Regional & Neuraxial Anaesthesia (`regional-anaesthesia`) | Clinical Anaesthesia | 27 | 27 | 21 | 10 | 0 | 0 | source-checked correction applied (not consultant sign-off) | no Teaching module import; no explicit curriculum code in page |
| Total Intravenous Anaesthesia (TIVA) (`tiva`) | Clinical Anaesthesia | 20 | 20 | 6 | 10 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Anaesthesia Basics: EEG, Awareness & TIVA (`anaesthesia-basics`) | Clinical Anaesthesia | 17 | 17 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Pain Medicine (`pain-medicine`) | Clinical Anaesthesia | 21 | 21 | 5 | 10 | 1 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Obstetric Anaesthesia (`obstetric-anaesthesia`) | Clinical Anaesthesia | 20 | 20 | 5 | 10 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Paediatric Anaesthesia (`paediatric-anaesthesia`) | Clinical Anaesthesia | 27 | 27 | 5 | 10 | 0 | 0 | source-checked correction applied (not consultant sign-off) | no Teaching module import; no explicit curriculum code in page |
| Paediatric Core Essentials (`paediatric-core`) | Clinical Anaesthesia | 9 | 9 | 0 | 0 | 0 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no Teaching module import; no explicit curriculum code in page |
| Neuroanaesthesia (`neuroanaesthesia`) | Clinical Anaesthesia | 11 | 10 | 5 | 10 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Cardiothoracic Anaesthesia (`cardiothoracic`) | Clinical Anaesthesia | 9 | 8 | 5 | 10 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Orthopaedic Anaesthesia (`orthopaedic-anaesthesia`) | Clinical Anaesthesia | 16 | 15 | 5 | 10 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Vascular Anaesthesia (`vascular-anaesthesia`) | Clinical Anaesthesia | 10 | 10 | 5 | 10 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| ENT & Maxillofacial Anaesthesia (`ent-anaesthesia`) | Clinical Anaesthesia | 13 | 13 | 5 | 10 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Ophthalmic Anaesthesia (`ophthalmic-anaesthesia`) | Clinical Anaesthesia | 11 | 9 | 5 | 10 | 4 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Perioperative Protocols by Surgery Type (`surgical-protocols`) | Clinical Anaesthesia | 16 | 16 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| General & Colorectal Surgery (`general-colorectal-surgery`) | Clinical Anaesthesia | 40 | 40 | 6 | 0 | 0 | 0 | inventoried, not clinically reviewed | no FAQ pairs; no Teaching module import; no explicit curriculum code in page |
| Urological Anaesthesia (`urological-anaesthesia`) | Clinical Anaesthesia | 16 | 16 | 5 | 10 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Gynaecological Anaesthesia (`gynaecological-anaesthesia`) | Clinical Anaesthesia | 10 | 10 | 5 | 10 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Hepatobiliary & Transplant Anaesthesia (`hepatobiliary-transplant`) | Clinical Anaesthesia | 9 | 8 | 5 | 10 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Burns & Plastic Surgery (`burns-plastics`) | Clinical Anaesthesia | 17 | 16 | 5 | 10 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Plastic Surgery & Microsurgery (`plastic-surgery`) | Clinical Anaesthesia | 3 | 1 | 5 | 10 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Bariatric Anaesthesia (`bariatric-anaesthesia`) | Clinical Anaesthesia | 10 | 10 | 5 | 3 | 1 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Anaesthesia for the Elderly (`elderly-anaesthesia`) | Clinical Anaesthesia | 14 | 14 | 5 | 3 | 1 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Day Surgery (`day-surgery`) | Clinical Anaesthesia | 9 | 9 | 5 | 3 | 0 | 0 | source-checked correction applied (not consultant sign-off) | no Teaching module import; no explicit curriculum code in page |
| Procedural Sedation (`procedural-sedation`) | Clinical Anaesthesia | 12 | 10 | 7 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Anaesthesia for Interventional Radiology (`interventional-radiology`) | Clinical Anaesthesia | 16 | 15 | 5 | 3 | 3 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Transfer of the Critically Ill Patient (`transfer-medicine`) | Clinical Anaesthesia | 7 | 7 | 5 | 3 | 1 | 1 | inventoried, not clinically reviewed | — |
| Patient Positioning in Anaesthesia (`patient-positioning`) | Clinical Anaesthesia | 9 | 9 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Anaesthesia for Emergency Surgery (`emergency-surgery`) | Clinical Anaesthesia | 36 | 31 | 10 | 3 | 1 | 1 | inventoried, not clinically reviewed | — |
| Trauma & Emergency Anaesthesia (`trauma-emergency`) | Clinical Anaesthesia | 51 | 51 | 5 | 13 | 2 | 1 | inventoried, not clinically reviewed | — |
| Critical Incidents (`clinical-incidents`) | Clinical Anaesthesia | 14 | 14 | 5 | 3 | 0 | 1 | source-checked correction applied (not consultant sign-off) | no Teaching module import |
| Anaesthesia in Resource-Poor Settings (`resource-poor-anaesthesia`) | Clinical Anaesthesia | 13 | 13 | 6 | 3 | 2 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Mass Casualty, CRM & Military Anaesthesia (`mass-casualty-military`) | Clinical Anaesthesia | 28 | 27 | 10 | 3 | 1 | 1 | inventoried, not clinically reviewed | — |
| Mechanical Ventilation (`mechanical-ventilation`) | Intensive Care | 37 | 36 | 5 | 3 | 4 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| ICU Ventilation Protocols (`ventilation-protocols`) | Intensive Care | 7 | 7 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| PEEP Management (`peep-management`) | Intensive Care | 17 | 17 | 0 | 0 | 2 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| ARDS & Lung Injury (`ards`) | Intensive Care | 22 | 22 | 5 | 8 | 1 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Bronchospastic Respiratory Failure (`bronchospastic-failure`) | Intensive Care | 25 | 25 | 6 | 3 | 2 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Circulatory Failure, Shock & Mechanical Circulatory Support (`circulatory-failure`) | Intensive Care | 20 | 20 | 5 | 3 | 1 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Cardiac Output Monitoring (`cardiac-output-monitoring`) | Intensive Care | 10 | 10 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Pulmonary Hypertension Management (`pulmonary-hypertension`) | Intensive Care | 6 | 6 | 6 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Arrhythmias & ECG Interpretation (`arrhythmias-ecg-icu`) | Intensive Care | 12 | 12 | 10 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Cardiac Arrest & Post-Resuscitation Care (`cardiac-arrest-post-resus`) | Intensive Care | 15 | 15 | 10 | 8 | 2 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Neuroprognostication after Cardiac Arrest (`neuroprognostication`) | Intensive Care | 6 | 6 | 0 | 3 | 0 | 0 | inventoried, not clinically reviewed | no quiz questions; no Teaching module import; no explicit curriculum code in page |
| Extracorporeal Membrane Oxygenation (ECMO) (`ecmo`) | Intensive Care | 18 | 18 | 5 | 7 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| ICU Discharge Planning and Longer-Term Recovery (`icu-discharge-planning`) | Intensive Care | 11 | 11 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| ICU Outcomes: Survival, Length of Stay and Readmission (`icu-outcomes`) | Intensive Care | 64 | 64 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Anaphylaxis in Critical Care (`icu-anaphylaxis`) | Intensive Care | 9 | 9 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| The General Adult ICU: Staffing and Costs (`icu-general-unit`) | Intensive Care | 9 | 9 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| The Cardiothoracic ICU: Staffing and Costs (`icu-cardiac-unit`) | Intensive Care | 6 | 6 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| The Neurocritical Care Unit: Staffing and Costs (`icu-neuro-unit`) | Intensive Care | 4 | 4 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| The Liver ICU: Staffing and Costs (`icu-liver-unit`) | Intensive Care | 7 | 7 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Obstetric Critical Care: Staffing and Costs (`icu-obstetric-unit`) | Intensive Care | 8 | 8 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| ICU Staffing: Roles, Specialist Units and International Standards (`icu-staffing-ratios`) | Intensive Care | 54 | 54 | 0 | 0 | 3 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| ICU Costs: NHS Trends, Conditions and International Comparisons (`icu-costs`) | Intensive Care | 30 | 30 | 0 | 0 | 4 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| ICU Length of Stay by Condition and Organ Support (`icu-length-of-stay`) | Intensive Care | 5 | 5 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Severe Pre-eclampsia and Eclampsia in Critical Care (`icu-eclampsia`) | Intensive Care | 7 | 7 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| ICU Resuscitation: The First Hour of Septic Shock (`sepsis-resuscitation`) | Intensive Care | 21 | 21 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Septic Shock: Vasopressors, MAP & Steroids (`septic-shock`) | Intensive Care | 17 | 17 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Sepsis & Septic Shock (`sepsis`) | Intensive Care | 39 | 39 | 7 | 8 | 5 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Infectious Disease in ICU (`infectious-disease-icu`) | Intensive Care | 12 | 12 | 5 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Antimicrobials in ICU (`antimicrobials-icu`) | Intensive Care | 15 | 15 | 5 | 3 | 1 | 1 | inventoried, not clinically reviewed | — |
| Acid-Base Disorders (`acid-base`) | Intensive Care | 47 | 46 | 5 | 3 | 3 | 1 | inventoried, not clinically reviewed | — |
| Metabolic Alkalosis (`metabolic-alkalosis`) | Intensive Care | 16 | 16 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Critical Care Overview: Structure, Team & Communication (`critical-care-overview`) | Intensive Care | 26 | 26 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| The ICU Inpatient Journey: Admission to Discharge (`icu-inpatient-journey`) | Intensive Care | 33 | 33 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Haemorrhagic Shock & Resuscitation (`haemorrhagic-shock`) | Intensive Care | 22 | 22 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Hypovolaemia & Fluid Resuscitation (`hypovolaemia`) | Intensive Care | 7 | 7 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Peritonitis & Intra-abdominal Sepsis (`peritonitis`) | Intensive Care | 6 | 6 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Fluid Balance and Tonicity (`fluid-balance`) | Intensive Care | 9 | 9 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Acute Kidney Injury & RRT (`aki-rrt`) | Intensive Care | 30 | 30 | 12 | 8 | 3 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Nutrition in Critical Care (`icu-nutrition`) | Intensive Care | 16 | 16 | 5 | 3 | 1 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Endocrine Emergencies in ICU (`icu-endocrine-emergencies`) | Intensive Care | 49 | 43 | 14 | 3 | 3 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Diabetic Ketoacidosis (DKA) (`dka`) | Intensive Care | 10 | 10 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Thyroid Storm (`thyroid-storm`) | Intensive Care | 10 | 10 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Adrenal Crisis (`adrenal-crisis`) | Intensive Care | 15 | 15 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Pituitary Apoplexy (`pituitary-apoplexy`) | Intensive Care | 8 | 8 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Neurointensive Care (`neurointensive-care`) | Intensive Care | 19 | 19 | 5 | 3 | 2 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| ICU Sedation & Delirium (`icu-sedation-delirium`) | Intensive Care | 17 | 17 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Acute Liver Failure (`acute-liver-failure`) | Intensive Care | 22 | 22 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Acute Severe Pancreatitis (`acute-pancreatitis`) | Intensive Care | 27 | 27 | 7 | 3 | 1 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Abdominal Compartment Syndrome (`abdominal-compartment-syndrome`) | Intensive Care | 8 | 8 | 7 | 3 | 2 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Toxicology & Poisoning (`toxicology`) | Intensive Care | 12 | 12 | 5 | 3 | 1 | 1 | inventoried, not clinically reviewed | — |
| Transfusion & Coagulation (`transfusion-coagulation`) | Intensive Care | 41 | 41 | 5 | 3 | 2 | 1 | inventoried, not clinically reviewed | — |
| Haematological & Immunological Disorders (`haematology-icu`) | Intensive Care | 18 | 18 | 0 | 3 | 0 | 1 | inventoried, not clinically reviewed | no quiz questions; no Teaching module import |
| Immunology for Intensivists (`immunology-intensivists`) | Intensive Care | 15 | 13 | 0 | 0 | 0 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no Teaching module import; no explicit curriculum code in page |
| Critical Care of the High-Risk Surgical Patient (`postop-high-risk-icu`) | Intensive Care | 19 | 19 | 5 | 3 | 1 | 0 | inventoried, not clinically reviewed | no explicit curriculum code in page |
| Paediatric Intensive Care & Emergencies (`paediatric-icu`) | Intensive Care | 80 | 80 | 0 | 6 | 1 | 1 | source-checked correction applied (not consultant sign-off) | no quiz questions |
| Burns Intensive Care (`burns-icu`) | Intensive Care | 27 | 21 | 6 | 3 | 1 | 1 | inventoried, not clinically reviewed | — |
| Organ Donation (`organ-donation`) | Intensive Care | 14 | 14 | 5 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Prognostication, Ethics & Outcomes (`prognostication-ethics-icu`) | Intensive Care | 21 | 21 | 0 | 3 | 1 | 1 | inventoried, not clinically reviewed | no quiz questions |
| PICS Follow-Up Plan (`pics-follow-up`) | Intensive Care | 11 | 11 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| End-of-Life Care & Communication (`end-of-life-communication`) | Intensive Care | 14 | 11 | 0 | 3 | 1 | 1 | inventoried, not clinically reviewed | no quiz questions |
| Non-Technical Skills & Human Factors (`non-technical-skills`) | Intensive Care | 20 | 17 | 0 | 3 | 1 | 2 | inventoried, not clinically reviewed | no quiz questions |
| Operations Library: Surgical Steps for Anaesthetists (`operative-steps`) | Perioperative Medicine | 148 | 148 | 0 | 0 | 0 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no Teaching module import; no explicit curriculum code in page |
| Preoperative Assessment (`preoperative-assessment`) | Perioperative Medicine | 19 | 19 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Anaesthetic Risk & Informed Consent (`anaesthetic-risk`) | Perioperative Medicine | 71 | 71 | 19 | 0 | 6 | 4 | inventoried, not clinically reviewed | no FAQ pairs |
| Enhanced Recovery (ERAS) (`enhanced-recovery`) | Perioperative Medicine | 20 | 20 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Perioperative Fluid Therapy (`perioperative-fluids`) | Perioperative Medicine | 12 | 12 | 5 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Vascular Access Devices (`vascular-access-devices`) | Perioperative Medicine | 10 | 9 | 5 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Cardiovascular Co-Existing Disease (`cardiovascular-disease`) | Perioperative Medicine | 10 | 10 | 5 | 6 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Respiratory Co-Existing Disease (`respiratory-disease`) | Perioperative Medicine | 11 | 10 | 5 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Endocrine Co-Existing Disease (`endocrine-disease`) | Perioperative Medicine | 11 | 11 | 5 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Thyroid Function (`thyroid-function`) | Perioperative Medicine | 7 | 7 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Diabetes Management (`diabetes-management`) | Perioperative Medicine | 8 | 8 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Endocrine Tumours (`endocrine-tumours`) | Perioperative Medicine | 8 | 8 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Neurological Co-Existing Disease (`neurological-disease`) | Perioperative Medicine | 10 | 9 | 5 | 3 | 0 | 2 | inventoried, not clinically reviewed | no Teaching module import |
| Haematological Co-Existing Disease (`haematological-disease`) | Perioperative Medicine | 17 | 16 | 5 | 8 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Hepatic Co-Existing Disease (`hepatic-disease`) | Perioperative Medicine | 18 | 18 | 6 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Renal Co-Existing Disease (`renal-disease`) | Perioperative Medicine | 15 | 15 | 5 | 4 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Musculoskeletal & Rheumatological Disease (`musculoskeletal-disease`) | Perioperative Medicine | 6 | 6 | 4 | 4 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Gastrointestinal Co-Existing Disease (`gastrointestinal-disease`) | Perioperative Medicine | 7 | 7 | 4 | 4 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Psychiatric Disease & Substance Misuse (`psychiatric-substance-disease`) | Perioperative Medicine | 7 | 7 | 4 | 4 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Anaesthesia for Patients with Complex Needs (`complex-needs-anaesthesia`) | Perioperative Medicine | 10 | 10 | 6 | 7 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Immunosuppression & HIV (`immunosuppression-hiv`) | Perioperative Medicine | 6 | 6 | 4 | 4 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Genetic Syndromes & Anaesthesia (`genetic-syndromes`) | Perioperative Medicine | 21 | 17 | 8 | 3 | 0 | 0 | inventoried, not clinically reviewed | no Teaching module import; no explicit curriculum code in page |
| Atomic Structure & Chemical Bonding (`atomic-structure-bonding`) | Chemistry Foundations | 8 | 6 | 0 | 3 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no explicit curriculum code in page |
| Temperature & pH (`temperature-ph`) | Chemistry Foundations | 3 | 3 | 0 | 0 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no FAQ pairs; no explicit curriculum code in page |
| Acids, Bases & Buffer Systems (`acids-bases-buffers`) | Chemistry Foundations | 14 | 9 | 0 | 3 | 1 | 0 | inventoried, not clinically reviewed | no quiz questions; no explicit curriculum code in page |
| Organic Chemistry for Anaesthetists (`organic-chemistry`) | Chemistry Foundations | 15 | 12 | 4 | 3 | 0 | 1 | inventoried, not clinically reviewed | no Teaching module import |
| Solutions & Concentration (`solutions-concentration`) | Chemistry Foundations | 13 | 12 | 3 | 3 | 1 | 1 | inventoried, not clinically reviewed | — |
| Oxidation, Reduction & Electrochemistry (`oxidation-reduction`) | Chemistry Foundations | 10 | 8 | 0 | 3 | 0 | 0 | inventoried, not clinically reviewed | no quiz questions; no Teaching module import; no explicit curriculum code in page |

## Limits

- Reference counts are declared records, not verified bibliographic matches. Run `npm run check:references` for DOI/PMID resolution and see `source-verification.json` for the records independently checked in this audit.
- FAQ counts come from the repository's existing extractor; a topic whose FAQ literal does not follow the documented convention is reported as zero rather than guessed.
- Database tables are listed from the generated Supabase types; the sandbox has no service-role access to the separate production database, so live row counts and live `content_overrides` are not read here.
- No learner data, private discussion, viva attempts, study time or support messages are included.
