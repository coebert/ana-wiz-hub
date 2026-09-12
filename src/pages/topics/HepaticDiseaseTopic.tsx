import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { hepaticDiseaseQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const tocItems = [
  { id: "section-preoperative-risk-stratification", label: "Preoperative Risk Stratification", group: "Assessment" },
  { id: "section-systemic-features-of-cirrhosis", label: "Systemic Features of Cirrhosis", group: "Core" },
  { id: "section-pharmacology-in-hepatic-impairment", label: "Pharmacology in Hepatic Impairment", group: "Pharmacology" },
  { id: "section-intraoperative-management", label: "Intraoperative Management", group: "Management" },
  { id: "section-perioperative-decompensation", label: "Perioperative Decompensation", group: "Complications" },
  { id: "section-portal-hypertension-assessment", label: "Portal Hypertension & Variceal Bleeding", group: "Complications" },
  { id: "section-ascites-and-electrolyte-disorders", label: "Ascites, Paracentesis & Electrolyte Disorders", group: "Complications" },
  { id: "section-viral-hepatitis-and-acute-liver-injury", label: "Viral Hepatitis, Acute Hepatitis & DILI", group: "Core" },
  { id: "section-postoperative-liver-dysfunction", label: "Postoperative Liver Dysfunction", group: "Complications" },
  { id: "section-nafld-masld-and-obesity", label: "NAFLD/MASLD and Obesity", group: "Core" },
];

const objectives = [
  "Quantify perioperative risk in chronic liver disease using Child-Pugh and MELD, and apply this to elective non-hepatic surgery decisions.",
  "Describe the cardiovascular, pulmonary, renal, neurological, and haemostatic features of advanced cirrhosis and their anaesthetic implications.",
  "Adjust the pharmacokinetics and pharmacodynamics of induction agents, opioids, neuromuscular blockers and volatile anaesthetics for the patient with hepatic impairment.",
  "Manage perioperative coagulopathy in cirrhosis using a 'rebalanced haemostasis' framework supported by viscoelastic testing.",
  "Recognise and treat hepatic decompensation in the perioperative period — acute-on-chronic liver failure, hepatorenal syndrome, hepatic encephalopathy, and variceal bleeding.",
];

const keyPoints = [
  {
    text: "Child-Pugh and MELD both predict perioperative mortality; MELD > 15 or Child-Pugh C → defer elective non-transplant surgery if possible (30-day mortality > 25%).",
    cites: ["Teh 2007", "BJA Educ Liver 2010"],
  },
  {
    text: "Cirrhosis produces a hyperdynamic circulation (↑CO, ↓SVR), reduced response to catecholamines and high risk of intraoperative hypotension — invasive monitoring is usually warranted for major surgery.",
    cites: ["BJA Educ Cirrhosis 2017", "EASL 2018 Decompensated"],
  },
  {
    text: "Coagulation in cirrhosis is 'rebalanced' — INR does not predict bleeding, prophylactic FFP is rarely indicated, and VTE risk persists; use TEG/ROTEM to guide product use.",
    cites: ["Northup 2018 Coagulation"],
  },
  {
    text: "Cisatracurium (Hofmann degradation) is the neuromuscular blocker of choice; avoid drugs with hepatic clearance such as vecuronium/rocuronium for prolonged cases.",
    cites: ["BJA Educ Liver 2010"],
  },
  {
    text: "Sevoflurane and desflurane preserve hepatic blood flow and have minimal metabolism; halothane is contraindicated because of immune-mediated halothane hepatitis.",
    cites: ["BJA Educ Liver 2010", "BJA Educ Cirrhosis 2017"],
  },
  {
    text: "Hepatorenal syndrome (HRS-AKI) is treated with terlipressin (or noradrenaline) plus 20% human albumin; avoid nephrotoxins and aim for MAP ≥ 80 mmHg.",
    cites: ["EASL 2018 Decompensated", "EASL 2022 HRS"],
  },
];

const workedExamples: WorkedExample[] = [
  {
    title: "Anaesthesia for elective inguinal hernia repair in Child-Pugh B cirrhosis",
    scenario:
      "A 58-year-old with alcohol-related cirrhosis (Child-Pugh B, MELD 14) presents for elective open inguinal hernia repair. Ascites is controlled on spironolactone; platelets 78 × 10⁹/L, INR 1.6. Plan the perioperative assessment and anaesthetic technique.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Confirm risk stratification — MELD 14 → Mayo postoperative 30-day mortality ~10–15% for open abdominal surgery; discuss benefit/burden with patient and hepatology.
          </li>
          <li>
            Preoperative optimisation: treat ascites and electrolyte derangement, screen for varices, correct hyponatraemia &lt; 130 mmol/L slowly, vitamin K 10 mg IV if INR &gt; 1.5, manage encephalopathy with lactulose ± rifaximin.
          </li>
          <li>
            Coagulation: do not transfuse FFP on the basis of INR alone — check fibrinogen and a viscoelastic trace if available; platelets &lt; 50 × 10⁹/L only if neuraxial planned or active bleeding.
          </li>
          <li>
            Technique: regional anaesthesia (TAP block / ilioinguinal block ± light sedation) is preferable to GA in this patient — avoids airway instrumentation, reduces hepatic insult and opioid burden. If neuraxial is chosen, confirm platelets ≥ 80 × 10⁹/L and INR &lt; 1.5 (or use ROTEM/TEG guidance).
          </li>
          <li>
            If GA required: propofol with reduced induction dose (↑ free fraction), fentanyl or remifentanil rather than morphine, cisatracurium, sevoflurane maintenance, lung-protective ventilation, avoid hypotension (target MAP within 20% of baseline).
          </li>
          <li>
            Postoperative: HDU monitoring, multimodal opioid-sparing analgesia (paracetamol &lt; 2 g/24 h, avoid NSAIDs), early VTE prophylaxis (mechanical immediately, pharmacological once haemostasis confirmed), daily review for encephalopathy and AKI.
          </li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Reflexive FFP/platelets to "correct" the INR — increases volume and portal pressure without reducing bleeding.</li>
            <li>Withholding VTE prophylaxis because of cirrhosis — VTE risk is preserved; bleeding risk is over-estimated by INR.</li>
            <li>Standard paracetamol dosing (4 g/24 h) — reduce to ≤ 2–3 g/24 h in established cirrhosis.</li>
            <li>NSAIDs — precipitate AKI/HRS and variceal bleeding; contraindicated.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Regional technique where feasible, individualised coagulation management guided by viscoelastic testing rather than INR, hepatic-friendly drug choices (propofol, fentanyl/remifentanil, cisatracurium, sevoflurane), MAP within 20% of baseline, reduced paracetamol dose, no NSAIDs, and HDU recovery with delirium and AKI surveillance.",
    cites: ["BJA Educ Liver 2010", "Teh 2007", "Northup 2018 Coagulation"],
  },
];

const hepaticDiseaseFaqs: Array<[string, string]> = [
  ["How is preoperative risk stratified in cirrhosis for non-hepatic surgery?", "Combine Child-Pugh class (A/B/C) and MELD score — MELD <10 is low risk, 10–15 intermediate, and >15 high (>20 prohibitive for elective surgery). The VOCAL-Penn score outperforms MELD for surgical mortality prediction."],
  ["Why should FFP not be used to 'correct' the INR in stable cirrhosis?", "Cirrhotic coagulopathy is a rebalanced state — both pro- and anti-coagulant factors are reduced. FFP raises portal pressure (worsening variceal bleeding risk) and adds volume without correcting the underlying defect; thromboelastography (ROTEM/TEG) guides targeted therapy."],
  ["How is hepatorenal syndrome managed perioperatively?", "Splanchnic vasoconstrictor (terlipressin or noradrenaline) plus 20% human albumin (1 g/kg on day 1, then 20–40 g/day). Diuretics, large-volume crystalloid and low-dose dopamine all worsen outcome; definitive treatment is liver transplantation."],
];

const HepaticDiseaseTopic = () => {
  return (
    <TopicTemplate
      title="Hepatic Co-Existing Disease"
      subtitle="Provision of anaesthesia for the patient with chronic liver disease undergoing non-hepatic surgery"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId="hepatic-disease"
      topicTitle="Hepatic Co-Existing Disease"
      workedExamples={workedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={hepaticDiseaseQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["PO_BK_06"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ Liver 2010", "BJA Educ Cirrhosis 2017", "Teh 2007", "EASL 2018 Decompensated", "NICE NG50", "Mahmud VOCAL-Penn 2021", "Northup AASLD 2021", "Bhangui 2012", "Friedman 2010"],
        workedExamples: ["BJA Educ Liver 2010", "Teh 2007", "Northup 2018 Coagulation"],
        keyPoints: [
          "BJA Educ Liver 2010",
          "BJA Educ Cirrhosis 2017",
          "Teh 2007",
          "Northup 2018 Coagulation",
          "EASL 2018 Decompensated",
          "EASL 2022 HRS",
        ],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Patients with chronic liver disease undergoing non-hepatic surgery are a high-risk population whose mortality is driven less by the operation itself than by the severity of underlying hepatic dysfunction. This topic covers preoperative risk stratification, the multi-system features of cirrhosis that change every step of the anaesthetic, and the specific perioperative complications — hepatorenal syndrome, encephalopathy, variceal haemorrhage and acute-on-chronic liver failure — that the anaesthetist must anticipate and treat.
            </p>

            <TopicTableOfContents items={tocItems} />

            {/* Risk stratification */}
            <section id="section-preoperative-risk-stratification" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Preoperative Risk Stratification</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Child-Pugh Score</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Five components (1–3 points each): <strong>bilirubin, albumin, INR (or PT), ascites, encephalopathy</strong>.</li>
                    <li>Class A (5–6) — well-compensated; B (7–9) — significant functional compromise; C (10–15) — decompensated.</li>
                    <li>Approximate 30-day perioperative mortality for major abdominal surgery: A ~10%, B ~30%, C &gt; 70% <InlineRef topicId="hepatic-disease" refLabel="Teh 2007" />.</li>
                    <li>Limitations: subjective scoring of ascites and encephalopathy; no renal component.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">MELD and MELD-Na</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Continuous score from <strong>bilirubin, INR and creatinine</strong> (MELD-Na adds sodium).</li>
                    <li>Better predictor than Child-Pugh for 30- and 90-day mortality after non-transplant surgery — every 1-point rise in MELD above 8 increases mortality by ~1% per point up to MELD 20, then ~2% per point thereafter <InlineRef topicId="hepatic-disease" refLabel="Teh 2007" />.</li>
                    <li>Practical thresholds: MELD &lt; 10 → proceed; 10–15 → proceed with caution and optimisation; &gt; 15 → defer or reconsider elective surgery; &gt; 20 → only life-saving surgery, ideally at a transplant centre.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Multidisciplinary Workup</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Hepatology review: stage portal hypertension (transient elastography, varices on OGD), exclude HCC, optimise diuretics and beta-blockers.</li>
                    <li>Cardiac assessment: cirrhotic cardiomyopathy is common — TTE for systolic/diastolic function and pulmonary pressures; CPET helps quantify reserve before major surgery <InlineRef topicId="hepatic-disease" refLabel="NICE NG50" />.</li>
                    <li>Anaesthetic plan documented with senior input; consider regional or hybrid techniques and HDU/ICU bed availability.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Systemic features */}
            <section id="section-systemic-features-of-cirrhosis" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Systemic Features of Cirrhosis</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Cardiovascular — Hyperdynamic Circulation</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>↑Cardiac output, ↓SVR, blunted response to catecholamines (down-regulated β-receptors).</li>
                    <li>Cirrhotic cardiomyopathy: latent systolic and diastolic dysfunction unmasked by stress; prolonged QTc in ~50%.</li>
                    <li>Portal hypertension &amp; aortocaval compression by ascites — preload-dependent state vulnerable to neuraxial blockade and IPPV.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Pulmonary</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Hepatopulmonary syndrome</strong>: intrapulmonary vascular dilatation → platypnoea, orthodeoxia, A–a gradient &gt; 15 mmHg; supplemental O₂ may be inadequate.</li>
                    <li><strong>Portopulmonary hypertension</strong>: mean PAP &gt; 25 mmHg with PVR &gt; 240 dyn·s·cm⁻⁵; severe PoPH (mPAP &gt; 45) is a contraindication to liver transplant and a major intraoperative risk.</li>
                    <li>Ascites and pleural effusion ↓ FRC, predispose to atelectasis and rapid desaturation.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Renal — Hepatorenal Syndrome</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Splanchnic vasodilatation → effective hypovolaemia → renal vasoconstriction; functional AKI without structural change.</li>
                    <li>Diagnosis (ICA-AKI 2015 / EASL 2018): cirrhosis with ascites, AKI per KDIGO, no response to 48 h diuretic withdrawal + albumin 1 g/kg/day, absence of shock or nephrotoxins, no parenchymal disease <InlineRef topicId="hepatic-disease" refLabel="EASL 2018 Decompensated" />.</li>
                    <li>Treatment: <strong>terlipressin 1–2 mg IV 4–6 hourly</strong> (or noradrenaline in ICU) plus <strong>20% human albumin</strong> (1 g/kg day 1, then 20–40 g/day); avoid nephrotoxins; RRT as bridge to transplant only.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Haematological — Rebalanced Haemostasis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Parallel reduction in pro- and anticoagulant factors; thrombocytopenia balanced by ↑vWF; fibrinolysis variable.</li>
                    <li><strong>INR does not predict bleeding</strong> in cirrhosis — do not transfuse FFP prophylactically <InlineRef topicId="hepatic-disease" refLabel="Northup 2018 Coagulation" />.</li>
                    <li>Use TEG/ROTEM where available: target fibrinogen &gt; 1.5 g/L (FIBTEM A10 &gt; 8 mm), treat hyperfibrinolysis with TXA, platelets only if &lt; 50 × 10⁹/L with active bleeding or planned neuraxial.</li>
                    <li>VTE prophylaxis must not be omitted — risk of portal vein and deep vein thrombosis is preserved or increased.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Neurological — Hepatic Encephalopathy</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>West Haven grades I–IV; precipitated by sepsis, GI bleed, sedatives, electrolyte derangement, constipation, TIPSS, dehydration.</li>
                    <li>Mechanism: ammonia, neuro-inflammation, GABA-ergic tone — explains exaggerated sensitivity to benzodiazepines and opioids.</li>
                    <li>Treatment: lactulose 30 mL 2-hourly until 2–3 soft stools/day, rifaximin 550 mg BD for recurrence prophylaxis <InlineRef topicId="hepatic-disease" refLabel="EASL 2022 HRS" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Gastrointestinal & Nutritional</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Varices and portal hypertensive gastropathy — anticipate GI bleeding; secondary prophylaxis with non-selective β-blocker or band ligation.</li>
                    <li>Sarcopenia and protein-calorie malnutrition are independent predictors of perioperative mortality — preoperative nutritional optimisation reduces postoperative complications.</li>
                    <li>Delayed gastric emptying — treat all decompensated patients as full-stomach for RSI.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Pharmacology */}
            <section id="section-pharmacology-in-hepatic-impairment" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pharmacology in Hepatic Impairment</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Hypoalbuminaemia</strong> → ↑free fraction of highly protein-bound drugs (thiopentone, diazepam, phenytoin).</li>
                    <li><strong>↑Volume of distribution</strong> from ascites and oedema → larger loading dose for water-soluble drugs (e.g. neuromuscular blockers).</li>
                    <li><strong>Reduced hepatic clearance</strong> → prolonged elimination of midazolam, morphine, vecuronium, rocuronium, lidocaine, paracetamol.</li>
                    <li><strong>↓Plasma cholinesterase</strong> → variable prolongation of suxamethonium and mivacurium; usually not clinically significant for a single dose.</li>
                    <li><strong>Portosystemic shunting</strong> → ↑bioavailability of orally administered, high first-pass drugs (β-blockers, opioids, midazolam).</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Practical Drug Choices</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Induction</strong>: propofol — reduce dose 20–30%, titrate to effect; etomidate acceptable; avoid thiopentone large bolus in severe disease.</li>
                    <li><strong>Volatile maintenance</strong>: sevoflurane (~3% metabolism) or desflurane (&lt;0.02%) — both preserve hepatic blood flow; <em>halothane contraindicated</em> (immune-mediated halothane hepatitis).</li>
                    <li><strong>Opioids</strong>: fentanyl and remifentanil (esterase metabolism, organ-independent) preferred; avoid morphine (active glucuronide accumulation), pethidine and codeine.</li>
                    <li><strong>Neuromuscular blockade</strong>: cisatracurium (Hofmann degradation) is first-line; quantitative monitoring; sugammadex preferred over neostigmine.</li>
                    <li><strong>Analgesia</strong>: paracetamol max 2–3 g/24 h in established cirrhosis; <em>avoid NSAIDs</em> (AKI, GI bleed, variceal rupture); regional techniques where coagulation allows.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intraoperative management */}
            <section id="section-intraoperative-management" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intraoperative Management</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Monitoring</strong>: minimum AAGBI plus arterial line and CVP/IBP for any major or non-trivial surgery; cardiac output monitoring (oesophageal Doppler / LiDCO) for major fluid shifts.</li>
                    <li><strong>Vascular access</strong>: large-bore peripheral and central access; blood/products available — group-and-save at minimum, cross-match for any abdominal surgery.</li>
                    <li><strong>Haemodynamic targets</strong>: MAP within 20% of baseline (typically ≥ 65–70 mmHg, ≥ 80 mmHg in HRS); noradrenaline first-line vasopressor; vasopressin/terlipressin for refractory splanchnic vasodilatation.</li>
                    <li><strong>Ventilation</strong>: lung-protective (V<sub>T</sub> 6 mL/kg IBW, PEEP 5–8); avoid high airway pressures that further reduce hepatic venous outflow.</li>
                    <li><strong>Fluids</strong>: balanced crystalloid; 20% albumin for large-volume paracentesis (8 g per litre drained) and HRS; avoid starches; restrict 0.9% saline (hyperchloraemic acidosis worsens AKI).</li>
                    <li><strong>Temperature &amp; glucose</strong>: actively warm (cirrhotics lose heat rapidly through ascites); monitor glucose — hypoglycaemia common from impaired gluconeogenesis.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Acute decompensation */}
            <section id="section-perioperative-decompensation" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Perioperative Decompensation</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Decompensation — new or worsening ascites, encephalopathy, jaundice, variceal bleeding, infection, or acute kidney injury — is the dominant cause of perioperative mortality in chronic liver disease. The 30-day risk of decompensation or death rises sharply with both patient-specific severity of disease and procedure-specific physiological insult; the two combine multiplicatively in validated models such as VOCAL-Penn, which outperforms MELD-Na and the Mayo postoperative score for 30-/90-/180-day mortality<InlineRef topicId="hepatic-disease" refLabel="Mahmud VOCAL-Penn 2021" />.
                </p>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Patient-Associated Risk Factors</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Severity of liver disease</strong> — Child-Pugh class and MELD/MELD-Na are the strongest single predictors; 30-day mortality rises from ~10% (CP-A / MELD &lt; 10) to &gt; 70% (CP-C / MELD &gt; 20) for major abdominal surgery<InlineRef topicId="hepatic-disease" refLabel="Teh 2007" />.</li>
                    <li><strong>Clinically significant portal hypertension</strong> — HVPG &gt; 10 mmHg, varices, splenomegaly, ascites; independently doubles perioperative mortality even at lower MELD scores<InlineRef topicId="hepatic-disease" refLabel="Bhangui 2012" />.</li>
                    <li><strong>Active decompensation in the preceding 3 months</strong> — recent variceal bleed, SBP, HRS-AKI or grade III–IV encephalopathy markedly increases risk of recurrence under surgical stress<InlineRef topicId="hepatic-disease" refLabel="EASL 2018 Decompensated" />.</li>
                    <li><strong>Hyponatraemia (Na &lt; 130 mmol/L)</strong> — captured in MELD-Na; reflects advanced splanchnic vasodilatation and predicts AKI, encephalopathy and death.</li>
                    <li><strong>Sarcopenia and frailty</strong> — independent predictors of postoperative mortality beyond MELD; assessed by L3 psoas index, hand-grip strength or Liver Frailty Index<InlineRef topicId="hepatic-disease" refLabel="NICE NG50" />.</li>
                    <li><strong>Concurrent infection</strong> — SBP, UTI or cellulitis at the time of surgery is one of the most consistent precipitants of acute-on-chronic liver failure (ACLF).</li>
                    <li><strong>Cardiopulmonary comorbidity</strong> — cirrhotic cardiomyopathy, hepatopulmonary syndrome and portopulmonary hypertension (mPAP &gt; 35 mmHg) substantially increase intraoperative haemodynamic instability and postoperative organ failure.</li>
                    <li><strong>Renal dysfunction</strong> — baseline creatinine &gt; 133 µmol/L or recent HRS doubles 30-day mortality (captured by both MELD and VOCAL-Penn).</li>
                    <li><strong>Aetiology</strong> — active alcohol use, untreated hepatitis B/C, and NASH with metabolic syndrome are each associated with higher decompensation rates; abstinence and antiviral therapy before elective surgery measurably reduce risk<InlineRef topicId="hepatic-disease" refLabel="BJA Educ Cirrhosis 2017" />.</li>
                    <li><strong>Age &gt; 70, ASA ≥ III, BMI extremes</strong> — non-hepatic factors that are integrated into the VOCAL-Penn calculator alongside liver-specific variables<InlineRef topicId="hepatic-disease" refLabel="Mahmud VOCAL-Penn 2021" />.</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Procedure-Associated Risk Factors</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Urgency</strong> — emergency surgery carries a 2–4-fold increase in perioperative mortality compared with the same operation performed electively, at every MELD/Child-Pugh stratum<InlineRef topicId="hepatic-disease" refLabel="Friedman 2010" />.</li>
                    <li><strong>Site and type of surgery</strong> — highest risk: open abdominal (especially hepatic resection, colectomy, ulcer surgery), cardiac and trauma surgery; intermediate risk: orthopaedic, vascular, upper GI; lowest risk: superficial, ophthalmic and short laparoscopic procedures<InlineRef topicId="hepatic-disease" refLabel="Bhangui 2012" />.</li>
                    <li><strong>Open vs laparoscopic</strong> — laparoscopic cholecystectomy and hernia repair have lower decompensation rates than open equivalents in compensated cirrhosis, provided pneumoperitoneum is kept ≤ 12 mmHg to preserve hepatic venous outflow.</li>
                    <li><strong>Duration and blood loss</strong> — operations &gt; 4 h and intraoperative transfusion &gt; 2 units RBC are independent predictors of postoperative ACLF.</li>
                    <li><strong>Hepatic resection or vascular inflow occlusion</strong> — Pringle manoeuvre and major hepatectomy further reduce functional liver mass; safe future liver remnant ≥ 40% in cirrhosis (vs ≥ 25% in normal liver).</li>
                    <li><strong>Cardiopulmonary bypass</strong> — non-pulsatile flow, hypothermia, transfusion and systemic inflammation produce a particularly high rate of postoperative liver failure in cirrhosis; off-pump techniques preferred where feasible.</li>
                    <li><strong>Intra-abdominal surgery in the presence of ascites</strong> — wound dehiscence, infection and incisional hernia rates are substantially higher; consider preoperative paracentesis or TIPSS in selected patients.</li>
                    <li><strong>Anaesthetic insults</strong> — sustained hypotension (MAP &lt; 65 mmHg for &gt; 10 min), high PEEP, high intra-abdominal pressure and hepatotoxic drug exposure (halothane, paracetamol overdose, NSAIDs) precipitate ischaemic hepatic injury.</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Risk Stratification Tools</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Child-Pugh</strong> — historic standard; still useful for bedside triage but limited by subjective components and absence of renal function<InlineRef topicId="hepatic-disease" refLabel="Teh 2007" />.</li>
                    <li><strong>MELD / MELD-Na</strong> — better continuous predictor; MELD &gt; 15 should trigger formal multidisciplinary review before elective non-transplant surgery.</li>
                    <li><strong>Mayo Postoperative Mortality Risk Score</strong> — integrates age, MELD, ASA and aetiology to give 7-/30-/90-day mortality estimates (Mayo Clinic online calculator)<InlineRef topicId="hepatic-disease" refLabel="Teh 2007" />.</li>
                    <li><strong>VOCAL-Penn</strong> — preferred contemporary score in the US/EU; outperforms MELD-Na and Mayo, particularly in compensated patients and laparoscopic procedures<InlineRef topicId="hepatic-disease" refLabel="Mahmud VOCAL-Penn 2021" />.</li>
                    <li><strong>CLIF-C ACLF / CLIF-SOFA</strong> — used postoperatively to grade severity and prognosis if decompensation develops<InlineRef topicId="hepatic-disease" refLabel="EASL 2018 Decompensated" />.</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Strategies to Mitigate Decompensation Risk</h3>
                  <p className="text-sm mb-2"><em>Preoperative</em></p>
                  <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                    <li>Defer non-essential elective surgery if MELD &gt; 15 or Child-Pugh C; transfer high-risk cases to a transplant centre where surgery and post-op liver support are co-located<InlineRef topicId="hepatic-disease" refLabel="Friedman 2010" />.</li>
                    <li>Treat ongoing precipitants before theatre: alcohol abstinence (≥ 6 weeks where possible), antiviral therapy for HBV/HCV, weight loss in NASH, optimisation of diabetes.</li>
                    <li>Optimise ascites (low-sodium diet, diuretics, large-volume paracentesis with 8 g albumin per litre drained); consider preoperative TIPSS in refractory ascites or recurrent variceal bleeding before elective abdominal surgery.</li>
                    <li>Screen for and band-ligate high-risk varices; continue non-selective β-blocker (carvedilol or propranolol) up to surgery, holding only if MAP cannot be maintained.</li>
                    <li>Treat hepatic encephalopathy with lactulose ± rifaximin to West Haven 0 before elective surgery<InlineRef topicId="hepatic-disease" refLabel="EASL 2022 HRS" />.</li>
                    <li>Correct hyponatraemia slowly (≤ 8 mmol/L per 24 h) to avoid osmotic demyelination.</li>
                    <li>Nutritional pre-habilitation: 1.2–1.5 g/kg/day protein, late-evening snack, branched-chain amino acid supplementation in sarcopenic patients.</li>
                    <li>Document baseline coagulation with fibrinogen and viscoelastic testing (TEG/ROTEM); avoid prophylactic FFP and platelets — correct only if active bleeding or planned neuraxial<InlineRef topicId="hepatic-disease" refLabel="Northup AASLD 2021" />.</li>
                    <li>Vaccinate (pneumococcal, influenza, HBV) and treat any active infection — including SBP — before elective surgery.</li>
                    <li>Multidisciplinary preoperative review (hepatology, anaesthesia, surgery, ITU) with explicit ceiling-of-care discussion documented.</li>
                  </ul>
                  <p className="text-sm mb-2"><em>Intraoperative</em></p>
                  <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                    <li>Prefer regional or hybrid techniques where coagulation permits to limit GA and opioid exposure.</li>
                    <li>Maintain MAP within 20% of baseline (≥ 65–70 mmHg, ≥ 80 mmHg if HRS) with noradrenaline first-line; vasopressin/terlipressin for refractory splanchnic vasodilatation<InlineRef topicId="hepatic-disease" refLabel="EASL 2018 Decompensated" />.</li>
                    <li>Lung-protective ventilation with the lowest effective PEEP to preserve hepatic venous outflow; keep intra-abdominal pressure ≤ 12 mmHg for laparoscopy.</li>
                    <li>Balanced crystalloid and 20% albumin for volume replacement; restrict 0.9% saline and avoid starches.</li>
                    <li>Viscoelastic-guided product use; tranexamic acid for hyperfibrinolysis; fibrinogen concentrate if FIBTEM A10 &lt; 8 mm; platelets only if &lt; 50 × 10⁹/L with active bleeding<InlineRef topicId="hepatic-disease" refLabel="Northup AASLD 2021" />.</li>
                    <li>Hepatic-friendly pharmacology: propofol (reduced dose), sevoflurane/desflurane, fentanyl or remifentanil, cisatracurium, paracetamol ≤ 2–3 g/24 h, no NSAIDs.</li>
                    <li>Active warming and glucose monitoring (hypoglycaemia from impaired gluconeogenesis).</li>
                    <li>Surgical mitigation: minimise blood loss, avoid Pringle manoeuvre &gt; 30 min in cirrhosis, consider intraoperative cell salvage where appropriate.</li>
                  </ul>
                  <p className="text-sm mb-2"><em>Postoperative</em></p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>HDU or ICU disposition for any MELD &gt; 10 or major surgery; daily review for ascites, encephalopathy, AKI and infection.</li>
                    <li>Early enteral nutrition; continue lactulose/rifaximin; avoid sedatives and benzodiazepines.</li>
                    <li>Early VTE prophylaxis (mechanical immediately, pharmacological once haemostasis confirmed) — cirrhosis does <em>not</em> protect against VTE<InlineRef topicId="hepatic-disease" refLabel="Northup AASLD 2021" />.</li>
                    <li>Vigilance for postoperative sepsis and SBP — low threshold for diagnostic paracentesis and empirical antibiotics with 20% albumin (1.5 g/kg day 1, 1 g/kg day 3)<InlineRef topicId="hepatic-disease" refLabel="EASL 2018 Decompensated" />.</li>
                    <li>Early identification of ACLF using CLIF-SOFA; escalate to transplant centre if grade ≥ 2 with extrahepatic organ failure.</li>
                  </ul>
                </div>

                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Acute-on-Chronic Liver Failure (ACLF)</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Acute hepatic decompensation with extrahepatic organ failure (CLIF-SOFA / EASL-CLIF criteria).</li>
                    <li>Common precipitants: sepsis, GI haemorrhage, alcohol, drug toxicity, surgery itself.</li>
                    <li>Management: source control, broad-spectrum antibiotics, organ support, escalation to transplant centre; corticosteroids only in severe alcoholic hepatitis with discriminant function ≥ 32 <InlineRef topicId="hepatic-disease" refLabel="EASL 2018 Decompensated" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Variceal Haemorrhage — Exact Management</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Resuscitation</strong>: restrictive transfusion strategy, target Hb 70–80 g/L (over-transfusion raises portal pressure and rebleeding risk); correct thrombocytopenia/coagulopathy only if actively bleeding.</li>
                    <li><strong>Splanchnic vasoconstriction</strong>: <strong>terlipressin 2 mg IV bolus, then 2 mg IV 4-hourly</strong> (or 1 mg 4-hourly once bleeding controlled) for up to 5 days; monitor for splanchnic/coronary ischaemia and hyponatraemia; octreotide infusion is an alternative where terlipressin unavailable<InlineRef topicId="hepatic-disease" refLabel="AASLD 2012" />.</li>
                    <li><strong>Prophylactic antibiotics</strong>: IV ceftriaxone 1 g once daily (or ciprofloxacin if low resistance risk) for up to 7 days in every cirrhotic with GI bleeding — reduces rebleeding, SBP and mortality independent of endoscopic therapy<InlineRef topicId="hepatic-disease" refLabel="AASLD 2012" />.</li>
                    <li><strong>Endoscopy</strong>: urgent upper GI endoscopy with <strong>band ligation within 12 h</strong> of presentation (once resuscitated) is first-line; injection sclerotherapy if ligation not feasible.</li>
                    <li><strong>Airway protection</strong>: rapid sequence induction with a cuffed endotracheal tube before endoscopy in active haematemesis, reduced consciousness or massive bleeding — full-stomach and aspiration precautions; large-bore IV access, blood and platelets available in theatre, vasopressor support ready.</li>
                    <li><strong>Balloon tamponade</strong>: Sengstaken–Blakemore (or Minnesota) tube as a temporising bridge only, for uncontrolled bleeding refractory to endoscopy — maximum 24 h dwell time, gastric balloon inflated first, definitive therapy (repeat endoscopy or TIPSS) must follow promptly because of mucosal ischaemia and aspiration risk with prolonged use.</li>
                    <li><strong>Salvage/definitive therapy</strong>: rescue TIPSS for endoscopic failure or Child-Pugh B/C with active bleeding at index endoscopy ("early TIPSS") reduces treatment failure and mortality.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Sepsis &amp; Spontaneous Bacterial Peritonitis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Common perioperative precipitant of decompensation; diagnostic paracentesis (ascitic PMN &gt; 250/mm³) for any new clinical change.</li>
                    <li>Empirical cefotaxime or piperacillin–tazobactam; add 20% albumin (1.5 g/kg day 1, 1 g/kg day 3) — reduces HRS and mortality.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Portal hypertension */}
            <section id="section-portal-hypertension-assessment" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Portal Hypertension Assessment &amp; TIPSS</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Hepatic Venous Pressure Gradient (HVPG)</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Gold-standard invasive measurement (wedged minus free hepatic venous pressure) of portal pressure.</li>
                    <li><strong>&gt; 5 mmHg</strong> — portal hypertension present (normal 1–5 mmHg).</li>
                    <li><strong>&gt; 10 mmHg</strong> — "clinically significant portal hypertension" (CSPH): threshold for varices, ascites, and decompensation; independently doubles perioperative mortality even at lower MELD scores<InlineRef topicId="hepatic-disease" refLabel="Bhangui 2012" />.</li>
                    <li><strong>&gt; 12 mmHg</strong> — threshold above which oesophageal varices bleed; non-selective β-blockade or band ligation reduces HVPG and bleeding risk below this level<InlineRef topicId="hepatic-disease" refLabel="AASLD 2012" />.</li>
                    <li>HVPG is rarely available outside specialist hepatology centres — non-invasive surrogates are used for risk stratification pre-anaesthesia.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Non-Invasive Surrogates</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Platelet count</strong>: &lt; 150 × 10⁹/L raises suspicion of portal hypertension (splenic sequestration); &lt; 100 × 10⁹/L combined with splenomegaly is a strong predictor of varices.</li>
                    <li><strong>Transient elastography (FibroScan)</strong>: liver stiffness &gt; 20–25 kPa strongly predicts CSPH; combined with platelet count and spleen size (Baveno VI/VII criteria: liver stiffness &lt; 15 kPa and platelets &gt; 150 × 10⁹/L) can safely rule out high-risk varices and avoid screening endoscopy.</li>
                    <li>Imaging signs of portal hypertension: splenomegaly, portosystemic collaterals, recanalised umbilical vein, ascites on ultrasound/CT.</li>
                    <li>These surrogates are used preoperatively to flag patients who need OGD variceal screening and closer perioperative haemodynamic control before elective surgery.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">TIPSS In Situ — Anaesthetic Implications</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>A transjugular intrahepatic portosystemic shunt decompresses portal pressure and reduces variceal bleeding and refractory ascites, but shunts portal blood directly into the systemic circulation.</li>
                    <li><strong>Hepatic encephalopathy</strong> occurs or worsens in up to 30–50% after TIPSS (loss of hepatic first-pass clearance of gut-derived ammonia and toxins) — heightened sensitivity to sedatives, opioids and benzodiazepines.</li>
                    <li>Reduced hepatic synthetic reserve may become apparent post-TIPSS as portal flow to the liver falls — anticipate a worse coagulation profile and drug handling than pre-TIPSS labs suggest.</li>
                    <li>Shunt patency should be confirmed (Doppler ultrasound) before major elective surgery; a stenosed/occluded shunt restores portal hypertension and variceal risk.</li>
                    <li>TIPSS does not eliminate the need for perioperative variceal precautions, sodium restriction or ascites management, but does reduce the acute risk of intraoperative variceal haemorrhage from raised intra-abdominal pressure.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Ascites and electrolytes */}
            <section id="section-ascites-and-electrolyte-disorders" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ascites, Paracentesis &amp; Electrolyte Disorders</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Large-Volume Paracentesis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>First-line for tense/refractory ascites; drain to dryness where tolerated under close haemodynamic monitoring.</li>
                    <li><strong>Human albumin 6–8 g per litre of ascites removed</strong> when &gt; 5 L is drained, to prevent post-paracentesis circulatory dysfunction (further splanchnic vasodilatation → HRS, hyponatraemia); typically given as 20% albumin at the end of the procedure<InlineRef topicId="hepatic-disease" refLabel="EASL 2018 Decompensated" />.</li>
                    <li>Below 5 L drained, albumin is often omitted or synthetic plasma expanders used, per local protocol — but exam answer defaults to the 6–8 g/L rule for &gt; 5 L.</li>
                    <li>Consider preoperative therapeutic paracentesis before abdominal surgery to reduce intra-abdominal pressure, aid ventilation and reduce wound dehiscence risk; refractory ascites is an indication to consider TIPSS.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Hyponatraemia — Correction Limits</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Common in decompensated cirrhosis from non-osmotic ADH release and splanchnic vasodilatation (dilutional, hypervolaemic hyponatraemia); captured in MELD-Na.</li>
                    <li><strong>Correct no faster than 8–10 mmol/L in any 24-hour period</strong> (some guidelines advise an even more cautious ≤ 8 mmol/L/24 h in cirrhosis) — over-rapid correction risks <strong>osmotic demyelination syndrome</strong> (central pontine/extrapontine myelinolysis), which is more likely in chronic liver disease because of coexisting malnutrition.</li>
                    <li>Management is usually fluid restriction (&lt; 1–1.5 L/day) rather than hypertonic saline unless severely symptomatic (seizures, coma); avoid rapid diuresis and correct slowly with frequent (4–6 hourly) sodium checks if levels are &lt; 125 mmol/L.</li>
                    <li>Vaptans (tolvaptan) are generally avoided in cirrhosis because of hepatotoxicity risk and difficulty controlling correction rate.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Alcohol Withdrawal &amp; Thiamine in the Surgical Cirrhotic</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Alcohol-related cirrhosis is a leading aetiology presenting for surgery; unplanned admission removes access to alcohol and can precipitate withdrawal from 6–24 h post-last drink, peaking at 24–72 h (delirium tremens, seizures).</li>
                    <li>Screen with a validated tool (e.g. AUDIT, CIWA-Ar) and use a symptom-triggered benzodiazepine regimen (chlordiazepoxide or short-acting lorazepam if hepatic impairment severe) — titrate cautiously given reduced hepatic clearance and risk of precipitating encephalopathy.</li>
                    <li><strong>IV thiamine (Pabrinex) before any glucose-containing fluid</strong> to prevent Wernicke's encephalopathy — malnourished/alcohol-dependent surgical patients are at high risk; continue oral thiamine postoperatively.</li>
                    <li>Avoid untreated withdrawal perioperatively — autonomic instability, seizures and delirium tremens compound surgical risk and are easily mistaken for hepatic encephalopathy or sepsis.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Viral hepatitis and acute liver injury */}
            <section id="section-viral-hepatitis-and-acute-liver-injury" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Viral Hepatitis, Acute Hepatitis &amp; Drug-Induced Liver Injury</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Hepatitis B and C — Occupational Exposure &amp; Infection Control</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Standard precautions (gloves, eye protection, safe sharps handling, single-use needles) for every patient; do not rely on a negative history to exclude bloodborne virus carriage.</li>
                    <li>Vaccination against hepatitis B is mandatory for healthcare workers with exposure-prone procedures; check and document immune status (anti-HBs titre).</li>
                    <li>Percutaneous or mucocutaneous occupational exposure: wash the area, do not squeeze the wound aggressively, report immediately to occupational health for risk assessment and baseline bloods (source and recipient).</li>
                    <li>Post-exposure management: HBV — non-immune recipients receive accelerated vaccination ± hepatitis B immunoglobulin depending on source status; HCV — no immunoglobulin/vaccine available, so serial PCR follow-up at 6 weeks and antivirals (direct-acting agents) if seroconversion occurs; HIV PEP considered per local protocol if source status unknown/high-risk.</li>
                    <li>Active untreated HBV/HCV increases perioperative decompensation risk; antiviral therapy before elective major surgery reduces this risk and should be arranged with hepatology where time allows<InlineRef topicId="hepatic-disease" refLabel="BJA Educ Cirrhosis 2017" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Acute Hepatitis and Drug-Induced Liver Injury (DILI)</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Defer elective surgery</strong> in any patient with acute hepatitis (viral, autoimmune, ischaemic, or drug-induced) or an acute rise in transaminases of unclear cause — anaesthesia and surgical stress in acute hepatocellular injury carries markedly increased mortality and risk of progression to acute liver failure.</li>
                    <li>Investigate before proceeding: viral serology, autoimmune screen, drug/toxin history (including paracetamol, anti-tuberculous drugs, herbal remedies, recreational drugs, halogenated volatile re-exposure), liver ultrasound and hepatology referral.</li>
                    <li>DILI patterns: hepatocellular (ALT-predominant), cholestatic (ALP-predominant) or mixed; Hy's Law (ALT &gt; 3× ULN with bilirubin &gt; 2× ULN) predicts a high risk of severe liver injury and mortality and should prompt urgent hepatology review before any anaesthetic.</li>
                    <li>Halothane hepatitis is the classic anaesthetic-drug example — immune-mediated injury after repeat exposure; avoid halothane entirely and note any prior severe unexplained postoperative jaundice as a contraindication to re-exposure to related volatile agents.</li>
                    <li>If surgery cannot be deferred (e.g. trauma, perforation), treat as acute liver failure risk: avoid further hepatotoxins, monitor coagulation and glucose closely, involve a liver unit early, and apply King's College Criteria if progression to acute liver failure is suspected.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Postoperative liver dysfunction */}
            <section id="section-postoperative-liver-dysfunction" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postoperative Liver Dysfunction</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  New jaundice or deranged liver function in the first postoperative week has a broad differential; a structured approach based on timing and the pattern of derangement (hepatocellular vs cholestatic) narrows the diagnosis quickly.
                </p>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Differential Diagnosis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Ischaemic hepatitis ("shock liver")</strong>: intraoperative or postoperative hypotension, hypovolaemia or low cardiac output — massive rise in transaminases (often &gt; 1000 IU/L) within 24–48 h, rapid resolution over 1–2 weeks if the circulation is restored; treat by optimising cardiac output and perfusion pressure.</li>
                    <li><strong>Obstructive/surgical</strong>: bile duct injury, retained stone, anastomotic stricture or leak after biliary/hepatobiliary surgery — cholestatic pattern (↑ALP, ↑GGT, ↑bilirubin), pain, fever; imaging (ultrasound/MRCP) and early surgical/ERCP review.</li>
                    <li><strong>Drug-related</strong>: volatile agents (rare halothane-type hepatitis), antibiotics (co-amoxiclav, flucloxacillin), paracetamol overdose/accumulation, total parenteral nutrition-associated cholestasis — review the drug chart and timing of onset relative to each agent.</li>
                    <li><strong>Sepsis-associated cholestasis</strong>: intrahepatic cholestasis of sepsis is common in critically ill postoperative patients — bilirubin and ALP rise with systemic infection independent of direct hepatic insult; treat the underlying source.</li>
                    <li><strong>Pre-existing/undiagnosed liver disease</strong> unmasked by surgical stress, transfusion-related (rare transfusion-transmitted infection), or benign postoperative intrahepatic cholestasis after prolonged surgery/hypotension.</li>
                    <li><strong>Haemolysis and resorption of large haematomas</strong> can cause an isolated unconjugated hyperbilirubinaemia without true hepatocellular injury.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Management Approach</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Serial LFTs, coagulation, glucose and lactate; classify pattern (hepatocellular vs cholestatic) using the R-ratio; liver ultrasound with Doppler to exclude vascular occlusion (hepatic artery/portal vein thrombosis) and biliary obstruction.</li>
                    <li>Review anaesthetic and drug chart in detail; stop any potentially hepatotoxic agent; treat sepsis empirically pending cultures.</li>
                    <li>Optimise haemodynamics and oxygen delivery if an ischaemic pattern is suspected; avoid further hypotensive episodes.</li>
                    <li>Escalate to hepatology/liver unit if synthetic function deteriorates (rising INR, falling albumin, encephalopathy) — this indicates evolving acute-on-chronic or acute liver failure requiring organ support and consideration of transplant referral.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* NAFLD/MASLD */}
            <section id="section-nafld-masld-and-obesity" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">NAFLD/MASLD and Obesity — An Emerging Cause</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Non-alcoholic fatty liver disease (NAFLD), recently re-termed <strong>metabolic dysfunction-associated steatotic liver disease (MASLD)</strong>, is now the commonest cause of chronic liver disease presenting for surgery in high-income countries, driven by the obesity and type 2 diabetes epidemic.</li>
                    <li>Spectrum ranges from simple steatosis (usually benign) through steatohepatitis (NASH/MASH) to fibrosis and cirrhosis; a significant proportion of "cryptogenic" cirrhosis is now attributed to burnt-out NASH.</li>
                    <li>These patients frequently present for <strong>bariatric or general surgery</strong> without a prior diagnosis of liver disease — unexplained mild transaminase elevation, hepatomegaly or incidental steatosis on imaging in an obese/diabetic patient should prompt consideration of fibrosis staging (elastography, NAFLD fibrosis score) before major elective surgery.</li>
                    <li>Perioperative relevance mirrors alcohol-related cirrhosis once fibrosis/cirrhosis is established: same MELD/Child-Pugh/VOCAL-Penn risk stratification, same coagulation and pharmacological principles apply<InlineRef topicId="hepatic-disease" refLabel="Mahmud VOCAL-Penn 2021" />.</li>
                    <li>Additional considerations specific to the metabolic phenotype: obstructive sleep apnoea, difficult airway/positioning, insulin resistance and perioperative glycaemic control, higher cardiovascular risk (metabolic syndrome), and altered drug dosing from obesity and hepatic steatosis affecting volume of distribution and clearance.</li>
                    <li>Weight loss (bariatric surgery or medical, including GLP-1 agonists) is disease-modifying for early MASLD/NASH and may be recommended before elective major surgery where time and clinical urgency allow<InlineRef topicId="hepatic-disease" refLabel="NICE NG50" />.</li>
                  </ul>
                </div>
              </div>
            </section>

            <ExamPitfallsCallout
              accent="clinical"
              pitfalls={[
                "MELD > 15 or Child-Pugh C: avoid elective non-transplant surgery — 30-day mortality > 25%; discuss multidisciplinary deferral or transfer to a transplant centre.",
                "Do NOT 'correct' the INR with FFP. Cirrhotic coagulation is rebalanced; FFP adds volume and raises portal pressure without reducing bleeding.",
                "VTE prophylaxis is mandatory — cirrhosis is not a state of 'auto-anticoagulation'.",
                "Halothane is contraindicated in liver disease. Use sevoflurane or desflurane; avoid morphine, NSAIDs, large bolus thiopentone and benzodiazepines.",
                "Hepatorenal syndrome is treated with vasoconstrictor + albumin — diuretics, dopamine and aggressive crystalloid worsen outcome.",
                "Paracetamol limit in established cirrhosis is 2–3 g/24 h — not 4 g.",
              ]}
              />
              <TopicFaqs faqs={hepaticDiseaseFaqs} />
            </div>
          </ExamSection>
      }
    />
  );
};

export default HepaticDiseaseTopic;
