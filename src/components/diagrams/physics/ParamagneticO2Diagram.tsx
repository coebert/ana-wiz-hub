import { useState } from "react";
import { cn } from "@/lib/utils";
import { DiagramFigure, svgImgProps } from "./_shared/DiagramFigure";

/* ============================================================
 * Paramagnetic O₂ Analyser
 *
 * Two-tab static SVG diagram:
 *   1) Pauling dumb-bell — classic null-deflection design.
 *   2) Differential-pressure (fast-response) cell — modern
 *      breath-by-breath analyser used in theatre monitors.
 * ============================================================ */

type Mode = "pauling" | "differential";

const TabButton = ({
  active,
  onClick,
  children,
  sublabel,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  sublabel: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "flex-1 min-w-[160px] px-3 py-2 rounded-lg border text-left transition-colors",
      active
        ? "bg-primary text-primary-foreground border-primary shadow-sm"
        : "bg-card text-foreground border-border hover:bg-muted",
    )}
  >
    <div className="text-sm font-semibold">{children}</div>
    <div className={cn("text-xs mt-0.5", active ? "opacity-90" : "text-muted-foreground")}>
      {sublabel}
    </div>
  </button>
);

const PaulingScene = () => (
  <svg
    viewBox="0 0 520 320"
    className="w-full h-auto"
    {...svgImgProps({ id: "paramagnetic-pauling" })}
  >
    <title id="paramagnetic-pauling-title">Pauling dumb-bell paramagnetic O₂ analyser</title>
    <desc id="paramagnetic-pauling-desc">
      Two nitrogen-filled glass spheres on a suspension rotate in a non-uniform magnetic field
      when O₂ in the sample gas is drawn into the field; a mirror reflects a light beam onto a
      photocell which drives a feedback current that holds the dumb-bell stationary.
    </desc>

    {/* chamber */}
    <rect x="120" y="60" width="280" height="200" rx="10"
      fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1.5" />

    {/* magnet poles */}
    <path d="M120 130 L70 110 L70 210 L120 190 Z" fill="hsl(var(--physics) / 0.25)"
      stroke="hsl(var(--physics))" strokeWidth="1.5" />
    <path d="M400 130 L450 110 L450 210 L400 190 Z" fill="hsl(var(--physics) / 0.25)"
      stroke="hsl(var(--physics))" strokeWidth="1.5" />
    <text x="60" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="hsl(var(--physics))">N</text>
    <text x="460" y="165" textAnchor="middle" fontSize="14" fontWeight="700" fill="hsl(var(--physics))">S</text>

    {/* field lines (non-uniform) */}
    {[140, 155, 170, 185].map((y, i) => (
      <path key={i}
        d={`M125 ${y} C 200 ${y - 6 + i * 2}, 320 ${y - 6 + i * 2}, 395 ${y}`}
        fill="none" stroke="hsl(var(--physics) / 0.45)" strokeWidth="1" strokeDasharray="3 3" />
    ))}

    {/* suspension fibre */}
    <line x1="260" y1="60" x2="260" y2="140" stroke="hsl(var(--foreground))" strokeWidth="1" />

    {/* dumb-bell (rotated slightly to show deflection) */}
    <g transform="rotate(-12 260 165)">
      <line x1="200" y1="165" x2="320" y2="165" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <circle cx="200" cy="165" r="18" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <circle cx="320" cy="165" r="18" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <text x="200" y="169" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">N₂</text>
      <text x="320" y="169" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">N₂</text>
      {/* mirror */}
      <rect x="255" y="158" width="10" height="14" fill="hsl(var(--primary))" />
    </g>

    {/* O2 molecules drawn into field */}
    {[{ x: 240, y: 110 }, { x: 280, y: 220 }, { x: 200, y: 230 }, { x: 330, y: 100 }].map((p, i) => (
      <g key={i}>
        <circle cx={p.x} cy={p.y} r="6" fill="hsl(var(--clinical) / 0.7)" />
        <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize="8" fontWeight="700" fill="hsl(var(--clinical-foreground, var(--background)))">O₂</text>
      </g>
    ))}

    {/* light beam + photocell */}
    <line x1="260" y1="60" x2="260" y2="155" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="2 3" />
    <line x1="260" y1="165" x2="200" y2="285" stroke="hsl(var(--accent))" strokeWidth="1.5" />
    <rect x="175" y="280" width="50" height="20" rx="3"
      fill="hsl(var(--card))" stroke="hsl(var(--accent))" strokeWidth="1.5" />
    <text x="200" y="294" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))">photocell</text>

    {/* sample gas inlet */}
    <path d="M120 80 L90 80" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#arrow-p)" />
    <text x="85" y="76" textAnchor="end" fontSize="11" fill="hsl(var(--muted-foreground))">sample in</text>

    <defs>
      <marker id="arrow-p" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M10 0 L0 5 L10 10 z" fill="hsl(var(--foreground))" />
      </marker>
    </defs>

    {/* output label */}
    <text x="260" y="310" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">
      feedback current to null deflection ∝ pO₂
    </text>
  </svg>
);

const DifferentialScene = () => (
  <svg
    viewBox="0 0 520 320"
    className="w-full h-auto"
    {...svgImgProps({ id: "paramagnetic-diff" })}
  >
    <title id="paramagnetic-diff-title">Differential-pressure paramagnetic O₂ cell</title>
    <desc id="paramagnetic-diff-desc">
      Sample and reference (room-air) gas streams enter a chamber containing a switched
      electromagnet. The pressure difference oscillating across a sensitive transducer
      between the two streams is proportional to the difference in O₂ partial pressure,
      giving breath-by-breath response.
    </desc>

    {/* sample inlet */}
    <path d="M20 80 L150 80" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arrow-d)" />
    <text x="20" y="72" fontSize="11" fill="hsl(var(--foreground))">sample (patient)</text>

    {/* reference inlet */}
    <path d="M20 240 L150 240" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#arrow-d)" />
    <text x="20" y="232" fontSize="11" fill="hsl(var(--foreground))">reference (room air, 21% O₂)</text>

    {/* electromagnet block */}
    <rect x="200" y="100" width="120" height="120" rx="8"
      fill="hsl(var(--physics) / 0.15)" stroke="hsl(var(--physics))" strokeWidth="1.5" />
    <text x="260" y="135" textAnchor="middle" fontSize="12" fontWeight="600" fill="hsl(var(--physics))">switched</text>
    <text x="260" y="150" textAnchor="middle" fontSize="12" fontWeight="600" fill="hsl(var(--physics))">electromagnet</text>
    <text x="260" y="172" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">(~110 Hz)</text>

    {/* converging tubes into chamber */}
    <path d="M150 80 C 180 80, 180 130, 200 130" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" />
    <path d="M150 240 C 180 240, 180 190, 200 190" stroke="hsl(var(--muted-foreground))" strokeWidth="2" fill="none" />

    {/* transducer */}
    <circle cx="380" cy="160" r="34" fill="hsl(var(--card))" stroke="hsl(var(--accent))" strokeWidth="1.5" />
    <text x="380" y="158" textAnchor="middle" fontSize="11" fontWeight="600" fill="hsl(var(--foreground))">Δ-P</text>
    <text x="380" y="172" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">transducer</text>

    {/* connecting differential line between the two stream pressures */}
    <path d="M320 130 L346 145" stroke="hsl(var(--accent))" strokeWidth="1.5" />
    <path d="M320 190 L346 175" stroke="hsl(var(--accent))" strokeWidth="1.5" />

    {/* output to display */}
    <path d="M414 160 L470 160" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#arrow-d)" />
    <rect x="470" y="140" width="40" height="40" rx="4"
      fill="hsl(var(--card))" stroke="hsl(var(--border))" />
    <text x="490" y="165" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))">FiO₂</text>

    {/* O₂ being attracted (sample side) */}
    {[{ x: 230, y: 145 }, { x: 270, y: 155 }, { x: 250, y: 200 }].map((p, i) => (
      <g key={i}>
        <circle cx={p.x} cy={p.y} r="6" fill="hsl(var(--clinical) / 0.8)" />
        <text x={p.x} y={p.y + 3} textAnchor="middle" fontSize="8" fontWeight="700" fill="white">O₂</text>
      </g>
    ))}

    {/* outlets */}
    <path d="M320 130 L360 130 L360 100 L400 100" stroke="hsl(var(--clinical))" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-d)" />
    <path d="M320 190 L360 190 L360 220 L400 220" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" markerEnd="url(#arrow-d)" />
    <text x="405" y="100" fontSize="10" fill="hsl(var(--muted-foreground))">to scavenge</text>
    <text x="405" y="225" fontSize="10" fill="hsl(var(--muted-foreground))">to scavenge</text>

    <defs>
      <marker id="arrow-d" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--foreground))" />
      </marker>
    </defs>

    <text x="260" y="300" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">
      ΔP oscillates at magnet frequency, amplitude ∝ (pO₂ sample − pO₂ reference)
    </text>
  </svg>
);

export const ParamagneticO2Diagram = () => {
  const [mode, setMode] = useState<Mode>("pauling");

  return (
    <DiagramFigure
      id="paramagnetic-o2"
      title="Paramagnetic oxygen analyser"
      description="Two designs: the classic Pauling null-deflection dumb-bell and the modern differential-pressure cell used for breath-by-breath FiO₂/FeO₂ measurement."
      className="my-4"
    >
      <div className="rounded-xl border border-border bg-card p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          <TabButton
            active={mode === "pauling"}
            onClick={() => setMode("pauling")}
            sublabel="Null-deflection, slow (FiO₂ trend)"
          >
            Pauling dumb-bell
          </TabButton>
          <TabButton
            active={mode === "differential"}
            onClick={() => setMode("differential")}
            sublabel="Fast — breath-by-breath FiO₂/FeO₂"
          >
            Differential-pressure cell
          </TabButton>
        </div>

        <div className="rounded-lg bg-background border border-border p-3">
          {mode === "pauling" ? <PaulingScene /> : <DifferentialScene />}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          O₂ has two unpaired electrons in its π* antibonding orbitals, so it is drawn into a
          magnetic field. NO is the only other medical gas that behaves this way, making the
          method essentially specific for O₂.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default ParamagneticO2Diagram;
