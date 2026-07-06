import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Gauge,
  Highlighter,
  Loader2,
  Mic,
  MicOff,
  RotateCcw,
  Send,
  Sparkles,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import MicConfidenceMeter, { type ConfidenceSegment } from "@/components/viva/MicConfidenceMeter";

type Exam = "primary" | "final" | "fficm";

interface RubricRow {
  criterion: string;
  max: number;
  awarded: number;
  comment: string;
  quote?: string;
}

type CoreRating = "strong" | "adequate" | "weak";
interface CoreFeedbackEntry {
  rating: CoreRating;
  comment: string;
}
interface CoreFeedback {
  structure: CoreFeedbackEntry;
  knowledge: CoreFeedbackEntry;
  communication: CoreFeedbackEntry;
}

interface SummaryBullet {
  text: string;
  /** Approximate seconds from start of answer when this point was made. */
  tStart: number;
  /** Short label for that moment (e.g. "Opening", "around 0:42"). */
  location: string;
}

interface AnswerSummary {
  /** May arrive as plain strings from older responses — normalised before render. */
  bullets: Array<SummaryBullet | string>;
  wordCount: number;
}

type ConfidenceLevel = "high" | "medium" | "low";
interface Confidence {
  level: ConfidenceLevel;
  reason: string;
}

interface Feedback {
  score: number;
  verdict: string;
  confidence?: Confidence;
  answerSummary?: AnswerSummary;
  coreFeedback?: CoreFeedback;
  strengths?: string[];
  gaps: string[];
  modelAnswer: string;
  nextStep: string;
  rubricBreakdown: RubricRow[];
}

interface Round {
  question: string;
  /** "main" = the original demo question; "followup" = AI-generated follow-up. */
  kind: "main" | "followup";
  answer: string;
  feedback: Feedback;
  /** Wall-clock time (ms) the AI examiner took to mark this answer. */
  latencyMs: number;
}

interface DemoVivaInteractiveProps {
  question: string;
  topicTitle: string;
  exam: Exam;
}

// ---- Browser SpeechRecognition shim --------------------------------------
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

const MAX_FOLLOWUPS = 3;

interface Annotation {
  annotatedHtml: string;
  highYieldPoints: string[];
  pitfalls: string[];
}

/**
 * Sanitize the AI-returned annotated HTML. We only allow `<mark>` with
 * `data-kind` ("highyield" | "pitfall") and a plain-text `title`. Everything
 * else is stripped or escaped — no scripts, no other tags, no attributes.
 */
function sanitizeAnnotatedHtml(raw: string): string {
  if (typeof window === "undefined") return "";
  const doc = new DOMParser().parseFromString(`<div>${raw}</div>`, "text/html");
  const root = doc.body.firstElementChild;
  if (!root) return "";

  const walk = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return (node.textContent ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    const el = node as Element;
    const inner = Array.from(el.childNodes).map(walk).join("");
    if (el.tagName.toLowerCase() === "mark") {
      const kindRaw = (el.getAttribute("data-kind") ?? "").toLowerCase();
      const kind = kindRaw === "pitfall" ? "pitfall" : "highyield";
      const title = (el.getAttribute("title") ?? "")
        .replace(/[<>"]/g, "")
        .slice(0, 140);
      const cls =
        kind === "pitfall"
          ? "bg-destructive/15 text-destructive-foreground underline decoration-destructive/60 decoration-dotted underline-offset-2 rounded px-0.5"
          : "bg-primary/20 text-foreground underline decoration-primary/70 decoration-wavy underline-offset-2 rounded px-0.5";
      return `<mark data-kind="${kind}" title="${title}" class="${cls}">${inner}</mark>`;
    }
    return inner; // strip any other tag, keep its text
  };

  return Array.from(root.childNodes).map(walk).join("");
}

// ---- Sub-component: a single round of feedback ---------------------------
const FeedbackPanel = ({
  round,
  topicTitle,
  exam,
}: {
  round: Round;
  topicTitle: string;
  exam: Exam;
}) => {
  const fb = round.feedback;
  const [annotation, setAnnotation] = useState<Annotation | null>(null);
  const [annotating, setAnnotating] = useState(false);
  const [showAnnotation, setShowAnnotation] = useState(false);

  const loadAnnotation = useCallback(async () => {
    if (annotation) {
      setShowAnnotation((v) => !v);
      return;
    }
    setAnnotating(true);
    try {
      const { data, error } = await supabase.functions.invoke("viva", {
        body: {
          mode: "annotate",
          topicTitle,
          exam,
          question: round.question,
          modelAnswer: fb.modelAnswer,
        },
      });
      if (error) throw error;
      if (!data?.annotatedHtml) throw new Error("No annotation returned");
      setAnnotation({
        annotatedHtml: sanitizeAnnotatedHtml(String(data.annotatedHtml)),
        highYieldPoints: Array.isArray(data.highYieldPoints) ? data.highYieldPoints : [],
        pitfalls: Array.isArray(data.pitfalls) ? data.pitfalls : [],
      });
      setShowAnnotation(true);
    } catch (err) {
      console.error("Annotation failed:", err);
      const msg = err instanceof Error ? err.message : "Could not annotate the answer.";
      toast.error(msg);
    } finally {
      setAnnotating(false);
    }
  }, [annotation, topicTitle, exam, round.question, fb.modelAnswer]);

  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {round.kind === "followup" ? "Follow-up feedback" : "AI examiner feedback"}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center rounded-full bg-primary/15 text-primary px-2.5 py-0.5 text-xs font-semibold">
            {fb.score}/10
          </span>
          <span className="text-xs text-foreground/80">{fb.verdict}</span>
        </div>
      </div>

      {/* Confidence + latency telemetry for this marking */}
      <div className="flex items-center gap-2 flex-wrap text-[11px]">
        {fb.confidence && (
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium ${
              fb.confidence.level === "high"
                ? "border-primary/40 bg-primary/10 text-primary"
                : fb.confidence.level === "medium"
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : "border-destructive/40 bg-destructive/10 text-destructive"
            }`}
            title={fb.confidence.reason}
          >
            <Gauge className="h-3 w-3" />
            Confidence: {fb.confidence.level}
          </span>
        )}
        <span
          className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-card px-2 py-0.5 text-muted-foreground"
          title="Time the AI examiner took to mark this answer"
        >
          <Timer className="h-3 w-3" />
          {(round.latencyMs / 1000).toFixed(1)}s
        </span>
        {fb.confidence?.reason && (
          <span className="text-muted-foreground italic truncate max-w-full">
            — {fb.confidence.reason}
          </span>
        )}
      </div>

      {round.kind === "followup" && (
        <div className="rounded-lg border border-border/60 bg-card p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Examiner asked
          </p>
          <p className="text-sm text-foreground/90 italic leading-snug">"{round.question}"</p>
        </div>
      )}

      {fb.answerSummary && fb.answerSummary.bullets.length > 0 && (() => {
        // Normalise bullets to {text, tStart, location}, then order by tStart so
        // they follow the candidate's actual delivery — older responses may
        // still send plain strings, in which case order is preserved as-is.
        const normalised = fb.answerSummary.bullets.map((b, i) => {
          if (typeof b === "string") {
            return { text: b, tStart: i, location: "" };
          }
          return {
            text: b.text,
            tStart: typeof b.tStart === "number" ? b.tStart : i,
            location: b.location ?? "",
          };
        });
        normalised.sort((a, z) => a.tStart - z.tStart);
        return (
          <div className="rounded-lg border border-border/60 bg-card p-3">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                What you said
              </p>
              <span className="text-[10px] text-muted-foreground">
                ~{fb.answerSummary!.wordCount} word{fb.answerSummary!.wordCount === 1 ? "" : "s"} · in spoken order
              </span>
            </div>
            <ol className="text-sm text-foreground/90 space-y-1.5">
              {normalised.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="shrink-0 inline-flex items-center rounded-md border border-border/60 bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {b.location || `#${i + 1}`}
                  </span>
                  <span className="leading-snug">{b.text}</span>
                </li>
              ))}
            </ol>
          </div>
        );
      })()}

      {fb.coreFeedback && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(["structure", "knowledge", "communication"] as const).map((key) => {
            const entry = fb.coreFeedback![key];
            const ratingStyles: Record<CoreRating, string> = {
              strong: "border-primary/40 bg-primary/10 text-primary",
              adequate: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
              weak: "border-destructive/40 bg-destructive/10 text-destructive",
            };
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            return (
              <div
                key={key}
                className="rounded-lg border border-border/60 bg-card p-3 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${ratingStyles[entry.rating]}`}
                  >
                    {entry.rating}
                  </span>
                </div>
                <p className="text-xs text-foreground/85 leading-snug">{entry.comment}</p>
              </div>
            );
          })}
        </div>
      )}

      {fb.rubricBreakdown?.length > 0 && (
        <div className="rounded-lg border border-border/60 bg-card p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Rubric breakdown
          </p>
          <ul className="space-y-1.5 text-sm">
            {fb.rubricBreakdown.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="font-mono text-xs text-primary font-semibold flex-shrink-0 w-10">
                  {r.awarded}/{r.max}
                </span>
                <span className="leading-snug">
                  <span className="font-medium text-foreground">{r.criterion}:</span>{" "}
                  <span className="text-foreground/80">{r.comment}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {fb.strengths && fb.strengths.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Strengths
          </p>
          <ul className="list-disc list-inside text-sm text-foreground/90 space-y-0.5">
            {fb.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {fb.gaps?.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Gaps the examiner spotted
          </p>
          <ul className="list-disc list-inside text-sm text-foreground/90 space-y-0.5">
            {fb.gaps.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-lg border border-border/60 bg-card p-3 space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Model answer
          </p>
          <Button
            type="button"
            size="sm"
            variant={showAnnotation ? "secondary" : "outline"}
            onClick={loadAnnotation}
            disabled={annotating}
          >
            {annotating ? (
              <>
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                Annotating…
              </>
            ) : (
              <>
                <Highlighter className="h-3.5 w-3.5 mr-1.5" />
                {annotation
                  ? showAnnotation
                    ? "Hide annotations"
                    : "Show annotations"
                  : "Reveal annotated answer"}
              </>
            )}
          </Button>
        </div>

        {showAnnotation && annotation ? (
          <>
            <div
              className="text-sm text-foreground/90 leading-relaxed [&_mark]:text-foreground"
              // Sanitized in sanitizeAnnotatedHtml — only <mark data-kind title class> survives.
              dangerouslySetInnerHTML={{ __html: annotation.annotatedHtml }}
            />
            <div className="flex items-center gap-3 flex-wrap pt-1 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-3.5 rounded bg-primary/20 border-b-2 border-primary/70" />
                FRCA high-yield point
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-3.5 rounded bg-destructive/15 border-b-2 border-destructive/60 border-dotted" />
                Common pitfall
              </span>
            </div>

            {annotation.highYieldPoints.length > 0 && (
              <div className="pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">
                  FRCA high-yield checklist
                </p>
                <ul className="list-disc list-inside text-sm text-foreground/90 space-y-0.5">
                  {annotation.highYieldPoints.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {annotation.pitfalls.length > 0 && (
              <div className="pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-destructive mb-1">
                  Common pitfalls
                </p>
                <ul className="list-disc list-inside text-sm text-foreground/90 space-y-0.5">
                  {annotation.pitfalls.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-foreground/90 leading-relaxed">{fb.modelAnswer}</p>
        )}
      </div>
    </div>
  );
};

// ---- Main component ------------------------------------------------------
const DemoVivaInteractive = ({
  question: initialQuestion,
  topicTitle,
  exam,
}: DemoVivaInteractiveProps) => {
  const [rounds, setRounds] = useState<Round[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);
  const [currentKind, setCurrentKind] = useState<"main" | "followup">("main");
  const [showAnswerBox, setShowAnswerBox] = useState(true);

  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [recording, setRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitElapsed, setSubmitElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  /** Last submitted answer text — kept after a failure so "Retry marking" can resend it without losing what the candidate said. */
  const [pendingAnswer, setPendingAnswer] = useState<string | null>(null);
  /** Per-finalised-segment microphone recognition confidence (0–1). */
  const [confSegments, setConfSegments] = useState<ConfidenceSegment[]>([]);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const finalisedRef = useRef<string>("");
  /** Approximate timeline of finalised speech chunks during the current recording. */
  const segmentsRef = useRef<{ tStart: number; text: string }[]>([]);
  const recordingStartRef = useRef<number>(0);
  const sttSupported = !!getSpeechRecognitionCtor();

  const followupsAsked = rounds.filter((r) => r.kind === "followup").length;
  const lastFeedback = rounds[rounds.length - 1]?.feedback ?? null;
  const canAskFollowup =
    !!lastFeedback?.nextStep &&
    followupsAsked < MAX_FOLLOWUPS &&
    !showAnswerBox;

  // Reset session when the parent question changes (e.g. card re-renders).
  useEffect(() => {
    setRounds([]);
    setCurrentQuestion(initialQuestion);
    setCurrentKind("main");
    setShowAnswerBox(true);
    setTranscript("");
    setInterim("");
    setError(null);
    setPendingAnswer(null);
    finalisedRef.current = "";
    setConfSegments([]);
  }, [initialQuestion]);

  useEffect(() => {
    return () => {
      try {
        recognitionRef.current?.abort();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const startRecording = useCallback(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      toast.error("Live transcription isn't supported here — type your answer instead.");
      return;
    }
    setError(null);
    finalisedRef.current = transcript ? transcript.trim() + " " : "";
    setInterim("");
    // Reset the timeline for this recording session.
    segmentsRef.current = [];
    setConfSegments([]);
    recordingStartRef.current = Date.now();

    const r = new Ctor();
    r.lang = "en-GB";
    r.continuous = true;
    r.interimResults = true;
    // Two alternatives → more reliable confidence on supporting browsers.
    (r as any).maxAlternatives = 2;

    r.onresult = (e: any) => {
      let interimText = "";
      const newConf: ConfidenceSegment[] = [];
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const text = res[0]?.transcript ?? "";
        if (res.isFinal) {
          const trimmed = text.trim();
          if (trimmed) {
            const tStart = Math.max(
              0,
              Math.round((Date.now() - recordingStartRef.current) / 1000),
            );
            segmentsRef.current.push({ tStart, text: trimmed });
            const confidence = typeof res[0].confidence === "number" ? res[0].confidence : 0;
            newConf.push({ text: trimmed, confidence });
          }
          finalisedRef.current += text + " ";
        } else {
          interimText += text;
        }
      }
      if (newConf.length > 0) {
        setConfSegments((prev) => [...prev, ...newConf]);
      }
      setTranscript(finalisedRef.current.trim());
      setInterim(interimText.trim());
    };
    r.onerror = (e: any) => {
      console.error("DemoViva recognition error:", e);
      if (e?.error && e.error !== "aborted" && e.error !== "no-speech") {
        setError(`Microphone error: ${e.error}`);
      }
    };
    r.onend = () => {
      setRecording(false);
      setInterim("");
    };

    try {
      r.start();
      recognitionRef.current = r;
      setRecording(true);
    } catch (err) {
      console.error("Failed to start recognition:", err);
      setError("Could not access the microphone. Check browser permissions.");
    }
  }, [transcript]);

  const stopRecording = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* ignore */
    }
  }, []);

  const submitAnswer = useCallback(
    async (answer: string) => {
      setSubmitting(true);
      setError(null);
      setSubmitElapsed(0);
      const startedAt = performance.now();
      // Tick a live "elapsed" counter every 100ms so the user sees the request progressing.
      const tick = window.setInterval(() => {
        setSubmitElapsed(Math.round(performance.now() - startedAt));
      }, 100);
      try {
        // Send the spoken timeline (when we have one) so the examiner can
        // anchor each "What you said" bullet to its real position in the answer.
        const segments = segmentsRef.current.length > 0
          ? segmentsRef.current.slice()
          : undefined;
        const { data, error: invokeError } = await supabase.functions.invoke("viva", {
          body: {
            mode: "feedback",
            topicTitle,
            exam,
            question: currentQuestion,
            transcript: answer,
            segments,
          },
        });
        if (invokeError) throw invokeError;
        if (!data || typeof data !== "object" || !("score" in data)) {
          throw new Error("Unexpected response from examiner.");
        }
        const latencyMs = Math.round(performance.now() - startedAt);
        const fb = data as Feedback;
        setRounds((prev) => [
          ...prev,
          { question: currentQuestion, kind: currentKind, answer, feedback: fb, latencyMs },
        ]);
        // Reset answer box for the next round.
        setShowAnswerBox(false);
        setTranscript("");
        setInterim("");
        setPendingAnswer(null);
        finalisedRef.current = "";
        segmentsRef.current = [];
        setConfSegments([]);
      } catch (err) {
        console.error("Viva feedback failed:", err);
        const msg = err instanceof Error ? err.message : "Could not generate feedback.";
        setError(msg);
        // Keep the answer so "Retry marking" works without losing what they said.
        setPendingAnswer(answer);
        toast.error(msg);
      } finally {
        window.clearInterval(tick);
        setSubmitting(false);
      }
    },
    [topicTitle, exam, currentQuestion, currentKind],
  );

  const submit = useCallback(() => {
    const answer = transcript.trim();
    if (!answer) {
      toast.error("Add an answer first — speak or type.");
      return;
    }
    void submitAnswer(answer);
  }, [transcript, submitAnswer]);

  const retryMarking = useCallback(() => {
    if (!pendingAnswer) return;
    void submitAnswer(pendingAnswer);
  }, [pendingAnswer, submitAnswer]);

  const acceptFollowup = useCallback(() => {
    if (!lastFeedback?.nextStep) return;
    setCurrentQuestion(lastFeedback.nextStep);
    setCurrentKind("followup");
    setShowAnswerBox(true);
    setTranscript("");
    setInterim("");
    setError(null);
    setPendingAnswer(null);
    finalisedRef.current = "";
    setConfSegments([]);
  }, [lastFeedback]);

  const reset = useCallback(() => {
    setRounds([]);
    setCurrentQuestion(initialQuestion);
    setCurrentKind("main");
    setShowAnswerBox(true);
    setTranscript("");
    setInterim("");
    setError(null);
    setPendingAnswer(null);
    finalisedRef.current = "";
    setConfSegments([]);
  }, [initialQuestion]);

  return (
    <div className="space-y-3">
      {/* Past rounds */}
      {rounds.map((r, i) => (
        <FeedbackPanel key={i} round={r} topicTitle={topicTitle} exam={exam} />
      ))}

      {/* Follow-up CTA */}
      {canAskFollowup && lastFeedback && (
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              Examiner follow-up · targeted at your gap
            </span>
          </div>
          <p className="text-sm text-foreground/90 leading-snug italic">
            "{lastFeedback.nextStep}"
          </p>
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <Button type="button" size="sm" onClick={acceptFollowup}>
              <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
              Answer follow-up
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
              Restart
            </Button>
            <span className="text-[11px] text-muted-foreground">
              {MAX_FOLLOWUPS - followupsAsked} follow-up
              {MAX_FOLLOWUPS - followupsAsked === 1 ? "" : "s"} remaining
            </span>
          </div>
        </div>
      )}

      {/* End-of-session controls when follow-ups exhausted */}
      {!showAnswerBox && !canAskFollowup && rounds.length > 0 && (
        <Button type="button" size="sm" variant="outline" onClick={reset}>
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          Restart this question
        </Button>
      )}

      {/* Active answer box */}
      {showAnswerBox && (
        <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
          {currentKind === "followup" && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">
                Follow-up question
              </p>
              <p className="text-sm text-foreground/90 italic leading-snug">"{currentQuestion}"</p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Mic className="h-3.5 w-3.5 text-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Your answer
            </span>
          </div>

          <Textarea
            value={transcript + (interim ? (transcript ? " " : "") + interim : "")}
            onChange={(e) => {
              if (recording) return;
              setTranscript(e.target.value);
              finalisedRef.current = e.target.value.trim() + " ";
            }}
            placeholder={
              sttSupported
                ? "Tap the mic and answer aloud, or type your answer here…"
                : "Type your answer here (voice input isn't supported in this browser)…"
            }
            rows={4}
            className="text-sm resize-none"
            disabled={submitting}
          />

          {(recording || confSegments.length > 0) && (
            <MicConfidenceMeter
              segments={confSegments}
              listening={recording}
              onPickFlagged={(seg) => {
                // Copy the shaky phrase so the user can paste it into a search
                // engine or quickly find/replace it inside the textarea above.
                if (typeof navigator !== "undefined" && navigator.clipboard) {
                  void navigator.clipboard.writeText(seg.text);
                  toast.success(`Copied "${seg.text}" — edit it in the box above.`);
                }
              }}
            />
          )}

          {submitting && (
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
              <span>
                Asking the AI examiner…{" "}
                <span className="font-mono text-foreground/80">
                  {(submitElapsed / 1000).toFixed(1)}s
                </span>
              </span>
            </div>
          )}

          {error && !submitting && (
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 space-y-2">
              <p className="text-xs text-destructive">
                <span className="font-semibold">Marking failed:</span> {error}
              </p>
              {pendingAnswer && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={retryMarking}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
                  Retry marking
                </Button>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            {sttSupported && (
              <Button
                type="button"
                size="sm"
                variant={recording ? "destructive" : "secondary"}
                onClick={recording ? stopRecording : startRecording}
                disabled={submitting}
              >
                {recording ? (
                  <>
                    <MicOff className="h-3.5 w-3.5 mr-1.5" />
                    Stop recording
                  </>
                ) : (
                  <>
                    <Mic className="h-3.5 w-3.5 mr-1.5" />
                    {transcript ? "Resume recording" : "Start answering"}
                  </>
                )}
              </Button>
            )}
            <Button
              type="button"
              size="sm"
              onClick={submit}
              disabled={submitting || recording || !transcript.trim()}
            >
              {submitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                  Marking… {(submitElapsed / 1000).toFixed(1)}s
                </>
              ) : (
                <>
                  <Send className="h-3.5 w-3.5 mr-1.5" />
                  Submit for feedback
                </>
              )}
            </Button>
            {transcript && !recording && !submitting && (
              <Button type="button" size="sm" variant="ghost" onClick={reset}>
                Clear
              </Button>
            )}
          </div>

          {recording && (
            <p className="text-[11px] text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-destructive animate-pulse mr-1.5 align-middle" />
              Listening… speak naturally; tap stop when finished.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DemoVivaInteractive;
