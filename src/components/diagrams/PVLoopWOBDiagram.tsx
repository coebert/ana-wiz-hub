import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Pattern = "normal" | "obstructive" | "restrictive";

interface PatternInfo {
  label: string;
  description: string;
  color: string;
  compliance: number;   // ml/cmH₂O
  resistance: number;   // cmH₂O/L/s
  vt: number;           // tidal volume ml
  frc: number;          // ml
}

const patterns: Record<Pattern, PatternInfo> = {
  normal: {
    label: "Normal",
    description: "The PV loop is narrow, indicating low resistive work. The compliance line (diagonal) divides the loop into inspiratory and expiratory resistive components. Elastic work is the triangle beneath the compliance line. Total WOB ≈ 0.3–0.6 J/L.",
    color: "hsl(var(--primary))",
    compliance: 200,
    resistance: 2,
    vt: 500,
    frc: 2500,
  },
  obstructive: {
    label: "Obstructive",
    description: "Widened loop — increased resistive work dominates, especially during expiration. Higher airway resistance (bronchospasm, secretions) means greater pressure swings for the same tidal volume. Compliance may be increased (emphysema) or normal. WOB markedly elevated.",
    color: "hsl(25, 95%, 53%)",
    compliance: 250,
    resistance: 8,
    vt: 500,
    frc: 3500,
  },
  restrictive: {
    label: "Restrictive",
    description: "Steeper compliance line (reduced compliance) — the lung is stiffer, requiring more pressure for the same volume change. Elastic work dominates. The loop is shifted right and the compliance slope is steep. Resistive work is relatively normal. WOB elevated due to elastic load.",
    color: "hsl(340, 82%, 52%)",
    compliance: 80,
    resistance: 2,
    vt: 350,
    frc: 1800,
  },
};

const W = 560;
const H = 340;
const PAD = { top: 25, right: 30, bottom: 45, left: 65 };
const PW = W - PAD.left - PAD.right;
const PH = H - PAD.top - PAD.bottom;

// Axes: X = Pressure (cmH₂O), Y = Volume (ml above FRC)
const MAX_P = 20;  // cmH₂O range: -5 to +15 → show -MAX_P/4 to MAX_P
const MIN_P = -5;
const P_RANGE = MAX_P - MIN_P;
const MAX_V = 700; // ml above FRC

function toSvg(pressure: number, volume: number): [number, number] {
  const x = PAD.left + ((pressure - MIN_P) / P_RANGE) * PW;
  const y = PAD.top + PH - (volume / MAX_V) * PH;
  return [x, y];
}

function generatePVLoop(p: PatternInfo): {
  inspiratory: [number, number][];
  expiratory: [number, number][];
  complianceLine: [number, number][];
  elasticArea: string;
  inspResistiveArea: string;
  expResistiveArea: string;
} {
  const steps = 80;
  const inspiratory: [number, number][] = [];
  const expiratory: [number, number][] = [];

  // Compliance slope: ΔV/ΔP → pressure needed = volume / compliance
  // Elastic pressure at volume V = V / C (above FRC)
  // Total pressure during inspiration = elastic + resistive
  // Resistive pressure = R * flow; assume sinusoidal flow pattern

  const peakFlow = (p.vt / 1000) * Math.PI / 2; // L/s for ~1s inspiration

  // Inspiration: volume 0 → VT
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const vol = t * p.vt;
    const elasticP = vol / p.compliance;
    const flow = peakFlow * Math.sin(Math.PI * t); // sinusoidal flow
    const resistiveP = p.resistance * flow;
    const totalP = elasticP + resistiveP;
    inspiratory.push([totalP, vol]);
  }

  // Expiration: volume VT → 0
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const vol = p.vt * (1 - t);
    const elasticP = vol / p.compliance;
    const flow = -peakFlow * Math.sin(Math.PI * t); // negative flow
    const resistiveP = p.resistance * flow;
    const totalP = elasticP + resistiveP;
    expiratory.push([totalP, vol]);
  }

  // Compliance line: straight from (0,0) to (VT/C, VT)
  const complianceLine: [number, number][] = [
    [0, 0],
    [p.vt / p.compliance, p.vt],
  ];

  // Build SVG area paths
  const inspSvg = inspiratory.map(([pr, v]) => toSvg(pr, v));
  const expSvg = expiratory.map(([pr, v]) => toSvg(pr, v));
  const _compSvg = complianceLine.map(([pr, v]) => toSvg(pr, v));

  // Elastic area: triangle under compliance line
  const origin = toSvg(0, 0);
  const compEnd = toSvg(p.vt / p.compliance, p.vt);
  const compMidY = toSvg(p.vt / p.compliance, 0);
  const elasticArea = `M${origin[0]},${origin[1]} L${compEnd[0]},${compEnd[1]} L${compMidY[0]},${compMidY[1]} Z`;

  // Inspiratory resistive area: between inspiratory curve and compliance line
  // Sample compliance line at same volumes
  const inspCompPoints = inspiratory.map(([, v]) => {
    const cP = v / p.compliance;
    return toSvg(cP, v);
  });
  let inspResistiveArea = `M${inspCompPoints[0][0]},${inspCompPoints[0][1]}`;
  for (let i = 1; i < inspSvg.length; i++) {
    inspResistiveArea += ` L${inspSvg[i][0]},${inspSvg[i][1]}`;
  }
  for (let i = inspCompPoints.length - 1; i >= 0; i--) {
    inspResistiveArea += ` L${inspCompPoints[i][0]},${inspCompPoints[i][1]}`;
  }
  inspResistiveArea += " Z";

  // Expiratory resistive area: between compliance line and expiratory curve
  const expCompPoints = expiratory.map(([, v]) => {
    const cP = v / p.compliance;
    return toSvg(cP, v);
  });
  let expResistiveArea = `M${expCompPoints[0][0]},${expCompPoints[0][1]}`;
  for (let i = 1; i < expSvg.length; i++) {
    expResistiveArea += ` L${expSvg[i][0]},${expSvg[i][1]}`;
  }
  for (let i = expCompPoints.length - 1; i >= 0; i--) {
    expResistiveArea += ` L${expCompPoints[i][0]},${expCompPoints[i][1]}`;
  }
  expResistiveArea += " Z";

  return { inspiratory, expiratory, complianceLine, elasticArea, inspResistiveArea, expResistiveArea };
}

type WorkComponent = "all" | "elastic" | "insp-resistive" | "exp-resistive";

export const PVLoopWOBDiagram = () => {
  const [selected, setSelected] = useState<Pattern>("normal");
  const [highlight, setHighlight] = useState<WorkComponent>("all");

  const data = useMemo(() => generatePVLoop(patterns[selected]), [selected]);
  const info = patterns[selected];

  const inspPath = data.inspiratory.map(([p, v], i) => {
    const [x, y] = toSvg(p, v);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const expPath = data.expiratory.map(([p, v], i) => {
    const [x, y] = toSvg(p, v);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const compPath = data.complianceLine.map(([p, v], i) => {
    const [x, y] = toSvg(p, v);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const pTicks = [-4, 0, 4, 8, 12, 16, 20];
  const vTicks = [0, 100, 200, 300, 400, 500, 600, 700];

  const elasticColor = "hsl(210, 70%, 55%)";
  const inspResColor = "hsl(45, 90%, 50%)";
  const expResColor = "hsl(0, 70%, 55%)";

  const workLabels: { key: WorkComponent; label: string; color: string; desc: string }[] = [
    { key: "all", label: "All", color: info.color, desc: "Total work of breathing" },
    { key: "elastic", label: "Elastic", color: elasticColor, desc: "Work against elastic recoil (compliance)" },
    { key: "insp-resistive", label: "Insp. Resistive", color: inspResColor, desc: "Work against airway resistance during inspiration" },
    { key: "exp-resistive", label: "Exp. Resistive", color: expResColor, desc: "Work against airway resistance during expiration (normally passive)" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground text-sm">Pressure-Volume Loop — Work of Breathing</h3>

      {/* Pattern selector */}
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(patterns) as Pattern[]).map((key) => (
          <button
            key={key}
            onClick={() => { setSelected(key); setHighlight("all"); }}
            className={cn(
              "text-xs px-2.5 py-1.5 rounded-lg border transition-all font-medium",
              selected === key
                ? "border-primary bg-primary/10 text-primary shadow-sm"
                : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
            )}
          >
            {patterns[key].label}
          </button>
        ))}
      </div>

      {/* Work component toggles */}
      <div className="flex flex-wrap gap-1.5">
        {workLabels.map((w) => (
          <button
            key={w.key}
            onClick={() => setHighlight(w.key)}
            className={cn(
              "text-xs px-2.5 py-1 rounded-full border transition-all font-medium",
              highlight === w.key
                ? "shadow-sm"
                : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
            )}
            style={
              highlight === w.key
                ? { borderColor: w.color, background: `${w.color}15`, color: w.color }
                : undefined
            }
          >
            {w.label}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="bg-background rounded-lg border border-border overflow-hidden">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {/* Horizontal grid (volume) */}
          {vTicks.map((v) => {
            const [, y] = toSvg(0, v);
            return (
              <g key={`v${v}`}>
                <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y}
                  stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray={v === 0 ? "none" : "3,3"} />
                <text x={PAD.left - 6} y={y + 3} textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">
                  {v}
                </text>
              </g>
            );
          })}

          {/* Vertical grid (pressure) */}
          {pTicks.map((p) => {
            const [x] = toSvg(p, 0);
            return (
              <g key={`p${p}`}>
                <line x1={x} x2={x} y1={PAD.top} y2={H - PAD.bottom}
                  stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray={p === 0 ? "none" : "3,3"} />
                <text x={x} y={H - PAD.bottom + 14} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
                  {p}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line x1={PAD.left} x2={PAD.left} y1={PAD.top} y2={H - PAD.bottom} stroke="hsl(var(--foreground))" strokeWidth="1" />
          <line x1={PAD.left} x2={W - PAD.right} y1={H - PAD.bottom} y2={H - PAD.bottom} stroke="hsl(var(--foreground))" strokeWidth="1" />

          {/* Axis labels */}
          <text
            x={PAD.left - 48} y={PAD.top + PH / 2}
            textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))"
            transform={`rotate(-90, ${PAD.left - 48}, ${PAD.top + PH / 2})`}
            fontWeight="600"
          >
            Volume (ml)
          </text>
          <text
            x={PAD.left + PW / 2} y={H - 5}
            textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))"
            fontWeight="600"
          >
            Pressure (cmH₂O)
          </text>

          {/* Shaded areas */}
          {(highlight === "all" || highlight === "elastic") && (
            <path d={data.elasticArea} fill={elasticColor} opacity={highlight === "elastic" ? 0.25 : 0.1} />
          )}
          {(highlight === "all" || highlight === "insp-resistive") && (
            <path d={data.inspResistiveArea} fill={inspResColor} opacity={highlight === "insp-resistive" ? 0.3 : 0.1} />
          )}
          {(highlight === "all" || highlight === "exp-resistive") && (
            <path d={data.expResistiveArea} fill={expResColor} opacity={highlight === "exp-resistive" ? 0.3 : 0.1} />
          )}

          {/* Compliance line */}
          <path d={compPath} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="6,3" />
          {/* Label on compliance line */}
          {(() => {
            const midP = (info.vt / info.compliance) / 2;
            const midV = info.vt / 2;
            const [lx, ly] = toSvg(midP, midV);
            return (
              <text x={lx - 12} y={ly - 6} fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="600"
                transform={`rotate(${-Math.atan2(PH * info.vt / MAX_V, PW * (info.vt / info.compliance) / P_RANGE) * 180 / Math.PI}, ${lx - 12}, ${ly - 6})`}
              >
                C = {info.compliance}
              </text>
            );
          })()}

          {/* PV loop curves */}
          <path d={inspPath} fill="none" stroke={info.color} strokeWidth="2" strokeLinecap="round" />
          <path d={expPath} fill="none" stroke={info.color} strokeWidth="2" strokeLinecap="round" />

          {/* Arrows for direction */}
          {(() => {
            // Inspiration arrow at ~40% up
            const idx = Math.round(data.inspiratory.length * 0.4);
            const [p1, v1] = data.inspiratory[idx];
            const [p2, v2] = data.inspiratory[idx + 2];
            const [x1, y1] = toSvg(p1, v1);
            const [x2, y2] = toSvg(p2, v2);
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const aLen = 6;
            return (
              <g>
                <polygon
                  points={`${x1},${y1} ${x1 - aLen * Math.cos(angle - 0.4)},${y1 - aLen * Math.sin(angle - 0.4)} ${x1 - aLen * Math.cos(angle + 0.4)},${y1 - aLen * Math.sin(angle + 0.4)}`}
                  fill={info.color}
                />
                <text x={x1 + 8} y={y1 - 4} fontSize="8" fill={info.color} fontWeight="600">Insp</text>
              </g>
            );
          })()}
          {(() => {
            const idx = Math.round(data.expiratory.length * 0.4);
            const [p1, v1] = data.expiratory[idx];
            const [p2, v2] = data.expiratory[idx + 2];
            const [x1, y1] = toSvg(p1, v1);
            const [x2, y2] = toSvg(p2, v2);
            const angle = Math.atan2(y2 - y1, x2 - x1);
            const aLen = 6;
            return (
    <DiagramFigure
      id="pv-loop-wob-diagram"
      title="Pv loop wob"
      description="Auto-generated wrapper for the Pv loop wob anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                    <g>
                  <polygon
                    points={`${x1},${y1} ${x1 - aLen * Math.cos(angle - 0.4)},${y1 - aLen * Math.sin(angle - 0.4)} ${x1 - aLen * Math.cos(angle + 0.4)},${y1 - aLen * Math.sin(angle + 0.4)}`}
                    fill={info.color}
                  />
                  <text x={x1 - 28} y={y1 + 4} fontSize="8" fill={info.color} fontWeight="600">Exp</text>
                </g>
    </DiagramFigure>
  );
          })()}
        </svg>
      </div>

      {/* Values */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2 rounded-lg bg-secondary/30 border border-border text-center">
          <p className="text-[10px] text-muted-foreground">Compliance</p>
          <p className="text-sm font-semibold text-foreground">{info.compliance} ml/cmH₂O</p>
        </div>
        <div className="p-2 rounded-lg bg-secondary/30 border border-border text-center">
          <p className="text-[10px] text-muted-foreground">Resistance</p>
          <p className="text-sm font-semibold text-foreground">{info.resistance} cmH₂O/L/s</p>
        </div>
        <div className="p-2 rounded-lg bg-secondary/30 border border-border text-center">
          <p className="text-[10px] text-muted-foreground">Tidal Volume</p>
          <p className="text-sm font-semibold text-foreground">{info.vt} ml</p>
        </div>
      </div>

      {/* Description */}
      <div className="p-3 rounded-lg bg-secondary/30 border border-border">
        <p className="text-xs font-semibold text-foreground mb-1">{info.label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{info.description}</p>
      </div>

      {/* Component description */}
      {highlight !== "all" && (
        <div className="p-3 rounded-lg border border-border"
          style={{ background: `${workLabels.find(w => w.key === highlight)!.color}10` }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: workLabels.find(w => w.key === highlight)!.color }}>
            {workLabels.find(w => w.key === highlight)!.label} Work
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {workLabels.find(w => w.key === highlight)!.desc}
            {highlight === "elastic" && " — represented by the triangle under the compliance line. Increased in restrictive disease (steeper slope)."}
            {highlight === "insp-resistive" && " — the area between the inspiratory curve and compliance line. Increased in obstructive disease."}
            {highlight === "exp-resistive" && " — the area between the compliance line and expiratory curve. Normally passive (elastic recoil provides the driving pressure). Becomes active work in severe obstruction."}
          </p>
        </div>
      )}
    </div>
  );
};
