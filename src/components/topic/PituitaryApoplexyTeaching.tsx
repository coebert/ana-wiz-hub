import { Link } from "react-router-dom";
import { Check, H, Reasoning, lessonWrap as wrap, makeQuote } from "./EndocrinePageShared";

const Quote = makeQuote("pituitary-apoplexy");

export function ApoplexyRecognitionTeaching() {
  return <div className={wrap}>
    <p>This page adopts the Society for Endocrinology 2016 emergency guidance (Baldeweg et al.) and the 2011 UK pituitary apoplexy guideline (Rajasekaran et al.). Quotations are the sources' own wording; surrounding explanation is teaching synthesis.</p>
    <H>What it is</H>
    <p>Pituitary apoplexy is sudden bleeding into, or infarction of, the pituitary gland, usually within an existing (often undiagnosed) adenoma. The swelling compresses the optic chiasm and cavernous sinuses, and destroys hormone-producing tissue.</p>
    <H>When to suspect it</H>
    <Quote label="SfE apoplexy suspicion 2016" />
    <p>The guidance lists three groups: patients in whom subarachnoid haemorrhage and meningitis have been excluded, patients with neuro-ophthalmic signs, and patients with a known pituitary tumour (list paraphrased). Typical features are sudden severe headache, often with vomiting; reduced visual acuity or a bitemporal field defect; and ocular palsies, most often a third nerve palsy. Reduced consciousness, fever and neck stiffness can make it look like subarachnoid haemorrhage or meningitis.</p>
    <Quote label="SfE apoplexy imaging 2016" />
    <Check question="Why can pituitary apoplexy be mistaken for subarachnoid haemorrhage?">Both cause a sudden severe headache, and blood in the subarachnoid space from apoplexy can cause neck stiffness, photophobia and reduced consciousness. MRI of the pituitary distinguishes them.</Check>
  </div>;
}

export function ApoplexySteroidTeaching() {
  return <div className={wrap}>
    <H>Steroids first in unstable or visually threatened patients</H>
    <Quote label="SfE apoplexy emergency 2016" />
    <Quote label="SfE apoplexy dose 2016" />
    <p>Acute ACTH deficiency is common and is the immediate threat to life. Take blood for cortisol and other pituitary hormones if it causes no delay, then give hydrocortisone. Check sodium and fluid balance closely: hyponatraemia may come from cortisol deficiency, and diabetes insipidus is uncommon at presentation but can follow surgery.</p>
    <p><Reasoning />these doses are higher in the infusion arm than the adrenal crisis regimen on the <Link to="/intensive-care/adrenal-crisis" className="text-primary underline">Adrenal Crisis</Link> page. Use the regimen the guidance gives for the condition in front of you, and agree it with the endocrine team.</p>
    <Check question="Which features are indications for empirical steroids in pituitary apoplexy?">Haemodynamic instability, altered consciousness, reduced visual acuity and severe visual field defects.</Check>
  </div>;
}

export function ApoplexySurgeryTeaching() {
  return <div className={wrap}>
    <H>Surgery or watchful management</H>
    <Quote label="SfE apoplexy surgery 2016" />
    <Quote label="SfE apoplexy early surgery 2016" />
    <Quote label="UK pituitary apoplexy 2011" />
    <p>The evidence is observational: patients with severe or worsening visual or neurological signs go for early transsphenoidal decompression after medical stabilisation, and others are often managed conservatively with close visual monitoring. Management should be decided by a joint neurosurgical and endocrine team.</p>
    <H>After the acute phase</H>
    <Quote label="SfE apoplexy follow-up 2016" />
    <p><Reasoning />for the anaesthetist, transsphenoidal surgery brings shared-airway and nasal-packing issues, perioperative steroid cover and postoperative monitoring for diabetes insipidus or sodium disturbance. The neurosurgical anaesthesia detail is beyond this page.</p>
    <Check question="Within what time frame did studies show greater visual improvement with surgery?">Early surgery, within 8 days, was associated with greater improvement in visual acuity and fields. These studies were observational, not randomised.</Check>
  </div>;
}
