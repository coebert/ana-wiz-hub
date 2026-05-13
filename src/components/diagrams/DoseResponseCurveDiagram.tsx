import { useState, useMemo } from "react";

/**
 * Interactive log dose–response curves.
 *
 * Lets the learner toggle between:
 *   • Full agonist alone (reference)
 *   • Partial agonist (↓ Emax)
 *   • + Competitive antagonist  → parallel right-shift, Emax preserved
 *   • + Non-competitive antagonist → depressed Emax (curve flattened)
 *
 * EC₅₀ markers and Emax reference lines update live with the active overlays.
 */

type Overlay = "partial" | "competitive" | "nonCompetitive";

interface CurveParams {
  emax: number;       // 0–1
  logEC50: number;    // log10 (M)
  hill: number;       // Hill coefficient
  color: string;
  dash?: string;
  label: string;
  intrinsic?: number; // for legend
}

const X_MIN = -10; // log [agonist] M
const X_MAX = -3;
const W = 520;
const H = 320;
const PAD_L = 56;
const PAD_R = 18;
const PAD_T = 22;
const PAD_B = 46;

const xToPx = (logC: number) =>
  PAD_L + ((logC - X_MIN) / (X_MAX - X_MIN)) * (W - PAD_L - PAD_R);
const yToPx = (response: number) =>
  H - PAD_B - response * (H - PAD_T - PAD_B);

const sigmoid = ({ emax, logEC50, hill }: CurveParams, logC: number) => {
  const ratio = Math.pow(10, (logC - logEC50) * hill);
  return (emax * ratio) / (1 + ratio);
};

const buildPath = (p: CurveParams) => {
  const pts: string[] = [];
  const N = 120;
  for (let i = 0; i <= N; i++) {
    const logC = X_MIN + (i / N) * (X_MAX - X_MIN);
    const y = sigmoid(p, logC);
    pts.push(`${i === 0 ? "M" : "L"} ${xToPx(logC).toFixed(1)} ${yToPx(y).toFixed(1)}`);
  }
  return pts.join(" ");
};

export const DoseResponseCurveDiagram = () => {
  const [overlays, setOverlays] = useState<Record<Overlay, boolean>>({
    partial: false,
    competitive: false,
    nonCompetitive: false,
  });

  const toggle = (k: Overlay) =>
    setOverlays((o) => ({ ...o, [k]: !o[k] }));

  const curves = useMemo<CurveParams[]>(() => {
    const list: CurveParams[] = [
      {
        label: "Full agonist (control)",
        emax: 1,
        logEC50: -8,
        hill: 1,
        color: "hsl(var(--pharmacology))",
        intrinsic: 1,
      },
    ];
    if (overlays.partial) {
      list.push({
        label: "Partial agonist",
        emax: 0.55,
        logEC50: -8,
        hill: 1,
        color: "hsl(35 85% 50%)",
        dash: "6 3",
        intrinsic: 0.55,
      });
    }
    if (overlays.competitive) {
      list.push({
        label: "+ Competitive antagonist",
        emax: 1,
        logEC50: -6.5, // right-shift ~30×
        hill: 1,
        color: "hsl(210 70% 50%)",
        dash: "5 4",
      });
    }
    if (overlays.nonCompetitive) {
      list.push({
        label: "+ Non-competitive antagonist",
        emax: 0.45,
        logEC50: -8,
        hill: 1,
        color: "hsl(0 65% 50%)",
        dash: "2 3",
      });
    }
    return list;
  }, [overlays]);

  // X-axis tick labels (powers of 10)
  const xTicks = [-10, -9, -8, -7, -6, -5, -4, -3];
  // Y-axis ticks
  const yTicks = [0, 0.25, 0.5, 0.75, 1];

  // Reference markers for EC₅₀ of control
  const controlEC50 = -8;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Log dose–response curves
            </h3>
            <p className="text-xs text-muted-foreground">
              Toggle overlays to compare agonist classes and antagonism patterns.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {([
              { id: "partial", label: "Partial agonist" },
              { id: "competitive", label: "Competitive antagonist" },
              { id: "nonCompetitive", label: "Non-competitive antagonist" },
            ] as const).map((b) => {
              const active = overlays[b.id];
              return (
                <button
                  key={b.id}
                  onClick={() => toggle(b.id)}
                  className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }`}
                  aria-pressed={active}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-2xl mx-auto"
          role="img"
          aria-label="Log dose-response curves comparing full agonist, partial agonist, and competitive vs non-competitive antagonism"
        >
          <defs>
            <linearGradient id="drc-fade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--pharmacology))" stopOpacity="0.10" />
              <stop offset="100%" stopColor="hsl(var(--pharmacology))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Plot frame */}
          <rect
            x={PAD_L}
            y={PAD_T}
            width={W - PAD_L - PAD_R}
            height={H - PAD_T - PAD_B}
            fill="hsl(var(--background))"
            stroke="hsl(var(--border))"
            strokeWidth={1}
          />

          {/* Grid + Y axis */}
          {yTicks.map((y) => (
            <g key={y}>
              <line
                x1={PAD_L}
                x2={W - PAD_R}
                y1={yToPx(y)}
                y2={yToPx(y)}
                stroke="hsl(var(--border))"
                strokeDasharray="2 3"
                opacity={y === 0 ? 0 : 0.6}
              />
              <text
                x={PAD_L - 8}
                y={yToPx(y) + 3}
                textAnchor="end"
                fontSize="9"
                className="fill-muted-foreground"
              >
                {Math.round(y * 100)}%
              </text>
            </g>
          ))}
          <text
            x={14}
            y={(H - PAD_B + PAD_T) / 2}
            textAnchor="middle"
            fontSize="10"
            className="fill-foreground font-semibold"
            transform={`rotate(-90 14 ${(H - PAD_B + PAD_T) / 2})`}
          >
            Response (% Emax)
          </text>

          {/* X axis ticks */}
          {xTicks.map((t) => (
            <g key={t}>
              <line
                x1={xToPx(t)}
                x2={xToPx(t)}
                y1={H - PAD_B}
                y2={H - PAD_B + 4}
                stroke="hsl(var(--muted-foreground))"
              />
              <text
                x={xToPx(t)}
                y={H - PAD_B + 14}
                textAnchor="middle"
                fontSize="9"
                className="fill-muted-foreground"
              >
                10
                <tspan baselineShift="super" fontSize="6">{t}</tspan>
              </text>
            </g>
          ))}
          <text
            x={(W + PAD_L - PAD_R) / 2}
            y={H - 8}
            textAnchor="middle"
            fontSize="10"
            className="fill-foreground font-semibold"
          >
            log [Agonist] (M)
          </text>

          {/* Emax 100% reference line */}
          <line
            x1={PAD_L}
            x2={W - PAD_R}
            y1={yToPx(1)}
            y2={yToPx(1)}
            stroke="hsl(var(--pharmacology))"
            strokeDasharray="3 3"
            opacity={0.45}
          />
          <text
            x={W - PAD_R - 4}
            y={yToPx(1) - 4}
            textAnchor="end"
            fontSize="8.5"
            fill="hsl(var(--pharmacology))"
            opacity={0.85}
          >
            Emax (full)
          </text>

          {/* Reference EC₅₀ marker for control */}
          <line
            x1={xToPx(controlEC50)}
            x2={xToPx(controlEC50)}
            y1={yToPx(0.5)}
            y2={H - PAD_B}
            stroke="hsl(var(--pharmacology))"
            strokeDasharray="2 3"
            opacity={0.55}
          />
          <line
            x1={PAD_L}
            x2={xToPx(controlEC50)}
            y1={yToPx(0.5)}
            y2={yToPx(0.5)}
            stroke="hsl(var(--pharmacology))"
            strokeDasharray="2 3"
            opacity={0.55}
          />
          <text
            x={xToPx(controlEC50) + 4}
            y={yToPx(0.5) - 4}
            fontSize="8.5"
            fill="hsl(var(--pharmacology))"
            className="font-semibold"
          >
            EC₅₀
          </text>

          {/* Curves */}
          {curves.map((c, idx) => (
            <g key={c.label}>
              {idx === 0 && (
                <path
                  d={`${buildPath(c)} L ${xToPx(X_MAX)} ${H - PAD_B} L ${PAD_L} ${H - PAD_B} Z`}
                  fill="url(#drc-fade)"
                  opacity={0.9}
                />
              )}
              <path
                d={buildPath(c)}
                fill="none"
                stroke={c.color}
                strokeWidth={2}
                strokeDasharray={c.dash}
                strokeLinecap="round"
              />
              {/* EC50 dot */}
              <circle
                cx={xToPx(c.logEC50)}
                cy={yToPx(c.emax / 2)}
                r={3.5}
                fill={c.color}
                stroke="hsl(var(--background))"
                strokeWidth={1}
              />
            </g>
          ))}

          {/* Annotations for active overlays */}
          {overlays.competitive && (
            <g>
              <line
                x1={xToPx(-8) + 4}
                x2={xToPx(-6.5) - 4}
                y1={yToPx(0.5)}
                y2={yToPx(0.5)}
                stroke="hsl(210 70% 50%)"
                strokeWidth={1}
                markerEnd="url(#drc-arrow-blue)"
              />
              <text
                x={(xToPx(-8) + xToPx(-6.5)) / 2}
                y={yToPx(0.5) - 6}
                textAnchor="middle"
                fontSize="9"
                fill="hsl(210 70% 50%)"
                className="font-semibold"
              >
                Right-shift (↑ EC₅₀)
              </text>
            </g>
          )}
          {overlays.nonCompetitive && (
            <g>
              <line
                x1={xToPx(-3.5)}
                x2={xToPx(-3.5)}
                y1={yToPx(1) + 2}
                y2={yToPx(0.45) - 2}
                stroke="hsl(0 65% 50%)"
                strokeWidth={1}
                markerEnd="url(#drc-arrow-red)"
              />
              <text
                x={xToPx(-3.5) - 6}
                y={yToPx(0.72)}
                textAnchor="end"
                fontSize="9"
                fill="hsl(0 65% 50%)"
                className="font-semibold"
              >
                ↓ Emax
              </text>
            </g>
          )}

          <defs>
            <marker id="drc-arrow-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="hsl(210 70% 50%)" />
            </marker>
            <marker id="drc-arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="hsl(0 65% 50%)" />
            </marker>
          </defs>
        </svg>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 justify-center text-xs">
          {curves.map((c) => (
            <div key={c.label} className="flex items-center gap-2">
              <span
                className="inline-block w-6 h-0.5"
                style={{
                  background: c.color,
                  ...(c.dash ? { borderTop: `2px dashed ${c.color}`, background: "transparent", height: 0 } : {}),
                }}
              />
              <span className="text-foreground">{c.label}</span>
              {c.intrinsic !== undefined && (
                <span className="text-muted-foreground">
                  (α = {c.intrinsic.toFixed(2)})
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Reading hints */}
        <div className="mt-3 text-xs text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          <p>
            <span className="font-semibold text-foreground">Reading the curve:</span>{" "}
            <em>Potency</em> = horizontal position (lower EC₅₀ ⇒ more potent).{" "}
            <em>Efficacy</em> = plateau height (Emax). A{" "}
            <span className="font-semibold" style={{ color: "hsl(210 70% 50%)" }}>
              competitive antagonist
            </span>{" "}
            shifts the curve <strong>right</strong> with Emax preserved (surmountable).
            A{" "}
            <span className="font-semibold" style={{ color: "hsl(0 65% 50%)" }}>
              non-competitive antagonist
            </span>{" "}
            depresses Emax (insurmountable).
          </p>
        </div>
      </div>
    </div>
  );
};
