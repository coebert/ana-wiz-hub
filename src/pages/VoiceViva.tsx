import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Mic, MicOff, Loader2, AlertCircle, ShieldAlert, RefreshCw, HelpCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { allTopics, type ExamTag } from "@/data/curriculum";

type Exam = Extract<ExamTag, "primary" | "final" | "fficm">;

type MicPermission = "unknown" | "prompt" | "granted" | "denied";

interface FriendlyError {
  title: string;
  message: string;
  hint?: string;
  recoverable: boolean;
  kind: "permission" | "device" | "insecure" | "unsupported" | "network" | "server" | "unknown";
}

function detectBrowser(): "chrome" | "safari" | "firefox" | "edge" | "other" {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return "edge";
  if (/Firefox\//.test(ua)) return "firefox";
  if (/Chrome\//.test(ua)) return "chrome";
  if (/Safari\//.test(ua)) return "safari";
  return "other";
}

function permissionHint(): string {
  switch (detectBrowser()) {
    case "chrome":
    case "edge":
      return "Click the 🔒 padlock in the address bar → Site settings → set Microphone to Allow, then reload.";
    case "safari":
      return "Safari → Settings → Websites → Microphone → set this site to Allow, then reload.";
    case "firefox":
      return "Click the padlock in the address bar → Connection secure → More information → Permissions → clear the Microphone block, then reload.";
    default:
      return "Open your browser site settings and allow microphone access for this site, then reload.";
  }
}

function toFriendly(err: unknown): FriendlyError {
  if (typeof window !== "undefined" && !window.isSecureContext) {
    return {
      title: "Microphone needs a secure connection",
      message: "Browsers only allow microphone access over HTTPS or on localhost.",
      hint: "Open this page via the https:// URL and try again.",
      recoverable: false,
      kind: "insecure",
    };
  }
  if (typeof navigator !== "undefined" && !navigator.mediaDevices?.getUserMedia) {
    return {
      title: "Voice not supported in this browser",
      message: "Your browser does not expose microphone APIs.",
      hint: "Try the latest Chrome, Edge, Safari or Firefox on a desktop or mobile device.",
      recoverable: false,
      kind: "unsupported",
    };
  }
  const e = err as { name?: string; message?: string } | undefined;
  const name = e?.name ?? "";
  const msg = e?.message ?? String(err ?? "");
  if (name === "NotAllowedError" || name === "SecurityError" || /denied|permission/i.test(msg)) {
    return {
      title: "Microphone access blocked",
      message: "Your browser is blocking microphone access for this site.",
      hint: permissionHint(),
      recoverable: true,
      kind: "permission",
    };
  }
  if (name === "NotFoundError" || name === "OverconstrainedError" || /no.*device|not found/i.test(msg)) {
    return {
      title: "No microphone detected",
      message: "We couldn't find an input device to capture audio.",
      hint: "Plug in a microphone or headset, check it's selected in your system settings, then retry.",
      recoverable: true,
      kind: "device",
    };
  }
  if (name === "NotReadableError" || name === "AbortError" || /in use|busy|hardware/i.test(msg)) {
    return {
      title: "Microphone is busy",
      message: "Another app or browser tab is currently using your microphone.",
      hint: "Close other calls (Zoom, Teams, Meet, other tabs) and retry.",
      recoverable: true,
      kind: "device",
    };
  }
  if (/Realtime SDP|sdp exchange|fetch|network|failed to fetch/i.test(msg)) {
    return {
      title: "Couldn't reach the voice service",
      message: "The connection to the realtime voice service failed.",
      hint: "Check your internet connection and try again. Corporate networks sometimes block WebRTC — try a different network if it persists.",
      recoverable: true,
      kind: "network",
    };
  }
  if (/ephemeral key|token|session/i.test(msg)) {
    return {
      title: "Couldn't start a voice session",
      message: msg || "The session service didn't return a token.",
      hint: "Please retry. If this keeps happening let us know.",
      recoverable: true,
      kind: "server",
    };
  }
  return {
    title: "Something went wrong",
    message: msg || "Unexpected error starting the voice viva.",
    recoverable: true,
    kind: "unknown",
  };
}

interface RealtimeEvent {
  type: string;
  // OpenAI realtime events are a tagged union; we only read a few fields.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}

type Phase = "idle" | "connecting" | "live" | "ended" | "error";

interface TranscriptLine {
  role: "examiner" | "candidate";
  text: string;
  id: string;
}

/**
 * Live voice viva powered by OpenAI Realtime via WebRTC.
 * The ephemeral session token is minted by the `viva-voice-token` edge function;
 * the OpenAI API key never reaches the browser.
 */
export default function VoiceViva() {
  const [params, setParams] = useSearchParams();
  const topicId = params.get("topic") ?? "";
  const exam = ((params.get("exam") as Exam) || "final") as Exam;

  const topic = allTopics.find((t) => t.id === topicId) ?? null;

  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [muted, setMuted] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const micTrackRef = useRef<MediaStreamTrack | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);

  // Live partial-transcript buffers, indexed by item_id.
  const partialRef = useRef<Map<string, { role: "examiner" | "candidate"; text: string }>>(
    new Map(),
  );

  function appendOrUpdate(itemId: string, role: "examiner" | "candidate", text: string) {
    const prev = partialRef.current.get(itemId);
    partialRef.current.set(itemId, { role, text });
    setTranscript((cur) => {
      if (!prev) return [...cur, { id: itemId, role, text }];
      return cur.map((l) => (l.id === itemId ? { ...l, text } : l));
    });
  }

  function handleEvent(ev: RealtimeEvent) {
    switch (ev.type) {
      case "response.audio_transcript.delta":
        if (ev.item_id && typeof ev.delta === "string") {
          const cur = partialRef.current.get(ev.item_id)?.text ?? "";
          appendOrUpdate(ev.item_id, "examiner", cur + ev.delta);
        }
        break;
      case "response.audio_transcript.done":
        if (ev.item_id && typeof ev.transcript === "string") {
          appendOrUpdate(ev.item_id, "examiner", ev.transcript);
        }
        break;
      case "conversation.item.input_audio_transcription.completed":
        if (ev.item_id && typeof ev.transcript === "string") {
          appendOrUpdate(ev.item_id, "candidate", ev.transcript);
        }
        break;
      case "error":
        setError(ev.error?.message ?? "Realtime error");
        break;
    }
  }

  async function start() {
    setError(null);
    setPhase("connecting");
    setTranscript([]);
    partialRef.current.clear();

    try {
      const { data, error: fnErr } = await supabase.functions.invoke("viva-voice-token", {
        body: {
          topicTitle: topic?.title ?? "General anaesthesia",
          topicDescription: topic?.description,
          exam,
        },
      });
      if (fnErr) throw new Error(fnErr.message);
      const ephemeralKey: string | undefined = data?.value;
      if (!ephemeralKey) throw new Error("Missing ephemeral key from session response");

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Remote audio sink.
      const audioEl = audioElRef.current ?? new Audio();
      audioEl.autoplay = true;
      audioElRef.current = audioEl;
      pc.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
      };

      // Microphone.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const track = stream.getAudioTracks()[0];
      micTrackRef.current = track;
      pc.addTrack(track, stream);

      // Data channel for events.
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      dc.onmessage = (e) => {
        try {
          handleEvent(JSON.parse(e.data));
        } catch {
          // ignore non-JSON
        }
      };
      dc.onopen = () => setPhase("live");

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpResp = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ephemeralKey}`,
          "Content-Type": "application/sdp",
        },
        body: offer.sdp ?? "",
      });
      if (!sdpResp.ok) {
        throw new Error(`Realtime SDP exchange failed (${sdpResp.status}): ${await sdpResp.text()}`);
      }
      const answer: RTCSessionDescriptionInit = {
        type: "answer",
        sdp: await sdpResp.text(),
      };
      await pc.setRemoteDescription(answer);
    } catch (e) {
      setError((e as Error).message);
      setPhase("error");
      stop(false);
    }
  }

  function stop(updatePhase = true) {
    micTrackRef.current?.stop();
    micTrackRef.current = null;
    dcRef.current?.close();
    dcRef.current = null;
    pcRef.current?.getSenders().forEach((s) => s.track?.stop());
    pcRef.current?.close();
    pcRef.current = null;
    if (audioElRef.current) audioElRef.current.srcObject = null;
    if (updatePhase) setPhase((p) => (p === "error" ? p : "ended"));
  }

  function toggleMute() {
    const track = micTrackRef.current;
    if (!track) return;
    track.enabled = !track.enabled;
    setMuted(!track.enabled);
  }

  useEffect(() => () => stop(false), []);

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Live voice viva | Anaesthesia Core</title>
        <meta
          name="description"
          content="Speak to an AI FRCA examiner in real time. Live two-way voice viva with transcript and rubric feedback."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/viva/voice" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="container mx-auto max-w-3xl px-4 py-6">
        <Breadcrumbs items={[{ label: "Viva", to: "/viva" }, { label: "Live voice" }]} />
        <Link
          to="/viva"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to viva hub
        </Link>

        <header className="mb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground">
            <Mic className="h-3 w-3" /> Live voice viva
          </div>
          <h1 className="mt-3 font-serif text-3xl md:text-4xl font-bold text-foreground">
            {topic ? topic.title : "Choose a topic"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Two-way spoken viva with an AI examiner calibrated to{" "}
            {exam === "primary" ? "FRCA Primary" : exam === "final" ? "FRCA Final" : "FFICM"}{" "}
            standard.
          </p>
        </header>

        {!topic && (
          <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Pick a topic from the{" "}
              <Link to="/viva" className="text-primary underline">
                viva hub
              </Link>{" "}
              to start a live voice session.
            </p>
          </section>
        )}

        {topic && (
          <section className="rounded-2xl border border-border bg-card p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    phase === "live"
                      ? "bg-accent animate-pulse"
                      : phase === "connecting"
                        ? "bg-muted-foreground"
                        : "bg-border"
                  }`}
                />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {phase === "idle" && "Ready"}
                  {phase === "connecting" && "Connecting…"}
                  {phase === "live" && "Live — speak naturally"}
                  {phase === "ended" && "Session ended"}
                  {phase === "error" && "Error"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={exam}
                  onChange={(e) => setParams({ topic: topicId, exam: e.target.value })}
                  disabled={phase === "live" || phase === "connecting"}
                  className="rounded-lg border border-input bg-background px-2 py-1 text-xs text-foreground disabled:opacity-50"
                >
                  <option value="primary">Primary</option>
                  <option value="final">Final</option>
                  <option value="fficm">FFICM</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {phase === "idle" || phase === "ended" || phase === "error" ? (
                <button
                  type="button"
                  onClick={start}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
                >
                  <Mic className="h-4 w-4" />
                  {phase === "ended" ? "Start another" : "Start voice viva"}
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => stop()}
                    className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:opacity-90"
                  >
                    End session
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    disabled={phase !== "live"}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground hover:bg-secondary disabled:opacity-50"
                  >
                    {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    {muted ? "Unmute" : "Mute"}
                  </button>
                  {phase === "connecting" && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" /> Negotiating audio…
                    </span>
                  )}
                </>
              )}
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-5 max-h-[55vh] overflow-y-auto rounded-xl border border-border bg-muted/30 p-3 space-y-2">
              {transcript.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">
                  Transcript will appear here once the session starts.
                </p>
              ) : (
                transcript.map((line) => (
                  <div key={line.id} className="text-sm">
                    <span
                      className={`mr-2 text-[10px] uppercase tracking-wider font-semibold ${
                        line.role === "examiner" ? "text-primary" : "text-accent"
                      }`}
                    >
                      {line.role}
                    </span>
                    <span className="text-foreground">{line.text}</span>
                  </div>
                ))
              )}
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Audio is streamed to OpenAI Realtime for ASR + speech synthesis only. Nothing is
              stored on our servers.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
