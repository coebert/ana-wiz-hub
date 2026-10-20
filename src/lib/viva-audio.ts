import { createParser } from "eventsource-parser";
import { supabase } from "@/integrations/supabase/client";

export const VIVA_AUDIO_ERROR = "Voice playback is unavailable. You can read the text and try Play again.";
export const SAMPLE_RATE = 24_000;
/** Each request stays short so audio starts quickly; long text is played chunk by chunk. */
export const MAX_CHUNK_CHARS = 600;

/** Split text at sentence (then word) boundaries into chunks ≤ max chars. */
export function chunkSpeechText(text: string, max = MAX_CHUNK_CHARS): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const sentences = clean.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) ?? [clean];
  const chunks: string[] = [];
  let current = "";
  const push = (s: string) => { if (s.trim()) chunks.push(s.trim()); };
  for (const sentence of sentences) {
    if ((current + sentence).length <= max) { current += sentence; continue; }
    push(current);
    current = "";
    if (sentence.length <= max) { current = sentence; continue; }
    for (const word of sentence.split(" ")) {
      if ((current + " " + word).length > max) { push(current); current = word; }
      else current = current ? `${current} ${word}` : word;
    }
  }
  push(current);
  return chunks;
}

export function decodePCM(pending: Uint8Array, incoming: Uint8Array) {
  const bytes = new Uint8Array(pending.length + incoming.length);
  bytes.set(pending);
  bytes.set(incoming, pending.length);
  const usable = bytes.length - (bytes.length % 2);
  const view = new DataView(bytes.buffer);
  const samples = new Float32Array(usable / 2);
  for (let i = 0; i < samples.length; i++) samples[i] = view.getInt16(i * 2, true) / 32768;
  return { samples, pending: bytes.slice(usable) };
}

/** Replays reuse already-generated audio instead of another paid generation. */
const cache = new Map<string, Float32Array[]>();
const MAX_CACHE = 40;

export interface SpeechPlayback {
  /** Resolves when all audio has finished playing; rejects with VIVA_AUDIO_ERROR on failure. */
  done: Promise<void>;
  pause(): void;
  resume(): void;
  stop(): void;
}

async function authHeaders(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  return {
    "Content-Type": "application/json",
    apikey: key,
    Authorization: `Bearer ${data.session?.access_token ?? key}`,
  };
}

/** Stream one chunk; calls onSamples for each decoded piece as it arrives. */
async function streamChunk(text: string, voice: string | undefined, signal: AbortSignal, onSamples: (s: Float32Array) => void) {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tts-demo`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify({ text, ...(voice ? { voice } : {}) }),
    signal,
  });
  if (!response.ok || !response.body) throw new Error(`TTS failed: ${response.status} ${await response.text()}`);
  let pending = new Uint8Array(0);
  let completed = false;
  let got = 0;
  const parser = createParser({
    onEvent(event) {
      const payload = JSON.parse(event.data) as { type: string; audio?: string; error?: unknown };
      if (payload.type === "error" || payload.error) throw new Error(`Speech failed: ${event.data}`);
      if (payload.type === "speech.audio.done") { completed = true; return; }
      if (payload.type !== "speech.audio.delta") return;
      if (completed || !payload.audio) throw new Error("Invalid speech audio event");
      const decoded = decodePCM(pending, Uint8Array.from(atob(payload.audio), (c) => c.charCodeAt(0)));
      pending = new Uint8Array(decoded.pending);
      if (decoded.samples.length) { got += decoded.samples.length; onSamples(decoded.samples); }
    },
  });
  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      parser.feed(next.value);
    }
    parser.reset({ consume: true });
  } finally {
    reader.releaseLock();
  }
  if (!completed || !got || pending.length) throw new Error("Incomplete speech stream");
}

/**
 * Speak `text`, starting playback as soon as the first audio arrives.
 * Long text is split into chunks; the next chunk generates while the previous one plays.
 */
export function playVivaSpeech(text: string, opts: { voice?: string; signal?: AbortSignal; rate?: number } = {}): SpeechPlayback {
  const controller = new AbortController();
  const context = new AudioContext({ sampleRate: SAMPLE_RATE });
  const sources = new Set<AudioBufferSourceNode>();
  const rate = opts.rate ?? 1;
  let playhead = 0;
  let lastEnded: Promise<void> = Promise.resolve();
  let stopped = false;

  const schedule = (samples: Float32Array) => {
    const buffer = context.createBuffer(1, samples.length, SAMPLE_RATE);
    buffer.getChannelData(0).set(samples);
    const source = context.createBufferSource();
    source.buffer = buffer;
    source.playbackRate.value = rate;
    source.connect(context.destination);
    sources.add(source);
    lastEnded = new Promise<void>((resolve) => {
      source.onended = () => { sources.delete(source); resolve(); };
    });
    playhead = Math.max(playhead, context.currentTime + 0.05);
    source.start(playhead);
    playhead += buffer.duration / rate;
  };

  const stop = () => {
    if (stopped) return;
    stopped = true;
    controller.abort();
    for (const s of sources) { try { s.stop(); } catch { /* already stopped */ } }
    void context.close().catch(() => {});
  };
  opts.signal?.addEventListener("abort", stop, { once: true });

  const done = (async () => {
    if (opts.signal?.aborted) { stop(); throw new DOMException("Cancelled", "AbortError"); }
    try {
      if (context.state === "suspended") await context.resume();
      for (const chunk of chunkSpeechText(text)) {
        const key = `${opts.voice ?? ""}|${chunk}`;
        const cached = cache.get(key);
        if (cached) { cached.forEach(schedule); continue; }
        const parts: Float32Array[] = [];
        await streamChunk(chunk, opts.voice, controller.signal, (s) => { parts.push(s); schedule(s); });
        if (cache.size >= MAX_CACHE) cache.delete(cache.keys().next().value as string);
        cache.set(key, parts);
      }
      await lastEnded;
      if (stopped) throw new DOMException("Cancelled", "AbortError");
    } catch (err) {
      if (stopped || controller.signal.aborted) throw new DOMException("Cancelled", "AbortError");
      console.warn("[viva-audio]", err);
      throw new Error(VIVA_AUDIO_ERROR);
    } finally {
      opts.signal?.removeEventListener("abort", stop);
      if (!stopped) { stopped = true; void context.close().catch(() => {}); }
    }
  })();

  return {
    done,
    pause: () => { void context.suspend().catch(() => {}); },
    resume: () => { void context.resume().catch(() => {}); },
    stop,
  };
}

export const isCancelled = (err: unknown) => err instanceof DOMException && err.name === "AbortError";
