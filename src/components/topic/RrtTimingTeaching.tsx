import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="aki-rrt" refLabel="Bagshaw 2020 STARRT-AKI" />;

export function RrtTimingTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">When to Start Renal Replacement Therapy: STARRT-AKI in Detail</h2>
    <p>STARRT-AKI was the largest trial of when to start renal replacement therapy (RRT). It randomised 3,019 critically ill adults with severe AKI, run in many countries. The <em>accelerated</em> strategy started RRT within 12 hours of meeting eligibility. The <em>standard</em> strategy discouraged RRT unless a conventional indication developed or AKI lasted more than 72 hours. The primary outcome was death from any cause at 90 days.<R /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">How many got RRT:</strong> 96.8% in the accelerated group vs 61.8% in the standard group. More than a third of the standard group never needed RRT.<R /></li>
      <li><strong className="text-foreground">90-day mortality:</strong> 43.9% vs 43.7% (RR 1.00, 95% CI 0.93–1.09; P = 0.92).<R /></li>
      <li><strong className="text-foreground">Still on dialysis at 90 days (survivors):</strong> 10.4% vs 6.0% (RR 1.74, 1.24–2.43), worse with the accelerated strategy.<R /></li>
      <li><strong className="text-foreground">Adverse events:</strong> 23.0% vs 16.5% (P &lt; 0.001).<R /></li>
    </ul>
    <p><strong className="text-foreground">Practice point:</strong> without an urgent indication (refractory hyperkalaemia, acidosis, fluid overload, uraemic complications), close monitoring with a standard strategy is reasonable. Starting early exposes patients to RRT that many will not need, with more adverse events and more patients still on dialysis at 90 days, and no survival benefit. The standard strategy is not "never": it still triggers RRT when indications arise or AKI persists.</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: name two outcomes that were worse with accelerated RRT in STARRT-AKI.</summary><p className="mt-2">More survivors still dependent on RRT at 90 days (10.4% vs 6.0%) and more adverse events (23.0% vs 16.5%). 90-day mortality was the same.</p></details>
    <LessonSources topicId="aki-rrt" labels={["Bagshaw 2020 STARRT-AKI"]} />
  </div>;
}
