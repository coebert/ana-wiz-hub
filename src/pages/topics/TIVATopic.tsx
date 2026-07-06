import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ExamSection } from "@/components/exam/ExamSection";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import TCISimulatorDiagram from "@/components/diagrams/clinical/TCISimulatorDiagram";
import CSHTDiagram from "@/components/diagrams/clinical/CSHTDiagram";
import DecrementTimeDiagram from "@/components/diagrams/clinical/DecrementTimeDiagram";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { tivaQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";

const objectives = [
  "Describe 3-compartment mammillary PK models and the role of V1, V2, V3, k10 and ke0",
  "Compare Marsh, Schnider, Eleveld and Minto TCI models and their patient covariates",
  "Distinguish plasma (Cp) vs effect-site (Ce) targeting and the implications of ke0",
  "Apply CSHT and decrement times to predict recovery after propofol/remifentanil infusion",
  "Recognise and prevent propofol infusion syndrome (PRIS)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Selecting a TCI model for a 78-year-old, 60 kg patient",
    scenario:
      "An elderly 78-year-old, 60 kg, 165 cm woman is listed for a 90-minute laparotomy. Why is Schnider preferred to Marsh, and what initial targets would you choose?",
    working:
      "Marsh is weight-only and would scale V1 with TBW (V1 = 0.228 × 60 = 13.7 L) — same effective dose as a young 60 kg adult, ignoring her reduced clearance.\nSchnider uses age, weight, height and LBM, with V1 fixed at 4.27 L → smaller induction overshoot in Ce mode and clearance reduced for age. Safer haemodynamics in the elderly.\nStart Schnider Ce 2.5–3 µg/ml propofol + Minto Ce 2–3 ng/ml remifentanil, titrate to BIS 40–60 and MAP. Reduce by ~30% vs young adult.",
    answer:
      "Use Schnider Ce-targeted propofol at Ce 2.5–3 µg/ml + Minto Ce 2–3 ng/ml remifentanil, titrated to BIS 40–60 — Schnider accounts for age and avoids the V1 over-dosing seen with Marsh in the elderly.",
    cites: ["Schnider 1998"],
  },
  {
    title: "Predicting wake-up after a long propofol infusion",
    scenario:
      "After an 8-hour propofol-remifentanil TIVA, you stop the infusions. How long until the patient wakes, and which drug determines this?",
    working:
      "Remifentanil CSHT ≈ 3–4 min regardless of duration (ester hydrolysis) — Ce halves within minutes; not rate-limiting.\nPropofol CSHT rises with infusion duration — ~10 min at 1 h, ~25–30 min at 4 h, ~40 min at 8 h (V3 saturation).\nWake-up therefore depends on propofol decrement time from maintenance Ce (~3 µg/ml) to wake threshold (~1.0–1.2 µg/ml) — typically 15–25 min after 8 h.\nGive transitional analgesia (paracetamol, regional, long-acting opioid) BEFORE stopping remifentanil to avoid hyperalgesic emergence.",
    answer:
      "Wake within ~15–25 min, rate-limited by propofol decrement (CSHT ~40 min at 8 h). Always give a transitional analgesic before stopping remifentanil.",
    cites: ["BJA Educ 2016"],
  },
];

const tocItems = [
  { id: "intro", label: "Introduction", group: "Core" },
  { id: "models", label: "PK Compartment Models", group: "Core" },
  { id: "cp-ce", label: "Cp vs Ce Targeting", group: "Core" },
  { id: "model-explorer", label: "TCI Model Explorer", group: "Models" },
  { id: "marsh-vs-schnider", label: "Marsh vs Schnider", group: "Models" },
  { id: "recovery", label: "CSHT & Decrement Times", group: "Recovery" },
  { id: "practical", label: "Practical TIVA Setup", group: "Clinical" },
  { id: "pris", label: "Propofol Infusion Syndrome", group: "Clinical" },
  { id: "special-pops", label: "Special Populations", group: "Clinical" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const tivaFaqs: Array<[string, string]> = [
  [
    "What is the difference between TIVA and TCI?",
    "TIVA (total intravenous anaesthesia) is the technique of using intravenous agents exclusively to induce and maintain anaesthesia, avoiding volatile agents. TCI (target-controlled infusion) is a delivery method used during TIVA — a microprocessor-controlled pump uses pharmacokinetic models to calculate infusion rates that achieve and maintain a user-defined target drug concentration. TIVA can be performed without TCI (manual infusion regimens), but TCI provides more precise and titratable drug delivery.",
  ],
  [
    "When should I use plasma (Cp) vs effect-site (Ce) targeting?",
    "Plasma targeting achieves the target Cp rapidly, but the effect-site concentration (Ce) lags behind — there is a delay before clinical effect. This mode requires a higher initial Cp target and waiting for equilibration. Effect-site targeting transiently overshoots Cp above the target to drive drug into the effect site faster, resulting in faster onset of clinical effect. Modern practice prefers Ce targeting because it is more intuitive — you target the concentration that produces the clinical effect. However, Ce targeting produces a larger initial Cp overshoot with models that have a low ke0 (e.g., Marsh ke0 0.26 min⁻¹), which can cause more haemodynamic instability. Schnider (ke0 0.456 min⁻¹) has faster equilibration and a smaller overshoot, making it the preferred model for Ce targeting.",
  ],
  [
    "Why is Schnider preferred over Marsh in elderly patients?",
    "Marsh is a weight-only model — all compartment volumes and clearances scale linearly with total body weight. In a 78-year-old, 60 kg woman, Marsh would give the same induction bolus as a young 60 kg adult, ignoring age-related reductions in clearance and cardiac output. Schnider incorporates age, weight, height, sex, and lean body mass (LBM). Its central volume (V1) is fixed at 4.27 L regardless of weight, producing a smaller initial bolus and less haemodynamic instability. Schnider also reduces clearance for age, which more accurately reflects elderly pharmacokinetics. For these reasons, the AAGBI/RCoA recommend Schnider as the preferred propofol model for effect-site TCI in UK practice.",
  ],
  [
    "What is context-sensitive half-time (CSHT) and why does it matter?",
    "CSHT is the time required for the effect-site concentration to decrease by 50% after stopping an infusion of a given duration. It matters because it predicts how quickly a patient will recover after a TIVA. For propofol, CSHT increases with infusion duration because the slowly equilibrating peripheral compartment (V3, primarily fat) becomes saturated during long infusions. After stopping the infusion, drug redistributes from V3 back into V1, prolonging elimination: ~10 min after 1 hour, ~25–30 min after 4 hours, and ~40 min after 8 hours. For remifentanil, CSHT remains constant at ~3–4 minutes regardless of duration because it is metabolised by plasma and tissue esterases — this predictable, rapid offset is one of its greatest advantages.",
  ],
  [
    "What are typical TCI target concentrations for propofol and remifentanil?",
    "For propofol using Schnider effect-site targeting: induction Ce 4–6 µg/mL; maintenance Ce 3–5 µg/mL for surgical anaesthesia; titrate to BIS 40–60. In elderly patients, start at Ce 2.5–3 µg/mL. For remifentanil using Minto effect-site targeting: analgesia Ce 2–4 ng/mL; surgical anaesthesia (with propofol) Ce 4–8 ng/mL; blunting intubation response Ce 6–10 ng/mL. Co-administration of an opioid reduces propofol requirements by approximately 30% — Eleveld is the only model that explicitly accounts for this interaction.",
  ],
  [
    "What is propofol infusion syndrome (PRIS) and how is it prevented?",
    "PRIS is a rare but potentially fatal complication of prolonged, high-dose propofol infusion. It is characterised by metabolic acidosis, rhabdomyolysis, hyperkalaemia, cardiac failure, renal failure, lipaemia, and hepatomegaly. The mechanism involves mitochondrial respiratory chain inhibition leading to impaired fatty acid oxidation and lactic acidosis. Risk factors include: propofol >4 mg/kg/hr for >48 hours, catecholamine or steroid co-administration, critical illness (particularly neurosurgical or septic patients), and paediatric patients. Prevention: limit propofol to <4 mg/kg/hr in ICU, monitor lactate, CK, and triglycerides daily, and time-limit propofol sedation. Treatment: stop propofol immediately, provide supportive care, and consider renal replacement therapy for refractory metabolic derangement. Switch to alternative sedation (midazolam, dexmedetomidine, or ketamine).",
  ],
  [
    "How should TIVA be set up safely to prevent awareness?",
    "Safety measures for TIVA include: (1) Dedicated, reliable IV access with an anti-reflux valve — consider a proximal (antecubital) cannula to minimise dead space. (2) The IV line and pump must be visible and monitored at all times; disconnection = awareness. (3) Processed EEG monitoring (BIS or Entropy) is mandatory when TIVA is combined with neuromuscular blockade — NAP5 identified TIVA + NMB as the highest-risk combination for awareness. (4) Use anti-syphon and anti-reflux valves to prevent gravity free-flow or backflow. (5) Check cannula site frequently — a tissued line is the classic cause of awareness under TIVA. (6) Pair propofol with remifentanil for fast, titratable anaesthesia and give transitional analgesia before stopping remifentanil to prevent hyperalgesic emergence.",
  ],
  [
    "What are the Eleveld model advantages over Marsh and Schnider?",
    "Eleveld (published 2018) is a universal pharmacokinetic model that covers the entire age spectrum from neonates to elderly adults, including obese patients. It uses allometric scaling (weight^0.75 for clearances, weight for volumes) which is more physiologically appropriate than the linear scaling used by Marsh. Key advantages: (1) it accounts for age-related maturation of clearance in neonates and infants; (2) it includes an opioid interaction term — when remifentanil is co-administered, the model automatically reduces propofol Ce50 by ~30%; (3) it is validated across a wider population (30 studies, ~1,300 patients) than any previous model. The main limitation is that it is not yet available on all TCI pump platforms — check your pump's software version.",
  ],
  [
    "How does obesity affect TCI propofol dosing?",
    "Obesity poses challenges for all TCI models. Marsh scales all volumes and clearances linearly with total body weight (TBW) — in obesity, this overestimates V1 and gives excessive induction boluses. Schnider uses lean body mass (LBM) calculated from the James formula, but this formula becomes unreliable at extreme BMI (>35–42) and can even produce negative values. Options for obese patients: (1) use adjusted body weight with Marsh (ABW = IBW + 0.4 × [TBW − IBW]); (2) use Schnider with height-limited LBM input; (3) use Eleveld, which employs allometric scaling and has been validated in obese patients. Regardless of model, all pharmacokinetic predictions are less reliable in extreme obesity, and clinical titration to processed EEG and haemodynamic response is essential.",
  ],
  [
    "What is the role of processed EEG monitoring during TIVA?",
    "Processed EEG monitoring (BIS, Entropy, or spectrogram) is essential during TIVA because there is no end-tidal volatile agent concentration to confirm drug delivery. NAP5 (the 5th National Audit Project of the Royal College of Anaesthetists) found that awareness with recall was approximately 5 times more common with TIVA than with volatile-based anaesthesia (1:8,000 vs 1:135,000). The highest-risk group was TIVA combined with neuromuscular blockade. Target BIS 40–60 or Entropy 40–60 for surgical anaesthesia. BIS values <20 indicate burst suppression and excessive depth; values >60 indicate inadequate hypnosis and increased awareness risk. In elderly patients, BIS monitoring is even more critical because pharmacokinetic models may over-predict drug concentrations, leading to excessive depth.",
  ],
];

type PKModel = "marsh" | "schnider" | "minto" | "eleveld" | "kataria" | "paedfusor";

const models: Record<PKModel, {
  label: string;
  drug: string;
  compartments: string;
  covariates: string;
  kePoints: string[];
  targetModes: string;
  population: string;
}> = {
  marsh: {
    label: "Marsh",
    drug: "Propofol",
    compartments: "3-compartment mammillary",
    covariates: "Total body weight only",
    population: "Adults (original: 6 healthy volunteers + pooled data)",
    targetModes: "Plasma targeting (Cp) — the original and most common mode. Effect-site targeting added later using a fixed ke0 of 0.26 min⁻¹.",
    kePoints: [
      "Weight-proportional model — all compartment volumes and clearances scale linearly with TBW",
      "Does NOT account for age, sex, height, or lean body mass",
      "In obese patients: overpredicts volumes → gives excessive bolus doses. Consider using adjusted body weight or switching to Schnider",
      "Fixed ke0 = 0.26 min⁻¹ (when effect-site targeting added). This gives a relatively slow equilibration — larger initial bolus in effect-site mode",
      "Most widely used propofol model worldwide. Default on many pumps.",
      "Plasma targeting: bolus → infusion. Clinician manually targets higher Cp initially to fill effect site",
    ],
  },
  schnider: {
    label: "Schnider",
    drug: "Propofol",
    compartments: "3-compartment mammillary",
    covariates: "Age, weight, height, lean body mass (LBM), sex",
    population: "Adults (24 volunteers, age 25–81, wide age range)",
    targetModes: "Designed for effect-site targeting (Ce). ke0 = 0.456 min⁻¹ (faster equilibration than Marsh).",
    kePoints: [
      "V1 is FIXED at 4.27 L regardless of weight — smaller initial bolus than Marsh in heavy patients",
      "Clearance scales with LBM (James formula) and age — accounts for ↓ clearance in elderly",
      "Better suited for elderly and frail patients — avoids excessive dosing",
      "ke0 = 0.456 min⁻¹ → faster plasma-effect site equilibration → smaller overshoot",
      "LBM calculation can produce paradoxical results in morbid obesity (LBM formula becomes negative at extreme BMI) — some pumps limit BMI to ~35–42",
      "V2 and V3 are fixed — only metabolic clearance varies with patient characteristics",
      "Preferred model in the UK for propofol effect-site TCI (AAGBI/RCoA recommendation)",
    ],
  },
  minto: {
    label: "Minto",
    drug: "Remifentanil",
    compartments: "3-compartment mammillary",
    covariates: "Age, sex, lean body mass (LBM)",
    population: "Adults (65 volunteers, age 20–85). Most widely validated remifentanil model.",
    targetModes: "Effect-site targeting (Ce). ke0 varies with age (↓ with age → slower equilibration in elderly).",
    kePoints: [
      "Standard remifentanil TCI model — virtually universal for remifentanil delivery",
      "All PK parameters vary with age and LBM — volumes and clearances decrease with age",
      "Context-sensitive half-time ~3–4 minutes regardless of infusion duration (ester hydrolysis)",
      "Typical Ce targets: analgesia 2–4 ng/mL, surgical anaesthesia (with propofol) 4–8 ng/mL, blunt intubation 6–10 ng/mL",
      "Same LBM limitation as Schnider in morbid obesity — pumps may restrict input",
      "Age has the most significant effect — elderly patients achieve higher Ce at same infusion rates",
    ],
  },
  eleveld: {
    label: "Eleveld",
    drug: "Propofol (also remifentanil version)",
    compartments: "3-compartment mammillary with allometric scaling",
    covariates: "Age, weight, height, sex, PMA (post-menstrual age for neonates), with/without opioid co-administration",
    population: "All ages (neonates to elderly). Pooled data from 30 studies, ~1,300 patients. Published 2018.",
    targetModes: "Effect-site targeting (Ce). ke0 is age-dependent. Accounts for opioid interaction (↓ Ce50 when opioid present).",
    kePoints: [
      "Universal model — covers neonates, children, adults, elderly, and obese",
      "Uses allometric scaling (weight⁰·⁷⁵ for clearances, weight for volumes) — more physiologically appropriate than linear scaling",
      "Includes opioid interaction: model adjusts when remifentanil is co-administered (↓ propofol requirement by ~30%)",
      "Accounts for age-related changes across the entire lifespan — V1 maturation in neonates, ↓ clearance in elderly",
      "Most modern and comprehensive model. Increasingly adopted on newer TCI pumps",
      "Validated across a wider population than any previous model — may replace Marsh/Schnider as default",
      "Not yet available on all pump platforms — check your pump's software version",
    ],
  },
  kataria: {
    label: "Kataria",
    drug: "Propofol",
    compartments: "3-compartment mammillary",
    covariates: "Weight, age (paediatric range)",
    population: "Children aged 3–11 years. One of the earliest paediatric propofol models.",
    targetModes: "Plasma targeting (Cp). No standard effect-site targeting ke0 defined.",
    kePoints: [
      "Paediatric-specific propofol model — higher weight-adjusted clearance than adults",
      "Children have larger V1 (relative to weight) and higher clearance → require proportionally larger doses",
      "Limited to age 3–11 — not validated in neonates, infants, or adolescents",
      "Being superseded by Eleveld model which covers all paediatric age groups",
      "Plasma targeting only — clinician must titrate to clinical effect for induction",
    ],
  },
  paedfusor: {
    label: "Paedfusor",
    drug: "Propofol",
    compartments: "3-compartment mammillary",
    covariates: "Weight, age (1–16 years)",
    population: "Children aged 1–16 years. Based on Marsh adult model with paediatric modifications.",
    targetModes: "Plasma targeting (Cp). ke0 incorporated for effect-site option on some pumps.",
    kePoints: [
      "Extension of Marsh model to paediatric population — weight-proportional with age-adjusted clearance",
      "Wider age range than Kataria (1–16 years) — more versatile for paediatric practice",
      "Higher clearances in younger children → faster infusion rates needed",
      "V1 scaled linearly with weight — may overdose in obese children",
      "Widely available on Alaris pumps in the UK. Being superseded by Eleveld.",
    ],
  },
};

const modelOrder: PKModel[] = ["marsh", "schnider", "eleveld", "minto", "kataria", "paedfusor"];

const TIVATopic = () => {
  const [selectedModel, setSelectedModel] = useState<PKModel>("marsh");
  const info = models[selectedModel];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tivaFaqs.map(([name, acceptedAnswer]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
    })),
  };

  return (
    <>
      <Helmet>
        <title>TIVA & TCI: Marsh, Schnider, Eleveld Models | FRCA</title>
        <meta name="description" content="FRCA Primary & Final guide to TIVA and target-controlled infusion: PK compartment models, Marsh vs Schnider vs Eleveld, plasma vs effect-site targeting, CSHT, PRIS, and practical setup." />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <TopicTemplate
        title="Total Intravenous Anaesthesia (TIVA)"
        subtitle="FRCA Primary & Final / FFICM — Clinical Anaesthesia"
        backPath="/clinical"
        backLabel="Clinical Anaesthesia"
        accentColor="text-clinical"
        topicId="tiva"
        topicTitle="Total Intravenous Anaesthesia (TIVA)"
        objectives={objectives}
        workedExamples={workedExamples}
        quizQuestions={tivaQuestions}
        sectionExamMapping={{
          objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
          workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
          keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        }}
        sectionSources={{
          objectives: [
            "BJA Educ 2016",
            "Schnider 1998",
            "Marsh 1991",
            "AAGBI TIVA",
          ],
          keyPoints: [
            "BJA Educ 2016",
            "Schnider 1998",
            "Marsh 1991",
            "AAGBI TIVA",
          ],
          workedExamples: ["Schnider 1998", "BJA Educ 2016"],
        }}
        keyPoints={[
          { text: "TCI pumps use 3-compartment models to predict Cp and Ce — V1 determines bolus size, clearance determines maintenance rate", cites: ["AAGBI TIVA"] },
          { text: "Marsh: weight-only, V1 scales with TBW, ke0 0.26 min⁻¹ — risk of overdose in obese, slower Ce equilibration", cites: ["Marsh 1991"] },
          { text: "Schnider: age/sex/LBM covariates, fixed V1 (4.27 L), ke0 0.456 min⁻¹ — UK preferred for Ce targeting, safer in elderly", cites: ["Schnider 1998"] },
          { text: "Eleveld: universal model (neonates to elderly), allometric scaling, accounts for opioid interaction — most modern", cites: ["BJA Educ 2016"] },
          { text: "Minto: standard remifentanil model. CSHT ~3–4 min regardless of duration. Ce targets: analgesia 2–4, surgery 4–8 ng/mL", cites: ["AAGBI TIVA"] },
          { text: "Effect-site targeting: pump overshoots Cp to fill effect site faster. Lower ke0 (Marsh) → larger overshoot → more haemodynamic instability", cites: ["Marsh 1991"] },
          { text: "BIS/Entropy monitoring mandatory for TIVA (NAP5). Awareness risk 5× higher with TIVA vs volatile (1:8,000)", cites: ["Schnider 1998"] },
          { text: "PRIS: propofol >4 mg/kg/hr for >48h → mitochondrial failure, metabolic acidosis, rhabdomyolysis. Stop propofol immediately", cites: ["BJA Educ 2016"] },
        ]}
        coreConcepts={
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <TopicTableOfContents items={tocItems} />

            <div id="intro" className="scroll-mt-24">
              <CollapsibleSubsection title="Principles of TIVA & TCI" defaultOpen>
                <div className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    Total intravenous anaesthesia uses intravenous agents exclusively to induce and maintain anaesthesia, avoiding volatile agents entirely. Target-controlled infusion (TCI) pumps use pharmacokinetic models to calculate infusion rates that achieve and maintain a user-defined target drug concentration — either in plasma (Cp) or at the effect site (Ce).
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg border border-border bg-secondary/30">
                      <p className="font-semibold text-foreground text-sm">Advantages of TIVA</p>
                      <p className="text-xs text-muted-foreground mt-1">No atmospheric pollution, no trigger for malignant hyperthermia, reduced PONV (propofol is anti-emetic), smooth induction/emergence, essential when volatile delivery impossible (e.g., rigid bronchoscopy, laryngeal surgery, jet ventilation), ↓ airway reactivity.</p>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-secondary/30">
                      <p className="font-semibold text-foreground text-sm">Risks & Considerations</p>
                      <p className="text-xs text-muted-foreground mt-1">Higher awareness risk (NAP5: 1:8,000 vs 1:135,000 with volatile). No end-tidal agent to confirm delivery. Requires processed EEG monitoring (BIS/Entropy). IV line disconnection = awareness. Propofol infusion syndrome with prolonged high-dose use (&gt;4 mg/kg/hr for &gt;48h).</p>
                    </div>
                  </div>
                </div>
              </CollapsibleSubsection>
            </div>

            <div id="models" className="scroll-mt-24">
              <CollapsibleSubsection title="Pharmacokinetic Compartment Models">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    TCI pumps use multi-compartment mammillary models to predict drug concentrations. Understanding the model structure is essential for interpreting TCI behaviour.
                  </p>
                  <div className="space-y-2">
                    {[
                      { comp: "V1 — Central Compartment", detail: "Represents the blood/plasma volume and highly perfused organs (brain, heart, kidneys, liver). Drug is injected here. Size of V1 determines the initial bolus size — larger V1 → larger bolus to achieve target Cp. Marsh: V1 scales with TBW. Schnider: V1 is fixed at 4.27 L." },
                      { comp: "V2 — Rapidly Equilibrating (Fast Peripheral)", detail: "Well-perfused tissues (muscle, viscera). Drug distributes here quickly (t½ redistribution ~2–4 min for propofol). Responsible for the rapid decline in plasma concentration after a bolus. Larger V2 → more redistribution → faster Cp decline." },
                      { comp: "V3 — Slowly Equilibrating (Slow Peripheral)", detail: "Poorly perfused tissues (fat, bone, connective tissue). Drug accumulates slowly during prolonged infusions. Responsible for context-sensitive half-time — prolonged infusions saturate V3, delaying elimination and recovery." },
                      { comp: "Clearances (k10, k12, k21, k13, k31)", detail: "k10: metabolic elimination from V1 (hepatic/organ clearance). k12/k21: transfer between V1 and V2. k13/k31: transfer between V1 and V3. The pump continuously solves differential equations using these rate constants to predict Cp at any time." },
                      { comp: "ke0 — Effect-Site Equilibration", detail: "Rate constant for drug transfer from plasma to the effect site (brain/biophase). Higher ke0 → faster equilibration → smaller initial overshoot in effect-site targeting. Marsh ke0 = 0.26 min⁻¹ (slow). Schnider ke0 = 0.456 min⁻¹ (faster). ke0 determines the time-to-peak effect (tpeak) after a bolus." },
                    ].map((c) => (
                      <div key={c.comp} className="p-3 rounded-lg border border-border">
                        <p className="font-semibold text-foreground text-sm">{c.comp}</p>
                        <p className="text-xs text-muted-foreground mt-1">{c.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleSubsection>
            </div>

            <div id="cp-ce" className="scroll-mt-24">
              <CollapsibleSubsection title="Plasma (Cp) vs Effect-Site (Ce) Targeting">
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg border border-border">
                      <p className="font-semibold text-foreground text-sm">Plasma Targeting (Cp)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pump achieves target Cp rapidly (bolus + infusion). Effect-site concentration (Ce) lags behind Cp — there is a delay before clinical effect. Clinician must set a higher initial Cp target and wait for Ce equilibration. Slower onset of clinical effect. Overshoot of Ce is avoided — safer in elderly/haemodynamically unstable patients. Marsh was originally designed for Cp targeting.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border border-border">
                      <p className="font-semibold text-foreground text-sm">Effect-Site Targeting (Ce)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pump transiently overshoots Cp above the target to drive drug into the effect site faster. Results in faster onset of clinical effect. The initial Cp overshoot depends on ke0 — lower ke0 (Marsh) → larger overshoot → greater haemodynamic effect. Higher ke0 (Schnider) → smaller overshoot. Preferred mode in modern practice. Requires reliable ke0 value.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <TCISimulatorDiagram />
                  </div>
                </div>
              </CollapsibleSubsection>
            </div>

            <div id="model-explorer" className="scroll-mt-24">
              <CollapsibleSubsection title="TCI Model Explorer">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="text-lg font-serif font-bold text-foreground mb-1">TCI Model Explorer</h3>
                  <p className="text-xs text-muted-foreground mb-4">Select a pharmacokinetic model to explore its characteristics, covariates, and clinical considerations</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {modelOrder.map((m) => {
                      const isPropofol = models[m].drug.startsWith("Propofol");
                      return (
                        <button key={m} onClick={() => setSelectedModel(m)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            selectedModel === m
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border text-muted-foreground hover:text-foreground"
                          }`}>
                          {models[m].label}
                          <span className={`ml-1 text-[10px] opacity-60`}>({isPropofol ? "Propofol" : "Remi"})</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="animate-fade-in" key={selectedModel}>
                    <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 mb-4">
                      <p className="font-bold text-foreground">{info.label} Model — {info.drug}</p>
                      <p className="text-xs text-muted-foreground mt-1"><strong>Population:</strong> {info.population}</p>
                      <p className="text-xs text-muted-foreground mt-1"><strong>Compartments:</strong> {info.compartments}</p>
                      <p className="text-xs text-muted-foreground mt-1"><strong>Covariates:</strong> {info.covariates}</p>
                    </div>

                    <div className="p-3 rounded-lg border border-border mb-4">
                      <p className="font-semibold text-foreground text-sm">Targeting Mode</p>
                      <p className="text-xs text-muted-foreground mt-1">{info.targetModes}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-foreground">Key Points</p>
                      {info.kePoints.map((kp, i) => (
                        <div key={i} className="flex gap-2 p-2 rounded border border-border">
                          <span className="text-xs font-bold text-primary mt-0.5">{i + 1}</span>
                          <p className="text-xs text-muted-foreground">{kp}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CollapsibleSubsection>
            </div>

            <div id="marsh-vs-schnider" className="scroll-mt-24">
              <CollapsibleSubsection title="Marsh vs Schnider — Key Differences">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                        <th className="text-left py-2 text-foreground font-semibold">Marsh</th>
                        <th className="text-left py-2 text-foreground font-semibold">Schnider</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">V1</td><td>0.228 L/kg (scales with TBW)</td><td>4.27 L (fixed)</td></tr>
                      <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">80 kg patient V1</td><td>18.2 L</td><td>4.27 L</td></tr>
                      <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Induction bolus (Cp 4)</td><td>~73 mL (larger)</td><td>~17 mL (smaller)</td></tr>
                      <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Covariates</td><td>Weight only</td><td>Age, weight, height, sex, LBM</td></tr>
                      <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ke0</td><td>0.26 min⁻¹</td><td>0.456 min⁻¹</td></tr>
                      <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Effect-site equilibration</td><td>Slower → larger Cp overshoot in Ce mode</td><td>Faster → smaller Cp overshoot</td></tr>
                      <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Obesity</td><td>Risk of overdose (V1 scales with TBW)</td><td>LBM formula fails at extreme BMI</td></tr>
                      <tr><td className="py-2 font-medium text-foreground">Best suited for</td><td>Cp targeting in average adults</td><td>Ce targeting, elderly, UK standard</td></tr>
                    </tbody>
                  </table>
                </div>
              </CollapsibleSubsection>
            </div>

            <div id="recovery" className="scroll-mt-24">
              <CollapsibleSubsection title="Recovery — CSHT & Decrement Times">
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Once you understand the models and targeting modes, the practical question is: <strong>how long until the patient wakes up?</strong> Context-sensitive half-times and decrement times quantify offset of effect after stopping an infusion of a given duration.
                  </p>
                  <div className="space-y-6">
                    <CSHTDiagram />
                    <DecrementTimeDiagram />
                  </div>
                </div>
              </CollapsibleSubsection>
            </div>

            <div id="practical" className="scroll-mt-24">
              <CollapsibleSubsection title="Practical TIVA Setup & Safety">
                <div className="space-y-2">
                  {[
                    { step: "Dedicated IV access", detail: "TIVA drugs must have a dedicated, reliable IV line. Anti-reflux valve essential. Consider proximal (antecubital) cannula to minimise dead space. Disconnection = awareness — line must be visible and monitored." },
                    { step: "Processed EEG monitoring", detail: "BIS or Entropy mandatory for TIVA (NAP5 recommendation). Target BIS 40–60. No end-tidal agent to confirm drug delivery. EEG is the primary indicator of adequate hypnosis during TIVA." },
                    { step: "Typical propofol TCI targets", detail: "Induction Ce 4–6 µg/mL (Schnider). Maintenance Ce 3–5 µg/mL. Titrate to BIS 40–60. Elderly: start lower (Ce 2–3). Opioid co-administration ↓ propofol requirement by ~30%." },
                    { step: "Typical remifentanil TCI targets", detail: "Minto model. Analgesia: Ce 2–4 ng/mL. Surgical anaesthesia: Ce 4–8 ng/mL. Blunting intubation response: Ce 6–10 ng/mL. Titrate to heart rate, blood pressure, and clinical stimulus." },
                    { step: "Context-sensitive half-time (CSHT)", detail: "Time for Ce to fall by 50% after stopping an infusion. Propofol CSHT increases with infusion duration (~10 min after 2h, ~40 min after 8h) due to V3 saturation. Remifentanil CSHT ~3–4 min regardless of duration (ester hydrolysis). This is why remifentanil allows rapid, predictable emergence." },
                    { step: "Manual TIVA (without TCI pump)", detail: "Roberts 10-8-6 regimen: propofol 10 mg/kg/hr for 10 min → 8 mg/kg/hr for 10 min → 6 mg/kg/hr thereafter. Crude approximation. TCI pumps are superior. Manual TIVA has higher awareness risk — BIS monitoring even more critical." },
                  ].map((s) => (
                    <div key={s.step} className="p-3 rounded-lg border border-border">
                      <p className="font-semibold text-foreground text-sm">{s.step}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.detail}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSubsection>
            </div>

            <div id="pris" className="scroll-mt-24">
              <CollapsibleSubsection title="Propofol Infusion Syndrome (PRIS)">
                <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                  <p className="text-sm font-bold text-destructive mb-2">⚠ Rare but Fatal Complication</p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Definition:</strong> Metabolic acidosis, rhabdomyolysis, hyperkalaemia, cardiac failure, renal failure, lipaemia, hepatomegaly. <strong>Mechanism:</strong> Mitochondrial respiratory chain inhibition → impaired fatty acid oxidation. <strong>Risk factors:</strong> Propofol &gt;4 mg/kg/hr for &gt;48 hours, catecholamine/steroid co-administration, critical illness (especially neuro/sepsis), paediatric ICU. <strong>Management:</strong> Stop propofol immediately, supportive care, RRT for metabolic derangement, alternative sedation (midazolam, dexmedetomidine). <strong>Prevention:</strong> Limit ICU propofol to &lt;4 mg/kg/hr. Monitor lactate, CK, triglycerides daily. Time-limit propofol sedation.
                  </p>
                </div>
              </CollapsibleSubsection>
            </div>

            <div id="special-pops" className="scroll-mt-24">
              <CollapsibleSubsection title="Special Populations">
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { title: "Elderly", detail: "↓ V1, ↓ clearance, ↓ cardiac output → slower distribution. Schnider accounts for age. Start at lower Ce targets (2–3 µg/mL). Slower induction. Increased sensitivity to haemodynamic effects. BIS monitoring essential — higher risk of excessive depth." },
                    { title: "Obese", detail: "Marsh: V1 scales with TBW → overdose risk. Schnider: LBM formula fails at BMI >35–42. Options: use adjusted body weight with Marsh, or Schnider with height-limited LBM, or Eleveld (allometric scaling). Higher initial Vd but clearance may not ↑ proportionally." },
                    { title: "Paediatric", detail: "Higher weight-adjusted clearance → need relatively higher infusion rates. Models: Paedfusor (1–16 yr), Kataria (3–11 yr), or Eleveld (all ages). Propofol not licensed <1 month. Higher V1/kg in neonates. Propofol infusion syndrome risk — avoid prolonged use in PICU." },
                    { title: "Critically Ill / Haemodynamically Unstable", detail: "↓ cardiac output → ↓ V1 (slower distribution) → higher peak concentrations. ↓ hepatic blood flow → ↓ clearance. Hypoalbuminaemia → ↑ free fraction. Start with lower targets and titrate. All PK models assume normal physiology — predictions are less reliable in critical illness." },
                  ].map((p) => (
                    <div key={p.title} className="p-3 rounded-lg border border-border">
                      <p className="font-semibold text-foreground text-sm">{p.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{p.detail}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSubsection>
            </div>

            <div id="faq" className="scroll-mt-24">
              <CollapsibleSubsection title="Frequently Asked Questions" defaultOpen>
                <div className="space-y-4">
                  {tivaFaqs.map(([question, answer], idx) => (
                    <div key={idx} className="rounded-lg border border-border p-4">
                      <p className="font-semibold text-foreground text-sm mb-1">{question}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{answer}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSubsection>
            </div>

            <SynthesisBlock
              title="TIVA — Practical Synthesis"
              subtitle="Setup checklist and recovery considerations for a safe TCI propofol-remifentanil anaesthetic."
              variant="summary"
            >
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li><strong>Model choice</strong>: Marsh (adults, weight only) vs Schnider (adults, age/height/lean body mass) — Schnider gives lower induction Cp and is preferred in elderly/lean patients.</li>
                <li><strong>Targets</strong>: Cp 4–6 µg/ml propofol + remifentanil 3–5 ng/ml for surgical anaesthesia. Reduce by 30–50% in elderly.</li>
                <li><strong>Effect-site (Ce) targeting</strong> reaches steady state faster than plasma targeting — preferred for induction.</li>
                <li><strong>Always use processed EEG</strong> with NMB to avoid awareness (NAP5 — TIVA + NMB highest risk).</li>
                <li><strong>Recovery</strong>: CSHT propofol ~10 min after 1 h infusion, ~25 min after 8 h. Remifentanil constant ~4 min — give transition analgesia before stopping.</li>
                <li><strong>PRIS</strong>: high-dose (&gt;4 mg/kg/hr) prolonged (&gt;48 h) propofol → metabolic acidosis, rhabdomyolysis, cardiac failure. Stop infusion immediately if suspected.</li>
              </ul>
            </SynthesisBlock>

            <ExamPitfallsCallout
              accent="clinical"
              pitfalls={[
                "Marsh (weight only) overestimates Ce in elderly; Schnider adds age/LBM; Eleveld covers neonates → obese adults in one model.",
                "Effect-site (Ce) targeting accounts for plasma–brain hysteresis — set Ce above plasma for faster induction.",
                "AAGBI: use processed EEG whenever TIVA is combined with NMB to reduce awareness (NAP5 highest-risk group).",
                "Keep IV line and pump visible; use anti-syphon/anti-reflux valves; check cannula site frequently — tissued lines are the classic cause of awareness.",
                "Pair propofol with remifentanil for fast, titratable anaesthesia; give transition analgesia before stopping the remi.",
                "PRIS: stop propofol immediately if metabolic acidosis, rising lactate, rhabdomyolysis or new cardiac failure during prolonged high-dose infusion.",
              ]}
            />
          </ExamSection>
        }
      />
    </>
  );
};

export default TIVATopic;
