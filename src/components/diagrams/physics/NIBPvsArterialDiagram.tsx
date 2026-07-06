import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Side-by-side comparison: invasive arterial line vs oscillometric NIBP.
 * Both panels share a common time axis and the same underlying "patient"
 * (SBP 120, DBP 80, MAP 93, HR 75) — the diagram contrasts what each
 * technique actually senses and how it derives SBP, MAP and DBP.
 */

const SBP = 120;
const DBP = 80;
const MAP_VAL = 93;
const PEAK = 160;
const HR = 75;
const DURATION = 14000;

// Idealised arterial waveform: rapid systolic upstroke, dicrotic notch, exponential diastolic decay.
const arterialBeat = (phase: number) => {
  // phase ∈ [0,1)
  if (phase < 0.12) {
    // upstroke
    const x = phase / 0.12;
    return x * x * (3 - 2 * x); // smoothstep 0 → 1
  }
  if (phase < 0.32) {
    // peak rounding + initial decline
    const x = (phase - 0.12) / 0.2;
    return 1 - 0.35 * x;
  }
  if (phase < 0.38) {
    // dicrotic notch dip
    const x = (phase - 0.32) / 0.06;
    return 0.65 - 0.1 * x;
  }
  if (phase < 0.45) {
    // dicrotic upstroke
    const x = (phase - 0.38) / 0.07;
    return 0.55 + 0.1 * x;
  }
  // diastolic decay to 0
  const x = (phase - 0.45) / 0.55;
  return 0.65 * Math.exp(-2.2 * x);
};

const arterialAt = (tMs: number) => {
  const beatPeriod = 60000 / HR;
  const phase = (tMs % beatPeriod) / beatPeriod;
  const norm = arterialBeat(phase);
  return DBP + (SBP - DBP) * norm;
};

// Cuff deflation profile (oscillometric panel)
const cuffAt = (tMs: number) => {
  if (tMs < 1500) return (PEAK * tMs) / 1500;
  if (tMs < 2500) return PEAK;
  if (tMs < 12000) {
    const k = (tMs - 2500) / 9500;
    return PEAK - k * (PEAK - 40);
  }
  return 40;
};

// Oscillation envelope — peaks at MAP
const envelope = (cuff: number) => {
  const sigma = 18;
  return Math.exp(-Math.pow(cuff - MAP_VAL, 2) / (2 * sigma * sigma));
};

// Plot dimensions per panel
const PW = 360;
const PH = 240;
const PAD_L = 44;
const PAD_R = 14;
const PAD_T = 30;
const PAD_B = 32;
const PLOT_W = PW - PAD_L - PAD_R;
const PLOT_H = PH - PAD_T - PAD_B;

const xScale = (t: number) => PAD_L + (t / DURATION) * PLOT_W;
const yScale = (p: number) => PAD_T + PLOT_H - (p / 180) * PLOT_H;

const STEP = 40; // ms

const NIBPvsArterialDiagram = () => {
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

  // Build traces up to current t
  const artPts: string[] = [];
  const nibpPts: string[] = [];
  const nMax = Math.floor(t / STEP);
  for (let i = 0; i <= nMax; i++) {
    const ti = i * STEP;
    artPts.push(`${xScale(ti).toFixed(1)},${yScale(arterialAt(ti)).toFixed(1)}`);

    const cuff = cuffAt(ti);
    let osc = 0;
    if (ti > 2500 && ti < 12000) {
      const beat = Math.sin((ti / 1000) * (HR / 60) * 2 * Math.PI);
      osc = 6 * envelope(cuff) * beat;
    }
    nibpPts.push(`${xScale(ti).toFixed(1)},${yScale(cuff + osc).toFixed(1)}`);
  }
  const artPath = artPts.length ? `M ${artPts.join(" L ")}` : "";
  const nibpPath = nibpPts.length ? `M ${nibpPts.join(" L ")}` : "";

  // Live readings
  const artNow = arterialAt(t);
  const cuffNow = cuffAt(t);

  // Algorithm reveal markers on NIBP panel (during deflation)
  const showSBP = t > 4500;
  const showMAP = t > 7500;
  const showDBP = t > 10500;
  const tForCuff = (p: number) => 2500 + ((PEAK - p) / (PEAK - 40)) * 9500;

  // Helpers to render axes for a panel (translated by gx, gy)
  const renderAxes = (label: string, showRefLines: boolean) => (
    <>
      <text x={PAD_L} y={18} className="fill-foreground text-[12px] font-semibold">
        {label}
      </text>
      <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + PLOT_H} stroke="hsl(var(--border))" />
      <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={PAD_L + PLOT_W} y2={PAD_T + PLOT_H} stroke="hsl(var(--border))" />
      {[0, 40, 80, 120, 160].map((v) => (
        <g key={v}>
          <line
            x1={PAD_L - 3}
            x2={PAD_L + PLOT_W}
            y1={yScale(v)}
            y2={yScale(v)}
            stroke="hsl(var(--border))"
            strokeDasharray="2 4"
            opacity={0.4}
          />
          <text x={PAD_L - 6} y={yScale(v) + 3} textAnchor="end" className="fill-muted-foreground text-[9px]">
            {v}
          </text>
        </g>
      ))}
      {showRefLines && (
        <>
          <line x1={PAD_L} x2={PAD_L + PLOT_W} y1={yScale(SBP)} y2={yScale(SBP)} stroke="hsl(var(--destructive))" strokeDasharray="3 3" opacity={0.45} />
          <line x1={PAD_L} x2={PAD_L + PLOT_W} y1={yScale(MAP_VAL)} y2={yScale(MAP_VAL)} stroke="hsl(var(--primary))" strokeDasharray="3 3" opacity={0.55} />
          <line x1={PAD_L} x2={PAD_L + PLOT_W} y1={yScale(DBP)} y2={yScale(DBP)} stroke="hsl(var(--foreground))" strokeDasharray="3 3" opacity={0.4} />
        </>
      )}
      <text x={PAD_L + PLOT_W / 2} y={PH - 8} textAnchor="middle" className="fill-muted-foreground text-[9px]">
        Time
      </text>
      <text
        x={12}
        y={PAD_T + PLOT_H / 2}
        textAnchor="middle"
        transform={`rotate(-90, 12, ${PAD_T + PLOT_H / 2})`}
        className="fill-muted-foreground text-[9px]"
      >
        mmHg
      </text>
    </>
  );

  return (
    <DiagramFigure
      id="nibp-vs-arterial"
      title="Invasive arterial line vs oscillometric NIBP"
      description="Synchronised animation of a continuous arterial waveform and an oscillometric cuff trace from the same patient, showing how SBP, MAP and DBP are obtained by each technique."
    >
      <div className="my-6">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="text-lg font-serif font-bold text-foreground">
            Invasive arterial vs oscillometric NIBP — where do SBP, MAP and DBP come from?
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
            viewBox={`0 0 ${PW * 2 + 20} ${PH + 70}`}
            className="w-full h-auto min-w-[560px]"
            role="img"
            aria-label="Two synchronized plots: invasive arterial pressure trace on the left, oscillometric cuff pressure trace on the right"
          >
            {/* === LEFT PANEL: invasive arterial === */}
            <g>
              {renderAxes("Invasive arterial line — beat-to-beat", true)}

              <path d={artPath} fill="none" stroke="hsl(var(--destructive))" strokeWidth={1.6} />

              {/* Annotation labels for SBP/MAP/DBP */}
              <text x={PAD_L + PLOT_W - 4} y={yScale(SBP) - 3} textAnchor="end" className="fill-destructive text-[9px] font-semibold">
                SBP {SBP} (peak)
              </text>
              <text x={PAD_L + PLOT_W - 4} y={yScale(MAP_VAL) - 3} textAnchor="end" className="fill-primary text-[9px] font-semibold">
                MAP {MAP_VAL} (area-under-curve avg)
              </text>
              <text x={PAD_L + PLOT_W - 4} y={yScale(DBP) + 11} textAnchor="end" className="fill-foreground text-[9px] font-semibold">
                DBP {DBP} (trough)
              </text>

              {/* Live cursor + value */}
              <line
                x1={xScale(t)}
                x2={xScale(t)}
                y1={PAD_T}
                y2={PAD_T + PLOT_H}
                stroke="hsl(var(--destructive))"
                opacity={0.4}
              />
              <circle cx={xScale(t)} cy={yScale(artNow)} r={3} fill="hsl(var(--destructive))" />

              {/* Live readout */}
              <g transform={`translate(${PAD_L + 4}, ${PAD_T + PLOT_H + 18})`}>
                <text className="fill-muted-foreground text-[9px]">
                  Live: <tspan className="fill-foreground font-semibold">{Math.round(artNow)} mmHg</tspan>
                </text>
              </g>
            </g>

            {/* === RIGHT PANEL: oscillometric === */}
            <g transform={`translate(${PW + 20}, 0)`}>
              {renderAxes("Oscillometric cuff — single inflation cycle", true)}

              <path d={nibpPath} fill="none" stroke="hsl(var(--foreground))" strokeWidth={1.6} />

              {/* Algorithm markers */}
              {showSBP && (
                <g>
                  <circle cx={xScale(tForCuff(SBP))} cy={yScale(SBP)} r={3.5} fill="hsl(var(--destructive))" />
                  <text x={xScale(tForCuff(SBP)) + 6} y={yScale(SBP) - 4} className="fill-destructive text-[9px] font-semibold">
                    SBP {SBP} — oscillations begin
                  </text>
                </g>
              )}
              {showMAP && (
                <g>
                  <circle cx={xScale(tForCuff(MAP_VAL))} cy={yScale(MAP_VAL)} r={3.5} fill="hsl(var(--primary))" />
                  <text x={xScale(tForCuff(MAP_VAL)) + 6} y={yScale(MAP_VAL) - 4} className="fill-primary text-[9px] font-semibold">
                    MAP {MAP_VAL} — peak amplitude
                  </text>
                </g>
              )}
              {showDBP && (
                <g>
                  <circle cx={xScale(tForCuff(DBP))} cy={yScale(DBP)} r={3.5} fill="hsl(var(--foreground))" />
                  <text x={xScale(tForCuff(DBP)) + 6} y={yScale(DBP) + 11} className="fill-foreground text-[9px] font-semibold">
                    DBP {DBP} — oscillations fade
                  </text>
                </g>
              )}

              <line
                x1={xScale(t)}
                x2={xScale(t)}
                y1={PAD_T}
                y2={PAD_T + PLOT_H}
                stroke="hsl(var(--primary))"
                opacity={0.4}
              />

              <g transform={`translate(${PAD_L + 4}, ${PAD_T + PLOT_H + 18})`}>
                <text className="fill-muted-foreground text-[9px]">
                  Cuff: <tspan className="fill-foreground font-semibold">{Math.round(cuffNow)} mmHg</tspan>
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Comparison cards */}
        <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <p className="font-semibold text-destructive mb-1">Invasive arterial line</p>
            <ul className="list-disc list-inside space-y-1 text-foreground/90 leading-relaxed">
              <li><strong>Senses:</strong> instantaneous arterial pressure, beat by beat.</li>
              <li><strong>SBP</strong> = peak of each waveform (directly measured).</li>
              <li><strong>DBP</strong> = trough just before the next upstroke (directly measured).</li>
              <li><strong>MAP</strong> = true area-under-the-curve average per beat (computed by the monitor).</li>
              <li>Continuous — captures beat-to-beat variability, dicrotic notch, response to intervention.</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="font-semibold text-foreground mb-1">Oscillometric NIBP cuff</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground leading-relaxed">
              <li><strong>Senses:</strong> oscillation amplitude in cuff pressure during a single deflation.</li>
              <li><strong>MAP</strong> = cuff pressure at <em>peak oscillation amplitude</em> — the only value measured directly.</li>
              <li><strong>SBP</strong> = cuff pressure where amplitude reaches a fixed fraction (~50–55%) of peak — algorithm-derived.</li>
              <li><strong>DBP</strong> = cuff pressure where amplitude falls to ~80% of peak — algorithm-derived.</li>
              <li>Intermittent (≥1 min cycle), tolerates poor access, no infection/ischaemia risk; less reliable in AF, shock, peripheral vasoconstriction.</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-lg border border-primary/30 bg-primary/5 text-sm text-foreground/90 leading-relaxed">
          <strong className="text-primary">Take-home:</strong> the same patient yields the same SBP/MAP/DBP from both methods — but they reach the values
          from <em>opposite directions</em>. The arterial line measures SBP and DBP directly and computes MAP; oscillometry measures MAP directly
          and infers SBP and DBP. This is why oscillometric MAP is the most trustworthy NIBP value in low-output states, and why arterial-line
          MAP is preferred for titrating vasoactive drugs.
        </div>
      </div>
    </DiagramFigure>
  );
};

export default NIBPvsArterialDiagram;
