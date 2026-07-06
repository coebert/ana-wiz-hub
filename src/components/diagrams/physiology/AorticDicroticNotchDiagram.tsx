import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Pause, Play, RotateCcw } from "lucide-react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Animated aortic pressure waveform that highlights the dichrotic notch as
 * the boundary between ventricular systole and diastole.
 *
 * - A sweeping "now" cursor traces the waveform left-to-right at ~1 cardiac cycle / 2.4 s.
 * - The trace is annotated with the upstroke, peak (SBP), dichrotic notch (aortic
 *   valve closure), and the diastolic decay to DBP.
 * - When the cursor reaches the notch the animation pauses briefly and the notch
 *   pulses, with the systole/diastole bands swapping highlight to convey the
 *   transition.
 */

// SVG viewport
const VB_W = 720;
const VB_H = 320;
const PAD_L = 56;
const PAD_R = 24;
const PAD_T = 28;
const PAD_B = 56;
const PLOT_W = VB_W - PAD_L - PAD_R;
const PLOT_H = VB_H - PAD_T - PAD_B;

// Pressure axis (mmHg)
const P_MIN = 60;
const P_MAX = 130;

// Single cardiac cycle parameterised in normalised time t ∈ [0,1].
// Phases (approximate, HR ~70):
//   0.00 – 0.05  : end-diastolic baseline (just before AV opens)
//   0.05 – 0.30  : rapid upstroke + systolic peak
//   0.30 – 0.55  : systolic decline (ejection slowing)
//   ~0.55        : DICHROTIC NOTCH (aortic valve closure)
//   0.55 – 1.00  : diastolic decay (run-off)
const NOTCH_T = 0.55;
const SBP = 120;
const DBP = 75;
const NOTCH_P = 90;

const aorticPressure = (t: number): number => {
  // wrap t into [0,1)
  const u = ((t % 1) + 1) % 1;

  if (u < 0.05) {
    // pre-upstroke baseline
    return DBP;
  }
  if (u < 0.30) {
    // sinusoidal upstroke from DBP to SBP
    const x = (u - 0.05) / 0.25; // 0 → 1
    return DBP + (SBP - DBP) * Math.sin((Math.PI / 2) * x);
  }
  if (u < NOTCH_T) {
    // smooth descent from SBP toward notch
    const x = (u - 0.30) / (NOTCH_T - 0.30); // 0 → 1
    return SBP - (SBP - NOTCH_P) * (0.5 - 0.5 * Math.cos(Math.PI * x));
  }
  if (u < NOTCH_T + 0.04) {
    // small reflected bump just after closure (the visible notch+rebound)
    const x = (u - NOTCH_T) / 0.04;
    // dip then small rise
    const dip = NOTCH_P - 4 * Math.sin(Math.PI * x);
    return dip + 2 * x;
  }
  // diastolic exponential-style decay back toward DBP
  const x = (u - (NOTCH_T + 0.04)) / (1 - (NOTCH_T + 0.04));
  return DBP + (NOTCH_P + 2 - DBP) * Math.exp(-3 * x);
};

const xForT = (t: number) => PAD_L + t * PLOT_W;
const yForP = (p: number) =>
  PAD_T + PLOT_H * (1 - (p - P_MIN) / (P_MAX - P_MIN));

// Pre-compute a static path of the waveform (used as the dim baseline).
const STATIC_PATH = (() => {
  const N = 240;
  let d = "";
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = xForT(t);
    const y = yForP(aorticPressure(t));
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
})();

// Build the active "trace so far" path up to the cursor.
const tracePath = (cursorT: number): string => {
  const N = 240;
  const lastIdx = Math.max(1, Math.floor(cursorT * N));
  let d = "";
  for (let i = 0; i <= lastIdx; i++) {
    const t = i / N;
    const x = xForT(t);
    const y = yForP(aorticPressure(t));
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
};

const CYCLE_MS = 2400;
const NOTCH_PAUSE_MS = 900;

const AorticDicroticNotchDiagram = () => {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [showIABP, setShowIABP] = useState(true);

  // IABP timing (counterpulsation, 1:1):
  //   Inflation: at the dichrotic notch (aortic valve closure, start of diastole)
  //   Deflation: just before next systolic upstroke (end-diastole)
  const INFLATE_T = NOTCH_T;          // 0.55 — onset of diastole
  const DEFLATE_T = 0.97;             // just before next ejection (~0.05)

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let start = performance.now();
    let pausedUntil = 0;
    let pausedThisCycle = false;

    const tick = (now: number) => {
      if (pausedUntil && now < pausedUntil) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (pausedUntil && now >= pausedUntil) {
        // Resume: shift `start` so cycle continues smoothly from the notch.
        start = now - NOTCH_T * CYCLE_MS;
        pausedUntil = 0;
      }
      const elapsed = now - start;
      const u = (elapsed % CYCLE_MS) / CYCLE_MS;

      // Trigger one short pause per cycle, slightly past the notch so the
      // learner sees the cursor land on it.
      if (!pausedThisCycle && u >= NOTCH_T && u < NOTCH_T + 0.02) {
        pausedUntil = now + NOTCH_PAUSE_MS;
        pausedThisCycle = true;
        setT(NOTCH_T);
        raf = requestAnimationFrame(tick);
        return;
      }
      if (u < NOTCH_T - 0.02) {
        pausedThisCycle = false;
      }

      setT(u);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const cursorX = xForT(t);
  const cursorY = yForP(aorticPressure(t));
  const inSystole = t < NOTCH_T;
  const atNotch = Math.abs(t - NOTCH_T) < 0.015;

  // Pre-computed key points
  const notchX = xForT(NOTCH_T);
  const notchY = yForP(NOTCH_P);
  const peakX = xForT(0.30);
  const peakY = yForP(SBP);

  return (
    <DiagramFigure
      id="aortic-dicrotic-notch-diagram"
      title="Aortic dicrotic notch"
      description="Auto-generated wrapper for the Aortic dicrotic notch anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="space-y-3">
        <div className="rounded-xl border border-border bg-card p-3 md:p-4">
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="w-full h-auto"
            role="img"
            aria-label="Animated aortic pressure waveform highlighting the dichrotic notch as ventricular systole transitions to diastole"
          >
            {/* Phase background bands */}
            <rect
              x={PAD_L}
              y={PAD_T}
              width={notchX - PAD_L}
              height={PLOT_H}
              fill="hsl(var(--physiology) / 0.10)"
              className={inSystole ? "transition-opacity duration-300" : "transition-opacity duration-300 opacity-40"}
            />
            <rect
              x={notchX}
              y={PAD_T}
              width={PAD_L + PLOT_W - notchX}
              height={PLOT_H}
              fill="hsl(var(--clinical) / 0.10)"
              className={!inSystole ? "transition-opacity duration-300" : "transition-opacity duration-300 opacity-40"}
            />
  
            {/* Y-axis grid lines */}
            {[60, 80, 100, 120].map((p) => (
              <g key={p}>
                <line
                  x1={PAD_L}
                  x2={PAD_L + PLOT_W}
                  y1={yForP(p)}
                  y2={yForP(p)}
                  stroke="hsl(var(--border))"
                  strokeDasharray="2 4"
                  strokeWidth={1}
                />
                <text
                  x={PAD_L - 8}
                  y={yForP(p) + 4}
                  textAnchor="end"
                  fill="hsl(var(--muted-foreground))"
                  fontSize={11}
                >
                  {p}
                </text>
              </g>
            ))}
            <text
              x={14}
              y={PAD_T + PLOT_H / 2}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
              fontSize={11}
              transform={`rotate(-90 14 ${PAD_T + PLOT_H / 2})`}
            >
              Aortic pressure (mmHg)
            </text>
  
            {/* Axes */}
            <line
              x1={PAD_L}
              x2={PAD_L + PLOT_W}
              y1={PAD_T + PLOT_H}
              y2={PAD_T + PLOT_H}
              stroke="hsl(var(--foreground))"
              strokeWidth={1}
            />
            <line
              x1={PAD_L}
              x2={PAD_L}
              y1={PAD_T}
              y2={PAD_T + PLOT_H}
              stroke="hsl(var(--foreground))"
              strokeWidth={1}
            />
  
            {/* Phase labels above plot */}
            <text
              x={(PAD_L + notchX) / 2}
              y={PAD_T - 10}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fill="hsl(var(--physiology))"
            >
              Ventricular systole
            </text>
            <text
              x={(notchX + PAD_L + PLOT_W) / 2}
              y={PAD_T - 10}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fill="hsl(var(--clinical))"
            >
              Ventricular diastole
            </text>
  
            {/* Dim full waveform */}
            <path
              d={STATIC_PATH}
              fill="none"
              stroke="hsl(var(--muted-foreground) / 0.35)"
              strokeWidth={1.5}
              strokeDasharray="3 4"
            />
  
            {/* Active trace up to cursor */}
            <path
              d={tracePath(t)}
              fill="none"
              stroke={inSystole ? "hsl(var(--physiology))" : "hsl(var(--clinical))"}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
  
            {/* IABP augmentation overlay */}
            {showIABP && (() => {
              const inflateX = xForT(INFLATE_T);
              const deflateX = xForT(DEFLATE_T);
              const balloonActive = t >= INFLATE_T && t < DEFLATE_T;
              const AUG_PEAK = 135;
              const REDUCED_EDP = 65;
              const N = 120;
              let augD = "";
              for (let i = 0; i <= N; i++) {
                const tt = INFLATE_T + (i / N) * (DEFLATE_T - INFLATE_T);
                const x = (tt - INFLATE_T) / (DEFLATE_T - INFLATE_T);
                const bump = Math.sin(Math.PI * Math.min(1, x * 1.15));
                const base = aorticPressure(tt);
                const augmented =
                  base + (AUG_PEAK - base) * bump * (1 - 0.85 * Math.pow(x, 3));
                const finalP =
                  x > 0.92
                    ? REDUCED_EDP + (augmented - REDUCED_EDP) * ((1 - x) / 0.08)
                    : augmented;
                const px = xForT(tt);
                const py = yForP(finalP);
                augD += i === 0 ? `M ${px.toFixed(2)} ${py.toFixed(2)}` : ` L ${px.toFixed(2)} ${py.toFixed(2)}`;
              }
              return (
                    <g>
                  <rect
                    x={inflateX}
                    y={PAD_T}
                    width={deflateX - inflateX}
                    height={PLOT_H}
                    fill="hsl(var(--accent) / 0.08)"
                  />
                  <path
                    d={augD}
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    strokeDasharray="5 3"
                    opacity={0.9}
                  />
                  <line
                    x1={inflateX}
                    x2={inflateX}
                    y1={PAD_T + 4}
                    y2={PAD_T + PLOT_H}
                    stroke="hsl(var(--accent))"
                    strokeWidth={1.5}
                  />
                  <polygon
                    points={`${inflateX - 5},${PAD_T + 2} ${inflateX + 5},${PAD_T + 2} ${inflateX},${PAD_T + 10}`}
                    fill="hsl(var(--accent))"
                  />
                  <text x={inflateX + 6} y={PAD_T + 18} fontSize={10} fontWeight={600} fill="hsl(var(--accent))">
                    ↑ INFLATE
                  </text>
                  <text x={inflateX + 6} y={PAD_T + 30} fontSize={9} fill="hsl(var(--muted-foreground))">
                    at notch → ↑ coronary perfusion
                  </text>
                  <line
                    x1={deflateX}
                    x2={deflateX}
                    y1={PAD_T + 4}
                    y2={PAD_T + PLOT_H}
                    stroke="hsl(var(--accent))"
                    strokeWidth={1.5}
                  />
                  <polygon
                    points={`${deflateX - 5},${PAD_T + 2} ${deflateX + 5},${PAD_T + 2} ${deflateX},${PAD_T + 10}`}
                    fill="hsl(var(--accent))"
                  />
                  <text x={deflateX - 6} y={PAD_T + 18} fontSize={10} fontWeight={600} fill="hsl(var(--accent))" textAnchor="end">
                    ↓ DEFLATE
                  </text>
                  <text x={deflateX - 6} y={PAD_T + 30} fontSize={9} fill="hsl(var(--muted-foreground))" textAnchor="end">
                    pre-systole → ↓ afterload
                  </text>
                  {balloonActive && (
                    <g>
                      <circle
                        cx={cursorX}
                        cy={PAD_T + PLOT_H - 14}
                        r={7}
                        fill="hsl(var(--accent))"
                        opacity={0.9}
                        className="animate-pulse"
                      />
                      <text
                        x={cursorX}
                        y={PAD_T + PLOT_H - 22}
                        textAnchor="middle"
                        fontSize={9}
                        fontWeight={600}
                        fill="hsl(var(--accent))"
                      >
                        balloon inflated
                      </text>
                    </g>
                  )}
                </g>
    );
            })()}
  
            {/* Notch marker */}
            <line
              x1={notchX}
              x2={notchX}
              y1={PAD_T}
              y2={PAD_T + PLOT_H}
              stroke="hsl(var(--primary))"
              strokeWidth={1}
              strokeDasharray="4 3"
              opacity={0.5}
            />
            <circle
              cx={notchX}
              cy={notchY}
              r={atNotch ? 9 : 5}
              fill="hsl(var(--primary))"
              opacity={atNotch ? 0.35 : 0.6}
              className="transition-all duration-200"
            />
            <circle cx={notchX} cy={notchY} r={3.5} fill="hsl(var(--primary))" />
            <text
              x={notchX + 10}
              y={notchY - 8}
              fontSize={12}
              fontWeight={600}
              fill="hsl(var(--primary))"
            >
              Dichrotic notch
            </text>
            <text
              x={notchX + 10}
              y={notchY + 8}
              fontSize={10}
              fill="hsl(var(--muted-foreground))"
            >
              aortic valve closes
            </text>
  
            {/* Peak (SBP) marker */}
            <circle cx={peakX} cy={peakY} r={3} fill="hsl(var(--physiology))" />
            <text
              x={peakX}
              y={peakY - 8}
              textAnchor="middle"
              fontSize={11}
              fill="hsl(var(--physiology))"
            >
              SBP {SBP}
            </text>
  
            {/* DBP marker (end of cycle) */}
            <text
              x={PAD_L + PLOT_W - 4}
              y={yForP(DBP) - 6}
              textAnchor="end"
              fontSize={11}
              fill="hsl(var(--clinical))"
            >
              DBP {DBP}
            </text>
  
            {/* Sweeping cursor */}
            <line
              x1={cursorX}
              x2={cursorX}
              y1={PAD_T}
              y2={PAD_T + PLOT_H}
              stroke="hsl(var(--foreground))"
              strokeWidth={1}
              opacity={0.35}
            />
            <circle
              cx={cursorX}
              cy={cursorY}
              r={6}
              fill="hsl(var(--background))"
              stroke={inSystole ? "hsl(var(--physiology))" : "hsl(var(--clinical))"}
              strokeWidth={2}
            />
  
            {/* X-axis: time */}
            <text
              x={PAD_L + PLOT_W / 2}
              y={VB_H - 18}
              textAnchor="middle"
              fontSize={11}
              fill="hsl(var(--muted-foreground))"
            >
              Time (one cardiac cycle ≈ 0.86 s at HR 70)
            </text>
          </svg>
        </div>
  
        {/* Controls + live phase readout */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause animation" : "Play animation"}
          >
            {playing ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {playing ? "Pause" : "Play"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setT(0)}
            aria-label="Reset to start of cycle"
          >
            <RotateCcw className="h-4 w-4 mr-1" /> Reset
          </Button>
          <div className="flex items-center gap-2 ml-2 px-2 py-1 rounded-md border border-border">
            <Switch id="iabp-toggle" checked={showIABP} onCheckedChange={setShowIABP} />
            <Label htmlFor="iabp-toggle" className="text-xs cursor-pointer">
              IABP overlay
            </Label>
          </div>
          <span className="ml-auto text-xs text-muted-foreground">
            Current phase:{" "}
            <span
              className="font-semibold"
              style={{
                color: inSystole
                  ? "hsl(var(--physiology))"
                  : "hsl(var(--clinical))",
              }}
            >
              {inSystole ? "Systole — ejection" : atNotch ? "Aortic valve closure" : "Diastole — run-off"}
            </span>
          </span>
        </div>
  
        <p className="text-xs text-muted-foreground leading-relaxed">
          The <strong>dichrotic notch</strong> marks <strong>aortic valve closure</strong> and the start of diastole. The <strong>intra-aortic balloon pump</strong> uses it as its timing reference: the balloon <strong>inflates at the notch</strong> (early diastole) to displace blood retrograde and <strong>augment coronary perfusion pressure</strong>, then <strong>deflates just before the next systolic upstroke</strong>, producing a sudden drop in aortic pressure that <strong>reduces LV afterload</strong> and the work of ejection. Toggle the overlay to see the augmented diastolic peak and reduced end-diastolic pressure produced by 1:1 counterpulsation.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default AorticDicroticNotchDiagram;
