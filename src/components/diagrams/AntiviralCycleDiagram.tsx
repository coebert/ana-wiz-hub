import { useState } from "react";

/**
 * Viral replication cycle schematic with antiviral drug class annotations.
 * Click each step to see which drug classes block that stage.
 */

type StepKey = "attachment" | "entry" | "uncoating" | "rt" | "integration" | "replication" | "assembly" | "release";

interface Step {
  key: StepKey;
  label: string;
  detail: string;
  classes: { name: string; examples: string }[];
  color: string;
  // node position on the SVG cycle
  cx: number;
  cy: number;
}

const STEPS: Step[] = [
  {
    key: "attachment",
    label: "1. Attachment",
    detail: "Viral surface protein binds host cell receptor (e.g., HIV gp120 → CD4/CCR5; SARS-CoV-2 spike → ACE2; influenza HA → sialic acid).",
    color: "hsl(15 90% 55%)",
    cx: 380, cy: 90,
    classes: [
      { name: "CCR5 antagonists", examples: "Maraviroc — blocks HIV gp120/CCR5 binding" },
      { name: "Monoclonal antibodies", examples: "Palivizumab (RSV F protein); anti-spike mAbs (SARS-CoV-2)" },
    ],
  },
  {
    key: "entry",
    label: "2. Entry / Fusion",
    detail: "Viral envelope fuses with host membrane (HIV gp41) or virus is endocytosed.",
    color: "hsl(25 90% 55%)",
    cx: 600, cy: 160,
    classes: [
      { name: "Fusion inhibitors", examples: "Enfuvirtide — binds HIV gp41, prevents fusion" },
    ],
  },
  {
    key: "uncoating",
    label: "3. Uncoating",
    detail: "Viral capsid disassembles, releasing genome into the cytoplasm. Influenza M2 ion channel acidifies endosome to trigger uncoating.",
    color: "hsl(45 90% 50%)",
    cx: 660, cy: 290,
    classes: [
      { name: "M2 ion channel blockers", examples: "Amantadine, rimantadine — influenza A only; widespread resistance, rarely used" },
    ],
  },
  {
    key: "rt",
    label: "4. Reverse transcription",
    detail: "Retroviruses convert single-stranded RNA → double-stranded DNA via viral reverse transcriptase. (Hepatitis B also uses RT.)",
    color: "hsl(160 70% 40%)",
    cx: 600, cy: 420,
    classes: [
      { name: "NRTIs (chain terminators)", examples: "Tenofovir, emtricitabine, lamivudine, zidovudine, abacavir" },
      { name: "NNRTIs", examples: "Efavirenz, rilpivirine, doravirine — bind RT allosterically" },
      { name: "HBV nucleos(t)ide analogues", examples: "Tenofovir, entecavir — chronic hepatitis B" },
    ],
  },
  {
    key: "integration",
    label: "5. Integration",
    detail: "Viral integrase splices proviral DNA into the host genome (retroviruses only).",
    color: "hsl(195 80% 50%)",
    cx: 380, cy: 490,
    classes: [
      { name: "Integrase strand-transfer inhibitors (INSTIs)", examples: "Dolutegravir, bictegravir, raltegravir, cabotegravir — first-line HIV backbone" },
    ],
  },
  {
    key: "replication",
    label: "6. Genome replication",
    detail: "Viral polymerase replicates genome and transcribes mRNA. DNA viruses use viral DNA polymerase; RNA viruses use RNA-dependent RNA polymerase (RdRp); HCV uses NS5A/NS5B.",
    color: "hsl(210 75% 50%)",
    cx: 160, cy: 420,
    classes: [
      { name: "Herpesvirus DNA polymerase inhibitors", examples: "Aciclovir, valaciclovir, ganciclovir, foscarnet — activated by viral thymidine kinase (HSV/VZV) or UL97 (CMV)" },
      { name: "RdRp inhibitors", examples: "Remdesivir, molnupiravir (SARS-CoV-2); sofosbuvir (HCV NS5B); favipiravir (influenza)" },
      { name: "HCV NS5A inhibitors", examples: "Ledipasvir, velpatasvir, elbasvir — combined with sofosbuvir for cure rates >95%" },
      { name: "HCV NS3/4A protease inhibitors", examples: "Glecaprevir, grazoprevir" },
    ],
  },
  {
    key: "assembly",
    label: "7. Assembly / Maturation",
    detail: "Structural proteins are cleaved and packaged with genome. HIV protease cleaves Gag-Pol polyprotein into mature virion components.",
    color: "hsl(280 70% 55%)",
    cx: 100, cy: 290,
    classes: [
      { name: "HIV protease inhibitors", examples: "Darunavir, atazanavir, lopinavir — boosted with ritonavir/cobicistat" },
      { name: "SARS-CoV-2 Mpro inhibitor", examples: "Nirmatrelvir (boosted with ritonavir → Paxlovid)" },
    ],
  },
  {
    key: "release",
    label: "8. Release / Budding",
    detail: "Mature virions bud from the host membrane. Influenza neuraminidase cleaves sialic acid to release new virions from infected cell surface.",
    color: "hsl(330 70% 55%)",
    cx: 160, cy: 160,
    classes: [
      { name: "Neuraminidase inhibitors", examples: "Oseltamivir (oral), zanamivir (inhaled), peramivir (IV) — influenza A and B" },
      { name: "Cap-dependent endonuclease inhibitor", examples: "Baloxavir marboxil — single-dose influenza treatment" },
    ],
  },
];

const AntiviralCycleDiagram = () => {
  const [active, setActive] = useState<StepKey>("rt");
  const step = STEPS.find((s) => s.key === active)!;

  // Build connecting arrows between consecutive steps in cycle order
  const arrows = STEPS.map((s, i) => {
    const next = STEPS[(i + 1) % STEPS.length];
    return { from: s, to: next };
  });

  return (
    <div className="rounded-xl border border-border bg-card p-4 my-6">
      <h3 className="text-lg font-semibold text-foreground">Viral replication cycle — antiviral target sites</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Click or tap a step in the cycle to see which antiviral drug classes block that stage of viral replication.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* SVG diagram */}
        <div className="lg:col-span-3">
          <svg viewBox="0 0 600 480" className="w-full h-auto rounded-lg border border-border bg-background">
            <defs>
              <marker id="vArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
              </marker>
              <radialGradient id="hostCell" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.15" />
              </radialGradient>
            </defs>

            {/* Host cell background */}
            <ellipse cx="300" cy="240" rx="270" ry="200" fill="url(#hostCell)" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="300" y="250" fontSize="42" fill="hsl(var(--muted))" opacity="0.25" textAnchor="middle" fontFamily="serif" fontStyle="italic">host cell</text>

            {/* Nucleus (for integration) */}
            <ellipse cx="300" cy="410" rx="80" ry="40" fill="hsl(195 80% 50% / 0.08)" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 2" />
            <text x="300" y="450" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">nucleus</text>

            {/* Connecting arrows */}
            {arrows.map((a, i) => {
              const dx = a.to.cx - a.from.cx;
              const dy = a.to.cy - a.from.cy;
              const len = Math.sqrt(dx * dx + dy * dy);
              const ux = dx / len, uy = dy / len;
              const startPad = 22, endPad = 26;
              const x1 = a.from.cx + ux * startPad;
              const y1 = a.from.cy + uy * startPad;
              const x2 = a.to.cx - ux * endPad;
              const y2 = a.to.cy - uy * endPad;
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke="hsl(var(--muted-foreground))" strokeOpacity="0.45"
                  strokeWidth="1.5" markerEnd="url(#vArrow)" />
              );
            })}

            {/* Step nodes */}
            {STEPS.map((s) => {
              const isActive = active === s.key;
              return (
                <g key={s.key} className="cursor-pointer transition-all" onClick={() => setActive(s.key)}>
                  <circle
                    cx={s.cx} cy={s.cy} r={isActive ? 22 : 18}
                    fill={isActive ? s.color : `${s.color}`}
                    fillOpacity={isActive ? 1 : 0.75}
                    stroke={isActive ? s.color : "transparent"}
                    strokeWidth={isActive ? 4 : 0}
                    strokeOpacity="0.35"
                  />
                  <text x={s.cx} y={s.cy + 4} textAnchor="middle"
                    fontSize="13" fontWeight="700" fill="white">
                    {s.key === "attachment" ? "1" :
                     s.key === "entry" ? "2" :
                     s.key === "uncoating" ? "3" :
                     s.key === "rt" ? "4" :
                     s.key === "integration" ? "5" :
                     s.key === "replication" ? "6" :
                     s.key === "assembly" ? "7" : "8"}
                  </text>
                  <text x={s.cx} y={s.cy - 30} textAnchor="middle"
                    fontSize="10.5" fontWeight={isActive ? 700 : 600}
                    fill={isActive ? s.color : "hsl(var(--foreground))"}>
                    {s.label.replace(/^\d+\.\s/, "")}
                  </text>
                </g>
              );
            })}

            {/* Title strip */}
            <text x="300" y="30" textAnchor="middle" fontSize="13" fontWeight="600" fill="hsl(var(--foreground))">
              Viral replication cycle — antiviral target sites
            </text>
          </svg>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2">
          <div
            className="rounded-lg border-l-4 border-border p-3 h-full"
            style={{ borderLeftColor: step.color, backgroundColor: `${step.color}10` }}
          >
            <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: step.color }}>
              Selected step
            </p>
            <p className="text-base font-semibold text-foreground mt-1">{step.label}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-snug italic">{step.detail}</p>

            <div className="mt-3 space-y-2">
              {step.classes.map((c) => (
                <div key={c.name} className="rounded-md border border-border bg-background/40 p-2">
                  <p className="text-xs font-semibold text-foreground">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{c.examples}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-1">
            {STEPS.map((s) => (
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

export default AntiviralCycleDiagram;
