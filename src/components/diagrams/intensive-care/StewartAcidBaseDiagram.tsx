import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { Button } from "@/components/ui/button";
import { InlineRef } from "@/components/references/InlineRef";
import { RotateCcw } from "lucide-react";

type VariableKey = "sid" | "atot" | "pco2";
const variables: Record<VariableKey, { label: string; low: string; high: string; explanation: string }> = {
  sid: { label: "Strong ion difference", low: "Lower SID → acidifying", high: "Higher SID → alkalinising", explanation: "SID is net strong-ion charge. Relative chloride excess lowers it; chloride loss can raise it. Count calcium and magnesium as charge equivalents when calculating full SID." },
  atot: { label: "Total weak acids (A tot)", low: "Fewer weak acids → alkalinising", high: "More weak acids → acidifying", explanation: "Albumin and phosphate are weak acids. Hypoalbuminaemia lowers A tot; it does not raise SID. Total weak-acid concentration is not the same as its pH-dependent negative charge." },
  pco2: { label: "PaCO₂", low: "Lower PaCO₂ → alkalinising", high: "Higher PaCO₂ → acidifying", explanation: "Alveolar ventilation controls the respiratory variable. Its effect can reinforce or oppose a metabolic disturbance; direction alone cannot predict the final pH." },
};
const order: VariableKey[] = ["sid", "atot", "pco2"];

const StewartAcidBaseDiagram = () => {
  const [values, setValues] = useState<Record<VariableKey, number>>({ sid: 0, atot: 0, pco2: 0 });
  const [selected, setSelected] = useState<VariableKey>("sid");
  return <DiagramFigure id="stewart-acid-base-diagram" title="Stewart variables: direction of effect" description="Qualitative comparison of strong ion difference, total weak acids and carbon dioxide. No numerical pH prediction is made.">
    <div className="border border-border rounded-lg p-4 mb-6 space-y-4">
      <h3 className="text-lg font-serif font-bold text-foreground">Stewart: independent effects</h3>
      <p className="text-sm text-muted-foreground">Each change is considered with the other variables held constant. Combined effects require the full chemical model; these controls do not calculate patient pH.<InlineRef topicId="acid-base" refLabel="Wooten 2004 Stewart" /></p>
      {order.map(key => <div key={key} className="border-b border-border pb-4">
        <label className="block text-sm font-semibold text-foreground" htmlFor={`stewart-${key}`}>{variables[key].label}</label>
        <input id={`stewart-${key}`} type="range" min={-1} max={1} step={1} value={values[key]} className="w-full mt-2 accent-primary" onFocus={() => setSelected(key)} onChange={e => { setSelected(key); setValues(v => ({ ...v, [key]: Number(e.target.value) })); }} aria-valuetext={values[key] < 0 ? "Lower" : values[key] > 0 ? "Higher" : "Unchanged"} />
        <div className="flex justify-between text-xs text-muted-foreground"><span>Lower</span><span>Unchanged</span><span>Higher</span></div>
        <p className="text-sm font-medium text-primary mt-2 min-h-10" aria-live="polite">{values[key] < 0 ? variables[key].low : values[key] > 0 ? variables[key].high : "No change in this variable"}</p>
      </div>)}
      <p className="text-sm text-muted-foreground min-h-16">{variables[selected].explanation}</p>
      <Button variant="outline" size="sm" onClick={() => setValues({ sid: 0, atot: 0, pco2: 0 })}><RotateCcw aria-hidden="true" focusable={false} className="h-4 w-4 mr-2" />Reset variables</Button>
    </div>
  </DiagramFigure>;
};
export default StewartAcidBaseDiagram;
