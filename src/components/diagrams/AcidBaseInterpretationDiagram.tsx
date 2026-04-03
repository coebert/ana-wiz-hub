import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AcidBaseInterpretationDiagram = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [selectedApproach, setSelectedApproach] = useState<"hh" | "stewart">("hh");

  const algorithmSteps = [
    {
      step: 1, title: "Assess Oxygenation",
      action: "Check PaO₂ and P/F ratio",
      detail: "PaO₂ <8 kPa on air = hypoxaemia. P/F ratio: mild <40, moderate <26.7, severe <13.3 kPa. Calculate A-a gradient: PAO₂ − PaO₂ (normal <2 kPa). ↑A-a gradient = V/Q mismatch or shunt.",
      color: "hsl(200 70% 50%)",
    },
    {
      step: 2, title: "Identify Primary Disorder",
      action: "Look at pH, then PaCO₂ and HCO₃⁻",
      detail: "pH <7.35 = acidaemia, >7.45 = alkalaemia. Then: if PaCO₂ moves in same direction as pH change → metabolic primary. If PaCO₂ moves opposite → respiratory primary. The primary disorder always explains the pH shift.",
      color: "hsl(142 60% 45%)",
    },
    {
      step: 3, title: "Assess Compensation",
      action: "Is compensation appropriate?",
      detail: "Compensation never overcorrects pH. If pH is normal with abnormal PaCO₂/HCO₃⁻ → mixed disorder. Use expected compensation formulae (see rules below). If actual differs from expected → additional (mixed) disorder.",
      color: "hsl(45 80% 50%)",
    },
    {
      step: 4, title: "Calculate Anion Gap",
      action: "AG = Na⁺ − (Cl⁻ + HCO₃⁻)",
      detail: "Normal AG: 12 ± 4 mEq/L (or 8 ± 4 if corrected for albumin). Correct AG for albumin: corrected AG = AG + 2.5 × (40 − albumin g/L). ↑AG = unmeasured anions (lactate, ketones, uraemia, toxins). MUDPILES mnemonic.",
      color: "hsl(25 80% 50%)",
    },
    {
      step: 5, title: "Calculate Delta Ratio",
      action: "ΔAG / ΔHCO₃⁻ — unmask hidden disorders",
      detail: "Delta ratio = (AG − 12) / (24 − HCO₃⁻). <1: mixed HAGMA + NAGMA (the AG rise doesn't fully account for HCO₃⁻ drop). 1–2: pure HAGMA. >2: mixed HAGMA + metabolic alkalosis (HCO₃⁻ higher than expected).",
      color: "hsl(0 70% 50%)",
    },
  ];

  const compensationRules = [
    { disorder: "Metabolic acidosis", rule: "Expected PaCO₂ = (1.5 × HCO₃⁻) + 8 ± 2 (Winter's formula)", onset: "Hours (hyperventilation)", limit: "PaCO₂ cannot fall below ~1.3 kPa (10 mmHg)" },
    { disorder: "Metabolic alkalosis", rule: "Expected PaCO₂ = (0.7 × HCO₃⁻) + 21 ± 2", onset: "Hours (hypoventilation)", limit: "PaCO₂ rarely >7.3 kPa (55 mmHg) — hypoxia limits compensation" },
    { disorder: "Acute respiratory acidosis", rule: "HCO₃⁻ ↑ 1 mEq/L per 10 mmHg ↑PaCO₂", onset: "Minutes (buffering)", limit: "HCO₃⁻ rarely >30 mEq/L acutely" },
    { disorder: "Chronic respiratory acidosis", rule: "HCO₃⁻ ↑ 3.5 mEq/L per 10 mmHg ↑PaCO₂", onset: "3–5 days (renal)", limit: "HCO₃⁻ can reach 38–45 mEq/L" },
    { disorder: "Acute respiratory alkalosis", rule: "HCO₃⁻ ↓ 2 mEq/L per 10 mmHg ↓PaCO₂", onset: "Minutes", limit: "HCO₃⁻ rarely <18 mEq/L acutely" },
    { disorder: "Chronic respiratory alkalosis", rule: "HCO₃⁻ ↓ 5 mEq/L per 10 mmHg ↓PaCO₂", onset: "3–5 days (renal)", limit: "HCO₃⁻ can reach 12–15 mEq/L" },
  ];

  const commonPatterns = [
    { id: "dka", name: "DKA", ph: "↓↓", paco2: "↓ (comp)", hco3: "↓↓", ag: "↑↑", delta: "1–2", pattern: "HAGMA + respiratory compensation", notes: "Ketoacids (β-hydroxybutyrate). AG often >25. Winter's formula to check compensation. May have concurrent NAGMA if prolonged (renal HCO₃⁻ loss)." },
    { id: "sepsis", name: "Sepsis / Lactic acidosis", ph: "↓", paco2: "↓ (comp)", hco3: "↓", ag: "↑", delta: "1–2", pattern: "HAGMA ± respiratory alkalosis", notes: "Type A lactate (tissue hypoxia). Early sepsis may show respiratory alkalosis alone. Mixed picture common." },
    { id: "copd", name: "COPD exacerbation", ph: "↓ or normal", paco2: "↑↑", hco3: "↑ (comp)", ag: "Normal", delta: "N/A", pattern: "Respiratory acidosis (acute on chronic)", notes: "Chronically elevated HCO₃⁻. Acute deterioration: pH drops. If HCO₃⁻ only modestly elevated → acute component dominant." },
    { id: "vomiting", name: "Prolonged vomiting", ph: "↑", paco2: "↑ (comp)", hco3: "↑↑", ag: "Normal", delta: "N/A", pattern: "Metabolic alkalosis + hypochloraemia", notes: "Loss of HCl → ↑HCO₃⁻. Hypokalaemia (renal K⁺/H⁺ exchange). Chloride-responsive — give 0.9% NaCl. Contraction alkalosis." },
    { id: "salicylate", name: "Salicylate poisoning", ph: "Variable", paco2: "↓", hco3: "↓", ag: "↑", delta: "Variable", pattern: "Mixed: respiratory alkalosis + HAGMA", notes: "Early: direct respiratory centre stimulation → respiratory alkalosis. Late: uncoupling oxidative phosphorylation → HAGMA. Both present simultaneously = classic mixed disorder." },
    { id: "saline", name: "0.9% NaCl excess", ph: "↓ (mild)", paco2: "Normal", hco3: "↓", ag: "Normal", delta: "N/A", pattern: "Normal AG (hyperchloraemic) metabolic acidosis", notes: "Cl⁻ 154 mmol/L → ↑Cl⁻ → ↓SID → acidosis. Stewart: reduced strong ion difference. Switch to balanced crystalloid (Hartmann's/Plasmalyte)." },
  ];

  return (
    <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-bold text-foreground mb-1">Acid-Base Interpretation Guide</h3>
      <p className="text-sm text-muted-foreground mb-4">Systematic ABG analysis, compensation rules, and clinical patterns</p>

      <Tabs defaultValue="algorithm" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="algorithm" className="text-xs">Algorithm</TabsTrigger>
          <TabsTrigger value="approach" className="text-xs">HH vs Stewart</TabsTrigger>
          <TabsTrigger value="patterns" className="text-xs">Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="algorithm">
          {/* Step-by-step flowchart */}
          <div className="space-y-2 mb-4">
            {algorithmSteps.map((s) => (
              <button
                key={s.step}
                onClick={() => setSelectedStep(selectedStep === s.step ? null : s.step)}
                className={`w-full text-left transition-all ${selectedStep === s.step ? "ring-1 ring-primary" : ""}`}
              >
                <div className={`p-3 rounded-lg border ${selectedStep === s.step ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                  <div className="flex items-center gap-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: s.color }}>{s.step}</span>
                    <div>
                      <p className="font-bold text-foreground text-sm">{s.title}</p>
                      <p className="text-xs text-muted-foreground">{s.action}</p>
                    </div>
                  </div>
                  {selectedStep === s.step && (
                    <p className="text-xs text-muted-foreground mt-2 ml-8 animate-fade-in">{s.detail}</p>
                  )}
                </div>
                {s.step < 5 && (
                  <div className="flex justify-center">
                    <div className="w-0.5 h-2 bg-border" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Compensation rules table */}
          <p className="text-xs font-semibold text-foreground mb-2">Compensation Rules</p>
          <div className="space-y-1.5">
            {compensationRules.map((c, i) => (
              <div key={i} className="p-2 rounded border border-border text-xs">
                <p className="font-semibold text-foreground">{c.disorder}</p>
                <p className="text-muted-foreground mt-0.5"><strong>Rule:</strong> {c.rule}</p>
                <p className="text-muted-foreground"><strong>Onset:</strong> {c.onset} | <strong>Limit:</strong> {c.limit}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approach">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSelectedApproach("hh")}
              className={`flex-1 p-2 rounded-lg border text-sm font-semibold transition-all ${selectedApproach === "hh" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
            >
              Henderson-Hasselbalch
            </button>
            <button
              onClick={() => setSelectedApproach("stewart")}
              className={`flex-1 p-2 rounded-lg border text-sm font-semibold transition-all ${selectedApproach === "stewart" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
            >
              Stewart (Physicochemical)
            </button>
          </div>

          {selectedApproach === "hh" ? (
            <div className="space-y-3 animate-fade-in">
              <div className="bg-background rounded-lg border border-border p-3">
                <svg viewBox="0 0 380 100" className="w-full h-auto">
                  <text x="190" y="25" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="700">pH = pKa + log₁₀ [HCO₃⁻] / [CO₂]</text>
                  <text x="190" y="48" textAnchor="middle" className="fill-muted-foreground" fontSize="10">pKa = 6.1 | [CO₂] = 0.03 × PaCO₂</text>
                  <line x1="80" y1="58" x2="300" y2="58" stroke="hsl(var(--border))" strokeWidth="0.5" />
                  <text x="130" y="78" textAnchor="middle" fontSize="10" className="fill-primary" fontWeight="600">Metabolic</text>
                  <text x="130" y="92" textAnchor="middle" fontSize="9" className="fill-primary">(kidneys: HCO₃⁻)</text>
                  <text x="260" y="78" textAnchor="middle" fontSize="10" fill="hsl(0,70%,55%)" fontWeight="600">Respiratory</text>
                  <text x="260" y="92" textAnchor="middle" fontSize="9" fill="hsl(0,70%,55%)">(lungs: CO₂)</text>
                </svg>
              </div>
              <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 text-xs">
                <p className="font-bold text-foreground text-sm">Henderson-Hasselbalch Approach</p>
                <p className="text-muted-foreground mt-1">Descriptive model. pH is determined by the ratio of HCO₃⁻ (metabolic, renal regulation) to dissolved CO₂ (respiratory, ventilatory regulation). Base excess (BE) quantifies metabolic component: normal ± 2. AG identifies unmeasured anions.</p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">Strengths</span>
                    <p className="text-muted-foreground mt-0.5">Simple, widely taught. AG + delta ratio identify mixed disorders. Compensation formulae well validated.</p>
                  </div>
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">Limitations</span>
                    <p className="text-muted-foreground mt-0.5">HCO₃⁻ is not independent (depends on PaCO₂). Doesn't explain WHY acidosis occurs. Misses chloride and albumin effects.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 animate-fade-in">
              <div className="bg-background rounded-lg border border-border p-3">
                <svg viewBox="0 0 380 120" className="w-full h-auto">
                  <text x="190" y="22" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Three Independent Variables</text>
                  <rect x="20" y="35" width="100" height="50" rx="8" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" strokeWidth="1.5" />
                  <text x="70" y="58" textAnchor="middle" className="fill-primary" fontSize="11" fontWeight="700">SID</text>
                  <text x="70" y="73" textAnchor="middle" className="fill-primary" fontSize="8">Strong Ion Diff</text>
                  <rect x="140" y="35" width="100" height="50" rx="8" fill="hsl(0,70%,55%)" opacity="0.15" stroke="hsl(0,70%,55%)" strokeWidth="1.5" />
                  <text x="190" y="58" textAnchor="middle" fill="hsl(0,70%,55%)" fontSize="11" fontWeight="700">PaCO₂</text>
                  <text x="190" y="73" textAnchor="middle" fill="hsl(0,70%,55%)" fontSize="8">Respiratory</text>
                  <rect x="260" y="35" width="100" height="50" rx="8" fill="hsl(25,80%,50%)" opacity="0.15" stroke="hsl(25,80%,50%)" strokeWidth="1.5" />
                  <text x="310" y="58" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="11" fontWeight="700">Atot</text>
                  <text x="310" y="73" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="8">Weak acids</text>
                  <text x="70" y="103" textAnchor="middle" className="fill-muted-foreground" fontSize="7">(Na⁺+K⁺+Ca²⁺+Mg²⁺)</text>
                  <text x="70" y="113" textAnchor="middle" className="fill-muted-foreground" fontSize="7">−(Cl⁻+lactate⁻)</text>
                  <text x="190" y="103" textAnchor="middle" className="fill-muted-foreground" fontSize="7">Ventilation</text>
                  <text x="310" y="103" textAnchor="middle" className="fill-muted-foreground" fontSize="7">Albumin +</text>
                  <text x="310" y="113" textAnchor="middle" className="fill-muted-foreground" fontSize="7">Phosphate</text>
                </svg>
              </div>
              <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 text-xs">
                <p className="font-bold text-foreground text-sm">Stewart (Physicochemical) Approach</p>
                <p className="text-muted-foreground mt-1">pH is determined by 3 independent variables: SID (normal ~40 mEq/L), PaCO₂, and Atot (total weak acids = albumin + phosphate). HCO₃⁻ and H⁺ are dependent variables — they adjust to satisfy water dissociation equilibrium.</p>
                <div className="space-y-2 mt-2">
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">↓SID → acidosis: </span>
                    <span className="text-muted-foreground">↑Cl⁻ (0.9% NaCl), ↑lactate, ↑ketoacids. Or ↓Na⁺ (dilutional).</span>
                  </div>
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">↑SID → alkalosis: </span>
                    <span className="text-muted-foreground">↓Cl⁻ (vomiting, diuretics). Or ↑Na⁺ (contraction).</span>
                  </div>
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">↓Atot → alkalosis: </span>
                    <span className="text-muted-foreground">Hypoalbuminaemia (ICU patients, liver failure). Corrects AG by ~2.5 per 10 g/L ↓albumin.</span>
                  </div>
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">Strong Ion Gap (SIG): </span>
                    <span className="text-muted-foreground">SIG = SIDa − SIDe. Represents unmeasured strong anions. Equivalent to albumin-corrected AG. SIG {">"} 2 = unmeasured anions present.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="patterns">
          <p className="text-xs text-muted-foreground mb-3">Common clinical acid-base patterns — tap to expand</p>
          <div className="space-y-1.5">
            {commonPatterns.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPattern(selectedPattern === p.id ? null : p.id)}
                className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs ${selectedPattern === p.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{p.name}</span>
                  <span className="text-muted-foreground text-[10px]">{p.pattern}</span>
                </div>
                {selectedPattern === p.id && (
                  <div className="mt-2 space-y-2 animate-fade-in">
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="p-1.5 rounded bg-background border border-border text-center">
                        <span className="text-muted-foreground">pH</span>
                        <p className="font-bold text-foreground">{p.ph}</p>
                      </div>
                      <div className="p-1.5 rounded bg-background border border-border text-center">
                        <span className="text-muted-foreground">PaCO₂</span>
                        <p className="font-bold text-foreground">{p.paco2}</p>
                      </div>
                      <div className="p-1.5 rounded bg-background border border-border text-center">
                        <span className="text-muted-foreground">HCO₃⁻</span>
                        <p className="font-bold text-foreground">{p.hco3}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="p-1.5 rounded bg-background border border-border text-center">
                        <span className="text-muted-foreground">AG</span>
                        <p className="font-bold text-foreground">{p.ag}</p>
                      </div>
                      <div className="p-1.5 rounded bg-background border border-border text-center">
                        <span className="text-muted-foreground">Delta ratio</span>
                        <p className="font-bold text-foreground">{p.delta}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{p.notes}</p>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
            <strong className="text-foreground">HAGMA mnemonics: </strong>
            <strong>MUDPILES</strong> — Methanol, Uraemia, DKA, Propylene glycol, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates. 
            <strong> NAGMA: </strong>HARDUPS — Hyperalimentation, Addison's, RTA, Diarrhoea, Ureteric diversion, Pancreatic fistula, Saline excess.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AcidBaseInterpretationDiagram;
