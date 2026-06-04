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
  pmid?: string;
  url?: string;
}

const SYSTEM_PROMPT = `You are a medical librarian curating a short, high-quality reading list for FRCA/FFICM trainees.

Produce 5 references in the style of "BJA Education" (Continuing Education in Anaesthesia, Critical Care & Pain) for the given topic. Prefer:
  1. BJA Education / CEACCP review articles when one exists for the topic.
  2. Major UK/European guidelines (AAGBI/Association of Anaesthetists, RCoA, FICM, NICE, ESA, ESICM, SCCM).
  3. Landmark primary research (NEJM, Lancet, BJA, Anaesthesia, Crit Care Med, ICM).

Rules:
  - Citations must be plausible and accurate to the best of your knowledge. If you are unsure of an exact volume/page/DOI/PMID, omit that field rather than fabricating it.
  - Include the PubMed ID (pmid) as a digits-only string whenever you are confident of it — this is the preferred link target. Include doi when known. Only include a url for guidelines/web resources that have no PMID or DOI.
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
              pmid: { type: "string", description: "PubMed ID, digits only" },
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
    console.error("LOVABLE_API_KEY not configured");
    return fail(503, "Service unavailable");
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
  let force = !!body.force;

  if (!topicId || !topicTitle || !section) {
    return fail(400, "topicId, topicTitle and section are required");
  }

  // `force` bypasses cache and triggers a fresh AI call — gate it behind an
  // admin JWT to prevent anonymous credit abuse. Non-admin callers silently
  // downgrade to the cached path (Refresh buttons still return the latest
  // ready row instead of regenerating).
  if (force) {
    const authHeader = req.headers.get("Authorization");
    let isAdmin = false;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      try {
        const userClient = createClient(
          SUPABASE_URL,
          Deno.env.get("SUPABASE_ANON_KEY")!,
          { global: { headers: { Authorization: authHeader } } },
        );
        const { data: userData } = await userClient.auth.getUser();
        if (userData?.user) {
          const { data: roleRow } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", userData.user.id)
            .eq("role", "admin")
            .maybeSingle();
          isAdmin = !!roleRow;
        }
      } catch (_e) {
        isAdmin = false;
      }
    }
    if (!isAdmin) force = false;
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

    // Validate PMIDs against PubMed — the model frequently hallucinates valid-
    // looking PMIDs that point to unrelated articles. We:
    //   1. esummary-batch all claimed PMIDs and compare normalised titles.
    //   2. For mismatches (and refs with no PMID), esearch by title to try to
    //      find the real PMID.
    //   3. If nothing matches, drop the pmid so the link falls back to DOI/URL.
    await validateAndEnrichPmids(refs);

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

// ---------- PubMed validation ----------

const PUBMED_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";

const normaliseTitle = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();

/** Word-overlap similarity (Jaccard on tokens ≥4 chars). */
const titleSimilarity = (a: string, b: string): number => {
  const ta = new Set(normaliseTitle(a).split(" ").filter((w) => w.length >= 4));
  const tb = new Set(normaliseTitle(b).split(" ").filter((w) => w.length >= 4));
  if (ta.size === 0 || tb.size === 0) return 0;
  let inter = 0;
  for (const w of ta) if (tb.has(w)) inter++;
  return inter / Math.min(ta.size, tb.size);
};

const TITLE_THRESHOLD = 0.55;

async function pubmedSummary(pmids: string[]): Promise<Record<string, string>> {
  if (pmids.length === 0) return {};
  const url = `${PUBMED_BASE}/esummary.fcgi?db=pubmed&retmode=json&id=${pmids.join(",")}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      await res.text();
      return {};
    }
    const json = await res.json();
    const result = json?.result ?? {};
    const out: Record<string, string> = {};
    for (const id of result.uids ?? []) {
      const t = result[id]?.title;
      if (typeof t === "string") out[id] = t;
    }
    return out;
  } catch {
    return {};
  }
}

async function pubmedSearchByTitle(ref: Reference): Promise<string | null> {
  const term = `${ref.title} ${ref.journal} ${ref.year}`.slice(0, 300);
  const url = `${PUBMED_BASE}/esearch.fcgi?db=pubmed&retmode=json&retmax=3&term=${
    encodeURIComponent(term)
  }`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      await res.text();
      return null;
    }
    const json = await res.json();
    const ids: string[] = json?.esearchresult?.idlist ?? [];
    if (ids.length === 0) return null;
    const titles = await pubmedSummary(ids);
    for (const id of ids) {
      const t = titles[id];
      if (t && titleSimilarity(t, ref.title) >= TITLE_THRESHOLD) return id;
    }
    return null;
  } catch {
    return null;
  }
}

async function validateAndEnrichPmids(refs: Reference[]): Promise<void> {
  // 1. Batch verify any claimed PMIDs.
  const claimed = refs
    .map((r, i) => ({ i, pmid: (r.pmid ?? "").trim() }))
    .filter((x) => /^\d+$/.test(x.pmid));
  const summary = await pubmedSummary(claimed.map((c) => c.pmid));
  for (const { i, pmid } of claimed) {
    const t = summary[pmid];
    if (!t || titleSimilarity(t, refs[i].title) < TITLE_THRESHOLD) {
      delete refs[i].pmid; // hallucinated — drop so UI falls back to DOI/URL
    }
  }

  // 2. For refs still without a PMID, try title-based esearch (sequentially to
  //    respect PubMed's ~3 req/s limit without an API key).
  for (const r of refs) {
    if (r.pmid) continue;
    const found = await pubmedSearchByTitle(r);
    if (found) r.pmid = found;
    await new Promise((res) => setTimeout(res, 350));
  }
}
