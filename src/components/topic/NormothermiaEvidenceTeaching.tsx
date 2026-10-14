import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
const T = "operating-theatre-environment";

export function NormothermiaEvidenceTeaching() {
  return (
    <CollapsibleSubsection title="Why Theatre Warmth Matters: The Kurz Trial">
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>The case for keeping patients warm rests largely on a 1996 NEJM trial in 200 patients having colorectal resection. Patients were randomised to routine care (allowed to cool) or active warming. Final core temperature was 34.7 °C vs 36.6 °C <InlineRef topicId={T} refLabel="Kurz 1996 Normothermia" />.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Wound infection:</strong> 19% in the cooled group vs 6% in the warmed group (P=0.009).</li>
          <li><strong>Healing:</strong> sutures were removed a day later in the cooled group.</li>
          <li><strong>Hospital stay:</strong> 2.6 days (about 20%) longer after hypothermia.</li>
        </ul>
        <p><strong>Limits.</strong> One operation type, one era of practice and a large 2 °C temperature gap. The trial shows that preventing marked hypothermia matters; it does not prove that every fraction of a degree above 36 °C changes outcomes. Theatre room temperature is only one lever — forced-air warming, warmed fluids and limiting exposure matter more for the patient&apos;s core temperature.</p>
        <div className="rounded-lg border border-border p-4">
          <p className="font-semibold text-foreground mb-2">Learning checks</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>What were the wound-infection rates in the Kurz trial? <em>19% hypothermic vs 6% normothermic.</em></li>
            <li>In which surgery was it done? <em>Colorectal resection.</em></li>
            <li>Why can't it be generalised to every small temperature drop? <em>The groups differed by about 2 °C.</em></li>
          </ol>
        </div>
        <LessonSources topicId={T} labels={["Kurz 1996 Normothermia"]} />
      </div>
    </CollapsibleSubsection>
  );
}
