import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { Button } from "@/components/ui/button";
import { InlineRef } from "@/components/references/InlineRef";

type Toxin = "methanol" | "eg" | "salicylate";
const toxins: Record<Toxin, { label: string; mass: number; ref: string; criteria: string[] }> = {
  methanol: { label: "Methanol", mass: 32.04, ref: "EXTRIP methanol", criteria: [
    "EXTRIP recommends extracorporeal treatment for coma, seizures, new visual deficits, pH ≤7.15, persistent metabolic acidosis despite supportive measures and antidotes, Na-only AG >24 mmol/L, or impaired kidney function.",
    "Concentration criteria depend on ADH blockade: >70 mg/dL with fomepizole, >60 mg/dL with ethanol, or >50 mg/dL without an ADH blocker.",
    "Intermittent haemodialysis is preferred. Continue ADH inhibition during treatment; specialist advice determines dosing and stopping criteria.",
  ] },
  eg: { label: "Ethylene glycol", mass: 62.07, ref: "EXTRIP ethylene glycol", criteria: [
    "With fomepizole, EXTRIP suggests extracorporeal treatment when EG is >50 mmol/L (>310 mg/dL); with no antidote it recommends treatment at >10 mmol/L (>62 mg/dL). Ethanol-treated patients have separate recommended/suggested concentration bands.",
    "With evidence of exposure, treatment is recommended for glycolate >12 mmol/L or AG >27 mmol/L, and suggested for glycolate 8–12 or AG 23–27. This EXTRIP AG includes potassium: Na + K − Cl − bicarbonate.",
    "Treatment is recommended for coma, seizures or KDIGO stage 2–3 AKI; it is suggested with CKD eGFR <45. Crystals alone are not a dialysis indication. Intermittent haemodialysis is preferred where available.",
  ] },
  salicylate: { label: "Salicylate", mass: 138.12, ref: "EXTRIP salicylates", criteria: [
    "EXTRIP recommends extracorporeal treatment above 100 mg/dL (1000 mg/L), or above 90 mg/dL with impaired kidney function. It suggests treatment above 90 mg/dL, or above 80 mg/dL with impaired kidney function.",
    "Treatment is recommended for altered mental status, new hypoxaemia requiring oxygen, or failure of standard therapy. It is suggested at systemic pH ≤7.20. Chronic exposure can be severe at lower concentrations: clinical assessment remains essential.",
    "Intermittent haemodialysis is preferred. Continue indicated bicarbonate treatment between sessions under specialist guidance; avoid loss of compensatory ventilation if airway intervention becomes necessary.",
  ] },
};

const ToxicAlcoholSalicylateCalculator = () => {
  const [toxin, setToxin] = useState<Toxin>("methanol");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("mg/dL");
  const item = toxins[toxin];
  const n = Number(value);
  const valid = value.trim() !== "" && Number.isFinite(n) && n >= 0;
  const mgL = unit === "mg/L" ? n : unit === "mmol/L" ? n * item.mass : n * 10;
  return <DiagramFigure id="toxic-alcohol-salicylate-calculator" title="Toxin concentrations and EXTRIP criteria" description="Unit conversion and toxin-specific dialysis criteria; not an automated treatment recommendation.">
    <div className="border border-border rounded-lg p-4 mb-4 space-y-4">
      <h3 className="font-serif font-bold text-foreground">Toxin concentrations and dialysis criteria</h3>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Toxin">{(Object.keys(toxins) as Toxin[]).map(key => <Button key={key} variant={key === toxin ? "default" : "outline"} size="sm" aria-pressed={key === toxin} onClick={() => { setToxin(key); setValue(""); }}>{toxins[key].label}</Button>)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="text-sm text-foreground">{item.label} concentration<input type="number" min={0} value={value} onChange={e => setValue(e.target.value)} className="block w-full mt-1 border border-input rounded p-2 bg-background" /></label>
        <label className="text-sm text-foreground">Concentration unit<select value={unit} onChange={e => setUnit(e.target.value)} className="block w-full mt-1 border border-input rounded p-2 bg-background"><option>mg/dL</option><option>mg/L</option><option>mmol/L</option></select></label>
      </div>
      <p className="text-sm font-mono text-primary min-h-10" role="status">{valid ? `${(mgL / 10).toFixed(1)} mg/dL = ${mgL.toFixed(1)} mg/L = ${(mgL / item.mass).toFixed(2)} mmol/L` : "Enter a valid non-negative concentration for unit conversion."}</p>
      <p className="text-sm text-muted-foreground">Conversion is arithmetic, not a safe/unsafe classification. Salicylate uses the salicylate molecular mass (138.12), not aspirin's molecular mass (180).</p>
      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-3">{item.criteria.map(c => <li key={c}>{c}</li>)}</ul>
      <p className="text-sm text-foreground">Suspected poisoning needs urgent NPIS/TOXBASE and renal/critical-care advice; do not wait for a concentration or a gap to become abnormal.<InlineRef topicId="acid-base" refLabel={item.ref} /></p>
    </div>
  </DiagramFigure>;
};
export default ToxicAlcoholSalicylateCalculator;
