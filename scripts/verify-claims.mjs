#!/usr/bin/env node
/**
 * LLM-assisted claim-vs-excerpt verifier.
 *
 * Walks every `src/pages/topics/*.tsx`, extracts each
 *   { text: "<claim>", cites: ["<refLabel>"] }
 * triple from keyPoints / workedExamples arrays, looks up the corresponding
 * Reference in `src/data/references.ts`, and — when the reference has a
 * verbatim `excerpt` — asks an LLM:
 *
 *   "Does this verbatim source excerpt support the stated claim?"
 *
 * Answers are constrained to SUPPORTS / CONTRADICTS / INSUFFICIENT plus a
 * one-sentence rationale and a supporting quote from the excerpt. Anything
 * that is not SUPPORTS is written to scripts/claim-verification-report.json
 * for human review.
 *
 * This is the highest-leverage accuracy check we have: it actively reads the
 * source text the author intended to cite and tells us whether the prose
 * around it is faithful. It scales the careful manual review of 120+ topics
 * to a nightly job.
 *
 * The LLM is NEVER the source of truth. Its only role is to flag triples
 * that a human should re-check. False positives are expected and acceptable;
 * silent inaccuracies are not.
 *
 * Usage:
 *   node scripts/verify-claims.mjs --extract-only
 *       Dump every verifiable triple to stdout as NDJSON. No API calls.
 *
 *   node scripts/verify-claims.mjs                       # verify all
 *   node scripts/verify-claims.mjs --topic propofol      # one topic
 *   node scripts/verify-claims.mjs --limit 20            # cap for cost
 *   node scripts/verify-claims.mjs --model google/gemini-2.5-flash
 *
 * Requires LOVABLE_API_KEY in the environment (already present inside
 * Lovable edge functions and CI). The script exits 0 even when issues are
 * found — it is a *reporter*, not a gate.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const ROOT = process.cwd();
const TOPICS_DIR = resolve(ROOT, "src/pages/topics");
const REFERENCES_PATH = resolve(ROOT, "src/data/references.ts");
const REPORT_PATH = resolve(ROOT, "scripts/claim-verification-report.json");

const args = process.argv.slice(2);
const EXTRACT_ONLY = args.includes("--extract-only");
const TOPIC_FILTER = argValue("--topic");
const LIMIT = Number(argValue("--limit") ?? "0") || 0;
const MODEL = argValue("--model") ?? "google/gemini-2.5-flash";
const ENDPOINT =
  process.env.LOVABLE_AI_GATEWAY ?? "https://ai.gateway.lovable.dev/v1/chat/completions";

function argValue(flag) {
  const i = args.indexOf(flag);
  return i >= 0 && i + 1 < args.length ? args[i + 1] : undefined;
}

// ---------------------------------------------------------------------------
// 1. Load references.ts (label → { citation, url, excerpt }) per topicId.
//    Done with a tolerant regex parse — references.ts is hand-written data
//    where each entry sits on a single line, so this is robust enough.
// ---------------------------------------------------------------------------
function loadReferences() {
  const src = readFileSync(REFERENCES_PATH, "utf8");
  const out = new Map(); // topicId -> Map<label, {citation, url, excerpt}>
  const topicRe = /\"([a-z0-9-]+)\"\s*:\s*\[([\s\S]*?)\],?\s*(?=("([a-z0-9-]+)"\s*:\s*\[|\};))/g;
  let m;
  while ((m = topicRe.exec(src)) !== null) {
    const topicId = m[1];
    const block = m[2];
    const byLabel = new Map();
    const entryRe = /\{\s*label\s*:\s*\"([^\"]+)\"[\s\S]*?\}/g;
    let e;
    while ((e = entryRe.exec(block)) !== null) {
      const entry = e[0];
      const label = e[1];
      const citation = (entry.match(/citation\s*:\s*\"((?:[^\"\\]|\\.)*)\"/) ?? [])[1];
      const url = (entry.match(/url\s*:\s*\"((?:[^\"\\]|\\.)*)\"/) ?? [])[1];
      const excerpt = (entry.match(/excerpt\s*:\s*\"((?:[^\"\\]|\\.)*)\"/) ?? [])[1];
      byLabel.set(label, {
        citation: unescape(citation),
        url,
        excerpt: excerpt ? unescape(excerpt) : undefined,
      });
    }
    out.set(topicId, byLabel);
  }
  return out;
}
function unescape(s) {
  return s == null ? s : s.replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\\\/g, "\\");
}

// ---------------------------------------------------------------------------
// 2. Walk topic files; extract { text: "...", cites: [...] } triples.
//    Matches both single- and double-quoted strings; ignores objects that
//    don't carry a `cites` array (so we only verify the claims authors
//    explicitly asked to be cited).
// ---------------------------------------------------------------------------
function extractTriples(file, references) {
  const src = readFileSync(file, "utf8");
  const triples = [];

  // The topicId per file is encoded as the topic page's path / page key —
  // simplest reliable signal: look for the FIRST `topicId="..."` in the file
  // (used by InlineRef / TopicCompletionToggle) and fall back to the file
  // basename converted to kebab-case.
  const topicIdMatch = src.match(/topicId\s*=\s*["']([a-z0-9-]+)["']/);
  const fallback = relative(TOPICS_DIR, file)
    .replace(/Topic\.tsx$/, "")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();
  const topicId = topicIdMatch?.[1] ?? fallback;
  const refs = references.get(topicId);

  // Match `{ text: "...", ... cites: [...] }` — allow other fields between.
  const objRe =
    /\{\s*text\s*:\s*(["'`])((?:\\.|(?!\1)[\s\S])*?)\1[\s\S]{0,400}?cites\s*:\s*\[([^\]]+)\]/g;
  let m;
  while ((m = objRe.exec(src)) !== null) {
    const text = m[2].replace(/\\"/g, '"').replace(/\\n/g, " ").trim();
    const citesRaw = m[3];
    const labels = [...citesRaw.matchAll(/["'`]([^"'`]+)["'`]/g)].map((x) => x[1]);
    const line = src.slice(0, m.index).split("\n").length;
    for (const label of labels) {
      const ref = refs?.get(label);
      if (!ref?.excerpt) continue; // only verify claims with a verbatim excerpt
      triples.push({
        file: relative(ROOT, file),
        line,
        topicId,
        claim: text,
        refLabel: label,
        excerpt: ref.excerpt,
        citation: ref.citation,
        url: ref.url,
      });
    }
  }
  return triples;
}

// ---------------------------------------------------------------------------
// 3. Verifier prompt — strict structured output.
// ---------------------------------------------------------------------------
const SYSTEM = `You are a meticulous medical-evidence reviewer for an FRCA/FFICM revision app.

You will receive ONE clinical claim and ONE verbatim excerpt from a cited source. Your only job is to decide whether the excerpt — read literally, on its own — supports the claim.

Rules:
- Answer "SUPPORTS" only if every numeric value, threshold, drug, dose, unit, mechanism, and qualifier in the claim is explicitly backed by the excerpt.
- Answer "CONTRADICTS" if the excerpt clearly states a different number, dose, threshold, or mechanism.
- Answer "INSUFFICIENT" if the excerpt is on the right topic but does not mention the specific numbers/details in the claim (this is the default when in doubt — the claim might be true but this excerpt does not prove it).
- Be conservative. Better to flag a true claim as INSUFFICIENT than to wave through an unsupported number.

Respond with ONE JSON object only, no prose around it:
{"verdict":"SUPPORTS"|"CONTRADICTS"|"INSUFFICIENT","rationale":"<one sentence>","quote":"<verbatim sentence from the excerpt, or empty string>"}`;

async function verifyOne(triple) {
  const userMsg = `CLAIM:\n${triple.claim}\n\nSOURCE EXCERPT (from "${triple.refLabel}"):\n${triple.excerpt}`;
  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: userMsg },
    ],
    response_format: { type: "json_object" },
    temperature: 0,
  };

  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY not set. Add it as a secret to run the verifier.");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`AI gateway ${res.status}: ${txt.slice(0, 200)}`);
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? "{}";
  try {
    return JSON.parse(content);
  } catch {
    return { verdict: "INSUFFICIENT", rationale: "Model returned non-JSON", quote: "" };
  }
}

// ---------------------------------------------------------------------------
// 4. Main.
// ---------------------------------------------------------------------------
const references = loadReferences();
const files = readdirSync(TOPICS_DIR)
  .filter((f) => f.endsWith(".tsx"))
  .map((f) => join(TOPICS_DIR, f))
  .sort();

let triples = [];
for (const f of files) triples.push(...extractTriples(f, references));
if (TOPIC_FILTER) triples = triples.filter((t) => t.topicId === TOPIC_FILTER);
if (LIMIT > 0) triples = triples.slice(0, LIMIT);

if (EXTRACT_ONLY) {
  for (const t of triples) process.stdout.write(JSON.stringify(t) + "\n");
  console.error(`# ${triples.length} verifiable triples across ${files.length} topics.`);
  process.exit(0);
}

console.error(
  `Verifying ${triples.length} claim/excerpt pairs against ${MODEL} via Lovable AI Gateway…`,
);

const findings = [];
let n = 0;
for (const triple of triples) {
  n++;
  try {
    const verdict = await verifyOne(triple);
    if (verdict.verdict !== "SUPPORTS") {
      findings.push({ ...triple, ...verdict });
      console.error(
        `  [${n}/${triples.length}] ${verdict.verdict}  ${triple.topicId}  L${triple.line}  ${triple.refLabel}`,
      );
    } else if (n % 10 === 0) {
      console.error(`  [${n}/${triples.length}] OK so far (${findings.length} flagged)`);
    }
  } catch (e) {
    findings.push({
      ...triple,
      verdict: "ERROR",
      rationale: e.message,
      quote: "",
    });
    console.error(`  [${n}/${triples.length}] ERROR  ${triple.topicId}: ${e.message}`);
  }
  // Gentle pacing — keeps us comfortably under any per-minute limits.
  await new Promise((r) => setTimeout(r, 120));
}

const report = {
  generatedAt: new Date().toISOString(),
  model: MODEL,
  totalTriples: triples.length,
  flagged: findings.length,
  findings,
};
writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2) + "\n");
console.error(
  `\n✓ Wrote ${relative(ROOT, REPORT_PATH)} — ` +
    `${findings.length} flagged of ${triples.length} verified.`,
);
process.exit(0);
