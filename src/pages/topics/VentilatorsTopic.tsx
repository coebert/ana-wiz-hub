import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import BagInBottleDiagram from "@/components/diagrams/BagInBottleDiagram";
import ManleyMVDDiagram from "@/components/diagrams/ManleyMVDDiagram";
import RitchieWhistleDiagram from "@/components/diagrams/RitchieWhistleDiagram";
import { ventilatorsQuiz } from "@/data/quizzes";

import manleyImg from "@/assets/ventilators/manley-mp3.jpg";
import nuffieldImg from "@/assets/ventilators/penlon-nuffield-200.jpg";
import birdImg from "@/assets/ventilators/bird-mark-7.jpg";
import oxylogImg from "@/assets/ventilators/drager-oxylog-3000.jpg";
import evitaImg from "@/assets/ventilators/drager-evita-v500.jpg";
import hamiltonImg from "@/assets/ventilators/hamilton-g5.jpg";
import servoImg from "@/assets/ventilators/maquet-servo-u.jpg";
import primaImg from "@/assets/ventilators/penlon-prima-sp.jpg";
import aisysImg from "@/assets/ventilators/ge-aisys-cs2.jpg";

const ventilatorTypes = [
  {
    category: "Classification by Power Source",
    items: [
      { name: "Gas-Powered (Pneumatic)", desc: "Driven entirely by compressed gas. No electricity required. Examples: Manley MP3, Penlon Nuffield 200, Oxylog 2000. Ideal for MRI suites, field use, and resource-limited settings." },
      { name: "Electrically-Powered", desc: "Use electric motors or solenoid valves to compress and deliver gas. Most modern ICU ventilators (e.g., Dräger Evita, Hamilton G5, Servo-U). Allow sophisticated modes, monitoring, and waveform display." },
      { name: "Combined (Pneumatic + Electronic)", desc: "Gas-powered driving mechanism with electronic control of timing and monitoring. Examples: Penlon Prima SP, Oxylog 3000+. Offer reliability of pneumatic drive with electronic precision." },
    ],
  },
  {
    category: "Classification by Mechanism",
    items: [
      { name: "Minute Volume Divider (MVD)", desc: "The fresh gas flow determines the minute volume. The ventilator simply divides the FGF into tidal volumes at a set rate. Example: Manley MP3. Tidal volume = FGF ÷ respiratory rate. Changing FGF changes VT." },
      { name: "Bag-in-Bottle (Double Circuit)", desc: "A bellows or bag inside a sealed chamber. Driving gas compresses the outer chamber, squeezing the inner bag to deliver the tidal volume. Examples: Penlon Nuffield 200 (with Newton valve), Ohmeda 7900. Ascending bellows are preferred as a disconnect is immediately visible." },
      { name: "Piston/Linear Motor", desc: "A piston directly compresses gas to deliver the tidal volume. Highly accurate volume delivery. Example: Dräger Apollo, GE Aisys. Independent of fresh gas flow." },
      { name: "Turbine-Driven", desc: "A high-speed turbine compresses ambient air. Can operate without a pipeline or cylinder supply. Examples: Hamilton T1 (transport), Dräger Oxylog VE300. Ideal for transport and disaster medicine." },
    ],
  },
  {
    category: "Classification by Cycling Mechanism",
    items: [
      { name: "Time-Cycled", desc: "Inspiration ends after a preset time (Ti). Used in pressure-controlled modes. Most modern ventilators in PCV mode." },
      { name: "Volume-Cycled", desc: "Inspiration ends when a preset volume has been delivered. Used in volume-controlled modes." },
      { name: "Pressure-Cycled", desc: "Inspiration ends when a preset airway pressure is reached. Example: Bird Mark 7. Tidal volume varies with compliance." },
      { name: "Flow-Cycled", desc: "Inspiration ends when inspiratory flow drops to a threshold (e.g., 25% of peak). Used in pressure support ventilation. Allows patient to influence Ti." },
    ],
  },
];

const historicVentilators = [
  {
    name: "Manley MP3",
    era: "1960s–1990s",
    type: "Minute Volume Divider",
    image: manleyImg,
    mechanism: "Purely pneumatic, gas-powered. The driving gas flow (= minute volume) is divided into breaths. Two concertina bellows alternate: one fills while the other delivers. A weight on the bellows determines inspiratory pressure.",
    features: [
      "No electricity required",
      "VT = FGF ÷ RR (changing FGF changes tidal volume)",
      "I:E ratio adjustable via flow controls",
      "Cannot deliver PEEP without modifications",
      "Still used in some developing countries and MRI suites",
    ],
  },
  {
    name: "Penlon Nuffield 200",
    era: "1980s–present",
    type: "Bag-in-Bottle / Time-Cycled",
    image: nuffieldImg,
    mechanism: "Gas-powered ventilator using a Newton non-rebreathing valve. Driving gas from a separate source inflates the bellows in the bottle. When driving gas is turned off, the bellows refill passively. Used with Mapleson D/E circuits in paediatric practice.",
    features: [
      "Extremely simple and reliable",
      "Widely used in paediatric anaesthesia",
      "Works with Mapleson D, E, or F circuits",
      "No electricity required — suitable for MRI",
      "Limited monitoring — no waveforms or alarms",
      "Newton valve prevents rebreathing",
    ],
  },
  {
    name: "Bird Mark 7",
    era: "1950s–1980s",
    type: "Pressure-Cycled",
    image: birdImg,
    mechanism: "Entirely pneumatic, pressure-cycled ventilator. Inspiration ends when a preset pressure is reached. No electricity. Originally designed as an IPPB device. Simple, robust, but tidal volume varies with patient compliance.",
    features: [
      "Pressure-cycled — inspiration ends at set pressure",
      "Tidal volume varies with compliance and resistance",
      "Sensitivity control for patient triggering",
      "Historical importance in the development of mechanical ventilation",
      "Largely replaced by modern volume/pressure-controlled ventilators",
    ],
  },
];

const modernVentilators = [
  {
    name: "Dräger Oxylog 3000+",
    setting: "Pre-hospital / Transport",
    type: "Turbine + Pneumatic",
    image: oxylogImg,
    features: [
      "Portable, battery-operated with optional gas supply",
      "Modes: VCV, PCV, PSV, SIMV, CPAP, BiLevel",
      "Built-in capnography and SpO₂",
      "AutoFlow — automatic pressure regulation to maintain set VT",
      "Rugged design for ambulance, helicopter, and field use",
    ],
  },
  {
    name: "Dräger Evita Infinity V500",
    setting: "Intensive Care",
    type: "Electronically Controlled",
    image: evitaImg,
    features: [
      "Full ICU ventilator with comprehensive modes including APRV, MMV",
      "SmartCare/PS — automated weaning protocol",
      "Advanced waveform monitoring, loops, and trend analysis",
      "Automatic tube compensation (ATC)",
      "Integrated nebuliser",
    ],
  },
  {
    name: "Hamilton G5 / C6",
    setting: "Intensive Care",
    type: "Turbine-Driven, Electronically Controlled",
    image: hamiltonImg,
    features: [
      "INTELLiVENT-ASV — closed-loop ventilation adjusting VT, rate, PEEP, and FiO₂",
      "Adaptive Support Ventilation (ASV) — automatically selects optimal VT/rate combination",
      "Built-in volumetric capnography",
      "P/V Tool for recruitment manoeuvres",
      "Can operate on room air via turbine (no pipeline needed)",
    ],
  },
  {
    name: "Maquet Servo-U",
    setting: "Intensive Care",
    type: "Electronically Controlled",
    image: servoImg,
    features: [
      "NAVA (Neurally Adjusted Ventilatory Assist) — uses diaphragmatic electrical activity",
      "Edi catheter integration for monitoring diaphragm function",
      "Comprehensive modes including PS, PCV, VCV, PRVC, SIMV",
      "Touchscreen interface with intuitive waveform display",
      "Neonatal to adult capability on single platform",
    ],
  },
  {
    name: "Penlon Prima SP",
    setting: "Anaesthesia (Operating Theatre)",
    type: "Pneumatic with Electronic Control",
    image: primaImg,
    features: [
      "Integrated into Penlon anaesthetic machines",
      "Bellows-in-bottle ascending bellows design",
      "VCV and PCV modes with PEEP",
      "Disconnect alarm — ascending bellows fail to rise on disconnect",
      "Compact and reliable for routine theatre use",
    ],
  },
  {
    name: "GE Aisys CS²",
    setting: "Anaesthesia (Operating Theatre)",
    type: "Piston-Driven, Electronically Controlled",
    image: aisysImg,
    features: [
      "Piston ventilator — accurate VT independent of FGF",
      "Advanced modes including PCV-VG (Pressure-Controlled Volume-Guaranteed)",
      "Electronic gas mixing and low-flow capability",
      "Integrated monitoring with waveforms and loops",
      "Fresh gas decoupling — FGF does not affect delivered VT",
    ],
  },
];

const VentilatorsTopic = () => {
  return (
    <SectionLayout title="Ventilators" subtitle="FRCA Primary / Final — Physics" backPath="/physics" backLabel="Physics" accentColor="text-physics">
      <section className="space-y-8 mb-10">
        {/* Introduction */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Ventilators are mechanical devices that provide artificial ventilation by generating a pressure gradient to move gas into the lungs. Understanding their classification, mechanisms, and clinical applications is essential for the FRCA examination and safe clinical practice. Ventilators range from simple pneumatic devices requiring no electricity to sophisticated microprocessor-controlled machines capable of closed-loop ventilation.
          </p>
        </div>

        {/* Classification */}
        {ventilatorTypes.map((cat) => (
          <div key={cat.category}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">{cat.category}</h2>
            <div className="space-y-3">
              {cat.items.map((item) => (
                <div key={item.name} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Bellows Direction */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ascending vs Descending Bellows</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            In bag-in-bottle ventilators, the bellows direction during expiration has important safety implications:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Ascending Bellows (Preferred)</p>
              <p className="text-sm text-muted-foreground">Bellows rise during expiration under the weight of exhaled gas. If a circuit disconnect occurs, the bellows <strong>collapse and fail to rise</strong>, providing an immediate visual alarm. Used in most modern anaesthetic machines.</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-2">Descending Bellows (Historical)</p>
              <p className="text-sm text-muted-foreground">Bellows fall during expiration under gravity. On disconnect, the bellows <strong>continue to move</strong> (drawing in room air), masking the disconnect. Dangerous — largely abandoned in modern practice.</p>
            </div>
          </div>
        </div>

        {/* Interactive Bag-in-Bottle Diagram */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bag-in-Bottle Mechanism</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Interactive diagram showing how an ascending bellows bag-in-bottle ventilator works during inspiration and expiration. Toggle between phases or let it auto-cycle.
          </p>
          <BagInBottleDiagram />
        </div>

        {/* Interactive Manley MVD Diagram */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Minute Volume Divider (Manley) Mechanism</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Manley uses two alternating concertina bellows. While one delivers gas to the patient under the weight on top, the other fills with fresh gas flow. The changeover valve switches when the delivering bellows empties.
          </p>
          <ManleyMVDDiagram />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fresh Gas Flow & Delivered Tidal Volume</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            In older ventilators (e.g., bag-in-bottle without fresh gas decoupling), FGF is added to the bellows during inspiration, so the delivered VT = set VT + (FGF × Ti). This means changing FGF changes the delivered tidal volume.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Modern piston ventilators and electronically controlled machines use <strong>fresh gas decoupling</strong> — a valve diverts FGF to the reservoir during inspiration, so the delivered VT is independent of FGF. The Manley MVD is the extreme case: the entire minute volume equals the FGF.
          </p>
        </div>

        {/* Historic Ventilators */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Historic & Classic Ventilators</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Knowledge of classic ventilators remains important for the FRCA exam and for understanding fundamental principles.
          </p>
          <div className="space-y-4">
            {historicVentilators.map((v) => (
              <div key={v.name} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img src={v.image} alt={v.name} loading="lazy" width={512} height={512} className="w-full sm:w-36 h-36 object-contain rounded-lg bg-white flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-bold text-foreground">{v.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{v.era}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{v.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{v.mechanism}</p>
                    <ul className="space-y-1">
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

        {/* Modern Ventilators */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Modern Ventilators</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Contemporary ventilators used in ICU, theatre, and transport settings.
          </p>
          <div className="space-y-4">
            {modernVentilators.map((v) => (
              <div key={v.name} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img src={v.image} alt={v.name} loading="lazy" width={512} height={512} className="w-full sm:w-36 h-36 object-contain rounded-lg bg-white flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-bold text-foreground">{v.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{v.setting}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{v.type}</span>
                    </div>
                    <ul className="space-y-1">
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

        {/* Safety Features */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Essential Safety Features</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Disconnect Alarm", value: "Low pressure / apnoea alarm — most critical" },
              { label: "High Pressure Alarm", value: "Prevents barotrauma; typically set at 40 cmH₂O" },
              { label: "Pressure Relief Valve", value: "Opens at ~60–80 cmH₂O to vent excess pressure" },
              { label: "Oxygen Failure Warning", value: "Audible alarm on O₂ supply failure" },
              { label: "Battery Backup", value: "Minimum 30 min operation on internal battery" },
              { label: "Spirometry", value: "Exhaled VT monitoring to confirm ventilation" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ritchie Whistle */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Ritchie Whistle (Oxygen Failure Warning)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Ritchie whistle is a purely pneumatic alarm device found on anaesthetic machines that warns of oxygen supply failure. It uses the <strong>Venturi (Bernoulli) principle</strong> — oxygen flowing through a constriction creates a low-pressure zone that draws ambient air across a reed or diaphragm, producing an audible whistle.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Critically, the whistle sounds <strong>continuously during normal operation</strong> (though typically at an inaudible ultrasonic frequency or diverted past the reed). When oxygen supply fails, flow stops, the Venturi effect ceases, and the whistle either changes pitch dramatically or activates a spring-loaded mechanism that produces a loud audible alarm lasting at least 7 seconds (as required by BS EN ISO 80601-2-13).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This is a <strong>fail-safe</strong> design — it requires no electricity or batteries and cannot be silenced as long as the oxygen pressure remains below the threshold. The alarm is powered entirely by the residual gas pressure in the system.
          </p>
          <RitchieWhistleDiagram />
        </div>
      </section>

      <KeyLearningPoints points={[
        "Ventilators are classified by power source (pneumatic vs electric), mechanism (MVD, bag-in-bottle, piston, turbine), and cycling (time, volume, pressure, flow)",
        "The Manley is a minute volume divider — VT = FGF ÷ RR; changing FGF changes tidal volume",
        "Ascending bellows are safer than descending: they collapse on disconnect, providing a visual alarm",
        "Fresh gas decoupling in modern ventilators ensures delivered VT is independent of FGF",
        "The Penlon Nuffield 200 is a gas-powered bag-in-bottle ventilator widely used in paediatric anaesthesia",
        "The Ritchie whistle uses the Venturi/Bernoulli principle — a fail-safe pneumatic O₂ failure alarm requiring no electricity",
        "Modern ICU ventilators (Hamilton G5, Servo-U) offer closed-loop modes like ASV and NAVA",
      ]} />

      <QuizSection questions={ventilatorsQuiz} />
      <TopicCompletionToggle topicId="ventilators" topicTitle="Ventilators" />
    </SectionLayout>
  );
};

export default VentilatorsTopic;
