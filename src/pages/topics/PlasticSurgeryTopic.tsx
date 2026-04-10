import { SectionLayout } from "@/components/SectionLayout";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { ReferencesList } from "@/components/ReferencesList";
import { plasticSurgeryQuestions } from "@/data/quizzes";
import FreeFlaPerfusionDiagram from "@/components/diagrams/FreeFlaPerfusionDiagram";
import { SeeAlso } from "@/components/SeeAlso";

const keyPoints = [
  "Free flap surgery demands meticulous haemodynamic management — maintain normotension, normovolaemia, and normothermia to optimise flap perfusion and avoid vasospasm",
  "Avoid vasopressors where possible as they can cause flap vasospasm; if required, low-dose noradrenaline is preferred over metaraminol or phenylephrine",
  "Microsurgery cases are prolonged (6–12+ hours) — anticipate hypothermia, pressure injuries, DVT risk, and the need for arterial line monitoring and urinary catheterisation",
  "Regional anaesthesia (e.g. perforator blocks, pectoralis blocks) provides excellent analgesia and may improve flap perfusion through sympathetic blockade",
  "Haemodilution to haematocrit 30–35% reduces blood viscosity and improves microcirculatory flow through anastomosed vessels",
];

const PlasticSurgeryTopic = () => {
  return (
    <SectionLayout
      title="Plastic Surgery & Microsurgery Anaesthesia"
      subtitle="Free flap perfusion, microsurgical principles, prolonged surgery management, and reconstructive anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
    >
      <div className="space-y-8">
        <KeyLearningPoints points={keyPoints} />
        <FreeFlaPerfusionDiagram />

        {/* Free Flap Principles */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Free Flap Surgery — Anaesthetic Principles</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Free tissue transfer involves harvesting a composite tissue flap (skin, muscle, bone) with its vascular pedicle and anastomosing it to recipient vessels at the defect site. Flap survival depends on <strong className="text-foreground">microvascular patency</strong>, which is influenced by haemodynamics, temperature, coagulation, and vasoactive drugs.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Optimising Flap Perfusion</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Normotension</strong> — MAP ≥65 mmHg; avoid hypotension which reduces perfusion pressure across the anastomosis</li>
                <li><strong className="text-foreground">Normovolaemia</strong> — goal-directed fluid therapy; both hypo- and hypervolaemia impair flap perfusion</li>
                <li><strong className="text-foreground">Normothermia</strong> — core temp &gt;36°C; hypothermia causes vasoconstriction, platelet dysfunction, and coagulopathy</li>
                <li><strong className="text-foreground">Haemodilution</strong> — Hct 30–35% reduces viscosity and improves microcirculatory flow</li>
                <li><strong className="text-foreground">Avoid vasoconstrictors</strong> — phenylephrine and metaraminol cause flap vasospasm; low-dose noradrenaline is preferred if needed</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prolonged Surgery Management */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Management of Prolonged Surgery</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Microsurgery and reconstructive cases routinely last 6–12+ hours. Careful planning mitigates complications of prolonged anaesthesia.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Key Considerations</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Temperature</strong> — forced-air warming, warmed fluids, increased theatre temperature (≥23°C)</li>
                <li><strong className="text-foreground">Positioning</strong> — meticulous pressure area care, gel pads, check all pressure points q2h if possible</li>
                <li><strong className="text-foreground">DVT prophylaxis</strong> — intermittent pneumatic compression devices; pharmacological thromboprophylaxis balanced against surgical haemostasis</li>
                <li><strong className="text-foreground">Monitoring</strong> — arterial line, urinary catheter, core temperature probe; consider cardiac output monitoring for major cases</li>
                <li><strong className="text-foreground">Fluid balance</strong> — careful fluid administration (crystalloid ≈1–2 ml/kg/h maintenance); avoid fluid overload which causes tissue oedema and flap congestion</li>
                <li><strong className="text-foreground">Analgesia</strong> — multimodal approach; regional techniques (perforator blocks, TAP, pectoralis blocks) reduce opioid requirements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Specific Reconstructive Procedures */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Specific Reconstructive Procedures</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Head & Neck Free Flaps</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Common after oncological resection — fibula, radial forearm, or anterolateral thigh (ALT) flaps</li>
                <li>Shared airway with surgeon — nasal or submental intubation, or tracheostomy may be required</li>
                <li>Risk of <strong className="text-foreground">venous congestion</strong> from head-down tilt or neck positioning; avoid tight ties/tapes around the neck</li>
                <li>Postoperative airway management: plan for delayed extubation or tracheostomy; tongue/floor-of-mouth reconstruction may compromise the airway</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Breast Reconstruction (DIEP Flap)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Deep inferior epigastric perforator flap — microsurgical transfer of abdominal tissue to the chest</li>
                <li>Duration 4–8 hours; two surgical teams often work simultaneously (harvest and preparation)</li>
                <li>Avoid abdominal muscle relaxation during perforator dissection (surgeon preference varies)</li>
                <li>TAP block or rectus sheath block provides excellent donor-site analgesia</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Digital Replantation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Brachial plexus block provides surgical anaesthesia AND sympathetic blockade (improves digital perfusion)</li>
                <li>Warm ischaemia time: digits tolerate up to 12 hours; major limbs 6 hours</li>
                <li>Postoperative: heparin infusion, warm environment, avoid caffeine/nicotine, regular flap observations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Anticoagulation */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anticoagulation & Flap Monitoring</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Postoperative anticoagulation protocols vary by institution but commonly include:
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Aspirin</strong> — 75–150 mg daily; inhibits platelet aggregation at the anastomosis</li>
                <li><strong className="text-foreground">Low-molecular-weight heparin</strong> — prophylactic or therapeutic dose depending on unit protocol</li>
                <li><strong className="text-foreground">Dextran 40</strong> — some units use as a rheological agent (reduces viscosity, inhibits rouleaux formation); risk of anaphylaxis</li>
                <li><strong className="text-foreground">Flap monitoring</strong> — colour, temperature, capillary refill, turgor; implantable Doppler increasingly used for buried flaps</li>
                <li>Flap compromise requires immediate return to theatre — <strong className="text-foreground">re-exploration within 1–2 hours</strong> significantly improves salvage rates</li>
              </ul>
            </div>
          </div>
        </section>

        <QuizSection questions={plasticSurgeryQuestions} />

        <ReferencesList topicId="plastic-surgery" />

        <SeeAlso topicId="plastic-surgery" />
        <TopicCompletionToggle topicId="plastic-surgery" topicTitle="Plastic Surgery & Microsurgery Anaesthesia" />
      </div>
    </SectionLayout>
  );
};

export default PlasticSurgeryTopic;
