
## Curriculum Expansion Plan

### 1. Structural Changes
- Add an **exam selector** filter (FRCA Primary / FRCA Final / FFICM) in the header — unified curriculum but filterable
- Update the `Topic` type to support multiple exam tags: `examTags: ("primary" | "final" | "fficm")[]`
- Add new top-level **sections** alongside Physics/Physiology/Pharmacology:
  - **Clinical Anaesthesia** (FRCA Final topics)
  - **Intensive Care** (FFICM + overlapping Final topics)
  - **Perioperative Medicine** (shared Final/FFICM)

### 2. FRCA Final Topics (~20 new topics)
Based on the RCoA Intermediate Curriculum:

**Clinical Anaesthesia:**
- Airway Management (difficult airway algorithms, DAS guidelines)
- Regional & Neuraxial Anaesthesia (spinal, epidural, nerve blocks)
- Obstetric Anaesthesia (CS, epidural labour, high-risk obstetrics)
- Paediatric Anaesthesia (neonatal physiology, common procedures)
- Neuroanaesthesia (ICP management, posterior fossa, neuromonitoring)
- Cardiothoracic Anaesthesia (CPB, one-lung ventilation, TOE)
- Vascular Anaesthesia (aortic surgery, carotid, EVAR)
- Ophthalmic Anaesthesia (blocks, oculocardiac reflex)
- ENT & Maxillofacial (shared airway, laser safety)
- Day Surgery & Sedation
- Perioperative Medicine (preop assessment, enhanced recovery, CPET)
- Clinical Incidents (anaphylaxis, MH, LA toxicity, awareness)
- Trauma & Emergency Anaesthesia (RSI, damage control, massive transfusion)
- Orthopaedic & Spinal Anaesthesia (cement, tourniquets, fat embolism)
- Pain Medicine (acute pain, chronic pain, neuropathic, interventions)

### 3. FFICM / ICM Topics (~15 new topics)
Based on the FICM curriculum domains:

**Intensive Care:**
- Sepsis & Septic Shock (Surviving Sepsis, bundles, vasopressors)
- Mechanical Ventilation (modes, ARDS protocols, weaning)
- Circulatory Failure & Shock (cardiogenic, distributive, obstructive)
- Acute Kidney Injury & RRT (KDIGO, CRRT, IHD)
- Acute Liver Failure (paracetamol, King's criteria, transplant)
- Neurointensive Care (TBI, SAH, status epilepticus, brain death)
- Cardiac Output Monitoring (PA catheter, PiCCO, oesophageal Doppler)
- Blood Gases & Acid-Base (Stewart approach, SID, anion gap)
- Nutrition in Critical Care (enteral/parenteral, refeeding syndrome)
- ARDS & Lung Injury (Berlin definition, prone positioning, ECMO)
- Antimicrobials in ICU (empiric therapy, resistance, stewardship)
- Transfusion & Coagulation (massive transfusion, DIC, TEG/ROTEM)
- Organ Donation (brainstem death testing, DCD, donor management)
- ICU Delirium & Sedation (CAM-ICU, RASS, dexmedetomidine)
- Transport of the Critically Ill

### 4. Shared/Cross-Tagged Topics
Several existing Primary topics get additional tags:
- Pharmacokinetics → Primary + Final + FFICM
- Renal Physiology → Primary + FFICM
- Autonomic Nervous System → Primary + Final
- Cardiac Cycle → Primary + Final + FFICM

### 5. Implementation Approach
- **Phase 1**: Restructure data model, add sections and exam filter UI
- **Phase 2**: Build first batch of ~10 clinical topics with diagrams (highest-yield exam topics)
- **Phase 3**: Build remaining ~25 topics
- Each topic includes: structured content, interactive diagram where appropriate, 5 FRCA/FFICM-style MCQs

### Diagrams planned for new topics:
- Difficult Airway Algorithm flowchart
- Dermatome map for regional anaesthesia
- Surviving Sepsis bundles timeline
- Ventilator waveforms (pressure/flow/volume)
- Stewart acid-base diagram
- ARDS Berlin criteria visual
- Cardiac output monitoring comparison
- Pain pathway diagram
