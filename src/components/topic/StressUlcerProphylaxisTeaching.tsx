import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "mechanical-ventilation";
const SUP = () => <InlineRef topicId={T} refLabel="Krag 2018 SUP-ICU" />;
const REV = () => <InlineRef topicId={T} refLabel="Cook 2024 REVISE" />;

export function StressUlcerProphylaxisTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Stress Ulcer Prophylaxis: SUP-ICU and REVISE</h2>
    <p>Critical illness reduces gastric mucosal blood flow and protective mucus, so ICU patients can get stress-related mucosal bleeding. Acid suppression lowers that risk. The concern is that it may also raise the risk of pneumonia and <em>Clostridioides difficile</em> infection. Two large blinded placebo-controlled trials of IV pantoprazole 40 mg daily now shape practice.</p>

    <h3 className="text-lg font-semibold text-foreground">SUP-ICU (Krag, NEJM 2018)</h3>
    <p>3,298 adults with an unplanned ICU admission and at least one bleeding risk factor were randomised to pantoprazole or placebo. Death by 90 days was 31.1% vs 30.4% (RR 1.02, 95% CI 0.91–1.13). The composite of clinically important events (GI bleeding, pneumonia, <em>C. difficile</em>, myocardial ischaemia) was 21.9% vs 22.6%. Clinically important GI bleeding was 2.5% vs 4.2%.<SUP /></p>

    <h3 className="text-lg font-semibold text-foreground">REVISE (Cook, NEJM 2024)</h3>
    <p>4,821 invasively ventilated adults in 68 ICUs. Clinically important upper GI bleeding fell from 3.5% to 1.0% (HR 0.30, 95% CI 0.19–0.47). Death at 90 days was 29.1% vs 30.9% (HR 0.94, 95% CI 0.85–1.04; not significant). Patient-important bleeding was also reduced. Ventilator-associated pneumonia, <em>C. difficile</em> infection and the other secondary outcomes were similar.<REV /></p>

    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">What the trials agree on:</strong> pantoprazole reduces clinically important bleeding and has no detectable effect on mortality. Neither trial showed a significant rise in pneumonia or <em>C. difficile</em>.<SUP /><REV /></li>
      <li><strong className="text-foreground">Absolute benefit:</strong> in REVISE, about 2.5 fewer bleeds per 100 ventilated patients, so roughly 40 patients are treated to prevent one. The benefit is smaller where baseline bleeding risk is lower.<REV /></li>
      <li><strong className="text-foreground">What they do not show:</strong> no survival benefit, and no effect in patients who are not at risk (who were not enrolled). Neither trial tested H₂-receptor antagonists against placebo.</li>
      <li><strong className="text-foreground">Practice point:</strong> give prophylaxis to ventilated or otherwise at-risk patients. Review it every day and stop it when the risk factors resolve or the patient leaves ICU, so it is not continued indefinitely after discharge.</li>
    </ul>

    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: did REVISE show that pantoprazole saves lives?</summary><p className="mt-2">No. It reduced clinically important upper GI bleeding (1.0% vs 3.5%), but 90-day mortality was not significantly different (29.1% vs 30.9%, HR 0.94, CI crossing 1).</p></details>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: who was enrolled in SUP-ICU?</summary><p className="mt-2">Adults with acute (unplanned) ICU admissions who had at least one risk factor for GI bleeding. It does not support omitting prophylaxis in at-risk patients, and it did not study low-risk patients.</p></details>
    <LessonSources topicId={T} labels={["Krag 2018 SUP-ICU", "Cook 2024 REVISE"]} />
  </div>;
}
