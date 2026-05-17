import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { WorkedExample } from "@/components/WorkedExamples";
import { hepaticPhysiologyQuestions } from "@/data/quizzes";
import HepaticAcinusDiagram from "@/components/diagrams/HepaticAcinusDiagram";
import PortalFirstPassDiagram from "@/components/diagrams/PortalFirstPassDiagram";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Describe the dual hepatic blood supply, hepatic arterial buffer response, and the effect of anaesthesia on flow.",
  "Outline the functional anatomy of the hepatic acinus and the metabolic specialisation of zones 1–3.",
  "Summarise the metabolic, synthetic and excretory functions of the liver.",
  "Distinguish phase I and phase II drug metabolism and apply the extraction-ratio concept to clearance.",
  "Interpret liver function tests and understand how liver disease alters anaesthetic management.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "High vs low extraction ratio drugs",
    scenario: (
      <>
        Two drugs are commonly used at induction: propofol (extraction ratio ~0.9) and diazepam (extraction ratio
        ~0.03). A patient has cirrhosis with reduced hepatic blood flow but preserved CYP enzyme capacity. Which drug's
        clearance changes most, and how should you adjust?
      </>
    ),
    working: (
      <>
        Hepatic clearance ≈ Q × E (Q = liver blood flow, E = extraction ratio).
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>High-ER drugs (E → 1)</strong>: clearance is <em>flow-limited</em>. Cl ≈ Q. Reduced hepatic blood
            flow markedly reduces clearance — propofol context-sensitive half-time prolongs.</li>
          <li><strong>Low-ER drugs (E → 0)</strong>: clearance is <em>capacity-limited</em>. Cl depends on enzyme
            activity and free fraction. Cirrhosis ↓ albumin → ↑ free diazepam → ↑ clinical effect even before clearance
            falls.</li>
        </ul>
        Oral high-ER drugs also lose first-pass metabolism in cirrhosis (porto-systemic shunting) → bioavailability rises
        sharply (e.g. oral propranolol).
      </>
    ),
    answer: (
      <>
        Reduce dose and slow administration of high-ER infusions (propofol, lidocaine, remifentanil unaffected because
        it relies on plasma esterases). For low-ER drugs, consider reduced loading dose (↑ free fraction) and titrate
        carefully.
      </>
    ),
   cites: ["BJA Educ 2014"],
  },
  {
    title: "Coagulopathy in chronic liver disease",
    scenario: (
      <>
        A 58-year-old with Child-Pugh B cirrhosis has INR 1.8, platelets 65 × 10⁹/L, fibrinogen 1.6 g/L. Pre-elective
        umbilical hernia repair, the surgeon asks for FFP and platelets. Is this appropriate?
      </>
    ),
    working: (
      <>
        Cirrhosis produces a <strong>rebalanced</strong> haemostasis: pro-coagulant factors (II, VII, IX, X) and
        anticoagulants (protein C, protein S, antithrombin) both fall in parallel. Conventional INR overstates bleeding
        risk because it does not capture the parallel anticoagulant deficit; thrombin generation is often near-normal.
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Empirical FFP for INR &lt;2 in stable cirrhosis is unlikely to reduce bleeding and risks volume overload
            (TACO) and portal pressure rise.</li>
          <li>Platelet target ≥ 50 × 10⁹/L is reasonable for major surgery; consider thrombopoietin agonists
            (avatrombopag/lusutrombopag) electively.</li>
          <li>Fibrinogen &lt;1.5 g/L → cryoprecipitate or fibrinogen concentrate (correct first — most predictive of
            bleeding).</li>
          <li>Use point-of-care viscoelastic testing (TEG/ROTEM) to guide product use and avoid over-transfusion.</li>
        </ul>
      </>
    ),
    answer: (
      <>
        Decline routine FFP. Optimise fibrinogen to ≥1.5 g/L, transfuse platelets only if &lt;50 × 10⁹/L for this
        moderate-risk surgery, and use TEG/ROTEM intra-operatively. Correct vitamin K, treat infection, and tranexamic
        acid where appropriate.
      </>
    ),
   cites: ["Power & Kam Ch.10"],
  },
];

const HepaticPhysiologyTopic = () => {
  return (
    <TopicTemplate
      title="Hepatic Physiology"
      subtitle="FRCA Primary & Final — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="hepatic-physiology"
      topicTitle="Hepatic Physiology"
      quizQuestions={hepaticPhysiologyQuestions}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["CR_BK_06"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["OA_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["Peck & Hill Ch.13"],
        workedExamples: ["BJA Educ 2014", "Power & Kam Ch.10"],
        keyPoints: ["Peck & Hill Ch.13", "BJA Educ 2014", "Power & Kam Ch.10"],
      }}
      keyPoints={[
        { text: "Dual blood supply: portal vein (~75% flow) and hepatic artery (~25% flow); each provides ~50% of O₂.", cites: ["Peck & Hill Ch.13"] },
        { text: "Hepatic arterial buffer response: ↓ portal flow → adenosine accumulates → hepatic artery dilates.", cites: ["Power & Kam Ch.10"] },
        { text: "Zone 3 (centrilobular) is most vulnerable to ischaemia and toxic injury; CYP450 metabolism predominates here.", cites: ["BJA Educ 2014"] },
        { text: "PT/INR is the best acute marker of synthetic function (Factor VII t½ = 6 h); albumin reflects chronic function.", cites: ["Peck & Hill Ch.13"] },
        { text: "High extraction-ratio drugs are flow-dependent; low extraction-ratio drugs are capacity- and protein-binding-dependent.", cites: ["Power & Kam Ch.10"] },
        { text: "Liver disease produces a rebalanced haemostasis — INR alone over-states bleeding risk; use TEG/ROTEM.", cites: ["BJA Educ 2014"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="overview" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Overview" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              The liver is the largest solid organ, receiving ~25% of cardiac output via a dual blood supply. Its
              functions — drug metabolism, protein synthesis, bile production, glucose homeostasis, and immune defence
              — are critical for anaesthetic practice. Hepatic dysfunction profoundly alters pharmacokinetics,
              coagulation, and perioperative risk.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="blood-supply" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Hepatic Blood Supply">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Total Hepatic Blood Flow", value: "~1500 mL/min (25% of CO)." },
                { label: "Portal Vein", value: "~75% of flow, ~50% of O₂ supply — low-pressure (8–10 mmHg), partially deoxygenated." },
                { label: "Hepatic Artery", value: "~25% of flow, ~50% of O₂ supply — high-pressure, fully oxygenated." },
                { label: "Hepatic Arterial Buffer Response", value: "↓ portal flow → adenosine accumulates → hepatic artery dilates (maintains total flow)." },
                { label: "Hepatic Venous Pressure", value: "~5 mmHg, drains to IVC via hepatic veins." },
                { label: "Anaesthetic Effect", value: "Most anaesthetics ↓ hepatic blood flow 20–30% (↓ CO, ↓ MAP, IPPV)." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="acinus" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Functional Anatomy — The Hepatic Acinus">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
              <HepaticAcinusDiagram />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The functional unit is the hepatic acinus (Rappaport model), divided into three zones based on proximity
              to the portal triad:
            </p>
            <div className="space-y-3">
              {[
                { zone: "Zone 1 (Periportal)", desc: "Closest to portal triad. Highest O₂ supply. Most active in oxidative metabolism, gluconeogenesis, bile salt excretion, urea synthesis. Most resistant to ischaemia. First affected by viral hepatitis." },
                { zone: "Zone 2 (Intermediate)", desc: "Transitional zone with intermediate metabolic activity." },
                { zone: "Zone 3 (Perivenular/Centrilobular)", desc: "Closest to central vein. Lowest O₂ supply. Dominant in drug metabolism (CYP450), glycolysis, lipogenesis, glutamine synthesis. Most vulnerable to ischaemia and toxic injury (paracetamol NAPQI, halothane hepatitis)." },
              ].map((z) => (
                <div key={z.zone} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{z.zone}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{z.desc}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="metabolic" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Metabolic Functions">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Carbohydrate</strong>: glycogenesis, glycogenolysis, gluconeogenesis — maintains blood glucose 4–6 mmol/L.</li>
              <li><strong>Protein</strong>: synthesises albumin (3.5–5 g/dL, t½ ~20 days), clotting factors (I, II, V, VII, IX, X, XI), complement, acute-phase proteins, plasma cholinesterase.</li>
              <li><strong>Lipid</strong>: cholesterol synthesis, lipoprotein production, fatty acid oxidation, bile salt synthesis.</li>
              <li><strong>Bilirubin</strong>: conjugation (glucuronidation) of unconjugated bilirubin → water-soluble conjugated bilirubin → excretion in bile.</li>
              <li><strong>Ammonia</strong>: converts to urea via the urea cycle (failing in liver failure → hepatic encephalopathy).</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="drug-metabolism" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Drug Metabolism">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
              <PortalFirstPassDiagram />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The liver is the primary site of drug metabolism, occurring in two phases:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Phase I (Functionalisation)", value: "Oxidation, reduction, hydrolysis — primarily CYP450 enzymes (Zone 3). Introduces or exposes functional groups. May produce active metabolites." },
                { label: "Phase II (Conjugation)", value: "Glucuronidation, sulphation, acetylation, methylation — increases water solubility for renal excretion. Generally inactivates drugs." },
                { label: "First-Pass Metabolism", value: "Oral drugs absorbed from GI tract pass through liver first. High-ER drugs (propranolol, morphine, lidocaine, GTN) have low oral bioavailability." },
                { label: "Extraction Ratio", value: "High ER → flow-dependent clearance. Low ER → capacity- and protein-binding-dependent clearance." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="coagulation" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Synthetic & Coagulation Function">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Prothrombin time / INR</strong> is the most sensitive marker of synthetic function (Factor VII t½ = 6 h).</li>
              <li>Albumin has a long half-life (~20 days) — ↓ albumin reflects chronic liver disease, not acute failure.</li>
              <li>Liver synthesises all clotting factors except <strong>Factor VIII</strong> (endothelial) and <strong>vWF</strong>.</li>
              <li>Also synthesises <strong>antithrombin III</strong>, protein C, and protein S — liver failure is a mixed coagulopathy.</li>
              <li><strong>Thromboelastography (TEG/ROTEM)</strong> gives a global assessment of haemostasis in liver disease.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="lfts" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Liver Function Tests">
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
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ALT</td><td>Hepatocellular damage</td><td>Most specific for liver (cytoplasmic).</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">AST</td><td>Hepatocellular damage</td><td>Also in muscle, heart, kidney.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ALP</td><td>Cholestasis / biliary obstruction</td><td>Also bone, placenta, gut.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">GGT</td><td>Cholestasis, enzyme induction</td><td>Elevated by alcohol, phenytoin.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Bilirubin</td><td>Conjugation / excretion</td><td>↑ unconjugated = pre-hepatic; ↑ conjugated = hepatic/post-hepatic.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Albumin</td><td>Synthetic function (chronic)</td><td>t½ ~20 days — slow to change.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">PT / INR</td><td>Synthetic function (acute)</td><td>Best acute marker — Factor VII t½ = 6 h.</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="anaesthetic-implications" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_05"]}>
            <CollapsibleSubsection title="Anaesthetic Implications of Liver Disease">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Pharmacokinetics</strong>: ↓ protein binding (↑ free drug), ↓ phase I metabolism, ↑ Vd (ascites/oedema).</li>
              <li><strong>Coagulopathy</strong>: ↓ clotting factors, ↓ platelets (hypersplenism), ↑ fibrinolysis — balanced against ↓ anticoagulants.</li>
              <li><strong>Cardiovascular</strong>: hyperdynamic circulation (↑ CO, ↓ SVR), portopulmonary hypertension, hepatopulmonary syndrome.</li>
              <li><strong>Renal</strong>: hepatorenal syndrome — functional renal failure from splanchnic vasodilation.</li>
              <li><strong>Encephalopathy</strong>: ↑ sensitivity to sedatives and opioids — titrate or avoid.</li>
              <li><strong>Child-Pugh</strong> and <strong>MELD</strong> scores stratify perioperative risk.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>Halothane &amp; hepatotoxicity</strong>: rare immune-mediated fulminant hepatitis — avoid repeat exposure within 3 months. Modern volatiles (sevoflurane, desflurane) have much lower risk.</>,
              <><strong>Paracetamol overdose</strong>: NAPQI accumulates in zone 3 once glutathione depletes — N-acetylcysteine within 8 h is gold standard.</>,
              <><strong>Child-Pugh C / MELD &gt;15</strong>: high perioperative mortality — defer elective surgery, optimise where possible.</>,
              <><strong>INR is unreliable</strong> in chronic liver disease — rebalanced haemostasis means TEG/ROTEM-guided product replacement is preferred.</>,
              <><strong>Hepatorenal syndrome</strong>: avoid nephrotoxins (NSAIDs, aminoglycosides, contrast) and treat with terlipressin + albumin.</>,
            ]}
          />
        </>
      }
    />
  );
};

export default HepaticPhysiologyTopic;
