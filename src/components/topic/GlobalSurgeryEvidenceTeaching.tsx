import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="resource-poor-anaesthesia" refLabel={label} />;

export function GlobalSurgeryEvidenceTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Evidence: Workforce, Outcomes and the Safety Checklist</h2>
    <h3 className="text-lg font-semibold text-foreground">How big is the workforce gap? The WFSA survey</h3>
    <p>The WFSA Global Anesthesia Workforce Survey (2015–16) collected data from 153 of 197 countries, covering 97.5% of the world's population. Physician anaesthesia provider (PAP) density ranged from 0 to over 20 per 100,000 population. Seventy-seven countries reported fewer than 5 PAPs per 100,000, with particularly low densities in the WHO African and South-East Asia regions.<R label="Kempthorne 2017 WFSA survey" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Non-physician providers</strong> make up a large share of the workforce, especially where resources are limited. Even when they are counted, 70 countries had fewer than 5 anaesthesia providers of any kind per 100,000.<R label="Kempthorne 2017 WFSA survey" /></li>
      <li><strong className="text-foreground">The interim target:</strong> the authors recommend at least 5 specialist physician anaesthesia providers per 100,000. Reaching it immediately would need over 136,000 more PAPs.<R label="Kempthorne 2017 WFSA survey" /></li>
    </ul>
    <h3 className="text-lg font-semibold text-foreground">What happens to patients? The African Surgical Outcomes Study (ASOS)</h3>
    <p>ASOS was a 7-day prospective cohort of 11,422 adult inpatients from 247 hospitals in 25 African countries (2016). Hospitals had a median of 0.7 specialist surgeons, obstetricians and anaesthetists combined per 100,000 population served. The patients were young (mean age 38.5 years) and low-risk (median ASA 1). Fifty-seven per cent of operations were urgent or emergent, and caesarean delivery was the commonest (33%).<R label="Biccard 2018 ASOS" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Outcomes:</strong> complications occurred in 18.2% and 2.1% of patients died; 94.1% of these deaths happened after the day of surgery. Infection was the commonest complication (10.2%), and 9.7% of infected patients died.<R label="Biccard 2018 ASOS" /></li>
      <li><strong className="text-foreground">Meaning:</strong> despite a low-risk profile, patients were twice as likely to die as the global average. Most deaths followed complications on the ward, so the authors call for better detection of deteriorating patients (failure to rescue), alongside wider access to surgery.<R label="Biccard 2018 ASOS" /></li>
    </ul>
    <h3 className="text-lg font-semibold text-foreground">The WHO Surgical Safety Checklist</h3>
    <p>In eight hospitals across high-, middle- and low-income settings (including Ifakara, Tanzania and New Delhi, India), outcomes were compared in 3,733 patients before and 3,955 patients after the checklist was introduced. Deaths fell from 1.5% to 0.8% (P = 0.003) and inpatient complications from 11.0% to 7.0% (P &lt; 0.001).<R label="WHO Checklist 2009" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Caution:</strong> this was a before-and-after study, so it shows an association, not proof that the checklist caused the improvement. Teamwork, pulse oximetry and other changes may have contributed.<R label="WHO Checklist 2009" /></li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: in ASOS, when did most postoperative deaths occur, and what does that imply?</summary><p className="mt-2">After the day of surgery (94.1%). The priority is recognising and rescuing ward patients who develop complications, such as infection, not only making theatre safer.</p></details>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what interim workforce target did the WFSA recommend?</summary><p className="mt-2">At least 5 specialist physician anaesthesia providers per 100,000 population.</p></details>
    <LessonSources topicId="resource-poor-anaesthesia" labels={["Kempthorne 2017 WFSA survey", "Biccard 2018 ASOS", "WHO Checklist 2009"]} />
  </div>;
}
