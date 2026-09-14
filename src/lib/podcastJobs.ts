/**
 * Global podcast generation registry.
 *
 * Podcast generation runs server-side (the edge function finishes its work in
 * the background), but the *client* used to lose track of a run as soon as the
 * topic page unmounted — navigating away killed the polling loop and the UI
 * showed nothing until the user came back.
 *
 * This module holds generation jobs at module scope, outside the React tree,
 * so a run started on one topic page keeps polling while the user reads other
 * pages. Components subscribe via the hooks below; a floating indicator shows
 * progress app-wide and links back to the originating topic.
 */
import { useSyncExternalStore } from "react";
import {
  fetchPodcast,
  generatePodcast,
  isStaleGenerating,
  pollPodcastUntilDone,
  type PodcastResult,
} from "@/lib/podcast";

export type PodcastJobStatus = "generating" | "ready" | "failed";

export interface PodcastJob {
  topicId: string;
  topicTitle: string;
  /** Route the generation was started from, so the indicator can link back. */
  topicPath: string;
  startedAt: number;
  finishedAt?: number;
  status: PodcastJobStatus;
  /** Latest server row state seen while polling. */
  lastStatus: "generating" | "pending" | "unknown";
  /** True when this browser session kicked the run off (vs attaching to it). */
  ownedBySession: boolean;
  result?: PodcastResult;
  /** Set once the user dismisses a finished job from the indicator. */
  dismissed?: boolean;
}

const jobs = new Map<string, PodcastJob>();
const listeners = new Set<() => void>();
let snapshot: PodcastJob[] = [];

const emit = () => {
  snapshot = Array.from(jobs.values());
  listeners.forEach((l) => l());
};

const setJob = (topicId: string, patch: Partial<PodcastJob>) => {
  const prev = jobs.get(topicId);
  if (!prev) return;
  jobs.set(topicId, { ...prev, ...patch });
  emit();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => snapshot;

/** All known jobs (generating + recently finished). */
export const usePodcastJobs = (): PodcastJob[] =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

/** The job for one topic, if any. */
export const usePodcastJob = (topicId: string): PodcastJob | undefined =>
  useSyncExternalStore(
    subscribe,
    () => jobs.get(topicId),
    () => jobs.get(topicId),
  );

export const getPodcastJob = (topicId: string): PodcastJob | undefined => jobs.get(topicId);

export const dismissPodcastJob = (topicId: string) => {
  const job = jobs.get(topicId);
  if (!job || job.status === "generating") return;
  setJob(topicId, { dismissed: true });
};

/** Drop a finished job so a later run starts clean. */
export const clearPodcastJob = (topicId: string) => {
  const job = jobs.get(topicId);
  if (!job || job.status === "generating") return;
  jobs.delete(topicId);
  emit();
};

const onTick = (topicId: string) => (r: PodcastResult | null) =>
  setJob(topicId, {
    lastStatus: (r?.status as "generating" | "pending" | undefined) ?? "unknown",
  });

const finish = (topicId: string, result: PodcastResult) => {
  setJob(topicId, {
    status: result.status === "ready" ? "ready" : "failed",
    result,
    finishedAt: Date.now(),
    lastStatus: "unknown",
  });
};

interface StartOptions {
  topicId: string;
  topicTitle: string;
  topicPath: string;
  content: string;
  force?: boolean;
  regeneratePassword?: string;
  /** Narrator preset id (see src/lib/podcastVoices.ts). */
  voiceId?: string;
}

const createJob = (
  topicId: string,
  topicTitle: string,
  topicPath: string,
  ownedBySession: boolean,
): PodcastJob => {
  const job: PodcastJob = {
    topicId,
    topicTitle,
    topicPath,
    startedAt: Date.now(),
    status: "generating",
    lastStatus: "generating",
    ownedBySession,
  };
  jobs.set(topicId, job);
  emit();
  return job;
};

/**
 * Start (or join) a generation run for a topic. Resolves when the run reaches
 * a terminal state, but the run continues independently of the caller — the
 * job stays in the registry even if the calling component unmounts.
 */
export const startPodcastJob = async (opts: StartOptions): Promise<PodcastResult> => {
  const { topicId, topicTitle, topicPath, content, force, regeneratePassword, voiceId } = opts;

  const existing = jobs.get(topicId);
  if (existing && existing.status === "generating" && !force) {
    // Already running in this session — no second invocation.
    return { status: "generating" };
  }

  createJob(topicId, topicTitle, topicPath, true);

  try {
    if (!force) {
      // Episodes are cached per (topic, voice), so check the row for the
      // requested accent specifically.
      const current = await fetchPodcast(topicId, voiceId);
      if (current?.status === "ready") {
        finish(topicId, { ...current, cached: true });
        return current;
      }
      if (current?.status === "generating" && !isStaleGenerating(current)) {
        const polled = await pollPodcastUntilDone(topicId, { voiceId, onTick: onTick(topicId) });
        finish(topicId, polled);
        return polled;
      }
    }

    let result = await generatePodcast(topicId, topicTitle, content, {
      force,
      regeneratePassword,
      voiceId,
    });

    // The edge function keeps working after the HTTP request times out, so a
    // failed/generating response doesn't mean the run died — check the row.
    if (result.status === "failed" || result.status === "generating") {
      const current = await fetchPodcast(topicId, voiceId);
      if (current && (current.status === "generating" || current.status === "ready")) {
        if (current.status === "ready") {
          finish(topicId, current);
          return current;
        }
        result = await pollPodcastUntilDone(topicId, { voiceId, onTick: onTick(topicId) });
      }
    }

    finish(topicId, result);
    return result;
  } catch (err) {
    const failed: PodcastResult = {
      status: "failed",
      error: err instanceof Error ? err.message : "Podcast generation failed",
    };
    finish(topicId, failed);
    return failed;
  }
};

/**
 * Attach to a generation already running on the server (started in another
 * tab, or by a previous visit). Polls in the background like a normal job.
 */
export const attachPodcastJob = async (
  topicId: string,
  topicTitle: string,
  topicPath: string,
): Promise<PodcastResult> => {
  const existing = jobs.get(topicId);
  if (existing && existing.status === "generating") return { status: "generating" };

  createJob(topicId, topicTitle, topicPath, false);
  const polled = await pollPodcastUntilDone(topicId, { onTick: onTick(topicId) });
  finish(topicId, polled);
  return polled;
};

export const podcastJobElapsedSec = (job: PodcastJob): number =>
  Math.max(0, Math.floor(((job.finishedAt ?? Date.now()) - job.startedAt) / 1000));
