import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { acuteLiverFailureQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import CLIFCACLFDiagram from "@/components/diagrams/CLIFCACLFDiagram";

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

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Acute-on-Chronic Liver Failure (ACLF)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            ACLF is a distinct syndrome: acute deterioration in a patient with pre-existing chronic liver disease, characterised by organ failure(s) and high short-term mortality. It differs from a simple acute decompensation (AD) event (ascites, variceal bleed, encephalopathy, infection) by the presence of extra-hepatic organ failures.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">EASL–CLIF Definition & Grading</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The CLIF-SOFA / CLIF-C OF score defines organ failures. ACLF is graded by number of organ failures, which directly predicts 28-day mortality:
          </p>
          <div className="space-y-2 mb-4">
            {[
              { grade: "No ACLF", description: "Acute decompensation without organ failure", mortality: "~5%" },
              { grade: "ACLF Grade 1", description: "Single organ failure (renal alone, or single non-renal OF + renal dysfunction)", mortality: "~23%" },
              { grade: "ACLF Grade 2", description: "Two organ failures", mortality: "~32%" },
              { grade: "ACLF Grade 3", description: "Three or more organ failures", mortality: "~75%" },
            ].map((g) => (
              <div key={g.grade} className="p-3 rounded border border-border">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-primary text-sm">{g.grade}</p>
                  <span className="text-sm font-semibold text-destructive">28-d mortality: {g.mortality}</span>
                </div>
                <p className="text-sm text-muted-foreground">{g.description}</p>
              </div>
            ))}
          </div>

          <CLIFCACLFDiagram />

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Precipitants</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { trigger: "Infection / Sepsis", detail: "Commonest precipitant (~35%). SBP, pneumonia, UTI, cellulitis. Impaired immune function (cirrhosis-associated immune dysfunction — CAID)." },
              { trigger: "Alcohol", detail: "Active drinking or alcoholic hepatitis. Superimposed on alcoholic cirrhosis. High short-term mortality if severe (Maddrey DF ≥32)." },
              { trigger: "GI Bleeding", detail: "Variceal haemorrhage. May precipitate renal failure, infection, and encephalopathy." },
              { trigger: "Unknown / No Trigger", detail: "In ~40% of ACLF cases no identifiable precipitant is found — emphasises the systemic inflammatory nature of the syndrome." },
            ].map((t) => (
              <div key={t.trigger} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{t.trigger}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">ICU Management of ACLF</h3>
          <div className="space-y-2 mb-4">
            {[
              { system: "General Principles", management: "Identify and treat precipitant. Early ICU admission for grade ≥2. Discuss with hepatology/transplant centre. Reassess trajectory at 48–72 h — futility if worsening ACLF grade 3 at day 3–7." },
              { system: "Hepatic", management: "Alcoholic hepatitis: Maddrey discriminant function (DF ≥32 = severe). Prednisolone 40 mg/day if no contraindication (sepsis, GI bleed, renal failure). Lille score at day 7 — stop if >0.45 (non-responder). NAC may be used as adjunct." },
              { system: "Cardiovascular", management: "Portal hypertension + systemic vasodilation → hyperdynamic state. Noradrenaline first-line. Terlipressin for hepatorenal syndrome (HRS-AKI). Target MAP ≥65 mmHg." },
              { system: "Renal", management: "HRS-AKI: terlipressin + albumin (ICA criteria). CRRT if not responding. Avoid nephrotoxins (NSAIDs, aminoglycosides, IV contrast)." },
              { system: "Neurological", management: "Hepatic encephalopathy: lactulose (target 2–3 soft stools/day) ± rifaximin. Grade III/IV: intubate for airway protection. Ammonia >150 µmol/L associated with cerebral oedema risk." },
              { system: "Coagulation", management: "Rebalanced haemostasis — global tests (TEG/ROTEM) more informative than INR. Bleeding risk from portal hypertension (varices) not coagulopathy per se. Transfuse to clinical targets, not lab values." },
              { system: "Infection", management: "Cirrhosis-associated immune dysfunction (CAID). Low threshold for cultures and empiric broad-spectrum antibiotics. SBP prophylaxis (norfloxacin/ciprofloxacin). Consider antifungals if deteriorating on antibiotics." },
              { system: "Nutrition", management: "High protein requirement (1.2–1.5 g/kg/day) — do NOT restrict protein. Calorie target 25–30 kcal/kg/day. Correct micronutrient deficiencies (thiamine, zinc, fat-soluble vitamins). Nasogastric feeding if unable to eat." },
            ].map((s) => (
              <div key={s.system} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{s.system}</p>
                <p className="text-sm text-muted-foreground">{s.management}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Hepatorenal Syndrome (HRS)</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Hepatorenal syndrome is functional renal failure in advanced liver disease caused by splanchnic arterial vasodilation → reduced effective circulating volume → renal vasoconstriction. Kidneys are structurally normal (may function post-transplant). Revised ICA 2015 criteria classify HRS into two types:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border" style={{ borderLeftWidth: 4, borderLeftColor: "#ef4444" }}>
              <p className="font-bold text-foreground text-sm mb-1">HRS-AKI (formerly Type 1)</p>
              <p className="text-xs text-muted-foreground mb-2">Rapidly progressive — doubling of creatinine to {'>'} 2.5 mg/dL (221 µmol/L) in {'<'} 2 weeks</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Often precipitated by SBP or GI bleeding</li>
                <li>Median survival untreated: ~2 weeks</li>
                <li>Now diagnosed using AKI criteria: ↑ creatinine ≥0.3 mg/dL within 48 h or ≥50% from baseline within 7 days</li>
                <li>Must exclude other causes (nephrotoxins, shock, obstruction, parenchymal disease)</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border" style={{ borderLeftWidth: 4, borderLeftColor: "#f59e0b" }}>
              <p className="font-bold text-foreground text-sm mb-1">HRS-NAKI (formerly Type 2)</p>
              <p className="text-xs text-muted-foreground mb-2">Slowly progressive or stable renal impairment — eGFR {'<'} 60 mL/min for {'>'} 3 months</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Typically associated with refractory ascites</li>
                <li>Better prognosis than HRS-AKI — median survival months</li>
                <li>Now termed HRS-CKD (chronic) or HRS-AKD (acute kidney disease, 3–90 days)</li>
                <li>Management focuses on volume status, avoiding nephrotoxins, TIPS if appropriate</li>
              </ul>
            </div>
          </div>

          <p className="text-sm font-semibold text-foreground mb-2">Management Algorithm (HRS-AKI)</p>
          <div className="space-y-2 mb-4">
            {[
              { step: "Step 1", action: "Stop diuretics, nephrotoxins, and vasodilators. Exclude other causes of AKI (urinalysis, USS, urine sodium <20 mEq/L in HRS)." },
              { step: "Step 2", action: "Volume expansion with 20% albumin (1 g/kg, max 100 g) over 48 hours. If no response → HRS-AKI diagnosis confirmed." },
              { step: "Step 3", action: "Terlipressin + albumin (20–40 g/day). Terlipressin: 2 mg IV bolus q4–6h or 2–4 mg/24h infusion (infusion may have fewer side effects). Target: creatinine ↓ to <133 µmol/L." },
              { step: "Step 4", action: "If terlipressin unavailable or contraindicated: noradrenaline infusion (target ↑ MAP by 10 mmHg) + albumin. Midodrine + octreotide is inferior but used where vasopressors not feasible." },
              { step: "Step 5", action: "Non-responders (no ↓ creatinine by day 4): consider CRRT as bridge to transplant. TIPS in selected patients without advanced liver failure. Liver transplantation is the definitive treatment." },
            ].map((s) => (
              <div key={s.step} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{s.step}</span>
                <span className="text-sm text-muted-foreground">{s.action}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 border border-primary/20 mb-4">
            <p className="text-sm font-semibold text-foreground mb-1">⚠️ Terlipressin Safety</p>
            <p className="text-sm text-muted-foreground">
              Contraindicated in ischaemic heart disease, PVD, mesenteric ischaemia. Monitor for cardiovascular ischaemia, arrhythmias, peripheral/splanchnic ischaemia, hyponatraemia, and fluid overload. The CONFIRM trial (2021) showed terlipressin improved HRS reversal but increased serious adverse events (respiratory failure) — careful patient selection essential.
            </p>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Prognosis: Alcoholic Liver Disease in ICU</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Acute decompensation of alcoholic liver disease (ALD) admitted to critical care carries high mortality, but outcomes vary significantly with the degree of organ failure and trajectory:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            {[
              { factor: "ICU Mortality", detail: "Overall ICU mortality for decompensated ALD: 30–50%. ACLF grade 3: ICU mortality approaches 70–80%." },
              { factor: "Trajectory Matters", detail: "Patients whose CLIF-C ACLF score improves by day 3–7 have significantly better survival. Worsening or static grade 3 ACLF at day 3–7 has >90% mortality." },
              { factor: "Transplant Candidacy", detail: "Historically required 6 months abstinence. Increasingly, early transplant considered for selected patients with severe alcoholic hepatitis not responding to medical therapy (post ACCELERATE-AH trial data)." },
              { factor: "Futility Considerations", detail: "ACLF grade 3 with ≥4 organ failures, rising lactate, and no transplant option — mortality approaches 100%. Palliative care discussion essential." },
            ].map((p) => (
              <div key={p.factor} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{p.factor}</p>
                <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Prognostic Scores</h3>
          <div className="space-y-2">
            {[
              { score: "Child-Pugh", use: "Chronic severity. Class C (10–15 points) = decompensated. Not designed for acute illness but provides baseline." },
              { score: "MELD / UKELD", use: "Transplant listing prioritisation. MELD uses bilirubin, INR, creatinine (± sodium). UKELD adds sodium — UK-specific listing score." },
              { score: "CLIF-C ACLF", use: "Specific to ACLF. Incorporates CLIF-C OF score + age + WCC. Validated for 28-day and 90-day mortality prediction." },
              { score: "Maddrey DF", use: "Specific to alcoholic hepatitis. DF = 4.6 × (PT − control PT) + bilirubin (mg/dL). DF ≥32 = severe — consider steroids." },
              { score: "Lille Score", use: "Day 7 response to steroids in alcoholic hepatitis. >0.45 = non-responder — stop prednisolone. Combines age, albumin, bilirubin (day 0 & 7), creatinine, PT." },
            ].map((s) => (
              <div key={s.score} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{s.score}</p>
                <p className="text-sm text-muted-foreground">{s.use}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              ACLF is increasingly examined in FFICM. Key distinctions from ALF: pre-existing liver disease, portal hypertension complications, different organ failure pattern (renal {'>'} cerebral), and transplant is not always an option. Know CLIF-C ACLF grading, Maddrey DF, and Lille score. Understand that trajectory (improving vs worsening at day 3–7) is more prognostically important than the admission grade.
            </p>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Paracetamol is the commonest cause of ALF in the UK — treat with NAC, best prognosis",
        "Do NOT correct INR unless bleeding — it is a prognostic marker (King's criteria)",
        "Cerebral oedema is the leading cause of death in ALF — manage ICP aggressively in grade III/IV encephalopathy",
        "King's criteria (paracetamol): pH <7.3 is the strongest single predictor for transplant need",
        "ACLF is graded by number of organ failures (CLIF-C) — grade 3 has ~75% 28-day mortality",
        "Trajectory at day 3–7 is more prognostically important than admission ACLF grade",
        "Alcoholic hepatitis: Maddrey DF ≥32 → prednisolone; Lille >0.45 at day 7 → stop steroids (non-responder)",
        "Do NOT restrict protein in hepatic encephalopathy — target 1.2–1.5 g/kg/day",
      ]} />

      <QuizSection questions={acuteLiverFailureQuestions} />
      <ReferencesList topicId="acute-liver-failure" />

      <SeeAlso topicId="acute-liver-failure" />
        <TopicCompletionToggle topicId="acute-liver-failure" topicTitle="Acute Liver Failure" />
    </SectionLayout>
  );
};

export default AcuteLiverFailureTopic;
