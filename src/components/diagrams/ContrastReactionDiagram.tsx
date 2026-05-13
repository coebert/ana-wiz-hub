import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const ContrastReactionDiagram = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<number | null>(null);

  const severityLevels = [
    {
      id: "mild",
      label: "Mild",
      color: "hsl(142 60% 45%)",
      bgClass: "bg-accent/10 border-accent/30",
      features: ["Urticaria (limited)", "Pruritus", "Nausea / single vomit", "Flushing / warmth", "Mild rhinorrhoea"],
      management: ["Observe — usually self-limiting", "Antihistamine (chlorphenamine 10 mg IV) if symptomatic", "Continue procedure if stable", "Document reaction for future reference"],
      frequency: "Common (~3%)",
    },
    {
      id: "moderate",
      label: "Moderate",
      color: "hsl(40 80% 50%)",
      bgClass: "bg-yellow-500/10 border-yellow-500/30",
      features: ["Widespread urticaria", "Facial / laryngeal oedema", "Bronchospasm (mild–moderate)", "Significant hypotension (transient)", "Persistent vomiting"],
      management: ["Stop contrast infusion", "ABC approach — call for help", "Adrenaline 0.5 mg IM (1:1000)", "Salbutamol nebuliser for bronchospasm", "IV crystalloid bolus 500–1000 ml", "Hydrocortisone 200 mg IV (delayed effect)"],
      frequency: "Uncommon (~0.4%)",
    },
    {
      id: "severe",
      label: "Severe / Anaphylaxis",
      color: "hsl(0 70% 50%)",
      bgClass: "bg-destructive/10 border-destructive/30",
      features: ["Cardiovascular collapse", "Severe bronchospasm / stridor", "Loss of consciousness", "Cardiac arrest", "Laryngeal oedema (airway obstruction)"],
      management: ["STOP procedure — full ABCDE", "Adrenaline 0.5 mg IM (repeat q5min)", "High-flow oxygen 15 L/min", "IV fluid bolus 20 ml/kg crystalloid", "Intubate if airway compromise", "CPR if cardiac arrest", "ICU admission — observe ≥12 hours", "Mast cell tryptase: 1h, 6h, >24h post-event"],
      frequency: "Rare (~0.04%)",
    },
  ];

  const riskFactors = [
    { factor: "Previous contrast reaction", risk: "5× increased risk", action: "Premedication: prednisolone 50 mg PO at 13h, 7h, 1h pre-procedure + cetirizine 10 mg. Use non-ionic low-osmolar contrast. Consider alternative imaging (MRI, USS)." },
    { factor: "Asthma", risk: "2–3× increased risk", action: "Ensure well-controlled. Bronchodilator available. Premedication if previous reaction. Higher risk of bronchospasm as predominant feature." },
    { factor: "Renal impairment (eGFR <30)", risk: "CI-AKI risk 15–30%", action: "IV hydration NaCl 0.9% 1 ml/kg/h for 12h pre and 12h post. Minimise contrast volume. Use iso-osmolar agent (iodixanol). Hold metformin 48h post. Monitor creatinine at 48–72h." },
    { factor: "Metformin use", risk: "Lactic acidosis if CI-AKI develops", action: "If eGFR >30 and normal creatinine: continue metformin. If eGFR <30 or emergency: withhold metformin for 48h post-contrast and recheck renal function before restarting." },
    { factor: "Thyrotoxicosis", risk: "Iodine load → thyroid storm", action: "Radiocontrast contains free iodide which can trigger storm in uncontrolled hyperthyroidism. Treat thyrotoxicosis first. Carbimazole block if urgent imaging needed. Avoid contrast if possible." },
    { factor: "Phaeochromocytoma", risk: "Hypertensive crisis", action: "α-blockade (phenoxybenzamine) before contrast. Non-ionic low-osmolar agent. Invasive BP monitoring. Phentolamine available." },
  ];

  const ciakiProtocol = [
    { step: "Risk Assessment", detail: "Calculate eGFR. Identify diabetes, nephrotoxic drugs (NSAIDs, aminoglycosides, ACEi), dehydration, myeloma, heart failure." },
    { step: "Hydration", detail: "NaCl 0.9% at 1 ml/kg/h for 12 hours pre- and 12 hours post-procedure. Alternative: NaHCO₃ 1.26% at 3 ml/kg/h for 1h pre then 1 ml/kg/h for 6h post (evidence equivocal)." },
    { step: "Contrast Selection", detail: "Use iso-osmolar (iodixanol) or low-osmolar (iohexol, iopamidol) agents. NEVER use high-osmolar ionic contrast. Minimise volume: aim for contrast volume/eGFR ratio <3.7." },
    { step: "Drug Management", detail: "Withhold metformin for 48h post-contrast (if eGFR <30 or acutely unwell). Hold NSAIDs. Continue ACEi/ARB (unless hypovolaemic). N-acetylcysteine NOT recommended (no proven benefit)." },
    { step: "Follow-Up", detail: "Check serum creatinine at 48–72 hours post-contrast. CI-AKI defined as ≥25% or ≥44 μmol/L rise from baseline. Usually self-limiting (peak at 3–5 days, resolves by 14 days). Rarely requires RRT." },
  ];

  return (
            <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-bold text-foreground mb-1">Contrast Reactions & CI-AKI Management</h3>
      <p className="text-sm text-muted-foreground mb-4">Severity grading, risk stratification, and nephroprotection protocol</p>

      <Tabs defaultValue="severity" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="severity" className="text-xs">Reaction Severity</TabsTrigger>
          <TabsTrigger value="risk" className="text-xs">Risk Factors</TabsTrigger>
          <TabsTrigger value="ciaki" className="text-xs">CI-AKI Protocol</TabsTrigger>
        </TabsList>

        <TabsContent value="severity">
          <div className="space-y-3">
            {severityLevels.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSeverity(selectedSeverity === s.id ? null : s.id)}
                className="w-full text-left"
              >
                <div className={`p-3 rounded-lg border transition-all ${selectedSeverity === s.id ? "ring-1 ring-primary" : ""} ${s.bgClass}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                      <p className="font-bold text-foreground text-sm">{s.label}</p>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">{s.frequency}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {s.features.map((f, j) => (
                      <span key={j} className="text-[10px] px-1.5 py-0.5 rounded-full bg-background/60 text-muted-foreground">{f}</span>
                    ))}
                  </div>
                  {selectedSeverity === s.id && (
                    <div className="mt-3 pt-2 border-t border-border/50 animate-fade-in">
                      <p className="text-xs font-semibold text-foreground mb-1">Management:</p>
                      <ul className="space-y-0.5">
                        {s.management.map((m, j) => (
                          <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                            <span className="mt-0.5" style={{ color: s.color }}>•</span>{m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
            <strong className="text-foreground">Key point: </strong>
            Most contrast reactions are <strong>anaphylactoid</strong> (non-IgE, direct mast cell degranulation), but are managed identically to true anaphylaxis. Always take mast cell tryptase for severe reactions.
          </div>
        </TabsContent>

        <TabsContent value="risk">
          <div className="space-y-2">
            {riskFactors.map((r, i) => (
              <button
                key={i}
                onClick={() => setSelectedRisk(selectedRisk === i ? null : i)}
                className="w-full text-left"
              >
                <div className={`p-3 rounded-lg border transition-all ${selectedRisk === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-foreground text-sm">{r.factor}</p>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-semibold">{r.risk}</span>
                  </div>
                  {selectedRisk === i && (
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed animate-fade-in">{r.action}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ciaki">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-3">
              {ciakiProtocol.map((step, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-2 top-1.5 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <span className="text-[9px] font-bold text-primary">{i + 1}</span>
                  </div>
                  <div className="p-3 rounded-lg border border-border bg-card">
                    <p className="font-bold text-foreground text-sm mb-1">{step.step}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 p-2 rounded bg-accent/10 border border-accent/20 text-xs text-muted-foreground">
            <strong className="text-foreground">N-acetylcysteine: </strong>
            Previously recommended, but ACT/PRESERVE trials showed no benefit over hydration alone. No longer in guidelines. Hydration remains the cornerstone of CI-AKI prevention.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContrastReactionDiagram;
