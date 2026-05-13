import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

const SepsisManagementDiagram = () => {
  const [selectedBundle, setSelectedBundle] = useState<number | null>(null);
  const [selectedVP, setSelectedVP] = useState<string | null>(null);

  const hour1Bundle = [
    { step: "Measure Lactate", detail: "Remeasure if initial lactate >2 mmol/L. Target lactate clearance ≥20% in 2 hours. Serial lactate is a marker of tissue perfusion adequacy, not a resuscitation endpoint in isolation.", icon: "🔬", time: "Immediate" },
    { step: "Blood Cultures × 2", detail: "Before antibiotics if possible (do NOT delay antibiotics >45 min for cultures). Two sets from different sites. Consider additional cultures: urine, sputum, CSF, wound, line tips.", icon: "🧫", time: "Immediate" },
    { step: "Broad-Spectrum Antibiotics", detail: "Within 1 hour of recognition. Each hour delay ↑mortality ~7% (Kumar 2006). Cover likely pathogens — local guidelines. De-escalate at 48–72h based on cultures. Duration typically 7–10 days (IDSA).", icon: "💊", time: "<1 hour" },
    { step: "IV Crystalloid 30 mL/kg", detail: "Start immediately for hypotension or lactate ≥4. Balanced crystalloid preferred (Hartmann's/Plasmalyte — SMART trial). Complete within 3 hours. Reassess fluid responsiveness after initial bolus — do NOT continue blindly.", icon: "💧", time: "<3 hours" },
    { step: "Vasopressors if MAP <65", detail: "Start noradrenaline if MAP <65 mmHg during or after fluid resuscitation. Do NOT delay vasopressors to complete fluid loading. Early vasopressors associated with ↓mortality (CENSER trial). Target MAP ≥65 mmHg.", icon: "⬆", time: "If needed" },
  ];

  const vasopressors = [
    { id: "norad", name: "Noradrenaline", line: "1st line", dose: "0.05–1.0 μg/kg/min", receptor: "α₁ >> β₁", effect: "↑SVR (potent vasoconstriction), mild ↑CO. Minimal chronotropy at low doses. Best splanchnic perfusion of all vasopressors.", evidence: "SSC 2021: strong recommendation as first-line. SOAP II trial: noradrenaline vs dopamine — lower mortality and fewer arrhythmias with noradrenaline.", color: "hsl(var(--primary))" },
    { id: "vaso", name: "Vasopressin", line: "2nd line", dose: "0.01–0.04 U/min (fixed, not titrated)", receptor: "V1 (vascular smooth muscle)", effect: "Non-catecholamine vasoconstrictor. Synergistic with noradrenaline. Replaces endogenous vasopressin deficiency in septic shock. Catecholamine-sparing.", evidence: "VASST trial: no overall mortality benefit, but ↓mortality in 'less severe' septic shock subgroup (norad <15 μg/min). Added when norad ≥0.25 μg/kg/min.", color: "hsl(200 70% 50%)" },
    { id: "adr", name: "Adrenaline", line: "2nd/3rd line", dose: "0.01–0.5 μg/kg/min", receptor: "β₁ = β₂ > α₁ (dose-dependent)", effect: "Low dose: ↑CO (β₁ inotrope). High dose: ↑SVR (α₁). ↑Lactate (aerobic glycolysis — confounds monitoring). ↑HR, ↑myocardial O₂ demand.", evidence: "Alternative to vasopressin as second-line. CAT trial: no difference vs norad + dobutamine. Useful when inotropic support also needed. Beware ↑lactate (not tissue hypoxia).", color: "hsl(25 80% 50%)" },
    { id: "dobut", name: "Dobutamine", line: "Inotrope (adjunct)", dose: "2.5–20 μg/kg/min", receptor: "β₁ > β₂", effect: "↑CO, ↑contractility. May ↓SVR (β₂ vasodilation). ↑HR. Tachyarrhythmia risk. Not a vasopressor — requires concurrent norad.", evidence: "SSC: consider if evidence of cardiac dysfunction (↓CO) despite adequate filling and vasopressors. Not for empirical use. ScvO₂ >70% target (Rivers — now debated).", color: "hsl(142 60% 45%)" },
    { id: "angio", name: "Angiotensin II", line: "Rescue", dose: "20–200 ng/kg/min", receptor: "AT1 receptor", effect: "Potent vasoconstrictor via renin-angiotensin system. Non-catecholamine pathway. ↑Aldosterone secretion.", evidence: "ATHOS-3 trial: ↑MAP response in catecholamine-refractory vasodilatory shock. Licensed in US. Not widely available in UK. Consider in refractory shock.", color: "hsl(0 70% 50%)" },
  ];

  const decisionPathway = [
    { question: "MAP <65 despite 30 mL/kg crystalloid?", yes: "Start noradrenaline (do NOT wait to complete all fluids)", no: "Reassess — may not need vasopressors. Continue monitoring." },
    { question: "Noradrenaline >0.25 μg/kg/min?", yes: "Add vasopressin 0.03 U/min (catecholamine-sparing)", no: "Continue titrating noradrenaline. Reassess fluid status." },
    { question: "Persistent hypotension on norad + vasopressin?", yes: "Add hydrocortisone 200 mg/day. Check adrenal function is not the cause. Consider cardiac output assessment.", no: "Maintain current therapy. Wean vasopressin first, then norad." },
    { question: "Evidence of myocardial dysfunction (↓CO)?", yes: "Add dobutamine 2.5–20 μg/kg/min or switch to adrenaline. Echo to confirm. Consider levosimendan if β-blocked.", no: "Continue vasopressor strategy. Ensure adequate source control." },
    { question: "Source controlled?", yes: "Continue antibiotics course. De-escalate at 48–72h based on cultures. Plan duration (typically 7–10 days).", no: "URGENT: CT imaging if source unclear. Surgery/IR drainage for collections. Remove infected lines/prosthetics. This is THE most important intervention." },
  ];

  return (
    <DiagramFigure
      id="sepsis-management-diagram"
      title="Sepsis management"
      description="Auto-generated wrapper for the Sepsis management anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-1">Sepsis Management Pathway</h3>
        <p className="text-sm text-muted-foreground mb-4">SSC Hour-1 bundle, vasopressor algorithm, and decision pathway</p>
  
        <Tabs defaultValue="bundle" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="bundle" className="text-xs">Hour-1 Bundle</TabsTrigger>
            <TabsTrigger value="vasopressors" className="text-xs">Vasopressors</TabsTrigger>
            <TabsTrigger value="pathway" className="text-xs">Decision Path</TabsTrigger>
          </TabsList>
  
          <TabsContent value="bundle">
            <div className="space-y-2">
              {hour1Bundle.map((b, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedBundle(selectedBundle === i ? null : i)}
                  className={`w-full text-left transition-all ${selectedBundle === i ? "ring-1 ring-primary" : ""}`}
                >
                  <div className={`p-3 rounded-lg border ${selectedBundle === i ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{b.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-foreground text-sm">{b.step}</p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary font-semibold">{b.time}</span>
                        </div>
                      </div>
                    </div>
                    {selectedBundle === i && (
                      <p className="text-xs text-muted-foreground mt-2 ml-8 animate-fade-in">{b.detail}</p>
                    )}
                  </div>
                  {i < hour1Bundle.length - 1 && (
                    <div className="flex justify-center"><div className="w-0.5 h-1.5 bg-border" /></div>
                  )}
                </button>
              ))}
            </div>
  
            <div className="mt-3 p-2 rounded bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
              <strong className="text-foreground">TIME = LIVES: </strong>
              All 5 elements should begin within 1 hour of sepsis recognition. Bundle compliance associated with 25% relative risk reduction in mortality (Levy 2018). Do not wait for ICU admission to start.
            </div>
          </TabsContent>
  
          <TabsContent value="vasopressors">
            {/* Escalation SVG */}
            <div className="bg-background rounded-lg border border-border p-3 mb-3">
              <svg viewBox="0 0 420 180" className="w-full h-auto">
                <text x="14" y="100" fontSize="9" className="fill-muted-foreground" transform="rotate(-90,14,100)">Escalation →</text>
                {vasopressors.slice(0, 4).map((v, i) => {
                  const y = 18 + i * 38;
                  const width = [340, 280, 220, 170][i];
                  return (
                        <g key={v.id}>
                      <rect x="36" y={y} width={width} height="20" rx="4" fill={v.color} opacity="0.15" stroke={v.color} strokeWidth="1" />
                      <text x="44" y={y + 13} fontSize="9" fill={v.color} fontWeight="700">{v.line}: {v.name}</text>
                      <text x="44" y={y + 30} fontSize="8" className="fill-muted-foreground">{v.dose}</text>
                    </g>
    );
                })}
              </svg>
            </div>
  
            <div className="space-y-1.5">
              {vasopressors.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVP(selectedVP === v.id ? null : v.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs ${selectedVP === v.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">{v.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: `${v.color}20`, color: v.color }}>{v.line}</span>
                  </div>
                  {selectedVP === v.id && (
                    <div className="mt-2 space-y-2 animate-fade-in">
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="p-1.5 rounded bg-background border border-border">
                          <span className="text-muted-foreground">Dose:</span>
                          <p className="font-semibold text-foreground">{v.dose}</p>
                        </div>
                        <div className="p-1.5 rounded bg-background border border-border">
                          <span className="text-muted-foreground">Receptor:</span>
                          <p className="font-semibold text-foreground">{v.receptor}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{v.effect}</p>
                      <div className="p-2 rounded bg-primary/10 border border-primary/20">
                        <span className="font-semibold text-foreground">Evidence: </span>
                        <span className="text-muted-foreground">{v.evidence}</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </TabsContent>
  
          <TabsContent value="pathway">
            <p className="text-xs text-muted-foreground mb-3">Step-through decision pathway for septic shock management</p>
            <div className="space-y-2">
              {decisionPathway.map((d, i) => (
                <div key={i} className="rounded-lg border border-border overflow-hidden">
                  <div className="p-2.5 bg-muted/30">
                    <p className="font-bold text-foreground text-xs">❓ {d.question}</p>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border">
                    <div className="p-2 text-xs">
                      <span className="font-bold text-xs" style={{ color: "hsl(142,60%,45%)" }}>YES →</span>
                      <p className="text-muted-foreground mt-0.5">{d.yes}</p>
                    </div>
                    <div className="p-2 text-xs">
                      <span className="font-bold text-xs" style={{ color: "hsl(200,70%,50%)" }}>NO →</span>
                      <p className="text-muted-foreground mt-0.5">{d.no}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="mt-3 p-3 rounded-lg border border-border text-xs">
              <p className="font-semibold text-foreground mb-1">Steroids in Septic Shock</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded bg-background border border-border">
                  <span className="font-semibold text-foreground">ADRENAL (2018)</span>
                  <p className="text-muted-foreground mt-0.5">Hydrocortisone vs placebo: no 90-day mortality difference. Faster shock resolution. ↓Duration of ventilation.</p>
                </div>
                <div className="p-2 rounded bg-background border border-border">
                  <span className="font-semibold text-foreground">APROCCHSS (2018)</span>
                  <p className="text-muted-foreground mt-0.5">Hydrocortisone + fludrocortisone: ↓90-day mortality (NNT=18). Faster shock reversal. French ICU population.</p>
                </div>
              </div>
              <p className="text-muted-foreground mt-2"><strong>SSC 2021:</strong> Suggest IV hydrocortisone 200 mg/day if norad ≥0.25 μg/kg/min for ≥4 hours. Weak recommendation. Start within 24h of shock onset.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DiagramFigure>
  );
};

export default SepsisManagementDiagram;
