import { useState } from "react";

/**
 * Gram-negative envelope schematic — LPS outer membrane, porins, periplasm
 * with β-lactamases, peptidoglycan and inner membrane.
 * Click each labelled feature to see relevant drug interactions.
 */

type FeatureKey = "lps" | "porin" | "periplasm" | "peptidoglycan" | "inner" | "efflux";

interface Feature {
  key: FeatureKey;
  label: string;
  detail: string;
  drugs: { name: string; note: string }[];
  color: string;
}

const FEATURES: Feature[] = [
  {
    key: "lps",
    label: "LPS outer membrane",
    detail: "Asymmetric bilayer — outer leaflet is lipopolysaccharide (lipid A + core + O-antigen). Lipid A is the endotoxin recognised by TLR4. Negatively charged → divalent cation (Ca²⁺/Mg²⁺) bridges stabilise the membrane.",
    color: "hsl(15 90% 55%)",
    drugs: [
      { name: "Polymyxins (colistin, polymyxin B)", note: "Cationic cyclic lipopeptides displace Mg²⁺/Ca²⁺ from lipid A → permeabilise outer membrane → cell death. Last-line for MDR Gram-negatives; nephrotoxicity, neurotoxicity." },
      { name: "Resistance — mcr-1, lipid A modification", note: "Plasmid-borne mcr-1 adds phosphoethanolamine to lipid A → reduced colistin binding. Chromosomal pmrAB / pmrCAB also modify lipid A." },
    ],
  },
  {
    key: "porin",
    label: "Porins (OmpF, OmpC, OprD)",
    detail: "β-barrel water-filled channels in the outer membrane. Hydrophilic, small (<600 Da) antibiotics enter by diffusion through porins — Gram-negatives are intrinsically less permeable than Gram-positives.",
    color: "hsl(45 90% 50%)",
    drugs: [
      { name: "β-lactams entering via porins", note: "Carbapenems (imipenem, meropenem) traverse OprD in Pseudomonas; cephalosporins via OmpF/OmpC in Enterobacterales." },
      { name: "Aminoglycosides", note: "Initial uptake is partly via porins, then energy-dependent transport across the inner membrane (oxygen-requiring → inactive against anaerobes)." },
      { name: "Resistance — porin loss", note: "Loss of OprD → carbapenem resistance in Pseudomonas; reduced OmpF/OmpC → resistance to cephalosporins, particularly when combined with AmpC or ESBL." },
    ],
  },
  {
    key: "periplasm",
    label: "Periplasmic space — β-lactamases",
    detail: "Aqueous compartment between outer and inner membranes containing peptidoglycan, periplasmic enzymes and binding proteins. β-lactamases are concentrated here, hydrolysing β-lactams before they reach PBPs in the inner membrane.",
    color: "hsl(330 70% 55%)",
    drugs: [
      { name: "Class A β-lactamases (TEM, SHV, CTX-M, KPC)", note: "Serine β-lactamases. ESBLs (CTX-M most common) → 3rd-gen cephalosporin resistance. KPC → carbapenem resistance. Inhibited by clavulanate, tazobactam, avibactam, vaborbactam." },
      { name: "Class B metallo-β-lactamases (NDM, VIM, IMP)", note: "Zn²⁺-dependent. Hydrolyse all β-lactams except aztreonam. NOT inhibited by clavulanate/tazobactam/avibactam — cefiderocol or aztreonam-avibactam used." },
      { name: "Class C (AmpC) and Class D (OXA)", note: "AmpC: chromosomal in SPACE organisms (Serratia, Pseudomonas, Acinetobacter, Citrobacter, Enterobacter); inducible. OXA-48 → carbapenem hydrolysis." },
      { name: "β-lactamase inhibitors", note: "Clavulanate, tazobactam, sulbactam (older); avibactam, vaborbactam, relebactam (newer, broader — including KPC and AmpC)." },
    ],
  },
  {
    key: "peptidoglycan",
    label: "Peptidoglycan layer (thin)",
    detail: "Single-layer mesh in Gram-negatives (vs thick multilayer in Gram-positives). Cross-linked by transpeptidases (PBPs) anchored in the inner membrane.",
    color: "hsl(160 70% 40%)",
    drugs: [
      { name: "β-lactams (PBP binding)", note: "Bind PBPs on the periplasmic face of the inner membrane → prevent transpeptidation → bactericidal in dividing cells." },
      { name: "Glycopeptides — vancomycin", note: "Too large to traverse Gram-negative outer membrane → INACTIVE against Gram-negatives. Active against Gram-positives only." },
    ],
  },
  {
    key: "inner",
    label: "Inner (cytoplasmic) membrane",
    detail: "Phospholipid bilayer containing PBPs, electron transport chain and transporters. Site of action of several non-β-lactam agents.",
    color: "hsl(280 70% 55%)",
    drugs: [
      { name: "Aminoglycoside uptake", note: "Energy- and oxygen-dependent transport across inner membrane → reaches 30S ribosome. Anaerobes lack the transport → intrinsic resistance." },
      { name: "Daptomycin — INACTIVE", note: "Cannot cross the LPS outer membrane → no Gram-negative activity." },
    ],
  },
  {
    key: "efflux",
    label: "Efflux pumps (RND family)",
    detail: "Tripartite pumps spanning inner membrane → periplasm → outer membrane (e.g., AcrAB-TolC in E. coli; MexAB-OprM in Pseudomonas). Actively expel multiple antibiotic classes.",
    color: "hsl(210 75% 50%)",
    drugs: [
      { name: "Substrates", note: "Fluoroquinolones, tetracyclines, β-lactams, macrolides, chloramphenicol — overexpression contributes to multidrug resistance." },
      { name: "Bypass strategy", note: "Tigecycline (glycylcycline) was designed to evade tetracycline efflux pumps." },
    ],
  },
];

const GramNegativeEnvelopeDiagram = () => {
  const [active, setActive] = useState<FeatureKey>("periplasm");
  const f = FEATURES.find((x) => x.key === active)!;

  return (
    <div className="rounded-xl border border-border bg-card p-4 my-6">
      <h3 className="text-lg font-semibold text-foreground">Gram-negative envelope — antibiotic entry, β-lactamases & efflux</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Click or tap a labelled feature of the Gram-negative envelope to see the relevant drugs and resistance mechanisms.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* SVG diagram */}
        <div className="lg:col-span-3">
          <svg viewBox="0 0 600 480" className="w-full h-auto rounded-lg border border-border bg-background">
            <defs>
              <pattern id="lpsOuter" patternUnits="userSpaceOnUse" width="20" height="40">
                {/* LPS sugars on top */}
                <circle cx="5" cy="6" r="3" fill="hsl(15 90% 55%)" />
                <circle cx="10" cy="3" r="2.5" fill="hsl(15 90% 60%)" />
                <circle cx="15" cy="6" r="3" fill="hsl(15 90% 55%)" />
                <line x1="10" y1="9" x2="10" y2="20" stroke="hsl(15 90% 45%)" strokeWidth="1" />
                {/* Lipid A head */}
                <circle cx="10" cy="22" r="2.5" fill="hsl(15 90% 45%)" />
                {/* Acyl tails */}
                <line x1="9" y1="24" x2="7" y2="36" stroke="hsl(15 60% 35%)" strokeWidth="1" />
                <line x1="11" y1="24" x2="13" y2="36" stroke="hsl(15 60% 35%)" strokeWidth="1" />
              </pattern>
              <pattern id="phospholipid" patternUnits="userSpaceOnUse" width="12" height="30">
                <circle cx="6" cy="3" r="2.2" fill="hsl(280 50% 60%)" />
                <line x1="5" y1="5" x2="4" y2="14" stroke="hsl(280 30% 40%)" strokeWidth="0.8" />
                <line x1="7" y1="5" x2="8" y2="14" stroke="hsl(280 30% 40%)" strokeWidth="0.8" />
                <line x1="5" y1="16" x2="4" y2="25" stroke="hsl(280 30% 40%)" strokeWidth="0.8" />
                <line x1="7" y1="16" x2="8" y2="25" stroke="hsl(280 30% 40%)" strokeWidth="0.8" />
                <circle cx="6" cy="27" r="2.2" fill="hsl(280 50% 60%)" />
              </pattern>
            </defs>

            {/* Title */}
            <text x="300" y="22" textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--foreground))">
              Gram-negative cell envelope (cross-section)
            </text>

            {/* Extracellular label */}
            <text x="300" y="45" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontStyle="italic">
              extracellular
            </text>

            {/* OUTER MEMBRANE — LPS (clickable) */}
            <rect
              x="60" y="60" width="480" height="42"
              fill="url(#lpsOuter)"
              stroke={active === "lps" ? "hsl(15 90% 55%)" : "hsl(15 90% 55% / 0.5)"}
              strokeWidth={active === "lps" ? 4 : 1.5}
              className="cursor-pointer transition-all"
              onClick={() => setActive("lps")}
            />
            <text x="70" y="78" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">LPS outer membrane</text>

            {/* PORIN (clickable) */}
            <g
              className="cursor-pointer transition-all"
              onClick={() => setActive("porin")}
            >
              <rect
                x="245" y="60" width="40" height="42"
                fill={active === "porin" ? "hsl(45 90% 50% / 0.45)" : "hsl(45 90% 50% / 0.25)"}
                stroke={active === "porin" ? "hsl(45 90% 50%)" : "hsl(45 90% 50% / 0.7)"}
                strokeWidth={active === "porin" ? 3.5 : 2}
                rx="4"
              />
              <text x="265" y="86" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">porin</text>
              {/* β-lactam molecule passing through */}
              <circle cx="265" cy="50" r="5" fill="hsl(45 90% 50%)" />
              <text x="265" y="40" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">β-lactam</text>
              <line x1="265" y1="55" x2="265" y2="105" stroke="hsl(45 90% 50%)" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrowDown)" />
            </g>

            {/* Polymyxin attacking LPS */}
            {active === "lps" && (
              <g>
                <circle cx="120" cy="48" r="6" fill="hsl(15 90% 55%)" />
                <text x="120" y="38" fontSize="8" fill="hsl(15 90% 55%)" textAnchor="middle" fontWeight="600">polymyxin</text>
                <line x1="120" y1="54" x2="120" y2="68" stroke="hsl(15 90% 55%)" strokeWidth="1.5" markerEnd="url(#arrowDown)" />
              </g>
            )}

            <defs>
              <marker id="arrowDown" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 0 L 5 10 L 10 0 z" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>

            {/* PERIPLASM (clickable) */}
            <rect
              x="60" y="105" width="480" height="90"
              fill={active === "periplasm" ? "hsl(330 70% 55% / 0.18)" : "hsl(330 70% 55% / 0.08)"}
              stroke={active === "periplasm" ? "hsl(330 70% 55%)" : "hsl(330 70% 55% / 0.4)"}
              strokeWidth={active === "periplasm" ? 3 : 1}
              className="cursor-pointer transition-all"
              onClick={() => setActive("periplasm")}
            />
            <text x="70" y="120" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">Periplasm</text>

            {/* β-lactamase enzymes in periplasm */}
            <g
              className="cursor-pointer transition-all"
              onClick={() => setActive("periplasm")}
            >
              {[{ x: 180, y: 145 }, { x: 320, y: 155 }, { x: 430, y: 140 }].map((p, i) => (
                <g key={i}>
                  <ellipse cx={p.x} cy={p.y} rx="18" ry="13"
                    fill={active === "periplasm" ? "hsl(330 70% 55%)" : "hsl(330 70% 55% / 0.7)"}
                    stroke="hsl(330 70% 40%)" strokeWidth="1" />
                  <text x={p.x} y={p.y + 3} fontSize="8" fill="white" textAnchor="middle" fontWeight="600">β-lact'ase</text>
                </g>
              ))}
              {/* β-lactam being hydrolysed near porin entry */}
              <circle cx="265" cy="125" r="4.5" fill="hsl(45 90% 50%)" />
              <line x1="270" y1="128" x2="305" y2="148" stroke="hsl(330 70% 55%)" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrowDown)" />
            </g>

            {/* PEPTIDOGLYCAN layer (clickable) */}
            <g
              className="cursor-pointer transition-all"
              onClick={() => setActive("peptidoglycan")}
            >
              <rect
                x="60" y="195" width="480" height="14"
                fill={active === "peptidoglycan" ? "hsl(160 70% 40% / 0.5)" : "hsl(160 70% 40% / 0.3)"}
                stroke={active === "peptidoglycan" ? "hsl(160 70% 40%)" : "hsl(160 70% 40% / 0.6)"}
                strokeWidth={active === "peptidoglycan" ? 3 : 1.5}
              />
              <text x="70" y="205" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">Peptidoglycan (thin)</text>
              {/* Cross-link marks */}
              {[100, 160, 220, 340, 400, 460, 510].map((x) => (
                <line key={x} x1={x} y1={196} x2={x} y2={208} stroke="hsl(160 70% 40%)" strokeWidth="0.8" />
              ))}
            </g>

            {/* INNER (CYTOPLASMIC) MEMBRANE (clickable) */}
            <rect
              x="60" y="212" width="480" height="32"
              fill="url(#phospholipid)"
              stroke={active === "inner" ? "hsl(280 70% 55%)" : "hsl(280 70% 55% / 0.5)"}
              strokeWidth={active === "inner" ? 4 : 1.5}
              className="cursor-pointer transition-all"
              onClick={() => setActive("inner")}
            />
            <text x="70" y="230" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">Inner membrane</text>

            {/* PBPs on inner membrane */}
            {[140, 240, 380, 480].map((x) => (
              <g key={x}>
                <rect x={x - 6} y={200} width={12} height={14} rx={2}
                  fill="hsl(160 70% 30%)" stroke="hsl(160 70% 20%)" strokeWidth="0.8" />
                <text x={x} y={210} fontSize="7" fill="white" textAnchor="middle" fontWeight="600">PBP</text>
              </g>
            ))}

            {/* CYTOPLASM */}
            <rect x="60" y="244" width="480" height="180" fill="hsl(var(--muted) / 0.25)" stroke="hsl(var(--border))" strokeWidth="1" />
            <text x="300" y="270" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))" fontStyle="italic">cytoplasm</text>

            {/* EFFLUX PUMP (RND tripartite) — spans all three layers (clickable) */}
            <g
              className="cursor-pointer transition-all"
              onClick={() => setActive("efflux")}
            >
              {/* Outer membrane channel (TolC/OprM) */}
              <rect x={400} y={60} width={20} height={42}
                fill={active === "efflux" ? "hsl(210 75% 50%)" : "hsl(210 75% 50% / 0.7)"}
                stroke={active === "efflux" ? "hsl(210 75% 35%)" : "transparent"}
                strokeWidth={active === "efflux" ? 2.5 : 0} rx="3" />
              {/* Periplasmic adapter (AcrA/MexA) */}
              <path d={`M 402 102 L 418 102 L 415 212 L 405 212 Z`}
                fill={active === "efflux" ? "hsl(210 75% 50% / 0.85)" : "hsl(210 75% 50% / 0.6)"} />
              {/* Inner membrane pump (AcrB/MexB) */}
              <rect x={395} y={212} width={30} height={32}
                fill={active === "efflux" ? "hsl(210 75% 50%)" : "hsl(210 75% 50% / 0.7)"}
                stroke={active === "efflux" ? "hsl(210 75% 35%)" : "transparent"}
                strokeWidth={active === "efflux" ? 2.5 : 0} rx="3" />
              {/* Drug being expelled */}
              <circle cx={410} cy={150} r={3.5} fill="hsl(195 80% 50%)" />
              <line x1={410} y1={155} x2={410} y2={48} stroke="hsl(210 75% 50%)" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrowUp)" />
              <defs>
                <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="1" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M 0 10 L 5 0 L 10 10 z" fill="hsl(210 75% 50%)" />
                </marker>
              </defs>
              <text x={410} y={42} fontSize="8" fill="hsl(210 75% 50%)" textAnchor="middle" fontWeight="600">efflux pump</text>
            </g>

            {/* Right-side legend annotations */}
            <Annotation x1={555} y1={80}  x2={540} y2={80}  label="LPS / lipid A" sub="polymyxin target" color="hsl(15 90% 55%)" active={active === "lps"} onClick={() => setActive("lps")} tx={555} ty={75} />
            <Annotation x1={555} y1={150} x2={460} y2={150} label="Periplasm" sub="β-lactamases hydrolyse here" color="hsl(330 70% 55%)" active={active === "periplasm"} onClick={() => setActive("periplasm")} tx={555} ty={145} />
            <Annotation x1={555} y1={205} x2={530} y2={205} label="Peptidoglycan" sub="PBP target (β-lactams)" color="hsl(160 70% 40%)" active={active === "peptidoglycan"} onClick={() => setActive("peptidoglycan")} tx={555} ty={200} />
            <Annotation x1={555} y1={228} x2={530} y2={228} label="Inner membrane" sub="aminoglycoside uptake" color="hsl(280 70% 55%)" active={active === "inner"} onClick={() => setActive("inner")} tx={555} ty={223} />

            {/* Bottom note */}
            <text x="300" y="455" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontStyle="italic">
              Vancomycin & daptomycin cannot cross the LPS outer membrane → no Gram-negative activity
            </text>
          </svg>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          <div
            className="rounded-lg border-l-4 border-border p-3 h-full"
            style={{ borderLeftColor: f.color, backgroundColor: `${f.color}10` }}
          >
            <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: f.color }}>
              Selected feature
            </p>
            <p className="text-base font-semibold text-foreground mt-1">{f.label}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-snug italic">{f.detail}</p>

            <div className="mt-3 space-y-2">
              {f.drugs.map((d) => (
                <div key={d.name} className="rounded-md border border-border bg-background/40 p-2">
                  <p className="text-xs font-semibold text-foreground">{d.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{d.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-1">
            {FEATURES.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className="text-[11px] px-2 py-1 rounded border border-border text-left transition-all"
                style={{
                  backgroundColor: active === s.key ? `${s.color}26` : "transparent",
                  borderColor: active === s.key ? s.color : "hsl(var(--border))",
                  color: active === s.key ? s.color : "hsl(var(--foreground))",
                  fontWeight: active === s.key ? 600 : 400,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function Annotation({ x1, y1, x2, y2, tx, ty, label, sub, color, active, onClick }: {
  x1: number; y1: number; x2: number; y2: number; tx: number; ty: number;
  label: string; sub: string; color: string; active: boolean; onClick: () => void;
}) {
  return (
    <g className="cursor-pointer" onClick={onClick}>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={active ? color : "hsl(var(--muted-foreground))"}
        strokeWidth={active ? 2 : 1}
        strokeDasharray={active ? "0" : "3 2"} />
      <text x={tx} y={ty} fontSize="10" fontWeight={active ? 700 : 600}
        fill={active ? color : "hsl(var(--foreground))"} textAnchor="end">
        {label}
      </text>
      <text x={tx} y={ty + 11} fontSize="8.5"
        fill="hsl(var(--muted-foreground))" textAnchor="end">
        {sub}
      </text>
    </g>
  );
}

export default GramNegativeEnvelopeDiagram;
