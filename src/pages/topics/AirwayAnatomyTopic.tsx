import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { airwayAnatomyQuestions } from "@/data/quizzes";
import LaryngealCrossSectionDiagram from "@/components/diagrams/LaryngealCrossSectionDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const AirwayAnatomyTopic = () => {
  return (
    <SectionLayout title="Airway & Laryngeal Anatomy" subtitle="FRCA — Applied Anatomy" backPath="/anatomy" backLabel="Anatomy" accentColor="text-anatomy">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Nasal Cavity & Pharynx</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The nasal cavity is divided by the septum. Three turbinates (superior, middle, inferior) increase surface area for warming and humidification. Kiesselbach's plexus (Little's area) on the anterior septum is the commonest site of epistaxis.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Nasopharynx</p>
              <p className="text-sm text-muted-foreground mt-1">Posterior to nasal cavity, above soft palate. Contains adenoids and pharyngeal opening of Eustachian tube. Innervation: maxillary nerve (V2).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Oropharynx & Hypopharynx</p>
              <p className="text-sm text-muted-foreground mt-1">Oropharynx: soft palate to epiglottis. Glossopharyngeal nerve (IX) provides sensory innervation. Hypopharynx (laryngopharynx): epiglottis to cricoid. Vagus (X) via internal laryngeal nerve.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Laryngeal Anatomy</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The larynx extends from C3–C6. It comprises a cartilaginous skeleton, intrinsic and extrinsic muscles, and mucosal lining.
          </p>

          <LaryngealCrossSectionDiagram />

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Cartilage</th>
                  <th className="text-left py-2 text-foreground font-semibold">Type</th>
                  <th className="text-left py-2 text-foreground font-semibold">Clinical Relevance</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Thyroid</td><td>Hyaline</td><td>Largest cartilage. Laryngeal prominence ("Adam's apple"). Calcifies with age.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cricoid</td><td>Hyaline</td><td>Only complete cartilaginous ring. Signet-ring shape. Landmark for cricothyroidotomy (below) and cricoid pressure.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Epiglottis</td><td>Elastic</td><td>Leaf-shaped. Attached to hyoid by hyoepiglottic ligament. Vallecula is between epiglottis and tongue base (Macintosh blade tip).</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Arytenoids</td><td>Hyaline</td><td>Paired pyramidal cartilages. Vocal process attaches vocal ligament. Muscular process attaches intrinsic muscles.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Corniculate/Cuneiform</td><td>Elastic</td><td>Small cartilages within aryepiglottic folds. Visible during laryngoscopy.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Laryngeal Innervation</h2>
          <div className="space-y-2">
            {[
              { nerve: "Superior Laryngeal Nerve (SLN)", detail: "Branch of vagus. Divides into internal (sensory above cords — pierces thyrohyoid membrane) and external (motor to cricothyroid — tensor of vocal cords)." },
              { nerve: "Recurrent Laryngeal Nerve (RLN)", detail: "Left loops under aortic arch, right loops under subclavian artery. Motor to all intrinsic laryngeal muscles EXCEPT cricothyroid. Sensory below vocal cords. Vulnerable in thyroid surgery." },
              { nerve: "Unilateral RLN palsy", detail: "Cord adducts to paramedian position. Hoarseness but airway usually adequate." },
              { nerve: "Bilateral RLN palsy", detail: "Both cords paramedian → stridor, airway obstruction. May require emergency intubation or tracheostomy." },
            ].map((n) => (
              <div key={n.nerve} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap min-w-fit">{n.nerve}</span>
                <span className="text-sm text-muted-foreground">{n.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Trachea & Bronchial Tree</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Trachea</p>
              <p className="text-sm text-muted-foreground mt-1">C6–T4/5 (carina). 10–12 cm long, 16–20 C-shaped cartilaginous rings. Posterior membranous wall (trachealis muscle). Blood supply: inferior thyroid artery.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Bronchial Anatomy</p>
              <p className="text-sm text-muted-foreground mt-1">Right main bronchus: wider, shorter, more vertical (25°) — foreign bodies more likely to enter right side. Left main bronchus: narrower, longer, more horizontal (45°). Left-sided DLT preferred.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cricothyroidotomy & Tracheostomy Anatomy</h2>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Cricothyroid membrane:</strong> Avascular midline between thyroid and cricoid cartilages. 9 × 30 mm. Used for emergency surgical airway. Structures at risk: superior cricothyroid artery (runs transversely across upper membrane).
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            <strong className="text-foreground">Tracheostomy:</strong> Usually between rings 2–3 or 3–4. Structures encountered: skin → subcutaneous fat → platysma → investing fascia → strap muscles (sternohyoid/sternothyroid) → pretracheal fascia → thyroid isthmus (may need dividing) → trachea. Brachiocephalic artery crosses anterior to trachea in children (risk of erosion).
          </p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "SLN internal branch: sensory above cords; external branch: motor to cricothyroid (tensor)",
        "RLN: motor to ALL intrinsic muscles except cricothyroid; left loops under aortic arch",
        "Bilateral RLN palsy → cords paramedian → stridor → emergency airway required",
        "Right main bronchus wider, shorter, more vertical — foreign bodies preferentially enter right side",
        "Cricothyroid membrane: avascular midline landmark for emergency front-of-neck access",
      ]} />

      <QuizSection questions={airwayAnatomyQuestions} />
      <ReferencesList topicId="airway-anatomy" />

      <SeeAlso topicId="airway-anatomy" />
        <TopicCompletionToggle topicId="airway-anatomy" topicTitle="Airway & Laryngeal Anatomy" />
    </SectionLayout>
  );
};

export default AirwayAnatomyTopic;
