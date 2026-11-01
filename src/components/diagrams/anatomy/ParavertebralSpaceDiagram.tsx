/** Limited axial boundary schematic; former mixed-plane artwork and needle geometry remain withdrawn. */
import { ParavertebralRelationships, pvsHighlights } from "./RelationshipSchematics";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InlineRef } from "@/components/references/InlineRef";
import { PARAVERTEBRAL_SPATIAL, PRINCIPAL_VAN } from "@/components/topic/AnatomySpatialTeaching";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "../_shared/DiagramFigure";

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
    clinicalNote: "Initial needle contact target at 2.5 cm lateral to spinous process (thoracic). Depth to TP: 2–4 cm depending on body habitus. Withdraw after transverse-process contact, then redirect around the inferior (caudal) edge according to the selected approach and patient anatomy; never continue through cortex."
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
    detail: "Passes laterally through the PVS to become the intercostal nerve. Runs in the costal groove (inferior border of rib) between the internal intercostal and innermost intercostal muscles, accompanied by the intercostal artery (above) and vein (uppermost) — principal VAN order from superior to inferior; collateral arrangement varies. Gives off the lateral cutaneous branch at the mid-axillary line.",
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

const _regionOrder: RegionKey[] = [
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
  const info = regions[selected];
  const [showLabels, setShowLabels] = useState(true);
  const [showBoundaries, setShowBoundaries] = useState(true);

  return (
    <DiagramFigure
      id="paravertebral-space-diagram"
      title="Paravertebral space"
      description="Conceptual thoracic paravertebral axial boundary schematic: medial body/disc/foramen, posterior superior costotransverse ligament and anterolateral parietal pleura. Not to scale; no procedural route or complete anatomical section."
    >
                  <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Thoracic paravertebral boundary schematic"
            subtitle="Abstract axial boundaries; procedural stages are not depicted."
            toggles={[]}
          />
          <div className="flex flex-wrap gap-2 mb-3">
            <Button variant="outline" size="sm" aria-pressed={showBoundaries} onClick={() => setShowBoundaries(v => !v)}>Boundaries</Button>
            <Button variant="outline" size="sm" aria-pressed={showLabels} onClick={() => setShowLabels(v => !v)}>Labels</Button>
          </div>
  
        <div className="flex flex-col gap-4 items-start">
          <div className="w-full min-w-0 border-l-4 border-anatomy pl-4">
            <h3 className="text-sm font-semibold text-foreground">Thoracic paravertebral space — abstract axial boundary map</h3>
            <div className="w-full max-w-3xl mx-auto">
              <ParavertebralRelationships selected={selected} onSelect={key => setSelected(key as RegionKey)} labels={showLabels} boundaries={showBoundaries} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2 my-3">
              {(["pvs-contents", "vertebral-body", "disc-foramen", "superior-costotransverse", "parietal-pleura"] as RegionKey[]).map(key => (
                <Button key={key} variant="outline" aria-pressed={selected === key} className="h-auto min-h-11 whitespace-normal text-left justify-start" onClick={() => setSelected(key)}>
                  {key === "pvs-contents" ? "Compartment" : key === "vertebral-body" ? "Medial — body / disc" : key === "disc-foramen" ? "Medial — foramen" : key === "superior-costotransverse" ? "Posterior — superior costotransverse ligament" : "Anterolateral — parietal pleura"}
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">The triangle represents a compartment, not a needle target. Superior and inferior continuity is out of plane. No needle route or patient-specific access is shown.</p>
            <InlineRef topicId="thoracic-anatomy" refLabel="WFSA ATOTW 376 boundaries" />
            <p className="text-sm text-muted-foreground mt-2">{PARAVERTEBRAL_SPATIAL}</p>
            <p className="text-sm text-muted-foreground mt-2">{PRINCIPAL_VAN}</p>
            <InlineRef topicId="thoracic-anatomy" refLabel="WFSA thoracic PVB" /><InlineRef topicId="thoracic-anatomy" refLabel="Intercostal anatomy" /><InlineRef topicId="thoracic-anatomy" refLabel="Thoracic wall VAN" />
          </div>
          <div className="w-full min-w-0">
            <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
              <p className="font-bold text-sm text-foreground">{info.label}</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{info.detail}</p>
              {!pvsHighlights[selected] && <p className="text-sm text-muted-foreground">Text-only detail: this structure is not illustrated in the abstract boundary map.</p>}
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
                      <Button variant="outline" size="sm"
                        key={key}
                        aria-pressed={selected === key}
                        onClick={() => setSelected(key)}
                        className={`max-w-full h-auto whitespace-normal text-left text-xs px-2 py-1 rounded border transition-all ${
                          selected === key
                            ? "border-primary bg-primary/10 text-foreground font-medium"
                            : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {regions[key].label}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        </div>
    </DiagramFigure>
  );
};

export default ParavertebralSpaceDiagram;
