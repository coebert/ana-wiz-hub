import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { headNeckAnatomyQuestions } from "@/data/quizzes";
import NeckTrianglesDiagram from "@/components/diagrams/NeckTrianglesDiagram";
import CervicalPlexusDiagram from "@/components/diagrams/CervicalPlexusDiagram";
import NeckCrossSectionDiagram from "@/components/diagrams/NeckCrossSectionDiagram";
import { ReferencesList } from "@/components/ReferencesList";

const HeadNeckAnatomyTopic = () => {
  return (
    <SectionLayout title="Head & Neck Anatomy" subtitle="FRCA — Applied Anatomy" backPath="/anatomy" backLabel="Anatomy" accentColor="text-anatomy">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cranial Nerves — Anaesthetic Relevance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">CN</th>
                  <th className="text-left py-2 text-foreground font-semibold">Name</th>
                  <th className="text-left py-2 text-foreground font-semibold">Anaesthetic Relevance</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">V</td><td>Trigeminal</td><td>Sensory to face (V1 ophthalmic, V2 maxillary, V3 mandibular). Motor to muscles of mastication. V2 → nasal cavity sensation. Regional blocks for dental/maxillofacial surgery.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">VII</td><td>Facial</td><td>Motor to muscles of facial expression. Monitoring during parotid/mastoid surgery. Runs through middle ear — risk in ear surgery.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">IX</td><td>Glossopharyngeal</td><td>Sensory to oropharynx, posterior 1/3 tongue, carotid body. Gag reflex afferent. Glossopharyngeal nerve block for awake intubation.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">X</td><td>Vagus</td><td>SLN and RLN branches — laryngeal innervation. Parasympathetic to heart (bradycardia). Oculocardiac reflex afferent (V1) → efferent (X).</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">XI</td><td>Accessory</td><td>Motor to SCM and trapezius. Vulnerable in posterior triangle of neck (superficial). Damage → shoulder drop.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">XII</td><td>Hypoglossal</td><td>Motor to tongue muscles. Tongue deviation towards lesion side. Risk during carotid endarterectomy.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Triangles of the Neck</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The neck is divided by the sternocleidomastoid into anterior and posterior triangles — key landmarks for vascular access, nerve blocks, and surgical approaches.
          </p>
          <NeckTrianglesDiagram />
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Anterior Triangle</p>
              <p className="text-sm text-muted-foreground mt-1">Borders: midline, SCM, mandible. Contains: carotid sheath (CCA/ICA, IJV, vagus), thyroid gland, larynx, trachea, submandibular gland. Subdivided into: carotid, muscular, submandibular, submental triangles.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Posterior Triangle</p>
              <p className="text-sm text-muted-foreground mt-1">Borders: SCM, trapezius, middle 1/3 clavicle. Floor: prevertebral fascia over scalene muscles. Contains: accessory nerve (superficial — vulnerable), subclavian artery, brachial plexus trunks, external jugular vein.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Internal Jugular Vein Cannulation</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The IJV runs within the carotid sheath, lateral to the ICA/CCA, deep to SCM. It joins the subclavian vein behind the sternoclavicular joint to form the brachiocephalic vein.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Landmark Approach</p>
              <p className="text-sm text-muted-foreground mt-1">Apex of triangle formed by two heads of SCM and clavicle. Needle at 30° towards ipsilateral nipple, lateral to carotid pulse. US-guided approach now standard (NICE CG49).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Relations</p>
              <p className="text-sm text-muted-foreground mt-1">Medial: CCA. Posterior: vagus nerve. Anterior: SCM. Right IJV preferred — straighter path to SVC, avoids thoracic duct (left). Risks: carotid puncture, pneumothorax, air embolism.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cervical Plexus</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Formed by C1–C4 ventral rami. Superficial cervical plexus emerges at the posterior border of SCM (Erb's point). Provides sensory innervation to neck, ear, and shoulder. Deep cervical plexus block targets C2–C4 transverse processes — used for carotid endarterectomy. Phrenic nerve (C3,4,5) arises from cervical plexus — risk of paralysis with deep block.
          </p>
          <CervicalPlexusDiagram />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cross-Section at C6 Level</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Understanding the fascial planes and spatial relationships at C6 (cricoid level) is essential for central venous access, stellate ganglion block, and understanding the spread of deep neck infections.
          </p>
          <NeckCrossSectionDiagram />
        </div>
      </section>

      <KeyLearningPoints points={[
        "Glossopharyngeal nerve (IX) provides oropharyngeal sensation — block for awake fibreoptic intubation",
        "Vagus (X): SLN and RLN branches control laryngeal function — at risk in thyroid/neck surgery",
        "Right IJV preferred for CVC: straighter path to SVC, avoids thoracic duct (left side)",
        "Accessory nerve (XI) is superficial in posterior triangle — vulnerable to surgical injury",
        "Deep cervical plexus block risks phrenic nerve paralysis — avoid bilaterally",
      ]} />

      <QuizSection questions={headNeckAnatomyQuestions} />
      <ReferencesList topicId="head-neck-anatomy" />

      <TopicCompletionToggle topicId="head-neck-anatomy" topicTitle="Head & Neck Anatomy" />
    </SectionLayout>
  );
};

export default HeadNeckAnatomyTopic;
