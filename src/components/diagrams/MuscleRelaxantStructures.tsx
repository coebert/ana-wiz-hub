import { useState } from "react";

type Drug = "suxamethonium" | "rocuronium" | "atracurium" | "sugammadex";

const drugs: { key: Drug; label: string }[] = [
  { key: "suxamethonium", label: "Suxamethonium" },
  { key: "rocuronium", label: "Rocuronium" },
  { key: "atracurium", label: "Atracurium" },
  { key: "sugammadex", label: "Sugammadex" },
];

const info: Record<Drug, { name: string; formula: string; mw: string; features: string[] }> = {
  suxamethonium: {
    name: "Suxamethonium (Succinylcholine)",
    formula: "C₁₄H₃₀N₂O₄", mw: "290.4",
    features: [
      "Two acetylcholine molecules joined end-to-end via succinate linker",
      "Depolarising agent — mimics ACh at the nicotinic receptor → Phase I block",
      "Two quaternary ammonium groups (N⁺) — permanent positive charges",
      "Ester bonds → rapidly hydrolysed by plasma cholinesterase (butyrylcholinesterase)",
      "Ultra-short acting (5-10 min) due to rapid enzymatic breakdown",
      "Dibucaine-resistant cholinesterase variants → prolonged block (1:3200)",
    ],
  },
  rocuronium: {
    name: "Rocuronium",
    formula: "C₃₂H₅₃BrN₂O₄", mw: "609.7",
    features: [
      "Aminosteroid — modified steroid nucleus (androstane skeleton)",
      "Non-depolarising competitive antagonist at nicotinic ACh receptor",
      "Quaternary ammonium group on ring A — positive charge for receptor binding",
      "Allyl group on nitrogen → faster onset than vecuronium (lower potency = higher dose = faster onset)",
      "Hepatic elimination (70%) — avoid in liver failure",
      "Specifically encapsulated by sugammadex (γ-cyclodextrin)",
    ],
  },
  atracurium: {
    name: "Atracurium",
    formula: "C₆₅H₈₂N₂O₁₈S₂", mw: "1243.5",
    features: [
      "Benzylisoquinolinium compound — NOT a steroid",
      "Two quaternary nitrogen atoms bridged by long carbon chain",
      "Unique organ-independent elimination: Hofmann degradation (pH/temp dependent)",
      "Also undergoes ester hydrolysis by non-specific esterases",
      "Laudanosine — Hofmann metabolite, CNS stimulant (rarely clinically significant)",
      "Histamine release at higher doses → bronchospasm, hypotension",
      "Cisatracurium: R-cis,R'-cis isomer — 3× more potent, no histamine release",
    ],
  },
  sugammadex: {
    name: "Sugammadex",
    formula: "C₇₂H₁₀₄Na₈O₄₈S₈", mw: "2178.0",
    features: [
      "Modified γ-cyclodextrin — ring of 8 sugar (glucose) units",
      "Doughnut/truncated cone shape — hydrophobic cavity, hydrophilic exterior",
      "Encapsulates rocuronium/vecuronium in 1:1 ratio (host-guest complex)",
      "Negatively charged side chains on exterior enhance water solubility",
      "Lipophilic cavity captures the steroid nucleus — removes drug from NMJ",
      "Does NOT work on benzylisoquinoliniums (atracurium/cisatracurium)",
      "Dose: 2 mg/kg (moderate block), 4 mg/kg (deep), 16 mg/kg (emergency)",
    ],
  },
};

const SuxamethoniumSVG = () => (
  <g transform="translate(20,25)">
    {/* Left ACh moiety */}
    <text x="40" y="80" textAnchor="middle" className="fill-primary text-[11px] font-bold">(CH₃)₃N⁺</text>
    <line x1="72" y1="76" x2="100" y2="76" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="115" y="80" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₂CH₂</text>
    <line x1="132" y1="76" x2="155" y2="76" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Ester 1 */}
    <text x="165" y="80" textAnchor="middle" className="fill-destructive text-[11px] font-bold">O</text>
    <line x1="165" y1="65" x2="165" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="168" y1="65" x2="168" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="167" y="48" textAnchor="middle" className="fill-destructive text-[10px] font-bold">O</text>
    <line x1="175" y1="76" x2="195" y2="76" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Succinate bridge */}
    <text x="220" y="80" textAnchor="middle" className="fill-foreground text-[10px] font-medium">CH₂CH₂</text>
    <line x1="242" y1="76" x2="260" y2="76" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Ester 2 */}
    <text x="270" y="80" textAnchor="middle" className="fill-destructive text-[11px] font-bold">O</text>
    <line x1="270" y1="65" x2="270" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="273" y1="65" x2="273" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="272" y="48" textAnchor="middle" className="fill-destructive text-[10px] font-bold">O</text>
    <line x1="280" y1="76" x2="300" y2="76" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Right ACh moiety */}
    <text x="320" y="80" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₂CH₂</text>
    <line x1="338" y1="76" x2="360" y2="76" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="395" y="80" textAnchor="middle" className="fill-primary text-[11px] font-bold">N⁺(CH₃)₃</text>
    {/* Bracket annotations */}
    <rect x="25" y="90" width="120" height="18" rx="3" fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x="85" y="103" textAnchor="middle" className="fill-accent text-[8px]">ACh moiety 1</text>
    <rect x="290" y="90" width="120" height="18" rx="3" fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x="350" y="103" textAnchor="middle" className="fill-accent text-[8px]">ACh moiety 2</text>
    <rect x="155" y="90" width="130" height="18" rx="3" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
    <text x="220" y="103" textAnchor="middle" className="fill-primary text-[8px]">Succinate bridge</text>
    {/* Ester hydrolysis annotation */}
    <text x="167" y="38" textAnchor="middle" className="fill-muted-foreground text-[7px]">Plasma ChE</text>
    <text x="272" y="38" textAnchor="middle" className="fill-muted-foreground text-[7px]">Plasma ChE</text>
  </g>
);

const RocuroniumSVG = () => (
  <g transform="translate(50,20)">
    {/* Steroid nucleus — simplified 4-ring system */}
    {/* Ring A (6-membered) */}
    <polygon points="60,80 90,60 120,80 120,120 90,140 60,120" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="90" y="108" textAnchor="middle" className="fill-muted-foreground text-[8px]">A</text>
    {/* Ring B (6-membered) */}
    <polygon points="120,80 150,60 180,80 180,120 150,140 120,120" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="150" y="108" textAnchor="middle" className="fill-muted-foreground text-[8px]">B</text>
    {/* Ring C (6-membered) */}
    <polygon points="180,80 210,60 240,80 240,120 210,140 180,120" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="210" y="108" textAnchor="middle" className="fill-muted-foreground text-[8px]">C</text>
    {/* Ring D (5-membered) */}
    <line x1="240" y1="80" x2="270" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="270" y1="70" x2="285" y2="95" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="285" y1="95" x2="260" y2="115" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="260" y1="115" x2="240" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="262" y="95" textAnchor="middle" className="fill-muted-foreground text-[8px]">D</text>
    {/* Quaternary N on ring A */}
    <line x1="60" y1="80" x2="35" y2="65" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx="28" cy="60" r="12" fill="hsl(var(--background))" />
    <text x="28" y="65" textAnchor="middle" className="fill-primary text-[11px] font-bold">N⁺</text>
    {/* Allyl on N */}
    <line x1="16" y1="55" x2="0" y2="42" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="-8" y="38" textAnchor="middle" className="fill-muted-foreground text-[8px]">allyl</text>
    {/* Acetyloxy on ring D */}
    <line x1="285" y1="95" x2="310" y2="95" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="328" y="100" textAnchor="middle" className="fill-destructive text-[10px] font-bold">OAc</text>
    {/* OH groups */}
    <line x1="90" y1="140" x2="90" y2="160" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="90" y="172" textAnchor="middle" className="fill-destructive text-[10px] font-bold">OH</text>
    {/* Label */}
    <text x="160" y="195" textAnchor="middle" className="fill-primary text-[10px] font-bold">Aminosteroid nucleus (androstane)</text>
    <text x="160" y="210" textAnchor="middle" className="fill-accent text-[8px]">N⁺ on ring A binds nicotinic receptor</text>
  </g>
);

const AtracuriumSVG = () => (
  <g transform="translate(15,25)">
    {/* Left isoquinoline */}
    <polygon points="40,70 65,55 90,70 90,100 65,115 40,100" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="47,74 65,64 83,74 83,96 65,106 47,96" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="90" y1="70" x2="120" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="120" y1="55" x2="120" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="120" y1="85" x2="90" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* N+ in isoquinoline */}
    <circle cx="120" cy="70" r="10" fill="hsl(var(--background))" />
    <text x="120" y="75" textAnchor="middle" className="fill-primary text-[10px] font-bold">N⁺</text>
    {/* Bridge chain */}
    <line x1="130" y1="70" x2="150" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="180" y="74" textAnchor="middle" className="fill-muted-foreground text-[9px]">—(CH₂)₅—</text>
    {/* Ester in chain */}
    <line x1="210" y1="70" x2="230" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="245" y="74" textAnchor="middle" className="fill-destructive text-[10px] font-bold">O</text>
    <line x1="245" y1="60" x2="245" y2="52" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="248" y1="60" x2="248" y2="52" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="247" y="46" textAnchor="middle" className="fill-destructive text-[9px] font-bold">O</text>
    <line x1="255" y1="70" x2="275" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="298" y="74" textAnchor="middle" className="fill-muted-foreground text-[9px]">—(CH₂)₅—</text>
    <line x1="320" y1="70" x2="340" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Right isoquinoline */}
    <circle cx="350" cy="70" r="10" fill="hsl(var(--background))" />
    <text x="350" y="75" textAnchor="middle" className="fill-primary text-[10px] font-bold">N⁺</text>
    <line x1="360" y1="70" x2="380" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="380" y1="55" x2="380" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="380" y1="85" x2="350" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="380,70 405,55 430,70 430,100 405,115 380,100" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="387,74 405,64 423,74 423,96 405,106 387,96" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Methoxy groups */}
    <text x="40" y="58" textAnchor="middle" className="fill-muted-foreground text-[7px]">OMe</text>
    <text x="430" y="58" textAnchor="middle" className="fill-muted-foreground text-[7px]">OMe</text>
    {/* Annotations */}
    <text x="65" y="135" textAnchor="middle" className="fill-accent text-[8px]">Isoquinolinium</text>
    <text x="405" y="135" textAnchor="middle" className="fill-accent text-[8px]">Isoquinolinium</text>
    <text x="235" y="110" textAnchor="middle" className="fill-primary text-[9px] font-bold">Benzylisoquinolinium</text>
    <text x="235" y="125" textAnchor="middle" className="fill-accent text-[8px]">Hofmann degradation at ester bond (pH/temp)</text>
  </g>
);

const SugammadexSVG = () => (
  <g transform="translate(40,15)">
    {/* Cyclodextrin ring — simplified as octagon */}
    <polygon
      points="200,40 260,60 280,120 260,180 200,200 140,180 120,120 140,60"
      fill="hsl(var(--primary)/0.05)"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
    />
    {/* Inner cavity */}
    <polygon
      points="200,80 230,90 240,120 230,150 200,160 170,150 160,120 170,90"
      fill="hsl(var(--secondary)/0.3)"
      stroke="hsl(var(--primary)/0.4)"
      strokeWidth="1.5"
      strokeDasharray="4 2"
    />
    {/* Sugar units labelled */}
    {[
      { x: 200, y: 42 }, { x: 258, y: 62 }, { x: 278, y: 118 }, { x: 258, y: 178 },
      { x: 200, y: 198 }, { x: 142, y: 178 }, { x: 122, y: 118 }, { x: 142, y: 62 },
    ].map((pos, i) => (
      <g key={i}>
        <circle cx={pos.x} cy={pos.y} r="12" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x={pos.x} y={pos.y + 4} textAnchor="middle" className="fill-primary text-[8px] font-bold">Glc</text>
      </g>
    ))}
    {/* Thioether side chains */}
    <line x1="200" y1="28" x2="200" y2="12" stroke="hsl(var(--accent))" strokeWidth="1.5" />
    <text x="200" y="8" textAnchor="middle" className="fill-accent text-[7px]">S⁻</text>
    <line x1="270" y1="55" x2="285" y2="42" stroke="hsl(var(--accent))" strokeWidth="1.5" />
    <text x="293" y="38" textAnchor="middle" className="fill-accent text-[7px]">S⁻</text>
    {/* Rocuronium inside cavity */}
    <text x="200" y="118" textAnchor="middle" className="fill-foreground text-[9px] font-bold">ROC</text>
    <text x="200" y="132" textAnchor="middle" className="fill-muted-foreground text-[7px]">steroid</text>
    {/* Labels */}
    <text x="200" y="230" textAnchor="middle" className="fill-primary text-[10px] font-bold">γ-cyclodextrin (8 glucose units)</text>
    <text x="200" y="245" textAnchor="middle" className="fill-accent text-[8px]">Hydrophobic cavity encapsulates aminosteroid</text>
    <text x="200" y="258" textAnchor="middle" className="fill-muted-foreground text-[7px]">Thioether side chains (S⁻) enhance water solubility</text>
  </g>
);

const svgComponents: Record<Drug, () => JSX.Element> = {
  suxamethonium: SuxamethoniumSVG,
  rocuronium: RocuroniumSVG,
  atracurium: AtracuriumSVG,
  sugammadex: SugammadexSVG,
};

const MuscleRelaxantStructures = () => {
  const [selected, setSelected] = useState<Drug>("suxamethonium");
  const SVGComponent = svgComponents[selected];
  const d = info[selected];

  return (
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
        <svg viewBox="0 0 460 270" className="w-full h-auto">
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
  );
};

export default MuscleRelaxantStructures;