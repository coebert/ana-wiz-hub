import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { endocrinePhysiologyQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import HPAAxisDiagram from "@/components/diagrams/HPAAxisDiagram";

const EndocrinePhysiologyTopic = () => {
  return (
    <SectionLayout title="Endocrine Physiology" subtitle="FRCA Primary & Final — Physiology" backPath="/physiology" backLabel="Physiology" accentColor="text-physiology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hypothalamic-Pituitary Axis</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">The hypothalamus controls the anterior pituitary via releasing/inhibiting hormones through the hypothalamic-hypophyseal portal system. The posterior pituitary stores and releases ADH and oxytocin (synthesised in hypothalamic nuclei).</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Hormone</th>
                <th className="text-left py-2 text-foreground font-semibold">Source</th>
                <th className="text-left py-2 text-foreground font-semibold">Anaesthetic Relevance</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ACTH</td><td>Anterior pituitary</td><td>Stimulates cortisol. ↑ in stress response. Suppressed by exogenous steroids</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ADH (vasopressin)</td><td>Posterior pituitary</td><td>V₁ (vasoconstriction), V₂ (aquaporin-2, water reabsorption). Used in septic shock, DI</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">TSH</td><td>Anterior pituitary</td><td>Stimulates T₃/T₄. Thyroid storm is a perioperative emergency</td></tr>
                <tr><td className="py-2 font-medium text-foreground">GH</td><td>Anterior pituitary</td><td>Acromegaly: difficult airway, OSA, ↑ cardiac disease</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Adrenal Glands</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Cortex — Zona glomerulosa", value: "Mineralocorticoids (aldosterone): Na⁺ retention, K⁺ excretion via ENaC. Regulated by RAAS and K⁺." },
              { label: "Cortex — Zona fasciculata", value: "Glucocorticoids (cortisol): ↑ glucose, anti-inflammatory, immunosuppression, permissive for catecholamines. Diurnal rhythm (peak 8am)." },
              { label: "Cortex — Zona reticularis", value: "Androgens (DHEA, androstenedione). Minor role in adults." },
              { label: "Medulla", value: "Catecholamines: 80% adrenaline, 20% noradrenaline. Modified postganglionic sympathetic neurones. Phaeochromocytoma: episodic hypertension, α-blockade before β-blockade." },
            ].map(item => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Thyroid & Calcium Homeostasis</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Thyroid hormones</strong>: T₄ (prohormone) → T₃ (active, intracellular receptors). ↑ BMR, ↑ O₂ consumption, ↑ CO. 99% protein-bound (TBG). Hypothyroidism: ↑ sensitivity to anaesthetics, ↓ MAC</li>
            <li><strong>Thyroid storm</strong>: tachycardia, hyperthermia, agitation. Treatment: β-blocker, PTU/carbimazole, iodine, hydrocortisone, cooling</li>
            <li><strong>Calcium</strong>: normal 2.2–2.6 mmol/L. ~50% ionised (active), ~40% albumin-bound. PTH ↑ Ca²⁺ (bone resorption, renal reabsorption, ↑ 1,25(OH)₂D₃). Calcitonin ↓ Ca²⁺ (minor role)</li>
            <li><strong>Hypocalcaemia</strong>: post-thyroidectomy (parathyroid damage), massive transfusion (citrate), ↑ QTc, tetany, Chvostek's/Trousseau's signs</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Insulin & Glucose</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Insulin</strong>: β-cells of islets of Langerhans. Anabolic: ↑ glucose uptake (GLUT4), glycogenesis, lipogenesis, protein synthesis. Released in response to glucose, amino acids, incretins (GLP-1)</li>
            <li><strong>Glucagon</strong>: α-cells. Counter-regulatory: glycogenolysis, gluconeogenesis, lipolysis</li>
            <li><strong>Stress response</strong>: surgery → ↑ cortisol, ↑ catecholamines, ↑ glucagon, ↑ GH → insulin resistance → hyperglycaemia. Target glucose 6-10 mmol/L perioperatively</li>
            <li><strong>Perioperative management</strong>: VRIII (variable rate intravenous insulin infusion) for diabetic patients unable to eat. Avoid hypoglycaemia (&lt;4 mmol/L) — brain injury risk</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Surgical Stress Response</h2>
          <p className="text-muted-foreground leading-relaxed">Surgical injury activates the HPA axis and sympathetic nervous system. Key features: ↑ cortisol, ↑ catecholamines, ↑ ADH, ↑ aldosterone, ↑ glucagon, ↑ GH, ↑ IL-6/TNF-α. Results in: hyperglycaemia, sodium/water retention, protein catabolism, immunosuppression. Attenuated by: regional anaesthesia (neuraxial blocks best), opioids, minimally invasive surgery, ERAS protocols.</p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Cortisol: diurnal rhythm (peak 8am), suppressed by exogenous steroids — perioperative steroid cover needed if HPA axis suppressed",
        "Phaeochromocytoma: α-blockade BEFORE β-blockade (phenoxybenzamine then propranolol/atenolol)",
        "T₃ is the active thyroid hormone (T₄ is prohormone). Hypothyroid patients have ↑ sensitivity to anaesthetics",
        "Calcium: ~50% ionised. Post-thyroidectomy hypocalcaemia from parathyroid damage is a key complication",
        "Surgical stress response: ↑ cortisol, catecholamines, ADH → hyperglycaemia, Na⁺/H₂O retention. Attenuated by regional anaesthesia",
        "Perioperative glucose target 6-10 mmol/L. Hypoglycaemia (<4 mmol/L) is more dangerous than moderate hyperglycaemia",
      ]} />
      <QuizSection questions={endocrinePhysiologyQuestions} />
      <ReferencesList topicId="endocrine-physiology" />
      <SeeAlso topicId="endocrine-physiology" />
        <TopicCompletionToggle topicId="endocrine-physiology" topicTitle="Endocrine Physiology" />
    </SectionLayout>
  );
};

export default EndocrinePhysiologyTopic;
