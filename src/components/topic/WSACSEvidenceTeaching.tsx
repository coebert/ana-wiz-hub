import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="abdominal-compartment-syndrome" refLabel="WSACS 2013" />;

export function WSACSEvidenceTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">How Strong Is the Evidence? Reading the WSACS Statements</h2>
    <p>The 2013 WSACS update graded its statements using GRADE. Strong <strong className="text-foreground">recommendations</strong> are made when benefits clearly outweigh harms. Weaker <strong className="text-foreground">suggestions</strong> are made when the balance is less certain. Where evidence was insufficient, it made <strong className="text-foreground">no recommendation</strong>. The authors concluded that the overall quality of evidence was generally low and that intervention trials are urgently needed.<R /> In a viva, separating these tiers shows you understand what the guideline does and does not establish.</p>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead><tr className="border-b border-border"><th className="text-left py-2 pr-3 text-foreground">Tier</th><th className="text-left py-2 text-foreground">Statements (WSACS 2013)</th></tr></thead>
        <tbody>
          <tr className="border-b border-border/50 align-top"><td className="py-2 pr-3 font-medium text-foreground">Recommended</td><td className="py-2">Measure IAP when risk factors are present; avoid sustained IAH; use protocolised IAP monitoring and management; perform decompressive laparotomy for overt ACS; in the open abdomen, use negative-pressure wound therapy and aim for fascial closure during the same hospital stay.<R /></td></tr>
          <tr className="border-b border-border/50 align-top"><td className="py-2 pr-3 font-medium text-foreground">Suggested</td><td className="py-2">Medical therapies (sedation/analgesia, neuromuscular blockade, nasogastric/rectal decompression); percutaneous catheter drainage of intraperitoneal fluid; consider body position; avoid a positive fluid balance after initial resuscitation; enhanced plasma:red-cell ratios in trauma; prophylactic open-abdomen strategies in selected patients; avoid routine early biological mesh.<R /></td></tr>
          <tr className="align-top"><td className="py-2 pr-3 font-medium text-foreground">No recommendation</td><td className="py-2">Targeting abdominal perfusion pressure, diuretics, renal replacement therapy, albumin and acute component-parts separation.<R /></td></tr>
        </tbody>
      </table>
    </div>
    <h3 className="text-lg font-semibold text-foreground">Applying it at the bedside</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Screen, don't wait:</strong> the strongest statements concern detection — measure IAP in at-risk patients and act on sustained elevation before organ failure develops.<R /></li>
      <li><strong className="text-foreground">Escalate in steps:</strong> the medical options are suggestions, so use them as a time-limited trial while reassessing. Overt ACS with new organ dysfunction is the recommended indication for decompression.<R /></li>
      <li><strong className="text-foreground">Fluid is a modifiable cause:</strong> after initial resuscitation, aim to avoid an ongoing positive balance. Removing fluid with diuretics or RRT may be reasonable in an individual patient, but WSACS made no recommendation for them.<R /></li>
      <li><strong className="text-foreground">The open abdomen is a treatment with its own risks:</strong> plan early fascial closure from the outset.<R /></li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: is targeting abdominal perfusion pressure (MAP − IAP) a WSACS recommendation?</summary><p className="mt-2">No. WSACS 2013 could make no recommendation about APP monitoring. It is a reasonable physiological concept, but not an evidence-based target.</p></details>
    <LessonSources topicId="abdominal-compartment-syndrome" labels={["WSACS 2013"]} />
  </div>;
}
