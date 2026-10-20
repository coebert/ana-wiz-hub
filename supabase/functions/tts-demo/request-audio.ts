/** Hosted streaming voice engine (Lovable AI, Gemini TTS). No artificial deadline: audio streams as it is generated. */
export const SPEECH_MODEL = "google/gemini-3.1-flash-tts-preview";
export const DEFAULT_VOICE = "Kore";

/** Legacy OpenAI voice names used by callers → Gemini prebuilt voices. */
const VOICE_MAP: Record<string, string> = {
  alloy: "Kore",
  onyx: "Charon", // deeper — examiner
  nova: "Aoede", // brighter — candidate
};
const GEMINI_VOICES = new Set(["Kore", "Charon", "Aoede", "Puck", "Fenrir", "Leda", "Orus", "Zephyr"]);

export function resolveVoice(voice: unknown): string {
  if (typeof voice !== "string") return DEFAULT_VOICE;
  if (VOICE_MAP[voice]) return VOICE_MAP[voice];
  return GEMINI_VOICES.has(voice) ? voice : DEFAULT_VOICE;
}

export function speechBody(input: string, voice: string) {
  return {
    model: SPEECH_MODEL,
    stream_format: "sse",
    contents: [{ role: "user", parts: [{ text: `Read aloud in a clear, calm British examiner tone: ${input}` }] }],
    generationConfig: {
      responseModalities: ["AUDIO"],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } },
    },
  };
}

export function requestSpeechStream(
  apiKey: string,
  input: string,
  voice: string,
  signal?: AbortSignal,
  fetcher: typeof fetch = fetch,
): Promise<Response> {
  return fetcher("https://ai.gateway.lovable.dev/v1/audio/speech", {
    method: "POST",
    signal,
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(speechBody(input, voice)),
  });
}
