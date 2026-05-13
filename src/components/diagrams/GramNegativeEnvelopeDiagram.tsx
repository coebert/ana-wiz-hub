import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

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
          <svg viewBox="0 0 760 480" className="w-full h-auto rounded-lg border border-border bg-background">
            <defs>
              <pattern id="lpsOuter" patternUnits="userSpaceOnUse" width="20" height="40">
                <circle cx="5" cy="6" r="3" fill="hsl(15 90% 55%)" />
                <circle cx="10" cy="3" r="2.5" fill="hsl(15 90% 60%)" />
                <circle cx="15" cy="6" r="3" fill="hsl(15 90% 55%)" />
                <line x1="10" y1="9" x2="10" y2="20" stroke="hsl(15 90% 45%)" strokeWidth="1" />
                <circle cx="10" cy="22" r="2.5" fill="hsl(15 90% 45%)" />
                <line x1="9" y1="24" x2="7" y2="36" stroke="hsl(15 60% 35%)" strokeWidth="1" />
                <line x1="11" y1="24" x2="13" y2="36" stroke="hsl(15 60% 35%)" strokeWidth="1" />
              </pattern>
              <pattern id="phospholipid" patternUnits="userSpaceOnUse" width="12" height="32">
                <circle cx="6" cy="3" r="2.2" fill="hsl(280 50% 60%)" />
                <line x1="5" y1="5" x2="4" y2="14" stroke="hsl(280 30% 40%)" strokeWidth="0.75" />
                <line x1="7" y1="5" x2="8" y2="14" stroke="hsl(280 30% 40%)" strokeWidth="0.75" />
                <line x1="5" y1="18" x2="4" y2="27" stroke="hsl(280 30% 40%)" strokeWidth="0.75" />
                <line x1="7" y1="18" x2="8" y2="27" stroke="hsl(280 30% 40%)" strokeWidth="0.75" />
                <circle cx="6" cy="29" r="2.2" fill="hsl(280 50% 60%)" />
              </pattern>
              <marker id="arrowDown" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 0 L 5 10 L 10 0 z" fill="hsl(var(--muted-foreground))" />
              </marker>
              <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="1" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 10 L 5 0 L 10 10 z" fill="hsl(210 75% 50%)" />
              </marker>
            </defs>

            {/* Title */}
            <text x="290" y="22" textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--foreground))">
              Gram-negative cell envelope (cross-section)
            </text>

            {/* Extracellular label */}
            <text x="290" y="50" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontStyle="italic">
              extracellular
            </text>

            {/* OUTER MEMBRANE — LPS (clickable) */}
            <rect
              x="40" y="62" width="500" height="42"
              fill="url(#lpsOuter)"
              stroke={active === "lps" ? "hsl(15 90% 55%)" : "hsl(15 90% 55% / 0.5)"}
              strokeWidth={active === "lps" ? 4 : 1.5}
              className="cursor-pointer transition-all"
              onClick={() => setActive("lps")}
            />

            {/* PORIN (clickable) */}
            <g
              className="cursor-pointer transition-all"
              onClick={() => setActive("porin")}
            >
              <rect
                x="225" y="62" width="40" height="42"
                fill={active === "porin" ? "hsl(45 90% 50% / 0.45)" : "hsl(45 90% 50% / 0.25)"}
                stroke={active === "porin" ? "hsl(45 90% 50%)" : "hsl(45 90% 50% / 0.7)"}
                strokeWidth={active === "porin" ? 3.5 : 2}
                rx="4"
              />
              <text x="245" y="88" fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">porin</text>
            </g>

            {/* Polymyxin attacking LPS (only when active) */}
            {active === "lps" && (
              <g>
                <circle cx="100" cy="48" r="6" fill="hsl(15 90% 55%)" />
                <text x="100" y="40" fontSize="9" fill="hsl(15 90% 55%)" textAnchor="middle" fontWeight="600">polymyxin</text>
                <line x1="100" y1="54" x2="100" y2="60" stroke="hsl(15 90% 55%)" strokeWidth="1.5" markerEnd="url(#arrowDown)" />
              </g>
            )}

            {/* PERIPLASM (clickable) */}
            <rect
              x="40" y="107" width="500" height="80"
              fill={active === "periplasm" ? "hsl(330 70% 55% / 0.18)" : "hsl(330 70% 55% / 0.08)"}
              stroke={active === "periplasm" ? "hsl(330 70% 55%)" : "hsl(330 70% 55% / 0.4)"}
              strokeWidth={active === "periplasm" ? 3 : 1}
              className="cursor-pointer transition-all"
              onClick={() => setActive("periplasm")}
            />
            <text x="50" y="124" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">Periplasm</text>

            {/* β-lactamase enzymes in periplasm */}
            <g
              className="cursor-pointer transition-all"
              onClick={() => setActive("periplasm")}
            >
              {[{ x: 130, y: 158 }, { x: 340, y: 162 }, { x: 460, y: 155 }].map((p, i) => (
                <g key={i}>
                  <ellipse cx={p.x} cy={p.y} rx="22" ry="13"
                    fill={active === "periplasm" ? "hsl(330 70% 55%)" : "hsl(330 70% 55% / 0.7)"}
                    stroke="hsl(330 70% 40%)" strokeWidth="1" />
                  <text x={p.x} y={p.y + 3.5} fontSize="9" fill="hsl(var(--background))" textAnchor="middle" fontWeight="600">β-lactamase</text>
                </g>
              ))}
              {/* β-lactam emerging from porin, being hydrolysed */}
              <circle cx="245" cy="135" r="5" fill="hsl(45 90% 50%)" />
              <text x="245" y="125" fontSize="9" fill="hsl(45 90% 50%)" textAnchor="middle" fontWeight="600">β-lactam</text>
              <line x1="250" y1="138" x2="320" y2="158" stroke="hsl(330 70% 55%)" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#arrowDown)" />
            </g>

            {/* PEPTIDOGLYCAN layer (clickable) */}
            <g
              className="cursor-pointer transition-all"
              onClick={() => setActive("peptidoglycan")}
            >
              <rect
                x="40" y="187" width="500" height="14"
                fill={active === "peptidoglycan" ? "hsl(160 70% 40% / 0.5)" : "hsl(160 70% 40% / 0.3)"}
                stroke={active === "peptidoglycan" ? "hsl(160 70% 40%)" : "hsl(160 70% 40% / 0.6)"}
                strokeWidth={active === "peptidoglycan" ? 3 : 1.5}
              />
              <text x="50" y="197" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">Peptidoglycan</text>
              {[100, 175, 250, 380, 450, 510].map((x) => (
                <line key={x} x1={x} y1={188} x2={x} y2={200} stroke="hsl(160 70% 40%)" strokeWidth="0.75" />
              ))}
            </g>

            {/* INNER (CYTOPLASMIC) MEMBRANE (clickable) */}
            <rect
              x="40" y="206" width="500" height="34"
              fill="url(#phospholipid)"
              stroke={active === "inner" ? "hsl(280 70% 55%)" : "hsl(280 70% 55% / 0.5)"}
              strokeWidth={active === "inner" ? 4 : 1.5}
              className="cursor-pointer transition-all"
              onClick={() => setActive("inner")}
            />
            <text x="50" y="226" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">Inner membrane</text>

            {/* PBPs anchored on inner membrane facing periplasm */}
            {[140, 220, 360, 480].map((x) => (
              <g key={x}>
                <rect x={x - 8} y={196} width={16} height={12} rx={2}
                  fill="hsl(160 70% 30%)" stroke="hsl(160 70% 20%)" strokeWidth="0.75" />
                <text x={x} y={205} fontSize="8" fill="hsl(var(--background))" textAnchor="middle" fontWeight="600">PBP</text>
              </g>
            ))}

            {/* CYTOPLASM */}
            <rect x="40" y="240" width="500" height="180" fill="hsl(var(--muted) / 0.25)" stroke="hsl(var(--border))" strokeWidth="1" />
            <text x="290" y="270" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))" fontStyle="italic">cytoplasm</text>

            {/* EFFLUX PUMP (RND tripartite) — spans all three layers (clickable) */}
            <g
              className="cursor-pointer transition-all"
              onClick={() => setActive("efflux")}
            >
              {/* Outer membrane channel (TolC/OprM) */}
              <rect x={400} y={62} width={20} height={42}
                fill={active === "efflux" ? "hsl(210 75% 50%)" : "hsl(210 75% 50% / 0.7)"}
                stroke={active === "efflux" ? "hsl(210 75% 35%)" : "transparent"}
                strokeWidth={active === "efflux" ? 2.5 : 0} rx="3" />
              {/* Periplasmic adapter (AcrA/MexA) */}
              <path d={`M 402 104 L 418 104 L 415 206 L 405 206 Z`}
                fill={active === "efflux" ? "hsl(210 75% 50% / 0.85)" : "hsl(210 75% 50% / 0.6)"} />
              {/* Inner membrane pump (AcrB/MexB) */}
              <rect x={395} y={206} width={30} height={34}
                fill={active === "efflux" ? "hsl(210 75% 50%)" : "hsl(210 75% 50% / 0.7)"}
                stroke={active === "efflux" ? "hsl(210 75% 35%)" : "transparent"}
                strokeWidth={active === "efflux" ? 2.5 : 0} rx="3" />
              {/* Drug being expelled */}
              <circle cx={410} cy={150} r={3.5} fill="hsl(195 80% 50%)" />
              <line x1={410} y1={155} x2={410} y2={50} stroke="hsl(210 75% 50%)" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrowUp)" />
              <text x={410} y={42} fontSize="9" fill="hsl(210 75% 50%)" textAnchor="middle" fontWeight="600">efflux</text>
            </g>

            {/* Right-side annotations in dedicated gutter (560-755) */}
            <Annotation x1={560} y1={83}  x2={540} y2={83}  label="LPS / lipid A" sub="polymyxin target" color="hsl(15 90% 55%)" active={active === "lps"} onClick={() => setActive("lps")} tx={755} ty={78} />
            <Annotation x1={560} y1={147} x2={485} y2={150} label="Periplasm" sub="β-lactamases hydrolyse here" color="hsl(330 70% 55%)" active={active === "periplasm"} onClick={() => setActive("periplasm")} tx={755} ty={142} />
            <Annotation x1={560} y1={194} x2={540} y2={194} label="Peptidoglycan" sub="PBP target (β-lactams)" color="hsl(160 70% 40%)" active={active === "peptidoglycan"} onClick={() => setActive("peptidoglycan")} tx={755} ty={189} />
            <Annotation x1={560} y1={223} x2={540} y2={223} label="Inner membrane" sub="aminoglycoside uptake" color="hsl(280 70% 55%)" active={active === "inner"} onClick={() => setActive("inner")} tx={755} ty={218} />
            <Annotation x1={560} y1={120} x2={425} y2={120} label="Efflux pump (RND)" sub="AcrAB-TolC, MexAB-OprM" color="hsl(210 75% 50%)" active={active === "efflux"} onClick={() => setActive("efflux")} tx={755} ty={258} />
            <Annotation x1={560} y1={88}  x2={265} y2={88}  label="Porin (OmpF/C, OprD)" sub="β-lactam entry route" color="hsl(45 90% 50%)" active={active === "porin"} onClick={() => setActive("porin")} tx={755} ty={298} />

            {/* Bottom note */}
            <text x="290" y="455" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontStyle="italic">
              Vancomycin & daptomycin cannot cross the LPS outer membrane → no Gram-negative activity
            </text>
          </svg>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-3 min-w-0">
          {/* Selector buttons — moved ABOVE detail to prevent cell overflow */}
          <div className="grid grid-cols-2 gap-1.5">
            {FEATURES.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className="text-[11px] px-2 py-1.5 rounded border text-left transition-all"
                style={{
                  backgroundColor: active === s.key ? `${s.color}26` : "hsl(var(--background))",
                  borderColor: active === s.key ? s.color : "hsl(var(--border))",
                  color: active === s.key ? s.color : "hsl(var(--foreground))",
                  fontWeight: active === s.key ? 600 : 500,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div
            className="rounded-lg border-l-4 border-border p-3"
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
    <DiagramFigure
      id="gram-negative-envelope-diagram"
      title="Gram negative envelope"
      description="Auto-generated wrapper for the Gram negative envelope anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
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
    </DiagramFigure>
  );
}

export default GramNegativeEnvelopeDiagram;
