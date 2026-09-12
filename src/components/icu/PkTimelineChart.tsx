import { useId } from "react";
import { Activity } from "lucide-react";
import type { DrugPharmacokinetics } from "@/data/pk/types";
import {
  HALF_LIFE_MILESTONES,
  buildPkTimeline,
  formatDuration,
  fractionRemaining,
} from "@/lib/pkTimeline";

interface PkTimelineChartProps {
  drug: string;
  pk: DrugPharmacokinetics | undefined;
  /** Body weight used to convert weight-based kinetics into absolute values. */
  weightKg?: number;
}

const W = 320;
const H = 132;
const PAD_L = 30;
const PAD_R = 6;
const PAD_T = 8;
const PAD_B = 22;

const curvePath = (halfLife: number, spanHours: number) => {
  const pts: string[] = [];
  const steps = 60;
  for (let i = 0; i <= steps; i += 1) {
    const t = (spanHours * i) / steps;
    const x = PAD_L + ((W - PAD_L - PAD_R) * i) / steps;
    const y = PAD_T + (H - PAD_T - PAD_B) * (1 - fractionRemaining(t, halfLife));
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
};

/**
 * Elimination curve (percentage of drug remaining over five half-lives), the
 * half-life milestone timeline, and derived clearance / volume of distribution.
 */
export function PkTimelineChart({ drug, pk, weightKg = 70 }: PkTimelineChartProps) {
  const uid = useId();
  const model = buildPkTimeline(pk);
  if (!model) return null;

  const { halfLifeHours: t12, vdLPerKg, clearanceMlPerKgMin } = model;
  const span = t12.mid * 5;
  const plotH = H - PAD_T - PAD_B;
  const gridY = [0, 0.25, 0.5, 0.75, 1];

  const vdLitres = vdLPerKg
    ? `${(vdLPerKg.low * weightKg).toFixed(0)}–${(vdLPerKg.high * weightKg).toFixed(0)} L`
    : undefined;
  const clearanceLPerH = clearanceMlPerKgMin
    ? `${((clearanceMlPerKgMin.low * weightKg * 60) / 1000).toFixed(1)}–${(
        (clearanceMlPerKgMin.high * weightKg * 60) /
        1000
      ).toFixed(1)} L/h`
    : undefined;

  return (
    <div className="mt-3 rounded-lg border border-icu/25 bg-background/60 p-3">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        <Activity className="h-4 w-4 text-icu" aria-hidden /> Kinetic timeline — elimination of{" "}
        {drug}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Single-dose, first-order model using an elimination half-life of{" "}
        {formatDuration(t12.low)}–{formatDuration(t12.high)} (curve drawn at{" "}
        {formatDuration(t12.mid)}). Context-sensitive half-time after prolonged infusion is longer.
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-2 w-full"
        role="img"
        aria-label={`Elimination curve for ${drug}: drug remaining falls to 50 percent after ${formatDuration(
          t12.mid,
        )} and to about 3 percent after five half-lives (${formatDuration(span)}).`}
      >
        {gridY.map((g) => {
          const y = PAD_T + plotH * g;
          return (
            <g key={g}>
              <line
                x1={PAD_L}
                x2={W - PAD_R}
                y1={y}
                y2={y}
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />
              <text x={0} y={y + 3} className="fill-muted-foreground" style={{ fontSize: 8 }}>
                {Math.round((1 - g) * 100)}%
              </text>
            </g>
          );
        })}
        {HALF_LIFE_MILESTONES.map(({ halfLives, remaining }) => {
          const x = PAD_L + ((W - PAD_L - PAD_R) * halfLives) / 5;
          const y = PAD_T + plotH * (1 - remaining);
          return (
            <g key={halfLives}>
              <line
                x1={x}
                x2={x}
                y1={PAD_T}
                y2={PAD_T + plotH}
                stroke="hsl(var(--border))"
                strokeDasharray="2 3"
                strokeWidth="1"
              />
              <circle cx={x} cy={y} r="2.6" fill="hsl(var(--icu))" />
              <text
                x={x}
                y={H - 12}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: 8 }}
              >
                {halfLives} t½
              </text>
              <text
                x={x}
                y={H - 3}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: 7.5 }}
              >
                {formatDuration(t12.mid * halfLives)}
              </text>
            </g>
          );
        })}
        <path
          id={`${uid}-fast`}
          d={curvePath(t12.low, span)}
          fill="none"
          stroke="hsl(var(--icu))"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path
          d={curvePath(t12.high, span)}
          fill="none"
          stroke="hsl(var(--icu))"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <path d={curvePath(t12.mid, span)} fill="none" stroke="hsl(var(--icu))" strokeWidth="2" />
      </svg>

      <ul className="mt-1 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
        {HALF_LIFE_MILESTONES.map(({ halfLives, remaining }) => (
          <li key={halfLives}>
            <span className="font-medium text-foreground">
              {halfLives} t½ ({formatDuration(t12.mid * halfLives)}):
            </span>{" "}
            {(remaining * 100).toFixed(remaining < 0.1 ? 1 : 0)}% remaining
            {halfLives === 4 ? " — near-complete offset in health" : ""}
          </li>
        ))}
      </ul>

      <dl className="mt-2 grid grid-cols-1 gap-2 border-t border-border pt-2 text-xs sm:grid-cols-3">
        <div>
          <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Half-life</dt>
          <dd className="text-foreground">
            {formatDuration(t12.low)}–{formatDuration(t12.high)}
          </dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wide text-muted-foreground">
            Volume of distribution
          </dt>
          <dd className="text-foreground">
            {vdLPerKg
              ? `${vdLPerKg.low}–${vdLPerKg.high} L/kg (${vdLitres} at ${weightKg} kg)`
              : "Not quoted per kg — see kinetics text"}
          </dd>
        </div>
        <div>
          <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Clearance</dt>
          <dd className="text-foreground">
            {clearanceMlPerKgMin
              ? `${clearanceMlPerKgMin.low}–${clearanceMlPerKgMin.high} mL/kg/min (${clearanceLPerH} at ${weightKg} kg)`
              : "Not quoted per kg — see kinetics text"}
          </dd>
        </div>
      </dl>
      <p className="mt-1.5 text-[11px] text-muted-foreground">
        Curve is a teaching approximation from published adult ranges; organ failure, obesity,
        active metabolites and long infusions shift it. Titrate to the patient, not the graph.
      </p>
    </div>
  );
}

export default PkTimelineChart;
