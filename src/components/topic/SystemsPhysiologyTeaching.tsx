import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";
import { LessonSources } from "@/components/topic/LessonSources";

/** Renal, cardiovascular and respiratory system overviews. Quotes are verbatim from OpenStax Anatomy and Physiology 2e (CC BY 4.0). */
const RT = "renal-system-overview";
const CT = "cardiovascular-system-overview";
const PT = "respiratory-system-overview";
const RQ = makeQuote(RT);
const CQ = makeQuote(CT);
const PQ = makeQuote(PT);
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;

/* ---------------- Renal ---------------- */
export function RenalFiltrationTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Glomerular filtration</H>
      <RQ label="OpenStax GFR value" />
      <RQ label="OpenStax NFP equation" />
      <p><Reasoning />the kidneys filter about 180 L a day yet pass only 1–2 L of urine, so almost all of the work is reabsorption. Because the net filtration pressure is only about 10 mmHg, small changes in glomerular capillary pressure or plasma oncotic pressure change filtration a great deal (teaching summary). Hypotension under anaesthesia therefore threatens filtration quickly. Detail: <L to="/physiology/renal-physiology">Renal Physiology</L>.</p>
      <Check question="Using the OpenStax figures, what is the net filtration pressure and how is it made up?">NFP = glomerular blood hydrostatic pressure 55 − (capsular hydrostatic pressure 15 + blood colloid osmotic pressure 30) = 10 mmHg.</Check>
      <LessonSources topicId={RT} labels={["OpenStax GFR value", "OpenStax NFP equation"]} />
    </div>
  );
}

export function RenalConcentrationTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Reabsorption and concentrating urine</H>
      <RQ label="OpenStax countercurrent" />
      <RQ label="OpenStax countercurrent terms" />
      <p><Reasoning />the loop of Henle builds a salt and urea gradient deep in the medulla. Water can only leave the collecting duct down that gradient when water channels are present, which is where ADH acts (next lesson). Loop diuretics block the solute pumps of the thick ascending limb and so wash out the gradient (teaching summary).</p>
      <Check question="What do the words 'countercurrent' and 'multiplier' each refer to?">Countercurrent: the descending and ascending limbs lie side by side with fluid flowing in opposite directions. Multiplier: solute pumps raise the concentration of urea and Na⁺ deep in the medulla.</Check>
      <LessonSources topicId={RT} labels={["OpenStax countercurrent", "OpenStax countercurrent terms"]} />
    </div>
  );
}

export function RenalHormonesTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Hormonal control: renin–angiotensin–aldosterone and ADH</H>
      <RQ label="OpenStax renin" />
      <RQ label="OpenStax angiotensin II" />
      <RQ label="OpenStax ADH" />
      <p><Reasoning />after blood loss or dehydration, angiotensin II and ADH act together to hold on to salt and water and support blood pressure, which is one reason urine output falls after surgery even when the kidneys are healthy (teaching summary). ACE inhibitors and angiotensin receptor blockers remove part of this defence, which helps explain the low blood pressure sometimes seen at induction in patients taking them (teaching summary). See <L to="/intensive-care/aki-rrt">AKI &amp; renal replacement therapy</L> for clinical detail.</p>
      <Check question="How does ADH increase water reabsorption?">It moves aquaporin water channels into the apical membrane of principal cells in the collecting duct, so water leaves the duct by osmosis.</Check>
      <LessonSources topicId={RT} labels={["OpenStax renin", "OpenStax angiotensin II", "OpenStax ADH"]} />
    </div>
  );
}

/* ---------------- Cardiovascular ---------------- */
export function CardiacOutputTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Cardiac output</H>
      <CQ label="OpenStax cardiac output" />
      <CQ label="OpenStax CO values" />
      <p><Reasoning />CO = HR × SV. Stroke volume depends on preload, contractility and afterload, so any change in cardiac output can be traced to one of four factors: heart rate, preload, contractility or afterload (teaching summary). The OpenStax figures are for each ventricle, not the two added together. Detail: <L to="/physiology/cardiac-cycle">The Cardiac Cycle</L>.</p>
      <Check question="Stroke volume 70 mL and heart rate 75 bpm: what is cardiac output?">70 × 75 = 5250 mL/min, about 5.25 L/min.</Check>
      <LessonSources topicId={CT} labels={["OpenStax cardiac output", "OpenStax CO values"]} />
    </div>
  );
}

export function PreloadAfterloadTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Preload, Frank–Starling and afterload</H>
      <CQ label="OpenStax Frank-Starling" />
      <CQ label="OpenStax afterload" />
      <p><Reasoning />a fluid bolus increases preload and, while the heart sits on the steep part of the Starling curve, stroke volume. On the flat part, more fluid adds little except congestion — the basis of testing fluid responsiveness rather than giving fluid by default (teaching summary). Aortic stenosis and high vascular resistance raise afterload. Fluid exchange in the capillaries is covered on <L to="/physiology/starling-forces">Starling Forces</L>.</p>
      <Check question="What does the Frank–Starling mechanism state?">Within physiological limits, the force of contraction is directly proportional to the initial length of the muscle fibre, so greater stretch increases stroke volume.</Check>
      <LessonSources topicId={CT} labels={["OpenStax Frank-Starling", "OpenStax afterload"]} />
    </div>
  );
}

export function BloodPressureControlTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Blood pressure and the baroreceptors</H>
      <CQ label="OpenStax MAP" />
      <CQ label="OpenStax baroreceptors" />
      <p><Reasoning />MAP is approximately diastolic pressure plus one third of pulse pressure, and it equals cardiac output × systemic vascular resistance (teaching summary). A fall in pressure reduces stretch of the carotid sinus and aortic baroreceptors, so heart rate and vascular tone rise. Many anaesthetic drugs blunt this reflex, so blood pressure falls further and recovers more slowly under anaesthesia (teaching summary). Neural pathways: <L to="/physiology/autonomic-nervous">Autonomic Nervous System</L>.</p>
      <Check question="Where are the main vascular baroreceptors, and what do they detect?">In the sinuses of the aorta and carotid arteries; they are stretch receptors that sense the degree of stretch caused by blood pressure.</Check>
      <LessonSources topicId={CT} labels={["OpenStax MAP", "OpenStax baroreceptors"]} />
    </div>
  );
}

/* ---------------- Respiratory ---------------- */
export function VentilationMechanicsTeaching() {
  return (
    <div className={lessonWrap}>
      <H>How air moves: pressures and Boyle's law</H>
      <PQ label="OpenStax pulmonary ventilation" />
      <PQ label="OpenStax Boyle" />
      <p><Reasoning />in spontaneous breathing the diaphragm enlarges the chest, alveolar pressure falls below atmospheric and air flows in. Positive-pressure ventilation reverses this: pressure is pushed in from outside, which raises intrathoracic pressure and reduces venous return (teaching summary). Compliance and resistance: <L to="/physiology/lung-mechanics">Lung Mechanics</L>.</p>
      <Check question="Using Boyle's law, why does air enter the lungs during inspiration?">The thoracic volume increases, so alveolar pressure falls below atmospheric pressure and air flows in down the pressure gradient.</Check>
      <LessonSources topicId={PT} labels={["OpenStax pulmonary ventilation", "OpenStax Boyle"]} />
    </div>
  );
}

export function GasExchangeTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Gas exchange: partial pressures</H>
      <PQ label="OpenStax Dalton" />
      <PQ label="OpenStax Henry" />
      <p><Reasoning />raising inspired oxygen raises alveolar PO₂ (Dalton) and so the dissolved oxygen in plasma (Henry). Gas moves from higher to lower partial pressure, so oxygenation depends on how well ventilation matches blood flow in each lung unit (teaching summary). See <L to="/physiology/ventilation-perfusion">Ventilation–Perfusion</L>.</p>
      <Check question="State Henry's law.">The concentration of a gas in a liquid is directly proportional to its solubility and partial pressure.</Check>
      <LessonSources topicId={PT} labels={["OpenStax Dalton", "OpenStax Henry"]} />
    </div>
  );
}

export function GasTransportTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Carrying oxygen and carbon dioxide</H>
      <PQ label="OpenStax Bohr" />
      <PQ label="OpenStax CO2 bicarbonate" />
      <PQ label="OpenStax Haldane" />
      <PQ label="OpenStax central chemoreceptors" />
      <p><Reasoning />in the tissues, acid and CO₂ help haemoglobin release oxygen (Bohr), and deoxygenated haemoglobin picks up more CO₂ (Haldane); in the lungs both reverse. Breathing is driven mainly by CO₂ through the central chemoreceptors, and opioids and volatile agents depress this response (teaching summary). Curve detail: <L to="/physiology/oxygen-haemoglobin">Oxygen–Haemoglobin Dissociation</L>.</p>
      <Check question="How is most carbon dioxide carried to the lungs?">As bicarbonate — about 70 percent, made mainly inside red cells by carbonic anhydrase.</Check>
      <LessonSources topicId={PT} labels={["OpenStax Bohr", "OpenStax CO2 bicarbonate", "OpenStax Haldane", "OpenStax central chemoreceptors"]} />
    </div>
  );
}
