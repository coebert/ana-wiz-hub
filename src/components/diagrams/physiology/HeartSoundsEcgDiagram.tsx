import { useMemo, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Interactive "heart sounds vs ECG" diagram.
 *
 * Companion to <WiggersDiagram />: instead of the full pressure/volume
 * stack it isolates the timing relationship between the ECG, the cardiac
 * cycle phases and the auscultatory findings (S1–S4, added sounds and
 * murmurs) for a set of exam-classic scenarios.
 *
 * All geometry is expressed on a single normalised time axis (0–100 =
 * one cardiac cycle) so the ECG, the systole/diastole shading and the
 * sound markers are guaranteed to line up.
 */

interface SoundMarker {
  /** 0–100 position on the cycle axis. */
  t: number;
  label: string;
  detail: string;
  /** Render as a faint/soft marker (e.g. low-pitched gallop). */
  soft?: boolean;
}

interface Murmur {
  start: number;
  end: number;
  label: string;
  /** "crescendo-decrescendo" | "plateau" | "decrescendo" */
  shape: "diamond" | "plateau" | "decrescendo";
}

interface Scenario {
  id: string;
  name: string;
  short: string;
  /** ECG configuration on the same 0–100 axis. */
  ecg: {
    /** P-wave positions; empty array = no organised P waves (e.g. AF). */
    p: number[];
    /** QRS position. */
    qrs: number;
    /** Wide QRS (e.g. bundle branch block). */
    wide?: boolean;
    /** T-wave position. */
    t: number;
  };
  sounds: SoundMarker[];
  murmur?: Murmur;
  /** One-line link back to the Wiggers pressure explanation. */
  mechanism: string;
  examPoint: string;
}

/** Aortic valve closes at ~t=45 in this schematic; mitral closes at ~t=8. */
const S1_T = 8;
const S2_T = 45;

const SCENARIOS: Scenario[] = [
  {
    id: "normal",
    name: "Normal",
    short: "S1 + S2 only",
    ecg: { p: [0], qrs: 6, t: 30 },
    sounds: [
      { t: S1_T, label: "S1", detail: "Mitral then tricuspid closure at the onset of isovolumetric contraction — LV pressure has just crossed LA pressure." },
      { t: S2_T, label: "S2", detail: "Aortic then pulmonary closure at the onset of isovolumetric relaxation — LV pressure has fallen below aortic pressure, producing the dicrotic notch." },
    ],
    mechanism:
      "S1 marks the start of systole and S2 its end, so the S1–S2 interval is systole and the S2–S1 interval is diastole.",
    examPoint:
      "At rest diastole is longer than systole; as heart rate rises diastole shortens preferentially, which is why the two sounds appear to 'even out' in tachycardia.",
  },
  {
    id: "split-s2",
    name: "Physiological split S2",
    short: "A2 before P2 on inspiration",
    ecg: { p: [0], qrs: 6, t: 30 },
    sounds: [
      { t: S1_T, label: "S1", detail: "Single: mitral and tricuspid closure are near-simultaneous." },
      { t: S2_T, label: "A2", detail: "Aortic closure — earlier because LV ejection is shorter and LV pressure falls faster." },
      { t: S2_T + 5, label: "P2", detail: "Pulmonary closure — delayed on inspiration as negative intrathoracic pressure increases venous return and prolongs RV ejection." },
    ],
    mechanism:
      "Inspiration augments RV filling and simultaneously pools blood in the pulmonary circulation, delaying P2 and advancing A2.",
    examPoint:
      "Widened but still variable split = RBBB or pulmonary stenosis. Fixed split = ASD. Reversed (paradoxical) split = LBBB, severe AS or RV pacing, where P2 precedes A2 and the split widens on expiration.",
  },
  {
    id: "s3",
    name: "Third heart sound (S3)",
    short: "Early diastolic gallop",
    ecg: { p: [0], qrs: 6, t: 30 },
    sounds: [
      { t: S1_T, label: "S1", detail: "Normal." },
      { t: S2_T, label: "S2", detail: "Normal." },
      { t: 62, label: "S3", soft: true, detail: "Low-pitched sound 0.12–0.18 s after S2, during the rapid passive filling phase — abrupt deceleration of inrushing blood against a dilated, poorly compliant ventricle." },
    ],
    mechanism:
      "Occurs in the rapid-filling phase of the Wiggers diagram, immediately after mitral valve opening and the y descent.",
    examPoint:
      "Physiological under ~40 years and in pregnancy. Pathological S3 implies volume overload — decompensated heart failure, severe MR or AR — and predicts raised LV filling pressure.",
  },
  {
    id: "s4",
    name: "Fourth heart sound (S4)",
    short: "Presystolic gallop",
    ecg: { p: [0], qrs: 6, t: 30 },
    sounds: [
      { t: 96, label: "S4", soft: true, detail: "Low-pitched sound just before S1, coincident with the P wave and the a wave of the atrial pressure trace." },
      { t: S1_T, label: "S1", detail: "Normal." },
      { t: S2_T, label: "S2", detail: "Normal." },
    ],
    mechanism:
      "Forceful atrial contraction ('atrial kick') into a stiff, non-compliant ventricle during atrial systole.",
    examPoint:
      "Always pathological in adults: LVH, aortic stenosis, hypertensive heart disease, ischaemia, HOCM. Requires organised atrial contraction — an S4 is impossible in atrial fibrillation.",
  },
  {
    id: "as",
    name: "Aortic stenosis",
    short: "Ejection systolic murmur",
    ecg: { p: [0], qrs: 6, t: 32 },
    murmur: { start: 12, end: 44, label: "Ejection systolic murmur → carotids", shape: "diamond" },
    sounds: [
      { t: 96, label: "S4", soft: true, detail: "Common: LVH makes the ventricle stiff, so atrial systole produces an audible presystolic sound." },
      { t: S1_T, label: "S1", detail: "Normal or soft." },
      { t: S2_T, label: "A2", detail: "Soft or absent in severe AS; may be reversed-split because LV ejection is prolonged." },
    ],
    mechanism:
      "Turbulent flow across the stenosed valve begins only after the aortic valve opens (so the murmur starts after S1) and stops before the valve closes (so it ends before S2).",
    examPoint:
      "Severity markers: late-peaking murmur, soft/absent A2, reversed splitting, slow-rising low-volume pulse, S4, narrow pulse pressure. Anaesthetic aim — maintain sinus rhythm, adequate preload and SVR, avoid tachycardia.",
  },
  {
    id: "mr",
    name: "Mitral regurgitation",
    short: "Pansystolic murmur",
    ecg: { p: [0], qrs: 6, t: 30 },
    murmur: { start: S1_T, end: S2_T, label: "Pansystolic murmur → axilla", shape: "plateau" },
    sounds: [
      { t: S1_T, label: "S1", detail: "Soft — the mitral valve does not close competently." },
      { t: S2_T, label: "S2", detail: "May be widely split because LV emptying into the low-impedance atrium shortens ejection and advances A2." },
      { t: 62, label: "S3", soft: true, detail: "Reflects a large regurgitant volume returning rapidly in early diastole; in severe MR it is a volume-overload sign, not necessarily failure." },
    ],
    mechanism:
      "The LV–LA pressure gradient exists from the moment of mitral closure to the moment it reopens, so flow (and therefore the murmur) fills the whole of systole and obscures S1 and S2.",
    examPoint:
      "Pansystolic + apex + radiates to axilla = MR. Contrast with the ejection systolic (diamond) murmur of AS, which has a clear gap after S1. Anaesthetic aim — keep the patient 'full, fast and vasodilated'.",
  },
  {
    id: "ms",
    name: "Mitral stenosis",
    short: "Opening snap + diastolic rumble",
    ecg: { p: [0], qrs: 6, t: 30 },
    murmur: { start: 58, end: 96, label: "Mid-diastolic rumble with presystolic accentuation", shape: "decrescendo" },
    sounds: [
      { t: S1_T, label: "S1", detail: "Loud ('tapping' apex) — the thickened valve is still wide open at the onset of systole and shuts abruptly." },
      { t: S2_T, label: "S2", detail: "Normal." },
      { t: 55, label: "OS", detail: "Opening snap: abrupt halt of the doming stenotic mitral valve. A short A2–OS interval indicates a high LA pressure and therefore severe stenosis." },
    ],
    mechanism:
      "The LA–LV diastolic gradient that normally disappears within milliseconds persists all through diastole, so the murmur occupies diastole rather than systole.",
    examPoint:
      "Presystolic accentuation disappears once atrial fibrillation supervenes, since it depends on atrial contraction. Tachycardia is dangerous — it shortens diastole and abolishes filling time.",
  },
  {
    id: "af",
    name: "Atrial fibrillation",
    short: "No P wave, no a wave, no S4",
    ecg: { p: [], qrs: 6, t: 30 },
    sounds: [
      { t: S1_T, label: "S1", detail: "Variable intensity, because diastolic filling time — and therefore mitral leaflet position at the onset of systole — varies beat to beat." },
      { t: S2_T, label: "S2", detail: "Normal." },
    ],
    mechanism:
      "Loss of organised atrial systole removes the atrial kick (up to 25% of stroke volume) and abolishes the a wave on the atrial pressure trace.",
    examPoint:
      "Three findings vanish together in AF: the P wave, the a wave on the CVP/PAWP trace, and S4. Worst tolerated where filling depends on the atrial kick — mitral stenosis, AS, HOCM, diastolic dysfunction.",
  },
  {
    id: "chb",
    name: "Complete heart block",
    short: "Variable S1 + cannon a waves",
    ecg: { p: [0, 34, 68], qrs: 6, wide: true, t: 32 },
    sounds: [
      { t: S1_T, label: "S1", detail: "Intensity varies randomly because atrial and ventricular contraction are dissociated, so mitral leaflet position at ventricular systole is unpredictable." },
      { t: S2_T, label: "S2", detail: "Normal." },
    ],
    mechanism:
      "P waves march through independently of the QRS. When atrial systole happens to occur against a closed tricuspid valve, a cannon a wave is transmitted up the JVP.",
    examPoint:
      "Irregular cannon a waves = complete heart block; regular cannon a waves = junctional rhythm or VT with 1:1 retrograde conduction. Escape rhythm is slow and wide when it arises below the AV node.",
  },
];

/** Build an ECG polyline on the 0–100 cycle axis, y in SVG units. */
function ecgPath(cfg: Scenario["ecg"], baseline: number, gain: number): string {
  const pts: Array<[number, number]> = [[-4, baseline]];
  const push = (x: number, y: number) => pts.push([x, y]);

  const pWave = (centre: number) => {
    push(centre - 4, baseline);
    push(centre - 2, baseline - 4 * gain);
    push(centre, baseline - 5 * gain);
    push(centre + 2, baseline - 4 * gain);
    push(centre + 4, baseline);
  };
  const qrs = (centre: number, wide?: boolean) => {
    const w = wide ? 2 : 1;
    push(centre - 1.5 * w, baseline);
    push(centre - 1 * w, baseline + 4 * gain);
    push(centre, baseline - 26 * gain);
    push(centre + 1 * w, baseline + 8 * gain);
    push(centre + 2 * w, baseline);
  };
  const tWave = (centre: number) => {
    push(centre - 7, baseline);
    push(centre - 3, baseline - 7 * gain);
    push(centre, baseline - 8 * gain);
    push(centre + 4, baseline - 6 * gain);
    push(centre + 8, baseline);
  };

  const events: Array<{ x: number; draw: () => void }> = [];
  for (const p of cfg.p) events.push({ x: p, draw: () => pWave(p) });
  events.push({ x: cfg.qrs, draw: () => qrs(cfg.qrs, cfg.wide) });
  events.push({ x: cfg.t, draw: () => tWave(cfg.t) });
  events.sort((a, b) => a.x - b.x);
  for (const e of events) e.draw();

  push(104, baseline);
  return pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
}

function murmurPath(m: Murmur, baseline: number): string {
  const mid = (m.start + m.end) / 2;
  const h = 9;
  if (m.shape === "plateau") {
    return `M${m.start},${baseline} L${m.start},${baseline - h} L${m.end},${baseline - h} L${m.end},${baseline} Z`;
  }
  if (m.shape === "decrescendo") {
    return `M${m.start},${baseline} L${m.start},${baseline - h} L${m.end},${baseline - 1.5} Z`;
  }
  return `M${m.start},${baseline} L${mid},${baseline - h} L${m.end},${baseline} Z`;
}

export const HeartSoundsEcgDiagram = () => {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const [selectedSound, setSelectedSound] = useState<string | null>(null);

  const scenario = useMemo(
    () => SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0],
    [activeId],
  );

  const detail = useMemo(() => {
    if (!selectedSound) return null;
    return scenario.sounds.find((s) => s.label === selectedSound) ?? null;
  }, [selectedSound, scenario]);

  const ECG_BASE = 34;
  const SOUND_BASE = 76;

  return (
    <div className="my-6 space-y-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a clinical scenario">
        {SCENARIOS.map((s) => {
          const active = s.id === scenario.id;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setActiveId(s.id);
                setSelectedSound(null);
              }}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "border-physiology bg-physiology/15 text-physiology"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      <DiagramFigure
        id="heart-sounds-ecg"
        title={`ECG and heart sounds in ${scenario.name}`}
        description={`${scenario.short}. ${scenario.mechanism}`}
        className="rounded-xl border border-border bg-card p-4"
      >
        <svg
          viewBox="-6 0 116 100"
          className="w-full h-auto"
          role="img"
          aria-labelledby="heart-sounds-ecg-figure-title heart-sounds-ecg-figure-desc"
        >
          {/* Systole / diastole shading */}
          <rect
            x={S1_T}
            y={8}
            width={S2_T - S1_T}
            height={62}
            fill="hsl(var(--physiology) / 0.10)"
          />
          <text x={(S1_T + S2_T) / 2} y={14} textAnchor="middle" fontSize="4.2" fill="hsl(var(--muted-foreground))">
            Systole
          </text>
          <text x={(S2_T + 100 + S1_T) / 2} y={14} textAnchor="middle" fontSize="4.2" fill="hsl(var(--muted-foreground))">
            Diastole
          </text>

          {/* Valve-event guide lines */}
          {[S1_T, S2_T].map((x) => (
            <line
              key={x}
              x1={x}
              y1={16}
              x2={x}
              y2={SOUND_BASE + 4}
              stroke="hsl(var(--border))"
              strokeWidth="0.4"
              strokeDasharray="2 2"
            />
          ))}

          {/* ECG */}
          <text x={-5} y={ECG_BASE - 12} fontSize="4" fill="hsl(var(--muted-foreground))">
            ECG
          </text>
          <line x1={-4} y1={ECG_BASE} x2={104} y2={ECG_BASE} stroke="hsl(var(--border))" strokeWidth="0.3" />
          <path
            d={ecgPath(scenario.ecg, ECG_BASE, 1)}
            fill="none"
            stroke="hsl(var(--physiology))"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          {scenario.ecg.p.length === 0 && (
            <text x={20} y={ECG_BASE - 8} fontSize="3.6" fill="hsl(var(--muted-foreground))">
              no organised P waves
            </text>
          )}
          {scenario.id === "chb" && (
            <text x={40} y={ECG_BASE - 10} fontSize="3.6" fill="hsl(var(--muted-foreground))">
              dissociated P waves
            </text>
          )}

          {/* Murmur envelope */}
          <text x={-5} y={SOUND_BASE + 5} fontSize="4" fill="hsl(var(--muted-foreground))">
            Sounds
          </text>
          <line x1={-4} y1={SOUND_BASE} x2={104} y2={SOUND_BASE} stroke="hsl(var(--border))" strokeWidth="0.3" />
          {scenario.murmur && (
            <>
              <path
                d={murmurPath(scenario.murmur, SOUND_BASE)}
                fill="hsl(var(--primary) / 0.25)"
                stroke="hsl(var(--primary))"
                strokeWidth="0.4"
              />
              <text
                x={Math.min(Math.max((scenario.murmur.start + scenario.murmur.end) / 2, 26), 74)}
                y={SOUND_BASE + 14}
                textAnchor="middle"
                fontSize="3.4"
                fill="hsl(var(--foreground))"
              >
                {scenario.murmur.label}
              </text>
            </>
          )}

          {/* Heart sound markers */}
          {scenario.sounds.map((s) => {
            const isSelected = selectedSound === s.label;
            return (
              <g
                key={s.label}
                role="button"
                tabIndex={0}
                aria-label={`${s.label}: ${s.detail}`}
                onClick={() => setSelectedSound(isSelected ? null : s.label)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedSound(isSelected ? null : s.label);
                  }
                }}
                className="cursor-pointer"
              >
                <line
                  x1={s.t}
                  y1={SOUND_BASE}
                  x2={s.t}
                  y2={SOUND_BASE - (s.soft ? 6 : 11)}
                  stroke="hsl(var(--foreground))"
                  strokeWidth={s.soft ? 0.7 : 1.2}
                  strokeDasharray={s.soft ? "1.5 1.5" : undefined}
                />
                <circle
                  cx={s.t}
                  cy={SOUND_BASE - (s.soft ? 6 : 11)}
                  r={isSelected ? 3.2 : 2.4}
                  fill={isSelected ? "hsl(var(--primary))" : "hsl(var(--card))"}
                  stroke="hsl(var(--foreground))"
                  strokeWidth="0.6"
                />
                <text
                  x={s.t}
                  y={SOUND_BASE - (s.soft ? 10.5 : 15.5)}
                  textAnchor="middle"
                  fontSize="4"
                  fontWeight="600"
                  fill="hsl(var(--foreground))"
                >
                  {s.label}
                </text>
              </g>
            );
          })}

          {/* Time axis */}
          <text x={0} y={96} fontSize="3.6" fill="hsl(var(--muted-foreground))">
            0
          </text>
          <text x={100} y={96} textAnchor="end" fontSize="3.6" fill="hsl(var(--muted-foreground))">
            one cardiac cycle
          </text>
          <line x1={0} y1={90} x2={100} y2={90} stroke="hsl(var(--border))" strokeWidth="0.4" />
        </svg>
      </DiagramFigure>

      <div aria-live="polite" className="rounded-lg border border-border bg-secondary/30 p-4 text-sm">
        {detail ? (
          <p className="text-foreground">
            <strong>{detail.label}.</strong> {detail.detail}
          </p>
        ) : (
          <p className="text-muted-foreground">
            Select a sound marker (S1, S2, S3, S4, A2/P2, OS) for its mechanism.
          </p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Why it happens
          </p>
          <p className="mt-1 text-sm text-foreground">{scenario.mechanism}</p>
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Exam point
          </p>
          <p className="mt-1 text-sm text-foreground">{scenario.examPoint}</p>
        </div>
      </div>
    </div>
  );
};

export default HeartSoundsEcgDiagram;
