import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="surgical-protocols" refLabel="Greco 2014 ERAS meta-analysis" />;

export function ErasEvidenceTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Why Protocols Work: the Evidence for Enhanced Recovery</h2>
    <p>The protocols on this page are built on enhanced recovery after surgery (ERAS) principles. These are bundles of pre-, intra- and post-operative measures rather than single interventions. The strongest pooled evidence comes from elective colorectal surgery. Greco and colleagues meta-analysed 16 randomised trials (2,376 patients) comparing ERAS pathways with conventional care.<R /></p>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead><tr className="bg-muted"><th className="p-2 text-left">Outcome</th><th className="p-2 text-left">ERAS vs conventional care</th></tr></thead>
      <tbody>
        <tr className="border-t border-border"><td className="p-2">Overall morbidity</td><td className="p-2">RR 0.60 (95% CI 0.46–0.76)</td></tr>
        <tr className="border-t border-border"><td className="p-2">Non-surgical complications</td><td className="p-2">RR 0.40 (95% CI 0.27–0.61)</td></tr>
        <tr className="border-t border-border"><td className="p-2">Surgical complications</td><td className="p-2">RR 0.76 (95% CI 0.54–1.08) — not significant</td></tr>
        <tr className="border-t border-border"><td className="p-2">Hospital stay</td><td className="p-2">−2.28 days (95% CI −3.09 to −1.47)</td></tr>
        <tr className="border-t border-border"><td className="p-2">Readmission</td><td className="p-2">Not increased</td></tr>
      </tbody></table></div>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Interpretation:</strong> the benefit is mainly fewer medical complications (for example cardiopulmonary or infective) and faster recovery. Anastomotic and other surgical complications were not clearly reduced.<R /></li>
      <li><strong className="text-foreground">Evidence limits:</strong> the authors note an earlier Cochrane review judged the trials too few and of poor quality to call ERAS the standard of care. Bundles cannot be blinded, and the trial elements vary, so the contribution of each element is uncertain.<R /></li>
      <li><strong className="text-foreground">Generalising:</strong> the data are from elective colorectal surgery. Applying the same bundles to other specialties is reasonable, but it is an extrapolation and should be described as one.</li>
    </ul>
    <p><strong className="text-foreground">Viva answer:</strong> "ERAS is a multimodal bundle. In colorectal RCTs it reduces overall morbidity by about 40%, mostly non-surgical complications, and shortens stay by about two days without more readmissions. The trials are heterogeneous and unblinded, and which elements matter most is unclear."</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: which complication type did ERAS not significantly reduce?</summary><p className="mt-2">Surgical complications (RR 0.76, CI crossing 1). The reduction was driven by non-surgical complications (RR 0.40).</p></details>
    <LessonSources topicId="surgical-protocols" labels={["Greco 2014 ERAS meta-analysis"]} />
  </div>;
}
