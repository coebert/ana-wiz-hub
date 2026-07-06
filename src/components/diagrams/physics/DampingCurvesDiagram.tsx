import { useMemo } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * DampingCurvesDiagram
 *
 * Plots the step response of a second-order pressure-monitoring system
 * (e.g. arterial-line transducer) for four representative damping
 * coefficients ζ:
 *   - 0.2   under-damped     — multiple decaying oscillations, overshoots SBP
 *   - 0.64  optimal          — single ~6% overshoot, best fidelity
 *   - 1.0   critically damped — fastest return without overshoot
 *   - 2.0   over-damped      — slow, sluggish approach, underreads SBP
 *
 * Visualises the textbook fast-flush square-wave test interpretation
 * (BJA Educ 2020 — Resonance, Cross & Plunkett Ch.7).
 */

const VB_W = 720;
const VB_H = 360;
const PLOT = { x0: 60, y0: 30, x1: 690, y1: 300 };
const PLOT_W = PLOT.x1 - PLOT.x0;
const PLOT_H = PLOT.y1 - PLOT.y0;

// Map normalized response y∈[0,~1.7] and normalized time τ=ωₙt∈[0,12]
const T_MAX = 12;
const Y_MIN = -0.1; // allow a tiny undershoot dip below baseline
const Y_MAX = 1.7;
const N = 240;

const xScale = (t: number) => PLOT.x0 + (t / T_MAX) * PLOT_W;
const yScale = (y: number) =>
  PLOT.y1 - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;

/**
 * Unit-step response of a 2nd-order underdamped/critical/overdamped system
 * with ωₙ=1. Returns the value at normalized time τ.
 */
function stepResponse(zeta: number, tau: number): number {
  if (tau <= 0) return 0;
  if (zeta < 1) {
    const wd = Math.sqrt(1 - zeta * zeta);
    const phi = Math.atan2(wd, zeta);
    return 1 - (Math.exp(-zeta * tau) / wd) * Math.sin(wd * tau + phi);
  }
  if (zeta === 1) {
    return 1 - (1 + tau) * Math.exp(-tau);
  }
  const a = Math.sqrt(zeta * zeta - 1);
  return (
    1 -
    Math.exp(-zeta * tau) *
      (Math.cosh(a * tau) + (zeta / a) * Math.sinh(a * tau))
  );
}

function buildPath(zeta: number): string {
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const tau = (i / N) * T_MAX;
    const y = stepResponse(zeta, tau);
    pts.push(`${i === 0 ? "M" : "L"}${xScale(tau).toFixed(2)},${yScale(y).toFixed(2)}`);
  }
  return pts.join(" ");
}

interface Curve {
  zeta: number;
  label: string;
  sub: string;
  // CSS variable token from index.css — keeps the figure on-theme in both
  // light and dark mode.
  color: string;
  dash?: string;
}

const CURVES: Curve[] = [
  { zeta: 0.2, label: "Under-damped", sub: "ζ = 0.2", color: "hsl(var(--destructive))" },
  { zeta: 0.64, label: "Optimal", sub: "ζ = 0.64", color: "hsl(var(--primary))" },
  { zeta: 1.0, label: "Critically damped", sub: "ζ = 1.0", color: "hsl(var(--icu))", dash: "6 3" },
  { zeta: 2.0, label: "Over-damped", sub: "ζ = 2.0", color: "hsl(var(--muted-foreground))" },
];

const DampingCurvesDiagram = () => {
  const paths = useMemo(
    () => CURVES.map((c) => ({ ...c, d: buildPath(c.zeta) })),
    [],
  );

  // Grid: horizontal at y=0 (baseline) and y=1 (target pressure)
  const baselineY = yScale(0);
  const targetY = yScale(1);

  return (
    <DiagramFigure
      id="damping-curves-diagram"
      title="Damping coefficients of a pressure-monitoring system"
      description="Step (fast-flush) response of a second-order arterial-line transducer system for four damping coefficients. Under-damped (ζ=0.2) shows multiple decaying oscillations and overshoots true pressure. Optimal damping (ζ=0.64) shows a single small overshoot and the fastest accurate settling. Critical damping (ζ=1.0) returns to the target without overshoot but more slowly. Over-damped (ζ=2.0) approaches the target sluggishly, under-reading systolic peaks."
      showCaption
    >
      <div className="my-6 rounded-lg border border-border bg-card p-4">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full h-auto max-h-[440px]"
          role="img"
          aria-labelledby="damping-curves-title damping-curves-desc"
        >
          <title id="damping-curves-title">
            Pressure transducer step response for different damping coefficients
          </title>
          <desc id="damping-curves-desc">
            Four curves on a normalised time vs pressure plot showing the step
            response after a fast-flush square-wave release.
          </desc>

          {/* Plot frame */}
          <rect
            x={PLOT.x0}
            y={PLOT.y0}
            width={PLOT_W}
            height={PLOT_H}
            fill="hsl(var(--background))"
            stroke="hsl(var(--border))"
            strokeWidth={1}
          />

          {/* Target pressure (y=1) reference line */}
          <line
            x1={PLOT.x0}
            y1={targetY}
            x2={PLOT.x1}
            y2={targetY}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.6}
          />
          <text
            x={PLOT.x1 - 4}
            y={targetY - 6}
            textAnchor="end"
            fontSize={11}
            fill="hsl(var(--muted-foreground))"
          >
            True pressure
          </text>

          {/* Baseline (y=0) */}
          <line
            x1={PLOT.x0}
            y1={baselineY}
            x2={PLOT.x1}
            y2={baselineY}
            stroke="hsl(var(--border))"
            strokeWidth={1}
          />
          <text
            x={PLOT.x1 - 4}
            y={baselineY + 14}
            textAnchor="end"
            fontSize={11}
            fill="hsl(var(--muted-foreground))"
          >
            Baseline
          </text>

          {/* Y-axis label */}
          <text
            x={18}
            y={PLOT.y0 + PLOT_H / 2}
            fontSize={12}
            fill="hsl(var(--foreground))"
            textAnchor="middle"
            transform={`rotate(-90 18 ${PLOT.y0 + PLOT_H / 2})`}
          >
            Recorded pressure
          </text>

          {/* X-axis label */}
          <text
            x={PLOT.x0 + PLOT_W / 2}
            y={VB_H - 8}
            fontSize={12}
            textAnchor="middle"
            fill="hsl(var(--foreground))"
          >
            Time after fast-flush release (ωₙ t)
          </text>

          {/* Curves */}
          {paths.map((c) => (
            <path
              key={c.zeta}
              d={c.d}
              fill="none"
              stroke={c.color}
              strokeWidth={2.2}
              strokeDasharray={c.dash}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Legend */}
          <g transform={`translate(${PLOT.x0 + 14}, ${PLOT.y0 + 12})`}>
            <rect
              x={-6}
              y={-8}
              width={210}
              height={CURVES.length * 22 + 12}
              rx={6}
              fill="hsl(var(--background))"
              stroke="hsl(var(--border))"
              opacity={0.92}
            />
            {CURVES.map((c, i) => (
              <g key={c.zeta} transform={`translate(0, ${i * 22 + 6})`}>
                <line
                  x1={0}
                  y1={6}
                  x2={28}
                  y2={6}
                  stroke={c.color}
                  strokeWidth={2.5}
                  strokeDasharray={c.dash}
                  strokeLinecap="round"
                />
                <text
                  x={36}
                  y={9}
                  fontSize={12}
                  fill="hsl(var(--foreground))"
                  fontWeight={600}
                >
                  {c.label}
                </text>
                <text
                  x={140}
                  y={9}
                  fontSize={12}
                  fill="hsl(var(--muted-foreground))"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                >
                  {c.sub}
                </text>
              </g>
            ))}
          </g>
        </svg>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
          <p>
            <strong className="text-foreground">Under-damped</strong> (ζ &lt; 0.4): &gt;2 decaying oscillations on the
            fast-flush test → resonance, <em>over-reads SBP, under-reads DBP</em>.
          </p>
          <p>
            <strong className="text-foreground">Optimal</strong> (ζ ≈ 0.64): a single small overshoot then baseline within
            ~1 oscillation → SBP, DBP and MAP all reliable.
          </p>
          <p>
            <strong className="text-foreground">Critically damped</strong> (ζ = 1): no overshoot, slowest return that still
            avoids oscillation — used as the textbook boundary.
          </p>
          <p>
            <strong className="text-foreground">Over-damped</strong> (ζ &gt; 1): no oscillation, sluggish trace →
            <em> under-reads SBP, over-reads DBP</em>. MAP is least affected in either direction.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default DampingCurvesDiagram;
