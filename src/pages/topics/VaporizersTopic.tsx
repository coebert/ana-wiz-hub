import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { vaporizersQuiz } from "@/data/quizzes";
import { VaporizerDiagram } from "@/components/diagrams/VaporizerDiagram";

const VaporizersTopic = () => {
  return (
    <SectionLayout
      title="Vaporizers"
      subtitle="FRCA Primary — Physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Vaporizers convert liquid volatile anaesthetic agents into a controlled concentration of vapour for inhalation.
            Understanding the physics of vaporization — saturated vapour pressure, latent heat, and splitting ratios — is
            essential for safe delivery of volatile agents.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Interactive Vaporizer Schematic</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Explore how a plenum vaporizer splits fresh gas flow into bypass and vaporizing chamber streams to deliver
            a precise concentration of volatile agent.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <VaporizerDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Saturated Vapour Pressure (SVP)</h2>
          <p className="text-foreground/90 leading-relaxed">
            SVP is the pressure exerted by a vapour in equilibrium with its liquid phase at a given temperature. SVP depends
            only on temperature and the agent — not on atmospheric pressure. At 20°C: sevoflurane SVP ≈ 21.3 kPa,
            isoflurane ≈ 33.2 kPa, desflurane ≈ 88.5 kPa.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Why Desflurane is Different</p>
            <p className="text-sm text-muted-foreground mt-1">
              Desflurane has a boiling point of 22.8°C (near room temperature) and extremely high SVP. It cannot use a
              conventional plenum vaporizer — the TEC 6 uses electrical heating to 39°C and 2 atm, injecting a precise
              amount of pure vapour into the fresh gas flow.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Plenum Vaporizers</h2>
          <p className="text-foreground/90 leading-relaxed">
            Plenum ("full of") vaporizers operate at above atmospheric pressure (pushed by fresh gas flow). The dial controls
            a <strong>splitting ratio</strong> — the proportion of gas directed through the vaporizing chamber vs bypass.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Temperature compensation</strong> is achieved by a bimetallic strip or expansion bellows that adjusts
            the splitting ratio as temperature changes. As cooling occurs (latent heat loss), the compensator diverts more
            gas through the vaporizing chamber to maintain output.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Wicks, baffles, and sintered discs increase surface area for vaporization. Modern vaporizers (TEC 5, 7) are
            agent-specific with keyed filling systems to prevent misfilling.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Draw-Over Vaporizers</h2>
          <p className="text-foreground/90 leading-relaxed">
            Draw-over vaporizers have low resistance and operate at or below atmospheric pressure — the patient draws gas
            through by negative pressure inspiration. Used in field anaesthesia (e.g., Oxford Miniature Vaporizer, Triservice
            apparatus). Less accurate but highly portable.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Splitting Ratio Calculation</h2>
          <p className="text-foreground/90 leading-relaxed">
            To deliver a desired concentration: the vaporizing chamber produces gas saturated at SVP concentration.
            At 1 atm and SVP = 21.3 kPa (sevoflurane): chamber output concentration = SVP/Patm × 100 = 21%.
            To deliver 2% sevoflurane, splitting ratio ≈ (21 − 2) : 2 = 9.5 : 1 (bypass : chamber).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Effect of Altitude</h2>
          <p className="text-foreground/90 leading-relaxed">
            At altitude, atmospheric pressure falls but SVP is unchanged. A vaporizer set to 2% delivers the same <em>partial
            pressure</em> of agent (which determines clinical effect), but the <em>percentage</em> concentration increases.
            The clinical effect is therefore maintained — no adjustment is needed.
          </p>
        </section>
      </div>

      <KeyLearningPoints points={[
        "SVP depends only on temperature and the agent, not atmospheric pressure. It increases with temperature.",
        "Plenum vaporizers use a splitting ratio (bypass:chamber) controlled by the dial to deliver a set concentration.",
        "Temperature compensation (bimetallic strip) adjusts the splitting ratio to counteract cooling from latent heat loss.",
        "Desflurane's near-room-temperature boiling point requires a heated, pressurised vaporizer (TEC 6).",
        "Draw-over vaporizers: low resistance, sub-atmospheric, used in field anaesthesia. Less precise but portable.",
        "At altitude, the partial pressure (and clinical effect) of volatile agent is maintained despite higher % concentration."
      ]} />
      <QuizSection questions={vaporizersQuiz} />
      <TopicCompletionToggle topicId="vaporizers" topicTitle="Vaporizers" />
    </SectionLayout>
  );
};

export default VaporizersTopic;
