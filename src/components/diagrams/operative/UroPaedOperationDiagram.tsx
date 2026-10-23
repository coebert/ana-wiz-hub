import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagramToggleBar } from "../shared/DiagramToggleBar";
import { DiagramFigure, svgImgProps } from "../_shared/DiagramFigure";
import { IllustrationDefs, Leader, Sutures } from "./OperativeIllustration";
import type { Operation } from "@/data/operativeSteps";

// Local schematics: kidney/ureter views are posterior-coronal, genital views are external/sagittal.
const ink = "hsl(var(--foreground))";
const tissue = "hsl(var(--muted))";
const accent = "hsl(var(--perioperative))";
const danger = "hsl(var(--destructive))";
const faint = "hsl(var(--muted-foreground))";
function Label({ x, y, to, children }: { x: number; y: number; to: [number, number]; children: string }) {
  return <g><Leader from={[x, y + 4]} to={to} /><text x={x} y={y} fill={ink} fontSize={12}>{children}</text></g>;
}

function Kidney({ id }: { id: string }) {
  return <g>
    <path d="M215 70C130 70 120 210 175 245C215 270 250 235 245 200C240 175 265 160 262 125C258 92 245 70 215 70Z" fill={`url(#${id}-tissue)`} stroke={ink} strokeWidth={2} />
    <path d="M232 120Q205 130 215 160Q200 185 228 200" fill="none" stroke={faint} strokeWidth={6} />
    <path d="M240 200Q262 260 270 330Q276 380 282 400" fill="none" stroke={ink} strokeWidth={6} />
    <path d="M230 400Q280 375 330 400Q330 432 280 436Q230 432 230 400Z" fill={tissue} stroke={ink} strokeWidth={2} />
  </g>;
}

function StoneArt({ stage, detail, labels, id, pcnl }: { stage: number; detail: boolean; labels: boolean; id: string; pcnl: boolean }) {
  const stoneAt: [number, number] = pcnl ? [205, 150] : [266, 300];
  const fragmented = stage >= 3;
  return <>
    <Kidney id={id} />
    {!fragmented ? <circle cx={stoneAt[0]} cy={stoneAt[1]} r={pcnl ? 22 : 9} fill={danger} stroke={ink} /> :
      [[0,0],[8,6],[-7,5],[4,-8]].map(([dx,dy],i) => <circle key={i} cx={stoneAt[0]+dx} cy={stoneAt[1]+dy} r={pcnl ? 6 : 3} fill={danger} opacity={stage >= 4 ? 0.25 : 1} />)}
    {pcnl ? <>
      {stage >= 1 && <path d="M282 400Q276 330 262 250Q250 210 232 190" fill="none" stroke={accent} strokeWidth={2} strokeDasharray="5 4" />}
      {stage >= 2 && <><path d="M60 110L190 150" stroke={accent} strokeWidth={stage >= 2 ? 10 : 3} strokeLinecap="round" /><rect x={40} y={92} width={30} height={30} fill="none" stroke={ink} /></>}
      {stage >= 4 && <path d="M70 120Q130 140 192 150" stroke={faint} strokeWidth={4} fill="none" />}
      {detail && <><path d="M110 35V420" stroke={faint} strokeDasharray="3 6" /><path d="M120 62Q160 48 210 56" stroke={danger} strokeWidth={2} fill="none" /></>}
    </> : <>
      {stage >= 1 && <path d="M282 400Q276 360 270 320" stroke={accent} strokeWidth={stage >= 2 ? 6 : 2} fill="none" />}
      {stage === 3 && <path d="M268 312L262 296" stroke={danger} strokeWidth={3} />}
      {stage >= 4 && <path d="M232 185Q262 260 272 330Q280 380 276 405" stroke={accent} strokeWidth={3} fill="none" strokeDasharray="2 3" />}
      {detail && <g><circle cx={420} cy={300} r={48} fill={tissue} stroke={ink} /><circle cx={420} cy={300} r={18} fill="hsl(var(--card))" stroke={ink} />{!fragmented ? <circle cx={420} cy={300} r={12} fill={danger} /> : <circle cx={420} cy={300} r={4} fill={danger} />}</g>}
    </>}
    {labels && <>
      <text x={22} y={25} fontSize={11} fill={ink}>Local posterior-coronal schematic · cranial above</text>
      <Label x={300} y={80} to={[230, 100]}>Kidney</Label>
      <Label x={310} y={250} to={[262, 260]}>Ureter</Label>
      <Label x={360} y={420} to={[320, 410]}>Bladder</Label>
      <Label x={pcnl ? 22 : 300} y={pcnl ? 200 : 340} to={stoneAt}>{fragmented ? "Fragments" : "Stone"}</Label>
      {pcnl && stage >= 2 && <Label x={22} y={80} to={[60, 110]}>Percutaneous tract</Label>}
      {pcnl && detail && <Label x={300} y={48} to={[205, 52]}>Pleura / 12th rib: supracostal risk</Label>}
      {!pcnl && stage >= 4 && <Label x={310} y={190} to={[245, 220]}>JJ stent (if used)</Label>}
      {!pcnl && detail && <Label x={380} y={370} to={[420, 345]}>Ureteric lumen inset</Label>}
    </>}
  </>;
}

function GenitalArt({ stage, detail, labels, id, hypospadias }: { stage: number; detail: boolean; labels: boolean; id: string; hypospadias: boolean }) {
  if (hypospadias) {
    const repaired = stage >= 3;
    return <>
      <path d="M150 220Q150 180 200 180H360Q420 180 425 220Q420 260 360 260H200Q150 260 150 220Z" fill={`url(#${id}-tissue)`} stroke={ink} strokeWidth={2} transform={stage === 0 ? "rotate(8 280 220)" : undefined} />
      <path d="M200 260Q280 236 360 260" stroke={faint} fill="none" />
      <circle cx={repaired ? 422 : 300} cy={repaired ? 220 : 258} r={6} fill={danger} />
      {stage === 1 && <path d="M170 172Q280 150 400 172" stroke={accent} strokeWidth={3} fill="none" strokeDasharray="5 4" />}
      {stage >= 2 && <path d="M300 252Q360 240 420 224" stroke={accent} strokeWidth={stage >= 3 ? 5 : 2} fill="none" />}
      {stage >= 3 && <Sutures x={330} y={248} count={5} />}
      {stage >= 4 && <><path d="M425 222H500" stroke={faint} strokeWidth={3} /><rect x={180} y={170} width={210} height={100} rx={40} fill="none" stroke={accent} strokeDasharray="4 4" /></>}
      {detail && <g><circle cx={150} cy={360} r={44} fill={tissue} stroke={ink} /><path d="M120 360Q150 330 180 360" stroke={faint} fill="none" /><path d="M118 370Q150 395 182 370" stroke={accent} strokeWidth={3} fill="none" /></g>}
      {labels && <>
        <text x={22} y={25} fontSize={11} fill={ink}>Local lateral schematic · distal to the right</text>
        <Label x={40} y={120} to={[200, 190]}>Penile shaft</Label>
        <Label x={300} y={330} to={repaired ? [422, 226] : [300, 264]}>{repaired ? "Meatus at tip" : "Proximal meatus"}</Label>
        {stage >= 2 && <Label x={380} y={140} to={[380, 232]}>Neourethra</Label>}
        {stage >= 4 && <Label x={430} y={260} to={[470, 224]}>Catheter / stent</Label>}
        {detail && <Label x={210} y={410} to={[170, 380]}>Cross-section: tissue cover layer</Label>}
      </>}
    </>;
  }
  const down = stage >= 3;
  return <>
    <path d="M160 70H400V150H160Z" fill={tissue} stroke={faint} />
    <path d="M230 150L280 270M330 150L280 270" stroke={faint} strokeWidth={3} />
    <path d="M200 300Q280 260 360 300Q370 400 280 410Q190 400 200 300Z" fill={`url(#${id}-tissue)`} stroke={ink} strokeWidth={2} />
    <ellipse cx={down ? 250 : 200} cy={down ? 350 : 175} rx={18} ry={26} fill={danger} fillOpacity={0.55} stroke={ink} />
    <path d={down ? "M210 150Q230 260 250 325" : "M210 150Q205 160 200 150"} stroke={accent} strokeWidth={3} fill="none" />
    {stage === 1 && <path d="M150 190L250 160" stroke={accent} strokeWidth={4} />}
    {stage === 2 && <path d="M200 205Q215 260 240 300" stroke={accent} strokeWidth={2} strokeDasharray="5 4" fill="none" />}
    {down && <Sutures x={240} y={362} count={3} />}
    {stage >= 4 && <><Sutures x={180} y={185} count={4} /><Sutures x={300} y={395} count={3} /></>}
    {detail && <path d="M180 180L120 210" stroke={faint} strokeWidth={2} strokeDasharray="3 4" />}
    {labels && <>
      <text x={22} y={25} fontSize={11} fill={ink}>Local anterior schematic · cranial above</text>
      <Label x={420} y={110} to={[380, 110]}>Abdominal wall</Label>
      <Label x={40} y={140} to={[190, 170]}>{down ? "Groin incision" : "Undescended testis"}</Label>
      <Label x={400} y={320} to={[350, 330]}>Scrotum</Label>
      {down && <Label x={380} y={400} to={[262, 350]}>Testis in scrotal pouch</Label>}
      {stage >= 2 && <Label x={20} y={260} to={[220, 240]}>Spermatic cord mobilised</Label>}
      {detail && <Label x={20} y={230} to={[125, 208]}>Ilioinguinal nerve: block target</Label>}
    </>}
  </>;
}

export default function UroPaedOperationDiagram({ operation }: { operation: Operation }) {
  const [stage, setStage] = useState(0);
  const [labels, setLabels] = useState(true);
  const [detail, setDetail] = useState(true);
  const selected = operation.steps[stage];
  if (!selected) return null;
  const id = `op-${operation.id}`;
  const stone = operation.diagram === "pcnl" || operation.diagram === "ureteroscopy";
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
        <desc id={`${id}-desc`}>{selected.step} Simplified local schematic, not to scale.</desc>
        <IllustrationDefs id={id} />
        {stone ? <StoneArt stage={stage} detail={detail} labels={labels} id={id} pcnl={operation.diagram === "pcnl"} /> : <GenitalArt stage={stage} detail={detail} labels={labels} id={id} hypospadias={operation.diagram === "hypospadias"} />}
      </svg>
    </DiagramFigure>
    <div aria-live="polite" className="min-h-[120px] border-l-4 border-primary pl-4 space-y-2">
      <p className="text-sm font-semibold">{stage + 1}. {selected.step}</p>
      <p className="text-sm text-muted-foreground"><strong>Anaesthetic focus: </strong>{selected.anaesthetic}</p>
    </div>
    <p className="text-xs text-muted-foreground">Schematic teaching sequence, not to scale; technique, access and staging vary. No instrument depth or tract position is implied. Sources are listed with the operation. Not consultant-reviewed.</p>
  </div>;
}
