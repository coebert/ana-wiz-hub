import { Link } from "react-router-dom";
import { TraumaAtlas } from "@/components/topic/TraumaAtlas";
import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { traumaEmergencyQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { TraumaABCDETeaching, TraumaFluidBolusTeaching, TraumaTransfusionTeaching, TraumaSurgicalPriorityTeaching } from "@/components/topic/TraumaPrimarySurveyTeaching";
import { HaemostaticTrialsTeaching } from "@/components/topic/HaemostaticTrialsTeaching";
import { InlineRef } from "@/components/references/InlineRef";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocItems = [
  { id: "introduction", label: "Introduction", group: "Overview" },
  { id: "abcde", label: "<C>ABCDE primary survey", group: "Overview" },
  { id: "rsi", label: "RSI in trauma", group: "Airway & Induction" },
  { id: "spinal-immobilisation", label: "Spinal immobilisation", group: "Airway & Induction" },
  { id: "damage-control", label: "Damage control resuscitation", group: "Resuscitation" },
  { id: "fluid-resuscitation", label: "Fluid resuscitation", group: "Resuscitation" },
  { id: "haemorrhage-control", label: "Haemorrhage control", group: "Resuscitation" },
  { id: "mtp", label: "Massive transfusion protocol", group: "Resuscitation" },
  { id: "fluid-boluses", label: "Fluid boluses and targets", group: "Resuscitation" },
  { id: "transfusion-thresholds", label: "Transfusion ratios and thresholds", group: "Resuscitation" },
  { id: "surgical-priorities", label: "Surgical priorities", group: "Resuscitation" },
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
    "Preoxygenate, prepare suction and rescue airway equipment, and resuscitate haemorrhagic shock alongside airway management. Choose the induction agent and dose for the patient’s physiology, with blood and vasopressor support available. Ketamine can still cause hypotension. Maintain oxygenation, including gentle low-pressure facemask ventilation when required. If intubation fails, progress through the DAS rescue oxygenation plans. Once CICO is declared, proceed immediately to emergency front-of-neck airway.",
  ],
  [
    "What is damage control resuscitation?",
    "Control bleeding promptly, prevent heat loss, limit crystalloid and give tranexamic acid when indicated. In actively bleeding adults, start the local major haemorrhage protocol with plasma and red cells at 1:1, then use laboratory results and the local viscoelastic algorithm to guide further components. Until bleeding is controlled, the European guideline recommends SBP 80–90 mmHg if there is no clinical evidence of brain injury.",
  ],
  [
    "When should a massive transfusion protocol (MTP) be activated?",
    "Activate the local major haemorrhage protocol promptly for suspected major bleeding, using haemodynamic status, response to resuscitation and expected ongoing blood loss. NICE NG39 starts plasma and red cells at 1:1 in adults with active bleeding. Give platelets under the local protocol and move to laboratory-guided replacement as early as possible.",
  ],
  [
    "What are the complications of massive transfusion?",
    "The major complications are: (1) hypothermia — warmed fluids and forced-air warming are mandatory; (2) citrate toxicity — citrate in stored blood chelates ionised calcium, causing myocardial depression and coagulopathy; treat with 10 mL 10% calcium chloride IV when iCa²⁺ <0.9 mmol/L; (3) hyperkalaemia — from extracellular potassium in stored PRBC; treat with insulin/dextrose, salbutamol, and calcium; (4) dilutional coagulopathy and thrombocytopaenia; (5) TRALI (transfusion-related acute lung injury); (6) TACO (transfusion-associated circulatory overload); and (7) hypomagnesaemia. Monitor ABG including iCa²⁺, K⁺ and temperature every 30 minutes during active MTP.",
  ],
  [
    "What is permissive hypotension and when is it contraindicated?",
    "Restrict volume replacement until bleeding is controlled. Without clinical evidence of brain injury, the European trauma guideline recommends an initial SBP of 80–90 mmHg. If haemorrhagic shock and TBI coexist, NICE NG39 recommends continuing a restrictive approach when haemorrhage dominates and a less restrictive approach to preserve cerebral perfusion when brain injury dominates. The European MAP target of at least 80 mmHg applies to severe TBI (GCS ≤8).",
  ],
  [
    "When should tranexamic acid (TXA) be given in trauma?",
    "For adult major trauma with active or suspected active bleeding, give TXA promptly, normally within 3 hours of injury: 1 g IV over 10 minutes then 1 g over 8 hours. NICE NG39 allows use after 3 hours only with evidence of hyperfibrinolysis. For head injury with GCS ≤12 and no suspected active extracranial bleeding, NICE NG232 advises considering a 2 g IV bolus in people aged 16 or over within 2 hours of injury, before imaging. CRASH-3 did not establish an overall reduction in head-injury death among patients treated within 3 hours (RR 0.94, 95% CI 0.86–1.02); the estimate favoured TXA in mild-to-moderate injury.",
  ],
  [
    "How do you manage a traumatic brain injury (TBI) patient?",
    "TBI management follows the mantra 'avoid the secondary insults': (1) prevent hypoxia — target SpO₂ >94% with early definitive airway if GCS ≤8 or risk of aspiration; (2) avoid hypotension and set a target appropriate to the severity of brain injury and the presence of haemorrhagic shock; (3) prevent hypercapnia and hypocapnia — initially target PaCO₂ 35–45 mmHg (4.7–6.0 kPa) when intracranial pressure is not elevated. Temporary controlled hyperventilation may bridge impending herniation to definitive treatment; (4) head-up 15–30° to reduce ICP; (5) if intracranial hypertension or herniation is suspected, use hyperosmolar therapy under the neurotrauma protocol, accounting for haemodynamics, sodium and renal function; (6) urgent CT imaging and neurosurgical consultation; (7) avoid hyperglycaemia and hyponatraemia; (8) seizure prophylaxis if indicated. In severe TBI, Brain Trauma Foundation systolic thresholds depend on age. In combined TBI and haemorrhagic shock, NICE NG39 bases fluid restriction on the dominant condition.",
  ],
  [
    "What is the lethal triad in trauma?",
    "The lethal triad is the mutually reinforcing cycle of hypothermia, acidosis and coagulopathy that develops during severe trauma and massive haemorrhage. Hypothermia (core temp <35°C) slows enzyme kinetics and platelet function; acidosis (pH <7.2) impairs clotting factor activity and fibrinogen function; coagulopathy leads to ongoing bleeding which causes more hypothermia and acidosis. Breaking the triad requires active warming, blood product resuscitation (not crystalloid), calcium replacement, fibrinogen supplementation, and rapid surgical control of bleeding.",
  ],
  [
    "How do you choose an induction agent for a haemodynamically unstable trauma patient?",
    "Ketamine or etomidate can be used for emergency induction. Adjust the dose to consciousness, shock severity and preceding resuscitation. Both can be followed by cardiovascular collapse. Treat haemorrhage and prepare haemodynamic support before induction where time permits.",
  ],
  [
    "What is the role of TEG/ROTEM in massive transfusion?",
    "Viscoelastic testing can guide haemostatic treatment during major bleeding within a locally validated algorithm. TEG reports reaction time (R) and ROTEM reports clotting time (CT). Consider anticoagulant effects and factor deficiency if initiation is delayed. Interpret clot strength alongside fibrin-specific tests, platelet count, conventional laboratory results and the clinical bleeding. A single prolonged clotting time cannot determine a plasma prescription.",
  ],
  [
    "When is spinal immobilisation needed in trauma?",
    "NICE NG41 (Spinal injury: assessment and initial management) uses the Canadian C-spine rule — high-risk factors (age ≥65, dangerous mechanism, limb paraesthesia), absence of low-risk features, or inability to rotate the neck 45° each way — to select patients for full in-line immobilisation, with a separate assessment for thoracic/lumbar injury. Modern practice has moved away from routine triple immobilisation (rigid collar, blocks, tape) for everyone: hard collars are associated with pressure ulcers, raised intracranial pressure and harder airway access, and no randomised trial shows immobilisation improves neurological outcome. Current UK practice favours selective immobilisation — a properly fitted collar for high-risk patients, manual in-line stabilisation during airway interventions, scoop stretchers rather than log rolls where possible, and early removal of the collar once the spine is cleared or the airway is secured. Observational data suggest isolated penetrating trauma without neurological deficit gains little from immobilisation — follow local protocol.",
  ],
  [
    "What fluid should be used for resuscitation in major trauma?",
    "During active bleeding in hospital, NICE NG39 recommends blood components and advises against crystalloids. Use one plasma unit per red-cell unit initially in adults. Pre-hospital, when blood components are unavailable, titrate crystalloid to a palpable central pulse. If TBI coexists, balance restriction for bleeding against the need to maintain cerebral perfusion according to which injury dominates.",
  ],
  [
    "How is haemorrhage controlled in major trauma?",
    "Follow a stepwise approach: (1) direct pressure on external bleeding; (2) a tourniquet for life-threatening open limb bleeding — applied early, time recorded, and converted or moved closer to the wound within 2 hours where possible; (3) haemostatic or plain gauze wound packing for junctional wounds (groin, axilla, neck) where a tourniquet cannot go; (4) a pelvic binder applied at the greater trochanters for suspected unstable pelvic fracture — it reduces pelvic volume and tamponades venous bleeding; (5) rapid transfer to definitive care. In hospital, options include interventional radiology embolisation, damage control surgery (packing, shunting, clamping), and REBOA (resuscitative endovascular balloon occlusion of the aorta) for torso haemorrhage below the diaphragm — though the UK-REBOA trial found higher 90-day mortality with ED REBOA (54% vs 42%; 86% probability of harm), so it is not supported outside research in UK practice.",
  ],
];

const objectives = [
  "Perform an RSI tailored to the trauma patient (haemodynamic state, c-spine, full stomach)",
  "Apply spinal immobilisation safely, including manual in-line stabilisation during intubation",
  "Apply the principles of damage-control resuscitation to a haemorrhaging patient",
  "Choose appropriate fluid resuscitation — blood products first, minimal crystalloid",
  "Control external and junctional haemorrhage (tourniquets, pelvic binders, REBOA) and escalate to damage control surgery",
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
          <li><strong>Resuscitate before you intubate.</strong> Activate MHP, give 1 g TXA IV (CRASH-2 window: within 3 h), start warmed plasma and red cells at 1:1 under the adult major haemorrhage protocol.</li>
          <li><strong>Pre-oxygenate while preparing.</strong> 3 min tidal-volume O₂ at 15 L/min; head-up 20° if BP allows; apnoeic oxygenation via nasal cannula 15 L/min.</li>
          <li><strong>Choose induction agent.</strong> Select ketamine or etomidate according to physiology. Reduce the dose in profound shock and prepare blood and vasopressor support. Neither drug guarantees a stable circulation.</li>
          <li><strong>Choose neuromuscular blocker.</strong> Rocuronium 1.2 mg/kg is an adult RSI option. If intubation fails, prioritise rescue oxygenation. In CICO, proceed immediately to emergency front-of-neck airway with adequate paralysis.</li>
          <li><strong>Manage the C-spine.</strong> Manual in-line stabilisation with the front of the collar removed. Cricoid pressure remains controversial — release if it impairs the laryngoscopy view.</li>
          <li><strong>Plan A → B → C.</strong> Videolaryngoscope first attempt; second-generation SAD ready; FONA kit open on the trolley.</li>
          <li><strong>Vasopressor on the syringe.</strong> Push-dose metaraminol 0.5 mg or noradrenaline infusion ready to run before laryngoscopy.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points</p>
        <ul className="list-disc list-inside space-y-1">
          <li>In severe TBI (GCS ≤8), the European trauma guideline recommends MAP ≥80 mmHg. With haemorrhagic shock and TBI, use the dominant condition to guide volume replacement.</li>
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
      "Ketamine + rocuronium RSI with manual in-line stabilisation, videolaryngoscope, and vasopressor on the syringe. Run damage-control resuscitation in parallel: plasma and red cells at 1:1 initially, TXA within 3 h, and a perfusion strategy guided by haemorrhage and brain injury. Anticipate haemodynamic collapse on induction.",
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
          <li><strong>Treat hyperkalaemia.</strong> 10 units soluble insulin with 25 g glucose (125 mL 20%, 50 mL 50%, or 250 mL 10%) per local protocol; nebulised salbutamol 10–20 mg as an adjunct. The calcium also stabilises the myocardium. Check glucose at baseline, 30, 60, 90, 120, 180, 240, 300 and 360 minutes; extend if high risk/repeated dosing. Pretreatment glucose &lt;7 mmol/L: follow with 10% glucose 50 mL/h for 5 h. <InlineRef topicId="trauma-emergency" refLabel="UKKA Hyperkalaemia July 2026" /></li>
          <li><strong>Address the lethal triad.</strong> Active warming (Bair Hugger + warmed fluids); correct acidosis by restoring perfusion (not bicarbonate); ROTEM/TEG to guide further FFP/cryo/platelets.</li>
          <li><strong>Repeat ABG every 30 min</strong> during ongoing MHP — aim for normal ionised calcium (usually 1.1–1.3 mmol/L), K⁺ &lt; 5.5, pH &gt; 7.25, temp &gt; 36 °C.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Fibrinogen replacement (cryoprecipitate or concentrate) if Clauss fibrinogen ≤ 1.5 g/L or viscoelastic testing shows a functional fibrinogen deficit.</li>
          <li>Guide further platelets by bleeding, platelet count, injury site and the major haemorrhage protocol.</li>
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
        { text: "Start adult trauma plasma and red cells at 1:1. With TBI and haemorrhagic shock, the dominant condition guides volume replacement. Give TXA promptly when indicated.", cites: ["NG39 1:1", "NG39 TBI and shock", "CRASH-2 2010"] },
        { text: "The lethal triad: hypothermia, acidosis, coagulopathy — prevent all three", cites: ["ATLS 10th ed"] },
        { text: "Tailor induction to the severity of shock and prepare for cardiovascular collapse with either ketamine or etomidate.", cites: ["Ketamine or etomidate 2025"] },
        { text: "Use conventional or viscoelastic tests to guide further haemostatic treatment during major bleeding.", cites: ["European Trauma Bleeding Guideline 2023"] },
        { text: "Citrate toxicity (↓ iCa²⁺) and hyperkalaemia are the commonest metabolic complications of MHP", cites: ["ATLS 10th ed"] },
      ]}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />
          <TraumaAtlas />

          <ExamSection id="introduction" exams={[Exam.FINAL, Exam.FFICM]}>
            <p className="text-muted-foreground leading-relaxed">
              Trauma is a leading cause of death in young adults. Anaesthetists play a key role in airway management, resuscitation,
              and perioperative care. The ATLS &lt;C&gt;ABCDE approach, damage control resuscitation, and massive transfusion protocols
              are fundamental.<InlineRef topicId="trauma-emergency" refLabel="ATLS 10th ed" />
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">For shock index, cuff versus arterial blood pressure in shock, prehospital blood trials and tranexamic acid timing, see <Link to="/intensive-care/haemorrhagic-shock" className="text-primary font-semibold underline underline-offset-4">Haemorrhagic Shock &amp; Resuscitation</Link>.</p>
          </ExamSection>

          <ExamSection id="abcde" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="&lt;C&gt;ABCDE Primary Survey">
              <TraumaABCDETeaching />
            </CollapsibleSubsection>
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
                { label: "Induction", value: "Choose and titrate the induction agent to physiology; prepare haemodynamic support" },
                { label: "Muscle relaxant", value: "Suxamethonium 1-1.5 mg/kg or rocuronium 1.2 mg/kg" },
                { label: "Maintain oxygenation", value: "Use gentle low-pressure facemask ventilation when required during RSI" },
                { label: "Plan B ready", value: "2nd-gen SAD and FONA equipment immediately available" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mt-5 mb-2">Etomidate in trauma induction</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              <strong className="text-foreground">Mechanism:</strong> etomidate is a carboxylated imidazole that acts as a positive allosteric modulator at the GABA<sub>A</sub>
              receptor, increasing chloride conductance and hyperpolarising neurones. It is presented as a lipid emulsion or in propylene glycol, is highly protein bound and is
              rapidly hydrolysed by hepatic and plasma esterases, giving a rapid onset (one arm–brain circulation) and a short duration of 4–8 minutes after a single dose.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              <strong className="text-foreground">Dose:</strong> 0.2–0.3 mg/kg IV for induction, reduced towards 0.15 mg/kg in the shocked or elderly patient.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Advantages</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-1">
                  <li>Etomidate generally causes less cardiovascular depression than several alternatives. Severe hypovolaemia and positive-pressure ventilation can still precipitate cardiovascular collapse.</li>
                  <li>Reduces cerebral metabolic rate, cerebral blood flow and ICP ; the effect on CPP also depends on maintaining systemic blood pressure or thiopentone.</li>
                  <li>Rapid, predictable onset and offset with a wide therapeutic index; no histamine release and bronchospasm is uncommon.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Disadvantages</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-1">
                  <li><strong>Adrenocortical suppression</strong> — dose-dependent inhibition of 11β-hydroxylase for up to 24–72 hours after a single dose; associated with impaired cortisol response after induction. Clinical outcomes depend on the patient and indication. This is the reason it has largely been abandoned for ICU sedation and is avoided in septic shock <InlineRef topicId="trauma-emergency" refLabel="Cuthbertson 2009 (Etomidate)" />.</li>
                  <li>Myoclonus and involuntary movements (may be mistaken for seizures), pain on injection and thrombophlebitis, and a high incidence of postoperative nausea and vomiting.</li>
                  <li>No analgesic properties; propylene glycol formulations risk osmolar load and haemolysis with repeated dosing.</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-2">
              <strong className="text-foreground">Practical position in trauma:</strong> choose ketamine or etomidate according to physiology, adjust the induction dose in shock and prepare haemodynamic support. Cardiovascular collapse can follow either agent. The comparative trial in critically ill adults was not a trauma-specific trial.<InlineRef topicId="trauma-emergency" refLabel="Ketamine or etomidate 2025" />
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="spinal-immobilisation" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Trauma & Stabilisation"]}>
            <CollapsibleSubsection title="Spinal Immobilisation" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Cervical spine injury affects only a small minority of major trauma patients, but missed or worsened cord injury is devastating —
              and routine immobilisation of every patient causes its own harm. NICE NG41 (Spinal injury: assessment and initial management)
              uses the Canadian C-spine rule to decide who needs full in-line immobilisation: any high-risk factor (age ≥65, dangerous
              mechanism, paraesthesia in the limbs), no low-risk feature allowing safe assessment, or inability to actively rotate the neck
              45° left and right. Patients with reduced consciousness, a strong suspicion of injury or a neurological deficit are
              immobilised; thoracic/lumbar immobilisation follows a separate assessment of pain, mechanism and neurology.<InlineRef topicId="trauma-emergency" refLabel="NICE NG41" />
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Current practice</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-1">
                  <li><strong>Selective, not routine:</strong> immobilise using a structured rule (Canadian C-spine rule in NG41), not reflexively. Observational data suggest immobilising isolated penetrating trauma without neurology delays care with little benefit — follow local protocol.</li>
                  <li><strong>Manual in-line stabilisation (MILS)</strong> during all airway manoeuvres, with the front of the collar removed for laryngoscopy — a fitted collar limits mouth opening and worsens the view.</li>
                  <li><strong>Minimise handling:</strong> NG41 advises minimising log rolling; a scoop stretcher or vacuum mattress reduces movement. If a log roll is needed, use a coordinated team with the head controlled.</li>
                  <li><strong>Head blocks and tape</strong> with a correctly sized collar if the patient is on a spinal board or scoop; remove the hard board as soon as possible.</li>
                  <li>Document pre- and post-move neurology; keep the whole spine in neutral alignment, allowing for ankylosing spondylitis and pre-existing deformity.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Harms of over-immobilisation</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-1">
                  <li>Rigid collars are associated with <strong>pressure ulcers</strong>, <strong>raised ICP</strong> (observational studies, likely from impeded venous drainage) and <strong>more difficult laryngoscopy</strong>.</li>
                  <li>Spinal boards cause pain, pressure injury and respiratory compromise; they are a transport device, not a treatment surface.</li>
                  <li>No randomised trial has shown that spinal immobilisation improves neurological outcome (a Cochrane review found none); practice rests on expert consensus, which supports selective use and early clearance.</li>
                  <li>Remove the collar as early as safely possible once the airway is secured and the spine is cleared clinically or radiologically.</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Neurogenic shock:</strong> cord injury above T6 can cause hypotension with bradycardia and warm peripheries
              (loss of sympathetic tone) — distinguish it from haemorrhagic shock, exclude bleeding first, and treat with vasopressors rather than
              fluid loading. Maintain spinal perfusion pressure; avoid both hypotension and over-resuscitation.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="fluid-boluses" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Fluid Boluses and Blood Pressure Targets">
              <TraumaFluidBolusTeaching />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="transfusion-thresholds" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Blood Transfusion Ratios and Haemoglobin Thresholds">
              <TraumaTransfusionTeaching />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="surgical-priorities" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Surgical Priorities and Damage Control Decisions">
              <TraumaSurgicalPriorityTeaching />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="damage-control" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.5"]}>
            <CollapsibleSubsection title="Damage Control Resuscitation">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Targets the lethal triad of hypothermia, acidosis, and coagulopathy:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Permissive hypotension</strong>: with no clinical evidence of brain injury, aim for SBP 80–90 mmHg until bleeding is controlled. If TBI and haemorrhagic shock coexist, identify which dominates. <InlineRef topicId="trauma-emergency" refLabel="Rossaint 2023 BP target" /><InlineRef topicId="trauma-emergency" refLabel="NG39 TBI and shock" /></li>
              <li><strong>Haemostatic resuscitation</strong>: start plasma and red cells at 1:1 in adults, then tailor replacement to bleeding and tests. Give platelets under the local protocol. <InlineRef topicId="trauma-emergency" refLabel="NG39 1:1" /></li>
              <li><strong>Tranexamic acid</strong>: 1g IV within 3 hours of injury (CRASH-2)<InlineRef topicId="trauma-emergency" refLabel="CRASH-2 2010" /></li>
              <li><strong>Limit crystalloid</strong>: avoid haemodilution and worsening coagulopathy</li>
              <li><strong>Warm fluids/patient</strong>: active warming to prevent hypothermia</li>
              <li><strong>Point-of-care testing</strong>: TEG/ROTEM to guide targeted blood product therapy</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="fluid-resuscitation" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Trauma & Stabilisation", "FFICM 2.5"]}>
            <CollapsibleSubsection title="Fluid Resuscitation in Major Trauma">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The resuscitation fluid of choice in bleeding trauma is <strong>blood</strong>. NICE NG39 (Major trauma: assessment and initial management) recommends
              blood products for active haemorrhage, a <strong>1:1 plasma:red cell</strong> ratio, and <strong>no crystalloid</strong> in hospital for patients with active bleeding: large crystalloid
              volumes dilute clotting factors and platelets, worsen hypothermia and acidosis, disrupt glycocalyx and increase tissue oedema
              without meaningfully restoring oxygen delivery.<InlineRef topicId="trauma-emergency" refLabel="NICE NG39" /><InlineRef topicId="trauma-emergency" refLabel="PROPPR 2015" />
            </p>
            <div className="space-y-3">
              {[
                { label: "Before blood is available", detail: "NG39 limits crystalloid to the pre-hospital setting when blood components are unavailable, titrated to a palpable central (carotid or femoral) pulse; it does not specify a bolus volume. Do not chase a normal blood pressure with litres of clear fluid — this 'resuscitation injury' worsens the lethal triad." },
                { label: "Permissive hypotension", detail: "Without clinical evidence of brain injury, use SBP 80–90 mmHg until bleeding is controlled. NICE advises a less restrictive approach when brain injury dominates over haemorrhagic shock. For severe TBI, BTF suggests SBP ≥100 mmHg at ages 50–69 or ≥110 mmHg at ages 15–49 or over 70." },
                { label: "Balanced blood-product resuscitation", detail: "In PROPPR, 1:1:1 refers to plasma, platelet-unit equivalents and red cells. The pack contained six plasma units, one adult platelet dose and six red-cell units. PROPPR (680 patients) found no significant difference in 24-h (12.7% vs 17.0%) or 30-day mortality (22.4% vs 26.1%) between 1:1:1 and 1:1:2, but 1:1:1 achieved haemostasis more often (86% vs 78%) with fewer deaths from exsanguination at 24 h (9.2% vs 14.6%) and no increase in complications. Give via a warmed rapid infuser through wide-bore access (two 14–16 G peripherals or a trauma line)." },
                { label: "Endpoints of resuscitation", detail: "After haemorrhage control, resuscitate to normal physiology: lactate or base deficit trending down, urine output >0.5 mL/kg/h, normothermia, ionised calcium in the normal range (usually 1.1–1.3 mmol/L), fibrinogen >1.5 g/L, platelets >50–100 × 10⁹/L. Lactate clearance and base deficit are better guides than blood pressure alone." },
                { label: "Special situations", detail: "Elderly patients and those on anticoagulants decompensate earlier and need lower activation thresholds; reverse anticoagulation (PCC for warfarin/DOACs per local protocol). In isolated TBI avoid hypotension entirely — a single episode of SBP <90 mmHg was associated with roughly doubled mortality in observational data (Chesnut 1993)." },
              ].map(item => (
                <div key={item.label} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="haemorrhage-control" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Trauma & Stabilisation", "FFICM 2.5"]}>
            <CollapsibleSubsection title="Haemorrhage Control">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Stopping the bleeding is the single most effective resuscitation intervention — every other measure buys time.
              Control proceeds from simple external measures to endovascular and surgical techniques, often in parallel with
              resuscitation rather than before it.<InlineRef topicId="trauma-emergency" refLabel="NICE NG39" /><InlineRef topicId="trauma-emergency" refLabel="UK-REBOA 2023" /><InlineRef topicId="trauma-emergency" refLabel="European Trauma Bleeding Guideline 2023" /><InlineRef topicId="trauma-emergency" refLabel="Holcomb 2023 Tourniquet Conversion" />
            </p>
            <div className="space-y-3">
              {[
                { label: "External bleeding", detail: "Direct pressure first; add a tourniquet for life-threatening bleeding from an open limb injury before surgery (European guideline, Grade 1B). In the emergency an initial tourniquet is often placed \"high and tight\"; once the casualty can be reassessed it can be replaced with a new one 2–3 inches (about 5–7.5 cm) above the bleeding site, or converted to packing and a pressure dressing if bleeding can be controlled. Record the time: under 2 hours has proven safe, beyond 2 hours risks significant ischaemic injury, so aim to convert or replace within 2 hours. Otherwise leave it on until surgical control, keeping the time to removal as short as possible." },
                { label: "Junctional bleeding", detail: "Groin, axilla and neck wounds cannot take a tourniquet: pack the wound tightly with haemostatic gauze (or plain gauze) and maintain hard direct pressure. Junctional tourniquets exist but are rarely available." },
                { label: "Pelvic haemorrhage", detail: "Apply a pelvic binder at the level of the greater trochanters (not the iliac crests) for suspected unstable pelvic fracture — it reduces pelvic volume and tamponades venous bleeding. Apply before moving the patient, avoid repeated spring testing, and do not remove it until definitive haemorrhage control (embolisation, preperitoneal packing or fixation) is available." },
                { label: "REBOA", detail: "Resuscitative endovascular balloon occlusion of the aorta (zone 1 — descending thoracic aorta — for abdominal/pelvic bleeding; zone 3 — distal aorta — for isolated pelvic bleeding) can temporise non-compressible torso haemorrhage. UK-REBOA (90 patients in UK major trauma centres; ED REBOA plus standard care vs standard care) was stopped early: 90-day mortality was 54% vs 42%, an 86% Bayesian probability of harm, with more and earlier deaths from bleeding. It does not support ED REBOA in UK practice outside research." },
                { label: "Damage control surgery", detail: "In the exsanguinating patient, surgery aims only to stop bleeding and contamination: packing, vascular shunts, bowel stapling, temporary abdominal closure. Definitive repair waits until the lethal triad is corrected in ICU. Interventional radiology (embolisation) is the alternative for pelvic and solid-organ bleeding in the patient stable enough to reach it." },
              ].map(item => (
                <div key={item.label} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-md border border-destructive/30 bg-destructive/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Exam pitfall</p>
              <p className="text-sm text-foreground">
                Resuscitation without haemorrhage control fails: blood products, TXA and warming only buy time. In the viva, always state
                <em> how and where the bleeding will be stopped</em> — tourniquet, binder, theatre, IR or REBOA — alongside the transfusion plan.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="mtp" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Massive Transfusion Protocol">
            <p className="text-muted-foreground leading-relaxed">
              Activated when anticipated need for ≥10 units PRBC in 24h or &gt;4 units in 1 hour. Trigger: uncontrolled haemorrhage,
              haemodynamic instability despite fluids, or anticipated major blood loss. Emergency O-negative blood should be available
              within minutes. Monitor for complications: hyperkalaemia, hypocalcaemia (citrate toxicity), hypothermia, TRALI, TACO.<InlineRef topicId="trauma-emergency" refLabel="BJA Educ 2016" />
            </p>

            <div className="p-3 rounded-lg border border-border mt-3">
              <p className="font-semibold text-foreground text-sm">Fibrinogen — targets, triggers and dosing</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-1">
                <li><strong>Why it matters:</strong> fibrinogen is the first coagulation factor to fall to critical levels in major haemorrhage, because it is consumed, diluted and degraded by hyperfibrinolysis, and it is the substrate for clot strength.</li>
                <li><strong>Trauma trigger:</strong> the European trauma guideline sets the replacement trigger at a Clauss fibrinogen of <strong>1.5 g/L or less</strong>, or a functional fibrinogen deficit on viscoelastic testing. It does not give a single FIBTEM cut-off for trauma, so use the threshold in your hospital's viscoelastic algorithm rather than a memorised number <InlineRef topicId="trauma-emergency" refLabel="European Trauma Bleeding Guideline 2023" />.</li>
                <li><strong>Obstetric contrast:</strong> postpartum haemorrhage uses a higher bar. In the OBS2 trial, a FIBTEM A5 above 12 mm or a fibrinogen above 2 g/L was enough for haemostasis, and giving fibrinogen above those levels did not help; a fibrinogen below 2 g/L predicts progression to massive haemorrhage <InlineRef topicId="trauma-emergency" refLabel="Cox PPH Haemostasis 2026" />.</li>
                <li><strong>Dose:</strong> the European trauma guideline recommends fibrinogen concentrate or cryoprecipitate when major bleeding is accompanied by a functional fibrinogen deficit on viscoelastic testing or a Clauss fibrinogen of 1.5 g/L or less, and suggests an initial dose of <strong>3–4 g</strong> — equivalent to <strong>15–20 single-donor units of cryoprecipitate</strong> or 3–4 g of fibrinogen concentrate. Repeat doses are guided by viscoelastic and laboratory fibrinogen results rather than a fixed schedule <InlineRef topicId="trauma-emergency" refLabel="European Trauma Bleeding Guideline 2023" />.</li>
                <li><strong>Caveats:</strong> therapeutic plasma contains only about 2 g/L of fibrinogen, so FFP cannot practically raise fibrinogen above 1.5 g/L; levels above 1.8 g/L are extremely difficult to reach because the volume needed rises steeply <InlineRef topicId="trauma-emergency" refLabel="European Trauma Bleeding Guideline 2023 (Plasma)" />. Empirical early high-dose cryoprecipitate given to all trauma patients on top of a standard major haemorrhage protocol did not improve mortality in CRYOSTAT-2, so replacement should be targeted to measured or viscoelastic deficiency rather than given routinely <InlineRef topicId="trauma-emergency" refLabel="CRYOSTAT-2 2023" />.</li>
              </ul>
            </div>
            <div className="mt-4"><HaemostaticTrialsTeaching /></div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="thoracic-trauma" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Management of Specific Thoracic Injuries">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Chest injury accounts for a quarter of trauma deaths. The primary survey identifies the immediately life-threatening injuries; each has a specific
              intervention that the anaesthetist may need to deliver before definitive imaging <InlineRef topicId="trauma-emergency" refLabel="ATLS 10th ed" /><InlineRef topicId="trauma-emergency" refLabel="BJA 2023 Thoracic Trauma" />.
            </p>
            <div className="space-y-3">
              {[
                { injury: "Tension pneumothorax", detail: "Clinical diagnosis — hypotension, hypoxia, distended neck veins, tracheal deviation away, absent breath sounds, and a sudden rise in airway pressure with loss of cardiac output after starting positive-pressure ventilation. Treat immediately with finger thoracostomy in the ventilated patient (needle decompression in the 4th–5th intercostal space, anterior axillary line, often fails because the cannula is too short or kinks) followed by an intercostal drain. Never wait for a chest radiograph." },
                { injury: "Open pneumothorax ('sucking chest wound')", detail: "Cover with a three-sided occlusive dressing or a proprietary vented chest seal to allow air out but not in, then place a chest drain at a separate site. A fully occlusive dressing converts it to a tension pneumothorax." },
                { injury: "Massive haemothorax", detail: "Defined as more than 1500 mL initial drainage or ongoing loss of 200 mL/h for 2–4 hours, or the need for persistent transfusion. Insert a large-bore drain with blood available and cell salvage prepared, resuscitate with blood products, and refer for thoracotomy — draining a tamponading haemothorax in a hypovolaemic patient can precipitate cardiovascular collapse, so have volume running before the drain releases." },
                { injury: "Cardiac tamponade", detail: "Beck's triad is unreliable in hypovolaemia; use FAST/echocardiography. Maintain preload, heart rate and spontaneous ventilation for as long as possible — induction of anaesthesia and positive-pressure ventilation can cause arrest, so induce in theatre with the surgeon scrubbed and the chest prepped. Definitive treatment is surgical decompression (resuscitative thoracotomy in penetrating trauma with recent loss of output); pericardiocentesis is a temporising measure only." },
                { injury: "Flail chest and pulmonary contusion", detail: "The injury that matters is the underlying contusion, not the paradoxical movement. Manage with aggressive multimodal analgesia — thoracic epidural, erector spinae or serratus anterior catheter, or paravertebral block — plus physiotherapy, humidified oxygen and CPAP/HFNO to avoid intubation. Judicious fluid therapy (contused lung is prone to oedema), early consideration of surgical rib fixation for severe flail, and a low threshold for lung-protective ventilation if intubated. Anticipate ARDS at 24–72 hours." },
                { injury: "Tracheobronchial injury", detail: "Suspect with persistent large air leak after drainage, massive surgical emphysema, haemoptysis or a 'fallen lung' sign. Secure the airway with awake or gas-induction techniques where possible, avoid high airway pressures, and use fibreoptic guidance to place the tube beyond the tear or to isolate the injured lung with a double-lumen tube or bronchial blocker. Involve thoracic surgery early; ECMO may be needed for gas exchange during repair." },
                { injury: "Blunt aortic injury", detail: "Usually a deceleration injury at the ligamentum arteriosum. Aim for strict impulse control — heart rate below 80/min and systolic pressure around 100–120 mmHg with a beta-blocker such as esmolol or labetalol plus analgesia — while balancing this against other bleeding sites and head injury. Definitive repair is usually thoracic endovascular stenting (TEVAR)." },
                { injury: "Blunt cardiac injury", detail: "Presents with unexplained arrhythmia, ST changes or hypotension. Investigate with ECG, troponin and echocardiography; a normal ECG and troponin effectively exclude significant injury. Manage with monitored observation, arrhythmia treatment and inotropic support for contusion-related dysfunction; look for valvular or septal rupture." },
                { injury: "Diaphragmatic rupture and oesophageal injury", detail: "Often occult; suspect with an abnormal diaphragmatic contour, a nasogastric tube in the chest, or mediastinal air. Avoid nitrous oxide, decompress the stomach, and involve upper GI or thoracic surgery — delayed diagnosis of oesophageal perforation carries a very high mortality from mediastinitis." },
              ].map(item => (
                <div key={item.injury} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.injury}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>


          <ExamSection id="lethal-triad" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="The Lethal Triad">
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              {[
                { label: "Hypothermia", value: "Core temp <35°C → impaired clotting, platelet dysfunction. Active warming essential." },
                { label: "Acidosis", value: "pH <7.2 → reduced clotting factor activity, fibrinogen dysfunction. Correct by restoring perfusion." },
                { label: "Coagulopathy", value: "Dilution and consumption both contribute. Follow the local major haemorrhage protocol, then target replacement to bleeding and tests." },
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
              Protect the brain from hypoxia and hypotension. In severe TBI (GCS ≤8), the European trauma guideline recommends MAP ≥80 mmHg. In combined haemorrhagic shock and TBI, NICE advises a less restrictive volume strategy when brain injury dominates, and continued restriction when haemorrhage dominates. <InlineRef topicId="trauma-emergency" refLabel="Rossaint 2023 BP target" /><InlineRef topicId="trauma-emergency" refLabel="NG39 TBI and shock" />
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Airway</strong>: early intubation if GCS ≤8 or risk of aspiration</li>
              <li><strong>Ventilation:</strong> initially target PaCO₂ 35–45 mmHg (4.7–6.0 kPa) in the absence of intracranial hypertension. With impending herniation, temporary controlled hyperventilation can bridge to definitive treatment.<InlineRef topicId="trauma-emergency" refLabel="ACS TBI 2024" /></li>
              <li><strong>Osmotherapy:</strong> treat intracranial hypertension or impending herniation with a protocol-based hyperosmolar bolus, selecting the agent and dose for the patient’s haemodynamics, sodium, renal function and response.<InlineRef topicId="trauma-emergency" refLabel="ACS TBI 2024" /></li>
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
              "Damage-control resuscitation includes bleeding control, initial adult plasma:red cells at 1:1, early TXA when indicated, warming and a blood pressure target appropriate to the injuries.",
              "ATLS A-B-C-D-E with simultaneous resuscitation; reassess after every intervention.",
              "Massive transfusion protocol: activate early — fixed-ratio products, calcium replacement, replace fibrinogen at ≤1.5 g/L, avoid hypothermia and acidosis.",
              "Traumatic brain injury: avoid hypoxia and hypotension. Severe TBI has age-specific systolic targets. Coordinate cerebral perfusion and haemorrhage control if both injuries are present.",
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
