import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, MicOff, Volume2, RotateCcw, Loader2, AlertCircle, Target, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ExamTag } from "@/data/curriculum";
import VivaRubric from "@/components/VivaRubric";
import MicHelpPanel from "@/components/MicHelpPanel";
import MicConfidenceMeter, { type ConfidenceSegment } from "@/components/MicConfidenceMeter";

type Exam = Extract<ExamTag, "primary" | "final" | "fficm">;

interface VivaSessionProps {
  topicId: string;
  topicTitle: string;
  topicDescription?: string;
  exam: Exam;
  /** Called when the user wants to leave the session (e.g. close drawer). */
  onClose?: () => void;
}

interface RubricBreakdownItem {
  criterion: string;
  max: number;
  awarded: number;
  comment: string;
  /** Verbatim snippet from the transcript that motivated the mark, if any. */
  quote?: string;
  /** Approximate seconds from the start of the answer where the snippet was spoken. */
  tStart?: number;
}

interface Feedback {
  score: number;
  verdict: string;
  strengths?: string[];
  gaps: string[];
  modelAnswer: string;
  nextStep: string;
  rubricBreakdown?: RubricBreakdownItem[];
}

type Phase =
  | "loading-question"
  | "ready-to-answer"
  | "listening"
  | "scoring"
  | "feedback"
  | "error";

const examLabels: Record<Exam, string> = {
  primary: "FRCA Primary",
  final: "FRCA Final",
  fficm: "FFICM",
};

// Browser SpeechRecognition typing — minimal shim, the API is non-standard.
type AnyWindow = Window &
  typeof globalThis & {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };

interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: any) => void) | null;
  onerror: ((e: any) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

function getSpeechRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as AnyWindow;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

type Difficulty = "easy" | "standard" | "hard";

const HISTORY_KEY = (topicId: string, exam: Exam) => `viva:asked:${exam}:${topicId}`;
const MAX_HISTORY = 12;

function loadAsked(topicId: string, exam: Exam): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY(topicId, exam));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function saveAsked(topicId: string, exam: Exam, list: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      HISTORY_KEY(topicId, exam),
      JSON.stringify(list.slice(-MAX_HISTORY)),
    );
  } catch { /* quota — ignore */ }
}

type WeakStrictness = "lenient" | "balanced" | "strict";
const STRICTNESS_KEY = (topicId: string, exam: Exam, difficulty: Difficulty) =>
  `viva:weakStrictness:${exam}:${topicId}:${difficulty}`;

function loadStrictness(topicId: string, exam: Exam, difficulty: Difficulty): WeakStrictness {
  if (typeof window === "undefined") return "balanced";
  try {
    const raw = window.localStorage.getItem(STRICTNESS_KEY(topicId, exam, difficulty));
    if (raw === "lenient" || raw === "balanced" || raw === "strict") return raw;
  } catch { /* ignore */ }
  return "balanced";
}

function saveStrictness(
  topicId: string,
  exam: Exam,
  difficulty: Difficulty,
  value: WeakStrictness,
) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STRICTNESS_KEY(topicId, exam, difficulty), value);
  } catch { /* quota — ignore */ }
}

const VivaSession = ({
  topicId,
  topicTitle,
  topicDescription,
  exam,
  onClose,
}: VivaSessionProps) => {
  const [phase, setPhase] = useState<Phase>("loading-question");
  const [question, setQuestion] = useState("");
  const [interim, setInterim] = useState("");
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>("standard");
  const [avoidRepeats, setAvoidRepeats] = useState(true);
  const [askedCount, setAskedCount] = useState(() => loadAsked(topicId, exam).length);
  const [prefetchEnabled, setPrefetchEnabled] = useState(true);
  const [prefetchStatus, setPrefetchStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  /**
   * Standalone "model answer" generated for the current question, independent
   * of whether the user attempted the question. Lets users either skip the
   * answering step or compare their attempt afterwards.
   */
  const [modelAnswer, setModelAnswer] = useState<{
    modelAnswer: string;
    highYieldPoints: string[];
    pitfalls: string[];
  } | null>(null);
  const [modelAnswerLoading, setModelAnswerLoading] = useState(false);
  const [modelAnswerError, setModelAnswerError] = useState<string | null>(null);
  const [modelAnswerOpen, setModelAnswerOpen] = useState(true);
  /**
   * How strict to be when flagging a rubric row as "weak" for emphasis retakes.
   * - lenient: anything below 70% counts as weak (more rows qualify, retake button shows often)
   * - balanced: below 50% (default — only clearly underperforming rows)
   * - strict: below 30% (only severe gaps trigger an emphasis retake)
   */
  const [weakStrictness, setWeakStrictness] = useState<WeakStrictness>(() =>
    loadStrictness(topicId, exam, "standard"),
  );
  const weakThreshold = weakStrictness === "lenient" ? 0.7 : weakStrictness === "strict" ? 0.3 : 0.5;

  // Reload the saved strictness whenever the (topic, exam, difficulty) tuple changes
  // so the user's per-topic / per-difficulty preference stays consistent on switch.
  useEffect(() => {
    setWeakStrictness(loadStrictness(topicId, exam, difficulty));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId, exam, difficulty]);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const finalTranscriptRef = useRef<string>("");
  /** Approximate timeline of finalised speech chunks (seconds since listening started). */
  const segmentsRef = useRef<{ tStart: number; text: string }[]>([]);
  const listenStartRef = useRef<number>(0);
  /** Per-finalised-segment confidence values, surfaced via MicConfidenceMeter. */
  const [confSegments, setConfSegments] = useState<ConfidenceSegment[]>([]);
  /** Background-fetched next question; consumed by fetchQuestion when present. */
  const prefetchedRef = useRef<{ question: string; difficulty: Difficulty } | null>(null);
  /** AbortController for any in-flight background prefetch. */
  const prefetchAbortRef = useRef<AbortController | null>(null);

  const cancelPrefetch = useCallback(() => {
    if (prefetchAbortRef.current) {
      prefetchAbortRef.current.abort();
      prefetchAbortRef.current = null;
      setPrefetchStatus((s) => (s === "loading" ? "idle" : s));
    }
  }, []);
  const sttSupported = !!getSpeechRecognitionCtor();
  // OpenAI TTS (via tts-demo edge function) is always available — same voice as podcasts.
  const ttsSupported = true;
  const ttsAudioRef = useRef<HTMLAudioElement | null>(null);
  const ttsCacheRef = useRef<Map<string, string>>(new Map());

  const stopSpeaking = useCallback(() => {
    if (ttsAudioRef.current) {
      ttsAudioRef.current.pause();
      ttsAudioRef.current.src = "";
      ttsAudioRef.current = null;
    }
  }, []);

  const speak = useCallback(
    async (text: string) => {
      if (!text) return;
      stopSpeaking();
      try {
        let url = ttsCacheRef.current.get(text);
        if (!url) {
          const { data, error } = await supabase.functions.invoke("tts-demo", {
            body: { text },
          });
          if (error) throw new Error(error.message || "TTS request failed");
          if (!data?.audioBase64) throw new Error("No audio returned");
          url = `data:${data.mimeType ?? "audio/mpeg"};base64,${data.audioBase64}`;
          ttsCacheRef.current.set(text, url);
        }
        const audio = new Audio(url);
        ttsAudioRef.current = audio;
        await audio.play();
      } catch (err) {
        console.error("[VivaSession] TTS error", err);
      }
    },
    [stopSpeaking],
  );

  /** Low-level call — never touches phase. Returns the question or null on error. */
  const requestQuestion = useCallback(
    async (
      forDifficulty: Difficulty,
      emphasise?: string[],
      signal?: AbortSignal,
    ): Promise<string | null> => {
      const avoid = avoidRepeats ? loadAsked(topicId, exam) : [];
      try {
        const { data, error } = await supabase.functions.invoke("viva", {
          body: {
            mode: "question",
            topicId,
            topicTitle,
            topicDescription,
            exam,
            difficulty: forDifficulty,
            avoid,
            emphasise: emphasise && emphasise.length > 0 ? emphasise : undefined,
          },
          signal,
        });
        if (signal?.aborted) return null;
        if (error || !data?.question) return null;
        return data.question as string;
      } catch (e) {
        // AbortError shows up here when the caller cancels.
        return null;
      }
    },
    [topicId, topicTitle, topicDescription, exam, avoidRepeats],
  );

  const fetchQuestion = useCallback(async () => {
    setErrorMsg(null);
    setTranscript("");
    setInterim("");
    setFeedback(null);
    finalTranscriptRef.current = "";
    segmentsRef.current = [];
    setConfSegments([]);
    // New question → drop any previous model answer.
    setModelAnswer(null);
    setModelAnswerError(null);
    setModelAnswerLoading(false);

    // Use a prefetched question if it matches the current difficulty.
    const cached = prefetchedRef.current;
    if (cached && cached.difficulty === difficulty) {
      prefetchedRef.current = null;
      setPrefetchStatus("idle");
      setQuestion(cached.question);
      const next = [...loadAsked(topicId, exam), cached.question];
      saveAsked(topicId, exam, next);
      setAskedCount(Math.min(next.length, MAX_HISTORY));
      setPhase("ready-to-answer");
      setTimeout(() => speak(cached.question), 150);
      return;
    }

    setPhase("loading-question");
    setQuestion("");
    const q = await requestQuestion(difficulty);
    if (!q) {
      setErrorMsg("Could not load a question.");
      setPhase("error");
      return;
    }
    setQuestion(q);
    const next = [...loadAsked(topicId, exam), q];
    saveAsked(topicId, exam, next);
    setAskedCount(Math.min(next.length, MAX_HISTORY));
    setPhase("ready-to-answer");
    setTimeout(() => speak(q), 150);
  }, [topicId, exam, speak, difficulty, requestQuestion]);

  /**
   * Generate a standalone model answer for the current question.
   * Lets the user either skip answering altogether or compare their attempt
   * against the worked answer afterwards. Independent of the marked feedback.
   */
  const generateModelAnswer = useCallback(async () => {
    if (!question) return;
    setModelAnswerError(null);
    setModelAnswerLoading(true);
    setModelAnswerOpen(true);
    try {
      const { data, error } = await supabase.functions.invoke("viva", {
        body: {
          mode: "model-answer",
          topicTitle,
          exam,
          question,
        },
      });
      if (error) throw new Error(error.message || "Could not generate model answer");
      if (!data?.modelAnswer) throw new Error("No model answer returned");
      setModelAnswer({
        modelAnswer: String(data.modelAnswer),
        highYieldPoints: Array.isArray(data.highYieldPoints) ? data.highYieldPoints : [],
        pitfalls: Array.isArray(data.pitfalls) ? data.pitfalls : [],
      });
    } catch (e) {
      console.error("[VivaSession] model-answer error", e);
      setModelAnswerError(e instanceof Error ? e.message : "Could not generate model answer");
    } finally {
      setModelAnswerLoading(false);
    }
  }, [question, topicTitle, exam]);

  /** Background-fetch the next question (e.g. while user is reading feedback). */
  const prefetchNext = useCallback(async () => {
    if (!prefetchEnabled) return;
    if (prefetchedRef.current?.difficulty === difficulty) return; // already cached

    // Cancel any earlier in-flight prefetch first.
    prefetchAbortRef.current?.abort();
    const controller = new AbortController();
    prefetchAbortRef.current = controller;

    setPrefetchStatus("loading");
    const q = await requestQuestion(difficulty, undefined, controller.signal);
    if (controller.signal.aborted) return; // user cancelled — leave status alone
    prefetchAbortRef.current = null;
    if (!q) {
      setPrefetchStatus("error");
      return;
    }
    prefetchedRef.current = { question: q, difficulty };
    setPrefetchStatus("ready");
  }, [prefetchEnabled, difficulty, requestQuestion]);

  // Invalidate prefetch when difficulty changes.
  useEffect(() => {
    if (prefetchedRef.current && prefetchedRef.current.difficulty !== difficulty) {
      prefetchedRef.current = null;
      setPrefetchStatus("idle");
    }
    // Any in-flight prefetch was for the old difficulty — cancel it.
    cancelPrefetch();
  }, [difficulty, cancelPrefetch]);

  /** Fetch a fresh question weighted toward the user's weakest rubric rows. */
  const retakeWithEmphasis = useCallback(async () => {
    const weak = (feedback?.rubricBreakdown ?? [])
      .filter((b) => b.max > 0 && b.awarded / b.max < weakThreshold)
      .sort((a, b) => a.awarded / a.max - b.awarded / b.max)
      .map((b) => b.criterion);

    // Bypass the prefetch cache — it doesn't know about emphasis.
    prefetchedRef.current = null;
    cancelPrefetch();

    setErrorMsg(null);
    setTranscript("");
    setInterim("");
    setFeedback(null);
    finalTranscriptRef.current = "";
    segmentsRef.current = [];
    setConfSegments([]);
    setModelAnswer(null);
    setModelAnswerError(null);
    setModelAnswerLoading(false);
    setPhase("loading-question");
    setQuestion("");

    const q = await requestQuestion(difficulty, weak);
    if (!q) {
      setErrorMsg("Could not load a question.");
      setPhase("error");
      return;
    }
    setQuestion(q);
    const next = [...loadAsked(topicId, exam), q];
    saveAsked(topicId, exam, next);
    setAskedCount(Math.min(next.length, MAX_HISTORY));
    setPhase("ready-to-answer");
    setTimeout(() => speak(q), 150);
  }, [feedback, requestQuestion, difficulty, topicId, exam, speak, cancelPrefetch, weakThreshold]);

  // Initial load.
  useEffect(() => {
    fetchQuestion();
    return () => {
      stopSpeaking();
      recognitionRef.current?.abort();
      prefetchAbortRef.current?.abort();
    };
  }, [fetchQuestion]);

  const startListening = useCallback(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setErrorMsg(
        "Your browser doesn't support live speech recognition. Try Chrome or Edge on desktop.",
      );
      setPhase("error");
      return;
    }
    stopSpeaking();
    finalTranscriptRef.current = "";
    segmentsRef.current = [];
    setConfSegments([]);
    listenStartRef.current = Date.now();
    setInterim("");
    setTranscript("");

    const rec = new Ctor();
    rec.lang = "en-GB";
    rec.continuous = true;
    rec.interimResults = true;
    // Ask the engine for a couple of alternatives — confidence is more
    // reliable on browsers that compute it across alternatives.
    (rec as any).maxAlternatives = 2;
    rec.onresult = (e: any) => {
      let interimChunk = "";
      const newConf: ConfidenceSegment[] = [];
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          const text = r[0].transcript.trim();
          if (text) {
            const tStart = Math.max(0, (Date.now() - listenStartRef.current) / 1000);
            const wordCount = text.split(/\s+/).length;
            const approxStart = Math.max(0, tStart - wordCount * 0.35);
            segmentsRef.current.push({ tStart: Math.round(approxStart), text });
            finalTranscriptRef.current += text + " ";
            // Confidence is 0–1; some engines return undefined, normalise to 0.
            const confidence = typeof r[0].confidence === "number" ? r[0].confidence : 0;
            newConf.push({ text, confidence });
          }
        } else {
          interimChunk += r[0].transcript;
        }
      }
      if (newConf.length > 0) {
        setConfSegments((prev) => [...prev, ...newConf]);
      }
      setTranscript(finalTranscriptRef.current.trim());
      setInterim(interimChunk);
    };
    rec.onerror = (e: any) => {
      console.error("SpeechRecognition error:", e);
      if (e?.error === "not-allowed" || e?.error === "service-not-allowed") {
        setErrorMsg("Microphone permission was denied. Allow mic access and retry.");
        setPhase("error");
      }
    };
    rec.onend = () => {
      // If the user is still in 'listening' phase when the engine auto-stops
      // (e.g. silence timeout), keep what we have but drop back to ready.
      setPhase((p) => (p === "listening" ? "listening" : p));
    };
    recognitionRef.current = rec;
    rec.start();
    setPhase("listening");
    // The user is answering — kill any in-flight prefetch to free bandwidth/credits.
    cancelPrefetch();
  }, [cancelPrefetch]);

  const submitAnswer = useCallback(async () => {
    recognitionRef.current?.stop();
    const finalText = (finalTranscriptRef.current + " " + interim).trim();
    setTranscript(finalText);
    setInterim("");
    if (!finalText) {
      setErrorMsg("I didn't catch any speech — try again.");
      setPhase("error");
      return;
    }
    setPhase("scoring");

    const segments = segmentsRef.current.slice();

    const { data, error } = await supabase.functions.invoke("viva", {
      body: {
        mode: "feedback",
        topicTitle,
        exam,
        question,
        transcript: finalText,
        segments,
      },
    });

    if (error || !data || (data as { error?: string }).error) {
      setErrorMsg(
        (data as { error?: string } | null)?.error ??
          error?.message ??
          "Could not score your answer.",
      );
      setPhase("error");
      return;
    }
    setFeedback(data as Feedback);
    setPhase("feedback");
    // Kick off background prefetch of the next question while user reads feedback.
    void prefetchNext();
  }, [interim, topicTitle, exam, question, prefetchNext]);

  const stopListening = () => {
    recognitionRef.current?.stop();
    setPhase("ready-to-answer");
  };

  // ---- Render ------------------------------------------------------------

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
            Viva voce · {examLabels[exam]}
          </p>
          <h3 className="font-serif font-semibold text-foreground text-lg leading-tight truncate">
            {topicTitle}
          </h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchQuestion}
            disabled={phase === "loading-question" || phase === "scoring" || phase === "listening"}
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            New question
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Difficulty + avoid-repeats controls */}
      <div className="flex items-center justify-between gap-3 flex-wrap rounded-lg border border-border bg-muted/20 px-3 py-2">
        <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Difficulty">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mr-1">
            Difficulty
          </span>
          {(["easy", "standard", "hard"] as Difficulty[]).map((d) => (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={difficulty === d}
              onClick={() => setDifficulty(d)}
              disabled={phase === "loading-question" || phase === "scoring" || phase === "listening"}
              className={`text-xs px-2 py-1 rounded-md border transition-colors capitalize disabled:opacity-50 ${
                difficulty === d
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <label className="inline-flex items-center gap-2 text-xs text-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={avoidRepeats}
            onChange={(e) => setAvoidRepeats(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-border accent-primary"
          />
          <span>Avoid recent questions</span>
          <span className="text-muted-foreground tabular-nums">({askedCount}/{MAX_HISTORY})</span>
          {askedCount > 0 && (
            <button
              type="button"
              onClick={() => {
                saveAsked(topicId, exam, []);
                setAskedCount(0);
              }}
              className="ml-1 text-[11px] text-primary hover:underline"
            >
              Reset
            </button>
          )}
        </label>

        <label className="inline-flex items-center gap-2 text-xs text-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={prefetchEnabled}
            onChange={(e) => {
              setPrefetchEnabled(e.target.checked);
              if (!e.target.checked) {
                prefetchedRef.current = null;
                cancelPrefetch();
              }
            }}
            className="h-3.5 w-3.5 rounded border-border accent-primary"
          />
          <span>Prefetch next question</span>
          {prefetchEnabled && prefetchStatus === "loading" && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> preparing…
            </span>
          )}
          {prefetchEnabled && prefetchStatus === "ready" && (
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
              ready ✓
            </span>
          )}
          {prefetchEnabled && prefetchStatus === "error" && (
            <span className="text-[11px] text-amber-700 dark:text-amber-400">retry on next</span>
          )}
        </label>

        <label className="inline-flex items-center gap-2 text-xs text-foreground select-none">
          <span className="text-muted-foreground">Weak threshold</span>
          <select
            value={weakStrictness}
            onChange={(e) => {
              const v = e.target.value as WeakStrictness;
              setWeakStrictness(v);
              saveStrictness(topicId, exam, difficulty, v);
            }}
            className="h-7 rounded-md border border-border bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
            title="How strict to be when flagging a rubric row as weak for emphasis retakes"
          >
            <option value="lenient">Lenient (&lt; 70%)</option>
            <option value="balanced">Balanced (&lt; 50%)</option>
            <option value="strict">Strict (&lt; 30%)</option>
          </select>
        </label>
      </div>

      {/* Browser support warnings */}
      {(!sttSupported || !ttsSupported) && phase !== "error" && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-900 dark:text-amber-200 flex gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div>
            {!sttSupported && (
              <p>Speech recognition isn't supported in this browser — try Chrome or Edge for the full viva experience.</p>
            )}
            {!ttsSupported && <p>Voice playback isn't supported — you'll see the question text only.</p>}
          </div>
        </div>
      )}

      <MicHelpPanel />
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="secondary" className="text-[10px]">Examiner</Badge>
          {ttsSupported && question && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={() => speak(question)}
              aria-label="Replay question"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
        {phase === "loading-question" ? (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" /> Generating a {examLabels[exam]} viva question…
          </p>
        ) : (
          <p className="text-foreground leading-relaxed">{question || "—"}</p>
        )}

        {/* Model-answer action row — works in any phase once a question is loaded.
            Lets the user generate the worked answer instead of (or alongside) attempting it. */}
        {question && phase !== "loading-question" && (
          <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateModelAnswer}
              disabled={modelAnswerLoading}
              className="h-8"
            >
              {modelAnswerLoading ? (
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              )}
              {modelAnswerLoading
                ? "Generating model answer…"
                : modelAnswer
                  ? "Regenerate model answer"
                  : feedback
                    ? "Show model answer to compare"
                    : "Show model answer"}
            </Button>
            {!modelAnswer && !modelAnswerLoading && !feedback && (
              <span className="text-[11px] text-muted-foreground">
                Skip the attempt — or try first, then compare.
              </span>
            )}
          </div>
        )}
      </div>

      {/* Standalone model-answer panel — separate from the marked feedback so it
          works whether or not the user attempted the question. */}
      {(modelAnswer || modelAnswerError) && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Model answer
              </p>
            </div>
            <div className="flex items-center gap-1">
              {modelAnswer && ttsSupported && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => speak(modelAnswer.modelAnswer)}
                  aria-label="Read model answer aloud"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </Button>
              )}
              {modelAnswer && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => setModelAnswerOpen((o) => !o)}
                  aria-label={modelAnswerOpen ? "Collapse model answer" : "Expand model answer"}
                >
                  {modelAnswerOpen ? (
                    <ChevronUp className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {modelAnswerError && (
            <p className="text-sm text-destructive">{modelAnswerError}</p>
          )}

          {modelAnswer && modelAnswerOpen && (
            <div className="space-y-3">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {modelAnswer.modelAnswer}
              </p>

              {modelAnswer.highYieldPoints.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                    High-yield points
                  </p>
                  <ul className="text-sm text-foreground space-y-0.5 list-disc pl-4">
                    {modelAnswer.highYieldPoints.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {modelAnswer.pitfalls.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
                    Common pitfalls
                  </p>
                  <ul className="text-sm text-foreground space-y-0.5 list-disc pl-4">
                    {modelAnswer.pitfalls.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {feedback && (
                <p className="text-[11px] text-muted-foreground border-t border-border/50 pt-2">
                  Compare this against your transcript above to spot what you missed.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Live transcript */}
      {(phase === "listening" || transcript || interim) && (
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-[10px]">Your answer</Badge>
            {phase === "listening" && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-destructive">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive" />
                </span>
                Listening…
              </span>
            )}
          </div>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {transcript}
            {interim && <span className="text-muted-foreground italic"> {interim}</span>}
            {!transcript && !interim && (
              <span className="text-muted-foreground italic">Speak into your microphone…</span>
            )}
          </p>

          {(phase === "listening" || confSegments.length > 0) && (
            <div className="mt-3">
              <MicConfidenceMeter
                segments={confSegments}
                listening={phase === "listening"}
              />
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      {(phase === "ready-to-answer" || phase === "listening") && (
        <div className="flex justify-center gap-2">
          {phase !== "listening" ? (
            <Button onClick={startListening} disabled={!sttSupported || !question} size="lg">
              <Mic className="h-4 w-4 mr-2" /> Start answering
            </Button>
          ) : (
            <>
              <Button onClick={stopListening} variant="outline" size="lg">
                <MicOff className="h-4 w-4 mr-2" /> Pause
              </Button>
              <Button onClick={submitAnswer} size="lg">
                Submit answer
              </Button>
            </>
          )}
        </div>
      )}

      {phase === "scoring" && (
        <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2 py-4">
          <Loader2 className="h-4 w-4 animate-spin" /> Marking your answer…
        </div>
      )}

      {/* Feedback */}
      {phase === "feedback" && feedback && (
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-3">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <p className="font-serif font-bold text-2xl text-foreground">
              {feedback.score}/10
              <span className="ml-2 text-sm font-sans font-medium text-muted-foreground">
                {feedback.verdict}
              </span>
            </p>
          </div>

          {feedback.strengths && feedback.strengths.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                Strengths
              </p>
              <ul className="text-sm space-y-0.5 list-disc pl-4 text-foreground">
                {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {feedback.gaps.length > 0 && (
            <div>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-amber-700 dark:text-amber-400 mb-1">
                Gaps to close
              </p>
              <ul className="text-sm space-y-0.5 list-disc pl-4 text-foreground">
                {feedback.gaps.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          )}

          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">
              Model answer
            </p>
            <p className="text-sm text-foreground leading-relaxed">{feedback.modelAnswer}</p>
          </div>

          <div className="rounded border-l-2 border-primary/60 bg-card px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-primary mb-0.5">
              Examiner would ask next
            </p>
            <p className="text-sm text-foreground italic">{feedback.nextStep}</p>
          </div>

          <div className="flex justify-end gap-2 flex-wrap">
            {(feedback.rubricBreakdown ?? []).some(
              (b) => b.max > 0 && b.awarded / b.max < weakThreshold,
            ) && (
              <Button onClick={retakeWithEmphasis} variant="default" size="sm">
                <Target className="h-3.5 w-3.5 mr-1.5" /> Retake with different emphasis
              </Button>
            )}
            <Button onClick={fetchQuestion} variant="outline" size="sm">
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Try another question
            </Button>
          </div>

          <VivaRubric
            exam={exam}
            score={feedback.score}
            gaps={feedback.gaps}
            breakdown={feedback.rubricBreakdown}
          />
        </div>
      )}

      {phase === "error" && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p>{errorMsg ?? "Something went wrong."}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={fetchQuestion}
            >
              Try again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VivaSession;
