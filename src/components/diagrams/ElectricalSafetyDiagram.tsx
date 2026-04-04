import { useState } from "react";

type Tab = "shock" | "equipment" | "diathermy" | "earthing" | "defibrillation";

const tabs: { key: Tab; label: string }[] = [
  { key: "shock", label: "Shock Thresholds" },
  { key: "equipment", label: "Equipment Classes" },
  { key: "diathermy", label: "Diathermy" },
  { key: "earthing", label: "Earthing & Protection" },
  { key: "defibrillation", label: "Defibrillation" },
];

const ShockThresholdsDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Macroshock vs Microshock Thresholds</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 420" className="w-full h-auto">
        <text x="300" y="25" textAnchor="middle" className="fill-foreground text-[14px] font-bold">Electrical Shock Thresholds (50 Hz AC)</text>

        {/* Macroshock column */}
        <rect x="30" y="45" width="260" height="30" rx="6" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="160" y="65" textAnchor="middle" className="fill-primary text-[12px] font-bold">MACROSHOCK (via skin)</text>

        {[
          { current: "1 mA", effect: "Perception (tingling)", y: 95, w: 30 },
          { current: "5 mA", effect: "Pain", y: 135, w: 60 },
          { current: "15 mA", effect: "Let-go threshold", y: 175, w: 100 },
          { current: "50 mA", effect: "Respiratory arrest", y: 215, w: 160 },
          { current: "100 mA", effect: "Ventricular fibrillation", y: 255, w: 220 },
          { current: ">5 A", effect: "Asystole & burns", y: 295, w: 260 },
        ].map((item, i) => (
          <g key={i}>
            <rect x="30" y={item.y} width={item.w} height="28" rx="4"
              fill={`hsl(var(--destructive)/${0.08 + i * 0.08})`}
              stroke="hsl(var(--destructive))" strokeWidth="1" />
            <text x="40" y={item.y + 18} className="fill-foreground text-[11px] font-bold">{item.current}</text>
            <text x={item.w + 45} y={item.y + 18} className="fill-muted-foreground text-[10px]">{item.effect}</text>
          </g>
        ))}

        {/* Microshock column */}
        <rect x="310" y="45" width="260" height="30" rx="6" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="440" y="65" textAnchor="middle" className="fill-destructive text-[12px] font-bold">MICROSHOCK (intracardiac)</text>

        <rect x="310" y="95" width="260" height="100" rx="8" fill="hsl(var(--destructive)/0.06)" stroke="hsl(var(--destructive)/0.3)" strokeWidth="1" />
        <text x="440" y="120" textAnchor="middle" className="fill-foreground text-[13px] font-bold">150 µA (0.15 mA)</text>
        <text x="440" y="140" textAnchor="middle" className="fill-destructive text-[11px] font-medium">→ Ventricular Fibrillation</text>
        <text x="440" y="162" textAnchor="middle" className="fill-muted-foreground text-[10px]">~1000× less than macroshock VF threshold</text>

        {/* Susceptible patient box */}
        <rect x="310" y="210" width="260" height="110" rx="8" fill="hsl(var(--accent)/0.08)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="440" y="232" textAnchor="middle" className="fill-foreground text-[11px] font-bold">Electrically Susceptible Patient</text>
        {[
          "• Central venous catheter",
          "• Pacing wire",
          "• Intracardiac catheter",
          "• Saline-filled CVP line (conductor)",
        ].map((t, i) => (
          <text key={i} x="325" y={252 + i * 16} className="fill-muted-foreground text-[10px]">{t}</text>
        ))}

        {/* Key difference */}
        <rect x="30" y="340" width="540" height="60" rx="8" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="300" y="362" textAnchor="middle" className="fill-foreground text-[11px] font-bold">Why the difference?</text>
        <text x="300" y="380" textAnchor="middle" className="fill-muted-foreground text-[10px]">Skin resistance (dry ~100 kΩ, wet ~1 kΩ) is the main protective barrier.</text>
        <text x="300" y="394" textAnchor="middle" className="fill-muted-foreground text-[10px]">Intracardiac routes bypass skin → all current delivered directly to myocardium → high current density.</text>
      </svg>
    </div>
  </div>
);

const EquipmentClassesDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Equipment Classification</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 440" className="w-full h-auto">
        <text x="300" y="25" textAnchor="middle" className="fill-foreground text-[14px] font-bold">Equipment Classes & Types</text>

        {/* Classes */}
        <text x="300" y="55" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Protection Classes (against electric shock)</text>

        {[
          { cls: "Class I", desc: "Earthed metal casing", detail: "Fault current → earth via green/yellow wire", color: "--primary", x: 30 },
          { cls: "Class II", desc: "Double insulated", detail: "No earth needed. Symbol: □ within □", color: "--accent", x: 215 },
          { cls: "Class III", desc: "Safety extra-low voltage", detail: "Powered by <24V AC supply", color: "--chart-3", x: 400 },
        ].map((item) => (
          <g key={item.cls}>
            <rect x={item.x} y="70" width="170" height="80" rx="8" fill={`hsl(var(${item.color})/0.1)`} stroke={`hsl(var(${item.color}))`} strokeWidth="1.5" />
            <text x={item.x + 85} y="92" textAnchor="middle" className="fill-foreground text-[12px] font-bold">{item.cls}</text>
            <text x={item.x + 85} y="110" textAnchor="middle" className="fill-foreground text-[10px] font-medium">{item.desc}</text>
            <text x={item.x + 85} y="128" textAnchor="middle" className="fill-muted-foreground text-[9px]">{item.detail}</text>
          </g>
        ))}

        {/* Applied part types */}
        <text x="300" y="180" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Applied Part Types (patient contact)</text>

        {[
          { type: "Type B", leak: "<100 µA", use: "Body contact", symbol: "B", color: "--primary", safe: "Normal fault: 500 µA" },
          { type: "Type BF", leak: "<100 µA", use: "Floating patient connection", symbol: "BF", color: "--accent", safe: "Isolated from earth" },
          { type: "Type CF", leak: "<10 µA", use: "Cardiac (intracardiac)", symbol: "CF", color: "--destructive", safe: "Required for pacing wires" },
        ].map((item, i) => (
          <g key={item.type}>
            <rect x="30" y={200 + i * 70} width="540" height="58" rx="8" fill={`hsl(var(${item.color})/0.06)`} stroke={`hsl(var(${item.color}))`} strokeWidth="1.5" />
            <rect x="45" y={207 + i * 70} width="44" height="44" rx="22" fill={`hsl(var(${item.color})/0.15)`} stroke={`hsl(var(${item.color}))`} strokeWidth="1.5" />
            <text x="67" y={234 + i * 70} textAnchor="middle" className="fill-foreground text-[11px] font-bold">{item.symbol}</text>
            <text x="110" y={224 + i * 70} className="fill-foreground text-[11px] font-bold">{item.type}</text>
            <text x="110" y={240 + i * 70} className="fill-muted-foreground text-[10px]">{item.use} — Max leakage: {item.leak}</text>
            <text x="110" y={254 + i * 70} className="fill-muted-foreground text-[9px]">{item.safe}</text>
          </g>
        ))}

        <rect x="30" y="415" width="540" height="20" rx="4" fill="hsl(var(--destructive)/0.08)" />
        <text x="300" y="429" textAnchor="middle" className="fill-destructive text-[10px] font-medium">Key: Type CF equipment MUST be used for any intracardiac connection (pacing wires, PA catheters)</text>
      </svg>
    </div>
  </div>
);

const DiathermyDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Surgical Diathermy</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 480" className="w-full h-auto">
        <text x="300" y="25" textAnchor="middle" className="fill-foreground text-[14px] font-bold">Monopolar vs Bipolar Diathermy</text>
        <text x="300" y="42" textAnchor="middle" className="fill-muted-foreground text-[10px]">High-frequency AC (0.4–3 MHz) — does not stimulate neuromuscular tissue</text>

        {/* Monopolar */}
        <rect x="20" y="55" width="270" height="200" rx="10" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="155" y="78" textAnchor="middle" className="fill-primary text-[12px] font-bold">MONOPOLAR</text>

        {/* Active electrode */}
        <rect x="130" y="90" width="50" height="8" rx="2" fill="hsl(var(--primary))" />
        <text x="155" y="86" textAnchor="middle" className="fill-primary text-[9px] font-medium">Active electrode</text>
        <text x="155" y="112" textAnchor="middle" className="fill-muted-foreground text-[8px]">Small area → high current density</text>

        {/* Patient body */}
        <ellipse cx="155" cy="150" rx="60" ry="35" fill="hsl(var(--muted))" stroke="hsl(var(--foreground)/0.3)" strokeWidth="1" />
        <text x="155" y="153" textAnchor="middle" className="fill-foreground text-[9px]">Patient</text>

        {/* Return plate */}
        <rect x="100" y="200" width="110" height="12" rx="3" fill="hsl(var(--accent))" />
        <text x="155" y="228" textAnchor="middle" className="fill-accent text-[9px] font-medium">Return plate</text>
        <text x="155" y="242" textAnchor="middle" className="fill-muted-foreground text-[8px]">Large area → low current density</text>

        {/* Current path arrows */}
        <line x1="155" y1="98" x2="155" y2="115" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arrowP)" />
        <line x1="155" y1="185" x2="155" y2="200" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arrowP)" />

        {/* Bipolar */}
        <rect x="310" y="55" width="270" height="200" rx="10" fill="hsl(var(--accent)/0.06)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="445" y="78" textAnchor="middle" className="fill-accent text-[12px] font-bold">BIPOLAR</text>

        {/* Forceps */}
        <line x1="420" y1="90" x2="435" y2="140" stroke="hsl(var(--accent))" strokeWidth="2.5" />
        <line x1="470" y1="90" x2="455" y2="140" stroke="hsl(var(--accent))" strokeWidth="2.5" />
        <circle cx="445" cy="145" r="8" fill="hsl(var(--muted))" stroke="hsl(var(--foreground)/0.3)" strokeWidth="1" />
        <text x="445" y="100" textAnchor="middle" className="fill-accent text-[9px] font-medium">Bipolar forceps</text>

        <text x="445" y="175" textAnchor="middle" className="fill-muted-foreground text-[9px]">Current flows between tips only</text>
        <text x="445" y="190" textAnchor="middle" className="fill-muted-foreground text-[9px]">No return plate needed</text>
        <text x="445" y="210" textAnchor="middle" className="fill-accent text-[9px] font-medium">✓ Safer near pacemakers</text>
        <text x="445" y="225" textAnchor="middle" className="fill-accent text-[9px] font-medium">✓ Less tissue damage</text>
        <text x="445" y="240" textAnchor="middle" className="fill-muted-foreground text-[9px]">× Less powerful cutting</text>

        {/* Hazards */}
        <text x="300" y="280" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Diathermy Hazards</text>

        {[
          { hazard: "Return plate burns", desc: "Poor contact → small area → high current density → burn", icon: "🔥" },
          { hazard: "Channelling effect", desc: "Current concentrated at narrow points (e.g. digits, penis)", icon: "⚡" },
          { hazard: "Capacitative coupling", desc: "Charge transfer through insulation during laparoscopy", icon: "🔌" },
          { hazard: "Direct coupling", desc: "Active electrode touches another instrument", icon: "⚠️" },
          { hazard: "Pacemaker interference", desc: "Monopolar current disrupts pacing/sensing", icon: "💓" },
          { hazard: "Fire risk", desc: "Ignition of alcohol prep, bowel gas, or O₂-enriched atmosphere", icon: "🔥" },
        ].map((item, i) => (
          <g key={i}>
            <text x="40" y={303 + i * 25} className="fill-foreground text-[10px]">{item.icon}</text>
            <text x="60" y={303 + i * 25} className="fill-foreground text-[10px] font-medium">{item.hazard}</text>
            <text x="220" y={303 + i * 25} className="fill-muted-foreground text-[9.5px]">{item.desc}</text>
          </g>
        ))}

        {/* Cutting vs coagulation */}
        <rect x="30" y="455" width="540" height="20" rx="4" fill="hsl(var(--primary)/0.08)" />
        <text x="300" y="469" textAnchor="middle" className="fill-foreground text-[10px] font-medium">Cut: continuous sine wave (high temp) | Coag: interrupted bursts (lower temp, wider spread) | Blend: mixed</text>

        <defs>
          <marker id="arrowP" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="hsl(var(--primary))" />
          </marker>
        </defs>
      </svg>
    </div>
  </div>
);

const EarthingProtectionDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Earthing & Safety Mechanisms</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 420" className="w-full h-auto">
        <text x="300" y="25" textAnchor="middle" className="fill-foreground text-[14px] font-bold">Electrical Protection Systems</text>

        {/* Fuses & Circuit breakers */}
        <rect x="20" y="45" width="270" height="120" rx="8" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="155" y="68" textAnchor="middle" className="fill-primary text-[11px] font-bold">Fuses & Circuit Breakers</text>
        {[
          "• Fuse: wire melts at preset current",
          "• Protects equipment, NOT the patient",
          "• Trips at ~13A (mains) — too slow",
          "  for electrocution (VF at 100 mA)",
        ].map((t, i) => (
          <text key={i} x="35" y={88 + i * 16} className="fill-muted-foreground text-[10px]">{t}</text>
        ))}

        {/* RCD */}
        <rect x="310" y="45" width="270" height="120" rx="8" fill="hsl(var(--accent)/0.06)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="445" y="68" textAnchor="middle" className="fill-accent text-[11px] font-bold">RCD (Residual Current Device)</text>
        {[
          "• Detects imbalance between live & neutral",
          "• Trips at ~30 mA in <30 ms",
          "• Protects against macroshock",
          "• Does NOT protect against microshock",
        ].map((t, i) => (
          <text key={i} x="325" y={88 + i * 16} className="fill-muted-foreground text-[10px]">{t}</text>
        ))}

        {/* Isolated power supply */}
        <rect x="20" y="180" width="560" height="100" rx="8" fill="hsl(var(--chart-3)/0.06)" stroke="hsl(var(--chart-3))" strokeWidth="1.5" />
        <text x="300" y="203" textAnchor="middle" className="fill-foreground text-[11px] font-bold">Isolated Power Supply (Floating)</text>
        
        <text x="300" y="222" textAnchor="middle" className="fill-muted-foreground text-[10px]">Isolation transformer separates theatre supply from mains earth</text>

        {/* Transformer diagram */}
        <rect x="180" y="232" width="60" height="35" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--foreground)/0.3)" strokeWidth="1" />
        <text x="210" y="253" textAnchor="middle" className="fill-foreground text-[8px]">Primary</text>
        <rect x="260" y="232" width="10" height="35" rx="2" fill="hsl(var(--foreground)/0.2)" />
        <rect x="280" y="232" width="60" height="35" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--foreground)/0.3)" strokeWidth="1" />
        <text x="310" y="253" textAnchor="middle" className="fill-foreground text-[8px]">Secondary</text>

        <text x="440" y="245" className="fill-muted-foreground text-[9px]">Neither output wire is earthed</text>
        <text x="440" y="258" className="fill-muted-foreground text-[9px]">→ touching one wire = no circuit</text>
        <text x="440" y="271" className="fill-muted-foreground text-[9px]">→ first fault protection</text>

        {/* Line isolation monitor */}
        <rect x="20" y="295" width="560" height="55" rx="8" fill="hsl(var(--destructive)/0.06)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="300" y="318" textAnchor="middle" className="fill-destructive text-[11px] font-bold">Line Isolation Monitor (LIM)</text>
        <text x="300" y="336" textAnchor="middle" className="fill-muted-foreground text-[10px]">Continuously monitors isolation of floating supply. Alarms if leakage exceeds ~2–5 mA (first fault detected).</text>

        {/* Summary */}
        <rect x="20" y="365" width="560" height="50" rx="8" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="300" y="385" textAnchor="middle" className="fill-foreground text-[10px] font-bold">Protection Hierarchy</text>
        <text x="300" y="400" textAnchor="middle" className="fill-muted-foreground text-[10px]">
          Isolated supply (first fault) → LIM alarm → RCD (macroshock) → Fuse (equipment) → Type CF (microshock)
        </text>
      </svg>
    </div>
  </div>
);

const ElectricalSafetyDiagram = () => {
  const [activeTab, setActiveTab] = useState<Tab>("shock");

  return (
    <div className="my-8">
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "shock" && <ShockThresholdsDiagram />}
      {activeTab === "equipment" && <EquipmentClassesDiagram />}
      {activeTab === "diathermy" && <DiathermyDiagram />}
      {activeTab === "earthing" && <EarthingProtectionDiagram />}
    </div>
  );
};

export default ElectricalSafetyDiagram;
