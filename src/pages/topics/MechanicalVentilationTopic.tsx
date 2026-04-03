import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { VentilatorWaveformsDiagram } from "@/components/diagrams/VentilatorWaveformsDiagram";
import VentilatorWaveformsGuideDiagram from "@/components/diagrams/VentilatorWaveformsGuideDiagram";
import { mechanicalVentilationQuestions } from "@/data/quizzes";

const MechanicalVentilationTopic = () => {
  return (
    <SectionLayout title="Mechanical Ventilation" subtitle="FRCA Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Mechanical ventilation is the most common organ support in ICU. Understanding ventilator modes, lung-protective strategies, and weaning principles is essential for safe management of critically ill patients.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ventilator Waveforms</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Explore pressure and volume waveforms for the key ventilator modes.
          </p>
          <div className="rounded-xl border border-border bg-card p-4">
            <VentilatorWaveformsDiagram />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Ventilator Modes</h2>
          <div className="space-y-3">
            {[
              { mode: "Volume Control (VCV)", desc: "Set tidal volume and rate. Delivers constant flow. Pressure varies with compliance/resistance. Risk of barotrauma if compliance drops." },
              { mode: "Pressure Control (PCV)", desc: "Set inspiratory pressure and rate. Delivers decelerating flow. Volume varies. Better alveolar recruitment, more comfortable." },
              { mode: "Pressure Support (PSV)", desc: "Patient-triggered. Set support pressure, patient determines rate and Ti. Used for weaning. Requires intact respiratory drive." },
              { mode: "SIMV", desc: "Combines mandatory (VC or PC) breaths with spontaneous breathing. Reduces ventilator dyssynchrony. Less used for weaning now." },
              { mode: "APRV / BiLevel", desc: "Time-cycled alternating between high and low CPAP levels. Allows spontaneous breathing throughout. Used in ARDS for alveolar recruitment." },
            ].map((m) => (
              <div key={m.mode} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{m.mode}</p>
                <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Lung-Protective Ventilation</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The ARDSNet strategy reduces mortality by minimising ventilator-induced lung injury (VILI):
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Tidal Volume", value: "6 ml/kg IBW" },
              { label: "Plateau Pressure", value: "≤30 cmH₂O" },
              { label: "Driving Pressure", value: "≤15 cmH₂O (Pplat - PEEP)" },
              { label: "PEEP", value: "Titrate using FiO₂/PEEP table" },
              { label: "Permissive Hypercapnia", value: "Accept pH ≥7.20" },
              { label: "Target SpO₂", value: "88-95%" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Weaning</h2>
          <p className="text-muted-foreground leading-relaxed">
            Weaning accounts for ~40% of total ventilation time. Daily spontaneous breathing trials (SBT) using T-piece or low-level PSV (5-8 cmH₂O) are recommended. Assess readiness: resolving pathology, adequate oxygenation (FiO₂ ≤0.4, PEEP ≤8), haemodynamic stability, GCS ≥8. Rapid shallow breathing index (f/VT) &lt;105 predicts successful extubation.
          </p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "VCV guarantees volume; PCV guarantees pressure — know the trade-offs",
        "Lung-protective ventilation: 6 ml/kg IBW, Pplat ≤30, driving pressure ≤15",
        "Daily SBTs are the best strategy for weaning — do not delay",
        "RSBI (f/VT) <105 breaths/min/L predicts successful extubation",
        "Driving pressure (Pplat - PEEP) is the strongest predictor of ARDS mortality",
      ]} />

      <QuizSection questions={mechanicalVentilationQuestions} />
      <TopicCompletionToggle topicId="mechanical-ventilation" topicTitle="Mechanical Ventilation" />
    </SectionLayout>
  );
};

export default MechanicalVentilationTopic;
