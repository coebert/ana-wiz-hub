import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
const T = "operating-theatre-environment";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;

export function TheatreNoiseTeaching() {
  return (
    <CollapsibleSubsection title="Noise in Theatre and Wound Infection: The Evidence">
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p><strong>What was studied (Kurmann 2011).</strong> A Swiss pilot study recorded the sound level every second during 35 elective open abdominal operations and used a standard questionnaire to describe the team's behaviour. The main outcome was surgical-site infection within 30 days <R label="Kurmann 2011 Noise" />.</p>
        <p><strong>What it found.</strong> Six of the 35 patients (17%) developed an infection. Operation length and patient characteristics did not differ between those with and without infection, but the median sound level was higher in those who became infected (43.5 vs 25.0 dB; P = 0.040). Loud peaks were also more frequent, and talking about topics unrelated to the operation was linked to higher noise <R label="Kurmann 2011 Noise" />.</p>
        <p><strong>How to read it.</strong> This is a small observational pilot with only six infections. It shows an association, not that noise causes infection — the authors themselves suggest noise may be a marker of distraction or a stressful environment. It supports keeping theatre conversation focused on the patient, particularly at critical moments, rather than giving a proven decibel target.</p>
        <div className="rounded-lg border border-border p-4">
          <p className="font-semibold text-foreground mb-2">Learning checks</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>What was the median sound level with and without infection? <em>43.5 vs 25.0 dB.</em></li>
            <li>What type of conversation was linked to louder theatres? <em>Talk about topics unrelated to the surgery.</em></li>
            <li>Does this study prove noise causes wound infection? <em>No — 35 patients, six infections, observational; it shows an association.</em></li>
          </ol>
        </div>
        <LessonSources topicId={T} labels={["Kurmann 2011 Noise"]} />
      </div>
    </CollapsibleSubsection>
  );
}
