import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/ExamSection";
import { acutePancreatitisQuestions } from "@/data/quizzes";
import GlasgowImrieScoreDiagram from "@/components/diagrams/GlasgowImrieScoreDiagram";
import WaterfallFluidDiagram from "@/components/diagrams/WaterfallFluidDiagram";
import PancreatitisAutodigestionDiagram from "@/components/diagrams/PancreatitisAutodigestionDiagram";
import SeverePancreatitisCTDiagram from "@/components/diagrams/SeverePancreatitisCTDiagram";
import PancreatitisEvolutionTimeline from "@/components/diagrams/PancreatitisEvolutionTimeline";
import { DiagramSection } from "@/components/DiagramSection";
import type { WorkedExample } from "@/components/WorkedExamples";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const acutePancreatitisFaqs: Array<[string, string]> = [
  ["How is severity stratified in acute pancreatitis?", "Use the revised Atlanta classification: mild (no organ failure or complications), moderate (transient organ failure <48 h or local complications), severe (persistent organ failure >48 h); supplement with APACHE II and CRP >150 at 48 h."],
  ["What is the role of early enteral nutrition?", "Start enteral feeding within 24–72 h via nasogastric or nasojejunal route — it maintains gut barrier, reduces infected necrosis and lowers mortality compared with TPN (PYTHON trial, IAP/APA guidelines)."],
  ["When should antibiotics be given in severe pancreatitis?", "Only for proven or strongly suspected infected necrosis (gas on CT, positive FNA culture) or extra-pancreatic infection — routine prophylactic antibiotics do not improve outcome and promote fungal superinfection."],
];

const objectives = [
  "Diagnose acute pancreatitis using the Atlanta 2012 criteria and stratify severity with Glasgow (Imrie), APACHE-II and CRP at 48 h.",
  "Apply the WATERFALL moderate fluid strategy with balanced crystalloid and avoid the harms of aggressive resuscitation.",
  "Justify the use of early enteral nutrition (NG/NJ within 24–72 h) over TPN.",
  "Decide when antibiotics, ERCP and cholecystectomy are indicated — and when they are not.",
  "Apply the step-up approach to pancreatic necrosis (drainage → minimally invasive → open) and recognise infected necrosis.",
  "Identify systemic complications (ARDS, AKI, ACS, splanchnic vein thrombosis) and trigger tertiary HPB/ICU referral.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Glasgow (Imrie) severity at 48 h",
    scenario: (
      <>
        58-year-old with gallstone pancreatitis. At 48 h: PaO₂ 7.6 kPa on 4 L O₂, WBC 18, Ca²⁺ 1.85 mmol/L,
        urea 18 mmol/L, AST 240, albumin 28 g/L, glucose 12 mmol/L. CRP 220 mg/L.
      </>
    ),
    working: (
      <>
        Glasgow criteria met: PaO₂ &lt;8, age &gt;55, WBC &gt;15, Ca²⁺ &lt;2.0, urea &gt;16, AST &gt;200,
        albumin &lt;32, glucose &gt;10 — score 8/8. CRP &gt;150 at 48 h corroborates severe disease.
      </>
    ),
    answer: (
      <>
        Predicted severe acute pancreatitis. Escalate to HDU/ICU, refer to tertiary HPB centre, plan
        contrast-enhanced CT at 72–96 h, ensure early enteral feeding, lung-protective ventilation if
        ARDS develops.
      </>
    ),
   cites: ["IAP/APA 2013"],
  },
  {
    title: "WATERFALL fluid prescription",
    scenario: (
      <>
        70 kg patient with acute pancreatitis, MAP 78, lactate 1.6, urine output 0.6 mL/kg/h, no clinical
        signs of hypovolaemia. The on-call SHO suggests a 20 mL/kg bolus and 3 mL/kg/h Ringer's lactate.
      </>
    ),
    working: (
      <>
        WATERFALL (NEJM 2022) was stopped early: aggressive arm = 20.5 % fluid overload vs 6.3 % moderate,
        with no benefit on disease progression. The patient is normovolaemic — no bolus is indicated.
        Maintenance = 1.5 mL/kg/h × 70 kg ≈ 105 mL/h Hartmann's.
      </>
    ),
    answer: (
      <>
        No bolus. Run Hartmann's at ~ 105 mL/h (1.5 mL/kg/h). Reassess at 12, 24, 48 and 72 h targeting
        MAP ≥ 65, UO ≥ 0.5 mL/kg/h, falling lactate, BUN and HCT. Use noradrenaline if MAP target unmet
        once euvolaemic — do not chase MAP with more fluid.
      </>
    ),
   cites: ["Atlanta 2012"],
  },
  {
    title: "Suspected infected necrosis at day 12",
    scenario: (
      <>
        Severe necrotising pancreatitis. Initially improving, but at day 12 the patient is febrile to
        39 °C, WCC rising, new noradrenaline requirement. CT shows extensive walled-off necrosis with
        gas bubbles within the collection.
      </>
    ),
    working: (
      <>
        Gas in a necrotic collection plus clinical deterioration is highly suggestive of infected
        necrosis — a leading cause of late mortality. Carbapenems have the best pancreatic penetration.
        Step-up source control (PANTER trial): percutaneous or endoscopic transgastric drainage first,
        not immediate open necrosectomy.
      </>
    ),
    answer: (
      <>
        Start meropenem, blood and (if accessible) FNA cultures. Discuss with HPB MDT for endoscopic
        transgastric or percutaneous drainage as the first step; reserve VARD or open necrosectomy for
        failed minimally invasive approach. Delay any intervention beyond 4 weeks where possible to
        allow demarcation.
      </>
    ),
   cites: ["WATERFALL 2022"],
  },
];

const keyPoints = [
  { text: "Diagnose with 2 of 3: typical pain + amylase/lipase ≥3× ULN + characteristic imaging (Atlanta 2012)", cites: ["WATERFALL 2022"] },
  { text: "Severity stratification: Glasgow (Imrie), APACHE-II ≥8, BISAP, CRP >150 at 48h, persistent organ failure >48h", cites: ["Atlanta 2012"] },
  { text: "I GET SMASHED — gallstones (50%) and ethanol (25%) account for most UK cases", cites: ["IAP/APA 2013"] },
  { text: "Fluids (WATERFALL/AGA 2024): balanced crystalloid (Ringer's lactate) — 10 mL/kg bolus only if hypovolaemic, then 1.5 mL/kg/h, reassess at 12/24/48/72h. Aggressive resuscitation causes fluid overload (20.5% vs 6.3%) with no clinical benefit", cites: ["BSG 2024"] },
  { text: "Early enteral nutrition (NG/NJ) within 24–72h reduces infectious complications and mortality vs TPN", cites: ["BJA Educ 2018"] },
  { text: "Prophylactic antibiotics are NOT indicated — only for proven infection or infected necrosis (carbapenem)", cites: ["PANTER 2010"] },
  { text: "ERCP within 24–72h only for cholangitis or persistent biliary obstruction; cholecystectomy same admission for mild gallstone pancreatitis", cites: ["WATERFALL 2022"] },
  { text: "Step-up approach to necrosis (PANTER trial): drainage → minimally invasive → open necrosectomy as last resort, delay >4 weeks", cites: ["Atlanta 2012"] },
  { text: "Refer early to tertiary HPB/ICU centre for severe disease, necrosis, organ failure, or need for IR/advanced endoscopy", cites: ["IAP/APA 2013"] },
];

const AcutePancreatitisTopic = () => {
  return (
    <TopicTemplate
      title="Acute Severe Pancreatitis"
      subtitle="FRCA Final / FFICM — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="acute-pancreatitis"
      topicTitle="Acute Severe Pancreatitis"
      quizQuestions={acutePancreatitisQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "IAP/APA 2013",
          "Atlanta 2012",
          "WATERFALL 2022",
          "PANTER 2010",
          "BJA Educ 2018",
          "BSG 2024",
        ],
        keyPoints: [
          "IAP/APA 2013",
          "Atlanta 2012",
          "WATERFALL 2022",
          "PANTER 2010",
          "BJA Educ 2018",
          "BSG 2024",
        ],
        workedExamples: ["IAP/APA 2013", "Atlanta 2012", "WATERFALL 2022"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
        <section className="space-y-6">
          {/* Definition */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Definition & Severity</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Acute pancreatitis is acute inflammation of the pancreas characterised by abdominal pain, raised serum
            amylase/lipase (≥3× upper limit of normal) and/or characteristic imaging. The <strong>Revised Atlanta
            Classification (2012)</strong> stratifies severity:
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { sev: "Mild", desc: "No organ failure. No local or systemic complications. Self-limiting (~80%). Mortality &lt;1%." },
              { sev: "Moderately severe", desc: "Transient organ failure (&lt;48h) and/or local/systemic complications. Mortality ~5%." },
              { sev: "Severe", desc: "Persistent organ failure (&gt;48h) involving any of respiratory, cardiovascular or renal systems. Mortality 20–40%." },
            ].map((s) => (
              <div key={s.sev} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{s.sev}</p>
                <p className="text-sm text-muted-foreground mt-1" dangerouslySetInnerHTML={{ __html: s.desc }} />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3 italic">
            Organ failure is defined by the modified Marshall score (≥2 in respiratory, cardiovascular or renal systems).
          </p>
        </div>

        <div>
          <PancreatitisAutodigestionDiagram />
        </div>

        <DiagramSection
          title="Axial CT Features of Severe Acute Pancreatitis"
          intro={
            <>
              Contrast-enhanced CT (CECT) at 72–96 h after symptom onset is the imaging gold standard for assessing
              severity, necrosis and local complications. Earlier scans systematically under-call necrosis. Use this
              schematic to recognise the cardinal findings — and the ones that change management (gas in necrosis,
              splanchnic vein thrombosis, pleural effusion as a Glasgow criterion).
            </>
          }
        >
          <SeverePancreatitisCTDiagram />
        </DiagramSection>

        <DiagramSection
          title="Evolution of Necrosis & Fluid Collections Over Time"
          intro={
            <>
              The same anatomy looks radically different on day 1 versus week 6. The Atlanta 2012 classification
              names each morphological stage and dictates when intervention is safe — the cardinal rule is{" "}
              <em>hands-off in the first 4 weeks</em> until a wall has formed. Step through the timeline to see how
              interstitial oedema evolves to necrosis, then to walled-off necrosis amenable to step-up drainage.
            </>
          }
        >
          <PancreatitisEvolutionTimeline />
        </DiagramSection>

        {/* Causes */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Causes — "I GET SMASHED"</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { cause: "Idiopathic", detail: "10–20% — diagnosis of exclusion. Microlithiasis often missed; consider EUS." },
              { cause: "Gallstones", detail: "~50% in UK. ERCP within 72h if cholangitis or persistent biliary obstruction. Cholecystectomy on same admission for mild gallstone pancreatitis." },
              { cause: "Ethanol", detail: "~25%. Often relapsing. Address dependence." },
              { cause: "Trauma", detail: "Blunt abdominal injury, post-ERCP (5–10% risk; reduced by rectal NSAIDs + pancreatic stenting)." },
              { cause: "Steroids / Scorpion sting", detail: "Drug-induced (azathioprine, valproate, thiazides, GLP-1 agonists, asparaginase)." },
              { cause: "Mumps / viral", detail: "Mumps, CMV, Coxsackie, HIV, hepatitis." },
              { cause: "Autoimmune", detail: "IgG4-related (type 1) — responds to steroids. Diffuse 'sausage' pancreas on CT." },
              { cause: "Hypertriglyceridaemia / Hypercalcaemia", detail: "TG &gt;11.3 mmol/L (1000 mg/dL). Hyperparathyroidism, malignancy. Plasma exchange or insulin infusion for severe HTG." },
              { cause: "ERCP", detail: "Post-procedure pancreatitis. Rectal indomethacin/diclofenac is standard prophylaxis." },
              { cause: "Drugs", detail: "See above. Always review medication list." },
            ].map((c) => (
              <div key={c.cause} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{c.cause}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnosis */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Diagnosis</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Diagnosis requires <strong>2 of 3</strong> of the following (Atlanta criteria):
          </p>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 mb-4">
            <li>Characteristic abdominal pain (epigastric, radiating to back)</li>
            <li>Serum amylase or lipase ≥3× ULN (lipase more specific, stays elevated longer)</li>
            <li>Characteristic findings on contrast-enhanced CT, MRI or transabdominal ultrasound</li>
          </ol>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Initial investigations</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { test: "Bloods", detail: "FBC, U&E, LFT (ALT &gt;150 IU/L = 95% PPV for gallstone aetiology), Ca²⁺, glucose, lipids, CRP, lactate, ABG, coagulation, group & save." },
              { test: "Severity scores", detail: "Glasgow (Imrie ≥3), Ranson, APACHE-II ≥8, BISAP ≥3, CTSI/Balthazar. CRP &gt;150 mg/L at 48h predicts severe disease." },
              { test: "Imaging — initial", detail: "Transabdominal US within 24h to identify gallstones / dilated CBD. Erect CXR (exclude perforation, ARDS)." },
              { test: "Imaging — CT", detail: "Contrast-enhanced CT abdomen at 72–96h (not earlier — necrosis takes time to declare). Use modified CT severity index. MRCP if persistent jaundice or stone suspected." },
            ].map((t) => (
              <div key={t.test} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{t.test}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg border border-border bg-secondary/20">
            <p className="text-xs font-semibold text-foreground mb-1">Glasgow (Imrie) score — score ≥3 within 48h = severe</p>
            <p className="text-xs text-muted-foreground">
              <strong>PANCREAS:</strong> PaO₂ &lt;8 kPa · Age &gt;55 · Neutrophils (WBC) &gt;15 · Calcium &lt;2.0 mmol/L ·
              Renal urea &gt;16 mmol/L · Enzymes (LDH &gt;600 / AST &gt;200) · Albumin &lt;32 g/L · Sugar (glucose) &gt;10 mmol/L
            </p>
          </div>
          <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
            <GlasgowImrieScoreDiagram />
          </div>
        </div>

        {/* Initial Management */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Initial Management (first 24–72h)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Priorities are aggressive but goal-directed resuscitation, analgesia, identification of biliary obstruction
            and early severity stratification. Most deaths in the first week are from SIRS/MODS, not infection.
          </p>
          <div className="space-y-3">
            {[
              {
                topic: "A — Airway / B — Breathing",
                detail: "Supplemental O₂. Up to 60% develop hypoxaemia (atelectasis, pleural effusion, ARDS). Monitor for early ARDS — admit to HDU/ICU early if SpO₂ requirement, RR &gt;20, or working hard. Intubate for airway protection if encephalopathic or for ARDS lung-protective ventilation.",
              },
              {
                topic: "C — Circulation / Fluids (WATERFALL-aligned, current standard)",
                detail: "Use balanced crystalloid (Hartmann's / Ringer's lactate) — avoid 0.9% saline (hyperchloraemic acidosis, worsens SIRS). Assess volume status first: if hypovolaemic give a 10 mL/kg bolus of Ringer's lactate; if normovolaemic, no bolus is needed. Then run maintenance at 1.5 mL/kg/h LR. Reassess clinically and biochemically at 12, 24, 48 and 72h and titrate to MAP ≥65 mmHg, urine output ≥0.5 mL/kg/h, lactate clearance, falling BUN and HCT. The WATERFALL trial (NEJM 2022) was stopped early because aggressive resuscitation (20 mL/kg bolus + 3 mL/kg/h) caused significantly more fluid overload (20.5% vs 6.3%) and longer hospital stay without reducing progression to moderate/severe disease — moderate, goal-directed resuscitation is now standard (endorsed by AGA 2024 and BSG 2024). Vasopressors (noradrenaline) if MAP target unmet despite adequate volume — do NOT chase MAP with more fluid once euvolaemic.",
              },
              {
                topic: "D — Analgesia",
                detail: "Multimodal. Paracetamol + opioid (morphine or fentanyl PCA). Opioid concerns about Sphincter of Oddi spasm are largely theoretical — do not withhold. Consider thoracic epidural in severe cases (improves splanchnic perfusion, may reduce mortality — small trials).",
              },
              {
                topic: "E — Nutrition",
                detail: "Early enteral feeding within 24–72h (NG or NJ tube — both equivalent per multiple RCTs). Reduces infectious complications, MODS and mortality vs TPN. NBM only if ileus/obstruction. TPN reserved for those who fail enteral after 5–7 days.",
              },
              {
                topic: "F — Antibiotics",
                detail: "NOT routinely indicated. Prophylactic antibiotics do not reduce mortality or infected necrosis. Use only for proven extra-pancreatic infection (cholangitis, pneumonia, line sepsis) or proven infected necrosis (positive culture from FNA or gas on CT). Carbapenem (meropenem) if needed — best pancreatic penetration.",
              },
              {
                topic: "G — Glycaemic / metabolic",
                detail: "Target glucose 6–10 mmol/L. Correct hypocalcaemia (sign of severity, fat saponification). Replace Mg²⁺, K⁺, PO₄³⁻. Insulin infusion if HTG-induced (drops triglycerides rapidly).",
              },
              {
                topic: "H — Specific therapies",
                detail: "ERCP within 24–72h if acute cholangitis or persistent biliary obstruction (NOT routinely for all gallstone pancreatitis). Cholecystectomy on same admission for mild gallstone pancreatitis (reduces recurrence). For HTG-induced: insulin infusion ± plasmapheresis if persistent TG &gt;11 mmol/L with organ failure.",
              },
            ].map((s) => (
              <div key={s.topic} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{s.topic}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
            <WaterfallFluidDiagram />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ongoing Management (beyond 72h)</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Daily reassessment</strong>: SOFA score, fluid balance, abdominal girth (intra-abdominal hypertension is common — measure bladder pressure if oliguric/distended; IAH &gt;12 mmHg, ACS &gt;20 mmHg with new organ failure).</li>
            <li><strong>Repeat CECT</strong> at 7–10 days (or sooner if deterioration) to assess for necrosis, walled-off necrosis (WON), pseudocyst, vascular complications.</li>
            <li><strong>Step-up approach to necrosis</strong> (PANTER trial 2010, MISER trial): drainage first (percutaneous or endoscopic transgastric) → minimally invasive video-assisted retroperitoneal debridement (VARD) → open necrosectomy only as last resort. Delay any intervention beyond 4 weeks if possible to allow demarcation.</li>
            <li><strong>Infected necrosis</strong>: suspect if clinical deterioration after 7–10 days, gas on CT, positive FNA. Carbapenem cover (meropenem, imipenem). Source control via step-up approach.</li>
            <li><strong>Renal replacement therapy</strong> for AKI per KDIGO indications. CRRT preferred in haemodynamically unstable or raised intra-abdominal pressure.</li>
            <li><strong>Nutrition</strong>: continue enteral. If gastric outlet obstruction from inflammatory mass, advance to NJ. Address vitamin (esp. B1 in alcohol) and trace-element deficiencies.</li>
            <li><strong>Thromboprophylaxis</strong>: high VTE risk (immobility, inflammation, splanchnic vein thrombosis). LMWH unless active bleeding.</li>
            <li><strong>Rehabilitation</strong>: early mobilisation, ICU-acquired weakness prophylaxis, dietetic and physiotherapy input.</li>
          </ul>
        </div>

        {/* Complications */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Complications</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground text-sm mb-2">Local</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Acute peripancreatic fluid collection (&lt;4 weeks, no wall) — most resolve</li>
                <li>Pseudocyst (&gt;4 weeks, fibrous wall, no necrosis) — drain if symptomatic / infected</li>
                <li>Acute necrotic collection (&lt;4 weeks, contains necrosis)</li>
                <li>Walled-off necrosis (WON, &gt;4 weeks) — endoscopic transgastric drainage ± necrosectomy</li>
                <li>Infected necrosis — leading cause of late mortality</li>
                <li>Splanchnic vein thrombosis (splenic, portal, SMV) — anticoagulate if no bleeding</li>
                <li>Pseudoaneurysm (splenic, GDA) — IR embolisation; can cause catastrophic haemorrhage</li>
                <li>Gastrointestinal: gastric outlet obstruction, colonic ischaemia, fistulae</li>
                <li>Abdominal compartment syndrome — decompressive laparotomy if refractory</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground text-sm mb-2">Systemic / Late</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>SIRS → MODS (cardiovascular, respiratory, renal failure)</li>
                <li>ARDS — lung-protective ventilation, prone positioning</li>
                <li>Acute kidney injury — pre-renal then ATN; CRRT if needed</li>
                <li>Pleural effusion (left-sided, exudative, high amylase)</li>
                <li>DIC and coagulopathy</li>
                <li>Hyperglycaemia, hypocalcaemia (saponification), hypomagnesaemia</li>
                <li>ICU-acquired weakness, delirium, PICS</li>
                <li>Long-term: exocrine insufficiency (steatorrhoea, weight loss — pancreatic enzyme replacement), endocrine (diabetes mellitus type 3c), chronic pancreatitis, recurrent attacks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tertiary Referral */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Indications for Tertiary Centre Referral</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Severe acute pancreatitis is best managed in centres with HPB surgery, interventional radiology, advanced
            endoscopy (EUS, ERCP, transgastric necrosectomy) and tertiary ICU support. Per UK BSG / IAP–APA guidelines:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Predicted or established severe pancreatitis</strong> (Glasgow ≥3, APACHE-II ≥8, CRP &gt;150 at 48h, persistent SIRS &gt;48h)</li>
            <li><strong>Persistent organ failure</strong> &gt;48h despite optimal initial resuscitation</li>
            <li><strong>Pancreatic necrosis</strong> on CT (&gt;30% of gland, or any necrosis with deterioration)</li>
            <li><strong>Suspected or proven infected necrosis</strong> requiring step-up drainage / necrosectomy</li>
            <li><strong>Symptomatic walled-off necrosis or pseudocyst</strong> requiring intervention</li>
            <li><strong>Vascular complications</strong>: pseudoaneurysm, splanchnic vein thrombosis with bleeding, haemosuccus pancreaticus</li>
            <li><strong>Abdominal compartment syndrome</strong> requiring decompression</li>
            <li><strong>Refractory ACS, ARDS or AKI</strong> requiring advanced organ support (ECMO, CRRT in unstable patient)</li>
            <li><strong>Cholangitis with biliary obstruction</strong> needing urgent ERCP not available locally</li>
            <li><strong>Recurrent / idiopathic pancreatitis</strong> for EUS / specialist work-up</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3 italic">
            Refer early — outcomes worsen with delayed transfer once organ failure is established. Discuss with the
            regional HPB / pancreatic MDT.
          </p>
        </div>

        {/* Guideline comparison */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Major Guideline Comparison</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Side-by-side summary of the four major contemporary guidelines on the four big management decisions.
            Where they agree is as instructive as where they differ.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-xs min-w-[720px]">
              <thead>
                <tr className="bg-secondary/40 text-foreground">
                  <th className="text-left p-2 font-semibold border-b border-border">Topic</th>
                  <th className="text-left p-2 font-semibold border-b border-border">IAP/APA 2013</th>
                  <th className="text-left p-2 font-semibold border-b border-border">AGA 2018 / 2024 update</th>
                  <th className="text-left p-2 font-semibold border-b border-border">BSG 2024 (UK)</th>
                  <th className="text-left p-2 font-semibold border-b border-border">WSES 2019 (revised 2023)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground align-top">
                {[
                  {
                    topic: "Initial fluids",
                    iap: "Ringer's lactate. Goal-directed (HR <120, MAP 65–85, UO ≥0.5 mL/kg/h, HCT 35–44). Historically endorsed 5–10 mL/kg/h.",
                    aga: "2018: RL preferred, goal-directed. 2024 update post-WATERFALL: moderate resuscitation (10 mL/kg bolus only if hypovolaemic, then 1.5 mL/kg/h LR). Avoid aggressive fluids.",
                    bsg: "Balanced crystalloid (RL/Hartmann's). Adopt WATERFALL moderate strategy. Reassess 12/24/48/72h. Avoid 0.9% saline.",
                    wses: "RL is fluid of choice. Goal-directed. 2023 revision aligns with WATERFALL — moderate over aggressive.",
                  },
                  {
                    topic: "Prophylactic antibiotics",
                    iap: "NOT recommended in any acute pancreatitis (including severe / necrotising).",
                    aga: "Strongly NOT recommended (no benefit, increases resistance & fungal infection).",
                    bsg: "NOT recommended. Use only for proven extra-pancreatic infection or infected necrosis.",
                    wses: "NOT recommended for prophylaxis. Carbapenem (or quinolone + metronidazole) only for confirmed infected necrosis.",
                  },
                  {
                    topic: "ERCP timing",
                    iap: "Urgent ERCP (<24h) for cholangitis. <72h for persistent biliary obstruction. NOT for predicted severe pancreatitis without cholangitis/obstruction.",
                    aga: "Same: urgent ERCP only for concurrent cholangitis. APEC trial confirmed no benefit of routine early ERCP in severe gallstone pancreatitis without cholangitis.",
                    bsg: "ERCP within 24h for cholangitis; within 72h for persistent CBD obstruction. Index-admission cholecystectomy for mild gallstone pancreatitis.",
                    wses: "Urgent ERCP <24h for cholangitis only. Same-admission cholecystectomy for mild biliary AP.",
                  },
                  {
                    topic: "Necrosectomy approach",
                    iap: "Step-up: percutaneous/endoscopic drainage first → minimally invasive necrosectomy (VARD) → open as last resort. Delay >4 weeks if possible (PANTER trial).",
                    aga: "Step-up endorsed. Endoscopic transgastric drainage preferred over percutaneous when anatomy allows (TENSION trial — fewer fistulae, shorter LOS). Delay >4 weeks.",
                    bsg: "Step-up. Endoscopic-first preferred for retrogastric WON. Open necrosectomy only when minimally invasive options exhausted.",
                    wses: "Step-up. Endoscopic = percutaneous as first step (operator/anatomy dependent). Open necrosectomy reserved for failed minimally invasive.",
                  },
                  {
                    topic: "Nutrition",
                    iap: "Early enteral within 72h (NG = NJ). TPN only if enteral intolerance >5–7 days.",
                    aga: "Early enteral (within 24h if tolerated). Oral feeding as soon as possible in mild AP — do not wait for amylase to normalise.",
                    bsg: "Early enteral within 72h. NG first-line; switch to NJ only if intolerance.",
                    wses: "Early enteral within 24–72h. NG and NJ equivalent. TPN reserved.",
                  },
                  {
                    topic: "Cholecystectomy (mild gallstone AP)",
                    iap: "Same admission.",
                    aga: "Same admission (strong recommendation).",
                    bsg: "Same admission, ideally within 2 weeks of discharge if not done as inpatient.",
                    wses: "Same admission.",
                  },
                ].map((row) => (
                  <tr key={row.topic} className="border-b border-border last:border-b-0 hover:bg-secondary/20">
                    <td className="p-2 font-semibold text-foreground">{row.topic}</td>
                    <td className="p-2">{row.iap}</td>
                    <td className="p-2">{row.aga}</td>
                    <td className="p-2">{row.bsg}</td>
                    <td className="p-2">{row.wses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-1">Where they all agree</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Balanced crystalloid (Ringer's lactate) over 0.9% saline</li>
                <li>NO prophylactic antibiotics — even in necrotising AP</li>
                <li>Urgent ERCP only for concurrent cholangitis (not for severe AP per se)</li>
                <li>Step-up approach to necrosis; delay intervention &gt;4 weeks if possible</li>
                <li>Early enteral nutrition over TPN; same-admission cholecystectomy for mild gallstone AP</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-1">Where they differ</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong>Fluid rate</strong>: older IAP/APA 2013 (5–10 mL/kg/h) vs post-WATERFALL moderate (1.5 mL/kg/h) — newer guidelines have converged on moderate</li>
                <li><strong>Endoscopic vs percutaneous drainage</strong>: AGA &amp; BSG favour endoscopic-first for retrogastric WON; WSES treats them as equivalent</li>
                <li><strong>Oral refeeding timing</strong>: AGA most permissive (start as tolerated, do not wait for enzymes)</li>
                <li><strong>Antibiotic choice for infected necrosis</strong>: carbapenem universal first line; WSES allows quinolone + metronidazole</li>
              </ul>
            </div>
          </div>
        </div>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Severity: Atlanta — mild (no organ failure), moderate (transient <48 h), severe (persistent >48 h); Glasgow score ≥3 predicts severe.",
              "Resuscitate carefully — Hartmann's, target UO 0.5 mL/kg/h; over-resuscitation worsens outcomes (WATERFALL trial).",
              "Antibiotics not routine; reserve for infected necrosis (CT-guided FNA) or extrapancreatic infection.",
              "Step-up approach: percutaneous drain → minimally invasive necrosectomy; delay surgery 4 weeks if possible (walled-off necrosis).",
              "Refer to tertiary HPB centre early in severe disease; ICU support for organ failure with low threshold for renal replacement.",
            ]}
          />
      </section>
      </ExamSection>
          <TopicFaqs faqs={acutePancreatitisFaqs} />
        </>
      }
    />
  );
};

export default AcutePancreatitisTopic;
