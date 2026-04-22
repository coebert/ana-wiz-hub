import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { transferMedicineQuestions } from "@/data/quizzes";

const objectives = [
  "Apply ICS / AAGBI standards to plan a safe inter-hospital transfer (decision, personnel, equipment)",
  "Stabilise a critically ill patient using an ABCDE-led pre-departure checklist",
  "Calculate oxygen reserve required for transfer and identify when supplies are inadequate",
  "Predict the physiological effects of acceleration, altitude and vibration on the transferred patient",
  "Hand over effectively at the receiving unit (SBAR/ISBAR) with complete documentation",
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
      title="Transfer Medicine"
      subtitle="Pre-departure stabilisation, equipment, and the physiology of transport"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="transfer-medicine"
      topicTitle="Transfer Medicine"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={transferMedicineQuestions}
      sectionExamMapping={{
        objectives: { exams: ["final", "fficm"], curriculumCodes: ["FFICM 2.6", "RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: ["final", "fficm"] },
        keyPoints: { exams: ["final", "fficm"] },
      }}
      sectionSources={{
        objectives: [
          "Intensive Care Society — Guidance on the Transfer of the Critically Ill Adult (4th edition, 2019)",
          "Association of Anaesthetists (AAGBI) — Safer pre-hospital anaesthesia (2017) and Interhospital transfer guidelines (2009, updated 2019)",
          "RCoA 2021 Curriculum — Transfer Medicine (Stage 2 Higher / FFICM 2.6)",
        ],
        workedExamples: [
          "Nathanson MH et al. AAGBI: Safer transfer of patients (2018). Anaesthesia 2019;74:498-507",
          "Droogh JM et al. Inter-hospital transport of critically ill patients: expect surprises. Crit Care 2012;16:R26",
          "Martin TE. Handbook of Patient Transportation, 2nd ed (Cambridge UP) — oxygen calculations and Boyle's law in air transfer",
        ],
        keyPoints: [
          "Warren J et al. Guidelines for the inter- and intrahospital transport of critically ill patients. Crit Care Med 2004;32:256-62",
          "Singh JM et al. Air medical transport: physiological considerations. Anesth Analg 2018 — gas expansion at altitude",
          "Faculty of Pre-Hospital Care (RCSEd) — Pre-hospital emergency anaesthesia consensus (2017)",
        ],
      }}
      keyPoints={[
        "Standard of care during transfer must be at least as good as at referring hospital (ICS/AAGBI)",
        "Secure airway BEFORE transfer if any concern. Chest drains must NEVER be clamped — use Heimlich valve",
        "O₂ calculation: E-cylinder = 680L. Calculate flow × time × 2 safety factor. Always carry spare",
        "Altitude: gas expands (Boyle's law) — ETT cuff, pneumothorax, bowel gas. ↓ PaO₂ at cabin altitude",
        "Minimum monitoring: ECG, SpO₂, ETCO₂, invasive BP, temperature. Battery backup essential",
        "Senior-to-senior decision; transfer team minimum doctor + assistant, both familiar with equipment",
      ]}
      coreConcepts={
        <>
          <ExamSection id="principles" exams={["final", "fficm"]}>
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

          <ExamSection id="abcde" exams={["final", "fficm"]}>
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

          <ExamSection id="equipment" exams={["final", "fficm"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Equipment & Documentation</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Monitoring</strong>: ECG, SpO₂, ETCO₂, invasive BP, temperature — minimum standard. Battery backup essential</li>
              <li><strong>O₂ calculation</strong>: E-cylinder (680L) at 10L/min = 68 min. D-cylinder (340L). Always carry spare</li>
              <li><strong>Drugs</strong>: emergency drugs drawn up and labelled. Adrenaline, atropine, midazolam, propofol, suxamethonium, rocuronium, vasopressors</li>
              <li><strong>Documentation</strong>: transfer form with observations every 15 min, interventions, clinical events. Handover at receiving unit using SBAR/ISBAR</li>
            </ul>
          </ExamSection>

          <ExamSection id="physics" exams={["final", "fficm"]} curriculumCodes={["FFICM 2.6"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Physics of Transport</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Acceleration/deceleration</strong>: affects BP measurement (transducer position relative to heart changes), ↑ ICP risk, equipment movement</li>
              <li><strong>Altitude (air transfer)</strong>: ↓ barometric pressure → gas expansion (Boyle's law). ETT cuff, pneumothorax, bowel gas all expand. ↓ PaO₂ (cabin altitude ~6,000-8,000 ft)</li>
              <li><strong>Vibration</strong>: artefact on monitoring, patient discomfort, equipment damage</li>
              <li><strong>Noise</strong>: makes auscultation impossible — rely on capnography and SpO₂. Communication difficult</li>
            </ul>
          </ExamSection>
        </>
      }
    />
  );
};

export default TransferMedicineTopic;
