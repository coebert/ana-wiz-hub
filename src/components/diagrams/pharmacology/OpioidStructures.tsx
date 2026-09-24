import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Drug = "morphine" | "fentanyl" | "remifentanil" | "alfentanil" | "codeine";

const drugs: { key: Drug; label: string }[] = [
  { key: "morphine", label: "Morphine" },
  { key: "fentanyl", label: "Fentanyl" },
  { key: "remifentanil", label: "Remifentanil" },
  { key: "alfentanil", label: "Alfentanil" },
  { key: "codeine", label: "Codeine" },
];

const info: Record<Drug, { name: string; formula: string; mw: string; features: string[] }> = {
  morphine: {
    name: "Morphine",
    formula: "C₁₇H₁₉NO₃", mw: "285.3",
    features: [
      "Pentacyclic phenanthrene alkaloid — the reference opioid",
      "Ring A: phenol ring with free 3-OH group (distinguishes from codeine)",
      "Ring C: cyclohexene with 6-OH group (site of glucuronidation → M6G active, M3G inactive)",
      "Piperidine ring (Ring D) contains the tertiary nitrogen — essential for receptor binding",
      "Rigid T-shaped 3D structure limits mu receptor selectivity",
      "Hydrophilic (low lipid solubility, logP 0.89) → slow BBB penetration → slow onset",
    ],
  },
  fentanyl: {
    name: "Fentanyl",
    formula: "C₂₂H₂₈N₂O", mw: "336.5",
    features: [
      "4-anilidopiperidine — synthetic opioid, structurally unrelated to morphine",
      "Piperidine ring with phenethyl group on nitrogen → mu receptor affinity",
      "Anilide linkage (–NH–CO–) to phenyl ring",
      "Highly lipophilic (logP 4.05) → rapid BBB penetration → fast onset (1-2 min IV)",
      "100× morphine potency due to enhanced receptor binding",
      "No active metabolites — hepatic N-dealkylation to norfentanyl (inactive)",
    ],
  },
  remifentanil: {
    name: "Remifentanil",
    formula: "C₂₀H₂₈N₂O₅", mw: "376.5",
    features: [
      "4-anilidopiperidine with methyl ester group on the piperidine ring",
      "Ester linkage → rapid metabolism by non-specific tissue esterases",
      "This ester group is THE key structural difference from fentanyl",
      "Context-sensitive half-time ~3-4 min regardless of infusion duration",
      "Ester hydrolysis → carboxylic acid metabolite (1/300th potency)",
      "Cannot be given by bolus easily — profound bradycardia risk",
    ],
  },
  alfentanil: {
    name: "Alfentanil",
    formula: "C₂₁H₃₂N₆O₃", mw: "416.5",
    features: [
      "4-anilidopiperidine with tetrazole ring replacing part of the structure",
      "Tetrazole ring → lower pKa (6.5 vs 8.4 for fentanyl)",
      "At pH 7.4: 90% un-ionised (vs 9% for fentanyl) → fastest onset of the fentanyl family",
      "Lower lipid solubility than fentanyl but faster onset due to ionisation",
      "Smaller Vd (0.6 L/kg) — shorter duration despite lower clearance",
      "CYP3A4 metabolism — susceptible to drug interactions (erythromycin, ketoconazole)",
    ],
  },
  codeine: {
    name: "Codeine (methylmorphine)",
    formula: "C₁₈H₂₁NO₃", mw: "299.4",
    features: [
      "3-methoxy morphine — methyl group replaces 3-OH of morphine",
      "Prodrug: CYP2D6 O-demethylation converts ~10% to morphine (active form)",
      "Genetic polymorphism in CYP2D6 → poor metabolisers get no analgesia",
      "Ultra-rapid metabolisers → excessive morphine formation → toxicity risk",
      "6-OH group still present → can form codeine-6-glucuronide (some activity)",
      "10× less potent than morphine when taken orally",
    ],
  },
};

const MorphineSVG = () => (
  <g transform="translate(40,25)">
    {/* Simplified pentacyclic structure */}
    {/* Ring A - phenol */}
    <polygon points="60,60 90,40 120,60 120,100 90,120 60,100" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="68,66 90,52 112,66 112,94 90,108 68,94" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* 3-OH */}
    <line x1="60" y1="60" x2="30" y2="45" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="15" y="42" textAnchor="middle" className="fill-destructive text-[12px] font-bold">OH</text>
    <text x="15" y="55" textAnchor="middle" className="fill-accent text-[7px]">3-OH</text>
    {/* Ring B */}
    <line x1="120" y1="60" x2="155" y2="45" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="155" y1="45" x2="185" y2="65" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="185" y1="65" x2="185" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="185" y1="100" x2="155" y2="115" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="155" y1="115" x2="120" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Ring C - cyclohexene */}
    <line x1="185" y1="65" x2="220" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="220" y1="50" x2="250" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="250" y1="70" x2="250" y2="105" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="250" y1="105" x2="220" y2="120" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="220" y1="120" x2="185" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* 6-OH */}
    <line x1="250" y1="105" x2="280" y2="118" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="298" y="122" textAnchor="middle" className="fill-destructive text-[12px] font-bold">OH</text>
    <text x="298" y="135" textAnchor="middle" className="fill-accent text-[7px]">6-OH</text>
    {/* Ring D - piperidine with N */}
    <line x1="155" y1="115" x2="155" y2="150" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="155" y1="150" x2="185" y2="165" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="220" y1="120" x2="220" y2="155" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="220" y1="155" x2="190" y2="165" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx="188" cy="165" r="10" fill="hsl(var(--background))" />
    <text x="188" y="170" textAnchor="middle" className="fill-primary text-[12px] font-bold">N</text>
    {/* N-CH3 */}
    <line x1="188" y1="175" x2="188" y2="195" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="188" y="208" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
    {/* Ether bridge - Ring E */}
    <line x1="120" y1="60" x2="140" y2="35" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    <text x="148" y="30" textAnchor="middle" className="fill-destructive text-[10px] font-bold">O</text>
    <line x1="155" y1="32" x2="170" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    {/* Ring labels */}
    <text x="90" y="85" textAnchor="middle" className="fill-muted-foreground text-[8px]">A</text>
    <text x="152" y="85" textAnchor="middle" className="fill-muted-foreground text-[8px]">B</text>
    <text x="218" y="90" textAnchor="middle" className="fill-muted-foreground text-[8px]">C</text>
    <text x="188" y="152" textAnchor="middle" className="fill-muted-foreground text-[8px]">D</text>
  </g>
);

const FentanylSVG = () => (
  <g transform="translate(30,25)">
    {/* Piperidine ring */}
    <polygon points="180,70 210,55 240,70 240,110 210,125 180,110" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* N in piperidine */}
    <circle cx="210" cy="55" r="10" fill="hsl(var(--background))" />
    <text x="210" y="60" textAnchor="middle" className="fill-primary text-[12px] font-bold">N</text>
    {/* Phenethyl on N */}
    <line x1="210" y1="45" x2="210" y2="25" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="210" y1="25" x2="180" y2="10" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="180" y="8" textAnchor="middle" className="fill-muted-foreground text-[8px]">CH₂CH₂</text>
    {/* Phenyl on phenethyl */}
    <polygon points="140,20 120,5 90,5 70,20 90,35 120,35" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="134,18 118,10 96,10 78,18 96,30 118,30" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Anilide linkage from C4 of piperidine */}
    <line x1="240" y1="90" x2="270" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx="278" cy="90" r="10" fill="hsl(var(--background))" />
    <text x="278" y="95" textAnchor="middle" className="fill-primary text-[11px] font-bold">NH</text>
    {/* C=O */}
    <line x1="288" y1="90" x2="310" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="310" y1="90" x2="310" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="313" y1="90" x2="313" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="312" y="62" textAnchor="middle" className="fill-destructive text-[12px] font-bold">O</text>
    {/* Aniline phenyl */}
    <line x1="310" y1="90" x2="340" y2="105" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="340,105 370,90 400,105 400,140 370,155 340,140" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="348,110 370,99 392,110 392,135 370,146 348,135" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Labels */}
    <text x="210" y="145" textAnchor="middle" className="fill-muted-foreground text-[8px]">Piperidine</text>
    <text x="310" y="110" textAnchor="middle" className="fill-accent text-[7px]">Anilide</text>
    <text x="105" y="50" textAnchor="middle" className="fill-muted-foreground text-[8px]">Phenethyl</text>
  </g>
);

const RemifentanilSVG = () => (
  <g transform="translate(20,25)">
    {/* Piperidine ring */}
    <polygon points="170,70 200,55 230,70 230,110 200,125 170,110" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx="200" cy="55" r="10" fill="hsl(var(--background))" />
    <text x="200" y="60" textAnchor="middle" className="fill-primary text-[12px] font-bold">N</text>
    {/* Phenethyl on N (same as fentanyl) */}
    <line x1="200" y1="45" x2="200" y2="28" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="200" y1="28" x2="170" y2="12" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="170" y="10" textAnchor="middle" className="fill-muted-foreground text-[8px]">CH₂CH₂</text>
    <polygon points="140,22 120,8 95,8 75,22 95,36 120,36" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    <polygon points="134,20 118,12 100,12 84,20 100,32 118,32" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    {/* Anilide (same as fentanyl) */}
    <line x1="230" y1="90" x2="258" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx="266" cy="90" r="10" fill="hsl(var(--background))" />
    <text x="266" y="95" textAnchor="middle" className="fill-primary text-[10px] font-bold">NH</text>
    <line x1="276" y1="90" x2="296" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="296" y1="90" x2="296" y2="72" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="299" y1="90" x2="299" y2="72" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="298" y="65" textAnchor="middle" className="fill-destructive text-[11px] font-bold">O</text>
    <line x1="296" y1="90" x2="320" y2="105" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="320,105 345,92 370,105 370,135 345,148 320,135" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    <polygon points="327,110 345,100 363,110 363,130 345,140 327,130" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    {/* KEY DIFFERENCE: Methyl ester on piperidine ring */}
    <line x1="200" y1="125" x2="200" y2="150" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="200" y1="150" x2="175" y2="165" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="200" y1="150" x2="200" y2="172" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="203" y1="150" x2="203" y2="172" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="202" y="185" textAnchor="middle" className="fill-destructive text-[11px] font-bold">O</text>
    <text x="160" y="170" textAnchor="middle" className="fill-destructive text-[11px] font-bold">O</text>
    <line x1="160" y1="165" x2="140" y2="175" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="125" y="180" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
    {/* Highlight box around ester */}
    <rect x="118" y="138" width="100" height="55" rx="6" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="4 2" />
    <text x="168" y="205" textAnchor="middle" className="fill-accent text-[8px] font-bold">ESTER — tissue esterase</text>
    <text x="168" y="216" textAnchor="middle" className="fill-accent text-[7px]">metabolism (CSHT ~4 min)</text>
  </g>
);

const AlfentanilSVG = () => (
  <g transform="translate(30,25)">
    {/* Piperidine ring */}
    <polygon points="180,70 210,55 240,70 240,110 210,125 180,110" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx="210" cy="55" r="10" fill="hsl(var(--background))" />
    <text x="210" y="60" textAnchor="middle" className="fill-primary text-[12px] font-bold">N</text>
    {/* Phenethyl on N */}
    <line x1="210" y1="45" x2="210" y2="28" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="210" y1="28" x2="180" y2="12" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="180" y="10" textAnchor="middle" className="fill-muted-foreground text-[8px]">CH₂CH₂</text>
    <polygon points="140,22 120,8 95,8 75,22 95,36 120,36" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    <polygon points="134,20 118,12 100,12 84,20 100,32 118,32" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    {/* Anilide */}
    <line x1="240" y1="90" x2="268" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx="276" cy="90" r="10" fill="hsl(var(--background))" />
    <text x="276" y="95" textAnchor="middle" className="fill-primary text-[10px] font-bold">NH</text>
    <line x1="286" y1="90" x2="306" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="306" y1="90" x2="306" y2="72" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="309" y1="90" x2="309" y2="72" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="308" y="65" textAnchor="middle" className="fill-destructive text-[11px] font-bold">O</text>
    <line x1="306" y1="90" x2="330" y2="105" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="330,105 355,92 380,105 380,135 355,148 330,135" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    <polygon points="337,110 355,100 373,110 373,130 355,140 337,130" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    {/* KEY DIFFERENCE: Tetrazole ring */}
    <line x1="180" y1="110" x2="155" y2="130" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* 5-membered tetrazole */}
    <line x1="155" y1="130" x2="165" y2="160" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="165" y1="160" x2="145" y2="175" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="145" y1="175" x2="125" y2="160" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="125" y1="160" x2="135" y2="135" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="135" y1="135" x2="155" y2="130" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* N atoms in tetrazole */}
    <circle cx="165" cy="160" r="8" fill="hsl(var(--background))" />
    <text x="165" y="164" textAnchor="middle" className="fill-primary text-[9px] font-bold">N</text>
    <circle cx="145" cy="175" r="8" fill="hsl(var(--background))" />
    <text x="145" y="179" textAnchor="middle" className="fill-primary text-[9px] font-bold">N</text>
    <circle cx="125" cy="160" r="8" fill="hsl(var(--background))" />
    <text x="125" y="164" textAnchor="middle" className="fill-primary text-[9px] font-bold">N</text>
    <circle cx="135" cy="135" r="8" fill="hsl(var(--background))" />
    <text x="135" y="139" textAnchor="middle" className="fill-primary text-[9px] font-bold">N</text>
    {/* Highlight */}
    <rect x="112" y="122" width="65" height="68" rx="6" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="4 2" />
    <text x="145" y="205" textAnchor="middle" className="fill-accent text-[8px] font-bold">TETRAZOLE ring</text>
    <text x="145" y="216" textAnchor="middle" className="fill-accent text-[7px]">pKa 6.5 → 90% un-ionised → fast onset</text>
  </g>
);

const CodeineSVG = () => (
  <g transform="translate(40,25)">
    {/* Same pentacyclic structure as morphine */}
    <polygon points="60,60 90,40 120,60 120,100 90,120 60,100" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="68,66 90,52 112,66 112,94 90,108 68,94" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* 3-OCH3 instead of OH — KEY DIFFERENCE */}
    <line x1="60" y1="60" x2="30" y2="45" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="12" y="42" textAnchor="middle" className="fill-destructive text-[11px] font-bold">OCH₃</text>
    <rect x="-6" y="30" width="38" height="16" rx="3" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="3 2" />
    <text x="12" y="58" textAnchor="middle" className="fill-accent text-[7px] font-bold">3-methoxy</text>
    {/* Ring B */}
    <line x1="120" y1="60" x2="155" y2="45" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="155" y1="45" x2="185" y2="65" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="185" y1="65" x2="185" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="185" y1="100" x2="155" y2="115" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="155" y1="115" x2="120" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Ring C */}
    <line x1="185" y1="65" x2="220" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="220" y1="50" x2="250" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="250" y1="70" x2="250" y2="105" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="250" y1="105" x2="220" y2="120" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="220" y1="120" x2="185" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* 6-OH */}
    <line x1="250" y1="105" x2="280" y2="118" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="298" y="122" textAnchor="middle" className="fill-destructive text-[12px] font-bold">OH</text>
    {/* Ring D - piperidine with N */}
    <line x1="155" y1="115" x2="155" y2="150" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="155" y1="150" x2="185" y2="165" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="220" y1="120" x2="220" y2="155" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="220" y1="155" x2="190" y2="165" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx="188" cy="165" r="10" fill="hsl(var(--background))" />
    <text x="188" y="170" textAnchor="middle" className="fill-primary text-[12px] font-bold">N</text>
    <line x1="188" y1="175" x2="188" y2="195" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="188" y="208" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
    {/* Ether bridge */}
    <line x1="120" y1="60" x2="140" y2="35" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    <text x="148" y="30" textAnchor="middle" className="fill-destructive text-[10px] font-bold">O</text>
    <line x1="155" y1="32" x2="170" y2="40" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    {/* Arrow showing CYP2D6 conversion */}
    <text x="50" y="80" textAnchor="middle" className="fill-accent text-[7px]">CYP2D6</text>
    <text x="50" y="90" textAnchor="middle" className="fill-accent text-[7px]">O-demethylation</text>
    <text x="50" y="100" textAnchor="middle" className="fill-accent text-[7px]">→ morphine</text>
  </g>
);

const svgComponents: Record<Drug, () => JSX.Element> = {
  morphine: MorphineSVG,
  fentanyl: FentanylSVG,
  remifentanil: RemifentanilSVG,
  alfentanil: AlfentanilSVG,
  codeine: CodeineSVG,
};

const OpioidStructures = () => {
  const [selected, setSelected] = useState<Drug>("morphine");
  const SVGComponent = svgComponents[selected];
  const d = info[selected];

  return (
    <DiagramFigure
      id="opioid-structures"
      title="Opioid structures"
      description="Opioid structures: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
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
          <svg viewBox="0 0 460 240" className="w-full h-auto">
            <text x="230" y="16" textAnchor="middle" className="fill-foreground text-[13px] font-bold">{d.name}</text>
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
      </div>
    </DiagramFigure>
  );
};

export default OpioidStructures;