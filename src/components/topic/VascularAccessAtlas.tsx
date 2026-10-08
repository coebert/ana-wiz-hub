import { AnatomyAtlas, BigLabel as Label, Svg, ink, muted, fillA, vessel, nerve, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Internal jugular vein in the neck */
const Neck = () => (
  <Svg title="Internal jugular vein and carotid artery in the right side of the neck, anterior view, labelled">
    <path d="M240 10 L240 290" stroke={muted} strokeWidth={30} opacity={0.2} />
    <path d="M90 285 L210 285" stroke={ink} strokeWidth={6} opacity={0.4} />
    <path d="M200 20 L195 280" stroke={ink} strokeWidth={10} opacity={0.3} />
    <path d="M200 20 L110 280" stroke={ink} strokeWidth={10} opacity={0.3} />
    <path d="M190 20 L185 280" stroke={vessel} strokeWidth={5} fill="none" />
    <path d="M175 20 L150 280" stroke={vessel} strokeWidth={10} strokeOpacity={0.5} fill="none" />
    <circle cx={165} cy={215} r={8} fill="none" stroke={ink} strokeWidth={2} />
    <Label x={240} y={40} tx={330} ty={30}>Trachea (midline)</Label>
    <Label x={188} y={90} tx={330} ty={80}>Common carotid (medial)</Label>
    <Label x={168} y={140} tx={40} ty={130} anchor="end">IJV (lateral)</Label>
    <Label x={196} y={250} tx={330} ty={240}>Sternal head SCM</Label>
    <Label x={125} y={240} tx={40} ty={230} anchor="end">Clavicular head SCM</Label>
    <Label x={165} y={215} tx={330} ty={190}>Apex of SCM triangle</Label>
    <Label x={110} y={285} tx={40} ty={285} anchor="end">Clavicle</Label>
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
    <Label x={175} y={150} tx={40} ty={150} anchor="end">Femoral vein</Label>
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
