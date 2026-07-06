import { useState, useMemo } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Skew = "negative" | "symmetric" | "positive";

const W = 600;
const H = 340;
const PAD = { top: 24, right: 24, bottom: 56, left: 48 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const X_MIN = 0;
const X_MAX = 10;

const xScale = (x: number) => PAD.left + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;

// Log-normal-ish PDF. Sign of `s` flips skew; s=0 is symmetric (Gaussian).
const buildPdf = (skew: Skew) => {
  // Use a reflected log-normal to get a clean skewed bell.
  const mu = Math.log(5);
  const sigma = 0.55;
  return (x: number) => {
    if (skew === "symmetric") {
      const z = (x - 5) / 1.4;
      return Math.exp(-0.5 * z * z) / (1.4 * Math.sqrt(2 * Math.PI));
    }
    const xv = skew === "positive" ? x : 10 - x;
    if (xv <= 0) return 0;
    return (
      Math.exp(-Math.pow(Math.log(xv) - mu, 2) / (2 * sigma * sigma)) /
      (xv * sigma * Math.sqrt(2 * Math.PI))
    );
  };
};

// Numerically compute mode, mean, median for a given pdf on the grid.
const summarise = (pdf: (x: number) => number) => {
  const steps = 1000;
  const dx = (X_MAX - X_MIN) / steps;
  let total = 0;
  let meanNum = 0;
  let modeX = 0;
  let modeY = -Infinity;
  const cdf: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = X_MIN + i * dx;
    const y = pdf(x);
    if (y > modeY) {
      modeY = y;
      modeX = x;
    }
    total += y * dx;
    meanNum += x * y * dx;
    cdf.push(total);
  }
  const mean = meanNum / total;
  const half = total / 2;
  let medianX = 5;
  for (let i = 0; i < cdf.length; i++) {
    if (cdf[i] >= half) {
      medianX = X_MIN + i * dx;
      break;
    }
  }
  return { mean, median: medianX, mode: modeX, peak: modeY };
};

export const SkewDistributionDiagram = () => {
  const [skew, setSkew] = useState<Skew>("positive");

  const { curve, summary } = useMemo(() => {
    const pdf = buildPdf(skew);
    const summary = summarise(pdf);
    const yScale = (y: number) =>
      PAD.top + PLOT_H - (y / summary.peak) * PLOT_H * 0.92;
    const steps = 240;
    const path = Array.from({ length: steps + 1 }, (_, i) => {
      const x = X_MIN + (i / steps) * (X_MAX - X_MIN);
      return `${i === 0 ? "M" : "L"} ${xScale(x).toFixed(2)} ${yScale(pdf(x)).toFixed(2)}`;
    }).join(" ");
    // Closed shaded curve
    const shade =
      `M ${xScale(X_MIN).toFixed(2)} ${yScale(0).toFixed(2)} ` +
      Array.from({ length: steps + 1 }, (_, i) => {
        const x = X_MIN + (i / steps) * (X_MAX - X_MIN);
        return `L ${xScale(x).toFixed(2)} ${yScale(pdf(x)).toFixed(2)}`;
      }).join(" ") +
      ` L ${xScale(X_MAX).toFixed(2)} ${yScale(0).toFixed(2)} Z`;
    return { curve: { path, shade, yScale }, summary };
  }, [skew]);

  const labels: Record<Skew, { title: string; tail: string; rule: string }> = {
    negative: {
      title: "Negative (left) skew",
      tail: "Long tail to the LEFT (low values).",
      rule: "Mean < Median < Mode",
    },
    symmetric: {
      title: "Symmetric (no skew)",
      tail: "Tails balanced — classical bell curve.",
      rule: "Mean = Median = Mode",
    },
    positive: {
      title: "Positive (right) skew",
      tail: "Long tail to the RIGHT (high values).",
      rule: "Mode < Median < Mean",
    },
  };

  const markers = [
    { x: summary.mode, label: "Mode", color: "hsl(var(--physiology))" },
    { x: summary.median, label: "Median", color: "hsl(var(--clinical))" },
    { x: summary.mean, label: "Mean", color: "hsl(var(--pharmacology))" },
  ];

  return (
    <DiagramFigure
      id="skew-distribution-graph"
      title="Skewed distributions — positive vs negative skew"
      description="Population distributions toggling between negative skew, symmetric and positive skew, with mean, median and mode marked to illustrate how they separate as the tail lengthens."
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {(["negative", "symmetric", "positive"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSkew(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                skew === s
                  ? "bg-physics/10 border-physics text-physics"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {labels[s].title}
            </button>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={`${labels[skew].title} distribution with mean, median and mode marked`}
        >
          {/* Baseline */}
          <line
            x1={PAD.left}
            y1={curve.yScale(0)}
            x2={W - PAD.right}
            y2={curve.yScale(0)}
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
          />

          {/* Shaded distribution */}
          <path d={curve.shade} fill="hsl(var(--physics) / 0.18)" />
          {/* Curve */}
          <path
            d={curve.path}
            fill="none"
            stroke="hsl(var(--physics))"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Markers */}
          {markers.map((m, i) => {
            const x = xScale(m.x);
            // Stagger labels vertically to avoid overlap when values are close.
            const labelY = PAD.top + 14 + i * 18;
            return (
              <g key={m.label}>
                <line
                  x1={x}
                  y1={curve.yScale(0)}
                  x2={x}
                  y2={PAD.top + 6}
                  stroke={m.color}
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <circle cx={x} cy={curve.yScale(0)} r="4" fill={m.color} />
                <rect
                  x={x + 6}
                  y={labelY - 11}
                  width={62}
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
                  {m.label} {m.x.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* x-axis ticks */}
          {[0, 2, 4, 6, 8, 10].map((t) => (
            <g key={t}>
              <line
                x1={xScale(t)}
                y1={curve.yScale(0)}
                x2={xScale(t)}
                y2={curve.yScale(0) + 5}
                stroke="hsl(var(--foreground))"
              />
              <text
                x={xScale(t)}
                y={curve.yScale(0) + 18}
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
            y={H - 22}
            textAnchor="middle"
            fontSize="12"
            className="fill-foreground font-medium"
          >
            Variable value (e.g. length of stay, biomarker concentration)
          </text>
          <text
            x={PAD.left + PLOT_W / 2}
            y={H - 6}
            textAnchor="middle"
            fontSize="10"
            className="fill-muted-foreground"
          >
            Skew is named for the direction of the LONG tail
          </text>
        </svg>

        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-md bg-secondary/40 border border-border">
            <p className="font-semibold text-foreground">{labels[skew].title}</p>
            <p className="text-muted-foreground mt-1">{labels[skew].tail}</p>
            <p className="text-foreground font-mono text-xs mt-2">{labels[skew].rule}</p>
          </div>
          <div className="p-3 rounded-md bg-secondary/40 border border-border">
            <p className="font-semibold text-foreground">Clinical examples</p>
            <ul className="text-muted-foreground mt-1 list-disc list-inside space-y-0.5">
              <li><strong>Positive skew:</strong> ICU length of stay, CRP, serum triglycerides, recovery time</li>
              <li><strong>Negative skew:</strong> Apgar scores at 5 min, gestational age at term, SpO₂ in healthy adults</li>
              <li><strong>Symmetric:</strong> Adult height, MAP in a healthy cohort</li>
            </ul>
          </div>
          <div className="p-3 rounded-md bg-secondary/40 border border-border sm:col-span-2">
            <p className="font-semibold text-foreground">Why it matters for analysis</p>
            <p className="text-muted-foreground mt-1">
              Skewed data violate the normality assumption of parametric tests. Report the <strong>median (IQR)</strong> rather than mean (SD), and use
              non-parametric tests (Mann–Whitney U, Wilcoxon, Kruskal–Wallis) — or transform the data (e.g. log-transform for positively skewed variables) before applying a t-test or ANOVA.
            </p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default SkewDistributionDiagram;
