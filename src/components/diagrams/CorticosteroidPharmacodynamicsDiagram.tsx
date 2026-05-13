import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

interface EffectGroup {
  id: string;
  system: string;
  short: string;
  pathway: "transrepression" | "transactivation" | "non-genomic";
  details: string[];
  color: string;
}

const groups: EffectGroup[] = [
  {
    id: "anti-inflammatory",
    system: "Anti-inflammatory",
    short: "↓ PLA₂, ↓ COX-2, ↓ cytokines",
    pathway: "transrepression",
    color: "hsl(var(--pharmacology))",
    details: [
      "Induces lipocortin-1 (annexin A1) → inhibits phospholipase A₂ → ↓ arachidonic acid → ↓ prostaglandins, leukotrienes, thromboxanes",
      "↓ COX-2 expression; ↓ inducible NOS",
      "↓ pro-inflammatory cytokines: IL-1, IL-2, IL-6, TNF-α, IFN-γ",
      "Stabilises lysosomal & mast-cell membranes; ↓ histamine release",
      "↓ capillary permeability, ↓ oedema",
    ],
  },
  {
    id: "immune",
    system: "Immunosuppressive",
    short: "↓ T cells, ↓ APC function",
    pathway: "transrepression",
    color: "hsl(280 60% 55%)",
    details: [
      "Lymphopenia (T > B), eosinopenia, monocytopenia — redistribution rather than destruction",
      "Neutrophilia (demargination) — beware misleading WCC",
      "↓ antigen presentation by macrophages; ↓ MHC-II expression",
      "↓ antibody production at high doses",
      "Risk of opportunistic infection: TB reactivation, PCP, candidiasis",
    ],
  },
  {
    id: "metabolic",
    system: "Metabolic",
    short: "Hyperglycaemia, catabolism",
    pathway: "transactivation",
    color: "hsl(35 85% 55%)",
    details: [
      "↑ Gluconeogenesis (induces PEPCK, G6Pase) → hyperglycaemia, insulin resistance",
      "↑ Protein catabolism → muscle wasting, thin skin, poor wound healing",
      "Lipolysis + redistribution → centripetal obesity, moon face, buffalo hump",
      "Negative calcium balance: ↓ gut absorption, ↑ renal loss → osteoporosis",
      "Growth retardation in children (↓ collagen, ↓ epiphyseal growth)",
    ],
  },
  {
    id: "cardiovascular",
    system: "Cardiovascular",
    short: "↑ BP, vasopressor sensitivity",
    pathway: "transactivation",
    color: "hsl(0 70% 55%)",
    details: [
      "Permissive action on catecholamines → restored α₁ vasoconstrictor response (key in septic shock)",
      "↑ Vascular tone; up-regulation of adrenergic receptors",
      "Mineralocorticoid effect (hydrocortisone, fludrocortisone): Na⁺/water retention, K⁺ loss → hypertension, oedema, hypokalaemic alkalosis",
      "Used in refractory septic shock (hydrocortisone 200 mg/day) — ADRENAL/APROCCHSS data",
    ],
  },
  {
    id: "cns",
    system: "CNS & mood",
    short: "Euphoria → psychosis",
    pathway: "transactivation",
    color: "hsl(210 70% 55%)",
    details: [
      "Mood elevation, insomnia, anxiety; high dose → mania or steroid psychosis",
      "Long-term suppression of CRH/ACCH → HPA axis suppression",
      "↓ Cerebral oedema in tumours/abscesses (dexamethasone — no mineralocorticoid effect)",
      "Antiemetic effect at central CTZ — useful adjunct in PONV",
    ],
  },
  {
    id: "respiratory",
    system: "Respiratory",
    short: "Airway anti-inflammation",
    pathway: "transrepression",
    color: "hsl(190 70% 50%)",
    details: [
      "Reduces airway eosinophilic inflammation in asthma; ↓ mucus production",
      "Up-regulates β₂-receptor expression → restores bronchodilator responsiveness",
      "Foetal lung maturation: ↑ surfactant production (antenatal betamethasone/dexamethasone)",
    ],
  },
  {
    id: "git",
    system: "GI & musculoskeletal",
    short: "Ulcers, myopathy, AVN",
    pathway: "transactivation",
    color: "hsl(140 50% 45%)",
    details: [
      "Peptic ulceration, GI bleeding (esp. with NSAIDs)",
      "Proximal myopathy (esp. fluorinated steroids: dexamethasone, triamcinolone)",
      "Avascular necrosis of femoral head (high-dose, prolonged use)",
      "Tendon rupture, delayed wound healing",
    ],
  },
  {
    id: "non-genomic",
    system: "Non-genomic (rapid)",
    short: "Membrane effects, seconds–minutes",
    pathway: "non-genomic",
    color: "hsl(330 65% 55%)",
    details: [
      "Direct interaction with membrane GR or physicochemical effects on lipid bilayer",
      "Onset within seconds to minutes — independent of gene transcription",
      "Underlies rapid haemodynamic effect of high-dose IV methylprednisolone",
      "May contribute to early bronchodilator priming and rapid mood effects",
    ],
  },
];

const pathwayBadge = (p: EffectGroup["pathway"]) => {
  switch (p) {
    case "transrepression":
      return { label: "Transrepression", color: "hsl(var(--pharmacology))" };
    case "transactivation":
      return { label: "Transactivation", color: "hsl(35 85% 55%)" };
    case "non-genomic":
      return { label: "Non-genomic", color: "hsl(330 65% 55%)" };
  }
};

export const CorticosteroidPharmacodynamicsDiagram = () => {
  const [selected, setSelected] = useState<string>("anti-inflammatory");
  const active = groups.find((g) => g.id === selected) ?? groups[0];

  return (
    <div className="rounded-lg border border-border bg-card p-4 md:p-6 space-y-6">
      <div className="space-y-1">
        <h3 className="font-serif text-lg font-bold text-foreground">
          Corticosteroid Pharmacodynamics
        </h3>
        <p className="text-xs text-muted-foreground">
          Tap a system to explore the downstream effects. Most actions are mediated by the
          cytoplasmic glucocorticoid receptor (GR) altering gene transcription; a small subset
          is non-genomic.
        </p>
      </div>

      {/* Mechanism strip */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-[11px] md:text-xs">
        {[
          { t: "Lipophilic steroid", s: "Diffuses across membrane" },
          { t: "Binds cytoplasmic GR", s: "HSP90 dissociates" },
          { t: "Nuclear translocation", s: "GR dimer enters nucleus" },
          { t: "Transactivation", s: "↑ anti-inflammatory & metabolic genes (lipocortin, PEPCK, β₂-R)" },
          { t: "Transrepression", s: "↓ NF-κB, AP-1 → ↓ cytokines, COX-2, iNOS" },
        ].map((step, i) => (
          <div
            key={step.t}
            className="relative rounded-md border border-border bg-background/60 px-3 py-2"
          >
            <div className="absolute -top-2 left-2 rounded-full bg-pharmacology px-1.5 text-[10px] font-bold text-pharmacology-foreground">
              {i + 1}
            </div>
            <div className="font-semibold text-foreground leading-tight">{step.t}</div>
            <div className="text-muted-foreground leading-snug mt-0.5">{step.s}</div>
          </div>
        ))}
      </div>

      {/* System selector grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {groups.map((g) => {
          const isActive = g.id === selected;
          return (
    <DiagramFigure
      id="corticosteroid-pharmacodynamics-diagram"
      title="Corticosteroid pharmacodynamics"
      description="Auto-generated wrapper for the Corticosteroid pharmacodynamics anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <button
                key={g.id}
                onClick={() => setSelected(g.id)}
                className={`text-left rounded-md border px-3 py-2 transition-all ${
                  isActive
                    ? "border-pharmacology bg-pharmacology/10 shadow-sm"
                    : "border-border bg-background/60 hover:border-pharmacology/40"
                }`}
                style={isActive ? { borderColor: g.color } : undefined}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: g.color }}
                  />
                  <span className="text-xs font-semibold text-foreground leading-tight">
                    {g.system}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground leading-snug">{g.short}</div>
              </button>
    </DiagramFigure>
  );
        })}
      </div>

      {/* Detail panel */}
      <div
        className="rounded-md border bg-background/60 p-4"
        style={{ borderColor: active.color }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: active.color }}
          />
          <h4 className="font-semibold text-foreground">{active.system} effects</h4>
          <span
            className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
            style={{ backgroundColor: pathwayBadge(active.pathway).color }}
          >
            {pathwayBadge(active.pathway).label}
          </span>
        </div>
        <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
          {active.details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>

      <div className="text-[11px] text-muted-foreground italic border-t border-border pt-3">
        Therapeutic effects are largely <strong>transrepressive</strong>; many side effects are{" "}
        <strong>transactivation</strong>-mediated — the rationale behind selective GR agonists
        (SEGRAs) under investigation.
      </div>
    </div>
  );
};

export default CorticosteroidPharmacodynamicsDiagram;
