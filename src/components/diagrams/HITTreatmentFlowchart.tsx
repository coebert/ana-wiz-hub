import { DiagramFigure, svgImgProps } from "./_shared/DiagramFigure";
import { Cite } from "@/components/references/Cite";
import type { FourTsBand } from "@/components/clinical/FourTsScorePanel";

interface HITTreatmentFlowchartProps {
  highlightBand?: FourTsBand | null;
}

/**
 * HIT treatment flowchart — from "stop heparin" through alternative anticoagulant
 * selection, organ-failure branching, transition to oral therapy, and discharge advice.
 *
 * When `highlightBand` is supplied (LOW / INTERMEDIATE / HIGH from the linked 4Ts
 * panel), a banner above the SVG indicates which numbered steps apply and the
 * matching step rectangles are emphasised.
 */
const HITTreatmentFlowchart = ({ highlightBand = null }: HITTreatmentFlowchartProps = {}) => {
  const id = "hit-treatment";

  // Geometry helpers
  const W = 880;
  const H = 760;

  const stepNumber = (cx: number, cy: number, n: number, tone: "do" | "stop" | "warn") => {
    const fill =
      tone === "stop"
        ? "hsl(var(--destructive))"
        : tone === "warn"
          ? "hsl(38 92% 45%)"
          : "hsl(var(--icu))";
    return (
      <g>
        <circle cx={cx} cy={cy} r="13" fill={fill} />
        <text
          x={cx}
          y={cy + 4}
          fontSize="13"
          fontWeight="700"
          textAnchor="middle"
          fill="hsl(var(--primary-foreground))"
        >
          {n}
        </text>
      </g>
    );
  };

  // Map 4Ts band → set of treatment-step numbers that apply
  //   LOW           → HIT excluded; no steps mandated (no ring drawn)
  //   INTERMEDIATE  → stop heparin (1) + PF4 ELISA & duplex (2) + start non-heparin
  //                   anticoag empirically (3). Functional assay only if ELISA+;
  //                   oral transition (4) and lifelong allergy (5) await confirmation.
  //   HIGH          → all five steps now, plus functional assay in parallel.
  const activeSteps =
    highlightBand === "HIGH"
      ? new Set([1, 2, 3, 4, 5])
      : highlightBand === "INTERMEDIATE"
        ? new Set([1, 2, 3])
        : new Set<number>();

  const stepRects: Record<number, { x: number; y: number; w: number; h: number }> = {
    1: { x: 210, y: 95, w: 460, h: 70 },
    2: { x: 160, y: 195, w: 560, h: 80 },
    3: { x: 190, y: 305, w: 500, h: 60 },
    4: { x: 160, y: 640, w: 560, h: 60 },
    5: { x: 160, y: 725, w: 560, h: 32 },
  };

  const bandTone =
    highlightBand === "HIGH"
      ? { ring: "hsl(var(--destructive))", bg: "bg-destructive/10", border: "border-destructive/50", text: "text-destructive" }
      : highlightBand === "INTERMEDIATE"
        ? { ring: "hsl(38 92% 45%)", bg: "bg-amber-500/10", border: "border-amber-500/50", text: "text-amber-700 dark:text-amber-400" }
        : { ring: "hsl(var(--icu))", bg: "bg-icu/10", border: "border-icu/40", text: "text-icu" };

  const bandMessage =
    highlightBand === "HIGH"
      ? "4Ts HIGH (~64%) — execute every step now. Send PF4 ELISA AND functional assay (SRA/HIPA) in parallel."
      : highlightBand === "INTERMEDIATE"
        ? "4Ts INTERMEDIATE (~14%) — stop heparin, start empirical non-heparin anticoagulation, send PF4 ELISA + bilateral leg duplex. Add functional assay only if ELISA positive; defer oral transition and lifelong-allergy documentation until HIT is confirmed."
        : highlightBand === "LOW"
          ? "4Ts LOW (<5%) — HIT effectively excluded. No step below is mandated; continue heparin if clinically indicated and consider an alternative cause for the thrombocytopenia."
          : null;

  return (
    <DiagramFigure
      id={id}
      title="HIT treatment flowchart — stop heparin, choose alternative anticoagulant"
      description="Decision flow for suspected or confirmed HIT type II: immediate cessation of all heparin, parallel PF4 ELISA + functional assay, context-driven choice of non-heparin anticoagulant (argatroban, bivalirudin, fondaparinux, danaparoid), transition to warfarin or DOAC once platelets >150, and lifelong heparin avoidance advice."
      showCaption
    >
      {bandMessage && (
        <div
          className={`mb-2 rounded-lg border-2 ${bandTone.border} ${bandTone.bg} px-3 py-2 text-xs ${bandTone.text}`}
          role="status"
          aria-live="polite"
        >
          <span className="font-semibold">From 4Ts score → </span>
          <span className="text-foreground">{bandMessage}</span>
          {highlightBand !== "LOW" && (
            <span className="ml-1 text-muted-foreground">
              Highlighted steps below: {[...activeSteps].join(", ")}.
            </span>
          )}
        </div>
      )}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto rounded-lg border border-border bg-card p-3 my-3"
        {...svgImgProps({ id })}
      >
        <title id={`${id}-title`}>HIT treatment flowchart</title>
        <desc id={`${id}-desc`}>
          Vertical decision flowchart for managing heparin-induced thrombocytopenia.
          Begins with stopping all heparin sources, sending PF4 ELISA and a functional
          assay, and choosing an alternative anticoagulant based on the clinical
          context (standard ICU, ECMO or CPB, renal failure, hepatic failure, or
          outpatient). Transition to warfarin once platelets recover above 150, with
          a minimum overlap of 5 days, and document a lifelong heparin allergy.
        </desc>

        <defs>
          <marker id={`${id}-arr`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--foreground))" />
          </marker>
          <marker id={`${id}-arr-bad`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" fill="hsl(var(--destructive))" />
          </marker>
        </defs>

        {/* ───────── TRIGGER ───────── */}
        <g>
          <rect x={W / 2 - 200} y={15} width="400" height="50" rx="10" fill="hsl(var(--icu) / 0.15)" stroke="hsl(var(--icu))" strokeWidth="1.5" />
          <text x={W / 2} y={40} fontSize="13" fontWeight="700" textAnchor="middle" fill="hsl(var(--icu))">
            Suspected HIT — 4Ts score ≥ 4
          </text>
          <text x={W / 2} y={56} fontSize="10" textAnchor="middle" fill="hsl(var(--muted-foreground))">
            Thrombocytopenia · Timing 5–10 d (or ≤1 d if recent heparin) · Thrombosis · oTher cause unlikely
          </text>
        </g>
        <line x1={W / 2} y1={65} x2={W / 2} y2={90} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* ───────── STEP 1 — STOP heparin ───────── */}
        <g>
          <rect x={W / 2 - 230} y={95} width="460" height="70" rx="10" fill="hsl(var(--destructive) / 0.12)" stroke="hsl(var(--destructive))" strokeWidth="2" />
          {stepNumber(W / 2 - 210, 130, 1, "stop")}
          <text x={W / 2 - 188} y={120} fontSize="13" fontWeight="700" fill="hsl(var(--destructive))">
            STOP all heparin — immediately
          </text>
          <text x={W / 2 - 188} y={138} fontSize="10" fill="hsl(var(--muted-foreground))">
            UFH/LMWH infusions · prophylactic doses · line/arterial flushes
          </text>
          <text x={W / 2 - 188} y={154} fontSize="10" fill="hsl(var(--muted-foreground))">
            Heparin-bonded catheters · CRRT/ECMO circuits · heparinised CVCs
          </text>
        </g>
        <line x1={W / 2} y1={165} x2={W / 2} y2={190} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* ───────── STEP 2 — Investigations (parallel) ───────── */}
        <g>
          <rect x={W / 2 - 280} y={195} width="560" height="80" rx="10" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" strokeWidth="1.5" />
          {stepNumber(W / 2 - 260, 235, 2, "do")}
          <text x={W / 2 - 238} y={220} fontSize="13" fontWeight="700" fill="hsl(var(--foreground))">
            Investigate (in parallel — do not wait)
          </text>
          <text x={W / 2 - 238} y={238} fontSize="10" fill="hsl(var(--muted-foreground))">
            • PF4/heparin IgG ELISA (high sensitivity, OD &gt; 1.0 = strong)
          </text>
          <text x={W / 2 - 238} y={254} fontSize="10" fill="hsl(var(--muted-foreground))">
            • Functional assay — SRA / HIPA (confirmatory, gold standard)
          </text>
          <text x={W / 2 - 238} y={270} fontSize="10" fill="hsl(var(--muted-foreground))">
            • Bilateral lower-limb duplex (≥ 50% have subclinical DVT)
          </text>
        </g>
        <line x1={W / 2} y1={275} x2={W / 2} y2={300} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* ───────── STEP 3 — Decision diamond ───────── */}
        <g>
          <rect x={W / 2 - 250} y={305} width="500" height="60" rx="10" fill="hsl(var(--icu) / 0.15)" stroke="hsl(var(--icu))" strokeWidth="2" />
          {stepNumber(W / 2 - 230, 335, 3, "do")}
          <text x={W / 2 - 208} y={328} fontSize="13" fontWeight="700" fill="hsl(var(--icu))">
            Start therapeutic non-heparin anticoagulant
          </text>
          <text x={W / 2 - 208} y={346} fontSize="10" fill="hsl(var(--muted-foreground))">
            Choose by organ function and clinical setting (do not wait for assay)
          </text>
          <text x={W / 2 - 208} y={360} fontSize="10" fontStyle="italic" fill="hsl(var(--destructive))">
            Avoid LMWH (≈ 90% cross-reactivity)
          </text>
        </g>

        {/* Branching arrows to 4 columns */}
        {[150, 360, 570, 760].map((x) => (
          <path
            key={x}
            d={`M${W / 2} 365 Q${(W / 2 + x) / 2} 395 ${x} 415`}
            stroke="hsl(var(--foreground))"
            strokeWidth="1.3"
            fill="none"
            markerEnd={`url(#${id}-arr)`}
          />
        ))}

        {/* ───────── 4 anticoagulant option cards ───────── */}
        {[
          {
            x: 30,
            tint: "hsl(var(--icu))",
            tag: "FIRST-LINE UK ICU",
            drug: "Argatroban",
            cls: "Direct thrombin inhibitor",
            mon: "APTT 1.5–3×",
            t12: "t½ ~45 min",
            notes: ["Hepatic metabolism", "Use in renal failure & CRRT", "↑ INR — overlap warfarin carefully"],
          },
          {
            x: 240,
            tint: "hsl(var(--icu))",
            tag: "ECMO / CPB",
            drug: "Bivalirudin",
            cls: "Direct thrombin inhibitor",
            mon: "APTT or ACT",
            t12: "t½ ~25 min",
            notes: ["Enzymatic metabolism", "Use in hepatic failure", "Rapid titration; preferred on ECMO"],
          },
          {
            x: 450,
            tint: "hsl(38 92% 45%)",
            tag: "STABLE / OUTPATIENT",
            drug: "Fondaparinux",
            cls: "Indirect factor Xa inhibitor",
            mon: "Anti-Xa (if needed)",
            t12: "t½ ~17 h",
            notes: ["No PF4 cross-reactivity", "Renal clearance — avoid CrCl < 30", "Off-label but widely used"],
          },
          {
            x: 660,
            tint: "hsl(var(--muted-foreground))",
            tag: "ALTERNATIVE",
            drug: "Danaparoid",
            cls: "Heparinoid (mostly anti-Xa)",
            mon: "Anti-Xa (danaparoid)",
            t12: "t½ ~25 h",
            notes: ["~10% in vitro cross-reactivity", "Limited availability in UK", "Long half-life — caution"],
          },
        ].map((c) => (
          <g key={c.drug}>
            <rect x={c.x} y={420} width="190" height="170" rx="10" fill="hsl(var(--card))" stroke={c.tint} strokeWidth="1.5" />
            <rect x={c.x} y={420} width="190" height="22" rx="10" fill={c.tint} />
            <text x={c.x + 95} y={436} fontSize="10" fontWeight="700" textAnchor="middle" fill="hsl(var(--primary-foreground))">
              {c.tag}
            </text>
            <text x={c.x + 10} y={460} fontSize="13" fontWeight="700" fill="hsl(var(--foreground))">
              {c.drug}
            </text>
            <text x={c.x + 10} y={476} fontSize="9" fontStyle="italic" fill="hsl(var(--muted-foreground))">
              {c.cls}
            </text>
            <text x={c.x + 10} y={494} fontSize="10" fill="hsl(var(--foreground))">
              <tspan fontWeight="600">Monitor:</tspan> {c.mon}
            </text>
            <text x={c.x + 10} y={508} fontSize="10" fill="hsl(var(--foreground))">
              <tspan fontWeight="600">Half-life:</tspan> {c.t12}
            </text>
            {c.notes.map((n, i) => (
              <text key={i} x={c.x + 10} y={525 + i * 14} fontSize="9.5" fill="hsl(var(--muted-foreground))">
                • {n}
              </text>
            ))}
          </g>
        ))}

        {/* Convergence to step 4 */}
        {[125, 335, 545, 755].map((x) => (
          <line
            key={x}
            x1={x}
            y1={595}
            x2={W / 2}
            y2={620}
            stroke="hsl(var(--foreground))"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
        ))}
        <line x1={W / 2} y1={620} x2={W / 2} y2={635} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* ───────── STEP 4 — Transition to oral ───────── */}
        <g>
          <rect x={W / 2 - 280} y={640} width="560" height="60" rx="10" fill="hsl(38 92% 50% / 0.12)" stroke="hsl(38 92% 45%)" strokeWidth="1.5" />
          {stepNumber(W / 2 - 260, 670, 4, "warn")}
          <text x={W / 2 - 238} y={663} fontSize="13" fontWeight="700" fill="hsl(38 92% 35%)">
            Transition to oral once platelets &gt; 150 ×10⁹/L
          </text>
          <text x={W / 2 - 238} y={680} fontSize="10" fill="hsl(var(--muted-foreground))">
            Warfarin: overlap parenteral ≥ 5 d AND INR in range × 2 d (protein C depletion → venous limb gangrene)
          </text>
          <text x={W / 2 - 238} y={695} fontSize="10" fill="hsl(var(--muted-foreground))">
            DOAC (rivaroxaban) is reasonable in haemodynamically stable HIT without active thrombosis
          </text>
        </g>
        <line x1={W / 2} y1={700} x2={W / 2} y2={720} stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd={`url(#${id}-arr)`} />

        {/* ───────── STEP 5 — Discharge ───────── */}
        <g>
          <rect x={W / 2 - 280} y={725} width="560" height="32" rx="10" fill="hsl(var(--icu) / 0.1)" stroke="hsl(var(--icu))" strokeWidth="1.5" />
          {stepNumber(W / 2 - 260, 741, 5, "do")}
          <text x={W / 2 - 238} y={745} fontSize="11" fontWeight="600" fill="hsl(var(--icu))">
            Document lifelong heparin allergy · avoid heparin ≥ 100 days · alert bracelet · GP letter
          </text>
        </g>

        {/* ───────── 4Ts-driven highlight rings ───────── */}
        {[...activeSteps].map((n) => {
          const r = stepRects[n];
          if (!r) return null;
          return (
            <rect
              key={`hl-${n}`}
              x={r.x - 4}
              y={r.y - 4}
              width={r.w + 8}
              height={r.h + 8}
              rx="12"
              fill="none"
              stroke={bandTone.ring}
              strokeWidth="3"
              strokeDasharray="6 4"
              opacity="0.9"
            >
              <animate attributeName="opacity" values="0.55;1;0.55" dur="2.2s" repeatCount="indefinite" />
            </rect>
          );
        })}
      </svg>

      {/* Compact key */}
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(var(--destructive))" }} /> stop / contraindicated
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(var(--icu))" }} /> action / first-line
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "hsl(38 92% 45%)" }} /> caution / transition
        </span>
        <span className="italic">Argatroban is first-line in UK ICU; bivalirudin is preferred on ECMO/CPB.</span>
      </div>

      {/* Per-step source citations */}
      <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-[11px] leading-relaxed">
        <p className="font-semibold text-foreground mb-1.5">Step sources — verify each treatment step</p>
        <ul className="space-y-1 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Trigger — 4Ts ≥ 4:</span>{" "}
            pre-test probability score (sensitivity ≈ 99% for low-score rule-out)
            <Cite topicId="haematology-icu" labels={["Lo 4Ts 2006", "ASH 2018 HIT"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Step 1 — STOP all heparin:</span>{" "}
            including flushes and heparin-bonded catheters
            <Cite topicId="haematology-icu" labels={["ASH 2018 HIT", "BJA Educ HIT 2008"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Step 2 — PF4 ELISA + functional assay:</span>{" "}
            ELISA high sensitivity; SRA/HIPA confirms platelet activation
            <Cite topicId="haematology-icu" labels={["ASH 2018 HIT", "Greinacher NEJM 2015"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Step 3 — Argatroban (first-line UK ICU):</span>{" "}
            hepatic clearance — preferred in renal failure / CRRT
            <Cite topicId="haematology-icu" labels={["ASH 2018 HIT", "BJA Educ HIT 2018"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Step 3 — Bivalirudin (ECMO / CPB):</span>{" "}
            enzymatic metabolism, t½ ~25 min — preferred in hepatic failure and ECMO
            <Cite topicId="haematology-icu" labels={["BJA Educ HIT 2018", "ASH 2018 HIT"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Step 3 — Fondaparinux / Danaparoid:</span>{" "}
            stable patients without renal failure; danaparoid has ~10% in vitro cross-reactivity
            <Cite topicId="haematology-icu" labels={["ASH 2018 HIT", "Greinacher NEJM 2015"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Step 4 — Transition to warfarin / DOAC:</span>{" "}
            only once platelets &gt; 150 × 10⁹/L; ≥ 5 d overlap (avoid venous limb gangrene)
            <Cite topicId="haematology-icu" labels={["ASH 2018 HIT", "BJA Educ HIT 2008"]} />
          </li>
          <li>
            <span className="font-medium text-foreground">Step 5 — Lifelong heparin avoidance:</span>{" "}
            heparin re-exposure within 100 d risks rapid-onset HIT
            <Cite topicId="haematology-icu" labels={["Greinacher NEJM 2015", "ASH 2018 HIT"]} />
          </li>
        </ul>
      </div>
    </DiagramFigure>
  );
};

export default HITTreatmentFlowchart;
