import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { ventilatorModesQuiz } from "@/data/quizzes";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import VentilatorModesDiagram from "@/components/diagrams/physics/VentilatorModesDiagram";
import { InlineRef } from "@/components/references/InlineRef";

const ventilatorModesFaqs: Array<[string, string]> = [
  [
    "What is the difference between volume-controlled and pressure-controlled ventilation?",
    "VCV — set tidal volume guaranteed, airway pressure varies with compliance/resistance. Risk: barotrauma if compliance falls (pressure rises). PCV — set inspiratory pressure, tidal volume varies with compliance/resistance. Decelerating flow improves gas distribution; risk: hypoventilation if compliance falls (volume drops). Modern hybrid modes (PRVC, VC+) target a set volume at the lowest pressure."
  ],
  [
    "What is pressure support and when is it used?",
    "Patient-triggered breaths are augmented to a set pressure; the patient sets rate, depth and inspiratory time, cycling to expiration at a flow threshold (typically 25 % of peak). Used for weaning, in spontaneously breathing patients on a SAD, and in NIV. Reduces work of breathing while preserving patient control. Apnoea backup must always be enabled."
  ],
  [
    "What lung-protective ventilation settings are recommended in ARDS?",
    "Tidal volume 6 mL/kg predicted body weight, plateau pressure ≤30 cmH₂O, driving pressure ≤15 cmH₂O, PEEP titrated to oxygenation (FiO₂/PEEP table), permissive hypercapnia (pH ≥7.20), and prone positioning for P/F <150 (PROSEVA trial — 28-day mortality 16 % vs 33 %). Apply to all mechanically ventilated patients, not just those with ARDS (lung-protective by default)."
  ]
];

/**
 * Standalone FRCA Final / FFICM topic page on ventilator modes. Carved
 * out of the unified Equipment & Monitoring topic and complementary to
 * the broader Mechanical Ventilation ICU page (which covers ARDS net
 * protocols, weaning bundles and rescue strategies). This page is the
 * "modes" deep-dive: what does the clinician set, what does the machine
 * deliver, and what does the resulting waveform look like.
 */

const objectives = [
  "Define the four target variables of any ventilator breath: trigger, limit, cycle and baseline.",
  "Describe AC/CMV (pressure- and volume-controlled), SIMV, PSV/CPAP and PRVC in terms of trigger, limit and cycle.",
  "Identify each mode by inspection of its pressure, flow and volume waveforms.",
  "List the parameters the clinician sets vs the parameters the machine controls in each mode.",
  "Justify the choice of mode for the apnoeic ARDS patient, the weaning patient and the patient with high respiratory drive.",
  "Recognise dyssynchrony patterns (double-trigger, ineffective effort, reverse-trigger, auto-cycling) on the waveform display.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Choosing a mode for ARDS with low compliance",
    scenario: (
      <>
        A 65 kg patient with COVID ARDS has compliance 25 mL/cmH₂O and
        PaO₂/FiO₂ 12 kPa. You want lung-protective ventilation with
        Vt 6 mL/kg (≈ 390 mL) and Pplat ≤ 30 cmH₂O.
      </>
    ),
    working: (
      <>
        <strong>Volume-controlled AC</strong> guarantees Vt but Pplat will
        rise as compliance falls — you must alarm-limit and adjust.
        <strong> Pressure-controlled AC </strong> guarantees Pinsp but Vt
        will fall as compliance falls — risk of hypercapnia.{" "}
        <strong>PRVC </strong> targets Vt while keeping the
        pressure-controlled waveform: the ventilator measures delivered Vt
        breath-to-breath and adjusts Pinsp by roughly 75 % of the gap on
        the next breath, subject to a hard Pinsp ceiling (set 5 cmH₂O
        below the desired Pplat).
      </>
    ),
    answer: (
      <>
        Start <strong>PRVC</strong> with Vt 390 mL, rate 22/min,
        Pinsp ceiling 25 cmH₂O, PEEP 12 cmH₂O, FiO₂ 0.6. Recheck Pplat
        after stabilisation; if Pplat &gt; 30, accept hypercapnia (pH
        7.20–7.30) before raising Vt.
      </>
    ),
    cites: ["DerangedPhys CC2.3", "Tobin 3rd ed Ch.9"],
  },
  {
    title: "Why SIMV prolongs weaning",
    scenario: (
      <>
        A consultant insists on weaning your post-op cardiac patient on
        SIMV, reducing the mandatory rate by 2/min each day. The
        registrar wants to switch to PSV trials. What does the evidence
        say?
      </>
    ),
    working: (
      <>
        Brochard 1994 (NEJM, n = 109) and Esteban 1995 (NEJM, n = 130)
        both randomised difficult-to-wean patients between SIMV, PSV and
        T-piece trials. SIMV consistently came last — roughly{" "}
        <strong>three times longer </strong> to extubation than the other
        two arms. The mechanism is mixed work of breathing: every
        spontaneous breath between mandatory breaths is unsupported (or
        under-supported), but the diaphragm cannot "tell" which breath is
        which, so effort and rate adapt poorly.
      </>
    ),
    answer: (
      <>
        Recommend daily <strong>spontaneous breathing trials</strong> on
        PSV 5–7 cmH₂O over PEEP 5 (or T-piece), with RSBI &lt; 105 as a
        gate to extubation. SIMV has no role in modern weaning.
      </>
    ),
    cites: ["Brochard 1994", "Esteban 1995"],
  },
  {
    title: "PRVC paradox — air-hungry patient",
    scenario: (
      <>
        An ARDS patient on PRVC (Vt 6 mL/kg) develops worsening tachypnoea
        and tugging. The ventilator's Pinsp display has fallen from 24 to
        16 cmH₂O over the last hour. Why?
      </>
    ),
    working: (
      <>
        PRVC adjusts Pinsp to hit the set Vt. As the patient's spontaneous
        effort rises, transpulmonary pressure increases for any given
        airway pressure, so the <em>measured</em> tidal volume rises above
        target. The machine responds by <em>reducing</em> Pinsp —
        precisely the opposite of what an air-hungry patient needs. The
        patient is now working harder against less machine support, a
        recognised driver of P-SILI (patient self-inflicted lung injury).
      </>
    ),
    answer: (
      <>
        Either deepen sedation (± neuromuscular blockade) to suppress
        drive while remaining on PRVC, or switch to a mode that does not
        penalise patient effort (e.g. PCV-AC with a fixed Pinsp, or
        APRV). Reassess oxygenation, pain and metabolic acidosis as
        drivers of drive.
      </>
    ),
    cites: ["DerangedPhys CC2.3", "Tobin 3rd ed Ch.9"],
  },
];

const keyPoints = [
  {
    text: "Every ventilator breath is defined by four phase variables: trigger (what starts the breath — time or patient effort), limit (what the breath cannot exceed during inspiration — flow, pressure or volume), cycle (what ends inspiration — time, volume or flow decay), and baseline (PEEP).",
    cites: ["Tobin 3rd ed Ch.9"],
  },
  {
    text: "AC/CMV: every breath, whether triggered by patient or timer, receives the same fully supported breath. Pressure-controlled AC delivers a square Pinsp with decelerating flow and variable Vt; volume-controlled AC delivers a fixed Vt with a constant or decelerating flow and variable Pinsp.",
    cites: ["DerangedPhys CC2.3"],
  },
  {
    text: "SIMV delivers a fixed number of mandatory breaths per minute synchronised to patient effort; extra patient breaths between mandatory breaths are either unsupported or pressure-supported. SIMV prolongs weaning compared with PSV or T-piece (Brochard 1994, Esteban 1995) and is no longer recommended as a weaning mode.",
    cites: ["Brochard 1994", "Esteban 1995"],
  },
  {
    text: "PSV: every breath is patient-triggered; the machine applies a set inspiratory pressure (above PEEP) and cycles to expiration when inspiratory flow falls to ~25 % of peak (flow-cycled). CPAP is the special case where pressure support = 0. PSV requires intact respiratory drive — apnoea backup is mandatory.",
    cites: ["Hess & Kacmarek Ch.5"],
  },
  {
    text: "PRVC (also VC+, AutoFlow, VG) is pressure-controlled in waveform but volume-targeted in feedback: the ventilator measures the previous breath's Vt and adjusts the next breath's Pinsp by ~75 % of the gap, within a clinician-set ceiling. Useful in changing compliance but penalises patient effort.",
    cites: ["DerangedPhys CC2.3"],
  },
  {
    text: "Mode by waveform fingerprint: square Paw + decelerating flow = pressure-controlled (PCV-AC or PRVC); square flow + ramping Paw = VCV; small triggered breaths alternating with large supported breaths = SIMV + PS; flat PEEP with triggered Paw squares = PSV/CPAP.",
    cites: ["Tobin 3rd ed Ch.9"],
  },
  {
    text: "Dyssynchrony patterns recognised on waveform: double-triggering (two stacked breaths from one effort — typical of low Vt + high drive), ineffective effort (flow/pressure deflection without a delivered breath — over-sedation or auto-PEEP), reverse-triggering (mandatory breath drags the diaphragm), and auto-cycling (cardiac oscillations triggering breaths).",
    cites: ["Tobin 3rd ed Ch.9"],
  },
  {
    text: "Lung-protective ventilation (ARDSnet): Vt 6 mL/kg predicted body weight, Pplat ≤ 30 cmH₂O, driving pressure ≤ 15 cmH₂O, PEEP titrated to FiO₂. Achievable in any mode that lets you control or measure Vt and Pplat — PRVC and VC-AC are the common defaults.",
    cites: ["ARDSnet 2000"],
  },
  {
    text: "Weaning readiness: SBT on PSV 5–7 over PEEP 5 (or T-piece) for 30–120 min. Pass criteria — RSBI < 105, RR < 35, SpO₂ ≥ 90 % on FiO₂ ≤ 0.4, no haemodynamic instability, no agitation. RSBI = RR / Vt(L).",
    cites: ["Yang & Tobin 1991", "Brochard 1994"],
  },
  {
    text: "Mode selection summary: deeply sedated / paralysed → AC (VC or PC); ARDS with changing compliance → PRVC; spontaneous, weaning, or NIV → PSV/CPAP; partial support transitioning → PSV (not SIMV).",
    cites: ["DerangedPhys CC2.3", "Hess & Kacmarek Ch.5"],
  },
];

const VentilatorModesTopic = () => {
  return (
    <TopicTemplate
      title="Ventilator Modes"
      subtitle="FRCA Final / FFICM — AC/CMV, SIMV, PSV/CPAP, PRVC: what you set, what the machine delivers, what the waveform looks like"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="ventilator-modes"
      topicTitle="Ventilator Modes"
      quizQuestions={ventilatorModesQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["Tobin 3rd ed Ch.9", "DerangedPhys CC2.3"],
        keyPoints: ["Tobin 3rd ed Ch.9", "DerangedPhys CC2.3", "Hess & Kacmarek Ch.5"],
        workedExamples: ["DerangedPhys CC2.3", "Tobin 3rd ed Ch.9"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Read the waveform, name the mode
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The bedside skill that examiners (and ICU registrars) test
                most is mode identification by waveform. Every mode has a
                visual fingerprint — square pressure with decelerating
                flow for pressure-controlled breaths, square flow with
                ramping pressure for volume-controlled breaths, alternating
                large-and-small breaths for SIMV, and flat PEEP with
                triggered pressure squares for PSV. The simulator below
                lets you switch between modes and see those fingerprints
                scroll in real time.
              </p>
            </div>

            <VentilatorModesDiagram />

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                The four phase variables
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Any conceivable ventilator breath can be described by
                <strong> four phase variables</strong>. Learning these
                makes new modes (NAVA, PAV, APRV) easy to decode.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "Trigger", detail: "What starts the breath. Time-triggered (mandatory rate) or patient-triggered (flow/pressure sensitivity)." },
                  { name: "Limit", detail: "The ceiling that cannot be exceeded during inspiration: pressure (PCV), flow (VCV with constant flow), or volume (rare)." },
                  { name: "Cycle", detail: "What ends inspiration: time (PCV, VCV), volume (VCV), or flow decay to 25 % of peak (PSV)." },
                  { name: "Baseline", detail: "End-expiratory pressure (PEEP). Set explicitly; intrinsic (auto-) PEEP arises when expiratory time is inadequate." },
                ].map((s) => (
                  <div key={s.name} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{s.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Mode comparison at a glance
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="p-2 font-semibold">Mode</th>
                      <th className="p-2 font-semibold">Trigger</th>
                      <th className="p-2 font-semibold">Limit</th>
                      <th className="p-2 font-semibold">Cycle</th>
                      <th className="p-2 font-semibold">Vt guaranteed?</th>
                      <th className="p-2 font-semibold">Needs drive?</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">VC-AC</td>
                      <td className="p-2">Time or patient</td>
                      <td className="p-2">Flow</td>
                      <td className="p-2">Volume</td>
                      <td className="p-2">Yes</td>
                      <td className="p-2">No</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">PC-AC</td>
                      <td className="p-2">Time or patient</td>
                      <td className="p-2">Pressure</td>
                      <td className="p-2">Time</td>
                      <td className="p-2">No</td>
                      <td className="p-2">No</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">SIMV + PS</td>
                      <td className="p-2">Time (mand) / patient (spont)</td>
                      <td className="p-2">Pressure or flow</td>
                      <td className="p-2">Time / flow</td>
                      <td className="p-2">Only mandatory</td>
                      <td className="p-2">Partial</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-2 font-medium text-foreground">PSV / CPAP</td>
                      <td className="p-2">Patient</td>
                      <td className="p-2">Pressure</td>
                      <td className="p-2">Flow (~25 % peak)</td>
                      <td className="p-2">No</td>
                      <td className="p-2">Yes (essential)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-medium text-foreground">PRVC</td>
                      <td className="p-2">Time or patient</td>
                      <td className="p-2">Pressure (auto-adjusted)</td>
                      <td className="p-2">Time</td>
                      <td className="p-2">Yes (averaged)</td>
                      <td className="p-2">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Dyssynchrony — patterns and fixes
              </h2>
              <p className="text-sm text-muted-foreground mb-3">Dyssynchrony is common, increases work of breathing and ventilator exposure, and an Asynchrony Index (asynchronous events ÷ total respiratory cycles ×100) &gt;10% is associated with longer ventilation and mortality. <InlineRef topicId="ventilator-modes" refLabel="Blanch 2015" /></p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "Double-trigger / breath stacking", detail: "Neural inspiratory time exceeds ventilator inspiratory time, so one effort triggers two breaths. Treat pain/drive, adjust inspiratory time or flow and review mode; sedation or paralysis is rescue therapy." },
                  { name: "Ineffective effort", detail: "Effort cannot overcome auto-PEEP or an insensitive trigger. Perform an expiratory hold; if auto-PEEP is present reduce RR/increase expiratory time and treat obstruction. Otherwise reduce excess sedation and increase trigger sensitivity without causing auto-triggering." },
                  { name: "Reverse-triggering", detail: "Mandatory breath drags diaphragm into a delayed effort. Common in deep sedation post-paralysis. Re-paralyse or change mode." },
                  { name: "Auto-cycling", detail: "Ventilator triggers off cardiac oscillations or circuit leak. Reduce trigger sensitivity, check for cuff leak." },
                ].map((s) => (
                  <div key={s.name} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{s.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div><h2 className="text-2xl font-serif font-bold text-foreground mb-3">Non-Invasive Ventilation</h2><p className="text-muted-foreground">NIV delivers positive pressure without a tracheal tube, principally CPAP or bilevel pressure support. Strong indications include acute hypercapnic COPD exacerbation and acute cardiogenic pulmonary oedema. Interface fit determines comfort and leak; dedicated NIV ventilators generally compensate for large variable leaks and maintain triggering better than conventional ICU circuits, although modern ICU NIV modes can do both. Continually reassess gas exchange, work of breathing, synchrony and need for intubation. <InlineRef topicId="ventilator-modes" refLabel="Intensive Care Med 2012 NIV" /></p></div>

            <div><h2 className="text-2xl font-serif font-bold text-foreground mb-3">Advanced / Non-conventional Modes</h2><div className="grid md:grid-cols-3 gap-3 text-sm text-muted-foreground"><div className="rounded-lg border border-border p-3"><strong className="text-foreground">APRV</strong><p>Prolonged high airway pressure maintains recruitment, with brief pressure releases for CO₂ clearance and possible spontaneous breathing.</p></div><div className="rounded-lg border border-border p-3"><strong className="text-foreground">NAVA</strong><p>Electrical diaphragm activity (Edi) triggers and proportions assistance, potentially improving synchrony.</p></div><div className="rounded-lg border border-border p-3"><strong className="text-foreground">PAV</strong><p>Pressure assistance varies in proportion to measured patient effort and estimated respiratory mechanics.</p></div></div><p className="mt-2 text-sm text-muted-foreground">These modes may help selected severe ARDS or refractory dyssynchrony, but evidence for improved patient-important outcomes remains limited. <InlineRef topicId="ventilator-modes" refLabel="Hess & Kacmarek Ch.5" /></p></div>

            <div><h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ventilator Strategies in Specific Conditions</h2><div className="grid md:grid-cols-2 gap-3 text-sm text-muted-foreground"><div className="rounded-lg border border-border p-3"><strong className="text-foreground">Bronchopleural fistula</strong><p>Goal: minimise flow across the fistula and allow healing. Lowest effective PEEP, Vt 4–6 mL/kg predicted body weight, low respiratory rate, short inspiratory time, and permissive hypercapnia; pressure-controlled modes are usually preferred because they cap peak inspiratory pressure. Avoid excessive negative intrapleural suction, ensure an effective chest drain, and encourage spontaneous breathing where possible. Refractory major leaks: independent (double-lumen) lung ventilation, endobronchial valves or occlusion, high-frequency ventilation, or extracorporeal support. <InlineRef topicId="ventilator-modes" refLabel="Critical Care Med 2021 BPF" /></p></div><div className="rounded-lg border border-border p-3"><strong className="text-foreground">Acute brain injury</strong><p>Goal: avoid secondary injury by controlling ICP and preserving CPP. Target <strong>normocapnia (PaCO₂ 4.5–6.0 kPa / 35–45 mmHg)</strong>, avoid hypoxaemia and marked hyperoxaemia, use lung-protective settings (Vt 6–8 mL/kg predicted body weight, Pplat &lt;30 cmH₂O), and apply PEEP cautiously with ICP monitoring since high PEEP can impede cerebral venous drainage. <strong>Permissive hypercapnia is avoided</strong>; brief hyperventilation is reserved for impending herniation. Maintain MAP for CPP and head-up positioning. <InlineRef topicId="ventilator-modes" refLabel="ARDSnet 2000" /></p></div><div className="rounded-lg border border-border p-3"><strong className="text-foreground">Severe obstructive disease (asthma / COPD)</strong><p>Goal: avoid dynamic hyperinflation and auto-PEEP. Prolong expiration — low respiratory rate (10–14/min), I:E 1:3 to 1:4, higher inspiratory flow, low-to-moderate Vt (6–8 mL/kg predicted body weight) — and accept <strong>permissive hypercapnia</strong> with pH ≳7.20. Detect auto-PEEP with an <strong>expiratory hold manoeuvre</strong> (measured total PEEP above set PEEP) and by failure of expiratory flow to return to zero. Applied PEEP is kept low in asthma; in COPD, modest extrinsic PEEP can counterbalance intrinsic PEEP and improve triggering. Watch for hypotension and barotrauma from hyperinflation — if suspected, disconnect and allow full exhalation.</p><InlineRef topicId="ventilator-modes" refLabel="Tobin 3rd ed Ch.9" /></div><div className="rounded-lg border border-border p-3"><strong className="text-foreground">Overarching principle</strong><p>In each case the physiological target (leak minimisation, normocapnia, expiratory time) dictates the settings; the named mode matters far less than the pressures, volumes and timing you actually deliver.</p><InlineRef topicId="ventilator-modes" refLabel="Hess & Kacmarek Ch.5" /></div></div></div>

            <div id="weaning-readiness">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Weaning readiness and the spontaneous breathing trial</h2>
              <p className="text-muted-foreground leading-relaxed">Screen daily: the underlying cause is improving, adequate oxygenation (PaO₂/FiO₂ &gt; 150–200 on PEEP ≤ 5–8 and FiO₂ ≤ 0.4–0.5), haemodynamic stability with minimal vasopressor, adequate cough and conscious level, and no immediate plan for further surgery. Then run an SBT on PSV 5–7 cmH₂O over PEEP 5 (or a T-piece) for 30–120 minutes.</p>
              <div className="grid md:grid-cols-2 gap-3 text-sm mt-3">
                <div className="rounded-lg border border-border p-3">
                  <strong className="text-foreground">Pass criteria</strong>
                  <ul className="mt-1 list-disc list-inside text-muted-foreground space-y-1">
                    <li>RSBI (RR / Vt in litres) &lt; 105 <InlineRef topicId="ventilator-modes" refLabel="Yang & Tobin 1991" /></li>
                    <li>Respiratory rate &lt; 35/min with acceptable tidal volumes</li>
                    <li>SpO₂ ≥ 90 % on FiO₂ ≤ 0.4 (or PaO₂ ≥ 8 kPa)</li>
                    <li>No haemodynamic instability, no agitation or distress</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <strong className="text-foreground">SBT failure criteria — return to supported ventilation</strong>
                  <ul className="mt-1 list-disc list-inside text-muted-foreground space-y-1">
                    <li>Respiratory rate &gt; 35/min sustained for more than 5 minutes</li>
                    <li>SpO₂ &lt; 90 % (or PaO₂ &lt; 8 kPa on FiO₂ ≥ 0.5), or rising PaCO₂ with acidosis</li>
                    <li>Heart rate &gt; 140/min, or a sustained change of more than 20 % from baseline; new arrhythmia</li>
                    <li>Systolic BP &gt; 180 mmHg or &lt; 90 mmHg</li>
                    <li>Increasing anxiety, agitation or diaphoresis</li>
                    <li>Change in mental status (drowsiness or new confusion)</li>
                    <li>Obvious increased work of breathing: accessory muscle use, tracheal tug, paradoxical abdominal motion</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">Failure is information, not defeat: rest on comfortable support for 24 hours, look for the reversible cause (fluid overload, sedation, diaphragm weakness, sepsis, delirium, cardiac decompensation on unloading), and retest daily. Use PSV or T-piece rather than SIMV, which prolongs weaning <InlineRef topicId="ventilator-modes" refLabel="Brochard 1994" />.</p>
            </div>


            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Common exam pitfalls
              </h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Calling PSV a "mandatory" mode — every PSV breath is patient-triggered; no patient effort, no breath.</li>
                <li>Forgetting PSV is <em>flow-cycled</em> (ends when flow falls to ~25 % peak), unlike PCV which is time-cycled.</li>
                <li>Recommending SIMV for weaning — evidence (Brochard, Esteban) shows it prolongs weaning vs PSV / T-piece.</li>
                <li>Claiming PRVC "guarantees" Vt — it targets Vt; if the Pinsp ceiling is hit, Vt will fall.</li>
                <li>Confusing PC-AC with PRVC on the waveform — both look pressure-controlled; the difference is breath-to-breath Pinsp adjustment, visible over several breaths only.</li>
                <li>Missing the PRVC paradox: rising patient effort causes the machine to reduce Pinsp, increasing work of breathing.</li>
              </ul>
            </div>
          </section>
        </ExamSection>
          <TopicFaqs faqs={ventilatorModesFaqs} />
        </>
      }
    />
  );
};

export default VentilatorModesTopic;
