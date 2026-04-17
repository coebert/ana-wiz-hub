import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";

type Territory = "anterior" | "lateral" | "inferior" | "posterior" | "septal" | "rv" | null;

const territories: Record<Exclude<Territory, null>, {
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
  const [selected, setSelected] = useState<Territory>(null);

  const isLeadHighlighted = (lead: string) => {
    if (!selected) return false;
    return territories[selected].leads.includes(lead);
  };

  const isLeadReciprocal = (lead: string) => {
    if (!selected) return false;
    return territories[selected].reciprocal.includes(lead);
  };

  const getLeadColor = (lead: string) => {
    if (!selected) return "hsl(var(--muted-foreground))";
    if (isLeadHighlighted(lead)) return territories[selected].color;
    if (isLeadReciprocal(lead)) return "hsl(var(--muted-foreground))";
    return "hsl(var(--muted-foreground))";
  };

  const getLeadOpacity = (lead: string) => {
    if (!selected) return 0.5;
    if (isLeadHighlighted(lead)) return 1;
    if (isLeadReciprocal(lead)) return 0.7;
    return 0.15;
  };

  const info = selected ? territories[selected] : null;

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Coronary Territory Map</h3>
      <p className="text-xs text-muted-foreground mb-4">Select a territory to see corresponding ECG leads and culprit artery</p>

      {/* Territory selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(territories) as Exclude<Territory, null>[]).map((t) => (
          <button
            key={t}
            onClick={() => setSelected(selected === t ? null : t)}
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
        <div className="flex-shrink-0">
          <svg viewBox="0 0 420 200" width="400" height="190" className="border border-border rounded bg-gradient-to-b from-background to-secondary/10">
            {/* Grid labels */}
            <text x="62" y="25" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.4" fontWeight="bold">Limb</text>
            <text x="135" y="25" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.4" fontWeight="bold">Augmented</text>
            <text x="208" y="25" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.4" fontWeight="bold">Septal/Ant</text>
            <text x="355" y="25" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.4" fontWeight="bold">Lateral</text>

            {/* Standard 12-lead boxes */}
            {Object.entries(ecgLeadPositions).map(([lead, pos]) => {
              const highlighted = isLeadHighlighted(lead);
              const reciprocal = isLeadReciprocal(lead);
              const color = getLeadColor(lead);
              const opacity = getLeadOpacity(lead);

              return (
                <g key={lead}>
                  <rect
                    x={pos.x - 30} y={pos.y - 15} width="60" height="30" rx="5"
                    fill={highlighted ? color : reciprocal ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))"}
                    fillOpacity={highlighted ? 0.15 : reciprocal ? 0.06 : 0.03}
                    stroke={highlighted ? color : "hsl(var(--border))"}
                    strokeWidth={highlighted ? 1.5 : 0.8}
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
                    <text x={pos.x} y={pos.y + 12} textAnchor="middle" fontSize="5" fill={color} opacity="0.7">
                      ST ↑
                    </text>
                  )}
                  {reciprocal && (
                    <text x={pos.x} y={pos.y + 12} textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.5">
                      ST ↓ reciprocal
                    </text>
                  )}
                </g>
              );
            })}

            {/* Extra leads row */}
            <line x1="32" y1="168" x2="388" y2="168" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" />
            {extraLeads.map((lead, i) => {
              const x = 62 + i * 80;
              const y = 185;
              const highlighted = isLeadHighlighted(lead);
              const color = highlighted && info ? info.color : "hsl(var(--muted-foreground))";
              const opacity = selected ? (highlighted ? 1 : 0.15) : 0.4;

              return (
                <g key={lead}>
                  <rect
                    x={x - 28} y={y - 12} width="56" height="22" rx="4"
                    fill={highlighted ? color : "hsl(var(--muted-foreground))"}
                    fillOpacity={highlighted ? 0.12 : 0.02}
                    stroke={highlighted ? color : "hsl(var(--border))"}
                    strokeWidth={highlighted ? 1.5 : 0.5}
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
            <text x="210" y="172" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))" opacity="0.35">Additional leads (not standard 12-lead)</text>
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0">
          {info ? (
            <div className="space-y-3 animate-fade-in" key={selected}>
              <div className="p-4 rounded-lg border" style={{ borderColor: withAlpha(info.color, 0.25) }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
                  <p className="font-bold text-foreground">{info.label} Territory</p>
                </div>
                <p className="text-sm font-semibold" style={{ color: info.color }}>
                  Culprit: {info.artery}
                </p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{info.detail}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg border border-border">
                  <p className="text-xs font-semibold text-foreground mb-1">ST Elevation</p>
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
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <p className="text-sm text-muted-foreground text-center opacity-50">
                Select a coronary territory above to highlight the corresponding ECG leads
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoronaryTerritoryMapDiagram;
