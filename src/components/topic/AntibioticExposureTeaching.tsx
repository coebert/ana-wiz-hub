import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="antimicrobials-pharm" refLabel={label} />;

export function AntibioticExposureTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h3 className="text-lg font-serif font-bold text-foreground">Exposure in the critically ill: why standard doses can fail</h3>
    <p>Beta-lactams kill in a time-dependent way: the target is the fraction of the dosing interval for which the free (unbound) concentration stays above the organism's MIC (fT&gt;MIC). Critical illness disturbs this in both directions. Capillary leak, fluid resuscitation and hypoalbuminaemia increase volume of distribution and unbound clearance. Augmented renal clearance in young trauma, burns or sepsis patients shortens exposure. Acute kidney injury prolongs it.<R label="ESICM TDM 2020" /></p>
    <p>The multinational DALI study measured beta-lactam concentrations in ICU patients on standard doses. About one in six did not reach even a conservative 50% fT&gt;MIC target, and these patients were less likely to have a positive clinical outcome. Intermittent dosing was more likely to miss targets than extended or continuous infusion.<R label="DALI 2014" /> This is observational association, not proof that dose adjustment improves outcome, but it underpins the move to TDM for beta-lactams.<R label="ESICM TDM 2020" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">First dose:</strong> give the full loading dose irrespective of renal function. Volume of distribution, not clearance, determines the first concentration.</li>
      <li><strong className="text-foreground">Concentration-dependent agents (aminoglycosides):</strong> aim for a high peak relative to MIC, with a long interval to allow a trough that limits nephro- and ototoxicity. Monitor levels.<R label="ESICM TDM 2020" /></li>
      <li><strong className="text-foreground">AUC-driven agents (vancomycin):</strong> exposure across 24 h matters, and levels guide both efficacy and nephrotoxicity.<R label="ESICM TDM 2020" /></li>
      <li><strong className="text-foreground">Stewardship:</strong> review cultures and the diagnosis at 48–72 h, de-escalate or stop, and use the shortest effective course. These are core elements of hospital stewardship programmes.<R label="IDSA Stewardship 2016" /></li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: should the first meropenem dose be reduced in a septic patient with AKI?</summary><p className="mt-2">No. The loading dose depends on volume of distribution, which is often increased. Adjust subsequent doses or intervals to renal function, ideally guided by TDM.</p></details>
    <LessonSources topicId="antimicrobials-pharm" labels={["ESICM TDM 2020", "DALI 2014", "IDSA Stewardship 2016"]} />
  </div>;
}
