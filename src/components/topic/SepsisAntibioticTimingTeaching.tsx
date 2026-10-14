import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="sepsis" refLabel="Seymour 2017 NY sepsis mandate" />;

export function SepsisAntibioticTimingTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">How Fast Do Antibiotics Need to Be? The New York Sepsis Mandate Data</h2>
    <p>New York State requires hospitals to follow sepsis protocols. Seymour and colleagues analysed 49,331 patients at 149 hospitals (2014–16) whose 3-hour bundle was completed within 12 hours. The bundle was blood cultures, broad-spectrum antibiotics and a lactate measurement. 82.5% completed it within 3 hours. Median times were 0.95 hours to antibiotics, 1.30 hours to completing the bundle and 2.56 hours to finishing the initial fluid bolus.<R /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Antibiotics:</strong> each hour of delay was associated with higher risk-adjusted in-hospital mortality (OR 1.04 per hour, 95% CI 1.03–1.06).<R /></li>
      <li><strong className="text-foreground">Bundle completion:</strong> also OR 1.04 per hour (1.02–1.05).<R /></li>
      <li><strong className="text-foreground">Fluid bolus:</strong> taking longer to finish the bolus was <em>not</em> associated with mortality (OR 1.01 per hour, 0.99–1.02; P = 0.21).<R /></li>
    </ul>
    <p><strong className="text-foreground">Interpretation:</strong> this is observational, risk-adjusted data, not a randomised trial, so it shows association rather than proven cause. It supports making antibiotics the time-critical part of the bundle, and it does not support rushing fluids for their own sake.</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: which bundle element's timing was <em>not</em> associated with mortality?</summary><p className="mt-2">Completion of the initial intravenous fluid bolus (OR 1.01 per hour, P = 0.21). Delays to antibiotics and to completing the whole bundle were both associated with higher mortality (OR 1.04 per hour).</p></details>
    <LessonSources topicId="sepsis" labels={["Seymour 2017 NY sepsis mandate"]} />
  </div>;
}
