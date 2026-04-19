import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";

/**
 * Parasagittal view of the lumbar epidural space at L3/4, showing the layered
 * structures encountered by a midline Tuohy needle, the contents of the
 * epidural space (fat, Batson's plexus, segmental arteries, nerve roots) and
 * the dural sac terminating at S2.
 *
 * Conforms to STYLE_GUIDE.md: DiagramToggleBar header, prefixed defs ids
 * (eps-), radial depth gradient, tissue/bone patterns, vault drop-shadow,
 * compass labels, default selection, left-border detail panel keyed to region.
 */

type StructureKey =
  | "skin"
  | "subcut"
  | "supraspinous"
  | "interspinous"
  | "flavum"
  | "epidural-fat"
  | "batson"
  | "segmental-artery"
  | "dura"
  | "csf"
  | "cauda"
  | "spinous"
  | "lamina"
  | "vertebral-body"
  | "disc"
  | "needle";

interface StructureInfo {
  label: string;
  region: "soft-tissue" | "ligament" | "epidural" | "dural" | "bone" | "needle";
  color: string;
  detail: string;
  clinical: string;
}

const REGION_COLOR: Record<StructureInfo["region"], string> = {
  "soft-tissue": "hsl(30, 55%, 60%)",
  ligament: "hsl(50, 55%, 50%)",
  epidural: "hsl(140, 45%, 50%)",
  dural: "hsl(270, 40%, 55%)",
  bone: "hsl(35, 35%, 55%)",
  needle: "hsl(var(--muted-foreground))",
};

const STRUCTURES: Record<StructureKey, StructureInfo> = {
  skin: {
    label: "Skin",
    region: "soft-tissue",
    color: "hsl(30, 55%, 65%)",
    detail: "Epidermis + dermis. Infiltrate with 1% lidocaine prior to needle insertion.",
    clinical: "Sterile prep with 0.5% chlorhexidine in 70% alcohol; allow to dry before puncture.",
  },
  subcut: {
    label: "Subcutaneous fat",
    region: "soft-tissue",
    color: "hsl(40, 60%, 72%)",
    detail: "1–8 cm thick. Skin-to-epidural depth correlates with BMI (~5 cm in 50% of adults at L3/4).",
    clinical: "Standard 8 cm Tuohy may be too short in morbid obesity — use long (15 cm) needle.",
  },
  supraspinous: {
    label: "Supraspinous ligament",
    region: "ligament",
    color: "hsl(210, 40%, 60%)",
    detail: "Strong fibrous band over spinous process tips. First firm resistance in midline approach.",
    clinical: "May be calcified in elderly — consider paramedian approach, which avoids both supraspinous and interspinous ligaments.",
  },
  interspinous: {
    label: "Interspinous ligament",
    region: "ligament",
    color: "hsl(200, 40%, 55%)",
    detail: "Loose ligament between adjacent spinous processes. Often deficient in elderly → false loss of resistance.",
    clinical: "Gritty feel as Tuohy advances. False LOR here is a recognised pitfall — confirm true LOR by inability to inject air/saline freely until flavum is breached.",
  },
  flavum: {
    label: "Ligamentum flavum",
    region: "ligament",
    color: "hsl(55, 65%, 52%)",
    detail: "Paired elastic ligaments between adjacent laminae. 3–5 mm thick at L2/3 (up to 6 mm). 80% elastin → yellow. Midline gap in up to 10% of patients.",
    clinical: "Provides the characteristic 'gritty' resistance immediately before LOR. Midline gap → false LOR; paramedian approach engages flavum more reliably. Calcification → difficult passage in elderly.",
  },
  "epidural-fat": {
    label: "Epidural space (fat)",
    region: "epidural",
    color: "hsl(140, 50%, 50%)",
    detail: "Potential space, 4–6 mm deep posteriorly at L2/3. Contains semi-liquid fat, lymphatics, segmental nerve roots, internal vertebral venous plexus (Batson's), and segmental arteries. Pressure ~atmospheric at lumbar level (negative thoracically).",
    clinical: "Loss of resistance target. 0.3–0.5 mL of LA per dermatome in adults. Catheter threaded 3–5 cm into space (>5 cm → unilateral block, knotting, intrathecal/intravascular migration). Engorged Batson's plexus in pregnancy reduces effective volume → smaller doses needed.",
  },
  batson: {
    label: "Batson's venous plexus",
    region: "epidural",
    color: "hsl(220, 60%, 55%)",
    detail: "Internal vertebral venous plexus — valveless veins anterolateral in epidural space, communicating with abdominal/pelvic veins. Engorged in pregnancy and raised intra-abdominal pressure.",
    clinical: "Tuohy or catheter trauma → bloody tap (~10%) or intravascular cannulation (~3%, higher in pregnancy). Test dose (3 mL 1.5% lidocaine + 1:200,000 adrenaline) detects this. Major risk for epidural haematoma if anticoagulated (AAGBI/ESRA neuraxial guidelines).",
  },
  "segmental-artery": {
    label: "Segmental spinal artery",
    region: "epidural",
    color: "hsl(0, 65%, 55%)",
    detail: "Branches of lumbar/intercostal arteries enter via intervertebral foramina, divide into anterior + posterior radicular branches. Most reinforce ASA at one or two levels only — artery of Adamkiewicz (T9–T12, 75% left) is the largest.",
    clinical: "Inadvertent arterial cannulation or vasospasm during transforaminal injection → anterior spinal artery syndrome (motor + spinothalamic loss, dorsal columns spared). Particulate steroids contraindicated transforaminally for this reason.",
  },
  dura: {
    label: "Dura mater",
    region: "dural",
    color: "hsl(270, 45%, 55%)",
    detail: "Tough outer meningeal layer (~0.4 mm). Continuous with cranial dura. Dural sac ends at S2 in adults (S3 in neonates). Fibres predominantly longitudinal — pencil-point needles part fibres rather than cut them.",
    clinical: "Accidental dural puncture with 16/18G Tuohy → PDPH in 70–80% of obstetric patients. Pencil-point 25–27G spinal needles (Whitacre/Sprotte) → PDPH <1%. Epidural blood patch ~70–90% effective.",
  },
  csf: {
    label: "Subarachnoid space (CSF)",
    region: "dural",
    color: "hsl(195, 65%, 55%)",
    detail: "CSF: SG 1.003–1.009, pH 7.32, ~150 mL total (~75 mL spinal). Cauda equina floats freely below L1/2. Free CSF flow on aspiration confirms intrathecal placement.",
    clinical: "Spinal anaesthesia target. Hyperbaric 0.5% bupivacaine (SG 1.026) sinks with gravity — use lateral position to direct block. Isobaric solution gives less positional spread.",
  },
  cauda: {
    label: "Cauda equina",
    region: "dural",
    color: "hsl(280, 50%, 55%)",
    detail: "L2–S5 nerve roots descending in CSF below conus medullaris (L1/2 in adults). Roots float freely and deflect from a needle, hence relative safety of L3/4 or L4/5 puncture.",
    clinical: "Cauda equina syndrome: rare but devastating complication of continuous spinal with hyperbaric 5% lidocaine via microcatheter (now withdrawn). Saddle anaesthesia + bowel/bladder dysfunction.",
  },
  spinous: {
    label: "Spinous process",
    region: "bone",
    color: "hsl(35, 35%, 55%)",
    detail: "Posterior bony projection of vertebral arch. L4 spinous process lies on the intercristal line (Tuffier's line) — the standard surface landmark for L3/4 or L4/5 interspace.",
    clinical: "Hard contact in midline approach → walk needle off cephalad or caudad to find interspinous gap. Tuffier's line is unreliable in obesity (palpates higher) and pregnancy.",
  },
  lamina: {
    label: "Lamina",
    region: "bone",
    color: "hsl(35, 35%, 55%)",
    detail: "Flat bony plate forming the posterior wall of the vertebral canal, lateral to the spinous process. Connected to adjacent lamina by ligamentum flavum.",
    clinical: "Lamina contact in paramedian approach → walk needle medially and caudally off the lamina to engage flavum. Paramedian approach 1 cm lateral and 1 cm caudal to spinous tip.",
  },
  "vertebral-body": {
    label: "Vertebral body",
    region: "bone",
    color: "hsl(35, 35%, 58%)",
    detail: "Anterior weight-bearing element. Posterior longitudinal ligament runs on its posterior surface, forming the anterior wall of the canal.",
    clinical: "Bone contact anterior to dura indicates needle has traversed the entire canal — withdraw immediately.",
  },
  disc: {
    label: "Intervertebral disc",
    region: "bone",
    color: "hsl(15, 45%, 55%)",
    detail: "Annulus fibrosus (collagen lamellae) + nucleus pulposus. Avascular in adult — relies on diffusion. Thinner posteriorly, where PLL is also narrowest → posterolateral prolapse most common.",
    clinical: "Disc puncture → discitis (rare but serious). Avoid transforaminal injection through bulging disc. Modic changes on MRI = chronic disc inflammation.",
  },
  needle: {
    label: "Tuohy needle (16–18G)",
    region: "needle",
    color: "hsl(var(--foreground))",
    detail: "Curved Huber tip directs catheter craniad. Standard length 8 cm with 1 cm depth markings. LOR syringe (glass or low-resistance plastic) attached after flavum engagement.",
    clinical: "LOR with saline (most common) or air. Air carries small risk of pneumocephalus / venous air embolism / patchy block; saline can be confused with CSF. After LOR: thread catheter 3–5 cm, secure, test dose, then incremental dosing.",
  },
};

const STRUCTURE_ORDER: StructureKey[] = [
  "skin", "subcut", "supraspinous", "interspinous", "flavum",
  "epidural-fat", "batson", "segmental-artery", "dura", "csf", "cauda",
  "spinous", "lamina", "vertebral-body", "disc", "needle",
];

const EpiduralSpaceDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("epidural-fat");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const info = STRUCTURES[selected];
  const accent = REGION_COLOR[info.region];

  const handlePick = (k: StructureKey) =>
    setSelected((prev) => (prev === k ? prev : k));

  // Reusable highlight props (paired highlighting where relevant).
  const opa = (key: StructureKey, on: number, off: number) =>
    selected === key ? on : off;
  const sw = (key: StructureKey, on: number, off: number) =>
    selected === key ? on : off;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Epidural space — parasagittal section at L3/4"
          subtitle="Tap any layer or content to see clinical relevance for neuraxial anaesthesia"
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        <div className="flex justify-center">
          <svg
            viewBox="0 0 600 470"
            className="w-full max-w-2xl h-auto"
            role="img"
            aria-label="Parasagittal diagram of the lumbar epidural space at L3/4 with Tuohy needle in situ"
          >
            <defs>
              {/* Radial gradient for canal depth */}
              <radialGradient id="eps-canalShade" cx="55%" cy="50%" r="55%">
                <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.18" />
                <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.04" />
              </radialGradient>

              {/* Bone grain (cancellous stipple) */}
              <pattern id="eps-boneGrain" patternUnits="userSpaceOnUse" width="6" height="6">
                <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.22" />
                <circle cx="4" cy="4" r="0.3" fill="hsl(var(--muted-foreground))" opacity="0.16" />
              </pattern>

              {/* Skin / dermal grain */}
              <pattern id="eps-skinTex" patternUnits="userSpaceOnUse" width="5" height="5">
                <circle cx="2.5" cy="2.5" r="0.35" fill="hsl(30, 40%, 50%)" opacity="0.22" />
              </pattern>

              {/* Subcutaneous fat globules */}
              <pattern id="eps-fatTex" patternUnits="userSpaceOnUse" width="14" height="11">
                <ellipse cx="7" cy="5.5" rx="4.5" ry="3.2" fill="hsl(40, 55%, 72%)" opacity="0.28"
                  stroke="hsl(38, 40%, 58%)" strokeWidth="0.3" />
              </pattern>

              {/* Collagen — supraspinous / interspinous */}
              <pattern id="eps-collagen" patternUnits="userSpaceOnUse" width="4" height="14" patternTransform="rotate(12)">
                <line x1="2" y1="0" x2="2" y2="14" stroke="hsl(210, 30%, 50%)" strokeWidth="0.5" opacity="0.32" />
              </pattern>

              {/* Elastic fibres — flavum */}
              <pattern id="eps-elastic" patternUnits="userSpaceOnUse" width="8" height="20">
                <path d="M4,0 Q6,5 4,10 Q2,15 4,20" fill="none" stroke="hsl(55, 50%, 45%)" strokeWidth="0.6" opacity="0.4" />
              </pattern>

              {/* Epidural fat — chunky lobules */}
              <pattern id="eps-epiFat" patternUnits="userSpaceOnUse" width="12" height="10">
                <ellipse cx="6" cy="5" rx="3.5" ry="2.6" fill="hsl(140, 45%, 60%)" opacity="0.22"
                  stroke="hsl(140, 40%, 45%)" strokeWidth="0.3" />
              </pattern>

              {/* Dural fibre lines */}
              <pattern id="eps-duraTex" patternUnits="userSpaceOnUse" width="6" height="3">
                <line x1="0" y1="1.5" x2="6" y2="1.5" stroke="hsl(270, 35%, 45%)" strokeWidth="0.45" opacity="0.45" />
              </pattern>

              {/* Vault shadow filter */}
              <filter id="eps-vaultShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="0" dy="2" result="off" />
                <feComponentTransfer><feFuncA type="linear" slope="0.30" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>

              <marker id="eps-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>

            {/* Reference midline (canal long axis) */}
            {showSutures && (
              <line x1="395" y1="20" x2="395" y2="450"
                stroke="hsl(var(--muted-foreground))" strokeDasharray="2 4" opacity="0.25" />
            )}

            {/* Compass labels */}
            <text x="300" y="14" textAnchor="middle"
              className="text-[9px] fill-muted-foreground font-medium">SUPERIOR</text>
            <text x="300" y="464" textAnchor="middle"
              className="text-[9px] fill-muted-foreground font-medium">INFERIOR</text>
            <text x="10" y="240" className="text-[9px] fill-muted-foreground font-medium">POSTERIOR</text>
            <text x="590" y="240" textAnchor="end"
              className="text-[9px] fill-muted-foreground font-medium">ANTERIOR</text>

            {/* ───── SOFT TISSUE LAYERS (posterior, left of canal in this view) ───── */}
            {/* Skin */}
            <g onClick={() => handlePick("skin")} className="cursor-pointer">
              <rect x="20" y="40" width="36" height="390" fill="hsl(30,55%,65%)"
                fillOpacity={opa("skin", 0.85, 0.55)} stroke={STRUCTURES.skin.color}
                strokeWidth={sw("skin", 1.6, 0.8)} />
              <rect x="20" y="40" width="36" height="390" fill="url(#eps-skinTex)" pointerEvents="none" />
            </g>

            {/* Subcutaneous fat */}
            <g onClick={() => handlePick("subcut")} className="cursor-pointer">
              <rect x="56" y="40" width="64" height="390" fill="hsl(40,60%,72%)"
                fillOpacity={opa("subcut", 0.85, 0.55)} stroke="hsl(38,45%,55%)"
                strokeWidth={sw("subcut", 1.4, 0.6)} />
              <rect x="56" y="40" width="64" height="390" fill="url(#eps-fatTex)" pointerEvents="none" />
            </g>

            {/* Supraspinous + Interspinous ligament strip (between spinous processes) */}
            {/* Supraspinous (continuous strip over tips of spinous processes) */}
            <g onClick={() => handlePick("supraspinous")} className="cursor-pointer">
              <rect x="120" y="40" width="22" height="390" fill="hsl(210,40%,60%)"
                fillOpacity={opa("supraspinous", 0.85, 0.50)} stroke="hsl(210,35%,45%)"
                strokeWidth={sw("supraspinous", 1.6, 0.6)} />
              <rect x="120" y="40" width="22" height="390" fill="url(#eps-collagen)" pointerEvents="none" />
            </g>

            {/* ───── BONY ELEMENTS — three vertebrae L2, L3, L4 ───── */}
            {/* Spinous processes (3 of them, with interspinous gaps) */}
            {[
              { y: 60, key: "L2" },
              { y: 200, key: "L3" },
              { y: 340, key: "L4" },
            ].map((v) => (
              <g key={v.key}>
                {/* Spinous process body */}
                <g onClick={() => handlePick("spinous")} className="cursor-pointer">
                  <path
                    d={`M142,${v.y} L260,${v.y + 18} L260,${v.y + 70} L142,${v.y + 88} Z`}
                    fill="hsl(35,35%,55%)" fillOpacity={opa("spinous", 0.85, 0.55)}
                    stroke="hsl(30,40%,40%)" strokeWidth={sw("spinous", 1.6, 0.8)}
                    filter="url(#eps-vaultShadow)"
                  />
                  <path
                    d={`M142,${v.y} L260,${v.y + 18} L260,${v.y + 70} L142,${v.y + 88} Z`}
                    fill="url(#eps-boneGrain)" pointerEvents="none"
                  />
                  {showLabels && (
                    <text x="200" y={v.y + 50} textAnchor="middle"
                      className="text-[9px] fill-foreground font-semibold pointer-events-none">
                      {v.key}
                    </text>
                  )}
                </g>

                {/* Lamina */}
                <g onClick={() => handlePick("lamina")} className="cursor-pointer">
                  <path
                    d={`M260,${v.y + 18} L340,${v.y + 22} L340,${v.y + 66} L260,${v.y + 70} Z`}
                    fill="hsl(35,35%,55%)" fillOpacity={opa("lamina", 0.85, 0.45)}
                    stroke="hsl(30,40%,40%)" strokeWidth={sw("lamina", 1.6, 0.7)}
                  />
                  <path
                    d={`M260,${v.y + 18} L340,${v.y + 22} L340,${v.y + 66} L260,${v.y + 70} Z`}
                    fill="url(#eps-boneGrain)" pointerEvents="none"
                  />
                </g>
              </g>
            ))}

            {/* Interspinous + flavum spans (in the gaps between L2/L3 and L3/L4) */}
            {[
              { yTop: 148, yBot: 200 }, // L2/L3
              { yTop: 288, yBot: 340 }, // L3/L4 — needle target
            ].map((gap, i) => (
              <g key={`gap-${i}`}>
                {/* Interspinous ligament — between adjacent spinous tips */}
                <g onClick={() => handlePick("interspinous")} className="cursor-pointer">
                  <path
                    d={`M142,${gap.yTop} L260,${gap.yTop + 18} L260,${gap.yBot} L142,${gap.yBot} Z`}
                    fill="hsl(200,40%,55%)" fillOpacity={opa("interspinous", 0.85, 0.45)}
                    stroke="hsl(200,35%,40%)" strokeWidth={sw("interspinous", 1.6, 0.6)}
                  />
                  <path
                    d={`M142,${gap.yTop} L260,${gap.yTop + 18} L260,${gap.yBot} L142,${gap.yBot} Z`}
                    fill="url(#eps-collagen)" pointerEvents="none"
                  />
                </g>

                {/* Ligamentum flavum — between adjacent laminae */}
                <g onClick={() => handlePick("flavum")} className="cursor-pointer">
                  <path
                    d={`M260,${gap.yTop + 18} L340,${gap.yTop + 22} L340,${gap.yBot + 6} L260,${gap.yBot} Z`}
                    fill="hsl(55,65%,52%)" fillOpacity={opa("flavum", 0.90, 0.60)}
                    stroke="hsl(50,60%,38%)" strokeWidth={sw("flavum", 1.8, 0.8)}
                  />
                  <path
                    d={`M260,${gap.yTop + 18} L340,${gap.yTop + 22} L340,${gap.yBot + 6} L260,${gap.yBot} Z`}
                    fill="url(#eps-elastic)" pointerEvents="none"
                  />
                </g>
              </g>
            ))}

            {/* ───── EPIDURAL SPACE (anterior to flavum / lamina, posterior to dura) ───── */}
            <g onClick={() => handlePick("epidural-fat")} className="cursor-pointer">
              <rect x="340" y="40" width="50" height="390" fill="url(#eps-canalShade)" pointerEvents="none" />
              <rect x="340" y="40" width="50" height="390" fill="hsl(140,50%,50%)"
                fillOpacity={opa("epidural-fat", 0.55, 0.30)}
                stroke="hsl(140,45%,38%)" strokeWidth={sw("epidural-fat", 1.6, 0.6)} />
              <rect x="340" y="40" width="50" height="390" fill="url(#eps-epiFat)" pointerEvents="none" />
            </g>

            {/* Batson's venous plexus — anterolateral, blue serpiginous channels */}
            {showSutures && (
              <g onClick={() => handlePick("batson")} className="cursor-pointer pointer-events-auto">
                <path d="M378,60 Q372,90 380,120 Q388,150 378,185 Q370,220 380,255 Q388,290 376,325 Q368,360 380,400"
                  fill="none" stroke="hsl(220,60%,55%)"
                  strokeWidth={sw("batson", 3.2, 2.0)}
                  opacity={opa("batson", 0.95, 0.55)} />
                <path d="M362,80 Q368,110 360,140 Q352,170 362,200 Q372,230 360,265 Q352,300 362,335"
                  fill="none" stroke="hsl(220,55%,60%)"
                  strokeWidth={sw("batson", 2.4, 1.4)}
                  opacity={opa("batson", 0.85, 0.45)} />
              </g>
            )}

            {/* Segmental artery — entering at L3/4 foramen on right */}
            {showSutures && (
              <g onClick={() => handlePick("segmental-artery")} className="cursor-pointer">
                <path d="M520,300 Q480,295 440,295 Q410,295 388,302"
                  fill="none" stroke="hsl(0,65%,55%)"
                  strokeWidth={sw("segmental-artery", 2.4, 1.6)}
                  opacity={opa("segmental-artery", 0.95, 0.6)} />
                <circle cx="388" cy="302" r="2.4" fill="hsl(0,65%,55%)"
                  opacity={opa("segmental-artery", 1, 0.6)} />
              </g>
            )}

            {/* ───── DURA + CSF + CAUDA EQUINA ───── */}
            <g onClick={() => handlePick("dura")} className="cursor-pointer">
              <rect x="390" y="40" width="6" height="390" fill="hsl(270,45%,55%)"
                fillOpacity={opa("dura", 0.95, 0.65)}
                stroke="hsl(270,40%,40%)" strokeWidth={sw("dura", 1.6, 0.6)} />
              <rect x="390" y="40" width="6" height="390" fill="url(#eps-duraTex)" pointerEvents="none" />
            </g>

            <g onClick={() => handlePick("csf")} className="cursor-pointer">
              <rect x="396" y="40" width="56" height="390" fill="hsl(195,65%,55%)"
                fillOpacity={opa("csf", 0.55, 0.30)}
                stroke="hsl(195,60%,45%)" strokeWidth={sw("csf", 1.4, 0.4)} />
            </g>

            {/* Cauda equina nerve roots — flowing strands inside CSF */}
            <g onClick={() => handlePick("cauda")} className="cursor-pointer">
              {Array.from({ length: 8 }).map((_, i) => {
                const x = 402 + i * 6;
                return (
                  <path key={i}
                    d={`M${x},45 Q${x + (i % 2 ? 4 : -4)},150 ${x + (i % 2 ? -2 : 2)},260 Q${x + (i % 2 ? -6 : 6)},360 ${x + (i % 2 ? 2 : -2)},425`}
                    fill="none" stroke="hsl(280,50%,55%)"
                    strokeWidth={sw("cauda", 1.4, 0.9)}
                    opacity={opa("cauda", 0.95, 0.55)}
                  />
                );
              })}
            </g>

            {/* Anterior structures — vertebral body + disc */}
            {[
              { y: 70, h: 110, key: "L2" },
              { y: 210, h: 110, key: "L3" },
              { y: 350, h: 80, key: "L4" },
            ].map((b) => (
              <g key={`vb-${b.key}`} onClick={() => handlePick("vertebral-body")} className="cursor-pointer">
                <rect x="452" y={b.y} width="120" height={b.h} rx="8"
                  fill="hsl(35,35%,58%)" fillOpacity={opa("vertebral-body", 0.85, 0.55)}
                  stroke="hsl(30,40%,40%)" strokeWidth={sw("vertebral-body", 1.4, 0.7)}
                  filter="url(#eps-vaultShadow)" />
                <rect x="452" y={b.y} width="120" height={b.h} rx="8"
                  fill="url(#eps-boneGrain)" pointerEvents="none" />
                {showLabels && (
                  <text x="512" y={b.y + b.h / 2 + 3} textAnchor="middle"
                    className="text-[10px] fill-foreground font-semibold pointer-events-none">
                    {b.key}
                  </text>
                )}
              </g>
            ))}

            {/* Discs */}
            {[
              { y: 180 },
              { y: 320 },
            ].map((d, i) => (
              <g key={`disc-${i}`} onClick={() => handlePick("disc")} className="cursor-pointer">
                <rect x="452" y={d.y} width="120" height="30" rx="4"
                  fill="hsl(15,45%,55%)" fillOpacity={opa("disc", 0.85, 0.55)}
                  stroke="hsl(10,45%,38%)" strokeWidth={sw("disc", 1.6, 0.7)} />
              </g>
            ))}

            {/* ───── TUOHY NEEDLE — entering at L3/4, midline, engaging flavum ───── */}
            <g onClick={() => handlePick("needle")} className="cursor-pointer">
              {/* Hub */}
              <rect x="-2" y="295" width="22" height="20" rx="3"
                fill="hsl(var(--foreground))" opacity={opa("needle", 1, 0.85)} />
              {/* Wings */}
              <path d="M14,295 L26,288 L26,322 L14,315 Z"
                fill="hsl(var(--foreground))" opacity={opa("needle", 1, 0.85)} />
              {/* Shaft */}
              <line x1="20" y1="305" x2="346" y2="312"
                stroke="hsl(var(--foreground))" strokeWidth={sw("needle", 4, 3)}
                opacity={opa("needle", 1, 0.85)} />
              {/* Curved Huber tip */}
              <path d="M340,310 Q352,312 352,320"
                fill="none" stroke="hsl(var(--foreground))" strokeWidth={sw("needle", 4, 3)}
                strokeLinecap="round" opacity={opa("needle", 1, 0.85)} />
              {/* LOR drop */}
              <circle cx="358" cy="324" r="4" fill="hsl(140,55%,50%)"
                opacity={opa("epidural-fat", 1, 0.7)} />
              {showLabels && (
                <text x="120" y="288"
                  className="text-[9px] fill-foreground font-semibold pointer-events-none">
                  Tuohy 16G
                </text>
              )}
            </g>

            {/* Catheter being threaded into space */}
            {showSutures && (
              <path d="M358,324 Q380,318 400,330 Q420,340 440,336 Q460,332 478,338"
                fill="none" stroke="hsl(140,55%,40%)" strokeWidth="1.4"
                strokeDasharray="3 2" opacity="0.55" />
            )}

            {/* ───── LABELS (gated by showLabels) ───── */}
            {showLabels && (
              <g className="text-[8px] fill-foreground pointer-events-none">
                <text x="22" y="36">Skin</text>
                <text x="58" y="36">Subcut. fat</text>
                <text x="122" y="36">Supraspinous</text>
                <text x="262" y="36">Interspinous /</text>
                <text x="262" y="44">flavum (in gaps)</text>
                <text x="345" y="36" className="fill-foreground font-semibold">Epidural</text>
                <text x="345" y="44">space (fat)</text>
                <text x="397" y="36" className="fill-foreground font-semibold">Dura</text>
                <text x="420" y="36">CSF / cauda equina</text>
                <text x="500" y="36">Vertebral body</text>

                {/* Leader lines for inline structures */}
                {showSutures && (
                  <>
                    <line x1="378" y1="155" x2="318" y2="155" stroke="hsl(220,55%,50%)" strokeWidth="0.5" opacity="0.6" />
                    <text x="316" y="158" textAnchor="end" className="fill-foreground">Batson's plexus</text>

                    <line x1="455" y1="297" x2="528" y2="297" stroke="hsl(0,55%,45%)" strokeWidth="0.5" opacity="0.6" />
                    <text x="532" y="300" className="fill-foreground">Segmental artery</text>
                  </>
                )}
              </g>
            )}
          </svg>
        </div>

        {/* Mnemonic / footer */}
        <p className="text-xs text-center text-muted-foreground mt-2 italic">
          <span className="font-semibold not-italic text-foreground">Skin → Fat → Supraspinous → Interspinous → Flavum → </span>
          POP — loss of resistance into epidural space.
        </p>

        {/* Detail panel */}
        <div className="mt-4 min-h-[110px]">
          {info ? (
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
              style={{ borderLeftWidth: 4, borderLeftColor: accent }}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-foreground text-sm">{info.label}</p>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{ background: `${accent}26`, color: accent }}
                >
                  {info.region.replace("-", " ")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Anatomy:</span> {info.detail}
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Clinical:</span> {info.clinical}
              </p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center italic">
              Tap a structure above to see clinical relevance.
            </p>
          )}
        </div>

        {/* Quick chip row */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {STRUCTURE_ORDER.map((k) => {
            const s = STRUCTURES[k];
            const active = selected === k;
            const c = REGION_COLOR[s.region];
            return (
              <button
                key={k}
                type="button"
                onClick={() => handlePick(k)}
                className="text-[11px] px-2 py-0.5 rounded-full border transition-colors"
                style={{
                  borderColor: active ? c : "hsl(var(--border))",
                  background: active ? `${c}1F` : "transparent",
                  color: active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EpiduralSpaceDiagram;
