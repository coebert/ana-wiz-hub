/**
 * Bulk podcast re-record queue.
 *
 * Re-records existing topic episodes with the real (ElevenLabs) regional
 * voices, and refreshes their scripts so updated topic content is spoken.
 *
 * The admin page creates and monitors jobs; a protected server worker reads
 * complete topic text from the build-time corpus and processes each episode.
 * The run therefore continues when the page closes or the device sleeps.
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
  batch_size: number;
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

/** Topics that have a podcast page and can be re-recorded. */
export const rerecordableTopics = (): Array<{ id: string; title: string; path: string }> =>
  allTopics
    .filter((t) => t.available)
    .map((t) => ({
      id: t.id,
      title: t.title,
      path: `${sectionMeta[t.section].path}/${t.id}`,
    }));

export const createRerecordJob = async (
  voices: string[],
  batchSize = DEFAULT_BATCH_SIZE,
): Promise<RerecordJob> => {
  const chosen = voices.filter(isPodcastVoiceId).slice(0, MAX_JOB_VOICES);
  if (chosen.length === 0) throw new Error("Pick at least one accent.");

  const topics = rerecordableTopics();
  const { data: job, error } = await supabase
    .from("podcast_rerecord_jobs")
    .insert({
      voices: chosen,
      status: "running",
      total: topics.length * chosen.length,
      batch_size: Math.max(1, Math.min(20, batchSize)),
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

export interface RerecordRequest {
  topicId: string;
  topicTitle: string;
  topicPath: string;
  voice: string;
}

/**
 * Create a job for an explicit list of (topic, accent) pairs — used by the
 * listener queue, where only the specific episodes someone queued but that
 * have never been recorded need generating. Same durable worker, same one-at-
 * a-time safety rules as a full re-record run.
 */
export const createRerecordJobForRequests = async (
  requests: RerecordRequest[],
  batchSize = DEFAULT_BATCH_SIZE,
): Promise<RerecordJob> => {
  // Collapse duplicates and drop anything with an unknown accent.
  const seen = new Set<string>();
  const items = requests.filter((r) => {
    if (!isPodcastVoiceId(r.voice)) return false;
    const key = `${r.topicId}::${r.voice}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  if (items.length === 0) throw new Error("Nothing to record.");

  const voices = [...new Set(items.map((i) => i.voice))];
  const { data: job, error } = await supabase
    .from("podcast_rerecord_jobs")
    .insert({
      voices,
      status: "running",
      total: items.length,
      batch_size: Math.max(1, Math.min(20, batchSize)),
    })
    .select()
    .single();
  if (error || !job) throw new Error(error?.message ?? "Could not start recording.");

  const { error: itemErr } = await supabase.from("podcast_rerecord_items").insert(
    items.map((i) => ({
      job_id: job.id,
      topic_id: i.topicId,
      topic_title: i.topicTitle,
      topic_path: i.topicPath,
      voice: i.voice,
    })),
  );
  if (itemErr) throw new Error(itemErr.message);
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

  if (!paused) await wakeRerecordWorker(jobId);
};

/** Wake the protected server worker. The caller's session proves admin access. */
export const wakeRerecordWorker = async (jobId: string): Promise<void> => {
  const { error } = await supabase.functions.invoke("process-podcast-rerecord", {
    body: { action: "process", jobId },
  });
  if (error) throw new Error(error.message);
};

export const cancelJob = async (jobId: string): Promise<void> => {
  await supabase
    .from("podcast_rerecord_jobs")
    .update({ status: "cancelled", paused: true, paused_reason: "Cancelled by admin" })
    .eq("id", jobId);
};

