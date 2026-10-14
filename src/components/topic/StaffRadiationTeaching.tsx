import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
const T = "interventional-radiology";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;

export function StaffRadiationTeaching() {
  return (
    <CollapsibleSubsection title="Radiation Dose to the Anaesthetist: The Evidence">
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p><strong>Why it matters.</strong> A review of radiation safety for anaesthetists notes wide variation, and little reduction, in operator doses. The eye is likely the most radiation-sensitive organ, so eye protection is advised at all times. Current data do not suggest a significant risk to the fetus for pregnant staff in the radiology suite, provided proper monitoring and safety measures are in place <R label="Dagal 2011" />.</p>
        <p><strong>Does seeing your dose change it? (Baumann 2015).</strong> In one interventional suite, wireless dosimeters were worn by the attending, fellow, nurse, technician and anaesthetist across 252 procedures. A real-time dose display was first switched off, then switched on. Mean staff dose per fluoroscopy minute fell from 42.79 to 19.81 µSv/min. Anaesthetists were the only individual group with a significant fall (16.9 vs 8.86 µSv/min) <R label="Baumann 2015 Real-time Dose" />.</p>
        <p><strong>How to read it.</strong> This was a before–after study in a single suite, not a randomised trial, so other changes over time could contribute. It does show that the anaesthetist's dose depends heavily on behaviour — where you stand and how long you stay near the beam — and that feedback helps. Combine distance, shielding (apron, thyroid collar, ceiling shield, lead glasses) and time, and wear your own dosimeter.</p>
        <div className="rounded-lg border border-border p-4">
          <p className="font-semibold text-foreground mb-2">Learning checks</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>Which organ is likely the most radiation-sensitive for staff? <em>The eye (lens).</em></li>
            <li>What happened to anaesthetists' dose once real-time display was on? <em>16.9 → 8.86 µSv per fluoroscopy minute.</em></li>
            <li>Why is the evidence limited? <em>Single-suite before–after design, not randomised.</em></li>
          </ol>
        </div>
        <LessonSources topicId={T} labels={["Dagal 2011", "Baumann 2015 Real-time Dose"]} />
      </div>
    </CollapsibleSubsection>
  );
}
