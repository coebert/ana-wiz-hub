import { supabase } from "@/integrations/supabase/client";

export interface PodcastResult {
  status: "ready" | "generating" | "failed";
  audio_url?: string;
  script?: string;
  duration_seconds?: number;
  cached?: boolean;
  error?: string;
  // ISO timestamp of the row's last update. Used to detect stale
  // `generating` rows where the background job has died without flipping
  // status to `failed` (edge crash, process kill, etc.).
  updated_at?: string;
}

/**
 * Rows stuck in `generating` for longer than this are treated as abandoned.
 * The server-side reclaim threshold is 3 min; we use a slightly larger value
 * client-side so the next retry safely lands inside the reclaim window.
 */
export const STALE_GENERATING_MS = 4 * 60 * 1000;

export const isStaleGenerating = (result: PodcastResult | null): boolean => {
  if (!result || result.status !== "generating" || !result.updated_at) return false;
  const ageMs = Date.now() - new Date(result.updated_at).getTime();
  return Number.isFinite(ageMs) && ageMs > STALE_GENERATING_MS;
};

/**
 * Estimate the target podcast length from source content. Mirrors the logic
 * in supabase/functions/generate-podcast/index.ts (deriveTargetLength) so the
 * UI can preview what the user will get before kicking off generation.
 */
export const estimatePodcastTarget = (
  content: string,
): { minutes: number; words: number; sourceWords: number } => {
  const sourceWords = content.trim().split(/\s+/).filter(Boolean).length;
  const target = Math.round(sourceWords * 0.35);
  const words = Math.max(900, target);
  const minutes = Math.max(6, Math.round(words / 150));
  return { minutes, words, sourceWords };
};

/**
 * Pulls the spoken-word content out of the topic page DOM. We deliberately
 * grab structural sections (objectives, core concepts, key learning points,
 * worked examples) and skip nav, footer, quizzes, and references — quizzes
 * would just leak answers and references aren't useful spoken aloud.
 */
export const extractTopicContent = (): string => {
  const collect = (selector: string): string => {
    const el = document.querySelector(selector);
    if (!el) return "";
    return (el as HTMLElement).innerText || "";
  };

  // Objectives + key points are wrapped in their own ids by TopicTemplate.
  const objectives = collect("#objectives");
  const keyPoints = collect("#key-points");
  const workedExamples = collect("#worked-examples");

  // Core concepts is the only un-IDed top-level <section>. Grab the first
  // <section> child of <main> that doesn't have a known id.
  const main = document.querySelector("main");
  let coreConcepts = "";
  if (main) {
    const sections = main.querySelectorAll(":scope section");
    sections.forEach((s) => {
      if (!s.id || (s.id !== "diagrams" && s.id !== "quiz" && s.id !== "references")) {
        coreConcepts += (s as HTMLElement).innerText + "\n\n";
      }
    });
  }

  const parts = [
    objectives && `LEARNING OBJECTIVES:\n${objectives}`,
    coreConcepts.trim() && `CORE CONCEPTS:\n${coreConcepts.trim()}`,
    workedExamples && `WORKED EXAMPLES:\n${workedExamples}`,
    keyPoints && `KEY LEARNING POINTS:\n${keyPoints}`,
  ].filter(Boolean);

  return parts.join("\n\n");
};

export const fetchPodcast = async (
  topicId: string,
): Promise<PodcastResult | null> => {
  const { data, error } = await supabase
    .from("podcasts")
    .select("status, audio_path, script, duration_seconds, updated_at")
    .eq("topic_id", topicId)
    .maybeSingle();

  if (error || !data) return null;
  if (data.status !== "ready" || !data.audio_path) {
    return {
      status: data.status as PodcastResult["status"],
      updated_at: data.updated_at ?? undefined,
    };
  }

  const { data: pub } = supabase.storage.from("podcasts").getPublicUrl(data.audio_path);
  return {
    status: "ready",
    audio_url: pub.publicUrl,
    script: data.script ?? undefined,
    duration_seconds: data.duration_seconds ?? undefined,
    cached: true,
    updated_at: data.updated_at ?? undefined,
  };
};

/**
 * Poll the cached podcasts row until it reaches a terminal state (`ready` or
 * `failed`), or until the timeout elapses. Used as a fallback when the initial
 * `generate-podcast` invocation times out at the HTTP layer but the edge
 * function keeps running in the background via `EdgeRuntime.waitUntil`.
 */
export const pollPodcastUntilDone = async (
  topicId: string,
  opts: {
    intervalMs?: number;
    timeoutMs?: number;
    onTick?: (result: PodcastResult | null) => void;
    signal?: { cancelled: boolean };
  } = {},
): Promise<PodcastResult> => {
  const intervalMs = opts.intervalMs ?? 5000;
  const timeoutMs = opts.timeoutMs ?? 10 * 60 * 1000; // 10 minutes
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    if (opts.signal?.cancelled) {
      return { status: "failed", error: "Polling cancelled." };
    }
    await new Promise((r) => setTimeout(r, intervalMs));
    let polled: PodcastResult | null = null;
    try {
      polled = await fetchPodcast(topicId);
    } catch {
      polled = null;
    }
    opts.onTick?.(polled);
    if (polled && (polled.status === "ready" || polled.status === "failed")) {
      return polled;
    }
  }

  return {
    status: "failed",
    error: "Podcast generation timed out. Refresh the page in a minute.",
  };
};

export const generatePodcast = async (
  topicId: string,
  topicTitle: string,
  content: string,
  options?: { force?: boolean; regeneratePassword?: string },
): Promise<PodcastResult> => {
  const normaliseFailedInvoke = async (err: unknown): Promise<PodcastResult> => {
    let failedPayload: Partial<PodcastResult> | undefined;
    const message = err instanceof Error ? err.message : typeof err === "string" ? err : undefined;
    const ctx = (err as { context?: unknown } | null)?.context;

    const parseTextPayload = (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      try {
        const parsed = JSON.parse(trimmed) as Partial<PodcastResult>;
        if (parsed && typeof parsed === "object") {
          failedPayload = parsed;
          return;
        }
      } catch {
        const jsonMatch = trimmed.match(/(\{[\s\S]*\})/);
        if (!jsonMatch) return;
        try {
          const parsed = JSON.parse(jsonMatch[1]) as Partial<PodcastResult>;
          if (parsed && typeof parsed === "object") failedPayload = parsed;
        } catch {
          // Ignore malformed embedded JSON and fall back to the plain message.
        }
      }
    };

    if (ctx && typeof ctx === "object") {
      const maybeResponse = ctx as {
        clone?: () => { text?: () => Promise<string> };
        text?: () => Promise<string>;
      };

      try {
        const readable = maybeResponse.clone?.() ?? maybeResponse;
        const text = await readable.text?.();
        if (typeof text === "string") parseTextPayload(text);
      } catch {
        // Ignore parsing issues and keep falling back.
      }

      if (!failedPayload) {
        failedPayload = ctx as Partial<PodcastResult>;
      }
    }

    if (!failedPayload && message) {
      parseTextPayload(message);
    }

    return {
      status: "failed",
      error:
        failedPayload?.error ||
        (failedPayload as { message?: string } | undefined)?.message ||
        message ||
        "Podcast generation failed",
    };
  };

  try {
    const { data, error } = await supabase.functions.invoke("generate-podcast", {
      body: {
        topicId,
        topicTitle,
        content,
        force: options?.force ?? false,
        regeneratePassword: options?.regeneratePassword,
      },
    });

    if (error) {
      return normaliseFailedInvoke(error);
    }

    if (data?.status === "failed") {
      return data as PodcastResult;
    }

    return data as PodcastResult;
  } catch (error) {
    return normaliseFailedInvoke(error);
  }
};
