import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const DasDifficultAirwayNote = () => (
  <NoteLayout
    slug="das-difficult-airway-algorithm"
    title="DAS unanticipated difficult intubation algorithm (Plans A–D)"
    shortTitle="DAS difficult airway algorithm"
    description="DAS 2015 unanticipated difficult intubation algorithm in adults: Plans A, B, C and D, transition criteria, and the front-of-neck access drill."
    datePublished="2026-06-18"
    examTags={["final", "fficm"]}
    lede="The Difficult Airway Society (DAS) 2015 guideline structures unanticipated difficult intubation in adults into four sequential plans. The key principle is to declare failure early, limit the number of attempts at each stage, and progress to a surgical airway before hypoxia drives haemodynamic collapse."
    faqs={[
      {
        q: "What are DAS Plans A, B, C and D?",
        a: "A — tracheal intubation (max 3+1 attempts, optimise position, paralysis, blade, bougie). B — supraglottic airway rescue (max 3 attempts, 2nd-generation SAD preferred). C — final attempt at face-mask ventilation; if successful, wake the patient. D — emergency front-of-neck access (eFONA) by scalpel-bougie-tube cricothyroidotomy.",
      },
      {
        q: "When should I declare CICO?",
        a: "Can't Intubate, Can't Oxygenate is declared when face-mask ventilation, supraglottic airway, and tracheal intubation have all failed AND SpO₂ is falling despite 100% O₂. Immediately call for help, give 100% O₂, give a neuromuscular blocker if not already paralysed, position with neck extended, and proceed to scalpel cricothyroidotomy.",
      },
      {
        q: "What is the recommended cricothyroidotomy technique?",
        a: "Scalpel–bougie–tube: transverse stab incision through the cricothyroid membrane with a size 10 scalpel, rotate the blade 90°, railroad a bougie into the trachea, then slide a cuffed 6.0 mm tracheal tube over the bougie. Inflate the cuff, ventilate, confirm with capnography.",
      },
      {
        q: "How does the 2015 DAS algorithm differ from previous versions?",
        a: "It emphasises a single 2nd-generation SAD (e.g. i-gel) as the rescue device, removes needle cricothyroidotomy as a primary technique in adults, mandates declaration of CICO at the start of Plan D, and integrates human-factors language (declaring failure, 'stop and think').",
      },
    ]}
    related={[
      { label: "Airway management — full topic", to: "/clinical/airway-management" },
      { label: "RSI drugs and doses", to: "/notes/rapid-sequence-induction-drug-doses" },
      { label: "Capnography", to: "/physics/capnography" },
      { label: "Muscle relaxants", to: "/pharmacology/muscle-relaxants" },
    ]}
  >
    <h2>The four plans</h2>
    <h3>Plan A — tracheal intubation</h3>
    <p>
      Three intubation attempts plus one further attempt by a more
      experienced operator. Between attempts: optimise position
      (ear-to-sternal notch), ensure full paralysis, change blade
      (videolaryngoscope preferred for a second look), use a bougie, apply
      external laryngeal manipulation, and reduce cricoid pressure if it
      worsens the view. Maintain oxygenation between attempts.
    </p>

    <h3>Plan B — supraglottic airway rescue</h3>
    <p>
      If intubation has failed, declare failure aloud, insert a
      2nd-generation supraglottic airway (i-gel, LMA Supreme, LMA ProSeal).
      Maximum three attempts; consider changing device or size between
      attempts. If oxygenation is restored, the team decides whether to
      wake, proceed with the SAD as the definitive airway, intubate via the
      SAD with a fibrescope, or progress to a surgical airway.
    </p>

    <h3>Plan C — face-mask ventilation</h3>
    <p>
      Final attempt at oxygenation with face mask and two-person technique,
      oropharyngeal and nasopharyngeal airways, jaw thrust. If successful,
      wake the patient. If not, declare CICO and proceed to Plan D.
    </p>

    <h3>Plan D — emergency front-of-neck access</h3>
    <p>
      Scalpel cricothyroidotomy using the scalpel–bougie–tube technique.
      Continue 100% O₂, confirm tube position with <Link to="/physics/capnography">capnography</Link>, hand over
      to a definitive surgical airway when stable. The full <Link to="/clinical/airway-management">airway management topic</Link> walks through pre-eFONA team preparation and post-event human-factors debrief.
    </p>

    <h2>Human-factors anchors</h2>
    <p>
      The DAS algorithm explicitly builds in cognitive aids: a verbal
      declaration of failure at each plan, capping attempts, calling for
      help early, and a brief "stop and think" before progressing to a
      surgical airway. These are the steps most likely to fail in
      simulation — drill them.
    </p>
  </NoteLayout>
);

export default DasDifficultAirwayNote;
