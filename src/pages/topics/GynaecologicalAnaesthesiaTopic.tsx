import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { gynaecologicalAnaesthesiaQuestions } from "@/data/quizzes";
import PneumoperitoneumTrendelenburgDiagram from "@/components/diagrams/clinical/PneumoperitoneumTrendelenburgDiagram";
import TURPSyndromeDiagram from "@/components/diagrams/clinical/TURPSyndromeDiagram";
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
  { id: "physiology", label: "Pneumoperitoneum & Trendelenburg", group: "Core" },
  { id: "robotic", label: "Robotic gynaecological surgery", group: "Techniques" },
  { id: "hysteroscopy", label: "Hysteroscopy & fluid absorption", group: "Techniques" },
  { id: "oncology", label: "Major gynaecological oncology", group: "Major surgery" },
  { id: "shoulder-tip", label: "Shoulder-tip pain", group: "Complications" },
  { id: "hipec", label: "HIPEC", group: "Major surgery" },
  { id: "ectopic", label: "Ectopic pregnancy", group: "Emergency" },
  { id: "gas-embolism", label: "CO₂ gas embolism", group: "Complications" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const gynaeFaqs: Array<[string, string]> = [
  [
    "What are the cardiovascular effects of pneumoperitoneum and steep Trendelenburg?",
    "Pneumoperitoneum with CO₂ insufflation to 12–15 mmHg raises intra-abdominal pressure, which initially increases preload by autotransfusion from compressed splanchnic and lower-limb venous beds. However, as insufflation continues, IVC compression reduces venous return. Systemic vascular resistance rises from mechanical compression and neuroendocrine activation (catecholamines, vasopressin, renin–angiotensin). Mean arterial pressure typically increases 10–20%, though cardiac output may fall in hypovolaemic patients. Steep Trendelenburg (15–30°) further increases preload and central blood volume, raises intracranial and intra-ocular pressure, and causes cephalad diaphragm shift that reduces functional residual capacity by 20–30%. Together these produce a hyperdynamic, high-afterload state with reduced respiratory compliance.",
  ],
  [
    "Why is airway oedema a concern in prolonged robotic gynaecological surgery?",
    "Prolonged steep Trendelenburg (3–6 hours) combined with pneumoperitoneum causes significant venous stasis in the head and neck. Raised central venous pressure promotes facial, conjunctival, and laryngeal oedema. At extubation, the airway may be compromised by narrowed supraglottic structures or an endotracheal tube that now fits too tightly due to tissue swelling. A cuff-leak test should be performed before extubation; if absent, the patient may remain intubated until oedema resolves. Re-intubation after robotic surgery can be difficult because of laryngeal swelling and the supine-to-sitting transition. Prophylactic measures include limiting head-down time where possible, maintaining normovolaemia, and using slight reverse Trendelenburg before extubation.",
  ],
  [
    "How does hysteroscopy fluid absorption differ from TURP syndrome?",
    "The mechanism is identical: hypotonic, electrolyte-free distension fluid (classically 1.5% glycine) is absorbed through open venous sinuses when intrauterine pressure exceeds mean arterial pressure. In hysteroscopy the open vascular bed is the uterine venous sinuses rather than prostatic ones. The clinical syndrome is therefore a 'TURP-equivalent': dilutional hyponatraemia, hypo-osmolality, cerebral oedema, and glycine neurotoxicity (glycine is an inhibitory CNS and retinal neurotransmitter, causing transient visual disturbance). BSGE 2018 recommends stopping the procedure at a fluid deficit of 1,000 mL for hypotonic electrolyte-free media and 2,500 mL for isotonic saline (used with bipolar resectoscopes). Management is the same as TURP syndrome: stop surgery, send urgent U&E and osmolality, give 3% saline if Na⁺ <120 mmol/L with symptoms, and limit correction to ≤8–10 mmol/L per 24 hours.",
  ],
  [
    "What are the anaesthetic considerations for major gynaecological oncology surgery?",
    "Radical hysterectomy, pelvic exenteration, and ovarian cancer debulking are lengthy (4–8+ hours) with potential for massive blood loss and significant physiological insult. Patients with ovarian cancer may be cachectic with ascites, pleural effusions, and hypoalbuminaemia. Anaesthetic planning includes: large-bore IV access, arterial line, central venous access, and cardiac output monitoring; crossmatching 4–6 units; cell salvage (controversial in malignancy — leucodepletion filters may be used). Thoracic epidural (T8–T10) or TAP/QL blocks provide excellent analgesia and reduce opioid requirements. VTE prophylaxis is critical: LMWH plus intermittent pneumatic compression. ERAS protocols (Nelson/ERAS Society 2019) are standard: avoid long-acting opioids, use multimodal analgesia, early oral intake, early mobilisation, and minimal drain use. Temperature management with forced-air warming is essential to reduce blood loss and infection risk.",
  ],
  [
    "How should CO₂ gas embolism during laparoscopy be managed?",
    "CO₂ gas embolism presents with sudden cardiovascular collapse, profound hypotension, bradycardia, and a characteristic drop in end-tidal CO₂ (gas blocks pulmonary capillary perfusion, preventing CO₂ excretion). A 'mill-wheel' murmur may be audible over the precordium from gas in the right ventricle. Management: tell the surgeon to stop insufflation and desufflate the abdomen immediately; place the patient head-down and left lateral decubitus (Durant position) to trap gas in the RV apex away from the RV outflow tract; give 100% oxygen and stop N₂O (which would diffuse into and enlarge the bubble); administer fluids and vasopressors (noradrenaline, adrenaline if arrest); aspirate gas via a multi-orifice central venous catheter placed in the right atrium if available. Transoesophageal echocardiography confirms the diagnosis. Distinguish from tension pneumothorax (asymmetric breath sounds, initially ↑ EtCO₂) and severe vagal response to peritoneal stretch (resolves with desufflation and atropine).",
  ],
  [
    "What are the risks of the lithotomy position in gynaecological surgery?",
    "The lithotomy position (hips flexed 80–90°, legs elevated in stirrups) places the common peroneal nerve at risk of compression at the lateral fibular head against the stirrup, producing foot drop. The femoral nerve can be stretched by excessive hip flexion, abduction, or external rotation. The sciatic and obturator nerves are also vulnerable. Prolonged elevation (>4 hours), especially with steep Trendelenburg, raises the risk of lower-limb compartment syndrome from venous congestion and external calf compression. Haemodynamically, leg elevation increases venous return initially; lowering the legs at the end of surgery produces sudden preload reduction and hypotension. Respiratory mechanics worsen as abdominal viscera shift cephalad, reducing FRC and compliance. DVT risk is increased by venous stasis — intermittent pneumatic compression should be used. All pressure points must be padded and stirrups adjusted to minimise hip flexion and external rotation.",
  ],
  [
    "How does spinal anaesthesia compare with general anaesthesia for laparoscopic gynaecological surgery?",
    "General anaesthesia with controlled ventilation is standard for laparoscopic gynaecological surgery because pneumoperitoneum and Trendelenburg cause significant respiratory compromise that would distress an awake patient. However, spinal anaesthesia has been used successfully for selected diagnostic laparoscopy and minor procedures in appropriately motivated patients. Advantages include reduced postoperative nausea and vomiting, earlier oral intake, and excellent analgesia. Disadvantages include limited duration, inability to control ventilation (CO₂ absorption causes dyspnoea), patient discomfort from shoulder-tip pain (diaphragmatic CO₂ irritation), and anxiety from Trendelenburg. For robotic and major laparoscopic surgery, general anaesthesia is mandatory. For minor diagnostic procedures, a low-dose spinal with supplemental sedation and good communication may be appropriate in experienced hands.",
  ],
  [
    "What are the specific considerations for anaesthesia in ovarian cancer debulking?",
    "Ovarian cancer debulking surgery can be extensive, involving upper abdominal disease (omentum, liver capsule, diaphragm, bowel resection) in addition to pelvic surgery. Patients often present with large-volume ascites, pleural effusions, and significant hypoalbuminaemia from chronic disease. Preoperative drainage of tense ascites and significant pleural effusions improves respiratory mechanics and reduces intraoperative hypotension. Massive blood loss is possible — ensure adequate access, crossmatch, and consider cell salvage (malignancy concern but increasingly accepted with leucodepletion). Hyperthermic intraperitoneal chemotherapy (HIPEC) may follow debulking: this requires core temperature management, renal protection (high-dose fluids, mannitol), and monitoring for electrolyte disturbances. Postoperative ICU/HDU admission is common due to fluid shifts, third-space losses, and respiratory compromise from diaphragmatic stripping.",
  ],
  [
    "What enhanced recovery (ERAS) principles apply to gynaecological surgery?",
    "ERAS Society guidelines for gynaecological oncology (Nelson et al., 2019) recommend: preoperative counselling and carbohydrate loading (oral maltodextrin 2 h pre-op); avoidance of mechanical bowel preparation unless required for rectal surgery; thromboprophylaxis with LMWH and mechanical compression; antibiotic prophylaxis (co-amoxiclav or cefuroxime + metronidazole); short-acting anaesthetic agents; opioid-sparing multimodal analgesia with thoracic epidural or fascial plane blocks (TAP/QL); antiemetic prophylaxis (dexamethasone + ondansetron/TNK); avoidance of nasogastric tubes and drains where possible; early oral intake (within 4 h), early mobilisation (within 24 h), and early removal of urinary catheter. Alvimopan may be used to accelerate return of bowel function after major abdominal surgery. These measures reduce length of stay, postoperative ileus, and complications.",
  ],
  [
    "What are the anaesthetic considerations for ruptured ectopic pregnancy?",
    "Ruptured ectopic pregnancy is a surgical emergency with life-threatening intra-abdominal haemorrhage. Presentation ranges from haemodynamic stability to profound shock. Key anaesthetic considerations include: resuscitation with blood products (activate major haemorrhage protocol if indicated); rapid sequence induction with cricoid pressure (full stomach, pain, and opioids all increase aspiration risk); haemodynamic monitoring with arterial line and ideally cardiac output monitoring; crossmatch at least 4 units; cell salvage is appropriate (no malignancy risk); maintain normothermia and correct coagulopathy (1:1:1 transfusion ratio if massive); anti-D immunoglobulin for Rh-negative patients; and postoperative HDU/ICU for ongoing resuscitation. For unruptured ectopic managed laparoscopically, standard laparoscopic anaesthesia applies with awareness of haemorrhage risk and crossmatch availability.",
  ],
];

const GynaecologicalAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Gynaecological Anaesthesia"
      subtitle="FRCA Final — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="gynaecological-anaesthesia"
      topicTitle="Gynaecological Anaesthesia"
      objectives={[
        "Predict the cardiovascular and respiratory consequences of pneumoperitoneum and steep Trendelenburg",
        "Plan a safe anaesthetic for prolonged robotic gynaecology including airway, eye, and brachial plexus protection",
        "Recognise and manage hysteroscopy fluid absorption (TURP-syndrome equivalent)",
        "Diagnose and treat a CO₂ gas embolism intraoperatively",
        "Apply ERAS principles to major gynaecological oncology surgery",
        "Manage anaesthesia for ruptured ectopic pregnancy with haemorrhage",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia (specialty)"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ Lap 2011",
          "BJA Educ Lap 2011",
          "ERAS Gynae 2019",
        ],
        workedExamples: [
          "BJA Educ Lap 2011",
          "BSGE 2018",
          "BJA Educ TURP 2014",
        ],
        keyPoints: [
          "BJA Educ Lap 2011",
          "ERAS Gynae 2019",
          "BSGE 2018",
          "BJA Educ TURP 2014",
        ],
      }}
      keyPoints={[
        { text: "Pneumoperitoneum + steep Trendelenburg: ↑ PaCO₂, ↓ FRC by 20–30%, ↑ IOP/ICP, facial and laryngeal oedema — plan for difficult extubation", cites: ["BJA Educ Lap 2011"] },
        { text: "Robotic surgery: prolonged position → airway oedema; perform cuff-leak test before extubation; limited patient access during dock", cites: ["BJA Educ Lap 2011"] },
        { text: "Hysteroscopy fluid absorption: STOP at deficit 1,000 mL glycine / 2,500 mL saline (BSGE 2018); dilutional hyponatraemia + glycine neurotoxicity", cites: ["BSGE 2018", "BJA Educ Hysteroscopy 2017"] },
        { text: "CO₂ gas embolism: sudden ↓ EtCO₂ + mill-wheel murmur — head-down left lateral (Durant) + CVC aspiration; stop N₂O immediately", cites: ["BJA Educ TURP 2014"] },
        { text: "Glycine syndrome: dilutional hyponatraemia, transient blindness, hyperammonaemia. Correct Na⁺ ≤ 8–10 mmol/L per 24 h to avoid osmotic demyelination", cites: ["BSGE 2018"] },
        { text: "ERAS gynae-oncology: thoracic epidural / TAP block, opioid sparing, early mobilisation, LMWH + mechanical VTE prophylaxis, avoid NG tubes", cites: ["ERAS Gynae 2019"] },
        { text: "Ruptured ectopic: rapid sequence induction, major haemorrhage protocol, blood products, anti-D for Rh-negative, postoperative HDU/ICU", cites: ["BJA Educ Lap 2011"] },
      ]}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />

          <div id="intro" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia (specialty)"]}>
              <CollapsibleSubsection title="Introduction" defaultOpen>
                <p className="text-muted-foreground leading-relaxed">
                  Gynaecological surgery spans minor day-case procedures (diagnostic hysteroscopy, laparoscopic sterilisation) to major oncological operations (radical hysterectomy, pelvic exenteration, ovarian debulking). Most procedures are now laparoscopic or robotic, creating unique physiological challenges from pneumoperitoneum and Trendelenburg positioning. Key concerns include cardiovascular and respiratory compromise, airway oedema after prolonged head-down surgery, fluid absorption during hysteroscopy, venous thromboembolism risk, and the application of enhanced recovery principles to reduce morbidity.
                </p>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="physiology" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia (specialty)"]}>
              <CollapsibleSubsection title="Pneumoperitoneum & Steep Trendelenburg">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  The combination of CO₂ pneumoperitoneum and steep Trendelenburg (15–30°) produces a predictable but complex physiological disturbance affecting multiple organ systems. Understanding these changes is essential for safe anaesthetic management.
                </p>
                <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
                  <PneumoperitoneumTrendelenburgDiagram />
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Cardiovascular", value: "Initial ↑ preload (autotransfusion from compressed splanchnic/leg veins); late ↓ venous return from IVC compression. ↑ SVR from catecholamine/vasopressin release. MAP rises 10–20%" },
                    { label: "Respiratory", value: "Cephalad diaphragm shift → ↓ FRC 20–30%, ↑ peak/airway pressures, ↓ compliance. Need ↑ minute ventilation to maintain normocapnia from CO₂ absorption" },
                    { label: "Neurological", value: "↑ ICP from reduced venous drainage and hypercapnia. ↑ IOP from Trendelenburg + pneumoperitoneum — risk of ischaemic optic neuropathy in prolonged cases" },
                    { label: "Airway", value: "Facial, conjunctival, and laryngeal oedema from venous stasis. Cuff-leak test before extubation after prolonged robotic cases" },
                    { label: "Renal", value: "↓ Renal blood flow and urine output from ↑ intra-abdominal pressure and reduced cardiac output" },
                    { label: "Shoulder-tip pain", value: "Diaphragmatic irritation from residual CO₂ postoperatively; may mimic cardiac pain — warn patient and distinguish with ECG" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
                  <p className="text-xs text-muted-foreground">
                    CO₂ is 20× more blood-soluble than nitrogen, making small emboli dissolve rapidly. The lethal volume for CO₂ embolism (~1,000 mL) is far greater than for air embolism (~50 mL). Nevertheless, CO₂ gas embolism remains a recognised cause of intraoperative cardiovascular collapse during laparoscopy.
                  </p>
          </div>

          <div id="shoulder-tip" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia (specialty)"]}>
              <CollapsibleSubsection title="Shoulder-Tip Pain — Prevention & Management">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Shoulder-tip pain affects up to a third of women after laparoscopy and is often the dominant complaint delaying day-case discharge.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
                  <li><strong>Mechanism</strong>: residual subdiaphragmatic CO₂ and carbonic acid irritate the diaphragmatic peritoneum; pain is referred to the shoulder tip through the phrenic nerve (C3, 4, 5), which shares dermatomal representation with the shoulder</li>
                  <li><strong>Surgical technique</strong>: use the lowest effective insufflation pressure, humidified/warmed gas where available, and active evacuation of CO₂ under direct vision at the end of the case rather than passive deflation</li>
                  <li><strong>Anaesthetic technique</strong>: a pulmonary recruitment manoeuvre before extubation — sustained manual inflation to about 30 cmH₂O held for 5 seconds, repeated a few times with the patient in Trendelenburg — expels residual subdiaphragmatic gas and significantly reduces shoulder pain and analgesic requirement<InlineRef topicId="gynaecological-anaesthesia" refLabel="Phelps 2008" /></li>
                  <li><strong>Pharmacological</strong>: regular paracetamol and an NSAID unless contraindicated; intraperitoneal instillation of local anaesthetic (e.g. levobupivacaine to the subdiaphragmatic surface) and port-site infiltration give modest additional benefit; short-acting opioid rescue only</li>
                  <li><strong>Counselling</strong>: warn the patient preoperatively that shoulder pain is expected, self-limiting over 24–72 hours, and not cardiac in origin — otherwise it triggers unplanned admission and ECG work-up</li>
                </ul>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="robotic" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia (specialty)"]}>
              <CollapsibleSubsection title="Robotic Gynaecological Surgery">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Robotic-assisted procedures (da Vinci system) require prolonged steep Trendelenburg and pneumoperitoneum, often for 3–6 hours. The patient is largely inaccessible once the robot is docked, making meticulous preparation essential.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
                  <li><strong>Airway</strong>: facial and laryngeal oedema may preclude safe extubation — perform a cuff-leak test before removing the ETT. If absent, remain intubated. The tube may also become displaced as the head swells<InlineRef topicId="gynaecological-anaesthesia" refLabel="BJA Educ Lap 2011" /></li>
                  <li><strong>Eyes</strong>: ↑ IOP from Trendelenburg + pneumoperitoneum; tape eyelids carefully, use lubricant, and consider intra-ocular pressure in glaucoma patients</li>
                  <li><strong>Brachial plexus</strong>: arms tucked at sides — avoid shoulder braces (brachial plexus stretch injury). Pad all pressure points</li>
                  <li><strong>Access</strong>: robot docked over patient limits access to airway and lines. Secure ETT meticulously with tape and foam dressing; ensure all IV and arterial lines are long enough and accessible</li>
                  <li><strong>Emergency undocking</strong>: plan for emergency undocking (typically 2–3 minutes). Clear communication with surgical team; some centres practice 'fire drills'</li>
                  <li><strong>Ventilation</strong>: increased tidal volume or PEEP may be needed to counter atelectasis; monitor arterial blood gases for CO₂ retention</li>
                </ul>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Pre-dock checklist", value: "Secure ETT, accessible lines, padded pressure points, eye protection, warming, DVT prophylaxis applied" },
                    { label: "Extubation criteria", value: "Cuff-leak present, airway reflexes intact, normothermic, haemodynamically stable, able to maintain SpO₂ on supplemental O₂" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="hysteroscopy" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia (specialty)"]}>
              <CollapsibleSubsection title="Hysteroscopy & Fluid Absorption">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Diagnostic hysteroscopy is often performed under local anaesthesia or sedation. Operative hysteroscopy (resection of fibroids, endometrial ablation, septal division) requires general or spinal anaesthesia. The principal anaesthetic hazard is absorption of distension media through open uterine venous sinuses — a TURP-syndrome equivalent.
                </p>
                <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
                  <TURPSyndromeDiagram context="hysteroscopy" />
                  <p className="text-[11px] text-muted-foreground mt-2 italic">
                    Hysteroscopy fluid absorption shares the TURP-syndrome physiology, but the open vascular bed is the uterine venous sinuses — BSGE 2018; BJA Educ Hysteroscopy 2017.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Hypotonic media", value: "1.5% glycine, 3% sorbitol — risk of dilutional hyponatraemia and hypo-osmolality. STOP at 1,000 mL deficit (BSGE 2018)" },
                    { label: "Isotonic media", value: "0.9% saline — safe with bipolar resectoscopes. STOP at 2,500 mL deficit" },
                    { label: "Monitoring", value: "Calibrated fluid management system; check deficit every 5 min; set alarm at 750 mL (glycine)" },
                    { label: "Clinical features", value: "Confusion, nausea, visual disturbance, bradycardia, hypertension then hypotension, seizures, pulmonary oedema" },
                    { label: "Na⁺ correction", value: "3% saline 150 mL over 10 min if symptomatic Na⁺ ≤125. Max 8–10 mmol/L per 24 h to avoid central pontine myelinolysis" },
                    { label: "Adjuncts", value: "IV furosemide 20–40 mg to offload free water; HDU/ICU for hourly Na⁺ checks and neurology monitoring" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
                  <ul className="list-disc list-inside text-foreground text-sm">
                    <li>Correcting Na⁺ too quickly (&gt;10 mmol/L/24 h) → osmotic demyelination.</li>
                    <li>Giving more isotonic fluid 'for the BP' — worsens hyponatraemia.</li>
                    <li>Failing to set a deficit alarm at 750 mL with glycine — by the time clinical signs appear, significant absorption has occurred.</li>
                  </ul>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="hipec" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia (specialty)"]}>
              <CollapsibleSubsection title="HIPEC — Hyperthermic Intraperitoneal Chemotherapy">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Cytoreductive surgery followed by intraperitoneal perfusion of heated chemotherapy (commonly cisplatin, mitomycin C or paclitaxel at 41–43 °C for 30–90 minutes) combines a long, bloody laparotomy with a deliberate hyperthermic insult<InlineRef topicId="gynaecological-anaesthesia" refLabel="HIPEC Anaesth 2013" />.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Fluid shifts", value: "Massive third-space loss from peritonectomy plus perfusate-driven capillary leak — requirements often 8–12 mL/kg/h; goal-directed therapy with cardiac output monitoring rather than fixed regimens" },
                    { label: "Haemodynamics", value: "Hyperthermic phase causes vasodilatation, tachycardia and rising cardiac index (up to 50%) with falling SVR; vasopressor support (noradrenaline) is usually needed, followed by cooling and instability once perfusion stops" },
                    { label: "Temperature", value: "Monitor core AND peripheral/oesophageal-versus-bladder temperature. Active cooling during perfusion (stop warming devices, cool fluids, reduce theatre temperature), then aggressive active rewarming afterwards to avoid post-perfusion hypothermia and coagulopathy" },
                    { label: "Electrolytes & metabolism", value: "Hyponatraemia, hypokalaemia, hypomagnesaemia and hypophosphataemia; metabolic acidosis and hyperglycaemia. Check ABG, electrolytes, lactate and glucose at least hourly during perfusion" },
                    { label: "Renal protection", value: "Cisplatin nephrotoxicity — maintain generous urine output (1–2 mL/kg/h), consider sodium thiosulfate per local protocol, avoid NSAIDs and other nephrotoxins" },
                    { label: "Coagulation & analgesia", value: "Dilutional and hyperthermia-related coagulopathy — viscoelastic testing and targeted product replacement; thoracic epidural (if not coagulopathic) or bilateral TAP/rectus sheath catheters with opioid PCA" },
                    { label: "Staff safety", value: "Cytotoxic precautions: closed perfusion circuit, double gloves, gown, eye protection, smoke evacuation, minimal theatre traffic, spill kit available, and cytotoxic-waste handling of urine and drains for 48 h" },
                    { label: "Postoperative care", value: "Level 2/3 care expected — ongoing fluid resuscitation, vasopressors, rewarming, renal monitoring and prolonged ileus management" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
                  <p className="text-xs text-muted-foreground">
                    HIPEC is a two-phase problem: a hyperthermic, hyperdynamic, vasodilated phase requiring cooling and vasopressors, followed by a hypothermic, coagulopathic phase requiring warming and product replacement. Say that structure and the rest of the answer follows.
                  </p>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>


          <div id="oncology" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia (specialty)"]}>
              <CollapsibleSubsection title="Major Gynaecological Oncology">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Radical hysterectomy, pelvic exenteration, and debulking surgery for ovarian cancer are major procedures with significant morbidity. Patients may be cachectic, anaemic, and hypoalbuminaemic with ascites and pleural effusions.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
                  <li><strong>Duration</strong>: 4–8+ hours; risk of hypothermia, pressure injury, and DVT</li>
                  <li><strong>Blood loss</strong>: potentially massive — crossmatch 4–6 units; cell salvage controversial in malignancy (leucodepletion filters may be used)</li>
                  <li><strong>Ovarian cancer</strong>: patients often cachectic with ascites and pleural effusions — consider preoperative drainage to improve respiratory mechanics and reduce hypotension</li>
                  <li><strong>Analgesia</strong>: thoracic epidural (T8–T10 level) or TAP/QL blocks; multimodal approach with regular paracetamol, NSAIDs if appropriate, and opioid PCA</li>
                  <li><strong>VTE prophylaxis</strong>: LMWH + intermittent pneumatic compression; high-risk population for PE</li>
                  <li><strong>ERAS protocols</strong>: increasingly adopted — preoperative carbohydrate loading, avoid long-acting opioids, early oral intake, early mobilisation, minimal drain use, avoid NG tubes<InlineRef topicId="gynaecological-anaesthesia" refLabel="ERAS Gynae 2019" /></li>
                  <li><strong>HIPEC</strong>: hyperthermic intraperitoneal chemotherapy after debulking — see the dedicated HIPEC subsection for its physiological, temperature and staff-safety demands</li>
                </ul>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Prehabilitation", value: "Nutritional support, smoking cessation, anaemia correction, cardiopulmonary optimisation 4–6 weeks pre-op" },
                    { label: "Temperature", value: "Forced-air warming, warmed fluids, maintain core >36 °C throughout to reduce bleeding and infection" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="ectopic" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia (specialty)"]}>
              <CollapsibleSubsection title="Ectopic Pregnancy">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Ectopic pregnancy ranges from stable, unruptured cases to catastrophic haemorrhage from tubal rupture. Anaesthetic management depends on haemodynamic status and surgical urgency.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Unruptured ectopic", value: "Laparoscopic management as urgent/elective. Standard laparoscopic anaesthesia; crossmatch available; anti-D for Rh-negative" },
                    { label: "Ruptured ectopic", value: "Surgical emergency. Rapid sequence induction (full stomach), major haemorrhage protocol, blood products, arterial line, postoperative HDU/ICU" },
                    { label: "Monitoring", value: "Large-bore IV access (14–16G ×2), arterial line, urinary catheter, consider CVC for vasopressor/inotrope administration" },
                    { label: "Anti-D", value: "300 µg IM for all Rh-negative women with any ectopic pregnancy (sensitisation risk from fetal cells)" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-2">Ruptured ectopic — emergency anaesthetic management</h3>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
                  <li><strong>Diagnosis and urgency</strong>: haemodynamic instability with a positive pregnancy test mandates immediate surgery — resuscitation and laparoscopy/laparotomy proceed in parallel, not in sequence<InlineRef topicId="gynaecological-anaesthesia" refLabel="RCOG Ectopic 2016" /></li>
                  <li><strong>Haemodynamic goals</strong>: permissive hypotension with a target systolic of 80–100 mmHg (or a palpable radial pulse and maintained conscious level) until the surgeon has clamped the bleeding pedicle; avoid over-transfusion of clear fluid before surgical control</li>
                  <li><strong>Resuscitation</strong>: activate the major haemorrhage protocol, use O RhD-negative blood until group-specific units are available, and transfuse in a 1:1:1 ratio of red cells : FFP : platelets; give tranexamic acid 1 g, calcium replacement, and use a rapid infuser with fluid warming</li>
                  <li><strong>Access and monitoring</strong>: two large-bore cannulae (14–16 G), arterial line for beat-to-beat pressure and near-patient gases/haemoglobin, urinary catheter, temperature, and a central line if vasopressors are required</li>
                  <li><strong>Induction</strong>: rapid sequence induction assuming a full stomach, using ketamine 1–1.5 mg/kg or etomidate 0.3 mg/kg with rocuronium 1 mg/kg to preserve sympathetic tone; avoid a standard propofol dose because vasodilatation and loss of compensatory tone can precipitate arrest at the moment the abdomen is opened. Have vasopressor drawn up before induction and induce on the operating table with the surgeon scrubbed</li>
                  <li><strong>Maintenance</strong>: low-dose volatile or ketamine-based technique with generous opioid once bleeding is controlled; anticipate a further fall in pressure as the pneumoperitoneum is created or the tamponading clot is evacuated</li>
                  <li><strong>Anti-D</strong>: 250–500 IU (approximately 50–100 µg) IM within 72 hours for RhD-negative women having surgical management, in line with national anti-D guidance</li>
                  <li><strong>Postoperative care</strong>: HDU/ICU for ongoing resuscitation, correction of coagulopathy and acidosis, rewarming, repeat haemoglobin, and consideration of thromboprophylaxis once bleeding has stopped</li>
                </ul>

                <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
                  <p className="text-xs text-muted-foreground">
                    A young woman with amenorrhoea, abdominal pain, and hypotension has a ruptured ectopic until proven otherwise. Do not delay surgery for extensive investigation — resuscitate and operate simultaneously.
                  </p>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="gas-embolism" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia (specialty)"]}>
              <CollapsibleSubsection title="CO₂ Gas Embolism">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  CO₂ gas embolism is a rare but catastrophic complication of laparoscopy. Early recognition and immediate treatment are essential.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Diagnostic triad", value: "Sudden ↓ EtCO₂ (gas blocks pulmonary CO₂ excretion) + cardiovascular collapse + mill-wheel murmur over precordium" },
                    { label: "Immediate actions", value: "Stop insufflation, tell surgeon to desufflate, head-down + left lateral (Durant position), 100% O₂, stop N₂O" },
                    { label: "Resuscitation", value: "IV fluid bolus, vasopressors (noradrenaline ± adrenaline), aspirate gas via multi-orifice CVC in right atrium if available" },
                    { label: "Differentials", value: "Tension pneumothorax (↑ EtCO₂ initially, asymmetric breath sounds), severe vagal response (resolves with desufflation + atropine)" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
                  <ul className="list-disc list-inside text-foreground text-sm">
                    <li>Continuing N₂O — it diffuses into the bubble and enlarges it.</li>
                    <li>Putting the patient head-up to 'help breathing' — worsens RVOT obstruction.</li>
                    <li>Mistaking the EtCO₂ drop for hyperventilation and increasing minute volume — wrong diagnosis, wrong action.</li>
                  </ul>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Steep Trendelenburg + pneumoperitoneum (robotic hysterectomy/prostatectomy): raised airway pressures, facial oedema, raised ICP/IOP — perform cuff-leak test before extubation.",
              "Hysteroscopy fluid absorption: glycine 1.5% → dilutional hyponatraemia, transient blindness, hyperammonaemia. STOP at 1,000 mL deficit; correct Na⁺ ≤ 8–10 mmol/L per 24 h.",
              "Pneumoperitoneum CO₂ insufflation → absorption hypercapnia, raised SVR, reduced venous return, vagal bradycardia on initial insufflation — have atropine ready.",
              "Major gynae-oncology: high VTE risk — combine mechanical and pharmacological prophylaxis postoperatively; consider extended LMWH prophylaxis.",
              "Enhanced recovery: avoid long-acting opioids, use TAP/QL blocks, early feeding and mobilisation, minimal drain use, avoid NG tubes.",
              "CO₂ gas embolism: mill-wheel murmur + sudden EtCO₂ drop — Durant position (head-down left lateral), aspirate via CVC, stop N₂O.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Gynaecological Anaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Evidence-based answers to the questions FRCA Final candidates most often ask about pneumoperitoneum physiology, robotic surgery airway oedema, hysteroscopy fluid absorption, major gynaecological oncology, CO₂ gas embolism, lithotomy position risks, spinal vs general anaesthesia for laparoscopy, ovarian cancer debulking, ERAS principles, and ruptured ectopic pregnancy.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {gynaeFaqs.map(([q, a], i) => (
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
            <title>Gynaecological Anaesthesia — Laparoscopy, robotic surgery, hysteroscopy & oncology</title>
            <meta
              name="description"
              content="Gynaecological anaesthesia for FRCA Final: pneumoperitoneum and Trendelenburg physiology, robotic surgery airway considerations, hysteroscopy fluid absorption and TURP-equivalent syndrome, CO₂ gas embolism, major gynaecological oncology and ERAS, and ruptured ectopic pregnancy."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: gynaeFaqs.map(([name, acceptedAnswer]) => ({
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
          cites: ["BJA Educ Lap 2011"],
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
          cites: ["BSGE 2018"],
        },
      ]}
    />
  );
};

export default GynaecologicalAnaesthesiaTopic;