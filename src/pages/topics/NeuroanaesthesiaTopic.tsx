import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { neuroanaesthesiaQuestions } from "@/data/quizzes";
import CBFAutoregulationDiagram from "@/components/diagrams/clinical/CBFAutoregulationDiagram";
import ICPVolumeCurveDiagram from "@/components/diagrams/clinical/ICPVolumeCurveDiagram";
import { RaisedICPCascadeDiagram } from "@/components/diagrams/clinical/RaisedICPCascadeDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocItems = [
  { id: "physiology", label: "Cerebral physiology (CBF, ICP, CPP)", group: "Foundations" },
  { id: "agents", label: "Anaesthetic agents & CBF/CMRO₂", group: "Foundations" },
  { id: "icp", label: "Raised ICP management", group: "Clinical" },
  { id: "neurosurgical", label: "Posterior fossa & awake craniotomy", group: "Clinical" },
  { id: "procedures", label: "Procedure-specific anaesthesia", group: "Clinical" },
  { id: "tbi", label: "TBI & CPP targets", group: "Critical care" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

// SEO-targeted FAQ — answers the highest-volume UK neuroanaesthesia
// question keywords (CPP, raised ICP, mannitol vs hypertonic saline, VAE,
// awake craniotomy, RESCUEicp). Rendered as accordion + FAQPage JSON-LD.
const neuroFaqs: Array<[string, string]> = [
  [
    "What is cerebral perfusion pressure (CPP) and what is the target after TBI?",
    "Cerebral perfusion pressure is the net pressure driving blood through the brain and is calculated as CPP = MAP − ICP (or MAP − CVP if CVP is higher than ICP). Normal CPP is 70–90 mmHg. After traumatic brain injury, the Brain Trauma Foundation (BTF, 2016) recommends targeting CPP 60–70 mmHg in adults to balance ischaemia (CPP <60) against the risk of ARDS from aggressive fluid/vasopressor use (CPP >70). The arterial transducer must be zeroed at the tragus (external auditory meatus) — zeroing at the heart over-estimates CPP in a head-up patient.",
  ],
  [
    "How does PaCO₂ affect cerebral blood flow?",
    "PaCO₂ is the most potent physiological regulator of cerebral blood flow. CBF changes by approximately 30% (≈3 ml/100 g/min) for every 1 kPa change in PaCO₂ within the linear range of 3–7 kPa. Hypercapnia causes cerebral vasodilation, raises CBF and ICP, and is dangerous in any patient with reduced intracranial compliance. Hypocapnia causes vasoconstriction and is used as a short-term rescue for acute rises in ICP, but PaCO₂ <3.5 kPa risks cerebral ischaemia and should be avoided as a sustained strategy. The pragmatic target during neuro-anaesthesia is PaCO₂ 4.5–5.0 kPa (normocapnia), with brief hyperventilation to 4.0–4.5 kPa only as rescue.",
  ],
  [
    "What is the stepwise management of raised intracranial pressure?",
    "Tier 1 (general measures): head up 30°, neutral neck, loose tube ties, optimise sedation/analgesia (propofol ± remifentanil), control temperature (avoid pyrexia), maintain PaCO₂ 4.5–5.0 kPa, treat seizures, ensure CPP 60–70 mmHg. Tier 2 (medical escalation): osmotherapy with mannitol 0.25–1 g/kg or hypertonic saline (2.7% or 3% bolus, or 23.4% rescue), brief hyperventilation to PaCO₂ 4.0–4.5 kPa, neuromuscular blockade, and CSF drainage via external ventricular drain. Tier 3 (last-line): barbiturate coma (thiopentone burst-suppression), therapeutic hypothermia, and decompressive craniectomy. RESCUEicp showed decompressive craniectomy reduces mortality but increases survival with severe disability — informed consent is essential.",
  ],
  [
    "Mannitol or hypertonic saline for raised ICP — which is better?",
    "Both reduce ICP by creating an osmotic gradient that draws water out of brain tissue across an intact blood-brain barrier. Mannitol 0.25–1 g/kg acts within 15–30 minutes and lasts 4–6 hours. It causes osmotic diuresis, which is useful if the patient is fluid-overloaded but harmful in the hypovolaemic or shocked patient; check serum osmolality (stop if >320 mOsm/kg) and watch for rebound. Hypertonic saline (2.7%, 3%, or 23.4%) does not cause diuresis, expands intravascular volume, and is preferred in hypovolaemic or hypotensive TBI patients; limit serum sodium to <155 mmol/L. Recent meta-analyses suggest hypertonic saline may produce a greater ICP reduction. In practice both are first-line; choose based on volume status.",
  ],
  [
    "Why is N₂O avoided in neurosurgery?",
    "Nitrous oxide raises cerebral blood flow, CMRO₂, and ICP, and it readily diffuses into closed gas spaces faster than nitrogen leaves. After dural opening, residual air in the cranial cavity becomes a closed space; N₂O will expand any pneumocephalus and can cause tension pneumocephalus with neurological deterioration. N₂O is therefore avoided in any procedure involving dural opening (craniotomy, trans-sphenoidal surgery, posterior fossa surgery in sitting position) and during cases at risk of venous air embolism. Most centres now omit it altogether from elective neuroanaesthesia.",
  ],
  [
    "How is venous air embolism in sitting-position posterior fossa surgery managed?",
    "VAE is detected most sensitively by precordial Doppler (audible 'mill-wheel' or change in tone) and by a fall in end-tidal CO₂. TOE is even more sensitive but rarely used routinely. On suspicion: (1) tell the surgeon to flood the field with saline and pack the wound; (2) compress the jugular veins to raise venous pressure and stop further entrainment; (3) discontinue N₂O if used and increase FiO₂ to 1.0; (4) aspirate air from a multi-orifice right-atrial catheter (placed pre-op via the internal jugular and confirmed with ECG/TOE); (5) support haemodynamics — fluid, vasopressors, lower the head if possible; (6) cardiac arrest requires CPR with the patient flat and management as per ALS plus continued aspiration.",
  ],
  [
    "What is awake craniotomy and how is it conducted?",
    "Awake craniotomy is used for tumour resection or epilepsy surgery near eloquent cortex (speech, motor, sensory) where intra-operative cortical mapping is required. The two main techniques are asleep–awake–asleep (LMA/ETT with TIVA, woken for mapping, reanaesthetised) and monitored anaesthesia care (sedation throughout, typically remifentanil and dexmedetomidine or propofol target-controlled infusion). Essential components: meticulous scalp block (six nerves: supraorbital, supratrochlear, zygomaticotemporal, auriculotemporal, greater and lesser occipital) with long-acting local anaesthetic; head pinned to allow comfortable mapping; rescue airway plan (LMA + videolaryngoscope) for seizure or airway compromise; psychological preparation. Direct cortical stimulation maps function; seizures during mapping are treated with iced saline and short-acting benzodiazepine.",
  ],
  [
    "Which anaesthetic technique is best for elective craniotomy — TIVA or volatile?",
    "Both can be used safely. TIVA with propofol ± remifentanil preserves cerebral autoregulation, reduces CBF and ICP in parallel with CMRO₂, and is preferred whenever ICP is critical, when evoked potentials are monitored, or for any case requiring 'tight' brain conditions. Volatile agents up to 1 MAC (sevoflurane is the modern default) are acceptable for routine elective craniotomy with normal ICP — they maintain coupling at low dose. Above 1 MAC all volatiles are cerebral vasodilators and impair autoregulation, so this is the practical ceiling. Nitrous oxide is avoided regardless of the main agent.",
  ],
  [
    "What does the RESCUEicp trial tell us about decompressive craniectomy?",
    "RESCUEicp (NEJM 2016) randomised 408 adults with refractory raised ICP after TBI to decompressive craniectomy or continued medical therapy. At 6 months, craniectomy reduced mortality (26.9% vs 48.9%) but increased the proportion of survivors in a vegetative state or with severe disability. Overall, more patients in the surgical group survived with an unfavourable outcome. Combined with DECRA (2011), the message is that decompression is a life-saving but disability-preserving intervention — used as last-line rescue after all medical measures have failed, with explicit family discussion about the trade-off between survival and quality of life.",
  ],
  [
    "How is anaesthesia for mechanical thrombectomy in acute ischaemic stroke conducted?",
    "Mechanical thrombectomy is offered to selected patients with large-vessel occlusion within 6 hours of onset (or up to 24 hours with favourable imaging). The choice between conscious sedation and general anaesthesia is debated; the HERMES collaboration and SIESTA, AnStroke, and GOLIATH trials show no clear outcome difference if door-to-puncture delay is minimised. GA is preferred when the patient is agitated, has airway compromise, or is having a posterior-circulation stroke. Whichever technique, the haemodynamic principle is identical: avoid hypotension (SBP <140 mmHg is a common ceiling pre-recanalisation; <180 post-recanalisation to reduce reperfusion haemorrhage), avoid hypocapnia, use short-acting agents (propofol/remifentanil) for rapid neurological assessment, and ensure rapid induction so radiology is not delayed.",
  ],
];

const NeuroanaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Neuroanaesthesia"
      subtitle="FRCA / FFICM — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="neuroanaesthesia"
      quizQuestions={neuroanaesthesiaQuestions}
      objectives={[
        "Describe the determinants of cerebral blood flow, ICP, and cerebral perfusion pressure.",
        "Explain how anaesthetic agents and ventilation alter CBF, CMRO₂ and ICP.",
        "Outline a stepwise approach to raised ICP including osmotherapy and decompressive options.",
        "Recognise the specific risks of posterior fossa surgery, awake craniotomy, and pneumocephalus.",
        "Apply key trial evidence (RESCUEicp, BTF guidelines) to neurocritical care decisions.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CN_BK_03", "CC1.4"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2018", "Matta et al."],
        workedExamples: ["BJA Educ 2018", "BJA Educ 2015"],
        keyPoints: ["BJA Educ 2018", "Matta et al.", "BJA Educ 2015"],
      }}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />

          <div id="physiology" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["CN_BK_03"]}>
            <CollapsibleSubsection title="Cerebral Physiology for Anaesthesia" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Neuroanaesthesia is built on a small number of physiological levers — cerebral blood flow, intracranial pressure, and cerebral perfusion pressure — and how anaesthetic agents and ventilatory choices manipulate them.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Cerebral Blood Flow</p>
                <p className="text-sm text-muted-foreground mt-1">Normal CBF: 50 ml/100g/min. Autoregulated between MAP 60–150 mmHg. PaCO₂ is the most potent regulator — each 1 kPa change alters CBF by ~30%. Hypocapnia → vasoconstriction → ↓ICP.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Intracranial Pressure</p>
                <p className="text-sm text-muted-foreground mt-1">Normal ICP: 5–15 mmHg. CPP = MAP − ICP. Target CPP &gt;60 mmHg. Monro-Kellie doctrine: brain (80%), blood (10%), CSF (10%) — compensatory mechanisms exhaust rapidly.</p>
              </div>
            </div>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <CBFAutoregulationDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="agents" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["CN_BK_03"]}>
            <CollapsibleSubsection title="Anaesthetic Effects on CBF & CMRO₂">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                    <th className="text-left py-2 text-foreground font-semibold">CBF</th>
                    <th className="text-left py-2 text-foreground font-semibold">CMRO₂</th>
                    <th className="text-left py-2 text-foreground font-semibold">ICP</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Propofol</td><td>↓↓</td><td>↓↓</td><td>↓↓</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Thiopentone</td><td>↓↓</td><td>↓↓↓</td><td>↓↓↓ (used for burst suppression)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Sevoflurane</td><td>↑ (dose-dependent)</td><td>↓</td><td>↑ (acceptable &lt;1 MAC)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">N₂O</td><td>↑↑</td><td>↑</td><td>↑↑ (avoid in neurosurgery)</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Remifentanil</td><td>↓</td><td>↓</td><td>↓ (minimal effect)</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="icp" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]} curriculumCodes={["CC1.4"]}>
            <CollapsibleSubsection title="ICP Management">
            <div className="mb-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <ICPVolumeCurveDiagram />
            </div>
            <div className="mb-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <RaisedICPCascadeDiagram />
            </div>
            <div className="space-y-2">
              {[
                { step: "Head-up 30°", detail: "Improves venous drainage. Ensure head in neutral position — avoid jugular vein compression." },
                { step: "Ventilation: PaCO₂ 4.0–4.5 kPa", detail: "Mild hyperventilation reduces CBF. Aggressive hypocapnia (<3.5 kPa) risks ischaemia — avoid." },
                { step: "Osmotherapy", detail: "Mannitol 0.5–1 g/kg (osmotic diuresis, onset 15–30 min). Hypertonic saline 2.7–23.4% (no diuresis, maintains intravascular volume)." },
                { step: "Sedation", detail: "Propofol ± remifentanil to reduce CMRO₂. Thiopentone for refractory ICP (burst suppression)." },
                { step: "CSF drainage", detail: "EVD (external ventricular drain) — direct reduction of ICP. Gold standard for ICP monitoring." },
                { step: "Decompressive craniectomy", detail: "Last resort. RESCUEicp trial: reduces mortality but increases severe disability." },
              ].map((s) => (
                <div key={s.step} className="flex gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm whitespace-nowrap">{s.step}</span>
                  <span className="text-sm text-muted-foreground">{s.detail}</span>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="neurosurgical" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Specific Neurosurgical Considerations">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Posterior Fossa Surgery</p>
                <p className="text-sm text-muted-foreground mt-1">Risk of venous air embolism (sitting position). Brainstem compression — monitor respiratory pattern. Cranial nerve damage. Precordial Doppler most sensitive VAE detector.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Awake Craniotomy</p>
                <p className="text-sm text-muted-foreground mt-1">Eloquent cortex surgery (speech, motor). Asleep-awake-asleep technique. Scalp block + dexmedetomidine/remifentanil. Cortical mapping with direct electrical stimulation.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="procedures" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Procedure-Specific Anaesthesia">
              <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
                Each neurosurgical procedure imposes its own constraints on positioning, haemodynamic targets, airway access, and emergence. The cards below summarise the key anaesthetic considerations for the most commonly examined procedures.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground">Neurointerventional Radiology (coiling, thrombectomy, AVM embolisation)</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li><strong className="text-foreground">Environment:</strong> remote-site anaesthesia — radiation, limited access, contrast nephrotoxicity, cold angiography suite. Long extension lines and a dedicated anaesthetic machine/monitoring.</li>
                    <li><strong className="text-foreground">Technique:</strong> GA preferred for aneurysm coiling and AVM (absolute immobility, controlled PaCO₂). Conscious sedation or GA acceptable for thrombectomy — HERMES meta-analysis favours GA in centres with rapid induction; avoid &gt;10-min door-to-puncture delay.</li>
                    <li><strong className="text-foreground">Haemodynamics:</strong> SBP &lt;140 (or &lt;180 if recanalised) during thrombectomy to avoid reperfusion haemorrhage; tight BP control for ruptured aneurysm (MAP 70–90). Arterial line essential.</li>
                    <li><strong className="text-foreground">Heparinisation</strong> (ACT 2–3× baseline) during coiling — have protamine available. Manage contrast load, monitor for vessel perforation (sudden bradycardia/hypertension → Cushing response).</li>
                    <li><strong className="text-foreground">Emergence:</strong> smooth, hypertension-free; early neurological assessment.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground">Emergency Craniotomy (extradural / subdural haematoma, decompressive)</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li><strong className="text-foreground">Preop:</strong> rapid assessment — GCS, pupils, anticoagulation, C-spine clearance, associated injuries. Reverse warfarin (PCC + vitamin K), DOACs (idarucizumab/andexanet), platelets if antiplatelet + active bleeding.</li>
                    <li><strong className="text-foreground">Induction:</strong> RSI assuming full stomach. Modified RSI with fentanyl/remifentanil ± lidocaine to blunt laryngoscopy pressor response. Avoid suxamethonium-induced ICP rise only if alternatives feasible (rocuronium 1.2 mg/kg + sugammadex preferred).</li>
                    <li><strong className="text-foreground">Maintenance:</strong> TIVA (propofol/remifentanil) preserves autoregulation and avoids volatile-induced vasodilation. Normocapnia (PaCO₂ 4.5–5.0 kPa); brief hyperventilation only as rescue. CPP 60–70 mmHg with noradrenaline.</li>
                    <li><strong className="text-foreground">Surgical events:</strong> massive blood loss on dural opening (lose tamponade) — large-bore access, cross-matched blood, tranexamic acid (CRASH-3 within 3 h). Brain swelling: mannitol 0.5 g/kg or 2.7% saline, head-up, CSF drainage.</li>
                    <li><strong className="text-foreground">Postop:</strong> ventilated transfer to neuro-ICU; controlled emergence only if low-risk and surgeon agrees.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground">Emergency Decompression of Cauda Equina Syndrome</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li><strong className="text-foreground">Time-critical:</strong> NICE/BASS recommend decompression &lt;48 h from onset (ideally within 24 h of bladder dysfunction) — outcomes worsen with delay. Coordinate as a true emergency.</li>
                    <li><strong className="text-foreground">Preop:</strong> document neurology (saddle anaesthesia, anal tone, post-void residual), MRI confirmation, analgesia (often opioid-dependent), VTE risk vs surgical bleeding.</li>
                    <li><strong className="text-foreground">Positioning:</strong> prone — risk of ocular injury (POVL), pressure points, abdominal compression raising IVC pressure and surgical bleeding. Use a Montreal/Wilson frame; eyes free; arms &lt;90° abduction.</li>
                    <li><strong className="text-foreground">Anaesthetic:</strong> GA with ETT (reinforced), controlled ventilation. Avoid N₂O if dural opening expected. Maintain MAP &gt;65 mmHg to protect cord perfusion; some advocate higher MAP (80–85) for established cord injury.</li>
                    <li><strong className="text-foreground">Adjuncts:</strong> dexamethasone (anti-oedema, controversial in pure compression), local infiltration, multimodal analgesia (paracetamol, NSAID if no bleeding risk, opioids). Tranexamic acid for multilevel surgery.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground">Trans-Sphenoidal Pituitary Surgery</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li><strong className="text-foreground">Preop endocrine work-up:</strong> cortisol, TFTs, GH/IGF-1, prolactin, sex hormones, U&amp;E (DI/SIADH). Stress-dose hydrocortisone if hypopituitary or peri-op cortisol uncertain. Visual fields if optic chiasm compression.</li>
                    <li><strong className="text-foreground">Disease-specific issues:</strong>
                      <ul className="list-disc list-inside ml-5 mt-1">
                        <li><em>Acromegaly</em> — difficult airway (macroglossia, prognathism, subglottic narrowing), OSA, cardiomyopathy, HTN, diabetes. Plan for AFOI/videolaryngoscopy, smaller ETT.</li>
                        <li><em>Cushing's</em> — HTN, diabetes, obesity, fragile skin, OSA, electrolyte disturbance.</li>
                        <li><em>Prolactinoma</em> — usually medical (cabergoline); surgery if intolerant.</li>
                      </ul>
                    </li>
                    <li><strong className="text-foreground">Intra-op:</strong> oral RAE or south-facing ETT, throat pack (document insertion/removal), head slightly up and turned, surgeon uses nasal vasoconstrictor (cocaine/adrenaline) — anticipate hypertension and arrhythmia. TIVA or low-MAC volatile; remifentanil for tight BP control and bloodless field. Avoid N₂O (pneumocephalus risk).</li>
                    <li><strong className="text-foreground">Complications:</strong> CSF leak, carotid/cavernous sinus injury (massive haemorrhage), VAE, diabetes insipidus (intra-op or within 24 h — monitor UO and Na⁺), cranial nerve palsies, postoperative visual loss.</li>
                    <li><strong className="text-foreground">Emergence:</strong> remove throat pack, smooth extubation (avoid coughing → epistaxis/CSF leak), head-up nursing, avoid PPV with mask. Postop endocrine review; DDAVP for confirmed cranial DI.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground">Chronic Subdural Haematoma (burr-hole craniostomy)</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    An encapsulated collection of fluid and blood degradation products in the subdural space, now one of the commonest cranial operations in the UK. The first multidisciplinary UK guidelines cover the whole pathway from presentation to recovery and frame cSDH as a marker of frailty rather than an isolated surgical lesion <InlineRef topicId="neuroanaesthesia" refLabel="Br J Neurosurg 2024 cSDH" />.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li><strong className="text-foreground">Population:</strong> elderly (typically &gt;75 yr), frail, often on anticoagulants or antiplatelets, frequently after minor or unremembered head injury; alcohol excess and cerebral atrophy are risk factors.</li>
                    <li><strong className="text-foreground">Presentation:</strong> insidious and fluctuating — headache, confusion or cognitive decline, gait disturbance and falls, focal weakness, fluctuating GCS. Rapid deterioration mandates emergency imaging and drainage.</li>
                    <li><strong className="text-foreground">Preoperative:</strong> comprehensive geriatric assessment where available — frailty score, delirium screen, nutrition, medication review, ceilings of care and clarification of the resuscitation plan with family. Treat hyponatraemia, dehydration and infection.</li>
                    <li><strong className="text-foreground">Anticoagulation/antiplatelets:</strong> stop the agent; reverse warfarin with PCC + vitamin K, dabigatran with idarucizumab, factor Xa inhibitors with andexanet alfa or PCC; consider platelet transfusion/desmopressin only for active bleeding on antiplatelets. Surgery is usually not delayed for a normal platelet function test. Restart thromboprophylaxis and definitive anticoagulation according to indication and recurrence risk (commonly 4 weeks for atrial fibrillation, earlier for mechanical valves, in consultation with cardiology).</li>
                    <li><strong className="text-foreground">Anaesthetic technique:</strong> burr-hole craniostomy is short and superficial, so local anaesthetic infiltration ± low-dose sedation (target-controlled remifentanil, or small propofol boluses) is well tolerated and avoids intubation, hypotension and postoperative delirium in the frail. GA with a secured airway is chosen for confusion or agitation preventing cooperation, a low GCS, aspiration risk, or when craniotomy for a septated/organised collection is planned. Whichever technique: avoid hypotension (MAP within 20% of baseline), normocapnia, warming, and opioid-sparing multimodal analgesia (paracetamol ± local infiltration; avoid NSAIDs).</li>
                    <li><strong className="text-foreground">Surgical:</strong> burr-hole craniostomy with irrigation and a subdural drain is the standard for symptomatic collections; craniotomy is reserved for solid, recurrent or heavily membranous haematomas. Middle meningeal artery embolisation is an emerging adjunct. Dexamethasone is <em>not</em> recommended — the Dex-CSDH trial showed more unfavourable outcomes.</li>
                    <li><strong className="text-foreground">Postoperative:</strong> subdural drain typically for 24–48 h with flat or slightly head-down nursing, then early mobilisation; delirium prevention, falls and bone-health review, and rehabilitation planning. Recurrence occurs in roughly 10% and warrants clear discharge advice about returning symptoms.</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="tbi" className="scroll-mt-24">
            <ExamPitfallsCallout
              accent="clinical"
              pitfalls={[
                "CPP = MAP − ICP (or CVP if higher); maintain CPP 60–70 mmHg for adult TBI.",
                "Volatile agents are cerebral vasodilators >1 MAC — TIVA preferred when ICP is critical or for evoked-potential monitoring.",
                "Hyperventilation to PaCO₂ 4.0–4.5 kPa is a short-term ICP rescue only — prolonged hypocapnia worsens cerebral ischaemia.",
                "Mannitol 0.25–1 g/kg or hypertonic saline reduces ICP; check serum osmolality (<320) and sodium (<155) limits.",
                "Sitting craniotomy carries a high risk of venous air embolism — precordial Doppler and a right-atrial catheter for aspiration are standard.",
              ]}
            />
          </div>

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Neuroanaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Evidence-based answers to the questions FRCA Final and FFICM candidates most often ask about cerebral perfusion pressure, raised ICP, mannitol vs hypertonic saline, venous air embolism, awake craniotomy, RESCUEicp, and anaesthesia for mechanical thrombectomy.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {neuroFaqs.map(([q, a], i) => (
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
            <title>Neuroanaesthesia — CPP, raised ICP, awake craniotomy & TBI</title>
            <meta
              name="description"
              content="Neuroanaesthesia for FRCA Final and FFICM: cerebral blood flow and CPP targets, anaesthetic effects on CBF/CMRO₂, stepwise raised-ICP management (mannitol, hypertonic saline, RESCUEicp), posterior fossa and awake craniotomy, trans-sphenoidal surgery, and anaesthesia for mechanical thrombectomy."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: neuroFaqs.map(([name, acceptedAnswer]) => ({
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
          title: "Calculating CPP and titrating MAP after TBI",
          scenario: "A 32-year-old with severe TBI has ICP 24 mmHg and MAP 70 mmHg via arterial line. The neurosurgeon asks you to optimise cerebral perfusion.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>CPP = MAP − ICP = 70 − 24 = <strong>46 mmHg</strong> — below the BTF target of 60–70 mmHg.</li>
                <li>First, address ICP: head-up 30°, neutral neck, PaCO₂ 4.0–4.5 kPa, deepen sedation (propofol/remifentanil), consider 2.7% hypertonic saline 2 ml/kg.</li>
                <li>Simultaneously raise MAP with noradrenaline to a target CPP &gt;60 mmHg (so MAP ≥ 84 mmHg if ICP stays at 24).</li>
                <li>Reassess CPP after each intervention; if ICP refractory, escalate to mannitol 0.5 g/kg, EVD, or decompressive craniectomy (RESCUEicp).</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Aggressive hyperventilation (PaCO₂ &lt;3.5 kPa) — vasoconstriction can cause ischaemia.</li>
                  <li>Forgetting to zero the arterial transducer at the tragus (external auditory meatus) when measuring CPP.</li>
                  <li>Using volatile &gt;1 MAC — dose-dependent rise in CBF/ICP.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "CPP 46 mmHg → simultaneously lower ICP and raise MAP to achieve CPP 60–70 mmHg.",
          cites: ["BJA Educ 2015"],
        },
      ]}
      keyPoints={[
        { text: "PaCO₂ is the most potent regulator of CBF — each 1 kPa changes CBF by ~30%", cites: ["Matta et al."] },
        { text: "CPP = MAP − ICP; target CPP >60 mmHg in traumatic brain injury", cites: ["BJA Educ 2018"] },
        { text: "Propofol/thiopentone reduce CBF, CMRO₂, and ICP; volatiles increase CBF dose-dependently", cites: ["BJA Educ 2015"] },
        { text: "Avoid N₂O in neurosurgery — increases CBF, CMRO₂, and ICP; expands pneumocephalus", cites: ["Matta et al."] },
        { text: "RESCUEicp: decompressive craniectomy reduces mortality but increases severe disability", cites: ["BJA Educ 2018"] },
      ]}
    />
  );
};

export default NeuroanaesthesiaTopic;
