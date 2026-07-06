import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

/**
 * Track topics the user has recently opened. Uses localStorage as the
 * source of truth for anonymous users and mirrors to
 * `public.user_recent_topics` when a user is signed in. On first sign-in
 * local entries are merged with cloud entries (union, latest visit wins)
 * and uploaded once.
 */
const STORAGE_KEY = "anaesthesia-core-recent-topics";
const MIGRATED_FLAG = "anaesthesia-core-recent-topics-cloud-migrated";
const MAX_RECENT = 12;

export interface RecentTopicEntry {
  topicId: string;
  visitedAt: number;
}

function readRecent(): RecentTopicEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e): e is RecentTopicEntry =>
        e && typeof e.topicId === "string" && typeof e.visitedAt === "number"
    );
  } catch {
    return [];
  }
}

function writeRecent(entries: RecentTopicEntry[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* ignore quota errors */
  }
}

/** Record a topic visit. Deduplicates and caps the list. */
export function recordRecentTopic(topicId: string, userId?: string | null) {
  const now = Date.now();
  const existing = readRecent().filter((e) => e.topicId !== topicId);
  const next = [{ topicId, visitedAt: now }, ...existing].slice(0, MAX_RECENT);
  writeRecent(next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("recent-topics-updated"));
  }
  if (userId) {
    supabase
      .from("user_recent_topics")
      .upsert({ user_id: userId, topic_id: topicId, visited_at: new Date(now).toISOString() })
      .then(({ error }) => {
        if (error) console.warn("[recent-topics] cloud upsert failed", error);
      });
  }
}

/** Hook: automatically record the visit on mount. */
export function useRecordRecentTopic(topicId: string | undefined) {
  const { user } = useAuth();
  useEffect(() => {
    if (!topicId) return;
    recordRecentTopic(topicId, user?.id ?? null);
  }, [topicId, user]);
}

/** Hook: read the current list, kept in sync across the page + cloud. */
export function useRecentTopics(): RecentTopicEntry[] {
  const { user } = useAuth();
  const [entries, setEntries] = useState<RecentTopicEntry[]>(() => readRecent());
  const syncedUserRef = useRef<string | null>(null);

  const refresh = useCallback(() => setEntries(readRecent()), []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("recent-topics-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("recent-topics-updated", refresh);
    };
  }, [refresh]);

  // Cloud hydration on sign-in — merge with local (latest visit wins), cap,
  // and upload local-only rows once.
  useEffect(() => {
    if (!user) {
      syncedUserRef.current = null;
      return;
    }
    if (syncedUserRef.current === user.id) return;
    syncedUserRef.current = user.id;

    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("user_recent_topics")
        .select("topic_id, visited_at")
        .eq("user_id", user.id)
        .order("visited_at", { ascending: false })
        .limit(MAX_RECENT);
      if (cancelled || error) return;

      const cloud: RecentTopicEntry[] = (data ?? []).map((r) => ({
        topicId: r.topic_id,
        visitedAt: new Date(r.visited_at as unknown as string).getTime(),
      }));
      const local = readRecent();
      const merged = mergeRecentEntries(cloud, local, MAX_RECENT);
      writeRecent(merged);
      setEntries(merged);

      const migrationKey = `${MIGRATED_FLAG}:${user.id}`;
      if (!localStorage.getItem(migrationKey)) {
        const cloudIds = new Set(cloud.map((c) => c.topicId));
        const toUpload = local.filter((e) => !cloudIds.has(e.topicId));
        if (toUpload.length > 0) {
          await supabase.from("user_recent_topics").upsert(
            toUpload.map((e) => ({
              user_id: user.id,
              topic_id: e.topicId,
              visited_at: new Date(e.visitedAt).toISOString(),
            }))
          );
        }
        localStorage.setItem(migrationKey, "1");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  return entries;
}
