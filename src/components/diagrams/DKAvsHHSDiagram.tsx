import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Side-by-side comparison of Diabetic Ketoacidosis (DKA) vs Hyperosmolar
 * Hyperglycaemic State (HHS) — the two ends of the spectrum of hyperglycaemic
 * emergency. Tap a row to see the teaching point that distinguishes them.
 */

type RowKey =
  | "patient"
  | "onset"
  | "glucose"
  | "ketones"
  | "ph"
  | "osm"
  | "dehydration"
  | "consciousness"
  | "treatment"
  | "complication"
  | "mortality";

const ROWS: Array<{
  key: RowKey;
  label: string;
  dka: string;
  hhs: string;
  detail: string;
}> = [
  {
    key: "patient",
    label: "Typical patient",
    dka: "T1DM (any age) · new-onset T1DM · missed insulin",
    hhs: "Elderly T2DM · often undiagnosed · care-home / dehydrated",
    detail:
      "DKA is a disease of absolute insulin lack. HHS occurs in patients with enough endogenous insulin to suppress ketogenesis but not enough to control glycaemia.",
  },
  {
    key: "onset",
    label: "Onset",
    dka: "Hours – 1–2 days",
    hhs: "Days – weeks (insidious)",
    detail:
      "The slower onset of HHS allows extreme dehydration and hyperosmolality to develop before presentation.",
  },
  {
    key: "glucose",
    label: "Glucose",
    dka: "> 11 mmol/L (often 14–30)",
    hhs: "> 30 mmol/L (often 40–60+)",
    detail:
      "HHS is defined by marked hyperglycaemia with osmolality > 320 mOsm/kg. Glucose values are typically much higher than in DKA.",
  },
  {
    key: "ketones",
    label: "Ketones",
    dka: "≥ 3 mmol/L (or 2+ on dipstick)",
    hhs: "Mild / absent (< 3 mmol/L)",
    detail:
      "Residual insulin in HHS suppresses lipolysis enough to prevent significant ketogenesis — the cardinal differentiator.",
  },
  {
    key: "ph",
    label: "pH / HCO₃⁻",
    dka: "pH < 7.30 · HCO₃⁻ < 15",
    hhs: "pH > 7.30 · HCO₃⁻ > 15 (often normal)",
    detail:
      "Without significant ketogenesis HHS does not cause a high-anion-gap acidosis, although mild lactic acidosis from hypoperfusion can be present.",
  },
  {
    key: "osm",
    label: "Osmolality",
    dka: "Variable (often 300–320)",
    hhs: "> 320 mOsm/kg (calc. 2[Na⁺] + glucose + urea)",
    detail:
      "HHS diagnostic threshold is osmolality > 320 mOsm/kg. Use the calculated value as a target for slow correction.",
  },
  {
    key: "dehydration",
    label: "Fluid deficit",
    dka: "~100 ml/kg (5–10 L)",
    hhs: "100–220 ml/kg (8–12 L) — far worse",
    detail:
      "HHS patients can be 10–15 % of body weight depleted. Replace half the deficit over the first 12 h, the rest over the next 12 h, monitoring for cerebral oedema and pontine myelinolysis.",
  },
  {
    key: "consciousness",
    label: "Conscious level",
    dka: "Usually alert (drowsy if severe)",
    hhs: "Often obtunded / coma — proportional to osmolality",
    detail:
      "HHS coma correlates with calculated osmolality > 340 mOsm/kg. Reduced consciousness in DKA suggests very severe acidosis or cerebral oedema.",
  },
  {
    key: "treatment",
    label: "Treatment differences",
    dka: "Fixed-rate insulin 0.1 U/kg/h immediately + 0.9% NaCl",
    hhs: "0.9% NaCl FIRST · insulin only after fluids running, lower rate (0.05 U/kg/h)",
    detail:
      "In HHS, fluids alone usually drop glucose substantially. Adding insulin too early causes rapid osmotic shift → cerebral oedema and central pontine myelinolysis. Aim for glucose fall ≤ 5 mmol/L/h and Na⁺ change ≤ 10 mmol/L/24 h.",
  },
  {
    key: "complication",
    label: "Key complications",
    dka: "Cerebral oedema (especially paeds), hypokalaemia, AKI",
    hhs: "VTE (very high — give LMWH), AKI, foot ulceration, MI/CVA, pontine myelinolysis",
    detail:
      "HHS has a strikingly high VTE risk — prophylactic LMWH should be standard unless contraindicated.",
  },
  {
    key: "mortality",
    label: "Mortality",
    dka: "1–5 %",
    hhs: "10–20 %",
    detail:
      "Higher HHS mortality reflects elderly comorbid patients and the precipitating illness rather than the metabolic derangement itself.",
  },
];

const DKAvsHHSDiagram = () => {
  const [selected, setSelected] = useState<RowKey>("ketones");
  const sel = ROWS.find((r) => r.key === selected)!;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <div className="mb-3">
          <h3 className="text-base sm:text-lg font-serif font-semibold text-foreground">
            DKA vs HHS — the hyperglycaemic emergency spectrum
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            JBDS-IP 2023 / 2022. Tap a row to see the teaching point.
          </p>
        </div>

        <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] text-xs">
          {/* Header */}
          <div className="px-2 py-1.5 font-semibold text-[10px] uppercase tracking-wider text-muted-foreground">
            Feature
          </div>
          <div className="px-2 py-1.5 font-semibold text-[10px] uppercase tracking-wider text-clinical text-center bg-clinical/10 rounded-tl-md">
            DKA
          </div>
          <div className="px-2 py-1.5 font-semibold text-[10px] uppercase tracking-wider text-pharmacology text-center bg-pharmacology/10 rounded-tr-md">
            HHS
          </div>

          {/* Rows */}
          {ROWS.map((r, i) => {
            const isSel = r.key === selected;
            const isLast = i === ROWS.length - 1;
            return (
              <button
                key={r.key}
                type="button"
                onClick={() => setSelected(r.key)}
                aria-pressed={isSel}
                className={cn(
                  "contents text-left",
                )}
              >
                <span
                  className={cn(
                    "px-2 py-1.5 border-t border-border text-foreground font-medium transition-colors",
                    isSel && "bg-primary/10 text-primary",
                    isLast && "rounded-bl-md",
                  )}
                >
                  {r.label}
                </span>
                <span
                  className={cn(
                    "px-2 py-1.5 border-t border-border text-muted-foreground bg-clinical/5 transition-colors",
                    isSel && "bg-clinical/15 text-foreground",
                  )}
                >
                  {r.dka}
                </span>
                <span
                  className={cn(
                    "px-2 py-1.5 border-t border-border text-muted-foreground bg-pharmacology/5 transition-colors",
                    isSel && "bg-pharmacology/15 text-foreground",
                    isLast && "rounded-br-md",
                  )}
                >
                  {r.hhs}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="mt-3 rounded-md border-l-4 border-primary/60 bg-card px-3 py-2 min-h-[64px]">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
            {sel.label}
          </p>
          <p className="text-sm text-foreground leading-relaxed">{sel.detail}</p>
        </div>
      </div>
    </div>
  );
};

export default DKAvsHHSDiagram;
