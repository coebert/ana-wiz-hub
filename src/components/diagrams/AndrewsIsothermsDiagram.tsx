import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Andrews' isotherms for N₂O on a P–V diagram.
 *
 * Critical point for N₂O: T_c = 36.5 °C (309.65 K), P_c = 72 bar, V_c (reduced) = 1.
 * We use a reduced van der Waals form to draw qualitatively correct isotherms:
 *   P_r = 8 T_r / (3 V_r − 1)  −  3 / V_r²
 * where P_r = P/P_c, V_r = V/V_c, T_r = T/T_c.
 *
 * Below T_c the isotherm has a non-monotonic loop. We replace that loop with
 * a horizontal "Maxwell construction" tie-line at the saturated vapour
 * pressure (approximated from the Antoine-style fit P_sat/P_c ≈ exp(5.4 (1 − 1/T_r))).
 * Endpoints of the tie-line define the saturated-liquid (left) and
 * saturated-vapour (right) volumes — the boundary of the two-phase dome.
 */

// SVG plotting box (in user units) — x = volume axis, y = pressure axis.
const PLOT = { x0: 60, y0: 30, x1: 720, y1: 360 };
const V_MIN = 0.45; // reduced volume range
const V_MAX = 8;
const P_MIN = 0; // reduced pressure range
const P_MAX = 2.0;

const xScale = (vr: number) =>
  PLOT.x0 + ((Math.log(vr) - Math.log(V_MIN)) / (Math.log(V_MAX) - Math.log(V_MIN))) * (PLOT.x1 - PLOT.x0);
const yScale = (pr: number) =>
  PLOT.y1 - ((pr - P_MIN) / (P_MAX - P_MIN)) * (PLOT.y1 - PLOT.y0);

// Reduced van der Waals equation of state.
const pVdW = (vr: number, tr: number) => (8 * tr) / (3 * vr - 1) - 3 / (vr * vr);

// Approximate reduced saturated vapour pressure for T_r < 1.
const pSat = (tr: number) => Math.exp(5.4 * (1 - 1 / tr));

// Find saturated-liquid and saturated-vapour volumes at given T_r by
// intersecting the isotherm with P = P_sat(T_r).
const findSaturationVolumes = (tr: number) => {
  if (tr >= 1) return null;
  const p = pSat(tr);
  // Bisection on three monotonic branches: liquid (0.4..localMax), vapour (localMin..V_MAX).
  // Approximate spinodal turning points numerically.
  let vMaxLoop = 1;
  let pLocalMax = -Infinity;
  for (let v = 0.4; v < 1.5; v += 0.001) {
    const pv = pVdW(v, tr);
    if (pv > pLocalMax) {
      pLocalMax = pv;
      vMaxLoop = v;
    }
  }
  let vMinLoop = 2;
  let pLocalMin = Infinity;
  for (let v = vMaxLoop; v < 8; v += 0.005) {
    const pv = pVdW(v, tr);
    if (pv < pLocalMin) {
      pLocalMin = pv;
      vMinLoop = v;
    }
  }
  // Liquid root: between V_MIN and vMaxLoop where p decreases to p
  const bisect = (lo: number, hi: number) => {
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      const f = pVdW(mid, tr) - p;
      const fLo = pVdW(lo, tr) - p;
      if (f === 0) return mid;
      if (Math.sign(f) === Math.sign(fLo)) lo = mid;
      else hi = mid;
    }
    return (lo + hi) / 2;
  };
  const vLiq = bisect(V_MIN + 0.01, vMaxLoop);
  const vVap = bisect(vMinLoop, V_MAX - 0.01);
  return { vLiq, vVap, pSat: p };
};

// Build SVG path for an isotherm, replacing any sub-critical loop with a tie-line.
const buildIsothermPath = (tr: number) => {
  const sat = findSaturationVolumes(tr);
  const points: { v: number; p: number }[] = [];
  const N = 240;
  for (let i = 0; i <= N; i++) {
    const v = V_MIN * Math.pow(V_MAX / V_MIN, i / N);
    let p = pVdW(v, tr);
    if (sat && v >= sat.vLiq && v <= sat.vVap) p = sat.pSat;
    if (p < P_MIN) p = P_MIN;
    if (p > P_MAX) p = P_MAX;
    points.push({ v, p });
  }
  return points
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${xScale(pt.v).toFixed(2)} ${yScale(pt.p).toFixed(2)}`)
    .join(" ");
};

// Saturation dome (locus of vLiq and vVap as Tr varies from 0.55 to 1.0).
const buildDomePath = () => {
  const left: { v: number; p: number }[] = [];
  const right: { v: number; p: number }[] = [];
  for (let tr = 0.55; tr < 1.0; tr += 0.01) {
    const s = findSaturationVolumes(tr);
    if (!s) continue;
    left.push({ v: s.vLiq, p: s.pSat });
    right.push({ v: s.vVap, p: s.pSat });
  }
  // Critical point at top
  const apex = { v: 1, p: 1 };
  const all = [...left, apex, ...right.reverse()];
  return all
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${xScale(pt.v).toFixed(2)} ${yScale(pt.p).toFixed(2)}`)
    .join(" ");
};

const TC_K = 309.65; // N₂O critical temperature in Kelvin
const PC_BAR = 72;

export const AndrewsIsothermsDiagram = () => {
  // Slider drives temperature in °C from 0 to 80
  const [tempC, setTempC] = useState(20);
  const tr = (tempC + 273.15) / TC_K;

  const isothermPath = useMemo(() => buildIsothermPath(tr), [tr]);
  const domePath = useMemo(() => buildDomePath(), []);

  // Reference isotherms (drawn faintly)
  const refTrs = [0.7, 0.85, 1.0, 1.15, 1.3];

  const sat = findSaturationVolumes(tr);
  const isSubcritical = tr < 1;
  const isCritical = Math.abs(tr - 1) < 0.005;

  const pressureBar = isSubcritical && sat ? sat.pSat * PC_BAR : null;

  return (
    <DiagramFigure
      id="andrews-isotherms-diagram"
      title="Andrews isotherms"
      description="Auto-generated wrapper for the Andrews isotherms anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="space-y-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <svg viewBox="0 0 760 410" className="w-full h-auto" role="img" aria-label="Andrews isotherms for nitrous oxide">
            {/* Plot background */}
            <rect x={PLOT.x0} y={PLOT.y0} width={PLOT.x1 - PLOT.x0} height={PLOT.y1 - PLOT.y0} fill="hsl(var(--background))" />
  
            {/* Axes */}
            <line x1={PLOT.x0} y1={PLOT.y1} x2={PLOT.x1} y2={PLOT.y1} stroke="hsl(var(--foreground))" strokeWidth={1} />
            <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1} stroke="hsl(var(--foreground))" strokeWidth={1} />
  
            {/* Axis labels */}
            <text x={(PLOT.x0 + PLOT.x1) / 2} y={PLOT.y1 + 32} textAnchor="middle" fontSize="13" fill="hsl(var(--foreground))">
              Volume (V) →  (log scale, reduced)
            </text>
            <text
              x={-((PLOT.y0 + PLOT.y1) / 2)}
              y={18}
              textAnchor="middle"
              transform="rotate(-90)"
              fontSize="13"
              fill="hsl(var(--foreground))"
            >
              Pressure (P) →  (P/Pc)
            </text>
  
            {/* Tick marks for reduced pressure */}
            {[0, 0.5, 1, 1.5, 2].map((p) => (
              <g key={`yt-${p}`}>
                <line x1={PLOT.x0 - 4} y1={yScale(p)} x2={PLOT.x0} y2={yScale(p)} stroke="hsl(var(--foreground))" />
                <text x={PLOT.x0 - 8} y={yScale(p) + 4} textAnchor="end" fontSize="11" fill="hsl(var(--muted-foreground))">
                  {p.toFixed(1)}
                </text>
                {p === 1 && (
                  <text x={PLOT.x0 - 32} y={yScale(p) + 4} textAnchor="end" fontSize="10" fill="hsl(var(--physics))">
                    Pc
                  </text>
                )}
              </g>
            ))}
  
            {/* Saturation dome (two-phase region) */}
            <path d={domePath} fill="hsl(var(--physics) / 0.10)" stroke="hsl(var(--physics) / 0.45)" strokeWidth={1} strokeDasharray="3 3" />
            <text x={xScale(1.6)} y={yScale(0.55)} fontSize="11" fill="hsl(var(--physics))" textAnchor="middle">
              Two-phase region
            </text>
            <text x={xScale(1.6)} y={yScale(0.45)} fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle">
              (liquid + vapour)
            </text>
  
            {/* Reference isotherms */}
            {refTrs.map((rt) => (
              <path
                key={`ref-${rt}`}
                d={buildIsothermPath(rt)}
                fill="none"
                stroke="hsl(var(--muted-foreground) / 0.35)"
                strokeWidth={1}
              />
            ))}
  
            {/* Label the critical isotherm */}
            <text x={xScale(0.55)} y={yScale(1.55)} fontSize="11" fill="hsl(var(--physics))">
              Tc isotherm (36.5 °C)
            </text>
            <text x={xScale(0.55)} y={yScale(1.85)} fontSize="10" fill="hsl(var(--muted-foreground))">
              Above Tc: gas only
            </text>
            <text x={xScale(5)} y={yScale(0.18)} fontSize="10" fill="hsl(var(--muted-foreground))">
              T = 0.7 Tc
            </text>
  
            {/* Critical point marker */}
            <circle cx={xScale(1)} cy={yScale(1)} r={5} fill="hsl(var(--physics))" stroke="hsl(var(--background))" strokeWidth={1.5} />
            <text x={xScale(1) + 8} y={yScale(1) - 8} fontSize="11" fill="hsl(var(--physics))" fontWeight="bold">
              Critical point
            </text>
  
            {/* Active isotherm */}
            <path
              d={isothermPath}
              fill="none"
              stroke={isCritical ? "hsl(var(--physics))" : "hsl(var(--primary))"}
              strokeWidth={2}
            />
  
            {/* Saturation tie-line endpoints (only when sub-critical) */}
            {sat && (
              <>
                <circle cx={xScale(sat.vLiq)} cy={yScale(sat.pSat)} r={4} fill="hsl(var(--primary))" />
                <circle cx={xScale(sat.vVap)} cy={yScale(sat.pSat)} r={4} fill="hsl(var(--primary))" />
                <text x={xScale(sat.vLiq) - 6} y={yScale(sat.pSat) - 8} textAnchor="end" fontSize="10" fill="hsl(var(--primary))">
                  sat. liquid
                </text>
                <text x={xScale(sat.vVap) + 6} y={yScale(sat.pSat) - 8} fontSize="10" fill="hsl(var(--primary))">
                  sat. vapour
                </text>
              </>
            )}
  
            {/* Active isotherm label (top-right) */}
            <g>
              <rect x={PLOT.x1 - 165} y={PLOT.y0 + 6} width={158} height={48} rx={6} fill="hsl(var(--card))" stroke="hsl(var(--border))" />
              <text x={PLOT.x1 - 158} y={PLOT.y0 + 24} fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">
                T = {tempC.toFixed(0)} °C  (Tr = {tr.toFixed(2)})
              </text>
              <text x={PLOT.x1 - 158} y={PLOT.y0 + 42} fontSize="11" fill="hsl(var(--muted-foreground))">
                {isCritical
                  ? "On critical isotherm"
                  : isSubcritical
                  ? `P_sat ≈ ${pressureBar?.toFixed(1)} bar`
                  : "Above Tc — gas only"}
              </text>
            </g>
          </svg>
        </div>
  
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Temperature: {tempC.toFixed(0)} °C</label>
            <span className="text-xs text-muted-foreground">Tc(N₂O) = 36.5 °C</span>
          </div>
          <Slider
            value={[tempC]}
            onValueChange={(v) => setTempC(v[0])}
            min={0}
            max={80}
            step={1}
            aria-label="Temperature in degrees Celsius"
          />
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div className={`rounded p-2 ${tempC < 36.5 ? "bg-physics/15 text-physics font-medium" : "bg-muted text-muted-foreground"}`}>
              Below Tc<br />
              <span className="text-[10px]">two-phase possible</span>
            </div>
            <div className={`rounded p-2 ${isCritical ? "bg-physics/15 text-physics font-medium" : "bg-muted text-muted-foreground"}`}>
              At Tc<br />
              <span className="text-[10px]">critical isotherm</span>
            </div>
            <div className={`rounded p-2 ${tempC > 36.5 ? "bg-physics/15 text-physics font-medium" : "bg-muted text-muted-foreground"}`}>
              Above Tc<br />
              <span className="text-[10px]">gas only — cannot liquefy</span>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default AndrewsIsothermsDiagram;
