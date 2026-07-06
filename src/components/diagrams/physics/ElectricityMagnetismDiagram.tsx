import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Tab = "ohms" | "capacitance" | "inductance" | "transformers" | "wheatstone";

const tabs: { key: Tab; label: string }[] = [
  { key: "ohms", label: "Ohm's Law" },
  { key: "capacitance", label: "Capacitance" },
  { key: "inductance", label: "Inductance" },
  { key: "transformers", label: "Transformers" },
  { key: "wheatstone", label: "Wheatstone Bridge" },
];

const OhmsLawDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Ohm's Law & Circuit Fundamentals</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 440" className="w-full h-auto">
        {/* Main equation */}
        <rect x="150" y="10" width="300" height="55" rx="10" fill="hsl(var(--primary)/0.12)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="300" y="35" textAnchor="middle" className="fill-primary text-[18px] font-bold">V = I × R</text>
        <text x="300" y="55" textAnchor="middle" className="fill-muted-foreground text-[9px]">Voltage (V) = Current (A) × Resistance (Ω)</text>

        {/* Power equations */}
        <text x="300" y="85" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Related Power Equations</text>
        {[
          { eq: "P = V × I", desc: "Power = Voltage × Current (Watts)" },
          { eq: "P = I²R", desc: "Power dissipated in a resistor" },
          { eq: "P = V²/R", desc: "Power from voltage and resistance" },
        ].map((e, i) => (
          <g key={e.eq}>
            <text x="180" y={108 + i * 20} textAnchor="end" className="fill-primary text-[11px] font-bold">{e.eq}</text>
            <text x="195" y={108 + i * 20} className="fill-muted-foreground text-[10px]">{e.desc}</text>
          </g>
        ))}

        {/* Series vs Parallel */}
        <text x="300" y="185" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Series vs Parallel Circuits</text>

        {/* Series */}
        <rect x="20" y="195" width="270" height="110" rx="8" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="155" y="215" textAnchor="middle" className="fill-primary text-[11px] font-bold">Series</text>
        {/* Series resistors */}
        <line x1="50" y1="245" x2="80" y2="245" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <rect x="80" y="235" width="40" height="20" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="120" y1="245" x2="140" y2="245" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <rect x="140" y="235" width="40" height="20" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="180" y1="245" x2="200" y2="245" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <rect x="200" y="235" width="40" height="20" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="240" y1="245" x2="260" y2="245" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="155" y="278" textAnchor="middle" className="fill-foreground text-[10px] font-medium">R_total = R₁ + R₂ + R₃</text>
        <text x="155" y="295" textAnchor="middle" className="fill-muted-foreground text-[9px]">Same current; voltage divides</text>

        {/* Parallel */}
        <rect x="310" y="195" width="270" height="110" rx="8" fill="hsl(var(--accent)/0.06)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="445" y="215" textAnchor="middle" className="fill-accent text-[11px] font-bold">Parallel</text>
        {/* Parallel resistors */}
        <line x1="350" y1="240" x2="380" y2="240" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="380" y1="230" x2="380" y2="270" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <rect x="385" y="225" width="35" height="12" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <rect x="385" y="245" width="35" height="12" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <rect x="385" y="265" width="35" height="12" rx="2" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="420" y1="230" x2="420" y2="270" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="420" y1="250" x2="450" y2="250" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="445" y="288" textAnchor="middle" className="fill-foreground text-[10px] font-medium">1/R_total = 1/R₁ + 1/R₂ + 1/R₃</text>
        <text x="445" y="300" textAnchor="middle" className="fill-muted-foreground text-[9px]">Same voltage; current divides</text>

        {/* DC vs AC */}
        <text x="300" y="330" textAnchor="middle" className="fill-foreground text-[12px] font-bold">DC vs AC Current</text>
        {[
          "DC (direct current): constant direction of electron flow. Batteries (modern defibrillators store charge as DC in a capacitor but deliver a biphasic — i.e. reversing — waveform to the patient)",
          "AC (alternating current): sinusoidal oscillation (50 Hz UK mains). Diathermy uses high-frequency AC (0.4–3 MHz)",
          "Impedance (Z): AC equivalent of resistance. Z = √(R² + (XL − XC)²) where XL = inductive, XC = capacitive reactance",
          "Body impedance falls at high frequencies (capacitive reactance ↓), but the current required to induce VF also rises sharply above ~100 Hz — VF risk is maximal at mains frequency (50–60 Hz), which is why diathermy (>300 kHz) can safely use large currents without inducing fibrillation",
        ].map((t, i) => (
          <text key={i} x="30" y={350 + i * 18} className="fill-muted-foreground text-[9.5px]">• {t}</text>
        ))}

        <text x="300" y="430" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Mains supply: 230V AC, 50 Hz (UK). RMS voltage = peak/√2. Current kills: 1 mA perceptible, 15 mA let-go, 100 mA VF (macroshock)</text>
      </svg>
    </div>
  </div>
);

const CapacitanceDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Capacitance</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 420" className="w-full h-auto">
        <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Capacitor: Stores Charge (Energy in Electric Field)</text>

        {/* Capacitor symbol */}
        <line x1="150" y1="70" x2="270" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <line x1="270" y1="40" x2="270" y2="100" stroke="hsl(var(--primary))" strokeWidth="3" />
        <line x1="290" y1="40" x2="290" y2="100" stroke="hsl(var(--primary))" strokeWidth="3" />
        <line x1="290" y1="70" x2="410" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <text x="245" y="55" className="fill-primary text-[10px] font-bold">+</text>
        <text x="300" y="55" className="fill-primary text-[10px] font-bold">−</text>

        {/* Equation */}
        <rect x="150" y="115" width="300" height="45" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="300" y="138" textAnchor="middle" className="fill-primary text-[14px] font-bold">C = Q/V = εA/d</text>
        <text x="300" y="153" textAnchor="middle" className="fill-muted-foreground text-[9px]">Capacitance (Farads) = Charge/Voltage = permittivity × Area / distance</text>

        {/* Time constant */}
        <rect x="30" y="175" width="540" height="65" rx="8" fill="hsl(var(--accent)/0.06)" stroke="hsl(var(--accent))" strokeWidth="1" />
        <text x="300" y="195" textAnchor="middle" className="fill-accent text-[12px] font-bold">Time Constant: τ = RC</text>
        <text x="300" y="215" textAnchor="middle" className="fill-muted-foreground text-[10px]">After 1τ: capacitor charges to 63% (or discharges to 37%)</text>
        <text x="300" y="232" textAnchor="middle" className="fill-muted-foreground text-[10px]">After 3τ: ~95% charged. After 5τ: ~99% charged (effectively complete)</text>

        {/* Clinical applications */}
        <text x="20" y="265" className="fill-foreground text-[12px] font-bold">Clinical Applications of Capacitors</text>
        {[
          { app: "Defibrillator", desc: "Capacitor charged to high voltage (e.g., 5 kV), energy stored then discharged through patient. E = ½CV²", colour: "destructive" },
          { app: "Diathermy filters", desc: "Capacitors in isolating circuits prevent DC leakage and low-frequency current paths to earth", colour: "primary" },
          { app: "Invasive BP monitoring", desc: "Capacitive coupling in long cables can introduce artefact; shielded cables minimise this", colour: "accent" },
          { app: "ECG filtering", desc: "High-pass (removes baseline wander) and low-pass (removes high-freq noise) filters use RC circuits", colour: "primary" },
        ].map((a, i) => (
          <g key={a.app}>
            <rect x="20" y={278 + i * 33} width="560" height="28" rx="6" fill={`hsl(var(--${a.colour})/0.06)`} stroke={`hsl(var(--${a.colour}))`} strokeWidth="1" />
            <text x="35" y={296 + i * 33} className="fill-foreground text-[10px] font-bold">{a.app}</text>
            <text x="175" y={296 + i * 33} className="fill-muted-foreground text-[9px]">{a.desc}</text>
          </g>
        ))}

        {/* Reactance */}
        <text x="300" y="420" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Capacitive reactance: Xc = 1/(2πfC) — decreases with ↑frequency → capacitors pass AC, block DC</text>
      </svg>
    </div>
  </div>
);

const InductanceDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Inductance</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 380" className="w-full h-auto">
        <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Inductor: Stores Energy in a Magnetic Field</text>

        {/* Inductor symbol - coil */}
        <line x1="120" y1="65" x2="200" y2="65" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <path d="M 200 65 Q 215 45, 230 65 Q 245 45, 260 65 Q 275 45, 290 65 Q 305 45, 320 65 Q 335 45, 350 65" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        <line x1="350" y1="65" x2="440" y2="65" stroke="hsl(var(--foreground))" strokeWidth="2" />

        {/* Equation */}
        <rect x="150" y="90" width="300" height="45" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="300" y="112" textAnchor="middle" className="fill-primary text-[14px] font-bold">V = L × dI/dt</text>
        <text x="300" y="128" textAnchor="middle" className="fill-muted-foreground text-[9px]">EMF = Inductance (Henrys) × rate of change of current</text>

        {/* Key properties */}
        <text x="20" y="160" className="fill-foreground text-[12px] font-bold">Key Properties</text>
        {[
          "Inductors oppose changes in current (Lenz's law) — electrical inertia",
          "Energy stored: E = ½LI² (analogous to capacitor E = ½CV²)",
          "Inductive reactance: XL = 2πfL — increases with ↑frequency → inductors pass DC, block AC",
          "Time constant for RL circuit: τ = L/R",
          "Mutual inductance: changing current in one coil induces EMF in adjacent coil → basis of transformers",
        ].map((t, i) => (
          <text key={i} x="30" y={180 + i * 20} className="fill-muted-foreground text-[10px]">• {t}</text>
        ))}

        {/* Comparison table */}
        <text x="300" y="295" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Capacitor vs Inductor Comparison</text>
        {/* Headers */}
        <rect x="60" y="302" width="480" height="22" rx="4" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x="180" y="317" textAnchor="middle" className="fill-foreground text-[9px] font-bold">Property</text>
        <text x="340" y="317" textAnchor="middle" className="fill-foreground text-[9px] font-bold">Capacitor</text>
        <text x="480" y="317" textAnchor="middle" className="fill-foreground text-[9px] font-bold">Inductor</text>
        {[
          { prop: "Stores energy in", cap: "Electric field", ind: "Magnetic field" },
          { prop: "Energy formula", cap: "½CV²", ind: "½LI²" },
          { prop: "Opposes change in", cap: "Voltage", ind: "Current" },
          { prop: "Reactance vs freq", cap: "↓ with ↑f (passes AC)", ind: "↑ with ↑f (blocks AC)" },
        ].map((r, i) => (
          <g key={r.prop}>
            <rect x="60" y={326 + i * 20} width="480" height="18" rx="3" fill={i % 2 === 0 ? "hsl(var(--secondary)/0.15)" : "transparent"} />
            <text x="180" y={339 + i * 20} textAnchor="middle" className="fill-foreground text-[9px]">{r.prop}</text>
            <text x="340" y={339 + i * 20} textAnchor="middle" className="fill-muted-foreground text-[9px]">{r.cap}</text>
            <text x="480" y={339 + i * 20} textAnchor="middle" className="fill-muted-foreground text-[9px]">{r.ind}</text>
          </g>
        ))}
      </svg>
    </div>
  </div>
);

const TransformersDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Transformers</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 400" className="w-full h-auto">
        <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Transformer: Changes AC Voltage via Electromagnetic Induction</text>

        {/* Primary coil */}
        <path d="M 100 80 Q 115 60, 130 80 Q 145 60, 160 80 Q 175 60, 190 80 Q 205 60, 220 80" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="160" y="100" textAnchor="middle" className="fill-primary text-[10px] font-bold">Primary (N₁)</text>
        <line x1="100" y1="80" x2="100" y2="120" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="220" y1="80" x2="220" y2="120" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="160" y="135" textAnchor="middle" className="fill-muted-foreground text-[9px]">V₁, I₁</text>

        {/* Core */}
        <rect x="265" y="55" width="10" height="75" rx="2" fill="hsl(var(--foreground)/0.3)" />
        <rect x="285" y="55" width="10" height="75" rx="2" fill="hsl(var(--foreground)/0.3)" />

        {/* Secondary coil */}
        <path d="M 340 80 Q 355 60, 370 80 Q 385 60, 400 80 Q 415 60, 430 80 Q 445 60, 460 80 Q 475 60, 490 80" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        <text x="415" y="100" textAnchor="middle" className="fill-accent text-[10px] font-bold">Secondary (N₂)</text>
        <line x1="340" y1="80" x2="340" y2="120" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="490" y1="80" x2="490" y2="120" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="415" y="135" textAnchor="middle" className="fill-muted-foreground text-[9px]">V₂, I₂</text>

        {/* Equation */}
        <rect x="130" y="150" width="340" height="50" rx="10" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="300" y="175" textAnchor="middle" className="fill-primary text-[15px] font-bold">V₁/V₂ = N₁/N₂ = I₂/I₁</text>
        <text x="300" y="193" textAnchor="middle" className="fill-muted-foreground text-[9px]">Voltage ratio = turns ratio. Power conserved: V₁I₁ = V₂I₂ (ideal transformer)</text>

        {/* Types */}
        <text x="300" y="225" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Types & Clinical Applications</text>
        {[
          { type: "Step-up", ratio: "N₂ > N₁", effect: "↑Voltage, ↓Current", app: "X-ray tube (high kV needed), defibrillator charging circuit" },
          { type: "Step-down", ratio: "N₂ < N₁", effect: "↓Voltage, ↑Current", app: "Mains to low-voltage equipment, isolated power supply in theatre" },
          { type: "Isolation (1:1)", ratio: "N₂ = N₁", effect: "Same voltage", app: "Eliminates earth reference → prevents macroshock. Line isolation monitor detects faults" },
        ].map((t, i) => (
          <g key={t.type}>
            <rect x="20" y={238 + i * 42} width="560" height="36" rx="6" fill="hsl(var(--secondary)/0.15)" stroke="hsl(var(--border))" strokeWidth="1" />
            <text x="35" y={255 + i * 42} className="fill-primary text-[10px] font-bold">{t.type} ({t.ratio})</text>
            <text x="220" y={255 + i * 42} className="fill-foreground text-[9px]">{t.effect}</text>
            <text x="35" y={269 + i * 42} className="fill-muted-foreground text-[8.5px]">{t.app}</text>
          </g>
        ))}

        {/* Key points */}
        <text x="20" y="375" className="fill-foreground text-[11px] font-bold">Key Points</text>
        <text x="30" y="393" className="fill-muted-foreground text-[9.5px]">• Transformers only work with AC (changing current needed for electromagnetic induction). They do NOT work with DC.</text>
      </svg>
    </div>
  </div>
);

const WheatstoneBridgeDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Wheatstone Bridge</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 440" className="w-full h-auto">
        <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Wheatstone Bridge Circuit</text>

        {/* Diamond arrangement */}
        {/* Top node */}
        <circle cx="300" cy="60" r="5" fill="hsl(var(--foreground))" />
        <text x="300" y="50" textAnchor="middle" className="fill-foreground text-[9px] font-bold">V+</text>

        {/* Left node */}
        <circle cx="180" cy="160" r="5" fill="hsl(var(--foreground))" />
        {/* Right node */}
        <circle cx="420" cy="160" r="5" fill="hsl(var(--foreground))" />

        {/* Bottom node */}
        <circle cx="300" cy="260" r="5" fill="hsl(var(--foreground))" />
        <text x="300" y="280" textAnchor="middle" className="fill-foreground text-[9px] font-bold">V−</text>

        {/* R1: top to left */}
        <line x1="300" y1="60" x2="180" y2="160" stroke="hsl(var(--primary))" strokeWidth="2" />
        <rect x="215" y="95" width="45" height="20" rx="4" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="237" y="109" textAnchor="middle" className="fill-primary text-[10px] font-bold">R₁</text>

        {/* R2: top to right */}
        <line x1="300" y1="60" x2="420" y2="160" stroke="hsl(var(--accent))" strokeWidth="2" />
        <rect x="340" y="95" width="45" height="20" rx="4" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="362" y="109" textAnchor="middle" className="fill-accent text-[10px] font-bold">R₂</text>

        {/* R3: left to bottom */}
        <line x1="180" y1="160" x2="300" y2="260" stroke="hsl(var(--primary))" strokeWidth="2" />
        <rect x="215" y="195" width="45" height="20" rx="4" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="237" y="209" textAnchor="middle" className="fill-primary text-[10px] font-bold">R₃</text>

        {/* R4: right to bottom */}
        <line x1="420" y1="160" x2="300" y2="260" stroke="hsl(var(--accent))" strokeWidth="2" />
        <rect x="340" y="195" width="45" height="20" rx="4" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="362" y="209" textAnchor="middle" className="fill-accent text-[10px] font-bold">R₄</text>

        {/* Galvanometer between left and right */}
        <line x1="180" y1="160" x2="420" y2="160" stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="5" />
        <circle cx="300" cy="160" r="15" fill="hsl(var(--card))" stroke="hsl(var(--destructive))" strokeWidth="2" />
        <text x="300" y="165" textAnchor="middle" className="fill-destructive text-[10px] font-bold">G</text>

        {/* Balance condition */}
        <rect x="130" y="290" width="340" height="40" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="300" y="310" textAnchor="middle" className="fill-primary text-[14px] font-bold">Balance: R₁/R₃ = R₂/R₄</text>
        <text x="300" y="325" textAnchor="middle" className="fill-muted-foreground text-[9px]">When balanced: no current flows through galvanometer (G = 0)</text>

        {/* Clinical applications */}
        <text x="20" y="355" className="fill-foreground text-[12px] font-bold">Clinical Applications</text>
        {[
          "Arterial pressure transducer: 4 strain gauge elements in Wheatstone bridge; pressure changes unbalance the bridge → voltage ∝ pressure",
          "Thermistor: temperature-sensitive resistor in bridge circuit. Resistance ↓ as temperature ↑ (NTC thermistor). Used in PAC thermodilution",
          "Strain gauge plethysmography: measures limb circumference changes (DVT diagnosis)",
        ].map((t, i) => (
          <text key={i} x="30" y={375 + i * 18} className="fill-muted-foreground text-[9.5px]">• {t}</text>
        ))}

        <text x="300" y="435" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Unknown resistance = (R₁/R₃) × R₄ — extremely precise measurements when bridge is near balance</text>
      </svg>
    </div>
  </div>
);

const ElectricityMagnetismDiagram = () => {
  const [activeTab, setActiveTab] = useState<Tab>("ohms");

  return (
    <DiagramFigure
      id="electricity-magnetism-diagram"
      title="Electricity magnetism"
      description="Auto-generated wrapper for the Electricity magnetism anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
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
  
        {activeTab === "ohms" && <OhmsLawDiagram />}
        {activeTab === "capacitance" && <CapacitanceDiagram />}
        {activeTab === "inductance" && <InductanceDiagram />}
        {activeTab === "transformers" && <TransformersDiagram />}
        {activeTab === "wheatstone" && <WheatstoneBridgeDiagram />}
      </div>
    </DiagramFigure>
  );
};

export default ElectricityMagnetismDiagram;
