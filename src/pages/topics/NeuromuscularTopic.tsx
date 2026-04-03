import { SectionLayout } from "@/components/SectionLayout";
import { NMJDiagram } from "@/components/diagrams/NMJDiagram";
import NeuromuscularMonitoringDiagram from "@/components/diagrams/NeuromuscularMonitoringDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { neuromuscularQuiz } from "@/data/quizzes";

const NeuromuscularTopic = () => {
  return (
    <SectionLayout
      title="Neuromuscular Transmission"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Neuromuscular transmission is the process by which a motor nerve impulse is converted into muscle contraction
            at the neuromuscular junction (NMJ). Understanding this process is essential for anaesthetists, as it underpins
            the pharmacology of neuromuscular blocking agents, their reversal, and neuromuscular monitoring.
          </p>
          <p className="text-sm text-muted-foreground italic mt-2">
            Reference: Martyn JAJ, Fagerlund MJ, Bhatt S. Basic pharmacology of the neuromuscular junction. BJA Education, 2020; Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care, 5th edition.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Neuromuscular Junction</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The animated diagram below shows the sequence of events at the motor end plate. Watch the action potential
            arrive, trigger calcium influx, cause vesicle fusion and ACh release, receptor binding, and finally
            degradation by acetylcholinesterase.
          </p>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <NMJDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Sequence of Events</h2>
          <div className="space-y-4 mt-4">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">1. Action Potential Arrival</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                A motor nerve action potential propagates along the myelinated axon to the nerve terminal. The terminal
                is unmyelinated and contains ~300,000 vesicles, each containing approximately 5,000-10,000 molecules of
                acetylcholine (ACh).
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">2. Calcium Influx</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Depolarisation of the nerve terminal opens voltage-gated calcium channels (P/Q-type). Ca²⁺ influx is
                essential for vesicle fusion — blocking these channels (e.g., Lambert-Eaton syndrome, aminoglycosides)
                impairs neuromuscular transmission.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">3. Vesicle Fusion & ACh Release</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Ca²⁺ triggers the SNARE protein complex (synaptobrevin, SNAP-25, syntaxin) to fuse vesicles with the
                pre-synaptic membrane (exocytosis). Approximately 200-300 vesicles release their ACh content into the
                synaptic cleft — far more than needed (safety margin of ~70%).
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">4. ACh Binds Nicotinic Receptors</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                ACh crosses the 50 nm synaptic cleft and binds to nicotinic acetylcholine receptors (nAChR) on the
                post-synaptic motor end plate. The adult nAChR has the subunit composition <strong>α₂βδε</strong>.
                Two ACh molecules must bind (one to each α subunit) to open the channel.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">5. End-Plate Potential</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Channel opening allows Na⁺ influx (and K⁺ efflux), producing a localised depolarisation — the end-plate
                potential (EPP). If the EPP exceeds threshold (~-55 mV), it triggers a propagating muscle action potential
                via adjacent voltage-gated Na⁺ channels, leading to excitation-contraction coupling.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">6. ACh Hydrolysis</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Acetylcholinesterase (AChE), concentrated in the synaptic cleft, rapidly hydrolyses ACh to choline and
                acetate. Choline is actively reuptaken into the nerve terminal for resynthesis of ACh by choline
                acetyltransferase (ChAT). This rapid termination ensures each nerve impulse produces a single, discrete
                muscle twitch.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Receptor Subtypes at the NMJ</h2>
          <p className="text-foreground/90 leading-relaxed">
            There are multiple receptor types at the NMJ:
          </p>
          <ul className="mt-3 space-y-2 text-foreground/80">
            <li><strong>Post-junctional nAChR (α₂βδε)</strong> — the primary target for neuromuscular blocking agents.
            Non-depolarising agents compete with ACh at the α subunits.</li>
            <li><strong>Pre-junctional nAChR (α₃β₂)</strong> — facilitate positive feedback, mobilising more ACh
            vesicles during sustained activity (explains fade with non-depolarising block).</li>
            <li><strong>Fetal/extrajunctional nAChR (α₂βδγ)</strong> — contain the γ subunit instead of ε. They have
            a longer channel open time and lower conductance. Upregulated in denervation, burns, and immobilisation —
            causing hyperkalaemia with suxamethonium.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Safety Margin</h2>
          <p className="text-foreground/90 leading-relaxed">
            The NMJ has a large safety margin: approximately 70-80% of receptors must be blocked before clinical
            weakness becomes apparent, and {'>'}90% must be blocked for complete paralysis. This is exploited in
            neuromuscular monitoring — train-of-four fade appears when ~75% of receptors are occupied, and single
            twitch depression requires ~80% blockade.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Clinical Relevance</h2>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Conditions Affecting NM Transmission</p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• <strong>Myasthenia Gravis</strong> — autoantibodies against post-junctional nAChR; increased sensitivity to non-depolarising agents</li>
              <li>• <strong>Lambert-Eaton Syndrome</strong> — antibodies against pre-synaptic Ca²⁺ channels; post-tetanic potentiation occurs</li>
              <li>• <strong>Burns/Denervation</strong> — upregulation of extrajunctional receptors; risk of hyperkalaemia with suxamethonium</li>
              <li>• <strong>Aminoglycosides</strong> — reduce pre-synaptic Ca²⁺ entry and potentiate neuromuscular block</li>
            </ul>
          </div>
        </section>
      </div>

      <KeyLearningPoints points={[
        "The NMJ sequence: AP → Ca²⁺ influx → vesicle fusion → ACh release → nAChR binding → EPP → muscle AP → contraction.",
        "Adult nAChR subunit composition is α₂βδε; fetal/extrajunctional receptors contain γ instead of ε.",
        "Two ACh molecules must bind (one per α subunit) to open the nAChR channel.",
        "AChE rapidly hydrolyses ACh to choline + acetate; choline is recycled via active reuptake.",
        "The safety margin means ~75% receptor occupancy before fade appears, ~80% before single twitch depression, >90% for complete block.",
        "Pre-junctional nAChRs (α₃β₂) mediate positive feedback — their block by non-depolarising agents explains train-of-four fade.",
        "Extrajunctional receptor upregulation (burns, denervation, ICU immobility) causes suxamethonium-induced hyperkalaemia."
      ]} />

      <QuizSection questions={neuromuscularQuiz} />
      <TopicCompletionToggle topicId="neuromuscular" topicTitle="Neuromuscular Transmission" />
    </SectionLayout>
  );
};

export default NeuromuscularTopic;
