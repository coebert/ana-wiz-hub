import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="end-of-life-communication" refLabel={label} />;

export function EndOfLifeEvidenceTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">What the Trials Show About Supporting ICU Families</h2>
    <p>Communication in end-of-life care is often taught as a matter of instinct, but it has been tested in randomised trials. The results show that some well-meant interventions help, some make no difference to distress, and one may cause harm.</p>

    <h3 className="text-lg font-semibold text-foreground">A proactive family conference plus a bereavement leaflet (Lautrette 2007)</h3>
    <p>Relatives of 126 patients dying in 22 French ICUs were randomised to a proactive end-of-life conference (structured around VALUE) with a bereavement leaflet, or to the usual conference. Intervention conferences were longer (median 30 vs 20 minutes) and families did more of the talking (median 14 vs 5 minutes). At 90 days, relatives in the intervention group had fewer PTSD-related symptoms (45% vs 69%), less anxiety (45% vs 67%) and less depression (29% vs 56%).<R label="Lautrette 2007" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what was the active ingredient?</summary><p className="mt-2">Most likely letting families speak: clinicians listened more and talked proportionally less. The leaflet and the longer meeting were part of the package, so the trial cannot separate their effects. It is still the main evidence base for the VALUE approach.</p></details>

    <h3 className="text-lg font-semibold text-foreground">A multicomponent family-support programme (PARTNER, White 2018)</h3>
    <p>In a stepped-wedge cluster trial of 1,420 high-risk patients in five ICUs, a family-support intervention delivered by the ICU team did <strong className="text-foreground">not</strong> reduce surrogates' anxiety and depression at 6 months (HADS 11.7 vs 12.0) or PTSD symptoms. It did improve how families rated the quality of communication (69.1 vs 62.7) and patient- and family-centredness, and ICU stay was shorter (6.7 vs 7.4 days).<R label="White 2018 PARTNER" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: if better communication does not reduce distress, is it worth doing?</summary><p className="mt-2">Yes. Families rated communication as better and the care as more centred on the patient, and stays were shorter. But a viva answer should not claim that structured support prevents psychological harm in surrogates: PARTNER did not show that.</p></details>

    <h3 className="text-lg font-semibold text-foreground">A handwritten condolence letter (Kentish-Barnes 2017)</h3>
    <p>242 bereaved relatives in 22 ICUs were randomised to receive, or not receive, a handwritten condolence letter from the doctor and nurse caring for the patient. The letter did not reduce distress at 1 month. At 6 months, the letter group had <strong className="text-foreground">higher</strong> HADS scores, more depression symptoms (36.6% vs 24.7%) and more PTSD-related symptoms (52.4% vs 37.1%). The authors concluded that the letter failed to ease grief and may have made depression and PTSD-related symptoms worse.<R label="Kentish-Barnes 2017" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what is the general lesson?</summary><p className="mt-2">Kind gestures are not automatically harmless. Bereavement follow-up should be planned, offered and tested, not assumed to help. A one-way letter without any chance to talk may revive distress without offering support.</p></details>

    <LessonSources topicId="end-of-life-communication" labels={["Lautrette 2007", "White 2018 PARTNER", "Kentish-Barnes 2017"]} />
  </div>;
}
