import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { icuNutritionQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const IcuNutritionTopic = () => {
  return (
    <SectionLayout title="Nutrition in Critical Care" subtitle="FRCA / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Metabolic Response to Critical Illness</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Critical illness induces a catabolic state with hyperglycaemia, protein catabolism, and lipolysis. The metabolic response has two phases:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Acute/Ebb Phase (0–48h)</p>
              <p className="text-sm text-muted-foreground mt-1">Sympathetic activation, stress hormones (cortisol, catecholamines, glucagon). Insulin resistance. Endogenous glucose production. Avoid overfeeding — trophic feeds only.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Flow/Catabolic Phase (48h–weeks)</p>
              <p className="text-sm text-muted-foreground mt-1">Hypermetabolism, muscle wasting (up to 1 kg/day). Negative nitrogen balance. Gradual increase to target calories. Recovery phase: anabolism, rehabilitation.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Enteral vs Parenteral Nutrition</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                  <th className="text-left py-2 text-foreground font-semibold">Enteral (EN)</th>
                  <th className="text-left py-2 text-foreground font-semibold">Parenteral (PN)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Timing</td><td>Within 48h of ICU admission</td><td>Consider if EN fails/contraindicated by day 3–7</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Benefits</td><td>Maintains gut integrity, reduces bacterial translocation, cheaper</td><td>Reliable calorie delivery, no GI requirement</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Risks</td><td>Aspiration, diarrhoea, refeeding syndrome</td><td>Line sepsis, hepatic steatosis, overfeeding, metabolic complications</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Access</td><td>NG/NJ tube. Post-pyloric if high aspirates</td><td>CVC — dedicated lumen</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Calorie & Protein Targets</h2>
          <div className="space-y-2">
            {[
              { target: "Energy", detail: "20–25 kcal/kg/day (acute phase: start low, increase over 3–7 days). Indirect calorimetry is gold standard. Avoid overfeeding (lipogenesis, hyperglycaemia, ↑CO₂)." },
              { target: "Protein", detail: "1.2–2.0 g/kg/day (ESPEN guidelines). Higher in burns/trauma. Protein is the most important macronutrient for ICU outcomes. Urinary nitrogen for balance." },
              { target: "Glucose", detail: "Target 6–10 mmol/L (NICE-SUGAR trial). Tight control (4.5–6) harmful — increased hypoglycaemia and mortality." },
            ].map((t) => (
              <div key={t.target} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{t.target}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Refeeding Syndrome</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Life-threatening shifts in fluids and electrolytes when nutrition is restarted after prolonged starvation. Insulin surge drives K⁺, PO₄³⁻, and Mg²⁺ intracellularly.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Risk Factors (NICE CG32)</p>
              <p className="text-sm text-muted-foreground mt-1">BMI {'<'} 18.5, unintentional weight loss {'>'} 10% in 3–6 months, little/no intake for {'>'} 5 days, low K⁺/PO₄/Mg²⁺ pre-feeding, alcohol misuse, chemotherapy.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Prevention & Management</p>
              <p className="text-sm text-muted-foreground mt-1">Start at 10 kcal/kg/day (5 kcal/kg if extreme risk). Thiamine 200–300 mg before feeding. Replace electrolytes before and during. Monitor K⁺, PO₄, Mg²⁺ daily. Increase calories gradually over 4–7 days.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Nutrition Trials</h2>
          <div className="space-y-2">
            {[
              { trial: "NICE-SUGAR (2009)", result: "Intensive glucose control (4.5–6 mmol/L) increased mortality vs conventional (6–10 mmol/L). Standard: target 6–10." },
              { trial: "EPaNIC (2011)", result: "Late PN (day 8) vs early PN (day 3) — late PN reduced infections, shortened ICU stay. Do not start PN early." },
              { trial: "TARGET (2018)", result: "Energy-dense (1.5 kcal/ml) vs standard (1.0) enteral feed — no difference in 90-day mortality. More is not better." },
              { trial: "CALORIES (2014)", result: "Early PN vs early EN in ICU — no difference in 30-day mortality. EN remains preferred (gut integrity, lower cost)." },
            ].map((t) => (
              <div key={t.trial} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{t.trial}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Start enteral nutrition within 48h of ICU admission — maintains gut integrity, reduces translocation",
        "NICE-SUGAR: target glucose 6–10 mmol/L, tight control increases mortality",
        "Protein 1.2–2.0 g/kg/day is the most important macronutrient target in ICU",
        "Refeeding syndrome: thiamine before feeding, start 10 kcal/kg/day, monitor K⁺/PO₄/Mg²⁺",
        "EPaNIC: late parenteral nutrition (day 8) superior to early PN — avoid rushing to PN",
      ]} />

      <QuizSection questions={icuNutritionQuestions} />
      <ReferencesList topicId="icu-nutrition" />

      <TopicCompletionToggle topicId="icu-nutrition" topicTitle="Nutrition in Critical Care" />
    </SectionLayout>
  );
};

export default IcuNutritionTopic;
