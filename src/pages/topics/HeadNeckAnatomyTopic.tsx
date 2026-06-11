import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";

const headNeckAnatomyFaqs: Array<[string, string]> = [
  ["Which cricoid landmark identifies the level of cricoid pressure?", "The cricoid cartilage is the only complete tracheal ring, lying anteriorly at C6. Palpate below the thyroid prominence to the first firm transverse band. Backward pressure of ~30 N (10 N awake, 30 N anaesthetised) occludes the oesophagus against the C6 vertebral body — though clinical effectiveness is debated."],
  ["What is the sensory innervation of the larynx?", "Above the cords: internal branch of the superior laryngeal nerve (vagus). Below the cords and trachea: recurrent laryngeal nerve. All intrinsic laryngeal muscles are supplied by the recurrent laryngeal nerve EXCEPT cricothyroid (external branch of superior laryngeal nerve). Bilateral RLN injury leaves cords in mid-position — stridor and airway emergency."],
  ["Where is the cricothyroid membrane and how is it located?", "Between the lower thyroid cartilage and upper cricoid, 1–2 cm below the laryngeal prominence in the midline. The \"laryngeal handshake\" — stabilising the larynx between thumb and middle finger while palpating downward with the index finger — reliably identifies it for emergency front-of-neck access."],
];
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { headNeckAnatomyQuestions } from "@/data/quizzes";
import NeckTrianglesDiagram from "@/components/diagrams/NeckTrianglesDiagram";
import CervicalPlexusDiagram from "@/components/diagrams/CervicalPlexusDiagram";
import NeckCrossSectionDiagram from "@/components/diagrams/NeckCrossSectionDiagram";
import LaryngealNervesDiagram from "@/components/diagrams/LaryngealNervesDiagram";
import LaryngealCrossSectionDiagram from "@/components/diagrams/LaryngealCrossSectionDiagram";
import SkullBaseDiagram from "@/components/diagrams/SkullBaseDiagram";
import OrbitAnatomyDiagram from "@/components/diagrams/OrbitAnatomyDiagram";
import OrbitBonyAnatomyDiagram from "@/components/diagrams/OrbitBonyAnatomyDiagram";
import TracheobronchialTreeDiagram from "@/components/diagrams/TracheobronchialTreeDiagram";
import BronchoscopicViewDiagram from "@/components/diagrams/BronchoscopicViewDiagram";
import CorPictumFolio from "@/components/diagrams/CorPictumFolio";
import { headNeckFolio, airwayFolio } from "@/components/diagrams/anatomyFolios";
import { Exam } from "@/data/curriculum";

const HeadNeckAnatomyTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Front-of-neck access (FONA) in a CICO scenario",
    scenario: "After failed intubation and ventilation in a 70 kg adult, you proceed to emergency front-of-neck access. Describe the landmark-guided scalpel-bougie-tube technique and key anatomy.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Extend the neck and palpate the cricothyroid membrane between the thyroid (above) and cricoid (below) cartilages</li>
          <li>If membrane is impalpable, make an 8–10 cm vertical midline skin incision then re-palpate (DAS 'laryngeal handshake')</li>
          <li>Stabilise the larynx with the non-dominant hand; make a transverse stab through the cricothyroid membrane, rotate the blade caudally</li>
          <li>Railroad a bougie caudally into the trachea (feel tracheal clicks), then advance a 6.0 cuffed ETT over the bougie</li>
          <li>Inflate cuff, ventilate, confirm with capnography, and call for ENT/surgical airway support</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Cricothyroid artery runs across the upper third of the membrane — stay low</li>
          <li>Mistaking the thyrohyoid membrane for the cricothyroid in slim necks</li>
          <li>Advancing the bougie cephalad into the larynx</li>
          </ul>
        </div>
      </div>
    ),
    answer: "DAS scalpel-bougie-tube via the cricothyroid membrane: transverse stab, caudal rotation, bougie railroad, 6.0 cuffed tube, capnography confirmation.",
    cites: ["Ellis & Feldman Ch.5", "Ellis & Feldman Ch.1", "BJA Educ 2005"],
  },
];

const HeadNeckAnatomyTopic = () => {
  return (
    <TopicTemplate
      title="Head, Neck & Airway Anatomy"
      subtitle="FRCA — Applied Anatomy"
      backPath="/anatomy"
      backLabel="Anatomy"
      accentColor="text-anatomy"
      topicId="head-neck-anatomy"
      topicTitle="Head, Neck & Airway Anatomy"
      workedExamples={HeadNeckAnatomyTopicWorkedExamples}
      quizQuestions={headNeckAnatomyQuestions}
      objectives={[
        "Identify the cranial nerves of anaesthetic relevance and their clinical applications",
        "Describe the skull base foramina, orbit, and cranial framework relevant to regional anaesthesia",
        "Outline the triangles of the neck and the C6 cross-sectional anatomy for vascular access",
        "Describe the laryngeal anatomy and innervation underpinning airway management",
        "Apply tracheobronchial anatomy to DLT placement and emergency front-of-neck access",
      ]}
      keyPoints={[
        { text: "Glossopharyngeal nerve (IX) provides oropharyngeal sensation — block for awake fibreoptic intubation", cites: ["BJA Educ 2019"] },
        { text: "SLN internal branch: sensory above cords; external branch: motor to cricothyroid (tensor)", cites: ["BJA Educ 2005"] },
        { text: "RLN: motor to ALL intrinsic muscles except cricothyroid; left loops under aortic arch", cites: ["Ellis & Feldman Ch.1"] },
        { text: "Bilateral RLN palsy → cords paramedian → stridor → emergency airway required", cites: ["Ellis & Feldman Ch.5"] },
        { text: "Right main bronchus wider, shorter, more vertical — foreign bodies preferentially enter right side", cites: ["Power & Kam Ch.12"] },
        { text: "Cricothyroid membrane: avascular midline landmark for emergency front-of-neck access", cites: ["BJA Educ 2019"] },
        { text: "Right IJV preferred for CVC: straighter path to SVC, avoids thoracic duct (left side)", cites: ["BJA Educ 2005"] },
        { text: "Accessory nerve (XI) is superficial in posterior triangle — vulnerable to surgical injury", cites: ["Ellis & Feldman Ch.1"] },
        { text: "Deep cervical plexus block risks phrenic nerve paralysis — avoid bilaterally", cites: ["Ellis & Feldman Ch.5"] },
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "Ellis & Feldman Ch.5",
          "Ellis & Feldman Ch.1",
          "BJA Educ 2005",
          "BJA Educ 2019",
          "Power & Kam Ch.12",
        ],
        keyPoints: [
          "Ellis & Feldman Ch.5",
          "Ellis & Feldman Ch.1",
          "BJA Educ 2005",
          "BJA Educ 2019",
          "Power & Kam Ch.12",
        ],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
        <section className="space-y-10 mb-10 [&>div]:scroll-mt-24">
          <CorPictumFolio {...headNeckFolio} suppressOverlayLabels />
          <p className="text-muted-foreground leading-relaxed mb-2 text-sm italic">
            This page is organised into five parts following a top-down anatomical journey: <strong>(A)</strong> cranial nerves and bony framework, <strong>(B)</strong> the soft-tissue neck and vascular access, <strong>(C)</strong> the upper airway (nose and pharynx), <strong>(D)</strong> the larynx and front-of-neck access, and <strong>(E)</strong> the lower airway (trachea and bronchial tree).
          </p>

          {/* ==================================================================== */}
          {/* PART A — CRANIAL NERVES & BONY FRAMEWORK                              */}
          {/* ==================================================================== */}
          <div className="border-l-4 border-anatomy/40 pl-4 py-1">
            <p className="text-xs uppercase tracking-widest text-anatomy/80 font-semibold">Part A</p>
            <h2 className="text-3xl font-serif font-bold text-foreground">Cranial Nerves & Bony Framework</h2>
            <p className="text-sm text-muted-foreground mt-1">Cranial nerves of anaesthetic relevance, the skull base foramina that transmit them, and the orbit (soft-tissue and bony anatomy) for ophthalmic regional anaesthesia.</p>
          </div>

          <div id="cranial-nerves">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">A1. Cranial Nerves — Anaesthetic Relevance</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Six cranial nerves carry particular significance for the anaesthetist — they provide the sensory targets for airway and regional blocks, supply motor function vulnerable to surgical injury, and mediate reflexes (oculocardiac, gag) that have direct intra-operative consequences.
            </p>
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

          {/* ============== CRANIAL FRAMEWORK ============== */}
          <div id="skull-base">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">A2. Skull Base Foramina</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The internal surface of the skull base is divided into anterior, middle, and posterior cranial fossae. Each foramen transmits specific cranial nerves and vessels — knowledge of these is essential for understanding cranial nerve palsies, skull base fractures, and neurosurgical approaches.
            </p>
            <SkullBaseDiagram />
          </div>

          <div id="orbit-muscles">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">A3. Orbit — Extraocular Muscles</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The orbit contains seven extraocular muscles controlling eye movement and eyelid elevation. The classic mnemonic "LR6 SO4, all the Rest III" summarises their innervation — essential for interpreting cranial nerve palsies and understanding ophthalmic regional anaesthesia.
            </p>
            <OrbitAnatomyDiagram />
          </div>

          <div id="orbit-bony">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">A4. Orbit — Bony Anatomy, Foramina & Fissures</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The orbit is a four-walled pyramidal cavity formed by seven bones, with its apex at the optic canal. Knowledge of which structures pass through each foramen and fissure underpins the interpretation of orbital fractures, the planning of regional blocks of the eye and face (supra-orbital, infra-orbital, peribulbar/retrobulbar), and the localisation of cranial nerve lesions causing ophthalmoplegia or sensory loss.
            </p>
            <OrbitBonyAnatomyDiagram />
          </div>

          {/* ==================================================================== */}
          {/* PART B — NECK: SURFACE, SPACES & VASCULAR ACCESS                      */}
          {/* ==================================================================== */}
          <div className="border-l-4 border-anatomy/40 pl-4 py-1">
            <p className="text-xs uppercase tracking-widest text-anatomy/80 font-semibold">Part B</p>
            <h2 className="text-3xl font-serif font-bold text-foreground">Neck — Surface, Spaces & Vascular Access</h2>
            <p className="text-sm text-muted-foreground mt-1">Surface anatomy of the neck triangles, the cross-sectional fascial planes at C6, the cervical plexus, and internal jugular vein cannulation.</p>
          </div>

          <div id="neck-triangles">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">B1. Triangles of the Neck</h2>
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

          <div id="neck-cross-section">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">B2. Cross-Section at C6 Level</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Understanding the fascial planes and spatial relationships at C6 (cricoid level) is essential for central venous access, stellate ganglion block, and understanding the spread of deep neck infections.
            </p>
            <NeckCrossSectionDiagram />
          </div>

          <div id="cervical-plexus">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">B3. Cervical Plexus</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Formed by C1–C4 ventral rami. Superficial cervical plexus emerges at the posterior border of SCM (Erb's point). Provides sensory innervation to neck, ear, and shoulder. Deep cervical plexus block targets C2–C4 transverse processes — used for carotid endarterectomy. Phrenic nerve (C3,4,5) arises from cervical plexus — risk of paralysis with deep block.
            </p>
            <CervicalPlexusDiagram />
          </div>

          <div id="ijv">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">B4. Internal Jugular Vein Cannulation</h2>
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

          {/* ==================================================================== */}
          {/* PART C — UPPER AIRWAY (NOSE & PHARYNX)                                */}
          {/* ==================================================================== */}
          <div className="border-l-4 border-anatomy/40 pl-4 py-1">
            <p className="text-xs uppercase tracking-widest text-anatomy/80 font-semibold">Part C</p>
            <h2 className="text-3xl font-serif font-bold text-foreground">Upper Airway — Nose & Pharynx</h2>
            <p className="text-sm text-muted-foreground mt-1">The conducting passages above the larynx — relevant to nasal intubation, awake fibreoptic technique, and topical anaesthesia of the upper airway.</p>
          </div>

          <div id="nasal-pharynx">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">C1. Nasal Cavity & Pharynx</h2>
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

          {/* ==================================================================== */}
          {/* PART D — LARYNX & FRONT-OF-NECK ACCESS                                */}
          {/* ==================================================================== */}
          <div className="border-l-4 border-anatomy/40 pl-4 py-1">
            <p className="text-xs uppercase tracking-widest text-anatomy/80 font-semibold">Part D</p>
            <h2 className="text-3xl font-serif font-bold text-foreground">Larynx & Front-of-Neck Access</h2>
            <p className="text-sm text-muted-foreground mt-1">Cartilaginous skeleton and cross-sectional anatomy, vagal innervation (SLN/RLN) and palsy patterns, and the surface landmarks for emergency cricothyroidotomy and elective tracheostomy.</p>
          </div>

          <div id="larynx-plates">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">D1. Larynx — Painted Atlas Plates</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Netter-style plates of the larynx in the four standard planes — sagittal, laryngoscopic, coronal, and axial — with anaesthetic and clinical labels. Use the tabs to switch between views.
            </p>
            <CorPictumFolio {...airwayFolio} suppressOverlayLabels />
          </div>

          <div id="larynx">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">D2. Laryngeal Skeleton & Cross-Section</h2>
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

          <div id="laryngeal-innervation">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">D3. Laryngeal Innervation</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The vagus nerve provides all motor and sensory innervation to the larynx via its superior and recurrent laryngeal branches. Understanding their courses is critical for thyroid surgery, airway management, and awake intubation techniques.
            </p>
            <LaryngealNervesDiagram />
            <div className="space-y-2 mt-4">
              {[
                { nerve: "Superior Laryngeal Nerve (SLN)", detail: "Branch of vagus. Divides into internal (sensory above cords — pierces thyrohyoid membrane) and external (motor to cricothyroid — tensor of vocal cords)." },
                { nerve: "Recurrent Laryngeal Nerve (RLN)", detail: "Left loops under aortic arch, right loops under subclavian artery. Motor to all intrinsic laryngeal muscles EXCEPT cricothyroid. Sensory below vocal cords. Vulnerable in thyroid surgery." },
                { nerve: "Unilateral RLN palsy", detail: "Cord adducts to paramedian position. Hoarseness but airway usually adequate." },
                { nerve: "Bilateral RLN palsy", detail: "Both cords paramedian → stridor, airway obstruction. May require emergency intubation or tracheostomy." },
              ].map((n) => (
                <div key={n.nerve} className="p-3 rounded border border-border">
                  <p className="font-bold text-primary text-sm mb-1">{n.nerve}</p>
                  <p className="text-sm text-muted-foreground">{n.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="front-of-neck">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">D4. Cricothyroidotomy & Tracheostomy Anatomy</h2>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Cricothyroid membrane:</strong> Avascular midline between thyroid and cricoid cartilages. 9 × 30 mm. Used for emergency surgical airway. Structures at risk: superior cricothyroid artery (runs transversely across upper membrane).
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              <strong className="text-foreground">Tracheostomy:</strong> Usually between rings 2–3 or 3–4. Structures encountered: skin → subcutaneous fat → platysma → investing fascia → strap muscles (sternohyoid/sternothyroid) → pretracheal fascia → thyroid isthmus (may need dividing) → trachea. Brachiocephalic artery crosses anterior to trachea in children (risk of erosion).
            </p>
          </div>

          {/* ==================================================================== */}
          {/* PART E — LOWER AIRWAY (TRACHEA & BRONCHIAL TREE)                      */}
          {/* ==================================================================== */}
          <div className="border-l-4 border-anatomy/40 pl-4 py-1">
            <p className="text-xs uppercase tracking-widest text-anatomy/80 font-semibold">Part E</p>
            <h2 className="text-3xl font-serif font-bold text-foreground">Lower Airway — Trachea & Bronchial Tree</h2>
            <p className="text-sm text-muted-foreground mt-1">From the cricoid down to the lobar bronchi — the anatomy underpinning DLT placement, fibreoptic bronchoscopy, and the recognition of endobronchial intubation.</p>
          </div>

          <div id="tracheobronchial">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">E1. Trachea & Bronchial Tree</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Trachea</p>
                <p className="text-sm text-muted-foreground mt-1">C6–T4/5 (carina). 10–12 cm long, 16–20 C-shaped cartilaginous rings. Posterior membranous wall (trachealis muscle). Blood supply: inferior thyroid artery.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Bronchial Anatomy</p>
                <p className="text-sm text-muted-foreground mt-1">Right main bronchus: wider, shorter, more vertical (25°) — foreign bodies more likely to enter right side. Left main bronchus: narrower, longer, more horizontal (45°). Left-sided DLT preferred.</p>
              </div>
            </div>
            <TracheobronchialTreeDiagram />
          </div>

          <div id="bronchoscopic-view">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">E2. Bronchoscopic View — Carina & Lobar Bronchi</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The view down the trachea identifies the carina and the orientation of the right and left main bronchi — orienting landmarks for fibreoptic bronchoscopy, double-lumen tube placement, and confirming correct ETT position.
            </p>
            <BronchoscopicViewDiagram />
          </div>
        </section>
      </ExamSection>
      }
    />
  );
};

export default HeadNeckAnatomyTopic;
