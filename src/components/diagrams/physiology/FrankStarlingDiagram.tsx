import { useState, useMemo } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface CurveConfig {
  label: string;
  color: string;
  ees: number;
  k: number;
  shift: number;
  description: string;
  descending?: boolean; // has descending limb
  descentStart?: number; // LVEDV at which descent begins
}

const CURVES: Record<string, CurveConfig> = {
  normal: {
    label: "Normal",
    color: "hsl(210 70% 50%)",
    ees: 1, k: 0.035, shift: 0,
    description: "Normal ventricular function. SV increases with preload up to a plateau (~120 ml LVEDV). Optimal sarcomere length ~2.2 µm. The Frank-Starling mechanism is intrinsic (does not require neural input)."
  },
  sympathetic: {
    label: "↑ Sympathetic / Inotropes",
    color: "hsl(150 60% 45%)",
    ees: 1.35, k: 0.04, shift: -5,
    description: "Positive inotropes (β₁ agonists, digoxin, calcium) or sympathetic stimulation shift the curve UP and LEFT. For any given preload, stroke volume is greater. The ESPVR slope (Ees) increases — reflecting increased contractility independent of loading conditions."
  },
  mild_hf: {
    label: "Mild Heart Failure",
    color: "hsl(35 70% 50%)",
    ees: 0.7, k: 0.025, shift: 10,
    description: "Reduced contractility shifts curve DOWN and RIGHT. Higher preload needed to maintain SV. Compensatory neurohormonal activation (RAAS, SNS) increases circulating volume. Risk of pulmonary congestion when LVEDP rises above ~18 mmHg.",
    descending: true,
    descentStart: 160,
  },
  severe_hf: {
    label: "Severe Heart Failure",
    color: "hsl(0 65% 50%)",
    ees: 0.45, k: 0.018, shift: 20,
    description: "Severely depressed contractility. Flat curve — SV barely increases with preload. On the descending limb: ↑ wall stress (Laplace), ↑ MVO₂, ↓ subendocardial perfusion, ↑ mitral regurgitation. Diuretics may paradoxically improve SV by moving back up the curve.",
    descending: true,
    descentStart: 130,
  },
};

const CURVE_KEYS = ["normal", "sympathetic", "mild_hf", "severe_hf"] as const;

function generateCurve(cfg: CurveConfig): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const svMax = 85 * cfg.ees;
  for (let v = 0; v <= 220; v += 2) {
    const exponent = -cfg.k * (v - cfg.shift);
    let y = Math.max(0, svMax * (1 - Math.exp(exponent)));
    // Descending limb
    if (cfg.descending && cfg.descentStart && v > cfg.descentStart) {
      const peakSV = svMax * (1 - Math.exp(-cfg.k * (cfg.descentStart - cfg.shift)));
      const decline = 0.15 * cfg.ees;
      y = Math.max(5, peakSV - decline * (v - cfg.descentStart));
    }
    pts.push({ x: v, y });
  }
  return pts;
}

// Clinical scenarios for preload annotation
const SCENARIOS = [
  { lvedv: 60, label: "Hypovolaemic", icon: "🩸", color: "hsl(0 65% 55%)" },
  { lvedv: 110, label: "Euvolaemic", icon: "✓", color: "hsl(150 60% 45%)" },
  { lvedv: 170, label: "Fluid overloaded", icon: "💧", color: "hsl(210 60% 55%)" },
];

const FrankStarlingDiagram = () => {
  const [activeCurves, setActiveCurves] = useState<Set<string>>(new Set(["normal"]));
  const [preload, setPreload] = useState(60);
  const [selectedInfo, setSelectedInfo] = useState<string | null>(null);
  const [showPVLoop, setShowPVLoop] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

  const lvedv = selectedScenario !== null ? SCENARIOS[selectedScenario].lvedv : 40 + (preload / 100) * 180;

  const curves = useMemo(() => {
    const result: Record<string, { x: number; y: number }[]> = {};
    CURVE_KEYS.forEach(k => { result[k] = generateCurve(CURVES[k]); });
    return result;
  }, []);

  const toggleCurve = (key: string) => {
    setActiveCurves(prev => {
      const next = new Set(prev);
      if (next.has(key)) { if (next.size > 1) next.delete(key); }
      else next.add(key);
      return next;
    });
    setSelectedInfo(key);
  };

  // SVG layout
  const svgW = 440, svgH = 310;
  const padL = 52, padB = 42, padR = 15, padT = 15;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;
  const xMin = 0, xMax = 220, yMin = 0, yMax = 130;

  const toX = (v: number) => padL + ((v - xMin) / (xMax - xMin)) * plotW;
  const toY = (sv: number) => padT + plotH - ((sv - yMin) / (yMax - yMin)) * plotH;

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((pt, i) => `${i === 0 ? "M" : "L"} ${toX(pt.x).toFixed(1)} ${toY(pt.y).toFixed(1)}`).join(" ");

  const getSV = (key: string): number => {
    const cfg = CURVES[key];
    const svMax = 85 * cfg.ees;
    let sv = Math.max(0, svMax * (1 - Math.exp(-cfg.k * (lvedv - cfg.shift))));
    if (cfg.descending && cfg.descentStart && lvedv > cfg.descentStart) {
      const peakSV = svMax * (1 - Math.exp(-cfg.k * (cfg.descentStart - cfg.shift)));
      sv = Math.max(5, peakSV - 0.15 * cfg.ees * (lvedv - cfg.descentStart));
    }
    return sv;
  };

  const infoKey = selectedInfo && activeCurves.has(selectedInfo) ? selectedInfo : Array.from(activeCurves)[0];

  // Sarcomere length annotation
  const sarcomereLength = lvedv < 80 ? "< 2.0 µm" : lvedv < 140 ? "~2.0–2.2 µm" : lvedv < 180 ? "~2.2–2.4 µm" : "> 2.4 µm";
  const sarcomereZone = lvedv < 80 ? "Suboptimal overlap" : lvedv < 160 ? "Optimal actin-myosin overlap" : "Over-stretched — ↓ cross-bridges";

  return (
    <DiagramFigure id="frank-starling" title="Frank–Starling curves: contractility and afterload modifiers" description="Family of ventricular function curves showing how preload, contractility and afterload reposition the Frank–Starling relationship.">
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

      {/* Clinical scenario quick-select */}
      <div className="flex flex-wrap gap-1.5">
        {SCENARIOS.map((sc, i) => (
          <button key={sc.label}
            onClick={() => { setSelectedScenario(selectedScenario === i ? null : i); }}
            className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-all ${
              selectedScenario === i ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-secondary/40"
            }`}>
            {sc.icon} {sc.label}
          </button>
        ))}
        <button onClick={() => setShowPVLoop(!showPVLoop)}
          className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-all ml-auto ${
            showPVLoop ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground"
          }`}>
          {showPVLoop ? "Hide" : "Show"} PV concept
        </button>
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
        <rect x={toX(150)} y={padT} width={toX(220) - toX(150)} height={plotH}
          fill="hsl(0 60% 50%)" opacity="0.04" />
        <text x={toX(185)} y={padT + 12} fontSize="7" fill="hsl(0 60% 50%)" textAnchor="middle" opacity="0.5">
          Pulmonary congestion zone
        </text>
        <text x={toX(185)} y={padT + 22} fontSize="6" fill="hsl(0 60% 50%)" textAnchor="middle" opacity="0.35">
          LVEDP &gt; 18 mmHg
        </text>

        {/* Optimal zone */}
        <rect x={toX(80)} y={padT} width={toX(140) - toX(80)} height={plotH}
          fill="hsl(150 60% 50%)" opacity="0.03" />
        <text x={toX(110)} y={svgH - padB - 5} fontSize="6" fill="hsl(150 60% 45%)" textAnchor="middle" opacity="0.5">
          Optimal preload
        </text>

        {/* ESPVR concept line */}
        {showPVLoop && (
          <g opacity="0.35">
            <line x1={toX(0)} y1={toY(120)} x2={toX(200)} y2={toY(40)} stroke="hsl(280 50% 55%)" strokeWidth="1" strokeDasharray="6 3" />
            <text x={toX(180)} y={toY(52)} fontSize="7" fill="hsl(280 50% 55%)" fontWeight="600">ESPVR (Ees)</text>
            <line x1={toX(20)} y1={toY(0)} x2={toX(220)} y2={toY(15)} stroke="hsl(280 50% 55%)" strokeWidth="0.75" strokeDasharray="3 3" />
            <text x={toX(200)} y={toY(17)} fontSize="6" fill="hsl(280 50% 55%)">EDPVR</text>
          </g>
        )}

        {/* Curves */}
        {CURVE_KEYS.map(key => (
          <path key={key} d={toPath(curves[key])} fill="none"
            stroke={CURVES[key].color}
            strokeWidth={activeCurves.has(key) ? 2.5 : 1}
            opacity={activeCurves.has(key) ? 1 : 0.12}
            className="transition-all duration-300" />
        ))}

        {/* Descending limb label */}
        {CURVE_KEYS.filter(k => activeCurves.has(k) && CURVES[k].descending).map(key => {
          const ds = CURVES[key].descentStart!;
          return (
            <g key={`desc-${key}`} opacity="0.6">
              <text x={toX(ds + 20)} y={toY(getSV(key)) - 10} fontSize="6" fill={CURVES[key].color} fontWeight="600">
                Descending limb
              </text>
              <text x={toX(ds + 20)} y={toY(getSV(key)) - 2} fontSize="5.5" fill={CURVES[key].color}>
                ↑ wall stress, ↓ perfusion
              </text>
            </g>
          );
        })}

        {/* Operating points */}
        {CURVE_KEYS.filter(k => activeCurves.has(k)).map(key => {
          const sv = getSV(key);
          return (
            <g key={`op-${key}`}>
              <line x1={toX(lvedv)} y1={toY(sv)} x2={toX(lvedv)} y2={toY(0)}
                stroke={CURVES[key].color} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
              <line x1={toX(lvedv)} y1={toY(sv)} x2={toX(0)} y2={toY(sv)}
                stroke={CURVES[key].color} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
              <circle cx={toX(lvedv)} cy={toY(sv)} r="4" fill={CURVES[key].color} stroke="hsl(var(--background))" strokeWidth="1.5" />
              <text x={padL + 4} y={toY(sv) - 4} fontSize="7" fill={CURVES[key].color} fontWeight="600">
                {Math.round(sv)}
              </text>
            </g>
          );
        })}

        {/* Preload line */}
        <line x1={toX(lvedv)} y1={padT} x2={toX(lvedv)} y2={svgH - padB}
          stroke="hsl(var(--foreground))" strokeWidth="0.75" strokeDasharray="4 3" opacity="0.2" />
        <text x={toX(lvedv)} y={svgH - padB + 24} textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="600">
          {Math.round(lvedv)} ml
        </text>
      </svg>

      {/* SV readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {CURVE_KEYS.filter(k => activeCurves.has(k)).map(key => {
          const sv = getSV(key);
          const co = (sv * 72 / 1000); // estimated CO at HR 72
          return (
            <div key={key} className="rounded-lg border border-border p-2 text-center">
              <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: CURVES[key].color }} />
              <p className="text-xs text-muted-foreground">{CURVES[key].label.split("/")[0].trim()}</p>
              <p className="text-sm font-semibold text-foreground">{Math.round(sv)} ml</p>
              <p className="text-[10px] text-muted-foreground">CO ≈ {co.toFixed(1)} L/min</p>
            </div>
          );
        })}
      </div>

      {/* Sarcomere annotation */}
      <div className="rounded-lg border border-border bg-secondary/20 p-2 text-center">
        <p className="text-[10px] text-muted-foreground">
          Sarcomere length: <span className="font-semibold text-foreground">{sarcomereLength}</span> — {sarcomereZone}
        </p>
      </div>

      {/* Preload slider */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-foreground">Preload (LVEDV)</label>
          <span className="text-xs text-muted-foreground">{Math.round(lvedv)} ml</span>
        </div>
        <input type="range" min={0} max={100} value={selectedScenario !== null ? ((SCENARIOS[selectedScenario].lvedv - 40) / 180) * 100 : preload}
          onChange={e => { setSelectedScenario(null); setPreload(Number(e.target.value)); }}
          className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-blue-500" />
        <p className="text-[10px] text-muted-foreground mt-0.5">Slide to change preload, or select a clinical scenario above</p>
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
    </DiagramFigure>
  );
};

export default FrankStarlingDiagram;
