/**
 * Admin-only reindex: reads `corpus.json` (built by scripts/build-kb-corpus.ts),
 * computes content hashes, embeds any chunks not already in `kb_chunks`, and
 * upserts them. Safe to re-run after a corpus rebuild — the unique
 * `content_hash` makes the operation idempotent.
 *
 * Auth: requires `Authorization: Bearer <REGENERATE_PASSWORD>` (same shared
 * secret the project uses for other regenerate-style admin endpoints).
 */
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { embedTexts } from "../_shared/ai-gateway.ts";
import { KB_CORPUS } from "./corpus.ts";

interface CorpusChunk {
  topic_id: string;
  topic_title: string;
  route: string;
  section: string;
  exam_tags: string[];
  chunk_kind: "overview" | "seo" | "faq";
  content: string;
}

async function sha256(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const adminToken = Deno.env.get("KB_REINDEX_TOKEN");
  if (!adminToken) {
    return new Response(JSON.stringify({ error: "KB_REINDEX_TOKEN not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const auth = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  if (auth !== adminToken) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!lovableKey || !supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ error: "Server misconfigured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  let requestedLimit: number | null = null;
  try {
    const body = await req.json();
    if (typeof body?.limit === "number" && body.limit > 0) {
      requestedLimit = Math.min(body.limit, 200);
    }
  } catch {
    /* empty body is fine */
  }

  const allChunks = KB_CORPUS as unknown as CorpusChunk[];
  console.log(`[kb-reindex] corpus size=${allChunks.length}`);

  const withHash = await Promise.all(
    allChunks.map(async (c) => ({ ...c, content_hash: await sha256(c.content) })),
  );

  // Find which hashes already exist (chunked IN to avoid huge URLs).
  const existingHashes = new Set<string>();
  const HASHES_PER_QUERY = 200;
  for (let i = 0; i < withHash.length; i += HASHES_PER_QUERY) {
    const slice = withHash.slice(i, i + HASHES_PER_QUERY).map((c) => c.content_hash);
    const { data, error } = await supabase
      .from("kb_chunks")
      .select("content_hash")
      .in("content_hash", slice);
    if (error) {
      console.error("[kb-reindex] existing-check failed", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    for (const r of data ?? []) existingHashes.add(r.content_hash);
  }
  const allTodo = withHash.filter((c) => !existingHashes.has(c.content_hash));
  const todo = requestedLimit ? allTodo.slice(0, requestedLimit) : allTodo;
  console.log(`[kb-reindex] existing=${existingHashes.size} todo=${todo.length} (of ${allTodo.length})`);

  const BATCH = 32;
  let inserted = 0;
  for (let i = 0; i < todo.length; i += BATCH) {
    const batch = todo.slice(i, i + BATCH);
    const embeddings = await embedTexts(lovableKey, batch.map((c) => c.content));
    const rows = batch.map((c, j) => ({
      topic_id: c.topic_id,
      topic_title: c.topic_title,
      route: c.route,
      section: c.section,
      exam_tags: c.exam_tags,
      chunk_kind: c.chunk_kind,
      content: c.content,
      content_hash: c.content_hash,
      embedding: embeddings[j],
    }));
    const { error: insErr } = await supabase
      .from("kb_chunks")
      .upsert(rows, { onConflict: "content_hash", ignoreDuplicates: true });
    if (insErr) {
      console.error("[kb-reindex] insert failed", insErr, "batch_start=", i);
      return new Response(
        JSON.stringify({
          error: insErr.message,
          inserted,
          failed_at_batch_starting: i,
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    inserted += rows.length;
    console.log(`[kb-reindex] inserted batch ${i}-${i + rows.length}`);
  }

  const remaining = allTodo.length - inserted;
  console.log(`[kb-reindex] done inserted=${inserted} remaining=${remaining}`);


  return new Response(
    JSON.stringify({
      ok: true,
      total_chunks: allChunks.length,
      already_present: existingHashes.size,
      newly_embedded: inserted,
      remaining,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
