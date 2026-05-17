import { TopicTemplate } from "@/components/TopicTemplate";
import { thoracicAnatomyQuestions } from "@/data/quizzes";
import IntercostalAnatomyDiagram from "@/components/diagrams/IntercostalAnatomyDiagram";
import ParavertebralSpaceDiagram from "@/components/diagrams/ParavertebralSpaceDiagram";
import FirstRibDiagram from "@/components/diagrams/FirstRibDiagram";
import DiaphragmDiagram from "@/components/diagrams/DiaphragmDiagram";
import CorPictumFolio from "@/components/diagrams/CorPictumFolio";
import { thoracicFolio } from "@/components/diagrams/anatomyFolios";
import { Exam } from "@/data/curriculum";

const ThoracicAnatomyTopic = () => {
  return (
    <TopicTemplate
      title="Thoracic Anatomy"
      subtitle="FRCA — Applied Anatomy"
      backPath="/anatomy"
      backLabel="Anatomy"
      accentColor="text-anatomy"
      topicId="thoracic-anatomy"
      topicTitle="Thoracic Anatomy"
      quizQuestions={thoracicAnatomyQuestions}
      objectives={[
        "Describe the layers of the intercostal space and safe technique for chest drain insertion",
        "Outline the boundaries and contents of the superior and inferior mediastinum",
        "Explain the surgical anatomy relevant to one-lung ventilation and DLT placement",
        "Identify the boundaries, contents, and indications for paravertebral block",
        "Describe the first rib and its relevance to supraclavicular block and subclavian access",
      ]}
      keyPoints={[
        { text: "Intercostal neurovascular bundle (VAN) runs below the rib — insert drains above the rib below", cites: ["Ellis & Feldman Ch.2"] },
        { text: "Cervical pleura extends above clavicle — risk during subclavian vein cannulation", cites: ["Power & Kam Ch.5"] },
        { text: "Diaphragm: phrenic nerve C3,4,5. Openings at T8 (IVC), T10 (oesophagus), T12 (aorta)", cites: ["BJA Educ 2007"] },
        { text: "Right upper lobe bronchus is eparterial — reason left DLT preferred for one-lung ventilation", cites: ["Ellis & Feldman Ch.2"] },
        { text: "Paravertebral space: unilateral somatic + sympathetic block; bounded by TP, SCTL, parietal pleura", cites: ["Power & Kam Ch.5"] },
        { text: "First rib: scalene tubercle divides subclavian vein (anterior) from artery + brachial plexus (posterior)", cites: ["BJA Educ 2007"] },
        { text: "Supraclavicular block at the first rib — 'spinal anaesthesia of the arm' with highest success for upper limb", cites: ["Ellis & Feldman Ch.2"] },
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      coreConcepts={
        <section className="space-y-6 mb-10">
        <CorPictumFolio {...thoracicFolio} suppressOverlayLabels />
        <div id="thoracic-wall" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Thoracic Wall & Intercostal Space</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The thoracic cage comprises 12 pairs of ribs, sternum, and thoracic vertebrae. The intercostal space is key for chest drain insertion, intercostal nerve blocks, and thoracic procedures.
          </p>

          <IntercostalAnatomyDiagram />

          <div className="space-y-1.5 mt-4">
            <p className="text-sm text-foreground font-semibold">Layers of the intercostal space (superficial → deep):</p>
            {[
              "Skin → superficial fascia → external intercostal muscle (fibres run downward and forward)",
              "Internal intercostal muscle (fibres run downward and backward)",
              "Innermost intercostal muscle (incomplete) — neurovascular bundle runs between internal and innermost muscles",
              "Endothoracic fascia → parietal pleura → pleural space → visceral pleura → lung",
            ].map((layer, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded border border-border">
                <span className="text-xs font-bold text-primary w-5 text-center">{i + 1}</span>
                <span className="text-sm text-muted-foreground">{layer}</span>
              </div>
            ))}
            <p className="text-xs text-muted-foreground mt-2">
              <strong className="text-foreground">VAN:</strong> Vein, Artery, Nerve — run in the costal groove at the inferior border of the rib above. Insert chest drains above the rib below to avoid the neurovascular bundle.
            </p>
          </div>
        </div>

        <div id="pleura" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pleura</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Parietal Pleura</p>
              <p className="text-sm text-muted-foreground mt-1">Lines thoracic wall, mediastinum, and diaphragm. Innervated by intercostal and phrenic nerves (pain-sensitive). Cervical pleura extends above clavicle (risk during subclavian access).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Pleural Reflections</p>
              <p className="text-sm text-muted-foreground mt-1">Meet at midline at rib 2. Left pleura deviates at rib 4 (cardiac notch). Both descend to rib 8 (MCL), rib 10 (MAL), rib 12 posteriorly. Lung edge: 2 ribs above pleural reflection.</p>
            </div>
          </div>
        </div>

        <div id="mediastinum" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Mediastinum</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Superior Mediastinum</p>
              <p className="text-sm text-muted-foreground mt-1">Above plane of sternal angle to T4. Contains: aortic arch and branches, SVC, brachiocephalic veins, trachea, oesophagus, thoracic duct, vagus, phrenic nerves, left RLN.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Inferior Mediastinum</p>
              <p className="text-sm text-muted-foreground mt-1">Anterior: thymus (children). Middle: heart, pericardium, phrenic nerves. Posterior: descending aorta, oesophagus, thoracic duct, azygos system, vagal trunks, sympathetic chains.</p>
            </div>
          </div>
        </div>

        <div id="lung-anatomy" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Lung Anatomy</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Right Lung</p>
              <p className="text-sm text-muted-foreground mt-1">3 lobes (upper, middle, lower). 2 fissures (oblique, horizontal). 10 bronchopulmonary segments. Eparterial bronchus (upper lobe bronchus arises above right PA — important for DLT placement).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Left Lung</p>
              <p className="text-sm text-muted-foreground mt-1">2 lobes (upper with lingula, lower). 1 oblique fissure. 8–10 segments. Cardiac notch and lingula (homologue of right middle lobe). Left main bronchus longer — left DLT preferred for OLV.</p>
            </div>
          </div>
        </div>

        <div id="diaphragm" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Diaphragm</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Principal muscle of respiration. Dome-shaped. Motor supply: phrenic nerve (C3,4,5 — "C3,4,5 keeps the diaphragm alive"). Right crus: larger, encircles oesophagus. Three major openings: aortic hiatus (T12 — aorta, thoracic duct, azygos vein), oesophageal hiatus (T10 — oesophagus, vagal trunks), vena caval foramen (T8 — IVC, right phrenic nerve).
          </p>
          <div className="rounded-xl border border-border bg-card p-4">
            <DiaphragmDiagram />
          </div>
        </div>

        <div id="paravertebral-space" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Paravertebral Space</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The paravertebral space is a wedge-shaped potential space lateral to the vertebral column.
          </p>

          <ParavertebralSpaceDiagram />

          <p className="text-muted-foreground leading-relaxed mt-3">
            It is bounded medially by the vertebral body/intervertebral disc/foramen, posteriorly by the transverse process and superior costotransverse ligament, and anterolaterally by the parietal pleura. It contains the spinal nerve (before it divides into dorsal and ventral rami), the sympathetic chain, fat, and areolar tissue.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Paravertebral Block Technique</p>
              <p className="text-sm text-muted-foreground mt-1">Landmark: 2.5 cm lateral to spinous process. Contact transverse process at 2–4 cm depth, walk off inferiorly and advance 1–1.5 cm through the superior costotransverse ligament (loss of resistance). Single injection spreads 3–5 dermatomes. Dose: 0.3–0.5 mL/kg bupivacaine 0.25–0.5%.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Advantages Over Epidural</p>
              <p className="text-sm text-muted-foreground mt-1">Unilateral somatic + sympathetic block → less hypotension. No urinary retention. No motor block of contralateral limb. Excellent for breast surgery, thoracotomy, rib fractures, and renal surgery. Complications: pneumothorax (~0.5%), epidural spread (~10%).</p>
            </div>
          </div>
        </div>

        <div id="first-rib" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The First Rib</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The first rib is the broadest, shortest, and most curved rib. It is flattened with superior and inferior surfaces.
          </p>

          <FirstRibDiagram />

          <p className="text-muted-foreground leading-relaxed mt-3">
            The scalene tubercle on its inner border is a critical landmark dividing structures that cross the rib: the subclavian vein passes anterior and the subclavian artery with brachial plexus trunks pass posterior to it.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Key Muscular Attachments</p>
              <p className="text-sm text-muted-foreground mt-1">Scalenus anterior inserts on scalene tubercle. Scalenus medius inserts posteriorly. Subclavius muscle on inferior surface. The interscalene groove (between anterior and middle scalene) contains the brachial plexus roots and subclavian artery.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Clinical Significance</p>
              <p className="text-sm text-muted-foreground mt-1">Supraclavicular brachial plexus block targets trunks at the first rib. Subclavian vein cannulation crosses the first rib. Cervical rib (C7 variant) → thoracic outlet syndrome. Pleural dome rises 2.5 cm above medial clavicle — pneumothorax risk.</p>
            </div>
          </div>
        </div>
        </section>
      }
    />
  );
};

export default ThoracicAnatomyTopic;
