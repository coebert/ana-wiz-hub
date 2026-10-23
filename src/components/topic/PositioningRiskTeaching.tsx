import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const R = ({ label }: { label: string }) => <InlineRef topicId="anaesthetic-risk" refLabel={label} />;
const heading = "text-lg font-semibold text-foreground";

export function PositioningRiskTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground">Risks of patient positioning during surgery</h2>
    <p>An anaesthetised patient cannot report pain from pressure or stretch, and anaesthesia blunts the circulatory reflexes that normally protect against posture changes. Positioning harm is therefore shared by the whole team, and the risks are position-specific. Most published figures come from single centres or closed-claims registries: they show which harms occur and which factors are associated with them, not a personal probability for a given patient.</p>

    <h3 className={heading}>All positions: peripheral nerve injury and pressure injury</h3>
    <p>The ASA practice advisory recommends limiting arm abduction to about 90° in supine patients, positioning the forearm to reduce pressure on the ulnar groove, padding pressure points, avoiding prolonged hip flexion and stretch, and assessing nerve function after surgery so that new deficits are recognised early. Ulnar neuropathy is the classic upper-limb injury and can occur despite correct padding; brachial plexus injury follows abduction, head rotation and shoulder braces.<R label="ASA neuropathy advisory 2018" /> Skin and soft-tissue pressure injury rises with long procedures, low perfusion and immobility.</p>

    <h3 className={heading}>Prone position</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Postoperative visual loss:</strong> rare but devastating, most often ischaemic optic neuropathy after long spinal fusion. In the ASA Postoperative Visual Loss Study Group case-control study (80 cases, 315 controls), independent risk factors were male sex (OR 2.53), obesity (OR 2.83), Wilson frame use (OR 4.30), anaesthesia duration (OR 1.39 per hour) and estimated blood loss (OR 1.34 per litre), while a higher colloid share of non-blood fluid was protective (OR 0.67 per 5%). These odds ratios describe associations, not a personal risk. Direct globe pressure causes a different injury — central retinal artery occlusion — so the eyes must be free of pressure and checked regularly. For high-risk patients, discussing visual loss during consent and considering staged procedures are reasonable.<R label="POVL study group 2012" /></li>
      <li><strong>Airway and lines:</strong> the tube, lines and monitoring can be dislodged during turning or hidden under drapes; access is poor if the airway is lost. Plan the turn, secure the tube, and have a plan for supine return and resuscitation, including a prone CPR approach.<R label="Edgcombe prone 2008" /></li>
      <li><strong>Circulation and ventilation:</strong> abdominal compression raises intra-abdominal pressure, reducing venous return and increasing epidural venous bleeding; supports should leave the abdomen free. Oxygenation is usually preserved, but compression of chest or abdomen raises airway pressures.<R label="Edgcombe prone 2008" /><R label="Kwee prone 2015" /></li>
      <li><strong>Pressure points:</strong> face, chin, breasts, genitalia, iliac crests and knees; facial oedema, tongue swelling and cervical injury from excessive neck rotation or extension.<R label="Kwee prone 2015" /></li>
    </ul>

    <h3 className={heading}>Lithotomy</h3>
    <p>In a prospective Mayo series of 991 adults under general anaesthesia in lithotomy, 15 (1.5%; 95% CI 0.8–2.5%) developed lower-limb neuropathy — obturator, lateral femoral cutaneous, sciatic and common peroneal nerves. All were sensory, began within four hours, and 14 of 15 resolved within six months; time in lithotomy beyond 2 hours was a major risk factor.<R label="Warner lithotomy 2000" /> Prolonged lithotomy, especially with head-down tilt and calf support, is also linked to well-leg compartment syndrome — the same complication discussed for long pelvic surgery in the Operations Library. Limit duration, use symmetrical, gradual leg movement, and lower the legs periodically in long cases.<R label="Gill 2019 well-leg" /></p>

    <h3 className={heading}>Sitting and beach-chair positions</h3>
    <p>Upright positioning under anaesthesia lowers the blood pressure at the head relative to the arm cuff by roughly the hydrostatic column between them; uncorrected, a “normal” arm pressure can hide cerebral hypoperfusion. A medicolegal case series reported four cases of ischaemic brain and spinal cord injury in middle-aged patients after beach-chair shoulder surgery. Reference blood pressure to the external auditory meatus or correct for the height difference.<R label="Pohl beach chair 2005" /> The sitting craniotomy adds venous air embolism, because surgical veins sit above the heart, and paradoxical embolism through a patent foramen ovale.</p>

    <h3 className={heading}>Lateral and steep head-down positions</h3>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Lateral:</strong> dependent brachial plexus and axillary vessel compression (hence the chest roll below the axilla), dependent ear and eye pressure, peroneal nerve compression at the fibular head, and ventilation–perfusion mismatch between lungs.</li>
      <li><strong>Steep Trendelenburg (for example robotic prostatectomy):</strong> raised intracranial and intraocular pressure, facial and airway oedema that can cause post-extubation stridor, endobronchial tube migration, and sliding with brachial plexus stretch from shoulder braces. Check cuff leak or airway swelling before extubation in long cases.</li>
    </ul>

    <h3 className={heading}>Consent and documentation</h3>
    <p>Positioning risks are often material: a spinal fusion patient may want to know about visual loss, and a musician about ulnar nerve symptoms. Discuss position-specific risks when they are relevant to that patient, document the position, padding and checks performed, and record any new deficit promptly. Even well-performed positioning does not eliminate injury, so a deficit is not proof of negligence.<R label="Montgomery 2015" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: does an arm blood pressure of 100/60 mmHg guarantee cerebral perfusion in the beach-chair position?</summary><p className="mt-2">No. The brain sits above the cuff, so its perfusion pressure is lower by the hydrostatic gradient. Reference pressure to head level or correct for the height difference.</p></details>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: which modifiable factors were associated with ischaemic optic neuropathy after prone spinal fusion?</summary><p className="mt-2">Wilson frame use, longer anaesthesia, greater blood loss and a lower colloid share of non-blood replacement. Male sex and obesity were non-modifiable associations. These are odds ratios from a case-control study, not individual risk predictions.</p></details>
    <LessonSources topicId="anaesthetic-risk" labels={["ASA neuropathy advisory 2018", "POVL study group 2012", "Edgcombe prone 2008", "Kwee prone 2015", "Warner lithotomy 2000", "Gill 2019 well-leg", "Pohl beach chair 2005", "Montgomery 2015"]} />
  </div>;
}
