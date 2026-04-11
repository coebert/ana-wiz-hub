import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { VentilatorWaveformsDiagram } from "@/components/diagrams/VentilatorWaveformsDiagram";
import VentilatorWaveformsGuideDiagram from "@/components/diagrams/VentilatorWaveformsGuideDiagram";
import APRVWaveformDiagram from "@/components/diagrams/APRVWaveformDiagram";
import APRVExpiratoryFlowDiagram from "@/components/diagrams/APRVExpiratoryFlowDiagram";
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
          <APRVWaveformDiagram />

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
          <APRVExpiratoryFlowDiagram />

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

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Advanced Ventilator Strategies</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When conventional lung-protective ventilation fails to achieve adequate gas exchange in severe ARDS (P/F ratio &lt;150 despite optimised PEEP and FiO₂), several rescue strategies should be considered. These are adjuncts to — not replacements for — standard lung-protective ventilation.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">Prone Positioning</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Prone positioning improves oxygenation by redistributing ventilation toward previously dependent (dorsal) lung regions, improving V/Q matching, and promoting homogeneous alveolar inflation. It also reduces compression of lung parenchyma by the heart and mediastinum.
          </p>
          <div className="space-y-3 mb-4">
            {[
              { label: "PROSEVA Trial (2013)", detail: "Landmark RCT in severe ARDS (P/F <150, FiO₂ ≥0.6, PEEP ≥5). Prone positioning ≥16 hours/day reduced 28-day mortality from 32.8% to 16% (NNT = 6). One of the largest mortality benefits of any ICU intervention." },
              { label: "Indications", detail: "Moderate-severe ARDS (P/F <150) within 12–24 hours of onset. Should be combined with lung-protective ventilation (6 ml/kg IBW) and often with neuromuscular blockade in the first 48 hours." },
              { label: "Duration & frequency", detail: "≥16 consecutive hours per session. Continue daily until P/F >150 on PEEP ≤10 and FiO₂ ≤0.6 in the supine position. Typically 3–5 days in responders." },
              { label: "Mechanism of benefit", detail: "Improved dorsal lung recruitment, more uniform transpulmonary pressure distribution, enhanced secretion drainage, reduced ventilator-induced lung injury (VILI) by homogenising lung strain." },
              { label: "Contraindications", detail: "Spinal instability, open abdomen, anterior chest burns, raised ICP (relative), haemodynamic instability requiring high-dose vasopressors (relative). Facial/airway oedema is a complication, not a contraindication." },
              { label: "Complications", detail: "Pressure injuries (face, chest, pelvis), accidental extubation (1–2%), ETT obstruction, transient haemodynamic instability on turning, corneal abrasion, brachial plexus injury. Meticulous team training and checklists reduce risk." },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">High-Frequency Oscillatory Ventilation (HFOV)</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            HFOV delivers very small tidal volumes (1–3 ml/kg) at frequencies of 3–15 Hz (180–900 breaths/min) around a constant mean airway pressure (mPaw). Gas exchange occurs by several mechanisms including direct alveolar ventilation, Taylor dispersion, pendelluft, and molecular diffusion.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            {[
              { label: "Mean Airway Pressure", value: "Set 3–5 cmH₂O above conventional mPaw", detail: "Provides sustained alveolar recruitment. The primary determinant of oxygenation." },
              { label: "Frequency", value: "3–6 Hz (adults)", detail: "Lower frequencies increase tidal volume and CO₂ clearance. Higher frequencies are more lung-protective." },
              { label: "Amplitude (ΔP)", value: "Titrate for visible chest wall vibration", detail: "Determines oscillatory volume. Increase ΔP to improve CO₂ clearance." },
              { label: "Inspiratory Time %", value: "33% (1:2 ratio)", detail: "Longer I-time improves oxygenation but risks air trapping." },
            ].map((s) => (
              <div key={s.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="font-semibold text-foreground text-sm">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.detail}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3 mb-4">
            {[
              { label: "OSCAR Trial (2013)", detail: "UK multicentre RCT, 795 patients with moderate-severe ARDS. No difference in 30-day mortality between HFOV and conventional ventilation (41.7% vs 41.1%). No benefit in any subgroup." },
              { label: "OSCILLATE Trial (2013)", detail: "Canadian multicentre RCT stopped early for harm. HFOV increased in-hospital mortality (47% vs 35%, RR 1.33) and increased vasopressor use. Higher mPaw may have caused haemodynamic compromise." },
              { label: "Current status", detail: "HFOV is no longer recommended for routine use in adult ARDS. May have a role as a last-resort rescue therapy when all other options (prone, ECMO) are unavailable or contraindicated. Remains useful in neonatal RDS." },
            ].map((e) => (
              <div key={e.label} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{e.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{e.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Inhaled Pulmonary Vasodilators</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Inhaled pulmonary vasodilators selectively dilate pulmonary vessels in ventilated lung regions, improving V/Q matching and oxygenation without systemic hypotension. They are rescue therapies for refractory hypoxaemia — they improve oxygenation but have no proven mortality benefit.
          </p>
          <div className="space-y-3 mb-4">
            {[
              { agent: "Inhaled Nitric Oxide (iNO)", mechanism: "Activates soluble guanylate cyclase → ↑cGMP → smooth muscle relaxation in ventilated alveoli. Rapidly inactivated by haemoglobin (no systemic effect). Dose 5–20 ppm (start low). Improves PaO₂ in ~60% of ARDS patients.", considerations: "Monitor methaemoglobin (keep <5%). Rebound pulmonary hypertension on abrupt withdrawal — wean gradually. Cost is significant (~£100–200/day). No mortality benefit in meta-analyses." },
              { agent: "Inhaled Epoprostenol (Flolan)", mechanism: "Prostacyclin analogue → ↑cAMP → pulmonary vasodilation and antiplatelet effects. Nebulised via inline circuit (10–50 ng/kg/min). Similar oxygenation improvement to iNO at a fraction of the cost.", considerations: "Shorter half-life (6 min) than iNO. May cause systemic hypotension at higher doses. Antiplatelet effect — caution with coagulopathy. Less rebound risk than iNO. Often used as first-line inhaled vasodilator due to cost." },
              { agent: "Inhaled Iloprost", mechanism: "Stable prostacyclin analogue with longer duration of action (60–90 min). Intermittent nebulisation (2.5–5 μg every 2–4 hours). Used more commonly for pulmonary hypertension than ARDS.", considerations: "Longer-acting allows intermittent dosing. Less experience in ARDS than iNO or epoprostenol. May be useful in right ventricular failure with pulmonary hypertension." },
            ].map((a) => (
              <div key={a.agent} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{a.agent}</p>
                <p className="text-sm text-muted-foreground mt-1">{a.mechanism}</p>
                <p className="text-sm text-muted-foreground mt-2 italic">{a.considerations}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Stepwise Rescue Strategy in Refractory ARDS</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Optimise lung-protective ventilation (Vt 6 ml/kg, Pplat ≤30, high PEEP strategy)</li>
            <li>Neuromuscular blockade (cisatracurium for 48 hours — ACURASYS trial)</li>
            <li><span className="font-semibold text-foreground">Prone positioning ≥16 hours/day</span> — strongest evidence, do not skip</li>
            <li>Inhaled pulmonary vasodilator (epoprostenol or iNO) as oxygenation bridge</li>
            <li>Consider ECMO referral if P/F &lt;80 for &gt;6 hours or pH &lt;7.20 with Pplat &gt;30 despite above</li>
          </ol>
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
        "PROSEVA: prone ≥16 hrs/day reduced 28-day mortality from 33% to 16% in severe ARDS (NNT 6)",
        "OSCAR + OSCILLATE: HFOV shows no benefit (and possible harm) in adult ARDS",
        "Inhaled vasodilators (iNO, epoprostenol) improve oxygenation but have no mortality benefit",
        "Rescue ladder: optimise LPV → NMB → prone → inhaled vasodilator → consider ECMO",
      ]} />

      <QuizSection questions={mechanicalVentilationQuestions} />
      <ReferencesList topicId="mechanical-ventilation" />

      <SeeAlso topicId="mechanical-ventilation" />
        <TopicCompletionToggle topicId="mechanical-ventilation" topicTitle="Mechanical Ventilation" />
    </SectionLayout>
  );
};

export default MechanicalVentilationTopic;
