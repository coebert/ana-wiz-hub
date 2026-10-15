import { Link } from "react-router-dom";
import { Check, H, Reasoning, lessonWrap as wrap, makeQuote } from "./EndocrinePageShared";

const Quote = makeQuote("endocrine-tumours");
const link = "text-primary underline";

export function PhaeoPhysiologyTeaching() {
  return <div className={wrap}>
    <p>Quotations come from Gombert et al.'s 2025 review of phaeochromocytoma management (<em>Int J Mol Sci</em>) and Xu et al.'s 2022 systematic review and meta-analysis of carcinoid crisis (<em>Cancers</em>). Text marked teaching synthesis is standard teaching, not a quoted source.</p>
    <H>Where the tumour comes from</H>
    <Quote label="IJMS phaeo origin 2025" />
    <p><Reasoning />the synthesis pathway is tyrosine → DOPA (tyrosine hydroxylase, the rate-limiting step) → dopamine → noradrenaline → adrenaline. The last step uses PNMT, which is induced by cortisol from the surrounding adrenal cortex, so adrenaline-secreting tumours are usually adrenal; extra-adrenal paragangliomas mostly secrete noradrenaline. Catecholamines are broken down by COMT to metanephrines and then by MAO to vanillylmandelic acid.</p>
    <Check question="Why do extra-adrenal paragangliomas rarely secrete adrenaline?">Converting noradrenaline to adrenaline needs PNMT, which depends on high local cortisol levels found only in the adrenal medulla.</Check>
  </div>;
}

export function PhaeoDiagnosisTeaching() {
  return <div className={wrap}>
    <H>Biochemistry first, imaging second</H>
    <Quote label="IJMS phaeo metanephrines 2025" />
    <p><Reasoning />metanephrines are produced continuously inside the tumour, so they pick up tumours that release catecholamines only in bursts. Imaging (CT or MRI) follows a positive test, and genetic testing is offered because a substantial share of these tumours are inherited (for example MEN2, von Hippel–Lindau, SDH mutations).</p>
    <Check question="Why are plasma metanephrines a better first test than plasma catecholamines?">Metanephrines are made continuously within the tumour, while catecholamine release may be intermittent, so a single catecholamine sample can miss the tumour.</Check>
  </div>;
}

export function PhaeoAnaesthesiaTeaching() {
  return <div className={wrap}>
    <H>Preparing the patient</H>
    <Quote label="IJMS phaeo blockade 2025" />
    <p><Reasoning />phenoxybenzamine blocks alpha receptors irreversibly and non-selectively; doxazosin is selective and competitive. Patients are encouraged to take salt and fluid as blockade restores the shrunken circulating volume. Giving a beta-blocker first leaves alpha-mediated vasoconstriction unopposed and can precipitate a hypertensive crisis and heart failure.</p>
    <H>In theatre</H>
    <p><Reasoning />place an arterial line before induction. Surges happen at intubation, insufflation and tumour handling; short-acting drugs such as phentolamine, magnesium, nitroprusside or esmolol are used. Avoid drugs that release histamine or stimulate catecholamine release. After the tumour's veins are tied, catecholamine levels fall quickly and hypotension follows, treated with fluid and vasopressors.</p>
    <H>After resection</H>
    <Quote label="IJMS phaeo hypoglycaemia 2025" />
    <Quote label="IJMS phaeo catecholamines 2025" />
    <p><Reasoning />monitor glucose regularly for the first day, and give steroid cover after bilateral adrenalectomy.</p>
    <Check question="Why is hypotension common straight after the tumour veins are ligated?">The catecholamine drive disappears in minutes while alpha-blockade (especially irreversible phenoxybenzamine) persists, unmasking a relatively empty, dilated circulation.</Check>
  </div>;
}

export function CarcinoidTeaching() {
  return <div className={wrap}>
    <H>Physiology of carcinoid syndrome</H>
    <p><Reasoning />neuroendocrine tumours of the midgut secrete serotonin, histamine, kinins and other vasoactive substances. The liver normally clears these from portal blood, so the syndrome (flushing, diarrhoea, bronchospasm) usually means liver metastases. Serotonin causes fibrosis of the right-sided heart valves (tricuspid regurgitation, pulmonary stenosis); the lungs inactivate it, so the left heart is usually spared. Echocardiography is part of the assessment. Urinary 5-HIAA is the classic marker of serotonin production.</p>
    <H>Carcinoid crisis</H>
    <Quote label="Xu carcinoid crisis 2022" />
    <Quote label="Xu carcinoid risk factors 2022" />
    <Quote label="Xu carcinoid octreotide 2022" />
    <p><Reasoning />crisis presents as profound hypotension (sometimes hypertension), bronchospasm and flushing, often triggered by tumour handling or induction. Octreotide, a somatostatin analogue, is kept immediately available and given to treat crisis; the evidence for routine prophylaxis is uncertain, as above. Adrenaline and other catecholamines can worsen mediator release, so specialist protocols prefer octreotide and direct-acting vasopressors such as vasopressin. More detail is on the <Link to="/perioperative/endocrine-disease" className={link}>Endocrine Co-Existing Disease</Link> page.</p>
    <Check question="Which carcinoid patient having surgery is at highest risk of carcinoid crisis according to the 2022 meta-analysis?">A patient with liver metastases (odds ratio about 2.9). Liver metastasis was the main significant risk factor.</Check>
  </div>;
}
