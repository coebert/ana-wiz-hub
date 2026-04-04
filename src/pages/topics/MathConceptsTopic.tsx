import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import MathConceptsDiagram from "@/components/diagrams/MathConceptsDiagram";
import { mathConceptsQuiz } from "@/data/quizzes";

const MathConceptsTopic = () => {
  return (
    <SectionLayout title="Mathematical Concepts" subtitle="FRCA Primary / Final — Physics" backPath="/physics" backLabel="Physics" accentColor="text-physics">
      <section className="space-y-8 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Many physiological and pharmacological relationships can be understood through their underlying mathematical functions. Recognising the shape of a graph — linear, exponential, sigmoid, hyperbolic — allows you to predict how a system will behave when variables change. This topic covers the key mathematical relationships encountered in anaesthesia and intensive care, with clinical examples for each.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Graph Types & Clinical Examples</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Select each graph type to explore its shape, equation, and real clinical applications.
          </p>
          <MathConceptsDiagram />
        </div>

        {/* Time Constants */}
        <div>
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
        </div>

        {/* Half-life vs Time Constant */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Half-Life vs Time Constant</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Both describe exponential processes. The half-life (t½) is the time for 50% change; the time constant (τ) is the time for 63.2% change.
          </p>
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="text-sm font-mono text-primary text-center mb-2">t½ = τ × ln(2) = 0.693 × τ</p>
            <p className="text-sm text-muted-foreground text-center">
              The half-life is always shorter than the time constant (by a factor of 0.693).
            </p>
          </div>
        </div>

        {/* Logarithms in Medicine */}
        <div>
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
        </div>

        {/* The Sigmoid and Cooperativity */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Sigmoid Curve & Cooperativity</h2>
          <p className="text-muted-foreground leading-relaxed">
            The sigmoid (S-shaped) curve arises when binding or response is <strong>cooperative</strong> — each event makes the next more likely. The Hill coefficient (n) describes the steepness: n = 1 gives a hyperbola (no cooperativity, e.g., myoglobin), n = 2.7 gives the sigmoid ODC (haemoglobin), and n → ∞ gives a step function (all-or-nothing response). In pharmacology, log dose-response curves are sigmoid, with EC₅₀ at the midpoint. Plotting on a log scale straightens the middle portion, making comparison of potency and efficacy easier.
          </p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Linear (y = kx): Ohm's law, laminar flow, Beer-Lambert — direct proportionality",
        "Exponential decay (e⁻ᵏˣ): First-order drug elimination, nitrogen washout, capacitor discharge",
        "Negative exponential rise (1 − e⁻ᵏˣ): Preoxygenation wash-in, volatile agent uptake, capacitor charging",
        "Sigmoid: ODC (cooperative binding), dose-response curves — Hill coefficient determines steepness",
        "One time constant (τ) = 63% change; t½ = 0.693 × τ",
        "Logarithmic scales (pH, dB, pKa) compress large ranges — 1 pH unit = 10× change in [H⁺]",
        "Bi-exponential decay: Two-compartment pharmacokinetics — rapid distribution then slow elimination",
      ]} />

      <QuizSection questions={mathConceptsQuiz} />
      <TopicCompletionToggle topicId="math-concepts" topicTitle="Mathematical Concepts" />
    </SectionLayout>
  );
};

export default MathConceptsTopic;
