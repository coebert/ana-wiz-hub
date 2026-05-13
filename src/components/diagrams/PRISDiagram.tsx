import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Tab = "mechanism" | "features" | "risk" | "management";

export const PRISDiagram = () => {
  const [tab, setTab] = useState<Tab>("mechanism");
  const [dose, setDose] = useState(3); // mg/kg/h
  const [duration, setDuration] = useState(24); // hours

  // Risk score: dose >4 and duration >48 are the canonical thresholds
  const doseRisk = Math.max(0, Math.min(1, (dose - 2) / 6)); // 2 → 0, 8 → 1
  const durRisk = Math.max(0, Math.min(1, (duration - 12) / 60)); // 12 → 0, 72 → 1
  const risk = Math.round((doseRisk * 0.55 + durRisk * 0.45) * 100);

  const riskLabel =
    risk < 25 ? "Low" : risk < 55 ? "Moderate" : risk < 80 ? "High" : "Critical";
  const riskColor =
    risk < 25 ? "hsl(140 50% 40%)" : risk < 55 ? "hsl(45 90% 45%)" : risk < 80 ? "hsl(25 85% 50%)" : "hsl(0 75% 50%)";

  const aboveThreshold = dose > 4 && duration > 48;

  return (
    <DiagramFigure
      id="pris-diagram"
      title="PRIS"
      description="Auto-generated wrapper for the PRIS anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="w-full max-w-3xl mx-auto space-y-4">
        <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mechanism">Mechanism</TabsTrigger>
            <TabsTrigger value="features">Clinical Features</TabsTrigger>
            <TabsTrigger value="risk">Risk Calculator</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>
  
          {/* MECHANISM */}
          <TabsContent value="mechanism" className="mt-4">
            <div className="bg-card rounded-lg border border-border p-4">
              <svg viewBox="0 0 600 360" className="w-full">
                {/* Mitochondrion outline */}
                <ellipse cx="300" cy="180" rx="220" ry="130" fill="hsl(210 40% 97%)" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
                <text x="300" y="40" textAnchor="middle" fontSize="13" className="fill-foreground font-semibold">Mitochondrion</text>
  
                {/* Inner cristae */}
                {[0, 1, 2, 3].map((i) => (
                  <path
                    key={i}
                    d={`M ${130 + i * 90} 130 q 30 50 0 100`}
                    fill="none"
                    stroke="hsl(215 25% 60%)"
                    strokeWidth="1"
                  />
                ))}
  
                {/* Propofol blocks */}
                <g>
                  <rect x="100" y="160" width="80" height="40" rx="4" fill="hsl(0 70% 50%)" opacity="0.85" />
                  <text x="140" y="184" textAnchor="middle" fontSize="11" className="fill-white font-semibold">Propofol</text>
                  <text x="140" y="215" textAnchor="middle" fontSize="9" className="fill-muted-foreground">inhibits ETC complexes</text>
                </g>
  
                {/* Arrow → ETC */}
                <path d="M 180 180 L 230 180" stroke="hsl(0 70% 50%)" strokeWidth="2" markerEnd="url(#redArrow)" />
  
                {/* ETC complex */}
                <g>
                  <rect x="240" y="155" width="120" height="50" rx="4" fill="hsl(220 70% 50%)" opacity="0.15" stroke="hsl(220 70% 40%)" />
                  <text x="300" y="178" textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">ETC + β-oxidation</text>
                  <text x="300" y="194" textAnchor="middle" fontSize="9" className="fill-muted-foreground">Complex II/IV blocked</text>
                </g>
  
                {/* Downstream effects */}
                <path d="M 360 165 L 430 130" stroke="hsl(215 25% 50%)" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d="M 360 195 L 430 230" stroke="hsl(215 25% 50%)" strokeWidth="1.5" markerEnd="url(#arrow)" />
                <path d="M 360 180 L 430 180" stroke="hsl(215 25% 50%)" strokeWidth="1.5" markerEnd="url(#arrow)" />
  
                <g>
                  <rect x="430" y="105" width="130" height="40" rx="4" fill="hsl(45 90% 50%)" opacity="0.2" stroke="hsl(45 70% 40%)" />
                  <text x="495" y="122" textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">↑ FFA accumulation</text>
                  <text x="495" y="136" textAnchor="middle" fontSize="9" className="fill-muted-foreground">impaired β-oxidation</text>
                </g>
                <g>
                  <rect x="430" y="160" width="130" height="40" rx="4" fill="hsl(0 70% 50%)" opacity="0.2" stroke="hsl(0 60% 40%)" />
                  <text x="495" y="177" textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">↑ Lactate</text>
                  <text x="495" y="191" textAnchor="middle" fontSize="9" className="fill-muted-foreground">anaerobic shift</text>
                </g>
                <g>
                  <rect x="430" y="215" width="130" height="40" rx="4" fill="hsl(280 50% 50%)" opacity="0.2" stroke="hsl(280 50% 40%)" />
                  <text x="495" y="232" textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">Myocyte necrosis</text>
                  <text x="495" y="246" textAnchor="middle" fontSize="9" className="fill-muted-foreground">ATP depletion</text>
                </g>
  
                {/* Final outcome */}
                <g>
                  <rect x="180" y="290" width="240" height="50" rx="6" fill="hsl(0 75% 50%)" opacity="0.9" />
                  <text x="300" y="312" textAnchor="middle" fontSize="12" className="fill-white font-bold">PRIS</text>
                  <text x="300" y="328" textAnchor="middle" fontSize="10" className="fill-white/90">cardiac failure · metabolic acidosis · rhabdomyolysis</text>
                </g>
  
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(215 25% 50%)" />
                  </marker>
                  <marker id="redArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(0 70% 50%)" />
                  </marker>
                </defs>
              </svg>
              <p className="text-xs text-muted-foreground mt-2">
                Propofol uncouples oxidative phosphorylation and inhibits mitochondrial electron transport chain (Complexes II & IV) and
                fatty-acid β-oxidation. The cell is forced into anaerobic metabolism — lactate rises and ATP-dependent myocyte function fails.
              </p>
            </div>
          </TabsContent>
  
          {/* CLINICAL FEATURES */}
          <TabsContent value="features" className="mt-4">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { sys: "Cardiac", color: "hsl(0 70% 50%)", items: ["Refractory bradycardia → asystole", "Brugada-like ECG (coved ST in V1–V3)", "Cardiogenic shock", "Reduced contractility"] },
                { sys: "Metabolic", color: "hsl(25 85% 50%)", items: ["Severe metabolic acidosis (lactate > 4 mmol/L)", "↑ Anion gap", "Hypoglycaemia in children", "Hyperkalaemia"] },
                { sys: "Muscle", color: "hsl(280 50% 50%)", items: ["Rhabdomyolysis (CK often > 10,000)", "Myoglobinuria", "Skeletal & cardiac muscle necrosis"] },
                { sys: "Renal/Hepatic", color: "hsl(220 60% 50%)", items: ["AKI (myoglobin + hypoperfusion)", "Hepatomegaly", "Lipaemic serum (↑ triglycerides)", "Green/pink urine (uncommon)"] },
              ].map((g) => (
                <div key={g.sys} className="bg-card rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                    <span className="text-sm font-semibold text-foreground">{g.sys}</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    {g.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bg-secondary/30 rounded-lg border border-border p-3 mt-3 text-xs text-foreground">
              <strong>Diagnosis is clinical</strong> — combine unexplained metabolic acidosis + cardiac dysfunction + rising CK/lactate
              in a patient on prolonged propofol infusion. Mortality up to 30–80% once full syndrome is established.
            </div>
          </TabsContent>
  
          {/* RISK CALCULATOR */}
          <TabsContent value="risk" className="mt-4">
            <div className="bg-card rounded-lg border border-border p-4 space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground flex justify-between">
                  <span>Propofol dose</span>
                  <span className={dose > 4 ? "text-[hsl(0_75%_50%)] font-semibold" : ""}>{dose.toFixed(1)} mg/kg/h</span>
                </label>
                <Slider value={[dose]} min={1} max={8} step={0.5} onValueChange={(v) => setDose(v[0])} className="mt-2" />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>1</span><span className="text-[hsl(0_75%_50%)]">↑ 4 mg/kg/h threshold</span><span>8</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground flex justify-between">
                  <span>Infusion duration</span>
                  <span className={duration > 48 ? "text-[hsl(0_75%_50%)] font-semibold" : ""}>{duration} h</span>
                </label>
                <Slider value={[duration]} min={6} max={96} step={2} onValueChange={(v) => setDuration(v[0])} className="mt-2" />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>6 h</span><span className="text-[hsl(0_75%_50%)]">↑ 48 h threshold</span><span>96 h</span>
                </div>
              </div>
  
              {/* Risk gauge */}
              <div className="bg-secondary/30 rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-foreground">Estimated PRIS risk</span>
                  <span className="text-sm font-bold" style={{ color: riskColor }}>{riskLabel} ({risk}%)</span>
                </div>
                <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                  <div className="h-full transition-all duration-300" style={{ width: `${risk}%`, backgroundColor: riskColor }} />
                </div>
                {aboveThreshold && (
                  <p className="text-xs text-[hsl(0_75%_50%)] font-medium mt-3">
                    ⚠ Both canonical thresholds exceeded (&gt; 4 mg/kg/h for &gt; 48 h). Switch to alternative sedation, send CK / lactate / triglycerides / ABG.
                  </p>
                )}
              </div>
  
              <div className="grid sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded border border-border bg-secondary/20">
                  <p className="font-semibold text-foreground mb-1">Patient risk factors</p>
                  <ul className="text-muted-foreground list-disc list-inside space-y-0.5">
                    <li>Children (esp. ICU sedation — now contraindicated &lt;16 yr)</li>
                    <li>Critical illness, sepsis, head injury</li>
                    <li>Catecholamine / steroid infusions</li>
                    <li>Low carbohydrate intake (high FFA)</li>
                    <li>Inborn errors of mitochondrial metabolism</li>
                  </ul>
                </div>
                <div className="p-3 rounded border border-border bg-secondary/20">
                  <p className="font-semibold text-foreground mb-1">Drug factors</p>
                  <ul className="text-muted-foreground list-disc list-inside space-y-0.5">
                    <li>Dose &gt; 4 mg/kg/h</li>
                    <li>Duration &gt; 48 h</li>
                    <li>Cumulative dose</li>
                    <li>Concomitant catecholamines / steroids</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
  
          {/* MANAGEMENT */}
          <TabsContent value="management" className="mt-4">
            <div className="space-y-3">
              <div className="bg-card rounded-lg border border-border p-3">
                <p className="text-sm font-semibold text-foreground mb-2">1. Prevention</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                  <li>Limit dose to &lt; 4 mg/kg/h and duration &lt; 48 h for ICU sedation</li>
                  <li>Avoid in children for ICU sedation (UK MHRA, FDA)</li>
                  <li>Daily monitoring: ABG (lactate, base deficit), CK, triglycerides, ECG, U&Es</li>
                  <li>Ensure adequate carbohydrate intake (≥ 6–8 mg/kg/min glucose in children)</li>
                </ul>
              </div>
              <div className="bg-card rounded-lg border border-border p-3">
                <p className="text-sm font-semibold text-foreground mb-2">2. Recognition triggers</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                  <li>Unexplained worsening metabolic acidosis with rising lactate</li>
                  <li>New bradyarrhythmia or Brugada-pattern ECG</li>
                  <li>Rising CK, myoglobinuria, lipaemic serum</li>
                </ul>
              </div>
              <div className="bg-card rounded-lg border border-border p-3">
                <p className="text-sm font-semibold text-foreground mb-2">3. Treatment</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
                  <li><strong className="text-foreground">Stop propofol immediately</strong> — switch to alternative (midazolam, dexmedetomidine, alfentanil/remifentanil)</li>
                  <li>Supportive: inotropes, pacing for bradyarrhythmia, ventilation</li>
                  <li>Correct acidosis; treat hyperkalaemia</li>
                  <li><strong className="text-foreground">Renal replacement therapy</strong> — removes propofol, lactate, and myoglobin; correct acidosis</li>
                  <li>Consider ECMO / VA-ECMO for refractory cardiogenic shock</li>
                  <li>Carbohydrate loading to suppress lipolysis</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DiagramFigure>
  );
};

export default PRISDiagram;
