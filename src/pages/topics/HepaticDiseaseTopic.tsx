import { TopicTemplate } from "@/components/TopicTemplate";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { ExamMappingBadges } from "@/components/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { InlineRef } from "@/components/InlineRef";
import { hepaticDiseaseQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

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
        objectives: ["BJA Educ Liver 2010", "BJA Educ Cirrhosis 2017", "Teh 2007", "EASL 2018 Decompensated", "NICE NG50"],
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

            {/* Risk stratification */}
            <section>
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
            <section>
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
            <section>
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
            <section>
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
            <section>
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
                  <h3 className="font-semibold text-foreground mb-2">Variceal Haemorrhage</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Resuscitate with restrictive transfusion (target Hb 70–80 g/L); terlipressin 2 mg IV bolus then 1–2 mg 4-hourly + IV ceftriaxone; urgent OGD with band ligation within 12 h.</li>
                    <li>Anaesthesia for emergency endoscopy: RSI with cuffed ETT (aspiration risk), large-bore access, blood and platelets in theatre, vasopressor support.</li>
                    <li>Sengstaken–Blakemore tube as temporising measure if endoscopy fails; consider TIPSS as definitive therapy.</li>
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
          </div>
        </ExamSection>
      }
    />
  );
};

export default HepaticDiseaseTopic;
