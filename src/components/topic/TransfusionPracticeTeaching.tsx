import { useState } from "react";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { THRESHOLDS_G_PER_L, belowDiscussedTrigger, type TransfusionPopulation } from "@/lib/transfusion-thresholds";

const T = "transfusion-coagulation";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const labels = ["NICE NG24 thresholds", "MINT 2023 result", "TRAIN 2024 result", "HEMOTION 2024", "SAHaRA 2024", "SHOT 2023", "CRASH-2 2010"];

function ThresholdTool() {
  const [pop, setPop] = useState<TransfusionPopulation>("general");
  const [hb, setHb] = useState("");
  const below = hb.trim() ? belowDiscussedTrigger(pop, Number(hb)) : null;
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3 text-sm">
      <p className="font-semibold text-foreground">Teaching tool: which threshold does the evidence discuss?</p>
      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col">Patient group<select value={pop} onChange={(e) => setPop(e.target.value as TransfusionPopulation)} className="mt-1 rounded border border-input bg-background px-2 py-1"><option value="general">General ICU / surgical</option><option value="acs">Acute coronary syndrome</option><option value="brain-injury">Acute brain injury</option></select></label>
        <label className="flex flex-col">Hb (g/L)<input inputMode="decimal" value={hb} onChange={(e) => setHb(e.target.value)} className="mt-1 w-24 rounded border border-input bg-background px-2 py-1" /></label>
      </div>
      <p>{THRESHOLDS_G_PER_L[pop].note}.</p>
      {below === null ? <p>Enter Hb in g/L (g/dL × 10).</p> : <p><strong className="text-foreground">{below ? "Below" : "At or above"}</strong> the {THRESHOLDS_G_PER_L[pop].trigger} g/L figure discussed.</p>}
      <p className="text-xs">This is not a decision to transfuse. Active bleeding, symptoms and the trend matter more than a single number. Give one unit at a time, then reassess.</p>
    </div>
  );
}

export function TransfusionPracticeTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Latest Guidelines and Bedside Management: NICE NG24 and the 2023–2025 Threshold Trials</h2>
    <p>NICE NG24 was last updated on 26 February 2026. Its red-cell thresholds are unchanged: a restrictive trigger of 70 g/L with a post-transfusion target of 70–90 g/L, and 80 g/L (target 80–100 g/L) in acute coronary syndrome.<R label="NICE NG24 thresholds" /> Recent trials have challenged the idea that one restrictive number suits everyone.</p>

    <h3 className="text-lg font-semibold text-foreground">Trial evidence by population</h3>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead className="bg-muted/50 text-foreground"><tr><th className="p-2 text-left">Population</th><th className="p-2 text-left">Trial / guidance</th><th className="p-2 text-left">Triggers compared</th><th className="p-2 text-left">Result</th></tr></thead>
      <tbody>
        <tr className="border-t border-border"><td className="p-2">General ICU / surgical</td><td className="p-2">NICE NG24</td><td className="p-2">70 g/L</td><td className="p-2">Restrictive default<R label="NICE NG24 thresholds" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">Myocardial infarction</td><td className="p-2">MINT 2023 (3,504 patients)</td><td className="p-2">100 vs 70–80 g/L</td><td className="p-2">Death or re-infarction 14.5% vs 16.9% (P = 0.07); harm from restriction not excluded<R label="MINT 2023 result" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">Mixed acute brain injury</td><td className="p-2">TRAIN 2024 (820 patients)</td><td className="p-2">&lt;90 vs &lt;70 g/L</td><td className="p-2">Unfavourable neurological outcome 62.6% vs 72.6%, favouring liberal<R label="TRAIN 2024 result" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">Traumatic brain injury</td><td className="p-2">HEMOTION 2024 (742 patients)</td><td className="p-2">≤100 vs ≤70 g/L</td><td className="p-2">68.4% vs 73.5% unfavourable at 6 months, not significant<R label="HEMOTION 2024" /></td></tr>
        <tr className="border-t border-border"><td className="p-2">Subarachnoid haemorrhage</td><td className="p-2">SAHaRA (742 patients)</td><td className="p-2">≤100 vs ≤80 g/L</td><td className="p-2">33.5% vs 37.7% unfavourable at 12 months, not significant<R label="SAHaRA 2024" /></td></tr>
      </tbody>
    </table></div>
    <p><strong className="text-foreground">Interpretation:</strong> in brain injury, the three trials each point the same way (toward a liberal threshold), but only TRAIN reached significance. Many units now avoid letting Hb fall below about 70 g/L in these patients and individualise toward 90–100 g/L. MINT's direction and confidence interval mean a 70 g/L trigger after MI is hard to defend.</p>

    <h3 className="text-lg font-semibold text-foreground">Bedside checklist before each unit</h3>
    <ol className="list-decimal pl-5 space-y-1">
      <li>Is the patient actively bleeding? If so, follow the major haemorrhage protocol rather than a threshold. In trauma, give tranexamic acid within 3 h.<R label="CRASH-2 2010" /></li>
      <li>Which group? General (70 g/L), acute coronary syndrome (80 g/L or higher), or acute brain injury (consider a higher threshold).</li>
      <li>Give one unit, then reassess Hb and the patient before ordering another.</li>
      <li>Assess the risk of transfusion-associated circulatory overload (TACO): age, heart failure, kidney failure, positive fluid balance. Consider a slower rate or a diuretic. SHOT reports TACO as a leading cause of transfusion-related death.<R label="SHOT 2023" /></li>
      <li>Treat the cause: iron deficiency, blood loss from tests, bleeding from the gut.</li>
      <li>Document why you transfused, what consent was given and the post-transfusion Hb.</li>
    </ol>

    <ThresholdTool />

    <h3 className="text-lg font-semibold text-foreground">Worked cases (fictional)</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li>A septic patient on day 3, not bleeding, Hb 74 g/L, with no cardiac history. Under the 70 g/L threshold no transfusion is given; Hb is rechecked in the morning.</li>
      <li>Day 2 after NSTEMI, Hb 78 g/L. This is below NICE's 80 g/L, so one unit is given. MINT's direction supports not waiting for 70 g/L.</li>
      <li>Day 4 after severe TBI, Hb 82 g/L. TRAIN would have transfused at &lt;90 g/L. The team discusses individualising, gives one unit and assesses for TACO.</li>
    </ul>

    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: which brain-injury trial showed a significant benefit of liberal transfusion?</summary><p className="mt-2">TRAIN (trigger &lt;90 vs &lt;70 g/L). HEMOTION (TBI) and SAHaRA (subarachnoid haemorrhage) pointed the same way but were not significant.</p></details>
    <p className="text-xs">These are teaching notes, not a transfusion protocol. Follow your local hospital transfusion team.</p>
    <LessonSources topicId={T} labels={labels} />
  </div>;
}
