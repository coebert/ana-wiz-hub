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
const MAX_IMPORTED_FILES = 40;
/** Prose budget per topic (chars). Headings are never trimmed. */
const MAX_PROSE_CHARS = 6_000;
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

interface Piece {
  text: string;
  index: number;
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

  // Breadth-first walk through the topic's own component tree.
  let frontier: Array<{ file: string; src: string; depth: number; anchor: string | null }> = [
    { file: entryFile, src: rootSrc, depth: 0, anchor: null },
  ];
  while (frontier.length > 0 && seen.size <= MAX_IMPORTED_FILES) {
    const next: typeof frontier = [];
    for (const node of frontier) {
      const anchors = findSubsectionAnchors(node.src);
      const pieces = extractPositioned(node.src);
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
        if (proseChars < MAX_PROSE_CHARS) {
          for (const chunk of splitLongProse(p.text)) {
            pushRecord(chunk, currentAnchor, "prose");
          }
        }
      }
      // Trailing subsection headings with no following content in this file.
      while (ai < anchors.length) {
        const a = anchors[ai];
        pushRecord(a.title, a.anchor, "heading");
        ai += 1;
      }
      if (node.depth >= MAX_IMPORT_DEPTH) continue;
      for (const dep of localImportsOf(node.src, node.file)) {
        if (seen.has(dep) || seen.size > MAX_IMPORTED_FILES) continue;
        seen.add(dep);
        const src = readIfExists(dep);
        // Imported components (Teaching sections, diagrams) have no stable
        // anchor context of their own; link them to the topic page top.
        if (src) next.push({ file: dep, src, depth: node.depth + 1, anchor: null });
      }
    }
    frontier = next;
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
