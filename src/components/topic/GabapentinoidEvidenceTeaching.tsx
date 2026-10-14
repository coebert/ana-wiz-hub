import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="pain-medicine" refLabel="Verret 2020 gabapentinoids" />;

export function GabapentinoidEvidenceTeaching() {
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-border">
    <h3 className="text-lg font-serif font-bold text-foreground">Do Perioperative Gabapentinoids Work? The Verret 2020 Meta-analysis</h3>
    <p>Gabapentin and pregabalin have been widely added to multimodal regimens. The Canadian PACT group pooled 281 randomised trials (24,682 adults having surgery) to test whether they improve postoperative pain.<R /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Pain scores:</strong> on a 0–100 scale, pain was lower by 10 points at 6 h, 9 at 12 h, 7 at 24 h and 3 at 48 h. Each difference fell below the minimally important difference of 10 points, so the authors judged the effect not clinically significant.<R /></li>
      <li><strong className="text-foreground">Consistency:</strong> results were similar for gabapentin and pregabalin.<R /></li>
      <li><strong className="text-foreground">Practice point:</strong> statistically lower pain scores are not the same as meaningful benefit. Routine gabapentinoid use for acute postoperative pain is not supported, and their sedative and dizziness side effects must be weighed, especially in older patients or with opioids.</li>
      <li><strong className="text-foreground">What it does not cover:</strong> established neuropathic pain, where gabapentinoids remain a NICE first-line option, is a different question.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what was the largest pain reduction, and why was it judged unimportant?</summary><p className="mt-2">About 10 points on a 100-point scale at 6 h. Every time point fell short of the 10-point minimally important difference, so it was not clinically significant.</p></details>
    <LessonSources topicId="pain-medicine" labels={["Verret 2020 gabapentinoids"]} />
  </div>;
}
