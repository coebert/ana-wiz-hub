import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

type Pattern = "normal" | "obstructive" | "restrictive" | "fixed-upper" | "variable-extra";

interface PatternInfo {
  label: string;
  description: string;
  color: string;
  fvc: number;      // litres
  pefr: number;     // L/s
  fev1Ratio: number; // FEV1/FVC
}

const patterns: Record<Pattern, PatternInfo> = {
  normal: {
    label: "Normal",
    description: "Rapid rise to peak expiratory flow rate (PEFR) followed by a linear decline. Inspiratory limb is a smooth, symmetric curve. FEV₁/FVC >0.70. FVC and FEV₁ within predicted range.",
    color: "hsl(var(--primary))",
    fvc: 5.0,
    pefr: 10,
    fev1Ratio: 0.80,
  },
  obstructive: {
    label: "Obstructive",
    description: "Characteristic 'scooped out' concave expiratory limb due to dynamic airway compression and flow limitation. Reduced PEFR. FEV₁/FVC <0.70. FVC may be near-normal but FEV₁ is markedly reduced. Seen in asthma, COPD, bronchiectasis.",
    color: "hsl(25, 95%, 53%)",
    fvc: 4.5,
    pefr: 5.5,
    fev1Ratio: 0.45,
  },
  restrictive: {
    label: "Restrictive",
    description: "Loop shape is normal but smaller — reduced FVC and FEV₁ proportionally. FEV₁/FVC is preserved or increased (>0.70). PEFR may be reduced proportionally. Seen in pulmonary fibrosis, chest wall disease, neuromuscular weakness, obesity.",
    color: "hsl(340, 82%, 52%)",
    fvc: 2.8,
    pefr: 7,
    fev1Ratio: 0.85,
  },
  "fixed-upper": {
    label: "Fixed Upper Airway",
    description: "Flattening of both expiratory and inspiratory limbs — flow is limited in both phases. Creates a characteristic 'box' shape. Caused by fixed tracheal stenosis, goitre, or tracheal tumour that does not change with transmural pressure.",
    color: "hsl(260, 67%, 60%)",
    fvc: 4.0,
    pefr: 4,
    fev1Ratio: 0.70,
  },
  "variable-extra": {
    label: "Variable Extrathoracic",
    description: "Flattening of the inspiratory limb only. During inspiration, negative intraluminal pressure causes a compliant extrathoracic obstruction (e.g. vocal cord paralysis, laryngeal tumour) to narrow. Expiratory flow is preserved as positive pressure splints the lesion open.",
    color: "hsl(170, 70%, 45%)",
    fvc: 4.5,
    pefr: 9,
    fev1Ratio: 0.75,
  },
};

const W = 560;
const H = 340;
const PAD = { top: 25, right: 30, bottom: 45, left: 60 };
const PW = W - PAD.left - PAD.right;
const PH = H - PAD.top - PAD.bottom;

// Map data coords to SVG — volume on X (0 to maxVol), flow on Y (-maxFlow to +maxFlow)
const MAX_VOL = 6;
const MAX_FLOW = 12;

function toSvg(vol: number, flow: number): [number, number] {
  const x = PAD.left + (vol / MAX_VOL) * PW;
  const y = PAD.top + PH / 2 - (flow / MAX_FLOW) * (PH / 2);
  return [x, y];
}

function generateLoop(p: PatternInfo, pattern: Pattern): string {
  const pts: [number, number][] = [];
  const steps = 120;

  // --- Expiratory limb (positive flow, volume goes 0 → FVC) ---
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const vol = t * p.fvc;
    let flow: number;

    if (pattern === "obstructive") {
      // Scooped out concavity
      flow = p.pefr * (1 - t) * Math.exp(-2.5 * t);
      // Sharp initial rise
      if (t < 0.08) flow = p.pefr * (t / 0.08);
    } else if (pattern === "fixed-upper") {
      // Plateau limited flow
      const maxF = p.pefr;
      if (t < 0.05) flow = maxF * (t / 0.05);
      else if (t > 0.9) flow = maxF * ((1 - t) / 0.1);
      else flow = maxF;
    } else {
      // Normal / restrictive / variable-extra: sharp peak then linear decline
      if (t < 0.08) {
        flow = p.pefr * (t / 0.08);
      } else {
        flow = p.pefr * (1 - (t - 0.08) / 0.92);
      }
    }

    pts.push(toSvg(vol, Math.max(flow, 0)));
  }

  // --- Inspiratory limb (negative flow, volume goes FVC → 0) ---
  for (let i = 0; i <= steps; i++) {
    const t = i / steps; // 0 at FVC end, 1 back at 0 volume
    const vol = p.fvc * (1 - t);
    let flow: number;

    if (pattern === "fixed-upper") {
      // Plateau limited
      const maxF = p.pefr * 0.9;
      if (t < 0.05) flow = -maxF * (t / 0.05);
      else if (t > 0.9) flow = -maxF * ((1 - t) / 0.1);
      else flow = -maxF;
    } else if (pattern === "variable-extra") {
      // Flattened inspiratory limb
      const maxF = 3.5;
      if (t < 0.05) flow = -maxF * (t / 0.05);
      else if (t > 0.9) flow = -maxF * ((1 - t) / 0.1);
      else flow = -maxF;
    } else {
      // Normal semicircular inspiratory limb
      const inspPeak = p.pefr * 0.75;
      flow = -inspPeak * Math.sin(Math.PI * t);
    }

    pts.push(toSvg(vol, flow));
  }

  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

export const FlowVolumeLoopDiagram = () => {
  const [overlays, setOverlays] = useState<Set<Pattern>>(new Set(["normal"]));
  const [activeInfo, setActiveInfo] = useState<Pattern>("normal");

  const togglePattern = (p: Pattern) => {
    setOverlays((prev) => {
      const next = new Set(prev);
      if (next.has(p)) {
        if (next.size > 1) next.delete(p);
      } else {
        next.add(p);
      }
      return next;
    });
    setActiveInfo(p);
  };

  const loops = useMemo(() => {
    const result: { pattern: Pattern; path: string; info: PatternInfo }[] = [];
    overlays.forEach((key) => {
      result.push({ pattern: key, path: generateLoop(patterns[key], key), info: patterns[key] });
    });
    return result;
  }, [overlays]);

  const volTicks = [0, 1, 2, 3, 4, 5, 6];
  const flowTicks = [-8, -4, 0, 4, 8, 12];

  const info = patterns[activeInfo];

  return (
        <div className="space-y-4">
      <h3 className="font-semibold text-foreground text-sm">Flow-Volume Loops</h3>

      {/* Pattern toggles */}
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(patterns) as Pattern[]).map((key) => (
          <button
            key={key}
            onClick={() => togglePattern(key)}
            className={cn(
              "text-xs px-2.5 py-1.5 rounded-lg border transition-all font-medium",
              overlays.has(key)
                ? "shadow-sm"
                : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
            )}
            style={
              overlays.has(key)
                ? { borderColor: patterns[key].color, color: patterns[key].color }
                : undefined
            }
          >
            {patterns[key].label}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="bg-background rounded-lg border border-border overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {/* Horizontal grid & flow labels */}
          {flowTicks.map((f) => {
            const [, y] = toSvg(0, f);
            return (
              <g key={f}>
                <line
                  x1={PAD.left} x2={W - PAD.right}
                  y1={y} y2={y}
                  stroke="hsl(var(--border))" strokeWidth="0.5"
                  strokeDasharray={f === 0 ? "none" : "3,3"}
                />
                <text x={PAD.left - 6} y={y + 3} textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">
                  {f}
                </text>
              </g>
            );
          })}

          {/* Vertical grid & volume labels */}
          {volTicks.map((v) => {
            const [x] = toSvg(v, 0);
            return (
              <g key={v}>
                <line
                  x1={x} x2={x}
                  y1={PAD.top} y2={H - PAD.bottom}
                  stroke="hsl(var(--border))" strokeWidth="0.5"
                  strokeDasharray={v === 0 ? "none" : "3,3"}
                />
                <text x={x} y={H - PAD.bottom + 14} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
                  {v}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={H - PAD.bottom} stroke="hsl(var(--foreground))" strokeWidth="1" />
          <line x1={PAD.left} x2={W - PAD.right} y1={toSvg(0, 0)[1]} y2={toSvg(0, 0)[1]} stroke="hsl(var(--foreground))" strokeWidth="1" />

          {/* Axis labels */}
          <text
            x={PAD.left - 42} y={PAD.top + PH / 2}
            textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))"
            transform={`rotate(-90, ${PAD.left - 42}, ${PAD.top + PH / 2})`}
            fontWeight="600"
          >
            Flow (L/s)
          </text>
          <text
            x={PAD.left + PW / 2} y={H - 5}
            textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))"
            fontWeight="600"
          >
            Volume (L)
          </text>

          {/* Expiration / Inspiration labels */}
          <text x={W - PAD.right - 5} y={PAD.top + 14} textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))" fontStyle="italic">
            Expiration ↑
          </text>
          <text x={W - PAD.right - 5} y={H - PAD.bottom - 8} textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))" fontStyle="italic">
            Inspiration ↓
          </text>

          {/* Flow arrows */}
          {loops.map(({ pattern, info: pInfo }) => {
            const pefrPt = toSvg(0.08 * pInfo.fvc, pInfo.pefr);
            return (
                  <g key={`pefr-${pattern}`}>
                <line
                  x1={pefrPt[0]} x2={pefrPt[0]}
                  y1={pefrPt[1]} y2={pefrPt[1] + 4}
                  stroke={pInfo.color} strokeWidth="1" opacity={0.5}
                />
              </g>
  );
          })}

          {/* Loops */}
          {loops.map(({ pattern, path, info: pInfo }) => (
            <path
              key={pattern}
              d={path}
              fill={pInfo.color}
              fillOpacity={activeInfo === pattern ? 0.12 : 0.06}
              stroke={pInfo.color}
              strokeWidth={activeInfo === pattern ? "2.5" : "1.8"}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={activeInfo === pattern ? 1 : 0.6}
              onClick={() => setActiveInfo(pattern)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      {overlays.size > 1 && (
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {loops.map(({ pattern, info: pInfo }) => (
            <button
              key={pattern}
              onClick={() => setActiveInfo(pattern)}
              className={cn(
                "flex items-center gap-1.5 transition-opacity",
                activeInfo === pattern ? "opacity-100" : "opacity-50"
              )}
            >
              <span className="w-4 h-0.5 inline-block rounded" style={{ background: pInfo.color }} />
              {pInfo.label}
            </button>
          ))}
        </div>
      )}

      {/* Spirometry values */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 rounded-lg bg-secondary/30 border border-border text-center">
          <p className="text-[10px] text-muted-foreground">FVC</p>
          <p className="text-sm font-semibold text-foreground">{info.fvc.toFixed(1)} L</p>
        </div>
        <div className="p-2 rounded-lg bg-secondary/30 border border-border text-center">
          <p className="text-[10px] text-muted-foreground">PEFR</p>
          <p className="text-sm font-semibold text-foreground">{info.pefr} L/s</p>
        </div>
        <div className="p-2 rounded-lg bg-secondary/30 border border-border text-center">
          <p className="text-[10px] text-muted-foreground">FEV₁/FVC</p>
          <p className="text-sm font-semibold text-foreground">{(info.fev1Ratio * 100).toFixed(0)}%</p>
        </div>
      </div>

      {/* Description */}
      <div className="p-3 rounded-lg bg-secondary/30 border border-border">
        <p className="text-xs font-semibold text-foreground mb-1">{info.label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{info.description}</p>
      </div>

      <p className="text-xs text-muted-foreground/60 text-center italic">
        Toggle multiple patterns to overlay and compare loops
      </p>
    </div>
  );
};
