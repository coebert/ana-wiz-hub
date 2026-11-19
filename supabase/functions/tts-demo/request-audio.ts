export const DEFAULT_VOICE = "alloy";

// Cached preferences can contain the original role names or an explicit voice identity.
const KNOWN_VOICES = new Set([
  "alloy", "onyx", "nova", "Kore", "Charon", "Aoede", "Puck", "Fenrir", "Leda", "Orus", "Zephyr",
]);

export function resolveVoice(voice: unknown): string {
  return typeof voice === "string" && KNOWN_VOICES.has(voice) ? voice : DEFAULT_VOICE;
}

export function speechBody(text: string, voice: string) {
  return {
    text,
    voice,
    format: "pcm-sse" as const,
    instructions: "Read aloud in a clear, calm British examiner tone.",
  };
}
