import { useMemo, useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramFigure } from "../_shared/DiagramFigure";

type VaccineKey = "live" | "inactivated" | "subunit" | "toxoid" | "mrna" | "vector";

interface ImmuneArmScore {
  /** 0–4 strength */
  bCellAb: number;
  cd4Th: number;
  cd8Ctl: number;
  mucosalIgA: number;
}

interface VaccineData {
  key: VaccineKey;
  name: string;
  shortName: string;
  color: string;
  principle: string;
  examples: string[];
  arms: ImmuneArmScore;
  memory: string;
  durability: string;
  boosters: string;
  coldChain: string;
  pros: string[];
  cons: string[];
  anaesthetic: string[];
}

const VACCINES: VaccineData[] = [
  {
    key: "live",
    name: "Live attenuated",
    shortName: "Live",
    color: "hsl(0, 70%, 55%)",
    principle: "Weakened replicating organism — mimics natural infection",
    examples: ["MMR", "Varicella, Zoster (Zostavax)", "Yellow fever", "BCG", "Oral polio (Sabin)", "Rotavirus", "Intranasal influenza (LAIV)"],
    arms: { bCellAb: 4, cd4Th: 4, cd8Ctl: 4, mucosalIgA: 3 },
    memory: "Broad and long-lived: high-affinity IgG, memory B, memory CD4⁺ Th1 and CD8⁺ CTL",
    durability: "Decades to lifelong (often 1–2 doses)",
    boosters: "Rarely needed — MMR ×2, YF single dose now considered lifelong (WHO 2016)",
    coldChain: "Strict — most stored 2–8 °C; MMR/varicella/YF reconstituted vials discarded after 1–6 h. BCG and freeze-dried YF need protection from light. Disrupted cold chain = denatured vaccine.",
    pros: ["Strongest, most complete immunity (cellular + humoral + mucosal for some)", "Few doses required"],
    cons: ["Risk of disease in immunocompromised", "Cold chain", "Reversion to virulence (OPV → VAPP)"],
    anaesthetic: [
      "CONTRAINDICATED in pregnancy and significant immunosuppression (HIV with low CD4, post-transplant, high-dose steroids ≥20 mg prednisolone/d for ≥2 wks, biologics)",
      "Wait ≥3 months after live vaccine before solid-organ transplant or chemotherapy where possible",
      "Consider for asplenic patients before splenectomy if not already immune",
    ],
  },
  {
    key: "inactivated",
    name: "Inactivated (whole-killed)",
    shortName: "Inactivated",
    color: "hsl(25, 80%, 50%)",
    principle: "Killed whole organism — cannot replicate",
    examples: ["Inactivated polio (Salk)", "Hepatitis A", "Rabies", "Whole-cell pertussis (historic)", "IM influenza (split-virion)"],
    arms: { bCellAb: 3, cd4Th: 2, cd8Ctl: 1, mucosalIgA: 1 },
    memory: "Predominantly humoral (IgG via Th2/Tfh); minimal CD8⁺ priming as antigen does not enter cytoplasm",
    durability: "Years; boosters often required",
    boosters: "Periodic — annual influenza, every 10 yr rabies pre-exposure",
    coldChain: "Standard refrigeration 2–8 °C. Robust — better thermostability than live vaccines. NEVER freeze (alum adjuvant aggregates → loss of potency).",
    pros: ["Safe in immunocompromised and pregnancy", "Stable", "No reversion risk"],
    cons: ["Weaker, shorter-lived response", "Multiple doses + adjuvant often required", "Poor mucosal immunity"],
    anaesthetic: [
      "Safe in pregnancy and immunosuppression — first-line where live vaccine contraindicated (e.g. IPV instead of OPV)",
      "Annual influenza recommended for all theatre staff and high-risk patients",
    ],
  },
  {
    key: "subunit",
    name: "Subunit / conjugate / VLP",
    shortName: "Subunit",
    color: "hsl(45, 85%, 50%)",
    principle: "Purified antigen — protein, polysaccharide, conjugate, or virus-like particle",
    examples: ["Hepatitis B (recombinant HBsAg)", "HPV (VLP)", "Acellular pertussis", "Pneumococcal conjugate (PCV13/15/20)", "Meningococcal ACWY conjugate", "Hib conjugate", "Recombinant zoster (Shingrix)"],
    arms: { bCellAb: 4, cd4Th: 3, cd8Ctl: 1, mucosalIgA: 1 },
    memory: "Strong humoral; conjugation to carrier protein (CRM197, tetanus toxoid) converts T-independent polysaccharide → T-dependent response with class switch and memory",
    durability: "Years to decades with conjugate; pure polysaccharide (PPV23) gives ~5 yr only",
    boosters: "Conjugate: long-lived; PPV23: 5 yearly in asplenic",
    coldChain: "Standard 2–8 °C; do NOT freeze (alum/AS01 adjuvants damaged). Generally robust — suitable for low-resource settings.",
    pros: ["Very safe — no infectious material", "Suitable for immunocompromised", "Targeted antigen → fewer reactogenic side effects"],
    cons: ["Often need adjuvant (alum, AS01, AS04)", "Limited CTL response"],
    anaesthetic: [
      "ASPLENIC / hyposplenic patients: PCV13/20 + PPV23 + MenACWY + MenB + Hib — ideally ≥2 weeks before elective splenectomy",
      "Hep B: pre-exposure for healthcare workers; check anti-HBs ≥10 mIU/mL post-vaccination",
      "Recombinant zoster (Shingrix) preferred over live Zostavax in ICU survivors and immunocompromised",
    ],
  },
  {
    key: "toxoid",
    name: "Toxoid",
    shortName: "Toxoid",
    color: "hsl(150, 55%, 40%)",
    principle: "Inactivated bacterial exotoxin (formalin-treated)",
    examples: ["Tetanus", "Diphtheria"],
    arms: { bCellAb: 4, cd4Th: 3, cd8Ctl: 0, mucosalIgA: 0 },
    memory: "Anti-toxin neutralising IgG, T-cell help via carrier — robust and long-lived",
    durability: "10 years",
    boosters: "Booster every 10 yr; tetanus-prone wound → assess immunisation status, give booster ± tetanus immunoglobulin (TIG)",
    coldChain: "Standard 2–8 °C, do not freeze. Among the most thermostable vaccines — tolerates short excursions; ideal for field use.",
    pros: ["Excellent neutralising antibody", "Very safe"],
    cons: ["Only protects against toxin-mediated disease, not colonisation"],
    anaesthetic: [
      "Trauma / contaminated wound: confirm tetanus status — last dose <10 yr ago = nothing; >10 yr or unknown = booster ± human TIG (250 IU IM, 500 IU if heavily contaminated/delayed)",
      "Tetanus toxoid is also the carrier protein in many conjugate vaccines (Hib-TT)",
    ],
  },
  {
    key: "mrna",
    name: "mRNA",
    shortName: "mRNA",
    color: "hsl(200, 75%, 50%)",
    principle: "Lipid nanoparticle delivers mRNA encoding antigen → host cells translate antigen and present on MHC-I and MHC-II",
    examples: ["COVID-19: BNT162b2 (Pfizer), mRNA-1273 (Moderna)", "RSV (mRNA-1345)", "Investigational: influenza, CMV, cancer neoantigen vaccines"],
    arms: { bCellAb: 4, cd4Th: 4, cd8Ctl: 4, mucosalIgA: 1 },
    memory: "Balanced humoral + cellular; strong CD8⁺ priming because antigen synthesised endogenously and loaded on MHC-I",
    durability: "Months to ~1 year for circulating IgG; T-cell memory more durable",
    boosters: "Variant-updated boosters required (e.g. annually for COVID-19 in high-risk groups)",
    coldChain: "Ultra-cold originally — Pfizer/BNT162b2 −80 to −60 °C, Moderna −25 to −15 °C. Now relaxed to 2–8 °C for limited days. LNP fragility = the central logistical challenge of mRNA platforms.",
    pros: ["Rapid design & manufacture (<2 weeks from sequence)", "No infectious material", "Strong cellular + humoral arm"],
    cons: ["Cold chain (−70 °C original, now relaxed)", "Reactogenicity (myalgia, fever)", "Rare myocarditis in young males (1 in ~30,000)"],
    anaesthetic: [
      "Defer elective surgery 1 week post-COVID booster if reactogenic symptoms (UK consensus)",
      "Myocarditis after mRNA COVID vaccine (peak 2–7 d post 2nd dose) — assess troponin/ECG if symptomatic, defer non-urgent surgery 3–6 months",
      "Safe in pregnancy and immunocompromised (no live virus)",
    ],
  },
  {
    key: "vector",
    name: "Viral vector",
    shortName: "Viral vector",
    color: "hsl(280, 60%, 55%)",
    principle: "Replication-deficient virus (e.g. chimp adenovirus, Ad26) carries gene encoding antigen → host cells express antigen",
    examples: ["COVID-19: ChAdOx1 (AstraZeneca), Ad26.COV2.S (Janssen), Sputnik V (Ad26 + Ad5)", "Ebola (rVSV-ZEBOV)", "Dengue (CYD-TDV — chimeric YF backbone)"],
    arms: { bCellAb: 4, cd4Th: 4, cd8Ctl: 4, mucosalIgA: 1 },
    memory: "Strong humoral and CD8⁺ CTL via endogenous antigen expression; anti-vector immunity may limit boosting",
    durability: "Months to years; heterologous prime-boost (vector + mRNA) often used",
    boosters: "Anti-vector immunity reduces efficacy of repeat doses with same vector",
    coldChain: "Standard 2–8 °C — major advantage over mRNA. ChAdOx1 stable for 6 months refrigerated; well-suited to low-resource settings (the original rationale for the Oxford platform).",
    pros: ["Strong cellular + humoral response", "Single-dose options (Ad26.COV2.S)", "Good thermostability vs mRNA"],
    cons: ["Anti-vector immunity", "Vaccine-induced thrombotic thrombocytopenia (VITT) with ChAdOx1/Ad26 — rare but serious"],
    anaesthetic: [
      "VITT (4–28 days post adenoviral COVID vaccine): thrombosis (CVST, splanchnic) + thrombocytopenia, raised D-dimer, anti-PF4 antibodies (HIT-like)",
      "Treat as autoimmune HIT — non-heparin anticoagulant (argatroban, fondaparinux), IVIG 1 g/kg, AVOID heparin and platelet transfusion",
      "Defer elective surgery if recent VITT until platelets recovered and on stable anticoagulation",
    ],
  },
];

const ARM_LABELS: { key: keyof ImmuneArmScore; label: string; subtitle: string }[] = [
  { key: "bCellAb", label: "B cell / Antibody", subtitle: "IgG titre, neutralising Ab" },
  { key: "cd4Th", label: "CD4⁺ T helper", subtitle: "Th1 / Tfh — coordinates response" },
  { key: "cd8Ctl", label: "CD8⁺ Cytotoxic", subtitle: "Kills infected cells (MHC-I)" },
  { key: "mucosalIgA", label: "Mucosal IgA", subtitle: "Secretory IgA at portal of entry" },
];

const coldChainShort = (k: VaccineKey): string => {
  switch (k) {
    case "live": return "2–8 °C, strict";
    case "inactivated": return "2–8 °C, no freeze";
    case "subunit": return "2–8 °C, no freeze";
    case "toxoid": return "2–8 °C, robust";
    case "mrna": return "−80 to −20 °C";
    case "vector": return "2–8 °C, 6 mo";
  }
};

export const VaccineTypesDiagram = () => {
  const [selected, setSelected] = useState<VaccineKey>("live");
  const [compareMode, setCompareMode] = useState(false);
  const active = useMemo(() => VACCINES.find(v => v.key === selected)!, [selected]);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header / mode toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-secondary/30 border-b border-border">
        <p className="text-xs text-muted-foreground">Select a platform to inspect — or switch to Compare to see all four immune arms side-by-side.</p>
        <button
          type="button"
          onClick={() => setCompareMode(c => !c)}
          aria-pressed={compareMode}
          className={`px-2 py-1 rounded border text-xs transition-colors ${
            compareMode ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-muted/50"
          }`}
        >
          Compare all {compareMode ? "✓" : "○"}
        </button>
      </div>

      {/* Vaccine selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 p-3 border-b border-border">
        {VACCINES.map(v => {
          const isActive = v.key === selected;
          return (
                <button
              key={v.key}
              type="button"
              onClick={() => setSelected(v.key)}
              aria-pressed={isActive}
              className="px-2 py-2 rounded-lg border-2 text-left transition-all"
              style={{
                borderColor: isActive ? v.color : "hsl(var(--border))",
                backgroundColor: isActive ? withAlpha(v.color, 0.1) : "transparent",
              }}
            >
              <div className="text-xs font-bold" style={{ color: isActive ? v.color : "hsl(var(--foreground))" }}>
                {v.shortName}
              </div>
            </button>
  );
        })}
      </div>

      {/* Compare mode: 4×6 matrix */}
      {compareMode ? (
        <div className="p-3 overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[560px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 pr-2 text-muted-foreground font-semibold">Immune arm</th>
                {VACCINES.map(v => (
                  <th key={v.key} className="text-center py-2 px-1 font-semibold" style={{ color: v.color }}>
                    {v.shortName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ARM_LABELS.map(arm => (
                <tr key={arm.key} className="border-b border-border/50">
                  <td className="py-2 pr-2">
                    <div className="font-medium text-foreground">{arm.label}</div>
                    <div className="text-[10px] text-muted-foreground">{arm.subtitle}</div>
                  </td>
                  {VACCINES.map(v => (
                    <td key={v.key} className="text-center py-2 px-1">
                      <ArmStrengthBar score={v.arms[arm.key]} color={v.color} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-border/50">
                <td className="py-2 pr-2">
                  <div className="font-medium text-foreground flex items-center gap-1">
                    <span aria-hidden>❄</span> Cold chain
                  </div>
                  <div className="text-[10px] text-muted-foreground">Storage temperature</div>
                </td>
                {VACCINES.map(v => (
                  <td key={v.key} className="text-center py-2 px-1 text-[10px] text-muted-foreground leading-tight">
                    {coldChainShort(v.key)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <p className="text-[10px] text-muted-foreground mt-2 italic">
            Bars: 0 = none, 4 = strongest. Live attenuated and mRNA/vector platforms uniquely prime CD8⁺ CTLs because antigen reaches MHC-I from the cytoplasm. mRNA's ultra-cold chain remains its biggest deployment hurdle.
          </p>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {/* Title + principle */}
          <div>
            <h4 className="text-base font-serif font-bold mb-1" style={{ color: active.color }}>
              {active.name}
            </h4>
            <p className="text-xs text-muted-foreground">{active.principle}</p>
          </div>

          {/* Immune arm bars */}
          <div className="rounded-lg border p-3" style={{ borderColor: withAlpha(active.color, 0.4), backgroundColor: withAlpha(active.color, 0.05) }}>
            <div className="text-[10px] uppercase tracking-wide font-semibold mb-2" style={{ color: active.color }}>
              Immune arms primed
            </div>
            <div className="space-y-1.5">
              {ARM_LABELS.map(arm => (
                <div key={arm.key} className="grid grid-cols-[120px_1fr_24px] sm:grid-cols-[160px_1fr_24px] items-center gap-2">
                  <div className="text-xs">
                    <div className="font-medium text-foreground">{arm.label}</div>
                    <div className="text-[9px] text-muted-foreground leading-tight">{arm.subtitle}</div>
                  </div>
                  <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{ width: `${(active.arms[arm.key] / 4) * 100}%`, backgroundColor: active.color }}
                    />
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono text-right">{active.arms[arm.key]}/4</div>
                </div>
              ))}
            </div>
          </div>

          {/* Memory + durability + boosters + cold chain */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <MetaCard label="Memory profile" value={active.memory} color={active.color} />
            <MetaCard label="Durability" value={active.durability} color={active.color} />
            <MetaCard label="Boosters" value={active.boosters} color={active.color} />
            <MetaCard label="Cold chain / storage" value={active.coldChain} color={active.color} icon="❄" />
          </div>

          {/* Examples */}
          <DetailBlock title="Examples in current use" items={active.examples} color={active.color} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <DetailBlock title="Pros" items={active.pros} color={active.color} />
            <DetailBlock title="Cons" items={active.cons} color={active.color} />
          </div>

          <DetailBlock title="Anaesthetic / Perioperative Relevance" items={active.anaesthetic} color={active.color} highlight />
        </div>
      )}
    </div>
  );
};

const ArmStrengthBar = ({ score, color }: { score: number; color: string }) => (
  <div className="flex items-center justify-center gap-0.5">
    {[0, 1, 2, 3].map(i => (
      <div
        key={i}
        className="w-2 h-4 rounded-sm"
        style={{ backgroundColor: i < score ? color : withAlpha(color, 0.15) }}
      />
    ))}
  </div>
);

const MetaCard = ({ label, value, color, icon }: { label: string; value: string; color: string; icon?: string }) => (
  <div className="rounded-lg border border-border p-2.5">
    <div className="text-[10px] uppercase tracking-wide font-semibold mb-1 flex items-center gap-1" style={{ color }}>
      {icon && <span aria-hidden>{icon}</span>}
      {label}
    </div>
    <div className="text-xs text-muted-foreground leading-relaxed">{value}</div>
  </div>
);

interface DetailBlockProps {
  title: string;
  items: string[];
  color: string;
  highlight?: boolean;
}

const DetailBlock = ({ title, items, color, highlight }: DetailBlockProps) => (
    <DiagramFigure
      id="vaccine-types-diagram"
      title="Vaccine types"
      description="Auto-generated wrapper for the Vaccine types anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
            <div
      className="rounded-lg border p-3"
      style={{
        borderColor: highlight ? withAlpha(color, 0.4) : "hsl(var(--border))",
        backgroundColor: highlight ? withAlpha(color, 0.05) : "transparent",
      }}
    >
      <div className="text-[10px] uppercase tracking-wide font-semibold mb-1.5" style={{ color }}>
        {title}
      </div>
      <ul className="space-y-1 text-xs text-muted-foreground leading-relaxed">
        {items.map((item, i) => (
          <li key={i} className="flex gap-1.5">
            <span style={{ color }}>•</span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
    </DiagramFigure>
  );

export default VaccineTypesDiagram;
