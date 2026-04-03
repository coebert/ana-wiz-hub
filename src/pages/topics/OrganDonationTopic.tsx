import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { organDonationQuestions } from "@/data/quizzes";

const OrganDonationTopic = () => {
  return (
    <SectionLayout title="Organ Donation" subtitle="FRCA / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Types of Organ Donation</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Donation after Brainstem Death (DBD)</p>
              <p className="text-sm text-muted-foreground mt-1">Brainstem death confirmed by 2 sets of tests. Time of death = completion of first set. Organ retrieval follows. Better graft outcomes (less warm ischaemia). Accounts for ~40% of deceased donors in UK.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Donation after Circulatory Death (DCD)</p>
              <p className="text-sm text-muted-foreground mt-1">Treatment withdrawal → circulatory arrest → 5 minutes observation (hands-off) → death confirmed → retrieval. Now majority of UK deceased donations. Maastricht categories (III = controlled, most common in UK).</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Physiological Management of the Organ Donor</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Brainstem death causes massive physiological derangement. Optimal donor management maximises organ quality and transplant outcomes.
          </p>
          <div className="space-y-2">
            {[
              { system: "Cardiovascular", goal: "MAP {'>'} 60 mmHg. Autonomic storm → vasoplegia. Vasopressin 0.5–4 units/hr (treats DI and hypotension). Noradrenaline if needed. Avoid high-dose inotropes — direct cardiac toxicity." },
              { system: "Respiratory", goal: "Lung-protective ventilation (VT 6–8 ml/kg, PEEP 5–10). Target PaO₂/FiO₂ {'>'} 300 for lung retrieval. Recruitment manoeuvres. Bronchoscopy to clear secretions." },
              { system: "Endocrine", goal: "Diabetes insipidus in ~65% (posterior pituitary failure). DDAVP 1–2 µg IV. Thyroid hormone replacement (T3/T4) — controversial but commonly used. Methylprednisolone 15 mg/kg." },
              { system: "Temperature", goal: "Hypothermia (loss of thermoregulation). Active warming to 35–37°C. Avoid hyperthermia." },
              { system: "Metabolic", goal: "Hypernatraemia (from DI) — target Na⁺ {'<'} 155 mmol/L. Maintain glucose 4–10 mmol/L. Correct electrolytes." },
            ].map((s) => (
              <div key={s.system} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{s.system}</span>
                <span className="text-sm text-muted-foreground">{s.goal}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Legal & Ethical Framework (UK)</h2>
          <div className="space-y-2">
            {[
              { point: "Deemed Consent (2020)", detail: "England, Scotland, Wales: opt-out system. Adults are deemed to have consented unless they opted out, appointed a representative, or are in an excluded group." },
              { point: "Specialist Nurse for Organ Donation (SN-OD)", detail: "Must be involved in all potential donation conversations. Family approach rate is critical — collaborative requesting improves consent." },
              { point: "Excluded groups", detail: "Children under 18, those lacking capacity who never had capacity, temporary UK residents (<12 months), those who opted out on the NHS Organ Donor Register." },
              { point: "Coroner/Procurator Fiscal", detail: "Must be consulted in reportable deaths. Coroner can refuse donation but cannot consent to it. Usually allows unless organs are needed for forensic examination." },
            ].map((p) => (
              <div key={p.point} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{p.point}</p>
                <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "DCD now accounts for the majority of deceased organ donations in the UK",
        "DBD: 5-minute hands-off period after circulatory arrest before death is confirmed",
        "Diabetes insipidus occurs in ~65% of DBD donors — treat with DDAVP + hypotonic fluids",
        "England, Scotland, Wales use deemed (opt-out) consent since 2020",
        "Donor management: vasopressin for DI + hypotension, lung-protective ventilation, methylprednisolone",
      ]} />

      <QuizSection questions={organDonationQuestions} />
      <TopicCompletionToggle topicId="organ-donation" topicTitle="Organ Donation" />
    </SectionLayout>
  );
};

export default OrganDonationTopic;
