/**
 * Build a flat knowledge-base corpus from the canonical app data and write it
 * to `supabase/functions/kb-reindex/corpus.json`. The Ask AI feature embeds
 * these chunks into pgvector at indexing time, then retrieves the top-K
 * matches at chat time so the model can answer with citations linking back
 * to the relevant topic routes.
 *
 * Sources stitched into the corpus:
 *   • `allTopics` (id, title, description, section, examTags)   → overview chunk
 *   • `topicSeo[id]` (description + aliases + keywords)         → seo blurb chunk
 *   • FAQ pairs from `scripts/extract-faqs.ts`                  → one chunk per Q
 *
 * Route is derived from `sectionMeta[topic.section].path + "/" + topic.id`,
 * which is the same path App.tsx uses to mount each topic page.
 *
 * Run via `bun run scripts/build-kb-corpus.ts`. The output JSON is committed
 * alongside the edge function so it's deployed as a plain data import.
 */
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";
import { allTopics, sectionMeta } from "../src/data/curriculum";
import { topicSeo } from "../src/data/topicSeo";
import { extractFaqsByPath } from "./extract-faqs";

interface KbChunk {
  topic_id: string;
  topic_title: string;
  route: string;
  section: string;
  exam_tags: string[];
  chunk_kind: "overview" | "seo" | "faq";
  content: string;
}

const chunks: KbChunk[] = [];
const faqsByPath = extractFaqsByPath();

for (const t of allTopics) {
  if (!t.available) continue;
  const route = `${sectionMeta[t.section].path}/${t.id}`;
  const base = {
    topic_id: t.id,
    topic_title: t.title,
    route,
    section: t.section,
    exam_tags: t.examTags,
  };

  // 1. Curriculum overview — short canonical description.
  chunks.push({
    ...base,
    chunk_kind: "overview",
    content: `${t.title} (${sectionMeta[t.section].label} · exams: ${t.examTags.join(", ")}). ${t.description}`,
  });

  // 2. SEO blurb — keyword-tuned description + aliases (gives retrieval a
  //    much wider surface of search terms than the curriculum line alone).
  const seo = topicSeo[t.id];
  if (seo) {
    const parts = [
      seo.description ?? "",
      seo.aliases?.length ? `Also known as: ${seo.aliases.join(", ")}.` : "",
      seo.keywords?.length ? `Keywords: ${seo.keywords.join(", ")}.` : "",
    ].filter(Boolean);
    if (parts.length > 0) {
      chunks.push({
        ...base,
        chunk_kind: "seo",
        content: `${t.title}. ${parts.join(" ")}`,
      });
    }
  }

  // 3. FAQ pairs — one chunk per question, the most direct Q&A signal in
  //    the corpus and high-value for grounded answers.
  const faqs = faqsByPath[route] ?? [];
  for (const [q, a] of faqs) {
    chunks.push({
      ...base,
      chunk_kind: "faq",
      content: `${t.title} — Q: ${q}\nA: ${a}`,
    });
  }
}

const outDir = resolve("supabase/functions/kb-reindex");
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, "corpus.json");
writeFileSync(
  outPath,
  JSON.stringify({ generated_at: new Date().toISOString(), chunks }, null, 2),
);
console.log(`[build-kb-corpus] wrote ${chunks.length} chunks for ${allTopics.filter((t) => t.available).length} topics → ${outPath}`);
