import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
const T = "interventional-radiology";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;

export function ContrastKidneyTeaching() {
  return (
    <CollapsibleSubsection title="Protecting the Kidneys from Contrast: The Trials">
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p><strong>Does IV fluid before contrast help? (AMACING, 2017).</strong> 660 patients with eGFR 30–59 having elective contrast procedures were randomised to IV 0.9% saline or no fluid. Kidney injury occurred in 2.6% without fluid and 2.7% with it — no hydration was non-inferior and cost-saving. Hydration itself caused complications in 5.5% <R label="Nijssen 2017 AMACING" />. The trial excluded eGFR below 30 and patients on dialysis, so it does not show that fluid is useless in the sickest kidneys.</p>
        <p><strong>Bicarbonate or acetylcysteine? (PRESERVE, 2018).</strong> 4,993 high-risk patients having angiography were randomised in a 2-by-2 design. Death, dialysis or a lasting 50% creatinine rise at 90 days: 4.4% with bicarbonate vs 4.7% with saline (P=0.62), and 4.6% with acetylcysteine vs 4.5% with placebo (P=0.88). Neither reduced contrast-associated kidney injury <R label="Weisbord 2018 PRESERVE" />.</p>
        <p><strong>What this means in practice.</strong> Use the smallest volume of contrast, stop avoidable kidney-toxic drugs, and individualise isotonic prophylaxis using current guidance and fluid tolerance — watching for fluid overload, especially in heart failure and cirrhosis. Bicarbonate has no demonstrated superiority over saline, and acetylcysteine should not be used <R label="ESUR 2018" />.</p>
        <p><a href="/intensive-care/aki-rrt#toc-ci-aki" className="text-primary underline">Comprehensive ICU contrast-associated AKI lesson: mechanisms, current guideline differences and management</a></p>
        <div className="rounded-lg border border-border p-4">
          <p className="font-semibold text-foreground mb-2">Learning checks</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>In AMACING, what was the kidney-injury rate with and without IV fluid? <em>2.7% vs 2.6% — no meaningful difference.</em></li>
            <li>Which patients were excluded from AMACING? <em>eGFR below 30 and those on dialysis.</em></li>
            <li>Did PRESERVE support bicarbonate or acetylcysteine? <em>No — neither improved 90-day outcomes or kidney injury.</em></li>
          </ol>
        </div>
        <LessonSources topicId={T} labels={["Nijssen 2017 AMACING", "Weisbord 2018 PRESERVE", "ESUR 2018"]} />
      </div>
    </CollapsibleSubsection>
  );
}
