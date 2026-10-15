import { Link } from "react-router-dom";
import { Check, H, Reasoning, lessonWrap as wrap, makeQuote } from "./EndocrinePageShared";

const Quote = makeQuote("adrenal-crisis");

export function AdrenalCrisisRecognitionTeaching() {
  return <div className={wrap}>
    <p>This page adopts the Society for Endocrinology 2016 emergency guidance (Arlt et al.) as its framework. Quotations are the guidance's own wording; surrounding explanation is teaching synthesis, not a patient-specific prescription.</p>
    <Quote label="SfE crisis definition 2016" />
    <H>Who is at risk</H>
    <p>Primary adrenal insufficiency (for example autoimmune Addison's disease, adrenalectomy or congenital adrenal hyperplasia) loses both cortisol and aldosterone. Secondary insufficiency (pituitary or hypothalamic disease) loses cortisol but keeps aldosterone, so hyperkalaemia is not expected. The largest group seen by anaesthetists is patients on long-term steroids:</p>
    <Quote label="SfE secondary insufficiency 2016" />
    <H>How it presents</H>
    <p>Hypotension or shock that responds poorly to fluids and vasopressors, nausea and vomiting, abdominal pain that can mimic an acute abdomen, confusion and fatigue. Bloods may show hyponatraemia, hyperkalaemia (primary disease), hypoglycaemia and a raised urea. A normal sodium and potassium does not exclude crisis.</p>
    <Check question="A patient taking prednisolone 10 mg daily for 6 months for rheumatoid arthritis has unexplained hypotension after emergency laparotomy. Could this be adrenal crisis even though the adrenal glands are healthy?">Yes. Long-term steroids at ≥5 mg prednisolone equivalent for more than 4 weeks suppress the pituitary drive to the adrenals, so the patient cannot mount a stress cortisol response.</Check>
  </div>;
}

export function AdrenalCrisisTreatmentTeaching() {
  return <div className={wrap}>
    <H>Treat first</H>
    <Quote label="SfE crisis immediate treatment 2016" />
    <p><Reasoning />if it causes no delay, take a blood sample for cortisol (and ACTH) before the first dose, but never hold hydrocortisone to obtain it.</p>
    <H>Hydrocortisone</H>
    <Quote label="SfE crisis hydrocortisone 2016" />
    <H>Fluids</H>
    <Quote label="SfE crisis fluids 2016" />
    <p>Check capillary glucose and treat hypoglycaemia following local protocol. Look for the trigger — most often infection or gastroenteritis — and treat it. At hydrocortisone doses above about 50 mg a day the drug's own mineralocorticoid activity is generally considered sufficient, so fludrocortisone is not needed in the acute phase (standard pharmacology teaching).</p>
    <Check question="Should hydrocortisone be withheld until a short Synacthen test is done?">No. The guidance is explicit that diagnostic measures should never delay treatment; the diagnosis can be confirmed after recovery.</Check>
  </div>;
}

export function AdrenalCrisisRecoveryTeaching() {
  return <div className={wrap}>
    <H>Tapering and mineralocorticoid</H>
    <p>Once the patient is stable and eating, hydrocortisone is reduced towards the usual oral dose over a few days under endocrine supervision.</p>
    <Quote label="SfE adrenal emergency 2016" />
    <H>Preventing the next crisis</H>
    <p>Most crises follow a missed increase in steroid dose during illness:</p>
    <Quote label="SfE crisis sick day 2016" />
    <p>Before discharge, patients should have a steroid emergency card, an injection kit with training, and sick-day rule education. For planned surgery, follow the 2020 perioperative glucocorticoid guideline from the Association of Anaesthetists, Society for Endocrinology and partners (Woodcock et al.), cited here as a general reference only.</p>
    <Check question="What is Sick Day Rule 1?">Double the usual oral glucocorticoid dose during an intercurrent illness with fever that needs bed rest and/or antibiotics.</Check>
  </div>;
}

export function AdrenalCrisisVsSepsisTeaching() {
  return <div className={wrap}>
    <H>Replacement is not the same as a septic-shock adjunct</H>
    <p>Hydrocortisone appears in two very different roles in critical care.</p>
    <Quote label="SSC steroid indication 2021" />
    <Quote label="SSC hydrocortisone regimen 2021" />
    <p><Reasoning />in septic shock, hydrocortisone is a suggested adjunct for patients still needing vasopressors; it is a weak recommendation and the evidence shows faster shock reversal rather than clear survival benefit. In adrenal crisis, hydrocortisone replaces a missing hormone and is lifesaving and non-negotiable — the dose is given immediately as a bolus. Never let uncertainty about the septic-shock evidence delay replacement in a patient who may be adrenally insufficient. More on the septic-shock evidence is on the <Link to="/intensive-care/sepsis" className="text-primary underline">Sepsis &amp; Septic Shock</Link> page.</p>
    <Check question="A patient with known Addison's disease presents in septic shock. Is hydrocortisone optional, as the Surviving Sepsis 'suggest' wording implies?">No. For this patient it is replacement of a hormone they cannot make; give 100 mg immediately. The septic-shock 'suggestion' applies to patients without known adrenal insufficiency.</Check>
  </div>;
}
