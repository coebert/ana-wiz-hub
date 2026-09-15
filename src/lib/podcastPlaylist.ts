import { useSyncExternalStore } from "react";

/**
 * Shared podcast queue. Stores an ordered list of topic ids in localStorage so
 * the queue survives navigation and reloads, and so the library page and the
 * playlist page stay in sync (including across tabs).
 */
const STORAGE_KEY = "podcasts:queue";

/**
 * Each topic can now have one recording per narrator accent, so a queue entry
 * must identify the (topic, voice) pair — not just the topic. Legacy entries
 * saved before this change are bare topic ids and still resolve to the first
 * available recording for that topic.
 */
export const episodeKey = (topicId: string, voice?: string | null): string =>
  voice ? `${topicId}::${voice}` : topicId;

export const parseEpisodeKey = (key: string): { topicId: string; voice?: string } => {
  const idx = key.indexOf("::");
  if (idx === -1) return { topicId: key };
  return { topicId: key.slice(0, idx), voice: key.slice(idx + 2) };
};

let queue: string[] = load();
const listeners = new Set<() => void>();

function load(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function commit(next: string[]) {
  queue = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage may be full or blocked — keep the in-memory queue */
  }
  listeners.forEach((l) => l());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key !== STORAGE_KEY) return;
    queue = load();
    listeners.forEach((l) => l());
  });
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => queue;
const getServerSnapshot = () => [] as string[];

/** Reactive read of the current queue (ordered topic ids). */
export const usePodcastQueue = (): string[] =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export const getPodcastQueue = (): string[] => queue;

export const isQueued = (topicId: string): boolean => queue.includes(topicId);

export const addToQueue = (topicId: string) => {
  if (queue.includes(topicId)) return;
  commit([...queue, topicId]);
};

export const removeFromQueue = (topicId: string) => {
  if (!queue.includes(topicId)) return;
  commit(queue.filter((id) => id !== topicId));
};

export const toggleQueued = (topicId: string) => {
  if (queue.includes(topicId)) removeFromQueue(topicId);
  else addToQueue(topicId);
};

export const moveInQueue = (topicId: string, delta: number) => {
  const idx = queue.indexOf(topicId);
  if (idx === -1) return;
  const target = idx + delta;
  if (target < 0 || target >= queue.length) return;
  const next = [...queue];
  [next[idx], next[target]] = [next[target], next[idx]];
  commit(next);
};

export const setQueue = (ids: string[]) => commit([...new Set(ids)]);

export const clearQueue = () => commit([]);
