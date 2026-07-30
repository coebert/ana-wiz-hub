/**
 * Ask AI chat endpoint. Receives an AI SDK UIMessage[] history, embeds the
 * latest user question, retrieves the top-K relevant `kb_chunks` snippets,
 * and streams a grounded answer. The model is instructed to cite each
 * supporting topic with a markdown link back to its in-app route, so the
 * user is always guided to the right page after their question is answered.
 *
 * Public endpoint (verify_jwt = false) — no PII is stored. The browser
 * persists chat history in localStorage; no server-side conversation log.
 */
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "npm:ai";
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import {
  createLovableAiGatewayProvider,
  embedTexts,
  LOVABLE_AIG_RUN_ID_HEADER,
} from "../_shared/ai-gateway.ts";
import { moderateText } from "../_shared/moderation.ts";

interface MatchedChunk {
  topic_id: string;
  topic_title: string;
  route: string;
  section: string;
  exam_tags: string[];
  chunk_kind: string;
  content: string;
  similarity: number;
}

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "user") continue;
    const text = (m.parts ?? [])
      .map((p) => (p as { type: string; text?: string }).type === "text" ? (p as { text?: string }).text ?? "" : "")
      .join(" ")
      .trim();
    if (text) return text;
  }
  return "";
}

const SYSTEM_PROMPT = `You are AnaesthesiaCore's study assistant. You help anaesthetic trainees (FRCA Primary, FRCA Final, FFICM, EDIC) understand topics by answering their questions using ONLY the supplied "Knowledge base context" snippets.

Hard rules:
- Ground every clinical fact in the supplied context. If the context does not cover the question, say so plainly and suggest the closest topic(s) the trainee should read instead.
- Never invent drug doses, thresholds, or guideline figures that aren't in the context.
- Be concise: 2–5 short paragraphs or a tight bulleted list.
- Always finish with a "**Read more on AnaesthesiaCore**" section that links to the most relevant topic pages from the context, using markdown links: \`- [Topic title](/route) — one-line reason this page is relevant\`. Prefer 2–4 links, deduplicated by route.
- Use UK English and the same terminology the trainee uses (FRCA Primary/Final, FFICM, etc).
- Format with markdown. Use bold for key terms, bullets for lists, and inline code for drug doses/values.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  let body: { messages?: UIMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "messages required" }), {
      status: 400,
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

  const userQuestion = lastUserText(messages);
  let contextBlock = "(no relevant snippets retrieved — answer from general anaesthesia knowledge and clearly say the app doesn't have a dedicated page yet)";
  const seenRoutes = new Map<string, { title: string; section: string }>();

  if (userQuestion) {
    try {
      const [embedding] = await embedTexts(lovableKey, userQuestion);
      const supabase = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false },
      });
      const { data, error } = await supabase.rpc("match_kb_chunks", {
        query_embedding: embedding,
        match_count: 10,
      });
      if (error) throw error;
      const matches = (data as MatchedChunk[] | null) ?? [];
      if (matches.length > 0) {
        contextBlock = matches
          .map((m, i) => {
            seenRoutes.set(m.route, { title: m.topic_title, section: m.section });
            return `[${i + 1}] ${m.topic_title} (${m.route}) [${m.chunk_kind}, sim=${m.similarity.toFixed(2)}]\n${m.content}`;
          })
          .join("\n\n");
      }
    } catch (err) {
      console.error("[kb-chat] retrieval failed", err);
    }
  }

  const routeIndex = Array.from(seenRoutes.entries())
    .map(([route, { title, section }]) => `- ${title} (${section}) → ${route}`)
    .join("\n") || "(none)";

  const initialRunId = req.headers.get(LOVABLE_AIG_RUN_ID_HEADER)?.trim() || undefined;
  const gateway = createLovableAiGatewayProvider(lovableKey, initialRunId);
  const model = gateway("google/gemini-3-flash-preview");

  const augmentedSystem = `${SYSTEM_PROMPT}

---
Knowledge base context (most relevant first):
${contextBlock}

Allowed in-app routes you may link to in the "Read more" section (use ONLY these):
${routeIndex}`;

  const result = streamText({
    model,
    system: augmentedSystem,
    messages: await convertToModelMessages(messages),
    onError: (err) => {
      console.error("[kb-chat] streamText error", err);
    },
  });

  // Build a Supabase admin client we'll reuse to upsert the shared Q&A
  // library entry once the stream completes.
  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  return result.toUIMessageStreamResponse({
    headers: corsHeaders,
    originalMessages: messages,
    onFinish: async ({ responseMessage }) => {
      try {
        const normalized = normalizeQuestion(userQuestion);
        if (!normalized) return;
        const answer = (responseMessage.parts ?? [])
          .map((p) => (p as { type: string; text?: string }).type === "text"
            ? (p as { text?: string }).text ?? ""
            : "")
          .join("")
          .trim();
        if (!answer) return;

        // Try to bump the ask_count on an existing entry first.
        const { data: existing, error: lookupErr } = await adminClient
          .from("ask_qa_library")
          .select("id, ask_count")
          .eq("normalized", normalized)
          .maybeSingle();
        if (lookupErr) {
          console.error("[kb-chat] library lookup failed", lookupErr);
          return;
        }
        if (existing) {
          const { error: updateErr } = await adminClient
            .from("ask_qa_library")
            .update({
              answer,
              question: userQuestion,
              ask_count: (existing.ask_count ?? 0) + 1,
            })
            .eq("id", existing.id);
          if (updateErr) console.error("[kb-chat] library update failed", updateErr);
        } else {
          const { error: insertErr } = await adminClient
            .from("ask_qa_library")
            .insert({
              normalized,
              question: userQuestion,
              answer,
            });
          if (insertErr) console.error("[kb-chat] library insert failed", insertErr);
        }
      } catch (err) {
        console.error("[kb-chat] library persist failed", err);
      }
    },
  });
});

/**
 * Lowercase, strip punctuation, collapse whitespace. MUST stay in sync with
 * the client-side `normalize()` helper in `src/pages/AskAi.tsx` so cache
 * lookups behave identically on both sides.
 */
function normalizeQuestion(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}
