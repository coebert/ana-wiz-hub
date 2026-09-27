import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { Exam } from "@/data/curriculum";
import { generalColorectalSurgeryQuestions } from "@/data/quizzes";

const T = "general-colorectal-surgery";
const R = ({ l }: { l: string }) => <InlineRef topicId={T} refLabel={l} />;

const faqs: Array<[string, string]> = [
  [
    "Is a thoracic epidural still recommended for laparoscopic colorectal surgery?",
    "No, not routinely. ERAS 2025 advises against thoracic epidurals for minimally invasive colorectal surgery; it also prefers another suitable regional or abdominal wall technique in open surgery where feasible. PROSPECT 2024 still recommends a low continuous thoracic epidural as first-line for open colorectal surgery. Choose according to incision, contraindications and local pain-service support.",
  ],
  [
    "Is a high-dose morphine spinal better than an epidural for major bowel surgery?",
    "No head-to-head evidence establishes that. A single-shot intrathecal morphine spinal can reduce pain and opioid use, particularly after laparoscopic resection, but higher doses increase itching and may raise delayed respiratory-depression risk. Evidence for replacing an epidural after open bowel surgery is less certain. Use a patient-specific dose, postoperative monitoring and a plan for pain after the spinal wears off; do not treat a high dose as automatically better.",
  ],
  [
    "When are rectus sheath catheters useful after laparotomy?",
    "Bilateral rectus sheath catheters cover a midline incision without the sympathetic block of an epidural, but they do not treat visceral or perineal pain. A randomized trial found better movement pain at 24 hours with epidural but more hypotension and opioid use by day 3; a 2026 review found less hypotension with catheters, while pain-effect estimates were too imprecise to prove equivalence. Combine them with multimodal analgesia and monitor cumulative local anaesthetic exposure.",
  ],
  [
    "What fluid strategy is recommended for major bowel surgery?",
    "Aim for euvolaemia, avoiding both overload and under-filling. The RELIEF trial (2018, 3,000 patients) compared a restrictive regimen (median about 3.7 L in the first 24 h) with a moderately liberal one (about 6.1 L): there was no difference in disability-free survival, but the restrictive group had more acute kidney injury and more surgical-site infection. Use goal-directed therapy in high-risk patients and stop IV fluids as soon as oral intake is established.",
  ],
  [
    "What are the anaesthetic priorities for oesophagectomy?",
    "Thorough cardiorespiratory assessment (often CPET), aspiration prevention at induction, one-lung ventilation for the thoracic phase with lung-protective ventilation, thoracic epidural or paravertebral analgesia, judicious fluids and vasopressor use to protect the gastric conduit, and planned critical care admission. Pneumonia and anastomotic leak are the leading causes of morbidity.",
  ],
  [
    "Why is abdominoperineal resection an anaesthetic challenge?",
    "It combines a long abdominal phase in steep Trendelenburg/lithotomy with a perineal phase often performed prone (jack-knife), with risks of pressure injury, compartment syndrome, nerve injury, venous air embolism, large blood loss from the presacral plexus and a large perineal wound needing good analgesia.",
  ],
  [
    "Should a nasogastric tube be left in after bowel resection?",
    "No. Routine postoperative NG decompression does not reduce anastomotic leak, wound dehiscence or pneumonia, and it delays the return of bowel function. ERAS guidelines recommend removing any intraoperative NG tube before the patient wakes, and starting oral intake within 24 hours — early feeding shortens hospital stay without increasing anastomotic leak, at the cost of more vomiting and a somewhat higher NG reinsertion rate.",
  ],
  [
    "When should TPN be started after major bowel surgery?",
    "Only when the gut cannot be used or cannot meet needs. For general surgical patients, ESPEN advises adding parenteral nutrition when oral/enteral intake is expected to remain below about 50% of requirements for more than 7 days, with earlier nutrition support when severe malnutrition is present. Separately, in critically ill ICU patients, EPaNIC found more infections and slower recovery with PN started within 48 hours than with PN deferred until day 8, without a survival benefit. ICU guidance differs by society: ASPEN/SCCM advises withholding exclusive PN for the first 7 days in patients at low nutritional risk, whereas ESPEN suggests PN within 3–7 days when enteral nutrition is contraindicated. Screen for re-feeding risk and monitor phosphate, potassium and magnesium.",
  ],
];

const workedExamples: WorkedExample[] = [
  {
    title: "Planning anaesthesia for an elective laparoscopic anterior resection",
    scenario: "A 68-year-old man with type 2 diabetes and treated hypertension (METs >4) is listed for laparoscopic anterior resection for a rectal cancer within an enhanced recovery programme. Outline your perioperative plan.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Preoperative: correct anaemia (IV iron if iron-deficient), optimise HbA1c, prehabilitation; fast only 6 h for solids and 2 h for clear fluids; carbohydrate loading is reasonable with glucose monitoring in diabetes (evidence limited); no mechanical bowel preparation alone — oral antibiotics with or without preparation per surgical protocol</li>
          <li>Risk stratify: NSQIP or P-POSSUM; CPET if functional capacity uncertain</li>
          <li>Induction: standard IV induction, antibiotic prophylaxis within 60 minutes of incision, dexamethasone and a second antiemetic (≥2 PONV risk factors)</li>
          <li>Analgesia: consider intrathecal morphine or TAP/rectus sheath blocks alongside paracetamol; discuss NSAID choice with the surgeon, particularly for a rectal anastomosis; reserve systemic opioid for rescue. Epidural not routinely needed for laparoscopy</li>
          <li>Ventilation: lung-protective (6–8 ml/kg PBW, PEEP), steep Trendelenburg — watch airway pressures, ETT migration, facial/airway oedema</li>
          <li>Fluids: near-zero balance; goal-directed therapy (oesophageal Doppler or pulse contour) in high-risk cases; vasopressor for anaesthesia-related vasodilation</li>
          <li>Maintain normothermia, deep neuromuscular block if it helps surgical view with full reversal confirmed by quantitative monitoring</li>
          <li>Post-op: early oral intake and mobilisation, remove the urinary catheter according to operative level and retention risk, and consider extending pharmacological VTE prophylaxis to 28 days after major abdominal cancer surgery</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Assuming "restrictive" means as little fluid as possible — RELIEF showed more AKI</li>
            <li>Routine epidural for a laparoscopic resection</li>
            <li>Forgetting extended (28-day) VTE prophylaxis after abdominal cancer surgery</li>
          </ul>
        </div>
      </div>
    ),
    answer: "ERAS-based pathway: prehabilitation and anaemia correction, carbohydrate loading, multimodal opioid-sparing analgesia (spinal opioid or truncal blocks), PONV prophylaxis, lung-protective ventilation, euvolaemia with GDT when high risk, normothermia, early feeding and mobilisation, extended VTE prophylaxis.",
    cites: ["ERAS Colorectal 2018", "RELIEF 2018", "NICE NG89"],
  },
  {
    title: "Hypoxia during one-lung ventilation in oesophagectomy",
    scenario: "During the thoracic phase of an Ivor Lewis oesophagectomy (right thoracotomy, left lung ventilated) the SpO₂ falls to 86%.",
    working: (
      <div className="space-y-2">
        <ol className="list-decimal list-inside space-y-1">
          <li>Increase FiO₂ to 1.0; tell the surgeon</li>
          <li>Check tube/blocker position with fibreoptic bronchoscope; suction secretions</li>
          <li>Check haemodynamics — surgical compression of the heart or great vessels is common in this phase</li>
          <li>Recruit the ventilated lung and optimise PEEP</li>
          <li>CPAP or oxygen insufflation to the operative (right) lung if surgery allows</li>
          <li>If persisting: intermittent two-lung ventilation</li>
        </ol>
      </div>
    ),
    answer: "Treat as OLV hypoxaemia: FiO₂ 1.0, confirm lung isolation device position, exclude cardiac compression and low output, recruit and add PEEP to the dependent lung, CPAP to the non-dependent lung, resume two-lung ventilation if needed.",
    cites: ["Carney Oesophagectomy 2015", "ERAS Oesophagectomy 2019"],
  },
];

const Th = ({ c }: { c: string[] }) => (
  <thead><tr className="border-b border-border bg-muted/40">{c.map((x) => <th key={x} className="p-2.5 text-left font-semibold text-foreground">{x}</th>)}</tr></thead>
);

const procedures = [
  {
    name: "Laparoscopic cholecystectomy",
    rows: [
      ["Patients", "Often young/fit day cases; also elderly with acute cholecystitis, biliary pancreatitis or obesity"],
      ["Position", "Reverse Trendelenburg, left tilt — reduces venous return; improves FRC"],
      ["Airway", "ETT standard (pneumoperitoneum, aspiration risk); second-generation SAD used by some in selected fit, non-obese patients"],
      ["Analgesia", "Paracetamol, NSAID, dexamethasone, intraperitoneal and port-site local anaesthetic; opioid as rescue (PROSPECT)"],
      ["Specific issues", "Shoulder-tip pain; PONV; vagal bradycardia on insufflation; rare CO₂ embolism, capnothorax; bile duct injury; conversion to open"],
      ["Disposition", "Day case for most; ERCP/acute cases may need inpatient care"],
    ],
    refs: ["PROSPECT Lap Chole 2018", "BJA Educ Laparoscopy 2011"],
  },
  {
    name: "Major bowel resection (right/left hemicolectomy, anterior resection)",
    rows: [
      ["Patients", "Often elderly, anaemic, malnourished; cancer; emergencies with sepsis/obstruction (NELA pathway)"],
      ["Approach", "Laparoscopic/robotic preferred where possible; open for emergencies or complex disease"],
      ["Airway", "RSI if obstruction/ileus. Consider careful awake NG decompression with suction when clinically useful, but do not assume this empties the stomach or removes aspiration risk"],
      ["Analgesia", "Open: consider thoracic epidural or alternative regional/abdominal wall technique by incision and risk. Laparoscopic: multimodal analgesia with TAP block or selected intrathecal opioid; epidural not routine"],
      ["Fluids", "Euvolaemia; GDT in high-risk; avoid salt/water overload (ileus, anastomotic oedema)"],
      ["Specific issues", "Steep Trendelenburg (anterior resection); ureteric injury; anastomotic leak (days 3–7); ileus; SSI"],
    ],
    refs: ["ERAS Colorectal 2018", "RELIEF 2018", "Levy 2011"],
  },
  {
    name: "Abdominoperineal (AP) resection",
    rows: [
      ["Indication", "Low rectal/anal cancer; often after neoadjuvant chemoradiotherapy (fatigue, anaemia, neutropenia, cardiotoxicity)"],
      ["Position", "Lloyd-Davies/lithotomy with steep Trendelenburg for abdominal phase; perineal phase lithotomy or prone jack-knife (ELAPE)"],
      ["Repositioning", "Re-check ETT, lines and pressure points; free abdomen when prone; eyes protected; staff and equipment for safe turn"],
      ["Blood loss", "Presacral venous plexus bleeding can be massive — large-bore access and blood availability; cell salvage may be used in cancer surgery under local policy, with a leucocyte-depletion filter where indicated; consider TXA according to bleeding risk and local major-haemorrhage guidance"],
      ["Analgesia", "Epidural or spinal opioid plus perineal wound infiltration; flap reconstruction extends surgery and pain"],
      ["Specific issues", "Lower-limb compartment syndrome (long lithotomy >4 h), common peroneal nerve injury, VAE in head-down/prone, hypothermia, perineal wound complications"],
    ],
    refs: ["ERAS Colorectal 2018", "BJA Educ Positioning 2004"],
  },
  {
    name: "Laparoscopic fundoplication (Nissen) / hiatus hernia repair",
    rows: [
      ["Patients", "Severe GORD — aspiration risk; may have chronic cough, asthma, oesophagitis; paraoesophageal hernia may cause cardiac/respiratory compression"],
      ["Airway", "RSI or modified RSI with head-up position; antacid prophylaxis"],
      ["Bougie", "Surgeon may request a large oesophageal bougie to calibrate the wrap — anaesthetist passes it carefully: risk of oesophageal perforation; remove NG and temperature probe first"],
      ["Intraoperative", "Capnothorax/pneumothorax and pneumomediastinum from hiatal dissection (↑ airway pressure, ↓ SpO₂, surgical emphysema); vagal bradycardia; cardiac compression"],
      ["Post-op", "Prevent retching/vomiting, which may stress the repair, with multimodal PONV prophylaxis; expect possible transient dysphagia, gas-bloat and impaired ability to belch or vomit"],
    ],
    refs: ["BJA Educ Laparoscopy 2011", "PONV Consensus 2020"],
  },
  {
    name: "Oesophagectomy (Ivor Lewis, McKeown three-stage, transhiatal, minimally invasive)",
    rows: [
      ["Patients", "Cancer, often after neoadjuvant chemo(radio)therapy; smokers/alcohol, COPD, malnutrition, sarcopenia; high aspiration risk (obstruction, achalasia-like retention)"],
      ["Assessment", "CPET (anaerobic threshold / VO₂peak predicts complications), spirometry/DLCO, echo if indicated, nutrition, prehabilitation"],
      ["Airway & lungs", "RSI in head-up position; double-lumen tube (left DLT) or bronchial blocker for right thoracotomy phase; lung-protective OLV"],
      ["Lines & monitoring", "Arterial line and temperature monitoring; consider cardiac-output monitoring and a CVC according to risk and access needs. If a neck CVC is required for a McKeown approach, preserve the planned cervical operative field (often left-sided)"],
      ["Analgesia", "Thoracic epidural (T5–T8) or paravertebral catheters; ESP blocks as alternatives in minimally invasive surgery"],
      ["Conduit protection", "Maintain MAP and cardiac output; avoid both fluid overload and hypovolaemia; vasopressors acceptable when euvolaemic"],
      ["Specific issues", "Arrhythmias (AF ~20%), cardiac compression during transhiatal dissection, recurrent laryngeal nerve injury, chylothorax, pneumonia, ARDS, anastomotic leak/conduit necrosis"],
      ["Post-op", "Planned critical care and early extubation/mobilisation where appropriate. Follow the local feeding pathway: jejunal feeding remains common, but selected patients can start oral liquids on postoperative day 0–1 without a demonstrated increase in leak. Escalate oxygen or ventilatory support when clinically required; discuss NIV/CPAP with the surgical team because evidence around a fresh anastomosis remains limited"],
    ],
    refs: ["ERAS Oesophagectomy 2019", "Oesophagectomy Feeding 2026", "Carney Oesophagectomy 2015", "CPET 2018"],
  },
];

const GeneralColorectalSurgeryTopic = () => (
  <TopicTemplate
    title="Anaesthesia for General & Colorectal Surgery"
    subtitle="FRCA Final — Clinical"
    backPath="/clinical"
    backLabel="Clinical"
    accentColor="text-clinical"
    topicId={T}
    topicTitle="Anaesthesia for General & Colorectal Surgery"
    workedExamples={workedExamples}
    quizQuestions={generalColorectalSurgeryQuestions}
    objectives={[
      "Apply enhanced recovery (ERAS) principles to elective general and colorectal surgery",
      "Describe the physiology of pneumoperitoneum and positioning in laparoscopic surgery",
      "Plan anaesthesia for cholecystectomy, bowel resection, AP resection, fundoplication and oesophagectomy",
      "Choose analgesic techniques appropriate to open versus laparoscopic surgery",
      "Manage perioperative fluid therapy, one-lung ventilation and postoperative complications",
    ]}
    keyPoints={[
      { text: "ERAS pathways reduce complications and length of stay — the anaesthetist owns many elements (carbohydrate loading, PONV, analgesia, fluids, normothermia)", cites: ["ERAS Colorectal 2018"] },
      { text: "Avoid routine epidural after minimally invasive colorectal surgery; for open surgery, PROSPECT favours it for movement pain while ERAS 2025 prefers other suitable regional techniques when feasible", cites: ["PROSPECT Open Colorectal 2024", "ERAS Colorectal 2025"] },
      { text: "Intrathecal morphine can reduce pain and opioid use but is not a proven replacement for epidural in open surgery; rectus sheath catheters spare hypotension but need visceral-pain cover", cites: ["ERAS Colorectal 2025", "TERSC 2022", "RSC Review 2026"] },
      { text: "Aim for euvolaemia — overly restrictive fluids increased AKI in the RELIEF trial", cites: ["RELIEF 2018"] },
      { text: "Pneumoperitoneum (12–15 mmHg) ↓ FRC and compliance, ↑ SVR and PaCO₂; head-down worsens ventilation, head-up reduces venous return", cites: ["BJA Educ Laparoscopy 2011"] },
      { text: "Oesophagectomy: CPET assessment, one-lung ventilation, thoracic epidural/paravertebral analgesia, conduit perfusion and planned critical care", cites: ["ERAS Oesophagectomy 2019", "Carney Oesophagectomy 2015"] },
       { text: "Consider extending pharmacological VTE prophylaxis to 28 days after major abdominal cancer surgery, balancing VTE and bleeding risks", cites: ["NICE NG89"] },
       { text: "After colorectal surgery, avoid routine NG decompression and start oral/enteral feeding within 24 h. Surgical-ward and ICU indications for PN differ and should not be conflated", cites: ["ERAS Colorectal 2025", "ESPEN Surgery 2021", "ESPEN ICU 2023", "EPaNIC 2011"] },
    ]}
    sectionExamMapping={{ objectives: { exams: [Exam.FINAL] }, keyPoints: { exams: [Exam.FINAL] } }}
    sectionSources={{
      objectives: ["ERAS Colorectal 2018", "ERAS Oesophagectomy 2019", "BJA Educ Laparoscopy 2011"],
      keyPoints: ["ERAS Colorectal 2018", "ERAS Colorectal 2025", "PROSPECT Open Colorectal 2024", "TERSC 2022", "RSC Review 2026", "RELIEF 2018", "Levy 2011", "BJA Educ Laparoscopy 2011", "ERAS Oesophagectomy 2019", "NICE NG89"],
    }}
    coreConcepts={
      <>
        <ExamSection exams={[Exam.FINAL]} className="scroll-mt-24">
          <section className="space-y-8 mb-10">
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Preoperative Assessment & Optimisation</h2>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                <li><strong>Risk stratification</strong>: validated tools (P-POSSUM, NSQIP; NELA score for emergency laparotomy). CPET for major resections — a low anaerobic threshold (commonly &lt;~11 ml/kg/min) or low VO₂peak identifies higher risk<R l="CPET 2018" /></li>
                <li><strong>Anaemia</strong>: common in colorectal cancer (iron deficiency from occult bleeding). Treat iron deficiency preoperatively, IV iron if surgery is within weeks<R l="NICE NG180" /></li>
                <li><strong>Nutrition</strong>: screen (e.g. MUST); oral supplements or enteral feeding if malnourished; immunonutrition may be considered<R l="ERAS Colorectal 2018" /></li>
                <li><strong>Prehabilitation</strong>: exercise, nutrition, psychological support, smoking and alcohol cessation</li>
                <li><strong>Fasting</strong>: 6 h solids, 2 h clear fluids; preoperative carbohydrate drink for non-diabetic patients (ERAS 2018 allows it in diabetes alongside usual medication, but evidence there is limited — monitor glucose)<R l="ERAS Colorectal 2018" /></li>
                <li><strong>Bowel preparation</strong>: mechanical preparation causes dehydration and electrolyte loss — ask about it and give fluids; ERAS 2018 suggests oral antibiotic plus mechanical preparation may be used before colonic resection but mechanical preparation alone is not recommended<R l="ERAS Colorectal 2018" /></li>
                <li><strong>Neoadjuvant therapy</strong>: chemoradiotherapy may cause cardiotoxicity (5-FU coronary spasm, anthracyclines), neuropathy, marrow suppression, fibrosis and fatigue</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Enhanced Recovery After Surgery (ERAS)</h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm text-muted-foreground">
                  <Th c={["Phase", "Key anaesthetic elements"]} />
                  <tbody>
                    {[
                      ["Before", "Education, prehabilitation, anaemia correction, carbohydrate loading, no long-acting sedative premedication"],
                      ["During", "Short-acting agents, antibiotic within 60 min of incision, PONV prophylaxis, opioid-sparing multimodal analgesia, lung-protective ventilation, euvolaemia/GDT, normothermia, minimally invasive surgery, no routine drains or NG tubes"],
                      ["After", "Early oral intake (within 24 h), early mobilisation, early urinary catheter removal, glycaemic control, VTE prophylaxis, audit of compliance"],
                    ].map(([a, b]) => <tr key={a} className="border-b border-border last:border-0"><td className="p-2.5 font-medium text-foreground">{a}</td><td className="p-2.5">{b}</td></tr>)}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Higher protocol compliance is associated with fewer complications and shorter length of stay<R l="ERAS Colorectal 2018" />.</p>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postoperative Nutrition: NG Tubes, Early Feeding & TPN</h2>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                <li><strong>No routine nasogastric decompression</strong>: routine postoperative NG tubes do not prevent anastomotic leak, wound dehiscence or pneumonia, and delay return of bowel function; they are associated with more pulmonary complications and longer stay. ERAS 2018 and the ASCRS/SAGES 2022 guideline recommend against routine NG decompression after colorectal resection — an NG tube placed intraoperatively should be removed before reversal of anaesthesia<R l="ERAS Colorectal 2018" /><R l="ASCRS SAGES ERAS 2022" /></li>
                <li><strong>Early oral/enteral feeding</strong>: feeding within 24 h of elective colorectal resection is safe and does not increase anastomotic leak; meta-analyses show shorter hospital stay and fewer total complications. The trade-off is more vomiting and a somewhat higher rate of NG reinsertion, so advance diet as tolerated rather than forcing intake<R l="Zhuang Early Feeding 2013" /><R l="Wang Early Feeding 2022" /></li>
                <li><strong>If the gut works, use it</strong>: enteral nutrition maintains mucosal integrity and is preferred whenever the GI tract is accessible and functioning; TPN is reserved for a non-functioning or inaccessible gut (prolonged ileus, obstruction, high-output fistula, anastomotic leak where downstream feeding is impossible)<R l="ESPEN Surgery 2021" /></li>
                <li><strong>Timing of PN in critical illness</strong>: the EPaNIC trial enrolled 4,640 critically ill adults at nutritional risk in a mixed medical-surgical ICU population (approximately 60% after cardiac surgery). Deferring PN until day 8, compared with starting within 48 h, led to fewer ICU infections and faster recovery without a mortality difference. This ICU evidence should not be extrapolated directly to routine ward patients after elective colorectal surgery<R l="EPaNIC 2011" /></li>
                <li><strong>Current guidance</strong>: for general surgical patients, ESPEN advises adding PN when oral/enteral intake is expected to remain below about 50% of requirements for more than 7 days, with nutrition support started promptly when severe nutritional risk makes delay unsafe<R l="ESPEN Surgery 2021" />. Separately in ICU patients, ESPEN suggests PN within 3–7 days when enteral nutrition is contraindicated<R l="ESPEN ICU 2023" />, while ASPEN/SCCM advises withholding exclusive PN for the first 7 days in patients at low nutritional risk<R l="ASPEN SCCM 2016" />. Screen for re-feeding risk; give thiamine and introduce energy cautiously when indicated, while monitoring phosphate, potassium, magnesium and fluid balance</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Physiology of Laparoscopy & Positioning</h2>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                <li><strong>CO₂ pneumoperitoneum</strong> (typically 12–15 mmHg): cephalad diaphragm displacement → ↓ FRC, ↓ compliance, atelectasis, ↑ airway pressure; CO₂ absorption → ↑ PaCO₂ (increase minute ventilation ~20–30%)<R l="BJA Educ Laparoscopy 2011" /></li>
                <li><strong>Cardiovascular</strong>: ↑ SVR and MAP (mechanical + neurohumoral: vasopressin, catecholamines), preload ↓ with head-up; bradycardia/asystole from peritoneal stretch (vagal) at insufflation — deflate and give an anticholinergic</li>
                <li><strong>Renal/splanchnic</strong>: ↓ renal blood flow and urine output during insufflation</li>
                <li><strong>Trendelenburg</strong>: worsens atelectasis, ETT may migrate into the right main bronchus, ↑ ICP/IOP, facial and airway oedema (cuff-leak test before extubation after prolonged steep head-down)</li>
                <li><strong>Complications</strong>: CO₂ embolism (sudden ↓ EtCO₂, hypotension, mill-wheel murmur — stop insufflation, left lateral head-down, FiO₂ 1.0, aspirate CVC), capnothorax, surgical emphysema, vascular/visceral injury at port insertion</li>
                <li><strong>Lithotomy</strong>: lower-limb compartment syndrome and common peroneal/saphenous/obturator nerve injury; reposition legs every 2 h in long cases<R l="BJA Educ Positioning 2004" /></li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthetic Considerations for Key Procedures</h2>
              <div className="space-y-6">
                {procedures.map((p) => (
                  <div key={p.name}>
                    <h3 className="font-semibold text-foreground mb-2">{p.name}{p.refs.map((r) => <R key={r} l={r} />)}</h3>
                    <div className="overflow-x-auto rounded-lg border border-border">
                      <table className="w-full text-sm text-muted-foreground">
                        <tbody>
                          {p.rows.map(([a, b]) => (
                            <tr key={a} className="border-b border-border last:border-0">
                              <td className="p-2.5 font-medium text-foreground w-40 align-top">{a}</td>
                              <td className="p-2.5">{b}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Analgesia & Regional/Neuraxial Techniques: Current Evidence</h2>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">Match the block to the incision, approach and expected visceral pain, then add scheduled non-opioid analgesia and rescue opioid as required. The 2025 ERAS colorectal update emphasises multimodal analgesia and TAP blocks for both open and minimally invasive surgery; it advises against epidural for minimally invasive surgery and prefers a suitable alternative where available for open surgery. In contrast, the 2024 procedure-specific PROSPECT guideline recommends low continuous thoracic epidural as first-line for open colorectal surgery, chiefly for movement pain. These recommendations reflect different weighting of analgesia, hypotension and recovery outcomes rather than a single universally superior technique<R l="ERAS Colorectal 2025" /><R l="PROSPECT Open Colorectal 2024" />.</p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm text-muted-foreground">
                  <Th c={["Technique", "Best suited to", "Notes"]} />
                  <tbody>
                    {[
                      ["Thoracic epidural", "Open colorectal or major upper GI with extensive incision", "Continuous segmental somatic and visceral analgesia; better early movement pain than rectus sheath catheters in one trial. Requires functioning catheter and pain team; hypotension and urinary retention may hinder recovery"],
                      ["Single-shot spinal opioid", "Selected laparoscopic resections; open surgery if epidural unsuitable", "Intrathecal morphine reduces early pain and rescue opioid use; time-limited, no catheter for titration. Pruritus, nausea, urinary retention and dose-related respiratory risk require protocol-based monitoring"],
                      ["Bilateral rectus sheath catheters", "Open midline laparotomy or midline port/extraction incision", "Local anaesthetic along rectus sheath covers incisional somatic pain but not visceral, lateral or perineal pain; less sympathetic hypotension than epidural; add systemic rescue analgesia"],
                      ["TAP block / catheter", "Lateral lower-abdominal incision or laparoscopic ports", "Abdominal-wall analgesia without visceral coverage; 2025 ERAS supports TAP blocks, 2024 PROSPECT supports bilateral TAP when epidural cannot be used for open surgery"],
                      ["Paravertebral / erector spinae", "Thoracotomy phase of oesophagectomy", "Paravertebral comparable to epidural for thoracotomy with less hypotension"],
                      ["Wound / intraperitoneal local anaesthetic", "Cholecystectomy, open wounds", "Simple, low risk"],
                      ["Systemic multimodal", "All", "Paracetamol; individualise NSAIDs with renal, bleeding and anastomotic risks in mind. The leak signal is strongest for diclofenac; COX-2-selective agents appear more reassuring but are not risk-free. Use opioid for rescue when needed"],
                    ].map(([a, b, c]) => <tr key={a} className="border-b border-border last:border-0"><td className="p-2.5 font-medium text-foreground">{a}</td><td className="p-2.5">{b}</td><td className="p-2.5">{c}</td></tr>)}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p><strong className="text-foreground">Thoracic epidural in open surgery.</strong> Epidural improves dynamic pain compared with systemic opioid alone and can reduce opioid requirements, but has not reliably shortened recovery. Plan for hypotension, vasopressor needs, urinary retention, catheter failure, anticoagulant timing and daily block assessment; do not give fluid reflexively for a functioning epidural in an otherwise euvolaemic patient. It is not routine for laparoscopy<R l="ASCRS SAGES ERAS 2022" /><R l="PROSPECT Open Colorectal 2024" /><R l="ERAS Colorectal 2025" />.</p>
                <p><strong className="text-foreground">Intrathecal morphine and “high-dose” spinal.</strong> A small randomised laparoscopic colonic-resection trial found less pain and opioid use, and earlier fitness for discharge (median 3 vs 4 days), with intrathecal morphine plus local anaesthetic compared with systemic opioid; this is not proof of the same benefit in open resections<R l="Koning Intrathecal 2018" /><R l="PROSPECT Laparoscopic Colorectal 2024" />. In a 2025 single-centre retrospective, uncontrolled open-colorectal cohort (n=108; median intrathecal dose 200 micrograms), 4% needed rescue epidural; it was not comparative-effectiveness evidence<R l="Open Colorectal Spinal 2025" />. Higher intrathecal morphine doses are not automatically more effective or safer: a 2025 non-obstetric meta-analysis found a dose-related respiratory-depression signal across all doses (very-low-certainty evidence), which was attenuated and no longer statistically significant after doses above 500 micrograms were excluded. That cutoff is not a proven safe threshold. Tailor dosing to patient frailty, sleep apnoea and concurrent sedatives/opioids; follow a neuraxial-opioid respiratory-monitoring protocol and arrange rescue when single-shot analgesia fades<R l="Intrathecal Safety 2025" />.</p>
                <p><strong className="text-foreground">Rectus sheath catheters versus epidural.</strong> In the UK TERSC randomised trial (131 elective midline laparotomy patients), epidural gave better movement pain at 24 hours (median score 33 vs 50.5); by day 3, rectus sheath catheters had lower resting pain, less opioid use and less hypotension/vasopressor dependence. A 2026 review (31 mixed open-surgery studies, 2,162 patients) found less hypotension with catheters (risk ratio 0.40, 95% CI 0.26–0.60), but wide pain-effect intervals mean comparable analgesia is <em>not</em> proven. Catheters can be useful when hypotension makes epidural unattractive; supplement for visceral/perineal pain and check bilateral cumulative local-anaesthetic dose and toxicity risk, especially with prolonged infusion<R l="TERSC 2022" /><R l="RSC Review 2026" /><R l="ERAS Colorectal 2025" />.</p>
                <p><strong className="text-foreground">Practical choice.</strong> For a laparoscopic colectomy, favour TAP or an appropriately monitored spinal opioid with multimodal analgesia; for an open midline resection, weigh epidural against TAP or rectus sheath catheters in light of haemodynamics, incision and local expertise. Rectus sheath coverage alone is unlikely to suffice for a large perineal wound after AP resection. For oesophagectomy with a thoracic incision, plan separate thoracic analgesia (epidural or paravertebral) rather than assuming an abdominal wall catheter covers thoracotomy pain<R l="ERAS Colorectal 2025" /><R l="PROSPECT Open Colorectal 2024" /><R l="ERAS Oesophagectomy 2019" />.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fluids, Haemodynamics & Other Intraoperative Care</h2>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                <li><strong>Euvolaemia</strong>: both overload (ileus, anastomotic oedema, pulmonary complications) and hypovolaemia (AKI, anastomotic hypoperfusion) harm. RELIEF (n=3000): restrictive regimen gave no survival benefit and more AKI<R l="RELIEF 2018" /></li>
                <li><strong>Goal-directed therapy</strong>: stroke-volume-guided boluses in high-risk patients; OPTIMISE showed a non-significant reduction in complications<R l="OPTIMISE 2014" /></li>
                <li><strong>Vasopressors</strong>: treat anaesthesia/epidural-induced vasodilation with vasopressor rather than fluid when euvolaemic</li>
                <li><strong>PONV</strong>: high risk (abdominal/laparoscopic surgery, opioids) — two or more antiemetic classes by risk<R l="PONV Consensus 2020" /></li>
                <li><strong>Normothermia</strong>: active warming; hypothermia increases SSI, bleeding and cardiac events<R l="NICE NG180" /></li>
                <li><strong>Glycaemic control</strong>, antibiotic prophylaxis (redose in long cases/major blood loss), high inspired oxygen debate, lung-protective ventilation</li>
                <li><strong>Neuromuscular block</strong>: deep block may improve surgical conditions at lower pressures; always confirm TOF ratio ≥0.9 before extubation</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postoperative Complications</h2>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
                <li><strong>Anastomotic leak</strong>: often presents during the first postoperative week but may occur later; suspect it with unexplained tachycardia, AF, fever, rising inflammatory markers, ileus or peritonism, and arrange prompt imaging and source control</li>
                <li><strong>Postoperative ileus</strong>: reduced by opioid sparing, fluid balance, minimally invasive surgery, early feeding, chewing gum<R l="ERAS Colorectal 2018" /></li>
                <li><strong>Pulmonary</strong>: pneumonia and aspiration (especially after oesophagectomy — recurrent laryngeal nerve palsy and loss of lower oesophageal sphincter); keep head-up ≥30°<R l="ERAS Oesophagectomy 2019" /></li>
                <li><strong>High-output stoma</strong>: dehydration, hypomagnesaemia, AKI</li>
                <li><strong>VTE</strong>: assess VTE against bleeding risk and use mechanical/pharmacological prophylaxis accordingly; NICE advises considering extension of pharmacological prophylaxis to 28 days after major abdominal cancer surgery<R l="NICE NG89" /></li>
              </ul>
            </div>

            <ExamPitfallsCallout
              accent="clinical"
              pitfalls={[
                "Offering an epidural as routine for laparoscopic colorectal surgery — ERAS recommends alternatives.",
                "Equating 'restrictive' with 'minimal' fluids — aim for euvolaemia (RELIEF).",
                "Forgetting the calibration bougie in fundoplication — remove the NG and temperature probe and pass it gently.",
                "Missing the positioning hazards of AP resection: lithotomy compartment syndrome, prone turn, presacral bleeding.",
                "Omitting CPET, one-lung ventilation and conduit perfusion in an oesophagectomy answer.",
              ]}
            />
          </section>
        </ExamSection>
        <TopicFaqs faqs={faqs} />
      </>
    }
  />
);

export default GeneralColorectalSurgeryTopic;
