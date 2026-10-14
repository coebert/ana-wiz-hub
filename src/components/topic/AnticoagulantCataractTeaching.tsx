import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const T = "ophthalmic-anaesthesia";

export function AnticoagulantCataractTeaching() {
  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      <h3 className="text-xl font-serif font-bold text-foreground">Blood Thinners and Cataract Blocks: The UK National Audit</h3>
      <p>The Cataract National Dataset analysed 48,862 operations across eight UK centres. 28.1% of patients took aspirin, 5.1% warfarin and 1.9% clopidogrel <InlineRef topicId={T} refLabel="Benzimra 2009 CND" />.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Block complications</strong> (sharp needle or sub-Tenon&apos;s cannula) were more frequent with clopidogrel (8.0%) and warfarin (6.2%) than in non-users (4.3%).</li>
        <li>The excess was mainly <strong>subconjunctival haemorrhage</strong>: 4.4% with clopidogrel, 3.7% with warfarin vs 1.7% in non-users.</li>
        <li><strong>No increase in sight-threatening complications</strong> was found, and serious bleeding inside the eye (choroidal haemorrhage, hyphaema) was not significantly increased.</li>
      </ul>
      <p>This is why UK practice usually continues these drugs for cataract surgery: the extra bleeding is mostly cosmetic, while stopping them risks stroke or thrombosis. It is observational audit data, so it cannot exclude rare serious events, and it does not cover the newer direct oral anticoagulants.</p>
      <div className="rounded-lg border border-border p-4">
        <p className="font-semibold text-foreground mb-2">Learning checks</p>
        <ol className="list-decimal pl-5 space-y-1 text-sm">
          <li>Which complication rose most with clopidogrel or warfarin? <em>Subconjunctival haemorrhage.</em></li>
          <li>Were sight-threatening complications increased? <em>No increase was identified.</em></li>
          <li>Name one limitation of this evidence. <em>Observational; no data on direct oral anticoagulants.</em></li>
        </ol>
      </div>
      <LessonSources topicId={T} labels={["Benzimra 2009 CND"]} />
    </div>
  );
}
