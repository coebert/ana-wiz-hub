import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { anaestheticMachineQuiz } from "@/data/quizzes";
import AnaestheticMachineDiagram from "@/components/diagrams/AnaestheticMachineDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

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

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Standard Anaesthetic Machine Check (AAGBI 2012)</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              A structured pre-use check must be performed at the <strong>start of every operating list</strong>, with an
              abbreviated check between cases. The check should follow a logical "<strong>upstream-to-downstream</strong>"
              sequence — from gas supply, through the machine, to the breathing system and patient. Document completion
              on the anaesthetic chart and attach a "Machine Checked" label.
            </p>

            <ol className="list-decimal list-inside space-y-3 pl-2">
              <li>
                <strong>Self-test & power supply.</strong> Confirm the machine is plugged into mains and the
                <strong> battery back-up</strong> is charged (≥30 min reserve). Allow the machine's electronic
                self-test to complete without interruption.
              </li>
              <li>
                <strong>Suction.</strong> Check suction is connected, switched on, and generates a vacuum of at least
                <strong> −500 mmHg</strong> when the tubing is occluded. A working Yankauer must be immediately to hand.
              </li>
              <li>
                <strong>Gas supplies — pipelines.</strong> Confirm O₂, N₂O, and Air pipelines are connected to the
                correct <strong>Schrader/NIST</strong> sockets and that each pipeline gauge reads <strong>~400 kPa</strong>.
                Verify colour-coding and that hoses are not kinked.
              </li>
              <li>
                <strong>Gas supplies — cylinders.</strong> Open each reserve cylinder in turn: check the gauge, then
                close. The O₂ cylinder should be <strong>at least half full</strong> (~68 bar). Confirm the
                <strong> pin-index</strong> and that no cylinder hisses when opened.
              </li>
              <li>
                <strong>Flowmeters.</strong> Turn each flowmeter through its full range and check the bobbin rotates
                freely without sticking. Confirm the <strong>anti-hypoxia (hypoxic guard) link</strong> by attempting
                to deliver pure N₂O — minimum 25% O₂ should be maintained.
              </li>
              <li>
                <strong>O₂ failure alarm.</strong> With the O₂ flowmeter open, disconnect the O₂ pipeline (or close
                the cylinder). The <strong>Ritchie whistle</strong> should sound, N₂O flow should cut off, and the
                <strong> anti-hypoxia cut-off</strong> should activate. Reconnect O₂ and confirm flow is restored.
              </li>
              <li>
                <strong>O₂ flush.</strong> Press the emergency O₂ flush — confirm a free flow of <strong>35–75 L/min</strong>
                without pressure rise within the breathing system.
              </li>
              <li>
                <strong>Vaporizers.</strong> Check each vaporizer is <strong>seated correctly</strong>, locked,
                adequately filled, and that the filling port is closed. Confirm control dials turn smoothly. Check
                for leaks at every dial setting (high and zero).
              </li>
              <li>
                <strong>Breathing system.</strong> Inspect for correct configuration and patency. Perform a
                <strong> "two-bag" test</strong>: occlude the patient end with a second reservoir bag, close the APL
                valve, and pressurise to ~30 cmH₂O — the system should hold pressure with no leak. Then ventilate
                manually and mechanically to confirm unidirectional valves move appropriately.
              </li>
              <li>
                <strong>Scavenging (AGSS).</strong> Confirm the active scavenging system is connected, switched on,
                and that the float/indicator shows adequate flow.
              </li>
              <li>
                <strong>Ventilator.</strong> Set typical parameters (TV 500 mL, RR 12, I:E 1:2) and ventilate a test
                lung. Confirm bellows fill and empty correctly, and that <strong>disconnect, high-pressure, and
                low-tidal-volume alarms</strong> are enabled and audible.
              </li>
              <li>
                <strong>Monitoring.</strong> Switch on and confirm calibration of: <strong>SpO₂, ECG, NIBP, capnography,
                FiO₂ analyser, agent monitor, and temperature</strong>. Set appropriate alarm limits — these must
                <em> never</em> be silenced or set to default-off.
              </li>
              <li>
                <strong>Airway equipment.</strong> Confirm immediate availability of facemasks (multiple sizes),
                <strong> functioning laryngoscopes</strong> (direct + video back-up), tracheal tubes (cuff-tested),
                supraglottic airways, bougie/stylet, Magill forceps, and a <strong>self-inflating bag</strong> for
                emergency ventilation independent of the machine.
              </li>
              <li>
                <strong>Final documentation.</strong> Record the check in the anaesthetic chart and attach the
                "Machine Checked" label. Between cases, repeat an <strong>abbreviated check</strong>: breathing
                system integrity (two-bag test), vaporizer level, suction, and monitoring.
              </li>
            </ol>

            <p className="text-sm italic">
              <strong>Mnemonic — "POWER on the MACHINE":</strong> <em>P</em>ower & self-test · <em>O</em>xygen supply
              & alarm · <em>W</em>aveform/monitoring · <em>E</em>mergency O₂ flush · <em>R</em>eservoir cylinders ·
              <em>M</em>achine flowmeters & vaporizers · <em>A</em>irway equipment · <em>C</em>ircuit (two-bag test) ·
              <em>H</em>oses & scavenging · <em>I</em>nduction drugs ready · <em>N</em>otes documented ·
              <em>E</em>mergency self-inflating bag.
            </p>
          </div>
        </div>

        <QuizSection questions={anaestheticMachineQuiz} />

      <ReferencesList topicId="anaesthetic-machine" />

        <SeeAlso topicId="anaesthetic-machine" />
        <TopicCompletionToggle topicId="anaesthetic-machine" topicTitle="The Anaesthetic Machine" />
      </div>
    </SectionLayout>
  );
};

export default AnaestheticMachineTopic;
