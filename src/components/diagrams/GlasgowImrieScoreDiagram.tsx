import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Criterion {
  key: string;
  label: string;
  detail: string;
}

const criteria: Criterion[] = [
  { key: "p", label: "PaO₂ < 8 kPa", detail: "Hypoxaemia (early ARDS, atelectasis, effusion)" },
  { key: "a", label: "Age > 55 years", detail: "Reduced physiological reserve" },
  { key: "n", label: "Neutrophils (WBC) > 15 × 10⁹/L", detail: "Marker of SIRS intensity" },
  { key: "c", label: "Calcium < 2.0 mmol/L", detail: "Fat saponification by lipase" },
  { key: "r", label: "Renal urea > 16 mmol/L", detail: "Pre-renal AKI from third-space loss" },
  { key: "e", label: "Enzymes: LDH > 600 or AST > 200 IU/L", detail: "Cellular injury / necrosis" },
  { key: "alb", label: "Albumin < 32 g/L", detail: "Capillary leak, negative acute-phase" },
  { key: "s", label: "Sugar (glucose) > 10 mmol/L", detail: "β-cell dysfunction / stress hyperglycaemia" },
];

export const GlasgowImrieScoreDiagram = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const score = selected.size;
  const severe = score >= 3;

  const toggle = (k: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <p className="text-sm font-semibold text-foreground">Glasgow (Imrie) score — interactive</p>
          <p className="text-xs text-muted-foreground">
            Tick each criterion present within 48 h of admission. Score ≥ 3 = predicted severe acute pancreatitis.
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={() => setSelected(new Set())}>
          Reset
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-2">
        {criteria.map((c) => {
          const active = selected.has(c.key);
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => toggle(c.key)}
              className={`text-left p-3 rounded-lg border transition-colors ${
                active
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background hover:bg-secondary/40"
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded border text-xs font-bold transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {active ? "✓" : ""}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{c.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.detail}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[180px] h-3 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              severe ? "bg-destructive" : "bg-primary"
            }`}
            style={{ width: `${(score / criteria.length) * 100}%` }}
          />
        </div>
        <p
          className={`text-sm font-semibold ${
            severe ? "text-destructive" : "text-foreground"
          }`}
        >
          Score {score} / 8 — {severe ? "Predicted severe (refer / ICU)" : "Mild–moderate (reassess at 48 h)"}
        </p>
      </div>
    </div>
  );
};

export default GlasgowImrieScoreDiagram;
