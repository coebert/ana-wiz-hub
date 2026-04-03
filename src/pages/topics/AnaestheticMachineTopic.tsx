import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { anaestheticMachineQuiz } from "@/data/quizzes";
import AnaestheticMachineDiagram from "@/components/diagrams/AnaestheticMachineDiagram";

const AnaestheticMachineTopic = () => {
  return (
    <SectionLayout
      title="The Anaesthetic Machine"
      subtitle="Pipeline supply, cylinder storage, pressure regulators, flowmeters, and safety features"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="space-y-8">
        <KeyLearningPoints
          points={[
            "Pipeline supply delivers O₂, N₂O, and Air at 400 kPa (4 bar) via NIST/Schrader connectors that prevent cross-connection",
            "O₂ is stored as liquid in a VIE at −183°C; N₂O cylinders contain liquid (pressure constant at 44 bar until liquid exhausted)",
            "Pin Index System prevents wrong cylinder attachment — O₂: 2-5, N₂O: 3-5, Air: 1-5",
            "Pressure regulators (reducing valves) reduce cylinder pressure from 137 bar to ~400 kPa using a spring-diaphragm mechanism",
            "Rotameters are variable-orifice, constant-pressure-drop flowmeters; O₂ must be downstream (nearest patient) to prevent hypoxic mixtures",
            "The O₂ failure alarm (Ritchie whistle) is pressure-powered and requires no battery; it sounds when supply falls below ~200 kPa",
            "AAGBI 2012 pre-use check is mandatory before every anaesthetic list",
          ]}
        />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            The anaesthetic machine (workstation) is the central piece of equipment in any operating theatre. It receives medical
            gases from pipeline or cylinder supply, regulates their pressure, controls flow rates through calibrated flowmeters,
            adds volatile anaesthetic agents via vaporizers, and delivers the gas mixture to the patient via a breathing system.
            A thorough understanding of its components and safety features is essential for the Primary FRCA and safe clinical practice.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <AnaestheticMachineDiagram />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Pipeline Supply (MGPS)</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Medical gas pipelines deliver gases at <strong>400 kPa (4 bar, ~60 psi)</strong> from a central supply to terminal
              units in the operating theatre. Oxygen is typically stored in a <strong>Vacuum Insulated Evaporator (VIE)</strong> as
              liquid at −183°C and 10–12 bar, with evaporator coils converting it to gas before distribution.
            </p>
            <p>
              Terminal units use <strong>NIST (Non-Interchangeable Screw Thread)</strong> or <strong>Schrader</strong> probes to
              prevent cross-connection of different gas supplies — a critical safety feature. Each gas has a unique probe diameter
              and pin configuration, and the connections are colour-coded according to national standards.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Cylinder Gas Storage</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Gas cylinders are classified by size (A–J) and colour-coded by contents. Size E cylinders are standard on the
              anaesthetic machine. <strong>O₂ cylinders</strong> contain gas at 137 bar — pressure is directly proportional to
              contents (ideal gas behaviour), so the gauge reliably indicates remaining volume.
            </p>
            <p>
              <strong>N₂O cylinders</strong> contain liquid and vapour in equilibrium at 44 bar (at 20°C). The pressure remains
              constant until all liquid has evaporated, after which it falls rapidly. Therefore, the gauge does <em>not</em> indicate
              remaining contents — cylinders must be <strong>weighed</strong> instead. The <strong>filling ratio</strong> (weight of
              liquid ÷ weight of water that would fill the cylinder) is 0.75 in the UK (0.67 in tropical climates) to prevent
              hydraulic rupture from thermal expansion.
            </p>
            <p>
              The <strong>Pin Index System</strong> uses two pins on the cylinder yoke with corresponding holes on the cylinder
              valve, preventing attachment of the wrong cylinder type.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Pressure Regulators</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Pressure regulators (reducing valves) reduce high cylinder pressure (~137 bar) to a safe, constant working pressure
              of approximately <strong>400 kPa</strong>. They consist of a <strong>diaphragm</strong> separating a high-pressure
              chamber from a low-pressure chamber, with an adjustable <strong>spring</strong> setting the outlet pressure.
            </p>
            <p>
              As gas flows, the diaphragm deflects to open or close a valve orifice, maintaining constant output despite falling
              input pressure. <strong>Two-stage regulators</strong> are preferred as they minimise the <strong>"seat effect"</strong> —
              the slight rise in outlet pressure that occurs as input pressure falls in single-stage devices.
            </p>
            <p>
              <strong>Adiabatic cooling</strong> occurs during rapid gas expansion through the regulator, which can cause freezing
              if moisture is present — a particular risk with N₂O cylinders.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Flowmeters</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The <strong>rotameter</strong> is a variable-orifice, constant-pressure-drop flowmeter. A bobbin or ball float sits
              in a tapered glass tube. Gas flowing upward lifts the float until the downward forces (gravity) equal the upward
              forces (pressure drop across the float).
            </p>
            <p>
              At <strong>low flows</strong>, the annular gap is narrow → flow is predominantly <em>laminar</em> → dependent on
              <strong>viscosity</strong> (Hagen-Poiseuille). At <strong>high flows</strong>, the gap is wider → flow is
              <em>turbulent</em> → dependent on <strong>density</strong>. This is why each rotameter is calibrated for a specific
              gas and is not interchangeable.
            </p>
            <p>
              The O₂ rotameter must be positioned <strong>downstream</strong> (nearest the common gas outlet) to prevent delivery
              of a hypoxic mixture if an upstream tube cracks and gas leaks. An <strong>anti-hypoxia device</strong> mechanically
              links O₂ and N₂O flowmeters to ensure a minimum 25% O₂ concentration.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Safety Features</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Modern anaesthetic machines incorporate multiple layers of safety. The <strong>O₂ failure alarm</strong> (Ritchie
              whistle) sounds when O₂ supply pressure falls below ~200 kPa. It is powered by the gas pressure itself, requiring
              no battery, and produces a distinctive audible alarm lasting at least 7 seconds.
            </p>
            <p>
              The <strong>O₂ flush</strong> valve delivers 35–75 L/min of pure O₂ directly to the common gas outlet, bypassing
              flowmeters and vaporizers. While essential for emergencies, it carries risks of <strong>barotrauma</strong> (if the
              APL valve is closed) and <strong>awareness</strong> (by diluting volatile agent concentration).
            </p>
            <p>
              A continuous <strong>O₂ analyser</strong> (paramagnetic or galvanic fuel cell) on the inspiratory limb provides
              real-time FiO₂ monitoring with audible alarms for low oxygen concentration. The <strong>AAGBI 2012 checklist</strong> provides
              a standardised framework for pre-use machine checks that must be performed before every anaesthetic list.
            </p>
          </div>
        </div>

        <QuizSection questions={anaestheticMachineQuiz} />

        <TopicCompletionToggle topicId="anaesthetic-machine" topicTitle="The Anaesthetic Machine" />
      </div>
    </SectionLayout>
  );
};

export default AnaestheticMachineTopic;
