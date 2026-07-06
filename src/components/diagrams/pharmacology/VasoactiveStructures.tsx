import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Drug = "adrenaline" | "noradrenaline" | "dopamine" | "dobutamine" | "phenylephrine" | "isoprenaline" | "ephedrine";

const drugs: { key: Drug; label: string }[] = [
  { key: "adrenaline", label: "Adrenaline" },
  { key: "noradrenaline", label: "Noradrenaline" },
  { key: "dopamine", label: "Dopamine" },
  { key: "dobutamine", label: "Dobutamine" },
  { key: "phenylephrine", label: "Phenylephrine" },
  { key: "isoprenaline", label: "Isoprenaline" },
  { key: "ephedrine", label: "Ephedrine" },
];

const info: Record<Drug, { name: string; formula: string; mw: string; features: string[] }> = {
  adrenaline: {
    name: "Adrenaline (Epinephrine)",
    formula: "C₉H₁₃NO₃", mw: "183.2",
    features: [
      "Catechol ring: 3,4-dihydroxyphenyl group — essential for receptor binding",
      "β-hydroxyl on side chain — required for α and β receptor activity",
      "N-methyl group on amine — confers β₂ selectivity (cf. noradrenaline lacks this)",
      "Larger N-substituent → greater β₂ activity (structure-activity rule)",
      "Metabolised by COMT (catechol methylation) and MAO (oxidative deamination)",
      "Chiral centre at β-carbon: R(−) enantiomer is 10–100× more active than S(+)",
    ],
  },
  noradrenaline: {
    name: "Noradrenaline (Norepinephrine)",
    formula: "C₈H₁₁NO₃", mw: "169.2",
    features: [
      "Identical to adrenaline but PRIMARY AMINE — no N-methyl group",
      "Catechol ring with 3,4-dihydroxyl groups — same as adrenaline",
      "β-hydroxyl present → retains α₁ and β₁ activity",
      "Absence of N-methyl → minimal β₂ activity (key structural difference)",
      "Predominantly α₁ agonist — first-line vasopressor in septic shock",
      "Metabolised by COMT → normetanephrine, and MAO → DOPGAL",
    ],
  },
  dopamine: {
    name: "Dopamine",
    formula: "C₈H₁₁NO₂", mw: "153.2",
    features: [
      "Catechol ring with 3,4-dihydroxyl groups — same catechol core",
      "NO β-hydroxyl on side chain — key difference from NA/adrenaline",
      "Absence of β-OH → reduced α/β receptor affinity → activates D₁ at low doses",
      "Primary amine (like NA) — no N-methyl group",
      "Endogenous precursor: Tyrosine → DOPA → Dopamine → NA → Adrenaline",
      "Cannot cross BBB — central effects via D₁/D₂ not achieved with IV dopamine",
    ],
  },
  dobutamine: {
    name: "Dobutamine",
    formula: "C₁₈H₂₃NO₃", mw: "301.4",
    features: [
      "Synthetic catecholamine — catechol ring retained",
      "β-hydroxyl present → α and β receptor activity",
      "Large bulky N-substituent (4-hydroxyphenyl-methyl-propyl group)",
      "Bulky N-group → strong β₁ selectivity (structure-activity relationship)",
      "Racemic mixture: (+) isomer = β₁ agonist, (−) isomer = α₁ agonist",
      "Not a substrate for COMT — metabolised differently, slightly longer acting",
    ],
  },
  phenylephrine: {
    name: "Phenylephrine",
    formula: "C₉H₁₃NO₂", mw: "167.2",
    features: [
      "Only ONE hydroxyl on ring (3-OH) — NOT a catechol (no 4-OH)",
      "Absence of 4-OH makes it resistant to COMT → longer duration of action",
      "β-hydroxyl present on side chain → α receptor activity",
      "N-methyl group present — but no catechol → pure α₁ selectivity",
      "No β activity despite N-methyl (catechol needed for β binding)",
      "Oral bioavailability possible due to COMT resistance",
    ],
  },
  isoprenaline: {
    name: "Isoprenaline (Isoproterenol)",
    formula: "C₁₁H₁₇NO₃", mw: "211.3",
    features: [
      "Catechol ring: 3,4-dihydroxyl groups present",
      "β-hydroxyl on side chain — required for receptor activity",
      "N-isopropyl group — LARGEST simple N-substituent in the series",
      "Large N-substituent → maximal β selectivity, zero α activity",
      "Demonstrates the SAR rule: ↑ N-substituent size → ↑ β / ↓ α",
      "Non-selective β agonist (β₁ = β₂). Used for complete heart block, torsades",
    ],
  },
  ephedrine: {
    name: "Ephedrine",
    formula: "C₁₀H₁₅NO", mw: "165.2",
    features: [
      "NOT a catecholamine — only ONE phenyl hydroxyl, and it's absent (no ring OH)",
      "Phenyl ring with NO hydroxyl groups — not a substrate for COMT or MAO",
      "β-hydroxyl on side chain — similar to catecholamines",
      "N-methyl group — secondary amine",
      "α-methyl group on side chain → resists MAO → oral bioavailability",
      "Indirect sympathomimetic: displaces stored NA from vesicles",
      "Not a COMT/MAO substrate → longer duration than catecholamines (15–20 min)",
    ],
  },
};

/* ── SVG Components ── */

const CatecholCore = ({ x, y, highlight3OH = true, highlight4OH = true }: { x: number; y: number; highlight3OH?: boolean; highlight4OH?: boolean }) => (
  <g>
    {/* Benzene ring */}
    <polygon
      points={`${x},${y} ${x+30},${y-17} ${x+60},${y} ${x+60},${y+35} ${x+30},${y+52} ${x},${y+35}`}
      fill="none" stroke="hsl(var(--foreground))" strokeWidth="2"
    />
    <polygon
      points={`${x+8},${y+6} ${x+30},${y-6} ${x+52},${y+6} ${x+52},${y+29} ${x+30},${y+41} ${x+8},${y+29}`}
      fill="none" stroke="hsl(var(--foreground))" strokeWidth="2"
    />
    {/* 3-OH */}
    <line x1={x} y1={y} x2={x-22} y2={y-12} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={x-35} y={y-8} textAnchor="middle" className={`text-[11px] font-bold ${highlight3OH ? "fill-destructive" : "fill-muted-foreground"}`}>
      OH
    </text>
    {highlight3OH && (
      <text x={x-35} y={y+5} textAnchor="middle" className="fill-accent text-[7px]">3-OH</text>
    )}
    {/* 4-OH */}
    <line x1={x} y1={y+35} x2={x-22} y2={y+47} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={x-35} y={y+51} textAnchor="middle" className={`text-[11px] font-bold ${highlight4OH ? "fill-destructive" : "fill-muted-foreground"}`}>
      {highlight4OH ? "OH" : "OH"}
    </text>
    {highlight4OH && (
      <text x={x-35} y={y+64} textAnchor="middle" className="fill-accent text-[7px]">4-OH</text>
    )}
  </g>
);

const AdrenalineSVG = () => (
  <g transform="translate(40,20)">
    <CatecholCore x={80} y={60} />
    {/* Side chain from C1 */}
    <line x1={140} y1={78} x2={170} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* β-carbon with OH */}
    <text x={180} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH</text>
    <line x1={180} y1={68} x2={180} y2={50} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={180} y={42} textAnchor="middle" className="fill-destructive text-[11px] font-bold">OH</text>
    <text x={180} y={33} textAnchor="middle" className="fill-accent text-[7px]">β-OH</text>
    {/* α-carbon */}
    <line x1={192} y1={78} x2={220} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={230} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH₂</text>
    {/* N-methyl amine */}
    <line x1={245} y1={78} x2={270} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx={283} cy={78} r={12} fill="hsl(var(--background))" />
    <text x={283} y={83} textAnchor="middle" className="fill-primary text-[11px] font-bold">NH</text>
    <line x1={295} y1={78} x2={320} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={335} y={82} textAnchor="middle" className="fill-primary text-[10px] font-bold">CH₃</text>
    {/* Highlight box around N-methyl */}
    <rect x={265} y={62} width={80} height={32} rx={5} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 2" />
    <text x={305} y={108} textAnchor="middle" className="fill-primary text-[8px] font-bold">N-methyl → β₂ selectivity</text>
    {/* Catechol label */}
    <rect x={42} y={110} width={75} height={16} rx={3} fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x={80} y={122} textAnchor="middle" className="fill-accent text-[8px] font-bold">Catechol ring</text>
  </g>
);

const NoradrenalineSVG = () => (
  <g transform="translate(40,20)">
    <CatecholCore x={80} y={60} />
    <line x1={140} y1={78} x2={170} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={180} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH</text>
    <line x1={180} y1={68} x2={180} y2={50} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={180} y={42} textAnchor="middle" className="fill-destructive text-[11px] font-bold">OH</text>
    <text x={180} y={33} textAnchor="middle" className="fill-accent text-[7px]">β-OH</text>
    <line x1={192} y1={78} x2={220} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={230} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH₂</text>
    {/* Primary amine — NO methyl */}
    <line x1={245} y1={78} x2={270} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx={283} cy={78} r={12} fill="hsl(var(--background))" />
    <text x={283} y={83} textAnchor="middle" className="fill-primary text-[11px] font-bold">NH₂</text>
    {/* Highlight: no N-methyl */}
    <rect x={265} y={62} width={36} height={32} rx={5} fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="4 2" />
    <text x={283} y={108} textAnchor="middle" className="fill-destructive text-[8px] font-bold">No N-methyl → minimal β₂</text>
    <rect x={42} y={110} width={75} height={16} rx={3} fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x={80} y={122} textAnchor="middle" className="fill-accent text-[8px] font-bold">Catechol ring</text>
  </g>
);

const DopamineSVG = () => (
  <g transform="translate(40,20)">
    <CatecholCore x={80} y={60} />
    <line x1={140} y1={78} x2={170} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* No β-OH — key difference */}
    <text x={180} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH₂</text>
    <line x1={192} y1={78} x2={220} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={230} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH₂</text>
    <line x1={245} y1={78} x2={270} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx={283} cy={78} r={12} fill="hsl(var(--background))" />
    <text x={283} y={83} textAnchor="middle" className="fill-primary text-[11px] font-bold">NH₂</text>
    {/* Missing β-OH annotation */}
    <line x1={180} y1={68} x2={180} y2={50} stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 2" />
    <text x={180} y={42} textAnchor="middle" className="fill-muted-foreground text-[10px]">✗</text>
    <text x={180} y={33} textAnchor="middle" className="fill-destructive text-[7px] font-bold">No β-OH</text>
    <text x={180} y={24} textAnchor="middle" className="fill-destructive text-[6px]">→ ↓ α/β affinity</text>
    <rect x={42} y={110} width={75} height={16} rx={3} fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x={80} y={122} textAnchor="middle" className="fill-accent text-[8px] font-bold">Catechol ring</text>
  </g>
);

const DobutamineSVG = () => (
  <g transform="translate(20,15)">
    <CatecholCore x={60} y={55} />
    <line x1={120} y1={73} x2={148} y2={73} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={158} y={77} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH</text>
    <line x1={158} y1={63} x2={158} y2={45} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={158} y={38} textAnchor="middle" className="fill-destructive text-[11px] font-bold">OH</text>
    <text x={158} y={29} textAnchor="middle" className="fill-accent text-[7px]">β-OH</text>
    <line x1={170} y1={73} x2={195} y2={73} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={205} y={77} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH₂</text>
    <line x1={218} y1={73} x2={240} y2={73} stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Bulky N-substituent */}
    <circle cx={250} cy={73} r={10} fill="hsl(var(--background))" />
    <text x={250} y={77} textAnchor="middle" className="fill-primary text-[10px] font-bold">NH</text>
    <line x1={260} y1={73} x2={280} y2={73} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={290} y={77} textAnchor="middle" className="fill-foreground text-[9px]">CH₂</text>
    <line x1={300} y1={73} x2={315} y2={73} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={325} y={77} textAnchor="middle" className="fill-foreground text-[9px]">CH₂</text>
    <line x1={335} y1={73} x2={350} y2={73} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={360} y={77} textAnchor="middle" className="fill-foreground text-[9px]">CH₂</text>
    {/* 4-hydroxyphenyl */}
    <line x1={370} y1={73} x2={385} y2={60} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon
      points="385,60 405,48 425,60 425,85 405,97 385,85"
      fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5"
    />
    <polygon
      points="391,64 405,55 419,64 419,81 405,90 391,81"
      fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5"
    />
    <line x1={405} y1={97} x2={405} y2={112} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={405} y={124} textAnchor="middle" className="fill-destructive text-[10px] font-bold">OH</text>
    {/* Highlight bulky N-group */}
    <rect x={237} y={56} width={200} height={34} rx={5} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 2" />
    <text x={337} y={105} textAnchor="middle" className="fill-primary text-[7px] font-bold">Bulky N-substituent → strong β₁ selectivity</text>
    <text x={337} y={116} textAnchor="middle" className="fill-primary text-[6.5px]">(4-hydroxyphenyl)-methyl-propyl group</text>
    <rect x={22} y={105} width={75} height={16} rx={3} fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x={60} y={117} textAnchor="middle" className="fill-accent text-[8px] font-bold">Catechol ring</text>
  </g>
);

const PhenylephrieneSVG = () => (
  <g transform="translate(40,20)">
    {/* Benzene ring — only 3-OH, no 4-OH */}
    <polygon
      points="80,60 110,43 140,60 140,95 110,112 80,95"
      fill="none" stroke="hsl(var(--foreground))" strokeWidth="2"
    />
    <polygon
      points="88,66 110,54 132,66 132,89 110,101 88,89"
      fill="none" stroke="hsl(var(--foreground))" strokeWidth="2"
    />
    {/* 3-OH only */}
    <line x1={80} y1={60} x2={58} y2={48} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={43} y={52} textAnchor="middle" className="fill-destructive text-[11px] font-bold">OH</text>
    <text x={43} y={65} textAnchor="middle" className="fill-accent text-[7px]">3-OH only</text>
    {/* No 4-OH — crossed out */}
    <line x1={80} y1={95} x2={58} y2={107} stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 2" />
    <text x={43} y={111} textAnchor="middle" className="fill-muted-foreground text-[10px]">✗</text>
    <text x={43} y={124} textAnchor="middle" className="fill-destructive text-[7px] font-bold">No 4-OH</text>
    {/* Not a catechol annotation */}
    <rect x={22} y={130} width={95} height={16} rx={3} fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x={70} y={142} textAnchor="middle" className="fill-destructive text-[7px] font-bold">NOT a catechol → resists COMT</text>
    {/* Side chain */}
    <line x1={140} y1={78} x2={170} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={180} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH</text>
    <line x1={180} y1={68} x2={180} y2={50} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={180} y={42} textAnchor="middle" className="fill-destructive text-[11px] font-bold">OH</text>
    <text x={180} y={33} textAnchor="middle" className="fill-accent text-[7px]">β-OH</text>
    <line x1={192} y1={78} x2={220} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={230} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH₂</text>
    <line x1={245} y1={78} x2={270} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx={283} cy={78} r={12} fill="hsl(var(--background))" />
    <text x={283} y={83} textAnchor="middle" className="fill-primary text-[11px] font-bold">NH</text>
    <line x1={295} y1={78} x2={320} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={335} y={82} textAnchor="middle" className="fill-primary text-[10px] font-bold">CH₃</text>
    <text x={310} y={108} textAnchor="middle" className="fill-muted-foreground text-[7px]">N-methyl present but no catechol</text>
    <text x={310} y={120} textAnchor="middle" className="fill-muted-foreground text-[7px]">→ pure α₁ (no β activity)</text>
  </g>
);

const IsoprenalineSVG = () => (
  <g transform="translate(40,20)">
    <CatecholCore x={80} y={60} />
    <line x1={140} y1={78} x2={170} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={180} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH</text>
    <line x1={180} y1={68} x2={180} y2={50} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={180} y={42} textAnchor="middle" className="fill-destructive text-[11px] font-bold">OH</text>
    <text x={180} y={33} textAnchor="middle" className="fill-accent text-[7px]">β-OH</text>
    <line x1={192} y1={78} x2={220} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={230} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH₂</text>
    <line x1={245} y1={78} x2={270} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx={283} cy={78} r={12} fill="hsl(var(--background))" />
    <text x={283} y={83} textAnchor="middle" className="fill-primary text-[11px] font-bold">NH</text>
    {/* Isopropyl — largest N-substituent */}
    <line x1={295} y1={78} x2={318} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={328} y={82} textAnchor="middle" className="fill-foreground text-[9px]">CH</text>
    <line x1={335} y1={72} x2={355} y2={58} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={368} y={56} textAnchor="middle" className="fill-muted-foreground text-[9px]">CH₃</text>
    <line x1={335} y1={84} x2={355} y2={98} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={368} y={102} textAnchor="middle" className="fill-muted-foreground text-[9px]">CH₃</text>
    {/* Highlight */}
    <rect x={270} y={55} width={110} height={55} rx={5} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4 2" />
    <text x={325} y={125} textAnchor="middle" className="fill-primary text-[8px] font-bold">N-isopropyl → max β, zero α</text>
    <rect x={42} y={110} width={75} height={16} rx={3} fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x={80} y={122} textAnchor="middle" className="fill-accent text-[8px] font-bold">Catechol ring</text>
  </g>
);

const EphedrineSVG = () => (
  <g transform="translate(40,20)">
    {/* Benzene ring — NO hydroxyl groups */}
    <polygon
      points="80,60 110,43 140,60 140,95 110,112 80,95"
      fill="none" stroke="hsl(var(--foreground))" strokeWidth="2"
    />
    <polygon
      points="88,66 110,54 132,66 132,89 110,101 88,89"
      fill="none" stroke="hsl(var(--foreground))" strokeWidth="2"
    />
    {/* No ring OH */}
    <line x1={80} y1={60} x2={58} y2={48} stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 2" />
    <text x={43} y={52} textAnchor="middle" className="fill-muted-foreground text-[10px]">✗</text>
    <line x1={80} y1={95} x2={58} y2={107} stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 2" />
    <text x={43} y={111} textAnchor="middle" className="fill-muted-foreground text-[10px]">✗</text>
    <rect x={22} y={120} width={95} height={24} rx={3} fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x={70} y={132} textAnchor="middle" className="fill-destructive text-[7px] font-bold">No ring OH → not catecholamine</text>
    <text x={70} y={142} textAnchor="middle" className="fill-destructive text-[6.5px]">Resists COMT + MAO → oral bioavailability</text>
    {/* Side chain */}
    <line x1={140} y1={78} x2={170} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={180} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH</text>
    <line x1={180} y1={68} x2={180} y2={50} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={180} y={42} textAnchor="middle" className="fill-destructive text-[11px] font-bold">OH</text>
    <text x={180} y={33} textAnchor="middle" className="fill-accent text-[7px]">β-OH</text>
    {/* α-methyl */}
    <line x1={192} y1={78} x2={220} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={230} y={82} textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH</text>
    <line x1={230} y1={88} x2={230} y2={105} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={230} y={116} textAnchor="middle" className="fill-primary text-[10px] font-bold">CH₃</text>
    <text x={230} y={128} textAnchor="middle" className="fill-primary text-[7px]">α-methyl</text>
    {/* NH-CH3 */}
    <line x1={245} y1={78} x2={270} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx={283} cy={78} r={12} fill="hsl(var(--background))" />
    <text x={283} y={83} textAnchor="middle" className="fill-primary text-[11px] font-bold">NH</text>
    <line x1={295} y1={78} x2={320} y2={78} stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x={335} y={82} textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
  </g>
);

const svgComponents: Record<Drug, () => JSX.Element> = {
  adrenaline: AdrenalineSVG,
  noradrenaline: NoradrenalineSVG,
  dopamine: DopamineSVG,
  dobutamine: DobutamineSVG,
  phenylephrine: PhenylephrieneSVG,
  isoprenaline: IsoprenalineSVG,
  ephedrine: EphedrineSVG,
};

const VasoactiveStructures = () => {
  const [selected, setSelected] = useState<Drug>("adrenaline");
  const SVGComponent = svgComponents[selected];
  const d = info[selected];
  const isWide = selected === "dobutamine";

  return (
    <DiagramFigure
      id="vasoactive-structures"
      title="Vasoactive structures"
      description="Auto-generated wrapper for the Vasoactive structures anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Molecular Structures</h4>
        <div className="flex flex-wrap gap-2">
          {drugs.map((drug) => (
            <button
              key={drug.key}
              onClick={() => setSelected(drug.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selected === drug.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {drug.label}
            </button>
          ))}
        </div>
        <div className="bg-secondary/30 rounded-xl p-5 border border-border">
          <svg viewBox={isWide ? "0 0 480 160" : "0 0 420 170"} className="w-full h-auto">
            <text x={isWide ? 240 : 210} y="14" textAnchor="middle" className="fill-foreground text-[13px] font-bold">{d.name}</text>
            <SVGComponent />
          </svg>
          <div className="mt-3 space-y-1">
            <p className="text-xs font-medium text-foreground">MW: {d.mw} | Formula: {d.formula}</p>
            <ul className="text-xs text-muted-foreground space-y-0.5">
              {d.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
          </div>
        </div>
  
        {/* SAR summary */}
        <div className="rounded-lg bg-background/60 p-3 border border-border">
          <p className="text-xs font-bold text-foreground mb-2">Structure-Activity Relationships (SAR)</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• <strong>Catechol ring</strong> (3,4-diOH): required for α and β activity. Absent → not a catecholamine</li>
            <li>• <strong>β-hydroxyl</strong>: required for significant adrenoreceptor binding. Absent in dopamine → D₁ preference</li>
            <li>• <strong>↑ N-substituent size</strong>: H (NA) → CH₃ (adrenaline) → isopropyl (isoprenaline) → ↑ β / ↓ α</li>
            <li>• <strong>α-methyl</strong> (ephedrine): resists MAO, enables oral bioavailability, indirect action</li>
            <li>• <strong>Absent 4-OH</strong> (phenylephrine): resists COMT → longer acting, pure α₁</li>
          </ul>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default VasoactiveStructures;
