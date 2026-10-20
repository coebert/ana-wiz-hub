import { supabase } from "@/integrations/supabase/client";

export const VIVA_AUDIO_TIMEOUT_MS = 25_000;
export const VIVA_AUDIO_ERROR = "Voice playback is unavailable. You can read the text and try Play again.";

/** One bounded request, shared by sessions, demos and the question library. */
export async function requestVivaAudio(text: string, voice?: string, signal?: AbortSignal): Promise<string> {
  if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
  const { data, error } = await supabase.functions.invoke("tts-demo", {
    body: { text, ...(voice ? { voice } : {}) },
    timeout: VIVA_AUDIO_TIMEOUT_MS,
    signal,
  });
  if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
  if (error || !data?.audioBase64) throw new Error(VIVA_AUDIO_ERROR);
  return `data:${data.mimeType ?? "audio/mpeg"};base64,${data.audioBase64}`;
}