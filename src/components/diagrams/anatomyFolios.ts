import type { CorPictumPlate } from "@/components/diagrams/CorPictumFolio";
import { Exam } from "@/data/curriculum";

import airwaySagittal from "@/assets/plates/airway-sagittal.jpg";
import cardiacAnterior from "@/assets/plates/cardiac-anterior.jpg";
import cardiacShortAxis from "@/assets/plates/cardiac-short-axis.jpg";
import cardiacConduction from "@/assets/plates/cardiac-conduction.jpg";
import airwayLaryngoscopic from "@/assets/plates/airway-laryngoscopic.jpg";
import airwayCoronal from "@/assets/plates/airway-coronal.jpg";
import airwayAxial from "@/assets/plates/airway-axial.jpg";
import headneckSuperficial from "@/assets/plates/headneck-superficial.jpg";
import headneckCarotid from "@/assets/plates/headneck-carotid.jpg";
import headneckOrbit from "@/assets/plates/headneck-orbit.jpg";
import headneckOrbitFrontal from "@/assets/plates/headneck-orbit-frontal.jpg";
import neckC6Axial from "@/assets/plates/neck-c6-axial.jpg";
import neuroMidsagittal from "@/assets/plates/neuro-midsagittal.jpg";
import neuroCircleWillis from "@/assets/plates/neuro-circle-willis.jpg";
import skullbaseSuperior from "@/assets/plates/skullbase-superior.jpg";
import skullbaseInferior from "@/assets/plates/skullbase-inferior.jpg";
import spinalPosterior from "@/assets/plates/spinal-posterior.jpg";
import spinalSagittal from "@/assets/plates/spinal-sagittal.jpg";
import spinalCaudal from "@/assets/plates/spinal-caudal.jpg";
import brachialPlexus from "@/assets/plates/brachial-plexus.jpg";
import brachialInterscalene from "@/assets/plates/brachial-interscalene.jpg";
import upperlimbForearm from "@/assets/plates/upperlimb-forearm.jpg";
import upperlimbAxilla from "@/assets/plates/upperlimb-axilla.jpg";
import upperlimbArteries from "@/assets/plates/upperlimb-arteries.jpg";
import upperlimbVeins from "@/assets/plates/upperlimb-veins.jpg";
import upperlimbNerves from "@/assets/plates/upperlimb-nerves.jpg";
import lowerlimbFemoral from "@/assets/plates/lowerlimb-femoral.jpg";
import lowerlimbPopliteal from "@/assets/plates/lowerlimb-popliteal.jpg";
import lowerlimbArteries from "@/assets/plates/lowerlimb-arteries.jpg";
import lowerlimbVeins from "@/assets/plates/lowerlimb-veins.jpg";
import lowerlimbNerves from "@/assets/plates/lowerlimb-nerves.jpg";
import thoracicAnterior from "@/assets/plates/thoracic-anterior.jpg";
import thoracicMediastinum from "@/assets/plates/thoracic-mediastinum.jpg";
import abdominalAnterior from "@/assets/plates/abdominal-anterior.jpg";
import abdominalRetroperitoneum from "@/assets/plates/abdominal-retroperitoneum.jpg";

/** Shared painted Cor Pictum folios — one set per anatomy topic. */
export interface CorPictumFolioData {
  atlasTitle: string;
  atlasSubtitle: string;
  plates: CorPictumPlate[];
}

export const airwayFolio: CorPictumFolioData = {
  atlasTitle: "Atlas of Anatomy — Upper Airway",
  atlasSubtitle: "Painted plates of the upper airway and larynx",
  plates: [
    {
      id: "sagittal", tabLabel: "Sagittal", folio: "I",
      title: "Oropharynx and Larynx", subtitle: "Sagittal view of the airway",
      image: airwaySagittal, alt: "Painted sagittal section of the upper airway",
      caption: "Sagittal section of the upper airway",
      labels: [
        { latin: "lingua", english: "Tongue", note: "Falls posteriorly under sedation — first cause of obstruction." },
        { latin: "palatum molle", english: "Soft palate", note: "Velopharyngeal seal; relaxes in deep anaesthesia." },
        { latin: "uvula", english: "Uvula", note: "Mallampati landmark — visibility predicts intubation difficulty." },
        { latin: "vallecula", english: "Vallecula", note: "Macintosh blade tip target — indirectly lifts the epiglottis." },
        { latin: "epiglottis", english: "Epiglottis", note: "Lifted directly by Miller (straight) blade." },
        { latin: "plica vocalis", english: "Vocal cord", note: "True cords define the glottis — narrowest adult airway point." },
        { latin: "cartilago thyroidea", english: "Thyroid cartilage", note: "Surface landmark for cricothyroid puncture." },
        { latin: "trachea", english: "Trachea", note: "C-shaped cartilage rings, ~10–12 cm long in adults." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Upper airway anatomy — sagittal", anchor: "pre-operative-airway-assessment" },
        { code: "CL_BK_03", exams: [Exam.FINAL], title: "Airway assessment & difficult airway management", anchor: "pre-operative-airway-assessment" },
        { code: "IC_BK_03", exams: [Exam.FFICM], title: "Tracheal intubation in critical care", anchor: "pre-operative-airway-assessment" },
      ],
    },
    {
      id: "laryngoscopic", tabLabel: "Laryngoscopic", folio: "II",
      title: "Laryngeal Inlet", subtitle: "View through the laryngoscope",
      image: airwayLaryngoscopic, alt: "Painted superior view of the laryngeal inlet",
      caption: "Superior view of the laryngeal inlet",
      labels: [
        { latin: "epiglottis", english: "Epiglottis", note: "Anterior boundary of the inlet." },
        { latin: "plica aryepiglottica", english: "Aryepiglottic fold", note: "Lateral wall of the inlet; landmark for SAD seating." },
        { latin: "cartilago arytenoidea", english: "Arytenoid cartilage", note: "Posterior cord attachment; rotation opens/closes the glottis." },
        { latin: "plica vocalis", english: "True vocal cord", note: "Pearl-white; the target structure for tube placement." },
        { latin: "plica vestibularis", english: "False cord", note: "Pink, above the true cords — do not mistake for them." },
        { latin: "recessus piriformis", english: "Piriform recess", note: "Lateral pooling site for secretions and foreign bodies." },
        { latin: "commissura posterior", english: "Posterior commissure", note: "Cormack–Lehane grading reference point." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Laryngeal inlet anatomy & cord identification", anchor: "das-2015-algorithm-four-sequential-plans" },
        { code: "CL_BK_03", exams: [Exam.FINAL], title: "Difficult airway — Cormack–Lehane grading", anchor: "das-2015-algorithm-four-sequential-plans" },
        { code: "IC_BK_03", exams: [Exam.FFICM], title: "ICU airway management & emergency intubation", anchor: "das-2015-algorithm-four-sequential-plans" },
      ],
    },
    {
      id: "coronal", tabLabel: "Coronal", folio: "III",
      title: "Larynx — Coronal Section", subtitle: "The three laryngeal tiers",
      image: airwayCoronal, alt: "Painted coronal section of the larynx showing supraglottis, glottis and subglottis",
      caption: "Coronal section of the larynx — supraglottis, glottis and subglottis",
      labels: [
        { latin: "", english: "Epiglottis", note: "Leaf-shaped fibroelastic cartilage; closes the inlet during swallowing." },
        { latin: "", english: "Hyoid bone", note: "Suspends the larynx; surface landmark for superior laryngeal nerve block." },
        { latin: "", english: "Thyrohyoid membrane", note: "Pierced by internal branch of superior laryngeal nerve — supraglottic sensory supply." },
        { latin: "", english: "Vestibule (supraglottis)", note: "Above false cords; sensory supply from internal branch of superior laryngeal nerve (CN X)." },
        { latin: "", english: "False vocal cord", note: "Vestibular fold; pink mucosa above the ventricle." },
        { latin: "", english: "Ventricle (of Morgagni)", note: "Lateral recess between false and true cords." },
        { latin: "", english: "True vocal cord", note: "Pearl-white; defines the glottis — narrowest adult airway point." },
        { latin: "", english: "Glottis", note: "Cord level; narrowest adult airway. Adult subglottis is widest, paediatric subglottis (cricoid) is narrowest." },
        { latin: "", english: "Subglottis", note: "Below cords to lower border of cricoid; narrowest part in children — fixed-diameter cricoid ring." },
        { latin: "", english: "Thyroid cartilage", note: "Largest laryngeal cartilage; surface landmark for cricothyroid puncture." },
        { latin: "", english: "Cricothyroid membrane", note: "Front-of-neck access (FONA) site — emergency surgical airway." },
        { latin: "", english: "Cricoid cartilage", note: "Only complete ring; site for cricoid pressure (Sellick's manoeuvre) and paediatric airway sizing." },
        { latin: "", english: "First tracheal ring", note: "Below cricoid; level of standard surgical tracheostomy entry between 2nd–3rd rings." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Laryngeal anatomy — coronal tiers", anchor: "pre-operative-airway-assessment" },
        { code: "CL_BK_03", exams: [Exam.FINAL], title: "Front-of-neck access & emergency cricothyroidotomy", anchor: "das-2015-algorithm-four-sequential-plans" },
        { code: "IC_BK_03", exams: [Exam.FFICM], title: "Percutaneous tracheostomy in ICU", anchor: "das-2015-algorithm-four-sequential-plans" },
      ],
    },
    {
      id: "axial", tabLabel: "Axial", folio: "IV",
      title: "Larynx — Axial Section", subtitle: "Vocal cord level, superior view",
      image: airwayAxial, alt: "Painted axial section of the larynx at the vocal cord level",
      caption: "Axial section of the larynx at the level of the true vocal cords",
      labels: [
        { latin: "", english: "Thyroid cartilage", note: "Anterior wing-shape; angle is more acute in males (Adam's apple)." },
        { latin: "", english: "Anterior commissure", note: "Where true cords meet anteriorly on the thyroid cartilage." },
        { latin: "", english: "True vocal cord", note: "Stretched between vocal process and anterior commissure; vibration produces voice." },
        { latin: "", english: "Vocal process", note: "Anterior projection of arytenoid where the vocal ligament attaches." },
        { latin: "", english: "Arytenoid cartilage", note: "Pyramidal; sits on the cricoid; rotation opens/closes the glottis." },
        { latin: "", english: "Posterior commissure", note: "Mucosa between arytenoids; reference point for Cormack–Lehane grading." },
        { latin: "", english: "Glottis (rima glottidis)", note: "Triangular opening between cords — narrowest adult airway." },
        { latin: "", english: "Thyroarytenoid muscle (vocalis)", note: "Tenses and shortens cord; fine-tunes pitch." },
        { latin: "", english: "Lateral cricoarytenoid muscle", note: "Adducts cords (closes glottis); recurrent laryngeal nerve (CN X)." },
        { latin: "", english: "Posterior cricoarytenoid muscle (sole abductor)", note: "Only abductor — paralysis closes the cord; bilateral RLN palsy = stridor." },
        { latin: "", english: "Transverse arytenoid muscle", note: "Adducts arytenoids; closes posterior commissure during swallowing/phonation." },
        { latin: "", english: "Cricoarytenoid joint", note: "Synovial joint allowing arytenoid rotation and gliding." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Intrinsic laryngeal muscles & cord movement", anchor: "pre-operative-airway-assessment" },
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Recurrent laryngeal nerve — supply & lesions", anchor: "pre-operative-airway-assessment" },
        { code: "CL_BK_03", exams: [Exam.FINAL], title: "Vocal cord paralysis & post-thyroidectomy stridor", anchor: "das-2015-algorithm-four-sequential-plans" },
      ],
    },
  ],
};

export const headNeckFolio: CorPictumFolioData = {
  atlasTitle: "Atlas of Anatomy — Head and Neck",
  atlasSubtitle: "Painted plates of the head and neck",
  plates: [
    {
      id: "superficial", tabLabel: "Superficial", folio: "I",
      title: "Parotid and Cervical Region", subtitle: "Superficial dissection",
      image: headneckSuperficial, alt: "Painted superficial dissection of the head and neck",
      caption: "Superficial dissection of the parotid and cervical region",
      labels: [
        { latin: "glandula parotidea", english: "Parotid gland", note: "Facial nerve traverses it — surgically perilous." },
        { latin: "nervus facialis", english: "Facial nerve (CN VII)", note: "Five terminal branches: temporal, zygomatic, buccal, marginal mandibular, cervical." },
        { latin: "nervus auricularis magnus", english: "Great auricular nerve", note: "C2–C3; sensation to lower ear and angle of jaw." },
        { latin: "vena jugularis externa", english: "External jugular vein", note: "Surface vein — useful emergency access." },
        { latin: "musculus sternocleidomastoideus", english: "Sternocleidomastoid", note: "Divides anterior from posterior cervical triangle." },
        { latin: "trigonum cervicale anterius", english: "Anterior triangle", note: "Contains carotid sheath, larynx, thyroid." },
        { latin: "trigonum cervicale posterius", english: "Posterior triangle", note: "Contains accessory nerve, brachial plexus roots." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Surface anatomy of the head & neck", anchor: "neck-triangles" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Superficial cervical plexus block", anchor: "neck-triangles" },
      ],
    },
    {
      id: "carotid", tabLabel: "Carotid sheath", folio: "II",
      title: "Carotid Sheath", subtitle: "Deep dissection of the carotid sheath",
      image: headneckCarotid, alt: "Painted deep dissection of the carotid sheath",
      caption: "Deep dissection of the carotid sheath",
      labels: [
        { latin: "arteria carotis communis", english: "Common carotid artery", note: "Bifurcates at C4 (upper border of thyroid cartilage)." },
        { latin: "arteria carotis interna", english: "Internal carotid", note: "No branches in the neck — supplies brain via Circle of Willis." },
        { latin: "arteria carotis externa", english: "External carotid", note: "Eight branches supplying face, scalp, neck." },
        { latin: "vena jugularis interna", english: "Internal jugular vein", note: "Standard central venous access; lateral to the carotid." },
        { latin: "nervus vagus", english: "Vagus nerve (CN X)", note: "Within the carotid sheath, between artery and vein." },
        { latin: "nervus hypoglossus", english: "Hypoglossal nerve (CN XII)", note: "Crosses the bifurcation superficially." },
        { latin: "sinus caroticus", english: "Carotid sinus", note: "Baroreceptor — bradycardia with manipulation." },
        { latin: "glomus caroticum", english: "Carotid body", note: "Peripheral chemoreceptor — senses PaO₂, PaCO₂, pH." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Carotid sheath & deep cervical anatomy", anchor: "ijv" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Cervical plexus & superficial cervical block", anchor: "ijv" },
        { code: "CR_BK_07", exams: [Exam.FINAL], title: "Anaesthesia for carotid endarterectomy", anchor: "ijv" },
      ],
    },
    {
      id: "orbit", tabLabel: "Orbit", folio: "III",
      title: "The Orbit", subtitle: "Extraocular muscles and orbital contents",
      image: headneckOrbit, alt: "Painted lateral cutaway view of the orbit showing extraocular muscles and the optic nerve",
      caption: "Lateral cutaway of the orbit — extraocular muscles, optic nerve and orbital contents",
      labels: [
        { latin: "", english: "Globe (eyeball)", note: "Axial length ~24 mm; risk of perforation with peribulbar/sub-Tenon's needles in long eyes." },
        { latin: "", english: "Cornea", note: "Densely innervated by V1 — corneal reflex tests CN V/VII arc." },
        { latin: "", english: "Sclera", note: "Tough outer coat; pierced by sub-Tenon's cannula in the inferonasal quadrant." },
        { latin: "", english: "Optic nerve (CN II)", note: "Surrounded by dura and CSF — direct injury causes blindness; sub-arachnoid LA spread possible with retrobulbar block." },
        { latin: "", english: "Optic canal", note: "Transmits CN II and ophthalmic artery into the cranial cavity." },
        { latin: "", english: "Superior rectus", note: "Elevation; supplied by CN III (superior division)." },
        { latin: "", english: "Inferior rectus", note: "Depression; CN III. Trapped in orbital floor (blowout) fractures → restricted upgaze." },
        { latin: "", english: "Lateral rectus", note: "Abduction; supplied by CN VI (abducens) — long intracranial course, vulnerable in raised ICP." },
        { latin: "", english: "Medial rectus", note: "Adduction; CN III." },
        { latin: "", english: "Superior oblique", note: "Intorsion and depression in adduction; supplied by CN IV (trochlear)." },
        { latin: "", english: "Trochlea", note: "Cartilaginous pulley on the frontal bone redirecting superior oblique tendon." },
        { latin: "", english: "Inferior oblique", note: "Extorsion and elevation in adduction; CN III." },
        { latin: "", english: "Levator palpebrae superioris", note: "Lifts upper eyelid; CN III. Ptosis with III palsy or Horner's (sympathetic to Müller's)." },
        { latin: "", english: "Ciliary ganglion", note: "Parasympathetic relay for pupillary constriction (CN III) and accommodation." },
        { latin: "", english: "Ophthalmic artery", note: "First branch of internal carotid; supplies retina via central retinal artery." },
        { latin: "", english: "Annulus of Zinn", note: "Common tendinous ring — origin of the four recti; CN II, III, VI and nasociliary pass through it." },
        { latin: "", english: "Orbital fat", note: "Cushions globe; relevant volume for retro-/peribulbar block spread." },
        { latin: "", english: "Periorbita", note: "Periosteum lining the bony orbit; cleavage plane for sub-periosteal collections." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Orbital anatomy — extraocular muscles & cranial nerves", anchor: "ophthalmic-anatomy" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Ophthalmic regional blocks — peribulbar & sub-Tenon's", anchor: "ophthalmic-anatomy" },
        { code: "OP_BK_01", exams: [Exam.FINAL], title: "Anaesthesia for ophthalmic surgery", anchor: "ophthalmic-anatomy" },
      ],
    },
    {
      id: "orbit-frontal", tabLabel: "Bony orbit", folio: "IV",
      title: "Bony Orbit — Frontal View", subtitle: "Bones, foramina and fissures of the right orbit",
      image: headneckOrbitFrontal, alt: "Painted frontal view of the bony orbit showing the seven contributing bones and orbital foramina",
      caption: "Anterior view of the bony orbit — seven bones, three openings at the apex",
      labels: [
        { latin: "", english: "Frontal bone", note: "Forms the orbital roof; supraorbital nerve (V1) emerges through the notch/foramen on its rim." },
        { latin: "", english: "Supraorbital notch", note: "Surface landmark for supraorbital nerve block (V1) — supraorbital nerve and vessels exit here." },
        { latin: "", english: "Orbital plate of frontal bone", note: "Thin roof separating the orbit from the anterior cranial fossa — risk of CSF leak in roof fractures." },
        { latin: "", english: "Zygomatic bone", note: "Forms the lateral wall and inferolateral rim — strongest part of the orbital margin." },
        { latin: "", english: "Maxilla", note: "Forms most of the orbital floor; thin floor fractures into the maxillary sinus (blowout fracture → entrapped inferior rectus, V2 numbness)." },
        { latin: "", english: "Infraorbital foramen", note: "Infraorbital nerve (V2) exits ~1 cm below the orbital rim — landmark for infraorbital nerve block." },
        { latin: "", english: "Lacrimal bone", note: "Smallest, most fragile bone of the face; medial wall." },
        { latin: "", english: "Lacrimal fossa", note: "Houses the lacrimal sac, which drains into the nasolacrimal duct." },
        { latin: "", english: "Ethmoid bone (lamina papyracea)", note: "Paper-thin medial wall — fractures readily; route for orbital cellulitis from ethmoid sinusitis." },
        { latin: "", english: "Sphenoid (lesser wing)", note: "Forms the optic canal and the upper border of the superior orbital fissure." },
        { latin: "", english: "Sphenoid (greater wing)", note: "Forms the posterior lateral wall and the lower border of the superior orbital fissure." },
        { latin: "", english: "Palatine bone", note: "Tiny orbital process contributes to the posterior floor." },
        { latin: "", english: "Optic canal", note: "Within the lesser wing of sphenoid; transmits CN II and the ophthalmic artery." },
        { latin: "", english: "Superior orbital fissure", note: "Between greater and lesser wings of sphenoid; transmits CN III, IV, V1 (frontal, lacrimal, nasociliary), VI and superior ophthalmic vein." },
        { latin: "", english: "Inferior orbital fissure", note: "Between greater wing of sphenoid and maxilla; transmits V2, infraorbital vessels and inferior ophthalmic vein." },
        { latin: "", english: "Zygomaticofacial foramen", note: "Zygomaticofacial nerve (V2) — sensation to skin over the cheek prominence." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Bony orbit — bones, foramina & fissures", anchor: "ophthalmic-anatomy" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Trigeminal branch blocks (supraorbital & infraorbital)", anchor: "ophthalmic-anatomy" },
        { code: "OP_BK_01", exams: [Exam.FINAL], title: "Orbital fractures & ophthalmic surgical anatomy", anchor: "ophthalmic-anatomy" },
      ],
    },
    {
      id: "neck-c6-axial", tabLabel: "Neck axial (C6)", folio: "V",
      title: "Axial Section — C6 (Cricoid Level)", subtitle: "Transverse cross-section of the neck at the cricoid",
      image: neckC6Axial, alt: "Painted axial cross-section of the neck at the level of the C6 vertebra (cricoid)",
      caption: "Axial section at C6 — the anaesthetist's reference plane for central venous access, stellate ganglion block and tracheal landmarks",
      labels: [
        { latin: "", english: "Cricoid cartilage", note: "Only complete cartilaginous ring; landmark for cricoid pressure (Sellick) and front-of-neck access." },
        { latin: "", english: "Trachea", note: "Begins at cricoid (C6); C-shaped rings anteriorly, membranous trachealis posteriorly." },
        { latin: "", english: "Oesophagus", note: "Posterior to trachea, deviated slightly left at C6 — collapsed in the cadaver, distensible in life." },
        { latin: "", english: "Thyroid gland", note: "Two lobes wrap antero-laterally around trachea; isthmus crosses rings 2–4 (encountered in tracheostomy)." },
        { latin: "", english: "Recurrent laryngeal nerve", note: "Lies in the tracheo-oesophageal groove — vulnerable in thyroid surgery; bilateral palsy → stridor." },
        { latin: "", english: "Common carotid artery", note: "Bifurcates higher (C4); pulsation lateral to cricoid is the landmark for posterior IJV approach." },
        { latin: "", english: "Internal jugular vein", note: "Lateral and slightly anterior to carotid within the carotid sheath — target for central venous access." },
        { latin: "", english: "Vagus nerve (CN X)", note: "Posterior to and between IJV and carotid within the sheath — at risk during deep cervical block." },
        { latin: "", english: "Carotid sheath", note: "Investing fascia enclosing carotid, IJV and vagus; defines the safe US-guided needling plane for IJV CVC." },
        { latin: "", english: "Sternocleidomastoid", note: "Two heads (sternal, clavicular) — apex of triangle is the surface landmark for landmark IJV cannulation." },
        { latin: "", english: "Strap muscles (sternohyoid/sternothyroid/omohyoid)", note: "Anterior to thyroid; retracted during tracheostomy and thyroid surgery." },
        { latin: "", english: "Anterior scalene", note: "Phrenic nerve descends on its anterior surface; brachial plexus emerges between anterior and middle scalene." },
        { latin: "", english: "Middle and posterior scalene", note: "Form the lateral wall of the interscalene groove — target for interscalene brachial plexus block." },
        { latin: "", english: "Phrenic nerve (C3,4,5)", note: "On anterior surface of anterior scalene — paralysed in ~100% of interscalene blocks; avoid bilateral block." },
        { latin: "", english: "Brachial plexus trunks", note: "Between anterior and middle scalene — superior, middle, inferior trunks visible at C5/6/7 level." },
        { latin: "", english: "Vertebral artery", note: "Ascends through the transverse foramen of C6 (and above); inadvertent injection during stellate block → seizure." },
        { latin: "", english: "Chassaignac's tubercle (anterior tubercle of C6)", note: "Most prominent anterior cervical tubercle — bony landmark for stellate ganglion block (anterior paratracheal approach)." },
        { latin: "", english: "C6 vertebral body", note: "Cricoid lies anterior to the C6 body — the surface-to-skeletal correlation that defines this section." },
        { latin: "", english: "Spinal cord", note: "Cervical enlargement at C5–T1; injury here → tetraplegia, diaphragmatic sparing depends on lesion above C3." },
        { latin: "", english: "Prevertebral muscles (longus colli/capitis)", note: "Lie on the anterior vertebral body — covered by prevertebral fascia; plane for retropharyngeal abscess spread." },
        { latin: "", english: "Investing layer of deep cervical fascia", note: "Encircles the neck deep to platysma; splits to enclose SCM and trapezius." },
        { latin: "", english: "Pretracheal fascia", note: "Encloses thyroid, trachea, oesophagus; continuous inferiorly with the fibrous pericardium." },
        { latin: "", english: "Prevertebral fascia", note: "Covers prevertebral muscles and scalenes; extends laterally as the axillary sheath around the brachial plexus." },
        { latin: "", english: "Trapezius", note: "Posterolateral; forms the posterior border of the posterior triangle. Accessory nerve (CN XI) runs on its deep surface." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Cross-sectional anatomy of the neck at C6", anchor: "neck-cross-section" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Central venous access & cervical regional anatomy", anchor: "ijv" },
        { code: "RU_BK_02", exams: [Exam.FINAL], title: "Stellate ganglion block — anterior paratracheal approach", anchor: "neck-cross-section" },
      ],
    },
  ],
};

export const neuroFolio: CorPictumFolioData = {
  atlasTitle: "Atlas of Anatomy — Brain",
  atlasSubtitle: "Painted plates of the brain and its arteries",
  plates: [
    {
      id: "midsagittal", tabLabel: "Midsagittal", folio: "I",
      title: "Midsagittal Section of the Brain", subtitle: "Midline section of the brain",
      image: neuroMidsagittal, alt: "Painted midsagittal section of the brain",
      caption: "Midsagittal section of the brain",
      labels: [
        { latin: "corpus callosum", english: "Corpus callosum", note: "Largest commissure; interhemispheric communication." },
        { latin: "fornix", english: "Fornix", note: "Output tract of the hippocampus to the mamillary bodies." },
        { latin: "thalamus", english: "Thalamus", note: "Sensory and motor relay; gateway to cortex." },
        { latin: "hypothalamus", english: "Hypothalamus", note: "Autonomic, endocrine and thermoregulatory control." },
        { latin: "ventriculus tertius", english: "Third ventricle", note: "Midline CSF cavity between the thalami." },
        { latin: "pons", english: "Pons", note: "Houses CN V–VIII nuclei and respiratory pneumotaxic centre." },
        { latin: "medulla oblongata", english: "Medulla", note: "Cardiorespiratory centres; CN IX–XII." },
        { latin: "cerebellum", english: "Cerebellum", note: "Coordination, balance; arbor vitae of white matter." },
        { latin: "hypophysis", english: "Pituitary gland", note: "In the sella turcica — endocrine master gland." },
      ],
      curriculumLinks: [
        { code: "AN_BK_07", exams: [Exam.PRIMARY], title: "Brain anatomy & ventricular system", anchor: "intracranial-pressure-meninges" },
        { code: "CN_BK_03", exams: [Exam.FINAL], title: "Neuroanaesthesia — ICP, CPP & supratentorial surgery", anchor: "intracranial-pressure-meninges" },
      ],
    },
    {
      id: "willis", tabLabel: "Circle of Willis", folio: "II",
      title: "Circle of Willis", subtitle: "Arterial circle at the base of the brain",
      image: neuroCircleWillis, alt: "Painted inferior view of the Circle of Willis",
      caption: "Cerebral arterial circle — inferior view",
      labels: [
        { latin: "arteria cerebri anterior", english: "Anterior cerebral artery", note: "Medial frontal and parietal lobes; leg homunculus." },
        { latin: "arteria communicans anterior", english: "Anterior communicating artery", note: "Common aneurysm site — bitemporal field defects, SAH." },
        { latin: "arteria carotis interna", english: "Internal carotid", note: "Anterior circulation supply to the Circle." },
        { latin: "arteria cerebri media", english: "Middle cerebral artery", note: "Most commonly occluded — face/arm hemiparesis, aphasia." },
        { latin: "arteria communicans posterior", english: "Posterior communicating artery", note: "Connects anterior to posterior circulation; CN III palsy with aneurysm." },
        { latin: "arteria cerebri posterior", english: "Posterior cerebral artery", note: "Occipital lobe — homonymous hemianopia." },
        { latin: "arteria basilaris", english: "Basilar artery", note: "Formed by the two vertebrals; supplies brainstem and cerebellum." },
        { latin: "arteria vertebralis", english: "Vertebral artery", note: "Through transverse foramina C6–C1; into the foramen magnum." },
        { latin: "chiasma opticum", english: "Optic chiasm", note: "Anatomical anchor; nasal fibres decussate here." },
        { latin: "corpora mamillaria", english: "Mamillary bodies", note: "Hypothalamic landmark; affected in Wernicke's encephalopathy." },
      ],
      curriculumLinks: [
        { code: "AN_BK_07", exams: [Exam.PRIMARY], title: "Cerebral arterial supply — circle of Willis", anchor: "cerebral-blood-supply-circle-of-willis" },
        { code: "CN_BK_03", exams: [Exam.FINAL], title: "Anaesthesia for neurovascular procedures", anchor: "cerebral-blood-supply-circle-of-willis" },
      ],
    },
    {
      id: "skullbase-superior", tabLabel: "Skull base (above)", folio: "III",
      title: "Skull Base from Above", subtitle: "Internal cranial fossae and foramina",
      image: skullbaseSuperior, alt: "Painted superior view of the skull base showing the three cranial fossae",
      caption: "Internal view of the skull base — anterior, middle and posterior fossae",
      labels: [
        { latin: "", english: "Crista galli", note: "Midline anchor for the falx cerebri." },
        { latin: "", english: "Cribriform plate", note: "Olfactory nerve (CN I) fibres; risk of CSF leak in basal skull fracture — avoid nasal tubes." },
        { latin: "", english: "Lesser wing of sphenoid", note: "Forms posterior border of the anterior cranial fossa." },
        { latin: "", english: "Greater wing of sphenoid", note: "Floor of the middle cranial fossa." },
        { latin: "", english: "Optic canal", note: "Optic nerve (CN II) and ophthalmic artery." },
        { latin: "", english: "Superior orbital fissure", note: "CN III, IV, V1, VI and superior ophthalmic vein." },
        { latin: "", english: "Foramen rotundum", note: "Maxillary nerve (V2)." },
        { latin: "", english: "Foramen ovale", note: "Mandibular nerve (V3) — landmark for trigeminal blocks." },
        { latin: "", english: "Foramen spinosum", note: "Middle meningeal artery — source of extradural haematoma." },
        { latin: "", english: "Sella turcica (pituitary fossa)", note: "Houses the pituitary gland; trans-sphenoidal surgical route." },
        { latin: "", english: "Internal acoustic meatus", note: "CN VII (facial) and CN VIII (vestibulocochlear)." },
        { latin: "", english: "Jugular foramen", note: "CN IX, X, XI and the internal jugular vein." },
        { latin: "", english: "Hypoglossal canal", note: "CN XII — tongue motor supply." },
        { latin: "", english: "Foramen magnum", note: "Brainstem/spinal cord junction; vertebral arteries; CN XI roots." },
        { latin: "", english: "Petrous temporal bone", note: "Houses the inner ear and the carotid canal." },
      ],
      curriculumLinks: [
        { code: "AN_BK_07", exams: [Exam.PRIMARY], title: "Skull base — internal foramina & cranial nerve passages", anchor: "skull-base-foramina" },
        { code: "AN_BK_07", exams: [Exam.FINAL], title: "Cranial nerve injury patterns at the skull base", anchor: "skull-base-foramina" },
      ],
    },
    {
      id: "skullbase-inferior", tabLabel: "Skull base (below)", folio: "IV",
      title: "Skull Base from Below", subtitle: "External view of the cranial base",
      image: skullbaseInferior, alt: "Painted inferior view of the external skull base",
      caption: "External view of the skull base — palate, foramina and occipital condyles",
      labels: [
        { latin: "", english: "Hard palate", note: "Roof of the mouth; landmark for nasal airway depth." },
        { latin: "", english: "Vomer", note: "Posterior nasal septum — guides nasal tube placement." },
        { latin: "", english: "Greater palatine foramen", note: "Greater palatine nerve — site of palatal block in dental anaesthesia." },
        { latin: "", english: "Pterygoid plates", note: "Attachment for pterygoid muscles; landmark for maxillary nerve block." },
        { latin: "", english: "Foramen ovale", note: "V3 exits here — surface target for trigeminal procedures." },
        { latin: "", english: "Foramen spinosum", note: "Middle meningeal artery enters the cranial cavity." },
        { latin: "", english: "Carotid canal", note: "Internal carotid enters the skull — petrous temporal bone." },
        { latin: "", english: "Jugular foramen", note: "Internal jugular vein exits with CN IX, X, XI." },
        { latin: "", english: "Stylomastoid foramen", note: "Facial nerve (CN VII) exits — vulnerable in mastoid surgery." },
        { latin: "", english: "Styloid process", note: "Attachment for stylohyoid, styloglossus, stylopharyngeus." },
        { latin: "", english: "Mastoid process", note: "Sternocleidomastoid attachment; surface landmark for the IJV." },
        { latin: "", english: "Occipital condyle", note: "Articulates with C1 (atlas) — atlanto-occipital joint." },
        { latin: "", english: "Foramen magnum", note: "Brainstem and vertebral arteries pass through; coning risk in raised ICP." },
        { latin: "", english: "Hypoglossal canal", note: "CN XII to the tongue." },
        { latin: "", english: "External occipital protuberance", note: "Inion — surface landmark for posterior fossa surgery and head positioning." },
      ],
      curriculumLinks: [
        { code: "AN_BK_07", exams: [Exam.PRIMARY], title: "External skull base — surface foramina", anchor: "skull-base-foramina" },
        { code: "AN_BK_03", exams: [Exam.FINAL], title: "Surface anatomy for trigeminal & cervical blocks", anchor: "skull-base-foramina" },
      ],
    },
  ],
};

export const spinalFolio: CorPictumFolioData = {
  atlasTitle: "Atlas of Anatomy — Vertebral Column",
  atlasSubtitle: "Painted plates of the spinal cord and neuraxial spaces",
  plates: [
    {
      id: "posterior", tabLabel: "Posterior", folio: "I",
      title: "Spinal Cord", subtitle: "Posterior view of the cord and cauda equina",
      image: spinalPosterior, alt: "Painted posterior view of the lumbar spinal cord",
      caption: "Posterior view of the spinal cord and cauda equina",
      labels: [
        { latin: "lamina vertebrae", english: "Vertebral lamina", note: "Removed in laminectomy to access the cord." },
        { latin: "processus spinosus", english: "Spinous process", note: "Surface midline landmark for neuraxial blocks." },
        { latin: "ligamentum flavum", english: "Ligamentum flavum", note: "Final resistance felt before epidural loss-of-resistance." },
        { latin: "dura mater spinalis", english: "Spinal dura mater", note: "Outer meningeal layer — separates epidural from subarachnoid." },
        { latin: "conus medullaris", english: "Conus medullaris", note: "Cord ends at L1/L2 in adults — block below to avoid injury." },
        { latin: "cauda equina", english: "Cauda equina", note: "Lumbosacral nerve roots floating in CSF below the conus." },
        { latin: "filum terminale", english: "Filum terminale", note: "Pial extension anchoring cord to coccyx." },
        { latin: "radix nervi spinalis", english: "Spinal nerve root", note: "Exits through the intervertebral foramen." },
      ],
      curriculumLinks: [
        { code: "AN_BK_07", exams: [Exam.PRIMARY], title: "Spinal cord & cauda equina — surface landmarks", anchor: "spinal-cord" },
        { code: "RU_BK_02", exams: [Exam.FINAL], title: "Surface anatomy for neuraxial procedures", anchor: "spinal-cord" },
      ],
    },
    {
      id: "sagittal", tabLabel: "Sagittal", folio: "II",
      title: "Epidural and Subarachnoid Spaces", subtitle: "Sagittal view for neuraxial anaesthesia",
      image: spinalSagittal, alt: "Painted midsagittal section of the lumbar spine showing neuraxial spaces",
      caption: "Sagittal section of the lumbar spine — neuraxial access",
      labels: [
        { latin: "corpus vertebrae", english: "Vertebral body", note: "Anterior weight-bearing column." },
        { latin: "discus intervertebralis", english: "Intervertebral disc", note: "Annulus fibrosus + nucleus pulposus." },
        { latin: "processus spinosus", english: "Spinous process", note: "Palpable midline landmark for needle entry." },
        { latin: "ligamentum flavum", english: "Ligamentum flavum", note: "Yellow elastic ligament; loss-of-resistance endpoint." },
        { latin: "spatium epidurale", english: "Epidural space", note: "Contains fat, venous plexus and segmental nerves." },
        { latin: "dura mater", english: "Dura mater", note: "Penetration risks post-dural-puncture headache." },
        { latin: "spatium subarachnoideum", english: "Subarachnoid space", note: "Contains CSF and the cauda equina; target for spinal anaesthesia." },
        { latin: "cauda equina", english: "Cauda equina", note: "Free-floating roots — needle deflects rather than transfixes." },
        { latin: "conus medullaris", english: "Conus medullaris", note: "Avoid puncture above L2." },
      ],
      curriculumLinks: [
        { code: "AN_BK_07", exams: [Exam.PRIMARY], title: "Vertebral column & neuraxial spaces", anchor: "neuraxial-layers" },
        { code: "RU_BK_02", exams: [Exam.FINAL], title: "Spinal & epidural anaesthesia — technique & complications", anchor: "neuraxial-layers" },
        { code: "OB_BK_01", exams: [Exam.FINAL], title: "Neuraxial anaesthesia in obstetrics", anchor: "neuraxial-layers" },
      ],
    },
    {
      id: "caudal", tabLabel: "Caudal block", folio: "III",
      title: "Caudal Block Landmarks", subtitle: "Sacral hiatus and the equilateral triangle",
      image: spinalCaudal, alt: "Painted posterior view of the sacrum showing landmarks for caudal epidural block",
      caption: "Surface and bony landmarks for caudal epidural block",
      labels: [
        { latin: "", english: "Posterior superior iliac spine", note: "Forms the two upper points of an equilateral triangle with the sacral hiatus." },
        { latin: "", english: "Equilateral triangle", note: "PSIS bilaterally + sacral hiatus = equilateral triangle; useful when cornua are impalpable." },
        { latin: "", english: "Sacral cornu", note: "Paired bony prominences flanking the sacral hiatus — the primary palpation landmark." },
        { latin: "", english: "Sacral hiatus", note: "Defect from failed fusion of S5 laminae; entry point into the sacral canal." },
        { latin: "", english: "Sacrococcygeal membrane", note: "Continuation of ligamentum flavum across the hiatus — distinct 'pop' as needle pierces it." },
        { latin: "", english: "Coccyx", note: "Inferior landmark; needle is directed cephalad away from the coccyx." },
        { latin: "", english: "Sacral canal", note: "Continuation of the epidural space; volume ~30–35 ml in adults; contains fat, venous plexus, sacral nerve roots." },
        { latin: "", english: "Dural sac (ends at S2)", note: "Adult dural sac terminates at S2 — needle advanced too far risks dural puncture and total spinal." },
        { latin: "", english: "Cauda equina", note: "Sacral roots within the canal — anaesthetised by caudal LA spread." },
        { latin: "", english: "Needle", note: "Insert at 45° to skin through the membrane, then drop the hub to ~15° (parallel to skin) before advancing 1–2 cm into the canal." },
        { latin: "", english: "Skin", note: "Aseptic prep; lateral or prone position; common paediatric technique for sub-umbilical surgery." },
      ],
      curriculumLinks: [
        { code: "AN_BK_07", exams: [Exam.PRIMARY], title: "Sacrum & sacral canal anatomy", anchor: "neuraxial-layers" },
        { code: "RU_BK_02", exams: [Exam.FINAL], title: "Caudal epidural block — landmarks & technique", anchor: "neuraxial-layers" },
        { code: "PA_BK_03", exams: [Exam.FINAL], title: "Paediatric regional anaesthesia — caudal block", anchor: "neuraxial-layers" },
      ],
    },
  ],
};

export const brachialFolio: CorPictumFolioData = {
  atlasTitle: "Atlas of Anatomy — Brachial Plexus",
  atlasSubtitle: "Painted plates of the brachial plexus",
  plates: [
    {
      id: "plexus", tabLabel: "Whole plexus", folio: "I",
      title: "Brachial Plexus", subtitle: "Roots, trunks, divisions, cords, branches",
      image: brachialPlexus, alt: "Painted view of the brachial plexus",
      caption: "Brachial plexus — supraclavicular and infraclavicular regions",
      labels: [
        { latin: "truncus superior", english: "Superior trunk (C5–C6)", note: "Target of interscalene block; spares C8/T1." },
        { latin: "truncus medius", english: "Middle trunk (C7)", note: "Continues as posterior division contribution." },
        { latin: "truncus inferior", english: "Inferior trunk (C8–T1)", note: "Often missed in interscalene → ulnar sparing." },
        { latin: "fasciculus lateralis", english: "Lateral cord", note: "Gives musculocutaneous and lateral root of median." },
        { latin: "fasciculus medialis", english: "Medial cord", note: "Gives ulnar and medial root of median." },
        { latin: "fasciculus posterior", english: "Posterior cord", note: "Gives axillary and radial nerves." },
        { latin: "nervus musculocutaneus", english: "Musculocutaneous nerve", note: "Pierces coracobrachialis; supplies elbow flexors." },
        { latin: "nervus axillaris", english: "Axillary nerve", note: "Quadrangular space; deltoid and regimental badge area." },
        { latin: "nervus radialis", english: "Radial nerve", note: "Spiral groove — wrist drop with humeral fracture." },
        { latin: "nervus medianus", english: "Median nerve", note: "Forearm flexors; carpal tunnel." },
        { latin: "nervus ulnaris", english: "Ulnar nerve", note: "Cubital tunnel; intrinsic hand muscles." },
        { latin: "arteria subclavia", english: "Subclavian artery", note: "Anterior to inferior trunk — pneumothorax / vascular puncture risk." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Brachial plexus — roots, trunks, divisions, cords, branches", anchor: "organisation" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Choosing the level of brachial plexus block", anchor: "organisation" },
      ],
    },
    {
      id: "interscalene", tabLabel: "Interscalene", folio: "II",
      title: "Interscalene Groove", subtitle: "Cross-section at C6 for interscalene block",
      image: brachialInterscalene, alt: "Painted cross-section of the interscalene groove at C6",
      caption: "Cross-section of the neck at C6 — interscalene groove",
      labels: [
        { latin: "musculus scalenus anterior", english: "Anterior scalene", note: "Anterior border of the groove; phrenic nerve on its surface." },
        { latin: "musculus scalenus medius", english: "Middle scalene", note: "Posterior border of the groove." },
        { latin: "plexus brachialis (trunci)", english: "Brachial plexus trunks", note: "Lie between the scalenes — block target." },
        { latin: "arteria subclavia", english: "Subclavian artery", note: "Anterior to inferior trunk." },
        { latin: "nervus phrenicus", english: "Phrenic nerve", note: "100% hemidiaphragmatic palsy with interscalene block." },
        { latin: "musculus sternocleidomastoideus", english: "Sternocleidomastoid", note: "Surface landmark; needle enters posterior to its lateral border." },
        { latin: "trachea", english: "Trachea", note: "Midline landmark." },
        { latin: "oesophagus", english: "Oesophagus", note: "Posterior to the trachea, slightly left." },
        { latin: "arteria vertebralis", english: "Vertebral artery", note: "In the transverse foramen — catastrophic if injected." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Interscalene groove & C5–C7 root anatomy", anchor: "approaches" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Interscalene block — indications, complications", anchor: "approaches" },
      ],
    },
  ],
};

export const upperLimbFolio: CorPictumFolioData = {
  atlasTitle: "Atlas of Anatomy — Upper Limb",
  atlasSubtitle: "Painted plates of the upper limb",
  plates: [
    {
      id: "axilla", tabLabel: "Axilla", folio: "I",
      title: "Axillary Region", subtitle: "Cords of the plexus around the axillary artery",
      image: upperlimbAxilla, alt: "Painted view of the axilla and proximal upper arm",
      caption: "Dissection of the axilla and proximal arm",
      labels: [
        {
          latin: "musculus pectoralis major (reflexus)", english: "Pectoralis major (reflected)",
          note: "Reflected superolaterally to expose the axillary contents.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Inferior border forms the anterior axillary fold; clavipectoral fascia lies deep to it.",
          polygon: [[0.18, 0.06], [0.62, 0.06], [0.55, 0.20], [0.20, 0.22]],
        },
        {
          latin: "arteria axillaris", english: "Axillary artery",
          note: "Three parts defined by pectoralis minor; landmark for axillary block.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Cords of the plexus are named by their relation to the second part of the artery.",
          polygon: [[0.45, 0.22], [0.55, 0.22], [0.56, 0.46], [0.46, 0.46]],
        },
        {
          latin: "vena axillaris", english: "Axillary vein",
          note: "Continuation of basilic + brachial veins; CVC target.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Lies medial and superficial to the artery — first structure encountered in infraclavicular CVC.",
          polygon: [[0.40, 0.24], [0.48, 0.24], [0.49, 0.50], [0.41, 0.50]],
        },
        {
          latin: "fasciculus lateralis", english: "Lateral cord",
          note: "Lateral to the second part of axillary artery.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Gives musculocutaneous nerve and the lateral root of the median nerve.",
          polygon: [[0.50, 0.38], [0.62, 0.36], [0.64, 0.46], [0.52, 0.48]],
        },
        {
          latin: "fasciculus medialis", english: "Medial cord",
          note: "Medial to the axillary artery.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Gives ulnar nerve and the medial root of the median nerve; medial pectoral, medial cutaneous nerves.",
          polygon: [[0.34, 0.42], [0.46, 0.40], [0.48, 0.52], [0.36, 0.54]],
        },
        {
          latin: "fasciculus posterior", english: "Posterior cord",
          note: "Posterior to the axillary artery.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Gives the axillary and radial nerves — \"posterior compartments + deltoid\".",
          polygon: [[0.42, 0.46], [0.56, 0.46], [0.56, 0.56], [0.42, 0.56]],
        },
        {
          latin: "nervus medianus", english: "Median nerve",
          note: "Forms over the artery from medial and lateral roots.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Crosses brachial artery from lateral to medial in the arm; supplies forearm flexors + LOAF.",
          polygon: [[0.42, 0.56], [0.56, 0.56], [0.55, 0.66], [0.43, 0.66]],
        },
        {
          latin: "nervus ulnaris", english: "Ulnar nerve",
          note: "Descends medially from the medial cord.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Behind medial epicondyle (\"funny bone\"), then Guyon's canal — intrinsic hand muscles.",
          polygon: [[0.34, 0.58], [0.46, 0.58], [0.46, 0.74], [0.34, 0.74]],
        },
        {
          latin: "musculus biceps brachii", english: "Biceps brachii",
          note: "Long and short heads; supplied by musculocutaneous.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Powerful supinator with the elbow flexed; tendon is the lateral landmark of the cubital fossa.",
          polygon: [[0.18, 0.62], [0.42, 0.60], [0.40, 0.94], [0.18, 0.94]],
        },
        {
          latin: "musculus coracobrachialis", english: "Coracobrachialis",
          note: "Pierced by musculocutaneous — surgical landmark.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Block musculocutaneous separately within coracobrachialis at the axillary approach.",
          polygon: [[0.30, 0.50], [0.42, 0.48], [0.42, 0.66], [0.30, 0.66]],
        },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Axillary anatomy & cords of the brachial plexus", anchor: "block-approaches" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Axillary brachial plexus block", anchor: "block-approaches" },
      ],
    },
    {
      id: "forearm", tabLabel: "Forearm & wrist", folio: "II",
      title: "Forearm and Wrist", subtitle: "Anterior forearm with carpal tunnel",
      image: upperlimbForearm, alt: "Painted anterior view of the forearm and hand",
      caption: "Anterior view of the forearm and hand",
      labels: [
        {
          latin: "musculus flexor carpi radialis", english: "Flexor carpi radialis",
          note: "Tendon medial to radial artery at the wrist.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Lateral wrist landmark for radial artery cannulation — artery lies just lateral to the FCR tendon.",
          polygon: [[0.32, 0.28], [0.46, 0.28], [0.48, 0.66], [0.34, 0.66]],
        },
        {
          latin: "musculus palmaris longus", english: "Palmaris longus",
          note: "Absent in ~15%; landmark for median nerve.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Median nerve lies just lateral and deep to PL tendon at the wrist — surface guide for wrist block.",
          polygon: [[0.46, 0.30], [0.58, 0.30], [0.58, 0.66], [0.46, 0.66]],
        },
        {
          latin: "musculus flexor carpi ulnaris", english: "Flexor carpi ulnaris",
          note: "Tendon overlies ulnar nerve and artery at the wrist.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Ulnar nerve and artery lie just lateral to FCU tendon at the wrist — landmark for ulnar wrist block.",
          polygon: [[0.58, 0.36], [0.72, 0.36], [0.72, 0.68], [0.58, 0.68]],
        },
        {
          latin: "musculus brachioradialis", english: "Brachioradialis",
          note: "Superficial radial nerve emerges from beneath it.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Lateral border of the cubital fossa; superficial radial nerve becomes subcutaneous mid-forearm.",
          polygon: [[0.16, 0.30], [0.32, 0.30], [0.30, 0.62], [0.16, 0.62]],
        },
        {
          latin: "retinaculum flexorum", english: "Flexor retinaculum",
          note: "Roof of the carpal tunnel — divided in carpal tunnel release.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Spans scaphoid/trapezium to pisiform/hook of hamate; transmits 9 tendons + median nerve.",
          polygon: [[0.30, 0.70], [0.74, 0.70], [0.74, 0.78], [0.30, 0.78]],
        },
        {
          latin: "nervus medianus", english: "Median nerve",
          note: "Through the carpal tunnel; thenar atrophy when compressed.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "LOAF muscles + lateral 3½ digits. Carpal tunnel syndrome spares the palmar cutaneous branch.",
          polygon: [[0.18, 0.74], [0.34, 0.74], [0.34, 0.84], [0.18, 0.84]],
        },
        {
          latin: "nervus ulnaris", english: "Ulnar nerve",
          note: "In Guyon's canal at the wrist.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Superficial to flexor retinaculum within Guyon's canal — supplies most intrinsic hand muscles.",
          polygon: [[0.66, 0.78], [0.82, 0.78], [0.82, 0.86], [0.66, 0.86]],
        },
        {
          latin: "arteria radialis", english: "Radial artery",
          note: "Standard arterial line site; Allen's test before cannulation.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Palpated lateral to FCR tendon; modified Allen's test confirms ulnar collateral before cannulation.",
          polygon: [[0.30, 0.72], [0.42, 0.72], [0.42, 0.80], [0.30, 0.80]],
        },
        {
          latin: "arteria ulnaris", english: "Ulnar artery",
          note: "Dominant supply to the superficial palmar arch.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Lies lateral to ulnar nerve at the wrist; main contributor to the superficial palmar arch.",
          polygon: [[0.62, 0.74], [0.74, 0.74], [0.74, 0.82], [0.62, 0.82]],
        },
        {
          latin: "vena cephalica", english: "Cephalic vein",
          note: "Lateral; standard IV cannulation site.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Ascends along radial border of forearm to drain into axillary vein at deltopectoral groove.",
          polygon: [[0.10, 0.18], [0.24, 0.18], [0.30, 0.58], [0.16, 0.58]],
        },
        {
          latin: "vena basilica", english: "Basilic vein",
          note: "Medial; PICC line target.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Larger and straighter than cephalic — preferred PICC vein; pierces deep fascia mid-arm.",
          polygon: [[0.74, 0.16], [0.88, 0.16], [0.82, 0.56], [0.68, 0.56]],
        },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Forearm & wrist nerve anatomy", anchor: "terminal-nerves" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Forearm & wrist blocks (median, ulnar, radial)", anchor: "terminal-nerves" },
      ],
    },
    {
      id: "upper-arteries", tabLabel: "Arterial supply", folio: "III",
      title: "Arterial Supply of the Upper Limb", subtitle: "Subclavian → axillary → brachial → radial / ulnar",
      image: upperlimbArteries, alt: "Painted anterior view of the arterial tree of the upper limb",
      caption: "Arterial supply of the upper limb — anterior view",
      labels: [
        {
          latin: "arteria subclavia", english: "Subclavian artery",
          note: "Becomes axillary at the lateral border of the first rib.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Three parts divided by scalenus anterior; gives vertebral, internal thoracic, thyrocervical trunk.",
          polygon: [[0.36, 0.06], [0.64, 0.06], [0.62, 0.16], [0.38, 0.16]],
        },
        {
          latin: "arteria axillaris", english: "Axillary artery",
          note: "Three parts defined by pectoralis minor; landmark for axillary block.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Cords of the brachial plexus surround its second part — basis of the infraclavicular block.",
          polygon: [[0.42, 0.16], [0.58, 0.16], [0.58, 0.32], [0.42, 0.32]],
        },
        {
          latin: "arteria brachialis", english: "Brachial artery",
          note: "Medial bicipital groove; NIBP cuff occlusion site; brachial pulse for CPR in infants.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Bifurcates into radial and ulnar at the radial neck; auscultatory site for Korotkoff sounds.",
          polygon: [[0.42, 0.32], [0.56, 0.32], [0.56, 0.58], [0.42, 0.58]],
        },
        {
          latin: "arteria profunda brachii", english: "Profunda brachii",
          note: "Spirals posteriorly with the radial nerve in the radial groove.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Largest brachial branch; at risk with the radial nerve in mid-shaft humeral fractures.",
          polygon: [[0.30, 0.34], [0.42, 0.34], [0.40, 0.50], [0.30, 0.50]],
        },
        {
          latin: "arteria radialis", english: "Radial artery",
          note: "Standard arterial line site; perform Allen's test before cannulation.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Crosses the anatomical snuffbox to form the deep palmar arch.",
          polygon: [[0.36, 0.58], [0.48, 0.58], [0.48, 0.78], [0.36, 0.78]],
        },
        {
          latin: "arteria ulnaris", english: "Ulnar artery",
          note: "Dominant supply to superficial palmar arch; alternative arterial line.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Larger terminal branch; gives common interosseous; main supply to the digits.",
          polygon: [[0.50, 0.58], [0.62, 0.58], [0.62, 0.78], [0.50, 0.78]],
        },
        {
          latin: "arteria interossea communis", english: "Common interosseous",
          note: "Branch of ulnar; supplies the deep forearm compartment.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Divides into anterior (with median nerve's AIN) and posterior interosseous arteries.",
          polygon: [[0.48, 0.60], [0.58, 0.60], [0.58, 0.70], [0.48, 0.70]],
        },
        {
          latin: "arcus palmaris superficialis", english: "Superficial palmar arch",
          note: "Mainly ulnar; assess collateral flow before radial cannulation.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Lies at the level of the distal extended thumb; complete in only ~80% of hands.",
          polygon: [[0.42, 0.80], [0.62, 0.80], [0.62, 0.86], [0.42, 0.86]],
        },
        {
          latin: "arcus palmaris profundus", english: "Deep palmar arch",
          note: "Mainly radial continuation; completes the dual hand supply.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "More consistent than the superficial arch — basis of safety in radial artery harvest for CABG.",
          polygon: [[0.44, 0.86], [0.62, 0.86], [0.62, 0.92], [0.44, 0.92]],
        },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Arterial supply of the upper limb", anchor: "arterial-supply" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Arterial cannulation — radial / brachial", anchor: "arterial-supply" },
      ],
    },
    {
      id: "upper-veins", tabLabel: "Venous drainage", folio: "IV",
      title: "Venous Drainage of the Upper Limb", subtitle: "Superficial (cephalic, basilic) + deep system",
      image: upperlimbVeins, alt: "Painted anterior view of the venous network of the upper limb",
      caption: "Superficial and deep venous drainage — anterior view",
      labels: [
        {
          latin: "vena cephalica", english: "Cephalic vein",
          note: "Lateral; ascends in deltopectoral groove to drain into axillary vein.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Acute angle at the deltopectoral groove → higher PICC failure rate than basilic.",
          polygon: [[0.50, 0.18], [0.62, 0.18], [0.58, 0.58], [0.46, 0.58]],
        },
        {
          latin: "vena basilica", english: "Basilic vein",
          note: "Medial; PICC line target; pierces deep fascia to join brachial venae comitantes.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Preferred PICC vein — larger calibre, straighter course; tip aimed at cavoatrial junction.",
          polygon: [[0.36, 0.22], [0.50, 0.22], [0.52, 0.62], [0.38, 0.62]],
        },
        {
          latin: "vena mediana cubiti", english: "Median cubital vein",
          note: "Antecubital connection between cephalic and basilic — standard venepuncture site.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Bicipital aponeurosis (\"grace à Dieu\") protects the brachial artery from misdirected needles.",
          polygon: [[0.40, 0.56], [0.62, 0.56], [0.60, 0.66], [0.40, 0.66]],
        },
        {
          latin: "rete venosum dorsale manus", english: "Dorsal venous network of hand",
          note: "Common IV cannulation site.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Drains laterally into cephalic vein and medially into basilic vein.",
          polygon: [[0.36, 0.84], [0.78, 0.84], [0.78, 0.96], [0.36, 0.96]],
        },
        {
          latin: "venae brachiales", english: "Brachial venae comitantes",
          note: "Paired deep veins with brachial artery; coalesce to form axillary vein.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Used for ultrasound-guided deep venous access when superficial veins are exhausted.",
          polygon: [[0.42, 0.34], [0.54, 0.34], [0.54, 0.56], [0.42, 0.56]],
        },
        {
          latin: "vena axillaris", english: "Axillary vein",
          note: "Continuation of basilic + brachial veins; CVC target via infraclavicular approach.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Lies medial to the axillary artery; ultrasound-guided CVC alternative to subclavian.",
          polygon: [[0.42, 0.18], [0.54, 0.18], [0.54, 0.30], [0.42, 0.30]],
        },
        {
          latin: "vena subclavia", english: "Subclavian vein",
          note: "Posterior to clavicle; classic CVC site (low infection risk, pneumothorax risk).",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Anterior to scalenus anterior (artery is posterior); joins IJV to form brachiocephalic vein.",
          polygon: [[0.36, 0.08], [0.62, 0.08], [0.60, 0.18], [0.38, 0.18]],
        },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Venous drainage of the upper limb", anchor: "venous-drainage" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Peripheral & central venous access — upper limb", anchor: "venous-drainage" },
      ],
    },
    {
      id: "upper-nerves", tabLabel: "Innervation", folio: "V",
      title: "Innervation of the Upper Limb", subtitle: "Five terminal branches of the brachial plexus",
      image: upperlimbNerves, alt: "Painted anterior view of the nerves of the upper limb",
      caption: "Innervation of the upper limb — anterior view",
      labels: [
        {
          latin: "plexus brachialis", english: "Brachial plexus (C5–T1)",
          note: "Roots, trunks, divisions, cords, branches — \"Real Texans Drink Cold Beer\".",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Roots emerge between scalenus anterior and medius — the target of the interscalene block.",
          polygon: [[0.40, 0.06], [0.60, 0.06], [0.58, 0.20], [0.42, 0.20]],
        },
        {
          latin: "nervus musculocutaneus", english: "Musculocutaneous nerve",
          note: "Pierces coracobrachialis; BBC muscles (biceps, brachialis, coracobrachialis); becomes lateral cutaneous nerve of forearm.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Leaves the axillary sheath early — block separately within coracobrachialis at the axilla.",
          polygon: [[0.32, 0.22], [0.44, 0.22], [0.42, 0.42], [0.30, 0.42]],
        },
        {
          latin: "nervus medianus", english: "Median nerve",
          note: "Crosses brachial artery in the arm; through carpal tunnel; thenar wasting + LOAF muscles when compressed.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Sensory: lateral 3½ digits (palmar). Motor: forearm flexors (most) + LOAF.",
          polygon: [[0.44, 0.24], [0.56, 0.24], [0.56, 0.62], [0.44, 0.62]],
        },
        {
          latin: "nervus ulnaris", english: "Ulnar nerve",
          note: "Behind medial epicondyle (\"funny bone\"); Guyon's canal at wrist; intrinsic hand muscles + medial 1½ digits.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Vulnerable to perioperative compression at the cubital tunnel — pad the elbow carefully.",
          polygon: [[0.30, 0.40], [0.42, 0.40], [0.42, 0.66], [0.30, 0.66]],
        },
        {
          latin: "nervus radialis", english: "Radial nerve",
          note: "Spirals in radial groove of humerus — vulnerable in mid-shaft fractures (wrist drop).",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Saturday-night palsy: compression in spiral groove → wrist drop with sensory loss in snuffbox.",
          polygon: [[0.56, 0.30], [0.68, 0.30], [0.66, 0.62], [0.54, 0.62]],
        },
        {
          latin: "nervus axillaris", english: "Axillary nerve",
          note: "Around surgical neck of humerus; deltoid + regimental badge sensation; risk in shoulder dislocation.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Test sensation over the regimental badge area before and after shoulder reduction.",
          polygon: [[0.66, 0.16], [0.82, 0.16], [0.80, 0.30], [0.66, 0.30]],
        },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Brachial plexus & terminal nerves", anchor: "terminal-nerves" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Upper limb regional anaesthesia — block selection", anchor: "block-approaches" },
      ],
    },
  ],
};

export const lowerLimbFolio: CorPictumFolioData = {
  atlasTitle: "Atlas of Anatomy — Lower Limb",
  atlasSubtitle: "Painted plates of the lower limb",
  plates: [
    {
      id: "femoral", tabLabel: "Femoral triangle", folio: "I",
      title: "Femoral Triangle", subtitle: "Anterior thigh and femoral sheath",
      image: lowerlimbFemoral, alt: "Painted anterior view of the femoral triangle",
      caption: "Femoral triangle — anterior view",
      labels: [
        {
          latin: "ligamentum inguinale", english: "Inguinal ligament",
          note: "Superior border of the triangle.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "ASIS to pubic tubercle; mid-inguinal point (midway) overlies the femoral artery.",
          polygon: [[0.40, 0.10], [0.84, 0.10], [0.80, 0.20], [0.42, 0.22]],
        },
        {
          latin: "musculus sartorius", english: "Sartorius",
          note: "Lateral border of the triangle.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Forms the roof of the adductor canal — landmark for adductor canal block.",
          polygon: [[0.20, 0.20], [0.42, 0.20], [0.40, 0.92], [0.18, 0.92]],
        },
        {
          latin: "musculus adductor longus", english: "Adductor longus",
          note: "Medial border of the triangle.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Tendon palpable in the groin — divides the floor between pectineus and adductor longus.",
          polygon: [[0.62, 0.62], [0.86, 0.62], [0.84, 0.94], [0.60, 0.94]],
        },
        {
          latin: "nervus femoralis", english: "Femoral nerve",
          note: "Lateral in the NAVL arrangement; outside the femoral sheath.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Lies ~1 cm lateral to the artery, OUTSIDE the femoral sheath — target of the femoral block.",
          polygon: [[0.40, 0.30], [0.48, 0.30], [0.48, 0.70], [0.40, 0.70]],
        },
        {
          latin: "arteria femoralis", english: "Femoral artery",
          note: "Mid-inguinal point landmark; arterial line site.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Mid-inguinal point landmark; primary access for IABP, ECMO, angiography.",
          polygon: [[0.48, 0.26], [0.56, 0.26], [0.56, 0.70], [0.48, 0.70]],
        },
        {
          latin: "vena femoralis", english: "Femoral vein",
          note: "Medial to the artery; emergency CVC site.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Within the femoral sheath, MEDIAL to the artery — emergency CVC site (NAVeL).",
          polygon: [[0.54, 0.24], [0.62, 0.24], [0.62, 0.72], [0.54, 0.72]],
        },
        {
          latin: "vena saphena magna", english: "Great saphenous vein",
          note: "Joins femoral vein at the saphenofemoral junction.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "SFJ ~3 cm inferior + lateral to pubic tubercle; cutdown 1 cm anterior + superior to medial malleolus.",
          polygon: [[0.46, 0.74], [0.58, 0.74], [0.58, 0.96], [0.46, 0.96]],
        },
        {
          latin: "musculus iliopsoas", english: "Iliopsoas",
          note: "Floor of the triangle laterally.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Lumbar plexus forms within psoas major — the basis of the lumbar plexus (psoas compartment) block.",
          polygon: [[0.62, 0.22], [0.86, 0.22], [0.84, 0.50], [0.62, 0.50]],
        },
        {
          latin: "musculus pectineus", english: "Pectineus",
          note: "Floor of the triangle medially.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Floor under the femoral vessels; obturator nerve runs deep to it.",
          polygon: [[0.58, 0.46], [0.78, 0.46], [0.76, 0.66], [0.58, 0.66]],
        },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Femoral triangle & lumbar plexus anatomy", anchor: "lumbar-plexus" },
        { code: "RU_BK_02", exams: [Exam.FINAL], title: "Femoral & fascia iliaca blocks", anchor: "lumbar-plexus" },
      ],
    },
    {
      id: "popliteal", tabLabel: "Popliteal fossa", folio: "II",
      title: "Popliteal Fossa", subtitle: "Posterior knee for sciatic block",
      image: lowerlimbPopliteal, alt: "Painted posterior view of the popliteal fossa",
      caption: "Popliteal fossa — posterior view",
      labels: [
        {
          latin: "musculus biceps femoris", english: "Biceps femoris",
          note: "Superolateral border; common peroneal nerve hugs its medial edge.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Superolateral border of the fossa; tendon inserts into fibular head — landmark for CPN.",
          polygon: [[0.18, 0.10], [0.42, 0.08], [0.46, 0.50], [0.22, 0.52]],
        },
        {
          latin: "musculus semitendinosus", english: "Semitendinosus",
          note: "Superomedial border.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Tendon palpable medially — superomedial border with semimembranosus deep to it.",
          polygon: [[0.58, 0.08], [0.82, 0.10], [0.78, 0.50], [0.54, 0.50]],
        },
        {
          latin: "musculus semimembranosus", english: "Semimembranosus",
          note: "Superomedial border, deep to semitendinosus.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Deep to semitendinosus; bursa here may communicate with the knee (Baker's cyst).",
          polygon: [[0.56, 0.18], [0.78, 0.18], [0.74, 0.44], [0.54, 0.44]],
        },
        {
          latin: "musculus gastrocnemius", english: "Gastrocnemius",
          note: "Inferior borders — both heads frame the fossa.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Medial and lateral heads form the inferior borders; popliteal vessels pass between them.",
          polygon: [[0.18, 0.74], [0.82, 0.74], [0.82, 0.98], [0.18, 0.98]],
        },
        {
          latin: "nervus tibialis", english: "Tibial nerve",
          note: "Central in the fossa; main target of popliteal sciatic block.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Most superficial neurovascular structure in the fossa — first hit in popliteal sciatic block.",
          polygon: [[0.46, 0.50], [0.56, 0.50], [0.56, 0.78], [0.46, 0.78]],
        },
        {
          latin: "nervus peroneus communis", english: "Common peroneal nerve",
          note: "Hugs the medial border of biceps femoris.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Wraps around fibular neck — vulnerable to compression (foot drop).",
          polygon: [[0.30, 0.40], [0.46, 0.46], [0.40, 0.74], [0.24, 0.66]],
        },
        {
          latin: "vena poplitea", english: "Popliteal vein",
          note: "Superficial to the artery.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Lies between the tibial nerve (superficial) and the popliteal artery (deep) — common DVT site.",
          polygon: [[0.44, 0.34], [0.54, 0.34], [0.54, 0.66], [0.44, 0.66]],
        },
        {
          latin: "arteria poplitea", english: "Popliteal artery",
          note: "Deepest structure; aneurysm site.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Deepest structure in the fossa; commonest peripheral aneurysm; pulse palpated with knee flexed.",
          polygon: [[0.46, 0.50], [0.56, 0.50], [0.56, 0.70], [0.46, 0.70]],
        },
        {
          latin: "vena saphena parva", english: "Small saphenous vein",
          note: "Pierces popliteal fascia to drain into popliteal vein.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Ascends the posterior calf with the sural nerve; pierces deep fascia to join the popliteal vein.",
          polygon: [[0.46, 0.74], [0.58, 0.74], [0.58, 0.86], [0.46, 0.86]],
        },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Popliteal fossa & sciatic nerve anatomy", anchor: "sacral-plexus" },
        { code: "RU_BK_02", exams: [Exam.FINAL], title: "Popliteal sciatic nerve block — landmarks & sonoanatomy", anchor: "sacral-plexus" },
      ],
    },
    {
      id: "lower-arteries", tabLabel: "Arterial supply", folio: "III",
      title: "Arterial Supply of the Lower Limb", subtitle: "External iliac → femoral → popliteal → tibials",
      image: lowerlimbArteries, alt: "Painted anterior view of the arterial tree of the lower limb",
      caption: "Arterial supply of the lower limb — anterior view",
      labels: [
        {
          latin: "arteria iliaca externa", english: "External iliac artery",
          note: "Becomes common femoral artery beneath the inguinal ligament.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Continuation of the common iliac; gives the inferior epigastric just before the inguinal ligament.",
          polygon: [[0.42, 0.06], [0.58, 0.06], [0.58, 0.22], [0.42, 0.22]],
        },
        {
          latin: "arteria femoralis communis", english: "Common femoral artery",
          note: "Mid-inguinal point; arterial line + IABP access; femoral pulse.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Mid-inguinal point landmark; primary access site for IABP, ECMO, angiography.",
          polygon: [[0.42, 0.22], [0.58, 0.22], [0.58, 0.34], [0.42, 0.34]],
        },
        {
          latin: "arteria profunda femoris", english: "Profunda femoris",
          note: "Main supply to thigh musculature; gives medial + lateral circumflex (femoral head supply).",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Medial + lateral circumflex branches supply the femoral head — at risk in NOF fractures.",
          polygon: [[0.56, 0.26], [0.72, 0.30], [0.66, 0.40], [0.54, 0.36]],
        },
        {
          latin: "arteria femoralis superficialis", english: "Superficial femoral artery",
          note: "Through adductor canal; becomes popliteal at adductor hiatus.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Most common site of atherosclerotic occlusion (claudication of calf and foot).",
          polygon: [[0.40, 0.34], [0.52, 0.34], [0.52, 0.50], [0.40, 0.50]],
        },
        {
          latin: "arteria poplitea", english: "Popliteal artery",
          note: "Deepest structure in popliteal fossa; aneurysm site; popliteal pulse with knee flexed.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Commonest peripheral aneurysm; bifurcates into anterior tibial and tibioperoneal trunk.",
          polygon: [[0.40, 0.50], [0.52, 0.50], [0.52, 0.62], [0.40, 0.62]],
        },
        {
          latin: "arteria tibialis anterior", english: "Anterior tibial artery",
          note: "Anterior compartment; becomes dorsalis pedis (lateral to EHL tendon).",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Pierces the interosseous membrane to enter the anterior compartment; vulnerable in compartment syndrome.",
          polygon: [[0.36, 0.62], [0.46, 0.62], [0.46, 0.82], [0.36, 0.82]],
        },
        {
          latin: "arteria tibialis posterior", english: "Posterior tibial artery",
          note: "Behind medial malleolus — palpable pulse; supplies plantar arch.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Palpated behind medial malleolus; ABPI used for vascular assessment.",
          polygon: [[0.50, 0.62], [0.62, 0.62], [0.62, 0.84], [0.50, 0.84]],
        },
        {
          latin: "arteria fibularis", english: "Peroneal (fibular) artery",
          note: "Lateral leg; collateral supply, often spared in PVD.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Branch of the tibioperoneal trunk; often the LAST artery patent in advanced PVD.",
          polygon: [[0.58, 0.66], [0.68, 0.66], [0.68, 0.82], [0.58, 0.82]],
        },
        {
          latin: "arteria dorsalis pedis", english: "Dorsalis pedis",
          note: "Pulse lateral to EHL tendon — absent congenitally in 5–12%.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Continuation of anterior tibial; pulse lateral to EHL tendon — absent congenitally in 5–12%.",
          polygon: [[0.34, 0.86], [0.48, 0.86], [0.48, 0.96], [0.34, 0.96]],
        },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Arterial supply of the lower limb", anchor: "arterial-supply" },
        { code: "RU_BK_02", exams: [Exam.FINAL], title: "Femoral arterial cannulation & vascular access", anchor: "arterial-supply" },
      ],
    },
    {
      id: "lower-veins", tabLabel: "Venous drainage", folio: "IV",
      title: "Venous Drainage of the Lower Limb", subtitle: "Superficial (saphenous) + deep system",
      image: lowerlimbVeins, alt: "Painted anterior view of the venous network of the lower limb",
      caption: "Superficial and deep venous drainage — anterior view",
      labels: [
        {
          latin: "vena saphena magna", english: "Great saphenous vein",
          note: "Longest vein in the body; medial leg + thigh; SFJ in groin; cutdown 1 cm anterior + superior to medial malleolus.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Reliable venous cutdown site (1 cm anterior + superior to medial malleolus) — runs with saphenous nerve.",
          polygon: [[0.32, 0.10], [0.44, 0.10], [0.46, 0.78], [0.30, 0.80]],
        },
        {
          latin: "vena saphena parva", english: "Small saphenous vein",
          note: "Posterior calf; drains into popliteal vein.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Ascends the posterior calf with the sural nerve; drains into popliteal vein.",
          polygon: [[0.42, 0.30], [0.50, 0.30], [0.48, 0.74], [0.40, 0.74]],
        },
        {
          latin: "arcus venosus dorsalis pedis", english: "Dorsal venous arch of foot",
          note: "Origin of great + small saphenous veins; useful IV cannulation site.",
          examTags: [Exam.PRIMARY],
          learningPoint: "Lateral end → small saphenous; medial end → great saphenous. Reliable IV cannulation site.",
          polygon: [[0.18, 0.84], [0.46, 0.82], [0.46, 0.94], [0.18, 0.96]],
        },
        {
          latin: "venae perforantes", english: "Perforating veins",
          note: "Connect superficial → deep system; valvular incompetence underlies varicose veins.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Valves direct flow from superficial → deep. Failure (Cockett's perforators) underlies varicose veins.",
          polygon: [[0.34, 0.40], [0.46, 0.40], [0.46, 0.62], [0.34, 0.62]],
        },
        {
          latin: "vena femoralis", english: "Femoral vein",
          note: "Medial to femoral artery in the femoral sheath; emergency CVC site.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Medial to femoral artery (NAVeL); emergency CVC site (lower infection-risk than once thought).",
          polygon: [[0.36, 0.06], [0.48, 0.06], [0.48, 0.22], [0.36, 0.22]],
        },
        {
          latin: "vena poplitea", english: "Popliteal vein",
          note: "Superficial to popliteal artery; common DVT site.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Common origin of proximal DVT — assessed by compression duplex ultrasound.",
          polygon: [[0.36, 0.20], [0.48, 0.20], [0.48, 0.36], [0.36, 0.36]],
        },
        {
          latin: "venae tibiales posteriores", english: "Posterior tibial veins",
          note: "Calf-pump driven; another common DVT origin.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Driven by calf-muscle pump; immobility + venous stasis (Virchow's triad) → calf DVT origin.",
          polygon: [[0.38, 0.50], [0.50, 0.50], [0.50, 0.78], [0.38, 0.78]],
        },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Venous drainage of the lower limb", anchor: "venous-drainage" },
        { code: "RU_BK_02", exams: [Exam.FINAL], title: "VTE risk assessment & prophylaxis (NICE CG89)", anchor: "venous-drainage" },
      ],
    },
    {
      id: "lower-nerves", tabLabel: "Innervation", folio: "V",
      title: "Innervation of the Lower Limb", subtitle: "Lumbar + sacral plexus terminal branches",
      image: lowerlimbNerves, alt: "Painted view of nerves of the lower limb",
      caption: "Innervation of the lower limb",
      labels: [
        {
          latin: "plexus lumbalis", english: "Lumbar plexus (L1–L4)",
          note: "Forms within psoas major; gives femoral, obturator, LCNT, ilioinguinal, iliohypogastric.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Forms within psoas major — basis of the psoas compartment (lumbar plexus) block.",
          polygon: [[0.40, 0.10], [0.60, 0.10], [0.60, 0.24], [0.40, 0.24]],
        },
        {
          latin: "nervus femoralis", english: "Femoral nerve (L2–L4)",
          note: "Lateral to femoral artery under inguinal ligament; quadriceps + saphenous; femoral / fascia iliaca block.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Lateral to femoral artery, OUTSIDE the femoral sheath — \"lateral to NAVeL\".",
          polygon: [[0.30, 0.26], [0.42, 0.26], [0.42, 0.50], [0.30, 0.50]],
        },
        {
          latin: "nervus saphenus", english: "Saphenous nerve",
          note: "Terminal sensory branch of femoral; medial leg to medial malleolus; adductor canal block target.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Pure sensory terminal branch of femoral — block in adductor canal preserves quadriceps power.",
          polygon: [[0.32, 0.62], [0.42, 0.62], [0.42, 0.86], [0.32, 0.86]],
        },
        {
          latin: "nervus obturatorius", english: "Obturator nerve (L2–L4)",
          note: "Through obturator foramen; adductors of thigh; often missed by femoral block alone.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Sensory to medial thigh + hip joint; missed by femoral block — supplement for knee surgery.",
          polygon: [[0.42, 0.30], [0.54, 0.30], [0.54, 0.50], [0.42, 0.50]],
        },
        {
          latin: "nervus cutaneus femoris lateralis", english: "Lateral cutaneous nerve of thigh",
          note: "Under ASIS; pure sensory; entrapment = meralgia paraesthetica.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Passes 1–2 cm medial to ASIS; entrapment under inguinal ligament = meralgia paraesthetica.",
          polygon: [[0.20, 0.24], [0.32, 0.24], [0.32, 0.42], [0.20, 0.42]],
        },
        {
          latin: "nervus ischiadicus", english: "Sciatic nerve (L4–S3)",
          note: "Largest nerve in the body; tibial + common peroneal divisions; subgluteal / popliteal blocks.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "Exits via greater sciatic foramen below piriformis; divides above the popliteal fossa.",
          polygon: [[0.56, 0.26], [0.72, 0.26], [0.72, 0.50], [0.56, 0.50]],
        },
        {
          latin: "nervus tibialis", english: "Tibial nerve",
          note: "Posterior compartment + sole; behind medial malleolus; main popliteal block target.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Largest division of sciatic; sole of foot sensation; tarsal tunnel behind medial malleolus.",
          polygon: [[0.56, 0.52], [0.68, 0.52], [0.68, 0.78], [0.56, 0.78]],
        },
        {
          latin: "nervus peroneus communis", english: "Common peroneal nerve",
          note: "Wraps around fibular neck — vulnerable to compression → foot drop.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Most commonly injured peripheral nerve; foot drop with sensory loss over dorsum of foot.",
          polygon: [[0.66, 0.50], [0.78, 0.50], [0.78, 0.66], [0.66, 0.66]],
        },
        {
          latin: "nervus peroneus superficialis", english: "Superficial peroneal nerve",
          note: "Lateral leg + dorsum of foot (except first webspace).",
          examTags: [Exam.PRIMARY],
          learningPoint: "Lateral leg + dorsum of foot, sparing 1st webspace — subcutaneous infiltration completes ankle block.",
          polygon: [[0.68, 0.66], [0.80, 0.66], [0.80, 0.86], [0.68, 0.86]],
        },
        {
          latin: "nervus peroneus profundus", english: "Deep peroneal nerve",
          note: "Anterior compartment (dorsiflexion); first webspace sensation.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint: "Sensation = first webspace ONLY; motor = anterior compartment (dorsiflexion). Ankle block target.",
          polygon: [[0.62, 0.70], [0.72, 0.70], [0.72, 0.88], [0.62, 0.88]],
        },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Lumbosacral plexus & terminal nerves", anchor: "sacral-plexus" },
        { code: "RU_BK_02", exams: [Exam.FINAL], title: "Lower limb regional anaesthesia — block selection", anchor: "lower-limb-blocks" },
      ],
    },
  ],
};

export const thoracicFolio: CorPictumFolioData = {
  atlasTitle: "Atlas of Anatomy — Thorax",
  atlasSubtitle: "Painted plates of the thoracic cavity",
  plates: [
    {
      id: "anterior", tabLabel: "Anterior", folio: "I",
      title: "Thoracic Cavity", subtitle: "Anterior view with chest wall removed",
      image: thoracicAnterior, alt: "Painted anterior view of the thoracic cavity",
      caption: "Anterior view of the thoracic cavity",
      labels: [
        { latin: "pulmo dexter", english: "Right lung", note: "Three lobes; horizontal and oblique fissures." },
        { latin: "pulmo sinister", english: "Left lung", note: "Two lobes; cardiac notch and lingula." },
        { latin: "cor in pericardio", english: "Heart in pericardium", note: "Middle mediastinum; fibrous + serous layers." },
        { latin: "arcus aortae", english: "Aortic arch", note: "Branches: brachiocephalic, left CCA, left subclavian." },
        { latin: "diaphragma", english: "Diaphragm", note: "Primary inspiratory muscle; phrenic nerve C3–C5." },
        { latin: "musculi intercostales", english: "Intercostal muscles", note: "Innervated by intercostal nerves; block targets." },
        { latin: "arteria thoracica interna", english: "Internal thoracic artery", note: "Lateral to sternum; CABG conduit." },
        { latin: "nervus phrenicus", english: "Phrenic nerve", note: "On the lateral pericardium; sole motor to diaphragm." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Thoracic cavity & lung anatomy", anchor: "lung-anatomy" },
        { code: "RC_BK_01", exams: [Exam.FINAL], title: "Anaesthesia for thoracic surgery", anchor: "lung-anatomy" },
        { code: "RC_BK_02", exams: [Exam.FINAL], title: "One-lung ventilation & DLT placement", anchor: "lung-anatomy" },
      ],
    },
    {
      id: "mediastinum", tabLabel: "Mediastinum", folio: "II",
      title: "Right Mediastinum", subtitle: "Right lateral view after lung removal",
      image: thoracicMediastinum, alt: "Painted lateral view of the right mediastinum",
      caption: "Right lateral view of the mediastinum",
      labels: [
        { latin: "vena cava superior", english: "Superior vena cava", note: "Receives azygos vein before entering right atrium." },
        { latin: "vena azygos", english: "Azygos vein", note: "Arches over right main bronchus." },
        { latin: "nervus phrenicus dexter", english: "Right phrenic nerve", note: "Anterior to lung root, on the pericardium." },
        { latin: "nervus vagus dexter", english: "Right vagus nerve", note: "Posterior to lung root; recurrent loops under right subclavian." },
        { latin: "oesophagus", english: "Oesophagus", note: "Behind the trachea; passes through diaphragm at T10." },
        { latin: "trachea", english: "Trachea", note: "Bifurcates at the carina (T4/T5)." },
        { latin: "bronchus principalis dexter", english: "Right main bronchus", note: "Wider, shorter, more vertical — common aspiration site." },
        { latin: "truncus sympathicus", english: "Sympathetic chain", note: "On heads of ribs; thoracic ganglia for sympathectomy." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Mediastinal contents & relations", anchor: "mediastinum" },
        { code: "RC_BK_01", exams: [Exam.FINAL], title: "Anaesthesia for thoracic surgery — mediastinal masses", anchor: "mediastinum" },
        { code: "CR_BK_01", exams: [Exam.FINAL], title: "Cardiothoracic anatomy for the anaesthetist", anchor: "mediastinum" },
      ],
    },
  ],
};

export const abdominalFolio: CorPictumFolioData = {
  atlasTitle: "Atlas of Anatomy — Abdomen",
  atlasSubtitle: "Painted plates of the abdominal cavity",
  plates: [
    {
      id: "anterior", tabLabel: "Anterior", folio: "I",
      title: "Abdominal Cavity", subtitle: "Anterior view with greater omentum removed",
      image: abdominalAnterior, alt: "Painted anterior view of the abdominal viscera",
      caption: "Anterior view of the abdominal viscera",
      labels: [
        { latin: "hepar", english: "Liver", note: "Right upper quadrant; eight Couinaud segments." },
        { latin: "vesica fellea", english: "Gallbladder", note: "Inferior surface of liver; Murphy's sign on palpation." },
        { latin: "gaster", english: "Stomach", note: "Left upper quadrant; vagal innervation." },
        { latin: "lien", english: "Spleen", note: "Left ribs 9–11; injury risk in trauma." },
        { latin: "colon transversum", english: "Transverse colon", note: "Mobile on the transverse mesocolon." },
        { latin: "colon ascendens", english: "Ascending colon", note: "Retroperitoneal on the right." },
        { latin: "colon descendens", english: "Descending colon", note: "Retroperitoneal on the left." },
        { latin: "intestinum tenue", english: "Small intestine", note: "Jejunum upper-left, ileum lower-right; ~6 m." },
        { latin: "ligamentum falciforme", english: "Falciform ligament", note: "Contains the round ligament (obliterated umbilical vein)." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Abdominal viscera & peritoneal anatomy", anchor: "anterior-abdominal-wall-layers" },
        { code: "OA_BK_03", exams: [Exam.FINAL], title: "Anaesthesia for general & upper-GI surgery", anchor: "anterior-abdominal-wall-layers" },
        { code: "RU_BK_02", exams: [Exam.FINAL], title: "Abdominal field blocks (TAP, rectus sheath)", anchor: "anterior-abdominal-wall-layers" },
      ],
    },
    {
      id: "retroperitoneum", tabLabel: "Retroperitoneum", folio: "II",
      title: "Retroperitoneum", subtitle: "Posterior view of the great vessels and kidneys",
      image: abdominalRetroperitoneum, alt: "Painted view of the retroperitoneum",
      caption: "Posterior view of the retroperitoneal space",
      labels: [
        { latin: "ren dexter", english: "Right kidney", note: "Slightly lower due to the liver above." },
        { latin: "ren sinister", english: "Left kidney", note: "Hilum at L1; renal vein crosses anterior to aorta." },
        { latin: "glandula suprarenalis", english: "Adrenal gland", note: "Cortex (steroids) + medulla (catecholamines)." },
        { latin: "aorta abdominalis", english: "Abdominal aorta", note: "From T12 (diaphragm) to L4 bifurcation." },
        { latin: "truncus coeliacus", english: "Coeliac trunk", note: "T12; supplies foregut (stomach, liver, spleen)." },
        { latin: "arteria mesenterica superior", english: "Superior mesenteric artery", note: "L1; supplies midgut (small bowel to mid-transverse colon)." },
        { latin: "arteriae renales", english: "Renal arteries", note: "L1/L2; right is longer (passes behind IVC)." },
        { latin: "vena cava inferior", english: "Inferior vena cava", note: "Right of midline; pierces diaphragm at T8." },
        { latin: "ureter", english: "Ureter", note: "Crosses pelvic brim at the bifurcation of common iliac." },
        { latin: "musculus psoas major", english: "Psoas major", note: "Flanks the lumbar spine; landmark for lumbar plexus block." },
        { latin: "diaphragma", english: "Diaphragm", note: "Crura attach to L1–L3 vertebral bodies." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Retroperitoneal anatomy — kidneys & great vessels", anchor: "key-abdominal-organs-anaesthetic-relevance" },
        { code: "OA_BK_03", exams: [Exam.FINAL], title: "Anaesthesia for renal & retroperitoneal surgery", anchor: "key-abdominal-organs-anaesthetic-relevance" },
        { code: "OA_BK_05", exams: [Exam.FINAL], title: "Vascular anaesthesia — aorta & iliac vessels", anchor: "key-abdominal-organs-anaesthetic-relevance" },
      ],
    },
  ],
};

/**
 * Cor Pictum — Cardiac plates.
 *
 * First folio with the new interactive features:
 *  - polygon hotspots in normalised image coordinates
 *  - per-label exam tags (filtered by the global ExamFilterContext)
 *  - learning-point lines surfaced under each label
 *
 * Polygon coords are approximate regions over the painted plates — they
 * give a recognisable highlight without claiming pixel-perfect alignment.
 */
export const cardiacFolio: CorPictumFolioData = {
  atlasTitle: "Atlas of Anatomy — Heart and Great Vessels",
  atlasSubtitle: "Painted plates of the heart and great vessels",
  plates: [
    {
      id: "anterior",
      tabLabel: "Anterior",
      folio: "I",
      title: "Heart in Situ",
      subtitle: "Anterior view, pericardium opened",
      image: cardiacAnterior,
      alt: "Painted anterior view of the heart and great vessels with coronary arteries",
      caption: "Anterior view of the heart and great vessels",
      labels: [
        {
          latin: "aorta ascendens",
          english: "Ascending aorta",
          note: "Arises from the left ventricle behind the pulmonary trunk; gives the coronary arteries from the aortic sinuses.",
          examTags: [Exam.PRIMARY, Exam.FINAL],
          learningPoint:
            "Site of cross-clamp in cardiac surgery; dilatation here drives aortic regurgitation.",
          polygon: [
            [0.40, 0.20],
            [0.52, 0.16],
            [0.58, 0.32],
            [0.50, 0.40],
            [0.42, 0.34],
          ],
        },
        {
          latin: "arcus aortae",
          english: "Aortic arch",
          note: "Curves over the left main bronchus; gives off brachiocephalic, left common carotid and left subclavian arteries.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Origin of brachiocephalic, L common carotid and L subclavian — order matters for arterial line and TOE windows.",
          polygon: [
            [0.34, 0.10],
            [0.66, 0.10],
            [0.62, 0.22],
            [0.50, 0.18],
            [0.38, 0.22],
          ],
        },
        {
          latin: "truncus pulmonalis",
          english: "Pulmonary trunk",
          note: "Leaves the right ventricle, passes anterior and to the left of the aorta, bifurcates under the arch.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Catheter from the RV passes through here into the PA — the wedge position estimates LA pressure.",
          polygon: [
            [0.30, 0.22],
            [0.42, 0.22],
            [0.44, 0.36],
            [0.32, 0.36],
          ],
        },
        {
          latin: "atrium dextrum",
          english: "Right atrium",
          note: "Receives SVC, IVC and coronary sinus; the SA node sits at the SVC–RA junction.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint: "CVP measured here — reads RA pressure, an estimate of preload.",
          polygon: [
            [0.55, 0.40],
            [0.72, 0.40],
            [0.74, 0.58],
            [0.58, 0.58],
          ],
        },
        {
          latin: "ventriculus dexter",
          english: "Right ventricle",
          note: "Forms most of the anterior surface of the heart; thinner wall (~3–5 mm) than the LV.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Most anterior chamber — vulnerable in penetrating chest trauma and during pericardiocentesis.",
          polygon: [
            [0.32, 0.50],
            [0.55, 0.50],
            [0.58, 0.85],
            [0.36, 0.88],
          ],
        },
        {
          latin: "ventriculus sinister",
          english: "Left ventricle",
          note: "Forms the apex and left border; wall ~8–12 mm thick; ejects against systemic afterload.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Apex beat normally palpable in the 5th left intercostal space, mid-clavicular line.",
          polygon: [
            [0.55, 0.50],
            [0.72, 0.55],
            [0.66, 0.88],
            [0.50, 0.85],
          ],
        },
        {
          latin: "arteria coronaria sinistra (LAD)",
          english: "Left anterior descending artery",
          note: "Runs in the anterior interventricular sulcus; supplies the anterior LV, anterior septum and apex.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "‘Widow-maker’: occlusion → anterior STEMI in V1–V4 with risk of cardiogenic shock and apical thrombus.",
          polygon: [
            [0.50, 0.45],
            [0.56, 0.45],
            [0.55, 0.85],
            [0.49, 0.85],
          ],
        },
        {
          latin: "arteria coronaria dextra",
          english: "Right coronary artery",
          note: "Runs in the right AV groove; supplies RA, RV, SA node (60%) and AV node (90%) in right-dominant systems.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Inferior STEMI (II, III, aVF) — beware AV block and RV infarction; preload-dependent, avoid GTN.",
          polygon: [
            [0.40, 0.55],
            [0.52, 0.55],
            [0.50, 0.70],
            [0.38, 0.68],
          ],
        },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Anatomy of the heart & great vessels", anchor: "heart-chambers-valves" },
        { code: "CR_BK_01", exams: [Exam.FINAL], title: "Coronary circulation & ischaemic heart disease", anchor: "coronary-arteries" },
        { code: "CR_BK_02", exams: [Exam.FINAL], title: "Cardiac chambers & great-vessel relationships", anchor: "heart-chambers-valves" },
      ],
    },
    {
      id: "short-axis",
      tabLabel: "Short axis",
      folio: "II",
      title: "Short-Axis Cross-Section",
      subtitle: "Mid-ventricular short-axis cross-section",
      image: cardiacShortAxis,
      alt: "Painted short-axis cross-section of the heart at mid-ventricular level",
      caption: "Short-axis cross-section at the mid-ventricular level",
      labels: [
        {
          latin: "ventriculus sinister",
          english: "Left ventricle cavity",
          note: "Round, thick-walled cavity; the reference chamber for TOE mid-papillary short-axis assessment.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Mid-papillary short-axis is the standard TOE view for global LV function and regional wall motion.",
          polygon: [
            [0.46, 0.42],
            [0.66, 0.42],
            [0.68, 0.66],
            [0.46, 0.66],
          ],
        },
        {
          latin: "ventriculus dexter",
          english: "Right ventricle cavity",
          note: "Crescent-shaped wrapping around the LV; thin free wall (~3–5 mm).",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "RV:LV diameter > 1 in apical 4-chamber suggests acute cor pulmonale — think PE.",
          polygon: [
            [0.26, 0.40],
            [0.46, 0.40],
            [0.46, 0.66],
            [0.30, 0.66],
          ],
        },
        {
          latin: "septum interventriculare",
          english: "Interventricular septum",
          note: "Muscular partition between LV and RV; carries the bundle branches in its membranous portion.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Septal flattening (‘D-shaped LV’) on echo indicates RV pressure or volume overload.",
          polygon: [
            [0.44, 0.40],
            [0.50, 0.40],
            [0.50, 0.66],
            [0.44, 0.66],
          ],
        },
        {
          latin: "musculi papillares",
          english: "Papillary muscles",
          note: "Anterolateral and posteromedial in the LV; tether the mitral leaflets via chordae tendineae.",
          examTags: [Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Posteromedial PM has single RCA blood supply — vulnerable in inferior MI → acute MR.",
          polygon: [
            [0.50, 0.50],
            [0.58, 0.50],
            [0.58, 0.58],
            [0.50, 0.58],
          ],
        },
        {
          latin: "valva mitralis",
          english: "Mitral valve plane",
          note: "Bicuspid AV valve between LA and LV; annulus, leaflets, chordae and papillary muscles together form the apparatus.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Normal MV area ~4–6 cm²; severe stenosis < 1.5 cm² — preserve sinus rhythm and avoid tachycardia.",
          polygon: [
            [0.46, 0.36],
            [0.66, 0.36],
            [0.66, 0.44],
            [0.46, 0.44],
          ],
        },
        {
          latin: "valva tricuspidalis",
          english: "Tricuspid valve plane",
          note: "Largest cardiac valve; three leaflets (anterior, posterior, septal) between RA and RV.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "TR jet velocity on echo lets you estimate PA systolic pressure (PASP = 4v² + RAP).",
          polygon: [
            [0.26, 0.34],
            [0.46, 0.34],
            [0.46, 0.42],
            [0.26, 0.42],
          ],
        },
        {
          latin: "valva aortica",
          english: "Aortic valve",
          note: "Trileaflet semilunar valve; right and left coronary cusps give origin to the coronaries.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Severe AS: area < 1 cm², peak velocity > 4 m/s, mean gradient > 40 mmHg — maintain SVR and sinus rhythm.",
          polygon: [
            [0.44, 0.22],
            [0.58, 0.22],
            [0.58, 0.34],
            [0.44, 0.34],
          ],
        },
        {
          latin: "pericardium",
          english: "Pericardium",
          note: "Tough fibrous outer layer with serous lining; normal volume of pericardial fluid 15–50 mL.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Tamponade triad (Beck): hypotension, muffled heart sounds, raised JVP — pulsus paradoxus on the line.",
          polygon: [
            [0.20, 0.30],
            [0.78, 0.30],
            [0.78, 0.78],
            [0.20, 0.78],
          ],
        },
      ],
      curriculumLinks: [
        { code: "CR_BK_02", exams: [Exam.FINAL], title: "Valvular heart disease — anatomy & assessment", anchor: "heart-chambers-valves" },
        { code: "CR_BK_05", exams: [Exam.FINAL], title: "Peri-operative echocardiography of the LV/RV", anchor: "heart-chambers-valves" },
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Chambers, walls & ventricular geometry", anchor: "heart-chambers-valves" },
      ],
    },
    {
      id: "conduction",
      tabLabel: "Conduction",
      folio: "III",
      title: "Conducting System",
      subtitle: "Long-axis view of the conducting system",
      image: cardiacConduction,
      alt: "Painted long-axis view of the cardiac conduction system",
      caption: "Long-axis view of the cardiac conducting system",
      labels: [
        {
          latin: "nodus sinuatrialis",
          english: "Sinoatrial (SA) node",
          note: "Crescent of pacemaker cells at the junction of the SVC and right atrium; intrinsic rate 60–100/min.",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "RCA in 60%, LCx in 40% — heavy vagal tone and inferior MI both produce sinus bradycardia.",
          polygon: [
            [0.46, 0.30],
            [0.56, 0.30],
            [0.56, 0.40],
            [0.46, 0.40],
          ],
        },
        {
          latin: "nodus atrioventricularis",
          english: "Atrioventricular (AV) node",
          note: "Sits in Koch’s triangle on the right side of the interatrial septum; introduces the PR delay (~120 ms).",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "AV nodal block causes long PR / dropped beats; vagolytics (atropine) and beta-1 agonists speed conduction.",
          polygon: [
            [0.44, 0.45],
            [0.54, 0.45],
            [0.54, 0.55],
            [0.44, 0.55],
          ],
        },
        {
          latin: "fasciculus atrioventricularis (His)",
          english: "Bundle of His",
          note: "Only normal electrical bridge across the fibrous skeleton; descends into the membranous septum.",
          examTags: [Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Block here gives complete heart block with a narrow-complex junctional escape (~40–60/min).",
          polygon: [
            [0.46, 0.55],
            [0.52, 0.55],
            [0.52, 0.62],
            [0.46, 0.62],
          ],
        },
        {
          latin: "crus dextrum fasciculi",
          english: "Right bundle branch",
          note: "Slim cord on the right side of the septum; supplies the RV via the moderator band.",
          examTags: [Exam.FINAL, Exam.FFICM],
          learningPoint:
            "RBBB: rSR′ in V1, broad S in I/V6 — common and often benign in isolation.",
          polygon: [
            [0.40, 0.62],
            [0.48, 0.62],
            [0.46, 0.82],
            [0.38, 0.82],
          ],
        },
        {
          latin: "crus sinistrum fasciculi",
          english: "Left bundle branch",
          note: "Splits early into anterior and posterior fascicles supplying the LV.",
          examTags: [Exam.FINAL, Exam.FFICM],
          learningPoint:
            "New LBBB with chest pain = STEMI-equivalent until proven otherwise (Sgarbossa criteria).",
          polygon: [
            [0.52, 0.62],
            [0.62, 0.62],
            [0.62, 0.82],
            [0.54, 0.82],
          ],
        },
        {
          latin: "fibrae Purkinje",
          english: "Purkinje fibres",
          note: "Sub-endocardial network spreading the impulse rapidly through the ventricular myocardium (~4 m/s).",
          examTags: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM],
          learningPoint:
            "Rapid spread underlies the narrow QRS; ventricular ectopy has a wide QRS because it bypasses the network.",
          polygon: [
            [0.30, 0.70],
            [0.70, 0.70],
            [0.66, 0.92],
            [0.34, 0.92],
          ],
        },
      ],
      curriculumLinks: [
        { code: "CR_BK_03", exams: [Exam.FINAL], title: "Cardiac conduction system & arrhythmogenesis", anchor: "conducting-system" },
        { code: "CR_BK_06", exams: [Exam.FINAL], title: "Pacemakers, ICDs & peri-operative arrhythmia management", anchor: "conducting-system" },
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Anatomy of the heart — conducting tissue", anchor: "conducting-system" },
      ],
    },
  ],
};

