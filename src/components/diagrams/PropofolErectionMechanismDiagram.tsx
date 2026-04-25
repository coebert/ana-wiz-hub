import { useState } from "react";

/**
 * Propofol & spinal erection reflex — animated mechanism diagram.
 *
 * Visualises how propofol may unmask reflex penile erection during urological
 * anaesthesia by:
 *   1. Suppressing supraspinal inhibitory drive descending from the brainstem
 *      (paragigantocellular nucleus, raphe) to the lumbosacral cord.
 *   2. Disinhibiting the sacral parasympathetic erection centre (S2–S4) and
 *      the pudendal somatic outflow.
 *   3. Promoting cavernosal smooth-muscle relaxation via NO / cGMP-mediated
 *      pathways and reduced sympathetic α-adrenergic tone.
 *
 * Click a stage to reveal the clinical detail. SVG arrows pulse to convey the
 * shift from inhibition (descending) to facilitation (sacral outflow).
 */

type StageKey = "supraspinal" | "spinal" | "autonomic" | "cavernosal" | "clinical";

interface Stage {
  key: StageKey;
  title: string;
  badge: string;
  detail: string;
}

const stages: Stage[] = [
  {
    key: "supraspinal",
    title: "Supraspinal inhibition suppressed",
    badge: "Step 1 — Brain",
    detail:
      "Propofol potentiates GABA_A currents throughout the CNS. Tonic inhibitory drive from the nucleus paragigantocellularis and raphe nuclei (5-HT, noradrenaline) that normally restrains the spinal erection generator is dampened. Thiopentone has been reported to do the same; benzodiazepines and opioids tend to suppress the reflex instead.",
  },
  {
    key: "spinal",
    title: "Sacral erection centre disinhibited",
    badge: "Step 2 — Spinal cord",
    detail:
      "The parasympathetic erection centre at S2–S4 (and the thoracolumbar T11–L2 sympathetic centre) is released from descending inhibition. Local reflex arcs triggered by genital handling, catheterisation, or cystoscope passage are amplified — explaining onset on instrumentation rather than at induction.",
  },
  {
    key: "autonomic",
    title: "Parasympathetic ↑ / sympathetic ↓",
    badge: "Step 3 — Autonomic balance",
    detail:
      "Pelvic (parasympathetic) outflow via the cavernous nerves rises while α-adrenergic sympathetic tone to the cavernosal trabeculae falls. Propofol also lowers systemic SVR and blunts the sympathetic stress response, tipping the balance further toward erection.",
  },
  {
    key: "cavernosal",
    title: "NO release · cGMP ↑ · smooth muscle relaxes",
    badge: "Step 4 — Corpus cavernosum",
    detail:
      "Cavernous nerve terminals and endothelium release nitric oxide → guanylate cyclase → ↑cGMP → cavernosal trabecular smooth-muscle relaxation. Helicine arteries dilate, sinusoids fill, and venous outflow is mechanically compressed against the tunica albuginea — producing tumescence within minutes.",
  },
  {
    key: "clinical",
    title: "Surgical impact & rescue",
    badge: "Step 5 — Theatre",
    detail:
      "Prevents passage of cystoscope/resectoscope, obscures the TURP/TURBT field, and risks urethral trauma. Escalate: deepen anaesthesia + opioid → add ketamine or switch to volatile → intracavernosal phenylephrine 100–200 µg (with arterial monitoring) → terbutaline 0.25–0.5 mg SC → abandon if detumescence fails. Persistent >4 h post-op = treat as low-flow priapism.",
  },
];

const PropofolErectionMechanismDiagram = () => {
  const [active, setActive] = useState<StageKey>("supraspinal");
  const activeStage = stages.find((s) => s.key === active)!;

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 my-6">
      <div className="mb-4">
        <h3 className="text-lg font-serif font-bold text-foreground">
          Propofol & the spinal erection reflex
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Click a stage to reveal the mechanism. Arrows pulse to show the shift from
          descending inhibition to sacral facilitation and cavernosal relaxation.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        {/* SVG schematic */}
        <div className="rounded-lg bg-secondary/30 border border-border p-2">
          <svg
            viewBox="0 0 420 360"
            className="w-full h-auto"
            role="img"
            aria-label="Propofol disinhibition of spinal erection reflex"
          >
            <defs>
              <marker
                id="arrow-inhib"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--destructive))" />
              </marker>
              <marker
                id="arrow-facil"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--clinical))" />
              </marker>
              <linearGradient id="cordGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {/* Brain */}
            <g
              onClick={() => setActive("supraspinal")}
              className="cursor-pointer"
              opacity={active === "supraspinal" ? 1 : 0.7}
            >
              <ellipse
                cx="80"
                cy="55"
                rx="55"
                ry="32"
                fill="hsl(var(--card))"
                stroke={active === "supraspinal" ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth={active === "supraspinal" ? 2.5 : 1.5}
              />
              <text
                x="80"
                y="52"
                textAnchor="middle"
                className="fill-foreground"
                fontSize="11"
                fontWeight="600"
              >
                Brainstem
              </text>
              <text
                x="80"
                y="66"
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="9"
              >
                nPGi · raphe
              </text>
            </g>

            {/* Propofol bolus */}
            <g
              onClick={() => setActive("supraspinal")}
              className="cursor-pointer"
            >
              <circle
                cx="180"
                cy="55"
                r="22"
                fill="hsl(var(--primary) / 0.15)"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
              >
                <animate
                  attributeName="r"
                  values="20;24;20"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <text
                x="180"
                y="58"
                textAnchor="middle"
                className="fill-foreground"
                fontSize="10"
                fontWeight="700"
              >
                Propofol
              </text>
            </g>

            {/* Descending inhibition (now suppressed) */}
            <line
              x1="80"
              y1="90"
              x2="80"
              y2="180"
              stroke="hsl(var(--destructive))"
              strokeWidth="2"
              strokeDasharray="4 4"
              markerEnd="url(#arrow-inhib)"
              opacity="0.5"
            >
              <animate
                attributeName="opacity"
                values="0.6;0.15;0.6"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>
            <text
              x="100"
              y="135"
              fontSize="9"
              className="fill-muted-foreground"
            >
              ↓ inhibition
            </text>

            {/* Spinal cord */}
            <g
              onClick={() => setActive("spinal")}
              className="cursor-pointer"
              opacity={active === "spinal" ? 1 : 0.85}
            >
              <rect
                x="55"
                y="180"
                width="50"
                height="120"
                rx="10"
                fill="url(#cordGrad)"
                stroke={active === "spinal" ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth={active === "spinal" ? 2.5 : 1.5}
              />
              <text
                x="80"
                y="200"
                textAnchor="middle"
                className="fill-foreground"
                fontSize="10"
                fontWeight="600"
              >
                T11–L2
              </text>
              <text
                x="80"
                y="213"
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="8"
              >
                sympathetic
              </text>
              <line x1="60" y1="230" x2="100" y2="230" stroke="hsl(var(--border))" />
              <text
                x="80"
                y="250"
                textAnchor="middle"
                className="fill-foreground"
                fontSize="10"
                fontWeight="600"
              >
                S2–S4
              </text>
              <text
                x="80"
                y="263"
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="8"
              >
                parasympathetic
              </text>
              <text
                x="80"
                y="285"
                textAnchor="middle"
                className="fill-clinical"
                fontSize="9"
                fontWeight="700"
              >
                ↑ disinhibited
              </text>
            </g>

            {/* Sacral facilitation arrow → autonomic */}
            <g
              onClick={() => setActive("autonomic")}
              className="cursor-pointer"
            >
              <line
                x1="105"
                y1="255"
                x2="220"
                y2="255"
                stroke="hsl(var(--clinical))"
                strokeWidth="2.5"
                markerEnd="url(#arrow-facil)"
              >
                <animate
                  attributeName="stroke-opacity"
                  values="0.5;1;0.5"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              </line>
              <text
                x="160"
                y="247"
                textAnchor="middle"
                fontSize="9"
                className="fill-clinical"
                fontWeight="600"
              >
                cavernous nerve
              </text>
              <text
                x="160"
                y="270"
                textAnchor="middle"
                fontSize="8"
                className="fill-muted-foreground"
              >
                ACh → NO release
              </text>
            </g>

            {/* Cavernosal smooth muscle */}
            <g
              onClick={() => setActive("cavernosal")}
              className="cursor-pointer"
              opacity={active === "cavernosal" ? 1 : 0.85}
            >
              <ellipse
                cx="320"
                cy="200"
                rx="70"
                ry="42"
                fill="hsl(var(--card))"
                stroke={active === "cavernosal" ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth={active === "cavernosal" ? 2.5 : 1.5}
              />
              {/* sinusoids filling */}
              {[
                { cx: 295, cy: 190 },
                { cx: 320, cy: 200 },
                { cx: 345, cy: 190 },
                { cx: 305, cy: 215 },
                { cx: 335, cy: 215 },
              ].map((s, i) => (
                <circle
                  key={i}
                  cx={s.cx}
                  cy={s.cy}
                  r="6"
                  fill="hsl(var(--clinical) / 0.35)"
                  stroke="hsl(var(--clinical))"
                  strokeWidth="0.8"
                >
                  <animate
                    attributeName="r"
                    values="4;8;4"
                    dur="2.2s"
                    begin={`${i * 0.25}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    values="0.2;0.7;0.2"
                    dur="2.2s"
                    begin={`${i * 0.25}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
              <text
                x="320"
                y="170"
                textAnchor="middle"
                className="fill-foreground"
                fontSize="10"
                fontWeight="600"
              >
                Corpus cavernosum
              </text>
              <text
                x="320"
                y="240"
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="9"
              >
                ↑cGMP · smooth muscle relaxes
              </text>
            </g>

            {/* Clinical outcome */}
            <g
              onClick={() => setActive("clinical")}
              className="cursor-pointer"
              opacity={active === "clinical" ? 1 : 0.85}
            >
              <rect
                x="220"
                y="285"
                width="180"
                height="55"
                rx="8"
                fill="hsl(var(--destructive) / 0.08)"
                stroke={active === "clinical" ? "hsl(var(--primary))" : "hsl(var(--destructive) / 0.5)"}
                strokeWidth={active === "clinical" ? 2.5 : 1.5}
              />
              <text
                x="310"
                y="305"
                textAnchor="middle"
                className="fill-foreground"
                fontSize="10"
                fontWeight="700"
              >
                Tumescence in theatre
              </text>
              <text
                x="310"
                y="322"
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize="9"
              >
                obstructs cystoscope · risks trauma
              </text>
            </g>
          </svg>
        </div>

        {/* Detail panel */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {stages.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                  active === s.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary"
                }`}
              >
                {s.badge.split(" — ")[0]}
              </button>
            ))}
          </div>
          <div className="p-3 rounded-lg bg-secondary/40 border border-border">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
              {activeStage.badge}
            </p>
            <p className="font-semibold text-foreground text-sm mb-2">
              {activeStage.title}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {activeStage.detail}
            </p>
          </div>
          <div className="p-2.5 rounded-md border border-amber-500/20 bg-amber-500/5">
            <p className="text-[11px] text-amber-400 font-semibold mb-0.5">
              Mnemonic
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>“Brain off, sacrum on, sinusoids fill.”</strong> Propofol
              lifts the brainstem brake, the sacral reflex fires, NO floods the
              cavernosum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropofolErectionMechanismDiagram;
