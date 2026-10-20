import { describe, expect, it } from "vitest";
import { resolveVoice, speechBody, SPEECH_MODEL } from "../../supabase/functions/tts-demo/request-audio";
import { chunkSpeechText, decodePCM, MAX_CHUNK_CHARS } from "./viva-audio";

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

  it("requests SSE streaming from the hosted voice engine and keeps examiner/candidate voices distinct", () => {
    const body = speechBody("Question", resolveVoice("onyx"));
    expect(body.model).toBe(SPEECH_MODEL);
    expect(body.stream_format).toBe("sse");
    expect(resolveVoice("onyx")).not.toBe(resolveVoice("nova"));
    expect(resolveVoice("made-up")).toBe(resolveVoice(undefined));
  });
});
