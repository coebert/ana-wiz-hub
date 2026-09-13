import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { acuteLiverFailureQuestions } from "@/data/quizzes";
import CLIFCACLFDiagram from "@/components/diagrams/intensive-care/CLIFCACLFDiagram";
import ALFCerebralOedemaDiagram from "@/components/diagrams/intensive-care/ALFCerebralOedemaDiagram";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { InlineRef } from "@/components/references/InlineRef";

const acuteLiverFailureFaqs: Array<[string, string]> = [
  ["What are the King's College criteria for liver transplantation in paracetamol-induced ALF?", "Arterial pH <7.30 after resuscitation, OR all three of: PT >100 s (INR >6.5), creatinine >300 µmol/L, and grade III/IV encephalopathy."],
  ["How is raised intracranial pressure managed in acute liver failure?", "Aim for serum sodium 145–155 mmol/L with hypertonic saline, head-up 30°, mannitol or hypertonic saline boluses for surges, mild hypothermia (35–36 °C) if refractory, and avoid hypotonic fluids and hypercapnia."],
  ["When is N-acetylcysteine indicated in non-paracetamol ALF?", "NAC improves transplant-free survival in early (grade I–II encephalopathy) non-paracetamol ALF (Lee et al., Gastroenterology 2009); start at the same 21-hour regimen as for paracetamol."],
];

const objectives = [
  "Define and classify ALF (hyperacute/acute/subacute) and identify common UK aetiologies.",
  "Deliver organ-system-based ICU management of ALF, including ICP control in grade III/IV encephalopathy.",
  "Apply King's College Criteria to identify patients requiring emergency liver transplant assessment.",
  "Define ACLF using EASL-CLIF, grade by organ failures, and prognosticate using day 3–7 trajectory.",
  "Diagnose and manage HRS-AKI using ICA 2015 criteria, terlipressin + albumin, and noradrenaline alternatives.",
  "Use Child-Pugh, MELD/UKELD, Maddrey DF and Lille scores to risk-stratify and guide steroid therapy.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "King's College Criteria — paracetamol ALF",
    scenario: (
      <>
        25-year-old, staggered paracetamol overdose presenting at 72 h. Day 3 in ICU on NAC:
        pH 7.22 after fluid resuscitation, INR 7.0, creatinine 340 µmol/L, grade III encephalopathy.
        Should you refer for transplant?
      </>
    ),
    working: (
      <>
        King's paracetamol criteria — list if{" "}
        <strong>pH &lt;7.3 after resuscitation</strong> (single most powerful predictor) OR all
        three: INR &gt;6.5, creatinine &gt;300 µmol/L, grade III/IV encephalopathy. This patient
        meets the pH criterion AND the triple criteria.
      </>
    ),
    answer: (
      <>
        <strong>Refer immediately to transplant centre.</strong> Without transplant, mortality
        approaches 90%. Continue NAC, manage cerebral oedema (head-up 30°, target Na 145–155,
        consider ICP monitoring, hypertonic saline for surges), CRRT for renal failure (also
        controls ammonia and avoids ICP swings of IHD).
      </>
    ),
   cites: ["BJA Educ 2017"],
  },
  {
    title: "HRS-AKI diagnosis and treatment",
    scenario: (
      <>
        Patient with alcoholic cirrhosis admitted with SBP. Creatinine rises from 95 → 220 µmol/L
        over 5 days despite antibiotics. Urine Na 12 mEq/L, no proteinuria, USS normal. Diuretics
        stopped. After 48 h of 20% albumin 1 g/kg → no improvement. Diagnosis and next step?
      </>
    ),
    working: (
      <>
        AKI criteria met (≥50% rise from baseline). Urine Na &lt;20 + low FENa + bland urine + no
        obstruction → functional AKI. Failure to respond to albumin volume expansion confirms{" "}
        <strong>HRS-AKI</strong> (ICA 2015). Common precipitant: SBP.
      </>
    ),
    answer: (
      <>
        Start <strong>terlipressin 2 mg IV q4–6h</strong> (or 2–4 mg/24 h infusion — fewer
        ischaemic side effects, CONFIRM trial) + albumin 20–40 g/day. Target Cr &lt;133 µmol/L.
        If contraindicated (IHD, PVD): noradrenaline to ↑ MAP by 10 mmHg + albumin. Non-responder
        by day 4 → CRRT bridge to transplant assessment.
      </>
    ),
   cites: ["King's Criteria"],
  },
  {
    title: "Maddrey DF and the Lille decision",
    scenario: (
      <>
        Severe alcoholic hepatitis: bilirubin 320 µmol/L (18.7 mg/dL), PT 24 s (control 12 s).
        Calculate Maddrey DF and decide on steroids. At day 7 the Lille score returns 0.62 — what
        next?
      </>
    ),
    working: (
      <>
        Maddrey DF = 4.6 × (PT − control) + bilirubin (mg/dL) = 4.6 × (24 − 12) + 18.7 ={" "}
        4.6 × 12 + 18.7 = 55.2 + 18.7 = <strong>73.9</strong>. DF ≥32 = severe → steroids
        indicated provided no contraindication (sepsis, GI bleed, active TB, AKI). Lille at day
        7: <strong>&gt;0.45 = non-responder</strong>.
      </>
    ),
    answer: (
      <>
        Start prednisolone 40 mg/day with PPI cover and infection screen. At day 7, Lille 0.62 →
        <strong> stop prednisolone</strong> (continued steroids in non-responders worsen
        infection without survival benefit). Refer for early liver transplant assessment per
        ACCELERATE-AH criteria; palliative care input if not a candidate (6-month untreated
        mortality ~75%).
      </>
    ),
   cites: ["BJA Educ 2019"],
  },
];

const AcuteLiverFailureTopic = () => {
  return (
    <TopicTemplate
      title="Acute Liver Failure"
      subtitle="FRCA Final / FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "Paracetamol is the commonest cause of ALF in the UK — treat with NAC, best prognosis", cites: ["BJA Educ 2019"] },
        { text: "Do NOT correct INR unless bleeding — it is a prognostic marker (King's criteria)", cites: ["King's Criteria"] },
        { text: "Cerebral oedema is the leading cause of death in ALF — manage ICP aggressively in grade III/IV encephalopathy", cites: ["BJA Educ 2017"] },
        { text: "King's criteria (paracetamol): pH <7.3 is the strongest single predictor for transplant need", cites: ["BJA Educ 2019"] },
        { text: "ACLF is graded by number of organ failures (CLIF-C) — grade 3 has ~75% 28-day mortality", cites: ["King's Criteria"] },
        { text: "Trajectory at day 3–7 is more prognostically important than admission ACLF grade", cites: ["BJA Educ 2017"] },
        { text: "HRS-AKI: terlipressin (2 mg q4–6h or infusion) + albumin; noradrenaline if terlipressin contraindicated", cites: ["BJA Educ 2019"] },
        { text: "Alcoholic hepatitis: Maddrey DF ≥32 → prednisolone; Lille >0.45 at day 7 → stop steroids (non-responder)", cites: ["King's Criteria"] },
        { text: "Do NOT restrict protein in hepatic encephalopathy — target 1.2–1.5 g/kg/day", cites: ["BJA Educ 2017"] },
      ]}
      topicId="acute-liver-failure"
      topicTitle="Acute Liver Failure"
      quizQuestions={acuteLiverFailureQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2017",
          "King's Criteria",
          "BJA Educ 2019",
        ],
        keyPoints: [
          "BJA Educ 2017",
          "King's Criteria",
          "BJA Educ 2019",
        ],
        workedExamples: ["BJA Educ 2017", "King's Criteria", "BJA Educ 2019"],
      }}
      coreConcepts={
    <>
    <ExamSection exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Definition & Aetiology</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Acute liver failure (ALF): severe liver injury with coagulopathy (INR ≥1.5) and encephalopathy in a patient without pre-existing liver disease. Classified by jaundice-to-encephalopathy interval: hyperacute ({'<'}7 days), acute (7–28 days), subacute (28 days–6 months).
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { cause: "Paracetamol", detail: "Commonest cause in UK. ~5–10% is oxidised by CYP2E1/3A4 to NAPQI, normally conjugated by hepatic glutathione; in overdose glutathione is depleted, NAPQI binds mitochondrial proteins, causing oxidative stress, mitochondrial permeability transition and centrilobular (zone 3) necrosis. Toxicity occurs at lower doses with enzyme inducers (alcohol excess, rifampicin, phenytoin, carbamazepine, St John's wort), malnutrition/anorexia, low body weight and staggered ingestion. NAC replenishes glutathione, scavenges NAPQI and improves hepatic and cerebral oxygen delivery — give it as the UK 21-hour, two- or three-bag regimen and continue beyond 21 h if the INR is rising, ALT elevated or acidosis persists. Best prognosis of all ALF aetiologies." },
              { cause: "Viral Hepatitis", detail: "Hepatitis A and E (faeco-oral; E is severe in pregnancy and in men with chronic liver disease), hepatitis B ± D superinfection, and HBV reactivation when immunosuppression or rituximab is given without prophylaxis — check HBsAg/anti-HBc first. HSV and VZV hepatitis cause anicteric ALF with very high transaminases in pregnancy and immunosuppression: give empirical aciclovir. Hepatitis C rarely causes ALF." },
              { cause: "Drug-induced (DILI)", detail: "DILI accounts for most non-paracetamol ALF and carries a fatality rate of up to 50%. Idiosyncratic and largely dose-independent: antituberculous drugs (isoniazid, rifampicin, pyrazinamide), co-amoxiclav (cholestatic, often after the course ends), flucloxacillin, anti-epileptics (valproate, phenytoin, lamotrigine), methotrexate, checkpoint inhibitors (immune hepatitis — needs steroids), MDMA/cocaine, and herbal or bodybuilding supplements. Diagnosis is by exclusion using a drug timeline; management is drug withdrawal, supportive care and early transplant referral." },
              { cause: "Other", detail: "Autoimmune hepatitis (high IgG, ASMA/ANA; steroid trial only if transplant assessment is under way). Wilson's disease — young patient, Coombs-negative haemolysis, low ALP, high bilirubin:ALP ratio, low uric acid, Kayser–Fleischer rings; almost always needs transplantation. Budd–Chiari (thrombophilia, tender hepatomegaly, ascites — consider TIPS/anticoagulation). Pregnancy-related HELLP/AFLP — treatment is delivery. Amanita phalloides poisoning (delayed diarrhoea then hepatic failure; silibinin, high-dose penicillin). Ischaemic hepatitis, malignant infiltration and heat stroke." },
            ].map((c) => (
              <div key={c.cause} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{c.cause}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <ALFCerebralOedemaDiagram />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICU Management</h2>
          <div className="space-y-2">
            {[
              { system: "Neurological", management: (
                <>
                  Grade encephalopathy using the <strong>West Haven</strong> scale (I: mild confusion/altered sleep; II: lethargy, disorientation; III: marked confusion, somnolent but rousable; IV: coma). Target ICP {'<'}20–25 mmHg and CPP {'>'}50–60 mmHg. Treat surges with mannitol 0.5–1 g/kg boluses or hypertonic saline 2 mL/kg of 3–5%, maintaining serum sodium 145–155 mmol/L with regular osmolality monitoring. Ammonia {'>'}150–200 µmol/L, and a rapidly rising trend, are risk markers for cerebral oedema and intracranial hypertension — early continuous renal replacement therapy has a role in ammonia clearance independent of renal indication. In refractory intracranial hypertension, moderate hypothermia (35–36°C) and short-acting sedation can act as a bridge to transplantation. Avoid stimulation, nurse head-up 30°, control seizures, and maintain normocapnia — brief hyperventilation is reserved as rescue therapy for acute ICP surges only, not routine management. Invasive ICP monitoring remains controversial: it is used mainly in grade III/IV encephalopathy awaiting transplant to guide osmotherapy, but has no demonstrated survival benefit and carries a risk of intracranial haemorrhage — particularly in non-paracetamol aetiologies with more deranged coagulation — so its use is centre-specific and guided by local expertise and bleeding risk<InlineRef topicId="acute-liver-failure" refLabel="USALFSG 2007" />.
                </>
              ) },
              { system: "Cardiovascular", management: "Hyperdynamic circulation (high CO, low SVR) — similar to sepsis. Noradrenaline first-line. Relative adrenal insufficiency — consider hydrocortisone." },
              { system: "Coagulation", management: (
                <>
                  <strong>Rebalanced, not simply bleeding-prone:</strong> pro-coagulant factors (II, V, VII, X, fibrinogen) fall in parallel with anti-coagulants (protein C, antithrombin), so the prolonged INR reflects synthetic failure rather than a true bleeding tendency, and spontaneous major bleeding is uncommon. Do <strong>not</strong> correct INR routinely — it is a prognostic variable in the King's criteria and correction masks trajectory. Use <strong>viscoelastic testing (ROTEM/TEG)</strong> rather than INR to identify genuine hypocoagulability before invasive procedures or in active bleeding: FIBTEM A5 low → fibrinogen concentrate or cryoprecipitate targeting fibrinogen {'>'}1.5 g/L (higher if bleeding), EXTEM CT prolonged → FFP or PCC, low EXTEM MCF with normal FIBTEM → platelets, aiming platelets {'>'}50 × 10⁹/L for most procedures and {'>'}20 × 10⁹/L otherwise. Give <strong>vitamin K 10 mg IV</strong> once (coexisting deficiency is common) and correct hypofibrinogenaemia, hypocalcaemia, hypothermia and acidosis, which all impair clot formation. Recombinant factor VIIa transiently normalises INR but carries thrombotic risk and no outcome benefit — rescue use only, on transplant-centre advice. Thromboprophylaxis is still indicated in the absence of bleeding, since ALF also carries a prothrombotic risk<InlineRef topicId="acute-liver-failure" refLabel="AASLD ALF 2023" />.
                </>
              ) },

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
              <p className="font-semibold text-foreground text-sm">Non-Paracetamol ALF<InlineRef topicId="acute-liver-failure" refLabel="King's Criteria" /></p>
              <p className="text-sm text-muted-foreground mt-1">
                INR {'>'} 6.5 (irrespective of grade of encephalopathy). OR any 3 of the following 5: (1) age {'<'}10 or {'>'} 40 years; (2) aetiology non-A non-B non-C hepatitis, drug-induced liver injury, or halothane hepatitis; (3) jaundice-to-encephalopathy interval {'>'} 7 days; (4) INR {'>'} 3.5; (5) serum bilirubin {'>'} 300 µmol/L.
              </p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-3">
            <strong>Role of lactate:</strong> post-resuscitation arterial lactate is an independent prognostic marker in ALF, correlating with the burden of SIRS and SOFA-defined organ dysfunction. The Bernal lactate modification adds arterial lactate {'>'} 3.5 mmol/L after early fluid resuscitation, or {'>'} 3.0 mmol/L at 12 hours, as an additional trigger for listing — this improves sensitivity for identifying patients who will need transplantation, though it has not clearly outperformed the original King's criteria in subsequent validation studies<InlineRef topicId="acute-liver-failure" refLabel="Bernal Lactate 2006" />.
          </p>
        </div>

        <CollapsibleSubsection title="Paracetamol Overdose Management">
          <p className="text-muted-foreground leading-relaxed mb-3">
            The toxic dose is approximately 150 mg/kg (or {'>'}12 g total) in a single ingestion. Paracetamol is normally conjugated safely, but a minor CYP450 pathway generates the reactive metabolite NAPQI, which is detoxified by hepatic glutathione. In overdose (or with glutathione depletion — malnutrition, chronic alcohol excess, enzyme-inducing drugs), glutathione stores are overwhelmed and NAPQI causes centrilobular (zone 3) hepatocyte necrosis, with mitochondrial permeability-transition and ATP depletion as the final common pathway<InlineRef topicId="acute-liver-failure" refLabel="NPIS Toxbase" />. Non-paracetamol drug-induced liver injury is the commonest remaining cause and may be fatal in up to half of those who progress to ALF<InlineRef topicId="acute-liver-failure" refLabel="DILI Review 2023" />.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Rumack–Matthew nomogram (UK treatment line at 100 mg/L at 4 hours) applies <strong>only</strong> to a single, acute ingestion with a known time of overdose, plotted between 4 and 15 hours post-ingestion. Treat empirically with acetylcysteine, without waiting for a paracetamol level, in: staggered or repeated supratherapeutic ingestion; unknown or uncertain timing of ingestion; presentation {'>'}8 hours post-ingestion where a delay to level/treatment is anticipated; or any clinical or biochemical evidence of liver injury<InlineRef topicId="acute-liver-failure" refLabel="NPIS Toxbase" />.
          </p>
          <p className="text-sm font-semibold text-foreground mb-2">UK 21-hour IV acetylcysteine (NAC) regimen</p>
          <div className="space-y-2 mb-4">
            {[
              { step: "Bag 1", action: "150 mg/kg in 200 mL 5% glucose over 1 hour." },
              { step: "Bag 2", action: "50 mg/kg in 500 mL 5% glucose over 4 hours." },
              { step: "Bag 3", action: "100 mg/kg in 1000 mL 5% glucose over 16 hours." },
            ].map((s) => (
              <div key={s.step} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{s.step}</span>
                <span className="text-sm text-muted-foreground">{s.action}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The SNAP two-bag 12-hour regimen (a higher initial dose over a longer first infusion, then a single maintenance infusion) is an alternative with fewer infusion-rate changes and a lower rate of anaphylactoid reactions.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            <strong>Prolonged treatment:</strong> continue NAC beyond the standard 21 hours if INR remains {'>'}1.3–1.5, ALT is rising, creatinine is rising, encephalopathy is present, or paracetamol is still detectable. However, prolonged NAC infusion may delay hepatic regeneration, so ongoing need should be reassessed regularly against trend in liver function rather than continued indefinitely by default<InlineRef topicId="acute-liver-failure" refLabel="NAC Prolonged 2009" />.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Anaphylactoid reactions</strong> (flushing, urticaria, bronchospasm — usually during the first infusion) are common and dose/rate-related, not true IgE-mediated allergy. Manage by pausing the infusion, giving an antihistamine (and nebulised salbutamol for bronchospasm), then restarting at a slower rate once symptoms settle — treatment should not be abandoned. Refer early to a specialist liver/transplant centre using King's College Criteria if there is evidence of severe hepatotoxicity or evolving ALF.
          </p>
        </CollapsibleSubsection>

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

          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "King's College Criteria (paracetamol): arterial pH <7.30 OR (INR >6.5 + creat >300 + grade III/IV encephalopathy) — transplant referral.",
              "Cerebral oedema is the leading cause of death — ICP monitoring controversial; treat with osmotherapy, head-up, mild hypothermia.",
              "Paracetamol toxicity: NAC regardless of timing or level if ALF established; treat for 'staggered' OD or unknown timing.",
              "Avoid hypoglycaemia (10–50% glucose infusion), correct coagulopathy only for bleeding/procedures (INR is also a prognostic marker).",
              "Hyperammonaemia >150 µmol/L correlates with intracranial hypertension — consider CVVHDF for ammonia clearance.",
            ]}
          />
    </ExamSection>
          <TopicFaqs faqs={acuteLiverFailureFaqs} />
    </>
      }
    />
  );
};

export default AcuteLiverFailureTopic;
