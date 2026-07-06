import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Delta ratio interpretation diagram
 *
 * Interactive scatter of ΔAG (y) vs ΔHCO₃⁻ (x) with the four
 * diagnostic zones shaded. The user picks one of four canonical
 * scenarios; the marker animates to the scenario position and the
 * interpretation panel updates.
 */

type ScenarioKey = "pure-nagma" | "mixed" | "pure-hagma" | "alkalosis";

interface Scenario {
  key: ScenarioKey;
  label: string;
  dAG: number;
  dHCO: number;
  ratio: number;
  story: string;
  example: string;
  takeaway: string;
}

const SCENARIOS: Scenario[] = [
  {
    key: "pure-nagma",
    label: "Δ ratio < 0.4",
    dAG: 2,
    dHCO: 12,
    ratio: 0.17,
    story: "AG barely rises while HCO₃⁻ falls substantially.",
    example: "Severe diarrhoea or proximal RTA — HCO₃⁻ lost from the body, replaced by Cl⁻.",
    takeaway: "Pure NAGMA (hyperchloraemic acidosis). No unmeasured anion accumulation.",
  },
  {
    key: "mixed",
    label: "0.4 – 1.0",
    dAG: 8,
    dHCO: 12,
    ratio: 0.67,
    story: "Both AG and HCO₃⁻ moved, but AG less than expected.",
    example: "DKA + saline resuscitation, or sepsis with concurrent diarrhoea.",
    takeaway: "Mixed HAGMA + NAGMA. Treat both processes — the NAGMA will persist after the HAGMA resolves.",
  },
  {
    key: "pure-hagma",
    label: "1.0 – 2.0",
    dAG: 14,
    dHCO: 12,
    ratio: 1.17,
    story: "ΔAG ≈ ΔHCO₃⁻ — 1:1 stoichiometric exchange of bicarbonate for the unmeasured anion.",
    example: "Lactic acidosis (~1.6) or pure DKA (~1.0). Lactate clears partly via non-HCO₃⁻ routes, hence ratio drifts above 1.",
    takeaway: "Pure HAGMA. No second metabolic process hiding.",
  },
  {
    key: "alkalosis",
    label: "Δ ratio > 2",
    dAG: 24,
    dHCO: 8,
    ratio: 3.0,
    story: "AG has risen far more than HCO₃⁻ has fallen — bicarbonate has been preserved or augmented.",
    example: "DKA in a vomiting patient (gastric H⁺ loss raises HCO₃⁻) or HAGMA on a chronic respiratory acidosis (renal HCO₃⁻ retention).",
    takeaway: "HAGMA + concurrent metabolic alkalosis or chronic respiratory acidosis. Don't be fooled by 'normal' bicarbonate.",
  },
];

const DeltaRatioDiagram = () => {
  const [active, setActive] = useState<ScenarioKey>("pure-hagma");
  const s = SCENARIOS.find((x) => x.key === active)!;

  // SVG plot config
  const W = 460, H = 320;
  const padL = 56, padB = 50, padT = 20, padR = 20;
  const xMax = 28, yMax = 32;
  const px = (v: number) => padL + (v / xMax) * (W - padL - padR);
  const py = (v: number) => H - padB - (v / yMax) * (H - padT - padB);

  // Boundary lines (ratios 0.4, 1.0, 2.0 → ΔAG = ratio × ΔHCO)
  const ratioLine = (r: number) => {
    const x1 = 0, y1 = 0;
    const xEnd = Math.min(xMax, yMax / r);
    const yEnd = xEnd * r;
    return { x1: px(x1), y1: py(y1), x2: px(xEnd), y2: py(yEnd) };
  };
  const r04 = ratioLine(0.4);
  const r10 = ratioLine(1.0);
  const r20 = ratioLine(2.0);

  return (
    <DiagramFigure
      id="delta-ratio-diagram"
      title="Delta ratio (ΔAG / ΔHCO₃⁻) interpretation"
      description="ΔAG plotted against ΔHCO₃⁻ with four diagnostic zones. Selecting a scenario animates the marker into the corresponding zone."
    >
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.key}
              onClick={() => setActive(sc.key)}
              className={`text-xs px-2.5 py-1.5 rounded border transition-colors ${
                active === sc.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-secondary"
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-labelledby="delta-ratio-title delta-ratio-desc">
          <title id="delta-ratio-title">Delta ratio zones</title>
          <desc id="delta-ratio-desc">Scatter plot with four shaded zones separated by ratio 0.4, 1.0, and 2.0 lines.</desc>

          {/* Zone shading (use opacity to convey severity) */}
          <polygon
            points={`${padL},${H - padB} ${r04.x2},${r04.y2} ${px(xMax)},${H - padB}`}
            fill="hsl(210 65% 60% / 0.18)"
          />
          <polygon
            points={`${padL},${H - padB} ${r04.x2},${r04.y2} ${r10.x2},${r10.y2}`}
            fill="hsl(45 80% 55% / 0.18)"
          />
          <polygon
            points={`${padL},${H - padB} ${r10.x2},${r10.y2} ${r20.x2},${r20.y2}`}
            fill="hsl(145 55% 45% / 0.22)"
          />
          <polygon
            points={`${padL},${H - padB} ${r20.x2},${r20.y2} ${padL},${padT}`}
            fill="hsl(280 55% 60% / 0.18)"
          />

          {/* Ratio boundary lines */}
          {[
            { l: r04, label: "0.4" },
            { l: r10, label: "1.0" },
            { l: r20, label: "2.0" },
          ].map((b, i) => (
            <g key={i}>
              <line x1={b.l.x1} y1={b.l.y1} x2={b.l.x2} y2={b.l.y2} stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="3 3" />
              <text x={b.l.x2 - 4} y={b.l.y2 + 4} textAnchor="end" className="fill-muted-foreground" style={{ fontSize: 9 }}>
                ratio {b.label}
              </text>
            </g>
          ))}

          {/* Axes */}
          <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="hsl(var(--foreground))" strokeWidth={1} />
          <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="hsl(var(--foreground))" strokeWidth={1} />

          {/* Axis ticks */}
          {[0, 8, 16, 24].map((v) => (
            <g key={`x${v}`}>
              <line x1={px(v)} y1={H - padB} x2={px(v)} y2={H - padB + 4} stroke="hsl(var(--foreground))" strokeWidth={1} />
              <text x={px(v)} y={H - padB + 16} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 10 }}>{v}</text>
            </g>
          ))}
          {[0, 8, 16, 24, 32].map((v) => (
            <g key={`y${v}`}>
              <line x1={padL - 4} y1={py(v)} x2={padL} y2={py(v)} stroke="hsl(var(--foreground))" strokeWidth={1} />
              <text x={padL - 8} y={py(v) + 3} textAnchor="end" className="fill-muted-foreground" style={{ fontSize: 10 }}>{v}</text>
            </g>
          ))}

          {/* Axis labels */}
          <text x={(padL + W - padR) / 2} y={H - 8} textAnchor="middle" className="fill-foreground" style={{ fontSize: 11, fontWeight: 600 }}>
            ΔHCO₃⁻ (24 − measured)
          </text>
          <text x={14} y={(padT + H - padB) / 2} textAnchor="middle" transform={`rotate(-90 14 ${(padT + H - padB) / 2})`} className="fill-foreground" style={{ fontSize: 11, fontWeight: 600 }}>
            ΔAG (measured − 12)
          </text>

          {/* Zone labels */}
          <text x={px(20)} y={py(2)} className="fill-foreground" style={{ fontSize: 10, fontWeight: 600 }}>NAGMA</text>
          <text x={px(18)} y={py(11)} className="fill-foreground" style={{ fontSize: 10, fontWeight: 600 }}>Mixed</text>
          <text x={px(13)} y={py(20)} className="fill-foreground" style={{ fontSize: 10, fontWeight: 600 }}>HAGMA</text>
          <text x={px(5)} y={py(26)} className="fill-foreground" style={{ fontSize: 10, fontWeight: 600 }}>+ alkalosis</text>

          {/* Animated marker */}
          <g style={{ transition: "transform 700ms cubic-bezier(0.4,0,0.2,1)" }}>
            <circle
              cx={px(s.dHCO)}
              cy={py(s.dAG)}
              r={9}
              fill="hsl(var(--primary))"
              stroke="hsl(var(--background))"
              strokeWidth={2}
              style={{ transition: "all 700ms cubic-bezier(0.4,0,0.2,1)" }}
            >
              <animate attributeName="r" values="9;13;9" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <line
              x1={px(0)}
              y1={py(0)}
              x2={px(s.dHCO)}
              y2={py(s.dAG)}
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              style={{ transition: "all 700ms cubic-bezier(0.4,0,0.2,1)" }}
            />
          </g>
        </svg>

        {/* Interpretation card */}
        <div className="mt-3 p-3 rounded-md border border-primary/30 bg-primary/5 animate-fade-in" key={active}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-foreground">{s.label}</p>
            <p className="text-xs font-mono text-muted-foreground">
              ΔAG {s.dAG} / ΔHCO₃⁻ {s.dHCO} = <span className="text-primary font-semibold">{s.ratio.toFixed(2)}</span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{s.story}</p>
          <p className="text-xs text-muted-foreground mt-2"><strong className="text-foreground">Clinical example:</strong> {s.example}</p>
          <p className="text-xs text-primary mt-1 font-medium">{s.takeaway}</p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default DeltaRatioDiagram;
