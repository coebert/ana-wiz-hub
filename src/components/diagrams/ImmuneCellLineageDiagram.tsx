import { useEffect, useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";

type Branch = "myeloid" | "lymphoid";
type Arm = "innate" | "adaptive" | "bridge";

interface Cell {
  id: string;
  label: string;
  short: string;
  x: number;
  y: number;
  parent: string | null;
  branch: Branch | "stem";
  arm: Arm | "stem";
  shape: "stem" | "progenitor" | "granulocyte" | "mononuclear" | "lymphocyte" | "plasma" | "platelet" | "rbc" | "dendritic" | "nk";
  role: string;
  function: string;
  clinical: string;
}

// Colour map (HSL — region-style accents)
const armColor: Record<Arm | "stem", string> = {
  stem: "hsl(var(--muted-foreground))",
  innate: "hsl(15 75% 52%)",     // warm orange — fast/innate
  adaptive: "hsl(265 55% 55%)",  // purple — specific/adaptive
  bridge: "hsl(195 65% 45%)",    // teal — innate–adaptive bridge (DC, NKT)
};

const cells: Cell[] = [
  // Stem
  { id: "hsc", label: "Haematopoietic Stem Cell", short: "HSC", x: 300, y: 36, parent: null, branch: "stem", arm: "stem", shape: "stem",
    role: "Pluripotent — bone marrow",
    function: "Self-renewing CD34⁺ stem cell. Gives rise to all blood lineages via myeloid and lymphoid progenitors. Niche in trabecular marrow, regulated by SCF, TPO, IL-3.",
    clinical: "Source for autologous/allogeneic stem cell transplant (AML, lymphoma, aplastic anaemia). G-CSF mobilises HSCs into peripheral blood for harvest." },

  // Progenitors
  { id: "cmp", label: "Common Myeloid Progenitor", short: "CMP", x: 150, y: 110, parent: "hsc", branch: "myeloid", arm: "innate", shape: "progenitor",
    role: "Myeloid lineage commitment",
    function: "Gives rise to granulocyte/monocyte progenitor (GMP) and megakaryocyte/erythrocyte progenitor (MEP).",
    clinical: "Site of mutation in chronic myeloid leukaemia (BCR-ABL, Ph chromosome) and myelodysplastic syndromes." },
  { id: "clp", label: "Common Lymphoid Progenitor", short: "CLP", x: 450, y: 110, parent: "hsc", branch: "lymphoid", arm: "adaptive", shape: "progenitor",
    role: "Lymphoid lineage commitment",
    function: "Gives rise to B cells (mature in marrow), T cells (mature in thymus), NK cells and ILCs.",
    clinical: "Defects → severe combined immunodeficiency (SCID). Acute lymphoblastic leukaemia arises from arrested lymphoid progenitors." },

  // Myeloid leaves
  { id: "rbc", label: "Erythrocyte", short: "RBC", x: 40, y: 200, parent: "cmp", branch: "myeloid", arm: "stem", shape: "rbc",
    role: "Oxygen transport",
    function: "Anucleate biconcave disc, 120-day lifespan. Carries Hb (4 × O₂). Not strictly immune but shares HSC origin.",
    clinical: "Transfusion thresholds, haemolytic reactions, sickle cell." },
  { id: "plt", label: "Platelet", short: "PLT", x: 100, y: 200, parent: "cmp", branch: "myeloid", arm: "innate", shape: "platelet",
    role: "Haemostasis + immune sentinel",
    function: "Megakaryocyte fragments. Form primary haemostatic plug; release granules (PF4, β-TG); express TLRs and bind bacteria — bridge to immunity (NETosis, sepsis-DIC).",
    clinical: "Thrombocytopenia in sepsis is a SOFA criterion. HIT, ITP, TTP." },

  // Granulocytes
  { id: "neu", label: "Neutrophil", short: "Neu", x: 160, y: 270, parent: "cmp", branch: "myeloid", arm: "innate", shape: "granulocyte",
    role: "First-responder phagocyte",
    function: "Multilobed nucleus, 6–8 h half-life in blood. Recruited by IL-8/CXCL8, C5a. Phagocytoses opsonised bacteria → respiratory burst (NADPH oxidase → O₂⁻, HOCl), degranulation, NETs. Pus = dead neutrophils.",
    clinical: "Neutropenia (<0.5×10⁹/L) → neutropenic sepsis emergency. Chronic granulomatous disease (NADPH defect)." },
  { id: "eos", label: "Eosinophil", short: "Eos", x: 220, y: 270, parent: "cmp", branch: "myeloid", arm: "innate", shape: "granulocyte",
    role: "Anti-parasitic + allergy",
    function: "Bilobed nucleus, eosin-staining granules (major basic protein, eosinophil peroxidase). Kills helminths via ADCC. Th2-driven (IL-5).",
    clinical: "↑ in allergy, asthma, eosinophilic pneumonia, drug reactions (DRESS), Churg-Strauss/EGPA." },
  { id: "bas", label: "Basophil", short: "Bas", x: 280, y: 270, parent: "cmp", branch: "myeloid", arm: "innate", shape: "granulocyte",
    role: "Allergy mediator (circulating)",
    function: "Rare (<1% WBC). Granules of histamine and heparin. IgE receptor (FcεRI) — degranulates in Type I hypersensitivity alongside mast cells.",
    clinical: "Tryptase from mast cells is the lab marker; basophil counts ↑ in CML." },
  { id: "mast", label: "Mast Cell", short: "Mast", x: 340, y: 270, parent: "cmp", branch: "myeloid", arm: "innate", shape: "granulocyte",
    role: "Tissue-resident allergy effector",
    function: "Resides in mucosa/skin near vessels. FcεRI cross-linking by IgE → release histamine, tryptase, leukotrienes, PGD₂ → vasodilation, bronchoconstriction, mucus.",
    clinical: "Anaphylaxis — serum tryptase peak at 1–2 h confirms mast-cell activation. Mastocytosis." },

  // Mononuclear phagocytes
  { id: "mono", label: "Monocyte", short: "Mono", x: 100, y: 340, parent: "cmp", branch: "myeloid", arm: "innate", shape: "mononuclear",
    role: "Circulating phagocyte precursor",
    function: "Kidney-shaped nucleus. 1–3 days in blood, then migrates into tissue → macrophage or DC. Classical (CD14⁺⁺CD16⁻) drives inflammation; non-classical patrols endothelium.",
    clinical: "Monocytosis in chronic inflammation, TB, SBE. CD14 and HLA-DR expression markers of immune competence in sepsis." },
  { id: "mac", label: "Macrophage", short: "Mφ", x: 50, y: 410, parent: "mono", branch: "myeloid", arm: "innate", shape: "mononuclear",
    role: "Tissue phagocyte + APC",
    function: "Tissue-resident (Kupffer, alveolar, microglia, osteoclast). Phagocytose, present antigen on MHC-II, secrete IL-1/IL-6/TNF-α. M1 = pro-inflammatory (Th1, IFN-γ); M2 = repair/Th2.",
    clinical: "Central to granuloma (TB, sarcoid). Cytokine storm in sepsis/CRS. Tumour-associated macrophages drive immunosuppression." },
  { id: "dc", label: "Dendritic Cell", short: "DC", x: 170, y: 410, parent: "mono", branch: "myeloid", arm: "bridge",  shape: "dendritic",
    role: "Professional antigen-presenting cell",
    function: "Sentinel in skin (Langerhans), mucosa, lymph node. Captures antigen → migrates to draining LN → presents on MHC-I (cross-presentation) and MHC-II → primes naïve T cells. The crucial innate-adaptive bridge.",
    clinical: "Target of mRNA and viral-vector vaccines. DC-based cancer immunotherapy (sipuleucel-T)." },

  // Lymphoid leaves
  { id: "nk", label: "Natural Killer Cell", short: "NK", x: 380, y: 200, parent: "clp", branch: "lymphoid", arm: "bridge", shape: "nk",
    role: "Innate cytotoxic lymphocyte",
    function: "Large granular lymphocyte. Kills cells with ↓ MHC-I (\"missing-self\") — virus-infected and tumour cells. Releases perforin/granzymes; secretes IFN-γ. ADCC via CD16 binds IgG-coated cells.",
    clinical: "Surgery + opioids + volatiles ↓ NK activity → theoretical ↑ peri-op metastasis risk. NK lymphoma." },
  { id: "ilc", label: "Innate Lymphoid Cell", short: "ILC", x: 440, y: 200, parent: "clp", branch: "lymphoid", arm: "innate", shape: "lymphocyte",
    role: "Tissue innate cytokine source",
    function: "ILC1 (IFN-γ, like Th1), ILC2 (IL-5/IL-13, allergy/parasite, like Th2), ILC3 (IL-17/IL-22, mucosal defence, like Th17). No antigen-specific receptor.",
    clinical: "ILC2 implicated in asthma; ILC3 in IBD." },

  // T cells
  { id: "tcell", label: "T cell (thymic)", short: "T", x: 520, y: 200, parent: "clp", branch: "lymphoid", arm: "adaptive", shape: "lymphocyte",
    role: "Thymic-educated lymphocyte",
    function: "Positive + negative selection in thymus → naïve CD4⁺ or CD8⁺ T cells exit. TCR recognises peptide-MHC.",
    clinical: "Thymectomy in MG; DiGeorge syndrome (thymic aplasia). T-cell ALL/lymphoma." },
  { id: "th", label: "CD4⁺ Helper T", short: "Th", x: 470, y: 280, parent: "tcell", branch: "lymphoid", arm: "adaptive", shape: "lymphocyte",
    role: "Orchestrator of adaptive response",
    function: "Recognises peptide on MHC-II. Th1 (IFN-γ → macrophages, intracellular bugs); Th2 (IL-4/5/13 → B cells, eosinophils, allergy); Th17 (IL-17 → neutrophils, extracellular bacteria/fungi); Treg (IL-10/TGF-β → tolerance); Tfh (germinal centre B-cell help).",
    clinical: "HIV depletes CD4⁺ → opportunistic infections when <200/µL. Targeted by checkpoint inhibitors." },
  { id: "ctl", label: "CD8⁺ Cytotoxic T", short: "CTL", x: 540, y: 280, parent: "tcell", branch: "lymphoid", arm: "adaptive", shape: "lymphocyte",
    role: "Killer of infected/tumour cells",
    function: "Recognises peptide on MHC-I. Releases perforin + granzymes → apoptosis. Engages Fas-FasL. Critical for viral clearance and tumour surveillance.",
    clinical: "CTL exhaustion targeted by anti-PD-1/PD-L1 (nivolumab). CAR-T therapy (CD19 in B-ALL)." },
  { id: "treg", label: "Regulatory T", short: "Treg", x: 470, y: 350, parent: "th", branch: "lymphoid", arm: "adaptive", shape: "lymphocyte",
    role: "Immune tolerance",
    function: "FoxP3⁺ CD4⁺CD25⁺. Suppresses effector T cells via IL-10, TGF-β, CTLA-4. Maintains self-tolerance and limits collateral damage.",
    clinical: "Loss → autoimmunity (IPEX). Tumours co-opt Tregs to evade immunity." },

  // B cells
  { id: "bcell", label: "B cell", short: "B", x: 580, y: 200, parent: "clp", branch: "lymphoid", arm: "adaptive", shape: "lymphocyte",
    role: "Humoral lymphocyte",
    function: "Matures in bone marrow. BCR (surface IgM/IgD) recognises native antigen. With T-cell help (CD40L–CD40, IL-4) → germinal centre → class switch (IgG/IgA/IgE), somatic hypermutation, affinity maturation.",
    clinical: "Rituximab (anti-CD20) in lymphoma, RA, MS. Marginal-zone B cells lost in asplenia." },
  { id: "plasma", label: "Plasma Cell", short: "PC", x: 580, y: 280, parent: "bcell", branch: "lymphoid", arm: "adaptive", shape: "plasma",
    role: "Antibody factory",
    function: "Terminally differentiated B cell. Secretes thousands of antibodies/sec. Long-lived plasma cells in bone marrow sustain serological memory for decades.",
    clinical: "Multiple myeloma (monoclonal Ig, lytic lesions, hypercalcaemia). Source of IVIG." },
  { id: "memb", label: "Memory B / T", short: "Mem", x: 580, y: 350, parent: "bcell", branch: "lymphoid", arm: "adaptive", shape: "lymphocyte",
    role: "Immunological memory",
    function: "Long-lived antigen-specific B and T cells. On re-exposure: respond in 1–3 days (vs 7–14), 100–1000× higher titre, predominantly class-switched IgG. Basis of vaccination.",
    clinical: "Vaccine schedules exploit memory; waning memory in elderly → boosters. Memory CTLs control latent viruses (VZV, CMV)." },
];

const linkPath = (a: Cell, b: Cell) => {
  const midY = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y + 14} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y - 14}`;
};

type ViewMode = "lineage" | "activation";
type Pathway = "antigen-dc-t-b" | "il5-eos";

interface Step {
  from: string;
  to: string;
  label: string;
  token: string;
  color: string;
  duration?: number;
}

const ANTIGEN_ANCHOR = { x: 60, y: 450 };

const pathways: Record<Pathway, { title: string; caption: string; steps: Step[] }> = {
  "antigen-dc-t-b": {
    title: "Antigen → DC → T helper → B cell",
    caption:
      "Tissue dendritic cell captures antigen, migrates to the draining lymph node, presents on MHC-II to a naïve CD4⁺ T cell. The activated Th cell licences a B cell (CD40L–CD40 + IL-4) → germinal centre → plasma cell secreting class-switched IgG.",
    steps: [
      { from: "ag-source", to: "dc",       label: "Antigen captured by tissue DC",       token: "Ag",     color: "hsl(45 90% 50%)", duration: 1400 },
      { from: "dc",        to: "th",       label: "DC presents on MHC-II → TCR",         token: "MHC-II", color: armColor.bridge,   duration: 1600 },
      { from: "th",        to: "bcell",    label: "Th help: CD40L–CD40 + IL-4",          token: "IL-4",   color: armColor.adaptive, duration: 1400 },
      { from: "bcell",     to: "plasma",   label: "B cell → plasma cell (class switch)", token: "→ PC",   color: armColor.adaptive, duration: 1200 },
      { from: "plasma",    to: "ag-source",label: "Secreted IgG opsonises antigen",      token: "IgG",    color: "hsl(140 55% 40%)", duration: 1600 },
    ],
  },
  "il5-eos": {
    title: "IL-5 → eosinophil recruitment",
    caption:
      "Th2 cells (and ILC2) secrete IL-5 in response to allergens or helminths. IL-5 drives bone-marrow eosinophil maturation and egress, then recruits mature eosinophils to tissue where they degranulate (major basic protein, ECP).",
    steps: [
      { from: "ag-source", to: "th",       label: "Allergen / helminth antigen → Th2",   token: "Ag",   color: "hsl(45 90% 50%)", duration: 1300 },
      { from: "th",        to: "eos",      label: "Th2 secretes IL-5",                   token: "IL-5", color: "hsl(15 75% 52%)", duration: 1700 },
      { from: "ilc",       to: "eos",      label: "ILC2 reinforces IL-5 signal",         token: "IL-5", color: "hsl(15 75% 52%)", duration: 1700 },
      { from: "eos",       to: "ag-source",label: "Eosinophil → tissue, degranulation",  token: "MBP",  color: "hsl(15 75% 52%)", duration: 1500 },
    ],
  },
};

const ImmuneCellLineageDiagram = () => {
  const [view, setView] = useState<ViewMode>("lineage");
  const [pathway, setPathway] = useState<Pathway>("antigen-dc-t-b");
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [selected, setSelected] = useState<string>("dc");
  const [showLabels, setShowLabels] = useState(true);
  const [showLineages, setShowLineages] = useState(true);
  const [highlight, setHighlight] = useState<"all" | "innate" | "adaptive">("all");

  const activeSteps = pathways[pathway].steps;
  const currentStep = activeSteps[stepIdx % activeSteps.length];

  useEffect(() => {
    if (view !== "activation" || !playing) return;
    const t = setTimeout(() => setStepIdx((i) => (i + 1) % activeSteps.length), currentStep?.duration ?? 1500);
    return () => clearTimeout(t);
  }, [view, playing, stepIdx, currentStep, activeSteps.length]);

  // Reset when switching pathway
  useEffect(() => { setStepIdx(0); }, [pathway, view]);

  const resolvePoint = (id: string) => {
    if (id === "ag-source") return ANTIGEN_ANCHOR;
    const c = cells.find((x) => x.id === id)!;
    return { x: c.x, y: c.y };
  };

  const sel = cells.find((c) => c.id === selected);
  const isDimmed = (c: Cell) => {
    if (view === "activation") {
      const inPath = activeSteps.some((s) => s.from === c.id || s.to === c.id);
      return !inPath;
    }
    if (highlight === "all") return false;
    if (c.arm === "stem" || c.arm === "bridge") return false;
    return c.arm !== highlight;
  };

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title={view === "lineage" ? "Immune cell lineages — from HSC to effector" : "Activation pathways — animated cell-to-cell signalling"}
          subtitle={view === "lineage" ? "Tap any cell for role, function and clinical relevance" : "Watch antigen, MHC, cytokines and antibody travel between cells"}
          toggles={[
            { label: "Lineages", active: showLineages, onChange: () => setShowLineages((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        {/* View mode + context controls */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs mb-3">
          <div className="inline-flex rounded-md border border-border overflow-hidden">
            {(["lineage", "activation"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setView(m)}
                className={`px-2.5 py-1 transition-colors capitalize ${
                  view === m ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                {m === "lineage" ? "Lineage view" : "Activation pathways"}
              </button>
            ))}
          </div>

          {view === "lineage" && (
            <>
              {(["all", "innate", "adaptive"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setHighlight(k)}
                  className={`px-2 py-1 rounded border transition-colors capitalize ${
                    highlight === k
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {k === "all" ? "Show all" : `Highlight ${k}`}
                </button>
              ))}
            </>
          )}

          {view === "activation" && (
            <>
              {(Object.keys(pathways) as Pathway[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPathway(p)}
                  className={`px-2 py-1 rounded border transition-colors ${
                    pathway === p
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {p === "antigen-dc-t-b" ? "Ag → DC → T → B" : "IL-5 → eosinophil"}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="px-2 py-1 rounded border border-border text-muted-foreground hover:bg-muted/50"
                aria-pressed={playing}
              >
                {playing ? "⏸ Pause" : "▶ Play"}
              </button>
              <button
                type="button"
                onClick={() => setStepIdx((i) => (i + 1) % activeSteps.length)}
                className="px-2 py-1 rounded border border-border text-muted-foreground hover:bg-muted/50"
              >
                Step ›
              </button>
            </>
          )}

          <span className="ml-auto flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: armColor.innate }} /> Innate</span>
            <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: armColor.adaptive }} /> Adaptive</span>
            <span className="flex items-center gap-1"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: armColor.bridge }} /> Bridge</span>
          </span>
        </div>

        <svg
          viewBox="0 0 620 470"
          className="w-full max-w-3xl mx-auto"
          role="img"
          aria-label="Diagram of haematopoietic cell lineages, from stem cell through myeloid and lymphoid branches to mature immune effector cells"
        >
          <defs>
            <radialGradient id="icl-stemShade" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient id="icl-innateShade" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor={armColor.innate} stopOpacity="0.85" />
              <stop offset="100%" stopColor={armColor.innate} stopOpacity="0.45" />
            </radialGradient>
            <radialGradient id="icl-adaptiveShade" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor={armColor.adaptive} stopOpacity="0.85" />
              <stop offset="100%" stopColor={armColor.adaptive} stopOpacity="0.45" />
            </radialGradient>
            <radialGradient id="icl-bridgeShade" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor={armColor.bridge} stopOpacity="0.85" />
              <stop offset="100%" stopColor={armColor.bridge} stopOpacity="0.45" />
            </radialGradient>
            <pattern id="icl-marrow" patternUnits="userSpaceOnUse" width="6" height="6">
              <circle cx="1" cy="1" r="0.5" fill="hsl(var(--muted-foreground))" opacity="0.18" />
            </pattern>
            <filter id="icl-cellShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
              <feOffset dx="0" dy="1" result="off" />
              <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Bone marrow band */}
          <rect x="0" y="0" width="620" height="170" fill="url(#icl-marrow)" pointerEvents="none" />
          <text x="612" y="14" textAnchor="end" className="text-[9px] fill-muted-foreground italic">bone marrow</text>
          <line x1="0" y1="170" x2="620" y2="170" stroke="hsl(var(--border))" strokeDasharray="3 4" opacity="0.6" />
          <text x="612" y="184" textAnchor="end" className="text-[9px] fill-muted-foreground italic">peripheral blood / tissue / lymphoid organs</text>

          {/* Midline */}
          <line x1="310" y1="55" x2="310" y2="460" stroke="hsl(var(--border))" strokeDasharray="2 5" opacity="0.35" />
          <text x="155" y="64" textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium tracking-wide">MYELOID</text>
          <text x="465" y="64" textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium tracking-wide">LYMPHOID</text>

          {/* Lineage links (lineage view only) */}
          {view === "lineage" && showLineages && cells.filter((c) => c.parent).map((c) => {
            const p = cells.find((x) => x.id === c.parent)!;
            const dim = isDimmed(c) || isDimmed(p);
            return (
              <path
                key={`l-${c.id}`}
                d={linkPath(p, c)}
                fill="none"
                stroke={c.arm === "stem" ? "hsl(var(--muted-foreground))" : armColor[c.arm]}
                strokeWidth={selected === c.id || selected === p.id ? 1.8 : 1}
                opacity={dim ? 0.12 : selected === c.id || selected === p.id ? 0.85 : 0.45}
              />
            );
          })}

          {/* Cells */}
          {cells.map((c) => {
            const isSel = selected === c.id;
            const dim = isDimmed(c);
            const fill =
              c.arm === "stem" ? "url(#icl-stemShade)"
              : c.arm === "innate" ? "url(#icl-innateShade)"
              : c.arm === "adaptive" ? "url(#icl-adaptiveShade)"
              : "url(#icl-bridgeShade)";
            const stroke = c.arm === "stem" ? "hsl(var(--muted-foreground))" : armColor[c.arm];

            return (
              <g
                key={c.id}
                onClick={() => setSelected(isSel ? c.id : c.id)}
                style={{ cursor: "pointer" }}
                opacity={dim ? 0.2 : 1}
                filter="url(#icl-cellShadow)"
              >
                <CellShape c={c} fill={fill} stroke={stroke} selected={isSel} />
                {showLabels && (
                  <text
                    x={c.x}
                    y={c.y + 28}
                    textAnchor="middle"
                    className="text-[8.5px] fill-foreground font-medium select-none pointer-events-none"
                  >
                    {c.short}
                  </text>
                )}
              </g>
            );
          })}

          {/* Activation overlay */}
          {view === "activation" && (() => {
            const renderArrow = (from: string, to: string, color: string, isCurrent: boolean, key: string) => {
              const a = resolvePoint(from);
              const b = resolvePoint(to);
              const mx = (a.x + b.x) / 2;
              const my = (a.y + b.y) / 2 - 30;
              const d = `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
              return (
                <path
                  key={key}
                  id={key}
                  d={d}
                  fill="none"
                  stroke={color}
                  strokeWidth={isCurrent ? 1.8 : 0.8}
                  strokeDasharray={isCurrent ? "0" : "3 3"}
                  opacity={isCurrent ? 0.9 : 0.35}
                />
              );
            };
            return (
              <g>
                {/* Antigen / pathogen anchor (off-graph) */}
                <g>
                  <circle cx={ANTIGEN_ANCHOR.x} cy={ANTIGEN_ANCHOR.y} r="14" fill="hsl(45 90% 50%)" opacity="0.25" />
                  <circle cx={ANTIGEN_ANCHOR.x} cy={ANTIGEN_ANCHOR.y} r="8" fill="hsl(45 90% 50%)" opacity="0.85" stroke="hsl(45 90% 35%)" strokeWidth="1" />
                  <text x={ANTIGEN_ANCHOR.x} y={ANTIGEN_ANCHOR.y + 26} textAnchor="middle" className="text-[8.5px] fill-foreground font-medium">
                    {pathway === "il5-eos" ? "Allergen" : "Antigen"}
                  </text>
                </g>

                {/* All step arrows (faint) */}
                {activeSteps.map((s, i) =>
                  renderArrow(s.from, s.to, s.color, false, `arr-bg-${i}`)
                )}
                {/* Current step arrow (bold) */}
                {currentStep && renderArrow(currentStep.from, currentStep.to, currentStep.color, true, `arr-cur`)}

                {/* Animated token */}
                {currentStep && (() => {
                  const a = resolvePoint(currentStep.from);
                  const b = resolvePoint(currentStep.to);
                  const mx = (a.x + b.x) / 2;
                  const my = (a.y + b.y) / 2 - 30;
                  return (
                    <g key={`tok-${stepIdx}-${pathway}`}>
                      <circle r="9" fill={currentStep.color} opacity="0.9" stroke="hsl(var(--background))" strokeWidth="1.2">
                        <animateMotion
                          dur={`${(currentStep.duration ?? 1500) / 1000}s`}
                          repeatCount="1"
                          fill="freeze"
                          path={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                        />
                      </circle>
                      <text fontSize="7" textAnchor="middle" dy="2" fill="hsl(var(--background))" fontWeight="700" pointerEvents="none">
                        <animateMotion
                          dur={`${(currentStep.duration ?? 1500) / 1000}s`}
                          repeatCount="1"
                          fill="freeze"
                          path={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                        />
                        {currentStep.token}
                      </text>
                    </g>
                  );
                })()}
              </g>
            );
          })()}
        </svg>

        {/* Mnemonic / footer */}
        {view === "lineage" ? (
          <p className="text-xs text-center text-muted-foreground mt-2 italic">
            <span className="font-semibold not-italic text-foreground">Never Eat Black Mango Mash — </span>
            Neutrophil, Eosinophil, Basophil, Monocyte, Mast cell — the myeloid effectors of innate immunity.
          </p>
        ) : (
          <p className="text-xs text-center text-muted-foreground mt-2 italic">
            <span className="font-semibold not-italic text-foreground">{pathways[pathway].title}</span>
          </p>
        )}

        {/* Detail / step panel */}
        <div className="mt-4 min-h-[140px]">
          {view === "activation" ? (
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5 animate-fade-in"
              key={`step-${pathway}-${stepIdx}`}
              style={{ borderLeftWidth: 4, borderLeftColor: currentStep.color }}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="font-semibold text-foreground text-sm">
                  Step {stepIdx + 1} / {activeSteps.length} — {currentStep.label}
                </p>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{ background: `${currentStep.color}26`, color: currentStep.color }}
                >
                  {currentStep.token}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{pathways[pathway].caption}</p>
              <div className="flex gap-1 mt-1">
                {activeSteps.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 flex-1 rounded-full transition-colors"
                    style={{ background: i === stepIdx ? currentStep.color : "hsl(var(--muted))" }}
                  />
                ))}
              </div>
            </div>
          ) : sel ? (
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
              style={{ borderLeftWidth: 4, borderLeftColor: sel.arm === "stem" ? "hsl(var(--muted-foreground))" : armColor[sel.arm] }}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="font-semibold text-foreground text-sm">{sel.label}</p>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{
                    background: sel.arm === "stem" ? "hsl(var(--muted))" : `${armColor[sel.arm]}26`,
                    color: sel.arm === "stem" ? "hsl(var(--muted-foreground))" : armColor[sel.arm],
                  }}
                >
                  {sel.branch === "stem" ? "Stem" : sel.branch} · {sel.arm}
                </span>
              </div>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Role:</span> {sel.role}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Function:</span> {sel.function}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Clinical:</span> {sel.clinical}</p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center italic">Tap a cell above to see role, function and clinical relevance.</p>
          )}
        </div>


        {/* Detail panel */}
        <div className="mt-4 min-h-[140px]">
          {sel ? (
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
              style={{ borderLeftWidth: 4, borderLeftColor: sel.arm === "stem" ? "hsl(var(--muted-foreground))" : armColor[sel.arm] }}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="font-semibold text-foreground text-sm">{sel.label}</p>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{
                    background: sel.arm === "stem" ? "hsl(var(--muted))" : `${armColor[sel.arm]}26`,
                    color: sel.arm === "stem" ? "hsl(var(--muted-foreground))" : armColor[sel.arm],
                  }}
                >
                  {sel.branch === "stem" ? "Stem" : sel.branch} · {sel.arm}
                </span>
              </div>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Role:</span> {sel.role}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Function:</span> {sel.function}</p>
              <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">Clinical:</span> {sel.clinical}</p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center italic">Tap a cell above to see role, function and clinical relevance.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Anatomically suggestive cell shapes ---
const CellShape = ({ c, fill, stroke, selected }: { c: Cell; fill: string; stroke: string; selected: boolean }) => {
  const sw = selected ? 1.8 : 0.9;
  const op = selected ? 1 : 0.85;
  switch (c.shape) {
    case "stem":
      return (
        <>
          <circle cx={c.x} cy={c.y} r="14" fill={fill} stroke={stroke} strokeWidth={sw} opacity={op} />
          <circle cx={c.x} cy={c.y} r="6" fill="hsl(var(--background))" opacity="0.55" />
        </>
      );
    case "progenitor":
      return (
        <>
          <circle cx={c.x} cy={c.y} r="12" fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray="2 1.5" opacity={op} />
          <circle cx={c.x} cy={c.y} r="5" fill="hsl(var(--background))" opacity="0.55" />
        </>
      );
    case "granulocyte":
      // multi-lobed nucleus
      return (
        <>
          <circle cx={c.x} cy={c.y} r="13" fill={fill} stroke={stroke} strokeWidth={sw} opacity={op} />
          <circle cx={c.x - 4} cy={c.y - 2} r="3" fill="hsl(var(--background))" opacity="0.7" />
          <circle cx={c.x + 4} cy={c.y - 2} r="3" fill="hsl(var(--background))" opacity="0.7" />
          <circle cx={c.x} cy={c.y + 4} r="3" fill="hsl(var(--background))" opacity="0.7" />
          {/* granules */}
          <circle cx={c.x - 8} cy={c.y + 6} r="0.9" fill={stroke} opacity="0.7" />
          <circle cx={c.x + 8} cy={c.y + 5} r="0.9" fill={stroke} opacity="0.7" />
          <circle cx={c.x - 6} cy={c.y - 8} r="0.9" fill={stroke} opacity="0.7" />
        </>
      );
    case "mononuclear":
      // kidney-shaped nucleus
      return (
        <>
          <circle cx={c.x} cy={c.y} r="13" fill={fill} stroke={stroke} strokeWidth={sw} opacity={op} />
          <path d={`M ${c.x - 6} ${c.y - 4} C ${c.x - 9} ${c.y}, ${c.x - 4} ${c.y + 6}, ${c.x + 4} ${c.y + 4} C ${c.x + 2} ${c.y - 2}, ${c.x + 5} ${c.y - 6}, ${c.x - 6} ${c.y - 4} Z`}
            fill="hsl(var(--background))" opacity="0.65" />
        </>
      );
    case "lymphocyte":
      // small cell, large round nucleus
      return (
        <>
          <circle cx={c.x} cy={c.y} r="12" fill={fill} stroke={stroke} strokeWidth={sw} opacity={op} />
          <circle cx={c.x} cy={c.y} r="8" fill="hsl(var(--background))" opacity="0.55" />
        </>
      );
    case "nk":
      return (
        <>
          <circle cx={c.x} cy={c.y} r="13" fill={fill} stroke={stroke} strokeWidth={sw} opacity={op} />
          <circle cx={c.x - 1} cy={c.y - 1} r="7" fill="hsl(var(--background))" opacity="0.6" />
          {/* granules */}
          <circle cx={c.x + 5} cy={c.y + 5} r="1.1" fill={stroke} />
          <circle cx={c.x + 7} cy={c.y - 1} r="1.1" fill={stroke} />
          <circle cx={c.x - 6} cy={c.y + 6} r="1.1" fill={stroke} />
        </>
      );
    case "plasma":
      // eccentric nucleus, "clock-face" chromatin — ovoid cell
      return (
        <>
          <ellipse cx={c.x} cy={c.y} rx="14" ry="11" fill={fill} stroke={stroke} strokeWidth={sw} opacity={op} />
          <circle cx={c.x - 5} cy={c.y} r="6" fill="hsl(var(--background))" opacity="0.65" />
          <circle cx={c.x - 5} cy={c.y} r="3" fill={stroke} opacity="0.25" />
        </>
      );
    case "dendritic":
      // star with processes
      return (
        <>
          {[0, 60, 120, 180, 240, 300].map((a) => {
            const rad = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={c.x}
                y1={c.y}
                x2={c.x + Math.cos(rad) * 16}
                y2={c.y + Math.sin(rad) * 16}
                stroke={stroke}
                strokeWidth={sw + 0.3}
                opacity={op}
                strokeLinecap="round"
              />
            );
          })}
          <circle cx={c.x} cy={c.y} r="8" fill={fill} stroke={stroke} strokeWidth={sw} opacity={op} />
        </>
      );
    case "platelet":
      return (
        <>
          <ellipse cx={c.x} cy={c.y} rx="9" ry="5" fill={fill} stroke={stroke} strokeWidth={sw} opacity={op} />
          <circle cx={c.x - 2} cy={c.y} r="0.9" fill={stroke} />
          <circle cx={c.x + 2} cy={c.y} r="0.9" fill={stroke} />
        </>
      );
    case "rbc":
      // biconcave: ring with paler centre
      return (
        <>
          <circle cx={c.x} cy={c.y} r="11" fill="hsl(0 60% 55%)" stroke="hsl(0 60% 40%)" strokeWidth={sw} opacity={op} />
          <circle cx={c.x} cy={c.y} r="5" fill="hsl(0 60% 75%)" opacity="0.85" />
        </>
      );
    default:
      return <circle cx={c.x} cy={c.y} r="12" fill={fill} stroke={stroke} strokeWidth={sw} opacity={op} />;
  }
};

export default ImmuneCellLineageDiagram;
