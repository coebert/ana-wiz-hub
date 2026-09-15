import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import corpusData from "./topic-corpus.json" with { type: "json" };

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-internal-token",
};
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const MAX_ATTEMPTS = 3;
const POLL_MS = 8_000;
const POLL_BUDGET_MS = 110_000;
const RequestSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("process"), jobId: z.string().uuid() }),
  z.object({ action: z.literal("watchdog") }),
]);

interface CorpusEntry {
  topic_id: string;
  topic_title: string;
  text: string;
}

interface QueueItem {
  id: string;
  job_id: string;
  topic_id: string;
  topic_title: string;
  voice: string;
  attempts: number;
  started_at: string | null;
}

const CORPUS = new Map(
  ((corpusData as { entries?: CorpusEntry[] }).entries ?? []).map((entry) => [entry.topic_id, entry]),
);
const admin = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function isAuthorised(req: Request): Promise<boolean> {
  if (req.headers.get("x-internal-token") === SERVICE_ROLE) return true;
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return false;
  const userClient = createClient(SUPABASE_URL, ANON_KEY, { auth: { persistSession: false } });
  const token = authHeader.replace(/^Bearer\s+/i, "");
  const { data, error } = await userClient.auth.getUser(token);
  if (error || !data.user?.id) return false;
  const { data: role } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", data.user.id)
    .eq("role", "admin")
    .maybeSingle();
  return !!role;
}

async function selfChain(jobId: string, delayMs = 3_000): Promise<void> {
  await sleep(delayMs);
  const response = await fetch(`${SUPABASE_URL}/functions/v1/process-podcast-rerecord`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE}`,
      apikey: SERVICE_ROLE,
      "x-internal-token": SERVICE_ROLE,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "process", jobId }),
  });
  if (!response.ok) console.error(`[podcast-rerecord] self-chain failed: ${response.status}`);
}

async function settleItem(item: QueueItem): Promise<"done" | "waiting" | "retry" | "failed"> {
  const { data: episode } = await admin
    .from("podcasts")
    .select("status, regenerating, audio_path, error_message, updated_at")
    .eq("topic_id", item.topic_id)
    .eq("voice", item.voice)
    .maybeSingle();

  const episodeUpdatedAt = episode?.updated_at ? Date.parse(episode.updated_at) : 0;
  const itemStartedAt = item.started_at ? Date.parse(item.started_at) : Date.now();
  if (
    episode?.status === "ready" &&
    episode.audio_path &&
    !episode.regenerating &&
    episodeUpdatedAt >= itemStartedAt
  ) {
    await admin.from("podcast_rerecord_items").update({
      status: "done",
      completed_at: new Date().toISOString(),
      error_message: null,
    }).eq("id", item.id).eq("status", "running");
    return "done";
  }
  if (episode?.regenerating) return "waiting";

  const message = episode?.error_message ?? "Recording stopped before completion.";
  const retry = item.attempts < MAX_ATTEMPTS;
  await admin.from("podcast_rerecord_items").update(retry ? {
    status: "pending", started_at: null, error_message: message,
  } : {
    status: "failed", completed_at: new Date().toISOString(), error_message: message,
  }).eq("id", item.id).eq("status", "running");
  return retry ? "retry" : "failed";
}

async function requeueOrFail(item: QueueItem, message: string): Promise<void> {
  const retry = item.attempts < MAX_ATTEMPTS;
  await admin.from("podcast_rerecord_items").update(retry ? {
    status: "pending", started_at: null, error_message: message,
  } : {
    status: "failed", completed_at: new Date().toISOString(), error_message: message,
  }).eq("id", item.id).eq("status", "running");
}

async function run(jobId: string): Promise<void> {
  const { data: job } = await admin
    .from("podcast_rerecord_jobs")
    .select("id,status,paused,batch_size,processed")
    .eq("id", jobId)
    .maybeSingle();
  if (!job || job.paused || job.status === "paused" || job.status === "cancelled" || job.status === "complete") return;

  const { data: activeRows } = await admin
    .from("podcast_rerecord_items")
    .select("*")
    .eq("job_id", jobId)
    .eq("status", "running")
    .order("started_at", { ascending: true })
    .limit(1);
  let item = (activeRows?.[0] as QueueItem | undefined) ?? null;

  if (item) {
    const result = await settleItem(item);
    if (result === "waiting") {
      const started = item.started_at ? Date.parse(item.started_at) : Date.now();
      if (Date.now() - started < 20 * 60_000) {
        await selfChain(jobId, 20_000);
        return;
      }
      await admin.from("podcast_rerecord_items").update({ status: "pending", started_at: null }).eq("id", item.id);
    }
  }

  const token = crypto.randomUUID();
  const { data: claimed, error: claimError } = await admin.rpc("claim_podcast_rerecord_item", {
    _job_id: jobId,
    _worker_token: token,
    _lease_seconds: 150,
  });
  if (claimError) throw claimError;
  item = (claimed?.[0] as QueueItem | undefined) ?? null;
  if (!item) {
    await admin.rpc("refresh_podcast_rerecord_job", { _job_id: jobId });
    return;
  }

  const corpus = CORPUS.get(item.topic_id);
  if (!corpus?.text || corpus.text.length < 200) {
    await admin.from("podcast_rerecord_items").update({
      status: "failed",
      error_message: "No complete topic text was found in the recording corpus.",
      completed_at: new Date().toISOString(),
    }).eq("id", item.id);
    await admin.rpc("refresh_podcast_rerecord_job", { _job_id: jobId });
    await selfChain(jobId);
    return;
  }

  const { count: completedSameTopic } = await admin
    .from("podcast_rerecord_items")
    .select("id", { count: "exact", head: true })
    .eq("job_id", jobId)
    .eq("topic_id", item.topic_id)
    .eq("status", "done");

  try {
    const generateResponse = await fetch(`${SUPABASE_URL}/functions/v1/generate-podcast`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SERVICE_ROLE}`,
        apikey: SERVICE_ROLE,
        "x-internal-token": SERVICE_ROLE,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topicId: item.topic_id,
        topicTitle: item.topic_title,
        content: corpus.text.slice(0, 145_000),
        force: true,
        voiceId: item.voice,
        preserveExisting: true,
        refreshScript: (completedSameTopic ?? 0) === 0,
      }),
    });
    if (!generateResponse.ok) {
      const responseText = await generateResponse.text();
      throw new Error(`Generation request failed (${generateResponse.status}): ${responseText.slice(0, 300)}`);
    }
    // The topic text is identical to what this accent already narrated, so
    // generate-podcast kept the existing recording rather than spending
    // credits. Settle the queue item immediately instead of polling for a
    // fresh row that will never appear.
    const generatePayload = (await generateResponse.json().catch(() => null)) as
      | { unchanged?: boolean }
      | null;
    if (generatePayload?.unchanged === true) {
      await admin.from("podcast_rerecord_items").update({
        status: "done",
        completed_at: new Date().toISOString(),
        error_message: null,
      }).eq("id", item.id).eq("status", "running");
      const { data: refreshedSkip } = await admin.rpc("refresh_podcast_rerecord_job", { _job_id: jobId });
      if (refreshedSkip?.status === "running") await selfChain(jobId, 1_000);
      return;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await requeueOrFail(item, message);
    const { data: refreshed } = await admin.rpc("refresh_podcast_rerecord_job", { _job_id: jobId });
    if (refreshed?.status === "running") await selfChain(jobId, 30_000);
    return;
  }

  const deadline = Date.now() + POLL_BUDGET_MS;
  while (Date.now() < deadline) {
    await sleep(POLL_MS);
    const result = await settleItem(item);
    if (result !== "waiting") {
      const { data: refreshed } = await admin.rpc("refresh_podcast_rerecord_job", { _job_id: jobId });
      const batchSize = Math.max(1, refreshed?.batch_size ?? job.batch_size ?? 8);
      const delay = refreshed?.processed > 0 && refreshed.processed % batchSize === 0 ? 15_000 : 3_000;
      if (refreshed?.status === "running") await selfChain(jobId, delay);
      return;
    }
  }
  await admin.rpc("refresh_podcast_rerecord_job", { _job_id: jobId });
  await selfChain(jobId, 15_000);
}

async function runWatchdog(): Promise<void> {
  const now = new Date().toISOString();
  const { data: jobs, error } = await admin
    .from("podcast_rerecord_jobs")
    .select("id")
    .eq("status", "running")
    .eq("paused", false)
    .or(`worker_lease_until.is.null,worker_lease_until.lt.${now}`)
    .order("updated_at", { ascending: true })
    .limit(5);
  if (error) throw error;
  await Promise.all((jobs ?? []).map(({ id }) => run(id)));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!(await isAuthorised(req))) return json({ error: "Admin only" }, 403);

  const parsed = RequestSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const body = parsed.data;
  const work = (body.action === "watchdog" ? runWatchdog() : run(body.jobId)).catch(async (error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[podcast-rerecord] ${body.action}: ${message}`);
    if (body.action === "process") {
      await admin.from("podcast_rerecord_jobs").update({ last_error: message }).eq("id", body.jobId);
      await admin.rpc("refresh_podcast_rerecord_job", { _job_id: body.jobId });
      await selfChain(body.jobId, 30_000);
    }
  });
  // @ts-expect-error EdgeRuntime is supplied by the deployed runtime.
  if (typeof EdgeRuntime !== "undefined" && EdgeRuntime?.waitUntil) EdgeRuntime.waitUntil(work);
  else void work;
  return json({ status: "started", ...(body.action === "process" ? { jobId: body.jobId } : {}) }, 202);
});