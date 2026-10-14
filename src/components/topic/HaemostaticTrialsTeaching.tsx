import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const C = () => <InlineRef topicId="trauma-emergency" refLabel="CRYOSTAT-2 2023" />;
const P = () => <InlineRef topicId="trauma-emergency" refLabel="PATCH-Trauma 2023" />;

export function HaemostaticTrialsTeaching() {
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border">
    <h3 className="text-lg font-serif font-bold text-foreground">Early Haemostatic Drugs in Trauma: CRYOSTAT-2 and PATCH-Trauma</h3>
    <p><strong className="text-foreground">CRYOSTAT-2</strong> randomised 1,604 bleeding adults at 26 UK and US major trauma centres who needed a major haemorrhage protocol. One group received three extra pools of cryoprecipitate (6 g fibrinogen equivalent) within 90 minutes; the other received standard care. 28-day mortality was 25.3% with cryoprecipitate vs 26.1% (OR 0.96, 95% CI 0.75–1.23). Thrombotic and safety events were similar (12.7% vs 12.9%).<C /></p>
    <p><strong className="text-foreground">PATCH-Trauma</strong> gave 1 g tranexamic acid before hospital, then a 1 g infusion over 8 hours, or placebo, to 1,310 adults at risk of trauma-induced coagulopathy in Australia, New Zealand and Germany. Survival with a favourable functional outcome at 6 months was unchanged (53.7% vs 53.5%; RR 1.00). 28-day death was lower (17.3% vs 21.8%; RR 0.79, 95% CI 0.63–0.99), but this was a secondary outcome.<P /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Fibrinogen:</strong> giving everyone extra cryoprecipitate early did not save lives. Replacement should be guided by measured fibrinogen or viscoelastic results.<C /></li>
      <li><strong className="text-foreground">Tranexamic acid:</strong> early tranexamic acid did not increase good functional survival, and the lower 28-day death rate is only supportive. Read it alongside CRASH-2, which supports treatment within 3 hours of injury.<P /></li>
      <li><strong className="text-foreground">Exam trap:</strong> do not quote a secondary outcome as the trial's main result.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what was PATCH-Trauma's primary outcome, and what did it show?</summary><p className="mt-2">Survival with a favourable functional outcome (GOS-E ≥5) at 6 months. It was 53.7% vs 53.5%, with no difference.</p></details>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: did early empirical cryoprecipitate improve survival in CRYOSTAT-2?</summary><p className="mt-2">No. 28-day mortality was 25.3% vs 26.1% (P = 0.74).</p></details>
    <LessonSources topicId="trauma-emergency" labels={["CRYOSTAT-2 2023", "PATCH-Trauma 2023"]} />
  </div>;
}
