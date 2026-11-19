import { vivaVoicePreset } from "../_shared/viva-voice-presets.ts";

export const DEFAULT_VOICE = "alloy";

export function resolveVoice(voice: unknown): string {
  return vivaVoicePreset(voice) ?? DEFAULT_VOICE;
}

export function speechBody(text: string, voice: string) {
  return {
    text,
    voice,
    format: "pcm-sse" as const,
    instructions: "Read aloud in a clear, calm British examiner tone.",
  };
}
