import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";

type RegionKey =
  | "vertebral-body" | "disc-foramen" | "transverse-process" | "costotransverse-joint"
  | "superior-costotransverse" | "internal-intercostal-membrane" | "endothoracic-fascia"
  | "parietal-pleura" | "pvs-contents" | "spinal-nerve" | "dorsal-ramus" | "ventral-ramus"
  | "sympathetic-chain" | "rami-communicantes" | "epidural-comm" | "intercostal-ext"
  | "intercostal-vessels" | "rib-periosteum" | "erector-spinae"
  | "internal-intercostal" | "innermost-intercostal";

interface Region {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const regions: Record<RegionKey, Region> = {
  "vertebral-body": {
    label: "Vertebral Body",
    color: "hsl(35, 40%, 55%)",
    detail: "Medial wall of the paravertebral space. Cancellous bone with cortical shell, bearing weight of the trunk. Basivertebral veins drain posteriorly into the internal vertebral venous plexus (Batson's) in the epidural space.",
    clinicalNote: "Bone contact medially indicates needle is too deep and medial — redirect laterally. Vertebral body fracture (osteoporotic) can cause canal compromise."
  },
  "disc-foramen": {
    label: "Intervertebral Foramen",
    color: "hsl(210, 50%, 55%)",
    detail: "The intervertebral foramen (IVF) opens medially from the PVS into the epidural space. Bounded superiorly and inferiorly by pedicles, anteriorly by disc/vertebral body, posteriorly by facet joint and ligamentum flavum. Contains the spinal nerve, dorsal root ganglion, radicular arteries, and veins.",
    clinicalNote: "The IVF is the conduit for medial spread of local anaesthetic from PVS to epidural space. Larger volumes (>20 mL) and medial needle placement increase epidural spread (~10% of blocks). DRG sits within the foramen — vulnerable to compression by disc prolapse."
  },
  "transverse-process": {
    label: "Transverse Process",
    color: "hsl(30, 45%, 50%)",
    detail: "Posterior boundary of the PVS. Broad bony projection from the vertebral arch. In the thoracic spine, the transverse process articulates with the tubercle of the rib at the costotransverse joint. Tip located ~2.5–3 cm lateral to midline at thoracic levels. Length increases from T1 to T6, then decreases.",
    clinicalNote: "Initial needle contact target at 2.5 cm lateral to spinous process (thoracic). Depth to TP: 2–4 cm depending on body habitus. Walk the needle off the inferior (caudal) edge, then advance 1–1.5 cm to enter PVS through the superior costotransverse ligament."
  },
  "costotransverse-joint": {
    label: "Costotransverse Joint",
    color: "hsl(28, 38%, 48%)",
    detail: "Synovial joint between the tubercle of the rib and the transverse process. Reinforced by the lateral costotransverse ligament (superficial) and the costotransverse ligament (short, filling the joint space). Joint is tight in upper thoracic, more lax inferiorly. Absent below T10–12.",
    clinicalNote: "Understanding joint anatomy helps with ultrasound interpretation — the costotransverse joint is visible as a bright hyperechoic line between TP and rib on parasagittal scan. The joint disappears at lower thoracic/lumbar levels."
  },
  "superior-costotransverse": {
    label: "Superior Costotransverse Ligament",
    color: "hsl(50, 50%, 50%)",
    detail: "A bilaminar ligament connecting the crest of the rib neck to the lower border of the transverse process above. Anterior (thin) and posterior (thick, continuous with internal intercostal membrane laterally) leaves. 1.5–2 mm thick at mid-thoracic levels. Piercing this gives the 'loss of resistance' or 'pop' confirming PVS entry.",
    clinicalNote: "The SCTL is the posterior boundary you traverse to enter the PVS. On ultrasound, it appears as a hyperechoic linear structure between adjacent transverse processes — local anaesthetic should be deposited deep to this ligament. Posterior leaf is more robust and gives clearer tactile feedback."
  },
  "internal-intercostal-membrane": {
    label: "Internal Intercostal Membrane",
    color: "hsl(48, 42%, 52%)",
    detail: "The aponeurosis of the internal intercostal muscle, extending posteriorly from the angle of the rib to the vertebral column. Continuous with the posterior leaf of the superior costotransverse ligament medially. Forms part of the posterior boundary of the PVS laterally.",
    clinicalNote: "Some authors consider the posterior leaf of the SCTL and the internal intercostal membrane as a single continuous structure — the 'paravertebral membrane'. On ultrasound, the membrane provides a linear hyperechoic landmark."
  },
  "endothoracic-fascia": {
    label: "Endothoracic Fascia",
    color: "hsl(190, 35%, 52%)",
    detail: "A thin fibro-areolar layer lining the inner surface of the thoracic cage, between the innermost intercostal muscles/ribs and the parietal pleura. Analogous to transversalis fascia in the abdomen. Creates a potential fascial plane within the PVS that may influence local anaesthetic spread.",
    clinicalNote: "Some evidence suggests LA may spread preferentially between the endothoracic fascia and parietal pleura (subendothoracic compartment), potentially explaining the craniocaudal spread seen with single-injection PVB. The fascial plane may be targeted with an ultrasound-guided approach."
  },
  "parietal-pleura": {
    label: "Parietal Pleura",
    color: "hsl(160, 50%, 48%)",
    detail: "The anterolateral boundary of the PVS. The costal parietal pleura lines the inner thoracic wall, separated from the ribs/intercostals by the endothoracic fascia. Thin, translucent membrane (~0.1 mm) easily punctured. On ultrasound, it appears as a bright sliding line deep to the transverse processes.",
    clinicalNote: "Pneumothorax is the most significant complication (~0.5% landmark, lower with US). The 'pleural push sign' on ultrasound — anterior displacement of the pleura by injected LA — confirms correct PVS placement. If pleura is not displaced, suspect needle is too superficial or in wrong plane."
  },
  "pvs-contents": {
    label: "Paravertebral Space (wedge)",
    color: "hsl(270, 45%, 55%)",
    detail: "A wedge-shaped (triangular on cross-section) space lateral to the vertebral column. Filled with loose fatty and areolar tissue, allowing craniocaudal spread of LA across 3–5 dermatomes from a single injection. Continuous superiorly to the cervical paravertebral region and inferiorly to the retroperitoneal space. The space is bounded by the endothoracic fascia internally, creating two potential compartments: subendothoracic and extrapleural.",
    clinicalNote: "Single injection: 0.3–0.5 mL/kg of 0.25–0.5% bupivacaine (or ropivacaine). Multi-injection: 3–5 mL per level. Provides ipsilateral somatic AND sympathetic blockade — excellent for breast surgery, thoracotomy, rib fractures, renal surgery. Catheter insertion for ongoing analgesia (superior to thoracic epidural for some thoracic procedures with fewer haemodynamic effects)."
  },
  "spinal-nerve": {
    label: "Spinal Nerve",
    color: "hsl(45, 65%, 50%)",
    detail: "Formed by union of dorsal (sensory) and ventral (motor) roots within the intervertebral foramen. The dorsal root ganglion (DRG) contains primary sensory neuron cell bodies and lies within or just lateral to the foramen. After exiting, the mixed spinal nerve passes through the PVS briefly before dividing.",
    clinicalNote: "The spinal nerve is only 1–2 cm long before dividing into dorsal and ventral rami. Blocking here provides complete dermatomal coverage — both somatic and sympathetic — which is why PVB is more effective than intercostal nerve block alone."
  },
  "dorsal-ramus": {
    label: "Dorsal Ramus",
    color: "hsl(38, 55%, 52%)",
    detail: "Passes posteriorly around the superior articular process to supply facet joints, paraspinal muscles (erector spinae group: iliocostalis, longissimus, spinalis), and the skin of the back. Divides into medial and lateral branches. The medial branch supplies the facet joint — target for diagnostic/therapeutic medial branch block and radiofrequency denervation.",
    clinicalNote: "Dorsal ramus is blocked by PVB — contributes to posterior wound analgesia (e.g., posterior thoracotomy incision). Medial branch block is used for facet joint-mediated pain."
  },
  "ventral-ramus": {
    label: "Ventral Ramus (→ Intercostal Nerve)",
    color: "hsl(52, 60%, 48%)",
    detail: "Passes laterally through the PVS to become the intercostal nerve. Runs in the costal groove (inferior border of rib) between the internal intercostal and innermost intercostal muscles, accompanied by the intercostal artery (above) and vein (uppermost) — VAN order from below upward. Gives off the lateral cutaneous branch at the mid-axillary line.",
    clinicalNote: "The intercostal nerve provides somatic innervation to the chest/abdominal wall. VAN (vein-artery-nerve) order in the subcostal groove — needle for intercostal block should aim just below the inferior rib edge. Lateral cutaneous branch is spared if block is too far lateral."
  },
  "sympathetic-chain": {
    label: "Sympathetic Chain (Trunk)",
    color: "hsl(0, 55%, 50%)",
    detail: "The paravertebral sympathetic trunk lies anterolateral in the PVS, draped over the heads of the ribs and covered by the parietal pleura and endothoracic fascia. Contains paravertebral ganglia (one per segment, though fusion common). Preganglionic white rami communicantes (T1–L2) enter from the spinal nerve; postganglionic grey rami communicantes return to ALL spinal nerves.",
    clinicalNote: "PVB provides ipsilateral sympathectomy — causes vasodilation and warming of the ipsilateral limb. Less hypotension than bilateral epidural sympathectomy. Stellate ganglion (inferior cervical + T1 fusion) — Horner syndrome indicates sympathetic chain block."
  },
  "rami-communicantes": {
    label: "Rami Communicantes",
    color: "hsl(10, 50%, 52%)",
    detail: "White rami communicantes: myelinated preganglionic sympathetic fibres from lateral horn (T1–L2) to sympathetic chain — short, limited to thoracolumbar segments. Grey rami communicantes: unmyelinated postganglionic fibres from sympathetic chain back to ALL spinal nerves (every level) — longer, more numerous. Both traverse the PVS.",
    clinicalNote: "These connections explain why PVB blocks both somatic and sympathetic fibres. The grey rami joining the spinal nerve carry vasomotor, sudomotor, and pilomotor fibres to the periphery — their block causes the warm, dry skin in the blocked dermatome."
  },
  "epidural-comm": {
    label: "Epidural Communication",
    color: "hsl(220, 50%, 55%)",
    detail: "The PVS communicates medially with the epidural space through the intervertebral foramen. The epidural space contains fat, the internal vertebral venous plexus (Batson's), and meningeal coverings of the spinal cord. Contralateral spread can occur via epidural tracking.",
    clinicalNote: "Epidural spread occurs in ~10% of PVBs — presenting as bilateral or unexpectedly high block. Risk factors: large volume (>25 mL), medial needle angle, multiple injections. Monitor for bilateral Horner syndrome, bilateral sensory block, or hypotension suggesting bilateral sympatholysis."
  },
  "intercostal-ext": {
    label: "Intercostal Space (lateral continuation)",
    color: "hsl(180, 40%, 50%)",
    detail: "Laterally, the PVS is continuous with the intercostal space between the internal and innermost intercostal muscle layers. This plane transmits local anaesthetic along the course of the intercostal nerve, contributing to multi-dermatomal block from a single PVS injection.",
    clinicalNote: "Lateral spread along the intercostal space explains the dermatomal extent beyond what epidural spread alone would predict. The endothoracic fascia and subpleural spread facilitate this craniocaudal/lateral distribution."
  },
  "intercostal-vessels": {
    label: "Intercostal Vessels",
    color: "hsl(350, 55%, 48%)",
    detail: "Posterior intercostal arteries (from aorta T3–T11, costocervical trunk T1–T2) and veins (to azygos/hemiazygos system) enter the PVS posteriorly, passing with the spinal nerve. The intercostal artery divides into a dorsal branch (with dorsal ramus) and continues as the main intercostal artery in the subcostal groove. Segmental spinal arteries (radicular arteries) arise here — including the artery of Adamkiewicz (usually T9–T12 left).",
    clinicalNote: "Vascular injury risk: intercostal artery laceration → haemothorax. Artery of Adamkiewicz supplies the anterior spinal artery — damage during surgery at T9–L2 can cause anterior spinal artery syndrome. Always aspirate before injecting. Anticoagulation is a relative contraindication."
  },
  "rib-periosteum": {
    label: "Ribs (head, neck, tubercle, shaft)",
    color: "hsl(32, 35%, 52%)",
    detail: "Superior and inferior boundaries of the PVS. The head of the rib articulates with the vertebral body (costovertebral joint — two demifacets and intervertebral disc). The neck lies anterior to the transverse process. The tubercle articulates with the TP (costotransverse joint). The costal groove on the inferior inner surface of the shaft houses the VAN bundle.",
    clinicalNote: "The rib neck and head delineate the craniocaudal extent of a single PVS segment. Rib fractures are a prime indication for PVB — achieving unilateral analgesia without the hypotension/urinary retention of epidural. Multiple rib fractures may need multi-level blocks or catheter."
  },
  "erector-spinae": {
    label: "Erector Spinae Group",
    color: "hsl(25, 30%, 50%)",
    detail: "Deep back muscles (iliocostalis, longissimus, spinalis) lying posterior to the transverse processes and laminae. Enclosed in the thoracolumbar fascia. The erector spinae plane (ESP) lies between these muscles and the transverse processes — this is the target for the ESP block, a fascial plane block that relies on LA diffusion anteriorly through the SCTL into the PVS.",
    clinicalNote: "The erector spinae plane block (ESPB) is performed posterior to the TP — LA is deposited in the fascial plane deep to erector spinae. The block's mechanism depends on LA tracking anteriorly through the costotransverse foramina into the PVS and laterally along the intercostal space. Increasingly popular as an alternative to PVB due to perceived safety (further from pleura)."
  },
  "internal-intercostal": {
    label: "Internal Intercostal Muscle",
    color: "hsl(15, 35%, 55%)",
    detail: "The second of three intercostal muscle layers. Fibres run inferoposteriorly (obliquely, 90° to external intercostals). Extends from sternum to angle of rib posteriorly, where it becomes the internal intercostal membrane (aponeurotic). Active in expiration. The intercostal nerve runs deep to this muscle (between internal and innermost layers).",
    clinicalNote: "The internal intercostal membrane (posterior aponeurotic continuation) is continuous with the posterior leaf of the SCTL — forms a key anatomical plane for understanding PVB anatomy and ultrasound-guided approaches."
  },
  "innermost-intercostal": {
    label: "Innermost Intercostal Muscle",
    color: "hsl(18, 30%, 50%)",
    detail: "The deepest intercostal muscle layer, separated from the internal intercostal by the intercostal neurovascular bundle. Incomplete — best developed in the lateral chest wall. Equivalent to the transversus abdominis in the abdomen. Subcostalis and transversus thoracis are considered part of this same layer.",
    clinicalNote: "The plane between internal and innermost intercostals is where the intercostal nerve, artery, and vein travel — the target plane for intercostal nerve block. This plane is continuous with the PVS medially."
  },
};

const regionOrder: RegionKey[] = [
  "pvs-contents", "vertebral-body", "disc-foramen", "transverse-process",
  "costotransverse-joint", "superior-costotransverse", "internal-intercostal-membrane",
  "endothoracic-fascia", "parietal-pleura", "spinal-nerve", "dorsal-ramus",
  "ventral-ramus", "sympathetic-chain", "rami-communicantes", "intercostal-vessels",
  "epidural-comm", "intercostal-ext", "rib-periosteum",
  "erector-spinae", "internal-intercostal", "innermost-intercostal"
];

const categories = [
  { label: "Boundaries", keys: ["vertebral-body", "disc-foramen", "transverse-process", "costotransverse-joint", "superior-costotransverse", "internal-intercostal-membrane", "rib-periosteum"] as RegionKey[] },
  { label: "Contents", keys: ["pvs-contents", "spinal-nerve", "dorsal-ramus", "ventral-ramus", "sympathetic-chain", "rami-communicantes", "intercostal-vessels"] as RegionKey[] },
  { label: "Walls & Relations", keys: ["endothoracic-fascia", "parietal-pleura", "epidural-comm", "intercostal-ext", "erector-spinae", "internal-intercostal", "innermost-intercostal"] as RegionKey[] },
];

const ParavertebralSpaceDiagram = () => {
  const [selected, setSelected] = useState<RegionKey>("pvs-contents");
  const [showSutures, setShowSutures] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const info = regions[selected];

  const isActive = (key: RegionKey) => selected === key;
  const opa = (key: RegionKey, active: number, idle: number) => isActive(key) ? active : idle;
  const sw = (key: RegionKey, active: number, idle: number) => isActive(key) ? active : idle;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Paravertebral Space — Axial Cross-Section (Thoracic)"
          subtitle="Tap any structure for detailed anatomy and clinical notes. View is looking caudally (patient's left on your right)."
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures(s => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels(s => !s) },
          ]}
        />

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 0 400 340" width="400" height="340" className="border border-border rounded bg-card">
            <defs>
              <marker id="pvArrow" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                <path d="M0,0 L6,2 L0,4" fill="hsl(var(--muted-foreground))" />
              </marker>
              {/* bone texture pattern */}
              <pattern id="boneStipple" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.6" fill="hsl(35,40%,55%)" opacity="0.3" />
                <circle cx="5" cy="5" r="0.4" fill="hsl(35,40%,55%)" opacity="0.2" />
              </pattern>
            </defs>

            {/* ═══ POSTERIOR: Erector Spinae & Skin ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("erector-spinae")}>
              <path d="M90,10 Q200,5 310,10 L310,50 Q200,42 90,50 Z"
                fill={regions["erector-spinae"].color}
                fillOpacity={opa("erector-spinae", 0.45, 0.12)}
                stroke={regions["erector-spinae"].color}
                strokeWidth={sw("erector-spinae", 2, 0.5)} />
              <text x="200" y="32" fontSize="6" textAnchor="middle" fill={regions["erector-spinae"].color}
                fontWeight="bold" opacity={opa("erector-spinae", 1, 0.5)}>ERECTOR SPINAE</text>
              <text x="200" y="40" fontSize="4.5" textAnchor="middle" fill={regions["erector-spinae"].color}
                opacity={opa("erector-spinae", 0.7, 0.3)}>iliocostalis / longissimus / spinalis</text>
            </g>

            {/* ═══ TRANSVERSE PROCESS — LEFT ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("transverse-process")}>
              <rect x="118" y="50" width="60" height="18" rx="4"
                fill="url(#boneStipple)"
                stroke={regions["transverse-process"].color}
                strokeWidth={sw("transverse-process", 2.5, 1)} />
              <rect x="118" y="50" width="60" height="18" rx="4"
                fill={regions["transverse-process"].color}
                fillOpacity={opa("transverse-process", 0.4, 0.15)} />
              <text x="148" y="62" fontSize="5.5" textAnchor="middle"
                fill={regions["transverse-process"].color} fontWeight="bold"
                opacity={opa("transverse-process", 1, 0.6)}>Transverse Process</text>
            </g>

            {/* ═══ COSTOTRANSVERSE JOINT ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("costotransverse-joint")}>
              <ellipse cx="178" cy="62" rx="5" ry="7"
                fill={regions["costotransverse-joint"].color}
                fillOpacity={opa("costotransverse-joint", 0.5, 0.15)}
                stroke={regions["costotransverse-joint"].color}
                strokeWidth={sw("costotransverse-joint", 2, 0.8)} />
              {isActive("costotransverse-joint") && (
                <text x="190" y="56" fontSize="4.5" fill={regions["costotransverse-joint"].color}>CT Joint</text>
              )}
            </g>

            {/* ═══ SUPERIOR COSTOTRANSVERSE LIGAMENT ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("superior-costotransverse")}>
              <line x1="118" y1="68" x2="200" y2="78"
                stroke={regions["superior-costotransverse"].color}
                strokeWidth={sw("superior-costotransverse", 3.5, 2)}
                strokeDasharray="8 3"
                opacity={opa("superior-costotransverse", 0.9, 0.4)} />
              <text x="155" y="80" fontSize="5" textAnchor="middle"
                fill={regions["superior-costotransverse"].color} fontWeight="bold"
                opacity={opa("superior-costotransverse", 1, 0.5)}>SCTL</text>
              {isActive("superior-costotransverse") && (
                <text x="155" y="87" fontSize="3.8" textAnchor="middle"
                  fill={regions["superior-costotransverse"].color} opacity="0.7">
                  (posterior leaf → internal intercostal membrane)
                </text>
              )}
            </g>

            {/* ═══ INTERNAL INTERCOSTAL MEMBRANE ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("internal-intercostal-membrane")}>
              <line x1="200" y1="78" x2="290" y2="85"
                stroke={regions["internal-intercostal-membrane"].color}
                strokeWidth={sw("internal-intercostal-membrane", 3, 1.5)}
                strokeDasharray="5 3"
                opacity={opa("internal-intercostal-membrane", 0.8, 0.3)} />
              {isActive("internal-intercostal-membrane") && (
                <text x="245" y="95" fontSize="4.5" textAnchor="middle"
                  fill={regions["internal-intercostal-membrane"].color}>Int. Intercostal Membrane</text>
              )}
            </g>

            {/* ═══ VERTEBRAL BODY — medial ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("vertebral-body")}>
              <rect x="20" y="80" width="65" height="85" rx="8"
                fill="url(#boneStipple)"
                stroke={regions["vertebral-body"].color}
                strokeWidth={sw("vertebral-body", 2.5, 1)} />
              <rect x="20" y="80" width="65" height="85" rx="8"
                fill={regions["vertebral-body"].color}
                fillOpacity={opa("vertebral-body", 0.35, 0.1)} />
              {/* Cortical shell */}
              <rect x="20" y="80" width="65" height="85" rx="8"
                fill="none" stroke={regions["vertebral-body"].color}
                strokeWidth={sw("vertebral-body", 2, 0.8)} />
              <text x="52" y="118" fontSize="6" textAnchor="middle"
                fill={regions["vertebral-body"].color} fontWeight="bold"
                opacity={opa("vertebral-body", 1, 0.5)}>Vertebral</text>
              <text x="52" y="127" fontSize="6" textAnchor="middle"
                fill={regions["vertebral-body"].color}
                opacity={opa("vertebral-body", 1, 0.5)}>Body</text>
              {/* Spinal canal hint */}
              <ellipse cx="52" cy="65" rx="12" ry="8"
                fill="hsl(var(--background))" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.3" />
              <text x="52" y="68" fontSize="3.5" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.4">Spinal Canal</text>
            </g>

            {/* ═══ INTERVERTEBRAL FORAMEN / EPIDURAL ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("disc-foramen")}>
              <ellipse cx="95" cy="110" rx="10" ry="14"
                fill={regions["disc-foramen"].color}
                fillOpacity={opa("disc-foramen", 0.4, 0.1)}
                stroke={regions["disc-foramen"].color}
                strokeWidth={sw("disc-foramen", 2, 0.8)}
                strokeDasharray={isActive("disc-foramen") ? "none" : "3 2"} />
              <text x="95" y="108" fontSize="4" textAnchor="middle"
                fill={regions["disc-foramen"].color} fontWeight="bold"
                opacity={opa("disc-foramen", 1, 0.5)}>IVF</text>
              <text x="95" y="115" fontSize="3.5" textAnchor="middle"
                fill={regions["disc-foramen"].color}
                opacity={opa("disc-foramen", 0.8, 0.3)}>DRG</text>
            </g>

            {/* ═══ EPIDURAL COMMUNICATION ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("epidural-comm")}>
              <path d="M85,100 Q75,110 85,120"
                fill="none" stroke={regions["epidural-comm"].color}
                strokeWidth={sw("epidural-comm", 2.5, 1)}
                strokeDasharray="4 2"
                opacity={opa("epidural-comm", 0.8, 0.3)} />
              <path d="M85,100 L70,95 M85,120 L70,125"
                fill="none" stroke={regions["epidural-comm"].color}
                strokeWidth="0.8" strokeDasharray="2 2"
                opacity={opa("epidural-comm", 0.6, 0.15)} />
              {isActive("epidural-comm") && (
                <text x="60" y="112" fontSize="4" textAnchor="end"
                  fill={regions["epidural-comm"].color}>← Epidural</text>
              )}
            </g>

            {/* ═══ PARAVERTEBRAL SPACE — the wedge ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("pvs-contents")}>
              <path d="M105,85 L240,85 Q255,130 240,185 L105,160 Z"
                fill={regions["pvs-contents"].color}
                fillOpacity={opa("pvs-contents", 0.3, 0.07)}
                stroke={regions["pvs-contents"].color}
                strokeWidth={sw("pvs-contents", 2, 0.8)} />
              {/* Fat stipple pattern */}
              {Array.from({ length: 25 }).map((_, i) => (
                <circle key={i}
                  cx={115 + (i % 7) * 18}
                  cy={95 + Math.floor(i / 7) * 18 + (i % 3) * 4}
                  r="1.2" fill={regions["pvs-contents"].color}
                  opacity={opa("pvs-contents", 0.25, 0.06)} />
              ))}
              <text x="170" y="128" fontSize="8" textAnchor="middle"
                fill={regions["pvs-contents"].color} fontWeight="bold"
                opacity={opa("pvs-contents", 0.9, 0.4)}>PARAVERTEBRAL</text>
              <text x="170" y="140" fontSize="8" textAnchor="middle"
                fill={regions["pvs-contents"].color} fontWeight="bold"
                opacity={opa("pvs-contents", 0.9, 0.4)}>SPACE</text>
            </g>

            {/* ═══ SPINAL NERVE traversing PVS ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("spinal-nerve")}>
              <path d="M95,110 L140,112"
                stroke={regions["spinal-nerve"].color}
                strokeWidth={sw("spinal-nerve", 3.5, 2)}
                opacity={opa("spinal-nerve", 0.9, 0.4)} />
              <circle cx="115" cy="111" r="4"
                fill={regions["spinal-nerve"].color}
                fillOpacity={opa("spinal-nerve", 0.7, 0.25)}
                stroke={regions["spinal-nerve"].color}
                strokeWidth={sw("spinal-nerve", 1.5, 0.5)} />
              <text x="118" y="106" fontSize="5" textAnchor="middle"
                fill={regions["spinal-nerve"].color} fontWeight="bold"
                opacity={opa("spinal-nerve", 1, 0.5)}>Spinal N.</text>
            </g>

            {/* ═══ DORSAL RAMUS ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("dorsal-ramus")}>
              <path d="M130,112 Q125,85 115,68"
                fill="none" stroke={regions["dorsal-ramus"].color}
                strokeWidth={sw("dorsal-ramus", 2.5, 1.2)}
                opacity={opa("dorsal-ramus", 0.8, 0.3)} />
              <circle cx="115" cy="68" r="2" fill={regions["dorsal-ramus"].color}
                opacity={opa("dorsal-ramus", 0.7, 0.2)} />
              {isActive("dorsal-ramus") && (
                <text x="105" y="74" fontSize="4.5" textAnchor="end"
                  fill={regions["dorsal-ramus"].color} fontWeight="bold">Dorsal Ramus</text>
              )}
            </g>

            {/* ═══ VENTRAL RAMUS → Intercostal nerve ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("ventral-ramus")}>
              <path d="M140,112 Q190,115 260,120"
                fill="none" stroke={regions["ventral-ramus"].color}
                strokeWidth={sw("ventral-ramus", 2.5, 1.2)}
                opacity={opa("ventral-ramus", 0.8, 0.35)} />
              <text x="210" y="115" fontSize="5" textAnchor="middle"
                fill={regions["ventral-ramus"].color} fontWeight="bold"
                opacity={opa("ventral-ramus", 1, 0.4)}>Ventral Ramus → ICN</text>
            </g>

            {/* ═══ SYMPATHETIC CHAIN — anterolateral ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("sympathetic-chain")}>
              <circle cx="220" cy="165" r="6"
                fill={regions["sympathetic-chain"].color}
                fillOpacity={opa("sympathetic-chain", 0.55, 0.2)}
                stroke={regions["sympathetic-chain"].color}
                strokeWidth={sw("sympathetic-chain", 2, 0.8)} />
              <circle cx="220" cy="180" r="6"
                fill={regions["sympathetic-chain"].color}
                fillOpacity={opa("sympathetic-chain", 0.55, 0.2)}
                stroke={regions["sympathetic-chain"].color}
                strokeWidth={sw("sympathetic-chain", 2, 0.8)} />
              <line x1="220" y1="171" x2="220" y2="174"
                stroke={regions["sympathetic-chain"].color} strokeWidth="2"
                opacity={opa("sympathetic-chain", 0.8, 0.4)} />
              <text x="220" y="196" fontSize="5" textAnchor="middle"
                fill={regions["sympathetic-chain"].color} fontWeight="bold"
                opacity={opa("sympathetic-chain", 1, 0.5)}>Sympathetic</text>
              <text x="220" y="203" fontSize="5" textAnchor="middle"
                fill={regions["sympathetic-chain"].color}
                opacity={opa("sympathetic-chain", 0.8, 0.4)}>Chain</text>
            </g>

            {/* ═══ RAMI COMMUNICANTES ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("rami-communicantes")}>
              <path d="M140,115 Q180,140 214,165"
                fill="none" stroke={regions["rami-communicantes"].color}
                strokeWidth={sw("rami-communicantes", 2, 0.8)}
                strokeDasharray="3 2"
                opacity={opa("rami-communicantes", 0.8, 0.2)} />
              {isActive("rami-communicantes") && (
                <>
                  <text x="175" y="145" fontSize="4" fill={regions["rami-communicantes"].color}
                    fontWeight="bold">White ramus (T1–L2)</text>
                  <text x="175" y="152" fontSize="3.8" fill={regions["rami-communicantes"].color}
                    opacity="0.7">Grey ramus (all levels)</text>
                </>
              )}
            </g>

            {/* ═══ INTERCOSTAL VESSELS ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("intercostal-vessels")}>
              <path d="M140,108 Q190,105 260,100"
                fill="none" stroke={regions["intercostal-vessels"].color}
                strokeWidth={sw("intercostal-vessels", 2, 0.8)}
                opacity={opa("intercostal-vessels", 0.8, 0.25)} />
              <path d="M140,105 Q190,100 260,96"
                fill="none" stroke="hsl(220, 50%, 55%)"
                strokeWidth={sw("intercostal-vessels", 1.5, 0.6)}
                opacity={opa("intercostal-vessels", 0.6, 0.15)} />
              {isActive("intercostal-vessels") && (
                <>
                  <text x="260" y="95" fontSize="4" fill={regions["intercostal-vessels"].color}>A</text>
                  <text x="260" y="103" fontSize="4" fill="hsl(220, 50%, 55%)">V</text>
                  <text x="268" y="115" fontSize="4" fill={regions["intercostal-vessels"].color}>VAN order ↑</text>
                </>
              )}
            </g>

            {/* ═══ ENDOTHORACIC FASCIA ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("endothoracic-fascia")}>
              <path d="M248,82 Q268,125 248,190"
                fill="none" stroke={regions["endothoracic-fascia"].color}
                strokeWidth={sw("endothoracic-fascia", 2.5, 1)}
                strokeDasharray="6 3"
                opacity={opa("endothoracic-fascia", 0.8, 0.3)} />
              {isActive("endothoracic-fascia") && (
                <text x="270" y="140" fontSize="4.5" fill={regions["endothoracic-fascia"].color}
                  fontWeight="bold">Endothoracic Fascia</text>
              )}
            </g>

            {/* ═══ PARIETAL PLEURA — anterolateral wall ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("parietal-pleura")}>
              <path d="M255,78 Q280,130 255,195"
                fill="none" stroke={regions["parietal-pleura"].color}
                strokeWidth={sw("parietal-pleura", 3, 1.5)}
                opacity={opa("parietal-pleura", 0.9, 0.4)} />
              {/* Pleural space shading */}
              <path d="M255,78 Q280,130 255,195 Q300,130 255,78 Z"
                fill={regions["parietal-pleura"].color}
                fillOpacity={opa("parietal-pleura", 0.1, 0.02)} />
              <text x="278" y="125" fontSize="6" fill={regions["parietal-pleura"].color}
                fontWeight="bold" opacity={opa("parietal-pleura", 1, 0.5)}>Parietal</text>
              <text x="278" y="134" fontSize="6" fill={regions["parietal-pleura"].color}
                opacity={opa("parietal-pleura", 0.8, 0.4)}>Pleura</text>
              {isActive("parietal-pleura") && (
                <text x="295" y="148" fontSize="4" fill={regions["parietal-pleura"].color}
                  opacity="0.6">(→ lung)</text>
              )}
            </g>

            {/* ═══ RIBS — superior and inferior ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("rib-periosteum")}>
              {/* Rib above */}
              <path d="M185,70 Q250,65 320,80 Q322,88 320,95 Q250,80 185,85 Z"
                fill="url(#boneStipple)"
                stroke={regions["rib-periosteum"].color}
                strokeWidth={sw("rib-periosteum", 2, 0.8)} />
              <path d="M185,70 Q250,65 320,80 Q322,88 320,95 Q250,80 185,85 Z"
                fill={regions["rib-periosteum"].color}
                fillOpacity={opa("rib-periosteum", 0.3, 0.08)} />
              <text x="290" y="82" fontSize="5" fill={regions["rib-periosteum"].color}
                fontWeight="bold" opacity={opa("rib-periosteum", 1, 0.4)}>Rib above</text>
              {/* Costal groove on rib above */}
              <path d="M285,92 Q295,95 320,95"
                fill="none" stroke={regions["rib-periosteum"].color}
                strokeWidth="0.8" opacity={opa("rib-periosteum", 0.6, 0.15)} />
              {isActive("rib-periosteum") && (
                <text x="300" y="100" fontSize="3.5" fill={regions["rib-periosteum"].color} opacity="0.6">costal groove (VAN)</text>
              )}
              {/* Rib below */}
              <path d="M185,185 Q250,195 320,195 Q322,205 320,210 Q250,210 185,200 Z"
                fill="url(#boneStipple)"
                stroke={regions["rib-periosteum"].color}
                strokeWidth={sw("rib-periosteum", 2, 0.8)} />
              <path d="M185,185 Q250,195 320,195 Q322,205 320,210 Q250,210 185,200 Z"
                fill={regions["rib-periosteum"].color}
                fillOpacity={opa("rib-periosteum", 0.3, 0.08)} />
              <text x="290" y="205" fontSize="5" fill={regions["rib-periosteum"].color}
                fontWeight="bold" opacity={opa("rib-periosteum", 1, 0.4)}>Rib below</text>
            </g>

            {/* ═══ INTERCOSTAL MUSCLES — between ribs laterally ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("internal-intercostal")}>
              <rect x="310" y="95" width="12" height="100" rx="2"
                fill={regions["internal-intercostal"].color}
                fillOpacity={opa("internal-intercostal", 0.35, 0.08)}
                stroke={regions["internal-intercostal"].color}
                strokeWidth={sw("internal-intercostal", 1.5, 0.5)} />
              {/* Fibre direction marks */}
              {Array.from({ length: 5 }).map((_, i) => (
                <line key={i} x1="312" y1={102 + i * 18} x2="320" y2={108 + i * 18}
                  stroke={regions["internal-intercostal"].color} strokeWidth="0.5"
                  opacity={opa("internal-intercostal", 0.5, 0.15)} />
              ))}
              {isActive("internal-intercostal") && (
                <text x="335" y="140" fontSize="4" fill={regions["internal-intercostal"].color}>Int. IC</text>
              )}
            </g>

            <g className="cursor-pointer" onClick={() => setSelected("innermost-intercostal")}>
              <rect x="298" y="100" width="8" height="90" rx="1"
                fill={regions["innermost-intercostal"].color}
                fillOpacity={opa("innermost-intercostal", 0.35, 0.06)}
                stroke={regions["innermost-intercostal"].color}
                strokeWidth={sw("innermost-intercostal", 1.5, 0.3)} />
              {isActive("innermost-intercostal") && (
                <text x="335" y="155" fontSize="4" fill={regions["innermost-intercostal"].color}>Innermost IC</text>
              )}
            </g>

            {/* ═══ INTERCOSTAL SPACE EXTENSION ═══ */}
            <g className="cursor-pointer" onClick={() => setSelected("intercostal-ext")}>
              <path d="M260,115 L340,120 M260,155 L340,158"
                stroke={regions["intercostal-ext"].color}
                strokeWidth={sw("intercostal-ext", 2, 0.8)}
                strokeDasharray="5 3"
                opacity={opa("intercostal-ext", 0.7, 0.2)} />
              <text x="350" y="140" fontSize="5" fill={regions["intercostal-ext"].color}
                fontWeight="bold" opacity={opa("intercostal-ext", 1, 0.4)}>→ IC</text>
              <text x="350" y="148" fontSize="5" fill={regions["intercostal-ext"].color}
                opacity={opa("intercostal-ext", 0.8, 0.3)}>Space</text>
            </g>

            {/* ═══ NEEDLE TRAJECTORIES ═══ */}
            {/* Landmark technique */}
            <g opacity="0.5">
              <path d="M165,8 L148,50"
                stroke="hsl(var(--muted-foreground))" strokeWidth="2"
                strokeDasharray="4 2" fill="none" markerEnd="url(#pvArrow)" />
              <text x="172" y="12" fontSize="5" fill="hsl(var(--muted-foreground))" fontWeight="600">Needle</text>
              <text x="172" y="19" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.6">
                Contact TP, walk off
              </text>
              <text x="172" y="25" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.6">
                caudally 1–1.5 cm
              </text>
              {/* Through SCTL into PVS */}
              <path d="M148,50 Q145,68 150,90"
                stroke="hsl(140, 50%, 50%)" strokeWidth="1.5"
                strokeDasharray="3 2" fill="none" opacity="0.5" />
              <circle cx="150" cy="90" r="3" fill="hsl(140, 50%, 50%)" opacity="0.4" />
              <text x="157" y="95" fontSize="4" fill="hsl(140, 50%, 50%)" opacity="0.5">PVS entry</text>
            </g>

            {/* US-guided ESPB comparison annotation */}
            <g opacity="0.3">
              <text x="90" y="42" fontSize="3.5" fill="hsl(var(--muted-foreground))" textAnchor="middle">
                ESP block plane ↑
              </text>
              <path d="M92,44 L115,50" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
            </g>

            {/* ═══ BOUNDARY LEGEND ═══ */}
            <g>
              <text x="12" y="222" fontSize="6" fill="hsl(var(--foreground))" fontWeight="bold">PVS Boundaries (thoracic):</text>
              <text x="12" y="233" fontSize="5" fill="hsl(var(--muted-foreground))">Medial: vertebral body, IVF, disc</text>
              <text x="12" y="243" fontSize="5" fill="hsl(var(--muted-foreground))">Posterior: transverse process + SCTL</text>
              <text x="12" y="253" fontSize="5" fill="hsl(var(--muted-foreground))">Anterolateral: parietal pleura (endothoracic fascia)</text>
              <text x="12" y="263" fontSize="5" fill="hsl(var(--muted-foreground))">Superior/Inferior: heads & necks of adjacent ribs</text>
              <text x="12" y="278" fontSize="5" fill="hsl(var(--muted-foreground))" fontStyle="italic">Communications: medial → epidural (via IVF)</text>
              <text x="12" y="288" fontSize="5" fill="hsl(var(--muted-foreground))" fontStyle="italic">lateral → intercostal space</text>
              <text x="12" y="298" fontSize="5" fill="hsl(var(--muted-foreground))" fontStyle="italic">superior → cervical PVS</text>
              <text x="12" y="308" fontSize="5" fill="hsl(var(--muted-foreground))" fontStyle="italic">inferior → retroperitoneal space</text>

              {/* Depth annotations */}
              <text x="12" y="325" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.5">
                Depth to TP: 2–4 cm | TP to PVS: ~1–1.5 cm | PVS to pleura: ~1 cm
              </text>
            </g>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
            <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{info.detail}</p>
            <p className="text-xs mt-2 p-2 rounded bg-secondary/50 text-foreground leading-relaxed">
              <strong>Clinical:</strong> {info.clinicalNote}
            </p>
          </div>

          {/* Categorised structure buttons */}
          <div className="mt-3 space-y-2">
            {categories.map((cat) => (
              <div key={cat.label}>
                <p className="text-xs font-semibold text-muted-foreground mb-1">{cat.label}</p>
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
                      {regions[key].label}
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

export default ParavertebralSpaceDiagram;
