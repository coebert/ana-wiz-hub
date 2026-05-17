import { TopicTemplate } from "@/components/TopicTemplate";
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
        diagrams: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2018", "Matta et al."],
        diagrams: ["BJA Educ 2015"],
        workedExamples: ["BJA Educ 2018", "BJA Educ 2015"],
        keyPoints: ["BJA Educ 2018", "Matta et al.", "BJA Educ 2015"],
      }}
      diagrams={
        <>
          <CBFAutoregulationDiagram />
          <ICPVolumeCurveDiagram />
          <RaisedICPCascadeDiagram />
        </>
      }
      coreConcepts={
        <>
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cerebral Physiology for Anaesthesia</h2>
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
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CN_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthetic Effects on CBF & CMRO₂</h2>
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
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CC1.4"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICP Management</h2>
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
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Specific Neurosurgical Considerations</h2>
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
