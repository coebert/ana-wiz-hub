import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="neurointensive-care" refLabel="Hutchinson 2016 RESCUEicp" />;

export function RescueIcpTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Decompressive Craniectomy for Refractory ICP: RESCUEicp in Detail</h2>
    <p>RESCUEicp (2004–2014) randomised 408 patients aged 10–65 with traumatic brain injury and refractory intracranial pressure above 25 mmHg. They had either decompressive craniectomy or continued medical care. The primary outcome was the 8-point Extended Glasgow Outcome Scale (GOS-E) at 6 months.<R /></p>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse">
      <thead><tr className="border-b border-border"><th className="text-left py-2 pr-3 text-foreground">GOS-E at 6 months</th><th className="text-left py-2 pr-3 text-foreground">Craniectomy (n = 201)</th><th className="text-left py-2 text-foreground">Medical (n = 188)</th></tr></thead>
      <tbody>
        {[["Death","26.9%","48.9%"],["Vegetative state","8.5%","2.1%"],["Lower severe disability (dependent)","21.9%","14.4%"],["Upper severe disability (independent at home)","15.4%","8.0%"],["Moderate disability","23.4%","19.7%"],["Good recovery","4.0%","6.9%"]].map(([a,b,c]) => <tr key={a} className="border-b border-border/50"><td className="py-2 pr-3 font-medium text-foreground">{a}</td><td className="py-2 pr-3">{b}</td><td className="py-2">{c}</td></tr>)}
      </tbody></table></div>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">At 12 months:</strong> death 30.4% vs 52.0%; upper severe disability 13.4% vs 3.9%; good recovery 9.8% vs 8.4%.<R /></li>
      <li><strong className="text-foreground">ICP and harms:</strong> craniectomy patients spent fewer hours with ICP above 25 mmHg (median 5 vs 17), but had more adverse events (16.3% vs 9.2%, P = 0.03).<R /></li>
      <li><strong className="text-foreground">Analysis note:</strong> the outcome distributions differed (P &lt; 0.001), but the proportional-odds assumption failed, so results are reported descriptively rather than as a single effect size.<R /></li>
    </ul>
    <p><strong className="text-foreground">Exam framing:</strong> craniectomy roughly halves mortality at 6 months, but many of the extra survivors are vegetative or dependent. Rates of moderate disability and good recovery were similar. The decision depends on which outcomes the patient would have considered acceptable, so discuss it with neurosurgery and the family.</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: did craniectomy in RESCUEicp increase good recovery at 6 months?</summary><p className="mt-2">No (4.0% vs 6.9%). It reduced death (26.9% vs 48.9%) and increased vegetative state and severe disability.</p></details>
    <LessonSources topicId="neurointensive-care" labels={["Hutchinson 2016 RESCUEicp"]} />
  </div>;
}
