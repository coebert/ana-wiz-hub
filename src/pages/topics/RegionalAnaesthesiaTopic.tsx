import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { ExamSection } from "@/components/exam/ExamSection";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { regionalAnaesthesiaQuestions } from "@/data/quizzes";
import DermatomeMapDiagram from "@/components/diagrams/clinical/DermatomeMapDiagram";
import NerveDermatomeOverlayDiagram from "@/components/diagrams/clinical/NerveDermatomeOverlayDiagram";
import SpinalBlockHeightAssessmentTool from "@/components/diagrams/clinical/SpinalBlockHeightAssessmentTool";
import RegionalBlocksDiagram from "@/components/diagrams/clinical/RegionalBlocksDiagram";
import UpperLimbBranchesDiagram from "@/components/diagrams/anatomy/UpperLimbBranchesDiagram";
import LowerLimbBranchesDiagram from "@/components/diagrams/anatomy/LowerLimbBranchesDiagram";
import NeuraxialNeedlesDiagram from "@/components/diagrams/physics/NeuraxialNeedlesDiagram";
import NeuraxialAnticoagRiskTool from "@/components/diagrams/clinical/NeuraxialAnticoagRiskTool";
import AnticoagRestartTimeline from "@/components/diagrams/clinical/AnticoagRestartTimeline";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
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
  { id: "dermatomes", label: "Dermatome anatomy", group: "Foundations" },
  { id: "spinal", label: "Spinal anaesthesia", group: "Neuraxial" },
  { id: "epidural", label: "Epidural anaesthesia", group: "Neuraxial" },
  { id: "spinal-vs-epidural", label: "Spinal vs epidural", group: "Neuraxial" },
  { id: "complications", label: "Neuraxial complications", group: "Neuraxial" },
  { id: "upper-limb", label: "Upper limb & truncal blocks", group: "Peripheral blocks" },
  { id: "block-height", label: "Block height assessment", group: "Assessment" },
  { id: "bromage", label: "Bromage scale", group: "Assessment" },
  { id: "regression", label: "Block regression times", group: "Assessment" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

// SEO-targeted FAQ — answers the highest-volume UK "spinal anaesthesia"
// question keywords surfaced by Semrush (KDI 23, 1.6K vol head term).
// Rendered as accordion + FAQPage JSON-LD for rich-result eligibility.
const regionalFaqs: Array<[string, string]> = [
  [
    "What is spinal anaesthesia and how does it work?",
    "Spinal anaesthesia is the intrathecal injection of local anaesthetic (typically 2.5–3 ml of 0.5% heavy bupivacaine) into the cerebrospinal fluid at the L3/4 or L4/5 interspace, below the conus medullaris. The local anaesthetic blocks sodium channels on spinal nerve roots, producing a dense, rapidly-onset (5–10 min) sympathetic, sensory and motor block of the lower body. Block height is determined by dose, baricity (heavy vs plain), and patient position in the first 10 minutes.",
  ],
  [
    "How long does a spinal anaesthetic last?",
    "Heavy bupivacaine 0.5% (2.5–3 ml) gives surgical anaesthesia for 2–3 hours, with two-segment sensory regression at 60–90 min and complete motor recovery at 3–4 hours. Prilocaine 2% lasts ~90 min and chloroprocaine 1% only 60 min — both preferred for day-case surgery. Intrathecal fentanyl 15–25 µg or diamorphine 0.2–0.4 mg adds 15–30 min and improves block quality without prolonging motor recovery significantly.",
  ],
  [
    "What is the difference between a spinal and an epidural?",
    "A spinal places a small dose (2–3 ml) directly into CSF for a rapid, dense, single-shot block. An epidural places a larger dose (10–20 ml) into the epidural (potential) space, typically through a catheter — slower onset (15–30 min), titratable, with a differential block (sensory > motor). Spinals are preferred for short, predictable surgery (e.g. caesarean section, TURP); epidurals for labour analgesia and longer thoracic/abdominal procedures where titration matters.",
  ],
  [
    "Does spinal anaesthesia hurt and is it safe?",
    "Local anaesthetic infiltration of the skin is briefly stinging; the spinal needle itself is felt as pressure rather than pain in most patients. Serious complications are rare: NAP3 reported vertebral canal haematoma around 1:220,000 for spinal anaesthesia and 1:150,000 for epidural anaesthesia, and meningitis < 1:50,000. Permanent neurological injury does occur but is rare, and its causes overlap — direct needle or catheter trauma, vertebral canal haematoma, infection, spinal cord ischaemia and, importantly, surgical and patient factors unrelated to the block — so a single incidence figure for spinal anaesthesia alone cannot be quoted reliably. The most common side effects — hypotension, shivering, transient back ache and post-dural puncture headache — are predictable and treatable.",
  ],
  [
    "Why does spinal anaesthesia drop blood pressure?",
    "Blockade of preganglionic sympathetic fibres (T1–L2) two dermatomes above the sensory level causes arteriolar and venous dilatation, reducing systemic vascular resistance and venous return. A block above T4 also blocks cardiac accelerator fibres causing bradycardia. Management: fluid co-loading (10–15 ml/kg crystalloid), prophylactic vasopressor (phenylephrine 50–100 µg or noradrenaline infusion in obstetrics), left uterine displacement in pregnancy, and atropine for symptomatic bradycardia.",
  ],
  [
    "What is post-dural puncture headache (PDPH) and how is it treated?",
    "PDPH is a positional fronto-occipital headache caused by CSF leak through the dural puncture, with traction on meningeal vessels. Incidence: 1–2% after 25–27 G pencil-point spinal needles, 50–80% after accidental 16–18 G epidural Tuohy puncture. Worse on sitting/standing, better lying flat. Conservative management (analgesia, hydration, caffeine) for 24–48 h; epidural blood patch (15–20 ml autologous blood) is the gold standard with 70–90% success and is offered if symptoms persist beyond 24–48 h or are severe.",
  ],
  [
    "When is spinal anaesthesia contraindicated?",
    "Absolute: patient refusal, raised intracranial pressure, local infection at insertion site, severe coagulopathy or therapeutic anticoagulation outside the AAGBI/ESAIC interval, true allergy to local anaesthetic, fixed-output cardiac lesions (e.g. severe AS — relative in modern practice). Relative: bacteraemia/sepsis, pre-existing neurological disease (document baseline), spinal deformity, hypovolaemia.",
  ],
  [
    "How are local anaesthetics dosed safely to avoid toxicity (LAST)?",
    "Maximum safe doses: lidocaine 3 mg/kg plain (7 mg/kg with adrenaline); bupivacaine and levobupivacaine 2 mg/kg; ropivacaine 3 mg/kg. Always calculate by lean body weight. LAST presents with peri-oral tingling, agitation, seizures, then cardiovascular collapse. Management: stop injection, ABC, 20% Intralipid 1.5 ml/kg bolus then 0.25 ml/kg/min infusion (AAGBI 2010 guideline), avoid lidocaine antiarrhythmics and vasopressin.",
  ],
  [
    "How is block height tested at the bedside?",
    "Use ethyl chloride cold spray to test loss of cold sensation (Aδ- and C-fibre block — the most reliable correlate of surgical anaesthesia). Calibrate by spraying an unblocked forearm, then start from a blocked dermatome and move cranially until cold returns; document the highest bilateral level. T4 (nipple) is required for caesarean section, T6 (xiphisternum) for upper abdominal, T10 (umbilicus) for hernia and lower abdominal surgery. Pinprick tests sharp sensation carried by Aδ fibres, which together with loss of cold indicates surgical anaesthesia; light touch (Aβ) is lost later and at a lower level. Bromage 0–3 grades motor block.",
  ],
  [
    "How long should anticoagulants be stopped before a neuraxial block?",
    "Per AAGBI 2013 / ESAIC 2022: prophylactic LMWH 12 h, treatment-dose LMWH 24 h; unfractionated heparin (s/c prophylaxis) 4 h with normal APTT; warfarin INR < 1.4; clopidogrel 7 days; ticagrelor 5 days; rivaroxaban prophylactic 18 h, treatment 48 h; apixaban prophylactic 24–48 h; dabigatran 48–96 h (renal-function dependent). Aspirin and NSAIDs alone do not preclude neuraxial. The same intervals apply to catheter removal.",
  ],
];

const objectives = [
  "Identify dermatomal landmarks (T4 nipple, T6 xiphisternum, T10 umbilicus, T12 inguinal) for block height planning",
  "Compare spinal vs epidural pharmacology, onset, density and titratability",
  "Apply AAGBI 2013 / ESAIC 2022 anticoagulation timing for safe neuraxial block",
  "Recognise and manage PDPH, neuraxial haematoma/abscess and total spinal",
  "Assess sensory level (cold spray) and motor block (Bromage) and predict regression",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Spinal for elective caesarean section — block height confirmation",
    scenario:
      "Ten minutes after a spinal of 2.4 ml 0.5% heavy bupivacaine + 15 µg fentanyl, you need to confirm a block adequate for caesarean section. What is the minimum acceptable level and how do you test it?",
    working:
      "Adequate block for CS: bilateral loss of cold sensation (Aδ-fibre block) to T4 (nipple line) and loss of light touch to T5.\nUse ethyl chloride spray; calibrate on the forearm, then start at the abdomen and move cranially until the patient reports cold returning. Document the highest dermatome with bilateral loss.\nAlso check motor (Bromage 3 expected) and sympathetic block (warm dry feet, hypotension).\nIf level <T4: consider topping up via uplift positioning, IV ketamine/midazolam supplementation, conversion to GA — never rush to start surgery on an inadequate block.",
    answer:
      "Need bilateral cold loss to T4 (nipple). Test with ethyl chloride spray, calibrating on the forearm and moving cranially from the abdomen.",
    cites: ["AAGBI 2020"],
  },
  {
    title: "Epidural top-up timing on a patient on rivaroxaban",
    scenario:
      "A patient with an epidural in situ from yesterday took her usual rivaroxaban 20 mg this morning by mistake. When can the epidural catheter be safely removed?",
    working:
      "AAGBI 2013 / ESAIC 2022: rivaroxaban (treatment dose) requires a 48 h gap before neuraxial intervention (insertion or catheter removal) due to bleeding/haematoma risk.\nFor prophylactic dose rivaroxaban (10 mg OD), the gap is 18 h.\nNo neuraxial intervention should occur within these windows. Wait the appropriate interval, then remove the catheter and monitor for 6 h with regular neurological observations.\nNext rivaroxaban dose: 6 h after catheter removal.",
    answer:
      "Wait 48 h after the rivaroxaban dose (treatment dose) before removing the catheter, then perform regular neurological observations for 6 h. Next dose 6 h after removal.",
    cites: ["BJA Educ 2018"],
  },
];

const RegionalAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Regional & Neuraxial Anaesthesia"
      subtitle="FRCA / FFICM — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="regional-anaesthesia"
      topicTitle="Regional & Neuraxial Anaesthesia"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={regionalAnaesthesiaQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA — Regional Anaesthesia"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2018",
          "AAGBI 2020",
          "BJA Educ 2018b",
        ],
        keyPoints: [
          "BJA Educ 2018",
          "AAGBI 2020",
          "BJA Educ 2018b",
        ],
        workedExamples: ["AAGBI 2020", "BJA Educ 2018"],
      }}
      keyPoints={[
        { text: "Spinal: rapid dense block, single-shot; Epidural: titratable, catheter-based, differential block", cites: ["BJA Educ 2018b"] },
        { text: "Hyperbaric bupivacaine spread influenced by baricity and patient position", cites: ["AAGBI 2020"] },
        { text: "Interscalene block causes ipsilateral phrenic nerve palsy in ~100% of cases", cites: ["BJA Educ 2018"] },
        { text: "PDPH: worse sitting/standing, treat with epidural blood patch if conservative measures fail", cites: ["BJA Educ 2018b"] },
        { text: "Follow AAGBI/ESRA anticoagulation guidelines — timing of neuraxial relative to anticoagulants is critical", cites: ["AAGBI 2020"] },
        { text: "Test block height with cold spray: start from blocked area, move cranially until cold sensation returns", cites: ["BJA Educ 2018"] },
        { text: "Differential block order: sympathetic (+2 above) > sensory (cold/pinprick) > motor (−2 below sensory level)", cites: ["BJA Educ 2018b"] },
        { text: "Bromage 0 = full motor; Bromage 3 = complete block. Bromage 0 required before mobilisation/discharge", cites: ["AAGBI 2020"] },
        { text: "Heavy bupivacaine 2-segment regression: 60–90 min; full motor recovery 3–4 hours", cites: ["BJA Educ 2018"] },
      ]}
      coreConcepts={
        <ExamSection exams={[Exam.FINAL]} className="scroll-mt-24">
          <TopicTableOfContents items={tocItems} />
          <section id="dermatomes" className="scroll-mt-24 mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Dermatome Anatomy — Foundations</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Knowing surface dermatomes and their corresponding spinal levels underpins every regional and neuraxial technique — for planning block height, predicting surgical coverage, and detecting unexpectedly high blocks.
        </p>
        <div className="space-y-6">
          <DermatomeMapDiagram />
          <NerveDermatomeOverlayDiagram />
        </div>
      </section>

      <section className="space-y-6 mb-10">
        <div id="spinal" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Spinal Anaesthesia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Intrathecal injection of local anaesthetic ± opioid into the subarachnoid space, typically at L3/4 or L4/5.
          </p>
          <div className="my-4">
            <NeuraxialNeedlesDiagram />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Heavy (Hyperbaric) Bupivacaine</p>
              <p className="text-sm text-muted-foreground mt-1">0.5% in 8% glucose. Dose: 2.5–3.5 ml. Predictable spread influenced by patient position and baricity. Onset 5–10 min, duration 2–3 hrs.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Intrathecal Adjuncts</p>
              <p className="text-sm text-muted-foreground mt-1">Fentanyl 15–25 µg (improves block quality, minimal respiratory depression). Diamorphine 0.2–0.4 mg (prolonged analgesia, monitor for delayed respiratory depression).</p>
            </div>
          </div>
        </div>

        <div id="epidural" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Epidural Anaesthesia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Catheter-based technique allowing continuous or bolus top-ups. Needle enters the epidural space (loss of resistance to saline or air).
          </p>
          <div id="spinal-vs-epidural" className="overflow-x-auto scroll-mt-24">
            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Spinal vs epidural — at a glance</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                  <th className="text-left py-2 text-foreground font-semibold">Spinal</th>
                  <th className="text-left py-2 text-foreground font-semibold">Epidural</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Onset</td><td>Rapid (5–10 min)</td><td>Slow (15–30 min)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Block density</td><td>Dense motor + sensory</td><td>Differential (sensory {'>'} motor)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">LA dose</td><td>Small (2–3 ml)</td><td>Large (10–20 ml)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Duration</td><td>Fixed (single-shot)</td><td>Titrable (catheter)</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Hypotension</td><td>Rapid, profound</td><td>Gradual, manageable</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="upper-limb" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Peripheral Nerve Blocks</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Ultrasound-guided blocks have revolutionised regional anaesthesia, improving success rates and reducing complications.
          </p>
          <div className="my-4">
            <RegionalBlocksDiagram />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { block: "Interscalene", indication: "Shoulder surgery", nerves: "C5-C7 roots", risk: "Phrenic nerve palsy (100%)" },
              { block: "Supraclavicular", indication: "Arm/forearm surgery", nerves: "Brachial plexus trunks", risk: "Pneumothorax (rare with US)" },
              { block: "Adductor Canal", indication: "Knee surgery (motor-sparing)", nerves: "Saphenous nerve", risk: "Minimal — preferred over femoral" },
              { block: "Popliteal Sciatic", indication: "Foot/ankle surgery", nerves: "Sciatic nerve", risk: "Foot drop if excessive volume" },
              { block: "TAP Block", indication: "Abdominal wall analgesia", nerves: "T6-L1 intercostals", risk: "Visceral injury, LA toxicity" },
              { block: "Erector Spinae Plane", indication: "Thoracic/abdominal analgesia", nerves: "Dorsal & ventral rami", risk: "Pneumothorax (very rare)" },
            ].map((b) => (
              <div key={b.block} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{b.block}</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Indication:</strong> {b.indication}</p>
                <p className="text-xs text-muted-foreground"><strong>Target:</strong> {b.nerves}</p>
                <p className="text-xs text-muted-foreground"><strong>Risk:</strong> {b.risk}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-6">
            <UpperLimbBranchesDiagram />
            <LowerLimbBranchesDiagram />
          </div>

          <h3 id="truncal-blocks" className="text-lg font-serif font-semibold text-foreground mt-8 mb-2 scroll-mt-24">Truncal & Abdominal Wall Blocks</h3>
          <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
            Fascial plane blocks deposit a large volume of dilute local anaesthetic into a plane containing sensory nerves. They are technically straightforward, spare motor function and avoid the sympathetic block of an epidural, but they are <strong>analgesic rather than anaesthetic</strong>, rely on volume-dependent spread, and use doses close to maximum — so calculate mg/kg carefully and monitor for LAST
            <InlineRef topicId="regional-anaesthesia" refLabel="BJA Educ 2020 Fascial Planes" />.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Transversus abdominis plane (TAP) block</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Landmarks:</strong> mid-axillary line between the costal margin and iliac crest (posterior approach gives more reliable spread); the classic landmark technique used the lumbar triangle of Petit. <strong>Ultrasound:</strong> in-plane needling of the three-layer sandwich (external oblique, internal oblique, transversus abdominis), hydrodissecting 15–20 ml of 0.25 % levobupivacaine per side between internal oblique and transversus. <strong>Coverage:</strong> anterior abdominal wall somatic sensation, roughly <strong>T10–L1</strong> with the subcostal approach extending to T7–T9; no visceral or midline coverage. <strong>Risks:</strong> peritoneal or bowel/liver puncture, intravascular injection and LAST from bilateral large-volume dosing, transient femoral nerve palsy from anterior spread.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Rectus sheath block</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Indication:</strong> midline incisions — laparotomy, umbilical and epigastric hernia, laparoscopic port sites. <strong>Technique:</strong> ultrasound lateral to the umbilicus, needle tip between the posterior surface of rectus abdominis and the posterior rectus sheath, 10–20 ml per side (0.2–0.3 ml/kg in children), targeting the terminal branches of T9–T11 as they cross the sheath. <strong>Risks:</strong> peritoneal or bowel puncture, inferior epigastric vessel injury and haematoma, short duration unless catheters are placed.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Pectoral nerve blocks (PECS I & II / serratus plane)</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Indications:</strong> breast surgery (mastectomy, axillary clearance, implants), pacemaker/ICD insertion, and — for serratus plane — rib fractures and thoracotomy. <strong>PECS I:</strong> 10 ml between pectoralis major and minor at the 3rd rib, blocking the <strong>medial and lateral pectoral nerves</strong>. <strong>PECS II:</strong> a second injection of 20 ml deeper, between pectoralis minor and serratus anterior at the 4th rib, blocking the <strong>lateral cutaneous branches of the intercostal nerves T2–T6</strong>, the long thoracic and thoracodorsal nerves. <strong>Risks:</strong> pneumothorax, vascular puncture (thoracoacromial vessels), LAST
                <InlineRef topicId="regional-anaesthesia" refLabel="BJA Educ 2020 Fascial Planes" />.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Erector spinae plane (ESP) block</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Mechanism:</strong> local anaesthetic injected between the erector spinae muscle and the transverse process spreads craniocaudally over several levels and, at least in part, anteriorly through the costotransverse space towards the <strong>paravertebral space and dorsal/ventral rami</strong> — giving wide multi-dermatomal, and partly visceral, analgesia. <strong>Technique:</strong> transverse process identified at T5 (thoracic) or T7–T9 (abdominal), needle contacts bone, 20–30 ml injected with visible linear spread lifting the muscle; catheters can be sited. <strong>Uses:</strong> rib fractures, thoracic and cardiac surgery, breast surgery, spinal and major abdominal surgery, especially when anticoagulation precludes neuraxial technique. <strong>Risks:</strong> pneumothorax (very rare — injection is posterior to the transverse process), LAST with large volumes, unpredictable spread and variable block quality.
              </p>
            </div>
          </div>

          <h3 id="pnb-anticoagulation" className="text-lg font-serif font-semibold text-foreground mt-8 mb-2 scroll-mt-24">Anticoagulation and Peripheral Nerve Blocks</h3>
          <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
            The strict neuraxial intervals exist because a vertebral canal haematoma compresses the cord in a closed bony space. Most peripheral blocks are not in that situation, so the guidance is <strong>risk-stratified by site rather than by drug alone</strong>: assess how compressible the site is, whether bleeding would be visible, and what the consequence of a haematoma would be <InlineRef topicId="regional-anaesthesia" refLabel="AAGBI 2020" /><InlineRef topicId="regional-anaesthesia" refLabel="SFAR 2019 Antithrombotics & RA" />.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Low-risk blocks — superficial and compressible</p>
              <p className="text-sm text-muted-foreground mt-1">
                Interscalene, supraclavicular (with ultrasound), axillary, femoral, adductor canal, popliteal sciatic, saphenous, ankle, wrist, superficial cervical plexus, scalp block, fascia iliaca, TAP, rectus sheath, PECS and serratus plane. Bleeding is visible and compressible, and the consequence is a bruise rather than a neurological catastrophe. These may reasonably proceed on therapeutic anticoagulation or dual antiplatelet therapy after an individual risk–benefit discussion, using ultrasound, the smallest number of needle passes, avoiding a through-the-muscle trajectory, and documenting the rationale.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">High-risk blocks — deep, non-compressible or near a major vessel</p>
              <p className="text-sm text-muted-foreground mt-1">
                Lumbar plexus and psoas compartment, lumbar sympathetic, coeliac plexus, deep paravertebral, infraclavicular, obturator, proximal sciatic (Labat), retrobulbar and deep cervical plexus. Retroperitoneal or thoracic haemorrhage here can be occult and massive, and a lumbar plexus haematoma can cause a permanent femoral neuropathy — so these should be treated with the <strong className="text-foreground">same intervals as a neuraxial block</strong>.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Practical rules</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                <li>Catheter <em>removal</em> deserves the same thought as insertion — time it to the trough of anticoagulation, as for neuraxial catheters.</li>
                <li>Continuous catheters in a high-risk site carry ongoing risk and should generally follow neuraxial intervals throughout.</li>
                <li>Always consider whether a fascial plane block or simple multimodal analgesia would achieve the same goal at lower risk.</li>
                <li>Document the discussion, the alternative offered, and a post-block neurological and haemodynamic monitoring plan; a dense unexpected motor block or progressive pain demands urgent review and imaging.</li>
              </ul>
            </div>
          </div>

          <h3 id="pnb-adjuncts" className="text-lg font-serif font-semibold text-foreground mt-8 mb-2 scroll-mt-24">Adjuncts for Peripheral Nerve Blocks</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Dexamethasone</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>4–8 mg</strong> perineural (or the same dose intravenously) prolongs analgesic duration by roughly <strong>20–30 %</strong> — typically several hours with a long-acting local anaesthetic. Mechanism is thought to combine attenuation of the local inflammatory response with vasoconstriction and effects on potassium channels reducing nociceptive C-fibre firing. Intravenous administration achieves a very similar prolongation and avoids the off-licence perineural route, so it is often preferred; watch glycaemic control in diabetes
                <InlineRef topicId="regional-anaesthesia" refLabel="BJA Educ 2020 Adjuvants" />.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Alpha-2 agonists</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Clonidine 50–100 mcg</strong> or <strong>dexmedetomidine 25–50 mcg</strong> perineural extend both sensory and motor block by 2–3 hours. They act largely independently of α2 receptors on peripheral nerve, by blocking the <strong>hyperpolarisation-activated cation current (I<sub>h</sub>)</strong> so the nerve cannot repolarise back towards resting potential after an impulse. Dose-dependent <strong>sedation, hypotension and bradycardia</strong> limit their use, and dexmedetomidine is the more potent of the two.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Opioids</p>
              <p className="text-sm text-muted-foreground mt-1">
                Perineural opioids (including buprenorphine and fentanyl) are <strong>not recommended</strong>: peripheral nerve has few opioid receptors, benefit over the same dose given systemically is unproven, and there are concerns about neurotoxicity as well as the usual nausea, pruritus and sedation. This contrasts with <em>intrathecal</em> and <em>epidural</em> opioids, where spinal cord dorsal horn receptors make them highly effective.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Ketamine and others</p>
              <p className="text-sm text-muted-foreground mt-1">
                Perineural <strong>ketamine</strong> (NMDA antagonist) and agents such as midazolam, magnesium, tramadol and neostigmine have all been trialled, but psychomimetic effects, injection-site pain and concerns about neurotoxicity mean none is in routine use. <strong>Adrenaline 1:200,000–1:400,000</strong> remains useful mainly as an intravascular marker and to slow systemic absorption; avoid it where perfusion is precarious.
              </p>
            </div>
          </div>

          <h3 id="paediatric-regional" className="text-lg font-serif font-semibold text-foreground mt-8 mb-2 scroll-mt-24">Paediatric Regional Anaesthesia</h3>
          <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
            Paediatric blocks are usually placed <strong>after induction of general anaesthesia</strong>, are extremely safe in registry data, and are the mainstay of opioid-sparing analgesia in children
            <InlineRef topicId="regional-anaesthesia" refLabel="Anaesthesia 2021 Paed Regional" />.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Anatomical differences</p>
              <p className="text-sm text-muted-foreground mt-1">
                The <strong>conus medullaris ends at about L3</strong> in the neonate (L1 by ~1 year), and the dural sac ends at <strong>S3–S4</strong> rather than S2 — so neuraxial puncture must be performed low (L4/5 or L5/S1) and a caudal needle advanced only minimally. The <strong>sacral hiatus</strong> is easily palpable between the sacral cornua at the apex of an equilateral triangle with the posterior superior iliac spines, and is relatively more cephalad in infants. The epidural space is small with loose, unfused fat allowing easy cephalad spread of solution (and catheter threading from the caudal route in neonates), ligaments are softer so loss of resistance is subtle, and CSF volume per kg is much higher (≈4 ml/kg vs 2 ml/kg), which is why spinal doses per kg are larger and blocks shorter.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Pharmacological differences</p>
              <p className="text-sm text-muted-foreground mt-1">
                Larger <strong>volumes per kilogram</strong> are needed for equivalent spread, while <strong>toxicity risk is higher</strong>: neonates have reduced albumin and α1-acid glycoprotein (more free drug), immature hepatic CYP metabolism with slower clearance, and higher cardiac output speeding absorption. Use dilute solutions, respect a maximum of <strong>2 mg/kg levobupivacaine/bupivacaine</strong> (infusions ≤0.2 mg/kg/h in neonates, 0.4 mg/kg/h in older children), and remember that early toxicity signs are masked under anaesthesia — an unexplained arrhythmia or widening QRS may be the first sign. <strong>2-chloroprocaine</strong> (ester, plasma-cholinesterase hydrolysis, very short half-life) is increasingly used for neonatal epidural infusions precisely because it does not accumulate.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Common techniques</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Caudal epidural</strong> — the workhorse block for sub-umbilical surgery (circumcision, hypospadias, orchidopexy, inguinal hernia, lower limb). Lateral position, 22–23 G short-bevelled or cannula needle at 45° through the sacrococcygeal ligament, then flatten and advance a few millimetres only; confirm with ultrasound or the "whoosh"/swirl test and aspirate. Dose (Armitage): <strong>0.5 ml/kg</strong> of 0.25 % (or 0.125–0.25 %) bupivacaine/levobupivacaine for sacral, <strong>1 ml/kg</strong> for upper abdominal/mid-thoracic spread, maximum ~20 ml. <strong>Infant "awake" spinal</strong> — for ex-premature infants having inguinal hernia repair, avoiding airway instrumentation and postoperative apnoea: 0.5 % heavy bupivacaine <strong>0.5–1 mg/kg</strong>, lasting only 60–90 min, with strict avoidance of leg elevation (which can produce a high block). Peripheral blocks (ilioinguinal, penile, rectus sheath, brachial plexus, fascia iliaca) follow adult principles with ml/kg dosing.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Safety</p>
              <p className="text-sm text-muted-foreground mt-1">
                Placing blocks <strong>under general anaesthesia</strong> is accepted practice in children and, in large registry series, is not associated with excess neurological injury — the loss of patient report is offset by an immobile patient and the use of imaging. <strong>Ultrasound guidance</strong> improves block success and reduces the volume needed, and it is now standard for truncal and neuraxial blocks in infants; the Cochrane review found better success rates but no clear effect on rare severe complications. Always run a stop-before-you-block check, use test doses with adrenaline where appropriate, keep 20 % lipid emulsion immediately available with a weight-based LAST plan, and prescribe simple analgesia so the child is not left in pain as the block regresses
                <InlineRef topicId="regional-anaesthesia" refLabel="Cochrane 2019 US Blocks" />.
              </p>
            </div>
          </div>
        </div>


        <div id="complications" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Complications of Neuraxial Blockade</h2>
          <div className="space-y-2">
            {[
              { complication: "Post-dural puncture headache", incidence: "1–2% (spinal), higher with large-gauge/cutting needles", management: "Conservative → epidural blood patch (gold standard)" },
              { complication: "Epidural abscess", incidence: "1:10,000–1:50,000", management: "Urgent MRI, neurosurgical decompression within 12h, IV antibiotics" },
              { complication: "Epidural haematoma", incidence: "1:150,000 (epidural), 1:220,000 (spinal)", management: "Urgent MRI + decompression. Follow anticoagulation guidelines (AAGBI/ESRA)" },
              { complication: "Total spinal", incidence: "Rare — accidental intrathecal injection of epidural dose", management: "Cardiovascular support, intubation, await regression" },
            ].map((c) => (
              <div key={c.complication} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{c.complication}</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Incidence:</strong> {c.incidence}</p>
                <p className="text-xs text-muted-foreground"><strong>Management:</strong> {c.management}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-2">Recognising and Managing the Major Complications</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm">Vertebral canal haematoma</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Signs:</strong> sharp or severe back pain (often at the insertion level), a new or progressive motor or sensory deficit, a block that is denser or lasting longer than expected, and sphincter dysfunction (urinary retention, faecal incontinence).
                <strong> Timing:</strong> may present early but is frequently delayed 24–48 h, and can appear after catheter removal — hence the need for regular neurological observation on the ward.
                <strong> Immediate actions:</strong> stop all anticoagulants and antiplatelets, stop any epidural infusion so the block can regress and be reassessed, discuss urgently with neurosurgery, and arrange <strong>emergency MRI</strong> (CT only if MRI is unavailable) without waiting for the block to wear off. Surgical decompression within roughly <strong>8–12 h</strong> of the onset of deficit offers the best chance of neurological recovery
                <InlineRef topicId="regional-anaesthesia" refLabel="Anaesthesia 2018 Spinal Injury" />.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm">Spinal epidural abscess</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Classic triad:</strong> fever, back pain and neurological deficit (all three present in a minority — suspect it on back pain and fever alone).
                <strong> Risk factors:</strong> immunosuppression, diabetes, malignancy, chronic renal failure, intravenous drug use, bacteraemia, prolonged indwelling catheter and breaches of asepsis. Onset is typically days after the block.
                <strong> Investigation:</strong> WCC, CRP, blood cultures (before antibiotics where possible), catheter tip culture, and <strong>urgent MRI with contrast</strong>.
                <strong> Management:</strong> remove the catheter, start empirical intravenous antibiotics covering <em>Staphylococcus aureus</em> (including MRSA cover locally as indicated) after cultures, and refer immediately for neurosurgical drainage/decompression if there is any deficit or cord compression; conservative antibiotic therapy is only for selected patients without deficit under close monitoring
                <InlineRef topicId="regional-anaesthesia" refLabel="Anaesthesia 2018 Spinal Injury" />.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-card">
              <p className="font-semibold text-foreground text-sm">Total spinal anaesthesia</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Recognition:</strong> rapidly ascending block after intrathecal or subdural injection of an epidural dose — profound hypotension and bradycardia (T1–T4 cardiac sympathetic block), arm and hand weakness or tingling, difficulty speaking, dyspnoea then apnoea from intercostal and diaphragmatic paralysis, and loss of consciousness with pupillary dilatation.
                <strong> Management (ABC):</strong> call for help; 100 % oxygen, secure the airway and <strong>intubate and ventilate</strong>; treat hypotension aggressively with fluids, vasopressors (metaraminol/phenylephrine, escalating to adrenaline or noradrenaline infusion) and <strong>atropine</strong> or glycopyrronium for bradycardia; left lateral tilt in pregnancy and consider immediate delivery; maintain sedation once ventilated because the patient may be awake but paralysed; continue support until the block regresses (usually 1–3 h) and document/debrief afterwards.
              </p>
            </div>
          </div>


          <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-2">
            Anticoagulation & Bleeding Risk — Interactive Stratification
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
            Vertebral canal haematoma is the most feared neuraxial complication. The tool below cross-references the patient's antiplatelet/anticoagulant, time since last dose, platelet count, coagulation status and intended technique against the published intervals from the AAGBI <em>Regional anaesthesia and patients with abnormalities of coagulation</em> (2013) and ESAIC 2022 update.
          </p>
          <NeuraxialAnticoagRiskTool />

          <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">
            Post-op Anticoagulation Restart — Gantt Timeline
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
            Once surgery is complete, the question becomes <em>when can I safely restart?</em> Select the index drug, surgical bleeding risk and whether an epidural catheter remains in situ. The timeline shows the mandatory haemostasis window, safe catheter removal point, and earliest drug restart — with intervals derived from AAGBI 2013 and ESAIC 2022.
          </p>
          <AnticoagRestartTimeline />
        </div>
        {/* Block Height Assessment */}
        <div id="block-height" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Block Height Assessment Guide</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Systematic assessment of sensory block height is essential after neuraxial blockade to confirm adequacy for surgery, detect excessive spread, and monitor regression. Cold spray (ethyl chloride) is the standard bedside tool — it tests <strong>loss of cold sensation</strong>, which corresponds to <strong>C-fibre and Aδ-fibre blockade</strong> (small myelinated/unmyelinated fibres blocked earliest by local anaesthetics).
          </p>
          <div className="my-4">
            <SpinalBlockHeightAssessmentTool />
          </div>

          <div className="rounded-xl border border-border bg-card p-5 mb-4">
            <h3 className="font-semibold text-foreground mb-3">How to Test with Cold Spray</h3>
            <div className="space-y-3">
              {[
                { step: "1", action: "Establish a reference", detail: "Spray ethyl chloride on the patient's forearm or forehead — an unblocked area. Ask \"Does this feel cold?\" This calibrates their perception." },
                { step: "2", action: "Test systematically", detail: "Start from a blocked dermatome (e.g. abdomen) and move cranially until the patient reports cold sensation returning. Then test bilaterally to confirm symmetry." },
                { step: "3", action: "Document the level", detail: "Record the highest dermatome with loss of cold sensation bilaterally. Use anatomical landmarks (see table below)." },
                { step: "4", action: "Interpret differential block", detail: "Sympathetic block extends ~2 dermatomes above sensory level. Motor block is ~2 dermatomes below sensory level. Cold/pinprick (Aδ) > touch (Aβ) > motor (Aα)." },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{s.step}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{s.action}</p>
                    <p className="text-sm text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto mb-4">
            <h3 className="font-semibold text-foreground mb-3">Dermatome Landmarks for Block Height</h3>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Level</th>
                  <th className="text-left py-2 text-foreground font-semibold">Landmark</th>
                  <th className="text-left py-2 text-foreground font-semibold">Target Surgery</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">T4</td><td className="py-2">Nipple line</td><td className="py-2">Caesarean section (minimum level)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">T6</td><td className="py-2">Xiphisternum</td><td className="py-2">Upper abdominal surgery</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">T8</td><td className="py-2">Lower costal margin</td><td className="py-2">Appendicectomy, cholecystectomy</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">T10</td><td className="py-2">Umbilicus</td><td className="py-2">Hernia repair, lower abdominal</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">T12</td><td className="py-2">Pubic symphysis / inguinal ligament</td><td className="py-2">Hip surgery</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">L1</td><td className="py-2">Inguinal crease</td><td className="py-2">Femoral surgery</td></tr>
                <tr><td className="py-2 font-medium text-foreground">S1–S5</td><td className="py-2">Perineum / saddle area</td><td className="py-2">Perineal / urological procedures</td></tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 mb-4">
            <p className="text-sm font-semibold text-destructive">⚠ High Block Warning Signs</p>
            <p className="text-sm text-muted-foreground mt-1">
              Block above T4: cardioaccelerator fibres (T1–T4) blocked → bradycardia, hypotension. Above C3–C5: phrenic nerve → dyspnoea, inability to cough. C1–C2: total spinal → apnoea, unconsciousness, cardiovascular collapse — requires immediate intubation and vasopressor support.
            </p>
          </div>
        </div>

        {/* Bromage Scale */}
        <div id="bromage" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bromage Scale — Motor Block Assessment</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The modified Bromage scale grades motor blockade of the lower limbs. It is the standard tool for assessing motor block density and monitoring regression after neuraxial anaesthesia.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Grade</th>
                  <th className="text-left py-2 text-foreground font-semibold">Motor Function</th>
                  <th className="text-left py-2 text-foreground font-semibold">Clinical Test</th>
                  <th className="text-left py-2 text-foreground font-semibold">Block Degree</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">0</td>
                  <td className="py-2">Full flexion of hip, knee, and ankle</td>
                  <td className="py-2">Can perform straight leg raise</td>
                  <td className="py-2">No block</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">1</td>
                  <td className="py-2">Unable to raise extended leg; can flex knee</td>
                  <td className="py-2">Cannot straight leg raise, can bend knee</td>
                  <td className="py-2">Partial (33%)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">2</td>
                  <td className="py-2">Unable to flex knee; can dorsiflex ankle</td>
                  <td className="py-2">Cannot bend knee, can wiggle toes/flex foot</td>
                  <td className="py-2">Almost complete (66%)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">3</td>
                  <td className="py-2">No movement of lower limb</td>
                  <td className="py-2">Cannot move legs or feet at all</td>
                  <td className="py-2">Complete (100%)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Regression Times */}
        <div id="regression" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Expected Block Regression Times</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Block regression follows a predictable pattern: sympathetic function returns first, then sensory, then motor. Regression rate depends on the local anaesthetic used, dose, and adjuncts. The <strong>two-segment regression time</strong> (time for sensory level to drop by 2 dermatomes) is a key pharmacokinetic parameter.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Agent (Intrathecal)</th>
                  <th className="text-left py-2 text-foreground font-semibold">2-Segment Regression</th>
                  <th className="text-left py-2 text-foreground font-semibold">Complete Motor Recovery</th>
                  <th className="text-left py-2 text-foreground font-semibold">Discharge Readiness</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Heavy bupivacaine 0.5% (2.5–3 ml)</td>
                  <td className="py-2">60–90 min</td>
                  <td className="py-2">3–4 hours</td>
                  <td className="py-2">4–6 hours</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Prilocaine 2% (hyperbaric)</td>
                  <td className="py-2">40–60 min</td>
                  <td className="py-2">2–3 hours</td>
                  <td className="py-2">3–4 hours</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Lidocaine 5% (historic)</td>
                  <td className="py-2">30–45 min</td>
                  <td className="py-2">1.5–2 hours</td>
                  <td className="py-2">2–3 hours</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Chloroprocaine 1% (preservative-free)</td>
                  <td className="py-2">20–30 min</td>
                  <td className="py-2">60–90 min</td>
                  <td className="py-2">90–120 min</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">+ Intrathecal fentanyl 15–25 µg</td>
                  <td className="py-2">Adds 15–30 min to regression</td>
                  <td className="py-2">Minimal effect on motor</td>
                  <td className="py-2">Improves block quality</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Epidural Regression</p>
              <p className="text-sm text-muted-foreground mt-1">
                Continuous epidural infusion: block maintained as long as infusion running. After stopping: sensory regression 1–2 dermatomes/hour. Motor recovery 2–4 hours after cessation. Mobilisation criteria: Bromage 0, proprioception intact, haemodynamically stable.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Discharge Criteria (Day Case Spinal)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Bromage score 0 (full motor recovery). Intact proprioception. Voided urine (if applicable). Stable observations. No PDPH symptoms. Able to weight-bear independently.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SynthesisBlock
        title="Regional Anaesthesia — Block Choice & Safety"
        subtitle="High-yield checks before, during, and after every regional technique."
        variant="summary"
      >
        <ul className="space-y-2 list-disc list-inside text-sm">
          <li><strong>Stop-Before-You-Block</strong>: name, mark, side, allergies, anticoagulation, plan documented immediately before injection.</li>
          <li><strong>LA toxicity (LAST)</strong>: max safe doses (lidocaine 3 mg/kg plain / 7 with adrenaline; bupivacaine 2 mg/kg). Treat with 20% Intralipid 1.5 ml/kg bolus + 0.25 ml/kg/min infusion.</li>
          <li><strong>Neuraxial — anticoagulation</strong>: follow AAGBI 2013 — LMWH prophylactic 12 h gap, treatment 24 h; remove catheter only when coagulation back to baseline.</li>
          <li><strong>Block height assessment</strong>: cold (Aδ, C-fibres) — most reliable bedside test; pinprick = surgical anaesthesia; T4 needed for upper-abdominal surgery.</li>
          <li><strong>Ultrasound vs nerve stimulator</strong>: US improves block success rate (Cochrane 2019) and may reduce minor complications, though its effect on severe neurological complications is unclear. Combination with nerve stimulation is often used for deep blocks.</li>
          <li><strong>Adjuvants</strong>: dexamethasone (perineural or IV) prolongs analgesia; clonidine and dexmedetomidine prolong block but cause sedation/hypotension.</li>
        </ul>
      </SynthesisBlock>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Spinal vs epidural: spinal — small dose into CSF, rapid dense block, single shot; epidural — large dose into potential space, slow titratable block via catheter.",
              "Always perform stop-before-you-block and check side, level, anticoagulation and consent — wrong-side blocks are a 'never event'.",
              "Neuraxial anticoagulation timing (AAGBI): prophylactic LMWH 12 h before, treatment dose 24 h, DOACs 48–72 h depending on agent and renal function.",
              "Total spinal: rapid ascending block with bradycardia, hypotension and apnoea — treat with airway support, vasopressors, atropine and fluids.",
              "Use ultrasound + nerve stimulation for peripheral blocks; intraneural injection causes high pressures (>15 psi) — stop immediately.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Spinal & Epidural Anaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Concise, evidence-based answers to the questions trainees, candidates and patients most often ask about neuraxial blockade — onset, duration, complications, safety and contraindications.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {regionalFaqs.map(([q, a], i) => (
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
            <title>Spinal & Epidural Anaesthesia — FRCA Revision Notes</title>
            <meta
              name="description"
              content="Spinal anaesthesia explained for FRCA and FFICM: how it works, how long it lasts, side effects, PDPH, spinal vs epidural, anticoagulation timing, block height and bedside testing."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: regionalFaqs.map(([name, acceptedAnswer]) => ({
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

export default RegionalAnaesthesiaTopic;
