import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const T = "ophthalmic-anaesthesia";

export function BlockComparisonTeaching() {
  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      <h3 className="text-xl font-serif font-bold text-foreground">Peribulbar vs Retrobulbar Block: The Cochrane Evidence</h3>
      <p>A 2015 Cochrane review pooled six randomised trials (1,438 patients) of cataract surgery. Both blocks were largely effective, with <strong>no difference in pain during surgery, complete akinesia or the need for extra injections</strong> <InlineRef topicId={T} refLabel="Alhassan 2015 Cochrane" />.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Chemosis</strong> was about twice as common after peribulbar block (RR 2.11, 95% CI 1.46–3.05).</li>
        <li><strong>Lid haematoma</strong> was more common after retrobulbar block (RR 0.36 for peribulbar, 95% CI 0.15–0.88).</li>
        <li><strong>Retrobulbar haemorrhage</strong> occurred once, after a retrobulbar block. Severe complications were rare with both.</li>
      </ul>
      <p>Caveats: all trials had unclear allocation concealment, and they were too small to compare rare catastrophes such as globe perforation or brainstem anaesthesia. UK practice favours sub-Tenon&apos;s or topical techniques for this reason — the review does not show retrobulbar block is unsafe, only that it offers no measured advantage.</p>
      <div className="rounded-lg border border-border p-4">
        <p className="font-semibold text-foreground mb-2">Learning checks</p>
        <ol className="list-decimal pl-5 space-y-1 text-sm">
          <li>Which complication was more common after peribulbar block? <em>Conjunctival chemosis.</em></li>
          <li>Did peribulbar block give less complete akinesia? <em>No — no evidence of a difference.</em></li>
          <li>Why can this review not settle globe-perforation risk? <em>1,438 patients is far too few for a rare event.</em></li>
        </ol>
      </div>
      <LessonSources topicId={T} labels={["Alhassan 2015 Cochrane"]} />
    </div>
  );
}
