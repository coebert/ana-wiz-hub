import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { useCoronarySelection, CoronaryTerritory } from "./coronarySelectionContext";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * 12-lead ECG schematic — fourth synced view of the coronary trio.
 * Each lead box draws a stylised P-QRS-T. When the lead belongs to the
 * currently-selected territory it shows ST elevation and is recoloured;
 * reciprocal leads show ST depression. Clicking a lead pushes that lead's
 * primary territory into the shared CoronarySelectionProvider so the
 * bullseye, tree and territory map all follow.
 */

type Territory = CoronaryTerritory;

const territoryMeta: Record<Territory, { label: string; artery: string; color: string; detail: string }> = {
  anterior:  { label: "Anterior",        artery: "LAD",                       color: "hsl(0, 60%, 50%)",   detail: "Anterior STEMI — proximal LAD has worst prognosis. Watch for cardiogenic shock and new bundle branch block." },
  septal:    { label: "Septal",          artery: "LAD (septal perforators)",  color: "hsl(330, 55%, 50%)", detail: "Isolated septal MI is rare — usually part of anteroseptal STEMI. New BBB suggests proximal LAD." },
  lateral:   { label: "Lateral",         artery: "LCx (or diagonals)",        color: "hsl(45, 70%, 50%)",  detail: "High-lateral (I, aVL) ↔ proximal LCx or D1. Low-lateral (V5–V6) ↔ distal LCx or large OM." },
  inferior:  { label: "Inferior",        artery: "RCA (85%) → PDA",           color: "hsl(210, 60%, 50%)", detail: "RCA dominant in 85% — bradyarrhythmias common (AV node from RCA). Always check V4R for RV involvement." },
  posterior: { label: "Posterior",       artery: "PDA (RCA) or LCx",          color: "hsl(270, 50%, 50%)", detail: "Posterior STEMI — tall R + ST↓ in V1–V3 reciprocal, confirm with V7–V9 ST elevation." },
  rv:        { label: "Right ventricle", artery: "Proximal RCA",              color: "hsl(160, 50%, 45%)", detail: "RV infarct is preload-dependent — fluids first; avoid nitrates/morphine/diuretics." },
};

interface LeadDef {
  id: string;
  /** Primary territory this lead "looks at" — used when the lead is clicked. */
  primary: Territory;
  /** Other territories that also produce ST↑ in this lead. */
  alsoElevatedIn?: Territory[];
  /** Territories whose ST↑ produces reciprocal ST↓ in this lead. */
  reciprocalOf?: Territory[];
  /** Grid placement (col 0-3, row 0-2) for the standard 3×4 layout. */
  col: number;
  row: number;
}

const STANDARD_LEADS: LeadDef[] = [
  { id: "I",   col: 0, row: 0, primary: "lateral",  reciprocalOf: ["inferior"] },
  { id: "aVR", col: 1, row: 0, primary: "anterior" /* aVR is special — used as a global indicator */ },
  { id: "V1",  col: 2, row: 0, primary: "septal",   alsoElevatedIn: ["anterior"], reciprocalOf: ["posterior"] },
  { id: "V4",  col: 3, row: 0, primary: "anterior" },
  { id: "II",  col: 0, row: 1, primary: "inferior", reciprocalOf: ["lateral", "anterior"] },
  { id: "aVL", col: 1, row: 1, primary: "lateral",  reciprocalOf: ["inferior"] },
  { id: "V2",  col: 2, row: 1, primary: "septal",   alsoElevatedIn: ["anterior"], reciprocalOf: ["posterior"] },
  { id: "V5",  col: 3, row: 1, primary: "lateral",  alsoElevatedIn: ["anterior"] },
  { id: "III", col: 0, row: 2, primary: "inferior", reciprocalOf: ["lateral", "anterior"] },
  { id: "aVF", col: 1, row: 2, primary: "inferior", reciprocalOf: ["lateral", "anterior"] },
  { id: "V3",  col: 2, row: 2, primary: "anterior", reciprocalOf: ["posterior"] },
  { id: "V6",  col: 3, row: 2, primary: "lateral",  alsoElevatedIn: ["anterior"] },
];

const EXTRA_LEADS: LeadDef[] = [
  { id: "V3R", col: 0, row: 0, primary: "rv" },
  { id: "V4R", col: 1, row: 0, primary: "rv" },
  { id: "V7",  col: 2, row: 0, primary: "posterior" },
  { id: "V8",  col: 3, row: 0, primary: "posterior" },
  { id: "V9",  col: 4, row: 0, primary: "posterior" },
];

/* Layout constants (SVG units) */
const BOX_W = 84;
const BOX_H = 50;
const GAP_X = 6;
const GAP_Y = 6;
const PAD = 14;
const HEADER_H = 18;

const gridX = (col: number) => PAD + col * (BOX_W + GAP_X);
const gridY = (row: number) => PAD + HEADER_H + row * (BOX_H + GAP_Y);

const TOTAL_W = PAD * 2 + 4 * BOX_W + 3 * GAP_X;
const STD_H = PAD + HEADER_H + 3 * BOX_H + 2 * GAP_Y + PAD;
const EXTRA_H = 70; // extra leads row
const STRIP_H = 70; // rhythm strip
const TOTAL_H = STD_H + EXTRA_H + STRIP_H + 18;

/**
 * Stylised P-QRS-T. `st` controls the ST-segment offset:
 *   +1 = elevation (above baseline), -1 = depression, 0 = isoelectric.
 */
const beatPath = (originX: number, baseline: number, st: number, scale = 1) => {
  const sx = scale;
  // P wave
  let d = `M ${originX} ${baseline} q ${3 * sx} ${-5 * sx} ${6 * sx} 0 `;
  // PR segment
  d += `L ${originX + 12 * sx} ${baseline} `;
  // Q
  d += `l ${1.5 * sx} ${3 * sx} `;
  // R
  d += `l ${2 * sx} ${-20 * sx} `;
  // S
  d += `l ${3 * sx} ${24 * sx} `;
  // J point
  const jX = originX + 12 * sx + 6.5 * sx;
  const _jY = baseline + 7 * sx;
  // ST segment — offset above/below baseline by `st` * 5
  const stOffset = -st * 5 * sx;
  d += `L ${jX + 4 * sx} ${baseline + stOffset} `;
  // T wave
  d += `q ${3 * sx} ${-6 * sx} ${7 * sx} 0 `;
  // back to baseline
  d += `L ${jX + 18 * sx} ${baseline} `;
  return d;
};

const _HORIZONTAL_PRECORDIAL: Territory[] = ["septal", "anterior", "lateral"];

const TwelveLeadEcgDiagram = () => {
  const [selected, setSelected] = useCoronarySelection("anterior");
  const [showExtra, setShowExtra] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const info = territoryMeta[selected];

  /** Returns {st: +1|-1|0, primary: bool} for a lead under the current territory. */
  const leadState = (lead: LeadDef) => {
    if (lead.primary === selected) return { st: 1, primary: true };
    if (lead.alsoElevatedIn?.includes(selected)) return { st: 1, primary: false };
    if (lead.reciprocalOf?.includes(selected)) return { st: -1, primary: false };
    return { st: 0, primary: false };
  };

  const renderLead = (lead: LeadDef, x: number, y: number, w = BOX_W, h = BOX_H) => {
    const { st, primary: _primary } = leadState(lead);
    const elevated = st > 0;
    const depressed = st < 0;
    const isLeadActiveTerritory = lead.primary === selected;

    const stroke = elevated ? info.color : depressed ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))";
    const fillBg = elevated ? withAlpha(info.color, 0.14) : depressed ? "hsl(var(--muted) / 0.5)" : "hsl(var(--background) / 0.6)";
    const borderColor = elevated ? info.color : depressed ? "hsl(var(--muted-foreground))" : "hsl(var(--border))";
    const borderWidth = elevated ? 1.6 : depressed ? 1 : 0.8;

    const beatY = y + h / 2 + 4;
    const beatX = x + 8;
    const beatScale = (w - 16) / 32; // fit beat to box width

    return (
      <g
        key={lead.id}
        className="cursor-pointer"
        onClick={() => setSelected(lead.primary)}
        role="button"
        aria-label={`Lead ${lead.id} — ${territoryMeta[lead.primary].label}`}
      >
        <rect
          x={x} y={y} width={w} height={h} rx={4}
          fill={fillBg}
          stroke={borderColor}
          strokeWidth={borderWidth}
          strokeDasharray={isLeadActiveTerritory && !elevated ? "3 2" : undefined}
        />
        {/* baseline */}
        <line x1={x + 4} y1={beatY} x2={x + w - 4} y2={beatY} stroke="hsl(var(--muted-foreground))" strokeOpacity="0.3" strokeWidth="0.5" />
        {/* beat */}
        <path
          d={beatPath(beatX, beatY, st, beatScale)}
          fill="none"
          stroke={stroke}
          strokeWidth={elevated ? 1.5 : 1.1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* lead label */}
        <text
          x={x + 5} y={y + 11}
          fontSize="9"
          fontWeight={elevated || isLeadActiveTerritory ? "bold" : "600"}
          fill={elevated ? info.color : "hsl(var(--foreground))"}
        >
          {lead.id}
        </text>
        {/* ST tag */}
        {elevated && showLabels && (
          <text x={x + w - 4} y={y + 11} textAnchor="end" fontSize="7" fontWeight="bold" fill={info.color}>ST↑</text>
        )}
        {depressed && showLabels && (
          <text x={x + w - 4} y={y + 11} textAnchor="end" fontSize="7" fill="hsl(var(--muted-foreground))">ST↓</text>
        )}
      </g>
    );
  };

  /* Rhythm strip — long lead II. Repeats 5 beats; ST shifts when selected
     territory is "inferior" (matching lead II's primary territory). */
  const rhythmStripStOffset = leadState({ id: "II", col: 0, row: 0, primary: "inferior", reciprocalOf: ["lateral"] }).st;
  const rhythmStripColor = rhythmStripStOffset > 0 ? info.color : rhythmStripStOffset < 0 ? "hsl(var(--muted-foreground))" : "hsl(var(--foreground))";

  return (
    <DiagramFigure
      id="twelve-lead-ecg-diagram"
      title="Twelve lead ECG"
      description="Auto-generated wrapper for the Twelve lead ECG anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="12-lead ECG — synced view"
            subtitle="Tap any lead to select its territory across all four diagrams. Active territory leads show ST elevation; reciprocal leads show ST depression."
            toggles={[
              { label: "Posterior + RV leads", active: showExtra, onChange: () => setShowExtra((s) => !s) },
              { label: "ST labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          {/* Territory chips — same UX as the other three diagrams */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(Object.keys(territoryMeta) as Territory[]).map((t) => (
              <button
                key={t}
                onClick={() => setSelected(t)}
                aria-pressed={selected === t}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                style={{
                  borderColor: selected === t ? territoryMeta[t].color : "hsl(var(--border))",
                  backgroundColor: selected === t ? territoryMeta[t].color : "transparent",
                  color: selected === t ? "white" : "hsl(var(--muted-foreground))",
                }}
              >
                {territoryMeta[t].label}
              </button>
            ))}
          </div>
  
          {/* SVG */}
          <svg
            viewBox={`0 0 ${TOTAL_W} ${TOTAL_H}`}
            className="w-full max-w-[640px] mx-auto"
            role="img"
            aria-label="12-lead ECG schematic with ST elevation in the selected coronary territory"
          >
            <defs>
              <radialGradient id="ecg12-bg" cx="50%" cy="40%" r="70%">
                <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.16" />
                <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.03" />
              </radialGradient>
              <pattern id="ecg12-grid" patternUnits="userSpaceOnUse" width="5" height="5">
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="hsl(var(--muted-foreground))" strokeOpacity="0.1" strokeWidth="0.5" />
              </pattern>
              <filter id="ecg12-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                <feOffset dx="0" dy="1" result="off" />
                <feComponentTransfer><feFuncA type="linear" slope="0.25" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
  
            <rect x="0" y="0" width={TOTAL_W} height={TOTAL_H} rx={10} fill="url(#ecg12-bg)" stroke="hsl(var(--border))" strokeWidth="0.5" />
            <rect x="0" y="0" width={TOTAL_W} height={TOTAL_H} rx={10} fill="url(#ecg12-grid)" pointerEvents="none" />
  
            {/* Column headers */}
            {showLabels && (
              <g fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="bold" opacity="0.6">
                <text x={gridX(0) + BOX_W / 2} y={PAD + 10} textAnchor="middle">Limb</text>
                <text x={gridX(1) + BOX_W / 2} y={PAD + 10} textAnchor="middle">Augmented</text>
                <text x={gridX(2) + BOX_W / 2} y={PAD + 10} textAnchor="middle">Septal/Ant</text>
                <text x={gridX(3) + BOX_W / 2} y={PAD + 10} textAnchor="middle">Lateral</text>
              </g>
            )}
  
            {/* Standard 12-lead grid */}
            {STANDARD_LEADS.map((lead) =>
              renderLead(lead, gridX(lead.col), gridY(lead.row))
            )}
  
            {/* Divider */}
            <line
              x1={PAD} y1={STD_H - PAD / 2}
              x2={TOTAL_W - PAD} y2={STD_H - PAD / 2}
              stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3"
            />
  
            {/* Extra leads (RV + posterior) */}
            {showExtra && (
              <g>
                {showLabels && (
                  <text x={PAD} y={STD_H + 10} fontSize="7.5" fill="hsl(var(--muted-foreground))" opacity="0.7" fontWeight="600">
                    Additional leads (V3R / V4R for RV; V7–V9 for posterior)
                  </text>
                )}
                {EXTRA_LEADS.map((lead) => {
                  // 5 leads across — tighter boxes
                  const w = (TOTAL_W - PAD * 2 - 4 * GAP_X) / 5;
                  const x = PAD + lead.col * (w + GAP_X);
                  const y = STD_H + 16;
                  return renderLead(lead, x, y, w, EXTRA_H - 20);
                })}
              </g>
            )}
  
            {/* Rhythm strip — long lead II */}
            <g>
              {showLabels && (
                <text x={PAD} y={TOTAL_H - STRIP_H - 4} fontSize="7.5" fill="hsl(var(--muted-foreground))" opacity="0.7" fontWeight="600">
                  Rhythm strip (lead II)
                </text>
              )}
              <rect
                x={PAD}
                y={TOTAL_H - STRIP_H + 2}
                width={TOTAL_W - PAD * 2}
                height={STRIP_H - 14}
                rx={4}
                fill={rhythmStripStOffset > 0 ? withAlpha(info.color, 0.08) : "hsl(var(--background) / 0.4)"}
                stroke={rhythmStripStOffset > 0 ? info.color : "hsl(var(--border))"}
                strokeWidth={rhythmStripStOffset > 0 ? 1.4 : 0.6}
              />
              {(() => {
                const stripY = TOTAL_H - STRIP_H + (STRIP_H - 14) / 2 + 4;
                const stripStartX = PAD + 12;
                const stripEndX = TOTAL_W - PAD - 12;
                const beats = 5;
                const beatGap = (stripEndX - stripStartX) / beats;
                return (
                  <>
                    <line x1={stripStartX - 4} y1={stripY} x2={stripEndX + 4} y2={stripY} stroke="hsl(var(--muted-foreground))" strokeOpacity="0.25" strokeWidth="0.5" />
                    {Array.from({ length: beats }).map((_, i) => (
                      <path
                        key={i}
                        d={beatPath(stripStartX + i * beatGap, stripY, rhythmStripStOffset, beatGap / 32)}
                        fill="none"
                        stroke={rhythmStripColor}
                        strokeWidth={rhythmStripStOffset > 0 ? 1.5 : 1.1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ))}
                    <text x={stripStartX - 6} y={stripY - (STRIP_H - 14) / 2 + 10} fontSize="8" fontWeight="bold" fill={rhythmStripColor}>II</text>
                  </>
                );
              })()}
            </g>
          </svg>
  
          {/* Detail panel — matches the other three diagrams */}
          <div className="mt-4 min-h-[110px]">
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
              style={{ borderLeftWidth: 4, borderLeftColor: info.color }}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="font-semibold text-foreground text-sm">{info.label} territory</p>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{ background: withAlpha(info.color, 0.15), color: info.color }}
                >
                  {info.artery}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {STANDARD_LEADS.concat(EXTRA_LEADS)
                  .filter((l) => leadState(l).st > 0)
                  .map((l) => (
                    <span key={l.id} className="px-2 py-0.5 rounded text-[10px] font-bold text-white" style={{ backgroundColor: info.color }}>
                      {l.id}
                    </span>
                  ))}
                {STANDARD_LEADS.filter((l) => leadState(l).st < 0).length > 0 && (
                  <>
                    <span className="text-[10px] text-muted-foreground self-center mx-1">reciprocal ↓</span>
                    {STANDARD_LEADS.filter((l) => leadState(l).st < 0).map((l) => (
                      <span key={`r-${l.id}`} className="px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground">
                        {l.id}
                      </span>
                    ))}
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{info.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default TwelveLeadEcgDiagram;
