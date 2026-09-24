import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * "Should I give steroids?" decision tree for the unwell pneumonia patient.
 * Synthesises CAPE COD 2023, RECOVERY 2021, ATS/IDSA 2024, ESICM/SCCM 2024,
 * SURVIVING SEPSIS 2021, and Bozzette 1990 (PJP).
 */

type Severity = "ward" | "icu" | null;
type Pathogen = "covid" | "bacterial" | "influenza" | "pjp" | "unknown" | null;
type Shock = "yes" | "no" | null;

interface Outcome {
  verdict: "give" | "consider" | "avoid";
  headline: string;
  regimen: string;
  evidence: string;
  caveats: string[];
}

const VERDICT_STYLE: Record<Outcome["verdict"], { color: string; label: string; bg: string }> = {
  give: { color: "hsl(142 60% 40%)", label: "✓ Give steroids", bg: "hsl(142 60% 40% / 0.08)" },
  consider: { color: "hsl(35 90% 45%)", label: "⚠ Consider — case-by-case", bg: "hsl(35 90% 45% / 0.08)" },
  avoid: { color: "hsl(0 80% 50%)", label: "✗ Avoid routine steroids", bg: "hsl(0 80% 50% / 0.08)" },
};

const decide = (sev: Severity, path: Pathogen, shock: Shock, contras: Set<string>): Outcome | null => {
  if (!sev || !path) return null;
  if (path !== "pjp" && shock === null) return null;

  // Hard contraindications first
  if (contras.has("active-gi-bleed")) {
    return {
      verdict: "avoid",
      headline: "Active GI bleeding — withhold until controlled",
      regimen: "Stabilise haemorrhage; co-prescribe PPI before any steroid.",
      evidence: "Pragmatic — steroid hyperglycaemia & mucosal effects compound bleeding risk.",
      caveats: ["Reconsider once endoscopically controlled and haemodynamically stable."],
    };
  }

  // PJP — separate pathway
  if (path === "pjp") {
    return {
      verdict: "give",
      headline: "HIV-PJP with hypoxia — adjunctive corticosteroid indicated",
      regimen: "Prednisolone 40 mg BD × 5 d → 40 mg OD × 5 d → 20 mg OD × 11 d. Start within 72 h of co-trimoxazole.",
      evidence: "Bozzette NEJM 1990 — mortality ↓ in HIV-PJP with PaO₂ <9.3 kPa or A–a >4.7 kPa on room air.",
      caveats: [
        "Evidence weaker in non-HIV PJP (haematology/transplant) but most centres extrapolate the same regimen.",
        "Screen / treat strongyloides if from endemic area.",
      ],
    };
  }

  // COVID-19
  if (path === "covid") {
    if (sev === "ward" && contras.has("no-oxygen")) {
      return {
        verdict: "avoid",
        headline: "COVID-19 not requiring oxygen — no benefit, signal of harm",
        regimen: "Do not give dexamethasone. Standard supportive care.",
        evidence: "RECOVERY 2021 — benefit confined to patients on O₂ or ventilation; subgroup not on O₂ trended to harm.",
        caveats: ["Re-evaluate if oxygen requirement develops."],
      };
    }
    return {
      verdict: "give",
      headline: "Hospitalised COVID-19 requiring oxygen — give dexamethasone",
      regimen: "Dexamethasone 6 mg PO/IV OD × up to 10 days (or until discharge if sooner).",
      evidence: "RECOVERY 2021 — 28-day mortality RR 0.83 overall; RR 0.64 in ventilated subgroup.",
      caveats: [
        sev === "icu" ? "Add tocilizumab 8 mg/kg single dose if CRP ≥75 mg/L or escalating O₂/IMV (REMAP-CAP / RECOVERY)." : "Add tocilizumab if CRP ≥75 mg/L and escalating O₂.",
        "Avoid 12 mg high dose — COVID STEROID 2 & RECOVERY high-dose showed no benefit and more harm.",
        "Watch for CAPA (COVID-associated pulmonary aspergillosis) — screen BAL galactomannan if refractory fever.",
      ],
    };
  }

  // Influenza
  if (path === "influenza") {
    if (shock === "yes") {
      return {
        verdict: "consider",
        headline: "Influenza pneumonia with refractory septic shock",
        regimen: "Hydrocortisone 200 mg/day for vasopressor-dependent shock (SURVIVING SEPSIS indication, NOT pneumonia indication).",
        evidence: "Steroids in influenza alone: ↑ mortality and secondary infection (Rodrigo 2016 meta; Moreno 2018). Use only when an independent indication (shock, COPD/asthma, established ARDS) is present.",
        caveats: [
          "Ensure oseltamivir is started — antiviral is the priority intervention.",
          "Stop steroids as soon as the second indication resolves.",
        ],
      };
    }
    return {
      verdict: "avoid",
      headline: "Influenza pneumonia — avoid routine corticosteroids",
      regimen: "Oseltamivir 75 mg BD (renal-adjusted) × 5 d. Supportive care.",
      evidence: "ATS/IDSA 2024, WHO, ESICM 2024 — observational data show ↑ mortality, longer ICU stay and more bacterial superinfection.",
      caveats: [
        "Only give steroids if a separate indication appears: refractory septic shock, COPD/asthma exacerbation, established ARDS where benefits are felt to outweigh harms.",
        "Always send respiratory virus PCR before starting steroids in any winter pneumonia.",
      ],
    };
  }

  // Bacterial / unknown
  const isUnknown = path === "unknown";
  if (sev === "ward") {
    return {
      verdict: "avoid",
      headline: "Non-severe (ward-level) CAP — steroids not routinely indicated",
      regimen: "Targeted antimicrobials per local pathway. Reassess if escalation to ICU.",
      evidence: "Stern Cochrane 2023 — mortality benefit confined to severe CAP; non-severe shows reduced LOS but no mortality difference and more hyperglycaemia.",
      caveats: [
        "Re-evaluate if ICU escalation, vasopressor need, or mechanical ventilation.",
        isUnknown ? "Send respiratory viral PCR + atypical screen — exclude influenza before any escalation to steroids." : "",
      ].filter(Boolean),
    };
  }

  // ICU sCAP
  if (contras.has("immunocompromised")) {
    return {
      verdict: "consider",
      headline: "ICU sCAP in immunocompromised host — case-by-case",
      regimen: "If giving: hydrocortisone 200 mg/day × 4–7 d, then taper. Discuss with ID/microbiology.",
      evidence: "CAPE COD excluded immunocompromised patients — benefit unproven; risk of opportunistic infection (CMV, fungal, strongyloides) higher.",
      caveats: [
        "Send full opportunistic screen (β-D-glucan, galactomannan, CMV PCR) before starting.",
        "Consider empirical ivermectin if from a strongyloides-endemic area.",
      ],
    };
  }
  if (isUnknown) {
    return {
      verdict: "consider",
      headline: "Severe pneumonia, pathogen pending — confirm not influenza first",
      regimen: "Send respiratory viral PCR urgently. If influenza negative and clinical picture fits sCAP: hydrocortisone 200 mg/day × 4–7 d, then taper.",
      evidence: "CAPE COD 2023 (NNT 18) — benefit is in non-influenza ICU sCAP. Avoid empirical steroids until influenza excluded.",
      caveats: [
        "Co-prescribe insulin sliding scale — hyperglycaemia near-universal.",
        "Reassess at 48 h: continue if responding, taper earlier if rapid clinical improvement.",
      ],
    };
  }
  // Bacterial sCAP — definitive give
  return {
    verdict: "give",
    headline: "ICU severe bacterial CAP — give hydrocortisone (CAPE COD)",
    regimen: "Hydrocortisone 200 mg/day IV (50 mg QDS or continuous infusion) × 4–7 days, then taper over 8–14 days. Start within 24 h of ICU admission.",
    evidence: "CAPE COD (Dequin, NEJM 2023) — 28-day mortality 6.2% vs 11.9% (ARR 5.6%, NNT 18); less intubation and vasopressor use.",
    caveats: [
      shock === "yes" ? "Hydrocortisone 200 mg/day also covers the vasopressor-dependent shock indication (SURVIVING SEPSIS) — single regimen suffices." : "",
      "Co-prescribe PPI and insulin sliding scale.",
      "If recent travel/residence in strongyloides-endemic area: empirical ivermectin.",
    ].filter(Boolean),
  };
};

const STEP_LABEL = "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5";

const Chip = ({
  active,
  onClick,
  children,
  color = "primary",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: "primary" | "clinical" | "destructive";
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`px-2.5 py-1.5 rounded border text-xs transition-colors ${
      active
        ? color === "destructive"
          ? "border-destructive bg-destructive/10 text-foreground"
          : color === "clinical"
          ? "border-clinical bg-clinical/10 text-foreground"
          : "border-primary bg-primary/10 text-foreground"
        : "border-border text-muted-foreground hover:bg-muted/50"
    }`}
  >
    {children}
  </button>
);

const PneumoniaSteroidDecisionTree = () => {
  const [severity, setSeverity] = useState<Severity>(null);
  const [pathogen, setPathogen] = useState<Pathogen>(null);
  const [shock, setShock] = useState<Shock>(null);
  const [contras, setContras] = useState<Set<string>>(new Set());

  const toggleContra = (k: string) => {
    setContras((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const reset = () => {
    setSeverity(null);
    setPathogen(null);
    setShock(null);
    setContras(new Set());
  };

  const outcome = decide(severity, pathogen, shock, contras);
  const style = outcome ? VERDICT_STYLE[outcome.verdict] : null;

  return (
    <DiagramFigure
      id="pneumonia-steroid-decision-tree"
      title="Pneumonia steroid decision tree"
      description="'Should I give steroids?' decision tree for the unwell pneumonia patient. Synthesises CAPE COD 2023, RECOVERY 2021, ATS/IDSA 2024, ESICM/SCCM 2024, SURVIVING SEPSIS 2021, and Bozzette 1990 (PJP)."
    >
                  <div className="my-6 p-4 rounded-xl border border-border bg-card">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-lg font-serif font-bold text-foreground">"Should I give steroids?" — Pneumonia Decision Tree</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Walks through severity → pathogen → shock → contraindications. Synthesises CAPE COD 2023, RECOVERY 2021,
              ATS/IDSA 2024, ESICM/SCCM 2024, SURVIVING SEPSIS 2021, and Bozzette 1990.
            </p>
          </div>
          <button onClick={reset} type="button" className="text-xs px-2 py-1 rounded border border-border hover:bg-muted/50 text-muted-foreground">
            Reset
          </button>
        </div>
  
        <div className="space-y-3">
          {/* Step 1 — severity */}
          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className={STEP_LABEL}>Step 1 — How sick is the patient?</p>
            <div className="flex flex-wrap gap-1.5">
              <Chip active={severity === "ward"} onClick={() => setSeverity("ward")}>Ward-level (CURB-65 0–2, SpO₂ ≥94%)</Chip>
              <Chip active={severity === "icu"} onClick={() => setSeverity("icu")}>ICU-level (mech vent, HFNO, NIV, or P/F &lt;300)</Chip>
            </div>
          </div>
  
          {/* Step 2 — pathogen */}
          {severity && (
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className={STEP_LABEL}>Step 2 — Suspected / confirmed pathogen?</p>
              <div className="flex flex-wrap gap-1.5">
                <Chip active={pathogen === "covid"} onClick={() => setPathogen("covid")}>COVID-19 (SARS-CoV-2 +ve)</Chip>
                <Chip active={pathogen === "bacterial"} onClick={() => setPathogen("bacterial")}>Bacterial CAP (Strep, atypicals, Gram-neg)</Chip>
                <Chip active={pathogen === "influenza"} onClick={() => setPathogen("influenza")} color="destructive">Influenza A/B</Chip>
                <Chip active={pathogen === "pjp"} onClick={() => setPathogen("pjp")}>Pneumocystis (PJP)</Chip>
                <Chip active={pathogen === "unknown"} onClick={() => setPathogen("unknown")} color="clinical">Unknown — viral PCR pending</Chip>
              </div>
            </div>
          )}
  
          {/* Step 3 — shock (skip for PJP) */}
          {severity && pathogen && pathogen !== "pjp" && (
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className={STEP_LABEL}>Step 3 — Septic shock requiring vasopressors?</p>
              <div className="flex flex-wrap gap-1.5">
                <Chip active={shock === "yes"} onClick={() => setShock("yes")}>Yes — vasopressor-dependent</Chip>
                <Chip active={shock === "no"} onClick={() => setShock("no")}>No</Chip>
              </div>
            </div>
          )}
  
          {/* Step 4 — contraindications / modifiers */}
          {severity && pathogen && (
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className={STEP_LABEL}>Step 4 — Modifiers & contraindications (toggle any that apply)</p>
              <div className="flex flex-wrap gap-1.5">
                <Chip active={contras.has("immunocompromised")} onClick={() => toggleContra("immunocompromised")} color="clinical">Immunocompromised (haem, transplant, biologics)</Chip>
                <Chip active={contras.has("active-gi-bleed")} onClick={() => toggleContra("active-gi-bleed")} color="destructive">Active GI bleed</Chip>
                <Chip active={contras.has("uncontrolled-hyperglyc")} onClick={() => toggleContra("uncontrolled-hyperglyc")}>Uncontrolled hyperglycaemia</Chip>
                <Chip active={contras.has("strongyloides-risk")} onClick={() => toggleContra("strongyloides-risk")}>Strongyloides-endemic background</Chip>
                {pathogen === "covid" && severity === "ward" && (
                  <Chip active={contras.has("no-oxygen")} onClick={() => toggleContra("no-oxygen")} color="destructive">Not requiring supplemental O₂</Chip>
                )}
              </div>
            </div>
          )}
        </div>
  
        {/* Outcome */}
        <div className="mt-4">
          {outcome && style ? (
            <div
              className="p-4 rounded-lg border-2"
              style={{ borderColor: style.color, backgroundColor: style.bg }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <p className="text-base font-bold" style={{ color: style.color }}>
                  {style.label}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Recommendation</p>
              </div>
              <p className="text-sm font-semibold text-foreground mb-2">{outcome.headline}</p>
              <div className="p-2.5 rounded bg-background/80 border border-border mb-2">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">Regimen</p>
                <p className="text-sm text-foreground font-mono leading-snug">{outcome.regimen}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                <strong className="text-foreground">Evidence:</strong> {outcome.evidence}
              </p>
              {outcome.caveats.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Caveats & next steps</p>
                  <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                    {outcome.caveats.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-lg border border-dashed border-border bg-secondary/10 text-center text-xs text-muted-foreground">
              Complete the steps above to generate a recommendation.
            </div>
          )}
        </div>
  
        <div className="mt-3 p-2.5 rounded bg-destructive/5 border border-destructive/20 text-[11px] text-muted-foreground">
          <strong className="text-foreground">Universal rules: </strong>
          always send respiratory viral PCR + atypical screen before starting steroids in any pneumonia. Co-prescribe PPI &amp;
          insulin sliding scale. Reassess at 48 h. Treatment-decision aid only — does not replace senior clinician judgement
          or local microbiology advice.
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PneumoniaSteroidDecisionTree;
