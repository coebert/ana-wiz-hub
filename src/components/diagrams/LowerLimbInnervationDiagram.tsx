// Lower limb innervation — anterior + posterior views, code-defined SVG.
// Anatomical convention: viewer faces patient. Anterior view → patient's RIGHT
// is on viewer's LEFT half of the SVG; lateral structures (LFCN, common fibular
// at fibular neck) sit on the viewer-LEFT margin of the limb. Posterior view
// uses the same convention.
import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

type NerveKey =
  | "lumbar-plexus"
  | "sacral-plexus"
  | "lateral-femoral-cutaneous"
  | "femoral"
  | "obturator"
  | "saphenous"
  | "superior-gluteal"
  | "inferior-gluteal"
  | "sciatic"
  | "posterior-femoral-cutaneous"
  | "common-fibular"
  | "tibial"
  | "deep-fibular"
  | "superficial-fibular"
  | "sural"
  | "medial-plantar"
  | "lateral-plantar";

interface Nerve {
  label: string;
  roots: string;
  color: string;
  view: "anterior" | "posterior" | "both";
  detail: string;
  clinical: string;
}

const NERVES: Record<NerveKey, Nerve> = {
  "lumbar-plexus": {
    label: "Lumbar Plexus", roots: "L1–L4", color: "hsl(265 55% 55%)", view: "anterior",
    detail: "Anterior rami of L1–L4 (with a contribution from T12) form the lumbar plexus within the substance of psoas major. Branches emerge along the lateral, anterior and medial borders of psoas.",
    clinical: "Posterior approach to lumbar plexus block targets the plexus within psoas at L4. Provides femoral, obturator and lateral femoral cutaneous coverage for hip surgery.",
  },
  "sacral-plexus": {
    label: "Sacral Plexus", roots: "L4–S4", color: "hsl(140 50% 42%)", view: "anterior",
    detail: "Lumbosacral trunk (L4–L5) joins anterior rami of S1–S4 on the anterior surface of piriformis. Gives rise to the sciatic, superior and inferior gluteal, posterior femoral cutaneous and pudendal nerves.",
    clinical: "Parasacral approach blocks the entire sacral plexus before it divides — useful for hip and proximal femur surgery in combination with a lumbar plexus block.",
  },
  "lateral-femoral-cutaneous": {
    label: "Lateral femoral cutaneous nerve", roots: "L2–L3", color: "hsl(285 50% 55%)", view: "anterior",
    detail: "Pure sensory branch of the lumbar plexus. Emerges at the lateral border of psoas, crosses iliacus and passes under (or through) the inguinal ligament ~1 cm medial to the ASIS to supply the lateral thigh.",
    clinical: "Entrapment at the inguinal ligament = meralgia paraesthetica (burning anterolateral thigh). Targeted in fascia iliaca block; missed by a pure femoral nerve block.",
  },
  femoral: {
    label: "Femoral nerve", roots: "L2–L4", color: "hsl(48 92% 48%)", view: "anterior",
    detail: "Largest branch of the lumbar plexus. Descends between psoas and iliacus, passes UNDER the inguinal ligament LATERAL to the femoral artery (mnemonic VAN: vein–artery–nerve, medial to lateral). Divides into anterior (sensory + sartorius) and posterior (quadriceps + saphenous) divisions in the femoral triangle.",
    clinical: "Blocked below the inguinal ligament, ~1 cm lateral to the femoral artery pulsation. Provides analgesia for femoral shaft fracture and anterior knee surgery; quadriceps weakness limits early mobilisation — adductor canal block is the motor-sparing alternative.",
  },
  obturator: {
    label: "Obturator nerve", roots: "L2–L4", color: "hsl(140 55% 38%)", view: "anterior",
    detail: "Emerges from the medial border of psoas, passes through the obturator foramen and divides into anterior and posterior divisions around adductor brevis. Motor to the adductor compartment; small variable cutaneous patch on the medial thigh.",
    clinical: "Not reliably covered by a femoral nerve block. Direct obturator block prevents adductor jerk during transurethral resection of lateral bladder wall tumours.",
  },
  saphenous: {
    label: "Saphenous nerve", roots: "L3–L4", color: "hsl(45 80% 55%)", view: "anterior",
    detail: "Largest cutaneous branch of the femoral nerve. Travels with the femoral artery through the adductor canal (Hunter's canal), exits between sartorius and gracilis above the knee, then runs subcutaneously alongside the great saphenous vein down the medial leg to the medial malleolus.",
    clinical: "Sole sensory contribution from the femoral nerve below the knee — covers medial leg and ankle. Blocked at the adductor canal (motor-sparing for TKA) or at the ankle (medial malleolus, alongside GSV).",
  },
  "superior-gluteal": {
    label: "Superior gluteal nerve", roots: "L4–S1", color: "hsl(265 60% 55%)", view: "posterior",
    detail: "Leaves the pelvis through the greater sciatic foramen ABOVE piriformis with the superior gluteal vessels. Supplies gluteus medius, gluteus minimus and tensor fasciae latae.",
    clinical: "Damage (e.g. poorly placed gluteal IM injection or hip surgery) causes a Trendelenburg gait — pelvic drop on the contralateral side during single-leg stance.",
  },
  "inferior-gluteal": {
    label: "Inferior gluteal nerve", roots: "L5–S2", color: "hsl(330 65% 60%)", view: "posterior",
    detail: "Leaves the pelvis through the greater sciatic foramen BELOW piriformis. Sole motor supply to gluteus maximus.",
    clinical: "Injury weakens hip extension — patients report difficulty rising from a seated position or climbing stairs.",
  },
  sciatic: {
    label: "Sciatic nerve", roots: "L4–S3", color: "hsl(28 90% 50%)", view: "posterior",
    detail: "Largest nerve in the body. Exits the pelvis through the greater sciatic foramen below piriformis, descends between the ischial tuberosity and greater trochanter, and runs down the posterior thigh deep to biceps femoris. Two functional components from the outset: tibial (anterior divisions L4–S3) and common fibular (posterior divisions L4–S2). Divides into its terminal branches typically at the apex of the popliteal fossa.",
    clinical: "Subgluteal, anterior and popliteal approaches available. The popliteal block is performed proximal to the bifurcation (~7 cm above the popliteal crease) for foot and ankle surgery.",
  },
  "posterior-femoral-cutaneous": {
    label: "Posterior femoral cutaneous nerve", roots: "S1–S3", color: "hsl(330 55% 55%)", view: "posterior",
    detail: "Pure sensory nerve from the sacral plexus. Exits the pelvis below piriformis with the sciatic nerve, then runs subcutaneously down the posterior thigh deep to the fascia lata. Supplies skin of the buttock (perineal branch), posterior thigh and upper popliteal fossa.",
    clinical: "Not blocked by a popliteal sciatic block — must be supplemented for tourniquet pain on the posterior thigh or for procedures involving the posterior thigh skin.",
  },
  "common-fibular": {
    label: "Common fibular (peroneal) nerve", roots: "L4–S2", color: "hsl(215 70% 40%)", view: "posterior",
    detail: "Lateral terminal branch of the sciatic nerve. Descends along the medial border of biceps femoris, then winds SUPERFICIALLY around the neck of the fibula before dividing into deep and superficial fibular branches.",
    clinical: "Extremely vulnerable at the fibular neck — compression by plaster casts, prolonged lithotomy or knee braces causes foot drop (loss of dorsiflexion + eversion) and sensory loss over the dorsum of the foot.",
  },
  tibial: {
    label: "Tibial nerve", roots: "L4–S3", color: "hsl(180 55% 40%)", view: "posterior",
    detail: "Medial terminal branch of the sciatic nerve. Descends through the popliteal fossa SUPERFICIAL to the popliteal vessels, passes deep to the soleal arch into the deep posterior compartment, and runs behind the medial malleolus in the tarsal tunnel before dividing into medial and lateral plantar nerves.",
    clinical: "Motor to all of the posterior compartment (plantarflexion, inversion) and intrinsic plantar muscles. Sensory to the sole. Blocked at the popliteal fossa or behind the medial malleolus for foot surgery.",
  },
  "deep-fibular": {
    label: "Deep fibular nerve", roots: "L4–S1", color: "hsl(215 80% 50%)", view: "posterior",
    detail: "Anterior terminal branch of the common fibular nerve. Pierces the anterior intermuscular septum and descends with the anterior tibial artery between tibialis anterior and EHL. Motor to the anterior compartment (dorsiflexion + toe extension); a small sensory patch in the first dorsal web space.",
    clinical: "Anterior compartment syndrome compresses the deep fibular nerve and anterior tibial artery — early loss of sensation in the first web space is the classic warning sign.",
  },
  "superficial-fibular": {
    label: "Superficial fibular nerve", roots: "L5–S1", color: "hsl(195 80% 65%)", view: "posterior",
    detail: "Lateral terminal branch of the common fibular nerve. Runs in the lateral compartment supplying fibularis longus and brevis (eversion), then pierces the deep fascia in the distal third of the leg to supply skin over the dorsum of the foot (sparing the first web space).",
    clinical: "Sensory loss over the dorsum of the foot with preserved first web space sensation localises the lesion to the superficial fibular nerve.",
  },
  sural: {
    label: "Sural nerve", roots: "S1–S2", color: "hsl(25 50% 40%)", view: "posterior",
    detail: "Pure sensory nerve formed by the medial sural cutaneous branch of the tibial nerve and the sural communicating branch of the common fibular nerve. Runs subcutaneously with the small saphenous vein behind the lateral malleolus to supply the lateral foot and lateral fifth toe.",
    clinical: "The 'gold standard' donor for nerve biopsy and grafting because the sensory deficit is well tolerated. Blocked at the ankle behind the lateral malleolus for lateral foot surgery.",
  },
  "medial-plantar": {
    label: "Medial plantar nerve", roots: "L4–S3", color: "hsl(0 75% 55%)", view: "posterior",
    detail: "Larger terminal branch of the tibial nerve. Runs with the medial plantar artery between abductor hallucis and flexor digitorum brevis. Motor to abductor hallucis, flexor digitorum brevis, FHB and 1st lumbrical; sensory to the medial sole and medial 3½ toes (analogous to the median nerve in the hand).",
    clinical: "Compression in the tarsal tunnel produces medial-foot paraesthesiae and pain.",
  },
  "lateral-plantar": {
    label: "Lateral plantar nerve", roots: "S1–S2", color: "hsl(295 55% 50%)", view: "posterior",
    detail: "Smaller terminal branch of the tibial nerve. Crosses the sole obliquely with the lateral plantar artery to the base of the 5th metatarsal. Motor to most intrinsic plantar muscles; sensory to the lateral sole and lateral 1½ toes (analogous to the ulnar nerve in the hand).",
    clinical: "First-branch entrapment ('Baxter's nerve') is a recognised cause of chronic plantar heel pain that mimics plantar fasciitis.",
  },
};

interface PathDef {
  key: NerveKey;
  d: string;
  width?: number;
  labelAt?: { x: number; y: number; anchor: "start" | "end" };
}

const ANTERIOR_PATHS: PathDef[] = [
  { key: "lumbar-plexus", d: "M92,40 Q88,55 86,80 M96,40 Q94,55 92,80 M104,40 Q106,55 108,80 M108,40 Q112,55 114,80", width: 1.6 },
  { key: "sacral-plexus", d: "M88,90 Q92,110 96,135 M96,90 Q98,112 100,135 M104,90 Q102,112 100,135 M112,90 Q108,112 104,135", width: 1.6 },
  { key: "lateral-femoral-cutaneous", d: "M86,85 Q72,120 60,175 Q56,205 56,235", width: 2 },
  { key: "femoral", d: "M96,95 Q92,150 88,210 Q86,260 88,310", width: 2.4 },
  { key: "obturator", d: "M104,100 Q112,150 116,210 Q118,260 114,300", width: 2 },
  { key: "saphenous", d: "M88,310 Q84,370 80,430 Q78,490 78,545", width: 2 },
];

const POSTERIOR_PATHS: PathDef[] = [
  { key: "superior-gluteal", d: "M100,90 Q120,105 138,118", width: 2 },
  { key: "inferior-gluteal", d: "M100,110 Q122,128 138,140", width: 2 },
  { key: "sciatic", d: "M100,130 Q104,170 104,220 Q104,260 104,310", width: 3 },
  { key: "posterior-femoral-cutaneous", d: "M100,135 Q112,180 116,235 Q118,275 118,310", width: 1.8 },
  { key: "common-fibular", d: "M104,310 Q112,330 122,348 Q132,360 132,372", width: 2.2 },
  { key: "tibial", d: "M104,310 Q102,360 100,420 Q98,470 92,510", width: 2.4 },
  { key: "deep-fibular", d: "M132,372 Q126,410 118,450 Q112,480 110,505", width: 1.8 },
  { key: "superficial-fibular", d: "M132,372 Q140,410 144,450 Q146,480 142,505", width: 1.8 },
  { key: "sural", d: "M104,360 Q118,410 128,460 Q134,495 138,520", width: 1.8 },
  { key: "medial-plantar", d: "M92,510 Q90,525 96,545 Q104,555 116,556", width: 1.8 },
  { key: "lateral-plantar", d: "M92,510 Q98,530 110,548 Q124,558 138,558", width: 1.8 },
];

const ANTERIOR_LABELS: { key: NerveKey; side: "L" | "R"; y: number }[] = [
  { key: "lumbar-plexus", side: "L", y: 50 },
  { key: "sacral-plexus", side: "L", y: 100 },
  { key: "lateral-femoral-cutaneous", side: "L", y: 175 },
  { key: "femoral", side: "L", y: 230 },
  { key: "obturator", side: "L", y: 285 },
  { key: "saphenous", side: "L", y: 470 },
];

const POSTERIOR_LABELS: { key: NerveKey; side: "L" | "R"; y: number }[] = [
  { key: "superior-gluteal", side: "R", y: 110 },
  { key: "inferior-gluteal", side: "R", y: 142 },
  { key: "sciatic", side: "R", y: 220 },
  { key: "posterior-femoral-cutaneous", side: "R", y: 260 },
  { key: "common-fibular", side: "R", y: 360 },
  { key: "tibial", side: "R", y: 420 },
  { key: "deep-fibular", side: "R", y: 460 },
  { key: "superficial-fibular", side: "R", y: 495 },
  { key: "sural", side: "R", y: 525 },
  { key: "medial-plantar", side: "L", y: 555 },
  { key: "lateral-plantar", side: "R", y: 558 },
];

const LimbOutline = ({ id }: { id: string }) => (
  <>
    <path d="M70,55 Q60,80 60,100 Q60,125 75,140 L125,140 Q140,125 140,100 Q140,80 130,55 Z"
      fill="hsl(var(--muted))" fillOpacity="0.18" stroke="hsl(var(--border))" strokeWidth="0.5" />
    <path d="M75,140 Q70,200 75,260 Q80,300 85,330 L100,330 Q102,300 102,260 Q100,200 100,140 Z"
      fill={`url(#${id}-tissue)`} fillOpacity="0.9" stroke="hsl(var(--border))" strokeWidth="0.5" />
    <path d="M100,140 Q100,200 102,260 Q102,300 100,330 L115,330 Q120,300 125,260 Q130,200 125,140 Z"
      fill={`url(#${id}-tissue)`} fillOpacity="0.9" stroke="hsl(var(--border))" strokeWidth="0.5" />
    <path d="M82,335 Q78,400 76,470 Q74,510 78,545 L96,545 Q98,510 96,470 Q96,400 98,335 Z"
      fill={`url(#${id}-tissue)`} fillOpacity="0.85" stroke="hsl(var(--border))" strokeWidth="0.5" />
    <path d="M104,335 Q102,400 102,470 Q104,510 106,545 L124,545 Q126,510 124,470 Q124,400 122,335 Z"
      fill={`url(#${id}-tissue)`} fillOpacity="0.85" stroke="hsl(var(--border))" strokeWidth="0.5" />
    <ellipse cx="86" cy="560" rx="14" ry="6" fill={`url(#${id}-tissue)`} stroke="hsl(var(--border))" strokeWidth="0.5" />
    <ellipse cx="114" cy="560" rx="14" ry="6" fill={`url(#${id}-tissue)`} stroke="hsl(var(--border))" strokeWidth="0.5" />
    <circle cx="91" cy="333" r="6" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.5" />
    <circle cx="113" cy="333" r="6" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.5" />
    <line x1="100" y1="40" x2="100" y2="135" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 2" />
  </>
);

const Panel = ({
  title,
  paths,
  labels,
  selected,
  setSelected,
  showLabels,
  idPrefix,
}: {
  title: string;
  paths: PathDef[];
  labels: { key: NerveKey; side: "L" | "R"; y: number }[];
  selected: NerveKey;
  setSelected: (k: NerveKey) => void;
  showLabels: boolean;
  idPrefix: string;
}) => {
  const isActive = (k: NerveKey) => selected === k;
  return (
    <div className="flex-1 min-w-0">
      <p className="text-center text-[11px] font-bold tracking-widest text-muted-foreground mb-1 uppercase">
        {title}
      </p>
      <svg viewBox="0 0 200 600" className="w-full max-w-[260px] mx-auto block" role="img" aria-label={`${title} view of lower limb innervation`}>
        <defs>
          <radialGradient id={`${idPrefix}-bg`} cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.10" />
            <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.02" />
          </radialGradient>
          <pattern id={`${idPrefix}-tissue`} patternUnits="userSpaceOnUse" width="6" height="6">
            <rect width="6" height="6" fill="hsl(15 30% 88%)" fillOpacity="0.35" />
            <circle cx="1" cy="1" r="0.5" fill="hsl(15 25% 70%)" opacity="0.35" />
          </pattern>
        </defs>
        <rect x="2" y="2" width="196" height="596" rx="10" fill={`url(#${idPrefix}-bg)`} stroke="hsl(var(--border))" strokeWidth="0.5" />
        <LimbOutline id={idPrefix} />

        {paths.map((p) => {
          const n = NERVES[p.key];
          const active = isActive(p.key);
          return (
            <g key={p.key} className="cursor-pointer" onClick={() => setSelected(p.key)}>
              <path d={p.d} fill="none" stroke={n.color}
                strokeWidth={active ? (p.width ?? 2) + 1.2 : (p.width ?? 2)}
                opacity={active ? 0.95 : 0.55} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          );
        })}

        {showLabels && labels.map(({ key, side, y }) => {
          const n = NERVES[key];
          const active = isActive(key);
          const figureLeftEdge = 56;
          const figureRightEdge = 144;
          const labelX = side === "L" ? 4 : 196;
          const targetX = side === "L" ? figureLeftEdge - 2 : figureRightEdge + 2;
          return (
            <g key={`label-${key}`} className="cursor-pointer" onClick={() => setSelected(key)}>
              <line x1={labelX + (side === "L" ? 50 : -50)} y1={y} x2={targetX} y2={y}
                stroke={active ? n.color : "hsl(var(--muted-foreground))"} strokeWidth={active ? 0.9 : 0.5} opacity={active ? 0.9 : 0.45} />
              <circle cx={targetX} cy={y} r={active ? 1.6 : 1} fill={n.color} opacity={active ? 1 : 0.6} />
              <text x={labelX} y={y - 1} fontSize="6.5" fontWeight={active ? 700 : 500}
                fill={active ? n.color : "hsl(var(--foreground))"}
                textAnchor={side === "L" ? "start" : "end"}>
                {n.label}
              </text>
              <text x={labelX} y={y + 7} fontSize="5.5" opacity="0.7"
                fill="hsl(var(--muted-foreground))"
                textAnchor={side === "L" ? "start" : "end"}>
                ({n.roots})
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const LowerLimbInnervationDiagram = () => {
  const [selected, setSelected] = useState<NerveKey>("femoral");
  const [showLabels, setShowLabels] = useState(true);
  const [showSutures, setShowSutures] = useState(true);
  const info = NERVES[selected];

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Innervation of the lower limb"
          subtitle="Anterior + posterior schematic — tap any nerve for course and clinical relevance"
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        <div className="flex flex-col sm:flex-row gap-2">
          <Panel title="Anterior view" paths={ANTERIOR_PATHS} labels={ANTERIOR_LABELS}
            selected={selected} setSelected={setSelected} showLabels={showLabels} idPrefix="lln-ant" />
          <Panel title="Posterior view" paths={POSTERIOR_PATHS} labels={POSTERIOR_LABELS}
            selected={selected} setSelected={setSelected} showLabels={showLabels} idPrefix="lln-pos" />
        </div>

        <div className="mt-4 rounded-lg border-l-4 bg-card p-4 min-h-[120px]"
          style={{ borderLeftColor: info.color }}>
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="font-semibold text-foreground text-sm">{info.label}</p>
            <span className="text-xs px-2 py-0.5 rounded-full font-mono"
              style={{ backgroundColor: `${info.color}22`, color: info.color }}>
              {info.roots}
            </span>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
              {info.view === "both" ? "Anterior + Posterior" : info.view}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{info.detail}</p>
          <p className="text-xs text-foreground/80 mt-2 leading-relaxed">
            <span className="font-semibold">Clinical: </span>{info.clinical}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {(Object.keys(NERVES) as NerveKey[]).map((k) => {
            const n = NERVES[k];
            const active = selected === k;
            return (
    <DiagramFigure
      id="lower-limb-innervation-diagram"
      title="Lower limb innervation"
      description="Auto-generated wrapper for the Lower limb innervation anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                    <button key={k} type="button" onClick={() => setSelected(k)}
                  className="text-[11px] px-2 py-1 rounded-full border transition-colors"
                  style={{
                    borderColor: active ? n.color : "hsl(var(--border))",
                    backgroundColor: active ? `${n.color}1f` : "transparent",
                    color: active ? n.color : "hsl(var(--foreground))",
                    fontWeight: active ? 600 : 400,
                  }}>
                  {n.label}
                </button>
    </DiagramFigure>
  );
          })}
        </div>

        <p className="mt-3 text-[11px] text-muted-foreground italic">
          Schematic; nerve courses simplified for label clarity. Cutaneous nerves are shown along the surface where they become superficial.
        </p>
      </div>
    </div>
  );
};

export default LowerLimbInnervationDiagram;
