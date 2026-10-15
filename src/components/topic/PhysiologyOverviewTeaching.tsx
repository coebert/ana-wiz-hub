import { Link } from "react-router-dom";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "physiology-overview";
const Quote = makeQuote(T);
const link = "text-primary underline";

export function HomeostasisTeaching() {
  return (
    <div className={lessonWrap}>
      <H>What homeostasis means</H>
      <p>Physiology is the study of how the body keeps its internal environment steady while the outside world changes. The OpenStax Anatomy and Physiology textbook (openly licensed, CC BY) puts it like this:</p>
      <Quote label="OpenStax monitoring" />
      <Quote label="OpenStax set point" />
      <p><Reasoning />a set point is not a single fixed value. Body temperature, blood pressure, blood glucose and plasma sodium each sit inside a normal range, and the body defends that range rather than one exact number. For temperature the set point is about 37°C; for mean arterial pressure, roughly 90–100 mmHg in a resting adult.</p>
      <H>Why it matters in anaesthesia</H>
      <p><Reasoning />almost everything anaesthesia does disturbs homeostasis, and almost every monitor exists to watch it happen. Induction drops blood pressure; positive-pressure ventilation changes venous return; surgery triggers a stress response; blood loss threatens oxygen delivery. The physiological pages on this site are the detail behind each defended variable: <Link to="/physiology/cardiac-cycle" className={link}>The Cardiac Cycle</Link> and <Link to="/physiology/oxygen-haemoglobin" className={link}>Oxygen-Haemoglobin Dissociation</Link> for oxygen delivery, <Link to="/physiology/renal-physiology" className={link}>Renal Physiology</Link> for fluid and electrolyte balance, and <Link to="/physiology/endocrine-physiology" className={link}>Endocrine Physiology</Link> for the stress response.</p>
      <Check question="a patient's core temperature falls to 35.5°C during a long operation. In homeostatic terms, what has happened?">
        <p>The value has moved outside its normal range around the set point (about 37°C). Sensors in the skin and hypothalamus detect the deviation, and effectors — shivering, vasoconstriction, increased metabolic rate — act to return it. Anaesthesia blunts these responses, which is why active warming is needed.</p>
      </Check>
      <LessonSources topicId={T} labels={["OpenStax monitoring", "OpenStax set point"]} />
    </div>
  );
}

export function FeedbackLoopsTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Negative feedback: the default</H>
      <Quote label="OpenStax negative feedback" />
      <p>A negative feedback loop has three working parts, defined in the source:</p>
      <Quote label="OpenStax sensor" />
      <Quote label="OpenStax effector" />
      <p><Reasoning />between them sits the control centre, which compares the sensed value with the normal range and decides how strongly to drive the effector. The baroreflex is the classic anaesthetic example: stretch receptors in the carotid sinus and aortic arch (sensors) report pressure to the medulla (control centre), which adjusts heart rate and vascular tone (effectors) through the autonomic nervous system — see <Link to="/physiology/autonomic-nervous" className={link}>Autonomic Nervous System</Link>. The same sensor–centre–effector pattern controls ventilation via CO₂ (<Link to="/physiology/ventilation-perfusion" className={link}>Ventilation-Perfusion Matching</Link>) and blood glucose via insulin (<Link to="/perioperative/diabetes-management" className={link}>Diabetes Management</Link>).</p>
      <H>Positive feedback: change that feeds itself</H>
      <Quote label="OpenStax positive feedback" />
      <Quote label="OpenStax positive endpoint" />
      <p><Reasoning />positive feedback is useful only when it has a built-in stop: delivery ends the labour loop, and a formed clot ends the coagulation loop. Without an end point, positive feedback is a vicious cycle — the physiology of decompensation. Falling cardiac output reduces coronary perfusion, which weakens the heart further; rising intracranial pressure reduces cerebral perfusion, which worsens the pressure. Recognising these loops, and breaking them early, is the logic behind shock management on the <Link to="/intensive-care/haemorrhagic-shock" className={link}>Haemorrhagic Shock</Link> page.</p>
      <Check question="oxytocin release during labour is positive feedback. What is the sensor, the control centre and the effector, and what ends the loop?">
        <p>Stretch-sensitive nerve cells in the cervix are the sensors; the hypothalamus and posterior pituitary form the control centre; the uterine muscle is the effector, contracting harder as oxytocin rises. Delivery of the baby removes the stretch stimulus and ends the loop.</p>
      </Check>
      <LessonSources topicId={T} labels={["OpenStax negative feedback", "OpenStax sensor", "OpenStax effector", "OpenStax positive feedback", "OpenStax positive endpoint"]} />
    </div>
  );
}

export function OrganSystemsTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Eleven systems, one patient</H>
      <Quote label="OpenStax organ system" />
      <p><Reasoning />the eleven systems are a useful filing scheme, but no system works alone, and the boundaries are imprecise — the pancreas belongs to both the digestive and endocrine systems. In exams and at the bedside, the skill is tracing one variable across systems: arterial oxygen content depends on the lungs, the blood, the heart and the circulation together.</p>
      <H>Where each system is covered on this site</H>
      <p>Cardiovascular: <Link to="/physiology/cardiac-cycle" className={link}>The Cardiac Cycle</Link>, <Link to="/physiology/cardiac-electrophysiology" className={link}>Cardiac Electrophysiology</Link> and <Link to="/physiology/starling-forces" className={link}>Starling Forces &amp; Fluid Exchange</Link>. Respiratory: <Link to="/physiology/lung-mechanics" className={link}>Lung Mechanics</Link>, <Link to="/physiology/ventilation-perfusion" className={link}>Ventilation-Perfusion Matching</Link> and <Link to="/physiology/oxygen-haemoglobin" className={link}>Oxygen-Haemoglobin Dissociation</Link>. Nervous and neuromuscular: <Link to="/physiology/autonomic-nervous" className={link}>Autonomic Nervous System</Link> and <Link to="/physiology/neuromuscular" className={link}>Neuromuscular Transmission</Link>. Renal, gut and liver: <Link to="/physiology/renal-physiology" className={link}>Renal Physiology</Link>, <Link to="/physiology/gi-physiology" className={link}>Gastrointestinal Physiology</Link> and <Link to="/physiology/hepatic-physiology" className={link}>Hepatic Physiology</Link>. Endocrine and blood: <Link to="/physiology/endocrine-physiology" className={link}>Endocrine Physiology</Link> and <Link to="/physiology/haematology-immunity" className={link}>Haematology &amp; Immunity</Link>. Life stages: <Link to="/physiology/maternal-physiology" className={link}>Maternal Physiology</Link>, <Link to="/physiology/foetal-circulation" className={link}>Foetal Circulation</Link> and <Link to="/physiology/paediatric-physiology" className={link}>Paediatric Physiology</Link>.</p>
      <p><Reasoning />a worked example of integration: a fit adult haemorrhages. Baroreflex (nervous system) raises heart rate and vasoconstricts; adrenaline and cortisol (endocrine) reinforce this; the kidney retains salt and water (renal); breathing quickens as acidosis develops (respiratory); clotting activates (haematology). Every one of those responses is a negative feedback loop defending oxygen delivery — and each has a page above.</p>
      <Check question="why can no single organ system maintain homeostasis on its own?">
        <p>Because each defended variable crosses system boundaries. Blood pressure, for example, is sensed by the nervous system, adjusted by the heart and vessels, supported by renal salt and water handling, and modulated by hormones. Organ systems share sensors, effectors and messengers, so homeostasis is a property of the whole body, not of any one system.</p>
      </Check>
      <LessonSources topicId={T} labels={["OpenStax organ system"]} />
    </div>
  );
}
