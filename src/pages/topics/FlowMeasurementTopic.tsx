import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { FlowDiagram } from "@/components/diagrams/FlowDiagram";
import { RotameterDiagram } from "@/components/diagrams/RotameterDiagram";
import PneumotachographDiagram from "@/components/diagrams/PneumotachographDiagram";
import WrightRespirometerDiagram from "@/components/diagrams/WrightRespirometerDiagram";
import { flowMeasurementQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Differentiate laminar from turbulent flow and use Reynolds number (Re = ρvd/η) to predict the regime",
  "Apply the Hagen-Poiseuille equation (Q = πΔPr⁴/8ηl) to clinical scenarios involving cannulae, ETTs and airway calibre",
  "Explain how a rotameter behaves as a viscosity-dependent device at low flows and a density-dependent device at high flows",
  "Describe the operating principles, sources of error and clinical use of pneumotachographs and Wright respirometers",
  "Use Bernoulli's principle and the Venturi effect to understand fixed-FiO₂ masks, jet ventilation and entrainment",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Halving ETT diameter — flow consequence",
    scenario:
      "A child is intubated with a 4.0 mm ID tube instead of an 8.0 mm tube at the same driving pressure. By what factor does laminar flow change, and what is the clinical implication?",
    working:
      "Hagen-Poiseuille: Q ∝ r⁴.\nRatio = (4/8)⁴ = (½)⁴ = 1/16.\nFlow through the 4.0 mm tube is 1/16 of an 8.0 mm tube at the same ΔP.",
    answer:
      "Laminar flow falls 16-fold. Resistance and work of breathing rise dramatically — explaining why even small subglottic oedema in paediatric patients precipitates stridor and respiratory failure, and why suboptimal tube selection is a major contributor to ventilator dyssynchrony.",
  },
  {
    title: "Heliox in upper airway obstruction",
    scenario:
      "A patient with critical extrathoracic airway narrowing has clearly turbulent breathing. Why does switching from air to a 70:30 helium-oxygen mix improve flow?",
    working:
      "In turbulent flow Q ∝ √(ΔP/ρ) — flow depends on density (ρ), not viscosity.\nDensity (g/L): O₂ ≈ 1.43, N₂ ≈ 1.25, He ≈ 0.18.\n70:30 He:O₂ density ≈ 0.7 × 0.18 + 0.3 × 1.43 ≈ 0.55 g/L vs air ≈ 1.29 g/L → ~1/2.3 the density.\n√(2.3) ≈ 1.5 → ~50% increase in turbulent flow at the same driving pressure.",
    answer:
      "Heliox reduces gas density and therefore flow resistance under turbulent conditions, raising achievable minute ventilation by ~50% and buying time while definitive airway management is arranged.",
  },
];

const FlowMeasurementTopic = () => {
  return (
    <TopicTemplate
      title="Flow & Flowmeters"
      subtitle="Laminar vs turbulent flow, Hagen-Poiseuille, rotameters and the Venturi effect"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="flow-measurement"
      topicTitle="Flow & Flowmeters"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={flowMeasurementQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["RCoA Primary — Physics"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Cross & Plunkett Ch.8"],
      }}
      keyPoints={[
        "Hagen-Poiseuille: Q = πΔPr⁴/8ηl. Flow ∝ r⁴ — halving radius reduces flow 16-fold.",
        "Reynolds number (Re = ρvd/η): <2000 laminar, >4000 turbulent. Turbulence depends on density, not viscosity.",
        "Heliox reduces resistance in turbulent flow conditions because helium has low density.",
        "Rotameters: laminar (low flow) depends on viscosity; turbulent (high flow) depends on density. Gas-specific calibration.",
        "Pneumotachograph measures flow via pressure drop across a resistance; integration gives volume.",
        "Venturi effect entrains gas through a constriction — used in fixed FiO₂ masks and jet ventilation.",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={["primary", "final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Flow is the volume of fluid passing a point per unit time. Understanding laminar and turbulent flow, and the
              devices used to measure gas and liquid flow, is essential for anaesthetic equipment design and clinical practice.
            </p>
          </ExamSection>

          <ExamSection id="laminar-turbulent" exams={["primary", "final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Laminar vs Turbulent Flow</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Use the interactive diagram below to explore the differences between laminar and turbulent flow, including the
              velocity profiles and key equations governing each.
            </p>
            <div className="bg-card rounded-xl border border-border p-6">
              <FlowDiagram />
            </div>
          </ExamSection>

          <ExamSection id="hagen-poiseuille" exams={["primary", "final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hagen-Poiseuille Equation</h2>
            <p className="text-foreground/90 leading-relaxed">
              For laminar flow through a tube: <strong>Q = πΔPr⁴ / 8ηl</strong>, where Q = flow, ΔP = pressure gradient,
              r = radius, η = viscosity, l = length. Flow is proportional to the <em>fourth power</em> of radius — halving
              the radius reduces flow 16-fold.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application</p>
              <p className="text-sm text-muted-foreground mt-1">
                A 4.0 mm ETT has only 1/16 the flow of an 8.0 mm tube at the same driving pressure. This explains why small
                tubes produce significant resistance and why even a small reduction in airway calibre (e.g., subglottic oedema)
                dramatically increases work of breathing.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="reynolds" exams={["primary", "final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Reynolds Number</h2>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Re = ρvd / η</strong>, where ρ = density, v = velocity, d = diameter, η = viscosity. Laminar flow occurs
              when Re &lt; 2000; turbulent flow when Re &gt; 4000. Between 2000–4000 is the transition zone. Turbulent flow
              depends on gas <em>density</em> (not viscosity), which is why heliox (low density) reduces resistance in upper
              airway obstruction.
            </p>
          </ExamSection>

          <ExamSection id="rotameters" exams={["primary"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Rotameters (Variable Orifice Flowmeters)</h2>
            <p className="text-foreground/90 leading-relaxed">
              A rotameter is a tapered glass tube with a bobbin. As flow increases, the bobbin rises. At low flows, the annular
              gap is narrow (tube-like) — flow is laminar and depends on <em>viscosity</em>. At high flows, the gap is wide
              (orifice-like) — flow is turbulent and depends on <em>density</em>.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3 mb-4">
              Rotameters are calibrated for specific gases at specific temperatures and pressures, and are read at the top of
              the bobbin (ball floats read at centre). O₂ rotameter is placed downstream to prevent hypoxic mixtures if an
              upstream tube leaks.
            </p>
            <RotameterDiagram />
          </ExamSection>

          <ExamSection id="other-flowmeters" exams={["primary", "final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Other Flowmeters</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Pneumotachograph</strong>: measures pressure drop across a known resistance (Fleisch — bundle of tubes;
              Lilly — fine mesh screen). Integrating flow over time gives volume — the basis of many ventilator spirometers.
            </p>
            <PneumotachographDiagram />
            <p className="text-foreground/90 leading-relaxed mt-3 mb-4">
              <strong>Wright respirometer</strong>: a turbine vane flowmeter. Under-reads at low flows and over-reads at high
              flows. Measures expired tidal and minute volumes.
            </p>
            <WrightRespirometerDiagram />
          </ExamSection>

          <ExamSection id="venturi" exams={["primary", "final"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Venturi Effect & Bernoulli's Principle</h2>
            <p className="text-foreground/90 leading-relaxed">
              Bernoulli's principle: as fluid velocity increases through a constriction, pressure decreases. The <strong>Venturi
              effect</strong> exploits this — a jet of gas through a constriction entrains surrounding gas through side ports.
              Used in Venturi masks (fixed FiO₂), jet ventilation, and suction devices.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application</p>
              <p className="text-sm text-muted-foreground mt-1">
                A 28% Venturi mask uses an entrainment ratio of ~10:1 (air:oxygen). The total flow (~40 L/min) exceeds peak
                inspiratory flow, ensuring accurate FiO₂ delivery regardless of breathing pattern.
              </p>
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default FlowMeasurementTopic;
