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
    "Not routinely. The ERAS Society 2018 guideline recommends thoracic epidural analgesia for open colorectal surgery, but for laparoscopic surgery it advises alternatives such as spinal (intrathecal) opioid, local anaesthetic wound infusion or abdominal wall blocks, because epidurals slow mobilisation and increase hypotension and fluid administration without improving recovery after laparoscopy.",
  ],
  [
    "What fluid strategy is recommended for major bowel surgery?",
    "Aim for euvolaemia (zero balance). The RELIEF trial (2018) found that a very restrictive regimen increased acute kidney injury and surgical-site infection compared with a moderately liberal one (about 1–2 L positive at 24 h), with no difference in disability-free survival. Use goal-directed therapy in high-risk patients and stop IV fluids as soon as oral intake is established.",
  ],
  [
    "What are the anaesthetic priorities for oesophagectomy?",
    "Thorough cardiorespiratory assessment (often CPET), aspiration prevention at induction, one-lung ventilation for the thoracic phase with lung-protective ventilation, thoracic epidural or paravertebral analgesia, judicious fluids and vasopressor use to protect the gastric conduit, and planned critical care admission. Pneumonia and anastomotic leak are the leading causes of morbidity.",
  ],
  [
    "Why is abdominoperineal resection an anaesthetic challenge?",
    "It combines a long abdominal phase in steep Trendelenburg/lithotomy with a perineal phase often performed prone (jack-knife), with risks of pressure injury, compartment syndrome, nerve injury, venous air embolism, large blood loss from the presacral plexus and a large perineal wound needing good analgesia.",
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
          <li>Preoperative: optimise anaemia (IV iron if iron-deficient), HbA1c, carbohydrate loading (not in insulin-treated diabetes without monitoring), no routine mechanical bowel preparation fasting beyond 6 h solids / 2 h clear fluids</li>
          <li>Risk stratify: NSQIP or P-POSSUM; CPET if functional capacity uncertain</li>
          <li>Induction: standard IV induction, antibiotic prophylaxis within 60 minutes of incision, dexamethasone and a second antiemetic (≥2 PONV risk factors)</li>
          <li>Analgesia: spinal diamorphine/morphine or TAP/rectus sheath blocks, plus paracetamol, NSAID if renal function allows, avoid long-acting systemic opioid; epidural not routinely needed for laparoscopy</li>
          <li>Ventilation: lung-protective (6–8 ml/kg PBW, PEEP), steep Trendelenburg — watch airway pressures, ETT migration, facial/airway oedema</li>
          <li>Fluids: near-zero balance; goal-directed therapy (oesophageal Doppler or pulse contour) in high-risk cases; vasopressor for anaesthesia-related vasodilation</li>
          <li>Maintain normothermia, deep neuromuscular block if it helps surgical view with full reversal confirmed by quantitative monitoring</li>
          <li>Post-op: early oral intake and mobilisation, remove catheter early, VTE prophylaxis for 28 days after cancer surgery</li>
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
      ["Airway", "RSI if obstruction/ileus; NG tube decompression before induction"],
      ["Analgesia", "Open: thoracic epidural (T8–T11). Laparoscopic: spinal opioid, TAP/rectus sheath catheters or wound catheters"],
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
      ["Blood loss", "Presacral venous plexus bleeding can be massive — large-bore access, cross-match, cell salvage (caution in cancer, leucodepletion filter), TXA"],
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
      ["Post-op", "Avoid retching/vomiting (can disrupt the wrap) — aggressive multimodal PONV prophylaxis; dysphagia; gas-bloat; cannot vomit"],
    ],
    refs: ["BJA Educ Laparoscopy 2011", "PONV Consensus 2020"],
  },
  {
    name: "Oesophagectomy (Ivor Lewis, McKeown three-stage, transhiatal, minimally invasive)",
    rows: [
      ["Patients", "Cancer, often after neoadjuvant chemo(radio)therapy; smokers/alcohol, COPD, malnutrition, sarcopenia; high aspiration risk (obstruction, achalasia-like retention)"],
      ["Assessment", "CPET (anaerobic threshold / VO₂peak predicts complications), spirometry/DLCO, echo if indicated, nutrition, prehabilitation"],
      ["Airway & lungs", "RSI in head-up position; double-lumen tube (left DLT) or bronchial blocker for right thoracotomy phase; lung-protective OLV"],
      ["Lines & monitoring", "Arterial line, CVC (left IJ if right neck incision for McKeown), cardiac output monitoring, temperature"],
      ["Analgesia", "Thoracic epidural (T5–T8) or paravertebral catheters; ESP blocks as alternatives in minimally invasive surgery"],
      ["Conduit protection", "Maintain MAP and cardiac output; avoid both fluid overload and hypovolaemia; vasopressors acceptable when euvolaemic"],
      ["Specific issues", "Arrhythmias (AF ~20%), cardiac compression during transhiatal dissection, recurrent laryngeal nerve injury, chylothorax, pneumonia, ARDS, anastomotic leak/conduit necrosis"],
      ["Post-op", "Planned critical care; early extubation where possible; early mobilisation; nil by mouth initially with jejunal feeding; avoid NIV/CPAP until surgical agreement (anastomosis)"],
    ],
    refs: ["ERAS Oesophagectomy 2019", "Carney Oesophagectomy 2015", "CPET 2018"],
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
      { text: "Thoracic epidural is recommended for open colorectal surgery but not routinely for laparoscopic surgery", cites: ["ERAS Colorectal 2018", "Levy 2011"] },
      { text: "Aim for euvolaemia — overly restrictive fluids increased AKI in the RELIEF trial", cites: ["RELIEF 2018"] },
      { text: "Pneumoperitoneum (12–15 mmHg) ↓ FRC and compliance, ↑ SVR and PaCO₂; head-down worsens ventilation, head-up reduces venous return", cites: ["BJA Educ Laparoscopy 2011"] },
      { text: "Oesophagectomy: CPET assessment, one-lung ventilation, thoracic epidural/paravertebral analgesia, conduit perfusion and planned critical care", cites: ["ERAS Oesophagectomy 2019", "Carney Oesophagectomy 2015"] },
      { text: "Extended VTE prophylaxis (28 days) after major abdominal or pelvic cancer surgery", cites: ["NICE NG89"] },
    ]}
    sectionExamMapping={{ objectives: { exams: [Exam.FINAL] }, keyPoints: { exams: [Exam.FINAL] } }}
    sectionSources={{
      objectives: ["ERAS Colorectal 2018", "ERAS Oesophagectomy 2019", "BJA Educ Laparoscopy 2011"],
      keyPoints: ["ERAS Colorectal 2018", "RELIEF 2018", "Levy 2011", "BJA Educ Laparoscopy 2011", "ERAS Oesophagectomy 2019", "NICE NG89"],
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
                <li><strong>Fasting</strong>: 6 h solids, 2 h clear fluids; preoperative carbohydrate drink in non-diabetic patients<R l="ERAS Colorectal 2018" /></li>
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
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Analgesia: Choosing the Technique</h2>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm text-muted-foreground">
                  <Th c={["Technique", "Best suited to", "Notes"]} />
                  <tbody>
                    {[
                      ["Thoracic epidural", "Open colorectal, open upper GI, oesophagectomy", "Superior dynamic analgesia; hypotension, motor block, urinary retention, failure rate ~20–30%; affects fluid decisions"],
                      ["Spinal (intrathecal) opioid", "Laparoscopic colorectal", "Morphine or diamorphine; monitor for delayed respiratory depression and pruritus"],
                      ["TAP / rectus sheath blocks or catheters", "Laparoscopic and midline incisions", "Somatic analgesia only (no visceral); watch total local anaesthetic dose"],
                      ["Paravertebral / erector spinae", "Thoracotomy phase of oesophagectomy", "Paravertebral comparable to epidural for thoracotomy with less hypotension"],
                      ["Wound / intraperitoneal local anaesthetic", "Cholecystectomy, open wounds", "Simple, low risk"],
                      ["Systemic multimodal", "All", "Paracetamol, NSAID (caution AKI, anastomosis debate), dexamethasone, ketamine, IV lidocaine (evidence mixed)"],
                    ].map(([a, b, c]) => <tr key={a} className="border-b border-border last:border-0"><td className="p-2.5 font-medium text-foreground">{a}</td><td className="p-2.5">{b}</td><td className="p-2.5">{c}</td></tr>)}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Evidence: ERAS Society guideline and a randomised trial showing faster recovery with spinal analgesia than epidural after laparoscopic colorectal surgery<R l="ERAS Colorectal 2018" /><R l="Levy 2011" />.</p>
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
                <li><strong>Anastomotic leak</strong>: typically day 3–7; tachycardia, AF, fever, rising CRP, peritonitis; early CT and source control</li>
                <li><strong>Postoperative ileus</strong>: reduced by opioid sparing, fluid balance, minimally invasive surgery, early feeding, chewing gum<R l="ERAS Colorectal 2018" /></li>
                <li><strong>Pulmonary</strong>: pneumonia and aspiration (especially after oesophagectomy — recurrent laryngeal nerve palsy and loss of lower oesophageal sphincter); keep head-up ≥30°<R l="ERAS Oesophagectomy 2019" /></li>
                <li><strong>High-output stoma</strong>: dehydration, hypomagnesaemia, AKI</li>
                <li><strong>VTE</strong>: mechanical plus LMWH; extended 28 days after major abdominal/pelvic cancer surgery<R l="NICE NG89" /></li>
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
