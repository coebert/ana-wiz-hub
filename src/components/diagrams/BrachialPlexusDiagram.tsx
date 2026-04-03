import { useState } from "react";

type LevelKey = "roots" | "trunks" | "divisions" | "cords" | "branches";
type ElementKey = string;

interface PlexusElement {
  id: ElementKey;
  label: string;
  level: LevelKey;
  x: number;
  y: number;
  color: string;
  detail: string;
  connections: string[]; // ids of elements it connects to
}

const levelInfo: Record<LevelKey, { label: string; y: number; blockApproach: string }> = {
  roots: { label: "Roots (C5–T1)", y: 20, blockApproach: "Interscalene block — between anterior & middle scalene at C6" },
  trunks: { label: "Trunks", y: 80, blockApproach: "Supraclavicular block — trunks clustered above subclavian artery" },
  divisions: { label: "Divisions", y: 140, blockApproach: "Behind clavicle — anterior (flexors) & posterior (extensors)" },
  cords: { label: "Cords", y: 200, blockApproach: "Infraclavicular block — cords surround 2nd part axillary artery" },
  branches: { label: "Terminal Branches", y: 270, blockApproach: "Axillary block — terminal branches around 3rd part axillary artery" },
};

const elements: PlexusElement[] = [
  // Roots
  { id: "c5", label: "C5", level: "roots", x: 60, y: 20, color: "hsl(0, 65%, 55%)", detail: "Ventral ramus of C5. Contributes to superior trunk. Dorsal scapular nerve (C5) — rhomboids.", connections: ["sup"] },
  { id: "c6", label: "C6", level: "roots", x: 110, y: 20, color: "hsl(25, 70%, 55%)", detail: "Ventral ramus of C6. Joins C5 to form superior trunk. Long thoracic nerve (C5,6,7) — serratus anterior.", connections: ["sup"] },
  { id: "c7", label: "C7", level: "roots", x: 160, y: 20, color: "hsl(50, 65%, 48%)", detail: "Ventral ramus of C7. Forms middle trunk alone. Largest root contribution.", connections: ["mid"] },
  { id: "c8", label: "C8", level: "roots", x: 210, y: 20, color: "hsl(150, 50%, 45%)", detail: "Ventral ramus of C8. Joins T1 to form inferior trunk.", connections: ["inf"] },
  { id: "t1", label: "T1", level: "roots", x: 260, y: 20, color: "hsl(200, 55%, 50%)", detail: "Ventral ramus of T1. Joins C8 to form inferior trunk. Smallest contribution.", connections: ["inf"] },

  // Trunks
  { id: "sup", label: "Superior", level: "trunks", x: 80, y: 80, color: "hsl(10, 65%, 55%)", detail: "C5,6. Suprascapular nerve branches here — shoulder abduction/lateral rotation. Nerve to subclavius.", connections: ["ant-sup", "post-sup"] },
  { id: "mid", label: "Middle", level: "trunks", x: 160, y: 80, color: "hsl(50, 65%, 48%)", detail: "C7 alone. No named branches from trunk itself.", connections: ["ant-mid", "post-mid"] },
  { id: "inf", label: "Inferior", level: "trunks", x: 240, y: 80, color: "hsl(175, 50%, 45%)", detail: "C8,T1. No named branches from trunk. Vulnerable to traction injury (Klumpke's palsy — claw hand).", connections: ["ant-inf", "post-inf"] },

  // Divisions
  { id: "ant-sup", label: "Ant", level: "divisions", x: 55, y: 140, color: "hsl(10, 55%, 55%)", detail: "Anterior division of superior trunk → lateral cord. Supplies flexor compartments.", connections: ["lateral"] },
  { id: "post-sup", label: "Post", level: "divisions", x: 105, y: 140, color: "hsl(10, 40%, 50%)", detail: "Posterior division of superior trunk → posterior cord. Supplies extensor compartments.", connections: ["posterior"] },
  { id: "ant-mid", label: "Ant", level: "divisions", x: 145, y: 140, color: "hsl(50, 55%, 48%)", detail: "Anterior division of middle trunk → lateral cord.", connections: ["lateral"] },
  { id: "post-mid", label: "Post", level: "divisions", x: 180, y: 140, color: "hsl(50, 40%, 45%)", detail: "Posterior division of middle trunk → posterior cord.", connections: ["posterior"] },
  { id: "ant-inf", label: "Ant", level: "divisions", x: 225, y: 140, color: "hsl(175, 45%, 45%)", detail: "Anterior division of inferior trunk → medial cord.", connections: ["medial"] },
  { id: "post-inf", label: "Post", level: "divisions", x: 265, y: 140, color: "hsl(175, 35%, 42%)", detail: "Posterior division of inferior trunk → posterior cord.", connections: ["posterior"] },

  // Cords
  { id: "lateral", label: "Lateral", level: "cords", x: 80, y: 200, color: "hsl(30, 65%, 52%)", detail: "C5,6,7. Named by position relative to 2nd part of axillary artery. Gives musculocutaneous nerve and lateral root of median nerve.", connections: ["musculocut", "median"] },
  { id: "posterior", label: "Posterior", level: "cords", x: 170, y: 200, color: "hsl(270, 45%, 52%)", detail: "C5–T1. All three posterior divisions. Gives axillary nerve (C5,6) and radial nerve (C5–T1). Largest cord.", connections: ["axillary", "radial"] },
  { id: "medial", label: "Medial", level: "cords", x: 260, y: 200, color: "hsl(200, 55%, 50%)", detail: "C8,T1. Gives ulnar nerve, medial root of median nerve, medial cutaneous nerves of arm and forearm.", connections: ["ulnar", "median"] },

  // Terminal branches
  { id: "musculocut", label: "Musculocut.", level: "branches", x: 30, y: 270, color: "hsl(30, 65%, 52%)", detail: "C5,6,7. Motor: biceps, brachialis, coracobrachialis. Sensory: lateral cutaneous nerve of forearm. Leaves early — block separately in axillary approach.", connections: [] },
  { id: "axillary", label: "Axillary", level: "branches", x: 105, y: 270, color: "hsl(270, 45%, 52%)", detail: "C5,6. Motor: deltoid, teres minor. Sensory: regimental badge area (lateral shoulder). Wraps around surgical neck of humerus — fracture risk.", connections: [] },
  { id: "median", label: "Median", level: "branches", x: 170, y: 270, color: "hsl(330, 50%, 50%)", detail: "C5–T1. Two roots (lateral + medial cord). Motor: forearm flexors, thenar muscles, lateral 2 lumbricals. Sensory: lateral 3½ digits palmar. Carpal tunnel syndrome.", connections: [] },
  { id: "radial", label: "Radial", level: "branches", x: 230, y: 270, color: "hsl(270, 45%, 52%)", detail: "C5–T1. Largest terminal branch. Motor: all extensors (triceps, wrist, fingers), supinator. Sensory: posterior arm/forearm, dorsal 3½ digits. Saturday night palsy (spiral groove).", connections: [] },
  { id: "ulnar", label: "Ulnar", level: "branches", x: 295, y: 270, color: "hsl(200, 55%, 50%)", detail: "C8,T1. Motor: intrinsic hand muscles (most), FCU, medial FDP. Sensory: medial 1½ digits. Cubital tunnel (elbow) — most commonly injured peripheral nerve.", connections: [] },
];

const BrachialPlexusDiagram = () => {
  const [selected, setSelected] = useState<ElementKey>("lateral");
  const [highlightLevel, setHighlightLevel] = useState<LevelKey | null>(null);

  const activeEl = elements.find(e => e.id === selected);

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive Brachial Plexus</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any element to see details. Tap a level label to highlight the block approach.</p>

      <svg viewBox="0 0 330 310" className="w-full max-w-lg mx-auto mb-4" style={{ height: "auto" }}>
        {/* Level labels */}
        {(Object.entries(levelInfo) as [LevelKey, typeof levelInfo.roots][]).map(([key, info]) => (
          <g key={key}>
            <text
              x="3"
              y={info.y + 5}
              fontSize="7"
              fill={highlightLevel === key ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
              fontWeight={highlightLevel === key ? "bold" : "normal"}
              className="cursor-pointer select-none"
              onClick={() => setHighlightLevel(highlightLevel === key ? null : key)}
              opacity={0.7}
            >
              {info.label}
            </text>
          </g>
        ))}

        {/* Connection lines */}
        {elements.map(el =>
          el.connections.map(targetId => {
            const target = elements.find(e => e.id === targetId);
            if (!target) return null;
            const isHighlighted = selected === el.id || selected === targetId;
            return (
              <line
                key={`${el.id}-${targetId}`}
                x1={el.x}
                y1={el.y + 12}
                x2={target.x}
                y2={target.y - 8}
                stroke={isHighlighted ? el.color : "hsl(var(--border))"}
                strokeWidth={isHighlighted ? 2 : 1}
                opacity={isHighlighted ? 0.8 : 0.4}
                className="transition-all duration-200"
              />
            );
          })
        )}

        {/* Element nodes */}
        {elements.map(el => {
          const isActive = selected === el.id;
          const isLevelHighlighted = highlightLevel === el.level;
          const w = el.level === "branches" ? 50 : el.level === "divisions" ? 28 : 44;
          return (
            <g key={el.id} className="cursor-pointer" onClick={() => setSelected(el.id)}>
              <rect
                x={el.x - w / 2}
                y={el.y - 8}
                width={w}
                height={18}
                rx={4}
                fill={el.color}
                fillOpacity={isActive ? 0.35 : isLevelHighlighted ? 0.2 : 0.12}
                stroke={el.color}
                strokeWidth={isActive ? 2 : 1}
                opacity={isActive || isLevelHighlighted ? 1 : 0.7}
                className="transition-all duration-200"
              />
              <text
                x={el.x}
                y={el.y + 4}
                textAnchor="middle"
                fontSize={el.level === "divisions" ? "6" : "7.5"}
                fill={el.color}
                fontWeight={isActive ? "bold" : "normal"}
                className="select-none"
              >
                {el.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Block approach highlight */}
      {highlightLevel && (
        <div className="p-3 rounded-lg bg-secondary/50 border border-border mb-3 animate-fade-in">
          <p className="text-xs font-semibold text-foreground">Block approach at {levelInfo[highlightLevel].label}:</p>
          <p className="text-xs text-muted-foreground mt-1">{levelInfo[highlightLevel].blockApproach}</p>
        </div>
      )}

      {/* Detail card */}
      {activeEl && (
        <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
          <p className="font-bold text-sm" style={{ color: activeEl.color }}>{activeEl.label}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{levelInfo[activeEl.level].label}</p>
          <p className="text-sm text-muted-foreground mt-1">{activeEl.detail}</p>
        </div>
      )}
    </div>
  );
};

export default BrachialPlexusDiagram;
