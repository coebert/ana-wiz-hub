/**
 * Precomputes the sitewide citation stats into `src/lib/citationStats.json`
 * so the client bundle never has to import the full ~200KB
 * `src/data/references.ts` just to render three landing-page counters.
 *
 * Runs in `prebuild` / `predev` (before vite), so the JSON always reflects
 * the current references file. The runtime module
 * (`src/lib/citationStats.ts`) imports this JSON directly.
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const refsPath = path.resolve("src/data/references.ts");
const { topicReferences } = await import(pathToFileURL(refsPath).href);

let totalCitations = 0;
const uniqueSources = new Set<string>();
const uniqueUrls = new Set<string>();
const topicsWithRefs = new Set<string>();

for (const [topicId, refs] of Object.entries(
  topicReferences as Record<string, Array<{ citation?: string; label?: string; url?: string }>>,
)) {
  if (!refs || refs.length === 0) continue;
  topicsWithRefs.add(topicId);
  for (const r of refs) {
    totalCitations += 1;
    const key = (r.citation || r.label || r.url || "").trim().toLowerCase();
    if (key) uniqueSources.add(key);
    if (r.url) uniqueUrls.add(r.url);
  }
}

const out = {
  totalCitations,
  uniqueSources: uniqueSources.size,
  uniqueUrls: uniqueUrls.size,
  topicsWithRefs: topicsWithRefs.size,
};

const outPath = path.resolve("src/lib/citationStats.json");
writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
console.log(
  `citationStats.json: ${out.totalCitations} citations, ${out.uniqueSources} sources, ${out.topicsWithRefs} topics`,
);
