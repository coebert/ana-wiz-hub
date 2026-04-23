import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { gynaecologicalAnaesthesiaQuestions } from "@/data/quizzes";
import PneumoperitoneumTrendelenburgDiagram from "@/components/diagrams/PneumoperitoneumTrendelenburgDiagram";
import TURPSyndromeDiagram from "@/components/diagrams/TURPSyndromeDiagram";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Predict the cardiovascular and respiratory consequences of pneumoperitoneum + steep Trendelenburg",
  "Plan a safe anaesthetic for prolonged robotic gynaecology including airway, eye, and brachial plexus protection",
  "Recognise and manage hysteroscopy fluid absorption (TURP-syndrome equivalent)",
  "Diagnose and treat a CO₂ gas embolism intraoperatively",
  "Apply ERAS principles to major gynaecological oncology surgery",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Sudden cardiovascular collapse during laparoscopy",
    scenario:
      "Twenty minutes into a laparoscopic hysterectomy with steep Trendelenburg, the patient becomes hypotensive (BP 60/30), HR 50, SpO₂ 88%, EtCO₂ drops from 4.5 to 2.1 kPa, and a coarse 'mill-wheel' murmur is audible. What's the diagnosis and what do you do?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step approach</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Recognise the signature.</strong> Sudden ↓ EtCO₂ + ↓ BP + bradycardia + mill-wheel murmur = <strong>CO₂ gas embolism</strong> (the EtCO₂ drop is the key — gas blocks pulmonary capillary CO₂ excretion).</li>
          <li><strong>Stop insufflation immediately.</strong> Tell the surgeon — desufflate the abdomen.</li>
          <li><strong>Position.</strong> Head down, <strong>left lateral decubitus</strong> (Durant position) — traps gas in the right ventricle, away from the RVOT.</li>
          <li><strong>Resuscitate.</strong> 100% O₂, IV fluid bolus, vasopressor (noradrenaline ± adrenaline). Stop N₂O if running (would expand the bubble).</li>
          <li><strong>Definitive.</strong> Aspirate gas via central line if available (insert a multi-orifice CVC into right atrium). TOE confirms diagnosis.</li>
          <li><strong>Differentials to exclude.</strong> Tension pneumothorax (↑ EtCO₂ initially, asymmetric breath sounds), severe vagal reaction to peritoneal stretch (resolve with desufflation + atropine), cardiac arrest (other causes).</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Why CO₂ is safer than air</p>
        <ul className="list-disc list-inside space-y-1">
          <li>CO₂ is highly blood-soluble (~20× nitrogen) → small emboli dissolve quickly. Lethal volumes: CO₂ 1,000 mL vs air 50 mL.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Continuing N₂O — it diffuses into the bubble and enlarges it.</li>
            <li>Putting the patient head-up to 'help breathing' — worsens RVOT obstruction.</li>
            <li>Mistaking the EtCO₂ drop for hyperventilation and increasing minute volume — wrong diagnosis, wrong action.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Treat as CO₂ gas embolism: stop insufflation, head-down + left lateral (Durant), 100% O₂, fluids and vasopressors, stop N₂O, and aspirate via CVC if possible. The diagnostic clues are sudden EtCO₂ fall, mill-wheel murmur, and cardiovascular collapse — distinguish from tension pneumothorax and vasovagal causes.",
  },
  {
    title: "Hysteroscopy fluid deficit at 1,500 mL with glycine",
    scenario:
      "During an operative hysteroscopy with 1.5% glycine distension fluid, the irrigation deficit reaches 1,500 mL. The patient becomes confused, with a serum sodium of 121 mmol/L. What's happening, and how do you manage it?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step approach</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Recognise the syndrome.</strong> Glycine deficit &gt; 1,000 mL + dilutional hyponatraemia + neurology = <strong>'TURP-equivalent' / glycine syndrome</strong>.</li>
          <li><strong>Stop the procedure immediately.</strong> Communicate with the surgeon — diathermise haemostasis and finish ASAP.</li>
          <li><strong>Send urgent labs.</strong> Na⁺, K⁺, osmolality, ammonia (glycine → glyoxylate → ammonia), glucose, ABG.</li>
          <li><strong>Treat hyponatraemia carefully.</strong> If symptomatic with Na⁺ ≤ 125: 150 mL 3% NaCl over 10 min, repeat ×2 to lift Na⁺ by 4–6 mmol/L. <strong>Maximum rate 8–10 mmol/L per 24 h</strong> to avoid central pontine myelinolysis.</li>
          <li><strong>Restrict fluids and add a loop diuretic.</strong> Furosemide 20–40 mg IV to offload free water.</li>
          <li><strong>Address visual disturbance.</strong> Glycine is a CNS inhibitory neurotransmitter (and a retinal one) → transient blindness possible; usually self-resolves.</li>
          <li><strong>HDU/ICU.</strong> Hourly Na⁺, neurology checks; consider hypertonic saline infusion guided by Na⁺ trend.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Fluid deficit limits</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Glycine 1.5% / sorbitol 3% → STOP at 1,000 mL deficit (BSGE 2018).</li>
          <li>Isotonic saline (bipolar resectoscope) → STOP at 2,500 mL.</li>
          <li>Always use a calibrated fluid management system; check deficit every 5 min.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Correcting Na⁺ too quickly → osmotic demyelination.</li>
            <li>Giving more isotonic fluid 'for the BP' — worsens hyponatraemia.</li>
            <li>Failing to set a deficit alarm at 750 mL with glycine — by the time you notice clinically it's too late.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Stop the procedure, send urgent Na⁺/osmolality, give 3% saline 150 mL over 10 min if symptomatic, restrict fluids, add furosemide, and admit to HDU/ICU. Correct Na⁺ no faster than 8–10 mmol/L per 24 h to prevent central pontine myelinolysis. Set deficit alarms (1,000 mL glycine, 2,500 mL saline) for the next case.",
  },
];

const GynaecologicalAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Gynaecological Anaesthesia"
      subtitle="Laparoscopic, robotic, and oncological surgery — physiology and pitfalls"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="gynaecological-anaesthesia"
      topicTitle="Gynaecological Anaesthesia"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={gynaecologicalAnaesthesiaQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia (specialty)"] },
        diagrams: { exams: [Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia (specialty)"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2011 Lap",
          "BJA Educ 2011 Lap",
          "ERAS Gynae 2019",
        ],
        workedExamples: [
          "BJA Educ 2011 Lap",
          "BSGE 2018",
          "BJA Educ 2014 TURP",
        ],
        diagrams: [
          "BJA Educ 2011 Lap",
          "BSGE 2018",
        ],
        keyPoints: [
          "BJA Educ 2011 Lap",
          "ERAS Gynae 2019",
        ],
      }}
      diagrams={
        <>
          <PneumoperitoneumTrendelenburgDiagram />
          <TURPSyndromeDiagram />
        </>
      }
      keyPoints={[
        "Pneumoperitoneum + steep Trendelenburg: ↑ PaCO₂, ↓ FRC, ↑ IOP/ICP, facial and laryngeal oedema",
        "Robotic surgery: prolonged position → airway oedema; plan for difficult extubation; limited patient access during dock",
        "Hysteroscopy fluid absorption: STOP at deficit 1,000 mL glycine / 2,500 mL saline (BSGE 2018)",
        "CO₂ gas embolism: sudden ↓ EtCO₂ + mill-wheel murmur — head-down left lateral (Durant) + CVC aspiration",
        "Glycine syndrome: dilutional hyponatraemia, transient blindness, hyperammonaemia. Correct Na⁺ ≤ 8–10 mmol/L per 24 h",
        "ERAS gynae-oncology: thoracic epidural / TAP block, opioid sparing, early mobilisation, LMWH + mechanical VTE prophylaxis",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Gynaecological surgery encompasses a wide range from minor day-case procedures (hysteroscopy, laparoscopic sterilisation) to major oncological operations (radical hysterectomy, pelvic exenteration). Key considerations include laparoscopic pneumoperitoneum effects, positioning (Trendelenburg/lithotomy), venous thromboembolism risk, and the increasing role of robotic surgery.
            </p>
          </ExamSection>

          <ExamSection id="laparoscopic" exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia (specialty)"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Laparoscopic Gynaecological Surgery</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Most gynaecological procedures are now laparoscopic or robotic. The combination of pneumoperitoneum and steep Trendelenburg creates unique physiological challenges.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Pneumoperitoneum", value: "CO₂ insufflation to 12–15 mmHg — ↑ PaCO₂ (absorption), ↑ SVR, ↓ venous return, ↓ renal blood flow" },
                { label: "Trendelenburg", value: "↑ Preload, ↑ ICP, ↑ IOP, laryngeal/facial oedema, cephalad diaphragm shift → ↓ FRC" },
                { label: "Ventilation", value: "↑ Peak pressures, ↓ compliance — use lung-protective settings, ↑ RR to maintain normocapnia" },
                { label: "Shoulder tip pain", value: "Diaphragmatic irritation from residual CO₂ — postop; may mimic cardiac pain" },
                { label: "Gas embolism", value: "Rare but catastrophic — mill-wheel murmur, cardiovascular collapse; treat with left lateral (Durant), aspirate via CVC" },
                { label: "Subcutaneous emphysema", value: "CO₂ tracking into tissues — ↑ ETCO₂, crepitus; usually self-limiting" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="robotic" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Robotic Gynaecological Surgery</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Robotic-assisted procedures require prolonged steep Trendelenburg (up to 30°) and pneumoperitoneum, often for 3–6 hours.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Airway</strong>: facial/laryngeal oedema may preclude extubation — assess with cuff-leak test; avoid re-intubation if significant oedema</li>
              <li><strong>Eyes</strong>: ↑ IOP from Trendelenburg + pneumoperitoneum; risk of ischaemic optic neuropathy</li>
              <li><strong>Brachial plexus</strong>: arms tucked at sides; shoulder braces avoided (brachial plexus stretch injury)</li>
              <li><strong>Access</strong>: robot docked over patient — limited access to airway; secure ETT and lines meticulously before docking</li>
              <li><strong>Conversion</strong>: plan for emergency undocking (typically 2–3 min); communication with surgical team essential</li>
            </ul>
          </ExamSection>

          <ExamSection id="hysteroscopy" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Hysteroscopy</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Diagnostic hysteroscopy is often performed under local anaesthesia or sedation. Operative hysteroscopy (resection of fibroids, endometrial ablation) requires GA or spinal.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Fluid absorption</strong>: similar risk to TURP syndrome with glycine distension media — monitor fluid deficit (&lt; 1,000 mL with glycine, &lt; 2,500 mL with saline) — BSGE 2018</li>
              <li><strong>Uterine perforation</strong>: may cause intraperitoneal haemorrhage; requires laparoscopy/laparotomy</li>
              <li><strong>Gas embolism</strong>: rare with liquid media; risk with air entrainment via open cervix</li>
              <li><strong>Cervical stimulation</strong>: may cause vasovagal bradycardia — atropine/glycopyrrolate ready</li>
            </ul>
          </ExamSection>

          <ExamSection id="oncology" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Major Gynaecological Oncology</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Radical hysterectomy, pelvic exenteration, and debulking surgery for ovarian cancer are major procedures with significant morbidity.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Duration</strong>: 4–8+ hours; risk of hypothermia, pressure injury, DVT</li>
              <li><strong>Blood loss</strong>: potentially massive — crossmatch, cell salvage controversial in malignancy (leucodepletion filters)</li>
              <li><strong>Ovarian cancer</strong>: patients often cachectic with ascites, pleural effusions, hypoalbuminaemia</li>
              <li><strong>Analgesia</strong>: epidural (T8–T10 level) or TAP/rectus sheath blocks; multimodal approach</li>
              <li><strong>VTE prophylaxis</strong>: LMWH + mechanical prophylaxis; high-risk population for PE</li>
              <li><strong>ERAS protocols</strong>: increasingly adopted — early oral intake, early mobilisation, minimise opioids (Nelson/ERAS Society 2019)</li>
            </ul>
          </ExamSection>

          <ExamSection id="ectopic" exams={[Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Ectopic Pregnancy — Anaesthetic Considerations</h2>
            <p className="text-muted-foreground leading-relaxed">
              Unruptured ectopic may be managed laparoscopically as an elective/urgent case. Ruptured ectopic is covered in the Emergency Surgery topic. For unruptured cases: standard laparoscopic anaesthesia, awareness of haemorrhage risk, crossmatch available, and anti-D immunoglobulin for Rh-negative patients.
            </p>
          </ExamSection>
        </>
      }
    />
  );
};

export default GynaecologicalAnaesthesiaTopic;
