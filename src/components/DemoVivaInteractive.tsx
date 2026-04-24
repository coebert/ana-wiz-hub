import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Mic, MicOff, Send, RotateCcw, Sparkles } from "lucide-react";
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

interface DemoVivaInteractiveProps {
  question: string;
  topicTitle: string;
  /** Maps to the exam standard the demo question is calibrated to. */
  exam: Exam;
}

// ---- Browser SpeechRecognition shim (same shape used in VivaSession). -----
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

const DemoVivaInteractive = ({ question, topicTitle, exam }: DemoVivaInteractiveProps) => {
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [recording, setRecording] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const finalisedRef = useRef<string>("");
  const sttSupported = !!getSpeechRecognitionCtor();

  // Cleanup on unmount.
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
          question,
          transcript: answer,
        },
      });
      if (invokeError) throw invokeError;
      if (!data || typeof data !== "object" || !("score" in data)) {
        throw new Error("Unexpected response from examiner.");
      }
      setFeedback(data as Feedback);
    } catch (err) {
      console.error("Viva feedback failed:", err);
      const msg = err instanceof Error ? err.message : "Could not generate feedback.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }, [transcript, topicTitle, exam, question]);

  const reset = useCallback(() => {
    setTranscript("");
    setInterim("");
    setFeedback(null);
    setError(null);
    finalisedRef.current = "";
  }, []);

  // ---- Rendered states ------------------------------------------------------

  if (feedback) {
    return (
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              AI examiner feedback
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/15 text-primary px-2.5 py-0.5 text-xs font-semibold">
              {feedback.score}/10
            </span>
            <span className="text-xs text-foreground/80">{feedback.verdict}</span>
          </div>
        </div>

        {feedback.rubricBreakdown?.length > 0 && (
          <div className="rounded-lg border border-border/60 bg-card p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Rubric breakdown
            </p>
            <ul className="space-y-1.5 text-sm">
              {feedback.rubricBreakdown.map((r, i) => (
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

        {feedback.strengths && feedback.strengths.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Strengths
            </p>
            <ul className="list-disc list-inside text-sm text-foreground/90 space-y-0.5">
              {feedback.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {feedback.gaps?.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Gaps
            </p>
            <ul className="list-disc list-inside text-sm text-foreground/90 space-y-0.5">
              {feedback.gaps.map((g, i) => (
                <li key={i}>{g}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-lg border border-border/60 bg-card p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Model answer
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">{feedback.modelAnswer}</p>
        </div>

        {feedback.nextStep && (
          <p className="text-xs text-muted-foreground italic">
            <span className="font-semibold text-foreground/80">Examiner would ask next:</span>{" "}
            {feedback.nextStep}
          </p>
        )}

        <Button type="button" size="sm" variant="outline" onClick={reset}>
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Mic className="h-3.5 w-3.5 text-primary" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Your answer
        </span>
      </div>

      <Textarea
        value={transcript + (interim ? (transcript ? " " : "") + interim : "")}
        onChange={(e) => {
          if (recording) return; // don't let typing fight the recogniser
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
  );
};

export default DemoVivaInteractive;
