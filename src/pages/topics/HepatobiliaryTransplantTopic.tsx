import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { hepatobiliaryTransplantQuestions } from "@/data/quizzes";

const HepatobiliaryTransplantTopic = () => {
  return (
    <TopicTemplate
      title="Hepatobiliary & Transplant Anaesthesia"
      subtitle="FRCA Final — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="hepatobiliary-transplant"
      quizQuestions={hepatobiliaryTransplantQuestions}
      objectives={[
        "Plan anaesthesia for laparoscopic cholecystectomy and major liver resection.",
        "Apply the low CVP technique and Pringle manoeuvre during hepatic resection.",
        "Describe the three phases of liver transplantation and their physiological challenges.",
        "Recognise and treat post-reperfusion syndrome.",
        "Adapt anaesthesia for the cirrhotic patient including hepatopulmonary syndrome.",
      ]}
      sectionExamMapping={{
        objectives: { exams: ["final"], curriculumCodes: ["CH_BK_03"] },
        workedExamples: { exams: ["final"] },
        keyPoints: { exams: ["final"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2017 LiverResection", "AAGBI Cirrhosis 2017"],
        workedExamples: ["BJA Educ 2010 LT", "ITLS Reperfusion"],
        keyPoints: ["BJA Educ 2017 LiverResection", "BJA Educ 2010 LT", "AAGBI Cirrhosis 2017"],
      }}
      coreConcepts={
        <>
          <ExamSection exams={["final"]} curriculumCodes={["CH_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Hepatobiliary surgery ranges from laparoscopic cholecystectomy to major liver resection and transplantation. Liver transplant anaesthesia demands expertise in managing coagulopathy, massive transfusion, electrolyte derangement, and haemodynamic instability through the dissection, anhepatic, and reperfusion phases.
            </p>
          </ExamSection>

          <ExamSection exams={["final"]} curriculumCodes={["CH_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Laparoscopic Cholecystectomy</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Most common</strong>: elective general surgical procedure — often day-case</li>
              <li><strong>Pneumoperitoneum</strong>: standard CO₂ effects (↑ PaCO₂, ↑ SVR, vagal stimulation)</li>
              <li><strong>Reverse Trendelenburg</strong>: head-up positioning → ↓ preload, ↓ venous return</li>
              <li><strong>Analgesia</strong>: port-site LA infiltration, paracetamol, NSAID, low-dose opioid; consider TAP block</li>
              <li><strong>PONV</strong>: high-risk procedure — multimodal antiemesis (ondansetron + dexamethasone ± cyclizine)</li>
              <li><strong>Bile duct injury</strong>: rare but serious — may require conversion to open; prolonged operation</li>
            </ul>
          </ExamSection>

          <ExamSection exams={["final"]} curriculumCodes={["CH_BK_03"]}>
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
          </ExamSection>

          <ExamSection exams={["final"]} curriculumCodes={["CH_BK_03"]}>
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
          </ExamSection>

          <ExamSection exams={["final"]} curriculumCodes={["CH_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthesia for the Cirrhotic Patient</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Cardiovascular</strong>: hyperdynamic circulation (↑ CO, ↓ SVR), cardiomyopathy of cirrhosis</li>
              <li><strong>Respiratory</strong>: hepatopulmonary syndrome (intrapulmonary shunting → hypoxia), portopulmonary hypertension</li>
              <li><strong>Coagulation</strong>: ↓ factors, ↓ platelets (hypersplenism), ↑ fibrinolysis — but also ↓ anticoagulants (rebalanced haemostasis)</li>
              <li><strong>Pharmacology</strong>: ↓ albumin → ↑ free drug fraction; ↓ hepatic clearance; ↓ pseudocholinesterase; prolonged drug effects</li>
              <li><strong>Renal</strong>: hepatorenal syndrome risk — avoid nephrotoxins, maintain perfusion pressure</li>
              <li><strong>Ascites</strong>: ↑ IAP → ↓ FRC; RSI may be indicated if tense ascites</li>
            </ul>
          </ExamSection>
        </>
      }
      workedExamples={[
        {
          title: "Managing post-reperfusion syndrome",
          scenario: "Within 2 min of unclamping the donor liver, MAP falls from 75 to 45 mmHg, K⁺ jumps to 6.4 mmol/L, pH 7.18 with broad QRS on ECG.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Recognise <strong>post-reperfusion syndrome</strong> + hyperkalaemic cardiotoxicity.</li>
                <li>Membrane stabilisation: <strong>10 mL 10% calcium chloride</strong> (or 30 mL Ca gluconate via large vein) IV stat.</li>
                <li>Drive K⁺ intracellularly: <strong>insulin 10 U + 50 mL 50% glucose</strong>, plus <strong>50 mmol NaHCO₃</strong> for acidosis.</li>
                <li>Restore MAP: noradrenaline bolus 10–20 mcg + infusion; titrate adrenaline if myocardial depression.</li>
                <li>Anticipate fibrinolysis — send TEG/ROTEM, give tranexamic acid 1 g if EXTEM ML &gt;15%.</li>
                <li>Re-warm; continue volume optimisation guided by SV/PPV; communicate with surgeon for graft assessment.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Bolus phenylephrine alone won't fix the hyperkalaemic arrest — treat K⁺ first.</li>
                  <li>Forgetting calcium when transfusing rapidly (citrate chelates Ca²⁺).</li>
                  <li>Withholding bicarbonate when severe acidosis worsens hyperkalaemia.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Calcium → insulin/dextrose + bicarbonate → vasopressor support; treat fibrinolysis with TXA if needed.",
        },
      ]}
      keyPoints={[
        "Low CVP technique (<5 cmH₂O) reduces blood loss during liver resection",
        "Pringle manoeuvre: clamp hepatoduodenal ligament — limit to 15-20 min ischaemia time",
        "Post-reperfusion syndrome: ↓ MAP >30%, hyperkalaemia, acidosis within 5 min of unclamping",
        "Cirrhotic patients: hyperdynamic circulation, rebalanced haemostasis, hepatopulmonary syndrome",
        "Anhepatic phase: no hepatic metabolism — citrate/drug accumulation, worsening acidosis",
      ]}
    />
  );
};

export default HepatobiliaryTransplantTopic;
