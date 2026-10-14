import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="sepsis" refLabel={label} />;

export function SepsisTargetsSteroidsTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Lower Blood-Pressure Targets and Steroids Before Shock: What the Trials Show</h2>
    <h3 className="text-lg font-semibold text-foreground">The 65 trial: permissive hypotension in older patients</h3>
    <p>This trial randomised patients aged 65 or over receiving vasopressors for vasodilatory hypotension. One group had vasopressors guided by a MAP target of 60–65 mmHg; the other had usual care at the clinician's discretion. The permissive group received less vasopressor: a median of 33 vs 38 hours, and 17.7 vs 26.4 mg noradrenaline equivalents. 90-day mortality was 41.0% vs 43.8% (risk difference −2.85%, 95% CI −6.75 to 1.05; P = 0.15). After prespecified adjustment, the odds ratio was 0.82 (0.68–0.98). Serious adverse events were similar (6.2% vs 5.8%).<R label="Lamontagne 2020 65 trial" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Interpretation:</strong> the primary result is neutral, but the confidence interval includes a clinically important benefit. The authors specifically ask readers to consider this.<R label="Lamontagne 2020 65 trial" /></li>
      <li><strong className="text-foreground">What it supports:</strong> in older patients, accepting a MAP of 60–65 mmHg reduced vasopressor exposure without a signal of harm in this trial. The adjusted analysis is supportive but secondary.</li>
      <li><strong className="text-foreground">Bedside use:</strong> pair a lower MAP target with regular perfusion checks (lactate trend, capillary refill, urine output, mentation). Individualise for chronic hypertension or raised intracranial pressure, which were not the question this trial answered.</li>
    </ul>
    <h3 className="text-lg font-semibold text-foreground">HYPRESS: hydrocortisone in sepsis without shock</h3>
    <p>Adults with severe sepsis but not in shock received hydrocortisone 200 mg/day by continuous infusion for 5 days, tapered to day 11, or placebo. Septic shock within 14 days occurred in 21.2% vs 22.9% (P = 0.70). There was no difference in mortality at 28 days (8.8% vs 8.2%), 90 days or 180 days. The authors concluded that the findings do not support hydrocortisone in these patients.<R label="Keh 2016 HYPRESS" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Key distinction:</strong> HYPRESS addresses <em>preventing</em> shock. The steroid trials in established vasopressor-dependent shock (ADRENAL, APROCCHSS), discussed elsewhere on this page, ask a different question. Do not extrapolate between the two populations.<R label="Keh 2016 HYPRESS" /></li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: did the 65 trial show that a MAP target of 60–65 mmHg lowers mortality?</summary><p className="mt-2">No. The primary result was not statistically significant (41.0% vs 43.8%, P = 0.15). It showed less vasopressor exposure without evident harm, and its confidence interval does not exclude meaningful benefit.</p></details>
    <LessonSources topicId="sepsis" labels={["Lamontagne 2020 65 trial", "Keh 2016 HYPRESS"]} />
  </div>;
}
