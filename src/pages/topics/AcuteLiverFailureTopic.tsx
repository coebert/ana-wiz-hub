import { ACLF_CLASSIFICATION } from "@/lib/c4-clinical-rules";
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
  ["What are the King's College criteria for liver transplantation in paracetamol-induced ALF?", "Arterial pH <7.30 after resuscitation, OR all three of: PT >100 s (INR >6.5), creatinine >300 µmol/L, and grade III/IV encephalopathy. These inform prognosis and specialist listing assessment, not automatic eligibility. Discuss acute liver injury/ALF with a liver unit early; do not wait for criteria."],
  ["How is raised intracranial pressure managed in acute liver failure?", "Aim for serum sodium 145–155 mmol/L with hypertonic saline, head-up 30°, mannitol or hypertonic saline boluses for surges, mild hypothermia (35–36 °C) if refractory, and avoid hypotonic fluids and hypercapnia."],
  ["When is N-acetylcysteine indicated in non-paracetamol ALF?", "Lee et al. (2009) studied a 72-hour NAC infusion in adults with non-paracetamol ALF. Overall survival was not significantly improved; transplant-free survival benefit was concentrated in grade I–II encephalopathy. Discuss use and duration with a liver centre; the trial does not establish a completed 21-hour paracetamol course as the non-paracetamol regimen."],
];

const objectives = [
  "Define and classify ALF (hyperacute/acute/subacute) and identify common UK aetiologies.",
  "Deliver organ-system-based ICU management of ALF, including ICP control in grade III/IV encephalopathy.",
  "Recognise ALF requiring early liver-unit assessment before listing criteria; use King's College Criteria to inform prognosis and specialist listing discussion.",
  "Define ACLF using EASL-CLIF, grade by organ failures, and prognosticate using day 3–7 trajectory.",
  "Diagnose HRS-AKI using ADQI–ICA 2024 criteria; use individually titrated vasoconstrictor treatment with volume-guided albumin and specialist alternatives.",
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
        King's paracetamol criteria indicate poor prognosis and immediate transplant-centre assessment, not automatic listing, if{" "}
        <strong>pH &lt;7.3 after resuscitation</strong> (single most powerful predictor) OR all
        three: INR &gt;6.5, creatinine &gt;300 µmol/L, grade III/IV encephalopathy. This patient
        meets the pH criterion AND the triple criteria.
      </>
    ),
    answer: (
      <>
        <strong>Refer immediately to transplant centre.</strong> Do not wait for listing criteria before liver-unit referral; some patients recover with their native liver, and listing is a specialist decision. Continue NAC, manage cerebral oedema (head-up 30°, target Na 145–155,
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
        Patient with alcohol-related cirrhosis and ascites admitted with SBP. Creatinine rises from 95 → 220 µmol/L over 5 days despite antibiotics. Assess volume status: resuscitate appropriately only if depleted; AKI persists without improvement at 24 h after clinically indicated adequate resuscitation. Review urine sediment, renal imaging, medicines and competing primary causes. Does this meet HRS-AKI criteria?
      </>
    ),
    working: (
      <>
        AKI criteria are met (≥50% creatinine rise within 7 days). HRS-AKI requires cirrhosis with ascites, qualifying creatinine and/or urine-output change, no improvement within 24 h after adequate resuscitation when indicated, and no strong alternative primary cause. Low urine sodium/FENa or a bland urine alone cannot confirm HRS; structural injury, proteinuria or CKD may coexist. No routine 48 h albumin challenge is required.<InlineRef topicId="acute-liver-failure" refLabel="ADQI–ICA HRS 2024" />
      </>
    ),
    answer: (
      <>
        Start <strong>terlipressin using one complete HRS protocol</strong>, with the dose expressed explicitly as acetate or free base, plus albumin adjusted to volume status. The EMA continuous-infusion option starts at 2 mg terlipressin acetate/24 h and is titrated to a maximum of 12 mg/24 h. CONFIRM instead studied intermittent acetate boluses starting at 1 mg every 6 h, with protocol-based escalation; it did not establish the safety benefit of continuous infusion. Follow response/adverse-effect stopping criteria and a maximum 14-day course<InlineRef topicId="acute-liver-failure" refLabel="EMA Terlipressin 2022" /><InlineRef topicId="acute-liver-failure" refLabel="CONFIRM 2021" />.
        If terlipressin cannot be used, consider specialist noradrenaline treatment with individually adjusted albumin. RRT is assessed from complications, volume status, trajectory, goals and transplant plan; day 4 alone is not an indication.<InlineRef topicId="acute-liver-failure" refLabel="ADQI–ICA RRT 2024" />
      </>
    ),
   cites: ["ADQI–ICA HRS 2024", "ADQI–ICA RRT 2024", "EMA Terlipressin 2022", "CONFIRM 2021"],
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
        { text: "EASL–CLIF ACLF classification includes specified single-organ failure/renal dysfunction/HE combinations, not organ count alone; grade 3 alone does not establish futility", cites: ["EASL ACLF 2023"] },
        { text: "Reassess ACLF after 3–7 days of full organ support using trajectory, persistent failures and transplant candidacy; grade alone is not futility", cites: ["EASL ACLF 2023"] },
        { text: "HRS-AKI: protocol-titrated terlipressin with explicit acetate/free-base units plus volume-guided albumin; noradrenaline when terlipressin cannot be used", cites: ["BJA Educ 2019"] },
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
          "BJA Educ 2019", "EASL ACLF 2023", "ADQI–ICA HRS 2024",
        ],
        keyPoints: [
          "BJA Educ 2017",
          "King's Criteria",
          "BJA Educ 2019", "EASL ACLF 2023", "ADQI–ICA HRS 2024",
        ],
        workedExamples: ["BJA Educ 2017", "King's Criteria", "BJA Educ 2019", "ADQI–ICA HRS 2024", "ADQI–ICA RRT 2024"],
      }}
      coreConcepts={
    <>
    <ExamSection exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Definition & Aetiology</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Acute liver failure (ALF): acute liver injury with coagulopathy (INR ≥1.5) and encephalopathy in a patient without underlying chronic liver disease. The named O'Grady/EASL jaundice-to-encephalopathy framework is hyperacute (≤7 days), acute (8–28 days), subacute (5–12 weeks); an 8-week definition is historical, not universal. Discuss significant acute liver injury or ALF with a liver unit early, before King's listing criteria are met.<InlineRef topicId="acute-liver-failure" refLabel="EASL ALF 2017" /><InlineRef topicId="acute-liver-failure" refLabel="NHS GGC ALF referral" />
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { cause: "Paracetamol", detail: "Commonest cause in UK. ~5–10% is oxidised by CYP2E1/3A4 to NAPQI, normally conjugated by hepatic glutathione; in overdose glutathione is depleted, NAPQI binds mitochondrial proteins, causing oxidative stress, mitochondrial permeability transition and centrilobular (zone 3) necrosis. Toxicity occurs at lower doses with enzyme inducers (alcohol excess, rifampicin, phenytoin, carbamazepine, St John's wort), malnutrition/anorexia, low body weight and staggered ingestion. NAC replenishes glutathione, scavenges NAPQI and improves hepatic and cerebral oxygen delivery — use one complete adopted protocol: the licensed 21-hour three-infusion regimen or a distinct local regimen such as 12-hour SNAP. Reassess and extend when indicated by the clinical course and current poisons/liver-centre advice. Best prognosis of all ALF aetiologies." },
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
              { system: "Renal", management: "Hepatorenal syndrome or ATN. Avoid nephrotoxins. CRRT preferred (haemodynamic stability, avoids ICP spikes from IHD). Indications: conventional AKI criteria (anuria, refractory hyperkalaemia, acidosis or fluid overload); hyperammonaemia (ammonia >150–200 µmol/L) with cerebral oedema risk, as adjunctive clearance; severe lactic acidosis; and other electrolyte or acid–base disturbance. Regional citrate can be used with care — citrate clearance is reduced, so monitor for accumulation (total:ionised calcium ratio >2.5)." },
              { system: "Infection", management: "High infection risk (impaired innate immunity). Low threshold for cultures and empiric antibiotics. Fungal infection common — consider antifungals." },
            ].map((s) => (
              <div key={s.system} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{s.system}</span>
                <span className="text-sm text-muted-foreground">{s.management}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Regional citrate anticoagulation for CRRT in liver failure is feasible with close monitoring of the total:ionised calcium ratio (accumulation if ≥2.5).<InlineRef topicId="acute-liver-failure" refLabel="Schultheiss 2012" /></p>
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
          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Modern Prognostic Adjuncts in ALF</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li><strong>Arterial lactate:</strong> post-resuscitation lactate &gt;3.0–3.5 mmol/L reflects tissue hypoperfusion and impaired hepatic clearance and predicts death without transplant.<InlineRef topicId="acute-liver-failure" refLabel="Bernal Lactate 2006" /></li>
            <li><strong>Dynamic prognosis:</strong> the trajectory over 24–72 h (INR, lactate, encephalopathy grade, organ support) is more informative than a single value; reassess repeatedly.</li>
            <li><strong>Other models:</strong> MELD score; the French Clichy criteria (factor V &lt;20% if under 30 years, or &lt;30% if 30 or over, with encephalopathy) — factor V assays are not universally available.</li>
            <li><strong>Organ failure scores:</strong> higher SOFA scores and the number of organ failures are associated with higher mortality.</li>
          </ul>
        </div>

        <CollapsibleSubsection title="Paracetamol Overdose Management">
          <p className="text-muted-foreground leading-relaxed mb-3">
            The toxic dose is approximately 150 mg/kg (or {'>'}12 g total) in a single ingestion. Paracetamol is normally conjugated safely, but a minor CYP450 pathway generates the reactive metabolite NAPQI, which is detoxified by hepatic glutathione. In overdose (or with glutathione depletion — malnutrition, chronic alcohol excess, enzyme-inducing drugs), glutathione stores are overwhelmed and NAPQI causes centrilobular (zone 3) hepatocyte necrosis, with mitochondrial permeability-transition and ATP depletion as the final common pathway<InlineRef topicId="acute-liver-failure" refLabel="NPIS Toxbase" />. Non-paracetamol drug-induced liver injury is the commonest remaining cause and may be fatal in up to half of those who progress to ALF<InlineRef topicId="acute-liver-failure" refLabel="DILI Review 2023" />.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Rumack–Matthew nomogram (UK treatment line at 100 mg/L at 4 hours) applies <strong>only</strong> to a single, acute ingestion with a known time of overdose, plotted between 4 and 15 hours post-ingestion. Treat empirically with acetylcysteine, without waiting for a paracetamol level, in: staggered or repeated supratherapeutic ingestion; unknown or uncertain timing of ingestion; presentation {'>'}8 hours post-ingestion where a delay to level/treatment is anticipated; or any clinical or biochemical evidence of liver injury<InlineRef topicId="acute-liver-failure" refLabel="NPIS Toxbase" />.
          </p>
          <p className="text-sm font-semibold text-foreground mb-2">Licensed 21-hour IV NAC: adult dilution example for body weight ≥40 kg; use the product weight/volume tables, a 110 kg dosing ceiling and reduced-volume protocols when indicated</p>
          <div className="space-y-2 mb-4">
            {[
              { step: "Bag 1", action: "150 mg/kg added to 200 mL 5% glucose (include drug volume in the final infusion volume) over 1 hour." },
              { step: "Bag 2", action: "50 mg/kg added to 500 mL 5% glucose (include drug volume in the final infusion volume) over 4 hours." },
              { step: "Bag 3", action: "100 mg/kg added to 1000 mL 5% glucose (include drug volume in the final infusion volume) over 16 hours." },
            ].map((s) => (
              <div key={s.step} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{s.step}</span>
                <span className="text-sm text-muted-foreground">{s.action}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-3">
            SNAP is a distinct 12-hour regimen: 100 mg/kg over 2 hours, then 200 mg/kg over 10 hours. Its initial dose is lower and slower than the licensed first infusion of 150 mg/kg over 1 hour. Use the complete adopted SNAP protocol, including weight-specific preparation and criteria for extension; do not mix bag schedules.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            <strong>Prolonged treatment:</strong> reassess at the end of the chosen course and continue when indicated by persistent paracetamol, liver injury or clinical deterioration, with poisons/liver-centre advice. An isolated INR rise to 1.3 without raised transaminases does not itself require further NAC under the cited SmPC. The 2009 regeneration warning comes from mice, and EASL 2017 notes conflicting animal evidence; it is not proof of clinical harm from indicated extension<InlineRef topicId="acute-liver-failure" refLabel="NAC Prolonged 2009" />. EASL advises limiting prolonged ALF use to 5 days because of immunological concerns. Individualise duration with the specialist team rather than stopping or extending automatically.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>NAC infusion reactions</strong> are usually non-IgE mediated, but can cause life-threatening anaphylaxis. Stop the infusion and assess ABC. With airway, breathing or circulation compromise, call for help and treat promptly with adrenaline under the RCUK algorithm (adult IM 500 micrograms of 1 mg/mL adrenaline, repeated after 5 minutes if needed), oxygen and IV crystalloid when indicated. Antihistamines treat skin symptoms; salbutamol is only an adjunct for bronchospasm and neither replaces adrenaline. Once stable, seek poisons/specialist advice on resuming NAC at an appropriate rate; do not abandon an indicated antidote solely because of a previous reaction. Refer evolving ALF promptly to a liver/transplant centre<InlineRef topicId="acute-liver-failure" refLabel="RCUK Anaphylaxis 2021" />.
          </p>
        </CollapsibleSubsection>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Acute-on-Chronic Liver Failure (ACLF)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            EASL–CLIF ACLF is acutely decompensated cirrhosis with specified organ-failure/dysfunction combinations and high short-term mortality. Extrahepatic failure is not a universal requirement; single hepatic failure may qualify with the required renal dysfunction or mild HE.<InlineRef topicId="acute-liver-failure" refLabel="EASL ACLF 2023" />
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">EASL–CLIF Definition & Grading</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The CLIF-SOFA / CLIF-C OF score defines organ failures. Grading uses the complete single-organ exceptions below, then organ counts for grades 2/3. Approximate 28-day mortality figures describe the historical CANONIC population, not individual prognosis:
          </p>
          <div className="space-y-2 mb-4">
            {ACLF_CLASSIFICATION.map((g) => (
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

          <p className="text-xs text-muted-foreground">Classification and trajectory recommendations: <InlineRef topicId="acute-liver-failure" refLabel="EASL ACLF 2023" /></p>
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
              { system: "General Principles", management: "Identify and treat precipitant. Early ICU/hepatology/transplant discussion. Reassess prognosis after 3–7 days of full organ support; worsening grade 3 alone does not establish futility." },
              { system: "Hepatic", management: "Alcoholic hepatitis: Maddrey discriminant function (DF ≥32 = severe). Prednisolone 40 mg/day if no contraindication (sepsis, GI bleed, renal failure). Lille score at day 7 — stop if >0.45 (non-responder). NAC may be used as adjunct." },
              { system: "Cardiovascular", management: "Portal hypertension + systemic vasodilation → hyperdynamic state. Noradrenaline first-line. Terlipressin for hepatorenal syndrome (HRS-AKI). Target MAP ≥65 mmHg." },
              { system: "Renal", management: "HRS-AKI: full ADQI–ICA 2024 assessment, vasoconstrictor plus individually volume-adjusted albumin. RRT depends on clinical indications, trajectory and transplant plan. Review nephrotoxic exposures; indicated contrast imaging requires individual risk–benefit assessment, not blanket withholding." },
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
            HRS is a haemodynamic kidney dysfunction phenotype in cirrhosis with ascites and may coexist with tubular/structural injury, proteinuria or CKD. ADQI–ICA 2024 replaces historical type 1/2 terminology with HRS-AKI, HRS-AKD and HRS-CKD.<InlineRef topicId="acute-liver-failure" refLabel="ADQI–ICA HRS 2024" />
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-bold text-foreground text-sm mb-1">HRS-AKI</p>
              <p className="text-xs text-muted-foreground">Cirrhosis with ascites; creatinine increase ≥26.5 µmol/L (0.3 mg/dL) within 48 h or ≥50% within 7 days and/or urine output ≤0.5 mL/kg/h for ≥6 h; no improvement within 24 h after adequate resuscitation when clinically indicated; no strong alternative explanation as the primary cause. Low urinary sodium/FENa is not diagnostic. Routine 48 h albumin is not required.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-bold text-foreground text-sm mb-1">HRS-AKD / HRS-CKD</p>
              <p className="text-xs text-muted-foreground">Persistent HRS kidney dysfunction for &lt;90 days is HRS-AKD (classified HRS-AKI if AKI criteria are met); persistence &gt;90 days is HRS-CKD. No 3-day lower bound is imposed. HRS-AKI may occur on pre-existing CKD. Duration and phenotype need specialist assessment.</p>
            </div>
          </div>

          <p className="text-sm font-semibold text-foreground mb-2">Management Algorithm (HRS-AKI)</p>
          <div className="space-y-2 mb-4">
            {[
              { step: "Step 1", action: "Assess volume status, precipitants, medicines, urine sediment and renal imaging; investigate alternative primary causes. Review diuretics according to volume status rather than reflex withdrawal; low urine sodium/FENa alone is not diagnostic." },
              { step: "Step 2", action: "In cirrhosis with ascites and qualifying AKI, assess absence of improvement within 24 h after adequate resuscitation WHEN clinically indicated, with no strong alternative primary cause. Do not mandate 48 h albumin; avoid reflex albumin loading in euvolaemia or overload." },
              { step: "Step 3", action: "Terlipressin plus albumin adjusted to volume status. Select one HRS regimen: EMA continuous infusion starts at 2 mg terlipressin acetate/24 h, with response-guided titration to at most 12 mg/24 h; bolus protocols have different starting/titration rules. Monitor creatinine, perfusion, oxygenation and fluid status, and stop for serious adverse effects or protocol-defined non-response; maximum course 14 days." },
              { step: "Step 4", action: "If terlipressin unavailable or contraindicated: noradrenaline infusion (target ↑ MAP by 10 mmHg) + albumin. Midodrine + octreotide is inferior but used where vasopressors not feasible." },
              { step: "Step 5", action: "Individualise RRT to AKI complications, volume status, trajectory, goals and transplant candidacy, not day 4 or creatinine alone. Seek timely hepatology/renal/transplant assessment; selected interventions depend on clinical suitability." },
            ].map((s) => (
              <div key={s.step} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{s.step}</span>
                <span className="text-sm text-muted-foreground">{s.action}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground"><InlineRef topicId="acute-liver-failure" refLabel="ADQI–ICA HRS 2024" /><InlineRef topicId="acute-liver-failure" refLabel="ADQI–ICA RRT 2024" /></p>
          <div className="p-3 rounded-lg bg-secondary/50 border border-primary/20 mb-4">
            <p className="text-sm font-semibold text-foreground mb-1">⚠️ Terlipressin Safety</p>
            <p className="text-sm text-muted-foreground">
              Check product-specific contraindications and ischaemic risk. MHRA advises avoiding HRS terlipressin when baseline creatinine is ≥442 µmol/L, ACLF grade 3 or MELD ≥39 unless benefits outweigh risks. Stabilise respiratory deterioration before treatment; monitor oxygen saturation, circulation, electrolytes, fluid balance and infection. Reduce albumin with overload/respiratory symptoms and stop terlipressin if these are severe or persistent. CONFIRM improved HRS reversal but raised serious respiratory and sepsis concerns; it was not a continuous-infusion comparison.
            </p>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Prognosis: Alcoholic Liver Disease in ICU</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Acute decompensation of alcoholic liver disease (ALD) admitted to critical care carries high mortality, but outcomes vary significantly with the degree of organ failure and trajectory:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            {[
              { factor: "ICU Mortality", detail: "Overall ICU mortality for decompensated ALD: 30–50%. ACLF grade 3: ICU mortality approaches 70–80%." },
              { factor: "Trajectory Matters", detail: "Reassess after 3–7 days of full organ support. Trajectory and persistent organ failures matter; grade 3 alone neither determines individual mortality nor establishes futility." },
              { factor: "Transplant Candidacy", detail: "Historically required 6 months abstinence. Increasingly, early transplant considered for selected patients with severe alcoholic hepatitis not responding to medical therapy (post ACCELERATE-AH trial data)." },
              { factor: "Futility Considerations", detail: "After 3–7 days of full organ support, patients with no salvage transplant option and ≥4 organ failures OR CLIF-C ACLF >70 may warrant individual multidisciplinary consideration of continuing support, withdrawal and palliative care. This is not automatic futility; reassess trajectory and candidacy." },
            ].map((p) => (
              <div key={p.factor} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{p.factor}</p>
                <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground"><InlineRef topicId="acute-liver-failure" refLabel="EASL ACLF 2023" /> Prognosis depends on trajectory and transplant candidacy; selected severe ACLF patients may benefit from transplantation.</p>
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
              "King's College Criteria (paracetamol): arterial pH <7.30 OR (INR >6.5 + creat >300 + grade III/IV encephalopathy) — poor-prognosis criteria informing specialist assessment; do not wait for these before liver-unit referral.",
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
