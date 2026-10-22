import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { DiagramToggleBar } from "../shared/DiagramToggleBar";
import { Button } from "@/components/ui/button";
import { InlineRef } from "@/components/references/InlineRef";
import { IllustrationDefs, shadeIllustration, Leader, Sutures } from "./OperativeIllustration";

/* Local intraoral view looking superiorly at the palate: anterior above,
 * posterior below; patient's right on viewer's left. Layer insets use the
 * same orientation. Schematic bilateral cleft, not a prescribed technique. */
const tissue = "hsl(var(--muted))";
const ink = "hsl(var(--foreground))";
const muted = "hsl(var(--muted-foreground))";
const muscle = "hsl(var(--destructive))";
const tube = "hsl(var(--perioperative))";
const lining = "hsl(var(--primary))";

const stages = [
  { title: "Assessment", detail: "Assess feeding, growth, respiratory infection, syndromic features and cardiac disease. Review previous airway problems and agree a difficult-airway plan.", risk: "Micrognathia, syndromic anatomy and previous obstruction may complicate airway management." },
  { title: "Secure the airway", detail: "Induce anaesthesia and secure an oral south-facing RAE tube in the midline below the lower lip. Check depth, ventilation and capnography; the preformed curve may not fit every child.", risk: "Difficult laryngoscopy, endobronchial positioning or accidental extubation; preserve access to the tube." },
  { title: "Position and expose", detail: "Position the head and insert the Dingman mouth gag. Recheck tube patency and position after head movement or gag adjustment. A throat pack is optional, not a required step.", risk: "The gag can compress, kink or displace the tube. If a pack is used, record insertion and plan removal." },
  { title: "Reconstruct the palate", detail: "After local infiltration, mobilise the tissues and repair the nasal lining, reconstruct the levator sling and close the oral layer. Flap design and the precise sequence vary with the cleft and chosen technique.", risk: "Bleeding and secretions threaten the shared airway; check ventilation during gag adjustments and titrate opioids carefully." },
  { title: "Emergence and recovery", detail: "Release the gag, confirm removal of any pack, check haemostasis and suction under direct vision. Plan awake extubation when appropriate and monitor the airway throughout recovery; higher-risk children need an individual plan.", risk: "Palatal or tongue swelling, blood, laryngospasm and residual sedation can obstruct breathing. Agree a rescue plan without damaging the repair." },
] as const;

function Text({ x, y, children, end = false }: { x: number; y: number; children: string; end?: boolean }) {
  return <text x={x} y={y} textAnchor={end ? "end" : "start"} fontSize={12} fill={ink}>{children}</text>;
}

function RepairLayers({ showSutures }: { showSutures: boolean }) {
  return <div className="grid gap-4 sm:grid-cols-3 mt-4">
    {["Nasal lining closure", "Levator sling reconstruction", "Oral mucosal closure"].map((title, index) => <div key={title} className="min-w-0">
      <svg viewBox="0 0 180 150" role="img" aria-label={title} className="w-full max-w-[220px] mx-auto">
        <title>{title}</title>
        <path d="M35 115V59Q35 17 90 17Q145 17 145 59V115L110 137H70Z" fill={tissue} stroke={ink} />
        {index === 0 && <path d="M62 39Q90 28 118 39L111 117H69Z" fill={lining} fillOpacity={0.25} stroke={lining} />}
        {index === 1 && <><path d="M48 72L78 117M132 72L102 117" stroke={muscle} strokeWidth={7} strokeDasharray="4 4" opacity={0.45} /><path d="M46 111Q90 134 134 111" fill="none" stroke={muscle} strokeWidth={13} /><path d="M46 108Q90 131 134 108M47 115Q90 138 133 115" fill="none" stroke={ink} strokeWidth={0.7} /></>}
        {index === 2 && <><path d="M46 45Q69 30 90 35V132H68L48 114Z M134 45Q111 30 90 35V132H112L132 114Z" fill={tube} fillOpacity={0.25} stroke={ink} /><path d="M90 130Q81 143 76 132M90 130Q99 143 104 132" fill="none" stroke={ink} /></>}
        {showSutures && index !== 1 && <Sutures x={90} y={45} vertical count={11} />}
      </svg>
      <p className="text-xs font-semibold text-foreground text-center">{index + 1}. {title}</p>
      <p className="text-xs text-muted-foreground mt-1">{index === 0 ? "Separate the nasal and oral cavities with a tension-free nasal layer." : index === 1 ? "Dashed: abnormal longitudinal muscle orientation. Solid: reconstructed transverse sling (conceptual)." : "Oral flaps cover the deeper repair. Incision pattern varies by technique."}</p>
    </div>)}
  </div>;
}

export default function CleftPalateRepairDiagram() {
  const [stage, setStage] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const [showSutures, setShowSutures] = useState(true);
  const selected = stages[stage];
  const id = "op-cleft-palate";
  const intubated = stage >= 1 && stage <= 3;
  const gag = stage === 2 || stage === 3;
  const closed = stage >= 3;

  return <div className="my-6 space-y-4">
    <div className="bg-muted/30 rounded-xl border border-border p-4">
      <DiagramToggleBar title="Cleft palate repair: five stages and the shared airway" toggles={[
        { label: "Sutures", active: showSutures, onChange: () => setShowSutures(value => !value) },
        { label: "Labels", active: showLabels, onChange: () => setShowLabels(value => !value) },
      ]} />
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4" role="group" aria-label="Stages of cleft palate repair">
        {stages.map((item, index) => <Button key={item.title} variant={stage === index ? "default" : "outline"} onClick={() => setStage(index)} aria-pressed={stage === index} className="h-auto min-h-12 whitespace-normal text-xs px-2 py-2 gap-2">
          <span className="font-semibold shrink-0">{index + 1}</span><span>{item.title}</span>
        </Button>)}
      </div>
      <DiagramFigure id={id} title={`Stage ${stage + 1}: ${selected.title}`} description="Intraoral schematic: anterior above, posterior below, patient’s right on the viewer’s left. The open cleft becomes a repaired palate; a midline oral tube and mouth gag appear during anaesthesia. Repair layer insets distinguish nasal lining, levator sling and oral closure.">
        <svg viewBox="0 0 520 380" className="w-full max-w-xl h-auto mx-auto rounded-lg border border-border bg-card" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
          <title id={`${id}-title`}>{`Cleft palate repair — ${selected.title}`}</title>
          <desc id={`${id}-desc`}>{selected.detail} Airway risks: {selected.risk}</desc>
          <IllustrationDefs id={id} />
          <defs>
            <pattern id={`${id}-rugae`} width="14" height="18" patternUnits="userSpaceOnUse"><path d="M0 8Q7 3 14 8" stroke={muted} strokeWidth={0.6} opacity={0.3} fill="none" /></pattern>
            <filter id={`${id}-depth`} x="-10%" y="-10%" width="120%" height="120%"><feDropShadow dx="0" dy="2" stdDeviation="2" floodColor={ink} floodOpacity={0.15} /></filter>
          </defs>
          {shadeIllustration(<g>
            <path d="M112 277Q65 232 83 148Q105 54 260 48Q415 54 437 148Q455 232 408 277Q352 326 260 326Q168 326 112 277Z" fill={tissue} stroke={ink} strokeWidth={2} filter={`url(#${id}-depth)`} />
            <path d="M151 208V141Q154 76 260 75Q366 76 369 141V208L310 263H210Z" fill={tissue} stroke={ink} strokeWidth={1.5} />
            {showSutures && <path d="M160 192V144Q166 86 260 86Q354 86 360 144V192Z" fill={`url(#${id}-rugae)`} />}
            {[0,1,2,3,4].map(i => <g key={i} fill={tissue} stroke={ink}><rect x={120 + i * 20} y={115 - i * 9} width={15} height={19} rx={4} transform={`rotate(${-25 + i * 5} ${128 + i * 20} ${124 - i * 9})`} /><rect x={385 - i * 20} y={115 - i * 9} width={15} height={19} rx={4} transform={`rotate(${25 - i * 5} ${393 - i * 20} ${124 - i * 9})`} /></g>)}
            <path d="M230 91Q242 123 241 161L229 212L245 252M290 91Q278 123 279 161L291 212L275 252" stroke={ink} fill="none" />
            {!closed && <path d="M252 89Q249 133 248 162L238 214L249 253L260 242L271 253L282 214L272 162Q271 133 268 89Z" fill={lining} fillOpacity={0.3} stroke={lining} strokeWidth={1.5} />}
            {closed && <><path d="M239 92Q260 84 281 92L280 203Q296 231 272 255Q260 274 248 255Q224 231 240 203Z" fill={tissue} stroke={ink} /><path d="M223 227Q260 244 297 227" fill="none" stroke={muscle} strokeWidth={9} opacity={stage === 3 ? 0.65 : 0.2} />{showSutures && <Sutures x={260} y={105} vertical count={19} />}</>}
            <path d="M159 279Q171 252 218 268Q260 280 302 268Q349 252 361 279L344 302Q260 332 176 302Z" fill={muscle} fillOpacity={stage === 4 ? 0.35 : 0.15} stroke={ink} />
            {intubated && <><path d="M260 369V298Q261 280 260 264L260 279" fill="none" stroke={tube} strokeWidth={11} strokeLinecap="round" /><path d="M260 369V298Q261 280 260 264" fill="none" stroke={ink} strokeWidth={1} /><path d="M227 338H293" stroke={muted} strokeWidth={9} /></>}
            {gag && <g fill="none" stroke={ink}><path d="M106 155L85 138V280H435V138L414 155" strokeWidth={4} /><path d="M105 152L143 165M415 152L377 165" strokeWidth={4} /><path d="M238 269V304H282V269" strokeWidth={3} /><path d="M244 272V298H276V272" stroke={muted} strokeWidth={5} /></g>}
          </g>, id)}
          {showSutures && <path d="M260 52V76M260 346V362" stroke={muted} strokeDasharray="3 4" />}
          {showLabels && <g>
            <Text x={233} y={23}>Anterior</Text><Text x={229} y={358}>Posterior</Text>
            <Text x={15} y={191}>Patient R</Text><Text x={505} y={191} end>Patient L</Text>
            <Text x={18} y={48}>Hard palate</Text><Leader from={[94,52]} to={[201,139]} />
            <Text x={352} y={46}>{closed ? "Midline repair" : "Open cleft"}</Text><Leader from={[352,51]} to={[260,157]} />
            <Text x={18} y={238}>Soft palate</Text><Leader from={[99,233]} to={[231,219]} />
            <Text x={389} y={321}>Tongue</Text><Leader from={[382,316]} to={[325,288]} />
            {intubated && <><Text x={18} y={338}>Midline RAE tube</Text><Leader from={[130,333]} to={[260,322]} /></>}
            {gag && <><Text x={368} y={102}>Mouth gag</Text><Leader from={[371,108]} to={[435,143]} /><Text x={18} y={300}>Tongue blade</Text><Leader from={[105,295]} to={[244,284]} /></>}
          </g>}
        </svg>
      </DiagramFigure>
      {stage === 3 && <RepairLayers showSutures={showSutures} />}
      <div className="mt-4 min-h-[110px] border-l-4 border-primary pl-4 space-y-2" aria-live="polite">
        <p className="font-semibold text-sm text-foreground">{stage + 1}. {selected.title}</p>
        <p className="text-sm text-muted-foreground">{selected.detail}</p>
        <p className="text-sm text-foreground"><strong className="text-destructive">Airway risk: </strong>{selected.risk}</p>
      </div>
      <p className="text-xs text-muted-foreground mt-4">Schematic, not to scale. The five stages follow the library entry; reconstruction insets show shared principles, not a single operative technique. Source-checked teaching, not consultant-reviewed.</p>
      <p className="text-xs text-muted-foreground mt-2">Airway and perioperative care: <InlineRef topicId="operative-steps" refLabel="Denning Cleft Anaesthesia 2021" /> <InlineRef topicId="operative-steps" refLabel="Desalu Cleft Airway 2010" />. Reconstruction principles: <a className="text-primary underline" href="https://doi.org/10.1097/PRS.0000000000000184" target="_blank" rel="noopener noreferrer">Cleft palate repair and velopharyngeal dysfunction (2014)</a>.</p>
    </div>
  </div>;
}