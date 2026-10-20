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
        <path d="M250 70 C320 100, 310 180, 270 230" stroke={GRAFT} strokeWidth={5} fill="none" />
    <path d="M200 40 C180 120, 190 190, 210 240" stroke={GRAFT} strokeWidth={5} fill="none" strokeDasharray="6 4" />
    <Label x={48} y={42}>Bypass</Label>
    <Label x={340} y={45}>Aorta (return cannula)</Label>
    <Label x={300} y={100}>Cross-clamp + cardioplegia</Label>
    <Label x={20} y={130}>Right atrial drain</Label>
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
    {[[260, 250], [300, 120], [400, 150], [410, 200]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={7} fill={VEIN} />)}
    <Label x={160} y={80}>Liver</Label>
    <Label x={250} y={128}>Gallbladder</Label>
    <Label x={120} y={190}>Cystic duct clipped</Label>
    <Label x={270} y={258}>Umbilical camera port</Label>
    <Label x={60} y={312}>CO2 pressure + head-up tilt affect breathing and BP</Label>
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
    <path d="M200 100 L320 100 L320 250 A50 50 0 0 1 270 300 L250 300 A50 50 0 0 1 200 250 Z" fill={VEIN} opacity={0.12} />
    <path d="M225 250 Q260 262 295 250" stroke={ART} strokeWidth={4} fill="none" />
    <Label x={340} y={104}>Block to about T4</Label>
    <Label x={340} y={254}>Low transverse incision</Label>
    <Label x={30} y={180}>Left tilt / uterine</Label>
    <Label x={30} y={196}>displacement</Label>
  </Shell>
);

const AvrDiagram = () => (
  <Shell id="op-avr" title="Aortic valve replacement" desc="Heart on cardiopulmonary bypass with the aorta cross-clamped above the valve. The aorta is opened, the diseased valve is removed, and a prosthetic valve is sewn into the annulus. Air is removed before the clamp comes off.">
    <ellipse cx={230} cy={210} rx={95} ry={80} fill={FILL} stroke={INK} />
    <path d="M240 140 L240 50 L330 40" stroke={ART} strokeWidth={22} fill="none" strokeLinecap="round" />
    <Clamp x={240} y={85} w={44} />
    <circle cx={240} cy={140} r={16} fill={GRAFT}><title>Prosthetic valve</title></circle>
    <path d="M258 110 L275 110" stroke={INK} strokeWidth={3} />
    <Label x={340} y={45}>Ascending aorta</Label>
    <Label x={300} y={90}>Cross-clamp + cardioplegia</Label>
    <Label x={280} y={115}>Aortotomy</Label>
    <Label x={270} y={150}>New valve in annulus</Label>
    <Label x={30} y={300}>Before declamping: de-air, check TOE; watch for heart block</Label>
  </Shell>
);

const AnteriorResectionDiagram = () => (
  <Shell id="op-anterior-resection" title="Laparoscopic anterior resection" desc="Large bowel showing the sigmoid colon and upper rectum removed with the tumour. The inferior mesenteric artery is tied. The descending colon is joined to the rectal stump with a circular stapler passed through the anus; a temporary loop ileostomy may protect the join. Steep head-down tilt is used.">
    <path d="M100 40 L100 160 C100 230, 180 240, 230 220 L260 300" stroke={GRAFT} strokeWidth={22} fill="none" strokeLinecap="round" />
    <path d="M150 230 C190 240, 220 230, 235 225" stroke={MUTED} strokeWidth={24} strokeLinecap="round"><title>Resected segment</title></path>
    <circle cx={190} cy={236} r={10} fill={ART}><title>Tumour</title></circle>
    <path d="M330 40 L330 120 L260 190" stroke={ART} strokeWidth={6} fill="none" />
    <path d="M318 120 L342 120" stroke={INK} strokeWidth={4} />
    <circle cx={258} cy={272} r={7} fill={INK}><title>Stapled join</title></circle>
    <Label x={115} y={60}>Descending colon</Label>
    <Label x={60} y={275}>Sigmoid + tumour removed</Label>
    <Label x={345} y={60}>Aorta / inferior mesenteric</Label>
    <Label x={345} y={124}>artery tied</Label>
    <Label x={275} y={280}>Stapled join to rectum</Label>
    <Label x={300} y={190}>Steep head-down tilt</Label>
  </Shell>
);

const LaparotomyDiagram = () => (
  <Shell id="op-laparotomy" title="Emergency laparotomy: midline incision" desc="Abdomen with a long midline incision for access to all quadrants. Common sources are perforation, obstruction, ischaemia and bleeding. Damage control may leave the abdomen open.">
    <ellipse cx={260} cy={170} rx={150} ry={130} fill={FILL} stroke={INK} />
    <path d="M260 60 L260 280" stroke={ART} strokeWidth={4} />
    <path d="M110 170 L410 170" stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
    <Label x={140} y={110}>Perforation</Label><Label x={300} y={110}>Bleeding</Label>
    <Label x={140} y={230}>Obstruction</Label><Label x={300} y={230}>Ischaemia</Label>
    <Label x={270} y={300}>Midline incision</Label>
    <Label x={20} y={30}>Risk-score (NELA); sepsis, fluids, rapid sequence induction</Label>
  </Shell>
);

const ThrDiagram = () => (
  <Shell id="op-thr" title="Total hip replacement" desc="Both sides of the hip joint replaced: a cup in the acetabulum of the pelvis and a stem with a ball in the femur. Patient lies on the side. Cemented components can cause bone cement implantation syndrome.">
    <path d="M90 60 C150 40, 230 50, 260 110" stroke={FILL} strokeWidth={40} fill="none" strokeLinecap="round" />
    <path d="M180 110 A34 34 0 0 1 248 110" stroke={VEIN} strokeWidth={8} fill="none" />
    <circle cx={214} cy={112} r={24} fill={GRAFT} />
    <path d="M300 300 L300 160 L225 120" stroke={FILL} strokeWidth={46} fill="none" strokeLinecap="round" />
    <path d="M300 290 L300 160 L230 122" stroke={GRAFT} strokeWidth={12} fill="none" strokeLinecap="round" />
    <Label x={40} y={30}>Pelvis</Label>
    <Label x={60} y={150}>Cup in socket (blue)</Label>
    <Label x={330} y={160}>Ball on femoral stem</Label>
    <Label x={330} y={240}>Cementing: watch BP</Label>
    <Label x={330} y={256}>and oxygen saturation</Label>
  </Shell>
);

const TkrDiagram = () => (
  <Shell id="op-tkr" title="Total knee replacement" desc="Knee with metal components on the end of the femur and top of the tibia, a plastic spacer between them. A thigh tourniquet is usually inflated; adductor canal block and periarticular infiltration help mobilisation.">
    <path d="M260 20 L260 140" stroke={FILL} strokeWidth={60} strokeLinecap="round" />
    <path d="M260 180 L260 305" stroke={FILL} strokeWidth={56} strokeLinecap="round" />
    <rect x={225} y={130} width={70} height={18} rx={8} fill={GRAFT} />
    <rect x={228} y={152} width={64} height={10} fill={MUTED} />
    <rect x={225} y={166} width={70} height={14} rx={4} fill={GRAFT} />
    <rect x={225} y={50} width={70} height={14} fill={INK}><title>Tourniquet</title></rect>
    <Label x={310} y={60}>Thigh tourniquet</Label>
    <Label x={310} y={140}>Femoral component</Label>
    <Label x={310} y={160}>Plastic spacer</Label>
    <Label x={310} y={180}>Tibial component</Label>
    <Label x={30} y={240}>Adductor canal block</Label>
    <Label x={30} y={256}>spares quadriceps</Label>
  </Shell>
);

const SpineDiagram = () => (
  <Shell id="op-spine" title="Posterior lumbar spinal fusion: prone position" desc="Patient prone on a frame with the abdomen hanging free, reducing venous pressure and bleeding. Pedicle screws and rods fix the vertebrae. Pressure points and eyes must be protected.">
    {[60, 120, 180, 240].map((y) => <rect key={y} x={220} y={y} width={80} height={42} rx={8} fill={FILL} stroke={INK} />)}
    {[80, 140, 200, 260].map((y) => <g key={y}><circle cx={235} cy={y} r={6} fill={GRAFT} /><circle cx={285} cy={y} r={6} fill={GRAFT} /></g>)}
    <path d="M235 80 L235 260 M285 80 L285 260" stroke={GRAFT} strokeWidth={5} />
    <Label x={320} y={90}>Pedicle screws</Label>
    <Label x={320} y={110}>joined by rods</Label>
    <Label x={30} y={150}>Prone, abdomen free</Label>
    <Label x={30} y={166}>(less venous bleeding)</Label>
    <Label x={30} y={220}>Protect eyes, face,</Label>
    <Label x={30} y={236}>breasts, genitals</Label>
    <Label x={320} y={230}>Neuromonitoring may</Label>
    <Label x={320} y={246}>limit muscle relaxant</Label>
  </Shell>
);

const CraniotomyDiagram = () => (
  <Shell id="op-craniotomy" title="Craniotomy for supratentorial tumour" desc="Head fixed in pins with a bone flap removed over the tumour. Anaesthetic aims are smooth control of intracranial pressure: head up, normal carbon dioxide, avoiding coughing and big blood pressure swings.">
    <ellipse cx={260} cy={170} rx={130} ry={120} fill={FILL} stroke={INK} strokeWidth={3} />
    <path d="M190 70 A130 120 0 0 1 300 55" stroke={ART} strokeWidth={6} fill="none" strokeDasharray="8 5" />
    <circle cx={240} cy={120} r={28} fill={MUTED} opacity={0.7}><title>Tumour</title></circle>
    {[[140, 100], [380, 100], [260, 300]].map(([x, y]) => <circle key={`${x}`} cx={x} cy={y} r={7} fill={INK} />)}
    <Label x={310} y={45}>Bone flap</Label>
    <Label x={180} y={170}>Tumour</Label>
    <Label x={395} y={104}>Pin fixation</Label>
    <Label x={20} y={30}>Pinning: deepen anaesthesia / local to stop BP spike</Label>
    <Label x={395} y={250}>Keep CO2 normal,</Label>
    <Label x={395} y={266}>head up,</Label><Label x={395} y={282}>smooth wake-up</Label>
  </Shell>
);

const TurpDiagram = () => (
  <Shell id="op-turp" title="TURP and irrigation fluid absorption" desc="Resectoscope passed through the urethra into the prostate. Irrigation fluid flows in continuously; opened venous sinuses allow fluid absorption, which can cause TURP syndrome with low sodium and fluid overload. Spinal anaesthesia lets early confusion be noticed.">
    <ellipse cx={260} cy={90} rx={90} ry={60} fill={FILL} stroke={INK} />
    <ellipse cx={260} cy={170} rx={50} ry={34} fill={MUTED} opacity={0.6}><title>Prostate</title></ellipse>
    <path d="M260 140 L260 310" stroke={GRAFT} strokeWidth={10} strokeLinecap="round" />
    <path d="M240 200 C200 220, 180 240, 150 260" stroke={VEIN} strokeWidth={4} fill="none" strokeDasharray="6 4" />
    <Label x={360} y={90}>Bladder</Label>
    <Label x={320} y={175}>Prostate resected</Label>
    <Label x={280} y={290}>Resectoscope (urethra)</Label>
    <Label x={30} y={280}>Fluid absorbed into veins</Label>
    <Label x={30} y={296}>→ low sodium, overload</Label>
    <Label x={20} y={30}>Spinal lets you spot early confusion</Label>
  </Shell>
);

const RoboticProstateDiagram = () => (
  <Shell id="op-robotic-prostate" title="Robotic prostatectomy: steep head-down and pneumoperitoneum" desc="Patient in steep head-down (Trendelenburg) position with carbon dioxide in the abdomen and robot docked. This raises airway, intracranial and intraocular pressures; access to the patient is limited once docked.">
    <path d="M70 90 L450 230" stroke={INK} strokeWidth={6} />
    <ellipse cx={280} cy={140} rx={110} ry={40} fill={FILL} stroke={INK} transform="rotate(20 280 140)" />
    <circle cx={90} cy={80} r={22} fill={MUTED} opacity={0.6}><title>Head</title></circle>
    {[240, 290, 340].map((x) => <path key={x} d={`M${x} 40 L${x - 10} 110`} stroke={GRAFT} strokeWidth={5} />)}
    <Label x={250} y={30}>Robot arms</Label>
    <Label x={40} y={130}>Head low (~25–45°)</Label>
    <Label x={300} y={240}>CO2 pneumoperitoneum</Label>
    <Label x={20} y={290}>Facial/airway swelling, high airway pressure, limited access</Label>
  </Shell>
);

const ThyroidDiagram = () => (
  <Shell id="op-thyroid" title="Thyroidectomy: gland, airway and nerves" desc="Thyroid lobes either side of the trachea with the recurrent laryngeal nerves running behind and the parathyroid glands nearby. Risks include nerve injury affecting the vocal cords, low calcium, and a neck haematoma that can compress the airway.">
    <rect x={240} y={20} width={40} height={290} rx={18} fill={FILL} stroke={INK} />
    <ellipse cx={210} cy={150} rx={34} ry={60} fill={GRAFT} opacity={0.7} />
    <ellipse cx={310} cy={150} rx={34} ry={60} fill={GRAFT} opacity={0.7} />
    <path d="M232 300 L232 60 M288 300 L288 60" stroke={VEIN} strokeWidth={3} />
    {[[185, 120], [190, 190], [335, 120], [330, 190]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={6} fill={ART} />)}
    <Label x={30} y={60}>Thyroid lobes</Label>
    <Label x={360} y={60}>Trachea</Label>
    <Label x={360} y={130}>Parathyroids (red)</Label>
    <Label x={360} y={150}>→ low calcium</Label>
    <Label x={30} y={260}>Recurrent laryngeal</Label>
    <Label x={30} y={276}>nerves (blue)</Label>
    <Label x={360} y={260}>Neck haematoma:</Label>
    <Label x={360} y={276}>open wound early</Label>
  </Shell>
);

const TonsilDiagram = () => (
  <Shell id="op-tonsil" title="Tonsillectomy: shared airway" desc="Mouth held open by a gag with the tube secured in the midline. Both tonsils are removed. The surgeon and anaesthetist share the airway; post-tonsillectomy bleeding can cause a difficult, blood-filled airway.">
    <ellipse cx={260} cy={170} rx={150} ry={120} fill={FILL} stroke={INK} />
    <ellipse cx={180} cy={170} rx={26} ry={40} fill={ART} opacity={0.5} />
    <ellipse cx={340} cy={170} rx={26} ry={40} fill={ART} opacity={0.5} />
    <path d="M260 60 L260 270" stroke={GRAFT} strokeWidth={14} strokeLinecap="round" />
    <path d="M150 70 L370 70" stroke={INK} strokeWidth={6} />
    <Label x={380} y={74}>Mouth gag</Label>
    <Label x={60} y={170}>Tonsil</Label>
    <Label x={380} y={170}>Tonsil</Label>
    <Label x={275} y={250}>Tube held midline</Label>
    <Label x={20} y={310}>Watch for kinked tube on gag; plan for post-op bleed</Label>
  </Shell>
);

const TevarDiagram = () => (
  <Shell id="op-tevar" title="TEVAR: stent graft in the descending thoracic aorta" desc="Aortic arch with its branches. A stent graft lines the descending thoracic aorta from just beyond the left subclavian artery, delivered from the femoral artery. Covering the left subclavian and long segments of aorta raise the risk of spinal cord ischaemia; a lumbar CSF drain may be used.">
    <path d="M120 120 C140 30, 300 30, 320 110 L320 300" stroke={ART} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d="M170 70 L160 20 M220 50 L220 10 M265 60 L285 15" stroke={ART} strokeWidth={10} strokeLinecap="round" />
    <path d="M320 100 L320 260" stroke={GRAFT} strokeWidth={16} />
    <path d="M330 300 L330 315" stroke={INK} strokeWidth={4} />
    <path d="M440 120 L440 300" stroke={VEIN} strokeWidth={4} strokeDasharray="6 4" />
    <Label x={295} y={12}>Left subclavian</Label>
    <Label x={350} y={180}>Stent graft</Label>
    <Label x={40} y={150}>Ascending aorta</Label>
    <Label x={380} y={110}>CSF drain (lumbar)</Label>
    <Label x={20} y={250}>Lower BP briefly at deployment,</Label><Label x={20} y={266}>then keep it up for the spinal cord</Label>
  </Shell>
);

const SleeveDiagram = () => (
  <Shell id="op-sleeve" title="Sleeve gastrectomy: bougie and staple line" desc="Stomach outline with a bougie along the lesser curve. Staples divide the stomach alongside the bougie; the greater curve portion is removed, leaving a narrow tube.">
    <path d="M220 30 L220 80 C120 90, 110 230, 200 270 C280 300, 380 260, 360 200 C340 150, 280 120, 250 85" fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M225 40 C230 120, 240 200, 300 255" stroke={VEIN} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M245 75 C250 140, 265 200, 320 245" stroke={ART} strokeWidth={3} fill="none" strokeDasharray="7 4" />
    <Label x={30} y={40}>Bougie (blue) passed by anaesthetist</Label>
    <Label x={300} y={110}>Staple line</Label>
    <Label x={340} y={290}>Greater curve removed</Label>
    <Label x={30} y={300}>Remove NG tube / probes before stapling</Label>
  </Shell>
);

const LiverDiagram = () => (
  <Shell id="op-liver" title="Liver resection: Pringle manoeuvre and transection" desc="Liver with a transection line between right and left parts. A clamp around the hepatoduodenal ligament (portal vein and hepatic artery) is the Pringle manoeuvre. Hepatic veins drain to the inferior vena cava; low central venous pressure reduces back-bleeding during transection.">
    <path d="M60 120 C80 50, 420 40, 460 110 C430 170, 300 230, 120 220 C70 210, 50 170, 60 120 Z" fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M270 55 L250 220" stroke={ART} strokeWidth={3} strokeDasharray="8 5" />
    <rect x={250} y={40} width={30} height={20} fill={VEIN} opacity={0.6} />
    <path d="M230 230 L230 300" stroke={VEIN} strokeWidth={10} /><Clamp x={230} y={265} />
    <Label x={290} y={40}>IVC / hepatic veins</Label>
    <Label x={290} y={160}>Transection line</Label>
    <Label x={250} y={290}>Pringle clamp (portal inflow)</Label>
    <Label x={30} y={310}>Keep CVP low during transection; refill afterwards</Label>
  </Shell>
);

const CystectomyDiagram = () => (
  <Shell id="op-cystectomy" title="Radical cystectomy with ileal conduit" desc="After the bladder is removed, both ureters are joined to an isolated segment of ileum, which is brought out to the skin as a urinary stoma. Urine output cannot be measured between ureteric division and conduit formation.">
    <ellipse cx={170} cy={80} rx={30} ry={45} fill={FILL} stroke={INK} /><ellipse cx={350} cy={80} rx={30} ry={45} fill={FILL} stroke={INK} />
    <path d="M175 125 C200 190, 230 200, 250 210 M345 125 C320 190, 290 200, 270 210" stroke={GRAFT} strokeWidth={5} fill="none" />
    <rect x={230} y={200} width={160} height={28} rx={14} fill={ART} opacity={0.5} />
    <circle cx={400} cy={214} r={12} fill={INK} />
    <ellipse cx={260} cy={290} rx={40} ry={22} fill="none" stroke={MUTED} strokeDasharray="6 4" />
    <Label x={110} y={20}>Kidney</Label><Label x={380} y={20}>Kidney</Label>
    <Label x={40} y={170}>Ureters</Label>
    <Label x={240} y={250}>Ileal conduit</Label>
    <Label x={420} y={218}>Stoma</Label>
    <Label x={310} y={295}>Bladder removed</Label>
  </Shell>
);

const FreeFlapDiagram = () => (
  <Shell id="op-free-flap" title="Head and neck free flap" desc="Tissue from the forearm or thigh, with its own artery and vein, is moved to the neck defect and joined to neck vessels under the microscope. A tracheostomy often protects the airway. Flap perfusion relies on cardiac output, blood pressure and avoiding vasoconstriction.">
    <path d="M200 30 C120 40, 110 180, 190 230 L190 310 M330 30 C410 40, 410 180, 330 230 L330 310" stroke={INK} strokeWidth={2} fill="none" />
    <ellipse cx={240} cy={140} rx={45} ry={30} fill={GRAFT} opacity={0.7} />
    <path d="M280 145 C320 160, 330 200, 335 240" stroke={ART} strokeWidth={4} fill="none" />
    <path d="M275 155 C305 175, 315 210, 318 250" stroke={VEIN} strokeWidth={4} fill="none" />
    <rect x={245} y={250} width={30} height={14} rx={4} fill={INK} />
    <Label x={20} y={135}>Flap in defect</Label>
    <Label x={385} y={200}>Joined to neck</Label><Label x={385} y={216}>artery + vein</Label>
    <Label x={70} y={260}>Tracheostomy</Label>
    <Label x={30} y={20}>Warm, well filled, adequate BP</Label>
  </Shell>
);

const HysterectomyDiagram = () => (
  <Shell id="op-hysterectomy" title="Laparoscopic hysterectomy: steep head-down" desc="Patient in lithotomy with steep head-down tilt and carbon dioxide pneumoperitoneum. The uterus is removed after dividing the uterine vessels near the ureters. Head-down plus pneumoperitoneum raises airway pressure and can cause facial and airway swelling.">
    <path d="M60 100 L460 220" stroke={INK} strokeWidth={6} />
    <ellipse cx={260} cy={150} rx={110} ry={40} fill={FILL} stroke={INK} transform="rotate(17 260 150)" />
    <circle cx={80} cy={90} r={22} fill={MUTED} opacity={0.6} />
    <ellipse cx={330} cy={175} rx={26} ry={18} fill={ART} opacity={0.5} />
    <path d="M440 210 L480 150 M440 210 L490 190" stroke={INK} strokeWidth={5} />
    <Label x={300} y={230}>Uterus</Label>
    <Label x={30} y={140}>Head down</Label>
    <Label x={420} y={130}>Lithotomy legs</Label>
    <Label x={30} y={300}>Watch airway pressures, ETCO2 and peroneal nerve padding</Label>
  </Shell>
);

const BreastDiagram = () => (
  <Shell id="op-breast" title="Mastectomy with DIEP flap reconstruction" desc="Abdominal skin and fat are raised on the deep inferior epigastric vessels and moved to the chest, where the vessels are joined to the internal mammary artery and vein. Abdominal and chest wall blocks help analgesia.">
    <rect x={150} y={20} width={220} height={290} rx={60} fill={FILL} stroke={INK} />
    <ellipse cx={210} cy={110} rx={40} ry={30} fill={GRAFT} opacity={0.7} />
    <ellipse cx={260} cy={240} rx={80} ry={28} fill="none" stroke={ART} strokeWidth={3} strokeDasharray="8 5" />
    <path d="M220 230 C200 190, 200 150, 210 130" stroke={ART} strokeWidth={3} fill="none" />
    <path d="M250 60 L250 110" stroke={VEIN} strokeWidth={4} />
    <Label x={20} y={110}>Reconstructed breast</Label>
    <Label x={260} y={70}>Internal mammary vessels</Label>
    <Label x={380} y={250}>Abdominal donor site</Label>
    <Label x={20} y={300}>Blue dye can lower SpO2 readings</Label>
  </Shell>
);

const CataractDiagram = () => (
  <Shell id="op-cataract" title="Cataract surgery and local anaesthesia" desc="Eye in cross-section showing the cornea, lens and globe. Topical or sub-Tenon's anaesthesia avoids sharp needles near the globe; peribulbar and retrobulbar needle blocks carry risks of globe perforation and brainstem anaesthesia. The clouded lens is emulsified and replaced.">
    <circle cx={250} cy={165} r={110} fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M150 110 A110 110 0 0 0 150 220" stroke={VEIN} strokeWidth={6} fill="none" />
    <ellipse cx={175} cy={165} rx={22} ry={45} fill={GRAFT} opacity={0.7} />
    <path d="M360 165 L460 165" stroke={MUTED} strokeWidth={10} />
    <path d="M420 280 L310 220" stroke={ART} strokeWidth={3} />
    <Label x={30} y={80}>Cornea</Label>
    <Label x={60} y={260}>Lens replaced</Label>
    <Label x={380} y={150}>Optic nerve</Label>
    <Label x={330} y={300}>Needle block route (risk)</Label>
    <Label x={20} y={20}>Topical / sub-Tenon's preferred: no sharp needle</Label>
  </Shell>
);

export function OperativeDiagram({ kind }: { kind: OperativeDiagramKey }) {
  switch (kind) {
    case "dental": return <DentalDiagram />;
    case "circumcision": return <CircumcisionDiagram />;
    case "paediatric-hernia": return <PaediatricHerniaDiagram />;
    case "mitral": return <MitralDiagram />;
    case "pneumonectomy": return <PneumonectomyDiagram />;
    case "gastric-bypass": return <GastricBypassDiagram />;
    case "vitrectomy": return <VitrectomyDiagram />;
    case "microdiscectomy": return <MicrodiscectomyDiagram />;
    case "manual-placenta": return <ManualPlacentaDiagram />;
    case "cleft": return <CleftDiagram />;
    case "tracheostomy": return <TracheostomyDiagram />;
    case "nephrectomy": return <NephrectomyDiagram />;
    case "awake-craniotomy": return <AwakeCraniotomyDiagram />;
    case "scoliosis": return <ScoliosisDiagram />;
    case "carotid-stent": return <CarotidStentDiagram />;
    case "femoral-endarterectomy": return <FemoralEndarterectomyDiagram />;
    case "kidney-transplant": return <KidneyTransplantDiagram />;
    case "inguinal-hernia": return <InguinalHerniaDiagram />;
    case "appendicectomy": return <AppendicectomyDiagram />;
    case "pituitary": return <PituitaryDiagram />;
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
    case "avr": return <AvrDiagram />;
    case "anterior-resection": return <AnteriorResectionDiagram />;
    case "laparotomy": return <LaparotomyDiagram />;
    case "thr": return <ThrDiagram />;
    case "tkr": return <TkrDiagram />;
    case "spine": return <SpineDiagram />;
    case "craniotomy": return <CraniotomyDiagram />;
    case "turp": return <TurpDiagram />;
    case "robotic-prostate": return <RoboticProstateDiagram />;
    case "thyroid": return <ThyroidDiagram />;
    case "tonsil": return <TonsilDiagram />;
    case "tevar": return <TevarDiagram />;
    case "sleeve": return <SleeveDiagram />;
    case "liver": return <LiverDiagram />;
    case "cystectomy": return <CystectomyDiagram />;
    case "free-flap": return <FreeFlapDiagram />;
    case "hysterectomy": return <HysterectomyDiagram />;
    case "breast": return <BreastDiagram />;
    case "cataract": return <CataractDiagram />;
    case "pyloromyotomy": return <PyloromyotomyDiagram />;
    case "burr-hole": return <BurrHoleDiagram />;
    case "shoulder": return <ShoulderDiagram />;
    case "mandible": return <MandibleDiagram />;
  }
}

/* Local vessel views are longitudinal, proximal at top; not whole-body projections.
 * Transplant: anterior view, patient's right = viewer's left.
 * Pituitary: sagittal view, anterior = viewer's left. */
const CarotidStentDiagram = () => (
  <Shell id="op-carotid-stent" title="Carotid stenting: crossing and protecting the lesion" desc="Longitudinal local vessel schematic, proximal below and brain above. A catheter crosses the carotid narrowing. A stent supports the lumen; a distal filter is one possible embolic protection method. Other systems use proximal flow reversal. Balloon inflation can provoke bradycardia and hypotension.">
    <path d="M205 280 L205 40 M255 280 L255 40" stroke={ART} strokeWidth={5} />
    <path d="M205 170 Q240 140 205 110 M255 170 Q220 140 255 110" stroke={MUTED} strokeWidth={10} fill="none" />
    <rect x={213} y={100} width={34} height={82} fill="none" stroke={GRAFT} strokeWidth={3} />
    {[110, 125, 140, 155, 170].map((y) => <path key={y} d={`M213 ${y} L247 ${y + 8}`} stroke={GRAFT} />)}
    <path d="M230 290 L230 65 L215 80 L245 80 Z" fill="none" stroke={VEIN} strokeWidth={2} />
    <Label x={230} y={25} anchor="middle">To brain</Label>
    <Label x={280} y={75}>Distal protection filter</Label>
    <Label x={280} y={140}>Stent across plaque</Label>
    <Label x={280} y={260}>Catheter from access site</Label>
    <Label x={25} y={315}>Ballooning: watch heart rate, BP and awake neurology</Label>
  </Shell>
);

const FemoralEndarterectomyDiagram = () => (
  <Shell id="op-femoral-endarterectomy" title="Femoral endarterectomy: plaque removal and patch" desc="Local longitudinal view of the common femoral bifurcation. The artery is opened, plaque removed, and a patch widens the closure. Flow continues into profunda and superficial femoral branches. A simultaneous iliac stent is possible in a hybrid procedure.">
    <path d="M230 30 L230 190 L170 280 M230 190 L300 280" stroke={ART} strokeWidth={20} fill="none" />
    <path d="M230 80 L230 175" stroke={GRAFT} strokeWidth={10} />
    <Clamp x={230} y={55} /><Clamp x={180} y={260} /><Clamp x={290} y={260} />
    <Label x={270} y={35}>Common femoral artery</Label>
    <Label x={270} y={130}>Patch after plaque removal</Label>
    <Label x={30} y={300}>Profunda branch</Label><Label x={290} y={300}>Superficial femoral branch</Label>
    <Label x={25} y={315}>Heparin → clamp → clear plaque → patch → check flow</Label>
  </Shell>
);

const KidneyTransplantDiagram = () => (
  <Shell id="op-kidney-transplant" title="Kidney transplant: iliac vessels and bladder" desc="Anterior schematic of a kidney graft in the patient's right iliac fossa, viewer's left. The graft artery and vein join recipient iliac vessels. The donor ureter joins the bladder. The native kidneys are usually left in place. Reperfusion is a planned anaesthetic checkpoint.">
    <path d="M100 65 C45 55, 35 160, 100 185 C140 175, 140 140, 110 130 C95 120, 140 90, 100 65 Z" fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M195 35 L195 235" stroke={ART} strokeWidth={12} /><path d="M220 35 L220 235" stroke={VEIN} strokeWidth={12} />
    <path d="M115 115 L195 125" stroke={ART} strokeWidth={5} /><path d="M115 135 L220 150" stroke={VEIN} strokeWidth={5} />
    <path d="M105 150 C110 230, 170 245, 240 260" stroke={GRAFT} strokeWidth={4} fill="none" />
    <path d="M230 245 Q275 215 320 245 Q320 295 275 300 Q230 295 230 245 Z" fill={FILL} stroke={INK} />
    <Label x={30} y={30}>Patient's right iliac fossa</Label>
    <Label x={275} y={90}>Artery and vein joins</Label>
    <Label x={30} y={235}>Donor ureter</Label><Label x={345} y={270}>Bladder</Label>
    <Label x={25} y={315}>Before release: check perfusion, potassium and volume status</Label>
  </Shell>
);

const InguinalHerniaDiagram = () => (
  <Shell id="op-inguinal-hernia" title="Inguinal hernia repair: reduce the sac and reinforce" desc="Local groin cross-section, not a laterality map. A hernia sac protrudes through a weakness in the abdominal wall. Its contents are reduced and mesh reinforces the region. Open and laparoscopic repairs place the mesh in different tissue planes; this is a conceptual sketch, not a surgical placement guide.">
    <path d="M40 110 L215 110 M305 110 L480 110" stroke={INK} strokeWidth={8} />
    <path d="M215 110 C190 220, 320 220, 305 110" fill={FILL} stroke={GRAFT} strokeWidth={3} />
    <path d="M230 105 C205 180, 300 180, 285 105" fill="none" stroke={ART} strokeWidth={5} />
    <path d="M260 185 L260 65 M250 80 L260 65 L270 80" stroke={VEIN} strokeWidth={3} fill="none" />
    <path d="M170 240 L350 240 M170 250 L350 250 M170 260 L350 260" stroke={GRAFT} strokeWidth={2} />
    <Label x={30} y={70}>Abdominal wall</Label><Label x={330} y={185}>Hernia sac</Label>
    <Label x={280} y={55}>Reduce contents</Label><Label x={365} y={255}>Mesh reinforcement</Label>
    <Label x={25} y={315}>Open: local / regional / general; laparoscopic: usually general</Label>
  </Shell>
);

const AppendicectomyDiagram = () => (
  <Shell id="op-appendicectomy" title="Appendicectomy: mesoappendix and appendiceal base" desc="Local view of the caecum and appendix, no whole-body laterality implied. The appendiceal vessels in the mesoappendix are controlled, the base is secured, and the appendix is divided and retrieved. Perforation requires source control; contamination changes recovery planning.">
    <path d="M170 35 L170 160 Q170 205 240 205 Q310 205 310 160 L310 35" fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M260 200 C330 250, 280 290, 230 265" stroke={GRAFT} strokeWidth={20} fill="none" strokeLinecap="round" />
    <path d="M195 200 L275 235 L285 210 Z" fill={MUTED} opacity={0.35} />
    <path d="M195 205 L275 235" stroke={ART} strokeWidth={3} /><Clamp x={275} y={215} w={25} />
    <Label x={330} y={90}>Caecum</Label><Label x={330} y={225}>Base secured</Label>
    <Label x={30} y={235}>Mesoappendix vessels</Label><Label x={330} y={285}>Appendix removed</Label>
    <Label x={25} y={315}>Assess aspiration risk; antibiotics and source control</Label>
  </Shell>
);

const PituitaryDiagram = () => (
  <Shell id="op-pituitary" title="Transsphenoidal surgery: nasal route to the sella" desc="Sagittal conceptual view, anterior on viewer's left. Endoscopic instruments pass through the nose and sphenoid sinus to reach the pituitary in the sella. This is a route schematic, not a scaled skull-base anatomical plate. Carotid injury and postoperative endocrine disturbance are key risks.">
    <path d="M75 200 L125 130 Q125 50 255 45 Q375 45 395 160 L395 275 L120 275 L120 210 Z" fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M95 190 L180 175 L245 155" stroke={GRAFT} strokeWidth={7} fill="none" />
    <path d="M200 135 L250 135 L250 180 L200 180 Z" fill={VEIN} opacity={0.2} stroke={VEIN} />
    <path d="M242 122 Q252 100 272 122 Q267 142 250 140 Z" fill={GRAFT} stroke={INK} />
    <Label x={30} y={235}>Nasal route</Label><Label x={285} y={125}>Pituitary / sella</Label>
    <Label x={285} y={180}>Sphenoid sinus</Label><Label x={25} y={30}>Anterior (nose) ← sagittal view → posterior</Label>
    <Label x={25} y={315}>Check vision, cortisol needs, sodium and urine output</Label>
  </Shell>
);

const PyloromyotomyDiagram = () => (
  <Shell id="op-pyloromyotomy" title="Pyloromyotomy: splitting the pyloric muscle" desc="Local schematic of the stomach outlet. The thickened pyloric muscle is split lengthways down to the mucosa, which bulges through, leaving the mucosa intact. A gastric tube empties the stomach before induction.">
    <path d="M60 80 Q40 200 160 220 L230 200 L230 120 L160 90 Q120 60 60 80 Z" fill={FILL} stroke={INK} strokeWidth={2} />
    <rect x={230} y={115} width={120} height={90} rx={40} fill={GRAFT} opacity={0.5} stroke={INK} />
    <path d="M250 160 L330 160" stroke={ART} strokeWidth={4} strokeDasharray="6 4" />
    <path d="M350 150 L460 150 M350 170 L460 170" stroke={INK} strokeWidth={3} />
    <path d="M95 40 L120 140" stroke={VEIN} strokeWidth={4} />
    <Label x={30} y={30}>Gastric tube: empty before induction</Label>
    <Label x={60} y={250}>Stomach</Label><Label x={240} y={100}>Thickened pylorus</Label>
    <Label x={230} y={235}>Muscle split to mucosa</Label><Label x={380} y={140}>Duodenum</Label>
    <Label x={25} y={300}>Correct alkalosis first; watch for postoperative apnoea</Label>
  </Shell>
);

const BurrHoleDiagram = () => (
  <Shell id="op-burr-hole" title="Burr holes for chronic subdural haematoma" desc="Coronal conceptual view of the skull. A crescent of liquefied chronic subdural blood lies over one hemisphere. Two burr holes allow irrigation, with a drain left in place. Not a laterality map.">
    <ellipse cx={260} cy={160} rx={170} ry={130} fill="none" stroke={INK} strokeWidth={8} />
    <ellipse cx={260} cy={165} rx={150} ry={112} fill={FILL} />
    <path d="M150 70 Q95 160 150 255 Q125 160 175 80 Z" fill={ART} opacity={0.45} />
    <circle cx={140} cy={85} r={9} fill="hsl(var(--card))" stroke={INK} strokeWidth={2} />
    <circle cx={110} cy={210} r={9} fill="hsl(var(--card))" stroke={INK} strokeWidth={2} />
    <path d="M110 210 C60 240, 40 260, 30 290" stroke={GRAFT} strokeWidth={3} fill="none" />
    <Label x={25} y={70}>Burr hole</Label><Label x={300} y={165}>Brain</Label>
    <Label x={175} y={200}>Chronic subdural collection</Label><Label x={40} y={270}>Drain</Label>
    <Label x={25} y={312}>Reverse anticoagulation; smooth emergence for neuro check</Label>
  </Shell>
);

const ShoulderDiagram = () => (
  <Shell id="op-shoulder" title="Shoulder arthroscopy in the beach chair position" desc="Side view of a seated patient. The arm blood pressure cuff sits below head level, so brain perfusion pressure is lower than the reading. An interscalene block in the neck can paralyse the diaphragm on that side.">
    <circle cx={180} cy={60} r={30} fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M180 90 L180 200 L300 200 L300 290" stroke={INK} strokeWidth={10} fill="none" strokeLinecap="round" />
    <path d="M180 120 L230 180" stroke={INK} strokeWidth={8} strokeLinecap="round" />
    <rect x={200} y={140} width={30} height={14} fill={VEIN} opacity={0.6} transform="rotate(50 215 147)" />
    <circle cx={198} cy={102} r={6} fill={GRAFT} />
    <path d="M330 60 L330 160" stroke={ART} strokeWidth={2} /><path d="M322 70 L330 60 L338 70 M322 150 L330 160 L338 150" stroke={ART} fill="none" />
    <Label x={210} y={95}>Interscalene block site</Label><Label x={240} y={190}>BP cuff on arm</Label>
    <Label x={345} y={105}>Head higher:</Label><Label x={345} y={122}>brain BP lower</Label>
    <Label x={25} y={312}>Phrenic palsy risk; avoid hypotension when sitting up</Label>
  </Shell>
);

const MandibleDiagram = () => (
  <Shell id="op-mandible" title="Mandibular fracture fixation and the airway" desc="Front-on schematic of the jaw. A fracture line crosses the mandible and is fixed with a miniplate. A nasal tube lets the teeth be brought together; intermaxillary fixation removes oral airway access.">
    <path d="M90 90 L110 210 Q260 300 410 210 L430 90" stroke={INK} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M300 230 L320 270" stroke={ART} strokeWidth={4} />
    <rect x={285} y={240} width={50} height={10} fill={GRAFT} transform="rotate(-25 310 245)" />
    <path d="M140 150 Q260 190 380 150" stroke={MUTED} strokeWidth={6} fill="none" />
    <path d="M240 30 L250 120 L270 140" stroke={VEIN} strokeWidth={5} fill="none" />
    <Label x={270} y={40}>Nasotracheal tube</Label><Label x={340} y={290}>Fracture + miniplate</Label>
    <Label x={170} y={205}>Teeth in occlusion</Label>
    <Label x={25} y={312}>Wired jaws: wire cutters travel with the patient</Label>
  </Shell>
);

/* Next-batch drawings are local procedural schematics, not anatomical plates.
 * Lung: anterior view, patient's right = viewer's left; left pneumonectomy shown.
 * Eye and spine: sagittal local views, anterior = viewer's left.
 * Other local schematics make no whole-body laterality claim. */
const DentalDiagram = () => (
  <Shell id="op-dental" title="Dental extractions: shared airway and socket haemostasis" desc="Local mouth schematic. A secured nasal tracheal tube leaves the teeth accessible. A tooth is removed from its socket; suction and haemostasis precede emergence. If a throat pack is used, its removal must be confirmed.">
    <path d="M90 100 Q260 45 430 100 L410 235 Q260 290 110 235 Z" fill={FILL} stroke={INK} strokeWidth={3} />
    {[150, 200, 250, 350].map((x) => <path key={x} d={`M${x} 175 q-15 -25 -25 0 l5 40 h20 Z`} fill={FILL} stroke={INK} strokeWidth={2} />)}
    <path d="M285 205 L310 205 M300 160 L300 105 M290 115 L300 105 L310 115" fill="none" stroke={GRAFT} strokeWidth={3} />
    <path d="M170 30 L180 110 L230 145" fill="none" stroke={VEIN} strokeWidth={6} />
    <Label x={220} y={35}>Secured tube: nasal route if suitable</Label>
    <Label x={330} y={130}>Tooth removed</Label><Label x={320} y={225}>Socket haemostasis</Label>
    <Label x={25} y={310}>Suction → confirm pack removed if used → airway recovery</Label>
  </Shell>
);

const CircumcisionDiagram = () => (
  <Shell id="op-circumcision" title="Circumcision: foreskin excision and closure" desc="Local longitudinal conceptual view. Excess foreskin is removed, leaving the glans exposed. Skin edges are sutured and bleeding controlled. Regional or local analgesia supplements general anaesthesia in many children; this drawing is not a cutting or block-placement guide.">
    <path d="M75 120 L280 120 Q355 160 280 200 L75 200" fill={FILL} stroke={INK} strokeWidth={3} />
    <path d="M260 108 Q395 160 260 212" fill="none" stroke={GRAFT} strokeWidth={10} strokeDasharray="7 5" />
    <path d="M245 115 L245 205" stroke={ART} strokeWidth={3} strokeDasharray="5 5" />
    <Label x={30} y={65}>Local view: not a cutting guide</Label><Label x={370} y={165}>Glans</Label>
    <Label x={240} y={245}>Foreskin removed (dashed)</Label><Label x={55} y={245}>Skin closure</Label>
    <Label x={25} y={310}>Analgesia plan → haemostasis → recovery and voiding advice</Label>
  </Shell>
);

const PaediatricHerniaDiagram = () => (
  <Shell id="op-paediatric-hernia" title="Childhood inguinal hernia: close the patent processus" desc="Local groin schematic, not a laterality map. An open processus vaginalis permits abdominal contents to descend. Contents are reduced and the sac neck closed. Unlike adult mesh repair, routine childhood repair usually does not need mesh.">
    <path d="M55 100 L205 100 M300 100 L465 100" stroke={INK} strokeWidth={7} />
    <path d="M220 100 L220 195 Q260 275 300 195 L280 100" fill={FILL} stroke={GRAFT} strokeWidth={3} />
    <path d="M250 195 L250 65 M240 80 L250 65 L260 80" fill="none" stroke={VEIN} strokeWidth={3} />
    <path d="M210 120 L290 120" stroke={ART} strokeWidth={5} />
    <Label x={25} y={55}>Abdominal cavity</Label><Label x={315} y={120}>Close sac neck</Label>
    <Label x={325} y={210}>Patent processus</Label><Label x={325} y={228}>vaginalis / hernia sac</Label>
    <Label x={25} y={310}>Reduce contents → close communication; usually no mesh</Label>
  </Shell>
);

const MitralDiagram = () => (
  <Shell id="op-mitral" title="Mitral surgery: repair or replace the valve" desc="Local flow schematic, not an anterior heart plate. Blood passes from the left atrium through the mitral valve to the left ventricle. Repair may use an annuloplasty ring; replacement uses a prosthesis. Cardiopulmonary bypass and cross-clamping permit surgery; transoesophageal echo checks the result after bypass.">
    <path d="M140 65 Q100 110 145 150 L325 150 Q375 100 325 65 Z" fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M145 180 Q115 270 235 280 Q355 270 325 180 Z" fill={FILL} stroke={INK} strokeWidth={2} />
    <ellipse cx={235} cy={165} rx={85} ry={16} fill="none" stroke={GRAFT} strokeWidth={5} />
    <path d="M200 163 L220 197 M270 163 L250 197" stroke={INK} strokeWidth={4} />
    <Label x={175} y={105}>Left atrium</Label><Label x={180} y={245}>Left ventricle</Label>
    <Label x={345} y={155}>Ring / prosthesis</Label><Label x={345} y={175}>at mitral valve</Label>
    <Label x={25} y={310}>Bypass → valve work → de-air → TOE check and separation</Label>
  </Shell>
);

const PneumonectomyDiagram = () => (
  <Shell id="op-pneumonectomy" title="Pneumonectomy: whole-lung resection" desc="Anterior conceptual chest view: patient's right is viewer's left. The left lung, on viewer's right, is shown dashed for removal. The main bronchus and pulmonary vessels are divided. Only the remaining right lung is ventilated during left-sided resection. This is not a hilar dissection map.">
    <path d="M190 55 Q90 70 90 245 Q155 270 220 225 L220 100 Z" fill={FILL} stroke={INK} strokeWidth={3} />
    <path d="M330 55 Q425 70 425 245 Q360 270 300 225 L300 100 Z" fill={FILL} stroke={GRAFT} strokeWidth={3} strokeDasharray="8 5" />
    <path d="M260 25 L260 105 L190 145 M260 105 L330 145" stroke={INK} strokeWidth={9} fill="none" />
    <path d="M295 125 L320 145 M295 170 L320 175" stroke={ART} strokeWidth={5} />
    <Label x={25} y={35}>Patient R / remaining lung</Label><Label x={300} y={285}>Patient L / removed</Label>
    <Label x={35} y={285}>Lung isolation</Label><Label x={25} y={310}>Protect remaining lung; avoid fluid overload; check stump</Label>
  </Shell>
);

const GastricBypassDiagram = () => (
  <Shell id="op-gastric-bypass" title="Roux-en-Y gastric bypass: two bowel joins" desc="Conceptual digestive-flow diagram, not a whole-body projection. A small gastric pouch joins a Roux limb of jejunum. Bile and pancreatic secretions travel from the excluded stomach and duodenum through a separate limb to the jejunojejunostomy. The excluded stomach stays in place.">
    <path d="M160 25 L160 65" stroke={INK} strokeWidth={10} />
    <path d="M140 65 Q130 105 180 105 L180 65 Z" fill={FILL} stroke={GRAFT} strokeWidth={3} />
    <path d="M200 80 Q290 50 310 140 Q290 210 215 165 Z" fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M160 105 L160 240 L330 240 L330 285 M250 170 L250 240" stroke={GRAFT} strokeWidth={10} fill="none" />
    <circle cx={160} cy={112} r={7} fill={ART} /><circle cx={250} cy={240} r={7} fill={ART} />
    <Label x={25} y={75}>Small pouch</Label><Label x={325} y={110}>Excluded stomach</Label>
    <Label x={25} y={175}>Roux limb</Label><Label x={325} y={185}>Biliopancreatic limb</Label>
    <Label x={270} y={265}>Bowel-to-bowel join</Label><Label x={25} y={310}>Pouch-to-bowel join above; leak and bleeding checks</Label>
  </Shell>
);

const VitrectomyDiagram = () => (
  <Shell id="op-vitrectomy" title="Vitrectomy: retinal repair and tamponade" desc="Local sagittal eye section, anterior on viewer's left. Instruments enter through scleral ports to remove vitreous and treat the retina. Gas or silicone oil may be placed for tamponade; gas bubbles expand with nitrous oxide and reduced ambient pressure.">
    <path d="M140 120 Q190 35 305 75 Q425 160 305 245 Q190 280 140 200 Q100 160 140 120 Z" fill={FILL} stroke={INK} strokeWidth={3} />
    <ellipse cx={155} cy={160} rx={15} ry={30} fill="none" stroke={INK} strokeWidth={2} />
    <path d="M290 90 Q395 160 290 230" stroke={ART} strokeWidth={4} fill="none" />
    <path d="M230 30 L250 150 M220 285 L250 180" stroke={GRAFT} strokeWidth={4} />
    <ellipse cx={270} cy={135} rx={40} ry={30} fill="none" stroke={VEIN} strokeWidth={3} strokeDasharray="5 4" />
    <Label x={25} y={160}>Lens</Label><Label x={355} y={65}>Retina</Label><Label x={25} y={30}>Scleral ports</Label>
    <Label x={375} y={185}>Gas bubble</Label><Label x={25} y={310}>If intraocular gas: no nitrous oxide; follow posture advice</Label>
  </Shell>
);

const MicrodiscectomyDiagram = () => (
  <Shell id="op-microdiscectomy" title="Lumbar microdiscectomy: decompress the nerve root" desc="Local sagittal lumbar schematic, anterior on viewer's left, posterior on viewer's right. A disc fragment protrudes towards a nerve root. Posterior access removes the compressing fragment; this is not a guide to the extent of bone or disc removal.">
    <rect x={100} y={60} width={110} height={80} rx={8} fill={FILL} stroke={INK} strokeWidth={2} />
    <rect x={100} y={180} width={110} height={80} rx={8} fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M100 148 L205 148 Q250 165 205 174 L100 174 Z" fill={GRAFT} stroke={INK} strokeWidth={2} />
    <path d="M260 55 L260 145 L315 225" fill="none" stroke={VEIN} strokeWidth={6} />
    <path d="M395 125 L240 163" stroke={ART} strokeWidth={3} strokeDasharray="6 5" />
    <Label x={25} y={30}>Anterior ← local sagittal view → posterior</Label>
    <Label x={300} y={75}>Nerve root</Label><Label x={25} y={290}>Disc fragment removed</Label>
    <Label x={340} y={245}>Posterior access</Label><Label x={25} y={310}>Prone safety → decompression → postoperative neuro check</Label>
  </Shell>
);

const ManualPlacentaDiagram = () => (
  <Shell id="op-manual-placenta" title="Manual removal of retained placenta" desc="Local uterine cross-section. A hand passes through the cervix to separate a retained placenta while the other hand supports the uterus externally. If no safe separation plane exists, stop and seek senior help for possible placenta accreta spectrum; do not force separation.">
    <path d="M130 65 Q260 10 390 65 Q410 180 300 235 L285 280 L235 280 L220 235 Q110 180 130 65 Z" fill={FILL} stroke={INK} strokeWidth={3} />
    <path d="M165 70 Q260 40 345 70 L335 100 Q260 75 175 100 Z" fill={ART} opacity={0.65} />
    <path d="M260 280 L260 155 L220 100 M260 155 L265 100 M260 155 L300 110" stroke={GRAFT} strokeWidth={12} fill="none" strokeLinecap="round" />
    <Label x={340} y={125}>Placenta</Label><Label x={30} y={240}>Access via cervix</Label>
    <Label x={30} y={30}>External uterine support</Label><Label x={25} y={310}>Anaesthesia + haemorrhage plan; no plane: stop, senior help</Label>
  </Shell>
);

const CleftDiagram = () => (
  <Shell id="op-cleft" title="Cleft palate repair: the shared airway" desc="View into the open mouth. A Dingman gag holds the mouth open; a south-facing RAE tube is fixed in the midline over the lower lip and runs under the gag's tongue blade. The cleft runs along the palate. A throat pack sits behind the tongue.">
    <ellipse cx={260} cy={170} rx={190} ry={130} fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M260 60 L260 200" stroke={ART} strokeWidth={10} strokeLinecap="round" />
    <rect x={150} y={215} width={220} height={22} rx={6} fill={MUTED} opacity={0.6} stroke={INK} />
    <path d="M260 300 L260 230" stroke={GRAFT} strokeWidth={9} strokeLinecap="round" />
    <path d="M70 90 L130 120 M450 90 L390 120" stroke={INK} strokeWidth={4} />
    <Label x={280} y={110}>Cleft in palate</Label>
    <Label x={300} y={265}>RAE tube, midline</Label>
    <Label x={105} y={207}>Gag tongue blade</Label>
    <Label x={25} y={40}>Dingman mouth gag</Label>
    <Label x={25} y={318}>Gag can kink or move the tube; watch obstruction after extubation</Label>
  </Shell>
);

const TracheostomyDiagram = () => (
  <Shell id="op-tracheostomy" title="Surgical tracheostomy: the tube exchange" desc="Side view of the neck. The tracheal tube is withdrawn until its tip is just above the opening in the trachea, then the tracheostomy tube is inserted through the opening. Placement is confirmed with capnography before the tracheal tube is removed.">
    <path d="M200 30 L200 300 M260 30 L260 300" stroke={INK} strokeWidth={3} />
    {[150, 175, 200, 225, 250, 275].map((y) => <path key={y} d={`M200 ${y} L260 ${y}`} stroke={MUTED} />)}
    <path d="M230 20 L230 140" stroke={VEIN} strokeWidth={8} strokeLinecap="round" />
    <path d="M330 170 L260 190 Q235 198 235 240" stroke={GRAFT} strokeWidth={9} fill="none" strokeLinecap="round" />
    <path d="M200 120 Q180 140 200 160" stroke={ART} strokeWidth={4} fill="none" />
    <Label x={290} y={70}>Tracheal tube pulled back</Label>
    <Label x={300} y={150}>Tracheostomy tube</Label>
    <Label x={60} y={140}>Thyroid isthmus</Label>
    <Label x={290} y={250}>Trachea</Label>
    <Label x={25} y={318}>Low oxygen, no diathermy at tracheal opening; confirm with capnography</Label>
  </Shell>
);

const NephrectomyDiagram = () => (
  <Shell id="op-nephrectomy" title="Radical nephrectomy and IVC tumour thrombus" desc="Anterior conceptual view, not a laterality map. The kidney with its tumour is removed after tying the renal artery and vein. Tumour can grow along the renal vein into the inferior vena cava, which then has to be clamped above and below the thrombus.">
    <path d="M250 20 L250 300" stroke={VEIN} strokeWidth={14} />
    <path d="M290 20 L290 300" stroke={ART} strokeWidth={8} />
    <ellipse cx={130} cy={170} rx={50} ry={80} fill={FILL} stroke={INK} strokeWidth={2} />
    <circle cx={115} cy={140} r={22} fill={ART} opacity={0.4} />
    <path d="M175 170 L243 170" stroke={VEIN} strokeWidth={8} />
    <path d="M178 190 L283 190" stroke={ART} strokeWidth={4} />
    <rect x={243} y={120} width={14} height={60} fill={MUTED} />
    <path d="M232 105 L268 105 M232 200 L268 200" stroke={INK} strokeWidth={4} />
    <Label x={60} y={275}>Kidney with tumour</Label>
    <Label x={310} y={60}>Aorta</Label><Label x={310} y={110}>IVC clamps above and below</Label>
    <Label x={310} y={150}>Tumour thrombus in IVC</Label><Label x={310} y={200}>Renal artery tied first</Label>
    <Label x={25} y={318}>Caval clamping drops venous return; watch for embolism</Label>
  </Shell>
);

const AwakeCraniotomyDiagram = () => (
  <Shell id="op-awake-craniotomy" title="Awake craniotomy: mapping while the patient talks" desc="View from the anaesthetist's side. The head is fixed in pins after a scalp block. Drapes are tented so the face can be seen and the airway reached. During the awake phase the surgeon stimulates the cortex while the patient speaks or moves.">
    <circle cx={200} cy={160} r={90} fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M150 90 Q200 60 250 90 L235 140 Q200 125 165 140 Z" fill={ART} opacity={0.3} stroke={INK} />
    <path d="M110 160 L60 160 M290 160 L340 160" stroke={INK} strokeWidth={5} />
    <path d="M200 40 L200 95" stroke={GRAFT} strokeWidth={3} />
    <path d="M300 240 Q360 200 420 240" stroke={MUTED} strokeWidth={3} fill="none" strokeDasharray="6 4" />
    <Label x={210} y={50}>Stimulation probe</Label><Label x={25} y={145}>Head pins</Label>
    <Label x={300} y={110}>Bone flap over tumour</Label><Label x={330} y={270}>Tented drapes: face visible</Label>
    <Label x={60} y={275}>Scalp block for pins and incision</Label>
    <Label x={25} y={318}>Seizure ready: cold saline and drugs; airway rescue to hand</Label>
  </Shell>
);

const ScoliosisDiagram = () => (
  <Shell id="op-scoliosis" title="Scoliosis correction: screws, rods and neuromonitoring" desc="Posterior view of a curved spine. Pedicle screws are placed across many levels and rods are used to straighten the curve. Motor and sensory evoked potentials monitor the spinal cord, which is most at risk during the correction manoeuvre.">
    <path d="M200 30 Q120 120 200 180 Q280 240 200 300" stroke={MUTED} strokeWidth={22} fill="none" opacity={0.5} />
    <path d="M330 30 L330 300" stroke={GRAFT} strokeWidth={5} />
    {[60, 100, 140, 180, 220, 260].map((y) => <circle key={y} cx={330} cy={y} r={6} fill={INK} />)}
    <path d="M240 165 L300 165" stroke={INK} strokeWidth={2} /><path d="M290 158 L300 165 L290 172" stroke={INK} fill="none" />
    <path d="M90 35 L90 120" stroke={VEIN} strokeWidth={3} strokeDasharray="5 3" />
    <Label x={60} y={170}>Curved spine</Label><Label x={350} y={100}>Pedicle screws</Label>
    <Label x={350} y={200}>Rod: corrected spine</Label><Label x={25} y={20}>Evoked potential monitoring</Label>
    <Label x={25} y={318}>Correction: keep BP and Hb up; TIVA; big blood loss</Label>
  </Shell>
);
