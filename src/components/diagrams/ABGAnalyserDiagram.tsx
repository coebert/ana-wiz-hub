import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

/* ─────────── pH (Sanz) Glass Electrode ─────────── */
const PHElectrodeDiagram = () => {
  const [animating, setAnimating] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-serif font-bold text-foreground">Sanz (Glass) pH Electrode</h3>
      <p className="text-sm text-muted-foreground">
        A potentiometric system measuring H⁺ activity via voltage across a pH-sensitive glass membrane. No current flows — only a potential difference is measured.
      </p>

      <div className="flex justify-end mb-1">
        <button onClick={() => setAnimating(!animating)} className="text-xs px-3 py-1 rounded-md border border-border bg-card hover:bg-accent transition-colors">
          {animating ? "Pause" : "Animate"} H⁺ exchange
        </button>
      </div>

      <svg viewBox="0 0 560 480" className="w-full max-w-2xl mx-auto">
        <defs>
          <marker id="arrPH" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(var(--primary))" /></marker>
          <marker id="arrRed" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(var(--destructive))" /></marker>
          <marker id="arrFg" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(var(--foreground))" /></marker>
        </defs>

        <text x="280" y="18" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">pH Glass Electrode — Potentiometric Measurement</text>

        {/* Outer housing */}
        <rect x="50" y="30" width="460" height="340" rx="14" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />

        {/* ── Reference half-cell ── */}
        <rect x="80" y="60" width="160" height="280" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="160" y="80" textAnchor="middle" className="fill-primary text-[10px] font-bold">REFERENCE HALF-CELL</text>

        {/* Ag/AgCl wire */}
        <rect x="148" y="90" width="24" height="6" rx="2" fill="hsl(var(--muted-foreground)/0.7)" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="160" y1="96" x2="160" y2="160" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
        <text x="160" y="107" textAnchor="middle" className="fill-foreground text-[8px] font-bold">Ag wire</text>
        <text x="160" y="117" textAnchor="middle" className="fill-muted-foreground text-[7px]">coated AgCl</text>

        {/* KCl solution */}
        <rect x="100" y="140" width="120" height="120" rx="5" fill="hsl(var(--primary)/0.12)" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4,2" />
        <text x="160" y="175" textAnchor="middle" className="fill-primary text-[9px] font-semibold">Saturated KCl</text>
        <text x="160" y="188" textAnchor="middle" className="fill-primary text-[8px]">(3.5 mol/L)</text>

        {/* KCl ions */}
        <text x="120" y="210" textAnchor="middle" className="fill-primary text-[8px]">K⁺</text>
        <text x="145" y="225" textAnchor="middle" className="fill-primary text-[8px]">Cl⁻</text>
        <text x="190" y="215" textAnchor="middle" className="fill-primary text-[8px]">K⁺</text>
        <text x="165" y="240" textAnchor="middle" className="fill-primary text-[8px]">Cl⁻</text>

        {/* Liquid junction */}
        <rect x="110" y="275" width="100" height="18" rx="3" fill="hsl(var(--accent)/0.5)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="160" y="288" textAnchor="middle" className="fill-foreground text-[7px] font-semibold">Liquid junction</text>
        {/* KCl leaking out */}
        {animating && (
          <>
            <circle cx="130" cy="293" r="3" fill="hsl(var(--primary))">
              <animate attributeName="cy" values="290;320;340" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.5;0" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="170" cy="293" r="3" fill="hsl(var(--primary))">
              <animate attributeName="cy" values="290;325;345" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0.5;0" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="205" y="310" className="fill-primary text-[7px]">
              <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
              KCl diffuses out
            </text>
          </>
        )}

        {/* Reference equation */}
        <text x="160" y="155" textAnchor="middle" className="fill-muted-foreground text-[7px]">Ag ⇌ Ag⁺ + e⁻</text>
        <text x="160" y="163" textAnchor="middle" className="fill-muted-foreground text-[7px]">Ag⁺ + Cl⁻ ⇌ AgCl</text>

        {/* ── Measuring half-cell ── */}
        <rect x="320" y="60" width="160" height="280" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="400" y="80" textAnchor="middle" className="fill-destructive text-[10px] font-bold">MEASURING HALF-CELL</text>

        {/* Ag/AgCl wire */}
        <rect x="388" y="90" width="24" height="6" rx="2" fill="hsl(var(--muted-foreground)/0.7)" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="400" y1="96" x2="400" y2="160" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
        <text x="400" y="107" textAnchor="middle" className="fill-foreground text-[8px] font-bold">Ag/AgCl</text>

        {/* Internal buffer */}
        <rect x="340" y="140" width="120" height="80" rx="5" fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="4,2" />
        <text x="400" y="165" textAnchor="middle" className="fill-destructive text-[8px] font-semibold">Internal buffer</text>
        <text x="400" y="178" textAnchor="middle" className="fill-destructive text-[7px]">pH 6.840 (fixed)</text>
        <text x="400" y="190" textAnchor="middle" className="fill-muted-foreground text-[7px]">Known [H⁺]</text>

        {/* pH-sensitive glass membrane */}
        <ellipse cx="400" cy="260" rx="45" ry="22" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="2" />
        <text x="400" y="256" textAnchor="middle" className="fill-destructive text-[8px] font-bold">pH-sensitive</text>
        <text x="400" y="268" textAnchor="middle" className="fill-destructive text-[8px] font-bold">glass bulb</text>

        {/* Glass membrane detail — hydrated gel layers */}
        <rect x="370" y="285" width="60" height="8" rx="1" fill="hsl(var(--destructive)/0.3)" stroke="hsl(var(--destructive))" strokeWidth="0.75" />
        <text x="400" y="291" textAnchor="middle" className="fill-destructive text-[5px]">hydrated gel layer</text>
        <rect x="375" y="295" width="50" height="4" rx="1" fill="hsl(var(--foreground)/0.3)" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x="400" y="298" textAnchor="middle" className="fill-foreground text-[4px]">dry glass</text>
        <rect x="370" y="301" width="60" height="8" rx="1" fill="hsl(var(--destructive)/0.3)" stroke="hsl(var(--destructive))" strokeWidth="0.75" />
        <text x="400" y="307" textAnchor="middle" className="fill-destructive text-[5px]">hydrated gel layer</text>

        {/* H⁺ exchange arrows on glass membrane */}
        {animating && (
          <>
            {/* H⁺ from blood → outer gel layer */}
            <circle cx="380" cy="340" r="4" fill="hsl(var(--destructive))">
              <animate attributeName="cy" values="345;315;310" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0.9;0" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="410" cy="340" r="4" fill="hsl(var(--destructive))">
              <animate attributeName="cy" values="348;318;312" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.9;0.9;0" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <text x="430" y="325" className="fill-destructive text-[7px] font-semibold">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              H⁺ exchange
            </text>
            {/* Li⁺/Na⁺ migration inside glass */}
            <circle cx="395" cy="296" r="2.5" fill="hsl(var(--accent))">
              <animate attributeName="cx" values="390;400;410" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="445" y="298" className="fill-accent text-[6px]">Li⁺ migrates</text>
          </>
        )}

        {/* Voltmeter */}
        <line x1="160" y1="55" x2="160" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="400" y1="55" x2="400" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="160" y1="40" x2="240" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="320" y1="40" x2="400" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <circle cx="280" cy="40" r="18" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <text x="280" y="38" textAnchor="middle" className="fill-foreground text-[8px] font-bold">High Z</text>
        <text x="280" y="48" textAnchor="middle" className="fill-foreground text-[7px]">mV</text>
        <line x1="240" y1="40" x2="262" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="298" y1="40" x2="320" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="280" y="28" textAnchor="middle" className="fill-muted-foreground text-[6px]">(10¹² Ω input impedance)</text>

        {/* Blood sample */}
        <rect x="80" y="350" width="430" height="28" rx="5" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="280" y="369" textAnchor="middle" className="fill-destructive text-[10px] font-semibold">Blood Sample — unknown [H⁺]</text>

        {/* Nernst at bottom */}
        <text x="280" y="410" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">E = E₀ + (2.303 RT/nF) × log₁₀[H⁺]</text>
        <text x="280" y="425" textAnchor="middle" className="fill-muted-foreground text-[9px]">At 37°C: ΔE = 61.5 mV per pH unit change (Nernst slope)</text>

        {/* No current indicator */}
        <text x="280" y="460" textAnchor="middle" className="fill-accent text-[9px] font-semibold">POTENTIOMETRIC — measures voltage, no current flows</text>
        <text x="280" y="475" textAnchor="middle" className="fill-muted-foreground text-[8px]">Requires high-impedance voltmeter (10¹² Ω) to prevent current draw through glass</text>
      </svg>

      {/* Step-by-step explanation */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground">Step-by-Step Ion Movement</h4>
        <div className="space-y-1.5">
          {[
            { step: "1", text: "H⁺ ions from the blood sample contact the outer hydrated gel layer of the pH-sensitive glass membrane" },
            { step: "2", text: "H⁺ ions exchange with Li⁺/Na⁺ ions in the outer gel layer of the glass — H⁺ displaces metal cations from fixed silicate sites" },
            { step: "3", text: "Displaced Li⁺/Na⁺ ions migrate through the dry glass interior (charge carriers within the glass matrix)" },
            { step: "4", text: "At the inner gel layer, Li⁺/Na⁺ exchange with H⁺ from the internal buffer (pH 6.840)" },
            { step: "5", text: "The different [H⁺] on each side of the glass creates a potential difference (boundary potential) across the membrane" },
            { step: "6", text: "This potential is measured against the stable reference electrode (Ag/AgCl in saturated KCl) using a high-impedance voltmeter" },
            { step: "7", text: "The voltage difference follows the Nernst equation: 61.5 mV change per pH unit at 37°C" },
          ].map((s) => (
            <div key={s.step} className="flex gap-2 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">{s.step}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-2 text-sm">
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">Glass membrane composition</p>
          <p className="text-muted-foreground text-xs mt-1">Lithium/cesium-doped silicate glass. The hydrated gel layers (formed by soaking in aqueous solution) are where H⁺ exchange occurs. Only H⁺ can enter the gel layer — selectivity arises from the small ionic radius of H⁺.</p>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">Why high impedance?</p>
          <p className="text-muted-foreground text-xs mt-1">Glass has enormous electrical resistance (~10⁸ Ω). Any current flow through the glass would alter H⁺ distribution and corrupt the measurement. The voltmeter must have input impedance ≥10¹² Ω to draw negligible current.</p>
        </div>
      </div>
    </div>
  );
};

/* ─────────── Clark Electrode (PO₂) ─────────── */
const ClarkElectrodeDiagram = () => {
  const [animating, setAnimating] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-serif font-bold text-foreground">Clark Polarographic Electrode (PO₂)</h3>
      <p className="text-sm text-muted-foreground">
        An amperometric electrode that reduces dissolved O₂ at a platinum cathode held at −0.6V. The resulting current is directly proportional to PO₂.
      </p>

      <div className="flex justify-end mb-1">
        <button onClick={() => setAnimating(!animating)} className="text-xs px-3 py-1 rounded-md border border-border bg-card hover:bg-accent transition-colors">
          {animating ? "Pause" : "Animate"} electron & O₂ flow
        </button>
      </div>

      <svg viewBox="0 0 580 520" className="w-full max-w-2xl mx-auto">
        <defs>
          <marker id="arrClarkB" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(var(--primary))" /></marker>
          <marker id="arrClarkR" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(var(--destructive))" /></marker>
          <marker id="arrElec" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(var(--chart-4))" /></marker>
        </defs>

        <text x="290" y="18" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Clark Polarographic Electrode — Amperometric Measurement</text>

        {/* Housing */}
        <rect x="60" y="35" width="460" height="360" rx="14" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />

        {/* Electrolyte */}
        <rect x="100" y="100" width="380" height="220" rx="10" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="290" y="120" textAnchor="middle" className="fill-primary text-[10px] font-semibold">KCl / Phosphate Buffer Electrolyte</text>

        {/* ── Platinum cathode ── */}
        <rect x="150" y="145" width="18" height="145" rx="3" fill="hsl(var(--foreground)/0.85)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="159" y="140" textAnchor="middle" className="fill-foreground text-[9px] font-bold">Pt</text>
        <text x="159" y="305" textAnchor="middle" className="fill-foreground text-[8px] font-semibold">CATHODE (−)</text>

        {/* Cathode reaction zone */}
        <rect x="130" y="250" width="58" height="35" rx="4" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="3,2" />
        <text x="159" y="265" textAnchor="middle" className="fill-destructive text-[7px] font-bold">REDUCTION</text>
        <text x="159" y="275" textAnchor="middle" className="fill-destructive text-[6px]">O₂+2H₂O+4e⁻</text>
        <text x="159" y="283" textAnchor="middle" className="fill-destructive text-[6px]">→ 4OH⁻</text>

        {/* ── Ag/AgCl anode ── */}
        <rect x="400" y="145" width="24" height="145" rx="4" fill="hsl(var(--muted-foreground)/0.4)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="412" y="140" textAnchor="middle" className="fill-foreground text-[9px] font-bold">Ag/AgCl</text>
        <text x="412" y="305" textAnchor="middle" className="fill-foreground text-[8px] font-semibold">ANODE (+)</text>

        {/* Anode reaction zone */}
        <rect x="385" y="250" width="54" height="35" rx="4" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" />
        <text x="412" y="265" textAnchor="middle" className="fill-primary text-[7px] font-bold">OXIDATION</text>
        <text x="412" y="275" textAnchor="middle" className="fill-primary text-[6px]">4Ag → 4Ag⁺+4e⁻</text>
        <text x="412" y="283" textAnchor="middle" className="fill-primary text-[6px]">Ag⁺+Cl⁻→AgCl</text>

        {/* Polypropylene membrane */}
        <rect x="100" y="330" width="380" height="16" rx="3" fill="hsl(var(--accent)/0.5)" stroke="hsl(var(--accent))" strokeWidth="2" />
        <text x="290" y="342" textAnchor="middle" className="fill-foreground text-[8px] font-bold">O₂-PERMEABLE MEMBRANE (polypropylene)</text>
        <text x="290" y="356" textAnchor="middle" className="fill-muted-foreground text-[7px]">Permeable to O₂ — impermeable to proteins, cells, ions</text>

        {/* Blood sample */}
        <rect x="100" y="360" width="380" height="30" rx="5" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="290" y="380" textAnchor="middle" className="fill-destructive text-[10px] font-semibold">Blood Sample — dissolved O₂</text>

        {/* Battery */}
        <line x1="159" y1="90" x2="159" y2="60" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="412" y1="90" x2="412" y2="60" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="159" y1="60" x2="240" y2="60" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="340" y1="60" x2="412" y2="60" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <rect x="240" y="48" width="100" height="24" rx="5" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <text x="290" y="58" textAnchor="middle" className="fill-foreground text-[8px] font-bold">−0.6 V DC</text>
        <text x="290" y="68" textAnchor="middle" className="fill-foreground text-[6px]">(polarizing voltage)</text>

        {/* Current/ammeter label */}
        <text x="290" y="85" textAnchor="middle" className="fill-accent text-[8px] font-semibold">AMMETER: current (nA) ∝ PO₂</text>

        {/* ── Animations ── */}
        {animating && (
          <>
            {/* O₂ molecules rising from blood through membrane to cathode */}
            {[0, 1, 2].map((i) => (
              <g key={`o2-${i}`}>
                <circle cx={140 + i * 20} cy={370} r="5" fill="hsl(var(--destructive))" opacity="0.8">
                  <animate attributeName="cy" values="370;335;265;265" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.8;0.6;0" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                </circle>
                <text x={140 + i * 20} y={370} textAnchor="middle" className="fill-card text-[5px] font-bold">
                  <animate attributeName="y" values="372;337;267;267" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0.8;0" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" />
                  O₂
                </text>
              </g>
            ))}

            {/* OH⁻ produced at cathode — spreading into solution */}
            {[0, 1].map((i) => (
              <circle key={`oh-${i}`} cx={159} cy={270} r="3.5" fill="hsl(var(--primary))">
                <animate attributeName="cx" values="159;{200 + i * 40};{230 + i * 60}" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="cy" values="270;240;200" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.7;0" dur="2.5s" repeatCount="indefinite" />
              </circle>
            ))}
            <text x="210" y="230" className="fill-primary text-[7px]">
              <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
              OH⁻
            </text>

            {/* Electrons flowing in external circuit: cathode → battery → anode */}
            {/* Conventional current: anode → cathode internally; electrons opposite in wire */}
            <circle cx="159" cy="60" r="4" fill="hsl(var(--chart-4))">
              <animate attributeName="cx" values="412;340;240;159" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="60;60;60;60" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="60" r="4" fill="hsl(var(--chart-4))" opacity="0.6">
              <animate attributeName="cx" values="412;340;240;159" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </circle>

            {/* Electron direction labels */}
            <text x="290" y="42" textAnchor="middle" className="fill-chart-4 text-[7px] font-bold">e⁻ flow →→→ (anode to cathode in wire)</text>

            {/* Cl⁻ moving to anode */}
            <circle cx="350" cy="200" r="3" fill="hsl(var(--primary))">
              <animate attributeName="cx" values="300;350;400" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.7;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="350" y="195" className="fill-primary text-[6px]">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              Cl⁻→Ag
            </text>
          </>
        )}

        {/* Equations */}
        <text x="290" y="420" textAnchor="middle" className="fill-foreground text-[10px] font-bold">Half-Reactions</text>
        <text x="290" y="438" textAnchor="middle" className="fill-destructive text-[10px]">Cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻ (reduction)</text>
        <text x="290" y="456" textAnchor="middle" className="fill-primary text-[10px]">Anode: 4Ag + 4Cl⁻ → 4AgCl + 4e⁻ (oxidation)</text>
        <text x="290" y="474" textAnchor="middle" className="fill-foreground text-[9px]">Overall: 4Ag + O₂ + 2H₂O + 4Cl⁻ → 4AgCl + 4OH⁻</text>
        <text x="290" y="492" textAnchor="middle" className="fill-accent text-[9px] font-semibold">AMPEROMETRIC — measures current. O₂ is consumed during measurement.</text>
        <text x="290" y="508" textAnchor="middle" className="fill-muted-foreground text-[8px]">The membrane limits O₂ diffusion rate → current ∝ PO₂ (not total O₂)</text>
      </svg>

      {/* Step-by-step */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground">Step-by-Step: How PO₂ is Measured</h4>
        <div className="space-y-1.5">
          {[
            { step: "1", color: "bg-destructive/20 text-destructive", text: "Dissolved O₂ from blood diffuses down its partial pressure gradient through the polypropylene membrane into the electrolyte" },
            { step: "2", color: "bg-destructive/20 text-destructive", text: "O₂ reaches the platinum cathode surface, where −0.6V is applied" },
            { step: "3", color: "bg-destructive/20 text-destructive", text: "At the cathode (REDUCTION): O₂ + 2H₂O + 4e⁻ → 4OH⁻. Each O₂ molecule gains 4 electrons" },
            { step: "4", color: "bg-chart-4/20 text-chart-4", text: "Electrons consumed at the cathode are replenished from the external circuit (supplied by the battery)" },
            { step: "5", color: "bg-primary/20 text-primary", text: "At the anode (OXIDATION): 4Ag → 4Ag⁺ + 4e⁻. Silver atoms lose electrons, generating current in the external circuit" },
            { step: "6", color: "bg-primary/20 text-primary", text: "Ag⁺ ions immediately combine with Cl⁻ from KCl electrolyte: Ag⁺ + Cl⁻ → AgCl (deposited on anode surface)" },
            { step: "7", color: "bg-chart-4/20 text-chart-4", text: "Electrons flow from anode → external wire → battery → cathode. The ammeter measures this current (nanoamps)" },
            { step: "8", color: "bg-accent/20 text-accent", text: "The polypropylene membrane controls O₂ diffusion rate. Current is proportional to PO₂, not total O₂ content" },
          ].map((s) => (
            <div key={s.step} className="flex gap-2 items-start">
              <span className={`flex-shrink-0 w-5 h-5 rounded-full ${s.color} text-[10px] font-bold flex items-center justify-center`}>{s.step}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-2 text-sm">
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">Why −0.6V?</p>
          <p className="text-muted-foreground text-xs mt-1">This sits on the "plateau" of the current-voltage curve. At this voltage, all O₂ reaching the cathode is immediately reduced, so current depends only on O₂ diffusion rate (= PO₂), not on applied voltage.</p>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">O₂ consumption</p>
          <p className="text-muted-foreground text-xs mt-1">The electrode consumes O₂ — creating a "dead zone" around the cathode. Stirring or flowing fresh sample prevents depletion. In static blood, PO₂ reads falsely low over time.</p>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">Response time</p>
          <p className="text-muted-foreground text-xs mt-1">~20–30 seconds, determined by membrane thickness and permeability. Thinner membrane = faster response but less stability and more consumption.</p>
        </div>
      </div>
    </div>
  );
};

/* ─────────── Severinghaus CO₂ Electrode ─────────── */
const SeveringhausCO2Diagram = () => {
  const [animating, setAnimating] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-serif font-bold text-foreground">Severinghaus CO₂ Electrode</h3>
      <p className="text-sm text-muted-foreground">
        A modified pH electrode. CO₂ diffuses across a Teflon membrane into a thin NaHCO₃ film, changing its pH. The pH change is measured by a glass electrode and is proportional to log PCO₂.
      </p>

      <div className="flex justify-end mb-1">
        <button onClick={() => setAnimating(!animating)} className="text-xs px-3 py-1 rounded-md border border-border bg-card hover:bg-accent transition-colors">
          {animating ? "Pause" : "Animate"} CO₂ diffusion
        </button>
      </div>

      <svg viewBox="0 0 560 460" className="w-full max-w-2xl mx-auto">
        <defs>
          <marker id="arrSevR" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(var(--destructive))" /></marker>
          <marker id="arrSevP" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(var(--primary))" /></marker>
        </defs>

        <text x="280" y="18" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Severinghaus PCO₂ Electrode — Modified pH Electrode</text>

        {/* Outer housing */}
        <rect x="60" y="30" width="440" height="320" rx="14" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />

        {/* pH glass electrode (inner) */}
        <rect x="140" y="55" width="280" height="180" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="280" y="75" textAnchor="middle" className="fill-primary text-[10px] font-bold">INNER pH GLASS ELECTRODE</text>
        <text x="280" y="88" textAnchor="middle" className="fill-muted-foreground text-[8px]">(Identical to standalone Sanz electrode)</text>

        {/* Reference + measuring inside */}
        <rect x="160" y="100" width="100" height="70" rx="5" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="210" y="120" textAnchor="middle" className="fill-primary text-[8px] font-semibold">Ref</text>
        <text x="210" y="132" textAnchor="middle" className="fill-primary text-[7px]">Ag/AgCl</text>
        <text x="210" y="142" textAnchor="middle" className="fill-primary text-[7px]">in KCl</text>
        <line x1="210" y1="148" x2="210" y2="160" stroke="hsl(var(--primary))" strokeWidth="1" />

        <rect x="300" y="100" width="100" height="70" rx="5" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1" />
        <text x="350" y="120" textAnchor="middle" className="fill-destructive text-[8px] font-semibold">Meas</text>
        <text x="350" y="132" textAnchor="middle" className="fill-destructive text-[7px]">Ag/AgCl</text>
        <text x="350" y="142" textAnchor="middle" className="fill-destructive text-[7px]">+ glass bulb</text>

        {/* Glass bulb */}
        <ellipse cx="350" cy="210" rx="30" ry="16" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="2" />
        <text x="350" y="214" textAnchor="middle" className="fill-destructive text-[7px] font-bold">pH glass</text>

        {/* Voltmeter */}
        <line x1="210" y1="95" x2="210" y2="58" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="350" y1="95" x2="350" y2="58" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="210" y1="58" x2="260" y2="58" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="300" y1="58" x2="350" y2="58" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <circle cx="280" cy="58" r="12" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="280" y="62" textAnchor="middle" className="fill-foreground text-[7px] font-bold">mV</text>

        {/* NaHCO₃ thin film */}
        <rect x="100" y="245" width="360" height="40" rx="6" fill="hsl(var(--primary)/0.12)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5,3" />
        <text x="280" y="262" textAnchor="middle" className="fill-primary text-[9px] font-semibold">Thin Film NaHCO₃ + NaCl Solution</text>
        <text x="280" y="276" textAnchor="middle" className="fill-primary text-[7px]">(~20 µm thickness — very thin layer for fast equilibration)</text>

        {/* Reaction equation inside film */}
        <text x="280" y="240" textAnchor="middle" className="fill-foreground text-[9px] font-bold">CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻</text>

        {/* Teflon membrane */}
        <rect x="100" y="295" width="360" height="16" rx="3" fill="hsl(var(--accent)/0.5)" stroke="hsl(var(--accent))" strokeWidth="2" />
        <text x="280" y="307" textAnchor="middle" className="fill-foreground text-[8px] font-bold">TEFLON MEMBRANE</text>
        <text x="280" y="322" textAnchor="middle" className="fill-muted-foreground text-[7px]">Permeable to CO₂ — impermeable to H⁺, HCO₃⁻, proteins</text>

        {/* Blood sample */}
        <rect x="100" y="325" width="360" height="28" rx="5" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="280" y="344" textAnchor="middle" className="fill-destructive text-[10px] font-semibold">Blood Sample — dissolved CO₂</text>

        {/* Animated CO₂ diffusion */}
        {animating && (
          <>
            {/* CO₂ molecules crossing membrane */}
            {[0, 1, 2].map((i) => (
              <g key={`co2-${i}`}>
                <circle cx={220 + i * 60} cy={340} r="5" fill="hsl(var(--destructive))" opacity="0.8">
                  <animate attributeName="cy" values="340;305;265;265" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.8;0.6;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <text x={220 + i * 60} y={342} textAnchor="middle" className="fill-card text-[5px] font-bold">
                  <animate attributeName="y" values="342;307;267;267" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0.8;0" dur={`${2.5 + i * 0.3}s`} repeatCount="indefinite" />
                  CO₂
                </text>
              </g>
            ))}

            {/* H⁺ generated in NaHCO₃ film → hits glass electrode */}
            <circle cx="300" cy="265" r="3.5" fill="hsl(var(--destructive))">
              <animate attributeName="cy" values="270;250;220" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.8;0" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="310" y="252" className="fill-destructive text-[7px] font-bold">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
              H⁺ ↑
            </text>

            {/* HCO₃⁻ produced */}
            <text x="240" y="252" className="fill-primary text-[7px]">
              <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
              HCO₃⁻
            </text>
          </>
        )}

        {/* Equations at bottom */}
        <text x="280" y="380" textAnchor="middle" className="fill-foreground text-[10px] font-bold">Measurement Principle</text>
        <text x="280" y="398" textAnchor="middle" className="fill-muted-foreground text-[9px]">↑PCO₂ → more CO₂ crosses Teflon → more H₂CO₃ → more H⁺ → ↓pH in NaHCO₃ film</text>
        <text x="280" y="416" textAnchor="middle" className="fill-muted-foreground text-[9px]">pH change measured by inner glass electrode: ΔpH ∝ log(PCO₂)</text>
        <text x="280" y="438" textAnchor="middle" className="fill-accent text-[9px] font-semibold">POTENTIOMETRIC — no current flows. Measures voltage change in inner pH electrode.</text>
        <text x="280" y="455" textAnchor="middle" className="fill-muted-foreground text-[8px]">Response time 60–120s (slowest electrode — CO₂ must diffuse AND equilibrate)</text>
      </svg>

      {/* Step-by-step */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground">Step-by-Step: CO₂ → pH → Voltage</h4>
        <div className="space-y-1.5">
          {[
            { step: "1", text: "Dissolved CO₂ from the blood sample diffuses down its partial pressure gradient through the Teflon membrane" },
            { step: "2", text: "The Teflon membrane is selectively permeable to CO₂ — H⁺ and HCO₃⁻ from blood cannot cross (ensuring specificity for PCO₂)" },
            { step: "3", text: "CO₂ enters the thin NaHCO₃ film (~20 µm) and reacts with water: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻" },
            { step: "4", text: "The H⁺ produced lowers the pH of the NaHCO₃ film. Higher blood PCO₂ → more CO₂ crosses → more H⁺ → lower pH" },
            { step: "5", text: "The inner pH glass electrode (identical to the Sanz electrode) detects this pH change as a voltage change (Nernst equation)" },
            { step: "6", text: "The relationship is logarithmic: ΔpH ∝ log(PCO₂), so calibration requires two known CO₂ concentrations (typically 5% and 10%)" },
            { step: "7", text: "Response is slow (60–120s) because CO₂ must diffuse through the membrane AND equilibrate with the NaHCO₃ film" },
          ].map((s) => (
            <div key={s.step} className="flex gap-2 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">{s.step}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-2 text-sm">
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">Why Teflon?</p>
          <p className="text-muted-foreground text-xs mt-1">Teflon (PTFE) is hydrophobic and gas-permeable. It allows CO₂ (a gas) to pass freely but blocks H⁺ and HCO₃⁻ (charged ions in aqueous solution). This ensures the measurement reflects only dissolved CO₂, not blood pH.</p>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">Why so slow?</p>
          <p className="text-muted-foreground text-xs mt-1">Two rate-limiting steps: (1) CO₂ diffusion through the Teflon membrane, and (2) chemical equilibration of the carbonic acid reaction in the NaHCO₃ film. The thin film minimises step 2 but cannot eliminate it.</p>
        </div>
      </div>
    </div>
  );
};

/* ─────────── Galvanic Fuel Cell ─────────── */
const GalvanicFuelCellDiagram = () => {
  const [animating, setAnimating] = useState(false);

  return (
        <div className="space-y-4">
      <h3 className="text-lg font-serif font-bold text-foreground">Galvanic Fuel Cell (O₂ Analyser)</h3>
      <p className="text-sm text-muted-foreground">
        A self-generating electrochemical cell producing voltage proportional to PO₂. No external power needed — the lead anode is consumed over time. Used in anaesthetic machines for continuous FiO₂ monitoring.
      </p>

      <div className="flex justify-end mb-1">
        <button onClick={() => setAnimating(!animating)} className="text-xs px-3 py-1 rounded-md border border-border bg-card hover:bg-accent transition-colors">
          {animating ? "Pause" : "Animate"} galvanic reaction
        </button>
      </div>

      <svg viewBox="0 0 580 480" className="w-full max-w-2xl mx-auto">
        <defs>
          <marker id="arrGalv" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="hsl(var(--chart-4))" /></marker>
        </defs>

        <text x="290" y="18" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Galvanic (Fuel Cell) O₂ Analyser — Self-Generating</text>

        {/* Housing */}
        <rect x="60" y="35" width="460" height="330" rx="14" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="2" />

        {/* KOH electrolyte */}
        <rect x="100" y="110" width="380" height="190" rx="10" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="290" y="135" textAnchor="middle" className="fill-primary text-[10px] font-semibold">KOH Electrolyte (concentrated)</text>

        {/* Gold cathode */}
        <rect x="140" y="155" width="22" height="120" rx="3" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="2" />
        <text x="151" y="148" textAnchor="middle" className="fill-chart-4 text-[9px] font-bold">Au</text>
        <text x="151" y="290" textAnchor="middle" className="fill-foreground text-[8px] font-semibold">CATHODE</text>
        {/* Mesh lines */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1="143" y1={165 + i * 18} x2="159" y2={165 + i * 18} stroke="hsl(var(--chart-4))" strokeWidth="0.75" />
        ))}

        {/* Cathode reaction */}
        <rect x="115" y="235" width="75" height="40" rx="4" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="3,2" />
        <text x="152" y="250" textAnchor="middle" className="fill-destructive text-[6px] font-bold">REDUCTION</text>
        <text x="152" y="260" textAnchor="middle" className="fill-destructive text-[5.5px]">O₂+2H₂O+4e⁻</text>
        <text x="152" y="270" textAnchor="middle" className="fill-destructive text-[5.5px]">→ 4OH⁻</text>

        {/* Lead anode */}
        <rect x="400" y="155" width="35" height="120" rx="5" fill="hsl(var(--muted-foreground)/0.35)" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <text x="417" y="148" textAnchor="middle" className="fill-foreground text-[9px] font-bold">Pb</text>
        <text x="417" y="290" textAnchor="middle" className="fill-foreground text-[8px] font-semibold">ANODE</text>

        {/* Anode reaction */}
        <rect x="385" y="235" width="70" height="40" rx="4" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" />
        <text x="420" y="250" textAnchor="middle" className="fill-primary text-[6px] font-bold">OXIDATION</text>
        <text x="420" y="260" textAnchor="middle" className="fill-primary text-[5.5px]">2Pb+4OH⁻</text>
        <text x="420" y="270" textAnchor="middle" className="fill-primary text-[5.5px]">→ 2Pb(OH)₂+4e⁻</text>

        {/* Pb consumed note */}
        <text x="417" y="185" textAnchor="middle" className="fill-muted-foreground text-[6px]">consumed</text>
        <text x="417" y="193" textAnchor="middle" className="fill-muted-foreground text-[6px]">over time</text>

        {/* PTFE membrane */}
        <rect x="100" y="310" width="380" height="16" rx="3" fill="hsl(var(--accent)/0.5)" stroke="hsl(var(--accent))" strokeWidth="2" />
        <text x="290" y="322" textAnchor="middle" className="fill-foreground text-[8px] font-bold">O₂-PERMEABLE MEMBRANE (PTFE)</text>

        {/* Gas sample */}
        <rect x="100" y="340" width="380" height="28" rx="5" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="290" y="359" textAnchor="middle" className="fill-destructive text-[10px] font-semibold">Breathing Circuit Gas (O₂ + N₂O + volatile)</text>

        {/* EMF meter (no battery!) */}
        <line x1="151" y1="100" x2="151" y2="65" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="417" y1="100" x2="417" y2="65" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="151" y1="65" x2="245" y2="65" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="335" y1="65" x2="417" y2="65" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <circle cx="290" cy="65" r="18" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <text x="290" y="62" textAnchor="middle" className="fill-foreground text-[8px] font-bold">EMF</text>
        <text x="290" y="72" textAnchor="middle" className="fill-foreground text-[6px]">(mV)</text>
        <line x1="245" y1="65" x2="272" y2="65" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="308" y1="65" x2="335" y2="65" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="290" y="50" textAnchor="middle" className="fill-accent text-[8px] font-bold">NO BATTERY — self-generating!</text>

        {/* Animations */}
        {animating && (
          <>
            {/* O₂ molecules from gas through membrane */}
            {[0, 1, 2].map((i) => (
              <g key={`go2-${i}`}>
                <circle cx={160 + i * 30} cy={350} r="5" fill="hsl(var(--destructive))" opacity="0.8">
                  <animate attributeName="cy" values="350;315;240;240" dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0.8;0.6;0" dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" />
                </circle>
                <text x={160 + i * 30} y={352} textAnchor="middle" className="fill-card text-[5px] font-bold">
                  <animate attributeName="y" values="352;317;242;242" dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0.8;0" dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" />
                  O₂
                </text>
              </g>
            ))}

            {/* OH⁻ migrating from cathode to anode */}
            {[0, 1].map((i) => (
              <circle key={`goh-${i}`} cx={160} cy={260} r="4" fill="hsl(var(--primary))">
                <animate attributeName="cx" values="160;280;400" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
                <animate attributeName="cy" values="220;200;250" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
                <animate attributeName="opacity" values="0;0.7;0" dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} />
              </circle>
            ))}
            <text x="280" y="210" className="fill-primary text-[8px] font-semibold">
              <animate attributeName="opacity" values="0;1;0" dur="2.5s" repeatCount="indefinite" />
              OH⁻ →→→
            </text>

            {/* Electrons in external wire: anode → cathode */}
            <circle cx="417" cy="65" r="4" fill="hsl(var(--chart-4))">
              <animate attributeName="cx" values="417;335;245;151" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="350" cy="65" r="4" fill="hsl(var(--chart-4))" opacity="0.6">
              <animate attributeName="cx" values="417;335;245;151" dur="2s" repeatCount="indefinite" begin="0.5s" />
            </circle>
            <text x="290" y="90" textAnchor="middle" className="fill-chart-4 text-[7px] font-bold">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
              ←←← e⁻ flow (anode → cathode in wire)
            </text>
          </>
        )}

        {/* Equations */}
        <text x="290" y="395" textAnchor="middle" className="fill-foreground text-[10px] font-bold">Half-Reactions</text>
        <text x="290" y="413" textAnchor="middle" className="fill-destructive text-[10px]">Cathode (Au): O₂ + 2H₂O + 4e⁻ → 4OH⁻ (reduction)</text>
        <text x="290" y="431" textAnchor="middle" className="fill-primary text-[10px]">Anode (Pb): 2Pb + 4OH⁻ → 2Pb(OH)₂ + 4e⁻ (oxidation)</text>
        <text x="290" y="449" textAnchor="middle" className="fill-foreground text-[9px]">Overall: 2Pb + O₂ + 2H₂O → 2Pb(OH)₂</text>
        <text x="290" y="470" textAnchor="middle" className="fill-accent text-[9px] font-semibold">Lead is CONSUMED → finite cell lifespan (~6–12 months)</text>
      </svg>

      {/* Step-by-step */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-foreground">Step-by-Step: Self-Generating Current</h4>
        <div className="space-y-1.5">
          {[
            { step: "1", text: "O₂ from the breathing circuit gas diffuses through the PTFE membrane into the KOH electrolyte" },
            { step: "2", text: "At the gold cathode (REDUCTION): O₂ + 2H₂O + 4e⁻ → 4OH⁻. O₂ is reduced, consuming electrons" },
            { step: "3", text: "OH⁻ ions produced at the cathode migrate through the KOH electrolyte towards the lead anode" },
            { step: "4", text: "At the lead anode (OXIDATION): 2Pb + 4OH⁻ → 2Pb(OH)₂ + 4e⁻. Lead is oxidised, releasing electrons" },
            { step: "5", text: "The released electrons flow through the external wire from anode → voltmeter → cathode, generating a measurable EMF" },
            { step: "6", text: "The EMF (millivolts) is proportional to the PO₂ of the gas sample. No external battery is required" },
            { step: "7", text: "Lead is irreversibly consumed as Pb(OH)₂ — this limits cell lifespan to ~6–12 months" },
          ].map((s) => (
            <div key={s.step} className="flex gap-2 items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-chart-4/20 text-chart-4 text-[10px] font-bold flex items-center justify-center">{s.step}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-2 text-sm">
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">vs Clark electrode</p>
          <p className="text-muted-foreground text-xs mt-1">No external power (self-generating vs −0.6V). Lead anode consumed (finite life vs indefinite). Measures gas (FiO₂) vs blood (PaO₂). Both use same cathode reaction.</p>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">Clinical placement</p>
          <p className="text-muted-foreground text-xs mt-1">Inspiratory limb of breathing circuit. Calibrated to 21% (air) and 100% O₂. Slow response (~20–30s) avoids breath-by-breath fluctuation. N₂O does NOT interfere.</p>
        </div>
        <div className="p-3 rounded-lg border border-border">
          <p className="font-semibold text-foreground">Why gold cathode?</p>
          <p className="text-muted-foreground text-xs mt-1">Gold is catalytically active for O₂ reduction but chemically inert — it does not corrode or get consumed. The mesh structure maximises surface area for O₂ contact.</p>
        </div>
      </div>
    </div>
  );
};

/* ─────────── Nernst Equation ─────────── */
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

/* ─────────── Main Component ─────────── */
const ABGAnalyserDiagram = () => (
    <DiagramFigure
      id="abg-analyser-diagram"
      title="ABG analyser"
      description="Auto-generated wrapper for the ABG analyser anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
        <div className="space-y-8 mb-10">
      <div className="p-4 rounded-lg border border-border bg-card">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Electrochemical Measurement Principles</h2>
        <p className="text-sm text-muted-foreground">
          An ABG analyser contains three electrodes in a thermostatted chamber at 37°C. Each electrode uses a different electrochemical principle to measure pH, PO₂, and PCO₂. The galvanic fuel cell uses the same oxygen reduction chemistry but in a self-generating configuration for gas analysis. Use the <strong>Animate</strong> buttons to visualise ion and electron movement within each electrode.
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
    </DiagramFigure>
  );

export default ABGAnalyserDiagram;
