import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { corticosteroidsQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const CorticosteroidsTopic = () => {
  return (
    <SectionLayout title="Corticosteroids & Endocrine Pharmacology" subtitle="FRCA Primary & Final — Pharmacology" backPath="/pharmacology" backLabel="Pharmacology" accentColor="text-pharmacology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Corticosteroid Pharmacology</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Corticosteroids bind intracellular receptors → nuclear translocation → gene transcription modulation. Anti-inflammatory: ↓ phospholipase A₂ (via lipocortin-1), ↓ COX-2, ↓ cytokines, ↓ leukocyte migration.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Steroid</th>
                <th className="text-left py-2 text-foreground font-semibold">Glucocorticoid Potency</th>
                <th className="text-left py-2 text-foreground font-semibold">Mineralocorticoid</th>
                <th className="text-left py-2 text-foreground font-semibold">Duration</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Hydrocortisone</td><td>1</td><td>1</td><td>Short (8-12h)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Prednisolone</td><td>4</td><td>0.8</td><td>Intermediate (12-36h)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Methylprednisolone</td><td>5</td><td>0.5</td><td>Intermediate</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Dexamethasone</td><td>25</td><td>0</td><td>Long (36-72h)</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Fludrocortisone</td><td>10</td><td>125</td><td>Intermediate (mineralocorticoid replacement)</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Perioperative Steroid Cover</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>HPA suppression</strong>: likely if prednisolone ≥5mg/day for &gt;4 weeks (or equivalent), Cushing's appearance, or recent cessation of long-term steroids</li>
            <li><strong>Minor surgery</strong>: usual morning dose + hydrocortisone 25mg at induction</li>
            <li><strong>Moderate surgery</strong>: usual dose + hydrocortisone 25mg at induction then 25mg 8-hourly for 24h</li>
            <li><strong>Major surgery</strong>: usual dose + hydrocortisone 25mg at induction then 25mg 8-hourly for 48-72h</li>
            <li>Addisonian crisis: hypotension refractory to fluids/vasopressors, hypoglycaemia, hyperkalaemia, hyponatraemia. Treatment: IV hydrocortisone 100mg stat</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Insulin Preparations</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Type</th>
                <th className="text-left py-2 text-foreground font-semibold">Onset</th>
                <th className="text-left py-2 text-foreground font-semibold">Peak</th>
                <th className="text-left py-2 text-foreground font-semibold">Duration</th>
                <th className="text-left py-2 text-foreground font-semibold">Example</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Rapid-acting</td><td>15 min</td><td>1-2h</td><td>3-5h</td><td>Novorapid, Humalog</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Short-acting</td><td>30 min</td><td>2-4h</td><td>6-8h</td><td>Actrapid (used in VRIII)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Intermediate</td><td>1-2h</td><td>4-12h</td><td>16-24h</td><td>Insulatard (isophane/NPH)</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Long-acting</td><td>1-2h</td><td>Flat</td><td>24h+</td><td>Lantus (glargine), Levemir</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Thyroid Pharmacology</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Carbimazole</strong>: prodrug of methimazole. Inhibits thyroid peroxidase (iodination/coupling). Takes 4-6 weeks for full effect. Risk: agranulocytosis</li>
            <li><strong>Propylthiouracil (PTU)</strong>: also inhibits peripheral T₄→T₃ conversion. Used in thyroid storm and first trimester pregnancy</li>
            <li><strong>Lugol's iodine</strong>: reduces thyroid vascularity pre-surgery (Wolff-Chaikoff effect). Given 10-14 days preoperatively</li>
            <li><strong>Levothyroxine</strong>: T₄ replacement in hypothyroidism. Long half-life (~7 days) — can omit on day of surgery</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Dexamethasone: 25× glucocorticoid potency of hydrocortisone, zero mineralocorticoid effect, long duration (36-72h)",
        "HPA suppression likely if ≥5mg prednisolone/day for >4 weeks — perioperative steroid cover needed",
        "Addisonian crisis: refractory hypotension + hypoglycaemia + hyperkalaemia. Treat with IV hydrocortisone 100mg",
        "Actrapid (soluble insulin) is used in VRIII. Continue long-acting basal insulin (Lantus) perioperatively",
        "Carbimazole inhibits thyroid peroxidase; takes 4-6 weeks. Risk: agranulocytosis",
        "Corticosteroid mechanism: intracellular receptor → gene transcription. ↓ phospholipase A₂ via lipocortin-1",
      ]} />
      <QuizSection questions={corticosteroidsQuestions} />
      <ReferencesList topicId="corticosteroids" />
      <TopicCompletionToggle topicId="corticosteroids" topicTitle="Corticosteroids &amp; Endocrine Pharmacology" />
    </SectionLayout>
  );
};

export default CorticosteroidsTopic;
