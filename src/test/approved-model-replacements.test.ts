import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const fn = (path: string) => readFileSync(`supabase/functions/${path}`, "utf8");
const client = readFileSync("supabase/functions/_shared/base44-ai.ts", "utf8");
const relay = readFileSync("base44/shared/ai-relay.ts", "utf8");
const assertion = readFileSync("supabase/functions/_shared/base44-assertion.ts", "utf8");

/**
 * Every model caller must reach a model through the Base44 relay. The relay
 * owns provider selection and credentials; a direct provider or Lovable AI
 * endpoint here would be an unmonitored model call outside the assertion,
 * replay-reservation and response-shape checks.
 */
const MODEL_CALLERS = [
  "_shared/moderation.ts",
  "submit-review/index.ts",
  "audit-topics/index.ts",
  "generate-podcast/index.ts",
  "verify-drugs/index.ts",
  "kb-chat/index.ts",
];

describe("Model calls go through the Base44 relay", () => {
  it.each(MODEL_CALLERS)("%s uses the relay and no direct provider endpoint", (path) => {
    const text = fn(path);
    expect(text).toMatch(/relayChat|relaySpeech|createBase44ChatProvider/);
    expect(text).not.toMatch(/ai\.gateway\.lovable\.dev/);
    expect(text).not.toMatch(/LOVABLE_API_KEY/);
    expect(text).not.toMatch(/api\.openai\.com\/v1\/(?:chat\/completions|audio\/speech)/);
    expect(text).not.toMatch(/generativelanguage\.googleapis\.com/);
  });

  it("pins the relay destination and refuses a redirected one", () => {
    expect(assertion).toContain('const target = "https://ana-core-link.base44.app/api/aiRelay"');
    expect(assertion).toContain("Unexpected Base44 AI relay address");
    expect(assertion).toContain('redirect: "error"');
  });

  it("keeps the relay's assertion, replay reservation and bounded operations", () => {
    expect(relay).toContain('if (status === 409) return error(409,"Request already accepted")');
    expect(relay).toContain("MAX_BODY");
    expect(relay).toContain('operation === "chat" ? "chat/completions" : "audio/speech"');
    expect(relay).toContain('return error(503,"Relay verification unavailable")');
  });

  it("lets the relay choose the model and provider, never the caller", () => {
    // The client strips any caller-supplied model before dispatch…
    expect(client).toContain("const { model: _model, ...request } = payload;");
    // …and the Base44 function takes the upstream connection from its own service role.
    const entry = readFileSync("base44/functions/aiRelay/entry.ts", "utf8");
    expect(entry).toContain("asServiceRole.aiGateway.connection()");
    expect(entry).not.toMatch(/LOVABLE_API_KEY|api\.openai\.com\/v1\/chat/);
  });

  it("preserves the clinical source checks", () => {
    // Audit findings must quote the topic and a contradicting source, with DOI/PMID.
    const audit = fn("audit-topics/index.ts");
    expect(audit).toContain("topic_quote");
    expect(audit).toContain("source_quote");
    expect(audit).toContain("emit_findings");
    expect(audit).toContain("DOI");
    expect(audit).toContain("PMID");

    // Drug verification keeps its bounded timeout and never keeps an incomplete monograph.
    const drugs = fn("verify-drugs/index.ts");
    expect(drugs).toContain("AbortSignal.timeout(45_000)");
    expect(drugs).toContain("retained the original record");

    // Narration and chat keep their relay operations.
    expect(fn("generate-podcast/index.ts")).toContain("relaySpeech");
    expect(fn("kb-chat/index.ts")).toContain("createBase44ChatProvider()");
  });
});
