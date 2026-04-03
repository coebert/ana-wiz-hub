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
  connections: string[];
}

const levelInfo: Record<LevelKey, { label: string; y: number; blockApproach: string }> = {
  roots: { label: "Roots (C5–T1)", y: 30, blockApproach: "Interscalene block — between anterior & middle scalene at C6 level" },
  trunks: { label: "Trunks", y: 95, blockApproach: "Supraclavicular block — trunks clustered tightly above subclavian artery ('bunch of grapes')" },
  divisions: { label: "Divisions", y: 160, blockApproach: "Behind clavicle — anterior divisions (flexors) & posterior divisions (extensors)" },
  cords: { label: "Cords", y: 225, blockApproach: "Infraclavicular block — cords named by position around 2nd part axillary artery (lateral, posterior, medial)" },
  branches: { label: "Terminal Branches", y: 300, blockApproach: "Axillary block — terminal branches surround 3rd part axillary artery. Musculocutaneous often separate (in coracobrachialis)." },
};

const elements: PlexusElement[] = [
  // Roots — ventral rami
  { id: "c5", label: "C5", level: "roots", x: 60, y: 30, color: "hsl(0, 60%, 52%)", detail: "Ventral ramus of C5. Contributes to superior trunk. Gives dorsal scapular nerve (C5) → rhomboids. Phrenic nerve contribution (C3,4,5).", connections: ["sup"] },
  { id: "c6", label: "C6", level: "roots", x: 110, y: 30, color: "hsl(20, 65%, 52%)", detail: "Ventral ramus of C6. Joins C5 → superior trunk. Long thoracic nerve (C5,6,7) → serratus anterior. Nerve to subclavius.", connections: ["sup"] },
  { id: "c7", label: "C7", level: "roots", x: 160, y: 30, color: "hsl(45, 60%, 46%)", detail: "Ventral ramus of C7. Forms middle trunk alone — largest root. Long thoracic nerve contribution.", connections: ["mid"] },
  { id: "c8", label: "C8", level: "roots", x: 210, y: 30, color: "hsl(150, 45%, 42%)", detail: "Ventral ramus of C8. Joins T1 → inferior trunk.", connections: ["inf"] },
  { id: "t1", label: "T1", level: "roots", x: 260, y: 30, color: "hsl(200, 50%, 48%)", detail: "Ventral ramus of T1. Smallest contribution. Joins C8 → inferior trunk.", connections: ["inf"] },

  // Trunks
  { id: "sup", label: "Superior", level: "trunks", x: 80, y: 95, color: "hsl(10, 60%, 52%)", detail: "C5,6. Suprascapular nerve (C5,6) branches here → supraspinatus, infraspinatus (shoulder abduction/lateral rotation). Key for shoulder surgery analgesia.", connections: ["ant-sup", "post-sup"] },
  { id: "mid", label: "Middle", level: "trunks", x: 160, y: 95, color: "hsl(45, 60%, 46%)", detail: "C7 alone. No named branches from trunk itself. Passes over first rib.", connections: ["ant-mid", "post-mid"] },
  { id: "inf", label: "Inferior", level: "trunks", x: 240, y: 95, color: "hsl(170, 45%, 42%)", detail: "C8,T1. No named branches. Vulnerable to traction injury (Klumpke's palsy → claw hand, T1 Horner's syndrome).", connections: ["ant-inf", "post-inf"] },

  // Divisions
  { id: "ant-sup", label: "Ant", level: "divisions", x: 55, y: 160, color: "hsl(10, 50%, 52%)", detail: "Anterior division of superior trunk → lateral cord. Supplies flexor compartments.", connections: ["lateral"] },
  { id: "post-sup", label: "Post", level: "divisions", x: 105, y: 160, color: "hsl(10, 35%, 48%)", detail: "Posterior division of superior trunk → posterior cord. Supplies extensors.", connections: ["posterior"] },
  { id: "ant-mid", label: "Ant", level: "divisions", x: 140, y: 160, color: "hsl(45, 50%, 46%)", detail: "Anterior division of middle trunk → lateral cord.", connections: ["lateral"] },
  { id: "post-mid", label: "Post", level: "divisions", x: 180, y: 160, color: "hsl(45, 35%, 44%)", detail: "Posterior division of middle trunk → posterior cord.", connections: ["posterior"] },
  { id: "ant-inf", label: "Ant", level: "divisions", x: 225, y: 160, color: "hsl(170, 40%, 42%)", detail: "Anterior division of inferior trunk → medial cord.", connections: ["medial"] },
  { id: "post-inf", label: "Post", level: "divisions", x: 265, y: 160, color: "hsl(170, 30%, 40%)", detail: "Posterior division of inferior trunk → posterior cord.", connections: ["posterior"] },

  // Cords
  { id: "lateral", label: "Lateral (C5-7)", level: "cords", x: 80, y: 225, color: "hsl(30, 60%, 50%)", detail: "C5,6,7. Lateral to 2nd part axillary artery. Gives lateral pectoral nerve, musculocutaneous nerve, and lateral root of median nerve.", connections: ["musculocut", "median"] },
  { id: "posterior", label: "Posterior (C5-T1)", level: "cords", x: 170, y: 225, color: "hsl(270, 42%, 50%)", detail: "C5–T1. All three posterior divisions. Behind axillary artery. Gives upper/lower subscapular, thoracodorsal (latissimus), axillary, and radial nerves.", connections: ["axillary", "radial"] },
  { id: "medial", label: "Medial (C8-T1)", level: "cords", x: 260, y: 225, color: "hsl(200, 50%, 48%)", detail: "C8,T1. Medial to axillary artery. Gives medial pectoral nerve, medial cutaneous nerves of arm/forearm, ulnar nerve, and medial root of median nerve.", connections: ["ulnar", "median"] },

  // Terminal branches
  { id: "musculocut", label: "Musculocutaneous", level: "branches", x: 30, y: 300, color: "hsl(30, 60%, 50%)", detail: "C5,6,7. Motor: biceps, brachialis, coracobrachialis. Sensory: lateral cutaneous nerve of forearm. Pierces coracobrachialis early — block separately in axillary approach.", connections: [] },
  { id: "axillary", label: "Axillary", level: "branches", x: 105, y: 300, color: "hsl(270, 42%, 50%)", detail: "C5,6. Motor: deltoid, teres minor. Sensory: regimental badge (lateral shoulder). Wraps around surgical neck of humerus — fracture risk.", connections: [] },
  { id: "median", label: "Median", level: "branches", x: 170, y: 300, color: "hsl(330, 48%, 48%)", detail: "C5–T1 (two roots: lateral + medial cord). Motor: forearm flexors, thenar, lateral 2 lumbricals. Sensory: lateral 3½ digits palmar. Carpal tunnel.", connections: [] },
  { id: "radial", label: "Radial", level: "branches", x: 230, y: 300, color: "hsl(270, 42%, 50%)", detail: "C5–T1. Largest terminal branch. Motor: ALL extensors (triceps, wrist, fingers), supinator. Sensory: posterior arm/forearm, dorsal 3½ digits. Saturday night palsy (spiral groove).", connections: [] },
  { id: "ulnar", label: "Ulnar", level: "branches", x: 300, y: 300, color: "hsl(200, 50%, 48%)", detail: "C8,T1. Motor: most intrinsics, FCU, medial FDP. Sensory: medial 1½ digits. Cubital tunnel (elbow) — most commonly injured peripheral nerve.", connections: [] },
];

const BrachialPlexusDiagram = () => {
  const [selected, setSelected] = useState<ElementKey>("lateral");
  const [highlightLevel, setHighlightLevel] = useState<LevelKey | null>(null);

  const activeEl = elements.find(e => e.id === selected);

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive Brachial Plexus</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any element for details. Tap a level label to see the block approach.</p>

      <svg viewBox="-5 0 345 340" className="w-full max-w-lg mx-auto mb-4" style={{ height: "auto" }}>
        {/* Anatomical context — scalene muscles, clavicle, axillary artery */}
        <g opacity="0.12" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none">
          {/* Anterior scalene */}
          <path d="M40,10 C35,30 30,55 28,80 C26,100 25,115 25,130" />
          <text x="15" y="70" fontSize="5" fill="hsl(var(--muted-foreground))" transform="rotate(-80, 15, 70)">Ant. scalene</text>
          {/* Middle scalene */}
          <path d="M285,10 C288,30 290,55 290,80 C290,100 288,115 286,130" />
          {/* Clavicle line */}
          <path d="M10,135 C60,128 120,125 170,125 C220,125 280,128 330,135" strokeWidth="2" />
          <text x="170" y="122" fontSize="5.5" textAnchor="middle" fill="hsl(var(--muted-foreground))">— Clavicle —</text>
          {/* Axillary artery */}
          <path d="M170,150 C170,170 168,190 165,210 C162,230 160,250 158,270" strokeWidth="2" strokeDasharray="3 2" />
          <text x="152" y="200" fontSize="4.5" fill="hsl(var(--muted-foreground))" transform="rotate(-85, 152, 200)">Axillary artery</text>
        </g>

        {/* Level labels along left side */}
        {(Object.entries(levelInfo) as [LevelKey, typeof levelInfo.roots][]).map(([key, info]) => (
          <g key={key}>
            <text
              x="0"
              y={info.y + 5}
              fontSize="6.5"
              fill={highlightLevel === key ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
              fontWeight={highlightLevel === key ? "bold" : "normal"}
              className="cursor-pointer select-none"
              onClick={() => setHighlightLevel(highlightLevel === key ? null : key)}
              opacity={highlightLevel === key ? 1 : 0.6}
            >
              {info.label}
            </text>
            {/* Level line */}
            <line x1="0" y1={info.y + 10} x2="340" y2={info.y + 10}
              stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" strokeDasharray="2 6" opacity="0.15" />
          </g>
        ))}

        {/* Connection lines with curves */}
        {elements.map(el =>
          el.connections.map(targetId => {
            const target = elements.find(e => e.id === targetId);
            if (!target) return null;
            const isHighlighted = selected === el.id || selected === targetId;
            const midY = (el.y + target.y) / 2;
            return (
              <path
                key={`${el.id}-${targetId}`}
                d={`M${el.x},${el.y + 14} C${el.x},${midY} ${target.x},${midY} ${target.x},${target.y - 10}`}
                fill="none"
                stroke={isHighlighted ? el.color : "hsl(var(--border))"}
                strokeWidth={isHighlighted ? 2.5 : 1}
                opacity={isHighlighted ? 0.75 : 0.3}
                className="transition-all duration-200"
              />
            );
          })
        )}

        {/* Element nodes */}
        {elements.map(el => {
          const isActive = selected === el.id;
          const isLevelHighlighted = highlightLevel === el.level;
          const w = el.level === "branches" ? 58 : el.level === "divisions" ? 30 : el.level === "cords" ? 62 : 44;
          const h = 20;
          return (
            <g key={el.id} className="cursor-pointer" onClick={() => setSelected(el.id)}>
              <rect
                x={el.x - w / 2}
                y={el.y - 8}
                width={w}
                height={h}
                rx={5}
                fill={el.color}
                fillOpacity={isActive ? 0.35 : isLevelHighlighted ? 0.2 : 0.1}
                stroke={el.color}
                strokeWidth={isActive ? 2.5 : 1}
                opacity={isActive || isLevelHighlighted ? 1 : 0.6}
                className="transition-all duration-200"
              />
              <text
                x={el.x}
                y={el.y + 5}
                textAnchor="middle"
                fontSize={el.level === "divisions" ? "6" : el.level === "branches" ? "6.5" : "7.5"}
                fill={el.color}
                fontWeight={isActive ? "bold" : "normal"}
                className="select-none"
              >
                {el.label}
              </text>
            </g>
          );
        })}

        {/* Suprascapular nerve branch annotation */}
        {(selected === "sup" || highlightLevel === "trunks") && (
          <g className="animate-fade-in" opacity="0.6">
            <path d="M80,88 C60,82 45,78 35,80" stroke="hsl(10, 60%, 52%)" strokeWidth="1" fill="none" strokeDasharray="2 2" />
            <text x="10" y="84" fontSize="5" fill="hsl(10, 60%, 52%)">Suprascapular n.</text>
          </g>
        )}
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
