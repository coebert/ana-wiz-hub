import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "./DiagramToggleBar";

/**
 * Bundle / fascicular block series — RBBB, LBBB, LAFB, LPFB, bifascicular,
 * trifascicular. Each card pairs a mini conduction-tree schematic showing
 * which branches/fascicles are blocked with characteristic V1 + V6 QRS
 * morphology and a compact summary.
 *
 * Sibling to HeartBlockDiagram.tsx — shares its layout language (2×n grid of
 * tree + waveforms + detail panel below).
 */

type BlockKey = "rbbb" | "lbbb" | "lafb" | "lpfb" | "bifasc" | "trifasc";

interface BlockInfo {
  label: string;
  shortLabel: string;
  color: string;
  /** Which structures are blocked. */
  blocked: {
    rbb?: boolean;
    lbb?: boolean;       // entire LBB (i.e., LBBB)
    lafb?: boolean;      // left anterior fascicle
    lpfb?: boolean;      // left posterior fascicle
    avDelay?: boolean;   // 1° AV block component (for trifascicular)
  };
  qrsWide: boolean;
  v1: "rsR'" | "broad-S" | "qR-narrow" | "rS-narrow" | "rs-tall";
  v6: "wide-S" | "broad-monophasic" | "qR-narrow" | "rS-narrow" | "rs-tall" | "monophasic";
  axis: string;
  qrsDuration: string;
  pathophysiology: string;
  clinical: string;
}

const BLOCKS: Record<BlockKey, BlockInfo> = {
  rbbb: {
    label: "Right bundle branch block (RBBB)",
    shortLabel: "RBBB",
    color: "hsl(210, 65%, 50%)",
    blocked: { rbb: true },
    qrsWide: true,
    v1: "rsR'",
    v6: "wide-S",
    axis: "Normal (no LAD/RAD unless co-existing fascicular block)",
    qrsDuration: "≥ 120 ms",
    pathophysiology: "Slow RV depolarisation via LV myocardium → late R' in V1, broad slurred S in I/V6.",
    clinical: "Often benign. Causes: PE (acute RV strain), ischaemia, congenital, age-related fibrosis. New RBBB + anterior STEMI = proximal LAD.",
  },
  lbbb: {
    label: "Left bundle branch block (LBBB)",
    shortLabel: "LBBB",
    color: "hsl(0, 65%, 52%)",
    blocked: { lbb: true, lafb: true, lpfb: true },
    qrsWide: true,
    v1: "broad-S",
    v6: "broad-monophasic",
    axis: "Usually normal or LAD",
    qrsDuration: "≥ 120 ms",
    pathophysiology: "LV depolarised via RV → broad notched R in I/aVL/V5/V6, deep wide S (or QS) in V1. Discordant ST/T changes.",
    clinical: "Always pathological. Aortic stenosis, IHD, cardiomyopathy, hypertension. Sgarbossa criteria for STEMI in LBBB. CRT candidate if EF ≤ 35% + QRS ≥ 150 ms.",
  },
  lafb: {
    label: "Left anterior fascicular block (LAFB)",
    shortLabel: "LAFB",
    color: "hsl(45, 75%, 50%)",
    blocked: { lafb: true },
    qrsWide: false,
    v1: "rS-narrow",
    v6: "qR-narrow",
    axis: "Left axis deviation (–45° to –90°)",
    qrsDuration: "< 120 ms (narrow)",
    pathophysiology: "Block of anterior division of LBB → posterior fascicle activates LV first (inferiorly) then anterior wall → marked LAD.",
    clinical: "Common — IHD, hypertension, fibrosis. qR in I/aVL, rS in II/III/aVF. Clinically silent on its own.",
  },
  lpfb: {
    label: "Left posterior fascicular block (LPFB)",
    shortLabel: "LPFB",
    color: "hsl(30, 75%, 48%)",
    blocked: { lpfb: true },
    qrsWide: false,
    v1: "rS-narrow",
    v6: "rs-tall",
    axis: "Right axis deviation (+90° to +180°) — diagnosis of exclusion",
    qrsDuration: "< 120 ms (narrow)",
    pathophysiology: "Block of posterior division of LBB. Posterior fascicle is short, thick, dual blood supply — rarely blocked in isolation.",
    clinical: "Rare. Must exclude RVH, lateral MI, COPD before diagnosing. qR in II/III/aVF, rS in I/aVL.",
  },
  bifasc: {
    label: "Bifascicular block (RBBB + LAFB)",
    shortLabel: "Bifasc",
    color: "hsl(280, 55%, 50%)",
    blocked: { rbb: true, lafb: true },
    qrsWide: true,
    v1: "rsR'",
    v6: "qR-narrow",
    axis: "Left axis deviation (LAFB component)",
    qrsDuration: "≥ 120 ms (RBBB component)",
    pathophysiology: "RBBB pattern + LAD from LAFB. Conduction relies on a single posterior fascicle.",
    clinical: "Risk of progression to complete block ~1% per year. Asymptomatic — observe. Symptomatic (syncope) → PPM. RBBB + LPFB also possible (rarer).",
  },
  trifasc: {
    label: "Trifascicular block",
    shortLabel: "Trifasc",
    color: "hsl(330, 60%, 50%)",
    blocked: { rbb: true, lafb: true, avDelay: true },
    qrsWide: true,
    v1: "rsR'",
    v6: "qR-narrow",
    axis: "LAD (LAFB) — true trifascicular needs alternating pattern or 2°/3° block",
    qrsDuration: "≥ 120 ms + PR > 200 ms",
    pathophysiology: "Bifascicular block + 1° AV block (incomplete trifasc), or alternating BBB / 2°/3° block (true trifasc).",
    clinical: "Risk of complete block. Symptomatic (syncope, presyncope) → permanent pacing indicated. Asymptomatic 'incomplete' is monitored.",
  },
};

const ORDER: BlockKey[] = ["rbbb", "lbbb", "lafb", "lpfb", "bifasc", "trifasc"];

/* ───────────── Mini conduction tree ───────────── */

const TreeMini = ({ block, color, hero = false }: { block: BlockInfo; color: string; hero?: boolean }) => {
  const dim = "hsl(var(--muted-foreground))";
  const ok = "hsl(var(--foreground))";

  const rbbBlocked = block.blocked.rbb;
  const lbbWhole = block.blocked.lbb;
  const lafbBlocked = block.blocked.lafb || lbbWhole;
  const lpfbBlocked = block.blocked.lpfb || lbbWhole;
  const avDelay = block.blocked.avDelay;

  // Unique ID for this card's gradient defs
  const uid = block.shortLabel;

  // Hero variant fills its container at all breakpoints — used in the
  // selected/expanded card so the conduction tree inside the Expand &
  // Learn modal mirrors the inline mobile hero look. Compact variant
  // caps at 200px on ≥sm for the multi-card overview grid.
  const sizeClass = hero ? "w-full max-w-none" : "w-full max-w-none sm:max-w-[200px]";

  return (
    <svg viewBox="0 0 180 200" className={`${sizeClass} mx-auto`} role="img" aria-label={`Conduction tree showing ${block.label}`}>
      <defs>
        <radialGradient id={`bbb-bg-${uid}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.04" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="180" height="200" rx="8" fill={`url(#bbb-bg-${uid})`} stroke="hsl(var(--border))" strokeWidth="0.5" />

      {/* Heart silhouette */}
      <path
        d="M 90 25 C 38 25 18 65 30 115 C 42 155 72 175 90 188 C 108 175 138 155 150 115 C 162 65 142 25 90 25 Z"
        fill="hsl(0, 30%, 88%)"
        fillOpacity="0.22"
        stroke="hsl(var(--border))"
        strokeWidth="0.6"
      />

      {/* Septum */}
      <line x1="90" y1="35" x2="90" y2="180" stroke="hsl(var(--border))" strokeWidth="0.4" strokeDasharray="2 2" opacity="0.45" />

      {/* SA node */}
      <circle cx="118" cy="42" r="3.5" fill={ok} />
      <text x="124" y="44" fontSize="6" fill={dim}>SA</text>

      {/* Atrial conduction */}
      <path d="M 118 46 Q 100 70 90 92" fill="none" stroke={ok} strokeWidth="1.3" />

      {/* AV node */}
      <circle
        cx="90"
        cy="95"
        r="4.5"
        fill={avDelay ? color : ok}
        stroke={avDelay ? color : "none"}
        strokeWidth="1.2"
      />
      <text x="68" y="98" fontSize="6" fill={dim} textAnchor="end">AV</text>
      {avDelay && (
        <text x="100" y="98" fontSize="9" fill={color} fontWeight="bold">⏱</text>
      )}

      {/* His bundle */}
      <line x1="90" y1="100" x2="90" y2="115" stroke={ok} strokeWidth="2" />
      <text x="94" y="110" fontSize="5.5" fill={dim}>His</text>

      {/* RBB — long thin bundle to RV */}
      <path
        d="M 90 115 Q 110 130 125 165"
        fill="none"
        stroke={rbbBlocked ? color : ok}
        strokeWidth={rbbBlocked ? 1.6 : 1.4}
        opacity={rbbBlocked ? 0.4 : 1}
        strokeDasharray={rbbBlocked ? "3 2" : undefined}
      />
      {rbbBlocked && (
        <g>
          <line x1="100" y1="128" x2="118" y2="128" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="100" y1="132" x2="118" y2="132" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
      <text x="128" y="170" fontSize="6" fill={rbbBlocked ? color : dim} fontWeight={rbbBlocked ? "bold" : "normal"}>RBB</text>

      {/* LBB main trunk — short, divides quickly */}
      <line
        x1="90" y1="115"
        x2="78" y2="128"
        stroke={lbbWhole ? color : ok}
        strokeWidth={lbbWhole ? 2 : 1.6}
        opacity={lbbWhole ? 0.4 : 1}
        strokeDasharray={lbbWhole ? "3 2" : undefined}
      />
      {lbbWhole && (
        <g>
          <line x1="68" y1="124" x2="86" y2="124" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="68" y1="128" x2="86" y2="128" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}

      {/* LAFB — anterior fascicle — runs up & lateral */}
      <path
        d="M 78 128 Q 60 138 50 150"
        fill="none"
        stroke={lafbBlocked ? color : ok}
        strokeWidth={lafbBlocked ? 1.5 : 1.2}
        opacity={lafbBlocked ? (lbbWhole ? 0.3 : 0.45) : 1}
        strokeDasharray={lafbBlocked ? "3 2" : undefined}
      />
      {lafbBlocked && !lbbWhole && (
        <g>
          <line x1="58" y1="138" x2="72" y2="138" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="58" y1="142" x2="72" y2="142" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      <text x="32" y="155" fontSize="6" fill={lafbBlocked ? color : dim} fontWeight={lafbBlocked ? "bold" : "normal"}>LAF</text>

      {/* LPFB — posterior fascicle — runs down & inferior */}
      <path
        d="M 78 128 Q 70 155 60 178"
        fill="none"
        stroke={lpfbBlocked ? color : ok}
        strokeWidth={lpfbBlocked ? 1.5 : 1.2}
        opacity={lpfbBlocked ? (lbbWhole ? 0.3 : 0.45) : 1}
        strokeDasharray={lpfbBlocked ? "3 2" : undefined}
      />
      {lpfbBlocked && !lbbWhole && (
        <g>
          <line x1="62" y1="160" x2="78" y2="160" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="62" y1="164" x2="78" y2="164" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </g>
      )}
      <text x="42" y="184" fontSize="6" fill={lpfbBlocked ? color : dim} fontWeight={lpfbBlocked ? "bold" : "normal"}>LPF</text>
    </svg>
  );
};

/* ───────────── V1 / V6 QRS morphology ───────────── */

/** Returns an SVG path drawing a stylised QRS for the given morphology. */
const morphologyPath = (kind: BlockInfo["v1"] | BlockInfo["v6"], originX: number, baseline: number): string => {
  const x = originX;
  switch (kind) {
    case "rsR'":
      // small r, deep S, tall R' — RBBB V1 ('M' / rabbit-ear)
      return `M ${x} ${baseline} l 3 -6 l 3 18 l 4 -22 l 4 22 l 4 -6 l 3 6`;
    case "broad-S":
      // LBBB V1 — small or absent r, wide deep S
      return `M ${x} ${baseline} l 3 -3 l 5 30 l 6 -28 l 5 6 l 4 -5`;
    case "broad-monophasic":
      // LBBB V6 — broad notched monophasic R
      return `M ${x} ${baseline} l 2 -8 l 4 -16 l 3 6 l 3 -6 l 4 22 l 4 4`;
    case "qR-narrow":
      // narrow qR — LAFB V6 / bifasc V6
      return `M ${x} ${baseline} l 2 4 l 1 -2 l 4 -22 l 4 22 l 4 -2 l 3 4`;
    case "rS-narrow":
      // narrow rS — V1 in fascicular block
      return `M ${x} ${baseline} l 2 -6 l 3 4 l 4 18 l 4 -16 l 3 4 l 3 -2`;
    case "rs-tall":
      // V6 in LPFB — small r, deeper S, narrow
      return `M ${x} ${baseline} l 2 -10 l 3 4 l 3 14 l 4 -10 l 3 4 l 3 -2`;
    case "monophasic":
      return `M ${x} ${baseline} l 3 -22 l 4 22 l 4 0`;
  }
};

const Waveform = ({ label, kind, color, wide }: { label: string; kind: BlockInfo["v1"] | BlockInfo["v6"]; color: string; wide: boolean }) => {
  const W = 70;
  const H = 56;
  const baseline = H / 2 + 4;
  const isAbnormal = kind !== "qR-narrow" && kind !== "rS-narrow" && kind !== "rs-tall" ? true : false;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[80px]" role="img" aria-label={`Lead ${label} morphology: ${kind}`}>
      <defs>
        <pattern id={`bbb-grid-${label}-${kind}`} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M 6 0 L 0 0 0 6" fill="none" stroke={color} strokeOpacity="0.15" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={W} height={H} rx="3" fill={withAlpha(color, isAbnormal ? 0.06 : 0.03)} stroke={withAlpha(color, 0.35)} strokeWidth="0.6" />
      <rect x="0" y="0" width={W} height={H} rx="3" fill={`url(#bbb-grid-${label}-${kind})`} pointerEvents="none" />
      <line x1="4" y1={baseline} x2={W - 4} y2={baseline} stroke="hsl(var(--muted-foreground))" strokeOpacity="0.3" strokeWidth="0.4" />
      <path
        d={morphologyPath(kind, 22, baseline)}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth={wide ? 1.6 : 1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x={5} y={11} fontSize="9" fontWeight="bold" fill={color}>{label}</text>
      <text x={W - 4} y={11} textAnchor="end" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.7">
        {wide ? "wide" : "narrow"}
      </text>
    </svg>
  );
};

/* ───────────── Main component ───────────── */

const BundleBranchBlockDiagram = () => {
  const [selected, setSelected] = useState<BlockKey>("rbbb");
  const [showAll, setShowAll] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const info = BLOCKS[selected];

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Bundle & fascicular blocks — site + V1/V6 morphology"
          subtitle="RBBB · LBBB · LAFB · LPFB · Bifascicular · Trifascicular. Tap a card for the detail panel."
          toggles={[
            { label: "All six", active: showAll, onChange: () => setShowAll((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        {/* Selector chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ORDER.map((k) => {
            const b = BLOCKS[k];
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
              const b = BLOCKS[k];
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
                      {b.qrsDuration}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <TreeMini block={b} color={b.color} />
                    <div className="min-w-0 space-y-1.5">
                      <div className="flex gap-2">
                        <Waveform label="V1" kind={b.v1} color={b.color} wide={b.qrsWide} />
                        <Waveform label="V6" kind={b.v6} color={b.color} wide={b.qrsWide} />
                      </div>
                      {showLabels && (
                        <p className="text-[10px] text-muted-foreground italic leading-snug">
                          Axis: {b.axis}
                        </p>
                      )}
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
              <TreeMini block={info} color={info.color} hero />
              <div className="min-w-0 space-y-1.5">
                <div className="flex gap-2">
                  <Waveform label="V1" kind={info.v1} color={info.color} wide={info.qrsWide} />
                  <Waveform label="V6" kind={info.v6} color={info.color} wide={info.qrsWide} />
                </div>
                <p className="text-[10px] text-muted-foreground italic">Axis: {info.axis}</p>
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
                {info.qrsDuration}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Axis:</span> {info.axis}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Pathophysiology:</span> {info.pathophysiology}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Clinical:</span> {info.clinical}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BundleBranchBlockDiagram;
