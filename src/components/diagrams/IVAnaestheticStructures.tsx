import { useState } from "react";

type Drug = "propofol" | "thiopentone" | "ketamine" | "etomidate";

const drugs: { key: Drug; label: string }[] = [
  { key: "propofol", label: "Propofol" },
  { key: "thiopentone", label: "Thiopentone" },
  { key: "ketamine", label: "Ketamine" },
  { key: "etomidate", label: "Etomidate" },
];

const info: Record<Drug, { name: string; formula: string; mw: string; features: string[] }> = {
  propofol: {
    name: "Propofol (2,6-diisopropylphenol)",
    formula: "C₁₂H₁₈O", mw: "178.3",
    features: [
      "Simple phenol derivative — hydroxyl group on benzene ring",
      "Two isopropyl groups at 2,6 positions provide steric bulk → lipophilicity",
      "Highly lipid-soluble (oil/water partition coefficient ~6000)",
      "Formulated as 1% lipid emulsion (intralipid) due to water insolubility",
      "Phenol group → weak acid (pKa 11) — essentially un-ionised at physiological pH",
    ],
  },
  thiopentone: {
    name: "Thiopentone (thiopental)",
    formula: "C₁₁H₁₇N₂NaO₂S", mw: "264.3",
    features: [
      "Thiobarbiturate — sulphur replaces oxygen at C2 of barbiturate ring",
      "C2 sulphur substitution → increased lipid solubility → rapid onset",
      "Barbituric acid ring: pyrimidine-2,4,6-trione core structure",
      "Ethyl group and 1-methylbutyl group at C5 position",
      "Prepared as sodium salt (pH 10.5) — highly alkaline, causes tissue necrosis if extravasated",
      "Oxybarbiturate equivalent (pentobarbitone) has oxygen at C2 — slower onset, longer acting",
    ],
  },
  ketamine: {
    name: "Ketamine",
    formula: "C₁₃H₁₆ClNO", mw: "237.7",
    features: [
      "Phencyclidine (PCP) derivative — arylcyclohexylamine",
      "Cyclohexanone ring with ketone group (hence 'ket-amine')",
      "Phenyl ring with chlorine substituent at para position",
      "Methylamino group — gives the 'amine' in ketamine",
      "Chiral centre → S(+) and R(−) enantiomers. S(+) ketamine is 3-4× more potent",
      "Water-soluble (prepared as slightly acidic solution, pH 3.5-5.5)",
    ],
  },
  etomidate: {
    name: "Etomidate",
    formula: "C₁₄H₁₆N₂O₂", mw: "244.3",
    features: [
      "Carboxylated imidazole derivative",
      "Imidazole ring — responsible for adrenal suppression (inhibits 11β-hydroxylase)",
      "Ethyl ester group — undergoes rapid ester hydrolysis (short duration)",
      "Phenyl ring provides lipophilicity",
      "Chiral centre — R(+) enantiomer is the active form (5× more potent)",
      "Formulated in propylene glycol (pain on injection) or lipid emulsion",
    ],
  },
};

/* SVG molecular structures */
const PropofolSVG = () => (
  <g>
    {/* Benzene ring */}
    <polygon points="200,100 240,77 280,100 280,146 240,169 200,146" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="210,110 240,92 270,110 270,140 240,158 210,140" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* OH group at position 1 (top) */}
    <line x1="240" y1="77" x2="240" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="240" y="42" textAnchor="middle" className="fill-destructive text-[14px] font-bold">OH</text>
    {/* Isopropyl at position 2 (top-left) */}
    <line x1="200" y1="100" x2="170" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="170" y1="80" x2="140" y2="95" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="170" y1="80" x2="140" y2="60" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="170" y="75" textAnchor="middle" className="fill-foreground text-[10px]">CH</text>
    <text x="128" y="98" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
    <text x="128" y="58" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
    {/* Isopropyl at position 6 (top-right) */}
    <line x1="280" y1="100" x2="310" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="310" y1="80" x2="340" y2="95" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="310" y1="80" x2="340" y2="60" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="310" y="75" textAnchor="middle" className="fill-foreground text-[10px]">CH</text>
    <text x="352" y="98" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
    <text x="352" y="58" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
    {/* H atoms on ring */}
    <line x1="200" y1="146" x2="180" y2="165" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    <text x="175" y="178" textAnchor="middle" className="fill-muted-foreground text-[10px]">H</text>
    <line x1="240" y1="169" x2="240" y2="192" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    <text x="240" y="204" textAnchor="middle" className="fill-muted-foreground text-[10px]">H</text>
    <line x1="280" y1="146" x2="300" y2="165" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
    <text x="305" y="178" textAnchor="middle" className="fill-muted-foreground text-[10px]">H</text>
    {/* Label */}
    <text x="240" y="230" textAnchor="middle" className="fill-primary text-[11px] font-bold">2,6-diisopropylphenol</text>
  </g>
);

const ThiopentoneSVG = () => (
  <g>
    {/* Barbiturate ring - 6-membered ring with N at 1,3 and C=O at 4,6, C=S at 2 */}
    {/* Hexagonal ring */}
    <line x1="200" y1="80" x2="250" y2="60" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="250" y1="60" x2="300" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="300" y1="80" x2="300" y2="130" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="300" y1="130" x2="250" y2="150" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="250" y1="150" x2="200" y2="130" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="200" y1="130" x2="200" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* N atoms at positions 1 and 3 */}
    <circle cx="200" cy="80" r="12" fill="hsl(var(--background))" />
    <text x="200" y="85" textAnchor="middle" className="fill-primary text-[13px] font-bold">N</text>
    <circle cx="300" cy="80" r="12" fill="hsl(var(--background))" />
    <text x="300" y="85" textAnchor="middle" className="fill-primary text-[13px] font-bold">N</text>
    {/* NH groups */}
    <text x="180" y="66" textAnchor="middle" className="fill-muted-foreground text-[10px]">H</text>
    <text x="320" y="66" textAnchor="middle" className="fill-muted-foreground text-[10px]">H</text>
    {/* C=S at position 2 (top) */}
    <line x1="250" y1="60" x2="250" y2="32" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="253" y1="60" x2="253" y2="32" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="250" y="24" textAnchor="middle" className="fill-accent text-[14px] font-bold">S</text>
    {/* C=O at positions 4 and 6 */}
    <line x1="300" y1="130" x2="340" y2="145" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="300" y1="133" x2="340" y2="148" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="355" y="152" textAnchor="middle" className="fill-destructive text-[13px] font-bold">O</text>
    <line x1="200" y1="130" x2="160" y2="145" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="200" y1="133" x2="160" y2="148" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="145" y="152" textAnchor="middle" className="fill-destructive text-[13px] font-bold">O</text>
    {/* C5 substituents */}
    <line x1="250" y1="150" x2="230" y2="180" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="215" y="193" textAnchor="middle" className="fill-muted-foreground text-[9px]">C₂H₅</text>
    <line x1="250" y1="150" x2="270" y2="180" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="270" y1="180" x2="290" y2="200" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="290" y1="200" x2="310" y2="220" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="285" y="175" textAnchor="middle" className="fill-muted-foreground text-[8px]">CH</text>
    <text x="295" y="210" textAnchor="middle" className="fill-muted-foreground text-[8px]">CH₂CH₃</text>
    <text x="320" y="228" textAnchor="middle" className="fill-muted-foreground text-[8px]">CH₃</text>
    {/* Annotation */}
    <text x="250" y="255" textAnchor="middle" className="fill-primary text-[11px] font-bold">Thiobarbiturate ring</text>
    <text x="250" y="270" textAnchor="middle" className="fill-accent text-[9px]">S at C2 → lipophilic → rapid onset</text>
  </g>
);

const KetamineSVG = () => (
  <g>
    {/* Cyclohexanone ring */}
    <polygon points="180,120 210,95 250,95 280,120 260,150 200,150" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Ketone C=O */}
    <line x1="280" y1="120" x2="315" y2="105" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="280" y1="117" x2="315" y2="102" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="330" y="108" textAnchor="middle" className="fill-destructive text-[13px] font-bold">O</text>
    {/* Phenyl ring attached to cyclohexanone */}
    <line x1="180" y1="120" x2="150" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="150,100 120,75 80,75 60,100 80,125 120,125" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="140,95 118,82 88,82 70,95 88,118 118,118" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Cl on phenyl */}
    <line x1="60" y1="100" x2="30" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="18" y="105" textAnchor="middle" className="fill-accent text-[13px] font-bold">Cl</text>
    {/* NH-CH3 on cyclohexanone C2 */}
    <line x1="210" y1="95" x2="210" y2="60" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx="210" cy="52" r="10" fill="hsl(var(--background))" />
    <text x="210" y="57" textAnchor="middle" className="fill-primary text-[12px] font-bold">NH</text>
    <line x1="210" y1="42" x2="210" y2="25" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="210" y="18" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
    {/* Chiral centre marker */}
    <text x="210" y="92" textAnchor="middle" className="fill-accent text-[8px] font-bold">*</text>
    {/* Labels */}
    <text x="200" y="185" textAnchor="middle" className="fill-primary text-[11px] font-bold">Arylcyclohexylamine</text>
    <text x="200" y="200" textAnchor="middle" className="fill-accent text-[9px]">* = chiral centre (S+ enantiomer more potent)</text>
  </g>
);

const EtomidateSVG = () => (
  <g>
    {/* Imidazole ring (5-membered) */}
    <line x1="220" y1="80" x2="250" y2="60" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="250" y1="60" x2="280" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="253" y1="62" x2="278" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="280" y1="80" x2="270" y2="115" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="270" y1="115" x2="230" y2="115" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="232" y1="113" x2="268" y2="113" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="230" y1="115" x2="220" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* N atoms in imidazole */}
    <circle cx="220" cy="80" r="10" fill="hsl(var(--background))" />
    <text x="220" y="85" textAnchor="middle" className="fill-primary text-[12px] font-bold">N</text>
    <circle cx="280" cy="80" r="10" fill="hsl(var(--background))" />
    <text x="280" y="85" textAnchor="middle" className="fill-primary text-[12px] font-bold">N</text>
    {/* Ethyl on N1 */}
    <line x1="220" y1="80" x2="190" y2="65" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="172" y="63" textAnchor="middle" className="fill-muted-foreground text-[10px]">C₂H₅</text>
    {/* Ester group */}
    <line x1="270" y1="115" x2="290" y2="145" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="290" y1="145" x2="325" y2="145" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="290" y1="145" x2="275" y2="172" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="290" y1="148" x2="275" y2="175" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="340" y="150" textAnchor="middle" className="fill-destructive text-[12px] font-bold">O</text>
    <text x="265" y="185" textAnchor="middle" className="fill-destructive text-[12px] font-bold">O</text>
    <line x1="325" y1="145" x2="350" y2="160" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="365" y="165" textAnchor="middle" className="fill-muted-foreground text-[10px]">C₂H₅</text>
    {/* Phenyl ring */}
    <line x1="230" y1="115" x2="210" y2="148" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Chiral centre */}
    <text x="230" y="128" textAnchor="middle" className="fill-accent text-[8px] font-bold">*</text>
    <line x1="210" y1="148" x2="210" y2="150" stroke="hsl(var(--foreground))" strokeWidth="0.5" />
    <polygon points="210,148 180,128 150,148 150,188 180,208 210,188" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="204,152 184,136 158,152 158,184 184,200 204,184" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Labels */}
    <text x="240" y="235" textAnchor="middle" className="fill-primary text-[11px] font-bold">Carboxylated imidazole</text>
    <text x="240" y="250" textAnchor="middle" className="fill-accent text-[9px]">Imidazole ring inhibits 11β-hydroxylase</text>
  </g>
);

const svgComponents: Record<Drug, () => JSX.Element> = {
  propofol: PropofolSVG,
  thiopentone: ThiopentoneSVG,
  ketamine: KetamineSVG,
  etomidate: EtomidateSVG,
};

const IVAnaestheticStructures = () => {
  const [selected, setSelected] = useState<Drug>("propofol");
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
        <svg viewBox="0 0 480 280" className="w-full h-auto">
          <text x="240" y="18" textAnchor="middle" className="fill-foreground text-[14px] font-bold">{d.name}</text>
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

export default IVAnaestheticStructures;