import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";

const neuroanatomyFaqs: Array<[string, string]> = [
  ["What is the Circle of Willis and which artery most commonly aneurysms?", "The Circle of Willis is a polygonal arterial anastomosis at the base of the brain, formed by the anterior and posterior cerebral arteries connected by anterior and posterior communicating arteries. It provides collateral flow if a feeding vessel is occluded. Berry aneurysms most commonly arise at the anterior communicating artery (~35%), then posterior communicating (~30%), then middle cerebral bifurcation (~20%)."],
  ["How does CSF circulate and where is it absorbed?", "Produced by the choroid plexus of the lateral, third and fourth ventricles (~500 mL/day; total volume 150 mL). It flows lateral → third (via foramina of Monro) → fourth (via aqueduct of Sylvius) → subarachnoid space (via median Magendie and lateral Luschka foramina). It is absorbed at the arachnoid granulations into the dural venous sinuses (superior sagittal sinus)."],
  ["Which dermatomes are key surface landmarks?", "C4 — clavicle; T4 — nipple line; T6 — xiphisternum; T10 — umbilicus; L1 — inguinal ligament; S2/3/4 — perineum. These are essential for testing the height of a spinal or epidural block and for assessing sensory levels in spinal cord injury."],
];
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { neuroanatomyQuestions } from "@/data/quizzes";
import CircleOfWillisDiagram from "@/components/diagrams/anatomy/CircleOfWillisDiagram";
import SkullBaseDiagram from "@/components/diagrams/anatomy/SkullBaseDiagram";
import BrainPlatesViewer from "@/components/diagrams/anatomy/BrainPlatesViewer";
import CsfFlowDiagram from "@/components/diagrams/anatomy/CsfFlowDiagram";
import CorPictumFolio from "@/components/diagrams/anatomy/CorPictumFolio";
import { neuroFolio } from "@/components/diagrams/anatomyFolios";
import { InlineRef } from "@/components/references/InlineRef";
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
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["Ellis & Feldman Ch.7", "Power & Kam Ch.13"],
        workedExamples: ["BJA Educ 2007", "Power & Kam Ch.13"],
        keyPoints: ["Ellis & Feldman Ch.7", "BJA Educ 2007", "Power & Kam Ch.13"],
      }}
      coreConcepts={
        <>
          <span id="intracranial-pressure-meninges" aria-hidden="true" />
          <span id="cerebral-blood-supply-circle-of-willis" aria-hidden="true" />
          <span id="skull-base-foramina" aria-hidden="true" />
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_07"]}>
            <CollapsibleSubsection title="Anatomical Atlas" defaultOpen>
              <div className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                  <CorPictumFolio {...neuroFolio} suppressOverlayLabels />
                </div>
                <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                  <BrainPlatesViewer />
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_07"]}>
            <CollapsibleSubsection title="Cerebral Blood Supply — Circle of Willis" defaultOpen>
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
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <CircleOfWillisDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_07"]}>
            <CollapsibleSubsection title="Intracranial Pressure & Meninges">
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
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <CsfFlowDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["AN_BK_07"]}>
            <CollapsibleSubsection title="Skull Base & Foramina">
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
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <SkullBaseDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_07"]}>
            <CollapsibleSubsection title="Brainstem & Autonomic Centres">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The brainstem packs cranial nerve nuclei, long ascending and descending tracts, and the reticular formation into a few centimetres, so small lesions produce characteristic combinations of ipsilateral cranial nerve and contralateral long-tract signs<InlineRef topicId="neuroanatomy" refLabel="Crit Care 2020 Brainstem" />.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Level</th>
                    <th className="text-left py-2 text-foreground font-semibold">Cranial nerve nuclei</th>
                    <th className="text-left py-2 text-foreground font-semibold">Functional areas</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Midbrain</td><td>III (oculomotor, Edinger–Westphal parasympathetic), IV (trochlear)</td><td>Cerebral peduncles (corticospinal/corticobulbar), substantia nigra, red nucleus, periaqueductal grey (descending analgesia, target of opioids), superior/inferior colliculi, rostral RAS</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Pons</td><td>V (trigeminal motor/sensory), VI (abducens), VII (facial), VIII (vestibulocochlear)</td><td>Pontine (apneustic and pneumotaxic) respiratory centres, locus coeruleus (noradrenergic — site of dexmedetomidine action), middle cerebellar peduncle, medial longitudinal fasciculus</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Medulla</td><td>IX (glossopharyngeal), X (vagus, incl. dorsal motor nucleus and nucleus tractus solitarius), XI, XII (hypoglossal)</td><td>Dorsal and ventral respiratory groups, vasomotor and cardio-inhibitory centres, chemoreceptor trigger zone (area postrema), vomiting centre, nucleus ambiguus, decussation of pyramids and of the medial lemniscus</td></tr>
                </tbody>
              </table>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Long tracts</p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Corticospinal</strong> (anterior, decussates at the medullary pyramids), <strong>medial lemniscus</strong> (dorsal column → decussates in the medulla; fine touch, vibration, proprioception), <strong>spinothalamic</strong> (laterally placed; pain and temperature, already crossed in the cord), <strong>spinocerebellar</strong> (peripheral, uncrossed), and the <strong>medial longitudinal fasciculus</strong> linking III, IV, VI and the vestibular nuclei for conjugate gaze.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Classic syndromes</p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Lateral medullary (Wallenberg, PICA):</strong> ipsilateral facial pain/temperature loss, Horner's, ataxia, bulbar palsy with dysphagia; contralateral body pain/temperature loss; sparing of power. <strong>Medial medullary:</strong> contralateral hemiparesis and lemniscal sensory loss with ipsilateral tongue deviation (XII). <strong>Locked-in (basilar/ventral pons):</strong> quadriplegia and aphonia with preserved vertical eye movement and consciousness. <strong>Weber (midbrain):</strong> ipsilateral III palsy with contralateral hemiparesis. <strong>Central pontine myelinolysis:</strong> from over-rapid sodium correction.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Anaesthetic and ICU relevance</p>
                <p className="text-sm text-muted-foreground mt-1">The ascending reticular activating system is the substrate of consciousness and a principal target of general anaesthetics. Brainstem compression from raised ICP causes Cushing's triad (hypertension, bradycardia, irregular respiration) and progressive loss of reflexes in a rostro-caudal sequence. Bulbar dysfunction predicts unsafe swallow and extubation failure.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Brainstem</p>
                <p className="text-sm text-muted-foreground mt-1">Midbrain: CN III, IV. Pons: CN V, VI, VII, VIII. Medulla: CN IX, X, XI, XII. Respiratory and cardiovascular centres in medulla. Reticular activating system — target of anaesthetic agents.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Brainstem Death Testing</p>
                <p className="text-sm text-muted-foreground mt-1">Tests brainstem reflexes: pupillary (II/III), corneal (V/VII), vestibulo-ocular (VIII/III,VI), gag (IX/X), cough (X), apnoea test. Requires known cause, exclusion of confounders (drugs, hypothermia, metabolic).</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["AN_BK_07"]}>
            <CollapsibleSubsection title="Autonomic Nervous System — Anatomical Pathways">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The autonomic nervous system is a two-neurone efferent system: a preganglionic neurone with a cell body in the CNS synapses in a peripheral ganglion on a postganglionic neurone supplying the effector. All preganglionic fibres, sympathetic and parasympathetic, are cholinergic acting at nicotinic ganglionic receptors<InlineRef topicId="neuroanatomy" refLabel="BJA Educ 2016 ANS" />.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Sympathetic (thoracolumbar)</p>
                <p className="text-sm text-muted-foreground mt-1">Preganglionic cell bodies in the lateral horn of <strong>T1–L2</strong>; fibres leave in the ventral root and white ramus communicans to reach the paravertebral sympathetic chain, where they may synapse at that level, ascend (to the superior, middle and inferior cervical/stellate ganglia) or descend, or pass through to prevertebral ganglia (coeliac, superior and inferior mesenteric) as the splanchnic nerves. Postganglionic fibres are long and noradrenergic — except sweat glands (cholinergic muscarinic) and the adrenal medulla, which is directly innervated by preganglionic fibres and secretes adrenaline. Key levels: cardiac accelerator fibres T1–T4, stellate ganglion at C7/T1 (block causes Horner's), adrenal T10–L1.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Parasympathetic (craniosacral)</p>
                <p className="text-sm text-muted-foreground mt-1">Preganglionic outflow from cranial nerves <strong>III</strong> (Edinger–Westphal → ciliary ganglion → pupil constriction, accommodation), <strong>VII</strong> (superior salivatory → submandibular and pterygopalatine ganglia → lacrimal and salivary secretion), <strong>IX</strong> (inferior salivatory → otic ganglion → parotid), <strong>X</strong> (dorsal motor nucleus → ganglia in the walls of heart, lung and gut to the mid-transverse colon) and the <strong>sacral S2–S4</strong> pelvic splanchnic nerves (distal colon, bladder, genitalia). Postganglionic fibres are short and cholinergic (muscarinic).</p>
              </div>
              <div className="p-4 rounded-lg border border-border sm:col-span-2">
                <p className="font-semibold text-foreground text-sm">Applied points</p>
                <p className="text-sm text-muted-foreground mt-1">Neuraxial block above T4 removes cardiac sympathetic drive → bradycardia and profound hypotension. Spinal cord injury above T6 leaves the cord below isolated from supraspinal control → autonomic dysreflexia. Vagal predominance in children explains bradycardia with hypoxia or suxamethonium. Sacral parasympathetic block explains urinary retention after neuraxial anaesthesia; sympathetic block of S2–S4 spares it. Coeliac plexus block treats upper abdominal malignant pain; stellate ganglion block treats upper limb CRPS.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <TopicFaqs faqs={neuroanatomyFaqs} />
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
    cites: ["BJA Educ 2007"],
  },
      ]}
      keyPoints={[
        { text: "Circle of Willis complete in only 25% — anterior communicating artery is the commonest aneurysm site", cites: ["Power & Kam Ch.13"] },
        { text: "MCA supplies lateral cortex (motor/sensory strip) — most commonly affected in ischaemic stroke", cites: ["Ellis & Feldman Ch.7"] },
        { text: "Monro-Kellie doctrine: brain 80%, blood 10%, CSF 10% — skull is a fixed-volume box", cites: ["BJA Educ 2007"] },
        { text: "Middle meningeal artery enters via foramen spinosum — rupture causes extradural haematoma", cites: ["Power & Kam Ch.13"] },
        { text: "CSF produced at 500 ml/day by choroid plexus; total volume ~150 ml; absorbed by arachnoid granulations", cites: ["Ellis & Feldman Ch.7"] },
      ]}
    />
  );
};

export default NeuroanatomyTopic;
