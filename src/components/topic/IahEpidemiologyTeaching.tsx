import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="abdominal-compartment-syndrome" refLabel="Malbrain 2005 IAH epidemiology" />;

export function IahEpidemiologyTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Does Intra-Abdominal Hypertension Predict Death? The Multicentre Epidemiology Study</h2>
    <p>Malbrain and colleagues studied 265 consecutive patients staying more than 24 hours in 14 ICUs across six countries. This was a mixed medical and surgical population. Intra-abdominal pressure was measured twice daily via the bladder.<R /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Admission pressure:</strong> higher in non-survivors (11.4 ± 4.8 vs 9.5 ± 4.8 mmHg), but it was <em>not</em> an independent predictor of death.<R /></li>
      <li><strong className="text-foreground">IAH developing during the ICU stay:</strong> it <em>was</em> independently associated with mortality (RR 1.85, 95% CI 1.12–3.06).<R /></li>
      <li><strong className="text-foreground">Other independent predictors:</strong> age (OR 1.04), APACHE II (OR 1.1), medical vs surgical admission (OR 2.5) and liver dysfunction (OR 2.5).<R /></li>
      <li><strong className="text-foreground">Organ function:</strong> patients with IAH on admission had higher SOFA scores during their ICU stay.<R /></li>
    </ul>
    <p><strong className="text-foreground">Practice point:</strong> IAH matters in medical patients, not only after trauma or surgery. Because the pressure that develops during the stay is what matters, measure serially in at-risk patients rather than once on admission. This is an observational association: it does not prove that lowering the pressure improves survival.</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: was admission IAP an independent predictor of mortality in this study?</summary><p className="mt-2">No. Developing IAH during the ICU stay was (RR 1.85), which supports repeated measurement.</p></details>
    <LessonSources topicId="abdominal-compartment-syndrome" labels={["Malbrain 2005 IAH epidemiology"]} />
  </div>;
}
