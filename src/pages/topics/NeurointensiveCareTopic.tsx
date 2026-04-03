import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { neurointensiveCareQuestions } from "@/data/quizzes";

const NeurointensiveCareTopic = () => {
  return (
    <SectionLayout title="Neurointensive Care" subtitle="FRCA / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Traumatic Brain Injury (TBI)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Primary injury occurs at impact (contusion, DAI, haematoma). Secondary injury (hypoxia, hypotension, pyrexia, hyperglycaemia) is preventable and the focus of ICU management.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Target</th>
                  <th className="text-left py-2 text-foreground font-semibold">Goal</th>
                  <th className="text-left py-2 text-foreground font-semibold">Rationale</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ICP</td><td>&lt;22 mmHg</td><td>BTF guidelines (4th edition). Higher thresholds associated with worse outcomes.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CPP</td><td>60–70 mmHg</td><td>Below 60: ischaemia risk. Above 70: no additional benefit, risk of ARDS (Lund concept).</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">PaCO₂</td><td>4.5–5.0 kPa</td><td>Normocapnia. Prophylactic hyperventilation harmful. Brief hyperventilation only for acute herniation.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Temperature</td><td>36–37°C</td><td>Pyrexia increases CMRO₂ by 7% per °C. Eurotherm: therapeutic hypothermia harmful in TBI.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Glucose</td><td>6–10 mmol/L</td><td>Avoid hypoglycaemia and hyperglycaemia — both worsen outcomes.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Status Epilepticus</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Continuous seizure ≥5 minutes or ≥2 seizures without regaining consciousness. Medical emergency — time-critical escalation.
          </p>
          <div className="space-y-2">
            {[
              { stage: "Stage 1 (0–5 min)", rx: "Benzodiazepine: IV lorazepam 0.1 mg/kg (max 4 mg), repeat once. Buccal midazolam or rectal diazepam if no IV access." },
              { stage: "Stage 2 (5–20 min)", rx: "IV levetiracetam 60 mg/kg (max 4.5g) OR IV phenytoin 20 mg/kg (max rate 50 mg/min, ECG monitoring) OR IV sodium valproate 40 mg/kg." },
              { stage: "Stage 3 (>30 min) — RSE", rx: "Refractory: intubate, propofol or midazolam or thiopentone infusion. Continuous EEG. Aim burst suppression." },
            ].map((s) => (
              <div key={s.stage} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{s.stage}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.rx}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Subarachnoid Haemorrhage (SAH)</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Grading</p>
              <p className="text-sm text-muted-foreground mt-1">WFNS grade (based on GCS ± focal deficit). Fisher grade (CT blood pattern — predicts vasospasm). Hunt & Hess for clinical grade.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Complications</p>
              <p className="text-sm text-muted-foreground mt-1">Rebleeding (highest risk day 1 — secure aneurysm early). Vasospasm (days 3–14, peak day 7 — nimodipine 60 mg 4-hourly, triple-H therapy). Hydrocephalus (EVD). Hyponatraemia (cerebral salt wasting vs SIADH).</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Brain Death & Brainstem Testing</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            UK criteria: known irreversible cause of brain damage. Exclude confounders (hypothermia &lt;34°C, drugs, metabolic/endocrine derangement). Two sets of tests by two senior doctors (one ≥5 years registered).
          </p>
          <div className="grid sm:grid-cols-3 gap-2">
            {[
              "Absent pupillary reflexes (CN II, III)",
              "Absent corneal reflexes (CN V, VII)",
              "Absent vestibulo-ocular reflexes (CN VIII)",
              "No motor response in cranial nerve distribution",
              "Absent gag reflex (CN IX, X)",
              "Absent cough reflex (CN X)",
              "Apnoea test: no respiratory effort with PaCO₂ >6.65 kPa",
            ].map((test) => (
              <div key={test} className="p-2 rounded border border-border text-xs text-muted-foreground">{test}</div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "TBI: prevent secondary injury — maintain CPP 60-70, ICP <22, normocapnia, normothermia, normoglycaemia",
        "Eurotherm trial: therapeutic hypothermia is harmful in TBI — do not use",
        "SAH vasospasm peaks day 7 — nimodipine is the only proven pharmacological intervention",
        "Status epilepticus: benzodiazepine → levetiracetam/phenytoin/valproate → RSI + thiopentone/propofol",
        "Brainstem death: 2 sets of tests, 2 senior doctors, exclude confounders, apnoea test PaCO₂ >6.65 kPa",
      ]} />

      <QuizSection questions={neurointensiveCareQuestions} />
      <TopicCompletionToggle topicId="neurointensive-care" topicTitle="Neurointensive Care" />
    </SectionLayout>
  );
};

export default NeurointensiveCareTopic;
