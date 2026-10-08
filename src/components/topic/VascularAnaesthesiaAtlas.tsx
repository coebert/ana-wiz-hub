import { AnatomyAtlas, Label, Svg, ink, muted, accent, danger, vessel, nerve, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Abdominal aorta and clamp levels */
const Aorta = () => (
  <Svg title="Abdominal aorta, visceral branches and clamp levels, labelled">
    <path d="M200 20 L200 240" stroke={vessel} strokeWidth={16} strokeLinecap="round" />
    <path d="M200 240 L160 290 M200 240 L240 290" stroke={vessel} strokeWidth={10} strokeLinecap="round" />
    <path d="M208 70 L250 60" stroke={vessel} strokeWidth={5} />
    <path d="M208 95 L250 100" stroke={vessel} strokeWidth={5} />
    <path d="M192 125 L130 128 M208 125 L270 128" stroke={vessel} strokeWidth={5} />
    <path d="M192 50 Q170 45 160 30" stroke={vessel} strokeWidth={2} fill="none" />
    <ellipse cx={200} cy={190} rx={22} ry={35} fill={danger} fillOpacity={0.3} stroke={danger} strokeWidth={2} />
    <path d="M165 110 L235 110" stroke={accent} strokeWidth={3} strokeDasharray="6 3" />
    <path d="M165 145 L235 145" stroke={accent} strokeWidth={3} />
    <Label x={250} y={60} tx={330} ty={50}>Coeliac trunk</Label>
    <Label x={250} y={100} tx={330} ty={90}>Superior mesenteric</Label>
    <Label x={270} y={128} tx={330} ty={130}>Renal arteries</Label>
    <Label x={222} y={190} tx={330} ty={190}>Infrarenal aneurysm</Label>
    <Label x={165} y={110} tx={40} ty={100} anchor="end">Suprarenal clamp</Label>
    <Label x={165} y={145} tx={40} ty={150} anchor="end">Infrarenal clamp</Label>
    <Label x={165} y={35} tx={40} ty={40} anchor="end">Artery of Adamkiewicz (T8–L1)</Label>
    <Label x={175} y={270} tx={80} ty={280} anchor="end">Common iliac arteries</Label>
  </Svg>
);

/* 2 — Carotid bifurcation and nearby nerves */
const Carotid = () => (
  <Svg title="Carotid bifurcation and adjacent cranial nerves, labelled">
    <path d="M200 290 L200 170" stroke={vessel} strokeWidth={14} strokeLinecap="round" />
    <path d="M200 170 Q215 120 225 20" fill="none" stroke={vessel} strokeWidth={11} />
    <path d="M200 170 Q175 120 160 20" fill="none" stroke={vessel} strokeWidth={8} />
    <ellipse cx={210} cy={160} rx={14} ry={20} fill={danger} fillOpacity={0.25} stroke={danger} />
    <path d="M110 105 Q200 95 290 110" fill="none" stroke={nerve} strokeWidth={2.5} />
    <path d="M240 20 L240 290" fill="none" stroke={nerve} strokeWidth={2.5} strokeDasharray="5 2" />
    <path d="M260 60 Q235 100 215 150" fill="none" stroke={nerve} strokeWidth={1.5} strokeDasharray="3 2" />
    <path d="M120 210 Q200 200 280 230" fill="none" stroke={muted} strokeWidth={1.5} />
    <ellipse cx={210} cy={250} rx={8} ry={4} fill={accent} fillOpacity={0.5} stroke={accent} />
    <Label x={200} y={250} tx={110} ty={270} anchor="end">Common carotid</Label>
    <Label x={222} y={40} tx={330} ty={30}>Internal carotid</Label>
    <Label x={163} y={40} tx={90} ty={30} anchor="end">External carotid</Label>
    <Label x={220} y={170} tx={330} ty={175}>Carotid sinus / bulb</Label>
    <Label x={130} y={103} tx={90} ty={80} anchor="end">Hypoglossal nerve (XII)</Label>
    <Label x={240} y={230} tx={330} ty={220}>Vagus nerve (X)</Label>
    <Label x={245} y={85} tx={330} ty={95}>Sinus nerve (IX)</Label>
    <Label x={150} y={207} tx={90} ty={200} anchor="end">Superficial cervical plexus</Label>
  </Svg>
);

const plates: AtlasPlate[] = [
  {
    Diagram: Aorta,
    title: "Abdominal aorta and clamp levels",
    landmarks: [
      { text: "Coeliac trunk, superior mesenteric and renal arteries arise in sequence; most aneurysms are infrarenal", ref: "Gray's Anatomy 42e" },
      { text: "Suprarenal clamping adds renal (and possibly visceral) ischaemia and a larger rise in afterload than infrarenal clamping", ref: "BJA Educ AAA 2016" },
      { text: "The artery of Adamkiewicz usually arises on the left between T8 and L1 — at risk in thoracoabdominal repair", ref: "Taterra 2019 Adamkiewicz" },
    ],
    relevance: "Anticipate clamp hypertension and declamp hypotension; protect the kidneys; consider CSF drainage for extensive thoracoabdominal repairs.",
  },
  {
    Diagram: Carotid,
    title: "Carotid bifurcation",
    landmarks: [
      { text: "Common carotid divides at about C4 (upper border of thyroid cartilage); the carotid sinus baroreceptor sits at the bulb, supplied by IX", ref: "Gray's Anatomy 42e" },
      { text: "Hypoglossal, vagus (recurrent laryngeal) and marginal mandibular nerves are at risk; most injuries are transient", ref: "Cunningham 2004 CEA Nerves" },
      { text: "GALA found no difference in stroke, MI or death between general and local anaesthesia", ref: "GALA 2008" },
    ],
    relevance: "Sinus manipulation can cause bradycardia and hypotension; awake patients under cervical plexus block give real-time neurological monitoring during clamping.",
  },
];

export const VascularAnaesthesiaAtlas = () => (
  <AnatomyAtlas id="anatomy-atlas" heading="Atlas of Vascular Anatomy & Key Landmarks" topicId="vascular-anaesthesia" plates={plates} />
);
