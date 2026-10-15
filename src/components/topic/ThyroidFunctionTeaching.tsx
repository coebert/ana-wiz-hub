import { Link } from "react-router-dom";
import { Check, H, Reasoning, lessonWrap as wrap, makeQuote } from "./EndocrinePageShared";

const Quote = makeQuote("thyroid-function");
const link = "text-primary underline";

export function ThyroidSynthesisTeaching() {
  return <div className={wrap}>
    <p>Quotations come from the openly licensed OpenStax <em>Anatomy and Physiology</em> textbook and the 2022 Difficult Airway Society multidisciplinary guideline. Text marked teaching synthesis is standard physiology or anaesthetic teaching, not a quoted source.</p>
    <H>Making the hormone</H>
    <p><Reasoning />TSH drives follicular cells to trap iodide, which thyroid peroxidase oxidises and attaches to tyrosine residues on thyroglobulin (organification), forming MIT and DIT. Coupling gives T4 (DIT + DIT) and T3 (MIT + DIT). The gland secretes mostly T4; most circulating T3, the more active hormone, is made in peripheral tissues by deiodinase enzymes. Thionamides block thyroid peroxidase, which is why they stop new hormone synthesis but not release of stored hormone.</p>
    <H>Control</H>
    <Quote label="OpenStax thyroid feedback" />
    <H>Carriage in blood</H>
    <Quote label="OpenStax thyroid binding" />
    <p><Reasoning />because binding proteins change in pregnancy, oestrogen therapy, liver disease and critical illness, total hormone levels mislead; laboratories report free T4 and free T3.</p>
    <Check question="Why does an antithyroid drug take weeks to make a hyperthyroid patient euthyroid?">It blocks new synthesis but the gland and the circulation hold a large store of preformed, mostly protein-bound hormone that has to be used up first.</Check>
  </div>;
}

export function ThyroidTestsTeaching() {
  return <div className={wrap}>
    <H>What thyroid hormone does</H>
    <Quote label="OpenStax thyroid metabolism" />
    <p><Reasoning />thyroid hormone raises metabolic rate and oxygen use, increases cardiac beta-receptor sensitivity, heart rate and output, and supports normal ventilatory drive and drug metabolism. These effects explain most of the anaesthetic problems in both excess and deficiency.</p>
    <H>Reading thyroid function tests</H>
    <p><Reasoning />these are the standard textbook patterns, not quoted from a source:</p>
    <div className="overflow-x-auto"><table className="w-full text-left text-sm border border-border">
      <thead><tr className="bg-muted"><th className="p-2">TSH</th><th className="p-2">Free T4 / T3</th><th className="p-2">Usual meaning</th></tr></thead>
      <tbody>
        <tr className="border-t border-border"><td className="p-2">High</td><td className="p-2">Low</td><td className="p-2">Primary hypothyroidism</td></tr>
        <tr className="border-t border-border"><td className="p-2">High</td><td className="p-2">Normal</td><td className="p-2">Subclinical hypothyroidism</td></tr>
        <tr className="border-t border-border"><td className="p-2">Low</td><td className="p-2">High</td><td className="p-2">Primary hyperthyroidism (e.g. Graves', toxic nodule)</td></tr>
        <tr className="border-t border-border"><td className="p-2">Low or normal</td><td className="p-2">Low</td><td className="p-2">Central (pituitary) hypothyroidism, or non-thyroidal illness</td></tr>
      </tbody>
    </table></div>
    <p><Reasoning />in critical illness, low T3 with normal or low TSH ("non-thyroidal illness" or sick euthyroid syndrome) is common and is not treated with thyroid hormone. Dopamine and high-dose steroids suppress TSH; amiodarone can cause either hypo- or hyperthyroidism. Test thyroid function in ICU only when there is a clinical reason.</p>
    <Check question="An ICU patient with sepsis has low free T3, low-normal free T4 and a normal TSH. Should levothyroxine be started?">No. This is the usual pattern of non-thyroidal illness; repeat the tests after recovery unless there are clear features of pituitary or thyroid disease.</Check>
  </div>;
}

export function ThyroidPerioperativeTeaching() {
  return <div className={wrap}>
    <H>Hyperthyroidism</H>
    <Quote label="OpenStax hyperthyroidism" />
    <p><Reasoning />elective surgery should wait until the patient is clinically and biochemically euthyroid on antithyroid drugs, with beta-blockade for symptoms. Untreated thyrotoxicosis before urgent surgery risks tachyarrhythmia, heart failure and thyroid storm; emergency control is covered on the <Link to="/intensive-care/thyroid-storm" className={link}>Thyroid Storm</Link> page.</p>
    <H>Hypothyroidism</H>
    <p><Reasoning />mild, treated hypothyroidism rarely delays surgery. Severe untreated disease brings reduced cardiac output, blunted response to hypoxia and hypercapnia, hypothermia, hyponatraemia and slow drug clearance, so sedatives and opioids last longer. Myxoedema coma is a medical emergency, managed with intravenous thyroid hormone and steroid cover under endocrine advice.</p>
    <H>The goitre and the airway</H>
    <p><Reasoning />ask about positional breathlessness, stridor and dysphagia; review CT for tracheal compression or deviation and retrosternal extension. Large retrosternal goitres can compress the airway and great vessels after induction. Plan the airway with the surgeon; difficulty is usually at the level of the narrowing rather than at laryngoscopy.</p>
    <Check question="A patient with untreated Graves' disease (heart rate 128, raised free T4) is listed for an elective hernia repair. What should happen?">Postpone. Treat with an antithyroid drug and a beta-blocker until euthyroid; operating now risks arrhythmia and thyroid storm for no urgent benefit.</Check>
  </div>;
}

export function ThyroidPostopTeaching() {
  return <div className={wrap}>
    <H>Haematoma after thyroid surgery</H>
    <Quote label="DAS haematoma airway 2022" />
    <Quote label="DAS haematoma timing 2022" />
    <p>The guideline grades hourly observations for at least the first 6 hours. If a haematoma compromises the airway, the wound is opened at the bedside:</p>
    <Quote label="DAS haematoma SCOOP 2022" />
    <p><Reasoning />venous congestion and laryngeal oedema, not just direct compression, cause the obstruction, so the airway may stay swollen after evacuation. Give oxygen, call for senior surgical and anaesthetic help, and prepare for a difficult intubation and front-of-neck access.</p>
    <H>Other complications</H>
    <p><Reasoning />recurrent laryngeal nerve injury (unilateral: hoarse voice; bilateral: stridor after extubation); hypocalcaemia from parathyroid injury, typically 24–48 hours after total thyroidectomy (perioral tingling, Chvostek and Trousseau signs, prolonged QT); and, rarely, tracheomalacia.</p>
    <Check question="Two hours after thyroidectomy, a patient has a tense, swelling neck and noisy breathing. What is the first action after calling for help?">Follow SCOOP: expose the skin, cut the sutures, open the skin and the muscle layers, and pack the wound — at the bedside, without waiting to return to theatre.</Check>
  </div>;
}
