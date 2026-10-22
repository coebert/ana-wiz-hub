import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagramToggleBar } from "../shared/DiagramToggleBar";
import { DiagramFigure, svgImgProps } from "../_shared/DiagramFigure";
import { IllustrationDefs, Leader, Sutures } from "./OperativeIllustration";
import type { Operation } from "@/data/operativeSteps";

// Pelvic views are explicit local coronal schematics, not surface projections.
// Skin drawings are local cross-sections and an en-face histological map.
const ink = "hsl(var(--foreground))";
const tissue = "hsl(var(--muted))";
const accent = "hsl(var(--perioperative))";
const danger = "hsl(var(--destructive))";
const faint = "hsl(var(--muted-foreground))";
function Label({ x, y, to, children }: { x: number; y: number; to: [number, number]; children: string }) {
  return <g><Leader from={[x, y + 4]} to={to} /><text x={x} y={y} fill={ink} fontSize={12}>{children}</text></g>;
}

function Uterus({ id, removed = false, gravid = false }: { id: string; removed?: boolean; gravid?: boolean }) {
  return <g opacity={removed ? 0.35 : 1}>
    <path d={gravid ? "M205 231C120 130 164 55 280 57C396 55 440 130 355 231L308 286H252Z" : "M239 132Q190 91 181 139Q210 172 248 239L252 286H308L312 239Q350 172 379 139Q370 91 321 132Q280 104 239 132Z"}
      fill={`url(#${id}-tissue)`} stroke={ink} strokeWidth={2} strokeDasharray={removed ? "6 5" : undefined} />
    {!gravid && <path d="M242 147Q280 132 318 147L288 240H272Z" fill={tissue} stroke={faint} />}
    <path d="M252 286L240 348Q280 366 320 348L308 286" fill={tissue} stroke={ink} strokeWidth={2} />
    <path d="M278 242V341M284 242V341" stroke={faint} fill="none" />
  </g>;
}

function PelvicArt({ operation, stage, detail, labels, id }: { operation: Operation; stage: number; detail: boolean; labels: boolean; id: string }) {
  const cerclage = operation.diagram === "cerclage";
  const obstetric = operation.diagram === "peripartum-hysterectomy";
  const cyst = operation.diagram === "ovarian-cystectomy";
  const removed = stage >= 3 && !cerclage && !cyst;
  return <>
    <path d="M144 90Q110 232 170 371M416 90Q450 232 390 371" fill="none" stroke={faint} strokeWidth={12} opacity={0.25} />
    <Uterus id={id} removed={removed} gravid={obstetric && stage < 2} />
    {!cerclage && <>
      <path d="M205 146Q178 115 159 145M355 146Q382 115 401 145" fill="none" stroke={ink} strokeWidth={4} />
      <ellipse cx={155} cy={160} rx={23} ry={15} fill={`url(#${id}-tissue)`} stroke={ink} />
      <ellipse cx={405} cy={160} rx={cyst ? 43 : 23} ry={cyst ? 38 : 15} fill={`url(#${id}-tissue)`} stroke={ink} />
    </>}
    {detail && !cerclage && <>
      <path d="M211 365Q218 250 241 212M349 365Q342 250 319 212" fill="none" stroke={accent} strokeWidth={3} />
      <path d="M174 213L237 231M386 213L323 231" stroke={danger} strokeWidth={4} />
      {stage >= 2 && !cyst && <><Sutures x={229} y={231} count={3} /><Sutures x={311} y={231} count={3} /></>}
    </>}
    {cerclage && <>
      <path d="M240 345L210 390M320 345L350 390" stroke={faint} strokeWidth={5} fill="none" />
      {stage >= 2 && <><ellipse cx={280} cy={268} rx={31} ry={10} fill="none" stroke={accent} strokeWidth={4} /><path d="M310 268l12 10l-12 10" stroke={accent} strokeWidth={3} fill="none" /></>}
      {detail && <g><circle cx={427} cy={120} r={42} fill={tissue} stroke={ink} /><circle cx={427} cy={120} r={15} fill={`url(#${id}-tissue)`} stroke={ink} /><circle cx={427} cy={120} r={29} fill="none" stroke={stage >= 2 ? accent : faint} strokeWidth={3} strokeDasharray={stage < 2 ? "4 5" : undefined} /><path d="M445 143l14 14" stroke={accent} strokeWidth={3} /></g>}
    </>}
    {obstetric && <>
      {stage < 2 && <><path d="M239 210Q280 245 321 210L315 235H245Z" fill={danger} opacity={0.65} /><path d="M201 160Q280 180 359 160" fill="none" stroke={stage === 1 ? accent : faint} strokeWidth={3} strokeDasharray="5 4" /></>}
      {stage >= 2 && stage < 4 && <path d="M225 197L243 241M335 197L317 241" stroke={accent} strokeWidth={3} strokeDasharray="5 4" />}
    </>}
    {cyst && <>
      {stage < 3 ? <ellipse cx={405} cy={160} rx={27} ry={26} fill={danger} fillOpacity={0.35} stroke={danger} strokeWidth={2} /> : <><ellipse cx={405} cy={160} rx={23} ry={18} fill={`url(#${id}-tissue)`} stroke={ink} /><Sutures x={398} y={160} count={3} /><ellipse cx={443} cy={262} rx={27} ry={25} fill="none" stroke={danger} strokeDasharray="5 4" /><path d="M414 202L436 225" stroke={accent} strokeWidth={2} /></>}
      {stage === 2 && <path d="M394 137Q380 160 396 181" stroke={accent} strokeWidth={4} fill="none" />}
      {detail && <><path d="M145 59H415" stroke={ink} strokeWidth={2} /><path d="M276 59V94M170 59L194 92M388 59L363 92" stroke={accent} strokeWidth={5} /><circle cx={280} cy={60} r={8} fill={tissue} stroke={ink} /></>}
    </>}
    {removed && <><path d="M251 293Q280 281 309 293" stroke={accent} strokeWidth={4} fill="none" /><Sutures x={265} y={291} count={5} /></>}
    {labels && <>
      <text x={22} y={25} fontSize={11} fill={ink}>Local coronal schematic · cranial above</text>
      <Label x={24} y={98} to={[255, obstetric && stage < 2 ? 92 : 147]}>{removed ? "Removed uterus" : "Uterus"}</Label>
      {cerclage ? <>
        <Label x={22} y={233} to={[255,268]}>{stage >= 2 ? "Cervical suture" : "Cervix"}</Label>
        {detail && <Label x={370} y={191} to={[427,149]}>Axial cervix inset</Label>}
        <Label x={26} y={403} to={[252,339]}>Vaginal access</Label>
      </> : <>
        <Label x={370} y={330} to={[405,160]}>{cyst ? (stage >= 3 ? "Preserved ovary" : "Ovarian cyst") : "Ovary"}</Label>
        {detail && <Label x={22} y={400} to={[223,287]}>Ureter: protect</Label>}
        {removed && <Label x={363} y={395} to={[290,291]}>Vault closure*</Label>}
        {cyst && stage >= 3 && <Label x={377} y={291} to={[443,262]}>Cyst specimen</Label>}
        {obstetric && stage < 2 && <Label x={365} y={278} to={[314,224]}>Placenta in situ*</Label>}
      </>}
    </>}
  </>;
}

function SkinArt({ stage, mohs, detail, labels, id }: { stage: number; mohs: boolean; detail: boolean; labels: boolean; id: string }) {
  const removed = stage >= 2;
  return <>
    <path d="M75 127H485V280H75Z" fill={`url(#${id}-tissue)`} stroke={ink} />
    <path d="M75 127H485V147H75Z" fill={tissue} stroke={ink} />
    <path d="M75 237H485" stroke={faint} strokeWidth={2} strokeDasharray="5 6" />
    {detail && [110,150,190,370,410,450].map(x => <g key={x}><path d={`M${x} 126q-8 36 3 58q18 20 3 35`} stroke={faint} fill="none" /><circle cx={x} cy={260} r={9} fill={tissue} stroke={faint} /></g>)}
    {!removed ? <path d="M230 127q5-36 50-25q38-10 48 25l-9 59q-14 21-31-1q-28 26-44-5Z" fill={danger} fillOpacity={0.6} stroke={danger} /> : <path d="M218 126V203Q280 222 342 203V126" fill="hsl(var(--card))" stroke={ink} strokeWidth={2} />}
    {stage === 1 && <><path d="M214 111H346" stroke={accent} strokeDasharray="5 5" strokeWidth={3} /><path d="M173 177L212 165" stroke={accent} strokeWidth={4} /></>}
    {removed && stage < 4 && <path d="M216 220Q280 236 344 220" stroke={accent} fill="none" strokeWidth={3} />}
    {stage === 4 && <><path d="M218 126Q280 162 342 126L342 203Q280 222 218 203Z" fill={`url(#${id}-tissue)`} stroke={ink} /><Sutures x={262} y={128} count={6} /></>}
    {detail && <g>
      <path d="M160 347Q280 310 400 347Q280 389 160 347Z" fill={tissue} stroke={ink} />
      {mohs ? <><ellipse cx={280} cy={347} rx={43} ry={27} fill={danger} fillOpacity={0.35} stroke={accent} /><path d="M280 320V374M237 347H323" stroke={ink} /><text x={263} y={339} fill={ink} fontSize={10}>1</text><text x={295} y={339} fill={ink} fontSize={10}>2</text><text x={295} y={363} fill={ink} fontSize={10}>3</text><text x={263} y={363} fill={ink} fontSize={10}>4</text>{stage === 3 && <path d="M280 320A43 27 0 0 1 323 347H280Z" fill={danger} />}</> : <><path d="M203 347Q280 323 357 347Q280 371 203 347Z" fill="none" stroke={accent} strokeWidth={3} strokeDasharray={removed ? "5 4" : undefined} />{stage === 4 && <><path d="M204 347H356" stroke={ink} /><Sutures x={240} y={347} count={10} /></>}</>}
    </g>}
    {labels && <>
      <text x={22} y={25} fontSize={11} fill={ink}>Local skin cross-section · surface above</text>
      <Label x={24} y={79} to={[276,118]}>{removed ? "Excision defect" : "Skin lesion"}</Label>
      <Label x={385} y={84} to={[442,137]}>Epidermis</Label>
      <Label x={385} y={310} to={[443,206]}>Dermis</Label>
      {detail && <Label x={24} y={409} to={[245,347]}>{mohs ? "En-face margin map" : "Surface excision inset"}</Label>}
      {mohs && detail && stage === 3 && <Label x={362} y={407} to={[300,333]}>Positive sector*</Label>}
    </>}
  </>;
}

export default function PelvicSkinOperationDiagram({ operation }: { operation: Operation }) {
  const [stage, setStage] = useState(0);
  const [labels, setLabels] = useState(true);
  const [detail, setDetail] = useState(true);
  const selected = operation.steps[stage];
  if (!selected) return null;
  const id = `op-${operation.id}`;
  const skin = operation.specialty === "Dermatology";
  return <div className="my-4 rounded-lg border border-border bg-muted/30 p-4 space-y-4">
    <DiagramToggleBar title={operation.name} toggles={[
      { label: "Detail", active: detail, onChange: () => setDetail(v => !v) },
      { label: "Labels", active: labels, onChange: () => setLabels(v => !v) },
    ]} />
    <div role="group" aria-label={`${operation.name} stages`} className="flex flex-wrap gap-2">
      {operation.steps.map((_, i) => <Button key={i} className="h-10 w-10 p-0" variant={stage === i ? "default" : "outline"} aria-label={`Stage ${i + 1}`} aria-pressed={stage === i} onClick={() => setStage(i)}>{i + 1}</Button>)}
    </div>
    <DiagramFigure id={id} title={`${operation.name}: stage ${stage + 1}`} description={selected.step}>
      <svg viewBox="0 0 560 440" className="w-full max-w-xl h-auto mx-auto bg-card rounded-lg border border-border" {...svgImgProps({ id })}>
        <title id={`${id}-title`}>{operation.name}: stage {stage + 1}</title>
        <desc id={`${id}-desc`}>{selected.step} {skin ? "Local skin cross-section with surface inset." : "Local coronal pelvic schematic, cranial above; cervix inset is axial."} Simplified, not to scale.</desc>
        <IllustrationDefs id={id} />
        {skin ? <SkinArt stage={stage} mohs={operation.diagram === "mohs"} detail={detail} labels={labels} id={id} /> : <PelvicArt operation={operation} stage={stage} detail={detail} labels={labels} id={id} />}
      </svg>
    </DiagramFigure>
    <div aria-live="polite" className="min-h-[120px] border-l-4 border-primary pl-4 space-y-2">
      <p className="text-sm font-semibold">{stage + 1}. {selected.step}</p>
      <p className="text-sm text-muted-foreground"><strong>Anaesthetic focus: </strong>{selected.anaesthetic}</p>
    </div>
    <p className="text-xs text-muted-foreground">Schematic teaching sequence, not to scale; technique and extent vary. {operation.diagram === "peripartum-hysterectomy" ? "*Placenta left in situ illustrates suspected accreta; vault closure shows total hysterectomy, not a subtotal procedure." : operation.diagram === "mohs" ? "*One illustrative positive sector; further stages depend on microscopic findings, not a fixed number of passes." : "No fixed resection margin or instrument depth is implied."} Sources are listed with the operation. Not consultant-reviewed.</p>
  </div>;
}