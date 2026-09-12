import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type OverrideKind = "note" | "correction" | "subsection" | "key_point" | "reference";
export type OverrideStatus = "draft" | "live" | "merged" | "archived";

export interface ContentOverride {
  id: string;
  topic_id: string;
  topic_title: string;
  kind: OverrideKind;
  anchor: string | null;
  heading: string | null;
  body: string;
  original_text: string | null;
  ref_label: string | null;
  ref_url: string | null;
  ref_pmid: string | null;
  ref_excerpt: string | null;
  position: number;
  status: OverrideStatus;
  queued: boolean;
  created_at: string;
  updated_at: string;
}

const TABLE = "content_overrides";

/**
 * Live (published) admin edits for one topic. These render on top of the
 * built-in page content — added notes, corrections, extra subsections,
 * extra key learning points and extra references.
 */
export const useLiveContentOverrides = (topicId: string) => {
  const [overrides, setOverrides] = useState<ContentOverride[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("topic_id", topicId)
        .eq("status", "live")
        .order("position", { ascending: true })
        .order("created_at", { ascending: true });
      if (cancelled || error || !data) return;
      setOverrides(data as unknown as ContentOverride[]);
    })();
    return () => {
      cancelled = true;
    };
  }, [topicId]);

  return {
    all: overrides,
    blocks: overrides.filter((o) => o.kind === "note" || o.kind === "correction" || o.kind === "subsection"),
    keyPoints: overrides.filter((o) => o.kind === "key_point"),
    references: overrides.filter((o) => o.kind === "reference"),
  };
};

/** All edits (any status) — admin only, enforced by row-level security. */
export const fetchAllOverrides = async (topicId?: string) => {
  let query = supabase.from(TABLE).select("*").order("updated_at", { ascending: false });
  if (topicId) query = query.eq("topic_id", topicId);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as ContentOverride[];
};
