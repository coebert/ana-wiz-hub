import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Drug = "lidocaine" | "bupivacaine" | "ropivacaine" | "prilocaine" | "cocaine" | "procaine";

const drugs: { key: Drug; label: string }[] = [
  { key: "lidocaine", label: "Lidocaine" },
  { key: "bupivacaine", label: "Bupivacaine" },
  { key: "ropivacaine", label: "Ropivacaine" },
  { key: "prilocaine", label: "Prilocaine" },
  { key: "cocaine", label: "Cocaine" },
  { key: "procaine", label: "Procaine" },
];

const info: Record<Drug, { name: string; formula: string; mw: string; linkage: string; pKa: string; features: string[] }> = {
  lidocaine: {
    name: "Lidocaine (Lignocaine)",
    formula: "C₁₄H₂₂N₂O", mw: "234.3", linkage: "AMIDE", pKa: "7.9",
    features: [
      "Amide local anaesthetic — prototype agent",
      "2,6-dimethyl aniline ring → steric protection of amide bond → slower metabolism",
      "Amide linkage (–NH–CO–) — metabolised by hepatic amidases (CYP3A4)",
      "Diethylamino tertiary amine group — site of protonation (pKa 7.9)",
      "At pH 7.4: ~25% un-ionised (crosses membrane) vs 75% ionised (blocks channel)",
      "Intermediate duration. Also class Ib antiarrhythmic (Na⁺ channel blockade)",
    ],
  },
  bupivacaine: {
    name: "Bupivacaine",
    formula: "C₁₈H₂₈N₂O", mw: "288.4", linkage: "AMIDE", pKa: "8.1",
    features: [
      "Amide LA — 2,6-dimethyl aniline ring (same as lidocaine)",
      "Piperidine ring replaces diethylamine → increased lipid solubility → higher potency",
      "Butyl group on piperidine nitrogen → long chain → high protein binding (95%)",
      "High lipid solubility → long duration but also → cardiotoxicity risk",
      "Chiral centre: R(+) enantiomer has greater cardiotoxicity than S(−)",
      "Levobupivacaine = S(−) enantiomer only — less cardiotoxic, similar efficacy",
    ],
  },
  ropivacaine: {
    name: "Ropivacaine",
    formula: "C₁₇H₂₆N₂O", mw: "274.4", linkage: "AMIDE", pKa: "8.1",
    features: [
      "Amide LA — structurally similar to bupivacaine",
      "Propyl group on piperidine N (vs butyl in bupivacaine) → less lipophilic",
      "Pure S(−) enantiomer — less cardiotoxic than racemic bupivacaine",
      "Lower lipid solubility → differential block (more motor-sparing at low concentrations)",
      "Slightly less potent than bupivacaine but significantly safer cardiac profile",
      "Intrinsic vasoconstrictive properties — less need for adrenaline co-administration",
    ],
  },
  prilocaine: {
    name: "Prilocaine",
    formula: "C₁₃H₂₀N₂O", mw: "220.3", linkage: "AMIDE", pKa: "7.9",
    features: [
      "Amide LA — but toluidine ring (methyl at para position, not 2,6-dimethyl)",
      "Secondary amine group (not tertiary) — unique among amide LAs",
      "Least toxic amide LA — large Vd, rapid metabolism, low protein binding",
      "Metabolised to o-toluidine → oxidises Hb to methaemoglobin (>600 mg doses)",
      "Used in EMLA cream (eutectic mixture with lidocaine — melting point depression)",
      "IVRA (Bier's block) agent of choice — lowest systemic toxicity on cuff release",
    ],
  },
  cocaine: {
    name: "Cocaine",
    formula: "C₁₇H₂₁NO₄", mw: "303.4", linkage: "ESTER", pKa: "8.6",
    features: [
      "Natural ester LA — first local anaesthetic discovered (1884, Karl Koller)",
      "Ester linkage (–O–CO–) — metabolised by plasma esterases",
      "Tropane alkaloid ring system — complex bicyclic structure",
      "UNIQUE: inhibits noradrenaline and dopamine reuptake → sympathomimetic",
      "Only LA with intrinsic vasoconstriction — no adrenaline needed",
      "Topical use only (ENT surgery) — 4-10% solutions. Max dose 1.5 mg/kg",
      "Cardiotoxic: arrhythmias, coronary vasospasm, myocardial infarction",
    ],
  },
  procaine: {
    name: "Procaine",
    formula: "C₁₃H₂₀N₂O₂", mw: "236.3", linkage: "ESTER", pKa: "8.9",
    features: [
      "Ester LA — first synthetic local anaesthetic (1905)",
      "Para-aminobenzoic acid (PABA) derivative — ester linkage to DEAE",
      "Ester bond hydrolysed by plasma cholinesterase → PABA + DEAE",
      "PABA metabolite → allergic reactions (cross-sensitivity with sulphonamides)",
      "High pKa (8.9) → only ~3% un-ionised at pH 7.4 → slow onset",
      "Largely replaced by amide agents but still used in infiltration anaesthesia",
    ],
  },
};

const AmideLASVG = ({ drug }: { drug: Drug }) => {
  const isLidocaine = drug === "lidocaine";
  const isBupivacaine = drug === "bupivacaine";
  const isRopivacaine = drug === "ropivacaine";
  const isPrilocaine = drug === "prilocaine";

  return (
    <g transform="translate(20,30)">
      {/* Aromatic ring */}
      <polygon points="80,70 110,50 140,70 140,110 110,130 80,110" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <polygon points="88,76 110,62 132,76 132,104 110,118 88,104" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />

      {/* Methyl groups on ring */}
      {!isPrilocaine ? (
        <>
          {/* 2,6-dimethyl */}
          <line x1="80" y1="70" x2="55" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="40" y="52" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
          <line x1="80" y1="110" x2="55" y2="125" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="40" y="130" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
          <text x="110" y="145" textAnchor="middle" className="fill-muted-foreground text-[7px]">2,6-dimethylaniline</text>
        </>
      ) : (
        <>
          {/* Para-methyl (toluidine) */}
          <line x1="110" y1="130" x2="110" y2="152" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="110" y="164" textAnchor="middle" className="fill-muted-foreground text-[10px]">CH₃</text>
          <text x="110" y="178" textAnchor="middle" className="fill-muted-foreground text-[7px]">para-toluidine</text>
        </>
      )}

      {/* NH — amide linkage */}
      <line x1="140" y1="90" x2="168" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <circle cx="178" cy="90" r="12" fill="hsl(var(--background))" />
      <text x="178" y="95" textAnchor="middle" className="fill-primary text-[11px] font-bold">NH</text>

      {/* C=O */}
      <line x1="190" y1="90" x2="215" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <line x1="215" y1="90" x2="215" y2="68" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <line x1="218" y1="90" x2="218" y2="68" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <text x="217" y="60" textAnchor="middle" className="fill-destructive text-[12px] font-bold">O</text>

      {/* Amide box */}
      <rect x="162" y="73" width="70" height="34" rx="4" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="197" y="120" textAnchor="middle" className="fill-accent text-[8px] font-bold">AMIDE bond</text>

      {/* CH2 bridge */}
      <line x1="215" y1="90" x2="245" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <text x="258" y="94" textAnchor="middle" className="fill-muted-foreground text-[9px]">CH₂</text>

      {/* Amine group — differs by drug */}
      <line x1="270" y1="90" x2="300" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />

      {isLidocaine && (
        <>
          <circle cx="312" cy="90" r="12" fill="hsl(var(--background))" />
          <text x="312" y="95" textAnchor="middle" className="fill-primary text-[11px] font-bold">N</text>
          <line x1="312" y1="78" x2="312" y2="60" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="312" y="52" textAnchor="middle" className="fill-muted-foreground text-[9px]">C₂H₅</text>
          <line x1="324" y1="90" x2="348" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="362" y="94" textAnchor="middle" className="fill-muted-foreground text-[9px]">C₂H₅</text>
          <text x="312" y="140" textAnchor="middle" className="fill-primary text-[8px]">Diethylamine</text>
        </>
      )}

      {(isBupivacaine || isRopivacaine) && (
        <>
          {/* Piperidine ring */}
          <polygon points="310,70 335,58 360,70 360,105 335,118 310,105" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <circle cx="335" cy="58" r="10" fill="hsl(var(--background))" />
          <text x="335" y="63" textAnchor="middle" className="fill-primary text-[10px] font-bold">N</text>
          {/* Alkyl on N */}
          <line x1="335" y1="48" x2="335" y2="30" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="335" y="22" textAnchor="middle" className="fill-muted-foreground text-[9px]">
            {isBupivacaine ? "C₄H₉" : "C₃H₇"}
          </text>
          <text x="335" y="10" textAnchor="middle" className="fill-accent text-[7px]">
            {isBupivacaine ? "(butyl)" : "(propyl)"}
          </text>
          <text x="335" y="138" textAnchor="middle" className="fill-primary text-[8px]">Piperidine</text>
        </>
      )}

      {isPrilocaine && (
        <>
          <circle cx="312" cy="90" r="12" fill="hsl(var(--background))" />
          <text x="312" y="95" textAnchor="middle" className="fill-primary text-[11px] font-bold">NH</text>
          <line x1="324" y1="90" x2="350" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="368" y="94" textAnchor="middle" className="fill-muted-foreground text-[9px]">C₃H₇</text>
          <text x="312" y="120" textAnchor="middle" className="fill-accent text-[8px]">Secondary amine</text>
          <text x="312" y="132" textAnchor="middle" className="fill-accent text-[7px]">(unique among amides)</text>
        </>
      )}
    </g>
  );
};

const CocaineSVG = () => (
  <g transform="translate(30,25)">
    {/* Tropane ring system — bicyclic */}
    {/* Bridge structure */}
    <line x1="120" y1="85" x2="160" y2="65" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="160" y1="65" x2="200" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="200" y1="85" x2="200" y2="115" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="200" y1="115" x2="160" y2="135" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="160" y1="135" x2="120" y2="115" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="120" y1="115" x2="120" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* Bridge */}
    <line x1="120" y1="85" x2="140" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="200" y1="85" x2="180" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* N in bridge */}
    <circle cx="160" cy="45" r="10" fill="hsl(var(--background))" />
    <text x="160" y="50" textAnchor="middle" className="fill-primary text-[11px] font-bold">N</text>
    <line x1="160" y1="35" x2="160" y2="18" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="160" y="12" textAnchor="middle" className="fill-muted-foreground text-[9px]">CH₃</text>
    {/* Ester group */}
    <line x1="200" y1="100" x2="230" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="240" y="104" textAnchor="middle" className="fill-destructive text-[10px] font-bold">O</text>
    <line x1="240" y1="88" x2="240" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="243" y1="88" x2="243" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="242" y="72" textAnchor="middle" className="fill-destructive text-[10px] font-bold">O</text>
    {/* Benzoyl ester */}
    <line x1="250" y1="100" x2="275" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="275,100 300,85 330,100 330,130 300,145 275,130" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="282,104 300,93 322,104 322,126 300,137 282,126" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* COOCH3 */}
    <line x1="160" y1="135" x2="160" y2="158" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="160" y="170" textAnchor="middle" className="fill-muted-foreground text-[9px]">COOCH₃</text>
    {/* Labels */}
    <rect x="224" y="104" width="42" height="14" rx="3" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="3 2" />
    <text x="245" y="130" textAnchor="middle" className="fill-accent text-[7px]">ESTER bond</text>
    <text x="160" y="195" textAnchor="middle" className="fill-primary text-[10px] font-bold">Tropane alkaloid</text>
    <text x="160" y="210" textAnchor="middle" className="fill-accent text-[8px]">Blocks NA + DA reuptake → sympathomimetic</text>
  </g>
);

const ProcaineSVG = () => (
  <g transform="translate(20,30)">
    {/* PABA ring */}
    <polygon points="80,70 110,50 140,70 140,110 110,130 80,110" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <polygon points="88,76 110,62 132,76 132,104 110,118 88,104" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
    {/* NH2 on ring */}
    <line x1="110" y1="50" x2="110" y2="30" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="110" y="22" textAnchor="middle" className="fill-primary text-[11px] font-bold">NH₂</text>
    {/* Ester linkage */}
    <line x1="140" y1="90" x2="165" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="165" y1="90" x2="165" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="168" y1="90" x2="168" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="167" y="62" textAnchor="middle" className="fill-destructive text-[12px] font-bold">O</text>
    <line x1="175" y1="90" x2="200" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="207" y="94" textAnchor="middle" className="fill-destructive text-[12px] font-bold">O</text>
    {/* Ester box */}
    <rect x="155" y="75" width="60" height="30" rx="4" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="4 2" />
    <text x="185" y="118" textAnchor="middle" className="fill-accent text-[8px] font-bold">ESTER bond</text>
    {/* CH2CH2 bridge */}
    <line x1="215" y1="90" x2="240" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="255" y="94" textAnchor="middle" className="fill-muted-foreground text-[9px]">CH₂CH₂</text>
    {/* Diethylamine */}
    <line x1="270" y1="90" x2="300" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <circle cx="312" cy="90" r="12" fill="hsl(var(--background))" />
    <text x="312" y="95" textAnchor="middle" className="fill-primary text-[11px] font-bold">N</text>
    <line x1="312" y1="78" x2="312" y2="60" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="312" y="52" textAnchor="middle" className="fill-muted-foreground text-[9px]">C₂H₅</text>
    <line x1="324" y1="90" x2="350" y2="90" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="365" y="94" textAnchor="middle" className="fill-muted-foreground text-[9px]">C₂H₅</text>
    {/* PABA annotation */}
    <text x="110" y="148" textAnchor="middle" className="fill-muted-foreground text-[7px]">PABA derivative</text>
    <text x="110" y="160" textAnchor="middle" className="fill-accent text-[7px]">→ allergic reactions</text>
  </g>
);

const LocalAnaestheticStructures = () => {
  const [selected, setSelected] = useState<Drug>("lidocaine");
  const d = info[selected];
  const isEster = d.linkage === "ESTER";

  return (
    <DiagramFigure
      id="local-anaesthetic-structures"
      title="Local anaesthetic structures"
      description="Auto-generated wrapper for the Local anaesthetic structures anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
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
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${isEster ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
              {d.linkage}
            </span>
            <span className="text-xs text-muted-foreground">pKa {d.pKa}</span>
          </div>
          <svg viewBox="0 0 420 220" className="w-full h-auto">
            <text x="210" y="16" textAnchor="middle" className="fill-foreground text-[13px] font-bold">{d.name}</text>
            {selected === "cocaine" ? <CocaineSVG /> : selected === "procaine" ? <ProcaineSVG /> : <AmideLASVG drug={selected} />}
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

export default LocalAnaestheticStructures;