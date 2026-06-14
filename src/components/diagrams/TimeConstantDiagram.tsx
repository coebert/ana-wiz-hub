import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Mode = "decay" | "washin";

export const TimeConstantDiagram = () => {
  const [mode, setMode] = useState<Mode>("decay");
  const [hover, setHover] = useState<number | null>(null);

  const width = 560;
  const height = 340;
  const pad = { top: 24, right: 24, bottom: 48, left: 56 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const maxT = 5; // in units of τ

  const fn = (t: number) =>
    mode === "decay" ? 100 * Math.exp(-t) : 100 * (1 - Math.exp(-t));

  const xScale = (t: number) => pad.left + (t / maxT) * plotW;
  const yScale = (v: number) => pad.top + plotH - (v / 100) * plotH;

  // Curve path
  const steps = 200;
  const curve = Array.from({ length: steps + 1 }, (_, i) => {
    const t = (i / steps) * maxT;
    return `${i === 0 ? "M" : "L"} ${xScale(t).toFixed(2)} ${yScale(fn(t)).toFixed(2)}`;
  }).join(" ");

  const markers = [
    { tau: 1, pct: 63.2 },
    { tau: 2, pct: 86.5 },
    { tau: 3, pct: 95.0 },
    { tau: 4, pct: 98.2 },
    { tau: 5, pct: 99.3 },
  ];

  const yGridValues =
    mode === "decay"
      ? [0, 25, 50, 75, 100]
      : [0, 25, 50, 63.2, 75, 95, 100];

  return (
    <DiagramFigure
      id="time-constant-graph"
      title="Time constant (τ) — exponential decay and wash-in"
      description="Negative exponential decay and wash-in curves with markers at 1τ, 2τ, 3τ, 4τ and 5τ illustrating the 63%, 86%, 95%, 98% and 99% rule."
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex gap-2 justify-center mb-4">
          <button
            onClick={() => setMode("decay")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              mode === "decay"
                ? "bg-physics/10 border-physics text-physics"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            Decay (e⁻ᵗ/τ)
          </button>
          <button
            onClick={() => setMode("washin")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              mode === "washin"
                ? "bg-physics/10 border-physics text-physics"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            Wash-in (1 − e⁻ᵗ/τ)
          </button>
        </div>

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Exponential ${mode === "decay" ? "decay" : "wash-in"} curve with time constant markers`}
        >
          {/* Y gridlines */}
          {[0, 25, 50, 63.2, 75, 95, 100].map((v) => {
            const y = yScale(v);
            const emphasise = v === 63.2 || v === 95;
            return (
              <g key={v}>
                <line
                  x1={pad.left}
                  y1={y}
                  x2={width - pad.right}
                  y2={y}
                  stroke={emphasise ? "hsl(var(--physics) / 0.35)" : "hsl(var(--border))"}
                  strokeDasharray={emphasise ? "4 3" : undefined}
                />
                <text
                  x={pad.left - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="10"
                  className="fill-muted-foreground"
                >
                  {v}%
                </text>
              </g>
            );
          })}

          {/* X gridlines (τ marks) */}
          {[0, 1, 2, 3, 4, 5].map((tau) => {
            const x = xScale(tau);
            return (
              <g key={tau}>
                <line
                  x1={x}
                  y1={pad.top}
                  x2={x}
                  y2={pad.top + plotH}
                  stroke="hsl(var(--border))"
                />
                <text
                  x={x}
                  y={pad.top + plotH + 16}
                  textAnchor="middle"
                  fontSize="11"
                  className="fill-muted-foreground"
                >
                  {tau}τ
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line
            x1={pad.left}
            y1={pad.top}
            x2={pad.left}
            y2={pad.top + plotH}
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
          />
          <line
            x1={pad.left}
            y1={pad.top + plotH}
            x2={width - pad.right}
            y2={pad.top + plotH}
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
          />

          {/* Axis labels */}
          <text
            x={pad.left + plotW / 2}
            y={height - 6}
            textAnchor="middle"
            fontSize="12"
            className="fill-foreground font-medium"
          >
            Time (in time constants, τ)
          </text>
          <text
            x={14}
            y={pad.top + plotH / 2}
            textAnchor="middle"
            transform={`rotate(-90 14 ${pad.top + plotH / 2})`}
            fontSize="12"
            className="fill-foreground font-medium"
          >
            {mode === "decay" ? "% remaining" : "% complete"}
          </text>

          {/* Curve */}
          <path
            d={curve}
            fill="none"
            stroke="hsl(var(--physics))"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Markers */}
          {markers.map((m) => {
            const value = mode === "decay" ? 100 - m.pct : m.pct;
            const x = xScale(m.tau);
            const y = yScale(value);
            const active = hover === m.tau;
            return (
              <g
                key={m.tau}
                onMouseEnter={() => setHover(m.tau)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              >
                <line
                  x1={x}
                  y1={y}
                  x2={pad.left}
                  y2={y}
                  stroke="hsl(var(--physics) / 0.4)"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={x}
                  cy={y}
                  r={active ? 7 : 5}
                  fill="hsl(var(--physics))"
                  stroke="hsl(var(--background))"
                  strokeWidth="2"
                />
                <text
                  x={x + 8}
                  y={y - 8}
                  fontSize="11"
                  className="fill-foreground font-semibold"
                >
                  {mode === "decay"
                    ? `${(100 - m.pct).toFixed(1)}%`
                    : `${m.pct.toFixed(1)}%`}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
          {markers.map((m) => (
            <div
              key={m.tau}
              className="p-2 rounded-md bg-secondary/40 border border-border text-center"
            >
              <p className="text-xs text-muted-foreground">{m.tau}τ</p>
              <p className="text-sm font-semibold text-foreground">
                {mode === "decay"
                  ? `${(100 - m.pct).toFixed(1)}%`
                  : `${m.pct.toFixed(1)}%`}
              </p>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          By convention, an exponential process is considered complete after ~5 time constants (≈99%).
          The half-life t½ = 0.693 × τ falls between 0τ and 1τ.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default TimeConstantDiagram;
