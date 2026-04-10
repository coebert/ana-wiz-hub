import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { hepaticPhysiologyQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import HepaticAcinusDiagram from "@/components/diagrams/HepaticAcinusDiagram";
import { SeeAlso } from "@/components/SeeAlso";

const HepaticPhysiologyTopic = () => {
  return (
    <SectionLayout title="Hepatic Physiology" subtitle="FRCA Primary & Final — Physiology" backPath="/physiology" backLabel="Physiology" accentColor="text-physiology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            The liver is the largest solid organ, receiving ~25% of cardiac output via a dual blood supply. Its functions — drug metabolism, protein synthesis, bile production, glucose homeostasis, and immune defence — are critical for anaesthetic practice. Hepatic dysfunction profoundly alters pharmacokinetics, coagulation, and perioperative risk.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hepatic Blood Supply</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Total Hepatic Blood Flow", value: "~1500 mL/min (25% of CO)" },
              { label: "Portal Vein", value: "~75% of flow, ~50% of O₂ supply — low-pressure (8-10 mmHg), partially deoxygenated" },
              { label: "Hepatic Artery", value: "~25% of flow, ~50% of O₂ supply — high-pressure, fully oxygenated" },
              { label: "Hepatic Arterial Buffer Response", value: "↓ portal flow → adenosine accumulates → hepatic artery dilates (maintains total flow)" },
              { label: "Hepatic Venous Pressure", value: "~5 mmHg, drains to IVC via hepatic veins" },
              { label: "Anaesthetic Effect", value: "Most anaesthetics ↓ hepatic blood flow 20-30% (↓ CO, ↓ MAP)" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Functional Anatomy — The Liver Lobule</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The functional unit is the hepatic acinus (Rappaport model), divided into three zones based on proximity to the portal triad:
          </p>
          <div className="space-y-3">
            {[
              { zone: "Zone 1 (Periportal)", desc: "Closest to portal triad. Highest O₂ supply. Most active in oxidative metabolism, gluconeogenesis, bile salt excretion, urea synthesis. Most resistant to ischaemia. First affected by viral hepatitis." },
              { zone: "Zone 2 (Intermediate)", desc: "Transitional zone with intermediate metabolic activity." },
              { zone: "Zone 3 (Perivenular/Centrilobular)", desc: "Closest to central vein. Lowest O₂ supply. Dominant in drug metabolism (CYP450), glycolysis, lipogenesis, glutamine synthesis. Most vulnerable to ischaemia and toxic injury (paracetamol, halothane hepatitis)." },
            ].map((z) => (
              <div key={z.zone} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{z.zone}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{z.desc}</p>
              </div>
            ))}
        </div>

        <HepaticAcinusDiagram />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Metabolic Functions</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Carbohydrate</strong>: glycogenesis, glycogenolysis, gluconeogenesis — maintains blood glucose 4-6 mmol/L</li>
            <li><strong>Protein</strong>: synthesises albumin (3.5-5 g/dL, t½ ~20 days), clotting factors (I, II, V, VII, IX, X, XI), complement, acute phase proteins, and plasma cholinesterase</li>
            <li><strong>Lipid</strong>: cholesterol synthesis, lipoprotein production, fatty acid oxidation, bile salt synthesis</li>
            <li><strong>Bilirubin</strong>: conjugation (glucuronidation) of unconjugated bilirubin → water-soluble conjugated bilirubin → excretion in bile</li>
            <li><strong>Ammonia</strong>: converts to urea via the urea cycle (failing in liver failure → hepatic encephalopathy)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Drug Metabolism</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The liver is the primary site of drug metabolism, occurring in two phases:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Phase I (Functionalisation)", value: "Oxidation, reduction, hydrolysis — primarily CYP450 enzymes (Zone 3). Introduces or exposes functional groups. May produce active metabolites." },
              { label: "Phase II (Conjugation)", value: "Glucuronidation, sulphation, acetylation, methylation — increases water solubility for renal excretion. Generally inactivates drugs." },
              { label: "First-Pass Metabolism", value: "Oral drugs absorbed from GI tract pass through liver first. High extraction ratio drugs (propranolol, morphine, lidocaine) have low oral bioavailability." },
              { label: "Extraction Ratio", value: "High ER drugs: metabolism depends on hepatic blood flow. Low ER drugs: metabolism depends on enzyme capacity and protein binding." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Synthetic & Coagulation Function</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Prothrombin time / INR</strong> is the most sensitive marker of synthetic function (Factor VII t½ = 6h)</li>
            <li>Albumin has a long half-life (~20 days) — ↓ albumin reflects chronic liver disease, not acute failure</li>
            <li>Liver synthesises all clotting factors except <strong>Factor VIII</strong> (endothelial) and <strong>vWF</strong></li>
            <li>Also synthesises <strong>antithrombin III</strong>, protein C, and protein S — liver failure is a mixed coagulopathy (not just bleeding risk)</li>
            <li><strong>Thromboelastography (TEG/ROTEM)</strong> gives a global assessment of haemostasis in liver disease</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Liver Function Tests</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Test</th>
                  <th className="text-left py-2 text-foreground font-semibold">Reflects</th>
                  <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ALT</td><td>Hepatocellular damage</td><td>Most specific for liver (cytoplasmic)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">AST</td><td>Hepatocellular damage</td><td>Also in muscle, heart, kidney</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ALP</td><td>Cholestasis / biliary obstruction</td><td>Also bone, placenta, gut</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">GGT</td><td>Cholestasis, enzyme induction</td><td>Elevated by alcohol, phenytoin</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Bilirubin</td><td>Conjugation / excretion</td><td>↑ unconjugated = pre-hepatic; ↑ conjugated = hepatic/post-hepatic</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Albumin</td><td>Synthetic function (chronic)</td><td>t½ ~20 days — slow to change</td></tr>
                <tr><td className="py-2 font-medium text-foreground">PT / INR</td><td>Synthetic function (acute)</td><td>Best acute marker — Factor VII t½ = 6h</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthetic Implications of Liver Disease</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Pharmacokinetics</strong>: ↓ protein binding (↑ free drug), ↓ phase I metabolism, ↑ volume of distribution (ascites/oedema)</li>
            <li><strong>Coagulopathy</strong>: ↓ clotting factors, ↓ platelets (hypersplenism), ↑ fibrinolysis — balanced against ↓ anticoagulants</li>
            <li><strong>Cardiovascular</strong>: hyperdynamic circulation (↑ CO, ↓ SVR), portopulmonary hypertension, hepatopulmonary syndrome</li>
            <li><strong>Renal</strong>: hepatorenal syndrome — functional renal failure from splanchnic vasodilation</li>
            <li><strong>Encephalopathy</strong>: ↑ sensitivity to sedatives and opioids</li>
            <li><strong>Child-Pugh and MELD scores</strong> stratify perioperative risk</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Dual blood supply: portal vein (75% flow) and hepatic artery (25% flow) — each provides ~50% of O₂",
        "Hepatic arterial buffer response: ↓ portal flow → hepatic artery dilates (adenosine-mediated)",
        "Zone 3 (centrilobular) is most vulnerable to ischaemia and toxic injury (CYP450 metabolism here)",
        "PT/INR is the best acute marker of synthetic function (Factor VII t½ = 6h); albumin reflects chronic function",
        "High extraction ratio drugs depend on hepatic blood flow; low ER drugs depend on enzyme capacity",
        "Liver disease creates a rebalanced haemostasis — not simply a bleeding tendency",
      ]} />

      <QuizSection questions={hepaticPhysiologyQuestions} />
      <ReferencesList topicId="hepatic-physiology" />

      <SeeAlso topicId="hepatic-physiology" />
        <TopicCompletionToggle topicId="hepatic-physiology" topicTitle="Hepatic Physiology" />
    </SectionLayout>
  );
};

export default HepaticPhysiologyTopic;
