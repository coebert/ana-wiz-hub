import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";

const headNeckAnatomyFaqs: Array<[string, string]> = [
  ["Which cricoid landmark identifies the level of cricoid pressure?", "The cricoid cartilage is the only complete tracheal ring, lying anteriorly at C6. Palpate below the thyroid prominence to the first firm transverse band. Backward pressure of ~30 N (10 N awake, 30 N anaesthetised) occludes the oesophagus against the C6 vertebral body — though clinical effectiveness is debated."],
  ["What is the sensory innervation of the larynx?", "Above the cords: internal branch of the superior laryngeal nerve (vagus). Below the cords and trachea: recurrent laryngeal nerve. All intrinsic laryngeal muscles are supplied by the recurrent laryngeal nerve EXCEPT cricothyroid (external branch of superior laryngeal nerve). Bilateral RLN injury leaves cords in mid-position — stridor and airway emergency."],
  ["Where is the cricothyroid membrane and how is it located?", "Between the lower thyroid cartilage and upper cricoid, 1–2 cm below the laryngeal prominence in the midline. The \"laryngeal handshake\" — stabilising the larynx between thumb and middle finger while palpating downward with the index finger — reliably identifies it for emergency front-of-neck access."],
];
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { headNeckAnatomyQuestions } from "@/data/quizzes";
import NeckTrianglesDiagram from "@/components/diagrams/anatomy/NeckTrianglesDiagram";
import CervicalPlexusDiagram from "@/components/diagrams/anatomy/CervicalPlexusDiagram";
import NeckCrossSectionDiagram from "@/components/diagrams/anatomy/NeckCrossSectionDiagram";
import LaryngealNervesDiagram from "@/components/diagrams/anatomy/LaryngealNervesDiagram";
import LaryngealCrossSectionDiagram from "@/components/diagrams/anatomy/LaryngealCrossSectionDiagram";
import SkullBaseDiagram from "@/components/diagrams/anatomy/SkullBaseDiagram";
import OrbitAnatomyDiagram from "@/components/diagrams/anatomy/OrbitAnatomyDiagram";
import OrbitBonyAnatomyDiagram from "@/components/diagrams/anatomy/OrbitBonyAnatomyDiagram";
import TracheobronchialTreeDiagram from "@/components/diagrams/anatomy/TracheobronchialTreeDiagram";
import BronchoscopicViewDiagram from "@/components/diagrams/anatomy/BronchoscopicViewDiagram";
import CorPictumFolio from "@/components/diagrams/anatomy/CorPictumFolio";
import { headNeckFolio, airwayFolio } from "@/components/diagrams/anatomyFolios";
import { Exam } from "@/data/curriculum";
import { InlineRef } from "@/components/references/InlineRef";

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
        <span id="ophthalmic-anatomy" aria-hidden="true" />
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
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Fossa</th>
                    <th className="text-left py-2 text-foreground font-semibold">Foramen / fissure</th>
                    <th className="text-left py-2 text-foreground font-semibold">Contents</th>
                    <th className="text-left py-2 text-foreground font-semibold">Clinical relevance</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Anterior</td><td>Cribriform plate</td><td>Olfactory nerve (CN I) filaments; anterior ethmoidal vessels</td><td>Anosmia and CSF rhinorrhoea after base-of-skull fracture; avoid nasal airways and nasogastric tubes</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Anterior</td><td>Optic canal</td><td>Optic nerve (CN II), ophthalmic artery, sympathetic fibres</td><td>Visual loss with orbital apex injury or retrobulbar haemorrhage</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Middle</td><td>Superior orbital fissure</td><td>CN III, IV, VI, V1 branches (frontal, lacrimal, nasociliary), superior ophthalmic vein</td><td>Total ophthalmoplegia after peribulbar or retrobulbar block spread; cavernous sinus pathology</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Middle</td><td>Foramen rotundum</td><td>Maxillary nerve (V2)</td><td>Route for maxillary nerve block; mid-face sensory loss</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Middle</td><td>Foramen ovale</td><td>Mandibular nerve (V3), accessory meningeal artery, lesser petrosal nerve</td><td>Target for trigeminal ganglion (Gasserian) radiofrequency in trigeminal neuralgia</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Middle</td><td>Foramen spinosum</td><td>Middle meningeal artery and vein</td><td>Torn in pterional fracture → extradural haematoma</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Middle</td><td>Foramen lacerum / carotid canal</td><td>Internal carotid artery with sympathetic plexus (canal); greater petrosal nerve (lacerum)</td><td>Carotid injury in skull-base fracture; Horner's from plexus damage</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Posterior</td><td>Internal acoustic meatus</td><td>CN VII, CN VIII, labyrinthine artery</td><td>Vestibular schwannoma; facial palsy after temporal bone fracture</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Posterior</td><td>Jugular foramen</td><td>CN IX, X, XI, internal jugular vein, inferior petrosal and sigmoid sinuses</td><td>Glomus tumour; bulbar palsy; landmark for IJV cannulation</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Posterior</td><td>Hypoglossal canal</td><td>CN XII</td><td>Tongue deviation towards the lesion</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Posterior</td><td>Foramen magnum</td><td>Medulla/spinal cord, vertebral arteries, spinal roots of CN XI, meninges</td><td>Site of tonsillar herniation ("coning") with raised ICP; Chiari malformation</td></tr>
                </tbody>
              </table>
            </div>
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
              Formed by the ventral rami of C1–C4, lying on the prevertebral fascia over the scalenus medius and levator scapulae, deep to the internal jugular vein and sternocleidomastoid. It has cutaneous (superficial), muscular (deep) and communicating branches.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Superficial (cutaneous) branches</p>
                <p className="text-sm text-muted-foreground mt-1">All four emerge together at the midpoint of the posterior border of sternocleidomastoid (<strong>Erb's point</strong>, roughly at the level of the cricoid, C6): <strong>lesser occipital (C2)</strong> — scalp behind the ear; <strong>great auricular (C2,3)</strong> — lower pinna, angle of jaw, parotid skin (blocked for tympanomastoid and awake fibreoptic ear procedures); <strong>transverse cervical (C2,3)</strong> — anterior neck; <strong>supraclavicular (C3,4)</strong> — clavicle and skin to the second rib, explaining shoulder-tip and "cape" referral and the need to supplement an interscalene block for shoulder surgery.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Deep (muscular) branches</p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Phrenic nerve (C3,4,5)</strong> — sole motor supply to the diaphragm; passes over the anterior surface of scalenus anterior. <strong>Ansa cervicalis</strong> (superior root C1 travelling with the hypoglossal nerve, inferior root C2,3) — supplies the infrahyoid strap muscles. Segmental branches to the prevertebral muscles, rectus capitis, longus capitis and colli, scalenes, and via C2–C4 contributions to sternocleidomastoid, trapezius and levator scapulae (proprioceptive, with motor supply from CN XI).</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Blocks</p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Superficial block:</strong> 10 mL of local anaesthetic subcutaneously along the posterior border of sternocleidomastoid at its midpoint (or an ultrasound-guided injection deep to the investing fascia but superficial to the prevertebral fascia). Used for carotid endarterectomy, thyroid surgery, clavicular fracture, superficial neck lesions and tunnelled line insertion. <strong>Intermediate/deep block:</strong> injection at the C2–C4 transverse processes or deep to the prevertebral fascia — better surgical anaesthesia for carotid endarterectomy but a higher complication rate; largely superseded by intermediate ultrasound-guided injection.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Complications of deep block</p>
                <p className="text-sm text-muted-foreground mt-1">Phrenic nerve palsy (near-universal with deep block — avoid bilateral blocks and use with caution in respiratory disease), recurrent laryngeal nerve palsy with hoarseness, Horner's syndrome from cervical sympathetic spread, vertebral artery or carotid puncture and rapid local anaesthetic systemic toxicity or seizure, intrathecal or epidural injection via a dural cuff, and accessory nerve injury. Aspirate frequently, inject incrementally, and monitor for LAST.</p>
              </div>
            </div>
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
              The nasal cavity is divided by the septum. Three turbinates (superior, middle, inferior) increase surface area for warming and humidification. Its main arterial supply comes from the <strong>sphenopalatine artery</strong> (terminal maxillary branch) and the <strong>anterior and posterior ethmoidal arteries</strong> (ophthalmic branches), with contributions from greater palatine and superior labial vessels. Their anterior septal anastomosis forms <strong>Kiesselbach's plexus (Little's area)</strong>, the commonest source of epistaxis; the posterolateral venous plexus near the inferior meatus is <strong>Woodruff's plexus</strong>, associated with posterior epistaxis. Veins broadly accompany the arteries and communicate with facial, pterygoid and ophthalmic veins, providing a potential route for infection to the cavernous sinus <InlineRef topicId="head-neck-anatomy" refLabel="BJA Educ 2005" />.
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
              <strong className="text-foreground">Tracheostomy:</strong> The stoma is placed between rings 2–3 or 3–4 — above this risks subglottic stenosis from cricoid damage, below it risks tracheo-innominate fistula and a tube too deep for the flange. Layers traversed, superficial to deep: skin → subcutaneous fat → platysma → investing (superficial) layer of deep cervical fascia → the midline "linea alba cervicalis" between the strap muscles (sternohyoid and sternothyroid) → pretracheal fascia → thyroid isthmus, which usually overlies rings 2–4 and may need retracting or dividing → pretracheal fat with the inferior thyroid vein plexus → anterior tracheal wall.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Structures at risk</p>
                <p className="text-sm text-muted-foreground mt-1">Anterior jugular veins and the jugular venous arch (extend the neck and stay strictly midline), thyroid isthmus and the inferior thyroid venous plexus (haemorrhage), thyroid ima artery (present in ~10%), high-riding brachiocephalic (innominate) artery — normally crossing the trachea at the level of the sternal notch but sitting higher in children and in the kyphotic elderly, causing catastrophic tracheo-innominate fistula. The recurrent laryngeal nerves lie in the tracheo-oesophageal grooves and are spared by a midline approach; the posterior tracheal wall and oesophagus are at risk from over-deep needle or dilator passage.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Relational anatomy and practical points</p>
                <p className="text-sm text-muted-foreground mt-1">Landmarks in the extended neck from above: thyroid notch → cricothyroid membrane → cricoid (C6) → rings 2–4 → sternal notch. The isthmus lies about 2–3 cm below the cricoid. Position with a shoulder roll and full extension to bring the trachea anterior and increase the working distance from the sternal notch. Pre-procedure ultrasound identifies aberrant vessels, a high brachiocephalic artery, thyroid size and tracheal depth and midline position. Percutaneous dilatational tracheostomy is guided by bronchoscopy to confirm midline puncture below ring 1 and to avoid a paratracheal or posterior-wall track. Obesity, short neck, fixed flexion, previous neck surgery, radiotherapy and coagulopathy favour a surgical approach.</p>
              </div>
            </div>
          </div>

          <div id="neck-fascia" className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">D5. Fascial Layers of the Neck &amp; Deep Neck Spaces</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The deep cervical fascia divides the neck into compartments that both limit and direct the spread of infection, haematoma and air. Understanding these planes explains airway compromise from an expanding haematoma, the mediastinal spread of dental and retropharyngeal infection, and the anatomy of fascial plane blocks and central venous access.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Superficial fascia</p>
                <p className="text-sm text-muted-foreground mt-1">Subcutaneous layer containing <strong>platysma</strong>, cutaneous nerves of the cervical plexus, superficial veins (anterior and external jugular) and lymph nodes. Not part of the deep cervical fascia; the plane of superficial cervical plexus block.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Investing (superficial) layer of deep cervical fascia</p>
                <p className="text-sm text-muted-foreground mt-1">Encircles the neck like a collar from the external occipital protuberance and mandible to the clavicles, sternum and scapular spine. Splits to enclose sternocleidomastoid, trapezius, the submandibular and parotid glands. Its unyielding nature is why a post-thyroidectomy or post-carotid haematoma compresses the airway rather than expanding outwards — a surgical emergency requiring immediate release of the sutures.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Pretracheal (visceral) fascia</p>
                <p className="text-sm text-muted-foreground mt-1">Encloses thyroid, trachea and oesophagus and the strap muscles, continuing with the pericardium and the fibrous pericardium in the superior mediastinum. Infection and air track directly into the anterior mediastinum. Contains the recurrent laryngeal nerves in the tracheo-oesophageal grooves.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Prevertebral fascia</p>
                <p className="text-sm text-muted-foreground mt-1">Covers the prevertebral and scalene muscles and the cervical sympathetic chain, extending from the skull base to T3 and laterally as the axillary sheath around the brachial plexus. Injection deep to it produces deep cervical plexus block with a high incidence of phrenic palsy; injection superficial to it (intermediate block) is safer.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Carotid sheath</p>
                <p className="text-sm text-muted-foreground mt-1">Formed by contributions from all three deep layers; contains the common/internal carotid artery (medial), internal jugular vein (lateral), vagus nerve (posterolateral, between them) and deep cervical lymph nodes. Extends from the skull base to the arch of the aorta and is the route for the spread of infection to the mediastinum.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Retropharyngeal space and the danger space</p>
                <p className="text-sm text-muted-foreground mt-1">The retropharyngeal space lies between the buccopharyngeal (visceral) fascia and the alar fascia, extending to about T4; the <strong>"danger space"</strong> lies between the alar and prevertebral fascia and runs uninterrupted to the diaphragm — hence descending necrotising mediastinitis from Ludwig's angina, dental or retropharyngeal abscess. Airway assessment must anticipate trismus, limited neck extension, distorted anatomy and a friable, bleeding pharynx; awake fibreoptic or inhalational induction with a surgical airway plan is preferred.</p>
              </div>
            </div>
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
      <TopicFaqs faqs={headNeckAnatomyFaqs} />
      </>
      }
    />
  );
};

export default HeadNeckAnatomyTopic;
