import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { acutePancreatitisQuestions } from "@/data/quizzes";
import GlasgowImrieScoreDiagram from "@/components/diagrams/intensive-care/GlasgowImrieScoreDiagram";
import WaterfallFluidDiagram from "@/components/diagrams/intensive-care/WaterfallFluidDiagram";
import PancreatitisAutodigestionDiagram from "@/components/diagrams/intensive-care/PancreatitisAutodigestionDiagram";
import SeverePancreatitisCTDiagram from "@/components/diagrams/intensive-care/SeverePancreatitisCTDiagram";
import PancreatitisEvolutionTimeline from "@/components/diagrams/intensive-care/PancreatitisEvolutionTimeline";
import { DiagramSection } from "@/components/topic/DiagramSection";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { PANCREATITIS_FLUIDS, PANCREATITIS_NUTRITION, PANCREATITIS_INFECTION, PANCREATITIS_SOURCE_CONTROL, HTG_MANAGEMENT } from "@/components/topic/PancreatitisTeaching";
import { InlineRef } from "@/components/references/InlineRef";

const acutePancreatitisFaqs: Array<[string, string]> = [
  ["How is severity stratified in acute pancreatitis?", "Use the revised Atlanta classification: mild (no organ failure or complications), moderate (transient organ failure <48 h or local complications), severe (persistent organ failure >48 h); supplement with APACHE II and CRP >150 at 48 h."],
  ["What is the role of early enteral nutrition?", "General acute pancreatitis: offer oral intake as tolerated; vomiting, ileus or obstruction may temporarily prevent it. In moderately severe/severe disease, start enteral support within 72 hours if needed (NG or NJ according to tolerance). Enteral is preferred to parenteral nutrition; use PN when enteral fails or is contraindicated after specialist nutrition assessment, not an automatic 5–7-day wait. PYTHON (2014;208 high-predicted-risk patients) compared tube feeding within 24 hours with oral feeding at 72 hours and tube feeding if needed, not TPN: major infection/death within 6 months 30% vs 27%, no reduction; 69% of on-demand patients avoided tubes. Separate HTG pathway: IAP 2025 recommendation 66 advises an initial 48-hour fast, then low-fat soft diet and enteral support if oral intake is not tolerated; follow the adopted guidance and individual clinical plan, rather than applying early oral feeding indiscriminately. If PN is required in HTG pancreatitis, IAP 2025 advises withholding intravenous fat emulsion when TG ≥400 mg/dL."],
  ["When should antibiotics be given in severe pancreatitis?", "No prophylactic antibiotics for sterile necrosis. Treat proven or strongly suspected infected necrosis (sepsis, bacteraemia or clinical deterioration) and extra-pancreatic infection; do not wait for gas or positive FNA. FNA is unnecessary in most cases. Obtain cultures when practicable without delaying urgent treatment. Select necrosis-penetrating antibiotics with local microbiology and resistance assessment; carbapenems are an option, not mandatory universal first-line therapy. Gas strongly suggests infection but can reflect an enteric fistula or recent intervention."],
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
        albumin &lt;32, glucose &gt;10 — score 8/8. CRP &gt;150 at 48 h supports prediction of a potentially severe course, not an Atlanta severity diagnosis.
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
        Initial therapy = 1.5 mL/kg/h × 70 kg ≈ 105 mL/h Hartmann's.
      </>
    ),
    answer: (
      <>
        No bolus for this normovolaemic example; initial Hartmann's ~105 mL/h (1.5 mL/kg/h),
        with an overload check at 3 ±1 hours and frequent individual reassessment, not a fixed 72-hour prescription.
        Reduce/stop for overload; review IV needs as oral intake becomes tolerated. WATERFALL excluded baseline
        shock/respiratory failure, significant heart failure and eGFR &lt;60 mL/min/1.73 m²; severe disease/comorbidity
        needs individualised resuscitation. Later trial checks were at 12, 24, 48 and 72 hours. Monitor MAP, urine output,
        lactate, BUN and haematocrit; do not chase MAP with fluid once euvolaemic. Increased overload was demonstrated,
        not reduced progression or a statistically established longer hospital stay.
      </>
    ),
   cites: ["WATERFALL 2022", "WATERFALL protocol 2020", "IAP 2025"],
  },
  {
    title: "Suspected infected necrosis at day 12",
    scenario: (
      <>
        Severe necrotising pancreatitis. Initially improving, but at day 12 the patient is febrile to
        39 °C, WCC rising, new noradrenaline requirement. CT shows an extensive acute necrotic collection (unless an organised wall is specifically demonstrated) with
        gas bubbles within the collection.
      </>
    ),
    working: (
      <>
        Gas in a necrotic collection plus clinical deterioration is highly suggestive of infected
        necrosis; enteric fistula or intervention can also cause gas. Start necrosis-penetrating antibiotics using local microbiology advice, not a mandatory carbapenem.
        PANTER supports percutaneous-drainage-first surgical step-up. At day 12, consider earlier percutaneous
        drainage with HPB/ICU assessment; endoscopic transmural drainage depends on an organised collection,
        anatomy and expertise, not immediate open necrosectomy.
      </>
    ),
    answer: (
      <>
        Obtain blood cultures without delaying urgent antibiotics; FNA is unnecessary in most cases. Urgent HPB/ICU
        assessment and earlier percutaneous drainage may be needed, including within 2 weeks for deterioration.
        Do not wait for 4 weeks for necessary source control. In stable patients defer intervention when feasible;
        avoid early debridement and aim for about 4 weeks. Drainage and debridement are separate decisions;
        reserve minimally invasive/open necrosectomy for selected failures of drainage.
      </>
    ),
   cites: ["AGA necrosis 2020", "WSES 2019", "PANTER 2010"],
  },
];

const keyPoints = [
  { text: "Diagnose with 2 of 3: typical pain + amylase/lipase ≥3× ULN + characteristic imaging (Atlanta 2012)", cites: ["Atlanta 2012"] },
  { text: "Severity stratification: Glasgow (Imrie), APACHE-II ≥8, BISAP, CRP >150 at 48h, persistent organ failure >48h", cites: ["Atlanta 2012"] },
  { text: "I GET SMASHED — gallstones (50%) and ethanol (25%) account for most UK cases", cites: ["IAP/APA 2013"] },
  { text: PANCREATITIS_FLUIDS, cites: ["WATERFALL 2022", "WATERFALL protocol 2020", "IAP 2025"] },
  { text: PANCREATITIS_NUTRITION, cites: ["NICE NG104", "PYTHON 2014", "AGA 2018", "IAP 2025 HTG"] },
  { text: PANCREATITIS_INFECTION, cites: ["AGA necrosis 2020", "WSES 2019"] },
  { text: "ERCP within 24–72h only for cholangitis or persistent biliary obstruction; cholecystectomy same admission for mild gallstone pancreatitis", cites: ["IAP 2025"] },
  { text: PANCREATITIS_SOURCE_CONTROL, cites: ["AGA necrosis 2020", "PANTER 2010"] },
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
          "BJA Educ 2008",
          "IAP 2025",
        ],
        keyPoints: [
          "IAP/APA 2013",
          "Atlanta 2012",
          "WATERFALL 2022",
          "PANTER 2010",
          "BJA Educ 2008",
          "IAP 2025",
        ],
        workedExamples: ["IAP/APA 2013", "Atlanta 2012", "WATERFALL 2022", "WATERFALL protocol 2020", "IAP 2025", "AGA necrosis 2020", "WSES 2019"],
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
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-xs min-w-[600px]">
              <thead>
                <tr className="bg-secondary/40 text-foreground">
                  <th className="text-left p-2 font-semibold border-b border-border">Score</th>
                  <th className="text-left p-2 font-semibold border-b border-border">Respiratory (PaO₂/FiO₂)</th>
                  <th className="text-left p-2 font-semibold border-b border-border">Renal (creatinine, µmol/L)</th>
                  <th className="text-left p-2 font-semibold border-b border-border">Cardiovascular (systolic BP)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground align-top">
                {[
                  { score: "0", resp: ">400", renal: "<134", cvs: ">90 mmHg" },
                  { score: "1", resp: "301–400", renal: "134–169", cvs: "<90, fluid-responsive" },
                  { score: "2", resp: "201–300", renal: "170–310", cvs: "<90, not fluid-responsive" },
                  { score: "3", resp: "101–200", renal: "311–439", cvs: "<90, pH <7.3" },
                  { score: "4", resp: "≤101", renal: ">439", cvs: "<90, pH <7.2" },
                ].map((row) => (
                  <tr key={row.score} className="border-b border-border last:border-b-0 hover:bg-secondary/20">
                    <td className="p-2 font-semibold text-foreground">{row.score}</td>
                    <td className="p-2">{row.resp}</td>
                    <td className="p-2">{row.renal}</td>
                    <td className="p-2">{row.cvs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Organ failure = score ≥2 in any one system. <strong>Transient</strong> organ failure resolves within 48h
            (moderately severe disease); <strong>persistent</strong> organ failure lasts &gt;48h (severe disease).{" "}
            <InlineRef topicId="acute-pancreatitis" refLabel="Atlanta 2012" />{" "}
            <InlineRef topicId="acute-pancreatitis" refLabel="Marshall 1995" />
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
              necrosis and local complications. Routine severity imaging is deferred, but uncertainty, alternative emergencies or deterioration can justify earlier diagnostic CT. Early scans can under-call necrosis. Use this
              schematic to recognise the cardinal findings — and the ones that change management (gas in necrosis,
              splanchnic vein thrombosis, pleural effusion as a BISAP variable; hypoxaemia is the Glasgow/Imrie respiratory variable).
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
              names morphological stages, not an automatic safe-intervention date. Avoid early debridement and aim for about 4 weeks when feasible; deterioration can require earlier drainage, including within 2 weeks. The timeline shows how
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
              { cause: "Hypertriglyceridaemia / Hypercalcaemia", detail: "TG &gt;11.3 mmol/L (1000 mg/dL). Hyperparathyroidism, malignancy. Specific triglyceride-lowering treatment requires specialist selection; see the HTG management section." },
              { cause: "ERCP", detail: "Post-procedure pancreatitis. Rectal indomethacin/diclofenac is standard prophylaxis." },
              { cause: "Drugs", detail: "See above. Always review medication list." },
            ].map((c) => (
              <div key={c.cause} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{c.cause}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-5">Hypertriglyceridaemia-induced pancreatitis — specific management</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Suspect it when triglycerides exceed <strong>11.3 mmol/L (1000 mg/dL)</strong>, especially with
            lipaemic serum, pseudohyponatraemia, spuriously normal amylase and a family history or poorly
            controlled diabetes. Excess chylomicrons are hydrolysed by pancreatic lipase to free fatty acids,
            which are directly cytotoxic to acinar cells and capillary endothelium and cause ischaemia and
            inflammation; supportive care and specialist assessment remain essential; lowering triglycerides does not by itself establish clinical benefit
            <InlineRef topicId="acute-pancreatitis" refLabel="HTG Pancreatitis 2018" />.
          </p>
          <p className="text-sm text-muted-foreground mb-3">IAP 2025 recommendation 66 adopts an initial 48-hour fast, then a low-fat soft diet and enteral support if oral intake is not tolerated. This HTG-specific plan is distinct from general early oral feeding. <InlineRef topicId="acute-pancreatitis" refLabel="IAP 2025 HTG" /></p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ...HTG_MANAGEMENT,
              { step: "Longer-term prevention", detail: "Once oral intake resumes: fibrate (fenofibrate) as first-line lipid-lowering therapy, omega-3 fatty acids, tight glycaemic control, complete alcohol abstinence, weight loss and a low-fat diet. Review contributing drugs — oestrogens, tamoxifen, retinoids, propofol (a lipid emulsion), thiazides, antiretrovirals, olanzapine and clozapine. Screen for familial chylomicronaemia and refer to lipid clinic after recurrent episodes." },
            ].map((h) => (
              <div key={h.step} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{h.step}</p>
                <p className="text-sm text-muted-foreground mt-1">{h.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3"><InlineRef topicId="acute-pancreatitis" refLabel="IAP 2025 HTG" /> <InlineRef topicId="acute-pancreatitis" refLabel="Endocrine Society 2020 HTG" /> <InlineRef topicId="acute-pancreatitis" refLabel="HTG insulin protocol 2023" /> <InlineRef topicId="acute-pancreatitis" refLabel="HTG exchange RCT 2022" /> Biochemical response is not proof of mortality benefit; published insulin/dextrose protocols and trial targets differ.</p>
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
              { test: "Imaging — CT", detail: "Routine CECT for necrosis/severity at 72–96h; earlier diagnostic CT may be indicated for uncertainty, alternative emergencies or deterioration. Repeat imaging for clinical non-improvement/deterioration or intervention planning, not a calendar alone. AKI requires benefit-risk discussion with radiology; do not delay essential emergency imaging solely for renal impairment. Noncontrast CT does not equivalently assess enhancement/necrosis. MRCP if a duct stone is suspected." },
            ].map((t) => (
              <div key={t.test} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{t.test}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-2"><InlineRef topicId="acute-pancreatitis" refLabel="IAP 2025 imaging" /> <InlineRef topicId="acute-pancreatitis" refLabel="NICE NG148 contrast" /></p>
          <div className="mt-4 p-3 rounded-lg border border-border bg-secondary/20">
            <p className="text-xs font-semibold text-foreground mb-1">Glasgow (Imrie) score — score ≥3 within 48h predicts a potentially severe course; Atlanta defines established severity</p>
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
            Priorities are carefully individualised, goal-directed resuscitation, analgesia, identification of biliary obstruction
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
                detail: <>{PANCREATITIS_FLUIDS} <InlineRef topicId="acute-pancreatitis" refLabel="WATERFALL protocol 2020" /> <InlineRef topicId="acute-pancreatitis" refLabel="WATERFALL 2022" /> <InlineRef topicId="acute-pancreatitis" refLabel="IAP 2025" /></>,
              },
              {
                topic: "D — Analgesia",
                detail: (
                  <>
                    Multimodal. Paracetamol + opioid (morphine or fentanyl PCA). Opioid concerns about Sphincter of
                    Oddi spasm are largely theoretical — do not withhold.
                    <br /><br />
                    <strong>Thoracic epidural analgesia</strong> at T8–T10 may be a specialist analgesic option
                    in selected patients with expertise and contraindication assessment. Possible pain relief and
                    opioid sparing are distinct from unproven prevention of organ failure or mortality benefit.
                    EPIPAN (2023;148 enrolled,135 analysed) found no difference in ventilator-free days; longer invasive
                    ventilation in recipients was a secondary result, not definitive proof of harm. UEG 2026 does not
                    support routine epidural use to improve systemic outcomes. Improved perfusion, reduced ileus,
                    fewer respiratory complications and survival are not guaranteed benefits.
                    <InlineRef topicId="acute-pancreatitis" refLabel="EPIPAN 2023" />
                    <InlineRef topicId="acute-pancreatitis" refLabel="UEG pain 2026" />
                    <strong>Risks/contraindications</strong>: coagulopathy/thrombocytopenia, sepsis/bacteraemia,
                    haemodynamic instability from
                    sympathectomy, technical difficulty and positioning in the unwell patient, and epidural
                    haematoma/abscess. <strong>Practicalities</strong>: check platelets and coagulation before
                    insertion and before removal, ensure adequate volume status and vasopressor availability, and use
                    dilute low-dose local anaesthetic with regular neurological review.{" "}
                    <InlineRef topicId="acute-pancreatitis" refLabel="BJA Educ 2008" />
                  </>
                ),
              },
              {
                topic: "E — Nutrition",
                detail: <>{PANCREATITIS_NUTRITION} <InlineRef topicId="acute-pancreatitis" refLabel="PYTHON 2014" /> <InlineRef topicId="acute-pancreatitis" refLabel="NICE NG104" /> <InlineRef topicId="acute-pancreatitis" refLabel="AGA 2018" /> <InlineRef topicId="acute-pancreatitis" refLabel="IAP 2025 HTG" /></>,
              },
              {
                topic: "F — Antibiotics",
                detail: <>{PANCREATITIS_INFECTION} <InlineRef topicId="acute-pancreatitis" refLabel="AGA necrosis 2020" /> <InlineRef topicId="acute-pancreatitis" refLabel="WSES 2019" /></>,
              },
              {
                topic: "G — Glycaemic / metabolic",
                detail: "Target glucose 6–10 mmol/L. Correct hypocalcaemia (sign of severity, fat saponification). Replace Mg²⁺, K⁺, PO₄³⁻. For HTG-associated disease, follow the patient-selection and monitoring guidance in the specific management section.",
              },
              {
                topic: "H — Specific therapies",
                detail: (
                  <>
                    ERCP within 24–72h if acute cholangitis or persistent biliary obstruction (NOT routinely for all
                    gallstone pancreatitis). Cholecystectomy on same admission for mild gallstone pancreatitis
                    (reduces recurrence).
                    <br /><br />
                    <strong>Hypertriglyceridaemia-associated pancreatitis</strong> — interpret elevated triglycerides
                    with the clinical diagnosis and other causes. Use the specific management section above for
                    insulin selection and apheresis escalation; neither a fixed insulin rate nor a single triglyceride
                    cutoff determines treatment for every patient. Review contributing medicines and plan long-term
                    lipid control with specialist follow-up. See the IAP2025 and Endocrine Society2020 recommendations.
                    <br /><a href="https://doi.org/10.1016/j.pan.2025.04.020" target="_blank" rel="noopener noreferrer">IAP2025 guideline</a>{" · "}
                    <a href="https://doi.org/10.1210/clinem/dgaa674" target="_blank" rel="noopener noreferrer">Endocrine Society2020 guideline</a>
                  </>
                ),
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
            <li><strong>Repeat imaging</strong> for deterioration, persistent non-improvement or intervention planning, not automatically at 7–10 days. ANC/APFC are usually unencapsulated then; WON/pseudocyst generally form after about 4 weeks. <InlineRef topicId="acute-pancreatitis" refLabel="IAP 2025" /></li>
            <li><strong>Step-up source control</strong>: {PANCREATITIS_SOURCE_CONTROL} <InlineRef topicId="acute-pancreatitis" refLabel="AGA necrosis 2020" /></li>
            <li><strong>Infected necrosis</strong>: {PANCREATITIS_INFECTION} <InlineRef topicId="acute-pancreatitis" refLabel="WSES 2019" /></li>
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
                <li>Splanchnic vein thrombosis: individualise therapeutic anticoagulation with HPB/haematology by vessel, progression, bowel ischaemia and bleeding risk. IAP 2025 does not routinely recommend it for isolated splenic thrombosis; portal/mesenteric extension may warrant treatment. iLATAM-AP 2026 also considers progressive splenic thrombosis; evidence is low-certainty, not an absolute never-treat rule. No current bleeding alone is insufficient. <InlineRef topicId="acute-pancreatitis" refLabel="IAP 2025 SVT" /> <InlineRef topicId="acute-pancreatitis" refLabel="iLATAM 2026 SVT" /></li>
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
            endoscopy (EUS, ERCP, transgastric necrosectomy) and tertiary ICU support. Use current IAP 2025/NICE guidance and regional referral arrangements:
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
          <p className="text-muted-foreground leading-relaxed mb-3">Named versions answer different questions; historical guidance is not retroactively attributed WATERFALL. This smaller comparison includes only traceable recommendations.</p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-xs min-w-[540px]">
              <thead><tr className="bg-secondary/40 text-foreground"><th className="text-left p-2">Guidance</th><th className="text-left p-2">Scope and recommendations</th></tr></thead>
              <tbody className="text-muted-foreground align-top">
                {[
                  { name: "IAP 2025", label: "IAP 2025", text: "Moderate, individually adjusted fluids; distinguish diagnostic CT from 72–96h necrosis imaging. Necrosis/source control depends on clinical condition. Separate HTG nutrition/selection guidance, not a universal insulin or apheresis threshold." },
                  { name: "NICE NG104 (2018; current recommendations)", label: "NICE NG104", text: "Do not withhold food without a clear reason such as vomiting. In moderately severe/severe disease start enteral nutrition within 72h; use PN only when enteral fails or is contraindicated." },
                  { name: "AGA 2018 initial management", label: "AGA 2018", text: "Goal-directed fluids; no recommendation between normal saline and Ringer’s lactate. Oral feeding within 24h as tolerated; enteral over PN and either NG or NJ when tube feeding is needed. This predates WATERFALL." },
                  { name: "AGA 2019 online / 2020 pancreatic necrosis update", label: "AGA necrosis 2020", text: "Antibiotics for proven or strongly suspected infected necrosis; FNA unnecessary in most. Avoid early debridement, optimally delay about 4 weeks; selected deteriorating collections may need percutaneous drainage within 2 weeks." },
                  { name: "WSES 2019 severe pancreatitis", label: "WSES 2019", text: "No routine antibiotic prophylaxis. Necrosis-penetrating antibiotics for infected necrosis, informed by resistance risk; step-up intervention and urgent assessment for deterioration. No verified 2023 revision is represented here." },
                ].map(row => <tr key={row.name} className="border-b border-border last:border-b-0"><td className="p-2 font-semibold text-foreground">{row.name}<InlineRef topicId="acute-pancreatitis" refLabel={row.label} /></td><td className="p-2">{row.text}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">The actual historical UK guideline is 2005, not a verified BSG 2024 update; it is not used as a current fluid prescription. <InlineRef topicId="acute-pancreatitis" refLabel="UK guidelines 2005" /> Insulin/apheresis differences between IAP 2025 and Endocrine Society 2020 are detailed in the HTG section above.</p>
        </div>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Severity: Atlanta — mild (no organ failure), moderate (transient <48 h), severe (persistent >48 h); Glasgow score ≥3 predicts severe.",
              "Resuscitate carefully — Hartmann's, target UO 0.5 mL/kg/h; over-resuscitation worsens outcomes (WATERFALL trial).",
              "No sterile-necrosis prophylaxis; treat proven or strongly suspected infection without waiting for FNA.",
              "Drainage and debridement differ: aim for delayed debridement when feasible, but deterioration can require drainage before 4 weeks.",
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
