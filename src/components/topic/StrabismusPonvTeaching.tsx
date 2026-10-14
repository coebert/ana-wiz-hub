import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
const T = "ophthalmic-anaesthesia";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;

export function StrabismusPonvTeaching() {
  return (
    <CollapsibleSubsection title="Preventing Sickness after Squint Surgery: The Trials">
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p><strong>How common is it without prevention?</strong> A 2014 meta-analysis pooled 13 randomised trials (2,006 children having strabismus surgery). In the placebo groups, vomiting occurred in 68.2% (45/66) in the dexamethasone trials and nausea or vomiting in 65.6% (177/270) in the ondansetron trials — roughly two in three children <R label="Shen 2014 Meta-analysis" />.</p>
        <p><strong>Single drugs.</strong> Dexamethasone roughly halved vomiting (34.3% vs 68.2%; RR 0.50, 95% CI 0.34–0.72). Ondansetron reduced nausea and vomiting (37.2% vs 65.6%; RR 0.58, 95% CI 0.43–0.79) <R label="Shen 2014 Meta-analysis" />.</p>
        <p><strong>Combination.</strong> Dexamethasone plus ondansetron was significantly more effective than either alone, and drug side-effects such as flushing and headache were limited <R label="Shen 2014 Meta-analysis" />. In a single randomised trial of 193 children, adding low-dose ondansetron (50 µg/kg) to dexamethasone (150 µg/kg) cut vomiting from 23% to 5%, and each episode of vomiting lengthened hospital stay by 29 minutes <R label="Splinter 2001" />.</p>
        <p><strong>Limits.</strong> The dexamethasone-versus-placebo comparison rests on only two trials (133 children), and the older trials used halothane-based anaesthesia, which is no longer standard. The case for combined prophylaxis is strong, but the exact size of the benefit with modern TIVA is less certain.</p>
        <div className="rounded-lg border border-border p-4">
          <p className="font-semibold text-foreground mb-2">Learning checks</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>Roughly what proportion of children vomit after squint surgery without prophylaxis? <em>About two-thirds (65–68% in placebo groups).</em></li>
            <li>What did the meta-analysis recommend? <em>Combined dexamethasone and ondansetron.</em></li>
            <li>In Splinter 2001, what was vomiting with dexamethasone alone vs combined? <em>23% vs 5%.</em></li>
          </ol>
        </div>
        <LessonSources topicId={T} labels={["Shen 2014 Meta-analysis", "Splinter 2001"]} />
      </div>
    </CollapsibleSubsection>
  );
}
