import { afterEach, describe, expect, it, vi } from "vitest";
import { requestAudio, AUDIO_TIMEOUT_MS } from "../../supabase/functions/tts-demo/request-audio";
import { requestVivaAudio, VIVA_AUDIO_TIMEOUT_MS, VIVA_AUDIO_ERROR } from "./viva-audio";

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { functions: { invoke } } }));

afterEach(() => { vi.useRealTimers(); vi.clearAllMocks(); });

describe("bounded viva audio", () => {
  it("aborts slow upstream generation before the edge wall-clock limit", async () => {
    vi.useFakeTimers();
    let signal: AbortSignal | null | undefined;
    const fetcher = vi.fn((_url: unknown, options?: RequestInit) => {
      signal = options?.signal;
      return new Promise<Response>((_resolve, reject) => {
        signal?.addEventListener("abort", () => reject(new DOMException("Timed out", "AbortError")));
      });
    });
    const result = requestAudio("test-key", "Question", "alloy", fetcher as typeof fetch);
    const rejected = expect(result).rejects.toMatchObject({ name: "AbortError" });
    await vi.advanceTimersByTimeAsync(AUDIO_TIMEOUT_MS - 1);
    expect(signal?.aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    await rejected;
    expect(signal?.aborted).toBe(true);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("keeps the deadline active while downloading the audio body", async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn(async (_url: unknown, options?: RequestInit) => ({
      ok: true,
      arrayBuffer: () => new Promise<ArrayBuffer>((_resolve, reject) => {
        options?.signal?.addEventListener("abort", () => reject(new DOMException("Timed out", "AbortError")));
      }),
    }));
    const result = requestAudio("test-key", "Question", "alloy", fetcher as unknown as typeof fetch);
    const rejected = expect(result).rejects.toMatchObject({ name: "AbortError" });
    await vi.advanceTimersByTimeAsync(AUDIO_TIMEOUT_MS);
    await rejected;
  });

  it("returns the successful audio unchanged and clears the timer", async () => {
    vi.useFakeTimers();
    const bytes = new Uint8Array([1, 2, 3]).buffer;
    const fetcher = vi.fn(async () => new Response(bytes));
    expect(await requestAudio("test-key", "Question", "onyx", fetcher)).toEqual(bytes);
    expect(vi.getTimerCount()).toBe(0);
    expect(JSON.parse(fetcher.mock.calls[0]?.[1]?.body as string).voice).toBe("onyx");
  });

  it("gives every client a request deadline and returns playable audio", async () => {
    invoke.mockResolvedValue({ data: { audioBase64: "AQID", mimeType: "audio/mpeg" }, error: null });
    expect(await requestVivaAudio("Question", "nova")).toBe("data:audio/mpeg;base64,AQID");
    expect(invoke).toHaveBeenCalledWith("tts-demo", {
      body: { text: "Question", voice: "nova" }, timeout: VIVA_AUDIO_TIMEOUT_MS, signal: undefined,
    });
  });

  it("surfaces a readable retry fallback for a timeout or empty audio", async () => {
    invoke.mockResolvedValueOnce({ data: null, error: new Error("504") });
    await expect(requestVivaAudio("Question")).rejects.toThrow(VIVA_AUDIO_ERROR);
    invoke.mockResolvedValueOnce({ data: {}, error: null });
    await expect(requestVivaAudio("Question")).rejects.toThrow(VIVA_AUDIO_ERROR);
  });

  it("never requests audio after cancellation", async () => {
    const controller = new AbortController();
    controller.abort();
    await expect(requestVivaAudio("Question", undefined, controller.signal)).rejects.toMatchObject({ name: "AbortError" });
    expect(invoke).not.toHaveBeenCalled();
  });
});