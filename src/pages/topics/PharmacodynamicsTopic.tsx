import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { pharmacodynamicsQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const PharmacodynamicsTopic = () => {
  return (
    <SectionLayout title="Pharmacodynamics & Drug Receptors" subtitle="FRCA Primary — Pharmacology" backPath="/pharmacology" backLabel="Pharmacology" accentColor="text-pharmacology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Dose-Response Relationships</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Dose-response curve</strong>: hyperbolic. Log(dose)-response: sigmoid. Emax is the maximal response; EC₅₀ is the concentration producing 50% Emax</li>
            <li><strong>Potency</strong>: position of curve on x-axis (EC₅₀). More potent = lower EC₅₀. Example: fentanyl is more potent than morphine</li>
            <li><strong>Efficacy</strong>: maximal effect achievable (Emax). Full agonist has high efficacy; partial agonist has lower Emax regardless of dose</li>
            <li><strong>Therapeutic index</strong>: TD₅₀/ED₅₀ (or LD₅₀/ED₅₀). Narrow TI drugs: digoxin, warfarin, lithium, phenytoin, theophylline</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Agonists & Antagonists</h2>
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
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Receptor Types & Signal Transduction</h2>
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
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Drug Interactions & Tolerance</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Synergism</strong>: combined effect &gt; sum of individual effects (e.g., propofol + remifentanil). Shown by isobolograms</li>
            <li><strong>Tachyphylaxis</strong>: rapid tolerance after repeated doses. Mechanisms: receptor desensitisation (phosphorylation), receptor internalisation, depletion of mediator (e.g., ephedrine)</li>
            <li><strong>Enzyme induction</strong>: ↑ CYP450 activity (rifampicin, phenytoin, carbamazepine) → ↓ drug effect. Takes days-weeks</li>
            <li><strong>Enzyme inhibition</strong>: ↓ CYP450 activity (erythromycin, ciprofloxacin, grapefruit) → ↑ drug effect. Rapid onset</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Potency = EC₅₀ (position on x-axis); Efficacy = Emax (maximal response achievable)",
        "Competitive antagonist: shifts curve RIGHT, Emax preserved. Non-competitive: ↓ Emax, insurmountable",
        "Partial agonist can antagonise a full agonist when both are present (e.g., buprenorphine vs morphine)",
        "4 receptor types: ion channel (ms), GPCR (seconds), kinase-linked (min-hours), nuclear (hours-days)",
        "Gαs → ↑cAMP (β₁), Gαi → ↓cAMP (M₂, μ-opioid), Gαq → IP₃/DAG (α₁, M₁)",
        "Tachyphylaxis: receptor desensitisation, internalisation, or mediator depletion (ephedrine)",
      ]} />
      <QuizSection questions={pharmacodynamicsQuestions} />
      <ReferencesList topicId="pharmacodynamics" />
      <SeeAlso topicId="pharmacodynamics" />
        <TopicCompletionToggle topicId="pharmacodynamics" topicTitle="Pharmacodynamics &amp; Drug Receptors" />
    </SectionLayout>
  );
};

export default PharmacodynamicsTopic;
