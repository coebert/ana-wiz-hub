import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { bariatricAnaesthesiaQuestions } from "@/data/quizzes";
import BariatricProceduresDiagram from "@/components/diagrams/clinical/BariatricProceduresDiagram";
import StopBangCalculator from "@/components/diagrams/clinical/StopBangCalculator";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";


const bariatricAnaesthesiaFaqs: Array<[string, string]> = [
  [
    "How are induction and maintenance drug doses calculated in obesity?",
    "Use ideal body weight (IBW) for propofol induction and remifentanil; lean body weight (LBW) for propofol maintenance and rocuronium; ideal body weight (IBW) for suxamethonium at 1–1.5 mg/kg; total body weight (TBW) for paracetamol (max 4 g/day), antibiotics and sugammadex; and adjusted body weight for aminoglycosides."
  ],
  [
    "What is the recommended pre-oxygenation and intubation position for the obese patient?",
    "Ramped (HELP — Head-Elevated Laryngoscopy Position) with the external auditory meatus aligned with the sternal notch, 25° head-up, 100 % oxygen for ≥3 min with CPAP/NIV if tolerated, and apnoeic oxygenation via nasal cannula. This maximises FRC and prolongs safe apnoea time."
  ],
  [
    "When is awake fibreoptic intubation indicated in bariatric anaesthesia?",
    "Predicted difficult mask ventilation AND difficult intubation (e.g. neck circumference >60 cm with Mallampati III/IV, severe OSA, prior failed intubation, limited mouth opening or neck extension). Otherwise, ramped position with video laryngoscopy is the default. Always have a Plan B (SAD) and Plan C (front-of-neck access) ready."
  ]
];

const BariatricAnaesthesiaTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Drug dosing in the morbidly obese patient",
    scenario: "A 145 kg (BMI 48) woman for laparoscopic sleeve gastrectomy. Calculate induction doses for propofol, fentanyl, rocuronium and suxamethonium, and explain the scalar used for each.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Compute weights: TBW 145, IBW ≈ 60 kg (female), LBW ≈ 75 kg (Janmahasatian), ABW = IBW + 0.4(TBW−IBW) ≈ 94 kg</li>
          <li>Propofol induction by LBW (reduces overdose); maintenance by ABW</li>
          <li>Fentanyl by LBW (lipophilic but distribution well predicted by LBW)</li>
          <li>Rocuronium by IBW (hydrophilic, distributes to lean mass) — TBW dosing prolongs duration</li>
          <li>Suxamethonium 1–1.5 mg/kg <strong>IBW</strong> — although plasma cholinesterase activity and extracellular fluid rise in obesity, TBW dosing gives an unnecessarily large dose with more myalgia, hyperkalaemia and prolonged apnoea; 1–1.5 mg/kg IBW reliably provides intubating conditions</li>
          <li>Sugammadex 2–4 mg/kg <strong>TBW</strong> — the dose must match the amount of rocuronium in the body, and TBW is the recommended scalar for reliable, complete reversal</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Using TBW for rocuronium → markedly prolonged paralysis</li>
          <li>Dosing suxamethonium on TBW → excessive dose, myalgia and prolonged apnoea; dose on IBW instead</li>
          <li>Dosing sugammadex on IBW or ABW → incomplete reversal and recurarisation</li>
          <li>Ramped position not used → failed mask ventilation and intubation</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Propofol/LBW (~150 mg), fentanyl/LBW, rocuronium/IBW (~60 mg), suxamethonium 1–1.5 mg/kg IBW (~60–90 mg), sugammadex on TBW. Position ramped, pre-oxygenate with CPAP/PEEP.",

    cites: ["BJA Educ Bariatric 2015", "AAGBI Obesity 2015", "STOP-BANG"],
  },
];

const BariatricAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Bariatric Anaesthesia"
      subtitle="FRCA Final — Clinical"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="bariatric-anaesthesia"
      topicTitle="Bariatric Anaesthesia"
      workedExamples={BariatricAnaesthesiaTopicWorkedExamples}
      quizQuestions={bariatricAnaesthesiaQuestions}
      objectives={[
        "Describe the physiological changes of obesity relevant to anaesthesia",
        "Apply weight scalars (LBW, IBW, ABW, TBW) appropriately to anaesthetic drug dosing",
        "Plan safe airway management including ramped positioning and apnoeic oxygenation",
        "Recognise and risk-stratify obstructive sleep apnoea using STOP-BANG",
        "Outline postoperative care priorities including analgesia and VTE prophylaxis",
      ]}
      keyPoints={[
        { text: "FRC falls dramatically in obesity — may fall below closing capacity causing shunt even during tidal breathing", cites: ["BJA Educ Bariatric 2015"] },
        { text: "Ramped position + head-up tilt + apnoeic oxygenation are essential for safe airway management", cites: ["SOBA 2022"] },
        { text: "Drug dosing: LBW for propofol/remifentanil, IBW for rocuronium and suxamethonium (1–1.5 mg/kg IBW), TBW for sugammadex", cites: ["AAGBI Obesity 2015"] },
        { text: "STOP-BANG ≥5 = high-risk OSA. Screen for OHS (daytime hypercapnia) if BMI ≥30 + OSA", cites: ["AAGBI Obesity 2015"] },
        { text: "Postoperative: head-up positioning, resume CPAP, continuous SpO₂, multimodal opioid-sparing analgesia", cites: ["BJA Educ Bariatric 2015"] },
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ Bariatric 2015",
          "AAGBI Obesity 2015",
          "STOP-BANG",
          "SOBA 2022",
        ],
        keyPoints: [
          "BJA Educ Bariatric 2015",
          "AAGBI Obesity 2015",
          "STOP-BANG",
          "SOBA 2022",
          "GLP-1 Consensus 2025",
        ],

      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.FINAL]} className="scroll-mt-24">
        <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Obesity: Definitions & Epidemiology</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>BMI classification</strong>: overweight 25–29.9, obese I 30–34.9, obese II 35–39.9, obese III (severe) ≥40, super-obese ≥50 kg/m²</li>
            <li><strong>Metabolic syndrome</strong>: central obesity + ≥2 of: ↑ TG, ↓ HDL, ↑ BP, ↑ fasting glucose. Increases perioperative cardiovascular risk</li>
            <li><strong>Fat distribution</strong>: central (android) adiposity carries greater risk than peripheral (gynoid). Waist circumference &gt;102 cm (M) or &gt;88 cm (F) = high risk</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Physiological Changes</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Respiratory</strong>: ↓ FRC (up to 50%), ↓ ERV, ↓ compliance, ↑ airway resistance, ↑ O₂ consumption, ↑ CO₂ production. FRC may fall below closing capacity → atelectasis and shunt even during tidal breathing</li>
            <li><strong>Cardiovascular</strong>: ↑ blood volume, ↑ CO, ↑ LV work, concentric then eccentric hypertrophy. Pulmonary hypertension in severe obesity. Diastolic dysfunction common</li>
            <li><strong>GI</strong>: ↑ gastric volume, ↓ pH, ↑ intra-abdominal pressure, ↑ incidence of hiatus hernia and GORD → aspiration risk</li>
            <li><strong>Airway</strong>: ↑ neck circumference, ↑ Mallampati score, ↓ mouth opening, ↑ risk of difficult mask ventilation and intubation. OSA prevalence 40–90%</li>
            <li><strong>Pharmacokinetic</strong>: ↑ Vd for lipophilic drugs, ↑ lean body mass, altered hepatic/renal clearance. Use ideal/adjusted body weight for dosing (see below)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Drug Dosing in Obesity</h2>
          <div className="bg-card border border-border rounded-lg p-4 mb-4">
            <p className="text-sm font-semibold text-foreground mb-2">Weight Scalars</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Total body weight (TBW)</strong>: actual weight</li>
              <li><strong>Ideal body weight (IBW)</strong>: M = 50 + 2.3 × (height in inches − 60); F = 45.5 + 2.3 × (height in inches − 60)</li>
              <li><strong>Lean body weight (LBW)</strong>: James formula — M: 1.1 × TBW − 128 × (TBW/height)²; F: 1.07 × TBW − 148 × (TBW/height)²</li>
              <li><strong>Adjusted body weight (ABW)</strong>: IBW + 0.4 × (TBW − IBW)</li>
            </ul>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-2.5 font-semibold text-foreground border-b border-border">Drug</th>
                  <th className="text-left p-2.5 font-semibold text-foreground border-b border-border">Dose on</th>
                  <th className="text-left p-2.5 font-semibold text-foreground border-b border-border">Rationale</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td colSpan={3} className="p-2 font-semibold text-foreground bg-muted/30">Induction Agents</td></tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Propofol (induction)</td>
                  <td className="p-2.5 font-medium text-foreground">LBW</td>
                  <td className="p-2.5">Moderately lipophilic; Vd ↑ but not proportional to TBW. 1.5–2.5 mg/kg LBW</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Propofol (TCI maintenance)</td>
                  <td className="p-2.5 font-medium text-foreground">Model-dependent</td>
                  <td className="p-2.5">Schnider: enter age, height, sex and TBW — the model derives lean body mass internally, so do <strong>not</strong> substitute a lower weight. Marsh (weight-only) is <strong>not recommended</strong> in obesity because it grossly over-predicts required dose; if it is the only model available, enter LBW as the weight. Eleveld handles obesity best</td>
                </tr>

                <tr className="border-b border-border">
                  <td className="p-2.5">Thiopentone</td>
                  <td className="p-2.5 font-medium text-foreground">LBW</td>
                  <td className="p-2.5">Highly lipophilic but redistribution-dependent offset; overdose → prolonged sedation</td>
                </tr>

                <tr className="border-b border-border"><td colSpan={3} className="p-2 font-semibold text-foreground bg-muted/30">Opioids</td></tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Remifentanil</td>
                  <td className="p-2.5 font-medium text-foreground">LBW / IBW</td>
                  <td className="p-2.5">Clearance correlates with lean mass. TBW dosing → apnoea, bradycardia</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Fentanyl (bolus)</td>
                  <td className="p-2.5 font-medium text-foreground">LBW / ABW</td>
                  <td className="p-2.5">Lipophilic → large Vd but clearance unchanged. Titrate to effect</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Morphine</td>
                  <td className="p-2.5 font-medium text-foreground">IBW</td>
                  <td className="p-2.5">Hydrophilic; Vd does not increase proportionally with fat. Dose to IBW, titrate carefully</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Alfentanil</td>
                  <td className="p-2.5 font-medium text-foreground">LBW</td>
                  <td className="p-2.5">Moderately lipophilic; smaller Vd than fentanyl. Clearance correlates with lean mass</td>
                </tr>

                <tr className="border-b border-border"><td colSpan={3} className="p-2 font-semibold text-foreground bg-muted/30">Neuromuscular Blocking Agents</td></tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Succinylcholine</td>
                  <td className="p-2.5 font-medium text-foreground">IBW</td>
                  <td className="p-2.5"><strong>1–1.5 mg/kg IBW</strong> gives reliable intubating conditions. Plasma cholinesterase activity and extracellular volume do rise in obesity, but TBW dosing produces an unnecessarily large dose with more myalgia, hyperkalaemia and prolonged apnoea<InlineRef topicId="bariatric-anaesthesia" refLabel="AAGBI Obesity 2015" /></td>
                </tr>

                <tr className="border-b border-border">
                  <td className="p-2.5">Rocuronium</td>
                  <td className="p-2.5 font-medium text-foreground">IBW</td>
                  <td className="p-2.5">Hydrophilic — Vd does not increase with fat mass. TBW dosing → prolonged block. 0.6–1.2 mg/kg IBW</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Atracurium / Cisatracurium</td>
                  <td className="p-2.5 font-medium text-foreground">IBW</td>
                  <td className="p-2.5">Hydrophilic with organ-independent elimination (Hofmann). Dose to IBW</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Vecuronium</td>
                  <td className="p-2.5 font-medium text-foreground">IBW</td>
                  <td className="p-2.5">Hydrophilic. Dose to IBW to avoid prolonged duration</td>
                </tr>

                <tr className="border-b border-border"><td colSpan={3} className="p-2 font-semibold text-foreground bg-muted/30">Reversal Agents</td></tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Sugammadex</td>
                  <td className="p-2.5 font-medium text-foreground">TBW</td>
                  <td className="p-2.5"><strong>TBW is the recommended scalar</strong> (2 mg/kg at TOF count ≥2, 4 mg/kg at post-tetanic count 1–2, 16 mg/kg for immediate reversal). The dose must encapsulate all the rocuronium in the body — IBW or ABW dosing risks incomplete reversal and recurarisation<InlineRef topicId="bariatric-anaesthesia" refLabel="AAGBI Obesity 2015" /></td>
                </tr>

                <tr className="border-b border-border">
                  <td className="p-2.5">Neostigmine</td>
                  <td className="p-2.5 font-medium text-foreground">IBW</td>
                  <td className="p-2.5">Dose to IBW (max 70 µg/kg). Ceiling effect — higher doses ↑ muscarinic side effects</td>
                </tr>

                <tr className="border-b border-border"><td colSpan={3} className="p-2 font-semibold text-foreground bg-muted/30">Volatiles & Other Agents</td></tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Volatile agents</td>
                  <td className="p-2.5 font-medium text-foreground">Titrate to effect</td>
                  <td className="p-2.5">Desflurane/sevoflurane preferred (low blood:gas solubility → faster wash-out). Obesity may ↑ uptake into fat but recovery still faster with low-solubility agents</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Ketamine</td>
                  <td className="p-2.5 font-medium text-foreground">IBW</td>
                  <td className="p-2.5">Lipophilic but dose to IBW for analgesic doses (0.15–0.3 mg/kg). Useful opioid-sparing adjunct</td>
                </tr>

                <tr className="border-b border-border"><td colSpan={3} className="p-2 font-semibold text-foreground bg-muted/30">Antibiotics & Anticoagulants</td></tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Gentamicin / Aminoglycosides</td>
                  <td className="p-2.5 font-medium text-foreground">ABW</td>
                  <td className="p-2.5">Distribute into extracellular water which ↑ with obesity but not proportionally. ABW + levels</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">Cephalosporins (e.g. cefazolin)</td>
                  <td className="p-2.5 font-medium text-foreground">TBW-based</td>
                  <td className="p-2.5">2 g if &lt;120 kg, 3 g if ≥120 kg (surgical prophylaxis). Redose at 4 h</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2.5">LMWH (enoxaparin)</td>
                  <td className="p-2.5 font-medium text-foreground">TBW (with cap)</td>
                  <td className="p-2.5">Prophylaxis: 40 mg BD if BMI &gt;40 or TBW &gt;120 kg. Treatment: 1 mg/kg BD, consider anti-Xa monitoring</td>
                </tr>
                <tr>
                  <td className="p-2.5">Paracetamol</td>
                  <td className="p-2.5 font-medium text-foreground">IBW / 1 g fixed</td>
                  <td className="p-2.5">Standard 1 g dose appropriate. Do NOT scale to TBW — hepatotoxicity risk</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-3 p-3 rounded-lg border border-border bg-secondary/20">
            <p className="text-xs font-semibold text-foreground mb-1">Key Principles</p>
            <ul className="text-xs text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
              <li><strong>Hydrophilic drugs</strong> (NMBAs, morphine): dose to IBW — they distribute in lean tissue/ECF, not fat</li>
              <li><strong>Lipophilic drugs</strong> (propofol, fentanyl, benzodiazepines): Vd ↑ but not linearly with fat — use LBW and titrate</li>
              <li><strong>Always titrate to effect</strong> — no single scalar is perfect. Use neuromuscular monitoring, BIS, and clinical endpoints</li>
              <li><strong>TCI models</strong>: the <strong>Schnider</strong> model computes lean body mass from the covariates you enter (age, height, sex and total body weight) — enter the patient's actual TBW and let the model do the adjustment. The <strong>Marsh</strong> model is <em>not recommended</em> in obesity because it scales linearly with weight; if no alternative exists, enter LBW as the weight. The <strong>Eleveld</strong> model is validated across weight extremes and handles obesity best<InlineRef topicId="bariatric-anaesthesia" refLabel="BJA Educ Bariatric 2015" /></li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Preoperative Assessment</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Airway</strong>: STOP-BANG screening for OSA (≥5 = high risk). CPAP compliance? Difficult airway plan essential</li>
            <li><strong>Cardiorespiratory</strong>: ECG (LVH, RV strain), echocardiography if suspected heart failure or pulmonary hypertension, ABG if BMI &gt;50 or suspected OHS</li>
            <li><strong>Obesity hypoventilation syndrome (OHS)</strong>: BMI ≥30 + daytime hypercapnia (PaCO₂ &gt;6 kPa) in absence of other cause. Prevalence 10–20% of obese patients with OSA. Associated with ↑ perioperative mortality</li>
            <li><strong>Functional capacity</strong>: often limited — Duke Activity Status Index may be more useful than exercise tolerance history</li>
            <li><strong>VTE risk</strong>: high — consider enhanced thromboprophylaxis (weight-adjusted LMWH)</li>
          </ul>
          <div className="mt-4">
            <StopBangCalculator />
          </div>

          <div className="mt-4 bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">GLP-1 Receptor Agonist Management</h3>
            <p className="text-sm text-muted-foreground mb-2">
              GLP-1 receptor agonists (semaglutide, liraglutide, dulaglutide, tirzepatide) are now common in obese and diabetic surgical patients. They <strong className="text-foreground">delay gastric emptying</strong>, and residual gastric contents have been demonstrated despite adherence to standard fasting rules<InlineRef topicId="bariatric-anaesthesia" refLabel="GLP-1 Consensus 2025" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Continue the drug</strong>: the multidisciplinary consensus is that GLP-1 receptor agonists are <em>continued</em> peri-operatively for elective surgery — stopping them risks loss of glycaemic control and offers no proven aspiration benefit</li>
              <li><strong>Assess symptoms</strong>: ask specifically about nausea, vomiting, bloating, early satiety, dyspepsia and abdominal pain, and about recent dose escalation — symptomatic patients are the group with a genuinely increased aspiration risk</li>
              <li><strong>Individualised aspiration-risk assessment</strong>: combine GLP-1 symptoms with the usual risk factors (GORD, hiatus hernia, diabetic gastroparesis, raised intra-abdominal pressure, emergency surgery)</li>
              <li><strong>Where risk is judged increased</strong>: consider gastric ultrasound to assess antral contents, and/or a rapid sequence induction with tracheal intubation; a longer clear-fluid-only period may be used, but is not a substitute for airway protection when the stomach is not empty</li>
              <li><strong>Shared decision-making</strong>: discuss the residual aspiration risk, the plan, and the alternative of deferring surgery with the patient, and document that conversation</li>
            </ul>
          </div>
        </div>


        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intraoperative Management</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Positioning</strong>: ramped/head-up position (ear to sternal notch alignment). ↑ FRC, improves laryngoscopic view, delays desaturation during apnoea</li>
            <li><strong>Preoxygenation</strong>: 25° head-up, CPAP/BiPAP preoxygenation, high-flow nasal O₂ (apnoeic oxygenation). Target EtO₂ &gt;90%</li>
            <li><strong>Intubation</strong>: videolaryngoscopy as first-line. Have Plan B/C/D ready (DAS guidelines)</li>
            <li><strong>Ventilation</strong>: pressure-controlled or volume-guaranteed. PEEP 8–15 cmH₂O, recruitment manoeuvres, tidal volume 6–8 ml/kg IBW, FiO₂ 0.4–0.8</li>
            <li><strong>Pneumoperitoneum</strong>: ↑ IAP further compromises FRC. ↑ peak airway pressures, ↓ venous return, ↑ SVR. Steep Trendelenburg worsens respiratory mechanics</li>
            <li><strong>Monitoring</strong>: invasive BP if standard cuff unreliable (cone-shaped arm). Use appropriate cuff size (bladder width ≥40% arm circumference)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bariatric Surgery Specifics</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Procedures</strong>: Roux-en-Y gastric bypass (RYGB), sleeve gastrectomy, adjustable gastric band. Laparoscopic approach standard</li>
            <li><strong>Enhanced recovery</strong>: multimodal analgesia (avoid opioids where possible), early mobilisation, VTE prophylaxis, anti-emetics</li>
            <li><strong>Anastomotic leak</strong>: most serious early complication. Tachycardia may be only sign. CT with oral contrast for diagnosis</li>
            <li><strong>Rhabdomyolysis</strong>: prolonged surgery in morbidly obese. Monitor CK, ensure adequate hydration</li>
          </ul>
          <div className="mt-4">
            <BariatricProceduresDiagram />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postoperative Care</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Recovery position</strong>: 30–45° head-up. Continuous SpO₂ monitoring. Resume CPAP immediately if OSA</li>
            <li><strong>Analgesia</strong>: multimodal — paracetamol, NSAIDs (if renal function permits), TAP/rectus sheath blocks, ketamine infusion, opioid-sparing. PCA if needed (dose to LBW)</li>
            <li><strong>HDU/ICU</strong>: consider if BMI &gt;50, severe OSA/OHS, significant comorbidities, or intraoperative complications</li>
            <li><strong>VTE prophylaxis</strong>: mechanical + pharmacological, extended duration (see below)</li>
          </ul>

          <div className="mt-4 bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Extubation Strategy in the Obese Patient</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Extubation, not intubation, is when most obese patients come to harm — reduced FRC, upper-airway collapsibility, residual opioid and neuromuscular blockade all converge in recovery<InlineRef topicId="bariatric-anaesthesia" refLabel="AAGBI Obesity 2015" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Criteria before extubation</strong>: fully awake and obeying commands, TOF ratio ≥0.9 confirmed by quantitative monitoring (reverse with sugammadex on TBW if any doubt), adequate tidal volumes with a regular respiratory pattern, normothermia, effective analgesia with minimal residual opioid, and haemodynamic stability</li>
              <li><strong>Position</strong>: extubate in the sitting or 30–45° head-up (ramped) position — never supine; this preserves FRC and reduces the work of breathing</li>
              <li><strong>Technique</strong>: pre-oxygenate to EtO₂ &gt;90%, apply a recruitment manoeuvre then extubate on CPAP/PEEP to avoid derecruitment, and consider an <strong className="text-foreground">airway exchange catheter</strong> where intubation was difficult, the airway is oedematous, or re-intubation is anticipated (DAS extubation guidelines — "at-risk" extubation)</li>
              <li><strong>Immediate postoperative support</strong>: apply the patient's own CPAP or NIV promptly in known OSA/OHS, before hypoventilation develops; high-flow nasal oxygen is a useful alternative</li>
              <li><strong>Monitoring</strong>: extended recovery with continuous SpO₂ (and capnography where opioids are running); admit to HDU/level 2 if BMI &gt;50, severe OSA/OHS, significant comorbidity, opioid-dependent analgesia or a difficult airway</li>
              <li><strong>Readiness to re-intubate</strong>: keep the difficult airway trolley, videolaryngoscope, a skilled assistant and drugs immediately available in recovery, and document a clear re-intubation plan; do not transfer the patient to the ward until stable off support</li>
            </ul>
          </div>

          <div className="mt-4 bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Venous Thromboembolism Risk & Prophylaxis</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Obesity is an independent risk factor for VTE, and bariatric surgery adds pelvic venous stasis, pneumoperitoneum and reduced early mobility. Pulmonary embolism remains a leading cause of postoperative death after bariatric surgery<InlineRef topicId="bariatric-anaesthesia" refLabel="AAGBI Obesity 2015" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Pathophysiology</strong>: adipose tissue is pro-inflammatory and pro-thrombotic — raised fibrinogen, factor VIII, von Willebrand factor and PAI-1 with impaired fibrinolysis; raised intra-abdominal pressure and venous stasis in the lower limbs; endothelial dysfunction and chronic low-grade inflammation. This is Virchow's triad in full</li>
              <li><strong>Additional risk factors</strong>: BMI ≥40 (especially ≥50), previous VTE or known thrombophilia, immobility, OSA/OHS and pulmonary hypertension, venous insufficiency, malignancy, oestrogen-containing contraception or HRT, smoking, age &gt;40, and prolonged (&gt;3 h) or revisional laparoscopic surgery</li>
              <li><strong>Weight-adjusted LMWH</strong>: standard fixed prophylactic doses under-dose obese patients. Typical practice is enoxaparin 40 mg 12-hourly for BMI &gt;40 or weight &gt;120 kg (or a weight-based 0.5 mg/kg 12-hourly regimen), with the first dose timed to surgical haemostasis. Consider <strong className="text-foreground">anti-Xa monitoring</strong> (peak 3–4 h post-dose, prophylactic target ~0.2–0.5 IU/mL) at weight extremes, in renal impairment, or where dosing is uncertain</li>
              <li><strong>Mechanical prophylaxis</strong>: correctly sized intermittent pneumatic compression applied <em>before</em> induction and continued until mobile; graduated stockings often fit poorly in severe obesity. IPC is essential when pharmacological prophylaxis must be delayed for bleeding risk</li>
              <li><strong>Extended prophylaxis</strong>: continue for <strong className="text-foreground">up to 28 days after discharge</strong> in high-risk patients (previous VTE, BMI ≥50, prolonged or revisional surgery, reduced mobility, thrombophilia, malignancy) — most post-bariatric VTE occurs after the patient has gone home</li>
              <li><strong>Early mobilisation and hydration</strong>: mobilise within hours of surgery as part of the enhanced recovery pathway, maintain euvolaemia, and provide clear written discharge advice on injection technique and the symptoms of DVT and PE</li>
              <li><strong>IVC filters</strong> are not recommended routinely — evidence of harm without mortality benefit</li>
            </ul>
          </div>
        </div>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Reduced FRC and rapid desaturation — pre-oxygenate ramped, head-up, with CPAP/NIV; consider apnoeic oxygenation.",
              "Drug dosing: lipophilic drugs (fentanyl, midazolam) — total body weight for loading; lean body weight for maintenance; propofol induction by LBW.",
              "Suxamethonium 1–1.5 mg/kg IBW; rocuronium by IBW; sugammadex by TBW.",
              "High OSA/OHS prevalence — screen with STOP-BANG; postoperative CPAP and HDU monitoring after opioids.",
              "VTE risk is very high — combine mechanical and pharmacological prophylaxis and mobilise early.",
            ]}
          />
      </section>
      </ExamSection>
          <TopicFaqs faqs={bariatricAnaesthesiaFaqs} />
        </>
      }
    />
  );
};

export default BariatricAnaesthesiaTopic;
