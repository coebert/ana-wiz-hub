import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { anticoagulantsQuiz } from "@/data/quizzes";
import { CoagulationCascadeDiagram } from "@/components/diagrams/CoagulationCascadeDiagram";

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

const AnticoagulantsTopic = () => {
  return (
    <SectionLayout
      title="Anticoagulant Pharmacology"
      subtitle="FRCA Primary & Final — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
    >
      <div className="prose prose-slate max-w-none">
        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Anticoagulants inhibit the coagulation cascade to prevent and treat thromboembolic disease. Understanding their mechanisms,
            pharmacokinetics, monitoring, and reversal is essential for safe perioperative and critical care management.
            This topic covers <strong>unfractionated heparin (UFH)</strong>, <strong>low-molecular-weight heparins (LMWH)</strong>,
            <strong>warfarin</strong>, <strong>direct oral anticoagulants (DOACs)</strong>, and adjunctive agents.
          </p>
        </section>

        {/* Coagulation cascade context */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Coagulation Cascade — Drug Targets</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Anticoagulants act at different points in the coagulation cascade. The intrinsic and extrinsic pathways converge at
            Factor Xa, which activates thrombin (Factor IIa) to convert fibrinogen to fibrin. Understanding these targets explains
            both mechanism and monitoring.
          </p>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <CoagulationCascadeDiagram />
          </div>
        </section>

        {/* Heparins */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Heparins</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Mechanism of Action</h3>
            <p className="text-foreground/90 leading-relaxed">
              Heparins bind <strong>antithrombin III (AT-III)</strong>, accelerating its inhibition of serine proteases
              (thrombin, Xa, IXa, XIa, XIIa) by ~1,000-fold. UFH requires a minimum chain length of 18 saccharides
              to form the ternary heparin–AT-III–thrombin complex. LMWH chains are shorter, so they predominantly
              inhibit Factor Xa (no ternary complex needed) with less anti-IIa activity.
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
                <p className="text-muted-foreground">Mild, transient ↓ platelets (days 1–4). Non-immune, direct heparin effect. Benign — no treatment change needed. Platelets rarely &lt;100 × 10⁹/L.</p>
              </div>
              <div className="rounded-lg p-4 border border-border bg-card">
                <p className="font-bold text-foreground mb-1">Type II (Immune-mediated)</p>
                <p className="text-muted-foreground">
                  IgG antibodies against heparin–PF4 complexes. Onset days 5–14 (or sooner with prior exposure). Paradoxical <strong>thrombosis</strong> (arterial &amp; venous).
                  ↓ Platelets &gt;50% from baseline. Diagnose: 4Ts score + PF4/heparin ELISA ± serotonin release assay.
                  <strong> Stop all heparin</strong> (including flushes). Switch to argatroban, bivalirudin, or fondaparinux. Do NOT give warfarin until platelets recover (risk of warfarin-induced skin necrosis).
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Protamine Reversal</h3>
            <p className="text-foreground/90 leading-relaxed">
              Protamine is a strongly basic polycationic protein (from salmon sperm) that binds acidic heparin via ionic bonds, forming an inactive complex.
              Dose: <strong>1 mg protamine per 100 IU UFH</strong> given in the previous 2–3 hours. Reduce dose for older heparin.
              Only ~60% effective for LMWH (reverses anti-IIa but not anti-Xa). Side effects include hypotension (histamine release),
              bradycardia, anaphylaxis (fish allergy, prior protamine/insulin exposure), and pulmonary hypertension.
            </p>
          </div>
        </section>

        {/* Warfarin */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Warfarin</h2>

          <div className="space-y-4">
            <div className="rounded-lg p-4 border border-border bg-card">
              <h3 className="font-semibold text-foreground">Mechanism</h3>
              <p className="text-sm text-foreground/80 mt-1">
                Inhibits vitamin K epoxide reductase (VKORC1), preventing γ-carboxylation of vitamin K-dependent clotting factors
                (<strong>II, VII, IX, X</strong>) and anticoagulant proteins <strong>C and S</strong>. The mnemonic is "1972" (factors X, IX, VII, II).
                Onset is delayed (2–7 days) because existing functional factors must be cleared first. Factor VII has the shortest
                half-life (~6 h), so INR rises first, but full anticoagulation requires depletion of Factor II (t½ ~60 h).
              </p>
            </div>

            <div className="rounded-lg p-4 border border-border bg-card">
              <h3 className="font-semibold text-foreground">Pharmacokinetics</h3>
              <p className="text-sm text-foreground/80 mt-1">
                Oral bioavailability ~100%. Highly protein-bound (~99% to albumin). Metabolised by CYP2C9 (S-warfarin, more potent)
                and CYP3A4 (R-warfarin). Half-life 36–42 hours. Monitored by <strong>INR</strong> (PT ratio normalised by ISI).
                Therapeutic range usually INR 2.0–3.0 (mechanical valves: 2.5–3.5).
              </p>
            </div>

            <div className="rounded-lg p-4 border border-border bg-card">
              <h3 className="font-semibold text-foreground">Drug Interactions</h3>
              <p className="text-sm text-foreground/80 mt-1">
                Warfarin has the most drug interactions of any anticoagulant. <strong>Potentiated by</strong>: amiodarone, metronidazole,
                fluconazole, erythromycin, SSRIs, NSAIDs, cranberry juice, alcohol (acute). <strong>Inhibited by</strong>: rifampicin
                (potent CYP inducer), carbamazepine, phenytoin, St John's Wort, vitamin K-rich diet. Genetic polymorphisms in
                CYP2C9 and VKORC1 explain inter-individual variability.
              </p>
            </div>

            <div className="rounded-lg p-4 border border-border bg-card">
              <h3 className="font-semibold text-foreground">Reversal</h3>
              <div className="text-sm text-foreground/80 mt-1 space-y-1">
                <p><strong>Non-urgent (INR 5–9, no bleeding):</strong> Withhold warfarin ± oral vitamin K 1–2 mg</p>
                <p><strong>Urgent (significant bleeding):</strong> IV vitamin K 5 mg + Prothrombin Complex Concentrate (PCC, Beriplex/Octaplex) 25–50 IU/kg</p>
                <p><strong>Life-threatening:</strong> PCC immediately + IV vitamin K 5 mg. FFP is second-line (large volume, slower, infection risk)</p>
                <p className="text-muted-foreground italic">PCC contains factors II, VII, IX, X ± protein C and S. Onset 10–30 min vs FFP 4–6 hours.</p>
              </div>
            </div>

            <div className="rounded-lg p-4 border border-border bg-card">
              <h3 className="font-semibold text-foreground">Warfarin in Pregnancy</h3>
              <p className="text-sm text-foreground/80 mt-1">
                Crosses the placenta (unlike heparin). Teratogenic in first trimester — <strong>warfarin embryopathy</strong>:
                nasal hypoplasia, stippled epiphyses (chondrodysplasia punctata). Risk of fetal intracranial haemorrhage
                in third trimester. Use LMWH in first trimester and peripartum; warfarin may be used in second trimester
                for mechanical heart valves (risk-benefit discussion).
              </p>
            </div>
          </div>
        </section>

        {/* DOACs */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Direct Oral Anticoagulants (DOACs)</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            DOACs directly inhibit a single coagulation factor without requiring antithrombin as a cofactor.
            They offer predictable pharmacokinetics, fixed dosing, fewer interactions, and no routine monitoring.
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg p-4 border border-border bg-card">
              <p className="font-bold text-foreground mb-1">Perioperative Management</p>
              <p className="text-muted-foreground">
                Stop DOACs 24–48 h pre-op (48–72 h if high bleeding risk or renal impairment). No bridging usually required
                (short half-lives). Check anti-Xa level or dTT (dabigatran) if urgent surgery. Neuraxial: follow AAGBI/ESRA guidelines —
                typically 48 h for rivaroxaban/apixaban, 72 h for dabigatran.
              </p>
            </div>
            <div className="rounded-lg p-4 border border-border bg-card">
              <p className="font-bold text-foreground mb-1">Lab Effects</p>
              <p className="text-muted-foreground">
                DOACs affect coagulation tests variably: dabigatran ↑ APTT and dTT; Xa inhibitors ↑ PT (rivaroxaban &gt; apixaban).
                INR is unreliable for DOACs. Drug-specific anti-Xa calibrated assays are the gold standard.
                A normal dTT excludes clinically significant dabigatran levels.
              </p>
            </div>
          </div>
        </section>

        {/* Fondaparinux */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Other Anticoagulants</h2>

          <div className="space-y-3">
            <div className="rounded-lg p-4 border border-border bg-card">
              <p className="font-bold text-foreground text-base">Fondaparinux</p>
              <p className="text-foreground/90 text-sm mt-1">
                <strong>Mechanism:</strong> Synthetic pentasaccharide — binds AT-III and selectively inhibits Factor Xa only. No anti-IIa activity.
              </p>
              <p className="text-foreground/90 text-sm"><strong>Pharmacokinetics:</strong> SC administration, 100% bioavailability, t½ 17–21 h (once daily). Renal excretion — contraindicated if CrCl &lt;20 mL/min.</p>
              <p className="text-foreground/90 text-sm"><strong>Key features:</strong> No HIT risk (does not bind PF4). Not reversed by protamine. Used for HIT treatment and VTE prophylaxis.</p>
            </div>

            <div className="rounded-lg p-4 border border-border bg-card">
              <p className="font-bold text-foreground text-base">Bivalirudin</p>
              <p className="text-foreground/90 text-sm mt-1">
                <strong>Mechanism:</strong> Direct thrombin inhibitor (hirudin analogue). Binds both the active site and exosite-1 of thrombin.
              </p>
              <p className="text-foreground/90 text-sm"><strong>Pharmacokinetics:</strong> IV only. t½ 25 min. 80% enzymatic degradation (proteolysis), 20% renal. Monitor with ACT.</p>
              <p className="text-foreground/90 text-sm"><strong>Use:</strong> PCI (especially in HIT), cardiac surgery in HIT. Short half-life is an advantage. No specific reversal agent.</p>
            </div>

            <div className="rounded-lg p-4 border border-border bg-card">
              <p className="font-bold text-foreground text-base">Argatroban</p>
              <p className="text-foreground/90 text-sm mt-1">
                <strong>Mechanism:</strong> Direct thrombin inhibitor — binds active site only (univalent).
              </p>
              <p className="text-foreground/90 text-sm"><strong>Pharmacokinetics:</strong> IV infusion. t½ 45 min. Hepatic metabolism — preferred in renal failure (vs bivalirudin). Monitor with APTT.</p>
              <p className="text-foreground/90 text-sm"><strong>Use:</strong> First-line for HIT in patients with renal impairment. Caution: falsely ↑ INR when transitioning to warfarin.</p>
            </div>

            <div className="rounded-lg p-4 border border-border bg-card">
              <p className="font-bold text-foreground text-base">Danaparoid</p>
              <p className="text-foreground/90 text-sm mt-1">
                <strong>Mechanism:</strong> Mixture of heparan sulphate, dermatan sulphate, chondroitin sulphate. Anti-Xa &gt;&gt; anti-IIa.
              </p>
              <p className="text-foreground/90 text-sm"><strong>Use:</strong> Alternative in HIT (~10% cross-reactivity with HIT antibodies). SC or IV. t½ 25 h. Monitor with anti-Xa levels.</p>
            </div>
          </div>
        </section>

        {/* Perioperative considerations */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Perioperative & Neuraxial Considerations</h2>
          <p className="text-foreground/90 leading-relaxed mb-3">
            Safe timing of neuraxial blockade relative to anticoagulants is critical to prevent epidural haematoma:
          </p>
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
          <p className="text-sm text-muted-foreground italic mt-2">
            Based on AAGBI/ESRA/ASRA guidelines. Always consider individual patient factors (renal function, bleeding risk, urgency).
          </p>
        </section>
      </div>

      <KeyLearningPoints
        points={[
          "UFH potentiates antithrombin III → inhibits thrombin (IIa) + Xa equally. LMWH predominantly inhibits Xa (shorter chains).",
          "HIT Type II is immune-mediated (anti-PF4/heparin IgG) → paradoxical thrombosis. Stop ALL heparin. Use argatroban or bivalirudin.",
          "Warfarin inhibits vitamin K epoxide reductase (VKORC1) → ↓ factors II, VII, IX, X. Delayed onset (2–7 days). Reversed by vitamin K + PCC.",
          "DOACs directly inhibit thrombin (dabigatran) or Xa (rivaroxaban, apixaban, edoxaban). Predictable kinetics, no routine monitoring.",
          "Idarucizumab specifically reverses dabigatran. Andexanet alfa reverses Xa inhibitors. PCC is used when specific agents are unavailable.",
          "Protamine fully reverses UFH (1 mg per 100 IU) but only ~60% reverses LMWH. Side effects: hypotension, anaphylaxis, pulmonary HTN.",
          "Warfarin is teratogenic (warfarin embryopathy in T1). Heparin does not cross the placenta.",
          "Neuraxial timing: LMWH prophylactic 12 h / therapeutic 24 h; DOACs 48–72 h; warfarin INR ≤1.4.",
        ]}
      />

      <QuizSection questions={anticoagulantsQuiz} />
      <TopicCompletionToggle topicId="anticoagulants" topicTitle="Anticoagulant Pharmacology" />
    </SectionLayout>
  );
};

export default AnticoagulantsTopic;
