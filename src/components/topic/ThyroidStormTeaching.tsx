import { Link } from "react-router-dom";
import { Check, H, Reasoning, lessonWrap as wrap, makeQuote } from "./EndocrinePageShared";

const Quote = makeQuote("thyroid-storm");

export function ThyroidStormRecognitionTeaching() {
  return <div className={wrap}>
    <p>This page adopts the 2016 Japan Thyroid Association / Japan Endocrine Society (JTA/JES) thyroid storm guideline as its main framework, because it is openly readable and gives graded recommendations; the 2016 American Thyroid Association (ATA) guideline is quoted where the two differ. Quotations are the sources' own wording; the surrounding explanation is teaching synthesis.</p>
    <H>Why it matters</H>
    <Quote label="JTA storm mortality 2016" />
    <H>A clinical diagnosis</H>
    <p>Thyroid storm is decompensated thyrotoxicosis with organ dysfunction: fever, tachycardia or atrial fibrillation, heart failure, gastrointestinal or liver dysfunction and agitation, delirium or coma, usually after a trigger (infection, surgery, stopping antithyroid drugs, iodine load, trauma, childbirth). Thyroid hormone levels confirm thyrotoxicosis but do not distinguish storm from uncomplicated thyrotoxicosis, so treatment should not wait for them.</p>
    <p>The Burch–Wartofsky Point Scale (1993) scores temperature, heart rate, atrial fibrillation, heart failure, gut–liver dysfunction, central nervous system disturbance and a precipitating event. As reproduced in the JTA/JES guideline, a total of 45 or more is highly suggestive of storm, 25–44 suggests impending storm and under 25 makes it unlikely. The score is empirical: it supports, rather than replaces, clinical judgement.</p>
    <p><Reasoning />in theatre or recovery, storm can mimic malignant hyperthermia, sepsis, phaeochromocytoma crisis, neuroleptic malignant syndrome or a drug reaction. A rising end-tidal CO₂ with rigidity points to malignant hyperthermia; known or suspected hyperthyroidism, goitre or eye signs point to storm.</p>
    <Check question="Should treatment wait until free T4 and T3 results confirm the diagnosis?">No. Hormone levels in storm overlap with uncomplicated thyrotoxicosis. Diagnosis is clinical, supported by a scoring system, and treatment starts as soon as storm is suspected.</Check>
  </div>;
}

export function ThyroidStormHormoneTeaching() {
  return <div className={wrap}>
    <Quote label="JTA storm multimodal 2016" />
    <H>Step 1 — stop new hormone synthesis</H>
    <p>Antithyroid drugs (thionamides) block new hormone synthesis. Propylthiouracil (PTU) also reduces peripheral conversion of T4 to T3, which is why it is traditionally preferred in storm; carbimazole/methimazole is longer acting and avoids PTU's risk of severe liver injury. Both can be given via a nasogastric tube in an unconscious patient. Drug choice and doses should follow local endocrine advice; the drug properties here are standard pharmacology teaching rather than quotations.</p>
    <H>Step 2 — stop release of stored hormone with iodide, and the timing difference</H>
    <Quote label="JTA storm iodide 2016" />
    <Quote label="JTA storm ATA iodide timing 2016" />
    <p>Iodide blocks release of stored hormone quickly. The two guidelines differ on timing: the ATA advises giving the antithyroid drug at least an hour first, so the gland cannot use the iodide to make more hormone; JTA/JES advises giving both together. In exams, state the ATA "thionamide first" sequence and acknowledge the JTA/JES position.</p>
    <Check question="Why does the ATA advise giving the antithyroid drug before iodide?">Without a thionamide on board, the thyroid can use the iodide load as substrate to make more hormone (organification). Blocking synthesis first prevents that.</Check>
  </div>;
}

export function ThyroidStormSupportTeaching() {
  return <div className={wrap}>
    <H>Beta-blockade</H>
    <Quote label="JTA storm beta-blockade 2016" />
    <p>JTA/JES favours short-acting beta-1-selective drugs (landiolol, esmolol, or oral bisoprolol). Propranolol is the traditional choice in many UK and US texts because it also modestly reduces T4-to-T3 conversion, but JTA/JES does not recommend it for tachycardia in storm. <Reasoning />in a patient with thyrotoxic heart failure, beta-blockade can precipitate cardiovascular collapse, so a titratable infusion with close monitoring is safer than a large bolus.</p>
    <H>Corticosteroids</H>
    <Quote label="JTA storm corticosteroids 2016" />
    <Quote label="ATA 2016" />
    <p>Steroids treat relative adrenal insufficiency in the hypermetabolic state and reduce T4-to-T3 conversion. The two guideline regimens are similar in total dose (about 300 mg hydrocortisone a day).</p>
    <H>Cooling and the choice of antipyretic</H>
    <Quote label="JTA storm cooling 2016" />
    <p>JTA/JES also advises against aspirin and some other anti-inflammatory antipyretics because they may increase free thyroid hormone by displacing it from binding proteins (paraphrased from the guideline). Look for and treat infection as a trigger.</p>
    <H>When standard treatment fails</H>
    <Quote label="JTA storm plasmapheresis 2016" />
    <p>See <Link to="/intensive-care/icu-endocrine-emergencies" className="text-primary underline">Endocrine Emergencies</Link> for the overview and the related myxoedema coma lesson.</p>
    <Check question="Which antipyretic does JTA/JES recommend in thyroid storm, and why not aspirin?">Paracetamol (acetaminophen), with mechanical cooling. Aspirin may raise free thyroid hormone by displacing it from binding proteins.</Check>
  </div>;
}

export function ThyroidStormPeriopTeaching() {
  return <div className={wrap}>
    <H>Anaesthesia and the thyrotoxic patient</H>
    <p><Reasoning />the main anaesthetic lesson is prevention. Elective surgery in an uncontrolled thyrotoxic patient should be postponed until they are clinically euthyroid. For urgent surgery, prepare with an antithyroid drug, beta-blockade, steroids and (after the antithyroid drug) iodide, with endocrine input. Avoid drugs that worsen tachycardia where alternatives exist, and treat intraoperative storm with the same multimodal sequence plus active cooling and critical care.</p>
    <p>This perioperative summary is teaching synthesis drawn from the treatment principles above, not a quoted guideline section; local perioperative endocrine policy takes precedence.</p>
    <Check question="A patient with untreated Graves' disease, heart rate 130 and tremor is listed for elective hernia repair. What should happen?">Postpone the operation and refer for control of thyrotoxicosis. Elective surgery should wait until the patient is clinically euthyroid.</Check>
  </div>;
}
