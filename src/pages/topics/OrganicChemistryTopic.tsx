import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { OrganicChemistryDiagram } from "@/components/diagrams/OrganicChemistryDiagram";
import IsomerismDiagram from "@/components/diagrams/IsomerismDiagram";
import ChiralityAnaesthesiaDiagram from "@/components/diagrams/ChiralityAnaesthesiaDiagram";
import AmineComparisonDiagram from "@/components/diagrams/AmineComparisonDiagram";
import { organicChemistryQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const OrganicChemistryTopic = () => {
  return (
    <TopicTemplate
      title="Organic Chemistry for Anaesthetists"
      subtitle="Functional groups, isomerism, and chirality — how molecular structure determines drug behaviour"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
      topicId="organic-chemistry"
      quizQuestions={organicChemistryQuiz}
      objectives={[
        "Identify ester, amide, amine, and aromatic groups in anaesthetic drugs.",
        "Distinguish structural, geometric, optical isomers, and tautomers with clinical examples.",
        "Explain why chirality alters pharmacology (ketamine, bupivacaine).",
        "Contrast tertiary and quaternary amines and predict membrane crossing behaviour.",
        "Use lipophilicity to predict CNS penetration and protein binding.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PH_BK_02"] },
        diagrams: { exams: [Exam.PRIMARY] },
        workedExamples: { exams: [Exam.PRIMARY] },
        keyPoints: { exams: [Exam.PRIMARY] },
      }}
      sectionSources={{
        objectives: ["Peck & Hill Ch.3", "Cross & Plunkett Ch.4"],
        diagrams: ["BJA Educ 2008", "Nau & Strichartz 2002"],
        workedExamples: ["Cross & Plunkett Ch.4", "BJA Educ 2008"],
        keyPoints: ["Peck & Hill Ch.3", "Cross & Plunkett Ch.4", "BJA Educ 2008"],
      }}
      diagrams={
        <>
          <OrganicChemistryDiagram />
          <IsomerismDiagram />
          <ChiralityAnaesthesiaDiagram />
          <AmineComparisonDiagram />
        </>
      }
      coreConcepts={
        <>
          <ExamSection exams={["primary"]} curriculumCodes={["PH_BK_02"]}>
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
          </ExamSection>

          <ExamSection exams={["primary"]} curriculumCodes={["PH_BK_02"]}>
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
          </ExamSection>

          <ExamSection exams={["primary"]} curriculumCodes={["PH_BK_02"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Tertiary vs Quaternary Amines</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
              <p>
                Nitrogen sits at the heart of an enormous fraction of anaesthetic drugs — local anaesthetics, opioids,
                vasopressors, antimuscarinics and every non-depolarising muscle relaxant. The single most important
                question to ask of any nitrogen-containing drug is: <strong>how many carbon substituents are on the nitrogen?</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Tertiary amine (R₃N):</strong> three carbon substituents, one lone pair. The lone pair can accept a proton, so the drug exists in equilibrium between an unionised (lipid-soluble) form and a protonated (water-soluble) form. The ratio is set by the drug's pKa and the surrounding pH — Henderson–Hasselbalch. Only the unionised form crosses lipid membranes including the BBB and placenta.</li>
                <li><strong>Quaternary amine (R₄N⁺):</strong> four carbon substituents and a permanent positive charge. There is no neutral form, so it cannot dissolve in the lipid bilayer at any pH. Predictable signature: poor oral absorption, small Vd, no BBB or placental crossing, renal excretion of parent compound.</li>
              </ul>
              <p>
                This single structural feature explains why <strong>neostigmine must be paired with glycopyrrolate</strong>
                (both quaternary, no central effects), why <strong>suxamethonium and rocuronium are safe for the foetus</strong>
                (don't cross placenta), and why <strong>atropine causes central anticholinergic syndrome but glycopyrrolate doesn't</strong>.
              </p>
            </div>
          </ExamSection>

          <ExamSection exams={["primary"]} curriculumCodes={["PH_BK_02"]}>
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
          </ExamSection>
        </>
      }
      workedExamples={[
        {
          title: "Choosing an antimuscarinic with neostigmine reversal",
          scenario: "You are reversing rocuronium with neostigmine 50 mcg/kg in a 65-year-old with mild cognitive impairment. Choose between atropine and glycopyrrolate as antimuscarinic cover.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Identify amine class: <strong>atropine</strong> = tertiary amine (crosses BBB); <strong>glycopyrrolate</strong> = quaternary (does not).</li>
                <li>Risk in elderly/cognitively impaired patient: central anticholinergic syndrome from atropine.</li>
                <li>Match onset: glycopyrrolate onset matches neostigmine better than atropine, reducing transient bradycardia.</li>
                <li>Choose <strong>glycopyrrolate 10 mcg/kg</strong> with neostigmine 50 mcg/kg.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Using atropine + neostigmine in the elderly → postoperative delirium.</li>
                  <li>Forgetting the onset mismatch with atropine (faster than neostigmine) → tachycardia then bradycardia.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Glycopyrrolate (quaternary, no central effects, matched onset) with neostigmine.",
        },
      ]}
      keyPoints={[
        "Ester bonds (—COO—) are rapidly hydrolysed by plasma esterases → short-acting drugs (remifentanil, mivacurium, ester LAs)",
        "Amide bonds (—CONH—) require hepatic metabolism → longer acting. Amide LAs have 2 i's before '-caine'",
        "Quaternary amines (R₄N⁺) carry permanent charge → cannot cross BBB or placenta (glycopyrrolate, neostigmine)",
        "Chirality: enantiomers can have very different potency and toxicity (levobupivacaine vs racemic bupivacaine)",
        "Benzene rings increase lipophilicity → better CNS penetration (propofol, thiopentone, midazolam)",
        "Halogenation (adding F, Cl, Br) increases molecular stability and alters volatility of anaesthetic agents",
        "Hydrogen bonding capability determines water solubility and protein binding characteristics",
      ]}
    />
  );
};

export default OrganicChemistryTopic;
