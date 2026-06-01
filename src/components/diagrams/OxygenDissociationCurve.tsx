import { useState, useMemo, useCallback } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

// Hill equation for ODC
const hillEquation = (pO2: number, p50: number, n: number = 2.7): number => {
  return (Math.pow(pO2, n) / (Math.pow(p50, n) + Math.pow(pO2, n))) * 100;
};

// COHb reduces effective Hb and shifts curve left
const effectiveSat = (sO2: number, cohbFraction: number): number => {
  return sO2 * (1 - cohbFraction);
};

// O₂ content calculation: CaO₂ = (1.34 × Hb × SaO₂/100) + (0.023 × PaO₂)
const o2Content = (sO2: number, pO2: number, hb: number): number => {
  return (1.34 * hb * sO2 / 100) + (0.023 * pO2);
};

// Dissolved O₂ only
const dissolvedO2 = (pO2: number): number => 0.023 * pO2;

interface Factor {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  normal: number;
  step: number;
  p50Effect: number;
  description: string;
  leftLabel: string;
  rightLabel: string;
}

const FACTORS: Factor[] = [
  { id: "temp", label: "Temperature", unit: "°C", min: 33, max: 42, normal: 37, step: 0.5,
    p50Effect: 2.4, description: "↑ Temp → right shift (↓ affinity, easier O₂ offloading to tissues). Hypothermia → left shift (↑ affinity).",
    leftLabel: "Hypothermia", rightLabel: "Fever" },
  { id: "ph", label: "pH", unit: "", min: 7.0, max: 7.6, normal: 7.4, step: 0.05,
    p50Effect: -25, description: "Bohr effect: ↓ pH (acidosis) → right shift. ↑ pH (alkalosis) → left shift. H⁺ stabilises T-state (deoxy-Hb).",
    leftLabel: "Alkalosis", rightLabel: "Acidosis" },
  { id: "dpg", label: "2,3-DPG", unit: "×normal", min: 0.3, max: 2.0, normal: 1.0, step: 0.1,
    p50Effect: 8, description: "2,3-DPG binds deoxy-Hb β-chains → stabilises T-state → right shift. ↑ in anaemia, chronic hypoxia, altitude. ↓ in stored blood, hypothermia.",
    leftLabel: "↓ (stored blood)", rightLabel: "↑ (altitude)" },
  { id: "co", label: "COHb", unit: "%", min: 0, max: 50, normal: 0, step: 5,
    p50Effect: -0.4, description: "CO binds Hb with 240× affinity of O₂. Shifts curve LEFT (↑ affinity of remaining Hb for O₂) AND reduces O₂-carrying capacity. Double hit to O₂ delivery.",
    leftLabel: "Normal", rightLabel: "CO poisoning" },
];

type ViewMode = "saturation" | "content";

interface CurveProps {
  showShifts?: boolean;
}

export const OxygenDissociationCurve = ({ showShifts = false }: CurveProps) => {
  const [values, setValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    FACTORS.forEach(f => { init[f.id] = f.normal; });
    return init;
  });
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [hoveredPO2, setHoveredPO2] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("saturation");
  const [hbConc, setHbConc] = useState(15); // g/dL
  const [showDissolved, setShowDissolved] = useState(false);

  // Calculate effective P50
  const p50 = useMemo(() => {
    let p = 26.7;
    FACTORS.forEach(f => {
      const delta = values[f.id] - f.normal;
      p += delta * f.p50Effect;
    });
    return Math.max(10, Math.min(60, p));
  }, [values]);

  const cohbFrac = values.co / 100;
  const isShifted = Math.abs(p50 - 26.7) > 0.5 || cohbFrac > 0.01;

  // SVG dimensions
  const svgW = 460, svgH = 340;
  const padL = 55, padB = 44, padR = 50, padT = 15;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const xMax = 100;
  const yMaxSat = 100;
  const yMaxContent = viewMode === "content" ? Math.ceil(o2Content(100, 100, hbConc) / 5) * 5 + 2 : 100;

  const toX = (pO2: number) => padL + (pO2 / xMax) * plotW;
  const toY = useCallback((val: number) => {
    const yMax = viewMode === "content" ? yMaxContent : yMaxSat;
    return padT + plotH - (val / yMax) * plotH;
  }, [viewMode, yMaxContent, plotH, padT]);

  const generateSatPath = (p50Val: number, coFrac: number = 0): string => {
    const pts: string[] = [];
    for (let i = 0; i <= 100; i++) {
      let sO2 = hillEquation(i, p50Val);
      if (coFrac > 0) sO2 = effectiveSat(sO2, coFrac);
      const yVal = viewMode === "content" ? o2Content(sO2, i, hbConc * (1 - coFrac)) : sO2;
      pts.push(`${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(yVal).toFixed(1)}`);
    }
    return pts.join(" ");
  };

  const generateDissolvedPath = (): string => {
    const pts: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const yVal = viewMode === "content" ? dissolvedO2(i) : (dissolvedO2(i) / o2Content(100, 100, hbConc)) * 100;
      pts.push(`${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(yVal).toFixed(1)}`);
    }
    return pts.join(" ");
  };

  const normalPath = useMemo(() => generateSatPath(26.7), [viewMode, hbConc, toY]);
  const shiftedPath = useMemo(() => generateSatPath(p50, cohbFrac), [p50, cohbFrac, viewMode, hbConc, toY]);
  const dissolvedPath = useMemo(() => generateDissolvedPath(), [viewMode, hbConc, toY]);

  // Key y-axis ticks
  const yTicks = viewMode === "content"
    ? Array.from({ length: Math.floor(yMaxContent / 5) + 1 }, (_, i) => i * 5)
    : [0, 25, 50, 75, 100];

  const hoverSats = hoveredPO2 !== null ? (() => {
    const nSat = hillEquation(hoveredPO2, 26.7);
    const sSat = effectiveSat(hillEquation(hoveredPO2, p50), cohbFrac);
    if (viewMode === "content") {
      return {
        normal: o2Content(nSat, hoveredPO2, hbConc),
        shifted: o2Content(sSat, hoveredPO2, hbConc * (1 - cohbFrac)),
        dissolved: dissolvedO2(hoveredPO2),
      };
    }
    return { normal: nSat, shifted: sSat, dissolved: 0 };
  })() : null;

  // Clinical reference points
  const clinicalPoints = useMemo(() => {
    const pts = [
      { pO2: 26.7, label: "P₅₀", rawSat: 50 },
      { pO2: 40, label: "Mixed venous", rawSat: hillEquation(40, 26.7) },
      { pO2: 60, label: "Steep→flat", rawSat: hillEquation(60, 26.7) },
      { pO2: 100, label: "Arterial", rawSat: hillEquation(100, 26.7) },
    ];
    return pts.map(pt => ({
      ...pt,
      yVal: viewMode === "content" ? o2Content(pt.rawSat, pt.pO2, hbConc) : pt.rawSat,
    }));
  }, [viewMode, hbConc]);

  const shiftDirection = p50 > 27.5 ? "right" : p50 < 25.5 ? "left" : "normal";

  const reset = () => {
    const init: Record<string, number> = {};
    FACTORS.forEach(f => { init[f.id] = f.normal; });
    setValues(init);
  };

  // Delivery zone annotation
  const artSat = effectiveSat(hillEquation(100, p50), cohbFrac);
  const venSat = effectiveSat(hillEquation(40, p50), cohbFrac);
  const artContent = o2Content(artSat, 100, hbConc * (1 - cohbFrac));
  const venContent = o2Content(venSat, 40, hbConc * (1 - cohbFrac));
  const o2Delivery = artContent - venContent; // ml O₂/dL blood extracted

  // ═══════ SIMPLE VIEW ═══════
  if (!showShifts) {
    return (
      <div className="w-full max-w-lg mx-auto space-y-3">
        {/* View toggle */}
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setViewMode("saturation")}
            className={`px-2.5 py-1 rounded text-[10px] sm:text-xs font-medium border transition-all ${viewMode === "saturation" ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}>
            SaO₂ (%)
          </button>
          <button onClick={() => setViewMode("content")}
            className={`px-2.5 py-1 rounded text-[10px] sm:text-xs font-medium border transition-all ${viewMode === "content" ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}>
            O₂ Content (ml/dL)
          </button>
          <label className="flex items-center gap-1 text-[10px] text-muted-foreground ml-2">
            <input type="checkbox" checked={showDissolved} onChange={e => setShowDissolved(e.target.checked)} className="w-3 h-3 accent-primary" />
            Dissolved O₂
          </label>
        </div>

        {viewMode === "content" && (
          <div className="flex items-center gap-2 justify-center">
            <label className="text-xs text-muted-foreground">Hb:</label>
            <input type="range" min={5} max={20} step={0.5} value={hbConc}
              onChange={e => setHbConc(Number(e.target.value))}
              className="w-24 h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
            <span className="text-xs font-mono text-foreground">{hbConc} g/dL</span>
          </div>
        )}

        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
          {/* Grid */}
          {yTicks.map(v => (
            <g key={`h-${v}`}>
              <line x1={padL} y1={toY(v)} x2={svgW - padR} y2={toY(v)} stroke="hsl(var(--border))" strokeWidth="0.5" />
              <text x={padL - 6} y={toY(v) + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">{v}</text>
            </g>
          ))}
          {[0, 20, 40, 60, 80, 100].map(v => (
            <g key={`v-${v}`}>
              <line x1={toX(v)} y1={padT} x2={toX(v)} y2={svgH - padB} stroke="hsl(var(--border))" strokeWidth="0.5" />
              <text x={toX(v)} y={svgH - padB + 12} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">{v}</text>
            </g>
          ))}

          {/* kPa secondary x-axis: 1 kPa ≈ 7.5 mmHg, so place each kPa tick at toX(kPa × 7.5) */}
          {[0, 2.7, 5.3, 8, 10.7, 13.3].map(kpa => {
            const mmhg = kpa * 7.5;
            if (mmhg > 100) return null;
            return (
              <text key={`kpa-${kpa}`} x={toX(mmhg)} y={svgH - padB + 24} textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.6">
                {kpa === 0 ? 0 : kpa.toFixed(1)}
              </text>
            );
          })}
          <text x={svgW / 2} y={svgH - padB + 14} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600">PaO₂ (mmHg)</text>
          <text x={svgW / 2} y={svgH - 2} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))" opacity="0.6">PaO₂ (kPa)</text>
          <text x={12} y={padT + plotH / 2} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600"
            transform={`rotate(-90, 12, ${padT + plotH / 2})`}>
            {viewMode === "content" ? "O₂ Content (ml/dL)" : "SaO₂ (%)"}
          </text>

          {/* Steep zone shading (20-60 mmHg ≈ 2.7-8 kPa) */}
          <rect x={toX(20)} y={padT} width={toX(60) - toX(20)} height={plotH}
            fill="hsl(35 80% 50%)" opacity="0.04" />
          <text x={toX(40)} y={padT + 12} fontSize="6.5" fill="hsl(35 80% 50%)" textAnchor="middle" opacity="0.6">
            Steep zone — rapid desaturation
          </text>

          {/* Main curve */}
          <path d={normalPath} fill="none" stroke="hsl(170 50% 40%)" strokeWidth="2" />

          {/* Dissolved O₂ line */}
          {showDissolved && (
            <>
              <path d={dissolvedPath} fill="none" stroke="hsl(210 60% 60%)" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x={svgW - padR - 2} y={toY(viewMode === "content" ? dissolvedO2(95) : 3) - 4}
                fontSize="7" fill="hsl(210 60% 60%)" textAnchor="end">Dissolved O₂</text>
            </>
          )}

          {/* P50 crosshairs (P50 = 26.7 mmHg = 3.5 kPa) */}
          {viewMode === "saturation" && (
            <>
              <line x1={toX(26.7)} y1={toY(50)} x2={toX(26.7)} y2={toY(0)} stroke="hsl(170 50% 40%)" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />
              <line x1={toX(0)} y1={toY(50)} x2={toX(26.7)} y2={toY(50)} stroke="hsl(170 50% 40%)" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />
              <circle cx={toX(26.7)} cy={toY(50)} r="4" fill="hsl(170 50% 40%)" />
              <text x={toX(26.7) + 8} y={toY(50) - 6} fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">P₅₀ = 26.7 mmHg (3.5 kPa)</text>
            </>
          )}

          {/* Clinical reference points */}
          {clinicalPoints.slice(1).map(pt => (
            <g key={pt.label}>
              <circle cx={toX(pt.pO2)} cy={toY(pt.yVal)} r="3" fill="hsl(var(--foreground))" opacity="0.4" />
              <text x={toX(pt.pO2) - 8} y={toY(pt.yVal) - 8} fontSize="7.5" fill="hsl(var(--muted-foreground))" textAnchor="end">
                {pt.label} ({viewMode === "content" ? `${pt.yVal.toFixed(1)}` : `${Math.round(pt.rawSat)}%`})
              </text>
            </g>
          ))}

          {/* A-V O₂ content difference annotation */}
          {viewMode === "content" && (
            <g>
              <line x1={svgW - padR + 5} y1={toY(artContent)} x2={svgW - padR + 5} y2={toY(venContent)}
                stroke="hsl(0 65% 55%)" strokeWidth="1.5" markerEnd="url(#arrowDown)" markerStart="url(#arrowUp)" />
              <text x={svgW - padR + 10} y={toY((artContent + venContent) / 2)} fontSize="7" fill="hsl(0 65% 55%)" fontWeight="600">
                a-v
              </text>
              <text x={svgW - padR + 10} y={toY((artContent + venContent) / 2) + 9} fontSize="6.5" fill="hsl(var(--muted-foreground))">
                {o2Delivery.toFixed(1)}
              </text>
            </g>
          )}

          <defs>
            <marker id="arrowDown" markerWidth="4" markerHeight="4" refX="2" refY="4" orient="auto">
              <path d="M0,0 L2,4 L4,0" fill="hsl(0 65% 55%)" />
            </marker>
            <marker id="arrowUp" markerWidth="4" markerHeight="4" refX="2" refY="0" orient="auto">
              <path d="M0,4 L2,0 L4,4" fill="hsl(0 65% 55%)" />
            </marker>
          </defs>
        </svg>

        {/* Content equation box */}
        {viewMode === "content" && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
            <p className="text-xs font-semibold text-foreground mb-1">O₂ Content Equation</p>
            <p className="text-[11px] text-muted-foreground font-mono">
              CaO₂ = (1.34 × Hb × SaO₂/100) + (0.023 × PaO₂)
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              Bound: {(1.34 * hbConc * hillEquation(100, 26.7) / 100).toFixed(1)} ml/dL &nbsp;|&nbsp;
              Dissolved: {dissolvedO2(100).toFixed(1)} ml/dL &nbsp;|&nbsp;
              Total CaO₂: {o2Content(hillEquation(100, 26.7), 100, hbConc).toFixed(1)} ml/dL
            </p>
          </div>
        )}
      </div>
    );
  }

  // ═══════ INTERACTIVE SHIFT VIEW ═══════
  return (
    <DiagramFigure id="odc" title="Oxyhaemoglobin dissociation curve with right- and left-shift modifiers" description="Hill-equation oxygen dissociation curve with adjustable P50 — temperature, pH, 2,3-DPG and PaCO2 shift the curve and alter oxygen content.">
    <div className="space-y-4">
      {/* View toggle */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button onClick={() => setViewMode("saturation")}
          className={`px-2.5 py-1 rounded text-[10px] sm:text-xs font-medium border transition-all ${viewMode === "saturation" ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}>
          SaO₂ (%)
        </button>
        <button onClick={() => setViewMode("content")}
          className={`px-2.5 py-1 rounded text-[10px] sm:text-xs font-medium border transition-all ${viewMode === "content" ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"}`}>
          O₂ Content (ml/dL)
        </button>
        <label className="flex items-center gap-1 text-[10px] text-muted-foreground ml-1">
          <input type="checkbox" checked={showDissolved} onChange={e => setShowDissolved(e.target.checked)} className="w-3 h-3 accent-primary" />
          Dissolved O₂
        </label>
        {viewMode === "content" && (
          <div className="flex items-center gap-1">
            <label className="text-[10px] text-muted-foreground">Hb:</label>
            <input type="range" min={5} max={20} step={0.5} value={hbConc}
              onChange={e => setHbConc(Number(e.target.value))}
              className="w-16 h-1 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
            <span className="text-[10px] font-mono text-foreground">{hbConc}</span>
          </div>
        )}
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full"
        onMouseMove={(e) => {
          const svg = e.currentTarget;
          const pt = svg.createSVGPoint();
          pt.x = e.clientX;
          const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());
          const pO2 = ((svgPt.x - padL) / plotW) * xMax;
          if (pO2 >= 0 && pO2 <= xMax) setHoveredPO2(pO2);
          else setHoveredPO2(null);
        }}
        onMouseLeave={() => setHoveredPO2(null)}>

        {/* Grid */}
        {yTicks.map(v => (
          <g key={`h-${v}`}>
            <line x1={padL} y1={toY(v)} x2={svgW - padR} y2={toY(v)} stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={padL - 6} y={toY(v) + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">{v}</text>
          </g>
        ))}
        {[0, 20, 40, 60, 80, 100].map(v => (
          <g key={`v-${v}`}>
            <line x1={toX(v)} y1={padT} x2={toX(v)} y2={svgH - padB} stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={toX(v)} y={svgH - padB + 12} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">{v}</text>
          </g>
        ))}

        {/* kPa secondary axis: 1 kPa ≈ 7.5 mmHg */}
        {[0, 2.7, 5.3, 8, 10.7, 13.3].map(kpa => {
          const mmhg = kpa * 7.5;
          if (mmhg > 100) return null;
          return (
            <text key={`kpa-${kpa}`} x={toX(mmhg)} y={svgH - padB + 24} textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.6">
              {kpa === 0 ? 0 : kpa.toFixed(1)}
            </text>
          );
        })}
        <text x={(padL + svgW - padR) / 2} y={svgH - padB + 14} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600">PaO₂ (mmHg)</text>
        <text x={(padL + svgW - padR) / 2} y={svgH - 2} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))" opacity="0.6">PaO₂ (kPa)</text>
        <text x={12} y={padT + plotH / 2} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600"
          transform={`rotate(-90, 12, ${padT + plotH / 2})`}>
          {viewMode === "content" ? "O₂ Content (ml/dL)" : "SaO₂ (%)"}
        </text>

        {/* Steep zone (20-60 mmHg ≈ 2.7-8 kPa) */}
        <rect x={toX(20)} y={padT} width={toX(60) - toX(20)} height={plotH}
          fill="hsl(35 80% 50%)" opacity="0.04" />

        {/* Static reference: left- and right-shift curves (always visible to illustrate concept) */}
        <path d={generateSatPath(20)} fill="none" stroke="hsl(210 70% 55%)" strokeWidth="1" strokeDasharray="3 2" opacity="0.45" />
        <path d={generateSatPath(35)} fill="none" stroke="hsl(0 65% 50%)" strokeWidth="1" strokeDasharray="3 2" opacity="0.45" />
        <text x={toX(18)} y={toY(85)} fontSize="7" fill="hsl(210 70% 55%)" fontWeight="600">← Left shift</text>
        <text x={toX(55)} y={toY(60)} fontSize="7" fill="hsl(0 65% 50%)" fontWeight="600">Right shift →</text>

        {/* Normal curve (reference) */}
        <path d={normalPath} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.35" />

        {/* Shifted curve */}
        <path d={shiftedPath} fill="none"
          stroke={shiftDirection === "right" ? "hsl(0 65% 50%)" : shiftDirection === "left" ? "hsl(210 70% 55%)" : "hsl(170 50% 40%)"}
          strokeWidth="2" />

        {/* Dissolved O₂ line */}
        {showDissolved && (
          <>
            <path d={dissolvedPath} fill="none" stroke="hsl(210 60% 60%)" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x={svgW - padR - 2} y={toY(viewMode === "content" ? dissolvedO2(90) : 3) - 4}
              fontSize="7" fill="hsl(210 60% 60%)" textAnchor="end">Dissolved</text>
          </>
        )}

        {/* COHb shading */}
        {cohbFrac > 0.01 && viewMode === "saturation" && (
          <>
            <path d={(() => {
              let d = "";
              for (let i = 0; i <= 100; i++) {
                const sNormal = hillEquation(i, p50);
                d += `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(sNormal).toFixed(1)} `;
              }
              for (let i = 100; i >= 0; i--) {
                const sEff = effectiveSat(hillEquation(i, p50), cohbFrac);
                d += `L ${toX(i).toFixed(1)} ${toY(sEff).toFixed(1)} `;
              }
              return d + "Z";
            })()} fill="hsl(0 70% 50%)" opacity="0.08" />
            <text x={toX(70)} y={toY(hillEquation(70, p50) - 8)} fontSize="7" fill="hsl(0 65% 50%)" textAnchor="middle" opacity="0.7">
              COHb = {values.co}%
            </text>
          </>
        )}

        {/* P50 markers */}
        {viewMode === "saturation" && (
          <>
            <circle cx={toX(26.7 / 7.5)} cy={toY(50)} r="3" fill="hsl(var(--muted-foreground))" opacity="0.3" />
            {isShifted && (
              <>
                <line x1={toX(p50 / 7.5)} y1={toY(effectiveSat(50, cohbFrac))} x2={toX(p50 / 7.5)} y2={toY(0)}
                  stroke={shiftDirection === "right" ? "hsl(0 65% 50%)" : "hsl(210 70% 55%)"} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />
                <circle cx={toX(p50 / 7.5)} cy={toY(effectiveSat(50, cohbFrac))} r="4"
                  fill={shiftDirection === "right" ? "hsl(0 65% 50%)" : "hsl(210 70% 55%)"} />
                <text x={toX(p50 / 7.5) + (shiftDirection === "right" ? 8 : -8)} y={toY(effectiveSat(50, cohbFrac)) - 6}
                  fontSize="8" fill="hsl(var(--foreground))" fontWeight="600"
                  textAnchor={shiftDirection === "right" ? "start" : "end"}>
                  P₅₀ = {(p50 / 7.5).toFixed(1)} kPa
                </text>
              </>
            )}
          </>
        )}

        {/* Hover crosshair */}
        {hoveredPO2 !== null && hoverSats && (
          <g>
            <line x1={toX(hoveredPO2)} y1={padT} x2={toX(hoveredPO2)} y2={svgH - padB}
              stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.2" />
            <circle cx={toX(hoveredPO2)} cy={toY(hoverSats.shifted)} r="3.5"
              fill={shiftDirection === "right" ? "hsl(0 65% 50%)" : shiftDirection === "left" ? "hsl(210 70% 55%)" : "hsl(170 50% 40%)"} />
            <rect x={Math.min(toX(hoveredPO2) + 8, svgW - padR - 95)} y={toY(hoverSats.shifted) - 28} width="90" height={showDissolved ? 38 : 28} rx="4"
              fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={Math.min(toX(hoveredPO2) + 14, svgW - padR - 89)} y={toY(hoverSats.shifted) - 15} fontSize="8" fill="hsl(var(--foreground))">
              PO₂ {hoveredPO2.toFixed(1)} kPa → {viewMode === "content" ? `${hoverSats.shifted.toFixed(1)} ml/dL` : `${Math.round(hoverSats.shifted)}%`}
            </text>
            {showDissolved && viewMode === "content" && (
              <text x={Math.min(toX(hoveredPO2) + 14, svgW - padR - 89)} y={toY(hoverSats.shifted) - 3} fontSize="7" fill="hsl(210 60% 60%)">
                Dissolved: {hoverSats.dissolved.toFixed(2)} ml/dL
              </text>
            )}
          </g>
        )}

        {/* Shift direction */}
        {isShifted && (
          <g>
            <text x={svgW - padR - 5} y={padT + 15} fontSize="10" fill={shiftDirection === "right" ? "hsl(0 65% 50%)" : "hsl(210 70% 55%)"}
              textAnchor="end" fontWeight="700">
              {shiftDirection === "right" ? "→ Right Shift" : "← Left Shift"}
            </text>
            <text x={svgW - padR - 5} y={padT + 26} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="end">
              {shiftDirection === "right" ? "↓ Affinity — aids tissue O₂ delivery" : "↑ Affinity — impairs O₂ offloading"}
            </text>
          </g>
        )}

        {/* Legend */}
        <line x1={padL + 5} y1={padT + 8} x2={padL + 20} y2={padT + 8} stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
        <text x={padL + 24} y={padT + 11} fontSize="8" fill="hsl(var(--muted-foreground))">Normal</text>
      </svg>

      {/* Factor sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FACTORS.map(f => {
          const isChanged = Math.abs(values[f.id] - f.normal) > f.step * 0.5;
          return (
            <div key={f.id} className={`rounded-lg border p-3 transition-all ${
              isChanged ? "border-primary/30 bg-primary/5" : "border-border"
            }`}>
              <div className="flex items-center justify-between mb-1">
                <button onClick={() => setActiveInfo(activeInfo === f.id ? null : f.id)}
                  className="text-xs font-medium text-foreground hover:text-primary transition-colors">
                  {f.label} {activeInfo === f.id ? "▾" : "▸"}
                </button>
                <span className="text-xs text-muted-foreground font-mono">
                  {values[f.id]}{f.unit}
                  {isChanged && <span className="ml-1 text-primary">(N: {f.normal})</span>}
                </span>
              </div>
              <input type="range" min={f.min} max={f.max} step={f.step} value={values[f.id]}
                onChange={e => setValues(prev => ({ ...prev, [f.id]: Number(e.target.value) }))}
                className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
              <div className="flex justify-between mt-0.5">
                <span className="text-[9px] text-muted-foreground">{f.leftLabel}</span>
                <span className="text-[9px] text-muted-foreground">{f.rightLabel}</span>
              </div>
              {activeInfo === f.id && (
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed animate-fade-in">{f.description}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary readout */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="rounded-lg border border-border p-2">
          <p className="text-xs text-muted-foreground">P₅₀</p>
          <p className={`text-sm font-semibold ${isShifted ? (shiftDirection === "right" ? "text-red-500" : "text-blue-500") : "text-foreground"}`}>
            {(p50 / 7.5).toFixed(1)} kPa
          </p>
        </div>
        <div className="rounded-lg border border-border p-2">
          <p className="text-xs text-muted-foreground">SaO₂ @PvO₂ 5.3</p>
          <p className="text-sm font-semibold text-foreground">
            {Math.round(effectiveSat(hillEquation(40, p50), cohbFrac))}%
          </p>
        </div>
        <div className="rounded-lg border border-border p-2">
          <p className="text-xs text-muted-foreground">CaO₂</p>
          <p className="text-sm font-semibold text-foreground">
            {artContent.toFixed(1)} ml/dL
          </p>
        </div>
        <div className="rounded-lg border border-border p-2">
          <p className="text-xs text-muted-foreground">a-v O₂ diff</p>
          <p className="text-sm font-semibold text-foreground">
            {o2Delivery.toFixed(1)} ml/dL
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={reset}
          className="px-3 py-1 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:bg-secondary transition-all">
          Reset all
        </button>
      </div>
    </div>
    </DiagramFigure>
  );
};
