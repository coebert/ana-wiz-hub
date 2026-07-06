import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Osmolarity breakdown diagram
 *
 * Stacked horizontal bar showing each term of the calculated osmolarity
 * formula 2×Na⁺ + urea + glucose, with a parallel "measured osmolality"
 * bar above so the gap is visible. Clickable segments reveal a teaching
 * panel explaining each term's physiological meaning and pitfalls.
 */

type TermKey = "na" | "urea" | "glucose" | "gap";

interface Term {
  key: TermKey;
  label: string;
  value: number;          // mOsm/kg contribution at the chosen baseline
  color: string;
  short: string;
  detail: string;
}

const TERMS: Term[] = [
  {
    key: "na",
    label: "2 × Na⁺ (140)",
    value: 280,
    color: "hsl(var(--icu) / 0.75)",
    short: "Sodium and its accompanying anions",
    detail:
      "Sodium is the dominant extracellular cation and the major determinant of plasma osmolarity. The factor of 2 accounts for its obligatory anion partners (mostly Cl⁻ and HCO₃⁻) which travel with it to preserve electroneutrality. Some labs use 1.86 × Na⁺ instead — this corrects for incomplete dissociation of NaCl and the small fraction of plasma volume occupied by lipids/proteins, but in clinical practice ×2 is close enough.",
  },
  {
    key: "urea",
    label: "+ Urea (5)",
    value: 5,
    color: "hsl(45 75% 55% / 0.8)",
    short: "Freely permeable — ineffective osmole",
    detail:
      "Urea contributes to measured osmolality but crosses cell membranes freely, so it does not pull water across — an 'ineffective' osmole. It is in the formula because the osmometer measures it. Beware US labs reporting BUN in mg/dL — convert with BUN × 0.357 = mmol/L (or divide BUN mg/dL by 2.8). Forgetting this is the commonest source of a false osmolar gap.",
  },
  {
    key: "glucose",
    label: "+ Glucose (5)",
    value: 5,
    color: "hsl(145 55% 50% / 0.8)",
    short: "Effective osmole — pulls water out of cells",
    detail:
      "Glucose is impermeant to cells without insulin and drives water from the intracellular to the extracellular compartment in hyperglycaemia — the basis of HHS. Convert mg/dL to mmol/L by dividing by 18. A glucose of 30 mmol/L contributes 30 mOsm/kg directly and pulls dilutional hyponatraemia in addition.",
  },
  {
    key: "gap",
    label: "Osmolar gap (10)",
    value: 10,
    color: "hsl(0 65% 55% / 0.8)",
    short: "Unmeasured osmoles — the diagnostic signal",
    detail:
      "Anything else osmotically active that the calculator doesn't see: ethanol, methanol, ethylene glycol, propylene glycol (lorazepam/diazepam vehicle), mannitol, glycerol, sorbitol, severe ketones, acetone, paraprotein. Normal < 10 mOsm/kg. A markedly raised gap with an unexplained HAGMA is the toxic-alcohol screening test that the AG alone misses early in the course.",
  },
];

const TOTAL_CALCULATED = 280 + 5 + 5; // 290
const TOTAL_MEASURED = TOTAL_CALCULATED + 10; // 300

const W = 720;
const PAD_L = 100;
const PAD_R = 20;
const BAR_H = 56;
const SCALE = (W - PAD_L - PAD_R) / 320; // mOsm/kg → px

const OsmolarityBreakdownDiagram = () => {
  const [active, setActive] = useState<TermKey>("na");

  // Build cumulative offsets for the calculated bar (Na | urea | glucose)
  const calcSegments = TERMS.slice(0, 3);
  let cursor = 0;
  const calcLayout = calcSegments.map((t) => {
    const x = PAD_L + cursor * SCALE;
    const w = t.value * SCALE;
    cursor += t.value;
    return { ...t, x, w };
  });

  // Measured bar = calculated + gap
  const measuredCalcWidth = TOTAL_CALCULATED * SCALE;
  const measuredGapWidth = 10 * SCALE;

  const node = TERMS.find((t) => t.key === active)!;

  return (
    <DiagramFigure
      id="osmolarity-breakdown"
      title="Osmolarity calculation broken down term by term"
      description="Stacked-bar visualisation of 2×Na⁺ + urea + glucose alongside measured osmolality, with the osmolar gap shown as the unmeasured-osmole tail."
    >
      <div className="border border-border rounded-lg p-4 mb-4">
        <h3 className="text-base font-serif font-bold text-foreground mb-1">Osmolarity, term by term</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Click any segment to see what it represents and where it goes wrong.
        </p>

        <svg viewBox={`0 0 ${W} 230`} className="w-full h-auto" role="img" aria-labelledby="osmolarity-breakdown-title osmolarity-breakdown-desc">
          <title id="osmolarity-breakdown-title">Stacked osmolarity bars</title>
          <desc id="osmolarity-breakdown-desc">Calculated osmolarity decomposed into sodium, urea, glucose; measured osmolality bar above shows the osmolar gap.</desc>

          {/* X-axis scale */}
          {[0, 100, 200, 300].map((v) => (
            <g key={v}>
              <line x1={PAD_L + v * SCALE} y1={20} x2={PAD_L + v * SCALE} y2={200} stroke="hsl(var(--border))" strokeWidth={0.5} strokeDasharray="2 3" />
              <text x={PAD_L + v * SCALE} y={216} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 10 }}>{v}</text>
            </g>
          ))}
          <text x={W - PAD_R} y={216} textAnchor="end" className="fill-muted-foreground" style={{ fontSize: 10 }}>mOsm/kg</text>

          {/* Measured bar (top) */}
          <text x={PAD_L - 8} y={56} textAnchor="end" className="fill-foreground" style={{ fontSize: 11, fontWeight: 600 }}>Measured</text>
          <rect
            x={PAD_L} y={30} width={measuredCalcWidth} height={BAR_H}
            fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth={1}
          />
          <text x={PAD_L + measuredCalcWidth / 2} y={62} textAnchor="middle" className="fill-foreground" style={{ fontSize: 11, fontWeight: 600 }}>
            calculated portion ({TOTAL_CALCULATED})
          </text>
          {/* Gap segment */}
          <g
            onClick={() => setActive("gap")}
            style={{ cursor: "pointer" }}
          >
            <rect
              x={PAD_L + measuredCalcWidth} y={30}
              width={measuredGapWidth} height={BAR_H}
              fill={TERMS[3].color}
              stroke={active === "gap" ? "hsl(var(--primary))" : "hsl(var(--border))"}
              strokeWidth={active === "gap" ? 2.5 : 1}
              style={{ transition: "all 250ms" }}
            >
              <animate attributeName="opacity" values="1;0.7;1" dur="2.4s" repeatCount="indefinite" />
            </rect>
            <text x={PAD_L + measuredCalcWidth + measuredGapWidth / 2} y={62} textAnchor="middle" className="fill-foreground" style={{ fontSize: 10, fontWeight: 700 }}>
              gap
            </text>
          </g>
          <text x={PAD_L + (measuredCalcWidth + measuredGapWidth) + 6} y={56} className="fill-foreground" style={{ fontSize: 11, fontWeight: 600 }}>
            = {TOTAL_MEASURED}
          </text>

          {/* Subtraction arrow */}
          <path
            d={`M ${PAD_L - 30} 86 L ${PAD_L - 30} 124`}
            stroke="hsl(var(--muted-foreground))" strokeWidth={1.2}
            markerEnd="url(#arr-osm)"
          />
          <defs>
            <marker id="arr-osm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--muted-foreground))" />
            </marker>
          </defs>
          <text x={PAD_L - 22} y={108} className="fill-muted-foreground" style={{ fontSize: 9, fontStyle: "italic" }}>−</text>

          {/* Calculated bar (bottom) */}
          <text x={PAD_L - 8} y={156} textAnchor="end" className="fill-foreground" style={{ fontSize: 11, fontWeight: 600 }}>Calculated</text>
          {calcLayout.map((seg) => {
            const isActive = seg.key === active;
            return (
              <g key={seg.key} onClick={() => setActive(seg.key)} style={{ cursor: "pointer" }}>
                <rect
                  x={seg.x} y={130} width={seg.w} height={BAR_H}
                  fill={seg.color}
                  stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--border))"}
                  strokeWidth={isActive ? 2.5 : 1}
                  style={{ transition: "all 250ms" }}
                />
                <text
                  x={seg.x + seg.w / 2} y={162}
                  textAnchor="middle"
                  className="fill-foreground pointer-events-none"
                  style={{ fontSize: seg.w > 120 ? 11 : 9, fontWeight: 700 }}
                >
                  {seg.label}
                </text>
              </g>
            );
          })}
          <text x={PAD_L + TOTAL_CALCULATED * SCALE + 6} y={156} className="fill-foreground" style={{ fontSize: 11, fontWeight: 600 }}>
            = {TOTAL_CALCULATED}
          </text>

          {/* Formula caption */}
          <text x={W / 2} y={194} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 11, fontStyle: "italic" }}>
            Osmolar gap = Osm<tspan baselineShift="sub" fontSize="9">measured</tspan> − [2 × Na⁺ + urea + glucose] &nbsp;(all mmol/L)
          </text>
        </svg>

        {/* Term-pickers */}
        <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
          {TERMS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`text-xs px-2.5 py-1.5 rounded border transition-colors ${
                active === t.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-secondary text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="p-3 rounded-md border border-primary/30 bg-primary/5 animate-fade-in" key={active}>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: node.color }} />
            <p className="text-sm font-semibold text-foreground">{node.label} — {node.short}</p>
          </div>
          <p className="text-sm text-muted-foreground">{node.detail}</p>
        </div>

        <p className="mt-2 text-[10px] text-muted-foreground italic">
          Baseline figures shown for Na⁺ 140, urea 5, glucose 5 mmol/L. Move the calculator below to explore any combination.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default OsmolarityBreakdownDiagram;
