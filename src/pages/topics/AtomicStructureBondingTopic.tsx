import { SectionLayout } from "@/components/SectionLayout";
import { AtomicStructureDiagram } from "@/components/diagrams/AtomicStructureDiagram";
import { PeriodicTableAnaestheticDiagram } from "@/components/diagrams/PeriodicTableAnaestheticDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { SeeAlso } from "@/components/SeeAlso";
import { ReferencesList } from "@/components/ReferencesList";
import { atomicStructureQuiz } from "@/data/quizzes";

const AtomicStructureBondingTopic = () => {
  return (
    <SectionLayout
      title="Atomic Structure & Chemical Bonding"
      subtitle="Electron configuration, bonding types, and intermolecular forces relevant to anaesthesia"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Why Chemistry Matters for Anaesthetists</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              Understanding atomic structure and chemical bonding explains <strong>why drugs behave the way they do</strong>. 
              The type of bonds in a molecule determines its solubility (will it dissolve in blood or fat?), its stability 
              (how quickly is it metabolised?), and its interactions with receptors (how does it produce its effect?).
            </p>
            <p>
              The periodic table organises elements by their electron configuration. Atoms bond by either 
              <strong> transferring</strong> electrons (ionic bonding) or <strong>sharing</strong> them (covalent bonding). 
              The type of bond formed depends on the difference in electronegativity between atoms.
            </p>
          </div>
        </section>

        {/* Diagram */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Interactive Diagram</h2>
          <AtomicStructureDiagram />
        </section>

        {/* Periodic Table of Anaesthetic Elements */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Periodic Table of Anaesthetic Elements</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The ten elements below are the most clinically important for anaesthetists. Tap each to explore its role in physiology, pharmacology, and clinical practice.
          </p>
          <PeriodicTableAnaestheticDiagram />
        </section>

        {/* Electron Configuration */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Electron Configuration</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              Electrons orbit the nucleus in <strong>shells</strong> (energy levels). Each shell holds a maximum number of electrons:
              Shell 1 (2), Shell 2 (8), Shell 3 (18). The outermost electrons (<strong>valence electrons</strong>) determine 
              an element's chemical behaviour and bonding.
            </p>
            <p>
              <strong>Noble gases</strong> (He, Ne, Ar) have full outer shells — they are unreactive. All other elements 
              try to achieve a full outer shell by gaining, losing, or sharing electrons. This drive to achieve a stable 
              electron configuration is the fundamental reason atoms form bonds.
            </p>
          </div>
        </section>

        {/* Intermolecular forces */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intermolecular Forces & Clinical Relevance</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              Intermolecular forces act <strong>between</strong> molecules (unlike bonds which act <strong>within</strong> molecules). 
              They determine physical properties like boiling point, solubility, and vapour pressure — directly relevant to 
              volatile agent behaviour.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Van der Waals (London dispersion):</strong> Weakest. Present in all molecules. Stronger with larger molecular size → why desflurane (MW 168) has a lower boiling point than halothane (MW 197)</li>
              <li><strong>Dipole-dipole:</strong> Between polar molecules. Moderate strength.</li>
              <li><strong>Hydrogen bonds:</strong> Strong intermolecular force (~20 kJ/mol). Requires H bonded to F, O, or N. Explains water's uniquely high boiling point, heat capacity, and surface tension.</li>
            </ul>
          </div>
        </section>

        <KeyLearningPoints
          points={[
            "Atoms bond by transferring (ionic) or sharing (covalent) electrons to achieve stable outer shells",
            "Electronegativity difference determines bond type: large ΔEN → ionic, small → covalent",
            "Ionic compounds (e.g. NaCl) dissolve in water to form electrolytes — basis of IV fluid physiology",
            "Covalent bonds form most drug molecules; their structure determines receptor interactions",
            "Hydrogen bonds give water its high boiling point, specific heat capacity, and are critical for protein folding",
            "Van der Waals forces explain boiling point trends in volatile anaesthetic agents",
            "Metallic bonding explains conductivity of monitoring electrodes and diathermy equipment",
          ]}
        />

        <QuizSection questions={atomicStructureQuiz} />
        <ReferencesList topicId="atomic-structure-bonding" />
        <SeeAlso topicId="atomic-structure-bonding" />
        <TopicCompletionToggle topicId="atomic-structure-bonding" topicTitle="Atomic Structure & Chemical Bonding" />
      </div>
    </SectionLayout>
  );
};

export default AtomicStructureBondingTopic;
