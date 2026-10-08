import type { ReactNode } from "react";
import { InlineRef } from "@/components/references/InlineRef";

const TOPIC = "general-colorectal-surgery";

/* Shared SVG styling — semantic tokens only */
const ink = "hsl(var(--foreground))";
const muted = "hsl(var(--muted-foreground))";
const fillA = "hsl(var(--muted))";
const accent = "hsl(var(--primary))";
const danger = "hsl(var(--destructive))";
const vessel = "hsl(var(--destructive) / 0.75)";
const nerve = "hsl(var(--foreground) / 0.8)";

const Label = ({ x, y, tx, ty, children, anchor = "start" }: { x: number; y: number; tx: number; ty: number; children: string; anchor?: "start" | "end" | "middle" }) => (
  <g>
    <line x1={x} y1={y} x2={tx} y2={ty} stroke={muted} strokeWidth={1.2} />
    <circle cx={x} cy={y} r={2.8} fill={ink} />
    <text x={tx + (anchor === "start" ? 4 : anchor === "end" ? -4 : 0)} y={ty + 4} fontSize={14} fontWeight={600} fill={ink} textAnchor={anchor}>{children}</text>
  </g>
);

const Svg = ({ title, children }: { title: string; children: ReactNode }) => (
  <svg viewBox="-260 -12 920 324" role="img" aria-label={title} className="w-full h-auto bg-card">
    <title>{title}</title>
    {children}
  </svg>
);

/* 1 — Anterior abdominal wall, transverse section above the arcuate line */
const AbdominalWall = () => (
  <Svg title="Transverse section of the anterior abdominal wall above the arcuate line, labelled">
    <path d="M20 90 Q200 40 380 90" fill="none" stroke={muted} strokeWidth={1} strokeDasharray="3 3" />
    <text x={200} y={30} fontSize={10} fill={muted} textAnchor="middle">Skin / subcutaneous fat</text>
    {/* rectus */}
    <ellipse cx={160} cy={115} rx={34} ry={14} fill={danger} fillOpacity={0.25} stroke={ink} />
    <ellipse cx={240} cy={115} rx={34} ry={14} fill={danger} fillOpacity={0.25} stroke={ink} />
    <rect x={194} y={101} width={12} height={28} fill={fillA} stroke={ink} />
    {/* sheath */}
    <path d="M120 98 Q200 88 280 98" fill="none" stroke={accent} strokeWidth={2} />
    <path d="M120 132 Q200 142 280 132" fill="none" stroke={accent} strokeWidth={2} />
    {/* lateral layers left */}
    {[0, 12, 24].map((o, i) => (
      <path key={i} d={`M126 ${108 + o / 2} Q70 ${120 + o} 20 ${150 + o}`} fill="none" stroke={ink} strokeWidth={6 - i} strokeOpacity={0.6} />
    ))}
    <path d="M128 140 Q75 160 25 200" fill="none" stroke={nerve} strokeWidth={1.5} strokeDasharray="4 2" />
    {/* inferior epigastric */}
    <circle cx={165} cy={134} r={3} fill={vessel} />
    <Label x={200} y={105} tx={200} ty={60} anchor="middle">Linea alba</Label>
    <Label x={240} y={115} tx={300} ty={70}>Rectus abdominis</Label>
    <Label x={270} y={99} tx={320} ty={95}>Anterior rectus sheath</Label>
    <Label x={260} y={136} tx={310} ty={165}>Posterior rectus sheath</Label>
    <Label x={165} y={134} tx={175} ty={190}>Inferior epigastric vessels</Label>
    <Label x={60} y={128} tx={20} ty={240}>External oblique</Label>
    <Label x={70} y={142} tx={20} ty={255}>Internal oblique</Label>
    <Label x={75} y={157} tx={20} ty={270}>Transversus abdominis</Label>
    <Label x={60} y={175} tx={140} ty={225}>TAP plane (T6–L1 nerves)</Label>
    <text x={200} y={292} fontSize={9} fill={muted} textAnchor="middle">Schematic, not to scale. Below the arcuate line the posterior sheath is absent.</text>
  </Svg>
);

/* 2 — Hepatocystic triangle */
const Calots = () => (
  <Svg title="Hepatocystic (Calot's) triangle, labelled">
    <path d="M20 40 L380 40 L380 90 Q200 110 20 90 Z" fill={fillA} stroke={ink} />
    <text x={200} y={65} fontSize={11} fill={ink} textAnchor="middle">Inferior surface of liver</text>
    <path d="M250 95 Q320 120 340 200 Q330 250 290 240 Q260 200 230 150 Z" fill="hsl(var(--primary) / 0.2)" stroke={ink} />
    <path d="M150 95 L150 280" stroke={accent} strokeWidth={6} />
    <path d="M150 190 Q190 175 235 160" fill="none" stroke={accent} strokeWidth={4} />
    <path d="M110 95 Q130 120 160 140 Q200 125 250 120" fill="none" stroke={vessel} strokeWidth={2.5} />
    <path d="M150 190 L235 160 L230 100 L150 100 Z" fill={accent} fillOpacity={0.08} stroke={accent} strokeDasharray="4 3" />
    <circle cx={205} cy={140} r={5} fill={muted} />
    <Label x={300} y={190} tx={350} ty={270} anchor="end">Gallbladder (retracted)</Label>
    <Label x={150} y={140} tx={40} ty={150} anchor="end">Common hepatic duct</Label>
    <Label x={150} y={250} tx={40} ty={255} anchor="end">Common bile duct</Label>
    <Label x={195} y={176} tx={200} ty={230}>Cystic duct</Label>
    <Label x={115} y={102} tx={40} ty={120} anchor="end">Right hepatic artery</Label>
    <Label x={225} y={121} tx={290} ty={115}>Cystic artery</Label>
    <Label x={205} y={140} tx={250} ty={290}>Cystic (Lund's) node</Label>
    <text x={190} y={293} fontSize={9} fill={muted} textAnchor="end">Dashed: hepatocystic triangle</text>
  </Svg>
);

/* 3 — Colonic arterial supply */
const Colon = () => (
  <Svg title="Colon with superior and inferior mesenteric arterial supply, labelled">
    <path d="M90 250 L90 90 L310 90 L310 230 Q300 270 250 270" fill="none" stroke={fillA} strokeWidth={26} strokeLinecap="round" />
    <path d="M90 250 L90 90 L310 90 L310 230 Q300 270 250 270" fill="none" stroke={ink} strokeWidth={0.8} />
    <path d="M90 104 L90 250 M104 104 L296 104 M296 104 L296 230" fill="none" stroke={vessel} strokeWidth={1.2} strokeDasharray="2 2" />
    <path d="M170 280 L170 130" stroke={vessel} strokeWidth={3} />
    <path d="M170 220 L104 230 M170 180 L104 160 M170 130 L180 104" stroke={vessel} strokeWidth={2} fill="none" />
    <path d="M240 200 L240 160 M240 160 L296 140 M240 175 L290 220 M240 200 L255 262" stroke={vessel} strokeWidth={2} fill="none" />
    <circle cx={296} cy={104} r={8} fill="none" stroke={danger} strokeWidth={2} />
    <Label x={170} y={260} tx={110} ty={290} anchor="end">SMA</Label>
    <Label x={130} y={226} tx={40} ty={275} anchor="end">Ileocolic</Label>
    <Label x={130} y={168} tx={40} ty={200} anchor="end">Right colic</Label>
    <Label x={176} y={115} tx={150} ty={40} anchor="middle">Middle colic</Label>
    <Label x={240} y={195} tx={210} ty={245} anchor="end">IMA</Label>
    <Label x={270} y={150} tx={340} ty={170}>Left colic</Label>
    <Label x={270} y={202} tx={345} ty={215}>Sigmoid branches</Label>
    <Label x={250} y={250} tx={300} ty={290}>Superior rectal</Label>
    <Label x={200} y={104} tx={230} ty={60}>Marginal artery</Label>
    <Label x={296} y={104} tx={340} ty={45}>Splenic flexure watershed</Label>
  </Svg>
);

/* 4 — Pelvis sagittal */
const Pelvis = () => (
  <Svg title="Sagittal section of the pelvis showing the rectum and mesorectum, labelled">
    <path d="M300 30 Q360 120 330 220 Q300 260 260 270" fill="none" stroke={ink} strokeWidth={10} strokeOpacity={0.5} />
    <path d="M290 50 Q330 130 305 210 Q285 245 255 255" fill="none" stroke={vessel} strokeWidth={2} strokeDasharray="3 2" />
    <path d="M250 40 Q290 130 270 210 Q255 245 225 260" fill={fillA} stroke={accent} strokeWidth={2} />
    <path d="M250 40 Q275 130 255 205 Q245 235 225 250" fill="none" stroke={ink} strokeWidth={10} strokeOpacity={0.25} />
    <path d="M225 255 L200 290" stroke={ink} strokeWidth={8} strokeOpacity={0.4} />
    <ellipse cx={120} cy={190} rx={45} ry={35} fill="hsl(var(--primary) / 0.15)" stroke={ink} />
    <path d="M140 270 Q200 250 250 275" fill="none" stroke={danger} strokeWidth={4} strokeOpacity={0.6} />
    <path d="M230 80 Q215 150 200 210" fill="none" stroke={nerve} strokeWidth={1.5} strokeDasharray="4 2" />
    <Label x={340} y={120} tx={370} ty={60}>Sacrum</Label>
    <Label x={318} y={150} tx={370} ty={170}>Presacral venous plexus</Label>
    <Label x={262} y={130} tx={300} ty={110} anchor="start">Mesorectal fascia</Label>
    <Label x={262} y={190} tx={170} ty={110} anchor="end">Rectum (in mesorectum)</Label>
    <Label x={210} y={170} tx={40} ty={110} anchor="end">Hypogastric nerves</Label>
    <Label x={120} y={190} tx={40} ty={150} anchor="end">Bladder</Label>
    <Label x={190} y={260} tx={110} ty={285} anchor="end">Levator ani</Label>
    <Label x={210} y={278} tx={250} ty={295}>Anal canal</Label>
  </Svg>
);

/* 5 — Oesophagus relations */
const Oesophagus = () => (
  <Svg title="Oesophagus and its relations, anterior view, labelled">
    <rect x={185} y={20} width={30} height={90} rx={8} fill={fillA} stroke={ink} />
    <path d="M215 110 L250 150 M185 110 L150 150" stroke={ink} strokeWidth={10} strokeOpacity={0.3} />
    <path d="M200 20 L205 240" stroke={accent} strokeWidth={14} strokeOpacity={0.5} />
    <path d="M150 115 Q200 75 250 115 L250 260" fill="none" stroke={vessel} strokeWidth={10} strokeOpacity={0.5} />
    <path d="M130 70 Q140 130 175 145" fill="none" stroke={vessel} strokeWidth={4} strokeOpacity={0.6} />
    <path d="M178 40 L178 105 Q190 130 225 120" fill="none" stroke={nerve} strokeWidth={1.5} strokeDasharray="4 2" />
    <path d="M222 40 L222 80" fill="none" stroke={nerve} strokeWidth={1.5} strokeDasharray="4 2" />
    <path d="M60 240 Q200 210 340 240" fill="none" stroke={ink} strokeWidth={4} strokeOpacity={0.5} />
    <path d="M205 240 Q240 255 290 245 Q320 280 260 290 Q215 290 205 260 Z" fill="hsl(var(--primary) / 0.15)" stroke={ink} />
    <Label x={200} y={50} tx={300} ty={30}>Trachea (anterior)</Label>
    <Label x={203} y={180} tx={300} ty={190}>Oesophagus (posterior)</Label>
    <Label x={230} y={95} tx={310} ty={85}>Aortic arch</Label>
    <Label x={178} y={70} tx={40} ty={40} anchor="end">Left recurrent laryngeal n.</Label>
    <Label x={222} y={60} tx={330} ty={55}>Right recurrent laryngeal n.</Label>
    <Label x={140} y={110} tx={40} ty={110} anchor="end">Azygos arch</Label>
    <Label x={158} y={140} tx={40} ty={160} anchor="end">Right main bronchus</Label>
    <Label x={100} y={233} tx={40} ty={205} anchor="end">Diaphragm / hiatus ≈T10</Label>
    <Label x={260} y={282} tx={320} ty={292}>Stomach</Label>
    <text x={200} y={12} fontSize={9} fill={muted} textAnchor="middle">Schematic: left RLN loops under arch; right under subclavian (not shown)</text>
  </Svg>
);

type Landmark = { text: string; ref: string };
const plates: { Diagram: () => JSX.Element; title: string; landmarks: Landmark[]; relevance: string }[] = [
  {
    Diagram: AbdominalWall,
    title: "Anterior abdominal wall",
    landmarks: [
      { text: "Linea alba — avascular midline for laparotomy; umbilicus ≈ T10 dermatome", ref: "Gray's Anatomy 42e" },
      { text: "Rectus sheath — posterior sheath absent below the arcuate line; target plane for rectus sheath blocks/catheters (T7–T11 terminal branches)", ref: "Gray's Anatomy 42e" },
      { text: "Lateral layers: external oblique, internal oblique, transversus abdominis — TAP block plane lies between internal oblique and transversus", ref: "Hebbard TAP 2007" },
      { text: "Inferior epigastric vessels run behind rectus — risk with lateral port placement and rectus sheath injection", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Incision site drives analgesia choice: midline → rectus sheath catheters/epidural; lateral or port sites → TAP or local infiltration.",
  },
  {
    Diagram: Calots,
    title: "Hepatocystic (Calot's) triangle",
    landmarks: [
      { text: "Boundaries: cystic duct, common hepatic duct, inferior surface of the liver", ref: "Strasberg 1995" },
      { text: "Contents: cystic artery (usually from the right hepatic artery), cystic lymph node", ref: "Gray's Anatomy 42e" },
      { text: "Critical view of safety: only two structures (duct and artery) enter the gallbladder before clipping", ref: "Strasberg 1995" },
      { text: "Variant anatomy (e.g. aberrant right hepatic artery) is common", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Bile duct injury is the feared complication. Reverse Trendelenburg with left tilt and good muscle relaxation help exposure; vagal bradycardia can occur with peritoneal stretch.",
  },
  {
    Diagram: Colon,
    title: "Colon and its arterial supply",
    landmarks: [
      { text: "SMA (midgut): ileocolic, right colic, middle colic — caecum to proximal two-thirds of transverse colon", ref: "Gray's Anatomy 42e" },
      { text: "IMA (hindgut): left colic, sigmoid, superior rectal — high ligation in anterior/AP resection", ref: "Gray's Anatomy 42e" },
      { text: "Marginal artery links both systems; watershed at the splenic flexure (Griffiths' point)", ref: "Fisher 1987" },
      { text: "Ureters and gonadal vessels lie behind the left and right colon — identified in mobilisation", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Anastomotic perfusion depends on the marginal arcade: avoid hypotension and excessive vasoconstriction; maintain euvolaemia.",
  },
  {
    Diagram: Pelvis,
    title: "Pelvis, rectum and mesorectum",
    landmarks: [
      { text: "Mesorectal fascia — the plane for total mesorectal excision (TME)", ref: "Heald 1982" },
      { text: "Presacral venous plexus — source of sudden, hard-to-control haemorrhage", ref: "Baqué 2004" },
      { text: "Hypogastric nerves and pelvic plexus on the sidewall — injury causes bladder and sexual dysfunction", ref: "Gray's Anatomy 42e" },
      { text: "Levator ani and anal canal — excised in the perineal phase of abdominoperineal resection", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Plan for steep Trendelenburg/lithotomy, a possible prone perineal phase, large-bore access and cross-matched blood for presacral bleeding.",
  },
  {
    Diagram: Oesophagus,
    title: "Oesophagus and its relations",
    landmarks: [
      { text: "Cervical: behind trachea; recurrent laryngeal nerves in the tracheo-oesophageal grooves (left loops under the aortic arch)", ref: "Hosoda 2020" },
      { text: "Thoracic: azygos vein arches over the right main bronchus — divided in the right thoracic (Ivor Lewis) approach", ref: "Gray's Anatomy 42e" },
      { text: "Hiatus at ≈T10; gastro-oesophageal junction below", ref: "Gray's Anatomy 42e" },
      { text: "Conduit blood supply: right gastroepiploic arcade along the greater curvature", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Right thoracotomy needs left one-lung ventilation; recurrent laryngeal nerve injury raises aspiration risk; conduit perfusion depends on avoiding hypotension.",
  },
];

export const GeneralSurgeryAtlas = () => (
  <section id="anatomy-atlas" className="scroll-mt-24 mb-10">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Atlas of Surgical Anatomy &amp; Key Landmarks</h2>
    <p className="text-sm text-muted-foreground mb-4">
      Labelled schematic diagrams — positions are simplified and not to scale. Each landmark is linked to its source.
    </p>
    <div className="grid gap-6 md:grid-cols-2">
      {plates.map(({ Diagram, title, landmarks, relevance }) => (
        <figure key={title} className="rounded-lg border border-border bg-card overflow-hidden">
          <Diagram />
          <figcaption className="p-4 space-y-2">
            <p className="font-semibold text-foreground">{title}</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {landmarks.map((l) => (
                <li key={l.text}>{l.text} <InlineRef topicId={TOPIC} refLabel={l.ref} /></li>
              ))}
            </ul>
            <p className="text-sm text-foreground"><strong>Anaesthetic relevance:</strong> {relevance}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);
