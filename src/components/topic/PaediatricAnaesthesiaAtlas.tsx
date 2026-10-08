import { AnatomyAtlas, BigLabel, Svg, ink, muted, fillA, accent, nerve, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Sacral hiatus for caudal block, posterior view */
const Caudal = () => (
  <Svg title="Sacrum and sacral hiatus for caudal block, posterior view, labelled">
    <path d="M130 40 L270 40 L240 210 L215 250 L185 250 L160 210 Z" fill={fillA} stroke={ink} strokeWidth={2} />
    <path d="M130 45 Q90 20 70 40 Q85 80 112 100" fill="none" stroke={muted} strokeWidth={2} />
    <path d="M270 45 Q310 20 330 40 Q315 80 288 100" fill="none" stroke={muted} strokeWidth={2} />
    <circle cx={112} cy={88} r={7} fill={accent} />
    <circle cx={288} cy={88} r={7} fill={accent} />
    <path d="M112 88 L288 88 L200 215 Z" fill="none" stroke={accent} strokeDasharray="5 3" />
    <path d="M185 215 Q200 200 215 215 L210 250 L190 250 Z" fill="hsl(var(--background))" stroke={ink} />
    <circle cx={185} cy={218} r={5} fill={ink} />
    <circle cx={215} cy={218} r={5} fill={ink} />
    <path d="M200 20 L200 145" stroke={nerve} fill="none" strokeWidth={8} strokeOpacity={0.35} strokeLinecap="round" />
    <path d="M200 250 L200 290" stroke={ink} strokeWidth={3} />
    <path d="M185 90 L215 90" stroke={ink} strokeWidth={2} />
    <path d="M185 145 L215 145" stroke={nerve} strokeWidth={2} />
    <BigLabel x={112} y={88} tx={40} ty={75} anchor="end">PSIS (ilium, ≈S2 level)</BigLabel>
    <BigLabel x={200} y={232} tx={330} ty={235}>Sacral hiatus</BigLabel>
    <BigLabel x={185} y={218} tx={40} ty={215} anchor="end">Sacral cornua</BigLabel>
    <BigLabel x={215} y={90} tx={330} ty={80}>Adult dural sac end ≈ S2</BigLabel>
    <BigLabel x={215} y={145} tx={330} ty={150}>Neonate dural sac end ≈ S3–S4</BigLabel>
    <BigLabel x={150} y={140} tx={40} ty={140} anchor="end">PSIS–hiatus triangle</BigLabel>
    <BigLabel x={200} y={280} tx={330} ty={285}>Coccyx</BigLabel>
  </Svg>
);

/* 2 — Dorsal nerves of the penis, cross-section */
const Penile = () => (
  <Svg title="Penis in cross-section showing dorsal nerves for penile block, labelled">
    <ellipse cx={200} cy={150} rx={120} ry={100} fill="none" stroke={ink} strokeWidth={2} />
    <ellipse cx={200} cy={150} rx={105} ry={85} fill="none" stroke={muted} strokeDasharray="4 3" />
    <ellipse cx={160} cy={130} rx={35} ry={30} fill={fillA} stroke={ink} />
    <ellipse cx={240} cy={130} rx={35} ry={30} fill={fillA} stroke={ink} />
    <ellipse cx={200} cy={200} rx={22} ry={18} fill={fillA} stroke={ink} />
    <circle cx={200} cy={207} r={4} fill={ink} />
    <circle cx={200} cy={78} r={5} fill="hsl(var(--destructive) / 0.75)" />
    <circle cx={160} cy={84} r={5} fill={nerve} />
    <circle cx={240} cy={84} r={5} fill={nerve} />
    <BigLabel x={160} y={84} tx={40} ty={50} anchor="end">Dorsal nerve (≈10–11 o'clock)</BigLabel>
    <BigLabel x={240} y={84} tx={340} ty={50}>Dorsal nerve (≈1–2 o'clock)</BigLabel>
    <BigLabel x={200} y={78} tx={340} ty={20}>Deep dorsal vein / arteries</BigLabel>
    <BigLabel x={160} y={130} tx={40} ty={140} anchor="end">Corpus cavernosum</BigLabel>
    <BigLabel x={200} y={200} tx={340} ty={230}>Corpus spongiosum + urethra</BigLabel>
    <BigLabel x={300} y={180} tx={340} ty={180}>Buck's fascia</BigLabel>
  </Svg>
);

const plates: AtlasPlate[] = [
  {
    Diagram: Caudal,
    title: "Sacral hiatus (caudal block)",
    landmarks: [
      { text: "The sacral hiatus lies between the sacral cornua and roughly forms an equilateral triangle with the two posterior superior iliac spines, which lie on the ilia at about the S2 level", ref: "Gray's Anatomy 42e" },
      { text: "In newborns the dural sac ends lower and closer to the hiatus than in adults, so excessive needle advancement risks dural puncture", ref: "van Schoor 2018 Dural Sac" },
    ],
    relevance: "Insert the caudal needle just through the sacrococcygeal membrane and advance only minimally; aspirate and give a test dose to exclude intrathecal or intravascular placement.",
  },
  {
    Diagram: Penile,
    title: "Dorsal nerves of the penis (penile block)",
    landmarks: [
      { text: "The paired dorsal nerves run deep to Buck's fascia beside the dorsal vessels, roughly at the 10–11 and 1–2 o'clock positions", ref: "Gray's Anatomy 42e" },
      { text: "Ultrasound shows the subpubic space and the nerves' relation to the vessels, supporting an ultrasound-guided approach", ref: "Zadrazil 2023 Penile Block" },
    ],
    relevance: "For circumcision, inject deep to Buck's fascia either side of the midline to avoid the dorsal vessels; never use adrenaline-containing solutions (end arteries).",
  },
];

export const PaediatricAnaesthesiaAtlas = () => (
  <AnatomyAtlas id="anatomy-atlas" heading="Atlas of Paediatric Day-Case Anatomy & Key Landmarks" topicId="paediatric-anaesthesia" plates={plates} />
);
