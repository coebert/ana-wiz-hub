import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { neuroanaesthesiaQuestions } from "@/data/quizzes";
import CBFAutoregulationDiagram from "@/components/diagrams/CBFAutoregulationDiagram";
import ICPVolumeCurveDiagram from "@/components/diagrams/ICPVolumeCurveDiagram";
import { RaisedICPCascadeDiagram } from "@/components/diagrams/RaisedICPCascadeDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

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
              </div>
            </CollapsibleSubsection>
          </ExamSection>
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
