import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "./DiagramToggleBar";

/**
 * Bradyarrhythmia series — sinus brady, sinus arrest, junctional escape,
 * ventricular escape, sick sinus / brady-tachy. Sibling to
 * TachyarrhythmiaDiagram — same mini-tree + rhythm-strip language.
 */

type BradyKey = "sinus-brady" | "sinus-arrest" | "junctional" | "ventricular" | "sss";

type FocusKind =
  | "sa-slow"        // sinus brady — slow SA pacemaker
  | "sa-fail"        // sinus arrest — SA fails, pause
  | "junc-escape"    // AV junction escape
  | "vent-escape"    // ventricular escape from below bundle
  | "brady-tachy";   // SSS — alternating slow + fast

interface BradyInfo {
  label: string;
  shortLabel: string;
  color: string;
  focus: FocusKind;
  pacemaker: "SA" | "AV junction" | "Ventricle" | "Variable";
  rate: string;
  qrs: "narrow" | "wide" | "narrow→wide" | "variable";
  ecg: string;
  pathophysiology: string;
  management: string;
  device: string;
}

const BRADYS: Record<BradyKey, BradyInfo> = {
  "sinus-brady": {
    label: "Sinus bradycardia",
    shortLabel: "Sinus brady",
    color: "hsl(210, 70%, 50%)",
    focus: "sa-slow",
    pacemaker: "SA",
    rate: "< 60 bpm (often 40–60)",
    qrs: "narrow",
    ecg: "Normal P before every QRS, regular, narrow QRS, slow rate.",
    pathophysiology: "Physiological in athletes / sleep. Pathological: ↑ vagal tone, β-blockers, CCBs, digoxin, hypothyroidism, ↑ICP, hypothermia, inferior MI.",
    management: "Asymptomatic → none. Symptomatic: atropine 500 mcg → 3 mg. Stop offending drug. Pacing if persistent / symptomatic.",
    device: "None unless symptomatic / drug-refractory",
  },
  "sinus-arrest": {
    label: "Sinus arrest / SA exit block",
    shortLabel: "SA arrest",
    color: "hsl(190, 70%, 45%)",
    focus: "sa-fail",
    pacemaker: "SA",
    rate: "Pauses > 3 s; baseline rate variable",
    qrs: "narrow",
    ecg: "Sudden absent P-QRS-T for one or more cycles. Pause is NOT a multiple of the P-P interval (vs SA exit block, which is).",
    pathophysiology: "SA node fails to fire (arrest) or impulse blocked at SA-atrial junction (exit block). Vagal, ischaemia (RCA), drugs, infiltrative disease.",
    management: "Atropine acutely if symptomatic / haemodynamic compromise. Stop nodal blockers. Permanent pacemaker if recurrent symptomatic pauses.",
    device: "PPM (AAI or DDD) if symptomatic",
  },
  junctional: {
    label: "Junctional escape rhythm",
    shortLabel: "Junctional",
    color: "hsl(45, 80%, 45%)",
    focus: "junc-escape",
    pacemaker: "AV junction",
    rate: "40–60 bpm (intrinsic AV node rate)",
    qrs: "narrow",
    ecg: "Narrow regular QRS at 40–60. P absent, inverted in II/III/aVF, or just after QRS (retrograde atrial activation).",
    pathophysiology: "AV junction takes over when SA fails or sinus rate drops below junctional rate. Common in vagal episodes, inferior MI, digoxin toxicity.",
    management: "Treat underlying cause. Atropine if symptomatic. Pacing if persistent symptomatic bradycardia.",
    device: "PPM if persistent symptomatic; usually transient",
  },
  ventricular: {
    label: "Ventricular escape rhythm",
    shortLabel: "V escape",
    color: "hsl(0, 70%, 50%)",
    focus: "vent-escape",
    pacemaker: "Ventricle",
    rate: "20–40 bpm (intrinsic ventricular rate)",
    qrs: "wide",
    ecg: "Wide bizarre QRS at 20–40, often regular. No P-wave relationship. Seen in complete heart block.",
    pathophysiology: "Last-resort pacemaker below the bundle of His when both SA and AV fail. Unstable — risk of asystole or degeneration to VF.",
    management: "URGENT. Atropine often ineffective (subnodal). Transcutaneous → transvenous pacing. Isoprenaline / adrenaline infusion as bridge. Permanent pacemaker.",
    device: "Urgent temporary then PPM (DDD)",
  },
  sss: {
    label: "Sick sinus / brady-tachy syndrome",
    shortLabel: "SSS",
    color: "hsl(280, 60%, 50%)",
    focus: "brady-tachy",
    pacemaker: "Variable",
    rate: "Alternating slow (< 50) and fast (often AF / atrial tach > 100)",
    qrs: "variable",
    ecg: "Periods of sinus bradycardia / arrest alternating with atrial tachyarrhythmias (often AF). Long pauses after termination of tachy.",
    pathophysiology: "Degenerative SA node disease ± atrial fibrosis. Common in elderly. Impaired chronotropic response.",
    management: "PPM (usually DDD with rate response) for the brady component, then add rate-control / anticoagulation for the tachy component. Anticoagulate per CHA₂DS₂-VASc.",
    device: "DDDR pacemaker + AF rate control + anticoagulation",
  },
};

const ORDER: BradyKey[] = ["sinus-brady", "sinus-arrest", "junctional", "ventricular", "sss"];

/* ───────────── Mini conduction tree ───────────── */

const TreeMini = ({ brady, color }: { brady: BradyInfo; color: string }) => {
  const dim = "hsl(var(--muted-foreground))";
  const ok = "hsl(var(--foreground))";
  const uid = brady.shortLabel.replace(/\s/g, "-");

  // Which structures are the active pacemaker?
  const saActive = brady.focus === "sa-slow";
  const saSilent = brady.focus === "sa-fail" || brady.focus === "junc-escape" || brady.focus === "vent-escape";
  const juncActive = brady.focus === "junc-escape";
  const ventActive = brady.focus === "vent-escape";
  const alternating = brady.focus === "brady-tachy";

  return (
    <svg viewBox="0 0 180 200" className="w-full max-w-none sm:max-w-[200px] mx-auto" role="img" aria-label={`Conduction tree showing ${brady.label}`}>
      <defs>
        <radialGradient id={`brady-bg-${uid}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.04" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="180" height="200" rx="8" fill={`url(#brady-bg-${uid})`} stroke="hsl(var(--border))" strokeWidth="0.5" />

      {/* Heart silhouette */}
      <path
        d="M 90 25 C 38 25 18 65 30 115 C 42 155 72 175 90 188 C 108 175 138 155 150 115 C 162 65 142 25 90 25 Z"
        fill="hsl(0, 30%, 88%)"
        fillOpacity="0.22"
        stroke="hsl(var(--border))"
        strokeWidth="0.6"
      />
      <line x1="90" y1="35" x2="90" y2="180" stroke="hsl(var(--border))" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.45" />
      <line x1="35" y1="105" x2="145" y2="105" stroke="hsl(var(--border))" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.45" />

      {/* SA node */}
      <g>
        <circle
          cx="118"
          cy="42"
          r={saActive || alternating ? 5 : saSilent ? 3.5 : 4}
          fill={saSilent ? "hsl(var(--muted))" : saActive || alternating ? color : ok}
          stroke={saSilent ? color : "none"}
          strokeWidth="1.2"
          strokeDasharray={saSilent ? "2 1.5" : undefined}
        >
          {saActive && (
            <animate attributeName="opacity" values="0.5;1;0.5" dur="1.4s" repeatCount="indefinite" />
          )}
          {alternating && (
            <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite" />
          )}
        </circle>
        <text x="124" y="44" fontSize="6" fill={dim}>SA</text>
        {saSilent && (
          <g>
            <line x1="113" y1="37" x2="123" y2="47" stroke={color} strokeWidth="1.4" />
            <line x1="123" y1="37" x2="113" y2="47" stroke={color} strokeWidth="1.4" />
          </g>
        )}
      </g>

      {/* AV node */}
      <circle
        cx="90"
        cy="105"
        r={juncActive ? 6 : 4.5}
        fill={juncActive ? color : ok}
        stroke={juncActive ? color : "none"}
        strokeWidth="1.4"
      >
        {juncActive && (
          <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
        )}
      </circle>
      <text x="68" y="108" fontSize="6" fill={dim} textAnchor="end">AV</text>

      {/* His + bundle branches */}
      <line x1="90" y1="110" x2="90" y2="125" stroke={ok} strokeWidth="2" />
      <path d="M 90 125 Q 110 140 125 168" fill="none" stroke={ok} strokeWidth="1.4" />
      <path d="M 90 125 Q 70 140 55 168" fill="none" stroke={ok} strokeWidth="1.4" />

      {/* Ventricular escape focus */}
      {ventActive && (
        <g>
          <circle cx="125" cy="168" r="5" fill={color}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          {[8, 13].map((r, i) => (
            <circle key={i} cx="125" cy="168" r={r} fill="none" stroke={color} strokeWidth="0.7" opacity="0.4">
              <animate attributeName="opacity" values="0;0.5;0" dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <text x="78" y="190" fontSize="5.5" fill={color} fontWeight="bold">
            V escape · wide QRS
          </text>
        </g>
      )}

      {/* Junctional retrograde P waves */}
      {juncActive && (
        <g>
          <path d="M 90 100 Q 100 80 118 50" fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="2 2" />
          <polygon points="118,50 115,55 121,53" fill={color} />
          <text x="40" y="138" fontSize="5.5" fill={color} fontWeight="bold">retro P</text>
        </g>
      )}

      {/* Sinus arrest — pause indicator */}
      {brady.focus === "sa-fail" && (
        <text x="90" y="185" fontSize="6" fill={color} fontWeight="bold" textAnchor="middle">
          ⏸ pause &gt; 3 s
        </text>
      )}

      {/* Sinus brady — slow waves */}
      {saActive && (
        <g>
          {[10, 15].map((r, i) => (
            <circle key={i} cx="118" cy="42" r={r} fill="none" stroke={color} strokeWidth="0.7" opacity="0.4">
              <animate attributeName="opacity" values="0;0.5;0" dur="1.8s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <text x="90" y="195" fontSize="5.5" fill={color} fontWeight="bold" textAnchor="middle">
            slow SA → narrow QRS
          </text>
        </g>
      )}

      {/* Brady-tachy — alternating fast atrial chaos + slow */}
      {alternating && (
        <g>
          {[[60, 60], [78, 52], [102, 58], [125, 70]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.8" fill={color}>
              <animate attributeName="opacity" values="0;1;0" dur="2.2s" begin={`${i * 0.15 + 1.1}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <text x="90" y="195" fontSize="5.5" fill={color} fontWeight="bold" textAnchor="middle">
            brady ↔ tachy
          </text>
        </g>
      )}
    </svg>
  );
};

/* ───────────── Stylised rhythm strip ───────────── */

const drawBeat = (
  cx: number,
  baseline: number,
  opts: { p?: boolean; qrs?: boolean; t?: boolean; pr?: number; wide?: boolean; invertedP?: boolean }
) => {
  const { p = true, qrs = true, t = true, pr = 12, wide = false, invertedP = false } = opts;
  let d = "";
  if (p) {
    d += invertedP
      ? `M ${cx - pr - 6} ${baseline} q 3 5 6 0 `
      : `M ${cx - pr - 6} ${baseline} q 3 -5 6 0 `;
  }
  if (qrs) {
    if (wide) {
      d += `M ${cx} ${baseline} l 2 3 l 3 -22 l 4 26 l 4 -8 l 3 1 `;
    } else {
      d += `M ${cx} ${baseline} l 1 3 l 2 -18 l 3 22 l 2 -7 `;
    }
  }
  if (t) {
    const tStart = cx + (wide ? 18 : 10);
    d += `M ${tStart} ${baseline} q 4 -6 8 0 `;
  }
  return d;
};

const RhythmStrip = ({ brady, color }: { brady: BradyInfo; color: string }) => {
  const W = 360;
  const H = 70;
  const baseline = 42;

  let beatPaths: string[] = [];
  let custom: React.ReactNode = null;

  switch (brady.focus) {
    case "sa-slow":
      // Slow regular sinus — wide spacing, normal P-QRS-T
      beatPaths = [40, 130, 220, 310].map((cx) => drawBeat(cx, baseline, { pr: 12 }));
      break;

    case "sa-fail":
      // Two normal beats, long pause (>3s), then resumes
      beatPaths = [
        drawBeat(35, baseline, { pr: 12 }),
        drawBeat(110, baseline, { pr: 12 }),
        drawBeat(295, baseline, { pr: 12 }),
      ];
      custom = (
        <g>
          <line
            x1="135"
            y1={baseline}
            x2="270"
            y2={baseline}
            stroke={color}
            strokeWidth="1"
            strokeDasharray="3 2"
            opacity="0.7"
          />
          <text x="200" y={baseline - 6} fontSize="8" fill={color} textAnchor="middle" fontWeight="bold">
            pause
          </text>
        </g>
      );
      break;

    case "junc-escape":
      // Narrow QRS, no P (or inverted/retrograde), regular slow
      beatPaths = [50, 140, 230, 320].map((cx) =>
        drawBeat(cx, baseline, { p: false, pr: 0 })
      );
      // Add small inverted P after each QRS (retrograde)
      custom = (
        <g>
          {[50, 140, 230, 320].map((cx, i) => (
            <path
              key={i}
              d={`M ${cx + 14} ${baseline} q 3 5 6 0`}
              fill="none"
              stroke={color}
              strokeWidth="1.1"
              opacity="0.85"
            />
          ))}
          <text x="6" y="62" fontSize="7" fill={color} fontWeight="bold">retrograde P</text>
        </g>
      );
      break;

    case "vent-escape":
      // Very slow, wide bizarre QRS, no relationship to atria
      beatPaths = [60, 220].map((cx) =>
        drawBeat(cx, baseline, { p: false, pr: 0, wide: true })
      );
      // Independent atrial activity (sprinkled small P waves)
      custom = (
        <g>
          {[20, 95, 165, 250, 320].map((cx, i) => (
            <path
              key={i}
              d={`M ${cx} ${baseline} q 3 -4 6 0`}
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="1"
              opacity="0.7"
            />
          ))}
          <text x="6" y="62" fontSize="7" fill={color} fontWeight="bold">AV dissociation</text>
        </g>
      );
      break;

    case "brady-tachy":
      // Slow regular → run of fast irregular → pause → slow resumes
      beatPaths = [
        drawBeat(20, baseline, { pr: 12 }),
        drawBeat(80, baseline, { pr: 12 }),
        // Tachy run (irregular narrow QRS, no P)
        drawBeat(125, baseline, { p: false, pr: 0 }),
        drawBeat(155, baseline, { p: false, pr: 0 }),
        drawBeat(180, baseline, { p: false, pr: 0 }),
        drawBeat(210, baseline, { p: false, pr: 0 }),
        drawBeat(238, baseline, { p: false, pr: 0 }),
        // Long post-tachy pause then slow beat
        drawBeat(335, baseline, { pr: 12 }),
      ];
      custom = (
        <g>
          {/* Fibrillatory baseline under tachy run */}
          <path
            d={`M 115 ${baseline} ${Array.from({ length: 35 }, (_, i) => {
              const x = 115 + i * 4;
              const y = baseline + (Math.sin(i * 1.3) + Math.sin(i * 2.4)) * 1.1;
              return `L ${x} ${y}`;
            }).join(" ")}`}
            fill="none"
            stroke={color}
            strokeWidth="0.7"
            opacity="0.5"
          />
          <text x="180" y="14" fontSize="7" fill={color} fontWeight="bold" textAnchor="middle">
            AF run
          </text>
          <line x1="260" y1={baseline} x2="320" y2={baseline} stroke={color} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
          <text x="290" y={baseline - 6} fontSize="7" fill={color} textAnchor="middle" fontWeight="bold">
            pause
          </text>
        </g>
      );
      break;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`Rhythm strip — ${brady.label}`}>
      <rect x="0" y="0" width={W} height={H} fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.5" rx="4" />
      {/* Faint grid */}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2={H} stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />
      ))}
      <line x1="0" y1={baseline} x2={W} y2={baseline} stroke="hsl(var(--border))" strokeWidth="0.3" opacity="0.5" />

      {custom}
      {beatPaths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      ))}

      <text x={6} y={11} fontSize="7" fill={color} fontWeight="bold">{brady.shortLabel}</text>
    </svg>
  );
};

/* ───────────── Main component ───────────── */

const BradyarrhythmiaDiagram = () => {
  const [selected, setSelected] = useState<BradyKey>("sinus-brady");
  const [showAll, setShowAll] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const info = BRADYS[selected];

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Bradyarrhythmias — escape hierarchy + rhythm strip"
          subtitle="Sinus brady · Sinus arrest · Junctional escape · Ventricular escape · Sick sinus. Tap a card for the detail panel."
          toggles={[
            { label: "All five", active: showAll, onChange: () => setShowAll((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        {/* Selector chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ORDER.map((k) => {
            const b = BRADYS[k];
            const active = selected === k;
            return (
              <button
                key={k}
                onClick={() => setSelected(k)}
                aria-pressed={active}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                style={{
                  borderColor: active ? b.color : "hsl(var(--border))",
                  backgroundColor: active ? b.color : "transparent",
                  color: active ? "white" : "hsl(var(--muted-foreground))",
                }}
              >
                {b.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        {showAll ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {ORDER.map((k) => {
              const b = BRADYS[k];
              const active = selected === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setSelected(k)}
                  className="text-left p-3 rounded-lg border bg-background/60 transition-all hover:bg-background"
                  style={{
                    borderColor: active ? b.color : "hsl(var(--border))",
                    borderWidth: active ? 2 : 1,
                    boxShadow: active ? `0 4px 14px -6px ${withAlpha(b.color, 0.5)}` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <p className="font-semibold text-sm text-foreground">{b.label}</p>
                    <span
                      className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md whitespace-nowrap"
                      style={{ background: withAlpha(b.color, 0.15), color: b.color }}
                    >
                      {b.pacemaker}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <TreeMini brady={b} color={b.color} />
                    <div className="min-w-0">
                      {showLabels && (
                        <p className="text-[11px] text-muted-foreground mb-1.5 leading-snug">
                          <span className="font-semibold text-foreground">Rate:</span> {b.rate}
                        </p>
                      )}
                      <RhythmStrip brady={b} color={b.color} />
                      {showLabels && (
                        <p className="text-[10px] text-muted-foreground mt-1.5 italic leading-snug">{b.ecg}</p>
                      )}
                      <p
                        className="text-[10px] mt-1.5 px-2 py-1 rounded font-medium"
                        style={{ background: withAlpha(b.color, 0.1), color: b.color }}
                      >
                        Device: {b.device}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-3 rounded-lg border bg-background/60" style={{ borderColor: info.color, borderWidth: 2 }}>
            <p className="font-semibold text-sm text-foreground mb-2">{info.label}</p>
            <div className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-3 sm:items-center">
              <TreeMini brady={info} color={info.color} />
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground mb-1.5">
                  <span className="font-semibold text-foreground">Pacemaker:</span> {info.pacemaker} · <span className="font-semibold text-foreground">Rate:</span> {info.rate}
                </p>
                <RhythmStrip brady={info} color={info.color} />
                <p className="text-[10px] text-muted-foreground mt-1.5 italic">{info.ecg}</p>
              </div>
            </div>
          </div>
        )}

        {/* Detail panel */}
        <div className="mt-4 min-h-[110px]">
          <div
            className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
            style={{ borderLeftWidth: 4, borderLeftColor: info.color }}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <p className="font-semibold text-foreground text-sm">{info.label}</p>
              <span
                className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                style={{ background: withAlpha(info.color, 0.15), color: info.color }}
              >
                Pacemaker: {info.pacemaker} · {info.qrs} QRS
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Rate:</span> {info.rate}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">ECG:</span> {info.ecg}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Pathophysiology:</span> {info.pathophysiology}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Management:</span> {info.management}
            </p>
            <p
              className="text-[11px] font-medium px-2 py-1 rounded inline-block"
              style={{ background: withAlpha(info.color, 0.12), color: info.color }}
            >
              Device choice: {info.device}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BradyarrhythmiaDiagram;
