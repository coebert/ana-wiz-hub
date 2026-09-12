import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { traumaEmergencyQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { InlineRef } from "@/components/references/InlineRef";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocItems = [
  { id: "introduction", label: "Introduction", group: "Overview" },
  { id: "rsi", label: "RSI in trauma", group: "Airway & Induction" },
  { id: "damage-control", label: "Damage control resuscitation", group: "Resuscitation" },
  { id: "mtp", label: "Massive transfusion protocol", group: "Resuscitation" },
  { id: "lethal-triad", label: "Lethal triad", group: "Resuscitation" },
  { id: "tbi", label: "Traumatic brain injury", group: "Special scenarios" },
  { id: "complications", label: "Complications of MHP", group: "Resuscitation" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

// SEO-targeted FAQ — answers the highest-volume UK trauma-anaesthesia
// question keywords (RSI in trauma, damage control, massive transfusion,
// permissive hypotension, TXA, TBI management).
// Rendered as accordion + FAQPage JSON-LD for rich-result eligibility.
const traumaFaqs: Array<[string, string]> = [
  [
    "What is rapid sequence induction (RSI) in trauma?",
    "RSI in trauma follows the same core principles as standard RSI — pre-oxygenation, rapid induction, cricoid pressure (controversial), and intubation without bag-mask ventilation — but with critical modifications for the injured patient: (1) resuscitate before you intubate where possible; (2) choose ketamine 0.5–2 mg/kg as the induction agent because it preserves sympathetic tone and cardiac output; (3) avoid propofol or thiopentone in hypovolaemic patients as they cause catastrophic vasodilation; (4) use rocuronium 1.2 mg/kg for rapid paralysis with sugammadex rescue available; (5) maintain manual in-line stabilisation with the collar front removed; (6) have vasopressors drawn up before laryngoscopy because intubation can precipitate arrest in the shocked patient.",
  ],
  [
    "What is damage control resuscitation?",
    "Damage control resuscitation (DCR) is a strategy for severe trauma that targets the 'lethal triad' of hypothermia, acidosis and coagulopathy. Its four pillars are: (1) permissive hypotension — allowing SBP 80–90 mmHg in bleeding trauma without TBI until surgical haemorrhage control, to reduce clot disruption; (2) haemostatic resuscitation — using 1:1:1 ratios of PRBC:FFP:platelets rather than crystalloid; (3) tranexamic acid 1 g IV within 3 hours of injury (CRASH-2); and (4) limiting crystalloid to prevent dilutional coagulopathy. Active warming and early surgical control of bleeding are simultaneous priorities.",
  ],
  [
    "When should a massive transfusion protocol (MTP) be activated?",
    "Activate the MTP when any of the following are met: anticipated need for ≥10 units PRBC in 24 hours, >4 units PRBC in 1 hour, haemodynamic instability despite initial fluid resuscitation, ongoing uncontrolled surgical bleeding, or a base deficit >6 mmol/L with tachycardia suggesting significant occult haemorrhage. The protocol delivers pre-thawed blood products in fixed 1:1:1 ratios (PRBC:FFP:platelets) via a rapid infuser, with point-of-care viscoelastic testing (TEG/ROTEM) to guide individual component therapy once available.",
  ],
  [
    "What are the complications of massive transfusion?",
    "The major complications are: (1) hypothermia — warmed fluids and forced-air warming are mandatory; (2) citrate toxicity — citrate in stored blood chelates ionised calcium, causing myocardial depression and coagulopathy; treat with 10 mL 10% calcium chloride IV when iCa²⁺ <0.9 mmol/L; (3) hyperkalaemia — from extracellular potassium in stored PRBC; treat with insulin/dextrose, salbutamol, and calcium; (4) dilutional coagulopathy and thrombocytopaenia; (5) TRALI (transfusion-related acute lung injury); (6) TACO (transfusion-associated circulatory overload); and (7) hypomagnesaemia. Monitor ABG including iCa²⁺, K⁺ and temperature every 30 minutes during active MTP.",
  ],
  [
    "What is permissive hypotension and when is it contraindicated?",
    "Permissive hypotension is the deliberate restriction of fluid resuscitation to maintain SBP 80–90 mmHg (or mean arterial pressure ~50–60 mmHg) in a bleeding trauma patient before definitive surgical haemorrhage control. The rationale is that restoring normal blood pressure in uncontrolled bleeding disrupts fragile clots and worsens haemorrhage. It is ABSOLUTELY CONTRAINDICATED in traumatic brain injury (TBI), where the injured brain has lost autoregulation and relies on adequate perfusion pressure — target SBP >110 mmHg or MAP ≥80 mmHg in TBI to maintain cerebral perfusion pressure and prevent secondary brain injury.",
  ],
  [
    "When should tranexamic acid (TXA) be given in trauma?",
    "Give TXA 1 g IV over 10 minutes as early as possible, followed by 1 g IV infusion over 8 hours. The CRASH-2 trial showed a mortality benefit when given within 3 hours of injury. There is no benefit — and possible harm — if given >3 hours after injury, so timing is critical. TXA inhibits fibrinolysis by blocking plasminogen activation and should be administered in all trauma patients with significant bleeding or at risk of significant haemorrhage unless there is a clear contraindication such as subarachnoid haemorrhage where antifibrinolytics may increase thrombotic complications.",
  ],
  [
    "How do you manage a traumatic brain injury (TBI) patient?",
    "TBI management follows the mantra 'avoid the secondary insults': (1) prevent hypoxia — target SpO₂ >94% with early definitive airway if GCS ≤8 or risk of aspiration; (2) prevent hypotension — maintain SBP >110 mmHg or MAP ≥80 mmHg at all times; (3) prevent hypercapnia and hypocapnia — target PaCO₂ 4.5–5.0 kPa (mild hypocapnia 4.0–4.5 kPa only if herniation suspected); (4) head-up 15–30° to reduce ICP; (5) osmotherapy with mannitol 0.25–1 g/kg or hypertonic saline 3% 250 mL for signs of raised ICP; (6) urgent CT imaging and neurosurgical consultation; (7) avoid hyperglycaemia and hyponatraemia; (8) seizure prophylaxis if indicated. Permissive hypotension is contraindicated in TBI.",
  ],
  [
    "What is the lethal triad in trauma?",
    "The lethal triad is the mutually reinforcing cycle of hypothermia, acidosis and coagulopathy that develops during severe trauma and massive haemorrhage. Hypothermia (core temp <35°C) slows enzyme kinetics and platelet function; acidosis (pH <7.2) impairs clotting factor activity and fibrinogen function; coagulopathy leads to ongoing bleeding which causes more hypothermia and acidosis. Breaking the triad requires active warming, blood product resuscitation (not crystalloid), calcium replacement, fibrinogen supplementation, and rapid surgical control of bleeding.",
  ],
  [
    "How do you choose an induction agent for a haemodynamically unstable trauma patient?",
    "Ketamine is the agent of choice in haemodynamically unstable trauma patients. At doses of 0.5–2 mg/kg IV, it preserves sympathetic tone, maintains cardiac output and blood pressure, provides analgesia, and is a bronchodilator — all valuable in the shocked polytrauma patient. Etomidate 0.3 mg/kg is an acceptable alternative and is often preferred in TBI because it reduces cerebral metabolic rate and ICP, though it can cause adrenal suppression. Propofol and thiopentone should be AVOIDED in hypovolaemic trauma patients because they cause profound vasodilation and myocardial depression, potentially causing cardiovascular collapse on induction.",
  ],
  [
    "What is the role of TEG/ROTEM in massive transfusion?",
    "Thromboelastography (TEG) and rotational thromboelastometry (ROTEM) are point-of-care viscoelastic coagulation tests that assess clot formation, stability and lysis in real time. In massive transfusion they enable goal-directed therapy: a flat r-time / CT suggests give FFP; low alpha-angle / low fibrinogen amplitude suggests give cryoprecipitate or fibrinogen concentrate; low maximum amplitude suggests give platelets; rapid lysis suggests give TXA. Using TEG/ROTEM reduces unnecessary blood product administration, identifies fibrinolysis, and allows individualised component therapy rather than blind fixed-ratio resuscitation alone.",
  ],
];

const objectives = [
  "Perform an RSI tailored to the trauma patient (haemodynamic state, c-spine, full stomach)",
  "Apply the principles of damage-control resuscitation to a haemorrhaging patient",
  "Activate and run a major haemorrhage / massive transfusion protocol with appropriate ratios",
  "Recognise and treat the lethal triad of hypothermia, acidosis and coagulopathy",
  "Identify complications of massive transfusion (hyperkalaemia, hypocalcaemia, TRALI, TACO)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Choosing an induction agent for unstable polytrauma",
    scenario:
      "A 25-year-old motorcyclist arrives with HR 130, SBP 80 mmHg, GCS 9, suspected splenic rupture and a likely C-spine injury. Theatre is ready. Plan the RSI.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step RSI plan</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Resuscitate before you intubate.</strong> Activate MHP, give 1 g TXA IV (CRASH-2 window: within 3 h), start 1:1:1 product through a rapid infuser.</li>
          <li><strong>Pre-oxygenate while preparing.</strong> 3 min tidal-volume O₂ at 15 L/min; head-up 20° if BP allows; apnoeic oxygenation via nasal cannula 15 L/min.</li>
          <li><strong>Choose induction agent.</strong> Ketamine <strong>1–2 mg/kg IV</strong> (preserves SVR, bronchodilator). Reduce to 0.5–1 mg/kg if obtunded. Avoid propofol/thiopentone — drop SVR catastrophically in shock.</li>
          <li><strong>Choose neuromuscular blocker.</strong> Rocuronium <strong>1.2 mg/kg</strong> (rapid, no IOP/ICP rise, sugammadex 16 mg/kg available for failed intubation).</li>
          <li><strong>Manage the C-spine.</strong> Manual in-line stabilisation with the front of the collar removed. Cricoid pressure remains controversial — release if it impairs the laryngoscopy view.</li>
          <li><strong>Plan A → B → C.</strong> Videolaryngoscope first attempt; second-generation SAD ready; FONA kit open on the trolley.</li>
          <li><strong>Vasopressor on the syringe.</strong> Push-dose metaraminol 0.5 mg or noradrenaline infusion ready to run before laryngoscopy.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points</p>
        <ul className="list-disc list-inside space-y-1">
          <li>If isolated TBI: keep MAP ≥ 80 mmHg (CPP) — permissive hypotension does NOT apply.</li>
          <li>If suxamethonium chosen: avoid in crush injury &gt; 24 h, burns &gt; 24 h, spinal cord injury &gt; 72 h (hyperkalaemia).</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Standard induction doses in a shocked patient → cardiovascular arrest on induction.</li>
            <li>Forgetting to give TXA in the first 3 hours (mortality benefit is time-dependent — harm if given &gt; 3 h).</li>
            <li>Excessive crystalloid before product → dilutional coagulopathy and worsened bleeding.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Ketamine + rocuronium RSI with manual in-line stabilisation, videolaryngoscope, and vasopressor on the syringe. Run damage-control resuscitation in parallel: 1:1:1 products, TXA within 3 h, permissive hypotension (SBP target 80–90 mmHg, except in TBI where MAP ≥ 80). Anticipate haemodynamic collapse on induction.",
    cites: ["CRASH-2 2010"],
  },
  {
    title: "Citrate toxicity during massive transfusion",
    scenario:
      "Mid-laparotomy a patient has received 10 units of PRBC, 8 units of FFP and 2 pools of platelets. ABG: pH 7.18, ionised Ca²⁺ 0.78 mmol/L, K⁺ 5.9 mmol/L, lactate 8. The arterial line trace shows pulsus alternans. What's happening and what do you do?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step interpretation</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Recognise the pattern.</strong> Massive transfusion + ↓ iCa²⁺ (&lt; 0.9) + ↑ K⁺ + acidosis + impaired contractility = <strong>citrate toxicity</strong>.</li>
          <li><strong>Mechanism.</strong> Stored blood contains citrate (anticoagulant). Citrate chelates ionised Ca²⁺. Hepatic hypoperfusion in shock prevents normal citrate metabolism → it accumulates.</li>
          <li><strong>Treat ↓ iCa²⁺ now.</strong> 10 mL of 10% calcium chloride IV (= 6.8 mmol Ca²⁺) OR 30 mL of 10% calcium gluconate (= 6.6 mmol Ca²⁺). CaCl₂ delivers 3× more elemental calcium per mL but is more vesicant — central line preferred.</li>
          <li><strong>Treat hyperkalaemia.</strong> 10 units soluble insulin in 100 mL 20% dextrose ± 5 mg salbutamol nebuliser; the calcium just given also stabilises the myocardium.</li>
          <li><strong>Address the lethal triad.</strong> Active warming (Bair Hugger + warmed fluids); correct acidosis by restoring perfusion (not bicarbonate); ROTEM/TEG to guide further FFP/cryo/platelets.</li>
          <li><strong>Repeat ABG every 30 min</strong> during ongoing MHP — iCa²⁺ &gt; 1.0, K⁺ &lt; 5.5, pH &gt; 7.25, temp &gt; 36 °C.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Cryoprecipitate if fibrinogen &lt; 1.5 g/L (or ROTEM FIBTEM A5 &lt; 10 mm).</li>
          <li>Stop platelets if count &gt; 100 unless ongoing surgical bleeding.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Reading the <em>total</em> calcium instead of <em>ionised</em> — only iCa²⁺ matters during transfusion.</li>
            <li>Giving CaCl₂ peripherally → tissue necrosis if extravasates.</li>
            <li>Reaching for bicarbonate to 'correct' the acidosis — worsens iCa²⁺ and shifts O₂ dissociation curve left.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Treat citrate toxicity: 10% calcium chloride 10 mL IV (or calcium gluconate 30 mL). Continue active warming, ROTEM/TEG-guided product replacement, and treat the hyperkalaemia. Send repeat iCa²⁺ every 30 min during ongoing transfusion — citrate is the silent killer in MHP scenarios.",
    cites: ["ATLS 10th ed"],
  },
];

const TraumaEmergencyTopic = () => {
  return (
    <TopicTemplate
      title="Trauma & Emergency Anaesthesia"
      subtitle="RSI, damage-control resuscitation, and major haemorrhage management"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="trauma-emergency"
      topicTitle="Trauma & Emergency Anaesthesia"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={traumaEmergencyQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Final — Trauma & Stabilisation", "FFICM 2.5"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "ATLS 10th ed",
          "ATLS 10th ed",
          "ATLS 10th ed",
        ],
        workedExamples: [
          "CRASH-2 2010",
          "BJA Educ 2016",
          "BJA Educ 2016",
          "BJA Educ 2016",
          "ATLS 10th ed",
        ],
        keyPoints: [
          "BJA Educ 2016",
          "BJA Educ 2016",
          "BJA Educ 2016",
          "CRASH-2 2010",
          "ATLS 10th ed",
        ],
      }}
      keyPoints={[
        { text: "RSI: pre-oxygenation, rapid induction, no ventilation (unless desaturation), rapid intubation", cites: ["BJA Educ 2016"] },
        { text: "Damage control: permissive hypotension (except TBI), 1:1:1 ratio, TXA within 3 hours", cites: ["CRASH-2 2010"] },
        { text: "The lethal triad: hypothermia, acidosis, coagulopathy — prevent all three", cites: ["ATLS 10th ed"] },
        { text: "Ketamine is the induction agent of choice in haemodynamically unstable patients", cites: ["BJA Educ 2016"] },
        { text: "TEG/ROTEM enables goal-directed transfusion and reduces blood product use", cites: ["CRASH-2 2010"] },
        { text: "Citrate toxicity (↓ iCa²⁺) and hyperkalaemia are the commonest metabolic complications of MHP", cites: ["ATLS 10th ed"] },
      ]}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />

          <ExamSection id="introduction" exams={[Exam.FINAL, Exam.FFICM]}>
            <p className="text-muted-foreground leading-relaxed">
              Trauma is a leading cause of death in young adults. Anaesthetists play a key role in airway management, resuscitation,
              and perioperative care. The ATLS &lt;C&gt;ABCDE approach, damage control resuscitation, and massive transfusion protocols
              are fundamental.<InlineRef topicId="trauma-emergency" refLabel="ATLS 10th ed" />
            </p>
          </ExamSection>

          <ExamSection id="rsi" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Trauma & Stabilisation"]}>
            <CollapsibleSubsection title="Rapid Sequence Induction (RSI)" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              RSI is indicated when the patient is at risk of aspiration (full stomach, bowel obstruction, pregnancy, trauma).
              Key principles:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Pre-oxygenation", value: "3 min tidal breathing or 8 vital capacity breaths with 100% O₂" },
                { label: "Cricoid pressure", value: "30N applied by trained assistant (controversial — may impair laryngoscopy)" },
                { label: "Induction", value: "Ketamine 1-2 mg/kg (haemodynamically unstable) or propofol (if stable)" },
                { label: "Muscle relaxant", value: "Suxamethonium 1-1.5 mg/kg or rocuronium 1.2 mg/kg" },
                { label: "No bag-mask ventilation", value: "Between induction and intubation (unless SpO₂ falls)" },
                { label: "Plan B ready", value: "2nd-gen SAD and FONA equipment immediately available" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="damage-control" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.5"]}>
            <CollapsibleSubsection title="Damage Control Resuscitation">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Targets the lethal triad of hypothermia, acidosis, and coagulopathy:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Permissive hypotension</strong>: target SBP 80-90 mmHg (except TBI) until surgical haemorrhage control</li>
              <li><strong>Haemostatic resuscitation</strong>: 1:1:1 ratio (PRBC : FFP : platelets)</li>
              <li><strong>Tranexamic acid</strong>: 1g IV within 3 hours of injury (CRASH-2)<InlineRef topicId="trauma-emergency" refLabel="CRASH-2 2010" /></li>
              <li><strong>Limit crystalloid</strong>: avoid haemodilution and worsening coagulopathy</li>
              <li><strong>Warm fluids/patient</strong>: active warming to prevent hypothermia</li>
              <li><strong>Point-of-care testing</strong>: TEG/ROTEM to guide targeted blood product therapy</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="mtp" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Massive Transfusion Protocol">
            <p className="text-muted-foreground leading-relaxed">
              Activated when anticipated need for ≥10 units PRBC in 24h or &gt;4 units in 1 hour. Trigger: uncontrolled haemorrhage,
              haemodynamic instability despite fluids, or anticipated major blood loss. Emergency O-negative blood should be available
              within minutes. Monitor for complications: hyperkalaemia, hypocalcaemia (citrate toxicity), hypothermia, TRALI, TACO.<InlineRef topicId="trauma-emergency" refLabel="BJA Educ 2016" />
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="lethal-triad" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="The Lethal Triad">
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              {[
                { label: "Hypothermia", value: "Core temp <35°C → impaired clotting, platelet dysfunction. Active warming essential." },
                { label: "Acidosis", value: "pH <7.2 → reduced clotting factor activity, fibrinogen dysfunction. Correct by restoring perfusion." },
                { label: "Coagulopathy", value: "Dilutional + consumptive. Treat with 1:1:1 products, fibrinogen, platelets, calcium." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="tbi" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Traumatic Brain Injury">
            <p className="text-muted-foreground leading-relaxed mb-3">
              TBI requires a fundamentally different approach — permissive hypotension is contraindicated. Target SBP &gt;110 mmHg and SpO₂ &gt;94% at all times to prevent secondary brain injury.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Airway</strong>: early intubation if GCS ≤8 or risk of aspiration</li>
              <li><strong>Targets</strong>: PaCO₂ 4.5–5.0 kPa; mild hypocapnia (4.0–4.5 kPa) only if herniation suspected</li>
              <li><strong>Osmotherapy</strong>: mannitol 0.25–1 g/kg or 3% hypertonic saline 250 mL for raised ICP</li>
              <li><strong>Position</strong>: head-up 15–30° to aid venous drainage</li>
              <li><strong>Avoid</strong>: hypoglycaemia, hyperglycaemia, hyponatraemia</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="complications" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Complications of Massive Transfusion">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Citrate toxicity", value: "↓ iCa²⁺ → myocardial depression, coagulopathy. Treat with CaCl₂ 10% 10 mL IV." },
                { label: "Hyperkalaemia", value: "Stored PRBC releases K⁺. Treat with insulin/dextrose, salbutamol, calcium." },
                { label: "Hypothermia", value: "Warmed fluids, Bair Hugger, rapid infuser. Target >36°C." },
                { label: "TRALI", value: "Non-cardiogenic pulmonary oedema within 6h of transfusion. Supportive care." },
                { label: "TACO", value: "Fluid overload from rapid volume. Diuretics, fluid restriction." },
                { label: "Dilutional coagulopathy", value: "Monitor fibrinogen >1.5 g/L, platelets >50, INR <1.5." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Damage-control resuscitation: permissive hypotension (SBP ~80–90 mmHg until haemorrhage controlled, except in TBI), 1:1:1 blood products, tranexamic acid within 3 h.",
              "ATLS A-B-C-D-E with simultaneous resuscitation; reassess after every intervention.",
              "Massive transfusion protocol: activate early — fixed-ratio products, calcium replacement, fibrinogen >2 g/L, avoid hypothermia and acidosis.",
              "Traumatic brain injury: avoid hypoxia, hypotension and hypercapnia; target SBP >110 mmHg, SpO₂ >94%, PaCO₂ 4.5–5.0 kPa.",
              "Tension pneumothorax is a clinical diagnosis — decompress before imaging.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Trauma & Emergency Anaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Concise, evidence-based answers to the questions trainees and candidates most often ask about trauma RSI, damage control resuscitation, massive transfusion, TXA timing, TBI management, and the lethal triad.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {traumaFaqs.map(([q, a], i) => (
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
            <title>Trauma & Emergency Anaesthesia — RSI, Damage Control &amp; MTP</title>
            <meta
              name="description"
              content="Trauma anaesthesia explained for FRCA and FFICM: RSI in the shocked patient, damage control resuscitation, massive transfusion protocol, TXA timing, permissive hypotension, TBI management, citrate toxicity, and the lethal triad."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: traumaFaqs.map(([name, acceptedAnswer]) => ({
                "@type": "Question",
                name,
                acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
              })),
            })}</script>
          </Helmet>
        </>
      }
    />
  );
};

export default TraumaEmergencyTopic;
