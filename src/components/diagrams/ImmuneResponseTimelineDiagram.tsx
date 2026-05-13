import { useMemo, useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Interactive immune-response timeline.
 *
 * Two switches:
 *   - Pathogen class: BACTERIAL (extracellular) vs VIRAL (intracellular)
 *   - Exposure type:  NAIVE (first encounter) vs RE-EXPOSED (memory)
 *
 * The timeline phases, key cellular players and the pathogen burden curve
 * all redraw in response. Selecting a phase reveals the molecular detail in
 * a side panel — same UX pattern used across the head & neck anatomy
 * diagrams.
 *
 * Evidence base: Janeway's Immunobiology (10e); Murphy & Weaver 2017;
 * Iwasaki & Medzhitov, Nat Immunol 2015.
 */

type Pathogen = "bacterial" | "viral";
type Exposure = "naive" | "memory";

interface Phase {
  /** label shown on x-axis */
  label: string;
  /** descriptive title for side panel */
  title: string;
  /** time domain (hours) — used to position on timeline */
  startH: number;
  endH: number;
  /** key cellular/molecular players */
  players: string[];
  /** detailed mechanism shown in side panel */
  detail: string;
  /** colour key: innate (blue), adaptive (purple), resolution (green) */
  arm: "innate" | "adaptive" | "resolution";
}

const phases: Record<Pathogen, Record<Exposure, Phase[]>> = {
  bacterial: {
    naive: [
      {
        label: "0–4 h",
        title: "Barriers & PAMP recognition",
        startH: 0,
        endH: 4,
        players: ["Skin / mucosa", "Defensins", "Tissue macrophages", "TLR2 / 4 / 5"],
        detail:
          "Resident macrophages recognise PAMPs — LPS via TLR4, peptidoglycan / lipoteichoic acid via TLR2, flagellin via TLR5. Lysozyme and antimicrobial peptides (defensins, cathelicidins) provide immediate chemical defence.",
        arm: "innate",
      },
      {
        label: "4–12 h",
        title: "Acute inflammation & complement",
        startH: 4,
        endH: 12,
        players: ["TNF-α / IL-1 / IL-6", "Selectins, ICAM-1", "Alternative + lectin complement", "C3b / C5a / MAC"],
        detail:
          "Cytokine storm activates endothelium → neutrophil rolling, adhesion and diapedesis. Complement is fixed by alternative (spontaneous) and lectin (MBL → mannose) pathways → C3b opsonises bacteria, C5a recruits neutrophils, C5b-9 MAC lyses Gram-negatives.",
        arm: "innate",
      },
      {
        label: "12–96 h",
        title: "Phagocyte killing & acute-phase response",
        startH: 12,
        endH: 96,
        players: ["Neutrophils + NETs", "NADPH oxidase", "MPO → HOCl", "Hepatic CRP, fibrinogen"],
        detail:
          "Neutrophils ingest opsonised bacteria → respiratory burst (O₂⁻, H₂O₂, HOCl), myeloperoxidase, NETs. Pus = dead neutrophils. IL-6 drives the hepatic acute-phase response (CRP, fibrinogen, ferritin); PGE₂ at the hypothalamus drives fever.",
        arm: "innate",
      },
      {
        label: "3–7 d",
        title: "Adaptive priming",
        startH: 72,
        endH: 168,
        players: ["Dendritic cells → MHC-II", "Naïve CD4⁺ → Th1 / Th17", "B-cell germinal centres"],
        detail:
          "Dendritic cells migrate to draining nodes presenting peptide on MHC-II. CD4⁺ cells differentiate into Th1 (IFN-γ — intracellular) or Th17 (IL-17 — extracellular, neutrophil recruitment). B cells receive CD40L–CD40 help and enter germinal centre reaction.",
        arm: "adaptive",
      },
      {
        label: "7–14 d",
        title: "Antibody response (IgM → IgG class switch)",
        startH: 168,
        endH: 336,
        players: ["Plasma cells", "IgM (pentamer)", "IgG (opsonising)", "Memory B / T cells"],
        detail:
          "IgM appears first — low affinity, pentameric, complement-fixing. Class-switching produces IgG (high affinity, opsonising, crosses placenta) and IgA (mucosal). Somatic hypermutation refines affinity. Long-lived plasma cells and memory lymphocytes persist for years.",
        arm: "adaptive",
      },
      {
        label: "2–4 wk",
        title: "Resolution",
        startH: 336,
        endH: 672,
        players: ["Apoptosis of effectors", "Treg (IL-10, TGF-β)", "Tissue remodelling"],
        detail:
          "Effector lymphocytes contract by apoptosis; regulatory T cells dampen inflammation; macrophages clear debris and orchestrate repair. Memory clone retained.",
        arm: "resolution",
      },
    ],
    memory: [
      {
        label: "0–6 h",
        title: "Pre-formed antibody opsonisation",
        startH: 0,
        endH: 6,
        players: ["Circulating IgG", "Classical complement (C1q)", "Tissue-resident memory T cells"],
        detail:
          "High-affinity IgG already in circulation binds bacteria at the moment of entry, triggering classical complement (C1q binds Ag–Ab complex) → rapid C3b opsonisation and MAC formation. Tissue-resident memory T cells recognise local antigen and release IFN-γ within hours.",
        arm: "adaptive",
      },
      {
        label: "6–24 h",
        title: "Memory B-cell expansion",
        startH: 6,
        endH: 24,
        players: ["Memory B cells", "Plasmablasts", "IgG (already class-switched)"],
        detail:
          "Memory B cells proliferate and differentiate into plasmablasts within hours, churning out high-affinity, class-switched IgG. No germinal centre delay — the affinity maturation has already occurred during the primary response.",
        arm: "adaptive",
      },
      {
        label: "1–3 d",
        title: "Subclinical clearance",
        startH: 24,
        endH: 72,
        players: ["Armed macrophages (Th1/IFN-γ)", "Th17-recruited neutrophils", "Memory CTLs (intracellular bacteria)"],
        detail:
          "Memory Th1 / Th17 cells arm macrophages and recruit neutrophils within hours rather than days. The pathogen is usually cleared before symptoms emerge — the basis of vaccination. Antibody titres surge 100–1000× higher than primary peak.",
        arm: "adaptive",
      },
      {
        label: "3–14 d",
        title: "Memory consolidation",
        startH: 72,
        endH: 336,
        players: ["Long-lived plasma cells", "Affinity maturation refines IgG", "Treg restoration"],
        detail:
          "Bone-marrow plasma cells maintain serum IgG for years. Affinity maturation continues to refine the response. Asplenic patients lack the splenic marginal-zone B cells that mount this rapid response to encapsulated organisms — hence vaccination + penicillin prophylaxis.",
        arm: "resolution",
      },
    ],
  },
  viral: {
    naive: [
      {
        label: "0–24 h",
        title: "Intracellular sensing & type I IFN",
        startH: 0,
        endH: 24,
        players: ["TLR3 (dsRNA)", "TLR7/8 (ssRNA)", "TLR9 (CpG DNA)", "RIG-I, MDA5, cGAS-STING", "IFN-α / β"],
        detail:
          "Endosomal TLRs and cytosolic sensors detect viral nucleic acid. Infected cells secrete type I interferons (IFN-α/β), establishing an antiviral state in neighbouring cells.",
        arm: "innate",
      },
      {
        label: "1–3 d",
        title: "Antiviral state & NK cells",
        startH: 24,
        endH: 72,
        players: ["JAK-STAT signalling", "PKR, OAS-RNase L, MxA", "NK cells (missing-self)", "↑ MHC-I"],
        detail:
          "IFN-α/β bind JAK-STAT receptors → PKR (halts protein synthesis), OAS-RNase L (degrades viral RNA), MxA (blocks replication). MHC-I is upregulated to display viral peptides. NK cells kill cells with ↓MHC-I and release IFN-γ to amplify the response.",
        arm: "innate",
      },
      {
        label: "3–7 d",
        title: "CTL priming",
        startH: 72,
        endH: 168,
        players: ["Dendritic cell cross-presentation", "Naïve CD8⁺ T cells", "CD4⁺ Th1 help (IL-2, IFN-γ)"],
        detail:
          "Dendritic cells cross-present viral antigen on MHC-I to naïve CD8⁺ T cells in lymph node. Th1 help via IL-2 and IFN-γ enhances clonal expansion of cytotoxic T cells.",
        arm: "adaptive",
      },
      {
        label: "7–14 d",
        title: "Cytotoxic killing & neutralising antibody",
        startH: 168,
        endH: 336,
        players: ["Effector CD8⁺ CTLs", "Perforin + granzymes", "Fas–FasL apoptosis", "Neutralising IgM → IgG"],
        detail:
          "Effector CTLs migrate to infected tissue, recognise viral peptide–MHC-I complexes and induce apoptosis via perforin/granzymes and Fas–FasL. Concurrent B-cell response generates neutralising IgM → IgG against surface glycoproteins (haemagglutinin, spike, gp120).",
        arm: "adaptive",
      },
      {
        label: "2–4 wk",
        title: "Resolution & latency",
        startH: 336,
        endH: 672,
        players: ["Effector contraction", "Memory CTLs / B cells", "Latency: HSV, VZV, CMV, EBV, HIV"],
        detail:
          "Most effectors undergo apoptosis. Memory CTLs and B cells persist long-term. Some viruses establish latency (HSV in dorsal root ganglia, VZV → shingles years later, CMV/EBV in B and myeloid cells).",
        arm: "resolution",
      },
    ],
    memory: [
      {
        label: "0–24 h",
        title: "Mucosal neutralisation",
        startH: 0,
        endH: 24,
        players: ["Secretory IgA at mucosa", "Circulating neutralising IgG", "Tissue-resident memory CD8⁺"],
        detail:
          "Pre-existing neutralising IgA at mucosal surfaces and IgG in circulation bind viral receptor-binding domains (e.g. spike RBD, HA head) → block entry. Tissue-resident memory CD8⁺ T cells recognise infected cells locally.",
        arm: "adaptive",
      },
      {
        label: "1–3 d",
        title: "Memory CTL expansion",
        startH: 24,
        endH: 72,
        players: ["Memory CD8⁺ CTLs", "Perforin + granzymes", "IFN-γ amplification"],
        detail:
          "Memory CTLs respond within 24–72 h — orders of magnitude faster than the naïve 7–14 day window — clearing infected cells before significant viraemia. Memory B cells produce neutralising IgG within days.",
        arm: "adaptive",
      },
      {
        label: "3–14 d",
        title: "Subclinical resolution / escape risk",
        startH: 72,
        endH: 336,
        players: ["High-titre IgG", "Memory consolidation", "Antigenic drift / shift escape"],
        detail:
          "Most re-exposures are subclinical. Antigenic drift (point mutation) and shift (reassortment, e.g. influenza) can escape neutralising antibody → recurrent epidemics. Latent viruses (e.g. VZV → shingles) reactivate when T-cell surveillance wanes (age, steroids, immunosuppression).",
        arm: "resolution",
      },
    ],
  },
};

const armColors = {
  innate: "hsl(210, 75%, 50%)",
  adaptive: "hsl(265, 65%, 55%)",
  resolution: "hsl(140, 55%, 42%)",
} as const;

const ImmuneResponseTimelineDiagram = () => {
  const [pathogen, setPathogen] = useState<Pathogen>("bacterial");
  const [exposure, setExposure] = useState<Exposure>("naive");
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activePhases = phases[pathogen][exposure];
  const selected = activePhases[Math.min(selectedIdx, activePhases.length - 1)];

  // Pathogen-burden curve points (normalised 0–1) along log-time axis
  const burdenCurve = useMemo(() => {
    // Naïve: rises through innate, peaks ~day 5, falls as adaptive arrives.
    // Memory: tiny bump, suppressed almost immediately.
    if (exposure === "naive") {
      return [
        { t: 0, y: 0.05 },
        { t: 0.1, y: 0.2 },
        { t: 0.25, y: 0.55 },
        { t: 0.5, y: 0.85 },
        { t: 0.7, y: 0.7 },
        { t: 0.85, y: 0.35 },
        { t: 1, y: 0.05 },
      ];
    }
    return [
      { t: 0, y: 0.05 },
      { t: 0.15, y: 0.18 },
      { t: 0.3, y: 0.12 },
      { t: 0.5, y: 0.05 },
      { t: 0.75, y: 0.03 },
      { t: 1, y: 0.02 },
    ];
  }, [exposure]);

  // chart geometry
  const W = 700;
  const H = 220;
  const padL = 40;
  const padR = 16;
  const padT = 14;
  const padB = 42;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;

  const xForIdx = (i: number) => padL + (innerW * (i + 0.5)) / activePhases.length;
  const burdenPath = burdenCurve
    .map((p, i) => `${i === 0 ? "M" : "L"}${padL + p.t * innerW},${padT + (1 - p.y) * innerH}`)
    .join(" ");

  const pathogenLabel = pathogen === "bacterial" ? "Bacterial (extracellular)" : "Viral (intracellular)";
  const exposureLabel = exposure === "naive" ? "Naïve — first encounter" : "Re-exposure — memory recall";

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Immune response timeline"
          subtitle={`${pathogenLabel} · ${exposureLabel}`}
          toggles={[
            { label: "Bacterial", active: pathogen === "bacterial", onChange: () => setPathogen("bacterial") },
            { label: "Viral", active: pathogen === "viral", onChange: () => setPathogen("viral") },
            { label: "Naïve", active: exposure === "naive", onChange: () => { setExposure("naive"); setSelectedIdx(0); } },
            { label: "Re-exposed", active: exposure === "memory", onChange: () => { setExposure("memory"); setSelectedIdx(0); } },
          ]}
        />

        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full min-w-[600px]"
            role="img"
            aria-label={`Immune response timeline for ${pathogenLabel}, ${exposureLabel}`}
          >
            <defs>
              <linearGradient id="irt-burden-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 65%, 50%)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="hsl(0, 65%, 50%)" stopOpacity="0.02" />
              </linearGradient>
              <pattern id="irt-grid" width="50" height="40" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
              </pattern>
            </defs>

            {/* Plot area */}
            <rect x={padL} y={padT} width={innerW} height={innerH} fill="url(#irt-grid)" />

            {/* y axis label */}
            <text
              x={padL - 6}
              y={padT + innerH / 2}
              textAnchor="middle"
              transform={`rotate(-90 ${padL - 6} ${padT + innerH / 2})`}
              className="fill-muted-foreground"
              style={{ fontSize: 10 }}
            >
              Pathogen burden / symptoms
            </text>

            {/* Pathogen burden area + line */}
            <path
              d={`${burdenPath} L${padL + innerW},${padT + innerH} L${padL},${padT + innerH} Z`}
              fill="url(#irt-burden-grad)"
            />
            <path d={burdenPath} fill="none" stroke="hsl(0, 70%, 48%)" strokeWidth="2" />

            {/* Phase swimlane bars */}
            {activePhases.map((p, i) => {
              const x = padL + (innerW * i) / activePhases.length + 2;
              const w = innerW / activePhases.length - 4;
              const isSelected = i === selectedIdx;
              const c = armColors[p.arm];
              return (
    <DiagramFigure
      id="immune-response-timeline-diagram"
      title="Immune response timeline"
      description="Auto-generated wrapper for the Immune response timeline anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                      <g
                    key={p.label}
                    onClick={() => setSelectedIdx(i)}
                    style={{ cursor: "pointer" }}
                    aria-label={`Select phase ${p.label}: ${p.title}`}
                  >
                    <rect
                      x={x}
                      y={padT + innerH + 6}
                      width={w}
                      height={20}
                      rx={4}
                      fill={isSelected ? c : withAlpha(c, 0.18)}
                      stroke={c}
                      strokeWidth={isSelected ? 2 : 1}
                    />
                    <text
                      x={x + w / 2}
                      y={padT + innerH + 20}
                      textAnchor="middle"
                      style={{ fontSize: 10, fontWeight: 600 }}
                      fill={isSelected ? "white" : "hsl(var(--foreground))"}
                    >
                      {p.label}
                    </text>
                    {/* connector tick from curve to phase */}
                    <line
                      x1={xForIdx(i)}
                      y1={padT}
                      x2={xForIdx(i)}
                      y2={padT + innerH}
                      stroke={isSelected ? c : "hsl(var(--border))"}
                      strokeWidth={isSelected ? 1.5 : 0.5}
                      strokeDasharray={isSelected ? "0" : "3 3"}
                      opacity={isSelected ? 0.5 : 0.6}
                    />
                  </g>
    </DiagramFigure>
  );
            })}

            {/* x axis caption */}
            <text x={W / 2} y={H - 4} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 10 }}>
              Time after exposure (log scale, hours → weeks)
            </text>
          </svg>
        </div>

        {/* Arm legend */}
        <div className="flex flex-wrap gap-3 mt-2 text-[11px] text-muted-foreground">
          {(Object.keys(armColors) as (keyof typeof armColors)[]).map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: armColors[k] }} />
              <span className="capitalize">{k}</span>
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block w-3 h-2 rounded-sm" style={{ backgroundColor: "hsl(0, 70%, 48%)" }} />
            <span>Pathogen burden</span>
          </span>
        </div>

        {/* Selected phase detail panel */}
        <div
          className="mt-3 rounded-lg border-2 p-3"
          style={{
            borderColor: armColors[selected.arm],
            backgroundColor: withAlpha(armColors[selected.arm], 0.06),
          }}
        >
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <p className="text-sm font-bold text-foreground">
              <span style={{ color: armColors[selected.arm] }}>{selected.label}</span>{" "}
              · {selected.title}
            </p>
            <span
              className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: withAlpha(armColors[selected.arm], 0.15),
                color: armColors[selected.arm],
              }}
            >
              {selected.arm}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {selected.players.map((p) => (
              <span
                key={p}
                className="text-[11px] px-2 py-0.5 rounded border bg-background/70"
                style={{ borderColor: withAlpha(armColors[selected.arm], 0.4) }}
              >
                {p}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{selected.detail}</p>
        </div>

        <p className="text-[11px] text-muted-foreground mt-2 italic text-center">
          Switch pathogen class and exposure type to compare timelines. Re-exposure suppresses pathogen burden almost entirely — the basis of vaccination.
        </p>
      </div>
    </div>
  );
};

export default ImmuneResponseTimelineDiagram;
