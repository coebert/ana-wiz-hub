import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { CriticalTransferChecklist } from "@/components/CriticalTransferChecklist";
import { TransportVentilationDiagram } from "@/components/diagrams/TransportVentilationDiagram";
import { transferMedicineQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Apply ICS / AAGBI / FICM standards to plan a safe inter-hospital transfer of the critically ill patient (decision, personnel, equipment)",
  "Stabilise a critically ill patient using an ABCDE-led pre-departure checklist and a 'package the patient' approach",
  "Calculate oxygen reserve required for transfer and identify when supplies are inadequate",
  "Set up a portable ventilator and infusion pumps for safe transfer, anticipating ventilation, sedation and haemodynamic challenges in transit",
  "Apply neuroprotective transfer principles to the patient with traumatic brain injury or raised ICP",
  "Predict the physiological effects of acceleration, altitude and vibration on the transferred patient",
  "Recognise and manage in-transit emergencies (hypoxia, hypotension, accidental extubation, equipment failure)",
  "Hand over effectively at the receiving unit (SBAR/ISBAR) with complete documentation, and audit/learn from each transfer",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Oxygen requirement for a 90-minute road transfer",
    scenario:
      "A ventilated TBI patient needs transfer to a neurosurgical centre 90 min away. Minute ventilation 8 L/min, FiO₂ 0.5 on a transport ventilator that uses ~1 L/min driving gas. How much O₂ do you carry?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step calculation</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>O₂ delivered to patient.</strong> FiO₂ 0.5 × MV 8 L/min = <strong>4 L/min</strong>.</li>
          <li><strong>Add ventilator driving gas.</strong> 4 + 1 = <strong>5 L/min</strong> total consumption.</li>
          <li><strong>Convert duration to volume.</strong> 5 L/min × 90 min = <strong>450 L baseline</strong>.</li>
          <li><strong>Apply 2× safety factor.</strong> 450 × 2 = <strong>900 L</strong> minimum to carry (covers traffic, FiO₂ escalation, transfer delay).</li>
          <li><strong>Choose cylinders.</strong> E-cylinder = 680 L; CD-cylinder = 460 L. Carry 2 × E (1,360 L) or 1 × E + 1 × CD (1,140 L).</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Check gauges fully open before departure — gauge reads pressure, not volume.</li>
          <li>Confirm receiving unit O₂ is connected on arrival before disconnecting cylinders.</li>
          <li>If FiO₂ rises to 1.0, recalculate (consumption doubles → reserve halves).</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Forgetting the driving gas — turbine ventilators use little, but pneumatic ventilators can use 1–2 L/min on top of patient flow.</li>
            <li>Calculating without a safety factor and arriving with an empty cylinder in a lift.</li>
            <li>Using cylinder content tables instead of measuring the actual gauge — partially used cylinders are a major cause of in-transit hypoxia.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Take a minimum of two full E-cylinders (1,360 L). Always pre-calculate using flow × time × 2 safety factor, check cylinder gauges before departure, and confirm receiving unit O₂ is available on arrival. A single cylinder would risk run-out before reaching destination.",
  },
  {
    title: "Air transfer of a patient with a chest drain",
    scenario:
      "A 35-year-old with traumatic pneumothorax and chest drain in situ requires fixed-wing transfer at cabin altitude 8,000 ft. How does this affect management?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Estimate cabin pressure.</strong> 8,000 ft cabin altitude ≈ 75 kPa (sea level 101 kPa).</li>
          <li><strong>Apply Boyle's law.</strong> P₁V₁ = P₂V₂ → V₂/V₁ = 101/75 ≈ <strong>1.35</strong> — gas-filled cavities expand by ~35% (commonly quoted as 25–35%).</li>
          <li><strong>List affected spaces.</strong> Pneumothorax, ETT cuff, bowel, middle ear, sinuses, pneumocephalus, eye gas after vitrectomy.</li>
          <li><strong>Mitigate each.</strong> Drain on continuous underwater seal or Heimlich valve (NEVER clamp). Replace ETT cuff air with saline OR monitor cuff manometer (target ≤ 30 cmH₂O).</li>
          <li><strong>Compensate for ↓ PaO₂.</strong> Increase FiO₂; aim SpO₂ ≥ 94% in flight (≥ 96% if TBI).</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points</p>
        <ul className="list-disc list-inside space-y-1">
          <li>If pneumothorax untreated → insert chest drain BEFORE flight, not at altitude.</li>
          <li>Acute desaturation in flight = exclude tension pneumothorax (re-examine, consider needle decompression).</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Clamping a chest drain 'just for the transfer' — converts simple pneumothorax to tension.</li>
            <li>Ignoring middle-ear/sinus expansion in conscious patients (severe pain on descent).</li>
            <li>Forgetting that recent diving (within 24 h) is a relative contraindication to flight (residual nitrogen).</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Maintain the chest drain on continuous underwater seal (kept upright, below the patient) or a Heimlich valve — never clamp. Fill the ETT cuff with saline or monitor the cuff manometer at altitude. Counsel the team that any new desaturation in flight should prompt assessment for a tension pneumothorax.",
  },
];

const TransferMedicineTopic = () => {
  return (
    <TopicTemplate
      title="Transfer of the Critically Ill Patient"
      subtitle="Pre-departure stabilisation, packaging, in-transit care and the physiology of transport"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="transfer-medicine"
      topicTitle="Transfer of the Critically Ill Patient"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={transferMedicineQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["FFICM 2.6", "RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "ICS Transfer 2019",
          "AAGBI Transfer 2009",
          "BJA Educ 2018",
        ],
        workedExamples: [
          "AAGBI Transfer 2009",
          "ICS Transfer 2019",
          "BJA Educ 2018",
        ],
        keyPoints: [
          "ICS Transfer 2019",
          "BJA Educ 2018",
          "AAGBI Transfer 2009",
        ],
      }}
      keyPoints={[
        { text: "Standard of care during transfer must be at least as good as at referring hospital (ICS/AAGBI)", cites: ["BJA Educ 2018"] },
        { text: "Secure airway BEFORE transfer if any concern. Chest drains must NEVER be clamped — use Heimlich valve", cites: ["ICS Transfer 2019"] },
        { text: "O₂ calculation: E-cylinder = 680L. Calculate flow × time × 2 safety factor. Always carry spare", cites: ["AAGBI Transfer 2009"] },
        { text: "Altitude: gas expands (Boyle's law) — ETT cuff, pneumothorax, bowel gas. ↓ PaO₂ at cabin altitude", cites: ["BJA Educ 2018"] },
        { text: "Minimum monitoring: ECG, SpO₂, ETCO₂, invasive BP, temperature. Battery backup essential", cites: ["ICS Transfer 2019"] },
        { text: "Senior-to-senior decision; transfer team minimum doctor + assistant, both familiar with equipment", cites: ["AAGBI Transfer 2009"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="checklist" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.6"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">End-to-End Transfer Checklist</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              An interactive proforma covering the five sequential phases of a critically-ill transfer:
              decision &amp; team, ABCDE stabilisation, equipment / drugs / oxygen, ISBAR handover, and
              post-transfer documentation. Tick each item before departing the referring unit.
            </p>
            <CriticalTransferChecklist />
          </ExamSection>

          <ExamSection id="principles" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Principles of Safe Transfer</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              ICS/AAGBI guidelines: the standard of care during transfer should be at least as good as at the referring hospital.
              Decision to transfer must be made by a senior clinician. Benefits must outweigh risks.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Indications</strong>: specialist care unavailable (neurosurgery, cardiothoracic, ECMO, burns), investigations (MRI, angiography), repatriation</li>
              <li><strong>Decision</strong>: senior-to-senior communication. Referring and receiving teams agree on timing and clinical plan</li>
              <li><strong>Personnel</strong>: minimum doctor + assistant (nurse/ODP). Doctor experienced in transfer medicine. Both trained in equipment</li>
            </ul>
          </ExamSection>

          <ExamSection id="abcde" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Preparation — ABCDE Stabilisation</h2>
            <div className="space-y-3">
              {[
                { area: "Airway", detail: "Secure airway before transfer if any concern. ETT preferred (secured, documented at teeth). Carry difficult airway equipment." },
                { area: "Breathing", detail: "Portable ventilator with disconnect alarm. Sufficient O₂ (calculate: flow rate × duration × 2 for safety). Chest drain clamping is NEVER safe — use underwater seal or Heimlich valve." },
                { area: "Circulation", detail: "Two large-bore IV cannulae (secured). Adequate fluids/blood. Vasopressors prepared in syringes. Invasive arterial monitoring recommended." },
                { area: "Disability", detail: "Sedation/analgesia infusions prepared. ICP management if relevant. Seizure prophylaxis/treatment available." },
                { area: "Exposure", detail: "Temperature management: active warming, space blanket. Prevent hypothermia during prolonged transfers." },
              ].map(item => (
                <div key={item.area} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.area}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="equipment" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Equipment & Documentation</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Monitoring</strong>: ECG, SpO₂, ETCO₂, invasive BP, temperature — minimum standard. Battery backup essential</li>
              <li><strong>O₂ calculation</strong>: E-cylinder (680L) at 10L/min = 68 min. D-cylinder (340L). Always carry spare</li>
              <li><strong>Drugs</strong>: emergency drugs drawn up and labelled. Adrenaline, atropine, midazolam, propofol, suxamethonium, rocuronium, vasopressors</li>
              <li><strong>Documentation</strong>: transfer form with observations every 15 min, interventions, clinical events. Handover at receiving unit using SBAR/ISBAR</li>
            </ul>
          </ExamSection>

          <ExamSection id="physics" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.6"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Physics of Transport</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Acceleration/deceleration</strong>: affects BP measurement (transducer position relative to heart changes), ↑ ICP risk, equipment movement</li>
              <li><strong>Altitude (air transfer)</strong>: ↓ barometric pressure → gas expansion (Boyle's law). ETT cuff, pneumothorax, bowel gas all expand. ↓ PaO₂ (cabin altitude ~6,000-8,000 ft)</li>
              <li><strong>Vibration</strong>: artefact on monitoring, patient discomfort, equipment damage</li>
              <li><strong>Noise</strong>: makes auscultation impossible — rely on capnography and SpO₂. Communication difficult</li>
            </ul>
          </ExamSection>

          <ExamSection id="classification" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Classification of Transfers</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Categorising the transfer informs urgency, team composition and risk acceptance.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>By geography</strong>: intra-hospital (e.g. ICU → CT/MRI/IR), inter-hospital (district general → tertiary), international/repatriation</li>
              <li><strong>By urgency</strong>: time-critical (rupturing AAA, extradural haematoma, STEMI for PCI) vs clinically urgent vs elective/repatriation</li>
              <li><strong>By mode</strong>: road ambulance (default in UK; cheap, flexible), rotary-wing (helicopter; faster &gt;50 miles, weather-limited), fixed-wing (long distance &gt;150 miles, cabin altitude effects)</li>
              <li><strong>By team</strong>: parent team, regional retrieval service (e.g. neonatal/paediatric — STRS, NTS; adult ECMO retrieval), critical care transfer service (e.g. ACCTS in England)</li>
            </ul>
          </ExamSection>

          <ExamSection id="packaging" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Packaging the Critically Ill Patient</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              "Package the patient" — every line, tube and monitor must be secured, labelled and accessible before the trolley moves.
              Resist the urge to leave at speed: most in-transit emergencies stem from inadequate pre-departure preparation.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Airway</strong>: ETT position confirmed (CXR + cm at teeth), tube tied not taped, bite block, suction immediately available, spare ETT and difficult airway kit</li>
              <li><strong>Breathing</strong>: ventilator settings replicated and observed for ≥15 min before departure; ETCO₂ trace visible; chest auscultated; CXR reviewed; chest drain on Heimlich/underwater seal kept upright and below patient</li>
              <li><strong>Circulation</strong>: 2 × secured large-bore IV access plus a dedicated central or large peripheral line for vasopressors; arterial line zeroed at tragus (TBI) or phlebostatic axis; cross-matched blood if bleeding</li>
              <li><strong>Drugs &amp; pumps</strong>: all infusions on battery-powered pumps with adequate charge and labelled; spare syringes drawn up (sedation, paralysis, vasopressor); push-dose pressors ready</li>
              <li><strong>Patient</strong>: secured to trolley with straps; eyes taped; pressure points padded; NG tube on free drainage (gas expansion at altitude); urinary catheter; temperature probe; warming blanket</li>
              <li><strong>Notes &amp; imaging</strong>: copy of notes, drug chart, imaging on disc/PACS link, blood results, consent/best-interests documentation, next-of-kin contact</li>
            </ul>
          </ExamSection>

          <ExamSection id="ventilation-sedation" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Ventilation &amp; Sedation in Transit</h2>
            <TransportVentilationDiagram />
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Transport ventilator</strong>: must replicate the patient's ICU settings (PEEP, FiO₂, mode). Confirm it triggers, alarms (disconnect, high pressure, low gas) and has a self-inflating bag as backup</li>
              <li><strong>Lung-protective ventilation</strong>: TV 6 mL/kg IBW, plateau ≤30 cmH₂O, PEEP titrated to oxygenation. Recruit before disconnecting from ICU ventilator to avoid de-recruitment</li>
              <li><strong>Oxygenation target</strong>: SpO₂ 94–98% (≥96% if TBI). Pre-oxygenate with FiO₂ 1.0 for moves between ventilators</li>
              <li><strong>Capnography is mandatory</strong>: sudden ↓ETCO₂ = disconnection, cardiac arrest or massive PE; sudden ↑ETCO₂ = hypoventilation or rising metabolic rate</li>
              <li><strong>Sedation</strong>: continue propofol + opioid (or midazolam if cardiovascularly unstable). Light sedation in a noisy, vibrating ambulance risks awareness, cough, ↑ICP and accidental extubation</li>
              <li><strong>Neuromuscular blockade</strong>: routinely consider for ventilated patients during transfer to prevent dys-synchrony, coughing and line/tube displacement</li>
            </ul>
          </ExamSection>

          <ExamSection id="neuroprotection" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.6"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Neuroprotective Transfer (TBI / Raised ICP)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The TBI patient is the archetypal critically-ill transfer. Secondary injury from hypoxia,
              hypotension, hypercarbia or hyperthermia is preventable and dramatically worsens outcome.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Airway</strong>: intubate before transfer if GCS ≤8, falling GCS, loss of airway reflexes, seizures, or for any agitated TBI patient requiring CT</li>
              <li><strong>Targets</strong>: SpO₂ ≥96%, PaO₂ &gt;13 kPa, PaCO₂ 4.5–5.0 kPa, MAP ≥80 mmHg (CPP &gt;60 mmHg), temperature 36–37°C, glucose 6–10 mmol/L, Na 140–145 mmol/L</li>
              <li><strong>Position</strong>: head-up 30°, neutral neck, tube ties not too tight (avoid jugular venous obstruction)</li>
              <li><strong>Osmotherapy ready</strong>: mannitol 0.5–1 g/kg or hypertonic saline (e.g. 3% 250 mL) for acute deterioration (blown pupil, Cushing response)</li>
              <li><strong>Avoid</strong>: prophylactic hyperventilation (vasoconstriction → ischaemia), hypotonic fluids, dextrose-containing solutions</li>
            </ul>
          </ExamSection>

          <ExamSection id="sedation-analgesia" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.6"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Sedation &amp; Analgesia in Transit</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The transport environment (noise, vibration, acceleration, repeated handling, cold) is highly stimulating.
              Sedation and analgesia must be deeper and more reliable than in the ICU bed-space, but titrated to avoid
              cardiovascular collapse in a moving vehicle where assessment is difficult.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>General principle</strong>: continue the patient's existing ICU regimen if effective; do not start a new agent immediately before departure. Aim RASS −4 to −5 for ventilated TBI/ARDS transfers, RASS −2 to −3 for stable ventilated patients</li>
              <li><strong>Hypnotic — propofol</strong>: 1–4 mg/kg/h infusion; predictable, short context-sensitive half-time, antiepileptic, ↓CMRO₂ and ICP. Watch for hypotension on acceleration/deceleration; reduce dose or add noradrenaline rather than under-sedate</li>
              <li><strong>Hypnotic — midazolam</strong>: 0.03–0.2 mg/kg/h preferred when haemodynamically unstable or for prolonged transfers; accumulates, slower wake-up at destination — flag in handover</li>
              <li><strong>Hypnotic — ketamine</strong>: 1–3 mg/kg/h; sympathomimetic, bronchodilator, analgesic — useful in shocked/asthmatic patients. Modern evidence does not support an absolute contraindication in TBI when CO₂ is controlled</li>
              <li><strong>Analgesia — opioid</strong>: fentanyl 1–5 µg/kg/h or alfentanil 30–100 µg/kg/h (rapid offset, useful when neuro reassessment planned at destination); morphine acceptable but slower-offset</li>
              <li><strong>Analgesia — adjuncts</strong>: paracetamol 1 g IV for pyrexia/analgesia (also helps neuroprotective normothermia); regional blocks placed before transfer (e.g. fascia iliaca for # NOF) reduce opioid requirement</li>
              <li><strong>Neuromuscular blockade</strong>: routinely consider rocuronium 0.3–0.6 mg/kg/h (or boluses) for ventilated transfers — abolishes coughing, dys-synchrony, ↑ICP and prevents tube/line displacement. Always combine with adequate hypnosis to avoid awareness; ensure sugammadex available</li>
              <li><strong>Bolus / push-dose drugs ready</strong>: pre-drawn fentanyl 50 µg, propofol 20 mg, rocuronium 50 mg, plus push-dose vasopressor (e.g. metaraminol 0.5 mg/mL or adrenaline 10 µg/mL) for surges in stimulation (suctioning, road handover, lift transfers)</li>
              <li><strong>Awareness risk</strong>: paralysed + under-sedated in a noisy moving vehicle is a high-risk scenario. If unsure, deepen sedation; document depth at every set of obs</li>
            </ul>
          </ExamSection>

          <ExamSection id="neuromonitoring" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.6"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Neuromonitoring Considerations</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Clinical neurological assessment is virtually impossible during transit (sedation, paralysis, vibration, noise).
              The clinician must therefore rely on surrogate physiological and device-based monitoring, and protect the brain
              by maintaining tight homeostasis.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Pre-departure neuro exam</strong>: document GCS, pupils (size, symmetry, reactivity), focal signs, sedation hold result if safe — this is the baseline the receiving team will use</li>
              <li><strong>Pupillary assessment</strong>: the single most useful in-transit neuro sign. Check every 15 min and on any deterioration. New unilateral dilated unreactive pupil = uncal herniation until proven otherwise → osmotherapy, hyperventilate transiently to PaCO₂ 4.0–4.5 kPa, alert neurosurgeons. Quantitative pupillometry (NPi) increasingly used where available</li>
              <li><strong>Invasive ICP / EVD</strong>: if monitor in situ, transduce continuously, zero at the tragus, target ICP &lt;22 mmHg and CPP 60–70 mmHg. EVD: clamp before any change in patient height (lift, ramp) to avoid over-drainage; document open/closed status, drainage volume and CSF appearance</li>
              <li><strong>Arterial line</strong>: mandatory for any neuro transfer — beat-to-beat MAP for CPP calculation, repeated ABGs for PaCO₂/PaO₂. Re-zero at the tragus after every position change</li>
              <li><strong>Continuous capnography</strong>: surrogate for PaCO₂; remember the ETCO₂–PaCO₂ gradient widens with shock, PE, and altitude. Cross-check with ABG at 30 min intervals or after any major event</li>
              <li><strong>Brain tissue oxygen / NIRS / jugular bulb</strong>: not routine in transit, but if already in place continue and document trends. Falling PbtO₂ or SjvO₂ &lt;55% suggests inadequate cerebral oxygen delivery</li>
              <li><strong>Processed EEG / BIS</strong>: useful when paralysed to titrate sedation depth and detect non-convulsive seizures; vibration and electrical noise produce frequent artefact — interpret with caution</li>
              <li><strong>Glucose, sodium, temperature</strong>: hourly point-of-care glucose, Na (i-STAT or equivalent), continuous core temperature — all act as 'metabolic neuromonitors'</li>
            </ul>
          </ExamSection>

          <ExamSection id="neuroprotection-strategies" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.6"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Neuroprotection Strategies in Transit</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Neuroprotection is the active prevention of secondary brain injury. The mantra is
              <em> avoid hypoxia, hypotension, hypercarbia, hyperthermia, hyperglycaemia and hyponatraemia</em>.
              Every parameter that drifts in transit costs neurones.
            </p>
            <div className="space-y-3">
              {[
                { goal: "Oxygenation", target: "SpO₂ ≥96%, PaO₂ >13 kPa", strategy: "Pre-oxygenate before any disconnection; FiO₂ titrated to target; recruit before move; PEEP maintained" },
                { goal: "Ventilation", target: "PaCO₂ 4.5–5.0 kPa (35–38 mmHg)", strategy: "Continuous capnography with PaCO₂ cross-check; avoid prophylactic hyperventilation; transient hyperventilation to 4.0–4.5 kPa only as a bridge to definitive treatment of herniation" },
                { goal: "Cerebral perfusion", target: "MAP ≥80 mmHg, CPP 60–70 mmHg", strategy: "Arterial line zeroed at tragus; noradrenaline infusion ready; treat hypotension early with fluid + vasopressor; avoid CPP >70 mmHg (ARDS risk)" },
                { goal: "ICP control", target: "ICP <22 mmHg", strategy: "Head-up 30°, neutral neck, loose tube ties, deep sedation ± paralysis, osmotherapy (mannitol 0.5–1 g/kg or 3% saline 250 mL) for surges" },
                { goal: "Temperature", target: "36.0–37.0 °C (avoid >37.5 °C)", strategy: "Active surface warming or cooling; paracetamol 1 g for pyrexia; document core temp; targeted temperature management continued if started" },
                { goal: "Glucose", target: "6–10 mmol/L", strategy: "Hourly capillary glucose; insulin infusion if >10; treat hypoglycaemia immediately with 10% dextrose bolus" },
                { goal: "Sodium / osmolality", target: "Na 140–145 mmol/L", strategy: "Avoid hypotonic fluids and 5% dextrose; 0.9% saline as default crystalloid; hypertonic saline if Na <135 with cerebral oedema" },
                { goal: "Seizure control", target: "No clinical or electrographic seizures", strategy: "Continue loading dose of levetiracetam/phenytoin pre-departure if at risk; benzodiazepine + propofol bolus for breakthrough seizures" },
                { goal: "Venous drainage", target: "Unobstructed cerebral venous outflow", strategy: "Loosen ETT ties, avoid neck flexion/rotation, head-up tilt; cervical collar opened to allow venous return once spine cleared" },
              ].map(item => (
                <div key={item.goal} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.goal} <span className="font-normal text-muted-foreground">— target: {item.target}</span></p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.strategy}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic mt-3">
              Spinal cord injury: maintain MAP ≥85–90 mmHg for 7 days; full spinal precautions (collar, blocks, log-roll); avoid suxamethonium &gt;48 h after injury (hyperkalaemia).
            </p>
          </ExamSection>

          <ExamSection id="in-transit" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">In-Transit Emergencies</h2>
            <div className="space-y-3">
              {[
                { problem: "Sudden desaturation", action: "DOPES — Displaced tube? Obstruction (suction)? Pneumothorax (re-examine, needle decompression if tension)? Equipment (disconnect, hand-ventilate with self-inflating bag on 100% O₂)? Stacking (disconnect, allow exhalation)." },
                { problem: "Hypotension", action: "Stop the vehicle if safe (transducer artefact from acceleration). Re-zero arterial line, fluid bolus, push-dose pressor, exclude tension pneumothorax, occult bleeding, sedation overdose." },
                { problem: "Loss of ETCO₂ trace", action: "Treat as cardiac arrest until proven otherwise — pulse check, hand-ventilate, exclude disconnection, extubation or circuit obstruction." },
                { problem: "Accidental extubation", action: "Bag-mask ventilate, stop the vehicle, re-intubate using video laryngoscope from prepared difficult airway kit. Confirm with ETCO₂." },
                { problem: "Seizure / rising ICP", action: "Secure airway, deepen sedation, paralyse, transient hyperventilation to PaCO₂ 4.0–4.5 kPa, give osmotherapy, alert receiving neurosurgical team." },
                { problem: "Equipment / power failure", action: "Self-inflating bag with reservoir + cylinder O₂; manual BP cuff; spare battery / 12 V vehicle inverter; printed drug doses." },
              ].map(item => (
                <div key={item.problem} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.problem}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.action}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="specialist" exams={[Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Specialist Transfers</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>ECMO retrieval</strong>: undertaken by regional centres (e.g. UK adult severe respiratory failure service). Cannulation at the referring hospital, then transfer on VV/VA-ECMO. Risks: cannula displacement, circuit air, anticoagulation bleeding</li>
              <li><strong>IABP / mechanical circulatory support</strong>: continue counterpulsation; secure femoral cannula; trigger from ECG/arterial waveform robust to vibration; check battery life and helium reserve</li>
              <li><strong>Burns</strong>: warmed environment, accurate fluid resuscitation (Parkland), consider escharotomy before flight if circumferential</li>
              <li><strong>Obstetric</strong>: left lateral tilt, anticipate delivery en route (pack delivery kit), liaise with receiving obstetric and neonatal teams</li>
              <li><strong>Paediatric</strong>: regional retrieval team (e.g. STRS, NWTS, KIDS); weight-based equipment; thermoregulation paramount</li>
            </ul>
          </ExamSection>

          <ExamSection id="human-factors" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Human Factors, Safety &amp; Governance</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Team safety</strong>: high-visibility clothing, seat belts, safe driving (no 'blue lights' for stable patients — most ambulance crashes occur on emergency response)</li>
              <li><strong>Fatigue &amp; communication</strong>: long transfers degrade vigilance; brief receiving unit before departure and en route; use closed-loop communication</li>
              <li><strong>Cognitive aids</strong>: pre-departure checklist (ICS proforma), drug calculation cards, escalation phone numbers</li>
              <li><strong>Documentation &amp; audit</strong>: every transfer audited for adverse events (hypoxia, hypotension, equipment failure, time delays); feedback to referring and retrieval teams</li>
              <li><strong>Consent &amp; indemnity</strong>: best-interests documentation when patient lacks capacity; medical indemnity for transfers including air/international</li>
            </ul>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Stabilise before you move: airway, ventilation, circulation, neuro and lines secured first — death often follows rushed transfers.",
              "Estimate oxygen need: minute ventilation × FiO₂ × duration × 2 (safety factor).",
              "Drugs: 2× expected infusion duration of sedation, analgesia, paralysis, vasoactive infusions, plus boluses for emergencies.",
              "Aeromedical: gas-filled spaces expand with altitude (Boyle), hypoxia worsens with cabin altitude — vent ETT cuffs with saline, increase FiO₂.",
              "Hand-over with structured tool (SBAR/ATMIST), continuous monitoring throughout, and documented critical-incident review afterwards.",
            ]}
          />
        </>
      }
    />
  );
};

export default TransferMedicineTopic;
