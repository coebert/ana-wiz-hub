import { Helmet } from "react-helmet-async";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { cardiothoracicQuestions } from "@/data/quizzes";
import CPBCircuitDiagram from "@/components/diagrams/clinical/CPBCircuitDiagram";
import DLTInsertionDiagram from "@/components/diagrams/clinical/DLTInsertionDiagram";
import OLVTroubleshootingDiagram from "@/components/diagrams/clinical/OLVTroubleshootingDiagram";
import CardiacArrestPostCardiacSurgeryDiagram from "@/components/diagrams/clinical/CardiacArrestPostCardiacSurgeryDiagram";
import ArrestTimeWindowWidget from "@/components/diagrams/clinical/ArrestTimeWindowWidget";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocItems = [
  { id: "cpb-overview", label: "CPB circuit & anticoagulation", group: "Cardiac surgery" },
  { id: "cpb-physiology", label: "Physiological effects of CPB", group: "Cardiac surgery" },
  { id: "cardiac-considerations", label: "Key cardiac procedures", group: "Cardiac surgery" },
  { id: "opcab", label: "On-pump vs off-pump (OPCAB)", group: "Cardiac surgery" },
  { id: "dhca", label: "Deep hypothermic circulatory arrest", group: "Cardiac surgery" },
  { id: "cals", label: "Cardiac arrest after cardiac surgery", group: "Cardiac surgery" },
  { id: "olv", label: "One-lung ventilation", group: "Thoracic surgery" },
  { id: "analgesia", label: "Post-operative analgesia", group: "Post-operative" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

// SEO-targeted FAQ — answers the highest-volume UK cardiothoracic-anaesthesia
// question keywords (one-lung ventilation, DLT sizing, CPB, DHCA, pH-stat vs α-stat,
// cardiac arrest after surgery, post-thoracotomy analgesia).
// Rendered as accordion + FAQPage JSON-LD for rich-result eligibility.
const cardiothoracicFaqs: Array<[string, string]> = [
  [
    "What is one-lung ventilation (OLV) and when is it used?",
    "One-lung ventilation is the mechanical isolation and collapse of one lung to provide a still, bloodless surgical field for thoracic procedures. It is indicated for almost all thoracic surgery including lobectomy, pneumonectomy, oesophagectomy, thymectomy, lung volume reduction, and most VATS procedures. The aims are to deflate the operative lung for surgical access while maintaining adequate gas exchange through the dependent (ventilated) lung. OLV requires a lung-isolation device (DLT or bronchial blocker), correct position confirmed by fibreoptic bronchoscopy, and a stepwise plan for intraoperative hypoxia.",
  ],
  [
    "How do you manage hypoxia during one-lung ventilation?",
    "Hypoxia during OLV occurs because blood continues to perfuse the non-ventilated (collapsed) lung, creating a right-to-left intrapulmonary shunt. Manage stepwise: (1) increase FiO₂ to 1.0; (2) confirm DLT or blocker position with fibreoptic bronchoscopy — tube migration is the commonest cause; (3) suction secretions and blood from both lungs; (4) apply 5 cmH₂O CPAP to the non-dependent (operative) lung to recruit alveoli and improve oxygenation; (5) add 5 cmH₂O PEEP to the dependent lung; (6) perform a recruitment manoeuvre to the dependent lung; (7) if still hypoxic, intermittently reinflate the operative lung between surgical steps; (8) ultimate rescue: ask the surgeon to clamp the pulmonary artery of the operative lung (eliminates shunt) or revert to two-lung ventilation. Avoid volatiles >1 MAC and vasodilators as these inhibit hypoxic pulmonary vasoconstriction (HPV).",
  ],
  [
    "What is a double-lumen tube (DLT) and how is it sized?",
    "A double-lumen tube is an endobronchial tube with two lumens and two cuffs — a tracheal cuff and a bronchial cuff — allowing independent ventilation, suction, and CPAP to either lung. Left-sided DLTs are preferred because the left main bronchus is longer (4–5 cm) and less variable than the right, where the right upper lobe bronchus arises close to the carina. Sizes: 35–37 Fr for most women, 39–41 Fr for most men. Always confirm position with fibreoptic bronchoscopy after insertion and after any patient repositioning. Bronchial blockers are an alternative for difficult airways, existing tracheostomies, or when postoperative ventilation is anticipated.",
  ],
  [
    "What is cardiopulmonary bypass (CPB) and how does it work?",
    "Cardiopulmonary bypass temporarily takes over the function of the heart and lungs during cardiac surgery. Venous blood is drained via cannulae in the right atrium or vena cavae into a reservoir, pumped through an oxygenator and heat exchanger, filtered, and returned under pressure via an arterial cannula (usually the ascending aorta). Full anticoagulation with heparin 300–400 units/kg is required before cannulation, targeting an activated clotting time (ACT) >480 seconds. At the end of bypass, heparin is reversed with protamine sulphate in a 1 mg:100 units ratio. The circuit prime volume (~1.5 L) causes haemodilution, and contact between blood and foreign surfaces activates a systemic inflammatory response (SIRS).",
  ],
  [
    "What is deep hypothermic circulatory arrest (DHCA)?",
    "DHCA is a controlled period of complete circulatory arrest performed under profound hypothermia (classically 14–20 °C nasopharyngeal, though modern practice with selective cerebral perfusion uses 24–28 °C). Cooling slows cerebral metabolism by approximately 6–7% per °C, providing a finite 'safe' window of ischaemia during which the surgeon can operate on a bloodless aortic arch or great vessels. Neuroprotection includes packing the head in ice, methylprednisolone or dexamethasone, mannitol, and achieving EEG burst-suppression before arrest. Antegrade selective cerebral perfusion (ASCP) via the right axillary or innominate artery at 10 mL/kg/min extends the safe arrest window from ~30 minutes to 60–90 minutes and is now the modern gold standard.",
  ],
  [
    "What is the difference between pH-stat and α-stat management during CPB?",
    "pH-stat and α-stat are two strategies for managing acid–base balance during hypothermic CPB. pH-stat adds CO₂ to the oxygenator to maintain pH 7.40 and PaCO₂ 5.3 kPa corrected to the patient's actual temperature. This causes cerebral vasodilation, more uniform brain cooling, and luxury perfusion — useful during the cooling phase before DHCA and in paediatric cardiac surgery. α-stat maintains pH 7.40 and PaCO₂ 5.3 kPa measured at 37 °C (uncorrected for temperature), preserving cerebral autoregulation and CO₂ reactivity. It produces less embolic load to the brain and is preferred during rewarming after DHCA and for routine adult cardiac surgery without circulatory arrest. The practical rule: pH-stat during cooling, α-stat during rewarming.",
  ],
  [
    "How is cardiac arrest managed differently after cardiac surgery?",
    "Cardiac arrest in the first 24–72 hours after cardiac surgery is managed with modified Cardiac Advanced Life Support (CALS), not standard ALS, because the arrest is witnessed, monitored, and usually has a surgically reversible cause. Key modifications: (1) deliver up to three stacked DC shocks (200 J biphasic) BEFORE starting chest compressions for VF/pVT — first-shock success is high and compressions may disrupt grafts; (2) withhold or minimise bolus adrenaline initially because it can cause catastrophic rebound hypertension after recent anastomoses — use pacing for asystole/PEA; (3) prepare for emergency re-sternotomy within 5 minutes (10-minute window from arrest) if no return of spontaneous circulation — internal cardiac massage is more effective and excludes tamponade or graft occlusion; (4) use epicardial pacing wires if available; (5) escalate to VA-ECMO or IABP early if ROSC is not achieved.",
  ],
  [
    "What are the physiological effects of cardiopulmonary bypass?",
    "CPB causes multiple physiological derangements: (1) SIRS — blood contact with circuit surfaces activates complement, cytokines, and coagulation cascades; (2) haemodilution — the ~1.5 L prime volume reduces haematocrit to ~25%; (3) hypothermia — intentional cooling to 28–32 °C (moderate) or 18–20 °C (deep DHCA), which reduces metabolic rate ~7% per °C but causes platelet dysfunction; (4) non-pulsatile flow — roller pumps produce continuous rather than pulsatile flow, which may impair microcirculation and organ perfusion; (5) coagulopathy — platelet dysfunction, factor consumption, heparin rebound, and fibrinolysis; (6) AKI in 20–30% from low-flow non-pulsatile perfusion and micro-embolism; (7) neurocognitive dysfunction from gaseous and particulate emboli; and (8) pulmonary dysfunction from SIRS-mediated capillary leak and atelectasis.",
  ],
  [
    "What is the best analgesia after thoracotomy?",
    "Thoracotomy produces severe somatic and visceral pain and carries a high risk of chronic post-surgical pain (CPSP — up to 50% at 1 year). The gold-standard technique is a thoracic epidural or paravertebral catheter, with the PROSPECT 2015 guidelines supporting paravertebral block as equivalent analgesia with significantly fewer side effects (less hypotension, urinary retention, nausea, and pulmonary complications). Both are usually combined with multimodal analgesia: regular paracetamol, NSAIDs if no contraindication, and opioid PCA. Gabapentinoids, ketamine, and IV lidocaine can reduce CPSP. Fascial-plane blocks (erector spinae plane, serratus anterior) are useful alternatives where neuraxial techniques are contraindicated. For VATS, single-shot paravertebral or ESP blocks are usually sufficient and are cornerstone techniques in ERAS-Thoracic pathways.",
  ],
  [
    "What is the difference between on-pump and off-pump CABG?",
    "On-pump CABG uses cardiopulmonary bypass to arrest the heart with cardioplegia, providing a bloodless, motionless field for grafting. Off-pump CABG (OPCAB) performs grafting on the beating heart using stabiliser devices. On-pump advantages: complete revascularisation easier, controlled haemodynamics during bypass, and standardised technique. Disadvantages: SIRS, coagulopathy, renal dysfunction, and stroke risk from aortic manipulation. OPCAB advantages: reduced SIRS, less bleeding and transfusion, potentially lower stroke rate with 'no-touch' aortic techniques, and reduced renal injury in high-risk patients. Disadvantages: haemodynamic instability during heart displacement, ischaemia during temporary coronary occlusion, higher conversion rate (2–15%), and technically more challenging for posterior vessels. Key trials: ROOBY showed worse composite outcomes with OPCAB; CORONARY showed no difference at 5 years; GOPCABE showed no benefit in elderly patients. Current consensus: on-pump remains standard for most patients; OPCAB may benefit select high-risk cases.",
  ],
];

const objectives = [
  "Describe the CPB circuit, anticoagulation targets and physiological effects of bypass",
  "Compare on-pump and off-pump CABG (ROOBY, CORONARY, GOPCABE)",
  "Apply DHCA conduct: cooling strategy, cerebral perfusion adjuncts (ASCP/RCP), pH-stat vs α-stat",
  "Run modified CALS for cardiac arrest after cardiac surgery (10-min sternotomy window)",
  "Plan one-lung ventilation: DLT placement, hypoxia troubleshooting, HPV preservation",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Hypoxia 5 minutes into one-lung ventilation",
    scenario:
      "A patient on left-sided DLT for right thoracotomy desaturates to SpO₂ 86% five minutes after starting OLV. PIP has risen and the surgeon reports a partly inflated right lung. What is your stepwise response?",
    working:
      "1. Increase FiO₂ to 1.0; check breath sounds and capnography trace.\n2. Confirm DLT position with fibreoptic bronchoscopy — most common cause is tube migration (left bronchial cuff herniated or main carina lost).\n3. Suction both lumens to clear secretions/blood.\n4. Apply 5 cmH₂O CPAP to the non-ventilated (operative) lung; or 5 cmH₂O PEEP to the dependent lung.\n5. If still hypoxic: intermittent re-inflation of the operative lung between surgical steps; consider lobar blocker for selective lobar ventilation.\n6. Ultimate rescue: ask surgeon to clamp the operative pulmonary artery (eliminates shunt) or revert to two-lung ventilation.",
    answer:
      "FiO₂ 1.0 → confirm DLT position fibreoptically → suction → CPAP to operative lung + PEEP to dependent lung → intermittent re-inflation → PA clamp or revert to two-lung ventilation as rescue.",
    cites: ["BJA Educ 2018"],
  },
  {
    title: "Cardiac arrest 4 hours after CABG — apply CALS",
    scenario:
      "A post-CABG patient in CICU develops VF four hours after sternal closure. How does your management differ from standard ALS?",
    working:
      "Modified CALS (EACTS/STS):\n• Up to 3 stacked DC shocks (200 J biphasic) BEFORE chest compressions for VF/pVT — most arrests in this window are shockable and stacked shocks have higher first-shock success.\n• Withhold adrenaline initially (risk of severe rebound hypertension on ROSC) — pace if asystole/PEA with wires in situ.\n• Chest compressions only if shocks fail.\n• Prepare for emergency RE-STERNOTOMY within 5 minutes (10-minute window from arrest) if no ROSC — internal cardiac massage is more effective and excludes tamponade/graft occlusion.\n• Call cardiothoracic surgeon; activate ECPR if available.",
    answer:
      "Up to 3 stacked DC shocks first, withhold adrenaline, pace if shockable rhythm absent, and prepare for emergency re-sternotomy within 5 minutes if not in ROSC.",
    cites: ["BJA Educ 2015"],
  },
];

const CardiothoracicTopic = () => {
  return (
    <TopicTemplate
      title="Cardiothoracic Anaesthesia"
      subtitle="FRCA / FFICM — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="cardiothoracic"
      topicTitle="Cardiothoracic Anaesthesia"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={cardiothoracicQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2018",
          "Kaplan's Cardiac",
          "BJA Educ 2015",
        ],
        keyPoints: [
          "BJA Educ 2018",
          "Kaplan's Cardiac",
          "BJA Educ 2015",
        ],
        workedExamples: ["BJA Educ 2018", "BJA Educ 2015"],
      }}
      keyPoints={[
        { text: "CPB: heparin 300-400 u/kg, target ACT >480s, reverse with protamine 1mg:100u ratio", cites: ["Kaplan's Cardiac"] },
        { text: "CPB activates SIRS — complement, cytokines, coagulopathy; TXA reduces bleeding (ATACAS)", cites: ["BJA Educ 2018"] },
        { text: "Left-sided DLT preferred for OLV; always confirm position with fibreoptic bronchoscopy", cites: ["BJA Educ 2015"] },
        { text: "HPV reduces shunt during OLV — inhibited by volatiles >1 MAC, vasodilators, and hypothermia", cites: ["Kaplan's Cardiac"] },
        { text: "Aortic stenosis: maintain SVR and sinus rhythm, avoid tachycardia and hypotension", cites: ["BJA Educ 2018"] },
      ]}
      coreConcepts={
        <ExamSection exams={[Exam.FINAL]} className="scroll-mt-24">
          <TopicTableOfContents items={tocItems} />
          <p className="text-muted-foreground leading-relaxed mb-6">
            Cardiothoracic anaesthesia is built around two distinct domains. <strong>Cardiac surgery</strong> centres on cardiopulmonary bypass — its circuit, its physiological consequences, and the specific demands of valve, coronary, and aortic-arch procedures. <strong>Thoracic surgery</strong> centres on lung isolation and the management of one-lung ventilation. The topic below follows that order: cardiac fundamentals first, then thoracic.
          </p>

          <section className="space-y-6 mb-10">
        {/* ───────── Cardiac surgery ───────── */}
        <CollapsibleSubsection title="Cardiopulmonary Bypass (CPB)" defaultOpen>
          <p className="text-muted-foreground leading-relaxed mb-3">
            CPB allows the heart and lungs to be bypassed during cardiac surgery. Understanding the circuit and physiological derangements is essential.
          </p>
          <CPBCircuitDiagram />
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">CPB Circuit Components</p>
              <p className="text-sm text-muted-foreground mt-1">Venous cannula (RA/SVC/IVC) → venous reservoir → pump (roller/centrifugal) → oxygenator/heat exchanger → arterial filter → arterial cannula (aorta). Prime volume ~1.5 L (haemodilution).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Anticoagulation</p>
              <p className="text-sm text-muted-foreground mt-1">Heparin 300–400 units/kg before cannulation. Target ACT &gt;480 seconds. Reverse with protamine 1 mg per 100 units heparin. Protamine reactions: hypotension, bronchospasm, pulmonary hypertension.</p>
            </div>
          </div>
        </CollapsibleSubsection>

        <CollapsibleSubsection title="Physiological Effects of CPB">
          <div className="space-y-2">
            {[
              { effect: "SIRS", detail: "Blood contact with circuit surfaces activates complement, cytokines, and coagulation cascades — systemic inflammatory response." },
              { effect: "Haemodilution", detail: "Prime volume reduces Hct to ~25%. Acceptable — improves rheology. Transfuse if Hct <20% on bypass." },
              { effect: "Hypothermia", detail: "Intentional cooling to 28–32°C (moderate) or 18–20°C (deep — circulatory arrest). Reduces metabolic rate ~7% per 1°C." },
              { effect: "Non-pulsatile flow", detail: "Roller pumps provide non-pulsatile flow. May impair microcirculation and organ perfusion. Centrifugal pumps provide some pulsatility." },
              { effect: "Coagulopathy", detail: "Platelet dysfunction, consumption of factors, heparin rebound, fibrinolysis. Give TXA (ATACAS trial)." },
            ].map((e) => (
              <div key={e.effect} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{e.effect}</span>
                <span className="text-sm text-muted-foreground">{e.detail}</span>
              </div>
            ))}
          </div>
        </CollapsibleSubsection>

        <CollapsibleSubsection title="Complications of CPB — a system-by-system structure">
          <p className="text-muted-foreground leading-relaxed mb-3">
            Blood contact with the non-endothelial circuit, ischaemia–reperfusion, endotoxaemia and surgical trauma trigger a systemic inflammatory response with complement, contact-system, neutrophil, platelet and cytokine activation. Every organ complication of bypass can be traced back to that response plus embolism and non-pulsatile perfusion<InlineRef topicId="cardiothoracic" refLabel="Warren 2009 CPB Inflammation" />.
          </p>
          <div className="space-y-2">
            {[
              { effect: "Systemic (SIRS)", detail: "Post-perfusion syndrome: fever, capillary leak, oedema, vasoplegia and raised vasopressor requirement, occasionally progressing to multi-organ dysfunction. Risk rises with bypass duration; mitigation includes biocompatible circuits, minimised prime, TXA, and avoidance of unnecessary transfusion." },
              { effect: "Haematological", detail: "Platelet activation, adhesion and consumption with acquired platelet dysfunction; dilution and consumption of clotting factors; hyperfibrinolysis; heparin rebound; haemolysis from shear and suction. Protamine reactions range from histamine-mediated hypotension to true anaphylaxis and catastrophic pulmonary vasoconstriction with right ventricular failure — give slowly, be ready with vasopressors, adrenaline and reheparinisation." },
              { effect: "Neurological", detail: "Stroke in roughly 1–3% (higher after valve and arch surgery) from macroemboli (atheroma, air, thrombus) and hypoperfusion; postoperative cognitive dysfunction in up to 30–50% early, from microemboli, inflammation and cerebral hypoperfusion; delirium is common. Mitigation: epiaortic scanning, careful de-airing, α-stat pH management in adults, MAP maintenance, glycaemic control, cerebral oximetry in arch work." },
              { effect: "Renal", detail: "AKI in 5–30%, dialysis-requiring in 1–5% — non-pulsatile flow, haemodilution, haemolysis with free haemoglobin, inflammation, nephrotoxins and low perfusion pressure. Keep MAP ≥65–70 mmHg (higher in hypertensive/CKD patients), avoid hypovolaemia, limit haemodilution and avoid NSAIDs and unnecessary starch/nephrotoxins." },
              { effect: "Pulmonary", detail: "'Pump lung' — neutrophil sequestration in the pulmonary vasculature during the non-ventilated bypass period causes increased permeability, atelectasis, reduced compliance and impaired gas exchange; a small proportion progress to ARDS. Lung-protective ventilation before and after bypass, recruitment on separation, and restrictive transfusion reduce risk." },
              { effect: "Cardiovascular", detail: "Myocardial stunning and reperfusion injury after cardioplegic arrest with a nadir in function at 4–6 h, arrhythmias (especially AF), coronary or graft air embolism, and vasoplegia refractory to catecholamines (vasopressin or methylene blue may be needed). Inotropic support, careful preload optimisation and pacing wires are routine." },
              { effect: "Metabolic & other", detail: "Hyperglycaemia and insulin resistance, hypokalaemia/hyperkalaemia from cardioplegia, hypocalcaemia after citrated blood, hypomagnesaemia, hypothermia-related coagulopathy, gastrointestinal hypoperfusion with ileus or (rarely) mesenteric ischaemia, hepatic and pancreatic enzyme rises, and splanchnic endotoxin translocation feeding the inflammatory response." },
            ].map((e) => (
              <div key={e.effect} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{e.effect}</span>
                <span className="text-sm text-muted-foreground">{e.detail}</span>
              </div>
            ))}
          </div>
        </CollapsibleSubsection>

        <CollapsibleSubsection title="Postoperative Atrial Fibrillation (POAF)">
          <p className="text-muted-foreground leading-relaxed mb-3">
            POAF complicates around <strong>30%</strong> of cardiac surgery (20–40%; up to 60% after combined valve and coronary procedures), peaking on postoperative days 2–3. It is not benign: it is associated with stroke, longer ICU and hospital stay, heart failure and increased long-term mortality<InlineRef topicId="cardiothoracic" refLabel="POAF JCVA 2024" />.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
            <li><strong>Mechanism</strong>: an inflammatory and oxidative-stress substrate (pericardiotomy, bypass-related SIRS) acting on atrial stretch, catecholamine surge, electrolyte shifts and pre-existing atrial fibrosis.</li>
            <li><strong>Risk factors</strong>: increasing age (the strongest), hypertension, obesity, valve surgery, left atrial enlargement, prior AF, COPD, chronic kidney disease, heart failure, and abrupt withdrawal of chronic beta-blockade.</li>
            <li><strong>Prophylaxis</strong>: continue or restart beta-blockers perioperatively (never stop them abruptly); correct potassium to 4.5–5.0 mmol/L and magnesium to &gt;1.0 mmol/L; consider amiodarone prophylaxis in high-risk patients; posterior pericardiotomy and biatrial pacing reduce incidence in selected centres; statins and good analgesia/volume management help.</li>
            <li><strong>Haemodynamically unstable AF</strong> (hypotension, ischaemia, pulmonary oedema): synchronised DC cardioversion under sedation/anaesthesia, correct electrolytes, exclude tamponade, ischaemia, pneumothorax and hypovolaemia.</li>
            <li><strong>Stable AF</strong>: rate control with a beta-blocker (or diltiazem if beta-blockade contraindicated), or rhythm control with IV amiodarone 300 mg over 20–60 min then 900 mg over 24 h; digoxin is a second-line adjunct in heart failure. Treat the reversible drivers — pain, hypovolaemia, hypoxia, hypokalaemia, hypomagnesaemia, sepsis, inotropes.</li>
            <li><strong>Anticoagulation</strong>: consider once AF persists or recurs beyond <strong>48 hours</strong>, weighing surgical bleeding risk against stroke risk (CHA₂DS₂-VASc); most patients are transitioned to a DOAC or warfarin with a planned review at 4–6 weeks, since POAF predicts later documented AF and merits follow-up rather than assumption of cure<InlineRef topicId="cardiothoracic" refLabel="POAF JCVA 2024" />.</li>
          </ul>
        </CollapsibleSubsection>

        <CollapsibleSubsection title="Transoesophageal Echocardiography (TOE) in Cardiac Surgery">
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
            <li><strong>Indications</strong>: all valve repair/replacement and congenital surgery; confirming and refining the surgical plan; assessing ventricular function, filling and regional wall motion; diagnosing the cause of haemodynamic instability (hypovolaemia, RV failure, tamponade, dynamic LVOT obstruction, aortic dissection); guiding cannula, ECMO and intra-aortic balloon placement; confirming de-airing and assessing repair adequacy after separation from bypass.</li>
            <li><strong>Absolute contraindications</strong>: oesophageal stricture, tumour, perforation or recent oesophageal/gastric surgery, active upper GI bleeding, and an unwilling or uninformed conscious patient. <strong>Relative</strong>: oesophageal varices or diverticulum, hiatus hernia, previous radiotherapy, severe cervical spine instability, and coagulopathy.</li>
            <li><strong>Core views</strong>: mid-oesophageal four-chamber, two-chamber, long-axis (LVOT and aortic valve), aortic valve short-axis, bicaval, RV inflow–outflow, plus transgastric mid-papillary short-axis and deep transgastric views for Doppler alignment.</li>
            <li><strong>Assessments</strong>: valve morphology and regurgitant/stenotic severity, ventricular systolic and diastolic function, chamber sizes, pericardium, aorta, intracardiac shunts, and quantification with planimetry, pressure gradients, PISA and continuity-equation methods.</li>
            <li><strong>De-airing</strong>: after any open-chamber procedure, TOE identifies residual air in the left atrium, left ventricular apex and pulmonary veins in the head-down position, guiding venting before the cross-clamp comes off — a key step in preventing coronary and cerebral air embolism.</li>
            <li><strong>Insertion technique</strong>: anaesthetised, intubated patient, head neutral, jaw lifted with a lubricated probe passed in the midline without force; never force against resistance and consider laryngoscope-assisted or bougie-guided insertion after a failed pass. Bite protection, gentle manipulation, minimal freeze-frame time and probe removal before extubation.</li>
            <li><strong>Complications</strong>: national ACTACC audit data show a major complication rate of about <strong>1 in 1300</strong> examinations (oesophageal or gastric injury, perforation, significant bleeding) and TOE-related death around <strong>1 in 3000</strong>; minor odynophagia, lip and dental trauma are considerably more common<InlineRef topicId="cardiothoracic" refLabel="ACTACC TOE Audit 2019" />.</li>
          </ul>
        </CollapsibleSubsection>


        <CollapsibleSubsection title="Key Cardiac Surgery Considerations">
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Aortic Valve Replacement</p>
              <p className="text-sm text-muted-foreground mt-1">Aortic stenosis: maintain SVR, avoid tachycardia, maintain sinus rhythm. Dangerous triad: hypotension → coronary hypoperfusion → further hypotension. Phenylephrine for BP support.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">CABG</p>
              <p className="text-sm text-muted-foreground mt-1">On-pump vs off-pump (OPCAB). Maintain haemodynamic stability during grafting. TOE to assess wall motion abnormalities. ATACAS trial: TXA reduces bleeding without increasing thrombotic events.</p>
            </div>
          </div>
        </CollapsibleSubsection>

        <CollapsibleSubsection title="On-Pump vs Off-Pump Cardiac Surgery (OPCAB)">
          <p className="text-muted-foreground leading-relaxed mb-4">
            Coronary artery bypass grafting (CABG) can be performed with cardiopulmonary bypass (on-pump) or on the beating heart (off-pump / OPCAB). Each approach has distinct anaesthetic challenges.
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold w-1/4">Feature</th>
                  <th className="text-left py-2 text-primary font-semibold">On-Pump (CPB)</th>
                  <th className="text-left py-2 font-semibold" style={{ color: "hsl(140, 50%, 48%)" }}>Off-Pump (OPCAB)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { feature: "Heart", onPump: "Arrested (cardioplegia) — motionless, bloodless field", offPump: "Beating throughout — stabiliser devices used on target coronary territory" },
                  { feature: "Lungs", onPump: "Ventilation stopped during CPB", offPump: "Ventilation continues — may need adjustments during posterior grafts" },
                  { feature: "Anticoagulation", onPump: "Full heparinisation (ACT >480s)", offPump: "Lower-dose heparin (ACT 250–350s); some centres use full dose" },
                  { feature: "Myocardial protection", onPump: "Cold blood/crystalloid cardioplegia ± topical cooling", offPump: "No cardioplegia — ischaemia managed by shunts, brief coronary occlusion" },
                  { feature: "Haemodynamic management", onPump: "Pump controls flow & pressure; MAP target 50–70 mmHg on bypass", offPump: "Must maintain native CO; position changes (Trendelenburg, right tilt) to expose coronary targets → haemodynamic instability" },
                  { feature: "SIRS / Inflammation", onPump: "Significant — blood–circuit contact activates complement, cytokines", offPump: "Reduced — no circuit contact; less coagulopathy and transfusion" },
                  { feature: "Coagulopathy", onPump: "Platelet dysfunction, factor consumption, fibrinolysis; protamine reversal", offPump: "Less platelet dysfunction; lower transfusion requirements" },
                  { feature: "Neurological injury", onPump: "Aortic cannulation/cross-clamp → risk of embolism, stroke (1–3%)", offPump: "Reduced aortic manipulation → potentially less stroke (partial clamp or 'no-touch' aortic technique)" },
                  { feature: "Renal effects", onPump: "Non-pulsatile flow + haemodilution may impair renal perfusion", offPump: "Pulsatile native flow maintained; may reduce AKI in high-risk patients" },
                  { feature: "Graft completeness", onPump: "Full revascularisation easier on still heart", offPump: "Posterior/lateral targets technically challenging → incomplete revascularisation risk" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 font-medium text-foreground">{row.feature}</td>
                    <td className="py-2">{row.onPump}</td>
                    <td className="py-2">{row.offPump}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* On-pump process */}
          <div className="mb-4">
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">On-Pump Process (Step by Step)</h3>
            <div className="space-y-1.5">
              {[
                "Heparin 300–400 units/kg IV → confirm ACT >480 seconds",
                "Aortic cannulation (ascending aorta) and venous cannulation (RA ± bicaval)",
                "Initiate CPB — pump takes over circulation; ventilation stopped",
                "Apply aortic cross-clamp → heart isolated from systemic circulation",
                "Deliver cardioplegia (cold blood/crystalloid) → myocardial arrest and protection",
                "Cool to target temperature (32°C moderate / 18–20°C deep hypothermic circulatory arrest)",
                "Perform surgical repair/grafting on still, bloodless field",
                "Rewarm to 37°C — de-air heart chambers (TOE guided)",
                "Remove aortic cross-clamp → heart reperfuses → defibrillate if needed",
                "Wean from CPB — optimise preload, HR/rhythm, contractility, afterload",
                "Decannulate → protamine reversal of heparin (1 mg per 100 units) → haemostasis",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded border border-border">
                  <span className="text-xs font-bold text-primary w-5 text-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Structured checklist for weaning from CPB</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Work through a fixed sequence so nothing is missed — the widely used mnemonic is <strong>&quot;PAT-CVR&quot;</strong> or simply <strong>rate/rhythm → preload → contractility → afterload</strong>, wrapped in checks of temperature, ventilation, laboratory values and the surgical field.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Patient</strong>: core temperature ≥36 °C with no gradient, potassium 4.0–5.0 mmol/L, ionised calcium and magnesium corrected, glucose 6–10 mmol/L, haematocrit ≥21–24%, pH and base excess normalised, ACT trend and protamine ready.</li>
              <li><strong>Airway and ventilation</strong>: lungs re-expanded with recruitment breaths, ventilation restarted with 100% oxygen and confirmed bilateral air entry and capnography trace, suction the tube, and check compliance before the pump comes off.</li>
              <li><strong>Rhythm and rate</strong>: sinus or atrially paced <strong>80–100 beats/min</strong> — defibrillate ventricular fibrillation, treat conduction block with epicardial pacing (AV sequential preserves atrial contribution), and correct electrolytes before chasing arrhythmias.</li>
              <li><strong>Preload</strong>: fill from the pump in small increments guided by direct visual inspection of the heart, filling pressures and <strong>TOE</strong>; both under- and over-filling reduce output, and a distended right ventricle is a warning sign.</li>
              <li><strong>Contractility</strong>: assess with TOE and pulse contour; start adrenaline 0.03–0.1 µg/kg/min or dobutamine/milrinone for the failing ventricle, and consider levosimendan or mechanical support (IABP, VA-ECMO) early if two attempts to separate fail.</li>
              <li><strong>Afterload and RV</strong>: noradrenaline or vasopressin for post-bypass vasoplegia; for RV failure optimise pulmonary vasodilatation (inhaled nitric oxide, nebulised prostacyclin, milrinone), maintain coronary perfusion pressure and avoid hypercapnia and acidosis.</li>
              <li><strong>Monitoring and de-airing</strong>: TOE to exclude retained air, new valvular regurgitation, regional wall-motion abnormality and unrecognised tamponade before the chest is closed; recalibrate transducers and pressure monitors.</li>
              <li><strong>Surgery and haemostasis</strong>: grafts and anastomoses inspected, protamine given slowly with an anaphylaxis plan, tranexamic acid continued, and coagulopathy corrected by ROTEM/TEG. Bleeding requiring return to theatre is not rare — UK multicentre audit data give an overall resternotomy-for-bleeding rate of about <strong>3.6% (range 0.7–7.6% between centres)</strong>, so a low threshold for surgical re-exploration and a clear handover plan matter<InlineRef topicId="cardiothoracic" refLabel="Resternotomy Audit 2021" /></li>
            </ul>
          </div>

          {/* OPCAB challenges */}
          <div className="mb-4">
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">OPCAB — Anaesthetic Challenges</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Haemodynamic Instability</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Heart displacement to access posterior vessels (LAD easy, RCA moderate, circumflex/OM difficult) causes ↓ ventricular filling, ↓ CO, hypotension. Managed with Trendelenburg, right lateral tilt, volume loading, and vasopressor/inotrope support. Stabiliser compression may reduce CO by 10–30%.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Ischaemia During Grafting</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Temporary coronary occlusion (snare) during distal anastomosis causes regional ischaemia. Use intracoronary shunts when possible. Monitor ST segments continuously (5-lead ECG, V5 most sensitive). Have GTN, inotropes, and CPB on standby (conversion rate 2–15%).
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Arrhythmias</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Cardiac manipulation → VT/VF, bradycardia, heart block. External pacing must be available. Surgeon may temporarily lift heart away if arrhythmia occurs. Brief periods of haemodynamic compromise are expected and tolerated.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Conversion to On-Pump</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Must always be prepared for emergency conversion (2–15% of OPCAB cases). Reasons: intractable ischaemia, haemodynamic collapse, malignant arrhythmia, poor target vessel quality. Heparin and cannulation equipment must be immediately available.
                </p>
              </div>
            </div>
          </div>

          {/* Key trials */}
          <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <p className="text-sm font-semibold text-amber-400 mb-2">Key Evidence — Exam Relevant</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">ROOBY (2012):</strong> Off-pump had worse composite outcome at 1 year (death, MI, revascularisation) and lower graft patency vs on-pump in VA population.</p>
              <p><strong className="text-foreground">CORONARY (2012):</strong> No significant difference in 30-day death, MI, stroke, or renal failure between on- and off-pump at 5 years. Off-pump had higher repeat revascularisation rate.</p>
              <p><strong className="text-foreground">GOPCABE (2013):</strong> In elderly patients (&gt;75yr), no benefit of off-pump for 30-day or 12-month outcomes.</p>
              <p><strong className="text-foreground">Current consensus:</strong> On-pump remains the standard for most patients. OPCAB may benefit select high-risk patients (heavily calcified aorta, CKD, previous stroke). Surgeon expertise is a major determinant of outcomes.</p>
            </div>
          </div>
        </CollapsibleSubsection>

        {/* Deep hypothermic circulatory arrest */}
        <CollapsibleSubsection title="Deep Hypothermic Circulatory Arrest (DHCA)">
          <p className="text-muted-foreground leading-relaxed mb-4">
            DHCA is a controlled period of complete circulatory arrest performed under profound hypothermia (classically 14–20 °C nasopharyngeal). Cooling slows cerebral metabolism (~6–7% per °C, Q₁₀ ≈ 2–3) and provides a finite "safe" window of organ ischaemia in which the surgeon can operate on a bloodless, cannula-free aortic arch or great vessels. It is an inherently high-risk technique reserved for cases where conventional CPB cannot provide adequate exposure or distal perfusion.
          </p>

          <div className="mb-5 rounded-lg border border-primary/30 bg-primary/5 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-2">
              Related sections in this topic
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { href: "#cpb-physiology", label: "CPB physiology", note: "hypothermia, non-pulsatile flow, SIRS" },
                { href: "#cpb-overview", label: "Anticoagulation & heparin reversal", note: "300–400 u/kg, ACT >480 s, protamine 1 mg/100 u" },
                { href: "#cpb-overview", label: "Rewarming on CPB", note: "≤10 °C gradient, never >37 °C, de-airing" },
                { href: "#cals", label: "Cardiac arrest after cardiac surgery", note: "post-op CALS modifications" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="group inline-flex flex-col rounded-md border border-border bg-background px-2.5 py-1.5 hover:border-primary hover:bg-primary/10 transition-colors"
                >
                  <span className="text-xs font-semibold text-foreground group-hover:text-primary">
                    → {l.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{l.note}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">Indications — procedures potentially requiring DHCA</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Aortic arch surgery</p>
                  <p className="text-sm text-muted-foreground mt-1">Acute type A aortic dissection repair, aneurysm of the ascending aorta extending into the arch, total/hemi-arch replacement, elephant-trunk and frozen elephant-trunk procedures.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Great vessel & complex aortic work</p>
                  <p className="text-sm text-muted-foreground mt-1">Reconstruction of innominate/carotid origins, traumatic aortic transection, redo aortic surgery where safe cross-clamping is impossible.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Pulmonary endarterectomy</p>
                  <p className="text-sm text-muted-foreground mt-1">Chronic thromboembolic pulmonary hypertension (CTEPH) — bronchial back-bleeding obscures the dissection plane; brief DHCA periods (≤20 min) provide a bloodless field.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Other</p>
                  <p className="text-sm text-muted-foreground mt-1">Resection of renal/IVC tumours with intracardiac extension, complex congenital cardiac surgery (e.g. Norwood), select neurosurgical giant basilar aneurysms.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">Conduct of DHCA — step-by-step</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground pl-2">
                <li><strong>Preparation.</strong> Large-bore IV access, arterial line (right radial — assesses antegrade cerebral perfusion if innominate is cannulated), CVC/PAC, TOE, processed EEG (BIS) and bilateral cerebral oximetry (NIRS), nasopharyngeal + bladder/oesophageal temperature probes, urinary catheter, forced-air + water-mattress warming for rewarming. Cross-matched blood and clotting products immediately available.</li>
                <li><strong>Neuroprotection bundle.</strong> Pack the head in ice, give methylprednisolone 15 mg/kg or dexamethasone, mannitol 0.5 g/kg ± thiopentone 5–10 mg/kg or propofol bolus to achieve EEG burst-suppression before arrest. Maintain normoglycaemia (4–8 mmol/L); insulin infusion as required.</li>
                <li><strong>Heparinise & cannulate.</strong> Heparin 300–400 u/kg, ACT &gt;480 s. Arterial cannulation site chosen to allow selective cerebral perfusion (right axillary or innominate preferred over femoral, which risks retrograde embolisation in dissection).</li>
                <li><strong>Cooling on CPB.</strong> Cool slowly (gradient ≤10 °C between arterial blood and patient) over 20–30 min to target nasopharyngeal temperature: <em>profound</em> 14–20 °C, <em>deep</em> 20–25 °C, <em>moderate</em> 25–28 °C (most contemporary practice with adjunct cerebral perfusion). Confirm electrocerebral silence on EEG before arrest.</li>
                <li><strong>Acid–base strategy.</strong> Use <strong>pH-stat</strong> during cooling (CO₂ added to maintain pH 7.4 corrected for temperature) — promotes cerebral vasodilation and uniform brain cooling. Switch to <strong>α-stat</strong> during rewarming to preserve cerebral autoregulation. Maintain Hct ≈ 25–30%.</li>
                <li><strong>Initiate arrest.</strong> Stop the pump, drain venous blood to the reservoir, place patient head-down (Trendelenburg) to reduce air-embolism risk, and clamp arterial line. Note the precise arrest time.</li>
                <li><strong>Cerebral protection adjunct.</strong> Where feasible, use <strong>antegrade selective cerebral perfusion (ASCP)</strong> via the innominate/right axillary at 10 mL/kg/min targeting right-radial pressure 50–70 mmHg, or <strong>retrograde cerebral perfusion (RCP)</strong> via the SVC at ≤500 mL/min (CVP ≤25 mmHg). ASCP allows safe arrest times of 60–90 min vs ~30 min with hypothermia alone.</li>
                <li><strong>Surgical period.</strong> Document arrest duration continuously; aim for &lt;30 min without adjunct, &lt;45 min with RCP, &lt;60–90 min with ASCP. Beyond 40 min without selective perfusion, neurological injury rises sharply.</li>
                <li><strong>Reperfusion & rewarming.</strong> De-air the arch meticulously (TOE-guided), resume CPB, rewarm slowly with arterial-blood gradient ≤10 °C and never &gt;37 °C (hyperthermia is profoundly neurotoxic). Allow 1–2 °C/5 min rewarming; full rewarm typically 60–90 min.</li>
                <li><strong>Separation from CPB.</strong> Restore sinus rhythm (defibrillate as needed), pace as required, optimise haemodynamics with inotropes/vasopressors. Reverse heparin with protamine. Anticipate coagulopathy — give platelets, FFP, cryoprecipitate, fibrinogen concentrate guided by ROTEM/TEG. Tranexamic acid throughout (ATACAS).</li>
                <li><strong>Post-op.</strong> ICU admission ventilated; delayed neurological assessment; maintain normoglycaemia, normocapnia, MAP &gt;70 mmHg, and strict normothermia (avoid pyrexia for 48 h).</li>
              </ol>
            </div>

            {/* Acid–base & cerebral perfusion comparison tables */}
            <div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">Acid–base strategy: pH-stat vs α-stat</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Both manage the temperature-dependent shift in CO₂ solubility on CPB but with opposite priorities — uniform brain cooling vs preserved cerebral autoregulation.
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left p-3 font-semibold text-foreground border-b border-border w-1/4">Feature</th>
                      <th className="text-left p-3 font-semibold text-foreground border-b border-border">pH-stat</th>
                      <th className="text-left p-3 font-semibold text-foreground border-b border-border">α-stat</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground align-top">
                    {[
                      { f: "Principle", a: "Maintain pH 7.40 and PaCO₂ 5.3 kPa corrected to the patient's actual temperature.", b: "Maintain pH 7.40 and PaCO₂ 5.3 kPa measured at 37 °C — uncorrected for temperature." },
                      { f: "How achieved", a: "Add CO₂ to the oxygenator (or reduce sweep gas flow) during cooling.", b: "No CO₂ added — sweep gas adjusted to keep machine ABG at 37 °C values." },
                      { f: "Cerebral blood flow", a: "Higher — CO₂-mediated vasodilation; CBF/CMRO₂ uncoupled (luxury perfusion).", b: "Lower — preserved CO₂ reactivity and pressure autoregulation; CBF coupled to CMRO₂." },
                      { f: "Brain cooling", a: "More uniform and faster — useful when planning DHCA.", b: "Less uniform — slower brain cooling." },
                      { f: "Embolic load to brain", a: "Higher — increased CBF carries more gaseous/particulate emboli.", b: "Lower — protective against embolic stroke." },
                      { f: "Best evidence-based use", a: "Cooling phase before DHCA, paediatric/congenital cardiac surgery.", b: "Adult cardiac surgery without DHCA; rewarming phase after DHCA." },
                      { f: "Targets", a: "pH 7.40 and PaCO₂ 5.3 kPa at the patient's temperature (machine pH appears alkalotic, PaCO₂ low at 37 °C).", b: "pH 7.40 and PaCO₂ 5.3 kPa at 37 °C (machine values); when corrected to patient temperature, pH appears more alkalotic and PaCO₂ lower." },
                      { f: "Advantages", a: "Faster, more uniform brain cooling; theoretically improves neuroprotection before DHCA.", b: "Maintains autoregulation; lower stroke rate in adult cardiac surgery; simpler — no CO₂ titration." },
                      { f: "Limitations", a: "Loss of cerebral autoregulation; higher embolic load; may worsen ICP.", b: "Slower, less uniform brain cooling; potentially less effective neuroprotection during prolonged DHCA." },
                      { f: "Practical rule", a: "Use during cooling.", b: "Use during rewarming and routine adult CPB." },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/20">
                        <td className="p-3 font-medium text-foreground">{row.f}</td>
                        <td className="p-3">{row.a}</td>
                        <td className="p-3">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">Cerebral perfusion adjuncts: ASCP vs RCP</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Selective cerebral perfusion extends the safe arrest window beyond the ~30 min permitted by hypothermia alone. Antegrade is now the gold standard; retrograde retains a role when antegrade cannulation is not feasible.
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left p-3 font-semibold text-foreground border-b border-border w-1/4">Feature</th>
                      <th className="text-left p-3 font-semibold text-foreground border-b border-border">Antegrade SCP (ASCP)</th>
                      <th className="text-left p-3 font-semibold text-foreground border-b border-border">Retrograde CP (RCP)</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground align-top">
                    {[
                      { f: "Cannulation route", a: "Right axillary, innominate, or direct head-vessel cannulation (selective unilateral or bilateral via left CCA).", b: "Via the SVC cannula — oxygenated blood pumped retrograde up the SVC into the cerebral venous system." },
                      { f: "Direction of flow", a: "Antegrade — physiological direction down the cerebral arterial tree.", b: "Retrograde — through the venous system; significant venous valve resistance and AV shunting." },
                      { f: "Flow rate target", a: "10 mL/kg/min (typical 600–1000 mL/min in adults).", b: "200–500 mL/min (limited by SVC pressure)." },
                      { f: "Pressure target", a: "Right radial arterial pressure 50–70 mmHg.", b: "SVC (CVP) pressure ≤25 mmHg — higher risks cerebral oedema." },
                      { f: "Temperature", a: "Permits use at moderate hypothermia (24–28 °C).", b: "Generally used at deep hypothermia (18–20 °C); little additional metabolic support otherwise." },
                      { f: "Safe arrest time", a: "60–90 min (some series report 90+ min with bilateral ASCP).", b: "Up to 40–45 min — limited by oedema and incomplete metabolic substrate delivery." },
                      { f: "Mechanism of benefit", a: "Genuine oxygen and substrate delivery to the brain at near-normal CBF.", b: "Primarily flushes air/particulate debris from cerebral vessels; modest metabolic support; maintains brain cooling." },
                      { f: "Advantages", a: "Effective oxygen delivery → longer safe arrest window; permits warmer temperatures; reduces stroke and TND; allows complex arch reconstruction.", b: "Simple — uses existing SVC cannula; no extra arterial cannulation; flushes embolic debris; useful when ASCP is not feasible (severe atheroma, dissection of head vessels)." },
                      { f: "Limitations / risks", a: "Requires extra cannulation (axillary access, technical complexity); risk of arterial dissection, embolism, malperfusion if pressure too high; right radial only monitors right hemisphere unless bilateral cannulation used.", b: "Limited oxygen delivery — most flow shunted through AV connections; cerebral oedema if pressure >25 mmHg; shorter safe time; not a substitute for ASCP in long arrests." },
                      { f: "Current role", a: "Modern gold standard — has driven a shift from profound (14–20 °C) to moderate (24–28 °C) hypothermia.", b: "Adjunct or alternative when ASCP is contraindicated; commonly combined with brief DHCA for de-airing." },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/20">
                        <td className="p-3 font-medium text-foreground">{row.f}</td>
                        <td className="p-3">{row.a}</td>
                        <td className="p-3">{row.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground italic mt-2">
                Exam pearl: bilateral ASCP via right axillary + left CCA gives the most reliable global cerebral perfusion; right-radial pressure alone can mask left-hemisphere malperfusion if the circle of Willis is incomplete.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">Complications</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Neurological</p>
                  <p className="text-sm text-muted-foreground mt-1">Stroke (5–10%), <strong>temporary neurological dysfunction</strong> (delirium, agitation — up to 30%), seizures, long-term cognitive decline. Risk rises steeply with arrest &gt;40 min without selective cerebral perfusion, hyperthermic rewarming, and increasing age.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Coagulopathy & bleeding</p>
                  <p className="text-sm text-muted-foreground mt-1">Hypothermia-induced platelet dysfunction, dilutional and consumptive coagulopathy, hyperfibrinolysis. Re-exploration for bleeding 5–15%. High transfusion requirement.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Cardiac</p>
                  <p className="text-sm text-muted-foreground mt-1">Myocardial stunning, low cardiac output syndrome, arrhythmias, prolonged inotrope requirement, occasionally need for IABP, VA-ECMO or temporary mechanical support.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Renal</p>
                  <p className="text-sm text-muted-foreground mt-1">AKI in 20–40% — multifactorial (low-flow CPB, haemoglobinuria, embolism, contrast). RRT required in 5–10%.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Respiratory</p>
                  <p className="text-sm text-muted-foreground mt-1">Prolonged ventilation, CPB-related lung injury (SIRS, capillary leak), pleural effusions, phrenic nerve injury from cold.</p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Systemic & metabolic</p>
                  <p className="text-sm text-muted-foreground mt-1">SIRS amplified by deep hypothermia, hyperglycaemia, hepatic dysfunction, splanchnic ischaemia, gas embolism, and rebound hyperthermia during rewarming.</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
              <p className="text-sm font-semibold text-amber-400 mb-2">Key principles — exam pearls</p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>Cerebral metabolic rate falls ~6–7% per °C; at 18 °C CMRO₂ is ~20% of baseline, giving ~30 min of "safe" arrest without adjunct.</li>
                <li>pH-stat during <em>cooling</em>, α-stat during <em>rewarming</em>.</li>
                <li>Antegrade selective cerebral perfusion (right axillary/innominate) is the modern gold-standard adjunct — has driven a shift from profound to moderate hypothermia (24–28 °C).</li>
                <li>Avoid hyperthermia on rewarming — never exceed 37 °C arterial blood; pyrexia in the first 24–48 h worsens neurological outcome.</li>
                <li>Always confirm electrocerebral silence (EEG burst-suppression) before circulatory arrest.</li>
              </ul>
            </div>

            {/* Complication quick-reference */}
            <div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">DHCA Complication Quick-Reference</h3>
              <p className="text-sm text-muted-foreground mb-3">
                A bedside-style aide-mémoire: complication → likely mechanism → immediate anaesthetic action. Use as a structured framework for the post-bypass period in viva or in real life.
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="text-left p-3 font-semibold text-foreground border-b border-border w-1/5">Complication</th>
                      <th className="text-left p-3 font-semibold text-foreground border-b border-border w-2/5">Likely cause</th>
                      <th className="text-left p-3 font-semibold text-foreground border-b border-border w-2/5">Immediate anaesthetic management</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground align-top">
                    {[
                      {
                        c: "Coagulopathy / surgical bleeding",
                        cause: "Hypothermia-induced platelet dysfunction, dilution and consumption of factors, hyperfibrinolysis, residual heparin / heparin rebound, hepatic congestion.",
                        mgmt: "Rewarm to ≥36 °C (corrects platelet function). ROTEM/TEG-guided product use: FFP for prolonged CT, cryoprecipitate or fibrinogen concentrate if FIBTEM A10 <8 mm, platelets if low or dysfunctional, PCC if vitamin-K factors deficient. Tranexamic acid 1 g (ATACAS). Recheck ACT and give additional protamine if heparin rebound.",
                      },
                      {
                        c: "Low cardiac output syndrome",
                        cause: "Myocardial stunning from arrest + reperfusion, prolonged cross-clamp, inadequate myocardial protection, RV failure from air/embolism, vasoplegia.",
                        mgmt: "TOE to define the cause (LV/RV function, filling, valves). Optimise rate (80–100, sinus or A-paced) → preload → contractility (adrenaline 0.05–0.1 mcg/kg/min, milrinone 0.375–0.75 mcg/kg/min, dobutamine) → afterload (noradrenaline / vasopressin for vasoplegia). Escalate early to IABP or VA-ECMO if SvO₂ <60% and lactate rising despite inotropes.",
                      },
                      {
                        c: "Vasoplegia (post-CPB)",
                        cause: "SIRS amplified by deep hypothermia and rewarming; pre-op ACEi/ARB; bypass duration; profound NO release.",
                        mgmt: "Noradrenaline first line; add vasopressin 0.03 U/min (VANCS); methylene blue 1–2 mg/kg if refractory; consider hydroxocobalamin in extreme cases. Treat any contributing acidosis and ensure normal calcium.",
                      },
                      {
                        c: "Acute kidney injury (AKI)",
                        cause: "Low-flow non-pulsatile CPB, haemoglobinuria, micro-embolism, prolonged hypothermic ischaemia, contrast load, vasopressor exposure, hypovolaemia.",
                        mgmt: "Maintain MAP ≥75 mmHg (higher in chronic hypertension). Avoid hypovolaemia and hyperchloraemia (use balanced solutions). Stop nephrotoxins (NSAIDs, aminoglycosides, ACEi/ARB). Alkalinise urine if pigmenturia. Early renal-replacement therapy if KDIGO 3 with fluid overload, severe acidosis, or hyperkalaemia.",
                      },
                      {
                        c: "Stroke / new neurological deficit",
                        cause: "Embolism (air, atheroma, thrombus), watershed hypoperfusion during arrest, prolonged arrest >40 min without selective cerebral perfusion, hyperthermic rewarming.",
                        mgmt: "Maintain MAP 80–90 mmHg, head-up 30°, normocapnia, normoglycaemia, strict normothermia (avoid pyrexia for 48 h). Urgent CT head, neurology and cardiothoracic input. Sedation hold to assess as soon as haemodynamically safe.",
                      },
                      {
                        c: "Temporary neurological dysfunction (delirium / agitation)",
                        cause: "Subclinical cerebral injury, opioid and benzodiazepine load, sleep disruption, sepsis, electrolytes, alcohol withdrawal.",
                        mgmt: "Treat reversible causes (pain, electrolytes, hypoxia, sepsis). Minimise benzodiazepines; dexmedetomidine infusion for agitation; haloperidol if needed. Re-orient frequently; restore sleep–wake cycle.",
                      },
                      {
                        c: "Post-op seizures",
                        cause: "Ischaemic injury, tranexamic acid (dose-related, especially >50 mg/kg), metabolic derangement, hyperthermia.",
                        mgmt: "Stop TXA. Levetiracetam first line; benzodiazepine for active seizure. Correct sodium, glucose, magnesium. EEG to exclude non-convulsive status. Review imaging.",
                      },
                      {
                        c: "Hyperthermia on rewarming",
                        cause: "Aggressive arterial-line rewarming, residual SIRS, infection, inflammatory response.",
                        mgmt: "Never warm arterial blood >37 °C and limit gradient to ≤10 °C. Active cooling (surface, intravascular) for any temperature ≥38 °C in first 48 h. Treat sepsis early.",
                      },
                      {
                        c: "Pulmonary dysfunction / prolonged ventilation",
                        cause: "CPB-related lung injury (SIRS, capillary leak), atelectasis, pleural effusion, phrenic nerve injury from cold, transfusion-related acute lung injury (TRALI).",
                        mgmt: "Lung-protective ventilation (VT 6 mL/kg, PEEP 8–10, plateau <30). Recruitment manoeuvres. Restrictive transfusion. Diuresis once haemodynamically stable. Early extubation when criteria met.",
                      },
                      {
                        c: "Splanchnic / hepatic dysfunction",
                        cause: "Low-flow CPB, vasoconstrictor exposure, hypothermic hepatic ischaemia, RV failure causing congestion.",
                        mgmt: "Maintain MAP and CO. Trend lactate, LFTs, INR. Enteral feed cautiously. Treat sepsis early; cover for translocation if persistent ileus and rising lactate.",
                      },
                      {
                        c: "Hyperglycaemia",
                        cause: "Stress response, steroids given as part of neuroprotection bundle, inflammation.",
                        mgmt: "Insulin infusion targeting 6–10 mmol/L (NICE-SUGAR — avoid tight control <6). Hourly BG monitoring; avoid hypoglycaemia which worsens neurological outcome.",
                      },
                      {
                        c: "Arrhythmia (AF / VT / heart block)",
                        cause: "Atrial cannulation trauma, electrolyte shifts (K⁺, Mg²⁺), reperfusion, ischaemia, conduction-system oedema.",
                        mgmt: "Correct K⁺ &gt;4.5, Mg²⁺ &gt;1.0 mmol/L. Use existing epicardial pacing wires for bradycardia/heart block. Amiodarone for AF/VT; DC cardioversion if unstable. Restart beta-blocker as soon as tolerated.",
                      },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/20">
                        <td className="p-3 font-semibold text-foreground">{row.c}</td>
                        <td className="p-3">{row.cause}</td>
                        <td className="p-3">{row.mgmt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground italic mt-2">
                Always work in parallel with the cardiac surgical team; many DHCA complications (bleeding, tamponade, low output) are corrected at the table or with mechanical support, not pharmacology alone.
              </p>
            </div>
          </div>
        </CollapsibleSubsection>

        {/* Cardiac arrest after cardiac surgery */}
        <CollapsibleSubsection title="Cardiac Arrest Following Cardiac Surgery">
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cardiac arrest in the first 24–72 hours after cardiac surgery is a uniquely manageable emergency: the patient is monitored, the team is on site, mechanical support and re-operation are immediately available, and the cause is usually one of a small list of surgically reversible problems (tamponade, bleeding, graft occlusion, severe arrhythmia, electrolyte derangement, pacing failure). Standard ALS — designed for the unwitnessed community arrest — is therefore <strong>modified</strong> by the EACTS/EACTA 2009 guideline (updated 2017), now adopted by the Resuscitation Council UK as the basis for cardiac advanced life support (CALS) in CICU.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Three principles drive every modification: (1) most arrests are witnessed and immediately shockable, so <strong>up to three stacked shocks come before chest compressions</strong>; (2) <strong>bolus adrenaline can be catastrophic</strong> after recent anastomoses, so it is withheld or titrated; and (3) <strong>emergency resternotomy within 5 minutes</strong> is the definitive intervention if the first-line steps fail. Every cardiac ICU keeps a sterile resternotomy set, a designated trained surgical responder, and pre-applied defibrillator pads at every bedside.
          </p>

          <CardiacArrestPostCardiacSurgeryDiagram />

          <ArrestTimeWindowWidget />

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Surgery-specific reversible causes</p>
              <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-1">
                <li><strong>Tamponade</strong> — bleeding into the pericardium; confirm on TOE; relieved by resternotomy</li>
                <li><strong>Major haemorrhage</strong> — surgical bleeder; volume + resternotomy</li>
                <li><strong>Graft occlusion / kink</strong> — ST changes, regional wall-motion abnormality</li>
                <li><strong>Tension pneumothorax</strong> — IMA harvest or chest-drain malfunction</li>
                <li><strong>Severe hyperkalaemia / acidosis</strong> — residual cardioplegia effect</li>
                <li><strong>Pacing failure</strong> — disconnected wire, depleted box, capture loss</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Team & equipment standards</p>
              <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-1">
                <li>Resternotomy trolley at every bed (sterile gown, scalpel, wire-cutters, sternal retractor, internal paddles)</li>
                <li>≥1 surgical responder available 24/7 within 5 min</li>
                <li>Defib pads pre-applied AP, pacing box checked at every handover</li>
                <li>Routine annual CALS simulation training for the whole CICU team</li>
                <li>Consider VA-ECMO / IABP / temporary VAD early if no ROSC</li>
              </ul>
            </div>
          </div>
        </CollapsibleSubsection>

        {/* ───────── Thoracic surgery ───────── */}
        <CollapsibleSubsection title="One-Lung Ventilation (OLV)">
          <p className="text-muted-foreground leading-relaxed mb-4">
            One-lung ventilation underpins almost all thoracic surgery — lobectomy, pneumonectomy, oesophagectomy, thymectomy, lung volume reduction, and most VATS procedures. The aims are to deflate the operative lung for surgical access while maintaining adequate gas exchange through the dependent lung. Successful OLV requires the right device, confirmed correct position, and a clear plan for hypoxia.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Devices for lung isolation</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Double-Lumen Tube (DLT)</p>
              <p className="text-sm text-muted-foreground mt-1">Left-sided DLT preferred (right upper lobe anatomy variable). Confirm position with fibreoptic bronchoscopy. Sizes: 35–41 Fr (women 35–37, men 39–41). Allows independent ventilation, suction and CPAP to either lung.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Bronchial Blocker</p>
              <p className="text-sm text-muted-foreground mt-1">Alternative to DLT — passed through a single-lumen ETT. Useful in difficult airway, existing tracheostomy, or for postoperative ventilation. Slower deflation, less reliable isolation, no independent suction.</p>
            </div>
          </div>

          <div className="mt-4">
            <DLTInsertionDiagram />
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mt-6 mb-2">Physiology & hypoxia management</h3>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Hypoxic pulmonary vasoconstriction (HPV)</strong> diverts blood from the collapsed (non-dependent) lung, limiting shunt to ~20–30%. HPV is inhibited by volatiles &gt;1 MAC, vasodilators (GTN, SNP), hypothermia, and acidosis. Stepwise management of desaturation during OLV: ↑FiO₂ → check tube position with fibreoptic bronchoscope → recruitment to dependent lung → PEEP 5 cmH₂O to dependent lung → CPAP 5–10 cmH₂O to non-dependent lung → intermittent reinflation → if persistent, ask surgeon to clamp PA of operative lung (during pneumonectomy).
          </p>

          <div className="mt-4">
            <OLVTroubleshootingDiagram />
          </div>
        </CollapsibleSubsection>

        {/* ───────── Post-operative analgesia ───────── */}
        <CollapsibleSubsection title="Post-Operative Analgesia">
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pain after cardiothoracic surgery is severe, somatic and visceral, and powerfully affects respiratory mechanics, sputum clearance, ambulation, and the development of chronic post-surgical pain (CPSP — up to 50% after thoracotomy, 30% after sternotomy). A <strong>multimodal, opioid-sparing</strong> approach is now standard, with regional techniques tailored to the procedure. ERAS-Cardiac (2019) and ERAS-Thoracic (2019) both place regional analgesia at the heart of recovery.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Principles for every patient</h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside mb-5">
            <li><strong>Multimodal baseline</strong>: regular paracetamol; NSAIDs only if no contraindication (bleeding, AKI, fresh anastomoses — caution in cardiac surgery, often avoided); gabapentinoid for thoracotomy where appropriate.</li>
            <li><strong>Opioid sparing</strong>: PCA morphine/fentanyl on top of regional block; avoid opioid-only regimens (respiratory depression, ileus, delirium, CPSP).</li>
            <li><strong>Regional technique</strong> chosen by the procedure (see table); single-shot for short procedures, catheter for major resections / sternotomy.</li>
            <li><strong>Adjuncts</strong>: dexmedetomidine, IV lidocaine, ketamine infusion — useful in opioid-tolerant patients and to reduce CPSP.</li>
            <li><strong>Neuraxial block and cardiopulmonary bypass</strong>: the concern is epidural or spinal haematoma in a patient who will receive heparin 300–400 units/kg to an ACT &gt;480 s, plus antiplatelet therapy and a post-bypass coagulopathy. Most UK centres therefore <strong>avoid thoracic epidurals for on-pump cardiac surgery</strong>. Where a neuraxial technique is used, the accepted precautions are: full coagulation screen and platelet count beforehand; withhold clopidogrel/ticagrelor/prasugrel and treatment-dose anticoagulants for the standard intervals (LMWH prophylactic dose ≥12 h, treatment dose ≥24 h); a single atraumatic attempt by an experienced operator, abandoning the block after a bloody tap and postponing surgery for 24 h; <strong>site the block ≥60 minutes before heparinisation</strong>; document a baseline neurological examination; remove catheters only when the ACT/APTT and platelet count have normalised and ≥12 h after LMWH, with the next dose ≥4 h later; and perform regular motor/sensory checks with a low threshold for urgent MRI and neurosurgical referral if back pain or block regression fails to progress as expected. Parasternal, pecto-intercostal and erector spinae plane blocks or wound catheters achieve much of the analgesic benefit without this risk and are the pragmatic default<InlineRef topicId="cardiothoracic" refLabel="ACTACC TOE Audit 2019" />.</li>
            <li><strong>Maintenance technique — TIVA</strong>: in the ACTACC national thoracic anaesthesia audit, total intravenous anaesthesia for lung resection was associated with roughly half the odds of unplanned postoperative critical care admission compared with volatile maintenance (OR 0.50), alongside paravertebral analgesia and lung-protective ventilation as markers of good practice. Propofol–remifentanil TIVA also preserves hypoxic pulmonary vasoconstriction better than &gt;1 MAC volatile and reduces PONV, so it is a reasonable default for one-lung ventilation cases<InlineRef topicId="cardiothoracic" refLabel="ACTACC TIVA 2019" />.</li>

          </ul>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Procedure-specific approach</h3>
          <div className="overflow-x-auto rounded-lg border border-border mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left p-3 font-semibold text-foreground border-b border-border">Procedure</th>
                  <th className="text-left p-3 font-semibold text-foreground border-b border-border">Pain pattern</th>
                  <th className="text-left p-3 font-semibold text-foreground border-b border-border">Preferred regional</th>
                  <th className="text-left p-3 font-semibold text-foreground border-b border-border">Multimodal & notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  {
                    proc: "Median sternotomy (CABG, AVR, MVR)",
                    pain: "Severe somatic sternal pain + bone, drains, internal mammary harvest pain",
                    regional: "Bilateral parasternal block (PECS/PIFB) or bilateral erector spinae plane (ESP) catheters; high-dose opioid PCA historically",
                    notes: "Avoid thoracic epidural with planned full heparinisation. NSAIDs contentious — many cardiac centres avoid in first 48 h. Paracetamol + opioid PCA + bilateral PIFB is now the ERAS-Cardiac default.",
                  },
                  {
                    proc: "Off-pump CABG (OPCAB)",
                    pain: "As sternotomy",
                    regional: "Bilateral PIFB / ESP block",
                    notes: "Lower bleeding risk than on-pump → more flexibility with NSAIDs and earlier mobilisation.",
                  },
                  {
                    proc: "Minimally invasive cardiac (mini-thoracotomy MVR, MIDCAB)",
                    pain: "Severe unilateral chest-wall + rib-spreader pain",
                    regional: "Serratus anterior plane block or ESP catheter on the operative side",
                    notes: "Catheter-based regional reduces opioid use and accelerates fast-track extubation.",
                  },
                  {
                    proc: "Open thoracotomy (lobectomy, oesophagectomy)",
                    pain: "Very severe — chest wall, intercostal nerve, drains, visceral pleural pain",
                    regional: "Thoracic epidural (gold standard) OR paravertebral catheter (PVB) — equivalent analgesia, fewer side-effects (PROSPECT 2015)",
                    notes: "Catheter for 48–72 h. PVB preferred if coagulopathy, hypotension or anticoagulation. Add gabapentinoid + ketamine to reduce CPSP.",
                  },
                  {
                    proc: "VATS lobectomy / wedge",
                    pain: "Moderate — port sites + chest drain",
                    regional: "Single-shot PVB, ESP block, or serratus anterior block at induction",
                    notes: "Cornerstone of ERAS-Thoracic — same-day mobilisation, often discharged 2–3 days. Avoid epidural (overkill, hypotension delays discharge).",
                  },
                  {
                    proc: "Pneumonectomy",
                    pain: "Severe — chest-wall + mediastinal stretch",
                    regional: "Thoracic epidural or paravertebral catheter",
                    notes: "Avoid fluid overload (pulmonary oedema in remaining lung). Epidural-induced hypotension treated with vasopressor, NOT volume.",
                  },
                  {
                    proc: "Oesophagectomy (Ivor-Lewis / McKeown)",
                    pain: "Severe — thoracotomy + laparotomy/laparoscopy + neck",
                    regional: "Thoracic epidural — covers both thoracic and upper-abdominal incisions; OR PVB + TAP block",
                    notes: "Epidural reduces respiratory complications and may improve anastomotic perfusion. Maintain MAP with vasopressor not fluid.",
                  },
                  {
                    proc: "Lung transplant",
                    pain: "Bilateral 'clamshell' or sequential thoracotomies — very severe",
                    regional: "Bilateral PVB catheters or thoracic epidural (timing depends on ECMO/anticoagulation plan)",
                    notes: "Multimodal essential for early extubation, cough and graft protection. Avoid NSAIDs (renal protection of graft and immunosuppression interactions).",
                  },
                  {
                    proc: "Thymectomy / mediastinal mass (sternotomy or VATS)",
                    pain: "Procedure-dependent",
                    regional: "PIFB / ESP for sternotomy; PVB or serratus for VATS",
                    notes: "Myasthenia gravis — minimise opioids; sensitive to residual NMB; avoid respiratory depression at all costs.",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 align-top hover:bg-accent/20">
                    <td className="p-3 font-medium text-foreground">{row.proc}</td>
                    <td className="p-3">{row.pain}</td>
                    <td className="p-3">{row.regional}</td>
                    <td className="p-3">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Thoracic epidural vs paravertebral block (PROSPECT)</p>
              <p className="text-sm text-muted-foreground mt-1">For thoracotomy, paravertebral block (single shot or catheter) provides <strong>equivalent analgesia</strong> with significantly less hypotension, urinary retention, nausea, and pulmonary complications. Both are recommended; PVB is the preferred technique where epidural is contraindicated or undesirable.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Chronic post-surgical pain (CPSP)</p>
              <p className="text-sm text-muted-foreground mt-1">Post-thoracotomy pain syndrome occurs in up to 50% at 1 year. Risk factors: severe acute pain, female sex, intercostal nerve damage, repeated surgery, psychological factors. Mitigation: regional block established <em>before</em> incision, multimodal analgesia, gabapentinoids, ketamine, IV lidocaine, and proactive pain-team follow-up.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Fascial-plane blocks — practical roles</p>
              <p className="text-sm text-muted-foreground mt-1"><strong>ESP</strong>: thoracic and abdominal — easy under US, low complication risk. <strong>Serratus anterior</strong>: lateral chest wall, ideal for VATS, drains. <strong>PIFB / parasternal</strong>: sternotomy. <strong>PECS I/II</strong>: anterior chest wall, breast surgery. All preferred where neuraxial is risky.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">ERAS-Cardiac & ERAS-Thoracic targets</p>
              <p className="text-sm text-muted-foreground mt-1">Multimodal opioid-sparing analgesia, early extubation (&lt;6 h), early mobilisation (POD 0–1), early oral intake, removal of catheters/drains as soon as possible, structured opioid weaning at discharge. Pain scores are a primary quality outcome.</p>
            </div>
          </div>
        </CollapsibleSubsection>
      </section>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Anticoagulation for CPB: heparin 300–400 IU/kg targeting ACT >480 s; reverse with protamine 1 mg per 100 IU heparin.",
              "One-lung ventilation: low Vt (4–6 mL/kg), PEEP to dependent lung, CPAP to non-dependent lung, FiO₂ titrated to oxygenation.",
              "Avoid N₂O in pneumothorax, bullae or after recent retinal/middle-ear surgery — it expands closed gas spaces.",
              "Post-CPB vasoplegia (low SVR despite adequate filling) — vasopressin and methylene blue are useful adjuncts.",
              "TOE basics: rule out tamponade, regional wall motion abnormality, valve dysfunction, retained air after cardiotomy.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Cardiothoracic Anaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Concise, evidence-based answers to the questions trainees and candidates most often ask about one-lung ventilation, DLT sizing, CPB physiology, DHCA conduct, pH-stat vs α-stat, cardiac arrest after surgery, and post-thoracotomy analgesia.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {cardiothoracicFaqs.map(([q, a], i) => (
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
            <title>Cardiothoracic Anaesthesia — CPB, OLV, DHCA &amp; CALS</title>
            <meta
              name="description"
              content="Cardiothoracic anaesthesia explained for FRCA and FFICM: cardiopulmonary bypass, one-lung ventilation and DLT management, deep hypothermic circulatory arrest, pH-stat vs α-stat, cardiac arrest after cardiac surgery (CALS), and post-thoracotomy analgesia."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: cardiothoracicFaqs.map(([name, acceptedAnswer]) => ({
                "@type": "Question",
                name,
                acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
              })),
            })}</script>
          </Helmet>
        </ExamSection>
      }
    />
  );
};

export default CardiothoracicTopic;
