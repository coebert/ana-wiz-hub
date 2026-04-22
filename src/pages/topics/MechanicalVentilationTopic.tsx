import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { StickyTOC } from "@/components/StickyTOC";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { VentilatorWaveformsDiagram } from "@/components/diagrams/VentilatorWaveformsDiagram";
import VentilatorWaveformsGuideDiagram from "@/components/diagrams/VentilatorWaveformsGuideDiagram";
import APRVWaveformDiagram from "@/components/diagrams/APRVWaveformDiagram";
import APRVExpiratoryFlowDiagram from "@/components/diagrams/APRVExpiratoryFlowDiagram";
import { mechanicalVentilationQuestions } from "@/data/quizzes";
import type { WorkedExample } from "@/components/WorkedExamples";

const objectives = [
  "Recognise the four indications for invasive ventilation and pick an initial mode based on the dominant pathology.",
  "Apply the equation of motion to interpret peak vs plateau pressure, compliance, resistance and auto-PEEP at the bedside.",
  "Deliver lung-protective ventilation (Vt 6 mL/kg PBW, Pplat ≤ 30, ΔP ≤ 15) and explain the four mechanisms of VILI.",
  "Identify common dyssynchrony patterns on pressure/flow waveforms and adjust trigger, flow or cycle settings.",
  "Set up and wean APRV using P high, T low and the 50–75 % PEFR rule.",
  "Run paired daily SAT + SBT, predict extubation failure (cuff leak, RSBI, TFdi) and manage post-extubation respiratory failure.",
  "Prevent and recognise VAP/VAE, ICUAW, VIDD and post-intensive-care syndrome (PICS).",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Driving pressure & lung-protective settings in ARDS",
    scenario:
      "65-year-old, 80 kg actual / PBW 70 kg, P/F ratio 12 kPa on FiO₂ 0.8. VCV: Vt 550 mL, RR 22, PEEP 10, Pplat 32, Ppeak 38. Are settings lung-protective?",
    working:
      "Vt/PBW = 550/70 = 7.9 mL/kg (above 6 mL/kg target). ΔP = Pplat − PEEP = 32 − 10 = 22 cmH₂O (above 15 cmH₂O ceiling — strongest mortality predictor, Amato 2015). Pplat 32 > 30. Resistance = (38 − 32)/Flow — acceptable. Compliance = 550/(32 − 10) = 25 mL/cmH₂O (severe ARDS).",
    answer:
      "Reduce Vt to 420 mL (6 mL/kg PBW), recheck Pplat. If ΔP still > 15, increase PEEP per FiO₂/PEEP table to recruit (lower ΔP for same Vt) and accept permissive hypercapnia (pH ≥ 7.20). If P/F < 13.3 kPa persists despite optimisation → NMB (ACURASYS), prone ≥ 16 h/day (PROSEVA), then ECMO (EOLIA/Combes).",
  },
  {
    title: "Auto-PEEP in severe asthma",
    scenario:
      "Status asthmaticus, VCV Vt 500, RR 20, I:E 1:2, PEEP 5. BP drops from 110/70 → 75/40 within 10 min of intubation. Expiratory hold reveals total PEEP 18 cmH₂O.",
    working:
      "Auto-PEEP = total PEEP − set PEEP = 18 − 5 = 13 cmH₂O. Long time constant (high resistance) → incomplete expiration → dynamic hyperinflation → ↓ venous return → hypotension. Risk of barotrauma.",
    answer:
      "Disconnect from ventilator briefly to allow exhalation (BP usually rises). Reduce RR to 8–10, prolong expiratory time (I:E 1:4 or 1:5), keep Vt 6 mL/kg, accept hypercapnia (pH ≥ 7.15). Bronchodilators (salbutamol, ipratropium, magnesium, ketamine), deep sedation ± NMB. Recheck total PEEP after each change.",
  },
  {
    title: "Predicting extubation success",
    scenario:
      "Day 6 of MV for pneumonia. SAT passed. SBT on PSV 5/PEEP 5 for 30 min: RR 24, Vt 380 mL, HR 95, SpO₂ 96 % on FiO₂ 0.4. Cuff leak 90 mL. RSBI?",
    working:
      "RSBI = RR/Vt(L) = 24 / 0.38 = 63 (< 105 favours success). Cuff leak < 110 mL predicts post-extubation stridor. SBT physiologically passed. Risk-stratify high.",
    answer:
      "Pass SBT but high stridor risk — give dexamethasone 4 mg IV every 6 h for 12–24 h pre-extubation (Cochrane). Extubate to HFNO (or NIV if hypercapnic/cardiac), have reintubation kit at the bedside. Monitor ROX index (SpO₂/FiO₂)/RR — ≥ 4.88 at 2/6/12 h predicts HFNO success.",
  },
  {
    title: "APRV T low titration",
    scenario:
      "Refractory hypoxaemia switched to APRV: P high 28, P low 0, T high 5 s, T low 0.6 s. PEFR 60 L/min, end-expiratory flow 12 L/min.",
    working:
      "Termination ratio = end-expiratory / peak = 12/60 = 20 %. Target is 50–75 % to maintain intrinsic PEEP and prevent derecruitment. T low is too long — flow has dropped too far before release ends.",
    answer:
      "Shorten T low (e.g. 0.6 → 0.4 s) and recheck — termination should fall in the 50–75 % PEFR window. Wean by 'drop and stretch': reduce P high by 2 cmH₂O and lengthen T high every 4–8 h until P high ≈ 10 → CPAP/PSV.",
  },
];

const keyPoints = [
  "VCV guarantees volume; PCV guarantees pressure — know the trade-offs",
  "Lung-protective ventilation: 6 ml/kg IBW, Pplat ≤30, driving pressure ≤15",
  "Daily SBTs are the best strategy for weaning — do not delay",
  "Driving pressure (Pplat − PEEP) is the strongest predictor of ARDS mortality",
  "APRV uses prolonged P high for recruitment with brief releases for CO₂ clearance; titrate T low to 50–75 % PEFR",
  "PROSEVA: prone ≥16 hrs/day reduced 28-day mortality from 33% to 16% (NNT 6)",
  "VAP prevention: HOB elevation, daily sedation hold, subglottic drainage, cuff pressure 20–30",
  "Cuff leak <110 mL predicts stridor — give prophylactic steroids 12–24h pre-extubation",
  "HFNO: dead space washout + ~1 cmH₂O PEEP per 10 L/min; ROX index ≥4.88 predicts success",
  "VIDD begins within 18–69 hours of CMV — diaphragm loses ~6% thickness per day",
  "TFdi >30% predicts successful extubation; TFdi <20% predicts weaning failure",
  "ICUAW: MRC sum score <48/60 confirms diagnosis; CIP has reduced SNAPs, CIM has normal SNAPs",
  "Early mobilisation within 48–72h improves functional independence (Schweickert: 59% vs 35%)",
  "PICS affects 50–70% of ICU survivors across physical, cognitive, and psychological domains",
  "Delirium duration is the strongest modifiable risk factor for cognitive PICS (BRAIN-ICU)",
  "ABCDEF bundle: pain, SAT/SBT, sedation choice, delirium, early mobility, family engagement",
  "Rescue ladder: optimise LPV → NMB → prone → inhaled vasodilator → consider ECMO",
];

const tocItems = [
  { id: "toc-introduction", label: "Indications" },
  { id: "toc-mechanics", label: "Mechanics" },
  { id: "toc-modes", label: "Modes" },
  { id: "toc-lung-protective", label: "LPV & VILI" },
  { id: "toc-dyssynchrony", label: "Dyssynchrony" },
  { id: "toc-aprv", label: "APRV" },
  { id: "toc-advanced", label: "Advanced" },
  { id: "toc-vap", label: "VAP / VAE" },
  { id: "toc-tracheostomy", label: "Tracheostomy" },
  { id: "toc-weaning", label: "Weaning & Extubation" },
  { id: "toc-hfno-niv", label: "HFNO / NIV" },
  { id: "toc-longterm", label: "Long-term" },
];

const MechanicalVentilationTopic = () => {
  return (
    <TopicTemplate
      title="Mechanical Ventilation"
      subtitle="FRCA Final / FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="mechanical-ventilation"
      topicTitle="Mechanical Ventilation"
      quizQuestions={mechanicalVentilationQuestions}
      coreConcepts={
    <>
      <StickyTOC items={tocItems} />
      <section className="space-y-6 mb-10">
        {/* ───── 1. Indications ───── */}
        <ExamSection id="toc-introduction" exams={["final", "fficm", "edic"]} className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">1. Indications for Invasive Ventilation</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Mechanical ventilation is the most common organ support in ICU. Indications fall into four overlapping groups — recognising the dominant problem guides initial mode and settings.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Category</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                  <th className="text-left py-2 text-foreground font-semibold">Examples</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Type 1 (hypoxaemic) failure</td><td>PaO₂ &lt; 8 kPa on FiO₂ ≥ 0.6 — V/Q mismatch, shunt</td><td>ARDS, severe pneumonia, pulmonary oedema, PE</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Type 2 (hypercapnic) failure</td><td>PaCO₂ &gt; 6.5 kPa with acidosis — alveolar hypoventilation</td><td>COPD exacerbation, severe asthma, opioid overdose, neuromuscular weakness</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Airway protection</td><td>GCS ≤ 8 or loss of protective reflexes</td><td>TBI, status epilepticus, intoxication, anaphylaxis</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Reduce work of breathing / metabolic demand</td><td>Offload respiratory muscles to redirect O₂ delivery</td><td>Severe sepsis, cardiogenic shock, post-cardiac arrest, raised ICP requiring controlled PaCO₂</td></tr>
              </tbody>
            </table>
          </div>
        </ExamSection>

        {/* ───── 2. Respiratory mechanics ───── */}
        <ExamSection id="toc-mechanics" exams={["final", "fficm", "edic"]} className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">2. Respiratory Mechanics on the Ventilator</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Every ventilator setting is an attempt to deliver gas against the patient's <strong>compliance</strong> and <strong>resistance</strong>. The equation of motion summarises this:
          </p>
          <div className="rounded-lg bg-muted/40 p-3 font-mono text-sm text-foreground mb-4 text-center">
            P<sub>airway</sub> = (V<sub>T</sub> / C<sub>RS</sub>) + (Flow × R<sub>aw</sub>) + PEEP<sub>tot</sub>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="font-semibold text-foreground text-sm mb-1">Compliance (C)</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Static C<sub>RS</sub></strong> = V<sub>T</sub> / (P<sub>plat</sub> − PEEP<sub>tot</sub>). Normal 60–100 mL/cmH₂O; ARDS 20–40. <strong>Dynamic C</strong> uses peak pressure and is lower (includes resistive component).
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="font-semibold text-foreground text-sm mb-1">Resistance (R<sub>aw</sub>)</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                R<sub>aw</sub> = (P<sub>peak</sub> − P<sub>plat</sub>) / Flow. Normal &lt; 10 cmH₂O/L/s. Raised in bronchospasm, secretions, kinked ETT, small ETT (Hagen-Poiseuille — radius⁴).
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="font-semibold text-foreground text-sm mb-1">Time constant (τ)</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                τ = R × C. 95% of inflation/emptying takes 3τ. Long τ (high R, e.g. asthma) → slow expiration → risk of <strong>auto-PEEP</strong>.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="font-semibold text-foreground text-sm mb-1">Auto-PEEP / intrinsic PEEP</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Detected by an <strong>expiratory hold</strong>. Causes hypotension (↓venous return), barotrauma, dyssynchrony. Treat: ↓RR, ↑ expiratory time (I:E 1:3 or longer), bronchodilators, sedation.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="font-semibold text-foreground text-sm mb-1">Driving pressure (ΔP)</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                ΔP = P<sub>plat</sub> − PEEP = V<sub>T</sub> / C<sub>RS</sub>. <strong>&lt; 15 cmH₂O</strong>. Strongest single mortality predictor in ARDS (Amato, NEJM 2015).
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="font-semibold text-foreground text-sm mb-1">Transpulmonary pressure (P<sub>L</sub>)</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                P<sub>L</sub> = P<sub>alv</sub> − P<sub>pleural</sub> (oesophageal balloon). True distending pressure — useful in obesity, ascites, chest wall stiffness where P<sub>plat</sub> overestimates lung stress.
              </p>
            </div>
          </div>
        </ExamSection>

        <ExamSection exams={["final", "fficm", "edic"]}>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">3. Ventilator Waveforms</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Explore pressure, flow and volume waveforms for the key ventilator modes — pattern recognition is core to bedside dyssynchrony detection.
          </p>
          <div className="rounded-xl border border-border bg-card p-4">
            <VentilatorWaveformsDiagram />
          </div>
        </ExamSection>

        {/* ───── 4. Modes ───── */}
        <ExamSection id="toc-modes" exams={["final", "fficm", "edic"]} className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">4. Ventilator Modes</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Every breath is defined by three variables: <strong>trigger</strong> (what starts it), <strong>limit / target</strong> (what controls it during inspiration), and <strong>cycle</strong> (what ends it).
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Mode</th>
                  <th className="text-left py-2 text-foreground font-semibold">Trigger</th>
                  <th className="text-left py-2 text-foreground font-semibold">Limit</th>
                  <th className="text-left py-2 text-foreground font-semibold">Cycle</th>
                  <th className="text-left py-2 text-foreground font-semibold">Best for</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">VCV</td><td>Time / patient</td><td>Flow (constant)</td><td>Volume</td><td>Guaranteed minute volume; ARDSNet protocol</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">PCV</td><td>Time / patient</td><td>Pressure (decelerating flow)</td><td>Time</td><td>Limits airway pressure; better recruitment; paeds</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">PRVC / Autoflow</td><td>Time / patient</td><td>Pressure (adjusted to deliver target Vt)</td><td>Time</td><td>Volume guarantee with pressure-limited safety</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">PSV</td><td>Patient (flow/pressure)</td><td>Pressure</td><td>Flow (% of peak — usually 25%)</td><td>Spontaneous mode; weaning</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">SIMV ± PS</td><td>Mixed (mandatory + spontaneous)</td><td>Volume or pressure</td><td>Volume / time / flow</td><td>Largely historical — associated with prolonged weaning</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">APRV / BiLevel</td><td>Time + spontaneous overlay</td><td>Pressure (P<sub>high</sub> / P<sub>low</sub>)</td><td>Time (T<sub>high</sub> → T<sub>low</sub>)</td><td>Refractory hypoxaemia; spontaneous breathing throughout</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">NAVA</td><td>Diaphragmatic EMG (Edi catheter)</td><td>Pressure proportional to Edi</td><td>Drop in Edi</td><td>Improved synchrony; weaning; paediatrics</td></tr>
                <tr><td className="py-2 font-medium text-foreground">PAV+</td><td>Patient effort</td><td>Pressure proportional to instantaneous flow & volume</td><td>End of patient effort</td><td>Synchronous proportional support; weaning</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Aside: SIMV is no longer recommended for routine weaning (Brochard 1994; Esteban 1995) — direct PSV or T-piece SBTs are superior.
          </p>
        </ExamSection>

        {/* ───── 5. LPV & VILI ───── */}
        <ExamSection id="toc-lung-protective" exams={["final", "fficm", "edic"]} className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">5. Lung-Protective Ventilation & VILI</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            VILI is the iatrogenic injury produced by mechanical ventilation. The ARDSNet bundle limits the four mechanisms below and reduces mortality by ~9% absolute (NEJM 2000).
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="font-semibold text-foreground text-sm">Volutrauma</p>
              <p className="text-xs text-muted-foreground">Over-distension by excessive V<sub>T</sub> — the dominant injury (animal models: high-V<sub>T</sub>/low-pressure injures, low-V<sub>T</sub>/high-pressure does not).</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="font-semibold text-foreground text-sm">Barotrauma</p>
              <p className="text-xs text-muted-foreground">High transpulmonary pressure → pneumothorax, pneumomediastinum, surgical emphysema. Limit P<sub>plat</sub> &lt; 30 cmH₂O.</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="font-semibold text-foreground text-sm">Atelectrauma</p>
              <p className="text-xs text-muted-foreground">Repeated alveolar opening/closing → shear injury. Prevent with adequate PEEP keeping alveoli open through expiration.</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="font-semibold text-foreground text-sm">Biotrauma</p>
              <p className="text-xs text-muted-foreground">Mechanical strain → cytokine release (IL-6, TNF-α) → systemic inflammation and remote organ injury (MODS).</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-3">The ARDSNet targets:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Tidal volume", value: "6 mL/kg IBW (4–8 mL/kg)" },
              { label: "Plateau pressure", value: "≤30 cmH₂O" },
              { label: "Driving pressure (ΔP)", value: "≤15 cmH₂O (Pplat − PEEP)" },
              { label: "PEEP", value: "Higher in moderate–severe ARDS (FiO₂/PEEP table)" },
              { label: "Permissive hypercapnia", value: "Accept pH ≥ 7.20 unless raised ICP" },
              { label: "Target SpO₂", value: "88–95% (PaO₂ 7.3–10.7 kPa)" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic mt-3">
            Mechanical power (Gattinoni 2016) integrates V<sub>T</sub>, ΔP, RR, PEEP and flow into one number (J/min); &gt; 17 J/min independently predicts mortality.
          </p>
        </ExamSection>

        {/* ───── 6. Dyssynchrony ───── */}
        <ExamSection id="toc-dyssynchrony" exams={["fficm", "edic"]} className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">6. Patient–Ventilator Dyssynchrony</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Occurs in ~25% of ventilated patients; ≥ 10% of breaths dyssynchronous independently predicts mortality and prolonged ventilation. Recognition is by waveform inspection — a core EDIC/FFICM SOE skill.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Type</th>
                  <th className="text-left py-2 text-foreground font-semibold">Waveform clue</th>
                  <th className="text-left py-2 text-foreground font-semibold">Cause / fix</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Ineffective triggering</td><td>Patient effort visible on flow/Paw without ventilator delivery</td><td>Auto-PEEP, oversedation, weak effort. ↓ trigger sensitivity, treat auto-PEEP.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Double triggering / breath stacking</td><td>Two consecutive breaths separated by &lt; ½ Ti</td><td>Patient demand &gt; set V<sub>T</sub>. Increase V<sub>T</sub> cautiously, switch to PCV/PSV, deepen sedation.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Reverse triggering</td><td>Diaphragmatic contraction entrained by mandatory breath (sedated patient)</td><td>Recently described; may cause breath-stacking and pendelluft. Lighten or deepen sedation; consider NMB.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Flow asynchrony</td><td>Concave Paw curve in VCV (flow starvation) or scooped flow in PCV</td><td>Increase peak flow (VCV) or rise time (PCV).</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Premature cycling</td><td>Ventilator cycles off while patient still inspiring (PSV)</td><td>↓ expiratory trigger sensitivity (e.g. 25% → 10%); lengthen Ti.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Delayed cycling</td><td>Ventilator continues delivering after patient effort ended (e.g. COPD on PSV)</td><td>↑ expiratory trigger sensitivity; ↓ pressure support.</td></tr>
              </tbody>
            </table>
          </div>
        </ExamSection>

        {/* ───── 7. Brief weaning placeholder (full section later) ───── */}
        <ExamSection id="toc-weaning" exams={["final", "fficm", "edic"]} className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">7. Weaning — Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            Weaning accounts for ~40% of total ventilation time. WIND classification: <strong>simple</strong> (extubated on first SBT, ~60%), <strong>difficult</strong> (1–7 days / 2–3 SBTs), <strong>prolonged</strong> (&gt; 7 days or &gt; 3 SBTs). Daily paired SAT + SBT (ABC trial — Girard, Lancet 2008) reduce ventilator days. Detailed extubation criteria, cuff-leak test and high-risk extubation are covered in <a href="#toc-tracheostomy" className="text-primary hover:underline">section 11–12</a>.
          </p>
        </ExamSection>

        <ExamSection id="toc-aprv" exams={["fficm", "edic"]} className="scroll-mt-24">
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
        </ExamSection>

        <ExamSection id="toc-advanced" exams={["fficm", "edic"]} className="scroll-mt-24">
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

          <h3 className="text-lg font-semibold text-foreground mb-2">Neuromuscular Blockade in ARDS</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Neuromuscular blocking agents (NMBAs) eliminate spontaneous respiratory effort, preventing ventilator dyssynchrony, reducing oxygen consumption, and allowing precise control of transpulmonary pressures. They may reduce VILI by preventing injurious spontaneous efforts (patient self-inflicted lung injury, P-SILI). However, prolonged use risks ICU-acquired weakness.
          </p>
          <div className="space-y-3 mb-4">
            {[
              { label: "ACURASYS Trial (2010)", detail: "French multicentre RCT. 340 patients with early severe ARDS (P/F <150). Cisatracurium infusion for 48 hours vs placebo. Adjusted 90-day mortality reduced (31.6% vs 40.7%, p=0.08 — significant after adjustment for baseline P/F and Pplat). More ventilator-free days and fewer pneumothoraces. No increase in ICU-acquired weakness. Landmark trial that established early NMB as a potential strategy." },
              { label: "ROSE Trial (2019)", detail: "PETAL Network multicentre RCT. 1006 patients with moderate-severe ARDS (P/F <150). Cisatracurium 48h + deep sedation vs usual care with light sedation. No difference in 90-day mortality (42.5% vs 42.8%). Higher rate of cardiovascular adverse events in NMB group. Key difference from ACURASYS: control group used light sedation (modern practice) rather than deep sedation, and higher PEEP strategy was used in both arms." },
              { label: "Reconciling the trials", detail: "ACURASYS control group received deep sedation ± NMB (>20% received open-label NMB). The benefit may have been from avoiding deep sedation without paralysis (where dyssynchronous efforts against high PEEP cause P-SILI) rather than from NMB per se. ROSE suggests that light sedation with permissive spontaneous breathing is non-inferior to routine paralysis." },
            ].map((e) => (
              <div key={e.label} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{e.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{e.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Indications for NMB in ARDS</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { label: "Refractory dyssynchrony", detail: "Persistent double-triggering, breath-stacking, or reverse triggering despite optimised sedation and ventilator settings." },
              { label: "Severe hypoxaemia", detail: "P/F <100–120 despite lung-protective ventilation and high PEEP. Facilitates prone positioning." },
              { label: "High plateau pressures", detail: "Pplat >30 cmH₂O driven by vigorous spontaneous efforts increasing transpulmonary pressure." },
              { label: "Prone positioning", detail: "NMB facilitates safe prone turns and prevents dyssynchrony during prone ventilation. Often used for initial 24–48 hours of proning." },
              { label: "Open abdomen / raised IAP", detail: "Reduces abdominal wall muscle tone, lowering intra-abdominal pressure and improving diaphragmatic excursion." },
              { label: "Therapeutic hypothermia", detail: "Prevents shivering which increases O₂ consumption and CO₂ production." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Cisatracurium vs Rocuronium in ICU</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-secondary/30">
                  <th className="text-left p-3 border-b border-border text-foreground">Property</th>
                  <th className="text-left p-3 border-b border-border text-foreground">Cisatracurium</th>
                  <th className="text-left p-3 border-b border-border text-foreground">Rocuronium</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Metabolism</td><td className="p-3 border-b border-border">Hofmann elimination (organ-independent, pH & temperature dependent)</td><td className="p-3 border-b border-border">Hepatic metabolism, renal excretion</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Renal/hepatic failure</td><td className="p-3 border-b border-border">No dose adjustment needed</td><td className="p-3 border-b border-border">Prolonged duration — accumulates in organ dysfunction</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Reversal</td><td className="p-3 border-b border-border">No specific reversal agent</td><td className="p-3 border-b border-border">Sugammadex provides rapid, reliable reversal</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Histamine release</td><td className="p-3 border-b border-border">None (R-isomer of atracurium)</td><td className="p-3 border-b border-border">Minimal</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Laudanosine</td><td className="p-3 border-b border-border">5× less than atracurium — clinically insignificant</td><td className="p-3 border-b border-border">Not applicable</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Trial evidence in ARDS</td><td className="p-3 border-b border-border">Both ACURASYS and ROSE used cisatracurium</td><td className="p-3 border-b border-border">No large ARDS-specific RCTs</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">ICU preference</td><td className="p-3 border-b border-border">Historically preferred — predictable offset</td><td className="p-3 border-b border-border">Increasingly used — sugammadex allows "on-off" control for daily sedation holds</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Monitoring</td><td className="p-3 border-b border-border" colSpan={2}>Train-of-four (TOF) targeting 1–2/4 twitches for both agents. Deep block (post-tetanic count) rarely needed in ICU.</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Practical Considerations</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
            <li><span className="font-semibold text-foreground">Duration:</span> Limit to 48 hours where possible (both trials used 48h). Reassess daily.</li>
            <li><span className="font-semibold text-foreground">Sedation depth:</span> Ensure adequate sedation and analgesia before and during NMB — paralysed awareness is a serious harm. BIS monitoring (target 40–60) is recommended.</li>
            <li><span className="font-semibold text-foreground">Eye care:</span> Incomplete eyelid closure — regular eye care and taping to prevent exposure keratopathy.</li>
            <li><span className="font-semibold text-foreground">VTE prophylaxis:</span> Immobility increases thrombotic risk — ensure pharmacological and mechanical prophylaxis.</li>
            <li><span className="font-semibold text-foreground">ICU-acquired weakness:</span> Risk increases with duration, concurrent corticosteroids, and aminoglycosides. Minimise duration and use lowest effective dose.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-2">Stepwise Rescue Strategy in Refractory ARDS</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Optimise lung-protective ventilation (Vt 6 ml/kg, Pplat ≤30, high PEEP strategy)</li>
            <li><span className="font-semibold text-foreground">Neuromuscular blockade</span> — consider for refractory dyssynchrony, severe hypoxaemia, or to facilitate proning (limit 48h)</li>
            <li><span className="font-semibold text-foreground">Prone positioning ≥16 hours/day</span> — strongest evidence, do not skip</li>
            <li>Inhaled pulmonary vasodilator (epoprostenol or iNO) as oxygenation bridge</li>
            <li>Consider ECMO referral if P/F &lt;80 for &gt;6 hours or pH &lt;7.20 with Pplat &gt;30 despite above</li>
          </ol>
        </ExamSection>

        <ExamSection id="toc-vap" exams={["final", "fficm", "edic"]} className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ventilator-Associated Pneumonia (VAP)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            VAP is a nosocomial pneumonia developing ≥48 hours after endotracheal intubation. It affects 5–40% of mechanically ventilated patients, increases ICU mortality by 5–13%, and prolongs mechanical ventilation by 7–9 days. Pathogenesis involves aspiration of oropharyngeal secretions past the ETT cuff, biofilm formation on the endotracheal tube, and impaired mucociliary clearance.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">Diagnosis</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Diagnosis remains challenging — no single test is definitive. A clinical approach combining signs, radiology, and microbiology is recommended:
          </p>
          <div className="space-y-3 mb-4">
            {[
              { label: "Clinical criteria", detail: "New or progressive infiltrate on CXR plus ≥2 of: temperature >38°C or <36°C, WCC >12 or <4 ×10⁹/L, purulent tracheal secretions, worsening oxygenation (↑FiO₂ or PEEP requirements)." },
              { label: "Clinical Pulmonary Infection Score (CPIS)", detail: "Composite score (temperature, WCC, secretions, oxygenation, CXR, tracheal aspirate culture). Score >6 suggests VAP. Sensitivity ~65%, specificity ~64%. Useful for research but not reliable alone for clinical decision-making." },
              { label: "Microbiological sampling", detail: "Quantitative cultures: bronchoalveolar lavage (BAL) ≥10⁴ CFU/mL, protected specimen brush (PSB) ≥10³ CFU/mL, or endotracheal aspirate (ETA) ≥10⁶ CFU/mL. ETA is simpler and non-inferior to bronchoscopic sampling in RCTs." },
              { label: "Biomarkers", detail: "Procalcitonin (PCT) may help guide antibiotic duration (stop if PCT <0.5 or ↓80% from peak) but is not reliable for diagnosis. CRP is non-specific. No biomarker alone can diagnose or exclude VAP." },
              { label: "Common organisms", detail: "Early-onset (<5 days): S. aureus (MSSA), H. influenzae, S. pneumoniae, Enterobacterales. Late-onset (≥5 days): Pseudomonas aeruginosa, MRSA, Acinetobacter, ESBL-producing Enterobacterales, Stenotrophomonas." },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">VAP Prevention Bundle</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Prevention bundles reduce VAP incidence by 50–70%. The ICS/FICM and NHS England recommend a ventilator care bundle:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { measure: "Head-of-bed elevation", detail: "30–45° semi-recumbent position. Reduces gastro-oesophageal reflux and aspiration. Strongest evidence base." },
              { measure: "Daily sedation holds", detail: "Daily interruption of sedation with spontaneous breathing trial. Reduces ventilator days and VAP incidence (Kress et al., 2000)." },
              { measure: "Subglottic secretion drainage", detail: "ETTs with subglottic suction ports reduce VAP by ~45% (NNT ~10). Recommended for patients expected to be ventilated >48–72 hours." },
              { measure: "Oral hygiene", detail: "Regular oral care with chlorhexidine 0.12–2% (4-hourly). Reduces oropharyngeal colonisation. Some recent meta-analyses question mortality benefit — still widely recommended." },
              { measure: "ETT cuff pressure", detail: "Maintain cuff pressure 20–30 cmH₂O. Below 20: micro-aspiration risk. Above 30: tracheal mucosal ischaemia. Continuous cuff pressure monitoring may be superior to intermittent checks." },
              { measure: "DVT and peptic ulcer prophylaxis", detail: "Part of the care bundle. Stress ulcer prophylaxis with PPI or H₂RA (SUP-ICU trial suggests PPIs may be omitted in low-risk patients)." },
              { measure: "Avoid unnecessary intubation", detail: "Use NIV/HFNO where appropriate. Early tracheostomy (TracMan: no benefit at day 30, but may reduce sedation). Minimise duration of intubation." },
              { measure: "Circuit management", detail: "Do not change ventilator circuits routinely (only if visibly soiled). Closed suction systems. Avoid unnecessary disconnections." },
            ].map((item) => (
              <div key={item.measure} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.measure}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Empirical Antibiotic Therapy</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Start empirical antibiotics promptly after obtaining respiratory cultures. Choice depends on onset timing, local resistance patterns, and risk factors for MDR organisms:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-secondary/30">
                  <th className="text-left p-3 border-b border-border text-foreground">Scenario</th>
                  <th className="text-left p-3 border-b border-border text-foreground">First-line</th>
                  <th className="text-left p-3 border-b border-border text-foreground">If MDR risk / critically ill</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="p-3 border-b border-border font-medium text-foreground">Early-onset (&lt;5 days), no MDR risk</td>
                  <td className="p-3 border-b border-border">Co-amoxiclav or ceftriaxone</td>
                  <td className="p-3 border-b border-border">Not usually needed</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-border font-medium text-foreground">Late-onset (≥5 days) or MDR risk factors</td>
                  <td className="p-3 border-b border-border">Piperacillin-tazobactam or meropenem</td>
                  <td className="p-3 border-b border-border">Add anti-pseudomonal cover if not already included</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-border font-medium text-foreground">MRSA risk</td>
                  <td className="p-3 border-b border-border">Add vancomycin or linezolid</td>
                  <td className="p-3 border-b border-border">Linezolid may have better lung penetration</td>
                </tr>
                <tr>
                  <td className="p-3 border-b border-border font-medium text-foreground">Pseudomonas suspected</td>
                  <td className="p-3 border-b border-border">Dual anti-pseudomonal therapy initially</td>
                  <td className="p-3 border-b border-border">e.g., pip-taz + gentamicin or ciprofloxacin. De-escalate to monotherapy once sensitivities available</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Antibiotic Duration & De-escalation</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><span className="font-semibold text-foreground">Duration:</span> 7 days is recommended for most VAP (non-fermenting GNB like Pseudomonas may need 10–14 days). Shorter courses reduce MDR emergence without increasing recurrence.</li>
            <li><span className="font-semibold text-foreground">De-escalation:</span> Narrow spectrum based on culture sensitivities at 48–72 hours. Switch to oral if absorbing and improving.</li>
            <li><span className="font-semibold text-foreground">PCT-guided stopping:</span> Consider stopping antibiotics if PCT &lt;0.5 μg/L or has fallen &gt;80% from peak. Reduces antibiotic exposure without increasing mortality (PRORATA, SAPS trials).</li>
            <li><span className="font-semibold text-foreground">Negative cultures:</span> If cultures negative at 48–72h and clinical improvement, strongly consider stopping antibiotics — the diagnosis may not be VAP.</li>
          </ul>
        </ExamSection>

        <ExamSection exams={["fficm", "edic"]}>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ventilator-Associated Events (VAE) — CDC Surveillance Framework</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            In 2013, the CDC replaced the traditional VAP surveillance definition with a tiered, objective framework called <span className="font-semibold text-foreground">Ventilator-Associated Events (VAE)</span>. This was designed to improve reproducibility, reduce subjective interpretation (particularly of CXR), and capture a broader range of complications in mechanically ventilated patients — not just pneumonia.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">The Three-Tier Hierarchy</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Each tier is a subset of the one above — every possible VAP is an IVAC, and every IVAC is a VAC:
          </p>
          <div className="space-y-3 mb-4">
            {[
              {
                tier: "Tier 1 — Ventilator-Associated Condition (VAC)",
                criteria: "After ≥2 calendar days of stable or decreasing ventilator settings, the patient develops sustained respiratory deterioration defined as: increase in daily minimum FiO₂ ≥0.20 (20 percentage points) for ≥2 calendar days, OR increase in daily minimum PEEP ≥3 cmH₂O for ≥2 calendar days.",
                significance: "Captures any cause of respiratory deterioration — pneumonia, fluid overload, atelectasis, ARDS, PE. Most objective and reproducible tier. ~5–10% of ventilated patients develop VAC."
              },
              {
                tier: "Tier 2 — Infection-Related VAC (IVAC)",
                criteria: "VAC plus evidence of infection: temperature >38°C or <36°C OR WCC ≥12,000 or ≤4,000 cells/mm³, AND a new antimicrobial agent started and continued for ≥4 qualifying calendar days.",
                significance: "Narrows VAC to cases where infection is suspected and acted upon. The 4-day antibiotic criterion ensures clinician commitment to an infectious diagnosis, not empirical cover that was quickly stopped."
              },
              {
                tier: "Tier 3 — Possible VAP (PVAP)",
                criteria: "IVAC plus one of: (1) purulent respiratory secretions (≥25 neutrophils and ≤10 squamous epithelial cells per LPF) AND a positive quantitative or semi-quantitative respiratory culture, OR (2) positive lung histopathology, OR (3) positive Legionella or respiratory virus test.",
                significance: "Closest to the traditional VAP definition but still does not require CXR interpretation. Uses objective microbiological and histopathological criteria."
              },
            ].map((t) => (
              <div key={t.tier} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{t.tier}</p>
                <p className="text-sm text-muted-foreground mt-1"><span className="font-medium text-foreground">Criteria: </span>{t.criteria}</p>
                <p className="text-sm text-muted-foreground mt-1"><span className="font-medium text-foreground">Significance: </span>{t.significance}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Key Definitions & Timings</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { label: "Baseline period", detail: "≥2 calendar days of stable or decreasing daily minimum FiO₂ or PEEP (the 'period of stability')." },
              { label: "Sustained deterioration", detail: "The increase in FiO₂ or PEEP must persist for ≥2 consecutive calendar days to qualify as a VAC." },
              { label: "VAE window period", detail: "Infection criteria (temperature, WCC, antibiotics) must occur within a window from 2 days before to 2 days after VAC onset." },
              { label: "Day 1 of MV", detail: "Day of intubation or admission to the unit while ventilated. VAE cannot occur before calendar day 3 (requires ≥2 days of baseline stability)." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">VAC vs Traditional VAP — Why It Matters</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-secondary/30">
                  <th className="text-left p-3 border-b border-border text-foreground">Feature</th>
                  <th className="text-left p-3 border-b border-border text-foreground">Traditional VAP</th>
                  <th className="text-left p-3 border-b border-border text-foreground">CDC VAE Framework</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="p-3 border-b border-border font-medium text-foreground">CXR interpretation</td><td className="p-3 border-b border-border">Required — subjective, poor inter-rater reliability</td><td className="p-3 border-b border-border">Not required — uses objective FiO₂/PEEP data</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Reproducibility</td><td className="p-3 border-b border-border">Low — rates vary 10-fold between institutions</td><td className="p-3 border-b border-border">High — algorithmic, can be auto-extracted from EHR</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Scope</td><td className="p-3 border-b border-border">Pneumonia only</td><td className="p-3 border-b border-border">All causes of respiratory deterioration (broader)</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Clinical utility</td><td className="p-3 border-b border-border">Guides individual patient treatment</td><td className="p-3 border-b border-border">Designed for surveillance and benchmarking, not individual diagnosis</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Outcome association</td><td className="p-3 border-b border-border">Variable</td><td className="p-3 border-b border-border">VAC independently associated with mortality, prolonged MV, and ICU LOS</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">VAE Prevention Strategies</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Because VAC captures non-infectious complications, prevention extends beyond the traditional VAP bundle:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><span className="font-semibold text-foreground">Minimise ventilator days:</span> Daily SBTs, protocolised weaning, early mobilisation</li>
            <li><span className="font-semibold text-foreground">Conservative fluid management:</span> Reduces pulmonary oedema — a common cause of VAC (FACTT trial: conservative strategy reduced ventilator days)</li>
            <li><span className="font-semibold text-foreground">Lung-protective ventilation:</span> Prevents VILI-related deterioration that would trigger VAC criteria</li>
            <li><span className="font-semibold text-foreground">Aspiration prevention:</span> HOB elevation, subglottic drainage, cuff pressure management</li>
            <li><span className="font-semibold text-foreground">Sedation minimisation:</span> Light sedation targets (RASS 0 to −2) reduce atelectasis and promote spontaneous breathing</li>
            <li><span className="font-semibold text-foreground">VTE prophylaxis:</span> PE can cause VAC by increasing FiO₂/PEEP requirements</li>
            <li><span className="font-semibold text-foreground">Transfusion restriction:</span> Liberal transfusion associated with pulmonary complications (TRICC, TRISS trials)</li>
          </ul>
        </ExamSection>

        <ExamSection id="toc-tracheostomy" exams={["final", "fficm", "edic"]} className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Tracheostomy in the ICU</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Tracheostomy is performed in ~10–15% of mechanically ventilated ICU patients. Potential benefits include reduced dead space, improved secretion management, lower sedation requirements, facilitated weaning, and improved patient comfort and communication. However, optimal timing remains debated.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">Timing — Early vs Late</h3>
          <div className="space-y-3 mb-4">
            {[
              { label: "TracMan Trial (2013)", detail: "UK multicentre RCT, 909 patients. Early tracheostomy (within 4 days) vs late (after day 10 if still indicated). No difference in 30-day mortality (30.8% vs 31.5%) or 2-year mortality. No difference in ICU or hospital LOS. 45% of the late group never required tracheostomy. Conclusion: a 'wait and see' approach is safe — many patients are extubated before day 10." },
              { label: "Meta-analyses", detail: "Pooled data from multiple RCTs (including TracMan, Terragni, Zheng) show early tracheostomy may reduce ventilator days and ICU LOS but no consistent mortality benefit. Definitions of 'early' (day 2–10) and 'late' (day 10–28) vary widely across studies." },
              { label: "Current consensus", detail: "No universally agreed timing. Consider tracheostomy when: (1) anticipated prolonged ventilation >10–14 days, (2) failed weaning/extubation, (3) need for ongoing airway protection (neurological injury), (4) facilitate rehabilitation and communication. Avoid in patients likely to be extubated within 7–10 days." },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Percutaneous vs Surgical Tracheostomy</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-secondary/30">
                  <th className="text-left p-3 border-b border-border text-foreground">Feature</th>
                  <th className="text-left p-3 border-b border-border text-foreground">Percutaneous Dilatational (PDT)</th>
                  <th className="text-left p-3 border-b border-border text-foreground">Surgical (Open)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Location</td><td className="p-3 border-b border-border">Bedside in ICU</td><td className="p-3 border-b border-border">Theatre or bedside</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Technique</td><td className="p-3 border-b border-border">Seldinger technique with serial dilatation (Ciaglia) or single-stage dilator (Ciaglia Blue Rhino). Bronchoscopy or ultrasound guided.</td><td className="p-3 border-b border-border">Direct visualisation, tracheal window or flap (Björk flap). Formal dissection of pretracheal structures.</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Wound infection</td><td className="p-3 border-b border-border">Lower (tight stoma, smaller incision)</td><td className="p-3 border-b border-border">Higher</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Bleeding</td><td className="p-3 border-b border-border">Less perioperative bleeding</td><td className="p-3 border-b border-border">Better haemostasis under direct vision</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Tracheal stenosis</td><td className="p-3 border-b border-border">Similar long-term rates</td><td className="p-3 border-b border-border">Similar long-term rates</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Tube change difficulty</td><td className="p-3 border-b border-border">Higher risk — immature tract, no stay sutures</td><td className="p-3 border-b border-border">Stay sutures and mature stoma facilitate safe changes</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Contraindications to PDT</td><td className="p-3 border-b border-border" colSpan={2}>Paediatric patients, emergency airway, uncorrectable coagulopathy, difficult anatomy (obesity with impalpable landmarks, prior neck surgery/radiation, large thyroid goitre), subglottic stenosis, high ventilatory requirements (FiO₂ &gt;0.8, PEEP &gt;15)</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Procedural Considerations for PDT</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { label: "Pre-procedure assessment", detail: "Neck anatomy (palpate landmarks, consider USS), coagulation status (platelets >50, INR <1.5), current ventilatory requirements, ability to maintain oxygenation during procedure." },
              { label: "Positioning", detail: "Supine, neck extended (shoulder roll). Identify cricoid, tracheal rings, thyroid isthmus, and anterior neck vessels by palpation ± ultrasound." },
              { label: "Bronchoscopy guidance", detail: "Real-time visualisation confirms midline needle insertion between tracheal rings 1–2 or 2–3. Prevents posterior wall injury. Increasingly supplemented or replaced by ultrasound." },
              { label: "Ultrasound role", detail: "Pre-procedure: maps vessels, identifies thyroid isthmus, confirms tracheal midline, measures skin-to-trachea depth. Real-time: guides needle entry. Reduces vascular complications." },
              { label: "ETT management", detail: "Withdraw ETT to sit just below vocal cords under bronchoscopic view. Avoid accidental extubation. Some units use LMA as an alternative conduit during the procedure." },
              { label: "Post-procedure", detail: "Confirm position with bronchoscopy and capnography. First tube change not before day 5–7 (tract maturation). Emergency equipment at bedside: tracheal dilators, spare tracheostomy tube, ETT." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Complications</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { timing: "Immediate (<24h)", items: "Haemorrhage (1–5%), pneumothorax, posterior tracheal wall injury, false passage, subcutaneous emphysema, loss of airway, hypoxia during procedure, cardiac arrest (rare)." },
              { timing: "Early (1–7 days)", items: "Tube displacement/dislodgement (most dangerous before tract matures), tube obstruction (secretions, blood clot), wound infection, surgical emphysema." },
              { timing: "Late (>7 days)", items: "Tracheal stenosis (1–2% — most common long-term complication), tracheo-innominate artery fistula (catastrophic haemorrhage, <1%), tracheo-oesophageal fistula, granulation tissue, cosmetic scarring, persistent stoma." },
              { timing: "Decannulation emergencies", items: "Accidental decannulation before tract maturation is a life-threatening emergency. Algorithm: call for help, attempt oral intubation first if <7 days post-insertion, do not blindly re-insert through an immature tract." },
            ].map((item) => (
              <div key={item.timing} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.timing}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.items}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">NTSP Emergency Tracheostomy Algorithm</h3>
          <p className="text-muted-foreground leading-relaxed">
            The National Tracheostomy Safety Project (NTSP) provides standardised emergency algorithms for tracheostomy and laryngectomy patients. Key principles: <span className="font-semibold text-foreground">call for help early</span>, assess patency (pass suction catheter), remove inner cannula, deflate cuff, if still obstructed remove the tracheostomy tube entirely, cover stoma and manage as standard airway (oral intubation from above). A laryngectomy patient has <span className="font-semibold text-foreground">no upper airway connection</span> — ventilate via the stoma only. Bedhead signs indicating tracheostomy vs laryngectomy must be displayed.
          </p>
        </ExamSection>

        <ExamSection exams={["final", "fficm", "edic"]}>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Extubation</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Extubation failure (re-intubation within 48–72 hours) occurs in 10–20% of ICU patients and is independently associated with increased mortality, prolonged ICU stay, and higher rates of tracheostomy. Identifying high-risk patients and planning a structured extubation strategy is essential.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">Readiness for Extubation</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { label: "Resolving pathology", detail: "The indication for intubation is improving or resolved." },
              { label: "Oxygenation", detail: "FiO₂ ≤0.4, PEEP ≤8 cmH₂O, SpO₂ ≥92%." },
              { label: "Haemodynamics", detail: "Stable without high-dose vasopressors (noradrenaline ≤0.1 μg/kg/min)." },
              { label: "Neurological", detail: "GCS ≥8 (≥8T), intact cough and gag reflexes, able to protect airway." },
              { label: "Respiratory drive", detail: "Adequate spontaneous breathing on minimal support. RSBI (f/VT) <105." },
              { label: "Secretion burden", detail: "Manageable secretions, suctioning ≤2-hourly, no copious thick secretions." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">High-Risk Extubation Criteria</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The DAS extubation guidelines (2012) classify extubation risk based on airway and general factors. An "at-risk" extubation requires a plan for failure:
          </p>
          <div className="space-y-3 mb-4">
            {[
              { category: "Airway risk factors", items: "Known or predicted difficult airway, previous difficult intubation, airway oedema (prolonged intubation, prone positioning, fluid overload, anaphylaxis), restricted mouth opening, cervical spine immobility, head & neck surgery, upper airway pathology." },
              { category: "General risk factors", items: "Obesity (BMI >30), obstructive sleep apnoea, high aspiration risk (full stomach, impaired laryngeal reflexes), respiratory failure requiring high FiO₂/PEEP, cardiovascular instability, neurological impairment (weak cough, bulbar dysfunction)." },
              { category: "Failed SBT or previous extubation failure", items: "Prior failed extubation during this admission, marginal SBT pass, high respiratory rate or accessory muscle use during trial, inability to clear secretions." },
            ].map((item) => (
              <div key={item.category} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.category}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.items}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Cuff Leak Test</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The cuff leak test assesses for laryngeal or subglottic oedema that may cause post-extubation stridor. It is most useful in patients at high risk of laryngeal oedema (prolonged intubation &gt;36–48 hours, traumatic intubation, female sex, large ETT relative to airway).
          </p>
          <div className="space-y-3 mb-4">
            {[
              { label: "Qualitative test", detail: "Deflate the ETT cuff and occlude the tube. If the patient can breathe around the tube (audible leak), significant oedema is unlikely. Simple but subjective." },
              { label: "Quantitative test", detail: "On volume-controlled ventilation, measure the difference between inspired and expired tidal volumes with the cuff deflated. Cuff leak volume = Vt(inspired) − Vt(expired). Average over 6 breaths, take the lowest 3. A leak <110 mL (or <12–24% of Vt) suggests significant oedema and predicts post-extubation stridor." },
              { label: "Test characteristics", detail: "Sensitivity ~75%, specificity ~70–85% for post-extubation stridor. Positive predictive value is low (~30%) — many patients with a low cuff leak extubate successfully. Negative predictive value is high (~95%). A positive test should prompt consideration of prophylactic steroids, not necessarily delay extubation." },
              { label: "Limitations", detail: "May be unreliable with large ETTs (less space for leak), in patients with copious secretions (false-positive), or on pressure-controlled ventilation. Not validated in all populations." },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Prophylactic Steroids</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Corticosteroids reduce airway oedema by inhibiting inflammatory mediator release and capillary permeability. Evidence supports their use in high-risk patients:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-secondary/30">
                  <th className="text-left p-3 border-b border-border text-foreground">Trial / Regimen</th>
                  <th className="text-left p-3 border-b border-border text-foreground">Findings</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Cheng et al. meta-analysis (2006)</td><td className="p-3 border-b border-border">Multiple doses of steroids before extubation reduced post-extubation stridor (RR 0.26) and re-intubation rates. Single dose was ineffective.</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">François et al. (2007)</td><td className="p-3 border-b border-border">Methylprednisolone 20 mg IV every 4 hours for 12 hours before planned extubation. Reduced post-extubation laryngeal oedema (3% vs 22%) and re-intubation (4% vs 8%) in patients with a failed cuff leak test.</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Recommended regimen</td><td className="p-3 border-b border-border">Methylprednisolone 20–40 mg IV every 4–6 hours, starting 12–24 hours before planned extubation (≥4 doses). Alternatively, dexamethasone 5 mg IV every 6 hours for 4 doses. Start once extubation decision is made — single doses at time of extubation are insufficient.</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Who to treat</td><td className="p-3 border-b border-border">High-risk patients: failed cuff leak test, intubated &gt;48–72 hours, traumatic/repeated intubation, female, history of post-extubation stridor. Not recommended routinely for all patients.</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Post-Extubation Stridor Management</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Post-extubation stridor occurs in 2–15% of extubations and indicates upper airway narrowing. A stepwise approach:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground mb-4">
            <li><span className="font-semibold text-foreground">Assess severity:</span> Inspiratory stridor at rest = significant obstruction. Assess work of breathing, SpO₂, voice quality, and ability to clear secretions.</li>
            <li><span className="font-semibold text-foreground">Nebulised adrenaline:</span> 1 mg (1 mL of 1:1000) in 4 mL saline, nebulised. Causes mucosal vasoconstriction and reduces oedema. Onset 1–5 minutes, duration 1–2 hours. Can repeat. Monitor for rebound oedema.</li>
            <li><span className="font-semibold text-foreground">IV dexamethasone:</span> 8 mg stat if not already given prophylactically. Takes 4–6 hours for maximal effect.</li>
            <li><span className="font-semibold text-foreground">Heliox:</span> Helium–oxygen mixture (70:30 or 80:20). Lower density reduces turbulent flow through narrowed airway, decreasing work of breathing. Bridge therapy only — does not treat the underlying oedema. Limited by maximum FiO₂ of 0.2–0.3.</li>
            <li><span className="font-semibold text-foreground">NIV/HFNO:</span> CPAP or HFNO may splint the upper airway and reduce work of breathing while steroids take effect. Use cautiously — may delay re-intubation if deteriorating.</li>
            <li><span className="font-semibold text-foreground">Re-intubation:</span> If worsening stridor, respiratory distress, or desaturation despite above measures. Use a <span className="font-semibold text-foreground">smaller ETT</span> (e.g., 6.0–6.5 mm) as the airway will be oedematous. Have difficult airway equipment available. Senior anaesthetic involvement.</li>
          </ol>

          <h3 className="text-lg font-semibold text-foreground mb-2">Post-Extubation Respiratory Support</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><span className="font-semibold text-foreground">High-flow nasal oxygen (HFNO):</span> Reduces re-intubation in low-risk surgical patients (OPERA trial) and non-inferior to NIV in high-risk patients (FLORALI-2). Provides PEEP effect (2–5 cmH₂O), humidification, and dead space washout.</li>
            <li><span className="font-semibold text-foreground">NIV:</span> Prophylactic NIV after extubation reduces re-intubation in high-risk patients (obesity, COPD, heart failure, hypercapnia). Should be applied immediately post-extubation, not as rescue after failure.</li>
            <li><span className="font-semibold text-foreground">Do not delay re-intubation:</span> If NIV/HFNO used as rescue for post-extubation respiratory failure, re-intubation should not be delayed. The Esteban trial (2004) showed increased mortality with NIV for post-extubation respiratory failure compared with standard therapy — likely due to delayed re-intubation.</li>
          </ul>
        </ExamSection>

        <ExamSection id="toc-hfno-niv" exams={["final", "fficm", "edic"]} className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">High-Flow Nasal Oxygen (HFNO)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            HFNO delivers heated, humidified oxygen at flow rates of 30–70 L/min via wide-bore nasal cannulae. It has transformed the management of acute hypoxaemic respiratory failure and is increasingly used across pre-oxygenation, post-extubation support, and as an alternative to NIV.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">Physiological Mechanisms</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { label: "Precise FiO₂ delivery", detail: "High flow rates match or exceed peak inspiratory flow (30–60 L/min in tachypnoeic patients), eliminating room air entrainment. Delivers true set FiO₂ (0.21–1.0) unlike standard nasal cannulae." },
              { label: "Nasopharyngeal dead space washout", detail: "Continuous high-flow gas washes out CO₂-rich gas from the anatomical dead space (~150 mL). Each breath draws from fresh gas rather than rebreathed gas. Effectively increases alveolar ventilation without increasing tidal volume." },
              { label: "CPAP effect", detail: "Generates flow-dependent positive airway pressure: ~1 cmH₂O per 10 L/min with mouth closed (up to ~5–7 cmH₂O at 60 L/min). Reduces atelectasis, improves FRC, and recruits collapsed alveoli. Pressure is lost with mouth open." },
              { label: "Optimal humidification", detail: "Gas heated to 37°C and humidified to 100% relative humidity (44 mg H₂O/L). Preserves mucociliary function, reduces airway inflammation, improves secretion clearance, and reduces metabolic cost of gas conditioning." },
              { label: "Reduced work of breathing", detail: "High flow rate reduces inspiratory resistance and provides a small degree of inspiratory flow assistance. Combined with dead space washout and PEEP effect, reduces respiratory drive and diaphragmatic effort." },
              { label: "Improved patient comfort", detail: "Better tolerated than NIV masks. Allows eating, drinking, speaking, and oral care. Improves compliance with continuous therapy." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Clinical Evidence</h3>
          <div className="space-y-3 mb-4">
            {[
              { trial: "FLORALI Trial (Frat et al., 2015)", detail: "Landmark multicentre RCT, 310 patients with acute hypoxaemic respiratory failure (P/F ≤300, non-hypercapnic). Three arms: HFNO vs standard O₂ vs NIV. Primary outcome (intubation rate at day 28): HFNO 38% vs standard O₂ 47% vs NIV 50% — not statistically significant overall. However, in the pre-specified severe subgroup (P/F ≤200), HFNO significantly reduced intubation (35% vs 53% vs 58%, p=0.009) and 90-day mortality (12% vs 23% vs 28%, p=0.02). NIV may have been harmful due to high tidal volumes and P-SILI." },
              { trial: "OPERA Trial (Futier et al., 2016)", detail: "RCT in post-operative abdominal surgery patients. Prophylactic HFNO vs standard O₂. HFNO did not reduce the primary composite of hypoxaemia, but reduced re-intubation rate and was better tolerated. Supports HFNO as post-operative prophylaxis in high-risk surgical patients." },
              { trial: "HOT-ER Trial (2022)", detail: "Prehospital and ED use of HFNO vs standard O₂ in acute respiratory failure. HFNO reduced intubation rates within 72 hours. Supports early initiation of HFNO in the emergency setting." },
              { trial: "FLORALI-2 (Hernández et al., 2019)", detail: "Post-extubation: HFNO non-inferior to NIV for preventing re-intubation in high-risk patients. HFNO better tolerated with fewer skin complications. Supports HFNO as first-line post-extubation support." },
              { trial: "COVID-19 evidence (RECOVERY-RS, 2022)", detail: "CPAP reduced intubation vs standard O₂ in COVID-19 respiratory failure. HFNO did not significantly reduce intubation vs standard O₂ in this population, though the trial was stopped early. Suggests CPAP may be preferred over HFNO for COVID-associated pneumonitis specifically." },
              { trial: "Pre-oxygenation (PREOXYFLOW, OPTINIV)", detail: "HFNO during RSI provides apnoeic oxygenation — continuous O₂ delivery during the apnoeic period extends safe apnoea time. PREOXYFLOW showed no benefit in uncomplicated intubations, but OPTINIV (HFNO + NIV) improved pre-oxygenation in obese and hypoxaemic patients." },
            ].map((item) => (
              <div key={item.trial} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.trial}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Practical Settings</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-secondary/30">
                  <th className="text-left p-3 border-b border-border text-foreground">Indication</th>
                  <th className="text-left p-3 border-b border-border text-foreground">Flow rate</th>
                  <th className="text-left p-3 border-b border-border text-foreground">FiO₂</th>
                  <th className="text-left p-3 border-b border-border text-foreground">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Type 1 respiratory failure</td><td className="p-3 border-b border-border">40–60 L/min</td><td className="p-3 border-b border-border">Titrate to SpO₂ 92–96%</td><td className="p-3 border-b border-border">Start at 40 L/min and increase for comfort. Higher flows = more dead space washout and PEEP.</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Post-extubation</td><td className="p-3 border-b border-border">40–50 L/min</td><td className="p-3 border-b border-border">0.3–0.5</td><td className="p-3 border-b border-border">Start immediately post-extubation. Continue for ≥24 hours. Wean flow before FiO₂.</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Pre-oxygenation / apnoeic oxygenation</td><td className="p-3 border-b border-border">60–70 L/min</td><td className="p-3 border-b border-border">1.0</td><td className="p-3 border-b border-border">Apply during pre-oxygenation, leave running during apnoea for RSI. Extends safe apnoea time.</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Procedural sedation / bronchoscopy</td><td className="p-3 border-b border-border">50–70 L/min</td><td className="p-3 border-b border-border">0.5–1.0</td><td className="p-3 border-b border-border">Maintains oxygenation during conscious sedation. Use jaw thrust nasal prong positioning.</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Palliative / comfort care</td><td className="p-3 border-b border-border">20–30 L/min</td><td className="p-3 border-b border-border">As needed</td><td className="p-3 border-b border-border">Lower flows for comfort. Reduces dyspnoea even without improving SpO₂.</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Monitoring & Escalation Triggers</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            HFNO can delay intubation if deterioration is not recognised. Monitor closely and escalate early:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
            <li><span className="font-semibold text-foreground">ROX index:</span> (SpO₂/FiO₂) ÷ respiratory rate. At 2, 6, and 12 hours: ROX ≥4.88 predicts HFNO success; ROX &lt;3.85 predicts failure and need for intubation. Validated in pneumonia-related hypoxaemia.</li>
            <li><span className="font-semibold text-foreground">Respiratory rate &gt;30:</span> Persistent tachypnoea despite HFNO suggests high respiratory drive and risk of P-SILI from large tidal volumes.</li>
            <li><span className="font-semibold text-foreground">Thoracoabdominal asynchrony:</span> Paradoxical breathing pattern indicates diaphragmatic fatigue and impending failure.</li>
            <li><span className="font-semibold text-foreground">Accessory muscle use:</span> Worsening suprasternal or intercostal recession despite escalating flow/FiO₂.</li>
            <li><span className="font-semibold text-foreground">FiO₂ ≥0.7 with no improvement:</span> Consider intubation rather than prolonged high FiO₂ HFNO. Oxygen toxicity and delayed intubation both worsen outcomes.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-2">Contraindications & Limitations</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><span className="font-semibold text-foreground">Type 2 respiratory failure:</span> HFNO provides modest CO₂ clearance via dead space washout but is not a substitute for NIV in acute hypercapnic failure (COPD exacerbation). NIV remains first-line for pH &lt;7.35 with PaCO₂ &gt;6 kPa.</li>
            <li><span className="font-semibold text-foreground">Base of skull fracture:</span> Relative contraindication — risk of pneumocephalus with high nasal flow (theoretical, case reports only).</li>
            <li><span className="font-semibold text-foreground">Nasal obstruction:</span> Severe nasal polyps, septal deviation, or recent nasal surgery may prevent cannula placement.</li>
            <li><span className="font-semibold text-foreground">Aerosol generation:</span> HFNO is an aerosol-generating procedure (AGP). Requires appropriate PPE and isolation in infectious cases (e.g., COVID-19, influenza, TB).</li>
          </ul>
        </ExamSection>

        <ExamSection exams={["final", "fficm", "edic"]}>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Non-Invasive Ventilation (NIV)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            NIV delivers positive pressure ventilation via a mask interface without endotracheal intubation. It reduces work of breathing, improves gas exchange, and avoids intubation-related complications. NIV encompasses two distinct modalities: continuous positive airway pressure (CPAP) and bilevel positive airway pressure (BiPAP/NIV-PS).
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">CPAP vs BiPAP</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-secondary/30">
                  <th className="text-left p-3 border-b border-border text-foreground">Feature</th>
                  <th className="text-left p-3 border-b border-border text-foreground">CPAP</th>
                  <th className="text-left p-3 border-b border-border text-foreground">BiPAP (NIV-PS)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Mechanism</td><td className="p-3 border-b border-border">Single constant positive pressure throughout the respiratory cycle</td><td className="p-3 border-b border-border">Two pressure levels: IPAP (inspiratory) and EPAP (expiratory). Pressure support = IPAP − EPAP.</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Ventilatory support</td><td className="p-3 border-b border-border">Does NOT augment tidal volume — not true ventilation. Splints airways and recruits alveoli only.</td><td className="p-3 border-b border-border">Augments tidal volume during inspiration. Provides true ventilatory support — offloads respiratory muscles and assists CO₂ clearance.</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Effect on CO₂</td><td className="p-3 border-b border-border">Minimal direct effect on PaCO₂ (may improve indirectly by reducing WOB)</td><td className="p-3 border-b border-border">Directly reduces PaCO₂ by augmenting alveolar ventilation</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Typical settings</td><td className="p-3 border-b border-border">5–15 cmH₂O</td><td className="p-3 border-b border-border">IPAP 12–20, EPAP 4–8 cmH₂O (PS 8–12 cmH₂O)</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Primary indication</td><td className="p-3 border-b border-border">Acute cardiogenic pulmonary oedema, obstructive sleep apnoea</td><td className="p-3 border-b border-border">Acute hypercapnic respiratory failure (COPD, obesity hypoventilation, neuromuscular disease)</td></tr>
                <tr><td className="p-3 border-b border-border font-medium text-foreground">Complexity</td><td className="p-3 border-b border-border">Simple — can be delivered by any flow generator or ventilator</td><td className="p-3 border-b border-border">Requires dedicated NIV ventilator with trigger/cycle sensing</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Key Clinical Evidence</h3>
          <div className="space-y-3 mb-4">
            {[
              { trial: "Brochard et al. (1995)", detail: "Landmark RCT, 85 patients with acute COPD exacerbation and respiratory acidosis (pH <7.35). NIV (BiPAP) vs standard medical therapy. NIV reduced intubation rate (26% vs 74%), in-hospital mortality (9% vs 29%), and hospital LOS. Established NIV as first-line therapy for acute hypercapnic COPD exacerbations. NNT for avoiding intubation = 2." },
              { trial: "Plant et al. (2000)", detail: "UK multicentre RCT, 236 patients with COPD exacerbation (pH 7.25–7.35). NIV delivered on general respiratory wards (not ICU). NIV reduced treatment failure (15% vs 27%) and in-hospital mortality (10% vs 20%). Showed NIV is effective and safe outside ICU for mild-moderate acidosis. Patients with pH <7.25 had higher failure rates on wards — these patients need ICU-level NIV." },
              { trial: "3CPO Trial (Gray et al., 2008)", detail: "Multicentre RCT, 1069 patients with acute cardiogenic pulmonary oedema. Three arms: standard O₂ vs CPAP vs NIV (BiPAP). Both CPAP and BiPAP improved dyspnoea, heart rate, acidosis, and hypercapnia faster than standard O₂. However, no difference in 7-day or 30-day mortality between groups. No increase in MI rate with NIV (contrary to earlier concerns from the NIPPV study). CPAP is preferred over BiPAP for ACPO — simpler, equally effective, and avoids theoretical risk of reduced coronary perfusion pressure." },
              { trial: "Masip et al. (2000)", detail: "RCT in acute cardiogenic pulmonary oedema. CPAP vs standard O₂. CPAP reduced intubation (5% vs 33%) and improved oxygenation more rapidly. Supports early CPAP as first-line in ACPO." },
              { trial: "RECOVERY-RS (Perkins et al., 2022)", detail: "COVID-19 respiratory failure: CPAP reduced the composite of intubation or death vs standard O₂ (36% vs 44%). HFNO did not show significant benefit over standard O₂ in this population. Supports CPAP as the preferred non-invasive support modality in viral pneumonitis." },
              { trial: "Keenan et al. meta-analysis (2011)", detail: "NIV for acute hypoxaemic (non-COPD, non-cardiogenic) respiratory failure. No consistent reduction in intubation or mortality. NIV is less well-established in de novo hypoxaemic respiratory failure — use with caution and close monitoring. Risk of large tidal volumes causing P-SILI." },
            ].map((item) => (
              <div key={item.trial} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.trial}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Indications</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { indication: "COPD exacerbation", detail: "Strongest evidence. First-line for pH 7.25–7.35 with PaCO₂ >6 kPa despite controlled O₂ and bronchodilators. NNT ~3 to avoid intubation. Use BiPAP." },
              { indication: "Acute cardiogenic pulmonary oedema", detail: "CPAP 5–15 cmH₂O. Rapid symptom relief. Does not reduce mortality (3CPO) but reduces intubation and speeds recovery. Use alongside GTN, diuretics." },
              { indication: "Immunocompromised patients", detail: "NIV reduces intubation and mortality in immunocompromised patients with respiratory failure (Hilbert et al., 2001). Intubation carries very high mortality in this group." },
              { indication: "Chest wall deformity / neuromuscular disease", detail: "Nocturnal NIV for chronic hypoventilation. In acute exacerbations, BiPAP augments ventilation when respiratory muscles are fatigued." },
              { indication: "Post-extubation (prophylactic)", detail: "In high-risk patients (COPD, obesity, hypercapnia), prophylactic NIV immediately post-extubation reduces re-intubation (Ferrer et al., Nava et al.)." },
              { indication: "Palliative care", detail: "Symptom relief for dyspnoea in patients with ceiling of care decisions. Improves comfort. Consider patient preference and tolerance." },
            ].map((item) => (
              <div key={item.indication} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.indication}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Contraindications</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { type: "Absolute", items: "Facial trauma/burns/surgery preventing mask fit, fixed upper airway obstruction, vomiting with risk of aspiration, undrained pneumothorax, unresponsive patient unable to protect airway, cardiac or respiratory arrest." },
              { type: "Relative", items: "Copious secretions (unable to clear), severe agitation or confusion (poor compliance), haemodynamic instability requiring vasopressors, pH <7.15 (high failure rate — consider direct intubation), recent upper GI surgery, bowel obstruction (risk of gastric distension)." },
            ].map((item) => (
              <div key={item.type} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.type}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.items}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Practical Considerations</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
            <li><span className="font-semibold text-foreground">Interface:</span> Full face mask most common in acute setting (reduces mouth leak). Alternatives: nasal mask, total face mask, helmet CPAP. Ensure correct fit — air leaks reduce efficacy and cause eye irritation.</li>
            <li><span className="font-semibold text-foreground">Starting settings (BiPAP):</span> IPAP 12–15, EPAP 4–5 cmH₂O. Titrate IPAP up by 2–5 cmH₂O every 10–15 minutes to target Vt 6–8 ml/kg, RR &lt;25, improving pH/PaCO₂. Maximum IPAP usually 25–30 cmH₂O.</li>
            <li><span className="font-semibold text-foreground">Starting settings (CPAP):</span> 5 cmH₂O, increase by 2–3 cmH₂O to maximum 10–15 cmH₂O. Titrate to SpO₂ and work of breathing.</li>
            <li><span className="font-semibold text-foreground">Monitoring:</span> ABG at 1–2 hours to assess response. If pH not improving or worsening, escalate to intubation. Continuous SpO₂, RR, and clinical assessment.</li>
            <li><span className="font-semibold text-foreground">Escalation criteria:</span> Worsening pH despite escalating IPAP, persistent RR &gt;35, reduced consciousness, inability to clear secretions, haemodynamic deterioration, patient distress or non-compliance.</li>
            <li><span className="font-semibold text-foreground">Weaning NIV:</span> As underlying condition improves, reduce hours of NIV use (e.g., 2h on / 2h off), then nocturnal only. Wean IPAP before discontinuing. Ensure adequate oxygenation off NIV before stopping.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-2">NIV Failure — Predictors</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>pH &lt;7.25 at presentation (success rate ~50% on ward; needs ICU-level care)</li>
            <li>pH not improving after 1–2 hours of NIV</li>
            <li>APACHE II score &gt;29</li>
            <li>GCS &lt;11 at initiation</li>
            <li>Pneumonia as cause of COPD exacerbation (higher failure rate than infective exacerbation alone)</li>
            <li>Excessive secretions or poor cough</li>
            <li>Poor mask tolerance or frequent removal</li>
          </ul>
        </ExamSection>

        <ExamSection id="toc-longterm" exams={["fficm", "edic"]} className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ventilator-Induced Diaphragmatic Dysfunction (VIDD)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Mechanical ventilation itself injures the diaphragm. Diaphragmatic atrophy begins within <span className="font-semibold text-foreground">18–69 hours</span> of controlled ventilation (Levine et al., 2008) and is a major contributor to weaning failure, prolonged ICU stay, and increased mortality.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">Pathophysiology</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
            <li><span className="font-semibold text-foreground">Disuse atrophy:</span> Complete diaphragmatic unloading during controlled ventilation activates proteolytic pathways (ubiquitin-proteasome, calpain, caspase-3), causing rapid type I and II fibre atrophy — up to 50% cross-sectional area loss within 5 days.</li>
            <li><span className="font-semibold text-foreground">Oxidative stress:</span> Mitochondrial reactive oxygen species (ROS) production increases within hours of CMV, driving protein oxidation and lipid peroxidation in diaphragm myofibres.</li>
            <li><span className="font-semibold text-foreground">Structural remodelling:</span> Sarcomere disruption, myofilament protein degradation (myosin heavy chain loss), and impaired excitation-contraction coupling reduce force-generating capacity.</li>
            <li><span className="font-semibold text-foreground">Mitochondrial dysfunction:</span> Decreased mitochondrial biogenesis and increased autophagy lead to reduced ATP production and further contractile impairment.</li>
            <li><span className="font-semibold text-foreground">Concurrent ICU insults:</span> Sepsis, corticosteroids, NMBAs, systemic inflammation, and malnutrition compound diaphragmatic injury beyond mechanical ventilation alone (ICU-acquired diaphragm weakness).</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-2">Risk Factors</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { factor: "Controlled mechanical ventilation", detail: "CMV is the strongest risk factor. Duration-dependent — even 12–18 hours causes measurable atrophy. Assist modes partially protective." },
              { factor: "Duration of ventilation", detail: "Progressive fibre atrophy: ~6% loss per day of CMV. Exponential decline in transdiaphragmatic pressure over first week." },
              { factor: "Neuromuscular blocking agents", detail: "NMBAs abolish all diaphragmatic activity, compounding disuse atrophy. Minimise duration (ACURASYS: 48h only)." },
              { factor: "Corticosteroids", detail: "Dexamethasone and methylprednisolone promote myopathy via upregulation of muscle RING finger 1 (MuRF-1) and atrogin-1." },
              { factor: "Sepsis & systemic inflammation", detail: "TNF-α, IL-6, and endotoxin directly impair diaphragmatic contractility independent of ventilation." },
              { factor: "Malnutrition & muscle wasting", detail: "Negative protein balance, caloric deficit, and immobility accelerate global and diaphragmatic sarcopenia." },
              { factor: "Over-assistance", detail: "Excessive pressure support suppresses respiratory drive and diaphragmatic effort — patient 'adapts down'." },
              { factor: "Age & comorbidity", detail: "Older patients and those with pre-existing COPD, heart failure, or sarcopenia are more susceptible." },
            ].map((item) => (
              <div key={item.factor} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.factor}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Ultrasound Assessment of the Diaphragm</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Point-of-care ultrasound is the gold standard bedside tool for assessing diaphragm structure and function. Two key measurements are used:
          </p>

          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Diaphragm Thickness (Tdi) — Zone of Apposition</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><span className="font-semibold text-foreground">Probe:</span> High-frequency linear (10–15 MHz) at the zone of apposition (8th–10th intercostal space, anterior axillary line)</li>
                <li><span className="font-semibold text-foreground">Normal Tdi:</span> 1.5–5.0 mm at end-expiration (FRC)</li>
                <li><span className="font-semibold text-foreground">Atrophy:</span> Tdi &lt;2.0 mm at end-expiration suggests significant atrophy and predicts weaning failure</li>
                <li><span className="font-semibold text-foreground">Rate of atrophy:</span> &gt;10% decrease in Tdi over 72 hours is associated with prolonged ventilation (Zambon et al., 2017)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Diaphragm Thickening Fraction (TFdi)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><span className="font-semibold text-foreground">Formula:</span> TFdi = (Tdi<sub>insp</sub> − Tdi<sub>exp</sub>) / Tdi<sub>exp</sub> × 100%</li>
                <li><span className="font-semibold text-foreground">Normal:</span> TFdi &gt;30–36% during spontaneous breathing</li>
                <li><span className="font-semibold text-foreground">Weaning predictor:</span> TFdi &gt;30% predicts successful extubation (DiNino et al., 2014). TFdi &lt;20% associated with weaning failure.</li>
                <li><span className="font-semibold text-foreground">Optimal effort:</span> TFdi 15–30% during assisted ventilation suggests appropriate level of diaphragmatic loading — both under- and over-assistance are harmful (Goligher et al., 2018)</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Diaphragm Excursion</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><span className="font-semibold text-foreground">Probe:</span> Low-frequency curvilinear (3–5 MHz) subcostal, using M-mode to measure dome excursion</li>
                <li><span className="font-semibold text-foreground">Normal excursion:</span> ≥10 mm during tidal breathing, ≥40 mm during deep breathing</li>
                <li><span className="font-semibold text-foreground">Dysfunction:</span> Excursion &lt;10 mm or paradoxical movement (cephalad during inspiration) indicates paralysis or severe weakness</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Prevention & Management Strategies</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { strategy: "Maintain diaphragmatic effort", detail: "Use assist modes (PSV, PAV, NAVA) rather than CMV whenever possible. Aim for TFdi 15–30% — sufficient effort to prevent atrophy without inducing fatigue." },
              { strategy: "Early spontaneous breathing", detail: "Daily SBTs and early transition to assisted modes. The BREATHE trial supports early spontaneous breathing to preserve diaphragm function." },
              { strategy: "Minimise NMBAs", detail: "Limit NMBAs to indications with strong evidence (e.g., severe ARDS first 48h). Avoid routine paralysis beyond this period." },
              { strategy: "Titrate pressure support", detail: "Avoid over-assistance. Excessive PS suppresses respiratory effort. Use P0.1 (airway occlusion pressure at 100ms) to monitor drive — target 1–4 cmH₂O." },
              { strategy: "Diaphragm-protective ventilation", detail: "Emerging concept (Goligher et al.): adjust ventilator settings to maintain diaphragmatic activity within a safe zone — analogous to lung-protective ventilation for the respiratory muscles." },
              { strategy: "Nutrition optimisation", detail: "Adequate protein (1.2–2.0 g/kg/day) and caloric intake. Early enteral nutrition. Correct electrolyte deficiencies (phosphate, magnesium, calcium) that impair contractility." },
              { strategy: "Phrenic nerve stimulation", detail: "Temporary transvenous phrenic nerve pacing is an emerging therapy to maintain diaphragm activity during CMV. RESCUE trials ongoing." },
              { strategy: "Pharmacological targets", detail: "Antioxidants (e.g., N-acetylcysteine), protease inhibitors, and anabolic agents (testosterone, growth factors) are under investigation but not yet in clinical practice." },
            ].map((item) => (
              <div key={item.strategy} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.strategy}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Monitoring Diaphragmatic Effort</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><span className="font-semibold text-foreground">P0.1:</span> Airway occlusion pressure at 100 ms — reflects respiratory drive. Target 1–4 cmH₂O. &lt;1 = low effort (over-assisted); &gt;4 = excessive effort (under-assisted or high load).</li>
            <li><span className="font-semibold text-foreground">Electrical activity of the diaphragm (Edi):</span> Measured via specialised nasogastric catheter (NAVA). Reflects neural respiratory drive. Edi &lt;5 µV suggests excessive unloading; Edi &gt;15 µV suggests excessive loading.</li>
            <li><span className="font-semibold text-foreground">Transdiaphragmatic pressure (Pdi):</span> Gold standard for diaphragm strength — requires oesophageal and gastric balloon catheters. Pdi<sub>twitch</sub> &lt;11 cmH₂O after magnetic phrenic nerve stimulation confirms severe weakness.</li>
            <li><span className="font-semibold text-foreground">Serial ultrasound:</span> Repeat Tdi and TFdi measurements every 48–72 hours to track trajectory. A decreasing Tdi trend should prompt reduction in ventilatory support if clinically safe.</li>
          </ul>
        </ExamSection>

        <ExamSection exams={["fficm", "edic"]}>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICU-Acquired Weakness (ICUAW)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            ICU-acquired weakness affects <span className="font-semibold text-foreground">25–50%</span> of patients ventilated for ≥7 days. It encompasses critical illness polyneuropathy (CIP), critical illness myopathy (CIM), and the overlap syndrome (CIPNM). ICUAW is independently associated with prolonged ventilation, weaning failure, increased ICU/hospital mortality, and long-term functional disability.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">Critical Illness Polyneuropathy (CIP)</h3>
          <div className="p-4 rounded-lg border border-border mb-3">
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li><span className="font-semibold text-foreground">Pathology:</span> Primary axonal degeneration of motor and sensory peripheral nerves. Microvascular injury from sepsis-driven cytokine-mediated endoneural oedema and ischaemia.</li>
              <li><span className="font-semibold text-foreground">Presentation:</span> Symmetrical, flaccid limb weakness (distal &gt; proximal). Reduced or absent deep tendon reflexes. Sensory loss may be present but difficult to assess in sedated patients.</li>
              <li><span className="font-semibold text-foreground">NCS/EMG:</span> Reduced compound muscle action potential (CMAP) amplitudes with preserved conduction velocities (axonal pattern). Sensory nerve action potentials (SNAPs) also reduced. Fibrillation potentials on needle EMG.</li>
              <li><span className="font-semibold text-foreground">Recovery:</span> Slow and often incomplete — axonal regeneration occurs at ~1 mm/day. Severe cases may have persistent weakness at 1–2 years.</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Critical Illness Myopathy (CIM)</h3>
          <div className="p-4 rounded-lg border border-border mb-3">
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li><span className="font-semibold text-foreground">Pathology:</span> Selective loss of thick myosin filaments, type II fibre atrophy, and muscle membrane inexcitability (channelopathy). Corticosteroids and NMBAs are major contributors.</li>
              <li><span className="font-semibold text-foreground">Presentation:</span> Symmetrical proximal &gt; distal weakness. Facial muscles often spared. Reflexes may be preserved (unlike CIP). Diaphragm involvement contributes to weaning failure.</li>
              <li><span className="font-semibold text-foreground">NCS/EMG:</span> Low CMAP amplitudes but normal SNAPs (distinguishes from CIP). Short-duration, low-amplitude motor unit potentials. Reduced muscle membrane excitability on direct muscle stimulation (dmCMAP).</li>
              <li><span className="font-semibold text-foreground">CK:</span> May be elevated early but often normal — poor sensitivity. Not reliable for diagnosis.</li>
              <li><span className="font-semibold text-foreground">Recovery:</span> Generally better than CIP — muscle regeneration faster than axonal regrowth. Most patients improve within weeks to months.</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">CIP vs CIM — Key Differences</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-secondary/30">
                  <th className="p-3 text-left font-semibold text-foreground border-b border-border">Feature</th>
                  <th className="p-3 text-left font-semibold text-foreground border-b border-border">CIP</th>
                  <th className="p-3 text-left font-semibold text-foreground border-b border-border">CIM</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="p-3 font-semibold text-foreground">Pathology</td><td className="p-3">Axonal neuropathy</td><td className="p-3">Myosin loss / myopathy</td></tr>
                <tr className="border-b border-border"><td className="p-3 font-semibold text-foreground">Distribution</td><td className="p-3">Distal &gt; proximal</td><td className="p-3">Proximal &gt; distal</td></tr>
                <tr className="border-b border-border"><td className="p-3 font-semibold text-foreground">Reflexes</td><td className="p-3">Reduced/absent</td><td className="p-3">May be preserved</td></tr>
                <tr className="border-b border-border"><td className="p-3 font-semibold text-foreground">Sensory involvement</td><td className="p-3">Yes</td><td className="p-3">No</td></tr>
                <tr className="border-b border-border"><td className="p-3 font-semibold text-foreground">SNAPs</td><td className="p-3">Reduced</td><td className="p-3">Normal</td></tr>
                <tr className="border-b border-border"><td className="p-3 font-semibold text-foreground">Key risk factor</td><td className="p-3">Sepsis / SIRS</td><td className="p-3">Steroids + NMBAs</td></tr>
                <tr><td className="p-3 font-semibold text-foreground">Recovery</td><td className="p-3">Slow (months–years)</td><td className="p-3">Faster (weeks–months)</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Risk Factors for ICUAW</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { factor: "Sepsis & multi-organ failure", detail: "Strongest independent risk factor. Cytokine-mediated nerve and muscle injury. Risk proportional to SOFA score and duration of organ failure." },
              { factor: "Prolonged mechanical ventilation", detail: "Ventilation >7 days dramatically increases risk. Both disuse (VIDD) and systemic inflammation contribute." },
              { factor: "Hyperglycaemia", detail: "Blood glucose >10 mmol/L is independently associated. Van den Berghe (2001) showed intensive insulin therapy reduced CIP/CIM incidence — though tight control no longer recommended (NICE-SUGAR)." },
              { factor: "Corticosteroids", detail: "Dose- and duration-dependent risk. Particularly harmful in combination with NMBAs — synergistic myotoxicity." },
              { factor: "Neuromuscular blocking agents", detail: "Prolonged use (>48h) increases risk. Aminosteroid NMBAs (vecuronium, pancuronium) may carry higher risk than benzylisoquinoliniums." },
              { factor: "Immobilisation", detail: "Bed rest causes 1–3% muscle mass loss per day. Combined with systemic inflammation, leads to rapid deconditioning." },
            ].map((item) => (
              <div key={item.factor} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.factor}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">MRC Sum Score Assessment</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The <span className="font-semibold text-foreground">Medical Research Council (MRC) sum score</span> is the bedside standard for diagnosing ICUAW. It requires a cooperative, awake patient (GCS ≥14, CAM-ICU negative).
          </p>
          <div className="p-4 rounded-lg border border-border mb-3">
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li><span className="font-semibold text-foreground">Method:</span> Test 6 bilateral muscle groups (shoulder abduction, elbow flexion, wrist extension, hip flexion, knee extension, ankle dorsiflexion) — 12 assessments total</li>
              <li><span className="font-semibold text-foreground">Scoring:</span> Each muscle graded 0 (no contraction) to 5 (normal power) — maximum total score = 60</li>
              <li><span className="font-semibold text-foreground">ICUAW diagnosis:</span> MRC sum score <span className="font-semibold text-foreground">&lt;48/60</span> (on two separate assessments ≥24h apart)</li>
              <li><span className="font-semibold text-foreground">Severe weakness:</span> MRC sum score &lt;36/60</li>
              <li><span className="font-semibold text-foreground">Limitations:</span> Requires patient cooperation — cannot assess sedated/delirious patients. Ceiling effect in mild weakness. Inter-rater variability exists.</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            <span className="font-semibold text-foreground">Supplementary investigations:</span> NCS/EMG (gold standard for differentiating CIP vs CIM), direct muscle stimulation, muscle biopsy (rarely needed), and ultrasound assessment of muscle mass (rectus femoris cross-sectional area, diaphragm thickness).
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">Prevention & Rehabilitation Strategies</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { strategy: "Early mobilisation", detail: "Active and passive exercise within 48–72h of ICU admission. Schweickert et al. (2009): early physical therapy improved functional independence at discharge (59% vs 35%) and reduced delirium duration." },
              { strategy: "Sedation minimisation", detail: "Daily sedation interruptions (Kress, 2000) and light sedation targets (RASS 0 to -1) enable earlier mobilisation and reduce immobility-related atrophy." },
              { strategy: "Glycaemic control", detail: "Avoid hyperglycaemia (target <10 mmol/L). Hyperglycaemia independently worsens nerve and muscle injury. Avoid hypoglycaemia — target 6–10 mmol/L (NICE-SUGAR)." },
              { strategy: "Minimise corticosteroids & NMBAs", detail: "Use lowest effective doses for shortest duration. Avoid concurrent steroids + NMBAs where possible. If NMBAs needed, prefer cisatracurium and limit to 48h." },
              { strategy: "Neuromuscular electrical stimulation (NMES)", detail: "Electrical stimulation of peripheral muscles (quadriceps) to maintain mass in sedated patients unable to participate in active exercise. Evidence growing but not yet standard." },
              { strategy: "Nutritional optimisation", detail: "Adequate protein delivery (1.2–2.0 g/kg/day), early enteral nutrition, and correction of micronutrient deficiencies (vitamin D, selenium, zinc). Avoid overfeeding." },
              { strategy: "ICU rehabilitation programmes", detail: "Multidisciplinary team: physiotherapy, occupational therapy, speech therapy. Structured exercise progression: passive → active-assisted → active → sitting → standing → walking." },
              { strategy: "Post-ICU follow-up", detail: "ICU follow-up clinics for ongoing rehabilitation. Many patients have persistent weakness, fatigue, and reduced quality of life at 1–2 years (post-intensive care syndrome — PICS)." },
            ].map((item) => (
              <div key={item.strategy} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.strategy}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </ExamSection>

        <ExamSection exams={["fficm", "edic"]}>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Post-Intensive Care Syndrome (PICS)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            PICS describes the new or worsening impairments in <span className="font-semibold text-foreground">physical, cognitive, and psychological</span> health that persist after critical illness. First defined by the Society of Critical Care Medicine (2012), it affects <span className="font-semibold text-foreground">50–70%</span> of ICU survivors and significantly reduces quality of life for months to years. <span className="font-semibold text-foreground">PICS-Family (PICS-F)</span> recognises the psychological burden on caregivers.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">The Three Domains of PICS</h3>
          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Physical Domain</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><span className="font-semibold text-foreground">ICUAW:</span> Persistent weakness from CIP/CIM — up to 50% have measurable weakness at 1 year. Many unable to return to pre-morbid functional level.</li>
                <li><span className="font-semibold text-foreground">Reduced exercise capacity:</span> 6-minute walk distance remains below predicted at 12 months in ~60% of ARDS survivors (Herridge et al., 2003, 2011).</li>
                <li><span className="font-semibold text-foreground">Pulmonary dysfunction:</span> Restrictive defect, reduced DLCO, and dyspnoea. Usually improves over 6–12 months but may persist in severe ARDS.</li>
                <li><span className="font-semibold text-foreground">Swallowing dysfunction:</span> Post-extubation dysphagia in 20–80% of prolonged intubation patients. Risk of aspiration.</li>
                <li><span className="font-semibold text-foreground">Pain:</span> Chronic pain syndromes in 30–50% — shoulder, back, and generalised myalgia. Often under-recognised.</li>
                <li><span className="font-semibold text-foreground">Functional decline:</span> Only 50% return to work at 1 year. Many require carer support for ADLs.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Cognitive Domain</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><span className="font-semibold text-foreground">Prevalence:</span> 25–80% of ICU survivors at hospital discharge; 20–40% persist at 1 year (Pandharipande et al., 2013 — BRAIN-ICU study).</li>
                <li><span className="font-semibold text-foreground">Deficits:</span> Executive function, memory, attention, processing speed, and visuospatial ability. Severity comparable to mild traumatic brain injury or early Alzheimer's disease.</li>
                <li><span className="font-semibold text-foreground">Risk factors:</span> Delirium duration (strongest predictor — each additional day increases cognitive impairment risk), hypoxia, hypotension, dysglycaemia, sepsis, and pre-existing cognitive reserve.</li>
                <li><span className="font-semibold text-foreground">BRAIN-ICU:</span> Longer delirium duration was independently associated with worse global cognition at 3 and 12 months, irrespective of sedative exposure or age.</li>
                <li><span className="font-semibold text-foreground">Assessment:</span> Montreal Cognitive Assessment (MoCA), Mini-Mental State Examination (MMSE), neuropsychological testing battery for detailed assessment.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Psychological Domain</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><span className="font-semibold text-foreground">Depression:</span> 30–40% at 12 months. Associated with functional limitation, pain, and pre-existing mental health history.</li>
                <li><span className="font-semibold text-foreground">Anxiety:</span> 30–40% prevalence. Often co-morbid with depression and PTSD.</li>
                <li><span className="font-semibold text-foreground">PTSD:</span> 10–25% of ICU survivors. Risk factors: delirium, benzodiazepine use, recall of frightening ICU experiences, restraint use, and female sex.</li>
                <li><span className="font-semibold text-foreground">Sleep disturbance:</span> Insomnia, fragmented sleep architecture, and circadian disruption persist for months post-discharge.</li>
                <li><span className="font-semibold text-foreground">Assessment tools:</span> Hospital Anxiety and Depression Scale (HADS), Patient Health Questionnaire (PHQ-9), Impact of Event Scale – Revised (IES-R) for PTSD screening.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border-2 border-primary/20 bg-secondary/20">
              <p className="font-semibold text-foreground text-sm">PICS-Family (PICS-F)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Anxiety in 70% of family members during ICU stay; persists in 15–25% at 6 months</li>
                <li>Depression in 15–30% of caregivers; complicated grief in those bereaved in ICU</li>
                <li>PTSD symptoms in 30–50% of family members — higher if witnessed resuscitation or end-of-life decisions</li>
                <li>Caregiver burden, social isolation, financial strain, and relationship disruption</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Risk Factors for PICS</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { factor: "Delirium duration", detail: "Strongest modifiable risk factor for cognitive PICS. Each day of delirium increases risk of long-term cognitive impairment (BRAIN-ICU)." },
              { factor: "Sepsis & multi-organ failure", detail: "Systemic inflammation damages CNS, peripheral nerves, and muscles simultaneously. Higher SOFA scores predict worse outcomes." },
              { factor: "Prolonged mechanical ventilation", detail: "Duration of MV correlates with ICUAW severity, PTSD risk, and cognitive decline. Promotes immobility and delirium." },
              { factor: "Benzodiazepine use", detail: "Associated with delirium (Pandharipande, 2006) and PTSD. Use dexmedetomidine or propofol-based sedation where possible." },
              { factor: "Pre-existing factors", detail: "Prior psychiatric history, cognitive impairment, frailty, alcohol dependence, and low socioeconomic status increase vulnerability." },
              { factor: "ICU environment", detail: "Sleep deprivation, noise, loss of day-night cycle, physical restraint, and social isolation contribute to psychological morbidity." },
            ].map((item) => (
              <div key={item.factor} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.factor}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Prevention — The ABCDEF Bundle</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The <span className="font-semibold text-foreground">ABCDEF bundle</span> is an evidence-based framework to reduce PICS risk during ICU admission:
          </p>
          <div className="space-y-2 mb-4">
            {[
              { letter: "A", title: "Assess, prevent, and manage pain", detail: "Protocolised analgesia. Use BPS or CPOT scales. Prioritise multimodal analgesia over opioids." },
              { letter: "B", title: "Both spontaneous awakening and breathing trials", detail: "Daily SAT + SBT. Paired trials reduce ventilation duration and ICU stay (Girard, 2008 — ABC trial)." },
              { letter: "C", title: "Choice of analgesia and sedation", detail: "Avoid benzodiazepines. Target light sedation (RASS 0 to -1). Use dexmedetomidine or propofol." },
              { letter: "D", title: "Delirium: assess, prevent, and manage", detail: "Screen with CAM-ICU every shift. Non-pharmacological prevention: orientation, sleep hygiene, mobilisation, family presence. Avoid haloperidol routinely." },
              { letter: "E", title: "Early mobilisation and exercise", detail: "Within 48–72h. Schweickert (2009): improved functional outcomes and reduced delirium. Structured rehab programme." },
              { letter: "F", title: "Family engagement and empowerment", detail: "Open visiting, family participation in care, communication, ICU diaries, and psychological support for families." },
            ].map((item) => (
              <div key={item.letter} className="p-3 rounded-lg bg-secondary/30 border border-border flex gap-3">
                <span className="font-bold text-primary text-lg shrink-0">{item.letter}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">ICU Diaries</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Patient diaries written by staff and family during the ICU stay help bridge memory gaps and provide a coherent narrative. The <span className="font-semibold text-foreground">POPPI trial</span> (2019) showed no overall benefit from a nurse-led preventive psychological intervention, but <span className="font-semibold text-foreground">Jones et al. (2010)</span> demonstrated that ICU diaries reduced new-onset PTSD symptoms. Diaries are recommended by NICE and ICS guidelines as part of routine ICU care.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2">ICU Follow-Up Clinic Structure</h3>
          <div className="p-4 rounded-lg border border-border mb-3">
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li><span className="font-semibold text-foreground">Timing:</span> First visit at 2–3 months post-discharge, then 6 and 12 months. NICE CG83 (2009, updated 2017) recommends structured follow-up for patients with ICU stays ≥4 days.</li>
              <li><span className="font-semibold text-foreground">Team:</span> ICU consultant, specialist nurse, physiotherapist, psychologist, pharmacist. GP liaison essential.</li>
              <li><span className="font-semibold text-foreground">Physical assessment:</span> Functional capacity (6MWT, grip strength), nutritional status, wound healing, ongoing organ dysfunction, medication review.</li>
              <li><span className="font-semibold text-foreground">Cognitive screening:</span> MoCA or MMSE. Referral for neuropsychological assessment if deficits detected. Occupational therapy for cognitive rehabilitation.</li>
              <li><span className="font-semibold text-foreground">Psychological screening:</span> HADS (anxiety/depression), IES-R (PTSD). Referral to clinical psychology or liaison psychiatry. Signpost to peer support groups.</li>
              <li><span className="font-semibold text-foreground">ICU diary review:</span> Walk through the diary with the patient to contextualise their ICU experience, fill memory gaps, and address delusional memories.</li>
              <li><span className="font-semibold text-foreground">Return to work support:</span> Occupational health referral, phased return planning, vocational rehabilitation. Address employer communication.</li>
              <li><span className="font-semibold text-foreground">Family/carer support:</span> Screen for PICS-F. Offer psychological support and signpost to carer services.</li>
            </ul>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2">Key Trials & Evidence</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><span className="font-semibold text-foreground">Herridge et al. (2003, 2011):</span> ARDS survivors — persistent functional limitation and reduced quality of life at 5 years. Muscle wasting and weakness were the primary causes, not pulmonary dysfunction.</li>
            <li><span className="font-semibold text-foreground">BRAIN-ICU (Pandharipande, 2013):</span> 821 patients — delirium duration independently predicted cognitive impairment at 3 and 12 months. 34% had deficits similar to moderate TBI at 12 months.</li>
            <li><span className="font-semibold text-foreground">Schweickert (2009):</span> Early physical and occupational therapy in MV patients — improved functional independence at discharge (59% vs 35%), shorter delirium (2 vs 4 days).</li>
            <li><span className="font-semibold text-foreground">Girard — ABC trial (2008):</span> Paired SAT + SBT reduced ventilation days, ICU stay, and 1-year mortality compared to SBT alone.</li>
            <li><span className="font-semibold text-foreground">POPPI (2019):</span> Nurse-led preventive psychological intervention did not reduce PTSD at 6 months. Highlights difficulty of single-component psychological interventions in ICU.</li>
          </ul>
        </ExamSection>
      </section>

      <VentilatorWaveformsGuideDiagram />

      <SynthesisBlock
        title="Mechanical Ventilation — At a Glance"
        subtitle="A consolidated reference linking mode choice, lung-protective targets, weaning, and long-term complications."
        variant="table"
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-2 text-foreground font-semibold">Domain</th>
              <th className="text-left p-2 text-foreground font-semibold">Target / Threshold</th>
              <th className="text-left p-2 text-foreground font-semibold">Rationale</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            {[
              ["Mode (initial)", "VCV (controlled) or PCV with set RR/FiO₂/PEEP", "VCV guarantees minute volume; PCV limits peak airway pressure"],
              ["Tidal volume", "6 ml/kg PBW (ARDS); 6–8 ml/kg PBW (uninjured lung)", "ARDSNet 2000 — ↓ ventilator-induced lung injury & mortality"],
              ["Plateau pressure", "<30 cmH₂O", "Surrogate for end-inspiratory transpulmonary pressure / overdistension"],
              ["Driving pressure", "<15 cmH₂O", "Amato 2015 — strongest mortality predictor independent of Vt"],
              ["PEEP", "5–24 cmH₂O titrated to oxygenation/compliance", "ALVEOLI / EXPRESS / LOV — moderate-high PEEP in moderate-severe ARDS"],
              ["Weaning trigger", "FiO₂ ≤0.4, PEEP ≤8, awake, haemodynamically stable", "Daily SAT + SBT (ABC trial) — ↓ ventilator days"],
              ["Tracheostomy timing", "Day 7–10 if extubation unlikely (TracMan)", "No mortality benefit from very early; consider patient comfort"],
              ["VAP prevention bundle", "HOB 30–45°, oral chlorhexidine, daily SAT, SUP, VTE prophylaxis", "↓ VAP rates; quality marker"],
              ["Post-ICU follow-up", "Screen for PICS at 2–3 months", "Cognitive, physical, psychological domains — early rehab improves outcomes"],
            ].map(([domain, target, rationale]) => (
              <tr key={domain as string} className="border-b border-border/50">
                <td className="p-2 font-medium">{domain}</td>
                <td className="p-2 text-muted-foreground">{target}</td>
                <td className="p-2 text-muted-foreground">{rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SynthesisBlock>

    </>
      }
    />
  );
};

export default MechanicalVentilationTopic;

