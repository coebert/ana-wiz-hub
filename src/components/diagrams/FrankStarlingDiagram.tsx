import { useState, useMemo } from "react";

interface CurveConfig {
  label: string;
  color: string;
  ees: number; // max SV scaling
  k: number;   // curve steepness
  shift: number; // rightward shift
  description: string;
}

const CURVES: Record<string, CurveConfig> = {
  normal: { label: "Normal", color: "hsl(210 70% 50%)", ees: 1, k: 0.035, shift: 0, description: "Normal ventricular function. SV increases with preload up to a plateau (~120 ml LVEDV). Optimal sarcomere length ~2.2 µm." },
  sympathetic: { label: "↑ Sympathetic / Inotropes", color: "hsl(150 60% 45%)", ees: 1.35, k: 0.04, shift: -5, description: "Positive inotropes (β₁ agonists, digoxin, calcium) or sympathetic stimulation shift the curve UP and LEFT. For any given preload, stroke volume is greater. Peak SV is higher." },
  mild_hf: { label: "Mild Heart Failure", color: "hsl(35 70% 50%)", ees: 0.7, k: 0.025, shift: 10, description: "Reduced contractility shifts curve DOWN and RIGHT. Higher preload needed to maintain SV. Compensatory fluid retention increases EDV but at risk of pulmonary congestion." },
  severe_hf: { label: "Severe Heart Failure", color: "hsl(0 65% 50%)", ees: 0.45, k: 0.018, shift: 20, description: "Severely depressed contractility. Flat curve — SV barely increases with preload. Operating on the descending limb is possible (↑ wall stress, ↓ subendocardial perfusion). Diuretics may paradoxically improve SV." },
};

const CURVE_KEYS = ["normal", "sympathetic", "mild_hf", "severe_hf"] as const;

// Frank-Starling curve: SV = SVmax * (1 - e^(-k*(LVEDV - shift)))
function generateCurve(cfg: CurveConfig): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const svMax = 85 * cfg.ees;
  for (let v = 0; v <= 200; v += 2) {
    const x = v;
    const exponent = -cfg.k * (v - cfg.shift);
    const y = Math.max(0, svMax * (1 - Math.exp(exponent)));
    pts.push({ x, y });
  }
  return pts;
}

const FrankStarlingDiagram = () => {
  const [activeCurves, setActiveCurves] = useState<Set<string>>(new Set(["normal"]));
  const [preload, setPreload] = useState(60); // LVEDV as percentage → maps to 40-180 ml
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);

  const lvedv = 40 + (preload / 100) * 140; // 40-180 ml

  const curves = useMemo(() => {
    const result: Record<string, { x: number; y: number }[]> = {};
    CURVE_KEYS.forEach(k => { result[k] = generateCurve(CURVES[k]); });
    return result;
  }, []);

  const toggleCurve = (key: string) => {
    setActiveCurves(prev => {
      const next = new Set(prev);
      if (next.has(key)) { if (next.size > 1) next.delete(key); } // keep at least one
      else next.add(key);
      return next;
    });
    setSelectedInfo(key);
  };

  // SVG layout
  const svgW = 420, svgH = 300;
  const padL = 50, padB = 40, padR = 15, padT = 15;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;
  const xMin = 0, xMax = 200, yMin = 0, yMax = 130;

  const toX = (v: number) => padL + ((v - xMin) / (xMax - xMin)) * plotW;
  const toY = (sv: number) => padT + plotH - ((sv - yMin) / (yMax - yMin)) * plotH;

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((pt, i) => `${i === 0 ? "M" : "L"} ${toX(pt.x).toFixed(1)} ${toY(pt.y).toFixed(1)}`).join(" ");

  // Get SV at current preload for each active curve
  const getSV = (key: string): number => {
    const cfg = CURVES[key];
    const svMax = 85 * cfg.ees;
    return Math.max(0, svMax * (1 - Math.exp(-cfg.k * (lvedv - cfg.shift))));
  };

  const infoKey = selectedInfo && activeCurves.has(selectedInfo) ? selectedInfo : Array.from(activeCurves)[0];

  return (
    <div className="space-y-4">
      {/* Curve selector */}
      <div className="flex flex-wrap gap-1.5">
        {CURVE_KEYS.map(key => {
          const cfg = CURVES[key];
          const isActive = activeCurves.has(key);
          return (
            <button key={key} onClick={() => toggleCurve(key)}
              className={`px-2.5 py-1 rounded text-[10px] sm:text-xs font-medium border transition-all ${
                isActive ? "border-primary/50 bg-primary/10 text-foreground" : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
              }`}>
              <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: cfg.color, opacity: isActive ? 1 : 0.3 }} />
              {cfg.label}
            </button>
          );
        })}
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
        {/* Grid */}
        {[0, 20, 40, 60, 80, 100, 120].map(sv => (
          <g key={`yg-${sv}`}>
            <line x1={padL} y1={toY(sv)} x2={svgW - padR} y2={toY(sv)} stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={padL - 6} y={toY(sv) + 3} textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">{sv}</text>
          </g>
        ))}
        {[0, 40, 80, 120, 160, 200].map(v => (
          <g key={`xg-${v}`}>
            <line x1={toX(v)} y1={padT} x2={toX(v)} y2={svgH - padB} stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={toX(v)} y={svgH - padB + 12} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">{v}</text>
          </g>
        ))}

        {/* Axis labels */}
        <text x={10} y={padT + plotH / 2} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600"
          transform={`rotate(-90, 10, ${padT + plotH / 2})`}>Stroke Volume (ml)</text>
        <text x={padL + plotW / 2} y={svgH - 5} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600">
          LVEDV / Preload (ml)
        </text>

        {/* Pulmonary congestion zone */}
        <rect x={toX(150)} y={padT} width={toX(200) - toX(150)} height={plotH}
          fill="hsl(0 60% 50%)" opacity="0.04" />
        <text x={toX(175)} y={padT + 12} fontSize="7" fill="hsl(0 60% 50%)" textAnchor="middle" opacity="0.5">
          Congestion risk
        </text>

        {/* Curves */}
        {CURVE_KEYS.map(key => (
          <path key={key} d={toPath(curves[key])} fill="none"
            stroke={CURVES[key].color}
            strokeWidth={activeCurves.has(key) ? 2.5 : 1}
            opacity={activeCurves.has(key) ? 1 : 0.12}
            className="transition-all duration-300" />
        ))}

        {/* Operating points */}
        {CURVE_KEYS.filter(k => activeCurves.has(k)).map(key => {
          const sv = getSV(key);
          return (
            <g key={`op-${key}`}>
              {/* Dashed lines to axes */}
              <line x1={toX(lvedv)} y1={toY(sv)} x2={toX(lvedv)} y2={toY(0)}
                stroke={CURVES[key].color} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
              <line x1={toX(lvedv)} y1={toY(sv)} x2={toX(0)} y2={toY(sv)}
                stroke={CURVES[key].color} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
              {/* Point */}
              <circle cx={toX(lvedv)} cy={toY(sv)} r="4" fill={CURVES[key].color} stroke="hsl(var(--background))" strokeWidth="1.5" />
              {/* SV label */}
              <text x={padL + 4} y={toY(sv) - 4} fontSize="7" fill={CURVES[key].color} fontWeight="600">
                {Math.round(sv)}
              </text>
            </g>
          );
        })}

        {/* Preload line */}
        <line x1={toX(lvedv)} y1={padT} x2={toX(lvedv)} y2={svgH - padB}
          stroke="hsl(var(--foreground))" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.2" />
        <text x={toX(lvedv)} y={svgH - padB + 24} textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="600">
          {Math.round(lvedv)}
        </text>
      </svg>

      {/* SV readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {CURVE_KEYS.filter(k => activeCurves.has(k)).map(key => (
          <div key={key} className="rounded-lg border border-border p-2 text-center">
            <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: CURVES[key].color }} />
            <p className="text-xs text-muted-foreground">{CURVES[key].label.split("/")[0].trim()}</p>
            <p className="text-sm font-semibold text-foreground">{Math.round(getSV(key))} ml</p>
          </div>
        ))}
      </div>

      {/* Preload slider */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground">Preload (LVEDV)</label>
          <span className="text-xs text-muted-foreground">{Math.round(lvedv)} ml</span>
        </div>
        <input type="range" min={0} max={100} value={preload}
          onChange={e => setPreload(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-blue-500" />
        <p className="text-[10px] text-muted-foreground mt-0.5">Slide to see how SV changes at different preloads for each curve</p>
      </div>

      {/* Info panel */}
      {infoKey && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 animate-fade-in">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CURVES[infoKey].color }} />
            <p className="text-sm font-semibold text-foreground">{CURVES[infoKey].label}</p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{CURVES[infoKey].description}</p>
        </div>
      )}
    </div>
  );
};

export default FrankStarlingDiagram;
