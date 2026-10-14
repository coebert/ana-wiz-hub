import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="transfer-medicine" refLabel={label} />;

export function TransferEvidenceTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">How Often Transfers Go Wrong, and What Reduces the Risk</h2>
    <p>The checklists and staffing rules on this page come from studies of how often, and how, things go wrong during transfers. This lesson sets out the numbers and how strong the evidence behind each preventive measure is.</p>

    <h3 className="text-lg font-semibold text-foreground">How common are adverse events? (Parmentier-Decrucq 2013)</h3>
    <p>A prospective study followed 262 transfers within the hospital of 184 ventilated patients from a 38-bed university ICU. <strong className="text-foreground">45.8%</strong> of transfers had an adverse event: 26% of all transfers involved an event affecting the patient, and 16.8% an event judged serious. Independent risk factors were PEEP above 6 cmH₂O, sedation before transport, fluid loading, and changing treatment just before departure. The adverse events did not significantly increase ventilator-associated pneumonia, ventilator days or ICU stay.<R label="Parmentier-Decrucq 2013" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: why should PEEP above 6 cmH₂O make you more cautious about a CT trip?</summary><p className="mt-2">A patient needing higher PEEP has little respiratory reserve. Disconnection, switching to a transport ventilator or moving the patient can cause loss of lung recruitment and desaturation. Plan a closed-circuit transfer with clamped tubes, a transport ventilator matched to ICU settings, a check of gases after switching, and an experienced escort, or ask whether the scan is worth the risk.</p></details>

    <h3 className="text-lg font-semibold text-foreground">Why checklists? (Fanara 2010)</h3>
    <p>Fanara and colleagues reviewed the literature on transfers within the hospital from 1998 to 2009 and proposed a quick-execution checklist. They were clear about the limits of the evidence. In their words, "basic training, good clinical sense and a risk-benefit analysis are currently the only deciding factors". They warned that "a critically ill patient, prepared and accompanied by an inexperienced team, is a risky combination", and said the protective effect of checklists still needed evaluation.<R label="Fanara 2010" /></p>

    <h3 className="text-lg font-semibold text-foreground">Team training for transfers between hospitals (Droogh 2012)</h3>
    <p>When the Netherlands made a mobile ICU mandatory for transfers between ICUs, the Groningen retrieval service built simulator-based crew resource management training. The four-hour scenario training covers preparation, teamwork, equipment, mobility and safety. It is run in a mock ICU and then in the mobile ICU itself. This is a description of a programme, not a trial of outcomes: it shows how training can be built, not that it reduces harm.<R label="Droogh 2012" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: how strong is the evidence that checklists and training make transfers safer?</summary><p className="mt-2">Weak. The size of the problem is well documented by prospective observational data, but the remedies (checklists, dedicated teams, simulation) rest on expert recommendation and programme descriptions rather than randomised outcome data. Say that clearly, then explain why they are still recommended: the harms are common, predictable and partly preventable.</p></details>

    <LessonSources topicId="transfer-medicine" labels={["Parmentier-Decrucq 2013", "Fanara 2010", "Droogh 2012"]} />
  </div>;
}
