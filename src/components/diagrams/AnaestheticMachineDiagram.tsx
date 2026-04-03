import { useState } from "react";

type Tab = "pipeline" | "cylinders" | "regulators" | "flowmeters" | "safety";

const tabs: { key: Tab; label: string }[] = [
  { key: "pipeline", label: "Pipeline Supply" },
  { key: "cylinders", label: "Cylinder Storage" },
  { key: "regulators", label: "Pressure Regulators" },
  { key: "flowmeters", label: "Flowmeters" },
  { key: "safety", label: "Safety Features" },
];

const PipelineSupplyDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Medical Gas Pipeline System (MGPS)</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 340" className="w-full h-auto">
        {/* VIE / Manifold */}
        <rect x="20" y="20" width="120" height="60" rx="8" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="80" y="45" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">VIE / Manifold</text>
        <text x="80" y="60" textAnchor="middle" className="fill-muted-foreground text-[9px]">Liquid O₂ at −183°C</text>

        {/* Pipeline */}
        <line x1="140" y1="50" x2="250" y2="50" stroke="hsl(var(--primary))" strokeWidth="3" />
        <text x="195" y="40" textAnchor="middle" className="fill-muted-foreground text-[9px]">400 kPa pipeline</text>

        {/* Terminal unit */}
        <rect x="250" y="20" width="130" height="60" rx="8" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent))" strokeWidth="2" />
        <text x="315" y="42" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Terminal Unit</text>
        <text x="315" y="58" textAnchor="middle" className="fill-muted-foreground text-[9px]">Schrader / NIST probe</text>

        {/* To machine */}
        <line x1="380" y1="50" x2="480" y2="50" stroke="hsl(var(--primary))" strokeWidth="3" />
        <rect x="480" y="20" width="100" height="60" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="530" y="45" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Machine</text>
        <text x="530" y="60" textAnchor="middle" className="fill-muted-foreground text-[9px]">4 bar inlet</text>

        {/* Gas colours */}
        <text x="20" y="120" className="fill-foreground text-[12px] font-semibold">Pipeline Colour Coding (UK)</text>
        {[
          { gas: "O₂", colour: "#FFFFFF", border: "#000", text: "White", textFill: "#000" },
          { gas: "N₂O", colour: "#1E90FF", border: "#1E90FF", text: "Blue", textFill: "#fff" },
          { gas: "Air", colour: "#000", border: "#fff", text: "Black/White", textFill: "#fff" },
          { gas: "Vacuum", colour: "#FFD700", border: "#FFD700", text: "Yellow", textFill: "#000" },
        ].map((g, i) => (
          <g key={g.gas}>
            <rect x={20 + i * 145} y={135} width="130" height="40" rx="6" fill={g.colour} stroke={g.border} strokeWidth="2" />
            <text x={85 + i * 145} y={155} textAnchor="middle" fill={g.textFill} className="text-[11px] font-semibold">{g.gas} — {g.text}</text>
          </g>
        ))}

        {/* Pressure info */}
        <text x="20" y="210" className="fill-foreground text-[12px] font-semibold">Key Pressures</text>
        {[
          "Pipeline supply: 400 kPa (4 bar / 60 psi)",
          "VIE stores liquid O₂ at −183°C, 10–12 bar",
          "Manifold: automatic changeover between cylinder banks",
          "NIST (Non-Interchangeable Screw Thread) prevents cross-connection",
        ].map((t, i) => (
          <text key={i} x="30" y={230 + i * 20} className="fill-muted-foreground text-[10px]">• {t}</text>
        ))}
      </svg>
    </div>
  </div>
);

const CylinderStorageDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Cylinder Gas Storage</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 380" className="w-full h-auto">
        {/* Cylinder shapes */}
        {[
          { x: 40, gas: "O₂", colour: "#000", valveCol: "#fff", shoulder: "White", size: "E", pressure: "137 bar", litres: "680 L", fill: "#222" },
          { x: 170, gas: "N₂O", colour: "#1E90FF", valveCol: "#fff", shoulder: "Blue", size: "E", pressure: "44 bar", litres: "1800 L", fill: "#1E90FF" },
          { x: 300, gas: "Air", colour: "#808080", valveCol: "#fff", shoulder: "Grey/Black", size: "E", pressure: "137 bar", litres: "680 L", fill: "#666" },
          { x: 430, gas: "CO₂", colour: "#808080", valveCol: "#fff", shoulder: "Grey", size: "E", pressure: "50 bar", litres: "450 L", fill: "#888" },
        ].map((c) => (
          <g key={c.gas}>
            {/* Body */}
            <rect x={c.x} y={60} width="80" height="140" rx="10" fill={c.fill} stroke="hsl(var(--border))" strokeWidth="1.5" opacity="0.8" />
            {/* Shoulder */}
            <rect x={c.x} y={60} width="80" height="35" rx="10" fill={c.colour} stroke="hsl(var(--border))" strokeWidth="1.5" opacity="0.9" />
            {/* Valve */}
            <rect x={c.x + 30} y={40} width="20" height="25" rx="3" fill={c.valveCol} stroke="hsl(var(--border))" strokeWidth="1" />
            <text x={c.x + 40} y={90} textAnchor="middle" fill="#fff" className="text-[13px] font-bold">{c.gas}</text>
            <text x={c.x + 40} y={150} textAnchor="middle" fill="#fff" className="text-[9px]">{c.pressure}</text>
            <text x={c.x + 40} y={165} textAnchor="middle" fill="#fff" className="text-[9px]">{c.litres}</text>
            <text x={c.x + 40} y={220} textAnchor="middle" className="fill-muted-foreground text-[10px] font-medium">{c.shoulder}</text>
            <text x={c.x + 40} y={235} textAnchor="middle" className="fill-muted-foreground text-[9px]">Size {c.size}</text>
          </g>
        ))}

        {/* Key facts */}
        <text x="20" y="270" className="fill-foreground text-[12px] font-semibold">Key Principles</text>
        {[
          "O₂: ideal gas → pressure ∝ contents (gauge indicates remaining volume)",
          "N₂O: stored as liquid → pressure constant (44 bar) until liquid exhausted → then falls rapidly",
          "N₂O filling ratio: 0.75 (UK) / 0.67 (tropics) to prevent hydraulic rupture",
          "Pin Index System: unique pin positions prevent wrong cylinder attachment",
          "O₂ pins: 2-5, N₂O pins: 3-5, Air pins: 1-5",
        ].map((t, i) => (
          <text key={i} x="30" y={290 + i * 18} className="fill-muted-foreground text-[10px]">• {t}</text>
        ))}
      </svg>
    </div>
  </div>
);

const PressureRegulatorsDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Pressure Regulators (Reducing Valves)</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 350" className="w-full h-auto">
        {/* Regulator schematic */}
        <rect x="40" y="30" width="520" height="180" rx="12" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--border))" strokeWidth="1.5" />

        {/* High pressure side */}
        <rect x="60" y="60" width="120" height="60" rx="8" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="2" />
        <text x="120" y="85" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">High Pressure</text>
        <text x="120" y="102" textAnchor="middle" className="fill-muted-foreground text-[9px]">137 bar (cylinder)</text>

        {/* Arrow */}
        <line x1="180" y1="90" x2="240" y2="90" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Regulator body */}
        <rect x="240" y="50" width="140" height="80" rx="10" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="310" y="78" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Regulator</text>
        <text x="310" y="95" textAnchor="middle" className="fill-muted-foreground text-[9px]">Diaphragm + spring</text>
        <text x="310" y="110" textAnchor="middle" className="fill-muted-foreground text-[9px]">2-stage preferred</text>

        {/* Arrow */}
        <line x1="380" y1="90" x2="430" y2="90" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* Low pressure side */}
        <rect x="430" y="60" width="120" height="60" rx="8" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent))" strokeWidth="2" />
        <text x="490" y="85" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Low Pressure</text>
        <text x="490" y="102" textAnchor="middle" className="fill-muted-foreground text-[9px]">~400 kPa output</text>

        {/* Components */}
        <text x="310" y="150" textAnchor="middle" className="fill-foreground text-[10px]">Spring tension sets outlet pressure</text>
        <text x="310" y="167" textAnchor="middle" className="fill-muted-foreground text-[9px]">Diaphragm balances high-pressure gas vs spring force</text>
        <text x="310" y="184" textAnchor="middle" className="fill-muted-foreground text-[9px]">Outlet pressure falls slightly as cylinder empties</text>
        <text x="310" y="198" textAnchor="middle" className="fill-muted-foreground text-[9px]">(effect of supply pressure = "seat effect")</text>

        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
          </marker>
        </defs>

        {/* Key points */}
        <text x="20" y="240" className="fill-foreground text-[12px] font-semibold">Key Points</text>
        {[
          "Two-stage regulators provide more stable output and minimise the 'seat effect'",
          "Adiabatic cooling occurs during gas expansion → risk of freezing if moisture present",
          "Relief valve opens at ~700 kPa to protect downstream components",
          "Pipeline gas arrives pre-regulated at 400 kPa (no further reduction needed)",
          "The regulator ensures constant downstream pressure despite falling cylinder pressure",
        ].map((t, i) => (
          <text key={i} x="30" y={260 + i * 18} className="fill-muted-foreground text-[10px]">• {t}</text>
        ))}
      </svg>
    </div>
  </div>
);

const FlowmetersDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Flowmeters (Rotameters)</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 400" className="w-full h-auto">
        {/* Rotameter tube */}
        <text x="120" y="25" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Variable Orifice Flowmeter</text>

        {/* Tapered tube */}
        <polygon points="80,350 70,50 170,50 160,350" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* Bobbin */}
        <ellipse cx="120" cy="200" rx="25" ry="8" fill="hsl(var(--primary)/0.6)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="120" y="204" textAnchor="middle" fill="#fff" className="text-[8px] font-bold">Bobbin</text>

        {/* Flow arrows */}
        {[280, 240, 200, 160, 120].map((y, i) => (
          <g key={i}>
            <line x1="90" y1={y + 30} x2="90" y2={y} stroke="hsl(var(--accent))" strokeWidth="1.5" opacity={0.4 + i * 0.15} />
            <polygon points={`85,${y} 90,${y - 8} 95,${y}`} fill="hsl(var(--accent))" opacity={0.4 + i * 0.15} />
          </g>
        ))}

        {/* Labels */}
        <text x="120" y="370" textAnchor="middle" className="fill-muted-foreground text-[9px]">Gas inlet (bottom)</text>
        <text x="120" y="40" textAnchor="middle" className="fill-muted-foreground text-[9px]">Gas outlet (top)</text>

        {/* Annotations */}
        <line x1="160" y1="200" x2="220" y2="200" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4" />
        <text x="225" y="195" className="fill-foreground text-[10px] font-medium">Read at top of bobbin</text>
        <text x="225" y="210" className="fill-muted-foreground text-[9px]">(or centre of ball float)</text>

        {/* Physics */}
        <text x="300" y="50" className="fill-foreground text-[12px] font-semibold">Physics Principles</text>
        <rect x="280" y="60" width="290" height="120" rx="8" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--border))" strokeWidth="1" />
        {[
          "Constant pressure drop across bobbin",
          "Variable annular orifice (tapered tube)",
          "Low flow: narrow annulus → laminar flow",
          "  → depends on viscosity (Hagen-Poiseuille)",
          "High flow: wide annulus → turbulent flow",
          "  → depends on density",
        ].map((t, i) => (
          <text key={i} x="295" y={82 + i * 16} className="fill-muted-foreground text-[10px]">{t}</text>
        ))}

        {/* Sequence */}
        <text x="300" y="210" className="fill-foreground text-[12px] font-semibold">Flowmeter Sequence</text>
        {[
          "O₂ must be DOWNSTREAM (nearest patient outlet)",
          "Prevents hypoxic mixture if upstream tube cracks",
          "Anti-hypoxia device: mechanical link ensures",
          "  minimum 25% O₂ when N₂O is turned on",
          "Needle valve controls flow; fine thread for accuracy",
        ].map((t, i) => (
          <text key={i} x="310" y={230 + i * 18} className="fill-muted-foreground text-[10px]">• {t}</text>
        ))}

        {/* Calibration note */}
        <text x="300" y="330" className="fill-foreground text-[11px] font-semibold">⚠ Calibration</text>
        <text x="310" y="348" className="fill-muted-foreground text-[10px]">Each rotameter is calibrated for a specific gas</text>
        <text x="310" y="364" className="fill-muted-foreground text-[10px]">(viscosity + density) — NOT interchangeable</text>
      </svg>
    </div>
  </div>
);

const SafetyFeaturesDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Safety Features of the Anaesthetic Machine</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 480" className="w-full h-auto">
        {/* Machine block diagram */}
        <rect x="150" y="20" width="300" height="60" rx="10" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="300" y="50" textAnchor="middle" className="fill-foreground text-[14px] font-bold">Anaesthetic Machine</text>
        <text x="300" y="68" textAnchor="middle" className="fill-muted-foreground text-[9px]">Gas supply → Flowmeters → Vaporizer → Common gas outlet</text>

        {/* Safety features grid */}
        {[
          { title: "O₂ Failure Alarm", desc: "Audible alarm (Ritchie whistle) when O₂\nsupply falls below ~200 kPa. Pressure-\npowered — no battery needed.", y: 100, colour: "destructive" },
          { title: "O₂ Flush", desc: "Delivers 35–75 L/min pure O₂ at pipeline\npressure. Bypasses vaporizers & flowmeters.\nRisk: barotrauma, awareness.", y: 100, colour: "primary" },
          { title: "Anti-Hypoxia Device", desc: "Mechanical/pneumatic link between O₂ and\nN₂O flowmeters. Ensures minimum 25% O₂.\nCuts N₂O if O₂ supply fails.", y: 230, colour: "accent" },
          { title: "Pin Index / NIST", desc: "Pin Index: cylinder yoke (prevents wrong\ncylinder). NIST/Schrader: pipeline (prevents\ncross-connection of gas supplies).", y: 230, colour: "primary" },
          { title: "Pressure Relief Valve", desc: "Opens at ~35 kPa on back bar to prevent\nbarotrauma from vaporizer/circuit\noverpressure.", y: 360, colour: "destructive" },
          { title: "O₂ Analyser", desc: "Paramagnetic or fuel cell analyser on\ninspiratory limb. Mandatory continuous\nFiO₂ monitoring. Low O₂ alarm.", y: 360, colour: "accent" },
        ].map((f, i) => {
          const x = i % 2 === 0 ? 20 : 310;
          return (
            <g key={f.title}>
              <rect x={x} y={f.y} width="270" height="110" rx="8" fill={`hsl(var(--${f.colour})/0.08)`} stroke={`hsl(var(--${f.colour}))`} strokeWidth="1.5" />
              <text x={x + 135} y={f.y + 22} textAnchor="middle" className="fill-foreground text-[11px] font-bold">{f.title}</text>
              {f.desc.split("\n").map((line, li) => (
                <text key={li} x={x + 15} y={f.y + 42 + li * 16} className="fill-muted-foreground text-[9.5px]">{line}</text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>

    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <h5 className="font-semibold text-foreground mb-2">Pre-Use Check (AAGBI 2012)</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
        {[
          "Check pipeline connections and cylinder backup",
          "Perform tug test on all pipeline connections",
          "Test O₂ failure alarm by disconnecting O₂",
          "Calibrate O₂ analyser to air (21%) and O₂ (100%)",
          "Check flowmeters move freely through full range",
          "Verify vaporizers filled, seated, and locked",
          "Check breathing system for leaks (occlude + APL)",
          "Test ventilator, suction, and scavenging",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-primary font-bold">{i + 1}.</span>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AnaestheticMachineDiagram = () => {
  const [activeTab, setActiveTab] = useState<Tab>("pipeline");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "pipeline" && <PipelineSupplyDiagram />}
      {activeTab === "cylinders" && <CylinderStorageDiagram />}
      {activeTab === "regulators" && <PressureRegulatorsDiagram />}
      {activeTab === "flowmeters" && <FlowmetersDiagram />}
      {activeTab === "safety" && <SafetyFeaturesDiagram />}
    </div>
  );
};

export default AnaestheticMachineDiagram;
