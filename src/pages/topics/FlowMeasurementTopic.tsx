import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { flowMeasurementQuiz } from "@/data/quizzes";
import { FlowDiagram } from "@/components/diagrams/FlowDiagram";

const FlowMeasurementTopic = () => {
  return (
    <SectionLayout
      title="Flow & Flowmeters"
      subtitle="FRCA Primary — Physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Flow is the volume of fluid passing a point per unit time. Understanding laminar and turbulent flow, and the
            devices used to measure gas and liquid flow, is essential for anaesthetic equipment design and clinical practice.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Laminar vs Turbulent Flow</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Use the interactive diagram below to explore the differences between laminar and turbulent flow, including the
            velocity profiles and key equations governing each.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <FlowDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Hagen-Poiseuille Equation</h2>
          <p className="text-foreground/90 leading-relaxed">
            For laminar flow through a tube: <strong>Q = πΔPr⁴ / 8ηl</strong>, where Q = flow, ΔP = pressure gradient,
            r = radius, η = viscosity, l = length. Flow is proportional to the <em>fourth power</em> of radius — halving
            the radius reduces flow 16-fold.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              A 4.0 mm ETT has only 1/4 the flow of an 8.0 mm tube at the same driving pressure. This explains why small
              tubes produce significant resistance and why even a small reduction in airway calibre (e.g., subglottic oedema)
              dramatically increases work of breathing.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Reynolds Number</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Re = ρvd / η</strong>, where ρ = density, v = velocity, d = diameter, η = viscosity. Laminar flow occurs
            when Re &lt; 2000; turbulent flow when Re &gt; 4000. Between 2000–4000 is the transition zone. Turbulent flow
            depends on gas <em>density</em> (not viscosity), which is why heliox (low density) reduces resistance in upper
            airway obstruction.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Rotameters (Variable Orifice Flowmeters)</h2>
          <p className="text-foreground/90 leading-relaxed">
            A rotameter is a tapered glass tube with a bobbin. As flow increases, the bobbin rises. At low flows, the annular
            gap is narrow (tube-like) — flow is laminar and depends on <em>viscosity</em>. At high flows, the gap is wide
            (orifice-like) — flow is turbulent and depends on <em>density</em>.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Rotameters are calibrated for specific gases at specific temperatures and pressures, and are read at the top of
            the bobbin (ball floats read at centre). O₂ rotameter is placed downstream to prevent hypoxic mixtures if an
            upstream tube leaks.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Other Flowmeters</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Pneumotachograph</strong>: measures pressure drop across a known resistance (Fleisch — bundle of tubes;
            Lilly — fine mesh screen). Integrating flow over time gives volume — the basis of many ventilator spirometers.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Wright respirometer</strong>: a turbine vane flowmeter. Under-reads at low flows and over-reads at high
            flows. Measures expired tidal and minute volumes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Venturi Effect & Bernoulli's Principle</h2>
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
        </section>
      </div>

      <KeyLearningPoints points={[
        "Hagen-Poiseuille: Q = πΔPr⁴/8ηl. Flow ∝ r⁴ — halving radius reduces flow 16-fold.",
        "Reynolds number (Re = ρvd/η): <2000 laminar, >4000 turbulent. Turbulence depends on density, not viscosity.",
        "Heliox reduces resistance in turbulent flow conditions because helium has low density.",
        "Rotameters: laminar (low flow) depends on viscosity; turbulent (high flow) depends on density. Gas-specific calibration.",
        "Pneumotachograph measures flow via pressure drop across a resistance; integration gives volume.",
        "Venturi effect entrains gas through a constriction — used in fixed FiO₂ masks and jet ventilation."
      ]} />
      <QuizSection questions={flowMeasurementQuiz} />
      <TopicCompletionToggle topicId="flow-measurement" topicTitle="Flow & Flowmeters" />
    </SectionLayout>
  );
};

export default FlowMeasurementTopic;
