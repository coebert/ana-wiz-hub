import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { InlineRef } from "@/components/topic/InlineRef";
import { vaporizersQuiz } from "@/data/quizzes";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { VaporizerDiagram } from "@/components/diagrams/physics/VaporizerDiagram";
import VaporiserSplittingRatioDiagram from "@/components/diagrams/physics/VaporiserSplittingRatioDiagram";

const vaporisersFaqs: Array<[string, string]> = [
  [
    "How does a variable-bypass vaporiser maintain a constant output concentration?",
    "Fresh gas is split between a bypass channel and a vaporising chamber where it becomes fully saturated with volatile vapour. The splitting ratio is set by the dial. Temperature compensation is achieved by a bimetallic strip (or expansion bellows) that increases bypass flow as temperature falls (preventing output drop as latent heat of vaporisation cools the agent). Flow compensation accommodates flows 0.2–15 L/min."
  ],
  [
    "Why does desflurane require a heated, pressurised vaporiser (Tec 6)?",
    "Desflurane has a boiling point of 23.5 °C (close to room temperature) and a saturated vapour pressure of 88 kPa — a conventional variable-bypass vaporiser would deliver unpredictable, dangerously high concentrations. The Tec 6 heats desflurane to 39 °C (vapour pressure 200 kPa) and injects measured vapour into the fresh gas flow; it requires electrical power and a level sensor."
  ],
  [
    "What happens if a vaporiser is tilted or overfilled?",
    "Tilting may flood the bypass channel with liquid agent, delivering very high concentrations (potentially fatal). Modern vaporisers have anti-spill safeguards but should still be drained before transport. Overfilling is prevented by agent-specific keyed filler systems and a maximum fill line; cross-filling with the wrong agent is a never event and is prevented by the keyed filler."
  ]
];

/**
 * Dedicated FRCA Primary / Final standalone topic page for Anaesthetic
 * Vaporisers. Carved out of the unified Equipment & Monitoring topic so it
 * ranks for the specific high-intent query cluster ("plenum vaporiser",
 * "Tec 6 desflurane", "splitting ratio", "vaporiser at altitude",
 * "saturated vapour pressure of sevoflurane"). Built around two
 * interactive diagrams: the existing schematic (`VaporizerDiagram`) and a
 * new, fully interactive splitting-ratio simulator.
 */

const objectives = [
  "Define saturated vapour pressure (SVP) and explain why it depends only on agent identity and temperature, not on atmospheric pressure.",
  "Quote SVP values at 20 °C for sevoflurane, isoflurane, halothane and desflurane and link each to the vaporiser design required.",
  "Calculate the splitting ratio for a given dial setting using SVP / Patm and predict the effect of altered atmospheric pressure.",
  "Describe the temperature-compensation mechanism of the Tec 5 / Tec 7 (bimetallic strip / aneroid bellows) and explain why the latent heat of vaporisation drives chamber cooling.",
  "Explain the unique engineering of the Tec 6 (Datex-Ohmeda Aladin reservoir) and why desflurane cannot be delivered by a conventional plenum vaporiser.",
  "Compare plenum, draw-over (EMO, Diamedica DPA) and gas / vapour blender designs by indication, accuracy and power requirements.",
  "Identify the safety features that prevent agent mis-filling, tipping, back-pressure and pumping effects.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Splitting ratio for 2 % sevoflurane at sea level",
    scenario: (
      <>
        Sevoflurane SVP at 20 °C = 21.3 kPa. Atmospheric pressure = 101.3 kPa.
        Dial set to 2 %. Calculate the splitting ratio (bypass : chamber).
      </>
    ),
    working: (
      <>
        Chamber gas leaves saturated with sevoflurane:
        <br />
        chamber concentration = SVP / Patm × 100 = 21.3 / 101.3 × 100 ≈ <strong>21 %</strong>.
        <br />
        For each unit of chamber gas (21 % agent) we need bypass gas (0 % agent)
        such that the mix = 2 %. Let r = bypass : chamber.
        <br />
        (r × 0 + 1 × 21) / (r + 1) = 2 → r = (21 − 2) / 2 = <strong>9.5 : 1</strong>.
      </>
    ),
    answer: (
      <>
        Splitting ratio ≈ 9.5 : 1. So for every 10.5 mL of fresh gas, 1 mL passes
        through the chamber and 9.5 mL bypasses it. Confirm with the interactive
        simulator below.
      </>
    ),
    cites: ["BJA Educ 2014", "Al-Shaikh & Stacey Ch.5"],
  },
  {
    title: "Same vaporiser, taken to altitude (Patm 60 kPa)",
    scenario: (
      <>
        The Tec 7 sevoflurane vaporiser is dialled to 2 % at an altitude where
        Patm = 60 kPa. What partial pressure of sevoflurane reaches the patient,
        and does the clinical effect change?
      </>
    ),
    working: (
      <>
        Partial pressure of sevoflurane delivered = dial fraction × Patm
        = 0.02 × 60 = <strong>1.2 kPa</strong>.
        <br />
        At sea level the same dial gives 0.02 × 101.3 = 2.03 kPa — so the
        <em> percentage </em> displayed is the same but the partial pressure has
        fallen by ~40 %. However, SVP is unchanged (depends only on temperature)
        so the chamber concentration is now 21.3 / 60 × 100 = 35.5 % — the
        splitting ratio re-derives to maintain the dialled <em>percentage</em>.
      </>
    ),
    answer: (
      <>
        MAC depends on <strong>partial pressure</strong>, not percentage. At altitude the
        2 % dial setting under-doses the patient. Either dial up to compensate
        (~3.4 % at 60 kPa for an equivalent 2 kPa partial pressure) or
        titrate to clinical signs / processed EEG. This is also why "dial
        compensates automatically" is only true for older variable-bypass
        vaporisers in the <em>opposite</em> sense — they keep dialled %
        constant, not partial pressure.
      </>
    ),
    cites: ["BJA Educ 2014", "Davey & Diba Ch.3"],
  },
  {
    title: "Why desflurane needs the Tec 6",
    scenario: (
      <>
        Desflurane: boiling point 22.8 °C, SVP at 20 °C ≈ 88.5 kPa. Why is a
        conventional Tec 5 / 7 unsuitable, and how does the Tec 6 solve the
        problem?
      </>
    ),
    working: (
      <>
        At 20 °C the chamber concentration would be 88.5 / 101.3 × 100 ≈ 87 % —
        the splitting ratio required for a clinical 6 % delivery becomes huge
        and unstable. Small temperature changes shift SVP enormously (desflurane
        boils within the clinical temperature range), so output would oscillate
        wildly and the agent risks <em>boiling</em> inside the chamber.
      </>
    ),
    answer: (
      <>
        The Tec 6 (and the Datex-Ohmeda Aladin cassette electronic vaporiser)
        avoids the variable-bypass principle entirely. Desflurane is held in a
        sealed reservoir heated to <strong>39 °C</strong> and pressurised to
        <strong> 2 atm (~200 kPa)</strong>, giving a stable vapour pressure of
        ~1.5 atm. A microprocessor-controlled flow valve injects measured pure
        vapour into the fresh-gas stream proportional to the dial setting.
        Effectively a gas / vapour blender, not a splitter.
      </>
    ),
    cites: ["BJA Educ 2014", "Al-Shaikh & Stacey Ch.5"],
  },
];

const keyPoints = [
  {
    text: "SVP depends on agent and temperature, not atmospheric pressure: sevoflurane 21.3 kPa, isoflurane 33.2 kPa, halothane 32.0 kPa, desflurane 88.5 kPa at 20 °C.",
    cites: ["BJA Educ 2014", "Al-Shaikh & Stacey Ch.5"],
  },
  {
    text: "Plenum (Tec 5 / 7) vaporiser: pressurised fresh gas is split, the chamber stream emerges saturated, the bypass stream dilutes it. Splitting ratio = (chamber % − dial %) / dial %.",
    cites: ["Al-Shaikh & Stacey Ch.5"],
  },
  {
    text: "Latent heat of vaporisation cools the chamber, reducing SVP and therefore output. A bimetallic strip (Tec 5) or aneroid bellows (Tec 7) widens the chamber port as temperature falls, restoring output — temperature compensation.",
    cites: ["Davey & Diba Ch.3"],
  },
  {
    text: "Output at altitude: the partial pressure delivered ≈ dial fraction × Patm. Clinical effect (MAC) depends on partial pressure, so a 2 % sevoflurane dial under-doses at altitude despite reading 2 % on the rotameter.",
    cites: ["BJA Educ 2014"],
  },
  {
    text: "Tec 6: electrically heated to 39 °C, pressurised to 2 atm, injects measured pure vapour. A gas / vapour blender, not a variable-bypass splitter. Required for desflurane (BP 22.8 °C).",
    cites: ["BJA Educ 2014"],
  },
  {
    text: "Datex-Ohmeda Aladin cassette: single electronic vaporiser body reads an interchangeable agent cassette (desflurane cassette also incorporates the heating element).",
    cites: ["Al-Shaikh & Stacey Ch.5"],
  },
  {
    text: "Draw-over vaporisers (EMO, Diamedica DPA): low internal resistance, patient's inspiratory effort or self-inflating bag draws ambient air through them, optional O₂ enrichment, no compressed gas or mains power needed — standard in austere settings.",
    cites: ["BJA Educ 2014"],
  },
  {
    text: "Safety features: agent-specific filler (Selectatec / keyed Saf-T-Fill) prevents wrong-agent filling; interlocks prevent simultaneous use of two vaporisers; tipping > 45° contaminates the bypass with liquid agent — flush before use.",
    cites: ["Al-Shaikh & Stacey Ch.5", "Davey & Diba Ch.3"],
  },
  {
    text: "Pumping effect: intermittent back-pressure (IPPV, O₂ flush) can push gas back into the chamber and then forward again, transiently raising output. Modern Tec designs incorporate a one-way valve and long inlet tube to mitigate this.",
    cites: ["Davey & Diba Ch.3"],
  },
  {
    text: "Pre-use check (AAGBI 2012): correct agent and adequate fill level, no leaks (single-vaporiser test with occluded common gas outlet), interlock function, and that vaporiser dials return to zero.",
    cites: ["BJA Educ 2014"],
  },
];

const VaporisersTopic = () => {
  return (
    <TopicTemplate
      title="Anaesthetic Vaporisers"
      subtitle="FRCA Primary / Final — Physics (plenum, Tec 6, draw-over, splitting-ratio physics)"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="vaporisers"
      topicTitle="Anaesthetic Vaporisers"
      quizQuestions={vaporizersQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2014", "Al-Shaikh & Stacey Ch.5"],
        keyPoints: ["BJA Educ 2014", "Al-Shaikh & Stacey Ch.5", "Davey & Diba Ch.3"],
        workedExamples: ["BJA Educ 2014", "Al-Shaikh & Stacey Ch.5"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <section className="space-y-6">
            {/* Why it matters */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Why vaporisers are FRCA bread-and-butter
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Vaporisers convert a liquid volatile agent into a precisely
                metered vapour added to the fresh-gas flow. The exam tests
                three things repeatedly: the underlying physics (SVP, latent
                heat, partial pressure vs percentage), the splitting-ratio
                calculation, and the engineering of the Tec 6 (the only
                clinically used vaporiser that is <em>not</em> a variable
                bypass). Master those and the equipment viva looks after
                itself.
              </p>
            </div>

            {/* Splitting ratio interactive */}
            <VaporiserSplittingRatioDiagram />

            {/* Plenum / variable bypass schematic */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Plenum (variable-bypass) vaporiser — schematic
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Examine the standard Tec 5 / 7 schematic below. Trace the fresh
                gas through the splitting valve, follow the chamber stream
                across the wicks (which maximise the gas/liquid interface),
                and notice the bimetallic strip — the unsung hero of clinical
                output stability.
              </p>
              <div className="not-prose">
                <VaporizerDiagram />
              </div>
            </div>

            {/* Tec 6 */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                The Tec 6 — a different beast
              </h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li>
                  Sealed reservoir of liquid desflurane heated electrically to
                  <strong> 39 °C</strong> and pressurised to <strong>2 atm</strong>.
                </li>
                <li>
                  At 39 °C and 2 atm, vapour pressure of desflurane is ~1.5 atm —
                  always saturated, always above ambient.
                </li>
                <li>
                  A microprocessor reads dial position and fresh-gas flow, then
                  opens a flow-control valve to inject measured pure vapour
                  proportionally into the FGF — effectively a gas/vapour
                  blender.
                </li>
                <li>
                  Requires mains power and time to warm up (~5–10 min) — clear
                  visual alarms if power fails or warm-up incomplete.
                </li>
                <li>
                  Unlike a variable-bypass vaporiser, dialled <em>percentage</em>
                  is held constant even at altitude — but, as with every
                  vaporiser, the <em>partial pressure</em> delivered still falls
                  with Patm.
                </li>
              </ul>
            </div>

            {/* Aladin cassette */}
            <div id="aladin-cassette">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                The Aladin cassette system (Datex-Ohmeda / GE workstations)
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  The Aladin is a hybrid: a <strong>single electronic control unit built into the workstation</strong> plus a set of
                  lightweight, <strong>interchangeable agent-specific cassettes</strong> (sevoflurane, isoflurane, desflurane,
                  halothane, enflurane). Only the cassette — essentially a sump of liquid agent with a wick and one gas connection —
                  is changed; the measurement and control electronics stay in the machine.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Identification:</strong> each cassette is colour-coded, keyed, and carries a <strong>magnetic identifier</strong> that the machine reads, so the workstation knows the agent, its SVP characteristics and cannot be filled or run as the wrong agent.</li>
                  <li><strong>Flow control:</strong> the machine measures fresh gas flow, temperature and pressures and uses an <strong>electronically controlled valve to divert a calculated portion of fresh gas into the cassette sump</strong> — the splitting is computed, not mechanical.</li>
                  <li><strong>Vapour delivery:</strong> gas leaves the cassette <strong>saturated</strong> and rejoins the bypass flow inside the machine; a flow measurement on the cassette limb allows closed-loop correction of the delivered concentration, so output stays accurate across flows and altitude.</li>
                  <li><strong>Safety and convenience:</strong> cassettes are light and easy to swap, <strong>can be tipped or carried without spilling liquid into the bypass</strong> (unlike a Tec, which must be flushed after tilting &gt;45°), agent level is shown digitally, the interlock is electronic rather than mechanical, and agent use is logged automatically for record keeping. Failure of electronics or power means no vapour delivery — an alternative vaporiser or a TIVA plan is essential.</li>
                  <li><strong>Desflurane is the exception:</strong> the desflurane cassette is <strong>heated</strong> (with its own heating element and pressure control) because desflurane boils at 22.8 °C; functionally it behaves like a Tec 6-style measured-vapour injector rather than a passive saturating sump.</li>
                </ul>
                <p><InlineRef topicId="vaporisers" refLabel="Al-Shaikh & Stacey Ch.5" /> <InlineRef topicId="vaporisers" refLabel="Davey & Diba Ch.3" /></p>
              </div>
            </div>

            {/* Altitude */}
            <div id="altitude">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Vaporiser output at altitude
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Work through it in steps — the exam wants the mechanism, not just the conclusion
                  <InlineRef topicId="vaporisers" refLabel="BJA Educ 2014" />.
                </p>
                <ol className="list-decimal list-inside space-y-1">
                  <li><strong>The output equation.</strong> For a variable-bypass vaporiser, delivered concentration
                    C<sub>out</sub> ≈ [SVP / (P<sub>atm</sub> − SVP)] × (Flow<sub>chamber</sub> / Flow<sub>total</sub>) × 100 %, i.e.
                    C<sub>out</sub> is proportional to P<sub>atm</sub> / (P<sub>atm</sub> − SVP) for a fixed splitting ratio.</li>
                  <li><strong>SVP is a property of the agent and its temperature only</strong> — it does not change with altitude. P<sub>atm</sub> does fall (≈60 kPa at 4000 m).</li>
                  <li><strong>Therefore the saturated chamber concentration rises</strong> (sevoflurane 21.3/101.3 ≈ 21 % at sea level, 21.3/60 ≈ 36 % at 60 kPa), so for the same splitting ratio the <em>volumes per cent</em> leaving the vaporiser <strong>increases</strong>.</li>
                  <li><strong>Partial pressure is preserved.</strong> P<sub>out</sub> = C<sub>out</sub> × P<sub>atm</sub>: the rise in concentration almost exactly offsets the fall in atmospheric pressure, so the delivered <strong>partial pressure — the determinant of MAC and clinical effect — is essentially unchanged</strong>. Practically, a plenum vaporiser is self-compensating: leave the dial where you normally would, and accept that the rotameter/agent monitor will read a higher percentage than usual.</li>
                  <li><strong>Contrast the Tec 6.</strong> It injects pure vapour to achieve the dialled <em>concentration</em>, so at altitude concentration is held constant and the delivered <strong>partial pressure falls in proportion to P<sub>atm</sub></strong> — the patient is under-dosed. Compensate by increasing the dial roughly by the factor 101/P<sub>atm</sub> (e.g. dial ~10 % at 60 kPa to obtain a sea-level 6 % equivalent), guided by an agent monitor and depth-of-anaesthesia assessment. The reverse applies in a hyperbaric chamber.</li>
                </ol>
              </div>
            </div>

            {/* Flow and viscosity effects */}
            <div id="flow-effects">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Effects of fresh gas flow and gas composition on output
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Modern plenum vaporisers are calibrated and accurate to about ±10 % over a stated range, typically
                  <strong> 0.25–15 L/min</strong>. Outside that range the assumption that chamber gas leaves fully saturated, in the
                  designed splitting ratio, breaks down <InlineRef topicId="vaporisers" refLabel="BJA Educ 2014" />.
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Very low flows (&lt;250 mL/min):</strong> output is unpredictable and typically <strong>lower than dialled</strong>. Flow within the chamber is too slow and too laminar to mix and sweep vapour off the wicks efficiently, and back-diffusion and the relatively greater effect of internal resistances distort the splitting ratio.</li>
                  <li><strong>Very high flows (&gt;15 L/min):</strong> output again falls <strong>below</strong> the dial because gas transit time through the chamber is too short for <strong>complete saturation</strong>, and the cooling effect of rapid vaporisation outstrips temperature compensation.</li>
                  <li><strong>Gas composition and viscosity/density:</strong> switching from oxygen to a nitrous oxide–oxygen mixture alters gas viscosity and density and therefore the distribution of flow between the low-resistance bypass and the chamber channels, causing a small change in output. There is also a transient dip as nitrous oxide dissolves in the liquid agent when it is first introduced. Modern designs keep resistances similar in both limbs, so these effects are small and clinically minor — but they are the reason a vaporiser is calibrated for a specific carrier gas.</li>
                  <li><strong>Practical corollary:</strong> at very low or very high flows, and after changing carrier gas, confirm the delivered concentration with an <strong>agent monitor</strong> rather than trusting the dial.</li>
                </ul>
              </div>
            </div>



            {/* Comparison table */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Designs compared
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  {
                    name: "Plenum (Tec 5 / 7)",
                    use: "Theatre — sevo / iso / halothane.",
                    power: "None (mechanical).",
                    strength:
                      "Highly accurate (±10 %), temperature- and flow-compensated, well understood.",
                    weakness:
                      "Single-agent, high internal resistance — needs pressurised FGF.",
                  },
                  {
                    name: "Tec 6 / Aladin desflurane",
                    use: "Theatre — desflurane only.",
                    power: "Mains electricity + battery backup.",
                    strength:
                      "Stable output despite SVP > 1 atm; integrates with electronic workstation.",
                    weakness:
                      "Power-dependent; expensive; agent-specific cassette.",
                  },
                  {
                    name: "Draw-over (EMO, DPA)",
                    use: "Field, military, low-resource ICU.",
                    power: "None — patient effort or self-inflating bag.",
                    strength:
                      "Low resistance, runs on air ± supplemental O₂, robust.",
                    weakness:
                      "Less accurate, flow-dependent output, single-fill agent.",
                  },
                ].map((d) => (
                  <div key={d.name} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{d.name}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Use:</strong> {d.use}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <strong>Power:</strong> {d.power}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <strong>Strength:</strong> {d.strength}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      <strong>Weakness:</strong> {d.weakness}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common pitfalls */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Common exam pitfalls
              </h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>
                  Confusing percentage (a ratio) with partial pressure (an
                  absolute, the thing the brain detects).
                </li>
                <li>
                  Claiming SVP changes with Patm — it does not; SVP is a
                  property of the agent and its temperature alone.
                </li>
                <li>
                  Forgetting that latent heat cooling reduces SVP and would
                  reduce output if temperature compensation did not widen the
                  chamber port.
                </li>
                <li>
                  Describing the Tec 6 as a "heated splitting vaporiser" — it is
                  a gas/vapour blender, not a variable-bypass design.
                </li>
                <li>
                  Tipping a Tec 5 / 7 &gt; 45 ° and using it without first
                  running high-flow gas through it to clear liquid agent from
                  the bypass.
                </li>
                <li>
                  Confusing the pumping effect (back-pressure raising output)
                  with the pressurising effect (modern designs).
                </li>
              </ul>
            </div>
          </section>
        </ExamSection>
          <TopicFaqs faqs={vaporisersFaqs} />
        </>
      }
    />
  );
};

export default VaporisersTopic;
