import { AnatomyAtlas, Label, Svg, ink, muted, fillA, accent, vessel, nerve, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Aortocaval compression, transverse section */
const Aortocaval = () => (
  <Svg title="Aortocaval compression by the gravid uterus, transverse section, labelled">
    <ellipse cx={200} cy={150} rx={170} ry={120} fill={fillA} fillOpacity={0.3} stroke={ink} />
    <ellipse cx={200} cy={115} rx={115} ry={80} fill="hsl(var(--primary) / 0.15)" stroke={ink} strokeWidth={2} />
    <path d="M160 245 Q200 215 240 245 L235 265 L165 265 Z" fill={fillA} stroke={ink} />
    <circle cx={225} cy={205} r={11} fill={vessel} />
    <ellipse cx={175} cy={205} rx={16} ry={6} fill="hsl(var(--primary) / 0.5)" stroke={ink} />
    <path d="M60 280 L340 280" stroke={muted} strokeWidth={3} />
    <Label x={200} y={110} tx={330} ty={40}>Gravid uterus</Label>
    <Label x={225} y={205} tx={340} ty={200}>Aorta (left)</Label>
    <Label x={175} y={205} tx={40} ty={200} anchor="end">IVC (right, compressed)</Label>
    <Label x={200} y={255} tx={300} ty={290}>Vertebral body</Label>
    <Label x={100} y={280} tx={40} ty={250} anchor="end">Supine on table</Label>
  </Svg>
);

/* 2 — Labour pain pathways and block heights */
const Dermatomes = () => (
  <Svg title="Spinal segments for labour pain and caesarean block height, labelled">
    <path d="M200 20 L200 280" stroke={ink} strokeWidth={3} />
    {["T4", "T6", "T8", "T10", "T11", "T12", "L1", "S2", "S3", "S4"].map((s, i) => {
      const y = 30 + i * 25;
      return (
        <g key={s}>
          <line x1={195} y1={y} x2={205} y2={y} stroke={ink} />
          <text x={212} y={y + 3} fontSize={9} fill={ink}>{s}</text>
        </g>
      );
    })}
    <rect x={185} y={100} width={30} height={60} fill={nerve} fillOpacity={0.3} stroke={nerve} />
    <rect x={185} y={200} width={30} height={60} fill={accent} fillOpacity={0.3} stroke={accent} />
    <path d="M178 30 L178 270" stroke={vessel} strokeWidth={2} strokeDasharray="4 3" />
    <ellipse cx={90} cy={150} rx={45} ry={55} fill="hsl(var(--primary) / 0.12)" stroke={ink} />
    <path d="M130 140 L185 130" stroke={nerve} strokeWidth={1.5} />
    <path d="M110 200 L185 230" stroke={accent} strokeWidth={1.5} />
    <Label x={215} y={130} tx={330} ty={110}>1st stage: T10–L1</Label>
    <Label x={215} y={230} tx={330} ty={230}>2nd stage: S2–S4</Label>
    <Label x={178} y={30} tx={330} ty={30}>Caesarean: block to T4</Label>
    <Label x={90} y={140} tx={40} ty={100} anchor="end">Uterus / cervix</Label>
    <Label x={120} y={204} tx={40} ty={240} anchor="end">Vagina / perineum</Label>
  </Svg>
);

const plates: AtlasPlate[] = [
  {
    Diagram: Aortocaval,
    title: "Aortocaval compression",
    landmarks: [
      { text: "From about 20 weeks the supine uterus compresses the IVC and can compress the aorta, reducing venous return and uteroplacental flow", ref: "Kinsella 1994 Supine Hypotension" },
      { text: "Many women compensate through paravertebral and azygos collaterals, so compression can occur without obvious maternal hypotension", ref: "Kinsella 1994 Supine Hypotension" },
    ],
    relevance: "Use left lateral tilt or manual uterine displacement for caesarean section, in labour and during resuscitation.",
  },
  {
    Diagram: Dermatomes,
    title: "Labour pain pathways and block heights",
    landmarks: [
      { text: "First-stage pain from the uterus and cervix travels with sympathetic fibres to T10–L1", ref: "Gray's Anatomy 42e" },
      { text: "Second-stage pain from the vagina and perineum travels in the pudendal nerve (S2–S4)", ref: "Gray's Anatomy 42e" },
      { text: "Block to cold to T4 (with touch to T5) is associated with less intraoperative pain at caesarean section", ref: "Russell 1995 Caesarean Block" },
    ],
    relevance: "Labour epidurals must cover T10–S4; test and document block height to touch and cold before caesarean incision.",
  },
];

export const ObstetricAnaesthesiaAtlas = () => (
  <AnatomyAtlas id="anatomy-atlas" heading="Atlas of Obstetric Anatomy & Key Landmarks" topicId="obstetric-anaesthesia" plates={plates} />
);
