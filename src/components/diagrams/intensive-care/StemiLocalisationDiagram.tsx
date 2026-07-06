import { useMemo, useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { useCoronarySelection, CoronaryTerritory } from "@/components/diagrams/intensive-care/coronarySelectionContext";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * STEMI localisation interactive — *lead-driven* counterpart to
 * CoronaryTerritoryMapDiagram. The user clicks an ECG lead and the matching
 * coronary artery, LV territory and reciprocal-change leads all light up.
 *
 * Shares the CoronarySelectionProvider so this diagram and the territory map
 * stay in sync when mounted under the same provider.
 */

type Territory = CoronaryTerritory;

interface TerritoryMeta {
  label: string;
  artery: string;
  arteryShort: string;
  leads: string[];
  reciprocal: string[];
  color: string;
  pearl: string;
}

const territories: Record<Territory, TerritoryMeta> = {
  anterior: {
    label: "Anterior",
    artery: "Left anterior descending (LAD)",
    arteryShort: "LAD",
    leads: ["V1", "V2", "V3", "V4"],
    reciprocal: ["II", "III", "aVF"],
    color: "hsl(0, 60%, 50%)",
    pearl:
      "Anterior STEMI = highest mortality. Proximal LAD also takes out septum + first diagonal → expect cardiogenic shock and new bundle-branch block.",
  },
  septal: {
    label: "Septal",
    artery: "LAD — septal perforators",
    arteryShort: "LAD (S1)",
    leads: ["V1", "V2"],
    reciprocal: [],
    color: "hsl(330, 55%, 50%)",
    pearl:
      "Isolated septal STEMI is rare — almost always part of an antero-septal pattern. Watch for new RBBB or septal rupture (VSD) at 3–7 days.",
  },
  lateral: {
    label: "Lateral",
    artery: "Circumflex (LCx) or diagonal of LAD",
    arteryShort: "LCx / D1",
    leads: ["I", "aVL", "V5", "V6"],
    reciprocal: ["II", "III", "aVF"],
    color: "hsl(45, 70%, 50%)",
    pearl:
      "High lateral (I, aVL) → proximal LCx or first diagonal. Low lateral (V5, V6) → distal LCx. LCx STEMI is the most commonly *missed* infarct on a standard 12-lead.",
  },
  inferior: {
    label: "Inferior",
    artery: "RCA (85%) or LCx (15%)",
    arteryShort: "RCA",
    leads: ["II", "III", "aVF"],
    reciprocal: ["I", "aVL"],
    color: "hsl(210, 60%, 50%)",
    pearl:
      "ST↑ in III > II strongly suggests RCA (vs LCx). Always do V4R — RV involvement makes the patient preload-dependent (no nitrates / morphine / diuretics; load with fluid).",
  },
  posterior: {
    label: "Posterior",
    artery: "RCA (PDA) or LCx",
    arteryShort: "RCA / LCx",
    leads: ["V7", "V8", "V9"],
    reciprocal: ["V1", "V2", "V3"],
    color: "hsl(270, 50%, 50%)",
    pearl:
      "No standard lead faces the posterior wall. Tall R + ST depression in V1–V3 = posterior MI mirror image — confirm with posterior leads V7–V9 (≥0.5 mm ST↑ is diagnostic).",
  },
  rv: {
    label: "Right ventricular",
    artery: "Proximal RCA (before RV branch)",
    arteryShort: "Proximal RCA",
    leads: ["V3R", "V4R"],
    reciprocal: [],
    color: "hsl(160, 50%, 45%)",
    pearl:
      "Complicates ~40% of inferior STEMIs. ST↑ ≥1 mm in V4R is ~100% sensitive for proximal RCA occlusion. Treatment = fluid, avoid preload reducers, dual-chamber pacing if AV block.",
  },
};

// Reverse lookup: which territory does each lead belong to?
const leadToTerritory: Record<string, Territory> = {};
(Object.keys(territories) as Territory[]).forEach((t) => {
  territories[t].leads.forEach((l) => {
    // First-touch wins; for shared leads (V1/V2 belong to both anterior + septal)
    // we prefer the more specific (septal) entry.
    if (!leadToTerritory[l]) leadToTerritory[l] = t;
  });
});
// Manual overrides for shared leads — pick the most clinically useful default
leadToTerritory["V1"] = "septal";
leadToTerritory["V2"] = "septal";
leadToTerritory["V3"] = "anterior";
leadToTerritory["V4"] = "anterior";

const ecgLeadPositions: Record<string, { x: number; y: number }> = {
  I: { x: 62, y: 50 }, aVR: { x: 135, y: 50 }, V1: { x: 208, y: 50 }, V4: { x: 281, y: 50 },
  II: { x: 62, y: 95 }, aVL: { x: 135, y: 95 }, V2: { x: 208, y: 95 }, V5: { x: 281, y: 95 },
  III: { x: 62, y: 140 }, aVF: { x: 135, y: 140 }, V3: { x: 208, y: 140 }, V6: { x: 281, y: 140 },
};

const extraLeads = ["V3R", "V4R", "V7", "V8", "V9"];

const StemiLocalisationDiagram = () => {
  const [territory, setTerritory] = useCoronarySelection("anterior");
  const [showLabels, setShowLabels] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  // The "active lead" is what the user last clicked; defaults to the first
  // lead of the currently selected territory so the panel always has content.
  const [activeLead, setActiveLead] = useState<string>(territories["anterior"].leads[0]);

  const info = territories[territory];

  const handleLeadClick = (lead: string) => {
    const t = leadToTerritory[lead];
    if (!t) return; // aVR has no territory
    setTerritory(t);
    setActiveLead(lead);
  };

  const isLeadHighlighted = (lead: string) => info.leads.includes(lead);
  const isLeadReciprocal = (lead: string) => info.reciprocal.includes(lead);

  // Coronary artery diagram coordinates (simplified anterior view)
  const arteries = useMemo(() => {
    return [
      {
        id: "LAD" as const,
        path: "M 100 30 Q 100 80 95 130 Q 90 165 85 195",
        active: ["anterior", "septal"].includes(territory),
        color: territories.anterior.color,
        label: "LAD",
        labelPos: { x: 80, y: 110 },
      },
      {
        id: "LCx" as const,
        path: "M 100 30 Q 130 55 145 95 Q 152 130 148 165",
        active: ["lateral"].includes(territory) || (territory === "inferior" && false),
        color: territories.lateral.color,
        label: "LCx",
        labelPos: { x: 165, y: 110 },
      },
      {
        id: "RCA" as const,
        path: "M 100 30 Q 70 60 55 105 Q 48 145 60 185",
        active: ["inferior", "posterior", "rv"].includes(territory),
        color: territories.inferior.color,
        label: "RCA",
        labelPos: { x: 30, y: 110 },
      },
    ];
  }, [territory]);

  return (
    <DiagramFigure
      id="stemi-localisation-diagram"
      title="STEMI localisation"
      description="Auto-generated wrapper for the STEMI localisation anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="STEMI localisation"
            subtitle="Click any ECG lead — the culprit artery, LV territory and reciprocal-change leads light up"
            toggles={[
              { label: "Grid", active: showGrid, onChange: () => setShowGrid((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          <div className="flex flex-col lg:flex-row gap-5">
            {/* 12-lead ECG grid (interactive) */}
            <div className="flex-1 min-w-0 mx-auto">
              <svg
                viewBox="0 0 340 210"
                className="w-full max-w-[420px] mx-auto block"
                role="img"
                aria-label="Interactive 12-lead ECG. Click a lead to identify the culprit coronary artery."
              >
                <defs>
                  <radialGradient id="stemi-bg" cx="50%" cy="50%" r="65%">
                    <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.04" />
                  </radialGradient>
                  <pattern id="stemi-grid" patternUnits="userSpaceOnUse" width="6" height="6">
                    <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
                  </pattern>
                  <filter id="stemi-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                    <feOffset dx="0" dy="1.2" result="off" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
  
                <rect x="2" y="2" width="336" height="206" rx="8" fill="url(#stemi-bg)" stroke="hsl(var(--border))" strokeWidth="0.5" />
                {showGrid && (
                  <rect x="2" y="2" width="336" height="206" rx="8" fill="url(#stemi-grid)" pointerEvents="none" />
                )}
  
                {/* Standard 12-lead boxes */}
                {Object.entries(ecgLeadPositions).map(([lead, pos]) => {
                  const highlighted = isLeadHighlighted(lead);
                  const reciprocal = isLeadReciprocal(lead);
                  const isActive = lead === activeLead;
                  const color = highlighted ? info.color : reciprocal ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))";
                  const opacity = highlighted ? 1 : reciprocal ? 0.85 : 0.35;
                  const clickable = lead !== "aVR";
  
                  return (
                    <g
                      key={lead}
                      filter={highlighted ? "url(#stemi-shadow)" : undefined}
                      style={{ cursor: clickable ? "pointer" : "not-allowed" }}
                      onClick={() => clickable && handleLeadClick(lead)}
                    >
                      <rect
                        x={pos.x - 28} y={pos.y - 14} width="56" height="28" rx="5"
                        fill={highlighted ? color : reciprocal ? "hsl(var(--muted-foreground))" : "hsl(var(--background))"}
                        fillOpacity={highlighted ? 0.22 : reciprocal ? 0.08 : 0.5}
                        stroke={isActive ? "hsl(var(--foreground))" : highlighted ? color : reciprocal ? color : "hsl(var(--border))"}
                        strokeWidth={isActive ? 2.2 : highlighted ? 1.8 : reciprocal ? 1.2 : 0.8}
                        strokeDasharray={reciprocal && !highlighted ? "3 2" : undefined}
                        opacity={opacity}
                      />
                      <text
                        x={pos.x} y={pos.y - 1}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="10" fontWeight={highlighted || isActive ? "bold" : "normal"}
                        fill={highlighted ? color : reciprocal ? color : "hsl(var(--foreground))"}
                        opacity={opacity}
                        pointerEvents="none"
                      >
                        {lead}
                      </text>
                      {highlighted && (
                        <text x={pos.x} y={pos.y + 9} textAnchor="middle" fontSize="6" fontWeight="bold" fill={color} opacity="0.9" pointerEvents="none">ST ↑</text>
                      )}
                      {reciprocal && (
                        <text x={pos.x} y={pos.y + 9} textAnchor="middle" fontSize="6" fontWeight="bold" fill={color} opacity="0.7" pointerEvents="none">ST ↓</text>
                      )}
                    </g>
                  );
                })}
  
                {/* Extra leads row */}
                <line x1="20" y1="168" x2="320" y2="168" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
                {extraLeads.map((lead, i) => {
                  const x = 50 + i * 60;
                  const y = 188;
                  const highlighted = isLeadHighlighted(lead);
                  const reciprocal = isLeadReciprocal(lead);
                  const isActive = lead === activeLead;
                  const color = highlighted ? info.color : reciprocal ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))";
                  const opacity = highlighted ? 1 : reciprocal ? 0.8 : 0.4;
  
                  return (
                    <g
                      key={lead}
                      filter={highlighted ? "url(#stemi-shadow)" : undefined}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleLeadClick(lead)}
                    >
                      <rect
                        x={x - 24} y={y - 11} width="48" height="22" rx="4"
                        fill={highlighted ? color : "hsl(var(--background))"}
                        fillOpacity={highlighted ? 0.18 : 0.5}
                        stroke={isActive ? "hsl(var(--foreground))" : highlighted ? color : "hsl(var(--border))"}
                        strokeWidth={isActive ? 2 : highlighted ? 1.6 : 0.6}
                        strokeDasharray={highlighted ? undefined : "3 2"}
                        opacity={opacity}
                      />
                      <text
                        x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                        fontSize="8" fontWeight={highlighted || isActive ? "bold" : "normal"}
                        fill={highlighted ? color : "hsl(var(--foreground))"}
                        opacity={opacity}
                        pointerEvents="none"
                      >
                        {lead}
                      </text>
                    </g>
                  );
                })}
                {showLabels && (
                  <text x="170" y="172" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))" opacity="0.5">
                    Additional leads — V3R/V4R for RV, V7–V9 for posterior
                  </text>
                )}
              </svg>
            </div>
  
            {/* Coronary tree schematic */}
            <div className="flex-shrink-0 mx-auto">
              <svg
                viewBox="0 0 200 220"
                className="w-full max-w-[200px]"
                role="img"
                aria-label="Schematic coronary tree highlighting the culprit artery"
              >
                <defs>
                  <radialGradient id="stemi-heart-bg" cx="50%" cy="55%" r="60%">
                    <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.02" />
                  </radialGradient>
                </defs>
  
                {/* Heart silhouette */}
                <path
                  d="M 100 25 Q 50 25 35 75 Q 25 130 60 175 Q 90 205 100 205 Q 110 205 140 175 Q 175 130 165 75 Q 150 25 100 25 Z"
                  fill="url(#stemi-heart-bg)"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.75"
                />
  
                {/* Aorta stub */}
                <path d="M 95 12 L 95 28 L 105 28 L 105 12 Z" fill="hsl(var(--muted-foreground))" opacity="0.3" />
                {showLabels && (
                  <text x="115" y="20" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.6">Aorta</text>
                )}
  
                {/* Left main bifurcation point marker */}
                <circle cx="100" cy="30" r="2.5" fill="hsl(var(--muted-foreground))" opacity="0.5" />
  
                {/* Arteries */}
                {arteries.map((a) => (
                  <g key={a.id}>
                    <path
                      d={a.path}
                      fill="none"
                      stroke={a.active ? a.color : "hsl(var(--muted-foreground))"}
                      strokeWidth={a.active ? 3.5 : 1.5}
                      strokeOpacity={a.active ? 1 : 0.35}
                      strokeLinecap="round"
                      style={{ transition: "all 0.3s ease" }}
                    />
                    {a.active && (
                      <path
                        d={a.path}
                        fill="none"
                        stroke={a.color}
                        strokeWidth="3"
                        strokeOpacity="0.18"
                        strokeLinecap="round"
                      />
                    )}
                    {showLabels && (
                      <text
                        x={a.labelPos.x}
                        y={a.labelPos.y}
                        fontSize="9"
                        fontWeight={a.active ? "bold" : "normal"}
                        fill={a.active ? a.color : "hsl(var(--muted-foreground))"}
                        opacity={a.active ? 1 : 0.5}
                        textAnchor="middle"
                      >
                        {a.label}
                      </text>
                    )}
                  </g>
                ))}
  
                {/* PDA branch — only shown for inferior/posterior/rv */}
                {["inferior", "posterior", "rv"].includes(territory) && (
                  <>
                    <path
                      d="M 60 185 Q 80 195 100 195"
                      fill="none"
                      stroke={territories.inferior.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                    {showLabels && (
                      <text x="100" y="215" fontSize="7" fill={territories.inferior.color} textAnchor="middle" fontWeight="bold">PDA</text>
                    )}
                  </>
                )}
  
                {/* RV branch marker for RV territory */}
                {territory === "rv" && (
                  <circle cx="55" cy="105" r="6" fill="none" stroke={territories.rv.color} strokeWidth="2" strokeDasharray="2 1.5">
                    <animate attributeName="r" values="6;9;6" dur="1.6s" repeatCount="indefinite" />
                  </circle>
                )}
  
                {/* Occlusion marker on active artery */}
                {territory && (() => {
                  const t = territory;
                  const marker =
                    t === "anterior" ? { x: 92, y: 95 } :
                    t === "septal" ? { x: 95, y: 75 } :
                    t === "lateral" ? { x: 145, y: 100 } :
                    t === "inferior" ? { x: 52, y: 130 } :
                    t === "posterior" ? { x: 58, y: 165 } :
                    t === "rv" ? { x: 55, y: 105 } : null;
                  if (!marker) return null;
                  return (
                        <g>
                      <circle cx={marker.x} cy={marker.y} r="5" fill={info.color} stroke="hsl(var(--background))" strokeWidth="1.5" />
                      <text x={marker.x} y={marker.y + 1.5} fontSize="7" fontWeight="bold" fill="hsl(var(--background))" textAnchor="middle" dominantBaseline="middle">×</text>
                    </g>
    );
                })()}
              </svg>
            </div>
          </div>
  
          {/* Detail panel */}
          <div
            className="mt-4 p-3 rounded-lg border border-border bg-background/80 space-y-2"
            style={{ borderLeftWidth: 4, borderLeftColor: info.color }}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground text-sm">
                  Lead <span style={{ color: info.color }}>{activeLead}</span> → {info.label} STEMI
                </p>
              </div>
              <span
                className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md font-bold"
                style={{ background: withAlpha(info.color, 0.15), color: info.color }}
              >
                Culprit: {info.arteryShort}
              </span>
            </div>
  
            <div className="grid sm:grid-cols-3 gap-2 pt-1">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">ST elevation</p>
                <div className="flex flex-wrap gap-1">
                  {info.leads.map((l) => (
                    <span
                      key={l}
                      className="px-1.5 py-0.5 rounded text-[11px] font-bold text-white"
                      style={{ backgroundColor: info.color }}
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">Reciprocal ↓</p>
                <div className="flex flex-wrap gap-1">
                  {info.reciprocal.length > 0 ? (
                    info.reciprocal.map((l) => (
                      <span
                        key={l}
                        className="px-1.5 py-0.5 rounded text-[11px] font-medium border"
                        style={{ borderColor: info.color, color: info.color }}
                      >
                        {l}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">Artery</p>
                <p className="text-xs text-foreground font-medium">{info.artery}</p>
              </div>
            </div>
  
            <div className="pt-1 border-t border-border/50">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-0.5">Clinical pearl</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{info.pearl}</p>
            </div>
          </div>
  
          <p className="text-[11px] text-muted-foreground mt-2 text-center italic">
            Tip: aVR has no single territory but ST↑ in aVR (with diffuse ST↓) suggests left main or proximal LAD occlusion / triple-vessel disease.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default StemiLocalisationDiagram;
