import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { acuteLiverFailureQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const AcuteLiverFailureTopic = () => {
  return (
    <SectionLayout title="Acute Liver Failure" subtitle="FRCA / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Definition & Aetiology</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Acute liver failure (ALF): severe liver injury with coagulopathy (INR ≥1.5) and encephalopathy in a patient without pre-existing liver disease. Classified by jaundice-to-encephalopathy interval: hyperacute ({'<'}7 days), acute (7–28 days), subacute (28 days–6 months).
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { cause: "Paracetamol", detail: "Commonest cause in UK. Dose-dependent hepatotoxicity via NAPQI. Treat with N-acetylcysteine (NAC). Best prognosis." },
              { cause: "Viral Hepatitis", detail: "Hepatitis A, B (± D), E. HBV reactivation in immunosuppressed. Hepatitis C rarely causes ALF." },
              { cause: "Drug-induced", detail: "Isoniazid, statins, anti-epileptics, herbal remedies. Idiosyncratic — dose-independent." },
              { cause: "Other", detail: "Autoimmune hepatitis, Wilson's disease (young + haemolysis + low ALP), Budd-Chiari, HELLP/AFLP, mushroom poisoning (Amanita phalloides)." },
            ].map((c) => (
              <div key={c.cause} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{c.cause}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICU Management</h2>
          <div className="space-y-2">
            {[
              { system: "Neurological", management: "Grade encephalopathy (West Haven I–IV). ICP monitoring if grade III/IV. Target ICP {'<'}20 mmHg, CPP {'>'} 60 mmHg. Avoid stimulation, head-up 30°, mannitol/hypertonic saline." },
              { system: "Cardiovascular", management: "Hyperdynamic circulation (high CO, low SVR) — similar to sepsis. Noradrenaline first-line. Relative adrenal insufficiency — consider hydrocortisone." },
              { system: "Coagulation", management: "Balanced coagulopathy (↓ pro- and anti-coagulant factors). Do NOT correct INR unless actively bleeding or pre-procedure — INR used for prognostication (King's criteria)." },
              { system: "Metabolic", management: "Hypoglycaemia (impaired gluconeogenesis — 10% dextrose infusion). Metabolic acidosis (lactate). Hypokalaemia, hyponatraemia, hypophosphataemia." },
              { system: "Renal", management: "Hepatorenal syndrome or ATN. Avoid nephrotoxins. CRRT preferred (haemodynamic stability, avoids ICP spikes from IHD)." },
              { system: "Infection", management: "High infection risk (impaired innate immunity). Low threshold for cultures and empiric antibiotics. Fungal infection common — consider antifungals." },
            ].map((s) => (
              <div key={s.system} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{s.system}</span>
                <span className="text-sm text-muted-foreground">{s.management}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">King's College Criteria for Transplantation</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Paracetamol-induced ALF</p>
              <p className="text-sm text-muted-foreground mt-1">pH {'<'} 7.3 after resuscitation (strongest predictor). OR all three: INR {'>'} 6.5, creatinine {'>'} 300 µmol/L, grade III/IV encephalopathy.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Non-Paracetamol ALF</p>
              <p className="text-sm text-muted-foreground mt-1">INR {'>'} 6.5 (irrespective of grade). OR any 3 of 5: age {'<'}10 or {'>'} 40, non-A/non-B hepatitis, drug reaction, jaundice {'>'} 7 days before encephalopathy, INR {'>'} 3.5, bilirubin {'>'} 300.</p>
            </div>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Paracetamol is the commonest cause of ALF in the UK — treat with NAC, best prognosis",
        "Do NOT correct INR unless bleeding — it is a prognostic marker (King's criteria)",
        "Cerebral oedema is the leading cause of death — manage ICP aggressively in grade III/IV encephalopathy",
        "King's criteria (paracetamol): pH <7.3 is the strongest single predictor for transplant need",
        "CRRT preferred over IHD — avoids ICP spikes and provides haemodynamic stability",
      ]} />

      <QuizSection questions={acuteLiverFailureQuestions} />
      <ReferencesList topicId="acute-liver-failure" />

      <SeeAlso topicId="acute-liver-failure" />
        <TopicCompletionToggle topicId="acute-liver-failure" topicTitle="Acute Liver Failure" />
    </SectionLayout>
  );
};

export default AcuteLiverFailureTopic;
