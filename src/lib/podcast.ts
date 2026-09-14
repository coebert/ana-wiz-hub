import { supabase } from "@/integrations/supabase/client";

export interface PodcastResult {
  status: "ready" | "generating" | "failed";
  audio_url?: string;
  script?: string;
  duration_seconds?: number;
  /** Narrator preset id the cached audio was generated with. */
  voice?: string;
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
export interface ExtractionDiagnostics {
  /** Each selector we probed and how many characters it yielded. */
  selectors: Array<{ selector: string; found: boolean; chars: number }>;
  /** Roots we scanned for un-IDed <section> fallbacks + how many matched. */
  roots: Array<{ selector: string; found: boolean; sectionsScanned: number; chars: number }>;
  /** Final combined character count returned by the extractor. */
  totalChars: number;
  /** Minimum characters required before we consider the extraction usable. */
  minChars: number;
}

export const EXTRACTION_MIN_CHARS = 200;

export interface ExtractionResult {
  content: string;
  diagnostics: ExtractionDiagnostics;
}

export const formatExtractionDiagnostics = (d: ExtractionDiagnostics): string => {
  const lines: string[] = [];
  lines.push(`Extracted ${d.totalChars} chars (need ≥ ${d.minChars}).`);
  lines.push("Selectors tried:");
  for (const s of d.selectors) {
    lines.push(`  • ${s.selector} → ${s.found ? `${s.chars} chars` : "not found"}`);
  }
  lines.push("Fallback roots:");
  for (const r of d.roots) {
    lines.push(
      `  • ${r.selector} → ${
        r.found ? `${r.sectionsScanned} <section>s, ${r.chars} chars` : "not found"
      }`,
    );
  }
  return lines.join("\n");
};

export const extractTopicContent = (): ExtractionResult => {
  const selectorLog: ExtractionDiagnostics["selectors"] = [];
  const collect = (selector: string): string => {
    const el = document.querySelector(selector);
    const text = el ? (el as HTMLElement).innerText || "" : "";
    selectorLog.push({ selector, found: !!el, chars: text.length });
    return text;
  };

  // Objectives + key points are wrapped in their own ids by TopicTemplate.
  const objectives = collect("#objectives");
  const keyPoints = collect("#key-points");
  const workedExamples = collect("#worked-examples");

  // Core concepts: TopicTemplate pages wrap core content inside <main>, but
  // many one-off topic pages (e.g. Immunology for Intensivists) render
  // directly inside PageContainer with no <main>. Search progressively wider
  // roots so podcast extraction works on both. Exclude sections that are
  // clearly non-narrative (quiz, references, diagrams gallery, page nav).
  const EXCLUDE_IDS = new Set(["quiz", "references", "diagrams", "podcast", "faqs"]);
  const isInsideChrome = (el: Element): boolean =>
    !!el.closest("nav, header, footer, aside, [data-podcast-player]");

  const rootCandidates: Array<{ selector: string; el: Element | null }> = [
    { selector: "main", el: document.querySelector("main") },
    { selector: "article", el: document.querySelector("article") },
    { selector: "body", el: document.body },
  ];

  const rootLog: ExtractionDiagnostics["roots"] = [];
  let coreConcepts = "";
  const seen = new Set<Element>();
  for (const { selector, el } of rootCandidates) {
    if (!el || seen.has(el)) {
      rootLog.push({ selector, found: !!el, sectionsScanned: 0, chars: 0 });
      continue;
    }
    seen.add(el);
    const sections = el.querySelectorAll("section");
    let scanned = 0;
    let chars = 0;
    sections.forEach((s) => {
      if (s.id && EXCLUDE_IDS.has(s.id)) return;
      if (isInsideChrome(s)) return;
      const text = (s as HTMLElement).innerText?.trim();
      if (text) {
        coreConcepts += text + "\n\n";
        scanned += 1;
        chars += text.length;
      }
    });
    rootLog.push({ selector, found: true, sectionsScanned: scanned, chars });
    if (coreConcepts.trim().length > EXTRACTION_MIN_CHARS) break;
  }

  const parts = [
    objectives && `LEARNING OBJECTIVES:\n${objectives}`,
    coreConcepts.trim() && `CORE CONCEPTS:\n${coreConcepts.trim()}`,
    workedExamples && `WORKED EXAMPLES:\n${workedExamples}`,
    keyPoints && `KEY LEARNING POINTS:\n${keyPoints}`,
  ].filter(Boolean);

  const content = parts.join("\n\n");
  return {
    content,
    diagnostics: {
      selectors: selectorLog,
      roots: rootLog,
      totalChars: content.length,
      minChars: EXTRACTION_MIN_CHARS,
    },
  };
};



export const fetchPodcast = async (
  topicId: string,
): Promise<PodcastResult | null> => {
  const { data, error } = await supabase
    .from("podcasts")
    .select("status, audio_path, script, duration_seconds, updated_at, voice")
    .eq("topic_id", topicId)
    .maybeSingle();

  if (error || !data) return null;
  if (data.status !== "ready" || !data.audio_path) {
    return {
      status: data.status as PodcastResult["status"],
      voice: data.voice ?? undefined,
      updated_at: data.updated_at ?? undefined,
    };
  }

  const { data: pub } = supabase.storage.from("podcasts").getPublicUrl(data.audio_path);
  return {
    status: "ready",
    audio_url: pub.publicUrl,
    script: data.script ?? undefined,
    duration_seconds: data.duration_seconds ?? undefined,
    voice: data.voice ?? undefined,
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
    // Stale detection: the row is still `generating` but its `updated_at`
    // hasn't moved in longer than the stale threshold — the background job
    // has almost certainly died (edge crash, OOM, deploy mid-run, etc.).
    // Surface this as a failed result so the UI can offer a clean retry
    // (which the server will reclaim, since it has its own stale guard).
    if (polled && isStaleGenerating(polled)) {
      return {
        ...polled,
        status: "failed",
        error:
          "Previous generation appears stalled (no progress for several minutes). Click retry to start a new one.",
      };
    }
  }

  return {
    status: "failed",
    error: "Podcast generation timed out. Refresh the page in a minute.",
  };
};

/**
 * Server-side hard cap in supabase/functions/generate-podcast/index.ts.
 * We trim slightly below it so long topic pages never get rejected with
 * "content must be a string under 150000 characters".
 */
export const MAX_PODCAST_CONTENT_CHARS = 145_000;

/** Trim content to the server cap, preferring a sentence/paragraph boundary. */
export const clampPodcastContent = (content: string): string => {
  if (content.length <= MAX_PODCAST_CONTENT_CHARS) return content;
  const slice = content.slice(0, MAX_PODCAST_CONTENT_CHARS);
  const cut = Math.max(
    slice.lastIndexOf("\n\n"),
    slice.lastIndexOf(". "),
  );
  return (cut > MAX_PODCAST_CONTENT_CHARS * 0.6 ? slice.slice(0, cut + 1) : slice).trim();
};

export const generatePodcast = async (
  topicId: string,
  topicTitle: string,
  content: string,
  options?: { force?: boolean; regeneratePassword?: string; voiceId?: string },
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
        content: clampPodcastContent(content),
        force: options?.force ?? false,
        regeneratePassword: options?.regeneratePassword,
        voiceId: options?.voiceId,
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
