import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { anticoagulantsQuiz } from "@/data/quizzes";
import CoagulationCascadeDiagram from "@/components/diagrams/pharmacology/CoagulationCascadeDiagram";
import BridgingAnticoagulationPathway from "@/components/diagrams/pharmacology/BridgingAnticoagulationPathway";
import { DiagramSection } from "@/components/topic/DiagramSection";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const anticoagulantsFaqs: Array<[string, string]> = [
  [
    "What are the perioperative timing recommendations for stopping common anticoagulants?",
    "Warfarin — stop 5 days before; bridge with LMWH if high thrombotic risk (mechanical valve, recent VTE). DOACs — stop 24–48 h if normal renal function (longer for dabigatran in CKD: 2–4 days). LMWH — prophylactic 12 h, treatment 24 h before neuraxial. Aspirin — usually continued for high cardiovascular risk except neurosurgery/posterior chamber eye. Clopidogrel — 7 days; ticagrelor — 5 days. AAGBI/RCoA regional anaesthesia and antithrombotic guidelines should be followed."
  ],
  [
    "How are warfarin, heparin, dabigatran and rivaroxaban reversed?",
    "Warfarin — vitamin K 5–10 mg IV (24 h to act) + 4-factor PCC (Beriplex) 25–50 IU/kg for life-threatening bleeding (immediate). Unfractionated heparin — protamine 1 mg per 100 IU (max 50 mg). LMWH — protamine reverses ~60 % of anti-Xa. Dabigatran — idarucizumab 5 g IV (specific antibody). Rivaroxaban/apixaban — andexanet alfa where available; otherwise 4-factor PCC 25–50 IU/kg."
  ],
  [
    "What is HIT and how is it managed?",
    "Heparin-Induced Thrombocytopenia: immune-mediated platelet activation by anti-PF4-heparin antibodies, causing thrombocytopenia (>50 % drop) AND paradoxical thrombosis 5–10 days after exposure. 4T score for probability. Stop ALL heparin (including flushes/HIT-coated catheters). Anticoagulate with a non-heparin agent (argatroban, danaparoid, or bivalirudin) — do NOT use platelet transfusion or warfarin acutely (paradoxical worsening). Lifelong avoidance of heparin."
  ]
];

const heparinComparison = [
  { property: "Source", ufh: "Porcine intestinal mucosa", lmwh: "Depolymerised UFH" },
  { property: "MW (Da)", ufh: "3,000–30,000 (mean ~15,000)", lmwh: "4,000–6,000" },
  { property: "Anti-Xa : Anti-IIa", ufh: "1 : 1", lmwh: "2–4 : 1" },
  { property: "Bioavailability (SC)", ufh: "~30%", lmwh: "~90%" },
  { property: "Half-life", ufh: "1–2 h (dose-dependent)", lmwh: "4–6 h" },
  { property: "Monitoring", ufh: "APTT (or anti-Xa)", lmwh: "Anti-Xa (if needed)" },
  { property: "Protamine reversal", ufh: "Complete (1 mg per 100 IU)", lmwh: "~60% (anti-Xa only partially reversed)" },
  { property: "HIT risk", ufh: "1–5%", lmwh: "< 1%" },
  { property: "Renal clearance", ufh: "Minimal (RES uptake)", lmwh: "Predominantly renal" },
  { property: "Predictable dose-response", ufh: "No (protein binding)", lmwh: "Yes" },
];

const doacData = [
  { drug: "Dabigatran", target: "Direct thrombin (IIa) inhibitor", bioavail: "6–7%", halfLife: "12–17 h", renal: "80%", reversal: "Idarucizumab (Praxbind)", notes: "AF: 150 mg BD; consider 110 mg BD at CrCl 30–50 mL/min according to age and bleeding risk. Avoid below 30 mL/min. Dialysable." },
  { drug: "Rivaroxaban", target: "Direct Factor Xa inhibitor", bioavail: "80–100% (with food)", halfLife: "5–13 h", renal: "33%", reversal: "Andexanet alfa / PCC", notes: "AF: 20 mg OD with food; reduce to 15 mg OD at CrCl 15–49 mL/min. Avoid below 15 mL/min." },
  { drug: "Apixaban", target: "Direct Factor Xa inhibitor", bioavail: "50%", halfLife: "8–15 h", renal: "27%", reversal: "Andexanet alfa / PCC", notes: "AF: 5 mg BD; use 2.5 mg BD if two of age ≥80, weight ≤60 kg, creatinine ≥133 µmol/L. Use cautiously down to CrCl 15 mL/min." },
  { drug: "Edoxaban", target: "Direct Factor Xa inhibitor", bioavail: "62%", halfLife: "10–14 h", renal: "50%", reversal: "Andexanet alfa / PCC", notes: "AF: 60 mg OD; reduce to 30 mg OD at CrCl 15–50 mL/min. Avoid below 15 mL/min." },
];

const workedExamples: WorkedExample[] = [
  {
    title: "Peri-operative bridging for a patient on warfarin with a mechanical mitral valve",
    scenario:
      "A 62-year-old with a mechanical mitral valve (target INR 3.0) requires elective laparotomy for colorectal resection. He is on warfarin only. How do you plan peri-operative anticoagulation?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Stratify thrombotic risk: mechanical mitral valve = HIGH risk (annual thromboembolism without anticoagulation ~22%). Bridging is indicated.</li>
          <li>Stop warfarin 5 days pre-op; check INR daily from day −3.</li>
          <li>Start therapeutic LMWH (e.g. enoxaparin 1 mg/kg BD or 1.5 mg/kg OD) when INR falls below the target range — typically from day −3.</li>
          <li>Give the last LMWH dose 24 h pre-op (BD regimen: omit evening dose 24 h before; OD regimen: give half-dose 24 h before).</li>
          <li>On the day of surgery confirm INR &lt;1.5 (or &lt;1.3 for neuraxial). If INR still high, give IV vitamin K 1–2 mg or 4-factor PCC if urgent.</li>
          <li>Restart LMWH 24 h post-op (48–72 h for high bleeding risk) and warfarin on the evening of surgery; continue LMWH until INR is therapeutic on two consecutive days.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Bridging low-risk AF patients — modern guidance (BRIDGE trial) shows bridging causes more bleeding without thrombotic benefit.</li>
            <li>Forgetting that mechanical valves cannot use DOACs as a substitute.</li>
            <li>Resuming full-dose LMWH too early after major abdominal surgery — risk of bleeding.</li>
          </ul>
        </div>
      </div>
    ),
    answer: "This is a high-risk indication that requires bridging. Stop warfarin 5 days pre-op, start therapeutic LMWH when INR drops below the target range, omit LMWH 24 h pre-op, confirm INR <1.5 on the day, and resume LMWH 24 h post-op alongside warfarin until INR is back in range on two consecutive days.",
    cites: ["AAGBI 2016","BJA Educ 2017"],
  },
];
const AnticoagulantsTopic = () => {
  return (
    <TopicTemplate
      title="Anticoagulant Pharmacology"
      subtitle="FRCA Primary & Final — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="anticoagulants"
      topicTitle="Anticoagulant Pharmacology"
      quizQuestions={anticoagulantsQuiz}
      objectives={[
        "Map anticoagulant drug classes (heparins, warfarin, DOACs, fondaparinux, DTIs) onto the coagulation cascade",
        "Compare UFH and LMWH by mechanism, monitoring, reversal and HIT risk",
        "Manage warfarin perioperatively and reverse it appropriately for non-urgent, urgent and life-threatening bleeding",
        "Stop and restart DOACs around surgery and neuraxial procedures using AAGBI/ESRA timing rules",
        "Recognise and treat heparin-induced thrombocytopenia (HIT) including alternative anticoagulation",
      ]}
      keyPoints={[
        { text: "UFH potentiates antithrombin III → inhibits thrombin (IIa) + Xa equally. LMWH predominantly inhibits Xa (shorter chains).", cites: ["NICE NG89"] },
        { text: "HIT Type II is immune-mediated (anti-PF4/heparin IgG) → paradoxical thrombosis. Stop ALL heparin. Use argatroban or bivalirudin.", cites: ["BJA Educ 2015"] },
        { text: "Warfarin inhibits vitamin K epoxide reductase (VKORC1) → ↓ factors II, VII, IX, X. Delayed onset (2–7 days). Reversed by vitamin K + PCC.", cites: ["BSH 2011"] },
        { text: "DOACs directly inhibit thrombin (dabigatran) or Xa (rivaroxaban, apixaban, edoxaban). Predictable kinetics, no routine monitoring.", cites: ["NICE NG89"] },
        { text: "Idarucizumab specifically reverses dabigatran. Andexanet alfa reverses Xa inhibitors. PCC is used when specific agents are unavailable.", cites: ["BJA Educ 2015"] },
        { text: "Protamine fully reverses UFH (1 mg per 100 IU) but only ~60% reverses LMWH. Side effects: hypotension, anaphylaxis, pulmonary HTN.", cites: ["BSH 2011"] },
        { text: "Warfarin is teratogenic (warfarin embryopathy in T1). Heparin does not cross the placenta.", cites: ["NICE NG89"] },
        { text: "Neuraxial timing: LMWH prophylactic 12 h / therapeutic 24 h; DOACs 48–72 h; warfarin INR ≤1.4.", cites: ["BJA Educ 2015"] },
      ]}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["PR_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["PR_BK_05"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2015", "NICE NG89", "BSH 2011"],
        keyPoints: ["BJA Educ 2015", "NICE NG89", "BSH 2011"],
        workedExamples: ["AAGBI 2016", "BJA Educ 2017"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
        <div className="prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Anticoagulants inhibit the coagulation cascade to prevent and treat thromboembolic disease. Understanding their mechanisms,
              pharmacokinetics, monitoring, and reversal is essential for safe perioperative and critical care management.
              This topic covers <strong>unfractionated heparin (UFH)</strong>, <strong>low-molecular-weight heparins (LMWH)</strong>,
              <strong>warfarin</strong>, <strong>direct oral anticoagulants (DOACs)</strong>, and adjunctive agents.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">The Coagulation Cascade — Drug Targets</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Anticoagulants act at different points in the coagulation cascade. The intrinsic and extrinsic pathways converge at
              Factor Xa, which activates thrombin (Factor IIa) to convert fibrinogen to fibrin.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <CoagulationCascadeDiagram />
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Heparins</h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Mechanism of Action</h3>
              <p className="text-foreground/90 leading-relaxed">
                Heparins bind <strong>antithrombin III (AT-III)</strong>, accelerating its inhibition of serine proteases
                (thrombin, Xa, IXa, XIa, XIIa) by ~1,000-fold. UFH requires a minimum chain length of 18 saccharides
                to form the ternary heparin–AT-III–thrombin complex. LMWH chains are shorter, so they predominantly
                inhibit Factor Xa with less anti-IIa activity.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">UFH vs LMWH Comparison</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-border rounded-lg">
                  <thead>
                    <tr className="bg-secondary/50">
                      <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Property</th>
                      <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">UFH</th>
                      <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">LMWH</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/90">
                    {heparinComparison.map((row) => (
                      <tr key={row.property} className="border-b border-border/50">
                        <td className="px-3 py-2 font-medium text-foreground">{row.property}</td>
                        <td className="px-3 py-2">{row.ufh}</td>
                        <td className="px-3 py-2">{row.lmwh}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Heparin-Induced Thrombocytopenia (HIT)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg p-4 border border-border bg-card">
                  <p className="font-bold text-foreground mb-1">Type I (Non-immune)</p>
                  <p className="text-muted-foreground">Mild, transient ↓ platelets (days 1–4). Non-immune, direct heparin effect. Benign — no treatment change needed.</p>
                </div>
                <div className="rounded-lg p-4 border border-border bg-card">
                  <p className="font-bold text-foreground mb-1">Type II (Immune-mediated)</p>
                  <p className="text-muted-foreground">
                    IgG antibodies against heparin–PF4 complexes. Onset days 5–14. Paradoxical <strong>thrombosis</strong>.
                    ↓ Platelets &gt;50% from baseline. <strong>Stop all heparin</strong>. Switch to argatroban, bivalirudin, or fondaparinux.
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground mb-1">Diagnosis of type II HIT</p>
                <p className="text-sm text-foreground/80">
                  Diagnosis is a two-step process: estimate pre-test probability with the <strong>4Ts score</strong> (0–2 points each,
                  maximum 8), then confirm with laboratory testing. A low score (0–3) makes HIT very unlikely and heparin can usually
                  continue; intermediate (4–5) or high (6–8) scores mandate stopping heparin and starting a non-heparin anticoagulant
                  while tests are awaited<InlineRef topicId="anticoagulants" refLabel="BSH HIT 2012" />.
                </p>
                <div className="overflow-x-auto mt-3">
                  <table className="min-w-full text-sm border border-border rounded-lg">
                    <thead><tr className="bg-secondary/50"><th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">4Ts component</th><th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">2 points</th><th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">0 points</th></tr></thead>
                    <tbody className="text-foreground/90">
                      <tr className="border-b border-border/50"><td className="px-3 py-2 font-medium text-foreground">Thrombocytopenia</td><td className="px-3 py-2">Fall &gt;50% and nadir ≥20 × 10⁹/L</td><td className="px-3 py-2">Fall &lt;30% or nadir &lt;10 × 10⁹/L</td></tr>
                      <tr className="border-b border-border/50"><td className="px-3 py-2 font-medium text-foreground">Timing of fall</td><td className="px-3 py-2">Days 5–10, or ≤1 day with heparin in the last 30 days</td><td className="px-3 py-2">Fall &lt;4 days without recent exposure</td></tr>
                      <tr className="border-b border-border/50"><td className="px-3 py-2 font-medium text-foreground">Thrombosis or sequelae</td><td className="px-3 py-2">New confirmed thrombosis, skin necrosis, or systemic reaction after a bolus</td><td className="px-3 py-2">None</td></tr>
                      <tr className="border-b border-border/50"><td className="px-3 py-2 font-medium text-foreground">Other causes</td><td className="px-3 py-2">None apparent</td><td className="px-3 py-2">Definite alternative cause (sepsis, DIC, dilution, drugs)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-foreground/80 mt-3">
                  <strong>Immunoassay:</strong> ELISA for anti-PF4/heparin antibodies — highly sensitive (a negative result effectively
                  excludes HIT) but poorly specific, since many patients form non-pathogenic antibodies after cardiac surgery.
                  <strong> Functional assay:</strong> serotonin release assay (SRA) or heparin-induced platelet aggregation (HIPA)
                  demonstrates platelet activation and is both sensitive and specific — the reference standard, but available only in
                  specialist laboratories with a slow turnaround, so treatment is started on clinical grounds.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Protamine Reversal</h3>
              <p className="text-foreground/90 leading-relaxed">
                Protamine is a polycationic protein (salmon sperm) that binds acidic heparin via ionic bonds.
                Dose: <strong>1 mg per 100 IU UFH</strong>. Only ~60% effective for LMWH. Side effects: hypotension,
                bradycardia, anaphylaxis (fish allergy, prior protamine/insulin exposure), pulmonary hypertension.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Warfarin</h2>
            <div className="space-y-4">
              <div className="rounded-lg p-4 border border-border bg-card">
                <h3 className="font-semibold text-foreground">Mechanism</h3>
                <p className="text-sm text-foreground/80 mt-1">
                  Inhibits vitamin K epoxide reductase (VKORC1), preventing γ-carboxylation of factors <strong>II, VII, IX, X</strong>
                  and proteins C/S. Onset delayed (2–7 days). Factor VII has shortest t½ (~6 h), so INR rises first.
                </p>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <h3 className="font-semibold text-foreground">Pharmacokinetics</h3>
                <p className="text-sm text-foreground/80 mt-1">
                  Oral bioavailability ~100%. ~99% protein-bound (albumin). Racemic mixture: <strong>S-warfarin is 3–5 times more
                  potent</strong> than R-warfarin and is cleared by CYP2C9, while R-warfarin is metabolised by CYP3A4 and CYP1A2.
                  t½ 36–42 h. Monitored by INR; therapeutic range 2.0–3.0 (mechanical valves 2.5–3.5).
                </p>
                <p className="text-sm text-foreground/80 mt-2">
                  Because the active enantiomer depends on a single polymorphic enzyme, <strong>CYP2C9 *2 and *3 alleles</strong> reduce
                  S-warfarin clearance and are associated with lower dose requirements and a higher bleeding risk; VKORC1 promoter
                  variants alter target sensitivity<InlineRef topicId="anticoagulants" refLabel="CYP2C9 Warfarin 2005" />.
                </p>
                <div className="overflow-x-auto mt-3">
                  <table className="min-w-full text-sm border border-border rounded-lg">
                    <thead><tr className="bg-secondary/50"><th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Mechanism</th><th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Effect on INR</th><th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Examples</th></tr></thead>
                    <tbody className="text-foreground/90">
                      <tr className="border-b border-border/50"><td className="px-3 py-2">CYP2C9/3A4 inhibition</td><td className="px-3 py-2">↑ INR</td><td className="px-3 py-2">Amiodarone, fluconazole and other azoles, metronidazole, macrolides, ciprofloxacin, omeprazole</td></tr>
                      <tr className="border-b border-border/50"><td className="px-3 py-2">CYP induction</td><td className="px-3 py-2">↓ INR</td><td className="px-3 py-2">Rifampicin, carbamazepine, phenytoin, St John's wort, chronic alcohol</td></tr>
                      <tr className="border-b border-border/50"><td className="px-3 py-2">Reduced absorption / enterohepatic binding</td><td className="px-3 py-2">↓ INR</td><td className="px-3 py-2">Cholestyramine, sucralfate</td></tr>
                      <tr className="border-b border-border/50"><td className="px-3 py-2">Displacement from albumin (with added antiplatelet or gastric injury)</td><td className="px-3 py-2">↑ bleeding risk (transient ↑ INR)</td><td className="px-3 py-2">NSAIDs, aspirin, high-dose sulfonamides</td></tr>
                      <tr className="border-b border-border/50"><td className="px-3 py-2">Reduced vitamin K availability</td><td className="px-3 py-2">↑ INR</td><td className="px-3 py-2">Broad-spectrum antibiotics (gut flora), poor oral intake, malabsorption</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-foreground/80 mt-2">
                  <strong>Diet:</strong> a high vitamin K intake (green leafy vegetables) lowers the INR while a sudden reduction raises
                  it — consistency matters more than restriction. <strong>Liver disease</strong> both impairs synthesis of the
                  vitamin K-dependent factors and reduces warfarin clearance, so the baseline INR is already prolonged and the
                  response to a given dose is exaggerated and unpredictable; heart failure with hepatic congestion behaves similarly.
                </p>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <h3 className="font-semibold text-foreground">Reversal</h3>
                <div className="text-sm text-foreground/80 mt-1 space-y-1">
                  <p><strong>Non-urgent (INR 5–9, no bleeding):</strong> Withhold ± oral vitamin K 1–2 mg</p>
                  <p><strong>Urgent (significant bleeding):</strong> IV vitamin K 5 mg + PCC 25–50 IU/kg</p>
                  <p><strong>Life-threatening:</strong> PCC immediately + IV vitamin K 5 mg. FFP second-line.</p>
                </div>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <h3 className="font-semibold text-foreground">Initial Prothrombotic State</h3>
                <p className="text-sm text-foreground/80 mt-1">Protein C (half-life about 8 h) and protein S fall before procoagulant factor II (half-life about 60–72 h), transiently reducing endogenous anticoagulant activity more rapidly than thrombin generation. This explains warfarin-induced skin necrosis, especially with protein C/S deficiency, and why therapeutic heparin overlap is required when warfarin is initiated for acute VTE <InlineRef topicId="anticoagulants" refLabel="BNF Oral Anticoagulants" />.</p>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <h3 className="font-semibold text-foreground">Warfarin-Induced Skin Necrosis</h3>
                <p className="text-sm text-foreground/80 mt-1"><strong>Pathophysiology:</strong> protein C (half-life about 8 h) falls faster than the procoagulant factors II, VII, IX and X (factor II half-life 60–72 h), so early warfarin therapy creates a transient hypercoagulable state with dermal venular thrombosis. <strong>Risk factors:</strong> large loading doses without heparin overlap, and inherited protein C or protein S deficiency. <strong>Clinical features:</strong> typically within the first week of treatment — painful, erythematous, indurated lesions in fat-rich areas (breasts, thighs, buttocks, abdomen) progressing to haemorrhagic bullae and full-thickness skin necrosis. <strong>Management:</strong> stop warfarin; give IV vitamin K; start therapeutic heparin (UFH or LMWH); give protein C concentrate (or fresh frozen plasma) where available; involve dermatology and plastic surgery, as surgical debridement or grafting may be needed. Later re-anticoagulation, if essential, uses low starting doses under full heparin cover <InlineRef topicId="anticoagulants" refLabel="BSH 2011" />.</p>

                <h3 className="font-semibold text-foreground">Warfarin in Pregnancy</h3>
                <p className="text-sm text-foreground/80 mt-1">
                  Crosses placenta. Teratogenic in first trimester (warfarin embryopathy: nasal hypoplasia, stippled epiphyses).
                  Use LMWH in T1 and peripartum.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Direct Oral Anticoagulants (DOACs)</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              DOACs directly inhibit a single coagulation factor without requiring antithrombin. Renal recommendations below are common atrial-fibrillation regimens; indication-specific dosing, Cockcroft–Gault creatinine clearance, age, weight and interacting drugs must be checked against the current formulary <InlineRef topicId="anticoagulants" refLabel="BNF Oral Anticoagulants" />.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Drug</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Target</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Bioavail.</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">t½</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Renal</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Reversal</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  {doacData.map((d) => (
                    <tr key={d.drug} className="border-b border-border/50">
                      <td className="px-3 py-2 font-bold text-foreground">{d.drug}</td>
                      <td className="px-3 py-2">{d.target}</td>
                      <td className="px-3 py-2">{d.bioavail}</td>
                      <td className="px-3 py-2">{d.halfLife}</td>
                      <td className="px-3 py-2">{d.renal}</td>
                      <td className="px-3 py-2">{d.reversal}</td>
                      <td className="px-3 py-2 text-xs">{d.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Other Anticoagulants</h2>
            <div className="space-y-3">
              <div className="rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground text-base">Fondaparinux</p>
                <p className="text-foreground/90 text-sm mt-1">Synthetic pentasaccharide — binds AT-III, selective Factor Xa only. SC, 100% bioavail, t½ 17–21 h. No HIT risk. Not reversed by protamine.</p>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground text-base">Bivalirudin</p>
                <p className="text-foreground/90 text-sm mt-1">Direct thrombin inhibitor (hirudin analogue). IV only. t½ 25 min. Used for PCI in HIT. No specific reversal.</p>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground text-base">Argatroban</p>
                <p className="text-foreground/90 text-sm mt-1">Direct thrombin inhibitor. IV. t½ 45 min. Hepatic metabolism — preferred in renal failure. First-line for HIT in renal impairment.</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Perioperative & Neuraxial Considerations</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Drug</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Stop Before Neuraxial</th>
                    <th className="px-3 py-2 text-left text-foreground font-semibold border-b border-border">Restart After</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  {[
                    { drug: "UFH (prophylactic)", before: "4–6 h (check APTT)", after: "1 h" },
                    { drug: "UFH (therapeutic)", before: "4–6 h + normal APTT", after: "1 h" },
                    { drug: "LMWH (prophylactic)", before: "12 h", after: "4 h" },
                    { drug: "LMWH (therapeutic)", before: "24 h", after: "4 h" },
                    { drug: "Warfarin", before: "5 days (INR ≤1.4)", after: "After catheter removal" },
                    { drug: "Rivaroxaban / Apixaban", before: "48 h (72 h if renal impairment)", after: "6 h" },
                    { drug: "Dabigatran", before: "72 h (CrCl >50) / 96 h (CrCl 30–50)", after: "6 h" },
                    { drug: "Fondaparinux", before: "36–42 h", after: "6–12 h" },
                  ].map((row) => (
                    <tr key={row.drug} className="border-b border-border/50">
                      <td className="px-3 py-2 font-medium text-foreground">{row.drug}</td>
                      <td className="px-3 py-2">{row.before}</td>
                      <td className="px-3 py-2">{row.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground italic mt-2">Based on AAGBI/ESRA/ASRA guidelines.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">DOAC Reversal Agents</h2>
            <div className="space-y-4">
              <div className="rounded-lg p-4 border border-border bg-card">
                <h3 className="font-semibold text-foreground">Idarucizumab (Praxbind®)</h3>
                <ul className="text-sm text-foreground/80 mt-1 space-y-1 list-disc list-inside">
                  <li><strong>Mechanism:</strong> humanised monoclonal antibody fragment (Fab) that binds dabigatran with roughly 350 times the affinity of dabigatran for thrombin, forming an inactive complex cleared renally.</li>
                  <li><strong>Indication:</strong> dabigatran reversal for emergency surgery or an urgent procedure, and for life-threatening or uncontrolled bleeding.</li>
                  <li><strong>Dose:</strong> 5 g total — two consecutive 2.5 g intravenous infusions over 5–10 min each (or bolus), given no more than 15 min apart.</li>
                  <li><strong>Onset and duration:</strong> immediate; dilute thrombin time and ecarin clotting time normalise within minutes in essentially all patients. Redistribution of dabigatran from tissues can cause re-elevation of clotting times at 12–24 h, so a second 5 g dose is occasionally needed<InlineRef topicId="anticoagulants" refLabel="RE-VERSE AD 2017" />.</li>
                  <li><strong>Practical points:</strong> no procoagulant effect of its own; dabigatran is also dialysable (~60% removed in 2–3 h) if idarucizumab is unavailable. Restart anticoagulation as soon as haemostasis allows, since thrombotic risk returns.</li>
                </ul>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <h3 className="font-semibold text-foreground">Andexanet alfa (Ondexxya®)</h3>
                <ul className="text-sm text-foreground/80 mt-1 space-y-1 list-disc list-inside">
                  <li><strong>Mechanism:</strong> recombinant, catalytically inactive modified human factor Xa that acts as a decoy, binding and sequestering direct Xa inhibitors (and, via tissue factor pathway inhibitor binding, indirectly restoring thrombin generation).</li>
                  <li><strong>Indication:</strong> apixaban or rivaroxaban reversal in life-threatening or uncontrolled bleeding (notably intracranial haemorrhage).</li>
                  <li><strong>Dose:</strong> two-part regimen — intravenous bolus followed by a 2-hour infusion. Low dose (400 mg bolus, 480 mg infusion) or high dose (800 mg bolus, 960 mg infusion) depending on the agent, the last dose taken and the interval since it.</li>
                  <li><strong>Considerations:</strong> effect is transient and sustained only during the infusion, with anti-Xa activity rebounding afterwards; thrombotic events occurred in about 10% of patients at 30 days, so it carries a boxed warning and anticoagulation should be resumed when safe. It also interferes with heparin monitoring and with unfractionated heparin used for cardiopulmonary bypass<InlineRef topicId="anticoagulants" refLabel="ANNEXA-4 2019" />.</li>
                  <li><strong>Alternative:</strong> where andexanet is unavailable, four-factor PCC 25–50 IU/kg is used, accepting weaker evidence.</li>
                </ul>
              </div>
            </div>
          </section>

          <DiagramSection
            title="Bridging Anticoagulation — Decision Pathway"
            intro="Decide whether a warfarinised patient needs LMWH bridging around surgery."
          >
            <BridgingAnticoagulationPathway />
          </DiagramSection>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "UFH: monitored by APTT; reversed by protamine 1 mg per 100 IU; risk of HIT (type II, immune-mediated).",
              "LMWH: predictable PK, monitored by anti-Xa if needed (renal failure, pregnancy, extremes of weight); partially reversed by protamine.",
              "Warfarin: inhibits vitamin K epoxide reductase; INR target depends on indication; reverse with PCC + IV vitamin K for major bleeding.",
              "DOACs: dabigatran (anti-IIa, reversed by idarucizumab); apixaban/rivaroxaban (anti-Xa, reversed by andexanet alfa or PCC).",
              "Neuraxial timing (AAGBI): LMWH prophylactic 12 h before, treatment 24 h before; DOACs 48–72 h depending on agent and renal function.",
            ]}
          />
        </div>
      </ExamSection>
          <TopicFaqs faqs={anticoagulantsFaqs} />
        </>
      }
    />
  );
};

export default AnticoagulantsTopic;
