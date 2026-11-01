import { ReactNode, useId } from "react";

const tone = (role: string) => `hsl(var(--anatomy-${role}))`;
interface Props { selected: string | null; onSelect: (key: string) => void; labels?: boolean }
function Canvas({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  const id = useId();
  return <div className="overflow-x-auto max-w-full"><svg viewBox="0 0 560 450" className="w-full h-auto" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{title}</title><desc id={`${id}-desc`}>{description}</desc>
    <rect width="560" height="450" fill="hsl(var(--background))" />{children}
  </svg></div>;
}
function Pick({ id, selected, onSelect, children }: Props & { id: string; children: ReactNode }) {
  return <g data-structure={id} data-selected={selected === id} onClick={() => onSelect(id)} className="cursor-pointer" stroke={selected === id ? "hsl(var(--foreground))" : "hsl(var(--border))"} strokeWidth={selected === id ? 3 : 1}>{children}</g>;
}
const Label = ({ children, x, y }: { children: ReactNode; x: number; y: number }) => <text x={x} y={y} fontSize="15" fill="hsl(var(--foreground))" stroke="none">{children}</text>;

export const intercostalBands = [
  { id: "skin", x: 40, width: 35, role: "fat", label: "Skin / subcutaneous tissue" },
  { id: "ext-intercostal", x: 75, width: 45, role: "muscle", label: "External intercostal" },
  { id: "int-intercostal", x: 120, width: 45, role: "vein", label: "Internal intercostal" },
  { id: "neurovascular", x: 165, width: 24, role: "fat", label: "Neurovascular plane" },
  { id: "innermost", x: 189, width: 45, role: "nerve", label: "Innermost intercostal" },
  { id: "endothoracic", x: 234, width: 14, role: "fascia", label: "Endothoracic fascia" },
  { id: "parietal-pleura", x: 248, width: 10, role: "parietal", label: "Parietal pleura" },
  { id: "pleural-space", x: 258, width: 28, role: "csf", label: "Pleural potential space" },
  { id: "visceral-pleura", x: 286, width: 10, role: "visceral", label: "Visceral pleura" },
  { id: "lung", x: 296, width: 210, role: "organ", label: "Lung" },
];
export function IntercostalRelationships(props: Props) {
  return <><Canvas title="Intercostal parasagittal relationships" description="Superior up; superficial left to deep right. Muscle bands encode depth ordering only. Both ribs are in the chest wall. Principal vein, artery and nerve lie below the upper rib between internal and innermost intercostals. No needle or access point.">
    <Label x={40} y={28}>SUPERFICIAL → DEEP</Label><Label x={40} y={53}>SUPERIOR ↑</Label>
    {intercostalBands.map(b => <Pick key={b.id} id={b.id} {...props}><rect x={b.x} y={70} width={b.width} height={300} fill={tone(b.role)} fillOpacity={b.id === "int-intercostal" ? 0.4 : 0.65} /></Pick>)}
    {[{id:"rib-above", y:85, label:"Upper rib"},{id:"rib-below",y:300,label:"Lower rib"}].map(r => <Pick key={r.id} id={r.id} {...props}><rect x={73} y={r.y} width={163} height={55} rx={22} fill={tone("bone")} />{props.labels !== false && <Label x={105} y={r.y+33}>{r.label}</Label>}</Pick>)}
    <Pick id="neurovascular" {...props}>{[{y:151,role:"vein",label:"V — vein"},{y:174,role:"artery",label:"A — artery"},{y:197,role:"nerve",label:"N — nerve"}].map(v => <g key={v.role} data-vessel={v.role}><circle cx={177} cy={v.y} r={7} fill={tone(v.role)} />{props.labels !== false && <Label x={308} y={v.y+5}>{v.label}</Label>}</g>)}</Pick>
    {props.labels !== false && <Label x={354} y={280}>Lung</Label>}
    <Label x={40} y={399}>INFERIOR ↓</Label><Label x={40} y={428}>Potential pleural space exaggerated.</Label>
  </Canvas><div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mt-2">{intercostalBands.map(b => <div key={b.id} className="flex items-center gap-2"><svg width="16" height="16" aria-hidden="true"><rect width="16" height="16" fill={tone(b.role)} fillOpacity={b.id === "int-intercostal" ? 0.4 : 0.65} /></svg>{b.label}</div>)}</div>
  <p className="text-sm text-muted-foreground mt-3">Parasagittal relationship schematic, not to scale. Collateral anatomy varies. No needle route or individual access point is depicted.</p></>;
}
export const illustratedNeck = ["pretracheal", "prevertebral", "alar", "trachea", "vertebral"];
export function NeckRelationships(props: Props) {
  return <Canvas title="Central axial neck relationships" description="Anterior top, posterior bottom. Lateral anatomy omitted. Trachea and oesophagus within visceral envelope. Longus colli anterior to body inside prevertebral fascia. Connected pedicles and laminae enclose the canal and cord posterior to the body. Danger space only between alar and prevertebral layers; declared UAMS convention, not all cervical levels.">
    <Label x={202} y={25}>ANTERIOR ↑</Label>
    <Pick id="pretracheal" {...props}><ellipse cx={280} cy={95} rx={102} ry={59} fill={tone("csf")} fillOpacity={0.3} stroke={tone("vein")} /></Pick>
    <Pick id="trachea" {...props}><ellipse data-part="trachea" cx={280} cy={70} rx={36} ry={24} fill={tone("csf")} /><ellipse data-part="oesophagus" cx={280} cy={126} rx={42} ry={16} fill={tone("fat")} /></Pick>
    <Pick id="alar" {...props}><rect data-part="danger-space" x={176} y={172} width={208} height={16} fill={tone("organ")} fillOpacity={0.5} stroke="none" /><path data-part="alar-fascia" d="M176 169H384" stroke={tone("alar")} strokeWidth={props.selected === "alar" ? 5 : 3} /></Pick>
    <Pick id="prevertebral" {...props}><path data-part="prevertebral-fascia" d="M176 192Q137 240 169 391Q280 430 391 391Q423 240 384 192Z" fill={tone("fascia")} fillOpacity={0.25} stroke={tone("fascia")} /></Pick>
    <Pick id="vertebral" {...props}>
      <ellipse data-part="longus-colli-left" cx={235} cy={218} rx={29} ry={16} fill={tone("muscle")} /><ellipse data-part="longus-colli-right" cx={325} cy={218} rx={29} ry={16} fill={tone("muscle")} />
      <rect data-part="body" x={215} y={240} width={130} height={72} rx={24} fill={tone("bone")} />
      <path data-part="posterior-arch" d="M229 305L218 342Q224 375 263 383H297Q336 375 342 342L331 305" fill="none" stroke={tone("bone")} strokeWidth={16} />
      <ellipse data-part="canal" cx={280} cy={344} rx={39} ry={25} fill={tone("csf")} /><ellipse data-part="cord" cx={280} cy={344} rx={21} ry={15} fill={tone("nerve")} />
      <path data-part="spinous-process" d="M280 383V409" fill="none" stroke={tone("bone")} strokeWidth={12} />
    </Pick>
    {props.labels !== false && <g data-annotations="true"><Label x={248} y={75}>Trachea</Label><Label x={237} y={131}>Oesophagus</Label><Label x={392} y={166}>Alar fascia</Label><Label x={20} y={185}>Danger space</Label><Label x={20} y={218}>Prevertebral</Label><Label x={221} y={223}>LC</Label><Label x={312} y={223}>LC</Label><Label x={228} y={281}>Vertebral body</Label><Label x={263} y={349}>Cord</Label><path d="M136 180H176M133 214L171 214" fill="none" stroke="hsl(var(--foreground))" /></g>}
    <Label x={196} y={443}>POSTERIOR ↓</Label>
  </Canvas>;
}
export const pvsHighlights: Record<string,string> = {"vertebral-body":"medial", "disc-foramen":"medial", "superior-costotransverse":"posterior", "parietal-pleura":"anterolateral", "pvs-contents":"compartment"};
export function ParavertebralRelationships(props: Props) {
  const active = props.selected ? pvsHighlights[props.selected] : undefined;
  const edges = [{id:"medial",key:"vertebral-body",d:"M140 100V330",role:"bone",label:"Medial: body / disc / foramen",y:377},{id:"anterolateral",key:"parietal-pleura",d:"M140 100L425 330",role:"parietal",label:"Anterolateral: parietal pleura",y:402},{id:"posterior",key:"superior-costotransverse",d:"M140 330H425",role:"fascia",label:"Posterior: superior costotransverse ligament",y:427}];
  return <Canvas title="Paravertebral abstract axial boundary map" description="Anterior top, posterior bottom, medial left, lateral right. Triangle is a compartment, not a needle target. Superior and inferior continuity out of plane; neural, vascular and endothoracic detail omitted.">
    <Label x={225} y={28}>ANTERIOR ↑</Label><Label x={222} y={354}>POSTERIOR ↓</Label><Label x={15} y={245}>MEDIAL</Label><Label x={448} y={245}>LATERAL</Label>
    <Pick id="pvs-contents" {...props}><path data-part="compartment" d="M140 100L425 330H140Z" fill={tone("organ")} fillOpacity={0.35} /></Pick>
    {edges.map(e => <g key={e.id} data-boundary={e.id} data-selected={active === e.id} onClick={() => props.onSelect(e.key)} className="cursor-pointer"><path d={e.d} fill="none" stroke={tone(e.role)} strokeWidth={active === e.id ? 12 : 7} />{props.labels !== false && <g data-annotations="true"><path d={`M25 ${e.y-5}H52`} stroke={tone(e.role)} strokeWidth={7} /><Label x={64} y={e.y}>{e.label}</Label></g>}</g>)}
    {props.labels !== false && <><Label x={168} y={277}>Paravertebral</Label><Label x={211} y={302}>space</Label></>}
  </Canvas>;
}
export function EpiduralCompartment(props: Props) {
  return <Canvas title="Epidural catheter: conceptual sagittal compartment inset" description="Cranial up, caudal down. Illustrative catheter segment and cranial arrow remain wholly within epidural area outside dura and arachnoid. Inner region is subarachnoid CSF. No skin entry, Tuohy route or vertebral anatomy; catheter course is not predicted.">
    <Label x={140} y={28}>CRANIAL ↑</Label><Label x={140} y={434}>CAUDAL ↓</Label>
    <Pick id="epidural-fat" {...props}><rect data-part="epidural-compartment" x={70} y={60} width={160} height={330} fill={tone("fascia")} fillOpacity={0.4} /></Pick>
    <Pick id="dura" {...props}><rect data-part="dura" x={230} y={60} width={12} height={330} fill={tone("alar")} /></Pick>
    <rect data-part="arachnoid" x={245} y={60} width={5} height={330} fill={tone("parietal")} />
    <Pick id="csf" {...props}><rect data-part="subarachnoid-csf" x={250} y={60} width={235} height={330} fill={tone("csf")} fillOpacity={0.5} /></Pick>
    <g data-part="catheter" stroke="hsl(var(--foreground))" strokeWidth={4} fill="none"><path data-part="catheter-segment" d="M147 350V180Q147 152 171 127" /><path data-part="cranial-arrow" d="M160 130L175 123L171 139" /></g>
    {props.labels !== false && <g data-annotations="true"><Label x={84} y={87}>Epidural space</Label><Label x={275} y={87}>Subarachnoid CSF</Label><Label x={90} y={377}>Catheter segment</Label><Label x={350} y={185}>Dura</Label><Label x={350} y={217}>Arachnoid</Label><path d="M236 174H337M248 205H337" fill="none" stroke="hsl(var(--foreground))" /></g>}
  </Canvas>;
}
