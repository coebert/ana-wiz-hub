import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { useCoronarySelection, CoronaryTerritory } from "./coronarySelectionContext";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Territory = CoronaryTerritory;

const territories: Record<Territory, {
  label: string;
  artery: string;
  leads: string[];
  reciprocal: string[];
  color: string;
  detail: string;
}> = {
  anterior: {
    label: "Anterior",
    artery: "LAD",
    leads: ["V1", "V2", "V3", "V4"],
    reciprocal: [],
    color: "hsl(0, 60%, 50%)",
    detail: "Left anterior descending artery. Supplies anterior LV wall and anterior 2/3 of septum. Large territory — anterior STEMI carries highest mortality. Proximal LAD occlusion → extensive anterior + septal involvement.",
  },
  septal: {
    label: "Septal",
    artery: "LAD (septal perforators)",
    leads: ["V1", "V2"],
    reciprocal: [],
    color: "hsl(330, 55%, 50%)",
    detail: "Septal perforating branches of LAD. Isolated septal MI is rare — usually part of anterior STEMI. Septal rupture (VSD) is a mechanical complication. New LBBB may indicate proximal LAD occlusion.",
  },
  lateral: {
    label: "Lateral",
    artery: "LCx (or diagonal branches of LAD)",
    leads: ["I", "aVL", "V5", "V6"],
    reciprocal: ["III", "aVF"],
    color: "hsl(45, 70%, 50%)",
    detail: "Circumflex artery (obtuse marginal branches) or diagonal branches of LAD. High lateral (I, aVL) suggests proximal LCx or first diagonal. Low lateral (V5, V6) suggests distal LCx.",
  },
  inferior: {
    label: "Inferior",
    artery: "RCA (85%) or LCx (15%)",
    leads: ["II", "III", "aVF"],
    reciprocal: ["I", "aVL"],
    color: "hsl(210, 60%, 50%)",
    detail: "RCA in 85% (right dominant). LCx in 15% (left dominant). Check right-sided leads (V4R) for RV involvement. Associated with bradycardia (AV node supply from RCA) and Bezold-Jarisch reflex.",
  },
  posterior: {
    label: "Posterior (True)",
    artery: "RCA (PDA) or LCx",
    leads: ["V7", "V8", "V9"],
    reciprocal: ["V1", "V2", "V3"],
    color: "hsl(270, 50%, 50%)",
    detail: "Often missed — no standard leads face posterior wall directly. Diagnosed by: reciprocal ST depression + tall R waves in V1–V3, or ST elevation in posterior leads V7–V9. Commonly accompanies inferior STEMI. Always check posterior leads if inferior MI + anterior ST depression.",
  },
  rv: {
    label: "Right Ventricular",
    artery: "Proximal RCA",
    leads: ["V3R", "V4R"],
    reciprocal: [],
    color: "hsl(160, 50%, 45%)",
    detail: "Right-sided leads (especially V4R — most sensitive). Complicates ~40% of inferior STEMIs. Preload-dependent — avoid nitrates, morphine, diuretics. Treat with IV fluids. ST elevation in V4R >1mm is 100% sensitive for proximal RCA occlusion.",
  },
};

const ecgLeadPositions: Record<string, { x: number; y: number }> = {
  I: { x: 62, y: 50 }, aVR: { x: 135, y: 50 }, V1: { x: 208, y: 50 }, V4: { x: 355, y: 50 },
  II: { x: 62, y: 95 }, aVL: { x: 135, y: 95 }, V2: { x: 208, y: 95 }, V5: { x: 355, y: 95 },
  III: { x: 62, y: 140 }, aVF: { x: 135, y: 140 }, V3: { x: 208, y: 140 }, V6: { x: 355, y: 140 },
};

const extraLeads = ["V3R", "V4R", "V7", "V8", "V9"];

const CoronaryTerritoryMapDiagram = () => {
  const [selected, setSelected] = useCoronarySelection("anterior");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const isLeadHighlighted = (lead: string) => territories[selected].leads.includes(lead);
  const isLeadReciprocal = (lead: string) => territories[selected].reciprocal.includes(lead);

  const info = territories[selected];

  return (
    <DiagramFigure
      id="coronary-territory-map-diagram"
      title="Coronary territory MAP"
      description="Auto-generated wrapper for the Coronary territory MAP anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Coronary territory map"
            subtitle="Tap a territory to highlight its ECG leads, culprit artery and reciprocal changes"
            toggles={[
              { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          {/* Territory selector */}
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
            {/* 12-lead ECG grid */}
            <div className="flex-shrink-0 mx-auto">
              <svg
                viewBox="0 0 420 210"
                className="w-full max-w-[420px]"
                role="img"
                aria-label="12-lead ECG grid with selected coronary territory leads highlighted"
              >
                <defs>
                  <radialGradient id="ctm-bgShade" cx="50%" cy="50%" r="65%">
                    <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.04" />
                  </radialGradient>
                  <pattern id="ctm-grid" patternUnits="userSpaceOnUse" width="6" height="6">
                    <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
                  </pattern>
                  <filter id="ctm-shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                    <feOffset dx="0" dy="1.2" result="off" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
  
                {/* Background plate with depth */}
                <rect x="2" y="2" width="416" height="206" rx="8" fill="url(#ctm-bgShade)" stroke="hsl(var(--border))" strokeWidth="0.5" />
                {showSutures && (
                  <rect x="2" y="2" width="416" height="206" rx="8" fill="url(#ctm-grid)" pointerEvents="none" />
                )}
  
                {/* Column headers */}
                {showLabels && (
                  <>
                    <text x="62" y="25" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="bold">Limb</text>
                    <text x="135" y="25" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="bold">Augmented</text>
                    <text x="208" y="25" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="bold">Septal/Ant</text>
                    <text x="355" y="25" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="bold">Lateral</text>
                  </>
                )}
  
                {/* Standard 12-lead boxes */}
                {Object.entries(ecgLeadPositions).map(([lead, pos]) => {
                  const highlighted = isLeadHighlighted(lead);
                  const reciprocal = isLeadReciprocal(lead);
                  const color = highlighted ? info.color : "hsl(var(--muted-foreground))";
                  const opacity = highlighted ? 1 : reciprocal ? 0.7 : 0.18;
  
                  return (
                    <g key={lead} filter={highlighted ? "url(#ctm-shadow)" : undefined}>
                      <rect
                        x={pos.x - 30} y={pos.y - 15} width="60" height="30" rx="5"
                        fill={highlighted ? color : "hsl(var(--muted-foreground))"}
                        fillOpacity={highlighted ? 0.18 : reciprocal ? 0.06 : 0.03}
                        stroke={highlighted ? color : "hsl(var(--border))"}
                        strokeWidth={highlighted ? 1.6 : 0.8}
                        opacity={opacity}
                      />
                      <text
                        x={pos.x} y={pos.y + 1}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="10" fontWeight={highlighted ? "bold" : "normal"}
                        fill={highlighted ? color : "hsl(var(--foreground))"}
                        opacity={opacity}
                      >
                        {lead}
                      </text>
                      {highlighted && (
                        <text x={pos.x} y={pos.y + 12} textAnchor="middle" fontSize="5" fill={color} opacity="0.8">ST ↑</text>
                      )}
                      {reciprocal && (
                        <text x={pos.x} y={pos.y + 12} textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.6">ST ↓ reciprocal</text>
                      )}
                    </g>
                  );
                })}
  
                {/* Extra leads row */}
                <line x1="32" y1="168" x2="388" y2="168" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
                {extraLeads.map((lead, i) => {
                  const x = 62 + i * 80;
                  const y = 188;
                  const highlighted = isLeadHighlighted(lead);
                  const color = highlighted ? info.color : "hsl(var(--muted-foreground))";
                  const opacity = highlighted ? 1 : 0.18;
  
                  return (
                        <g key={lead} filter={highlighted ? "url(#ctm-shadow)" : undefined}>
                      <rect
                        x={x - 28} y={y - 12} width="56" height="22" rx="4"
                        fill={highlighted ? color : "hsl(var(--muted-foreground))"}
                        fillOpacity={highlighted ? 0.15 : 0.02}
                        stroke={highlighted ? color : "hsl(var(--border))"}
                        strokeWidth={highlighted ? 1.6 : 0.5}
                        opacity={opacity}
                        strokeDasharray={highlighted ? "none" : "3 2"}
                      />
                      <text
                        x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                        fontSize="8" fontWeight={highlighted ? "bold" : "normal"}
                        fill={highlighted ? color : "hsl(var(--foreground))"}
                        opacity={opacity}
                      >
                        {lead}
                      </text>
                    </g>
    );
                })}
                {showLabels && (
                  <text x="210" y="172" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))" opacity="0.5">Additional leads (not standard 12-lead)</text>
                )}
              </svg>
            </div>
  
            {/* Lead summary cards */}
            <div className="flex-1 min-w-0 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-foreground mb-1">ST elevation</p>
                  <div className="flex flex-wrap gap-1">
                    {info.leads.map((l) => (
                      <span key={l} className="px-2 py-0.5 rounded text-xs font-bold text-white" style={{ backgroundColor: info.color }}>
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-foreground mb-1">Reciprocal ↓</p>
                  <div className="flex flex-wrap gap-1">
                    {info.reciprocal.length > 0 ? info.reciprocal.map((l) => (
                      <span key={l} className="px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground">
                        {l}
                      </span>
                    )) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Standardised detail panel */}
          <div className="mt-4 min-h-[110px]">
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

export default CoronaryTerritoryMapDiagram;
