/**
 * Client helper for the `semantic-dedupe` edge function.
 *
 * This is the third (semantic) layer of the placement-flow dedupe pipeline:
 *   1. Text/keyword grep        (code--search_files)
 *   2. Diagram registry similarity (src/lib/diagram-registry.ts)
 *   3. SEMANTIC similarity via LLM (this module + edge function)
 *
 * It catches paraphrase, synonym, abbreviation, mechanism-vs-effect, and
 * physiology-vs-pathology framings that the first two layers miss.
 *
 * Usage (authoring time, not runtime):
 *   const verdict = await semanticDedupeCheck({
 *     candidate: { label, intent, contentType: "diagram" },
 *     snippets: [
 *       { id: "existing-1", source: "diagram:wiggers", text: "..." },
 *       ...
 *     ],
 *     topicId: "cardiac-cycle",
 *   });
 *   console.log(verdict.verdictLine);
 *   if (verdict.overallRecommendation === "extend") { ... }
 */

import { supabase } from "@/integrations/supabase/client";

export interface SemanticCandidate {
  label: string;
  intent: string;
  contentType?: "diagram" | "prose" | "calculator" | "panel" | "drawer" | "footnote" | "table" | "other";
}

export interface SemanticSnippet {
  id: string;
  source: string;
  text: string;
}

export type SemanticRelation = "duplicate" | "extend" | "cross-reference" | "novel";

export interface SemanticMatch {
  snippetId: string;
  score: number;
  relation: SemanticRelation;
  rationale: string;
}

export interface SemanticDedupeVerdict {
  matches: SemanticMatch[];
  topMatchId: string;
  overallRecommendation: SemanticRelation;
  verdictLine: string;
}

export interface SemanticDedupeError {
  error: string;
  detail?: string;
}

export const semanticDedupeCheck = async (params: {
  candidate: SemanticCandidate;
  snippets: SemanticSnippet[];
  topicId?: string;
}): Promise<SemanticDedupeVerdict> => {
  const { data, error } = await supabase.functions.invoke<SemanticDedupeVerdict | SemanticDedupeError>(
    "semantic-dedupe",
    { body: params }
  );

  if (error) {
    throw new Error(`semantic-dedupe failed: ${error.message}`);
  }
  if (!data || "error" in data) {
    throw new Error(
      `semantic-dedupe returned error: ${(data as SemanticDedupeError | null)?.error ?? "no data"}`
    );
  }
  return data;
};

/**
 * Convenience: combine the diagram registry verdict with the semantic verdict
 * into the single line used in the placement-flow report.
 *
 * The semantic verdict can OVERRIDE a "novel" registry result (catching
 * paraphrase the structural check missed) but never DOWNGRADES a registry
 * "duplicate" or "extend" finding.
 */
export const reconcileVerdicts = (
  registryRecommendation: SemanticRelation,
  semantic: SemanticDedupeVerdict
): { recommendation: SemanticRelation; line: string } => {
  const order: Record<SemanticRelation, number> = {
    novel: 0,
    "cross-reference": 1,
    extend: 2,
    duplicate: 3,
  };
  const stronger =
    order[semantic.overallRecommendation] > order[registryRecommendation]
      ? semantic.overallRecommendation
      : registryRecommendation;

  const line =
    stronger === semantic.overallRecommendation && stronger !== registryRecommendation
      ? `Semantic dedupe upgraded verdict: ${semantic.verdictLine}`
      : semantic.verdictLine;

  return { recommendation: stronger, line };
};
