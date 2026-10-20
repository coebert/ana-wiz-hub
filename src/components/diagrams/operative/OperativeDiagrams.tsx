import { DiagramFigure, svgImgProps } from "@/components/diagrams/_shared/DiagramFigure";
import type { OperativeDiagramKey } from "@/data/operativeSteps";

/* Schematic, not-to-scale teaching diagrams. Colours use theme tokens. */
const ART = "hsl(var(--destructive))";
const VEIN = "hsl(var(--primary))";
const INK = "hsl(var(--foreground))";
const MUTED = "hsl(var(--muted-foreground))";
const GRAFT = "hsl(var(--perioperative))";
const FILL = "hsl(var(--muted))";

const Label = ({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) => (
  <text x={x} y={y} fontSize={12} fill={INK} textAnchor={anchor}>{children}</text>
);
const Clamp = ({ x, y, w = 34 }: { x: number; y: number; w?: number }) => (
  <g><rect x={x - w / 2} y={y - 4} width={w} height={8} rx={2} fill={INK} /><title>Clamp</title></g>
);

function Shell({ id, title, desc, children, h = 320 }: { id: string; title: string; desc: string; children: React.ReactNode; h?: number }) {
  return (
    <DiagramFigure id={id} title={title} description={desc} showCaption className="my-4">
      <svg viewBox={`0 0 520 ${h}`} className="w-full max-w-xl h-auto rounded-lg border border-border bg-card" {...svgImgProps({ id })}>
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{desc}</desc>
        {children}
      </svg>
    </DiagramFigure>
  );
}

const CarotidDiagram = () => (
  <Shell id="op-carotid" title="Carotid endarterectomy: clamp sites and shunt" desc="Common carotid artery dividing into internal and external carotid arteries. Plaque at the bifurcation. Clamps on the common, internal and external carotids; a temporary shunt runs from the common to the internal carotid to keep the brain perfused when needed.">
    <path d="M200 300 L200 170 L150 40" stroke={ART} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M200 170 L270 50" stroke={ART} strokeWidth={16} fill="none" strokeLinecap="round" />
    <ellipse cx={192} cy={160} rx={14} ry={30} fill={MUTED} opacity={0.7}><title>Plaque</title></ellipse>
    <path d="M222 260 C250 200, 220 110, 175 80" stroke={GRAFT} strokeWidth={5} fill="none" strokeDasharray="7 5" />
    <Clamp x={200} y={250} /><Clamp x={160} y={70} /><Clamp x={252} y={82} w={28} />
    <Label x={212} y={295}>Common carotid (clamped)</Label>
    <Label x={60} y={30}>Internal carotid → brain</Label>
    <Label x={280} y={45}>External carotid</Label>
    <Label x={40} y={165}>Plaque at bifurcation</Label>
    <Label x={262} y={185}>Temporary shunt (dashed)</Label>
    <Label x={300} y={235}>Clamp on: test awake</Label>
    <Label x={300} y={252}>neurology / cerebral</Label>
    <Label x={300} y={269}>monitoring; keep BP up</Label>
  </Shell>
);

const OpenAaaDiagram = () => (
  <Shell id="op-open-aaa" title="Open AAA repair: clamp level and graft" desc="Aorta with the renal arteries branching off. Infrarenal clamp just below the renal arteries; aneurysm below this replaced by a tube graft; iliac arteries clamped distally. Higher clamps (suprarenal or supracoeliac) cause greater haemodynamic change and kidney and gut ischaemia.">
    <rect x={240} y={20} width={40} height={90} fill={ART} rx={6} />
    <path d="M240 70 L150 60 M280 70 L370 60" stroke={ART} strokeWidth={12} strokeLinecap="round" />
    <ellipse cx={260} cy={185} rx={62} ry={70} fill={FILL} stroke={ART} strokeWidth={3} />
    <rect x={246} y={115} width={28} height={140} fill={GRAFT} rx={4}><title>Tube graft</title></rect>
    <path d="M250 255 L200 305 M270 255 L320 305" stroke={ART} strokeWidth={14} strokeLinecap="round" />
    <Clamp x={260} y={112} w={60} /><Clamp x={210} y={292} w={28} /><Clamp x={310} y={292} w={28} />
    <Label x={120} y={50}>Renal artery</Label>
    <Label x={300} y={35}>Higher clamp = bigger effect</Label>
    <Label x={330} y={115}>Infrarenal cross-clamp</Label>
    <Label x={330} y={185}>Aneurysm sac opened,</Label>
    <Label x={330} y={201}>graft sewn inside</Label>
    <Label x={60} y={300}>Iliac clamps</Label>
  </Shell>
);

const EvarDiagram = () => (
  <Shell id="op-evar" title="EVAR: stent graft deployed from the groins" desc="Bifurcated stent graft sealing below the renal arteries inside the aneurysm, with limbs into both iliac arteries. Delivery sheaths enter through the femoral arteries. Contrast angiography checks for endoleak.">
    <rect x={240} y={20} width={40} height={90} fill={ART} rx={6} />
    <path d="M240 70 L150 60 M280 70 L370 60" stroke={ART} strokeWidth={12} strokeLinecap="round" />
    <ellipse cx={260} cy={185} rx={62} ry={70} fill={FILL} stroke={ART} strokeWidth={3} />
    <path d="M248 100 L248 210 L215 300 M272 100 L272 210 L305 300" stroke={GRAFT} strokeWidth={10} fill="none" strokeLinejoin="round" />
    <path d="M200 310 L170 310 M320 310 L350 310" stroke={INK} strokeWidth={4} />
    <Label x={120} y={50}>Renal artery</Label>
    <Label x={300} y={105}>Seal zone below renals</Label>
    <Label x={330} y={185}>Aneurysm excluded</Label>
    <Label x={60} y={300}>Femoral sheath</Label>
    <Label x={360} y={300}>Femoral sheath</Label>
  </Shell>
);

const FemPopDiagram = () => (
  <Shell id="op-fem-pop" title="Femoro-popliteal bypass" desc="Common femoral artery in the groin with an occluded superficial femoral artery. A vein or prosthetic graft runs from the common femoral artery to the popliteal artery beyond the blockage.">
    <path d="M220 20 L220 70 L235 290" stroke={ART} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M226 130 L231 220" stroke={MUTED} strokeWidth={16} strokeLinecap="round"><title>Occlusion</title></path>
    <path d="M222 70 C290 120, 290 230, 234 270" stroke={GRAFT} strokeWidth={7} fill="none" />
    <Label x={60} y={60}>Common femoral artery</Label>
    <Label x={60} y={180}>Occluded superficial</Label>
    <Label x={60} y={196}>femoral artery</Label>
    <Label x={295} y={170}>Vein or prosthetic graft</Label>
    <Label x={60} y={285}>Popliteal artery</Label>
  </Shell>
);

const IvorLewisDiagram = () => (
  <Shell id="op-ivor-lewis" title="Ivor Lewis oesophagectomy: two stages" desc="Stage one in the abdomen mobilises the stomach. Stage two through the right chest removes the lower oesophagus; the stomach is pulled up as a tube and joined to the remaining oesophagus inside the chest. One-lung ventilation is needed for the chest stage." h={300}>
    <rect x={60} y={30} width={180} height={110} rx={10} fill={FILL} stroke={INK} />
    <rect x={60} y={160} width={180} height={110} rx={10} fill={FILL} stroke={INK} />
    <path d="M150 40 L150 120" stroke={VEIN} strokeWidth={10} /><circle cx={150} cy={120} r={6} fill={INK}><title>Anastomosis</title></circle>
    <path d="M150 125 C140 170, 170 200, 150 240" stroke={GRAFT} strokeWidth={14} fill="none" strokeLinecap="round" />
    <Label x={70} y={50}>Right chest (stage 2)</Label>
    <Label x={70} y={180}>Abdomen (stage 1)</Label>
    <Label x={270} y={80}>Oesophagus resected;</Label>
    <Label x={270} y={96}>anastomosis in chest</Label>
    <Label x={270} y={112}>(one-lung ventilation)</Label>
    <Label x={270} y={210}>Stomach mobilised and</Label>
    <Label x={270} y={226}>pulled up as a conduit</Label>
  </Shell>
);

export function OperativeDiagram({ kind }: { kind: OperativeDiagramKey }) {
  switch (kind) {
    case "carotid": return <CarotidDiagram />;
    case "open-aaa": return <OpenAaaDiagram />;
    case "evar": return <EvarDiagram />;
    case "fem-pop": return <FemPopDiagram />;
    case "ivor-lewis": return <IvorLewisDiagram />;
  }
}
