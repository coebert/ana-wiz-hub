import { AnatomyAtlas, Label, Svg, ink, muted, fillA, accent, danger, vessel, nerve, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Interscalene groove, transverse ultrasound-style section at C6 */
const Interscalene = () => (
  <Svg title="Interscalene brachial plexus at C6, transverse section, labelled">
    <ellipse cx={200} cy={40} rx={170} ry={14} fill={fillA} stroke={muted} />
    <text x={200} y={44} fontSize={9} fill={muted} textAnchor="middle">Skin / platysma</text>
    <path d="M60 70 Q140 55 210 80 L200 100 Q130 85 60 95 Z" fill={danger} fillOpacity={0.2} stroke={ink} />
    <ellipse cx={150} cy={150} rx={30} ry={40} fill={danger} fillOpacity={0.25} stroke={ink} />
    <ellipse cx={280} cy={160} rx={36} ry={44} fill={danger} fillOpacity={0.25} stroke={ink} />
    {[130, 155, 180].map((y) => <circle key={y} cx={215} cy={y} r={9} fill="none" stroke={nerve} strokeWidth={2} />)}
    <circle cx={90} cy={140} r={14} fill={vessel} fillOpacity={0.6} />
    <ellipse cx={95} cy={105} rx={22} ry={10} fill="hsl(var(--primary) / 0.25)" stroke={ink} />
    <path d="M178 120 L183 175" stroke={nerve} strokeWidth={1.5} strokeDasharray="3 2" />
    <path d="M150 250 L250 250 L240 225 L160 225 Z" fill={fillA} stroke={ink} />
    <Label x={140} y={75} tx={40} ty={60} anchor="end">Sternocleidomastoid</Label>
    <Label x={150} y={170} tx={40} ty={200} anchor="end">Anterior scalene</Label>
    <Label x={295} y={170} tx={360} ty={210}>Middle scalene</Label>
    <Label x={224} y={130} tx={330} ty={90}>C5 root/trunk</Label>
    <Label x={224} y={155} tx={330} ty={110}>C6</Label>
    <Label x={224} y={180} tx={330} ty={130}>C7</Label>
    <Label x={181} y={145} tx={150} ty={290} anchor="end">Phrenic nerve (on anterior scalene)</Label>
    <Label x={90} y={140} tx={40} ty={150} anchor="end">Carotid artery</Label>
    <Label x={95} y={105} tx={40} ty={110} anchor="end">Internal jugular vein</Label>
    <Label x={200} y={238} tx={270} ty={275}>C6 transverse process</Label>
  </Svg>
);

/* 2 — Femoral triangle and fascia iliaca */
const Femoral = () => (
  <Svg title="Femoral triangle and fascia iliaca, labelled">
    <path d="M60 50 L340 50 L200 270 Z" fill={fillA} fillOpacity={0.5} stroke={ink} />
    <path d="M60 50 L340 50" stroke={ink} strokeWidth={3} />
    <circle cx={150} cy={95} r={10} fill="none" stroke={nerve} strokeWidth={2.5} />
    <circle cx={185} cy={95} r={9} fill={vessel} />
    <ellipse cx={215} cy={95} rx={12} ry={9} fill="hsl(var(--primary) / 0.3)" stroke={ink} />
    <path d="M95 115 L240 115" stroke={accent} strokeWidth={2} strokeDasharray="5 3" />
    <path d="M90 140 Q140 120 165 108" fill="none" stroke={accent} strokeWidth={1} />
    <path d="M60 50 L230 260" stroke={danger} strokeWidth={8} strokeOpacity={0.35} />
    <path d="M340 50 L250 230" stroke={danger} strokeWidth={8} strokeOpacity={0.35} />
    <Label x={200} y={50} tx={200} ty={20} anchor="middle">Inguinal ligament (ASIS → pubic tubercle)</Label>
    <Label x={150} y={95} tx={40} ty={95} anchor="end">Femoral nerve (lateral)</Label>
    <Label x={185} y={98} tx={160} ty={160} anchor="end">Femoral artery</Label>
    <Label x={215} y={98} tx={370} ty={100}>Femoral vein (medial)</Label>
    <Label x={110} y={115} tx={40} ty={130} anchor="end">Fascia iliaca</Label>
    <Label x={130} y={130} tx={40} ty={170} anchor="end">Iliacus / psoas</Label>
    <Label x={120} y={125} tx={40} ty={215} anchor="end">Sartorius (lateral border)</Label>
    <Label x={300} y={130} tx={360} ty={170}>Adductor longus (medial border)</Label>
    <text x={200} y={292} fontSize={9} fill={muted} textAnchor="middle">Nerve lies deep to fascia iliaca; artery and vein lie superficial to it, within the femoral sheath</text>
  </Svg>
);

/* 3 — Adductor canal, mid-thigh transverse */
const Adductor = () => (
  <Svg title="Adductor canal at mid-thigh, transverse section, labelled">
    <circle cx={200} cy={150} r={130} fill={fillA} fillOpacity={0.4} stroke={muted} />
    <circle cx={200} cy={160} r={22} fill={fillA} stroke={ink} strokeWidth={2} />
    <ellipse cx={130} cy={95} rx={40} ry={26} fill={danger} fillOpacity={0.25} stroke={ink} />
    <ellipse cx={205} cy={60} rx={30} ry={18} fill={danger} fillOpacity={0.3} stroke={ink} />
    <ellipse cx={265} cy={95} rx={40} ry={28} fill={danger} fillOpacity={0.25} stroke={ink} />
    <path d="M175 72 L235 72 L230 105 L180 105 Z" fill={accent} fillOpacity={0.08} stroke={accent} strokeDasharray="4 3" />
    <circle cx={200} cy={88} r={7} fill={vessel} />
    <ellipse cx={215} cy={92} rx={6} ry={5} fill="hsl(var(--primary) / 0.35)" stroke={ink} />
    <circle cx={188} cy={82} r={4} fill="none" stroke={nerve} strokeWidth={2} />
    <Label x={205} y={60} tx={205} ty={18} anchor="middle">Sartorius (roof)</Label>
    <Label x={120} y={95} tx={30} ty={80} anchor="end">Vastus medialis (lateral wall)</Label>
    <Label x={275} y={100} tx={370} ty={110}>Adductor longus / magnus (floor)</Label>
    <Label x={200} y={88} tx={340} ty={50}>Femoral (superficial) artery</Label>
    <Label x={215} y={95} tx={370} ty={140}>Femoral vein</Label>
    <Label x={188} y={82} tx={30} ty={40} anchor="end">Saphenous nerve</Label>
    <Label x={200} y={160} tx={300} ty={220}>Femur</Label>
    <text x={200} y={292} fontSize={9} fill={muted} textAnchor="middle">Dashed: adductor canal. Nerve to vastus medialis often lies just outside the canal.</text>
  </Svg>
);

/* 4 — Lumbar neuraxis, sagittal midline */
const Neuraxial = () => (
  <Svg title="Lumbar spine sagittal midline section for neuraxial block, labelled">
    {[50, 120, 190].map((y) => <rect key={y} x={260} y={y} width={80} height={52} rx={6} fill={fillA} stroke={ink} />)}
    {[60, 130, 200].map((y) => <path key={y} d={`M120 ${y} L200 ${y + 10} L200 ${y + 40} L120 ${y + 35} Z`} fill={fillA} stroke={ink} />)}
    <path d="M80 30 L80 280" stroke={ink} strokeWidth={2} />
    <path d="M118 40 L118 270" stroke={accent} strokeWidth={2} />
    <path d="M205 40 L205 270" stroke={danger} strokeWidth={4} strokeOpacity={0.6} />
    <path d="M220 40 L220 270" stroke={ink} strokeWidth={1.5} />
    <path d="M222 40 L222 270 L255 270 L255 40" fill="hsl(var(--primary) / 0.12)" stroke="none" />
    <path d="M238 40 L238 110 L234 125" stroke={nerve} strokeWidth={5} strokeLinecap="round" />
    {[0, 6, 12].map((o) => <path key={o} d={`M${232 + o} 125 L${232 + o} 270`} stroke={nerve} strokeWidth={1} />)}
    <path d="M10 175 L195 175" stroke={muted} strokeWidth={1.5} strokeDasharray="6 3" />
    <path d="M30 170 L210 166" stroke={ink} strokeWidth={1.2} />
    <Label x={80} y={60} tx={10} ty={40} anchor="end">Skin</Label>
    <Label x={118} y={100} tx={10} ty={80} anchor="end">Supraspinous ligament</Label>
    <Label x={160} y={110} tx={10} ty={120} anchor="end">Interspinous ligament</Label>
    <Label x={205} y={250} tx={150} ty={290} anchor="end">Ligamentum flavum</Label>
    <Label x={213} y={60} tx={190} ty={20} anchor="end">Epidural space</Label>
    <Label x={220} y={90} tx={260} ty={20}>Dura / arachnoid</Label>
    <Label x={245} y={180} tx={370} ty={175}>CSF (subarachnoid)</Label>
    <Label x={236} y={122} tx={370} ty={115}>Conus medullaris ≈ L1–L2</Label>
    <Label x={238} y={240} tx={370} ty={250}>Cauda equina</Label>
    <Label x={300} y={215} tx={370} ty={290}>Vertebral body</Label>
    <Label x={60} y={175} tx={10} ty={200} anchor="end">Tuffier's line ≈ L4 (unreliable)</Label>
  </Svg>
);

const plates: AtlasPlate[] = [
  {
    Diagram: Interscalene,
    title: "Interscalene brachial plexus",
    landmarks: [
      { text: "C5–C7 roots/trunks lie in the groove between anterior and middle scalene, lateral to the carotid and internal jugular vein", ref: "Gray's Anatomy 42e" },
      { text: "Phrenic nerve (C3–C5) runs on the anterior surface of anterior scalene — blocked in nearly all patients at conventional volumes", ref: "Urmey 1991 Interscalene" },
      { text: "C6 transverse process (Chassaignac's tubercle) is a reliable level landmark", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Shoulder surgery block of choice; avoid in patients who cannot tolerate hemidiaphragmatic paresis. Vertebral artery and epidural/intrathecal spread are risks of deep needle placement.",
  },
  {
    Diagram: Femoral,
    title: "Femoral triangle and fascia iliaca",
    landmarks: [
      { text: "Borders: inguinal ligament (superior), sartorius (lateral), adductor longus (medial)", ref: "Gray's Anatomy 42e" },
      { text: "Lateral to medial: femoral nerve, artery, vein — nerve lies deep to fascia iliaca, outside the femoral sheath", ref: "Gray's Anatomy 42e" },
      { text: "Fascia iliaca compartment block spreads beneath the fascia to femoral and lateral femoral cutaneous nerves", ref: "Dalens 1989 Fascia Iliaca" },
    ],
    relevance: "Hip fracture analgesia (fascia iliaca or femoral block) reduces opioid need. Quadriceps weakness increases fall risk — warn patients and staff.",
  },
  {
    Diagram: Adductor,
    title: "Adductor canal",
    landmarks: [
      { text: "Roof: sartorius; lateral wall: vastus medialis; floor: adductor longus and magnus", ref: "Gray's Anatomy 42e" },
      { text: "Contents: femoral artery and vein, saphenous nerve; nerve to vastus medialis lies close to or outside the canal", ref: "Burckett-St Laurent 2016" },
    ],
    relevance: "Knee arthroplasty analgesia with less quadriceps weakness than femoral block; proximal injection may spread to the nerve to vastus medialis.",
  },
  {
    Diagram: Neuraxial,
    title: "Lumbar neuraxis (midline)",
    landmarks: [
      { text: "Midline needle passes skin, supraspinous and interspinous ligaments, ligamentum flavum, epidural space, then dura–arachnoid into CSF", ref: "Gray's Anatomy 42e" },
      { text: "Conus medullaris usually ends at L1–L2 but varies, and Tuffier's line often lies higher than L4", ref: "Kim 2003 Conus" },
      { text: "Anaesthetists frequently misidentify the lumbar interspace by palpation, usually choosing one too high", ref: "Broadbent 2000 Interspace" },
    ],
    relevance: "Use the lowest practical interspace for spinal anaesthesia (L3–L4 or below) to reduce the risk of cord injury; consider ultrasound when landmarks are difficult.",
  },
];

export const RegionalAnaesthesiaAtlas = () => (
  <AnatomyAtlas id="anatomy-atlas" heading="Atlas of Block Anatomy &amp; Key Landmarks".replace("&amp;", "&")} topicId="regional-anaesthesia" plates={plates} />
);
