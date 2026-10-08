import { AnatomyAtlas, Label, Svg, ink, muted, fillA, accent, vessel, nerve, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Laryngeal innervation, anterolateral view */
const Larynx = () => (
  <Svg title="Laryngeal cartilages and nerve supply, labelled">
    <path d="M150 40 Q200 25 250 40 L240 70 Q200 60 160 70 Z" fill={fillA} stroke={ink} />
    <path d="M155 85 L245 85 L255 150 Q200 175 145 150 Z" fill={fillA} fillOpacity={0.6} stroke={ink} strokeWidth={2} />
    <rect x={165} y={170} width={70} height={18} rx={6} fill={fillA} stroke={ink} />
    <rect x={170} y={195} width={60} height={95} fill="none" stroke={muted} strokeDasharray="4 3" />
    {[210, 230, 250, 270].map((y) => <line key={y} x1={170} y1={y} x2={230} y2={y} stroke={muted} />)}
    <path d="M130 55 L150 78" stroke={muted} fill="none" strokeWidth={2} />
    <path d="M80 30 Q110 60 150 78 L168 100" stroke={nerve} fill="none" strokeWidth={2} />
    <path d="M150 78 Q140 130 160 165" stroke={nerve} fill="none" strokeWidth={1.5} strokeDasharray="5 3" />
    <path d="M110 290 Q140 230 162 180" stroke={nerve} fill="none" strokeWidth={2} />
    <path d="M305 30 L305 290" stroke={vessel} fill="none" strokeWidth={4} />
    <path d="M95 30 L95 290" stroke={vessel} fill="none" strokeWidth={4} strokeOpacity={0.5} />
    <rect x={172} y={155} width={56} height={13} fill="hsl(var(--primary) / 0.3)" stroke={ink} />
    <Label x={200} y={45} tx={330} ty={30}>Hyoid bone</Label>
    <Label x={200} y={115} tx={330} ty={100}>Thyroid cartilage</Label>
    <Label x={200} y={179} tx={330} ty={175}>Cricoid cartilage</Label>
    <Label x={200} y={240} tx={330} ty={245}>Trachea</Label>
    <Label x={160} y={92} tx={40} ty={70} anchor="end">Internal SLN</Label>
    <Label x={155} y={130} tx={40} ty={130} anchor="end">External SLN</Label>
    <Label x={130} y={250} tx={40} ty={250} anchor="end">Recurrent laryngeal nerve</Label>
    <Label x={305} y={200} tx={330} ty={210}>Carotid sheath (one each side)</Label>
    <Label x={225} y={161} tx={330} ty={140}>Cricothyroid membrane</Label>
  </Svg>
);

/* 2 — Tonsillar fossa, intraoral view */
const Tonsil = () => (
  <Svg title="Palatine tonsil and tonsillar fossa, labelled">
    <path d="M80 40 Q200 10 320 40 L320 60 Q200 35 80 60 Z" fill={fillA} stroke={ink} />
    <path d="M190 60 Q200 95 210 60" fill="hsl(var(--primary) / 0.2)" stroke={ink} />
    <path d="M110 70 Q90 170 120 270" stroke={ink} strokeWidth={2} fill="none" />
    <path d="M150 70 Q140 170 160 270" stroke={ink} strokeWidth={2} fill="none" />
    <ellipse cx={132} cy={170} rx={16} ry={45} fill={accent} fillOpacity={0.25} stroke={ink} />
    <path d="M250 70 Q260 170 240 270" stroke={ink} strokeWidth={2} fill="none" />
    <path d="M290 70 Q310 170 280 270" stroke={ink} strokeWidth={2} fill="none" />
    <ellipse cx={268} cy={170} rx={16} ry={45} fill={accent} fillOpacity={0.25} stroke={ink} />
    <path d="M60 260 Q100 230 125 205" stroke={vessel} fill="none" strokeWidth={3} />
    <path d="M124 135 Q118 170 126 205" stroke={vessel} strokeOpacity={0.55} fill="none" strokeWidth={2.5} strokeDasharray="4 2" />
    <path d="M150 230 Q200 250 250 230 L240 290 L160 290 Z" fill="hsl(var(--primary) / 0.12)" stroke={ink} />
    <Label x={200} y={45} tx={330} ty={20}>Soft palate</Label>
    <Label x={200} y={80} tx={330} ty={80}>Uvula</Label>
    <Label x={108} y={110} tx={40} ty={95} anchor="end">Palatoglossal arch (front)</Label>
    <Label x={122} y={145} tx={40} ty={135} anchor="end">Paratonsillar vein</Label>
    <Label x={132} y={170} tx={40} ty={170} anchor="end">Palatine tonsil in fossa</Label>
    <Label x={80} y={248} tx={40} ty={250} anchor="end">Tonsillar artery</Label>
    <Label x={252} y={120} tx={340} ty={130}>Palatopharyngeal arch (behind)</Label>
    <Label x={298} y={190} tx={340} ty={190}>Palatoglossal arch (front)</Label>
    <Label x={200} y={265} tx={340} ty={270}>Tongue</Label>
  </Svg>
);

const plates: AtlasPlate[] = [
  {
    Diagram: Larynx,
    title: "Larynx and its nerve supply",
    landmarks: [
      { text: "The internal branch of the superior laryngeal nerve pierces the thyrohyoid membrane and supplies sensation above the vocal cords", ref: "Gray's Anatomy 42e" },
      { text: "The superior laryngeal nerve can be blocked near the greater horn of the hyoid; cadaver measurements describe its position relative to these landmarks", ref: "Furlan 2002 SLN" },
      { text: "The recurrent laryngeal nerves supply all intrinsic laryngeal muscles except cricothyroid, and sensation below the cords", ref: "Gray's Anatomy 42e" },
      { text: "The cricothyroid membrane lies between the thyroid and cricoid cartilages in the midline and is the site for emergency front-of-neck access; the carotid sheaths lie laterally on both sides", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Guides topical and nerve-block airway anaesthesia for awake intubation, and explains stridor after thyroid surgery from recurrent laryngeal nerve injury.",
  },
  {
    Diagram: Tonsil,
    title: "Tonsillar fossa",
    landmarks: [
      { text: "The palatine tonsil sits on each side between the palatoglossal arch (in front) and the palatopharyngeal arch (behind); its main supply is the tonsillar branch of the facial artery", ref: "Gray's Anatomy 42e" },
      { text: "The external palatine (paratonsillar) vein lies in the tonsil bed and is a common source of bleeding", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Post-tonsillectomy bleeding comes from the tonsil bed: expect a full stomach of swallowed blood, a hypovolaemic child and a difficult view — plan a rapid sequence induction with two suctions ready.",
  },
];

export const EntAnaesthesiaAtlas = () => (
  <AnatomyAtlas id="anatomy-atlas" heading="Atlas of ENT Anatomy & Key Landmarks" topicId="ent-anaesthesia" plates={plates} />
);
