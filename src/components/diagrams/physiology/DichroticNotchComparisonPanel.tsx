import { useState } from "react";
import { cn } from "@/lib/utils";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Side-by-side comparison of aortic pressure waveform morphology — focusing on
 * how the dichrotic notch is altered in common pathologies versus a normal
 * young adult. Each card renders a small SVG trace generated from a shared
 * parametric model whose coefficients vary per condition.
 */

type Condition = {
  id: string;
  label: string;
  oneLiner: string;
  notchChange: string;
  mechanism: string;
  examPearl: string;
  // waveform shaping
  sbp: number;
  dbp: number;
  notchDepth: number; // 0 = absent, 1 = sharp/deep
  upstrokeSpeed: number; // 1 = brisk, >1 = slow rising
  decay: number; // diastolic decay rate (higher = faster runoff)
  reflectionAmp: number; // late-systolic reflected wave amplitude
};

const CONDITIONS: Condition[] = [
  {
    id: "normal",
    label: "Normal (young adult)",
    oneLiner: "Sharp incisura, smooth diastolic decay.",
    notchChange: "Crisp, well-defined notch at AV closure.",
    mechanism: "Compliant aorta, competent valve, normal SVR.",
    examPearl: "Reference waveform — notch ≈ end of T-wave on ECG.",
    sbp: 120,
    dbp: 75,
    notchDepth: 1,
    upstrokeSpeed: 1,
    decay: 3,
    reflectionAmp: 0,
  },
  {
    id: "ar",
    label: "Aortic regurgitation",
    oneLiner: "Wide pulse pressure, notch blurred or lost.",
    notchChange: "Notch attenuated/absent — diastolic 'collapse'.",
    mechanism: "Incompetent AV → diastolic backflow into LV; no clean closure event and rapid run-off into the ventricle drops DBP.",
    examPearl: "Waterhammer / Corrigan's pulse; widened pulse pressure; Quincke's, Duroziez, de Musset signs.",
    sbp: 160,
    dbp: 45,
    notchDepth: 0.1,
    upstrokeSpeed: 0.85,
    decay: 5.5,
    reflectionAmp: 0,
  },
  {
    id: "as",
    label: "Aortic stenosis",
    oneLiner: "Slow-rising pulse, late delayed notch.",
    notchChange: "Notch is small, late, and may show an anacrotic shoulder on the upstroke.",
    mechanism: "Fixed LVOT obstruction → prolonged ejection, reduced peak; anacrotic notch on upstroke from turbulent flow across stenotic valve.",
    examPearl: "Pulsus parvus et tardus; narrow pulse pressure; ESM radiating to carotids.",
    sbp: 105,
    dbp: 70,
    notchDepth: 0.55,
    upstrokeSpeed: 2.2,
    decay: 2.5,
    reflectionAmp: 0,
  },
  {
    id: "sepsis",
    label: "Sepsis / warm shock",
    oneLiner: "Low DBP, wide PP, shallow notch.",
    notchChange: "Notch shallow and small — diastolic pressure decays fast.",
    mechanism: "Vasoplegia → low SVR; rapid diastolic run-off; high CO state with hyperdynamic LV produces wide pulse pressure.",
    examPearl: "Bounding pulse, warm peripheries, wide PP, low DBP; lactate ↑, vasopressor requirement.",
    sbp: 110,
    dbp: 45,
    notchDepth: 0.35,
    upstrokeSpeed: 0.9,
    decay: 5,
    reflectionAmp: 0,
  },
  {
    id: "aging",
    label: "Aging / stiff arteries",
    oneLiner: "Late systolic peak from reflected wave.",
    notchChange: "Notch blunted; a secondary late-systolic peak appears before it (augmented Pmax).",
    mechanism: "Reduced arterial compliance → reflected pressure waves return during systole rather than diastole, raising SBP and the augmentation index.",
    examPearl: "Isolated systolic hypertension; ↑ augmentation index; ↑ pulse-wave velocity.",
    sbp: 155,
    dbp: 75,
    notchDepth: 0.3,
    upstrokeSpeed: 1,
    decay: 3,
    reflectionAmp: 12,
  },
];

// SVG geometry for the mini-trace
const W = 260;
const H = 120;
const PAD_L = 28;
const PAD_R = 8;
const PAD_T = 10;
const PAD_B = 18;
const PW = W - PAD_L - PAD_R;
const PH = H - PAD_T - PAD_B;

const P_MIN = 30;
const P_MAX = 180;

const xT = (t: number) => PAD_L + t * PW;
const yP = (p: number) => PAD_T + PH * (1 - (p - P_MIN) / (P_MAX - P_MIN));

const NOTCH_T = 0.55;

const pressureFor = (c: Condition, t: number): number => {
  const u = ((t % 1) + 1) % 1;
  const { sbp, dbp, notchDepth, upstrokeSpeed, decay, reflectionAmp } = c;
  const notchP = dbp + (sbp - dbp) * 0.45;

  // Upstroke window stretches with upstrokeSpeed (>1 = slower/later peak)
  const upStart = 0.05;
  const upEnd = Math.min(0.45, 0.05 + 0.25 * upstrokeSpeed);
  const peakT = upEnd;

  if (u < upStart) return dbp;

  if (u < upEnd) {
    const x = (u - upStart) / (upEnd - upStart);
    return dbp + (sbp - dbp) * Math.sin((Math.PI / 2) * x);
  }

  if (u < NOTCH_T) {
    const x = (u - peakT) / (NOTCH_T - peakT);
    let p = sbp - (sbp - notchP) * (0.5 - 0.5 * Math.cos(Math.PI * x));
    // Late-systolic reflected wave (aging arteries)
    if (reflectionAmp > 0) {
      p += reflectionAmp * Math.sin(Math.PI * x) * (1 - 0.3 * x);
    }
    return p;
  }

  if (u < NOTCH_T + 0.04) {
    // Notch dip + small rebound, scaled by notchDepth
    const x = (u - NOTCH_T) / 0.04;
    const dip = notchP - 5 * notchDepth * Math.sin(Math.PI * x);
    return dip + 2 * notchDepth * x;
  }

  const x = (u - (NOTCH_T + 0.04)) / (1 - (NOTCH_T + 0.04));
  return dbp + (notchP + 2 - dbp) * Math.exp(-decay * x);
};

const buildPath = (c: Condition): string => {
  const N = 160;
  let d = "";
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = xT(t);
    const y = yP(pressureFor(c, t));
    d += i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
};

const NormalOverlay = ({ active }: { active: boolean }) => {
  if (active) return null;
  const normal = CONDITIONS[0];
  return (
    <path
      d={buildPath(normal)}
      fill="none"
      stroke="hsl(var(--muted-foreground) / 0.35)"
      strokeWidth={1}
      strokeDasharray="3 3"
    />
  );
};

const MiniWaveform = ({ c, isNormal }: { c: Condition; isNormal: boolean }) => {
  const notchX = xT(NOTCH_T);
  const notchY = yP(pressureFor(c, NOTCH_T));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${c.label} aortic waveform`}>
      {/* gridlines */}
      {[60, 100, 140].map((p) => (
        <g key={p}>
          <line
            x1={PAD_L}
            x2={PAD_L + PW}
            y1={yP(p)}
            y2={yP(p)}
            stroke="hsl(var(--border))"
            strokeDasharray="2 4"
            strokeWidth={0.75}
          />
          <text x={PAD_L - 4} y={yP(p) + 3} textAnchor="end" fontSize={8} fill="hsl(var(--muted-foreground))">
            {p}
          </text>
        </g>
      ))}
      {/* axes */}
      <line x1={PAD_L} x2={PAD_L + PW} y1={PAD_T + PH} y2={PAD_T + PH} stroke="hsl(var(--foreground))" strokeWidth={0.75} />
      <line x1={PAD_L} x2={PAD_L} y1={PAD_T} y2={PAD_T + PH} stroke="hsl(var(--foreground))" strokeWidth={0.75} />

      <NormalOverlay active={isNormal} />

      <path
        d={buildPath(c)}
        fill="none"
        stroke={isNormal ? "hsl(var(--physiology))" : "hsl(var(--clinical))"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* notch marker */}
      <line
        x1={notchX}
        x2={notchX}
        y1={PAD_T}
        y2={PAD_T + PH}
        stroke="hsl(var(--primary))"
        strokeDasharray="3 3"
        strokeWidth={0.75}
        opacity={0.5}
      />
      <circle cx={notchX} cy={notchY} r={2.6} fill="hsl(var(--primary))" />

      {/* SBP/DBP labels */}
      <text x={PAD_L + PW - 2} y={PAD_T + 10} textAnchor="end" fontSize={9} fontWeight={600} fill="hsl(var(--physiology))">
        SBP {c.sbp}
      </text>
      <text x={PAD_L + PW - 2} y={PAD_T + PH - 4} textAnchor="end" fontSize={9} fontWeight={600} fill="hsl(var(--clinical))">
        DBP {c.dbp}
      </text>
      <text x={PAD_L + PW / 2} y={H - 4} textAnchor="middle" fontSize={8} fill="hsl(var(--muted-foreground))">
        one cardiac cycle
      </text>
    </svg>
  );
};

const DichroticNotchComparisonPanel = () => {
  const [activeId, setActiveId] = useState<string>("normal");
  const active = CONDITIONS.find((c) => c.id === activeId) ?? CONDITIONS[0];

  return (
    <DiagramFigure
      id="dichrotic-notch-comparison-panel"
      title="Dichrotic notch comparison panel"
      description="Auto-generated wrapper for the Dichrotic notch comparison panel anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {CONDITIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={cn(
                "px-2.5 py-1 text-xs rounded-md border transition-colors",
                activeId === c.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-muted"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
  
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONDITIONS.map((c) => {
            const isActive = c.id === activeId;
            return (
                  <button
                key={c.id}
                type="button"
                onClick={() => setActiveId(c.id)}
                className={cn(
                  "text-left rounded-xl border bg-card p-3 transition-all",
                  isActive
                    ? "border-primary shadow-md ring-2 ring-primary/30"
                    : "border-border hover:border-primary/40 hover:shadow-sm"
                )}
              >
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-foreground">{c.label}</h4>
                  {c.id !== "normal" && (
                    <span className="text-[10px] text-muted-foreground">vs normal —</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{c.oneLiner}</p>
                <MiniWaveform c={c} isNormal={c.id === "normal"} />
              </button>
    );
          })}
        </div>
  
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="text-sm font-semibold text-foreground">{active.label}</h4>
            <span className="text-[11px] text-muted-foreground">
              SBP {active.sbp} / DBP {active.dbp} mmHg
            </span>
          </div>
          <dl className="grid sm:grid-cols-3 gap-3 text-xs">
            <div>
              <dt className="font-semibold text-foreground mb-0.5">Notch change</dt>
              <dd className="text-muted-foreground">{active.notchChange}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground mb-0.5">Mechanism</dt>
              <dd className="text-muted-foreground">{active.mechanism}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground mb-0.5">Exam pearl</dt>
              <dd className="text-muted-foreground">{active.examPearl}</dd>
            </div>
          </dl>
        </div>
  
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Dashed grey line on each card = normal reference waveform for direct shape comparison. The primary-coloured dot marks where the dichrotic notch sits in time; its <em>amplitude</em> and <em>sharpness</em> are what change across these pathologies.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default DichroticNotchComparisonPanel;
