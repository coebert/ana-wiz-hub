import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagramToggleBar } from "../shared/DiagramToggleBar";
import { DiagramFigure, svgImgProps } from "../_shared/DiagramFigure";
import { IllustrationDefs, shadeIllustration, Leader, Sutures } from "./OperativeIllustration";
import type { Operation } from "@/data/operativeSteps";

/* Local cutaways, not whole-body projections: hysteroscopy/TURBT are sagittal
 * with anterior left; jaw is a left lateral view with anterior right; skin
 * is a local cross-section with surface above. No patient laterality inferred. */
const tissue = "hsl(var(--muted))";
const ink = "hsl(var(--foreground))";
const vessel = "hsl(var(--destructive))";
const fluid = "hsl(var(--primary))";
const graft = "hsl(var(--perioperative))";
type Kind = "hysteroscopy" | "tur-bt" | "burn-graft" | "orthognathic";

function Label({ x, y, tx, ty, children }: { x: number; y: number; tx: number; ty: number; children: string }) {
  return <g><Leader from={[x, y + 5]} to={[tx, ty]} /><text x={x} y={y} fontSize={12} fill={ink}>{children}</text></g>;
}

function Drawing({ kind, stage, detail, labels, id }: { kind: Kind; stage: number; detail: boolean; labels: boolean; id: string }) {
  if (kind === "hysteroscopy") return <>
    <path d="M182 57Q208 38 241 67Q295 40 323 80Q350 124 310 188L280 224V279H237V224Q168 160 182 57Z" fill={tissue} stroke={ink} strokeWidth={2} />
    <path d="M213 85Q242 76 278 85Q308 110 280 166L266 208V277H250V208Q214 162 213 85Z" fill={fluid} fillOpacity={0.18} stroke={ink} />
    {stage < 3 && <path d="M266 127Q296 105 304 132Q301 158 280 152Z" fill={vessel} fillOpacity={0.55} stroke={ink} />}
    {stage >= 1 && stage < 4 && <><path d="M256 338V213L274 145" stroke={graft} strokeWidth={9} fill="none" /><path d="M256 338V213L274 145" stroke={ink} strokeWidth={1} fill="none" /><path d="M274 145L287 138" stroke={vessel} strokeWidth={2} /><path d="M251 284L126 316M262 284L396 316" stroke={fluid} strokeWidth={3} /></>}
    {detail && <><path d="M233 99L237 165M295 97L283 175" stroke={vessel} strokeWidth={1.5} /><path d="M264 90V68M247 97L239 70" stroke={ink} strokeWidth={0.7} /></>}
    {labels && <><Label x={24} y={49} tx={188} ty={94}>Uterine wall</Label><Label x={354} y={56} tx={260} ty={119}>Distended cavity</Label><Label x={27} y={216} tx={246} ty={243}>Cervical canal</Label>{stage < 3 && <Label x={365} y={192} tx={293} ty={133}>Lesion</Label>}{stage >= 1 && stage < 4 && <><Label x={24} y={284} tx={257} ty={259}>Hysteroscope</Label><Label x={327} y={344} tx={383} ty={313}>Fluid outflow</Label><Label x={26} y={344} tx={132} ty={314}>Fluid inflow</Label></>}</>}
  </>;
  if (kind === "tur-bt") return <>
    <path d="M154 83Q246 42 329 79Q375 109 351 181Q341 225 279 245L265 275V330H242V275L223 245Q156 226 142 171Q126 109 154 83Z" fill={tissue} stroke={ink} strokeWidth={2} />
    <path d="M167 100Q246 62 319 95Q350 118 327 179Q302 225 256 228Q199 225 167 177Q147 132 167 100Z" fill={fluid} fillOpacity={0.2} stroke={ink} />
    {stage < 3 && <path d="M324 137L305 129L307 145L292 140L299 158L289 168L306 168L303 183L324 173Z" fill={vessel} stroke={ink} />}
    {stage >= 1 && stage < 4 && <><path d="M253 346V268L306 166" stroke={graft} strokeWidth={9} fill="none" /><path d="M253 346V268L306 166" stroke={ink} strokeWidth={1} fill="none" /><path d="M307 155Q325 155 318 171" stroke={vessel} fill="none" strokeWidth={2} /></>}
    {stage === 4 && <><path d="M253 345V244" stroke={graft} strokeWidth={6} /><ellipse cx={253} cy={246} rx={11} ry={8} fill={graft} fillOpacity={0.4} stroke={ink} /></>}
    {detail && <><path d="M353 123Q385 148 378 187L427 243" stroke={vessel} fill="none" strokeWidth={3} strokeDasharray="5 4" /><path d="M174 108Q166 146 183 179M312 104Q333 123 323 146" stroke={ink} fill="none" strokeWidth={0.7} /></>}
    {labels && <><Label x={21} y={49} tx={161} ty={89}>Bladder wall</Label><Label x={351} y={52} tx={259} ty={110}>Irrigation fluid</Label><Label x={22} y={244} tx={254} ty={302}>Urethra / access</Label><Label x={350} y={285} tx={397} ty={209}>Obturator nerve</Label>{stage < 3 && <Label x={360} y={96} tx={311} ty={153}>Lateral-wall tumour</Label>}{stage >= 1 && stage < 4 && <Label x={23} y={181} tx={281} ty={216}>Resectoscope</Label>}{stage === 4 && <Label x={331} y={333} tx={253} ty={296}>Drainage catheter</Label>}</>}
  </>;
  if (kind === "burn-graft") return <>
    <path d="M95 121Q150 111 210 121Q263 132 324 118L415 122V253H95Z" fill={tissue} stroke={ink} strokeWidth={2} />
    <path d="M95 172Q175 165 255 177Q335 166 415 174" stroke={vessel} strokeWidth={4} fill="none" />
    {stage < 2 && <path d="M163 119Q210 123 255 122Q292 120 325 118L321 146Q238 155 171 145Z" fill={ink} opacity={0.5} />}
    {stage >= 2 && <path d="M166 120Q241 141 325 119L325 144Q242 153 166 144Z" fill={vessel} fillOpacity={0.45} stroke={vessel} />}
    {stage >= 3 && <><path d="M164 118Q243 139 326 117L326 125Q243 148 164 126Z" fill={graft} stroke={ink} /><path d="M165 118Q244 139 325 117L325 125Q244 147 165 125Z" fill={`url(#${id}-mesh)`} />{detail && <><Sutures x={170} y={123} count={4} /><Sutures x={287} y={125} count={4} /></>}</>}
    {stage === 2 && <><path d="M199 96L320 54L330 71L221 113Z" fill={tissue} stroke={ink} /><path d="M199 96L221 113" stroke={ink} strokeWidth={3} /></>}
    <path d="M101 284H222V333H101Z" fill={tissue} stroke={ink} /><path d="M114 292H208V300H114Z" fill={graft} stroke={ink} />
    {detail && <path d="M110 190l15 15 15-15 15 15 15-15 15 15 15-15 15 15 15-15 15 15 15-15 15 15 15-15 15 15 15-15 15 15 15-15" stroke={ink} strokeWidth={0.7} fill="none" opacity={0.4} />}
    {labels && <><Label x={22} y={45} tx={211} ty={126}>{stage < 2 ? "Burn eschar" : stage < 3 ? "Excised wound bed" : "Meshed skin graft"}</Label><Label x={330} y={71} tx={342} ty={130}>Skin surface</Label><Label x={342} y={285} tx={278} ty={172}>Dermal vessels</Label><Label x={253} y={319} tx={164} ty={297}>Partial-thickness donor site</Label></>}
  </>;
  return <>
    <path d="M128 94L153 59Q218 29 281 62L304 91L292 108L315 137L293 144L303 170L286 181L283 198L243 203L217 174L185 154L140 151Z" fill={tissue} stroke={ink} strokeWidth={2} />
    <path d="M157 165L170 215L203 252Q237 268 276 232L293 208L276 202L251 221L211 222L188 195L186 158Z" fill={tissue} stroke={ink} strokeWidth={2} />
    <path d="M225 179H279M220 211H272" stroke={ink} strokeWidth={6} strokeDasharray="5 3" />
    {detail && <><path d="M161 150L218 157L292 158M169 183L194 206L184 220" stroke={vessel} strokeWidth={2} strokeDasharray="5 4" /><path d="M158 87Q174 72 193 90Q191 109 172 110Z" fill="none" stroke={ink} /></>}
    {stage >= 3 && <g stroke={graft} strokeWidth={4}><path d="M207 149L216 174M262 153L265 175M177 191L196 214" />{[207,216,262,265,177,196].map((x,i)=><circle key={x} cx={x} cy={[149,174,153,175,191,214][i]} r={3} fill={ink} stroke={ink} strokeWidth={1}/>)}</g>}
    {stage >= 1 && stage < 4 && <><path d="M395 55H293L283 101L256 132L215 147" stroke={fluid} strokeWidth={6} fill="none" /><path d="M395 55H293L283 101L256 132L215 147" stroke={ink} strokeWidth={0.7} fill="none" /></>}
    {labels && <><Label x={21} y={33} tx={208} ty={80}>Maxilla</Label><Label x={24} y={275} tx={206} ty={249}>Mandible</Label><Label x={328} y={215} tx={269} ty={204}>Dental occlusion</Label>{detail && <Label x={26} y={125} tx={203} ty={155}>Le Fort I cut</Label>}{stage >= 3 && <Label x={320} y={296} tx={184} ty={202}>Plate fixation</Label>}{stage >= 1 && stage < 4 && <Label x={339} y={38} tx={353} ty={55}>Nasal tube</Label>}</>}
  </>;
}

export default function SpecialtyExpansionDiagram({ kind, operation }: { kind: Kind; operation: Operation }) {
  const [stage, setStage] = useState(0);
  const [labels, setLabels] = useState(true);
  const [detail, setDetail] = useState(true);
  const selected = operation.steps[stage];
  if (!selected) return null;
  const id = `op-${kind}`;
  const orientation = kind === "burn-graft" ? "Local skin section: surface above; deeper tissue below." : kind === "orthognathic" ? "Left lateral jaw schematic: anterior to the right." : "Local sagittal cutaway: anterior left; cranial above.";
  return <div className="my-6 space-y-4"><div className="bg-muted/30 rounded-xl border border-border p-4">
    <DiagramToggleBar title={operation.name} toggles={[{ label: "Sutures", active: detail, onChange: () => setDetail(v => !v) }, { label: "Labels", active: labels, onChange: () => setLabels(v => !v) }]} />
    <div role="group" aria-label={`${operation.name} stages`} className="flex flex-wrap gap-2 mb-4">{operation.steps.map((_,index)=><Button key={index} variant={stage===index ? "default" : "outline"} onClick={()=>setStage(index)} aria-pressed={stage===index} aria-label={`Stage ${index+1}`} className="w-10 h-10 p-0">{index+1}</Button>)}</div>
    <DiagramFigure id={id} title={`${operation.name}: stage ${stage+1}`} description={`${orientation} ${selected.step}`}>
      <svg viewBox="0 0 520 380" className="w-full max-w-xl h-auto mx-auto bg-card rounded-lg border border-border" {...svgImgProps({ id })}>
        <title id={`${id}-title`}>{operation.name}: stage {stage+1}</title><desc id={`${id}-desc`}>{orientation} {selected.step}. Educational schematic, not to scale.</desc>
        <IllustrationDefs id={id} />
        <defs><filter id={`${id}-depth`}><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={ink} floodOpacity={0.16}/></filter></defs>
        <g filter={`url(#${id}-depth)`}>{shadeIllustration(<Drawing kind={kind} stage={stage} detail={detail} labels={labels} id={id}/>,id)}</g>
        {detail && <path d="M260 15V32M260 353V369" stroke={ink} strokeDasharray="3 4" />}
        {labels && <g fill={ink} fontSize={10}><text x={235} y={15}>{kind==='burn-graft' ? 'Surface' : 'Cranial'}</text><text x={273} y={370}>{kind==='burn-graft' ? 'Deep' : 'Caudal'}</text><text x={8} y={360}>{kind==='burn-graft' ? 'Local section' : kind==='orthognathic' ? 'Posterior' : 'Anterior'}</text><text x={454} y={360}>{kind==='burn-graft' ? 'Local section' : kind==='orthognathic' ? 'Anterior' : 'Posterior'}</text></g>}
      </svg>
    </DiagramFigure>
    <div aria-live="polite" className="mt-4 min-h-[110px] border-l-4 border-primary pl-4 space-y-2"><p className="text-sm font-semibold text-foreground">{stage+1}. {selected.step}</p><p className="text-sm text-muted-foreground"><strong>Anaesthetic focus: </strong>{selected.anaesthetic}</p></div>
    <p className="text-xs text-muted-foreground mt-4">{orientation} Simplified teaching stages; technique and sequence vary. Sources are listed with the operation. Not consultant-reviewed.</p>
  </div></div>;
}