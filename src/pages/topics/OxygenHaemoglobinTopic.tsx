import { SectionLayout } from "@/components/SectionLayout";
import { OxygenDissociationCurve } from "@/components/diagrams/OxygenDissociationCurve";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { oxygenHaemoglobinQuiz } from "@/data/quizzes";

const OxygenHaemoglobinTopic = () => {
  return (
    <SectionLayout
      title="Oxygen-Haemoglobin Dissociation Curve"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            The oxygen-haemoglobin dissociation curve (ODC) describes the relationship between the partial pressure of
            oxygen (PaO₂) and the percentage saturation of haemoglobin with oxygen (SaO₂). Its sigmoid shape arises from
            the cooperative binding of oxygen to the four haem groups of the haemoglobin molecule.
          </p>
          <p className="text-sm text-muted-foreground italic mt-2">
            Reference: Cross M, Plunkett E. Physics, Pharmacology and Physiology for Anaesthetists, 2nd edition. Cambridge University Press, 2014.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Normal Curve</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The sigmoid shape reflects cooperativity: binding of the first O₂ molecule facilitates subsequent binding
            (the T→R conformational change). The P₅₀ — the PaO₂ at which haemoglobin is 50% saturated — is normally
            26.7 mmHg (3.5 kPa).
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <OxygenDissociationCurve showShifts={false} />
          </div>
          <p className="text-foreground/90 leading-relaxed mt-4">
            Key points on the curve: at a PaO₂ of 13.3 kPa (100 mmHg), SaO₂ ≈ 97.5%. At the venous point (PaO₂ ~5.3 kPa
            / 40 mmHg), SaO₂ ≈ 75%. The steep portion of the curve between 20-60 mmHg allows efficient oxygen unloading
            in the tissues.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Factors Shifting the Curve</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The curve can shift left (increased affinity, harder to offload O₂) or right (decreased affinity, easier to
            offload O₂). Click the buttons below to visualise these shifts.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <OxygenDissociationCurve showShifts={true} />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <h3 className="font-semibold text-primary text-sm mb-2">← Left Shift (↑ Affinity)</h3>
              <ul className="text-sm text-foreground/80 space-y-1">
                <li>• ↓ Temperature (hypothermia)</li>
                <li>• ↓ PaCO₂ / Alkalosis (↑ pH)</li>
                <li>• ↓ 2,3-DPG</li>
                <li>• Fetal haemoglobin (HbF)</li>
                <li>• Carbon monoxide (COHb)</li>
                <li>• Methaemoglobin</li>
              </ul>
            </div>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <h3 className="font-semibold text-destructive text-sm mb-2">Right Shift → (↓ Affinity)</h3>
              <ul className="text-sm text-foreground/80 space-y-1">
                <li>• ↑ Temperature (fever)</li>
                <li>• ↑ PaCO₂ / Acidosis (↓ pH) — Bohr effect</li>
                <li>• ↑ 2,3-DPG</li>
                <li>• Sickle haemoglobin (HbS)</li>
                <li>• Anaemia / chronic hypoxia</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Bohr Effect</h2>
          <p className="text-foreground/90 leading-relaxed">
            The Bohr effect describes the rightward shift of the ODC caused by increased CO₂ and H⁺ concentration. In
            metabolically active tissues, CO₂ production lowers pH locally, promoting O₂ release from haemoglobin exactly
            where it is needed most. Conversely, in the lungs, CO₂ excretion raises pH, shifting the curve left and
            promoting O₂ loading.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Clinical Significance</h2>
          <p className="text-foreground/90 leading-relaxed">
            The flat upper portion of the curve means that even moderate drops in PaO₂ from normal values cause minimal
            desaturation — a physiological safety margin. However, once PaO₂ falls below ~8 kPa (60 mmHg), the steep
            portion means saturation drops rapidly — explaining the sudden clinical deterioration seen in hypoxic patients.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            In anaesthetic practice, the curve's shape explains why SpO₂ is a late indicator of hypoxaemia during
            pre-oxygenation and apnoea: PaO₂ may fall considerably before SpO₂ changes.
          </p>
        </section>
      </div>

      <KeyLearningPoints points={[
        "The ODC is sigmoid due to cooperative O₂ binding to haemoglobin's four haem groups.",
        "P₅₀ is normally 26.7 mmHg (3.5 kPa) — the PaO₂ at which Hb is 50% saturated.",
        "Right shift (↓ affinity): ↑ temp, ↑ CO₂, ↓ pH, ↑ 2,3-DPG — aids tissue O₂ delivery.",
        "Left shift (↑ affinity): ↓ temp, ↓ CO₂, ↑ pH, HbF, COHb — impairs O₂ offloading.",
        "The Bohr effect facilitates O₂ unloading at tissues and loading at the lungs.",
        "The flat upper portion provides a safety margin; the steep middle section means SpO₂ drops rapidly once PaO₂ falls below ~60 mmHg.",
        "SpO₂ is a late indicator of falling PaO₂ — pre-oxygenation provides a reservoir on the flat part of the curve."
      ]} />
      <QuizSection questions={oxygenHaemoglobinQuiz} />
      <TopicCompletionToggle topicId="oxygen-haemoglobin" topicTitle="Oxygen-Haemoglobin Dissociation" />
    </SectionLayout>
  );
};

export default OxygenHaemoglobinTopic;
