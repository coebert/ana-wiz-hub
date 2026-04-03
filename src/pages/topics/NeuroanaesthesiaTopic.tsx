import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { neuroanaesthesiaQuestions } from "@/data/quizzes";
import CBFAutoregulationDiagram from "@/components/diagrams/CBFAutoregulationDiagram";
import ICPVolumeCurveDiagram from "@/components/diagrams/ICPVolumeCurveDiagram";

const NeuroanaesthesiaTopic = () => {
  return (
    <SectionLayout title="Neuroanaesthesia" subtitle="FRCA / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cerebral Physiology for Anaesthesia</h2>
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
        </div>

        <CBFAutoregulationDiagram />

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>
      </section>

      <KeyLearningPoints points={[
        "PaCO₂ is the most potent regulator of CBF — each 1 kPa changes CBF by ~30%",
        "CPP = MAP − ICP; target CPP >60 mmHg in traumatic brain injury",
        "Propofol/thiopentone reduce CBF, CMRO₂, and ICP; volatiles increase CBF dose-dependently",
        "Avoid N₂O in neurosurgery — increases CBF, CMRO₂, and ICP; expands pneumocephalus",
        "RESCUEicp: decompressive craniectomy reduces mortality but increases severe disability",
      ]} />

      <QuizSection questions={neuroanaesthesiaQuestions} />
      <TopicCompletionToggle topicId="neuroanaesthesia" topicTitle="Neuroanaesthesia" />
    </SectionLayout>
  );
};

export default NeuroanaesthesiaTopic;
