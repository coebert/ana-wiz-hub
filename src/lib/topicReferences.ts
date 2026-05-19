import { supabase } from "@/integrations/supabase/client";

export interface TopicReference {
  authors: string;
  title: string;
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  url?: string;
}

/**
 * Resolve the best external link for a reference.
 * Priority: PMID (PubMed) → DOI (doi.org) → raw URL.
 */
export function referenceHref(r: TopicReference): string | undefined {
  if (r.pmid && /^\d+$/.test(r.pmid.trim())) {
    return `https://pubmed.ncbi.nlm.nih.gov/${r.pmid.trim()}/`;
  }
  if (r.doi) return `https://doi.org/${r.doi.replace(/^https?:\/\/doi\.org\//, "")}`;
  return r.url;
}

export function referenceLinkLabel(r: TopicReference): string {
  if (r.pmid && /^\d+$/.test(r.pmid.trim())) return "PubMed";
  if (r.doi) return "DOI";
  if (r.url) return "Link";
  return "";
}

export type TopicReferenceStatus =
  | "pending"
  | "generating"
  | "ready"
  | "failed";

export interface TopicReferenceRow {
  topic_id: string;
  topic_title: string;
  section: string;
  status: TopicReferenceStatus;
  refs: TopicReference[];
  error_message: string | null;
  updated_at: string;
}

/** Fetch a cached references row for a topic, or null if none exists. */
export async function fetchTopicReferences(
  topicId: string,
): Promise<TopicReferenceRow | null> {
  const { data, error } = await supabase
    .from("topic_references")
    .select("topic_id, topic_title, section, status, refs, error_message, updated_at")
    .eq("topic_id", topicId)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as TopicReferenceRow | null) ?? null;
}

/** Fetch reference counts for a set of topic ids in one query. */
export async function fetchReferenceCounts(
  topicIds: string[],
): Promise<Record<string, number>> {
  if (topicIds.length === 0) return {};
  const { data, error } = await supabase
    .from("topic_references")
    .select("topic_id, status, refs")
    .in("topic_id", topicIds);
  if (error) throw error;
  const out: Record<string, number> = {};
  for (const row of (data ?? []) as Array<{
    topic_id: string;
    status: string;
    refs: unknown;
  }>) {
    if (row.status === "ready" && Array.isArray(row.refs)) {
      out[row.topic_id] = row.refs.length;
    }
  }
  return out;
}

/** Invoke the edge function to generate or refresh references. */
export async function generateTopicReferences(args: {
  topicId: string;
  topicTitle: string;
  section: string;
  force?: boolean;
}): Promise<{ status: TopicReferenceStatus; refs: TopicReference[] }> {
  const { data, error } = await supabase.functions.invoke(
    "generate-topic-references",
    { body: args },
  );
  if (error) throw new Error(error.message || "Failed to generate references");
  return data as { status: TopicReferenceStatus; refs: TopicReference[] };
}

/** Format a single reference in BJA Education / Vancouver style. */
export function formatReference(r: TopicReference): string {
  const parts: string[] = [];
  parts.push(`${r.authors}.`);
  parts.push(`${r.title}.`);
  let tail = `${r.journal} ${r.year}`;
  if (r.volume) {
    tail += `;${r.volume}`;
    if (r.issue) tail += `(${r.issue})`;
  }
  if (r.pages) tail += `:${r.pages}`;
  parts.push(`${tail}.`);
  return parts.join(" ");
}
