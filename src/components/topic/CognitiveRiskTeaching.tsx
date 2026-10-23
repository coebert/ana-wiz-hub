import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const R = ({ label }: { label: string }) => <InlineRef topicId="anaesthetic-risk" refLabel={label} />;
const heading = "text-lg font-semibold text-foreground";

/** Evidence on whether general anaesthesia causes postoperative cognitive dysfunction or lasting decline. */
export function CognitiveRiskTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground">Cognitive effects: postoperative cognitive dysfunction and lasting decline</h2>
    <p>Patients often ask whether “the anaesthetic” will affect their memory. The honest answer separates three things: cognitive change after surgery is common, especially in older people; it is hard to show that general anaesthesia itself, rather than surgery, illness and age, is the cause; and good evidence that a single anaesthetic causes permanent decline or dementia is lacking.</p>

    <h3 className={heading}>Terminology</h3>
    <p>The 2018 international nomenclature uses “perioperative neurocognitive disorders” as the umbrella term: postoperative delirium (an acute event), delayed neurocognitive recovery (decline found up to 30 days), and postoperative neurocognitive disorder (up to 12 months). Older studies used “POCD”, defined by test-score change rather than clinical diagnosis, so their rates are not directly comparable.<R label="Evered nomenclature 2018" /></p>

    <h3 className={heading}>How common is postoperative cognitive dysfunction?</h3>
    <p>In ISPOCD1 (older patients after major non-cardiac surgery), POCD was present in 25.8% at 1 week and 9.9% at 3 months, compared with 3.4% and 2.8% of matched controls tested at the same intervals. Age, duration of anaesthesia, less education, a second operation, infection and respiratory complications were early risk factors; only age predicted late POCD. Low oxygen levels and low blood pressure were not risk factors.<R label="ISPOCD1 1998" /> These figures describe test-score decline in a study population, not a personal prediction, and most early change resolves.</p>

    <h3 className={heading}>Is general anaesthesia the cause?</h3>
    <p>The best test is to randomise patients to general or regional anaesthesia. In a trial of 438 older patients, POCD at 7 days was 19.7% after general versus 12.5% after regional anaesthesia (P = 0.06, not significant), and at 3 months 14.3% versus 13.9% (P = 0.93). The authors concluded that there was no significant difference at 3 months, so general anaesthesia was not shown to cause lasting POCD.<R label="Rasmussen GA vs regional 2003" /> The persistence of POCD in both groups points to surgery, inflammation, illness and the patient’s baseline brain health as major contributors.</p>

    <h3 className={heading}>Permanent decline and dementia</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li>Observational studies linking anaesthesia to later dementia are confounded: people who need surgery are often older and sicker, and early, undiagnosed cognitive impairment raises both the need for surgery and the chance of later diagnosis. Such associations cannot prove causation.</li>
      <li>Postoperative delirium is the clearest warning sign. It is associated with later cognitive decline and is partly preventable; prevention and screening are covered under delirium in the age and risk-reduction sections.<R label="ESAIC delirium 2024" /></li>
      <li>ASA 2025 guidance for older adults is not evidence that any particular anaesthetic technique prevents dementia; avoid promising that one choice protects long-term brain health.<R label="ASA older adults 2025" /></li>
    </ul>

    <h3 className={heading}>Children</h3>
    <p>Animal studies raised concern about anaesthetic effects on the developing brain, and the US FDA issued a 2016 safety warning about repeated or lengthy (over 3 hours) anaesthetic exposure in children under 3 and in pregnancy.<R label="FDA anaesthesia children 2016" /> Human evidence for short single exposures is reassuring. In the GAS randomised trial, under 1 hour of general anaesthesia in infancy (median 54 minutes) did not change IQ at 5 years compared with awake-regional anaesthesia.<R label="GAS trial 2019" /> In the PANDA sibling study, a single anaesthetic before 36 months was not associated with a difference in later IQ; the authors called for more study of repeated, prolonged exposure and vulnerable groups.<R label="PANDA 2016" /> Necessary surgery should not be delayed because of these concerns.</p>

    <h3 className={heading}>How to discuss it</h3>
    <p>For older patients: temporary memory or concentration problems after major surgery are common and usually improve; delirium is a real risk that the team works to prevent; and the evidence does not show that a general anaesthetic causes permanent decline or dementia. Patients with existing cognitive impairment, or for whom cognition is especially important, should have this discussed as a material risk.<R label="Montgomery 2015" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: does choosing regional anaesthesia prevent long-term cognitive dysfunction?</summary><p className="mt-2">Not on current evidence. In the randomised trial of 438 older patients, POCD at 3 months was 14.3% after general and 13.9% after regional anaesthesia, with no significant difference.</p></details>
    <LessonSources topicId="anaesthetic-risk" labels={["Evered nomenclature 2018", "ISPOCD1 1998", "Rasmussen GA vs regional 2003", "ESAIC delirium 2024", "ASA older adults 2025", "FDA anaesthesia children 2016", "GAS trial 2019", "PANDA 2016", "Montgomery 2015"]} />
  </div>;
}
