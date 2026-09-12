import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { urologicalAnaesthesiaQuestions } from "@/data/quizzes";
import TURPSyndromeDiagram from "@/components/diagrams/clinical/TURPSyndromeDiagram";
import PropofolErectionMechanismDiagram from "@/components/diagrams/clinical/PropofolErectionMechanismDiagram";
import PropofolErectionAlgorithmDiagram from "@/components/diagrams/clinical/PropofolErectionAlgorithmDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocItems = [
  { id: "intro", label: "Introduction", group: "Core" },
  { id: "turp", label: "TURP syndrome", group: "Core" },
  { id: "bipolar-laser", label: "Bipolar TURP & laser", group: "Core" },
  { id: "lithotomy", label: "Lithotomy position", group: "Positioning" },
  { id: "cystectomy", label: "Radical cystectomy", group: "Major surgery" },
  { id: "nephrectomy", label: "Nephrectomy & renal surgery", group: "Major surgery" },
  { id: "propofol-erection", label: "Propofol-induced penile erection", group: "Complications" },
  { id: "pcnl", label: "Percutaneous nephrolithotomy", group: "Procedures" },
  { id: "eswl", label: "ESWL", group: "Procedures" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const uroFaqs: Array<[string, string]> = [
  [
    "What is TURP syndrome and how is it managed?",
    "TURP syndrome is a potentially life-threatening complication of transurethral resection of the prostate in which hypotonic irrigation fluid (classically 1.5% glycine) is absorbed through open prostatic venous sinuses into the circulation. It produces dilutional hyponatraemia, hypo-osmolality, fluid overload, and glycine toxicity. Clinical features include restlessness, confusion, nausea, visual disturbance (glycine is an inhibitory retinal neurotransmitter), seizures, hypertension then hypotension, bradycardia, and pulmonary oedema. Management: tell the surgeon to stop resection immediately and achieve haemostasis. Send urgent U&E, serum osmolality, and ammonia. For severe symptomatic hyponatraemia (Na⁺ <120 mmol/L with seizures or coma), give 3% hypertonic saline 1–2 mL/kg over 10 minutes, repeated until symptoms resolve. The goal is a sodium rise of no more than 10 mmol/L in the first 24 hours to avoid central pontine myelinolysis. Give IV furosemide 20–40 mg for fluid overload. Provide supportive care with oxygen and haemodynamic support. Convert to general anaesthesia with intubation only if airway compromise or uncontrolled seizures occur.",
  ],
  [
    "Why is spinal anaesthesia preferred for monopolar TURP?",
    "Spinal anaesthesia is preferred for monopolar TURP because it allows early detection of TURP syndrome. An awake patient will develop restlessness, confusion, nausea, visual disturbance, and headache as glycine and fluid are absorbed — signs that are completely masked under general anaesthesia until severe cardiovascular collapse occurs. A sensory block to T10 is sufficient for prostate resection. Spinal anaesthesia also reduces blood loss compared with general anaesthesia (lower mean arterial pressure), avoids airway instrumentation in an often elderly population, and provides excellent postoperative analgesia. The main caveat is that a high spinal can mask the symptoms of bladder perforation (shoulder-tip pain, abdominal distension), so the surgeon must be vigilant and the block level carefully controlled.",
  ],
  [
    "How does bipolar TURP differ from monopolar TURP?",
    "Monopolar TURP uses a resectoscope loop that passes electrical current from the loop through the patient to a return electrode (diathermy plate) on the skin. Because the current passes through the body, non-conductive hypotonic irrigation fluid (1.5% glycine) must be used to prevent current dispersion — this is what creates the risk of TURP syndrome. Bipolar TURP uses a loop with both active and return electrodes at the tip, so current flows only in the immediate surgical field. This allows the use of isotonic saline irrigation, which eliminates the risk of dilutional hyponatraemia and TURP syndrome. Bipolar resection also produces less tissue burning at the margins and allows longer resection times. Laser techniques (HoLEP, GreenLight PVP) also use saline irrigation. However, fluid overload from excessive absorption remains possible with all techniques, and resection time should still be limited.",
  ],
  [
    "What are the risks of the lithotomy position?",
    "The lithotomy position places the patient supine with hips flexed 80–90° and legs elevated in stirrups. Risks include: (1) Nerve injury — the common peroneal nerve is compressed at the lateral fibular head by the stirrup, producing foot drop; the femoral nerve is stretched by hip hyperflexion; the obturator and sciatic nerves can also be injured. (2) Compartment syndrome — prolonged elevation (>4 hours), especially with steep Trendelenburg and external compression, can cause raised pressure in the calf compartments leading to ischaemia. (3) Haemodynamic shifts — leg elevation increases venous return and preload initially; when legs are lowered at the end of surgery, there is a sudden fall in preload and potential hypotension. (4) Respiratory compromise — abdominal viscera shift cephalad, reducing functional residual capacity and compliance, similar to the Trendelenburg position. (5) DVT risk — venous stasis in the elevated legs; intermittent pneumatic compression should be used. All pressure points must be padded and stirrups adjusted to minimise hip flexion and external rotation.",
  ],
  [
    "What are the anaesthetic considerations for radical cystectomy?",
    "Radical cystectomy is major surgery (4–8 hours) with significant blood loss (1–3 L typical) in an often elderly population with smoking history and cardiovascular comorbidity. Preoperative optimisation includes cardiopulmonary assessment, prehabilitation, and nutritional support. Monitoring requires an arterial line, central venous access, cardiac output monitoring (oesophageal Doppler, FloTrac, or PiCCO), and urinary catheter. Cross-match 4–6 units of blood; cell salvage may be used if malignancy is not present at the surgical field. Anaesthetic technique: general anaesthesia with a thoracic epidural (T8–T10) or bilateral TAP/rectus sheath blocks plus patient-controlled analgesia for postoperative pain. Enhanced recovery (ERAS) protocols are standard: early feeding, early mobilisation, alvimopan for postoperative ileus, and avoidance of nasogastric tubes. Temperature management is critical — active warming to maintain normothermia and reduce bleeding. Fluid management should be goal-directed to balance renal perfusion against third-space losses without overloading.",
  ],
  [
    "What is propofol-induced penile erection and how is it managed?",
    "Propofol-induced penile erection is an uncommon but well-recognised phenomenon in which penile tumescence or full erection occurs after induction or during maintenance with propofol, reported most often in endoscopic urology. The proposed mechanism is central disinhibition of the spinal erection reflex combined with GABA-mediated relaxation of cavernosal smooth muscle and reduced sympathetic tone. Management is escalating: (1) deepen anaesthesia with additional propofol or opioid (fentanyl/alfentanil), which paradoxically resolves the erection in many cases; (2) switch to volatile maintenance or add ketamine; (3) pharmacological detumescence with intracavernosal phenylephrine 100–200 µg (alpha-agonist, with blood pressure and ECG monitoring) or IV ephedrine; (4) mechanical methods (ice packs, compression) are generally ineffective alone; (5) last resort is to abandon the procedure if detumescence fails and instrumentation is unsafe. It should not be confused with priapism — this is a transient anaesthesia-related event without ischaemia. If it persists >4 hours postoperatively, treat as low-flow priapism.",
  ],
  [
    "What are the risks of robotic nephrectomy and prostatectomy?",
    "Robotic urological surgery (da Vinci system) combines pneumoperitoneum with steep Trendelenburg positioning, producing several physiological challenges: (1) Pneumoperitoneum raises intra-abdominal pressure, reducing venous return, increasing systemic vascular resistance, and causing hypercapnia from CO₂ absorption. (2) Steep Trendelenburg increases intra-ocular pressure (risk in glaucoma), intracranial pressure, and facial/airway oedema — the endotracheal tube may become displaced or the cuff leak may worsen as the head swells. (3) Atelectasis and V/Q mismatch in the dependent lungs reduce compliance. (4) Brachial plexus stretch from arm abduction in the lateral position for nephrectomy. (5) Access-related injuries: trocar insertion can damage vessels or bowel. Anaesthetic management includes: secure ETT with careful fixation and monitoring for displacement; controlled ventilation with increased tidal volume or PEEP to counter atelectasis; monitoring of arterial blood gases; maintaining adequate mean arterial pressure for renal perfusion; and careful positioning with padding of all pressure points.",
  ],
  [
    "How is ESWL performed and what are the anaesthetic considerations?",
    "Extracorporeal shock wave lithotripsy uses focused shock waves to fragment renal and ureteric calculi. The patient must be immobile because movement dissipates the shock wave energy. Anaesthetic options range from intravenous sedation with analgesia (e.g., remifentanil or alfentanil) to spinal anaesthesia or general anaesthesia, depending on patient factors, stone size, and machine type. Cardiac gating (synchronising shock waves to the R-wave) prevents arrhythmias by avoiding delivery during the vulnerable period of the cardiac cycle. Contraindications include pregnancy, aortic aneurysm in the shock wave path, uncorrected coagulopathy, and pacemakers (unless the device can be programmed to ignore the shock waves). Blood pressure should be controlled because hypertension worsens stone fragmentation. Post-procedure, patients may experience haematuria, flank pain (treated with NSAIDs if renal function permits), and steinstrasse (stone street — ureteric obstruction by fragments).",
  ],
  [
    "What fluid resuscitation principles apply to major urological surgery?",
    "Major urological surgery (radical cystectomy, nephrectomy, major prostatectomy) involves significant fluid shifts, blood loss, and third-space losses. Principles include: (1) Goal-directed fluid therapy using cardiac output monitoring (oesophageal Doppler, FloTrac, or LiDCO) to optimise stroke volume and avoid both hypovolaemia and fluid overload. (2) Balanced crystalloids (Plasma-Lyte, Hartmann's) are preferred over 0.9% saline to avoid hyperchloraemic metabolic acidosis. (3) Colloids may be used for rapid volume expansion but carry cost and coagulation considerations. (4) Blood transfusion is guided by haemoglobin concentration, ongoing losses, and tissue oxygenation — maintain Hb >80 g/L in most patients, higher if ischaemic heart disease. (5) Mannitol 10–20% may be given before renal clamping to promote osmotic diuresis and protect tubular function. (6) Avoid nephrotoxins (aminoglycosides, NSAIDs in single-kidney patients, contrast) perioperatively. (7) Maintain mean arterial pressure >65 mmHg (higher if chronic hypertension) to preserve renal perfusion.",
  ],
  [
    "What are the anaesthetic considerations for transurethral resection of bladder tumour (TURBT)?",
    "TURBT shares many considerations with TURP but has additional risks. Fluid absorption still occurs (especially with large, multi-focal, or lateral-wall tumours) and can produce TURP-like syndrome even with saline irrigation because volume overload and dilutional hyponatraemia are possible. Bladder perforation is a specific risk — the thin bladder wall is easily traumatised, and the obturator nerve reflex can cause sudden violent thigh adduction that thrusts the resectoscope through the bladder wall. This risk is reduced by neuromuscular blockade or spinal anaesthesia. If perforation occurs, the awake patient under spinal will complain of shoulder-tip pain, abdominal distension, and nausea; under GA, perforation may be recognised by hypotension, reduced urine output, and abdominal rigidity. Small extraperitoneal perforations are managed conservatively with catheter drainage; intraperitoneal perforation requires surgical repair. Post-TURBT, intravesical chemotherapy (e.g., mitomycin C) may be instilled — the anaesthetist should be aware of timing and potential systemic effects.",
  ],
];

const UrologicalAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Urological Anaesthesia"
      subtitle="FRCA Final — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="urological-anaesthesia"
      quizQuestions={urologicalAnaesthesiaQuestions}
      objectives={[
        "Recognise and manage TURP syndrome including hyponatraemia and visual symptoms.",
        "Compare monopolar, bipolar and laser prostatectomy techniques and their irrigation risks.",
        "Identify nerve injury and compartment syndrome risks of the lithotomy position.",
        "Plan anaesthesia for radical cystectomy including monitoring, blood loss and ERAS.",
        "Outline considerations for nephrectomy, robotic urology and ESWL.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["CU_BK_03"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["BJA Educ TURP 2014", "BJA Educ Cystectomy 2017"],
        workedExamples: ["BJA Educ TURP 2014", "AAGBI Lithotomy 2015"],
        keyPoints: ["BJA Educ TURP 2014", "ERAS Cystectomy 2013", "AAGBI Lithotomy 2015", "BJA Educ Cystectomy 2017"],
      }}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />

          <div id="intro" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["CU_BK_03"]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Urological surgery ranges from minor cystoscopy to major radical procedures. Anaesthetic considerations include lithotomy positioning, fluid absorption syndromes, laser safety, and the often elderly comorbid patient population. Neuraxial anaesthesia is frequently preferred for lower urinary tract procedures.
            </p>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="turp" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["CU_BK_03"]}>
            <CollapsibleSubsection title="TURP Syndrome">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Absorption of hypotonic glycine 1.5% irrigation fluid during transurethral resection of the prostate — a potentially life-threatening complication.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Mechanism", value: "Absorption of hypotonic irrigant via open prostatic venous sinuses" },
                { label: "Volume risk", value: "Absorption of >1–2 L glycine; risk ↑ with resection time >60 min" },
                { label: "Features", value: "Hyponatraemia, confusion, visual disturbance, seizures, pulmonary oedema, cardiovascular collapse" },
                { label: "Hyponatraemia", value: <>Dilutional — Na⁺ may fall to &lt;120 mmol/L; rapid fall is most dangerous<InlineRef topicId="urological-anaesthesia" refLabel="BJA Educ TURP 2014" /></> },
                { label: "Visual symptoms", value: "Glycine is an inhibitory neurotransmitter in the retina — causes transient blindness" },
                { label: "Management", value: <>Stop surgery, IV furosemide, hypertonic saline (1.8–3%) if Na⁺ &lt;120 with symptoms, supportive care<InlineRef topicId="urological-anaesthesia" refLabel="BJA Educ TURP 2014" /></> },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
              <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
              <p className="text-xs text-muted-foreground">
                Spinal anaesthesia for TURP allows early detection of TURP syndrome — the awake patient develops confusion, restlessness, and nausea. Under GA these signs are masked. Spinal block to T10 is sufficient.
              </p>
            </div>
            <h3 className="font-semibold text-foreground text-sm mt-4 mb-2">Correcting the hyponatraemia — practical regimen</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li><strong>Symptomatic (seizures, obtundation, pulmonary oedema)</strong>: give 3% sodium chloride 100 mL (or 2 mL/kg) IV over 10 minutes, repeated up to three times until symptoms stop, aiming to raise serum Na⁺ by 3–5 mmol/L acutely — this is enough to reverse cerebral oedema<InlineRef topicId="urological-anaesthesia" refLabel="Hyponatraemia Guideline 2014" /></li>
              <li><strong>Preparing 3% saline if unavailable ready-made</strong>: add 30 mL of 30% sodium chloride (or 60 mL of 15%) to 470 mL of 0.9% saline; label clearly, give through a reliable large vein and ideally by infusion pump with a doctor present</li>
              <li><strong>Correction limit</strong>: total rise must not exceed 8–10 mmol/L in the first 24 hours (and 8 mmol/L per 24 h thereafter) to avoid osmotic demyelination; stop hypertonic saline once symptoms resolve and Na⁺ is around 125–130 mmol/L</li>
              <li><strong>Fluid handling</strong>: stop all hypotonic fluid, restrict free water, and give furosemide only where there is fluid overload or pulmonary oedema — furosemide alone in the euvolaemic patient worsens sodium loss</li>
              <li><strong>Monitoring</strong>: hourly serum sodium and U&amp;E until stable, hourly GCS and neurological observations, continuous ECG, and invasive arterial monitoring with HDU/ICU care if there is cardiovascular instability, seizures or a Na⁺ &lt;120 mmol/L</li>
            </ul>
            <h3 className="font-semibold text-foreground text-sm mt-4 mb-2">Glycine toxicity and hyperammonaemia</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li><strong>Metabolism</strong>: glycine is deaminated in the liver by glycine oxidase to glyoxylic acid and ammonia; oxalate is a further metabolite (a cause of postoperative renal injury)<InlineRef topicId="urological-anaesthesia" refLabel="CEACCP TURP 2009" /></li>
              <li><strong>Clinical effects</strong>: glycine is an inhibitory retinal and spinal neurotransmitter — transient blindness and dilated unreactive pupils lasting hours to 48 h; ammonia accumulation causes encephalopathy with nausea, vomiting, agitation then coma, and is markedly worse in patients with pre-existing liver disease or reduced arginine availability</li>
              <li><strong>Investigation</strong>: measure plasma ammonia (levels &gt;150 µmol/L correlate with encephalopathy), serum osmolality and osmolar gap, glucose, and liver function<InlineRef topicId="urological-anaesthesia" refLabel="BJA Educ TURP 2014" /></li>
              <li><strong>Treatment</strong>: supportive — stop absorption (abandon resection), secure the airway if GCS falls, correct sodium as above; for significant hyperammonaemia consider L-arginine, sodium benzoate or sodium phenylacetate, and haemodialysis/haemofiltration if ammonia is very high or the patient has liver failure</li>
              <li><strong>Prevention</strong>: limit resection to 60 minutes and 60 g of tissue, keep irrigation bag height &lt;60 cm, use bipolar resection with normal saline irrigation in high-risk patients, and prefer spinal anaesthesia so early neurological signs are visible</li>
            </ul>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">

              <TURPSyndromeDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="bipolar-laser" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["CU_BK_03"]}>
            <CollapsibleSubsection title="Bipolar TURP & Laser Prostatectomy">
            <p className="text-muted-foreground leading-relaxed">
              Modern bipolar TURP uses isotonic saline irrigation, eliminating the risk of TURP syndrome. HoLEP (holmium laser enucleation) and GreenLight PVP (photoselective vaporisation) also use saline. However, fluid overload from excessive absorption remains possible. Bipolar/laser techniques allow longer resection times and are increasingly standard.
            </p>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="lithotomy" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["CU_BK_03"]}>
            <CollapsibleSubsection title="Lithotomy Position">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Nerve injury</strong>: common peroneal nerve (lateral fibular head compression), femoral nerve (hip hyperflexion), obturator nerve</li>
              <li><strong>Compartment syndrome</strong>: prolonged elevation &gt;4 hours — calf compartment syndrome risk</li>
              <li><strong>Haemodynamic effects</strong>: legs elevated → ↑ preload initially; legs lowered → sudden ↓ preload (hypotension)</li>
              <li><strong>Respiratory</strong>: abdominal viscera push diaphragm cephalad → ↓ FRC, ↓ compliance (similar to Trendelenburg)</li>
              <li><strong>DVT risk</strong>: avoid calf compression from supports; use intermittent pneumatic compression</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="cystectomy" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["CU_BK_03"]}>
            <CollapsibleSubsection title="Radical Cystectomy">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Major surgery (4–8 hours) with significant blood loss, fluid shifts, and high complication rate. Often elderly patients with smoking history and cardiovascular disease.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Preoperative</strong>: cardiopulmonary assessment, prehabilitation, nutritional optimisation</li>
              <li><strong>Monitoring</strong>: arterial line, CVC, cardiac output monitoring, urinary catheter (pre-diversion)</li>
              <li><strong>Blood loss</strong>: 1–3 L typical; crossmatch 4–6 units, cell salvage if no malignancy at field</li>
              <li><strong>Analgesia</strong>: thoracic epidural (T8–T10) or bilateral TAP/rectus sheath blocks + PCA</li>
              <li><strong>ERAS</strong>: enhanced recovery protocols reduce LOS — early feeding, mobilisation, alvimopan for ileus</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="nephrectomy" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Nephrectomy & Renal Surgery">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Lateral position</strong>: dependent lung compression, V/Q mismatch; kidney bridge may compress IVC</li>
              <li><strong>Laparoscopic</strong>: pneumoperitoneum effects (↑ PaCO₂, ↓ venous return, ↑ airway pressures)</li>
              <li><strong>Robotic</strong>: steep Trendelenburg + pneumoperitoneum — significant ↑ IOP, ↑ ICP, facial/airway oedema</li>
              <li><strong>Renal function</strong>: protect remaining kidney — maintain renal perfusion, avoid nephrotoxins</li>
              <li><strong>Analgesia</strong>: paravertebral block, wound catheter, or TAP block; avoid NSAIDs if single kidney</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="propofol-erection" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["CU_BK_03"]}>
            <CollapsibleSubsection title="Propofol-Induced Penile Erection">
            <p className="text-muted-foreground leading-relaxed mb-3">
              An uncommon but well-recognised phenomenon: penile tumescence or full erection occurring after induction or during maintenance with propofol. Reported incidence is low (case reports and small series), but the consequences in endoscopic urology can be significant.
            </p>
            <div className="mb-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <PropofolErectionMechanismDiagram />
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              {[
                { label: "Proposed mechanism", value: "Central disinhibition of spinal erection reflex + relaxation of cavernosal smooth muscle via NO/GABAergic effects; reduced sympathetic tone" },
                { label: "Timing", value: "Typically within minutes of induction or after a bolus; may persist or recur during TIVA maintenance" },
                { label: "Surgical impact", value: "Prevents passage of cystoscope/resectoscope; obscures TURP/TURBT field; risks urethral trauma if instrumentation forced" },
                { label: "Other agents implicated", value: "Thiopentone (rare), occasional reports with volatiles; benzodiazepines and opioids generally protective" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm font-semibold text-foreground mb-2">Management options (escalating)</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
              <li><strong>Deepen anaesthesia</strong>: additional propofol bolus paradoxically resolves it in many cases; add opioid (fentanyl/alfentanil)</li>
              <li><strong>Switch technique</strong>: convert TIVA to volatile maintenance, or add ketamine</li>
              <li><strong>Pharmacological detumescence</strong>: intracavernosal phenylephrine 100–200 µg (α-agonist — needs BP/ECG monitoring), or ephedrine IV; terbutaline 0.25–0.5 mg SC has been reported<InlineRef topicId="urological-anaesthesia" refLabel="BJA Educ TURP 2014" /></li>
              <li><strong>Mechanical</strong>: ice packs, manual compression — generally ineffective alone</li>
              <li><strong>Last resort</strong>: abandon procedure if detumescence fails and instrumentation unsafe</li>
            </ul>
            <div className="mb-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <PropofolErectionAlgorithmDiagram />
            </div>
            <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
              <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
              <p className="text-xs text-muted-foreground">
                Do not confuse with priapism — this is a transient anaesthesia-related event without ischaemia. However, if it persists &gt;4 hours post-op, treat as low-flow priapism (aspiration + intracavernosal phenylephrine, urology referral). Document and warn the patient pre-operatively if recurrence is anticipated.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="eswl" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Extracorporeal Shock Wave Lithotripsy (ESWL)">
            <p className="text-muted-foreground leading-relaxed">
              Focused shock waves fragment renal/ureteric calculi. Requires immobility and may be painful. Options: sedation + analgesia, spinal anaesthesia, or GA. Cardiac gating (trigger on R-wave) prevents arrhythmias. Contraindicated in pregnancy, aortic aneurysm, and uncorrected coagulopathy.
            </p>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "TURP syndrome: glycine 1.5% irrigation absorption → hyponatraemia, hypo-osmolality, hyperammonaemia, visual disturbance — limit resection to 1 h and 60 g.",
              "Use saline irrigation with bipolar resection to avoid TURP syndrome.",
              "Bladder perforation under spinal: shoulder-tip pain, abdominal distension, hypotension — surgical decision.",
              "Lithotomy: nerve injury (common peroneal, femoral), compartment syndrome with prolonged steep positioning, sudden SVR fall on leg lowering.",
              "ESWL: shock waves cause arrhythmias — synchronise to R wave; avoid pacemakers over shock-wave path.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Urological Anaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Evidence-based answers to the questions FRCA Final candidates most often ask about TURP syndrome, spinal vs general anaesthesia for TURP, bipolar and laser prostatectomy, lithotomy position risks, radical cystectomy, propofol-induced penile erection, robotic surgery, ESWL, and TURBT.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {uroFaqs.map(([q, a], i) => (
                <AccordionItem key={q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <Helmet>
            <title>Urological Anaesthesia — TURP syndrome, lithotomy, cystectomy & ESWL</title>
            <meta
              name="description"
              content="Urological anaesthesia for FRCA Final: TURP syndrome and hyponatraemia management, spinal vs general anaesthesia for TURP, bipolar and laser prostatectomy, lithotomy position risks, radical cystectomy and ERAS, nephrectomy and robotic surgery, propofol-induced penile erection, and ESWL."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: uroFaqs.map(([name, acceptedAnswer]) => ({
                "@type": "Question",
                name,
                acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
              })),
            })}</script>
          </Helmet>
        </>
      }
      workedExamples={[
        {
          title: "Confused patient 45 min into monopolar TURP",
          scenario: "A 75-year-old man under spinal anaesthesia for TURP becomes restless and complains of blurred vision 45 min into resection. Na⁺ 118 mmol/L, BP 95/55, SpO₂ 92% on air, mild crackles at bases.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Diagnose <strong>TURP syndrome</strong>: hyponatraemia + neuro symptoms + fluid overload after &gt;1 L glycine absorption.</li>
                <li>Tell surgeon to <strong>stop resection</strong> and achieve haemostasis; lower the irrigant bag height.</li>
                <li>Send urgent U&E, glucose, ABG; check serum osmolality and ammonia (glycine → ammonia in hepatic impairment).</li>
                <li>Severe symptomatic hyponatraemia (&lt;120 with seizures/coma): give <strong>3% NaCl 1–2 mL/kg over 10 min</strong>, repeat until symptoms resolve. Aim Na⁺ rise ≤10 mmol/L in first 24 h to avoid central pontine myelinolysis.</li>
                <li>IV <strong>furosemide 20–40 mg</strong> for pulmonary oedema. Support oxygenation; consider non-invasive ventilation.</li>
                <li>Convert to GA + ETT only if airway compromise or seizures uncontrolled.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Correcting Na⁺ too rapidly (&gt;10 mmol/L/24h) → osmotic demyelination.</li>
                  <li>Giving 0.9% saline only — won't reverse severe symptomatic hyponatraemia.</li>
                  <li>Forgetting to ask the surgeon how much irrigant has been used.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Stop surgery, 3% NaCl 1–2 mL/kg, furosemide, controlled Na⁺ rise ≤10 mmol/L/24h.",
          cites: ["BJA Educ TURP 2014"],
        },
      ]}
      keyPoints={[
        { text: "TURP syndrome: hyponatraemia from glycine absorption — confusion, visual disturbance, seizures", cites: ["BJA Educ TURP 2014"] },
        { text: "Spinal anaesthesia for TURP allows early detection of absorption symptoms in awake patients", cites: ["ERAS Cystectomy 2013"] },
        { text: "Bipolar TURP and laser techniques use saline — no TURP syndrome risk but fluid overload still possible", cites: ["BJA Educ Cystectomy 2017"] },
        { text: "Lithotomy position risks: common peroneal nerve injury, compartment syndrome, haemodynamic shifts", cites: ["AAGBI Lithotomy 2015"] },
        { text: "Radical cystectomy: major blood loss, elderly patients, thoracic epidural/TAP blocks, ERAS protocols", cites: ["BJA Educ TURP 2014"] },
      ]}
    />
  );
};

export default UrologicalAnaesthesiaTopic;
