import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { EcgStripFrame } from "./EcgStripFrame";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Heart block series — 1°, Mobitz I (Wenckebach), Mobitz II, Complete (3°).
 * Each card pairs a mini conduction-tree schematic (showing where the block
 * sits) with a stylised rhythm strip underneath, plus a compact summary.
 */

type BlockKey = "first" | "mobitz1" | "mobitz2" | "complete";

interface BlockInfo {
  label: string;
  shortLabel: string;
  color: string;
  /** Where the block sits on the tree. */
  site: "av-node" | "av-node-decremental" | "his-purkinje" | "complete";
  siteDescription: string;
  ecg: string;
  pathophysiology: string;
  management: string;
  pacing: "Rarely" | "Usually no" | "Often" | "Always";
  /** Recommended device when pacing is indicated. */
  device: "None" | "DDD" | "VVI" | "DDD ± CRT";
  deviceRationale: string;
  /** Which leads the device places — drives the PaceOverlay. */
  leads: { ra: boolean; rv: boolean; lv: boolean };
}

const BLOCKS: Record<BlockKey, BlockInfo> = {
  first: {
    label: "1° AV block",
    shortLabel: "1°",
    color: "hsl(140, 55%, 45%)",
    site: "av-node",
    siteDescription: "Conduction delay at the AV node — every P still conducts.",
    ecg: "PR > 200 ms (constant). Every P → QRS.",
    pathophysiology: "Slowed AV-nodal conduction. Often vagal tone, drugs (β-blocker, digoxin, CCB), inferior MI, athletes.",
    management: "Usually benign — treat cause. Caution with further AV-blocking drugs.",
    pacing: "Rarely",
    device: "None",
    deviceRationale: "No device unless symptomatic with very long PR (rare 'pseudo-pacemaker' syndrome).",
    leads: { ra: false, rv: false, lv: false },
  },
  mobitz1: {
    label: "2° AV block — Mobitz I (Wenckebach)",
    shortLabel: "Mobitz I",
    color: "hsl(45, 75%, 50%)",
    site: "av-node-decremental",
    siteDescription: "Progressive AV-nodal fatigue → eventually a P fails to conduct.",
    ecg: "Progressive PR lengthening → dropped QRS, then cycle repeats.",
    pathophysiology: "Decremental conduction in AV node. Inferior MI (RCA → AV node), high vagal tone, AV-nodal blockers.",
    management: "Usually no treatment unless symptomatic bradycardia. Atropine if needed.",
    pacing: "Usually no",
    device: "None",
    deviceRationale: "Vagal / nodal — usually reversible. Pace only if symptomatic bradycardia despite cause control.",
    leads: { ra: false, rv: false, lv: false },
  },
  mobitz2: {
    label: "2° AV block — Mobitz II",
    shortLabel: "Mobitz II",
    color: "hsl(20, 75%, 52%)",
    site: "his-purkinje",
    siteDescription: "Sudden infranodal failure (His or bundle branches) — no PR drift.",
    ecg: "Constant PR with sudden non-conducted P. Often wide QRS. May be 2:1, 3:1.",
    pathophysiology: "His-Purkinje disease. Anterior MI (LAD → septal branches), fibrosis (Lev / Lenègre).",
    management: "Permanent pacing — high risk of progression to complete block.",
    pacing: "Often",
    device: "DDD",
    deviceRationale: "Dual-chamber (RA + RV) — preserves AV synchrony; infranodal block won't recover.",
    leads: { ra: true, rv: true, lv: false },
  },
  complete: {
    label: "3° AV block (complete)",
    shortLabel: "Complete (3°)",
    color: "hsl(0, 70%, 50%)",
    site: "complete",
    siteDescription: "No conduction reaches ventricles — atria and ventricles dissociated.",
    ecg: "AV dissociation. Regular P, regular QRS, independent rates. Escape rhythm sets QRS rate/width.",
    pathophysiology: "Complete failure at AV node, His or bilateral bundles. Inferior MI (junctional escape, narrow), anterior MI (ventricular escape, wide, slow).",
    management: "Atropine ± isoprenaline / external pacing → permanent PPM.",
    pacing: "Always",
    device: "DDD ± CRT",
    deviceRationale: "DDD if SR; VVI if AF. Add LV lead via coronary sinus (CRT-P/D) if EF ≤ 35% & expected high RV-pacing burden.",
    leads: { ra: true, rv: true, lv: true },
  },
};

const ORDER: BlockKey[] = ["first", "mobitz1", "mobitz2", "complete"];

/* ───────────── Mini conduction tree ───────────── */

const TreeMini = ({ block, color }: { block: BlockInfo; color: string }) => {
  const dim = "hsl(var(--muted-foreground))";
  const ok = "hsl(var(--foreground))";

  // Which nodes/segments are "alive" vs blocked?
  const blocked = {
    avNode: block.site === "complete",
    avDelay: block.site === "av-node" || block.site === "av-node-decremental",
    his: block.site === "his-purkinje" || block.site === "complete",
  };

  return (
    <svg viewBox="0 0 160 180" className="w-full max-w-none sm:max-w-[180px] mx-auto" role="img" aria-label={`Conduction tree showing ${block.label}`}>
      <defs>
        <radialGradient id={`hbm-bg-${block.shortLabel}`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.18" />
          <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.04" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="160" height="180" rx="8" fill={`url(#hbm-bg-${block.shortLabel})`} stroke="hsl(var(--border))" strokeWidth="0.5" />

      {/* Heart silhouette */}
      <path
        d="M 80 25 C 35 25 18 60 28 105 C 38 140 65 158 80 168 C 95 158 122 140 132 105 C 142 60 125 25 80 25 Z"
        fill="hsl(0, 30%, 88%)"
        fillOpacity="0.25"
        stroke="hsl(var(--border))"
        strokeWidth="0.5"
      />

      {/* Atrial septum line */}
      <line x1="80" y1="35" x2="80" y2="95" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
      {/* Interventricular septum */}
      <line x1="80" y1="100" x2="80" y2="160" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />

      {/* SA node — always firing */}
      <circle cx="105" cy="42" r="4" fill={ok} />
      <text x="112" y="44" fontSize="6" fill={dim}>SA</text>

      {/* Internodal tract → AV node */}
      <path d="M 105 46 Q 90 70 80 92" fill="none" stroke={ok} strokeWidth="1.5" />

      {/* AV node */}
      <circle
        cx="80"
        cy="95"
        r="5"
        fill={blocked.avNode ? color : blocked.avDelay ? color : ok}
        stroke={blocked.avDelay || blocked.avNode ? color : "none"}
        strokeWidth="1"
      />
      <text x="60" y="98" fontSize="6" fill={dim} textAnchor="end">AV</text>

      {/* Block marker on AV node — for delay (1°) or wenckebach */}
      {blocked.avDelay && (
        <g>
          <text x="92" y="92" fontSize="11" fill={color} fontWeight="bold">⏱</text>
          {block.site === "av-node-decremental" && (
            <text x="92" y="103" fontSize="5.5" fill={color} fontWeight="bold">↑↑↑✕</text>
          )}
        </g>
      )}

      {/* His bundle */}
      <line
        x1="80" y1="100" x2="80" y2="115"
        stroke={blocked.avNode ? dim : blocked.his ? color : ok}
        strokeWidth="2"
        opacity={blocked.avNode ? 0.3 : 1}
      />

      {/* Block bar across His for Mobitz II / complete */}
      {(block.site === "his-purkinje" || block.site === "complete") && (
        <g>
          <line x1="68" y1="112" x2="92" y2="112" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <line x1="68" y1="116" x2="92" y2="116" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <text x="95" y="116" fontSize="6.5" fill={color} fontWeight="bold">✕</text>
        </g>
      )}

      {/* Right + Left bundle branches */}
      <path
        d="M 80 115 Q 95 130 105 155"
        fill="none"
        stroke={blocked.his || blocked.avNode ? dim : ok}
        strokeWidth="1.5"
        opacity={blocked.his || blocked.avNode ? 0.3 : 1}
      />
      <path
        d="M 80 115 Q 65 130 55 155"
        fill="none"
        stroke={blocked.his || blocked.avNode ? dim : ok}
        strokeWidth="1.5"
        opacity={blocked.his || blocked.avNode ? 0.3 : 1}
      />
      <text x="108" y="158" fontSize="5.5" fill={dim}>RBB</text>
      <text x="38" y="158" fontSize="5.5" fill={dim}>LBB</text>

      {/* Escape pacemaker dot for complete block */}
      {block.site === "complete" && (
        <g>
          <circle cx="80" cy="140" r="3" fill={color} opacity="0.9">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite" />
          </circle>
          <text x="84" y="142" fontSize="5.5" fill={color} fontWeight="bold">escape</text>
        </g>
      )}
    </svg>
  );
};

/* ───────────── Stylised rhythm strip ───────────── */

/**
 * Rhythm strip generator. Returns an SVG path for a P-QRS-T sequence at
 * (cx, baseline) with a P-QRS gap controlled by `pr`.
 */
const drawBeat = (cx: number, baseline: number, opts: { p?: boolean; qrs?: boolean; t?: boolean; pr?: number; wide?: boolean }) => {
  const { p = true, qrs = true, t = true, pr = 12, wide = false } = opts;
  let d = "";
  // P wave
  if (p) {
    d += `M ${cx - pr - 6} ${baseline} q 3 -5 6 0 `;
  }
  // QRS
  if (qrs) {
    const qStart = cx;
    if (wide) {
      d += `M ${qStart} ${baseline} l 2 3 l 3 -22 l 4 26 l 4 -8 l 3 1 `;
    } else {
      d += `M ${qStart} ${baseline} l 1 3 l 2 -18 l 3 22 l 2 -7 `;
    }
  }
  // T wave
  if (t) {
    const tStart = cx + (wide ? 18 : 10);
    d += `M ${tStart} ${baseline} q 4 -6 8 0 `;
  }
  return d;
};

const RhythmStrip = ({ block, color }: { block: BlockInfo; color: string }) => {
  const W = 360;
  const H = 70;
  const baseline = 42;

  // Build beat sequences specific to each block.
  type Beat = { cx: number; p: boolean; qrs: boolean; t: boolean; pr: number; wide?: boolean; pOnly?: boolean };
  const beats: Beat[] = [];

  if (block.site === "av-node") {
    // 1° — every P conducts but PR long & constant
    [40, 100, 160, 220, 280, 340].forEach((cx) => {
      beats.push({ cx, p: true, qrs: true, t: true, pr: 22 });
    });
  } else if (block.site === "av-node-decremental") {
    // Mobitz I — PR lengthens 12, 18, 24 then dropped, repeats
    const groups = [
      { x: 35, prs: [10, 16, 22] },   // 4:3 cycle, then drop
      { x: 200, prs: [10, 16, 22] },
    ];
    groups.forEach((g) => {
      g.prs.forEach((pr, i) => {
        beats.push({ cx: g.x + i * 50 + pr, p: true, qrs: true, t: true, pr });
      });
      // dropped P (no QRS)
      beats.push({ cx: g.x + g.prs.length * 50 + 14, p: true, qrs: false, t: false, pr: 14, pOnly: true });
    });
  } else if (block.site === "his-purkinje") {
    // Mobitz II — 3:1 conducted with constant PR, dropped P sits between
    const Pxs = [25, 65, 105, 145, 185, 225, 265, 305, 345];
    Pxs.forEach((px, i) => {
      const conducted = i % 3 !== 2; // drop every 3rd
      beats.push({
        cx: px + (conducted ? 14 : 0),
        p: true,
        qrs: conducted,
        t: conducted,
        pr: 14,
        wide: true,
        pOnly: !conducted,
      });
    });
  } else {
    // Complete — independent atrial (~75) and ventricular (~35) rates
    const Pxs = [20, 70, 120, 170, 220, 270, 320];
    Pxs.forEach((px) => beats.push({ cx: px, p: true, qrs: false, t: false, pr: 0, pOnly: true }));
    const Rxs = [50, 170, 290];
    Rxs.forEach((rx) => beats.push({ cx: rx, p: false, qrs: true, t: true, pr: 0, wide: true }));
  }

  return (
    <EcgStripFrame label={`${block.label} rhythm strip`}>
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" className="w-full min-h-[120px] sm:min-h-[140px]" role="img" aria-label={`Rhythm strip for ${block.label}`}>
      <defs>
        <pattern id={`rs-grid-${block.shortLabel}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={color} strokeOpacity="0.18" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill={withAlpha(color, 0.04)} stroke={withAlpha(color, 0.3)} strokeWidth="0.5" rx="4" />
      <rect x="0" y="0" width={W} height={H} fill={`url(#rs-grid-${block.shortLabel})`} pointerEvents="none" />
      {/* Baseline */}
      <line x1="0" y1={baseline} x2={W} y2={baseline} stroke="hsl(var(--muted-foreground))" strokeOpacity="0.25" strokeWidth="0.5" />

      {beats.map((b, i) => {
        // Draw P alone for dropped beats
        if (b.pOnly) {
          return (
            <g key={i}>
              <path d={`M ${b.cx - 3} ${baseline} q 3 -5 6 0`} fill="none" stroke={color} strokeWidth="1.5" />
              {!b.qrs && (
                <text x={b.cx + 3} y={baseline - 8} fontSize="6" fill={color} fontWeight="bold" textAnchor="middle">✕</text>
              )}
            </g>
          );
        }
        return (
          <path
            key={i}
            d={drawBeat(b.cx, baseline, { p: b.p, qrs: b.qrs, t: b.t, pr: b.pr, wide: b.wide })}
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}

      {/* Annotation */}
      <text x={6} y={11} fontSize="7" fill={color} fontWeight="bold">{block.shortLabel}</text>
    </svg>
    </EcgStripFrame>
  );
};

/* ───────────── Pace overlay (PPM lead positions) ───────────── */

const PaceOverlay = ({ block }: { block: BlockInfo }) => {
  const { ra, rv, lv } = block.leads;
  if (!ra && !rv && !lv) {
    return (
      <div className="flex items-center justify-center w-[110px] h-[140px] rounded-md border border-dashed border-border bg-background/40">
        <span className="text-[9px] text-muted-foreground text-center px-2 leading-snug">No device<br/>indicated</span>
      </div>
    );
  }

  // Wire colours per lead — RA blue, RV amber, LV red
  const RA = "hsl(210, 70%, 50%)";
  const RV = "hsl(35, 80%, 50%)";
  const LV = "hsl(0, 70%, 50%)";

  return (
    <svg viewBox="0 0 110 140" className="w-[110px] h-[140px]" role="img" aria-label={`Pacemaker lead positions for ${block.label}: ${block.device}`}>
      {/* Heart silhouette */}
      <path
        d="M 55 22 C 22 22 8 50 16 92 C 24 122 44 134 55 138 C 66 134 86 122 94 92 C 102 50 88 22 55 22 Z"
        fill="hsl(0, 30%, 88%)"
        fillOpacity="0.18"
        stroke="hsl(var(--border))"
        strokeWidth="0.5"
      />
      {/* IV septum */}
      <line x1="55" y1="55" x2="55" y2="125" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
      {/* Atrial / ventricular divider */}
      <line x1="22" y1="58" x2="88" y2="58" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />

      {/* Chamber labels */}
      <text x="38" y="42" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.7">RA</text>
      <text x="72" y="42" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.7">LA</text>
      <text x="36" y="98" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.7">RV</text>
      <text x="74" y="98" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.7">LV</text>

      {/* Pulse generator (left infraclavicular) */}
      <rect x="2" y="6" width="14" height="9" rx="2" fill="hsl(var(--foreground))" opacity="0.85" />
      <text x="9" y="13" fontSize="5" fill="hsl(var(--background))" textAnchor="middle" fontWeight="bold">PG</text>

      {/* SVC entry point shared */}
      <circle cx="40" cy="22" r="1.4" fill="hsl(var(--muted-foreground))" opacity="0.5" />

      {/* RA lead — curls into right atrial appendage */}
      {ra && (
        <g>
          <path d="M 16 11 Q 28 14 40 22 Q 42 32 38 42" fill="none" stroke={RA} strokeWidth="1.5" strokeLinecap="round" />
          {/* Tip — J-shaped */}
          <path d="M 38 42 q -3 4 1 6 q 4 1 4 -3" fill="none" stroke={RA} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="42" cy="44" r="1.6" fill={RA} />
          <text x="20" y="22" fontSize="5.5" fill={RA} fontWeight="bold">RA</text>
        </g>
      )}

      {/* RV lead — through tricuspid to RV apex */}
      {rv && (
        <g>
          <path d="M 16 13 Q 30 16 40 22 Q 50 38 46 60 Q 40 80 36 92" fill="none" stroke={RV} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="36" cy="92" r="1.8" fill={RV} />
          <text x="28" y="115" fontSize="5.5" fill={RV} fontWeight="bold" textAnchor="middle">RV apex</text>
        </g>
      )}

      {/* LV lead — via coronary sinus to lateral LV epicardium */}
      {lv && (
        <g>
          <path
            d="M 16 14 Q 30 18 40 22 Q 56 30 64 50 Q 78 70 80 92"
            fill="none"
            stroke={LV}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 1.5"
          />
          <circle cx="80" cy="92" r="1.8" fill={LV} />
          <text x="82" y="115" fontSize="5.5" fill={LV} fontWeight="bold" textAnchor="end">LV (CS)</text>
        </g>
      )}
    </svg>
  );
};

/* ───────────── Main component ───────────── */

const HeartBlockDiagram = () => {
  const [selected, setSelected] = useState<BlockKey>("first");
  const [showLabels, setShowLabels] = useState(true);
  const [showAll, setShowAll] = useState(true);
  const [showPacing, setShowPacing] = useState(true);

  const info = BLOCKS[selected];

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Heart blocks — site of block + rhythm strip"
          subtitle="1° → Mobitz I → Mobitz II → 3°. Tap a card to see the detail panel below."
          toggles={[
            { label: "All four", active: showAll, onChange: () => setShowAll((s) => !s) },
            { label: "Pacing leads", active: showPacing, onChange: () => setShowPacing((s) => !s) },
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
    <DiagramFigure
      id="heart-block-diagram"
      title="Heart block"
      description="Auto-generated wrapper for the Heart block anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
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
                        Pacing: {b.pacing}
                      </span>
                    </div>
  
                    <div className="flex flex-col gap-3">
                      <div className="w-full max-w-[200px] mx-auto"><TreeMini block={b} color={b.color} /></div>
                      <div className="min-w-0">
                        {showLabels && (
                          <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{b.siteDescription}</p>
                        )}
                        <RhythmStrip block={b} color={b.color} />
                        {showLabels && (
                          <p className="text-xs text-muted-foreground mt-2 italic leading-relaxed">{b.ecg}</p>
                        )}
                      </div>
                    </div>
  
                    {showPacing && (
                      <div className="mt-3 pt-3 border-t border-border/60 flex flex-col sm:flex-row gap-3 sm:items-center">
                        <PaceOverlay block={b} />
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] uppercase tracking-wide font-bold text-foreground">Device:</span>
                            <span
                              className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                              style={{ background: withAlpha(b.color, 0.15), color: b.color }}
                            >
                              {b.device}
                            </span>
                            {b.leads.ra && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[hsl(210,70%,50%)]/15 text-[hsl(210,70%,40%)] dark:text-[hsl(210,70%,65%)] font-semibold">RA</span>}
                            {b.leads.rv && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[hsl(35,80%,50%)]/15 text-[hsl(35,80%,38%)] dark:text-[hsl(35,80%,60%)] font-semibold">RV</span>}
                            {b.leads.lv && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[hsl(0,70%,50%)]/15 text-[hsl(0,70%,45%)] dark:text-[hsl(0,70%,65%)] font-semibold">LV (CS)</span>}
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">{b.deviceRationale}</p>
                        </div>
                      </div>
                    )}
                  </button>
    </DiagramFigure>
  );
            })}
          </div>
        ) : (
          <div className="p-3 rounded-lg border bg-background/60" style={{ borderColor: info.color, borderWidth: 2 }}>
            <p className="font-semibold text-sm text-foreground mb-2">{info.label}</p>
            <div className="flex flex-col gap-3">
              <div className="w-full max-w-[200px] mx-auto"><TreeMini block={info} color={info.color} /></div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{info.siteDescription}</p>
                <RhythmStrip block={info} color={info.color} />
                <p className="text-xs text-muted-foreground mt-2 italic leading-relaxed">{info.ecg}</p>
              </div>
            </div>
            {showPacing && (
              <div className="mt-3 pt-3 border-t border-border/60 flex flex-col sm:flex-row gap-3 sm:items-center">
                <PaceOverlay block={info} />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wide font-bold text-foreground">Device:</span>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                      style={{ background: withAlpha(info.color, 0.15), color: info.color }}
                    >
                      {info.device}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{info.deviceRationale}</p>
                </div>
              </div>
            )}
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
                Pacemaker: {info.pacing}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">ECG:</span> {info.ecg}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Pathophysiology:</span> {info.pathophysiology}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Management:</span> {info.management}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Device:</span> {info.device} — {info.deviceRationale}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeartBlockDiagram;
