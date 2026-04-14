import { SectionLayout } from "@/components/SectionLayout";
import { AcidsBasesDiagram } from "@/components/diagrams/AcidsBasesDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { SeeAlso } from "@/components/SeeAlso";
import { acidsBasesQuiz } from "@/data/quizzes";

const AcidsBasesBuffersTopic = () => {
  return (
    <SectionLayout
      title="Acids, Bases & Buffer Systems"
      subtitle="pH, pKa, Henderson-Hasselbalch equation, and physiological buffer systems"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Foundations of Acid-Base Chemistry</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              Acid-base chemistry is arguably the most important chemistry topic for anaesthetists. Every arterial 
              blood gas you interpret, every drug ionisation calculation, and every understanding of buffer therapy 
              rests on these principles.
            </p>
            <p>
              <strong>Brønsted-Lowry definition:</strong> An acid is a proton (H⁺) donor; a base is a proton acceptor. 
              This is the most clinically useful definition. When HCl dissolves in water, it donates H⁺ to water: 
              HCl → H⁺ + Cl⁻.
            </p>
            <p>
              <strong>Lewis definition:</strong> An acid is an electron-pair acceptor; a base is an electron-pair donor. 
              Less commonly used clinically but explains coordination chemistry (e.g. metal ion-drug interactions).
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Interactive Diagram</h2>
          <AcidsBasesDiagram />
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Henderson-Hasselbalch Equation in Practice</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              The Henderson-Hasselbalch equation is the single most important equation linking chemistry to 
              clinical pharmacology. It tells you what fraction of a drug is ionised vs unionised at any given pH.
            </p>
            <p>
              <strong>For weak acids</strong> (e.g. thiopentone pKa 7.6, aspirin pKa 3.5): in a solution more 
              alkaline than the pKa, the drug is predominantly ionised (A⁻ form). In acidic conditions, 
              it exists mainly as the unionised acid (HA).
            </p>
            <p>
              <strong>For weak bases</strong> (e.g. morphine pKa 8.0, local anaesthetics pKa ~7.7–8.1): 
              in acidic conditions, the base accepts a proton and becomes ionised (BH⁺). In alkaline 
              conditions, it is unionised (B).
            </p>
            <p>
              <strong>Clinical pearl:</strong> Only the <strong>unionised fraction</strong> is lipid-soluble enough 
              to cross cell membranes (blood-brain barrier, placenta, nerve sheath). This explains why local 
              anaesthetics work poorly in infected tissue (lower pH → more ionised → less crosses the nerve membrane).
            </p>
          </div>
        </section>

        <KeyLearningPoints
          points={[
            "pH = −log₁₀[H⁺]; each pH unit = 10-fold change in [H⁺]",
            "Normal blood pH 7.35–7.45 ([H⁺] 35–45 nmol/L). Compatible range ~6.8–7.8",
            "Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]). When pH = pKa → 50% ionised",
            "Only unionised drug crosses lipid membranes — basis of ion trapping and drug absorption",
            "Bicarbonate buffer is the most important ECF buffer (open system — CO₂ exhaled by lungs)",
            "Haemoglobin provides ~35% of total body buffering; deoxyHb is a better buffer (Haldane effect)",
            "Buffer systems work best within ±1 pH unit of their pKa",
            "Strong acids fully dissociate (HCl); weak acids partially dissociate (H₂CO₃) — only weak acids buffer",
          ]}
        />

        <QuizSection questions={acidsBasesQuiz} />
        <SeeAlso topicId="acids-bases-buffers" />
        <TopicCompletionToggle topicId="acids-bases-buffers" topicTitle="Acids, Bases & Buffer Systems" />
      </div>
    </SectionLayout>
  );
};

export default AcidsBasesBuffersTopic;
