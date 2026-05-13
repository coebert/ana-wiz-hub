import { useState } from "react";
import { Slider } from "@/components/ui/slider";

interface AgentProps {
  name: string;
  svp: number;       // kPa at 20°C
  bp: number;        // °C
  mac: number;        // %
  bloodGas: number;
  colour: string;
}

const agents: AgentProps[] = [
  { name: "Sevoflurane", svp: 21.3, bp: 58.5, mac: 2.0, bloodGas: 0.65, colour: "hsl(210, 70%, 55%)" },
  { name: "Isoflurane", svp: 32.5, bp: 48.5, mac: 1.17, bloodGas: 1.46, colour: "hsl(150, 60%, 45%)" },
  { name: "Desflurane", svp: 88.5, bp: 22.8, mac: 6.0, bloodGas: 0.42, colour: "hsl(35, 80%, 50%)" },
];

export const VaporizerDiagram = () => {
  const [dialSetting, setDialSetting] = useState([2]);
  const [selectedAgent, setSelectedAgent] = useState(0);
  const [showTemp, setShowTemp] = useState(false);

  const agent = agents[selectedAgent];
  const chamberConc = (agent.svp / 101.3) * 100;
  const targetConc = dialSetting[0];
  const bypassRatio = targetConc > 0 ? ((chamberConc - targetConc) / targetConc).toFixed(1) : "∞";
  const chamberFlow = targetConc > 0 ? (targetConc / chamberConc * 100).toFixed(0) : "0";
  const bypassFlow = targetConc > 0 ? (100 - parseFloat(chamberFlow)).toFixed(0) : "100";

  const maxDial = agent.name === "Desflurane" ? 18 : agent.name === "Isoflurane" ? 5 : 8;

  return (
    <div className="space-y-4">
      {/* Agent selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {agents.map((a, i) => (
          <button
            key={a.name}
            onClick={() => { setSelectedAgent(i); setDialSetting([Math.min(dialSetting[0], a.name === "Desflurane" ? 18 : 5)]); }}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all"
            style={{
              borderColor: a.colour,
              backgroundColor: selectedAgent === i ? a.colour : "transparent",
              color: selectedAgent === i ? "white" : a.colour,
            }}
          >
            {a.name}
          </button>
        ))}
      </div>

      {/* Concentration dial */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground whitespace-nowrap">Dial: {targetConc}%</span>
        <Slider value={dialSetting} onValueChange={setDialSetting} min={0} max={maxDial} step={0.5} className="flex-1" />
      </div>

      {/* Agent info bar */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="rounded-lg border border-border p-2">
          <p className="text-muted-foreground">SVP</p>
          <p className="font-semibold text-foreground">{agent.svp} kPa</p>
        </div>
        <div className="rounded-lg border border-border p-2">
          <p className="text-muted-foreground">BP</p>
          <p className="font-semibold text-foreground">{agent.bp}°C</p>
        </div>
        <div className="rounded-lg border border-border p-2">
          <p className="text-muted-foreground">MAC</p>
          <p className="font-semibold text-foreground">{agent.mac}%</p>
        </div>
        <div className="rounded-lg border border-border p-2">
          <p className="text-muted-foreground">B:G</p>
          <p className="font-semibold text-foreground">{agent.bloodGas}</p>
        </div>
      </div>

      {/* SVG Diagram */}
      <div className="bg-muted/20 rounded-lg p-2">
        <svg viewBox="0 0 540 380" className="w-full" role="img" aria-label="Plenum vaporizer schematic">
          <defs>
            <marker id="vap-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="hsl(var(--primary))" />
            </marker>
            <marker id="vap-arrow-out" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={agent.colour} />
            </marker>
            <linearGradient id="liquid-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={agent.colour} stopOpacity="0.4" />
              <stop offset="100%" stopColor={agent.colour} stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* ── FRESH GAS INPUT ── */}
          <line x1="20" y1="80" x2="105" y2="80" stroke="hsl(var(--primary))" strokeWidth="3" markerEnd="url(#vap-arrow)" />
          <text x="20" y="68" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="600">Fresh Gas In</text>
          <text x="20" y="95" fontSize="8" fill="hsl(var(--muted-foreground))">From flowmeters</text>

          {/* ── CONCENTRATION DIAL ── */}
          <circle cx="130" cy="50" r="22" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1.5" />
          <circle cx="130" cy="50" r="16" fill="hsl(var(--card))" stroke={agent.colour} strokeWidth="2" />
          {/* Dial pointer */}
          {(() => {
            const angle = -90 + (targetConc / maxDial) * 270;
            const rad = angle * Math.PI / 180;
            return <line x1="130" y1="50" x2={130 + Math.cos(rad) * 12} y2={50 + Math.sin(rad) * 12} stroke={agent.colour} strokeWidth="2" strokeLinecap="round" />;
          })()}
          <text x="130" y="54" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">{targetConc}%</text>
          <text x="130" y="82" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Concentration Dial</text>

          {/* ── SPLITTING VALVE ── */}
          <rect x="110" y="65" width="40" height="30" rx="5" fill="hsl(var(--primary)/0.12)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <text x="130" y="82" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))"></text>
          {/* Valve cone symbol */}
          <polygon points="125,70 135,70 130,78" fill="hsl(var(--primary))" opacity="0.4" />

          {/* ── BYPASS CHANNEL (upper) ── */}
          <line x1="150" y1="72" x2="395" y2="72" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="8 4" />
          <text x="270" y="63" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontWeight="600">Bypass Channel ({bypassFlow}%)</text>
          <text x="270" y="88" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">No agent — fresh gas only</text>

          {/* ── PATH TO CHAMBER ── */}
          <line x1="130" y1="95" x2="130" y2="130" stroke="hsl(var(--primary))" strokeWidth="2" />
          <line x1="130" y1="130" x2="165" y2="130" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#vap-arrow)" />

          {/* ── VAPORISING CHAMBER ── */}
          <rect x="170" y="105" width="200" height="130" rx="10" fill="hsl(var(--card))" stroke={agent.colour} strokeWidth="2" />

          {/* Inner chamber label */}
          <text x="270" y="122" fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Vaporising Chamber</text>

          {/* Wicks — copper/stainless steel for surface area */}
          {Array.from({ length: 9 }).map((_, i) => (
            <g key={i}>
              <line x1={190 + i * 20} y1="135" x2={190 + i * 20} y2="195" stroke={agent.colour} strokeWidth="1.5" opacity="0.35" />
              {/* Wick fibres */}
              {[0, 1, 2, 3].map(j => (
                <circle key={j} cx={190 + i * 20} cy={145 + j * 14} r="1.5" fill={agent.colour} opacity="0.2" />
              ))}
            </g>
          ))}
          <text x="270" y="145" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">Wicks (↑ surface area for evaporation)</text>

          {/* Saturated vapour region */}
          <rect x="175" y="155" width="190" height="35" rx="4" fill={agent.colour} opacity="0.06" />
          <text x="270" y="175" fontSize="8" fill={agent.colour} textAnchor="middle" fontWeight="600">Saturated Vapour ({chamberConc.toFixed(0)}%)</text>

          {/* Liquid level */}
          <rect x="175" y="195" width="190" height="35" rx="4" fill="url(#liquid-grad)" />
          <text x="270" y="216" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="600">Liquid {agent.name}</text>

          {/* Filler port */}
          <rect x="175" y="225" width="22" height="10" rx="3" fill="hsl(var(--muted-foreground))" opacity="0.3" />
          <text x="186" y="248" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Filler</text>

          {/* Sight glass */}
          <rect x="355" y="200" width="10" height="30" rx="2" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="360" y="245" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="middle">Sight</text>
          <text x="360" y="252" fontSize="5" fill="hsl(var(--muted-foreground))" textAnchor="middle">glass</text>

          {/* Chamber outflow */}
          <line x1="370" y1="140" x2="395" y2="140" stroke={agent.colour} strokeWidth="2" />
          <line x1="395" y1="140" x2="395" y2="72" stroke={agent.colour} strokeWidth="2" />
          <text x="388" y="112" fontSize="8" fill={agent.colour} textAnchor="end" fontWeight="600">({chamberFlow}%)</text>

          {/* ── MIXING POINT ── */}
          <circle cx="395" cy="72" r="10" fill={agent.colour} opacity="0.15" stroke={agent.colour} strokeWidth="1.5" />
          <text x="395" y="75" textAnchor="middle" fontSize="7" fill={agent.colour} fontWeight="bold">Mix</text>

          {/* ── OUTPUT ── */}
          <line x1="405" y1="72" x2="510" y2="72" stroke={agent.colour} strokeWidth="3" markerEnd="url(#vap-arrow-out)" />
          <text x="460" y="62" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">{targetConc}% Out</text>
          <text x="460" y="88" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">To common gas outlet</text>

          {/* ── TEMPERATURE COMPENSATION ── */}
          {showTemp && (
            <g className="animate-in fade-in-0 duration-300">
              {/* Bimetallic strip */}
              <rect x="175" y="105" width="45" height="25" rx="4" fill="hsl(35, 80%, 50%)" opacity="0.12" stroke="hsl(35, 80%, 50%)" strokeWidth="1" />
              <path d="M180,112 Q195,108 205,112 Q210,116 215,112" stroke="hsl(35, 80%, 50%)" strokeWidth="1.5" fill="none" />
              <text x="197" y="126" fontSize="5.5" fill="hsl(35, 80%, 50%)" textAnchor="middle" fontWeight="bold">Bimetallic strip</text>

              {/* Copper heat sink */}
              <rect x="325" y="105" width="40" height="25" rx="4" fill="hsl(15, 70%, 55%)" opacity="0.12" stroke="hsl(15, 70%, 55%)" strokeWidth="1" />
              <text x="345" y="118" fontSize="5.5" fill="hsl(15, 70%, 55%)" textAnchor="middle" fontWeight="bold">Cu heat sink</text>
              <text x="345" y="126" fontSize="5" fill="hsl(15, 70%, 55%)" textAnchor="middle">High thermal mass</text>
            </g>
          )}

          {/* ── SAFETY FEATURES ── */}
          {/* Interlock */}
          <rect x="170" y="260" width="95" height="18" rx="4" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1" />
          <text x="217" y="272" fontSize="7" fill="hsl(var(--destructive))" textAnchor="middle" fontWeight="600">Selectatec Interlock</text>

          {/* Keyed filling */}
          <rect x="275" y="260" width="95" height="18" rx="4" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="1" />
          <text x="322" y="272" fontSize="7" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="600">Agent-Specific Filler</text>

          {/* Info box */}
          <rect x="120" y="290" width="300" height="80" rx="8" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="270" y="308" fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">
            Splitting Ratio (bypass : chamber) = {bypassRatio} : 1
          </text>
          <text x="270" y="322" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">
            Chamber conc = SVP / P_atm = {agent.svp} / 101.3 = {chamberConc.toFixed(1)}%
          </text>
          <text x="270" y="336" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">
            Output conc = (chamber flow / total flow) × chamber conc
          </text>
          <text x="270" y="350" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">
            Plenum type — pressurised by fresh gas flow, NOT patient breathing
          </text>

          {agent.name === "Desflurane" && (
            <g>
              <rect x="170" y="285" width="200" height="12" rx="3" fill="hsl(35, 80%, 50%)" opacity="0.1" />
              <text x="270" y="294" fontSize="7" fill="hsl(35, 80%, 50%)" textAnchor="middle" fontWeight="600">
                ⚠ Desflurane: heated to 39°C (Tec 6) — electrically powered, pressurised injector
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Toggle temperature compensation detail */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowTemp(!showTemp)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            showTemp ? "bg-amber-500/10 border-amber-500/40 text-amber-600" : "border-border text-muted-foreground hover:bg-secondary"
          }`}
        >
          {showTemp ? "Temp Compensation ✓" : "Show Temp Compensation"}
        </button>
      </div>

      {showTemp && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-foreground/80 space-y-1 animate-in fade-in-0">
          <p className="font-semibold text-foreground text-xs">Temperature Compensation Mechanisms</p>
          <p className="text-xs">• <strong>Bimetallic strip</strong> — two metals with different thermal expansion coefficients. As temp ↓, strip bends → opens splitting valve wider → ↑ chamber flow → maintains output concentration.</p>
          <p className="text-xs">• <strong>Copper/brass heat sink</strong> — high thermal mass absorbs latent heat of vaporisation, minimising cooling during use.</p>
          <p className="text-xs">• <strong>Desflurane (Tec 6)</strong> — uniquely heated to 39°C (above its 22.8°C boiling point). Electrically heated, pressurised sump. Vapour injected into fresh gas — fundamentally different from plenum design.</p>
          <p className="text-xs text-muted-foreground italic">Cooling occurs because vaporisation requires latent heat (~200 J/g for volatile agents).</p>
        </div>
      )}
    </div>
  );
};
