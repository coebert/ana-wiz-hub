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

const RupturedAaaDiagram = () => (
  <Shell id="op-ruptured-aaa" title="Ruptured AAA: getting proximal control" desc="Aorta with a ruptured aneurysm bleeding into the retroperitoneum. Proximal control is gained either by a supracoeliac clamp at open surgery or by an aortic occlusion balloon passed from the groin before the stent graft is placed.">
    <rect x={240} y={20} width={40} height={90} fill={ART} rx={6} />
    <path d="M240 70 L150 60 M280 70 L370 60" stroke={ART} strokeWidth={12} strokeLinecap="round" />
    <ellipse cx={260} cy={185} rx={62} ry={70} fill={FILL} stroke={ART} strokeWidth={3} />
    <ellipse cx={330} cy={215} rx={45} ry={30} fill={ART} opacity={0.35}><title>Retroperitoneal haematoma</title></ellipse>
    <path d="M250 255 L200 305 M270 255 L320 305" stroke={ART} strokeWidth={14} strokeLinecap="round" />
    <Clamp x={260} y={35} w={60} />
    <ellipse cx={260} cy={95} rx={14} ry={9} fill={GRAFT}><title>Occlusion balloon</title></ellipse>
    <path d="M260 104 L260 250 L320 305" stroke={GRAFT} strokeWidth={3} fill="none" strokeDasharray="6 4" />
    <Label x={300} y={30}>Open: supracoeliac clamp</Label>
    <Label x={300} y={95}>Or: occlusion balloon</Label>
    <Label x={300} y={111}>from the groin</Label>
    <Label x={360} y={260}>Haematoma</Label>
    <Label x={40} y={160}>Induce only once</Label>
    <Label x={40} y={176}>surgeon is ready</Label>
  </Shell>
);

const AortoBifemDiagram = () => (
  <Shell id="op-aorto-bifem" title="Aorto-bifemoral bypass" desc="A trouser (bifurcated) graft is sewn to the infrarenal aorta above diseased iliac arteries, with each limb tunnelled to a common femoral artery in the groin.">
    <rect x={240} y={20} width={40} height={130} fill={ART} rx={6} />
    <path d="M240 70 L150 60 M280 70 L370 60" stroke={ART} strokeWidth={12} strokeLinecap="round" />
    <path d="M250 150 L190 260 L180 305 M270 150 L330 260 L340 305" stroke={MUTED} strokeWidth={14} fill="none" strokeLinecap="round"><title>Diseased iliac arteries</title></path>
    <path d="M260 105 L260 150 L160 290 M260 150 L360 290" stroke={GRAFT} strokeWidth={8} fill="none" strokeLinejoin="round" />
    <Clamp x={260} y={96} w={56} />
    <Label x={120} y={50}>Renal artery</Label>
    <Label x={300} y={100}>Aortic clamp + graft join</Label>
    <Label x={60} y={200}>Diseased iliacs (grey)</Label>
    <Label x={330} y={215}>Graft limbs to groins</Label>
    <Label x={60} y={305}>Femoral join</Label>
    <Label x={370} y={305}>Femoral join</Label>
  </Shell>
);

const AmputationDiagram = () => (
  <Shell id="op-amputation" title="Major lower limb amputation levels" desc="Leg showing above-knee (transfemoral) and below-knee (transtibial) amputation levels, with a nerve catheter placed alongside the sciatic or tibial nerve for post-operative pain relief.">
    <path d="M230 20 L230 160 L240 290" stroke={FILL} strokeWidth={60} fill="none" strokeLinecap="round" />
    <path d="M230 20 L230 160 L240 290" stroke={INK} strokeWidth={2} fill="none" />
    <circle cx={230} cy={160} r={10} fill={MUTED}><title>Knee</title></circle>
    <path d="M180 110 L280 110" stroke={ART} strokeWidth={3} strokeDasharray="8 5" />
    <path d="M185 210 L285 210" stroke={ART} strokeWidth={3} strokeDasharray="8 5" />
    <path d="M250 60 L245 200" stroke={VEIN} strokeWidth={3} />
    <Label x={300} y={114}>Above-knee level</Label>
    <Label x={300} y={214}>Below-knee level</Label>
    <Label x={300} y={160}>Knee</Label>
    <Label x={40} y={60}>Nerve catheter (blue)</Label>
    <Label x={40} y={76}>along sciatic nerve</Label>
  </Shell>
);

const AvFistulaDiagram = () => (
  <Shell id="op-av-fistula" title="Arteriovenous fistula (radiocephalic)" desc="Forearm with the radial artery joined to the cephalic vein at the wrist. Arterial flow enters the vein, which enlarges over weeks so it can be needled for dialysis.">
    <rect x={60} y={90} width={400} height={140} rx={60} fill={FILL} stroke={INK} />
    <path d="M90 190 L330 190" stroke={ART} strokeWidth={10} strokeLinecap="round" />
    <path d="M330 190 C350 170, 360 140, 440 130 M90 130 L330 130 C340 150, 335 175, 330 190" stroke={VEIN} strokeWidth={10} fill="none" strokeLinecap="round" />
    <circle cx={330} cy={190} r={8} fill={INK}><title>Anastomosis</title></circle>
    <Label x={90} y={215}>Radial artery</Label>
    <Label x={90} y={120}>Cephalic vein (enlarges)</Label>
    <Label x={300} y={260}>Join at the wrist</Label>
    <Label x={60} y={40}>Brachial plexus block widens the vein</Label>
    <Label x={60} y={56}>and can help early fistula flow</Label>
  </Shell>
);

const CabgDiagram = () => (
  <Shell id="op-cabg" title="CABG on cardiopulmonary bypass" desc="Heart with the bypass circuit: venous blood drains from the right atrium to the machine and returns to the ascending aorta. The aorta is cross-clamped and cardioplegia stops the heart; grafts run from the aorta and internal mammary artery to coronary arteries beyond blockages.">
    <ellipse cx={230} cy={200} rx={90} ry={80} fill={FILL} stroke={INK} />
    <path d="M250 125 L250 50 L330 40" stroke={ART} strokeWidth={16} fill="none" strokeLinecap="round" />
    <Clamp x={250} y={95} w={40} />
    <path d="M150 170 C80 170, 70 90, 80 60" stroke={VEIN} strokeWidth={6} fill="none" />
    <rect x={40} y={20} width={90} height={36} rx={6} fill={GRAFT} opacity={0.3} stroke={GRAFT} />
    <path d="M130 38 L330 38" stroke={ART} strokeWidth={0} />
    <path d="M250 70 C320 100, 310 180, 270 230" stroke={GRAFT} strokeWidth={5} fill="none" />
    <path d="M200 40 C180 120, 190 190, 210 240" stroke={GRAFT} strokeWidth={5} fill="none" strokeDasharray="6 4" />
    <Label x={48} y={42}>Bypass</Label>
    <Label x={340} y={45}>Aorta (return cannula)</Label>
    <Label x={300} y={100}>Cross-clamp + cardioplegia</Label>
    <Label x={30} y={150}>Right atrial drain</Label>
    <Label x={320} y={210}>Vein graft from aorta</Label>
    <Label x={60} y={300}>Mammary artery graft (dashed)</Label>
  </Shell>
);

const VatsDiagram = () => (
  <Shell id="op-vats" title="VATS lobectomy: lateral position and one-lung ventilation" desc="Patient lying on the side. The upper lung is collapsed via a double-lumen tube while the lower lung is ventilated. Small ports allow a camera and instruments into the chest.">
    <ellipse cx={260} cy={170} rx={190} ry={110} fill={FILL} stroke={INK} />
    <ellipse cx={190} cy={110} rx={70} ry={40} fill={MUTED} opacity={0.4}><title>Collapsed lung</title></ellipse>
    <ellipse cx={200} cy={225} rx={80} ry={40} fill={VEIN} opacity={0.35}><title>Ventilated lung</title></ellipse>
    {[300, 350, 400].map((x) => <circle key={x} cx={x} cy={70} r={7} fill={GRAFT} />)}
    <Label x={300} y={45}>Ports (camera + instruments)</Label>
    <Label x={120} y={105}>Upper lung collapsed</Label>
    <Label x={120} y={230}>Lower lung ventilated</Label>
    <Label x={300} y={180}>Watch for hypoxia and</Label>
    <Label x={300} y={196}>shunt during one-lung</Label>
    <Label x={300} y={212}>ventilation</Label>
  </Shell>
);

const LapCholeDiagram = () => (
  <Shell id="op-lap-chole" title="Laparoscopic cholecystectomy: ports and pneumoperitoneum" desc="Abdomen inflated with carbon dioxide. Camera port at the umbilicus and working ports in the upper abdomen. Gallbladder under the liver; cystic duct and artery are clipped and divided.">
    <ellipse cx={260} cy={180} rx={200} ry={120} fill={FILL} stroke={INK} />
    <path d="M140 90 C200 60, 330 60, 380 100 L340 140 L160 130 Z" fill={MUTED} opacity={0.5}><title>Liver</title></path>
    <ellipse cx={280} cy={150} rx={30} ry={16} fill={GRAFT} />
    <path d="M255 155 L230 175" stroke={INK} strokeWidth={4} />
    {[[260, 250], [300, 120], [360, 150], [390, 190]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={7} fill={VEIN} />)}
    <Label x={160} y={80}>Liver</Label>
    <Label x={320} y={158}>Gallbladder</Label>
    <Label x={120} y={190}>Cystic duct clipped</Label>
    <Label x={270} y={258}>Umbilical camera port</Label>
    <Label x={60} y={325}>CO2 pressure + head-up tilt affect breathing and BP</Label>
  </Shell>
);

const WhippleDiagram = () => (
  <Shell id="op-whipple" title="Whipple procedure: three reconstructions" desc="After removing the head of the pancreas, duodenum and bile duct, a loop of small bowel is joined to the pancreas, the bile duct and the stomach.">
    <path d="M100 280 C100 150, 200 120, 260 120 C320 120, 420 150, 420 280" stroke={GRAFT} strokeWidth={14} fill="none" strokeLinecap="round" />
    <rect x={60} y={40} width={100} height={50} rx={10} fill={FILL} stroke={INK} />
    <rect x={210} y={40} width={100} height={40} rx={10} fill={FILL} stroke={INK} />
    <rect x={360} y={40} width={110} height={50} rx={10} fill={FILL} stroke={INK} />
    <path d="M110 90 L120 150 M260 80 L260 120 M415 90 L400 160" stroke={INK} strokeWidth={3} />
    <Label x={110} y={70} anchor="middle">Pancreas</Label>
    <Label x={260} y={65} anchor="middle">Bile duct</Label>
    <Label x={415} y={70} anchor="middle">Stomach</Label>
    <Label x={260} y={200} anchor="middle">Small-bowel loop (Roux)</Label>
    <Label x={260} y={300} anchor="middle">Long operation: fluids, heat loss, epidural or wound catheters</Label>
  </Shell>
);

const HipHemiDiagram = () => (
  <Shell id="op-hip-hemi" title="Hemiarthroplasty for hip fracture" desc="Femoral neck fracture with the head removed and replaced by a metal prosthetic head on a stem in the femoral canal. Cementing the stem can trigger bone cement implantation syndrome.">
    <path d="M250 300 L250 150 L190 90" stroke={FILL} strokeWidth={50} fill="none" strokeLinecap="round" />
    <circle cx={180} cy={80} r={34} fill={MUTED} opacity={0.6} />
    <path d="M250 290 L250 150 L195 95" stroke={GRAFT} strokeWidth={12} fill="none" strokeLinecap="round" />
    <circle cx={185} cy={85} r={26} fill={GRAFT} opacity={0.8}><title>Prosthetic head</title></circle>
    <path d="M200 125 L235 105" stroke={ART} strokeWidth={3} strokeDasharray="5 4" />
    <Label x={60} y={40}>Prosthetic head in socket</Label>
    <Label x={60} y={150}>Old fracture line</Label>
    <Label x={280} y={220}>Cemented stem:</Label>
    <Label x={280} y={236}>watch for low BP and</Label>
    <Label x={280} y={252}>oxygen drop on cementing</Label>
  </Shell>
);

const CaesareanDiagram = () => (
  <Shell id="op-caesarean" title="Caesarean section: spinal block height and incision" desc="Body outline showing a spinal block reaching about T4 for surgery, a low transverse skin incision, and left uterine displacement to relieve compression of the aorta and vena cava.">
    <rect x={200} y={20} width={120} height={280} rx={50} fill={FILL} stroke={INK} />
    <path d="M200 100 L320 100" stroke={VEIN} strokeWidth={3} strokeDasharray="8 5" />
    <rect x={200} y={100} width={120} height={200} fill={VEIN} opacity={0.12} />
    <path d="M225 250 Q260 262 295 250" stroke={ART} strokeWidth={4} fill="none" />
    <Label x={340} y={104}>Block to about T4</Label>
    <Label x={340} y={254}>Low transverse incision</Label>
    <Label x={30} y={180}>Left tilt / uterine</Label>
    <Label x={30} y={196}>displacement</Label>
  </Shell>
);

export function OperativeDiagram({ kind }: { kind: OperativeDiagramKey }) {
  switch (kind) {
    case "carotid": return <CarotidDiagram />;
    case "open-aaa": return <OpenAaaDiagram />;
    case "evar": return <EvarDiagram />;
    case "fem-pop": return <FemPopDiagram />;
    case "ivor-lewis": return <IvorLewisDiagram />;
    case "ruptured-aaa": return <RupturedAaaDiagram />;
    case "aorto-bifem": return <AortoBifemDiagram />;
    case "amputation": return <AmputationDiagram />;
    case "av-fistula": return <AvFistulaDiagram />;
    case "cabg": return <CabgDiagram />;
    case "vats": return <VatsDiagram />;
    case "lap-chole": return <LapCholeDiagram />;
    case "whipple": return <WhippleDiagram />;
    case "hip-hemi": return <HipHemiDiagram />;
    case "caesarean": return <CaesareanDiagram />;
  }
}
