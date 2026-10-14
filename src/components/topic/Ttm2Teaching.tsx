import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="cardiac-arrest-post-resus" refLabel="TTM2 2021" />;

export function Ttm2Teaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Temperature Control After Cardiac Arrest: TTM2 in Detail</h2>
    <p>TTM2 randomised 1,900 comatose adults after out-of-hospital cardiac arrest of presumed cardiac or unknown cause. One group was cooled to 33 °C with controlled rewarming; the other had targeted normothermia with early treatment of fever (≥37.8 °C). The trial was open-label, but outcomes were assessed blind. The primary outcome was death at 6 months.<R /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Death at 6 months:</strong> 50% vs 48% (RR 1.04, 95% CI 0.94–1.14; P = 0.37).<R /></li>
      <li><strong className="text-foreground">Poor function (modified Rankin ≥4):</strong> 55% in both groups (RR 1.00, 0.92–1.09).<R /></li>
      <li><strong className="text-foreground">Subgroups:</strong> results were consistent across sex, age, initial rhythm, time to ROSC and shock on admission.<R /></li>
      <li><strong className="text-foreground">Harm:</strong> arrhythmia causing haemodynamic compromise was more common with hypothermia (24% vs 17%, P &lt; 0.001). Other adverse events were similar.<R /></li>
    </ul>
    <p><strong className="text-foreground">Exam framing:</strong> TTM2 tested whether hypothermia was <em>superior</em>, and it was not. It is not a non-inferiority trial. The comparator still involved active fever management, so "normothermia" means preventing fever, not leaving temperature untreated.</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what fever threshold triggered treatment in the TTM2 normothermia arm?</summary><p className="mt-2">≥37.8 °C. Hypothermia at 33 °C did not reduce 6-month death (50% vs 48%), and it caused more haemodynamically significant arrhythmias.</p></details>
    <LessonSources topicId="cardiac-arrest-post-resus" labels={["TTM2 2021"]} />
  </div>;
}
