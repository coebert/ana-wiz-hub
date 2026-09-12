import { Helmet } from "react-helmet-async";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { vascularAnaesthesiaQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocItems = [
  { id: "aaa", label: "Abdominal aortic aneurysm", group: "Aortic" },
  { id: "clamp", label: "Aortic cross-clamping physiology", group: "Aortic" },
  { id: "cea", label: "Carotid endarterectomy", group: "Cerebrovascular" },
  { id: "peripheral", label: "Peripheral vascular surgery", group: "Peripheral" },
  { id: "cardiac-risk", label: "Cardiac risk assessment", group: "Pre-op" },
  { id: "monitoring", label: "Intraoperative monitoring", group: "Intra-op" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const vascularFaqs: Array<[string, string]> = [
  [
    "What are the haemodynamic consequences of aortic cross-clamping and unclamping?",
    "Cross-clamping the aorta abruptly increases systemic vascular resistance and afterload (40–60% rise in SVR), which raises myocardial oxygen demand and can precipitate LV failure or ischaemia in patients with coronary disease. Distal to the clamp, organs (kidneys, gut, spinal cord, lower limbs) become ischaemic, producing lactic acidosis and releasing potassium. Unclamping causes a sudden fall in SVR due to vasodilatation and washout of acidic metabolites, plus a fall in preload as blood pools in the revascularised lower body. This produces hypotension, hyperkalaemia, myocardial depression, and reperfusion injury. Management: reduce volatile before clamping, have vasodilators (GTN, SNP) and inotropes ready, give a fluid bolus before unclamping, and release the clamp slowly or in stages.",
  ],
  [
    "What is the evidence for general anaesthesia versus cervical plexus block in carotid endarterectomy?",
    "The GALA trial (Lancet 2008, n=3526) found no significant difference in the composite of stroke, myocardial infarction, or death at 30 days between general anaesthesia and local anaesthesia/regional techniques (4.5% GA vs 4.8% LA). A Cochrane review (Vaniyapong 2013) pooled these data and confirmed no difference in hard outcomes. However, regional anaesthesia with a cervical plexus block provides awake neurological monitoring during the trial clamp, which is the most sensitive and specific test of cerebral ischaemia and produces the lowest selective shunt rate (~10–15%). Under GA, no single surrogate monitor (stump pressure, TCD, EEG, NIRS) has been proven to reduce stroke when used alone. The ESVS 2023 guidelines recommend offering both techniques and individualising the choice.",
  ],
  [
    "How is cerebral perfusion monitored during carotid endarterectomy under general anaesthesia?",
    "Because the awake neurological exam is unavailable under GA, surrogate monitors are used, often in combination: (1) Carotid stump pressure — measures back-pressure in the distal ICA; <40–50 mmHg suggests inadequate collateral flow. (2) Transcranial Doppler — continuous MCA velocity monitoring; a >50% drop from baseline or embolic signals (HITS) triggers shunt insertion. (3) Processed EEG — ipsilateral attenuation or slowing indicates cortical ischaemia. (4) Near-infrared spectroscopy (NIRS) — frontal rSO₂; alarm if >20% fall from baseline. (5) SSEPs — detect subcortical white-matter ischaemia but are slow and affected by anaesthetics. No single monitor has been shown to reduce stroke compared with awake testing; most centres combine two modalities.",
  ],
  [
    "What is permissive hypotension and when is it used in vascular surgery?",
    "Permissive hypotension is the deliberate acceptance of a lower-than-normal blood pressure to reduce bleeding until definitive surgical control of haemorrhage is achieved. It is standard of care in ruptured abdominal aortic aneurysm, where systolic blood pressure is maintained at 70–80 mmHg (or the lowest pressure compatible with conscious mentation) until the aorta is cross-clamped. The rationale is that aggressive fluid resuscitation before surgical control raises blood pressure, dislodges clots, and increases uncontrolled bleeding. Once the aorta is clamped, full resuscitation can proceed. Permissive hypotension should NOT be used in traumatic brain injury or spinal cord injury, where perfusion must be maintained.",
  ],
  [
    "How is spinal cord protected during thoracoabdominal aortic surgery?",
    "Spinal cord ischaemia is the most feared complication of thoracoabdominal aortic repair. Protective strategies include: (1) CSF drainage — maintains a lumbar drain to keep CSF pressure low and improve spinal perfusion pressure; target drainage 10–15 ml/h. (2) MAP maintenance ≥80 mmHg (some centres ≥85–90) throughout the procedure and for 24–48 hours postoperatively. (3) Motor evoked potential (MEP) or SSEP monitoring to detect ischaemia in real time. (4) Reimplantation of critical intercostal and lumbar arteries (open repair) or staging of the procedure. (5) Avoidance of hypothermia and hypotension. (6) Some centres use distal aortic perfusion or left-heart bypass to maintain spinal perfusion during the clamp period.",
  ],
  [
    "What is the difference between open AAA repair and EVAR?",
    "Open abdominal aortic aneurysm repair involves a laparotomy, aortic cross-clamping, and graft insertion, with a 30-day mortality of 4–6% and significant physiological stress. Endovascular aneurysm repair (EVAR) is performed via femoral artery access under fluoroscopy, placing a stent-graft within the aneurysm sac. EVAR has lower 30-day mortality (1–2%), less blood loss, and faster recovery (EVAR-1 trial). However, EVAR requires lifelong surveillance (CT or ultrasound) to detect endoleaks, and the long-term survival benefit is less clear — some patients outlive the graft durability. Open repair remains preferred for younger, fitter patients with favourable anatomy because the graft is more durable. EVAR is first-line for elderly, high-risk, or anatomically suitable patients. Ruptured AAA can be treated with EVAR if anatomy permits and the team is experienced.",
  ],
  [
    "How should antiplatelet and anticoagulant therapy be managed perioperatively for vascular surgery?",
    "Aspirin should be continued perioperatively in almost all vascular surgery — it reduces graft thrombosis and cardiac events. Clopidogrel is usually stopped 5–7 days before elective surgery unless the patient has a recent coronary stent, in which case an MDT decision is required. For coronary stents: bare-metal stents require 6 weeks of dual antiplatelet therapy before elective surgery; drug-eluting stents require 6–12 months (or 3 months with newer-generation DES). Warfarin is stopped 5 days pre-op and bridged with low-molecular-weight heparin if the patient has a mechanical valve or high thromboembolic risk. DOACs are stopped 2–3 days before surgery (longer if renal impairment) and restarted when haemostasis is secure. Neuraxial techniques require specific timing intervals for anticoagulants per ASRA guidelines.",
  ],
  [
    "What is cerebral hyperperfusion syndrome after carotid endarterectomy?",
    "Cerebral hyperperfusion syndrome occurs when a chronically hypoperfused cerebral hemisphere is suddenly exposed to normal or high perfusion pressure after removal of a severe carotid stenosis, overwhelming the impaired cerebral autoregulation. It typically presents 3–7 days postoperatively with severe unilateral headache, confusion, seizures, or intracerebral haemorrhage. Risk factors include high-grade stenosis, contralateral ICA occlusion, poor collateral flow, and perioperative hypertension. Prevention relies on very tight blood pressure control in the first postoperative week (SBP <140 mmHg, sometimes <120 in high-risk patients). Treatment: aggressive antihypertensive therapy (labetalol, hydralazine, or nicardipine), seizure control with levetiracetam, and neuroimaging to exclude haemorrhage.",
  ],
  [
    "What is the role of cardiopulmonary exercise testing (CPET) in vascular surgery?",
    "CPET is the gold-standard preoperative functional assessment for major vascular surgery. The anaerobic threshold (AT) is the key predictor: AT ≥11 ml/kg/min predicts low perioperative risk; AT <11 indicates high risk and should prompt consideration of less invasive options (EVAR rather than open AAA), prehabilitation, or critical care bed allocation. A VE/VCO₂ slope >34 also predicts poor outcomes. CPET is more informative than static tests (RCRI, METs) because it measures the integrated cardiovascular, respiratory, and muscular response to exercise. In patients unable to perform CPET, the Duke Activity Status Index or a stair-climbing test can be used as alternatives.",
  ],
  [
    "What renal protection strategies are used during aortic surgery?",
    "Renal ischaemia occurs during suprarenal or high infrarenal aortic cross-clamping. Protection strategies focus on maintaining perfusion: maintain MAP >65 mmHg (higher if suprarenal clamp), avoid hypovolaemia, and use goal-directed fluid therapy. Mannitol and 'renal-dose' dopamine have no proven benefit and are not recommended. N-acetylcysteine and sodium bicarbonate for contrast nephropathy prevention have mixed evidence. During EVAR, minimise contrast volume and use carbon dioxide angiography or intravascular ultrasound when feasible. If renal ischaemia time is expected to be prolonged, some surgeons use cold crystalloid renal perfusion or temporary shunts. Postoperatively, avoid nephrotoxins (NSAIDs, aminoglycosides) and maintain adequate hydration.",
  ],
];

const VascularAnaesthesiaTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Carotid endarterectomy: GA vs regional and neuromonitoring",
    scenario: "A 72-year-old with 80% symptomatic carotid stenosis is for CEA. Discuss GA vs cervical plexus block and how you monitor cerebral perfusion during cross-clamping.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>GENESIS / GALA trial: no significant difference in stroke/death/MI between GA and regional — choose based on patient preference, surgeon experience, anatomical factors</li>
          <li>Regional (superficial ± deep cervical plexus block): awake neurological monitoring is gold standard for shunt need — direct conversation, contralateral grip</li>
          <li>If GA, monitor cerebral perfusion: stump pressure (&lt;50 mmHg = shunt), transcranial Doppler (MCA velocity &lt;50% baseline), cerebral oximetry (rSO₂ fall &gt;20%), processed EEG</li>
          <li>Maintain MAP within 20% of baseline (or higher per surgical request during clamp), normocapnia, normothermia; treat hypotension with phenylephrine/noradrenaline rather than fluid</li>
          <li>Post-op: HDU, monitor for hyperperfusion syndrome (headache, seizure, ICH), tight BP control</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Deep cervical block risks phrenic nerve, intrathecal/intravascular injection — avoid bilateral</li>
          <li>Hypotension on clamp release — anticipate and correct</li>
          <li>Missing carotid sinus bradycardia — have atropine ready</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Either GA with multimodal neuromonitoring or cervical plexus block with awake assessment is acceptable; maintain MAP within 20% baseline and admit to HDU.",
    cites: ["BJA Educ AAA 2016", "BJA Educ CEA 2015", "ESVS AAA 2019"],
  },
];

const VascularAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Vascular Anaesthesia"
      subtitle="FRCA Final — Clinical"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="vascular-anaesthesia"
      topicTitle="Vascular Anaesthesia"
      workedExamples={VascularAnaesthesiaTopicWorkedExamples}
      quizQuestions={vascularAnaesthesiaQuestions}
      objectives={[
        "Compare anaesthetic management of open AAA, EVAR, and ruptured AAA repair",
        "Describe the haemodynamic and metabolic consequences of aortic cross-clamping and unclamping",
        "Plan anaesthesia for carotid endarterectomy with appropriate cerebral monitoring",
        "Apply spinal cord and renal protection strategies during major aortic surgery",
        "Risk-stratify vascular surgical patients using RCRI, METs, and CPET",
      ]}
      keyPoints={[
        { text: "Aortic cross-clamping: ↑ SVR/afterload above clamp; ischaemia below. Unclamp → ↓ SVR, acidosis, ↑ K⁺ — pre-load before release", cites: ["ESVS AAA 2019"] },
        { text: "Ruptured AAA: permissive hypotension (SBP 70–80) until aortic control. Massive transfusion protocol", cites: ["BJA Educ CEA 2015"] },
        { text: "CEA: GALA trial — no outcome difference GA vs regional; awake neurological exam under cervical plexus block remains the gold-standard cerebral monitor", cites: ["BJA Educ AAA 2016"] },
        { text: "CEA shunting: Cochrane (2014) found no benefit of routine over selective shunting — awake testing gives the lowest shunt rate (~10–15%)", cites: ["RCRI"] },
        { text: "Cervical plexus block: intermediate (sub-SCM, ultrasound-guided) now preferred over deep — equivalent surgical conditions with far fewer phrenic/RLN/intravertebral complications", cites: ["GALA 2008"] },
        { text: "Post-CEA: tight BP control (SBP <140–160) for days to prevent cerebral hyperperfusion syndrome — peaks days 3–7", cites: ["ESVS AAA 2019"] },
        { text: "Vascular patients have high cardiac risk — Lee's RCRI, CPET (AT <11 = high risk), continue statins/beta-blockers perioperatively", cites: ["BJA Educ CEA 2015"] },
        { text: "Ischaemia-reperfusion: K⁺ release, myoglobin, lactate washout can cause arrhythmias, AKI, ARDS", cites: ["BJA Educ AAA 2016"] },
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ AAA 2016",
          "BJA Educ CEA 2015",
          "ESVS AAA 2019",
          "GALA 2008",
          "RCRI",
        ],
        keyPoints: [
          "BJA Educ AAA 2016",
          "BJA Educ CEA 2015",
          "ESVS AAA 2019",
          "GALA 2008",
          "RCRI",
        ],
      }}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />

          <div id="aaa" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Abdominal Aortic Aneurysm (AAA)" defaultOpen>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Definitions</strong>: AAA = aortic diameter ≥3 cm (or 1.5× normal). Elective repair indicated at ≥5.5 cm (men) or ≥5.0 cm (women), or if growth &gt;1 cm/year</li>
              <li><strong>Open repair</strong>: supracoeliac or infrarenal cross-clamp. Massive haemodynamic changes — ↑ SVR and afterload on clamp, ↓ BP on unclamp (reperfusion). Cell salvage essential</li>
              <li><strong>EVAR (endovascular)</strong>: lower perioperative mortality (1–2% vs 4–6% open). GA or LA + sedation. Contrast nephropathy risk. Post-implantation syndrome (fever, ↑ CRP, ↑ WCC)</li>
              <li><strong>Ruptured AAA</strong>: 80% pre-hospital mortality. Permissive hypotension (SBP 70–80 mmHg) until aortic control. Massive transfusion protocol. Damage control surgery</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="clamp" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Aortic Cross-Clamping Physiology">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Above clamp</strong>: ↑ SVR (40–60%), ↑ MAP, ↑ cardiac preload, ↑ myocardial O₂ demand. Risk of LV failure/ischaemia. Magnitude depends on clamp level (supracoeliac &gt; infrarenal)</li>
              <li><strong>Below clamp</strong>: ↓ perfusion to kidneys, gut, spinal cord, lower limbs. Renal ischaemia (if suprarenal), gut mucosal ischaemia, lactic acidosis</li>
              <li><strong>Unclamping</strong>: ↓ SVR (vasodilatation, washout of metabolites), ↓ preload (blood pooling in lower body), metabolic acidosis, ↑ K⁺, ↑ lactate, myocardial depressant factors. Manage: volume loading pre-unclamp, slow/staged release, vasopressors</li>
              <li><strong>Spinal cord protection</strong>: CSF drainage (lumbar drain), MAP targets &gt;80 mmHg, avoid hypothermia, reimplant intercostal arteries (open TAAA repair)</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="cea" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Carotid Endarterectomy (CEA)">
            <p className="text-muted-foreground leading-relaxed mb-4">
              CEA prevents stroke in patients with significant carotid stenosis but is itself a high-risk cardiovascular procedure performed on an elderly, atherosclerotic population. The dominant intra-operative anaesthetic challenges are (1) detecting cerebral ischaemia during cross-clamping of the internal carotid artery (ICA), (2) deciding whether to insert a temporary intraluminal shunt, and (3) maintaining tight haemodynamic control to balance cerebral perfusion against myocardial work. Indications: symptomatic stenosis ≥50% (NASCET) — operate within 2 weeks (NICE); asymptomatic ≥60–70% in selected patients.
            </p>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Anaesthetic Technique</h3>
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Technique</th>
                    <th className="text-left py-2 text-foreground font-semibold">Advantages</th>
                    <th className="text-left py-2 text-foreground font-semibold">Disadvantages</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground align-top">General anaesthesia (GA)</td>
                    <td className="align-top">Secure airway and immobile patient; allows precise CO₂ control; familiar for most teams; cerebral metabolic depression (volatile/propofol) may be neuroprotective; better for long/complex cases or anxious patients.</td>
                    <td className="align-top">Loss of the gold-standard awake neurological exam → must rely on surrogate cerebral monitors; higher haemodynamic lability at induction/emergence; greater myocardial oxygen demand; higher PONV; slower mobilisation.</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground align-top">Regional (cervical plexus block — see below)</td>
                    <td className="align-top">Awake neurological monitoring is the most sensitive and specific test of cerebral ischaemia; allows selective shunting (lower shunt rate ~10–15% vs ~50% routine); better haemodynamic stability; less vasopressor use; faster recovery; lower opioid requirement; potentially less MI in observational data.</td>
                    <td className="align-top">Patient must be cooperative, able to lie flat with head turned, and tolerate drapes; surgical conversion to GA in 2–6% (ischaemia, agitation, block failure, airway compromise from haematoma); operator dependent; risks of the block itself (intravascular LA, phrenic palsy, recurrent laryngeal nerve block, intrathecal/epidural spread).</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-foreground align-top">Local infiltration alone</td>
                    <td className="align-top">Minimally invasive, avoids deep block complications, useful in elderly/frail patients with respiratory compromise.</td>
                    <td className="align-top">Often inadequate analgesia for retraction and ICA dissection — frequent surgical top-ups; not reliable for routine practice.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Cervical Plexus Block — Three Approaches</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The cervical plexus is formed by the anterior rami of C1–C4. The skin and subcutaneous tissues of the neck are supplied by the four <strong>superficial cervical plexus</strong> branches (lesser occipital, great auricular, transverse cervical, supraclavicular) which emerge at the posterior border of sternocleidomastoid (SCM). The deeper structures (sternomastoid, strap muscles, carotid sheath) receive sensory innervation from the <strong>deep cervical plexus</strong> running on the prevertebral fascia. The block can be performed at three planes — each with a different efficacy/risk profile.
            </p>
            <div className="grid lg:grid-cols-3 gap-3 mb-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Superficial (subcutaneous)</p>
                <p className="text-xs text-muted-foreground mb-2"><strong>Technique:</strong> 10–15 mL LA injected subcutaneously along the posterior border of SCM at its midpoint (level of C4 / cricoid).</p>
                <p className="text-xs text-muted-foreground"><strong>Pros:</strong> Very safe — extra-fascial, essentially no risk of phrenic / vertebral / intrathecal injection. Easy, fast, ultrasound rarely required.<br /><strong>Cons:</strong> Inadequate alone for deep dissection — supplemental surgical infiltration of carotid sheath usually needed.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Intermediate (sub-SCM / sub-platysmal)</p>
                <p className="text-xs text-muted-foreground mb-2"><strong>Technique:</strong> Ultrasound-guided injection deep to the investing layer of cervical fascia, beneath SCM but superficial to the prevertebral fascia (10–15 mL).</p>
                <p className="text-xs text-muted-foreground"><strong>Pros:</strong> Excellent surgical block quality close to that of a deep block, with a much lower complication profile. Now favoured in many UK centres.<br /><strong>Cons:</strong> Requires ultrasound and familiarity with cervical sonoanatomy; small risk of phrenic palsy if LA tracks deep.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Deep (paravertebral)</p>
                <p className="text-xs text-muted-foreground mb-2"><strong>Technique:</strong> Three-injection (Winnie) or single-injection at C3/C4 onto the transverse process, depositing LA within prevertebral fascia. Increasingly performed under ultrasound rather than landmark technique.</p>
                <p className="text-xs text-muted-foreground"><strong>Pros:</strong> Most complete sensory and motor block — lowest rate of supplementation.<br /><strong>Cons:</strong> Highest complication rate — <em>ipsilateral phrenic nerve palsy almost universal</em> (avoid bilateral blocks; caution in respiratory disease), recurrent laryngeal nerve block (hoarseness, contraindicated bilaterally), intravertebral artery injection (immediate seizure/CV collapse with even small LA volumes), intrathecal/epidural spread (high spinal), Horner's syndrome.</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-4">
              <p className="text-xs text-muted-foreground">
                <strong>Current UK practice:</strong> intermediate (or combined superficial + intermediate) block under ultrasound has largely replaced deep blocks for routine awake CEA — equivalent surgical conditions with markedly fewer complications (<em>Pandit, BJA 2007 systematic review and ESA recommendations</em>). LA choice is typically ropivacaine 0.5% or levobupivacaine 0.375–0.5% for ~6 hours of analgesia. Always have surgeon ready to infiltrate the carotid sheath.
              </p>
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Intra-operative Cerebral Perfusion Monitoring</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              ICA cross-clamp produces ipsilateral hemispheric ischaemia in 5–15% of patients (depends on contralateral disease, circle of Willis competence, MAP). No single monitor is perfect — many centres combine modalities or use awake testing as the reference standard.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Modality</th>
                    <th className="text-left py-2 text-foreground font-semibold">What it Measures</th>
                    <th className="text-left py-2 text-foreground font-semibold">Pros</th>
                    <th className="text-left py-2 text-foreground font-semibold">Cons</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground align-top">Awake neurological exam (regional only)</td>
                    <td className="align-top">Direct assessment of contralateral motor power, speech, level of consciousness during a 3-min trial clamp.</td>
                    <td className="align-top">Gold standard — highest sensitivity and specificity for clinically relevant ischaemia. Allows truly selective shunting.</td>
                    <td className="align-top">Requires regional technique; sudden deterioration may demand emergent shunt or conversion to GA.</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground align-top">Carotid stump pressure</td>
                    <td className="align-top">Mean back-pressure measured in the ICA distal to the cross-clamp via a needle/cannula.</td>
                    <td className="align-top">Cheap, readily available; correlates with collateral flow through circle of Willis.</td>
                    <td className="align-top">Only a single point in time; thresholds vary (commonly &lt;40–50 mmHg = inadequate); poor positive predictive value; affected by systemic BP and anaesthetic agents.</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground align-top">Transcranial Doppler (TCD)</td>
                    <td className="align-top">MCA mean flow velocity ipsilateral to clamp; also detects emboli (HITS) during dissection, clamp release and shunt insertion.</td>
                    <td className="align-top">Continuous, dynamic; detects emboli and hyperperfusion post-op; can guide shunt insertion (commonly trigger if MCA velocity drops &gt;50% from baseline).</td>
                    <td className="align-top">Adequate temporal bone window absent in 10–20% (especially elderly women); operator-dependent; probe fixation difficult.</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground align-top">Processed EEG / raw EEG</td>
                    <td className="align-top">Cortical electrical activity — ischaemia produces ipsilateral attenuation/slowing.</td>
                    <td className="align-top">Sensitive to cortical ischaemia; objective.</td>
                    <td className="align-top">Confounded by volatile anaesthesia, hypothermia, hypocapnia; misses subcortical/lacunar ischaemia; requires neurophysiologist for raw EEG interpretation.</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground align-top">Somatosensory evoked potentials (SSEPs)</td>
                    <td className="align-top">Median nerve cortical response — ↓ amplitude or ↑ latency = ischaemia.</td>
                    <td className="align-top">Detects subcortical ischaemia (white matter); more specific than EEG.</td>
                    <td className="align-top">Specialist equipment, slow signal averaging (~minutes — late warning), affected by anaesthetics.</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground align-top">Near-infrared spectroscopy (NIRS / rSO₂)</td>
                    <td className="align-top">Regional frontal-cortex tissue oxygen saturation; alarm if ↓ &gt;20% from baseline (or absolute &lt;50%).</td>
                    <td className="align-top">Non-invasive, continuous, easy to apply; works under GA or regional; useful trend monitor.</td>
                    <td className="align-top">Only frontal cortex sampled (may miss MCA territory ischaemia); extracranial contamination; poor evidence that NIRS-guided shunting reduces stroke.</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-foreground align-top">Jugular venous oxygen saturation (SjvO₂)</td>
                    <td className="align-top">Global cerebral oxygen extraction.</td>
                    <td className="align-top">Useful research tool.</td>
                    <td className="align-top">Invasive, global (not focal), rarely used routinely.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Intra-operative Surgical Shunts</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A temporary intraluminal shunt (Pruitt-Inahara, Javid or Sundt) bridges blood from the common carotid to the distal ICA across the area being endarterectomised, restoring antegrade flow during the clamp period. Three philosophies exist:
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Routine shunting</p>
                <p className="text-xs text-muted-foreground"><strong>Pros:</strong> No need for monitoring; protects every patient from clamp ischaemia; reduces need for trial clamping under regional.<br /><strong>Cons:</strong> Shunt placement carries its own risks — embolisation of plaque/air, intimal dissection, ICA injury, technical difficulty in narrow vessels, restricted operative view → potentially longer/messier endarterectomy, and a small but measurable embolic stroke rate.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Selective shunting</p>
                <p className="text-xs text-muted-foreground"><strong>Pros:</strong> Lowest shunt utilisation (~10–15% with awake testing, ~30–50% with stump pressure/TCD/NIRS) → fewer shunt-related complications; restricts shunt risk to those who actually need it.<br /><strong>Cons:</strong> Relies on accurate monitoring; risk of false-negative leading to ischaemic stroke; learning curve.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm mb-1">Never shunt</p>
                <p className="text-xs text-muted-foreground"><strong>Pros:</strong> Avoids all shunt-related embolic/dissection risk; quickest, cleanest endarterectomy.<br /><strong>Cons:</strong> Absolutely depends on rapid surgery (clamp time &lt;20 min) and good collaterals; not safe in patients with contralateral ICA occlusion or recent stroke; relies on permissive hypertension during clamp to maintain collateral flow.</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-4">
              <p className="text-xs text-muted-foreground">
                <strong>Cochrane review (Chongruksut, 2014):</strong> insufficient evidence to recommend routine over selective shunting — no significant difference in stroke or death between strategies. Surgeon experience and consistency are likely more important than the shunt policy itself. Most UK vascular centres practise selective shunting guided by awake testing (under regional) or TCD/stump pressure (under GA).
              </p>
            </div>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Haemodynamic Management & Complications</h3>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed mb-3">
              <li><strong>During cross-clamp:</strong> maintain MAP at or 20% above baseline (often phenylephrine/metaraminol/noradrenaline) to maximise collateral cerebral flow. Normocapnia (PaCO₂ 4.5–5 kPa) — both hyper- and hypocapnia worsen outcomes.</li>
              <li><strong>Carotid sinus reflex:</strong> surgical handling of the carotid bifurcation can trigger profound bradycardia/hypotension — request surgeon to infiltrate the bifurcation with 1% lidocaine; have atropine/glycopyrrolate drawn.</li>
              <li><strong>Post-op BP control:</strong> very tight target (e.g. SBP &lt;160 mmHg, often &lt;140 in high-risk) to prevent <strong>cerebral hyperperfusion syndrome</strong> (headache, seizures, intracerebral haemorrhage) — risk peaks days 3–7, particularly in patients with high-grade stenosis and impaired autoregulation.</li>
              <li><strong>Specific complications:</strong> stroke (1–3% in modern series, higher if symptomatic), MI (1–2%), cranial nerve injury (vagus, hypoglossal, marginal mandibular, recurrent laryngeal — in 5–10%, usually transient), neck haematoma (may obstruct airway — open in recovery if expanding), wound infection, hyperperfusion syndrome (~1% but devastating).</li>
            </ul>

            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Evidence Base — Which Technique?</h3>
            <div className="space-y-2 mb-2">
              {[
                { trial: "GALA (Lancet 2008, n=3526)", finding: "The largest RCT comparing GA vs LA/regional for CEA. NO significant difference in the composite of stroke, MI or death at 30 days (4.8% LA vs 4.5% GA). Awake monitoring did not translate into better hard outcomes — possibly because GA centres used surrogate monitors and shunting effectively. Conclusion: <strong>technique should be chosen by patient/surgeon/anaesthetist preference and local expertise</strong>, not dictated by evidence." },
                { trial: "Cochrane (Vaniyapong, 2013)", finding: "Pooled trial data including GALA — no difference in 30-day stroke or death between LA and GA. LA associated with less intraoperative shunting and modestly less hypotension/bradycardia." },
                { trial: "Cochrane shunting (Chongruksut, 2014)", finding: "Insufficient evidence to support routine vs selective shunting. No single monitoring modality (TCD, NIRS, stump pressure, EEG) clearly outperforms the others. Awake testing remains the only reference standard." },
                { trial: "ESVS Guidelines 2023", finding: "Recommend offering both GA and LA — choice individualised. Endorse selective shunting based on neurological monitoring. Strict perioperative BP control (Class I, Level B). CEA preferred over CAS for symptomatic ≥70% stenosis in patients fit for surgery." },
                { trial: "CREST (NEJM 2010)", finding: "Comparison of CEA vs carotid artery stenting (CAS): equal long-term composite outcomes, but CEA had fewer 30-day strokes (2.3% vs 4.1%) while CAS had fewer MIs (1.1% vs 2.3%). CEA favoured in older patients (&gt;70 yr); CAS in patients with hostile neck anatomy or prior radiotherapy." },
              ].map((e) => (
                <div key={e.trial} className="p-3 rounded border border-border">
                  <p className="font-bold text-primary text-sm mb-1">{e.trial}</p>
                  <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: e.finding }} />
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-secondary/50 border border-primary/20">
              <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Pearl</p>
              <p className="text-sm text-muted-foreground">
                GALA is the headline trial — it did NOT show superiority of either GA or regional, so the answer is "individualise". The unique advantage of regional (cervical plexus block) is <em>awake neurological monitoring</em>, which remains the gold-standard test of cerebral ischaemia and produces the lowest selective shunting rates. Under GA, no surrogate monitor (stump pressure, TCD, EEG, SSEP, NIRS) has been shown to reduce stroke when used in isolation — most centres combine two. Strict BP control and post-op vigilance for hyperperfusion syndrome matter more than the choice of technique.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="peripheral" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Peripheral Vascular Surgery">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Lower limb bypass/angioplasty</strong>: patients often have widespread atherosclerosis, IHD, DM, CKD. High cardiac risk — Lee's RCRI assessment</li>
              <li><strong>Anaesthetic options</strong>: GA, neuraxial (spinal/epidural), peripheral nerve blocks, or combinations. Regional may improve graft flow (sympathectomy)</li>
              <li><strong>Amputation</strong>: often elderly, frail, comorbid. Sciatic + femoral nerve block or spinal anaesthesia. Phantom limb pain prevention: regional analgesia, gabapentinoids</li>
              <li><strong>Ischaemia-reperfusion injury</strong>: release of K⁺, lactate, myoglobin, inflammatory mediators from revascularised tissue. Can cause cardiac arrhythmias, renal failure, ARDS</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="cardiac-risk" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Preoperative Cardiac Risk Assessment">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Lee's RCRI</strong>: 6 predictors — high-risk surgery, IHD, CCF, CVA/TIA, DM (insulin), creatinine &gt;177 µmol/L. ≥3 points = high risk</li>
              <li><strong>CPET</strong>: AT &lt;11 ml/kg/min = high risk. VE/VCO₂ &gt;34 also associated with poor outcomes</li>
              <li><strong>Cardiac medications</strong>: continue statins, beta-blockers, aspirin. Dual antiplatelet management — MDT discussion</li>
              <li><strong>ACE inhibitors and ARBs</strong>: omit the morning dose before major vascular surgery. Chronic ACEI/ARB therapy blunts the renin–angiotensin response to anaesthesia and hypovolaemia, so induction produces exaggerated vasodilatation with hypotension that is often refractory to fluid and to conventional catecholamines<InlineRef topicId="vascular-anaesthesia" refLabel="ACEI Anaesthesia 1994" /></li>
              <li><strong>Treating refractory ACEI-related hypotension</strong>: escalate stepwise — fluid loading, then a direct α₁-agonist (metaraminol/phenylephrine), then a noradrenaline infusion; when hypotension persists despite escalating catecholamines the angiotensin pathway is the missing limb, so vasopressin 1–2 unit bolus or an infusion of 0.01–0.04 units/min is usually rapidly effective (methylene blue and calcium have been used in vasoplegia). Reduce anaesthetic depth, exclude other causes (bleeding, ischaemia, anaphylaxis — a major cause of perioperative cardiac arrest in NAP7) and site invasive monitoring early<InlineRef topicId="vascular-anaesthesia" refLabel="NAP7 2023" /></li>
              <li><strong>Restarting</strong>: recommence ACEI/ARB once the patient is euvolaemic, off vasopressors and renal function is stable — usually 24–48 h postoperatively; document the plan so the drug is not omitted indefinitely</li>

              <li><strong>Coronary stents</strong>: BMS — defer elective surgery 6 weeks; DES — defer 6–12 months (or 3 months with newer-generation DES). Continue aspirin perioperatively if possible</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="monitoring" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Intraoperative Monitoring & Management">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Arterial line</strong>: essential for open aortic surgery, recommended for CEA. Beat-to-beat BP and serial ABGs</li>
              <li><strong>Central venous access</strong>: consider for open aortic surgery (vasoactive drugs, volume assessment). Not always needed for EVAR or CEA</li>
              <li><strong>Cardiac output monitoring</strong>: goal-directed fluid therapy (oesophageal Doppler, PiCCO, FloTrac) improves outcomes in major vascular surgery</li>
              <li><strong>Temperature</strong>: active warming essential. Hypothermia worsens coagulopathy, cardiac morbidity, wound infection</li>
              <li><strong>Cell salvage</strong>: essential for open aortic surgery. Relative contraindication if concurrent malignancy (use leucocyte depletion filter)</li>
              <li><strong>Renal protection</strong>: maintain adequate MAP, avoid nephrotoxins, goal-directed fluid therapy. No proven benefit of renal-dose dopamine or mannitol</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <SynthesisBlock
            title="Vascular Anaesthesia — Bottom Line"
            subtitle="Key risk-stratification, monitoring and protective strategies for major vascular surgery."
            variant="summary"
          >
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li><strong>Preoperative cardiac risk</strong>: RCRI / METS score; CPET if available. Continue β-blockers and statins; stop ACEi/ARB on the morning of surgery.</li>
              <li><strong>EVAR vs open AAA</strong>: EVAR has lower 30-day mortality (EVAR-1) but no long-term survival benefit; open repair more durable in fit patients.</li>
              <li><strong>Aortic cross-clamp</strong>: profound ↑afterload + ↓ distal perfusion. Use vasodilators (GTN), titrated cardiac filling, and monitor end-organ perfusion.</li>
              <li><strong>Renal protection</strong>: maintain perfusion (MAP &gt;65), avoid nephrotoxins, judicious contrast — no benefit from mannitol or 'renal-dose' dopamine.</li>
              <li><strong>Spinal cord protection (TAAA)</strong>: CSF drainage, MAP ≥80, motor-evoked potential monitoring, intercostal artery reimplantation.</li>
              <li><strong>Carotid surgery</strong>: regional (deep + superficial cervical block) or GA with arterial line; awake testing during clamp gold standard for shunt decision.</li>
            </ul>
          </SynthesisBlock>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Open AAA: aortic cross-clamp increases afterload abruptly — afterload-reducing agents and reduced volatile pre-clamp, vasodilators ready for unclamping (reperfusion hypotension).",
              "Carotid endarterectomy: keep BP within 20% of baseline; awake regional (cervical plexus) allows continuous neuro assessment.",
              "EVAR is less haemodynamically stressful than open AAA but carries contrast nephropathy, embolic and endoleak risks.",
              "Vascular patients have a high prevalence of IHD, CKD and COPD — optimise statins, β-blockers and antiplatelets perioperatively.",
              "Spinal cord ischaemia after thoracic aortic surgery: CSF drainage, MAP >85 mmHg, intercostal artery reimplantation.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Vascular Anaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Evidence-based answers to the questions FRCA Final candidates most often ask about aortic cross-clamping physiology, open AAA vs EVAR, carotid endarterectomy (GA vs regional, cerebral monitoring, shunting), cerebral hyperperfusion syndrome, spinal cord protection, and preoperative cardiac risk assessment.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {vascularFaqs.map(([q, a], i) => (
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
            <title>Vascular Anaesthesia — AAA, CEA, EVAR & aortic cross-clamp physiology</title>
            <meta
              name="description"
              content="Vascular anaesthesia for FRCA Final: open AAA and EVAR, aortic cross-clamping and unclamping physiology, carotid endarterectomy (GA vs cervical plexus block, cerebral monitoring, shunting), cerebral hyperperfusion syndrome, spinal cord protection, and preoperative cardiac risk stratification."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: vascularFaqs.map(([name, acceptedAnswer]) => ({
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

export default VascularAnaesthesiaTopic;
