import { TopicTemplate } from "@/components/TopicTemplate";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { anticoagulantsQuiz } from "@/data/quizzes";
import CoagulationCascadeDiagram from "@/components/diagrams/CoagulationCascadeDiagram";
import BridgingAnticoagulationPathway from "@/components/diagrams/BridgingAnticoagulationPathway";
import { DiagramSection } from "@/components/DiagramSection";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

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
  { drug: "Dabigatran", target: "Direct thrombin (IIa) inhibitor", bioavail: "6–7%", halfLife: "12–17 h", renal: "80%", reversal: "Idarucizumab (Praxbind)", notes: "Only DOAC with specific reversal agent. Requires acid pH for absorption (avoid PPIs). Dialysable." },
  { drug: "Rivaroxaban", target: "Direct Factor Xa inhibitor", bioavail: "80–100% (with food)", halfLife: "5–13 h", renal: "33%", reversal: "Andexanet alfa / PCC", notes: "Once daily dosing. Take with food for optimal absorption. CYP3A4 & P-gp substrate." },
  { drug: "Apixaban", target: "Direct Factor Xa inhibitor", bioavail: "50%", halfLife: "8–15 h", renal: "27%", reversal: "Andexanet alfa / PCC", notes: "Twice daily. Safest DOAC in renal impairment. Lowest bleeding risk in ARISTOTLE trial." },
  { drug: "Edoxaban", target: "Direct Factor Xa inhibitor", bioavail: "62%", halfLife: "10–14 h", renal: "50%", reversal: "Andexanet alfa / PCC", notes: "Once daily. Dose reduce if CrCl 15–50 mL/min or body weight ≤60 kg." },
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
        diagrams: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["PR_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["PR_BK_05"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2015", "NICE NG89", "BSH 2011"],
        diagrams: ["BJA Educ 2015", "NICE NG89"],
        keyPoints: ["BJA Educ 2015", "NICE NG89", "BSH 2011"],
        workedExamples: ["AAGBI 2016", "BJA Educ 2017"],
      }}
      coreConcepts={
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
                  Oral bioavailability ~100%. ~99% protein-bound. CYP2C9 (S-warfarin) and CYP3A4 (R-warfarin). t½ 36–42 h.
                  Monitored by INR. Therapeutic range 2.0–3.0 (mechanical valves: 2.5–3.5).
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
              DOACs directly inhibit a single coagulation factor without requiring antithrombin. Predictable PK, fixed dosing, no routine monitoring.
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
      }
    />
  );
};

export default AnticoagulantsTopic;
