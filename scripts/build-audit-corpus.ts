/**
 * Build the content-audit corpus straight from the app's own source files.
 *
 * This replaces scraping the published topic pages. Scraped pages returned only
 * whatever the crawler happened to render — collapsed sections, tabbed panels and
 * SVG diagram labels were routinely missing, so the auditor judged content it
 * could not fully see. Reading the source gives the complete text of every topic
 * including diagram labels, plus the citation list, with no rendering involved.
 *
 * Output: `supabase/functions/audit-topics/audit-corpus.json`, deployed alongside
 * the audit function as a plain data import.
 *
 * Run: `bun run scripts/build-audit-corpus.ts`
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { allTopics, sectionMeta } from "../src/data/curriculum";
import { topicReferences } from "../src/data/references";
import { caseBanks } from "../src/data/cases";
import { perioperativeCaseIndex } from "../src/data/perioperativeCaseIndex";
import { perioperativeCases } from "../src/pages/PerioperativeCaseBank";
import type { PerioperativeCase } from "../src/components/perioperative/ProgressiveCase";

const ROOT = resolve(import.meta.dirname ?? __dirname, "..");
const OUT = resolve(ROOT, "supabase/functions/audit-topics/audit-corpus.json");
const PODCAST_OUT = resolve(
  ROOT,
  "supabase/functions/process-podcast-rerecord/topic-corpus.json",
);

/** Max component files pulled in per topic (diagrams, shared blocks). */
const MAX_IMPORT_DEPTH = 2;
const MAX_IMPORTED_FILES = 40;
const MAX_TEXT_CHARS = 24_000;
/** Reserved share of the text budget for diagram/animation labels. */
const MAX_LABEL_CHARS = 4_000;

export interface AuditCorpusEntry {
  topic_id: string;
  topic_title: string;
  description: string;
  section: string;
  section_label: string;
  exam_tags: string[];
  route: string;
  url: string;
  /** Source files stitched into `text` (repo-relative). */
  source_files: string[];
  /** Plain-text content: headings, prose, list items, table cells, diagram labels. */
  text: string;
  /** Verbatim <text>/label strings found inside diagram components. */
  diagram_labels: string[];
  /** Citations declared for this topic in src/data/references.ts. */
  references: Array<{ label: string; citation: string; url?: string; pmid?: string; excerpt?: string }>;
  text_chars: number;
  /**
   * Case-bank cases mapped to this topic, with their staged model answers and
   * detailed discussion in full — audited alongside the topic prose so the
   * clinical reasoning in cases is held to the same accuracy standard.
   */
  case_ids: string[];
  case_bank_chars: number;
}

// ------------------------------------------------------------------ case banks

/** Flatten one case into plain text: stem, staged model answers, discussion. */
function caseToText(c: PerioperativeCase): string {
  return [
    `Case: ${c.title} (${c.category}, ${c.difficulty})`,
    `Patient: ${c.patient}`,
    `Presentation: ${c.presentation}`,
    ...c.stages.flatMap((s, i) => [
      `Stage ${i + 1} — ${s.title}`,
      `  Question: ${s.prompt}`,
      ...s.answer.map((a) => `  Model answer: ${a}`),
    ]),
    ...c.detailedAnswer.map((d) => `Discussion — ${d.title}: ${d.content}`),
    `Take-home: ${c.takeHome}`,
    c.sourceLinks.length > 0
      ? `Cited sources: ${c.sourceLinks.map((s) => `${s.label} (${s.href})`).join("; ")}`
      : "Cited sources: (none)",
  ].join("\n");
}

interface CaseBankTextEntry {
  case_id: string;
  title: string;
  bank: string;
  path: string;
  text: string;
}

/** topicId → every case (any bank) whose topicIds include it. */
function buildCaseIndex(): Map<string, CaseBankTextEntry[]> {
  const index = new Map<string, CaseBankTextEntry[]>();
  const add = (topicIds: string[], entry: CaseBankTextEntry) => {
    for (const topicId of topicIds) {
      const list = index.get(topicId) ?? [];
      list.push(entry);
      index.set(topicId, list);
    }
  };

  for (const bank of caseBanks) {
    for (const c of bank.cases) {
      add(c.topicIds, {
        case_id: c.id,
        title: c.title,
        bank: bank.title,
        path: `${bank.path}#${c.id}`,
        text: caseToText(c),
      });
    }
  }

  // The perioperative bank keeps its case text in the page and its topic
  // mapping in src/data/perioperativeCaseIndex.ts.
  const perioperativeById = new Map(perioperativeCases.map((c) => [c.id, c]));
  for (const item of perioperativeCaseIndex) {
    const c = perioperativeById.get(item.id);
    if (!c) continue;
    add(item.topicIds, {
      case_id: c.id,
      title: c.title,
      bank: "Perioperative Case Bank",
      path: `/perioperative/case-bank#${c.id}`,
      text: caseToText(c),
    });
  }

  return index;
}

const CASE_INDEX = buildCaseIndex();

/**
 * Every case, stored once and referenced by id from each topic entry. A case can
 * belong to four topics, so inlining its text per topic bloated the corpus JSON
 * past the edge-function deploy limit.
 */
export function buildCaseDictionary(): Record<string, CaseBankTextEntry> {
  const dict: Record<string, CaseBankTextEntry> = {};
  for (const list of CASE_INDEX.values()) {
    for (const entry of list) dict[entry.case_id] = entry;
  }
  return dict;
}

// ---------------------------------------------------------------- source reading

function readIfExists(path: string): string | null {
  try {
    return existsSync(path) ? readFileSync(path, "utf8") : null;
  } catch {
    return null;
  }
}

/** Resolve an import specifier used in app source to a real file on disk. */
function resolveImport(spec: string, fromFile: string): string | null {
  let base: string;
  if (spec.startsWith("@/")) base = resolve(ROOT, "src", spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null; // node_modules — not our content

  for (const cand of [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    resolve(base, "index.tsx"),
    resolve(base, "index.ts"),
  ]) {
    if (existsSync(cand) && !cand.endsWith("/")) {
      try {
        if (readFileSync(cand, "utf8")) return cand;
      } catch {
        /* directory */
      }
    }
  }
  return null;
}

/** Local imports worth following: our own components/data, not UI primitives. */
function localImportsOf(src: string, fromFile: string): string[] {
  const out: string[] = [];
  const re = /^\s*import\s+(?:[\s\S]*?)\s+from\s+["']([^"']+)["'];?/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const spec = m[1];
    if (!spec.startsWith("@/") && !spec.startsWith(".")) continue;
    // Follow only content-bearing modules: the topic's own diagram/figure
    // components and any co-located files. Whole-app data modules (quizzes,
    // curriculum, references, SEO) and generic chrome would otherwise drown the
    // topic's own text in content belonging to every other topic.
    const isDiagram = /@\/components\/diagrams\//.test(spec);
    const isRelative = spec.startsWith(".");
    if (!isDiagram && !isRelative) continue;
    if (/@\/components\/ui\//.test(spec)) continue;
    const file = resolveImport(spec, fromFile);
    if (file) out.push(file);
  }
  return out;
}

// ------------------------------------------------------------- text extraction

const CONTENT_PROPS =
  /\b(?:title|label|heading|subtitle|description|text|caption|name|question|answer|summary|term|definition|value|unit|note|tooltip|content|point|detail|body|placeholder|alt|aria-label)\s*[:=]\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|\{?`((?:[^`\\]|\\.)*)`\}?)/g;

/** Anything that looks like human prose rather than code/config. */
function looksLikeProse(s: string): boolean {
  const t = s.trim();
  if (t.length < 3) return false;
  if (!/[a-zA-Z]/.test(t)) return false;
  // Tailwind class soup, css values, paths, identifiers.
  if (/^(?:[a-z0-9-]+:)?(?:flex|grid|text-|bg-|border|p[xytblr]?-|m[xytblr]?-|gap-|w-|h-|rounded|shadow|hover:|dark:|sm:|md:|lg:|xl:|animate-|font-|items-|justify-|space-|absolute|relative|z-|overflow|max-|min-|opacity|transition|duration|leading|tracking|col-|row-)/.test(t)) return false;
  if (/^[\d.\s,%-]+$/.test(t)) return false;
  if (/^(?:https?:|\/|#|\.\/|@\/)/.test(t)) return false;
  if (/^[a-z][a-zA-Z0-9]*$/.test(t) && t.length < 14) return false; // bare identifier
  if (/^[A-Z_]{2,}$/.test(t)) return false;
  if (/^\s*(?:M|m)\s*-?\d+[\d\s,.\-A-Za-z]*$/.test(t)) return false; // SVG path data
  if (/[{}<>]{2,}/.test(t)) return false;
  return true;
}

function decode(s: string): string {
  return s
    .replace(/\\n/g, " ")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

interface Extracted {
  lines: string[];
  svgLabels: string[];
}

function extractFromSource(src: string): Extracted {
  const lines: string[] = [];
  const svgLabels: string[] = [];

  // Strip imports and single-line comments — no content, plenty of noise.
  const body = src
    .replace(/^\s*import[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm, "")
    .replace(/^\s*\/\/.*$/gm, "");

  // 1. JSX text nodes: >  some prose  <
  const jsxText = /(?:^|>)([^<>{}\n][^<>{}]{2,})(?=<)/g;
  let m: RegExpExecArray | null;
  while ((m = jsxText.exec(body))) {
    const t = decode(m[1]);
    if (looksLikeProse(t) && /\s/.test(t)) lines.push(t);
  }

  // 2. Content-bearing props and object fields.
  CONTENT_PROPS.lastIndex = 0;
  while ((m = CONTENT_PROPS.exec(body))) {
    const raw = m[1] ?? m[2] ?? m[3] ?? "";
    const t = decode(raw);
    if (looksLikeProse(t)) lines.push(t);
  }

  // 3. Verbatim SVG <text> labels — the diagram content the scrape never saw.
  const svgTextEl = /<(text|tspan|title|desc)\b[^>]*>([\s\S]*?)<\/\1>/g;
  while ((m = svgTextEl.exec(body))) {
    const inner = decode(m[2].replace(/<[^>]+>/g, " ").replace(/\{[^}]*\}/g, " "));
    if (inner && /[a-zA-Z]/.test(inner)) svgLabels.push(inner);
  }


  // 4. Long string literals anywhere (paragraph constants, arrays of bullets).
  const longStrings = /["'`]((?:[^"'`\\]|\\.){40,}?)["'`]/g;
  while ((m = longStrings.exec(body))) {
    const t = decode(m[1]);
    if (looksLikeProse(t) && /\s/.test(t)) lines.push(t);
  }

  return { lines, svgLabels };
}

// -------------------------------------------------------------------- assembly

/**
 * Read the route table as text rather than importing it — the module uses
 * `import.meta.glob`, which only exists inside Vite.
 */
function loadTopicRoutes(): Array<[string, string]> {
  const src = readFileSync(resolve(ROOT, "src/routes/topicRoutes.ts"), "utf8");
  const out: Array<[string, string]> = [];
  const re = /\[\s*"(\/[^"]+)"\s*,\s*"([A-Za-z0-9_]+)"\s*\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) out.push([m[1], m[2]]);
  return out;
}

const TOPIC_ROUTES = loadTopicRoutes();

/** topicId → route, derived from the route table (`/section/topic-id`). */
const componentByTopicId = new Map<string, { component: string; route: string }>();
for (const [path, moduleName] of TOPIC_ROUTES) {
  const id = path.split("/").filter(Boolean).pop();
  if (id) componentByTopicId.set(id, { component: moduleName, route: path });
}

function buildEntry(topic: (typeof allTopics)[number]): AuditCorpusEntry | null {
  const mapped = componentByTopicId.get(topic.id);
  if (!mapped) return null;
  const entryFile = resolve(ROOT, `src/pages/topics/${mapped.component}.tsx`);
  const rootSrc = readIfExists(entryFile);
  if (!rootSrc) return null;

  const seen = new Set<string>([entryFile]);
  const lines: string[] = [];
  const svgLabels: string[] = [];

  // Breadth-first walk through the topic's own component tree.
  let frontier: Array<{ file: string; src: string; depth: number }> = [
    { file: entryFile, src: rootSrc, depth: 0 },
  ];
  while (frontier.length > 0 && seen.size <= MAX_IMPORTED_FILES) {
    const next: typeof frontier = [];
    for (const node of frontier) {
      const extracted = extractFromSource(node.src);
      lines.push(...extracted.lines);
      svgLabels.push(...extracted.svgLabels);
      if (node.depth >= MAX_IMPORT_DEPTH) continue;
      for (const dep of localImportsOf(node.src, node.file)) {
        if (seen.has(dep) || seen.size > MAX_IMPORTED_FILES) continue;
        seen.add(dep);
        const src = readIfExists(dep);
        if (src) next.push({ file: dep, src, depth: node.depth + 1 });
      }
    }
    frontier = next;
  }

  // De-duplicate while preserving order; drop near-empty fragments.
  const uniqueLines: string[] = [];
  const lineSeen = new Set<string>();
  for (const l of lines) {
    const key = l.toLowerCase();
    if (lineSeen.has(key)) continue;
    lineSeen.add(key);
    uniqueLines.push(l);
  }
  const uniqueLabels = Array.from(new Set(svgLabels)).slice(0, 400);

  const sectionPath = sectionMeta[topic.section].path;
  // Diagram/animation labels are teaching content, so they get a reserved slice
  // of the budget: truncating the prose must never silently drop them.
  const labelBlock =
    uniqueLabels.length > 0
      ? `## Diagram, animation and figure labels (narrate these in words)\n${uniqueLabels
          .join(" · ")
          .slice(0, MAX_LABEL_CHARS)}`
      : "";
  const prose = [`# ${topic.title}`, topic.description, "", ...uniqueLines].join("\n");
  const text = [
    prose.slice(0, MAX_TEXT_CHARS - (labelBlock ? labelBlock.length + 2 : 0)),
    "",
    labelBlock,
  ]
    .join("\n")
    .slice(0, MAX_TEXT_CHARS);

  const caseEntries = CASE_INDEX.get(topic.id) ?? [];

  return {
    topic_id: topic.id,
    topic_title: topic.title,
    description: topic.description,
    section: topic.section,
    section_label: sectionMeta[topic.section].label,
    exam_tags: topic.examTags,
    route: mapped.route,
    url: `https://anaesthesiacore.app${mapped.route}`,
    source_files: Array.from(seen).map((f) => f.replace(`${ROOT}/`, "")),
    text,
    diagram_labels: uniqueLabels,
    references: (topicReferences[topic.id] ?? []).map((r) => ({
      label: r.label,
      citation: r.citation,
      url: r.url,
      pmid: r.pmid,
      excerpt: r.excerpt,
    })),
    text_chars: text.length,
    case_ids: caseEntries.map((c) => c.case_id),
    case_bank_chars: caseEntries.reduce((n, c) => n + c.text.length, 0),
  };
}

export function buildAuditCorpus(): AuditCorpusEntry[] {
  const entries: AuditCorpusEntry[] = [];
  for (const topic of allTopics) {
    if (topic.available === false) continue;
    const entry = buildEntry(topic);
    if (entry) entries.push(entry);
  }
  return entries;
}

function main() {
  const entries = buildAuditCorpus();
  const thin = entries.filter((e) => e.text_chars < 1500);
  const missing = allTopics.filter(
    (t) => t.available !== false && !entries.some((e) => e.topic_id === t.id),
  );

  mkdirSync(dirname(OUT), { recursive: true });
  const corpus = JSON.stringify(
    {
      generated_at: new Date().toISOString(),
      topic_count: entries.length,
      entries,
      cases: buildCaseDictionary(),
    },
    null,
    0,
  );
  writeFileSync(OUT, corpus);
  mkdirSync(dirname(PODCAST_OUT), { recursive: true });
  writeFileSync(
    PODCAST_OUT,
    JSON.stringify({
      generated_at: new Date().toISOString(),
      entries: entries.map(({ topic_id, topic_title, text }) => ({
        topic_id,
        topic_title,
        text,
      })),
    }),
  );

  console.log(`[build-audit-corpus] ${entries.length} topics → ${OUT.replace(`${ROOT}/`, "")}`);
  console.log(
    `[build-audit-corpus] median text ${
      entries.length
        ? entries.map((e) => e.text_chars).sort((a, b) => a - b)[Math.floor(entries.length / 2)]
        : 0
    } chars, ${entries.reduce((n, e) => n + e.diagram_labels.length, 0)} diagram labels`,
  );
  if (thin.length > 0) {
    console.warn(
      `[build-audit-corpus] ${thin.length} topic(s) extracted <1500 chars: ${thin
        .slice(0, 10)
        .map((t) => t.topic_id)
        .join(", ")}`,
    );
  }
  if (missing.length > 0) {
    console.warn(
      `[build-audit-corpus] ${missing.length} topic(s) had no route/component: ${missing
        .slice(0, 10)
        .map((t) => t.id)
        .join(", ")}`,
    );
  }
}

const invokedDirectly =
  typeof process !== "undefined" && process.argv?.[1]?.includes("build-audit-corpus");
if (invokedDirectly) main();
