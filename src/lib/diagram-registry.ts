/**
 * Diagram registry + similarity detection.
 *
 * Purpose: prevent near-duplicate diagrams being added to multiple sections of
 * the same topic (or across closely related topics). Each diagram component
 * registers a lightweight DiagramFingerprint describing what it visualises and
 * the parametric model it uses. The similarity helper compares two fingerprints
 * across kind / domain / dimensions / phenomena / parameters and returns a
 * 0-1 score plus a reason string so the placement flow can decide whether to
 * EXTEND an existing diagram, CROSS-REFERENCE it, or add a NEW one.
 *
 * This is an authoring/editorial aid — it has no runtime effect on rendered
 * pages. It is consumed by the placement-decision flow (see
 * mem://preferences/topic-section-placement).
 */

export type DiagramKind =
  | "waveform"           // time-series trace (ECG, pressure, capnography, EEG)
  | "loop"               // closed cycle (PV loop, flow-volume loop)
  | "curve"              // single x-y relationship (ODC, compliance, dose-response)
  | "anatomy"            // labelled anatomical illustration
  | "schematic"          // circuit / pathway / cascade
  | "comparison-panel"   // multiple variants of one underlying figure
  | "calculator"         // input → output tool
  | "timeline"           // sequenced events on a horizontal axis
  | "decision-tree"      // branching algorithm
  | "table"              // structured tabular data
  | "overlay"            // annotation layered onto a host diagram
  | "animation";         // primarily motion-driven explanation

export type Phenomenon =
  | "aortic-pressure"
  | "ventricular-pressure"
  | "atrial-pressure"
  | "ecg"
  | "heart-sounds"
  | "valve-events"
  | "dichrotic-notch"
  | "iabp-timing"
  | "pulse-pressure-variation"
  | "capnography"
  | "spirometry"
  | "lung-volumes"
  | "flow-volume"
  | "compliance"
  | "abg"
  | "odc"
  | "starling-forces"
  | "frank-starling"
  | "action-potential"
  | "conduction"
  | "neuromuscular"
  | "drug-pk"
  | "drug-pd"
  | "receptor-signalling"
  | "cascade"
  | "anatomy-airway"
  | "anatomy-cardiac"
  | "anatomy-vascular"
  | "anatomy-neuro"
  | "anatomy-renal"
  | "anatomy-respiratory"
  | "monitoring"
  | "ventilation-mode"
  | "scoring-system"
  | "algorithm"
  | "other";

export interface DiagramFingerprint {
  /** Unique id of this diagram in the registry. Use kebab-case of the component name. */
  id: string;
  /** Component file (for traceability). */
  component: string;
  /** Human label shown in dedupe reports. */
  label: string;
  kind: DiagramKind;
  /** Curriculum domain(s) the diagram principally belongs to. */
  domains: Array<
    | "physics"
    | "physiology"
    | "pharmacology"
    | "clinical"
    | "icu"
    | "perioperative"
  >;
  /** Topic ids where this diagram is currently rendered. */
  topics: string[];
  /** Core phenomena depicted — the strongest dedupe signal. */
  phenomena: Phenomenon[];
  /** Axes / dimensions plotted (helps distinguish e.g. PV-loop vs flow-volume-loop). */
  axes?: { x?: string; y?: string; z?: string };
  /**
   * Free-form parameter bag describing the model. Used for fine-grained
   * comparison between diagrams of the same kind (e.g. two waveform models
   * with the same SBP/DBP/notch position are likely the same underlying
   * model and should be extended, not duplicated).
   */
  params?: Record<string, number | string | boolean>;
  /** Brief one-line description of editorial intent. */
  intent: string;
  /** If this is an overlay, the host diagram id it annotates. */
  hostDiagramId?: string;
  /** Optional free tags to widen synonym matching. */
  tags?: string[];
}

// ---------------------------------------------------------------------------
// Registry — add a fingerprint here whenever a new diagram is created.
// Keep entries terse; rely on the params bag for model-specific detail.
// ---------------------------------------------------------------------------
export const DIAGRAM_REGISTRY: DiagramFingerprint[] = [
  {
    id: "aortic-dichrotic-notch",
    component: "AorticDicroticNotchDiagram.tsx",
    label: "Animated aortic pressure waveform with dichrotic notch + IABP overlay",
    kind: "waveform",
    domains: ["physiology"],
    topics: ["cardiac-cycle"],
    phenomena: ["aortic-pressure", "dichrotic-notch", "valve-events", "iabp-timing"],
    axes: { x: "time (one cardiac cycle)", y: "aortic pressure (mmHg)" },
    params: {
      sbp: 120,
      dbp: 75,
      notchT: 0.55,
      notchP: 90,
      iabpInflateT: 0.55,
      iabpDeflateT: 0.97,
      animated: true,
      hasIabpOverlay: true,
    },
    intent:
      "Show the dichrotic notch as the systole→diastole boundary and how IABP counterpulsation times to it.",
    tags: ["incisura", "av closure", "counterpulsation", "augmentation"],
  },
  {
    id: "dichrotic-notch-comparison",
    component: "DichroticNotchComparisonPanel.tsx",
    label: "Dichrotic notch morphology across pathologies",
    kind: "comparison-panel",
    domains: ["physiology", "clinical"],
    topics: ["cardiac-cycle"],
    phenomena: ["aortic-pressure", "dichrotic-notch"],
    axes: { x: "time (one cardiac cycle)", y: "aortic pressure (mmHg)" },
    params: {
      variants: 5, // normal, AR, AS, sepsis, aging
      sharesBaseModelWith: "aortic-dichrotic-notch",
      animated: false,
    },
    intent:
      "Compare notch shape across normal, AR, AS, sepsis/warm shock, aging arteries.",
    tags: ["aortic regurgitation", "aortic stenosis", "sepsis", "aging arteries", "augmentation index"],
  },
  {
    id: "wiggers",
    component: "WiggersDiagram.tsx",
    label: "Wiggers diagram (full cardiac cycle)",
    kind: "waveform",
    domains: ["physiology"],
    topics: ["cardiac-cycle"],
    phenomena: [
      "aortic-pressure",
      "ventricular-pressure",
      "atrial-pressure",
      "ecg",
      "heart-sounds",
      "valve-events",
    ],
    axes: { x: "time (one cardiac cycle)", y: "pressure / volume / ECG" },
    intent:
      "Canonical multi-trace synchronisation of pressures, volumes, ECG, and heart sounds across one cycle.",
  },
  {
    id: "bp-control-loop",
    component: "BPControlLoopDiagram.tsx",
    label: "Animated MAP = CO × SVR control loop (sensors → CNS → effectors → MAP)",
    kind: "schematic",
    domains: ["physiology"],
    topics: ["cardiac-electrophysiology"],
    phenomena: ["cascade"],
    params: {
      perturbations: 3, // steady, hypotension, hypertension
      timeDomains: 3,   // neural, neurohormonal, renal-volume
      animated: true,
      hasFeedbackArc: true,
    },
    intent:
      "Show BP regulation as a closed feedback loop and which sensors/effectors recruit on each timescale.",
    tags: ["MAP", "baroreceptor", "RAAS", "RVLM", "pressure natriuresis", "feedback loop", "sympathetic", "parasympathetic"],
  },
];

// ---------------------------------------------------------------------------
// Similarity scoring
// ---------------------------------------------------------------------------

const KIND_AFFINITY: Record<DiagramKind, DiagramKind[]> = {
  waveform: ["waveform", "comparison-panel", "overlay", "animation"],
  loop: ["loop", "comparison-panel"],
  curve: ["curve", "comparison-panel"],
  anatomy: ["anatomy"],
  schematic: ["schematic"],
  "comparison-panel": ["comparison-panel", "waveform", "loop", "curve"],
  calculator: ["calculator"],
  timeline: ["timeline", "animation"],
  "decision-tree": ["decision-tree", "schematic"],
  table: ["table"],
  overlay: ["overlay", "waveform", "loop", "curve"],
  animation: ["animation", "waveform"],
};

const overlap = <T,>(a: T[] = [], b: T[] = []): number => {
  if (!a.length || !b.length) return 0;
  const setB = new Set(b);
  let hits = 0;
  for (const x of a) if (setB.has(x)) hits++;
  return hits / Math.max(a.length, b.length);
};

const paramSimilarity = (
  a: DiagramFingerprint["params"] = {},
  b: DiagramFingerprint["params"] = {}
): number => {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  if (!keys.size) return 0;
  let matched = 0;
  let compared = 0;
  for (const k of keys) {
    if (!(k in a) || !(k in b)) continue;
    compared++;
    const av = a[k];
    const bv = b[k];
    if (typeof av === "number" && typeof bv === "number") {
      const denom = Math.max(Math.abs(av), Math.abs(bv), 1);
      if (Math.abs(av - bv) / denom < 0.15) matched++;
    } else if (av === bv) {
      matched++;
    }
  }
  return compared ? matched / compared : 0;
};

export interface SimilarityResult {
  candidate: DiagramFingerprint;
  score: number; // 0..1
  reasons: string[];
  /** Suggested editorial action. */
  recommendation: "duplicate" | "extend" | "cross-reference" | "novel";
}

/**
 * Compare a candidate fingerprint against the registry. Returns matches above
 * the noise floor, sorted by descending similarity score.
 */
export const findSimilarDiagrams = (
  candidate: DiagramFingerprint,
  registry: DiagramFingerprint[] = DIAGRAM_REGISTRY
): SimilarityResult[] => {
  const results: SimilarityResult[] = [];

  for (const existing of registry) {
    if (existing.id === candidate.id) continue;

    const reasons: string[] = [];
    let score = 0;

    // Kind affinity (0..0.15)
    const kindAffine = KIND_AFFINITY[candidate.kind]?.includes(existing.kind);
    if (kindAffine) {
      score += 0.15;
      if (existing.kind === candidate.kind) reasons.push(`same kind (${existing.kind})`);
      else reasons.push(`related kind (${candidate.kind} ↔ ${existing.kind})`);
    }

    // Domain overlap (0..0.10)
    const domOv = overlap(candidate.domains, existing.domains);
    score += 0.1 * domOv;
    if (domOv > 0) reasons.push(`shares domain (${domOv.toFixed(2)})`);

    // Phenomena overlap — the strongest signal (0..0.45)
    const phenOv = overlap(candidate.phenomena, existing.phenomena);
    score += 0.45 * phenOv;
    if (phenOv >= 0.5) {
      const shared = candidate.phenomena.filter((p) => existing.phenomena.includes(p));
      reasons.push(`overlapping phenomena: ${shared.join(", ")}`);
    }

    // Axes match (0..0.10)
    if (candidate.axes && existing.axes) {
      const xMatch = candidate.axes.x && candidate.axes.x === existing.axes.x;
      const yMatch = candidate.axes.y && candidate.axes.y === existing.axes.y;
      if (xMatch && yMatch) {
        score += 0.1;
        reasons.push("identical axes");
      } else if (xMatch || yMatch) {
        score += 0.05;
        reasons.push("partial axis match");
      }
    }

    // Param similarity (0..0.15)
    const paramSim = paramSimilarity(candidate.params, existing.params);
    score += 0.15 * paramSim;
    if (paramSim >= 0.6) reasons.push(`parameter model overlap (${paramSim.toFixed(2)})`);

    // Explicit "shares base model" backref (0..0.10)
    const sbA = candidate.params?.sharesBaseModelWith;
    const sbB = existing.params?.sharesBaseModelWith;
    if (sbA === existing.id || sbB === candidate.id || (sbA && sbA === sbB)) {
      score += 0.1;
      reasons.push("declared shared base model");
    }

    // Tag/synonym overlap (0..0.05)
    const tagOv = overlap(candidate.tags ?? [], existing.tags ?? []);
    score += 0.05 * tagOv;
    if (tagOv > 0) reasons.push(`tag overlap (${tagOv.toFixed(2)})`);

    // Same topic bonus (0..0.05)
    if (overlap(candidate.topics, existing.topics) > 0) {
      score += 0.05;
      reasons.push("already lives in same topic");
    }

    // Overlay-of relationship
    if (candidate.hostDiagramId && candidate.hostDiagramId === existing.id) {
      score = Math.max(score, 0.85);
      reasons.unshift("declared overlay of this diagram");
    }

    if (score < 0.25) continue;

    let recommendation: SimilarityResult["recommendation"];
    if (score >= 0.8) recommendation = "duplicate";
    else if (score >= 0.55) recommendation = "extend";
    else if (score >= 0.35) recommendation = "cross-reference";
    else recommendation = "novel";

    results.push({ candidate: existing, score, reasons, recommendation });
  }

  return results.sort((a, b) => b.score - a.score);
};

/**
 * Convenience helper: returns a one-line human verdict for the placement-flow
 * report (Step 5 of the topic-section-placement preference).
 */
export const verdictLine = (results: SimilarityResult[]): string => {
  if (!results.length) return "Diagram dedupe: no similar diagram in registry.";
  const top = results[0];
  const action =
    top.recommendation === "duplicate"
      ? "DO NOT add — duplicate of"
      : top.recommendation === "extend"
        ? "EXTEND existing"
        : top.recommendation === "cross-reference"
          ? "Add as new + cross-reference"
          : "Novel relative to";
  return `Diagram dedupe: ${action} "${top.candidate.label}" (score ${top.score.toFixed(2)}; ${top.reasons.slice(0, 2).join("; ")}).`;
};
