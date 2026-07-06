import { useEffect, useState, useCallback } from "react";

/**
 * Track topics the user has recently opened. Stored device-locally so the
 * home page can surface a "Continue where you left off" band without any
 * auth/backend dependency.
 */
const STORAGE_KEY = "anaesthesia-core-recent-topics";
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
export function recordRecentTopic(topicId: string) {
  const now = Date.now();
  const existing = readRecent().filter((e) => e.topicId !== topicId);
  const next = [{ topicId, visitedAt: now }, ...existing].slice(0, MAX_RECENT);
  writeRecent(next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("recent-topics-updated"));
  }
}

/** Hook: automatically record the visit on mount. */
export function useRecordRecentTopic(topicId: string | undefined) {
  useEffect(() => {
    if (!topicId) return;
    recordRecentTopic(topicId);
  }, [topicId]);
}

/** Hook: read the current list, kept in sync across the page. */
export function useRecentTopics(): RecentTopicEntry[] {
  const [entries, setEntries] = useState<RecentTopicEntry[]>(() => readRecent());

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

  return entries;
}
