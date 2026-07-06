import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import MathConceptsDiagram from "@/components/diagrams/physics/MathConceptsDiagram";
import TimeConstantDiagram from "@/components/diagrams/physics/TimeConstantDiagram";
import { mathConceptsQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";

const mathConceptsFaqs: Array<[string, string]> = [
  [
    "What is a time constant and how many are needed for completion?",
    "Time constant (τ) = volume / flow (in compartment kinetics) or R × C (electrical). It is the time taken for an exponential process to reach 63 % of its final value. 3τ reaches 95 %, 5τ reaches 99 % (clinically 'complete'). Example: with FRC 3 L and alveolar ventilation 4 L/min, τ ≈ 0.75 min → wash-in/wash-out ≈ 4 min."
  ],
  [
    "Distinguish zero-order and first-order kinetics with an example.",
    "Zero-order — constant amount eliminated per unit time, independent of concentration (e.g. ethanol, phenytoin at high dose, aspirin in overdose). First-order — constant fraction eliminated per unit time; rate ∝ concentration (e.g. most drugs at therapeutic doses — propofol, fentanyl). Half-life is constant only in first-order kinetics."
  ],
  [
    "What is the difference between mean, median and mode, and when is each preferred?",
    "Mean — arithmetic average; appropriate for normally distributed data. Median — middle value; preferred for skewed or ordinal data (e.g. pain scores, length of stay). Mode — most frequent value; used for categorical data. Reporting median (IQR) is more honest than mean (SD) for ICU length-of-stay because of long-tailed distributions."
  ]
];

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
      "End-tidal O₂ reaches ~95% after roughly one minute (3 time constants). This underpins the Association of Anaesthetists' recommendation (Recommendations for standards of monitoring during anaesthesia and recovery 2021) for ≥3 minutes of tidal-volume pre-oxygenation, which provides a comfortable safety margin to ≥99% (5τ).",
    cites: ["Assoc Anaesth 2021", "Peck & Hill Appendix"],
  },
  {
    title: "Why a single time constant fails for remifentanil",
    scenario:
      "A trainee tries to model remifentanil's offset by taking its context-sensitive half-time (CSHT) of ~3 min after a 4-hour infusion (Ultiva SmPC) and converting it to a single time constant. Critique this approach and contrast it with a true single-compartment example.",
    working:
      "Naïve calculation: τ = t½ / 0.693 = 3 / 0.693 ≈ 4.3 min, predicting ~95% decline at 3τ ≈ 13 min.\nWhy this is wrong: remifentanil is described by a 3-compartment PK model. Plasma concentration after stopping an infusion is a sum of exponentials (rapid, slow and terminal phases), not a single first-order decay. CSHT was defined precisely because no single half-life or τ adequately describes a multi-compartment drug — it is the time for plasma concentration to fall by 50% after a continuous infusion of a given duration, and it varies with infusion length.\nA true single-compartment exponential — and therefore a setting where one τ is appropriate — is nitrogen wash-out during pre-oxygenation (τ = FRC / alveolar ventilation), or the discharge of a defibrillator capacitor (τ = RC).",
    answer:
      "Equating CSHT to a first-order t½ is a fundamental pharmacokinetic error: remifentanil's offset is multi-exponential and its CSHT (~3–4 min) stays short only because rapid metabolism by non-specific esterases dominates redistribution. Use single-τ models only for genuine single-compartment processes such as nitrogen wash-out or capacitor discharge.",
    cites: ["Ultiva SmPC", "BJA Educ 2004 (PK)", "Peck & Hill Appendix"],
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
        objectives: ["Cross & Plunkett Ch.1", "BJA Educ 2004 (PK)"],
        workedExamples: ["Peck & Hill Appendix", "Middleton Appendix", "Ultiva SmPC", "Assoc Anaesth 2021", "BJA Educ 2004 (PK)"],
        keyPoints: ["Cross & Plunkett Ch.1", "Peck & Hill Appendix", "Middleton Appendix", "BJA Educ 2007 (Stats)", "BJA Educ 2004 (PK)"],
      }}
      keyPoints={[
        { text: "Linear (y = kx): Ohm's law, laminar flow, Beer-Lambert — direct proportionality", cites: ["Cross & Plunkett Ch.1"] },
        { text: "Exponential decay (e⁻ᵏˣ): First-order drug elimination, nitrogen washout, capacitor discharge", cites: ["Peck & Hill Appendix", "BJA Educ 2004 (PK)"] },
        { text: "Negative exponential rise (1 − e⁻ᵏˣ): Preoxygenation wash-in, volatile agent uptake, capacitor charging", cites: ["Middleton Appendix"] },
        { text: "Sigmoid: ODC (cooperative binding), dose-response curves — Hill coefficient determines steepness; central portion linearised by probit/logit transformation", cites: ["Cross & Plunkett Ch.1", "BJA Educ 2007 (Stats)"] },
        { text: "One time constant (τ) = 63% change; t½ = 0.693 × τ; after 5τ ≈ 99.3% complete", cites: ["Peck & Hill Appendix"] },
        { text: "Logarithmic scales (pH, dB, pKa) compress large ranges — 1 pH unit = 10× change in [H⁺]", cites: ["Middleton Appendix"] },
        { text: "Multi-compartment PK is multi-exponential — a single τ or t½ is inadequate, hence context-sensitive half-time (e.g. remifentanil)", cites: ["BJA Educ 2004 (PK)", "Ultiva SmPC"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Many physiological and pharmacological relationships can be understood through their underlying mathematical functions. Recognising the shape of a graph — linear, exponential, sigmoid, hyperbolic — allows you to predict how a system will behave when variables change. This topic covers the key mathematical relationships encountered in anaesthesia and intensive care, with clinical examples for each.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="graph-types" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Graph Types & Clinical Examples">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Select each graph type to explore its shape, equation, and real clinical applications.
            </p>
            <MathConceptsDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="time-constants" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Time Constants (τ)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The time constant τ is central to understanding exponential processes. After one time constant, 63% of the change has occurred. After three time constants, 95%. After five, 99.3% — effectively complete.
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="half-life-vs-tau" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Half-Life vs Time Constant">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="logarithms" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Logarithmic Scales in Medicine">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Logarithms compress enormous ranges into manageable numbers. Several clinical scales use logarithmic transformations:
            </p>
            <div className="space-y-3">
              {[
                { scale: "pH", detail: "pH = −log₁₀[H⁺]. A change of 1 pH unit = 10-fold change in [H⁺]. pH 7.4 → [H⁺] = 40 nmol/L; pH 7.1 → [H⁺] = 80 nmol/L." },
                { scale: "Decibels (dB)", detail: "dB = 10 log₁₀(I/I₀). A 10 dB increase = 10× intensity. Used in ultrasound attenuation and noise measurement." },
                { scale: "pKa", detail: "pKa = −log₁₀(Ka). Describes acid strength. At pH = pKa, 50% of drug is ionised." },
                { scale: "MAC", detail: "MAC values are often plotted on log scales when comparing agents. Plotting dose on a log axis gives a dose-response curve its familiar sigmoid shape; the central portion can then be linearised with a probit or logit transformation for analysis." },
              ].map((item) => (
                <div key={item.scale} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.scale}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="sigmoid" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="The Sigmoid Curve & Cooperativity">
            <p className="text-muted-foreground leading-relaxed">
              The sigmoid (S-shaped) curve arises when binding or response is <strong>cooperative</strong> — each event makes the next more likely. The Hill coefficient (n) describes the steepness: n = 1 gives a hyperbola (no cooperativity, e.g., myoglobin), n = 2.7 gives the sigmoid ODC (haemoglobin), and n → ∞ gives a step function (all-or-nothing response). In pharmacology, plotting <strong>dose on a logarithmic axis</strong> converts the hyperbolic dose-response into its familiar sigmoid shape, with EC₅₀ at the midpoint. The central portion of this sigmoid can be linearised using a <strong>probit or logit transformation</strong>, which makes comparison of potency and efficacy between drugs much easier.
            </p>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "A semi-log plot turns a single exponential decay into a straight line — used to derive elimination rate constants.",
              "Half-life (t½) = 0.693/k; time constant (τ) = 1/k. Three time constants ≈ 95% complete, five ≈ 99.3%.",
              "Sigmoid (Hill) curves describe cooperative binding (O₂–Hb) and dose-response; the Hill coefficient quantifies cooperativity.",
              "Log scales compress wide dynamic ranges (pH, decibels, drug potency) — a one-unit change is a tenfold change.",
              "Exponential wash-in and wash-out share the same time constant for first-order processes.",
            ]}
          />
          <TopicFaqs faqs={mathConceptsFaqs} />

        </>
      }
    />
  );
};

export default MathConceptsTopic;
