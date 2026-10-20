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
  <Shell id="op-carotid" title="Carotid endarterectomy: open bulb, plaque and intraluminal shunt" desc="Local longitudinal bifurcation cutaway, brain above and proximal common carotid below; no patient side implied. Eccentric plaque occupies the bulb alongside an opened arteriotomy. Both ends of the curved temporary shunt lie in common and internal carotid lumens inside the isolated segment. This is the clamped open phase; patch closure follows and is not shown simultaneously." h={390}>
    <path d="M214 335V204Q216 139 176 42" stroke={ART} strokeWidth={30} fill="none"/>
    <path d="M213 204L310 53M287 89L349 102M300 69L329 34" stroke={ART} strokeWidth={15} fill="none"/>
    <path d="M214 302V204Q210 153 189 110" stroke={FILL} strokeWidth={19} fill="none"/>
    <path d="M205 214Q180 174 184 137Q195 143 198 169L213 213Z" fill={MUTED} stroke={INK} strokeWidth={1.5}/>
    <path d="M202 277V213Q194 164 182 125M226 277V209Q224 171 197 117" fill="none" stroke={INK} strokeWidth={1.5}/>
    <path d="M214 303V275C261 237 252 182 187 118L182 99" stroke={GRAFT} strokeWidth={7} fill="none" strokeLinecap="round"/>
    <ellipse cx={214} cy={290} rx={8} ry={5} fill="none" stroke={INK}/><ellipse cx={185} cy={110} rx={7} ry={5} fill="none" stroke={INK}/>
    <Clamp x={214} y={326}/><Clamp x={178} y={71}/><Clamp x={282} y={95} w={27}/>
    <Label x={25} y={26}>Internal carotid</Label><Leader from={[145,29]} to={[176,44]}/>
    <Label x={335} y={46}>External carotid</Label><Leader from={[328,50]} to={[308,56]}/>
    <Label x={25} y={151}>Eccentric plaque</Label><Leader from={[143,153]} to={[191,165]}/>
    <Label x={25} y={234}>Arteriotomy edges</Label><Leader from={[149,232]} to={[202,230]}/>
    <Label x={297} y={183}>Temporary shunt</Label><Leader from={[290,179]} to={[238,203]}/>
    <Label x={297} y={279}>Shunt end in lumen</Label><Leader from={[289,273]} to={[216,289]}/>
    <Label x={25} y={339}>Common carotid</Label><Leader from={[143,332]} to={[205,308]}/>
    <Label x={25} y={376}>Assess cerebral perfusion during clamping; patch closure follows</Label>
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
  <Shell id="op-evar" title="EVAR: patent renal branches and bifurcated covered graft" desc="Local anterior aortoiliac schematic, patient's right on viewer's left. The proximal covered graft begins below patent renal branches and seals in the infrarenal neck. Each limb seals in a common iliac artery; internal and external iliac continuations remain visible. Dashed access wires continue from external iliac/femoral routes and are distinct from the implanted graft. Distal extension and branch devices vary by anatomy." h={400}>
    <path d="M242 25V107C190 126 180 217 226 255L177 316L154 370M278 25V107C330 126 340 217 294 255L343 316L366 370" fill={FILL} stroke={ART} strokeWidth={3}/>
    <path d="M242 58L140 49M278 58L381 49" stroke={ART} strokeWidth={10}/>
    <path d="M178 312L223 339M342 312L300 339" stroke={ART} strokeWidth={8}/>
    <path d="M260 89V227M260 227L188 297M260 227L332 297" stroke={GRAFT} strokeWidth={25} fill="none" strokeLinejoin="round"/>
    {[99,119,139,159,179,199,219].map(y=><path key={y} d={`M249 ${y}l5 6 6-6 6 6 5-6`} fill="none" stroke={INK} strokeWidth={1}/>)}
    {[0,1,2,3].map(i=><g key={i} stroke={INK} fill="none"><path d={`M${232-i*13} ${244+i*13}l10 5 5-9`}/><path d={`M${283+i*13} ${240+i*13}l5 9 10-5`}/></g>)}
    <path d="M148 379L187 298L260 226V74M372 379L332 298L264 232" stroke={VEIN} strokeWidth={2} strokeDasharray="5 4" fill="none"/>
    <Label x={25} y={27}>Renal branches patent</Label><Leader from={[163,31]} to={[155,50]}/>
    <Label x={316} y={97}>Infrarenal neck seal</Label><Leader from={[309,97]} to={[272,99]}/>
    <Label x={349} y={181}>Excluded aneurysm</Label><Leader from={[342,179]} to={[329,184]}/>
    <Label x={25} y={271}>Common iliac seal</Label><Leader from={[139,266]} to={[198,288]}/>
    <Label x={25} y={341}>Internal iliac</Label><Leader from={[109,337]} to={[216,334]}/>
    <Label x={379} y={345}>External iliac</Label><Leader from={[371,340]} to={[352,338]}/>
    <Label x={25} y={393}>Dashed: access wires · assess seal, renal patency and limb flow</Label>
  </Shell>
);

const FemPopDiagram = () => (
  <Shell id="op-fem-pop" title="Femoro-popliteal bypass: native runoff and graft joins" desc="Local longitudinal limb schematic, proximal above; no patient side implied. A graft joins the common femoral artery to the below-knee popliteal artery beyond superficial femoral occlusion. Profunda flow is preserved. Tibial runoff and two end-to-side joins are shown conceptually; conduit and target level vary." h={410}>
    <path d="M174 49Q135 125 151 219L172 326M287 49Q326 131 305 219L282 326" fill="none" stroke={MUTED} strokeWidth={2}/>
    <path d="M220 25V96Q230 173 220 248V322M220 96L172 145L151 202M174 143L137 159" stroke={ART} strokeWidth={14} fill="none"/>
    <path d="M218 140Q234 181 220 230" stroke={MUTED} strokeWidth={15} fill="none"/>
    <path d="M217 72C322 107 317 246 222 299" stroke={GRAFT} strokeWidth={11} fill="none"/>
    <path d="M217 72C322 107 317 246 222 299" stroke={INK} strokeWidth={1} strokeDasharray="3 9" fill="none"/>
    <path d="M220 322L180 363M220 322L249 351L267 372M247 349L226 371" stroke={ART} strokeWidth={6} fill="none"/>
    <path d="M164 257H313" stroke={MUTED} strokeDasharray="5 4"/>
    <Sutures x={210} y={73} count={3}/><Sutures x={213} y={300} count={3}/>
    <Flow x={279} y={180}/><Flow x={220} y={316}/>
    <Label x={25} y={28}>Common femoral</Label><Leader from={[145,31]} to={[214,44]}/>
    <Label x={25} y={108}>Proximal join</Label><Leader from={[115,106]} to={[224,76]}/>
    <Label x={25} y={198}>Profunda branches</Label><Leader from={[135,190]} to={[156,189]}/>
    <Label x={332} y={140}>Graft tunnel</Label><Leader from={[326,138]} to={[284,141]}/>
    <Label x={332} y={207}>Occluded SFA</Label><Leader from={[325,204]} to={[228,186]}/>
    <Label x={25} y={265}>Knee level</Label><Label x={320} y={305}>Distal popliteal join</Label><Leader from={[313,300]} to={[226,298]}/>
    <Label x={25} y={363}>Tibial runoff</Label><Leader from={[111,356]} to={[192,350]}/>
    <Label x={25} y={398}>After release: distal pulses / Doppler, haemostasis and limb perfusion</Label>
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
  <Shell id="op-ruptured-aaa" title="Ruptured AAA: alternative routes to proximal control" desc="Local longitudinal aortic schematic, cranial above, not a whole-body projection. A rupture communicates with retroperitoneal haematoma. Open supracoeliac clamping and an endovascular occlusion balloon above the renal arteries are alternatives, shown together only for comparison; neither is a universal target. Definitive graft repair is not depicted." h={420}>
    <path d="M236 26V155Q182 189 197 262Q209 289 237 305V322L183 370M278 26V155Q332 189 323 256L307 269L310 288L278 306V322L335 370" fill={FILL} stroke={ART} strokeWidth={4}/>
    <path d="M257 94L168 82M257 123L151 136M236 153L152 165M278 153L364 165" stroke={ART} strokeWidth={8} fill="none"/>
    <path d="M216 186Q198 224 216 277M301 183Q320 208 303 238" stroke={MUTED} strokeWidth={10} fill="none"/>
    <path d="M307 252Q365 219 412 266Q447 321 388 350Q332 353 309 287L318 271Z" fill={ART} fillOpacity={0.22} stroke={ART} strokeWidth={1.5}/>
    <path d="M308 258l14 9-12 9 15 9" stroke={ART} strokeWidth={3} fill="none"/>
    <Clamp x={257} y={60} w={64}/>
    <ellipse cx={257} cy={110} rx={18} ry={12} fill={GRAFT} stroke={INK}/>
    <path d="M257 122V314L330 374" stroke={GRAFT} strokeWidth={3} strokeDasharray="5 4" fill="none"/>
    <Label x={25} y={28}>Cranial ↑ · alternatives, not simultaneous treatment</Label>
    <Label x={326} y={60}>Open clamp</Label><Leader from={[319,58]} to={[290,60]}/>
    <Label x={25} y={85}>Coeliac branch</Label><Leader from={[123,85]} to={[173,83]}/>
    <Label x={25} y={127}>SMA</Label><Leader from={[61,126]} to={[158,133]}/>
    <Label x={338} y={111}>Balloon option</Label><Leader from={[332,108]} to={[275,110]}/>
    <Label x={25} y={175}>Renal branches</Label><Leader from={[127,176]} to={[162,164]}/>
    <Label x={25} y={240}>Mural thrombus</Label><Leader from={[136,237]} to={[211,242]}/>
    <Label x={353} y={218}>Rupture</Label><Leader from={[347,217]} to={[312,269]}/>
    <Label x={353} y={374}>Haematoma</Label><Leader from={[351,364]} to={[384,340]}/>
    <Label x={25} y={408}>Coordinate induction, haemorrhage resuscitation and proximal control</Label>
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
  <Shell id="op-cabg" title="CABG: coronary targets and separate bypass circuit" desc="Anterior conceptual heart view, patient's right on viewer's left. RCA follows the right atrioventricular groove on viewer's left; LAD descends towards the apex. A circumflex branch is partly hidden posteriorly. The internal thoracic artery remains attached to its subclavian origin and joins LAD beyond stenosis. A vein graft connects aortic root to a circumflex-territory target. Bypass circuit is drawn outside the heart; not a scaled coronary dissection map." h={430}>
    <path d="M198 144C127 128 125 223 180 272L278 364Q371 298 351 210Q340 134 283 151Q244 120 198 144Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M252 153V83Q278 48 323 83L335 116" stroke={ART} strokeWidth={20} fill="none"/>
    <path d="M180 140V105M175 200V235" stroke={VEIN} strokeWidth={13}/>
    <path d="M255 160L261 183Q274 252 278 346M259 182Q221 170 173 189Q152 229 194 265M261 183Q317 166 336 217" stroke={ART} strokeWidth={4} fill="none"/>
    <path d="M334 219Q347 245 329 270" stroke={ART} strokeWidth={4} strokeDasharray="4 3" fill="none"/>
    <path d="M266 226L271 241M337 243L334 256" stroke={MUTED} strokeWidth={8}/>
    <path d="M253 159C387 147 382 255 329 271" stroke={GRAFT} strokeWidth={6} fill="none"/>
    <path d="M200 56L223 57M218 58C200 157 218 264 274 288" stroke={GRAFT} strokeWidth={5} fill="none"/>
    <Sutures x={267} y={289} count={3}/><Sutures x={319} y={270} count={3}/>
    <path d="M167 168H63V145" stroke={VEIN} strokeWidth={5} fill="none"/>
    <rect x={20} y={101} width={89} height={44} rx={4} fill={FILL} stroke={INK}/>
    <path d="M63 101V31H399V90H279" stroke={ART} strokeWidth={5} fill="none"/>
    <Clamp x={252} y={117} w={38}/>
    <Label x={25} y={117}>Oxygenator</Label><Label x={31} y={133}>and pump</Label>
    <Label x={25} y={193}>Venous drainage</Label><Leader from={[104,188]} to={[147,167]}/>
    <Label x={316} y={57}>Aortic return</Label><Leader from={[362,62]} to={[393,87]}/>
    <Label x={25} y={68}>Attached ITA origin</Label><Leader from={[155,70]} to={[218,58]}/>
    <Label x={391} y={205}>Vein graft</Label><Leader from={[384,202]} to={[368,212]}/>
    <Label x={25} y={280}>RCA</Label><Leader from={[58,277]} to={[188,260]}/>
    <Label x={390} y={290}>Circumflex target</Label><Leader from={[384,285]} to={[329,269]}/>
    <Label x={25} y={335}>ITA → LAD</Label><Leader from={[107,330]} to={[264,276]}/>
    <Label x={296} y={363}>LAD</Label><Leader from={[292,356]} to={[278,339]}/>
    <Label x={25} y={416}>Grafts join beyond stenoses; coronary layout is simplified</Label>
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
  <Shell id="op-avr" title="Aortic valve replacement: sewing ring, ostia and LV outflow" desc="Local longitudinal left ventricular outflow and aortic-root cutaway, cranial above; not an anterior whole-heart plate. A representative mechanical bileaflet valve has a sewing ring at the annulus. Coronary ostia lie in root sinuses above it; the aortotomy is below the cross-clamp. Biological prostheses look different. Sutures and vent route are conceptual, not a placement guide." h={410}>
    <path d="M208 28V125Q187 150 201 182Q123 214 160 301Q208 361 296 309Q332 271 292 187Q310 150 286 125V28" fill={FILL} stroke={INK} strokeWidth={3}/>
    <path d="M213 30V119M281 30V119" stroke={ART} strokeWidth={7}/>
    <path d="M201 154L164 145M294 154L334 144" stroke={ART} strokeWidth={6}/>
    <path d="M173 222Q151 282 226 321M304 223Q329 283 271 322" stroke={MUTED} strokeWidth={9} fill="none" opacity={0.5}/>
    <ellipse cx={247} cy={192} rx={45} ry={14} fill={FILL} stroke={GRAFT} strokeWidth={5}/>
    <path d="M219 188L236 199M258 188L276 199" stroke={INK} strokeWidth={6}/>
    {[211,223,235,247,259,271,283].map(x=><Sutures key={x} x={x} y={193} count={1}/>)}
    <Clamp x={247} y={60} w={90}/>
    <path d="M209 109Q247 122 284 109" stroke={ART} strokeWidth={3} strokeDasharray="5 4" fill="none"/>
    <path d="M298 282Q287 278 281 260" stroke={VEIN} strokeWidth={3} fill="none" strokeDasharray="4 3"/>
    <Flow x={247} y={252} direction="up"/>
    <Label x={25} y={27}>Local LV outflow cutaway · cranial ↑</Label>
    <Label x={337} y={58}>Cross-clamp</Label><Leader from={[331,55]} to={[291,60]}/>
    <Label x={337} y={110}>Aortotomy</Label><Leader from={[329,108]} to={[281,111]}/>
    <Label x={25} y={144}>Coronary ostium</Label><Leader from={[134,142]} to={[174,146]}/>
    <Label x={337} y={163}>Root sinus</Label><Leader from={[331,161]} to={[299,169]}/>
    <Label x={337} y={219}>Valve sewing ring</Label><Leader from={[330,212]} to={[284,195]}/>
    <Label x={25} y={248}>Bileaflet example</Label><Leader from={[139,241]} to={[230,194]}/>
    <Label x={335} y={293}>Vent route</Label><Leader from={[329,286]} to={[290,275]}/>
    <Label x={181} y={355}>Left ventricular outflow</Label>
    <Label x={25} y={397}>De-air; TOE checks valve motion, leaks, gradient and ventricular function</Label>
  </Shell>
);

const AnteriorResectionDiagram = () => (
  <Shell id="op-anterior-resection" title="Anterior resection: mesentery, specimen and anastomosis" desc="Two local bowel schematics: resection interval on viewer's left and reconstructed continuity on viewer's right. No whole-body laterality implied. A sigmoid/rectal tumour and its mesentery are removed, then colon joins the rectal stump. Mesenteric vessel tie level, total mesorectal excision extent and diversion vary with the lesion; dashed boundaries are conceptual, not oncological margins." h={390}>
    <path d="M83  60 V145Q88 184 153 194Q199 213 166 249L161 320" stroke={GRAFT} strokeWidth={25} fill="none"/>
    <path d="M100 132L159 171L208 226L183 269L136 250L113 185Z" fill={FILL} stroke={MUTED} strokeDasharray="4 4"/>
    <path d="M83 143Q87 184 153 194Q199 213 166 249" stroke={ART} strokeWidth={27} strokeDasharray="5 4" fill="none"/>
    <path d="M177 199Q190 211 177 223L163 221L164 206Z" fill={ART} stroke={INK}/>
    <path d="M203 130L157 167L121 175M157 167L182 201" stroke={ART} strokeWidth={3} fill="none"/>
    <path d="M175 148l8 11M170 153l8 11" stroke={INK} strokeWidth={2}/>
    <path d="M68 133L104 139M149 255L181 263" stroke={INK} strokeWidth={2}/>
    <path d="M348 60V174Q348 222 374 246V321" stroke={GRAFT} strokeWidth={25} fill="none"/>
    <path d="M328 65H368M330 104H366M331 143H365M358 277H390M358 308H390" stroke={MUTED} strokeWidth={1}/>
    <ellipse cx={374} cy={248} rx={14} ry={6} fill="none" stroke={INK} strokeWidth={2}/>
    <Sutures x={363} y={248} count={4}/>
    <path d="M246 199H291M282 191L291 199L282 207" stroke={INK} strokeWidth={2} fill="none"/>
    <Label x={25} y={28}>Resection interval</Label><Label x={307} y={28}>Restored continuity</Label>
    <Label x={25} y={88}>Colon</Label><Leader from={[65,86]} to={[78,100]}/>
    <Label x={193} y={107}>Vessel control</Label><Leader from={[209,116]} to={[179,152]}/>
    <Label x={25} y={228}>Tumour</Label><Leader from={[78,221]} to={[170,215]}/>
    <Label x={25} y={292}>Mesentery</Label><Leader from={[97,284]} to={[131,239]}/>
    <Label x={403} y={253}>Join</Label><Leader from={[400,247]} to={[386,248]}/>
    <Label x={25} y={343}>Rectal stump</Label><Leader from={[119,336]} to={[161,315]}/>
    <Label x={25} y={377}>Assess perfusion and join integrity; diversion when indicated</Label>
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
  <Shell id="op-carotid-stent" title="Carotid stenting: expanded stent and distal filter" desc="Local longitudinal carotid bifurcation view, brain above and common carotid below; no patient side implied. Expanded stent compresses plaque in the bulb and internal carotid. A distal filter basket on a wire lies beyond the treated segment; proximal flow reversal is an alternative not depicted. This shows the deployed phase, not simultaneous balloon inflation." h={390}>
    <path d="M208 345V231Q203 182 179 59M248 345V231Q244 168 214 59" stroke={ART} strokeWidth={4} fill="none"/>
    <path d="M246 231L324 83M221 184L291 64" stroke={ART} strokeWidth={4} fill="none"/>
    <path d="M209 227Q213 176 194 133L201 133Q226 180 221 227Z M239 229Q233 168 210 131L216 130Q245 178 246 229Z" fill={MUTED} stroke={INK} strokeWidth={1}/>
    <path d="M219 249Q229 198 203 120L213 118Q242 200 237 249Z" fill="url(#op-carotid-stent-mesh)" stroke={GRAFT} strokeWidth={2}/>
    <path d="M229 363V250Q232 163 198 80V46" stroke={VEIN} strokeWidth={2} fill="none"/>
    <path d="M183 79Q198 117 212 79Z" fill="url(#op-carotid-stent-mesh)" stroke={INK} strokeWidth={1.5}/>
    <ellipse cx={198} cy={79} rx={15} ry={4} fill="none" stroke={INK}/>
    <Flow x={195} y={45} direction="up"/>
    <Label x={25} y={29}>Internal carotid → brain</Label><Leader from={[172,31]} to={[184,55]}/>
    <Label x={321} y={52}>External carotid</Label><Leader from={[317,57]} to={[309,104]}/>
    <Label x={25} y={115}>Filter basket</Label><Leader from={[112,111]} to={[196,94]}/>
    <Label x={313} y={160}>Compressed plaque</Label><Leader from={[306,158]} to={[234,186]}/>
    <Label x={313} y={226}>Expanded stent</Label><Leader from={[306,221]} to={[237,224]}/>
    <Label x={25} y={300}>Common carotid</Label><Leader from={[138,294]} to={[211,298]}/>
    <Label x={306} y={327}>Access wire</Label><Leader from={[300,323]} to={[230,333]}/>
    <Label x={25} y={377}>Ballooning can slow heart rate and lower BP; monitor cerebral function</Label>
  </Shell>
);

const FemoralEndarterectomyDiagram = () => (
  <Shell id="op-femoral-endarterectomy" title="Femoral endarterectomy: patch closure and branch origins" desc="Local longitudinal common femoral bifurcation view, proximal above, no patient side implied. Patch closure spans the opened common femoral artery and bulb, preserving profunda and superficial femoral origins. Two suture lines mark patch edges. Clamps indicate controlled closure before release; plaque removal is an earlier phase, not shown through the closed patch." h={390}>
    <path d="M212 32V191Q203 224 165 309M250 32V191Q263 224 300 309" fill="none" stroke={ART} strokeWidth={4}/>
    <path d="M220 208L185 312M242 208L281 312" stroke={ART} strokeWidth={4} fill="none"/>
    <path d="M225 84Q207 133 217 189Q224 209 238 212Q254 185 246 137L236 84Z" fill={GRAFT} fillOpacity={0.32} stroke={GRAFT} strokeWidth={2}/>
    <path d="M225 86Q208 143 219 190M236 86Q258 154 237 211" stroke={INK} strokeWidth={1} strokeDasharray="2 5" fill="none"/>
    <Sutures x={219} y={101} vertical count={13}/><Sutures x={239} y={101} vertical count={13}/>
    <Clamp x={231} y={57} w={50}/><Clamp x={174} y={281}/><Clamp x={290} y={281}/>
    <Label x={25} y={28}>Common femoral artery</Label><Leader from={[165,30]} to={[213,42]}/>
    <Label x={312} y={90}>Proximal control</Label><Leader from={[307,87]} to={[260,57]}/>
    <Label x={312} y={156}>Patch closure</Label><Leader from={[306,153]} to={[244,153]}/>
    <Label x={25} y={174}>Suture line</Label><Leader from={[101,170]} to={[215,158]}/>
    <Label x={25} y={244}>Profunda origin</Label><Leader from={[133,241]} to={[206,231]}/>
    <Label x={312} y={246}>SFA origin</Label><Leader from={[305,241]} to={[266,240]}/>
    <Label x={25} y={340}>Profunda runoff</Label><Leader from={[130,331]} to={[174,304]}/>
    <Label x={307} y={340}>Superficial femoral</Label><Leader from={[301,330]} to={[290,302]}/>
    <Label x={25} y={377}>Flush and restore flow in the planned sequence; check distal perfusion</Label>
  </Shell>
);

const KidneyTransplantDiagram = () => (
  <Shell id="op-kidney-transplant" title="Kidney transplant: graft hilum and three joins" desc="Anterior local right iliac-fossa schematic, patient's right on viewer's left. The renal graft hilum faces recipient iliac vessels. Donor artery and vein have separate end-to-side joins to recipient external iliac vessels; ureter passes to bladder with a short intramural course. Native kidneys are outside the field and usually retained. Positions and vessel configuration vary." h={390}>
    <path d="M95 65C41 44 29 137 58 190Q89 221 124 184Q142 163 113 140Q94 130 122 107Q140 85 95 65Z" fill={FILL} stroke={INK} strokeWidth={3}/>
    <path d="M72 84Q50 122 77 177M85 93Q75 112 95 122M85 166Q76 147 96 137" stroke={MUTED} strokeWidth={2} fill="none"/>
    <path d="M192 34V282" stroke={ART} strokeWidth={13}/><path d="M222 34V282" stroke={VEIN} strokeWidth={14}/>
    <path d="M112 121Q155 97 192 121" stroke={ART} strokeWidth={6} fill="none"/>
    <path d="M113 141Q163 164 222 152" stroke={VEIN} strokeWidth={8} fill="none"/>
    <path d="M102 145Q99 226 194 272L253 288" stroke={GRAFT} strokeWidth={5} fill="none"/>
    <path d="M250 263Q284 236 331 266Q344 305 290 333Q244 319 250 263Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M253 288L265 299" stroke={GRAFT} strokeWidth={3}/>
    <Sutures x={185} y={113} vertical count={3}/><Sutures x={216} y={145} vertical count={3}/><Sutures x={251} y={285} count={3}/>
    <Flow x={192} y={246}/>
    <Label x={25} y={27}>Anterior: patient R ← → patient L</Label>
    <Label x={25} y={50}>Graft kidney</Label><Leader from={[115,53]} to={[91,68]}/>
    <Label x={285} y={77}>External iliac vessels</Label><Leader from={[279,82]} to={[221,89]}/>
    <Label x={288} y={126}>Arterial join</Label><Leader from={[282,124]} to={[191,121]}/>
    <Label x={289} y={188}>Venous join</Label><Leader from={[282,181]} to={[221,152]}/>
    <Label x={25} y={252}>Donor ureter</Label><Leader from={[115,246]} to={[137,242]}/>
    <Label x={366} y={292}>Bladder</Label><Leader from={[359,285]} to={[332,284]}/>
    <Label x={25} y={331}>Ureteric join</Label><Leader from={[116,324]} to={[258,294]}/>
    <Label x={25} y={377}>Prepare for reperfusion; reassess perfusion, potassium and urine output</Label>
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
  <Shell id="op-pyloromyotomy" title="Pyloromyotomy: split muscle with intact mucosa" desc="Local longitudinal stomach-outlet cutaway, stomach on viewer's left and duodenum on viewer's right, no body laterality claim. Hypertrophied pyloric muscle is split lengthways and separated, allowing intact mucosa to bulge between the edges. The underlying lumen remains continuous. This is an after-splitting schematic, not an incision-depth guide." h={380}>
    <path d="M70 105Q35 130 62 218Q107 276 191 221L228 206V123L171 115Q135 73 70 105Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M227 120Q292 100 357 124V143Q288 132 229 146Z M229 188Q292 203 357 187V210Q289 231 227 211Z" fill={GRAFT} fillOpacity={0.4} stroke={INK} strokeWidth={2}/>
    <path d="M229 147Q292 127 357 147V187Q292 207 229 187Z" fill={FILL} stroke={ART} strokeWidth={2}/>
    <path d="M229 164H445M229 175H445" stroke={MUTED} strokeWidth={2}/>
    <path d="M357 143H445M357 190H445" stroke={INK} strokeWidth={3}/>
    <path d="M117 39Q122 99 130 154L111 178" stroke={VEIN} strokeWidth={5} fill="none"/>
    <path d="M87 129Q70 175 115 213M156 137Q170 165 151 199" stroke={MUTED} strokeWidth={1.5} fill="none"/>
    <Label x={25} y={28}>Local stomach-outlet cutaway</Label>
    <Label x={25} y={70}>Gastric tube</Label><Leader from={[117,74]} to={[123,95]}/>
    <Label x={267} y={68}>Separated muscle edges</Label><Leader from={[290,87]} to={[299,118]}/>
    <Label x={25} y={284}>Stomach</Label><Leader from={[88,276]} to={[137,231]}/>
    <Label x={250} y={282}>Intact bulging mucosa</Label><Leader from={[292,267]} to={[290,193]}/>
    <Label x={383} y={128}>Duodenum</Label><Leader from={[396,133]} to={[411,144]}/>
    <Label x={25} y={367}>Correct fluid / electrolyte deficits first; decompress stomach before induction</Label>
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
  <Shell id="op-tracheostomy" title="Surgical tracheostomy: anterior opening and cuffed tube" desc="Local sagittal neck cutaway, anterior on viewer's left, posterior on viewer's right. The oral tube tip is withdrawn above the anterior tracheal opening before the curved tracheostomy tube is advanced caudally; its cuff lies inside the trachea below the opening. The thyroid isthmus is displaced away from the opening. Tube position is confirmed with capnography before oral-tube removal." h={400}>
    <path d="M145 45Q155 104 147 165L142 305M336 45V314" stroke={MUTED} strokeWidth={2} fill="none"/>
    <path d="M202 51V161M202 197V332M280 51V332" stroke={INK} strokeWidth={3} fill="none"/>
    {[78,102,126,150,216,240,264,288,312].map(y=><path key={y} d={`M203 ${y}H220M265 ${y}H279`} stroke={MUTED} strokeWidth={3}/>)}
    <path d="M229 29V144" stroke={VEIN} strokeWidth={9}/>
    <ellipse cx={229} cy={123} rx={12} ry={9} fill="none" stroke={VEIN} strokeWidth={2}/>
    <path d="M84 180H185Q239 180 241 228V287" stroke={GRAFT} strokeWidth={12} fill="none"/>
    <path d="M87 180H185Q239 180 241 228V287" stroke={INK} strokeWidth={1} fill="none"/>
    <ellipse cx={241} cy={257} rx={29} ry={14} fill="none" stroke={GRAFT} strokeWidth={2}/>
    <rect x={164} y={157} width={9} height={47} rx={3} fill={FILL} stroke={INK}/>
    <path d="M181 133Q162 117 180 102" stroke={ART} strokeWidth={7} fill="none"/>
    <Flow x={241} y={305}/>
    <Label x={25} y={26}>Anterior ← sagittal cutaway → posterior</Label>
    <Label x={308} y={77}>Oral tube withdrawn</Label><Leader from={[301,80]} to={[232,104]}/>
    <Label x={25} y={80}>Isthmus displaced</Label><Leader from={[128,90]} to={[174,117]}/>
    <Label x={25} y={232}>External flange</Label><Leader from={[132,222]} to={[168,198]}/>
    <Label x={305} y={183}>Tracheal opening</Label><Leader from={[299,177]} to={[202,179]}/>
    <Label x={306} y={260}>Cuff in trachea</Label><Leader from={[300,254]} to={[269,257]}/>
    <Label x={25} y={330}>Tracheostomy tube</Label><Leader from={[144,319]} to={[239,283]}/>
    <Label x={25} y={386}>Agree oxygen / ignition precautions; confirm ventilation with capnography</Label>
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
  <Shell id="op-fess" title="Endoscopic sinus surgery: ethmoid corridor and risk boundaries" desc="Coronal conceptual section, superior above, anterior patient-facing convention; no side-specific surgical plan. The septum separates nasal cavities. Ethmoid air cells lie medial to the thin lamina papyracea bordering each orbit; the cribriform region lies above the septum. The endoscope route is a simplified projection from nostril alongside the middle turbinate into the ethmoid corridor, not a dissection guide." h={400}>
    <path d="M60 77H174L189 66H282L297 77H460" stroke={INK} strokeWidth={5} fill="none"/>
    <path d="M203 67H268" stroke={MUTED} strokeWidth={4} strokeDasharray="3 3"/>
    <path d="M234 72V322" stroke={INK} strokeWidth={3}/>
    <path d="M175 86V229M296 86V229" stroke={ART} strokeWidth={3}/>
    <path d="M85 102Q140 70 167 114L167 220Q123 245 82 208Q59 159 85 102Z M307 113Q349 72 402 103Q434 155 405 209Q363 246 306 220Z" fill={FILL} stroke={INK} strokeWidth={2}/>
    <ellipse cx={123} cy={163} rx={31} ry={34} fill={FILL} stroke={MUTED}/><ellipse cx={357} cy={163} rx={31} ry={34} fill={FILL} stroke={MUTED}/>
    {[[190,106],[214,106],[190,139],[216,143],[192,175],[272,108],[253,107],[276,141],[253,142],[275,178]].map(([x,y])=><path key={x+y} d={`M${x-9} ${y-11}q10-9 19 0l-1 20q-10 8-19 0Z`} fill={FILL} stroke={MUTED}/>)}
    <path d="M212 191Q184 197 195 244Q205 258 220 241M256 191Q283 197 275 244Q266 258 250 241" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M178 275Q195 264 216 275M254 275Q281 259 295 275" stroke={MUTED} strokeWidth={5} fill="none"/>
    <path d="M190 344L184 270L183 234L198 165" stroke={GRAFT} strokeWidth={5} fill="none"/>
    <Label x={25} y={29}>Coronal section · superior ↑</Label>
    <Label x={310} y={48}>Cribriform region</Label><Leader from={[303,52]} to={[252,67]}/>
    <Label x={25} y={107}>Orbit</Label><Leader from={[66,104]} to={[89,138]}/>
    <Label x={333} y={267}>Lamina papyracea</Label><Leader from={[327,258]} to={[296,207]}/>
    <Label x={325} y={317}>Middle turbinate</Label><Leader from={[318,309]} to={[267,235]}/>
    <Label x={25} y={243}>Ethmoid cells</Label><Leader from={[116,234]} to={[195,140]}/>
    <Label x={25} y={320}>Endoscope route</Label><Leader from={[133,309]} to={[183,275]}/>
    <Label x={264} y={354}>Nasal septum</Label><Leader from={[258,344]} to={[234,298]}/>
    <Label x={25} y={386}>Thin orbit and skull-base boundaries: bleeding obscures the field</Label>
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
  <Shell id="op-microlaryngoscopy" title="Microlaryngoscopy: suspension, folds and a small tube" desc="Local longitudinal access cutaway, mouth above and trachea below, no patient-side mapping. A rigid laryngoscope exposes the glottis and is supported by a suspension arm. A small cuffed tube passes between the vocal folds, with cuff below them. Instrument access is shown beside the tube. Tubeless and jet ventilation are alternatives, not simultaneously illustrated; laser use needs a separate fire plan." h={400}>
    <path d="M140 76Q251 36 361 76L342 163L302 197M157 90L173 160L203 197" fill={FILL} stroke={INK} strokeWidth={2}/>
    <path d="M171 81L194 183M330 81L307 183" stroke={INK} strokeWidth={7}/>
    <path d="M165 86L196  80 M310  80 L336 86" stroke={MUTED} strokeWidth={4}/>
    <path d="M330 93H394V48H443" fill="none" stroke={INK} strokeWidth={5}/>
    <path d="M443 28V71M425 71H462" stroke={INK} strokeWidth={4}/>
    <path d="M204 199L226 238V340M303 199L277 238V340" fill="none" stroke={INK} strokeWidth={3}/>
    <path d="M204 196Q225 193 243 220M304 196Q279 192 258 220" fill="none" stroke={GRAFT} strokeWidth={6}/>
    <path d="M242 45L250 320" stroke={VEIN} strokeWidth={9}/>
    <ellipse cx={250} cy={287} rx={20} ry={12} fill="none" stroke={VEIN} strokeWidth={2}/>
    <path d="M282 67L269 194L276 205" stroke={MUTED} strokeWidth={3} fill="none"/>
    {[251,275,299,323].map(y=><path key={y} d={`M227 ${y}h9M267 ${y}h9`} stroke={MUTED} strokeWidth={2}/>)}
    <Label x={25} y={27}>Longitudinal access cutaway · mouth above</Label>
    <Label x={25} y={115}>Rigid scope</Label><Leader from={[111,113]} to={[178,113]}/>
    <Label x={345} y={125}>Suspension arm</Label><Leader from={[348,111]} to={[394,92]}/>
    <Label x={25} y={183}>Small tube</Label><Leader from={[101,180]} to={[246,162]}/>
    <Label x={343} y={190}>Instrument</Label><Leader from={[337,186]} to={[271,173]}/>
    <Label x={25} y={245}>Vocal folds</Label><Leader from={[108,237]} to={[227,204]}/>
    <Label x={333} y={287}>Cuff below glottis</Label><Leader from={[326,281]} to={[269,287]}/>
    <Label x={306} y={345}>Trachea</Label><Leader from={[299,337]} to={[277,326]}/>
    <Label x={25} y={386}>Shared field: ventilation plan, unobstructed expiration and fire precautions</Label>
  </Shell>
);
