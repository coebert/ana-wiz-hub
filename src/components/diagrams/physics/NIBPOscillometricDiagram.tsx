import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Animated oscillometric NIBP diagram.
 *
 * Cycle (≈14 s):
 *   1. Inflate cuff above SBP (occlude artery)
 *   2. Stepwise deflation
 *   3. Oscillations appear once cuff < SBP, peak at MAP, fade below DBP
 *   4. Algorithm marks SBP / MAP / DBP on the trace
 */

const SBP = 120;
const MAP_VAL = 93;
const DBP = 80;
const PEAK = 160; // inflation target
const HR = 75; // bpm
const DURATION = 14000; // ms total cycle

// Gaussian envelope for oscillation amplitude (peaks at MAP).
const envelope = (cuff: number) => {
  const sigma = 18;
  return Math.exp(-Math.pow(cuff - MAP_VAL, 2) / (2 * sigma * sigma));
};

// Cuff pressure at time t (ms) within cycle.
const cuffAt = (t: number) => {
  if (t < 1500) return (PEAK * t) / 1500; // inflate
  if (t < 2500) return PEAK; // hold
  if (t < 12000) {
    // linear deflation 160 -> 40 over 9.5s
    const k = (t - 2500) / 9500;
    return PEAK - k * (PEAK - 40);
  }
  return 40; // settle
};

// Plot dimensions
const W = 720;
const H = 320;
const PAD_L = 56;
const PAD_R = 24;
const PAD_T = 20;
const PAD_B = 40;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

const xScale = (t: number) => PAD_L + (t / DURATION) * PLOT_W;
const yScale = (p: number) => PAD_T + PLOT_H - (p / 180) * PLOT_H;

const NIBPOscillometricDiagram = () => {
  const [running, setRunning] = useState(true);
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) {
      lastRef.current = null;
      return;
    }
    const tick = (ts: number) => {
      if (lastRef.current == null) lastRef.current = ts;
      const dt = ts - lastRef.current;
      lastRef.current = ts;
      setT((prev) => (prev + dt) % DURATION);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  const reset = () => {
    setT(0);
    lastRef.current = null;
  };

  // Build pressure trace up to current time
  const STEP = 40; // ms
  const points: string[] = [];
  for (let i = 0; i <= Math.floor(t / STEP); i++) {
    const ti = i * STEP;
    const cuff = cuffAt(ti);
    // Add oscillation when deflating between 2500-12000
    let osc = 0;
    if (ti > 2500 && ti < 12000) {
      const beat = Math.sin((ti / 1000) * (HR / 60) * 2 * Math.PI);
      osc = 6 * envelope(cuff) * beat;
    }
    points.push(`${xScale(ti).toFixed(1)},${yScale(cuff + osc).toFixed(1)}`);
  }
  const path = points.length ? `M ${points.join(" L ")}` : "";

  const cuffNow = cuffAt(t);
  const phase =
    t < 1500
      ? "Inflating"
      : t < 2500
        ? "Occluded"
        : t < 12000
          ? "Deflating — sensing oscillations"
          : "Result";

  // Artery state: open vs occluded
  const occluded = cuffNow > SBP;
  const partial = cuffNow > DBP && cuffNow <= SBP;

  // Show markers progressively as algorithm "detects" them
  const showSBP = t > 4500;
  const showMAP = t > 7500;
  const showDBP = t > 10500;

  // Marker x positions on time axis: where cuffAt == respective pressure (during deflation)
  const tForCuff = (p: number) => 2500 + ((PEAK - p) / (PEAK - 40)) * 9500;

  return (
    <DiagramFigure
      id="nibp-oscillometric"
      title="Oscillometric NIBP measurement"
      description="Animated cuff pressure trace showing inflation above systolic, stepwise deflation, and the oscillation envelope used to derive MAP, SBP and DBP."
    >
      <div className="my-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-serif font-bold text-foreground">
            Oscillometric NIBP — How an automated cuff measures BP
          </h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRunning((r) => !r)}
              aria-label={running ? "Pause" : "Play"}
            >
              {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="outline" onClick={reset} aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3 overflow-x-auto">
          <svg
            viewBox={`0 0 ${W + 220} ${H + 40}`}
            className="w-full h-auto min-w-[420px]"
            role="img"
            aria-label="Cuff pressure over time with oscillations"
          >
            {/* === Arm + cuff schematic (left of plot is too tight; place top-right) === */}
            <g transform={`translate(${W + 10}, 30)`}>
              <text x="100" y="0" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
                Brachial artery
              </text>
              {/* Arm */}
              <rect x="10" y="20" width="180" height="60" rx="10" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
              {/* Artery */}
              <rect
                x="10"
                y="46"
                width="180"
                height={occluded ? 2 : partial ? 4 : 8}
                fill="hsl(0 70% 55%)"
                style={{ transition: "height 200ms ease" }}
              />
              {/* Cuff */}
              <rect
                x="60"
                y="14"
                width="80"
                height="72"
                rx="6"
                fill="hsl(var(--primary)/0.18)"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
              />
              <text x="100" y="58" textAnchor="middle" className="fill-primary text-[11px] font-bold">
                CUFF
              </text>
              {/* Cuff pressure readout */}
              <rect x="10" y="100" width="180" height="46" rx="6" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
              <text x="100" y="118" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Cuff pressure
              </text>
              <text x="100" y="138" textAnchor="middle" className="fill-foreground text-[18px] font-bold tabular-nums">
                {Math.round(cuffNow)} mmHg
              </text>
              <text x="100" y="166" textAnchor="middle" className="fill-muted-foreground text-[10px] italic">
                {phase}
              </text>

              {/* Final result */}
              {showDBP && (
                <g>
                  <rect x="10" y="180" width="180" height="58" rx="6" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" />
                  <text x="100" y="198" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                    Reported BP
                  </text>
                  <text x="100" y="220" textAnchor="middle" className="fill-foreground text-[16px] font-bold tabular-nums">
                    {SBP}/{DBP}
                  </text>
                  <text x="100" y="234" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                    MAP {MAP_VAL}
                  </text>
                </g>
              )}
            </g>

            {/* === Plot area === */}
            {/* Axes */}
            <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + PLOT_H} stroke="hsl(var(--border))" />
            <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={PAD_L + PLOT_W} y2={PAD_T + PLOT_H} stroke="hsl(var(--border))" />

            {/* Y ticks */}
            {[0, 40, 80, 120, 160].map((v) => (
              <g key={v}>
                <line
                  x1={PAD_L - 4}
                  y1={yScale(v)}
                  x2={PAD_L + PLOT_W}
                  y2={yScale(v)}
                  stroke="hsl(var(--border))"
                  strokeDasharray="2 4"
                  opacity={0.5}
                />
                <text x={PAD_L - 8} y={yScale(v) + 4} textAnchor="end" className="fill-muted-foreground text-[10px]">
                  {v}
                </text>
              </g>
            ))}
            <text
              x={16}
              y={PAD_T + PLOT_H / 2}
              textAnchor="middle"
              transform={`rotate(-90, 16, ${PAD_T + PLOT_H / 2})`}
              className="fill-muted-foreground text-[11px]"
            >
              Cuff pressure (mmHg)
            </text>
            <text x={PAD_L + PLOT_W / 2} y={H - 8} textAnchor="middle" className="fill-muted-foreground text-[11px]">
              Time
            </text>

            {/* Reference horizontal lines */}
            {showSBP && (
              <line x1={PAD_L} x2={PAD_L + PLOT_W} y1={yScale(SBP)} y2={yScale(SBP)} stroke="hsl(var(--destructive))" strokeDasharray="4 3" opacity={0.6} />
            )}
            {showMAP && (
              <line x1={PAD_L} x2={PAD_L + PLOT_W} y1={yScale(MAP_VAL)} y2={yScale(MAP_VAL)} stroke="hsl(var(--primary))" strokeDasharray="4 3" opacity={0.7} />
            )}
            {showDBP && (
              <line x1={PAD_L} x2={PAD_L + PLOT_W} y1={yScale(DBP)} y2={yScale(DBP)} stroke="hsl(var(--clinical, var(--accent)))" strokeDasharray="4 3" opacity={0.6} />
            )}

            {/* Trace */}
            <path d={path} fill="none" stroke="hsl(var(--foreground))" strokeWidth={1.6} />

            {/* Marker dots */}
            {showSBP && (
              <g>
                <circle cx={xScale(tForCuff(SBP))} cy={yScale(SBP)} r={4} fill="hsl(var(--destructive))" />
                <text x={xScale(tForCuff(SBP)) + 8} y={yScale(SBP) - 6} className="fill-destructive text-[10px] font-semibold">
                  SBP {SBP} (oscillations begin)
                </text>
              </g>
            )}
            {showMAP && (
              <g>
                <circle cx={xScale(tForCuff(MAP_VAL))} cy={yScale(MAP_VAL)} r={4} fill="hsl(var(--primary))" />
                <text x={xScale(tForCuff(MAP_VAL)) + 8} y={yScale(MAP_VAL) - 6} className="fill-primary text-[10px] font-semibold">
                  MAP {MAP_VAL} (max amplitude)
                </text>
              </g>
            )}
            {showDBP && (
              <g>
                <circle cx={xScale(tForCuff(DBP))} cy={yScale(DBP)} r={4} fill="hsl(var(--foreground))" />
                <text x={xScale(tForCuff(DBP)) + 8} y={yScale(DBP) + 14} className="fill-foreground text-[10px] font-semibold">
                  DBP {DBP} (oscillations fade)
                </text>
              </g>
            )}

            {/* Moving cursor */}
            <line
              x1={xScale(t)}
              x2={xScale(t)}
              y1={PAD_T}
              y2={PAD_T + PLOT_H}
              stroke="hsl(var(--primary))"
              strokeWidth={1}
              opacity={0.4}
            />
          </svg>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
          <div className="p-3 rounded-md border border-border">
            <p className="font-semibold text-destructive mb-1">Systolic (SBP)</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Cuff pressure at which oscillations <em>first appear</em> as the artery just begins to open in systole.
            </p>
          </div>
          <div className="p-3 rounded-md border border-border">
            <p className="font-semibold text-primary mb-1">Mean (MAP)</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Cuff pressure at the point of <em>maximum oscillation amplitude</em> — the only value measured directly. SBP and DBP are derived by ratio algorithms (~50–55% and ~80% of peak).
            </p>
          </div>
          <div className="p-3 rounded-md border border-border">
            <p className="font-semibold text-foreground mb-1">Diastolic (DBP)</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Cuff pressure at which oscillation amplitude <em>falls back</em> to a fixed fraction of the peak — algorithm-derived, not directly sensed.
            </p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default NIBPOscillometricDiagram;
