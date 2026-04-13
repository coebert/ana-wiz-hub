import { useState } from "react";

type FunctionalGroup = "hydroxyl" | "carbonyl" | "carboxyl" | "amine" | "ester" | "amide" | "ether" | "benzene";

const groups: Record<FunctionalGroup, { name: string; formula: string; example: string; relevance: string }> = {
  hydroxyl: { name: "Hydroxyl (—OH)", formula: "R—OH", example: "Propofol, ethanol", relevance: "Increases water solubility (hydrophilic). Phenol group in propofol. Alcohols undergo phase II conjugation (glucuronidation)." },
  carbonyl: { name: "Carbonyl (C=O)", formula: "R—CO—R'", example: "Ketamine", relevance: "Ketone group. Polar → some water solubility. Site of metabolism by reduction. Ketamine's asymmetric carbon adjacent to the carbonyl gives chirality." },
  carboxyl: { name: "Carboxyl (—COOH)", formula: "R—COOH", example: "NSAIDs (aspirin, ibuprofen)", relevance: "Weak acid. Ionises at physiological pH → largely ionised in plasma (ion trapped). Protein binding via ionic interaction with albumin." },
  amine: { name: "Amine (—NH₂ / —NR₂)", formula: "R—NH₂", example: "Local anaesthetics, morphine", relevance: "Weak base. Degree of ionisation depends on pH and pKa. Tertiary amines (3 R-groups) cross BBB better. Quaternary amines (4 R-groups, e.g. glycopyrrolate) cannot cross." },
  ester: { name: "Ester (—COO—)", formula: "R—COO—R'", example: "Remifentanil, atracurium, ester LAs", relevance: "Hydrolysed by esterases (plasma cholinesterase). Rapid metabolism → short duration. Ester LAs produce PABA → allergic reactions." },
  amide: { name: "Amide (—CONH—)", formula: "R—CONH—R'", example: "Amide local anaesthetics (lidocaine)", relevance: "More stable than esters — hepatic metabolism (CYP450). Longer duration. Amide LAs rarely cause true allergy. Identified by having TWO 'i's before '-caine' (lidocaine, bupivacaine)." },
  ether: { name: "Ether (—O—)", formula: "R—O—R'", example: "Sevoflurane, desflurane", relevance: "C-F bonds + ether linkage → low blood-gas solubility → rapid onset/offset. Ether bond in sevoflurane broken by CYP2E1 → fluoride ions (nephrotoxicity debate)." },
  benzene: { name: "Benzene Ring (Ar)", formula: "C₆H₆", example: "Propofol, thiopentone, midazolam", relevance: "Aromatic ring increases lipophilicity → CNS penetration. Planar structure allows π-π stacking with receptor proteins. Halogenation of benzene rings alters potency." },
};

export const OrganicChemistryDiagram = () => {
  const [activeGroup, setActiveGroup] = useState<FunctionalGroup>("hydroxyl");
  const [showChirality, setShowChirality] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-foreground">Functional Groups in Anaesthetic Drugs</h4>
        <button
          onClick={() => setShowChirality(!showChirality)}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
            showChirality ? "bg-chemistry/10 border-chemistry text-chemistry" : "border-border text-muted-foreground"
          }`}
        >
          {showChirality ? "← Groups" : "Chirality →"}
        </button>
      </div>

      {!showChirality ? (
        <>
          <div className="flex flex-wrap gap-1.5 justify-center mb-4">
            {(Object.keys(groups) as FunctionalGroup[]).map((g) => (
              <button
                key={g}
                onClick={() => setActiveGroup(g)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                  activeGroup === g
                    ? "bg-chemistry/10 border-chemistry text-chemistry"
                    : "border-border text-muted-foreground hover:border-chemistry/50"
                }`}
              >
                {groups[g].name.split(" (")[0]}
              </button>
            ))}
          </div>

          {/* Structure visualization */}
          <svg viewBox="0 0 400 140" className="w-full mb-3">
            {activeGroup === "hydroxyl" && (
              <g>
                {/* Propofol structure */}
                <text x={200} y={20} textAnchor="middle" fontSize="10" className="fill-muted-foreground">Propofol (2,6-diisopropylphenol)</text>
                {/* Benzene ring */}
                <polygon points="180,60 200,50 220,60 220,80 200,90 180,80" fill="none" stroke="hsl(95 55% 38%)" strokeWidth="2" />
                <polygon points="185,63 200,55 215,63 215,77 200,85 185,77" fill="none" stroke="hsl(95 55% 38%)" strokeWidth="1" strokeDasharray="3 3" />
                {/* OH group */}
                <line x1={200} y1={90} x2={200} y2={110} stroke="hsl(0 70% 55%)" strokeWidth="2" />
                <circle cx={200} cy={115} r={10} fill="hsl(0 70% 55%)" opacity="0.15" stroke="hsl(0 70% 55%)" strokeWidth="1.5" />
                <text x={200} y={119} textAnchor="middle" fontSize="10" fill="hsl(0 70% 55%)" fontWeight="bold">OH</text>
                {/* Isopropyl groups */}
                <line x1={180} y1={60} x2={155} y2={50} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <line x1={155} y1={50} x2={140} y2={40} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <line x1={155} y1={50} x2={140} y2={60} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <line x1={220} y1={60} x2={245} y2={50} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <line x1={245} y1={50} x2={260} y2={40} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <line x1={245} y1={50} x2={260} y2={60} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
                <text x={130} y={38} fontSize="8" className="fill-muted-foreground">CH₃</text>
                <text x={130} y={68} fontSize="8" className="fill-muted-foreground">CH₃</text>
                <text x={262} y={38} fontSize="8" className="fill-muted-foreground">CH₃</text>
                <text x={262} y={68} fontSize="8" className="fill-muted-foreground">CH₃</text>
                <text x={200} y={138} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Phenol group → lipophilic ring + hydrophilic OH</text>
              </g>
            )}
            {activeGroup === "ester" && (
              <g>
                <text x={200} y={20} textAnchor="middle" fontSize="10" className="fill-muted-foreground">Ester linkage — hydrolysed by esterases</text>
                <text x={130} y={70} textAnchor="middle" fontSize="14" className="fill-foreground font-bold">R</text>
                <line x1={145} y1={67} x2={170} y2={67} stroke="hsl(var(--foreground))" strokeWidth="2" />
                <text x={180} y={72} textAnchor="middle" fontSize="14" className="fill-foreground font-bold">C</text>
                {/* Double bond O */}
                <line x1={180} y1={55} x2={180} y2={40} stroke="hsl(0 70% 55%)" strokeWidth="2" />
                <line x1={183} y1={55} x2={183} y2={40} stroke="hsl(0 70% 55%)" strokeWidth="2" />
                <text x={182} y={35} textAnchor="middle" fontSize="12" fill="hsl(0 70% 55%)" fontWeight="bold">O</text>
                {/* Single bond O */}
                <line x1={193} y1={67} x2={215} y2={67} stroke="hsl(0 70% 55%)" strokeWidth="2" />
                <text x={225} y={72} textAnchor="middle" fontSize="12" fill="hsl(0 70% 55%)" fontWeight="bold">O</text>
                <line x1={235} y1={67} x2={260} y2={67} stroke="hsl(var(--foreground))" strokeWidth="2" />
                <text x={270} y={72} textAnchor="middle" fontSize="14" className="fill-foreground font-bold">R'</text>
                
                {/* Hydrolysis arrow */}
                <path d="M 200 85 Q 200 100 200 105" stroke="hsl(210 70% 50%)" strokeWidth="1.5" fill="none" markerEnd="url(#arrowBlue)" />
                <text x={220} y={95} fontSize="8" className="fill-muted-foreground">+ H₂O</text>
                <text x={200} y={120} textAnchor="middle" fontSize="9" className="fill-foreground font-medium">→ R—COOH + HO—R'</text>
                <text x={200} y={138} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Rapid hydrolysis by plasma esterases (e.g. remifentanil t½ 3-4 min)</text>
              </g>
            )}
            {activeGroup === "amide" && (
              <g>
                <text x={200} y={20} textAnchor="middle" fontSize="10" className="fill-muted-foreground">Amide linkage — hepatic CYP450 metabolism</text>
                <text x={130} y={70} textAnchor="middle" fontSize="14" className="fill-foreground font-bold">R</text>
                <line x1={145} y1={67} x2={170} y2={67} stroke="hsl(var(--foreground))" strokeWidth="2" />
                <text x={180} y={72} textAnchor="middle" fontSize="14" className="fill-foreground font-bold">C</text>
                <line x1={180} y1={55} x2={180} y2={40} stroke="hsl(0 70% 55%)" strokeWidth="2" />
                <line x1={183} y1={55} x2={183} y2={40} stroke="hsl(0 70% 55%)" strokeWidth="2" />
                <text x={182} y={35} textAnchor="middle" fontSize="12" fill="hsl(0 70% 55%)" fontWeight="bold">O</text>
                <line x1={193} y1={67} x2={215} y2={67} stroke="hsl(210 70% 50%)" strokeWidth="2" />
                <text x={228} y={72} textAnchor="middle" fontSize="12" fill="hsl(210 70% 50%)" fontWeight="bold">NH</text>
                <line x1={242} y1={67} x2={260} y2={67} stroke="hsl(var(--foreground))" strokeWidth="2" />
                <text x={270} y={72} textAnchor="middle" fontSize="14" className="fill-foreground font-bold">R'</text>
                <text x={200} y={100} textAnchor="middle" fontSize="9" className="fill-foreground font-medium">Stable bond — requires hepatic metabolism</text>
                <text x={200} y={120} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Ester vs Amide LA: count the 'i's before '-caine'</text>
                <text x={200} y={134} textAnchor="middle" fontSize="8" className="fill-muted-foreground">1 'i' = ester (procaine) · 2 'i's = amide (lidocaine, bupivacaine)</text>
              </g>
            )}
            {activeGroup === "amine" && (
              <g>
                <text x={200} y={20} textAnchor="middle" fontSize="10" className="fill-muted-foreground">Amine classification — determines membrane permeability</text>
                {[
                  { label: "Primary", formula: "R—NH₂", x: 60 },
                  { label: "Secondary", formula: "R₂—NH", x: 150 },
                  { label: "Tertiary", formula: "R₃—N", x: 240 },
                  { label: "Quaternary", formula: "R₄—N⁺", x: 340 },
                ].map((a, i) => (
                  <g key={i}>
                    <rect x={a.x - 40} y={35} width={80} height={45} rx="6" fill="hsl(210 70% 50%)" opacity={0.08 + i * 0.04} stroke="hsl(210 70% 50%)" strokeWidth="1" />
                    <text x={a.x} y={53} textAnchor="middle" fontSize="9" className="fill-foreground font-semibold">{a.label}</text>
                    <text x={a.x} y={70} textAnchor="middle" fontSize="10" className="fill-foreground font-mono">{a.formula}</text>
                  </g>
                ))}
                <text x={60} y={100} textAnchor="middle" fontSize="7" className="fill-muted-foreground">Crosses BBB ✓</text>
                <text x={150} y={100} textAnchor="middle" fontSize="7" className="fill-muted-foreground">Crosses BBB ✓</text>
                <text x={240} y={100} textAnchor="middle" fontSize="7" className="fill-muted-foreground">Crosses BBB ✓</text>
                <text x={340} y={100} textAnchor="middle" fontSize="7" className="fill-muted-foreground">Cannot cross ✗</text>
                <text x={60} y={115} textAnchor="middle" fontSize="7" className="fill-muted-foreground">(atropine)</text>
                <text x={150} y={115} textAnchor="middle" fontSize="7" className="fill-muted-foreground">(ketamine)</text>
                <text x={240} y={115} textAnchor="middle" fontSize="7" className="fill-muted-foreground">(morphine)</text>
                <text x={340} y={115} textAnchor="middle" fontSize="7" className="fill-muted-foreground">(glycopyrrolate)</text>
                <text x={200} y={138} textAnchor="middle" fontSize="8" className="fill-foreground font-medium">Permanent charge (quaternary) → cannot cross lipid membranes</text>
              </g>
            )}
            {(activeGroup === "carbonyl" || activeGroup === "carboxyl" || activeGroup === "ether" || activeGroup === "benzene") && (
              <g>
                <text x={200} y={40} textAnchor="middle" fontSize="14" className="fill-foreground font-bold font-mono">{groups[activeGroup].formula}</text>
                <text x={200} y={60} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">{groups[activeGroup].name}</text>
                <text x={200} y={85} textAnchor="middle" fontSize="10" className="fill-muted-foreground">Example: {groups[activeGroup].example}</text>
                {activeGroup === "benzene" && (
                  <g>
                    <polygon points="180,100 200,90 220,100 220,120 200,130 180,120" fill="none" stroke="hsl(95 55% 38%)" strokeWidth="2" />
                    <circle cx={200} cy={110} r={10} fill="none" stroke="hsl(95 55% 38%)" strokeWidth="1" />
                    <text x={200} y={114} textAnchor="middle" fontSize="7" className="fill-muted-foreground">π</text>
                  </g>
                )}
              </g>
            )}
          </svg>

          <div className="bg-secondary/30 rounded-xl p-4 border border-border">
            <h4 className="text-sm font-semibold text-foreground mb-1">{groups[activeGroup].name}</h4>
            <p className="text-xs text-muted-foreground mb-1"><strong>Example:</strong> {groups[activeGroup].example}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{groups[activeGroup].relevance}</p>
          </div>
        </>
      ) : (
        /* Chirality section */
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
            <p className="text-xs text-muted-foreground mb-1">Chirality (Optical Isomerism)</p>
            <p className="text-sm font-medium text-foreground">
              A chiral centre has 4 different groups attached to a carbon → non-superimposable mirror images (enantiomers)
            </p>
          </div>

          <svg viewBox="0 0 400 160" className="w-full">
            {/* R-enantiomer */}
            <g>
              <text x={120} y={20} textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">S(+) Ketamine</text>
              <circle cx={120} cy={70} r={8} fill="hsl(95 55% 38%)" opacity="0.3" stroke="hsl(95 55% 38%)" strokeWidth="2" />
              <text x={120} y={74} textAnchor="middle" fontSize="8" fill="hsl(95 55% 38%)" fontWeight="bold">C*</text>
              <line x1={120} y1={62} x2={120} y2={42} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <text x={120} y={38} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Cl</text>
              <line x1={112} y1={74} x2={90} y2={90} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <text x={80} y={98} textAnchor="middle" fontSize="8" className="fill-muted-foreground">NH—CH₃</text>
              <line x1={128} y1={74} x2={150} y2={90} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <text x={160} y={98} textAnchor="middle" fontSize="8" className="fill-muted-foreground">C=O</text>
              <line x1={120} y1={78} x2={120} y2={100} stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x={120} y={112} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Ar</text>
              <text x={120} y={135} textAnchor="middle" fontSize="8" fill="hsl(95 55% 38%)" fontWeight="600">3-4× more potent</text>
              <text x={120} y={148} textAnchor="middle" fontSize="7" className="fill-muted-foreground">Less dysphoria</text>
            </g>

            {/* Mirror line */}
            <line x1={200} y1={15} x2={200} y2={155} stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" />
            <text x={200} y={12} textAnchor="middle" fontSize="7" className="fill-muted-foreground">mirror plane</text>

            {/* S-enantiomer */}
            <g>
              <text x={280} y={20} textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">R(-) Ketamine</text>
              <circle cx={280} cy={70} r={8} fill="hsl(340 60% 50%)" opacity="0.3" stroke="hsl(340 60% 50%)" strokeWidth="2" />
              <text x={280} y={74} textAnchor="middle" fontSize="8" fill="hsl(340 60% 50%)" fontWeight="bold">C*</text>
              <line x1={280} y1={62} x2={280} y2={42} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <text x={280} y={38} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Cl</text>
              <line x1={288} y1={74} x2={310} y2={90} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <text x={320} y={98} textAnchor="middle" fontSize="8" className="fill-muted-foreground">NH—CH₃</text>
              <line x1={272} y1={74} x2={250} y2={90} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
              <text x={240} y={98} textAnchor="middle" fontSize="8" className="fill-muted-foreground">C=O</text>
              <line x1={280} y1={78} x2={280} y2={100} stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x={280} y={112} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Ar</text>
              <text x={280} y={135} textAnchor="middle" fontSize="8" fill="hsl(340 60% 50%)" fontWeight="600">Less potent</text>
              <text x={280} y={148} textAnchor="middle" fontSize="7" className="fill-muted-foreground">More side effects</text>
            </g>
          </svg>

          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="text-xs font-semibold text-foreground mb-2">Clinically Important Chiral Drugs</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              {[
                { drug: "Bupivacaine", note: "S(−) levobupivacaine: less cardiotoxic than racemic mixture" },
                { drug: "Ketamine", note: "S(+) esketamine: ~3× more potent analgesic, faster recovery, less emergence phenomena" },
                { drug: "Atracurium", note: "R-cis,R'-cis isomer (cisatracurium): ~3× more potent, no histamine release, Hofmann elimination" },
                { drug: "Omeprazole", note: "S-esomeprazole: higher bioavailability (less first-pass CYP2C19)" },
                { drug: "Thiopentone", note: "Racemic mixture — both enantiomers contribute to hypnosis" },
              ].map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="font-medium text-foreground min-w-[90px]">{item.drug}</span>
                  <span>{item.note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-secondary/30 rounded-lg p-3 border border-border">
            <p className="text-xs font-medium text-foreground mb-1">Why Chirality Matters</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Drug receptors are chiral proteins → one enantiomer may bind much better than the other</li>
              <li>Racemic mixtures contain 50:50 R and S → therapeutic effect may come mainly from one isomer</li>
              <li>Different enantiomers may have different metabolism, toxicity, and side-effect profiles</li>
              <li>Optical rotation: (+) dextrorotatory, (−) laevorotatory — NOT related to R/S configuration</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
