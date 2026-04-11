import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { VentilatorWaveformsDiagram } from "@/components/diagrams/VentilatorWaveformsDiagram";
import VentilatorWaveformsGuideDiagram from "@/components/diagrams/VentilatorWaveformsGuideDiagram";
import { mechanicalVentilationQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

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

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Airway Pressure Release Ventilation (APRV)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            APRV is a time-cycled, pressure-limited mode that maintains a prolonged high airway pressure (P<sub>high</sub>) to recruit and hold open alveoli, with brief intermittent releases to a low pressure (P<sub>low</sub>) to allow CO₂ clearance. Crucially, the patient can breathe spontaneously throughout the entire cycle, which preserves diaphragmatic tone, improves V/Q matching, and reduces sedation requirements.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">Ventilator Settings</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { label: "P high", value: "20–35 cmH₂O", detail: "Set to previous plateau pressure. Provides mean airway pressure and recruits alveoli." },
              { label: "P low", value: "0 cmH₂O (usually)", detail: "Set to zero to maximise pressure gradient and expiratory flow. Intrinsic PEEP maintained by short T low." },
              { label: "T high", value: "4–6 seconds", detail: "Duration at P high. Long T high promotes alveolar recruitment and oxygenation. Adjusted to improve PaO₂." },
              { label: "T low", value: "0.5–0.8 seconds", detail: "Brief release time. Set so expiratory flow terminates at 50–75% of peak expiratory flow rate (PEFR) to maintain auto-PEEP and prevent derecruitment." },
              { label: "FiO₂", value: "Titrate to SpO₂ 88–95%", detail: "Wean FiO₂ before reducing P high. Target lowest effective FiO₂." },
              { label: "Releases/min", value: "8–12", detail: "Determined by T high + T low cycle. Provides the 'ventilation' component for CO₂ removal." },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="font-semibold text-foreground text-sm">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Setting T<sub>low</sub> — The Critical Variable</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            T<sub>low</sub> is the most important and nuanced setting in APRV. It must be short enough to prevent complete alveolar emptying (maintaining intrinsic PEEP of ~5–10 cmH₂O) but long enough to allow adequate CO₂ elimination. The target is termination of expiratory flow at <span className="font-semibold text-foreground">50–75% of peak expiratory flow rate</span>. If the expiratory flow reaches zero, alveoli have fully deflated and derecruitment occurs — the T<sub>low</sub> is too long.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">Weaning from APRV</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            APRV is weaned by a "drop and stretch" method, progressively transitioning toward CPAP:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-4">
            <li><span className="font-semibold text-foreground">Reduce P<sub>high</sub></span> by 2 cmH₂O increments every 4–8 hours (the "drop") — reduces the pressure difference between phases</li>
            <li><span className="font-semibold text-foreground">Extend T<sub>high</sub></span> by 0.5–2 second increments (the "stretch") — reduces the number of releases per minute</li>
            <li>Maintain T<sub>low</sub> to keep expiratory flow termination at 50–75% PEFR</li>
            <li>When P<sub>high</sub> reaches ~10–12 cmH₂O with only 1–2 releases/min, the patient is effectively on CPAP</li>
            <li>Convert to CPAP 5–10 cmH₂O with pressure support, then proceed to standard extubation assessment</li>
          </ol>

          <h3 className="text-lg font-semibold text-foreground mb-2">Evidence Base</h3>
          <div className="space-y-3">
            {[
              { study: "Physiological rationale", detail: "Spontaneous breathing during APRV improves dependent lung aeration (CT studies), increases functional residual capacity, and improves cardiac output compared to paralysis + conventional ventilation. Diaphragmatic contraction redistributes ventilation to dependent zones." },
              { study: "Observational data", detail: "Retrospective studies and meta-analyses suggest APRV may improve oxygenation (P/F ratio) and reduce ICU length of stay compared to conventional ventilation. Some data suggest lower sedation requirements and shorter duration of mechanical ventilation." },
              { study: "RCT evidence", detail: "High-quality RCT evidence is limited. The largest trials show improved oxygenation but no consistent mortality benefit. The 2023 Cochrane review concluded insufficient evidence to recommend APRV over conventional lung-protective ventilation in ARDS." },
              { study: "Concerns & controversies", detail: "Tidal volumes during spontaneous breathing are difficult to measure and may exceed 6 ml/kg IBW, potentially violating lung-protective principles. Vigorous spontaneous efforts may generate high transpulmonary pressures causing patient self-inflicted lung injury (P-SILI). Not suitable for patients requiring deep sedation or paralysis." },
              { study: "Current position", detail: "APRV is considered a rescue or alternative strategy for refractory hypoxaemia in ARDS. It is not recommended as a first-line mode by major guidelines (ARDS Clinical Network, FICM/ICS). Best evidence supports its use in early, non-severe ARDS with preserved spontaneous breathing." },
            ].map((e) => (
              <div key={e.study} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{e.study}</p>
                <p className="text-sm text-muted-foreground mt-1">{e.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <VentilatorWaveformsGuideDiagram />

      <KeyLearningPoints points={[
        "VCV guarantees volume; PCV guarantees pressure — know the trade-offs",
        "Lung-protective ventilation: 6 ml/kg IBW, Pplat ≤30, driving pressure ≤15",
        "Daily SBTs are the best strategy for weaning — do not delay",
        "RSBI (f/VT) <105 breaths/min/L predicts successful extubation",
        "Driving pressure (Pplat - PEEP) is the strongest predictor of ARDS mortality",
        "APRV uses prolonged P high for recruitment with brief releases for CO₂ clearance",
        "T low is set so expiratory flow terminates at 50–75% of PEFR — prevents derecruitment",
        "APRV weaning uses 'drop and stretch' — reduce P high, extend T high toward CPAP",
        "No consistent RCT mortality benefit for APRV over conventional lung-protective ventilation",
      ]} />

      <QuizSection questions={mechanicalVentilationQuestions} />
      <ReferencesList topicId="mechanical-ventilation" />

      <SeeAlso topicId="mechanical-ventilation" />
        <TopicCompletionToggle topicId="mechanical-ventilation" topicTitle="Mechanical Ventilation" />
    </SectionLayout>
  );
};

export default MechanicalVentilationTopic;
