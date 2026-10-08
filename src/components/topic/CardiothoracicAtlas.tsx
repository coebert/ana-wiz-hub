import { AnatomyAtlas, BigLabel as Label, Svg, ink, muted, fillA, accent, vessel, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Coronary arteries, anterior view */
const Coronary = () => (
  <Svg title="Coronary arteries, anterior view, labelled">
    <path d="M200 40 Q300 40 320 140 Q320 230 210 290 Q100 230 90 150 Q100 50 200 40 Z" fill={fillA} stroke={ink} strokeWidth={2} />
    <path d="M200 40 L200 10" stroke={vessel} strokeWidth={8} />
    <path d="M195 50 Q140 70 120 130 Q115 200 170 260" stroke={vessel} strokeWidth={3} fill="none" />
    <path d="M205 50 L230 70" stroke={vessel} strokeWidth={3.5} fill="none" />
    <path d="M230 70 Q220 160 210 285" stroke={vessel} strokeWidth={3} fill="none" />
    <path d="M230 70 Q290 90 310 160" stroke={vessel} strokeWidth={3} fill="none" />
    <path d="M222 140 L265 160" stroke={vessel} strokeWidth={2} fill="none" />
    <path d="M140 230 Q170 250 205 255" stroke={vessel} strokeWidth={2} strokeDasharray="4 3" fill="none" />
    <Label x={200} y={20} tx={330} ty={20}>Aortic root</Label>
    <Label x={218} y={62} tx={330} ty={60}>Left main stem</Label>
    <Label x={300} y={130} tx={330} ty={115}>Circumflex</Label>
    <Label x={225} y={130} tx={330} ty={175}>LAD + diagonals</Label>
    <Label x={120} y={130} tx={40} ty={110} anchor="end">Right coronary</Label>
    <Label x={170} y={250} tx={40} ty={250} anchor="end">PDA (usually RCA)</Label>
  </Svg>
);

/* 2 — Tracheobronchial tree and double-lumen tube */
const Bronchi = () => (
  <Svg title="Tracheobronchial tree with left double-lumen tube position, labelled">
    <path d="M190 10 L190 120 L210 120 L210 10 Z" fill={fillA} stroke={ink} strokeWidth={2} />
    <path d="M190 120 L120 250 M210 120 L245 170 L300 250" stroke={ink} strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.25} />
    <path d="M245 170 L310 150" stroke={ink} strokeWidth={10} strokeLinecap="round" opacity={0.25} />
    <path d="M195 15 L195 125 L135 230" stroke={accent} strokeWidth={4} fill="none" />
    <ellipse cx={150} cy={205} rx={10} ry={6} fill="none" stroke={accent} strokeWidth={3} />
    <ellipse cx={200} cy={100} rx={14} ry={6} fill="none" stroke={muted} strokeWidth={2} />
    <Label x={200} y={40} tx={330} ty={30}>Trachea</Label>
    <Label x={200} y={120} tx={330} ty={100}>Carina</Label>
    <Label x={300} y={152} tx={330} ty={150}>RUL bronchus (~2 cm)</Label>
    <Label x={290} y={235} tx={330} ty={240}>Right main bronchus</Label>
    <Label x={140} y={200} tx={40} ty={190} anchor="end">Bronchial cuff</Label>
    <Label x={125} y={240} tx={40} ty={250} anchor="end">Left main (~4–5 cm)</Label>
    <Label x={188} y={100} tx={40} ty={95} anchor="end">Tracheal cuff</Label>
  </Svg>
);

const plates: AtlasPlate[] = [
  {
    Diagram: Coronary,
    title: "Coronary artery anatomy",
    landmarks: [
      { text: "The left main stem divides into the LAD and circumflex; the RCA runs in the right atrioventricular groove", ref: "Gray's Anatomy 42e" },
      { text: "In most people (right dominance) the posterior descending artery arises from the RCA", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Matching ECG leads and TOE wall-motion segments to these territories helps localise ischaemia after grafting or during weaning from bypass.",
  },
  {
    Diagram: Bronchi,
    title: "Bronchial tree and double-lumen tubes",
    landmarks: [
      { text: "The right main bronchus is shorter, wider and more vertical; the right upper lobe bronchus arises about 2 cm from the carina", ref: "Gray's Anatomy 42e" },
      { text: "The left main bronchus is longer (about 4–5 cm) before it divides", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "A left-sided double-lumen tube is usually chosen because the longer left main bronchus gives a safer margin; a right-sided tube risks blocking the right upper lobe. Confirm position with a fibreoptic scope.",
  },
];

export const CardiothoracicAtlas = () => (
  <AnatomyAtlas id="anatomy-atlas" heading="Atlas of Cardiothoracic Anatomy & Key Landmarks" topicId="cardiothoracic" plates={plates} />
);
