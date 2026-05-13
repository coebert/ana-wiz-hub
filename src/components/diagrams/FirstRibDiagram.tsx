import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";

type StructureKey =
  | "rib" | "scalene-tubercle" | "subclavian-vein" | "subclavian-artery"
  | "brachial-plexus" | "anterior-scalene" | "middle-scalene" | "scalenus-minimus"
  | "pleural-dome" | "costoclavicular-ligament" | "subclavius" | "phrenic-nerve"
  | "thoracic-duct" | "suprascapular-artery" | "long-thoracic-nerve" | "stellate-ganglion"
  | "intercostal-groove" | "costal-cartilage";

interface Structure {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
  category: "bone" | "muscle" | "vessel" | "nerve" | "other";
}

const structures: Record<StructureKey, Structure> = {
  rib: {
    label: "First Rib",
    color: "hsl(35, 40%, 55%)",
    detail: "Broadest, most curved, and shortest true rib. Flattened with superior and inferior surfaces (unlike other ribs which have inner/outer). Single articular facet on head for T1 vertebra only. Neck is rounded; no angle or costal groove (unlike ribs 2–12). Inner border bears the scalene tubercle. Articulates anteriorly with manubrium via 1st costal cartilage.",
    clinicalNote: "Key landmark for subclavian vessel access, supraclavicular brachial plexus block, and thoracic outlet syndrome (TOS). Cervical rib (C7 variant, 0.5–1%) or elongated C7 transverse process can compress neurovascular structures causing TOS — neurogenic (95%), venous (3%), or arterial (2%) subtypes.",
    category: "bone"
  },
  "scalene-tubercle": {
    label: "Scalene Tubercle (Lisfranc's)",
    color: "hsl(50, 55%, 50%)",
    detail: "A raised ridge on the inner border of the first rib — also called Lisfranc's tubercle. Marks the insertion of scalenus anterior. Divides the superior surface into an anterior groove (subclavian vein) and a posterior groove (subclavian artery). Located approximately at the junction of the anterior and middle thirds of the rib.",
    clinicalNote: "The single most important surface landmark for first rib anatomy. Subclavian vein is ALWAYS anterior; artery is ALWAYS posterior to this tubercle. This invariant relationship is the basis for safe subclavian vascular access.",
    category: "bone"
  },
  "costal-cartilage": {
    label: "First Costal Cartilage",
    color: "hsl(35, 30%, 65%)",
    detail: "Connects the first rib to the manubrium sterni. This is a primary cartilaginous joint (synchondrosis) — NO synovial cavity, unlike ribs 2–7. It is the only costochondral junction that ossifies with age. The costoclavicular ligament attaches to its superior surface.",
    clinicalNote: "The sternocostal joint of the first rib does not move — contributing to the stability of the thoracic inlet. Calcification/ossification is a normal age-related finding on CXR and should not be mistaken for pathology.",
    category: "bone"
  },
  "intercostal-groove": {
    label: "Superior Surface Grooves",
    color: "hsl(35, 35%, 50%)",
    detail: "The superior surface bears TWO grooves separated by the scalene tubercle. The anterior groove (for subclavian vein) is shallow and smooth. The posterior groove (for subclavian artery) is deeper and rougher, with an irregular surface for the inferior trunk of the brachial plexus (T1 contribution).",
    clinicalNote: "Unlike ribs 2–12 which have a costal groove on the inferior border (protecting the intercostal VAN), the first rib has grooves on its SUPERIOR surface. This unique orientation means neurovascular compression occurs from above (clavicle, scalenes) rather than below.",
    category: "bone"
  },
  "subclavian-vein": {
    label: "Subclavian Vein",
    color: "hsl(220, 65%, 50%)",
    detail: "Continuation of the axillary vein at the lateral border of the first rib. Crosses the first rib ANTERIOR to scalenus anterior and the scalene tubercle, in the anterior groove. Receives the external jugular vein. Joins the IJV behind the sternoclavicular joint to form the brachiocephalic vein. Contains a valve just lateral to the IJV junction.",
    clinicalNote: "Infraclavicular subclavian vein cannulation: needle inserted below junction of medial and middle thirds of clavicle, advanced towards the sternal notch. Vein lies anterior to scalenus anterior — separated from the artery by the muscle. Risks: pneumothorax (1–6%), arterial puncture, haemothorax. US guidance reduces complications (NICE CG49).",
    category: "vessel"
  },
  "subclavian-artery": {
    label: "Subclavian Artery",
    color: "hsl(0, 65%, 48%)",
    detail: "Crosses the first rib POSTERIOR to the scalene tubercle and scalenus anterior, in the posterior groove. Lies between scalenus anterior (anteriorly) and scalenus medius (posteriorly). Third part of the subclavian artery (lateral border of scalenus anterior to lateral border of first rib). Becomes axillary artery at the lateral border of the first rib.",
    clinicalNote: "Palpable in the interscalene groove above the first rib — landmark for supraclavicular brachial plexus block. The artery serves as the key sonographic landmark: plexus trunks lie posterolateral to the artery at this level. Inadvertent arterial puncture during subclavian vein cannulation occurs if needle passes too posteriorly.",
    category: "vessel"
  },
  "brachial-plexus": {
    label: "Brachial Plexus Trunks",
    color: "hsl(45, 70%, 48%)",
    detail: "The three trunks (superior C5–6, middle C7, inferior C8–T1) cross the posterior groove of the first rib, posterolateral to the subclavian artery, between scalenus anterior and medius. At this level, trunks are dividing into anterior and posterior divisions. Compact arrangement — 'cluster of grapes' on US. The inferior trunk (C8–T1) lies directly on the first rib in the posterior groove.",
    clinicalNote: "Supraclavicular block targets this level — 'spinal anaesthesia of the arm'. Highest single-injection success rate for complete upper limb anaesthesia. The inferior trunk sits on the first rib → Pancoast tumour causes C8–T1 (Klumpke's) palsy and Horner's syndrome. Risk of pneumothorax (~1%) — use US guidance.",
    category: "nerve"
  },
  "anterior-scalene": {
    label: "Scalenus Anterior",
    color: "hsl(0, 45%, 55%)",
    detail: "Origin: anterior tubercles of C3–C6 transverse processes. Insertion: scalene tubercle on the first rib. Innervation: ventral rami C4–C6. Phrenic nerve descends on its ANTERIOR surface (deep to prevertebral fascia). Subclavian vein crosses anterior; subclavian artery and brachial plexus cross posterior.",
    clinicalNote: "Scalenus anterior is THE key dividing structure of the thoracic inlet. Scalenus anterior syndrome (anterior scalene hypertrophy) → neurovascular compression. During anterior scalenectomy for TOS, the phrenic nerve must be identified and preserved on the anterior surface.",
    category: "muscle"
  },
  "middle-scalene": {
    label: "Scalenus Medius",
    color: "hsl(180, 40%, 50%)",
    detail: "Largest of the scalene muscles. Origin: posterior tubercles of C2–C7 transverse processes. Insertion: superior surface of the first rib, posterior to the subclavian artery groove (between artery groove and tubercle for serratus anterior). Brachial plexus roots emerge between anterior and middle scalene — the interscalene groove.",
    clinicalNote: "The interscalene groove (between anterior and middle scalene) is palpated at C6 level (Chassaignac's tubercle) for interscalene block. The long thoracic nerve (C5–7) pierces or passes posterior to scalenus medius — vulnerable during middle scalenectomy.",
    category: "muscle"
  },
  "scalenus-minimus": {
    label: "Scalenus Minimus / Sibson's Fascia",
    color: "hsl(280, 40%, 55%)",
    detail: "Inconstant muscle (present in 30–50%). Origin: anterior tubercle of C7 transverse process. Insertion: inner border of first rib and Sibson's fascia (suprapleural membrane). Sibson's fascia is a dense fascial dome stretching from C7 TP to the inner border of the first rib, covering and protecting the cervical pleura/lung apex.",
    clinicalNote: "Sibson's fascia tethers the lung apex to the first rib/C7 — preventing excessive lung movement with respiration. When present, scalenus minimus may contribute to TOS by narrowing the interscalene triangle. The suprapleural membrane is the last barrier before the pleural dome during supraclavicular approaches.",
    category: "muscle"
  },
  "pleural-dome": {
    label: "Pleural Dome (Cervical Pleura)",
    color: "hsl(160, 50%, 48%)",
    detail: "The cervical pleura and lung apex project above the first rib, extending ~2.5 cm above the medial third of the clavicle (level of T1 spinous process posteriorly). Covered by Sibson's fascia (suprapleural membrane). Lies medial and deep to the scalene muscles. Relations: subclavian artery arches over it; stellate ganglion lies on its medial aspect.",
    clinicalNote: "At risk during: subclavian vein/artery cannulation, supraclavicular brachial plexus block, IJV cannulation (especially left side — higher dome), stellate ganglion block, and first rib resection. Apical pneumothorax may be missed on supine CXR — look for deep sulcus sign.",
    category: "other"
  },
  "phrenic-nerve": {
    label: "Phrenic Nerve (C3,4,5)",
    color: "hsl(120, 55%, 45%)",
    detail: "Formed from C3,4,5 ventral rami ('C3,4,5 keeps the diaphragm alive'). Descends on the ANTERIOR surface of scalenus anterior, deep to the prevertebral fascia. Crosses the first rib medial to the scalene tubercle, entering the thorax between the subclavian vein and artery. Mixed nerve — motor to diaphragm, sensory to pericardium, mediastinal and diaphragmatic pleura, peritoneum.",
    clinicalNote: "Phrenic nerve palsy is the most significant side effect of interscalene block (100% ipsilateral hemidiaphragm paresis). Avoid bilateral interscalene blocks. Phrenic nerve at risk during: IJV/subclavian cannulation, cervical plexus block, and thoracic inlet surgery. FEV₁ reduction ~25% with unilateral palsy.",
    category: "nerve"
  },
  "long-thoracic-nerve": {
    label: "Long Thoracic Nerve (C5,6,7)",
    color: "hsl(90, 50%, 45%)",
    detail: "Formed from C5,6,7 roots. Pierces or passes posterior to scalenus medius. Descends posterior to the brachial plexus on the surface of serratus anterior. Supplies serratus anterior (protracts and rotates scapula).",
    clinicalNote: "Damage → winged scapula (inability to protract scapula or push against a wall). At risk during: axillary lymph node dissection, first rib resection for TOS, lateral decubitus positioning (compression). Test: push hand against wall — medial border of scapula protrudes.",
    category: "nerve"
  },
  "stellate-ganglion": {
    label: "Stellate Ganglion",
    color: "hsl(30, 60%, 50%)",
    detail: "Fusion of the inferior cervical and first thoracic sympathetic ganglia (present as fused ganglion in ~80%). Lies anterior to the neck of the first rib and the C7–T1 transverse process, posterior to the subclavian artery origin, medial to the vertebral artery. Above Sibson's fascia.",
    clinicalNote: "Stellate ganglion block: local anaesthetic injected at C6 (Chassaignac's tubercle) level — above the ganglion to avoid vertebral artery and pneumothorax. Successful block → Horner's syndrome (miosis, ptosis, anhidrosis, enophthalmos). Indications: CRPS type I, phantom limb pain, refractory angina, hyperhidrosis.",
    category: "nerve"
  },
  "suprascapular-artery": {
    label: "Suprascapular Artery",
    color: "hsl(0, 50%, 60%)",
    detail: "Branch of the thyrocervical trunk (from first part of subclavian artery). Crosses scalenus anterior and the phrenic nerve, then passes over the inferior belly of omohyoid towards the suprascapular notch. Passes OVER the transverse scapular ligament (nerve passes under — 'army goes over the bridge, navy goes under').",
    clinicalNote: "Relevant during supraclavicular block — lies superficial in the posterior triangle. May be encountered during IJV/subclavian access. The suprascapular nerve block (at scapular notch) is used for shoulder analgesia as an alternative/adjunct to interscalene block — avoids phrenic nerve palsy.",
    category: "vessel"
  },
  "thoracic-duct": {
    label: "Thoracic Duct",
    color: "hsl(70, 40%, 50%)",
    detail: "Enters the neck from the posterior mediastinum, arching over the pleural dome on the LEFT side. Passes posterior to the carotid sheath and anterior to the vertebral artery/vein. Drains into the junction of the left subclavian vein and left IJV (left venous angle). The RIGHT lymphatic duct drains the right upper quadrant into the right venous angle.",
    clinicalNote: "At risk during LEFT-sided IJV or subclavian vein cannulation and left neck dissection. Injury → chylothorax (milky pleural fluid, triglycerides >1.1 mmol/L). This is why RIGHT IJV is preferred for central venous access (avoids thoracic duct + straighter path to SVC).",
    category: "vessel"
  },
  "costoclavicular-ligament": {
    label: "Costoclavicular Ligament",
    color: "hsl(25, 45%, 50%)",
    detail: "Strong ligament from the superior surface of the first rib and first costal cartilage to the inferior surface of the medial clavicle (rhomboid impression). Has anterior and posterior laminae. Limits clavicular elevation. Defines the costoclavicular space — through which the subclavian vein, artery, and brachial plexus pass.",
    clinicalNote: "The costoclavicular space is the narrowest point of the thoracic outlet — site of compression in costoclavicular syndrome (TOS subtype). Infraclavicular brachial plexus block targets the cords at this level. Military brace position (shoulders back) narrows this space — used as a provocative test for TOS.",
    category: "other"
  },
  subclavius: {
    label: "Subclavius Muscle",
    color: "hsl(200, 35%, 55%)",
    detail: "Small muscle from the junction of the first rib and first costal cartilage to the inferior surface of the middle third of the clavicle. Innervation: nerve to subclavius (C5,6) — this nerve also gives the accessory phrenic nerve in 30% of individuals. Depresses and stabilises the clavicle.",
    clinicalNote: "Subclavius acts as a protective cushion between the clavicle and the subclavian vessels — may reduce vessel injury in clavicular fractures. The accessory phrenic nerve (from nerve to subclavius) explains incomplete phrenic palsy after phrenic nerve section and is an alternative pathway for diaphragm innervation.",
    category: "muscle"
  }
};

const categories = {
  bone: { label: "Bone & Cartilage", keys: ["rib", "scalene-tubercle", "costal-cartilage", "intercostal-groove"] as StructureKey[] },
  muscle: { label: "Muscles", keys: ["anterior-scalene", "middle-scalene", "scalenus-minimus", "subclavius"] as StructureKey[] },
  vessel: { label: "Vessels & Ducts", keys: ["subclavian-vein", "subclavian-artery", "suprascapular-artery", "thoracic-duct"] as StructureKey[] },
  nerve: { label: "Nerves & Ganglia", keys: ["brachial-plexus", "phrenic-nerve", "long-thoracic-nerve", "stellate-ganglion"] as StructureKey[] },
  other: { label: "Other", keys: ["pleural-dome", "costoclavicular-ligament"] as StructureKey[] },
};

const FirstRibDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("rib");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = structures[selected];
  const categoryLabel: Record<Structure["category"], string> = {
    bone: "Bone & cartilage",
    muscle: "Muscle",
    vessel: "Vessel / duct",
    nerve: "Nerve / ganglion",
    other: "Other",
  };

  const isActive = (key: StructureKey) => selected === key;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="First rib — superior view"
          subtitle="Tap any structure to explore anatomy and clinical relevance"
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="flex-shrink-0 mx-auto">
            <svg viewBox="0 0 420 330" className="w-full max-w-2xl" role="img" aria-label="First rib superior view with neurovascular relations">
              <defs>
                <radialGradient id="fr-bgShade" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.03" />
                </radialGradient>
                <pattern id="fr-boneGrain" patternUnits="userSpaceOnUse" width="6" height="6">
                  <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.2" />
                </pattern>
                <filter id="fr-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
                  <feOffset dx="0" dy="1.5" result="off" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Background depth plate */}
              <rect x="2" y="2" width="416" height="326" rx="10" fill="url(#fr-bgShade)" stroke="hsl(var(--border))" strokeWidth="0.5" />
              {showSutures && <rect x="2" y="2" width="416" height="326" rx="10" fill="url(#fr-boneGrain)" pointerEvents="none" />}

              {/* Compass labels (gated by Labels) */}
              {showLabels && (
                <g pointerEvents="none">
                  <text x="210" y="14" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.55" textAnchor="middle" fontWeight="600">ANTERIOR</text>
                  <text x="210" y="324" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.55" textAnchor="middle" fontWeight="600">POSTERIOR</text>
                  <text x="10" y="168" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">MEDIAL</text>
                  <text x="412" y="168" fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.55" textAnchor="end" fontWeight="600">LATERAL</text>
                </g>
              )}

            {/* Pleural dome - deepest layer */}
            <g className="cursor-pointer" onClick={() => setSelected("pleural-dome")}>
              <ellipse cx="130" cy="180" rx="60" ry="50"
                fill={structures["pleural-dome"].color}
                fillOpacity={isActive("pleural-dome") ? 0.25 : 0.06}
                stroke={structures["pleural-dome"].color}
                strokeWidth={isActive("pleural-dome") ? 1.5 : 0.8}
                strokeDasharray="5 3" />
              <text x="130" y="210" fontSize="6" textAnchor="middle" fill={structures["pleural-dome"].color} opacity="0.7">Pleural Dome</text>
              <text x="130" y="218" fontSize="5" textAnchor="middle" fill={structures["pleural-dome"].color} opacity="0.5">(lung apex)</text>
            </g>

            {/* Stellate ganglion - medial */}
            <g className="cursor-pointer" onClick={() => setSelected("stellate-ganglion")}>
              <ellipse cx="72" cy="230" rx="7" ry="10"
                fill={structures["stellate-ganglion"].color}
                fillOpacity={isActive("stellate-ganglion") ? 0.6 : 0.2}
                stroke={structures["stellate-ganglion"].color}
                strokeWidth={isActive("stellate-ganglion") ? 1.5 : 0.8} />
              <text x="55" y="250" fontSize="5" fill={structures["stellate-ganglion"].color} textAnchor="middle">Stellate</text>
              <text x="55" y="257" fontSize="5" fill={structures["stellate-ganglion"].color} textAnchor="middle">Ganglion</text>
            </g>

            {/* First rib - the bone */}
            <g className="cursor-pointer" onClick={() => setSelected("rib")}>
              {/* Main rib body with bone texture */}
              <path d="M60,230 Q70,180 100,130 Q140,70 220,55 Q300,48 340,65 Q365,78 375,110"
                fill="none"
                stroke={structures.rib.color}
                strokeWidth={isActive("rib") ? 14 : 11}
                strokeLinecap="round"
                opacity={isActive("rib") ? 0.5 : 0.25} />
              {/* Bone texture lines */}
              {[0.2, 0.35, 0.5, 0.65, 0.8].map((t, i) => {
                const x = 60 + t * 315;
                const y = 230 - t * 170 + Math.sin(t * 6) * 20;
                return <circle key={i} cx={x} cy={y} r="1" fill={structures.rib.color} opacity="0.15" />;
              })}
              {/* Head (medial) with facet */}
              <ellipse cx="58" cy="232" rx="8" ry="10"
                fill={structures.rib.color} fillOpacity={isActive("rib") ? 0.4 : 0.2}
                stroke={structures.rib.color} strokeWidth="1.5" />
              <circle cx="58" cy="230" r="3" fill={structures.rib.color} fillOpacity="0.3" />
              <text x="35" y="240" fontSize="5.5" fill={structures.rib.color} fontWeight="bold">Head</text>
              <text x="35" y="247" fontSize="4.5" fill={structures.rib.color} opacity="0.7">(→T1 facet)</text>
              {/* Neck */}
              <text x="72" y="210" fontSize="4.5" fill={structures.rib.color} opacity="0.6">Neck</text>
              {/* Tubercle */}
              <circle cx="95" cy="145" r="4" fill={structures.rib.color} fillOpacity="0.3"
                stroke={structures.rib.color} strokeWidth="0.75" />
              <text x="80" y="150" fontSize="4.5" fill={structures.rib.color} opacity="0.6" textAnchor="end">Tubercle</text>
            </g>

            {/* First costal cartilage */}
            <g className="cursor-pointer" onClick={() => setSelected("costal-cartilage")}>
              <path d="M375,110 Q385,100 395,95 Q400,90 400,80"
                fill="none"
                stroke={structures["costal-cartilage"].color}
                strokeWidth={isActive("costal-cartilage") ? 10 : 7}
                strokeLinecap="round"
                opacity={isActive("costal-cartilage") ? 0.5 : 0.2}
                strokeDasharray="0" />
              <text x="395" y="72" fontSize="5" fill={structures["costal-cartilage"].color} textAnchor="middle">→ Manubrium</text>
              <text x="395" y="105" fontSize="5" fill={structures["costal-cartilage"].color} opacity="0.7" textAnchor="end">Costal</text>
              <text x="395" y="112" fontSize="5" fill={structures["costal-cartilage"].color} opacity="0.7" textAnchor="end">cartilage</text>
            </g>

            {/* Grooves on superior surface */}
            <g className="cursor-pointer" onClick={() => setSelected("intercostal-groove")}>
              {/* Anterior groove (vein) */}
              <path d="M260,52 Q280,50 310,53"
                fill="none"
                stroke={structures["intercostal-groove"].color}
                strokeWidth={isActive("intercostal-groove") ? 2 : 1}
                strokeDasharray="3 2"
                opacity={isActive("intercostal-groove") ? 0.7 : 0.3} />
              {/* Posterior groove (artery) */}
              <path d="M160,78 Q190,65 215,58"
                fill="none"
                stroke={structures["intercostal-groove"].color}
                strokeWidth={isActive("intercostal-groove") ? 2 : 1}
                strokeDasharray="3 2"
                opacity={isActive("intercostal-groove") ? 0.7 : 0.3} />
            </g>

            {/* Scalene tubercle */}
            <g className="cursor-pointer" onClick={() => setSelected("scalene-tubercle")}>
              <ellipse cx="235" cy="55" rx="6" ry="5"
                fill={structures["scalene-tubercle"].color}
                fillOpacity={isActive("scalene-tubercle") ? 0.7 : 0.3}
                stroke={structures["scalene-tubercle"].color}
                strokeWidth={isActive("scalene-tubercle") ? 2 : 1} />
              <text x="235" y="42" fontSize="6" textAnchor="middle" fill={structures["scalene-tubercle"].color} fontWeight="bold">Scalene Tubercle</text>
              <text x="235" y="35" fontSize="5" textAnchor="middle" fill={structures["scalene-tubercle"].color} opacity="0.6">(Lisfranc's)</text>
              {/* Dividing line */}
              <line x1="235" y1="62" x2="235" y2="300" stroke={structures["scalene-tubercle"].color} strokeWidth="0.5" strokeDasharray="3 4" opacity="0.25" />
            </g>

            {/* Scalenus anterior muscle */}
            <g className="cursor-pointer" onClick={() => setSelected("anterior-scalene")}>
              <path d="M235,55 L205,120 L215,135 L250,125 L248,115 L235,55"
                fill={structures["anterior-scalene"].color}
                fillOpacity={isActive("anterior-scalene") ? 0.3 : 0.08}
                stroke={structures["anterior-scalene"].color}
                strokeWidth={isActive("anterior-scalene") ? 1.5 : 0.8} />
              {/* Muscle fibre lines */}
              <line x1="230" y1="70" x2="215" y2="120" stroke={structures["anterior-scalene"].color} strokeWidth="0.5" opacity="0.3" />
              <line x1="240" y1="68" x2="230" y2="118" stroke={structures["anterior-scalene"].color} strokeWidth="0.5" opacity="0.3" />
              <text x="218" y="148" fontSize="5.5" fill={structures["anterior-scalene"].color} fontWeight="bold">Scalenus</text>
              <text x="218" y="156" fontSize="5.5" fill={structures["anterior-scalene"].color}>Anterior</text>
            </g>

            {/* Scalenus medius muscle */}
            <g className="cursor-pointer" onClick={() => setSelected("middle-scalene")}>
              <path d="M190,70 L155,140 L170,155 L195,145 L200,130 L205,80 L190,70"
                fill={structures["middle-scalene"].color}
                fillOpacity={isActive("middle-scalene") ? 0.3 : 0.08}
                stroke={structures["middle-scalene"].color}
                strokeWidth={isActive("middle-scalene") ? 1.5 : 0.8} />
              <line x1="190" y1="85" x2="168" y2="140" stroke={structures["middle-scalene"].color} strokeWidth="0.5" opacity="0.3" />
              <line x1="197" y1="82" x2="180" y2="138" stroke={structures["middle-scalene"].color} strokeWidth="0.5" opacity="0.3" />
              <text x="148" y="165" fontSize="5.5" fill={structures["middle-scalene"].color} fontWeight="bold">Scalenus</text>
              <text x="148" y="173" fontSize="5.5" fill={structures["middle-scalene"].color}>Medius</text>
            </g>

            {/* Interscalene groove annotation */}
            <path d="M202,90 Q200,110 198,128" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
            <text x="188" y="100" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.5" textAnchor="end" transform="rotate(-80,188,100)">interscalene groove</text>

            {/* Subclavian vein - anterior to scalene tubercle */}
            <g className="cursor-pointer" onClick={() => setSelected("subclavian-vein")}>
              <path d="M310,48 Q280,42 260,48 Q250,52 260,55"
                fill="none"
                stroke={structures["subclavian-vein"].color}
                strokeWidth={isActive("subclavian-vein") ? 7 : 5}
                strokeLinecap="round"
                opacity={isActive("subclavian-vein") ? 0.6 : 0.3} />
              {/* Flow direction arrow */}
              <polygon points="308,44 315,48 308,52" fill={structures["subclavian-vein"].color} opacity="0.4" />
              <text x="290" y="38" fontSize="6" textAnchor="middle" fill={structures["subclavian-vein"].color} fontWeight="bold">Subclavian V.</text>
              <text x="290" y="30" fontSize="4.5" textAnchor="middle" fill={structures["subclavian-vein"].color} opacity="0.6">(anterior to tubercle)</text>
            </g>

            {/* Subclavian artery - posterior to scalene tubercle */}
            <g className="cursor-pointer" onClick={() => setSelected("subclavian-artery")}>
              <path d="M120,120 Q160,80 200,68 Q215,62 225,60"
                fill="none"
                stroke={structures["subclavian-artery"].color}
                strokeWidth={isActive("subclavian-artery") ? 5 : 3.5}
                strokeLinecap="round"
                opacity={isActive("subclavian-artery") ? 0.65 : 0.3} />
              {/* Pulsation markers */}
              {isActive("subclavian-artery") && [170, 190, 210].map(x => (
                <circle key={x} cx={x} cy={75 - (x - 170) * 0.3} r="2" fill="none"
                  stroke={structures["subclavian-artery"].color} strokeWidth="0.5" opacity="0.4" />
              ))}
              <text x="140" y="112" fontSize="6" fill={structures["subclavian-artery"].color} fontWeight="bold">Subclavian A.</text>
              <text x="140" y="104" fontSize="4.5" fill={structures["subclavian-artery"].color} opacity="0.6">(posterior to tubercle)</text>
            </g>

            {/* Brachial plexus trunks */}
            <g className="cursor-pointer" onClick={() => setSelected("brachial-plexus")}>
              {/* Three trunks as distinct bundles */}
              <circle cx="185" cy="72" r="4" fill={structures["brachial-plexus"].color}
                fillOpacity={isActive("brachial-plexus") ? 0.7 : 0.25}
                stroke={structures["brachial-plexus"].color} strokeWidth={isActive("brachial-plexus") ? 1.5 : 0.8} />
              <circle cx="178" cy="80" r="4" fill={structures["brachial-plexus"].color}
                fillOpacity={isActive("brachial-plexus") ? 0.7 : 0.25}
                stroke={structures["brachial-plexus"].color} strokeWidth={isActive("brachial-plexus") ? 1.5 : 0.8} />
              <circle cx="172" cy="88" r="4" fill={structures["brachial-plexus"].color}
                fillOpacity={isActive("brachial-plexus") ? 0.7 : 0.25}
                stroke={structures["brachial-plexus"].color} strokeWidth={isActive("brachial-plexus") ? 1.5 : 0.8} />
              {/* Labels for individual trunks */}
              <text x="193" y="70" fontSize="4" fill={structures["brachial-plexus"].color} opacity="0.7">Sup (C5,6)</text>
              <text x="186" y="80" fontSize="4" fill={structures["brachial-plexus"].color} opacity="0.7">Mid (C7)</text>
              <text x="180" y="92" fontSize="4" fill={structures["brachial-plexus"].color} opacity="0.7">Inf (C8,T1)</text>
            </g>

            {/* Phrenic nerve on anterior surface of scalenus anterior */}
            <g className="cursor-pointer" onClick={() => setSelected("phrenic-nerve")}>
              <path d="M248,70 Q255,90 260,115 Q262,130 258,145"
                fill="none"
                stroke={structures["phrenic-nerve"].color}
                strokeWidth={isActive("phrenic-nerve") ? 2.5 : 1.5}
                opacity={isActive("phrenic-nerve") ? 0.8 : 0.35} />
              <circle cx="248" cy="70" r="2" fill={structures["phrenic-nerve"].color} fillOpacity="0.5" />
              <text x="266" y="100" fontSize="5" fill={structures["phrenic-nerve"].color} fontWeight="bold">Phrenic N.</text>
              <text x="266" y="108" fontSize="4" fill={structures["phrenic-nerve"].color} opacity="0.6">(C3,4,5)</text>
              <text x="266" y="116" fontSize="4" fill={structures["phrenic-nerve"].color} opacity="0.5" fontStyle="italic">on ant. surface</text>
            </g>

            {/* Long thoracic nerve - posterior to scalenus medius */}
            <g className="cursor-pointer" onClick={() => setSelected("long-thoracic-nerve")}>
              <path d="M148" fill="none" />
              <path d="M150,140 Q148,165 145,190 Q143,210 140,230"
                fill="none"
                stroke={structures["long-thoracic-nerve"].color}
                strokeWidth={isActive("long-thoracic-nerve") ? 2 : 1}
                opacity={isActive("long-thoracic-nerve") ? 0.7 : 0.3} />
              <circle cx="150" cy="140" r="1.5" fill={structures["long-thoracic-nerve"].color} fillOpacity="0.5" />
              <text x="125" y="200" fontSize="4.5" fill={structures["long-thoracic-nerve"].color} textAnchor="end">Long thoracic N.</text>
              <text x="125" y="207" fontSize="4" fill={structures["long-thoracic-nerve"].color} textAnchor="end" opacity="0.6">(C5,6,7)</text>
            </g>

            {/* Suprascapular artery */}
            <g className="cursor-pointer" onClick={() => setSelected("suprascapular-artery")}>
              <path d="M260,65 Q280,70 300,78 Q320,88 340,100"
                fill="none"
                stroke={structures["suprascapular-artery"].color}
                strokeWidth={isActive("suprascapular-artery") ? 2 : 1}
                opacity={isActive("suprascapular-artery") ? 0.65 : 0.25}
                strokeDasharray="4 2" />
              <text x="310" y="98" fontSize="4.5" fill={structures["suprascapular-artery"].color} opacity="0.7">Suprascapular A.</text>
            </g>

            {/* Thoracic duct (left side) */}
            <g className="cursor-pointer" onClick={() => setSelected("thoracic-duct")}>
              <path d="M85,260 Q90,240 100,220 Q115,195 130,180 Q150,170 170,168"
                fill="none"
                stroke={structures["thoracic-duct"].color}
                strokeWidth={isActive("thoracic-duct") ? 2 : 1}
                opacity={isActive("thoracic-duct") ? 0.6 : 0.2}
                strokeDasharray="3 3" />
              <text x="75" y="270" fontSize="4.5" fill={structures["thoracic-duct"].color}>Thoracic duct</text>
              <text x="75" y="278" fontSize="4" fill={structures["thoracic-duct"].color} opacity="0.6">(left side only)</text>
            </g>

            {/* Sibson's fascia / scalenus minimus */}
            <g className="cursor-pointer" onClick={() => setSelected("scalenus-minimus")}>
              <path d="M115,145 Q125,160 130,180"
                fill="none"
                stroke={structures["scalenus-minimus"].color}
                strokeWidth={isActive("scalenus-minimus") ? 2.5 : 1.5}
                strokeDasharray="4 2"
                opacity={isActive("scalenus-minimus") ? 0.7 : 0.3} />
              <text x="100" y="140" fontSize="4.5" fill={structures["scalenus-minimus"].color} textAnchor="end">Sibson's</text>
              <text x="100" y="147" fontSize="4.5" fill={structures["scalenus-minimus"].color} textAnchor="end">fascia</text>
            </g>

            {/* Costoclavicular ligament */}
            <g className="cursor-pointer" onClick={() => setSelected("costoclavicular-ligament")}>
              <path d="M350,60 Q355,45 360,30"
                fill="none"
                stroke={structures["costoclavicular-ligament"].color}
                strokeWidth={isActive("costoclavicular-ligament") ? 3 : 2}
                opacity={isActive("costoclavicular-ligament") ? 0.6 : 0.25} />
              <text x="365" y="40" fontSize="4.5" fill={structures["costoclavicular-ligament"].color}>Costoclavicular</text>
              <text x="365" y="47" fontSize="4.5" fill={structures["costoclavicular-ligament"].color}>lig. → clavicle</text>
            </g>

            {/* Subclavius muscle */}
            <g className="cursor-pointer" onClick={() => setSelected("subclavius")}>
              <path d="M340,58 Q350,50 365,42 Q375,38 380,35"
                fill="none"
                stroke={structures.subclavius.color}
                strokeWidth={isActive("subclavius") ? 4 : 2.5}
                strokeLinecap="round"
                opacity={isActive("subclavius") ? 0.5 : 0.15} />
              <text x="375" y="28" fontSize="4.5" fill={structures.subclavius.color}>Subclavius m.</text>
            </g>

            {/* Key relationship annotations */}
            <g opacity="0.4">
              <text x="280" y="310" fontSize="5" fill={structures["subclavian-vein"].color}>← Vein ANTERIOR</text>
              <text x="160" y="310" fontSize="5" fill={structures["subclavian-artery"].color} textAnchor="end">Artery POSTERIOR →</text>
              <line x1="235" y1="302" x2="235" y2="315" stroke={structures["scalene-tubercle"].color} strokeWidth="1" />
              <text x="235" y="322" fontSize="4.5" fill={structures["scalene-tubercle"].color} textAnchor="middle">Scalene tubercle</text>
            </g>
          </svg>
        </div>

          <div className="flex-1 min-w-0">
            {/* Standardised detail panel */}
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
              style={{ borderLeftWidth: 4, borderLeftColor: info.color }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-foreground text-sm">{info.label}</p>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{ background: `${info.color}26`, color: info.color }}
                >
                  {categoryLabel[info.category]}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Anatomy:</span> {info.detail}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">Clinical:</span> {info.clinicalNote}
              </p>
            </div>

            {/* Categorised buttons */}
            <div className="mt-3 space-y-2">
              {Object.values(categories).map((cat) => (
                <div key={cat.label}>
                  <p className="text-xs text-muted-foreground font-medium mb-1">{cat.label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.keys.map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelected(key)}
                        className={`text-xs px-2 py-1 rounded border transition-all ${
                          selected === key
                            ? "border-primary bg-primary/10 text-foreground font-medium"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {structures[key].label.split(" (")[0].split(" /")[0]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstRibDiagram;
