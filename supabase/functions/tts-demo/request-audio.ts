/** Covers both upstream response headers and downloading the audio body. */
export const AUDIO_TIMEOUT_MS = 20_000;

export async function requestAudio(
  apiKey: string,
  input: string,
  voice: string,
  fetcher: typeof fetch = fetch,
): Promise<ArrayBuffer> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AUDIO_TIMEOUT_MS);
  try {
    const response = await fetcher("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        voice,
        input,
        response_format: "mp3",
        speed: 1.0,
      }),
    });
    if (!response.ok) throw new Error(`TTS upstream status ${response.status}`);
    return await response.arrayBuffer();
  } finally {
    clearTimeout(timer);
  }
}