import { useState, useMemo } from "react";

// Sigmoid PV curve: V = Vmax / (1 + e^(-k*(P - P_infl)))
// Lung: needs positive (transpulmonary) pressure to inflate
// Chest wall: has resting volume, springs outward at low volumes
// Total: sum of elastic recoil pressures

interface Point { p: number; v: number }

function lungCurve(pressure: number): number {
  // Lung PV: sigmoid, 0 volume at ~-5 cmH2O, inflection ~15, max ~6L
  const vmax = 6.2;
  const k = 0.18;
  const pInfl = 12;
  return vmax / (1 + Math.exp(-k * (pressure - pInfl)));
}

function chestWallCurve(pressure: number): number {
  // Chest wall: resting vol ~4L (springs outward), needs negative pressure to compress below FRC
  // At high volumes needs positive pressure to expand further
  const vmax = 7;
  const k = 0.12;
  const pInfl = -8;
  return vmax / (1 + Math.exp(-k * (pressure - pInfl)));
}

// For the total system, at each volume find the pressure where lung recoil + chest wall recoil = applied pressure
// Shortcut: total pressure at a given volume = lung pressure at that volume + chest wall pressure at that volume
// We invert: for each volume, find lung P and CW P, total P = Plung - Pcw_recoil
function invertCurve(curveFn: (p: number) => number, targetV: number): number {
  // Binary search for pressure that gives targetV
  let lo = -40, hi = 60;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (curveFn(mid) < targetV) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

function generateCurvePoints(curveFn: (p: number) => number, pMin: number, pMax: number, steps: number = 80): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const p = pMin + (i / steps) * (pMax - pMin);
    pts.push({ p, v: curveFn(p) });
  }
  return pts;
}

// Total system: at each volume, total pressure = Plung + Pcw needed
function _totalSystemPoints(vMin: number, vMax: number, steps: number = 80): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const v = vMin + (i / steps) * (vMax - vMin);
    const pLung = invertCurve(lungCurve, v);
    const pCW = invertCurve(chestWallCurve, v);
    // Total transmural pressure = lung elastic recoil pressure + chest wall elastic recoil
    // Lung recoil = +Plung (positive, inward)
    // CW recoil at volume > resting CW vol is positive (inward), below is negative (outward)
    const _pTotal = pLung - pCW; // net pressure needed
    // Actually: total system pressure = pressure to overcome lung recoil + pressure to overcome CW recoil
    // In standard Rahn diagram: total P = Plung_recoil + Pcw_recoil
    // At FRC these cancel: Plung_recoil = -Pcw_recoil
    pts.push({ p: pLung + (-pCW), v }); // this gives the relaxation curve
  }
  return pts;
}

type CurveId = "lung" | "chestwall" | "total";

const CURVE_CONFIG: Record<CurveId, { label: string; color: string; dash: string }> = {
  lung: { label: "Lung", color: "hsl(210 70% 50%)", dash: "" },
  chestwall: { label: "Chest Wall", color: "hsl(30 70% 50%)", dash: "" },
  total: { label: "Total System", color: "hsl(0 65% 50%)", dash: "8 4" },
};

// Lung volumes
const VOLUMES = [
  { id: "rv", label: "RV", value: 1.2, description: "Residual Volume — gas remaining after maximal expiration" },
  { id: "frc", label: "FRC", value: 2.4, description: "Functional Residual Capacity — equilibrium point where lung and chest wall recoil balance (Prs = 0)" },
  { id: "tv_end", label: "FRC + VT", value: 2.9, description: "End-inspiration during tidal breathing (VT ≈ 500 ml)" },
  { id: "tlc", label: "TLC", value: 6.0, description: "Total Lung Capacity — maximum inflation, limited by chest wall and inspiratory muscle strength" },
];

export const ComplianceDiagram = () => {
  const [visible, setVisible] = useState<Set<CurveId>>(new Set(["lung", "chestwall", "total"]));
  const [tidalVol, setTidalVol] = useState(500); // ml
  const [frc, setFrc] = useState(2.4); // L
  const [activeVolume, setActiveVolume] = useState<string | null>("frc");

  const tv = tidalVol / 1000; // convert to L

  // SVG layout
  const svgW = 460, svgH = 360;
  const padL = 55, padB = 42, padR = 20, padT = 20;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  // Ranges: P -30 to +40 cmH2O, V 0 to 7 L
  const pMin = -30, pMax = 40, vMin = 0, vMax = 7;

  const toX = (p: number) => padL + ((p - pMin) / (pMax - pMin)) * plotW;
  const toY = (v: number) => padT + plotH - ((v - vMin) / (vMax - vMin)) * plotH;

  const toPath = (pts: Point[]) =>
    pts.map((pt, i) => `${i === 0 ? "M" : "L"} ${toX(pt.p).toFixed(1)} ${toY(pt.v).toFixed(1)}`).join(" ");

  const lungPts = useMemo(() => generateCurvePoints(lungCurve, -10, 40), []);
  const cwPts = useMemo(() => generateCurvePoints(chestWallCurve, -30, 20), []);
  const totalPts = useMemo(() => {
    const pts: Point[] = [];
    for (let i = 0; i <= 80; i++) {
      const v = 0.5 + (i / 80) * 5.5;
      const pL = invertCurve(lungCurve, v);
      const pCW = invertCurve(chestWallCurve, v);
      pts.push({ p: pL - pCW, v });
    }
    return pts;
  }, []);

  const toggle = (id: CurveId) => {
    setVisible(prev => {
      const next = new Set(prev);
      if (next.has(id)) { if (next.size > 1) next.delete(id); }
      else next.add(id);
      return next;
    });
  };

  // Compliance at FRC (slope of total system curve)
  const pAtFRC = (() => {
    const pL = invertCurve(lungCurve, frc);
    const pCW = invertCurve(chestWallCurve, frc);
    return pL - pCW;
  })();

  const volumes = [
    { ...VOLUMES[0] },
    { id: "frc", label: "FRC", value: frc, description: `Functional Residual Capacity — equilibrium at Prs ≈ ${pAtFRC.toFixed(1)} cmH₂O` },
    { id: "tv_end", label: "FRC + VT", value: frc + tv, description: `End-inspiration (VT = ${tidalVol} ml)` },
    { ...VOLUMES[3] },
  ];

  return (
    <div className="space-y-4">
      {/* Curve toggles */}
      <div className="flex flex-wrap gap-1.5">
        {(["lung", "chestwall", "total"] as CurveId[]).map(id => {
          const cfg = CURVE_CONFIG[id];
          const on = visible.has(id);
          return (
                <button key={id} onClick={() => toggle(id)}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-all ${
                on ? "border-primary/50 bg-primary/10 text-foreground" : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60"
              }`}>
              <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: cfg.color, opacity: on ? 1 : 0.3 }} />
              {cfg.label}
            </button>
  );
        })}
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full">
        {/* Grid */}
        {[-20, -10, 0, 10, 20, 30, 40].map(p => (
          <g key={`pg-${p}`}>
            <line x1={toX(p)} y1={padT} x2={toX(p)} y2={svgH - padB} stroke="hsl(var(--border))" strokeWidth={p === 0 ? 1 : 0.5} />
            <text x={toX(p)} y={svgH - padB + 12} textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">{p}</text>
          </g>
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map(v => (
          <g key={`vg-${v}`}>
            <line x1={padL} y1={toY(v)} x2={svgW - padR} y2={toY(v)} stroke="hsl(var(--border))" strokeWidth="0.5" />
            <text x={padL - 6} y={toY(v) + 3} textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">{v}</text>
          </g>
        ))}

        {/* Axis labels */}
        <text x={padL + plotW / 2} y={svgH - 5} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600">
          Pressure (cmH₂O)
        </text>
        <text x={12} y={padT + plotH / 2} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600"
          transform={`rotate(-90, 12, ${padT + plotH / 2})`}>Volume (L)</text>

        {/* Zero pressure line highlight */}
        <line x1={toX(0)} y1={padT} x2={toX(0)} y2={svgH - padB} stroke="hsl(var(--foreground))" strokeWidth="0.75" opacity="0.2" />

        {/* Tidal volume shading */}
        <rect x={padL} y={toY(frc + tv)} width={plotW} height={toY(frc) - toY(frc + tv)}
          fill="hsl(150 50% 50%)" opacity="0.06" />

        {/* Volume level lines */}
        {volumes.map(vol => (
          <g key={vol.id}>
            <line x1={padL} y1={toY(vol.value)} x2={svgW - padR} y2={toY(vol.value)}
              stroke={activeVolume === vol.id ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
              strokeWidth={activeVolume === vol.id ? 1 : 0.5}
              strokeDasharray="4 3" opacity={activeVolume === vol.id ? 0.5 : 0.25}
              className="cursor-pointer" onClick={() => setActiveVolume(activeVolume === vol.id ? null : vol.id)} />
            <text x={svgW - padR + 3} y={toY(vol.value) + 3} fontSize="7"
              fill={activeVolume === vol.id ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
              fontWeight={activeVolume === vol.id ? "700" : "400"}
              className="cursor-pointer" onClick={() => setActiveVolume(activeVolume === vol.id ? null : vol.id)}>
              {vol.label}
            </text>
          </g>
        ))}

        {/* VT bracket */}
        <line x1={padL + 8} y1={toY(frc)} x2={padL + 8} y2={toY(frc + tv)} stroke="hsl(150 50% 50%)" strokeWidth="1.5" />
        <line x1={padL + 4} y1={toY(frc)} x2={padL + 12} y2={toY(frc)} stroke="hsl(150 50% 50%)" strokeWidth="1" />
        <line x1={padL + 4} y1={toY(frc + tv)} x2={padL + 12} y2={toY(frc + tv)} stroke="hsl(150 50% 50%)" strokeWidth="1" />
        <text x={padL + 16} y={toY(frc + tv / 2) + 3} fontSize="7" fill="hsl(150 50% 50%)" fontWeight="600">VT</text>

        {/* Curves */}
        {visible.has("lung") && (
          <path d={toPath(lungPts)} fill="none" stroke={CURVE_CONFIG.lung.color} strokeWidth="2" />
        )}
        {visible.has("chestwall") && (
          <path d={toPath(cwPts)} fill="none" stroke={CURVE_CONFIG.chestwall.color} strokeWidth="2" />
        )}
        {visible.has("total") && (
          <path d={toPath(totalPts)} fill="none" stroke={CURVE_CONFIG.total.color} strokeWidth="2" strokeDasharray="8 4" />
        )}

        {/* FRC equilibrium point — where total system P = 0 */}
        {visible.has("total") && (
          <g>
            <circle cx={toX(pAtFRC)} cy={toY(frc)} r="5" fill="hsl(0 65% 50%)" stroke="hsl(var(--background))" strokeWidth="1.5" />
            <text x={toX(pAtFRC) + 8} y={toY(frc) - 6} fontSize="8" fill="hsl(0 65% 50%)" fontWeight="600">
              FRC ({frc.toFixed(1)} L)
            </text>
          </g>
        )}

        {/* Compliance annotation — slope tangent at FRC on total curve */}
        {visible.has("total") && (
          <g opacity="0.5">
            <text x={toX(15)} y={toY(4.5)} fontSize="7" fill="hsl(0 65% 50%)">
              C = ΔV/ΔP
            </text>
            <text x={toX(15)} y={toY(4.5) + 10} fontSize="7" fill="hsl(0 65% 50%)">
              ≈ 100 ml/cmH₂O
            </text>
          </g>
        )}

        {/* Curve labels on the curves */}
        {visible.has("lung") && (
          <text x={toX(30)} y={toY(lungCurve(30)) - 6} fontSize="8" fill={CURVE_CONFIG.lung.color} fontWeight="600">Lung</text>
        )}
        {visible.has("chestwall") && (
          <text x={toX(-20)} y={toY(chestWallCurve(-20)) - 6} fontSize="8" fill={CURVE_CONFIG.chestwall.color} fontWeight="600">Chest Wall</text>
        )}
        {visible.has("total") && (
          <text x={toX(20)} y={toY(3.8)} fontSize="8" fill={CURVE_CONFIG.total.color} fontWeight="600">Total</text>
        )}
      </svg>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-foreground">Tidal Volume</label>
            <span className="text-xs text-muted-foreground font-mono">{tidalVol} ml</span>
          </div>
          <input type="range" min={200} max={1000} step={50} value={tidalVol}
            onChange={e => setTidalVol(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-emerald-500" />
          <div className="flex justify-between mt-0.5">
            <span className="text-[9px] text-muted-foreground">200 ml</span>
            <span className="text-[9px] text-muted-foreground">1000 ml</span>
          </div>
        </div>
        <div className="rounded-lg border border-border p-3">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-foreground">FRC</label>
            <span className="text-xs text-muted-foreground font-mono">{frc.toFixed(1)} L</span>
          </div>
          <input type="range" min={1.5} max={4.0} step={0.1} value={frc}
            onChange={e => setFrc(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-blue-500" />
          <div className="flex justify-between mt-0.5">
            <span className="text-[9px] text-muted-foreground">↓ (obesity, supine)</span>
            <span className="text-[9px] text-muted-foreground">↑ (COPD, upright)</span>
          </div>
        </div>
      </div>

      {/* Volume info panel */}
      {activeVolume && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 animate-fade-in">
          <p className="text-sm font-semibold text-foreground">{volumes.find(v => v.id === activeVolume)?.label}</p>
          <p className="text-xs text-muted-foreground mt-1">{volumes.find(v => v.id === activeVolume)?.description}</p>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        At FRC, lung elastic recoil (inward) = chest wall spring-out force. Transmural pressure for the total system ≈ 0.
      </p>
    </div>
  );
};
