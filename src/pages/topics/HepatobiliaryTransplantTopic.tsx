import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { hepatobiliaryTransplantQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const HepatobiliaryTransplantTopic = () => {
  return (
    <SectionLayout title="Hepatobiliary & Transplant Anaesthesia" subtitle="FRCA Final — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Hepatobiliary surgery ranges from laparoscopic cholecystectomy (the most common elective operation) to major liver resection and transplantation. Liver transplant anaesthesia demands expertise in managing coagulopathy, massive transfusion, electrolyte derangement, and haemodynamic instability through the dissection, anhepatic, and reperfusion phases.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Laparoscopic Cholecystectomy</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Most common</strong>: elective general surgical procedure — often day-case</li>
            <li><strong>Pneumoperitoneum</strong>: standard CO₂ effects (↑ PaCO₂, ↑ SVR, vagal stimulation)</li>
            <li><strong>Reverse Trendelenburg</strong>: head-up positioning → ↓ preload, ↓ venous return</li>
            <li><strong>Analgesia</strong>: port-site LA infiltration, paracetamol, NSAID, low-dose opioid; consider TAP block</li>
            <li><strong>PONV</strong>: high-risk procedure — multimodal antiemesis (ondansetron + dexamethasone ± cyclizine)</li>
            <li><strong>Bile duct injury</strong>: rare but serious — may require conversion to open; prolonged operation</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Major Liver Resection</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Hepatectomy for primary or secondary liver tumours. The liver's dual blood supply and regenerative capacity allow resection of up to 70% of parenchyma.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Low CVP technique", value: "Target CVP <5 cmH₂O to reduce hepatic venous bleeding — fluid restriction, vasodilators, Trendelenburg avoided" },
              { label: "Pringle manoeuvre", value: "Clamping of hepatoduodenal ligament (portal vein + hepatic artery) — limits 15-20 min to prevent ischaemia" },
              { label: "Blood loss", value: "Potentially massive — crossmatch 6 units, cell salvage, rapid infuser available" },
              { label: "Coagulopathy", value: "Loss of clotting factor synthesis; monitor with TEG/ROTEM; FFP, cryoprecipitate, platelets" },
              { label: "Monitoring", value: "Arterial line, CVC (for CVP target), large-bore IVs, urinary catheter, temperature" },
              { label: "Postoperative", value: "HDU/ICU; risk of hepatic failure, bile leak, haemorrhage; monitor lactate, INR, glucose" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Liver Transplantation — Phases</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Orthotopic liver transplantation proceeds through three distinct phases, each with unique anaesthetic challenges.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/10">
              <h3 className="font-semibold text-foreground text-sm mb-2">Phase 1: Dissection (Pre-anhepatic)</h3>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Mobilisation of native liver — extensive adhesions in cirrhotic patients</li>
                <li>Coagulopathy from portal hypertension and synthetic failure</li>
                <li>Ascites drainage → haemodynamic shifts; massive blood loss possible</li>
                <li>Citrate toxicity from rapid transfusion → hypocalcaemia (monitor iCa²⁺)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/10">
              <h3 className="font-semibold text-foreground text-sm mb-2">Phase 2: Anhepatic</h3>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>IVC clamped (or venovenous bypass used) — ↓↓ preload, ↓ cardiac output</li>
                <li>No hepatic metabolism — accumulation of citrate, lactate, drugs</li>
                <li>Worsening acidosis and hypocalcaemia — correct with bicarbonate and calcium</li>
                <li>Hypothermia — cold donor organ; active warming essential</li>
                <li>Duration 45–90 minutes; haemodynamic support with vasopressors/inotropes</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/10">
              <h3 className="font-semibold text-foreground text-sm mb-2">Phase 3: Reperfusion (Neo-hepatic)</h3>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li><strong>Post-reperfusion syndrome</strong>: ↓ MAP &gt;30% for &gt;1 min within 5 min of reperfusion — cold, acidotic, hyperkalaemic blood from graft</li>
                <li>Hyperkalaemia — potentially fatal; treat with insulin/dextrose, calcium, bicarbonate</li>
                <li>Arrhythmias (including cardiac arrest) — from K⁺ surge and myocardial depression</li>
                <li>Fibrinolysis — graft releases tPA; may need tranexamic acid or antifibrinolytics</li>
                <li>Progressive improvement as graft function recovers — falling lactate, improving coagulation</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthesia for the Cirrhotic Patient</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Cardiovascular</strong>: hyperdynamic circulation (↑ CO, ↓ SVR), cardiomyopathy of cirrhosis</li>
            <li><strong>Respiratory</strong>: hepatopulmonary syndrome (intrapulmonary shunting → hypoxia), portopulmonary hypertension</li>
            <li><strong>Coagulation</strong>: ↓ factors, ↓ platelets (hypersplenism), ↑ fibrinolysis — but also ↓ anticoagulants (rebalanced haemostasis)</li>
            <li><strong>Pharmacology</strong>: ↓ albumin → ↑ free drug fraction; ↓ hepatic clearance; ↓ pseudocholinesterase; prolonged drug effects</li>
            <li><strong>Renal</strong>: hepatorenal syndrome risk — avoid nephrotoxins, maintain perfusion pressure</li>
            <li><strong>Ascites</strong>: ↑ IAP → ↓ FRC; RSI may be indicated if tense ascites</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Low CVP technique (<5 cmH₂O) reduces blood loss during liver resection",
        "Pringle manoeuvre: clamp hepatoduodenal ligament — limit to 15-20 min ischaemia time",
        "Post-reperfusion syndrome: ↓ MAP >30%, hyperkalaemia, acidosis within 5 min of unclamping",
        "Cirrhotic patients: hyperdynamic circulation, rebalanced haemostasis, hepatopulmonary syndrome",
        "Anhepatic phase: no hepatic metabolism — citrate/drug accumulation, worsening acidosis",
      ]} />

      <QuizSection questions={hepatobiliaryTransplantQuestions} />
      <ReferencesList topicId="hepatobiliary-transplant" />
      <SeeAlso topicId="hepatobiliary-transplant" />
        <TopicCompletionToggle topicId="hepatobiliary-transplant" topicTitle="Hepatobiliary & Transplant Anaesthesia" />
    </SectionLayout>
  );
};

export default HepatobiliaryTransplantTopic;
