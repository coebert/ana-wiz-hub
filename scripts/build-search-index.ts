/**
 * Build the full-text search index for the site search dialog.
 *
 * The old search only matched topic titles, descriptions and quiz text, so
 * terms buried in topic body content (e.g. "APRV" inside the mechanical
 * ventilation topic) returned nothing. This script walks each topic's own
 * component tree — reusing the audit-corpus extractor so the same content
 * classification applies — and records searchable snippets with the in-page
 * section anchor they belong to (CollapsibleSubsection → `section-<slug>`,
 * matching src/lib/sectionAnchor.ts), so results can deep-link to the exact
 * section.
 *
 * Output: `src/data/searchIndex.generated.json`, lazy-loaded by the search
 * dialog on first open. Regenerated on predev/prebuild alongside the audit
 * corpus.
 *
 * Run: `bun scripts/build-search-index.ts`
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { allTopics, sectionMeta } from "../src/data/curriculum";
import { sectionAnchorId } from "../src/lib/sectionAnchor";
import { operations } from "../src/data/operativeSteps";
import {
  readIfExists,
  resolveImport,
  localImportsOf,
  looksLikeProse,
  decode,
  componentByTopicId,
} from "./build-audit-corpus";

const ROOT = resolve(import.meta.dirname ?? __dirname, "..");
const OUT = resolve(ROOT, "src/data/searchIndex.generated.json");

const MAX_IMPORT_DEPTH = 2;
const MAX_IMPORTED_FILES = 60;
/** Prose budget per topic (chars). Headings are never trimmed. */
const MAX_PROSE_CHARS = 15_000;
/** Longest single prose record before sentence-splitting. */
const MAX_RECORD_CHARS = 320;

export interface SearchRecord {
  /** Record text (original case, for display). */
  t: string;
  /** Section anchor within the topic page, or null for the page top. */
  a: string | null;
  /** "heading" records rank above "prose" records. */
  k: "heading" | "prose";
}

export interface SearchIndexEntry {
  id: string;
  section: string;
  path: string;
  title: string;
  description: string;
  examTags: string[];
  available: boolean;
  records: SearchRecord[];
}

// ------------------------------------------------------- positioned extraction

/**
 * Named imports of local modules, so a file that imports one export from a
 * shared module (e.g. `headNeckFolio` from anatomyFolios.ts, which also
 * defines every other topic's folios) only contributes that export's content
 * to the index. Returns null for default/namespace imports (whole file).
 */
function namedImportsOf(src: string, fromFile: string): Map<string, Set<string> | null> {
  const out = new Map<string, Set<string> | null>();
  const re = /^\s*import\s+(?:type\s+)?([\s\S]*?)\s+from\s+["']([^"']+)["'];?/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const clause = m[1].trim();
    const spec = m[2];
    if (!spec.startsWith("@/") && !spec.startsWith(".")) continue;
    const file = resolveImport(spec, fromFile);
    if (!file) continue;
    // `import X from` / `import * as X from` → whole file.
    if (!clause.startsWith("{")) {
      out.set(file, null);
      continue;
    }
    const names = clause
      .replace(/[{}]/g, " ")
      .split(",")
      .map((s) => s.trim().split(/\s+as\s+/)[0])
      .filter(Boolean);
    const existing = out.get(file);
    if (existing === null) continue; // whole-file import already wins
    const set = existing ?? new Set<string>();
    for (const n of names) set.add(n);
    out.set(file, set);
  }
  return out;
}

/**
 * Slice a module into top-level `export const NAME` / `export function NAME`
 * blocks so named-import filtering can keep only what the importer uses.
 * Returns null when the module has no nameable top-level exports.
 */
function sliceExports(src: string): Map<string, string> | null {
  const re = /^export\s+(?:const|function|class|let)\s+([A-Za-z_$][\w$]*)/gm;
  const starts: Array<{ name: string; index: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) starts.push({ name: m[1], index: m.index });
  if (starts.length === 0) return null;
  const out = new Map<string, string>();
  for (let i = 0; i < starts.length; i++) {
    const end = i + 1 < starts.length ? starts[i + 1].index : src.length;
    out.set(starts[i].name, src.slice(starts[i].index, end));
  }
  return out;
}

interface Piece {
  text: string;
  index: number;
  /**
   * Diagram/atlas label text (folio titles, latin/english label pairs, tab
   * labels). Labels are teaching content and bypass the prose budget, so a
   * long topic cannot silently lose the searchable names of its diagrams.
   */
  label?: boolean;
}

/**
 * Like extractFromSource in build-audit-corpus, but records the match offset
 * of each piece so it can be attributed to the CollapsibleSubsection that
 * precedes it in the same file.
 */
function extractPositioned(src: string): Piece[] {
  const pieces: Piece[] = [];
  const body = src
    .replace(/^\s*import[\s\S]*?from\s+["'][^"']+["'];?\s*$/gm, "")
    .replace(/^\s*\/\/.*$/gm, "");

  // JSX text nodes: >  some prose  <
  const jsxText = /(?:^|>)([^<>{}\n][^<>{}]{2,})(?=<)/g;
  let m: RegExpExecArray | null;
  while ((m = jsxText.exec(body))) {
    const t = decode(m[1]);
    if (looksLikeProse(t) && /\s/.test(t)) pieces.push({ text: t, index: m.index });
  }

  // Content-bearing props and object fields.
  const props =
    /\b(?:title|label|heading|subtitle|description|text|caption|name|question|answer|summary|term|definition|value|unit|note|tooltip|content|point|detail|body|placeholder|alt|aria-label)\s*[:=]\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|\{?`((?:[^`\\]|\\.)*)`\}?)/g;
  while ((m = props.exec(body))) {
    const raw = m[1] ?? m[2] ?? m[3] ?? "";
    const t = decode(raw);
    if (looksLikeProse(t)) pieces.push({ text: t, index: m.index });
  }

  // Long string literals anywhere (paragraph constants, arrays of bullets).
  const longStrings = /["'`]((?:[^"'`\\]|\\.){40,}?)["'`]/g;
  while ((m = longStrings.exec(body))) {
    const t = decode(m[1]);
    if (looksLikeProse(t) && /\s/.test(t)) pieces.push({ text: t, index: m.index });
  }

  // Diagram/atlas label fields (anatomy folios: latin/english pairs, tab
  // labels, short titles) — searchable names even when the surrounding
  // topic prose has exhausted the budget.
  const labelProps =
    /\b(?:english|latin|tabLabel|shortLabel|acronym|abbr)\s*[:=]\s*(?:"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|`([^`\\]*(?:\\.[^`\\]*)*)`)/g;
  while ((m = labelProps.exec(body))) {
    const t = decode(m[1] ?? m[2] ?? m[3] ?? "");
    if (t.length >= 3 && /[a-zA-Z]/.test(t)) pieces.push({ text: t, index: m.index, label: true });
  }

  return pieces.sort((a, b) => a.index - b.index);
}

/** CollapsibleSubsection titles with their offsets, for anchor attribution. */
function findSubsectionAnchors(src: string): Array<{ title: string; index: number; anchor: string }> {
  const out: Array<{ title: string; index: number; anchor: string }> = [];
  const re = /CollapsibleSubsection[^>]*?title=(?:"([^"]+)"|'([^']+)'|\{[`"]([^`"]+)[`"]\})/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    const title = m[1] ?? m[2] ?? m[3] ?? "";
    if (title) out.push({ title, index: m.index, anchor: sectionAnchorId(title) });
  }
  return out;
}

// ---------------------------------------------------------------- per-topic

function splitLongProse(text: string): string[] {
  if (text.length <= MAX_RECORD_CHARS) return [text];
  const sentences = text.split(/(?<=[.!?])\s+/);
  const out: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if (cur && (cur + " " + s).length > MAX_RECORD_CHARS) {
      out.push(cur);
      cur = s;
    } else {
      cur = cur ? `${cur} ${s}` : s;
    }
  }
  if (cur) out.push(cur);
  return out;
}

function buildTopicEntry(topic: (typeof allTopics)[number]): SearchIndexEntry | null {
  const mapped = componentByTopicId.get(topic.id);
  if (!mapped) return null;
  const entryFile = resolve(ROOT, `src/pages/topics/${mapped.component}.tsx`);
  const rootSrc = readIfExists(entryFile);
  if (!rootSrc) return null;

  const seen = new Set<string>([entryFile]);
  const records: SearchRecord[] = [];
  const recordSeen = new Set<string>();
  let proseChars = 0;

  const pushRecord = (text: string, anchor: string | null, kind: "heading" | "prose") => {
    const t = text.replace(/\s+/g, " ").trim();
    if (t.length < 3) return;
    const key = t.toLowerCase();
    if (recordSeen.has(key)) return;
    recordSeen.add(key);
    if (kind === "prose") proseChars += t.length;
    records.push({ t, a: anchor, k: kind });
  };

  // Every structured operation retains its own searchable anchor, outside
  // the generic topic prose budget.
  if (topic.id === "operative-steps") {
    for (const op of operations) {
      pushRecord([op.name, ...(op.aka ?? [])].join(" · "), op.id, "heading");
      const text = [op.specialty, op.summary, op.position,
        ...op.steps.flatMap((s) => [s.step, s.anaesthetic ?? ""]),
        ...op.criticalMoments, ...op.anaestheticNotes];
      for (const part of text) for (const chunk of splitLongProse(part)) pushRecord(chunk, op.id, "prose");
    }
  }

  // Breadth-first walk through the topic's own component tree. Headings and
  // label fields are recorded immediately; prose pieces are queued per file
  // and budgeted round-robin afterwards, so a long root file cannot consume
  // the whole allowance before the topic's diagram/Teaching imports are seen.
  interface FileProse {
    items: Array<{ text: string; anchor: string | null }>;
    cursor: number;
  }
  const proseQueues: FileProse[] = [];

  let frontier: Array<{ file: string; src: string; depth: number; anchor: string | null }> = [
    { file: entryFile, src: rootSrc, depth: 0, anchor: null },
  ];
  while (frontier.length > 0 && seen.size <= MAX_IMPORTED_FILES) {
    const next: typeof frontier = [];
    for (const node of frontier) {
      const anchors = findSubsectionAnchors(node.src);
      const pieces = extractPositioned(node.src);
      const queue: FileProse = { items: [], cursor: 0 };
      let ai = 0;
      let currentAnchor = node.anchor;
      for (const p of pieces) {
        // Advance past any subsection headings that start before this piece.
        while (ai < anchors.length && anchors[ai].index < p.index) {
          const a = anchors[ai];
          pushRecord(a.title, a.anchor, "heading");
          currentAnchor = a.anchor;
          ai += 1;
        }
        if (p.label) {
          // Labels bypass the budget — bounded by the diagram count.
          pushRecord(p.text, currentAnchor, "prose");
        } else {
          for (const chunk of splitLongProse(p.text)) {
            queue.items.push({ text: chunk, anchor: currentAnchor });
          }
        }
      }
      // Trailing subsection headings with no following content in this file.
      while (ai < anchors.length) {
        const a = anchors[ai];
        pushRecord(a.title, a.anchor, "heading");
        ai += 1;
      }
      if (queue.items.length > 0) proseQueues.push(queue);
      if (node.depth >= MAX_IMPORT_DEPTH) continue;
      const namedImports = namedImportsOf(node.src, node.file);
      for (const dep of localImportsOf(node.src, node.file)) {
        if (seen.has(dep) || seen.size > MAX_IMPORTED_FILES) continue;
        seen.add(dep);
        let src = readIfExists(dep);
        if (!src) continue;
        // Shared modules (e.g. anatomyFolios.ts holds every topic's folios):
        // keep only the named exports this topic actually imports, so one
        // topic's diagram labels cannot leak into another's search results.
        const allowed = namedImports.get(dep);
        if (allowed) {
          const blocks = sliceExports(src);
          if (blocks) {
            const parts = [...allowed].map((n) => blocks.get(n) ?? "").filter(Boolean);
            if (parts.length === 0) continue; // import resolves to nothing we index
            // Each imported export (e.g. one Teaching lesson) gets its own
            // prose queue, so later lessons in a shared file are not starved
            // by the round-robin budget.
            for (const part of parts.slice(1)) next.push({ file: dep, src: part, depth: node.depth + 1, anchor: null });
            src = parts[0];
          }
        }
        // Imported components (Teaching sections, diagrams) have no stable
        // anchor context of their own; link them to the topic page top.
        next.push({ file: dep, src, depth: node.depth + 1, anchor: null });
      }
    }
    frontier = next;
  }

  // Round-robin prose budget across files: each file gets its turn, so every
  // imported component contributes before any file is fully drained.
  let progress = true;
  while (proseChars < MAX_PROSE_CHARS && progress) {
    progress = false;
    for (const q of proseQueues) {
      if (proseChars >= MAX_PROSE_CHARS) break;
      const item = q.items[q.cursor];
      if (!item) continue;
      q.cursor += 1;
      progress = true;
      pushRecord(item.text, item.anchor, "prose");
    }
  }

  // Headings first so they survive any client-side trimming, then prose.
  records.sort((a, b) => (a.k === b.k ? 0 : a.k === "heading" ? -1 : 1));

  return {
    id: topic.id,
    section: topic.section,
    path: `${sectionMeta[topic.section].path}/${topic.id}`,
    title: topic.title,
    description: topic.description,
    examTags: topic.examTags,
    available: topic.available !== false,
    records,
  };
}

function main() {
  if (!existsSync(resolve(ROOT, "src/routes/topicRoutes.ts"))) {
    console.warn("[build-search-index] topicRoutes.ts not found — skipping");
    return;
  }
  const entries: SearchIndexEntry[] = [];
  for (const topic of allTopics) {
    if (topic.available === false) continue;
    const entry = buildTopicEntry(topic);
    if (entry) entries.push(entry);
  }
  const json = JSON.stringify({ generated_at: new Date().toISOString(), topics: entries });
  writeFileSync(OUT, json);
  const headingCount = entries.reduce((n, e) => n + e.records.filter((r) => r.k === "heading").length, 0);
  const proseCount = entries.reduce((n, e) => n + e.records.filter((r) => r.k === "prose").length, 0);
  console.log(
    `[build-search-index] ${entries.length} topics, ${headingCount} heading + ${proseCount} prose records, ${(json.length / 1024).toFixed(0)} KB → src/data/searchIndex.generated.json`,
  );
}

main();
