import { DiagramFigure, svgImgProps } from "@/components/diagrams/_shared/DiagramFigure";
import { IllustrationDefs, shadeIllustration, Leader, Sutures, Flow } from "./OperativeIllustration";
import type { OperativeDiagramKey } from "@/data/operativeSteps";

/* Schematic, not-to-scale teaching diagrams. Colours use theme tokens. */
const ART = "hsl(var(--destructive))";
const VEIN = "hsl(var(--primary))";
const INK = "hsl(var(--foreground))";
const MUTED = "hsl(var(--muted-foreground))";
const GRAFT = "hsl(var(--perioperative))";
const FILL = "hsl(var(--muted))";

const Label = ({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) => {
  const limit = anchor === "start" ? Math.max(16, Math.floor((505 - x) / 6.8)) : 72;
  const lines: string[] = [];
  for (const word of children.split(" ")) {
    const last = lines.length - 1;
    if (last < 0 || `${lines[last]} ${word}`.length > limit) lines.push(word);
    else lines[last] += ` ${word}`;
  }
  const startY = y >= 300 ? y - (lines.length - 1) * 15 : y;
  return <text x={x} y={startY} fontSize={12} fill={INK} textAnchor={anchor}>
    {lines.map((line, i) => <tspan key={i} x={x} dy={i === 0 ? 0 : 15}>{line}</tspan>)}
  </text>;
};
const Clamp = ({ x, y, w = 34 }: { x: number; y: number; w?: number }) => (
  <g stroke={INK} strokeWidth={2} fill={FILL}><path d={`M${x-w/2} ${y-5}H${x+w/2}M${x-w/2} ${y+5}H${x+w/2}M${x+w/2} ${y-5}l13 -12M${x+w/2} ${y+5}l13 12`} /><circle cx={x+w/2+16} cy={y-20} r={4} /><circle cx={x+w/2+16} cy={y+20} r={4} /><title>Vascular clamp</title></g>
);

function Shell({ id, title, desc, children, h = 340 }: { id: string; title: string; desc: string; children: React.ReactNode; h?: number }) {
  return (
    <DiagramFigure id={id} title={title} description={desc} showCaption className="my-4">
      <svg viewBox={`0 0 520 ${h}`} className="w-full max-w-xl h-auto rounded-lg border border-border bg-card" {...svgImgProps({ id })}>
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{desc}</desc>
        <IllustrationDefs id={id} />
        {shadeIllustration(children, id)}
      </svg>
    </DiagramFigure>
  );
}

const CarotidDiagram = () => (
  <Shell id="op-carotid" title="Carotid endarterectomy: arteriotomy, shunt and patch" desc="Local longitudinal bifurcation, proximal below and cranial above; no side implied. A cutaway shows plaque at the bulb and a shunt joining common and internal carotid lumens across the opened segment. External carotid branches are represented. Clamps and shunt illustrate the clamped phase, not final closure." h={360}>
    <path d="M210 305V175Q200 110 180 45" stroke={ART} strokeWidth={30} fill="none" />
    <path d="M210 175L300 55M280 85L330 95M290 68L315 35" stroke={ART} strokeWidth={16} fill="none" />
    <path d="M203 245V175Q197 140 187 110" stroke={FILL} strokeWidth={16} fill="none" />
    <path d="M200 197Q175 169 191 138L200 185Z" fill={MUTED} stroke={INK} />
    <path d="M210 275C245 230 238 160 182 85" stroke={GRAFT} strokeWidth={7} fill="none" />
    <Sutures x={210} y={145} vertical count={10} />
    <Clamp x={210} y={295}/><Clamp x={180} y={65}/><Clamp x={284} y={80} w={25}/>
    <Label x={28} y={28}>Internal carotid → brain</Label><Leader from={[160,32]} to={[180,45]}/>
    <Label x={330} y={50}>External carotid</Label><Leader from={[325,56]} to={[300,60]}/>
    <Label x={25} y={162}>Plaque / opened wall</Label><Leader from={[158,165]} to={[190,165]}/>
    <Label x={290} y={220}>Temporary shunt</Label><Leader from={[282,215]} to={[231,202]}/>
    <Label x={290} y={280}>Common carotid</Label><Leader from={[280,275]} to={[210,275]}/>
    <Label x={25} y={345}>Clamping: assess cerebral perfusion; awake testing when appropriate</Label>
  </Shell>
);

const OpenAaaDiagram = () => (
  <Shell id="op-open-aaa" title="Open AAA repair: opened sac and tube-graft joins" desc="Local longitudinal aortic cutaway, cranial above. A clamp on the intact infrarenal neck sits below the renal arteries. A tube graft joins healthy proximal and distal aortic cuffs within the opened sac; iliac clamps provide distal control. Mural thrombus and lumbar branch openings are shown schematically. Higher clamp strategies and bifurcated grafts are not illustrated." h={390}>
    <path d="M238 28V104C179 125 174 249 237 277V292L180 350M282 28V104C341 125 346 249 283 277V292L340 350" fill="none" stroke={ART} strokeWidth={12}/>
    <path d="M238 62L142 52M282 62L378 52" stroke={ART} strokeWidth={10}/>
    <path d="M219 118Q186 188 215 257L237 263V118Z M301 118Q334 188 305 257L283 263V118Z" fill={FILL} stroke={MUTED}/>
    <path d="M215 147Q202 181 217 205M303 154Q317 196 301 227" fill="none" stroke={MUTED} strokeWidth={9}/>
    <path d="M239 112H281V280H239Z" fill={GRAFT} stroke={INK} strokeWidth={1.5}/>
    {Array.from({length:18},(_,i)=><path key={i} d={`M241 ${120+i*8}q19 5 38 0`} stroke={INK} strokeWidth={0.5} fill="none" opacity={0.5}/>)}
    <Sutures x={238} y={116} count={7}/><Sutures x={238} y={278} count={7}/>
    <Clamp x={260} y={88} w={66}/><Clamp x={193} y={334}/><Clamp x={327} y={334}/>
    <path d="M216 183l-7 4 7 4M303 220l7 4-7 4" fill="none" stroke={ART} strokeWidth={3}/>
    <Label x={25} y={27}>Renal arteries</Label><Leader from={[118,33]} to={[151,53]}/>
    <Label x={344} y={93}>Neck clamp</Label><Leader from={[337,91]} to={[291,88]}/>
    <Label x={25} y={154}>Mural thrombus</Label><Leader from={[133,156]} to={[210,163]}/>
    <Label x={340} y={188}>Opened sac</Label><Leader from={[334,185]} to={[313,168]}/>
    <Label x={340} y={238}>Graft within sac</Label><Leader from={[333,234]} to={[280,229]}/>
    <Label x={25} y={265}>Lumbar branches</Label><Leader from={[143,256]} to={[214,187]}/>
    <Label x={25} y={321}>Distal aortic join</Label><Leader from={[148,313]} to={[241,278]}/>
    <Flow x={260} y={202}/><Label x={25} y={376}>Coordinate clamp and release; reassess perfusion and haemodynamics</Label>
  </Shell>
);

const EvarDiagram = () => (
  <Shell id="op-evar" title="EVAR: intraluminal graft and iliac landing zones" desc="Local anterior aortoiliac layout, patient's right on viewer's left. The bifurcated covered graft seals below the renal arteries and within the iliacs; catheters enter through connected femoral access routes. The aneurysm sac remains around the excluded lumen." h={360}>
    <path d="M260 35V100M255 65L145 60M265 65L375 60" stroke={ART} strokeWidth={22} fill="none"/>
    <path d="M244 95C185 125 190 215 235 245L180 315M276 95C335 125 330 215 285 245L340 315" fill={FILL} stroke={ART} strokeWidth={3}/>
    <path d="M260 90V220M260 220L180 315M260 220L340 315" stroke={GRAFT} strokeWidth={25} fill="none" strokeLinejoin="round"/>
    {[100,118,136,154,172,190,208].map(y=><path key={y} d={`M248 ${y}l6 6 6-6 6 6 6-6`} fill="none" stroke={INK} strokeWidth={1}/>)}
    {[0,1,2,3].map(i=><g key={i} stroke={INK} fill="none"><path d={`M${230-i*13} ${242+i*15}l10 5 5-9`}/><path d={`M${285+i*13} ${238+i*15}l5 9 10-5`}/></g>)}
    <path d="M165 338L190 297M355 338L330 297" stroke={VEIN} strokeWidth={5}/>
    <Label x={45} y={42}>Renal arteries</Label><Leader from={[140,45]} to={[150,60]}/>
    <Label x={310} y={96}>Proximal seal</Label><Leader from={[305,100]} to={[274,100]}/>
    <Label x={355} y={180}>Excluded sac</Label><Leader from={[345,180]} to={[325,180]}/>
    <Label x={25} y={275}>Iliac seal</Label><Leader from={[98,272]} to={[215,275]}/>
    <Label x={330} y={305}>Femoral access</Label><Label x={25} y={352}>Check renal patency, limb flow and endoleak with imaging</Label>
  </Shell>
);

const FemPopDiagram = () => (
  <Shell id="op-fem-pop" title="Femoro-popliteal bypass: graft around an occluded SFA" desc="Local limb view, proximal above. The profunda branches near the groin; a bypass graft joins the common femoral artery to the popliteal artery distal to superficial femoral occlusion. Dashed knee level distinguishes the distal target, not a laterality map." h={350}>
    <path d="M215 30V80Q220 155 215 220V305M215 80L165 155L150 200M175 143L140 155" stroke={ART} strokeWidth={16} fill="none"/>
    <path d="M216 125V212" stroke={MUTED} strokeWidth={17}/>
    <path d="M215 68C320 92 320 250 215 285" stroke={GRAFT} strokeWidth={9} fill="none"/>
    <Sutures x={202} y={68} count={4}/><Sutures x={202} y={285} count={4}/>
    <path d="M160 245H320" stroke={MUTED} strokeDasharray="4 5"/>
    <Label x={25} y={30}>Common femoral</Label><Leader from={[147,33]} to={[207,42]}/>
    <Label x={25} y={176}>Profunda</Label><Leader from={[96,170]} to={[160,170]}/>
    <Label x={310} y={150}>Bypass graft</Label><Leader from={[303,155]} to={[293,170]}/>
    <Label x={315} y={210}>Occluded SFA</Label><Leader from={[310,205]} to={[220,180]}/>
    <Label x={25} y={249}>Knee level</Label><Label x={270} y={302}>Popliteal join</Label>
    <Flow x={215} y={310}/><Label x={25} y={340}>Check distal perfusion after clamp release</Label>
  </Shell>
);

const IvorLewisDiagram = () => (
  <Shell id="op-ivor-lewis" title="Ivor Lewis oesophagectomy: two stages" desc="Stage one in the abdomen mobilises the stomach. Stage two through the right chest removes the lower oesophagus; the stomach is pulled up as a tube and joined to the remaining oesophagus inside the chest. One-lung ventilation is needed for the chest stage." h={300}>
    <rect x={60} y={30} width={180} height={110} rx={10} fill={FILL} stroke={INK} />
    <rect x={60} y={160} width={180} height={110} rx={10} fill={FILL} stroke={INK} />
    <path d="M150 40 L150 120" stroke={VEIN} strokeWidth={10} /><circle cx={150} cy={120} r={6} fill={INK}><title>Anastomosis</title></circle>
    <path d="M150 125 C140 170, 170 200, 150 240" stroke={GRAFT} strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M75 62Q120 82 80 113M215 61Q190 91 216 113" stroke={MUTED} fill="none"/><path d="M110 220Q90 184 137 192Q170 216 150 240" fill="none" stroke={MUTED}/><Sutures x={136} y={120}/>
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
    <path d="M305 205l18 6-8 8 16 6" fill="none" stroke={ART} strokeWidth={4}/><path d="M315 215Q349 191 370 212M320 231Q343 259 363 241" stroke={ART} fill="none" opacity={0.4}/>
    <Label x={300} y={30}>Open: supracoeliac clamp</Label>
    <Label x={300} y={95}>Or: occlusion balloon</Label>
    <Label x={300} y={111}>from the groin</Label>
    <Label x={360} y={260}>Haematoma</Label>
    <Label x={40} y={160}>Induce only once</Label>
    <Label x={40} y={176}>surgeon is ready</Label>
  </Shell>
);

const AortoBifemDiagram = () => (
  <Shell id="op-aorto-bifem" title="Aorto-bifemoral bypass: native vessels and graft tunnels" desc="Local frontal aortoiliac schematic, cranial above; no side-specific operative approach implied. A bifurcated graft has a proximal aortic join and two limbs tunnelled to common femoral arteries beyond diseased iliacs. An end-to-side proximal configuration is shown; alternatives exist. Profunda and superficial femoral runoff continue below the groin joins." h={390}>
    <path d="M250 25V177L169 290V335M250 177L351 290V335" stroke={ART} strokeWidth={16} fill="none"/>
    <path d="M250 58L140 49M250 58L368 49" stroke={ART} strokeWidth={9}/>
    <path d="M242 182L179 282M260 182L341 282" stroke={MUTED} strokeWidth={18}/>
    <path d="M259 110Q283 115 283 144V174M283 174Q235 198 169 311M283 174Q331 212 351 311" stroke={GRAFT} strokeWidth={12} fill="none" strokeLinejoin="round"/>
    <path d="M169 325L128 354M169 325L182 361M351 325L309 354M351 325L369 361" stroke={ART} strokeWidth={8}/>
    <path d="M144 276H374" stroke={MUTED} strokeDasharray="4 5"/>
    <Sutures x={251} y={113} count={4}/><Sutures x={156} y={312} count={4}/><Sutures x={338} y={312} count={4}/><Clamp x={250} y={85} w={53}/>
    <Label x={30} y={27}>Renal branches</Label><Leader from={[132,30]} to={[153,50]}/>
    <Label x={330} y={110}>Proximal graft join</Label><Leader from={[324,108]} to={[265,114]}/>
    <Label x={25} y={198}>Diseased native iliacs</Label><Leader from={[153,202]} to={[206,241]}/>
    <Label x={353} y={223}>Graft limbs</Label><Leader from={[345,225]} to={[327,234]}/>
    <Label x={25} y={279}>Groin level</Label><Label x={382} y={318}>Femoral join</Label><Leader from={[376,315]} to={[354,311]}/>
    <Label x={25} y={375}>Femoral joins preserve profunda and superficial femoral runoff</Label>
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
    <path d="M211 20L211 140Q225 166 229 186L221 280M249 20L249 140Q237 166 249 186L258 280" fill="none" stroke={INK} strokeWidth={2}/><path d="M250 185L270 280" stroke={MUTED} strokeWidth={4}/>
    <Label x={300} y={114}>Above-knee level</Label>
    <Label x={300} y={214}>Below-knee level</Label>
    <Label x={300} y={160}>Knee</Label>
    <Label x={40} y={60}>Nerve catheter (blue)</Label>
    <Label x={40} y={76}>along sciatic nerve</Label>
  </Shell>
);

const AvFistulaDiagram = () => (
  <Shell id="op-av-fistula" title="Radiocephalic fistula: end-of-vein to side-of-artery join" desc="Local longitudinal forearm view: elbow/proximal to viewer's left, wrist/distal to viewer's right. The radial artery remains continuous distally. The divided cephalic vein is turned down to the side of the artery; its unused distal segment is ligated. Arterial flow feeds the proximal venous outflow as well as the hand. Flow arrows are conceptual, not measured." h={350}>
    <path d="M52 118Q160 87 452 118V243Q197 261 52 231Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M70 206H451" stroke={ART} strokeWidth={12}/>
    <path d="M70 144H270Q310 145 321 203" stroke={VEIN} strokeWidth={13} fill="none"/>
    <path d="M350 146H449" stroke={VEIN} strokeWidth={7} strokeDasharray="4 4"/>
    <path d="M349 138V154" stroke={INK} strokeWidth={3}/>
    <Sutures x={309} y={203} count={4}/><Flow x={200} y={206} direction="right"/>
    <path d="M206 144H179M188 138L179 144L188 150" fill="none" stroke={INK} strokeWidth={2}/>
    <Flow x={405} y={206} direction="right"/>
    <Label x={25} y={30}>Proximal / elbow ← → distal / wrist</Label>
    <Label x={65} y={105}>Cephalic venous outflow</Label><Leader from={[179,110]} to={[179,139]}/>
    <Label x={358} y={88}>Distal vein tied</Label><Leader from={[365,97]} to={[349,145]}/>
    <Label x={64} y={282}>Radial artery remains continuous</Label><Leader from={[203,270]} to={[219,212]}/>
    <Label x={332} y={253}>End-to-side join</Label><Leader from={[327,244]} to={[323,207]}/>
    <Label x={25} y={333}>Check thrill, hand perfusion and haemostasis after release</Label>
  </Shell>
);

const CabgDiagram = () => (
  <Shell id="op-cabg" title="CABG: coronary grafts and the bypass circuit" desc="Anterior conceptual heart view, patient's right on viewer's left. Vein graft joins a coronary target beyond a stenosis; an internal thoracic artery graft reaches the anterior descending territory. Venous drainage passes to the oxygenator/pump and arterial blood returns to the aorta above the clamp. Not a coronary dissection map." h={370}>
    <path d="M175 125C115 115 125 220 185 260L270 322Q350 268 338 192Q335 118 270 137Q230 101 175 125Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M254 140V68Q275 32 325 65L335 110" stroke={ART} strokeWidth={22} fill="none"/>
    <path d="M238 143Q200 113 180 80M180 83L150 70" stroke={VEIN} strokeWidth={15} fill="none"/>
    <path d="M260 153Q275 230 270 310M260 170Q315 190 320 250" stroke={ART} strokeWidth={4} fill="none"/>
    <path d="M270 202L275 218M315 214L318 225" stroke={MUTED} strokeWidth={8}/>
    <path d="M254 151C365 150 355 242 320 250" stroke={GRAFT} strokeWidth={6} fill="none"/>
    <path d="M218 35C205 110 220 245 271 269" stroke={GRAFT} strokeWidth={5} fill="none" strokeDasharray="6 3"/>
    <path d="M155 169H85V105M85 60V35H365V68H275" stroke={VEIN} strokeWidth={5} fill="none"/>
    <path d="M85 60V35H365V68H275" stroke={ART} strokeWidth={5} fill="none"/>
    <rect x={35} y={60} width={100} height={45} rx={5} fill={FILL} stroke={INK}/>
    <Clamp x={254} y={109} w={35}/><Sutures x={309} y={248} count={3}/>
    <Label x={45} y={78}>Oxygenator</Label><Label x={52} y={94}>and pump</Label>
    <Label x={18} y={199}>Venous drain</Label><Leader from={[105,196]} to={[155,170]}/>
    <Label x={373} y={68}>Aortic return</Label><Label x={365} y={128}>Cross-clamp</Label>
    <Label x={360} y={215}>Vein graft</Label><Leader from={[353,219]} to={[349,212]}/>
    <Label x={25} y={290}>Internal thoracic graft</Label><Leader from={[174,286]} to={[238,240]}/>
    <Label x={25} y={355}>Grafts join beyond stenoses; assess rhythm, function and perfusion</Label>
  </Shell>
);

const VatsDiagram = () => (
  <Shell id="op-vats" title="VATS lobectomy: lateral position and one-lung ventilation" desc="Patient lying on the side. The upper lung is collapsed via a double-lumen tube while the lower lung is ventilated. Small ports allow a camera and instruments into the chest.">
    <ellipse cx={260} cy={170} rx={190} ry={110} fill={FILL} stroke={INK} />
    <ellipse cx={190} cy={110} rx={70} ry={40} fill={MUTED} opacity={0.4}><title>Collapsed lung</title></ellipse>
    <ellipse cx={200} cy={225} rx={80} ry={40} fill={VEIN} opacity={0.35}><title>Ventilated lung</title></ellipse>
    {[300, 350, 400].map((x) => <circle key={x} cx={x} cy={70} r={7} fill={GRAFT} />)}
    <path d="M126 218Q178 202 243 228M153 241Q183 219 209 193" stroke={VEIN} fill="none" strokeWidth={2}/><path d="M160 112Q197 123 242 102" stroke={INK} strokeDasharray="4 3" fill="none"/><path d="M303 77L247 111M349 77L236 119" stroke={GRAFT} strokeWidth={2}/>
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
    <path d="M270 154Q286 182 303 204L304 240M303 203L330 175" stroke={GRAFT} strokeWidth={4} fill="none"/><path d="M248 137L269 164" stroke={ART} strokeWidth={3}/><path d="M254 145l12-8M277 172l12-8" stroke={INK} strokeWidth={2}/>
    <Label x={160} y={80}>Liver</Label>
    <Label x={250} y={128}>Gallbladder</Label>
    <Label x={120} y={190}>Cystic duct clipped</Label>
    <Label x={270} y={258}>Umbilical camera port</Label>
    <Label x={60} y={312}>CO2 pressure + head-up tilt affect breathing and BP</Label>
  </Shell>
);

const WhippleDiagram = () => (
  <Shell id="op-whipple" title="Whipple: pancreatic, biliary and gastric reconstruction" desc="Conceptual reconstruction layout, not body laterality. After pancreaticoduodenectomy, remaining pancreas, hepatic duct and stomach are each joined to jejunum. One common single-loop configuration is illustrated; pylorus-preserving and other reconstructions differ." h={340}>
    <path d="M80 270Q80 172 130 174H370Q430 175 430 275" stroke={GRAFT} strokeWidth={18} fill="none"/>
    <path d="M45 85Q90 62 168 90L165 120Q90 131 45 111Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M162 105L163 175" stroke={GRAFT} strokeWidth={9}/>
    <path d="M248 45V95M227 40L248 60L270 40M248 95V175" stroke={GRAFT} strokeWidth={9} fill="none"/>
    <path d="M357 45V75Q321 92 330 128Q342 155 390 144L388 118Q417 105 405 83Q395 70 380 73V45" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M374 143L372 175" stroke={GRAFT} strokeWidth={12}/>
    <Sutures x={148} y={172}/><Sutures x={234} y={172}/><Sutures x={357} y={172}/>
    <Label x={32} y={45}>Pancreatic remnant</Label><Label x={192} y={26}>Hepatic duct</Label><Label x={398} y={60}>Stomach</Label>
    <Label x={95} y={225}>Pancreatic join</Label><Leader from={[146,212]} to={[163,180]}/>
    <Label x={242} y={257}>Biliary join</Label><Leader from={[269,244]} to={[248,180]}/>
    <Label x={335} y={225}>Gastric join</Label><Leader from={[368,212]} to={[372,180]}/>
    <Flow x={430} y={280}/><Label x={25} y={320}>Three distinct joins; prolonged surgery, bleeding and heat-loss risk</Label>
  </Shell>
);

const HipHemiDiagram = () => (
  <Shell id="op-hip-hemi" title="Hemiarthroplasty for hip fracture" desc="Femoral neck fracture with the head removed and replaced by a metal prosthetic head on a stem in the femoral canal. Cementing the stem can trigger bone cement implantation syndrome.">
    <path d="M250 300 L250 150 L190 90" stroke={FILL} strokeWidth={50} fill="none" strokeLinecap="round" />
    <circle cx={180} cy={80} r={34} fill={MUTED} opacity={0.6} />
    <path d="M250 290 L250 150 L195 95" stroke={GRAFT} strokeWidth={12} fill="none" strokeLinecap="round" />
    <circle cx={185} cy={85} r={26} fill={GRAFT} opacity={0.8}><title>Prosthetic head</title></circle>
    <path d="M200 125 L235 105" stroke={ART} strokeWidth={3} strokeDasharray="5 4" />
    <path d="M138 49Q179 13 211 59M146 62Q181 26 210 66" stroke={INK} strokeWidth={3} fill="none"/><path d="M228 171V279M271 169V280" stroke={MUTED} strokeWidth={2}/>
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
    <path d="M228 132Q260 112 293 143Q316 193 289 238Q260 260 232 234Q209 192 228 132Z" fill={FILL} stroke={MUTED}/><path d="M241 167Q265 144 280 173Q294 199 274 220Q251 233 238 211Q230 192 241 167Z" fill="none" stroke={INK} strokeWidth={2}/>
    <Label x={340} y={104}>Block to about T4</Label>
    <Label x={340} y={254}>Low transverse incision</Label>
    <Label x={30} y={180}>Left tilt / uterine</Label>
    <Label x={30} y={196}>displacement</Label>
  </Shell>
);

const AvrDiagram = () => (
  <Shell id="op-avr" title="Aortic valve replacement: annulus and aortotomy" desc="Local longitudinal cutaway of the left ventricular outflow and ascending aorta. A prosthetic valve is sutured at the aortic annulus, below an aortotomy and aortic cross-clamp. Coronary ostia arise above the annulus. This is not a full anterior heart plate." h={350}>
    <path d="M205 35V160Q130 185 165 260Q210 318 290 270Q330 230 285 170V35" fill={FILL} stroke={INK} strokeWidth={3}/>
    <path d="M210 40V153M280 40V153" stroke={ART} strokeWidth={9}/>
    <path d="M205 141L170 130M285 141L320 130" stroke={ART} strokeWidth={6}/>
    <ellipse cx={245} cy={167} rx={38} ry={12} fill={FILL} stroke={GRAFT} strokeWidth={5}/>
    <path d="M225 163L235 174M255 163L265 174" stroke={INK} strokeWidth={4}/>
    <Sutures x={216} y={166} count={9}/><Clamp x={245} y={65} w={90}/>
    <path d="M205 103Q245 118 285 103" stroke={ART} strokeWidth={3} fill="none" strokeDasharray="5 3"/>
    <Label x={330} y={44}>Ascending aorta</Label><Label x={340} y={81}>Cross-clamp</Label>
    <Label x={335} y={112}>Aortotomy</Label><Leader from={[328,108]} to={[283,105]}/>
    <Label x={30} y={131}>Coronary ostium</Label><Leader from={[147,128]} to={[176,132]}/>
    <Label x={330} y={184}>Prosthetic valve</Label><Leader from={[323,181]} to={[277,169]}/>
    <Label x={220} y={250}>LV outflow</Label><Flow x={245} y={200} direction="up"/>
    <Label x={25} y={335}>De-air and TOE assessment before separation from bypass</Label>
  </Shell>
);

const AnteriorResectionDiagram = () => (
  <Shell id="op-anterior-resection" title="Anterior resection: segment removal and restored continuity" desc="Two local bowel schematics, before resection on left and after anastomosis on right; these are not a whole-body projection. Sigmoid/rectal tumour is removed and descending colon joined to the rectal stump. Mesenteric vessels are controlled; exact tie level and need for diversion vary." h={340}>
    <path d="M100 60V140Q100 175 170 186Q210 200 170 239L165 287" stroke={GRAFT} strokeWidth={24} fill="none"/>
    <path d="M100 143Q100 175 170 186Q210 200 170 239" stroke={ART} strokeWidth={26} fill="none" strokeDasharray="5 4"/>
    <circle cx={177} cy={202} r={10} fill={ART}/>
    <path d="M142 149L84 160M197 243L150 228" stroke={INK} strokeWidth={2}/>
    <path d="M360 60V185Q360 224 383 237V287" stroke={GRAFT} strokeWidth={24} fill="none"/>
    <Sutures x={367} y={239}/>
    <path d="M270 178H308M298 170L308 178L298 186" stroke={INK} strokeWidth={2} fill="none"/>
    <Label x={35} y={30}>Before: resection interval</Label><Label x={315} y={30}>After: colon to rectum</Label>
    <Label x={28} y={115}>Descending colon</Label><Label x={27} y={273}>Rectal stump</Label>
    <Label x={213} y={112}>Vessels tied</Label><Leader from={[207,118]} to={[145,155]}/>
    <Label x={405} y={247}>Join</Label><Leader from={[402,240]} to={[385,239]}/>
    <Label x={25} y={326}>Check perfusion and join integrity; diverting ileostomy when indicated</Label>
  </Shell>
);

const LaparotomyDiagram = () => (
  <Shell id="op-laparotomy" title="Emergency laparotomy: midline incision" desc="Abdomen with a long midline incision for access to all quadrants. Common sources are perforation, obstruction, ischaemia and bleeding. Damage control may leave the abdomen open.">
    <ellipse cx={260} cy={170} rx={150} ry={130} fill={FILL} stroke={INK} />
    <path d="M260 60 L260 280" stroke={ART} strokeWidth={4} />
    <path d="M110 170 L410 170" stroke={MUTED} strokeWidth={1} strokeDasharray="4 4" />
    <path d="M156 135Q172 108 187 131Q200 156 178 179M304 141Q328 115 348 137Q367 170 335 184M165 213Q223 181 231 219Q259 261 291 218" fill="none" stroke={GRAFT} strokeWidth={6}/><path d="M251 70L236 87V255L251 274M269 70L284 87V255L269 274" stroke={INK} fill="none"/>
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
    <path d="M258 184V281M320 184V281" fill="none" stroke={MUTED} strokeWidth={2}/><path d="M161 107A53 53 0 0 1 267 107" stroke={INK} strokeWidth={2} fill="none"/>
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
    <path d="M235 24V112Q225 135 242 137M285 24V112Q294 135 278 137M240 205V301M280 205V301" stroke={INK} strokeWidth={2} fill="none"/><path d="M293 195L309 300" stroke={MUTED} strokeWidth={4}/><path d="M214 139Q195 156 215 174" fill={FILL} stroke={INK}/>
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
    {[60,120,180,240].map(y=><g key={y} fill={FILL} stroke={INK}><path d={`M220 ${y+15}l-22 8 22 10M300 ${y+15}l22 8-22 10M250 ${y+42}l10 10 10-10`}/><path d={`M243 ${y+28}Q260 ${y+6}277 ${y+28}`} fill="none"/></g>)}
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
    <path d="M167 115Q177 93 192 117Q204 143 220 118M262 79Q282 102 300 86M286 190Q250 175 260 213M187 230Q222 245 230 222" stroke={MUTED} strokeWidth={2} fill="none"/>
    <Label x={310} y={45}>Bone flap</Label>
    <Label x={180} y={170}>Tumour</Label>
    <Label x={395} y={104}>Pin fixation</Label>
    <Label x={20} y={30}>Pinning: deepen anaesthesia / local to stop BP spike</Label>
    <Label x={395} y={250}>Keep CO2 normal,</Label>
    <Label x={395} y={266}>head up,</Label><Label x={395} y={282}>smooth wake-up</Label>
  </Shell>
);

const TurpDiagram = () => (
  <Shell id="op-turp" title="TURP and irrigation fluid absorption" desc="Resectoscope passed through the urethra into the prostate. Irrigation fluid flows in continuously; opened venous sinuses allow fluid absorption, which can cause fluid overload. Classic dilutional hyponatraemia relates to hypotonic non-electrolyte irrigation; bipolar saline irrigation does not cause classic hyponatraemic TURP syndrome. Spinal anaesthesia lets early confusion be noticed.">
    <ellipse cx={260} cy={90} rx={90} ry={60} fill={FILL} stroke={INK} />
    <ellipse cx={260} cy={170} rx={50} ry={34} fill={MUTED} opacity={0.6}><title>Prostate</title></ellipse>
    <path d="M260 140 L260 310" stroke={GRAFT} strokeWidth={10} strokeLinecap="round" />
    <path d="M240 200 C200 220, 180 240, 150 260" stroke={VEIN} strokeWidth={4} fill="none" strokeDasharray="6 4" />
    <path d="M177 92Q193 123 212 112M308 106Q334 123 344 91" stroke={MUTED} fill="none"/><path d="M244 159Q229 169 243 188M277 158Q293 170 277 188" stroke={ART} strokeWidth={2} fill="none"/><path d="M252 300V176L268 166" stroke={INK} strokeWidth={2} fill="none"/>
    <Label x={360} y={90}>Bladder</Label>
    <Label x={320} y={175}>Prostate resected</Label>
    <Label x={280} y={290}>Resectoscope (urethra)</Label>
    <Label x={30} y={280}>Fluid absorbed into veins</Label>
    <Label x={30} y={296}>→ overload; Na⁺ risk varies</Label>
    <Label x={20} y={30}>Spinal lets you spot early confusion</Label>
  </Shell>
);

const RoboticProstateDiagram = () => (
  <Shell id="op-robotic-prostate" title="Robotic prostatectomy: steep head-down and pneumoperitoneum" desc="Patient in steep head-down (Trendelenburg) position with carbon dioxide in the abdomen and robot docked. This raises airway, intracranial and intraocular pressures; access to the patient is limited once docked.">
    <path d="M70 90 L450 230" stroke={INK} strokeWidth={6} />
    <ellipse cx={280} cy={140} rx={110} ry={40} fill={FILL} stroke={INK} transform="rotate(20 280 140)" />
    <circle cx={90} cy={80} r={22} fill={MUTED} opacity={0.6}><title>Head</title></circle>
    {[240, 290, 340].map((x) => <path key={x} d={`M${x} 40 L${x - 10} 110`} stroke={GRAFT} strokeWidth={5} />)}
    <path d="M202 128Q231 120 252 141Q259 157 241 163Q210 156 202 128" fill={FILL} stroke={MUTED}/><path d="M230 164L224 190M240 167L245 195" stroke={ART} strokeWidth={2}/>
    <Label x={250} y={30}>Robot arms</Label>
    <Label x={40} y={130}>Head low (~25–45°)</Label>
    <Label x={300} y={240}>CO2 pneumoperitoneum</Label>
    <Label x={20} y={290}>Facial/airway swelling, high airway pressure, limited access</Label>
  </Shell>
);

const ThyroidDiagram = () => (
  <Shell id="op-thyroid" title="Thyroidectomy: lobes, posterior glands and nerves" desc="Anterior conceptual neck view, patient's right on viewer's left; posterior structures are shown through translucent lobes. The thyroid isthmus crosses the trachea. Recurrent laryngeal nerves ascend in the tracheo-oesophageal grooves; small parathyroids lie on variable posterior gland surfaces, not at fixed operative coordinates." h={350}>
    <path d="M245 55V305M280 55V305" stroke={INK} strokeWidth={2}/>
    {[90,108,126,144,162,180,198,216,234,252,270,288].map(y=><path key={y} d={`M245 ${y}q18 7 35 0`} fill="none" stroke={MUTED}/>) }
    <path d="M231 102Q184 85 174 153Q170 230 221 223L245 189H280L302 222Q350 224 349 154Q340 89 292 102L283 153H243Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M237 304Q231 238 233 172Q232 115 247 78M288 304Q296 234 293 172Q295 110 279 78" stroke={VEIN} strokeWidth={3} fill="none" strokeDasharray="5 3"/>
    {[[207,129],[218,204],[321,128],[308,204]].map(([x,y])=><ellipse key={x} cx={x} cy={y} rx={6} ry={9} fill={GRAFT} stroke={INK}/>)}
    <path d="M242 57L234 38Q263 24 289 38L281 57Z" fill={FILL} stroke={INK}/>
    <Label x={25} y={32}>Anterior view; posterior structures shown dashed</Label>
    <Label x={25} y={113}>Thyroid lobe</Label><Leader from={[115,115]} to={[187,145]}/>
    <Label x={365} y={139}>Parathyroid</Label><Leader from={[358,136]} to={[321,128]}/>
    <Label x={365} y={216}>Isthmus</Label><Leader from={[357,210]} to={[262,183]}/>
    <Label x={25} y={263}>Recurrent nerves</Label><Leader from={[145,260]} to={[235,252]}/>
    <Label x={345} y={291}>Tracheal rings</Label><Leader from={[337,286]} to={[278,279]}/>
    <Label x={25} y={335}>Postoperative haematoma: urgent airway and wound assessment</Label>
  </Shell>
);

const TonsilDiagram = () => (
  <Shell id="op-tonsil" title="Tonsillectomy: tonsillar beds and gag–tube relationship" desc="View into an open mouth, superior above. Tonsils lie between the palatal pillars either side of the tongue. One tonsillar bed is shown after removal with small haemostatic points. The south-facing oral tube lies in the midline under the tongue blade and continues out over the lower lip; its deeper tracheal course is outside this view. No side-specific operation implied." h={380}>
    <path d="M102 106Q120 44 260 44Q400 44 418 106L405 242Q382 300 260 303Q137 299 115 242Z" fill={FILL} stroke={INK} strokeWidth={3}/>
    <path d="M155 116Q181 93 207 126L205 202M313 126Q340 92 366 116L364 202" fill="none" stroke={MUTED} strokeWidth={5}/>
    <path d="M160 130Q139 172 168 208Q191 208 197 169Q195 135 178 128Z" fill={ART} fillOpacity={0.5} stroke={INK}/>
    <path d="M326 132Q313 171 331 207Q356 197 357 165L347 133Z" fill={FILL} stroke={ART} strokeWidth={2}/>
    <path d="M334 146l6 5M327 175l7 4M337 195l6-3" stroke={ART} strokeWidth={3}/>
    <path d="M235 89Q260 78 285 89L271 117Q260 127 249 117Z" fill={FILL} stroke={INK}/>
    <path d="M190 223Q209 175 260 184Q311 175 330 223Q326 269 260 280Q194 269 190 223Z" fill={FILL} stroke={MUTED} strokeWidth={2}/>
    <path d="M260 219V325" stroke={GRAFT} strokeWidth={12}/>
    <rect x={228} y={225} width={64} height={48} rx={5} fill={MUTED} stroke={INK}/>
    <path d="M119 83L94 109V285H426V109L401 83" fill="none" stroke={INK} strokeWidth={5}/>
    <Label x={25} y={27}>Open-mouth view</Label><Label x={307} y={30}>Gag frame</Label><Leader from={[368,36]} to={[414,97]}/>
    <Label x={25} y={153}>Tonsil</Label><Leader from={[72,150]} to={[157,161]}/>
    <Label x={384} y={155}>Tonsillar bed</Label><Leader from={[377,151]} to={[348,166]}/>
    <Label x={25} y={237}>Tongue blade</Label><Leader from={[121,231]} to={[235,243]}/>
    <Label x={321} y={329}>Tube under blade</Label><Leader from={[314,323]} to={[260,307]}/>
    <Label x={25} y={365}>Recheck tube after gag placement; suction and haemostasis before recovery</Label>
  </Shell>
);

const TevarDiagram = () => (
  <Shell id="op-tevar" title="TEVAR: arch branches, seal zones and covered segment" desc="Conceptual arch profile, ascending aorta on viewer's left and descending on viewer's right, not a full anterior anatomical plate. Three arch branches remain proximal to the illustrated graft. The covered graft seals in non-aneurysmal aorta above and below a descending aneurysm. Femoral delivery is indicated as a continuation beyond the field. Branch coverage and spinal protection depend on the individual plan." h={390}>
    <path d="M116 165V119C125 42 267 39 305 110V140" stroke={ART} strokeWidth={28} fill="none"/>
    <path d="M156 79L146 27M207 63V20M258 78L277 26" stroke={ART} strokeWidth={10}/>
    <path d="M291 132C253 172 261 257 291 288V345M319 132C365 175 362 258 319 288V345" fill={FILL} stroke={ART} strokeWidth={3}/>
    <path d="M305 122V315" stroke={GRAFT} strokeWidth={23}/>
    {Array.from({length:12},(_,i)=><path key={i} d={`M295 ${133+i*15}l5 6 5-6 5 6 5-6`} fill="none" stroke={INK} strokeWidth={1}/>)}
    <path d="M319 183L353 185M319 225L355 228M319 268L351 270" stroke={ART} strokeWidth={2}/>
    <path d="M305 370V282" stroke={VEIN} strokeWidth={3}/><Flow x={305} y={350} direction="up"/>
    <Label x={22} y={24}>Brachiocephalic</Label><Leader from={[126,29]} to={[149,40]}/>
    <Label x={174} y={14}>L carotid</Label><Label x={290} y={30}>L subclavian</Label><Leader from={[287,34]} to={[270,45]}/>
    <Label x={25} y={182}>Ascending aorta</Label><Leader from={[139,184]} to={[116,150]}/>
    <Label x={367} y={128}>Proximal seal</Label><Leader from={[360,126]} to={[317,133]}/>
    <Label x={365} y={207}>Excluded sac</Label><Leader from={[358,204]} to={[349,209]}/>
    <Label x={25} y={248}>Covered segmental origins</Label><Leader from={[197,240]} to={[325,226]}/>
    <Label x={365} y={306}>Distal seal</Label><Leader from={[358,302]} to={[317,306]}/>
    <Label x={25} y={345}>Delivery from femoral access</Label><Leader from={[205,341]} to={[301,350]}/>
    <Label x={25} y={380}>Confirm branch patency and seal; maintain spinal cord perfusion</Label>
  </Shell>
);

const SleeveDiagram = () => (
  <Shell id="op-sleeve" title="Sleeve gastrectomy: bougie and staple line" desc="Stomach outline with a bougie along the lesser curve. Staples divide the stomach alongside the bougie; the greater curve portion is removed, leaving a narrow tube.">
    <path d="M220 30 L220 80 C120 90, 110 230, 200 270 C280 300, 380 260, 360 200 C340 150, 280 120, 250 85" fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M225 40 C230 120, 240 200, 300 255" stroke={VEIN} strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M245 75 C250 140, 265 200, 320 245" stroke={ART} strokeWidth={3} fill="none" strokeDasharray="7 4" />
    <path d="M126 168Q160 180 175 217M149 107Q173 134 189 149M177 258Q205 257 223 270" stroke={MUTED} fill="none"/><Sutures x={267} y={187} vertical count={7}/>
    <Label x={30} y={40}>Bougie (blue) passed by anaesthetist</Label>
    <Label x={300} y={110}>Staple line</Label>
    <Label x={340} y={290}>Greater curve removed</Label>
    <Label x={30} y={300}>Remove NG tube / probes before stapling</Label>
  </Shell>
);

const LiverDiagram = () => (
  <Shell id="op-liver" title="Liver resection: inflow control versus venous back-bleeding" desc="Anterior conceptual view, patient's right on viewer's left. The larger right liver lies on viewer's left. At the hilum a Pringle tape surrounds the hepatoduodenal ligament containing portal vein, hepatic artery and bile duct. Hepatic veins drain separately to the posterior IVC; Pringle occlusion does not stop this back-bleeding." h={350}>
    <path d="M70 108Q87 56 240 66Q355 38 445 87Q455 128 389 158L285 180L217 209Q115 234 74 178Q54 145 70 108Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M270 67Q260 116 239 196" stroke={ART} strokeWidth={3} strokeDasharray="6 4" fill="none"/>
    <path d="M264 32V101M160 115L263 90M354 100L263 90" stroke={VEIN} strokeWidth={10} fill="none"/>
    <path d="M254 292V185M237 290V187M274 187V292" stroke={VEIN} strokeWidth={8}/>
    <path d="M236 287V186" stroke={ART} strokeWidth={4}/>
    <path d="M275 187V292" stroke={GRAFT} strokeWidth={4}/>
    <ellipse cx={254} cy={221} rx={37} ry={13} fill="none" stroke={INK} strokeWidth={3}/>
    <path d="M218 221L190 253M289 221L305 252" stroke={INK} strokeWidth={2}/>
    <Label x={28} y={30}>Anterior: patient R ← → patient L</Label>
    <Label x={315} y={48}>IVC / hepatic veins</Label><Leader from={[309,52]} to={[269,79]}/>
    <Label x={325} y={184}>Transection</Label><Leader from={[318,179]} to={[245,157]}/>
    <Label x={310} y={247}>Pringle tape at hilum</Label><Leader from={[303,239]} to={[282,222]}/>
    <Label x={25} y={285}>Portal triad</Label><Leader from={[108,280]} to={[240,259]}/>
    <Label x={25} y={335}>Inflow occlusion does not control hepatic venous back-bleeding</Label>
  </Shell>
);

const CystectomyDiagram = () => (
  <Shell id="op-cystectomy" title="Radical cystectomy with ileal conduit" desc="After the bladder is removed, both ureters are joined to an isolated segment of ileum, which is brought out to the skin as a urinary stoma. Urine output cannot be measured between ureteric division and conduit formation.">
    <ellipse cx={170} cy={80} rx={30} ry={45} fill={FILL} stroke={INK} /><ellipse cx={350} cy={80} rx={30} ry={45} fill={FILL} stroke={INK} />
    <path d="M175 125 C200 190, 230 200, 250 210 M345 125 C320 190, 290 200, 270 210" stroke={GRAFT} strokeWidth={5} fill="none" />
    <rect x={230} y={200} width={160} height={28} rx={14} fill={ART} opacity={0.5} />
    <circle cx={400} cy={214} r={12} fill={INK} />
    <ellipse cx={260} cy={290} rx={40} ry={22} fill="none" stroke={MUTED} strokeDasharray="6 4" />
    <path d="M148 58Q154 89 171 99M365 58Q360 89 348 99" stroke={MUTED} fill="none"/><Sutures x={242} y={207} count={4}/><Sutures x={261} y={207} count={4}/><Flow x={341} y={214} direction="right"/>
    <Label x={110} y={20}>Kidney</Label><Label x={380} y={20}>Kidney</Label>
    <Label x={40} y={170}>Ureters</Label>
    <Label x={240} y={250}>Ileal conduit</Label>
    <Label x={420} y={218}>Stoma</Label>
    <Label x={310} y={295}>Bladder removed</Label>
  </Shell>
);

const FreeFlapDiagram = () => (
  <Shell id="op-free-flap" title="Head and neck free flap" desc="Tissue from the forearm or thigh, with its own artery and vein, is moved to the neck defect and joined to neck vessels under the microscope. A tracheostomy often protects the airway. Flap perfusion depends on adequate circulation, temperature and avoidance of compression; judicious vasopressors may be appropriate.">
    <path d="M200 30 C120 40, 110 180, 190 230 L190 310 M330 30 C410 40, 410 180, 330 230 L330 310" stroke={INK} strokeWidth={2} fill="none" />
    <ellipse cx={240} cy={140} rx={45} ry={30} fill={GRAFT} opacity={0.7} />
    <path d="M280 145 C320 160, 330 200, 335 240" stroke={ART} strokeWidth={4} fill="none" />
    <path d="M275 155 C305 175, 315 210, 318 250" stroke={VEIN} strokeWidth={4} fill="none" />
    <rect x={245} y={250} width={30} height={14} rx={4} fill={INK} />
    <path d="M205 126Q224 118 244 129M214 150Q246 139 271 151" stroke={MUTED} fill="none"/><Sutures x={324} y={228} count={3}/><Sutures x={309} y={242} count={3}/>
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
    <path d="M308 170Q322 144 348 166L344 185Q330 198 315 183Z" fill={FILL} stroke={INK}/><path d="M319 167l-20-13M340 166l20-6" stroke={GRAFT} strokeWidth={3}/>
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
    <path d="M163 212Q204 201 255 210Q316 201 354 220" fill="none" stroke={INK} strokeDasharray="3 3"/><Sutures x={195} y={120} count={5}/><path d="M211 231L226 191M224 230L235 190" stroke={ART} strokeWidth={2}/>
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
    <path d="M288 64Q350 95 350 166Q350 239 287 267" stroke={ART} strokeWidth={2} fill="none"/><path d="M155 128L173 130M154 204L173 202" stroke={INK} strokeWidth={3}/><path d="M146 122L174 149" stroke={GRAFT} strokeWidth={3}/>
    <Label x={30} y={80}>Cornea</Label>
    <Label x={60} y={260}>Lens replaced</Label>
    <Label x={380} y={150}>Optic nerve</Label>
    <Label x={330} y={300}>Needle block route (risk)</Label>
    <Label x={20} y={20}>Topical / sub-Tenon's preferred: no sharp needle</Label>
  </Shell>
);

export function OperativeDiagram({ kind }: { kind: OperativeDiagramKey }) {
  switch (kind) {
    case "laryngectomy": return <LaryngectomyDiagram />;
    case "glossectomy": return <GlossectomyDiagram />;
    case "microlaryngoscopy": return <MicrolaryngoscopyDiagram />;
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
    case "liver-transplant": return <LiverTransplantDiagram />;
    case "adrenalectomy": return <AdrenalectomyDiagram />;
    case "fess": return <FessDiagram />;
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
    <path d="M214 107l32 14M214 135l32 14M214 163l32 14M214 121l32-14M214 149l32-14M214 177l32-14" fill="none" stroke={GRAFT}/><path d="M215 80L230 94L245 80" stroke={INK} strokeWidth={1} fill="none"/><Flow x={230} y={49} direction="up"/>
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
    <path d="M226 81Q216 119 226 171L234 171Q243 120 234 81Z" fill={FILL} stroke={GRAFT}/><Sutures x={228} y={82} vertical count={13}/><Flow x={230} y={215}/>
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
    <path d="M68 87Q83 108 91 120M68 155Q85 140 92 135" stroke={MUTED} fill="none"/><Sutures x={188} y={119} count={3}/><Sutures x={212} y={146} count={3}/><Sutures x={231} y={259} count={3}/>
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
    <path d="M44 87H208M307 87H476M46 131H210M307 131H474" stroke={MUTED} strokeWidth={4}/><rect x={170} y={236} width={180} height={30} fill="url(#op-inguinal-hernia-mesh)" stroke={GRAFT}/>
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
    <path d="M177 79Q239 94 303 79M178 115Q244 132 304 115M178 152Q242 172 303 152" stroke={MUTED} fill="none"/><path d="M182 189Q221 230 257 218" stroke={MUTED} fill="none"/><Sutures x={260} y={204} count={3}/>
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
    <path d="M149 145Q174 112 190 138M150 159Q178 139 190 159M190 185H250" fill="none" stroke={MUTED} strokeWidth={2}/><path d="M250 103V85Q279 61 298 84" fill="none" stroke={INK} strokeWidth={2}/>
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
    <path d="M251 139Q295 132 331 139M251 182Q295 189 332 182" fill="none" stroke={INK} strokeWidth={2}/><path d="M258 157Q289 145 323 157L323 165Q285 177 258 165Z" fill={FILL} stroke={MUTED}/>
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
    <path d="M186 90Q174 119 199 131M238 65Q257 93 280 72M296 199Q269 176 255 205M203 236Q225 209 239 237" fill="none" stroke={MUTED} strokeWidth={2}/><path d="M258 58V272" stroke={MUTED} strokeDasharray="4 5"/>
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
    <path d="M156 112Q168 106 190 115L200 136Q179 145 161 131Z" fill={FILL} stroke={MUTED}/><path d="M151 205L270 205V285" stroke={MUTED} strokeWidth={5} fill="none"/>
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
    {[150,175,200,225,250,275,300,325,350].map(x=><rect key={x} x={x-8} y={150} width={16} height={18} rx={3} fill={FILL} stroke={INK}/>)}{[294,307,320].map(x=><circle key={x} cx={x} cy={246-(x-294)/2} r={2} fill={INK}/>)}
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
    <path d="M118 207Q213 251 389 212" stroke={MUTED} strokeWidth={12} fill="none"/><path d="M303 97l-9-15 2-17q12-16 20 0l1 17-9 15Z" fill={FILL} stroke={INK}/><path d="M281 202q15-10 30 0" stroke={ART} strokeWidth={2} fill="none"/>
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
    <path d="M78 136H247M78 182H247M276 136Q298 158 280 185" fill="none" stroke={MUTED} strokeWidth={2}/><Sutures x={248} y={124} vertical count={11}/>
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
    <path d="M59 80H206M300 80H461" stroke={MUTED} strokeWidth={3}/><ellipse cx={259} cy={238} rx={24} ry={28} fill={FILL} stroke={INK}/><path d="M285 160Q320 201 284 240" stroke={VEIN} strokeWidth={2} fill="none"/>
    <Label x={25} y={55}>Abdominal cavity</Label><Label x={315} y={120}>Close sac neck</Label>
    <Label x={325} y={210}>Patent processus</Label><Label x={325} y={228}>vaginalis / hernia sac</Label>
    <Label x={25} y={310}>Reduce contents → close communication; usually no mesh</Label>
  </Shell>
);

const MitralDiagram = () => (
  <Shell id="op-mitral" title="Mitral repair: annulus, leaflets and subvalvular apparatus" desc="Local longitudinal left-heart cutaway, atrium above ventricle; not a whole-heart laterality projection. An annuloplasty ring surrounds the annulus, native leaflets connect by chordae to papillary muscles. A dashed atrial access line indicates surgical exposure. This illustrates repair rather than a replacement prosthesis; individual repair techniques vary." h={390}>
    <path d="M151 62Q104 99 145 153L145 182Q94 298 235 338Q376 298 325 182V153Q368 99 318 62Z" fill={FILL} stroke={INK} strokeWidth={3}/>
    <path d="M158 190Q135 278 235 314Q335 275 311 190" stroke={MUTED} strokeWidth={8} fill="none" opacity={0.4}/>
    <path d="M137 98Q178 110 194 141" stroke={ART} strokeWidth={2} strokeDasharray="5 4" fill="none"/>
    <path d="M123 91L94 78M146 137L114 155" stroke={INK} strokeWidth={2}/>
    <ellipse cx={235} cy={163} rx={88} ry={15} fill="none" stroke={GRAFT} strokeWidth={5}/>
    <path d="M157 164Q199 169 231 205M313 164Q277 180 243 205" stroke={INK} strokeWidth={4} fill="none"/>
    <path d="M200 184L180 271M222 198L184 266M266 194L286 267M288 182L291 271" stroke={MUTED} strokeWidth={1.5}/>
    <path d="M166 282L180 254Q188 250 199 282M270 283L286 253Q296 254 305 283" fill={FILL} stroke={INK} strokeWidth={2}/>
    {[166,188,211,235,259,282,304].map(x=><Sutures key={x} x={x} y={162} count={1}/>)}
    <Flow x={235} y={112}/>
    <Label x={190} y={78}>Left atrium</Label><Label x={198} y={299}>Left ventricle</Label>
    <Label x={25} y={40}>Atrial access</Label><Leader from={[108,43]} to={[148,109]}/>
    <Label x={350} y={137}>Annuloplasty ring</Label><Leader from={[342,140]} to={[318,163]}/>
    <Label x={351} y={206}>Native leaflets</Label><Leader from={[344,201]} to={[278,182]}/>
    <Label x={25} y={232}>Chordae</Label><Leader from={[84,231]} to={[192,240]}/>
    <Label x={350} y={280}>Papillary muscle</Label><Leader from={[344,275]} to={[292,267]}/>
    <Label x={25} y={376}>De-air; TOE checks residual regurgitation, gradient and LV outflow</Label>
  </Shell>
);

const PneumonectomyDiagram = () => (
  <Shell id="op-pneumonectomy" title="Pneumonectomy: whole-lung resection" desc="Anterior conceptual chest view: patient's right is viewer's left. The left lung, on viewer's right, is shown dashed for removal. The main bronchus and pulmonary vessels are divided. Only the remaining right lung is ventilated during left-sided resection. This is not a hilar dissection map.">
    <path d="M190 55 Q90 70 90 245 Q155 270 220 225 L220 100 Z" fill={FILL} stroke={INK} strokeWidth={3} />
    <path d="M330 55 Q425 70 425 245 Q360 270 300 225 L300 100 Z" fill={FILL} stroke={GRAFT} strokeWidth={3} strokeDasharray="8 5" />
    <path d="M260 25 L260 105 L190 145 M260 105 L330 145" stroke={INK} strokeWidth={9} fill="none" />
    <path d="M295 125 L320 145 M295 170 L320 175" stroke={ART} strokeWidth={5} />
    <path d="M109 160Q160 150 218 188M149 218L185 168M323 165Q370 143 416 160" fill="none" stroke={MUTED} strokeWidth={2}/><path d="M294 180L329 186" stroke={VEIN} strokeWidth={4}/><Sutures x={300} y={137} count={3}/>
    <Label x={25} y={35}>Patient R / remaining lung</Label><Label x={300} y={285}>Patient L / removed</Label>
    <Label x={35} y={285}>Lung isolation</Label><Label x={25} y={310}>Protect remaining lung; avoid fluid overload; check stump</Label>
  </Shell>
);

const GastricBypassDiagram = () => (
  <Shell id="op-gastric-bypass" title="Roux-en-Y gastric bypass: separate food and secretion routes" desc="Conceptual digestive-flow diagram, no body laterality claim. A small gastric pouch joins the Roux alimentary limb. The excluded stomach drains via pylorus and duodenum into the biliopancreatic limb, carrying gastric, biliary and pancreatic secretions. Bile enters from the bile duct in the duodenum, not from the stomach. Both limbs join at the jejunojejunostomy." h={370}>
    <path d="M130 25V58" stroke={INK} strokeWidth={10}/>
    <path d="M108 58Q95 90 135 99L152 82V58Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M180 70Q255 50 290 104Q317 171 252 180L212 156Q160 160 180 70Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M242 178Q320 220 292 235H252V300" stroke={VEIN} strokeWidth={12} fill="none"/>
    <path d="M130 100V265Q130 299 252 300V335" stroke={GRAFT} strokeWidth={12} fill="none"/>
    <path d="M350 167L305 210M370 200L305 220" stroke={GRAFT} strokeWidth={4}/>
    <Sutures x={116} y={106}/><Sutures x={238} y={300}/>
    <Flow x={130} y={205}/><Flow x={252} y={270}/><Flow x={252} y={331}/>
    <Label x={22} y={49}>Gastric pouch</Label><Label x={305} y={84}>Excluded stomach</Label>
    <Label x={25} y={180}>Food / Roux limb</Label><Label x={350} y={163}>Bile duct</Label><Label x={374} y={204}>Pancreas</Label>
    <Label x={330} y={246}>Duodenum</Label><Leader from={[320,241]} to={[295,226]}/>
    <Label x={282} y={278}>Biliopancreatic limb</Label><Leader from={[280,274]} to={[258,268]}/>
    <Label x={300} y={320}>Bowel-to-bowel join</Label><Leader from={[293,315]} to={[258,300]}/>
    <Label x={25} y={358}>Common channel below the join; both anastomoses need assessment</Label>
  </Shell>
);

const VitrectomyDiagram = () => (
  <Shell id="op-vitrectomy" title="Vitrectomy: retinal repair and tamponade" desc="Local sagittal eye section, anterior on viewer's left. Instruments enter through scleral ports to remove vitreous and treat the retina. Gas or silicone oil may be placed for tamponade; gas bubbles expand with nitrous oxide and reduced ambient pressure.">
    <path d="M140 120 Q190 35 305 75 Q425 160 305 245 Q190 280 140 200 Q100 160 140 120 Z" fill={FILL} stroke={INK} strokeWidth={3} />
    <ellipse cx={155} cy={160} rx={15} ry={30} fill="none" stroke={INK} strokeWidth={2} />
    <path d="M290 90 Q395 160 290 230" stroke={ART} strokeWidth={4} fill="none" />
    <path d="M230 30 L250 150 M220 285 L250 180" stroke={GRAFT} strokeWidth={4} />
    <ellipse cx={270} cy={135} rx={40} ry={30} fill="none" stroke={VEIN} strokeWidth={3} strokeDasharray="5 4" />
    <path d="M175 102Q223 74 276 88M175 218Q228 249 276 232" stroke={MUTED} fill="none"/><path d="M215 83L238 83M213 238L236 238" stroke={INK} strokeWidth={4}/>
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
    <path d="M211 81L233 94L215 112M211 206L233 219L215 239" stroke={INK} strokeWidth={3} fill="none"/><path d="M277 78V140M272 190L294 207" stroke={MUTED} strokeWidth={2}/>
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
    <path d="M147 90Q145 174 230 226M373 91Q379 176 289 226" fill="none" stroke={MUTED} strokeWidth={6}/><path d="M184 78L195 91M214 70L224 82M249 66L252 81M279 66L278 83M312 73L302 87" stroke={INK} strokeWidth={1}/>
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
    {[150,178,206,234,286,314,342,370].map(x=><rect key={x} x={x-8} y={82} width={16} height={16} rx={4} fill={FILL} stroke={INK}/>)}<path d="M146 150Q180 107 225 134M293 134Q347 112 374 151" stroke={MUTED} fill="none"/>
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
    <ellipse cx={235} cy={222} rx={18} ry={10} fill="none" stroke={VEIN} strokeWidth={2}/><rect x={276} y={177} width={8} height={35} rx={3} fill={FILL} stroke={INK}/>
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
    <path d="M136 99Q98 119 114 142M96 191Q116 217 149 221" stroke={MUTED} fill="none"/><path d="M139 247L142 289" stroke={GRAFT} strokeWidth={3}/>
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
    <path d="M163 101Q175 89 187 109M195 93Q215 100 210 126M218 96Q236 114 233 134" stroke={INK} strokeWidth={1} fill="none"/><path d="M142 187L153 187L157 199M150 219Q175 235 183 214" stroke={MUTED} strokeWidth={2} fill="none"/>
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
    {[50,90,130,170,210,250,285].map((y,i)=><g key={y} stroke={INK} fill={FILL}><rect x={315} y={y} width={30} height={18} rx={4}/><path d={`M315 ${y+6}l-10 4 10 4M345 ${y+6}l10 4-10 4`}/></g>)}
    <Label x={60} y={170}>Curved spine</Label><Label x={350} y={100}>Pedicle screws</Label>
    <Label x={350} y={200}>Rod: corrected spine</Label><Label x={25} y={20}>Evoked potential monitoring</Label>
    <Label x={25} y={318}>Correction: keep BP and Hb up; TIVA; big blood loss</Label>
  </Shell>
);

const LiverTransplantDiagram = () => (
  <Shell id="op-liver-transplant" title="Liver transplant: three phases and reperfusion" desc="Anterior conceptual view. The donor liver is joined to the inferior vena cava, portal vein and hepatic artery, then the bile duct. Removing the clamps lets cold, potassium-rich blood from the graft reach the heart: post-reperfusion syndrome.">
    <path d="M90 90 Q150 50 260 70 Q300 90 280 150 Q200 200 100 170 Q60 140 90 90 Z" fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M200 45 L200 300" stroke={VEIN} strokeWidth={12} opacity={0.8} />
    <path d="M160 300 L160 175" stroke={VEIN} strokeWidth={6} />
    <path d="M230 300 L230 165" stroke={ART} strokeWidth={4} />
    <path d="M130 175 Q120 230 100 260" stroke={GRAFT} strokeWidth={4} fill="none" />
    <path d="M165 300V192L185 138M230 280V165L253 132" stroke={INK} strokeWidth={1} fill="none"/><Sutures x={186} y={93} count={4}/><Sutures x={146} y={180} count={4}/><Sutures x={217} y={172} count={4}/>
    <Label x={300} y={60}>Inferior vena cava</Label><Label x={300} y={110}>Donor liver</Label>
    <Label x={250} y={260}>Hepatic artery</Label><Label x={20} y={290}>Bile duct</Label><Label x={110} y={315}>Portal vein</Label>
    <Label x={300} y={160}>Reperfusion: low BP, high K⁺</Label>
    <Label x={25} y={30}>Dissection → anhepatic → neohepatic</Label>
  </Shell>
);

const AdrenalectomyDiagram = () => (
  <Shell id="op-adrenalectomy" title="Adrenalectomy for phaeochromocytoma" desc="Conceptual view of the kidney with the adrenal tumour on top. Handling the tumour releases catecholamines and causes hypertension. Once the adrenal vein is tied the catecholamine supply stops and blood pressure can fall.">
    <ellipse cx={200} cy={210} rx={55} ry={80} fill={FILL} stroke={INK} strokeWidth={2} />
    <path d="M160 130 Q200 70 240 130 Z" fill={ART} opacity={0.4} stroke={INK} />
    <path d="M240 115 L340 115" stroke={VEIN} strokeWidth={5} />
    <path d="M300 105 L300 125" stroke={INK} strokeWidth={4} />
    <path d="M345 30 L345 275" stroke={VEIN} strokeWidth={12} opacity={0.8} />
    <path d="M175 170Q195 190 213 179M175 231Q197 210 213 225" stroke={MUTED} fill="none"/><path d="M166 127Q193 109 228 125" stroke={INK} strokeWidth={1.5} fill="none"/>
    <Label x={30} y={80}>Phaeochromocytoma</Label><Label x={60} y={260}>Kidney</Label>
    <Label x={262} y={145}>Adrenal vein tied</Label><Label x={360} y={200}>IVC</Label>
    <Label x={25} y={300}>Handling: BP surges · vein tied: BP and glucose fall</Label>
  </Shell>
);

const FessDiagram = () => (
  <Shell id="op-fess" title="Endoscopic sinus surgery: a dry field near orbit and skull base" desc="Coronal conceptual view of the nose and sinuses. The endoscope enters through the nostril into the ethmoid sinuses, which lie between the orbits and just below the skull base. Even small bleeding obscures the view.">
    <path d="M60 60 L400 60" stroke={INK} strokeWidth={4} />
    <circle cx={110} cy={130} r={45} fill={FILL} stroke={INK} strokeWidth={2} />
    <circle cx={350} cy={130} r={45} fill={FILL} stroke={INK} strokeWidth={2} />
    <rect x={180} y={80} width={100} height={110} fill={MUTED} opacity={0.35} stroke={INK} />
    <path d="M230 80 L230 290" stroke={INK} strokeWidth={2} />
    <path d="M200 300 L210 120" stroke={GRAFT} strokeWidth={5} />
    {[[194,99],[210,129],[256,102],[260,154],[196,166]].map(([x,y])=><ellipse key={x+y} cx={x} cy={y} rx={10} ry={14} fill={FILL} stroke={INK}/>)}<path d="M180 87V189M280 87V189" stroke={ART} strokeDasharray="3 3"/><path d="M302 130Q350 167 385 131M75 130Q114 167 151 131" stroke={MUTED} fill="none"/>
    <Label x={140} y={45}>Skull base (CSF leak risk)</Label><Label x={40} y={200}>Orbit</Label>
    <Label x={290} y={210}>Ethmoid sinuses</Label><Label x={60} y={260}>Endoscope via nostril</Label>
    <Label x={25} y={318}>TIVA, head-up, controlled BP for a clear view</Label>
  </Shell>
);

/* ENT procedural schematics, not scaled anatomical plates or laterality maps.
 * Laryngectomy: local sagittal flow view; anterior/stoma on viewer's left.
 * Glossectomy: view into mouth; no right/left resection implied.
 * Microlaryngoscopy: local longitudinal access view, mouth above trachea. */
const LaryngectomyDiagram = () => (
  <Shell id="op-laryngectomy" title="Total laryngectomy: swallowing and breathing are separate" desc="Local sagittal postoperative neck cutaway, anterior on viewer's left. The reconstructed pharynx leads to oesophagus posteriorly. The trachea curves to a permanent anterior skin stoma with no upper-airway continuity; cartilage rings are shown. No partial laryngectomy anatomy is implied." h={370}>
    <path d="M145 75Q190 88 186 128L165 160L172 285M343 68Q371 154 350 290" stroke={MUTED} strokeWidth={2} fill="none"/>
    <path d="M293 60Q318 80 311 133L298 285" stroke={GRAFT} strokeWidth={30} fill="none"/>
    <path d="M168 175H215Q248 175 248 210V288" stroke={VEIN} strokeWidth={30} fill="none"/>
    <ellipse cx={168} cy={175} rx={6} ry={18} fill={FILL} stroke={INK} strokeWidth={2}/>
    {[220,238,256,274].map(y=><path key={y} d={`M232 ${y}q16 6 32 0`} stroke={INK} strokeWidth={2} fill="none"/>)}
    <Sutures x={289} y={82} vertical count={6}/>
    <Label x={25} y={30}>Anterior ← sagittal cutaway → posterior</Label>
    <Label x={360} y={96}>Pharyngeal closure</Label><Leader from={[352,98]} to={[312,105]}/>
    <Label x={360} y={251}>Oesophagus</Label><Leader from={[350,247]} to={[300,253]}/>
    <Label x={25} y={149}>End stoma</Label><Leader from={[103,153]} to={[168,175]}/>
    <Label x={25} y={230}>Skin opening</Label><Leader from={[112,224]} to={[173,187]}/>
    <Label x={204} y={320}>Trachea → lungs</Label><Flow x={248} y={292}/>
    <Label x={25} y={350}>Oxygen and ventilation through the stoma only after total laryngectomy</Label>
  </Shell>
);

const GlossectomyDiagram = () => (
  <Shell id="op-glossectomy" title="Glossectomy: tongue resection and reconstructive flap" desc="Local view into the mouth, no patient-side resection inferred. Teeth, palate and tongue are represented. A dashed partial tongue defect is an example, not an oncological margin or a total glossectomy. Stippled flap tissue occupies a possible reconstruction site; extent and airway strategy vary." h={360}>
    <path d="M100 110Q260 42 420 110L410 218Q260 304 110 218Z" fill={FILL} stroke={INK} strokeWidth={3}/>
    <path d="M121 109Q260 75 399 109M130 218Q260 274 391 218" fill="none" stroke={MUTED} strokeWidth={9}/>
    {[150,178,206,234,262,290,318,346,374].map(x=><g key={x} fill={FILL} stroke={INK}><rect x={x-9} y={103} width={18} height={15} rx={4}/><rect x={x-9} y={226} width={18} height={14} rx={4}/></g>)}
    <path d="M170 170Q188 128 258 141Q337 134 350 173L338 216Q260 262 181 216Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M260 150Q299 135 348 172L336 216Q300 236 260 234Z" fill="url(#op-glossectomy-mesh)" stroke={ART} strokeWidth={2} strokeDasharray="5 4"/>
    <path d="M250 169Q255 189 250 221" stroke={MUTED} strokeWidth={1.5} fill="none"/>
    <Sutures x={260} y={162} vertical count={9}/>
    <Label x={25} y={30}>Open-mouth view: extent varies</Label>
    <Label x={25} y={156}>Tongue</Label><Leader from={[82,159]} to={[178,188]}/>
    <Label x={300} y={65}>Example resection</Label><Leader from={[321,72]} to={[325,157]}/>
    <Label x={305} y={295}>Flap if required</Label><Leader from={[300,286]} to={[296,219]}/>
    <Label x={25} y={341}>Plan postoperative airway for oedema, bleeding and flap bulk</Label>
  </Shell>
);

const MicrolaryngoscopyDiagram = () => (
  <Shell id="op-microlaryngoscopy" title="Microlaryngoscopy: access and ventilation share one space" desc="Local access schematic. A rigid suspension laryngoscope exposes the vocal folds. A small tracheal tube is one ventilation option; specialist tubeless or jet techniques are alternatives, not additions shown here. Jet ventilation requires an unobstructed expiratory route; laser use requires a separate airway-fire plan." h={340}>
    <path d="M155 65 L155 155 L205 175 M345 65 L345 155 L295 175" stroke={INK} strokeWidth={6} fill="none" />
    <path d="M205 180 L225 230 L225 290 M295 180 L275 230 L275 290" stroke={INK} strokeWidth={3} fill="none" />
    <path d="M230 35 L240 265" stroke={VEIN} strokeWidth={10} />
    <path d="M205 180 L235 193 M295 180 L265 193" stroke={GRAFT} strokeWidth={6} />
    {[236,252,268,284].map(y=><path key={y} d={`M225 ${y}q25 7 50 0`} stroke={MUTED} fill="none"/>)}<path d="M163 72V146M337 72V146" stroke={MUTED} strokeWidth={2}/><ellipse cx={242} cy={246} rx={11} ry={7} fill="none" stroke={VEIN} strokeWidth={2}/>
    <Label x={25} y={25}>Suspension laryngoscope</Label>
    <Label x={280} y={60}>Small tube shown</Label><Label x={320} y={195}>Vocal folds</Label>
    <Label x={25} y={245}>Shared field</Label><Label x={295} y={285}>Trachea</Label>
    <Label x={25} y={325}>Jet: free expiration · laser: tube / oxygen / ignition plan</Label>
  </Shell>
);
