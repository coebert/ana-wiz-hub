import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="mechanical-ventilation" refLabel="Guérin 2013 PROSEVA" />;

export function ProsevaTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Prone Positioning in Severe ARDS: PROSEVA in Detail</h2>
    <p>PROSEVA randomised 466 patients with severe ARDS to prone sessions of at least 16 hours or to stay supine. Entry needed all four criteria: PaO₂/FiO₂ below 150 mmHg (about 20 kPa), FiO₂ at least 0.6, PEEP at least 5 cmH₂O, and a tidal volume close to 6 mL/kg predicted body weight. The primary outcome was death within 28 days.<R /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">28-day mortality:</strong> 16.0% prone vs 32.8% supine (P &lt; 0.001; HR 0.39, 95% CI 0.25–0.63). The absolute reduction of 16.8 percentage points gives a number needed to treat of about 6.<R /></li>
      <li><strong className="text-foreground">90-day mortality:</strong> 23.6% vs 41.0% (HR 0.44, 0.29–0.67).<R /></li>
      <li><strong className="text-foreground">Complications:</strong> no significant differences, except that cardiac arrests were more common in the <em>supine</em> group.<R /></li>
    </ul>
    <p><strong className="text-foreground">What defined the trial:</strong> patients were enrolled early, had severe hypoxaemia, received long sessions and were already on lung-protective ventilation. Apply the result to patients who match these entry criteria, not to mild ARDS.</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: state PROSEVA's entry criteria.</summary><p className="mt-2">PaO₂/FiO₂ below 150 mmHg, FiO₂ at least 0.6, PEEP at least 5 cmH₂O, and tidal volume around 6 mL/kg PBW. Prone sessions lasted at least 16 hours.</p></details>
    <LessonSources topicId="mechanical-ventilation" labels={["Guérin 2013 PROSEVA"]} />
  </div>;
}
