import { useState, useRef, useEffect, useCallback } from "react";
import { Play, RotateCcw, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { HotspotLayer, HotspotHint, type HotspotDef } from "./HotspotLayer";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Apply a "seek" to every CSS animation under the container so the user can
 * scrub frames manually. We pause each `.anim-*` element and use a negative
 * `animation-delay` to position it at the requested time. Restoring clears
 * the inline overrides so the original staggered timings resume.
 */
const seekContainerAnimations = (root: HTMLElement | null, ms: number | null) => {
  if (!root) return;
  const nodes = root.querySelectorAll<HTMLElement | SVGElement>('[class*="anim-"]');
  nodes.forEach((node) => {
    const el = node as unknown as { style: CSSStyleDeclaration };
    if (ms === null) {
      el.style.removeProperty("animation-play-state");
      el.style.removeProperty("animation-delay");
    } else {
      el.style.setProperty("animation-play-state", "paused", "important");
      el.style.setProperty("animation-delay", `-${ms}ms`, "important");
    }
  });
};

const TimelineScrubber = ({
  durationMs,
  value,
  onChange,
  onTogglePlay,
  isPlaying,
}: {
  durationMs: number;
  value: number;
  onChange: (ms: number) => void;
  onTogglePlay: () => void;
  isPlaying: boolean;
}) => {
  const pct = Math.round((value / durationMs) * 100);
  return (
    <div className="flex items-center gap-2 mt-2 px-1">
      <Button
        size="sm"
        variant="ghost"
        onClick={onTogglePlay}
        className="h-6 w-6 p-0 shrink-0"
        aria-label={isPlaying ? "Pause animation" : "Play animation"}
      >
        {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
      </Button>
      <Slider
        value={[value]}
        min={0}
        max={durationMs}
        step={20}
        onValueChange={(v) => onChange(v[0])}
        aria-label="Mechanism animation timeline"
        className="flex-1"
      />
      <span className="text-[10px] tabular-nums text-muted-foreground w-9 text-right">{pct}%</span>
    </div>
  );
};

type Condition = "mg" | "epilepsy" | "ms" | "pd" | "mnd" | "md" | "sci";

const conditions: { id: Condition; label: string; tagline: string }[] = [
  { id: "mg", label: "Myasthenia gravis", tagline: "Anti-AChR antibodies block postsynaptic nicotinic receptors" },
  { id: "epilepsy", label: "Epilepsy", tagline: "Imbalance: excess glutamate excitation vs deficient GABA inhibition" },
  { id: "ms", label: "Multiple sclerosis", tagline: "Autoimmune demyelination of CNS axons → conduction failure" },
  { id: "pd", label: "Parkinson's disease", tagline: "Loss of nigrostriatal dopamine → basal-ganglia output imbalance" },
  { id: "mnd", label: "Motor neuron disease", tagline: "Upper + lower motor neuron degeneration → denervation supersensitivity" },
  { id: "md", label: "Muscular dystrophies", tagline: "Dystrophin/membrane defect → fragile sarcolemma, leaky to K⁺/CK" },
  { id: "sci", label: "Spinal cord injury", tagline: "Loss of supraspinal inhibition → unmodulated reflex arcs below lesion" },
];

const MECHANISM_LABELS: Record<Condition, string> = {
  mg: "Animate AChR blockade",
  epilepsy: "Animate seizure firing",
  ms: "Animate demyelination",
  pd: "Animate dopamine depletion",
  mnd: "Animate denervation spread",
  md: "Animate sarcolemmal tearing",
  sci: "Animate sympathetic surge",
};

const NeuroDiseasePathophysDiagram = () => {
  const [active, setActive] = useState<Condition>("mg");
  const meta = conditions.find((c) => c.id === active)!;
  const mechanismLabel = MECHANISM_LABELS[active];

  const [playing, setPlaying] = useState(false);
  const [scrubMs, setScrubMs] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const autoPlayedFor = useRef<Set<Condition>>(new Set());

  const trigger = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setScrubMs(null);
    seekContainerAnimations(sceneRef.current, null);
    setPlaying(false);
    requestAnimationFrame(() => {
      setPlaying(true);
      timeoutRef.current = window.setTimeout(() => setPlaying(false), MECHANISM_DURATION_MS);
    });
  }, []);

  const handleScrub = useCallback((ms: number) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setPlaying(true); // ensure .is-playing class so animations are applied
    setScrubMs(ms);
    // Apply seek after the class is on the DOM
    requestAnimationFrame(() => seekContainerAnimations(sceneRef.current, ms));
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (scrubMs !== null) {
      // Resume from scrub position: clear overrides and re-trigger from start
      trigger();
    } else if (playing) {
      setPlaying(false);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    } else {
      trigger();
    }
  }, [scrubMs, playing, trigger]);

  // Reset scrub overrides whenever the active condition changes (DOM swaps)
  useEffect(() => {
    setScrubMs(null);
    seekContainerAnimations(sceneRef.current, null);
  }, [active]);

  // Auto-play when scrolled into view, and again whenever a new condition is selected.
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            if (!autoPlayedFor.current.has(active)) {
              autoPlayedFor.current.add(active);
              trigger();
            }
            break;
          }
        }
      },
      { threshold: [0.35] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active, trigger]);

  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div ref={containerRef} className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div>
        <h3 className="font-semibold text-foreground mb-1">Pathophysiology of neurological co-existing disease</h3>
        <p className="text-xs text-muted-foreground">
          Select a condition to see the cellular/anatomical lesion driving its anaesthetic implications.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {conditions.map((c) => (
          <Button
            key={c.id}
            size="sm"
            variant={active === c.id ? "default" : "outline"}
            onClick={() => setActive(c.id)}
            className="text-xs h-7"
          >
            {c.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={trigger}
          aria-label={mechanismLabel}
          className="h-7 px-2 text-[11px] gap-1"
        >
          {playing ? <RotateCcw className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {playing ? "Replay" : mechanismLabel}
        </Button>
      </div>

      <div
        ref={sceneRef}
        className={`neuro-anim rounded-md border border-border bg-background p-3 overflow-x-auto cursor-pointer ${
          playing ? "is-playing" : ""
        }`}
        onClick={trigger}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            trigger();
          }
        }}
      >
        <svg viewBox="0 0 460 250" className="w-full h-auto min-w-[420px]" role="img" aria-label={`${meta.label} pathophysiology`}>
          {active === "mg" && <MGDiagram />}
          {active === "epilepsy" && <EpilepsyDiagram />}
          {active === "ms" && <MSDiagram />}
          {active === "pd" && <PDDiagram />}
          {active === "mnd" && <MNDDiagram />}
          {active === "md" && <MDDiagram />}
          {active === "sci" && <SCIDiagram />}
        </svg>
      </div>
      <TimelineScrubber
        durationMs={MECHANISM_DURATION_MS}
        value={scrubMs ?? 0}
        onChange={handleScrub}
        onTogglePlay={handleTogglePlay}
        isPlaying={playing && scrubMs === null}
      />
      <HotspotHint>
        Hover or tap the dashed regions for explanations · click the diagram, press “{mechanismLabel}”, or drag the timeline to step through the mechanism.
      </HotspotHint>

      <div className="rounded-md border border-border bg-muted/40 p-3 text-sm">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">{meta.label}</p>
        <p className="text-muted-foreground">{meta.tagline}</p>
      </div>
    </div>
  );
};

/* ---------- Individual SVG diagrams ---------- */

const labelClass = "fill-foreground";
const subClass = "fill-muted-foreground";

const MGDiagram = () => (
  <g>
    {/* Presynaptic terminal */}
    <path d="M 30 60 Q 80 30 140 60 L 140 110 Q 80 130 30 110 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1" />
    <text x="85" y="55" textAnchor="middle" fontSize="9" fontWeight="600" className={labelClass}>Motor nerve terminal</text>
    {/* ACh vesicles */}
    {[50, 75, 100, 120].map((x, i) => (
      <circle key={i} cx={x} cy={85} r="5" fill="hsl(var(--clinical))" />
    ))}
    {/* ACh in cleft */}
    {[60, 85, 110].map((x, i) => (
      <circle key={i} cx={x} cy={140} r="3" fill="hsl(var(--clinical))" />
    ))}
    <text x="85" y="160" textAnchor="middle" fontSize="7.5" className={subClass}>ACh released normally</text>
    {/* Postsynaptic muscle membrane with reduced receptors */}
    <rect x="20" y="170" width="160" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
    {/* Few remaining receptors — fade as Ab "blocks" them */}
    <rect x="40" y="165" width="10" height="12" fill="hsl(var(--primary))" className="anim-receptor-fade" />
    <rect x="120" y="165" width="10" height="12" fill="hsl(var(--primary))" className="anim-receptor-fade" />
    {/* Antibody-blocked receptors drop in from above */}
    {[60, 80, 100, 140].map((x, i) => (
      <g key={i} className="anim-receptor-block" style={{ animationDelay: `${i * 0.12}s` }}>
        <rect x={x} y={165} width="10" height="12" fill="hsl(var(--destructive) / 0.4)" stroke="hsl(var(--destructive))" />
        <path d={`M ${x - 2} 158 L ${x + 12} 158`} stroke="hsl(var(--destructive))" strokeWidth="1.5" />
      </g>
    ))}
    <text x="100" y="225" textAnchor="middle" fontSize="8" className={labelClass}>Postsynaptic muscle membrane</text>
    <text x="100" y="237" textAnchor="middle" fontSize="7" className={subClass}>↓ functional nicotinic AChR (autoantibodies + complement)</text>

    {/* Right side: anti-AChR Ab */}
    <g transform="translate(260 50)">
      <text x="90" y="0" textAnchor="middle" fontSize="9" fontWeight="600" className={labelClass}>Autoantibodies</text>
      {[0, 25, 50].map((dy, i) => (
        <g key={i} transform={`translate(0 ${20 + dy})`}>
          <path d="M 0 0 L 12 -8 L 24 0 L 12 8 Z" fill="hsl(var(--destructive) / 0.3)" stroke="hsl(var(--destructive))" />
          <text x="35" y="3" fontSize="7.5" className={subClass}>Anti-AChR IgG</text>
        </g>
      ))}
      <text x="90" y="115" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">Result</text>
      <text x="90" y="128" textAnchor="middle" fontSize="7.5" className={subClass}>↑ sensitivity to non-depolarising NMBAs</text>
      <text x="90" y="140" textAnchor="middle" fontSize="7.5" className={subClass}>resistance to suxamethonium (↑ ED₉₅)</text>
      <text x="90" y="152" textAnchor="middle" fontSize="7.5" className={subClass}>fatigable weakness on repeated stimulation</text>
    </g>
    <HotspotLayer hotspots={mgHotspots} />
  </g>
);

const EpilepsyDiagram = () => (
  <g>
    {/* Two neurons: glutamatergic (excit) and GABAergic (inhib) onto pyramidal cell */}
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Imbalance of excitation vs inhibition → seizure focus
    </text>

    {/* Excitatory neuron */}
    <circle cx="80" cy="80" r="22" fill="hsl(var(--destructive) / 0.18)" stroke="hsl(var(--destructive))" />
    <text x="80" y="83" textAnchor="middle" fontSize="8" className={labelClass}>Glu</text>
    <line x1="100" y1="90" x2="200" y2="135" stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#exc-arrow)" />
    <text x="140" y="105" fontSize="7.5" className={subClass}>↑↑ glutamate (NMDA/AMPA)</text>

    {/* Inhibitory neuron — fades to show loss of inhibition */}
    <g className="anim-gaba-fade">
      <circle cx="80" cy="180" r="22" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" />
      <text x="80" y="183" textAnchor="middle" fontSize="8" className={labelClass}>GABA</text>
      <line x1="100" y1="170" x2="200" y2="155" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="200" cy="155" r="3" fill="hsl(var(--primary))" />
    </g>
    <text x="140" y="195" fontSize="7.5" className={subClass}>↓ GABAergic inhibition</text>

    {/* Pyramidal target neuron — pulses when seizure fires */}
    <circle cx="240" cy="145" r="28" fill="hsl(var(--clinical) / 0.18)" stroke="hsl(var(--clinical))" className="anim-pyramidal" />
    <text x="240" y="143" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Pyramidal</text>
    <text x="240" y="155" textAnchor="middle" fontSize="7" className={subClass}>cortical neuron</text>

    {/* Burst output — flickers with seizure firing */}
    <path d="M 270 130 L 290 120 L 295 140 L 310 125 L 320 145 L 340 130 L 350 150" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" className="anim-burst" />
    <text x="310" y="170" fontSize="8" fontWeight="600" className="fill-destructive">Hypersynchronous firing</text>

    {/* Right column: drug effects */}
    <g transform="translate(370 70)">
      <text x="0" y="0" fontSize="8" fontWeight="600" className={labelClass}>Anaesthetic targets</text>
      <text x="0" y="14" fontSize="7" className={subClass}>↑ GABA: propofol, thiopentone</text>
      <text x="0" y="26" fontSize="7" className={subClass}>↓ NMDA: ketamine (mixed)</text>
      <text x="0" y="38" fontSize="7" className={subClass}>↓ Na⁺ channels: phenytoin</text>
      <text x="0" y="56" fontSize="8" fontWeight="600" className="fill-destructive">Avoid:</text>
      <text x="0" y="68" fontSize="7" className={subClass}>enflurane, tramadol, pethidine</text>
    </g>

    <defs>
      <marker id="exc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--destructive))" />
      </marker>
    </defs>
    <HotspotLayer hotspots={epilepsyHotspots} />
  </g>
);

const MSDiagram = () => (
  <g>
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Autoimmune demyelination of CNS axons
    </text>

    {/* Healthy axon (top) */}
    <text x="60" y="55" fontSize="8" fontWeight="600" className={labelClass}>Normal axon</text>
    <line x1="60" y1="80" x2="400" y2="80" stroke="hsl(var(--muted-foreground))" strokeWidth="3" />
    {[80, 140, 200, 260, 320, 380].map((x, i) => (
      <ellipse key={i} cx={x} cy={80} rx="22" ry="9" fill="hsl(var(--clinical) / 0.6)" stroke="hsl(var(--clinical))" />
    ))}
    {/* Saltatory conduction arrows — sweep along intact axon */}
    {[110, 170, 230, 290, 350].map((x, i) => (
      <path key={i} d={`M ${x - 8} 65 Q ${x} 50 ${x + 8} 65`} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#con-arrow)" className="anim-conduction" style={{ animationDelay: `${i * 0.12}s` }} />
    ))}
    <text x="230" y="42" textAnchor="middle" fontSize="7.5" className={subClass}>Fast saltatory conduction (intact myelin)</text>

    {/* Demyelinated axon (bottom) */}
    <text x="60" y="155" fontSize="8" fontWeight="600" className="fill-destructive">MS plaque</text>
    <line x1="60" y1="180" x2="400" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="3" />
    {/* Some myelin intact */}
    <ellipse cx="80" cy="180" rx="22" ry="9" fill="hsl(var(--clinical) / 0.6)" stroke="hsl(var(--clinical))" />
    <ellipse cx="380" cy="180" rx="22" ry="9" fill="hsl(var(--clinical) / 0.6)" stroke="hsl(var(--clinical))" />
    {/* Demyelinated stretch — myelin segments strip away */}
    {[160, 220, 280].map((x, i) => (
      <ellipse key={i} cx={x} cy={180} rx="20" ry="8" fill="hsl(var(--clinical) / 0.6)" stroke="hsl(var(--clinical))" className="anim-myelin-strip" style={{ animationDelay: `${i * 0.18}s` }} />
    ))}
    {/* Immune cells */}
    {[155, 225, 285].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy={205} r="5" fill="hsl(var(--destructive))" />
        <line x1={x} y1={200} x2={x} y2={189} stroke="hsl(var(--destructive))" strokeWidth="1" />
      </g>
    ))}
    <text x="220" y="225" textAnchor="middle" fontSize="7.5" className={subClass}>T cells, macrophages, anti-myelin Ab</text>
    <text x="220" y="237" textAnchor="middle" fontSize="7.5" className="fill-destructive">→ slowed/blocked conduction; heat-sensitive</text>

    <defs>
      <marker id="con-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
      </marker>
    </defs>
    <HotspotLayer hotspots={msHotspots} />
  </g>
);

const PDDiagram = () => (
  <g>
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Loss of nigrostriatal dopaminergic neurons
    </text>

    {/* Brain schematic */}
    <ellipse cx="180" cy="135" rx="130" ry="80" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" />
    {/* Striatum */}
    <ellipse cx="140" cy="115" rx="32" ry="20" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" />
    <text x="140" y="118" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Striatum</text>
    {/* Substantia nigra */}
    <ellipse cx="220" cy="170" rx="35" ry="14" fill="hsl(var(--destructive) / 0.25)" stroke="hsl(var(--destructive))" strokeDasharray="3 2" />
    <text x="220" y="173" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>SN pars compacta</text>

    {/* Degenerating dopaminergic projection — fades out */}
    <path d="M 200 158 Q 180 140 155 122" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="4 3" className="anim-dopamine" />
    <text x="155" y="155" fontSize="7.5" className="fill-destructive">↓↓ dopamine</text>

    {/* Lewy body — grows in */}
    <circle cx="230" cy="170" r="3" fill="hsl(var(--destructive))" className="anim-lewy" />
    <text x="240" y="168" fontSize="6.5" className={subClass}>α-synuclein (Lewy)</text>

    {/* Output: imbalance */}
    <g transform="translate(340 60)">
      <text x="0" y="0" fontSize="8" fontWeight="600" className={labelClass}>Basal-ganglia output</text>
      <text x="0" y="14" fontSize="7" className={subClass}>↓ direct (D1) pathway</text>
      <text x="0" y="26" fontSize="7" className={subClass}>↑ indirect (D2) pathway</text>
      <text x="0" y="38" fontSize="7" className={subClass}>↑ thalamic inhibition</text>
      <text x="0" y="56" fontSize="8" fontWeight="600" className="fill-destructive">Clinical</text>
      <text x="0" y="68" fontSize="7" className={subClass}>tremor, rigidity, bradykinesia</text>
      <text x="0" y="80" fontSize="7" className={subClass}>autonomic dysfunction, sialorrhoea</text>
      <text x="0" y="100" fontSize="8" fontWeight="600" className={labelClass}>Anaesthesia</text>
      <text x="0" y="112" fontSize="7" className={subClass}>Continue L-DOPA · avoid D2 antagonists</text>
    </g>
    <HotspotLayer hotspots={pdHotspots} />
  </g>
);

const MNDDiagram = () => (
  <g>
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Upper + lower motor neuron degeneration
    </text>

    {/* Cortex */}
    <rect x="40" y="40" width="120" height="30" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
    <text x="100" y="58" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Motor cortex (UMN)</text>
    {/* UMN with degeneration — fades */}
    <line x1="100" y1="70" x2="100" y2="120" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="4 3" className="anim-dopamine" />
    <text x="115" y="100" fontSize="7" className="fill-destructive">UMN loss</text>

    {/* Anterior horn */}
    <ellipse cx="100" cy="140" rx="22" ry="14" fill="hsl(var(--destructive) / 0.2)" stroke="hsl(var(--destructive))" strokeDasharray="3 2" />
    <text x="100" y="143" textAnchor="middle" fontSize="7.5" fontWeight="600" className={labelClass}>Anterior horn (LMN)</text>

    {/* LMN axon to muscle - degenerating, fades */}
    <line x1="122" y1="140" x2="220" y2="140" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="4 3" className="anim-dopamine" />
    <text x="170" y="132" textAnchor="middle" fontSize="7" className="fill-destructive">LMN degeneration</text>

    {/* Muscle with denervation supersensitivity */}
    <rect x="225" y="115" width="90" height="50" rx="4" fill="hsl(var(--clinical) / 0.18)" stroke="hsl(var(--clinical))" />
    <text x="270" y="132" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Muscle fibre</text>
    {/* Extra-junctional AChRs spread along the membrane */}
    <g className="anim-denervation">
      {[235, 250, 265, 280, 295, 305].map((x, i) => (
        <rect key={i} x={x} y={150} width="6" height="8" fill="hsl(var(--destructive))" />
      ))}
    </g>
    <text x="270" y="178" textAnchor="middle" fontSize="7" className={subClass}>↑↑ extra-junctional AChR (denervation supersensitivity)</text>

    {/* Right column */}
    <g transform="translate(335 60)">
      <text x="0" y="0" fontSize="8" fontWeight="600" className="fill-destructive">Anaesthetic risks</text>
      <text x="0" y="14" fontSize="7" className={subClass}>Suxamethonium → lethal K⁺ release</text>
      <text x="0" y="26" fontSize="7" className={subClass}>↑ sensitivity to non-dep NMBAs</text>
      <text x="0" y="38" fontSize="7" className={subClass}>Bulbar weakness → aspiration</text>
      <text x="0" y="50" fontSize="7" className={subClass}>Restrictive ventilation, weak cough</text>
    </g>
    <HotspotLayer hotspots={mndHotspots} />
  </g>
);

const MDDiagram = () => (
  <g>
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Dystrophin / sarcolemmal protein deficiency
    </text>

    {/* Healthy sarcolemma */}
    <text x="115" y="50" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Normal sarcolemma</text>
    <rect x="30" y="60" width="170" height="20" fill="hsl(var(--clinical) / 0.3)" stroke="hsl(var(--clinical))" />
    <rect x="30" y="80" width="170" height="20" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
    {/* Dystrophin links */}
    {[50, 80, 110, 140, 170].map((x, i) => (
      <line key={i} x1={x} y1={80} x2={x} y2={100} stroke="hsl(var(--primary))" strokeWidth="2" />
    ))}
    <text x="115" y="115" textAnchor="middle" fontSize="7" className={subClass}>Dystrophin links cytoskeleton ↔ ECM</text>

    {/* Diseased sarcolemma */}
    <text x="115" y="148" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">Dystrophin-deficient</text>
    <rect x="30" y="158" width="170" height="20" fill="hsl(var(--destructive) / 0.25)" stroke="hsl(var(--destructive))" strokeDasharray="3 2" />
    <rect x="30" y="178" width="170" height="20" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
    {/* Tears in membrane — animate appearing */}
    {[60, 110, 160].map((x, i) => (
      <path key={i} d={`M ${x - 6} 158 L ${x + 6} 178`} stroke="hsl(var(--destructive))" strokeWidth="1.5" className="anim-tear" style={{ animationDelay: `${i * 0.15}s` }} />
    ))}
    {/* K+ leaking out — float upward */}
    {[55, 115, 165].map((x, i) => (
      <g key={i} className="anim-k-leak" style={{ animationDelay: `${0.4 + i * 0.15}s` }}>
        <text x={x} y={150} fontSize="8" fontWeight="700" className="fill-destructive">K⁺</text>
        <path d={`M ${x} 153 L ${x} 145`} stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#k-arrow)" />
      </g>
    ))}
    {/* CK leaking */}
    <text x="90" y="218" fontSize="7.5" className={subClass}>↑ serum CK · myoglobinuria · rhabdomyolysis risk</text>

    {/* Right column */}
    <g transform="translate(255 50)">
      <text x="0" y="0" fontSize="8" fontWeight="600" className="fill-destructive">Triggers</text>
      <text x="0" y="14" fontSize="7" className={subClass}>Suxamethonium → hyperK⁺, arrest</text>
      <text x="0" y="26" fontSize="7" className={subClass}>Volatiles → MH-like rhabdomyolysis</text>
      <text x="0" y="38" fontSize="7" className={subClass}>(Myotonic DM: cold, neostigmine, sux)</text>
      <text x="0" y="58" fontSize="8" fontWeight="600" className={labelClass}>Associated</text>
      <text x="0" y="70" fontSize="7" className={subClass}>Cardiomyopathy, conduction defects</text>
      <text x="0" y="82" fontSize="7" className={subClass}>Restrictive lung disease (scoliosis)</text>
      <text x="0" y="100" fontSize="8" fontWeight="600" className={labelClass}>Choose</text>
      <text x="0" y="112" fontSize="7" className={subClass}>TIVA · rocuronium + sugammadex</text>
    </g>

    <defs>
      <marker id="k-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--destructive))" />
      </marker>
    </defs>
    <HotspotLayer hotspots={mdHotspots} />
  </g>
);

const SCIDiagram = () => (
  <g>
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Autonomic dysreflexia (lesion ≥ T6)
    </text>

    {/* Spinal cord schematic */}
    <rect x="195" y="40" width="40" height="180" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
    <text x="215" y="55" textAnchor="middle" fontSize="7" className={subClass}>cord</text>

    {/* Lesion line at T6 */}
    <line x1="190" y1="100" x2="240" y2="100" stroke="hsl(var(--destructive))" strokeWidth="3" />
    <text x="245" y="103" fontSize="8" fontWeight="600" className="fill-destructive">T6 lesion</text>
    <text x="245" y="114" fontSize="7" className={subClass}>(supraspinal inhibition LOST)</text>

    {/* Above lesion */}
    <text x="100" y="60" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Above lesion</text>
    <text x="100" y="74" textAnchor="middle" fontSize="7" className={subClass}>baroreflex intact</text>
    <text x="100" y="86" textAnchor="middle" fontSize="7" className="fill-clinical">flushing, sweating</text>
    <text x="100" y="98" textAnchor="middle" fontSize="7" className="fill-clinical">reflex bradycardia (vagal)</text>
    <path d="M 150 80 Q 175 80 195 90" fill="none" stroke="hsl(var(--clinical))" strokeWidth="1.5" markerEnd="url(#sci-arrow-c)" />

    {/* Below lesion: trigger */}
    <text x="100" y="160" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">Below lesion</text>
    <text x="100" y="174" textAnchor="middle" fontSize="7" className={subClass}>Trigger:</text>
    <text x="100" y="186" textAnchor="middle" fontSize="7" className={subClass}>bladder/bowel distension,</text>
    <text x="100" y="198" textAnchor="middle" fontSize="7" className={subClass}>skin stim, uterine contraction</text>
    <path d="M 150 180 Q 175 180 195 165" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#sci-arrow-d)" className="anim-surge" />

    {/* Sympathetic outflow below lesion */}
    <text x="335" y="155" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">Unchecked</text>
    <text x="335" y="167" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">sympathetic surge</text>
    <text x="335" y="180" textAnchor="middle" fontSize="7" className={subClass}>vasoconstriction below lesion</text>
    <text x="335" y="192" textAnchor="middle" fontSize="7" className={subClass}>pallor, piloerection</text>
    <path d="M 235 165 Q 270 165 290 165" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#sci-arrow-d)" className="anim-surge" style={{ animationDelay: "0.4s" }} />

    {/* Result — pulses red as the crisis hits */}
    <rect x="280" y="40" width="160" height="60" rx="4" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive))" className="anim-crisis" style={{ animationDelay: "0.7s" }} />
    <text x="360" y="58" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">CRISIS</text>
    <text x="360" y="72" textAnchor="middle" fontSize="7" className={subClass}>severe HTN (CVA / MI risk)</text>
    <text x="360" y="84" textAnchor="middle" fontSize="7" className={subClass}>headache, bradycardia</text>
    <text x="360" y="96" textAnchor="middle" fontSize="7" className={subClass}>Rx: sit up, remove trigger, GTN</text>

    <defs>
      <marker id="sci-arrow-c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--clinical))" />
      </marker>
      <marker id="sci-arrow-d" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--destructive))" />
      </marker>
    </defs>
    <HotspotLayer hotspots={sciHotspots} />
  </g>
);

export default NeuroDiseasePathophysDiagram;

/* ---------- Hotspot definitions (one set per diagram) ---------- */

const mgHotspots: HotspotDef[] = [
  {
    id: "nerve-terminal",
    label: "Motor nerve terminal",
    detail:
      "Presynaptic bouton storing ACh vesicles. Release is intact in MG — the defect is on the muscle side of the cleft.",
    shape: { type: "rect", x: 30, y: 50, w: 110, h: 75 },
  },
  {
    id: "ach",
    label: "Acetylcholine in cleft",
    detail:
      "Released normally, but with fewer functional receptors the safety margin collapses → fatigable block of transmission.",
    shape: { type: "rect", x: 50, y: 130, w: 80, h: 20 },
  },
  {
    id: "achr",
    label: "Postsynaptic nicotinic AChR",
    detail:
      "Reduced in number and cross-linked / internalised by anti-AChR IgG and complement → marked sensitivity to non-depolarising NMBAs.",
    shape: { type: "rect", x: 35, y: 162, w: 130, h: 22 },
  },
  {
    id: "antibody",
    label: "Anti-AChR autoantibodies",
    detail:
      "IgG to the α-subunit of the nicotinic AChR — the central immunological lesion of generalised MG.",
    shape: { type: "rect", x: 250, y: 60, w: 180, h: 80 },
  },
];

const epilepsyHotspots: HotspotDef[] = [
  {
    id: "glu",
    label: "Glutamatergic neuron (excitation)",
    detail:
      "Releases glutamate onto NMDA/AMPA receptors. Excess excitation lowers seizure threshold.",
    shape: { type: "circle", cx: 80, cy: 80, r: 26 },
  },
  {
    id: "gaba",
    label: "GABAergic interneuron (inhibition)",
    detail:
      "Tonic inhibition via GABA-A receptors. Loss of inhibition is the other half of the seizure equation.",
    shape: { type: "circle", cx: 80, cy: 180, r: 26 },
  },
  {
    id: "pyramidal",
    label: "Cortical pyramidal neuron",
    detail:
      "When excitation > inhibition this cell fires hypersynchronously, propagating a seizure focus.",
    shape: { type: "circle", cx: 240, cy: 145, r: 32 },
  },
  {
    id: "drug-targets",
    label: "Anaesthetic targets",
    detail:
      "Propofol/thiopentone potentiate GABA-A; phenytoin blocks Na⁺ channels; ketamine antagonises NMDA. Avoid pro-convulsants (enflurane, tramadol, pethidine).",
    shape: { type: "rect", x: 360, y: 60, w: 95, h: 90 },
  },
];

const msHotspots: HotspotDef[] = [
  {
    id: "myelin",
    label: "Myelin sheath (oligodendrocyte)",
    detail:
      "CNS myelin formed by oligodendrocytes — the immune target in MS. Intact myelin permits fast saltatory conduction.",
    shape: { type: "rect", x: 60, y: 70, w: 340, h: 24 },
  },
  {
    id: "plaque",
    label: "Demyelinating plaque",
    detail:
      "Focal loss of myelin exposes Na⁺ channels and slows or blocks conduction — heat (Uhthoff) worsens this.",
    shape: { type: "rect", x: 130, y: 168, w: 200, h: 26 },
  },
  {
    id: "immune",
    label: "T cells, macrophages, anti-myelin Ab",
    detail:
      "Autoreactive CD4⁺ T cells cross the BBB and recruit macrophages and antibody-mediated demyelination.",
    shape: { type: "rect", x: 130, y: 198, w: 200, h: 26 },
  },
];

const pdHotspots: HotspotDef[] = [
  {
    id: "striatum",
    label: "Striatum (caudate + putamen)",
    detail:
      "Receives the dopaminergic projection from SN. D1 (direct) facilitates movement, D2 (indirect) inhibits it.",
    shape: { type: "ellipse", cx: 140, cy: 115, rx: 34, ry: 22 },
  },
  {
    id: "snpc",
    label: "Substantia nigra pars compacta",
    detail:
      "Pigmented dopaminergic neurons whose loss is the primary lesion of PD; α-synuclein aggregates form Lewy bodies.",
    shape: { type: "ellipse", cx: 220, cy: 170, rx: 38, ry: 16 },
  },
  {
    id: "pathway",
    label: "Nigrostriatal projection",
    detail:
      "Dopaminergic axons from SNc → striatum. Their degeneration shifts basal-ganglia output toward thalamic inhibition → bradykinesia, rigidity, tremor.",
    shape: { type: "rect", x: 150, y: 115, w: 60, h: 50 },
  },
  {
    id: "output",
    label: "Basal-ganglia output",
    detail:
      "Net effect of dopamine loss = ↓ direct + ↑ indirect pathway → ↑ thalamic inhibition. Avoid central D2 antagonists; continue L-DOPA.",
    shape: { type: "rect", x: 335, y: 50, w: 120, h: 80 },
  },
];

const mndHotspots: HotspotDef[] = [
  {
    id: "umn",
    label: "Upper motor neuron (motor cortex)",
    detail:
      "Loss produces spasticity, hyperreflexia and Babinski sign. Combined with LMN loss = ALS phenotype.",
    shape: { type: "rect", x: 40, y: 40, w: 120, h: 30 },
  },
  {
    id: "lmn",
    label: "Lower motor neuron (anterior horn)",
    detail:
      "Anterior horn cell loss produces flaccid weakness, fasciculations and denervation supersensitivity at the muscle.",
    shape: { type: "ellipse", cx: 100, cy: 140, rx: 24, ry: 16 },
  },
  {
    id: "muscle",
    label: "Denervated muscle fibre",
    detail:
      "Extra-junctional ACh receptors spread across the membrane — suxamethonium opens them all, releasing a lethal K⁺ surge.",
    shape: { type: "rect", x: 225, y: 115, w: 90, h: 50 },
  },
  {
    id: "ej-achr",
    label: "Extra-junctional AChRs",
    detail:
      "Up-regulated immature receptors that stay open longer than normal — the substrate for hyperkalaemic arrest.",
    shape: { type: "rect", x: 230, y: 145, w: 85, h: 18 },
  },
];

const mdHotspots: HotspotDef[] = [
  {
    id: "normal-membrane",
    label: "Normal sarcolemma + dystrophin",
    detail:
      "Dystrophin links the actin cytoskeleton to the extracellular matrix, stabilising the membrane during contraction.",
    shape: { type: "rect", x: 30, y: 60, w: 170, h: 40 },
  },
  {
    id: "dystrophic-membrane",
    label: "Dystrophin-deficient sarcolemma",
    detail:
      "Without dystrophin the membrane tears with stress and depolarisation, leaking K⁺ and CK — hence rhabdomyolysis with sux/volatiles.",
    shape: { type: "rect", x: 30, y: 158, w: 170, h: 40 },
  },
  {
    id: "triggers",
    label: "Anaesthetic triggers / choices",
    detail:
      "Suxamethonium → hyperkalaemic arrest; volatiles → MH-like rhabdomyolysis. Default to TIVA + rocuronium/sugammadex.",
    shape: { type: "rect", x: 250, y: 50, w: 200, h: 90 },
  },
];

const sciHotspots: HotspotDef[] = [
  {
    id: "cord",
    label: "Spinal cord",
    detail:
      "Above a T6 lesion the descending sympathetic outflow can no longer modulate splanchnic vasoconstriction below the level.",
    shape: { type: "rect", x: 195, y: 40, w: 40, h: 180, rx: 6 },
  },
  {
    id: "lesion",
    label: "T6 lesion line",
    detail:
      "Critical level — at or above T6, dysreflexia becomes possible because most splanchnic outflow lies below the lesion.",
    shape: { type: "rect", x: 188, y: 95, w: 60, h: 14 },
  },
  {
    id: "above",
    label: "Above the lesion",
    detail:
      "Baroreflex still active → flushing, sweating and reflex (vagal) bradycardia in response to severe hypertension.",
    shape: { type: "rect", x: 50, y: 55, w: 100, h: 55 },
  },
  {
    id: "below",
    label: "Below the lesion (trigger zone)",
    detail:
      "Bladder/bowel distension, skin stimulation or uterine contraction → afferent surge → unmodulated sympathetic discharge.",
    shape: { type: "rect", x: 50, y: 155, w: 100, h: 55 },
  },
  {
    id: "crisis",
    label: "Hypertensive crisis",
    detail:
      "Severe HTN, headache, bradycardia. Sit patient up, remove the trigger (usually a blocked catheter), then GTN/nifedipine/labetalol.",
    shape: { type: "rect", x: 280, y: 40, w: 160, h: 60 },
  },
];

/* ---------- Per-condition focused diagrams (for inline section use) ---------- */

const MECHANISM_DURATION_MS = 2200;

const Wrap = ({
  title,
  tagline,
  mechanismLabel,
  children,
}: {
  title: string;
  tagline: string;
  /** Short label for the play button, e.g. "Play receptor blockade". */
  mechanismLabel: string;
  children: React.ReactNode;
}) => {
  const [playing, setPlaying] = useState(false);
  const [scrubMs, setScrubMs] = useState<number | null>(null);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const trigger = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setScrubMs(null);
    seekContainerAnimations(sceneRef.current, null);
    // Re-trigger by toggling off then on so CSS animations restart.
    setPlaying(false);
    requestAnimationFrame(() => {
      setPlaying(true);
      timeoutRef.current = window.setTimeout(() => setPlaying(false), MECHANISM_DURATION_MS);
    });
  }, []);

  const handleScrub = useCallback((ms: number) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setPlaying(true);
    setScrubMs(ms);
    requestAnimationFrame(() => seekContainerAnimations(sceneRef.current, ms));
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (scrubMs !== null) {
      trigger();
    } else if (playing) {
      setPlaying(false);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    } else {
      trigger();
    }
  }, [scrubMs, playing, trigger]);

  // Auto-play once on first scroll into view
  useEffect(() => {
    if (!containerRef.current || hasAutoPlayed) return;
    const el = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setHasAutoPlayed(true);
            trigger();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: [0.4] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasAutoPlayed, trigger]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
        <div ref={containerRef} className="rounded-lg border border-border bg-card p-3 my-3 not-prose">
      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
          Pathophysiology — {title}
        </p>
        <Button
          size="sm"
          variant="outline"
          onClick={trigger}
          aria-label={mechanismLabel}
          className="h-6 px-2 text-[11px] gap-1"
        >
          {playing ? <RotateCcw className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {playing ? "Replay" : mechanismLabel}
        </Button>
      </div>
      <div
        ref={sceneRef}
        className={`neuro-anim rounded-md border border-border bg-background p-2 overflow-x-auto cursor-pointer ${
          playing ? "is-playing" : ""
        }`}
        onClick={trigger}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            trigger();
          }
        }}
      >
        <svg
          viewBox="0 0 460 250"
          className="w-full h-auto min-w-[380px]"
          role="img"
          aria-label={`${title} pathophysiology`}
        >
          {children}
        </svg>
      </div>
      <TimelineScrubber
        durationMs={MECHANISM_DURATION_MS}
        value={scrubMs ?? 0}
        onChange={handleScrub}
        onTogglePlay={handleTogglePlay}
        isPlaying={playing && scrubMs === null}
      />
      <HotspotHint>
        Hover or tap the dashed regions for explanations · click the diagram, press “{mechanismLabel}”, or drag the timeline to step through the mechanism.
      </HotspotHint>
      <p className="text-xs text-muted-foreground mt-2">{tagline}</p>
    </div>
  );
};

export const MGPathophysDiagram = () => (
  <Wrap
    title="Myasthenia gravis"
    mechanismLabel="Animate AChR blockade"
    tagline="Anti-AChR antibodies block / cross-link postsynaptic nicotinic receptors → fatigable weakness, ↑ sensitivity to non-depolarising NMBAs."
  >
    <MGDiagram />
  </Wrap>
);
export const EpilepsyPathophysDiagram = () => (
  <Wrap
    title="Epilepsy"
    mechanismLabel="Animate seizure firing"
    tagline="Excess glutamatergic excitation with deficient GABAergic inhibition produces hypersynchronous cortical firing."
  >
    <EpilepsyDiagram />
  </Wrap>
);
export const MSPathophysDiagram = () => (
  <Wrap
    title="Multiple sclerosis"
    mechanismLabel="Animate demyelination"
    tagline="T-cell-mediated CNS demyelination → slowed/blocked saltatory conduction; relapse triggered by pyrexia, stress, surgery."
  >
    <MSDiagram />
  </Wrap>
);
export const PDPathophysDiagram = () => (
  <Wrap
    title="Parkinson's disease"
    mechanismLabel="Animate dopamine loss"
    tagline="Loss of substantia-nigra dopaminergic neurons (α-synuclein Lewy bodies) shifts basal-ganglia output toward thalamic inhibition."
  >
    <PDDiagram />
  </Wrap>
);
export const MNDPathophysDiagram = () => (
  <Wrap
    title="Motor neuron disease"
    mechanismLabel="Animate denervation"
    tagline="Combined UMN + LMN degeneration → denervation supersensitivity (extra-junctional AChRs) → lethal hyperkalaemia with suxamethonium."
  >
    <MNDDiagram />
  </Wrap>
);
export const MDPathophysDiagram = () => (
  <Wrap
    title="Muscular dystrophies"
    mechanismLabel="Animate membrane leak"
    tagline="Dystrophin / sarcolemmal protein deficiency → fragile membrane leaks K⁺ and CK, predisposing to rhabdomyolysis with sux/volatiles."
  >
    <MDDiagram />
  </Wrap>
);
export const SCIPathophysDiagram = () => (
    <DiagramFigure
      id="neuro-disease-pathophys-diagram"
      title="Neuro disease pathophys"
      description="Auto-generated wrapper for the Neuro disease pathophys anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
        <Wrap
      title="Spinal cord injury — autonomic dysreflexia"
      mechanismLabel="Animate sympathetic surge"
      tagline="Loss of supraspinal inhibition above a T6+ lesion lets noxious stimuli below trigger massive unmodulated sympathetic discharge."
    >
      <SCIDiagram />
    </Wrap>
    </DiagramFigure>
  );

