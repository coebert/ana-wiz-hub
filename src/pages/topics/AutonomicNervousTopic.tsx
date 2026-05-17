import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { WorkedExample } from "@/components/WorkedExamples";
import { autonomicNervousQuiz } from "@/data/quizzes";
import { ANSDiagram } from "@/components/diagrams/ANSDiagram";
import { ANSPathwayDiagram } from "@/components/diagrams/ANSPathwayDiagram";
import { CrossReferenceCallout } from "@/components/CrossReferenceCallout";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Contrast sympathetic and parasympathetic outflow, neurotransmitters and receptor types.",
  "Classify adrenoceptor and muscarinic receptor subtypes and link each to clinical effect.",
  "Outline noradrenaline and acetylcholine synthesis, release and termination.",
  "Recognise key autonomic reflexes (baroreceptor, oculocardiac, Bezold-Jarisch) and their anaesthetic implications.",
  "Apply ANS pharmacology to manage common perioperative scenarios (bradycardia, hypotension, bronchospasm).",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Oculocardiac reflex during squint surgery",
    scenario: (
      <>
        A 6-year-old undergoing squint correction develops sudden bradycardia (HR 40 bpm) when the surgeon hooks the
        medial rectus. What is the reflex arc and what should you do?
      </>
    ),
    working: (
      <>
        <strong>Afferent</strong>: long ciliary nerves → ophthalmic division of trigeminal (CN V₁) → Gasserian ganglion →
        main sensory nucleus of V → reticular formation.
        <br />
        <strong>Efferent</strong>: vagal motor fibres (CN X) → SA node → bradycardia ± asystole and AV block.
        <br />
        Ask the surgeon to stop traction immediately. The reflex usually fatigues with repeated stimulation. Ensure
        ventilation, depth and oxygenation are adequate — hypoxia/hypercapnia exacerbate vagal tone. If persistent or
        haemodynamically significant, give atropine 10–20 µg/kg IV (or glycopyrrolate 4–8 µg/kg IV).
      </>
    ),
    answer: (
      <>
        Stop surgical stimulus → check ventilation/depth → atropine 10–20 µg/kg IV if persistent. Discuss prophylactic
        antimuscarinic at induction with the team if multiple muscles are to be operated on.
      </>
    ),
  },
  {
    title: "Cholinergic crisis vs myasthenic crisis",
    scenario: (
      <>
        A myasthenia patient on pyridostigmine arrives with worsening weakness, salivation, diarrhoea, miosis and
        fasciculations. How do you distinguish over- from under-treatment, and how do you manage?
      </>
    ),
    working: (
      <>
        Both present with weakness. Discriminating features:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Cholinergic crisis</strong> (excess ACh): SLUDGE/BBB — Salivation, Lacrimation, Urination,
            Diarrhoea, GI upset, Emesis; Bradycardia, Bronchorrhoea, Bronchospasm; muscarinic excess + nicotinic
            fasciculations and weakness from depolarising block.</li>
          <li><strong>Myasthenic crisis</strong> (insufficient ACh): pure weakness, no muscarinic features, often
            triggered by infection, surgery or drugs (aminoglycosides, β-blockers).</li>
        </ul>
        Tensilon (edrophonium) test is now rarely used. Pragmatic approach: stop anticholinesterases for several hours,
        secure airway/ventilate as needed, treat triggers, and involve neurology — IVIg or plasma exchange for true
        myasthenic crisis.
      </>
    ),
    answer: (
      <>
        SLUDGE features ⇒ cholinergic crisis: stop pyridostigmine, support ventilation, atropine 0.5–1 mg IV for
        muscarinic features. Pure weakness without cholinergic features ⇒ myasthenic crisis: ITU admission, ventilatory
        support, IVIg/plasma exchange, treat trigger.
      </>
    ),
  },
];

const AutonomicNervousTopic = () => {
  return (
    <TopicTemplate
      title="Autonomic Nervous System"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="autonomic-nervous"
      topicTitle="Autonomic Nervous System"
      quizQuestions={autonomicNervousQuiz}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["CR_BK_05"] },
        diagrams: { exams: [Exam.PRIMARY, Exam.FINAL] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["OA_BK_06"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Power & Kam Ch.14"],
        workedExamples: ["BJA Educ 2007", "Ganong Ch.13"],
        keyPoints: ["Power & Kam Ch.14", "Ganong Ch.13"],
      }}
      diagrams={
        <>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <ANSDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <ANSPathwayDiagram />
          </div>
        </>
      }
      keyPoints={[
        "Sympathetic: thoracolumbar T1–L2; short pre-/long postganglionic. Postganglionic NT = noradrenaline (except sweat glands = ACh).",
        "Parasympathetic: craniosacral (III, VII, IX, X, S2–4); long pre-/short postganglionic. NT = ACh at both synapses.",
        "Adrenoceptors: α₁ (vasoconstriction), α₂ (presynaptic inhibition, sedation), β₁ (↑HR, ↑inotropy), β₂ (bronchodilation).",
        "Muscarinic receptors: M₁ (gastric), M₂ (cardiac — ↓HR), M₃ (smooth muscle contraction, secretions).",
        "NA synthesis: Tyrosine → DOPA → Dopamine → NA → Adrenaline. Rate-limiting enzyme = tyrosine hydroxylase.",
        "Baroreceptor reflex: carotid sinus (CN IX) + aortic arch (CN X) → NTS → autonomic balance. Resets in chronic hypertension.",
        "Oculocardiac reflex: V₁ afferent → X efferent → bradycardia. Stop stimulus, ventilate, atropine if persistent.",
      ]}
      coreConcepts={
        <>
          <ExamSection id="overview" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_05"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Overview</h2>
            <p className="text-foreground/90 leading-relaxed">
              The autonomic nervous system (ANS) controls involuntary functions including heart rate, blood pressure,
              bronchial tone, gut motility, and glandular secretion. Understanding sympathetic and parasympathetic
              pathways, receptors, and their pharmacological manipulation is essential for anaesthetic practice.
            </p>
          </ExamSection>

          <ExamSection id="sympathetic" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_05"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sympathetic Nervous System</h2>
            <p className="text-foreground/90 leading-relaxed">
              Thoracolumbar outflow (T1–L2). Short preganglionic neurones (ACh at nicotinic receptors in paravertebral
              chain or prevertebral ganglia) → long postganglionic neurones releasing <strong>noradrenaline</strong>
              {" "}(exceptions: sweat glands = ACh, adrenal medulla releases adrenaline/noradrenaline directly into blood).
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Adrenoceptors</strong>: α₁ (vascular smooth muscle contraction, mydriasis), α₂ (presynaptic
              inhibition, sedation — clonidine, dexmedetomidine), β₁ (↑HR, ↑contractility, ↑renin), β₂ (bronchodilation,
              vasodilation, uterine relaxation, glycogenolysis), β₃ (lipolysis, bladder relaxation).
            </p>
          </ExamSection>

          <ExamSection id="parasympathetic" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_05"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Parasympathetic Nervous System</h2>
            <p className="text-foreground/90 leading-relaxed">
              Craniosacral outflow (CN III, VII, IX, X + S2–S4). Long preganglionic neurones → short postganglionic
              neurones. Both pre- and postganglionic neurotransmitter is <strong>acetylcholine</strong>. The vagus
              nerve (CN X) provides ~75% of parasympathetic outflow.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Muscarinic receptors</strong>: M₁ (gastric acid secretion — pirenzepine), M₂ (heart — ↓HR,
              ↓conduction), M₃ (smooth muscle contraction, glandular secretion, bronchoconstriction). <strong>Atropine</strong>
              {" "}and <strong>glycopyrrolate</strong> are non-selective muscarinic antagonists used in anaesthesia;
              glycopyrrolate is quaternary so does not cross the BBB (no central anticholinergic syndrome).
            </p>
          </ExamSection>

          <ExamSection id="neurotransmitters" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_05"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Neurotransmitter Synthesis & Metabolism</h2>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Noradrenaline synthesis</strong>: Tyrosine → DOPA (tyrosine hydroxylase, rate-limiting) → Dopamine
              → Noradrenaline → Adrenaline (in adrenal medulla, PNMT). Termination: reuptake (uptake-1 into nerve
              terminal, uptake-2 into effector cells) &gt; MAO/COMT metabolism.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>ACh synthesis</strong>: Choline + Acetyl-CoA → ACh (choline acetyltransferase). Hydrolysed by
              acetylcholinesterase (true ChE, synapse) and butyrylcholinesterase (pseudocholinesterase/plasma ChE,
              hydrolyses suxamethonium and mivacurium).
            </p>
          </ExamSection>

          <ExamSection id="reflexes" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_06"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Autonomic Reflexes</h2>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Baroreceptor reflex</strong>: carotid sinus (CN IX) and aortic arch (CN X) → NTS in medulla →
              adjusts sympathetic/parasympathetic outflow to maintain BP. Reset in chronic hypertension; blunted by
              volatile anaesthetics.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Oculocardiac reflex</strong>: pressure on globe → CN V₁ afferent → CN X efferent → bradycardia.
              Treat with stopping stimulus, atropine/glycopyrrolate. <strong>Bezold-Jarisch reflex</strong>: LV
              mechanoreceptors → vagal activation → bradycardia + vasodilation. May occur during neuraxial anaesthesia
              or haemorrhage and explains paradoxical bradycardia with hypovolaemia.
            </p>
            <CrossReferenceCallout
              reason="The baroreceptor arc is one limb of an integrated short-, medium- and long-term BP control system (RAAS, ADH, ANP, renal pressure-natriuresis)."
              links={[{ topicId: "cardiac-electrophysiology", anchor: "bp-regulation", label: "Blood Pressure Regulation" }]}
            />
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>Oculocardiac reflex</strong> (V→X bradycardia) on traction of extraocular muscles — warn surgeon, treat with cessation, atropine if persistent.</>,
              <><strong>Autonomic dysreflexia</strong> in spinal injury &gt;T6 — noxious stimulus below the lesion triggers severe hypertension and reflex bradycardia. Treat trigger, head-up, vasodilator.</>,
              <><strong>Diabetic autonomic neuropathy</strong>: gastroparesis (aspiration risk), silent ischaemia, exaggerated BP swings on induction.</>,
              <><strong>Phaeochromocytoma</strong>: α-block before β-block; intra-op surges treated with short-acting agents (phentolamine, magnesium, esmolol).</>,
              <><strong>Anticholinergic syndrome</strong>: "hot as a hare, dry as a bone, mad as a hatter" — physostigmine reverses central effects but cardiac risk limits use.</>,
            ]}
          />
        </>
      }
    />
  );
};

export default AutonomicNervousTopic;
