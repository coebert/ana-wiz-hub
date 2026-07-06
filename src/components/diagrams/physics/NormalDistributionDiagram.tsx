import { useState, useMemo } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Mode = "sd" | "ci";

const W = 600;
const H = 340;
const PAD = { top: 24, right: 24, bottom: 48, left: 48 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;

const X_MIN = -4;
const X_MAX = 4;

const xScale = (x: number) => PAD.left + ((x - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
const pdf = (x: number) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
const PDF_MAX = pdf(0);
const yScale = (y: number) => PAD.top + PLOT_H - (y / PDF_MAX) * PLOT_H * 0.92;

export const NormalDistributionDiagram = () => {
  const [mode, setMode] = useState<Mode>("sd");
  const [ciLevel, setCiLevel] = useState<90 | 95 | 99>(95);

  const z = ciLevel === 90 ? 1.645 : ciLevel === 95 ? 1.96 : 2.576;

  const curve = useMemo(() => {
    const steps = 240;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const x = X_MIN + (i / steps) * (X_MAX - X_MIN);
      return `${i === 0 ? "M" : "L"} ${xScale(x).toFixed(2)} ${yScale(pdf(x)).toFixed(2)}`;
    }).join(" ");
  }, []);

  const buildShade = (lo: number, hi: number) => {
    const steps = 80;
    const pts: string[] = [`M ${xScale(lo).toFixed(2)} ${yScale(0).toFixed(2)}`];
    for (let i = 0; i <= steps; i++) {
      const x = lo + (i / steps) * (hi - lo);
      pts.push(`L ${xScale(x).toFixed(2)} ${yScale(pdf(x)).toFixed(2)}`);
    }
    pts.push(`L ${xScale(hi).toFixed(2)} ${yScale(0).toFixed(2)} Z`);
    return pts.join(" ");
  };

  const sdBands = [
    { lo: -1, hi: 1, label: "68%", fill: "hsl(var(--physics) / 0.45)" },
    { lo: -2, hi: -1, label: "", fill: "hsl(var(--physics) / 0.25)" },
    { lo: 1, hi: 2, label: "", fill: "hsl(var(--physics) / 0.25)" },
    { lo: -3, hi: -2, label: "", fill: "hsl(var(--physics) / 0.12)" },
    { lo: 2, hi: 3, label: "", fill: "hsl(var(--physics) / 0.12)" },
  ];

  return (
    <DiagramFigure
      id="normal-distribution-graph"
      title="Normal (Gaussian) distribution and confidence intervals"
      description="Bell-shaped probability density with the 68–95–99.7 rule, and shaded central area showing 90%, 95% and 99% confidence intervals around the mean."
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <button
            onClick={() => setMode("sd")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              mode === "sd"
                ? "bg-physics/10 border-physics text-physics"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            68–95–99.7 rule
          </button>
          <button
            onClick={() => setMode("ci")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              mode === "ci"
                ? "bg-physics/10 border-physics text-physics"
                : "border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            Confidence intervals
          </button>
        </div>

        {mode === "ci" && (
          <div className="flex gap-2 justify-center mb-3">
            {([90, 95, 99] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setCiLevel(lvl)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                  ciLevel === lvl
                    ? "bg-physics text-physics-foreground border-physics"
                    : "border-border text-muted-foreground hover:bg-muted"
                }`}
              >
                {lvl}% CI
              </button>
            ))}
          </div>
        )}

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label={
            mode === "sd"
              ? "Normal distribution with 68 95 99.7 percent bands"
              : `Normal distribution with ${ciLevel} percent confidence interval shaded`
          }
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

          {/* Shaded regions */}
          {mode === "sd" &&
            sdBands.map((b, i) => (
              <path key={i} d={buildShade(b.lo, b.hi)} fill={b.fill} />
            ))}
          {mode === "ci" && (
            <>
              <path d={buildShade(-4, -z)} fill="hsl(var(--muted-foreground) / 0.18)" />
              <path d={buildShade(z, 4)} fill="hsl(var(--muted-foreground) / 0.18)" />
              <path d={buildShade(-z, z)} fill="hsl(var(--physics) / 0.35)" />
            </>
          )}

          {/* Curve */}
          <path
            d={curve}
            fill="none"
            stroke="hsl(var(--physics))"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Mean line */}
          <line
            x1={xScale(0)}
            y1={yScale(0)}
            x2={xScale(0)}
            y2={yScale(PDF_MAX)}
            stroke="hsl(var(--foreground))"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
          <text
            x={xScale(0)}
            y={PAD.top - 8}
            textAnchor="middle"
            fontSize="11"
            className="fill-foreground font-semibold"
          >
            μ (mean)
          </text>

          {/* x-axis ticks at SDs */}
          {[-3, -2, -1, 0, 1, 2, 3].map((sd) => (
            <g key={sd}>
              <line
                x1={xScale(sd)}
                y1={yScale(0)}
                x2={xScale(sd)}
                y2={yScale(0) + 5}
                stroke="hsl(var(--foreground))"
              />
              <text
                x={xScale(sd)}
                y={yScale(0) + 18}
                textAnchor="middle"
                fontSize="10"
                className="fill-muted-foreground"
              >
                {sd === 0 ? "μ" : `${sd > 0 ? "+" : ""}${sd}σ`}
              </text>
            </g>
          ))}

          {/* SD labels */}
          {mode === "sd" && (
            <>
              <text x={xScale(0)} y={yScale(PDF_MAX) + 60} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">
                68.3%
              </text>
              <text x={xScale(0)} y={yScale(PDF_MAX) + 78} textAnchor="middle" fontSize="10" className="fill-muted-foreground">
                ±1σ
              </text>
              <text x={xScale(-1.5)} y={yScale(pdf(1.5)) - 8} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">
                95.4% (±2σ)
              </text>
              <text x={xScale(2.5)} y={yScale(pdf(2.5)) - 8} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">
                99.7% (±3σ)
              </text>
            </>
          )}

          {/* CI markers */}
          {mode === "ci" && (
            <>
              {[-z, z].map((zVal) => (
                <g key={zVal}>
                  <line
                    x1={xScale(zVal)}
                    y1={yScale(0)}
                    x2={xScale(zVal)}
                    y2={yScale(pdf(zVal))}
                    stroke="hsl(var(--physics))"
                    strokeWidth="1.5"
                  />
                  <text
                    x={xScale(zVal)}
                    y={yScale(pdf(zVal)) - 8}
                    textAnchor="middle"
                    fontSize="11"
                    className="fill-foreground font-semibold"
                  >
                    {zVal > 0 ? "+" : ""}
                    {zVal.toFixed(zVal === 1.645 || zVal === -1.645 ? 3 : 2)}σ
                  </text>
                </g>
              ))}
              <text
                x={xScale(0)}
                y={yScale(PDF_MAX) + 60}
                textAnchor="middle"
                fontSize="14"
                className="fill-foreground font-bold"
              >
                {ciLevel}% of values
              </text>
              <text
                x={xScale(0)}
                y={yScale(PDF_MAX) + 78}
                textAnchor="middle"
                fontSize="10"
                className="fill-muted-foreground"
              >
                lie within ±{z.toFixed(z === 1.645 ? 3 : 2)} SE of the mean
              </text>
              <text
                x={xScale(-3.4)}
                y={yScale(0) - 6}
                fontSize="10"
                className="fill-muted-foreground"
              >
                {((100 - ciLevel) / 2).toFixed(1)}% tail
              </text>
              <text
                x={xScale(3.4)}
                y={yScale(0) - 6}
                textAnchor="end"
                fontSize="10"
                className="fill-muted-foreground"
              >
                {((100 - ciLevel) / 2).toFixed(1)}% tail
              </text>
            </>
          )}

          {/* Axis labels */}
          <text
            x={PAD.left + PLOT_W / 2}
            y={H - 6}
            textAnchor="middle"
            fontSize="12"
            className="fill-foreground font-medium"
          >
            Standard deviations from the mean
          </text>
        </svg>

        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          {mode === "sd" ? (
            <>
              <div className="p-3 rounded-md bg-secondary/40 border border-border">
                <p className="font-semibold text-foreground">Empirical (68–95–99.7) rule</p>
                <p className="text-muted-foreground mt-1">
                  ±1σ contains ~68%, ±2σ ~95%, ±3σ ~99.7% of observations in any normally distributed variable.
                </p>
              </div>
              <div className="p-3 rounded-md bg-secondary/40 border border-border">
                <p className="font-semibold text-foreground">Why it matters clinically</p>
                <p className="text-muted-foreground mt-1">
                  Underpins reference ranges (mean ± 2 SD), quality-control limits, and the assumptions of parametric tests (t-test, ANOVA, Pearson correlation).
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-md bg-secondary/40 border border-border">
                <p className="font-semibold text-foreground">Confidence interval</p>
                <p className="text-muted-foreground mt-1">
                  A {ciLevel}% CI is the range in which the true population mean lies if the experiment were repeated many times — calculated as
                  <span className="font-mono"> mean ± {z.toFixed(z === 1.645 ? 3 : 2)} × SE</span>.
                </p>
              </div>
              <div className="p-3 rounded-md bg-secondary/40 border border-border">
                <p className="font-semibold text-foreground">Reading a CI</p>
                <p className="text-muted-foreground mt-1">
                  If a 95% CI for a difference crosses 0 (or a ratio crosses 1), the result is not statistically significant at p &lt; 0.05. Narrower CIs imply greater precision.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </DiagramFigure>
  );
};

export default NormalDistributionDiagram;
