/**
 * Bulk podcast re-record queue.
 *
 * Re-records existing topic episodes with the real (ElevenLabs) regional
 * voices, and refreshes their scripts so updated topic content is spoken.
 *
 * Why the browser drives it: podcast scripts are built from the *rendered*
 * topic page (see extractTopicContent). Topic pages are client-rendered, so
 * only a browser can produce the text. The queue therefore lives in the
 * database (resumable, idempotent, watchable) while a bounded runner in the
 * admin page loads each topic in an off-screen iframe, extracts its current
 * content, and asks generate-podcast for one episode at a time.
 *
 * Safety rules mirrored from the background-job contract:
 *  • one item in flight at a time (no fan-out, no parallel AI calls)
 *  • every item's outcome is written to the database as it completes, so a
 *    re-run skips finished work instead of paying for it twice
 *  • pause is persisted on the job row and re-checked before every item
 *  • credit/rate errors (402/403/429-shaped) pause the whole job instead of
 *    marching through the remaining thousands of items
 *  • existing episodes stay playable until their replacement is uploaded
 */
import { supabase } from "@/integrations/supabase/client";
import { allTopics, sectionMeta } from "@/data/curriculum";
import { extractTopicContent, generatePodcast, EXTRACTION_MIN_CHARS } from "@/lib/podcast";
import { isPodcastVoiceId } from "@/lib/podcastVoices";

export interface RerecordJob {
  id: string;
  status: string;
  voices: string[];
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  skipped: number;
  current_topic: string | null;
  current_voice: string | null;
  last_error: string | null;
  paused: boolean;
  paused_reason: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface RerecordItem {
  id: string;
  job_id: string;
  topic_id: string;
  topic_title: string;
  topic_path: string;
  voice: string;
  status: string;
  attempts: number;
  error_message: string | null;
}

/** Hard ceiling on accents per job — a handful, deliberately, not all 98. */
export const MAX_JOB_VOICES = 5;

/** Episodes attempted per batch before the runner takes a breather. */
export const DEFAULT_BATCH_SIZE = 8;
export const BATCH_SIZE_OPTIONS = [4, 8, 12, 20] as const;

/** Pause between batches — keeps both services gentle and lets the UI catch up. */
const BATCH_COOLDOWN_MS = 15_000;

/**
 * Wall-clock budget for a single episode. A very long topic that cannot be read
 * or recorded in this window is failed and skipped, so the queue keeps moving
 * instead of stalling behind it.
 */
const ITEM_TIME_BUDGET_MS = 8 * 60_000;

/** Attempts allowed per episode before it is written off as failed. */
const MAX_ITEM_ATTEMPTS = 3;

/**
 * Topic text read this session, keyed by topic id. Re-recording the same topic
 * in a second accent then needs no page read at all — fewer iframe loads means
 * far fewer chances to stall.
 */
const contentCache = new Map<string, string>();

/**
 * Ask the device to keep the screen awake while a run is in flight. Mobile
 * browsers suspend background/locked tabs outright, which is what makes a run
 * appear to stall. Returns a release function; a no-op where unsupported.
 */
export const keepAwake = async (): Promise<() => void> => {
  interface WakeLockNav {
    wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> };
  }
  const lockApi = (navigator as unknown as WakeLockNav).wakeLock;
  if (!lockApi) return () => {};
  try {
    let sentinel = await lockApi.request("screen");
    const reacquire = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        sentinel = await lockApi.request("screen");
      } catch {
        /* ignore — best effort */
      }
    };
    document.addEventListener("visibilitychange", reacquire);
    return () => {
      document.removeEventListener("visibilitychange", reacquire);
      void sentinel.release().catch(() => {});
    };
  } catch {
    return () => {};
  }
};

const withTimeout = async <T>(work: Promise<T>, ms: number, label: string): Promise<T> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      work,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`${label} took too long — skipped.`)), ms);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
};

/** Topics that have a podcast page and can be re-recorded. */
export const rerecordableTopics = (): Array<{ id: string; title: string; path: string }> =>
  allTopics
    .filter((t) => t.available)
    .map((t) => ({
      id: t.id,
      title: t.title,
      path: `${sectionMeta[t.section].path}/${t.id}`,
    }));

/** Errors that must stop the whole run rather than just the current item. */
const isCircuitBreaker = (message: string): boolean =>
  /credit|insufficient|payment required|402|403|quota|disabled|unauthor/i.test(message);

const isRateLimited = (message: string): boolean => /rate.?limit|429|too many/i.test(message);

export const createRerecordJob = async (voices: string[]): Promise<RerecordJob> => {
  const chosen = voices.filter(isPodcastVoiceId).slice(0, MAX_JOB_VOICES);
  if (chosen.length === 0) throw new Error("Pick at least one accent.");

  const topics = rerecordableTopics();
  const { data: job, error } = await supabase
    .from("podcast_rerecord_jobs")
    .insert({
      voices: chosen,
      status: "running",
      total: topics.length * chosen.length,
    })
    .select()
    .single();
  if (error || !job) throw new Error(error?.message ?? "Could not create the queue.");

  // Items are inserted in chunks — one row per topic-and-accent.
  const rows = topics.flatMap((t) =>
    chosen.map((voice) => ({
      job_id: job.id,
      topic_id: t.id,
      topic_title: t.title,
      topic_path: t.path,
      voice,
    })),
  );
  for (let i = 0; i < rows.length; i += 500) {
    const { error: itemErr } = await supabase
      .from("podcast_rerecord_items")
      .insert(rows.slice(i, i + 500));
    if (itemErr) throw new Error(itemErr.message);
  }
  return job as RerecordJob;
};

export const fetchLatestJob = async (): Promise<RerecordJob | null> => {
  const { data } = await supabase
    .from("podcast_rerecord_jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as RerecordJob | null) ?? null;
};

export const fetchJob = async (id: string): Promise<RerecordJob | null> => {
  const { data } = await supabase
    .from("podcast_rerecord_jobs")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return (data as RerecordJob | null) ?? null;
};

export const fetchItems = async (jobId: string, limit = 400): Promise<RerecordItem[]> => {
  const { data } = await supabase
    .from("podcast_rerecord_items")
    .select("*")
    .eq("job_id", jobId)
    .order("updated_at", { ascending: false })
    .limit(limit);
  return (data as RerecordItem[] | null) ?? [];
};

export const setJobPaused = async (
  jobId: string,
  paused: boolean,
  reason?: string,
): Promise<void> => {
  await supabase
    .from("podcast_rerecord_jobs")
    .update({
      paused,
      paused_reason: paused ? (reason ?? "Paused by admin") : null,
      status: paused ? "paused" : "running",
    })
    .eq("id", jobId);
};

export const cancelJob = async (jobId: string): Promise<void> => {
  await supabase
    .from("podcast_rerecord_jobs")
    .update({ status: "cancelled", paused: true, paused_reason: "Cancelled by admin" })
    .eq("id", jobId);
};

/** Load a topic page off-screen and read its current spoken content. */
const extractViaIframe = async (path: string, timeoutMs = 45_000): Promise<string> => {
  const frame = document.createElement("iframe");
  frame.setAttribute("title", "podcast content extraction");
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText =
    "position:fixed;left:-10000px;top:0;width:1200px;height:2400px;border:0;opacity:0.01;pointer-events:none";
  frame.src = `${path}?podcast-extract=1`;
  document.body.appendChild(frame);

  try {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 1200));
      const doc = frame.contentDocument;
      if (!doc || doc.readyState !== "complete") continue;
      const { content } = extractTopicContent(doc);
      if (content.length > EXTRACTION_MIN_CHARS) {
        // Give lazy sections one more beat, then take the fuller read.
        await new Promise((r) => setTimeout(r, 1500));
        const again = extractTopicContent(frame.contentDocument ?? doc);
        return again.content.length > content.length ? again.content : content;
      }
    }
    throw new Error("Could not read the topic page content (timed out).");
  } finally {
    frame.remove();
  }
};

export interface RunnerCallbacks {
  onProgress?: (job: RerecordJob) => void;
  onItem?: (item: RerecordItem, outcome: "done" | "failed" | "skipped") => void;
  onLog?: (line: string) => void;
}

/**
 * Items stuck in "running" (tab closed, refresh, crash) are resolved here:
 * marked done when the episode is actually ready, otherwise re-queued.
 */
const reclaimStaleItems = async (jobId: string, cb: RunnerCallbacks = {}): Promise<void> => {
  const { data: stale } = await supabase
    .from("podcast_rerecord_items")
    .select("*")
    .eq("job_id", jobId)
    .eq("status", "running");

  for (const raw of (stale ?? []) as RerecordItem[]) {
    const { data: episode } = await supabase
      .from("podcasts")
      .select("status, audio_path, regenerating")
      .eq("topic_id", raw.topic_id)
      .eq("voice", raw.voice)
      .maybeSingle();

    const landed =
      !!episode && episode.status === "ready" && !!episode.audio_path && !episode.regenerating;

    if (landed) {
      await supabase
        .from("podcast_rerecord_items")
        .update({ status: "done", completed_at: new Date().toISOString(), error_message: null })
        .eq("id", raw.id);
      const job = await fetchJob(jobId);
      if (job) {
        await supabase
          .from("podcast_rerecord_jobs")
          .update({ processed: job.processed + 1, succeeded: job.succeeded + 1 })
          .eq("id", jobId);
      }
      cb.onLog?.(`Recovered ${raw.topic_title} — ${raw.voice} (already recorded).`);
    } else {
      await supabase
        .from("podcast_rerecord_items")
        .update({ status: "pending", started_at: null })
        .eq("id", raw.id);
      cb.onLog?.(`Re-queued ${raw.topic_title} — ${raw.voice} (interrupted).`);
    }
  }
};


/**
 * Process pending items one small batch at a time until the queue drains, the
 * job is paused/cancelled, or `signal.stopped` flips. Each batch attempts at
 * most `batchSize` episodes, alternating accents so one accent (or one very
 * long topic) cannot hold the whole run up, then rests before the next batch.
 * Safe to call again later — it only ever picks up items still marked pending.
 */
export const runRerecordQueue = async (
  jobId: string,
  regeneratePassword: string,
  signal: { stopped: boolean },
  cb: RunnerCallbacks = {},
  options: { batchSize?: number } = {},
): Promise<void> => {
  let rateLimitStrikes = 0;
  const batchSize = Math.max(1, Math.min(50, options.batchSize ?? DEFAULT_BATCH_SIZE));
  let batchNumber = 1;
  let inBatch = 0;
  let lastVoice: string | null = null;

  // Recover items left mid-flight by a closed tab or refresh: if the recording
  // actually landed, count it; otherwise put it back in the queue.
  await reclaimStaleItems(jobId, cb);

  cb.onLog?.(`Batch ${batchNumber} starting — up to ${batchSize} episodes.`);

  for (;;) {
    if (signal.stopped) return;

    const job = await fetchJob(jobId);
    if (!job) return;
    // Paused-state guard: re-read before every item, never march past a pause.
    if (job.paused || job.status === "cancelled" || job.status === "complete") {
      cb.onProgress?.(job);
      return;
    }

    // Batch boundary: rest, then keep going with a fresh batch.
    if (inBatch >= batchSize) {
      cb.onLog?.(`Batch ${batchNumber} finished (${inBatch} episodes). Pausing briefly…`);
      await new Promise((r) => setTimeout(r, BATCH_COOLDOWN_MS));
      if (signal.stopped) return;
      inBatch = 0;
      batchNumber += 1;
      cb.onLog?.(`Batch ${batchNumber} starting — up to ${batchSize} episodes.`);
      continue;
    }

    // Take a small window of pending work and prefer a different accent from
    // the last episode, so accents progress side by side.
    const { data: candidates } = await supabase
      .from("podcast_rerecord_items")
      .select("*")
      .eq("job_id", jobId)
      .eq("status", "pending")
      .order("created_at", { ascending: true })
      .limit(40);

    const pending = (candidates ?? []) as RerecordItem[];
    const next = pending.find((p) => p.voice !== lastVoice) ?? pending[0] ?? null;

    if (!next) {
      await supabase
        .from("podcast_rerecord_jobs")
        .update({ status: "complete", completed_at: new Date().toISOString(), current_topic: null, current_voice: null })
        .eq("id", jobId);
      const done = await fetchJob(jobId);
      if (done) cb.onProgress?.(done);
      return;
    }

    const item = next as RerecordItem;
    inBatch += 1;
    lastVoice = item.voice;
    // Claim the item first, so a second tab cannot double-spend on it.
    await supabase
      .from("podcast_rerecord_items")
      .update({ status: "running", attempts: item.attempts + 1, started_at: new Date().toISOString() })
      .eq("id", item.id)
      .eq("status", "pending");

    await supabase
      .from("podcast_rerecord_jobs")
      .update({ current_topic: item.topic_title, current_voice: item.voice })
      .eq("id", jobId);
    cb.onLog?.(`Recording ${item.topic_title} — ${item.voice}…`);

    let outcome: "done" | "failed" | "skipped" = "failed";
    let errorMessage: string | null = null;

    try {
      // Per-episode budget: an unusually long topic is skipped rather than
      // allowed to hold the rest of the batch (and the run) up.
      const attempt = await withTimeout(
        (async (): Promise<{ ok: boolean; error: string | null }> => {
          const cached = contentCache.get(item.topic_id);
          const content = cached ?? (await extractViaIframe(item.topic_path));
          contentCache.set(item.topic_id, content);
          const result = await generatePodcast(item.topic_id, item.topic_title, content, {
            force: true,
            regeneratePassword,
            voiceId: item.voice,
            preserveExisting: true,
          });

          if (result.status === "failed") {
            return { ok: false, error: result.error ?? "Generation failed." };
          }
          if (result.status === "ready") return { ok: true, error: null };

          // Generation continues server-side; wait for the row to settle.
          const settled = await waitForEpisode(item.topic_id, item.voice, signal);
          return settled === "ready" ? { ok: true, error: null } : { ok: false, error: settled };
        })(),
        ITEM_TIME_BUDGET_MS,
        `${item.topic_title} — ${item.voice}`,
      );
      outcome = attempt.ok ? "done" : "failed";
      errorMessage = attempt.error;
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : String(err);
    }

    // A timed-out or unreadable episode is usually the page being interrupted,
    // not a bad topic — put it back in the queue for another go later.
    const transient =
      !!errorMessage && /took too long|timed out|network|fetch|load/i.test(errorMessage);
    const requeue =
      outcome !== "done" && transient && item.attempts + 1 < MAX_ITEM_ATTEMPTS;

    await supabase
      .from("podcast_rerecord_items")
      .update(
        requeue
          ? { status: "pending", started_at: null, error_message: errorMessage }
          : {
              status: outcome === "done" ? "done" : "failed",
              error_message: errorMessage,
              completed_at: new Date().toISOString(),
            },
      )
      .eq("id", item.id);

    const fresh = await fetchJob(jobId);
    if (fresh && !requeue) {
      await supabase
        .from("podcast_rerecord_jobs")
        .update({
          processed: fresh.processed + 1,
          succeeded: fresh.succeeded + (outcome === "done" ? 1 : 0),
          failed: fresh.failed + (outcome === "done" ? 0 : 1),
          last_error: errorMessage,
        })
        .eq("id", jobId);
    } else if (fresh) {
      await supabase
        .from("podcast_rerecord_jobs")
        .update({ last_error: errorMessage })
        .eq("id", jobId);
    }

    cb.onItem?.(item, outcome);
    cb.onLog?.(
      outcome === "done"
        ? `✓ ${item.topic_title} — ${item.voice}`
        : `✕ ${item.topic_title} — ${item.voice}: ${errorMessage}`,
    );

    const updated = await fetchJob(jobId);
    if (updated) cb.onProgress?.(updated);

    if (errorMessage && isCircuitBreaker(errorMessage)) {
      await setJobPaused(jobId, true, `Stopped automatically: ${errorMessage}`);
      cb.onLog?.("Queue paused automatically — the voice or AI service refused the request.");
      return;
    }
    if (errorMessage && isRateLimited(errorMessage)) {
      rateLimitStrikes += 1;
      if (rateLimitStrikes >= 3) {
        await setJobPaused(jobId, true, "Stopped automatically after repeated rate limits.");
        cb.onLog?.("Queue paused automatically — too many requests too quickly.");
        return;
      }
      await new Promise((r) => setTimeout(r, 60_000));
    } else if (!errorMessage) {
      rateLimitStrikes = 0;
    }

    // Cooldown between episodes — keeps the pipeline gentle on both services.
    await new Promise((r) => setTimeout(r, 4000));
  }
};

/** Poll one episode row until it settles. Returns "ready" or an error string. */
const waitForEpisode = async (
  topicId: string,
  voice: string,
  signal: { stopped: boolean },
  timeoutMs = 20 * 60 * 1000,
): Promise<string> => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (signal.stopped) return "Stopped before this episode finished.";
    await new Promise((r) => setTimeout(r, 8000));
    const { data } = await supabase
      .from("podcasts")
      .select("status, regenerating, audio_path, error_message, updated_at")
      .eq("topic_id", topicId)
      .eq("voice", voice)
      .maybeSingle();
    if (!data) continue;
    if (data.regenerating) continue;
    if (data.status === "ready" && data.audio_path) return "ready";
    if (data.status === "failed") return data.error_message ?? "Generation failed.";
  }
  return "Timed out waiting for this episode.";
};
