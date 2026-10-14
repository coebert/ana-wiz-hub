import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="aki-rrt" refLabel="Bellomo 2009 RENAL" />;

export function RrtIntensityTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">How Much CRRT? The RENAL Trial</h2>
    <p>RENAL randomised 1,508 critically ill adults with AKI to postdilution CVVHDF at an effluent flow of 40 mL/kg/h (higher intensity) or 25 mL/kg/h (lower intensity). Treatment lasted an average of 6.3 vs 5.9 days. The primary outcome was death within 90 days.<R /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">90-day mortality:</strong> 44.7% in both groups (OR 1.00, 95% CI 0.81–1.23; P = 0.99).<R /></li>
      <li><strong className="text-foreground">Still on RRT at 90 days (survivors):</strong> 6.8% vs 4.4% (OR 1.59, 0.86–2.92; P = 0.14), not significant.<R /></li>
      <li><strong className="text-foreground">Harm signal:</strong> low phosphate was more common with higher intensity (65% vs 54%, P &lt; 0.001).<R /></li>
    </ul>
    <p><strong className="text-foreground">Practice point:</strong> the 25 mL/kg/h arm was the comparator in RENAL; the dose actually delivered is often lower than prescribed. Prescribing somewhat above the delivered target to allow for downtime is common practice, but RENAL did not test that. Higher doses add cost and electrolyte losses without improving survival. Monitor and replace phosphate.</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what did RENAL find with 40 vs 25 mL/kg/h?</summary><p className="mt-2">No difference in 90-day mortality (44.7% in both groups), and more hypophosphataemia with the higher dose (65% vs 54%).</p></details>
    <LessonSources topicId="aki-rrt" labels={["Bellomo 2009 RENAL"]} />
  </div>;
}
