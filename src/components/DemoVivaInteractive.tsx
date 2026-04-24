import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Highlighter,
  Loader2,
  Mic,
  MicOff,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Exam = "primary" | "final" | "fficm";

interface RubricRow {
  criterion: string;
  max: number;
  awarded: number;
  comment: string;
  quote?: string;
}

interface Feedback {
  score: number;
  verdict: string;
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
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-primary/15 text-primary px-2.5 py-0.5 text-xs font-semibold">
            {fb.score}/10
          </span>
          <span className="text-xs text-foreground/80">{fb.verdict}</span>
        </div>
      </div>

      {round.kind === "followup" && (
        <div className="rounded-lg border border-border/60 bg-card p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Examiner asked
          </p>
          <p className="text-sm text-foreground/90 italic leading-snug">"{round.question}"</p>
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
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const finalisedRef = useRef<string>("");
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
    finalisedRef.current = "";
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

    const r = new Ctor();
    r.lang = "en-GB";
    r.continuous = true;
    r.interimResults = true;

    r.onresult = (e: any) => {
      let interimText = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const text = res[0]?.transcript ?? "";
        if (res.isFinal) {
          finalisedRef.current += text + " ";
        } else {
          interimText += text;
        }
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

  const submit = useCallback(async () => {
    const answer = transcript.trim();
    if (!answer) {
      toast.error("Add an answer first — speak or type.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const { data, error: invokeError } = await supabase.functions.invoke("viva", {
        body: {
          mode: "feedback",
          topicTitle,
          exam,
          question: currentQuestion,
          transcript: answer,
        },
      });
      if (invokeError) throw invokeError;
      if (!data || typeof data !== "object" || !("score" in data)) {
        throw new Error("Unexpected response from examiner.");
      }
      const fb = data as Feedback;
      setRounds((prev) => [
        ...prev,
        { question: currentQuestion, kind: currentKind, answer, feedback: fb },
      ]);
      // Reset answer box for the next round.
      setShowAnswerBox(false);
      setTranscript("");
      setInterim("");
      finalisedRef.current = "";
    } catch (err) {
      console.error("Viva feedback failed:", err);
      const msg = err instanceof Error ? err.message : "Could not generate feedback.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }, [transcript, topicTitle, exam, currentQuestion, currentKind]);

  const acceptFollowup = useCallback(() => {
    if (!lastFeedback?.nextStep) return;
    setCurrentQuestion(lastFeedback.nextStep);
    setCurrentKind("followup");
    setShowAnswerBox(true);
    setTranscript("");
    setInterim("");
    setError(null);
    finalisedRef.current = "";
  }, [lastFeedback]);

  const reset = useCallback(() => {
    setRounds([]);
    setCurrentQuestion(initialQuestion);
    setCurrentKind("main");
    setShowAnswerBox(true);
    setTranscript("");
    setInterim("");
    setError(null);
    finalisedRef.current = "";
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

          {error && <p className="text-xs text-destructive">{error}</p>}

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
                  Marking…
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
