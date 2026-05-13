import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DiagramFigure } from "./_shared/DiagramFigure";

// ----- Fowler curve model -----
// Phase I: pure dead-space gas, [N2] = 0 (after a single 100% O2 inspiration)
// Phase II: rapid rise (mixed dead-space + alveolar gas) — modelled with a
//           sigmoid centred at ~150 mL exhaled volume
// Phase III: alveolar plateau, asymptote ~ 80% N2 (mixed expired alveolar gas
//           after a 100% O2 breath — N2 from FRC dilutes the inspired O2)
const ANATOMICAL_DEAD_SPACE_ML = 150; // canonical value used for the equal-area construction
const PLATEAU_PERCENT = 80;
const TOTAL_EXHALED_ML = 500;

const sigmoid = (x: number, x0: number, k: number) => 1 / (1 + Math.exp(-k * (x - x0)));

const n2Concentration = (volumeMl: number) => {
  // Smooth transition through phase II centred on the dead-space volume
  // k controls steepness (slope of phase II). Larger k → narrower transition.
  const k = 0.045;
  const s = sigmoid(volumeMl, ANATOMICAL_DEAD_SPACE_ML, k);
  // Slight upward slope on phase III to look realistic (~3% rise across plateau)
  const plateauSlope = volumeMl > ANATOMICAL_DEAD_SPACE_ML ? (volumeMl - ANATOMICAL_DEAD_SPACE_ML) * 0.008 : 0;
  return s * PLATEAU_PERCENT + plateauSlope;
};

// Generate full curve points
const generatePoints = () => {
  const pts: Array<{ v: number; n2: number }> = [];
  for (let v = 0; v <= TOTAL_EXHALED_ML; v += 4) {
    pts.push({ v, n2: n2Concentration(v) });
  }
  return pts;
};

// SVG layout
const VIEW_W = 640;
const VIEW_H = 360;
const PAD_L = 60;
const PAD_R = 30;
const PAD_T = 24;
const PAD_B = 60;
const PLOT_W = VIEW_W - PAD_L - PAD_R;
const PLOT_H = VIEW_H - PAD_T - PAD_B;

const xScale = (v: number) => PAD_L + (v / TOTAL_EXHALED_ML) * PLOT_W;
const yScale = (n2: number) => PAD_T + PLOT_H - (n2 / 100) * PLOT_H;

const points = generatePoints();
const _pathD = points
  .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.v).toFixed(2)} ${yScale(p.n2).toFixed(2)}`)
  .join(" ");

const ANIMATION_DURATION_MS = 6000; // 6 seconds for full breath
const STEPS = 240;

export const FowlersMethodDiagram = () => {
  const [progress, setProgress] = useState(STEPS); // animation progress 0..STEPS (rendered volume)
  const [playing, setPlaying] = useState(false);
  const [showConstruction, setShowConstruction] = useState(true);

  useEffect(() => {
    if (!playing) return;
    if (progress >= STEPS) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(
      () => setProgress((p) => Math.min(STEPS, p + 1)),
      ANIMATION_DURATION_MS / STEPS,
    );
    return () => window.clearTimeout(id);
  }, [playing, progress]);

  const currentVolume = (progress / STEPS) * TOTAL_EXHALED_ML;
  const currentN2 = n2Concentration(currentVolume);

  // Visible portion of curve
  const visiblePoints = points.filter((p) => p.v <= currentVolume);
  const visiblePathD = visiblePoints.length
    ? visiblePoints
        .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.v).toFixed(2)} ${yScale(p.n2).toFixed(2)}`)
        .join(" ")
    : "";

  const reset = () => {
    setProgress(0);
    setPlaying(false);
  };
  const play = () => {
    if (progress >= STEPS) setProgress(0);
    setPlaying(true);
  };
  const showFinal = () => {
    setProgress(STEPS);
    setPlaying(false);
  };

  // Phase boundaries (drawn once curve has reached them)
  const phaseIIStart = 90;          // anatomical-only gas runs out
  const phaseIIIStart = ANATOMICAL_DEAD_SPACE_ML + 60;

  // Equal-area construction: vertical line at Vd (anatomical dead space)
  const vdX = xScale(ANATOMICAL_DEAD_SPACE_ML);

  return (
    <DiagramFigure
      id="fowlers-method-diagram"
      title="Fowlers method"
      description="Auto-generated wrapper for the Fowlers method anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={play} disabled={playing}>
            {progress >= STEPS ? "Replay" : "Play"}
          </Button>
          <Button size="sm" variant="outline" onClick={() => setPlaying(false)} disabled={!playing}>
            Pause
          </Button>
          <Button size="sm" variant="outline" onClick={reset}>
            Reset
          </Button>
          <Button size="sm" variant="outline" onClick={showFinal}>
            Show full curve
          </Button>
          <Button
            size="sm"
            variant={showConstruction ? "default" : "outline"}
            onClick={() => setShowConstruction((v) => !v)}
          >
            Equal-area construction
          </Button>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="rounded-md bg-muted/50 border border-border p-2">
            <p className="text-muted-foreground">Exhaled volume</p>
            <p className="font-mono text-foreground font-semibold">{currentVolume.toFixed(0)} mL</p>
          </div>
          <div className="rounded-md bg-muted/50 border border-border p-2">
            <p className="text-muted-foreground">Expired [N₂]</p>
            <p className="font-mono text-foreground font-semibold">{currentN2.toFixed(1)} %</p>
          </div>
          <div className="rounded-md bg-muted/50 border border-border p-2">
            <p className="text-muted-foreground">Anatomical V<sub>D</sub></p>
            <p className="font-mono text-foreground font-semibold">{ANATOMICAL_DEAD_SPACE_ML} mL (~2 mL/kg)</p>
          </div>
        </div>
  
        <div className="rounded-lg border border-border bg-card p-2">
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full h-auto" aria-label="Fowler's method N2 expirogram">
            {/* Phase shading — drawn behind everything */}
            {showConstruction && progress > 30 && (
              <>
                <rect x={PAD_L} y={PAD_T} width={xScale(phaseIIStart) - PAD_L} height={PLOT_H}
                  fill="hsl(210 80% 55%)" opacity="0.08" />
                <rect x={xScale(phaseIIStart)} y={PAD_T} width={xScale(phaseIIIStart) - xScale(phaseIIStart)} height={PLOT_H}
                  fill="hsl(35 85% 55%)" opacity="0.10" />
                <rect x={xScale(phaseIIIStart)} y={PAD_T} width={xScale(TOTAL_EXHALED_ML) - xScale(phaseIIIStart)} height={PLOT_H}
                  fill="hsl(142 55% 45%)" opacity="0.08" />
              </>
            )}
  
            {/* Axes */}
            <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + PLOT_H} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={PAD_L + PLOT_W} y2={PAD_T + PLOT_H} stroke="hsl(var(--foreground))" strokeWidth="1" />
  
            {/* Y ticks */}
            {[0, 20, 40, 60, 80, 100].map((v) => (
              <g key={v}>
                <line x1={PAD_L - 4} y1={yScale(v)} x2={PAD_L} y2={yScale(v)} stroke="hsl(var(--foreground))" strokeWidth="1" />
                <text x={PAD_L - 8} y={yScale(v) + 3} textAnchor="end" fontSize="9" fill="hsl(var(--muted-foreground))">{v}</text>
              </g>
            ))}
            {/* X ticks */}
            {[0, 100, 200, 300, 400, 500].map((v) => (
              <g key={v}>
                <line x1={xScale(v)} y1={PAD_T + PLOT_H} x2={xScale(v)} y2={PAD_T + PLOT_H + 4} stroke="hsl(var(--foreground))" strokeWidth="1" />
                <text x={xScale(v)} y={PAD_T + PLOT_H + 16} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">{v}</text>
              </g>
            ))}
            <text x={PAD_L + PLOT_W / 2} y={VIEW_H - 12} textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))">
              Exhaled volume (mL)
            </text>
            <text x={16} y={PAD_T + PLOT_H / 2} textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))"
              transform={`rotate(-90 16 ${PAD_T + PLOT_H / 2})`}>
              Expired [N₂] (%)
            </text>
  
            {/* Plateau asymptote dashed reference once we hit phase III */}
            {showConstruction && currentVolume > phaseIIIStart && (
              <line x1={xScale(phaseIIIStart)} y1={yScale(PLATEAU_PERCENT)} x2={xScale(TOTAL_EXHALED_ML)} y2={yScale(PLATEAU_PERCENT)}
                stroke="hsl(142 55% 45%)" strokeWidth="1" strokeDasharray="4 3" opacity="0.7" />
            )}
  
            {/* Equal-area vertical at V_D */}
            {showConstruction && currentVolume > ANATOMICAL_DEAD_SPACE_ML && (
              <>
                <line x1={vdX} y1={PAD_T} x2={vdX} y2={PAD_T + PLOT_H} stroke="hsl(0 70% 55%)" strokeWidth="1.5" strokeDasharray="6 3" />
                <text x={vdX} y={PAD_T + PLOT_H + 32} textAnchor="middle" fontSize="10" fill="hsl(0 70% 55%)" fontWeight="600">
                  V<tspan baselineShift="sub" fontSize="7">D</tspan> = {ANATOMICAL_DEAD_SPACE_ML} mL
                </text>
                {/* equal-area shaded triangles A (under plateau, left of V_D) and B (above curve, right of V_D) */}
                <path
                  d={`M ${xScale(phaseIIStart)} ${yScale(PLATEAU_PERCENT)} L ${vdX} ${yScale(PLATEAU_PERCENT)} L ${vdX} ${yScale(n2Concentration(ANATOMICAL_DEAD_SPACE_ML))} Z`}
                  fill="hsl(0 70% 55%)" opacity="0.18"
                />
                <path
                  d={`M ${vdX} ${yScale(PLATEAU_PERCENT)} L ${xScale(phaseIIIStart)} ${yScale(PLATEAU_PERCENT)} L ${xScale(phaseIIIStart)} ${yScale(n2Concentration(phaseIIIStart))} L ${vdX} ${yScale(n2Concentration(ANATOMICAL_DEAD_SPACE_ML))} Z`}
                  fill="hsl(0 70% 55%)" opacity="0.18"
                />
                <text x={vdX - 22} y={yScale(PLATEAU_PERCENT) + 18} fontSize="11" fill="hsl(0 70% 55%)" fontWeight="700">A</text>
                <text x={vdX + 18} y={yScale(PLATEAU_PERCENT) + 18} fontSize="11" fill="hsl(0 70% 55%)" fontWeight="700">B</text>
              </>
            )}
  
            {/* The actual N2 curve — animated */}
            {visiblePathD && (
              <path d={visiblePathD} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            )}
  
            {/* Leading edge marker */}
            {progress > 0 && progress < STEPS && (
              <circle cx={xScale(currentVolume)} cy={yScale(currentN2)} r={4.5}
                fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="1.5" />
            )}
  
            {/* Phase labels */}
            {showConstruction && progress > 30 && (
              <>
                <text x={(PAD_L + xScale(phaseIIStart)) / 2} y={PAD_T + 14} textAnchor="middle" fontSize="10"
                  fill="hsl(210 80% 45%)" fontWeight="600">Phase I</text>
                <text x={(PAD_L + xScale(phaseIIStart)) / 2} y={PAD_T + 26} textAnchor="middle" fontSize="8"
                  fill="hsl(210 80% 45%)" opacity="0.85">dead-space gas</text>
                <text x={(xScale(phaseIIStart) + xScale(phaseIIIStart)) / 2} y={PAD_T + 14} textAnchor="middle" fontSize="10"
                  fill="hsl(35 85% 40%)" fontWeight="600">Phase II</text>
                <text x={(xScale(phaseIIStart) + xScale(phaseIIIStart)) / 2} y={PAD_T + 26} textAnchor="middle" fontSize="8"
                  fill="hsl(35 85% 40%)" opacity="0.85">mixed gas</text>
                <text x={(xScale(phaseIIIStart) + xScale(TOTAL_EXHALED_ML)) / 2} y={PAD_T + 14} textAnchor="middle" fontSize="10"
                  fill="hsl(142 55% 35%)" fontWeight="600">Phase III</text>
                <text x={(xScale(phaseIIIStart) + xScale(TOTAL_EXHALED_ML)) / 2} y={PAD_T + 26} textAnchor="middle" fontSize="8"
                  fill="hsl(142 55% 35%)" opacity="0.85">alveolar plateau</text>
              </>
            )}
          </svg>
        </div>
  
        {/* Manual scrub */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Scrub through the breath</p>
          <Slider
            value={[progress]}
            min={0}
            max={STEPS}
            step={1}
            onValueChange={(v) => {
              setProgress(v[0]);
              setPlaying(false);
            }}
          />
        </div>
  
        <div className="rounded-lg bg-muted/40 border border-border p-4 text-xs text-foreground/85 space-y-2">
          <p className="font-semibold text-foreground text-sm">How to read it (Fowler, 1948)</p>
          <p>
            The patient inhales a single vital-capacity breath of <strong>100% O₂</strong> (washing N₂ out of the
            conducting airways) and then exhales slowly through a rapid N₂ analyser while exhaled volume is recorded.
            The resulting <em>nitrogen expirogram</em> has three phases:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Phase I:</strong> pure O₂ from the conducting airways — <em>no N₂</em>.</li>
            <li><strong>Phase II:</strong> rapid rise as mixed dead-space and alveolar gas reaches the analyser.</li>
            <li><strong>Phase III:</strong> alveolar plateau (the <em>sloping</em> portion in disease — uneven emptying of alveolar units).</li>
          </ul>
          <p>
            Anatomical dead space is found by drawing a <strong>vertical line through phase II</strong> such that the
            two shaded triangles (A and B) have <strong>equal areas</strong>. The volume on the x-axis at that line is
            <strong> V<sub>D(anat)</sub> ≈ 150 mL</strong> in a 70 kg adult (~2 mL/kg). This is the <em>geometric</em>
            midpoint of phase II — equivalent to the volume at which 50% of the gas at the lips has alveolar origin.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default FowlersMethodDiagram;
