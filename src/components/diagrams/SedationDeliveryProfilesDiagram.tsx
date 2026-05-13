import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Animated comparison of three IV sedation delivery profiles:
 *   1. Intermittent boluses — sawtooth peaks/troughs
 *   2. Manual fixed-rate infusion — slow exponential approach to steady state
 *   3. Target-controlled infusion (TCI) — overshoot bolus then variable-rate maintenance
 *
 * Each panel plots a normalised plasma concentration (Cp) trace against time
 * and overlays the therapeutic window. A scrubbing time-cursor sweeps across
 * all three panels in sync so the reader can directly compare what the patient
 * "sees" at any given moment.
 *
 * Pure CSS/SVG animation — no external animation libraries.
 */

const DURATION_S = 12; // total animation duration
const PLOT_W = 320;
const PLOT_H = 110;
const PAD_L = 28;
const PAD_R = 8;
const PAD_T = 10;
const PAD_B = 22;
const INNER_W = PLOT_W - PAD_L - PAD_R;
const INNER_H = PLOT_H - PAD_T - PAD_B;

// Therapeutic window (normalised 0–1)
const WINDOW_LOW = 0.45;
const WINDOW_HIGH = 0.75;

// Sample concentration curves over t in [0, 1]
const N_SAMPLES = 240;

const sampleAt = (
  fn: (t: number) => number,
  n = N_SAMPLES,
): { x: number; y: number }[] => {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const c = Math.max(0, Math.min(1, fn(t)));
    pts.push({
      x: PAD_L + t * INNER_W,
      y: PAD_T + (1 - c) * INNER_H,
    });
  }
  return pts;
};

const toPath = (pts: { x: number; y: number }[]) =>
  pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

// --- Concentration models (all normalised to 0–1) ---

// Bolus: 4 boluses, each rises sharply then decays exponentially
const bolusCurve = (t: number) => {
  const boluses = [0.0, 0.25, 0.5, 0.75];
  const peak = 0.95;
  let c = 0;
  for (const b of boluses) {
    if (t >= b) {
      const dt = (t - b) * 28; // decay rate
      c += peak * Math.exp(-dt) * (1 - Math.exp(-dt * 6));
    }
  }
  return c;
};

// Manual infusion: exponential approach to steady state at ~0.6
const infusionCurve = (t: number) => {
  const ss = 0.6;
  const tau = 0.32; // time constant
  return ss * (1 - Math.exp(-t / tau));
};

// TCI: rapid bolus to target (~0.6), then variable-rate maintenance ≈ flat
const tciCurve = (t: number) => {
  const target = 0.6;
  if (t < 0.06) {
    return target * (t / 0.06); // fast linear rise (overshoot bolus)
  }
  if (t < 0.1) {
    // small overshoot then settle
    return target + 0.06 * Math.sin(((t - 0.06) / 0.04) * Math.PI);
  }
  // tiny ripple to show variable rate maintaining target
  return target + 0.012 * Math.sin(t * 28);
};

interface Callout {
  /** Trigger time on the normalised x-axis (0..1) */
  at: number;
  /** Short label rendered on the plot */
  label: string;
  /** Optional offsets (in plot pixels) from the curve point */
  dx?: number;
  dy?: number;
  /** How long the callout stays visible after `at` (0..1). Default 0.18 */
  hold?: number;
}

interface PanelProps {
  title: string;
  subtitle: string;
  curve: (t: number) => number;
  progress: number; // 0..1
  /** Tailwind hue token (without `hsl(var(--…))`) */
  colorVar: string;
  /** Vertical event markers along x in [0,1] (e.g. bolus times) */
  markers?: number[];
  /** Optional anchor id of an in-page section to scroll to on click */
  targetId?: string;
  /** Accessible label for the scroll link, e.g. "Read more about boluses" */
  linkLabel?: string;
  /** Timed text labels that fade in/out at specific moments */
  callouts?: Callout[];
}

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Brief highlight so the user notices where they landed
  el.classList.add("ring-2", "ring-primary", "ring-offset-2", "ring-offset-background");
  window.setTimeout(() => {
    el.classList.remove("ring-2", "ring-primary", "ring-offset-2", "ring-offset-background");
  }, 1600);
};

const Panel = ({
  title,
  subtitle,
  curve,
  progress,
  colorVar,
  markers,
  targetId,
  linkLabel,
  callouts,
}: PanelProps) => {
  const fullPath = toPath(sampleAt(curve));
  const visiblePath = toPath(sampleAt(curve, Math.max(2, Math.round(N_SAMPLES * progress))));
  const cursorX = PAD_L + progress * INNER_W;
  const cursorC = curve(progress);
  const cursorY = PAD_T + (1 - Math.max(0, Math.min(1, cursorC))) * INNER_H;

  const isLinked = Boolean(targetId);
  const Wrapper = (isLinked ? "button" : "div") as React.ElementType;
  const wrapperProps: Record<string, unknown> = isLinked
    ? {
        type: "button",
        onClick: () => targetId && scrollToId(targetId),
        "aria-label": linkLabel ?? `Jump to ${title} explanation`,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "rounded-lg border border-border bg-card p-3 text-left w-full block",
        isLinked &&
          "transition-all hover:border-primary hover:shadow-sm hover:bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer",
      )}
    >
      <div className="flex items-baseline justify-between mb-1 gap-2">
        <p className="font-semibold text-foreground text-sm">{title}</p>
        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
      <svg
        viewBox={`0 0 ${PLOT_W} ${PLOT_H}`}
        className="w-full h-auto"
        role="img"
        aria-label={`${title} concentration vs time`}
      >
        {/* Therapeutic window band */}
        <rect
          x={PAD_L}
          y={PAD_T + (1 - WINDOW_HIGH) * INNER_H}
          width={INNER_W}
          height={(WINDOW_HIGH - WINDOW_LOW) * INNER_H}
          fill="hsl(var(--primary) / 0.08)"
        />
        <line
          x1={PAD_L}
          x2={PAD_L + INNER_W}
          y1={PAD_T + (1 - WINDOW_HIGH) * INNER_H}
          y2={PAD_T + (1 - WINDOW_HIGH) * INNER_H}
          stroke="hsl(var(--primary) / 0.35)"
          strokeDasharray="3 3"
          strokeWidth={0.75}
        />
        <line
          x1={PAD_L}
          x2={PAD_L + INNER_W}
          y1={PAD_T + (1 - WINDOW_LOW) * INNER_H}
          y2={PAD_T + (1 - WINDOW_LOW) * INNER_H}
          stroke="hsl(var(--primary) / 0.35)"
          strokeDasharray="3 3"
          strokeWidth={0.75}
        />

        {/* Axes */}
        <line
          x1={PAD_L}
          x2={PAD_L}
          y1={PAD_T}
          y2={PAD_T + INNER_H}
          stroke="hsl(var(--border))"
          strokeWidth={1}
        />
        <line
          x1={PAD_L}
          x2={PAD_L + INNER_W}
          y1={PAD_T + INNER_H}
          y2={PAD_T + INNER_H}
          stroke="hsl(var(--border))"
          strokeWidth={1}
        />

        {/* Axis labels */}
        <text
          x={4}
          y={PAD_T + INNER_H / 2}
          fontSize="9"
          fill="hsl(var(--muted-foreground))"
          transform={`rotate(-90 4 ${PAD_T + INNER_H / 2})`}
          textAnchor="middle"
        >
          Cp
        </text>
        <text
          x={PAD_L + INNER_W / 2}
          y={PLOT_H - 4}
          fontSize="9"
          fill="hsl(var(--muted-foreground))"
          textAnchor="middle"
        >
          time →
        </text>
        <text
          x={PAD_L + INNER_W - 2}
          y={PAD_T + (1 - (WINDOW_LOW + WINDOW_HIGH) / 2) * INNER_H + 3}
          fontSize="8"
          fill="hsl(var(--primary))"
          textAnchor="end"
          opacity={0.7}
        >
          target
        </text>

        {/* Event markers (e.g. bolus pushes) */}
        {markers?.map((m, i) => (
          <g key={i}>
            <line
              x1={PAD_L + m * INNER_W}
              x2={PAD_L + m * INNER_W}
              y1={PAD_T + INNER_H}
              y2={PAD_T + INNER_H + 4}
              stroke={`hsl(var(${colorVar}))`}
              strokeWidth={1}
            />
          </g>
        ))}

        {/* Faint full curve as ghost */}
        <path
          d={fullPath}
          fill="none"
          stroke={`hsl(var(${colorVar}) / 0.18)`}
          strokeWidth={1.5}
        />

        {/* Animated visible curve */}
        <path
          d={visiblePath}
          fill="none"
          stroke={`hsl(var(${colorVar}))`}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Cursor */}
        <line
          x1={cursorX}
          x2={cursorX}
          y1={PAD_T}
          y2={PAD_T + INNER_H}
          stroke="hsl(var(--foreground) / 0.25)"
          strokeWidth={0.75}
        />
        <circle
          cx={cursorX}
          cy={cursorY}
          r={3.5}
          fill={`hsl(var(${colorVar}))`}
          stroke="hsl(var(--background))"
          strokeWidth={1.5}
        />

        {/* Timed callouts — fade in/out as the cursor passes their trigger time */}
        {callouts?.map((co, i) => {
          const hold = co.hold ?? 0.18;
          const fade = 0.04;
          const dt = progress - co.at;
          let opacity = 0;
          if (dt >= -fade && dt <= hold + fade) {
            if (dt < 0) opacity = (dt + fade) / fade; // fade-in
            else if (dt > hold) opacity = 1 - (dt - hold) / fade; // fade-out
            else opacity = 1;
            opacity = Math.max(0, Math.min(1, opacity));
          }
          if (opacity <= 0.01) return null;

          const px = PAD_L + co.at * INNER_W;
          const py =
            PAD_T + (1 - Math.max(0, Math.min(1, curve(co.at)))) * INNER_H;
          const dx = co.dx ?? 6;
          const dy = co.dy ?? -10;
          const tx = Math.min(PLOT_W - PAD_R - 4, Math.max(PAD_L + 2, px + dx));
          const ty = Math.min(PAD_T + INNER_H - 2, Math.max(PAD_T + 8, py + dy));
          const anchor: "start" | "end" =
            tx > PAD_L + INNER_W - 60 ? "end" : "start";
          // Approximate text width for backing rect (8px wide chars at 9px font)
          const charW = 4.4;
          const textW = co.label.length * charW + 6;
          const rectX = anchor === "end" ? tx - textW : tx - 3;

          return (
            <g key={`${i}-${co.label}`} opacity={opacity} style={{ transition: "opacity 80ms linear" }}>
              <line
                x1={px}
                y1={py}
                x2={tx}
                y2={ty + 1}
                stroke={`hsl(var(${colorVar}))`}
                strokeWidth={0.75}
                strokeDasharray="2 2"
              />
              <rect
                x={rectX}
                y={ty - 8}
                width={textW}
                height={11}
                rx={2}
                fill="hsl(var(--background))"
                stroke={`hsl(var(${colorVar}) / 0.55)`}
                strokeWidth={0.5}
              />
              <text
                x={tx}
                y={ty}
                fontSize="8.5"
                fill={`hsl(var(${colorVar}))`}
                textAnchor={anchor}
                fontWeight={600}
              >
                {co.label}
              </text>
            </g>
          );
        })}
      </svg>
      {isLinked && (
        <p className="text-[11px] text-primary mt-1.5 font-medium">
          {linkLabel ?? "Read more →"}
        </p>
      )}
    </Wrapper>
  );
};

export const SedationDeliveryProfilesDiagram = () => {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const baseProgressRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    startRef.current = null;
    const step = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      const p = baseProgressRef.current + elapsed / DURATION_S;
      if (p >= 1) {
        setProgress(1);
        setPlaying(false);
        baseProgressRef.current = 1;
        return;
      }
      setProgress(p);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      baseProgressRef.current = progress;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  const handleReset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    baseProgressRef.current = 0;
    setProgress(0);
    setPlaying(true);
  };

  const handleToggle = () => {
    if (progress >= 1) {
      handleReset();
      return;
    }
    setPlaying((p) => !p);
  };

  return (
    <DiagramFigure
      id="sedation-delivery-profiles-diagram"
      title="Sedation delivery profiles"
      description="Auto-generated wrapper for the Sedation delivery profiles anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <figure className="my-6 rounded-xl border border-border bg-secondary/20 p-4">
        <figcaption className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="font-serif font-bold text-foreground text-base">
              IV sedation delivery profiles
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Plasma concentration (Cp) vs time. Shaded band = therapeutic sedation window.
            </p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleToggle}
              aria-label={playing ? "Pause animation" : "Play animation"}
              className="h-8 px-2"
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleReset}
              aria-label="Restart animation"
              className="h-8 px-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </figcaption>
  
        <div className="grid gap-3 md:grid-cols-3">
          <Panel
            title="Intermittent boluses"
            subtitle="peak–trough sawtooth"
            curve={bolusCurve}
            progress={progress}
            colorVar="--destructive"
            markers={[0.0, 0.25, 0.5, 0.75]}
            targetId="technique-bolus"
            linkLabel="Read about boluses →"
            callouts={[
              { at: 0.04, label: "1st bolus", dy: -14 },
              { at: 0.18, label: "trough — patient moves", dy: 16 },
              { at: 0.54, label: "peak — apnoea risk", dy: -14 },
              { at: 0.92, label: "sawtooth pattern", dy: 14 },
            ]}
          />
          <Panel
            title="Manual infusion"
            subtitle="slow approach to steady state"
            curve={infusionCurve}
            progress={progress}
            colorVar="--accent-foreground"
            targetId="technique-infusion"
            linkLabel="Read about manual infusion →"
            callouts={[
              { at: 0.05, label: "infusion starts", dy: 14 },
              { at: 0.32, label: "1τ ≈ 63% of target", dy: -14 },
              { at: 0.7, label: "approaching steady state", dy: -14 },
              { at: 0.95, label: "≈ 4–5τ to plateau", dy: 12 },
            ]}
          />
          <Panel
            title="TCI (Cp/Ce target)"
            subtitle="bolus + variable maintenance"
            curve={tciCurve}
            progress={progress}
            colorVar="--primary"
            targetId="technique-tci"
            linkLabel="Read about TCI →"
            callouts={[
              { at: 0.04, label: "loading bolus", dy: 14 },
              { at: 0.1, label: "brief overshoot", dy: -14 },
              { at: 0.4, label: "rate adjusts to hold target", dy: -14 },
              { at: 0.85, label: "stable Ce — easy titration", dy: 14 },
            ]}
          />
        </div>
  
        <ul className="mt-4 grid gap-2 md:grid-cols-3 text-xs text-muted-foreground leading-relaxed">
          <li>
            <span className={cn("inline-block w-2 h-2 rounded-full mr-1.5 align-middle bg-destructive")} />
            Boluses overshoot then fall below target → apnoea, then patient movement.
          </li>
          <li>
            <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle bg-muted-foreground" />
            Fixed-rate infusion is smoother but takes ~4–5 time constants to reach target.
          </li>
          <li>
            <span className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle bg-primary" />
            TCI uses a PK model to give an initial bolus then continually adjusts the rate to hold Cp/Ce on target.
          </li>
        </ul>
      </figure>
    </DiagramFigure>
  );
};

export default SedationDeliveryProfilesDiagram;
