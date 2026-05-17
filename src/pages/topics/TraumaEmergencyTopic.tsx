import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { traumaEmergencyQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

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
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step RSI plan</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Resuscitate before you intubate.</strong> Activate MHP, give 1 g TXA IV (CRASH-2 window: within 3 h), start 1:1:1 product through a rapid infuser.</li>
          <li><strong>Pre-oxygenate while preparing.</strong> 3 min tidal-volume O₂ at 15 L/min; head-up 20° if BP allows; apnoeic oxygenation via nasal cannula 15 L/min.</li>
          <li><strong>Choose induction agent.</strong> Ketamine <strong>1–2 mg/kg IV</strong> (preserves SVR, bronchodilator). Reduce to 0.5–1 mg/kg if obtunded. Avoid propofol/thiopentone — drop SVR catastrophically in shock.</li>
          <li><strong>Choose neuromuscular blocker.</strong> Rocuronium <strong>1.2 mg/kg</strong> (rapid, no IOP/ICP rise, sugammadex 16 mg/kg available for failed intubation).</li>
          <li><strong>Manage the C-spine.</strong> Manual in-line stabilisation with the front of the collar removed. Cricoid pressure remains controversial — release if it impairs the laryngoscopy view.</li>
          <li><strong>Plan A → B → C.</strong> Videolaryngoscope first attempt; second-generation SAD ready; FONA kit open on the trolley.</li>
          <li><strong>Vasopressor on the syringe.</strong> Push-dose metaraminol 0.5 mg or noradrenaline infusion ready to run before laryngoscopy.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points</p>
        <ul className="list-disc list-inside space-y-1">
          <li>If isolated TBI: keep MAP ≥ 80 mmHg (CPP) — permissive hypotension does NOT apply.</li>
          <li>If suxamethonium chosen: avoid in crush injury &gt; 24 h, burns &gt; 24 h, spinal cord injury &gt; 72 h (hyperkalaemia).</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Standard induction doses in a shocked patient → cardiovascular arrest on induction.</li>
            <li>Forgetting to give TXA in the first 3 hours (mortality benefit is time-dependent — harm if given &gt; 3 h).</li>
            <li>Excessive crystalloid before product → dilutional coagulopathy and worsened bleeding.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Ketamine + rocuronium RSI with manual in-line stabilisation, videolaryngoscope, and vasopressor on the syringe. Run damage-control resuscitation in parallel: 1:1:1 products, TXA within 3 h, permissive hypotension (SBP target 80–90 mmHg, except in TBI where MAP ≥ 80). Anticipate haemodynamic collapse on induction.",
    cites: ["CRASH-2"],
  },
  {
    title: "Citrate toxicity during massive transfusion",
    scenario:
      "Mid-laparotomy a patient has received 10 units of PRBC, 8 units of FFP and 2 pools of platelets. ABG: pH 7.18, ionised Ca²⁺ 0.78 mmol/L, K⁺ 5.9 mmol/L, lactate 8. The arterial line trace shows pulsus alternans. What's happening and what do you do?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step interpretation</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Recognise the pattern.</strong> Massive transfusion + ↓ iCa²⁺ (&lt; 0.9) + ↑ K⁺ + acidosis + impaired contractility = <strong>citrate toxicity</strong>.</li>
          <li><strong>Mechanism.</strong> Stored blood contains citrate (anticoagulant). Citrate chelates ionised Ca²⁺. Hepatic hypoperfusion in shock prevents normal citrate metabolism → it accumulates.</li>
          <li><strong>Treat ↓ iCa²⁺ now.</strong> 10 mL of 10% calcium chloride IV (= 6.8 mmol Ca²⁺) OR 30 mL of 10% calcium gluconate (= 6.6 mmol Ca²⁺). CaCl₂ delivers 3× more elemental calcium per mL but is more vesicant — central line preferred.</li>
          <li><strong>Treat hyperkalaemia.</strong> 10 units soluble insulin in 100 mL 20% dextrose ± 5 mg salbutamol nebuliser; the calcium just given also stabilises the myocardium.</li>
          <li><strong>Address the lethal triad.</strong> Active warming (Bair Hugger + warmed fluids); correct acidosis by restoring perfusion (not bicarbonate); ROTEM/TEG to guide further FFP/cryo/platelets.</li>
          <li><strong>Repeat ABG every 30 min</strong> during ongoing MHP — iCa²⁺ &gt; 1.0, K⁺ &lt; 5.5, pH &gt; 7.25, temp &gt; 36 °C.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Cryoprecipitate if fibrinogen &lt; 1.5 g/L (or ROTEM FIBTEM A5 &lt; 10 mm).</li>
          <li>Stop platelets if count &gt; 100 unless ongoing surgical bleeding.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Reading the <em>total</em> calcium instead of <em>ionised</em> — only iCa²⁺ matters during transfusion.</li>
            <li>Giving CaCl₂ peripherally → tissue necrosis if extravasates.</li>
            <li>Reaching for bicarbonate to 'correct' the acidosis — worsens iCa²⁺ and shifts O₂ dissociation curve left.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Treat citrate toxicity: 10% calcium chloride 10 mL IV (or calcium gluconate 30 mL). Continue active warming, ROTEM/TEG-guided product replacement, and treat the hyperkalaemia. Send repeat iCa²⁺ every 30 min during ongoing transfusion — citrate is the silent killer in MHP scenarios.",
    cites: ["ATLS 10th ed"],
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
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Final — Trauma & Stabilisation", "FFICM 2.5"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "ATLS 10th ed",
          "ATLS 10th ed",
          "ATLS 10th ed",
        ],
        workedExamples: [
          "CRASH-2",
          "BJA Educ 2016",
          "BJA Educ 2016",
          "BJA Educ 2016",
        ],
        keyPoints: [
          "BJA Educ 2016",
          "BJA Educ 2016",
          "BJA Educ 2016",
        ],
      }}
      keyPoints={[
        { text: "RSI: pre-oxygenation, rapid induction, no ventilation (unless desaturation), rapid intubation", cites: ["BJA Educ 2016"] },
        { text: "Damage control: permissive hypotension (except TBI), 1:1:1 ratio, TXA within 3 hours", cites: ["CRASH-2"] },
        { text: "The lethal triad: hypothermia, acidosis, coagulopathy — prevent all three", cites: ["ATLS 10th ed"] },
        { text: "Ketamine is the induction agent of choice in haemodynamically unstable patients", cites: ["BJA Educ 2016"] },
        { text: "TEG/ROTEM enables goal-directed transfusion and reduces blood product use", cites: ["CRASH-2"] },
        { text: "Citrate toxicity (↓ iCa²⁺) and hyperkalaemia are the commonest metabolic complications of MHP", cites: ["ATLS 10th ed"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.FINAL, Exam.FFICM]}>
            <p className="text-muted-foreground leading-relaxed">
              Trauma is a leading cause of death in young adults. Anaesthetists play a key role in airway management, resuscitation,
              and perioperative care. The ATLS &lt;C&gt;ABCDE approach, damage control resuscitation, and massive transfusion protocols
              are fundamental.
            </p>
          </ExamSection>

          <ExamSection id="rsi" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Trauma & Stabilisation"]}>
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

          <ExamSection id="damage-control" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.5"]}>
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

          <ExamSection id="mtp" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Massive Transfusion Protocol</h2>
            <p className="text-muted-foreground leading-relaxed">
              Activated when anticipated need for ≥10 units PRBC in 24h or &gt;4 units in 1 hour. Trigger: uncontrolled haemorrhage,
              haemodynamic instability despite fluids, or anticipated major blood loss. Emergency O-negative blood should be available
              within minutes. Monitor for complications: hyperkalaemia, hypocalcaemia (citrate toxicity), hypothermia, TRALI, TACO.
            </p>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Damage-control resuscitation: permissive hypotension (SBP ~80–90 mmHg until haemorrhage controlled, except in TBI), 1:1:1 blood products, tranexamic acid within 3 h.",
              "ATLS A-B-C-D-E with simultaneous resuscitation; reassess after every intervention.",
              "Massive transfusion protocol: activate early — fixed-ratio products, calcium replacement, fibrinogen >2 g/L, avoid hypothermia and acidosis.",
              "Traumatic brain injury: avoid hypoxia, hypotension and hypercapnia; target SBP >110 mmHg, SpO₂ >94%, PaCO₂ 4.5–5.0 kPa.",
              "Tension pneumothorax is a clinical diagnosis — decompress before imaging.",
            ]}
          />
        </>
      }
    />
  );
};

export default TraumaEmergencyTopic;
