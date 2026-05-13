import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { DiagramFigure } from "./_shared/DiagramFigure";

// Approximate CSHT (minutes) from published Hughes/Shafer pharmacokinetic
// simulations. Values are interpolated piecewise from infusion-duration
// vs CSHT curves widely reproduced in anaesthetic textbooks (Peck & Hill;
// Miller's Anesthesia). Intended for teaching, not dosing.
type DrugKey = "propofol" | "fentanyl" | "alfentanil" | "remifentanil" | "midazolam" | "sufentanil" | "thiopentone";

interface DrugCurve {
  key: DrugKey;
  name: string;
  color: string;
  // (infusion duration in min) -> CSHT in min, sorted ascending
  points: [number, number][];
  blurb: string;
}

const DRUGS: DrugCurve[] = [
  {
    key: "remifentanil",
    name: "Remifentanil",
    color: "hsl(142 70% 45%)",
    points: [[0, 3], [30, 3], [60, 3.5], [120, 3.5], [240, 4], [480, 4], [600, 4]],
    blurb: "Plasma esterase metabolism — CSHT flat ≈ 3–4 min regardless of infusion length. Truly context-insensitive.",
  },
  {
    key: "alfentanil",
    name: "Alfentanil",
    color: "hsl(200 80% 50%)",
    points: [[0, 10], [30, 25], [60, 35], [120, 50], [240, 60], [480, 65], [600, 65]],
    blurb: "Plateaus around 60–70 min after ~4 h — peripheral compartments saturate. Better than fentanyl for prolonged use.",
  },
  {
    key: "propofol",
    name: "Propofol",
    color: "hsl(45 95% 55%)",
    points: [[0, 2], [30, 7], [60, 12], [120, 18], [240, 25], [480, 35], [600, 40]],
    blurb: "High clearance + redistribution → CSHT rises slowly. Even after 8 h still < 40 min — workhorse of TIVA.",
  },
  {
    key: "midazolam",
    name: "Midazolam",
    color: "hsl(280 65% 60%)",
    points: [[0, 15], [30, 30], [60, 45], [120, 65], [240, 95], [480, 130], [600, 150]],
    blurb: "Steeply context-sensitive. With AKI, accumulation of α-OH-midazolam-glucuronide extends offset further.",
  },
  {
    key: "fentanyl",
    name: "Fentanyl",
    color: "hsl(0 75% 55%)",
    points: [[0, 12], [30, 25], [60, 50], [120, 100], [240, 200], [480, 280], [600, 300]],
    blurb: "Highly lipophilic, large peripheral reservoir → CSHT escalates dramatically. Avoid prolonged infusions.",
  },
  {
    key: "sufentanil",
    name: "Sufentanil",
    color: "hsl(20 80% 50%)",
    points: [[0, 10], [30, 20], [60, 25], [120, 30], [240, 35], [480, 40], [600, 42]],
    blurb: "Despite high lipid solubility, large central V_d means CSHT plateaus ≈ 30–40 min — favourable for cardiac infusions.",
  },
  {
    key: "thiopentone",
    name: "Thiopentone",
    color: "hsl(330 60% 55%)",
    points: [[0, 30], [30, 60], [60, 100], [120, 200], [240, 400], [480, 700], [600, 800]],
    blurb: "Saturable hepatic metabolism (zero-order at high doses) — CSHT explodes. Why thiopentone infusions are obsolete.",
  },
];

const interpolate = (points: [number, number][], x: number): number => {
  if (x <= points[0][0]) return points[0][1];
  if (x >= points[points.length - 1][0]) return points[points.length - 1][1];
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    if (x >= x0 && x <= x1) {
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
  }
  return points[points.length - 1][1];
};

const W = 640;
const H = 320;
const PAD_L = 50;
const PAD_R = 16;
const PAD_T = 20;
const PAD_B = 40;
const X_MAX = 600; // min
const Y_MAX = 320; // min

const xScale = (m: number) => PAD_L + (m / X_MAX) * (W - PAD_L - PAD_R);
const yScale = (m: number) => H - PAD_B - (Math.min(m, Y_MAX) / Y_MAX) * (H - PAD_T - PAD_B);

export const CSHTComparisonDiagram = () => {
  const [duration, setDuration] = useState(120);
  const [active, setActive] = useState<Record<DrugKey, boolean>>({
    propofol: true,
    fentanyl: true,
    alfentanil: true,
    remifentanil: true,
    midazolam: true,
    sufentanil: false,
    thiopentone: false,
  });

  const toggle = (k: DrugKey) => setActive((s) => ({ ...s, [k]: !s[k] }));

  const paths = useMemo(() => {
    return DRUGS.map((d) => {
      const pts: string[] = [];
      for (let m = 0; m <= X_MAX; m += 10) {
        const y = interpolate(d.points, m);
        pts.push(`${xScale(m).toFixed(1)},${yScale(y).toFixed(1)}`);
      }
      return { drug: d, d: `M ${pts.join(" L ")}` };
    });
  }, []);

  const visible = DRUGS.filter((d) => active[d.key]);

  // Sorted current values at the chosen duration (longest first)
  const current = visible
    .map((d) => ({ d, v: interpolate(d.points, duration) }))
    .sort((a, b) => b.v - a.v);

  return (
    <Card className="p-4 sm:p-6 my-6 bg-card border-border">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        Context-Sensitive Half-Time — IV Agent Comparison
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        CSHT = time for plasma concentration to fall by 50% after stopping an infusion of given duration.
        Drag the infusion-duration slider to see divergence.
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {DRUGS.map((d) => (
          <button
            key={d.key}
            onClick={() => toggle(d.key)}
            className={`px-2 py-1 text-[11px] rounded-md border transition-all ${
              active[d.key]
                ? "border-foreground/30 bg-secondary/40 text-foreground"
                : "border-border bg-transparent text-muted-foreground opacity-60"
            }`}
          >
            <span
              className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
              style={{ backgroundColor: d.color, opacity: active[d.key] ? 1 : 0.4 }}
            />
            {d.name}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-secondary/10 p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {/* gridlines */}
          {[0, 60, 120, 180, 240, 300].map((y) => (
            <g key={`gy-${y}`}>
              <line
                x1={PAD_L} x2={W - PAD_R}
                y1={yScale(y)} y2={yScale(y)}
                stroke="hsl(var(--border))" strokeDasharray="2 3" opacity="0.5"
              />
              <text x={PAD_L - 6} y={yScale(y) + 3} textAnchor="end" fontSize="9" className="fill-muted-foreground">
                {y}
              </text>
            </g>
          ))}
          {[0, 60, 120, 240, 360, 480, 600].map((x) => (
            <g key={`gx-${x}`}>
              <line
                x1={xScale(x)} x2={xScale(x)}
                y1={PAD_T} y2={H - PAD_B}
                stroke="hsl(var(--border))" strokeDasharray="2 3" opacity="0.4"
              />
              <text x={xScale(x)} y={H - PAD_B + 14} textAnchor="middle" fontSize="9" className="fill-muted-foreground">
                {x === 0 ? "0" : x < 60 ? `${x}m` : `${x / 60}h`}
              </text>
            </g>
          ))}

          {/* axes */}
          <line x1={PAD_L} y1={H - PAD_B} x2={W - PAD_R} y2={H - PAD_B} stroke="hsl(var(--foreground))" strokeWidth="1" />
          <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={H - PAD_B} stroke="hsl(var(--foreground))" strokeWidth="1" />

          {/* axis labels */}
          <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="10" fontWeight="600" className="fill-foreground">
            Infusion duration
          </text>
          <text
            x={-H / 2} y={14}
            transform="rotate(-90)"
            textAnchor="middle" fontSize="10" fontWeight="600"
            className="fill-foreground"
          >
            CSHT (min)
          </text>

          {/* curves */}
          {paths.map(({ drug, d }) => (
            <path
              key={drug.key}
              d={d}
              fill="none"
              stroke={drug.color}
              strokeWidth={active[drug.key] ? 2.4 : 1}
              opacity={active[drug.key] ? 1 : 0.15}
              strokeLinecap="round"
            />
          ))}

          {/* current duration vertical marker */}
          <line
            x1={xScale(duration)} x2={xScale(duration)}
            y1={PAD_T} y2={H - PAD_B}
            stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4 3"
          />
          <text
            x={xScale(duration)} y={PAD_T - 6}
            textAnchor="middle" fontSize="10" fontWeight="700"
            className="fill-foreground"
          >
            {duration < 60 ? `${duration} min` : `${(duration / 60).toFixed(1)} h`}
          </text>

          {/* dots at intersection */}
          {visible.map((d) => {
            const y = interpolate(d.points, duration);
            return (
    <DiagramFigure
      id="csht-comparison-diagram"
      title="CSHT comparison"
      description="Auto-generated wrapper for the CSHT comparison anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                    <g key={`dot-${d.key}`}>
                  <circle cx={xScale(duration)} cy={yScale(y)} r="4.5" fill={d.color} stroke="hsl(var(--background))" strokeWidth="1.5">
                    <animate attributeName="r" values="3.5;5.5;3.5" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                </g>
    </DiagramFigure>
  );
          })}
        </svg>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-xs font-semibold text-foreground">Infusion duration</p>
          <p className="text-xs font-mono text-muted-foreground">
            {duration < 60 ? `${duration} min` : `${(duration / 60).toFixed(1)} h`}
          </p>
        </div>
        <Slider
          value={[duration]}
          onValueChange={(v) => setDuration(v[0])}
          min={0}
          max={600}
          step={10}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>0</span><span>1 h</span><span>2 h</span><span>4 h</span><span>6 h</span><span>10 h</span>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-border bg-secondary/20 p-3">
        <p className="text-xs font-semibold text-foreground mb-2">
          CSHT at this infusion duration (longest first)
        </p>
        <div className="space-y-1.5">
          {current.map(({ d, v }) => (
            <div key={d.key} className="flex items-center gap-2">
              <span className="w-24 text-xs text-foreground">{d.name}</span>
              <div className="flex-1 h-3 rounded-sm bg-muted/40 overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${Math.min(100, (v / 300) * 100)}%`,
                    backgroundColor: d.color,
                  }}
                />
              </div>
              <span className="w-16 text-right text-xs font-mono font-semibold text-foreground">
                {v.toFixed(0)} min
              </span>
            </div>
          ))}
          {current.length === 0 && (
            <p className="text-xs text-muted-foreground italic">Select at least one drug above.</p>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-2 mt-3">
        {visible.map((d) => (
          <div
            key={d.key}
            className="rounded-md p-2.5 border-l-2 bg-secondary/20 border-border"
            style={{ borderLeftColor: d.color }}
          >
            <div className="flex items-center justify-between mb-0.5">
              <p className="text-xs font-semibold text-foreground">{d.name}</p>
              <Badge variant="outline" className="text-[9px]">
                {interpolate(d.points, 480).toFixed(0)} min @ 8 h
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground leading-snug">{d.blurb}</p>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground italic mt-3">
        Curves approximated from Hughes, Glass &amp; Jacobs (1992) and standard PK simulations
        (Peck &amp; Hill, Miller's Anesthesia). For teaching only.
      </p>
    </Card>
  );
};

export default CSHTComparisonDiagram;
