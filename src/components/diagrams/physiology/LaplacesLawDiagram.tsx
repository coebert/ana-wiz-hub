import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Laplace's law diagram with interactive radius slider.
 *
 * Sphere (alveolus / aneurysm):  P = 2T / r
 * Cylinder (vessel / bronchus):  T = P · r        (equivalently  P = T/r)
 */

const T_DEFAULT = 30; // arbitrary surface-tension units (mN/m)
const T_SURF = 8; // with surfactant present (small alveolus)

const LaplacesLawDiagram = () => {
  const [r, setR] = useState(60); // px radius for big alveolus
  const rSmall = Math.max(20, Math.round(r * 0.45));

  // Pressures (sphere): P = 2T/r — using r in mm for plausible numbers (1 px = 0.1 mm).
  const rBig_mm = r / 100;
  const rSmall_mm = rSmall / 100;

  const pBigNoSurf = (2 * T_DEFAULT) / rBig_mm;
  const pSmallNoSurf = (2 * T_DEFAULT) / rSmall_mm;
  const pBigSurf = (2 * T_DEFAULT) / rBig_mm;
  const pSmallSurf = (2 * T_SURF) / rSmall_mm;

  const fmt = (v: number) => v.toFixed(0);

  return (
    <DiagramFigure
      id="laplaces-law"
      title="Laplace's law — surface tension, radius and wall pressure"
      description="Interactive diagram showing Laplace's law for a sphere and cylinder, with the alveolar-stability paradox and the role of pulmonary surfactant."
    >
      <div className="my-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-2">
          Laplace's Law: P = 2T / r (sphere) · P = T / r (cylinder)
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          The pressure across a curved fluid–gas interface (or vessel wall) is proportional to wall
          tension and inversely proportional to radius. Adjust the radius to see how the pressure
          inside two different-sized alveoli changes — and how surfactant rescues the smaller one.
        </p>

        {/* === Diagram === */}
        <div className="rounded-xl border border-border bg-card p-3 overflow-x-auto">
          <svg
            viewBox="0 0 720 320"
            className="w-full h-auto min-w-[520px]"
            role="img"
            aria-label="Two alveoli of different radius connected by a bronchiole, illustrating Laplace's law and surfactant"
          >
            {/* Connecting bronchiole */}
            <line x1="220" y1="170" x2="500" y2="170" stroke="hsl(var(--muted-foreground))" strokeWidth="6" strokeLinecap="round" opacity={0.6} />
            <text x="360" y="160" textAnchor="middle" className="fill-muted-foreground text-[10px] italic">
              shared bronchiole
            </text>

            {/* Small alveolus (left) */}
            <g>
              <circle cx="180" cy="170" r={rSmall} fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
              {/* radius arrow */}
              <line x1="180" y1="170" x2={180 + rSmall} y2="170" stroke="hsl(var(--primary))" strokeWidth="1" markerEnd="url(#lap-arrow)" />
              <text x={180 + rSmall / 2} y={163} textAnchor="middle" className="fill-primary text-[10px] font-semibold">
                r = {rSmall_mm.toFixed(2)} mm
              </text>
              <text x="180" y={170 - rSmall - 12} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                Small alveolus
              </text>
            </g>

            {/* Big alveolus (right) */}
            <g>
              <circle cx="540" cy="170" r={r} fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent-foreground, var(--foreground)))" strokeWidth="2" />
              <line x1="540" y1="170" x2={540 + r} y2="170" stroke="hsl(var(--foreground))" strokeWidth="1" markerEnd="url(#lap-arrow)" />
              <text x={540 + r / 2} y={163} textAnchor="middle" className="fill-foreground text-[10px] font-semibold">
                r = {rBig_mm.toFixed(2)} mm
              </text>
              <text x="540" y={170 - r - 12} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                Large alveolus
              </text>
            </g>

            <defs>
              <marker id="lap-arrow" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--foreground))" />
              </marker>
            </defs>

            {/* Pressure readouts */}
            <g transform="translate(40, 250)">
              <text className="fill-foreground text-[12px] font-semibold">Without surfactant (T constant)</text>
              <text y="20" className="fill-muted-foreground text-[11px]">
                P<tspan dy="2" fontSize="9">small</tspan>
                <tspan dy="-2"> = </tspan>
                <tspan className="fill-destructive font-semibold">{fmt(pSmallNoSurf)}</tspan> · &nbsp;
                P<tspan dy="2" fontSize="9">large</tspan>
                <tspan dy="-2"> = </tspan>
                <tspan className="fill-foreground font-semibold">{fmt(pBigNoSurf)}</tspan>
              </text>
              <text y="36" className="fill-destructive text-[10px] italic">
                Small alveolus has higher pressure → empties into the large one (collapse)
              </text>
            </g>

            <g transform="translate(380, 250)">
              <text className="fill-foreground text-[12px] font-semibold">With surfactant (T falls in small alveolus)</text>
              <text y="20" className="fill-muted-foreground text-[11px]">
                P<tspan dy="2" fontSize="9">small</tspan>
                <tspan dy="-2"> = </tspan>
                <tspan className="fill-primary font-semibold">{fmt(pSmallSurf)}</tspan> · &nbsp;
                P<tspan dy="2" fontSize="9">large</tspan>
                <tspan dy="-2"> = </tspan>
                <tspan className="fill-foreground font-semibold">{fmt(pBigSurf)}</tspan>
              </text>
              <text y="36" className="fill-primary text-[10px] italic">
                Pressures equalise → both alveoli stable (arbitrary units)
              </text>
            </g>
          </svg>
        </div>

        {/* Slider */}
        <div className="mt-4 flex items-center gap-3">
          <label className="text-xs font-semibold text-foreground whitespace-nowrap" htmlFor="lap-r">
            Large alveolus radius
          </label>
          <input
            id="lap-r"
            type="range"
            min={40}
            max={90}
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-xs font-mono tabular-nums text-muted-foreground w-16 text-right">
            {rBig_mm.toFixed(2)} mm
          </span>
        </div>

        {/* Equations & clinical applications */}
        <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="font-semibold text-foreground mb-1">Sphere (alveolus, aneurysm, ventricle)</p>
            <p className="font-mono text-xs text-muted-foreground">P = 2T / r</p>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              Two surfaces contribute (factor of 2). Relevant to alveoli, saccular aneurysms and the
              cardiac ventricle (rearranged as wall stress σ = P·r / 2h, where h is wall thickness).
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="font-semibold text-foreground mb-1">Cylinder (vessel, bronchus)</p>
            <p className="font-mono text-xs text-muted-foreground">T = P · r &nbsp; (equivalently P = T / r)</p>
            <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
              Single curved surface — the law without the factor of 2. Explains why aortic
              dissection risk rises sharply with aneurysm diameter, and why dilated airways are
              easier to keep open (lower wall tension for the same distending pressure).
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg border border-primary/30 bg-primary/5 text-sm text-foreground/90 leading-relaxed">
          <p className="font-semibold text-primary mb-1">Why surfactant matters</p>
          <p>
            With <em>constant</em> surface tension, a small alveolus (small r) generates a higher inward
            pressure than a large one and would empty into its neighbour — alveoli would be unstable.
            <strong> Surfactant (DPPC from Type II pneumocytes)</strong> is more concentrated in
            smaller alveoli, lowering their surface tension preferentially. This <em>equalises</em> P
            across alveoli of different sizes and prevents collapse — the same principle is exploited
            therapeutically by exogenous surfactant in neonatal RDS.
          </p>
        </div>

        <div className="mt-3 grid md:grid-cols-3 gap-2 text-xs">
          <div className="p-3 rounded-md border border-border">
            <p className="font-semibold text-foreground">Alveoli</p>
            <p className="text-muted-foreground mt-1">Small alveoli need surfactant to avoid collapse into larger units (atelectasis, RDS).</p>
          </div>
          <div className="p-3 rounded-md border border-border">
            <p className="font-semibold text-foreground">Aneurysms</p>
            <p className="text-muted-foreground mt-1">Wall tension rises with radius → larger aneurysms have disproportionately higher rupture risk.</p>
          </div>
          <div className="p-3 rounded-md border border-border">
            <p className="font-semibold text-foreground">Ventricle</p>
            <p className="text-muted-foreground mt-1">Dilatation (↑ r) and thinning (↓ h) raise wall stress (σ = P·r / 2h) → ↑ MVO₂ and failure.</p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default LaplacesLawDiagram;
