/**
 * Ground-truth anatomy reference map.
 *
 * Used by scripts/verify-anatomy-labels.mjs to cross-check labels in our
 * SVG diagram source files against canonical anatomical facts.
 *
 * Sources (consulted, not embedded): Standring, Gray's Anatomy 42e;
 * Hadzic Textbook of Regional Anesthesia 2e; Netter Atlas 7e.
 *
 * Notation rules:
 *   • roots: canonical set of contributing spinal levels (uppercase, no spaces)
 *   • acceptedRoots: alternative valid notations our text may use
 *   • side: "midline" | "right" | "left" — the patient side the structure sits on
 *   • course: optional vector hint for vessel/nerve direction (descending,
 *     ascending, lateral→medial etc.) used only when the label includes a
 *     directional keyword.
 */

/** Helper — expand a "L2-L4" range into ["L2","L3","L4"] */
const range = (a, b) => {
  const region = a[0];
  const start = parseInt(a.slice(1), 10);
  const end = parseInt(b.slice(1), 10);
  const out = [];
  for (let i = start; i <= end; i++) out.push(`${region}${i}`);
  return out;
};

/** L4-S2 type ranges crossing regions */
const lsRange = (rangeStr) => {
  // e.g. "L4-S2"
  const [a, b] = rangeStr.split("-");
  if (a[0] === b[0]) return range(a, b);
  // crosses lumbar→sacral
  const lumbarMax = 5;
  const sacralMax = 5;
  const aN = parseInt(a.slice(1), 10);
  const bN = parseInt(b.slice(1), 10);
  const out = [];
  if (a[0] === "L") {
    for (let i = aN; i <= lumbarMax; i++) out.push(`L${i}`);
    for (let i = 1; i <= bN; i++) out.push(`S${i}`);
  } else {
    // S→? unusual
    for (let i = aN; i <= sacralMax; i++) out.push(`S${i}`);
  }
  return out;
};

/**
 * NERVES — canonical root values keyed by lowercase nerve name fragments.
 * Match by checking if the diagram label text contains the key (case-insensitive).
 * Most-specific keys first (e.g. "deep fibular" before "fibular").
 */
export const NERVES = [
  // Cervical plexus
  { match: /\bgreater auricular\b/i, name: "Greater auricular", roots: ["C2", "C3"] },
  { match: /\blesser occipital\b/i, name: "Lesser occipital", roots: ["C2"] },
  { match: /\btransverse cervical\b/i, name: "Transverse cervical", roots: ["C2", "C3"] },
  { match: /\bsupraclavicular\b/i, name: "Supraclavicular", roots: ["C3", "C4"] },
  { match: /\bansa cervicalis\b/i, name: "Ansa cervicalis", roots: ["C1", "C2", "C3"] },
  { match: /\bphrenic\b/i, name: "Phrenic", roots: ["C3", "C4", "C5"] },

  // Brachial plexus terminal branches
  { match: /\bmusculocutaneous\b/i, name: "Musculocutaneous", roots: ["C5", "C6", "C7"] },
  { match: /\baxillary\b/i, name: "Axillary", roots: ["C5", "C6"] },
  { match: /\bmedian nerve\b/i, name: "Median", roots: ["C5", "C6", "C7", "C8", "T1"] },
  { match: /\bulnar nerve\b/i, name: "Ulnar", roots: ["C8", "T1"] },
  { match: /\bradial nerve\b/i, name: "Radial", roots: ["C5", "C6", "C7", "C8", "T1"] },

  // Lumbar plexus
  { match: /\blumbar plexus\b/i, name: "Lumbar plexus", roots: range("L1", "L4"), permitT12: true },
  { match: /\bilio.?hypogastric\b/i, name: "Iliohypogastric", roots: ["L1"] },
  { match: /\bilio.?inguinal\b/i, name: "Ilioinguinal", roots: ["L1"] },
  { match: /\bgenitofemoral\b/i, name: "Genitofemoral", roots: ["L1", "L2"] },
  { match: /\blateral femoral cutaneous\b/i, name: "Lateral femoral cutaneous", roots: ["L2", "L3"] },
  { match: /\bobturator\b/i, name: "Obturator", roots: ["L2", "L3", "L4"] },
  { match: /\bfemoral nerve\b/i, name: "Femoral", roots: ["L2", "L3", "L4"] },
  { match: /\bsaphenous\b/i, name: "Saphenous", roots: ["L3", "L4"] },

  // Sacral plexus
  { match: /\bsacral plexus\b/i, name: "Sacral plexus", roots: lsRange("L4-S4") },
  { match: /\bsuperior gluteal\b/i, name: "Superior gluteal", roots: ["L4", "L5", "S1"] },
  { match: /\binferior gluteal\b/i, name: "Inferior gluteal", roots: ["L5", "S1", "S2"] },
  { match: /\bsciatic\b/i, name: "Sciatic", roots: lsRange("L4-S3") },
  { match: /\bposterior femoral cutaneous\b/i, name: "Posterior femoral cutaneous", roots: ["S1", "S2", "S3"] },
  { match: /\bpudendal\b/i, name: "Pudendal", roots: ["S2", "S3", "S4"] },
  { match: /\bdeep fibular\b/i, name: "Deep fibular", roots: ["L4", "L5", "S1"] },
  { match: /\bsuperficial fibular\b/i, name: "Superficial fibular", roots: ["L5", "S1"] },
  { match: /\bcommon (fibular|peroneal)\b/i, name: "Common fibular", roots: ["L4", "L5", "S1", "S2"] },
  { match: /\btibial nerve\b/i, name: "Tibial", roots: lsRange("L4-S3") },
  { match: /\bsural\b/i, name: "Sural", roots: ["S1", "S2"] },
  { match: /\bmedial plantar\b/i, name: "Medial plantar", roots: lsRange("L4-S3") },
  { match: /\blateral plantar\b/i, name: "Lateral plantar", roots: ["S1", "S2"] },
];

/**
 * VESSELS — canonical side and (optional) course direction for major vessels.
 * `side` is the patient side; the verifier maps to viewer side via the
 * standard anatomical convention (patient RIGHT = viewer LEFT for AP views).
 * `course` is the dominant axis of travel: "vertical-down" (ascends to top),
 * "vertical-up", "lateral-out", "medial-in", "arch" (curves L→R or R→L overhead).
 */
export const VESSELS = [
  { match: /\bascending aorta\b/i, name: "Ascending aorta", side: "midline", course: "vertical-up" },
  { match: /\bdescending (thoracic )?aorta\b/i, name: "Descending aorta", side: "left", course: "vertical-down" },
  { match: /\baortic arch\b/i, name: "Aortic arch", side: "midline", course: "arch" },
  { match: /\b(superior vena cava|svc)\b/i, name: "SVC", side: "right", course: "vertical-down" },
  { match: /\b(inferior vena cava|ivc)\b/i, name: "IVC", side: "right", course: "vertical-up" },
  { match: /\b(right coronary|rca)\b/i, name: "RCA", side: "right" },
  { match: /\b(left anterior descending|lad)\b/i, name: "LAD", side: "left", course: "vertical-down" },
  { match: /\b(circumflex|lcx)\b/i, name: "LCx", side: "left" },
  { match: /\b(left main|lmca|lms)\b/i, name: "Left main", side: "left" },
  { match: /\bbrachiocephalic (artery|trunk)\b/i, name: "Brachiocephalic artery", side: "right" },
  { match: /\bleft common carotid\b/i, name: "Left common carotid", side: "left" },
  { match: /\bleft subclavian\b/i, name: "Left subclavian", side: "left" },
  { match: /\bright bronchus\b|right main bronchus/i, name: "Right main bronchus", side: "right" },
  { match: /\bleft bronchus\b|left main bronchus/i, name: "Left main bronchus", side: "left" },
];

/** Normalise a roots string ("L2–L4", "L2,L3,L4", "L2-L4", "L2, L3, L4")
 *  into a sorted array of canonical levels. Returns null if unparseable. */
export function parseRoots(raw) {
  if (!raw || typeof raw !== "string") return null;
  // unify dashes & strip parentheses
  const cleaned = raw.replace(/[–—−]/g, "-").replace(/\(.*?\)/g, "").trim();
  // explicit list "L2, L3, L4" or "L2 L3 L4"
  if (/[, ]/.test(cleaned) && !/^[CTLS]\d+-[CTLS]?\d+$/.test(cleaned)) {
    const tokens = cleaned.split(/[,\s]+/).filter(Boolean);
    if (tokens.every((t) => /^[CTLS]\d{1,2}$/i.test(t))) {
      return Array.from(new Set(tokens.map((t) => t.toUpperCase()))).sort(rootSort);
    }
  }
  // range "L2-L4" or "L4-S2" or "C5-T1"
  const m = cleaned.match(/^([CTLS]\d{1,2})-([CTLS]?\d{1,2})$/i);
  if (m) {
    const a = m[1].toUpperCase();
    let b = m[2].toUpperCase();
    if (!/^[CTLS]/.test(b)) b = a[0] + b; // "L2-4" → "L2-L4"
    return lsRange(`${a}-${b}`).sort(rootSort);
  }
  // single level
  if (/^[CTLS]\d{1,2}$/i.test(cleaned)) return [cleaned.toUpperCase()];
  return null;
}

function rootSort(a, b) {
  const order = { C: 0, T: 1, L: 2, S: 3 };
  if (a[0] !== b[0]) return order[a[0]] - order[b[0]];
  return parseInt(a.slice(1), 10) - parseInt(b.slice(1), 10);
}

/** Compare two root lists; return {match, missing, extra} */
export function diffRoots(canonical, actual) {
  const c = new Set(canonical);
  const a = new Set(actual);
  const missing = canonical.filter((r) => !a.has(r));
  const extra = actual.filter((r) => !c.has(r));
  return { match: missing.length === 0 && extra.length === 0, missing, extra };
}
