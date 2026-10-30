/** Shared computation for citation stats (generator + checker). Counts bibliography entries, not verification. */
import path from "node:path";
import { pathToFileURL } from "node:url";

export interface CitationStats {
  totalReferenceEntries: number;
  uniqueReferenceTexts: number;
  uniqueUrls: number;
  referencePoolsWithReferences: number;
  registeredTopics: number;
  registeredTopicsWithReferences: number;
}

type Ref = { citation?: string; label?: string; url?: string };

export function computeStats(refs: Record<string, Ref[] | undefined>, topicIds: string[]): CitationStats {
  let total = 0;
  const texts = new Set<string>(), urls = new Set<string>(), pools = new Set<string>();
  for (const [id, list] of Object.entries(refs)) {
    if (!list || list.length === 0) continue;
    pools.add(id);
    for (const r of list) {
      total += 1;
      const key = (r.citation || r.label || r.url || "").trim().toLowerCase();
      if (key) texts.add(key);
      if (r.url) urls.add(r.url);
    }
  }
  const ids = [...new Set(topicIds)];
  return {
    totalReferenceEntries: total,
    uniqueReferenceTexts: texts.size,
    uniqueUrls: urls.size,
    referencePoolsWithReferences: pools.size,
    registeredTopics: ids.length,
    registeredTopicsWithReferences: ids.filter((id) => (refs[id]?.length ?? 0) > 0).length,
  };
}

export async function computeFromRepo(): Promise<CitationStats> {
  const { topicReferences } = await import(pathToFileURL(path.resolve("src/data/references.ts")).href);
  const { allTopics } = await import(pathToFileURL(path.resolve("src/data/curriculum.ts")).href);
  return computeStats(topicReferences, (allTopics as { id: string }[]).map((t) => t.id));
}
