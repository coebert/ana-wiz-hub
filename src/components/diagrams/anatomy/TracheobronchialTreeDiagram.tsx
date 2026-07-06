import { useState } from "react";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "../_shared/DiagramFigure";

type StructureKey =
  | "trachea"
  | "carina"
  | "right-main"
  | "left-main"
  | "right-upper"
  | "right-middle"
  | "right-lower"
  | "left-upper"
  | "lingula"
  | "left-lower"
  | "cricoid"
  | "rings";

interface BronchialStructure {
  label: string;
  region: "trachea" | "right" | "left" | "landmark";
  detail: string;
  clinical: string;
}

const regionColors: Record<BronchialStructure["region"], string> = {
  trachea: "hsl(var(--anatomy))",
  right: "hsl(0, 65%, 55%)",
  left: "hsl(210, 65%, 55%)",
  landmark: "hsl(45, 70%, 50%)",
};

const structures: Record<StructureKey, BronchialStructure> = {
  cricoid: {
    label: "Cricoid cartilage (C6)",
    region: "landmark",
    detail: "Only complete cartilaginous ring in the airway. Marks the upper limit of the trachea at vertebral level C6.",
    clinical: "Site of cricoid pressure (Sellick) during RSI. Narrowest point of the paediatric airway (<8 yrs).",
  },
  trachea: {
    label: "Trachea",
    region: "trachea",
    detail: "10–12 cm long, 16–20 C-shaped hyaline cartilage rings with a posterior membranous wall (trachealis muscle). Extends from C6 to T4/5 (sternal angle).",
    clinical: "ETT tip should sit 2–4 cm above carina. Blood supply from inferior thyroid artery — risk of ischaemia from over-inflated cuffs (>30 cmH₂O).",
  },
  rings: {
    label: "Tracheal rings",
    region: "trachea",
    detail: "C-shaped anterior cartilage with a posterior membranous wall containing trachealis muscle. The membranous wall lies against the oesophagus.",
    clinical: "Tracheostomy: classically between rings 2–3 or 3–4. Avoid first ring (subglottic stenosis) and below ring 4 (innominate artery erosion).",
  },
  carina: {
    label: "Carina (T4/5)",
    region: "landmark",
    detail: "Sharp internal ridge at the tracheal bifurcation, at the level of the sternal angle (angle of Louis) and T4/5 vertebra.",
    clinical: "Highly sensitive to touch — coughing/bronchospasm if ETT advanced too far. Bronchoscopic landmark for confirming ETT position. Widening on CXR suggests left atrial enlargement or subcarinal mass.",
  },
  "right-main": {
    label: "Right main bronchus",
    region: "right",
    detail: "Wider, shorter (~2.5 cm) and more vertical (~25° from midline) than the left.",
    clinical: "Foreign bodies and inadvertent endobronchial intubation preferentially enter the right main bronchus → loss of left lung ventilation, right upper lobe collapse if ETT obstructs RUL bronchus.",
  },
  "left-main": {
    label: "Left main bronchus",
    region: "left",
    detail: "Narrower, longer (~5 cm) and more horizontal (~45° from midline) — passes under the aortic arch.",
    clinical: "Left-sided DLT preferred for one-lung ventilation: longer left main bronchus gives a margin of safety; right DLTs risk RUL obstruction (RUL bronchus origin only ~1.5–2 cm distal to carina).",
  },
  "right-upper": {
    label: "Right upper lobe bronchus",
    region: "right",
    detail: "Arises from the right main bronchus only ~1.5–2 cm distal to the carina ('eparterial bronchus' — above the right pulmonary artery).",
    clinical: "Easily occluded by a deeply placed ETT or a malpositioned right-sided DLT bronchial cuff → RUL collapse.",
  },
  "right-middle": {
    label: "Right middle lobe bronchus",
    region: "right",
    detail: "Arises anterolaterally from the bronchus intermedius. Divides into medial and lateral segmental bronchi.",
    clinical: "Right middle lobe syndrome — recurrent collapse from extrinsic compression by lymph nodes (long, narrow bronchus with poor collateral ventilation).",
  },
  "right-lower": {
    label: "Right lower lobe bronchus",
    region: "right",
    detail: "Continuation of the bronchus intermedius. Gives off superior (apical) segment then basal segments.",
    clinical: "Aspiration in the supine patient classically tracks to the superior segment of the RLL (most posterior segmental bronchus).",
  },
  "left-upper": {
    label: "Left upper lobe bronchus",
    region: "left",
    detail: "Divides into the upper division (apicoposterior, anterior segments) and the lingular bronchus.",
    clinical: "Left-sided DLT bronchial cuff sits in the LMB just proximal to the LUL bronchus origin. Over-advancement obstructs the LUL.",
  },
  lingula: {
    label: "Lingular bronchus",
    region: "left",
    detail: "Anatomical equivalent of the right middle lobe — arises from the LUL bronchus and divides into superior and inferior lingular segments.",
    clinical: "Common site for aspiration pneumonia in the left lung. Bronchoscopic landmark separating upper from lower lobe territory on the left.",
  },
  "left-lower": {
    label: "Left lower lobe bronchus",
    region: "left",
    detail: "Continues distally from the LMB after the LUL takeoff. Superior segment then basal segments.",
    clinical: "Like RLL, the superior segment is the dependent target for aspiration in the supine patient.",
  },
};

const TracheobronchialTreeDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("carina");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const selectedItem = structures[selected];
  const regionColor = regionColors[selectedItem.region];

  const toggle = (k: StructureKey) => setSelected((prev) => (prev === k ? prev : k));

  // Tracheal ring y-positions
  const ringYs = [70, 88, 106, 124, 142, 160, 178, 196, 214, 232];

  return (
    <DiagramFigure
      id="tracheobronchial-tree-diagram"
      title="Tracheobronchial tree"
      description="Auto-generated wrapper for the Tracheobronchial tree anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Trachea & bronchial tree — anterior view"
            subtitle="Tap a structure to reveal anaesthetic relevance"
            toggles={[
              { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          <svg
            viewBox="0 0 600 470"
            className="w-full max-w-2xl mx-auto"
            role="img"
            aria-label="Anterior view of the trachea, carina and main bronchial branches"
          >
            <defs>
              <radialGradient id="tbt-airShade" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.22" />
                <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.04" />
              </radialGradient>
  
              <radialGradient id="tbt-lungShade" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="hsl(210, 40%, 70%)" stopOpacity="0.18" />
                <stop offset="100%" stopColor="hsl(210, 40%, 70%)" stopOpacity="0.03" />
              </radialGradient>
  
              <pattern id="tbt-cartilage" patternUnits="userSpaceOnUse" width="6" height="6">
                <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.22" />
              </pattern>
  
              <pattern id="tbt-alveoli" patternUnits="userSpaceOnUse" width="8" height="8">
                <circle cx="2" cy="2" r="0.6" fill="hsl(210, 40%, 60%)" opacity="0.22" />
                <circle cx="6" cy="5" r="0.5" fill="hsl(210, 40%, 60%)" opacity="0.18" />
              </pattern>
  
              <filter id="tbt-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="0" dy="2" result="off" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.32" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
  
            {/* Lung silhouettes */}
            <path
              d="M 110,150 Q 80,210 90,310 Q 100,400 180,420 Q 230,420 245,400 L 245,260 Q 230,180 200,150 Z"
              fill="url(#tbt-lungShade)"
              stroke="hsl(var(--border))"
              strokeWidth={1}
              opacity={0.9}
            />
            <path
              d="M 490,150 Q 520,210 510,310 Q 500,400 420,420 Q 370,420 355,400 L 355,260 Q 370,180 400,150 Z"
              fill="url(#tbt-lungShade)"
              stroke="hsl(var(--border))"
              strokeWidth={1}
              opacity={0.9}
            />
            <path
              d="M 110,150 Q 80,210 90,310 Q 100,400 180,420 Q 230,420 245,400 L 245,260 Q 230,180 200,150 Z"
              fill="url(#tbt-alveoli)"
              opacity={0.9}
              pointerEvents="none"
            />
            <path
              d="M 490,150 Q 520,210 510,310 Q 500,400 420,420 Q 370,420 355,400 L 355,260 Q 370,180 400,150 Z"
              fill="url(#tbt-alveoli)"
              opacity={0.9}
              pointerEvents="none"
            />
  
            {/* Midline reference */}
            {showSutures && (
              <line x1="300" y1="40" x2="300" y2="450" stroke="hsl(var(--muted-foreground))" strokeWidth={0.5} strokeDasharray="2 4" opacity={0.25} />
            )}
  
            {/* Cricoid cartilage */}
            <g
              onClick={() => toggle("cricoid")}
              style={{ cursor: "pointer" }}
              opacity={selected === "cricoid" ? 1 : 0.85}
            >
              <rect
                x="270"
                y="42"
                width="60"
                height="20"
                rx="6"
                fill={regionColors.landmark}
                fillOpacity={selected === "cricoid" ? 0.55 : 0.3}
                stroke={regionColors.landmark}
                strokeWidth={selected === "cricoid" ? 1.6 : 0.8}
              />
              <rect x="270" y="42" width="60" height="20" rx="6" fill="url(#tbt-cartilage)" pointerEvents="none" />
            </g>
  
            {/* Trachea body */}
            <g
              onClick={() => toggle("trachea")}
              style={{ cursor: "pointer" }}
            >
              <path
                d="M 268,62 L 268,250 Q 268,260 280,260 L 320,260 Q 332,260 332,250 L 332,62 Z"
                fill="url(#tbt-airShade)"
                stroke={regionColors.trachea}
                strokeWidth={selected === "trachea" ? 1.8 : 1}
                strokeOpacity={selected === "trachea" ? 1 : 0.7}
                filter="url(#tbt-shadow)"
              />
            </g>
  
            {/* Tracheal rings */}
            {showSutures && (
              <g
                onClick={() => toggle("rings")}
                style={{ cursor: "pointer" }}
              >
                {ringYs.map((y) => (
                  <path
                    key={y}
                    d={`M 272,${y} Q 300,${y - 4} 328,${y}`}
                    fill="none"
                    stroke={selected === "rings" ? regionColors.trachea : "hsl(var(--muted-foreground))"}
                    strokeWidth={selected === "rings" ? 1.4 : 0.8}
                    opacity={selected === "rings" ? 0.95 : 0.55}
                  />
                ))}
                {/* Posterior membranous wall hint */}
                <line x1="270" y1="248" x2="330" y2="248" stroke="hsl(0, 40%, 50%)" strokeWidth={0.5} strokeDasharray="3 2" opacity={0.5} />
              </g>
            )}
  
            {/* Carina marker */}
            <g onClick={() => toggle("carina")} style={{ cursor: "pointer" }}>
              <path
                d="M 280,260 L 300,275 L 320,260"
                fill="none"
                stroke={regionColors.landmark}
                strokeWidth={selected === "carina" ? 2.4 : 1.6}
                strokeLinecap="round"
              />
              <circle
                cx="300"
                cy="270"
                r={selected === "carina" ? 6 : 4}
                fill={regionColors.landmark}
                fillOpacity={selected === "carina" ? 0.7 : 0.45}
                stroke={regionColors.landmark}
                strokeWidth={1}
              />
            </g>
  
            {/* Right main bronchus (anatomic right = viewer's left) */}
            <g onClick={() => toggle("right-main")} style={{ cursor: "pointer" }}>
              <path
                d="M 285,268 Q 250,288 220,310"
                fill="none"
                stroke={regionColors.right}
                strokeWidth={selected === "right-main" ? 18 : 14}
                strokeOpacity={selected === "right-main" ? 0.9 : 0.6}
                strokeLinecap="round"
              />
            </g>
  
            {/* Left main bronchus (anatomic left = viewer's right) — longer, more horizontal */}
            <g onClick={() => toggle("left-main")} style={{ cursor: "pointer" }}>
              <path
                d="M 315,268 Q 360,295 410,310"
                fill="none"
                stroke={regionColors.left}
                strokeWidth={selected === "left-main" ? 14 : 11}
                strokeOpacity={selected === "left-main" ? 0.9 : 0.6}
                strokeLinecap="round"
              />
            </g>
  
            {/* Right upper lobe bronchus */}
            <g onClick={() => toggle("right-upper")} style={{ cursor: "pointer" }}>
              <path
                d="M 240,300 Q 215,275 175,255"
                fill="none"
                stroke={regionColors.right}
                strokeWidth={selected === "right-upper" ? 9 : 7}
                strokeOpacity={selected === "right-upper" ? 0.9 : 0.55}
                strokeLinecap="round"
              />
            </g>
  
            {/* Right middle lobe bronchus */}
            <g onClick={() => toggle("right-middle")} style={{ cursor: "pointer" }}>
              <path
                d="M 225,318 Q 190,335 155,335"
                fill="none"
                stroke={regionColors.right}
                strokeWidth={selected === "right-middle" ? 7 : 5.5}
                strokeOpacity={selected === "right-middle" ? 0.9 : 0.55}
                strokeLinecap="round"
              />
            </g>
  
            {/* Right lower lobe bronchus */}
            <g onClick={() => toggle("right-lower")} style={{ cursor: "pointer" }}>
              <path
                d="M 220,322 Q 200,365 170,395"
                fill="none"
                stroke={regionColors.right}
                strokeWidth={selected === "right-lower" ? 9 : 7}
                strokeOpacity={selected === "right-lower" ? 0.9 : 0.55}
                strokeLinecap="round"
              />
            </g>
  
            {/* Left upper lobe bronchus */}
            <g onClick={() => toggle("left-upper")} style={{ cursor: "pointer" }}>
              <path
                d="M 395,305 Q 420,275 445,250"
                fill="none"
                stroke={regionColors.left}
                strokeWidth={selected === "left-upper" ? 8 : 6.5}
                strokeOpacity={selected === "left-upper" ? 0.9 : 0.55}
                strokeLinecap="round"
              />
            </g>
  
            {/* Lingular bronchus */}
            <g onClick={() => toggle("lingula")} style={{ cursor: "pointer" }}>
              <path
                d="M 408,318 Q 435,335 460,338"
                fill="none"
                stroke={regionColors.left}
                strokeWidth={selected === "lingula" ? 6 : 4.8}
                strokeOpacity={selected === "lingula" ? 0.9 : 0.55}
                strokeLinecap="round"
              />
            </g>
  
            {/* Left lower lobe bronchus */}
            <g onClick={() => toggle("left-lower")} style={{ cursor: "pointer" }}>
              <path
                d="M 412,322 Q 435,365 460,395"
                fill="none"
                stroke={regionColors.left}
                strokeWidth={selected === "left-lower" ? 9 : 7}
                strokeOpacity={selected === "left-lower" ? 0.9 : 0.55}
                strokeLinecap="round"
              />
            </g>
  
            {/* Angle reference lines */}
            {showSutures && (
              <g pointerEvents="none">
                <line x1="300" y1="270" x2="300" y2="330" stroke="hsl(var(--muted-foreground))" strokeWidth={0.5} strokeDasharray="2 3" opacity={0.4} />
                <text x="252" y="298" className="text-[8px] fill-muted-foreground italic">~25°</text>
                <text x="338" y="298" className="text-[8px] fill-muted-foreground italic">~45°</text>
              </g>
            )}
  
            {/* Labels */}
            {showLabels && (
              <g pointerEvents="none">
                <text x="338" y="55" className="text-[9px] fill-foreground select-none">Cricoid (C6)</text>
                <text x="338" y="155" className="text-[9px] fill-foreground select-none">Trachea</text>
                <text x="338" y="170" className="text-[7.5px] fill-muted-foreground italic select-none">10–12 cm, 16–20 rings</text>
                <text x="332" y="280" className="text-[9px] fill-foreground select-none">Carina (T4/5)</text>
                <text x="120" y="252" className="text-[9px] fill-foreground select-none">RUL</text>
                <text x="100" y="335" className="text-[9px] fill-foreground select-none">RML</text>
                <text x="120" y="395" className="text-[9px] fill-foreground select-none">RLL</text>
                <text x="455" y="248" className="text-[9px] fill-foreground select-none">LUL</text>
                <text x="465" y="340" className="text-[9px] fill-foreground select-none">Lingula</text>
                <text x="465" y="395" className="text-[9px] fill-foreground select-none">LLL</text>
                <text x="170" y="305" className="text-[8px] fill-foreground italic select-none">R main</text>
                <text x="370" y="305" className="text-[8px] fill-foreground italic select-none">L main</text>
              </g>
            )}
  
            {/* Compass */}
            <text x="296" y="20" className="text-[9px] fill-muted-foreground font-medium">SUPERIOR</text>
            <text x="295" y="465" className="text-[9px] fill-muted-foreground font-medium">INFERIOR</text>
            <text x="8" y="240" className="text-[9px] fill-muted-foreground font-medium">RIGHT</text>
            <text x="555" y="240" className="text-[9px] fill-muted-foreground font-medium">LEFT</text>
          </svg>
  
          <p className="text-xs text-center text-muted-foreground mt-2 italic">
            <span className="font-semibold not-italic text-foreground">Right is wider, shorter, more vertical — </span>
            foreign bodies & ETTs preferentially enter the right main bronchus.
          </p>
  
          <div className="mt-4 min-h-[110px]">
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
              style={{ borderLeftWidth: 4, borderLeftColor: regionColor }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-foreground text-sm">{selectedItem.label}</p>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{ background: `${regionColor}26`, color: regionColor }}
                >
                  {selectedItem.region === "landmark" ? "Landmark" : selectedItem.region === "trachea" ? "Trachea" : `${selectedItem.region.toUpperCase()} bronchial tree`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Anatomy:</span> {selectedItem.detail}
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Clinical:</span> {selectedItem.clinical}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default TracheobronchialTreeDiagram;
