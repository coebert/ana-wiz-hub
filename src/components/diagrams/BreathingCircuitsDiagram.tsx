import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ───────── Corrugated tubing helper ───────── */
const CorrugatedTube = ({ x1, y1, x2, y2, colour = "hsl(var(--foreground))", width = 12 }: { x1: number; y1: number; x2: number; y2: number; colour?: string; width?: number }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const segments = Math.max(4, Math.round(len / 8));
  const nx = -dy / len;
  const ny = dx / len;
  const amp = width / 2;

  let d = `M ${x1} ${y1}`;
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const mx = x1 + dx * (t - 0.5 / segments);
    const my = y1 + dy * (t - 0.5 / segments);
    const sign = i % 2 === 0 ? 1 : -1;
    const cx = mx + nx * amp * sign;
    const cy = my + ny * amp * sign;
    const ex = x1 + dx * t;
    const ey = y1 + dy * t;
    d += ` Q ${cx} ${cy} ${ex} ${ey}`;
  }
  return <path d={d} fill="none" stroke={colour} strokeWidth="2" opacity="0.55" />;
};

/* ───────── Reservoir bag shape ───────── */
const ReservoirBag = ({ cx, cy, r = 18, colour = "hsl(var(--primary))" }: { cx: number; cy: number; r?: number; colour?: string }) => (
  <g>
    <ellipse cx={cx} cy={cy + r * 0.15} rx={r * 0.85} ry={r} fill={`${colour}`} fillOpacity="0.12" stroke={colour} strokeWidth="1.5" />
    {/* neck */}
    <rect x={cx - r * 0.22} y={cy - r - 2} width={r * 0.44} height={6} rx={2} fill={`${colour}`} fillOpacity="0.2" stroke={colour} strokeWidth="1" />
    <text x={cx} y={cy + 4} textAnchor="middle" fontSize="7" fill={colour} fontWeight="bold">Bag</text>
  </g>
);

/* ───────── APL valve ───────── */
const APLValve = ({ cx, cy }: { cx: number; cy: number }) => (
  <g>
    <rect x={cx - 12} y={cy - 14} width={24} height={28} rx={5} fill="hsl(var(--destructive)/0.12)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
    {/* Spring symbol */}
    <path d={`M ${cx - 5} ${cy - 8} L ${cx + 5} ${cy - 5} L ${cx - 5} ${cy - 2} L ${cx + 5} ${cy + 1} L ${cx - 5} ${cy + 4} L ${cx + 5} ${cy + 7}`} fill="none" stroke="hsl(var(--destructive))" strokeWidth="1" />
    <text x={cx} y={cy + 18} textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))" fontWeight="bold">APL</text>
  </g>
);

/* ───────── Patient end ───────── */
const PatientEnd = ({ cx, cy }: { cx: number; cy: number }) => (
  <g>
    {/* Face/mask outline */}
    <path d={`M ${cx - 10} ${cy + 8} Q ${cx - 12} ${cy - 2} ${cx - 6} ${cy - 10} Q ${cx} ${cy - 14} ${cx + 6} ${cy - 10} Q ${cx + 12} ${cy - 2} ${cx + 10} ${cy + 8} Z`}
      fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--foreground))" strokeWidth="1.2" />
    <text x={cx} y={cy + 2} textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Pt</text>
  </g>
);

/* ───────── FGF inlet ───────── */
const FGFInlet = ({ cx, cy, label }: { cx: number; cy: number; label?: string }) => (
  <g>
    <rect x={cx - 10} y={cy - 8} width={20} height={16} rx={4} fill="#10B981" fillOpacity="0.18" stroke="#10B981" strokeWidth="1.5" />
    <line x1={cx} y1={cy - 8} x2={cx} y2={cy - 16} stroke="#10B981" strokeWidth="2" />
    <polygon points={`${cx - 4},${cy - 16} ${cx + 4},${cy - 16} ${cx},${cy - 10}`} fill="#10B981" />
    <text x={cx} y={cy + 2} textAnchor="middle" fontSize="6" fill="#10B981" fontWeight="bold">FGF</text>
    {label && <text x={cx} y={cy + 14} textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">{label}</text>}
  </g>
);

/* ───────── Unidirectional valve (disc) ───────── */
const UniValve = ({ cx, cy, colour, label }: { cx: number; cy: number; colour: string; label: string }) => (
  <g>
    <circle cx={cx} cy={cy} r={11} fill={`${colour}`} fillOpacity="0.1" stroke={colour} strokeWidth="1.5" />
    {/* Disc inside */}
    <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke={colour} strokeWidth="2" />
    <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke={colour} strokeWidth="1" strokeDasharray="2,2" />
    <text x={cx} y={cy + 20} textAnchor="middle" fontSize="6" fill={colour} fontWeight="bold">{label}</text>
  </g>
);

/* ═══════════════════════════════════════ MAPLESON TAB ═══════════════════════════════════════ */
const MaplesonTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Mapleson Classification (A–F)</h3>
    <p className="text-sm text-muted-foreground">
      Semi-open breathing circuits classified by the relative positions of FGF inlet, reservoir bag, APL valve, and corrugated tubing. Efficiency depends on the mode of ventilation.
    </p>
    <div className="bg-secondary/30 rounded-xl p-3 border border-border">
      <svg viewBox="0 0 520 620" className="w-full h-auto">
        <defs>
          <marker id="bcFlow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#10B981" /></marker>
          <marker id="bcExpFlow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="hsl(var(--destructive))" /></marker>
          <linearGradient id="tubeFill" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.05" /><stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" /></linearGradient>
        </defs>

        {/* ──── Mapleson A (Magill) ──── */}
        <g transform="translate(0,0)">
          <rect x="10" y="5" width="500" height="82" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">A — Magill</text>
          <text x="260" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">Most efficient for spontaneous ventilation (FGF ≈ MV)</text>

          <FGFInlet cx={55} cy={55} />
          <ReservoirBag cx={110} cy={55} r={14} />
          <CorrugatedTube x1={135} y1={55} x2={370} y2={55} />
          {/* Gas flow arrow along tubing */}
          <line x1="160" y1="42" x2="340" y2="42" stroke="#10B981" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#bcFlow)" />
          <text x="250" y="39" textAnchor="middle" fontSize="6" fill="#10B981">Inspiratory flow →</text>
          <APLValve cx={390} cy={55} />
          {/* Expiratory outflow arrow */}
          <line x1="390" y1="30" x2="390" y2="15" stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#bcExpFlow)" />
          <text x="415" y="18" fontSize="5" fill="hsl(var(--destructive))">Exhaust</text>
          <PatientEnd cx={445} cy={55} />
          {/* Connection line APL→Patient */}
          <line x1="403" y1="55" x2="435" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.4" />
        </g>

        {/* ──── Mapleson B ──── */}
        <g transform="translate(0,95)">
          <rect x="10" y="5" width="500" height="82" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">B</text>
          <text x="50" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">FGF & APL near patient; bag at machine end</text>

          <ReservoirBag cx={60} cy={55} r={14} />
          <CorrugatedTube x1={85} y1={55} x2={340} y2={55} />
          <FGFInlet cx={365} cy={55} />
          <APLValve cx={405} cy={55} />
          <line x1="405" y1="30" x2="405" y2="15" stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#bcExpFlow)" />
          <PatientEnd cx={455} cy={55} />
          <line x1="418" y1="55" x2="445" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.4" />
        </g>

        {/* ──── Mapleson C (Waters) ──── */}
        <g transform="translate(0,190)">
          <rect x="10" y="5" width="500" height="82" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">C — Waters</text>
          <text x="130" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">Short tubing; FGF & APL between bag and patient</text>

          <ReservoirBag cx={60} cy={55} r={14} />
          <FGFInlet cx={110} cy={55} />
          <APLValve cx={155} cy={55} />
          <line x1="155" y1="30" x2="155" y2="15" stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#bcExpFlow)" />
          <CorrugatedTube x1={170} y1={55} x2={420} y2={55} />
          <PatientEnd cx={450} cy={55} />
        </g>

        {/* ──── Mapleson D (Bain) ──── */}
        <g transform="translate(0,285)">
          <rect x="10" y="5" width="500" height="95" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">D — Bain (coaxial)</text>
          <text x="195" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">Most efficient for controlled ventilation</text>

          <APLValve cx={60} cy={55} />
          <line x1="60" y1="30" x2="60" y2="15" stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#bcExpFlow)" />
          <ReservoirBag cx={110} cy={55} r={14} />

          {/* Outer corrugated tube (expiratory) */}
          <CorrugatedTube x1={135} y1={55} x2={420} y2={55} width={14} />
          {/* Inner tube (FGF - dashed green) */}
          <line x1="135" y1="55" x2="420" y2="55" stroke="#10B981" strokeWidth="2" strokeDasharray="6,3" />
          <text x="280" y="48" textAnchor="middle" fontSize="6" fill="#10B981" fontWeight="bold">← Inner FGF tube (coaxial) →</text>
          <text x="280" y="68" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">Outer tube carries expired gas back</text>

          <PatientEnd cx={450} cy={55} />

          {/* Pethick test note */}
          <rect x="120" y="78" width="290" height="16" rx="4" fill="hsl(var(--destructive)/0.06)" stroke="hsl(var(--destructive)/0.3)" strokeWidth="0.8" />
          <text x="265" y="89" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">⚠ Pethick test: occlude inner tube + flush O₂ → should not pressurise circuit</text>
        </g>

        {/* ──── Mapleson E (Ayre's T-piece) ──── */}
        <g transform="translate(0,395)">
          <rect x="10" y="5" width="500" height="82" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">E — Ayre's T-piece</text>
          <text x="195" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">No valves, no bag → minimal resistance → neonates</text>

          {/* Open expiratory limb */}
          <CorrugatedTube x1={50} y1={55} x2={300} y2={55} />
          <text x="175" y="72" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Open expiratory limb (to atmosphere)</text>
          <line x1="50" y1="55" x2="35" y2="55" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <text x="22" y="58" fontSize="7" fill="hsl(var(--muted-foreground))">→ atm</text>

          {/* T-junction */}
          <rect x="300" y="40" width="25" height="30" rx="4" fill="hsl(var(--foreground)/0.08)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <text x="312" y="58" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))" fontWeight="bold">T</text>

          <FGFInlet cx={312} cy={30} />

          <line x1="325" y1="55" x2="430" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.4" />
          <PatientEnd cx={450} cy={55} />
        </g>

        {/* ──── Mapleson F (Jackson-Rees) ──── */}
        <g transform="translate(0,490)">
          <rect x="10" y="5" width="500" height="82" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">F — Jackson-Rees</text>
          <text x="215" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">T-piece + open-tail bag → allows IPPV in paediatrics</text>

          {/* Expiratory limb with open-tail bag */}
          <CorrugatedTube x1={120} y1={55} x2={300} y2={55} />
          <ReservoirBag cx={70} cy={55} r={14} />
          {/* Open tail */}
          <line x1="58" y1="42" x2="45" y2="30" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <text x="30" y="28" fontSize="5" fill="hsl(var(--muted-foreground))">Open tail</text>

          {/* T-junction */}
          <rect x="300" y="40" width="25" height="30" rx="4" fill="hsl(var(--foreground)/0.08)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <text x="312" y="58" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))" fontWeight="bold">T</text>

          <FGFInlet cx={312} cy={30} />

          <line x1="325" y1="55" x2="430" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.4" />
          <PatientEnd cx={450} cy={55} />
        </g>

        {/* ──── Efficiency summary ──── */}
        <rect x="30" y="580" width="460" height="34" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.4)" strokeWidth="1.5" />
        <text x="260" y="594" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Spontaneous: A {">"} D,F,E {">"} C {">"} B</text>
        <text x="260" y="608" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Controlled: D,F,E {">"} B {">"} C {">"} A</text>
      </svg>
    </div>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Points</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Mapleson A (Magill)</strong>: APL near patient vents alveolar gas first during expiration → most efficient for spontaneous ventilation; FGF ≈ MV (~70 mL/kg/min)</li>
        <li><strong>Mapleson D (Bain)</strong>: coaxial — inner tube delivers FGF to patient end; most efficient for controlled ventilation; FGF 70–100 mL/kg/min</li>
        <li><strong>Mapleson E (Ayre's T-piece)</strong>: no valves, no bag → minimal dead space & resistance → ideal for neonates/infants (&lt;20 kg)</li>
        <li><strong>Mapleson F (Jackson-Rees)</strong>: T-piece + open-tail reservoir bag → enables IPPV while maintaining low resistance</li>
        <li><strong>Lack of Fink valve</strong>: all Mapleson circuits are semi-open; they prevent rebreathing via high FGF, not CO₂ absorption</li>
      </ul>
    </div>
  </div>
);

/* ═══════════════════════════════════════ CIRCLE SYSTEM ═══════════════════════════════════════ */
const CircleTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Circle Breathing System</h3>
    <div className="bg-secondary/30 rounded-xl p-3 border border-border">
      <svg viewBox="0 0 520 480" className="w-full h-auto">
        <defs>
          <marker id="cInsp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="#10B981" /></marker>
          <marker id="cExp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="hsl(var(--destructive))" /></marker>
          <linearGradient id="inspGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10B981" stopOpacity="0.15" /><stop offset="100%" stopColor="#10B981" stopOpacity="0.03" /></linearGradient>
          <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.15" /><stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0.03" /></linearGradient>
        </defs>

        <text x="260" y="20" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">Circle System — 7 Essential Components</text>

        {/* ── Main circular path (oval) ── */}
        {/* Inspiratory limb (left side - green) */}
        <path d="M 175 65 Q 60 65 60 200 Q 60 360 175 370" fill="none" stroke="#10B981" strokeWidth="4" opacity="0.3" />
        {/* Expiratory limb (right side - red) */}
        <path d="M 345 65 Q 460 65 460 200 Q 460 360 345 370" fill="none" stroke="hsl(var(--destructive))" strokeWidth="4" opacity="0.3" />

        {/* Flow direction arrows */}
        <line x1="68" y1="140" x2="68" y2="180" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#cInsp)" />
        <text x="48" y="165" fontSize="6" fill="#10B981" fontWeight="bold" transform="rotate(-90,48,165)">INSP</text>

        <line x1="452" y1="180" x2="452" y2="140" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#cExp)" />
        <text x="472" y="165" fontSize="6" fill="hsl(var(--destructive))" fontWeight="bold" transform="rotate(90,472,165)">EXP</text>

        {/* ── Y-piece at top ── */}
        <rect x="215" y="38" width="90" height="28" rx="6" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--foreground))" strokeWidth="2" />
        <text x="260" y="56" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Y-piece</text>
        {/* Lines from Y to insp/exp limbs */}
        <line x1="215" y1="52" x2="175" y2="65" stroke="#10B981" strokeWidth="2" opacity="0.5" />
        <line x1="305" y1="52" x2="345" y2="65" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.5" />
        {/* Patient */}
        <PatientEnd cx={260} cy={20} />
        <line x1="260" y1="30" x2="260" y2="38" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* ── 1. Inspiratory unidirectional valve ── */}
        <UniValve cx={100} cy={110} colour="#10B981" label="Insp. valve" />

        {/* ── 2. Expiratory unidirectional valve ── */}
        <UniValve cx={420} cy={110} colour="hsl(var(--destructive))" label="Exp. valve" />

        {/* ── 3. CO₂ absorber (bottom centre) ── */}
        <rect x="170" y="340" width="180" height="70" rx="12" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Granules */}
        {Array.from({ length: 35 }).map((_, i) => {
          const gx = 185 + (i % 7) * 23;
          const gy = 358 + Math.floor(i / 7) * 14;
          const exhausted = i === 28 || i === 29;
          return (
            <circle key={i} cx={gx} cy={gy} r="5"
              fill={exhausted ? "#A855F7" : "hsl(var(--primary)/0.15)"}
              fillOpacity={exhausted ? 0.5 : 0.4}
              stroke={exhausted ? "#A855F7" : "hsl(var(--primary)/0.4)"}
              strokeWidth="0.7" />
          );
        })}
        <text x="260" y="406" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">CO₂ Absorber (Soda Lime)</text>
        <text x="260" y="418" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Exothermic — produces heat + H₂O</text>
        {/* Connection from bottom of circle to absorber */}
        <line x1="175" y1="370" x2="175" y2="350" stroke="#10B981" strokeWidth="2" opacity="0.4" />
        <line x1="345" y1="370" x2="345" y2="350" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.4" />

        {/* ── 4. FGF inlet ── */}
        <FGFInlet cx={260} cy={320} label="Fresh gas inlet" />

        {/* ── 5. APL valve (on expiratory side) ── */}
        <APLValve cx={430} cy={270} />
        <line x1="430" y1="248" x2="430" y2="235" stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#cExp)" />
        <text x="450" y="232" fontSize="5" fill="hsl(var(--destructive))">Exhaust</text>

        {/* ── 6. Reservoir bag ── */}
        <ReservoirBag cx={90} cy={290} r={20} />

        {/* ── Component labels (numbered) ── */}
        <g fontSize="7" fill="hsl(var(--muted-foreground))">
          <text x="260" y="440" textAnchor="middle" fontWeight="bold" fill="hsl(var(--foreground))" fontSize="8">7 Components:</text>
          <text x="260" y="454" textAnchor="middle">① FGF inlet  ② Insp. valve  ③ Exp. valve  ④ Y-piece  ⑤ APL valve  ⑥ Bag  ⑦ CO₂ absorber</text>
        </g>

        {/* ── Low-flow box ── */}
        <rect x="115" y="460" width="290" height="18" rx="5" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
        <text x="260" y="473" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Low-flow: 0.5–1 L/min • Closed: FGF = uptake only (~200 mL/min)</text>
      </svg>
    </div>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Circle System Key Facts</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>7 components</strong>: FGF inlet, inspiratory & expiratory unidirectional valves, Y-piece, APL valve, reservoir bag, CO₂ absorber</li>
        <li><strong>Unidirectional valves</strong>: mica or plastic discs; ensure one-way flow. Malfunction (sticking) → rebreathing → ↑ETCO₂</li>
        <li>Allows <strong>low-flow</strong> (0.5–1 L/min), <strong>minimal-flow</strong> (&lt;0.5 L/min), and <strong>closed-circuit</strong> anaesthesia</li>
        <li><strong>Advantages</strong>: conserves volatile agents & O₂, warms & humidifies inspired gas, reduces pollution & cost</li>
        <li><strong>Disadvantages</strong>: higher circuit resistance (valves + absorber), bulky, requires vigilance (inspired O₂, agent concentration)</li>
        <li><strong>Monitoring in low-flow</strong>: inspired O₂ (risk of hypoxic mixture), inspired agent concentration, ETCO₂ (absorber exhaustion)</li>
      </ul>
    </div>
  </div>
);

/* ═══════════════════════════════════════ SODA LIME TAB ═══════════════════════════════════════ */
const SodaLimeTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Soda Lime & CO₂ Absorption</h3>
    <div className="bg-secondary/30 rounded-xl p-3 border border-border">
      <svg viewBox="0 0 520 520" className="w-full h-auto">
        <text x="260" y="20" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">CO₂ Absorption — Chemistry & Hazards</text>

        {/* ── Soda Lime Canister (detailed) ── */}
        <rect x="170" y="35" width="180" height="160" rx="12" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Top mesh */}
        <line x1="175" y1="55" x2="345" y2="55" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" />
        {/* Bottom mesh */}
        <line x1="175" y1="175" x2="345" y2="175" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" />

        <text x="260" y="48" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">Soda Lime Canister</text>

        {/* Granules - mixed fresh and exhausted */}
        {Array.from({ length: 48 }).map((_, i) => {
          const gx = 188 + (i % 8) * 19;
          const gy = 68 + Math.floor(i / 8) * 18;
          const exhausted = (Math.floor(i / 8) >= 4); // bottom rows exhausted
          return (
            <circle key={i} cx={gx} cy={gy} r="6.5"
              fill={exhausted ? "#A855F7" : "hsl(var(--primary)/0.12)"}
              fillOpacity={exhausted ? 0.4 : 0.5}
              stroke={exhausted ? "#7C3AED" : "hsl(var(--primary)/0.5)"}
              strokeWidth="0.8" />
          );
        })}

        {/* Indicator label */}
        <rect x="355" y="115" width="140" height="40" rx="6" fill="#A855F7" fillOpacity="0.08" stroke="#7C3AED" strokeWidth="1" />
        <text x="425" y="132" textAnchor="middle" fontSize="7" fill="#7C3AED" fontWeight="bold">Indicator: Ethyl Violet</text>
        <text x="425" y="145" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">White → Purple when exhausted</text>
        <line x1="350" y1="135" x2="355" y2="135" stroke="#7C3AED" strokeWidth="1" />

        {/* Gas in/out arrows */}
        <line x1="260" y1="200" x2="260" y2="210" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

        {/* ── Composition box ── */}
        <rect x="30" y="35" width="130" height="110" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <text x="95" y="52" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">Composition</text>
        {[
          { comp: "Ca(OH)₂", pct: "~80%", note: "active absorbent" },
          { comp: "H₂O", pct: "~14%", note: "essential for rxn" },
          { comp: "NaOH", pct: "~4%", note: "catalyst (regenerated)" },
          { comp: "KOH", pct: "~1%", note: "catalyst" },
          { comp: "Silica", pct: "trace", note: "hardener" },
        ].map((c, i) => (
          <g key={c.comp}>
            <text x="40" y={70 + i * 15} fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">{c.comp}</text>
            <text x="90" y={70 + i * 15} fontSize="7" fill="hsl(var(--foreground))">{c.pct}</text>
            <text x="118" y={70 + i * 15} fontSize="5.5" fill="hsl(var(--muted-foreground))">{c.note}</text>
          </g>
        ))}

        {/* ── Reaction pathway ── */}
        <rect x="30" y="220" width="460" height="130" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <text x="260" y="240" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">Reaction Pathway</text>

        {/* Step 1 */}
        <rect x="50" y="250" width="200" height="24" rx="5" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
        <text x="55" y="265" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">①</text>
        <text x="70" y="265" fontSize="8" fill="hsl(var(--primary))">CO₂ + H₂O → H₂CO₃</text>
        <text x="195" y="265" fontSize="6" fill="hsl(var(--muted-foreground))">(carbonic acid)</text>

        {/* Arrow */}
        <line x1="150" y1="276" x2="150" y2="283" stroke="hsl(var(--foreground))" strokeWidth="1" />

        {/* Step 2 */}
        <rect x="50" y="285" width="290" height="24" rx="5" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
        <text x="55" y="300" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">②</text>
        <text x="70" y="300" fontSize="8" fill="hsl(var(--primary))">H₂CO₃ + 2NaOH → Na₂CO₃ + 2H₂O + Heat</text>

        {/* Arrow */}
        <line x1="150" y1="311" x2="150" y2="318" stroke="hsl(var(--foreground))" strokeWidth="1" />

        {/* Step 3 */}
        <rect x="50" y="320" width="290" height="24" rx="5" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
        <text x="55" y="335" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">③</text>
        <text x="70" y="335" fontSize="8" fill="hsl(var(--primary))">Na₂CO₃ + Ca(OH)₂ → CaCO₃ + 2NaOH</text>
        <text x="315" y="335" fontSize="6" fill="#10B981" fontWeight="bold">↻ NaOH regenerated</text>

        {/* Net reaction */}
        <rect x="360" y="260" width="120" height="42" rx="6" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="1.2" />
        <text x="420" y="276" textAnchor="middle" fontSize="7" fill="#F59E0B" fontWeight="bold">Net Reaction:</text>
        <text x="420" y="292" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))">CO₂ → CaCO₃ + H₂O</text>
        <text x="420" y="304" textAnchor="middle" fontSize="6" fill="#F59E0B">+ Heat (40–60°C)</text>

        {/* ── Hazards section ── */}
        <text x="260" y="370" textAnchor="middle" fontSize="10" fill="hsl(var(--destructive))" fontWeight="bold">⚠ Hazards of Desiccated Soda Lime</text>

        {/* Compound A */}
        <rect x="30" y="380" width="225" height="65" rx="8" fill="hsl(var(--destructive)/0.05)" stroke="hsl(var(--destructive)/0.3)" strokeWidth="1" />
        <text x="142" y="398" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontWeight="bold">Compound A</text>
        <text x="142" y="413" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))">Sevoflurane + desiccated soda lime</text>
        <text x="142" y="426" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Fluoromethyl-2,2-difluoro-1-vinyl ether</text>
        <text x="142" y="438" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">Nephrotoxic in rats (FGF &gt;2 L/min mitigates)</text>

        {/* CO production */}
        <rect x="265" y="380" width="225" height="65" rx="8" fill="hsl(var(--destructive)/0.05)" stroke="hsl(var(--destructive)/0.3)" strokeWidth="1" />
        <text x="377" y="398" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontWeight="bold">Carbon Monoxide</text>
        <text x="377" y="413" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))">Desflurane + desiccated soda lime</text>
        <text x="377" y="426" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Especially with baralyme / KOH</text>
        <text x="377" y="438" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">Worse on Monday morning (weekend desiccation)</text>

        {/* Prevention */}
        <rect x="30" y="455" width="460" height="55" rx="8" fill="#10B981" fillOpacity="0.06" stroke="#10B981" strokeOpacity="0.3" strokeWidth="1" />
        <text x="260" y="472" textAnchor="middle" fontSize="8" fill="#10B981" fontWeight="bold">Prevention Strategies</text>
        <text x="260" y="487" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Turn off FGF when not in use • Use Ca(OH)₂-only absorbent (Amsorb® — no NaOH/KOH)</text>
        <text x="260" y="500" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Change soda lime if desiccated • Granule size 4–8 mesh • Capacity ~26 L CO₂ / 100g</text>
      </svg>
    </div>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Soda Lime Key Facts</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Indicator</strong>: ethyl violet (white → purple when exhausted); may reverse colour overnight ("regeneration") — misleading</li>
        <li><strong>Exothermic</strong>: produces heat (warms gas) and water (humidifies); beneficial in low-flow</li>
        <li><strong>Granule size</strong>: 4–8 mesh — too fine → ↑resistance; too coarse → ↓surface area → ↓absorption</li>
        <li><strong>Compound A</strong>: sevoflurane + desiccated soda lime → nephrotoxic. Risk ↑ with: low FGF, high sevo concentration, Baralyme</li>
        <li><strong>CO</strong>: desflurane &gt; enflurane &gt; isoflurane. Worse with KOH-containing absorbents and desiccation</li>
        <li><strong>Amsorb® (Ca(OH)₂ lime)</strong>: no NaOH/KOH → no compound A or CO; less reactive but safer</li>
      </ul>
    </div>
  </div>
);

/* ═══════════════════════════════════════ SCAVENGING TAB ═══════════════════════════════════════ */
const ScavengingTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Scavenging Systems (AGSS)</h3>
    <div className="bg-secondary/30 rounded-xl p-3 border border-border">
      <svg viewBox="0 0 520 420" className="w-full h-auto">
        <defs>
          <marker id="scvA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="hsl(var(--foreground))" /></marker>
        </defs>

        <text x="260" y="20" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">Anaesthetic Gas Scavenging System</text>

        {/* ── 1. COLLECTING ── */}
        <rect x="20" y="40" width="110" height="65" rx="10" fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="75" y="58" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">① Collecting</text>
        <text x="75" y="72" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">From APL valve</text>
        <text x="75" y="84" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">or ventilator exhaust</text>
        {/* 30mm connector highlight */}
        <rect x="35" y="90" width="80" height="12" rx="3" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="75" y="100" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))" fontWeight="bold">30mm connector</text>

        {/* Arrow 1→2 */}
        <line x1="130" y1="72" x2="165" y2="72" stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#scvA)" />

        {/* ── 2. TRANSFER ── */}
        <rect x="170" y="40" width="110" height="65" rx="10" fill="#F59E0B" fillOpacity="0.08" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="225" y="58" textAnchor="middle" fontSize="9" fill="#F59E0B" fontWeight="bold">② Transfer</text>
        <text x="225" y="72" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Wide-bore tubing</text>
        <text x="225" y="84" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Low resistance</text>
        <text x="225" y="96" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">30mm fittings throughout</text>

        {/* Arrow 2→3 */}
        <line x1="280" y1="72" x2="315" y2="72" stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#scvA)" />

        {/* ── 3. RECEIVING ── */}
        <rect x="320" y="35" width="180" height="100" rx="10" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="410" y="52" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">③ Receiving</text>

        {/* Reservoir bag inside */}
        <ellipse cx="370" cy="90" rx="20" ry="28" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="370" y="93" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))">Reservoir</text>

        {/* Safety valves */}
        <rect x="405" y="65" width="85" height="55" rx="6" fill="hsl(var(--destructive)/0.06)" stroke="hsl(var(--destructive))" strokeWidth="1.2" />
        <text x="448" y="78" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">Safety Valves</text>

        {/* Positive pressure valve */}
        <rect x="410" y="82" width="35" height="14" rx="3" fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive))" strokeWidth="0.8" />
        <text x="428" y="92" textAnchor="middle" fontSize="5.5" fill="hsl(var(--destructive))">+ve</text>

        {/* Negative pressure valve */}
        <rect x="450" y="82" width="35" height="14" rx="3" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="0.8" />
        <text x="468" y="92" textAnchor="middle" fontSize="5.5" fill="hsl(var(--primary))">−ve</text>

        <text x="448" y="112" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))" fontWeight="bold">±0.5 cmH₂O limit</text>
        <text x="448" y="124" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))">Prevents barotrauma</text>

        {/* Arrow 3→4 */}
        <line x1="410" y1="140" x2="410" y2="165" stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#scvA)" />

        {/* ── 4. DISPOSAL ── */}
        {/* Active */}
        <rect x="170" y="170" width="160" height="90" rx="10" fill="#10B981" fillOpacity="0.06" stroke="#10B981" strokeWidth="1.5" />
        <text x="250" y="188" textAnchor="middle" fontSize="9" fill="#10B981" fontWeight="bold">④a Active Disposal</text>
        {/* Fan symbol */}
        <circle cx="220" cy="218" r="14" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1.5" />
        <path d="M 215 210 Q 220 218, 225 210 M 212 220 Q 220 218, 212 225 M 225 225 Q 220 218, 228 220" fill="none" stroke="#10B981" strokeWidth="1.5" />
        <text x="250" y="215" fontSize="7" fill="hsl(var(--foreground))">Fan or piped</text>
        <text x="250" y="228" fontSize="7" fill="hsl(var(--foreground))">vacuum system</text>
        <text x="250" y="248" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Flow rate: 75 L/min</text>

        {/* Passive */}
        <rect x="345" y="170" width="155" height="90" rx="10" fill="#6366F1" fillOpacity="0.06" stroke="#6366F1" strokeWidth="1.5" />
        <text x="422" y="188" textAnchor="middle" fontSize="9" fill="#6366F1" fontWeight="bold">④b Passive Disposal</text>
        {/* Duct to outside */}
        <rect x="390" y="200" width="50" height="18" rx="4" fill="#6366F1" fillOpacity="0.08" stroke="#6366F1" strokeWidth="1" />
        <text x="415" y="212" textAnchor="middle" fontSize="6" fill="#6366F1">Duct</text>
        <text x="422" y="232" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))">Vents to outside</text>
        <text x="422" y="246" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Wind-dependent; simpler</text>

        {/* ── Connector comparison ── */}
        <rect x="20" y="280" width="480" height="50" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <text x="260" y="298" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">Connector Sizes — Deliberate Incompatibility</text>
        <g transform="translate(60,305)">
          <circle cx="0" cy="8" r="11" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <text x="0" y="12" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">30</text>
          <text x="30" y="12" fontSize="7" fill="hsl(var(--foreground))">Scavenging</text>
        </g>
        <g transform="translate(200,305)">
          <circle cx="0" cy="8" r="9" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <text x="0" y="12" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">22</text>
          <text x="30" y="12" fontSize="7" fill="hsl(var(--foreground))">Machine end</text>
        </g>
        <g transform="translate(340,305)">
          <circle cx="0" cy="8" r="7" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="0" y="12" textAnchor="middle" fontSize="7" fill="#F59E0B" fontWeight="bold">15</text>
          <text x="30" y="12" fontSize="7" fill="hsl(var(--foreground))">Patient end</text>
        </g>

        {/* ── COSHH limits ── */}
        <rect x="20" y="345" width="480" height="65" rx="10" fill="hsl(var(--destructive)/0.04)" stroke="hsl(var(--destructive)/0.3)" strokeWidth="1" />
        <text x="260" y="363" textAnchor="middle" fontSize="9" fill="hsl(var(--destructive))" fontWeight="bold">COSHH Workplace Exposure Limits (8hr TWA)</text>
        <g transform="translate(70,372)">
          <rect x="0" y="0" width="160" height="25" rx="5" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
          <text x="80" y="12" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">N₂O: &lt;100 ppm</text>
          <text x="80" y="22" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Long-term: haematological risk</text>
        </g>
        <g transform="translate(280,372)">
          <rect x="0" y="0" width="160" height="25" rx="5" fill="#F59E0B" fillOpacity="0.06" stroke="#F59E0B" strokeOpacity="0.3" strokeWidth="1" />
          <text x="80" y="12" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">Volatiles: &lt;50 ppm</text>
          <text x="80" y="22" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Halogenated agents</text>
        </g>
      </svg>
    </div>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Scavenging Key Facts</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>4 components</strong>: collecting (30mm connector), transfer (tubing), receiving (reservoir + safety valves), disposal (active/passive)</li>
        <li><strong>30mm connector</strong>: deliberate incompatibility with 22mm/15mm breathing circuit connectors to prevent misconnection</li>
        <li><strong>Safety valves</strong>: positive and negative pressure relief — limit ±0.5 cmH₂O transmission to patient circuit</li>
        <li><strong>Active</strong>: fan or piped vacuum; flow rate 75 L/min; more reliable but requires power</li>
        <li><strong>Passive</strong>: vents directly to outside atmosphere via wide-bore tubing; wind-dependent, simpler</li>
        <li><strong>COSHH</strong>: N₂O &lt;100 ppm, halogenated agents &lt;50 ppm (8hr TWA). Chronic exposure → haematological, hepatic, reproductive risks</li>
      </ul>
    </div>
  </div>
);

/* ═══════════════════════════════════════ MAIN COMPONENT ═══════════════════════════════════════ */
const BreathingCircuitsDiagram = () => {
  const [activeTab, setActiveTab] = useState("mapleson");

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="mapleson" className="text-xs">Mapleson</TabsTrigger>
          <TabsTrigger value="circle" className="text-xs">Circle</TabsTrigger>
          <TabsTrigger value="sodalime" className="text-xs">Soda Lime</TabsTrigger>
          <TabsTrigger value="scavenging" className="text-xs">Scavenging</TabsTrigger>
        </TabsList>
        <TabsContent value="mapleson"><MaplesonTab /></TabsContent>
        <TabsContent value="circle"><CircleTab /></TabsContent>
        <TabsContent value="sodalime"><SodaLimeTab /></TabsContent>
        <TabsContent value="scavenging"><ScavengingTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default BreathingCircuitsDiagram;
