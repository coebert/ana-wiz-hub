import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import MathConceptsDiagram from "@/components/diagrams/MathConceptsDiagram";
import TimeConstantDiagram from "@/components/diagrams/TimeConstantDiagram";
import { mathConceptsQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Recognise the canonical graph shapes (linear, exponential decay/rise, sigmoid, hyperbolic) and the equations behind them",
  "Apply the time constant (τ) and half-life (t½) to first-order processes such as drug elimination and pre-oxygenation wash-in",
  "Convert between time constants and half-lives (t½ = 0.693 × τ) and predict completion at 1τ, 3τ and 5τ",
  "Use logarithmic scales (pH, pKa, decibels) to interpret order-of-magnitude changes in clinical variables",
  "Explain why cooperative binding produces a sigmoid curve (Hill coefficient) and recognise it in the ODC and dose-response relationships",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Pre-oxygenation wash-in time",
    scenario:
      "A 70 kg adult has an FRC of 2.5 L and is pre-oxygenated at 8 L/min via a tight-fitting mask. Estimate when end-tidal O₂ will reach 95%.",
    working:
      "τ = Volume / Flow = 2.5 L / 8 L·min⁻¹ = 0.31 min ≈ 19 s.\nWash-in is a negative exponential rise: 1 τ → 63%, 3 τ → 95%, 5 τ → 99%.\nTime to ~95% ≈ 3 τ = 3 × 19 s ≈ 57 s.",
    answer:
      "End-tidal O₂ reaches ~95% after roughly one minute (3 time constants). This underpins the AAGBI recommendation of ≥3 minutes of tidal-volume pre-oxygenation, which provides a comfortable safety margin to ≥99% (5τ).",
    cites: ["Peck & Hill Appendix"],
  },
  {
    title: "Half-life vs time constant in remifentanil",
    scenario:
      "Remifentanil has a context-sensitive half-time of about 3 minutes after a 4-hour infusion. Estimate the corresponding time constant.",
    working:
      "t½ = 0.693 × τ → τ = t½ / 0.693 = 3 / 0.693 ≈ 4.3 min.\nAfter stopping the infusion: 1 τ (≈4.3 min) → 63% drop, 3 τ (≈13 min) → 95% drop.",
    answer:
      "The time constant of decay is ~4.3 min. Plasma concentration falls by ~95% within 13 min of stopping the infusion, explaining why patients reliably emerge within minutes regardless of infusion duration.",
    cites: ["Middleton Appendix"],
  },
];

const MathConceptsTopic = () => {
  return (
    <TopicTemplate
      title="Mathematical Concepts"
      subtitle="Graph shapes, exponentials, logarithms and sigmoid curves underpinning physiology and pharmacokinetics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="math-concepts"
      topicTitle="Mathematical Concepts"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={mathConceptsQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Cross & Plunkett Ch.1"],
      }}
      keyPoints={[
        { text: "Linear (y = kx): Ohm's law, laminar flow, Beer-Lambert — direct proportionality", cites: ["Cross & Plunkett Ch.1"] },
        { text: "Exponential decay (e⁻ᵏˣ): First-order drug elimination, nitrogen washout, capacitor discharge", cites: ["Peck & Hill Appendix"] },
        { text: "Negative exponential rise (1 − e⁻ᵏˣ): Preoxygenation wash-in, volatile agent uptake, capacitor charging", cites: ["Middleton Appendix"] },
        { text: "Sigmoid: ODC (cooperative binding), dose-response curves — Hill coefficient determines steepness", cites: ["Cross & Plunkett Ch.1"] },
        { text: "One time constant (τ) = 63% change; t½ = 0.693 × τ", cites: ["Peck & Hill Appendix"] },
        { text: "Logarithmic scales (pH, dB, pKa) compress large ranges — 1 pH unit = 10× change in [H⁺]", cites: ["Middleton Appendix"] },
        { text: "Bi-exponential decay: Two-compartment pharmacokinetics — rapid distribution then slow elimination", cites: ["Cross & Plunkett Ch.1"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many physiological and pharmacological relationships can be understood through their underlying mathematical functions. Recognising the shape of a graph — linear, exponential, sigmoid, hyperbolic — allows you to predict how a system will behave when variables change. This topic covers the key mathematical relationships encountered in anaesthesia and intensive care, with clinical examples for each.
            </p>
          </ExamSection>

          <ExamSection id="graph-types" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Graph Types & Clinical Examples</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Select each graph type to explore its shape, equation, and real clinical applications.
            </p>
            <MathConceptsDiagram />
          </ExamSection>

          <ExamSection id="time-constants" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Time Constants (τ)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The time constant τ is central to understanding exponential processes. After one time constant, 63% of the change has occurred. After three time constants, 95%. After five, 99% — effectively complete.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "1τ", value: "63.2% complete" },
                { label: "2τ", value: "86.5% complete" },
                { label: "3τ", value: "95.0% complete" },
                { label: "5τ", value: "99.3% complete" },
                { label: "τ for wash-in", value: "τ = Volume / Flow rate" },
                { label: "τ for RC circuit", value: "τ = R × C" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="half-life-vs-tau" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Half-Life vs Time Constant</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Both describe exponential processes. The half-life (t½) is the time for 50% change; the time constant (τ) is the time for 63.2% change.
            </p>
            <div className="p-4 rounded-lg border border-border bg-card">
              <p className="text-sm font-mono text-primary text-center mb-2">t½ = τ × ln(2) = 0.693 × τ</p>
              <p className="text-sm text-muted-foreground text-center">
                The half-life is always shorter than the time constant (by a factor of 0.693).
            </p>
            <div className="my-4">
              <TimeConstantDiagram />
            </div>
            </div>
          </ExamSection>

          <ExamSection id="logarithms" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Logarithmic Scales in Medicine</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Logarithms compress enormous ranges into manageable numbers. Several clinical scales use logarithmic transformations:
            </p>
            <div className="space-y-3">
              {[
                { scale: "pH", detail: "pH = −log₁₀[H⁺]. A change of 1 pH unit = 10-fold change in [H⁺]. pH 7.4 → [H⁺] = 40 nmol/L; pH 7.1 → [H⁺] = 80 nmol/L." },
                { scale: "Decibels (dB)", detail: "dB = 10 log₁₀(I/I₀). A 10 dB increase = 10× intensity. Used in ultrasound attenuation and noise measurement." },
                { scale: "pKa", detail: "pKa = −log₁₀(Ka). Describes acid strength. At pH = pKa, 50% of drug is ionised." },
                { scale: "MAC", detail: "MAC values are often plotted on log scales when comparing agents. Log dose-response curves straighten the sigmoid." },
              ].map((item) => (
                <div key={item.scale} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.scale}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="sigmoid" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Sigmoid Curve & Cooperativity</h2>
            <p className="text-muted-foreground leading-relaxed">
              The sigmoid (S-shaped) curve arises when binding or response is <strong>cooperative</strong> — each event makes the next more likely. The Hill coefficient (n) describes the steepness: n = 1 gives a hyperbola (no cooperativity, e.g., myoglobin), n = 2.7 gives the sigmoid ODC (haemoglobin), and n → ∞ gives a step function (all-or-nothing response). In pharmacology, log dose-response curves are sigmoid, with EC₅₀ at the midpoint. Plotting on a log scale straightens the middle portion, making comparison of potency and efficacy easier.
            </p>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "A semi-log plot turns a single exponential decay into a straight line — used to derive elimination rate constants.",
              "Half-life (t½) = 0.693/k; time constant (τ) = 1/k. Three time constants ≈ 95% complete, five ≈ 99%.",
              "Sigmoid (Hill) curves describe cooperative binding (O₂–Hb) and dose-response; the Hill coefficient quantifies cooperativity.",
              "Log scales compress wide dynamic ranges (pH, decibels, drug potency) — a one-unit change is a tenfold change.",
              "Exponential wash-in and wash-out share the same time constant for first-order processes.",
            ]}
          />
        </>
      }
    />
  );
};

export default MathConceptsTopic;
