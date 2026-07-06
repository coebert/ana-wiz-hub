import { useState, useMemo } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Preset = "symmetric" | "rightSkew" | "leftSkew";

const W = 600;
const H = 360;
const PAD = { top: 24, right: 24, bottom: 70, left: 48 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const X_MIN = 0;
const X_MAX = 20;
const BIN_W = 1;
const N_BINS = X_MAX - X_MIN;

// Deterministic pseudo-random for reproducible "datasets"
const seeded = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

const generateDataset = (preset: Preset): number[] => {
  const rand = seeded(42);
  const data: number[] = [];
  const n = 80;
  for (let i = 0; i < n; i++) {
    // Box-Muller for standard normal
    const u1 = Math.max(rand(), 1e-9);
    const u2 = rand();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    let v: number;
    if (preset === "symmetric") {
      v = 10 + z * 2.2;
    } else if (preset === "rightSkew") {
      // log-normal-ish, anchored low
      v = 4 + Math.exp(0.5 + 0.55 * z);
    } else {
      // mirror right-skew across the middle
      v = 16 - Math.exp(0.5 + 0.55 * z);
    }
    v = Math.max(X_MIN + 0.1, Math.min(X_MAX - 0.1, v));
    data.push(v);
  }
  return data;
};

const xScale = (x: number) => PAD.left + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;

const computeStats = (data: number[]) => {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((s, v) => s + v, 0) / n;
  const median =
    n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
  // Mode = midpoint of densest bin
  const counts = new Array<number>(N_BINS).fill(0);
  for (const v of sorted) {
    const idx = Math.min(N_BINS - 1, Math.floor((v - X_MIN) / BIN_W));
    counts[idx]++;
  }
  let modeIdx = 0;
  for (let i = 1; i < counts.length; i++) {
    if (counts[i] > counts[modeIdx]) modeIdx = i;
  }
  const mode = X_MIN + (modeIdx + 0.5) * BIN_W;
  const peak = Math.max(...counts);
  return { mean, median, mode, counts, peak };
};

export const CentralTendencyShiftDiagram = () => {
  const [preset, setPreset] = useState<Preset>("symmetric");
  const [outlierCount, setOutlierCount] = useState(0); // 0–5
  const [outlierSide, setOutlierSide] = useState<"high" | "low">("high");

  const data = useMemo(() => {
    const base = generateDataset(preset);
    const outlierVal = outlierSide === "high" ? X_MAX - 0.5 : X_MIN + 0.5;
    for (let i = 0; i < outlierCount; i++) base.push(outlierVal);
    return base;
  }, [preset, outlierCount, outlierSide]);

  const baseline = useMemo(() => computeStats(generateDataset(preset)), [preset]);
  const stats = useMemo(() => computeStats(data), [data]);

  const yScale = (count: number) =>
    PAD.top + PLOT_H - (count / Math.max(stats.peak, baseline.peak, 1)) * PLOT_H * 0.92;

  const markers = [
    { x: stats.mode, label: "Mode", color: "hsl(var(--physiology))", base: baseline.mode },
    { x: stats.median, label: "Median", color: "hsl(var(--clinical))", base: baseline.median },
    { x: stats.mean, label: "Mean", color: "hsl(var(--pharmacology))", base: baseline.mean },
  ];

  const presetLabels: Record<Preset, string> = {
    symmetric: "Symmetric",
    rightSkew: "Right-skewed",
    leftSkew: "Left-skewed",
  };

  return (
    <DiagramFigure
      id="central-tendency-shift"
      title="Mean vs median vs mode — how they shift with skew and outliers"
      description="Histogram of a dataset with mean, median and mode marked. Toggle the underlying distribution and inject outliers to see how each measure of central tendency responds."
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {(["symmetric", "rightSkew", "leftSkew"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                preset === p
                  ? "bg-physics/10 border-physics text-physics"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {presetLabels[p]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-center mb-4 p-3 rounded-md bg-secondary/30 border border-border">
          <span className="text-sm font-medium text-foreground">Outliers:</span>
          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={outlierCount}
            onChange={(e) => setOutlierCount(Number(e.target.value))}
            className="w-32 accent-physics"
            aria-label="Number of outliers to add"
          />
          <span className="text-sm font-mono text-foreground w-6 text-center">{outlierCount}</span>
          <div className="flex gap-1">
            {(["low", "high"] as const).map((side) => (
              <button
                key={side}
                onClick={() => setOutlierSide(side)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                  outlierSide === side
                    ? "bg-physics text-physics-foreground border-physics"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {side === "high" ? "High" : "Low"}
              </button>
            ))}
          </div>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`${presetLabels[preset]} dataset histogram with ${outlierCount} ${outlierSide} outliers, showing mean, median and mode positions`}
        >
          {/* Baseline */}
          <line
            x1={PAD.left}
            y1={yScale(0)}
            x2={W - PAD.right}
            y2={yScale(0)}
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
          />

          {/* Histogram bars */}
          {stats.counts.map((c, i) => {
            const x = xScale(X_MIN + i * BIN_W);
            const w = (PLOT_W / N_BINS) - 2;
            const y = yScale(c);
            const h = yScale(0) - y;
            const isOutlierBin =
              outlierCount > 0 &&
              ((outlierSide === "high" && i === N_BINS - 1) ||
                (outlierSide === "low" && i === 0));
            return (
              <rect
                key={i}
                x={x + 1}
                y={y}
                width={w}
                height={h}
                fill={
                  isOutlierBin
                    ? "hsl(var(--destructive) / 0.55)"
                    : "hsl(var(--physics) / 0.45)"
                }
                stroke={
                  isOutlierBin ? "hsl(var(--destructive))" : "hsl(var(--physics))"
                }
                strokeWidth="1"
              />
            );
          })}

          {/* Markers + arrows showing shift from baseline */}
          {markers.map((m, i) => {
            const x = xScale(m.x);
            const xBase = xScale(m.base);
            const labelY = PAD.top + 14 + i * 18;
            const shifted = Math.abs(m.x - m.base) > 0.05;
            return (
              <g key={m.label}>
                {shifted && (
                  <line
                    x1={xBase}
                    y1={labelY - 4}
                    x2={x - 4}
                    y2={labelY - 4}
                    stroke={m.color}
                    strokeWidth="1"
                    opacity={0.5}
                    markerEnd="url(#tendency-arrow)"
                  />
                )}
                <line
                  x1={x}
                  y1={yScale(0)}
                  x2={x}
                  y2={PAD.top + 6}
                  stroke={m.color}
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <circle cx={x} cy={yScale(0)} r="4" fill={m.color} />
                <rect
                  x={x + 6}
                  y={labelY - 11}
                  width={72}
                  height={16}
                  rx={3}
                  fill="hsl(var(--background))"
                  stroke={m.color}
                  strokeWidth="1"
                />
                <text
                  x={x + 10}
                  y={labelY + 1}
                  fontSize="11"
                  className="font-semibold"
                  fill={m.color}
                >
                  {m.label} {m.x.toFixed(1)}
                </text>
              </g>
            );
          })}

          <defs>
            <marker
              id="tendency-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--muted-foreground))" />
            </marker>
          </defs>

          {/* x-axis ticks */}
          {[0, 4, 8, 12, 16, 20].map((t) => (
            <g key={t}>
              <line
                x1={xScale(t)}
                y1={yScale(0)}
                x2={xScale(t)}
                y2={yScale(0) + 5}
                stroke="hsl(var(--foreground))"
              />
              <text
                x={xScale(t)}
                y={yScale(0) + 18}
                textAnchor="middle"
                fontSize="10"
                className="fill-muted-foreground"
              >
                {t}
              </text>
            </g>
          ))}

          <text
            x={PAD.left + PLOT_W / 2}
            y={H - 38}
            textAnchor="middle"
            fontSize="12"
            className="fill-foreground font-medium"
          >
            Variable value (arbitrary units)
          </text>
          <text
            x={PAD.left + PLOT_W / 2}
            y={H - 20}
            textAnchor="middle"
            fontSize="10"
            className="fill-muted-foreground"
          >
            n = {data.length}
            {outlierCount > 0 ? ` (${outlierCount} ${outlierSide} outlier${outlierCount > 1 ? "s" : ""})` : ""}
          </text>
        </svg>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {markers.map((m) => {
            const delta = m.x - m.base;
            return (
              <div
                key={m.label}
                className="p-2 rounded-md border"
                style={{ borderColor: m.color, background: `${m.color.replace(")", " / 0.08)")}` }}
              >
                <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: m.color }}>
                  {m.label}
                </p>
                <p className="text-lg font-bold text-foreground">{m.x.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.abs(delta) < 0.05 ? "unchanged" : `${delta > 0 ? "+" : ""}${delta.toFixed(2)} vs baseline`}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-md bg-secondary/40 border border-border text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Key observation:</strong> the <span style={{ color: "hsl(var(--pharmacology))" }} className="font-semibold">mean</span> is dragged toward outliers and into the tail of a skewed distribution.
            The <span style={{ color: "hsl(var(--clinical))" }} className="font-semibold">median</span> barely moves because it depends only on rank, not magnitude. The
            <span style={{ color: "hsl(var(--physiology))" }} className="font-semibold"> mode</span> stays at the densest bin — useful for bimodal or categorical data but unstable in small samples.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default CentralTendencyShiftDiagram;
