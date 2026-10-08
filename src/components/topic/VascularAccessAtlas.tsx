import { AnatomyAtlas, BigLabel as Label, Svg, ink, muted, fillA, vessel, nerve, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Internal jugular vein in the neck */
const Neck = () => (
  <Svg title="Internal jugular vein and carotid artery in the neck, labelled">
    <path d="M200 10 L200 290" stroke={muted} strokeWidth={30} opacity={0.2} />
    <path d="M120 290 L250 30" stroke={ink} strokeWidth={10} opacity={0.3} />
    <path d="M160 290 L250 30" stroke={ink} strokeWidth={10} opacity={0.3} />
    <path d="M60 285 L190 285" stroke={ink} strokeWidth={6} opacity={0.4} />
    <path d="M232 30 L210 270" stroke={vessel} strokeWidth={5} fill="none" />
    <path d="M252 30 L148 270" stroke={vessel} strokeWidth={10} strokeOpacity={0.5} fill="none" />
    <circle cx={175} cy={210} r={8} fill="none" stroke={ink} strokeWidth={2} />
    <Label x={200} y={40} tx={40} ty={30} anchor="end">Trachea (midline)</Label>
    <Label x={225} y={90} tx={330} ty={70}>Common carotid</Label>
    <Label x={200} y={140} tx={330} ty={140}>Internal jugular vein</Label>
    <Label x={140} y={270} tx={40} ty={250} anchor="end">Clavicular head SCM</Label>
    <Label x={175} y={210} tx={330} ty={210}>Apex of SCM triangle</Label>
    <Label x={100} y={285} tx={40} ty={290} anchor="end">Clavicle</Label>
  </Svg>
);

/* 2 — Femoral triangle */
const Femoral = () => (
  <Svg title="Femoral nerve, artery and vein below the inguinal ligament, labelled">
    <path d="M60 50 L340 50" stroke={ink} strokeWidth={3} />
    <path d="M60 50 L200 290 L340 50" fill={fillA} fillOpacity={0.5} stroke={ink} strokeWidth={1.5} />
    <path d="M240 50 L240 270" stroke={nerve} strokeWidth={3} />
    <path d="M205 50 L205 270" stroke={vessel} strokeWidth={6} />
    <path d="M175 50 L175 270" stroke={vessel} strokeWidth={9} strokeOpacity={0.5} />
    <path d="M150 50 L150 120" stroke={muted} strokeWidth={2} strokeDasharray="4 3" />
    <Label x={300} y={50} tx={330} ty={30}>Inguinal ligament</Label>
    <Label x={240} y={140} tx={330} ty={130}>Femoral nerve (lateral)</Label>
    <Label x={205} y={180} tx={330} ty={190}>Femoral artery</Label>
    <Label x={175} y={150} tx={40} ty={150} anchor="end">Femoral vein (medial)</Label>
    <Label x={150} y={90} tx={40} ty={80} anchor="end">Femoral canal</Label>
  </Svg>
);

const plates: AtlasPlate[] = [
  {
    Diagram: Neck,
    title: "Internal jugular vein",
    landmarks: [
      { text: "The internal jugular vein lies in the carotid sheath, usually lateral to the carotid artery, beneath sternocleidomastoid", ref: "Gray's Anatomy 42e" },
      { text: "Ultrasound guidance is recommended for internal jugular cannulation", ref: "NICE TA49" },
    ],
    relevance: "The vein's position relative to the artery varies, and it can overlap the artery when the head is turned. Scan before puncturing and confirm the wire is in the vein before dilating.",
  },
  {
    Diagram: Femoral,
    title: "Femoral triangle",
    landmarks: [
      { text: "Below the inguinal ligament the order from lateral to medial is femoral nerve, artery, vein, then the femoral canal", ref: "Gray's Anatomy 42e" },
      { text: "Femoral catheters carried a higher rate of infection and thrombosis than subclavian catheters in a large randomised trial", ref: "3SITES 2015" },
    ],
    relevance: "Puncture below the inguinal ligament: a puncture above it risks retroperitoneal bleeding that cannot be compressed.",
  },
];

export const VascularAccessAtlas = () => (
  <AnatomyAtlas id="anatomy-atlas" heading="Atlas of Vascular Access Anatomy & Key Landmarks" topicId="vascular-access-devices" plates={plates} />
);
