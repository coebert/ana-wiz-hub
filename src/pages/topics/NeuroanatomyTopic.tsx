import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { neuroanatomyQuestions } from "@/data/quizzes";
import CircleOfWillisDiagram from "@/components/diagrams/CircleOfWillisDiagram";
import SkullBaseDiagram from "@/components/diagrams/SkullBaseDiagram";
import BrainPlatesViewer from "@/components/diagrams/BrainPlatesViewer";
import CsfFlowDiagram from "@/components/diagrams/CsfFlowDiagram";
import CorPictumFolio from "@/components/diagrams/CorPictumFolio";
import { neuroFolio } from "@/components/diagrams/anatomyFolios";
import { Exam } from "@/data/curriculum";

const NeuroanatomyTopic = () => {
  return (
    <TopicTemplate
      title="Neuroanatomy"
      subtitle="FRCA / FFICM — Applied Anatomy"
      backPath="/anatomy"
      backLabel="Anatomy"
      accentColor="text-anatomy"
      topicId="neuroanatomy"
      quizQuestions={neuroanatomyQuestions}
      objectives={[
        "Map the Circle of Willis and predict deficits from anterior vs posterior occlusions.",
        "Describe the meninges, CSF circulation, and the Monro-Kellie doctrine.",
        "Identify skull base foramina and their key contents.",
        "Locate brainstem nuclei and apply them to brainstem death testing.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["AN_BK_07"] },
        diagrams: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["Ellis & Feldman Ch.7", "Power & Kam Ch.13"],
        diagrams: ["Ellis & Feldman Ch.7", "BJA Educ 2007"],
        workedExamples: ["BJA Educ 2007", "Power & Kam Ch.13"],
        keyPoints: ["Ellis & Feldman Ch.7", "BJA Educ 2007", "Power & Kam Ch.13"],
      }}
      diagrams={
        <>
          <CorPictumFolio {...neuroFolio} suppressOverlayLabels />
          <BrainPlatesViewer />
          <CsfFlowDiagram />
          <CircleOfWillisDiagram />
          <SkullBaseDiagram />
        </>
      }
      coreConcepts={
        <>
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_07"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cerebral Blood Supply — Circle of Willis</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The brain receives 15% of cardiac output (~750 ml/min). Autoregulation maintains CBF between MAP 50–150 mmHg. The circle of Willis provides collateral circulation between anterior (ICA) and posterior (vertebrobasilar) circulations.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-2">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Anterior Circulation (ICA)</p>
                <p className="text-sm text-muted-foreground mt-1">ICA → ACA + MCA. ACA supplies medial surfaces of frontal/parietal lobes. MCA supplies lateral surface (motor/sensory strip) — most commonly affected in stroke. Anterior communicating artery connects ACAs (commonest site of aneurysm).</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Posterior Circulation</p>
                <p className="text-sm text-muted-foreground mt-1">Vertebral arteries → basilar artery → PCAs. Supply brainstem, cerebellum, occipital lobes. Posterior communicating arteries connect PCAs to ICAs. Complete circle in only 25% of population.</p>
              </div>
            </div>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_07"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intracranial Pressure & Meninges</h2>
            <div className="space-y-2">
              {[
                { structure: "Dura Mater", detail: "Tough fibrous layer. Two layers — periosteal (adherent to skull) and meningeal. Meningeal layer forms dural folds: falx cerebri, tentorium cerebelli, falx cerebelli." },
                { structure: "Arachnoid Mater", detail: "Avascular. Bridging veins cross subdural space to reach dural venous sinuses — tearing causes subdural haematoma." },
                { structure: "Pia Mater", detail: "Closely adherent to brain surface. Carries blood vessels into brain substance." },
                { structure: "CSF", detail: "Produced by choroid plexus (500 ml/day, total volume 150 ml). Flows: lateral ventricles → foramen of Monro → 3rd ventricle → aqueduct of Sylvius → 4th ventricle → foramina of Luschka/Magendie → subarachnoid space → arachnoid granulations → superior sagittal sinus." },
                { structure: "ICP", detail: "Normal 7–15 mmHg. Monro-Kellie doctrine: skull is fixed volume (brain 80%, blood 10%, CSF 10%). ↑ one component requires ↓ another or ICP rises." },
              ].map((s) => (
                <div key={s.structure} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{s.structure}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["AN_BK_07"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Skull Base & Foramina</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Fossa</th>
                    <th className="text-left py-2 text-foreground font-semibold">Key Foramina</th>
                    <th className="text-left py-2 text-foreground font-semibold">Contents</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Anterior</td><td>Cribriform plate</td><td>Olfactory nerve (CN I) fibres. Risk of CSF leak with nasotracheal intubation in base-of-skull fracture.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Middle</td><td>Foramen ovale, rotundum, spinosum</td><td>V2 (rotundum), V3 (ovale), middle meningeal artery (spinosum — extradural haematoma source).</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Posterior</td><td>Foramen magnum, jugular foramen</td><td>Brainstem/spinal cord, vertebral arteries (magnum). CN IX, X, XI, IJV (jugular foramen).</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_07"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Brainstem & Autonomic Centres</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Brainstem</p>
                <p className="text-sm text-muted-foreground mt-1">Midbrain: CN III, IV. Pons: CN V, VI, VII, VIII. Medulla: CN IX, X, XI, XII. Respiratory and cardiovascular centres in medulla. Reticular activating system — target of anaesthetic agents.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Brainstem Death Testing</p>
                <p className="text-sm text-muted-foreground mt-1">Tests brainstem reflexes: pupillary (II/III), corneal (V/VII), vestibulo-ocular (VIII/III,VI), gag (IX/X), cough (X), apnoea test. Requires known cause, exclusion of confounders (drugs, hypothermia, metabolic).</p>
              </div>
            </div>
          </ExamSection>
        </>
      }
      workedExamples={[
        {
          title: "Brainstem death apnoea test",
          scenario: "A 48-year-old with catastrophic intracerebral haemorrhage meets preconditions for brainstem death testing. Baseline PaCO₂ is 5.3 kPa, pH 7.38. How do you perform and interpret the apnoea test?",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Confirm preconditions: known cause of irreversible brain damage, exclude sedatives/NMBAs, T &gt;34°C, normal electrolytes, no endocrine cause.</li>
                <li>Pre-oxygenate with FiO₂ 1.0 for 5 min; aim baseline PaCO₂ 5.5–6.0 kPa, pH ≥7.35.</li>
                <li>Disconnect ventilator; deliver O₂ 6 L/min via tracheal catheter to apnoeic oxygenation.</li>
                <li>Observe for 5 min for any respiratory effort. Recheck ABG at end.</li>
                <li>Positive (consistent with brainstem death) if PaCO₂ rises by ≥0.5 kPa to ≥6.5 kPa AND pH &lt;7.40 AND no respiratory effort.</li>
                <li>Two doctors perform two complete sets of tests, separated by an interval. Time of death = completion of second set.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Hypoxia during the test — abort if SpO₂ falls below 90%; result invalid.</li>
                  <li>Residual sedation/NMBA — check levels, use TOF before testing.</li>
                  <li>Chronic CO₂ retainers need higher PaCO₂ rise above their baseline.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Apnoea test positive when PaCO₂ rises ≥0.5 kPa to ≥6.5 kPa with no respiratory effort and pH <7.40.",
        },
      ]}
      keyPoints={[
        "Circle of Willis complete in only 25% — anterior communicating artery is the commonest aneurysm site",
        "MCA supplies lateral cortex (motor/sensory strip) — most commonly affected in ischaemic stroke",
        "Monro-Kellie doctrine: brain 80%, blood 10%, CSF 10% — skull is a fixed-volume box",
        "Middle meningeal artery enters via foramen spinosum — rupture causes extradural haematoma",
        "CSF produced at 500 ml/day by choroid plexus; total volume ~150 ml; absorbed by arachnoid granulations",
      ]}
    />
  );
};

export default NeuroanatomyTopic;
