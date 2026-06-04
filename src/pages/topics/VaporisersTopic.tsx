import { TopicTemplate } from "@/components/TopicTemplate";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/ExamSection";
import { vaporizersQuiz } from "@/data/quizzes";
import type { WorkedExample } from "@/components/WorkedExamples";
import { VaporizerDiagram } from "@/components/diagrams/VaporizerDiagram";
import VaporiserSplittingRatioDiagram from "@/components/diagrams/VaporiserSplittingRatioDiagram";

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
      }
    />
  );
};

export default VaporisersTopic;
