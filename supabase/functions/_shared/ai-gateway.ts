import { createOpenAICompatible } from "npm:@ai-sdk/openai-compatible";
import { callBase44Relay } from "./base44-assertion.ts";
import { relayChat } from "./base44-ai.ts";

/** The SDK uses our fetch implementation for every request. No provider URL is fetched here. */
export function createBase44ChatProvider() {
  return createOpenAICompatible({
    name: "base44",
    baseURL: "https://base44-sdk.invalid/v1",
    fetch: async (_input, init) => {
      if (typeof init?.body !== "string") {
        return Response.json({ error: "Invalid chat request" }, { status: 400 });
      }
      return relayChat(JSON.parse(init.body), init.signal ?? undefined);
    },
  });
}

/** Existing kb_chunks and its pgvector index require the original model and 1,536 coordinates. */
export async function embedTexts(input: string | string[]): Promise<number[][]> {
  const texts = typeof input === "string" ? [input] : input;
  if (!Array.isArray(texts) || !texts.length || texts.length > 32 ||
      texts.some(text => typeof text !== "string" || !text.trim())) {
    throw new Error("Invalid embedding batch");
  }
  let response: Response;
  try {
    response = await callBase44Relay("embeddings", { input: texts }, AbortSignal.timeout(60_000));
  } catch {
    throw new Error("EMBEDDINGS_UNAVAILABLE");
  }
  if (!response.ok) throw new Error("EMBEDDINGS_UNAVAILABLE");
  const result = await response.json();
  if (result?.model !== "text-embedding-3-small" || !Array.isArray(result.data) || result.data.length !== texts.length) {
    throw new Error("Invalid embedding model or batch size");
  }

  const ordered = new Map<number, number[]>();
  for (const row of result.data) {
    if (!Number.isInteger(row?.index) || row.index < 0 || row.index >= texts.length ||
        ordered.has(row.index) || !Array.isArray(row.embedding) || row.embedding.length !== 1536 ||
        !row.embedding.every((value: unknown) => typeof value === "number" && Number.isFinite(value))) {
      throw new Error("Invalid embedding vector");
    }
    ordered.set(row.index, row.embedding);
  }
  return texts.map((_, index) => ordered.get(index)!);
}
