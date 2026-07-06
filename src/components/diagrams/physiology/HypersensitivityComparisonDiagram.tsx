import { useMemo, useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramFigure } from "./_shared/DiagramFigure";

type TypeKey = "I" | "II" | "III" | "IV";

interface HSData {
  key: TypeKey;
  name: string;
  shortName: string;
  color: string;
  mediator: string;
  timing: string;
  timingBand: { startHr: number; endHr: number; peakHr: number };
  mechanism: string[];
  examples: string[];
  anaesthetic: string[];
  diagnosis: string[];
  management: string[];
}

const TYPES: HSData[] = [
  {
    key: "I",
    name: "Type I — Immediate (IgE)",
    shortName: "Type I",
    color: "hsl(0, 75%, 55%)",
    mediator: "IgE on mast cells / basophils",
    timing: "Seconds–minutes (peak ~10–30 min)",
    timingBand: { startHr: 0, endHr: 1, peakHr: 0.25 },
    mechanism: [
      "Prior sensitisation: allergen → Th2 → IL-4/IL-13 → B-cell IgE class switch",
      "IgE binds high-affinity FcεRI on mast cells / basophils",
      "Re-exposure: allergen cross-links surface IgE → degranulation",
      "Release of preformed (histamine, tryptase, heparin) and newly synthesised mediators (leukotrienes C4/D4/E4, PGD2, PAF, TNF-α)",
      "Vasodilation, ↑ permeability, bronchoconstriction, ↑ secretions",
    ],
    examples: [
      "Anaphylaxis (NMBAs, antibiotics, latex, chlorhexidine)",
      "Allergic asthma, allergic rhinitis",
      "Urticaria, angioedema",
      "Food and venom allergy",
    ],
    anaesthetic: [
      "Perioperative anaphylaxis: NMBAs (rocuronium, suxamethonium) account for ~60% UK cases (NAP6)",
      "Other triggers: chlorhexidine, antibiotics (teicoplanin, co-amoxiclav), patent blue dye, latex",
      "Treat: stop trigger, 100% O₂, IM/IV adrenaline (50 µg IV titrated under GA), fluids, airway",
      "Investigate: mast cell tryptase at 1–2 h, 4 h, and >24 h baseline; refer to allergy clinic for skin prick / specific IgE",
    ],
    diagnosis: [
      "Acute serum tryptase (peaks 1–2 h, returns to baseline by 24 h)",
      "Skin prick / intradermal testing (gold standard, ≥4 weeks post-event)",
      "Specific IgE (RAST) — useful for latex, β-lactams",
    ],
    management: [
      "Adrenaline first-line — IM 500 µg (adult), or IV 50 µg titrated",
      "Remove trigger, 100% O₂, IV fluid bolus 20 mL/kg",
      "Adjuncts: chlorphenamine 10 mg, hydrocortisone 200 mg (no longer routine in UK Resus 2021)",
      "Refractory: adrenaline infusion, glucagon (β-blocked patients), vasopressin",
    ],
  },
  {
    key: "II",
    name: "Type II — Cytotoxic (IgG / IgM)",
    shortName: "Type II",
    color: "hsl(25, 85%, 50%)",
    mediator: "IgG / IgM against cell-surface antigen",
    timing: "Minutes–hours (transfusion) up to days",
    timingBand: { startHr: 0.1, endHr: 24, peakHr: 4 },
    mechanism: [
      "Antibody binds antigen on cell surface (RBC, platelet, basement membrane)",
      "Three effector pathways:",
      "  1. Complement activation (classical) → MAC → cell lysis",
      "  2. Opsonisation → phagocytosis (spleen, liver)",
      "  3. ADCC by NK cells via FcγRIII",
      "May also alter receptor function (Graves, myasthenia)",
    ],
    examples: [
      "Acute haemolytic transfusion reaction (ABO mismatch)",
      "Haemolytic disease of the newborn (anti-D)",
      "Autoimmune haemolytic anaemia, ITP",
      "Goodpasture's, pemphigus, myasthenia gravis, Graves'",
      "Heparin-induced thrombocytopenia (HIT) — IgG vs PF4-heparin",
    ],
    anaesthetic: [
      "ABO mismatch transfusion → fever, loin/chest pain, hypotension, haemoglobinuria, DIC — most lethal transfusion reaction",
      "HIT type II at 5–14 d of heparin → paradoxical thrombosis; stop heparin, use argatroban / fondaparinux",
      "Myasthenia: ↑ sensitivity to non-depolarisers, resistance to suxamethonium; avoid where possible",
      "Goodpasture / anti-GBM: pulmonary haemorrhage risk peri-op",
    ],
    diagnosis: [
      "Direct antiglobulin (Coombs) test for haemolysis",
      "HIT: 4Ts score + anti-PF4 ELISA, confirmatory SRA",
      "Autoantibody panels (ANA, anti-ACh-R, anti-GBM)",
    ],
    management: [
      "Transfusion reaction: stop, fluids, support BP, urine output, treat DIC",
      "HIT: stop all heparin (incl. flushes), non-heparin anticoagulant",
      "Autoimmune: steroids, IVIG, plasmapheresis, rituximab",
    ],
  },
  {
    key: "III",
    name: "Type III — Immune Complex",
    shortName: "Type III",
    color: "hsl(265, 60%, 55%)",
    mediator: "Soluble IgG + antigen complexes",
    timing: "Hours–weeks (peak 7–10 days)",
    timingBand: { startHr: 4, endHr: 24 * 21, peakHr: 24 * 8 },
    mechanism: [
      "Soluble antigen + IgG → small immune complexes circulate",
      "Deposit in vessel walls, glomeruli, synovium, skin (where flow turbulent or pressures high)",
      "Activate complement (classical) → C3a, C5a → neutrophil recruitment",
      "Neutrophils release proteases, ROS → vasculitis and tissue damage",
      "Arthus reaction = local form (intradermal antigen in pre-immune host)",
    ],
    examples: [
      "Serum sickness (heterologous antiserum, anti-venom, ATG)",
      "SLE (anti-dsDNA complexes → glomerulonephritis)",
      "Post-streptococcal glomerulonephritis",
      "Hypersensitivity pneumonitis (farmer's lung, bird-fancier's)",
      "Polyarteritis nodosa, cryoglobulinaemic vasculitis",
    ],
    anaesthetic: [
      "SLE: assess renal function, coagulopathy (lupus anticoagulant — paradoxical thrombosis), valvular disease (Libman–Sacks)",
      "Steroid-treated patients → adrenal supplementation",
      "Rare reaction to heterologous protein products (e.g. anti-venoms, ATG used in transplant ICU)",
      "Vasculitides: airway involvement (GPA), renal failure, hypertension",
    ],
    diagnosis: [
      "Low complement (C3, C4 consumed)",
      "Detect specific immune complexes / autoantibodies (anti-dsDNA, ANCA)",
      "Renal biopsy with immunofluorescence — granular IgG/C3 deposits",
    ],
    management: [
      "Remove or treat antigen source",
      "Steroids, immunosuppression (cyclophosphamide, MMF, rituximab)",
      "Plasmapheresis for severe disease",
    ],
  },
  {
    key: "IV",
    name: "Type IV — Delayed (T-cell)",
    shortName: "Type IV",
    color: "hsl(150, 55%, 40%)",
    mediator: "Sensitised T cells (Th1, Th17, CD8⁺)",
    timing: "48–72 h (up to weeks for granulomatous)",
    timingBand: { startHr: 24, endHr: 24 * 7, peakHr: 60 },
    mechanism: [
      "Sensitisation phase: APC presents antigen on MHC-II → naïve CD4⁺ → Th1 (IFN-γ) / Th17 memory",
      "Re-exposure: memory T cells release cytokines",
      "IFN-γ activates macrophages → nitric oxide, ROS, TNF-α",
      "CD8⁺ cytotoxic T cells kill target cells (perforin/granzyme, Fas-FasL)",
      "Granulomatous form: chronic antigen → epithelioid + giant cells (TB, sarcoid)",
    ],
    examples: [
      "Contact dermatitis (nickel, latex chemicals, chlorhexidine, neomycin)",
      "Tuberculin (Mantoux) reaction, IGRA",
      "Drug rashes — SJS / TEN, DRESS, fixed drug eruption",
      "Chronic transplant rejection",
      "Coeliac disease, granulomatous disease (TB, sarcoid, Crohn's)",
    ],
    anaesthetic: [
      "Latex contact dermatitis ≠ Type I latex anaphylaxis — but indicates sensitisation; use latex-free where possible",
      "Chlorhexidine contact dermatitis on hands of staff; rare progression to Type I",
      "Drug-induced SJS/TEN: stop suspect drug, ICU/burns referral, supportive care, IVIG/ciclosporin contentious",
      "Solid-organ transplant patients on chronic immunosuppression — infection and steroid considerations",
    ],
    diagnosis: [
      "Patch testing (gold standard for contact dermatitis)",
      "Tuberculin / IGRA (interferon-γ release)",
      "Skin biopsy — perivascular lymphocytic infiltrate ± granulomas",
    ],
    management: [
      "Avoid trigger; topical / systemic steroids",
      "SJS/TEN: stop drug, supportive, fluid + nutrition, ophthalmic care",
      "Granulomatous disease: treat underlying (anti-TB, steroids for sarcoid)",
    ],
  },
];

export const HypersensitivityComparisonDiagram = () => {
  const [selected, setSelected] = useState<TypeKey>("I");
  const active = useMemo(() => TYPES.find(t => t.key === selected)!, [selected]);

  // Timeline scale: log scale from 0.1 h (6 min) to 504 h (3 weeks)
  const minHr = 0.1;
  const maxHr = 24 * 21;
  const logScale = (h: number) => {
    const v = Math.log10(h / minHr) / Math.log10(maxHr / minHr);
    return Math.max(0, Math.min(1, v));
  };

  return (
    <DiagramFigure
      id="hypersensitivity-comparison-diagram"
      title="Hypersensitivity comparison"
      description="Auto-generated wrapper for the Hypersensitivity comparison anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Type selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-3 bg-secondary/30 border-b border-border">
          {TYPES.map(t => {
            const isActive = t.key === selected;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setSelected(t.key)}
                aria-pressed={isActive}
                className="px-3 py-2 rounded-lg border-2 text-left transition-all"
                style={{
                  borderColor: isActive ? t.color : "hsl(var(--border))",
                  backgroundColor: isActive ? withAlpha(t.color, 0.1) : "transparent",
                }}
              >
                <div className="text-xs font-bold" style={{ color: isActive ? t.color : "hsl(var(--foreground))" }}>
                  {t.shortName}
                </div>
                <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{t.mediator}</div>
              </button>
            );
          })}
        </div>
  
        {/* Timeline strip */}
        <div className="px-3 py-3 border-b border-border bg-background">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5 font-semibold">
            Time course (log scale)
          </div>
          <div className="relative h-8 rounded-md bg-secondary/40 overflow-hidden">
            {TYPES.map(t => {
              const left = logScale(t.timingBand.startHr) * 100;
              const right = logScale(t.timingBand.endHr) * 100;
              const peak = logScale(t.timingBand.peakHr) * 100;
              const isActive = t.key === selected;
              return (
                    <div
                  key={t.key}
                  className="absolute top-0 bottom-0 transition-opacity"
                  style={{
                    left: `${left}%`,
                    width: `${Math.max(2, right - left)}%`,
                    backgroundColor: withAlpha(t.color, isActive ? 0.4 : 0.12),
                    borderLeft: `2px solid ${withAlpha(t.color, isActive ? 1 : 0.3)}`,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  title={`${t.shortName}: ${t.timing}`}
                >
                  <div
                    className="absolute top-0 bottom-0 w-0.5"
                    style={{ left: `${((peak - left) / Math.max(0.5, right - left)) * 100}%`, backgroundColor: t.color }}
                  />
                </div>
    );
            })}
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground mt-1 font-mono">
            <span>6 min</span>
            <span>1 h</span>
            <span>1 day</span>
            <span>1 wk</span>
            <span>3 wk</span>
          </div>
          <div className="text-xs mt-2" style={{ color: active.color }}>
            <strong>{active.shortName}:</strong> {active.timing}
          </div>
        </div>
  
        {/* Detail panels */}
        <div className="p-4 space-y-3">
          <div>
            <h4 className="text-base font-serif font-bold mb-1" style={{ color: active.color }}>
              {active.name}
            </h4>
            <p className="text-xs text-muted-foreground">Mediator: <strong className="text-foreground">{active.mediator}</strong></p>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <DetailBlock title="Mechanism" items={active.mechanism} color={active.color} mono />
            <DetailBlock title="Classic Examples" items={active.examples} color={active.color} />
            <DetailBlock title="Anaesthetic Relevance" items={active.anaesthetic} color={active.color} highlight />
            <div className="space-y-3">
              <DetailBlock title="Diagnosis" items={active.diagnosis} color={active.color} />
              <DetailBlock title="Management" items={active.management} color={active.color} />
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

interface DetailBlockProps {
  title: string;
  items: string[];
  color: string;
  highlight?: boolean;
  mono?: boolean;
}

const DetailBlock = ({ title, items, color, highlight, mono }: DetailBlockProps) => (
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
    <ul className={`space-y-1 text-xs text-muted-foreground leading-relaxed ${mono ? "font-mono text-[11px]" : ""}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-1.5">
          <span style={{ color }}>•</span>
          <span className="flex-1">{item}</span>
        </li>
      ))}
    </ul>
  </div>
  );

export default HypersensitivityComparisonDiagram;
