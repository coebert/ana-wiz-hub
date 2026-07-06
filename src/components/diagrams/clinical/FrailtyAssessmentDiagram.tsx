import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "../_shared/DiagramFigure";

const FrailtyAssessmentDiagram = () => {
  const [selectedCFS, setSelectedCFS] = useState<number | null>(null);
  const [selectedChange, setSelectedChange] = useState<string | null>(null);

  const cfsScale = [
    { score: 1, label: "Very Fit", desc: "Robust, active, energetic, motivated. Exercise regularly and are among the fittest for their age.", color: "hsl(142 70% 40%)", risk: "Very low" },
    { score: 2, label: "Well", desc: "No active disease symptoms but less fit than category 1. Often exercise or are very active occasionally.", color: "hsl(142 60% 50%)", risk: "Very low" },
    { score: 3, label: "Managing Well", desc: "Medical problems well controlled. Not regularly active beyond routine walking.", color: "hsl(80 60% 45%)", risk: "Low" },
    { score: 4, label: "Vulnerable", desc: "While not dependent on others, symptoms often limit activities. Slowed up and/or tired during the day.", color: "hsl(45 80% 50%)", risk: "Moderate" },
    { score: 5, label: "Mildly Frail", desc: "More evident slowing. Need help with high-order IADLs (finances, transport, heavy housework). Progressive limitation.", color: "hsl(30 80% 50%)", risk: "Elevated" },
    { score: 6, label: "Moderately Frail", desc: "Need help with all outside activities and housekeeping. Problems with stairs, bathing, may need help dressing.", color: "hsl(15 80% 50%)", risk: "High" },
    { score: 7, label: "Severely Frail", desc: "Completely dependent for personal care. However, seem stable and not at high risk of dying (within ~6 months).", color: "hsl(0 70% 55%)", risk: "Very high" },
    { score: 8, label: "Very Severely Frail", desc: "Completely dependent, approaching end of life. Typically could not recover even from minor illness.", color: "hsl(0 60% 40%)", risk: "Extreme" },
    { score: 9, label: "Terminally Ill", desc: "Approaching end of life. Life expectancy <6 months. Not otherwise evidently frail.", color: "hsl(0 50% 30%)", risk: "N/A" },
  ];

  const physiologicalChanges = [
    { system: "Cardiovascular", changes: ["↓ Cardiac output ~1%/year", "↑ Arterial stiffness → systolic HTN", "Impaired baroreceptor reflex", "Diastolic dysfunction (reliant on atrial kick)", "↓ β-receptor sensitivity"], icon: "♥", color: "hsl(0 70% 50%)" },
    { system: "Respiratory", changes: ["Closing capacity > FRC supine by ~65y", "↓ FRC, ↓ elastic recoil, ↓ compliance", "↑ V/Q mismatch, ↓ PaO₂", "Blunted hypoxic/hypercapnic drive", "↓ Cough reflex, ↓ mucociliary clearance"], icon: "🫁", color: "hsl(200 70% 50%)" },
    { system: "Neurological", changes: ["MAC ↓ 6% per decade after 40", "↑ Sensitivity to sedatives/opioids", "↓ CSF volume → higher neuraxial block", "↓ Neuronal density", "Risk of POCD and delirium"], icon: "🧠", color: "hsl(280 60% 55%)" },
    { system: "Renal / Hepatic", changes: ["GFR ↓ ~1 ml/min/year after 40", "Creatinine may be 'normal' despite ↓ GFR", "↓ Hepatic blood flow, ↓ Phase I metabolism", "↓ Albumin → ↑ free drug fraction", "↓ Total body water, ↑ body fat → altered Vd"], icon: "🫘", color: "hsl(25 80% 50%)" },
  ];

  const deliriumSteps = [
    { step: "Screen", detail: "Use 4AT (rapid, no training needed) or CAM on admission and postoperatively. 4AT: Alertness (0–4), AMT4 (0–2), Attention (0–2), Acute change (0–4). Score ≥4 = possible delirium.", color: "hsl(var(--primary))" },
    { step: "Prevent", detail: "Non-pharmacological multicomponent bundle: orientation (clocks, calendars, familiar objects), sleep hygiene (reduce nocturnal interventions, avoid night sedation), early mobilisation, ensure glasses/hearing aids, adequate hydration/nutrition, avoid constipation, minimise catheterisation.", color: "hsl(142 60% 45%)" },
    { step: "Identify", detail: "Three subtypes — HYPOACTIVE (most common, easily missed: quiet, withdrawn, reduced engagement), HYPERACTIVE (agitation, pulling lines, aggression), MIXED. Always look for underlying CAUSE: infection, pain, constipation, urinary retention, metabolic derangement, drug effect.", color: "hsl(40 80% 50%)" },
    { step: "Treat Cause", detail: "Delirium is a SYMPTOM, not a diagnosis. Septic screen, check electrolytes/glucose/calcium, review drug chart (anticholinergics, benzodiazepines, opioids), assess pain, check for urinary retention and constipation, exclude MI/PE/stroke.", color: "hsl(25 80% 50%)" },
    { step: "Pharmacological", detail: "LAST RESORT only if risk to self/others. Haloperidol 0.5–1 mg PO/IM (avoid in Parkinson's, Lewy body). Avoid benzodiazepines (worsen delirium except in alcohol withdrawal). Olanzapine or quetiapine alternatives. Dexmedetomidine in ICU setting.", color: "hsl(0 70% 50%)" },
  ];

  return (
    <DiagramFigure id="frailty-assessment" title="Elderly assessment: Clinical Frailty Scale, physiological changes and delirium prevention" description="Tabbed perioperative geriatric assessment — Clinical Frailty Scale levels 1–9, age-related physiological changes and a delirium prevention pathway.">
    <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-bold text-foreground mb-1">Elderly Patient — Assessment & Management</h3>
      <p className="text-sm text-muted-foreground mb-4">Clinical Frailty Scale, physiological changes, and delirium prevention</p>

      <Tabs defaultValue="frailty" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="frailty" className="text-xs">Frailty Scale</TabsTrigger>
          <TabsTrigger value="physiology" className="text-xs">Physiology Changes</TabsTrigger>
          <TabsTrigger value="delirium" className="text-xs">Delirium Pathway</TabsTrigger>
        </TabsList>

        <TabsContent value="frailty">
          <div className="space-y-1">
            {cfsScale.map((c) => (
              <button
                key={c.score}
                onClick={() => setSelectedCFS(selectedCFS === c.score ? null : c.score)}
                className="w-full text-left"
              >
                <div className={`p-2.5 rounded-lg border transition-all ${selectedCFS === c.score ? "ring-1 ring-primary" : "hover:border-primary/40"} ${c.score >= 5 ? "border-destructive/20" : "border-border"}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: c.color }}>
                      {c.score}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground text-sm truncate">{c.label}</p>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold shrink-0 ml-2 ${c.score >= 5 ? "bg-destructive/15 text-destructive" : "bg-accent/15 text-accent"}`}>{c.risk}</span>
                      </div>
                    </div>
                  </div>
                  {selectedCFS === c.score && (
                    <p className="text-xs text-muted-foreground mt-1.5 ml-9 animate-fade-in leading-relaxed">{c.desc}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 p-2 rounded bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
            <strong className="text-foreground">CFS ≥5 = Frail: </strong>
            Frailty is a stronger predictor of 30-day mortality, complications, and discharge destination than age or ASA alone. Triggers Comprehensive Geriatric Assessment and prehabilitation discussion.
          </div>
        </TabsContent>

        <TabsContent value="physiology">
          <div className="space-y-3">
            {physiologicalChanges.map((sys) => (
              <button
                key={sys.system}
                onClick={() => setSelectedChange(selectedChange === sys.system ? null : sys.system)}
                className="w-full text-left"
              >
                <div className={`p-3 rounded-lg border transition-all ${selectedChange === sys.system ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{sys.icon}</span>
                    <p className="font-bold text-foreground text-sm">{sys.system}</p>
                  </div>
                  {selectedChange === sys.system && (
                    <ul className="space-y-0.5 ml-7 animate-fade-in">
                      {sys.changes.map((ch, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="mt-0.5" style={{ color: sys.color }}>•</span>{ch}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
            <strong className="text-foreground">Drug dosing: </strong>
            Reduce propofol induction dose by 30–50%. Reduce opioid doses by 30–50%. Prefer atracurium/cisatracurium (organ-independent). Titrate volatiles to BIS 40–60.
          </div>
        </TabsContent>

        <TabsContent value="delirium">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-3">
              {deliriumSteps.map((step, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-2 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: step.color, backgroundColor: `${step.color}20` }}>
                    <span className="text-[9px] font-bold" style={{ color: step.color }}>{i + 1}</span>
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
            <strong className="text-foreground">30–40% reduction: </strong>
            Non-pharmacological multicomponent interventions reduce delirium incidence by 30–40% (Inouye 1999, NICE CG103). They are the ONLY proven prevention strategy.
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </DiagramFigure>
  );
};

export default FrailtyAssessmentDiagram;
