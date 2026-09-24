import { useEffect, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Agonism spectrum: full agonist → partial agonist → antagonist → inverse agonist.
 *
 * Animated horizontal bar shows the receptor's signalling output (% Emax)
 * relative to a small constitutive baseline. A schematic receptor below
 * fills/empties to mirror the active class.
 */

type LigandId = "full" | "partial" | "antagonist" | "inverse";

interface Ligand {
  id: LigandId;
  label: string;
  intrinsic: number; // -0.5 .. 1
  description: string;
  example: string;
  color: string;
}

const LIGANDS: Ligand[] = [
  {
    id: "full",
    label: "Full agonist",
    intrinsic: 1,
    description:
      "Binds the receptor and produces maximal signal (intrinsic activity α = 1). Drives full receptor activation.",
    example: "Morphine at μ-opioid · Adrenaline at β₁ · Suxamethonium at nAChR",
    color: "hsl(var(--pharmacology))",
  },
  {
    id: "partial",
    label: "Partial agonist",
    intrinsic: 0.5,
    description:
      "Binds but produces sub-maximal response even at 100% occupancy (0 < α < 1). Acts as antagonist when a full agonist is also present.",
    example: "Buprenorphine (μ) · Pindolol (β) · Aripiprazole (D₂)",
    color: "hsl(35 85% 50%)",
  },
  {
    id: "antagonist",
    label: "Competitive antagonist",
    intrinsic: 0,
    description:
      "Binds without activating (α = 0). Blocks the agonist by occupying the orthosteric site; effect surmountable by raising agonist concentration.",
    example: "Naloxone (μ) · Atracurium (nAChR) · Atenolol (β₁)",
    color: "hsl(210 60% 50%)",
  },
  {
    id: "inverse",
    label: "Inverse agonist",
    intrinsic: -0.45,
    description:
      "Stabilises the inactive receptor, suppressing constitutive (basal) activity below baseline (α < 0). Requires a receptor with measurable basal tone.",
    example: "β-carbolines at GABAA-BZ site · Some H₁ antihistamines",
    color: "hsl(280 50% 55%)",
  },
];

const BASELINE = 0.12; // small constitutive activity baseline (12%)
const W = 520;
const H = 290;

export const AgonismSpectrumDiagram = () => {
  const [activeId, setActiveId] = useState<LigandId>("full");
  const [animProgress, setAnimProgress] = useState(0);

  // Re-animate whenever active ligand changes
  useEffect(() => {
    setAnimProgress(0);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 700);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeId]);

  const active = LIGANDS.find((l) => l.id === activeId)!;
  const target = active.intrinsic; // -0.45 .. 1
  // Display scale: map -0.5..1 to bar position
  const displayValue = BASELINE + (target - BASELINE) * animProgress;

  // Bar geometry
  const barX0 = 60;
  const barX1 = W - 30;
  const barY = 90;
  const barH = 26;
  const zeroX = barX0; // 0% on the left
  const fullX = barX1; // 100% Emax on the right
  const valueX = (v: number) =>
    zeroX + Math.max(0, Math.min(1, v)) * (fullX - zeroX);
  // Negative: extend a small region to the left of barX0 visually as suppression
  const negativeWidth = 60;
  const negativeX = (v: number) =>
    zeroX + (v / 0.5) * negativeWidth; // v negative → leftward
  const baselineX = valueX(BASELINE);

  return (
    <DiagramFigure
      id="agonism-spectrum-diagram"
      title="Agonism spectrum"
      description="Agonism spectrum: full agonist → partial agonist → antagonist → inverse agonist. Animated horizontal bar shows the receptor's signalling output (% Emax) relative to a small constitutive baseline."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              The agonism spectrum
            </h3>
            <p className="text-xs text-muted-foreground">
              Tap a ligand class to see its effect on receptor signalling relative to constitutive baseline.
            </p>
          </div>
  
          {/* Ligand selector */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-3">
            {LIGANDS.map((l) => {
              const isActive = activeId === l.id;
              return (
                    <button
                  key={l.id}
                  onClick={() => setActiveId(l.id)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    isActive
                      ? "text-primary-foreground border-transparent"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }`}
                  style={isActive ? { background: l.color } : undefined}
                  aria-pressed={isActive}
                >
                  {l.label}
                </button>
    );
            })}
          </div>
  
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full max-w-2xl mx-auto"
            role="img"
            aria-label="Animated comparison of full agonist, partial agonist, antagonist, and inverse agonist effects on receptor signalling"
          >
            {/* Negative (suppression) zone */}
            <rect
              x={zeroX - negativeWidth}
              y={barY}
              width={negativeWidth}
              height={barH}
              fill="hsl(280 40% 92%)"
              stroke="hsl(var(--border))"
              strokeWidth={1}
            />
            <text
              x={zeroX - negativeWidth / 2}
              y={barY - 6}
              textAnchor="middle"
              fontSize="9"
              className="fill-muted-foreground"
            >
              Suppressed
            </text>
  
            {/* Main bar frame (0–100%) */}
            <rect
              x={barX0}
              y={barY}
              width={barX1 - barX0}
              height={barH}
              fill="hsl(var(--background))"
              stroke="hsl(var(--border))"
              strokeWidth={1}
            />
            {/* tick lines at 25/50/75/100 */}
            {[0.25, 0.5, 0.75, 1].map((t) => (
              <g key={t}>
                <line
                  x1={valueX(t)}
                  x2={valueX(t)}
                  y1={barY}
                  y2={barY + barH}
                  stroke="hsl(var(--border))"
                  strokeDasharray="2 3"
                  opacity={0.55}
                />
                <text
                  x={valueX(t)}
                  y={barY + barH + 12}
                  textAnchor="middle"
                  fontSize="8.5"
                  className="fill-muted-foreground"
                >
                  {Math.round(t * 100)}%
                </text>
              </g>
            ))}
            <text
              x={zeroX}
              y={barY + barH + 12}
              textAnchor="middle"
              fontSize="8.5"
              className="fill-muted-foreground"
            >
              0%
            </text>
  
            {/* Baseline marker */}
            <line
              x1={baselineX}
              x2={baselineX}
              y1={barY - 6}
              y2={barY + barH + 6}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 2"
            />
            <text
              x={baselineX}
              y={barY - 9}
              textAnchor="middle"
              fontSize="8.5"
              className="fill-foreground font-semibold"
            >
              baseline
            </text>
  
            {/* Animated fill (positive) */}
            {displayValue > 0 && (
              <rect
                x={zeroX}
                y={barY + 1}
                width={Math.max(0, valueX(displayValue) - zeroX)}
                height={barH - 2}
                fill={active.color}
                opacity={0.85}
              />
            )}
            {/* Animated suppression (negative) */}
            {displayValue < 0 && (
              <rect
                x={zeroX + negativeX(displayValue)}
                y={barY + 1}
                width={-negativeX(displayValue)}
                height={barH - 2}
                fill={active.color}
                opacity={0.85}
              />
            )}
  
            {/* Indicator value text */}
            <text
              x={W / 2}
              y={barY + barH / 2 + 4}
              textAnchor="middle"
              fontSize="11"
              className="font-bold fill-foreground"
            >
              α = {target.toFixed(2)}
            </text>
  
            {/* Receptor schematic — fills with the same fraction */}
            <g transform={`translate(${W / 2 - 90}, 170)`}>
              {/* Membrane band */}
              <rect x={0} y={20} width={180} height={36} fill="hsl(45 30% 92%)" stroke="hsl(var(--border))" />
              {/* Receptor body */}
              <rect
                x={70}
                y={6}
                width={40}
                height={64}
                rx={5}
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
                strokeWidth={1}
              />
              {/* Activation fill */}
              {displayValue > 0 && (
                <rect
                  x={72}
                  y={8 + (1 - displayValue) * 60}
                  width={36}
                  height={displayValue * 60}
                  fill={active.color}
                  opacity={0.85}
                />
              )}
              {displayValue < 0 && (
                <rect
                  x={72}
                  y={8}
                  width={36}
                  height={60}
                  fill="hsl(var(--background))"
                  opacity={Math.min(1, -displayValue * 1.6)}
                />
              )}
              {/* Bound ligand */}
              <circle
                cx={90}
                cy={10}
                r={11}
                fill={active.color}
                stroke="hsl(var(--background))"
                strokeWidth={1.5}
              />
              <text x={90} y={13} textAnchor="middle" fontSize="7" className="font-bold" fill="hsl(var(--background))">
                Ligand
              </text>
              {/* Output arrows */}
              <g opacity={Math.max(0.15, Math.abs(displayValue))}>
                {[0, 1, 2].map((i) => (
                  <line
                    key={i}
                    x1={90}
                    y1={70}
                    x2={70 + i * 20}
                    y2={92 + i * 2}
                    stroke={active.color}
                    strokeWidth={1.5}
                    markerEnd="url(#agon-arrow)"
                  />
                ))}
              </g>
              <text x={90} y={108} textAnchor="middle" fontSize="9" className="fill-muted-foreground">
                {target > 0
                  ? "→ second messenger ↑"
                  : target < 0
                  ? "→ second messenger ↓ below baseline"
                  : "→ no signal change"}
              </text>
            </g>
  
            <defs>
              <marker id="agon-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill={active.color} />
              </marker>
            </defs>
          </svg>
  
          {/* Detail panel */}
          <div
            className="mt-4 p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
            style={{ borderLeftWidth: 4, borderLeftColor: active.color }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-foreground text-sm">{active.label}</p>
              <span
                className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                style={{
                  background: `${active.color}26`,
                  color: active.color,
                }}
              >
                α = {active.intrinsic.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{active.description}</p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Examples:</span> {active.example}
            </p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};
