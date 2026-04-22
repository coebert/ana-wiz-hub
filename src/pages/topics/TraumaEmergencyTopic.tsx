import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { traumaEmergencyQuestions } from "@/data/quizzes";

const objectives = [
  "Perform an RSI tailored to the trauma patient (haemodynamic state, c-spine, full stomach)",
  "Apply the principles of damage-control resuscitation to a haemorrhaging patient",
  "Activate and run a major haemorrhage / massive transfusion protocol with appropriate ratios",
  "Recognise and treat the lethal triad of hypothermia, acidosis and coagulopathy",
  "Identify complications of massive transfusion (hyperkalaemia, hypocalcaemia, TRALI, TACO)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Choosing an induction agent for unstable polytrauma",
    scenario:
      "A 25-year-old motorcyclist arrives with HR 130, SBP 80 mmHg, GCS 9, suspected splenic rupture and a likely C-spine injury. Theatre is ready. Plan the RSI.",
    working:
      "Pre-oxygenation 3 min while resuscitating with 1:1:1 product through a rapid infuser; activate MHP; TXA 1 g IV (within 3 h CRASH-2 window).\nInduction: ketamine 1–2 mg/kg IV (preserves SVR, bronchodilator) — avoid propofol/thiopentone in shock. Reduce dose if obtunded.\nParalysis: rocuronium 1.2 mg/kg (rapid, no IOP/ICP rise; sugammadex available).\nManual in-line stabilisation; cricoid pressure (controversial — release if it impairs view).\nVideolaryngoscope first attempt; vasopressor (metaraminol/noradrenaline) immediately available.",
    answer:
      "Ketamine + rocuronium RSI with manual in-line stabilisation, videolaryngoscope, and vasopressor on the syringe. Run damage-control resuscitation in parallel: 1:1:1 products, TXA within 3 h, permissive hypotension (SBP target 80–90 mmHg, except in TBI where MAP ≥ 80). Anticipate haemodynamic collapse on induction.",
  },
  {
    title: "Citrate toxicity during massive transfusion",
    scenario:
      "Mid-laparotomy a patient has received 10 units of PRBC, 8 units of FFP and 2 pools of platelets. ABG: pH 7.18, ionised Ca²⁺ 0.78 mmol/L, K⁺ 5.9 mmol/L, lactate 8. The arterial line trace shows pulsus alternans. What's happening and what do you do?",
    working:
      "Citrate (anticoagulant in stored blood) chelates ionised Ca²⁺. Normally metabolised by the liver but during massive transfusion + hepatic hypoperfusion → citrate toxicity → ↓ iCa²⁺ → impaired contractility, hypotension, prolonged QT.\nHyperkalaemia from haemolysis in stored blood compounds the picture.\nGive 10 mL of 10% calcium chloride IV (or 30 mL calcium gluconate) and recheck iCa²⁺. Treat hyperkalaemia (insulin/dextrose ± salbutamol).",
    answer:
      "Treat citrate toxicity: 10% calcium chloride 10 mL IV (or calcium gluconate 30 mL). Continue active warming, ROTEM/TEG-guided product replacement, and treat the hyperkalaemia. Send repeat iCa²⁺ every 30 min during ongoing transfusion — citrate is the silent killer in MHP scenarios.",
  },
];

const TraumaEmergencyTopic = () => {
  return (
    <TopicTemplate
      title="Trauma & Emergency Anaesthesia"
      subtitle="RSI, damage-control resuscitation, and major haemorrhage management"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="trauma-emergency"
      topicTitle="Trauma & Emergency Anaesthesia"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={traumaEmergencyQuestions}
      sectionExamMapping={{
        objectives: { exams: ["final", "fficm"], curriculumCodes: ["RCoA Final — Trauma & Stabilisation", "FFICM 2.5"] },
        workedExamples: { exams: ["final", "fficm"] },
        keyPoints: { exams: ["final", "fficm"] },
      }}
      sectionSources={{
        workedExamples: [
          "CRASH-2 Trial (Lancet 2010)",
          "NICE NG39 — Major trauma: assessment and initial management",
          "ATLS 10th edition (American College of Surgeons)",
        ],
      }}
      keyPoints={[
        "RSI: pre-oxygenation, rapid induction, no ventilation (unless desaturation), rapid intubation",
        "Damage control: permissive hypotension (except TBI), 1:1:1 ratio, TXA within 3 hours",
        "The lethal triad: hypothermia, acidosis, coagulopathy — prevent all three",
        "Ketamine is the induction agent of choice in haemodynamically unstable patients",
        "TEG/ROTEM enables goal-directed transfusion and reduces blood product use",
        "Citrate toxicity (↓ iCa²⁺) and hyperkalaemia are the commonest metabolic complications of MHP",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={["final", "fficm"]}>
            <p className="text-muted-foreground leading-relaxed">
              Trauma is a leading cause of death in young adults. Anaesthetists play a key role in airway management, resuscitation,
              and perioperative care. The ATLS &lt;C&gt;ABCDE approach, damage control resuscitation, and massive transfusion protocols
              are fundamental.
            </p>
          </ExamSection>

          <ExamSection id="rsi" exams={["final", "fficm"]} curriculumCodes={["RCoA Final — Trauma & Stabilisation"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Rapid Sequence Induction (RSI)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              RSI is indicated when the patient is at risk of aspiration (full stomach, bowel obstruction, pregnancy, trauma).
              Key principles:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Pre-oxygenation", value: "3 min tidal breathing or 8 vital capacity breaths with 100% O₂" },
                { label: "Cricoid pressure", value: "30N applied by trained assistant (controversial — may impair laryngoscopy)" },
                { label: "Induction", value: "Ketamine 1-2 mg/kg (haemodynamically unstable) or propofol (if stable)" },
                { label: "Muscle relaxant", value: "Suxamethonium 1-1.5 mg/kg or rocuronium 1.2 mg/kg" },
                { label: "No bag-mask ventilation", value: "Between induction and intubation (unless SpO₂ falls)" },
                { label: "Plan B ready", value: "2nd-gen SAD and FONA equipment immediately available" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="damage-control" exams={["final", "fficm"]} curriculumCodes={["FFICM 2.5"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Damage Control Resuscitation</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Targets the lethal triad of hypothermia, acidosis, and coagulopathy:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Permissive hypotension</strong>: target SBP 80-90 mmHg (except TBI) until surgical haemorrhage control</li>
              <li><strong>Haemostatic resuscitation</strong>: 1:1:1 ratio (PRBC : FFP : platelets)</li>
              <li><strong>Tranexamic acid</strong>: 1g IV within 3 hours of injury (CRASH-2)</li>
              <li><strong>Limit crystalloid</strong>: avoid haemodilution and worsening coagulopathy</li>
              <li><strong>Warm fluids/patient</strong>: active warming to prevent hypothermia</li>
              <li><strong>Point-of-care testing</strong>: TEG/ROTEM to guide targeted blood product therapy</li>
            </ul>
          </ExamSection>

          <ExamSection id="mtp" exams={["final", "fficm"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Massive Transfusion Protocol</h2>
            <p className="text-muted-foreground leading-relaxed">
              Activated when anticipated need for ≥10 units PRBC in 24h or &gt;4 units in 1 hour. Trigger: uncontrolled haemorrhage,
              haemodynamic instability despite fluids, or anticipated major blood loss. Emergency O-negative blood should be available
              within minutes. Monitor for complications: hyperkalaemia, hypocalcaemia (citrate toxicity), hypothermia, TRALI, TACO.
            </p>
          </ExamSection>
        </>
      }
    />
  );
};

export default TraumaEmergencyTopic;
