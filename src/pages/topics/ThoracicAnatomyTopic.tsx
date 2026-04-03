import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { thoracicAnatomyQuestions } from "@/data/quizzes";
import IntercostalAnatomyDiagram from "@/components/diagrams/IntercostalAnatomyDiagram";

const ThoracicAnatomyTopic = () => {
  return (
    <SectionLayout title="Thoracic Anatomy" subtitle="FRCA — Applied Anatomy" backPath="/anatomy" backLabel="Anatomy" accentColor="text-anatomy">
      <IntercostalAnatomyDiagram />
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Thoracic Wall & Intercostal Space</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The thoracic cage comprises 12 pairs of ribs, sternum, and thoracic vertebrae. The intercostal space is key for chest drain insertion, intercostal nerve blocks, and thoracic procedures.
          </p>
          <div className="space-y-1.5">
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

        <div>
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

        <div>
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

        <div>
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

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Diaphragm</h2>
          <p className="text-muted-foreground leading-relaxed">
            Principal muscle of respiration. Dome-shaped. Motor supply: phrenic nerve (C3,4,5 — "C3,4,5 keeps the diaphragm alive"). Right crus: larger, encircles oesophagus. Three major openings: aortic hiatus (T12 — aorta, thoracic duct, azygos vein), oesophageal hiatus (T10 — oesophagus, vagal trunks), vena caval foramen (T8 — IVC, right phrenic nerve).
          </p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Intercostal neurovascular bundle (VAN) runs below the rib — insert drains above the rib below",
        "Cervical pleura extends above clavicle — risk during subclavian vein cannulation",
        "Diaphragm: phrenic nerve C3,4,5. Openings at T8 (IVC), T10 (oesophagus), T12 (aorta)",
        "Right upper lobe bronchus is eparterial — reason left DLT preferred for one-lung ventilation",
        "Sternal angle (T4) divides superior from inferior mediastinum — landmark for many structures",
      ]} />

      <QuizSection questions={thoracicAnatomyQuestions} />
      <TopicCompletionToggle topicId="thoracic-anatomy" topicTitle="Thoracic Anatomy" />
    </SectionLayout>
  );
};

export default ThoracicAnatomyTopic;
