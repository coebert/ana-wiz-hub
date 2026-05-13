import { useEffect, useRef, useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "./DiagramToggleBar";

/**
 * Tachyarrhythmia series — sinus tach, AF, atrial flutter, AVNRT, AVRT,
 * monomorphic VT, VF, torsades. Each card pairs a mini conduction-tree
 * schematic showing the focus or re-entry circuit with a stylised rhythm
 * strip and a clinical detail panel.
 *
 * Sibling to HeartBlockDiagram + BundleBranchBlockDiagram — shares the same
 * 2-column grid, mini-tree + rhythm-strip layout language.
 */

type TachyKey = "sinus" | "af" | "flutter" | "avnrt" | "avrt" | "vt" | "vf" | "torsades";

type FocusKind =
  | "sa-fast"          // sinus tach — SA node firing fast
  | "atrial-chaos"     // AF — multiple atrial wavelets
  | "atrial-circuit"   // flutter — macro re-entry around tricuspid annulus
  | "av-reentry"       // AVNRT — slow/fast pathway in/around AV node
  | "accessory"        // AVRT — bypass tract (Bundle of Kent)
  | "ventricular"      // VT — ventricular focus / re-entry
  | "v-chaos"          // VF — disorganised ventricular activity
  | "torsade";         // Torsades — twisting axis on long QT

type AdenosineResponse = "terminate" | "unmask" | "slow" | "no-effect" | "danger";

interface AdenosineInfo {
  response: AdenosineResponse;
  label: string;
  detail: string;
}

interface TachyInfo {
  label: string;
  shortLabel: string;
  color: string;
  focus: FocusKind;
  origin: "atrial" | "junctional" | "ventricular";
  rate: string;
  qrs: "narrow" | "wide" | "polymorphic" | "chaotic";
  ecg: string;
  pathophysiology: string;
  management: string;
  adenosine: AdenosineInfo;
}

const ADENOSINE_STYLE: Record<AdenosineResponse, { color: string; icon: string }> = {
  terminate: { color: "hsl(140, 60%, 40%)", icon: "✓" },
  unmask: { color: "hsl(35, 85%, 45%)", icon: "👁" },
  slow: { color: "hsl(210, 70%, 50%)", icon: "↓" },
  "no-effect": { color: "hsl(0, 0%, 50%)", icon: "—" },
  danger: { color: "hsl(0, 75%, 50%)", icon: "⚠" },
};

const TACHYS: Record<TachyKey, TachyInfo> = {
  sinus: {
    label: "Sinus tachycardia",
    shortLabel: "Sinus",
    color: "hsl(140, 55%, 45%)",
    focus: "sa-fast",
    origin: "atrial",
    rate: "100–180 bpm (rarely > 180 in adults)",
    qrs: "narrow",
    ecg: "Normal P before every QRS, regular, narrow QRS. P morphology unchanged.",
    pathophysiology: "Physiological — pain, fever, hypovolaemia, hypoxia, anxiety, β-agonists, hyperthyroidism. Almost always secondary.",
    management: "Treat the cause. Avoid β-blockade until volume / oxygen / sepsis addressed.",
    adenosine: { response: "slow", label: "Transient slowing", detail: "Brief, gradual slowing then resumes — confirms sinus origin and rules out re-entrant SVT." },
  },
  af: {
    label: "Atrial fibrillation",
    shortLabel: "AF",
    color: "hsl(20, 75%, 50%)",
    focus: "atrial-chaos",
    origin: "atrial",
    rate: "Atrial 300–600; ventricular irregularly irregular",
    qrs: "narrow",
    ecg: "No P waves, irregularly irregular narrow QRS, fibrillatory baseline.",
    pathophysiology: "Multiple re-entrant wavelets in atria; pulmonary vein triggers. AV node filters → variable ventricular rate.",
    management: "Rate (β-blocker, CCB, digoxin) vs rhythm (DCCV, amiodarone, ablation). Anticoagulate per CHA₂DS₂-VASc.",
    adenosine: { response: "unmask", label: "Unmasks fibrillatory baseline", detail: "Transient AV block slows ventricular response → reveals chaotic atrial activity. Diagnostic but not therapeutic." },
  },
  flutter: {
    label: "Atrial flutter",
    shortLabel: "Flutter",
    color: "hsl(35, 80%, 48%)",
    focus: "atrial-circuit",
    origin: "atrial",
    rate: "Atrial 250–350 (typically 300); ventricular usually 150 (2:1 block)",
    qrs: "narrow",
    ecg: "Sawtooth flutter waves (best in II, III, aVF). Regular ventricular response (2:1, 3:1, 4:1).",
    pathophysiology: "Macro re-entry in right atrium around tricuspid annulus, through cavo-tricuspid isthmus (CTI).",
    management: "DCCV, ablation of CTI (highly curative). Rate control as for AF; anticoagulate as for AF.",
    adenosine: { response: "unmask", label: "Unmasks sawtooth waves", detail: "Brief AV block exposes flutter waves at ~300/min — diagnostic. Will not terminate macro-re-entry." },
  },
  avnrt: {
    label: "AVNRT",
    shortLabel: "AVNRT",
    color: "hsl(45, 75%, 50%)",
    focus: "av-reentry",
    origin: "junctional",
    rate: "150–250 bpm",
    qrs: "narrow",
    ecg: "Regular narrow-complex tachycardia. P often buried in QRS or just after (pseudo-R' in V1, pseudo-S in II/III/aVF).",
    pathophysiology: "Re-entry within / around AV node using slow (α) and fast (β) pathways — typical (slow-fast) is most common.",
    management: "Vagal manoeuvres → adenosine 6 mg → 12 mg. DCCV if unstable. Long-term: β-blocker, slow-pathway ablation.",
    adenosine: { response: "terminate", label: "Terminates abruptly", detail: "Blocks AV node → breaks the re-entry circuit. Diagnostic AND therapeutic — sudden return to sinus." },
  },
  avrt: {
    label: "AVRT (WPW-related)",
    shortLabel: "AVRT",
    color: "hsl(280, 60%, 55%)",
    focus: "accessory",
    origin: "junctional",
    rate: "150–250 bpm",
    qrs: "narrow",
    ecg: "Orthodromic (90%): narrow QRS, retrograde P after QRS. Antidromic (10%): wide bizarre QRS. Sinus rhythm shows delta wave + short PR.",
    pathophysiology: "Macro re-entry between atria & ventricles via accessory pathway (Bundle of Kent) + AV node.",
    management: "Stable orthodromic: vagal → adenosine. Pre-excited AF: AVOID adenosine/CCB/digoxin → DCCV or procainamide. Definitive: pathway ablation.",
    adenosine: { response: "terminate", label: "Terminates orthodromic AVRT", detail: "Breaks circuit at AV node. ⚠ DANGEROUS in pre-excited AF — accelerates conduction down accessory pathway → VF." },
  },
  vt: {
    label: "Ventricular tachycardia (monomorphic)",
    shortLabel: "VT",
    color: "hsl(0, 70%, 50%)",
    focus: "ventricular",
    origin: "ventricular",
    rate: "100–250 bpm (typically 140–200)",
    qrs: "wide",
    ecg: "Wide regular QRS > 120 ms, AV dissociation, capture/fusion beats. Concordance in chest leads.",
    pathophysiology: "Re-entry around scar (post-MI) most common; also idiopathic outflow-tract VT. Dangerous — may degenerate to VF.",
    management: "Pulseless: defibrillate (shockable algorithm). Stable: amiodarone 300 mg. Unstable: synchronised DCCV. Long-term: ICD ± ablation.",
    adenosine: { response: "no-effect", label: "No effect (usually)", detail: "Circuit lies below AV node — adenosine cannot interrupt it. Rare exception: idiopathic fascicular / RVOT VT may terminate." },
  },
  vf: {
    label: "Ventricular fibrillation",
    shortLabel: "VF",
    color: "hsl(0, 80%, 40%)",
    focus: "v-chaos",
    origin: "ventricular",
    rate: "Chaotic — no organised activity",
    qrs: "chaotic",
    ecg: "No discernible P, QRS or T. Coarse → fine VF over time.",
    pathophysiology: "Multiple disordered ventricular wavelets. No cardiac output. Most common rhythm in sudden cardiac arrest.",
    management: "Immediate defibrillation + CPR (shockable algorithm). Adrenaline 1 mg every 3–5 min, amiodarone 300 mg after 3rd shock.",
    adenosine: { response: "no-effect", label: "Not indicated — defibrillate", detail: "Cardiac arrest rhythm. Adenosine has no role; immediate unsynchronised defibrillation." },
  },
  torsades: {
    label: "Torsades de pointes",
    shortLabel: "Torsades",
    color: "hsl(330, 60%, 50%)",
    focus: "torsade",
    origin: "ventricular",
    rate: "200–250 bpm — self-terminating or → VF",
    qrs: "polymorphic",
    ecg: "Polymorphic VT with QRS axis 'twisting' around baseline. Preceded by long QT.",
    pathophysiology: "Triggered activity (early afterdepolarisations) on prolonged QT — congenital LQTS or acquired (drugs, ↓K⁺, ↓Mg²⁺, ↓Ca²⁺, bradycardia).",
    management: "IV magnesium 2 g (even if normal Mg). Stop offending drug, correct K⁺. Overdrive pacing or isoprenaline if bradycardia-dependent. Defib if pulseless.",
    adenosine: { response: "danger", label: "Avoid — may worsen", detail: "Resulting bradycardia prolongs QT further → more torsades. Treat with magnesium and rate support, not adenosine." },
  },
};

const ORDER: TachyKey[] = ["sinus", "af", "flutter", "avnrt", "avrt", "vt", "vf", "torsades"];

/* ───────────── Mini conduction tree with focus / circuit ───────────── */

const TreeMini = ({ tachy, color }: { tachy: TachyInfo; color: string }) => {
  const dim = "hsl(var(--muted-foreground))";
  const ok = "hsl(var(--foreground))";
  const uid = tachy.shortLabel;

  return (
    <svg viewBox="0 0 180 200" className="w-full max-w-none sm:max-w-[200px] mx-auto" role="img" aria-label={`Conduction tree showing ${tachy.label}`}>
      <defs>
        <radialGradient id={`tachy-bg-${uid}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.04" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="180" height="200" rx="8" fill={`url(#tachy-bg-${uid})`} stroke="hsl(var(--border))" strokeWidth="0.5" />

      {/* Heart silhouette */}
      <path
        d="M 90 25 C 38 25 18 65 30 115 C 42 155 72 175 90 188 C 108 175 138 155 150 115 C 162 65 142 25 90 25 Z"
        fill="hsl(0, 30%, 88%)"
        fillOpacity="0.22"
        stroke="hsl(var(--border))"
        strokeWidth="0.6"
      />
      {/* Septum + atrioventricular line */}
      <line x1="90" y1="35" x2="90" y2="180" stroke="hsl(var(--border))" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.45" />
      <line x1="35" y1="105" x2="145" y2="105" stroke="hsl(var(--border))" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.45" />

      {/* SA node */}
      <circle
        cx="118"
        cy="42"
        r={tachy.focus === "sa-fast" ? 6 : 3.5}
        fill={tachy.focus === "sa-fast" ? color : ok}
      >
        {tachy.focus === "sa-fast" && (
          <animate attributeName="r" values="4;7;4" dur="0.6s" repeatCount="indefinite" />
        )}
      </circle>
      <text x="124" y="44" fontSize="6" fill={dim}>SA</text>

      {/* AV node */}
      <circle
        cx="90"
        cy="105"
        r="4.5"
        fill={tachy.focus === "av-reentry" ? color : tachy.focus === "accessory" ? ok : ok}
        stroke={tachy.focus === "av-reentry" ? color : "none"}
        strokeWidth="1.2"
      />
      <text x="68" y="108" fontSize="6" fill={dim} textAnchor="end">AV</text>

      {/* His + bundle branches (faded for V chaos / VF / torsades) */}
      <line x1="90" y1="110" x2="90" y2="125" stroke={ok} strokeWidth="2" opacity={tachy.focus === "v-chaos" ? 0.35 : 1} />
      <path d="M 90 125 Q 110 140 125 168" fill="none" stroke={ok} strokeWidth="1.4" opacity={tachy.focus === "v-chaos" ? 0.3 : 1} />
      <path d="M 90 125 Q 70 140 55 168" fill="none" stroke={ok} strokeWidth="1.4" opacity={tachy.focus === "v-chaos" ? 0.3 : 1} />

      {/* ─── Focus / circuit overlays ─── */}

      {/* Sinus tach — fast SA + radiating waves */}
      {tachy.focus === "sa-fast" && (
        <g>
          {[10, 16, 22].map((r, i) => (
            <circle key={i} cx="118" cy="42" r={r} fill="none" stroke={color} strokeWidth="0.8" opacity="0.4">
              <animate attributeName="opacity" values="0;0.5;0" dur="1s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      )}

      {/* AF — multiple chaotic atrial dots */}
      {tachy.focus === "atrial-chaos" && (
        <g>
          {[
            [60, 55], [78, 48], [95, 60], [110, 50], [125, 65], [70, 75],
            [102, 80], [55, 70], [130, 80], [85, 85],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" fill={color}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.4s" begin={`${i * 0.05}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* AV node "filtering" badge */}
          <text x="78" y="92" fontSize="5" fill={dim} fontWeight="bold">filter</text>
        </g>
      )}

      {/* Flutter — macro re-entry circuit around tricuspid annulus (RA, right side) */}
      {tachy.focus === "atrial-circuit" && (
        <g>
          {/* Circular path on RA side */}
          <ellipse
            cx="118"
            cy="72"
            rx="22"
            ry="28"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="4 3"
            opacity="0.85"
          />
          {/* Arrow head — show direction (counterclockwise typical) */}
          <polygon points="96,72 100,68 100,76" fill={color} />
          <text x="118" y="76" fontSize="5.5" fill={color} textAnchor="middle" fontWeight="bold">CTI</text>
        </g>
      )}

      {/* AVNRT — small re-entry loop within AV node */}
      {tachy.focus === "av-reentry" && (
        <g>
          <ellipse
            cx="90"
            cy="105"
            rx="11"
            ry="8"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeDasharray="3 2"
          />
          {/* Slow + fast pathway labels */}
          <text x="76" y="118" fontSize="5" fill={color} fontWeight="bold">slow</text>
          <text x="100" y="98" fontSize="5" fill={color} fontWeight="bold">fast</text>
          {/* Arrowheads showing circulation */}
          <polygon points="79,105 82,102 82,108" fill={color} />
          <polygon points="101,105 98,102 98,108" fill={color} />
        </g>
      )}

      {/* AVRT — accessory pathway (Bundle of Kent) bypassing AV node */}
      {tachy.focus === "accessory" && (
        <g>
          {/* Bypass tract — left lateral most common, drawn as red bridge across the AV groove */}
          <path
            d="M 60 102 Q 50 108 55 118"
            fill="none"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <text x="36" y="115" fontSize="5.5" fill={color} fontWeight="bold">Kent</text>
          {/* Macro re-entry loop arrows: down via AV node, back up via Kent */}
          <polygon points="90,118 87,115 93,115" fill={color} />
          <polygon points="58,108 55,111 61,111" fill={color} />
          <text x="100" y="138" fontSize="5" fill={color} fontWeight="bold">δ wave</text>
        </g>
      )}

      {/* VT — focal ventricular ectopic with monomorphic radiation */}
      {tachy.focus === "ventricular" && (
        <g>
          <circle cx="60" cy="155" r="5" fill={color}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="0.5s" repeatCount="indefinite" />
          </circle>
          {[8, 14].map((r, i) => (
            <circle key={i} cx="60" cy="155" r={r} fill="none" stroke={color} strokeWidth="0.8" opacity="0.4">
              <animate attributeName="opacity" values="0;0.6;0" dur="0.8s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {/* AV dissociation marker — atria still firing independently */}
          <circle cx="118" cy="42" r="3.5" fill={ok} opacity="0.6" />
          <text x="38" y="178" fontSize="5.5" fill={color} fontWeight="bold">AV dissoc.</text>
        </g>
      )}

      {/* VF — chaotic ventricular dots */}
      {tachy.focus === "v-chaos" && (
        <g>
          {[
            [50, 140], [70, 150], [90, 145], [110, 155], [130, 142],
            [60, 165], [85, 170], [105, 168], [125, 160], [75, 132],
            [115, 130], [55, 155], [95, 158], [120, 175], [70, 178],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.8" fill={color}>
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.3s" begin={`${i * 0.03}s`} repeatCount="indefinite" />
            </circle>
          ))}
        </g>
      )}

      {/* Torsades — twisting wave arrow + long-QT marker on a single ventricular focus */}
      {tachy.focus === "torsade" && (
        <g>
          {/* Twisting motif */}
          <path
            d="M 50 150 Q 70 135 90 155 Q 110 175 130 150"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 50 165 Q 70 180 90 160 Q 110 140 130 165"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <text x="40" y="135" fontSize="5.5" fill={color} fontWeight="bold">long QT</text>
          <text x="90" y="195" fontSize="5.5" fill={color} fontWeight="bold" textAnchor="middle">twisting axis</text>
        </g>
      )}
    </svg>
  );
};

/* ───────────── Stylised rhythm strip ───────────── */

type Beat = { cx: number; p?: boolean; qrs?: boolean; t?: boolean; pr?: number; wide?: boolean; pOnly?: boolean; invertedP?: boolean };

const drawBeat = (cx: number, baseline: number, opts: { p?: boolean; qrs?: boolean; t?: boolean; pr?: number; wide?: boolean; invertedP?: boolean }) => {
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

type StripMode = "baseline" | "adenosine";

const RhythmStrip = ({ tachy, color, mode = "baseline" }: { tachy: TachyInfo; color: string; mode?: StripMode }) => {
  const W = 360;
  const H = 70;
  const baseline = 42;
  const uid = `${tachy.shortLabel}-${mode}`;

  let beats: Beat[] = [];
  let custom: React.ReactNode = null;

  if (mode === "adenosine") {
    // Predicted post-adenosine response
    switch (tachy.focus) {
      case "av-reentry":
      case "accessory":
        // AVNRT / orthodromic AVRT — abrupt termination → sinus rhythm with normal P-QRS-T
        beats = [40, 130, 220, 310].map((cx) => ({ cx, p: true, qrs: true, t: true, pr: 12 }));
        custom = (
          <line x1="20" y1="6" x2="20" y2={H - 6} stroke={color} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.7" />
        );
        break;

      case "atrial-chaos":
        // AF — AV block transiently slows ventricle → fibrillatory baseline exposed (~5s window)
        beats = [
          { cx: 35, qrs: true, t: true, p: false, pr: 0 },
          // long gap with chaotic baseline ...
          { cx: 320, qrs: true, t: true, p: false, pr: 0 },
        ];
        custom = (
          <path
            d={`M 0 ${baseline} ${Array.from({ length: 90 }, (_, i) => `L ${i * 4} ${baseline + (Math.sin(i * 0.9) + Math.sin(i * 2.1) + Math.sin(i * 3.4)) * 2.5}`).join(" ")}`}
            fill="none" stroke={color} strokeWidth="1" opacity="0.85"
          />
        );
        break;

      case "atrial-circuit":
        // Flutter — AV block exposes the sawtooth at ~300/min (no QRS during pause)
        custom = (
          <path
            d={`M 0 ${baseline} ${Array.from({ length: 36 }, (_, i) => {
              const x = i * 10;
              const y = baseline + (i % 2 === 0 ? -8 : 6);
              return `L ${x} ${y}`;
            }).join(" ")}`}
            fill="none" stroke={color} strokeWidth="1.4" opacity="0.95"
          />
        );
        break;

      case "sa-fast":
        // Sinus tach — transient slowing then returns (wider P-P intervals)
        beats = [40, 130, 220, 310].map((cx) => ({ cx, p: true, qrs: true, t: true, pr: 12 }));
        break;

      case "ventricular":
      case "v-chaos":
        // VT / VF — no effect; replicate baseline appearance
        if (tachy.focus === "ventricular") {
          beats = [30, 80, 130, 180, 230, 280, 330].map((cx) => ({ cx, qrs: true, t: true, p: false, pr: 0, wide: true }));
        } else {
          custom = (
            <path
              d={`M 0 ${baseline} ${Array.from({ length: 180 }, (_, i) => {
                const x = i * 2;
                const noise = (Math.sin(i * 0.4) + Math.sin(i * 1.3) + Math.sin(i * 2.7) + Math.sin(i * 0.13) * 1.5) * 7;
                return `L ${x} ${baseline + noise}`;
              }).join(" ")}`}
              fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.2"
            />
          );
        }
        break;

      case "torsade":
        // Contraindicated — show the baseline twisting envelope; the warning lives on the button
        custom = (
          <path
            d={`M 0 ${baseline} ${Array.from({ length: 180 }, (_, i) => {
              const x = i * 2;
              const envelope = Math.sin(i * 0.08) * 18;
              const wave = Math.sin(i * 0.85) * envelope;
              return `L ${x} ${baseline + wave}`;
            }).join(" ")}`}
            fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.3"
          />
        );
        break;
    }
  } else {
    switch (tachy.focus) {
      case "sa-fast":
        // Sinus tach — every P → narrow QRS, regular, fast
        beats = [30, 75, 120, 165, 210, 255, 300, 345].map((cx) => ({ cx, p: true, qrs: true, t: true, pr: 10 }));
        break;

      case "atrial-chaos":
        // AF — irregularly irregular narrow QRS, no P, fibrillatory baseline
        beats = [
          { cx: 35, qrs: true, t: true, p: false, pr: 0 },
          { cx: 95, qrs: true, t: true, p: false, pr: 0 },
          { cx: 138, qrs: true, t: true, p: false, pr: 0 },
          { cx: 215, qrs: true, t: true, p: false, pr: 0 },
          { cx: 260, qrs: true, t: true, p: false, pr: 0 },
          { cx: 322, qrs: true, t: true, p: false, pr: 0 },
        ];
        custom = (
          <path
            d={`M 0 ${baseline} ${Array.from({ length: 90 }, (_, i) => `L ${i * 4} ${baseline + (Math.sin(i * 0.9) + Math.sin(i * 2.1)) * 1.2}`).join(" ")}`}
            fill="none" stroke={color} strokeWidth="0.8" opacity="0.55"
          />
        );
        break;

      case "atrial-circuit":
        // Flutter — sawtooth baseline + 2:1 narrow QRS
        beats = [40, 130, 220, 310].map((cx) => ({ cx, qrs: true, t: true, p: false, pr: 0 }));
        custom = (
          <path
            d={`M 0 ${baseline} ${Array.from({ length: 36 }, (_, i) => {
              const x = i * 10;
              const y = baseline + (i % 2 === 0 ? -5 : 4);
              return `L ${x} ${y}`;
            }).join(" ")}`}
            fill="none" stroke={color} strokeWidth="1" opacity="0.7"
          />
        );
        break;

      case "av-reentry":
        // AVNRT — very fast regular narrow QRS, no obvious P
        beats = [30, 65, 100, 135, 170, 205, 240, 275, 310, 345].map((cx) => ({ cx, qrs: true, t: true, p: false, pr: 0 }));
        break;

      case "accessory":
        // AVRT (orthodromic) — fast regular narrow QRS with retrograde P after each QRS
        beats = [30, 75, 120, 165, 210, 255, 300, 345].map((cx) => ({
          cx, qrs: true, t: true, p: true, invertedP: true, pr: -16,
        }));
        break;

      case "ventricular":
        // Monomorphic VT — wide regular QRS
        beats = [30, 80, 130, 180, 230, 280, 330].map((cx) => ({ cx, qrs: true, t: true, p: false, pr: 0, wide: true }));
        break;

      case "v-chaos":
        // VF — chaotic squiggle
        custom = (
          <path
            d={`M 0 ${baseline} ${Array.from({ length: 180 }, (_, i) => {
              const x = i * 2;
              const noise = (Math.sin(i * 0.4) + Math.sin(i * 1.3) + Math.sin(i * 2.7) + Math.sin(i * 0.13) * 1.5) * 7;
              return `L ${x} ${baseline + noise}`;
            }).join(" ")}`}
            fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.2"
          />
        );
        break;

      case "torsade":
        // Torsades — sinusoidal envelope (twisting axis)
        custom = (
          <path
            d={`M 0 ${baseline} ${Array.from({ length: 180 }, (_, i) => {
              const x = i * 2;
              const envelope = Math.sin(i * 0.08) * 18;
              const wave = Math.sin(i * 0.85) * envelope;
              return `L ${x} ${baseline + wave}`;
            }).join(" ")}`}
            fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.3"
          />
        );
        break;
    }
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Rhythm strip for ${tachy.label}`}>
      <defs>
        <pattern id={`tachy-grid-${uid}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={color} strokeOpacity="0.18" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill={withAlpha(color, 0.04)} stroke={withAlpha(color, 0.3)} strokeWidth="0.6" rx="4" />
      <rect x="0" y="0" width={W} height={H} fill={`url(#tachy-grid-${uid})`} pointerEvents="none" />
      <line x1="0" y1={baseline} x2={W} y2={baseline} stroke="hsl(var(--muted-foreground))" strokeOpacity="0.25" strokeWidth="0.4" />

      {custom}

      {beats.map((b, i) => (
        <path
          key={i}
          d={drawBeat(b.cx, baseline, { p: b.p, qrs: b.qrs, t: b.t, pr: b.pr ?? 12, wide: b.wide, invertedP: b.invertedP })}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      <text x={6} y={11} fontSize="7" fill={color} fontWeight="bold">{tachy.shortLabel}</text>
    </svg>
  );
};

/* ───────────── Adenosine response row ───────────── */

const AdenosineRow = ({ info, compact = false }: { info: AdenosineInfo; compact?: boolean }) => {
  const style = ADENOSINE_STYLE[info.response];
  return (
    <div
      className="flex items-start gap-2 mt-1.5 p-1.5 rounded-md border"
      style={{
        borderColor: withAlpha(style.color, 0.4),
        backgroundColor: withAlpha(style.color, 0.08),
      }}
    >
      <span
        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
        style={{ backgroundColor: style.color, color: "white" }}
        aria-hidden
      >
        {style.icon}
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-[10px] font-semibold" style={{ color: style.color }}>
          Adenosine: {info.label}
        </p>
        {!compact && (
          <p className="text-[10px] text-muted-foreground mt-0.5">{info.detail}</p>
        )}
      </div>
    </div>
  );
};

/* ───────────── Adenosine simulator (interactive) ───────────── */

const AdenosineSimulator = ({ info }: { info: TachyInfo }) => {
  const [active, setActive] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const timerRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);
  const isDanger = info.adenosine.response === "danger";
  const style = ADENOSINE_STYLE[info.adenosine.response];

  // Reset when the user switches arrhythmia
  useEffect(() => {
    setActive(false);
    setRemaining(0);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (tickRef.current) window.clearInterval(tickRef.current);
  }, [info.label]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (tickRef.current) window.clearInterval(tickRef.current);
    };
  }, []);

  const give = () => {
    if (active || isDanger) return;
    const total = 5;
    setActive(true);
    setRemaining(total);
    tickRef.current = window.setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    timerRef.current = window.setTimeout(() => {
      setActive(false);
      setRemaining(0);
      if (tickRef.current) window.clearInterval(tickRef.current);
    }, total * 1000);
  };

  return (
    <div
      className="mt-2 p-2.5 rounded-md border space-y-2"
      style={{
        borderColor: withAlpha(style.color, 0.35),
        backgroundColor: withAlpha(style.color, 0.05),
      }}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
          <span aria-hidden>💉</span> Interactive: simulate adenosine 6 mg IV bolus
        </p>
        <button
          type="button"
          onClick={give}
          disabled={active || isDanger}
          className="text-[11px] font-medium px-3 py-1 rounded transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105"
          style={{
            backgroundColor: isDanger ? "hsl(var(--muted))" : style.color,
            color: isDanger ? "hsl(var(--muted-foreground))" : "white",
          }}
          aria-label={isDanger ? "Adenosine contraindicated" : active ? `Adenosine effect — ${remaining} seconds remaining` : "Give adenosine"}
        >
          {isDanger ? "⚠ Contraindicated" : active ? `Effect · ${remaining}s` : "Give adenosine"}
        </button>
      </div>

      {active && !isDanger && (
        <div className="animate-fade-in space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-semibold" style={{ color: style.color }}>
              Post-adenosine — {info.adenosine.label}
            </span>
            <span className="text-muted-foreground">~5 s window</span>
          </div>
          <RhythmStrip tachy={info} color={info.color} mode="adenosine" />
          <p className="text-[10px] text-muted-foreground italic leading-snug">{info.adenosine.detail}</p>
          <div className="h-1 w-full bg-muted rounded overflow-hidden">
            <div
              className="h-full transition-all duration-1000 ease-linear"
              style={{
                width: `${(remaining / 5) * 100}%`,
                backgroundColor: style.color,
              }}
            />
          </div>
        </div>
      )}

      {isDanger && (
        <p className="text-[10.5px] leading-snug" style={{ color: style.color }}>
          Adenosine not given — risk of bradycardia-induced QT prolongation worsening torsades. Treat with magnesium and rate support instead.
        </p>
      )}
    </div>
  );
};

/* ───────────── Main component ───────────── */


const TachyarrhythmiaDiagram = () => {
  const [selected, setSelected] = useState<TachyKey>("sinus");
  const [showAll, setShowAll] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const info = TACHYS[selected];

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Tachyarrhythmias — focus / re-entry circuit + rhythm strip"
          subtitle="Sinus · AF · Flutter · AVNRT · AVRT · VT · VF · Torsades. Tap a card to see the detail panel."
          toggles={[
            { label: "All eight", active: showAll, onChange: () => setShowAll((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        {/* Selector chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ORDER.map((k) => {
            const t = TACHYS[k];
            const active = selected === k;
            return (
              <button
                key={k}
                onClick={() => setSelected(k)}
                aria-pressed={active}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                style={{
                  borderColor: active ? t.color : "hsl(var(--border))",
                  backgroundColor: active ? t.color : "transparent",
                  color: active ? "white" : "hsl(var(--muted-foreground))",
                }}
              >
                {t.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        {showAll ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {ORDER.map((k) => {
              const t = TACHYS[k];
              const active = selected === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setSelected(k)}
                  className="text-left p-3 rounded-lg border bg-background/60 transition-all hover:bg-background"
                  style={{
                    borderColor: active ? t.color : "hsl(var(--border))",
                    borderWidth: active ? 2 : 1,
                    boxShadow: active ? `0 4px 14px -6px ${withAlpha(t.color, 0.5)}` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <p className="font-semibold text-sm text-foreground">{t.label}</p>
                    <span
                      className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md whitespace-nowrap"
                      style={{ background: withAlpha(t.color, 0.15), color: t.color }}
                    >
                      {t.qrs} QRS
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="w-full max-w-[220px] mx-auto"><TreeMini tachy={t} color={t.color} /></div>
                    <div className="min-w-0">
                      {showLabels && (
                        <p className="text-[11px] text-muted-foreground mb-1.5 leading-snug">
                          <span className="font-semibold text-foreground">Origin:</span> {t.origin} · <span className="font-semibold text-foreground">Rate:</span> {t.rate}
                        </p>
                      )}
                      <RhythmStrip tachy={t} color={t.color} />
                      {showLabels && (
                        <p className="text-[10px] text-muted-foreground mt-1.5 italic leading-snug">{t.ecg}</p>
                      )}
                      <AdenosineRow info={t.adenosine} compact />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="p-3 rounded-lg border bg-background/60" style={{ borderColor: info.color, borderWidth: 2 }}>
            <p className="font-semibold text-sm text-foreground mb-2">{info.label}</p>
            <div className="flex flex-col gap-3">
              <div className="w-full max-w-[220px] mx-auto"><TreeMini tachy={info} color={info.color} /></div>
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground mb-1.5">
                  <span className="font-semibold text-foreground">Origin:</span> {info.origin} · <span className="font-semibold text-foreground">Rate:</span> {info.rate}
                </p>
                <RhythmStrip tachy={info} color={info.color} />
                <p className="text-[10px] text-muted-foreground mt-1.5 italic">{info.ecg}</p>
                <AdenosineRow info={info.adenosine} compact />
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
                {info.origin} origin · {info.qrs} QRS
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
            <AdenosineSimulator info={info} />
            <AdenosineRow info={info.adenosine} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TachyarrhythmiaDiagram;
