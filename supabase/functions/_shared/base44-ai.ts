import { vivaVoicePreset } from "./viva-voice-presets.ts";
import { callBase44Relay } from "./base44-assertion.ts";

function unavailable(status: number, code: string, message: string): Response {
  return Response.json({ code, error: message }, {
    status, headers: { "Cache-Control": "no-store" },
  });
}

async function dispatch(operation: "chat" | "speech", payload: Record<string, unknown>, signal?: AbortSignal) {
  try {
    return await callBase44Relay(operation, payload, signal);
  } catch (error) {
    if (signal?.aborted) throw error;
    return unavailable(503, "BASE44_UNAVAILABLE", "The Base44 AI service is unavailable.");
  }
}

export async function relayChat(payload: Record<string, unknown>, signal?: AbortSignal): Promise<Response> {
  if (!payload || !Array.isArray(payload.messages) || payload.messages.length === 0) {
    return unavailable(400, "INVALID_MESSAGES", "A chat request needs at least one message.");
  }
  // The Base44 function selects the model and service credentials.
  const { model: _model, ...request } = payload;
  return dispatch("chat", request, signal);
}

type SpeechRequest = {
  text: string;
  voice: string;
  format: "mp3" | "pcm-sse";
  instructions?: string;
};

const voices = new Set(["alloy", "ash", "ballad", "coral", "echo", "fable", "nova", "onyx", "sage", "shimmer", "verse", "marin", "cedar"]);

function pcmEvents(bytes: Uint8Array, signal?: AbortSignal): Response {
  // Even, divisible-by-three chunks preserve 16-bit samples and base64 block boundaries.
  const chunkBytes = 12_288;
  const encoder = new TextEncoder();
  let offset = 0;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (signal?.aborted) {
        controller.error(signal.reason);
        return;
      }
      if (offset >= bytes.length) {
        controller.enqueue(encoder.encode('data: {"type":"speech.audio.done"}\n\n'));
        controller.close();
        return;
      }
      const chunk = bytes.subarray(offset, offset + chunkBytes);
      offset += chunk.length;
      const audio = btoa(String.fromCharCode(...chunk));
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "speech.audio.delta", audio })}\n\n`));
    },
  });
  return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-store" } });
}

export async function relaySpeech(request: SpeechRequest, signal?: AbortSignal): Promise<Response> {
  if (!request || typeof request.text !== "string" || !request.text.trim() || request.text.length > 5_000 ||
      !["pcm-sse", "mp3"].includes(request.format) ||
      (request.instructions !== undefined && (typeof request.instructions !== "string" || request.instructions.length > 2_000))) {
    return unavailable(400, "INVALID_SPEECH_REQUEST", "Invalid speech request.");
  }
  const voice = vivaVoicePreset(request.voice) ?? request.voice;
  if (!voices.has(voice)) return unavailable(422, "UNSUPPORTED_VOICE", "The selected voice is unavailable.");
  const pcm = request.format === "pcm-sse";
  const response = await dispatch("speech", {
    input: request.text, voice, response_format: pcm ? "pcm" : "mp3",
    ...(request.instructions !== undefined ? { instructions: request.instructions } : {}),
  }, signal);
  if (!response.ok) return response;
  const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
  const mediaType = contentType.split(";")[0].trim();
  const wrongRate = /(?:^|;)\s*rate\s*=\s*(?!24000(?:\s*;|\s*$))/.test(contentType);
  const wrongChannels = /(?:^|;)\s*channels\s*=\s*(?!1(?:\s*;|\s*$))/.test(contentType);
  const invalidAudio = () => unavailable(502, "INVALID_AUDIO", "The Base44 speech service returned invalid audio.");
  if (pcm ? mediaType !== "audio/pcm" || wrongRate || wrongChannels : mediaType !== "audio/mpeg") {
    await response.body?.cancel();
    return invalidAudio();
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (pcm) return bytes.length > 0 && bytes.length % 2 === 0 ? pcmEvents(bytes, signal) : invalidAudio();
  const id3 = bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33;
  const frameSync = bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0;
  if (bytes.length < 4 || !(id3 || frameSync)) return invalidAudio();
  return new Response(bytes, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
}
