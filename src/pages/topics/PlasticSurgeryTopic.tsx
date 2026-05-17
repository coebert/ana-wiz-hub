import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { plasticSurgeryQuestions } from "@/data/quizzes";
import FreeFlaPerfusionDiagram from "@/components/diagrams/FreeFlaPerfusionDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Apply the principles of normotension, normovolaemia and normothermia to optimise free-flap perfusion",
  "Justify avoidance of vasoconstrictors and the role of haemodilution to Hct 30–35%",
  "Plan management of prolonged microsurgery (positioning, temperature, DVT, monitoring)",
  "Tailor anaesthesia for head & neck flaps, DIEP and digital replantation",
  "Outline postoperative anticoagulation and flap-monitoring strategies",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Hypotension during DIEP flap inset",
    scenario:
      "Six hours into a DIEP flap, MAP drops to 55 mmHg with HR 95 and CVP normal. The microvascular team is about to anastomose. What do you do?",
    working:
      "Aim is to restore MAP ≥65 mmHg without vasospasm at the anastomosis.\nAssess preload (stroke-volume variation, passive leg raise) — if fluid-responsive, give a 250 ml crystalloid bolus.\nIf adequately filled, start low-dose noradrenaline (0.02–0.05 µg/kg/min) — preferred over phenylephrine/metaraminol which cause greater microvascular vasoconstriction.\nMaintain Hct 30–35%, core temp >36 °C; lighten anaesthesia if depth is contributing.\nInform surgeons; avoid cold IV fluids, warm room, recheck haemoglobin.",
    answer:
      "Restore preload with a guided fluid bolus, then add low-dose noradrenaline to MAP ≥65 mmHg. Avoid phenylephrine/metaraminol, maintain Hct 30–35% and normothermia, and communicate with the surgical team.",
    cites: ["BJA Educ 2021"],
  },
  {
    title: "Suspected venous flap congestion at 4 hours post-op",
    scenario:
      "A free TRAM flap becomes dusky with brisk capillary refill and a falling implantable Doppler signal at 4 h. What is the priority?",
    working:
      "Picture suggests venous congestion (dusky, brisk refill) — the most common early flap failure mode.\nTime-critical: salvage rates fall sharply after 4–6 h of congestion.\nCall surgeon immediately, prepare theatre for re-exploration; cross-match blood, continue anticoagulation per unit protocol (heparin/aspirin).\nAvoid head-down tilt or tight dressings; loosen sutures at the bedside if instructed.",
    answer:
      "Activate immediate return to theatre for re-exploration of the venous anastomosis. Re-exploration within 1–2 h dramatically improves flap salvage.",
    cites: ["Curr Opin Anaesthesiol 2019"],
  },
];

const PlasticSurgeryTopic = () => {
  return (
    <TopicTemplate
      title="Plastic Surgery & Microsurgery Anaesthesia"
      subtitle="Free flap perfusion, microsurgical principles, prolonged surgery management, and reconstructive anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="plastic-surgery"
      topicTitle="Plastic Surgery & Microsurgery Anaesthesia"
      objectives={objectives}
      diagrams={<FreeFlaPerfusionDiagram />}
      workedExamples={workedExamples}
      quizQuestions={plasticSurgeryQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        diagrams: { exams: [Exam.FINAL] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      keyPoints={[
        { text: "Free-flap surgery demands meticulous haemodynamic management — normotension, normovolaemia, normothermia to optimise flap perfusion", cites: ["BAPRAS 2020"] },
        { text: "Avoid vasopressors where possible; if needed, low-dose noradrenaline preferred over metaraminol/phenylephrine", cites: ["BJA Educ 2021"] },
        { text: "Microsurgery is prolonged (6–12 h+) — anticipate hypothermia, pressure injuries, DVT risk; arterial line and urinary catheter mandatory", cites: ["Curr Opin Anaesthesiol 2019"] },
        { text: "Regional techniques (perforator, pectoralis, TAP) provide analgesia and may improve flap perfusion via sympathetic blockade", cites: ["BAPRAS 2020"] },
        { text: "Haemodilution to Hct 30–35% reduces blood viscosity and improves microcirculatory flow through anastomosed vessels", cites: ["BJA Educ 2021"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="principles" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Free Flap Surgery — Anaesthetic Principles" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Free tissue transfer involves harvesting a composite tissue flap (skin, muscle, bone) with its vascular pedicle and anastomosing it to recipient vessels at the defect site. Flap survival depends on <strong className="text-foreground">microvascular patency</strong>, influenced by haemodynamics, temperature, coagulation, and vasoactive drugs.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Optimising Flap Perfusion</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Normotension</strong> — MAP ≥65 mmHg; avoid hypotension across the anastomosis</li>
                <li><strong className="text-foreground">Normovolaemia</strong> — goal-directed fluid therapy; both hypo- and hypervolaemia impair flap perfusion</li>
                <li><strong className="text-foreground">Normothermia</strong> — core temp &gt;36 °C; hypothermia causes vasoconstriction, platelet dysfunction, coagulopathy</li>
                <li><strong className="text-foreground">Haemodilution</strong> — Hct 30–35% reduces viscosity and improves microcirculatory flow</li>
                <li><strong className="text-foreground">Avoid vasoconstrictors</strong> — phenylephrine and metaraminol cause flap vasospasm; low-dose noradrenaline preferred</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="prolonged-surgery" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Management of Prolonged Surgery">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Microsurgery and reconstructive cases routinely last 6–12+ hours. Careful planning mitigates complications of prolonged anaesthesia.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Key Considerations</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Temperature</strong> — forced-air warming, warmed fluids, theatre temp ≥23 °C</li>
                <li><strong className="text-foreground">Positioning</strong> — meticulous pressure-area care, gel pads, recheck pressure points q2h</li>
                <li><strong className="text-foreground">DVT prophylaxis</strong> — IPCs; pharmacological VTE prophylaxis balanced against surgical haemostasis</li>
                <li><strong className="text-foreground">Monitoring</strong> — arterial line, urinary catheter, core temperature; consider cardiac output monitoring for major cases</li>
                <li><strong className="text-foreground">Fluid balance</strong> — careful crystalloid (≈1–2 ml/kg/h maintenance); avoid overload (tissue oedema, flap congestion)</li>
                <li><strong className="text-foreground">Analgesia</strong> — multimodal; regional techniques (perforator, TAP, pectoralis blocks) reduce opioid requirements</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="specific-procedures" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Specific Reconstructive Procedures">
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Head & Neck Free Flaps</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Common after oncological resection — fibula, radial forearm, anterolateral thigh (ALT) flaps</li>
                <li>Shared airway — nasal/submental intubation, or tracheostomy may be required</li>
                <li>Risk of <strong className="text-foreground">venous congestion</strong> from head-down tilt or neck positioning; avoid tight ties around the neck</li>
                <li>Postoperative airway: plan for delayed extubation or tracheostomy; tongue/floor-of-mouth reconstruction may compromise the airway</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Breast Reconstruction (DIEP Flap)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Deep inferior epigastric perforator flap — microsurgical transfer of abdominal tissue to the chest</li>
                <li>Duration 4–8 hours; two surgical teams often work simultaneously</li>
                <li>Avoid abdominal muscle relaxation during perforator dissection (surgeon preference varies)</li>
                <li>TAP block or rectus sheath block provides excellent donor-site analgesia</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Digital Replantation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Brachial plexus block provides surgical anaesthesia AND sympathetic blockade (improves digital perfusion)</li>
                <li>Warm ischaemia time: digits tolerate up to 12 h; major limbs 6 h</li>
                <li>Postoperative: heparin infusion, warm environment, avoid caffeine/nicotine, regular flap observations</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="anticoagulation" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Anticoagulation & Flap Monitoring">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Postoperative anticoagulation protocols vary by institution but commonly include:
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Aspirin</strong> — 75–150 mg daily; inhibits platelet aggregation at the anastomosis</li>
                <li><strong className="text-foreground">LMWH</strong> — prophylactic or therapeutic dose depending on unit protocol</li>
                <li><strong className="text-foreground">Dextran 40</strong> — used in some units as a rheological agent (reduces viscosity, inhibits rouleaux); risk of anaphylaxis</li>
                <li><strong className="text-foreground">Flap monitoring</strong> — colour, temperature, capillary refill, turgor; implantable Doppler for buried flaps</li>
                <li>Flap compromise → immediate re-exploration; <strong className="text-foreground">return within 1–2 hours</strong> significantly improves salvage rates</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Free flap perfusion depends on CO, BP, viscosity and afterload — warm, well-filled, vasodilated patient; avoid vasoconstrictors where possible.",
              "Maintain Hb 80–100 g/L (haemodilution improves microcirculation); avoid hypothermia which causes vasospasm.",
              "Long surgery: prevent pressure sores, DVT, hypothermia, eye injury and corneal abrasion.",
              "Avoid N₂O in microsurgery (gas-bubble expansion risk in micro-anastomoses).",
              "Digital replantation success depends on cold ischaemia time — coordinate theatre setup before patient arrival.",
            ]}
          />
        </>
      }
    />
  );
};

export default PlasticSurgeryTopic;
