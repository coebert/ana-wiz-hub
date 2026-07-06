/**
 * Unified `Topic` aggregate — read-only facade over the six per-topic registries.
 *
 * Why
 * ---
 * The project stores per-topic data in six parallel files, all keyed by topic id:
 *   • src/data/curriculum.ts   — title, description, section, examTags
 *   • src/data/topicSeo.ts     — SEO title/description/aliases/keywords
 *   • src/data/references.ts   — Reference[]
 *   • src/data/quizzes.ts      — QuizQuestion[] (named exports, not id-keyed)
 *   • src/data/seeAlso.ts      — related topic ids
 *   • src/data/sources.ts      — bibliographic sources (referenced from references.ts)
 *
 * That layout is fine for authoring, but *readers* (TopicTemplate, SEO helpers,
 * sitemap generators, audit scripts) have to know about all six files and hand-
 * wire the same lookups. Each new consumer duplicates that plumbing.
 *
 * This facade collapses reads to one call:
 *
 *   const topic = getTopic("gas-laws");
 *   topic.title            // from curriculum.ts
 *   topic.seo?.title       // from topicSeo.ts
 *   topic.quiz             // from quizzes.ts (mapped via slug → camelCaseQuiz)
 *   topic.references       // from references.ts
 *   topic.seeAlso          // from seeAlso.ts
 *
 * Adding a new registry means updating this one file — every existing caller
 * inherits it automatically. It also enables future migration to per-topic
 * co-located files (one `topics/gas-laws.ts` bundling all five arrays) without
 * touching call sites: `getTopic` stays the same, only its innards change.
 */
import type { QuizQuestion } from "@/components/QuizSection";
import { allTopics, type Section, type ExamTag, type Topic as CurriculumTopic } from "./curriculum";
import { topicSeo, type TopicSeo } from "./topicSeo";
import { topicReferences, type Reference } from "./references";
import { seeAlsoMap } from "./seeAlso";
import * as quizzes from "./quizzes";

/** Merged, denormalised view of a single topic. All read-only. */
export interface Topic {
  id: string;
  title: string;
  description: string;
  section: Section;
  examTags: ReadonlyArray<ExamTag>;
  /** Whether the topic has a live page (from curriculum.ts). */
  available: boolean;
  /** SEO overrides (title/description/aliases/keywords) if any. */
  seo?: TopicSeo;
  /** Peer-reviewed references for this topic (empty array if none). */
  references: ReadonlyArray<Reference>;
  /** Quiz questions for this topic (empty array if none). */
  quiz: ReadonlyArray<QuizQuestion>;
  /** Related topic ids for cross-linking (empty array if none). */
  seeAlso: ReadonlyArray<string>;
}

// ---------------------------------------------------------------------------
// Quiz lookup: quizzes.ts uses named exports like `gasLawsQuiz`, not an
// id-keyed map. Convert slug → camelCase + "Quiz" once and cache the result.
// ---------------------------------------------------------------------------

function slugToCamel(id: string): string {
  return id
    .split("-")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

const quizByTopicId: Map<string, QuizQuestion[]> = (() => {
  const m = new Map<string, QuizQuestion[]>();
  const bag = quizzes as unknown as Record<string, unknown>;
  for (const topic of allTopics) {
    const candidates = [
      `${slugToCamel(topic.id)}Quiz`,
      // Common hand-rolled aliases the codebase uses when the slug diverges
      // from the export name (kept small — extend as needed).
      `${slugToCamel(topic.id).replace(/Anaesthetics$/, "Anaesthetic")}Quiz`,
    ];
    for (const name of candidates) {
      const val = bag[name];
      if (Array.isArray(val)) {
        m.set(topic.id, val as QuizQuestion[]);
        break;
      }
    }
  }
  return m;
})();

const topicById: Map<string, CurriculumTopic> = new Map(
  allTopics.map((t) => [t.id, t]),
);

/**
 * Look up a topic by id. Returns `null` when the id is unknown — callers can
 * use that to render a 404 without throwing.
 */
export function getTopic(id: string): Topic | null {
  const base = topicById.get(id);
  if (!base) return null;
  return {
    id: base.id,
    title: base.title,
    description: base.description,
    section: base.section,
    examTags: base.examTags,
    available: base.available,
    seo: topicSeo[id],
    references: topicReferences[id] ?? [],
    quiz: quizByTopicId.get(id) ?? [],
    seeAlso: seeAlsoMap[id] ?? [],
  };
}

/**
 * Throwing variant — use in code paths where a missing id is a bug (build
 * scripts, tests, audit tools), never on user-facing render paths.
 */
export function requireTopic(id: string): Topic {
  const topic = getTopic(id);
  if (!topic) {
    throw new Error(
      `[getTopic] unknown topic id "${id}". ` +
        `Register it in src/data/curriculum.ts first.`,
    );
  }
  return topic;
}

/** All merged topics — for sitemap, index and audit consumers. */
export function getAllTopics(): Topic[] {
  return allTopics.map((t) => requireTopic(t.id));
}
