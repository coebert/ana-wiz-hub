import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
const T = "operating-theatre-environment";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;

export function ChecklistEvidenceTeaching() {
  return (
    <CollapsibleSubsection title="Does the WHO Checklist Work? The Evidence">
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p><strong>Safe Surgery Saves Lives (Haynes 2009).</strong> Eight hospitals in eight countries compared 3,733 patients before and 3,955 after introducing the 19-item checklist. Deaths fell from 1.5% to 0.8% (P=0.003) and inpatient complications from 11.0% to 7.0% (P&lt;0.001) <R label="WHO Checklist 2009" />. This was a <strong>before–after study, not a randomised trial</strong>: teams knew they were being watched, and other changes over time could explain part of the effect.</p>
        <p><strong>Mandatory roll-out in Ontario (Urbach 2014).</strong> When every acute hospital in Ontario adopted a checklist, 101 hospitals and over 215,000 procedures were compared before and after. Adjusted death was 0.71% vs 0.65% (OR 0.91, 95% CI 0.80–1.03; P=0.13) and complications 3.86% vs 3.82% (P=0.29) — no significant change <R label="Urbach 2014 Ontario" />.</p>
        <p><strong>How to reconcile them in a viva.</strong> Baseline risk was much lower in Ontario, and a checklist imposed by policy can become a tick-box exercise. The fair conclusion: the checklist is a tool for team communication, and its benefit depends on how genuinely it is used — it is not, by itself, proven to cut mortality.</p>
        <div className="rounded-lg border border-border p-4">
          <p className="font-semibold text-foreground mb-2">Learning checks</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>What study design underpinned the 2009 checklist results, and what are its weaknesses? <em>Before–after; Hawthorne effect and secular trends.</em></li>
            <li>What happened to 30-day mortality after mandated adoption in Ontario? <em>0.71% → 0.65%, not significant (P=0.13).</em></li>
            <li>Why might the two studies differ? <em>Lower baseline risk; compliance and team culture, not the form itself.</em></li>
          </ol>
        </div>
        <LessonSources topicId={T} labels={["WHO Checklist 2009", "Urbach 2014 Ontario"]} />
      </div>
    </CollapsibleSubsection>
  );
}
