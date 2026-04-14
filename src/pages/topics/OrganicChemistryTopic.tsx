import { SectionLayout } from "@/components/SectionLayout";
import { OrganicChemistryDiagram } from "@/components/diagrams/OrganicChemistryDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { SeeAlso } from "@/components/SeeAlso";
import { organicChemistryQuiz } from "@/data/quizzes";

const OrganicChemistryTopic = () => {
  return (
    <SectionLayout
      title="Organic Chemistry for Anaesthetists"
      subtitle="Functional groups, isomerism, and chirality — how molecular structure determines drug behaviour"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Why Organic Chemistry Matters</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              Organic chemistry is the chemistry of carbon-containing compounds. Almost every drug used in anaesthesia 
              is an organic molecule. Understanding functional groups tells you about a drug's <strong>solubility</strong> (will it 
              dissolve in blood or cross the BBB?), <strong>metabolism</strong> (ester hydrolysis vs hepatic oxidation), 
              and <strong>mechanism</strong> (which part of the molecule binds the receptor?).
            </p>
            <p>
              You don't need to memorise complex synthetic pathways. What matters is recognising the key functional groups 
              present in anaesthetic drugs and understanding how they influence clinical behaviour.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Interactive Diagram</h2>
          <OrganicChemistryDiagram />
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Isomerism</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              Isomers are molecules with the <strong>same molecular formula</strong> but <strong>different structural arrangements</strong>. 
              This is clinically important because isomers can have very different pharmacological properties.
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Structural isomers:</strong> Different connectivity. e.g. enflurane vs isoflurane (same formula CHClF₂-O-CHF₂ but atoms connected differently)</li>
              <li><strong>Geometric (cis/trans) isomers:</strong> Different spatial arrangement around a double bond or ring. e.g. atracurium has cis and trans isomers</li>
              <li><strong>Optical isomers (enantiomers):</strong> Non-superimposable mirror images at a chiral centre. e.g. S(+) and R(−) ketamine</li>
            </ul>
            <p>
              <strong>Tautomerism</strong> is a special case where a molecule exists in equilibrium between two structural 
              forms. Thiopentone exists as keto and enol tautomers — the enol form (thiol) gives it its name 
              and explains its yellow colour in solution.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Lipophilicity & Drug Delivery</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            <p>
              A drug's <strong>partition coefficient</strong> (oil:water ratio) determines how it distributes between 
              aqueous (blood) and lipid (membrane) compartments. This is directly determined by the molecule's 
              functional groups:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Lipophilic groups</strong> (hydrocarbon chains, benzene rings, halogen atoms): increase membrane penetration, CNS access, and protein binding</li>
              <li><strong>Hydrophilic groups</strong> (—OH, —NH₂, —COOH, ionic groups): increase water solubility but reduce membrane crossing</li>
              <li>Most effective drugs have a balance — enough lipophilicity to cross membranes, enough hydrophilicity to dissolve in plasma</li>
            </ul>
          </div>
        </section>

        <KeyLearningPoints
          points={[
            "Ester bonds (—COO—) are rapidly hydrolysed by plasma esterases → short-acting drugs (remifentanil, mivacurium, ester LAs)",
            "Amide bonds (—CONH—) require hepatic metabolism → longer acting. Amide LAs have 2 i's before '-caine'",
            "Quaternary amines (R₄N⁺) carry permanent charge → cannot cross BBB or placenta (glycopyrrolate, neostigmine)",
            "Chirality: enantiomers can have very different potency and toxicity (levobupivacaine vs racemic bupivacaine)",
            "Benzene rings increase lipophilicity → better CNS penetration (propofol, thiopentone, midazolam)",
            "Halogenation (adding F, Cl, Br) increases molecular stability and alters volatility of anaesthetic agents",
            "Hydrogen bonding capability determines water solubility and protein binding characteristics",
          ]}
        />

        <QuizSection questions={organicChemistryQuiz} />
        <SeeAlso topicId="organic-chemistry" />
        <TopicCompletionToggle topicId="organic-chemistry" topicTitle="Organic Chemistry for Anaesthetists" />
      </div>
    </SectionLayout>
  );
};

export default OrganicChemistryTopic;
