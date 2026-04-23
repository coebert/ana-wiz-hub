/**
 * Cross-reference recommender for the placement-flow.
 *
 * When the dedupe pipeline (text + diagram registry + semantic) returns
 * verdict = "cross-reference" or "adjacent", call `recommendCrossReferences()`
 * to find the best target topics + anchors elsewhere in the curriculum and
 * generate a ready-to-paste <CrossReferenceCallout /> snippet.
 *
 * Pipeline:
 *   1. Pre-filter candidate topics via `seeAlsoMap` (curated graph) +
 *      diagram-registry phenomena overlap (structural).
 *   2. If a candidate set exists, score each candidate semantically against
 *      the proposed addition using `semanticDedupeCheck` (the same edge
 *      function used by Layer 3 of dedupe — repurposed to RANK adjacency
 *      rather than detect duplication).
 *   3. Return up to N targets in the "adjacent" band (semantic 0.35–0.59 or
 *      registry score 0.35–0.55), with per-target anchor + one-sentence reason.
 *
 * This module is an authoring aid (run from the agent's authoring context),
 * not a runtime feature of the topic pages themselves. The OUTPUT is a
 * snippet of TSX that gets pasted next to the new block by the placement
 * flow's build step.
 */

import { allTopics, sectionMeta } from "@/data/curriculum";
import { seeAlsoMap } from "@/data/seeAlso";
import {
  DIAGRAM_REGISTRY,
  type DiagramFingerprint,
  type Phenomenon,
} from "@/lib/diagram-registry";
import {
  semanticDedupeCheck,
  type SemanticCandidate,
  type SemanticSnippet,
  type SemanticDedupeVerdict,
} from "@/lib/semantic-dedupe";

export interface CrossRefRecommendation {
  topicId: string;
  topicTitle: string;
  sectionLabel: string;
  /** Optional anchor on the target topic (e.g. a known diagram block id). */
  anchor?: string;
  /** Conceptual link rationale, ≤ 1 short sentence. */
  reason: string;
  /** Combined adjacency score 0–1 (higher = stronger adjacency). */
  score: number;
  /** Which signal sourced this candidate. */
  source: "seeAlsoMap" | "registry" | "semantic" | "registry+semantic";
}

interface RecommendArgs {
  /** Topic the new addition is being placed in (excluded from suggestions). */
  hostTopicId: string;
  /** Description of what is being added (drives semantic ranking). */
  candidate: SemanticCandidate;
  /** Phenomena from the candidate's diagram fingerprint (if any). */
  phenomena?: Phenomenon[];
  /** Free-text tags/synonyms to widen the structural pre-filter. */
  tags?: string[];
  /** Max recommendations to return. Default 3. */
  limit?: number;
}

const sectionAnchorForDiagram = (d: DiagramFingerprint): string | undefined => {
  // Convention: diagram cards in topic pages can be assigned id=`diagram-<id>`
  // for deep linking. Treat the registry id as the canonical anchor.
  return `diagram-${d.id}`;
};

const phenomenaOverlap = (a: Phenomenon[] = [], b: Phenomenon[] = []): number => {
  if (!a.length || !b.length) return 0;
  const setB = new Set(b);
  let hits = 0;
  for (const x of a) if (setB.has(x)) hits++;
  return hits / Math.max(a.length, b.length);
};

/** Pre-filter: gather candidate topic IDs from curated map + registry. */
const gatherCandidates = (
  hostTopicId: string,
  phenomena: Phenomenon[] | undefined
): Map<string, { source: CrossRefRecommendation["source"]; structuralScore: number; anchor?: string; matchedDiagram?: DiagramFingerprint }> => {
  const out = new Map<
    string,
    { source: CrossRefRecommendation["source"]; structuralScore: number; anchor?: string; matchedDiagram?: DiagramFingerprint }
  >();

  // (a) Curated seeAlsoMap neighbours
  const neighbours = seeAlsoMap[hostTopicId] ?? [];
  for (const id of neighbours) {
    if (id === hostTopicId) continue;
    out.set(id, { source: "seeAlsoMap", structuralScore: 0.4 });
  }

  // (b) Registry: any diagram in *another* topic that shares phenomena
  if (phenomena && phenomena.length) {
    for (const d of DIAGRAM_REGISTRY) {
      const otherTopics = d.topics.filter((t) => t !== hostTopicId);
      if (!otherTopics.length) continue;
      const overlap = phenomenaOverlap(phenomena, d.phenomena);
      if (overlap < 0.34) continue; // adjacency floor (paired with placement-flow band)
      for (const tid of otherTopics) {
        const prior = out.get(tid);
        const score = 0.3 + 0.5 * overlap; // 0.30–0.80
        if (!prior || score > prior.structuralScore) {
          out.set(tid, {
            source: prior?.source === "seeAlsoMap" ? "registry+semantic" : "registry",
            structuralScore: Math.max(score, prior?.structuralScore ?? 0),
            anchor: sectionAnchorForDiagram(d),
            matchedDiagram: d,
          });
        }
      }
    }
  }

  return out;
};

/**
 * Rank candidates semantically against the proposed addition. The semantic
 * edge function returns per-snippet scores; we treat scores in the adjacency
 * band (0.35–0.59) as confirmation of cross-reference quality, and scores
 * ≥ 0.60 as a warning that this might actually be EXTEND territory (caller
 * should re-check Step 2c of the placement flow).
 */
export const recommendCrossReferences = async (
  args: RecommendArgs
): Promise<{
  recommendations: CrossRefRecommendation[];
  warnings: string[];
  /** Ready-to-paste TSX snippet using <CrossReferenceCallout />. */
  snippet: string | null;
}> => {
  const { hostTopicId, candidate, phenomena, limit = 3 } = args;
  const warnings: string[] = [];

  const prefilter = gatherCandidates(hostTopicId, phenomena);
  if (prefilter.size === 0) {
    return {
      recommendations: [],
      warnings: ["No structural neighbours found via seeAlsoMap or diagram registry."],
      snippet: null,
    };
  }

  // Build snippets for semantic ranking — one per candidate topic.
  const snippets: SemanticSnippet[] = [];
  for (const [topicId, meta] of prefilter) {
    const topic = allTopics.find((t) => t.id === topicId);
    if (!topic) continue;
    // Source text = topic title + (matched diagram intent if any) + tags
    const intent = meta.matchedDiagram?.intent ?? "";
    const tags = meta.matchedDiagram?.tags?.join(", ") ?? "";
    const text = [topic.title, intent, tags].filter(Boolean).join(" — ");
    snippets.push({ id: topicId, source: `topic:${topicId}`, text });
  }

  let semantic: SemanticDedupeVerdict | null = null;
  try {
    semantic = await semanticDedupeCheck({
      candidate,
      snippets,
      topicId: hostTopicId,
    });
  } catch (e) {
    warnings.push(
      `Semantic ranking unavailable (${e instanceof Error ? e.message : "unknown"}); falling back to structural scores only.`
    );
  }

  // Combine structural + semantic into a final adjacency score per candidate.
  const recs: CrossRefRecommendation[] = [];
  for (const [topicId, meta] of prefilter) {
    const topic = allTopics.find((t) => t.id === topicId);
    if (!topic) continue;
    const sectionLabel = sectionMeta[topic.section].label;

    const semMatch = semantic?.matches.find((m) => m.snippetId === topicId);
    const semScore = semMatch?.score ?? 0;

    // Warn if semantic says this is actually duplicate/extend territory.
    if (semMatch && (semMatch.relation === "duplicate" || semMatch.relation === "extend")) {
      warnings.push(
        `"${topic.title}" scored ${semMatch.score.toFixed(2)} (${semMatch.relation}) — re-check whether to extend that topic's existing block instead of cross-referencing.`
      );
      continue; // exclude from cross-ref recs; caller should re-run dedupe
    }

    // Final score: weighted blend; semantic dominates when present.
    const finalScore = semantic
      ? 0.35 * meta.structuralScore + 0.65 * semScore
      : meta.structuralScore;

    // Filter to true adjacency band
    if (finalScore < 0.3) continue;

    const reason =
      semMatch?.rationale ??
      meta.matchedDiagram?.intent ??
      `Related ${sectionLabel.toLowerCase()} concept in ${topic.title}.`;

    recs.push({
      topicId,
      topicTitle: topic.title,
      sectionLabel,
      anchor: meta.anchor,
      reason: reason.length > 140 ? reason.slice(0, 137) + "…" : reason,
      score: finalScore,
      source: semantic ? "registry+semantic" : meta.source,
    });
  }

  recs.sort((a, b) => b.score - a.score);
  const top = recs.slice(0, limit);

  if (top.length === 0) {
    return { recommendations: [], warnings, snippet: null };
  }

  // Build ready-to-paste TSX snippet
  const reasonLine =
    top[0].reason.charAt(0).toUpperCase() + top[0].reason.slice(1);
  const linksTsx = top
    .map(
      (r) =>
        `    { topicId: "${r.topicId}"${r.anchor ? `, anchor: "${r.anchor}"` : ""} }`
    )
    .join(",\n");
  const snippet = `<CrossReferenceCallout
  reason=${JSON.stringify(reasonLine)}
  links={[
${linksTsx}
  ]}
/>`;

  return { recommendations: top, warnings, snippet };
};
