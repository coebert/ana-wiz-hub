import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { PlexusDetailPanel, ROOT_COLORS } from "./plexusShared";
import { DiagramFigure } from "./_shared/DiagramFigure";

type LevelKey = "roots" | "trunks" | "divisions" | "cords" | "branches";

interface PlexusElement {
  id: string;
  label: string;
  level: LevelKey;
  x: number;
  y: number;
  color: string;
  detail: string;
  connections: string[];
}

const levelInfo: Record<LevelKey, { label: string; y: number; blockApproach: string }> = {
  roots: { label: "Roots (C5–T1)", y: 60, blockApproach: "Interscalene block — needle between anterior & middle scalene at C6 (Chassaignac's tubercle). US: roots appear as 'traffic light' hypoechoic circles between scalenes. 100% ipsilateral phrenic palsy." },
  trunks: { label: "Trunks", y: 140, blockApproach: "Supraclavicular block — trunks/divisions clustered as 'bunch of grapes' lateral and superior to subclavian artery. Most compact point → most complete arm block. Pneumothorax risk <1% with US." },
  divisions: { label: "Divisions", y: 215, blockApproach: "Behind the clavicle. Anterior divisions → flexor compartments. Posterior divisions → extensor compartments. Not typically targeted for block." },
  cords: { label: "Cords", y: 290, blockApproach: "Infraclavicular block — cords surround 2nd part axillary artery deep to pectoralis major/minor. US: artery at 6 o'clock to clavicle. Good catheter site (away from neck)." },
  branches: { label: "Terminal Branches", y: 375, blockApproach: "Axillary block — terminal branches around 3rd part axillary artery in axilla. Safest (no pneumothorax). Musculocutaneous already in coracobrachialis — block separately." },
};

const elements: PlexusElement[] = [
  // Roots
  { id: "c5", label: "C5", level: "roots", x: 100, y: 60, color: ROOT_COLORS.C5, detail: "Ventral ramus of C5. Emerges between anterior and middle scalene muscles at level of cricoid cartilage. Contributions: dorsal scapular nerve (C5) → rhomboids; nerve to subclavius; phrenic nerve (C3,4,5 — 'keeps the diaphragm alive').", connections: ["sup"] },
  { id: "c6", label: "C6", level: "roots", x: 155, y: 60, color: ROOT_COLORS.C6, detail: "Ventral ramus of C6. Exits at Chassaignac's tubercle (C6 transverse process — landmark for interscalene block). Long thoracic nerve (C5,6,7) → serratus anterior ('winged scapula' if damaged).", connections: ["sup"] },
  { id: "c7", label: "C7", level: "roots", x: 210, y: 60, color: ROOT_COLORS.C7, detail: "Ventral ramus of C7. Largest root — forms entire middle trunk alone. Long thoracic nerve contribution (C5,6,7). C7 dermatome = middle finger (exam favourite).", connections: ["mid"] },
  { id: "c8", label: "C8", level: "roots", x: 265, y: 60, color: ROOT_COLORS.C8, detail: "Ventral ramus of C8. Passes over 1st rib posterior to subclavian artery. Joins T1 to form inferior trunk. Vulnerable to cervical rib compression (thoracic outlet syndrome).", connections: ["inf"] },
  { id: "t1", label: "T1", level: "roots", x: 320, y: 60, color: ROOT_COLORS.T1, detail: "Ventral ramus of T1. Smallest root. Joins C8 → inferior trunk. Carries sympathetic fibres to stellate ganglion — T1 avulsion → Horner's syndrome (miosis, ptosis, anhidrosis, enophthalmos).", connections: ["inf"] },

  // Trunks
  { id: "sup", label: "Superior (C5,6)", level: "trunks", x: 120, y: 140, color: "hsl(10, 65%, 52%)", detail: "Erb's point: union of C5,6. Suprascapular nerve branches here (C5,6) → supraspinatus (abduction 0-15°) & infraspinatus (lateral rotation). Upper trunk palsy = Erb-Duchenne: 'waiter's tip' (arm adducted, medially rotated, extended elbow).", connections: ["ant-sup", "post-sup"] },
  { id: "mid", label: "Middle (C7)", level: "trunks", x: 210, y: 140, color: "hsl(45, 65%, 48%)", detail: "C7 only — no named branches from trunk itself. Lies on 1st rib between scalene muscles. The 'silent trunk' — isolated injuries rare.", connections: ["ant-mid", "post-mid"] },
  { id: "inf", label: "Inferior (C8,T1)", level: "trunks", x: 300, y: 140, color: "hsl(175, 50%, 42%)", detail: "C8,T1. Most inferior — crosses 1st rib, vulnerable to traction (Klumpke's palsy → claw hand + T1 Horner's). Compressed by cervical rib/Pancoast tumour (thoracic outlet syndrome).", connections: ["ant-inf", "post-inf"] },

  // Divisions
  { id: "ant-sup", label: "Ant", level: "divisions", x: 85, y: 215, color: "hsl(10, 55%, 52%)", detail: "Anterior division of superior trunk → joins lateral cord. Anterior divisions supply flexor (anterior) compartments of the limb.", connections: ["lateral"] },
  { id: "post-sup", label: "Post", level: "divisions", x: 140, y: 215, color: "hsl(10, 40%, 50%)", detail: "Posterior division of superior trunk → joins posterior cord. Posterior divisions supply extensor (posterior) compartments.", connections: ["posterior"] },
  { id: "ant-mid", label: "Ant", level: "divisions", x: 185, y: 215, color: "hsl(45, 55%, 48%)", detail: "Anterior division of middle trunk → joins lateral cord.", connections: ["lateral"] },
  { id: "post-mid", label: "Post", level: "divisions", x: 230, y: 215, color: "hsl(45, 40%, 46%)", detail: "Posterior division of middle trunk → joins posterior cord.", connections: ["posterior"] },
  { id: "ant-inf", label: "Ant", level: "divisions", x: 280, y: 215, color: "hsl(175, 45%, 42%)", detail: "Anterior division of inferior trunk → becomes medial cord.", connections: ["medial"] },
  { id: "post-inf", label: "Post", level: "divisions", x: 330, y: 215, color: "hsl(175, 35%, 42%)", detail: "Posterior division of inferior trunk → joins posterior cord. All three posterior divisions unite to form the largest cord.", connections: ["posterior"] },

  // Cords
  { id: "lateral", label: "Lateral (C5-7)", level: "cords", x: 110, y: 290, color: "hsl(30, 65%, 50%)", detail: "C5,6,7. Lateral to 2nd part of axillary artery. Branches: lateral pectoral nerve (pec major clavicular head), musculocutaneous nerve, lateral contribution to median nerve. Lateral + medial roots form median nerve as an 'M' or 'Y' junction.", connections: ["musculocut", "median"] },
  { id: "posterior", label: "Posterior (C5-T1)", level: "cords", x: 220, y: 290, color: "hsl(270, 48%, 50%)", detail: "C5–T1. All 3 posterior divisions — behind axillary artery. Branches: upper subscapular (subscapularis), thoracodorsal (latissimus dorsi — 'the climbing nerve'), lower subscapular (subscapularis + teres major), axillary nerve, radial nerve. Largest cord.", connections: ["axillary", "radial"] },
  { id: "medial", label: "Medial (C8,T1)", level: "cords", x: 330, y: 290, color: "hsl(210, 55%, 50%)", detail: "C8,T1. Medial to axillary artery. Branches: medial pectoral nerve (both pec muscles — pierces pec minor), medial cutaneous nerve of arm (medial brachial), medial cutaneous nerve of forearm (medial antebrachial), ulnar nerve, medial contribution to median nerve.", connections: ["ulnar", "median"] },

  // Terminal branches
  { id: "musculocut", label: "Musculocutaneous", level: "branches", x: 55, y: 375, color: "hsl(30, 65%, 50%)", detail: "C5,6,7 (lateral cord). Pierces coracobrachialis (the only nerve to do so — key landmark). Motor: coracobrachialis, biceps brachii, brachialis (all anterior arm flexors). Becomes lateral cutaneous nerve of forearm (sensory). Must be blocked separately in axillary approach.", connections: [] },
  { id: "axillary", label: "Axillary", level: "branches", x: 140, y: 375, color: "hsl(270, 48%, 50%)", detail: "C5,6 (posterior cord). Passes through quadrangular space with posterior circumflex humeral artery. Motor: deltoid (abduction 15-90°), teres minor. Sensory: 'regimental badge area' (lateral shoulder). Vulnerable in surgical neck of humerus fractures and shoulder dislocations.", connections: [] },
  { id: "median", label: "Median", level: "branches", x: 220, y: 375, color: "hsl(330, 52%, 50%)", detail: "C5–T1 (lateral + medial cords — dual root). Motor: pronators, most forearm flexors (except FCU + medial FDP), thenar muscles (LOAF = Lateral 2 lumbricals, Opponens pollicis, Abductor pollicis brevis, Flexor pollicis brevis superficial head). Sensory: lateral 3½ digits (palmar). Carpal tunnel syndrome. Anterior interosseous branch (pure motor — no sensory loss).", connections: [] },
  { id: "radial", label: "Radial", level: "branches", x: 295, y: 375, color: "hsl(270, 48%, 50%)", detail: "C5–T1 (posterior cord). Largest terminal branch. Motor: ALL extensors of arm and forearm — triceps, anconeus, brachioradialis, supinator, wrist/finger extensors. Sensory: posterior arm, posterior forearm, dorsal 3½ digits (proximal phalanges only). Spiral groove of humerus → 'Saturday night palsy' (wrist drop). Posterior interosseous nerve (pure motor branch).", connections: [] },
  { id: "ulnar", label: "Ulnar", level: "branches", x: 370, y: 375, color: "hsl(210, 55%, 50%)", detail: "C8,T1 (medial cord — no lateral cord contribution). Motor: most intrinsic hand muscles (all interossei, medial 2 lumbricals, hypothenar muscles, adductor pollicis, FPB deep head), FCU, medial half of FDP. Sensory: medial 1½ digits (both palmar and dorsal). Most commonly injured nerve at elbow (cubital tunnel). Claw hand deformity ('hand of benediction' vs ulnar paradox).", connections: [] },
];

const annotationBranches = [
  { fromId: "sup", label: "Suprascapular n.", target: { x: 30, y: 125 }, detail: "C5,6 — shoulder abduction/lateral rotation" },
  { fromId: "c5", label: "Dorsal scapular n.", target: { x: 45, y: 45 }, detail: "C5 — rhomboids" },
  { fromId: "c6", label: "Long thoracic n.", target: { x: 45, y: 85 }, detail: "C5,6,7 — serratus anterior" },
  { fromId: "lateral", label: "Lat. pectoral n.", target: { x: 30, y: 270 }, detail: "Pec major (clavicular)" },
  { fromId: "posterior", label: "Thoracodorsal n.", target: { x: 200, y: 260 }, detail: "Latissimus dorsi" },
  { fromId: "medial", label: "Med. pectoral n.", target: { x: 380, y: 270 }, detail: "Both pectorals" },
];

interface BlockSite {
  id: string;
  label: string;
  x: number;
  y: number;
  level: LevelKey;
  color: string;
  coverage: string;
  usLandmarks: string;
  needleDirection: string;
  volume: string;
  risks: string;
  indication: string;
}

const blockSites: BlockSite[] = [
  {
    id: "interscalene", label: "Interscalene", x: 155, y: 35,
    level: "roots", color: "hsl(0, 60%, 55%)",
    coverage: "Shoulder + lateral upper arm (C5–C7). Spares ulnar nerve (C8–T1) — poor for hand/forearm surgery.",
    usLandmarks: "Linear probe on lateral neck at C6. Roots as hypoechoic circles ('traffic lights') between anterior and middle scalene muscles.",
    needleDirection: "In-plane, lateral to medial (or posterior to anterior). Deposit LA around C5–C6 roots.",
    volume: "15–20 ml",
    risks: "Phrenic nerve palsy (100%) — avoid bilateral/respiratory disease. Horner's syndrome, recurrent laryngeal nerve palsy, vertebral artery injection. Epidural/intrathecal spread if too medial.",
    indication: "Shoulder arthroscopy/arthroplasty, proximal humerus fracture, clavicle surgery",
  },
  {
    id: "supraclavicular", label: "Supraclavicular", x: 210, y: 145,
    level: "trunks", color: "hsl(45, 60%, 50%)",
    coverage: "Entire upper limb below shoulder ('spinal of the arm'). Most complete single-injection block. May miss suprascapular nerve (shoulder) and intercostobrachial (medial arm).",
    usLandmarks: "Linear probe in supraclavicular fossa, coronal oblique. Trunks/divisions as 'bunch of grapes' lateral and superior to subclavian artery. First rib deep (hyperechoic line).",
    needleDirection: "In-plane, lateral to medial. Target 'corner pocket' between artery and first rib. Avoid pleura.",
    volume: "20–25 ml",
    risks: "Pneumothorax (<1% with US). Phrenic palsy (50–67%). Subclavian artery puncture.",
    indication: "Elbow, forearm, wrist, and hand surgery. Excellent for day-case upper limb surgery.",
  },
  {
    id: "infraclavicular", label: "Infraclavicular", x: 220, y: 270,
    level: "cords", color: "hsl(270, 45%, 50%)",
    coverage: "Below mid-humerus — elbow, forearm, wrist, hand. Better ulnar coverage than supraclavicular. Ideal catheter site (pectoralis muscle splints catheter).",
    usLandmarks: "Linear/curvilinear probe inferior to clavicle, parasagittal. Axillary artery deep to pectoralis major and minor. Cords named by relationship to artery (lateral/posterior/medial).",
    needleDirection: "In-plane, cephalad to caudad (sagittal) or lateral to medial. Target posterior cord (6 o'clock to artery) — U-shaped spread around artery covers all three cords.",
    volume: "20–30 ml",
    risks: "Pneumothorax (very rare with US). Vascular puncture. Deeper block — more difficult in obese patients.",
    indication: "Forearm and hand surgery, especially when catheter needed. Avoids phrenic nerve palsy.",
  },
  {
    id: "axillary", label: "Axillary", x: 220, y: 395,
    level: "branches", color: "hsl(200, 50%, 50%)",
    coverage: "Below elbow — forearm, wrist, hand. Must separately block musculocutaneous nerve (in coracobrachialis). Does NOT cover shoulder or upper arm.",
    usLandmarks: "Linear probe in axilla, arm abducted 90°. Axillary artery surrounded by median (superficial), ulnar (superficial-medial), radial (posterior), with musculocutaneous in coracobrachialis (lateral).",
    needleDirection: "In-plane, multiple perivascular injections targeting each nerve individually (preferred) or single peri-arterial injection. Musculocutaneous blocked within coracobrachialis.",
    volume: "5–8 ml per nerve (total 20–30 ml)",
    risks: "Safest approach — no pneumothorax, no neuraxial spread. Vascular puncture (compress). Haematoma.",
    indication: "Hand and forearm surgery. Best safety profile. Day case. Anticoagulated patients (compressible site).",
  },
];

const HandDermatomeMap = () => (
  <svg viewBox="0 0 140 150" className="w-28 sm:w-32 mx-auto">
    <path d="M 70 145 Q 30 140 20 110 Q 15 90 20 70 L 10 30 L 20 15 L 30 30 L 30 55 L 35 20 L 45 5 L 55 20 L 50 55 L 55 15 L 65 2 L 75 15 L 70 55 L 80 18 L 90 5 L 95 22 L 85 55 L 100 35 L 110 30 L 105 50 L 90 65 Q 95 90 120 100 Q 125 105 120 110 Q 100 140 70 145 Z"
      fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.6" />
    <path d="M 100 35 L 110 30 L 105 50 L 90 65 Q 95 90 120 100 L 120 110 Q 105 120 90 125 L 85 100 L 85 55 L 100 35 Z"
      fill={ROOT_COLORS.C6} fillOpacity="0.25" stroke={ROOT_COLORS.C6} strokeWidth="0.75" />
    <text x="105" y="80" fontSize="8" fill={ROOT_COLORS.C6} fontWeight="bold">C6</text>
    <path d="M 55 15 L 65 2 L 75 15 L 70 55 L 50 55 L 55 15 Z"
      fill={ROOT_COLORS.C7} fillOpacity="0.25" stroke={ROOT_COLORS.C7} strokeWidth="0.75" />
    <text x="60" y="38" fontSize="7" fill={ROOT_COLORS.C7} fontWeight="bold">C7</text>
    <path d="M 10 30 L 20 15 L 30 30 L 30 55 L 20 70 Q 15 90 20 110 Q 30 140 50 143 L 50 55 L 35 20 L 45 5 L 50 10 L 50 55"
      fill={ROOT_COLORS.C8} fillOpacity="0.2" stroke={ROOT_COLORS.C8} strokeWidth="0.75" />
    <text x="22" y="80" fontSize="8" fill={ROOT_COLORS.C8} fontWeight="bold">C8</text>
    <path d="M 20 110 Q 30 140 50 143 L 70 145 L 70 130 L 40 125 L 25 112 Z"
      fill={ROOT_COLORS.T1} fillOpacity="0.2" stroke={ROOT_COLORS.T1} strokeWidth="0.75" />
    <text x="45" y="140" fontSize="7" fill={ROOT_COLORS.T1} fontWeight="bold">T1</text>
    <text x="70" y="115" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Palmar</text>
  </svg>
);

const BrachialPlexusDiagram = () => {
  const [selected, setSelected] = useState<string>("lateral");
  const [highlightLevel, setHighlightLevel] = useState<LevelKey | null>(null);
  const [showDermatomes, setShowDermatomes] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [showBlockSites, setShowBlockSites] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  const activeEl = elements.find(e => e.id === selected);
  const activeBlock = blockSites.find(b => b.id === selectedBlock);

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4 space-y-4">
        <DiagramToggleBar
          title="Interactive brachial plexus"
          subtitle="Tap any element for details. Tap level labels for block approaches."
          toggles={[
            { label: "Block sites", active: showBlockSites, onChange: () => setShowBlockSites(!showBlockSites) },
            { label: "Branches", active: showAnnotations, onChange: () => setShowAnnotations(!showAnnotations) },
            { label: "Dermatomes", active: showDermatomes, onChange: () => setShowDermatomes(!showDermatomes) },
          ]}
        />

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <svg viewBox="-10 -5 440 450" className="w-full max-w-2xl mx-auto" style={{ height: "auto" }}>
            <defs>
              <linearGradient id="scaleneGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 25%, 55%)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="hsl(0, 20%, 45%)" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="scalenemidGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 20%, 50%)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="hsl(0, 15%, 40%)" stopOpacity="0.03" />
              </linearGradient>
              <linearGradient id="boneGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(40, 30%, 75%)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(40, 25%, 60%)" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="pectoralisGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 30%, 50%)" stopOpacity="0.06" />
                <stop offset="100%" stopColor="hsl(0, 25%, 42%)" stopOpacity="0.02" />
              </linearGradient>
              {/* Needle glow */}
              <filter id="needleGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <marker id="needleTip" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M0,0 L6,3 L0,6 Z" fill="hsl(140, 60%, 45%)" />
              </marker>
              {/* Muscle fibre pattern */}
              <pattern id="muscleFibre" patternUnits="userSpaceOnUse" width="4" height="8" patternTransform="rotate(15)">
                <line x1="2" y1="0" x2="2" y2="8" stroke="hsl(0, 30%, 50%)" strokeWidth="0.5" opacity="0.12" />
              </pattern>
            </defs>

            {/* ===== VERTEBRAL BODIES (C4–T2 hint) ===== */}
            <g opacity="0.08" fill="url(#boneGrad)" stroke="hsl(40, 25%, 50%)" strokeWidth="0.75">
              {[0, 28, 56, 84, 112, 140].map((dy, i) => (
                <rect key={i} x="410" y={-2 + dy} width="22" height="22" rx="3" />
              ))}
              <g fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.5">
                <text x="421" y="12" textAnchor="middle">C4</text>
                <text x="421" y="40" textAnchor="middle">C5</text>
                <text x="421" y="68" textAnchor="middle">C6</text>
                <text x="421" y="96" textAnchor="middle">C7</text>
                <text x="421" y="124" textAnchor="middle">C8</text>
                <text x="421" y="152" textAnchor="middle">T1</text>
              </g>
            </g>

            {/* ===== ANTERIOR SCALENE — triangular anatomical shape ===== */}
            <path d="M 65,0 C 62,15 58,40 55,70 C 52,100 50,130 48,160 C 47,175 48,185 52,195 L 75,195 C 72,180 70,160 68,130 C 66,100 68,65 72,30 C 74,15 75,5 75,0 Z"
              fill="url(#scaleneGrad)" stroke="hsl(0, 20%, 50%)" strokeWidth="0.5" opacity="0.5" />
            <rect x="48" y="0" width="27" height="195" fill="url(#muscleFibre)" opacity="0.3" />
            <text x="38" y="100" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.45" transform="rotate(-85, 38, 100)" fontStyle="italic">Anterior scalene</text>

            {/* ===== MIDDLE SCALENE — wider, more posterior ===== */}
            <path d="M 345,0 C 348,15 352,40 355,70 C 358,100 360,130 362,160 C 363,175 362,185 358,195 L 335,195 C 338,180 340,160 342,130 C 344,100 342,65 338,30 C 336,15 335,5 335,0 Z"
              fill="url(#scalenemidGrad)" stroke="hsl(0, 15%, 48%)" strokeWidth="0.5" opacity="0.5" />
            <rect x="335" y="0" width="28" height="195" fill="url(#muscleFibre)" opacity="0.25" />
            <text x="372" y="100" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.45" transform="rotate(85, 372, 100)" fontStyle="italic">Middle scalene</text>

            {/* ===== INTERSCALENE GROOVE (between scalenes) ===== */}
            <path d="M 75,20 Q 210,15 335,20 L 335,195 Q 210,188 75,195 Z"
              fill="hsl(var(--muted-foreground))" fillOpacity="0.015" stroke="none" />
            <text x="210" y="25" fontSize="4.5" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.2" fontStyle="italic">interscalene groove</text>

            {/* ===== FIRST RIB — curved anatomical shape ===== */}
            <path d="M 20,170 Q 50,162 100,158 Q 160,155 210,154 Q 260,155 320,158 Q 370,162 400,170"
              fill="none" stroke="hsl(40, 30%, 55%)" strokeWidth="3" opacity="0.12" strokeLinecap="round" />
            <path d="M 20,170 Q 50,162 100,158 Q 160,155 210,154 Q 260,155 320,158 Q 370,162 400,170"
              fill="none" stroke="hsl(40, 25%, 50%)" strokeWidth="1" opacity="0.18" />
            {/* Scalene tubercle on first rib */}
            <circle cx="100" cy="158" r="3" fill="hsl(40, 30%, 60%)" opacity="0.12" />
            <text x="100" y="172" fontSize="4" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.25" fontStyle="italic">scalene tubercle</text>
            <text x="400" y="168" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.3">1st rib</text>

            {/* ===== CLAVICLE — realistic S-shape ===== */}
            <path d="M 0,192 Q 40,186 80,184 Q 120,182 170,181 Q 220,180 270,181 Q 320,183 370,187 Q 400,190 420,195"
              fill="none" stroke="hsl(40, 25%, 60%)" strokeWidth="3" opacity="0.13" strokeLinecap="round" />
            <path d="M 0,192 Q 40,186 80,184 Q 120,182 170,181 Q 220,180 270,181 Q 320,183 370,187 Q 400,190 420,195"
              fill="none" stroke="hsl(40, 20%, 50%)" strokeWidth="1.5" opacity="0.2" />
            {/* Sternal end */}
            <ellipse cx="5" cy="193" rx="6" ry="4" fill="hsl(40, 25%, 60%)" opacity="0.1" />
            <text x="210" y="178" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.3" fontWeight="600">— CLAVICLE —</text>

            {/* ===== PECTORALIS MAJOR/MINOR — below clavicle ===== */}
            <path d="M 30,200 Q 100,196 210,195 Q 320,196 390,200 L 380,310 Q 300,295 210,290 Q 120,295 40,310 Z"
              fill="url(#pectoralisGrad)" stroke="hsl(0, 20%, 50%)" strokeWidth="0.5" opacity="0.3" />
            <text x="70" y="245" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.2" fontStyle="italic">Pec major</text>
            {/* Pectoralis minor */}
            <path d="M 80,225 Q 150,218 220,215 Q 250,218 270,225 L 265,270 Q 200,262 160,262 Q 120,265 85,270 Z"
              fill="hsl(0, 25%, 48%)" fillOpacity="0.04" stroke="hsl(0, 20%, 48%)" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 2" />
            <text x="180" y="250" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.18" fontStyle="italic">Pec minor</text>

            {/* ===== SUBCLAVIAN → AXILLARY ARTERY — red, pulsating ===== */}
            <path d="M 210,158 Q 210,170 210,185 Q 209,200 208,220 Q 206,250 204,280 Q 202,320 200,360 Q 199,385 198,415"
              fill="none" stroke="hsl(0, 55%, 50%)" strokeWidth="3" opacity="0.12" strokeLinecap="round" />
            {/* Arterial wall shimmer */}
            <path d="M 210,158 Q 210,170 210,185 Q 209,200 208,220 Q 206,250 204,280 Q 202,320 200,360 Q 199,385 198,415"
              fill="none" stroke="hsl(0, 60%, 60%)" strokeWidth="0.75" opacity="0.15" strokeDasharray="1 3" />
            {/* Companion vein (slightly lateral) */}
            <path d="M 215,165 Q 215,185 214,210 Q 213,240 212,270 Q 210,310 208,350 Q 206,385 205,415"
              fill="none" stroke="hsl(220, 45%, 50%)" strokeWidth="2" opacity="0.06" strokeLinecap="round" />
            <text x="188" y="270" fontSize="5" fill="hsl(0, 55%, 50%)" opacity="0.35" transform="rotate(-88, 188, 270)" fontStyle="italic">Axillary artery</text>
            <text x="215" y="155" fontSize="4.5" fill="hsl(0, 55%, 50%)" opacity="0.3">Subclavian a.</text>
            {/* Parts of axillary artery */}
            <g opacity="0.15" fontSize="3.5" fill="hsl(0, 50%, 50%)">
              <text x="220" y="195">1st part</text>
              <text x="220" y="245">2nd part</text>
              <text x="220" y="330">3rd part</text>
            </g>

            {/* Level zone backgrounds */}
            <rect x="-5" y="45" width="430" height="35" rx="4" fill="hsl(0, 60%, 55%)" fillOpacity="0.03" />
            <rect x="-5" y="125" width="430" height="35" rx="4" fill="hsl(45, 60%, 50%)" fillOpacity="0.03" />
            <rect x="-5" y="275" width="430" height="35" rx="4" fill="hsl(270, 45%, 50%)" fillOpacity="0.03" />
            <rect x="-5" y="360" width="430" height="35" rx="4" fill="hsl(200, 50%, 50%)" fillOpacity="0.03" />

            {/* Level labels */}
            {(Object.entries(levelInfo) as [LevelKey, typeof levelInfo.roots][]).map(([key, info]) => (
              <g key={key}>
                <text
                  x="-5" y={info.y + 5} fontSize="6"
                  fill={highlightLevel === key ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
                  fontWeight={highlightLevel === key ? "bold" : "normal"}
                  className="cursor-pointer select-none"
                  onClick={() => setHighlightLevel(highlightLevel === key ? null : key)}
                  opacity={highlightLevel === key ? 1 : 0.5}
                >
                  {info.label}
                </text>
              </g>
            ))}

            {/* Connection lines */}
            {elements.map(el =>
              el.connections.map(targetId => {
                const target = elements.find(e => e.id === targetId);
                if (!target) return null;
                const isHighlighted = selected === el.id || selected === targetId;
                const midY = (el.y + target.y) / 2;
                return (
                  <path
                    key={`${el.id}-${targetId}`}
                    d={`M${el.x},${el.y + 14} C${el.x},${midY} ${target.x},${midY} ${target.x},${target.y - 10}`}
                    fill="none"
                    stroke={isHighlighted ? el.color : "hsl(var(--border))"}
                    strokeWidth={isHighlighted ? 3 : 1.2}
                    opacity={isHighlighted ? 0.8 : 0.25}
                    className="transition-all duration-200"
                  />
                );
              })
            )}

            {/* Annotation branches */}
            {showAnnotations && annotationBranches.map((ann, i) => {
              const source = elements.find(e => e.id === ann.fromId);
              if (!source) return null;
              const isParentSelected = selected === ann.fromId;
              return (
                <g key={i} opacity={isParentSelected ? 0.85 : 0.4} className="transition-opacity duration-200">
                  <path
                    d={`M${source.x},${source.y} Q${(source.x + ann.target.x) / 2},${(source.y + ann.target.y) / 2 - 10} ${ann.target.x},${ann.target.y}`}
                    fill="none" stroke={source.color} strokeWidth="0.75" strokeDasharray="3 2" />
                  <text x={ann.target.x - 2} y={ann.target.y - 3} fontSize="5" fill={source.color} fontWeight="600">
                    {ann.label}
                  </text>
                  {isParentSelected && (
                    <text x={ann.target.x - 2} y={ann.target.y + 5} fontSize="4" fill="hsl(var(--muted-foreground))">
                      {ann.detail}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Element nodes */}
            {elements.map(el => {
              const isActive = selected === el.id;
              const isLevelHighlighted = highlightLevel === el.level;
              const w = el.level === "branches" ? 62 : el.level === "divisions" ? 32 : el.level === "cords" ? 68 : 46;
              const h = 22;
              return (
                <g key={el.id} className="cursor-pointer" onClick={() => { setSelected(el.id); setSelectedBlock(null); }}>
                  <rect
                    x={el.x - w / 2} y={el.y - 9} width={w} height={h} rx={6}
                    fill={el.color}
                    fillOpacity={isActive ? 0.3 : isLevelHighlighted ? 0.15 : 0.07}
                    stroke={el.color}
                    strokeWidth={isActive ? 2.5 : 1}
                    opacity={isActive || isLevelHighlighted ? 1 : 0.5}
                    className="transition-all duration-200"
                  />
                  {isActive && (
                    <rect
                      x={el.x - w / 2 - 2} y={el.y - 11} width={w + 4} height={h + 4} rx={8}
                      fill="none" stroke={el.color} strokeWidth="1" opacity="0.3" className="animate-pulse"
                    />
                  )}
                  <text
                    x={el.x} y={el.y + 5} textAnchor="middle"
                    fontSize={el.level === "divisions" ? "6" : el.level === "branches" ? "6.5" : "7.5"}
                    fill={el.color}
                    fontWeight={isActive ? "bold" : "600"}
                    className="select-none"
                  >
                    {el.label}
                  </text>
                </g>
              );
            })}

            {/* Block approach zones */}
            {highlightLevel === "roots" && (
              <rect x="65" y="40" width="290" height="45" rx="8" fill="none"
                stroke="hsl(0, 60%, 55%)" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.4" />
            )}
            {highlightLevel === "trunks" && (
              <rect x="80" y="120" width="260" height="45" rx="8" fill="none"
                stroke="hsl(45, 60%, 50%)" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.4" />
            )}
            {highlightLevel === "cords" && (
              <rect x="65" y="270" width="310" height="45" rx="8" fill="none"
                stroke="hsl(270, 45%, 50%)" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.4" />
            )}
            {highlightLevel === "branches" && (
              <rect x="15" y="355" width="395" height="45" rx="8" fill="none"
                stroke="hsl(210, 50%, 50%)" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.4" />
            )}

            {/* ===== BLOCK INJECTION SITES ===== */}
            {showBlockSites && blockSites.map((bs) => {
              const isBlockActive = selectedBlock === bs.id;
              return (
    <DiagramFigure
      id="brachial-plexus-diagram"
      title="Brachial plexus"
      description="Auto-generated wrapper for the Brachial plexus anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                      <g key={bs.id} className="cursor-pointer" onClick={() => { setSelectedBlock(isBlockActive ? null : bs.id); setSelected(""); }}>
                    {/* Pulsing target ring */}
                    <circle cx={bs.x} cy={bs.y} r={isBlockActive ? 18 : 14}
                      fill="none" stroke="hsl(140, 60%, 45%)" strokeWidth={isBlockActive ? 2 : 1}
                      opacity={isBlockActive ? 0.6 : 0.3}
                      strokeDasharray="4 2"
                      className={isBlockActive ? "animate-pulse" : ""}
                    />
                    {/* Inner target */}
                    <circle cx={bs.x} cy={bs.y} r={isBlockActive ? 6 : 4}
                      fill="hsl(140, 60%, 45%)" fillOpacity={isBlockActive ? 0.7 : 0.4}
                      stroke="hsl(140, 60%, 45%)" strokeWidth={isBlockActive ? 2 : 1}
                    />
                    {/* Crosshair lines */}
                    <line x1={bs.x - 10} y1={bs.y} x2={bs.x - 5} y2={bs.y} stroke="hsl(140, 60%, 45%)" strokeWidth="1" opacity={isBlockActive ? 0.8 : 0.4} />
                    <line x1={bs.x + 5} y1={bs.y} x2={bs.x + 10} y2={bs.y} stroke="hsl(140, 60%, 45%)" strokeWidth="1" opacity={isBlockActive ? 0.8 : 0.4} />
                    <line x1={bs.x} y1={bs.y - 10} x2={bs.x} y2={bs.y - 5} stroke="hsl(140, 60%, 45%)" strokeWidth="1" opacity={isBlockActive ? 0.8 : 0.4} />
                    <line x1={bs.x} y1={bs.y + 5} x2={bs.x} y2={bs.y + 10} stroke="hsl(140, 60%, 45%)" strokeWidth="1" opacity={isBlockActive ? 0.8 : 0.4} />
  
                    {/* Needle line */}
                    {isBlockActive && (
                      <g className="animate-fade-in">
                        <line x1={bs.x + 55} y1={bs.y - 20} x2={bs.x + 8} y2={bs.y - 2}
                          stroke="hsl(140, 60%, 45%)" strokeWidth="1.5" markerEnd="url(#needleTip)" opacity="0.6" />
                        <text x={bs.x + 58} y={bs.y - 22} fontSize="5" fill="hsl(140, 60%, 45%)" opacity="0.7">needle</text>
                      </g>
                    )}
  
                    {/* Label */}
                    <text x={bs.x} y={bs.y - (isBlockActive ? 22 : 17)} textAnchor="middle"
                      fontSize="6" fill="hsl(140, 60%, 45%)" fontWeight="bold" opacity={isBlockActive ? 1 : 0.7}>
                      🎯 {bs.label}
                    </text>
                  </g>
    </DiagramFigure>
  );
            })}
          </svg>
        </div>

        {/* Side panels */}
        <div className="flex flex-col gap-3">
          {showDermatomes && (
            <div className="animate-fade-in">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Cutaneous Dermatomes</p>
              <HandDermatomeMap />
              <div className="text-[10px] text-muted-foreground space-y-0.5 text-center mt-1">
                <p><span className="font-bold" style={{ color: ROOT_COLORS.C6 }}>C6</span> — thumb + lateral</p>
                <p><span className="font-bold" style={{ color: ROOT_COLORS.C7 }}>C7</span> — middle finger</p>
                <p><span className="font-bold" style={{ color: ROOT_COLORS.C8 }}>C8</span> — ring + little</p>
                <p><span className="font-bold" style={{ color: ROOT_COLORS.T1 }}>T1</span> — medial forearm</p>
              </div>
            </div>
          )}

          {/* Block site quick selector */}
          {showBlockSites && (
            <div className="animate-fade-in">
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Injection Sites</p>
              <div className="space-y-1">
                {blockSites.map(bs => (
                  <button key={bs.id}
                    onClick={() => { setSelectedBlock(selectedBlock === bs.id ? null : bs.id); setSelected(""); }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs transition-all ${selectedBlock === bs.id ? "bg-primary/15 border border-primary/40 text-foreground font-medium" : "bg-secondary/50 border border-border text-muted-foreground hover:text-foreground"}`}>
                    🎯 {bs.label}
                    <span className="text-[10px] ml-1 opacity-60">({levelInfo[bs.level].label.split(' ')[0]})</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Block approach highlight */}
      {highlightLevel && !selectedBlock && (
        <div className="p-3 rounded-lg bg-secondary/50 border border-border animate-fade-in">
          <p className="text-xs font-semibold text-foreground">🎯 Block approach — {levelInfo[highlightLevel].label}:</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{levelInfo[highlightLevel].blockApproach}</p>
        </div>
      )}

      {/* Block site detail card */}
      {activeBlock && (
        <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in" key={selectedBlock}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">🎯</span>
            <p className="font-bold text-sm text-foreground">{activeBlock.label} Block</p>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide ml-auto">{levelInfo[activeBlock.level].label}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="font-semibold text-foreground mb-0.5">Coverage</p>
              <p className="text-muted-foreground">{activeBlock.coverage}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-0.5">US Landmarks</p>
              <p className="text-muted-foreground">{activeBlock.usLandmarks}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-0.5">Needle Direction</p>
              <p className="text-muted-foreground">{activeBlock.needleDirection}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-0.5">Volume</p>
              <p className="text-muted-foreground">{activeBlock.volume}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-0.5">Indication</p>
              <p className="text-muted-foreground">{activeBlock.indication}</p>
            </div>
            <div>
              <p className="font-semibold text-destructive mb-0.5">Risks</p>
              <p className="text-muted-foreground">{activeBlock.risks}</p>
            </div>
          </div>
        </div>
      )}

      {/* Plexus element detail card */}
      {activeEl && !activeBlock && (
        <PlexusDetailPanel
          reactKey={selected}
          title={activeEl.label}
          region={levelInfo[activeEl.level].label}
          accent={activeEl.color}
          fields={[{ label: "Detail", value: activeEl.detail }]}
        />
      )}
      </div>
    </div>
  );
};

export default BrachialPlexusDiagram;
