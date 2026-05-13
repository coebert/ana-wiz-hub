import { useState, useEffect } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type BlockType = "none" | "ndmr-partial" | "ndmr-complete" | "depol-phase1" | "depol-phase2" | "recovery";

interface BlockInfo {
  id: BlockType;
  label: string;
  color: string;
  twitches: number[]; // T1-T4 heights (0-100)
  fade: boolean;
  ptp: boolean;
  tetanusFade: boolean;
  tofRatio: string;
  description: string;
  clinical: string;
}

const blocks: BlockInfo[] = [
  {
    id: "none", label: "No Block", color: "hsl(170 50% 40%)",
    twitches: [100, 100, 100, 100], fade: false, ptp: false, tetanusFade: false, tofRatio: "1.0",
    description: "Normal neuromuscular transmission. All four twitches are equal in amplitude. TOF ratio T4/T1 = 1.0. No fade on tetanic stimulation. This is the baseline against which all block is measured.",
    clinical: "TOF ratio ≥0.9 is the target for safe extubation. Quantitative monitoring (acceleromyography) is essential — subjective (tactile) assessment cannot reliably detect ratios between 0.4 and 0.9.",
  },
  {
    id: "ndmr-partial", label: "NDMR – Partial Block", color: "hsl(45 70% 50%)",
    twitches: [70, 50, 30, 15], fade: true, ptp: true, tetanusFade: true, tofRatio: "0.21",
    description: "Competitive (non-depolarising) block at moderate depth. Progressive fade: T4 < T3 < T2 < T1. This fade occurs because each successive stimulus depletes the pre-synaptic ACh reserve, and with receptors partially occupied by NDMR, there is insufficient ACh to overcome the block on later twitches.",
    clinical: "TOF ratio < 0.4 — patient is clinically paralysed. At this depth, neostigmine reversal is possible (TOF count ≥2) but slow. Sugammadex 2 mg/kg provides rapid reversal. Fade is the hallmark of competitive block.",
  },
  {
    id: "ndmr-complete", label: "NDMR – Complete Block", color: "hsl(0 60% 50%)",
    twitches: [0, 0, 0, 0], fade: true, ptp: true, tetanusFade: true, tofRatio: "N/A",
    description: "Complete non-depolarising block — >95% receptor occupancy. TOF count = 0 (no visible twitches). Must use Post-Tetanic Count (PTC) to assess depth. Tetanic stimulation temporarily mobilises ACh from reserve pool → post-tetanic facilitation → countable single twitches.",
    clinical: "PTC 1–2 = deep block (sugammadex 4 mg/kg). PTC 0 = intense block (only sugammadex 16 mg/kg for emergency). Neostigmine is INEFFECTIVE at this depth. PTC >5 suggests TOF twitches will return within minutes.",
  },
  {
    id: "depol-phase1", label: "Depolarising – Phase I", color: "hsl(30 70% 50%)",
    twitches: [35, 35, 35, 35], fade: false, ptp: false, tetanusFade: false, tofRatio: "1.0",
    description: "Phase I (depolarising) block from suxamethonium. All four twitches are uniformly reduced in amplitude but there is NO fade — T4/T1 ratio remains ~1.0. No post-tetanic potentiation. Tetanic stimulation shows sustained (unfading) response. This reflects a fundamentally different mechanism: persistent depolarisation → desensitisation, rather than competitive antagonism.",
    clinical: "Preceded by fasciculations. Uniform reduction distinguishes from non-depolarising block. Do NOT give anticholinesterases (would worsen block). Sux is metabolised by plasma cholinesterase — block resolves spontaneously in 5–10 min.",
  },
  {
    id: "depol-phase2", label: "Depolarising – Phase II", color: "hsl(0 50% 45%)",
    twitches: [45, 32, 20, 10], fade: true, ptp: true, tetanusFade: true, tofRatio: "0.22",
    description: "Phase II (desensitisation) block occurs with prolonged or repeated suxamethonium administration (typically >5 mg/kg total). The block characteristics change to resemble non-depolarising block: fade on TOF, post-tetanic potentiation, and fade on tetanic stimulation. The receptor undergoes conformational change.",
    clinical: "May respond to anticholinesterases (unlike Phase I). Occurs more commonly with suxamethonium infusions (historically used). Phase II block may be prolonged in patients with abnormal plasma cholinesterase (dibucaine number <20). Now rarely seen due to avoidance of sux infusions.",
  },
  {
    id: "recovery", label: "Recovery (TOF 0.7)", color: "hsl(200 60% 50%)",
    twitches: [85, 78, 68, 60], fade: true, ptp: false, tetanusFade: true, tofRatio: "0.71",
    description: "Partial recovery from non-depolarising block. TOF ratio 0.71 — twitches are returning but fade is still present. This represents CLINICALLY SIGNIFICANT residual curarisation: the patient may appear to breathe adequately but has impaired pharyngeal function, reduced upper airway patency, and increased aspiration risk.",
    clinical: "TOF ratio 0.7 is UNSAFE for extubation despite appearing 'recovered'. The patient cannot sustain head lift for 5 seconds, has diplopia, and impaired swallow. Target TOF ratio ≥0.9. Residual curarisation (PORC) affects 20–40% of patients without quantitative monitoring.",
  },
];

export const TOFPatternDiagram = () => {
  const [selected, setSelected] = useState<BlockType>("none");
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setFrame(f => (f + 1) % 160), 40);
    return () => clearInterval(id);
  }, [playing]);

  const info = blocks.find(b => b.id === selected)!;
  const cycle = frame % 160;
  // Each twitch appears sequentially: T1 at 0, T2 at 20, T3 at 40, T4 at 60, then pause
  const twitchPhases = [0, 20, 40, 60]; // frame offsets for each twitch

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {blocks.map(b => (
          <button key={b.id} onClick={() => { setSelected(b.id); setFrame(0); setPlaying(true); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
              selected === b.id ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
            }`}>{b.label}</button>
        ))}
      </div>

      <svg viewBox="0 0 500 280" className="w-full" role="img" aria-label={`TOF pattern: ${info.label}`}>
        {/* Background grid */}
        {[0.25, 0.5, 0.75, 1].map((frac, i) => (
          <g key={`grid-${i}`}>
            <line x1={60} y1={220 - frac * 180} x2={440} y2={220 - frac * 180}
              stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
            <text x={55} y={224 - frac * 180} textAnchor="end" fontSize="6" fill="hsl(var(--muted-foreground))">{Math.round(frac * 100)}%</text>
          </g>
        ))}

        {/* Baseline */}
        <line x1={60} y1={220} x2={440} y2={220} stroke="hsl(var(--border))" strokeWidth="1" />
        <text x={250} y={240} textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">
          2 Hz stimulation (0.5s intervals) — repeat every 12–15 s
        </text>

        {/* Y-axis label */}
        <text x={15} y={130} textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" transform="rotate(-90, 15, 130)">
          Twitch Height (% baseline)
        </text>

        {/* Twitch bars — animated appearance */}
        {info.twitches.map((h, i) => {
          const barX = 110 + i * 80;
          const barW = 35;
          const barH = (h / 100) * 180;
          // Animate: bar grows from bottom
          const twitchStart = twitchPhases[i];
          const growProgress = Math.min(1, Math.max(0, (cycle - twitchStart) / 15));
          // Fade out after full display
          const fadeStart = 110;
          const fadeProgress = cycle > fadeStart ? Math.max(0.15, 1 - (cycle - fadeStart) / 40) : 1;
          const currentH = barH * growProgress;
          const opacity = growProgress > 0 ? fadeProgress : 0;

          return (
    <DiagramFigure
      id="tof-pattern-diagram"
      title="Tof pattern"
      description="Auto-generated wrapper for the Tof pattern anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <g key={`twitch-${i}`} opacity={opacity}>
                <rect x={barX} y={220 - currentH} width={barW} height={currentH} rx={3}
                  fill={info.color} fillOpacity={0.6} stroke={info.color} strokeWidth="1" />
                {/* Label */}
                {growProgress >= 1 && (
                  <g>
                    <text x={barX + barW / 2} y={215 - currentH} textAnchor="middle" fontSize="10"
                      fill={info.color} fontWeight="700">T{i + 1}</text>
                    <text x={barX + barW / 2} y={228 - currentH + barH + 14} textAnchor="middle" fontSize="7"
                      fill="hsl(var(--muted-foreground))">{h}%</text>
                  </g>
                )}
              </g>
    </DiagramFigure>
  );
        })}

        {/* TOF ratio display */}
        <rect x={360} y={10} width={130} height={50} rx={6}
          fill="hsl(var(--secondary))" fillOpacity="0.5" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x={425} y={28} textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="700">TOF Ratio (T4/T1)</text>
        <text x={425} y={48} textAnchor="middle" fontSize="16" fill={info.color} fontWeight="800">{info.tofRatio}</text>

        {/* Characteristics badges */}
        <g>
          <rect x={60} y={250} width={55} height={20} rx={4}
            fill={info.fade ? "hsl(0 55% 50%/0.1)" : "hsl(150 50% 45%/0.1)"}
            stroke={info.fade ? "hsl(0 55% 50%)" : "hsl(150 50% 45%)"} strokeWidth="0.75" />
          <text x={87} y={263} textAnchor="middle" fontSize="6.5"
            fill={info.fade ? "hsl(0 55% 50%)" : "hsl(150 50% 45%)"} fontWeight="600">
            Fade: {info.fade ? "YES" : "NO"}
          </text>

          <rect x={125} y={250} width={55} height={20} rx={4}
            fill={info.ptp ? "hsl(0 55% 50%/0.1)" : "hsl(150 50% 45%/0.1)"}
            stroke={info.ptp ? "hsl(0 55% 50%)" : "hsl(150 50% 45%)"} strokeWidth="0.75" />
          <text x={152} y={263} textAnchor="middle" fontSize="6.5"
            fill={info.ptp ? "hsl(0 55% 50%)" : "hsl(150 50% 45%)"} fontWeight="600">
            PTP: {info.ptp ? "YES" : "NO"}
          </text>

          <rect x={190} y={250} width={80} height={20} rx={4}
            fill={info.tetanusFade ? "hsl(0 55% 50%/0.1)" : "hsl(150 50% 45%/0.1)"}
            stroke={info.tetanusFade ? "hsl(0 55% 50%)" : "hsl(150 50% 45%)"} strokeWidth="0.75" />
          <text x={230} y={263} textAnchor="middle" fontSize="6.5"
            fill={info.tetanusFade ? "hsl(0 55% 50%)" : "hsl(150 50% 45%)"} fontWeight="600">
            Tetanus Fade: {info.tetanusFade ? "YES" : "NO"}
          </text>
        </g>

        {/* Fade indicator arrow */}
        {info.fade && info.twitches[0] > 0 && (
          <g opacity="0.5">
            <line x1={127} y1={220 - (info.twitches[0] / 100) * 180 - 5}
              x2={367} y2={220 - (info.twitches[3] / 100) * 180 - 5}
              stroke={info.color} strokeWidth="1.5" strokeDasharray="4 2" />
            <text x={250} y={220 - ((info.twitches[0] + info.twitches[3]) / 200) * 180 - 12}
              textAnchor="middle" fontSize="7" fill={info.color} fontWeight="700">FADE ↘</text>
          </g>
        )}

        {/* No fade indicator */}
        {!info.fade && info.twitches[0] > 0 && (
          <g opacity="0.4">
            <line x1={127} y1={220 - (info.twitches[0] / 100) * 180 - 5}
              x2={367} y2={220 - (info.twitches[3] / 100) * 180 - 5}
              stroke={info.color} strokeWidth="1.5" />
            <text x={250} y={220 - (info.twitches[0] / 100) * 180 - 12}
              textAnchor="middle" fontSize="7" fill={info.color} fontWeight="700">NO FADE →</text>
          </g>
        )}
      </svg>

      {/* Play/pause */}
      <div className="flex justify-center">
        <button onClick={() => setPlaying(!playing)}
          className="px-4 py-1.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors">
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      {/* Info panel */}
      <div className="rounded-lg border border-border bg-secondary/30 p-4" key={selected}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
          <h4 className="text-sm font-semibold text-foreground">{info.label}</h4>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
        <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-2">
          <span className="font-semibold text-foreground/80">Clinical: </span>{info.clinical}
        </p>
      </div>
    </div>
  );
};
