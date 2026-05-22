#!/usr/bin/env node
/**
 * Verify that every topic_audit_findings row marked `status='fixed'` has a
 * matching citation in the corresponding topic source file.
 *
 * For each fixed finding:
 *   1. Resolve topic_id → src/pages/topics/<Component>.tsx via App.tsx routes.
 *   2. Resolve each finding.sources[].url → a Reference in src/data/references.ts
 *      under that topic_id (matched by url).
 *   3. Check the topic file actually cites that Reference label via
 *      InlineRef / <Cite> / sectionSources / cites=[...].
 *
 * Findings that legitimately have no citation must carry an
 * `unverifiable_reason` (e.g. transient scrape failure). Those are reported
 * as warnings, not failures.
 *
 * Usage:
 *   node scripts/verify-audit-fixes.mjs              # check all fixed findings
 *   node scripts/verify-audit-fixes.mjs <id> <id>... # check specific ids
 *
 * Exits non-zero on failure.
 *
 * Requires PGHOST/PG* env (managed Supabase DB access) OR SUPABASE_DB_URL.
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const targetIds = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const where =
  targetIds.length > 0
    ? `WHERE id IN (${targetIds.map((id) => `'${id.replace(/'/g, "''")}'`).join(",")})`
    : `WHERE status = 'fixed'`;

function psql(sql) {
  const out = execSync(`psql -At -F $'\\t' -v ON_ERROR_STOP=1`, {
    encoding: "utf8",
    input: sql,
  });
  return out
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("\t"));
}

// 1. Parse App.tsx to build { topicId -> componentFile }
const appSrc = readFileSync(resolve(ROOT, "src/App.tsx"), "utf8");
const lazyImports = new Map(); // ComponentName -> file path
for (const m of appSrc.matchAll(
  /const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*"\.\/(pages\/topics\/[^"]+)"/g,
)) {
  lazyImports.set(m[1], `src/${m[2]}.tsx`);
}
const topicFiles = new Map(); // topicId -> file path
for (const m of appSrc.matchAll(
  /<Route\s+path="\/[^"]*\/([a-z0-9-]+)"\s+element=\{<(\w+)\s*\/>\}/g,
)) {
  const [, topicId, comp] = m;
  const file = lazyImports.get(comp);
  if (file) topicFiles.set(topicId, file);
}

// 2. Load references.ts and parse per-topic { label -> url } maps
const refsSrc = readFileSync(resolve(ROOT, "src/data/references.ts"), "utf8");
// Very simple parse: split on top-level `"topic-id": [` blocks.
const refsByTopic = new Map();
const topicBlockRe = /"([a-z0-9-]+)"\s*:\s*\[/g;
let prev = null;
const positions = [];
for (const m of refsSrc.matchAll(topicBlockRe)) {
  positions.push({ topic: m[1], start: m.index + m[0].length });
}
for (let i = 0; i < positions.length; i++) {
  const { topic, start } = positions[i];
  const end = i + 1 < positions.length ? positions[i + 1].start : refsSrc.length;
  const block = refsSrc.slice(start, end);
  const labelToUrl = new Map();
  for (const r of block.matchAll(
    /\{\s*label:\s*"([^"]+)"[\s\S]*?\}/g,
  )) {
    const obj = r[0];
    const urlMatch = obj.match(/url:\s*"([^"]+)"/);
    labelToUrl.set(r[1], urlMatch ? urlMatch[1] : null);
  }
  refsByTopic.set(topic, labelToUrl);
}

// 3. Pull fixed findings from DB
const rows = psql(
  `SELECT id, topic_id, section, summary, COALESCE(unverifiable_reason,''),
          COALESCE((SELECT string_agg(url, '|') FROM jsonb_array_elements(sources) s
                    CROSS JOIN LATERAL (SELECT s->>'url' AS url) u WHERE url IS NOT NULL), '')
   FROM public.topic_audit_findings
   ${where}
   ORDER BY topic_id`,
);

const failures = [];
const warnings = [];
let checked = 0;

for (const [id, topicId, section, summary, unverifiable, urlsJoined] of rows) {
  checked++;
  // If unverifiable_reason is set, treat as warning regardless of sources.
  if (unverifiable) {
    warnings.push(
      `~ ${id} [${topicId}/${section}] unverifiable_reason="${unverifiable.slice(0, 80)}"`,
    );
    continue;
  }
  const urls = urlsJoined ? urlsJoined.split("|").filter(Boolean) : [];
  if (urls.length === 0) {
    if (unverifiable) {
      warnings.push(
        `~ ${id} [${topicId}/${section}] no sources, unverifiable_reason="${unverifiable.slice(0, 80)}"`,
      );
    } else {
      failures.push(
        `✗ ${id} [${topicId}/${section}] marked fixed with zero sources and no unverifiable_reason — "${summary.slice(0, 80)}"`,
      );
    }
    continue;
  }
  const file = topicFiles.get(topicId);
  if (!file) {
    failures.push(`✗ ${id} [${topicId}] no topic file mapped from App.tsx routes`);
    continue;
  }
  const refMap = refsByTopic.get(topicId);
  if (!refMap) {
    failures.push(`✗ ${id} [${topicId}] no entry in src/data/references.ts`);
    continue;
  }
  // Find at least one source URL that has a matching Reference whose label is
  // cited in the topic file.
  let fileSrc;
  try {
    fileSrc = readFileSync(resolve(ROOT, file), "utf8");
  } catch (e) {
    failures.push(`✗ ${id} [${topicId}] cannot read ${file}: ${e.message}`);
    continue;
  }
  const matchedLabels = [];
  const missingUrls = [];
  for (const url of urls) {
    let label = null;
    for (const [lbl, refUrl] of refMap) {
      if (refUrl && refUrl === url) {
        label = lbl;
        break;
      }
    }
    if (!label) {
      missingUrls.push(url);
      continue;
    }
    // Look for `"<label>"` appearing in topic file (covers InlineRef, Cite,
    // sectionSources, cites=[...]).
    if (fileSrc.includes(`"${label}"`)) {
      matchedLabels.push(label);
    } else {
      missingUrls.push(`${url} (reference "${label}" not cited in ${file})`);
    }
  }
  if (matchedLabels.length === 0) {
    failures.push(
      `✗ ${id} [${topicId}/${section}] no source URL has a matching cited reference. Sources: ${missingUrls.join("; ")}`,
    );
  }
}

console.log(`Checked ${checked} fixed finding(s)`);
if (warnings.length) {
  console.log(`\nWarnings (${warnings.length}):`);
  for (const w of warnings) console.log("  " + w);
}
if (failures.length) {
  console.log(`\nFailures (${failures.length}):`);
  for (const f of failures) console.log("  " + f);
  console.log(
    `\nFix: either add the missing InlineRef/sectionSources citation in the topic file (and the corresponding entry in src/data/references.ts), or set unverifiable_reason on the finding to document why it cannot be cited.`,
  );
  process.exit(1);
}
console.log("\nOK — every fixed finding has a matching cited reference.");
