import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PHElectrodeDiagram = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-serif font-bold text-foreground">Sanz (Severinghaus) pH Electrode</h3>
    <p className="text-sm text-muted-foreground">A glass electrode system measuring H⁺ activity via potential difference across a pH-sensitive glass membrane.</p>
    <svg viewBox="0 0 500 360" className="w-full max-w-lg mx-auto">
      {/* Outer housing */}
      <rect x="100" y="30" width="300" height="280" rx="12" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
      <text x="250" y="22" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">pH Measuring System</text>

      {/* Reference electrode (Ag/AgCl) */}
      <rect x="130" y="60" width="100" height="220" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="180" y="80" textAnchor="middle" className="fill-primary text-[9px] font-semibold">Reference</text>
      <text x="180" y="92" textAnchor="middle" className="fill-primary text-[9px] font-semibold">Electrode</text>
      {/* Ag/AgCl wire */}
      <line x1="180" y1="100" x2="180" y2="180" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <text x="180" y="115" textAnchor="middle" className="fill-muted-foreground text-[8px]">Ag/AgCl wire</text>
      {/* KCl solution */}
      <rect x="145" y="130" width="70" height="80" rx="3" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" />
      <text x="180" y="170" textAnchor="middle" className="fill-primary text-[8px]">Saturated</text>
      <text x="180" y="180" textAnchor="middle" className="fill-primary text-[8px]">KCl</text>
      {/* Liquid junction */}
      <rect x="155" y="230" width="50" height="15" rx="2" fill="hsl(var(--accent))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="180" y="241" textAnchor="middle" className="fill-foreground text-[7px]">Liquid junction</text>

      {/* Measuring electrode */}
      <rect x="270" y="60" width="100" height="220" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
      <text x="320" y="80" textAnchor="middle" className="fill-destructive text-[9px] font-semibold">Measuring</text>
      <text x="320" y="92" textAnchor="middle" className="fill-destructive text-[9px] font-semibold">Electrode</text>
      {/* Ag/AgCl wire */}
      <line x1="320" y1="100" x2="320" y2="180" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <text x="320" y="115" textAnchor="middle" className="fill-muted-foreground text-[8px]">Ag/AgCl wire</text>
      {/* Buffer solution */}
      <rect x="285" y="130" width="70" height="60" rx="3" fill="hsl(var(--destructive) / 0.12)" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="3,2" />
      <text x="320" y="160" textAnchor="middle" className="fill-destructive text-[8px]">Buffer</text>
      <text x="320" y="170" textAnchor="middle" className="fill-destructive text-[8px]">pH 6.840</text>
      {/* pH-sensitive glass bulb */}
      <ellipse cx="320" cy="250" rx="25" ry="18" fill="hsl(var(--destructive) / 0.2)" stroke="hsl(var(--destructive))" strokeWidth="2" />
      <text x="320" y="254" textAnchor="middle" className="fill-destructive text-[7px] font-bold">Glass</text>

      {/* Voltmeter */}
      <line x1="180" y1="55" x2="180" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1="320" y1="55" x2="320" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1="180" y1="40" x2="220" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1="280" y1="40" x2="320" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <circle cx="250" cy="40" r="15" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <text x="250" y="44" textAnchor="middle" className="fill-foreground text-[8px] font-bold">mV</text>
      <line x1="220" y1="40" x2="235" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1="265" y1="40" x2="280" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      {/* Sample */}
      <rect x="140" y="280" width="220" height="25" rx="4" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="250" y="296" textAnchor="middle" className="fill-primary text-[9px] font-semibold">Blood Sample (H⁺)</text>

      {/* Nernst equation */}
      <text x="250" y="340" textAnchor="middle" className="fill-muted-foreground text-[9px]">E = E₀ + (RT/nF) × ln[H⁺] → 61.5 mV/pH unit at 37°C</text>
      <text x="250" y="355" textAnchor="middle" className="fill-muted-foreground text-[8px]">(Nernst equation)</text>
    </svg>
    <div className="grid sm:grid-cols-2 gap-2 text-sm">
      <div className="p-3 rounded-lg border border-border">
        <p className="font-semibold text-foreground">Glass membrane</p>
        <p className="text-muted-foreground text-xs mt-1">Lithium/cesium-doped silicate glass. H⁺ ions exchange at hydrated gel layers on each surface, generating a potential proportional to [H⁺] difference.</p>
      </div>
      <div className="p-3 rounded-lg border border-border">
        <p className="font-semibold text-foreground">Calibration</p>
        <p className="text-muted-foreground text-xs mt-1">Two-point calibration with phosphate buffers (pH 6.840 and 7.384 at 37°C). Slope should be 95-105% of theoretical Nernstian slope.</p>
      </div>
    </div>
  </div>
);

const ClarkElectrodeDiagram = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-serif font-bold text-foreground">Clark Electrode (PO₂)</h3>
      <p className="text-sm text-muted-foreground">A polarographic electrode that measures dissolved O₂ by reducing it at a platinum cathode held at −0.6V.</p>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowAnimation(!showAnimation)}
          className="text-xs px-3 py-1 rounded-md border border-border bg-card hover:bg-accent transition-colors"
        >
          {showAnimation ? "Pause" : "Animate"} O₂ reduction
        </button>
      </div>
      <svg viewBox="0 0 500 380" className="w-full max-w-lg mx-auto">
        {/* Outer electrode housing */}
        <rect x="80" y="30" width="340" height="300" rx="12" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
        <text x="250" y="22" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Clark Polarographic Electrode</text>

        {/* Electrolyte chamber */}
        <rect x="120" y="80" width="260" height="180" rx="8" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="250" y="100" textAnchor="middle" className="fill-primary text-[9px]">KCl Electrolyte Solution</text>

        {/* Platinum cathode */}
        <rect x="160" y="120" width="12" height="120" rx="2" fill="hsl(var(--foreground))" />
        <text x="166" y="115" textAnchor="middle" className="fill-foreground text-[8px] font-bold">Pt</text>
        <text x="166" y="255" textAnchor="middle" className="fill-foreground text-[7px]">Cathode (−)</text>

        {/* Silver anode */}
        <rect x="320" y="120" width="16" height="120" rx="3" fill="hsl(var(--muted-foreground) / 0.5)" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <text x="328" y="115" textAnchor="middle" className="fill-foreground text-[8px] font-bold">Ag/AgCl</text>
        <text x="328" y="255" textAnchor="middle" className="fill-foreground text-[7px]">Anode (+)</text>

        {/* Polypropylene membrane */}
        <rect x="120" y="270" width="260" height="12" rx="2" fill="hsl(var(--accent))" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="250" y="279" textAnchor="middle" className="fill-foreground text-[7px] font-semibold">O₂-permeable membrane (polypropylene)</text>

        {/* Battery / polarizing voltage */}
        <line x1="166" y1="70" x2="166" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="328" y1="70" x2="328" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="166" y1="50" x2="210" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="290" y1="50" x2="328" y2="50" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <rect x="210" y="38" width="80" height="24" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="250" y="54" textAnchor="middle" className="fill-foreground text-[8px] font-bold">−0.6V DC</text>

        {/* O₂ molecules */}
        {showAnimation ? (
          <>
            <circle cx="200" cy="300" r="5" fill="hsl(var(--destructive))" opacity="0.7">
              <animate attributeName="cy" values="310;180;180" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.7;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="230" cy="305" r="5" fill="hsl(var(--destructive))" opacity="0.7">
              <animate attributeName="cy" values="315;190;190" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.7;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <text x="166" y="200" textAnchor="middle" className="fill-destructive text-[7px]">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              O₂ → OH⁻
            </text>
          </>
        ) : (
          <>
            <circle cx="200" cy="295" r="5" fill="hsl(var(--destructive))" opacity="0.6" />
            <circle cx="230" cy="300" r="5" fill="hsl(var(--destructive))" opacity="0.6" />
            <text x="215" y="295" textAnchor="middle" className="fill-destructive text-[7px]">O₂</text>
          </>
        )}

        {/* Sample side */}
        <rect x="120" y="290" width="260" height="30" rx="4" fill="hsl(var(--destructive) / 0.1)" stroke="hsl(var(--destructive))" strokeWidth="1" />
        <text x="250" y="310" textAnchor="middle" className="fill-destructive text-[9px] font-semibold">Blood Sample (dissolved O₂)</text>

        {/* Ammeter */}
        <circle cx="250" cy="50" r="0" />
        {/* Current arrow */}
        <text x="250" y="70" textAnchor="middle" className="fill-muted-foreground text-[7px]">Current ∝ PO₂</text>

        {/* Equations */}
        <text x="250" y="345" textAnchor="middle" className="fill-muted-foreground text-[9px]">Cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻</text>
        <text x="250" y="360" textAnchor="middle" className="fill-muted-foreground text-[9px]">Anode: 4Ag + 4Cl⁻ → 4AgCl + 4e⁻</text>
        <text x="250" y="375" textAnchor="middle" className="fill-muted-foreground text-[8px]">Response time ~20-30s (membrane-dependent)</text>
      </svg>
      <div className="grid sm:grid-cols-2 gap-2 text-sm">
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">Polarizing voltage</p>
          <p className="text-muted-foreground text-xs mt-1">−0.6V applied across the cell sits on the "plateau" of the current-voltage curve, ensuring current is proportional only to PO₂, not voltage.</p>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">O₂ consumption</p>
          <p className="text-muted-foreground text-xs mt-1">The electrode consumes O₂ during measurement. The membrane limits diffusion rate, making current proportional to PO₂ (not total O₂ content).</p>
        </div>
      </div>
    </div>
  );
};

const SeveringhausCO2Diagram = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-serif font-bold text-foreground">Severinghaus CO₂ Electrode</h3>
    <p className="text-sm text-muted-foreground">A modified pH electrode. CO₂ diffuses across a Teflon membrane into a NaHCO₃ solution, changing its pH proportionally to log PCO₂.</p>
    <svg viewBox="0 0 500 320" className="w-full max-w-lg mx-auto">
      <rect x="100" y="30" width="300" height="240" rx="12" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />
      <text x="250" y="22" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Severinghaus PCO₂ Electrode</text>

      {/* pH electrode inside */}
      <rect x="180" y="50" width="140" height="150" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="250" y="70" textAnchor="middle" className="fill-primary text-[9px] font-semibold">pH Glass Electrode</text>

      {/* NaHCO3 thin film */}
      <rect x="140" y="170" width="220" height="30" rx="4" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" />
      <text x="250" y="190" textAnchor="middle" className="fill-primary text-[8px]">Thin film NaHCO₃ / NaCl solution</text>

      {/* Teflon membrane */}
      <rect x="120" y="210" width="260" height="12" rx="2" fill="hsl(var(--accent))" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <text x="250" y="219" textAnchor="middle" className="fill-foreground text-[7px] font-semibold">Teflon membrane (CO₂ permeable, H⁺ impermeable)</text>

      {/* CO2 diffusion arrows */}
      <line x1="200" y1="250" x2="200" y2="225" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
      <line x1="250" y1="255" x2="250" y2="225" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
      <line x1="300" y1="250" x2="300" y2="225" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#arrowRed)" />

      <defs>
        <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--destructive))" />
        </marker>
      </defs>

      {/* Equations inside */}
      <text x="250" y="100" textAnchor="middle" className="fill-muted-foreground text-[8px]">CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻</text>
      <text x="250" y="120" textAnchor="middle" className="fill-muted-foreground text-[8px]">↑PCO₂ → ↑[H⁺] → ↓pH</text>
      <text x="250" y="145" textAnchor="middle" className="fill-muted-foreground text-[8px]">pH ∝ log(1/PCO₂)</text>

      {/* Sample */}
      <rect x="140" y="248" width="220" height="20" rx="4" fill="hsl(var(--destructive) / 0.1)" stroke="hsl(var(--destructive))" strokeWidth="1" />
      <text x="250" y="262" textAnchor="middle" className="fill-destructive text-[9px] font-semibold">Blood Sample (dissolved CO₂)</text>

      {/* Henderson-Hasselbalch */}
      <text x="250" y="295" textAnchor="middle" className="fill-muted-foreground text-[9px]">Henderson-Hasselbalch: pH = pKa + log([HCO₃⁻]/[CO₂])</text>
      <text x="250" y="310" textAnchor="middle" className="fill-muted-foreground text-[8px]">Response time ~60-120s (slower than Clark electrode)</text>
    </svg>
    <div className="p-3 rounded-lg border border-border text-sm">
      <p className="font-semibold text-foreground">Key principle</p>
      <p className="text-muted-foreground text-xs mt-1">The Teflon membrane is permeable to CO₂ but impermeable to H⁺ and HCO₃⁻. This isolates the measurement from blood pH, making it specific for PCO₂. The logarithmic relationship means calibration uses two known CO₂ concentrations (typically 5% and 10%).</p>
    </div>
  </div>
);

const GalvanicFuelCellDiagram = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-serif font-bold text-foreground">Galvanic Fuel Cell (O₂ Analyser)</h3>
      <p className="text-sm text-muted-foreground">A self-generating electrochemical cell that produces a voltage proportional to PO₂ — no external power supply required. Used in anaesthetic machines for FiO₂ monitoring.</p>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowAnimation(!showAnimation)}
          className="text-xs px-3 py-1 rounded-md border border-border bg-card hover:bg-accent transition-colors"
        >
          {showAnimation ? "Pause" : "Animate"} current flow
        </button>
      </div>
      <svg viewBox="0 0 520 400" className="w-full max-w-lg mx-auto">
        <text x="260" y="20" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Galvanic (Fuel Cell) Oxygen Analyser</text>

        {/* Cell housing */}
        <rect x="80" y="35" width="360" height="280" rx="12" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />

        {/* KOH electrolyte */}
        <rect x="110" y="100" width="300" height="160" rx="8" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="260" y="125" textAnchor="middle" className="fill-primary text-[9px]">KOH Electrolyte</text>

        {/* Gold cathode (mesh) */}
        <rect x="140" y="140" width="20" height="100" rx="3" fill="hsl(var(--chart-4) / 0.6)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="150" y="135" textAnchor="middle" className="fill-foreground text-[8px] font-bold">Au</text>
        <text x="150" y="255" textAnchor="middle" className="fill-foreground text-[7px]">Cathode</text>
        {/* Mesh lines */}
        <line x1="143" y1="155" x2="157" y2="155" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        <line x1="143" y1="170" x2="157" y2="170" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        <line x1="143" y1="185" x2="157" y2="185" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        <line x1="143" y1="200" x2="157" y2="200" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        <line x1="143" y1="215" x2="157" y2="215" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
        <line x1="143" y1="230" x2="157" y2="230" stroke="hsl(var(--foreground))" strokeWidth="0.5" />

        {/* Lead anode */}
        <rect x="350" y="140" width="30" height="100" rx="3" fill="hsl(var(--muted-foreground) / 0.4)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="365" y="135" textAnchor="middle" className="fill-foreground text-[8px] font-bold">Pb</text>
        <text x="365" y="255" textAnchor="middle" className="fill-foreground text-[7px]">Anode</text>

        {/* O₂-permeable membrane */}
        <rect x="110" y="270" width="300" height="12" rx="2" fill="hsl(var(--accent))" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="260" y="280" textAnchor="middle" className="fill-foreground text-[7px] font-semibold">O₂-permeable membrane (PTFE)</text>

        {/* Gas inlet */}
        <rect x="160" y="290" width="200" height="20" rx="4" fill="hsl(var(--destructive) / 0.1)" stroke="hsl(var(--destructive))" strokeWidth="1" />
        <text x="260" y="304" textAnchor="middle" className="fill-destructive text-[9px] font-semibold">Gas mixture (O₂ + N₂O + volatile)</text>

        {/* Voltmeter / ammeter */}
        <line x1="150" y1="90" x2="150" y2="55" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="365" y1="90" x2="365" y2="55" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="150" y1="55" x2="220" y2="55" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="300" y1="55" x2="365" y2="55" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <circle cx="260" cy="55" r="16" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="260" y="52" textAnchor="middle" className="fill-foreground text-[7px] font-bold">EMF</text>
        <text x="260" y="62" textAnchor="middle" className="fill-foreground text-[6px]">~mV</text>
        <line x1="220" y1="55" x2="244" y2="55" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="276" y1="55" x2="300" y2="55" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* Animated O₂ and electron flow */}
        {showAnimation && (
          <>
            {/* O₂ molecules rising through membrane */}
            <circle cx="180" cy="290" r="4" fill="hsl(var(--destructive))" opacity="0.7">
              <animate attributeName="cy" values="295;180;180" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.7;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="210" cy="290" r="4" fill="hsl(var(--destructive))" opacity="0.7">
              <animate attributeName="cy" values="295;170;170" dur="2.3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0.7;0" dur="2.3s" repeatCount="indefinite" />
            </circle>
            {/* Electron flow arrows in wire */}
            <circle cx="150" cy="80" r="3" fill="hsl(var(--primary))">
              <animate attributeName="cx" values="150;260;365" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="cy" values="80;45;80" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* Reactions */}
        <text x="260" y="340" textAnchor="middle" className="fill-muted-foreground text-[9px]">Cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻</text>
        <text x="260" y="355" textAnchor="middle" className="fill-muted-foreground text-[9px]">Anode: 2Pb + 4OH⁻ → 2Pb(OH)₂ + 4e⁻</text>
        <text x="260" y="375" textAnchor="middle" className="fill-muted-foreground text-[8px]">Self-generating — no external voltage. Lead is consumed → finite lifespan (~1 year)</text>
        <text x="260" y="390" textAnchor="middle" className="fill-muted-foreground text-[8px]">Response time ~20-30s. Slow enough to avoid breath-by-breath fluctuation.</text>
      </svg>
      <div className="grid sm:grid-cols-2 gap-2 text-sm">
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">Key differences from Clark electrode</p>
          <p className="text-muted-foreground text-xs mt-1">No external power needed (self-generating EMF). Lead anode is consumed over time, giving a limited cell life (~6-12 months). Used for gas analysis, not blood.</p>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">Clinical placement</p>
          <p className="text-muted-foreground text-xs mt-1">Positioned in the inspiratory limb of the breathing circuit. Measures FiO₂ continuously. Must be calibrated to room air (21%) and 100% O₂. N₂O does NOT affect the reading.</p>
        </div>
      </div>
    </div>
  );
};

const NernstEquationDiagram = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-serif font-bold text-foreground">The Nernst Equation</h3>
    <p className="text-sm text-muted-foreground">Relates electrode potential to ion concentration — the fundamental equation behind all potentiometric measurements in the ABG analyser.</p>
    <svg viewBox="0 0 600 520" className="w-full max-w-2xl mx-auto">
      {/* Main equation */}
      <rect x="60" y="10" width="480" height="65" rx="12" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="300" y="38" textAnchor="middle" className="fill-primary text-[18px] font-bold">E = E₀ + (RT / nF) × ln[H⁺]</text>
      <text x="300" y="60" textAnchor="middle" className="fill-muted-foreground text-[10px]">General form: E = E₀ − (RT / nF) × ln(Q)  where Q = [products]/[reactants]</text>

      {/* Variable breakdown */}
      <text x="300" y="100" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Variable Definitions</text>
      {[
        { symbol: "E", meaning: "Measured electrode potential (mV)", value: "Varies with [H⁺]" },
        { symbol: "E₀", meaning: "Standard electrode potential", value: "Reference constant" },
        { symbol: "R", meaning: "Universal gas constant", value: "8.314 J·mol⁻¹·K⁻¹" },
        { symbol: "T", meaning: "Absolute temperature", value: "310 K (37°C)" },
        { symbol: "n", meaning: "Number of electrons transferred", value: "1 (for H⁺)" },
        { symbol: "F", meaning: "Faraday constant", value: "96,485 C·mol⁻¹" },
      ].map((v, i) => (
        <g key={v.symbol}>
          <rect x="60" y={110 + i * 28} width="480" height="26" rx="4" fill={i % 2 === 0 ? "hsl(var(--secondary)/0.2)" : "transparent"} />
          <text x="105" y={127 + i * 28} textAnchor="middle" className="fill-primary text-[12px] font-bold">{v.symbol}</text>
          <text x="270" y={127 + i * 28} textAnchor="middle" className="fill-foreground text-[10px]">{v.meaning}</text>
          <text x="480" y={127 + i * 28} textAnchor="middle" className="fill-muted-foreground text-[9px]">{v.value}</text>
        </g>
      ))}

      {/* Nernst slope derivation */}
      <rect x="60" y="290" width="480" height="90" rx="10" fill="hsl(var(--accent)/0.08)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
      <text x="300" y="312" textAnchor="middle" className="fill-foreground text-[12px] font-bold">The Nernst Slope at 37°C</text>
      <text x="300" y="335" textAnchor="middle" className="fill-accent text-[14px] font-bold">RT/nF = (8.314 × 310) / (1 × 96,485) = 0.02669 V ≈ 26.7 mV</text>
      <text x="300" y="355" textAnchor="middle" className="fill-muted-foreground text-[10px]">Converting to log₁₀: multiply by 2.303 → 2.303 × 26.7 = 61.5 mV per pH unit</text>
      <text x="300" y="372" textAnchor="middle" className="fill-foreground text-[11px] font-bold">∴ Each 1 pH unit change → 61.5 mV change at 37°C</text>

      {/* Clinical application */}
      <text x="300" y="405" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Clinical Significance</text>
      {[
        "The pH glass electrode generates 61.5 mV per pH unit — this is the theoretical 'Nernst slope'",
        "During calibration, measured slope should be 95–105% of 61.5 mV — outside this range → replace electrode",
        "Temperature dependence: slope ∝ T (Kelvin) — if analyser not at 37°C, slope changes → inaccurate pH",
        "Applies to ALL potentiometric electrodes (pH and Severinghaus PCO₂) — NOT to amperometric (Clark PO₂)",
        "The Nernst equation also governs membrane potentials, equilibrium potentials (Eₖ, Eₙₐ), and ECG voltage generation",
      ].map((t, i) => (
        <text key={i} x="75" y={425 + i * 18} className="fill-muted-foreground text-[9.5px]">• {t}</text>
      ))}
    </svg>

    <div className="grid sm:grid-cols-2 gap-3">
      <div className="p-3 rounded-lg border border-border">
        <p className="font-semibold text-foreground text-sm">Nernst in Physiology</p>
        <p className="text-muted-foreground text-xs mt-1">
          The Nernst equation calculates the <strong>equilibrium potential</strong> for individual ions across cell membranes:
          E = (RT/zF) × ln([ion]outside/[ion]inside). For K⁺ at 37°C: Eₖ ≈ −90 mV. For Na⁺: Eₙₐ ≈ +60 mV.
          The Goldman equation extends this to multiple ions simultaneously.
        </p>
      </div>
      <div className="p-3 rounded-lg border border-border">
        <p className="font-semibold text-foreground text-sm">Calibration Implication</p>
        <p className="text-muted-foreground text-xs mt-1">
          Two-point calibration uses buffers at pH 6.840 and pH 7.384. The voltage difference should be
          (7.384 − 6.840) × 61.5 = <strong>33.5 mV</strong>. If measured slope deviates &gt;5% from theoretical,
          the electrode is failing and must be replaced.
        </p>
      </div>
    </div>
  </div>
);

const ABGAnalyserDiagram = () => (
  <div className="space-y-8 mb-10">
    <div className="p-4 rounded-lg border border-border bg-card">
      <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Electrochemical Measurement Principles</h2>
      <p className="text-sm text-muted-foreground">
        An ABG analyser contains three electrodes in a thermostatted chamber at 37°C. Each electrode uses a different electrochemical principle to measure pH, PO₂, and PCO₂. The galvanic fuel cell uses the same oxygen reduction chemistry but in a self-generating configuration for gas analysis.
      </p>
    </div>

    <Tabs defaultValue="ph" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="ph" className="text-xs">pH Electrode</TabsTrigger>
        <TabsTrigger value="nernst" className="text-xs">Nernst Eq.</TabsTrigger>
        <TabsTrigger value="clark" className="text-xs">Clark (PO₂)</TabsTrigger>
        <TabsTrigger value="co2" className="text-xs">PCO₂</TabsTrigger>
        <TabsTrigger value="galvanic" className="text-xs">Fuel Cell</TabsTrigger>
      </TabsList>
      <TabsContent value="ph"><PHElectrodeDiagram /></TabsContent>
      <TabsContent value="nernst"><NernstEquationDiagram /></TabsContent>
      <TabsContent value="clark"><ClarkElectrodeDiagram /></TabsContent>
      <TabsContent value="co2"><SeveringhausCO2Diagram /></TabsContent>
      <TabsContent value="galvanic"><GalvanicFuelCellDiagram /></TabsContent>
    </Tabs>
  </div>
);

export default ABGAnalyserDiagram;
