import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(`supabase/functions/${path}`, "utf8");

describe("Approved supported-model replacements", () => {
  it.each([
    ["_shared/moderation.ts", "google/gemini-3.1-flash-lite"],
    ["submit-review/index.ts", "google/gemini-3.1-flash-lite"],
    ["audit-topics/index.ts", "google/gemini-3.1-pro-preview"],
    ["generate-podcast/index.ts", "google/gemini-3.1-pro-preview"],
    ["verify-drugs/index.ts", "google/gemini-3.8-flash"],
  ])("uses the approved model in %s", (path, model) => {
    const text = source(path);
    expect(text).toContain(model);
    expect(text).not.toMatch(/google\/gemini-2\.5-(?:pro|flash)/);
    expect(text).toContain("https://ai.gateway.lovable.dev/v1/chat/completions");
  });

  it("preserves audit routing, drug-check timeout and podcast speech", () => {
    expect(source("audit-topics/index.ts")).toContain('args.model ?? "google/gemini-3.1-pro-preview"');
    expect(source("verify-drugs/index.ts")).toContain("setTimeout(() => ctrl.abort(), 45_000)");
    expect(source("generate-podcast/index.ts")).toContain('const TTS_MODEL = "gpt-4o-mini-tts"');
    expect(source("generate-podcast/index.ts")).toContain("https://api.openai.com/v1/audio/speech");
  });
});