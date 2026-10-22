import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagramToggleBar } from "../shared/DiagramToggleBar";
import { DiagramFigure, svgImgProps } from "../_shared/DiagramFigure";
import { IllustrationDefs, Leader, Sutures } from "./OperativeIllustration";
import type { Operation } from "@/data/operativeSteps";

/* Anterior opened-abdomen schematic: patient's right is viewer's left.
 * The perineal inset is a local coronal schematic, not an additional projection. */
const ink = "hsl(var(--foreground))";
const bowel = "hsl(var(--muted))";
const removed = "hsl(var(--destructive))";
const join = "hsl(var(--perioperative))";
const vessel = "hsl(var(--destructive))";
type Kind = "ap-resection" | "right-hemicolectomy" | "left-hemicolectomy" | "hartmann";
function Label({ x, y, target, children }: { x: number; y: number; target: [number, number]; children: string }) {
  return <g><Leader from={[x, y + 5]} to={target} /><text x={x} y={y} fontSize={12} fill={ink}>{children}</text></g>;
}
const ascending = "M166 238V130Q166 104 195 104H243";
const descending = "M243 104H318Q347 104 347 132V229";
const sigmoid = "M347 229C347 276 269 248 269 299";
const rectum = "M269 299V353";

export default function ColorectalOperationDiagram({ operation }: { operation: Operation }) {
  const [stage, setStage] = useState(0);
  const [labels, setLabels] = useState(true);
  const [detail, setDetail] = useState(true);
  const kind = operation.diagram as Kind;
  const selected = operation.steps[stage];
  if (!selected) return null;
  const id = `op-${operation.id}`;
  const right = kind === "right-hemicolectomy";
  const left = kind === "left-hemicolectomy";
  const ap = kind === "ap-resection";
  const resected = stage >= 3;
  const segment = right ? ascending : left ? descending + " " + sigmoid : ap ? sigmoid + " " + rectum : sigmoid;
  const orientation = "Anterior abdominal schematic: patient's right on viewer's left; cranial above. Resection extent and vascular division vary.";
  return <div className="my-4 rounded-lg border border-border bg-muted/30 p-4 space-y-4">
    <DiagramToggleBar title={operation.name} toggles={[
      { label: "Detail", active: detail, onChange: () => setDetail(v => !v) },
      { label: "Labels", active: labels, onChange: () => setLabels(v => !v) },
    ]} />
    <div role="group" aria-label={`${operation.name} stages`} className="flex flex-wrap gap-2">
      {operation.steps.map((_, i) => <Button key={i} className="h-10 w-10 p-0" variant={stage === i ? "default" : "outline"} aria-label={`Stage ${i + 1}`} aria-pressed={stage === i} onClick={() => setStage(i)}>{i + 1}</Button>)}
    </div>
    <DiagramFigure id={id} title={`${operation.name}: stage ${stage + 1}`} description={`${orientation} ${selected.step}`}>
      <svg viewBox="0 0 560 450" className="w-full max-w-xl h-auto mx-auto bg-card rounded-lg border border-border" {...svgImgProps({ id })}>
        <title id={`${id}-title`}>{operation.name}: stage {stage + 1}</title>
        <desc id={`${id}-desc`}>{orientation} Highlighted bowel is the planned specimen before removal; dashed outline is the removed segment afterwards. Simplified, not to scale.</desc>
        <IllustrationDefs id={id} />
        <path d="M143 73Q250 40 375 73L405 305Q376 386 269 404Q153 385 115 308Z" fill={`url(#${id}-tissue)`} stroke={ink} opacity={0.55} />
        <g fill="none" stroke={ink} strokeWidth={26} strokeLinecap="round" strokeLinejoin="round">
          {!right && <path d={ascending} />}{!left && <path d={descending} />}
          {!left && kind !== "hartmann" && !ap && <path d={sigmoid} />}{!ap && <path d={rectum} />}
        </g>
        <g fill="none" stroke={bowel} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round">
          {!right && <path d={ascending} />}{!left && <path d={descending} />}
          {!left && kind !== "hartmann" && !ap && <path d={sigmoid} />}{!ap && <path d={rectum} />}
        </g>
        <path d={segment} fill="none" stroke={removed} strokeWidth={resected ? 3 : 24} strokeDasharray={resected ? "6 5" : undefined} strokeLinecap="round" opacity={resected ? 0.6 : 0.75} />
        {/* Terminal ileum joins the caecum before right colectomy. */}
        {!(right && resected) && <path d="M220 215Q196 226 166 238" fill="none" stroke={bowel} strokeWidth={14} />}
        {detail && <>
          <path d="M235 173Q211 133 176 147M248 180Q302 154 340 172M256 209L294 261" fill="none" stroke={vessel} strokeWidth={2} strokeDasharray={stage >= 2 ? "4 5" : undefined} />
          <path d="M201 194q30-24 51 1t-21 27t-31 29t50 27" stroke={ink} strokeWidth={3} fill="none" opacity={0.5} />
          {!right && [147,171,197,222].map(y => <path key={y} d={`M156 ${y}q10 7 20 0`} fill="none" stroke={ink} opacity={0.6} />)}
          {!left && [143,169,195,218].map(y => <path key={y} d={`M337 ${y}q10 7 20 0`} fill="none" stroke={ink} opacity={0.6} />)}
          {stage === 2 && <path d={ap ? "M247 295V350M291 295V350" : right ? "M145 132V238" : "M370 131V234"} fill="none" stroke={join} strokeWidth={3} strokeDasharray="5 4" />}
        </>}
        {resected && right && <><path d="M220 215Q221 146 243 104" fill="none" stroke={ink} strokeWidth={20} /><path d="M220 215Q221 146 243 104" fill="none" stroke={bowel} strokeWidth={18} /><Sutures x={235} y={114} count={3} /></>}
        {resected && left && <><path d="M243 104Q303 158 269 299" fill="none" stroke={ink} strokeWidth={24} /><path d="M243 104Q303 158 269 299" fill="none" stroke={bowel} strokeWidth={22} /><Sutures x={262} y={291} count={3} /></>}
        {resected && kind === "hartmann" && <><path d="M347 229L397 236" fill="none" stroke={bowel} strokeWidth={22} /><ellipse cx={400} cy={236} rx={12} ry={16} fill={removed} stroke={ink} /><path d="M256 299H282" stroke={ink} strokeWidth={3} /><Sutures x={260} y={299} count={3} /></>}
        {resected && ap && <><path d="M347 229L397 236" fill="none" stroke={bowel} strokeWidth={22} /><ellipse cx={400} cy={236} rx={12} ry={16} fill={removed} stroke={ink} /><path d="M255 355L283 355" stroke={join} strokeWidth={4} /></>}
        {ap && detail && <g>
          <path d="M424 322Q455 349 486 322L480 384H430Z" fill={bowel} stroke={ink} />
          <path d="M455 330V378" stroke={removed} strokeWidth={resected ? 2 : 12} strokeDasharray={resected ? "4 4" : undefined} />
          <path d="M430 366Q455 389 480 366" fill="none" stroke={resected ? join : ink} strokeWidth={3} />
        </g>}
        {labels && <>
          <text x={36} y={28} fill={ink} fontSize={11}>Patient right</text><text x={425} y={28} fill={ink} fontSize={11}>Patient left</text>
          <Label x={23} y={69} target={[240,104]}>Transverse colon</Label>
          <Label x={23} y={310} target={right ? [166,175] : left ? [347,179] : ap ? [269,321] : [312,266]}>{resected ? "Removed segment" : "Planned resection"}</Label>
          {resected && (right || left) && <Label x={354} y={302} target={right ? [237,116] : [269,291]}>{right ? "Ileocolic join" : "Colorectal join"}</Label>}
          {resected && !(right || left) && <Label x={418} y={198} target={[400,236]}>End colostomy</Label>}
          {kind === "hartmann" && <Label x={29} y={389} target={[269,299]}>Rectal stump</Label>}
          {ap && detail && <Label x={366} y={420} target={[455,376]}>{resected ? "Perineal closure" : "Anal canal inset"}</Label>}
          {detail && <Label x={365} y={83} target={[305,159]}>Mesenteric vessels</Label>}
        </>}
      </svg>
    </DiagramFigure>
    <div aria-live="polite" className="min-h-[120px] border-l-4 border-primary pl-4 space-y-2">
      <p className="text-sm font-semibold">{stage + 1}. {selected.step}</p>
      <p className="text-sm text-muted-foreground"><strong>Anaesthetic focus: </strong>{selected.anaesthetic}</p>
    </div>
    <p className="text-xs text-muted-foreground">{orientation} Simplified teaching stages; no fixed oncological margin or vessel-ligation level is implied. Sources are listed with the operation. Not consultant-reviewed.</p>
  </div>;
}