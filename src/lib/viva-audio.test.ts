import { describe, expect, it, vi } from "vitest";
import { resolveVoice, speechBody } from "../../supabase/functions/tts-demo/request-audio";
import { chunkSpeechText, decodePCM, MAX_CHUNK_CHARS } from "./viva-audio";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

describe("streaming viva speech", () => {
  it("splits long text into short chunks without losing words", () => {
    const sentence = "The functional residual capacity falls by about twenty percent in late pregnancy. ";
    const text = sentence.repeat(40);
    const chunks = chunkSpeechText(text);
    expect(chunks.length).toBeGreaterThan(1);
    for (const c of chunks) expect(c.length).toBeLessThanOrEqual(MAX_CHUNK_CHARS);
    expect(chunks.join(" ").split(" ").length).toBe(text.trim().split(" ").length);
  });

  it("breaks an over-long sentence at word boundaries", () => {
    const chunks = chunkSpeechText("word ".repeat(400), 100);
    for (const c of chunks) expect(c.length).toBeLessThanOrEqual(100);
    expect(chunks.join(" ").split(" ").length).toBe(400);
  });

  it("carries an odd trailing PCM byte into the next delta", () => {
    const first = decodePCM(new Uint8Array(0), new Uint8Array([0x00, 0x40, 0x01]));
    expect(first.samples.length).toBe(1);
    expect(first.samples[0]).toBe(0.5);
    const second = decodePCM(first.pending, new Uint8Array([0x00]));
    expect(second.samples.length).toBe(1);
    expect(second.pending.length).toBe(0);
  });

  it("requests examiner speech as PCM events", () => {
    expect(speechBody("Question", resolveVoice("onyx"))).toEqual({
      text: "Question",
      voice: "onyx",
      format: "pcm-sse",
      instructions: "Read aloud in a clear, calm British examiner tone.",
    });
  });

  it("keeps voice preferences distinct and uses the default for unknown names", () => {
    expect(resolveVoice("nova")).toBe("nova");
    expect(resolveVoice("Charon")).toBe("Charon");
    expect(resolveVoice("made-up")).toBe(resolveVoice(undefined));
    expect(resolveVoice(undefined)).toBe("alloy");
  });
});
