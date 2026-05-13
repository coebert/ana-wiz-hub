import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Fungal cell schematic showing antifungal target sites.
 * Click each labelled site to see the drug classes that act there.
 */

type SiteKey = "wall" | "membrane" | "ergosterol" | "dna" | "mitotic";

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
    label: "Cell wall — β-(1,3)-D-glucan",
    target: "Inhibit β-(1,3)-D-glucan synthase → defective fungal cell wall (no human equivalent → favourable safety)",
    color: "hsl(15 90% 55%)",
    classes: [
      { name: "Echinocandins", examples: "Caspofungin, micafungin, anidulafungin — fungicidal vs Candida, fungistatic vs Aspergillus; no activity vs Cryptococcus or Mucorales" },
    ],
  },
  {
    key: "membrane",
    label: "Cell membrane — ergosterol binding",
    target: "Bind ergosterol → form transmembrane pores → K⁺ leakage → cell death",
    color: "hsl(280 70% 55%)",
    classes: [
      { name: "Polyenes", examples: "Amphotericin B (conventional + liposomal), nystatin (topical) — broad fungicidal spectrum; nephrotoxicity, infusion reactions, hypokalaemia/hypomagnesaemia" },
    ],
  },
  {
    key: "ergosterol",
    label: "Ergosterol synthesis — lanosterol 14-α-demethylase",
    target: "Inhibit fungal CYP450 14-α-demethylase → block lanosterol → ergosterol → membrane dysfunction",
    color: "hsl(195 80% 50%)",
    classes: [
      { name: "Triazoles", examples: "Fluconazole, voriconazole, posaconazole, isavuconazole — potent CYP3A4 inhibitors (drug interactions, ↑ QT)" },
      { name: "Imidazoles", examples: "Ketoconazole, clotrimazole, miconazole — mostly topical now" },
      { name: "Allylamines (squalene epoxidase)", examples: "Terbinafine — earlier step in same pathway; dermatophyte infections" },
    ],
  },
  {
    key: "dna",
    label: "Nucleic acid synthesis (cytoplasm)",
    target: "Converted by fungal cytosine deaminase → 5-fluorouracil → inhibits thymidylate synthase + incorporated into RNA",
    color: "hsl(160 70% 40%)",
    classes: [
      { name: "Pyrimidine analogues", examples: "Flucytosine (5-FC) — always combined (usually with amphotericin) due to rapid resistance; cryptococcal meningitis; bone-marrow toxicity" },
    ],
  },
  {
    key: "mitotic",
    label: "Microtubules / mitotic spindle",
    target: "Bind tubulin → disrupt mitotic spindle in dermatophytes",
    color: "hsl(45 90% 50%)",
    classes: [
      { name: "Griseofulvin", examples: "Oral; dermatophyte (tinea) infections of skin/hair/nails — largely superseded by terbinafine" },
    ],
  },
];

const AntifungalTargetsDiagram = () => {
  const [active, setActive] = useState<SiteKey>("membrane");
  const site = SITES.find((s) => s.key === active)!;

  return (
    <DiagramFigure
      id="antifungal-targets-diagram"
      title="Antifungal targets"
      description="Auto-generated wrapper for the Antifungal targets anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="rounded-xl border border-border bg-card p-4 my-6">
        <h3 className="text-lg font-semibold text-foreground">Antifungal targets — fungal cell schematic</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Click or tap a labelled site on the fungal cell to see which antifungal classes act there and how they exert their effect.
        </p>
  
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* SVG diagram */}
          <div className="lg:col-span-3">
            <svg viewBox="0 0 760 520" className="w-full h-auto rounded-lg border border-border bg-background">
              <defs>
                <radialGradient id="fcytoplasm" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.2" />
                </radialGradient>
                <pattern id="glucan" patternUnits="userSpaceOnUse" width="12" height="12">
                  <rect width="12" height="12" fill="hsl(15 90% 55% / 0.12)" />
                  <circle cx="6" cy="6" r="2" fill="hsl(15 90% 55%)" />
                </pattern>
                <pattern id="ergopattern" patternUnits="userSpaceOnUse" width="10" height="10">
                  <rect width="10" height="10" fill="hsl(280 70% 55% / 0.08)" />
                  <path d="M 0 5 L 10 5" stroke="hsl(280 70% 55%)" strokeWidth="1" />
                  <circle cx="3" cy="5" r="1.6" fill="hsl(280 70% 55%)" />
                  <circle cx="7" cy="5" r="1.6" fill="hsl(280 70% 55%)" />
                </pattern>
              </defs>
  
              {/* Title strip */}
              <text x="380" y="28" textAnchor="middle" fontSize="14" fontWeight="600" fill="hsl(var(--foreground))">
                Fungal cell — antifungal target sites
              </text>
  
              {/* Cell wall — β-(1,3)-D-glucan + chitin */}
              <ellipse
                cx="380" cy="270" rx="220" ry="160"
                fill="url(#glucan)"
                stroke={active === "wall" ? "hsl(15 90% 55%)" : "hsl(15 90% 55% / 0.5)"}
                strokeWidth={active === "wall" ? 5 : 2}
                className="cursor-pointer transition-all"
                onClick={() => setActive("wall")}
              />
  
              {/* Cell membrane — ergosterol */}
              <ellipse
                cx="380" cy="270" rx="200" ry="145"
                fill="url(#ergopattern)"
                stroke={active === "membrane" ? "hsl(280 70% 55%)" : "hsl(280 70% 55% / 0.6)"}
                strokeWidth={active === "membrane" ? 5 : 2.5}
                className="cursor-pointer transition-all"
                onClick={() => setActive("membrane")}
              />
  
              {/* Cytoplasm */}
              <ellipse cx="380" cy="270" rx="190" ry="138" fill="url(#fcytoplasm)" />
  
              {/* Nucleus with DNA / flucytosine target */}
              <g
                className="cursor-pointer transition-all"
                onClick={() => setActive("dna")}
                opacity={active === "dna" ? 1 : 0.85}
              >
                <ellipse
                  cx="320" cy="250" rx="55" ry="38"
                  fill={active === "dna" ? "hsl(160 70% 40% / 0.25)" : "hsl(160 70% 40% / 0.12)"}
                  stroke={active === "dna" ? "hsl(160 70% 40%)" : "hsl(160 70% 40% / 0.6)"}
                  strokeWidth={active === "dna" ? 3 : 2}
                />
                <path
                  d="M 290 240 Q 310 230, 330 240 T 350 250"
                  fill="none"
                  stroke={active === "dna" ? "hsl(160 70% 40%)" : "hsl(160 70% 40% / 0.7)"}
                  strokeWidth="2"
                />
                <path
                  d="M 290 260 Q 310 270, 330 260 T 350 250"
                  fill="none"
                  stroke={active === "dna" ? "hsl(160 70% 40%)" : "hsl(160 70% 40% / 0.5)"}
                  strokeWidth="2"
                />
              </g>
  
              {/* Ergosterol synthesis — ER cluster */}
              <g
                className="cursor-pointer transition-all"
                onClick={() => setActive("ergosterol")}
                opacity={active === "ergosterol" ? 1 : 0.85}
              >
                <path
                  d="M 430 230 Q 480 225, 520 250 Q 530 275, 505 290 Q 460 295, 435 275 Q 420 250, 430 230 Z"
                  fill={active === "ergosterol" ? "hsl(195 80% 50% / 0.35)" : "hsl(195 80% 50% / 0.18)"}
                  stroke={active === "ergosterol" ? "hsl(195 80% 50%)" : "hsl(195 80% 50% / 0.6)"}
                  strokeWidth={active === "ergosterol" ? 2.5 : 1.8}
                />
                <text x="475" y="260" fontSize="10" fill="hsl(var(--foreground))" fontFamily="monospace" textAnchor="middle" fontWeight="600">14α-demethylase</text>
              </g>
  
              {/* Mitotic spindle / microtubules */}
              <g
                className="cursor-pointer transition-all"
                onClick={() => setActive("mitotic")}
                opacity={active === "mitotic" ? 1 : 0.85}
              >
                <circle cx="290" cy="360" r="5" fill={active === "mitotic" ? "hsl(45 90% 50%)" : "hsl(45 90% 50% / 0.7)"} />
                <circle cx="380" cy="360" r="5" fill={active === "mitotic" ? "hsl(45 90% 50%)" : "hsl(45 90% 50% / 0.7)"} />
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="290" y1="360"
                    x2={380} y2={360}
                    transform={`rotate(${(i - 2) * 8} 335 360)`}
                    stroke={active === "mitotic" ? "hsl(45 90% 50%)" : "hsl(45 90% 50% / 0.6)"}
                    strokeWidth={active === "mitotic" ? 1.8 : 1.2}
                  />
                ))}
              </g>
  
              {/* Annotation lines and labels — placed in left/right gutters */}
              <Annotation x1={750} y1={90}  x2={585} y2={150} label="Cell wall (β-glucan)" sub="Echinocandins" color="hsl(15 90% 55%)" active={active === "wall"} onClick={() => setActive("wall")} anchor="end" tx={755} ty={82} />
              <Annotation x1={10}  y1={110} x2={185} y2={170} label="Ergosterol membrane" sub="Amphotericin B, nystatin" color="hsl(280 70% 55%)" active={active === "membrane"} onClick={() => setActive("membrane")} anchor="start" tx={5} ty={102} />
              <Annotation x1={750} y1={250} x2={530} y2={260} label="Ergosterol synthesis" sub="Azoles, terbinafine" color="hsl(195 80% 50%)" active={active === "ergosterol"} onClick={() => setActive("ergosterol")} anchor="end" tx={755} ty={242} />
              <Annotation x1={10}  y1={250} x2={270} y2={250} label="Nucleic acid synthesis" sub="Flucytosine (5-FC)" color="hsl(160 70% 40%)" active={active === "dna"} onClick={() => setActive("dna")} anchor="start" tx={5} ty={242} />
              <Annotation x1={10}  y1={400} x2={290} y2={365} label="Mitotic spindle" sub="Griseofulvin" color="hsl(45 90% 50%)" active={active === "mitotic"} onClick={() => setActive("mitotic")} anchor="start" tx={5} ty={392} />
  
              {/* Footnote */}
              <text x="380" y="500" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontStyle="italic">
                Schematic — fungal wall (β-glucan/chitin) and ergosterol membrane have no human equivalents → key selectivity targets
              </text>
            </svg>
          </div>
  
          <div className="lg:col-span-2 flex flex-col gap-3 min-w-0">
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
    </DiagramFigure>
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

export default AntifungalTargetsDiagram;
