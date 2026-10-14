import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="neurointensive-care" refLabel={label} />;

export function BrainInjuryTransfusionTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Red-Cell Transfusion Thresholds After Brain Injury: HEMOTION and TRAIN</h2>
    <p>For most ICU patients, a restrictive haemoglobin threshold of about 70 g/L is standard. The injured brain may be less tolerant of reduced oxygen delivery, and two 2024 trials tested this directly.</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse">
      <thead><tr className="border-b border-border"><th className="text-left py-2 pr-3 text-foreground">Trial</th><th className="text-left py-2 pr-3 text-foreground">Population and thresholds</th><th className="text-left py-2 text-foreground">Unfavourable neurological outcome (liberal vs restrictive)</th></tr></thead>
      <tbody>
        <tr className="border-b border-border/50 align-top"><td className="py-2 pr-3 font-medium text-foreground">HEMOTION (NEJM 2024)</td><td className="py-2 pr-3">742 adults with moderate–severe TBI and anaemia; transfuse at ≤100 vs ≤70 g/L. Median ICU Hb was 108 vs 88 g/L.<R label="Turgeon 2024 HEMOTION" /></td><td className="py-2">68.4% vs 73.5% at 6 months. The adjusted difference of 5.4 percentage points (95% CI −2.9 to 13.7) was not significant.<R label="Turgeon 2024 HEMOTION" /></td></tr>
        <tr className="align-top"><td className="py-2 pr-3 font-medium text-foreground">TRAIN (JAMA 2024)</td><td className="py-2 pr-3">820 patients with acute brain injury (TBI, subarachnoid or intracerebral haemorrhage) and anaemia. Median 2 vs 0 units transfused.<R label="Taccone 2024 TRAIN" /></td><td className="py-2">62.6% vs 72.6% at 180 days; absolute difference −10.0% (−16.5 to −3.6), adjusted RR 0.86, P = 0.002.<R label="Taccone 2024 TRAIN" /></td></tr>
      </tbody></table></div>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Reading them together:</strong> both point estimates favour a liberal strategy. TRAIN was positive in a broader brain-injury population; HEMOTION's TBI-only result was not significant, but its confidence interval includes benefit.</li>
      <li><strong className="text-foreground">Exam answer:</strong> the restrictive 70 g/L default from general ICU trials should not be assumed safe after acute brain injury. A higher threshold, such as the trials' liberal arm (TRAIN: 90 g/L; HEMOTION: 100 g/L), is now evidence-informed. Weigh it against transfusion risks and local guidance.</li>
      <li><strong className="text-foreground">Limits:</strong> neither trial could blind clinicians. Outcomes were functional scales, and the trials used different populations and outcome timings, so they should not simply be pooled.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: which trial showed a statistically significant benefit of liberal transfusion?</summary><p className="mt-2">TRAIN (all acute brain injury). HEMOTION (TBI only) showed a similar direction of effect but was not statistically significant.</p></details>
    <LessonSources topicId="neurointensive-care" labels={["Turgeon 2024 HEMOTION", "Taccone 2024 TRAIN"]} />
  </div>;
}
