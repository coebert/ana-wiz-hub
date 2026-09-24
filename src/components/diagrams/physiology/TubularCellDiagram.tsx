import { useState, useEffect } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type CellType = "pct" | "tal" | "dct" | "principal" | "intercalated-a";

interface CellInfo {
  id: CellType;
  label: string;
  subtitle: string;
  description: string;
  drugTarget?: string;
}

const cellTypes: CellInfo[] = [
  {
    id: "pct",
    label: "PCT Cell",
    subtitle: "Proximal Convoluted Tubule",
    description: "Tall cuboidal epithelium with dense brush border (microvilli ×40 surface area) and abundant basolateral mitochondria. Reabsorbs 65–70% of filtered Na⁺, all glucose, amino acids, and 85% HCO₃⁻. Basolateral Na⁺/K⁺-ATPase is the primary driving force for all secondary active transport.",
    drugTarget: "Acetazolamide inhibits carbonic anhydrase (CA II/IV) → ↓HCO₃⁻ reabsorption. SGLT2 inhibitors (dapagliflozin) → glycosuria.",
  },
  {
    id: "tal",
    label: "TAL Cell",
    subtitle: "Thick Ascending Limb",
    description: "Tall cuboidal cells, water-impermeable ('diluting segment'). NKCC2 on the apical membrane is the key transporter. K⁺ recycling via ROMK creates a +8 mV lumen-positive potential driving paracellular Ca²⁺/Mg²⁺ reabsorption. Reabsorbs 25% of filtered Na⁺.",
    drugTarget: "Loop diuretics (furosemide, bumetanide) block NKCC2 → ↓Na⁺ reabsorption, ↓paracellular Ca²⁺/Mg²⁺. Bartter syndrome = genetic NKCC2 dysfunction.",
  },
  {
    id: "dct",
    label: "DCT Cell",
    subtitle: "Distal Convoluted Tubule",
    description: "NCC (Na⁺/Cl⁻ cotransporter) on apical membrane reabsorbs ~5% filtered Na⁺. Active transcellular Ca²⁺ reabsorption via apical TRPV5 → calbindin → basolateral NCX and PMCA, stimulated by PTH and 1,25(OH)₂D₃.",
    drugTarget: "Thiazide diuretics block NCC → ↑Ca²⁺ reabsorption (useful in hypercalciuria). Gitelman syndrome = genetic NCC loss.",
  },
  {
    id: "principal",
    label: "Principal Cell",
    subtitle: "Collecting Duct",
    description: "Aldosterone-sensitive. ENaC (epithelial Na⁺ channel) on the apical membrane allows Na⁺ entry, creating a lumen-negative potential that drives K⁺ secretion via ROMK. ADH → V2 receptor → cAMP → AQP2 vesicle exocytosis into apical membrane → water reabsorption. Basolateral AQP3/4 are constitutive.",
    drugTarget: "Amiloride/triamterene block ENaC. Spironolactone/eplerenone block mineralocorticoid receptor. Liddle syndrome = gain-of-function ENaC.",
  },
  {
    id: "intercalated-a",
    label: "Type A Intercalated",
    subtitle: "Collecting Duct — Acid Secretion",
    description: "Apical H⁺-ATPase and H⁺/K⁺-ATPase actively secrete H⁺ into lumen. CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻ (via carbonic anhydrase II). HCO₃⁻ exits basolaterally via AE1 (Cl⁻/HCO₃⁻ exchanger) → new HCO₃⁻ generation. Excreted H⁺ is buffered by urinary phosphate (titratable acid) and NH₃ → NH₄⁺.",
    drugTarget: "Acetazolamide inhibits CA II. Distal RTA (Type 1) = impaired H⁺ secretion. Amphotericin B can cause distal RTA.",
  },
];

// Animated molecule component
const AnimatedMolecule = ({ path, color, label, delay, duration, fontSize = 7 }: {
  path: { x1: number; y1: number; x2: number; y2: number };
  color: string; label: string; delay: number; duration: number; fontSize?: number;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animFrame: number;
    let start: number | null = null;
    const totalCycle = duration + delay;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) % totalCycle;
      const p = elapsed < delay ? 0 : Math.min(1, (elapsed - delay) / duration);
      setProgress(p);
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [delay, duration]);

  const x = path.x1 + (path.x2 - path.x1) * progress;
  const y = path.y1 + (path.y2 - path.y1) * progress;
  const opacity = progress === 0 ? 0 : progress < 0.1 ? progress * 10 : progress > 0.85 ? (1 - progress) * 6.67 : 1;

  return (
    <g opacity={opacity}>
      <circle cx={x} cy={y} r={4} fill={color} fillOpacity="0.7" />
      <circle cx={x} cy={y} r={4} fill="none" stroke={color} strokeWidth="0.75" opacity="0.5" />
      <text x={x} y={y + 0.5} fontSize={fontSize} fill="hsl(var(--background))" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
        {label.length > 3 ? "" : label}
      </text>
      {label.length > 3 && (
        <text x={x} y={y - 7} fontSize={5.5} fill={color} textAnchor="middle" fontWeight="500">{label}</text>
      )}
    </g>
  );
};

// Multiple molecules streaming along a path
const MoleculeStream = ({ path, color, label, count = 3, baseDuration = 2500, baseDelay = 800 }: {
  path: { x1: number; y1: number; x2: number; y2: number };
  color: string; label: string; count?: number; baseDuration?: number; baseDelay?: number;
}) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <AnimatedMolecule key={i} path={path} color={color} label={label}
        delay={baseDelay + i * (baseDuration / count)} duration={baseDuration} />
    ))}
  </>
);

// Channel/pump icon
const ChannelIcon = ({ x, y, width, height, label, sublabel, color, type, rotation = 0 }: {
  x: number; y: number; width: number; height: number;
  label: string; sublabel?: string; color: string; type: "pump" | "channel" | "cotransport" | "exchanger";
  rotation?: number;
}) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
    {type === "pump" ? (
      <>
        <rect x={-width / 2} y={-height / 2} width={width} height={height} rx={3}
          fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
        <circle cx={0} cy={-2} r={4} fill="none" stroke={color} strokeWidth="1" />
        <text x={0} y={0} fontSize="5" fill={color} textAnchor="middle" fontWeight="700">ATP</text>
      </>
    ) : type === "cotransport" ? (
      <>
        <rect x={-width / 2} y={-height / 2} width={width} height={height} rx={3}
          fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1" strokeDasharray="3 1" />
      </>
    ) : type === "exchanger" ? (
      <>
        <rect x={-width / 2} y={-height / 2} width={width} height={height} rx={3}
          fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1" />
        <line x1={-3} y1={-3} x2={3} y2={3} stroke={color} strokeWidth="0.75" />
        <line x1={3} y1={-3} x2={-3} y2={3} stroke={color} strokeWidth="0.75" />
      </>
    ) : (
      <>
        <rect x={-width / 2} y={-height / 2} width={width} height={height} rx={2}
          fill={color} fillOpacity="0.1" stroke={color} strokeWidth="0.75" />
        <line x1={0} y1={-height / 2 + 2} x2={0} y2={height / 2 - 2} stroke={color} strokeWidth="0.5" opacity="0.4" />
      </>
    )}
    <text x={0} y={height / 2 + 9} fontSize="5.5" fill={color} textAnchor="middle" fontWeight="600">{label}</text>
    {sublabel && (
      <text x={0} y={height / 2 + 17} fontSize="4.5" fill={color} textAnchor="middle" opacity="0.7">{sublabel}</text>
    )}
  </g>
);

// PCT Cell diagram
const PCTCellSVG = () => (
  <svg viewBox="0 0 480 320" className="w-full">
    <defs>
      <linearGradient id="cellGradPCT" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(150 40% 50%)" stopOpacity="0.08" />
        <stop offset="100%" stopColor="hsl(150 40% 50%)" stopOpacity="0.04" />
      </linearGradient>
    </defs>
    {/* Zone labels */}
    <text x="60" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">LUMEN</text>
    <text x="240" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">PCT CELL</text>
    <text x="420" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">BLOOD</text>

    {/* Apical membrane with brush border */}
    <line x1="120" y1="30" x2="120" y2="290" stroke="hsl(150 50% 45%)" strokeWidth="2" />
    {/* Brush border microvilli */}
    {Array.from({ length: 20 }).map((_, i) => (
      <line key={`mv-${i}`} x1={120} y1={35 + i * 13} x2={108} y2={35 + i * 13}
        stroke="hsl(150 50% 45%)" strokeWidth="1" opacity="0.5" />
    ))}
    <text x="108" y="305" fontSize="5" fill="hsl(150 50% 45%)" textAnchor="middle" opacity="0.6">Apical (brush border)</text>

    {/* Cell body */}
    <rect x="120" y="30" width="240" height="260" fill="url(#cellGradPCT)" />

    {/* Basolateral membrane with infoldings */}
    <path d="M 360 30 Q 365 50 360 70 Q 355 90 360 110 Q 365 130 360 150 Q 355 170 360 190 Q 365 210 360 230 Q 355 250 360 270 Q 365 280 360 290"
      fill="none" stroke="hsl(150 50% 45%)" strokeWidth="2" />
    <text x="368" y="305" fontSize="5" fill="hsl(150 50% 45%)" textAnchor="middle" opacity="0.6">Basolateral</text>

    {/* Mitochondria along basolateral */}
    {[60, 120, 180, 240].map((y, i) => (
      <g key={`mito-${i}`} opacity="0.3">
        <ellipse cx={345} cy={y} rx={8} ry={4} fill="none" stroke="hsl(150 40% 50%)" strokeWidth="1" />
        <path d={`M${340},${y} Q${345},${y - 2} ${350},${y}`} fill="none" stroke="hsl(150 40% 50%)" strokeWidth="0.5" />
      </g>
    ))}

    {/* === Na⁺/K⁺-ATPase (basolateral) === */}
    <ChannelIcon x={360} y={70} width={20} height={35} label="Na⁺/K⁺-ATPase" color="hsl(0 60% 50%)" type="pump" />
    {/* 3Na⁺ out */}
    <MoleculeStream path={{ x1: 350, y1: 70, x2: 430, y2: 55 }} color="hsl(0 60% 55%)" label="Na⁺" count={3} baseDuration={2000} />
    {/* 2K⁺ in */}
    <MoleculeStream path={{ x1: 430, y1: 85, x2: 350, y2: 75 }} color="hsl(270 55% 55%)" label="K⁺" count={2} baseDuration={2200} baseDelay={400} />
    <text x={435} y={52} fontSize="5" fill="hsl(0 60% 55%)" opacity="0.6">3Na⁺→</text>
    <text x={435} y={90} fontSize="5" fill="hsl(270 55% 55%)" opacity="0.6">←2K⁺</text>

    {/* === SGLT2 (apical) — Na⁺ + Glucose co-transport === */}
    <ChannelIcon x={120} y={70} width={18} height={30} label="SGLT2" sublabel="(Na⁺/glucose)" color="hsl(45 65% 50%)" type="cotransport" />
    <MoleculeStream path={{ x1: 50, y1: 60, x2: 140, y2: 60 }} color="hsl(0 60% 55%)" label="Na⁺" count={2} baseDuration={2500} />
    <MoleculeStream path={{ x1: 55, y1: 78, x2: 140, y2: 78 }} color="hsl(45 70% 50%)" label="Glc" count={2} baseDuration={2500} baseDelay={200} />

    {/* GLUT2 basolateral — glucose out */}
    <ChannelIcon x={360} y={140} width={16} height={25} label="GLUT2" color="hsl(45 65% 50%)" type="channel" />
    <MoleculeStream path={{ x1: 350, y1: 140, x2: 430, y2: 135 }} color="hsl(45 70% 50%)" label="Glc" count={2} baseDuration={2200} baseDelay={600} />

    {/* === NHE3 (apical) — Na⁺/H⁺ exchanger === */}
    <ChannelIcon x={120} y={140} width={18} height={28} label="NHE3" sublabel="(Na⁺/H⁺)" color="hsl(200 55% 50%)" type="exchanger" />
    <MoleculeStream path={{ x1: 50, y1: 132, x2: 140, y2: 132 }} color="hsl(0 60% 55%)" label="Na⁺" count={2} baseDuration={2800} />
    <MoleculeStream path={{ x1: 140, y1: 148, x2: 50, y2: 152 }} color="hsl(200 55% 55%)" label="H⁺" count={2} baseDuration={2800} baseDelay={300} />

    {/* === Carbonic anhydrase in cell === */}
    <g opacity="0.6">
      <rect x={190} y={140} width={60} height={22} rx={4} fill="hsl(200 40% 50%)" fillOpacity="0.1"
        stroke="hsl(200 40% 50%)" strokeWidth="0.75" />
      <text x={220} y={148} fontSize="5" fill="hsl(200 40% 50%)" textAnchor="middle" fontWeight="600">CA II</text>
      <text x={220} y={157} fontSize="4.5" fill="hsl(200 40% 50%)" textAnchor="middle">CO₂+H₂O → H⁺+HCO₃⁻</text>
    </g>

    {/* HCO₃⁻ out basolateral via NBC1 */}
    <ChannelIcon x={360} y={200} width={16} height={25} label="NBC1" sublabel="(Na⁺/3HCO₃⁻)" color="hsl(200 55% 50%)" type="cotransport" />
    <MoleculeStream path={{ x1: 350, y1: 195, x2: 430, y2: 190 }} color="hsl(200 55% 55%)" label="HCO₃⁻" count={2} baseDuration={2500} baseDelay={500} />

    {/* === AQP1 — water === */}
    <ChannelIcon x={120} y={210} width={14} height={22} label="AQP1" color="hsl(200 50% 55%)" type="channel" />
    <MoleculeStream path={{ x1: 55, y1: 210, x2: 430, y2: 210 }} color="hsl(200 50% 60%)" label="H₂O" count={4} baseDuration={3500} />

    {/* === Paracellular Na⁺/H₂O === */}
    <g opacity="0.35">
      <line x1={120} y1={255} x2={360} y2={255} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4 3" />
      <text x={240} y={268} fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="middle">Paracellular: Na⁺, H₂O (solvent drag)</text>
    </g>

    {/* Lumen CA IV */}
    <g opacity="0.5">
      <rect x={45} y={170} width={40} height={18} rx={3} fill="hsl(200 40% 50%)" fillOpacity="0.1"
        stroke="hsl(200 40% 50%)" strokeWidth="0.5" />
      <text x={65} y={178} fontSize="4.5" fill="hsl(200 40% 50%)" textAnchor="middle" fontWeight="600">CA IV</text>
      <text x={65} y={185} fontSize="3.5" fill="hsl(200 40% 50%)" textAnchor="middle">HCO₃⁻+H⁺→CO₂+H₂O</text>
    </g>
  </svg>
);

// TAL Cell diagram
const TALCellSVG = () => (
  <svg viewBox="0 0 480 320" className="w-full">
    <defs>
      <linearGradient id="cellGradTAL" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(30 50% 50%)" stopOpacity="0.08" />
        <stop offset="100%" stopColor="hsl(30 50% 50%)" stopOpacity="0.04" />
      </linearGradient>
    </defs>
    <text x="60" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">LUMEN (+8mV)</text>
    <text x="240" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">TAL CELL</text>
    <text x="420" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">BLOOD</text>

    <line x1="120" y1="30" x2="120" y2="290" stroke="hsl(30 55% 45%)" strokeWidth="2" />
    <rect x="120" y="30" width="240" height="260" fill="url(#cellGradTAL)" />
    <path d="M 360 30 Q 365 50 360 70 Q 355 90 360 110 Q 365 130 360 150 Q 355 170 360 190 Q 365 210 360 230 Q 355 250 360 270 Q 365 280 360 290"
      fill="none" stroke="hsl(30 55% 45%)" strokeWidth="2" />

    {/* Water-impermeable symbol */}
    <g opacity="0.4">
      <line x1={105} y1={260} x2={95} y2={270} stroke="hsl(200 50% 55%)" strokeWidth="1.5" />
      <line x1={100} y1={260} x2={90} y2={270} stroke="hsl(200 50% 55%)" strokeWidth="1.5" />
      <text x={90} y={282} fontSize="4.5" fill="hsl(200 50% 55%)" textAnchor="middle">No H₂O</text>
    </g>

    {/* Na⁺/K⁺-ATPase basolateral */}
    <ChannelIcon x={360} y={70} width={20} height={35} label="Na⁺/K⁺-ATPase" color="hsl(0 60% 50%)" type="pump" />
    <MoleculeStream path={{ x1: 350, y1: 65, x2: 430, y2: 55 }} color="hsl(0 60% 55%)" label="Na⁺" count={3} baseDuration={2000} />
    <MoleculeStream path={{ x1: 430, y1: 80, x2: 350, y2: 75 }} color="hsl(270 55% 55%)" label="K⁺" count={2} baseDuration={2200} baseDelay={400} />

    {/* NKCC2 — apical */}
    <ChannelIcon x={120} y={80} width={22} height={40} label="NKCC2" sublabel="(furosemide ✕)" color="hsl(30 65% 50%)" type="cotransport" />
    <MoleculeStream path={{ x1: 45, y1: 60, x2: 140, y2: 65 }} color="hsl(0 60% 55%)" label="Na⁺" count={2} baseDuration={2500} />
    <MoleculeStream path={{ x1: 50, y1: 75, x2: 140, y2: 78 }} color="hsl(270 55% 55%)" label="K⁺" count={2} baseDuration={2500} baseDelay={150} />
    <MoleculeStream path={{ x1: 40, y1: 92, x2: 140, y2: 92 }} color="hsl(120 50% 50%)" label="2Cl⁻" count={2} baseDuration={2500} baseDelay={300} />

    {/* ROMK — apical K⁺ recycling */}
    <ChannelIcon x={120} y={160} width={16} height={25} label="ROMK" sublabel="(K⁺ recycling)" color="hsl(270 55% 50%)" type="channel" />
    <MoleculeStream path={{ x1: 140, y1: 160, x2: 50, y2: 165 }} color="hsl(270 55% 55%)" label="K⁺" count={2} baseDuration={2200} />

    {/* ClC-Kb — basolateral Cl⁻ */}
    <ChannelIcon x={360} y={150} width={16} height={25} label="ClC-Kb" color="hsl(120 50% 45%)" type="channel" />
    <MoleculeStream path={{ x1: 350, y1: 150, x2: 430, y2: 145 }} color="hsl(120 50% 50%)" label="Cl⁻" count={3} baseDuration={2300} />

    {/* Paracellular Ca²⁺/Mg²⁺ driven by lumen-positive potential */}
    <g opacity="0.5">
      <line x1={120} y1={225} x2={360} y2={225} stroke="hsl(45 60% 50%)" strokeWidth="0.75" strokeDasharray="4 3" />
      <text x={240} y={240} fontSize="5.5" fill="hsl(45 60% 50%)" textAnchor="middle" fontWeight="500">Paracellular: Ca²⁺, Mg²⁺</text>
      <text x={240} y={250} fontSize="4.5" fill="hsl(45 50% 50%)" textAnchor="middle">(driven by +8 mV lumen potential)</text>
    </g>
    <MoleculeStream path={{ x1: 140, y1: 222, x2: 350, y2: 222 }} color="hsl(45 60% 50%)" label="Ca²⁺" count={2} baseDuration={3000} />
    <MoleculeStream path={{ x1: 145, y1: 228, x2: 350, y2: 228 }} color="hsl(60 50% 45%)" label="Mg²⁺" count={1} baseDuration={3200} baseDelay={800} />

    {/* Lumen-positive potential indicator */}
    <g opacity="0.6">
      <rect x={15} y={38} width={30} height={16} rx={3} fill="hsl(45 60% 50%)" fillOpacity="0.15" stroke="hsl(45 60% 50%)" strokeWidth="0.75" />
      <text x={30} y={49} fontSize="6" fill="hsl(45 60% 50%)" textAnchor="middle" fontWeight="700">+8mV</text>
    </g>
  </svg>
);

// DCT Cell diagram
const DCTCellSVG = () => (
  <svg viewBox="0 0 480 320" className="w-full">
    <defs>
      <linearGradient id="cellGradDCT" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(45 50% 50%)" stopOpacity="0.08" />
        <stop offset="100%" stopColor="hsl(45 50% 50%)" stopOpacity="0.04" />
      </linearGradient>
    </defs>
    <text x="60" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">LUMEN</text>
    <text x="240" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">DCT CELL</text>
    <text x="420" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">BLOOD</text>

    <line x1="120" y1="30" x2="120" y2="290" stroke="hsl(45 55% 45%)" strokeWidth="2" />
    <rect x="120" y="30" width="240" height="260" fill="url(#cellGradDCT)" />
    <path d="M 360 30 Q 365 50 360 70 Q 355 90 360 110 Q 365 130 360 150 Q 355 170 360 190 Q 365 210 360 230 Q 355 250 360 270 Q 365 280 360 290"
      fill="none" stroke="hsl(45 55% 45%)" strokeWidth="2" />

    {/* Na⁺/K⁺-ATPase basolateral */}
    <ChannelIcon x={360} y={70} width={20} height={35} label="Na⁺/K⁺-ATPase" color="hsl(0 60% 50%)" type="pump" />
    <MoleculeStream path={{ x1: 350, y1: 65, x2: 430, y2: 55 }} color="hsl(0 60% 55%)" label="Na⁺" count={3} baseDuration={2000} />
    <MoleculeStream path={{ x1: 430, y1: 80, x2: 350, y2: 75 }} color="hsl(270 55% 55%)" label="K⁺" count={2} baseDuration={2200} baseDelay={400} />

    {/* NCC — apical */}
    <ChannelIcon x={120} y={80} width={20} height={32} label="NCC" sublabel="(thiazide ✕)" color="hsl(45 65% 48%)" type="cotransport" />
    <MoleculeStream path={{ x1: 50, y1: 72, x2: 140, y2: 72 }} color="hsl(0 60% 55%)" label="Na⁺" count={2} baseDuration={2500} />
    <MoleculeStream path={{ x1: 50, y1: 88, x2: 140, y2: 88 }} color="hsl(120 50% 50%)" label="Cl⁻" count={2} baseDuration={2500} baseDelay={200} />

    {/* Cl⁻ exit basolateral */}
    <ChannelIcon x={360} y={140} width={14} height={22} label="ClC" color="hsl(120 50% 45%)" type="channel" />
    <MoleculeStream path={{ x1: 350, y1: 140, x2: 430, y2: 135 }} color="hsl(120 50% 50%)" label="Cl⁻" count={2} baseDuration={2300} />

    {/* === Ca²⁺ transcellular pathway === */}
    <text x={240} y={175} fontSize="6" fill="hsl(45 60% 50%)" textAnchor="middle" fontWeight="600" opacity="0.7">Ca²⁺ Transcellular Pathway</text>

    {/* TRPV5 — apical Ca²⁺ */}
    <ChannelIcon x={120} y={200} width={16} height={25} label="TRPV5" sublabel="(PTH ↑)" color="hsl(45 65% 50%)" type="channel" />
    <MoleculeStream path={{ x1: 50, y1: 200, x2: 140, y2: 200 }} color="hsl(45 65% 50%)" label="Ca²⁺" count={2} baseDuration={2800} />

    {/* Calbindin shuttle */}
    <g opacity="0.5">
      <rect x={200} y={192} width={50} height={18} rx={4} fill="hsl(45 50% 50%)" fillOpacity="0.1"
        stroke="hsl(45 50% 50%)" strokeWidth="0.5" />
      <text x={225} y={204} fontSize="5" fill="hsl(45 50% 50%)" textAnchor="middle">Calbindin-D28k</text>
    </g>
    <MoleculeStream path={{ x1: 150, y1: 200, x2: 340, y2: 200 }} color="hsl(45 65% 50%)" label="Ca²⁺" count={2} baseDuration={3000} baseDelay={600} />

    {/* NCX basolateral */}
    <ChannelIcon x={360} y={200} width={16} height={25} label="NCX" sublabel="(3Na⁺/Ca²⁺)" color="hsl(45 60% 48%)" type="exchanger" />
    <MoleculeStream path={{ x1: 350, y1: 195, x2: 430, y2: 192 }} color="hsl(45 65% 50%)" label="Ca²⁺" count={2} baseDuration={2500} baseDelay={900} />

    {/* PMCA */}
    <ChannelIcon x={360} y={250} width={16} height={22} label="PMCA" sublabel="(Ca²⁺-ATPase)" color="hsl(45 55% 48%)" type="pump" />
    <MoleculeStream path={{ x1: 350, y1: 250, x2: 430, y2: 248 }} color="hsl(45 65% 50%)" label="Ca²⁺" count={1} baseDuration={2800} baseDelay={1200} />
  </svg>
);

// Principal Cell diagram
const PrincipalCellSVG = () => (
  <svg viewBox="0 0 480 320" className="w-full">
    <defs>
      <linearGradient id="cellGradPC" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(270 40% 50%)" stopOpacity="0.08" />
        <stop offset="100%" stopColor="hsl(270 40% 50%)" stopOpacity="0.04" />
      </linearGradient>
    </defs>
    <text x="60" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">LUMEN (−)</text>
    <text x="240" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">PRINCIPAL CELL</text>
    <text x="420" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">BLOOD</text>

    <line x1="120" y1="30" x2="120" y2="290" stroke="hsl(270 50% 45%)" strokeWidth="2" />
    <rect x="120" y="30" width="240" height="260" fill="url(#cellGradPC)" />
    <path d="M 360 30 Q 365 50 360 70 Q 355 90 360 110 Q 365 130 360 150 Q 355 170 360 190 Q 365 210 360 230 Q 355 250 360 270 Q 365 280 360 290"
      fill="none" stroke="hsl(270 50% 45%)" strokeWidth="2" />

    {/* Na⁺/K⁺-ATPase basolateral */}
    <ChannelIcon x={360} y={70} width={20} height={35} label="Na⁺/K⁺-ATPase" sublabel="(aldosterone ↑)" color="hsl(0 60% 50%)" type="pump" />
    <MoleculeStream path={{ x1: 350, y1: 65, x2: 430, y2: 55 }} color="hsl(0 60% 55%)" label="Na⁺" count={3} baseDuration={2000} />
    <MoleculeStream path={{ x1: 430, y1: 80, x2: 350, y2: 75 }} color="hsl(270 55% 55%)" label="K⁺" count={2} baseDuration={2200} baseDelay={400} />

    {/* ENaC — apical Na⁺ */}
    <ChannelIcon x={120} y={80} width={18} height={30} label="ENaC" sublabel="(amiloride ✕)" color="hsl(0 55% 50%)" type="channel" />
    <MoleculeStream path={{ x1: 50, y1: 78, x2: 140, y2: 78 }} color="hsl(0 60% 55%)" label="Na⁺" count={3} baseDuration={2500} />

    {/* ROMK — apical K⁺ secretion */}
    <ChannelIcon x={120} y={150} width={16} height={25} label="ROMK" sublabel="(K⁺ secretion)" color="hsl(270 55% 50%)" type="channel" />
    <MoleculeStream path={{ x1: 140, y1: 150, x2: 50, y2: 155 }} color="hsl(270 55% 55%)" label="K⁺" count={3} baseDuration={2400} />

    {/* Aldosterone / MR receptor */}
    <g opacity="0.5">
      <rect x={195} y={45} width={65} height={22} rx={4} fill="hsl(270 40% 50%)" fillOpacity="0.1"
        stroke="hsl(270 40% 50%)" strokeWidth="0.75" />
      <text x={227} y={55} fontSize="5" fill="hsl(270 40% 50%)" textAnchor="middle" fontWeight="600">Mineralocorticoid R</text>
      <text x={227} y={63} fontSize="4.5" fill="hsl(270 40% 50%)" textAnchor="middle">Aldosterone → ↑ENaC, ↑ROMK</text>
    </g>

    {/* === AQP2 — ADH-dependent === */}
    <ChannelIcon x={120} y={220} width={16} height={25} label="AQP2" sublabel="(ADH → V2R)" color="hsl(200 55% 50%)" type="channel" />
    <MoleculeStream path={{ x1: 50, y1: 220, x2: 140, y2: 220 }} color="hsl(200 50% 60%)" label="H₂O" count={3} baseDuration={3000} />

    {/* AQP3/4 basolateral */}
    <ChannelIcon x={360} y={220} width={16} height={25} label="AQP3/4" sublabel="(constitutive)" color="hsl(200 50% 48%)" type="channel" />
    <MoleculeStream path={{ x1: 350, y1: 220, x2: 430, y2: 218 }} color="hsl(200 50% 60%)" label="H₂O" count={3} baseDuration={2800} baseDelay={500} />

    {/* ADH / V2R / cAMP cascade */}
    <g opacity="0.45">
      <rect x={195} y={230} width={65} height={30} rx={4} fill="hsl(200 40% 50%)" fillOpacity="0.1"
        stroke="hsl(200 40% 50%)" strokeWidth="0.5" />
      <text x={227} y={241} fontSize="4.5" fill="hsl(200 40% 50%)" textAnchor="middle" fontWeight="600">ADH → V2R</text>
      <text x={227} y={249} fontSize="4" fill="hsl(200 40% 50%)" textAnchor="middle">→ cAMP → PKA</text>
      <text x={227} y={257} fontSize="4" fill="hsl(200 40% 50%)" textAnchor="middle">→ AQP2 vesicle exocytosis</text>
    </g>

    {/* Lumen-negative potential indicator */}
    <g opacity="0.6">
      <rect x={20} y={38} width={28} height={16} rx={3} fill="hsl(270 50% 50%)" fillOpacity="0.15" stroke="hsl(270 50% 50%)" strokeWidth="0.75" />
      <text x={34} y={49} fontSize="6" fill="hsl(270 50% 50%)" textAnchor="middle" fontWeight="700">−ve</text>
    </g>
  </svg>
);

// Type A Intercalated Cell diagram
const IntercalatedACellSVG = () => (
  <svg viewBox="0 0 480 320" className="w-full">
    <defs>
      <linearGradient id="cellGradIA" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="hsl(0 40% 50%)" stopOpacity="0.08" />
        <stop offset="100%" stopColor="hsl(0 40% 50%)" stopOpacity="0.04" />
      </linearGradient>
    </defs>
    <text x="60" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">LUMEN</text>
    <text x="240" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">TYPE A INTERCALATED</text>
    <text x="420" y="18" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">BLOOD</text>

    <line x1="120" y1="30" x2="120" y2="290" stroke="hsl(0 50% 45%)" strokeWidth="2" />
    <rect x="120" y="30" width="240" height="260" fill="url(#cellGradIA)" />
    <path d="M 360 30 Q 365 50 360 70 Q 355 90 360 110 Q 365 130 360 150 Q 355 170 360 190 Q 365 210 360 230 Q 355 250 360 270 Q 365 280 360 290"
      fill="none" stroke="hsl(0 50% 45%)" strokeWidth="2" />

    {/* H⁺-ATPase apical */}
    <ChannelIcon x={120} y={70} width={20} height={35} label="H⁺-ATPase" color="hsl(0 60% 50%)" type="pump" />
    <MoleculeStream path={{ x1: 140, y1: 68, x2: 50, y2: 62 }} color="hsl(0 60% 55%)" label="H⁺" count={3} baseDuration={2000} />

    {/* H⁺/K⁺-ATPase apical */}
    <ChannelIcon x={120} y={140} width={20} height={30} label="H⁺/K⁺-ATPase" color="hsl(0 55% 48%)" type="pump" />
    <MoleculeStream path={{ x1: 140, y1: 133, x2: 50, y2: 128 }} color="hsl(0 60% 55%)" label="H⁺" count={2} baseDuration={2500} />
    <MoleculeStream path={{ x1: 50, y1: 148, x2: 140, y2: 148 }} color="hsl(270 55% 55%)" label="K⁺" count={2} baseDuration={2500} baseDelay={300} />

    {/* CA II in cell */}
    <g opacity="0.55">
      <rect x={200} y={80} width={55} height={30} rx={4} fill="hsl(200 40% 50%)" fillOpacity="0.1"
        stroke="hsl(200 40% 50%)" strokeWidth="0.75" />
      <text x={227} y={91} fontSize="5" fill="hsl(200 40% 50%)" textAnchor="middle" fontWeight="600">CA II</text>
      <text x={227} y={100} fontSize="4.5" fill="hsl(200 40% 50%)" textAnchor="middle">CO₂ + H₂O</text>
      <text x={227} y={107} fontSize="4.5" fill="hsl(200 40% 50%)" textAnchor="middle">→ H⁺ + HCO₃⁻</text>
    </g>

    {/* AE1 — basolateral Cl⁻/HCO₃⁻ exchanger */}
    <ChannelIcon x={360} y={90} width={18} height={30} label="AE1" sublabel="(Cl⁻/HCO₃⁻)" color="hsl(200 55% 50%)" type="exchanger" />
    <MoleculeStream path={{ x1: 350, y1: 82, x2: 430, y2: 78 }} color="hsl(200 55% 55%)" label="HCO₃⁻" count={3} baseDuration={2200} />
    <MoleculeStream path={{ x1: 430, y1: 98, x2: 350, y2: 98 }} color="hsl(120 50% 50%)" label="Cl⁻" count={2} baseDuration={2200} baseDelay={300} />
    <text x={440} y={75} fontSize="5" fill="hsl(200 55% 55%)" opacity="0.6">New HCO₃⁻→blood</text>

    {/* Lumen buffering */}
    <g opacity="0.45">
      <rect x={20} y={180} width={75} height={40} rx={4} fill="hsl(30 40% 50%)" fillOpacity="0.08"
        stroke="hsl(30 40% 50%)" strokeWidth="0.5" />
      <text x={57} y={192} fontSize="5" fill="hsl(30 40% 50%)" textAnchor="middle" fontWeight="600">Urinary Buffers</text>
      <text x={57} y={202} fontSize="4.5" fill="hsl(30 40% 50%)" textAnchor="middle">HPO₄²⁻ + H⁺ → H₂PO₄⁻</text>
      <text x={57} y={212} fontSize="4.5" fill="hsl(30 40% 50%)" textAnchor="middle">NH₃ + H⁺ → NH₄⁺</text>
    </g>

    {/* NH₃ diffusion into lumen */}
    <g opacity="0.4">
      <line x1={360} y1={200} x2={120} y2={230} stroke="hsl(30 45% 50%)" strokeWidth="0.5" strokeDasharray="3 2" />
      <text x={240} y={222} fontSize="4.5" fill="hsl(30 45% 50%)" textAnchor="middle">NH₃ diffuses in → trapped as NH₄⁺</text>
    </g>
    <MoleculeStream path={{ x1: 350, y1: 200, x2: 60, y2: 235 }} color="hsl(30 50% 50%)" label="NH₃" count={2} baseDuration={3500} />

    {/* CO₂ entry */}
    <MoleculeStream path={{ x1: 430, y1: 165, x2: 260, y2: 100 }} color="hsl(var(--muted-foreground))" label="CO₂" count={2} baseDuration={3000} baseDelay={500} />
  </svg>
);

const cellSVGs: Record<CellType, () => JSX.Element> = {
  pct: PCTCellSVG,
  tal: TALCellSVG,
  dct: DCTCellSVG,
  principal: PrincipalCellSVG,
  "intercalated-a": IntercalatedACellSVG,
};

const cellColors: Record<CellType, string> = {
  pct: "hsl(150 50% 45%)",
  tal: "hsl(30 55% 45%)",
  dct: "hsl(45 60% 45%)",
  principal: "hsl(270 50% 50%)",
  "intercalated-a": "hsl(0 50% 50%)",
};

export const TubularCellDiagram = () => {
  const [activeCell, setActiveCell] = useState<CellType>("pct");
  const info = cellTypes.find(c => c.id === activeCell)!;
  const CellSVG = cellSVGs[activeCell];

  return (
    <DiagramFigure
      id="tubular-cell-diagram"
      title="Tubular cell"
      description="Tubular cell: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
                  <div className="space-y-4">
        {/* Cell type selector */}
        <div className="flex flex-wrap gap-2">
          {cellTypes.map(cell => (
            <button
              key={cell.id}
              onClick={() => setActiveCell(cell.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                activeCell === cell.id
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {cell.label}
            </button>
          ))}
        </div>
  
        {/* Cell diagram */}
        <div className="bg-card rounded-lg border border-border p-4 animate-fade-in" key={activeCell}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cellColors[activeCell] }} />
            <h4 className="text-sm font-semibold text-foreground">{info.label}</h4>
            <span className="text-xs text-muted-foreground">— {info.subtitle}</span>
          </div>
          <CellSVG />
        </div>
  
        {/* Info panel */}
        <div className="rounded-lg border border-border bg-secondary/30 p-4 space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
          {info.drugTarget && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground/80">Drug targets: </span>
                {info.drugTarget}
              </p>
            </div>
          )}
        </div>
      </div>
    </DiagramFigure>
  );
};

export default TubularCellDiagram;
