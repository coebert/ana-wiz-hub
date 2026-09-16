import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import WETFLAGDiagram from "@/components/diagrams/intensive-care/WETFLAGDiagram";
import PaediatricVitalsTable from "@/components/diagrams/intensive-care/PaediatricVitalsTable";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { paediatricEmergenciesQuestions } from "@/data/quizzes";

const tocItems = [
  { id: "wetflag", label: "WETFLAG & Age-Specific Vital Signs", group: "Foundations" },
  { id: "physiology", label: "Age-Specific Physiology", group: "Foundations" },
  { id: "section-recognition", label: "Recognising the Collapsing Child & Neonate", group: "Recognition" },
  { id: "section-sepsis", label: "Sepsis: Age-Specific Presentations", group: "Emergency presentations" },
  { id: "sepsis", label: "Paediatric Sepsis & Shock — Management", group: "Emergency presentations" },
  { id: "section-metabolic", label: "Metabolic & Endocrine Crises (incl. ammonia scavengers)", group: "Emergency presentations" },
  { id: "section-anaphylaxis", label: "Anaphylaxis & Acute Severe Asthma", group: "Emergency presentations" },
  { id: "section-cardiac", label: "Cardiac Presentations & Duct-Dependent Collapse", group: "Emergency presentations" },
  { id: "section-cardiac-picu", label: "PICU Perioperative Cardiac Care & Airway Malacia", group: "Emergency presentations" },
  { id: "resus", label: "Resuscitation Key Numbers", group: "Arrest & arrhythmia" },
  { id: "section-arrest", label: "Paediatric Cardiac Arrest Algorithms", group: "Arrest & arrhythmia" },
  { id: "section-arrhythmias", label: "Paediatric Arrhythmias", group: "Arrest & arrhythmia" },
  { id: "neurocrit", label: "Paediatric Neurocritical Care", group: "Neurocritical care" },
  { id: "section-trauma", label: "Major Trauma & Traumatic Brain Injury", group: "Neurocritical care" },
  { id: "section-stroke", label: "Paediatric Stroke", group: "Neurocritical care" },
  { id: "airway", label: "Airway & Ventilation in PICU", group: "Organ support" },
  { id: "section-resp-emergencies", label: "Bronchiolitis, Croup & Extubation Failure", group: "Organ support" },
  { id: "section-ecmo", label: "ECMO & Extracorporeal Support", group: "Organ support" },
  { id: "section-neonatal-surgical", label: "Neonatal Surgical Emergencies", group: "Organ support" },
  { id: "sedation", label: "Sedation, Analgesia & Withdrawal", group: "Organ support" },
  { id: "fluids", label: "Fluids, Electrolytes & Nutrition", group: "Organ support" },
  { id: "drug-dosing", label: "Drug Dosing in Small Patients", group: "Organ support" },
  { id: "section-infection", label: "Infection Prevention & PICU Bundles", group: "Safeguarding & systems" },
  { id: "section-nai", label: "Non-Accidental Injury", group: "Safeguarding & systems" },
  { id: "ethics", label: "Safeguarding, Ethics & End-of-Life", group: "Safeguarding & systems" },
  { id: "section-transfer", label: "Stabilisation, Retrieval & Handover", group: "Safeguarding & systems" },
  { id: "risk-scoring", label: "Risk Stratification & Scoring Systems", group: "Safeguarding & systems" },
];

const paediatricIcuFaqs: Array<[string, string]> = [
[
    "What discriminates a metabolic crisis from sepsis in a collapsed neonate?",
    "Nothing reliably does on clinical grounds alone, which is why the emergency metabolic screen (glucose, gas, lactate, ammonia, ketones, urine organic acids, plasma amino acids, acylcarnitines) is taken during the crisis while sepsis is treated empirically. Clues to a metabolic cause are a large anion-gap acidosis out of proportion to perfusion, hyperammonaemia with a respiratory alkalosis, hypoglycaemia without ketones, an unusual odour, a family history of unexplained infant death or consanguinity, and deterioration coinciding with a feed change or intercurrent illness (BIMDG emergency guidelines).",
  ],
  [
    "When should prostaglandin E1 be started before an echocardiogram?",
    "When a neonate in the first weeks of life has shock, cyanosis unresponsive to oxygen, absent or weak femoral pulses or a pre/post-ductal saturation gradient and echocardiography is not immediately available. The risks — apnoea, hypotension, fever, jitteriness — are manageable and far less than the risk of duct closure in a duct-dependent lesion; secure the airway before transfer.",
  ],
  [
    "Which children with acute stroke are considered for thrombolysis or thrombectomy?",
    "Decisions are made in a paediatric neuroscience centre. Intravenous thrombolysis is not routinely recommended in children outside specialist protocols and trials, while mechanical thrombectomy is increasingly offered for confirmed large-vessel occlusion with a significant deficit in older children within a treatment window, based on registry and adult trial data extrapolation. Sickle cell stroke is treated with urgent exchange transfusion, and haemorrhagic stroke is managed with neurosurgical involvement, so the first steps are always urgent imaging and a specialist call.",
  ],
  ["What fluid resuscitation strategy is recommended for paediatric septic shock?", "10 mL/kg isotonic crystalloid boluses with reassessment after each; 20 mL/kg is reserved for specific situations (e.g. profound shock), with smaller 5 mL/kg boluses in DKA or trauma. If shock persists after 1–2 boluses, move earlier to vasoactive infusions (adrenaline for cold shock, noradrenaline for warm) rather than escalating fluid further (SSC Paediatric 2020, APLS 2021; FEAST caution in resource-limited settings)."],
  ["What is paediatric ARDS (PARDS) and how does ventilation differ?", "The Global Definition of PARDS (2023) requires onset within 7 days, new infiltrates not fully explained by cardiac failure or fluid overload, and hypoxaemia by OI/OSI (or non-invasively, SpO₂/FiO₂ ≤250 on CPAP ≥5 cmH₂O). Ventilate with Vt 5–8 mL/kg PBW, plateau ≤28 cmH₂O, permissive hypercapnia (pH ≥7.20), PEEP titrated 8–15 cmH₂O; prone position for moderate/severe disease (OI ≥12)."],
  ["How is intraosseous access used in paediatric resuscitation?", "Insert in the proximal tibia (or distal femur/humerus) if IV access fails within 60–90 s in shock or arrest; flow rates approach IV after a 10 mL saline flush, and all resus drugs can be given at standard doses."],
];

const objectives = [
"Differentiate the small number of time-critical diagnoses that present as an undifferentiated collapsed infant, using the shock, glucose, ammonia and duct-dependence discriminators.",
  "Recognise sepsis in the neonate, infant and older child, including the presentations that lack fever, and initiate the age-appropriate empirical antimicrobial regimen.",
  "Investigate and treat a suspected inborn error of metabolism or endocrine crisis, including the emergency metabolic screen, glucose infusion, ammonia-lowering therapy and stress-dose steroid.",
  "Identify duct-dependent congenital heart disease, myocarditis and supraventricular tachycardia as causes of neonatal or infant circulatory collapse and start prostaglandin E1 where indicated.",
  "Apply the paediatric bradycardia, SVT and shockable-rhythm algorithms with weight-based drug and energy doses, including the modifications for the neonate.",
  "Recognise childhood arterial ischaemic and haemorrhagic stroke, arrange urgent imaging, and outline thrombolysis, thrombectomy and sickle-cell exchange decisions.",
  "Recognise and act on features suggesting non-accidental injury in a critically ill child while preserving both the clinical priority and the safeguarding process.",
  "Stabilise and hand over a critically ill child to a paediatric retrieval service using a structured, time-stamped handover.",
  "Apply WETFLAG and APLS age-banded vitals to deliver immediate weight-based therapy in a critically unwell child.",
  "Recognise the age-specific physiology that distinguishes paediatric resuscitation from adult care (HR-dependent CO, rapid desaturation, thermoregulation).",
  "Manage paediatric septic shock with 10–20 mL/kg crystalloid boluses, early vasopressors, and stress-dose hydrocortisone.",
  "Apply lung-protective ventilation, PRIS-aware sedation, and isotonic maintenance fluids in PICU.",
  "Lead paediatric resuscitation (15:2, 4 J/kg, adrenaline 10 mcg/kg) and recognise when brainstem death testing is permissible.",
  "Prescribe maintenance, deficit and replacement fluid separately using Holliday-Segar with isotonic solutions, adjusting for PICU fluid restriction and special situations (DKA, burns, neonates).",
  "Explain how developmental changes in body water, protein binding, hepatic metabolism and renal clearance alter drug dosing from the neonate to the adolescent.",
];

const workedExamples: WorkedExample[] = [
{
    title: "Collapsed 5-day-old — narrowing the differential in ten minutes",
    scenario: (
      <>
        A 5-day-old term baby (3.4 kg) is brought in mottled, grunting and poorly responsive. Heart
        rate 190, capillary refill 5 s, right-arm SpO₂ 92%, foot SpO₂ 82%, femoral pulses hard to
        feel. Glucose 2.4 mmol/L, pH 7.08, lactate 8.
      </>
    ),
    working: (
      <>
        Three diagnoses account for almost all such presentations: sepsis, duct-dependent
        congenital heart disease and a metabolic crisis (including salt-losing congenital adrenal
        hyperplasia). They are not mutually exclusive and the initial therapy overlaps, so treat in
        parallel rather than choosing. The pre/post-ductal gradient with weak femoral pulses points
        strongly at a duct-dependent left-heart obstruction; hypoglycaemia and acidosis keep the
        metabolic and adrenal causes live.
        <div className="mt-3 bg-secondary/40 border border-border rounded-lg p-3 text-sm">
          <strong>Common traps.</strong> Giving large fluid boluses to a baby in cardiogenic shock
          worsens it — use 10 mL/kg and reassess, looking for hepatomegaly{" "}
          <InlineRef topicId="paediatric-icu" refLabel="APLS 2021" />. Correcting the
          saturation to "normal" with high FiO₂ can close the duct and cause deterioration.
        </div>
      </>
    ),
    answer: (
      <>
        Airway and ventilation support; 10 mL/kg crystalloid with reassessment; 2 mL/kg of 10%
        glucose then an infusion delivering 8–10 mg/kg/min; blood culture and empirical
        benzylpenicillin (or amoxicillin) plus gentamicin, adding aciclovir if encephalopathic;
        take the emergency metabolic screen and a cortisol/17-OHP sample <em>before</em>
        hydrocortisone, then give stress-dose hydrocortisone; start prostaglandin E1 and call the
        paediatric cardiology and retrieval services. Anticipate apnoea after prostaglandin and
        secure the airway before transfer <InlineRef topicId="paediatric-icu" refLabel="NICE NG195" />{" "}
        <InlineRef topicId="paediatric-icu" refLabel="BIMDG Undiagnosed 2023" />.
      </>
    ),
    cites: ["NICE NG195", "BIMDG Undiagnosed 2023", "Kanani PGE1 2019"],
  },
  {
    title: "Infant with a narrow-complex tachycardia at 290/min",
    scenario: (
      <>
        A 4-month-old (6 kg) is pale and tachypnoeic with a regular narrow-complex tachycardia at
        290/min, blood pressure 62/38, capillary refill 4 s and a liver edge 3 cm below the costal
        margin.
      </>
    ),
    working: (
      <>
        Rate above 220 with no beat-to-beat variability and no P waves is SVT rather than sinus
        tachycardia; hepatomegaly and poor perfusion indicate decompensation. Vagal manoeuvres
        (ice-cold pack to the face in an infant) can be tried while preparing drug or electrical
        therapy, but they must not delay treatment in shock.
        <div className="mt-3 bg-secondary/40 border border-border rounded-lg p-3 text-sm">
          <strong>Common traps.</strong> Adenosine needs a rapid central-ish push and immediate
          saline flush through a large proximal cannula — a slow injection through a small hand
          cannula is the usual reason it "fails". Verapamil is contraindicated in infants.
        </div>
      </>
    ),
    answer: (
      <>
        With decompensated shock, give synchronised cardioversion 1 J/kg (6 J) under sedation,
        then 2 J/kg if needed; if a large-bore proximal line is already in and the child can wait
        seconds, adenosine 100 micrograms/kg (0.6 mg) rapid push with a flush is a reasonable
        first step, escalating to 200 then 300 micrograms/kg. Record a 12-lead ECG in and out of
        the arrhythmia, correct electrolytes, and involve paediatric cardiology before starting
        amiodarone or a maintenance agent{" "}
        <InlineRef topicId="paediatric-icu" refLabel="RCUK PALS 2021" />.
      </>
    ),
    cites: ["RCUK PALS 2021", "APLS 2021"],
  },
  {
    title: "WETFLAG for a 4-year-old in resus",
    scenario: (
      <>
        A 4-year-old collapses on the ward. Estimate the seven WETFLAG values you need to deliver
        immediate therapy.
      </>
    ),
    working: (
      <>
        <strong>Weight</strong> ((age + 4) × 2 = 16 kg). <strong>E</strong>nergy (4 J/kg = 64 J).{" "}
        <strong>T</strong>ube (uncuffed age/4 + 4 = 5.0 mm; cuffed 4.5; depth age/2 + 12 = 14 cm).{" "}
        <strong>F</strong>luids (10 mL/kg crystalloid bolus = 160 mL). <strong>L</strong>orazepam
        (0.1 mg/kg = 1.6 mg, max 4 mg). <strong>A</strong>drenaline (10 mcg/kg = 160 mcg = 1.6 mL
        of 1:10,000). <strong>G</strong>lucose (2 mL/kg of 10% = 32 mL).
      </>
    ),
    answer: (
      <>
        Have all seven values pre-calculated <em>before</em> the child arrives so therapy is not
        delayed by mental arithmetic. Reassess weight against length-based estimation
        (Broselow/PAWPER) once a tape is to hand.
      </>
    ),
    cites: ["NICE NG29"],
  },
  {
    title: "Single-ventricle saturations",
    scenario: (
      <>
        A 6-week-old post-Norwood (HLHS) becomes acidotic with SpO₂ 94% on FiO₂ 0.4. Lactate is
        rising. Why is this a problem and what would you do?
      </>
    ),
    working: (
      <>
        Single-ventricle physiology requires balanced Qp:Qs ~1:1, achieved at SpO₂ 75–85%. SpO₂
        94% means pulmonary vascular resistance is too low — pulmonary overcirculation steals from
        the systemic circuit, causing hypoperfusion and lactic acidosis despite "good" sats. The
        instinct to give more O₂ would worsen the steal.
      </>
    ),
    answer: (
      <>
        <strong>Reduce FiO₂</strong> (often to 0.21), accept SpO₂ 75–85%, allow permissive
        hypercapnia (raises PVR). Optimise systemic perfusion with milrinone, fluid as guided by
        echo, treat acidosis. Discuss urgently with paediatric cardiac team — may need
        catheterisation or shunt revision.
      </>
    ),
    cites: ["FEAST 2011"],
  },
];

const PaediatricIcuTopic = () => {
  return (
    <TopicTemplate
      title="Paediatric Intensive Care & Emergencies"
      subtitle="FFICM / EDIC — from the collapsing neonate to organ support, retrieval and safeguarding"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
{
    text: "In a collapsed infant, four bedside tests reorder the whole differential: glucose, blood gas with lactate, ammonia and pre/post-ductal saturations. Hypoglycaemia with ketones absent, a large anion-gap acidosis or an ammonia above the age reference range redirects care from 'sepsis' to a metabolic emergency; a pre/post-ductal saturation difference or absent femoral pulses redirects it to duct-dependent heart disease.",
    cites: ["BIMDG Undiagnosed 2023", "APLS 2021"],
  },
  {
    text: "Neonatal sepsis frequently presents without fever — poor feeding, lethargy, temperature instability, apnoea, grunting, jaundice, hypoglycaemia or an unexplained metabolic acidosis are the common presentations, and empirical cover must include Listeria and group B streptococcus.",
    cites: ["NICE NG195", "NICE NG51"],
  },
  {
    text: "Any encephalopathic child with hypoglycaemia, hyperammonaemia or an unexplained acidosis needs the emergency metabolic screen taken during the crisis, stopping of protein and feed, and a glucose infusion delivering 8–10 mg/kg/min; ammonia-lowering therapy and specialist metabolic advice must not wait for a diagnosis.",
    cites: ["BIMDG Undiagnosed 2023", "Häberle Urea Cycle 2019"],
  },
  {
    text: "A neonate who collapses in the first two weeks with shock, absent femoral pulses, a pre/post-ductal saturation gradient or profound acidosis should be treated as duct-dependent until echocardiography says otherwise: start prostaglandin E1 (dinoprostone/alprostadil) and anticipate apnoea, fever and hypotension.",
    cites: ["NICE NG195", "Kanani PGE1 2019"],
  },
  {
    text: "Paediatric bradycardia with poor perfusion is treated first with oxygen and effective ventilation, because it is almost always hypoxic in origin; adrenaline 10 micrograms/kg is the first drug, with atropine reserved for increased vagal tone or primary atrioventricular block.",
    cites: ["RCUK PALS 2021"],
  },
  {
    text: "Stable SVT is treated with vagal manoeuvres then adenosine 100 micrograms/kg (increasing to 200 then 300 micrograms/kg, adult maximum 12 mg per dose); unstable SVT or VT with a pulse needs synchronised cardioversion at 1 J/kg, then 2 J/kg.",
    cites: ["RCUK PALS 2021", "APLS 2021"],
  },
  {
    text: "Childhood stroke is under-recognised because seizures, altered consciousness and non-focal presentations are common in infants; any child with acute focal neurological deficit needs urgent MRI (or CT if MRI cannot be obtained quickly) and discussion with a paediatric neurology and neurointervention centre.",
    cites: ["RCPCH Stroke 2017", "AHA Paediatric Stroke 2019"],
  },
  {
    text: "In sickle cell disease, acute stroke is a haematological emergency treated with urgent exchange transfusion to bring HbS below 30%, not with simple top-up transfusion alone.",
    cites: ["RCPCH Stroke 2017"],
  },
  {
    text: "Injuries that do not fit the story, the mechanism or the child's developmental stage — retinal haemorrhages, unexplained infant intracranial injury, rib or metaphyseal fractures, delayed presentation or inconsistent histories — require an immediate safeguarding referral alongside resuscitation; the two run in parallel, never in sequence.",
    cites: ["NICE NG76", "RCR Skeletal Survey 2018"],
  },
  {
    text: "Prolonged stabilisation by a retrieval team is usually better than a rushed transfer by an untrained crew, but time-critical lesions (expanding intracranial haemorrhage, duct-dependent lesion needing intervention, surgical bleeding) justify a time-critical transfer by the local team with retrieval advice.",
    cites: ["PCCS Standards 2021"],
  },
        { text: "Children have HR-dependent cardiac output — bradycardia is a pre-arrest sign; treat with atropine 20 mcg/kg", cites: ["Resuscitation Council UK 2021"] },
        { text: "Paediatric septic shock: 10 ml/kg boluses with reassessment after each (20 ml/kg only for profound shock); adrenaline for cold shock, noradrenaline for warm shock", cites: ["BJA Educ 2019"] },
        { text: "Single ventricle physiology: target SpO₂ 75–85%; excessive O₂ causes pulmonary overcirculation and systemic steal", cites: ["RCPCH 2019"] },
        { text: "Propofol is contraindicated by its product licence for ICU sedation at or below 16 years — use it for induction and short procedures only, never as a PICU sedation infusion", cites: ["MHRA Propofol"] },
        { text: "Isotonic maintenance fluids only — hypotonic fluids can cause fatal hyponatraemia in children", cites: ["FEAST 2011"] },
        { text: "Paediatric cardiac arrest is usually respiratory in origin — 5 rescue breaths first, defibrillation 4 J/kg", cites: ["Resuscitation Council UK 2021"] },
        { text: "Death by neurological criteria can be diagnosed from 37 weeks corrected gestation; between term and 2 months it is possible but requires the separate RCPCH infant criteria and longer observation — it is not an absolute bar", cites: ["RCPCH DNC Infants 2015"] },
        { text: "FEAST trial: fluid boluses increased mortality in resource-limited settings — does NOT change UK practice", cites: ["RCPCH 2019"] },
        { text: "Maintenance 4-2-1 (100/50/20 mL/kg/day) but restrict to 50–70% in ventilated or brain-injured children — cumulative positive balance >10% body weight tracks with mortality", cites: ["NICE NG29"] },
        { text: "Neonates need larger mg/kg loading doses (TBW 75–80%, ECF 40–45%) yet lower maintenance doses — immature glucuronidation, low protein binding and GFR 20–30% of adult", cites: ["BJA Educ 2019"] },
        { text: "Toddlers (1–6 y) clear many drugs faster per kg than adults — under-dosing is as common as over-dosing; always state a mg/kg dose with an adult-dose ceiling", cites: ["BJA Educ 2019"] },
        { text: "Hypoglycaemia: 2 mL/kg of 10% glucose (never 50%), then infusion delivering 4–8 mg/kg/min; take a hypoglycaemia screen first where possible", cites: ["APLS 2021"] },
      ]}
      topicId="paediatric-icu"
      topicTitle="Paediatric Intensive Care & Emergencies"
      quizQuestions={[
        ...paediatricEmergenciesQuestions,
        {
          question: "A 6-month-old infant (8 kg) presents in shock. After airway and breathing are addressed, what is the appropriate initial fluid bolus?",
          options: [
            "20 ml/kg 0.9% saline (160 ml) over 5 minutes, reassess",
            "10–20 ml/kg balanced crystalloid (80–160 ml) with reassessment after each bolus",
            "60 ml/kg crystalloid as a single rapid bolus",
            "5 ml/kg 5% albumin only",
          ],
          correctIndex: 1,
          explanation: "Current UK/APLS guidance is 10–20 ml/kg crystalloid boluses with reassessment after each, watching for fluid overload (hepatomegaly, crackles).",
        },
        {
          question: "A 4-year-old with hypoplastic left heart syndrome (post-Norwood) has SpO₂ of 92% on supplemental oxygen with worsening acidosis and poor perfusion. What is the most likely problem?",
          options: [
            "Inadequate oxygenation requiring more FiO₂",
            "Pulmonary overcirculation with systemic steal — reduce FiO₂",
            "Cyanotic spell requiring morphine and knee-to-chest",
            "Sepsis until proven otherwise",
          ],
          correctIndex: 1,
          explanation: "Target SpO₂ in single-ventricle physiology is 75–85%. SpO₂ 92% indicates Qp:Qs imbalance with systemic hypoperfusion.",
        },
        {
          question: "A previously well 2-year-old collapses. Initial rhythm is asystole. Which of the following best reflects paediatric resuscitation priorities?",
          options: [
            "Immediate defibrillation at 4 J/kg",
            "5 rescue breaths first, then CPR at 15:2 with adrenaline 10 mcg/kg every 3–5 min",
            "Adrenaline 1 mg IV every 3–5 minutes as per adult ALS",
            "Atropine 20 mcg/kg as first-line drug",
          ],
          correctIndex: 1,
          explanation: "Paediatric arrests are usually hypoxic — 5 rescue breaths precede CPR. Adrenaline 10 mcg/kg.",
        },
        {
          question: "A 10-kg toddler is admitted post-operatively. Which maintenance fluid is most appropriate?",
          options: [
            "0.18% saline / 4% dextrose at 40 ml/h",
            "Isotonic crystalloid (0.9% saline or balanced) with 5% dextrose at 40 ml/h",
            "0.45% saline at 100 ml/h",
            "Hartmann's at 60 ml/h with no glucose",
          ],
          correctIndex: 1,
          explanation: "NICE NG29: isotonic maintenance only — hypotonic fluids cause fatal hyponatraemia. Holliday-Segar 4-2-1 → 40 ml/h for 10 kg.",
        },
        {
          question: "Which statement about brainstem death testing in children is correct?",
          options: [
            "It can be performed in any infant once apnoea is documented",
            "It is not applicable below 37 weeks corrected gestational age, and additional caution is required under 2 months",
            "It requires EEG confirmation in all children",
            "The same hypothermia thresholds as adults apply without modification",
          ],
          correctIndex: 1,
          explanation: "AoMRC: BSD testing not applicable <37 weeks corrected gestational age. Between term and 2 months, ancillary testing often required.",
        },
        {
          question: "Following a febrile seizure, a child becomes drowsy with new focal neurology. Glucose is 2.1 mmol/L. What is the immediate management?",
          options: [
            "Buccal midazolam 0.5 mg/kg",
            "IV/IO 10% dextrose 2 ml/kg bolus, then reassess",
            "Mannitol 0.5 g/kg for cerebral oedema",
            "Phenytoin loading dose 20 mg/kg",
          ],
          correctIndex: 1,
          explanation: "Always check glucose ('DEFG'). Treat with 10% dextrose 2 ml/kg — avoid 50% (osmolality, vein damage).",
        },
      ]}
      sectionSources={{
        objectives: ["RCPCH 2019", "Resuscitation Council UK 2021", "APLS 2021", "BJA Educ 2019"],
        workedExamples: ["Resuscitation Council UK 2021", "APLS 2021", "NICE NG29", "FEAST 2011"],
        keyPoints: ["RCPCH 2019", "FEAST 2011", "NICE NG29", "Resuscitation Council UK 2021", "APLS 2021", "BJA Educ 2019"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 4.6", "EDIC 5.6"] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
          <p className="text-muted-foreground leading-relaxed">
            This topic runs in the order a child is actually managed: the age-specific numbers and
            physiology first, then recognition of the collapsing child and the emergency
            presentations, then arrest and arrhythmia algorithms, neurocritical care, day-to-day
            organ support, and finally safeguarding, retrieval and outcome scoring. Step-by-step
            pathways are in{" "}
            <Link to="/intensive-care/paediatric-flows" className="text-icu underline underline-offset-4">
              Paediatric ICU Management Flows
            </Link>
            , weaning in{" "}
            <Link to="/intensive-care/paediatric-withdrawal" className="text-icu underline underline-offset-4">
              Paediatric Withdrawal Flows
            </Link>
            , and weight-based rates in the{" "}
            <Link to="/intensive-care/calculator" className="text-icu underline underline-offset-4">
              infusion calculator
            </Link>
            .
          </p>

          <TopicTableOfContents items={tocItems} />

          <ExamSection id="wetflag" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="WETFLAG & Age-Specific Vital Signs" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong>WETFLAG</strong> is the standard APLS pre-calculation performed when any unwell child arrives in resus — generating the seven weight-based numbers (<strong>W</strong>eight · <strong>E</strong>nergy · <strong>T</strong>ube · <strong>F</strong>luids · <strong>L</strong>orazepam · <strong>A</strong>drenaline · <strong>G</strong>lucose) needed to deliver immediate therapy without doing arithmetic under stress. Alongside it, the vitals table gives age-banded normal ranges for HR, RR, SBP and urine output so deviations can be recognised at a glance. For the underlying age-specific physiology, maintenance fluid prescribing, weight-based dosing and pain scoring, see the{" "}
              <Link to="/clinical/paediatric-core" className="text-primary underline underline-offset-2 font-medium">
                Paediatric Core Essentials
              </Link>{" "}
              topic.
            </p>
            <div className="grid lg:grid-cols-2 gap-4 items-start">
              <WETFLAGDiagram />
              <PaediatricVitalsTable />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="physiology" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Age-Specific Physiology">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">System</th>
                    <th className="text-left py-2 text-foreground font-semibold">Neonate / Infant</th>
                    <th className="text-left py-2 text-foreground font-semibold">Clinical Implication</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Airway</td><td>Large head/tongue, anterior larynx, cricoid narrowest &lt;8 yrs</td><td>Cuffed ETT now acceptable from neonates <InlineRef topicId="paediatric-icu" refLabel="Litman 2013" /></td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Respiratory</td><td>O₂ consumption 6–8 ml/kg/min, low FRC, obligate nasal &lt;6 mo</td><td>Rapid desaturation — HFNO during intubation</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cardiovascular</td><td>HR-dependent CO, higher resting HR</td><td>Bradycardia ≈ pre-arrest; atropine 20 mcg/kg. Hypotension is LATE</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Renal</td><td>Immature GFR until ~2 y</td><td>Fluid overload risk; weight-based dosing</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Thermoregulation</td><td>Large BSA:weight, brown fat, no shivering</td><td>Active warming essential</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Pharmacology</td><td>Higher Vd, immature CYP, low protein binding</td><td>Weight-based mg/kg; some drugs need higher doses</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Respiratory physiology — why children desaturate in seconds</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>
                <strong>High demand, small store.</strong> Oxygen consumption is{" "}
                <strong>6–8 mL/kg/min in a neonate versus 3–4 mL/kg/min in an adult</strong>, while FRC is
                similar per kg (~25–30 mL/kg) and closing volume lies <em>within</em> tidal breathing. Alveolar
                ventilation is ~130 mL/kg/min against an FRC of 30 mL/kg — a V<sub>A</sub>:FRC ratio of ~5:1
                (adult 1.5:1), so alveolar gas — and inhalational agent — equilibrates fast and apnoea causes
                desaturation within 15–20 s <InlineRef topicId="paediatric-icu" refLabel="BJA Educ 2019" />.
              </li>
              <li>
                <strong>Mechanically disadvantaged.</strong> Horizontal ribs, a cartilaginous compliant chest
                wall, a flat diaphragm with few type-I fatigue-resistant fibres (~25% at term vs 55% by 8
                months), and highly compliant airways. The result is early diaphragmatic fatigue, dynamic
                airway collapse, and reliance on laryngeal braking/grunting to generate auto-PEEP — which is
                abolished by intubation, so <strong>always apply PEEP</strong>.
              </li>
              <li>
                <strong>Airway resistance</strong> is governed by Poiseuille: 1 mm of circumferential oedema
                halves the diameter of a 4 mm infant airway and increases resistance ~16-fold (turbulent flow,
                &gt;30-fold), versus a ~3-fold rise in an adult. Neonates are preferential nasal breathers, so
                nasal secretions or an NG tube meaningfully increase work of breathing.
              </li>
              <li>
                <strong>Control of breathing</strong> is immature: hypoxia causes biphasic ventilatory response
                then apnoea; apnoea of prematurity persists until ~60 weeks post-conceptual age.
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Cardiovascular physiology</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>
                <strong>Rate-dependent output.</strong> Neonatal myocardium has fewer contractile elements
                (~30% vs 60% of cell mass), poorly developed sarcoplasmic reticulum with dependence on{" "}
                <strong>extracellular calcium</strong>, and a non-compliant ventricle operating near the top of
                its Starling curve. Stroke volume is therefore near-fixed — cardiac output falls with{" "}
                <strong>bradycardia</strong> and rises little with volume loading. Cardiac index is high
                (~300 mL/kg/min at birth vs 100 mL/kg/min in adults).
              </li>
              <li>
                <strong>Autonomic imbalance</strong> — parasympathetic dominance means vagal stimuli
                (laryngoscopy, suction, hypoxia) readily produce bradycardia. In a child, bradycardia is treated
                as <strong>hypoxia until proved otherwise</strong>: oxygenate and ventilate first, then atropine
                20 mcg/kg (min 100 mcg) and adrenaline 10 mcg/kg if HR &lt;60 with poor perfusion{" "}
                <InlineRef topicId="paediatric-icu" refLabel="Resuscitation Council UK 2021" />.
              </li>
              <li>
                <strong>Compensated shock is the rule.</strong> Vasoconstriction maintains blood pressure until
                ~30–40% of circulating volume is lost, so <strong>hypotension is a pre-terminal sign</strong>.
                Track tachycardia, capillary refill &gt;2 s, core-peripheral temperature gap, lactate, urine
                output and conscious level instead. The 5th-centile systolic BP ≈{" "}
                <strong>70 + (2 × age in years)</strong> mmHg.
              </li>
              <li>
                <strong>Circulating volume</strong> is proportionally large but absolutely tiny:{" "}
                <strong>90 mL/kg (preterm), 80–85 mL/kg (neonate), 75–80 mL/kg (infant), 70 mL/kg (child)</strong>{" "}
                — a 400 mL loss is an entire blood volume in a 5 kg infant, so weigh swabs and measure losses.
              </li>
              <li>
                <strong>Transitional circulation:</strong> for the first days–weeks, hypoxia, acidosis,
                hypercapnia, hypothermia and pain raise PVR and can reopen the ductus arteriosus or foramen
                ovale, causing right-to-left shunt and profound desaturation (persistent pulmonary hypertension
                of the newborn).
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Renal, hepatic, haematological and thermal</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>
                <strong>Renal:</strong> GFR at term is ~20–30% of adult values (corrected for surface area),
                doubling by 2 weeks and reaching adult levels by 1–2 years. Limited concentrating ability (max
                ~600 mosmol/kg vs 1200) and obligate sodium loss in preterms mean{" "}
                <strong>poor tolerance of both dehydration and fluid overload</strong>, and delayed clearance of
                renally excreted drugs.
              </li>
              <li>
                <strong>Hepatic:</strong> reduced phase-I oxidation and phase-II conjugation at birth (immature
                glucuronidation — hence morphine sensitivity and slow paracetamol conjugation, with sulphation
                predominating). Low glycogen stores plus a brain that consumes proportionally more glucose gives
                rapid <strong>hypoglycaemia</strong> with fasting or illness. Vitamin-K-dependent factors are
                low for the first days of life <InlineRef topicId="paediatric-icu" refLabel="Anderson & Holford 2008" />.
              </li>
              <li>
                <strong>Haematological:</strong> HbF (~70–80% at birth) has a left-shifted dissociation curve
                (P₅₀ ~19 mmHg) and 2,3-DPG resistance — good for placental uptake, poor for tissue offloading.
                It is replaced by HbA over 3–6 months, and with iron stores exhausted the{" "}
                <strong>physiological nadir of Hb (~9.5–11 g/dL) occurs at 2–3 months</strong>.
              </li>
              <li>
                <strong>Thermoregulation:</strong> a high surface-area:weight ratio (a neonate ~3× the adult
                value per kg), thin subcutaneous fat and a large head lose heat by radiation, convection,
                conduction and evaporation. Below ~3 months there is <strong>no shivering</strong>; heat is
                produced by uncoupled oxidative phosphorylation in{" "}
                <strong>brown adipose tissue (non-shivering thermogenesis)</strong>, which costs oxygen and
                glucose and generates acid. Hypothermia therefore causes hypoxia, hypoglycaemia, acidosis, raised
                PVR and coagulopathy — actively warm every child with forced-air warming, warmed fluids, hat and
                a raised ambient temperature.
              </li>
              <li>
                <strong>Neurological:</strong> open fontanelles and unfused sutures buffer slowly rising ICP but
                allow a large occult volume of intracranial blood; a large head:body ratio and weak neck muscles
                predispose to injury; the spinal cord ends at L3 at birth (L1 by adulthood) and the intercristal
                line is more caudal, which matters for neuraxial procedures.
              </li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-recognition" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Recognising the Collapsing Child & Neonate">
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Children compensate well and then fail abruptly. The clinical task is not to reach a
                diagnosis first, but to identify which of a short list of reversible processes is
                present while resuscitating. Age reframes the differential completely: the
                undifferentiated collapse of a one-week-old is a different problem from that of a
                six-year-old.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Four discriminating tests</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Glucose</strong> — hypoglycaemia is both a cause and a consequence; the absence of ketones during hypoglycaemia suggests a fatty-acid oxidation defect or hyperinsulinism.</li>
                    <li><strong>Blood gas with lactate</strong> — a large anion-gap acidosis disproportionate to perfusion points to a metabolic disorder or toxin.</li>
                    <li><strong>Ammonia</strong> (free-flowing sample, on ice, run immediately) — hyperammonaemia with respiratory alkalosis in an encephalopathic infant is a urea-cycle emergency <InlineRef topicId="paediatric-icu" refLabel="Häberle Urea Cycle 2019" />.</li>
                    <li><strong>Pre- and post-ductal saturations plus femoral pulses</strong> — a gradient or absent pulses means duct-dependent circulation until echocardiography proves otherwise.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Age-shaped differential</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>First week:</strong> sepsis (group B streptococcus, <em>E. coli</em>, Listeria), duct-dependent lesion, metabolic crisis, salt-losing congenital adrenal hyperplasia, birth asphyxia, non-accidental injury.</li>
                    <li><strong>1 week – 3 months:</strong> the same list plus bronchiolitis, SVT, myocarditis, intussusception, hypertrophic pyloric stenosis with severe alkalosis, abusive head trauma.</li>
                    <li><strong>3 months – 3 years:</strong> sepsis and meningococcal disease, bronchiolitis/viral wheeze, croup and foreign body, intussusception, DKA, ingestion, trauma.</li>
                    <li><strong>Older child:</strong> sepsis, DKA, status epilepticus, asthma, myocarditis and arrhythmia, deliberate ingestion, trauma, stroke (including sickle cell disease).</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-destructive">Pre-arrest signs.</strong> Bradycardia,
                  irregular or gasping respiration, absent responsiveness to the parent, and a
                  narrowing pulse pressure with a rising diastolic are late signs. Cardiac output in
                  infants is rate-dependent, so bradycardia is treated as an emergency: oxygenate
                  and ventilate first <InlineRef topicId="paediatric-icu" refLabel="RCUK PALS 2021" />.
                  The age-banded vitals, WETFLAG values and airway sizing are in the{" "}
                  <a href="#wetflag" className="text-icu underline underline-offset-4">WETFLAG section above</a>.
                </p>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-sepsis" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Sepsis: Age-Specific Presentations">
              <p className="text-muted-foreground leading-relaxed mb-4">
                This section is the recognition problem — the reason children with sepsis are
                missed. The fluid, vasoactive and steroid strategy follows immediately below in{" "}
                <a href="#sepsis" className="text-icu underline underline-offset-4">Paediatric Sepsis &amp; Shock — Management</a>, with the step-by-step pathway in the{" "}
                <Link to="/intensive-care/paediatric-flows" className="text-icu underline underline-offset-4">paediatric sepsis flow</Link>.
              </p>
              <div className="space-y-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Neonatal sepsis (0–28 days)</h3>
                  <p className="text-sm text-muted-foreground">
                    Often afebrile. Poor feeding, lethargy, temperature instability (high or low),
                    apnoea, grunting, tachypnoea, jaundice within 24 h, hypoglycaemia, seizures or an
                    unexplained metabolic acidosis. Risk factors: prolonged rupture of membranes,
                    maternal group B streptococcus colonisation or bacteriuria, maternal fever or
                    chorioamnionitis, prematurity, invasive lines. Empirical therapy covers group B
                    streptococcus, <em>E. coli</em> and Listeria — benzylpenicillin or amoxicillin
                    with gentamicin; add aciclovir for encephalopathy, vesicles or hepatitis, and
                    broaden for late-onset hospital-acquired or line infection{" "}
                    <InlineRef topicId="paediatric-icu" refLabel="NICE NG195" />.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Infant and child</h3>
                  <p className="text-sm text-muted-foreground">
                    Use a structured risk-stratification approach rather than a single number:
                    altered behaviour reported by the parent, reduced responsiveness, mottled or
                    ashen skin, non-blanching rash, tachypnoea, prolonged capillary refill, reduced
                    urine output, and lactate. Hypotension is a late finding — normotensive
                    compensated shock is the norm. Fever with a non-blanching purpuric rash is
                    treated as meningococcal disease with immediate antibiotics and no waiting for
                    lumbar puncture; lumbar puncture is deferred in shock, coagulopathy, raised
                    intracranial pressure or focal signs{" "}
                    <InlineRef topicId="paediatric-icu" refLabel="NICE NG51" />{" "}
                    <InlineRef topicId="paediatric-icu" refLabel="NICE NG240" />.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">The mimics that matter</h3>
                  <p className="text-sm text-muted-foreground">
                    Myocarditis, SVT, duct-dependent heart disease, metabolic crisis, adrenal
                    crisis, intussusception with septic appearance, toxic shock syndrome and
                    ingestion all masquerade as sepsis. Any child who fails to respond to standard
                    sepsis resuscitation should trigger an echocardiogram, a glucose and ammonia
                    check, a review of the drug chart and a surgical opinion.
                  </p>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="sepsis" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Paediatric Sepsis & Shock — Management">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Children more commonly present with <strong>cold shock</strong> (vasoconstricted, poor perfusion) than warm vasodilated shock. Antibiotics within 1 h. Fluid in <strong>10 mL/kg isotonic crystalloid boluses</strong>, reassessing after each — <strong>20 mL/kg is reserved for specific situations</strong> (e.g. severe hypovolaemia), while <strong>5 mL/kg</strong> boluses are used in DKA or trauma to reduce the risk of cerebral oedema and dilutional coagulopathy respectively <InlineRef topicId="paediatric-icu" refLabel="SSC Paediatric 2020" /> <InlineRef topicId="paediatric-icu" refLabel="APLS 2021" />. Hepatomegaly = fluid overload. Have <strong>earlier recourse to vasoactive infusions</strong> rather than repeatedly escalating fluid if shock persists after 1–2 boluses: peripheral adrenaline (cold) or noradrenaline (warm). Stress-dose hydrocortisone for catecholamine-resistant shock.
            </p>
            <div className="bg-card border border-border rounded-lg p-4 mb-3">
              <h3 className="font-semibold text-foreground mb-2">Defining paediatric sepsis — the Phoenix criteria (2024)</h3>
              <p className="text-sm text-muted-foreground">
                The 2024 international consensus (Phoenix) replaced the 2005 criteria, which relied on
                SIRS and proved neither specific nor predictive in children. Sepsis is now{" "}
                <strong>suspected infection plus a Phoenix Sepsis Score ≥ 2</strong>, and{" "}
                <strong>septic shock is sepsis with ≥ 1 cardiovascular point</strong>; the term
                &ldquo;severe sepsis&rdquo; is retired <InlineRef topicId="paediatric-icu" refLabel="Phoenix Sepsis 2024" />.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li><strong>Respiratory (0–3)</strong> — PaO₂/FiO₂ or SpO₂/FiO₂ ratio with respiratory support and invasive ventilation.</li>
                <li><strong>Cardiovascular (0–6)</strong> — vasoactive drugs (1 point each up to 2), lactate 5–10.9 and ≥11 mmol/L, and age-adjusted mean arterial pressure.</li>
                <li><strong>Coagulation (0–2)</strong> — platelets &lt;100 ×10⁹/L, INR &gt;1.3, D-dimer &gt;2 mg/L FEU, fibrinogen &lt;100 mg/dL (1 point each, maximum 2).</li>
                <li><strong>Neurological (0–2)</strong> — GCS ≤10, or bilaterally non-reactive pupils (2 points).</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                Practically it identifies the sick child who needs escalation rather than replacing the
                clinical Sepsis-6 response: <strong>oxygen, cultures, antibiotics within 1 h, lactate,
                fluid, early senior/PICU involvement</strong>. Score-based definitions are for
                epidemiology and audit — treat the child in front of you <InlineRef topicId="paediatric-icu" refLabel="NICE NG51" />.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ FEAST Trial (2011)</p>
              <p className="text-sm text-muted-foreground mt-1">
                In resource-limited settings, fluid boluses increased 48-h mortality. Does NOT apply to UK PICU practice but is frequently examined.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-metabolic" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Metabolic & Endocrine Crises">
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Inborn errors of metabolism present acutely in the newborn period or during
                catabolic stress (infection, fasting, surgery, a feed change). The generic emergency
                management is the same whatever the eventual diagnosis: stop the offending
                substrate, reverse catabolism with generous glucose, remove toxic metabolites and
                get specialist metabolic advice early{" "}
                <InlineRef topicId="paediatric-icu" refLabel="BIMDG Undiagnosed 2023" />. Diabetic ketoacidosis is covered in the{" "}
                <a href="#neurocrit" className="text-icu underline underline-offset-4">paediatric neurocritical care</a> subsection.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Emergency metabolic screen</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Blood: gas, glucose, lactate, ammonia, ketones (3-hydroxybutyrate), electrolytes, urea, creatinine, liver function, clotting, creatine kinase, plasma amino acids, acylcarnitine profile, and a saved plasma/blood-spot sample.</li>
                    <li>Urine: the first sample passed during the crisis for organic acids, amino acids, ketones and reducing substances — a sample taken after recovery may be normal.</li>
                    <li>Take a cortisol, 17-hydroxyprogesterone and paired glucose <em>before</em> giving hydrocortisone where the clinical state allows.</li>
                    <li>Save cerebrospinal fluid glycine/lactate if lumbar puncture is performed.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Generic emergency treatment</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Stop protein and feeds</strong> and start intravenous glucose 10% delivering roughly <strong>8–10 mg/kg/min</strong> (adding insulin rather than reducing glucose if hyperglycaemia develops), which suppresses catabolism. Note this <em>anti-catabolic</em> rate is deliberately higher than the <strong>4–8 mg/kg/min</strong> used simply to maintain normoglycaemia after correcting a hypoglycaemic episode — the aim here is to switch off protein breakdown, not just to normalise glucose, and it usually needs central access or 12.5–15% glucose to limit volume.</li>
                    <li><strong>Treat hypoglycaemia</strong> with 2 mL/kg of 10% glucose, never 50%, then maintain the infusion and recheck.</li>
                    <li><strong>Correct dehydration and acidosis</strong> cautiously; bicarbonate only for severe acidosis in discussion with the metabolic team.</li>
                    <li><strong>Hyperammonaemia:</strong> stop protein, escalate glucose, give sodium benzoate and sodium phenylbutyrate with arginine or carglumic acid as directed, and arrange haemofiltration urgently if ammonia remains high or is rising — dialysis clears ammonia far faster than drugs alone <InlineRef topicId="paediatric-icu" refLabel="Häberle Urea Cycle 2019" />.</li>
                    <li>Avoid prolonged fasting, lactate-containing fluids in suspected mitochondrial disease, and propofol infusions in suspected fatty-acid oxidation disorders.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground font-semibold">Pattern</th>
                      <th className="text-left py-2 text-foreground font-semibold">Suggests</th>
                      <th className="text-left py-2 text-foreground font-semibold">Immediate action</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Encephalopathy, respiratory alkalosis, high ammonia, normal glucose</td>
                      <td>Urea cycle disorder</td>
                      <td>Stop protein, high-rate glucose, ammonia scavengers, urgent haemofiltration</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Large anion-gap acidosis, ketosis, neutropenia, unusual odour</td>
                      <td>Organic acidaemia (e.g. methylmalonic, propionic, isovaleric)</td>
                      <td>Stop protein, glucose, carnitine and vitamin cofactors as advised, consider filtration</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Hypoglycaemia with absent/low ketones, hepatomegaly, cardiomyopathy or arrhythmia</td>
                      <td>Fatty-acid oxidation defect (e.g. MCAD)</td>
                      <td>Glucose infusion, avoid fasting and lipid-heavy sedation, cardiac monitoring</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Hyponatraemia, hyperkalaemia, hypoglycaemia, shock, virilised or ambiguous genitalia</td>
                      <td>Salt-losing congenital adrenal hyperplasia / adrenal crisis</td>
                      <td>Saline, glucose, stress-dose hydrocortisone after taking cortisol and 17-OHP; treat hyperkalaemia</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-foreground">Persistent lactic acidosis with normal perfusion, multi-organ involvement</td>
                      <td>Mitochondrial disease</td>
                      <td>Avoid lactate-containing fluids and prolonged propofol; specialist advice</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Ammonia scavengers and ammonia-lowering therapy</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Ammonia is neurotoxic: a level above roughly 200 micromol/L in an encephalopathic
                  child is an emergency, above about 500 micromol/L carries a high risk of cerebral
                  oedema and death, and duration of hyperammonaemia predicts neurological outcome.
                  Treatment has three simultaneous strands — <strong>stop ammonia production</strong>{" "}
                  (no protein, generous glucose with insulin as needed to reverse catabolism, treat
                  infection, pain and fever), <strong>divert nitrogen through alternative pathways</strong>{" "}
                  (scavengers and urea-cycle substrates), and <strong>remove ammonia mechanically</strong>{" "}
                  (haemodialysis or high-flow continuous haemofiltration). Doses must be confirmed
                  with the regional metabolic team and the paediatric formulary before administration
                  <InlineRef topicId="paediatric-icu" refLabel="Häberle Urea Cycle 2019" />{" "}
                  <InlineRef topicId="paediatric-icu" refLabel="BIMDG Undiagnosed 2023" />{" "}
                  <InlineRef topicId="paediatric-icu" refLabel="BNF for Children" />.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                        <th className="text-left py-2 text-foreground font-semibold">How it works</th>
                        <th className="text-left py-2 text-foreground font-semibold">Practical points</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border">
                        <td className="py-2 font-medium text-foreground">Sodium benzoate</td>
                        <td>Conjugates with glycine to form hippurate, which is excreted renally — each mole of benzoate removes one mole of nitrogen</td>
                        <td>Given intravenously as a loading dose over 90–120 min followed by the same amount over 24 h (typically of the order of 250 mg/kg load and 250 mg/kg/day, per specialist advice). Large sodium load, so watch sodium, fluid balance and osmolality; extravasation is irritant; overdose causes vomiting, acidosis and hypotension</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-medium text-foreground">Sodium phenylbutyrate / phenylacetate</td>
                        <td>Phenylacetate conjugates with glutamine to form phenylacetylglutamine, removing two moles of nitrogen per mole — the more efficient scavenger</td>
                        <td>Phenylbutyrate is enteral (foul-tasting, often via nasogastric tube); intravenous sodium phenylacetate/benzoate combinations are used where available. Sodium load again matters; hypokalaemia is common; drug interactions with valproate and corticosteroids increase nitrogen load</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-medium text-foreground">Glycerol phenylbutyrate</td>
                        <td>Pro-drug releasing phenylbutyrate slowly in the gut</td>
                        <td>Maintenance rather than crisis therapy — better tolerated and taste-neutral, but slower onset and no intravenous route</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-medium text-foreground">Arginine (or citrulline)</td>
                        <td>Replaces the urea-cycle intermediate lost in most proximal defects, restoring flux and becoming an essential amino acid in these children</td>
                        <td>Intravenous arginine hydrochloride in the crisis; the dose differs by defect and is <strong>contraindicated in arginase deficiency</strong>. Chloride load can cause hyperchloraemic acidosis; citrulline (enteral) is preferred long-term in OTC and CPS1 deficiency</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-medium text-foreground">Carglumic acid</td>
                        <td>Synthetic N-carbamylglutamate — replaces the missing allosteric activator of carbamoyl phosphate synthetase 1</td>
                        <td>Specific and highly effective in N-acetylglutamate synthase deficiency, and used empirically in undiagnosed severe hyperammonaemia and in organic acidaemias or valproate-induced hyperammonaemia where CPS1 is secondarily inhibited. Enteral only</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-medium text-foreground">L-carnitine</td>
                        <td>Conjugates accumulated organic acyl groups and restores free carnitine</td>
                        <td>Used in organic acidaemias and valproate toxicity rather than primary urea-cycle disease; not an ammonia scavenger itself</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-foreground">Haemodialysis / high-flow CVVHDF</td>
                        <td>Direct extracorporeal ammonia clearance, an order of magnitude faster than drug therapy</td>
                        <td>Indicated for ammonia that is very high, rising, or not falling within a few hours of drugs, and for coma. Anticipate rebound after stopping, use high dialysate/effluent flows, and continue scavengers throughout. Peritoneal dialysis and exchange transfusion are inadequate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-3">
                  <li><strong>Monitoring:</strong> ammonia every 2–4 h until falling reliably, plus glucose, sodium, potassium, chloride, acid-base, osmolality, lactate, amino acids and neurological observations; a rising ammonia despite therapy means filtration now.</li>
                  <li><strong>Sodium and fluid:</strong> scavengers plus flushes deliver a large sodium load into a child at risk of cerebral oedema — count it in the daily total, avoid hypotonic fluid, and avoid overhydration.</li>
                  <li><strong>Avoid nitrogen-loading and precipitating drugs:</strong> valproate, corticosteroids, prolonged starvation, and protein reintroduction that is too fast; restart protein at a low dose within 24–48 h to avoid worsening catabolism.</li>
                  <li><strong>Secondary hyperammonaemia</strong> (valproate, organic acidaemia, asparaginase, portosystemic shunting, urease-producing urinary infection) is managed by treating the cause alongside carglumic acid, carnitine and scavengers as advised.</li>
                </ul>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-anaphylaxis" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Anaphylaxis & Acute Severe Asthma">
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Two allergic/airway emergencies account for a large share of paediatric critical care
                admissions from the emergency department, and both are treated by dose and by
                escalation ladder rather than by diagnosis alone.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Anaphylaxis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Recognise</strong>: sudden onset after an allergen with airway (stridor, tongue/lip swelling), breathing (wheeze, hypoxia, fatigue) or circulation (hypotension, pallor, collapse) compromise. Skin changes are absent in up to 20%, and in children respiratory features dominate while hypotension is a late sign. Persistent gastrointestinal symptoms after a food allergen count as anaphylaxis <InlineRef topicId="paediatric-icu" refLabel="RCUK Anaphylaxis 2021" />.</li>
                    <li><strong>Adrenaline intramuscular, anterolateral thigh, 1:1000</strong>: 100–150 micrograms (0.1–0.15 mL) under 6 months, 150 micrograms (0.15 mL) 6 months–6 years, 300 micrograms (0.3 mL) 6–12 years, 500 micrograms (0.5 mL) above 12 years; repeat after 5 minutes if no improvement <InlineRef topicId="paediatric-icu" refLabel="RCUK Anaphylaxis 2021" />.</li>
                    <li><strong>Then</strong>: high-flow oxygen, lie flat with legs raised (never sit up or stand a hypotensive child), remove the trigger, fluid bolus 10 mL/kg crystalloid repeated as needed, and inhaled salbutamol for bronchospasm.</li>
                    <li><strong>Refractory anaphylaxis</strong> (no improvement after two intramuscular doses) — start an <strong>adrenaline infusion</strong> (0.05–0.3 micrograms/kg/min, titrated) with continuous monitoring and senior/critical-care help, add a second vasopressor if needed, and consider glucagon in a child on beta-blockers. Antihistamine and corticosteroid are <strong>no longer part of initial emergency treatment</strong> and must not delay adrenaline.</li>
                    <li><strong>After</strong>: mast-cell tryptase as soon as possible and at 1–2 h (plus a baseline sample &gt;24 h later), observe for a <strong>biphasic reaction</strong> — 6–12 h observation depending on severity, treatment needed and the RCUK risk criteria — then two adrenaline auto-injectors with training, an allergy action plan and a paediatric allergy referral.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Acute severe / life-threatening asthma</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Severity</strong>: severe — SpO₂ &lt;92%, too breathless to talk or feed, respiratory rate &gt;40 (1–5 y) or &gt;30 (&gt;5 y), heart rate &gt;140 or &gt;125, PEF 33–50% predicted. <strong>Life-threatening</strong> — silent chest, poor effort, cyanosis, exhaustion, agitation or reduced conscious level, hypotension, PEF &lt;33% <InlineRef topicId="paediatric-icu" refLabel="BTS/SIGN Asthma 2019" />.</li>
                    <li><strong>Step 1</strong>: oxygen to SpO₂ 94–98%, salbutamol 10 puffs by spacer or 2.5 mg (&lt;5 y) / 5 mg nebulised, repeated back-to-back; add ipratropium 250 micrograms with the first three nebulisers; oral prednisolone 1–2 mg/kg (maximum 40–50 mg) or IV hydrocortisone 4 mg/kg.</li>
                    <li><strong>Step 2</strong>: magnesium sulfate 40 mg/kg IV (maximum 2 g) over 20 min; consider nebulised magnesium adjunct; correct dehydration and hypokalaemia (beta-agonists drive potassium intracellularly), and check the gas — a normal or rising PaCO₂ in a tiring child is ominous.</li>
                    <li><strong>Step 3 (PICU)</strong>: intravenous salbutamol bolus 15 micrograms/kg over 10 min then infusion 1–5 micrograms/kg/min (watch lactate, tachycardia and potassium), or aminophylline 5 mg/kg loading over 20 min (omit the load if on oral theophylline) then 1 mg/kg/h with level monitoring.</li>
                    <li><strong>Ventilation is a last resort</strong>: intubation and positive pressure in severe asthma cause hypotension and barotrauma. If unavoidable, use ketamine 1–2 mg/kg for induction, a large tube, a long expiratory time with low rate and low Vt, permissive hypercapnia, minimal PEEP, and be ready to disconnect and decompress the chest for breath-stacking or pneumothorax. Ketamine infusion, inhalational anaesthetic and ECMO are rescue options.</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-cardiac" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Cardiac Presentations & Duct-Dependent Collapse">
              <p className="text-muted-foreground leading-relaxed mb-4">
                This subsection is about undiagnosed disease presenting as an emergency;
                postoperative and staged-palliation care follows in{" "}
                <a href="#section-cardiac-picu" className="text-icu underline underline-offset-4">PICU Perioperative Cardiac Care</a>, and the transitional circulation is covered in{" "}
                <Link to="/physiology/foetal-circulation" className="text-icu underline underline-offset-4">Foetal &amp; Transitional Circulation</Link>.
              </p>
              <div className="space-y-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Duct-dependent presentations</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Duct-dependent systemic circulation</strong> (critical coarctation, interrupted arch, critical aortic stenosis, hypoplastic left heart): collapse, acidosis, absent femoral pulses, differential saturations, oliguria — typically day 2–14 as the duct closes.</li>
                    <li><strong>Duct-dependent pulmonary circulation</strong> (pulmonary atresia, critical pulmonary stenosis, tricuspid atresia): profound cyanosis with clear lungs and little respiratory distress, unresponsive to oxygen (a hyperoxia test that fails to raise PaO₂ substantially).</li>
                    <li><strong>Transposition of the great arteries</strong>: cyanosis with reverse differential saturations; needs prostaglandin and urgent consideration of balloon atrial septostomy.</li>
                    <li><strong>Prostaglandin E1 (alprostadil/dinoprostone)</strong> reopens or maintains the duct. Typical starting dose is <strong>5–10 nanograms/kg/min</strong> by continuous infusion into a secure central or well-running peripheral line, titrated <strong>up to 50–100 nanograms/kg/min</strong> if the duct fails to open and back down to 5 nanograms/kg/min once saturations and perfusion improve — the lowest effective rate minimises side effects. Anticipate <strong>apnoea</strong> (dose-related; be ready to intubate, and intubate before transfer if the dose is high), hypotension, fever, flushing, jitteriness, seizures and thrombocytopenia; check the local paediatric formulary for the concentration in use because tenfold errors are the classic incident <InlineRef topicId="paediatric-icu" refLabel="Kanani PGE1 2019" /> <InlineRef topicId="paediatric-icu" refLabel="BNF for Children" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Myocarditis and cardiomyopathy</h3>
                  <p className="text-sm text-muted-foreground">
                    Often mislabelled as sepsis, pneumonia or gastroenteritis: a child with
                    tachycardia out of proportion to fever, hepatomegaly, poor perfusion,
                    respiratory distress with a normal chest examination, ST/T changes or arrhythmia,
                    and a raised troponin. Fluid boluses are poorly tolerated — give small volumes
                    and reassess, start inotropic support early (milrinone, adrenaline or
                    dobutamine), avoid intubation-induced hypotension, and discuss extracorporeal
                    support and ventricular assist options early with a paediatric cardiac centre.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Other cardiac emergencies</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Kawasaki disease and paediatric inflammatory multisystem syndrome</strong>: prolonged fever with shock and myocardial dysfunction; immunoglobulin, steroid and cardiology involvement.</li>
                    <li><strong>Tamponade</strong>: after cardiac surgery, in malignancy or with an indwelling line — sudden fall in output with rising filling pressures; urgent echocardiography and drainage.</li>
                    <li><strong>Total anomalous pulmonary venous drainage with obstruction</strong>: severe cyanosis and pulmonary oedema unresponsive to prostaglandin — a surgical emergency.</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-cardiac-picu" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="PICU Perioperative Management of Paediatric Cardiac Disease">
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Children come to PICU either before repair (stabilising a duct-dependent or
                obstructed lesion) or after it. The single most useful question is whether the
                circulation is in series (biventricular repair) or in parallel (shunt-dependent or
                single ventricle), because that dictates the oxygen, carbon dioxide and afterload
                targets. Postoperative low cardiac output syndrome, single-ventricle balance and pulmonary
                hypertensive crisis are set out below.
              </p>
              <div className="space-y-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Preoperative PICU care by anomaly group</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Left-to-right shunts</strong> (large VSD, AVSD, truncus, unrestricted PDA): pulmonary overcirculation with poor feeding, tachypnoea and failure to thrive. Avoid supplemental oxygen and hyperventilation, which lower pulmonary vascular resistance and worsen the steal; diuresis, calorie-dense feeding and permissive mild hypercapnia are more useful. High saturations with poor perfusion are a warning, not reassurance.</li>
                    <li><strong>Obstructed or duct-dependent lesions</strong>: prostaglandin E1 with an airway plan, avoid high FiO₂, and keep the systemic circulation supported rather than driving cardiac output with fluid <InlineRef topicId="paediatric-icu" refLabel="Kanani PGE1 2019" />.</li>
                    <li><strong>Cyanotic lesions with fixed pulmonary obstruction</strong> (tetralogy of Fallot): treat spells with knees-to-chest, oxygen, fluid, morphine or ketamine sedation and a vasoconstrictor to raise systemic resistance; avoid agents that drop afterload or increase contractility of the outflow-tract muscle.</li>
                    <li><strong>Obstructed venous return</strong> (obstructed TAPVR, mitral stenosis, restrictive atrial septum in transposition): pulmonary oedema that worsens with positive fluid balance — these are catheter or surgical emergencies rather than medical problems.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Staged single-ventricle palliation</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Stage 1 — Norwood (or hybrid) in the neonate</strong>: aortic arch reconstruction with a systemic-to-pulmonary shunt (modified Blalock–Taussig) or a right ventricle–to–pulmonary artery (Sano) conduit. Circulation is in parallel, so saturations of about 75–85% with a good lactate and adequate diastolic pressure indicate balance; higher saturations usually mean pulmonary overcirculation and systemic steal. Shunt patency is life-critical — sudden desaturation is a shunt problem until proven otherwise, and anticoagulation, adequate haematocrit and avoidance of hypovolaemia protect it. Coronary perfusion depends on diastolic pressure, so tachycardia and low diastolic pressure are dangerous <InlineRef topicId="paediatric-icu" refLabel="Feinstein HLHS 2012" />.</li>
                    <li><strong>Interstage period</strong>: the highest-mortality window. Any intercurrent illness, dehydration or arrhythmia can unbalance the parallel circulation, so admit early, resuscitate cautiously and involve the cardiac centre <InlineRef topicId="paediatric-icu" refLabel="Feinstein HLHS 2012" />.</li>
                    <li><strong>Stage 2 — bidirectional Glenn (3–6 months)</strong>: superior caval flow passes passively to the lungs. Pulmonary blood flow now depends on caval pressure and low pulmonary vascular resistance, so mild hypercapnia raises cerebral flow and therefore pulmonary flow; aggressive hyperventilation is counterproductive. Expect superior caval hypertension, headaches and chylothorax; watch for desaturation from collaterals or Glenn obstruction.</li>
                    <li><strong>Stage 3 — Fontan/total cavopulmonary connection</strong>: the entire systemic venous return flows passively through the lungs. Output depends on preload, low pulmonary vascular resistance, sinus rhythm and unobstructed pathways. Extubate early — spontaneous negative-pressure breathing augments pulmonary flow, while high mean airway pressure and PEEP reduce it. Treat effusions, arrhythmia (atrial arrhythmia is poorly tolerated), and consider a fenestration or pulmonary vasodilator when transpulmonary gradient is high <InlineRef topicId="paediatric-icu" refLabel="Rychik Fontan 2019" />.</li>
                    <li><strong>Failing Fontan</strong>: effusions, protein-losing enteropathy, plastic bronchitis, liver disease and thromboembolism. Anaesthesia and critical care require careful preload, sinus rhythm, low airway pressures and anticoagulation planning <InlineRef topicId="paediatric-icu" refLabel="Rychik Fontan 2019" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">General perioperative PICU priorities after cardiac surgery</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Handover the anatomy, residual lesions, bypass and cross-clamp times, lines (including transthoracic atrial or pulmonary artery lines), pacing wires and the surgeon's specific instructions before touching the patient <InlineRef topicId="paediatric-icu" refLabel="PCCS Standards 2021" />.</li>
                    <li>Single-ventricle/parallel circulation: target SpO₂ 75–85%; excessive oxygen produces pulmonary vasodilatation and systemic steal, managed with subambient FiO₂ or added CO₂. After Fontan completion pulmonary flow is passive and depends on low pulmonary vascular resistance, adequate preload and sinus rhythm <InlineRef topicId="paediatric-icu" refLabel="Fontan AHA 2019" />.</li>
                    <li>Low cardiac output syndrome peaks 6–18 h after bypass; prophylactic high-dose milrinone reduces its incidence (PRIMACORP: load 50 micrograms/kg over 60 min, then 0.25–0.75 micrograms/kg/min) <InlineRef topicId="paediatric-icu" refLabel="PRIMACORP 2003" />. <strong>Many UK units now omit the loading bolus</strong> and start maintenance infusion alone, because the load causes hypotension in neonates, in preload-dependent circulations (Glenn, Fontan) and immediately off bypass; if a load is given, give it slowly with volume and vasopressor to hand. Milrinone accumulates in renal impairment — halve the rate when creatinine clearance falls. Avoid hypothermia and treat tachyarrhythmia early.</li>
                    <li>Pulmonary hypertensive crisis: sedate and paralyse, FiO₂ 1.0, mild alkalosis (pH 7.45–7.50), inhaled nitric oxide 10–20 ppm and intravenous sildenafil, avoiding circuit disconnection <InlineRef topicId="paediatric-icu" refLabel="AHA/ATS PH 2015" />.</li>
                    <li>Recognise low cardiac output syndrome in the first 6–12 hours: rising lactate, narrowing pulse pressure, cool peripheries, falling urine output and widening arteriovenous oxygen difference. Treat with rate and rhythm control, milrinone, cautious volume, afterload reduction and correction of residual lesions on echocardiography.</li>
                    <li>Keep the chest drains patent and think of tamponade with any sudden deterioration; delayed sternal closure and readiness for chest reopening are part of routine care in the neonate.</li>
                    <li>Escalate early to mechanical support (ECMO) — post-cardiotomy arrest in a child with a repairable lesion is an indication, not a failure.</li>
                    <li>Pulmonary hypertensive crisis: sedate, oxygenate, correct acidosis, give inhaled nitric oxide, avoid alpha-agonist–driven pulmonary vasoconstriction, and preserve right ventricular coronary perfusion pressure.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Tracheobronchomalacia and malacic crises</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Airway malacia frequently coexists with congenital cardiac disease — from vascular
                    compression (double aortic arch, pulmonary artery sling, aberrant subclavian,
                    dilated pulmonary arteries in absent pulmonary valve syndrome, an enlarged left
                    atrium) and from long-term ventilation or airway surgery. It is a major reason a
                    postoperative cardiac child fails extubation <InlineRef topicId="paediatric-icu" refLabel="ERS Tracheomalacia 2019" />.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Recognition</strong>: expiratory stridor or a barking, brassy cough, wheeze unresponsive to bronchodilators, recurrent collapse of the same lobe, prolonged ventilation, and repeated failed extubation. Diagnosis is by flexible bronchoscopy in spontaneous respiration, supported by dynamic CT and echocardiography or angiography to define vascular compression <InlineRef topicId="paediatric-icu" refLabel="ERS Tracheomalacia 2019" />.</li>
                    <li><strong>Malacic crisis (a "dying spell")</strong>: an abrupt event, often triggered by crying, feeding, suctioning, coughing or agitation, in which the airway collapses — inspiratory effort against a closed segment produces sudden desaturation, hypercapnia, bradycardia, hyperextension and apnoea. Reflex bradycardia and cyanosis may look primarily cardiac.</li>
                    <li><strong>Immediate management</strong>: apply continuous positive pressure to splint the airway open (bag with PEEP, CPAP or high-flow), calm and sedate rather than stimulate, minimise suctioning, and treat bradycardia by restoring ventilation first. Prolonged bag-mask ventilation with PEEP is often more effective than escalating oxygen alone. Intubation may be required if the crisis does not resolve, using a tube long enough to stent beyond the malacic segment where possible.</li>
                    <li><strong>Ongoing care</strong>: higher PEEP to splint the airway during ventilation, avoid aggressive weaning of distending pressure, treat reflux and secretions, plan a slow extubation with non-invasive positive pressure, and consider tracheostomy with long-term positive pressure for severe disease. Definitive options include aortopexy, relief of vascular compression, slide tracheoplasty or airway stenting in selected children <InlineRef topicId="paediatric-icu" refLabel="ERS Tracheomalacia 2019" />.</li>
                    <li><strong>Cardiac interaction</strong>: in a Glenn or Fontan circulation the pressure needed to splint the airway also reduces pulmonary blood flow, so titrate to the lowest effective distending pressure and accept slower weaning rather than high mean airway pressures <InlineRef topicId="paediatric-icu" refLabel="Rychik Fontan 2019" />.</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="resus" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Resuscitation Key Numbers">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                    <th className="text-left py-2 text-foreground font-semibold">Infant (&lt;1 yr)</th>
                    <th className="text-left py-2 text-foreground font-semibold">Child</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Compression rate</td><td>100–120/min</td><td>100–120/min</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Depth</td><td>⅓ AP (~4 cm)</td><td>⅓ AP (~5 cm)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">C:V ratio</td><td>15:2</td><td>15:2</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Defibrillation</td><td>4 J/kg</td><td>4 J/kg</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Adrenaline</td><td>10 mcg/kg (0.1 ml/kg 1:10,000)</td><td>10 mcg/kg</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Amiodarone</td><td>5 mg/kg</td><td>5 mg/kg</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ Most paediatric arrests are respiratory — give 5 rescue breaths first <InlineRef topicId="paediatric-icu" refLabel="Resuscitation Council UK 2021" />.</p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-arrest" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Paediatric Cardiac Arrest Algorithms">
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Most paediatric arrests are the end point of hypoxia or hypovolaemia rather than a
                primary arrhythmia, so the algorithm is airway-and-breathing led. The weight-based
                numbers (WETFLAG), compression rate and depth are tabulated in the{" "}
                <a href="#resus" className="text-icu underline underline-offset-4">
                  Paediatric Intensive Care resuscitation numbers
                </a>{" "}
                — this section is the sequence itself <InlineRef topicId="paediatric-icu" refLabel="RCUK PALS 2021" />.
              </p>
              <div className="space-y-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Core paediatric advanced life support sequence</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Unresponsive and not breathing normally: call the resuscitation team, give <strong>5 initial rescue breaths</strong> with oxygen, then start CPR at <strong>15:2</strong> (compressions 100–120/min, depth one third of the chest) <InlineRef topicId="paediatric-icu" refLabel="RCUK PALS 2021" />.</li>
                    <li>Attach a defibrillator or monitor and obtain vascular access — intraosseous access immediately if intravenous access is not rapid.</li>
                    <li>Assess the rhythm and follow the shockable or non-shockable arm below, minimising interruptions to compressions (rhythm checks every 2 minutes).</li>
                    <li>Once the airway is secured, ventilate continuously without pausing compressions, target normal oxygenation rather than 100% oxygen after return of circulation, and use waveform capnography to confirm tube position and monitor CPR quality.</li>
                    <li>Search for and treat the reversible causes throughout, and consider extracorporeal CPR early in a witnessed in-hospital arrest with a reversible cause, particularly after cardiac surgery.</li>
                  </ol>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Non-shockable (asystole, PEA, bradycardia &lt;60/min with poor perfusion)</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Give <strong>adrenaline 10 micrograms/kg IV/IO</strong> as soon as access is available, then every 3–5 minutes (every other cycle) <InlineRef topicId="paediatric-icu" refLabel="RCUK PALS 2021" />.</li>
                      <li>Continue CPR 15:2, oxygenate and ventilate well — hypoxia is the commonest cause.</li>
                      <li>Give a fluid bolus if hypovolaemia or sepsis is likely, and treat hyperkalaemia, hypoglycaemia and hypothermia actively.</li>
                      <li>A profound bradycardia with poor perfusion is managed as an arrest: ventilate, then adrenaline; pace only for block or a post-surgical cause <InlineRef topicId="paediatric-icu" refLabel="APLS 2021" />.</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Shockable (VF, pulseless VT)</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Defibrillate at <strong>4 J/kg</strong> and resume compressions immediately, reassessing every 2 minutes <InlineRef topicId="paediatric-icu" refLabel="RCUK PALS 2021" />.</li>
                      <li>After the <strong>third</strong> shock give adrenaline 10 micrograms/kg and amiodarone 5 mg/kg; repeat both after the <strong>fifth</strong> shock, with adrenaline then continuing every 3–5 minutes.</li>
                      <li>Use paediatric pads or an attenuator under 8 years where available; adult pads are acceptable if that is all that is available.</li>
                      <li>Think of a channelopathy, myocarditis, poisoning, electrolyte abnormality or an underlying repaired congenital lesion in an unexpected shockable arrest.</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Reversible causes in children</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>4 Hs:</strong> hypoxia (the leading cause), hypovolaemia (sepsis, trauma, gastroenteritis), hypo/hyperkalaemia and other metabolic causes including hypoglycaemia and inborn errors, hypothermia (drowning, neonates — continue resuscitation while rewarming).</li>
                    <li><strong>4 Ts:</strong> tension pneumothorax, tamponade (post-cardiac surgery, malignancy), toxins (including local anaesthetic systemic toxicity, tricyclics and beta-blockers), thromboembolism.</li>
                    <li>Add the paediatric specifics: duct closure in the neonate (start prostaglandin E1), raised intracranial pressure, anaphylaxis, an obstructed tracheostomy or endotracheal tube, and a blocked or unbalanced surgical shunt.</li>
                  </ul>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Newborn at delivery — a different algorithm</h3>
                    <p className="text-sm text-muted-foreground">
                      Newborn life support is airway-first with <strong>5 inflation breaths</strong> in air
                      (term) and a compression-to-ventilation ratio of <strong>3:1</strong>, reflecting an
                      asphyxial cause; delayed cord clamping, thermal care and oxygen saturation targets
                      that rise over the first ten minutes are integral. Adrenaline and volume are late
                      steps once ventilation is confirmed to be effective <InlineRef topicId="paediatric-icu" refLabel="RCUK NLS 2021" />.
                    </p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Post-ROSC care</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Titrate oxygen to normal saturations and ventilate to normocapnia, avoiding both hypocapnia and hyperoxia <InlineRef topicId="paediatric-icu" refLabel="RCUK Post-Resus 2021" />.</li>
                      <li>Support the circulation with fluid and vasoactive infusions to an age-appropriate blood pressure; myocardial dysfunction is expected.</li>
                      <li>Avoid fever, treat seizures, maintain normoglycaemia and normal electrolytes, and provide analgesia and sedation.</li>
                      <li>Investigate the cause (echocardiography, ECG, imaging, metabolic and toxicology screen, safeguarding review), and involve the retrieval service and family early <InlineRef topicId="paediatric-icu" refLabel="PCCS Standards 2021" />.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-arrhythmias" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Paediatric Arrhythmias">
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Arrhythmia in a child is usually secondary — hypoxia, hypovolaemia, electrolyte
                disturbance, drug toxicity, a central line tip in the atrium, or congenital heart
                disease and its surgery. Correct the cause while treating the rhythm{" "}
                <InlineRef topicId="paediatric-icu" refLabel="RCUK PALS 2021" />.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground font-semibold">Rhythm</th>
                      <th className="text-left py-2 text-foreground font-semibold">Recognition</th>
                      <th className="text-left py-2 text-foreground font-semibold">Management</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Bradycardia with poor perfusion</td>
                      <td>Heart rate &lt;60/min in an infant or child with poor perfusion; almost always hypoxic or vagal</td>
                      <td><InlineRef topicId="paediatric-icu" refLabel="RCUK PALS 2021" /> Oxygen and effective ventilation first; if unresponsive start CPR, then adrenaline 10 micrograms/kg IV/IO repeated every 3–5 min; atropine 20 micrograms/kg (minimum 100 micrograms) for vagal cause or AV block; consider pacing for congenital or post-surgical block</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Supraventricular tachycardia</td>
                      <td>Narrow complex, regular, no beat-to-beat variability, rate typically &gt;220 in infants and &gt;180 in children, absent or abnormal P waves</td>
                      <td><InlineRef topicId="paediatric-icu" refLabel="RCUK PALS 2021" /> Stable: vagal manoeuvres (ice to the face in infants, Valsalva in older children), then adenosine 100 micrograms/kg rapid push with flush, escalating to 200 then 300 micrograms/kg (adult maximum 12 mg per dose). Unstable: synchronised cardioversion 1 J/kg then 2 J/kg with sedation. Amiodarone or procainamide only with cardiology advice</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Wide-complex tachycardia with a pulse</td>
                      <td>Rare in children; assume ventricular tachycardia. Look for long QT, myocarditis, electrolyte abnormality, tricyclic or other toxicity, or repaired congenital disease</td>
                      <td><InlineRef topicId="paediatric-icu" refLabel="RCUK PALS 2021" /> Unstable: synchronised cardioversion 1 J/kg then 2 J/kg. Stable: amiodarone 5 mg/kg over 20–60 min (or procainamide) with cardiology; magnesium sulfate for torsade de pointes; correct potassium and magnesium</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">VF / pulseless VT</td>
                      <td>Shockable arrest rhythm — more likely with cardiac disease, hypothermia, poisoning or channelopathy than in the typical hypoxic paediatric arrest</td>
                      <td><InlineRef topicId="paediatric-icu" refLabel="RCUK PALS 2021" /> Unsynchronised defibrillation 4 J/kg, CPR 15:2, adrenaline 10 micrograms/kg and amiodarone 5 mg/kg after the third shock (repeat amiodarone once after the fifth), searching the reversible causes</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Junctional ectopic tachycardia</td>
                      <td>Postoperative congenital cardiac surgery: narrow complex, AV dissociation, poor output</td>
                      <td>Cool, deepen sedation, reduce catecholamines, correct magnesium, amiodarone and pacing strategies with the cardiac team</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-foreground">Channelopathy presentations</td>
                      <td>Sudden collapse, exercise or startle-triggered syncope, seizures labelled epilepsy, family history of sudden death; long QT, catecholaminergic polymorphic VT, Brugada</td>
                      <td>Measure QTc (Bazett) on a clean 12-lead ECG: <strong>prolonged &gt;460 ms in children and adolescents (&gt;450 ms in adolescent males, and up to 470 ms may be normal in the first week of life)</strong>, with &gt;500 ms high risk. Avoid QT-prolonging drugs (ondansetron, macrolides, haloperidol, amiodarone), keep potassium &gt;4.0 and magnesium &gt;0.8 mmol/L, magnesium 25–50 mg/kg for torsade, beta-blockade and specialist inherited-cardiac-conditions referral; screen first-degree relatives</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 rounded-lg border border-border bg-secondary/30">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Neonatal modifiers.</strong> Rates above 250
                  are common in neonatal SVT, adenosine is still first-line for the stable infant,
                  and hydrops or heart failure may already be present from a fetal arrhythmia.
                  Umbilical venous or intraosseous access is acceptable for adenosine if it is
                  proximal and can be flushed rapidly. Compression rate, energy and drug doses for
                  arrest are summarised in the{" "}
                  <a href="#resus" className="text-icu underline underline-offset-4">
                    resuscitation key numbers table
                  </a>
                  .
                </p>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="neurocrit" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Paediatric Neurocritical Care">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Condition</th>
                    <th className="text-left py-2 text-foreground font-semibold">Key Points</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">TBI</td><td>CPP age-dependent (40–50 infant, 50–60 child). Treat ICP &gt;20. Hypertonic saline preferred over mannitol. Earlier decompression <InlineRef topicId="paediatric-icu" refLabel="Paediatric TBI 2019" /></td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Status Epilepticus</td><td>Lorazepam 0.1 mg/kg ×2 → levetiracetam, phenytoin or valproate → RSI/thiopentone. Check glucose <InlineRef topicId="paediatric-icu" refLabel="NICE NG217" /></td></tr>
                  <tr><td className="py-2 font-medium text-foreground">DKA</td><td>Cerebral oedema risk highest in children — 10 mL/kg bolus only if shocked, then deficit over 48 h. <strong>Insulin only 1–2 h after fluids start</strong>, 0.05–0.1 units/kg/h. <strong>Potassium 40 mmol/L in every rehydration bag</strong> unless anuric — total body potassium is always depleted and insulin drives it intracellularly. Hourly GCS, neuro-obs and fluid balance <InlineRef topicId="paediatric-icu" refLabel="BSPED DKA 2021" /> <InlineRef topicId="paediatric-icu" refLabel="ISPAD DKA 2022" /></td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Abusive head trauma and the wider safeguarding response are covered in{" "}
              <a href="#section-nai" className="text-icu underline underline-offset-4">Non-Accidental Injury</a>, and childhood stroke in{" "}
              <a href="#section-stroke" className="text-icu underline underline-offset-4">Paediatric Stroke</a>.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-trauma" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Major Trauma & Traumatic Brain Injury">
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Children have a compliant skeleton over relatively large organs, so serious internal
                injury occurs without fractures; a smaller circulating volume (about 80 mL/kg in
                infants, 70 mL/kg in children) means compensated shock is maintained until roughly a
                third of the volume is lost and then decompensates abruptly. Head injury dominates
                mortality <InlineRef topicId="paediatric-icu" refLabel="NICE NG39" />.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Resuscitation and haemorrhage control</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Fluid</strong>: 5 mL/kg boluses of blood in preference to crystalloid in haemorrhagic shock, targeting a palpable central pulse and normal mentation rather than a normal blood pressure; avoid large crystalloid volumes <InlineRef topicId="paediatric-icu" refLabel="NICE NG39" />.</li>
                    <li><strong>Weight-based major haemorrhage protocol</strong>: packed red cells 5–10 mL/kg with plasma 5–10 mL/kg in a 1:1 ratio, platelets 5–10 mL/kg and cryoprecipitate 5 mL/kg guided by viscoelastic testing where available; keep fibrinogen &gt;1.5 g/L and ionised calcium &gt;1.0 mmol/L <InlineRef topicId="paediatric-icu" refLabel="NCEPOD Trauma Paeds" />.</li>
                    <li><strong>Tranexamic acid</strong> 15 mg/kg (maximum 1 g) over 10 min within 3 h of injury, then 2 mg/kg/h for 8 h.</li>
                    <li><strong>Avoid the lethal triad</strong>: active warming from the outset (children cool fast — large surface area, wet exposure), permissive hypotension is <em>not</em> used when there is a head injury, and hypocalcaemia is common after rapid transfusion.</li>
                    <li><strong>Whole-body CT is not routine</strong> in children — image selectively to limit radiation, using ultrasound and focused CT guided by mechanism and examination.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Traumatic brain injury and the cervical spine</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Targets</strong>: ICP &lt;20 mmHg, and an age-banded cerebral perfusion pressure of about <strong>40–50 mmHg in infants, 50–60 in children and 60–70 in adolescents</strong>; treat hypotension aggressively because a single episode worsens outcome <InlineRef topicId="paediatric-icu" refLabel="Paediatric TBI 2019" />.</li>
                    <li><strong>Tier 1</strong>: head up 30°, midline neck with no obstruction to venous drainage (loosen collars), sedation and analgesia, normocapnia (PaCO₂ 4.5–5.0 kPa), normoxia, temperature 36–37.5°C, seizure treatment and prophylaxis in the first 7 days, sodium 145–155 mmol/L. <strong>Hypertonic saline (3% infusion, or 2.7–3% boluses 3–5 mL/kg) is preferred to mannitol</strong> in children.</li>
                    <li><strong>Tier 2</strong>: neuromuscular blockade, higher hypertonic saline targets, brief moderate hyperventilation for herniation only, barbiturate infusion with EEG, external ventricular drainage and <strong>early decompressive craniectomy</strong>, which is used sooner than in adults, particularly in diffuse swelling.</li>
                    <li><strong>Avoid</strong>: steroids (no benefit, harm signal), prophylactic hypothermia (no outcome benefit and rebound risk on rewarming), and hypotonic maintenance fluid.</li>
                    <li><strong>Cervical spine</strong>: paediatric injuries are higher (C1–C3 in the under-8s), SCIWORA occurs, and infants need occipital recess or a thoracic elevation to avoid neck flexion in a collar. Clear the spine with a paediatric-adapted decision rule and imaging rather than adult rules, and remove collars early to reduce agitation and venous obstruction.</li>
                    <li><strong>Always consider inflicted injury</strong> in an infant with a head injury and an inconsistent or absent history — see <a href="#section-nai" className="text-icu underline underline-offset-4">Non-Accidental Injury</a>.</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-stroke" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Paediatric Stroke">
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Childhood stroke is rare but frequently delayed in diagnosis, often being attributed
                to migraine, seizure, encephalitis or a functional presentation. Around half of
                cases are haemorrhagic, and the risk factors are quite different from adults:
                congenital and acquired heart disease, sickle cell disease, arteriopathy (including
                post-varicella and focal cerebral arteriopathy), arteriovenous malformation,
                infection, prothrombotic disorders, trauma with dissection, and cardiac
                catheterisation or extracorporeal support{" "}
                <InlineRef topicId="paediatric-icu" refLabel="RCPCH Stroke 2017" />{" "}
                <InlineRef topicId="paediatric-icu" refLabel="AHA Paediatric Stroke 2019" />.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Presentation</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Neonates:</strong> seizures (often focal) in the first days of life with few other signs; hemiparesis may only become apparent months later.</li>
                    <li><strong>Infants and children:</strong> acute hemiparesis, facial weakness, dysarthria or aphasia, visual loss, ataxia, and — more often than in adults — seizures, headache, vomiting and altered consciousness.</li>
                    <li><strong>Posterior circulation:</strong> ataxia, vertigo, cranial nerve palsies and neck pain after trauma suggest vertebral dissection.</li>
                    <li><strong>Mimics:</strong> migraine with aura, focal seizure with Todd's paresis, encephalitis, tumour, demyelination, hypoglycaemia, metabolic stroke-like episodes (MELAS) and alternating hemiplegia.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Immediate management</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Urgent imaging</strong> — MRI with diffusion and vessel imaging is preferred and distinguishes infarct, haemorrhage and mimics; use CT with angiography where MRI would delay treatment or when haemorrhage must be excluded immediately. Anaesthesia for imaging should be planned, not improvised.</li>
                    <li><strong>Physiological neuroprotection</strong> — normoxia, normocapnia, euglycaemia, normothermia, avoid hypotension (a modest permissive hypertension is preferred to blood-pressure lowering), head-up positioning, and aggressive seizure treatment.</li>
                    <li><strong>Antithrombotic therapy</strong> — aspirin for confirmed arterial ischaemic stroke once haemorrhage is excluded, with anticoagulation for dissection, cardioembolic source or cerebral venous sinus thrombosis on specialist advice.</li>
                    <li><strong>Sickle cell disease</strong> — urgent exchange transfusion to reduce HbS below about 30% with attention to haematocrit; simple transfusion alone is inadequate, and this is the single most time-critical paediatric stroke intervention.</li>
                    <li><strong>Reperfusion</strong> — thrombolysis is not routine in children outside specialist protocols; mechanical thrombectomy is offered in selected older children with large-vessel occlusion at neurointervention centres, so discuss every case urgently.</li>
                    <li><strong>Haemorrhagic stroke</strong> — reverse coagulopathy, control blood pressure and pain, neurosurgical review for evacuation or external ventricular drainage, and vascular imaging for an underlying malformation.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-lg border border-border bg-secondary/30">
                <p className="text-sm text-muted-foreground">
                  Intracranial pressure control, osmotherapy and decompression thresholds follow the
                  paediatric neurocritical care principles set out in the{" "}
                  <a href="#neurocrit" className="text-icu underline underline-offset-4">
                    Paediatric Intensive Care topic
                  </a>
                  ; malignant middle cerebral artery infarction in a child is an indication for early
                  neurosurgical discussion because the cranium tolerates swelling poorly once the
                  fontanelles have closed.
                </p>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="airway" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Airway & Ventilation in PICU">
            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">ETT Sizing</p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Uncuffed:</strong> Age/4 + 4 (ID mm). <strong>Cuffed:</strong> Age/4 + 3.5. <strong>Depth (oral):</strong> Age/2 + 12 cm. Neonates: 3.0–3.5 mm. Cuffed tubes are appropriate from the neonatal period provided cuff pressure is monitored <InlineRef topicId="paediatric-icu" refLabel="Litman 2013" />.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Lung-Protective Ventilation</p>
                <p className="text-sm text-muted-foreground mt-1">Vt <strong>5–8 mL/kg predicted body weight</strong> (4–6 mL/kg where compliance is poor), plateau <strong>≤28 cmH₂O</strong> (28–32 acceptable with stiff chest wall), driving pressure kept as low as achievable, age-appropriate rate, and <strong>PEEP 5–8 cmH₂O in healthy lungs but titrated 8–15 cmH₂O in moderate/severe PARDS</strong> against oxygenation, compliance and haemodynamics. Permissive hypercapnia to <strong>pH ≥7.20</strong> is accepted in PARDS (a higher pH target is used when intracranial or pulmonary hypertension is present). HFOV is a rescue rather than a first-line mode and is considered earlier than in adults, without evidence of a mortality benefit <InlineRef topicId="paediatric-icu" refLabel="PARDS Global 2023" />.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Non-Invasive Support</p>
                <p className="text-sm text-muted-foreground mt-1">CPAP/BiPAP is increasingly used first-line for moderate respiratory failure, and CPAP is recommended for impending respiratory failure in bronchiolitis <InlineRef topicId="paediatric-icu" refLabel="NICE NG9" />. <strong>HFNC (1–2 L/kg/min) is widely used but its role is now genuinely contested</strong>: a major 2024 Lancet review of severe RSV infection concluded that the evidence for HFNC is insufficient and that rising PICU admission and intubation rates argue for removing it from standard care <InlineRef topicId="paediatric-icu" refLabel="RSV Lancet 2024" />. Treat HFNC as a comfort/escalation bridge rather than an established therapy, escalate early to CPAP if work of breathing does not improve, and be ready to discuss the HFNC-versus-CPAP debate as an evolving area in the viva.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Paediatric ARDS (PARDS)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  The Global Definition of PARDS <InlineRef topicId="paediatric-icu" refLabel="PARDS Global 2023" /> requires onset within 7 days of a known insult, new infiltrate(s) on imaging not fully explained by cardiac failure or fluid overload, and hypoxaemia quantified by <strong>OI</strong> or <strong>OSI</strong> in intubated patients, or by <strong>SpO₂/FiO₂ ≤250</strong> on CPAP/NIV ≥5 cmH₂O for non-invasive disease. <strong>OI = (FiO₂ × mean airway pressure × 100) / PaO₂</strong>.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ventilation targets: Vt 5–8 mL/kg PBW, plateau ≤28 cmH₂O, permissive hypercapnia (pH ≥7.20), PEEP titrated 8–15 cmH₂O. Adjuncts: prone positioning for moderate/severe disease (OI ≥12), neuromuscular blockade, recruitment manoeuvres, conservative fluid strategy, and ECMO for refractory hypoxaemia.
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-resp-emergencies" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Bronchiolitis, Upper Airway Obstruction & Extubation Failure">
              <div className="space-y-3 mt-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Bronchiolitis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Supportive care is the treatment</strong>: nasal suction and saline drops (infants are obligate nasal breathers), minimal handling, upright positioning, and nasogastric feeding or maintenance isotonic fluid at 2/3 volume because of SIADH and aspiration risk. Bronchodilators, nebulised hypertonic saline, corticosteroids, antibiotics and chest physiotherapy have no routine role <InlineRef topicId="paediatric-icu" refLabel="NICE NG9" />.</li>
                    <li><strong>Escalate</strong> for recurrent apnoea, exhaustion, rising CO₂ with acidosis, or persistent SpO₂ &lt;90–92% on oxygen: CPAP 6–8 cmH₂O is the supported non-invasive step, with HFNC used as a comfort bridge only <InlineRef topicId="paediatric-icu" refLabel="RSV Lancet 2024" />.</li>
                    <li><strong>Apnoea risk</strong> is highest in infants under 6 weeks, ex-preterm infants, and those with chronic lung disease, congenital heart disease, neuromuscular disease or immunodeficiency — these babies need monitored beds even when they look well.</li>
                    <li><strong>Intubated bronchiolitis</strong> behaves like obstructive lung disease: long expiratory time, low rate, permissive hypercapnia, moderate PEEP for air-trapping, and watch for co-infection, pneumothorax and mucus plugging; consider PARDS management if infiltrates and hypoxaemia dominate.</li>
                    <li><strong>Prevention</strong>: the RSV monoclonal antibodies — palivizumab monthly through the season for high-risk infants and the newer long-acting nirsevimab for broader infant immunisation — plus maternal RSV vaccination, are changing PICU admission patterns.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Croup, epiglottitis, bacterial tracheitis and inhaled foreign body</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Croup</strong>: barking cough with inspiratory stridor. Give <strong>dexamethasone 150 micrograms/kg orally</strong> (or budesonide 2 mg nebulised) and, for severe stridor at rest, <strong>nebulised adrenaline 0.4–0.5 mL/kg of 1:1000 (maximum 5 mL)</strong>, which works within minutes and wears off in 2 h — so observe for rebound. Keep the child calm on a parent&rsquo;s lap; distress worsens obstruction.</li>
                    <li><strong>Do not examine the throat or lie flat</strong> a child with suspected epiglottitis or bacterial tracheitis (toxic, high fever, rapid progression, drooling): the airway is secured in theatre by the most senior anaesthetist with ENT present, using inhalational induction with spontaneous ventilation, a tube a size or two smaller, and a plan for rigid bronchoscopy or surgical airway.</li>
                    <li><strong>Inhaled foreign body</strong>: sudden choking with unilateral wheeze or reduced air entry; avoid positive pressure where possible and go to rigid bronchoscopy with a shared airway plan.</li>
                    <li><strong>Blocked tracheostomy or tube</strong> is a paediatric arrest cause: suction, remove the inner cannula, deflate the cuff, attempt catheter passage, and if in doubt remove and replace the tube (a size smaller or oral intubation), following the National Tracheostomy Safety Project emergency algorithms with bedside signs and equipment.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Paediatric RSI and extubation readiness</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Why children desaturate in seconds</strong>: functional residual capacity is low relative to a two-to-three-times-higher oxygen consumption, so pre-oxygenate deliberately, keep nasal high-flow or nasal oxygen running through the apnoeic period, and consider gentle ventilation during apnoea rather than accepting desaturation. Use a videolaryngoscope, a straight-blade option in infants, and a cuffed tube with cuff pressure kept <strong>below 20–25 cmH₂O</strong> and checked each shift.</li>
                    <li><strong>Physiologically difficult intubation</strong> is the norm in PICU: optimise volume status and start vasoactive support before induction, use ketamine or a reduced propofol dose, atropine for infants at risk of bradycardia, and plan for post-intubation hypotension.</li>
                    <li><strong>Extubation readiness</strong>: resolving disease, minimal sedation with an awake and interactive child, adequate cough and secretion clearance, FiO₂ ≤0.4 with PEEP ≤5 cmH₂O, an audible <strong>cuff-leak</strong>, tolerating a short spontaneous breathing trial on pressure support 8–10 cmH₂O, and no imminent trip to theatre. Failure rates are 10–20%, and repeated failure suggests malacia, subglottic stenosis, vocal cord dysfunction, cardiac disease, neuromuscular weakness or under-treated delirium and withdrawal.</li>
                    <li><strong>Post-extubation stridor</strong>: dexamethasone 0.25–0.5 mg/kg (a dose before extubation in high-risk children), nebulised adrenaline, heliox in selected cases, and non-invasive positive pressure. Consider a pre-extubation air-leak assessment and ENT review for airway examination in recurrent failure; plan a high-risk extubation in daylight hours with senior airway support present.</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-ecmo" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="ECMO & Extracorporeal Support">
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Extracorporeal support buys time for a reversible process or a definitive
                intervention. Paediatric survival is roughly 60–70% for neonatal and paediatric
                respiratory support and 40–50% for cardiac support, with lower survival after
                extracorporeal CPR — so the referral conversation happens early, while the child can
                still be moved safely <InlineRef topicId="paediatric-icu" refLabel="ELSO Paediatric 2023" />.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Mode and indications</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>VV ECMO</strong> — respiratory failure with adequate cardiac function: severe PARDS with an oxygenation index persistently above about 40 (or above 20–25 with a rising trajectory), refractory hypercapnic acidosis, severe air leak, status asthmaticus, pertussis, aspiration and pulmonary haemorrhage. Cannulation is dual-lumen jugular in small children or femoral–jugular in larger ones.</li>
                    <li><strong>VA ECMO</strong> — circulatory failure: post-cardiotomy low cardiac output, fulminant myocarditis, refractory arrhythmia, bridge to transplant or ventricular assist device, severe septic shock unresponsive to maximal therapy (still recommended in children, unlike adults), and pulmonary hypertensive crisis.</li>
                    <li><strong>ECPR</strong> — witnessed, in-hospital arrest with high-quality CPR and a reversible cause, particularly after cardiac surgery; teams aim for cannulation within about 60 min of arrest.</li>
                    <li><strong>Neonatal specifics</strong>: usually needs ≥34 weeks gestation and ≥1.8–2 kg, with congenital diaphragmatic hernia, meconium aspiration and persistent pulmonary hypertension the classic indications.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Contraindications and daily management</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Relative contraindications</strong>: irreversible disease with no exit strategy, severe pre-existing neurological injury, uncontrolled bleeding or recent significant intracranial haemorrhage, extreme prematurity or very low weight, and multi-organ failure with a lethal underlying condition.</li>
                    <li><strong>Lung rest</strong> once on support: low pressures and rate, PEEP maintained to prevent collapse, and a decisive reduction in FiO₂; sedation is reduced and neuromuscular blockade stopped when circuit-safe.</li>
                    <li><strong>Anticoagulation</strong> — unfractionated heparin titrated to a unit protocol (activated clotting time, anti-Xa or APTT ratio) with bivalirudin as an alternative; balance circuit thrombosis against bleeding, and transfuse platelets and fibrinogen to protocol thresholds.</li>
                    <li><strong>Complications</strong>: intracranial haemorrhage and infarction (screen with cranial ultrasound and near-infrared spectroscopy), cannula site and surgical bleeding, haemolysis, acute kidney injury and fluid overload (CRRT is often added into the circuit), limb ischaemia in femoral cannulation, oxygenator failure and infection.</li>
                    <li><strong>North–south syndrome</strong> in VA support: poorly oxygenated native output perfuses the upper body — monitor right radial saturations and cerebral oximetry. In VV support, recirculation and inadequate flow are the usual reasons for persistent hypoxaemia.</li>
                    <li><strong>Weaning and decision-making</strong>: daily multidisciplinary review with echocardiography, an agreed number of days before a &ldquo;time-limited trial&rdquo; conversation, and honest, early discussion with parents about the exit strategy.</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-neonatal-surgical" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Neonatal Surgical Emergencies">
              <div className="space-y-3 mt-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Congenital diaphragmatic hernia</h3>
                  <p className="text-sm text-muted-foreground">
                    A hypoplastic lung with pulmonary hypertension, not simply a hole to close.
                    Intubate early without prolonged bag-mask ventilation (which distends the
                    intrathoracic bowel), pass a wide nasogastric tube on free drainage, and use{" "}
                    <strong>gentle ventilation</strong> — peak pressure kept below about 25 cmH₂O,
                    permissive hypercapnia, preductal SpO₂ target 80–95%, and high-frequency
                    oscillation as rescue rather than routine. Treat pulmonary hypertension with
                    inhaled nitric oxide, avoid hypoxia, acidosis and pain, support the systemic
                    circulation (milrinone, noradrenaline, hydrocortisone for adrenal insufficiency),
                    and repair once physiology is stable rather than urgently; ECMO is offered in
                    selected infants at specialist centres{" "}
                    <InlineRef topicId="paediatric-icu" refLabel="CDH EURO 2024" />.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Necrotising enterocolitis</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Preterm infant with feed intolerance, bilious aspirates, abdominal distension and discolouration, bloody stool, thrombocytopenia, acidosis and shock; pneumatosis intestinalis or portal venous gas on radiograph, free air with perforation.</li>
                      <li>Stop feeds, decompress the stomach, broad-spectrum antibiotics with anaerobic cover, generous fluid and blood product support, parenteral nutrition through central access, and an early surgical opinion for laparotomy or primary peritoneal drain.</li>
                      <li>Ventilate for abdominal splinting and metabolic acidosis, expect marked third-space losses, and watch for abdominal compartment syndrome, stoma losses and later short-bowel syndrome and cholestasis.</li>
                    </ul>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Gastroschisis, exomphalos, atresias and TOF</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li><strong>Abdominal wall defects</strong>: enormous evaporative and heat losses — wrap the bowel in cling film, nurse in a warm humidified environment, give 2–3 times maintenance fluid initially, decompress the stomach, and support the circulation after silo reduction or closure while watching intra-abdominal pressure, ventilation and renal perfusion. Exomphalos is associated with cardiac, chromosomal and Beckwith–Wiedemann anomalies (check glucose).</li>
                      <li><strong>Oesophageal atresia with tracheo-oesophageal fistula</strong>: frothing, choking, an arrested nasogastric tube and a gas-filled stomach. Avoid high-pressure ventilation before fistula ligation (gastric distension worsens ventilation), keep the tube tip above the fistula, and look for the VACTERL associations including duct-dependent cardiac lesions.</li>
                      <li><strong>Malrotation with volvulus</strong> is the surgical emergency behind any bilious vomiting in a neonate — urgent upper gastrointestinal contrast study or laparotomy, because delay costs the midgut.</li>
                      <li><strong>All of these babies</strong> need glucose infusion, vitamin K, thermal care, cross-matched blood availability, careful analgesia, and a discussion with the surgical and neonatal teams about timing rather than a race to theatre.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="sedation" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Sedation, Analgesia & Withdrawal">
            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Goals & Assessment</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Sedation aims to relieve distress and facilitate ventilation/procedures while minimising drug accumulation, delirium and withdrawal. Clinical impression alone is unreliable in a paralysed, pre-verbal or developmentally delayed child, so <strong>validated tools must be scored regularly</strong> — at least once per nursing shift and after every change of infusion rate — with the score charted against an explicitly documented target <InlineRef topicId="paediatric-icu" refLabel="ESPNIC Sedation 2016" />:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                  <li><strong>Pain</strong> — <strong>FLACC</strong> (Face, Legs, Activity, Cry, Consolability; 0–10) in pre-verbal children, with FLACC-revised for cognitive impairment; self-report (faces or numerical scale) whenever the child is able.</li>
                  <li><strong>Sedation depth</strong> — <strong>COMFORT-B</strong> (behavioural, 6–30; target 11–17 for adequate sedation), or SBS/State Behavioural Scale; processed EEG has no established routine paediatric role.</li>
                  <li><strong>Withdrawal</strong> — <strong>WAT-1</strong> (Withdrawal Assessment Tool-1; score ≥ 3 suggests iatrogenic withdrawal) or <strong>SOS</strong>, scored at least 12-hourly once opioid/benzodiazepine exposure exceeds about 5 days or during any wean.</li>
                  <li><strong>Delirium</strong> — <strong>CAPD</strong> (Cornell Assessment of Pediatric Delirium; ≥ 9 positive, valid from birth including developmental delay) or <strong>pCAM-ICU</strong> / psCAM-ICU in older and pre-school children. Delirium is common, under-recognised, and independently associated with longer ventilation and stay.</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Scoring exists to avoid both extremes. <strong>Over-sedation</strong> causes drug accumulation, prolonged ventilation and ICU stay, delirium, iatrogenic withdrawal, immobility and pressure injury, ileus and haemodynamic depression, plus concern over anaesthetic neurotoxicity in the developing brain. <strong>Under-sedation</strong> causes pain and distress, agitation, dyssynchrony and raised ICP or pulmonary vascular resistance, and accidental removal of the tracheal tube, lines and drains. Use analgesia-first sedation, set a daily target, and wean deliberately with a written plan rather than by drift <InlineRef topicId="paediatric-icu" refLabel="ESPNIC Sedation 2016" />.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Pharmacology</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Morphine</strong> (10–40 mcg/kg/h): histamine release can cause flushing/hypotension and bronchospasm. <strong>Fentanyl</strong>: rapid tachyphylaxis and chest-wall rigidity with rapid high-dose boluses. <strong>Midazolam</strong> (1–4 mcg/kg/min): accumulates in renal/hepatic impairment and raises delirium risk. <strong>Dexmedetomidine</strong> (0.2–1.4 mcg/kg/h): no significant respiratory depression but causes dose-dependent bradycardia and hypotension. <strong>Clonidine</strong> is a useful oral/enteral adjunct for sedation weaning and withdrawal.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
                <p className="text-sm font-semibold text-destructive">⚠ Propofol Infusion Syndrome (PRIS)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Propofol is contraindicated by its UK product licence for sedation of ventilated patients aged 16 years or younger</strong>, so it is not a PICU sedation agent at all: use it for induction, short procedures and imaging, and choose opioid/benzodiazepine or dexmedetomidine-based regimens for continuing sedation <InlineRef topicId="paediatric-icu" refLabel="MHRA Propofol" />. Where prolonged infusion is unavoidable (rare, senior decision, e.g. status epilepticus bridging), the syndrome to watch for is metabolic (lactic) acidosis, rhabdomyolysis with rising creatine kinase, cardiac failure, bradyarrhythmia and acute kidney injury; risk rises with doses &gt;4 mg/kg/h, duration &gt;48 h, concurrent catecholamines or corticosteroids, critical illness and young age. Monitor lactate, pH, creatine kinase and triglycerides daily and stop the infusion at the first unexplained acidosis.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Iatrogenic Withdrawal Syndrome (IWS)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  A recognisable cluster of CNS, GI and autonomic symptoms following abrupt cessation of opioids/benzodiazepines, with risk rising after &gt;5 days of therapy <InlineRef topicId="paediatric-icu" refLabel="ESPNIC Sedation 2016" />.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                  <li><strong>Score before you wean</strong> — WAT-1 at least 12-hourly; a score ≥ 3 (and certainly &gt; 4) indicates withdrawal needing treatment rather than further weaning, so hold the wean and give a rescue dose.</li>
                  <li><strong>Rate</strong> — reduce the total daily opioid and benzodiazepine dose by <strong>10–20 % every 12–24 h</strong>, guided by the score; exposure &gt; 2–3 weeks usually needs a slower 5–10 % per day taper.</li>
                  <li><strong>Route conversion</strong> — once the gut works, convert to enteral equivalents (oral morphine or methadone, oral lorazepam or diazepam) and continue the taper at home or on the ward.</li>
                  <li><strong>Adjuncts</strong> — clonidine or dexmedetomidine reduce withdrawal scores and opioid/benzodiazepine requirement; watch for bradycardia and rebound hypertension on stopping clonidine abruptly.</li>
                  <li><strong>Wean one class at a time</strong> where possible, keep the plan written and dated, and screen for delirium in parallel — agitation is often delirium rather than withdrawal.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Delirium</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Acute brain dysfunction with fluctuating awareness and cognition; the <strong>hypoactive form is common and frequently missed</strong>. Screen routinely with the <strong>CAPD</strong> or <strong>(ps)CAM-ICU</strong> tools <InlineRef topicId="paediatric-icu" refLabel="ESPNIC Sedation 2016" />. Risk factors include young age, developmental delay, severity of illness, benzodiazepine and anticholinergic exposure, and mechanical ventilation. Manage with a non-pharmacological bundle — reorientation, sleep hygiene, day-night lighting cues, family presence and early mobilisation — reserving cautious quetiapine or risperidone (with QTc monitoring) for refractory cases.
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="fluids" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Fluids, Electrolytes & Nutrition">
            <p className="text-muted-foreground text-sm mb-3">
              Fluid prescribing in children is a recognised cause of avoidable death — from hyponatraemic
              encephalopathy with hypotonic fluid, and from unrecognised hypovolaemia. Prescribe{" "}
              <strong>resuscitation, deficit, maintenance and replacement of ongoing losses separately</strong>,
              recording the total daily volume and reviewing electrolytes at least once daily
              <InlineRef topicId="paediatric-icu" refLabel="NICE NG29" />.
            </p>

            <div className="p-4 rounded-lg border border-border bg-secondary/30 mb-3">
              <p className="font-semibold text-foreground text-sm">1 · Maintenance — Holliday-Segar &ldquo;4-2-1&rdquo;</p>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground font-semibold">Weight band</th>
                      <th className="text-left py-2 text-foreground font-semibold">Hourly</th>
                      <th className="text-left py-2 text-foreground font-semibold">Per 24 h</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">First 10 kg</td><td>4 mL/kg/h</td><td>100 mL/kg/day</td></tr>
                    <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Second 10 kg (10–20 kg)</td><td>+2 mL/kg/h</td><td>+50 mL/kg/day</td></tr>
                    <tr><td className="py-2 font-medium text-foreground">Each kg above 20 kg</td><td>+1 mL/kg/h</td><td>+20 mL/kg/day</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Worked examples: a <strong>6 kg</strong> infant = 24 mL/h (576 mL/day); a{" "}
                <strong>15 kg</strong> child = 40 + 10 = 50 mL/h; a <strong>30 kg</strong> child = 40 + 20 + 10 =
                70 mL/h. In <strong>adolescents approaching adult size only</strong>, cap maintenance at roughly 2 L/day (female) or 2.5 L/day (male) — this is an adult convention and must not be applied to smaller children, whose Holliday–Segar volume is the ceiling. Note that the daily-volume
                form (100/50/20 mL/kg) is the version used for prescribing on a fluid chart.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Restrict in PICU:</strong> most ventilated, septic or brain-injured children are given{" "}
                <strong>50–70% of full maintenance</strong> because SIADH, positive-pressure ventilation and
                humidified circuits reduce free-water losses; a cumulative positive balance{" "}
                <strong>&gt;10%</strong> of body weight is independently associated with mortality. Include all
                infusion volumes, drug diluents and flushes in the total.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Which fluid:</strong> an <strong>isotonic</strong> crystalloid — 0.9% sodium chloride or
                balanced solution, with 5% glucose and potassium added as needed (e.g. 0.9% NaCl + 5% glucose
                + 10–20 mmol/L KCl). <strong>Never use 0.18% or 0.45% saline or 4%/5% glucose as routine
                maintenance</strong>; sick children have high ADH levels and hypotonic fluid causes fatal
                hyponatraemic encephalopathy. Neonates (&lt;28 days) are the exception, needing 10% glucose-based
                regimens with sodium titrated to age and measured losses.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30 mb-3">
              <p className="font-semibold text-foreground text-sm">2 · Resuscitation and deficit</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Bolus:</strong> 10 mL/kg isotonic crystalloid over 5–10 min with reassessment after each
                (20 mL/kg only for profound shock; <strong>5 mL/kg in DKA, trauma and neonates</strong>)
                <InlineRef topicId="paediatric-icu" refLabel="APLS 2021" />. After 40–60 mL/kg without
                improvement, start vasoactive support and re-examine for hepatomegaly, crepitations and rising
                oxygen requirement — signs of fluid overload.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Estimating deficit:</strong> % dehydration × weight(kg) × 10 = mL deficit. Clinically 5%
                = dry mucous membranes and reduced urine output; 10% = sunken eyes/fontanelle, reduced skin
                turgor, tachycardia, prolonged capillary refill; &gt;10% = shock. Replace the deficit{" "}
                <strong>over 24 h alongside maintenance</strong> (over 48 h in DKA and in hypernatraemic
                dehydration, keeping the sodium fall &lt;0.5 mmol/L/h). Acute weight loss is the most reliable
                measure — 1 kg = 1 L.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Blood:</strong> transfuse 10–15 mL/kg packed cells (raises Hb by ~2 g/dL); platelets
                10–15 mL/kg; FFP 15–20 mL/kg; cryoprecipitate 5–10 mL/kg. Major haemorrhage: 1:1 red
                cells:plasma in 10–20 mL/kg aliquots plus tranexamic acid 15 mg/kg (max 1 g) then 2 mg/kg/h.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30 mb-3">
              <p className="font-semibold text-foreground text-sm">3 · Special situations</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                <li>
                  <strong>DKA:</strong> 10 mL/kg bolus only if shocked, then deficit (assume 5% if pH ≥7.1, 10%
                  if pH &lt;7.1) replaced <strong>over 48 h</strong> plus maintenance; insulin 0.05–0.1
                  units/kg/h started 1–2 h after fluids; no bicarbonate. <strong>Add potassium 40 mmol/L to every rehydration bag from the outset</strong> unless the child is anuric or potassium is above 5.5 mmol/L: the measured potassium at presentation is misleadingly normal or high while total body potassium is markedly depleted, and insulin plus correction of acidosis causes a rapid fall. Recheck potassium at 2 h and then 4-hourly with continuous ECG monitoring, and correct hypophosphataemia and hypomagnesaemia if symptomatic <InlineRef topicId="paediatric-icu" refLabel="BSPED DKA 2021" />. Cerebral oedema — headache,
                  bradycardia with hypertension, falling GCS — is treated with{" "}
                  <strong>hypertonic 2.7% saline 3 mL/kg or mannitol 0.5–1 g/kg</strong> and a reduction in
                  fluid rate <InlineRef topicId="paediatric-icu" refLabel="ISPAD DKA 2022" />.
                </li>
                <li>
                  <strong>Burns:</strong> resuscitate over 10% TBSA in children using{" "}
                  <strong>2–4 mL/kg/%TBSA Hartmann&rsquo;s in 24 h (half in the first 8 h from time of
                  injury)</strong>, and — unlike adults —{" "}
                  <strong>give maintenance fluid containing glucose in addition</strong>, because of limited
                  glycogen reserves. Titrate to urine output 1–2 mL/kg/h.
                </li>
                <li>
                  <strong>Neonatal (day-of-life) regimen:</strong> 60 mL/kg/day on day 1, increasing by ~20–30
                  mL/kg/day to 150 mL/kg/day by day 4–5, using 10% glucose; sodium is usually withheld for the
                  first 24–48 h until the postnatal diuresis and weight loss occur.
                </li>
                <li>
                  <strong>Post-operative / brain-injured:</strong> isotonic fluid only, target normonatraemia
                  (aim Na⁺ 145–150 mmol/L in raised ICP), avoid glucose-containing fluid unless hypoglycaemic,
                  and treat hyponatraemia with a seizure using 2.7% saline 3 mL/kg (max 150 mL) boluses.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30 mb-3">
              <p className="font-semibold text-foreground text-sm">4 · Electrolytes and glucose</p>
              <p className="text-sm text-muted-foreground mt-1">
                Daily requirements: <strong>Na⁺ 2–4</strong>, <strong>K⁺ 1–2</strong>,{" "}
                <strong>Ca²⁺ 0.5</strong>, <strong>Mg²⁺ 0.2</strong> and{" "}
                <strong>PO₄ 0.5–1 mmol/kg/day</strong> (neonates need more calcium and phosphate).
                Correction doses: potassium 0.5 mmol/kg over 1–2 h (peripheral max 40 mmol/L; central for
                anything stronger); calcium gluconate 10% 0.5 mL/kg (or calcium chloride 10% 0.2 mL/kg) for
                hypocalcaemia or hyperkalaemia; magnesium sulfate 25–50 mg/kg (max 2 g) for torsade or severe
                asthma.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Hypoglycaemia (&lt;2.6 mmol/L, or &lt;3.5 in a sick neonate):</strong>{" "}
                <strong>2 mL/kg of 10% glucose</strong> (= 200 mg/kg) — never 50% glucose, which is
                hyperosmolar and sclerosant — then an infusion delivering a glucose delivery rate of{" "}
                <strong>4–8 mg/kg/min</strong> and recheck at 15–30 min. Persistent or recurrent hypoglycaemia
                needs a hypoglycaemia screen (insulin, cortisol, GH, ketones, lactate, ammonia, acylcarnitines)
                taken <em>before</em> correction where possible.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">5 · Nutrition</p>
              <p className="text-sm text-muted-foreground mt-1">
                Start enteral feed within 24–48 h, gastrically, and do not stop for modest inotrope doses.
                Energy needs are much higher per kg than adults and fall with age:{" "}
                <strong>~100–120 kcal/kg/day (neonate/infant), 75–90 (1–3 y), 60–75 (4–6 y), 45–55 (7–10 y),
                30–40 (adolescent)</strong>; in the acute PICU phase target roughly two-thirds of this to avoid
                overfeeding. Protein <strong>1.5 g/kg/day (infants up to 2–3 g/kg/day; 1.5 g/kg/day in older
                children, more with burns or CRRT)</strong>. Reserve PN for failure to establish enteral feeding
                by day 5–7 (earlier in neonates and the malnourished) — withholding early PN reduced new
                infections and shortened PICU stay <InlineRef topicId="paediatric-icu" refLabel="PEPaNIC 2016" />{" "}
                <InlineRef topicId="paediatric-icu" refLabel="ASPEN/SCCM Paeds 2017" /> — and give thiamine plus
                phosphate cover where there is refeeding risk.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="drug-dosing" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Drug Dosing in Small Patients">
            <p className="text-muted-foreground text-sm mb-3">
              Children are not scaled-down adults: body composition, protein binding, enzyme maturation and
              renal clearance all change with age, and the same mg/kg dose can be sub-therapeutic in a
              toddler and toxic in a neonate. Every prescription needs a{" "}
              <strong>documented weight</strong>, a <strong>mg/kg calculation checked by a second person</strong>,
              and a <strong>stated maximum (usually the adult dose)</strong> — the commonest severe paediatric
              medication errors are ten-fold decimal errors, dose-per-kg given as a total dose, and total dose
              given per kg. Use a national paediatric formulary for every dose and maximum{" "}
              <InlineRef topicId="paediatric-icu" refLabel="BNF for Children" />.
            </p>

            <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Developmental pharmacokinetics</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Size and maturation are separate effects: allometric scaling of clearance plus maturation
              functions explains low neonatal clearance and the higher per-kg clearance of toddlers{" "}
              <InlineRef topicId="paediatric-icu" refLabel="Anderson & Holford 2008" />.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                    <th className="text-left py-2 text-foreground font-semibold">Neonate / infant</th>
                    <th className="text-left py-2 text-foreground font-semibold">Dosing consequence</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Total body water</td><td>75–80% at term (85% preterm) vs 60% adult; ECF 40–45% vs 20%</td><td>Larger V<sub>d</sub> for water-soluble drugs → <strong>higher mg/kg loading dose</strong> (suxamethonium 2 mg/kg, aminoglycosides, propofol induction ~3–5 mg/kg in infants)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Body fat / muscle</td><td>Low muscle bulk, fat 12–15% at birth</td><td>Less redistribution → prolonged effect of lipophilic drugs; unreliable IM absorption</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Protein binding</td><td>Low albumin and α₁-acid glycoprotein; fetal albumin binds poorly; bilirubin competes</td><td>Higher free fraction of phenytoin, diazepam, bupivacaine → reduce dose and watch toxicity; sulphonamides/ceftriaxone displace bilirubin (kernicterus)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Blood–brain barrier</td><td>Immature, more permeable</td><td>Increased CNS sensitivity to opioids and sedatives — <strong>morphine dose halved in neonates</strong></td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Hepatic metabolism</td><td>Phase I and glucuronidation immature at birth, mature by 6–12 months, then <em>exceeds</em> adult clearance per kg in toddlers</td><td>Prolonged half-lives in neonates; <strong>1–6 year olds often need larger mg/kg doses and shorter intervals</strong> (e.g. paracetamol, midazolam)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Renal clearance</td><td>GFR ~20–30% of adult at term, adult values by 1–2 y</td><td>Extend dosing intervals for gentamicin, vancomycin, morphine metabolites (M6G) — interval, not dose, is reduced first</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Receptor / NMJ maturity</td><td>Immature neuromuscular junction, small ACh reserve</td><td>Increased sensitivity to non-depolarising blockers but larger V<sub>d</sub> — net dose similar per kg with a longer duration; always monitor with a nerve stimulator</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Surface area</td><td>BSA:weight ratio ~3× adult</td><td>Cytotoxics, some vasoactives and dialysis prescriptions are dosed per m²: BSA(m²) = √(height cm × weight kg / 3600)</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Emergency drugs — mg/kg to remember</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Drug</th>
                    <th className="text-left py-2 text-foreground font-semibold">Dose</th>
                    <th className="text-left py-2 text-foreground font-semibold">Notes / maximum</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Adrenaline (arrest)</td><td>10 mcg/kg IV/IO = <strong>0.1 mL/kg of 1:10,000</strong></td><td>Every 3–5 min. Never give the 1:1000 ampoule undiluted IV</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Adrenaline (anaphylaxis)</td><td>IM 1:1000 — 150 mcg &lt;6 y, 300 mcg 6–12 y, 500 mcg &gt;12 y</td><td>Anterolateral thigh; repeat at 5 min</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Atropine</td><td>20 mcg/kg</td><td>Minimum 100 mcg (smaller doses cause paradoxical bradycardia), max 600 mcg</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Amiodarone</td><td>5 mg/kg after 3rd and 5th shock</td><td>Max 300 mg</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Adenosine</td><td>100 mcg/kg, then 200, then 300 mcg/kg</td><td>Max single dose 12 mg; rapid flush, large proximal vein</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Lorazepam / midazolam (seizure)</td><td>Lorazepam 100 mcg/kg IV (max 4 mg); buccal midazolam 300 mcg/kg (max 10 mg)</td><td>Two doses maximum before escalating</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Levetiracetam / phenytoin</td><td>Levetiracetam 40–60 mg/kg (max 4.5 g); phenytoin 20 mg/kg over 20 min</td><td>Cardiac monitoring for phenytoin; levetiracetam preferred (no monitoring, fewer interactions)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Induction agents</td><td>Ketamine 1–2 mg/kg; propofol 2–4 mg/kg (higher per kg in infants); thiopentone 4–6 mg/kg (2–3 in neonates)</td><td>Halve doses in shock; ketamine is the usual choice for haemodynamic instability</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Neuromuscular blockers</td><td>Rocuronium 1 mg/kg (RSI); suxamethonium <strong>2 mg/kg &lt;1 y, 1.5 mg/kg child</strong>; atracurium 0.5 mg/kg</td><td>Sugammadex 2–4 mg/kg (16 mg/kg for immediate reversal); atropine before sux in infants</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Analgesia / antipyretics</td><td>Paracetamol IV 15 mg/kg 6-hourly (max 60 mg/kg/day; 7.5 mg/kg and 30 mg/kg/day in neonates &lt;10 kg); ibuprofen 5–10 mg/kg 8-hourly; morphine 100 mcg/kg IV (<strong>25–50 mcg/kg in neonates</strong>)</td><td>Titrate opioids in 20 mcg/kg increments; naloxone 10 mcg/kg (400 mcg max) if needed</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Antibiotics (sepsis)</td><td>Ceftriaxone 80 mg/kg od (max 4 g); cefotaxime 50 mg/kg 6–8-hourly; amoxicillin 30 mg/kg tds; gentamicin 7 mg/kg od (5 mg/kg neonates, extended interval); vancomycin 15 mg/kg 6–8-hourly (level-guided); aciclovir 10–20 mg/kg tds</td><td>Meningitic doses are higher; add dexamethasone 150 mcg/kg qds in bacterial meningitis &gt;3 months</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Hypertonic saline / mannitol</td><td>2.7% saline 3 mL/kg (max 150 mL); mannitol 0.5–1 g/kg</td><td>For raised ICP or hyponatraemic seizure</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Salbutamol / magnesium (asthma)</td><td>Salbutamol IV 15 mcg/kg load (max 250 mcg) then 1–2 mcg/kg/min; magnesium sulfate 40–50 mg/kg (max 2 g) over 20 min</td><td>Check K⁺ and lactate on salbutamol infusion</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Infusions — the &ldquo;per kg per minute&rdquo; habit</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>
                Vasoactive infusions are prescribed in <strong>mcg/kg/min</strong>: adrenaline and noradrenaline
                0.05–1 mcg/kg/min (start 0.05–0.1), dopamine/dobutamine 5–20 mcg/kg/min, milrinone 0.25–0.75
                mcg/kg/min, vasopressin 0.0003–0.002 units/kg/min. Sedation runs in mcg/kg/h or mg/kg/h —
                morphine 10–40 mcg/kg/h, fentanyl 1–4 mcg/kg/h, midazolam 1–4 mcg/kg/min, dexmedetomidine
                0.2–1.4 mcg/kg/h, ketamine 5–20 mcg/kg/min.
              </li>
              <li>
                <strong>Use standard concentrations</strong> from a national paediatric monograph rather than
                improvising: fluid-restricted infants need double- or quadruple-strength bags, which multiplies
                the consequence of a rate error. Cross-check the mL/h a pump is delivering against the intended
                mcg/kg/min before and after every change of bag or syringe.
              </li>
              <li>
                <strong>Account for hidden volumes and calories:</strong> flushes, drug diluents and propofol
                lipid (1.1 kcal/mL) all count towards the daily fluid and energy total in a 4 kg infant.
              </li>
              <li>
                <strong>Avoid in the very young:</strong> prolonged propofol infusion (PRIS), codeine (variable
                CYP2D6 — contraindicated &lt;12 y), NSAIDs in neonates or dehydration, and ceftriaxone in
                jaundiced neonates or with calcium-containing fluids.
              </li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-infection" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Infection Prevention, Transfusion & PICU Bundles">
              <div className="grid gap-4 md:grid-cols-2 mt-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Healthcare-associated infection</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Central line bundles</strong> — insertion with full aseptic technique, chlorhexidine skin preparation, maximal barrier precautions and ultrasound guidance; then a daily maintenance bundle: scrub the hub, closed needle-free connectors, dressing integrity, minimal line access, and a documented daily question of whether the line can come out. Bundle programmes reduced paediatric line infection rates by more than half <InlineRef topicId="paediatric-icu" refLabel="epic3 2014" />.</li>
                    <li><strong>Ventilator-associated pneumonia/events</strong> — head-up positioning where safe, oral care, cuff pressure and subglottic secretion management, avoiding unnecessary circuit changes, sedation interruption and daily extubation assessment.</li>
                    <li><strong>Urinary catheters and antimicrobial stewardship</strong> — remove early, and review every antimicrobial at 48–72 h against cultures with a stop or step-down date; escalate to the microbiologist for the immunocompromised or long-stay child.</li>
                    <li><strong>Outbreak awareness</strong> — cohorting and isolation for RSV, influenza, SARS-CoV-2, norovirus and multidrug-resistant organisms; hand hygiene remains the single most effective measure.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Transfusion and thromboprophylaxis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Red cells</strong> — in a stable, non-bleeding critically ill child, transfuse below a haemoglobin of <strong>7 g/dL</strong> and not above it; higher thresholds apply to uncorrected cyanotic heart disease, single-ventricle physiology, ECMO, active haemorrhage and severe hypoxaemia <InlineRef topicId="paediatric-icu" refLabel="TAXI 2018" />. Give 10–15 mL/kg and reassess rather than prescribing a unit.</li>
                    <li><strong>Products</strong> — irradiated and CMV-negative components for neonates and the severely immunocompromised, and paedipacks to reduce donor exposure; watch for hyperkalaemia and citrate-related hypocalcaemia during rapid transfusion in small infants.</li>
                    <li><strong>Thrombosis</strong> — central venous catheters cause most paediatric thrombosis; consider prophylaxis (usually low-molecular-weight heparin) in pubertal adolescents, prolonged immobility, active malignancy, nephrotic syndrome or previous thrombosis, and treat catheter-related thrombosis with anticoagulation and line review.</li>
                    <li><strong>Stress-ulcer prophylaxis</strong> — for the ventilated child, coagulopathy, burns, head injury or high-dose steroids, stopping it as enteral feeding is established.</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-nai" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Non-Accidental Injury">
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Abusive injury presents to intensive care as an unexplained collapse, an
                encephalopathic infant, an apparently isolated injury with an implausible history,
                or an unexpected cardiac arrest. Resuscitation always comes first; the safeguarding
                process runs alongside it, led by the paediatric team and documented meticulously{" "}
                <InlineRef topicId="paediatric-icu" refLabel="NICE NG76" />.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Features that should raise concern</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>History that is absent, changing, inconsistent between carers, or incompatible with the child's developmental stage (a pre-mobile infant who "rolled off the sofa").</li>
                    <li>Delayed presentation, or presentation to multiple different services.</li>
                    <li>Abusive head trauma: encephalopathy, apnoea, seizures, subdural haemorrhages of differing ages, retinal haemorrhages, and cervical or ligamentous injury.</li>
                    <li>Posterior rib fractures, classic metaphyseal lesions, fractures of differing ages, or any fracture in a non-mobile infant.</li>
                    <li>Bruising in a non-mobile infant, bruising of the ears, neck, torso or genitalia, patterned marks, bites, or scalds with clear immersion lines.</li>
                    <li>Injuries in a child with disability or communication difficulty; fabricated or induced illness (unexplained hypoglycaemia, salt or drug levels, recurrent apnoea witnessed only by one carer).</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">What to do</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Resuscitate and treat; do not delay imaging, surgery or transfer for safeguarding paperwork.</li>
                    <li>Record verbatim histories with who gave them and when, document injuries with a body map and dated photographs taken through the agreed local process, and preserve clothing where relevant.</li>
                    <li>Make an immediate referral to children's social care and the named or designated safeguarding doctor; do not investigate the family yourself and do not delay to gather proof.</li>
                    <li>Complete the recommended investigation set with the paediatric team: skeletal survey with follow-up imaging, neuroimaging (MRI adds to CT), ophthalmology for retinal examination, coagulation and bone-health screening, and toxicology <InlineRef topicId="paediatric-icu" refLabel="RCR Skeletal Survey 2018" />.</li>
                    <li>Consider siblings and other children in the household; think about whether medical examination or protection is also needed for them.</li>
                    <li>Communicate honestly and neutrally with the family about what tests are being done and why, and involve the police liaison and coroner or procurator fiscal pathways where a child dies.</li>
                    <li>Support the team: these cases are distressing, and staff need debrief and access to psychological support.</li>
                  </ul>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="ethics" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Safeguarding, Ethics & End-of-Life">
            <p className="text-muted-foreground text-sm">
              All PICU staff need Level 3 safeguarding training; the recognition features and the practical safeguarding response are set out in <a href="#section-nai" className="text-icu underline underline-offset-4">Non-Accidental Injury</a> <InlineRef topicId="paediatric-icu" refLabel="NICE NG76" />. Best-interests framework — parents central to decision-making but cannot demand futile or burdensome treatment <InlineRef topicId="paediatric-icu" refLabel="RCPCH Framework 2015" />. Death by neurological criteria can be diagnosed from 37 weeks corrected gestation, with separate RCPCH criteria for infants under 2 months, and requires two doctors performing two sets of tests <InlineRef topicId="paediatric-icu" refLabel="RCPCH DNC Infants 2015" />. Family-centred care: open visiting, parental presence, play specialists, bereavement support — and staffing, retrieval and escalation standards follow the PCCS quality standards <InlineRef topicId="paediatric-icu" refLabel="PCCS Standards 2021" />.
            </p>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Withdrawal and palliative care</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>The RCPCH framework recognises three situations in which withholding or withdrawing life-sustaining treatment may be ethical: when <strong>life is limited in quantity</strong> (brain-stem death, imminent death, inevitable death), when <strong>life is limited in quality</strong> (unbearable burden of treatment, burdens of the illness, lack of ability to benefit), and when a <strong>competent young person refuses</strong> treatment <InlineRef topicId="paediatric-icu" refLabel="RCPCH Framework 2015" />.</li>
                  <li>Decisions are made by consensus of the multidisciplinary team with the family, documented clearly, with a second opinion for contested cases, early involvement of the paediatric palliative care team, and clinical ethics or legal advice if disagreement persists — courts are the last resort, not the first.</li>
                  <li>Plan the practicalities: symptom control (opioid and benzodiazepine infusions titrated to distress, secretions, seizures), extubation or de-escalation choices, siblings, faith and cultural needs, a preferred place of death including transfer home or to a hospice, memory-making, and follow-up bereavement contact.</li>
                  <li>Consider whether the death is reportable to the coroner or procurator fiscal, complete child death review processes, and offer staff debrief.</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Organ and tissue donation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Donation should be considered a <strong>routine part of end-of-life care</strong>. Refer every potential donor to the specialist nurse for organ donation <em>before</em> discussing donation with the family and before withdrawal is planned; the trigger is the decision to test for death by neurological criteria or the decision to withdraw life-sustaining treatment.</li>
                  <li><strong>Deemed consent (opt-out) legislation does not apply to those under 18</strong> in England, Wales and Scotland, so parental (or the young person&rsquo;s recorded) consent is required; check the Organ Donor Register and honour a recorded decision.</li>
                  <li><strong>Donation after brainstem death</strong> requires two doctors performing two sets of tests with the RCPCH criteria, from 37 weeks corrected gestation, with the infant criteria and greater caution below 2 months. Donor optimisation continues after diagnosis — lung-protective ventilation, vasopressin/noradrenaline, hormone replacement (levothyroxine, methylprednisolone), desmopressin for diabetes insipidus, glycaemic and electrolyte control and temperature management.</li>
                  <li><strong>Donation after circulatory death</strong> follows a planned withdrawal, with a 5 minute period of continuous absent circulation before the diagnosis of death and defined ischaemic time limits; withdrawal must not be altered for donation purposes, and the family need to understand that donation may not proceed.</li>
                  <li>Neonatal donation is possible from term infants and tissue donation (heart valves, corneas) is possible in many more children; do not assume a child is unsuitable — that judgement belongs to the specialist nurse and retrieval team <InlineRef topicId="paediatric-icu" refLabel="NICE NG135" />.</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-transfer" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Stabilisation, Retrieval & Handover">
              <div className="grid gap-4 md:grid-cols-2 mt-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Before the team arrives</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Phone the regional paediatric critical care transport service early — advice starts at the first call, not at arrival.</li>
                    <li>Secure the airway with the right size and depth, confirm with capnography, decompress the stomach, and secure the tube for movement.</li>
                    <li>Two points of access (intraosseous is acceptable), a blood gas, glucose and calcium checked, active warming for infants, and eye and pressure-area care.</li>
                    <li>Draw up and label weight-based emergency drugs and infusions; use the{" "}
                      <Link to="/intensive-care/calculator" className="text-icu underline underline-offset-4">
                        infusion calculator
                      </Link>{" "}
                      to fix concentrations and rates before departure.</li>
                    <li>Consent, imaging, notes, blood results and a parent plan (who travels, where they go) organised in advance.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Handover and decision to move</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Use a structured, time-stamped handover: presentation, working diagnosis, what has been given and when, current support, trajectory, outstanding results, safeguarding concerns and family situation.</li>
                    <li>Distinguish a <strong>time-critical transfer</strong> (needs an intervention only available elsewhere — neurosurgery, cardiac intervention, surgical control of bleeding) from a stabilisation-and-retrieval transfer.</li>
                    <li>For time-critical moves, the local team escorts with retrieval advice; anticipate deterioration on movement, and take drugs, blood products and airway equipment for the journey.</li>
                    <li>Standards for staffing, escalation and family-centred care follow the national paediatric critical care quality standards <InlineRef topicId="paediatric-icu" refLabel="PCCS Standards 2021" />.</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Related pages:{" "}
                <Link to="/intensive-care/paediatric-flows" className="text-icu underline underline-offset-4">Paediatric ICU Management Flows</Link>
                {" · "}
                <Link to="/intensive-care/paediatric-withdrawal" className="text-icu underline underline-offset-4">Paediatric Withdrawal Flows</Link>
                {" · "}
                <Link to="/clinical/paediatric-core" className="text-icu underline underline-offset-4">Paediatric Core Essentials</Link>
              </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="risk-scoring" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Risk Stratification & Scoring Systems">
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Paediatric scores serve two distinct purposes: <strong>benchmarking and audit</strong> (comparing observed with predicted mortality across units, standardising case-mix in research) and <strong>bedside recognition of deterioration</strong>. They are not designed to guide treatment decisions in an individual child, and must never be used to withhold or limit therapy.
            </p>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">PIM / PIM2 / PIM3 — admission mortality risk</p>
                <p className="text-sm text-muted-foreground mt-1">
                  The Paediatric Index of Mortality uses variables available at the <strong>time of PICU admission</strong> (first face-to-face contact), which makes it quick to collect and suitable for continuous quality monitoring. PIM2 includes systolic BP, pupillary reaction to light, PaO₂/FiO₂, base excess, mechanical ventilation in the first hour, elective admission, recovery from a procedure, cardiac bypass, and high- or low-risk diagnostic groups; it was recalibrated against improving outcomes, and PIM3 updates the diagnostic weightings again <InlineRef topicId="paediatric-icu" refLabel="PIM2 2003" />.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">PRISM III / PRISM IV — first 12–24 hours</p>
                <p className="text-sm text-muted-foreground mt-1">
                  The Pediatric Risk of Mortality score uses the <strong>worst values over the first 12–24 h</strong> of PICU stay across 17 physiological and laboratory variables (cardiovascular/neurological, acid-base, chemistry, haematology). The wider dataset can improve discrimination, but because it captures the effect of the first day's treatment it is susceptible to treatment bias and is more labour-intensive to collect than PIM <InlineRef topicId="paediatric-icu" refLabel="PIM2 2003" />.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">PELOD-2 — organ dysfunction</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Paediatric Logistic Organ Dysfunction quantifies the <strong>severity of multiple organ dysfunction</strong> rather than predicting admission mortality, scoring neurological (GCS, pupils), cardiovascular (lactate, MAP), renal (creatinine), respiratory (PaO₂/FiO₂, PaCO₂, ventilation) and haematological (WCC, platelets) domains. It can be scored serially, so it is used to track trajectory and as an outcome measure in trials — the paediatric counterpart of SOFA.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">PEWS — pre-PICU deterioration</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Paediatric Early Warning Scores work upstream of all of the above, on the ward: age-specific thresholds for heart rate, respiratory rate and effort, blood pressure, SpO₂/oxygen requirement, capillary refill and conscious level, plus explicit weight given to nurse and <strong>parental concern</strong>. A triggering or rising score mandates escalation to senior review and, where needed, the outreach or PICU retrieval team <InlineRef topicId="paediatric-icu" refLabel="Bedside PEWS 2009" />.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Vasoactive-Inotropic Score (VIS) — quantifying cardiovascular support</p>
                <p className="text-sm text-muted-foreground mt-1">
                  VIS = dopamine (micrograms/kg/min) + dobutamine + 100 × adrenaline + 100 ×
                  noradrenaline + 10 × milrinone + 10,000 × vasopressin (units/kg/min) + 100 ×
                  phenylephrine. It is widely used after congenital cardiac surgery and in septic
                  shock, where a <strong>VIS above roughly 20 at 24–48 h</strong> is associated with
                  longer ventilation, acute kidney injury and worse outcome. Its value at the bedside
                  is as a single trend: a rising VIS despite treatment prompts an echocardiogram, a
                  search for a missed diagnosis and an ECMO conversation.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">PARDS severity and the oxygenation index</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Paediatric ARDS is graded on oxygenation rather than the PaO₂/FiO₂ ratio alone:{" "}
                  <strong>oxygenation index (OI) = mean airway pressure × FiO₂ × 100 / PaO₂ (mmHg)</strong>,
                  or the oxygen saturation index (OSI) using SpO₂ when no arterial line is present.
                  On invasive ventilation, mild is OI 4–8, moderate 8–16 and severe ≥16 (OSI 5–7.5,
                  7.5–12.3 and ≥12.3); PARDS can also be diagnosed on non-invasive support. Severity
                  should be reassessed at 4–6 h because early improvement identifies a much
                  lower-risk group, and a persistently high OI is the trigger for prone positioning,
                  neuromuscular blockade, inhaled nitric oxide trial and ECMO referral{" "}
                  <InlineRef topicId="paediatric-icu" refLabel="PARDS Global 2023" />.
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <SynthesisBlock
            title="Paediatric ICU — Critical Differences vs Adults"
            subtitle="The size, physiology, and pharmacology adjustments that matter at the bedside."
            variant="summary"
          >
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li><strong>PEWS</strong>: Paediatric Early Warning Scores combine HR, RR, BP, SpO₂, respiratory effort, capillary refill, consciousness and nurse/family concern against age-specific norms; a rising or triggering score escalates to senior review and, if needed, the critical care outreach/PICU retrieval team <InlineRef topicId="paediatric-icu" refLabel="Bedside PEWS 2009" />.</li>
              <li><strong>Tube sizing</strong>: cuffed ETT ID = (age/4) + 3.5; length = (age/2) + 12 (oral).</li>
              <li><strong>Fluid resuscitation</strong>: 10 ml/kg isotonic crystalloid boluses, reassess after each (20 ml/kg reserved for profound shock; 5 ml/kg in DKA, trauma and neonates).</li>
              <li><strong>Maintenance fluids</strong>: isotonic only (NICE 2015). Holliday-Segar 4-2-1.</li>
              <li><strong>Sepsis</strong>: antibiotics within 1 h; noradrenaline (warm) or adrenaline (cold).</li>
              <li><strong>Drug dosing</strong>: weight-based (mg/kg). Sugammadex 2–4 mg/kg, suxamethonium 1.5–2 mg/kg.</li>
              <li><strong>Family-centred care</strong>: structured updates, consider parental presence at procedures.</li>
            </ul>
          </SynthesisBlock>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Paediatric sepsis: 10 mL/kg fluid boluses with reassessment after each (20 mL/kg only for profound shock, 5 mL/kg in DKA/trauma), early antibiotics, early inotropes (peripheral if needed).",
              "ETT/drug doses: WET FLAG (weight, energy 4 J/kg, tube size, fluid 10 mL/kg, lorazepam, adrenaline 10 µg/kg, glucose 2 mL/kg 10%).",
              "Congenital cyanotic heart disease: maintain SpO₂ at usual baseline (often 75–85%), avoid hypoxia/hypocapnia changes that affect PVR/SVR balance.",
              "Paediatric TBI: target CPP age-appropriate (40–60 mmHg), avoid hyponatraemia, head-up, normothermia.",
              "Sedation: morphine/midazolam infusions, dexmedetomidine adjunct; chloral hydrate avoided due to safety concerns.",
            ]}
          />
          <TopicFaqs faqs={paediatricIcuFaqs} />
        </>
      }
    />
  );
};

export default PaediatricIcuTopic;
