import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import {
  anaestheticMachineQuiz,
  breathingCircuitsQuiz,
  vaporizersQuiz,
  ventilatorsQuiz,
} from "@/data/quizzes";
import AnaestheticMachineDiagram from "@/components/diagrams/physics/AnaestheticMachineDiagram";
import BreathingCircuitsDiagram from "@/components/diagrams/physics/BreathingCircuitsDiagram";
import { VaporizerDiagram } from "@/components/diagrams/physics/VaporizerDiagram";
import BagInBottleDiagram from "@/components/diagrams/physics/BagInBottleDiagram";
import ManleyMVDDiagram from "@/components/diagrams/physics/ManleyMVDDiagram";
import RitchieWhistleDiagram from "@/components/diagrams/physics/RitchieWhistleDiagram";
import NeuraxialNeedlesDiagram from "@/components/diagrams/physics/NeuraxialNeedlesDiagram";
import LaryngoscopeBladesDiagram from "@/components/diagrams/physics/LaryngoscopeBladesDiagram";
import InlineRef from "@/components/references/InlineRef";

const equipmentMonitoringFaqs: Array<[string, string]> = [
  [
    "What are the Association of Anaesthetists minimum monitoring standards for anaesthesia?",
    "Continuous pulse oximetry, ECG, NIBP (every 5 min or more frequent), capnography (mandatory whenever the airway is instrumented — ETT, SAD, tracheostomy), inspired and expired volatile concentration, FiO₂, airway pressure, temperature for cases >30 min, neuromuscular monitoring whenever NMBA used. Continuous presence of an anaesthetist."
  ],
  [
    "How does the anaesthetic machine ensure hypoxic gas cannot be delivered?",
    "Hypoxic guard (mechanical/electronic linkage between O₂ and N₂O flowmeters ensures FiO₂ ≥25 %), pin-index system on cylinders, non-interchangeable Schrader pipeline connectors (colour- and size-coded), oxygen failure alarm (Ritchie whistle), oxygen analyser in the common gas outlet with low-FiO₂ alarm, and an oxygen flush button that bypasses the vaporiser."
  ],
  [
    "What is the difference between disconnection alarms and apnoea alarms?",
    "Disconnection alarm — triggered by sustained low airway pressure (<10 cmH₂O) during ventilation, indicating circuit disconnect, leak, or ventilator failure. Apnoea alarm — triggered by absent CO₂ on capnography or absent volume signal for a set interval (usually 15–20 s). Both are mandatory whenever the patient is ventilated."
  ]
];

const objectives = [
  "Trace the gas pathway from pipeline/cylinder through regulator, flowmeter, vaporizer and breathing system to patient.",
  "Compare plenum vs draw-over and TEC 5/7 vs TEC 6 vaporizers, including the splitting ratio calculation.",
  "Classify Mapleson circuits and identify the most efficient system for spontaneous and controlled ventilation.",
  "Classify ventilators by power source, mechanism and cycling, citing representative theatre, ICU and transport machines.",
  "List Association of Anaesthetists minimum monitoring standards and outline the joint Association of Anaesthetists / RCoA 2024 machine-safety guideline ('Anaesthesia, anaesthetic machines and patient safety'), including the pre-use machine check.",
  "Describe key airway equipment (laryngoscope blades, neuraxial needles) and the rationale for their design.",
];

const keyPoints = [
  { text: "Pipeline 400 kPa via NIST/Schrader; O₂ stored in VIE as liquid at ~−160 °C and ~10 bar (boiling point rises with pressure above the 1 atm value of −183 °C); cylinders sized A–J with PISS and colour codes.", cites: ["BJA Educ 2017 (Medical gases)"] },
  { text: "N₂O cylinders contain liquid — pressure constant at 44 bar until exhausted; assess contents by weight; UK filling ratio 0.75.", cites: ["Macintosh 1943"] },
  { text: "Pressure regulators reduce 137 bar → 400 kPa (spring-diaphragm); two-stage minimises seat effect.", cites: ["AAGBI Standards 2015"] },
  { text: "Rotameters: laminar (low flow) viscosity-dependent; turbulent (high) density-dependent; gas-specific; O₂ downstream.", cites: ["Weiss & Engelhardt 2010"] },
  { text: "SVP depends only on agent + temperature; desflurane (BP 22.8 °C) needs heated TEC 6.", cites: ["BJA Educ 2017 (Medical gases)"] },
  { text: "Mapleson A best for SV (FGF ≈ MV); D best for IPPV (FGF 70 mL/kg/min).", cites: ["Cochrane VL 2022"] },
  { text: "Circle system enables low-flow anaesthesia; soda lime exothermic; desiccation → compound A (sevo) and CO (des).", cites: ["BJA Educ Videolaryngoscopy 2016"] },
  { text: "Ascending bellows fail to rise on disconnect — primary visual alarm.", cites: ["NAP4 2011"] },
  { text: "Manley MVD: VT = FGF ÷ RR. Modern piston ventilators decouple FGF for fixed VT.", cites: ["DAS 2015"] },
  { text: "Ritchie whistle is gas-powered (Venturi/Bernoulli) — sounds even during power failure.", cites: ["Cormack & Lehane 1984"] },
  { text: "AAGBI minimum monitoring: SpO₂, ECG, NIBP, EtCO₂, FiO₂, agent, airway pressure, temperature; TOF if NMBs.", cites: ["McCoy & Mirakhur 1993"] },
  { text: "Pencil-point spinal needles (Whitacre/Sprotte) reduce PDPH vs Quincke; Tuohy directs epidural catheter via Huber tip.", cites: ["Miller 1941"] },
  { text: "Pre-use machine check per the AoA/RCoA 2024 guideline ('Anaesthesia, anaesthetic machines and patient safety'): full check at the start of every session with an upstream-to-downstream sequence, two-bag test for circuit integrity, self-inflating bag immediately available, and a recorded, signed checklist — repeated after any change to the equipment configuration.", cites: ["RCoA/AoA 2024 Machine Check", "AAGBI Check 2023"] },
];

import manleyImg from "@/assets/ventilators/manley-mp3.jpg";
import nuffieldImg from "@/assets/ventilators/penlon-nuffield-200.jpg";
import birdImg from "@/assets/ventilators/bird-mark-7.jpg";
import oxylogImg from "@/assets/ventilators/drager-oxylog-3000.jpg";
import evitaImg from "@/assets/ventilators/drager-evita-v500.jpg";
import hamiltonImg from "@/assets/ventilators/hamilton-g5.jpg";
import servoImg from "@/assets/ventilators/maquet-servo-u.jpg";
import primaImg from "@/assets/ventilators/penlon-prima-sp.jpg";
import aisysImg from "@/assets/ventilators/ge-aisys-cs2.jpg";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";

/* ───────────────── Data tables ───────────────── */

const sectionsToc = [
  { href: "#machine", label: "1 · The Anaesthetic Machine" },
  { href: "#vaporizers", label: "2 · Vaporizers" },
  { href: "#circuits", label: "3 · Breathing Circuits & Scavenging" },
  { href: "#ventilators", label: "4 · Ventilators" },
  { href: "#monitoring", label: "5 · Monitoring" },
  { href: "#airway", label: "6 · Airway Equipment" },
  { href: "#checks", label: "7 · Pre-Use Safety Checks" },
];

const maplesonRows = [
  { circuit: "A", aka: "Magill", spont: "★★★", spontFGF: "1× MV", ctrl: "★", ctrlFGF: "≥3× MV", note: "APL valve near patient — vents alveolar gas first" },
  { circuit: "B", aka: "—", spont: "★", spontFGF: "2–3× MV", ctrl: "★★", ctrlFGF: "2–3× MV", note: "Rarely used clinically" },
  { circuit: "C", aka: "Waters", spont: "★", spontFGF: "2–3× MV", ctrl: "★★", ctrlFGF: "2–3× MV", note: "No tubing — bag connected directly" },
  { circuit: "D", aka: "Bain (coaxial)", spont: "★★", spontFGF: "2–3× MV", ctrl: "★★★", ctrlFGF: "70 mL/kg/min", note: "FGF at patient end via inner tube" },
  { circuit: "E", aka: "Ayre's T-piece", spont: "★★", spontFGF: "2–3× MV", ctrl: "★★", ctrlFGF: "2–3× MV", note: "No valves/bag — minimal resistance (neonates)" },
  { circuit: "F", aka: "Jackson-Rees", spont: "★★", spontFGF: "2–3× MV", ctrl: "★★", ctrlFGF: "2–3× MV", note: "T-piece + open-tail bag for IPPV" },
];

const ventilatorClassification = [
  {
    category: "Power Source",
    items: [
      { name: "Pneumatic (gas-powered)", desc: "Driven entirely by compressed gas — Manley, Penlon Nuffield 200, Oxylog 2000. MRI-safe and field-capable." },
      { name: "Electrical", desc: "Most modern ICU ventilators (Dräger Evita, Hamilton G5, Servo-U). Sophisticated modes and waveforms." },
      { name: "Combined", desc: "Pneumatic drive with electronic timing/monitoring — Penlon Prima SP, Oxylog 3000+." },
    ],
  },
  {
    category: "Mechanism",
    items: [
      { name: "Minute Volume Divider (Manley)", desc: "VT = FGF ÷ RR — changing FGF changes tidal volume." },
      { name: "Bag-in-bottle (double circuit)", desc: "Driving gas compresses an outer chamber that squeezes the inner bellows. Ascending bellows preferred (collapse on disconnect)." },
      { name: "Piston/linear motor", desc: "Direct compression — accurate VT independent of FGF (Dräger Apollo, GE Aisys)." },
      { name: "Turbine", desc: "High-speed turbine compresses ambient air — Hamilton T1, Oxylog VE300. No pipeline required." },
    ],
  },
  {
    category: "Cycling",
    items: [
      { name: "Time-cycled", desc: "Inspiration ends after preset Ti — used in PCV." },
      { name: "Volume-cycled", desc: "Inspiration ends when set VT delivered — used in VCV." },
      { name: "Pressure-cycled", desc: "Inspiration ends at preset Paw (Bird Mark 7). VT varies with compliance." },
      { name: "Flow-cycled", desc: "Inspiration ends when flow falls to ~25% of peak — used in PSV." },
    ],
  },
];

const historicVentilators = [
  {
    name: "Manley MP3", era: "1960s–1990s", type: "Minute Volume Divider", image: manleyImg,
    mechanism: "Purely pneumatic, gas-powered. Two concertina bellows alternate — one fills while the other delivers under a weight setting inspiratory pressure.",
    features: ["No electricity required", "VT = FGF ÷ RR", "Cannot deliver PEEP without modification", "Still used in MRI suites and resource-limited settings"],
  },
  {
    name: "Penlon Nuffield 200", era: "1980s–present", type: "Bag-in-Bottle / Time-Cycled", image: nuffieldImg,
    mechanism: "Gas-powered with a Newton non-rebreathing valve; widely used with Mapleson D/E in paediatric anaesthesia.",
    features: ["Simple and reliable", "Mapleson D/E/F compatible", "MRI-safe (no electricity)", "Limited monitoring"],
  },
  {
    name: "Bird Mark 7", era: "1950s–1980s", type: "Pressure-Cycled", image: birdImg,
    mechanism: "Entirely pneumatic, pressure-cycled — inspiration ends at a preset pressure. Tidal volume varies with compliance.",
    features: ["Pressure-cycled", "Sensitivity for patient triggering", "Historically important", "Largely replaced by modern ventilators"],
  },
];

const modernVentilators = [
  { name: "Dräger Oxylog 3000+", setting: "Pre-hospital / Transport", type: "Turbine + Pneumatic", image: oxylogImg,
    features: ["Battery + optional gas supply", "VCV, PCV, PSV, SIMV, CPAP, BiLevel", "Built-in capnography & SpO₂", "AutoFlow", "Rugged transport design"] },
  { name: "Dräger Evita Infinity V500", setting: "Intensive Care", type: "Electronically Controlled", image: evitaImg,
    features: ["Full ICU ventilator inc. APRV, MMV", "SmartCare/PS automated weaning", "Loops, trends, ATC", "Integrated nebuliser"] },
  { name: "Hamilton G5 / C6", setting: "Intensive Care", type: "Turbine, Electronic", image: hamiltonImg,
    features: ["INTELLiVENT-ASV closed-loop", "Adaptive Support Ventilation", "Volumetric capnography", "P/V Tool for recruitment"] },
  { name: "Maquet Servo-U", setting: "Intensive Care", type: "Electronically Controlled", image: servoImg,
    features: ["NAVA via Edi catheter", "PS, PCV, VCV, PRVC, SIMV", "Touchscreen interface", "Neonate to adult"] },
  { name: "Penlon Prima SP", setting: "Operating Theatre", type: "Pneumatic + Electronic", image: primaImg,
    features: ["Ascending bellows", "VCV/PCV with PEEP", "Disconnect alarm via bellows", "Compact theatre workhorse"] },
  { name: "GE Aisys CS²", setting: "Operating Theatre", type: "Piston, Electronic", image: aisysImg,
    features: ["Piston — VT independent of FGF", "PCV-VG mode", "Electronic gas mixing & low-flow", "Fresh gas decoupling"] },
];

const monitoringStandards = [
  { label: "Pulse oximetry (SpO₂)", value: "Mandatory for every anaesthetic — including transfer." },
  { label: "ECG", value: "Continuous; rate, rhythm, ischaemia detection." },
  { label: "NIBP / arterial line", value: "≥5-minutely NIBP; arterial line for beat-to-beat BP/ABG." },
  { label: "Capnography (EtCO₂)", value: "Gold standard for tube confirmation, ventilation, and disconnect detection — mandatory for transfers." },
  { label: "FiO₂ analyser", value: "Inspiratory limb; calibrate at 21% and 100% O₂. Paramagnetic is rapid and non-consuming; galvanic is slower with a finite-life anode." },
  { label: "Agent analyser", value: "Whenever volatile in use — confirms delivered concentration." },
  { label: "Airway pressure & spirometry", value: "Detects disconnection, obstruction, leaks." },
  { label: "Temperature", value: "Continuous if procedure >30 min; active warming if <36 °C (NICE CG65)." },
  { label: "Neuromuscular monitoring", value: "TOF whenever NMBs used; ratio >0.9 before extubation (NAP6)." },
];

/* ───────────────── Component ───────────────── */

const EquipmentMonitoringTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Capnography trace diagnosis in theatre",
    scenario: "During laparoscopic cholecystectomy the capnogram shows a sudden drop in ETCO₂ from 38 to 12 mmHg with stable SpO₂. Walk through the differential and management.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Recognise the pattern: sudden ETCO₂ drop = reduced delivery of CO₂ to alveoli — circulation or circuit problem</li>
          <li>Circuit: disconnection, sampling line leak, oesophageal intubation (usually no trace at all), kinked tube — inspect connections and waveform</li>
          <li>Circulation: cardiac arrest, massive PE (including CO₂ embolism during laparoscopy), severe hypotension</li>
          <li>Suspect CO₂ embolism: stop insufflation, release pneumoperitoneum, place left lateral head-down (Durant), 100% O₂, aspirate via CVC</li>
          <li>If cardiac arrest, start ALS; rising ETCO₂ during CPR (&gt;10 mmHg) indicates adequate compressions and possible ROSC</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Confusing a leak (gradual decline) with embolism (abrupt fall)</li>
          <li>Falsely reassuring SpO₂ that lags 20–30 s behind the event</li>
          <li>Failing to recognise the diagnostic waveform shapes (curare cleft, obstructive 'shark fin', cardiogenic oscillations)</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Sudden ETCO₂ drop with laparoscopy → high suspicion of CO₂ embolism. Stop insufflation, desufflate, head-down left lateral, 100% O₂, supportive ALS.",
    cites: ["Macintosh 1943", "Miller 1941", "McCoy & Mirakhur 1993"],
  },
];

const EquipmentMonitoringTopic = () => {
  return (
    <TopicTemplate
      title="Anaesthetic Equipment & Monitoring"
      subtitle="A unified, exam-ordered tour of the workstation — machine, vaporizers, circuits, ventilators, monitors, airway equipment and safety checks"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="equipment-monitoring"
      topicTitle="Anaesthetic Equipment & Monitoring"
      workedExamples={EquipmentMonitoringTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={[...anaestheticMachineQuiz, ...vaporizersQuiz, ...breathingCircuitsQuiz, ...ventilatorsQuiz]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY] },
        keyPoints: { exams: [Exam.PRIMARY] },
      }}
      sectionSources={{
        objectives: [
          "Macintosh 1943",
          "Miller 1941",
          "McCoy & Mirakhur 1993",
          "Cormack & Lehane 1984",
          "DAS 2015",
          "NAP4 2011",
          "BJA Educ Videolaryngoscopy 2016",
          "Cochrane VL 2022",
          "BJA Educ Paeds Airway 2017",
          "Weiss & Engelhardt 2010",
          "AAGBI Standards 2015",
        ],
        keyPoints: ["HSE EH40/2005", "AoA Standards of Monitoring 2021", "AoA Equipment Checklist", 
          "Macintosh 1943",
          "Miller 1941",
          "McCoy & Mirakhur 1993",
          "Cormack & Lehane 1984",
          "DAS 2015",
          "NAP4 2011",
          "BJA Educ Videolaryngoscopy 2016",
          "Cochrane VL 2022",
          "BJA Educ Paeds Airway 2017",
          "Weiss & Engelhardt 2010",
          "AAGBI Standards 2015",
        ],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
        <div className="space-y-12">

        {/* ───── Orientation ───── */}
        <section>
          <p className="text-muted-foreground leading-relaxed">
            This topic walks the FRCA candidate through every component of a modern anaesthetic workstation in the order
            they appear in the syllabus and in the OSCE viva: <strong>Machine → Vaporizer → Breathing Circuit → Ventilator → Monitoring → Airway equipment → Pre-use checks</strong>. Each section pairs the underlying physics with an
            interactive diagram, the clinical pitfalls, and the specific exam-tested points.
          </p>
          <nav aria-label="Section navigation" className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {sectionsToc.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="text-sm rounded-lg border border-border bg-card px-3 py-2 hover:bg-accent/40 hover:border-primary/40 transition-colors text-foreground"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </section>

        {/* ───── 1. Anaesthetic Machine ───── */}
        <CollapsibleSubsection title="1 · The Anaesthetic Machine" defaultOpen>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The anaesthetic workstation receives medical gases from <strong>pipeline</strong> (400 kPa via NIST/Schrader) or
              <strong> reserve cylinders</strong>, regulates pressure, controls flow through calibrated flowmeters, adds volatile
              agent via a vaporizer, and delivers gas through a breathing system to the patient. Oxygen is held centrally as
              liquid in a <strong>Vacuum Insulated Evaporator (VIE)</strong> at approximately <strong>−160 °C and 10 bar</strong>.
              The often-quoted figure of −183 °C is the boiling point of O₂ at <em>1 atm</em>; at the VIE's storage pressure of
              ~10 bar the boiling point rises to around −160 °C.
              <InlineRef topicId="equipment-monitoring" refLabel="BJA Educ 2017 (Medical gases)" contextTitle="Medical gases — VIE storage" keyPoints={["Liquid O₂ stored in a VIE at approximately −160 °C and 10–12 bar.", "−183 °C is the boiling point of O₂ at 1 atmosphere only.", "Contents assessed by differential weighing of the VIE."]} accentColor="hsl(210, 65%, 50%)" />
            </p>
            <p>
              <strong>Cylinders</strong> are size E on the machine and colour-coded by contents. O₂ cylinders contain compressed
              gas at 137 bar — the gauge reliably indicates contents. <strong>N₂O cylinders</strong> contain liquid + vapour at
              44 bar; pressure stays constant until liquid is exhausted, so contents must be assessed by <em>weight</em>. A UK
              <strong> filling ratio of 0.75</strong> (mass of N₂O ÷ mass of water that would fill the cylinder) prevents
              hydraulic rupture from thermal expansion in a temperate climate; tropical climates use 0.67.
              <InlineRef topicId="equipment-monitoring" refLabel="BJA Educ 2017 (Medical gases)" contextTitle="N₂O cylinders & filling ratio" keyPoints={["UK filling ratio 0.75; tropical 0.67.", "Prevents hydraulic rupture if cylinder warms.", "Contents assessed by weight, not pressure."]} accentColor="hsl(210, 65%, 50%)" />
              The <strong>Pin Index System (PISS)</strong> prevents wrong-cylinder attachment.
            </p>

            <p>
              <strong>Pressure regulators</strong> reduce ~137 bar cylinder pressure to ~400 kPa using a spring-diaphragm
              mechanism. Two-stage designs minimise the "seat effect". Adiabatic cooling from rapid expansion can freeze
              moisture — particularly with N₂O.
            </p>
            <p>
              <strong>Rotameters</strong> are variable-orifice, constant-pressure-drop flowmeters built around a
              <strong> Thorpe tube</strong> — a tapered glass tube, narrow at the base and wider towards the top, so the
              annular gap between the bobbin and the tube wall widens as the bobbin rises. The bobbin floats at the height
              at which the upward force generated by gas flow through this annulus exactly balances its weight; because
              weight is fixed, the <strong>pressure drop across the bobbin is held constant</strong> regardless of flow —
              hence "constant-pressure-drop, variable-orifice" device. Two bobbin designs are used: a
              <strong> rotating bobbin</strong>, read at its <em>top</em> and kept centred by skirts/slots that spin it in
              the gas stream, and a <strong>ball float</strong>, read at its <em>equator</em> (middle). Rib guides down the
              inside of the tube keep the bobbin central without significant added friction, and the glass carries an
              antistatic coating to prevent bobbin sticking from static charge.
              <InlineRef topicId="equipment-monitoring" refLabel="Weiss & Engelhardt 2010" contextTitle="Rotameter (Thorpe tube) mechanics" keyPoints={["Tapered glass tube — annular gap widens as the bobbin rises.", "Bobbin floats where upward flow force = bobbin weight — constant pressure drop.", "Rotating bobbin read at top; ball float read at the equator.", "Rib guides + antistatic coating keep the bobbin centred and free-moving."]} accentColor="hsl(210, 65%, 50%)" />
            </p>
            <p>
              Flow characteristics change along the tube's length. At the <strong>bottom</strong> the annulus is long and
              narrow and behaves like a <em>tube</em>: flow is <strong>laminar</strong> and governed by the
              <strong> Hagen–Poiseuille</strong> relationship, so resistance depends on the gas's <strong>viscosity</strong>.
              At the <strong>top</strong> the annulus is short and wide and behaves like an <em>orifice</em>: flow becomes
              <strong> turbulent</strong> and depends on the gas's <strong>density</strong>. Because both viscosity and
              density are gas-specific, each Thorpe tube is calibrated for a single named gas — tubes are
              <strong> not interchangeable between gases</strong>, and calibration assumes standard conditions
              (20 °C, 101.3 kPa), so readings become inaccurate at altitude or under hyperbaric conditions. Each is
              gas-specific and not interchangeable. The O₂ rotameter must be <strong>downstream</strong> (nearest the
              common gas outlet) so a cracked upstream tube cannot deliver a hypoxic mixture. The <strong>anti-hypoxia link</strong>
              mechanically guarantees ≥25% O₂.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <AnaestheticMachineDiagram />
          </div>
        </CollapsibleSubsection>

        {/* ───── 2. Vaporizers ───── */}
        <CollapsibleSubsection title="2 · Vaporizers">
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Vaporizers convert liquid volatile agent into a controlled vapour concentration. <strong>Saturated vapour pressure (SVP)</strong> depends only on the agent and temperature — not atmospheric pressure. At 20 °C: sevoflurane SVP ≈ 21.3 kPa,
              isoflurane ≈ 33.2 kPa, desflurane ≈ 88.5 kPa.
            </p>
            <p>
              <strong>Plenum vaporizers (TEC 5/7)</strong> sit downstream of the flowmeters and use a <strong>splitting ratio</strong>
              (bypass : chamber) controlled by the dial. A <strong>bimetallic strip</strong> compensates for cooling caused by latent
              heat loss. Wicks, baffles and sintered discs maximise vaporizing surface area; agent-specific keyed fillers prevent
              misfilling.
            </p>
            <p>
              <strong>Splitting ratio worked example:</strong> chamber output = SVP/P<sub>atm</sub> × 100 (e.g. 21% for sevoflurane
              at 1 atm). To deliver 2% sevoflurane the bypass : chamber ratio ≈ (21 − 2) : 2 ≈ 9.5 : 1.
            </p>
            <p>
              <strong>Desflurane</strong> (boiling point 22.8 °C, SVP 88.5 kPa) cannot use a conventional vaporizer. The
              <strong> TEC 6</strong> heats the agent to 39 °C and 2 atm, then injects measured pure vapour into the FGF.
            </p>
            <p>
              <strong>Draw-over vaporizers</strong> (Oxford Miniature Vaporizer, Triservice apparatus) have low resistance and
              operate at or below atmospheric pressure — patient-driven. Portable and used in field/military anaesthesia, but
              less precise.
            </p>
            <p>
              <strong>Altitude effect</strong>: at lower P<sub>atm</sub>, SVP is unchanged so the partial pressure of agent
              delivered by a dial setting is preserved (clinical effect maintained) even though the % concentration rises —
              no adjustment required.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <VaporizerDiagram />
          </div>
        </CollapsibleSubsection>

        {/* ───── 3. Breathing Circuits ───── */}
        <CollapsibleSubsection title="3 · Breathing Circuits & Scavenging">
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Breathing systems carry FGF from the common gas outlet to the patient and clear exhaled CO₂. <strong>Mapleson
              circuits (A–F)</strong> are semi-open systems differing in the relative positions of FGF inlet, APL valve,
              reservoir bag and corrugated tubing.
            </p>
            <p>
              <strong>Mapleson A (Magill)</strong> is most efficient for spontaneous ventilation because the APL valve sits near
              the patient — alveolar gas vents first while dead-space gas refills the tubing (FGF ≈ MV). It is the worst for IPPV.
              <strong> Mapleson D (Bain)</strong> is a coaxial circuit delivering FGF at the patient end — most efficient for
              controlled ventilation. The <strong>Pethick test</strong> excludes inner-tube disconnection.
              <strong> Mapleson E (Ayre's T-piece)</strong> has no valves or bag — minimal resistance, ideal for neonates;
              <strong> F (Jackson-Rees)</strong> adds an open-tail bag for IPPV.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">Mapleson efficiency comparison</h3>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left p-3 font-semibold text-foreground border-b border-border">Circuit</th>
                    <th className="text-left p-3 font-semibold text-foreground border-b border-border">AKA</th>
                    <th className="text-center p-3 font-semibold text-foreground border-b border-border">Spont</th>
                    <th className="text-center p-3 font-semibold text-foreground border-b border-border whitespace-nowrap">FGF (SV)</th>
                    <th className="text-center p-3 font-semibold text-foreground border-b border-border">Ctrl</th>
                    <th className="text-center p-3 font-semibold text-foreground border-b border-border whitespace-nowrap">FGF (IPPV)</th>
                    <th className="text-left p-3 font-semibold text-foreground border-b border-border">Key feature</th>
                  </tr>
                </thead>
                <tbody>
                  {maplesonRows.map((row) => (
                    <tr key={row.circuit} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">Mapleson {row.circuit}</td>
                      <td className="p-3 text-muted-foreground">{row.aka}</td>
                      <td className="p-3 text-center">{row.spont}</td>
                      <td className="p-3 text-center font-mono text-xs text-foreground">{row.spontFGF}</td>
                      <td className="p-3 text-center">{row.ctrl}</td>
                      <td className="p-3 text-center font-mono text-xs text-foreground">{row.ctrlFGF}</td>
                      <td className="p-3 text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ★★★ = most efficient (lowest FGF) · ★ = least efficient. MV ≈ 70–100 mL/kg/min.
            </p>
          </div>

          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The <strong>circle system</strong> (semi-closed, 7 components: FGF inlet, inspiratory + expiratory unidirectional
              valves, Y-piece, APL valve, reservoir bag, CO₂ absorber) enables <strong>low-flow anaesthesia</strong>
              (FGF 0.5–1 L/min) by rebreathing after CO₂ absorption — conserves agent, warms and humidifies inspired gas,
              reduces pollution.
            </p>
            <p>
              Definitions vary, but <strong>low flow</strong> generally means FGF ≤1 L/min, <strong>minimal flow</strong> about
              0.5 L/min, and <strong>closed circuit</strong> FGF matched to metabolic uptake (roughly 0.2–0.3 L/min). After a high-flow
              wash-in, reducing FGF increases the circuit time constant: inspired oxygen and agent respond slowly to dial changes and
              leaks become proportionally important. Use continuous inspired oxygen and inspired/expired agent analysis, capnography,
              volume and airway-pressure monitoring; increase FGF promptly if concentration control, absorber function or circuit
              integrity is uncertain.
              <InlineRef topicId="equipment-monitoring" refLabel="RCoA/AoA 2024 Machine Check" />
            </p>
            <p>
              <strong>Soda lime</strong>: Ca(OH)₂ ~80% + NaOH ~4% + KOH ~1% + water ~14% + silica + indicator. CO₂ + H₂O →
              H₂CO₃ → reacts with NaOH → Na₂CO₃ → regenerates NaOH while producing CaCO₃. Reaction is <strong>exothermic</strong>
              (40–60 °C) and produces water. Indicator (ethyl violet) turns purple when exhausted but may regenerate overnight.
              <strong> Desiccated soda lime risks</strong>: <em>compound A</em> (sevoflurane, nephrotoxic in rats) and
              <em> CO</em> (desflurane, especially with KOH).
            </p>
            <p>
              <strong>Scavenging (AGSS)</strong>: 4 components — collecting (30 mm connector, deliberately incompatible with
              breathing-circuit fittings), transfer, receiving (with safety valves limiting pressure to ±0.5 cmH₂O), and
              disposal (active 75 L/min or passive). Specifications follow <strong>ISO 80601-2-13</strong> and AAGBI/BJA
              Education guidance on theatre pollution.
              <InlineRef topicId="equipment-monitoring" refLabel="AAGBI Standards 2015" contextTitle="Scavenging (AGSS) specifications" keyPoints={["30 mm collector connector (incompatible with breathing-system 22/15 mm fittings).", "Receiving system safety valves limit pressure to ±0.5 cmH₂O.", "Active disposal flow typically 75 L/min.", "Standard: ISO 80601-2-13 / BJA Educ 2018 (Pollution in anaesthesia)."]} accentColor="hsl(140, 55%, 42%)" />
            </p>
            <p>
              <strong>UK Workplace Exposure Limits (WELs, HSE EH40, 8-hour TWA)</strong>: nitrous oxide <strong>100 ppm</strong>;
              halothane <strong>10 ppm</strong>; isoflurane / enflurane <strong>50 ppm</strong>. No specific WEL exists for
              sevoflurane or desflurane — a precautionary limit (often ~20 ppm for sevoflurane) is applied locally, with
              scavenging and low-flow technique to minimise exposure.
              <InlineRef topicId="equipment-monitoring" refLabel="AAGBI Standards 2015" contextTitle="COSHH / HSE WELs for anaesthetic gases" keyPoints={["N₂O 100 ppm (8-hr TWA).", "Halothane 10 ppm; isoflurane / enflurane 50 ppm.", "No formal WEL for sevoflurane or desflurane — apply precautionary local limits.", "Source: HSE EH40/2005 Workplace exposure limits."]} accentColor="hsl(0, 65%, 55%)" />
            </p>

          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <BreathingCircuitsDiagram />
          </div>
        </CollapsibleSubsection>

        {/* ───── 4. Ventilators ───── */}
        <CollapsibleSubsection title="4 · Ventilators">
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Mechanical ventilators generate a pressure gradient to drive gas into the lungs. They range from purely pneumatic
              MVDs to microprocessor-controlled closed-loop ICU machines.
            </p>
          </div>

          {ventilatorClassification.map((cat) => (
            <div key={cat.category}>
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">Classification by {cat.category}</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {cat.items.map((item) => (
                  <div key={item.name} className="p-3 rounded-lg border border-border bg-card">
                    <p className="font-semibold text-foreground text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Ascending vs descending bellows</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border bg-secondary/20">
                <p className="font-semibold text-foreground text-sm mb-1">Ascending (preferred)</p>
                <p className="text-sm text-muted-foreground">
                  Bellows rise during expiration. On disconnect they <strong>fail to rise</strong> — immediate visual alarm.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/20">
                <p className="font-semibold text-foreground text-sm mb-1">Descending (historical)</p>
                <p className="text-sm text-muted-foreground">
                  Bellows fall under gravity. On disconnect they continue moving (drawing in room air), masking the disconnect.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Bag-in-bottle mechanism</h3>
            <BagInBottleDiagram />
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Minute volume divider (Manley)</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Two alternating concertina bellows. While one delivers gas under its weight, the other fills with FGF. The
              changeover valve switches when the delivering bellows empties. <strong>VT = FGF ÷ RR</strong> — changing FGF
              changes tidal volume.
            </p>
            <ManleyMVDDiagram />
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>Fresh gas decoupling</strong> in modern piston/electronic ventilators routes FGF to the reservoir during
            inspiration, so delivered VT is independent of FGF — the opposite extreme of the Manley.
          </p>

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Historic ventilators</h3>
            <div className="space-y-3">
              {historicVentilators.map((v) => (
                <div key={v.name} className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img src={v.image} alt={`${v.name} — ${v.era} ${v.type} anaesthesia ventilator`} loading="lazy" width={512} height={512} className="w-full sm:w-32 h-32 object-contain rounded-lg bg-white flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-bold text-foreground">{v.name}</h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{v.era}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{v.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{v.mechanism}</p>
                      <ul className="space-y-0.5">
                        {v.features.map((f, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Modern ventilator drive mechanisms and modes</h3>
            <div className="grid gap-2 sm:grid-cols-3 mb-3">
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">Bag-in-bottle</p>
                <p className="text-xs text-muted-foreground mt-1">Pneumatically driven ascending bellows compressed by driving gas in an outer chamber. Fresh gas flow contributes directly to the delivered tidal volume unless decoupled.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">Piston</p>
                <p className="text-xs text-muted-foreground mt-1">Electrically driven linear motor (e.g. Dräger Apollo/Aisys) — quiet, accurate at very low tidal volumes, and enables fresh-gas decoupling; requires a negative-pressure relief/entrainment valve to allow room-air entrainment if the piston outstrips fresh gas supply.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">Turbine / blower</p>
                <p className="text-xs text-muted-foreground mt-1">High-speed turbine (e.g. Hamilton T1), ICU-style — capable of high flows and rapid, sensitive patient triggering.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              <strong>Modes on anaesthetic workstations</strong> now mirror ICU ventilators: volume-controlled (VCV), pressure-controlled
              (PCV), <strong>PCV-VG/AutoFlow</strong> (decelerating-flow, volume-guaranteed — pressure automatically adjusted breath-to-breath
              to deliver a set tidal volume), SIMV ± pressure support, pressure-support ventilation (PSV) with an apnoea back-up mode, and
              CPAP/PS for spontaneous ventilation.
              <InlineRef topicId="equipment-monitoring" refLabel="AAGBI Standards 2015" contextTitle="Modern ventilator drive mechanisms and modes" keyPoints={["Bag-in-bottle: fresh gas contributes to VT unless decoupled.", "Piston (e.g. Apollo/Aisys): accurate low VT, needs negative-pressure relief valve.", "Turbine (e.g. Hamilton T1): high flow, good triggering, no pipeline needed.", "PCV-VG/AutoFlow: decelerating flow with volume guarantee.", "Fresh gas decoupling keeps delivered VT independent of FGF changes."]} accentColor="hsl(210, 65%, 50%)" />
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              <strong>Safety features</strong> built into the ventilation subsystem: <strong>fresh gas decoupling</strong> (fresh gas flow
              changes do not alter delivered tidal volume), pressure limitation, compliance/leak compensation, and the alarm set described
              above (high/sustained airway pressure, low VT/MV, apnoea).
            </p>
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Spirometry loops</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Pressure–volume loops</strong>: reduced compliance flattens the loop; <strong>"beaking"</strong> at the top signals
                overdistension; a <strong>lower inflection point</strong> can guide PEEP setting (set just above it to prevent
                derecruitment). <strong>Flow–volume loops</strong>: expiratory <strong>scalloping</strong> is characteristic of
                bronchospasm; a <strong>leak</strong> produces a loop that fails to close; kinking/obstruction produces truncated or
                plateaued flow patterns
                <InlineRef topicId="equipment-monitoring" refLabel="AAGBI Standards 2015" />.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Modern ventilators</h3>
            <div className="space-y-3">
              {modernVentilators.map((v) => (
                <div key={v.name} className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img src={v.image} alt={`${v.name} — ${v.setting} ${v.type} ventilator`} loading="lazy" width={512} height={512} className="w-full sm:w-32 h-32 object-contain rounded-lg bg-white flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-bold text-foreground">{v.name}</h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{v.setting}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{v.type}</span>
                      </div>
                      <ul className="space-y-0.5">
                        {v.features.map((f, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSubsection>

        {/* ───── 5. Monitoring & Safety ───── */}
        <CollapsibleSubsection title="5 · Monitoring & Safety Features">
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Modern workstations integrate multiple layers of safety — built-in mechanical safeguards plus the Association of Anaesthetists minimum
              monitoring standards. The <strong>O₂ failure alarm (Ritchie whistle)</strong> sounds when O₂ supply pressure
              falls below ~200 kPa. It is powered by the residual gas pressure itself — <strong>no battery required</strong> —
              and produces an audible alarm lasting at least 7 seconds (BS EN ISO 80601-2-13). It uses the
              <strong> Venturi/Bernoulli principle</strong>: O₂ flow through a constriction draws air across a reed.
            </p>
            <p>
              The <strong>O₂ flush</strong> delivers 35–75 L/min directly to the common gas outlet, bypassing flowmeters and
              vaporizer. Risks: <strong>barotrauma</strong> (closed APL) and <strong>awareness</strong> (volatile dilution).
              The <strong>O₂ analyser</strong> (paramagnetic or galvanic fuel cell) on the inspiratory limb provides continuous
              FiO₂ with low-O₂ alarms. A <strong>paramagnetic</strong> analyser attracts oxygen into a magnetic field, responds rapidly,
              consumes no reagent and is preferred for breath-by-breath measurement. A <strong>galvanic fuel cell</strong> generates current
              by reducing oxygen while consuming a lead anode; it needs no external power but responds more slowly and lasts about 6–12 months.
              Both measure oxygen partial pressure and must be checked in room air (21%) and 100% oxygen during the pre-use check. Clinically,
              FiO₂ detects pipeline crossover or hypoxic mixtures, confirms preoxygenation and one-lung ventilation delivery, while end-tidal
              oxygen helps judge denitrogenation and oxygen uptake.
              <InlineRef topicId="equipment-monitoring" refLabel="AoA Standards of Monitoring 2021" />
            </p>
          </div>

          <RitchieWhistleDiagram />

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Anaesthetic Workstation Alarms</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Workstation alarms are graded by <strong>priority</strong> under BS EN/IEC 60601-1-8: <strong>high</strong> priority
              (immediate life-threatening risk) — red, rapid repeating tone; <strong>medium</strong> priority (urgent, prompt
              response needed) — yellow, slower tone; <strong>low</strong> priority (advisory) — cyan, single/soft tone.
              <InlineRef topicId="equipment-monitoring" refLabel="AoA Standards of Monitoring 2021" contextTitle="Alarm priority colours and tones (IEC 60601-1-8)" keyPoints={["High priority: red, rapid repeating tone — immediate threat to life.", "Medium priority: yellow, slower tone — prompt response required.", "Low priority: cyan, single/soft tone — advisory.", "Alarm limits must be set appropriately for each patient, not left at defaults or silenced."]} accentColor="hsl(0, 65%, 55%)" />
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">High airway pressure</p>
                <p className="text-xs text-muted-foreground mt-1">User-set upper limit exceeded — coughing/straining, kinked tube, bronchospasm, or breath-stacking.</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">Sustained airway pressure</p>
                <p className="text-xs text-muted-foreground mt-1">e.g. &gt;10 cmH₂O sustained for &gt;15 s — suggests expiratory-limb obstruction or a closed/stuck APL valve preventing exhalation.</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">Low tidal / minute volume</p>
                <p className="text-xs text-muted-foreground mt-1">Circuit leak or disconnection, cuff leak, patient effort mismatch, or ventilator fault.</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">High / low FiO₂</p>
                <p className="text-xs text-muted-foreground mt-1">Paramagnetic or galvanic fuel-cell analyser on the inspiratory limb; low-limit typically set 21–25% to detect a hypoxic mixture.</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">Reverse flow</p>
                <p className="text-xs text-muted-foreground mt-1">An incompetent expiratory valve or PEEP valve allows exhaled gas to flow the wrong way, causing rebreathing.</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">Apnoea alarm</p>
                <p className="text-xs text-muted-foreground mt-1">Absent capnography waveform or absent volume signal for a set interval (typically 15–20 s) — capnography is the more sensitive and specific trigger.</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              All limits require individualisation for the patient and case; a key human-factors hazard is
              <strong> alarm fatigue</strong> — repeated nuisance alarms leading staff to widen limits or silence alarms, risking
              a genuine event being missed
              <InlineRef topicId="equipment-monitoring" refLabel="NAP4 2011" />.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Association of Anaesthetists minimum monitoring standards</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {monitoringStandards.map((m) => (
                <div key={m.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="font-semibold text-foreground text-sm">{m.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Electrical safety</h3>
            <div className="grid gap-3 md:grid-cols-2 text-sm text-muted-foreground">
              <div className="rounded-lg border border-border p-3"><strong className="text-foreground">Shock pathways</strong><p className="mt-1"><strong>Macroshock</strong> passes through intact skin; harmful currents are in the milliampere range. <strong>Microshock</strong> reaches myocardium through an intracardiac conductor, so currents of only tens of microamperes may trigger VF. Keep invasive cardiac conductors isolated and use CF-rated applied parts.</p></div>
              <div className="rounded-lg border border-border p-3"><strong className="text-foreground">Equipment classes</strong><p className="mt-1">Class I uses protective earth; Class II uses double/reinforced insulation; Class III is supplied at safety extra-low voltage. Type B applied parts provide basic protection, BF are electrically floating, and CF have the greatest leakage-current protection for direct cardiac application.</p></div>
              <div className="rounded-lg border border-border p-3"><strong className="text-foreground">Supply protection</strong><p className="mt-1">Fuses and circuit breakers interrupt overcurrent. Theatre isolated-power systems use an isolation transformer so the first earth fault does not stop supply; a line-isolation monitor alarms falling impedance so the fault can be found before a second fault completes a dangerous circuit.</p></div>
              <div className="rounded-lg border border-border p-3"><strong className="text-foreground">Diathermy</strong><p className="mt-1">For monopolar surgery, place the return electrode on clean, dry, well-perfused muscle with full contact and a short current path that avoids metal implants, ECG electrodes and implanted devices. Bipolar current remains between forceps tips and avoids a remote return plate. Inspect insulation and never rely on the return plate as an electrical earth.</p></div>
            </div>
            <p className="mt-2 text-xs text-muted-foreground"><InlineRef topicId="equipment-monitoring" refLabel="IEC 60601 Electrical Safety" /></p>
          </div>
        </CollapsibleSubsection>

        {/* ───── 6. Airway Equipment ───── */}
        <CollapsibleSubsection title="6 · Airway Equipment">

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Laryngoscope blades</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Blade choice determines how the epiglottis is elevated and the glottis exposed. Curved (Macintosh) and straight
              (Miller) differ in tip placement and force vector. Modern variants (McCoy, polio handle, videolaryngoscopes)
              address scenarios where the standard Macintosh fails or is impractical.
            </p>
            {(() => {
              const bladeContext: Record<string, { title: string; color: string; keyPoints: string[] }> = {
                macintosh: {
                  title: "Macintosh — FRCA key points",
                  color: "hsl(210, 65%, 50%)",
                  keyPoints: [
                    "FRCA Primary — Equipment: identify the curved blade and describe sizing 1–4 by patient age/build.",
                    "Force vector 45° forward and upward along the handle; never lever on upper incisors.",
                    "Indirect epiglottic elevation via the hyoepiglottic ligament — vallecular pressure essential.",
                    "Default Plan A blade in DAS 2015 unanticipated difficult intubation algorithm for adults.",
                  ],
                },
                miller: {
                  title: "Miller — FRCA key points",
                  color: "hsl(140, 55%, 42%)",
                  keyPoints: [
                    "FRCA Primary — Paediatric sizing (0 = preterm, 1 = neonate/infant).",
                    "Direct epiglottic elevation — tip passes posterior to the floppy U-shaped epiglottis of neonates.",
                    "Narrower flange leaves less ETT-passage room; precise midline technique required.",
                    "Higher epiglottic trauma and laryngospasm risk if anaesthesia is light.",
                  ],
                },
                mccoy: {
                  title: "McCoy — FRCA key points",
                  color: "hsl(280, 50%, 55%)",
                  keyPoints: [
                    "Lever flexes the tip to improve view by ≥1 Cormack-Lehane grade.",
                    "Useful rescue blade for grade 2b/3a or with manual in-line stabilisation.",
                    "Less helpful when limiting factor is mouth opening rather than view.",
                  ],
                },
                polio: {
                  title: "Polio blade — FRCA key points",
                  color: "hsl(25, 75%, 50%)",
                  keyPoints: [
                    "Obtuse (~135°) handle-blade angle — historically iron-lung patients.",
                    "Niche indications: large breasts, morbid obesity, halo traction, kyphoscoliosis, body casts.",
                    "Largely superseded by short-handled Macintoshes and videolaryngoscopy.",
                  ],
                },
                wisconsin: {
                  title: "Wisconsin / Wis-Hipple — FRCA key points",
                  color: "hsl(195, 60%, 45%)",
                  keyPoints: [
                    "Wide-flange straight blade with better tongue control than Miller.",
                    "Wis-Hipple is the popular neonatal modification.",
                    "APAGBI/Weiss & Engelhardt: stock multiple blade types/sizes for the unexpected paediatric airway.",
                  ],
                },
                videolaryngoscope: {
                  title: "Videolaryngoscope — FRCA key points",
                  color: "hsl(0, 65%, 55%)",
                  keyPoints: [
                    "DAS 2015: VL is an alternative Plan A device and rescue tool — immediate availability mandated.",
                    "Mac-shaped (C-MAC, McGRATH) vs hyperangulated (GlideScope, X-blade — needs styletted ETT).",
                    "Channelled blades guide the tube along a built-in track; non-channelled devices require a stylet or bougie and independent tube delivery.",
                    "Video-screen devices permit indirect shared viewing; optical-only devices provide a single-eyepiece image without a camera screen.",
                    "Cochrane 2022: improves first-pass success and reduces failed intubation vs DL.",
                    "NAP4: most major airway events were unanticipated — VL improves view but \"can see, can't intubate\" remains a risk.",
                  ],
                },
              };
              const Cite = ({ blade, refLabel }: { blade: keyof typeof bladeContext; refLabel: string }) => {
                const ctx = bladeContext[blade];
                return (
                  <InlineRef
                    topicId="equipment-monitoring"
                    refLabel={refLabel}
                    contextTitle={ctx.title}
                    keyPoints={ctx.keyPoints}
                    accentColor={ctx.color}
                  />
                );
              };
              return (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg bg-secondary/30 border border-border p-3">
                      <p className="font-semibold text-foreground text-sm">Macintosh (Curved)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tip in vallecula → indirect epiglottic elevation via the hyoepiglottic ligament. Default adult blade.
                        <Cite blade="macintosh" refLabel="Macintosh 1943" />
                        <Cite blade="macintosh" refLabel="DAS 2015" />
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/30 border border-border p-3">
                      <p className="font-semibold text-foreground text-sm">Miller (Straight)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tip passes <em>under</em> the epiglottis. Preferred for neonates/infants and anterior larynx in adults.
                        <Cite blade="miller" refLabel="Miller 1941" />
                        <Cite blade="miller" refLabel="BJA Educ Paeds Airway 2017" />
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/30 border border-border p-3">
                      <p className="font-semibold text-foreground text-sm">McCoy (Articulated)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Hinged distal tip operated by a handle lever — improves view by ≥1 CL grade.
                        <Cite blade="mccoy" refLabel="McCoy & Mirakhur 1993" />
                        <Cite blade="mccoy" refLabel="Cormack & Lehane 1984" />
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/30 border border-border p-3">
                      <p className="font-semibold text-foreground text-sm">Polio Blade</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Mac-style blade at ~135° to the handle to clear chest/breasts/casts.
                        <Cite blade="polio" refLabel="DAS 2015" />
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/30 border border-border p-3">
                      <p className="font-semibold text-foreground text-sm">Wisconsin / Wis-Hipple</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Wide-flange straight blade — better tongue control and ETT room than Miller.
                        <Cite blade="wisconsin" refLabel="Weiss & Engelhardt 2010" />
                        <Cite blade="wisconsin" refLabel="BJA Educ Paeds Airway 2017" />
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/30 border border-border p-3">
                      <p className="font-semibold text-foreground text-sm">Videolaryngoscope</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Camera at the blade tip — Mac-shaped or hyperangulated. First-line for anticipated difficult airway.
                        <Cite blade="videolaryngoscope" refLabel="DAS 2015" />
                        <Cite blade="videolaryngoscope" refLabel="Cochrane VL 2022" />
                        <Cite blade="videolaryngoscope" refLabel="NAP4 2011" />
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic mt-2">
                    <strong>Pearl:</strong> A better view does not always mean an easier intubation — particularly with hyperangulated VL where ETT delivery requires a pre-shaped stylet.
                    <Cite blade="videolaryngoscope" refLabel="NAP4 2011" />
                  </p>
                  <div className="mt-3 overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-xs">
                      <thead className="bg-secondary/40"><tr><th className="p-2 text-left">Class</th><th className="p-2 text-left">Mechanics</th><th className="p-2 text-left">Main limitation</th></tr></thead>
                      <tbody>
                        <tr className="border-t border-border"><td className="p-2">Macintosh-shaped</td><td className="p-2">Direct or indirect view; conventional blade path and bougie technique.</td><td className="p-2">May not overcome a markedly anterior larynx.</td></tr>
                        <tr className="border-t border-border"><td className="p-2">Hyperangulated</td><td className="p-2">Looks around the tongue; ETT must match blade curvature with a rigid stylet.</td><td className="p-2">Excellent view may coexist with difficult tube delivery.</td></tr>
                        <tr className="border-t border-border"><td className="p-2">Channelled</td><td className="p-2">Built-in guide aligns and advances ETT toward the image.</td><td className="p-2">Bulkier; limited mouth opening and tube-size compatibility.</td></tr>
                        <tr className="border-t border-border"><td className="p-2">Optical-only</td><td className="p-2">Prism/lens image viewed through eyepiece rather than external screen.</td><td className="p-2">Team cannot share the view; fogging/secretions impair optics.</td></tr>
                      </tbody>
                    </table>
                  </div>
                </>
              );
            })()}
            <p className="text-[11px] text-muted-foreground mt-2">
              Tap any blade in the diagram below to open its <strong>FRCA Key Learning Points</strong> and source list.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 mt-3">
              <LaryngoscopeBladesDiagram />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Supraglottic airway devices and Aintree catheter</h3>
            <div className="grid gap-3 sm:grid-cols-3 text-sm">
              <div className="rounded-lg border border-border p-3"><p className="font-semibold text-foreground">First generation</p><p className="mt-1 text-muted-foreground">A single ventilation channel and perilaryngeal seal (classic LMA). Simple rescue oxygenation, but no gastric drainage and less protection from regurgitation.</p></div>
              <div className="rounded-lg border border-border p-3"><p className="font-semibold text-foreground">Second generation</p><p className="mt-1 text-muted-foreground">Higher oropharyngeal seal plus gastric drain and often bite block (i-gel, ProSeal, Supreme). Favoured for difficult-airway rescue and selected positive-pressure ventilation.</p></div>
              <div className="rounded-lg border border-border p-3"><p className="font-semibold text-foreground">Intubating devices</p><p className="mt-1 text-muted-foreground">Designed as a conduit for tracheal intubation. Some permit fibreoptic-guided passage; blind passage is less reliable and risks trauma.</p></div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Choose size by manufacturer guidance and confirm ventilation, capnography and leak pressure. Contraindications are relative
              and include active vomiting, major aspiration risk, severe restricted mouth opening, upper-airway obstruction below the
              glottis and poor compliance requiring pressures above the seal. A <strong>second-generation SAD</strong> is recommended for
              rescue oxygenation in difficult intubation <InlineRef topicId="equipment-monitoring" refLabel="BJA Educ SAD 2011" />.
              The <strong>Aintree Intubation Catheter</strong> can be passed over a bronchoscope through a compatible SAD; after SAD removal,
              a tracheal tube is railroaded over it. Its 15 mm connector allows oxygen insufflation, but only at low pressure with a patent
              route for expiration <InlineRef topicId="equipment-monitoring" refLabel="Aintree Catheter" />.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Neuraxial & regional needles</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Needle design profoundly affects tissue trauma, post-dural-puncture headache (PDPH) risk, and procedural feel.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Quincke (cutting)</p>
                <p className="text-xs text-muted-foreground mt-1">Sharp medium-bevel — cuts dural fibres → higher PDPH. Standard for diagnostic LP; 25–27G for spinal.</p>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border p-3 sm:col-span-2">
                <p className="font-semibold text-foreground text-sm">Depth estimation and localisation</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Epidural depth varies with body habitus and cannot be safely predicted by a single formula. Pre-procedure ultrasound can
                  identify midline, interspace and an estimated skin-to-epidural depth, but needle advancement remains controlled by loss
                  of resistance to saline. A Tuohy depth mark gives only an estimate; excessive insertion risks dural puncture. For spinal
                  anaesthesia, free CSF confirms intrathecal placement. Pencil-point needles reduce PDPH compared with cutting needles
                  <InlineRef topicId="equipment-monitoring" refLabel="Cochrane Spinal Needles" />.
                </p>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Whitacre (pencil-point)</p>
                <p className="text-xs text-muted-foreground mt-1">Conical tip with side port — spreads fibres → lower PDPH. Preferred for spinal anaesthesia (25G).</p>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Sprotte (pencil-point)</p>
                <p className="text-xs text-muted-foreground mt-1">Longer side aperture → faster CSF flow, more even LA spread.</p>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Tuohy (epidural)</p>
                <p className="text-xs text-muted-foreground mt-1">Curved Huber-type tip directs catheter laterally; reduces accidental dural puncture. 16–18G adult.</p>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Huber point (non-coring)</p>
                <p className="text-xs text-muted-foreground mt-1">Parts tissue rather than coring — essential for implanted port access.</p>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Stimulating needles</p>
                <p className="text-xs text-muted-foreground mt-1">Insulated shaft, exposed tip — short-bevel reduces nerve injury. Often combined with US guidance.</p>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 mt-3">
              <NeuraxialNeedlesDiagram />
            </div>
          </div>
        </CollapsibleSubsection>

        {/* ───── 7. Pre-Use Check ───── */}
        <CollapsibleSubsection title="7 · Standard Pre-Use Check (AoA / RCoA 2024 machine-safety guideline)">
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The joint Association of Anaesthetists / Royal College of Anaesthetists 2024 guideline
              <em> Anaesthesia, anaesthetic machines and patient safety</em>
              <InlineRef topicId="equipment-monitoring" refLabel="RCoA/AoA 2024 Machine Check" /> frames the pre-use check as one
              component of machine safety. A structured full check is mandatory at the <strong>start of every session</strong> and
              <strong> after any change to the equipment configuration</strong>, with an abbreviated breathing-system check between
              cases <InlineRef topicId="equipment-monitoring" refLabel="AAGBI Check 2023" />.
              Follow a logical "<strong>upstream-to-downstream</strong>" sequence — from gas supply, through the
              machine, to the breathing system and patient. A <strong>self-inflating bag</strong> must be immediately available
              and is itself checked. The completed checklist is <strong>recorded and signed</strong> for each machine, providing an
              auditable trail.
            </p>
            <p>
              Beyond the checklist, the 2024 guideline requires departments to address the machine as a system: procurement to current
              standards, standardised workstation layout to reduce human error, scheduled servicing and electrical-safety testing,
              alarm defaults that are restored rather than permanently silenced, a back-up oxygen supply and manual means of
              ventilation at every location where anaesthesia is given, and training so that every anaesthetist is competent with the
              specific machine model in use.
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li><strong>Self-test & power.</strong> Mains plugged in, battery back-up ≥30 min, electronic self-test completes uninterrupted.</li>
              <li><strong>Suction.</strong> Connected, switched on, vacuum ≥ −500 mmHg with tubing occluded; Yankauer to hand.</li>
              <li><strong>Pipelines.</strong> O₂, N₂O, Air on correct Schrader/NIST sockets; gauges read ~400 kPa.</li>
              <li><strong>Cylinders.</strong> Open each in turn; O₂ at least half full (~68 bar); confirm pin-index and no hiss.</li>
              <li><strong>Flowmeters.</strong> Sweep each through full range; bobbin rotates freely; anti-hypoxia link maintains ≥25% O₂.</li>
              <li><strong>O₂ failure alarm.</strong> Disconnect O₂ pipeline → Ritchie whistle sounds, N₂O cuts off, anti-hypoxia activates.</li>
              <li><strong>O₂ flush.</strong> Free flow 35–75 L/min without circuit pressure rise.</li>
              <li><strong>Vaporizers.</strong> Seated and locked, adequately filled, port closed; check for leaks at every dial setting.</li>
              <li><strong>Breathing system.</strong> Inspect for patency. <strong>Two-bag test</strong> — occlude with second bag, close APL, pressurise to ~30 cmH₂O — should hold. Confirm unidirectional valve movement.</li>
              <li><strong>Scavenging (AGSS).</strong> Connected, switched on, indicator shows adequate flow.</li>
              <li><strong>Ventilator.</strong> Set typical parameters and ventilate a test lung; bellows fill/empty; disconnect, high-pressure and low-VT alarms enabled and audible.</li>
              <li><strong>Monitoring.</strong> SpO₂, ECG, NIBP, capnography, FiO₂, agent, temperature switched on with appropriate alarm limits — never silenced.</li>
              <li><strong>Airway equipment.</strong> Facemasks, working laryngoscopes (DL + VL back-up), cuff-tested ETTs, SADs, bougie/stylet, Magills, and a self-inflating bag for emergency ventilation independent of the machine.</li>
              <li><strong>Documentation.</strong> Record check; attach "Machine Checked" label. Between cases: abbreviated check (two-bag test, vaporizer level, suction, monitoring).</li>
            </ol>
            <p className="text-sm italic">
              <strong>Mnemonic — "POWER on the MACHINE":</strong> <em>P</em>ower & self-test · <em>O</em>xygen supply &
              alarm · <em>W</em>aveform/monitoring · <em>E</em>mergency O₂ flush · <em>R</em>eservoir cylinders ·
              <em>M</em>achine flowmeters & vaporizers · <em>A</em>irway equipment · <em>C</em>ircuit (two-bag test) ·
              <em>H</em>oses & scavenging · <em>I</em>nduction drugs ready · <em>N</em>otes documented ·
              <em>E</em>mergency self-inflating bag.
            </p>
          </div>
        </CollapsibleSubsection>

        <SynthesisBlock
          title="Equipment & Monitoring — Safety-Critical Headlines"
          subtitle="The features tested across primary FRCA equipment vivas."
          variant="summary"
        >
          <ul className="space-y-2 list-disc list-inside text-sm">
            <li><strong>O₂ failure warning (Ritchie whistle)</strong>: triggers when O₂ pressure &lt;200 kPa; powered by residual O₂ itself — no battery.</li>
            <li><strong>O₂/N₂O ratio interlock (hypoxic guard)</strong>: prevents delivery of &lt;25% O₂.</li>
            <li><strong>Pin-index safety system (PISS)</strong>: prevents wrong cylinder; NIST/Schrader for pipelines.</li>
            <li><strong>Second-stage O₂ regulator</strong>: reduces pipeline/first-stage pressure to a constant ~200 kPa at the flowmeters, buffering flow against fluctuations in pipeline pressure and giving stable, reproducible flowmeter readings.</li>
            <li><strong>Oxygen flush valve</strong>: self-closing, non-locking; delivers 35–75 L/min of 100% O₂ at pipeline pressure, bypassing the flowmeters, vaporisers and back bar. Hazards: <em>barotrauma</em> if activated during inspiration with a closed APL valve or in a paediatric circle system, and <em>awareness</em> from dilution of volatile agent.</li>
            <li><strong>Pressure relief valves</strong>: a back-bar high-pressure relief valve opens at ~35–40 kPa to protect the machine and vaporisers from downstream obstruction; the <strong>APL/adjustable pressure-limiting valve</strong> vents excess circuit gas to scavenging.</li>
            <li><strong>Selectatec manifold interlock</strong>: extension rods and locking levers mean turning one vaporiser on mechanically prevents any adjacent vaporiser being switched on, preventing agent mixing/cross-contamination; an unlocked vaporiser leaks at the back bar.</li>
            <li><strong>Vaporizer safety</strong>: agent-specific keyed fillers, anti-spillage interlock, calibrated for SVP at 20 °C.</li>
            <li><strong>Ascending bellows</strong> + low-VT/disconnect alarms = primary disconnect protection.</li>
            <li><strong>Scavenging</strong>: active (preferred) or passive; safety valves limit pressure to ±0.5 cmH₂O.</li>
            <li><strong>Capnography</strong>: gold standard for tube confirmation, ventilation and disconnect — mandatory for transfer.</li>
            <li><strong>Pre-use check (Association of Anaesthetists 2023)</strong>: machine, breathing system, vaporiser, monitors, ventilator, suction, drugs, emergency equipment, self-inflating bag.</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2">
            <InlineRef topicId="equipment-monitoring" refLabel="AAGBI Standards 2015" contextTitle="Second-stage regulation, flush valve, relief valves and Selectatec interlock" keyPoints={["Second-stage regulator: constant ~200 kPa supply to flowmeters, independent of pipeline fluctuation.", "O₂ flush: 35–75 L/min, 100% O₂, bypasses vaporiser and flowmeters — barotrauma and awareness risks.", "Back-bar relief valve opens ~35–40 kPa; APL valve vents circuit gas to scavenging.", "Selectatec interlock: locking one vaporiser 'on' mechanically blocks any adjacent vaporiser."]} accentColor="hsl(140, 55%, 42%)" />
          </p>
        </SynthesisBlock>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Association of Anaesthetists 2023 machine check is a pre-list and start-of-day requirement — document it in the anaesthetic chart.",
              "Pin-Index Safety System prevents wrong cylinder mounting; NIST prevents wrong pipeline connection.",
              "Vaporiser safety: temperature-, flow- and pressure-compensated; agent-specific filler prevents cross-filling.",
              "Circle system economy depends on FGF, CO₂ absorber and unidirectional valves — sevoflurane + dry baralyme can produce Compound A.",
              "Minimum monitoring (Association of Anaesthetists): pulse oximetry, NIBP, ECG, capnography, FiO₂, agent and airway pressure — present from before induction until recovery.",
            ]}
          />
      </div>
      </ExamSection>
          <TopicFaqs faqs={equipmentMonitoringFaqs} />
        </>
      }
    />
  );
};

export default EquipmentMonitoringTopic;
