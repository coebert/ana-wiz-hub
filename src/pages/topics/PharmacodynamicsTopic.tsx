import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { pharmacodynamicsQuestions } from "@/data/quizzes";

const objectives = [
  "Distinguish potency (EC₅₀) from efficacy (Emax) and read sigmoid log dose-response curves",
  "Classify drugs as full / partial / inverse agonists, and competitive / non-competitive antagonists",
  "Predict the effect of a partial agonist on a full agonist response (e.g. buprenorphine vs morphine)",
  "Match receptor types to time-course (ion channel ms, GPCR seconds, kinase min-h, nuclear h-d)",
  "Explain tachyphylaxis, tolerance, synergism, and clinically important enzyme induction/inhibition",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Buprenorphine in a patient on chronic morphine",
    scenario:
      "A patient on regular morphine 60 mg PO for chronic pain is started on sublingual buprenorphine 8 mg for substitution therapy. Within hours she develops withdrawal symptoms. Why?",
    working:
      "Buprenorphine is a high-affinity partial agonist at the μ-opioid receptor (intrinsic activity ~0.4) with a much higher receptor affinity than morphine (full agonist, intrinsic activity 1).\nWhen given to a fully μ-occupied patient, buprenorphine displaces morphine from the receptor but only delivers a partial signal — the net opioid effect falls → precipitated withdrawal.\nBuprenorphine also has a ceiling effect on respiratory depression but not on analgesia.",
    answer:
      "Buprenorphine displaced morphine from the μ-receptor; its lower intrinsic activity provided a smaller signal → precipitated withdrawal. Always wait for objective withdrawal (COWS ≥ 12) before initiating buprenorphine in opioid-dependent patients (the 'micro-induction' or Bernese protocol minimises this risk).",
  },
  {
    title: "Reading a parallel right-shift on a dose-response curve",
    scenario:
      "An exam graph shows a noradrenaline log dose-response curve (control), and a second curve shifted to the right with an unchanged Emax. Which class of antagonist explains this, and which doesn't?",
    working:
      "Parallel rightward shift with preserved Emax = competitive (reversible) antagonist. The agonist can still reach Emax — just needs higher concentrations (↑ EC₅₀).\nNon-competitive (irreversible or allosteric) antagonists cause a ↓ Emax: the curve is depressed, not parallel-shifted.\nExample of competitive at α₁: phentolamine. Example of irreversible at α₁: phenoxybenzamine (the answer to a phaeochromocytoma curve).",
    answer:
      "A competitive (surmountable) antagonist such as phentolamine. A non-competitive antagonist (e.g. phenoxybenzamine) would lower Emax. Recognising shift vs depression is a high-yield FRCA Primary visual question.",
  },
];

const PharmacodynamicsTopic = () => {
  return (
    <TopicTemplate
      title="Pharmacodynamics & Drug Receptors"
      subtitle="Dose-response, agonism, antagonism, and receptor signal transduction"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="pharmacodynamics"
      topicTitle="Pharmacodynamics & Drug Receptors"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={pharmacodynamicsQuestions}
      sectionExamMapping={{
        objectives: { exams: ["primary"], curriculumCodes: ["RCoA Primary — Pharmacology"] },
        workedExamples: { exams: ["primary", "final"] },
        keyPoints: { exams: ["primary", "final"] },
      }}
      sectionSources={{
        objectives: [
          "RCoA 2021 Curriculum — Pharmacology (Primary)",
          "Rang HP, Ritter JM, Flower RJ, Henderson G. Rang & Dale's Pharmacology, 9th ed (Elsevier, 2019) — chapters 2-3 (receptor theory)",
          "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care, 5th ed (Cambridge UP, 2020)",
        ],
        workedExamples: [
          "Davis MP. Twelve reasons for considering buprenorphine as a frontline analgesic. J Support Oncol 2012;10:209-19 — partial agonism and precipitated withdrawal",
          "Hämmig R et al. Use of microdoses for induction of buprenorphine treatment (the Bernese method). Subst Abuse Rehabil 2016;7:99-105",
          "Kenakin T. A Pharmacology Primer, 5th ed — competitive vs non-competitive antagonism and dose-response curve interpretation",
        ],
        keyPoints: [
          "Sasaki M et al. Inverse agonism at GPCRs and constitutive activity. Br J Pharmacol 2017",
          "Lynch JJ, Castagné V. Tachyphylaxis: receptor desensitisation and internalisation. Pharmacol Rev — receptor regulation",
          "Aronson JK. Meyler's Side Effects of Drugs, 16th ed — narrow therapeutic index drugs",
        ],
      }}
      keyPoints={[
        "Potency = EC₅₀ (position on x-axis); Efficacy = Emax (maximal response achievable)",
        "Competitive antagonist: shifts curve RIGHT, Emax preserved. Non-competitive: ↓ Emax, insurmountable",
        "Partial agonist can antagonise a full agonist when both are present (e.g., buprenorphine vs morphine)",
        "4 receptor types: ion channel (ms), GPCR (seconds), kinase-linked (min-hours), nuclear (hours-days)",
        "Gαs → ↑cAMP (β₁), Gαi → ↓cAMP (M₂, μ-opioid), Gαq → IP₃/DAG (α₁, M₁)",
        "Tachyphylaxis: receptor desensitisation, internalisation, or mediator depletion (ephedrine)",
        "Therapeutic index = TD₅₀/ED₅₀. Narrow TI: digoxin, warfarin, lithium, phenytoin, theophylline",
      ]}
      coreConcepts={
        <>
          <ExamSection id="dose-response" exams={["primary"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Dose-Response Relationships</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Dose-response curve</strong>: hyperbolic. Log(dose)-response: sigmoid. Emax is the maximal response; EC₅₀ is the concentration producing 50% Emax</li>
              <li><strong>Potency</strong>: position of curve on x-axis (EC₅₀). More potent = lower EC₅₀. Example: fentanyl is more potent than morphine</li>
              <li><strong>Efficacy</strong>: maximal effect achievable (Emax). Full agonist has high efficacy; partial agonist has lower Emax regardless of dose</li>
              <li><strong>Therapeutic index</strong>: TD₅₀/ED₅₀ (or LD₅₀/ED₅₀). Narrow TI drugs: digoxin, warfarin, lithium, phenytoin, theophylline</li>
            </ul>
          </ExamSection>

          <ExamSection id="agonists-antagonists" exams={["primary"]} curriculumCodes={["RCoA Primary — Pharmacology"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Agonists & Antagonists</h2>
            <div className="space-y-3">
              {[
                { type: "Full agonist", desc: "Binds receptor, produces maximal response. Intrinsic activity = 1. Examples: morphine (μ), adrenaline (α₁, β₁, β₂)." },
                { type: "Partial agonist", desc: "Binds receptor, submaximal response even at full occupancy. Intrinsic activity 0-1. Can antagonise a full agonist when both present. Examples: buprenorphine (μ), pindolol (β)." },
                { type: "Competitive antagonist", desc: "Binds same site as agonist reversibly. Shifts dose-response curve RIGHT (↑ EC₅₀) but Emax preserved (surmountable). Examples: atracurium (nAChR), naloxone (μ)." },
                { type: "Non-competitive antagonist", desc: "Binds different site or irreversibly. ↓ Emax (insurmountable). Curve depressed, not shifted. Examples: phenoxybenzamine (α₁, irreversible), ketamine (NMDA, channel block)." },
                { type: "Inverse agonist", desc: "Binds receptor, produces opposite effect to agonist. Reduces constitutive activity below baseline. Example: some benzodiazepine site ligands." },
              ].map(item => (
                <div key={item.type} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.type}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="receptors" exams={["primary"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Receptor Types & Signal Transduction</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Type</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                  <th className="text-left py-2 text-foreground font-semibold">Speed</th>
                  <th className="text-left py-2 text-foreground font-semibold">Examples</th>
                </tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Ligand-gated ion channel</td><td>Direct ion flow</td><td>Milliseconds</td><td>nAChR (Na⁺), GABA_A (Cl⁻), 5-HT₃, NMDA (Ca²⁺)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">G-protein coupled (GPCR)</td><td>Gαs/Gαi/Gαq → second messengers</td><td>Seconds</td><td>β₁ (Gαs→cAMP↑), M₂ (Gαi→cAMP↓), α₁ (Gαq→IP₃/DAG)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Kinase-linked</td><td>Tyrosine kinase phosphorylation</td><td>Minutes–hours</td><td>Insulin receptor, growth factor receptors</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Nuclear/intracellular</td><td>Gene transcription</td><td>Hours–days</td><td>Steroid receptors, thyroid hormone, vitamin D</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="interactions-tolerance" exams={["primary", "final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Drug Interactions & Tolerance</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Synergism</strong>: combined effect &gt; sum of individual effects (e.g., propofol + remifentanil). Shown by isobolograms</li>
              <li><strong>Tachyphylaxis</strong>: rapid tolerance after repeated doses. Mechanisms: receptor desensitisation (phosphorylation), receptor internalisation, depletion of mediator (e.g., ephedrine)</li>
              <li><strong>Enzyme induction</strong>: ↑ CYP450 activity (rifampicin, phenytoin, carbamazepine) → ↓ drug effect. Takes days-weeks</li>
              <li><strong>Enzyme inhibition</strong>: ↓ CYP450 activity (erythromycin, ciprofloxacin, grapefruit) → ↑ drug effect. Rapid onset</li>
            </ul>
          </ExamSection>
        </>
      }
    />
  );
};

export default PharmacodynamicsTopic;
