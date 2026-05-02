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
  atlasTitle: "Atlas Anatomicus — Vias Aerias Superiores",
  atlasSubtitle: "Painted plates of the upper airway and larynx",
  plates: [
    {
      id: "sagittal", tabLabel: "Sagittal", folio: "I",
      title: "Oropharynx et Larynx", subtitle: "Sagittal view of the airway",
      image: airwaySagittal, alt: "Painted sagittal section of the upper airway",
      caption: "Sectio sagittalis viarum aeriarum superiorum",
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
    },
    {
      id: "laryngoscopic", tabLabel: "Laryngoscopic", folio: "II",
      title: "Aditus Laryngis", subtitle: "View through the laryngoscope",
      image: airwayLaryngoscopic, alt: "Painted superior view of the laryngeal inlet",
      caption: "Aspectus superior aditus laryngis",
      labels: [
        { latin: "epiglottis", english: "Epiglottis", note: "Anterior boundary of the inlet." },
        { latin: "plica aryepiglottica", english: "Aryepiglottic fold", note: "Lateral wall of the inlet; landmark for SAD seating." },
        { latin: "cartilago arytenoidea", english: "Arytenoid cartilage", note: "Posterior cord attachment; rotation opens/closes the glottis." },
        { latin: "plica vocalis", english: "True vocal cord", note: "Pearl-white; the target structure for tube placement." },
        { latin: "plica vestibularis", english: "False cord", note: "Pink, above the true cords — do not mistake for them." },
        { latin: "recessus piriformis", english: "Piriform recess", note: "Lateral pooling site for secretions and foreign bodies." },
        { latin: "commissura posterior", english: "Posterior commissure", note: "Cormack–Lehane grading reference point." },
      ],
    },
  ],
};

export const headNeckFolio: CorPictumFolioData = {
  atlasTitle: "Atlas Anatomicus — Caput et Collum",
  atlasSubtitle: "Painted plates of the head and neck",
  plates: [
    {
      id: "superficial", tabLabel: "Superficial", folio: "I",
      title: "Regio Parotidea et Cervicalis", subtitle: "Superficial dissection",
      image: headneckSuperficial, alt: "Painted superficial dissection of the head and neck",
      caption: "Dissectio superficialis regionis parotideae et cervicalis",
      labels: [
        { latin: "glandula parotidea", english: "Parotid gland", note: "Facial nerve traverses it — surgically perilous." },
        { latin: "nervus facialis", english: "Facial nerve (CN VII)", note: "Five terminal branches: temporal, zygomatic, buccal, marginal mandibular, cervical." },
        { latin: "nervus auricularis magnus", english: "Great auricular nerve", note: "C2–C3; sensation to lower ear and angle of jaw." },
        { latin: "vena jugularis externa", english: "External jugular vein", note: "Surface vein — useful emergency access." },
        { latin: "musculus sternocleidomastoideus", english: "Sternocleidomastoid", note: "Divides anterior from posterior cervical triangle." },
        { latin: "trigonum cervicale anterius", english: "Anterior triangle", note: "Contains carotid sheath, larynx, thyroid." },
        { latin: "trigonum cervicale posterius", english: "Posterior triangle", note: "Contains accessory nerve, brachial plexus roots." },
      ],
    },
    {
      id: "carotid", tabLabel: "Carotid sheath", folio: "II",
      title: "Vagina Carotica", subtitle: "Deep dissection of the carotid sheath",
      image: headneckCarotid, alt: "Painted deep dissection of the carotid sheath",
      caption: "Dissectio profunda vaginae caroticae",
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
    },
  ],
};

export const neuroFolio: CorPictumFolioData = {
  atlasTitle: "Atlas Anatomicus — Encephalon",
  atlasSubtitle: "Painted plates of the brain and its arteries",
  plates: [
    {
      id: "midsagittal", tabLabel: "Midsagittal", folio: "I",
      title: "Sectio Mediana Encephali", subtitle: "Midline section of the brain",
      image: neuroMidsagittal, alt: "Painted midsagittal section of the brain",
      caption: "Sectio sagittalis mediana encephali",
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
    },
    {
      id: "willis", tabLabel: "Circle of Willis", folio: "II",
      title: "Circulus Arteriosus Willisii", subtitle: "Arterial circle at the base of the brain",
      image: neuroCircleWillis, alt: "Painted inferior view of the Circle of Willis",
      caption: "Circulus arteriosus cerebri — aspectus inferior",
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
    },
  ],
};

export const spinalFolio: CorPictumFolioData = {
  atlasTitle: "Atlas Anatomicus — Columna Vertebralis",
  atlasSubtitle: "Painted plates of the spinal cord and neuraxial spaces",
  plates: [
    {
      id: "posterior", tabLabel: "Posterior", folio: "I",
      title: "Medulla Spinalis", subtitle: "Posterior view of the cord and cauda equina",
      image: spinalPosterior, alt: "Painted posterior view of the lumbar spinal cord",
      caption: "Aspectus posterior medullae spinalis et caudae equinae",
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
    },
    {
      id: "sagittal", tabLabel: "Sagittal", folio: "II",
      title: "Spatium Epidurale et Subarachnoideum", subtitle: "Sagittal view for neuraxial anaesthesia",
      image: spinalSagittal, alt: "Painted midsagittal section of the lumbar spine showing neuraxial spaces",
      caption: "Sectio sagittalis columnae lumbalis — accessus neuraxialis",
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
    },
  ],
};

export const brachialFolio: CorPictumFolioData = {
  atlasTitle: "Atlas Anatomicus — Plexus Brachialis",
  atlasSubtitle: "Painted plates of the brachial plexus",
  plates: [
    {
      id: "plexus", tabLabel: "Whole plexus", folio: "I",
      title: "Plexus Brachialis", subtitle: "Roots, trunks, divisions, cords, branches",
      image: brachialPlexus, alt: "Painted view of the brachial plexus",
      caption: "Plexus brachialis — regiones supraclavicularis et infraclavicularis",
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
    },
    {
      id: "interscalene", tabLabel: "Interscalene", folio: "II",
      title: "Sulcus Interscalenicus", subtitle: "Cross-section at C6 for interscalene block",
      image: brachialInterscalene, alt: "Painted cross-section of the interscalene groove at C6",
      caption: "Sectio transversa colli ad C6 — sulcus interscalenicus",
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
    },
  ],
};

export const upperLimbFolio: CorPictumFolioData = {
  atlasTitle: "Atlas Anatomicus — Membrum Superius",
  atlasSubtitle: "Painted plates of the upper limb",
  plates: [
    {
      id: "axilla", tabLabel: "Axilla", folio: "I",
      title: "Regio Axillaris", subtitle: "Cords of the plexus around the axillary artery",
      image: upperlimbAxilla, alt: "Painted view of the axilla and proximal upper arm",
      caption: "Dissectio regionis axillaris et brachii proximalis",
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
    },
    {
      id: "forearm", tabLabel: "Forearm & wrist", folio: "II",
      title: "Antebrachium et Carpus", subtitle: "Anterior forearm with carpal tunnel",
      image: upperlimbForearm, alt: "Painted anterior view of the forearm and hand",
      caption: "Aspectus anterior antebrachii et manus",
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
    },
  ],
};

export const lowerLimbFolio: CorPictumFolioData = {
  atlasTitle: "Atlas Anatomicus — Membrum Inferius",
  atlasSubtitle: "Painted plates of the lower limb",
  plates: [
    {
      id: "femoral", tabLabel: "Femoral triangle", folio: "I",
      title: "Trigonum Femorale", subtitle: "Anterior thigh and femoral sheath",
      image: lowerlimbFemoral, alt: "Painted anterior view of the femoral triangle",
      caption: "Trigonum femorale — aspectus anterior",
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
    },
    {
      id: "popliteal", tabLabel: "Popliteal fossa", folio: "II",
      title: "Fossa Poplitea", subtitle: "Posterior knee for sciatic block",
      image: lowerlimbPopliteal, alt: "Painted posterior view of the popliteal fossa",
      caption: "Fossa poplitea — aspectus posterior",
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
    },
  ],
};

export const thoracicFolio: CorPictumFolioData = {
  atlasTitle: "Atlas Anatomicus — Thorax",
  atlasSubtitle: "Painted plates of the thoracic cavity",
  plates: [
    {
      id: "anterior", tabLabel: "Anterior", folio: "I",
      title: "Cavitas Thoracis", subtitle: "Anterior view with chest wall removed",
      image: thoracicAnterior, alt: "Painted anterior view of the thoracic cavity",
      caption: "Aspectus anterior cavitatis thoracis",
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
    },
    {
      id: "mediastinum", tabLabel: "Mediastinum", folio: "II",
      title: "Mediastinum Dextrum", subtitle: "Right lateral view after lung removal",
      image: thoracicMediastinum, alt: "Painted lateral view of the right mediastinum",
      caption: "Aspectus lateralis mediastini dextri",
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
    },
  ],
};

export const abdominalFolio: CorPictumFolioData = {
  atlasTitle: "Atlas Anatomicus — Abdomen",
  atlasSubtitle: "Painted plates of the abdominal cavity",
  plates: [
    {
      id: "anterior", tabLabel: "Anterior", folio: "I",
      title: "Cavitas Abdominis", subtitle: "Anterior view with greater omentum removed",
      image: abdominalAnterior, alt: "Painted anterior view of the abdominal viscera",
      caption: "Aspectus anterior viscerum abdominis",
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
    },
    {
      id: "retroperitoneum", tabLabel: "Retroperitoneum", folio: "II",
      title: "Spatium Retroperitoneale", subtitle: "Posterior view of the great vessels and kidneys",
      image: abdominalRetroperitoneum, alt: "Painted view of the retroperitoneum",
      caption: "Aspectus posterior spatii retroperitonealis",
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
    },
  ],
};
