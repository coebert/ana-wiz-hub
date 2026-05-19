// Generate BJA Education-style references for a single curriculum topic
// using Lovable AI Gateway, and cache them in public.topic_references.
//
// Request:  { topicId, topicTitle, section, force? }
// Response: { status, refs, error? }

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

interface Reference {
  authors: string;
  title: string;
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
}

const SYSTEM_PROMPT = `You are a medical librarian curating a short, high-quality reading list for FRCA/FFICM trainees.

Produce 5 references in the style of "BJA Education" (Continuing Education in Anaesthesia, Critical Care & Pain) for the given topic. Prefer:
  1. BJA Education / CEACCP review articles when one exists for the topic.
  2. Major UK/European guidelines (AAGBI/Association of Anaesthetists, RCoA, FICM, NICE, ESA, ESICM, SCCM).
  3. Landmark primary research (NEJM, Lancet, BJA, Anaesthesia, Crit Care Med, ICM).

Rules:
  - Citations must be plausible and accurate to the best of your knowledge. If you are unsure of an exact volume/page/DOI, omit that field rather than fabricating it.
  - Use Vancouver-style author lists (up to 3 authors then "et al.").
  - Year must be a 4-digit integer between 1995 and the current year.
  - Output ONLY the JSON object described by the tool schema. No prose.`;

const buildUserPrompt = (topicTitle: string, section: string) =>
  `Topic: ${topicTitle}
Section: ${section}
Audience: FRCA Primary, FRCA Final and FFICM exam candidates.
Return 5 references, ordered with the most useful BJA Education review first.`;

const REF_TOOL = {
  type: "function",
  function: {
    name: "submit_references",
    description: "Submit the curated reference list.",
    parameters: {
      type: "object",
      properties: {
        references: {
          type: "array",
          minItems: 3,
          maxItems: 6,
          items: {
            type: "object",
            properties: {
              authors: { type: "string" },
              title: { type: "string" },
              journal: { type: "string" },
              year: { type: "integer" },
              volume: { type: "string" },
              issue: { type: "string" },
              pages: { type: "string" },
              doi: { type: "string" },
              url: { type: "string" },
            },
            required: ["authors", "title", "journal", "year"],
            additionalProperties: false,
          },
        },
      },
      required: ["references"],
      additionalProperties: false,
    },
  },
};

const fail = (status: number, msg: string) =>
  new Response(JSON.stringify({ error: msg }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (!LOVABLE_API_KEY) {
    return fail(500, "LOVABLE_API_KEY not configured");
  }

  let body: {
    topicId?: string;
    topicTitle?: string;
    section?: string;
    force?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return fail(400, "Invalid JSON body");
  }

  const topicId = (body.topicId ?? "").trim();
  const topicTitle = (body.topicTitle ?? "").trim();
  const section = (body.section ?? "").trim();
  const force = !!body.force;

  if (!topicId || !topicTitle || !section) {
    return fail(400, "topicId, topicTitle and section are required");
  }

  // Return cached row unless force=true
  if (!force) {
    const { data: existing } = await supabase
      .from("topic_references")
      .select("status, refs, error_message, updated_at")
      .eq("topic_id", topicId)
      .maybeSingle();
    if (existing && existing.status === "ready") {
      return new Response(
        JSON.stringify({
          status: "ready",
          refs: existing.refs,
          cached: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
  }

  // Mark pending
  await supabase.from("topic_references").upsert(
    {
      topic_id: topicId,
      topic_title: topicTitle,
      section,
      status: "generating",
      error_message: null,
    },
    { onConflict: "topic_id" },
  );

  try {
    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildUserPrompt(topicTitle, section) },
        ],
        tools: [REF_TOOL],
        tool_choice: { type: "function", function: { name: "submit_references" } },
      }),
    });

    if (aiRes.status === 429) {
      throw new Error("AI gateway rate-limited (429). Please retry shortly.");
    }
    if (aiRes.status === 402) {
      throw new Error("AI credits exhausted (402). Add credits in workspace settings.");
    }
    if (!aiRes.ok) {
      const txt = await aiRes.text();
      throw new Error(`AI gateway error ${aiRes.status}: ${txt.slice(0, 200)}`);
    }

    const data = await aiRes.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    const rawArgs = toolCall?.function?.arguments;
    if (!rawArgs) {
      throw new Error("AI did not return a tool call");
    }
    const parsed =
      typeof rawArgs === "string" ? JSON.parse(rawArgs) : rawArgs;
    const refs: Reference[] = Array.isArray(parsed?.references)
      ? parsed.references
      : [];
    if (refs.length === 0) {
      throw new Error("AI returned no references");
    }

    await supabase.from("topic_references").upsert(
      {
        topic_id: topicId,
        topic_title: topicTitle,
        section,
        status: "ready",
        refs,
        error_message: null,
      },
      { onConflict: "topic_id" },
    );

    return new Response(
      JSON.stringify({ status: "ready", refs, cached: false }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    await supabase.from("topic_references").upsert(
      {
        topic_id: topicId,
        topic_title: topicTitle,
        section,
        status: "failed",
        error_message: message,
      },
      { onConflict: "topic_id" },
    );
    return fail(500, message);
  }
});
