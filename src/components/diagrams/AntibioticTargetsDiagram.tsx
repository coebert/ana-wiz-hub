import { useState } from "react";

/**
 * Bacterial cell schematic showing antibiotic target sites.
 * Hover/tap each labelled site to highlight the corresponding cellular target
 * and list the antibiotic classes that act there.
 */

type SiteKey = "wall" | "membrane" | "30s" | "50s" | "dna" | "rna" | "folate";

interface Site {
  key: SiteKey;
  label: string;
  target: string;
  classes: { name: string; examples: string }[];
  color: string;
}

const SITES: Site[] = [
  {
    key: "wall",
    label: "Cell wall (peptidoglycan)",
    target: "Inhibit transpeptidation / cross-linking of peptidoglycan",
    color: "hsl(15 90% 55%)",
    classes: [
      { name: "β-lactams (PBP binding)", examples: "Penicillins, cephalosporins, carbapenems, monobactams" },
      { name: "Glycopeptides (D-Ala-D-Ala)", examples: "Vancomycin, teicoplanin" },
      { name: "Lipoglycopeptides", examples: "Telavancin, dalbavancin" },
      { name: "Cycloserine, fosfomycin, bacitracin", examples: "Earlier steps in peptidoglycan synthesis" },
    ],
  },
  {
    key: "membrane",
    label: "Cell membrane",
    target: "Disrupt membrane integrity — depolarisation, leakage of intracellular contents",
    color: "hsl(280 70% 55%)",
    classes: [
      { name: "Polymyxins", examples: "Colistin (polymyxin E), polymyxin B — Gram-negative outer membrane" },
      { name: "Lipopeptides", examples: "Daptomycin — Gram-positive cytoplasmic membrane (inactivated by surfactant → no use in pneumonia)" },
    ],
  },
  {
    key: "30s",
    label: "30S ribosomal subunit",
    target: "Block aminoacyl-tRNA binding / cause mRNA misreading",
    color: "hsl(195 80% 50%)",
    classes: [
      { name: "Aminoglycosides", examples: "Gentamicin, amikacin, tobramycin — bactericidal, concentration-dependent" },
      { name: "Tetracyclines / glycylcyclines", examples: "Doxycycline, tigecycline — bacteriostatic" },
    ],
  },
  {
    key: "50s",
    label: "50S ribosomal subunit",
    target: "Inhibit peptide bond formation / translocation",
    color: "hsl(210 75% 50%)",
    classes: [
      { name: "Macrolides", examples: "Erythromycin, clarithromycin, azithromycin" },
      { name: "Lincosamides", examples: "Clindamycin" },
      { name: "Oxazolidinones", examples: "Linezolid, tedizolid (block 70S initiation complex)" },
      { name: "Chloramphenicol, streptogramins", examples: "Chloramphenicol; quinupristin/dalfopristin" },
    ],
  },
  {
    key: "dna",
    label: "DNA gyrase / topoisomerase IV",
    target: "Prevent DNA supercoiling and replication",
    color: "hsl(160 70% 40%)",
    classes: [
      { name: "Fluoroquinolones", examples: "Ciprofloxacin, levofloxacin, moxifloxacin — bactericidal" },
      { name: "Nitroimidazoles", examples: "Metronidazole, tinidazole — DNA strand breaks (anaerobes only)" },
    ],
  },
  {
    key: "rna",
    label: "DNA-dependent RNA polymerase",
    target: "Block transcription of mRNA",
    color: "hsl(45 90% 50%)",
    classes: [
      { name: "Rifamycins", examples: "Rifampicin, rifabutin, rifaximin — potent CYP3A4 inducers" },
    ],
  },
  {
    key: "folate",
    label: "Folate synthesis (cytoplasm)",
    target: "Sequential blockade of folate / nucleotide synthesis",
    color: "hsl(330 70% 55%)",
    classes: [
      { name: "Sulfonamides", examples: "Sulfamethoxazole — inhibit dihydropteroate synthase (DHPS)" },
      { name: "Diaminopyrimidines", examples: "Trimethoprim — inhibit dihydrofolate reductase (DHFR)" },
    ],
  },
];

const AntibioticTargetsDiagram = () => {
  const [active, setActive] = useState<SiteKey>("wall");
  const site = SITES.find((s) => s.key === active)!;

  return (
    <div className="rounded-xl border border-border bg-card p-4 my-6">
      <h3 className="text-lg font-semibold text-foreground">Antibiotic targets — bacterial cell schematic</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Click or tap a labelled site on the bacterial cell to see which antibiotic classes act there and how they exert their effect.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* SVG diagram */}
        <div className="lg:col-span-3">
          <svg viewBox="0 0 760 520" className="w-full h-auto rounded-lg border border-border bg-background">
            <defs>
              <radialGradient id="cytoplasm" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.2" />
              </radialGradient>
              <pattern id="peptidoglycan" patternUnits="userSpaceOnUse" width="14" height="14">
                <rect width="14" height="14" fill="hsl(15 90% 55% / 0.12)" />
                <path d="M0 7 L14 7 M7 0 L7 14" stroke="hsl(15 90% 55%)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Title strip */}
            <text x="380" y="28" textAnchor="middle" fontSize="14" fontWeight="600" fill="hsl(var(--foreground))">
              Bacterial cell — antibiotic target sites
            </text>

            {/* Cell wall (outer ring) — peptidoglycan */}
            <ellipse
              cx="380" cy="270" rx="220" ry="160"
              fill="url(#peptidoglycan)"
              stroke={active === "wall" ? "hsl(15 90% 55%)" : "hsl(15 90% 55% / 0.5)"}
              strokeWidth={active === "wall" ? 5 : 2}
              className="cursor-pointer transition-all"
              onClick={() => setActive("wall")}
            />

            {/* Cell membrane */}
            <ellipse
              cx="380" cy="270" rx="200" ry="145"
              fill="hsl(280 70% 55% / 0.08)"
              stroke={active === "membrane" ? "hsl(280 70% 55%)" : "hsl(280 70% 55% / 0.6)"}
              strokeWidth={active === "membrane" ? 5 : 2.5}
              strokeDasharray="6 3"
              className="cursor-pointer transition-all"
              onClick={() => setActive("membrane")}
            />

            {/* Cytoplasm */}
            <ellipse cx="380" cy="270" rx="190" ry="138" fill="url(#cytoplasm)" />

            {/* DNA — supercoiled loop (left side of cytoplasm) */}
            <g
              className="cursor-pointer transition-all"
              onClick={() => setActive("dna")}
              opacity={active === "dna" ? 1 : 0.85}
            >
              <path
                d="M 290 250 C 270 230, 310 210, 340 230 S 380 260, 360 280 S 310 305, 290 285 S 270 260, 290 250 Z"
                fill="none"
                stroke={active === "dna" ? "hsl(160 70% 40%)" : "hsl(160 70% 40% / 0.7)"}
                strokeWidth={active === "dna" ? 3.5 : 2.5}
              />
              <path
                d="M 290 260 C 275 245, 305 225, 330 240 S 375 265, 365 280 S 315 295, 300 285 S 280 265, 290 260 Z"
                fill="none"
                stroke={active === "dna" ? "hsl(160 70% 40%)" : "hsl(160 70% 40% / 0.5)"}
                strokeWidth={active === "dna" ? 3 : 2}
              />
            </g>

            {/* RNA polymerase / mRNA strand */}
            <g
              className="cursor-pointer transition-all"
              onClick={() => setActive("rna")}
              opacity={active === "rna" ? 1 : 0.85}
            >
              <circle cx="370" cy="200" r="9" fill={active === "rna" ? "hsl(45 90% 50%)" : "hsl(45 90% 50% / 0.7)"} />
              <path
                d="M 379 200 Q 410 200, 430 210 T 470 205"
                stroke={active === "rna" ? "hsl(45 90% 50%)" : "hsl(45 90% 50% / 0.7)"}
                strokeWidth={active === "rna" ? 2.5 : 2}
                fill="none"
                strokeDasharray="3 2"
              />
            </g>

            {/* Ribosomes — 30S and 50S subunits */}
            {[
              { x: 460, y: 250 },
              { x: 320, y: 340 },
              { x: 460, y: 340 },
            ].map((r, i) => (
              <g key={i}>
                {/* 50S (larger, top) */}
                <ellipse
                  cx={r.x} cy={r.y - 6} rx="12" ry="9"
                  fill={active === "50s" ? "hsl(210 75% 50%)" : "hsl(210 75% 50% / 0.75)"}
                  stroke={active === "50s" ? "hsl(210 75% 35%)" : "transparent"}
                  strokeWidth={active === "50s" ? 2 : 0}
                  className="cursor-pointer transition-all"
                  onClick={() => setActive("50s")}
                />
                {/* 30S (smaller, bottom) */}
                <ellipse
                  cx={r.x} cy={r.y + 5} rx="10" ry="7"
                  fill={active === "30s" ? "hsl(195 80% 50%)" : "hsl(195 80% 50% / 0.75)"}
                  stroke={active === "30s" ? "hsl(195 80% 35%)" : "transparent"}
                  strokeWidth={active === "30s" ? 2 : 0}
                  className="cursor-pointer transition-all"
                  onClick={() => setActive("30s")}
                />
              </g>
            ))}

            {/* Folate cytoplasmic enzyme cluster */}
            <g
              className="cursor-pointer transition-all"
              onClick={() => setActive("folate")}
              opacity={active === "folate" ? 1 : 0.85}
            >
              <rect x="240" y="345" width="48" height="20" rx="4"
                fill={active === "folate" ? "hsl(330 70% 55%)" : "hsl(330 70% 55% / 0.7)"} />
              <text x="264" y="358" fontSize="10" fill="hsl(var(--background))" fontFamily="monospace" textAnchor="middle" fontWeight="600">DHPS/DHFR</text>
            </g>

            {/* Annotation lines and labels — placed in left/right gutters */}
            <Annotation x1={750} y1={90}  x2={585} y2={150} label="Cell wall" sub="β-lactams, glycopeptides" color="hsl(15 90% 55%)" active={active === "wall"} onClick={() => setActive("wall")} anchor="end" tx={755} ty={82} />
            <Annotation x1={10}  y1={110} x2={185} y2={170} label="Cell membrane" sub="Polymyxins, daptomycin" color="hsl(280 70% 55%)" active={active === "membrane"} onClick={() => setActive("membrane")} anchor="start" tx={5} ty={102} />
            <Annotation x1={750} y1={210} x2={460} y2={205} label="50S ribosome" sub="Macrolides, clindamycin, linezolid" color="hsl(210 75% 50%)" active={active === "50s"} onClick={() => setActive("50s")} anchor="end" tx={755} ty={202} />
            <Annotation x1={750} y1={310} x2={475} y2={345} label="30S ribosome" sub="Aminoglycosides, tetracyclines" color="hsl(195 80% 50%)" active={active === "30s"} onClick={() => setActive("30s")} anchor="end" tx={755} ty={302} />
            <Annotation x1={10}  y1={210} x2={300} y2={265} label="DNA gyrase / topo IV" sub="Fluoroquinolones, metronidazole" color="hsl(160 70% 40%)" active={active === "dna"} onClick={() => setActive("dna")} anchor="start" tx={5} ty={202} />
            <Annotation x1={10}  y1={300} x2={250} y2={355} label="Folate synthesis" sub="Sulfonamides, trimethoprim" color="hsl(330 70% 55%)" active={active === "folate"} onClick={() => setActive("folate")} anchor="start" tx={5} ty={292} />
            <Annotation x1={10}  y1={400} x2={365} y2={205} label="RNA polymerase" sub="Rifampicin" color="hsl(45 90% 50%)" active={active === "rna"} onClick={() => setActive("rna")} anchor="start" tx={5} ty={392} />

            {/* Footnote */}
            <text x="380" y="500" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontStyle="italic">
              Schematic — Gram-negative cells additionally have an LPS-bearing outer membrane (target of polymyxins)
            </text>
          </svg>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-3 min-w-0">
          {/* Selector buttons — moved ABOVE detail to prevent cell overflow */}
          <div className="grid grid-cols-2 gap-1.5">
            {SITES.map((s) => (
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
            style={{ borderLeftColor: site.color, backgroundColor: `${site.color}10` }}
          >
            <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: site.color }}>
              Selected target
            </p>
            <p className="text-base font-semibold text-foreground mt-1">{site.label}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-snug italic">{site.target}</p>

            <div className="mt-3 space-y-2">
              {site.classes.map((c) => (
                <div key={c.name} className="rounded-md border border-border bg-background/40 p-2">
                  <p className="text-xs font-semibold text-foreground">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{c.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Annotation({ x1, y1, x2, y2, tx, ty, label, sub, color, active, onClick, anchor }: {
  x1: number; y1: number; x2: number; y2: number; tx: number; ty: number;
  label: string; sub: string; color: string; active: boolean; onClick: () => void;
  anchor: "start" | "end";
}) {
  return (
            <g className="cursor-pointer" onClick={onClick}>
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={active ? color : "hsl(var(--muted-foreground))"}
        strokeWidth={active ? 2 : 1}
        strokeDasharray={active ? "0" : "3 2"}
      />
      <text x={tx} y={ty} fontSize="11" fontWeight={active ? 700 : 600}
        fill={active ? color : "hsl(var(--foreground))"} textAnchor={anchor}>
        {label}
      </text>
      <text x={tx} y={ty + 12} fontSize="9"
        fill="hsl(var(--muted-foreground))" textAnchor={anchor}>
        {sub}
      </text>
    </g>
  );
}

export default AntibioticTargetsDiagram;
