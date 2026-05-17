import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { CrossReferenceCallout } from "@/components/CrossReferenceCallout";
import { FlowDiagram } from "@/components/diagrams/FlowDiagram";
import { RotameterDiagram } from "@/components/diagrams/RotameterDiagram";
import PneumotachographDiagram from "@/components/diagrams/PneumotachographDiagram";
import WrightRespirometerDiagram from "@/components/diagrams/WrightRespirometerDiagram";
import BernoulliVenturiDiagram from "@/components/diagrams/BernoulliVenturiDiagram";
import CoandaEffectDiagram from "@/components/diagrams/CoandaEffectDiagram";
import { flowMeasurementQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

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
    cites: ["Cross & Plunkett Ch.8"],
  },
  {
    title: "Heliox in upper airway obstruction",
    scenario:
      "A patient with critical extrathoracic airway narrowing has clearly turbulent breathing. Why does switching from air to a 70:30 helium-oxygen mix improve flow?",
    working:
      "In turbulent flow Q ∝ √(ΔP/ρ) — flow depends on density (ρ), not viscosity.\nDensity (g/L): O₂ ≈ 1.43, N₂ ≈ 1.25, He ≈ 0.18.\n70:30 He:O₂ density ≈ 0.7 × 0.18 + 0.3 × 1.43 ≈ 0.55 g/L vs air ≈ 1.29 g/L → ~1/2.3 the density.\n√(2.3) ≈ 1.5 → ~50% increase in turbulent flow at the same driving pressure.",
    answer:
      "Heliox reduces gas density and therefore flow resistance under turbulent conditions, raising achievable minute ventilation by ~50% and buying time while definitive airway management is arranged.",
    cites: ["BJA Educ 2004"],
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
        workedExamples: ["Cross & Plunkett Ch.8", "BJA Educ 2004"],
        keyPoints: ["Middleton Ch.6", "Cross & Plunkett Ch.8", "BJA Educ 2004"],
      }}
      keyPoints={[
        { text: "Hagen-Poiseuille: Q = πΔPr⁴/8ηl. Flow ∝ r⁴ — halving radius reduces flow 16-fold.", cites: ["Middleton Ch.6"] },
        { text: "Reynolds number (Re = ρvd/η): <2000 laminar, >4000 turbulent. Turbulence depends on density, not viscosity.", cites: ["Cross & Plunkett Ch.8"] },
        { text: "Heliox reduces resistance in turbulent flow conditions because helium has low density.", cites: ["BJA Educ 2004"] },
        { text: "Rotameters: laminar (low flow) depends on viscosity; turbulent (high flow) depends on density. Gas-specific calibration.", cites: ["Middleton Ch.6"] },
        { text: "Pneumotachograph measures flow via pressure drop across a resistance; integration gives volume.", cites: ["Cross & Plunkett Ch.8"] },
        { text: "Venturi effect entrains gas through a constriction — used in fixed FiO₂ masks and jet ventilation.", cites: ["BJA Educ 2004"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-foreground/90 leading-relaxed">
              Flow is the volume of fluid passing a point per unit time. Understanding laminar and turbulent flow, and the
              devices used to measure gas and liquid flow, is essential for anaesthetic equipment design and clinical practice.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="laminar-turbulent" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Laminar vs Turbulent Flow">
            <p className="text-foreground/90 leading-relaxed mb-4">
              Use the interactive diagram below to explore the differences between laminar and turbulent flow, including the
              velocity profiles and key equations governing each.
            </p>
            <div className="bg-card rounded-xl border border-border p-6">
              <FlowDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="hagen-poiseuille" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Hagen-Poiseuille Equation">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="reynolds" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Reynolds Number">
            <p className="text-foreground/90 leading-relaxed">
              <strong>Re = ρvd / η</strong>, where ρ = density, v = velocity, d = diameter, η = viscosity. Laminar flow occurs
              when Re &lt; 2000; turbulent flow when Re &gt; 4000. Between 2000–4000 is the transition zone. Turbulent flow
              depends on gas <em>density</em> (not viscosity), which is why heliox (low density) reduces resistance in upper
              airway obstruction.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="rotameters" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Rotameters (Variable Orifice Flowmeters)">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="other-flowmeters" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Other Flowmeters">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="venturi" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="The Venturi Effect & Bernoulli's Principle">
            <p className="text-foreground/90 leading-relaxed">
              Bernoulli's principle: as fluid velocity increases through a constriction, pressure decreases. The <strong>Venturi
              effect</strong> exploits this — a jet of gas through a constriction entrains surrounding gas through side ports.
              Used in Venturi masks (fixed FiO₂), jet ventilation, and suction devices.
            </p>
            <div className="mt-4">
              <BernoulliVenturiDiagram />
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application</p>
              <p className="text-sm text-muted-foreground mt-1">
                A 28% Venturi mask uses an entrainment ratio of ~10:1 (air:oxygen). The total flow (~40 L/min) exceeds peak
                inspiratory flow, ensuring accurate FiO₂ delivery regardless of breathing pattern.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="coanda" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="The Coandă Effect">
            <p className="text-foreground/90 leading-relaxed">
              The <strong>Coandă effect</strong> is the tendency of a fluid jet to follow a nearby convex surface
              rather than continue in a straight line. Entrainment of surrounding fluid is restricted on the wall
              side of the jet, lowering pressure there; the resulting pressure gradient deflects the jet onto the
              surface, where it remains attached until the curvature becomes too sharp.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-2">
              It is closely related to Bernoulli's principle (faster flow → lower pressure) but specifically
              describes <em>jet attachment</em>, not flow through a constriction.
            </p>
            <div className="mt-4">
              <CoandaEffectDiagram />
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
              <p className="text-sm font-medium text-foreground">Anaesthetic relevance</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li>Maldistribution of gas or blood at airway and vascular bifurcations (one daughter branch preferentially "captures" the jet)</li>
                <li>Historic <strong>fluidic ventilators</strong> used Coandă-based bistable switches with no moving parts</li>
                <li>During <strong>jet ventilation</strong>, the jet may hug the tracheal wall, altering entrainment and delivered FiO₂</li>
                <li>Echocardiography: regurgitant jets (e.g. eccentric MR) tracking along an atrial wall appear smaller than they are — Coandă-related underestimation</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="coanda-vs-bernoulli" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Coandă vs Bernoulli — jet attachment vs constriction flow">
            <p className="text-foreground/90 leading-relaxed">
              Both effects share the same underlying physics — the conservation of energy expressed by
              Bernoulli's equation, in which a rise in fluid velocity is matched by a fall in static
              pressure. They differ in <em>where</em> the velocity change occurs and <em>what the low-pressure
              region does</em> to the flow.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left p-3 border border-border font-semibold text-foreground">Feature</th>
                    <th className="text-left p-3 border border-border font-semibold text-foreground">Bernoulli / Venturi (constriction flow)</th>
                    <th className="text-left p-3 border border-border font-semibold text-foreground">Coandă (jet attachment)</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  <tr>
                    <td className="p-3 border border-border font-medium">Geometry</td>
                    <td className="p-3 border border-border">Fluid confined inside a tube that narrows then widens</td>
                    <td className="p-3 border border-border">Free (or semi-free) jet emerging next to a curved surface</td>
                  </tr>
                  <tr className="bg-secondary/20">
                    <td className="p-3 border border-border font-medium">Cause of low pressure</td>
                    <td className="p-3 border border-border">Velocity ↑ at the throat (continuity: A·v = constant) → static pressure ↓</td>
                    <td className="p-3 border border-border">Entrainment is blocked on the wall side → pressure between jet and wall ↓</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-medium">Effect on the flow</td>
                    <td className="p-3 border border-border">Drives <strong>entrainment</strong> of a second fluid through a side port</td>
                    <td className="p-3 border border-border">Deflects the jet so it <strong>adheres</strong> to the surface</td>
                  </tr>
                  <tr className="bg-secondary/20">
                    <td className="p-3 border border-border font-medium">Direction of jet</td>
                    <td className="p-3 border border-border">Stays axial — straight through the tube</td>
                    <td className="p-3 border border-border">Bends toward the wall, may follow significant curvature</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-medium">Predictability</td>
                    <td className="p-3 border border-border">Highly predictable — used for <strong>fixed</strong> entrainment ratios</td>
                    <td className="p-3 border border-border">Bistable / can flip between branches — exploited in fluidic logic, but a nuisance clinically</td>
                  </tr>
                  <tr className="bg-secondary/20">
                    <td className="p-3 border border-border font-medium">Clinical example</td>
                    <td className="p-3 border border-border">Venturi mask (fixed FiO₂), nebulisers, jet entrainment ports</td>
                    <td className="p-3 border border-border">Eccentric MR jet hugging the LA wall, gas maldistribution at carina, fluidic ventilator switching</td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-border font-medium">When it matters</td>
                    <td className="p-3 border border-border">When you <em>want</em> a calibrated mixture</td>
                    <td className="p-3 border border-border">When asymmetric flow distribution affects measurement or delivery</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
              <p className="text-sm font-medium text-foreground">Bottom line</p>
              <p className="text-sm text-muted-foreground mt-1">
                Bernoulli explains <strong>why</strong> a fast-moving jet has lower lateral pressure; the Venturi
                effect uses that to entrain gas through a constriction; the Coandă effect uses the same
                low-pressure region — this time between the jet and a nearby surface — to bend the jet onto
                that surface. Constriction flow is symmetric and predictable; jet attachment is asymmetric
                and surface-dependent.
              </p>
            </div>

            <CrossReferenceCallout
              variant="panel"
              reason="Explore the continuity equation, pressure–velocity relationships, and entrainment in more depth."
              links={[
                { topicId: "pressure-measurement", label: "Pressure Measurement" },
                { topicId: "equipment-monitoring", label: "Equipment & Monitoring" },
                { topicId: "clinical-measurement", label: "Clinical Measurement" },
              ]}
            />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="coanda-vignettes" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Clinical vignettes — Coandă in practice">
            <p className="text-foreground/90 leading-relaxed">
              The Coandă effect is a favourite of FRCA Primary SAQs and Final structured orals because
              it links a single physics principle to several disparate clinical scenarios. Recognising
              the pattern — <em>a jet, a nearby surface, asymmetric distribution</em> — usually scores
              the mark.
            </p>

            <div className="grid gap-4 mt-4">
              {/* Vignette 1 */}
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary">Vignette 1 · Airway</span>
                  <p className="text-sm font-medium text-foreground">
                    Endobronchial intubation suspicion
                  </p>
                </div>
                <p className="text-sm text-foreground/90 mt-2">
                  A patient is ventilated with the ETT tip just above the carina. CXR shows
                  preferential expansion of the <strong>right lung</strong> with a relatively
                  collapsed left lung, despite the tube being above the carina. Auscultation
                  confirms reduced breath sounds on the left.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Why:</strong> The high-velocity inspiratory jet exiting the ETT bevel adheres
                  to the right lateral tracheal wall (the right main bronchus is wider and more axial)
                  and is <em>preferentially deflected into the right main bronchus</em> — Coandă-driven
                  asymmetric ventilation without true endobronchial migration.
                </p>
                <p className="text-sm text-foreground mt-2">
                  <strong>Take-home:</strong> Asymmetric ventilation with a correctly positioned ETT
                  may be Coandă-mediated. Reposition the bevel, consider a smaller-bore tube or change
                  fresh gas flow to reduce jet velocity.
                </p>
              </div>

              {/* Vignette 2 */}
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary">Vignette 2 · Echocardiography</span>
                  <p className="text-sm font-medium text-foreground">
                    Underestimated mitral regurgitation
                  </p>
                </div>
                <p className="text-sm text-foreground/90 mt-2">
                  Pre-operative TTE in a patient for non-cardiac surgery shows a small, eccentric MR
                  jet tracking along the lateral LA wall. The patient is in florid pulmonary oedema
                  with a markedly dilated LA.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Why:</strong> Eccentric, wall-hugging regurgitant jets entrain less surrounding
                  blood and appear narrower on colour Doppler than free central jets of the same volume —
                  the classic Coandă-related <em>underestimation of severity</em>.
                </p>
                <p className="text-sm text-foreground mt-2">
                  <strong>Take-home:</strong> A small wall-impinging jet can mask severe MR. Use PISA,
                  vena contracta and indirect signs (LA size, pulmonary vein flow reversal) rather than
                  jet area alone.
                </p>
              </div>

              {/* Vignette 3 */}
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary">Vignette 3 · ICU / Jet ventilation</span>
                  <p className="text-sm font-medium text-foreground">
                    Variable FiO₂ during high-frequency jet ventilation
                  </p>
                </div>
                <p className="text-sm text-foreground/90 mt-2">
                  During HFJV for rigid bronchoscopy, the measured FiO₂ at the carina swings
                  unpredictably despite a constant driving pressure and entrainment fraction set on
                  the ventilator.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Why:</strong> The jet leaving the injector hugs the tracheal wall
                  (Coandă attachment), which alters the geometry available for room-air entrainment.
                  Small changes in catheter position flip the jet from one wall to the other,
                  changing the entrainment ratio and delivered FiO₂.
                </p>
                <p className="text-sm text-foreground mt-2">
                  <strong>Take-home:</strong> Entrainment in jet ventilation is <em>not</em> as
                  predictable as in a Venturi mask. Always measure delivered FiO₂ and watch SpO₂
                  closely.
                </p>
              </div>

              {/* Vignette 4 */}
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary">Vignette 4 · Equipment</span>
                  <p className="text-sm font-medium text-foreground">
                    Bistable fluidic ventilator
                  </p>
                </div>
                <p className="text-sm text-foreground/90 mt-2">
                  An older transport ventilator with no moving parts cycles between inspiration and
                  expiration solely from the gas supply pressure. How does it work?
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Why:</strong> A jet enters a chamber with two symmetrical curved walls and
                  attaches to one (Coandă). A small control jet at the opposite wall destabilises
                  attachment, flipping the main jet to the other wall — a bistable fluidic switch.
                  The oscillation drives the respiratory cycle.
                </p>
                <p className="text-sm text-foreground mt-2">
                  <strong>Take-home:</strong> Coandă is the basis of <em>fluidic logic</em> — useful
                  in MRI environments where moving / electrical parts are problematic.
                </p>
              </div>

              {/* Vignette 5 */}
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded bg-primary/15 text-primary">Vignette 5 · Vascular</span>
                  <p className="text-sm font-medium text-foreground">
                    Asymmetric distribution at a Y-junction
                  </p>
                </div>
                <p className="text-sm text-foreground/90 mt-2">
                  A high-velocity infusion through a triple-lumen catheter, or rapid blood flow at an
                  arterial bifurcation, distributes preferentially down one daughter limb even when
                  the two limbs appear geometrically symmetric.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Why:</strong> Tiny asymmetries in the bifurcation cause the jet to attach
                  to one wall; once attached, the low-pressure region locks it there. The branch
                  that "captures" the jet receives a disproportionate share of flow.
                </p>
                <p className="text-sm text-foreground mt-2">
                  <strong>Take-home:</strong> Mixing of drugs and contrast at high flow is not
                  guaranteed to be uniform — relevant for vasoactive infusions co-running with
                  carriers, and for selective angiographic injection.
                </p>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
              <p className="text-sm font-medium text-foreground">Exam pearls</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li><strong>Recognise the trigger words:</strong> "eccentric jet", "wall-hugging", "preferential", "asymmetric ventilation despite correct ETT position".</li>
                <li><strong>Always state the mechanism:</strong> reduced entrainment between jet and wall → low pressure → jet adheres.</li>
                <li><strong>Distinguish from Venturi:</strong> Venturi is constriction-driven entrainment (predictable); Coandă is surface-driven attachment (asymmetric, can flip).</li>
                <li><strong>Clinical consequence is what scores marks</strong> — underestimated MR severity, asymmetric ventilation, variable FiO₂ in HFJV, fluidic logic.</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Hagen–Poiseuille (laminar): flow ∝ r⁴ — small radius changes dominate resistance (cannula sizing, bronchospasm).",
              "Reynolds number >2000 predicts turbulence; in turbulent flow, flow ∝ √(ΔP) and depends on density rather than viscosity.",
              "Rotameter is a constant-pressure, variable-orifice flowmeter; calibrated for a specific gas at a specific temperature.",
              "At low flows the annulus around the bobbin behaves like a tube (viscosity matters); at high flows like an orifice (density matters).",
              "Heliox lowers density to convert turbulent to laminar flow in upper-airway obstruction.",
            ]}
          />
        </>
      }
    />
  );
};

export default FlowMeasurementTopic;
