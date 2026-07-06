import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Tab = "overview" | "pipeline" | "cylinders" | "regulators" | "flowmeters" | "safety";

const tabs: { key: Tab; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "pipeline", label: "Pipeline Supply" },
  { key: "cylinders", label: "Cylinders" },
  { key: "regulators", label: "Regulators" },
  { key: "flowmeters", label: "Flowmeters" },
  { key: "safety", label: "Safety" },
];

/* ═══════ NEW: Complete Gas Pathway Overview ═══════ */
const OverviewDiagram = () => {
  const [highlight, setHighlight] = useState<string | null>(null);

  const stages = [
    { id: "supply", label: "Gas Supply", x: 20, w: 100, color: "#3B82F6",
      detail: "Pipeline (400 kPa via NIST/Schrader) or cylinders (137 bar O₂, 44 bar N₂O) via Pin Index System. Pipeline is primary; cylinders are backup." },
    { id: "check", label: "Check Valves", x: 130, w: 60, color: "#6366F1",
      detail: "One-way valves prevent backflow between pipeline and cylinder supplies. Pipeline pressure (400 kPa) normally shuts cylinder supply valve." },
    { id: "regulator", label: "Pressure\nRegulators", x: 200, w: 80, color: "#8B5CF6",
      detail: "Reduce cylinder pressure (137→400 kPa) to match pipeline. Two-stage preferred for stability. Seat effect: outlet pressure drops as supply depletes." },
    { id: "flowmeter", label: "Flowmeters\n(Rotameters)", x: 290, w: 80, color: "#10B981",
      detail: "Variable orifice, constant pressure drop. Bobbin/ball float in tapered tube. Low flow → viscosity-dependent (Poiseuille); high flow → density-dependent. O₂ rotameter DOWNSTREAM (nearest outlet)." },
    { id: "vaporizer", label: "Vaporizers", x: 380, w: 70, color: "#F59E0B",
      detail: "Plenum, agent-specific, temperature-compensated (bimetallic strip). Splitting ratio divides gas between bypass and vaporizing chambers. Interlock prevents >1 vaporizer use." },
    { id: "outlet", label: "Common\nGas Outlet", x: 460, w: 55, color: "#EF4444",
      detail: "22mm/15mm taper. O₂ flush (35–75 L/min) enters here, bypassing flowmeters and vaporizers. Back-bar pressure relief valve opens at ~35 kPa." },
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground">Complete Gas Pathway</h4>
      <p className="text-xs text-muted-foreground">Tap each stage to see details. Gas flows left → right from supply to patient circuit.</p>
      <div className="bg-secondary/30 rounded-xl p-4 border border-border">
        <svg viewBox="0 0 540 200" className="w-full h-auto">
          {/* Main flow line */}
          <line x1="15" y1="55" x2="525" y2="55" stroke="hsl(var(--border))" strokeWidth="2" strokeDasharray="6 3" opacity="0.3" />

          {/* Flow direction arrows */}
          {[80, 180, 270, 360, 445].map((x, i) => (
            <polygon key={i} points={`${x},50 ${x + 10},55 ${x},60`} fill="hsl(var(--muted-foreground))" opacity="0.25" />
          ))}

          {/* Stage blocks */}
          {stages.map(s => {
            const isActive = highlight === s.id;
            return (
              <g key={s.id} className="cursor-pointer" onClick={() => setHighlight(isActive ? null : s.id)}>
                <rect x={s.x} y={30} width={s.w} height={50} rx={8}
                  fill={s.color} fillOpacity={isActive ? 0.25 : 0.1}
                  stroke={s.color} strokeWidth={isActive ? 2.5 : 1.5}
                  className="transition-all duration-200" />
                {s.label.split("\n").map((line, li) => (
                  <text key={li} x={s.x + s.w / 2} y={50 + li * 12} textAnchor="middle"
                    fontSize="8" fill={s.color} fontWeight="bold">{line}</text>
                ))}
              </g>
            );
          })}

          {/* Safety features annotations */}
          <g opacity="0.5">
            {/* O₂ failure alarm */}
            <line x1="70" y1="85" x2="70" y2="100" stroke="hsl(var(--destructive))" strokeWidth="0.75" />
            <text x="70" y="110" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">O₂ failure alarm</text>
            <text x="70" y="120" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">(Ritchie whistle)</text>

            {/* Anti-hypoxia device */}
            <line x1="330" y1="85" x2="330" y2="100" stroke="hsl(var(--clinical))" strokeWidth="0.75" />
            <text x="330" y="110" textAnchor="middle" fontSize="6" fill="hsl(var(--clinical))">Anti-hypoxia</text>
            <text x="330" y="120" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">Min 25% O₂</text>

            {/* O₂ flush */}
            <path d="M 520 40 Q 530 20 490 15 L 490 55" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="3 2" />
            <text x="505" y="12" fontSize="6" fill="hsl(var(--destructive))">O₂ flush</text>
            <text x="505" y="22" fontSize="5" fill="hsl(var(--muted-foreground))">35–75 L/min</text>

            {/* Vaporizer interlock */}
            <line x1="415" y1="85" x2="415" y2="100" stroke="hsl(var(--accent))" strokeWidth="0.75" />
            <text x="415" y="110" textAnchor="middle" fontSize="6" fill="hsl(var(--accent))">Interlock</text>

            {/* Pressure relief */}
            <line x1="490" y1="85" x2="490" y2="100" stroke="hsl(var(--destructive))" strokeWidth="0.75" />
            <text x="490" y="110" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">Relief valve</text>
            <text x="490" y="120" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">~35 kPa</text>
          </g>

          {/* Patient circuit output */}
          <text x="525" y="92" fontSize="7" fill="hsl(var(--foreground))" fontWeight="600">→ Circuit</text>

          {/* Pressure zones */}
          <rect x="15" y="140" width="175" height="22" rx="4" fill="hsl(var(--destructive))" fillOpacity="0.06" stroke="hsl(var(--destructive))" strokeWidth="0.75" opacity="0.5" />
          <text x="102" y="155" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))">HIGH PRESSURE (137 bar → 400 kPa)</text>

          <rect x="200" y="140" width="170" height="22" rx="4" fill="hsl(var(--accent))" fillOpacity="0.06" stroke="hsl(var(--accent))" strokeWidth="0.75" opacity="0.5" />
          <text x="285" y="155" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))">INTERMEDIATE (~400 kPa)</text>

          <rect x="380" y="140" width="140" height="22" rx="4" fill="hsl(var(--clinical))" fillOpacity="0.06" stroke="hsl(var(--clinical))" strokeWidth="0.75" opacity="0.5" />
          <text x="450" y="155" textAnchor="middle" fontSize="7" fill="hsl(var(--clinical))">LOW PRESSURE (~100 kPa)</text>
        </svg>
      </div>

      {/* Detail panel */}
      {highlight && (
        <div className="p-3 rounded-lg border border-border bg-card animate-fade-in">
          <p className="text-sm font-semibold text-foreground">{stages.find(s => s.id === highlight)?.label.replace("\n", " ")}</p>
          <p className="text-sm text-muted-foreground mt-1">{stages.find(s => s.id === highlight)?.detail}</p>
        </div>
      )}
    </div>
  );
};

const PipelineSupplyDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Medical Gas Pipeline System (MGPS)</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 340" className="w-full h-auto">
        {/* VIE / Manifold */}
        <rect x="20" y="20" width="120" height="70" rx="8" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="80" y="42" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">VIE / Manifold</text>
        <text x="80" y="56" textAnchor="middle" className="fill-muted-foreground text-[8px]">Liquid O₂ at −183°C</text>
        <text x="80" y="68" textAnchor="middle" className="fill-muted-foreground text-[8px]">10–12 bar, 1500 kg</text>
        {/* VIE safety — pressure relief, superheater */}
        <text x="80" y="80" textAnchor="middle" className="fill-muted-foreground text-[7px]">Safety valve + superheater coil</text>

        {/* Pipeline */}
        <line x1="140" y1="55" x2="250" y2="55" stroke="hsl(var(--primary))" strokeWidth="3" />
        <text x="195" y="42" textAnchor="middle" className="fill-muted-foreground text-[9px]">400 kPa (4 bar)</text>
        {/* Copper pipe cross-section hint */}
        <circle cx="195" cy="55" r="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />

        {/* Terminal unit */}
        <rect x="250" y="20" width="140" height="70" rx="8" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent))" strokeWidth="2" />
        <text x="320" y="42" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Terminal Unit</text>
        <text x="320" y="56" textAnchor="middle" className="fill-muted-foreground text-[8px]">Schrader probe (self-sealing)</text>
        <text x="320" y="68" textAnchor="middle" className="fill-muted-foreground text-[8px]">NIST connection</text>
        <text x="320" y="80" textAnchor="middle" className="fill-muted-foreground text-[7px]">Gas-specific diameter prevents error</text>

        {/* To machine */}
        <line x1="390" y1="55" x2="480" y2="55" stroke="hsl(var(--primary))" strokeWidth="3" />
        <rect x="480" y="20" width="100" height="70" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="530" y="42" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Machine</text>
        <text x="530" y="56" textAnchor="middle" className="fill-muted-foreground text-[8px]">4 bar inlet</text>
        <text x="530" y="68" textAnchor="middle" className="fill-muted-foreground text-[8px]">Check valve → flowmeter</text>

        {/* Gas colours */}
        <text x="20" y="120" className="fill-foreground text-[12px] font-semibold">Pipeline Colour Coding (UK / ISO)</text>
        {[
          { gas: "O₂", colour: "#FFFFFF", border: "#000", text: "White", textFill: "#000", bodyCol: "#222", iso: "White" },
          { gas: "N₂O", colour: "#1E90FF", border: "#1E90FF", text: "Blue", textFill: "#fff", bodyCol: "#1E90FF", iso: "Blue" },
          { gas: "Air", colour: "#000", border: "#fff", text: "Black/White", textFill: "#fff", bodyCol: "#444", iso: "Black+White" },
          { gas: "Vacuum", colour: "#FFD700", border: "#FFD700", text: "Yellow", textFill: "#000", bodyCol: "#FFD700", iso: "Yellow" },
        ].map((g, i) => (
          <g key={g.gas}>
            <rect x={20 + i * 145} y={135} width="130" height="40" rx="6" fill={g.colour} stroke={g.border} strokeWidth="2" />
            <text x={85 + i * 145} y={155} textAnchor="middle" fill={g.textFill} className="text-[11px] font-semibold">{g.gas} — {g.text}</text>
            <text x={85 + i * 145} y={168} textAnchor="middle" fill={g.textFill} className="text-[7px]" opacity="0.7">ISO: {g.iso}</text>
          </g>
        ))}

        {/* Key pressures */}
        <text x="20" y="210" className="fill-foreground text-[12px] font-semibold">Key Pressures & Safety</text>
        {[
          "Pipeline supply: 400 kPa (4 bar / 60 psi) — all gases except vacuum",
          "VIE: liquid O₂ at −183°C (critical temp −118°C), 10–12 bar, ~1500 kg capacity",
          "Manifold: automatic changeover between primary/secondary cylinder banks",
          "NIST (Non-Interchangeable Screw Thread) — different thread for each gas",
          "Schrader: self-sealing socket — gas-specific probe diameter",
          "Tug test: pull each pipeline hose to check secure connection (AAGBI check)",
        ].map((t, i) => (
          <text key={i} x="30" y={230 + i * 18} className="fill-muted-foreground text-[10px]">• {t}</text>
        ))}
      </svg>
    </div>
  </div>
);

const CylinderStorageDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Cylinder Gas Storage</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 420" className="w-full h-auto">
        {/* Cylinder shapes — more realistic with shoulder detail */}
        {[
          { x: 40, gas: "O₂", shoulder: "#fff", body: "#222", pin: "2,5", pressure: "137 bar", litres: "680 L", state: "Gas", gauge: "∝ contents" },
          { x: 170, gas: "N₂O", shoulder: "#1E90FF", body: "#1E90FF", pin: "3,5", pressure: "44 bar", litres: "1800 L", state: "Liquid + gas", gauge: "Constant until empty" },
          { x: 300, gas: "Air", shoulder: "#808080", body: "#444", pin: "1,5", pressure: "137 bar", litres: "680 L", state: "Gas", gauge: "∝ contents" },
          { x: 430, gas: "Entonox", shoulder: "#fff", body: "#1E90FF", pin: "7", pressure: "137 bar", litres: "500 L", state: "Gas mix", gauge: "∝ contents" },
        ].map((c) => (
          <g key={c.gas}>
            {/* Cylinder body */}
            <rect x={c.x} y={70} width="80" height="130" rx="8" fill={c.body} stroke="hsl(var(--border))" strokeWidth="1.5" opacity="0.75" />
            {/* Shoulder — rounded top */}
            <path d={`M${c.x},100 Q${c.x},65 ${c.x + 20},55 L${c.x + 60},55 Q${c.x + 80},65 ${c.x + 80},100`}
              fill={c.shoulder} stroke="hsl(var(--border))" strokeWidth="1.5" opacity="0.85" />
            {/* Valve spindle */}
            <rect x={c.x + 32} y={38} width="16" height="22" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
            {/* Handwheel */}
            <ellipse cx={c.x + 40} cy={38} rx={12} ry={5} fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
            {/* Pin index holes */}
            <circle cx={c.x + 33} cy={48} r={2} fill="hsl(var(--border))" />
            <circle cx={c.x + 47} cy={48} r={2} fill="hsl(var(--border))" />

            <text x={c.x + 40} y={95} textAnchor="middle" fill="hsl(var(--background))" className="text-[13px] font-bold">{c.gas}</text>
            <text x={c.x + 40} y={140} textAnchor="middle" fill="hsl(var(--background))" className="text-[9px]">{c.pressure}</text>
            <text x={c.x + 40} y={155} textAnchor="middle" fill="hsl(var(--background))" className="text-[9px]">{c.litres} (size E)</text>
            <text x={c.x + 40} y={170} textAnchor="middle" fill="hsl(var(--background))" className="text-[8px]" opacity="0.7">{c.state}</text>

            <text x={c.x + 40} y={215} textAnchor="middle" className="fill-muted-foreground text-[9px] font-medium">Pin: {c.pin}</text>
            <text x={c.x + 40} y={228} textAnchor="middle" className="fill-muted-foreground text-[8px]">Gauge: {c.gauge}</text>
          </g>
        ))}

        {/* Key facts */}
        <text x="20" y="260" className="fill-foreground text-[12px] font-semibold">Key Principles</text>
        {[
          "O₂: ideal gas at cylinder pressure → Boyle's law: gauge pressure ∝ remaining contents",
          "N₂O: stored as liquid (below critical temp 36.5°C) → gauge reads 44 bar (SVP) until ALL liquid gone → then falls rapidly",
          "N₂O filling ratio: 0.75 (temperate) / 0.67 (tropics) — prevents hydraulic rupture if overheated",
          "Pin Index System: unique pin positions on cylinder yoke prevent wrong gas connection",
          "  O₂: 2-5 | N₂O: 3-5 | Air: 1-5 | CO₂: 2-6 | Entonox: 7",
          "Entonox: 50% O₂ + 50% N₂O — pseudocritical temp −5.5°C (Poynting effect) → lamination risk",
          "Cylinder contents (L) = gauge pressure (bar) × water capacity (L) — for ideal gases only",
          "Size E cylinder water capacity ≈ 4.7 L → full O₂ cylinder = 137 × 4.7 ≈ 680 L",
        ].map((t, i) => (
          <text key={i} x="30" y={280 + i * 17} className="fill-muted-foreground text-[9.5px]">• {t}</text>
        ))}
      </svg>
    </div>
  </div>
);

const PressureRegulatorsDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Pressure Regulators (Reducing Valves)</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 400" className="w-full h-auto">
        {/* Regulator cross-section schematic */}
        <rect x="120" y="20" width="360" height="200" rx="12" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="300" y="15" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Two-Stage Reducing Valve (Cross-Section)</text>

        {/* High pressure chamber */}
        <rect x="140" y="40" width="100" height="80" rx="6" fill="hsl(var(--destructive)/0.12)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="190" y="60" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">High P</text>
        <text x="190" y="75" textAnchor="middle" className="fill-muted-foreground text-[8px]">137 bar</text>
        <text x="190" y="88" textAnchor="middle" className="fill-muted-foreground text-[8px]">(from cylinder)</text>

        {/* Diaphragm */}
        <path d="M 250 50 Q 265 80 250 110" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
        <text x="260" y="85" className="fill-primary text-[7px]" transform="rotate(90, 260, 85)">Diaphragm</text>

        {/* Valve seat */}
        <rect x="272" y="70" width="16" height="20" rx="3" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="280" y="65" textAnchor="middle" className="fill-primary text-[7px]">Seat</text>

        {/* Spring */}
        <path d="M 310 45 L 320 55 L 300 65 L 320 75 L 300 85 L 320 95 L 300 105 L 320 115 L 310 120"
          fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.5" />
        <text x="330" y="85" className="fill-muted-foreground text-[7px]">Spring</text>

        {/* Low pressure chamber */}
        <rect x="360" y="40" width="100" height="80" rx="6" fill="hsl(var(--accent)/0.12)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="410" y="60" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Low P</text>
        <text x="410" y="75" textAnchor="middle" className="fill-muted-foreground text-[8px]">~400 kPa</text>
        <text x="410" y="88" textAnchor="middle" className="fill-muted-foreground text-[8px]">(to flowmeters)</text>

        {/* Flow arrows */}
        <line x1="240" y1="80" x2="270" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="290" y1="80" x2="355" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Relief valve */}
        <rect x="380" y="130" width="60" height="25" rx="4" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1" />
        <text x="410" y="145" textAnchor="middle" className="fill-destructive text-[7px] font-semibold">Relief valve</text>
        <text x="410" y="155" textAnchor="middle" className="fill-muted-foreground text-[6px]">~700 kPa</text>

        {/* Explanation text */}
        <text x="300" y="180" textAnchor="middle" className="fill-muted-foreground text-[8px]">Spring tension sets outlet pressure. Diaphragm balances gas force vs spring.</text>
        <text x="300" y="195" textAnchor="middle" className="fill-muted-foreground text-[8px]">As supply ↓, reduced force on seat → outlet ↓ slightly = "seat effect"</text>
        <text x="300" y="210" textAnchor="middle" className="fill-muted-foreground text-[8px]">Two-stage design minimises seat effect for more stable output</text>

        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--primary))" />
          </marker>
        </defs>

        {/* Key points */}
        <text x="20" y="245" className="fill-foreground text-[12px] font-semibold">Key Points</text>
        {[
          "Two-stage regulators: more stable output, minimise seat effect",
          "Adiabatic cooling during gas expansion → risk of freezing if moisture present",
          "Relief valve opens at ~700 kPa to protect downstream components",
          "Pipeline gas arrives pre-regulated at 400 kPa — no further reduction needed",
          "Bourdon gauge measures cylinder pressure upstream of regulator",
          "Gas-specific regulators prevent cross-connection (colour-coded + thread differences)",
        ].map((t, i) => (
          <text key={i} x="30" y={265 + i * 18} className="fill-muted-foreground text-[10px]">• {t}</text>
        ))}
      </svg>
    </div>
  </div>
);

const FlowmetersDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Flowmeters (Rotameters)</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 420" className="w-full h-auto">
        <text x="120" y="25" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Variable Orifice Flowmeter</text>

        {/* Tapered tube — more realistic with glass effect */}
        <defs>
          <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="white" stopOpacity="0.08" />
            <stop offset="40%" stopColor="white" stopOpacity="0.02" />
            <stop offset="100%" stopColor="white" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <polygon points="80,360 68,50 172,50 160,360" fill="url(#glassGrad)" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Tube taper lines */}
        <line x1="74" y1="200" x2="166" y2="200" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.2" />

        {/* Scale markings */}
        {[80, 120, 160, 200, 240, 280, 320].map((y, i) => (
          <g key={i}>
            <line x1={72 + (360 - y) * 0.025} y1={y} x2={72 + (360 - y) * 0.025 + 8} y2={y}
              stroke="hsl(var(--foreground))" strokeWidth="0.75" opacity="0.3" />
          </g>
        ))}

        {/* Bobbin with fluted top */}
        <ellipse cx="120" cy="200" rx="22" ry="7" fill="hsl(var(--primary)/0.5)" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Top flute */}
        <line x1="115" y1="193" x2="125" y2="193" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="120" y="204" textAnchor="middle" fill="hsl(var(--background))" className="text-[8px] font-bold">Bobbin</text>

        {/* Annular gap annotations */}
        <line x1="145" y1="200" x2="160" y2="200" stroke="hsl(var(--accent))" strokeWidth="1.5" opacity="0.6" />
        <line x1="97" y1="200" x2="82" y2="200" stroke="hsl(var(--accent))" strokeWidth="1.5" opacity="0.6" />
        <text x="172" y="198" fontSize="7" fill="hsl(var(--accent))">Annular</text>
        <text x="172" y="208" fontSize="7" fill="hsl(var(--accent))">gap</text>

        {/* Flow arrows */}
        {[300, 260, 220, 180, 140].map((y, i) => (
          <g key={i}>
            <line x1="100" y1={y + 25} x2="100" y2={y} stroke="hsl(var(--accent))" strokeWidth="1.5" opacity={0.3 + i * 0.15} />
            <polygon points={`95,${y} 100,${y - 8} 105,${y}`} fill="hsl(var(--accent))" opacity={0.3 + i * 0.15} />
          </g>
        ))}

        {/* Labels */}
        <text x="120" y="376" textAnchor="middle" className="fill-muted-foreground text-[9px]">Gas inlet (bottom)</text>
        <text x="120" y="42" textAnchor="middle" className="fill-muted-foreground text-[9px]">Gas outlet (top) → vaporizer</text>

        {/* Annotations */}
        <line x1="160" y1="195" x2="225" y2="195" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4" />
        <text x="230" y="192" className="fill-foreground text-[10px] font-medium">Read at TOP of bobbin</text>
        <text x="230" y="207" className="fill-muted-foreground text-[9px]">(or centre of ball float)</text>

        {/* Physics */}
        <text x="300" y="45" className="fill-foreground text-[12px] font-semibold">Physics Principles</text>
        <rect x="280" y="55" width="300" height="140" rx="8" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--border))" strokeWidth="1" />
        {[
          "Constant pressure drop across bobbin",
          "Variable annular orifice (tapered tube widening upward)",
          "",
          "Low flow: narrow annulus → laminar flow",
          "  → depends on VISCOSITY (Hagen-Poiseuille)",
          "  → gas-specific (viscosity differs between gases)",
          "",
          "High flow: wide annulus → turbulent flow",
          "  → depends on DENSITY",
          "  → affected by pressure and temperature",
        ].map((t, i) => (
          <text key={i} x="295" y={72 + i * 13} className="fill-muted-foreground text-[9px]">{t}</text>
        ))}

        {/* Sequence */}
        <text x="300" y="220" className="fill-foreground text-[12px] font-semibold">Flowmeter Sequence & Safety</text>
        {[
          "O₂ must be DOWNSTREAM (nearest to common gas outlet)",
          "  → if upstream tube cracks, leak enters atmosphere not circuit",
          "Anti-hypoxia device: mechanical/pneumatic link ensures ≥25% O₂",
          "  → cuts N₂O if O₂ supply fails; ratio controller on modern machines",
          "Needle valve: fine thread at BASE of each rotameter controls flow",
          "Each rotameter calibrated for ONE gas only — not interchangeable",
          "Electronic flowmeters (mass flow sensors) replacing rotameters in modern machines",
        ].map((t, i) => (
          <text key={i} x="310" y={238 + i * 17} className="fill-muted-foreground text-[9.5px]">• {t}</text>
        ))}

        {/* Calibration warning */}
        <rect x="280" y="365" width="300" height="35" rx="6" fill="hsl(var(--destructive)/0.06)" stroke="hsl(var(--destructive)/0.3)" strokeWidth="1" />
        <text x="430" y="380" textAnchor="middle" className="fill-destructive text-[10px] font-semibold">⚠ Helium/Heliox: different viscosity & density</text>
        <text x="430" y="393" textAnchor="middle" className="fill-muted-foreground text-[9px]">Rotameter will read INACCURATELY — use dedicated flowmeter</text>
      </svg>
    </div>
  </div>
);

const SafetyFeaturesDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Safety Features of the Anaesthetic Machine</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 500" className="w-full h-auto">
        {/* Machine block */}
        <rect x="150" y="20" width="300" height="60" rx="10" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="300" y="48" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Anaesthetic Machine Safety</text>
        <text x="300" y="66" textAnchor="middle" className="fill-muted-foreground text-[8px]">Gas supply → Flowmeters → Vaporizer → CGO → Breathing system</text>

        {/* Safety features grid */}
        {[
          { title: "O₂ Failure Alarm", desc: "Ritchie whistle: pressure-powered audible\nalarm when O₂ supply <200 kPa. No battery\nneeded. Also shuts off N₂O supply.\nPipeline disconnect = most common cause.", y: 100, colour: "destructive" },
          { title: "O₂ Flush", desc: "Delivers 35–75 L/min pure O₂ at pipeline\npressure. Bypasses flowmeters AND vaporizers.\nRisks: barotrauma if APL valve closed,\nawareness (dilutes volatile agent).", y: 100, colour: "primary" },
          { title: "Anti-Hypoxia Device", desc: "Mechanical/pneumatic link between O₂ and\nN₂O flowmeters. Ensures minimum 25% O₂\n(3:1 ratio). Modern: Link-25 system or\nelectronic ratio controller.", y: 240, colour: "accent" },
          { title: "Pin Index / NIST", desc: "Pin Index: two pins on yoke → prevents wrong\ncylinder (Bodok seal required). NIST: non-\ninterchangeable screw thread for pipeline.\nSchrader: self-sealing gas-specific probes.", y: 240, colour: "primary" },
          { title: "Pressure Relief Valve", desc: "Opens at ~35 kPa (back bar) to prevent\nbarotrauma from blocked vaporizer or\ncircuit. Separate from APL valve and\ncircuit pressure relief (~60 cmH₂O).", y: 380, colour: "destructive" },
          { title: "O₂ Analyser", desc: "Paramagnetic (fast, accurate) or galvanic\nfuel cell (slower, cheaper) on inspiratory\nlimb. Mandatory continuous FiO₂ monitoring.\nCalibrate to 21% (air) and 100% (O₂).", y: 380, colour: "accent" },
        ].map((f, i) => {
          const x = i % 2 === 0 ? 20 : 310;
          return (
            <g key={f.title}>
              <rect x={x} y={f.y} width="270" height="120" rx="8" fill={`hsl(var(--${f.colour})/0.08)`} stroke={`hsl(var(--${f.colour}))`} strokeWidth="1.5" />
              <text x={x + 135} y={f.y + 22} textAnchor="middle" className="fill-foreground text-[11px] font-bold">{f.title}</text>
              {f.desc.split("\n").map((line, li) => (
                <text key={li} x={x + 15} y={f.y + 42 + li * 15} className="fill-muted-foreground text-[9px]">{line}</text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>

    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <h5 className="font-semibold text-foreground mb-2">Pre-Use Check (Association of Anaesthetists 2023 — supersedes AAGBI 2012)</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
        {[
          "Check pipeline connections — confirm correct gas at each outlet (tug test)",
          "Check cylinder backup — at least one full O₂ cylinder available",
          "Test O₂ failure alarm — disconnect O₂ pipeline, listen for Ritchie whistle",
          "Calibrate O₂ analyser to air (21%) and O₂ (100%)",
          "Check flowmeters — all move freely through full range, anti-hypoxia device functions",
          "Verify vaporizers — correct agent, filled, seated in interlock, not tilted",
          "Check breathing system — pressure leak test (occlude Y-piece + close APL at 30 cmH₂O)",
          "Test ventilator, suction (≥53 kPa), scavenging, and monitoring equipment",
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
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <DiagramFigure id="anaesthetic-machine" title="Anaesthetic machine: pipeline, cylinders, regulators and safety features" description="Interactive overview of the anaesthetic machine — gas supply pipeline, back-up cylinders, pressure regulators, flowmeters, vapouriser and key safety interlocks.">
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

      {activeTab === "overview" && <OverviewDiagram />}
      {activeTab === "pipeline" && <PipelineSupplyDiagram />}
      {activeTab === "cylinders" && <CylinderStorageDiagram />}
      {activeTab === "regulators" && <PressureRegulatorsDiagram />}
      {activeTab === "flowmeters" && <FlowmetersDiagram />}
      {activeTab === "safety" && <SafetyFeaturesDiagram />}
    </div>
    </DiagramFigure>
  );
};

export default AnaestheticMachineDiagram;
