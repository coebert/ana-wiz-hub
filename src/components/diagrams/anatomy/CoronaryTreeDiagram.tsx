/**
 * Coronary artery tree — ANTERIOR view (viewer faces patient).
 * Convention: patient RIGHT = viewer LEFT.
 *   - Right coronary system (RCA, acute marginal, PDA) on viewer-LEFT half (x < 200).
 *   - Left coronary system (LMS, LAD, LCx, diagonals, OM) on viewer-RIGHT half (x > 200).
 *   - Aorta + heart silhouette centred on x=200; viewBox 0 0 400 340.
 * Every label coordinate below is annotated with the structure it lands on
 * so leader-line accuracy is one-read verifiable.
 */
import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { useCoronarySelection, CoronaryTerritory } from "@/components/diagrams/intensive-care/coronarySelectionContext";
import { DiagramFigure } from "./_shared/DiagramFigure";


type Territory = CoronaryTerritory;

const territories: Record<Territory, {
  label: string;
  artery: string;
  leads: string[];
  wall: string;
  color: string;
  detail: string;
}> = {
  anterior: {
    label: "Anterior",
    artery: "LAD (mid/distal)",
    leads: ["V1", "V2", "V3", "V4"],
    wall: "Anterior LV wall + apex",
    color: "hsl(0, 60%, 50%)",
    detail: "Mid/distal LAD occlusion → anterior wall + apex. Proximal LAD (before first septal/diagonal) gives extensive anteroseptal STEMI with worst prognosis.",
  },
  septal: {
    label: "Septal",
    artery: "LAD septal perforators",
    leads: ["V1", "V2"],
    wall: "Anterior 2/3 of interventricular septum",
    color: "hsl(330, 55%, 50%)",
    detail: "Septal perforators arise from LAD. New RBBB or LBBB with anterior STEMI suggests proximal LAD occlusion involving His-bundle blood supply.",
  },
  lateral: {
    label: "Lateral",
    artery: "LCx / OM / Diagonal",
    leads: ["I", "aVL", "V5", "V6"],
    wall: "Lateral LV wall",
    color: "hsl(45, 70%, 50%)",
    detail: "Obtuse marginal branches of LCx, or diagonal branches of LAD. High-lateral pattern (I, aVL) suggests proximal LCx or D1.",
  },
  inferior: {
    label: "Inferior",
    artery: "RCA (85%) → PDA",
    leads: ["II", "III", "aVF"],
    wall: "Inferior LV wall + diaphragmatic surface",
    color: "hsl(210, 60%, 50%)",
    detail: "RCA dominant in 85% — gives PDA supplying inferior wall. AV node also from RCA (80%) → bradyarrhythmias common with inferior STEMI.",
  },
  posterior: {
    label: "Posterior",
    artery: "PDA (RCA) or LCx",
    leads: ["V7", "V8", "V9"],
    wall: "Posterior (inferobasal) LV wall",
    color: "hsl(270, 50%, 50%)",
    detail: "PDA from dominant artery (RCA 85%, LCx 15%). Often missed — look for tall R + ST↓ in V1–V3, confirm with posterior leads V7–V9.",
  },
  rv: {
    label: "Right Ventricular",
    artery: "Proximal RCA",
    leads: ["V3R", "V4R"],
    wall: "Right ventricular free wall",
    color: "hsl(160, 50%, 45%)",
    detail: "RV branches arise proximally from RCA (before AV groove). Preload-dependent — fluids, avoid nitrates/morphine/diuretics.",
  },
};

// Vessel paths colour-keyed to territories. Aorta at top, heart silhouette behind.
type Branch = {
  d: string;
  territory: Territory;
  width: number;
  labelX: number;
  labelY: number;
  label: string;
  labelAnchor?: "start" | "middle" | "end";
};

const branches: Branch[] = [
  // ── LEFT coronary system — drawn on viewer-RIGHT (patient's LEFT) ──
  // LMS: short stub from aorta (x=200) to bifurcation point at (235,110)
  { d: "M 200 60 L 200 95 L 235 110", territory: "anterior", width: 4.5, labelX: 242, labelY: 105, label: "LMS", labelAnchor: "start" },
  // LAD trunk down anterior IV groove on viewer-RIGHT side, ending near apex
  { d: "M 235 110 L 250 145 L 262 185 L 270 225", territory: "anterior", width: 4, labelX: 284, labelY: 175, label: "LAD", labelAnchor: "start" },
  // Septal perforators (small branches off LAD, pointing toward midline septum)
  { d: "M 252 150 L 232 162", territory: "septal", width: 2.2, labelX: 226, labelY: 162, label: "S1", labelAnchor: "end" },
  { d: "M 258 175 L 238 188", territory: "septal", width: 2, labelX: 232, labelY: 190, label: "S2", labelAnchor: "end" },
  // Diagonal branches off LAD (lateral upper, off to viewer-RIGHT)
  { d: "M 250 145 L 282 158", territory: "lateral", width: 2.4, labelX: 290, labelY: 156, label: "D1", labelAnchor: "start" },
  { d: "M 262 185 L 292 200", territory: "lateral", width: 2, labelX: 300, labelY: 200, label: "D2", labelAnchor: "start" },
  // Circumflex around left AV groove (curves from LMS bifurcation around viewer-RIGHT)
  { d: "M 235 110 Q 270 130 285 175 Q 290 215 265 245", territory: "lateral", width: 3.8, labelX: 308, labelY: 140, label: "LCx", labelAnchor: "start" },
  // Obtuse marginal off LCx (off to viewer-RIGHT)
  { d: "M 284 195 L 308 215", territory: "lateral", width: 2.2, labelX: 316, labelY: 220, label: "OM", labelAnchor: "start" },

  // ── RIGHT coronary system — drawn on viewer-LEFT (patient's RIGHT) ──
  // RCA ostium: from aorta to right AV groove
  { d: "M 200 60 L 200 95 L 165 110", territory: "inferior", width: 4.5, labelX: 156, labelY: 105, label: "RCA ostium", labelAnchor: "end" },
  // RCA down right AV groove
  { d: "M 165 110 Q 130 130 115 175 Q 110 220 135 248", territory: "inferior", width: 4, labelX: 104, labelY: 180, label: "RCA", labelAnchor: "end" },
  // RV branches (acute marginal) — proximal, off to viewer-LEFT
  { d: "M 140 130 L 110 138", territory: "rv", width: 2.4, labelX: 104, labelY: 138, label: "Acute marginal (RV)", labelAnchor: "end" },
  { d: "M 123 160 L 95 168", territory: "rv", width: 2, labelX: 88, labelY: 170, label: "RV branch", labelAnchor: "end" },
  // PDA — posterior descending from RCA crux toward midline (crux now at viewer-LEFT)
  { d: "M 135 248 L 160 268 L 182 282", territory: "posterior", width: 3.2, labelX: 170, labelY: 296, label: "PDA", labelAnchor: "middle" },
  // PL branch (posterolateral)
  { d: "M 135 248 L 152 274", territory: "posterior", width: 2.2, labelX: 142, labelY: 282, label: "PL", labelAnchor: "end" },
];

const CoronaryTreeDiagram = () => {
  const [selected, setSelected] = useCoronarySelection("anterior");
  const [showLabels, setShowLabels] = useState(true);
  const [showHeart, setShowHeart] = useState(true);

  const info = territories[selected];

  return (
    <DiagramFigure
      id="coronary-tree-diagram"
      title="Coronary tree"
      description="Auto-generated wrapper for the Coronary tree anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Coronary artery tree"
            subtitle="Culprit artery → wall supplied → ECG leads. Colour-keyed to the territory map above."
            toggles={[
              { label: "Heart silhouette", active: showHeart, onChange: () => setShowHeart((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          <div className="flex flex-wrap gap-2 mb-4">
            {(Object.keys(territories) as Territory[]).map((t) => (
              <button
                key={t}
                onClick={() => setSelected(t)}
                aria-pressed={selected === t}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all"
                style={{
                  borderColor: selected === t ? territories[t].color : "hsl(var(--border))",
                  backgroundColor: selected === t ? territories[t].color : "transparent",
                  color: selected === t ? "white" : "hsl(var(--muted-foreground))",
                }}
              >
                {territories[t].label}
              </button>
            ))}
          </div>
  
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex-shrink-0 mx-auto">
              <svg
                viewBox="0 0 400 340"
                className="w-full max-w-[420px]"
                role="img"
                aria-label="Schematic coronary artery tree colour-keyed to coronary territories"
              >
                <defs>
                  <radialGradient id="ct-bgShade" cx="50%" cy="45%" r="65%">
                    <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.04" />
                  </radialGradient>
                  <radialGradient id="ct-heart" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="hsl(0, 40%, 78%)" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="hsl(0, 30%, 55%)" stopOpacity="0.25" />
                  </radialGradient>
                  <filter id="ct-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" />
                    <feOffset dx="0" dy="1.4" result="off" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
  
                <rect x="2" y="2" width="396" height="336" rx="10" fill="url(#ct-bgShade)" stroke="hsl(var(--border))" strokeWidth="0.5" />
  
                {/* Heart silhouette */}
                {showHeart && (
                  <path
                    d="M 200 95 C 130 95 90 145 105 215 C 120 275 175 305 200 320 C 225 305 280 275 295 215 C 310 145 270 95 200 95 Z"
                    fill="url(#ct-heart)"
                    stroke="hsl(var(--border))"
                    strokeWidth="0.75"
                    opacity="0.6"
                  />
                )}
  
                {/* Aorta stub */}
                <rect x="190" y="20" width="20" height="50" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.5" />
                {showLabels && (
                  <text x="200" y="40" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="bold">Aorta</text>
                )}
  
                {/* Vessel branches */}
                {branches.map((b, i) => {
                  const isSelected = b.territory === selected;
                  const color = territories[b.territory].color;
                  return (
                    <g key={i} filter={isSelected ? "url(#ct-shadow)" : undefined}>
                      <path
                        d={b.d}
                        fill="none"
                        stroke={color}
                        strokeWidth={isSelected ? b.width + 1.5 : b.width}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={isSelected ? 1 : 0.4}
                      />
                    </g>
                  );
                })}
  
                {/* Labels */}
                {showLabels && branches.map((b, i) => {
                  const isSelected = b.territory === selected;
                  const color = territories[b.territory].color;
                  return (
                        <text
                      key={`l-${i}`}
                      x={b.labelX}
                      y={b.labelY}
                      textAnchor={b.labelAnchor ?? "middle"}
                      fontSize="8"
                      fontWeight={isSelected ? "bold" : "normal"}
                      fill={isSelected ? color : "hsl(var(--muted-foreground))"}
                      opacity={isSelected ? 1 : 0.65}
                    >
                      {b.label}
                    </text>
    );
                })}
  
                {/* Crux marker */}
                {showLabels && (
                  <>
                    <circle cx="135" cy="248" r="2.2" fill="hsl(var(--foreground))" opacity="0.6" />
                    <text x="130" y="244" textAnchor="end" fontSize="6.5" fill="hsl(var(--muted-foreground))" opacity="0.7">crux</text>
                  </>
                )}
              </svg>
            </div>
  
            {/* Side panel summary */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="p-3 rounded-lg border border-border">
                <p className="text-xs font-semibold text-foreground mb-1">Wall supplied</p>
                <p className="text-xs text-muted-foreground">{info.wall}</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="text-xs font-semibold text-foreground mb-1">ECG leads (ST ↑)</p>
                <div className="flex flex-wrap gap-1">
                  {info.leads.map((l) => (
                    <span key={l} className="px-2 py-0.5 rounded text-xs font-bold text-white" style={{ backgroundColor: info.color }}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="text-xs font-semibold text-foreground mb-1">Culprit artery</p>
                <p className="text-xs text-muted-foreground">{info.artery}</p>
              </div>
            </div>
          </div>
  
          {/* Standardised detail panel */}
          <div className="mt-4 min-h-[100px]">
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
              style={{ borderLeftWidth: 4, borderLeftColor: info.color }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-foreground text-sm">{info.label} territory</p>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{ background: withAlpha(info.color, 0.15), color: info.color }}
                >
                  {info.artery}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{info.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default CoronaryTreeDiagram;
