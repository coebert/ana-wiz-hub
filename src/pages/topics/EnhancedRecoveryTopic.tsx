import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { enhancedRecoveryQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const EnhancedRecoveryTopic = () => {
  return (
    <SectionLayout title="Enhanced Recovery (ERAS)" subtitle="FRCA / FFICM — Perioperative Medicine" backPath="/perioperative" backLabel="Perioperative Medicine" accentColor="text-perioperative">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ERAS Principles</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Enhanced Recovery After Surgery is a multimodal, evidence-based perioperative care pathway that reduces surgical stress, maintains physiological function, and accelerates recovery.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Preoperative</p>
              <p className="text-sm text-muted-foreground mt-1">Patient education & counselling. Optimisation (anaemia, nutrition, fitness — prehabilitation). Carbohydrate loading (maltodextrin drink 2h pre-op). No prolonged fasting (clear fluids 2h, solids 6h).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Intraoperative</p>
              <p className="text-sm text-muted-foreground mt-1">Short-acting anaesthetics. Regional/neuraxial analgesia. GDFT. Normothermia. Minimally invasive surgery. Avoid drains/NG tubes where possible. Antiemetic prophylaxis.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Postoperative</p>
              <p className="text-sm text-muted-foreground mt-1">Early oral intake (day 0). Early mobilisation (day 0). Multimodal opioid-sparing analgesia. Remove catheters/lines early. Planned discharge criteria (not time-based).</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Surgical Stress Response</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Surgery triggers neuroendocrine, metabolic, and inflammatory responses. ERAS aims to attenuate these:
          </p>
          <div className="space-y-2">
            {[
              { response: "Neuroendocrine", effect: "↑ Cortisol, catecholamines, ADH, aldosterone. Causes: Na⁺/H₂O retention, hyperglycaemia, insulin resistance, protein catabolism." },
              { response: "Inflammatory", effect: "IL-6, TNF-α, CRP rise. Proportional to tissue injury (minimally invasive surgery attenuates). Contributes to organ dysfunction." },
              { response: "Metabolic", effect: "Insulin resistance (up to 14 days post-major surgery). Carbohydrate loading + epidural analgesia reduce insulin resistance." },
              { response: "Immunological", effect: "Cell-mediated immunity suppressed. T-cell function impaired. Increased infection susceptibility. Blood transfusion adds immunosuppression (TRIM effect)." },
            ].map((r) => (
              <div key={r.response} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{r.response}</p>
                <p className="text-sm text-muted-foreground mt-1">{r.effect}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Prehabilitation</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Exercise</p>
              <p className="text-sm text-muted-foreground mt-1">Structured exercise programme 4–6 weeks pre-surgery. Improves cardiorespiratory fitness (AT/VO₂ peak). Reduces postoperative complications. Supervised, individualised, multimodal.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Anaemia Optimisation</p>
              <p className="text-sm text-muted-foreground mt-1">Iron deficiency: IV iron (ferric carboxymaltose — 1g single dose). Target Hb {'>'} 130 g/L (men) or {'>'} 120 g/L (women). NICE NG24. Reduces transfusion rates by 30–50%.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postoperative Nausea & Vomiting (PONV)</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Apfel Score (Risk Factors)</p>
              <p className="text-sm text-muted-foreground mt-1">Female, non-smoker, history of PONV/motion sickness, postoperative opioids. 0 factors = 10%, 4 factors = 80% risk.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Multimodal Prophylaxis</p>
              <p className="text-sm text-muted-foreground mt-1">Ondansetron (5-HT₃), dexamethasone 4–8 mg (at induction), cyclizine (H₁), droperidol. TIVA reduces PONV vs volatile. Each antiemetic from different class reduces risk by 25%.</p>
            </div>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "ERAS reduces length of stay by 30% and complications by 40% across surgical specialties",
        "Carbohydrate loading 2h pre-op reduces insulin resistance and improves patient well-being",
        "Prehabilitation: structured exercise 4–6 weeks pre-op improves fitness and outcomes",
        "Anaemia optimisation: IV iron if deficient, target Hb >130 (men) / >120 (women) — reduces transfusion",
        "Apfel PONV score: female, non-smoker, PONV history, opioids — multimodal prophylaxis for ≥2 risk factors",
      ]} />

      <QuizSection questions={enhancedRecoveryQuestions} />
      <ReferencesList topicId="enhanced-recovery" />

      <SeeAlso topicId="enhanced-recovery" />
        <TopicCompletionToggle topicId="enhanced-recovery" topicTitle="Enhanced Recovery (ERAS)" />
    </SectionLayout>
  );
};

export default EnhancedRecoveryTopic;
