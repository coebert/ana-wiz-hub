import { useState, useEffect } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { withAlpha } from "@/lib/color-utils";
import { useCoronarySelection, CoronaryTerritory } from "./coronarySelectionContext";

/**
 * AHA 17-segment short-axis LV bullseye, colour-keyed to the SAME six coronary
 * territory hues used by `CoronaryTerritoryMapDiagram` and `CoronaryTreeDiagram`.
 *
 * The RV is intentionally not part of the bullseye (LV-only model) — its hue is
 * reserved in the legend for cross-reference.
 *
 * Segment numbering follows the AHA standard:
 *   Basal (1–6, outer ring):     1 anterior, 2 anteroseptal, 3 inferoseptal,
 *                                4 inferior, 5 inferolateral, 6 anterolateral
 *   Mid   (7–12, middle ring):   7 anterior, 8 anteroseptal, 9 inferoseptal,
 *                                10 inferior, 11 inferolateral, 12 anterolateral
 *   Apical(13–16, inner ring):   13 anterior, 14 septal, 15 inferior, 16 lateral
 *   Apex  (17, centre dot):      apical cap (LAD)
 */

type Territory = CoronaryTerritory;

const territoryMeta: Record<Territory, { label: string; artery: string; leads: string; color: string }> = {
  anterior:  { label: "Anterior",       artery: "LAD",                       leads: "V1–V4",      color: "hsl(0, 60%, 50%)" },
  septal:    { label: "Septal",         artery: "LAD (septal perforators)",  leads: "V1–V2",      color: "hsl(330, 55%, 50%)" },
  lateral:   { label: "Lateral",        artery: "LCx (or diagonals)",        leads: "I, aVL, V5–V6", color: "hsl(45, 70%, 50%)" },
  inferior:  { label: "Inferior",       artery: "RCA (PDA) — 85%",           leads: "II, III, aVF", color: "hsl(210, 60%, 50%)" },
  posterior: { label: "Posterior",      artery: "RCA (PDA) or LCx",          leads: "V7–V9",       color: "hsl(270, 50%, 50%)" },
  rv:        { label: "Right ventricle", artery: "Proximal RCA",              leads: "V3R, V4R",    color: "hsl(160, 50%, 45%)" },
};

interface Segment {
  id: number;
  name: string;
  ring: "basal" | "mid" | "apical" | "apex";
  /** AHA-standard angular position: 0° = top (anterior). Going clockwise. */
  centreDeg: number;
  spanDeg: number;
  territory: Territory;
}

// Basal + mid rings: 6 segments each, 60° wide.
// Standard orientation: anterior at top (0°), anteroseptal upper-right (60°),
// inferoseptal lower-right (120°), inferior bottom (180°), inferolateral
// lower-left (240°), anterolateral upper-left (300°).
const segments: Segment[] = [
  // Basal (1–6)
  { id: 1, name: "Basal anterior",        ring: "basal", centreDeg:   0, spanDeg: 60, territory: "anterior" },
  { id: 2, name: "Basal anteroseptal",    ring: "basal", centreDeg:  60, spanDeg: 60, territory: "septal"   },
  { id: 3, name: "Basal inferoseptal",    ring: "basal", centreDeg: 120, spanDeg: 60, territory: "septal"   },
  { id: 4, name: "Basal inferior",        ring: "basal", centreDeg: 180, spanDeg: 60, territory: "inferior" },
  { id: 5, name: "Basal inferolateral",   ring: "basal", centreDeg: 240, spanDeg: 60, territory: "lateral"  },
  { id: 6, name: "Basal anterolateral",   ring: "basal", centreDeg: 300, spanDeg: 60, territory: "lateral"  },
  // Mid (7–12)
  { id:  7, name: "Mid anterior",         ring: "mid",   centreDeg:   0, spanDeg: 60, territory: "anterior" },
  { id:  8, name: "Mid anteroseptal",     ring: "mid",   centreDeg:  60, spanDeg: 60, territory: "septal"   },
  { id:  9, name: "Mid inferoseptal",     ring: "mid",   centreDeg: 120, spanDeg: 60, territory: "septal"   },
  { id: 10, name: "Mid inferior",         ring: "mid",   centreDeg: 180, spanDeg: 60, territory: "inferior" },
  { id: 11, name: "Mid inferolateral",    ring: "mid",   centreDeg: 240, spanDeg: 60, territory: "lateral"  },
  { id: 12, name: "Mid anterolateral",    ring: "mid",   centreDeg: 300, spanDeg: 60, territory: "lateral"  },
  // Apical (13–16): 4 segments, 90° wide
  { id: 13, name: "Apical anterior",      ring: "apical", centreDeg:   0, spanDeg: 90, territory: "anterior" },
  { id: 14, name: "Apical septal",        ring: "apical", centreDeg:  90, spanDeg: 90, territory: "septal"   },
  { id: 15, name: "Apical inferior",      ring: "apical", centreDeg: 180, spanDeg: 90, territory: "inferior" },
  { id: 16, name: "Apical lateral",       ring: "apical", centreDeg: 270, spanDeg: 90, territory: "lateral"  },
  // Apex (17)
  { id: 17, name: "Apex",                 ring: "apex",   centreDeg:   0, spanDeg:  0, territory: "anterior" },
];

const RING_RADII = {
  basalOuter:  130,
  basalInner:  100,
  midOuter:    100,
  midInner:     65,
  apicalOuter:  65,
  apicalInner:  25,
  apex:         25,
};

const cx = 160;
const cy = 160;

// Angular convention: 0° = top of bullseye (anterior wall).
// SVG y is inverted, so we offset by -90° when converting to cartesian.
const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;

const polar = (r: number, deg: number) => ({
  x: cx + r * Math.cos(toRad(deg)),
  y: cy + r * Math.sin(toRad(deg)),
});

/** Build an annular sector path between two radii and two angles. */
const annularSector = (rOuter: number, rInner: number, startDeg: number, endDeg: number) => {
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  const p1 = polar(rOuter, startDeg);
  const p2 = polar(rOuter, endDeg);
  const p3 = polar(rInner, endDeg);
  const p4 = polar(rInner, startDeg);
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ");
};

const segmentPath = (s: Segment): string => {
  if (s.ring === "apex") {
    const r = RING_RADII.apex;
    return `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`;
  }
  const start = s.centreDeg - s.spanDeg / 2;
  const end = s.centreDeg + s.spanDeg / 2;
  const [rOuter, rInner] =
    s.ring === "basal"
      ? [RING_RADII.basalOuter, RING_RADII.basalInner]
      : s.ring === "mid"
        ? [RING_RADII.midOuter, RING_RADII.midInner]
        : [RING_RADII.apicalOuter, RING_RADII.apicalInner];
  return annularSector(rOuter, rInner, start, end);
};

const segmentLabelPos = (s: Segment) => {
  if (s.ring === "apex") return { x: cx, y: cy + 3 };
  const r =
    s.ring === "basal"
      ? (RING_RADII.basalOuter + RING_RADII.basalInner) / 2
      : s.ring === "mid"
        ? (RING_RADII.midOuter + RING_RADII.midInner) / 2
        : (RING_RADII.apicalOuter + RING_RADII.apicalInner) / 2;
  const p = polar(r, s.centreDeg);
  return { x: p.x, y: p.y + 3 };
};

const territoryOrder: Territory[] = ["anterior", "septal", "lateral", "inferior", "posterior", "rv"];

const LVBullseyeDiagram = () => {
  const [selected, setSelected] = useState<number>(17);
  const [showLabels, setShowLabels] = useState(true);
  const [showRingLabels, setShowRingLabels] = useState(true);
  const [highlightedTerritory, setHighlightedTerritory] = useState<Territory | null>(null);

  const activeSeg = segments.find((s) => s.id === selected) ?? segments[16];
  const activeMeta = territoryMeta[activeSeg.territory];

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="LV bullseye — AHA 17-segment model"
          subtitle="Short-axis polar plot. Tap a segment for its territory, artery and ECG leads."
          toggles={[
            { label: "Segment numbers", active: showLabels, onChange: () => setShowLabels((v) => !v) },
            { label: "Ring + wall labels", active: showRingLabels, onChange: () => setShowRingLabels((v) => !v) },
          ]}
        />

        {/* Territory legend — clicking a swatch highlights that whole territory across the bullseye */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {territoryOrder.map((t) => {
            const meta = territoryMeta[t];
            const active = highlightedTerritory === t;
            const isRV = t === "rv";
            return (
              <button
                key={t}
                type="button"
                onClick={() => !isRV && setHighlightedTerritory(active ? null : t)}
                disabled={isRV}
                aria-pressed={active}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] border transition-colors ${
                  active ? "text-foreground" : "border-border text-muted-foreground hover:bg-muted/50"
                } ${isRV ? "opacity-60 cursor-not-allowed" : ""}`}
                style={
                  active
                    ? { borderColor: meta.color, backgroundColor: withAlpha(meta.color, 0.12) }
                    : undefined
                }
                title={isRV ? "RV is not part of the LV 17-segment model" : `Highlight ${meta.label} territory`}
              >
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: meta.color, opacity: 0.85 }} />
                {meta.label}
                {isRV && <span className="text-[9px] opacity-70">(LV only)</span>}
              </button>
            );
          })}
        </div>

        <svg
          viewBox="0 0 320 340"
          className="w-full max-w-md mx-auto"
          role="img"
          aria-label="AHA 17-segment short-axis LV bullseye colour-keyed to coronary territories"
        >
          <defs>
            <radialGradient id="lvb-bg" cx="50%" cy="48%" r="60%">
              <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.18" />
              <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.03" />
            </radialGradient>
            <pattern id="lvb-tissue" patternUnits="userSpaceOnUse" width="6" height="6">
              <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
            </pattern>
            <filter id="lvb-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" />
              <feOffset dx="0" dy="1.4" result="off" />
              <feComponentTransfer><feFuncA type="linear" slope="0.28" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background card */}
          <rect x="0" y="0" width="320" height="340" rx="10" fill="url(#lvb-bg)" />
          <rect x="0" y="0" width="320" height="340" rx="10" fill="url(#lvb-tissue)" pointerEvents="none" />

          {/* Compass — short-axis convention */}
          {showRingLabels && (
            <g className="select-none pointer-events-none" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="500">
              <text x={cx} y={20} textAnchor="middle">ANTERIOR</text>
              <text x={cx} y={310} textAnchor="middle">INFERIOR</text>
              <text x={300} y={cy + 3} textAnchor="end">SEPTAL</text>
              <text x={20} y={cy + 3} textAnchor="start">LATERAL</text>
            </g>
          )}

          {/* Outer ring shadow — gives the bullseye some depth */}
          <circle
            cx={cx}
            cy={cy}
            r={RING_RADII.basalOuter}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            filter="url(#lvb-shadow)"
          />

          {/* Segments */}
          <g>
            {segments.map((s) => {
              const meta = territoryMeta[s.territory];
              const isSelected = s.id === selected;
              const isTerritoryActive = highlightedTerritory === s.territory;
              const dim = highlightedTerritory && !isTerritoryActive;
              const fillOpacity = isSelected ? 0.85 : isTerritoryActive ? 0.7 : dim ? 0.18 : 0.45;
              const strokeWidth = isSelected ? 2 : isTerritoryActive ? 1.4 : 0.9;
              return (
                <path
                  key={s.id}
                  d={segmentPath(s)}
                  fill={meta.color}
                  fillOpacity={fillOpacity}
                  stroke={isSelected ? meta.color : "hsl(var(--background))"}
                  strokeWidth={strokeWidth}
                  className="cursor-pointer transition-all duration-150"
                  onClick={() => setSelected(s.id)}
                  aria-label={`Segment ${s.id}: ${s.name}`}
                />
              );
            })}
          </g>

          {/* Segment numbers */}
          {showLabels && (
            <g className="select-none pointer-events-none" fontSize="10" fontWeight="600" fill="hsl(var(--foreground))">
              {segments.map((s) => {
                const pos = segmentLabelPos(s);
                return (
                  <text key={s.id} x={pos.x} y={pos.y} textAnchor="middle">
                    {s.id}
                  </text>
                );
              })}
            </g>
          )}

          {/* Ring labels (basal / mid / apical) */}
          {showRingLabels && (
            <g className="select-none pointer-events-none" fontSize="7.5" fill="hsl(var(--muted-foreground))" fontStyle="italic" opacity="0.85">
              <text x={cx} y={cy - (RING_RADII.basalOuter + 6)} textAnchor="middle" opacity="0">basal</text>
              <text x={cx + RING_RADII.basalOuter + 4} y={cy - 4} textAnchor="start">basal</text>
              <text x={cx + RING_RADII.midOuter + 4} y={cy + 8} textAnchor="start">mid</text>
              <text x={cx + RING_RADII.apicalOuter + 4} y={cy + 20} textAnchor="start">apical</text>
            </g>
          )}
        </svg>

        {/* Detail panel */}
        <div
          key={selected}
          className="mt-4 p-3 rounded-lg border border-border bg-background/80 space-y-1.5 min-h-[110px] animate-fade-in"
          style={{ borderLeftWidth: 4, borderLeftColor: activeMeta.color }}
        >
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <p className="font-semibold text-foreground text-sm">
              Segment {activeSeg.id} — {activeSeg.name}
            </p>
            <span
              className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md ml-auto"
              style={{ background: withAlpha(activeMeta.color, 0.15), color: activeMeta.color }}
            >
              {activeMeta.label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Artery:</span> {activeMeta.artery}
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">ECG leads:</span> {activeMeta.leads}
          </p>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Ring:</span>{" "}
            {activeSeg.ring === "apex" ? "Apical cap (segment 17)" : `${activeSeg.ring.charAt(0).toUpperCase() + activeSeg.ring.slice(1)} ring`}
          </p>
        </div>

        <p className="text-[11px] text-center text-muted-foreground mt-3 italic leading-relaxed">
          <span className="font-semibold not-italic text-foreground">Same six colours </span>
          map this bullseye to the coronary tree above and the territory map below it — pick a culprit artery in any
          diagram and the affected wall, leads and segments fall out together.
        </p>
      </div>
    </div>
  );
};

export default LVBullseyeDiagram;
