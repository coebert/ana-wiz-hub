import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { AtomicStructureDiagram } from "@/components/diagrams/AtomicStructureDiagram";
import { PeriodicTableAnaestheticDiagram } from "@/components/diagrams/PeriodicTableAnaestheticDiagram";
import { atomicStructureQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Explain electron shell structure and predict reactivity from valence-shell configuration",
  "Distinguish ionic, covalent, and metallic bonding using electronegativity differences",
  "Rank intermolecular forces (van der Waals, dipole-dipole, hydrogen bonding) and predict physical properties",
  "Apply electronegativity to explain the boiling point and lipid solubility of volatile anaesthetic agents",
  "Identify the periodic-table elements of clinical importance (Na, K, Ca, Cl, Mg, O, N, F, Br, I)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Why does desflurane boil so much lower than halothane?",
    scenario:
      "Halothane (MW 197) boils at 50 °C, but desflurane (MW 168) boils at just 23.5 °C — close to room temperature. Explain the chemistry, and the practical anaesthetic consequence.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Identify the dominant intermolecular force.</strong> Both are non-hydrogen-bonding halogenated ethers/alkanes → dominated by van der Waals (London dispersion) forces.</li>
          <li><strong>Compare polarisability.</strong> Halothane contains heavy Br + Cl atoms → highly polarisable electron clouds → strong van der Waals attraction. Desflurane contains only F atoms — small, low polarisability → weak van der Waals.</li>
          <li><strong>Predict boiling point.</strong> Stronger intermolecular forces → more energy needed to vaporise → higher boiling point. Halothane &gt;&gt; desflurane.</li>
          <li><strong>Account for the small MW difference.</strong> MW alone (197 vs 168) cannot explain a 26 °C difference — it is the <strong>nature</strong> of the halogens that matters.</li>
          <li><strong>Clinical consequence.</strong> Desflurane requires a heated, pressurised vaporiser (Tec 6) because at room temperature it would boil unpredictably in a conventional plenum vaporiser.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Useful comparators</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Sevoflurane (only F + ether O) BP 58.5 °C — light halogens, but H-bond accepting ether O adds dipole interactions.</li>
          <li>Isoflurane (F + Cl) BP 48.5 °C — halfway between desflurane and halothane.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Quoting molecular weight alone — it predicts boiling point only within the same family.</li>
            <li>Confusing 'polar' with 'hydrogen-bonded' — desflurane has C-F dipoles but no H-bonds.</li>
            <li>Forgetting that a Tec 6 vaporiser delivers desflurane at constant <strong>partial pressure</strong>, not volume %.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Halothane's heavy, polarisable Br and Cl atoms generate strong van der Waals forces, raising its boiling point. Desflurane has only small fluorine atoms with weak van der Waals attraction, so it boils near room temperature — and therefore needs the heated, pressurised Tec 6 vaporiser.",
  },
  {
    title: "Why is sodium chloride soluble in water?",
    scenario:
      "Explain at a molecular level why sodium chloride dissolves freely in water but is essentially insoluble in lipid solvents. Link this to why we cannot give a 'lipid' equivalent of normal saline IV.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Classify the bond.</strong> Na-Cl electronegativity difference ≈ 2.1 → IONIC bond. NaCl is a 3-D crystal lattice of Na⁺ and Cl⁻.</li>
          <li><strong>Energy required to dissolve.</strong> Lattice energy of NaCl ≈ +787 kJ/mol — significant.</li>
          <li><strong>Why water can do it.</strong> Water is a strongly polar molecule (O δ-, H δ+). Its dipoles surround Na⁺ and Cl⁻ ('hydration shells'). Hydration enthalpy ≈ −784 kJ/mol — almost matches the lattice energy.</li>
          <li><strong>Why lipid cannot.</strong> Non-polar lipid solvents have no permanent dipole, can only form weak van der Waals forces. They cannot pay the lattice-energy 'cost' → NaCl remains undissolved.</li>
          <li><strong>Clinical consequence.</strong> All electrolyte-containing IV fluids must be aqueous. Lipid emulsions (Intralipid, propofol) carry only un-ionised, lipid-soluble drugs.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Generalise the rule</p>
        <ul className="list-disc list-inside space-y-1">
          <li>'Like dissolves like.' Polar/ionic solutes → polar (water) solvents. Non-polar solutes (volatiles, propofol) → non-polar (lipid) solvents.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Saying 'salt dissolves because water is wet' — define the molecular mechanism.</li>
            <li>Confusing dissociation (separation of ions) with dissolution (going into solution) — both occur, but for different reasons.</li>
            <li>Assuming all IV drugs are aqueous — propofol, etomidate (lipid), amiodarone (cosolvent), and dantrolene (alkaline) all have non-water vehicles.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "NaCl is held in a high-energy ionic lattice. Water's strong dipoles can hydrate Na⁺ and Cl⁻ enough to overcome the lattice energy. Non-polar lipids cannot, so ionic compounds are insoluble in lipid — explaining why electrolyte fluids must be aqueous and why lipid-vehicle drugs (propofol) carry only non-ionic agents.",
  },
];

const AtomicStructureBondingTopic = () => {
  return (
    <TopicTemplate
      title="Atomic Structure & Chemical Bonding"
      subtitle="Electron configuration, bonding types, and intermolecular forces relevant to anaesthesia"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
      topicId="atomic-structure-bonding"
      topicTitle="Atomic Structure & Chemical Bonding"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={atomicStructureQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["RCoA Primary — Physics & Clinical Measurement", "RCoA Primary — Pharmacology"] },
        workedExamples: { exams: [Exam.PRIMARY] },
        keyPoints: { exams: [Exam.PRIMARY] },
      }}
      sectionSources={{
        objectives: [
          "Cross & Plunkett Ch.2",
          "Peck & Hill Ch.2",
        ],
        workedExamples: [
          "BJA Educ 2010",
          "Cross & Plunkett Ch.2",
        ],
        keyPoints: [
          "Peck & Hill Ch.2",
        ],
      }}
      keyPoints={[
        "Atoms bond by transferring (ionic) or sharing (covalent) electrons to achieve stable outer shells",
        "Electronegativity difference determines bond type: large ΔEN → ionic, small → covalent",
        "Ionic compounds (e.g. NaCl) dissolve in water to form electrolytes — basis of IV fluid physiology",
        "Covalent bonds form most drug molecules; their structure determines receptor interactions",
        "Hydrogen bonds give water its high boiling point, specific heat capacity, and protein folding",
        "Van der Waals forces explain boiling point trends in volatile anaesthetic agents (halothane vs desflurane)",
        "Metallic bonding explains conductivity of monitoring electrodes and diathermy equipment",
      ]}
      coreConcepts={
        <>
          <ExamSection id="why" exams={["primary"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Why Chemistry Matters for Anaesthetists</h2>
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
          </ExamSection>

          <ExamSection id="diagram" exams={["primary"]}>
            <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagram</h2>
            <AtomicStructureDiagram />
          </ExamSection>

          <ExamSection id="periodic" exams={["primary"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Periodic Table of Anaesthetic Elements</h2>
            <p className="text-sm text-muted-foreground mb-4">
              The ten elements below are the most clinically important for anaesthetists. Tap each to explore its role in physiology, pharmacology, and clinical practice.
            </p>
            <PeriodicTableAnaestheticDiagram />
          </ExamSection>

          <ExamSection id="electrons" exams={["primary"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Electron Configuration</h2>
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
          </ExamSection>

          <ExamSection id="forces" exams={["primary"]} curriculumCodes={["RCoA Primary — Physics & Clinical Measurement"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Intermolecular Forces & Clinical Relevance</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
              <p>
                Intermolecular forces act <strong>between</strong> molecules (unlike bonds which act <strong>within</strong> molecules).
                They determine physical properties like boiling point, solubility, and vapour pressure — directly relevant to
                volatile agent behaviour.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Van der Waals (London dispersion):</strong> Weakest. Present in all molecules. Stronger with larger molecular size and polarisability → why halothane (heavy Br/Cl) has a higher boiling point than desflurane (small F atoms).</li>
                <li><strong>Dipole-dipole:</strong> Between polar molecules. Moderate strength.</li>
                <li><strong>Hydrogen bonds:</strong> Strong intermolecular force (~20 kJ/mol). Requires H bonded to F, O, or N. Explains water's uniquely high boiling point, heat capacity, and surface tension.</li>
              </ul>
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default AtomicStructureBondingTopic;
