import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { autonomicNervousQuiz } from "@/data/quizzes";
import { ANSDiagram } from "@/components/diagrams/ANSDiagram";
import { ReferencesList } from "@/components/ReferencesList";

const AutonomicNervousTopic = () => {
  return (
    <SectionLayout
      title="Autonomic Nervous System"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            The autonomic nervous system (ANS) controls involuntary functions including heart rate, blood pressure, bronchial
            tone, gut motility, and glandular secretion. Understanding sympathetic and parasympathetic pathways, receptors,
            and their pharmacological manipulation is essential for anaesthetic practice.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Sympathetic vs Parasympathetic</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Compare the two divisions of the ANS and their effects on key organ systems.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <ANSDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Sympathetic Nervous System</h2>
          <p className="text-foreground/90 leading-relaxed">
            Thoracolumbar outflow (T1–L2). Short preganglionic neurones (ACh at nicotinic receptors in paravertebral chain
            or prevertebral ganglia) → long postganglionic neurones releasing <strong>noradrenaline</strong> (exception:
            sweat glands = ACh, adrenal medulla = adrenaline/noradrenaline directly into blood).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Adrenoceptors</strong>: α₁ (vascular smooth muscle contraction, mydriasis), α₂ (presynaptic inhibition,
            sedation — clonidine, dexmedetomidine), β₁ (↑HR, ↑contractility, ↑renin), β₂ (bronchodilation, vasodilation,
            uterine relaxation, glycogenolysis), β₃ (lipolysis, bladder relaxation).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Parasympathetic Nervous System</h2>
          <p className="text-foreground/90 leading-relaxed">
            Craniosacral outflow (CN III, VII, IX, X + S2–S4). Long preganglionic neurones → short postganglionic neurones.
            Both pre- and postganglionic neurotransmitter is <strong>acetylcholine</strong>. The vagus nerve (CN X) provides
            ~75% of parasympathetic outflow.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Muscarinic receptors</strong>: M₁ (gastric acid secretion — pirenzepine), M₂ (heart — ↓HR, ↓conduction),
            M₃ (smooth muscle contraction, glandular secretion, bronchoconstriction). <strong>Atropine</strong> and
            <strong> glycopyrrolate</strong> are non-selective muscarinic antagonists used in anaesthesia.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Neurotransmitter Synthesis & Metabolism</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Noradrenaline synthesis</strong>: Tyrosine → DOPA (tyrosine hydroxylase, rate-limiting) → Dopamine →
            Noradrenaline → Adrenaline (in adrenal medulla, PNMT). Termination: reuptake (uptake-1 into nerve terminal,
            uptake-2 into effector cells) &gt; MAO/COMT metabolism.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>ACh synthesis</strong>: Choline + Acetyl-CoA → ACh (choline acetyltransferase). Hydrolysed by
            acetylcholinesterase (true ChE) and butyrylcholinesterase (pseudocholinesterase/plasma ChE).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Autonomic Reflexes</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Baroreceptor reflex</strong>: carotid sinus (CN IX) and aortic arch (CN X) → NTS in medulla → adjusts
            sympathetic/parasympathetic outflow to maintain BP. Reset in chronic hypertension.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Oculocardiac reflex</strong>: pressure on globe → CN V₁ afferent → CN X efferent → bradycardia.
            Treat with stopping stimulus, atropine/glycopyrrolate. <strong>Bezold-Jarisch reflex</strong>: LV
            mechanoreceptors → vagal activation → bradycardia + vasodilation. May occur during neuraxial anaesthesia or
            haemorrhage.
          </p>
        </section>
      </div>

      <KeyLearningPoints points={[
        "Sympathetic: thoracolumbar T1-L2, short pre-/long postganglionic. Postganglionic NT = noradrenaline (except sweat glands = ACh).",
        "Parasympathetic: craniosacral (III, VII, IX, X, S2-4), long pre-/short postganglionic. NT = ACh at both synapses.",
        "Adrenoceptors: α₁ (vasoconstriction), α₂ (presynaptic inhibition), β₁ (↑HR, ↑inotropy), β₂ (bronchodilation).",
        "Muscarinic receptors: M₁ (gastric), M₂ (cardiac — ↓HR), M₃ (smooth muscle contraction, secretions).",
        "NA synthesis: Tyrosine → DOPA → Dopamine → NA → Adrenaline. Rate-limiting = tyrosine hydroxylase.",
        "Baroreceptor reflex: carotid sinus (IX) + aortic arch (X) → NTS → sympathetic/parasympathetic balance."
      ]} />
      <QuizSection questions={autonomicNervousQuiz} />
      <ReferencesList topicId="autonomic-nervous" />

      <TopicCompletionToggle topicId="autonomic-nervous" topicTitle="Autonomic Nervous System" />
    </SectionLayout>
  );
};

export default AutonomicNervousTopic;
