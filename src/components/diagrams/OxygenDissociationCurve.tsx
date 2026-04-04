import { useState, useMemo } from "react";

// Hill equation for ODC
const hillEquation = (pO2: number, p50: number, n: number = 2.7): number => {
  return (Math.pow(pO2, n) / (Math.pow(p50, n) + Math.pow(pO2, n))) * 100;
};

// COHb reduces effective Hb and shifts curve left
const effectiveSat = (sO2: number, cohbFraction: number): number => {
  return sO2 * (1 - cohbFraction);
};

interface Factor {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  normal: number;
  step: number;
  // How much this shifts P50 per unit change from normal
  p50Effect: number; // positive = right shift per unit increase
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
  const svgW = 460, svgH = 320;
  const padL = 52, padB = 42, padR = 15, padT = 15;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const toX = (pO2: number) => padL + (pO2 / 100) * plotW;
  const toY = (sO2: number) => padT + plotH - (sO2 / 100) * plotH;

  const generatePath = (p50Val: number, coFrac: number = 0): string => {
    const pts: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const pO2 = i;
      let sO2 = hillEquation(pO2, p50Val);
      if (coFrac > 0) sO2 = effectiveSat(sO2, coFrac);
      pts.push(`${i === 0 ? "M" : "L"} ${toX(pO2).toFixed(1)} ${toY(sO2).toFixed(1)}`);
    }
    return pts.join(" ");
  };

  const normalPath = useMemo(() => generatePath(26.7), []);
  const shiftedPath = useMemo(() => generatePath(p50, cohbFrac), [p50, cohbFrac]);

  // Current saturations at hover point
  const hoverSats = hoveredPO2 !== null ? {
    normal: hillEquation(hoveredPO2, 26.7),
    shifted: effectiveSat(hillEquation(hoveredPO2, p50), cohbFrac),
  } : null;

  // Key clinical points
  const clinicalPoints = [
    { pO2: 26.7, label: "P₅₀", sat: 50 },
    { pO2: 40, label: "Venous", sat: hillEquation(40, 26.7) },
    { pO2: 100, label: "Arterial", sat: hillEquation(100, 26.7) },
  ];

  const shiftDirection = p50 > 27.5 ? "right" : p50 < 25.5 ? "left" : "normal";

  const reset = () => {
    const init: Record<string, number> = {};
    FACTORS.forEach(f => { init[f.id] = f.normal; });
    setValues(init);
  };

  if (!showShifts) {
    // Simple view — just the normal curve with P50 marker
    return (
      <div className="w-full max-w-lg mx-auto">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
          {/* Grid */}
          {[0, 25, 50, 75, 100].map(v => (
            <g key={`h-${v}`}>
              <line x1={padL} y1={toY(v)} x2={svgW - padR} y2={toY(v)} stroke="hsl(var(--border))" strokeWidth="0.5" />
              <text x={padL - 6} y={toY(v) + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">{v}</text>
            </g>
          ))}
          {[0, 25, 50, 75, 100].map(v => (
            <g key={`v-${v}`}>
              <line x1={toX(v)} y1={padT} x2={toX(v)} y2={svgH - padB} stroke="hsl(var(--border))" strokeWidth="0.5" />
              <text x={toX(v)} y={svgH - padB + 12} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">{v}</text>
            </g>
          ))}
          <text x={svgW / 2} y={svgH - 5} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600">PaO₂ (kPa)</text>
          <text x={12} y={padT + plotH / 2} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600"
            transform={`rotate(-90, 12, ${padT + plotH / 2})`}>SaO₂ (%)</text>

          <path d={normalPath} fill="none" stroke="hsl(170 50% 40%)" strokeWidth="2.5" />

          {/* P50 crosshairs */}
          <line x1={toX(26.7)} y1={toY(50)} x2={toX(26.7)} y2={toY(0)} stroke="hsl(170 50% 40%)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
          <line x1={toX(0)} y1={toY(50)} x2={toX(26.7)} y2={toY(50)} stroke="hsl(170 50% 40%)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
          <circle cx={toX(26.7)} cy={toY(50)} r="4" fill="hsl(170 50% 40%)" />
          <text x={toX(26.7) + 8} y={toY(50) - 6} fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">P₅₀ = 3.5 kPa</text>

          {/* Clinical reference points */}
          {clinicalPoints.slice(1).map(pt => (
            <g key={pt.label}>
              <circle cx={toX(pt.pO2)} cy={toY(pt.sat)} r="3" fill="hsl(var(--foreground))" opacity="0.4" />
              <text x={toX(pt.pO2) - 8} y={toY(pt.sat) - 8} fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end">
                {pt.label} ({Math.round(pt.sat)}%)
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full"
        onMouseMove={(e) => {
          const svg = e.currentTarget;
          const pt = svg.createSVGPoint();
          pt.x = e.clientX;
          const svgPt = pt.matrixTransform(svg.getScreenCTM()!.inverse());
          const pO2 = ((svgPt.x - padL) / plotW) * 100;
          if (pO2 >= 0 && pO2 <= 100) setHoveredPO2(pO2);
          else setHoveredPO2(null);
        }}
        onMouseLeave={() => setHoveredPO2(null)}>

        {/* Grid */}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={`h-${v}`}>
            <line x1={padL} y1={toY(v)} x2={svgW - padR} y2={toY(v)} stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={padL - 6} y={toY(v) + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">{v}</text>
          </g>
        ))}
        {[0, 25, 50, 75, 100].map(v => (
          <g key={`v-${v}`}>
            <line x1={toX(v)} y1={padT} x2={toX(v)} y2={svgH - padB} stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={toX(v)} y={svgH - padB + 12} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">{v}</text>
          </g>
        ))}
        <text x={svgW / 2} y={svgH - 5} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600">PaO₂ (mmHg)</text>
        <text x={12} y={padT + plotH / 2} textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600"
          transform={`rotate(-90, 12, ${padT + plotH / 2})`}>SaO₂ (%)</text>

        {/* Normal curve (reference) */}
        <path d={normalPath} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.35" />

        {/* Shifted curve */}
        <path d={shiftedPath} fill="none"
          stroke={shiftDirection === "right" ? "hsl(0 65% 50%)" : shiftDirection === "left" ? "hsl(210 70% 55%)" : "hsl(170 50% 40%)"}
          strokeWidth="2.5" />

        {/* COHb shading — area between normal sat and effective sat */}
        {cohbFrac > 0.01 && (
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
        )}
        {cohbFrac > 0.01 && (
          <text x={toX(70)} y={toY(hillEquation(70, p50) - 8)} fontSize="7" fill="hsl(0 65% 50%)" textAnchor="middle" opacity="0.7">
            COHb = {values.co}%
          </text>
        )}

        {/* P50 markers */}
        {/* Normal P50 */}
        <circle cx={toX(26.7)} cy={toY(50)} r="3" fill="hsl(var(--muted-foreground))" opacity="0.3" />
        {/* Shifted P50 */}
        {isShifted && (
          <>
            <line x1={toX(p50)} y1={toY(effectiveSat(50, cohbFrac))} x2={toX(p50)} y2={toY(0)}
              stroke={shiftDirection === "right" ? "hsl(0 65% 50%)" : "hsl(210 70% 55%)"} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
            <circle cx={toX(p50)} cy={toY(effectiveSat(50, cohbFrac))} r="4"
              fill={shiftDirection === "right" ? "hsl(0 65% 50%)" : "hsl(210 70% 55%)"} />
            <text x={toX(p50) + (shiftDirection === "right" ? 8 : -8)} y={toY(effectiveSat(50, cohbFrac)) - 6}
              fontSize="8" fill="hsl(var(--foreground))" fontWeight="600"
              textAnchor={shiftDirection === "right" ? "start" : "end"}>
              P₅₀ = {p50.toFixed(1)}
            </text>
          </>
        )}

        {/* Hover crosshair */}
        {hoveredPO2 !== null && hoverSats && (
          <g>
            <line x1={toX(hoveredPO2)} y1={padT} x2={toX(hoveredPO2)} y2={svgH - padB}
              stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.2" />
            <circle cx={toX(hoveredPO2)} cy={toY(hoverSats.shifted)} r="3.5"
              fill={shiftDirection === "right" ? "hsl(0 65% 50%)" : shiftDirection === "left" ? "hsl(210 70% 55%)" : "hsl(170 50% 40%)"} />
            <rect x={toX(hoveredPO2) + 8} y={toY(hoverSats.shifted) - 22} width="80" height="28" rx="4"
              fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={toX(hoveredPO2) + 14} y={toY(hoverSats.shifted) - 10} fontSize="8" fill="hsl(var(--foreground))">
              PO₂ {Math.round(hoveredPO2)} → {Math.round(hoverSats.shifted)}%
            </text>
          </g>
        )}

        {/* Shift direction arrow */}
        {isShifted && (
          <g>
            <text x={svgW - padR - 5} y={padT + 15} fontSize="10" fill={shiftDirection === "right" ? "hsl(0 65% 50%)" : "hsl(210 70% 55%)"}
              textAnchor="end" fontWeight="700">
              {shiftDirection === "right" ? "→ Right Shift" : "← Left Shift"}
            </text>
            <text x={svgW - padR - 5} y={padT + 26} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="end">
              {shiftDirection === "right" ? "↓ Affinity" : "↑ Affinity"}
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
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-border p-2">
          <p className="text-xs text-muted-foreground">P₅₀</p>
          <p className={`text-sm font-semibold ${isShifted ? (shiftDirection === "right" ? "text-red-500" : "text-blue-500") : "text-foreground"}`}>
            {p50.toFixed(1)} mmHg
          </p>
        </div>
        <div className="rounded-lg border border-border p-2">
          <p className="text-xs text-muted-foreground">SaO₂ at PO₂ 40</p>
          <p className="text-sm font-semibold text-foreground">
            {Math.round(effectiveSat(hillEquation(40, p50), cohbFrac))}%
          </p>
        </div>
        <div className="rounded-lg border border-border p-2">
          <p className="text-xs text-muted-foreground">SaO₂ at PO₂ 100</p>
          <p className="text-sm font-semibold text-foreground">
            {Math.round(effectiveSat(hillEquation(100, p50), cohbFrac))}%
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
  );
};
