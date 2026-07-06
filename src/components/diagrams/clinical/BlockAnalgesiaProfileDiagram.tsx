import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Side-by-side analgesic profile: single-shot peripheral nerve block vs
 * continuous perineural catheter over 72 h. Hover/click the timeline to
 * read the pain score at any timepoint and see the highlighted phase
 * (block, wear-off cliff, rebound, oral-only).
 */

type Profile = "single" | "catheter";

const HOURS = 72;
const W = 640;
const H = 280;
const PAD = { top: 24, right: 20, bottom: 38, left: 38 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;

// Pain score model 0–10 over t hours.
// Single-shot bupivacaine ± adjunct: ~0–1 for ~16 h, then a sharp climb to a
// rebound peak (~8) at ~22 h, easing under oral analgesia to ~3–4 by 72 h.
const singleShot = (t: number): number => {
  if (t < 14) return 0.5 + 0.05 * t;                       // residual block
  if (t < 18) return 1 + 1.6 * (t - 14);                    // wear-off cliff
  if (t < 24) return 7 + 0.3 * Math.sin((t - 18) * 0.8);    // rebound peak
  // Decays under multimodal oral analgesia
  return Math.max(2.5, 7 - 0.18 * (t - 24));
};

// Catheter (4–8 ml/h ropivacaine 0.2% to 48 h, then removed):
// flat 1–2 for 48 h, gentle bump on removal, settles to 3 by 72 h.
const catheter = (t: number): number => {
  if (t < 48) return 1.2 + 0.4 * Math.sin(t * 0.4);          // background variation
  if (t < 54) return 1.5 + 0.6 * (t - 48);                    // small wear-off after removal
  return Math.max(2.8, 5 - 0.25 * (t - 54));                  // pre-emptive oral analgesia
};

const buildPath = (fn: (t: number) => number): string => {
  const pts: string[] = [];
  for (let i = 0; i <= HOURS * 2; i++) {
    const t = i / 2;
    const v = Math.max(0, Math.min(10, fn(t)));
    const x = PAD.left + (t / HOURS) * plotW;
    const y = PAD.top + plotH - (v / 10) * plotH;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
};

const singlePath = buildPath(singleShot);
const cathPath = buildPath(catheter);

const PHASES: {
  key: string;
  profile: Profile;
  start: number;
  end: number;
  label: string;
  color: string;
  description: string;
}[] = [
  {
    key: "ss-block",
    profile: "single",
    start: 0,
    end: 14,
    label: "Effective block",
    color: "hsl(160, 60%, 45%)",
    description: "Single-shot bupivacaine 0.5% (± perineural dexamethasone). Pain scores 0–2. Patient often discharged in this window — risk of being asleep when block wears off.",
  },
  {
    key: "ss-cliff",
    profile: "single",
    start: 14,
    end: 18,
    label: "Wear-off cliff",
    color: "hsl(35, 90%, 50%)",
    description: "Block recedes over ~2–4 h. Pain climbs steeply. If oral analgesia is taken in response to pain (rather than pre-emptively), serum levels lag behind the climb.",
  },
  {
    key: "ss-rebound",
    profile: "single",
    start: 18,
    end: 24,
    label: "Rebound pain",
    color: "hsl(0, 75%, 55%)",
    description: "Peak pain often exceeds the same procedure done without a block (Lavand'homme 2019; central sensitisation hypothesis). Leading cause of unplanned ED attendance and readmission in day-case ortho.",
  },
  {
    key: "ss-oral",
    profile: "single",
    start: 24,
    end: 72,
    label: "Oral analgesia phase",
    color: "hsl(220, 50%, 55%)",
    description: "Multimodal oral analgesia (regular paracetamol + NSAID, weak opioid PRN, short oxycodone IR course) controls residual pain. Scores fall to 3–4 by 72 h.",
  },
  {
    key: "cath-infusion",
    profile: "catheter",
    start: 0,
    end: 48,
    label: "Continuous infusion",
    color: "hsl(170, 55%, 45%)",
    description: "Elastomeric pump: ropivacaine 0.2% at 4–8 ml/h ± patient-controlled bolus. Flat low pain scores (1–2). Ilfeld RCTs show ~50% lower pain and opioid use vs single-shot at 24–72 h.",
  },
  {
    key: "cath-removal",
    profile: "catheter",
    start: 48,
    end: 54,
    label: "Catheter removal",
    color: "hsl(200, 70%, 50%)",
    description: "Pump removed at home (or by district nurse). Smaller, slower wear-off than single-shot — partly because oral analgesia has already been established and titrated.",
  },
  {
    key: "cath-oral",
    profile: "catheter",
    start: 54,
    end: 72,
    label: "Oral analgesia phase",
    color: "hsl(220, 50%, 55%)",
    description: "Established multimodal oral regimen takes over. Pain scores plateau around 3 by 72 h — comparable to single-shot at the same timepoint, but the patient never experienced the rebound peak.",
  },
];

export const BlockAnalgesiaProfileDiagram = () => {
  const [showPhases, setShowPhases] = useState(true);
  const [showRebound, setShowRebound] = useState(true);
  const [hoverHour, setHoverHour] = useState<number | null>(null);
  const [selectedKey, setSelectedKey] = useState<string>("ss-rebound");

  const selected = PHASES.find((p) => p.key === selectedKey)!;

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width;
    const xInPlot = xRatio * W - PAD.left;
    if (xInPlot < 0 || xInPlot > plotW) {
      setHoverHour(null);
      return;
    }
    setHoverHour((xInPlot / plotW) * HOURS);
  };

  const xForHour = (h: number) => PAD.left + (h / HOURS) * plotW;
  const yForScore = (v: number) => PAD.top + plotH - (v / 10) * plotH;

  const hoverSingle = hoverHour != null ? singleShot(hoverHour) : null;
  const hoverCath = hoverHour != null ? catheter(hoverHour) : null;

  return (
    <DiagramFigure
      id="block-analgesia-profile-diagram"
      title="Block analgesia profile"
      description="Auto-generated wrapper for the Block analgesia profile anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          {/* Toggle bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-0.5" style={{ background: "hsl(0, 75%, 55%)" }} />
                <span className="text-foreground font-medium">Single-shot block</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-4 h-0.5" style={{ background: "hsl(170, 55%, 45%)" }} />
                <span className="text-foreground font-medium">Continuous catheter</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={showPhases} onChange={(e) => setShowPhases(e.target.checked)} className="accent-primary" />
                <span className="text-muted-foreground">Phases</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={showRebound} onChange={(e) => setShowRebound(e.target.checked)} className="accent-primary" />
                <span className="text-muted-foreground">Rebound annotation</span>
              </label>
            </div>
          </div>
  
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            role="img"
            aria-label="Pain score profile over 72 hours comparing single-shot peripheral nerve block with continuous perineural catheter"
            onMouseMove={handleMove}
            onMouseLeave={() => setHoverHour(null)}
          >
            <defs>
              <linearGradient id="bapd-single-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 75%, 55%)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="hsl(0, 75%, 55%)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="bapd-cath-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(170, 55%, 45%)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="hsl(170, 55%, 45%)" stopOpacity="0" />
              </linearGradient>
              <filter id="bapd-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodOpacity="0.18" />
              </filter>
            </defs>
  
            {/* Phase shading (top half = single, bottom half = catheter) */}
            {showPhases && PHASES.map((p) => {
              const x1 = xForHour(p.start);
              const x2 = xForHour(p.end);
              const isSel = p.key === selectedKey;
              const yBand = p.profile === "single" ? PAD.top : PAD.top + plotH / 2;
              return (
                <rect
                  key={p.key}
                  x={x1}
                  y={yBand}
                  width={x2 - x1}
                  height={plotH / 2}
                  fill={p.color}
                  opacity={isSel ? 0.22 : 0.08}
                  onClick={() => setSelectedKey(p.key)}
                  style={{ cursor: "pointer" }}
                />
              );
            })}
  
            {/* Mid divider */}
            <line x1={PAD.left} y1={PAD.top + plotH / 2} x2={PAD.left + plotW} y2={PAD.top + plotH / 2} stroke="hsl(var(--border))" strokeDasharray="2,3" strokeWidth={0.5} />
  
            {/* Y-axis grid (pain 0–10) */}
            {[0, 2, 4, 6, 8, 10].map((v) => (
              <g key={v}>
                <line x1={PAD.left} y1={yForScore(v)} x2={PAD.left + plotW} y2={yForScore(v)} stroke="hsl(var(--border))" strokeWidth={0.5} opacity={0.5} />
                <text x={PAD.left - 6} y={yForScore(v) + 3} textAnchor="end" fontSize={9} fill="hsl(var(--muted-foreground))">{v}</text>
              </g>
            ))}
            <text x={10} y={PAD.top + plotH / 2} textAnchor="middle" fontSize={10} fill="hsl(var(--muted-foreground))" transform={`rotate(-90, 10, ${PAD.top + plotH / 2})`}>
              Pain (NRS 0–10)
            </text>
  
            {/* X-axis grid (every 12 h) */}
            {[0, 12, 24, 36, 48, 60, 72].map((h) => (
              <g key={h}>
                <line x1={xForHour(h)} y1={PAD.top} x2={xForHour(h)} y2={PAD.top + plotH} stroke="hsl(var(--border))" strokeWidth={0.5} opacity={0.4} strokeDasharray="2,3" />
                <text x={xForHour(h)} y={H - 18} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">{h}h</text>
              </g>
            ))}
            <text x={PAD.left + plotW / 2} y={H - 4} textAnchor="middle" fontSize={10} fill="hsl(var(--muted-foreground))">
              Time since block placement
            </text>
  
            {/* Filled areas under curves */}
            <path d={`${singlePath} L ${PAD.left + plotW} ${PAD.top + plotH} L ${PAD.left} ${PAD.top + plotH} Z`} fill="url(#bapd-single-fill)" />
            <path d={`${cathPath} L ${PAD.left + plotW} ${PAD.top + plotH} L ${PAD.left} ${PAD.top + plotH} Z`} fill="url(#bapd-cath-fill)" />
  
            {/* Curves */}
            <path d={singlePath} fill="none" stroke="hsl(0, 75%, 55%)" strokeWidth={2} filter="url(#bapd-shadow)" />
            <path d={cathPath} fill="none" stroke="hsl(170, 55%, 45%)" strokeWidth={2} filter="url(#bapd-shadow)" />
  
            {/* Rebound annotation */}
            {showRebound && (
              <g>
                <circle cx={xForHour(22)} cy={yForScore(singleShot(22))} r={4} fill="hsl(0, 75%, 55%)" />
                <line x1={xForHour(22)} y1={yForScore(singleShot(22))} x2={xForHour(22) + 50} y2={yForScore(singleShot(22)) - 18} stroke="hsl(0, 75%, 55%)" strokeWidth={1} />
                <rect x={xForHour(22) + 48} y={yForScore(singleShot(22)) - 32} width={108} height={18} rx={3} fill="hsl(0, 75%, 55%)" />
                <text x={xForHour(22) + 102} y={yForScore(singleShot(22)) - 19} textAnchor="middle" fontSize={9} fill="hsl(var(--background))" fontWeight={600}>
                  Rebound peak ~22 h
                </text>
              </g>
            )}
  
            {/* Hover cursor */}
            {hoverHour != null && hoverSingle != null && hoverCath != null && (
              <g>
                <line x1={xForHour(hoverHour)} y1={PAD.top} x2={xForHour(hoverHour)} y2={PAD.top + plotH} stroke="hsl(var(--foreground))" strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
                <circle cx={xForHour(hoverHour)} cy={yForScore(hoverSingle)} r={3.5} fill="hsl(0, 75%, 55%)" stroke="hsl(var(--background))" strokeWidth={1} />
                <circle cx={xForHour(hoverHour)} cy={yForScore(hoverCath)} r={3.5} fill="hsl(170, 55%, 45%)" stroke="hsl(var(--background))" strokeWidth={1} />
                <rect x={xForHour(hoverHour) > W - 110 ? xForHour(hoverHour) - 108 : xForHour(hoverHour) + 6} y={PAD.top + 4} width={102} height={42} rx={4} fill="hsl(var(--background))" stroke="hsl(var(--border))" />
                <text x={xForHour(hoverHour) > W - 110 ? xForHour(hoverHour) - 102 : xForHour(hoverHour) + 12} y={PAD.top + 17} fontSize={10} fill="hsl(var(--foreground))" fontWeight={600}>
                  t = {hoverHour.toFixed(0)} h
                </text>
                <text x={xForHour(hoverHour) > W - 110 ? xForHour(hoverHour) - 102 : xForHour(hoverHour) + 12} y={PAD.top + 30} fontSize={9} fill="hsl(0, 75%, 55%)">
                  SS: {hoverSingle.toFixed(1)}
                </text>
                <text x={xForHour(hoverHour) > W - 110 ? xForHour(hoverHour) - 102 : xForHour(hoverHour) + 12} y={PAD.top + 41} fontSize={9} fill="hsl(170, 55%, 45%)">
                  Cath: {hoverCath.toFixed(1)}
                </text>
              </g>
            )}
  
            {/* Profile labels on left edge */}
            <text x={PAD.left + 4} y={PAD.top + 12} fontSize={9} fill="hsl(0, 75%, 55%)" fontWeight={600}>SINGLE-SHOT</text>
            <text x={PAD.left + 4} y={PAD.top + plotH / 2 + 12} fontSize={9} fill="hsl(170, 55%, 45%)" fontWeight={600}>CATHETER</text>
          </svg>
  
          {/* Phase chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {PHASES.map((p) => {
              const isSel = p.key === selectedKey;
              return (
                    <button
                  key={p.key}
                  onClick={() => setSelectedKey(p.key)}
                  className={`text-xs px-2 py-1 rounded-full border transition-all ${
                    isSel ? "border-foreground/30 bg-background" : "border-border bg-background/50 hover:bg-background"
                  }`}
                  style={{
                    color: isSel ? p.color : "hsl(var(--muted-foreground))",
                    borderColor: isSel ? p.color : undefined,
                  }}
                >
                  {p.profile === "single" ? "● " : "○ "}{p.label}
                </button>
    );
            })}
          </div>
  
          {/* Detail panel */}
          <div
            className="mt-3 min-h-[110px] p-3 rounded-lg bg-background border-l-4 border-border"
            style={{ borderLeftColor: selected.color }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: selected.color }}>
                {selected.profile === "single" ? "Single-shot" : "Catheter"} · {selected.start}–{selected.end} h
              </span>
            </div>
            <p className="font-semibold text-foreground text-sm mb-1">{selected.label}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{selected.description}</p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default BlockAnalgesiaProfileDiagram;
