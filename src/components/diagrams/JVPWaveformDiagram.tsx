import { useMemo, useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * JVP / right-atrial pressure waveform with scenario toggles.
 *
 * Waves:  a (atrial systole), c (TV bulge), v (atrial filling)
 * Descents: x (atrial relaxation), y (TV opens → rapid emptying)
 */

type ScenarioId =
  | "normal"
  | "af"
  | "tr"
  | "tamponade"
  | "constrictive"
  | "chb"
  | "rvh";

interface Scenario {
  id: ScenarioId;
  label: string;
  blurb: string;
  // amplitude multipliers (relative to normal)
  a: number;
  c: number;
  v: number;
  // descent emphasis (1 = normal, >1 steeper, <1 blunted)
  x: number;
  y: number;
  // special flags
  cannon?: boolean; // sporadic giant a-waves
  fusedCV?: boolean; // TR — c and v fuse into one systolic wave
  noA?: boolean; // AF — no a wave
}

const SCENARIOS: Record<ScenarioId, Scenario> = {
  normal: {
    id: "normal",
    label: "Normal",
    blurb: "Resting RA pressure 0–8 mmHg. a > v > c. x and y descents both visible.",
    a: 1, c: 0.5, v: 0.85, x: 1, y: 1,
  },
  af: {
    id: "af",
    label: "Atrial fibrillation",
    blurb: "No organised atrial systole → a wave absent. Irregularly irregular trace.",
    a: 0, c: 0.4, v: 0.9, x: 0.8, y: 1, noA: true,
  },
  tr: {
    id: "tr",
    label: "Tricuspid regurgitation",
    blurb: "Systolic regurgitation merges c and v into a giant systolic (CV) wave; x descent obliterated.",
    a: 1, c: 1.6, v: 2.2, x: 0.1, y: 1.3, fusedCV: true,
  },
  tamponade: {
    id: "tamponade",
    label: "Cardiac tamponade",
    blurb: "Steep x descent, blunted y (RV can't fill in diastole). Elevated mean pressure.",
    a: 1.1, c: 0.5, v: 0.9, x: 1.8, y: 0.15,
  },
  constrictive: {
    id: "constrictive",
    label: "Constrictive pericarditis",
    blurb: "Prominent x AND y descents → classic 'M' or 'W' waveform.",
    a: 1.2, c: 0.5, v: 1.1, x: 1.7, y: 1.9,
  },
  chb: {
    id: "chb",
    label: "Complete heart block",
    blurb: "AV dissociation → intermittent atrial contraction against a closed TV produces cannon a-waves.",
    a: 1, c: 0.5, v: 0.85, x: 1, y: 1, cannon: true,
  },
  rvh: {
    id: "rvh",
    label: "RVH / pulmonary HT / TS",
    blurb: "Atrium hypertrophies against stiff RV or stenotic TV → large a wave.",
    a: 2.2, c: 0.5, v: 0.9, x: 1, y: 0.7,
  },
};

// SVG layout
const VB_W = 720;
const VB_H = 280;
const PAD_L = 56;
const PAD_R = 24;
const PAD_T = 32;
const PAD_B = 56;
const PLOT_W = VB_W - PAD_L - PAD_R;
const PLOT_H = VB_H - PAD_T - PAD_B;
const CYCLES = 2;

const yMin = -2;
const yMax = 14;
const xToPx = (t: number) => PAD_L + (t / CYCLES) * PLOT_W;
const yToPx = (p: number) => PAD_T + PLOT_H * (1 - (p - yMin) / (yMax - yMin));

// Gaussian bump
const gauss = (t: number, c: number, w: number) =>
  Math.exp(-((t - c) ** 2) / (2 * w * w));

/**
 * Build one cycle of the waveform sampled at N points and return both the
 * point array and key landmark indices for annotation.
 */
function buildCycle(s: Scenario, cycleStart: number, isCannon: boolean) {
  const N = 220;
  const pts: { t: number; p: number }[] = [];
  // Centres (within cycle, t∈[0,1]):
  const aC = 0.08;
  const cC = 0.32;
  const vC = 0.70;
  // Effective a amplitude (cannon waves on selected cycles)
  const aAmp = isCannon ? 3.4 : s.a * 1.0;
  const cAmp = s.c * 0.6;
  const vAmp = s.fusedCV ? s.v * 1.0 : s.v * 0.9;

  for (let i = 0; i <= N; i++) {
    const t = i / N;
    // base mean pressure (elevated in tamponade/constrictive/TR)
    const base =
      s.id === "tamponade" ? 5 :
      s.id === "constrictive" ? 5 :
      s.id === "tr" ? 4 :
      s.id === "rvh" ? 3.5 :
      2;

    let p = base;
    if (!s.noA) p += aAmp * 3.2 * gauss(t, aC, 0.035);

    if (s.fusedCV) {
      // c and v fuse into one broad systolic wave
      p += 4.0 * s.v * gauss(t, 0.5, 0.13);
    } else {
      p += cAmp * 2.0 * gauss(t, cC, 0.03);
      p += vAmp * 3.0 * gauss(t, vC, 0.05);
    }

    // x descent (between c and v) — push trough deeper if s.x > 1
    const xTrough = 0.5;
    if (!s.fusedCV) {
      p -= (s.x - 0.6) * 1.4 * gauss(t, xTrough, 0.05);
    } else {
      // x descent obliterated
    }
    // y descent (after v wave)
    const yTrough = 0.86;
    p -= (s.y - 0.4) * 1.6 * gauss(t, yTrough, 0.05);

    pts.push({ t: cycleStart + t, p });
  }
  return pts;
}

export const JVPWaveformDiagram = () => {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("normal");
  const s = SCENARIOS[scenarioId];

  const { path, landmarks } = useMemo(() => {
    const allPts: { t: number; p: number }[] = [];
    for (let c = 0; c < CYCLES; c++) {
      // For CHB: make every other cycle a cannon a-wave
      const cannon = !!s.cannon && c === 1;
      allPts.push(...buildCycle(s, c, cannon));
    }
    const d = allPts
      .map((pt, i) => `${i === 0 ? "M" : "L"} ${xToPx(pt.t).toFixed(1)} ${yToPx(pt.p).toFixed(1)}`)
      .join(" ");

    // Landmarks within first cycle
    const lm = {
      a: { t: 0.08, label: "a" },
      c: { t: 0.32, label: "c" },
      x: { t: 0.50, label: "x" },
      v: { t: 0.70, label: "v" },
      y: { t: 0.86, label: "y" },
    };
    return { path: d, landmarks: lm };
  }, [s]);

  return (
    <DiagramFigure
      id="jvp-waveform"
      title="JVP / RA pressure waveform"
      description="Interactive jugular venous pressure trace showing a, c, v waves and x, y descents. Toggle scenarios to see pathological changes (AF, TR, tamponade, constrictive pericarditis, complete heart block, RVH)."
    >
      <div className="space-y-4">
        {/* Scenario chips */}
        <div className="flex flex-wrap gap-2">
          {(Object.values(SCENARIOS) as Scenario[]).map((sc) => (
            <button
              key={sc.id}
              onClick={() => setScenarioId(sc.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                scenarioId === sc.id
                  ? "bg-primary/15 border-primary/50 text-primary"
                  : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 rounded-lg border border-border bg-card p-3">
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full" role="img" aria-label="JVP waveform">
              {/* Axes */}
              <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + PLOT_H} stroke="hsl(var(--border))" />
              <line x1={PAD_L} y1={PAD_T + PLOT_H} x2={PAD_L + PLOT_W} y2={PAD_T + PLOT_H} stroke="hsl(var(--border))" />

              {/* Y-axis ticks */}
              {[0, 5, 10].map((p) => (
                <g key={p}>
                  <line x1={PAD_L - 4} y1={yToPx(p)} x2={PAD_L} y2={yToPx(p)} stroke="hsl(var(--border))" />
                  <text x={PAD_L - 8} y={yToPx(p) + 4} fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="end">{p}</text>
                </g>
              ))}
              <text
                x={14} y={PAD_T + PLOT_H / 2}
                fontSize="11" fill="hsl(var(--muted-foreground))"
                textAnchor="middle"
                transform={`rotate(-90 14 ${PAD_T + PLOT_H / 2})`}
              >RA pressure (mmHg)</text>

              {/* X-axis label */}
              <text x={PAD_L + PLOT_W / 2} y={VB_H - 32} fontSize="11" fill="hsl(var(--muted-foreground))" textAnchor="middle">
                Time → (2 cardiac cycles)
              </text>

              {/* Cycle separators */}
              <line x1={xToPx(1)} y1={PAD_T} x2={xToPx(1)} y2={PAD_T + PLOT_H}
                stroke="hsl(var(--border))" strokeDasharray="3 3" opacity="0.6" />

              {/* Waveform */}
              <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.2" strokeLinejoin="round" />

              {/* Landmark labels on first cycle */}
              {!s.fusedCV && !s.noA && (
                <g>
                  <LabelTick t={landmarks.a.t} label="a" color="hsl(25 85% 55%)" />
                </g>
              )}
              {!s.fusedCV && (
                <>
                  <LabelTick t={landmarks.c.t} label="c" color="hsl(45 80% 50%)" />
                  <LabelTick t={landmarks.v.t} label="v" color="hsl(280 60% 55%)" />
                  <DescentLabel t={landmarks.x.t} label="x" />
                  <DescentLabel t={landmarks.y.t} label="y" />
                </>
              )}
              {s.fusedCV && (
                <>
                  <LabelTick t={0.5} label="CV" color="hsl(0 75% 55%)" />
                  <DescentLabel t={0.86} label="y" />
                </>
              )}
              {s.noA && (
                <LabelTick t={0.32} label="c" color="hsl(45 80% 50%)" />
              )}

              {/* Cannon wave callout on cycle 2 */}
              {s.cannon && (
                <g>
                  <LabelTick t={1.08} label="cannon a" color="hsl(0 75% 55%)" />
                </g>
              )}
            </svg>
          </div>

          {/* Side panel */}
          <div className="lg:col-span-2 space-y-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">{s.label}</p>
              <p className="text-xs text-foreground/90 leading-relaxed">{s.blurb}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-2">Wave key</p>
              <ul className="text-[11px] text-muted-foreground space-y-1 leading-relaxed">
                <li><span className="font-semibold text-foreground">a</span> — atrial systole (absent in AF, giant in TS/PHT/RVH, cannon in CHB)</li>
                <li><span className="font-semibold text-foreground">c</span> — tricuspid bulge into RA at start of systole</li>
                <li><span className="font-semibold text-foreground">x</span> descent — atrial relaxation (prominent in tamponade & constriction)</li>
                <li><span className="font-semibold text-foreground">v</span> — atrial filling vs closed TV (giant CV in TR)</li>
                <li><span className="font-semibold text-foreground">y</span> descent — TV opens (steep in constriction, blunted in tamponade)</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-secondary/20 p-3">
              <p className="text-xs font-semibold text-foreground mb-1">Clinical pearls</p>
              <ul className="text-[11px] text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
                <li>JVP is the bedside surrogate for RA / CVP — same waves, no transducer needed.</li>
                <li>"M" or "W" pattern → think constrictive pericarditis.</li>
                <li>Loss of y descent + pulsus paradoxus → tamponade.</li>
                <li>Pulsatile JVP synchronous with carotid → TR.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

// ---------- helpers ----------
const LabelTick = ({ t, label, color }: { t: number; label: string; color: string }) => (
  <g>
    <line x1={xToPx(t)} y1={PAD_T + 4} x2={xToPx(t)} y2={PAD_T + PLOT_H}
      stroke={color} strokeDasharray="2 3" strokeWidth="1" opacity="0.55" />
    <rect x={xToPx(t) - 14} y={PAD_T - 14} width="28" height="16" rx="3" fill={color} opacity="0.18" />
    <text x={xToPx(t)} y={PAD_T - 2} fontSize="11" fontWeight="700" fill={color} textAnchor="middle">{label}</text>
  </g>
);

const DescentLabel = ({ t, label }: { t: number; label: string }) => (
  <g>
    <text x={xToPx(t)} y={PAD_T + PLOT_H + 14} fontSize="10" fontWeight="700"
      fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">{label}</text>
  </g>
);

export default JVPWaveformDiagram;
