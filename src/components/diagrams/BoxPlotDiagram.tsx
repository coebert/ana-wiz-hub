import { useState, useMemo } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Preset = "symmetric" | "rightSkew" | "leftSkew" | "bimodal" | "withOutliers";

const W = 600;
const H = 320;
const PAD = { top: 24, right: 24, bottom: 70, left: 56 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const X_MIN = 0;
const X_MAX = 20;

const seeded = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

const generateDataset = (preset: Preset): number[] => {
  const rand = seeded(7);
  const data: number[] = [];
  const n = 100;
  const norm = () => {
    const u1 = Math.max(rand(), 1e-9);
    const u2 = rand();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };
  for (let i = 0; i < n; i++) {
    let v: number;
    if (preset === "symmetric") {
      v = 10 + norm() * 2.2;
    } else if (preset === "rightSkew") {
      v = 4 + Math.exp(0.5 + 0.55 * norm());
    } else if (preset === "leftSkew") {
      v = 16 - Math.exp(0.5 + 0.55 * norm());
    } else if (preset === "bimodal") {
      v = (i % 2 === 0 ? 6 : 14) + norm() * 1.2;
    } else {
      v = 10 + norm() * 1.5;
    }
    v = Math.max(X_MIN + 0.1, Math.min(X_MAX - 0.1, v));
    data.push(v);
  }
  if (preset === "withOutliers") {
    data.push(0.5, 0.8, 19.2, 19.6);
  }
  return data;
};

const xScale = (x: number) => PAD.left + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;

const quantile = (sorted: number[], q: number) => {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
};

const computeBoxStats = (data: number[]) => {
  const sorted = [...data].sort((a, b) => a - b);
  const q1 = quantile(sorted, 0.25);
  const median = quantile(sorted, 0.5);
  const q3 = quantile(sorted, 0.75);
  const iqr = q3 - q1;
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const inFence = sorted.filter((v) => v >= lowerFence && v <= upperFence);
  const whiskerLo = inFence.length ? inFence[0] : q1;
  const whiskerHi = inFence.length ? inFence[inFence.length - 1] : q3;
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);
  const mean = sorted.reduce((s, v) => s + v, 0) / sorted.length;
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  return { q1, median, q3, iqr, whiskerLo, whiskerHi, outliers, mean, min, max, n: sorted.length };
};

export const BoxPlotDiagram = () => {
  const [preset, setPreset] = useState<Preset>("symmetric");

  const stats = useMemo(() => computeBoxStats(generateDataset(preset)), [preset]);

  const presetLabels: Record<Preset, string> = {
    symmetric: "Symmetric",
    rightSkew: "Right-skewed",
    leftSkew: "Left-skewed",
    bimodal: "Bimodal",
    withOutliers: "With outliers",
  };

  // Box geometry — single horizontal box centred vertically
  const boxTop = PAD.top + PLOT_H * 0.25;
  const boxBottom = PAD.top + PLOT_H * 0.75;
  const boxMid = (boxTop + boxBottom) / 2;
  const boxHeight = boxBottom - boxTop;

  return (
    <DiagramFigure
      id="box-plot-diagram"
      title="Box-and-whisker plot — median, IQR and outliers"
      description="Interactive box plot showing the five-number summary (min/whisker, Q1, median, Q3, max/whisker) with outliers, updating as different population distributions are selected."
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {(Object.keys(presetLabels) as Preset[]).map((p) => (
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

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Box plot of ${presetLabels[preset]} distribution showing median ${stats.median.toFixed(2)}, IQR ${stats.q1.toFixed(2)} to ${stats.q3.toFixed(2)}`}
        >
          {/* Whisker line */}
          <line
            x1={xScale(stats.whiskerLo)}
            y1={boxMid}
            x2={xScale(stats.whiskerHi)}
            y2={boxMid}
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
          />
          {/* Whisker caps */}
          {[stats.whiskerLo, stats.whiskerHi].map((v, i) => (
            <line
              key={i}
              x1={xScale(v)}
              y1={boxTop + boxHeight * 0.2}
              x2={xScale(v)}
              y2={boxBottom - boxHeight * 0.2}
              stroke="hsl(var(--foreground))"
              strokeWidth="1.5"
            />
          ))}

          {/* Box (Q1 to Q3) */}
          <rect
            x={xScale(stats.q1)}
            y={boxTop}
            width={xScale(stats.q3) - xScale(stats.q1)}
            height={boxHeight}
            fill="hsl(var(--physics) / 0.25)"
            stroke="hsl(var(--physics))"
            strokeWidth="2"
          />

          {/* Median line */}
          <line
            x1={xScale(stats.median)}
            y1={boxTop}
            x2={xScale(stats.median)}
            y2={boxBottom}
            stroke="hsl(var(--clinical))"
            strokeWidth="3"
          />

          {/* Mean diamond for comparison */}
          <g transform={`translate(${xScale(stats.mean)}, ${boxMid})`}>
            <polygon
              points="0,-7 7,0 0,7 -7,0"
              fill="hsl(var(--pharmacology))"
              stroke="hsl(var(--background))"
              strokeWidth="1.5"
            />
          </g>

          {/* Outliers */}
          {stats.outliers.map((v, i) => (
            <circle
              key={i}
              cx={xScale(v)}
              cy={boxMid}
              r="4"
              fill="hsl(var(--destructive) / 0.5)"
              stroke="hsl(var(--destructive))"
              strokeWidth="1.5"
            />
          ))}

          {/* Labels above box */}
          <text x={xScale(stats.q1)} y={boxTop - 8} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">
            Q1 {stats.q1.toFixed(1)}
          </text>
          <text x={xScale(stats.median)} y={boxTop - 8} textAnchor="middle" fontSize="11" fill="hsl(var(--clinical))" className="font-semibold">
            Median {stats.median.toFixed(1)}
          </text>
          <text x={xScale(stats.q3)} y={boxTop - 8} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">
            Q3 {stats.q3.toFixed(1)}
          </text>

          {/* Labels below */}
          <text x={xScale(stats.whiskerLo)} y={boxBottom + 18} textAnchor="middle" fontSize="10" className="fill-muted-foreground">
            {stats.whiskerLo.toFixed(1)}
          </text>
          <text x={xScale(stats.whiskerHi)} y={boxBottom + 18} textAnchor="middle" fontSize="10" className="fill-muted-foreground">
            {stats.whiskerHi.toFixed(1)}
          </text>
          <text x={xScale(stats.mean)} y={boxBottom + 32} textAnchor="middle" fontSize="10" fill="hsl(var(--pharmacology))" className="font-semibold">
            ◆ mean {stats.mean.toFixed(1)}
          </text>

          {/* IQR bracket */}
          <line
            x1={xScale(stats.q1)}
            y1={PAD.top + PLOT_H + 4}
            x2={xScale(stats.q3)}
            y2={PAD.top + PLOT_H + 4}
            stroke="hsl(var(--physics))"
            strokeWidth="1.5"
          />
          <text
            x={xScale((stats.q1 + stats.q3) / 2)}
            y={PAD.top + PLOT_H + 18}
            textAnchor="middle"
            fontSize="11"
            fill="hsl(var(--physics))"
            className="font-semibold"
          >
            IQR = {(Number(stats.q3.toFixed(1)) - Number(stats.q1.toFixed(1))).toFixed(1)}
          </text>

          {/* x-axis */}
          <line
            x1={PAD.left}
            y1={PAD.top + PLOT_H + 36}
            x2={W - PAD.right}
            y2={PAD.top + PLOT_H + 36}
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
          />
          {[0, 4, 8, 12, 16, 20].map((t) => (
            <g key={t}>
              <line
                x1={xScale(t)}
                y1={PAD.top + PLOT_H + 36}
                x2={xScale(t)}
                y2={PAD.top + PLOT_H + 41}
                stroke="hsl(var(--foreground))"
              />
              <text
                x={xScale(t)}
                y={PAD.top + PLOT_H + 54}
                textAnchor="middle"
                fontSize="10"
                className="fill-muted-foreground"
              >
                {t}
              </text>
            </g>
          ))}

          <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="11" className="fill-muted-foreground">
            n = {stats.n} · {presetLabels[preset]}
          </text>
        </svg>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 text-center">
          {[
            { label: "Min", value: stats.min },
            { label: "Q1", value: stats.q1 },
            { label: "Median", value: stats.median, accent: "hsl(var(--clinical))" },
            { label: "Q3", value: stats.q3 },
            { label: "Max", value: stats.max },
          ].map((s) => (
            <div key={s.label} className="p-2 rounded-md bg-secondary/40 border border-border">
              <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: s.accent ?? "hsl(var(--muted-foreground))" }}>
                {s.label}
              </p>
              <p className="text-sm font-bold text-foreground">{s.value.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-md bg-secondary/40 border border-border text-sm text-muted-foreground space-y-1.5">
          <p>
            <strong className="text-foreground">Reading the plot:</strong> the box spans <strong>Q1 to Q3</strong> (the middle 50% of the data, the IQR). The line inside is the
            <span style={{ color: "hsl(var(--clinical))" }} className="font-semibold"> median</span>, and the
            <span style={{ color: "hsl(var(--pharmacology))" }} className="font-semibold"> ◆ diamond</span> is the mean.
          </p>
          <p>
            <strong className="text-foreground">Whiskers</strong> extend to the most extreme value within 1.5 × IQR of Q1/Q3. Points beyond that are flagged as <span style={{ color: "hsl(var(--destructive))" }} className="font-semibold">outliers</span>.
          </p>
          <p>
            <strong className="text-foreground">Skew clue:</strong> if the median sits off-centre in the box, or one whisker is much longer than the other, the distribution is skewed.
            A noticeable gap between mean (◆) and median is another tell.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default BoxPlotDiagram;
