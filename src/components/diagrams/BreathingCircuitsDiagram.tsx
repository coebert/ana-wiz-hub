import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ───────── Corrugated tubing helper (hollow double-walled) ───────── */
const CorrugatedTube = ({ x1, y1, x2, y2, colour = "hsl(var(--foreground))", width = 12 }: { x1: number; y1: number; x2: number; y2: number; colour?: string; width?: number }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const segments = Math.max(4, Math.round(len / 8));
  const nx = -dy / len;
  const ny = dx / len;
  const halfW = width / 2;

  // Build outer and inner corrugated edges
  const buildEdge = (offset: number, amp: number) => {
    let d = `M ${x1 + nx * offset} ${y1 + ny * offset}`;
    for (let i = 1; i <= segments; i++) {
      const t = i / segments;
      const mt = t - 0.5 / segments;
      const mx = x1 + dx * mt + nx * offset;
      const my = y1 + dy * mt + ny * offset;
      const sign = i % 2 === 0 ? 1 : -1;
      const cx = mx + nx * amp * sign;
      const cy = my + ny * amp * sign;
      const ex = x1 + dx * t + nx * offset;
      const ey = y1 + dy * t + ny * offset;
      d += ` Q ${cx} ${cy} ${ex} ${ey}`;
    }
    return d;
  };

  const outerTop = buildEdge(halfW, 2.5);
  const outerBot = buildEdge(-halfW, 2.5);

  // Fill area between the two edges
  const _fillPath = outerTop + ` L ${x2 - nx * halfW} ${y2 - ny * halfW}` +
    buildEdge(-halfW, 2.5).replace('M', ' L').split('').reverse().join('') ; // we'll just use a rect fill

  // Corrugation ribs (cross-lines)
  const ribs: { rx1: number; ry1: number; rx2: number; ry2: number }[] = [];
  const ribCount = Math.max(3, Math.round(len / 12));
  for (let i = 0; i <= ribCount; i++) {
    const t = i / ribCount;
    const px = x1 + dx * t;
    const py = y1 + dy * t;
    ribs.push({
      rx1: px + nx * halfW,
      ry1: py + ny * halfW,
      rx2: px - nx * halfW,
      ry2: py - ny * halfW,
    });
  }

  return (
    <g>
      {/* Filled interior */}
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colour} strokeWidth={width} opacity="0.06" strokeLinecap="round" />
      {/* Outer walls */}
      <path d={outerTop} fill="none" stroke={colour} strokeWidth="1.5" opacity="0.5" />
      <path d={outerBot} fill="none" stroke={colour} strokeWidth="1.5" opacity="0.5" />
      {/* Corrugation ribs */}
      {ribs.map((r, i) => (
        <line key={i} x1={r.rx1} y1={r.ry1} x2={r.rx2} y2={r.ry2} stroke={colour} strokeWidth="0.5" opacity="0.3" />
      ))}
      {/* End caps */}
      <line x1={x1 + nx * halfW} y1={y1 + ny * halfW} x2={x1 - nx * halfW} y2={y1 - ny * halfW} stroke={colour} strokeWidth="1.5" opacity="0.5" />
      <line x1={x2 + nx * halfW} y1={y2 + ny * halfW} x2={x2 - nx * halfW} y2={y2 - ny * halfW} stroke={colour} strokeWidth="1.5" opacity="0.5" />
    </g>
  );
};

/* ───────── Reservoir bag shape (realistic pear/teardrop) ───────── */
const ReservoirBag = ({ cx, cy, r = 18, colour = "hsl(var(--primary))" }: { cx: number; cy: number; r?: number; colour?: string }) => {
  const neckW = r * 0.25;
  const neckH = r * 0.35;
  const bodyW = r * 0.9;
  const bodyH = r * 1.15;
  const top = cy - neckH - bodyH * 0.3;
  const bottom = cy + bodyH * 0.7;

  return (
    <g>
      {/* Bag body — pear shape */}
      <path
        d={`M ${cx - neckW} ${top}
            Q ${cx - neckW} ${top + neckH} ${cx - bodyW * 0.5} ${cy - bodyH * 0.1}
            Q ${cx - bodyW} ${cy + bodyH * 0.2} ${cx - bodyW * 0.7} ${bottom - r * 0.15}
            Q ${cx - bodyW * 0.3} ${bottom + r * 0.1} ${cx} ${bottom}
            Q ${cx + bodyW * 0.3} ${bottom + r * 0.1} ${cx + bodyW * 0.7} ${bottom - r * 0.15}
            Q ${cx + bodyW} ${cy + bodyH * 0.2} ${cx + bodyW * 0.5} ${cy - bodyH * 0.1}
            Q ${cx + neckW} ${top + neckH} ${cx + neckW} ${top} Z`}
        fill={colour} fillOpacity="0.1" stroke={colour} strokeWidth="1.5"
      />
      {/* Neck connector */}
      <rect x={cx - neckW - 1} y={top - 3} width={(neckW + 1) * 2} height={5} rx={2}
        fill={colour} fillOpacity="0.25" stroke={colour} strokeWidth="1" />
      {/* Highlight/sheen */}
      <ellipse cx={cx - bodyW * 0.25} cy={cy + bodyH * 0.1} rx={bodyW * 0.15} ry={bodyH * 0.3}
        fill="hsl(var(--background))" fillOpacity="0.12" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="7" fill={colour} fontWeight="bold">Bag</text>
    </g>
  );
};

/* ───────── APL valve (realistic with dial) ───────── */
const APLValve = ({ cx, cy }: { cx: number; cy: number }) => (
  <g>
    {/* Valve body — cylinder */}
    <rect x={cx - 13} y={cy - 14} width={26} height={28} rx={4}
      fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
    {/* Adjustable dial/cap on top */}
    <ellipse cx={cx} cy={cy - 14} rx={10} ry={4}
      fill="hsl(var(--destructive)/0.2)" stroke="hsl(var(--destructive))" strokeWidth="1" />
    <ellipse cx={cx} cy={cy - 17} rx={7} ry={3}
      fill="hsl(var(--destructive)/0.35)" stroke="hsl(var(--destructive))" strokeWidth="1" />
    {/* Knurled grip lines on dial */}
    {[-4, -1.5, 1, 3.5].map((dx, i) => (
      <line key={i} x1={cx + dx} y1={cy - 20} x2={cx + dx} y2={cy - 15}
        stroke="hsl(var(--destructive))" strokeWidth="0.5" opacity="0.5" />
    ))}
    {/* Exhaust arrow */}
    <line x1={cx} y1={cy - 20} x2={cx} y2={cy - 27} stroke="hsl(var(--destructive))" strokeWidth="1" />
    <polygon points={`${cx - 3},${cy - 25} ${cx + 3},${cy - 25} ${cx},${cy - 29}`}
      fill="hsl(var(--destructive))" opacity="0.6" />
    {/* Internal disc/spring hint */}
    <line x1={cx - 7} y1={cy - 2} x2={cx + 7} y2={cy - 2}
      stroke="hsl(var(--destructive))" strokeWidth="1" opacity="0.5" />
    <line x1={cx - 5} y1={cy + 3} x2={cx + 5} y2={cy + 3}
      stroke="hsl(var(--destructive))" strokeWidth="0.75" opacity="0.3" />
    {/* Outlet port at bottom */}
    <rect x={cx - 5} y={cy + 10} width={10} height={4} rx={1.5}
      fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="0.75" />
    <text x={cx} y={cy + 24} textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))" fontWeight="bold">APL</text>
  </g>
);

/* ───────── Patient end ───────── */
const PatientEnd = ({ cx, cy }: { cx: number; cy: number }) => (
  <g>
    {/* Face/mask outline */}
    <path d={`M ${cx - 10} ${cy + 8} Q ${cx - 12} ${cy - 2} ${cx - 6} ${cy - 10} Q ${cx} ${cy - 14} ${cx + 6} ${cy - 10} Q ${cx + 12} ${cy - 2} ${cx + 10} ${cy + 8} Z`}
      fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--foreground))" strokeWidth="1" />
    <text x={cx} y={cy + 2} textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Pt</text>
  </g>
);

/* ───────── FGF inlet (realistic pipe with flowmeter) ───────── */
const FGFInlet = ({ cx, cy, label }: { cx: number; cy: number; label?: string }) => (
  <g>
    {/* Supply pipe */}
    <rect x={cx - 3} y={cy - 22} width={6} height={14} rx={2}
      fill="hsl(var(--clinical))" fillOpacity="0.2" stroke="hsl(var(--clinical))" strokeWidth="1" />
    {/* Connector/flowmeter body */}
    <rect x={cx - 12} y={cy - 10} width={24} height={18} rx={5}
      fill="hsl(var(--clinical))" fillOpacity="0.12" stroke="hsl(var(--clinical))" strokeWidth="1.5" />
    {/* Flow indicator (bobbin) */}
    <rect x={cx - 2} y={cy - 18} width={4} height={6} rx={1.5}
      fill="hsl(var(--clinical))" fillOpacity="0.6" stroke="hsl(var(--clinical))" strokeWidth="0.75" />
    {/* Flow arrow into circuit */}
    <polygon points={`${cx - 4},${cy - 22} ${cx + 4},${cy - 22} ${cx},${cy - 14}`}
      fill="hsl(var(--clinical))" opacity="0.7" />
    {/* O₂/gas dots */}
    {[{dx: -5, dy: -4}, {dx: 4, dy: -2}, {dx: -2, dy: 2}].map((d, i) => (
      <circle key={i} cx={cx + d.dx} cy={cy + d.dy} r={1.5}
        fill="hsl(var(--clinical))" opacity="0.35" />
    ))}
    <text x={cx} y={cy + 3} textAnchor="middle" fontSize="6" fill="hsl(var(--clinical))" fontWeight="bold">FGF</text>
    {label && <text x={cx} y={cy + 16} textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">{label}</text>}
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

/* ───────── Animated flow dots ───────── */
const FlowDots = ({ path, colour, reverse = false, id }: { path: string; colour: string; reverse?: boolean; id: string }) => (
  <g>
    <path id={id} d={path} fill="none" stroke="none" />
    {[0, 0.2, 0.4, 0.6, 0.8].map((offset, i) => (
      <circle key={i} r="3.5" fill={colour} opacity="0.85">
        <animateMotion dur="2s" repeatCount="indefinite" keyPoints={reverse ? `${1 - offset};${Math.max(0, 0 - offset)}` : `${offset};${Math.min(1, 1 + offset)}`} keyTimes="0;1" calcMode="linear">
          <mpath href={`#${id}`} />
        </animateMotion>
      </circle>
    ))}
  </g>
);

/* ───────── Flow arrow with animation + arrowhead ───────── */
const AnimFlowArrow = ({ x1, y1, x2, y2, colour, label }: { x1: number; y1: number; x2: number; y2: number; colour: string; label?: string }) => {
  const id = `af${Math.round(x1)}${Math.round(y1)}${Math.round(x2)}${Math.round(y2)}`;
  const d = `M ${x1} ${y1} L ${x2} ${y2}`;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  // Arrowhead at end
  const ax = x2 - ux * 6;
  const ay = y2 - uy * 6;
  const px = -uy * 4;
  const py = ux * 4;
  // Label midpoint
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colour} strokeWidth="2" opacity="0.35" strokeDasharray="6,4" />
      {/* Arrowhead */}
      <polygon points={`${x2},${y2} ${ax + px},${ay + py} ${ax - px},${ay - py}`} fill={colour} opacity="0.7" />
      <FlowDots path={d} colour={colour} id={id} />
      {label && <text x={mx} y={my - 5} textAnchor="middle" fontSize="5.5" fill={colour} fontWeight="bold">{label}</text>}
    </g>
  );
};

type Phase = "insp" | "exp";

/* ───────── Per-circuit flow descriptions ───────── */
const flowInfo: Record<string, Record<Phase, string>> = {
  A: {
    insp: "FGF fills bag → fresh gas travels along tubing to patient. APL valve closed (negative intrathoracic pressure).",
    exp: "Dead space gas (low CO₂) pushed back into tubing. Then alveolar gas (high CO₂) exits via APL valve near patient. Efficient — only dead space gas rebreathed.",
  },
  B: {
    insp: "FGF + dead space gas in tubing drawn toward patient. Bag refills with mixture of fresh and expired gas.",
    exp: "Alveolar gas mixes with FGF near patient end. Some vents via APL. Much re-enters tubing → less efficient.",
  },
  C: {
    insp: "Short tubing — fresh gas from FGF enters directly toward patient. Bag empties.",
    exp: "Expired gas mixes readily with FGF. Short tubing means poor separation of dead space and alveolar gas.",
  },
  D: {
    insp: "FGF delivered via inner tube directly to patient end. Fresh gas preferentially reaches patient.",
    exp: "Expired gas travels back via outer tube toward bag/APL. FGF continues to push expired gas away. Efficient for controlled ventilation.",
  },
  E: {
    insp: "FGF enters at T-junction → flows to patient. Expiratory limb acts as reservoir for fresh gas.",
    exp: "Expired gas exits via open expiratory limb. High FGF (2.5–3× MV) flushes CO₂ out.",
  },
  F: {
    insp: "FGF enters at T-junction → flows to patient. Open-tail bag can be squeezed for IPPV.",
    exp: "Expired gas enters bag via expiratory limb. Excess vents through open tail. Bag allows manual ventilation.",
  },
};

/* ═══════════════════════════════════════ MAPLESON TAB ═══════════════════════════════════════ */
const MaplesonTab = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("insp");

  const inspCol = "#10B981";
  const expCol = "hsl(var(--destructive))";
  const activeCol = phase === "insp" ? inspCol : expCol;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Mapleson Classification (A–F)</h3>
      <p className="text-sm text-muted-foreground">
        Tap any circuit to see animated gas flow during <span className="text-[#10B981] font-semibold">inspiration</span> or <span className="text-destructive font-semibold">expiration</span>. Use the toggle below to switch phases.
      </p>

      {/* Phase toggle */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setPhase("insp")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${phase === "insp" ? "bg-emerald-600 text-white" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
        >
          Inspiration
        </button>
        <button
          onClick={() => setPhase("exp")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${phase === "exp" ? "bg-destructive text-destructive-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
        >
          Expiration
        </button>
      </div>

      <div className="bg-secondary/30 rounded-xl p-3 border border-border">
        <svg viewBox="0 0 520 620" className="w-full h-auto">
          <defs>
            <marker id="bcFlow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="hsl(var(--clinical))" /></marker>
            <marker id="bcExpFlow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="hsl(var(--destructive))" /></marker>
          </defs>
          {/* ── Legend ── */}
          <g transform="translate(320, 0)">
            <rect x="0" y="0" width="190" height="18" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.75" />
            <circle cx="12" cy="9" r="4" fill={inspCol} opacity="0.8" />
            <text x="20" y="13" fontSize="7" fill={inspCol} fontWeight="bold">Inspiration</text>
            <circle cx="102" cy="9" r="4" fill={expCol} opacity="0.8" />
            <text x="110" y="13" fontSize="7" fill={expCol} fontWeight="bold">Expiration</text>
          </g>

          <g
            onClick={() => setSelected(selected === "A" ? null : "A")}
            className="cursor-pointer"
            opacity={!selected || selected === "A" ? 1 : 0.35}
          >
            <rect x="10" y="5" width="500" height="82" rx="10" fill="hsl(var(--card))" stroke={selected === "A" ? activeCol : "hsl(var(--border))"} strokeWidth={selected === "A" ? 2.5 : 1} className="transition-all duration-300" />
            <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">A — Magill</text>
            <text x="260" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">Most efficient for spontaneous ventilation (FGF ≈ MV)</text>

            <FGFInlet cx={55} cy={55} />
            <ReservoirBag cx={110} cy={55} r={14} />
            <CorrugatedTube x1={135} y1={55} x2={370} y2={55} />
            <APLValve cx={390} cy={55} />
            <PatientEnd cx={445} cy={55} />
            <line x1="403" y1="55" x2="435" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.4" />

            {/* Flow arrows — always visible based on phase */}
            {phase === "insp" && (
              <AnimFlowArrow x1={130} y1={45} x2={430} y2={45} colour={inspCol} />
            )}
            {phase === "exp" && (
              <>
                <AnimFlowArrow x1={430} y1={65} x2={150} y2={65} colour={expCol} />
                <AnimFlowArrow x1={390} y1={35} x2={390} y2={10} colour={expCol} label="exhaust" />
              </>
            )}
          </g>

          {/* ──── Mapleson B ──── */}
          <g
            onClick={() => setSelected(selected === "B" ? null : "B")}
            className="cursor-pointer"
            opacity={!selected || selected === "B" ? 1 : 0.35}
            transform="translate(0,95)"
          >
            <rect x="10" y="5" width="500" height="82" rx="10" fill="hsl(var(--card))" stroke={selected === "B" ? activeCol : "hsl(var(--border))"} strokeWidth={selected === "B" ? 2.5 : 1} className="transition-all duration-300" />
            <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">B</text>
            <text x="50" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">FGF & APL near patient; bag at machine end</text>

            <ReservoirBag cx={60} cy={55} r={14} />
            <CorrugatedTube x1={85} y1={55} x2={340} y2={55} />
            <FGFInlet cx={365} cy={55} />
            <APLValve cx={405} cy={55} />
            <PatientEnd cx={455} cy={55} />
            <line x1="418" y1="55" x2="445" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.4" />

            {phase === "insp" && (
              <AnimFlowArrow x1={80} y1={45} x2={440} y2={45} colour={inspCol} />
            )}
            {phase === "exp" && (
              <>
                <AnimFlowArrow x1={440} y1={65} x2={80} y2={65} colour={expCol} />
                <AnimFlowArrow x1={405} y1={35} x2={405} y2={10} colour={expCol} label="exhaust" />
              </>
            )}
          </g>

          {/* ──── Mapleson C (Waters) ──── */}
          <g
            onClick={() => setSelected(selected === "C" ? null : "C")}
            className="cursor-pointer"
            opacity={!selected || selected === "C" ? 1 : 0.35}
            transform="translate(0,190)"
          >
            <rect x="10" y="5" width="500" height="82" rx="10" fill="hsl(var(--card))" stroke={selected === "C" ? activeCol : "hsl(var(--border))"} strokeWidth={selected === "C" ? 2.5 : 1} className="transition-all duration-300" />
            <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">C — Waters</text>
            <text x="130" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">Short tubing; FGF & APL between bag and patient</text>

            <ReservoirBag cx={60} cy={55} r={14} />
            <FGFInlet cx={110} cy={55} />
            <APLValve cx={155} cy={55} />
            <CorrugatedTube x1={170} y1={55} x2={420} y2={55} />
            <PatientEnd cx={450} cy={55} />

            {phase === "insp" && (
              <AnimFlowArrow x1={110} y1={45} x2={440} y2={45} colour={inspCol} />
            )}
            {phase === "exp" && (
              <>
                <AnimFlowArrow x1={440} y1={65} x2={80} y2={65} colour={expCol} />
                <AnimFlowArrow x1={155} y1={35} x2={155} y2={10} colour={expCol} label="exhaust" />
              </>
            )}
          </g>

          {/* ──── Mapleson D (Bain) ──── */}
          <g
            onClick={() => setSelected(selected === "D" ? null : "D")}
            className="cursor-pointer"
            opacity={!selected || selected === "D" ? 1 : 0.35}
            transform="translate(0,285)"
          >
            <rect x="10" y="5" width="500" height="95" rx="10" fill="hsl(var(--card))" stroke={selected === "D" ? activeCol : "hsl(var(--border))"} strokeWidth={selected === "D" ? 2.5 : 1} className="transition-all duration-300" />
            <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">D — Bain (coaxial)</text>
            <text x="195" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">Most efficient for controlled ventilation</text>

            <APLValve cx={60} cy={55} />
            <ReservoirBag cx={110} cy={55} r={14} />
            <CorrugatedTube x1={135} y1={55} x2={420} y2={55} width={14} />
            <line x1="135" y1="55" x2="420" y2="55" stroke="hsl(var(--clinical))" strokeWidth="2" strokeDasharray="6,3" />
            <text x="280" y="48" textAnchor="middle" fontSize="6" fill="hsl(var(--clinical))" fontWeight="bold">← Inner FGF tube (coaxial) →</text>
            <text x="280" y="68" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">Outer tube carries expired gas back</text>
            <PatientEnd cx={450} cy={55} />

            <rect x="120" y="78" width="290" height="16" rx="4" fill="hsl(var(--destructive)/0.06)" stroke="hsl(var(--destructive)/0.3)" strokeWidth="0.75" />
            <text x="265" y="89" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">⚠ Pethick test: occlude inner tube + flush O₂ → should not pressurise circuit</text>

            {phase === "insp" && (
              <AnimFlowArrow x1={135} y1={50} x2={435} y2={50} colour={inspCol} />
            )}
            {phase === "exp" && (
              <>
                <AnimFlowArrow x1={435} y1={62} x2={135} y2={62} colour={expCol} />
                <AnimFlowArrow x1={60} y1={35} x2={60} y2={10} colour={expCol} label="exhaust" />
              </>
            )}
          </g>

          {/* ──── Mapleson E (Ayre's T-piece) ──── */}
          <g
            onClick={() => setSelected(selected === "E" ? null : "E")}
            className="cursor-pointer"
            opacity={!selected || selected === "E" ? 1 : 0.35}
            transform="translate(0,395)"
          >
            <rect x="10" y="5" width="500" height="82" rx="10" fill="hsl(var(--card))" stroke={selected === "E" ? activeCol : "hsl(var(--border))"} strokeWidth={selected === "E" ? 2.5 : 1} className="transition-all duration-300" />
            <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">E — Ayre's T-piece</text>
            <text x="195" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">No valves, no bag → minimal resistance → neonates</text>

            <CorrugatedTube x1={50} y1={55} x2={300} y2={55} />
            <text x="175" y="72" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Open expiratory limb (to atmosphere)</text>
            <line x1="50" y1="55" x2="35" y2="55" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            <text x="22" y="58" fontSize="7" fill="hsl(var(--muted-foreground))">→ atm</text>

            <rect x="300" y="40" width="25" height="30" rx="4" fill="hsl(var(--foreground)/0.08)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            <text x="312" y="58" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))" fontWeight="bold">T</text>
            <FGFInlet cx={312} cy={30} />
            <line x1="325" y1="55" x2="430" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.4" />
            <PatientEnd cx={450} cy={55} />

            {phase === "insp" && (
              <AnimFlowArrow x1={312} y1={45} x2={440} y2={45} colour={inspCol} />
            )}
            {phase === "exp" && (
              <AnimFlowArrow x1={440} y1={65} x2={50} y2={65} colour={expCol} />
            )}
          </g>

          {/* ──── Mapleson F (Jackson-Rees) ──── */}
          <g
            onClick={() => setSelected(selected === "F" ? null : "F")}
            className="cursor-pointer"
            opacity={!selected || selected === "F" ? 1 : 0.35}
            transform="translate(0,490)"
          >
            <rect x="10" y="5" width="500" height="82" rx="10" fill="hsl(var(--card))" stroke={selected === "F" ? activeCol : "hsl(var(--border))"} strokeWidth={selected === "F" ? 2.5 : 1} className="transition-all duration-300" />
            <text x="25" y="22" fontSize="11" fill="hsl(var(--primary))" fontWeight="bold">F — Jackson-Rees</text>
            <text x="215" y="22" fontSize="8" fill="hsl(var(--muted-foreground))">T-piece + open-tail bag → allows IPPV in paediatrics</text>

            <CorrugatedTube x1={120} y1={55} x2={300} y2={55} />
            <ReservoirBag cx={70} cy={55} r={14} />
            <line x1="58" y1="42" x2="45" y2="30" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <text x="30" y="28" fontSize="5" fill="hsl(var(--muted-foreground))">Open tail</text>

            <rect x="300" y="40" width="25" height="30" rx="4" fill="hsl(var(--foreground)/0.08)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            <text x="312" y="58" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))" fontWeight="bold">T</text>
            <FGFInlet cx={312} cy={30} />
            <line x1="325" y1="55" x2="430" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.4" />
            <PatientEnd cx={450} cy={55} />

            {phase === "insp" && (
              <AnimFlowArrow x1={312} y1={45} x2={440} y2={45} colour={inspCol} />
            )}
            {phase === "exp" && (
              <>
                <AnimFlowArrow x1={440} y1={65} x2={120} y2={65} colour={expCol} />
                <AnimFlowArrow x1={58} y1={45} x2={45} y2={32} colour={expCol} label="exhaust" />
              </>
            )}
          </g>

          {/* ──── Efficiency summary ──── */}
          <rect x="30" y="580" width="460" height="34" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.4)" strokeWidth="1.5" />
          <text x="260" y="594" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Spontaneous: A {">"} D,F,E {">"} C {">"} B</text>
          <text x="260" y="608" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Controlled: D,F,E {">"} B {">"} C {">"} A</text>
        </svg>
      </div>

      {/* Flow description panel */}
      {selected && (
        <div className="animate-fade-in bg-card border border-border rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-full ${phase === "insp" ? "bg-emerald-500" : "bg-destructive"}`} />
            <h4 className="font-semibold text-sm text-foreground">
              Mapleson {selected} — {phase === "insp" ? "Inspiration" : "Expiration"}
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">{flowInfo[selected][phase]}</p>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-4 space-y-2">
        <h4 className="font-semibold text-sm text-foreground">Key Points</h4>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
          <li><strong>Mapleson A (Magill)</strong>: APL near patient vents alveolar gas first during expiration → most efficient for spontaneous ventilation; FGF ≈ MV (~70 mL/kg/min)</li>
          <li><strong>Mapleson D (Bain)</strong>: coaxial — inner tube delivers FGF to patient end; most efficient for controlled ventilation; FGF 70–100 mL/kg/min</li>
          <li><strong>Mapleson E (Ayre's T-piece)</strong>: no valves, no bag → minimal dead space & resistance → ideal for neonates/infants (&lt;20 kg)</li>
          <li><strong>Mapleson F (Jackson-Rees)</strong>: T-piece + open-tail reservoir bag → enables IPPV while maintaining low resistance</li>
          <li><strong>All Mapleson circuits</strong> are semi-open — they prevent rebreathing via high FGF, not CO₂ absorption</li>
        </ul>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════ CIRCLE SYSTEM ═══════════════════════════════════════ */
const circleFlowInfo: Record<Phase, string> = {
  insp: "Fresh gas from FGF inlet mixes with CO₂-free recycled gas in the inspiratory limb. Gas passes through the inspiratory unidirectional valve → along the inspiratory limb → through the Y-piece → to the patient. The expiratory valve is held closed by the pressure difference. The reservoir bag deflates as gas is drawn toward the patient.",
  exp: "Expired gas exits the patient → passes through the Y-piece → enters the expiratory limb → through the expiratory unidirectional valve → past the APL valve (excess gas vents here) → into the CO₂ absorber where CO₂ is removed. The cleaned gas then re-enters the inspiratory limb. The reservoir bag refills.",
};

const CircleTab = () => {
  const [circlePhase, setCirclePhase] = useState<Phase>("insp");

  const inspCol = "#10B981";
  const expCol = "hsl(var(--destructive))";

  // SVG paths for animated dots following the circle
  const _inspPath = "M 260 320 L 175 370 Q 60 360 60 200 Q 60 65 175 65 L 215 52 L 260 38";
  const _expPath = "M 260 38 L 305 52 L 345 65 Q 460 65 460 200 Q 460 360 345 370 L 260 370 L 260 340";
  const _aplExhaustPath = "M 430 270 L 430 235";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Circle Breathing System</h3>
      <p className="text-sm text-muted-foreground">
        Toggle between <span className="text-[#10B981] font-semibold">inspiration</span> and <span className="text-destructive font-semibold">expiration</span> to see animated gas flow around the circle.
      </p>

      {/* Phase toggle */}
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setCirclePhase("insp")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${circlePhase === "insp" ? "bg-emerald-600 text-white" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
        >
          Inspiration
        </button>
        <button
          onClick={() => setCirclePhase("exp")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${circlePhase === "exp" ? "bg-destructive text-destructive-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
        >
          Expiration
        </button>
      </div>

      <div className="bg-secondary/30 rounded-xl p-3 border border-border">
        <svg viewBox="0 0 520 530" className="w-full h-auto">
          <defs>
            <marker id="cInsp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="hsl(var(--clinical))" /></marker>
            <marker id="cExp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="hsl(var(--destructive))" /></marker>
          </defs>

          <text x="260" y="20" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">Circle System — 7 Essential Components</text>

          {/* ── Inspiratory limb (left side) — hollow corrugated tubing ── */}
          {/* Vertical section */}
          <CorrugatedTube x1={85} y1={120} x2={85} y2={330} colour={inspCol} width={14} />
          {/* Top curve to Y-piece */}
          <CorrugatedTube x1={85} y1={120} x2={200} y2={65} colour={inspCol} width={14} />
          {/* Bottom curve to absorber */}
          <CorrugatedTube x1={85} y1={330} x2={185} y2={370} colour={inspCol} width={14} />

          {/* Inspiratory limb highlight */}
          <path d="M 200 65 L 85 120 L 85 330 L 185 370" fill="none"
            stroke={inspCol} strokeWidth={circlePhase === "insp" ? 2 : 0.5}
            opacity={circlePhase === "insp" ? 0.6 : 0.15}
            strokeDasharray={circlePhase === "insp" ? "none" : "4,4"}
            className="transition-all duration-500" />

          {/* ── Expiratory limb (right side) — hollow corrugated tubing ── */}
          <CorrugatedTube x1={435} y1={120} x2={435} y2={330} colour={expCol} width={14} />
          <CorrugatedTube x1={435} y1={120} x2={320} y2={65} colour={expCol} width={14} />
          <CorrugatedTube x1={435} y1={330} x2={335} y2={370} colour={expCol} width={14} />

          {/* Expiratory limb highlight */}
          <path d="M 320 65 L 435 120 L 435 330 L 335 370" fill="none"
            stroke={expCol} strokeWidth={circlePhase === "exp" ? 2 : 0.5}
            opacity={circlePhase === "exp" ? 0.6 : 0.15}
            strokeDasharray={circlePhase === "exp" ? "none" : "4,4"}
            className="transition-all duration-500" />

          {/* Flow direction labels */}
          <text x="65" y="220" fontSize="7" fill={inspCol} fontWeight="bold" transform="rotate(-90,65,220)" opacity={circlePhase === "insp" ? 1 : 0.3}>INSP ↓</text>
          <text x="455" y="220" fontSize="7" fill={expCol} fontWeight="bold" transform="rotate(90,455,220)" opacity={circlePhase === "exp" ? 1 : 0.3}>EXP ↑</text>

          {/* ── Animated flow dots ── */}
          {circlePhase === "insp" && (
            <FlowDots path="M 185 370 L 85 330 L 85 120 L 200 65 L 260 50" colour={inspCol} id="circInsp" />
          )}
          {circlePhase === "exp" && (
            <>
              {/* Expired gas: patient → exp limb → exp valve → down to absorber */}
              <FlowDots path="M 260 50 L 320 65 L 435 120 L 435 330 L 335 370" colour={expCol} id="circExp" />
              {/* Recirculated gas: absorber → back up insp limb (cleaned) */}
              <FlowDots path="M 260 390 L 185 370 L 85 330 L 85 250" colour="#8B5CF6" id="circRecirc" />
              {/* Excess gas: APL → scavenging */}
              <FlowDots path="M 460 260 L 460 240 L 490 220 L 490 195" colour={expCol} id="circScav" />
            </>
          )}

          {/* ── Y-piece at top ── */}
          <path d="M 200 65 L 220 50 L 300 50 L 320 65"
            fill="hsl(var(--accent)/0.12)" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <rect x="220" y="42" width="80" height="20" rx="5" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <text x="260" y="56" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">Y-piece</text>
          {/* Patient */}
          <PatientEnd cx={260} cy={24} />
          <line x1="260" y1="34" x2="260" y2="42" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

          {/* ── Inspiratory unidirectional valve ── */}
          <g opacity={circlePhase === "insp" ? 1 : 0.5} className="transition-opacity duration-300">
            <UniValve cx={100} cy={155} colour={inspCol} label="Insp. valve" />
            {circlePhase === "insp" && (
              <text x="100" y="187" textAnchor="middle" fontSize="5" fill={inspCol}>OPEN</text>
            )}
            {circlePhase === "exp" && (
              <text x="100" y="187" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">CLOSED</text>
            )}
          </g>

          {/* ── Expiratory unidirectional valve ── */}
          <g opacity={circlePhase === "exp" ? 1 : 0.5} className="transition-opacity duration-300">
            <UniValve cx={420} cy={155} colour={expCol} label="Exp. valve" />
            {circlePhase === "exp" && (
              <text x="420" y="187" textAnchor="middle" fontSize="5" fill={expCol}>OPEN</text>
            )}
            {circlePhase === "insp" && (
              <text x="420" y="187" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">CLOSED</text>
            )}
          </g>

          {/* ── CO₂ absorber (bottom centre) ── */}
          <rect x="170" y="355" width="180" height="70" rx="12" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="2" />
          {Array.from({ length: 35 }).map((_, i) => {
            const gx = 185 + (i % 7) * 23;
            const gy = 373 + Math.floor(i / 7) * 14;
            const exhausted = i === 28 || i === 29;
            return (
              <circle key={i} cx={gx} cy={gy} r="5"
                fill={exhausted ? "#A855F7" : "hsl(var(--primary)/0.15)"}
                fillOpacity={exhausted ? 0.5 : 0.4}
                stroke={exhausted ? "#A855F7" : "hsl(var(--primary)/0.4)"}
                strokeWidth="0.75" />
            );
          })}
          <text x="260" y="422" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">CO₂ Absorber (Soda Lime)</text>
          <text x="260" y="434" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Exothermic — produces heat + H₂O</text>

          {/* Recirculation arrow from absorber back to insp limb */}
          {circlePhase === "exp" && (
            <g>
              <path d="M 210 390 Q 160 390 150 370 Q 140 350 85 330" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.5" strokeDasharray="4,3" />
              <text x="130" y="395" fontSize="6" fill="hsl(var(--primary))" fontWeight="bold">Recirculated</text>
              <text x="130" y="403" fontSize="5" fill="hsl(var(--primary))">(CO₂ removed)</text>
            </g>
          )}

          {/* ── FGF inlet — on inspiratory side, clearly separate ── */}
          <FGFInlet cx={85} cy={340} label="Fresh gas in" />

          {/* ── APL valve (on expiratory side) — with scavenging pipe ── */}
          <g opacity={circlePhase === "exp" ? 1 : 0.5} className="transition-opacity duration-300">
            <APLValve cx={460} cy={275} />
            {/* Scavenging pipe leading away */}
            <line x1="460" y1="246" x2="460" y2="230" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.5" />
            <line x1="460" y1="230" x2="490" y2="215" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.5" />
            <line x1="490" y1="215" x2="490" y2="190" stroke="hsl(var(--destructive))" strokeWidth="2" opacity="0.5" />
            {/* Scavenging collection bag/unit */}
            <rect x="475" y="175" width="30" height="18" rx="4"
              fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive))" strokeWidth="1" />
            <text x="490" y="187" textAnchor="middle" fontSize="5.5" fill="hsl(var(--destructive))" fontWeight="bold">AGSS</text>
            {circlePhase === "exp" && (
              <>
                <text x="490" y="172" textAnchor="middle" fontSize="5" fill={expCol} fontWeight="bold">Excess gas</text>
                <text x="490" y="164" textAnchor="middle" fontSize="5" fill={expCol}>→ Scavenging</text>
              </>
            )}
          </g>

          {/* ── Reservoir bag — realistic pear shape ── */}
          <g opacity={circlePhase === "insp" ? 0.6 : 1} className="transition-opacity duration-300">
            <ReservoirBag cx={60} cy={260} r={circlePhase === "exp" ? 22 : 16} />
            <text x="60" y={circlePhase === "exp" ? 292 : 286} textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">
              {circlePhase === "insp" ? "Deflating" : "Refilling"}
            </text>
          </g>

          {/* ── Expiration flow summary ── */}
          {circlePhase === "exp" && (
            <g>
              <rect x="140" y="440" width="240" height="30" rx="6" fill="hsl(var(--destructive)/0.06)" stroke="hsl(var(--destructive)/0.3)" strokeWidth="1" />
              <text x="260" y="453" textAnchor="middle" fontSize="6.5" fill="hsl(var(--foreground))" fontWeight="bold">Expired gas splits two ways:</text>
              <text x="260" y="464" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">
                ① Excess → APL → AGSS scavenging  ② Rest → CO₂ absorber → recirculated
              </text>
            </g>
          )}

          {/* ── Component labels ── */}
          <g fontSize="7" fill="hsl(var(--muted-foreground))">
            <text x="260" y={circlePhase === "exp" ? 485 : 455} textAnchor="middle" fontWeight="bold" fill="hsl(var(--foreground))" fontSize="8">7 Components:</text>
            <text x="260" y={circlePhase === "exp" ? 499 : 469} textAnchor="middle">① FGF inlet  ② Insp. valve  ③ Exp. valve  ④ Y-piece  ⑤ APL valve  ⑥ Bag  ⑦ CO₂ absorber</text>
          </g>

          {/* ── Low-flow box ── */}
          <rect x="115" y={circlePhase === "exp" ? 505 : 478} width="290" height="18" rx="5" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
          <text x="260" y={circlePhase === "exp" ? 518 : 491} textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Low-flow: 0.5–1 L/min • Closed: FGF = uptake only (~200 mL/min)</text>
        </svg>
      </div>

      {/* Flow description panel */}
      <div className="animate-fade-in bg-card border border-border rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className={`inline-block w-3 h-3 rounded-full ${circlePhase === "insp" ? "bg-emerald-500" : "bg-destructive"}`} />
          <h4 className="font-semibold text-sm text-foreground">
            {circlePhase === "insp" ? "Inspiration" : "Expiration"}
          </h4>
        </div>
        <p className="text-sm text-muted-foreground">{circleFlowInfo[circlePhase]}</p>
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
};

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
              strokeWidth="0.75" />
          );
        })}

        {/* Indicator label */}
        <rect x="355" y="115" width="140" height="40" rx="6" fill="hsl(var(--pharmacology))" fillOpacity="0.08" stroke="hsl(var(--pharmacology))" strokeWidth="1" />
        <text x="425" y="132" textAnchor="middle" fontSize="7" fill="hsl(var(--pharmacology))" fontWeight="bold">Indicator: Ethyl Violet</text>
        <text x="425" y="145" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">White → Purple when exhausted</text>
        <line x1="350" y1="135" x2="355" y2="135" stroke="hsl(var(--pharmacology))" strokeWidth="1" />

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
        <text x="315" y="335" fontSize="6" fill="hsl(var(--clinical))" fontWeight="bold">↻ NaOH regenerated</text>

        {/* Net reaction */}
        <rect x="360" y="260" width="120" height="42" rx="6" fill="hsl(var(--accent))" fillOpacity="0.1" stroke="hsl(var(--accent))" strokeWidth="1" />
        <text x="420" y="276" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))" fontWeight="bold">Net Reaction:</text>
        <text x="420" y="292" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))">CO₂ → CaCO₃ + H₂O</text>
        <text x="420" y="304" textAnchor="middle" fontSize="6" fill="hsl(var(--accent))">+ Heat (40–60°C)</text>

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
        <rect x="30" y="455" width="460" height="55" rx="8" fill="hsl(var(--clinical))" fillOpacity="0.06" stroke="hsl(var(--clinical))" strokeOpacity="0.3" strokeWidth="1" />
        <text x="260" y="472" textAnchor="middle" fontSize="8" fill="hsl(var(--clinical))" fontWeight="bold">Prevention Strategies</text>
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
        <rect x="170" y="40" width="110" height="65" rx="10" fill="hsl(var(--accent))" fillOpacity="0.08" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="225" y="58" textAnchor="middle" fontSize="9" fill="hsl(var(--accent))" fontWeight="bold">② Transfer</text>
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
        <rect x="405" y="65" width="85" height="55" rx="6" fill="hsl(var(--destructive)/0.06)" stroke="hsl(var(--destructive))" strokeWidth="1" />
        <text x="448" y="78" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">Safety Valves</text>

        {/* Positive pressure valve */}
        <rect x="410" y="82" width="35" height="14" rx="3" fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive))" strokeWidth="0.75" />
        <text x="428" y="92" textAnchor="middle" fontSize="5.5" fill="hsl(var(--destructive))">+ve</text>

        {/* Negative pressure valve */}
        <rect x="450" y="82" width="35" height="14" rx="3" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="0.75" />
        <text x="468" y="92" textAnchor="middle" fontSize="5.5" fill="hsl(var(--primary))">−ve</text>

        <text x="448" y="112" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))" fontWeight="bold">±0.5 cmH₂O limit</text>
        <text x="448" y="124" textAnchor="middle" fontSize="5.5" fill="hsl(var(--muted-foreground))">Prevents barotrauma</text>

        {/* Arrow 3→4 */}
        <line x1="410" y1="140" x2="410" y2="165" stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#scvA)" />

        {/* ── 4. DISPOSAL ── */}
        {/* Active */}
        <rect x="170" y="170" width="160" height="90" rx="10" fill="hsl(var(--clinical))" fillOpacity="0.06" stroke="hsl(var(--clinical))" strokeWidth="1.5" />
        <text x="250" y="188" textAnchor="middle" fontSize="9" fill="hsl(var(--clinical))" fontWeight="bold">④a Active Disposal</text>
        {/* Fan symbol */}
        <circle cx="220" cy="218" r="14" fill="hsl(var(--clinical))" fillOpacity="0.1" stroke="hsl(var(--clinical))" strokeWidth="1.5" />
        <path d="M 215 210 Q 220 218, 225 210 M 212 220 Q 220 218, 212 225 M 225 225 Q 220 218, 228 220" fill="none" stroke="hsl(var(--clinical))" strokeWidth="1.5" />
        <text x="250" y="215" fontSize="7" fill="hsl(var(--foreground))">Fan or piped</text>
        <text x="250" y="228" fontSize="7" fill="hsl(var(--foreground))">vacuum system</text>
        <text x="250" y="248" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Flow rate: 75 L/min</text>

        {/* Passive */}
        <rect x="345" y="170" width="155" height="90" rx="10" fill="hsl(var(--primary))" fillOpacity="0.06" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="422" y="188" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">④b Passive Disposal</text>
        {/* Duct to outside */}
        <rect x="390" y="200" width="50" height="18" rx="4" fill="hsl(var(--primary))" fillOpacity="0.08" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="415" y="212" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))">Duct</text>
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
          <circle cx="0" cy="8" r="7" fill="hsl(var(--accent))" fillOpacity="0.15" stroke="hsl(var(--accent))" strokeWidth="1.5" />
          <text x="0" y="12" textAnchor="middle" fontSize="7" fill="hsl(var(--accent))" fontWeight="bold">15</text>
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
          <rect x="0" y="0" width="160" height="25" rx="5" fill="hsl(var(--accent))" fillOpacity="0.06" stroke="hsl(var(--accent))" strokeOpacity="0.3" strokeWidth="1" />
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
