import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { paediatricEmergenciesQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const TOPIC_ID = "paediatric-emergencies";

const tocItems = [
  { id: "section-recognition", label: "Recognising the Collapsing Child & Neonate", group: "Recognition" },
  { id: "section-sepsis", label: "Sepsis: Age-Specific Presentations", group: "Presentations" },
  { id: "section-metabolic", label: "Metabolic & Endocrine Crises", group: "Presentations" },
  { id: "section-cardiac", label: "Cardiac Presentations & Duct-Dependent Collapse", group: "Presentations" },
  { id: "section-arrhythmias", label: "Paediatric Arrhythmias", group: "Management" },
  { id: "section-stroke", label: "Paediatric Stroke", group: "Management" },
  { id: "section-nai", label: "Non-Accidental Injury", group: "Safeguarding" },
  { id: "section-transfer", label: "Stabilisation, Retrieval & Handover", group: "System" },
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
];

const keyPoints = [
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
          worsens it — use 10 mL/kg and reassess, looking for hepatomegaly. Correcting the
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
        secure the airway before transfer <InlineRef topicId={TOPIC_ID} refLabel="NICE NG195" />{" "}
        <InlineRef topicId={TOPIC_ID} refLabel="BIMDG Undiagnosed 2023" />.
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
        <InlineRef topicId={TOPIC_ID} refLabel="RCUK PALS 2021" />.
      </>
    ),
    cites: ["RCUK PALS 2021", "APLS 2021"],
  },
];

const faqs: Array<[string, string]> = [
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
];

const PaediatricEmergenciesTopic = () => {
  return (
    <TopicTemplate
      title="Paediatric ICU Emergencies"
      subtitle="Neonate to adolescent — presentations and immediate management"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      topicId={TOPIC_ID}
      topicTitle="Paediatric ICU Emergencies"
      objectives={objectives}
      keyPoints={keyPoints}
      workedExamples={workedExamples}
      quizQuestions={paediatricEmergenciesQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "APLS 2021",
          "RCUK PALS 2021",
          "NICE NG195",
          "BIMDG Undiagnosed 2023",
          "RCPCH Stroke 2017",
          "NICE NG76",
        ],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              This topic is about the front door: the child or neonate who arrives collapsed,
              seizing, arrhythmic or injured, and the first hour that decides the outcome. It is
              deliberately presentation-led and complements — rather than repeats — the
              organ-support material in{" "}
              <Link to="/intensive-care/paediatric-icu" className="text-icu underline underline-offset-4">
                Paediatric Intensive Care
              </Link>{" "}
              (age-specific physiology, PARDS ventilation, sedation, fluids, congenital cardiac
              intensive care, brainstem death), the step-by-step pathways in{" "}
              <Link to="/intensive-care/paediatric-flows" className="text-icu underline underline-offset-4">
                Paediatric ICU Management Flows
              </Link>
              , and the dosing tools in{" "}
              <Link to="/intensive-care/calculator" className="text-icu underline underline-offset-4">
                the infusion calculator
              </Link>
              . Where a subject is fully covered elsewhere — septic shock fluid and vasoactive
              escalation, Fontan and post-bypass physiology, pulmonary hypertensive crisis, DKA,
              traumatic brain injury, status epilepticus — this page gives the recognition step and
              links out.
            </p>

            <TopicTableOfContents items={tocItems} />

            <section id="section-recognition" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Recognising the Collapsing Child & Neonate
              </h2>
              <ExamMappingBadges exams={[Exam.FFICM, Exam.EDIC]} />
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
                    <li><strong>Ammonia</strong> (free-flowing sample, on ice, run immediately) — hyperammonaemia with respiratory alkalosis in an encephalopathic infant is a urea-cycle emergency <InlineRef topicId={TOPIC_ID} refLabel="Häberle Urea Cycle 2019" />.</li>
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
                  and ventilate first <InlineRef topicId={TOPIC_ID} refLabel="RCUK PALS 2021" />.
                  The age-banded vitals, WETFLAG values and airway sizing are in the{" "}
                  <Link to="/intensive-care/paediatric-icu#wetflag" className="text-icu underline underline-offset-4">
                    Paediatric Intensive Care topic
                  </Link>
                  .
                </p>
              </div>
            </section>

            <section id="section-sepsis" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Sepsis: Age-Specific Presentations
              </h2>
              <ExamMappingBadges exams={[Exam.FFICM, Exam.EDIC]} />
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                The fluid, vasoactive and steroid strategy for paediatric septic shock is covered in
                detail in the{" "}
                <Link to="/intensive-care/paediatric-icu#sepsis" className="text-icu underline underline-offset-4">
                  Paediatric Intensive Care sepsis section
                </Link>{" "}
                and the{" "}
                <Link to="/intensive-care/paediatric-flows" className="text-icu underline underline-offset-4">
                  paediatric sepsis flow
                </Link>
                . What follows is the recognition problem — the reason children with sepsis are
                missed.
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
                    <InlineRef topicId={TOPIC_ID} refLabel="NICE NG195" />.
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
                    <InlineRef topicId={TOPIC_ID} refLabel="NICE NG51" />{" "}
                    <InlineRef topicId={TOPIC_ID} refLabel="NICE NG240" />.
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
            </section>

            <section id="section-metabolic" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Metabolic & Endocrine Crises
              </h2>
              <ExamMappingBadges exams={[Exam.FFICM, Exam.EDIC]} />
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Inborn errors of metabolism present acutely in the newborn period or during
                catabolic stress (infection, fasting, surgery, a feed change). The generic emergency
                management is the same whatever the eventual diagnosis: stop the offending
                substrate, reverse catabolism with generous glucose, remove toxic metabolites and
                get specialist metabolic advice early{" "}
                <InlineRef topicId={TOPIC_ID} refLabel="BIMDG Undiagnosed 2023" />. DKA is covered
                in the{" "}
                <Link to="/intensive-care/paediatric-icu#neurocrit" className="text-icu underline underline-offset-4">
                  paediatric neurocritical care section
                </Link>
                .
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
                    <li><strong>Stop protein and feeds</strong> and start intravenous glucose 10% delivering roughly 8–10 mg/kg/min (a higher rate with insulin if hyperglycaemic), which suppresses catabolism.</li>
                    <li><strong>Treat hypoglycaemia</strong> with 2 mL/kg of 10% glucose, never 50%, then maintain the infusion and recheck.</li>
                    <li><strong>Correct dehydration and acidosis</strong> cautiously; bicarbonate only for severe acidosis in discussion with the metabolic team.</li>
                    <li><strong>Hyperammonaemia:</strong> stop protein, escalate glucose, give sodium benzoate and sodium phenylbutyrate with arginine or carglumic acid as directed, and arrange haemofiltration urgently if ammonia remains high or is rising — dialysis clears ammonia far faster than drugs alone <InlineRef topicId={TOPIC_ID} refLabel="Häberle Urea Cycle 2019" />.</li>
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
            </section>

            <section id="section-cardiac" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Cardiac Presentations & Duct-Dependent Collapse
              </h2>
              <ExamMappingBadges exams={[Exam.FFICM, Exam.EDIC]} />
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Postoperative cardiac intensive care — single-ventricle balance, low cardiac output
                syndrome after bypass and pulmonary hypertensive crisis — is covered in the{" "}
                <Link to="/intensive-care/paediatric-icu#cardiac" className="text-icu underline underline-offset-4">
                  Paediatric Intensive Care cardiac section
                </Link>
                , and the transitional circulation in{" "}
                <Link to="/physiology/foetal-circulation" className="text-icu underline underline-offset-4">
                  Foetal & Transitional Circulation
                </Link>
                . This section is about undiagnosed disease presenting as an emergency.
              </p>
              <div className="space-y-3">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Duct-dependent presentations</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong>Duct-dependent systemic circulation</strong> (critical coarctation, interrupted arch, critical aortic stenosis, hypoplastic left heart): collapse, acidosis, absent femoral pulses, differential saturations, oliguria — typically day 2–14 as the duct closes.</li>
                    <li><strong>Duct-dependent pulmonary circulation</strong> (pulmonary atresia, critical pulmonary stenosis, tricuspid atresia): profound cyanosis with clear lungs and little respiratory distress, unresponsive to oxygen (a hyperoxia test that fails to raise PaO₂ substantially).</li>
                    <li><strong>Transposition of the great arteries</strong>: cyanosis with reverse differential saturations; needs prostaglandin and urgent consideration of balloon atrial septostomy.</li>
                    <li><strong>Prostaglandin E1</strong> reopens or maintains the duct. Anticipate apnoea (be ready to intubate, particularly before transfer), hypotension, fever, flushing and jitteriness <InlineRef topicId={TOPIC_ID} refLabel="Kanani PGE1 2019" />.</li>
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
            </section>

            <section id="section-arrhythmias" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Paediatric Arrhythmias</h2>
              <ExamMappingBadges exams={[Exam.FFICM, Exam.EDIC]} />
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Arrhythmia in a child is usually secondary — hypoxia, hypovolaemia, electrolyte
                disturbance, drug toxicity, a central line tip in the atrium, or congenital heart
                disease and its surgery. Correct the cause while treating the rhythm{" "}
                <InlineRef topicId={TOPIC_ID} refLabel="RCUK PALS 2021" />.
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
                      <td>Oxygen and effective ventilation first; if unresponsive start CPR, then adrenaline 10 micrograms/kg IV/IO repeated every 3–5 min; atropine 20 micrograms/kg (minimum 100 micrograms) for vagal cause or AV block; consider pacing for congenital or post-surgical block</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Supraventricular tachycardia</td>
                      <td>Narrow complex, regular, no beat-to-beat variability, rate typically &gt;220 in infants and &gt;180 in children, absent or abnormal P waves</td>
                      <td>Stable: vagal manoeuvres (ice to the face in infants, Valsalva in older children), then adenosine 100 micrograms/kg rapid push with flush, escalating to 200 then 300 micrograms/kg (adult maximum 12 mg per dose). Unstable: synchronised cardioversion 1 J/kg then 2 J/kg with sedation. Amiodarone or procainamide only with cardiology advice</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Wide-complex tachycardia with a pulse</td>
                      <td>Rare in children; assume ventricular tachycardia. Look for long QT, myocarditis, electrolyte abnormality, tricyclic or other toxicity, or repaired congenital disease</td>
                      <td>Unstable: synchronised cardioversion 1 J/kg then 2 J/kg. Stable: amiodarone 5 mg/kg over 20–60 min (or procainamide) with cardiology; magnesium sulfate for torsade de pointes; correct potassium and magnesium</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">VF / pulseless VT</td>
                      <td>Shockable arrest rhythm — more likely with cardiac disease, hypothermia, poisoning or channelopathy than in the typical hypoxic paediatric arrest</td>
                      <td>Unsynchronised defibrillation 4 J/kg, CPR 15:2, adrenaline 10 micrograms/kg and amiodarone 5 mg/kg after the third shock (repeat amiodarone once after the fifth), searching the reversible causes</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Junctional ectopic tachycardia</td>
                      <td>Postoperative congenital cardiac surgery: narrow complex, AV dissociation, poor output</td>
                      <td>Cool, deepen sedation, reduce catecholamines, correct magnesium, amiodarone and pacing strategies with the cardiac team</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-foreground">Channelopathy presentations</td>
                      <td>Sudden collapse, exercise or startle-triggered syncope, seizures labelled epilepsy, family history of sudden death; long QT, catecholaminergic polymorphic VT, Brugada</td>
                      <td>Avoid QT-prolonging drugs, correct electrolytes, magnesium for torsade, beta-blockade and specialist inherited-cardiac-conditions referral; screen the family</td>
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
                  <Link to="/intensive-care/paediatric-icu#resus" className="text-icu underline underline-offset-4">
                    resuscitation key numbers table
                  </Link>
                  .
                </p>
              </div>
            </section>

            <section id="section-stroke" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Paediatric Stroke</h2>
              <ExamMappingBadges exams={[Exam.FFICM, Exam.EDIC]} />
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Childhood stroke is rare but frequently delayed in diagnosis, often being attributed
                to migraine, seizure, encephalitis or a functional presentation. Around half of
                cases are haemorrhagic, and the risk factors are quite different from adults:
                congenital and acquired heart disease, sickle cell disease, arteriopathy (including
                post-varicella and focal cerebral arteriopathy), arteriovenous malformation,
                infection, prothrombotic disorders, trauma with dissection, and cardiac
                catheterisation or extracorporeal support{" "}
                <InlineRef topicId={TOPIC_ID} refLabel="RCPCH Stroke 2017" />{" "}
                <InlineRef topicId={TOPIC_ID} refLabel="AHA Paediatric Stroke 2019" />.
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
                  <Link to="/intensive-care/paediatric-icu#neurocrit" className="text-icu underline underline-offset-4">
                    Paediatric Intensive Care topic
                  </Link>
                  ; malignant middle cerebral artery infarction in a child is an indication for early
                  neurosurgical discussion because the cranium tolerates swelling poorly once the
                  fontanelles have closed.
                </p>
              </div>
            </section>

            <section id="section-nai" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Non-Accidental Injury</h2>
              <ExamMappingBadges exams={[Exam.FFICM, Exam.EDIC]} />
              <p className="text-muted-foreground leading-relaxed mt-3 mb-4">
                Abusive injury presents to intensive care as an unexplained collapse, an
                encephalopathic infant, an apparently isolated injury with an implausible history,
                or an unexpected cardiac arrest. Resuscitation always comes first; the safeguarding
                process runs alongside it, led by the paediatric team and documented meticulously{" "}
                <InlineRef topicId={TOPIC_ID} refLabel="NICE NG76" />.
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
                    <li>Complete the recommended investigation set with the paediatric team: skeletal survey with follow-up imaging, neuroimaging (MRI adds to CT), ophthalmology for retinal examination, coagulation and bone-health screening, and toxicology <InlineRef topicId={TOPIC_ID} refLabel="RCR Skeletal Survey 2018" />.</li>
                    <li>Consider siblings and other children in the household; think about whether medical examination or protection is also needed for them.</li>
                    <li>Communicate honestly and neutrally with the family about what tests are being done and why, and involve the police liaison and coroner or procurator fiscal pathways where a child dies.</li>
                    <li>Support the team: these cases are distressing, and staff need debrief and access to psychological support.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="section-transfer" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Stabilisation, Retrieval & Handover
              </h2>
              <ExamMappingBadges exams={[Exam.FFICM, Exam.EDIC]} />
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
                    <li>Standards for staffing, escalation and family-centred care follow the national paediatric critical care quality standards <InlineRef topicId={TOPIC_ID} refLabel="PCCS Standards 2021" />.</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Related pages:{" "}
                <Link to="/intensive-care/paediatric-icu" className="text-icu underline underline-offset-4">Paediatric Intensive Care</Link>
                {" · "}
                <Link to="/intensive-care/paediatric-flows" className="text-icu underline underline-offset-4">Paediatric ICU Management Flows</Link>
                {" · "}
                <Link to="/intensive-care/paediatric-withdrawal" className="text-icu underline underline-offset-4">Paediatric Withdrawal Flows</Link>
                {" · "}
                <Link to="/clinical/paediatric-core" className="text-icu underline underline-offset-4">Paediatric Core Essentials</Link>
              </p>
            </section>

            <ExamPitfallsCallout
              accent="icu"
              pitfalls={[
                "Do not treat every collapsed neonate as sepsis alone — check glucose, ammonia, pre/post-ductal saturations and femoral pulses before settling on a diagnosis.",
                "Do not withhold prostaglandin E1 waiting for an echocardiogram in a shocked neonate with suspected duct-dependent circulation; prepare for apnoea instead.",
                "Do not repeat large fluid boluses in a child with hepatomegaly, a gallop or a raised troponin — this is cardiogenic, not hypovolaemic, shock.",
                "Do not give the emergency metabolic screen after the crisis has resolved; the urine organic acids and ketones must be taken while the child is unwell.",
                "Do not give hydrocortisone before taking cortisol and 17-hydroxyprogesterone if the child's condition allows the few seconds it takes.",
                "Do not treat paediatric bradycardia with drugs before oxygenation and effective ventilation — hypoxia is the usual cause.",
                "Do not give adenosine slowly through a distal cannula and conclude the rhythm is not SVT; and never use verapamil in an infant.",
                "Do not label acute focal deficit in a child as migraine or a functional disorder without imaging — and in sickle cell disease think exchange transfusion immediately.",
                "Do not delay a safeguarding referral to gather more evidence, and do not let the safeguarding process delay resuscitation, imaging or transfer.",
              ]}
            />
            <TopicFaqs faqs={faqs} />
          </div>
        </ExamSection>
      }
    />
  );
};

export default PaediatricEmergenciesTopic;
