import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { CrossReferenceCallout } from "@/components/topic/CrossReferenceCallout";
import { FlowDiagram } from "@/components/diagrams/physics/FlowDiagram";
import { RotameterDiagram } from "@/components/diagrams/physics/RotameterDiagram";
import PneumotachographDiagram from "@/components/diagrams/physics/PneumotachographDiagram";
import WrightRespirometerDiagram from "@/components/diagrams/physics/WrightRespirometerDiagram";
import BernoulliVenturiDiagram from "@/components/diagrams/physics/BernoulliVenturiDiagram";
import CoandaEffectDiagram from "@/components/diagrams/physics/CoandaEffectDiagram";
import { flowMeasurementQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const flowMeasurementFaqs: Array<[string, string]> = [
  [
    "What is the difference between laminar and turbulent flow, and which gas laws govern each?",
    "Laminar flow (Re <2000): smooth parallel streamlines, governed by Hagen–Poiseuille — Q ∝ ΔP × r⁴ / (8ηL); depends on viscosity. Turbulent flow (Re >4000): chaotic, Q ∝ √ΔP × r² / √(density × L); depends on density. Reynolds number Re = ρvd/η. In a Venturi or upper-airway obstruction, turbulent flow predominates — hence heliox (low density) helps."
  ],
  [
    "How does a variable-orifice rotameter work?",
    "A vertical tapered tube with a bobbin floating in a gas stream. Flow holds the bobbin at a height where weight = drag force. At low flow, gap is narrow → laminar flow (viscosity-dependent). At high flow, gap is wide → turbulent (density-dependent). Calibration is therefore gas-specific. Bobbin spins to reduce friction; reading is taken at the top of the bobbin."
  ],
  [
    "How does a pneumotachograph measure flow?",
    "Gas passes through a fixed-resistance element (Fleisch — fine-bore tubes; or screen) under laminar flow conditions. The pressure drop across it (measured by differential transducer) is proportional to flow (Hagen–Poiseuille). Integration of flow over time gives volume. Temperature and water vapour must be controlled to maintain calibration."
  ]
];

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
        keyPoints: ["A&ICM 2023 (Gas flow)", "BJA Educ 2018 (Physics)", "Middleton Ch.6", "Cross & Plunkett Ch.8", "BJA Educ 2004"],
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
            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border space-y-2">
              <p className="text-sm font-medium text-foreground">Rotameter safety features</p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1.5">
                <li><strong>Oxygen flow-control knob</strong> — fluted profile and larger diameter than the other gas knobs, and colour-coded, so it can be identified by touch alone; one knob per gas, turned anticlockwise to open.</li>
                <li><strong>Position of the oxygen flowmeter</strong> — placed downstream of the other gases (right-hand tube in the UK, left-hand in the USA) so that a leak from any other flowmeter tube cannot produce a hypoxic mixture.</li>
                <li><strong>Thorpe tube design</strong> — rib guides/ridges centre the rotating bobbin and stop it sticking to the glass, an antistatic coating prevents electrostatic adherence, and an integral stop or cage at the top prevents the bobbin disappearing from view or into the back bar.</li>
                <li><strong>Illumination and protective screen</strong> — back-lighting aids reading, and a clear plastic screen in front of the glass tubes protects both tubes and user.</li>
                <li><strong>Anti-hypoxia devices</strong> — mechanical links (Link-25 chain-and-sprocket, or the Dräger Oxygen Ratio Monitor Controller) or electronic links between N₂O and O₂ flow guarantee a minimum FiO₂ of about 25%; electronic workstations instead alarm and limit N₂O delivery.</li>
                <li><strong>Non-interchangeable, keyed blocks</strong> — flowmeter blocks and their gas inlets are pin-indexed/keyed so they cannot be reassembled in the wrong order on the back bar after servicing, and each tube is gas-specific and individually calibrated for that gas's viscosity and density so it cannot be swapped between gases.</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Failure modes</strong>: dirt or static causing the bobbin to stick (read as a spuriously low flow), a cracked tube causing loss of gas into the room, and inaccuracy at altitude or in hyperbaric conditions (calibration is pressure- and density-dependent)
                <InlineRef topicId="flow-measurement" refLabel="Middleton Ch.6" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="critical-flow" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Critical Flow (Choked Flow)">
            <p className="text-foreground/90 leading-relaxed">
              For gas flowing through a constriction, raising the upstream pressure increases flow only until the gas velocity in
              the throat reaches the local <strong>speed of sound</strong>. Beyond this point flow is <strong>critical</strong>
              (choked) and cannot rise further, however much the downstream pressure is lowered
              <InlineRef topicId="flow-measurement" refLabel="BJA Educ 2018 (Physics)" />.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              This is reached when the absolute upstream pressure is roughly <strong>1.9 times</strong> the downstream pressure
              for air or oxygen (approximately a 2:1 ratio) — the exact figure depends on the ratio of specific heats of the gas
              in question. Once flow in the throat is sonic, pressure-change information cannot propagate upstream against it,
              so the constriction becomes "blind" to downstream conditions and mass flow depends only on upstream pressure and
              temperature <InlineRef topicId="flow-measurement" refLabel="Middleton Ch.6" />.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical relevance</p>
              <p className="text-sm text-muted-foreground mt-1">
                This is why a cylinder pressure regulator, or a second-stage regulator supplying the flowmeters, delivers a
                steady flow as cylinder pressure falls from ~137 bar towards empty — the pressure ratio across the valve stays
                well above critical for most of the cylinder's life, and flow only becomes pressure-dependent near the end. It
                also underlies fixed-performance Venturi devices, jet ventilation injectors, and the constant flow through a
                needle-valve/flow restrictor — explaining the "constant" flow reading of a flow restrictor and why entrainment
                ratios remain stable <InlineRef topicId="flow-measurement" refLabel="BJA Educ 2004" />.
              </p>
            </div>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Distinction</strong>: critical flow (a velocity/pressure-ratio phenomenon) is quite different from
              <strong> critical temperature</strong> (the temperature above which a gas cannot be liquefied by pressure alone —
              36.5 °C for nitrous oxide) and from <strong>critical pressure</strong> (the SVP at the critical temperature);
              examiners commonly probe this confusion.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="other-flowmeters" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Other Flowmeters">
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Pneumotachograph</strong>: measures pressure drop across a known resistance (Fleisch — bundle of tubes;
              Lilly — fine mesh screen). Integrating flow over time gives volume — the basis of many ventilator spirometers.
            </p>
            <PneumotachographDiagram />
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border space-y-2">
              <p className="text-sm font-medium text-foreground">Pneumotachograph — principle and sources of error</p>
              <p className="text-sm text-muted-foreground">
                The resistive element is designed so that flow through it stays <strong>laminar</strong>; only then is the pressure drop
                <em> directly proportional</em> to flow (Hagen–Poiseuille). The <strong>Fleisch</strong> type uses many parallel fine-bore
                capillaries; the <strong>Lilly</strong> type uses one or more fine mesh screens, which are lighter and better suited to
                rapid respiratory waveforms <InlineRef topicId="flow-measurement" refLabel="A&ICM 2023 (Gas flow)" />.
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1.5">
                <li><strong>Temperature and water vapour</strong> — expired gas cools, its density and viscosity change, and water condenses on the resistive element, narrowing the effective radius (ΔP ∝ 1/r⁴) and increasing resistance, so the device over-reads. Mitigated by an integral heating element holding the head at about 37–40 °C and by BTPS correction.</li>
                <li><strong>Gas viscosity</strong> — since ΔP is proportional to viscosity (Hagen–Poiseuille), adding N₂O, changing FiO₂ or adding volatile agent alters the reading unless the device is calibrated for, or electronically compensates for, the measured gas mixture — contrast with density-dependent orifice devices.</li>
                <li><strong>Maintaining laminar flow</strong> — linearity depends on laminar flow. The Fleisch bundle of parallel narrow capillaries (each with a low Reynolds number) and the Lilly fine mesh screen, with smoothly tapered inlets, are designed to secure this; high peak flows, a partly blocked element, or turbulence from a sharp connector make ΔP rise with the square of flow and cause under-reading.</li>
                <li><strong>Zero drift and calibration</strong> — because volume is obtained by integrating flow over time, a small transducer baseline offset accumulates into a large volume error; the device must be zeroed at no flow and calibrated with a known volume (1- or 3-litre calibration syringe) for the gas mixture in use.</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-2">
                <InlineRef topicId="flow-measurement" refLabel="BJA Educ 2004" />
              </p>
            </div>
            <p className="text-foreground/90 leading-relaxed mt-3 mb-4">
              <strong>Wright respirometer</strong>: a turbine vane flowmeter. Under-reads at low flows and over-reads at high
              flows. Measures expired tidal and minute volumes.
            </p>
            <WrightRespirometerDiagram />
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border space-y-2">
              <p className="text-sm font-medium text-foreground">Wright respirometer — mechanism and errors</p>
              <p className="text-sm text-muted-foreground">
                Gas entering tangential slots spins a lightweight flat vane; each rotation displaces a known volume, and a gear train drives
                a pointer over a dial calibrated in litres. It therefore measures <strong>volume</strong> by counting vane rotations, and
                minute volume is read over 60 seconds <InlineRef topicId="flow-measurement" refLabel="Cross &amp; Plunkett Ch.8" />.
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1.5">
                <li><strong>Inertia at low flows</strong> — the vane's inertia must be overcome before it starts to turn, so at low tidal volumes or low flows it fails to register part of the flow and <em>under-reads</em> (very inaccurate below about 2 L/min).</li>
                <li><strong>Momentum at high flows</strong> — at high flows the vane continues to spin after flow ceases and <em>over-reads</em> (above roughly 100 L/min, by 10–20% at high minute volumes).</li>
                <li><strong>Gas composition</strong> — calibrated for air at ambient temperature; changes in density and viscosity (high FiO₂, N₂O, volatile agent, heliox) alter the driving force on the vane and therefore its accuracy.</li>
                <li><strong>Water vapour and secretions</strong> — condensation adds weight and inertia to the vane and can make the mechanism stick, causing under-reading and eventual damage; it is also a route for cross-infection. It should be sited where condensation is minimised — on the inspiratory limb, or if used expiratory, distal to a HME/filter and oriented so water drains away — and it must not be autoclaved.</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-2">
                It measures <strong>volume</strong> by integrating flow, is unidirectional, and traditionally reads only expired
                volume; modern workstations have largely replaced it with heated pneumotachographs and hot-wire anemometers
                <InlineRef topicId="flow-measurement" refLabel="A&ICM 2023 (Gas flow)" />.
              </p>
            </div>
            <p className="text-foreground/90 leading-relaxed mt-4">
              <strong>Hot-wire anemometer</strong>: a fine platinum wire is electrically heated and cooled by passing gas. The current
              needed to hold the wire at constant temperature is proportional to mass flow, giving a very fast response with no moving
              parts — but the wire is fragile and the reading depends on gas composition (thermal conductivity) and on water vapour
              deposition <InlineRef topicId="flow-measurement" refLabel="A&ICM 2023 (Gas flow)" />.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Ultrasonic flowmeter</strong>: paired transducers send pulses diagonally upstream and downstream. The
              <strong> transit-time difference</strong> is proportional to gas velocity, and multiplying by cross-sectional area gives flow.
              There are no moving parts, resistance is negligible, and the measurement is largely independent of gas composition, so it is
              used in modern ventilators and in vaporiser-free flow sensors
              <InlineRef topicId="flow-measurement" refLabel="BJA Educ 2018 (Physics)" />.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="orifice-flow" exams={[Exam.PRIMARY]}>
            <CollapsibleSubsection title="Orifice Flow & Critical Flow">
            <p className="text-foreground/90 leading-relaxed">
              An <strong>orifice</strong> is a constriction whose length is much less than its radius (l ≪ r). Flow through it is
              turbulent, so flow is proportional to the <strong>square root</strong> of the pressure drop rather than being linearly
              related to it, and it depends on <strong>density</strong> rather than viscosity. Graham's law follows: for a given pressure
              drop, flow ∝ 1/√density — which is why light heliox flows better through a fixed narrowing and why N₂O (dense) flows less
              readily than O₂ through the same orifice <InlineRef topicId="flow-measurement" refLabel="Middleton Ch.6" />.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              Contrast this with the <strong>Hagen–Poiseuille</strong> equation, which applies to laminar flow through a tube (l ≫ r),
              where flow is directly proportional to pressure drop and to r⁴, and inversely proportional to viscosity. The rotameter
              behaves as a tube at low flows (viscosity-dependent) and as an orifice at high flows (density-dependent) because the annulus
              around the bobbin becomes short and wide. The same orifice physics governs flow from cylinder valves and through a
              partially obstructed tracheal tube <InlineRef topicId="flow-measurement" refLabel="Cross &amp; Plunkett Ch.8" />.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Critical flow</strong> occurs when gas velocity through the constriction reaches the local speed of sound; further
              lowering downstream pressure cannot increase flow, so flow is "choked". This is the basis of the constant, predictable jet
              output of Venturi devices and of sonic-orifice flow limitation in high-pressure regulators
              <InlineRef topicId="flow-measurement" refLabel="BJA Educ 2018 (Physics)" />.
            </p>
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
          <TopicFaqs faqs={flowMeasurementFaqs} />

        </>
      }
    />
  );
};

export default FlowMeasurementTopic;
