import { relaySpeech } from "../_shared/base44-ai.ts";

export const DEFAULT_VOICE = "alloy";

// Cached preferences can contain the original role names or an explicit voice identity.
const KNOWN_VOICES = new Set([
  "alloy", "onyx", "nova", "Kore", "Charon", "Aoede", "Puck", "Fenrir", "Leda", "Orus", "Zephyr",
]);

export function resolveVoice(voice: unknown): string {
  return typeof voice === "string" && KNOWN_VOICES.has(voice) ? voice : DEFAULT_VOICE;
}

export function requestSpeechStream(text: string, voice: string, signal?: AbortSignal): Promise<Response> {
  return relaySpeech({
    text,
    voice,
    format: "pcm-sse",
    instructions: "Read aloud in a clear, calm British examiner tone.",
  }, signal);
}
