import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

/**
 * Semantic dedupe check for the curriculum placement flow.
 *
 * Given a candidate concept (what the author wants to add) and a set of
 * existing snippets (already-present blocks in the topic / related diagrams /
 * registry intents), ask the model to score conceptual overlap and return a
 * structured verdict. Uses Lovable AI tool-calling for reliable JSON output.
 *
 * This is an internal authoring aid — not user-facing. It catches paraphrase
 * and synonym overlap that keyword search and the structural diagram registry
 * miss (e.g. "augmentation index" ↔ "wave reflection in stiff arteries",
 * "incisura" ↔ "AV closure event", "warm shock" ↔ "vasoplegic syndrome").
 */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface Snippet {
  id: string;
  source: string; // e.g. "coreConcepts:cardiac-cycle" or "diagram:aortic-dichrotic-notch"
  text: string; // prose / intent / label
}

interface RequestBody {
  candidate: {
    label: string;
    intent: string; // 1-2 sentence description of what the author wants to add
    contentType?: string; // e.g. "diagram", "prose", "calculator"
  };
  snippets: Snippet[]; // existing material to compare against
  topicId?: string;
}

const SYSTEM_PROMPT = `You are an editorial deduplication assistant for a medical curriculum (anaesthesia + intensive care).
Your only job: decide whether a CANDIDATE addition is conceptually duplicative, overlapping, adjacent, or novel relative to a list of EXISTING snippets already in the same topic.
You must reason about meaning — not keywords. Recognise paraphrase, synonym, abbreviation, mechanism-vs-effect framing, and pathology-vs-physiology framing as semantically equivalent when they describe the same underlying concept.
Return per-snippet scores plus an overall verdict and the recommended editorial action.

Scoring rubric (0.00–1.00 per snippet):
- 0.85–1.00 = same concept, near-paraphrase → DUPLICATE (do not add)
- 0.60–0.84 = strong overlap, different angle/depth → EXTEND the existing snippet
- 0.35–0.59 = adjacent / related concept → add as new + CROSS-REFERENCE
- 0.00–0.34 = distinct → NOVEL

Be conservative: if uncertain between two bands, choose the lower (more permissive of the new addition) and explain why in the rationale.`;

const TOOL = {
  type: "function" as const,
  function: {
    name: "report_semantic_overlap",
    description: "Return per-snippet semantic similarity scores and an overall editorial verdict.",
    parameters: {
      type: "object",
      properties: {
        matches: {
          type: "array",
          description: "One entry per snippet provided, in the same order.",
          items: {
            type: "object",
            properties: {
              snippetId: { type: "string" },
              score: { type: "number", description: "0.00–1.00 conceptual overlap" },
              relation: {
                type: "string",
                enum: ["duplicate", "extend", "cross-reference", "novel"],
              },
              rationale: { type: "string", description: "One short sentence." },
            },
            required: ["snippetId", "score", "relation", "rationale"],
            additionalProperties: false,
          },
        },
        topMatchId: {
          type: "string",
          description: "ID of the snippet with the highest semantic overlap, or empty string if none.",
        },
        overallRecommendation: {
          type: "string",
          enum: ["duplicate", "extend", "cross-reference", "novel"],
          description: "Editorial action driven by the highest-scoring match.",
        },
        verdictLine: {
          type: "string",
          description:
            "One concise human-readable line for the placement-flow report, e.g. 'Semantic dedupe: EXTEND \"Wiggers diagram\" (0.71; same valve-event timing, different visual encoding).'",
        },
      },
      required: ["matches", "topMatchId", "overallRecommendation", "verdictLine"],
      additionalProperties: false,
    },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as RequestBody;
    if (!body?.candidate?.intent || !Array.isArray(body?.snippets)) {
      return new Response(
        JSON.stringify({ error: "Body must include {candidate:{label,intent}, snippets:[]}" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (body.snippets.length === 0) {
      return new Response(
        JSON.stringify({
          matches: [],
          topMatchId: "",
          overallRecommendation: "novel",
          verdictLine: "Semantic dedupe: no existing snippets supplied — treat as novel.",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userPayload = {
      candidate: body.candidate,
      topicId: body.topicId ?? null,
      snippets: body.snippets.map((s) => ({
        id: s.id,
        source: s.source,
        // truncate to keep prompts tight
        text: s.text.length > 800 ? s.text.slice(0, 800) + "…" : s.text,
      })),
    };

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content:
              "Compare the CANDIDATE against each EXISTING snippet. Score conceptually, not lexically.\n\n" +
              JSON.stringify(userPayload, null, 2),
          },
        ],
        tools: [TOOL],
        tool_choice: { type: "function", function: { name: "report_semantic_overlap" } },
      }),
    });

    if (resp.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded — try again shortly." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (resp.status === 402) {
      return new Response(
        JSON.stringify({ error: "Lovable AI credits exhausted — top up at Settings → Workspace → Usage." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!resp.ok) {
      const errText = await resp.text();
      console.error("AI gateway error", resp.status, errText);
      return new Response(JSON.stringify({ error: "AI gateway error", detail: errText }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    const argsRaw = toolCall?.function?.arguments;
    if (!argsRaw) {
      return new Response(
        JSON.stringify({ error: "Model did not return a tool call", raw: data }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(argsRaw);
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Failed to parse tool arguments", raw: argsRaw }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("semantic-dedupe error", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
