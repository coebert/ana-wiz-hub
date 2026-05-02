import type { CorPictumPlate } from "@/components/diagrams/CorPictumFolio";
import { Exam } from "@/data/curriculum";

import airwaySagittal from "@/assets/plates/airway-sagittal.jpg";
import cardiacAnterior from "@/assets/plates/cardiac-anterior.jpg";
import cardiacShortAxis from "@/assets/plates/cardiac-short-axis.jpg";
import cardiacConduction from "@/assets/plates/cardiac-conduction.jpg";
import airwayLaryngoscopic from "@/assets/plates/airway-laryngoscopic.jpg";
import headneckSuperficial from "@/assets/plates/headneck-superficial.jpg";
import headneckCarotid from "@/assets/plates/headneck-carotid.jpg";
import neuroMidsagittal from "@/assets/plates/neuro-midsagittal.jpg";
import neuroCircleWillis from "@/assets/plates/neuro-circle-willis.jpg";
import spinalPosterior from "@/assets/plates/spinal-posterior.jpg";
import spinalSagittal from "@/assets/plates/spinal-sagittal.jpg";
import brachialPlexus from "@/assets/plates/brachial-plexus.jpg";
import brachialInterscalene from "@/assets/plates/brachial-interscalene.jpg";
import upperlimbForearm from "@/assets/plates/upperlimb-forearm.jpg";
import upperlimbAxilla from "@/assets/plates/upperlimb-axilla.jpg";
import lowerlimbFemoral from "@/assets/plates/lowerlimb-femoral.jpg";
import lowerlimbPopliteal from "@/assets/plates/lowerlimb-popliteal.jpg";
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
        { latin: "musculus pectoralis major (reflexus)", english: "Pectoralis major (reflected)", note: "Reflected to expose the axillary contents." },
        { latin: "arteria axillaris", english: "Axillary artery", note: "Three parts defined by pectoralis minor; landmark for axillary block." },
        { latin: "vena axillaris", english: "Axillary vein", note: "Continuation of basilic + brachial veins; CVC target." },
        { latin: "fasciculus lateralis", english: "Lateral cord", note: "Lateral to the second part of axillary artery." },
        { latin: "fasciculus medialis", english: "Medial cord", note: "Medial to axillary artery." },
        { latin: "fasciculus posterior", english: "Posterior cord", note: "Posterior to axillary artery." },
        { latin: "nervus medianus", english: "Median nerve", note: "Forms over the artery from medial and lateral roots." },
        { latin: "nervus ulnaris", english: "Ulnar nerve", note: "Descends medially from the medial cord." },
        { latin: "musculus biceps brachii", english: "Biceps brachii", note: "Long and short heads; supplied by musculocutaneous." },
        { latin: "musculus coracobrachialis", english: "Coracobrachialis", note: "Pierced by musculocutaneous — surgical landmark." },
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
        { latin: "musculus flexor carpi radialis", english: "Flexor carpi radialis", note: "Tendon medial to radial artery at the wrist." },
        { latin: "musculus palmaris longus", english: "Palmaris longus", note: "Absent in ~15%; landmark for median nerve." },
        { latin: "musculus flexor carpi ulnaris", english: "Flexor carpi ulnaris", note: "Tendon overlies ulnar nerve and artery at the wrist." },
        { latin: "musculus brachioradialis", english: "Brachioradialis", note: "Superficial radial nerve emerges from beneath it." },
        { latin: "retinaculum flexorum", english: "Flexor retinaculum", note: "Roof of the carpal tunnel — divided in carpal tunnel release." },
        { latin: "nervus medianus", english: "Median nerve", note: "Through the carpal tunnel; thenar atrophy when compressed." },
        { latin: "nervus ulnaris", english: "Ulnar nerve", note: "In Guyon's canal at the wrist." },
        { latin: "arteria radialis", english: "Radial artery", note: "Standard arterial line site; Allen's test before cannulation." },
        { latin: "arteria ulnaris", english: "Ulnar artery", note: "Dominant supply to the superficial palmar arch." },
        { latin: "vena cephalica", english: "Cephalic vein", note: "Lateral; standard IV cannulation site." },
        { latin: "vena basilica", english: "Basilic vein", note: "Medial; PICC line target." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Forearm & wrist nerve anatomy", anchor: "terminal-nerves" },
        { code: "RU_BK_01", exams: [Exam.FINAL], title: "Forearm & wrist blocks (median, ulnar, radial)", anchor: "terminal-nerves" },
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
        { latin: "ligamentum inguinale", english: "Inguinal ligament", note: "Superior border of the triangle." },
        { latin: "musculus sartorius", english: "Sartorius", note: "Lateral border of the triangle." },
        { latin: "musculus adductor longus", english: "Adductor longus", note: "Medial border of the triangle." },
        { latin: "nervus femoralis", english: "Femoral nerve", note: "Lateral in the NAVL arrangement; outside the femoral sheath." },
        { latin: "arteria femoralis", english: "Femoral artery", note: "Mid-inguinal point landmark; arterial line site." },
        { latin: "vena femoralis", english: "Femoral vein", note: "Medial to the artery; emergency CVC site." },
        { latin: "vena saphena magna", english: "Great saphenous vein", note: "Joins femoral vein at the saphenofemoral junction." },
        { latin: "musculus iliopsoas", english: "Iliopsoas", note: "Floor of the triangle laterally." },
        { latin: "musculus pectineus", english: "Pectineus", note: "Floor of the triangle medially." },
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
        { latin: "musculus biceps femoris", english: "Biceps femoris", note: "Superolateral border; common peroneal nerve hugs its medial edge." },
        { latin: "musculus semitendinosus", english: "Semitendinosus", note: "Superomedial border." },
        { latin: "musculus semimembranosus", english: "Semimembranosus", note: "Superomedial border, deep to semitendinosus." },
        { latin: "musculus gastrocnemius", english: "Gastrocnemius", note: "Inferior borders — both heads frame the fossa." },
        { latin: "nervus tibialis", english: "Tibial nerve", note: "Central in the fossa; main target of popliteal sciatic block." },
        { latin: "nervus peroneus communis", english: "Common peroneal nerve", note: "Hugs the medial border of biceps femoris." },
        { latin: "vena poplitea", english: "Popliteal vein", note: "Superficial to the artery." },
        { latin: "arteria poplitea", english: "Popliteal artery", note: "Deepest structure; aneurysm site." },
        { latin: "vena saphena parva", english: "Small saphenous vein", note: "Pierces popliteal fascia to drain into popliteal vein." },
      ],
      curriculumLinks: [
        { code: "AN_BK_03", exams: [Exam.PRIMARY], title: "Popliteal fossa & sciatic nerve anatomy", anchor: "sacral-plexus" },
        { code: "RU_BK_02", exams: [Exam.FINAL], title: "Popliteal sciatic nerve block — landmarks & sonoanatomy", anchor: "sacral-plexus" },
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
  atlasTitle: "Atlas Anatomicus — Cor et Vasa Magna",
  atlasSubtitle: "Painted plates of the heart and great vessels",
  plates: [
    {
      id: "anterior",
      tabLabel: "Anterior",
      folio: "I",
      title: "Cor in Situ",
      subtitle: "Anterior view, pericardium opened",
      image: cardiacAnterior,
      alt: "Painted anterior view of the heart and great vessels with coronary arteries",
      caption: "Aspectus anterior cordis et vasorum magnorum",
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
      title: "Sectio Transversalis",
      subtitle: "Mid-ventricular short-axis cross-section",
      image: cardiacShortAxis,
      alt: "Painted short-axis cross-section of the heart at mid-ventricular level",
      caption: "Sectio brevis-axialis ventriculorum mediorum",
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
      title: "Systema Conducens",
      subtitle: "Long-axis view of the conducting system",
      image: cardiacConduction,
      alt: "Painted long-axis view of the cardiac conduction system",
      caption: "Sectio longitudinalis systematis conducentis cordis",
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

