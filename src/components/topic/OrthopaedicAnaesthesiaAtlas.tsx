import { AnatomyAtlas, BigLabel as Label, Svg, ink, muted, fillA, accent, vessel, nerve, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Anterior hip capsule innervation (PENG block) */
const Hip = () => (
  <Svg title="Anterior hip joint innervation and PENG block target, labelled">
    <path d="M60 40 Q200 10 330 60 L300 150 Q240 130 200 160 L120 150 Z" fill={fillA} stroke={ink} strokeWidth={2} />
    <circle cx={215} cy={185} r={38} fill={accent} fillOpacity={0.15} stroke={ink} strokeWidth={2} />
    <path d="M230 220 L260 290" stroke={ink} strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.25} />
    <circle cx={275} cy={130} r={7} fill={ink} />
    <circle cx={175} cy={150} r={7} fill={ink} />
    <path d="M200 20 L205 150" stroke={muted} strokeWidth={10} fill="none" opacity={0.5} />
    <path d="M280 20 Q290 120 300 290" stroke={nerve} strokeWidth={2.5} fill="none" />
    <path d="M110 30 Q120 140 130 290" stroke={nerve} strokeWidth={2.5} fill="none" />
    <path d="M150 30 Q160 110 170 150" stroke={nerve} strokeWidth={2} strokeDasharray="4 3" fill="none" />
    <path d="M300 120 Q260 150 245 165" stroke={nerve} strokeWidth={1.5} fill="none" />
    <path d="M125 150 Q170 170 185 180" stroke={nerve} strokeWidth={1.5} fill="none" />
    <circle cx={225} cy={140} r={9} fill="none" stroke={vessel} strokeWidth={2} />
    <Label x={295} y={70} tx={330} ty={40}>Femoral nerve</Label>
    <Label x={275} y={130} tx={330} ty={115}>AIIS</Label>
    <Label x={225} y={140} tx={330} ty={160}>PENG target</Label>
    <Label x={215} y={195} tx={330} ty={215}>Femoral head</Label>
    <Label x={203} y={60} tx={40} ty={35} anchor="end">Psoas tendon</Label>
    <Label x={160} y={110} tx={40} ty={95} anchor="end">Accessory obturator</Label>
    <Label x={175} y={150} tx={40} ty={150} anchor="end">Iliopubic eminence</Label>
    <Label x={125} y={230} tx={40} ty={230} anchor="end">Obturator nerve</Label>
  </Svg>
);

/* 2 — Knee innervation and the adductor canal */
const Knee = () => (
  <Svg title="Adductor canal, saphenous nerve and genicular nerves around the knee, labelled">
    <path d="M170 10 L180 200 Q200 230 220 200 L230 10" fill={fillA} stroke={ink} strokeWidth={2} />
    <ellipse cx={200} cy={225} rx={55} ry={22} fill="none" stroke={ink} strokeWidth={2} />
    <path d="M150 250 L165 295 M250 250 L235 295" stroke={ink} strokeWidth={2} />
    <path d="M100 20 L250 150" stroke={muted} strokeWidth={12} opacity={0.35} />
    <path d="M140 40 Q170 110 205 140" stroke={vessel} strokeWidth={3} fill="none" />
    <path d="M150 40 Q175 105 215 130 Q240 200 250 290" stroke={nerve} strokeWidth={2.5} fill="none" />
    {[[175, 190], [225, 190], [170, 255], [230, 255]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={5} fill={nerve} />)}
    <Label x={155} y={60} tx={40} ty={40} anchor="end">Femoral artery</Label>
    <Label x={175} y={80} tx={40} ty={100} anchor="end">Saphenous nerve</Label>
    <Label x={230} y={130} tx={330} ty={90}>Sartorius (canal roof)</Label>
    <Label x={225} y={190} tx={330} ty={175}>Genicular nerves</Label>
    <Label x={200} y={230} tx={330} ty={235}>Patella / knee joint</Label>
    <Label x={248} y={285} tx={330} ty={285}>Saphenous to medial leg</Label>
  </Svg>
);

const plates: AtlasPlate[] = [
  {
    Diagram: Hip,
    title: "Hip joint innervation and the PENG block",
    landmarks: [
      { text: "The anterior hip capsule is supplied by articular branches of the femoral, obturator and accessory obturator nerves", ref: "Gray's Anatomy 42e" },
      { text: "PENG targets the plane between the psoas tendon and the pubic ramus, between the AIIS and the iliopubic eminence", ref: "Girón-Arango 2018" },
    ],
    relevance: "For hip fracture, PENG or fascia iliaca block reduces pain and opioid need before positioning for a spinal. PENG aims to spare quadriceps strength, but spread to the femoral nerve can still weaken the leg.",
  },
  {
    Diagram: Knee,
    title: "Adductor canal and knee innervation",
    landmarks: [
      { text: "The saphenous nerve runs with the femoral artery under sartorius in the adductor canal, then supplies the medial leg", ref: "Gray's Anatomy 42e" },
      { text: "The knee capsule is supplied by genicular branches of the femoral, obturator and sciatic nerves", ref: "Gray's Anatomy 42e" },
      { text: "Adductor canal block preserves quadriceps strength better than femoral nerve block", ref: "Jaeger 2013" },
    ],
    relevance: "After knee replacement, adductor canal block plus local infiltration gives analgesia with earlier mobilisation. The back of the knee (sciatic supply) is not covered.",
  },
];

export const OrthopaedicAnaesthesiaAtlas = () => (
  <AnatomyAtlas id="anatomy-atlas" heading="Atlas of Orthopaedic Anatomy & Key Landmarks" topicId="orthopaedic-anaesthesia" plates={plates} />
);
