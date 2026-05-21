// Topic accuracy auditor.
// For each topic:
//   1. Scrape the live topic page (markdown + screenshot) via Firecrawl
//   2. Search BJA Education + other UK reputable sources via Firecrawl
//   3. Ask Gemini 2.5 Pro to compare and emit structured findings
//   4. If a screenshot/diagram is available, run a vision pass for anatomical accuracy
//
// Runs in the background via EdgeRuntime.waitUntil so the HTTP response returns immediately.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const SITE_BASE = "https://anaesthesiacore.app";

// Reputable UK / international anaesthetic & critical-care references
const SOURCE_DOMAINS = [
  "bjaeducation.org",
  "bjanaesthesia.org",
  "academic.oup.com/bja",
  "rcoa.ac.uk",
  "ficm.ac.uk",
  "ics.ac.uk",
  "aagbi.org",
  "anaesthetists.org",
  "nice.org.uk",
  "bnf.nice.org.uk",
  "resus.org.uk",
  "thoracic.org",
  "ersnet.org",
  "esicm.org",
];

interface TopicRef {
  id: string;
  title: string;
  description: string;
  section: string;
  url: string;
}

const supa = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// ---------- Firecrawl helpers ----------
async function firecrawlScrape(url: string, withScreenshot: boolean) {
  const formats: any[] = ["markdown"];
  if (withScreenshot) formats.push("screenshot");
  try {
    const r = await fetch("https://api.firecrawl.dev/v2/scrape", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        formats,
        onlyMainContent: true,
        waitFor: 8000,
      }),
    });
    if (!r.ok) return null;
    const data = await r.json();
    return data?.data ?? data;
  } catch (_e) {
    return null;
  }
}

async function firecrawlSearch(query: string, limit = 3) {
  try {
    const r = await fetch("https://api.firecrawl.dev/v2/search", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        limit,
        scrapeOptions: { formats: ["markdown"] },
      }),
    });
    if (!r.ok) return [];
    const data = await r.json();
    const results = data?.data ?? data?.web ?? [];
    return Array.isArray(results) ? results : [];
  } catch (_e) {
    return [];
  }
}

// ---------- AI helpers ----------
const FINDING_TOOL = {
  type: "function",
  function: {
    name: "emit_findings",
    description:
      "Emit accuracy findings for the topic. Empty array means no issues detected.",
    parameters: {
      type: "object",
      properties: {
        findings: {
          type: "array",
          items: {
            type: "object",
            properties: {
              severity: {
                type: "string",
                enum: ["info", "minor", "major", "critical"],
              },
              category: {
                type: "string",
                enum: [
                  "factual",
                  "outdated",
                  "missing",
                  "citation",
                  "diagram",
                  "terminology",
                ],
              },
              summary: { type: "string" },
              details: { type: "string" },
              suggested_fix: { type: "string" },
              sources: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    url: { type: "string" },
                  },
                  required: ["title", "url"],
                },
              },
            },
            required: [
              "severity",
              "category",
              "summary",
              "details",
              "sources",
            ],
          },
        },
      },
      required: ["findings"],
      additionalProperties: false,
    },
  },
};

const TEXT_SYSTEM = `You are a UK anaesthetic and intensive-care content auditor for FRCA/FFICM revision material.

You will be given:
- The current text of one topic on the AnaesthesiaCore revision site.
- Excerpts from authoritative UK reference sources (preferred: BJA Education, BJA, RCoA, FICM, ICS, AAGBI/Association of Anaesthetists, NICE, BNF, Resuscitation Council UK).

Your job: flag any statements in the topic that are factually incorrect, outdated, missing key concepts, use incorrect terminology, or cite weak sources, by comparison with the authoritative references provided.

Rules:
- Only raise a finding when the reference material clearly supports the correction. Do not speculate.
- Be specific. Quote the offending passage briefly inside "details".
- Prefer BJA Education as the gold standard when sources conflict.
- "severity": critical = patient-safety / wrong drug dose, major = wrong mechanism or wrong physiology, minor = imprecise wording, info = stylistic only.
- "category": choose the best fit. Use "diagram" only when commenting on figures (handled separately).
- Always include at least one source URL per finding.
- If the topic is accurate, return an empty findings array.
- Return ONLY the tool call. No prose.`;

const DIAGRAM_SYSTEM = `You are an anatomy and physiology illustration reviewer for UK anaesthetic teaching.

You will be shown a screenshot of one topic page that contains diagrams or illustrations, plus the topic title.

Inspect the visible diagrams (anatomical plates, waveforms, flow charts, structure-function illustrations) for clear inaccuracies:
- anatomical structures in wrong positions, missing, or labelled incorrectly
- waveforms or graphs whose shape contradicts standard physiology
- flow charts with wrong directionality or missing critical steps
- labelling typos or non-standard UK terminology

Use BJA Education, Gray's Anatomy and standard FRCA reference textbooks as the gold standard.

For each clear inaccuracy emit a finding with category="diagram". If diagrams look correct or none are visible, return an empty findings array. Be conservative — only flag clear visual errors, not stylistic preference. Return ONLY the tool call.`;

async function callAI(args: {
  system: string;
  userText: string;
  imageUrl?: string;
  model?: string;
}): Promise<any[]> {
  const userContent: any = args.imageUrl
    ? [
        { type: "text", text: args.userText },
        { type: "image_url", image_url: { url: args.imageUrl } },
      ]
    : args.userText;

  const res = await fetch(
    "https://ai.gateway.lovable.dev/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: args.model ?? "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: args.system },
          { role: "user", content: userContent },
        ],
        tools: [FINDING_TOOL],
        tool_choice: {
          type: "function",
          function: { name: "emit_findings" },
        },
      }),
    },
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`AI gateway ${res.status}: ${body.slice(0, 300)}`);
  }
  const data = await res.json();
  const call = data?.choices?.[0]?.message?.tool_calls?.[0];
  if (!call) return [];
  try {
    const parsed = JSON.parse(call.function.arguments);
    return Array.isArray(parsed.findings) ? parsed.findings : [];
  } catch {
    return [];
  }
}

// ---------- Per-topic audit ----------
async function auditTopic(jobId: string, topic: TopicRef) {
  const all: any[] = [];

  // 1. Scrape current topic page (markdown + screenshot)
  const page = await firecrawlScrape(topic.url, true);
  const pageMarkdown: string = page?.markdown ?? "";
  const screenshot: string | undefined = page?.screenshot;

  if (!pageMarkdown || pageMarkdown.length < 200) {
    return [
      {
        severity: "major",
        category: "missing",
        summary: "Topic page could not be retrieved for audit",
        details: `Firecrawl returned no usable content for ${topic.url}`,
        sources: [{ title: "Topic URL", url: topic.url }],
      },
    ];
  }

  // 2. Search reputable sources (BJA Education first)
  const queryBJA = `site:bjaeducation.org ${topic.title}`;
  const queryGeneral = `${topic.title} anaesthesia UK guideline ${
    SOURCE_DOMAINS.slice(0, 3)
      .map((d) => `site:${d}`)
      .join(" OR ")
  }`;

  const [bjaResults, generalResults] = await Promise.all([
    firecrawlSearch(queryBJA, 2),
    firecrawlSearch(queryGeneral, 2),
  ]);

  const refs = [...bjaResults, ...generalResults]
    .filter((r) => r?.url && r?.markdown)
    .slice(0, 4)
    .map((r) => ({
      title: r.title ?? r.metadata?.title ?? r.url,
      url: r.url,
      excerpt: String(r.markdown).slice(0, 2500),
    }));

  // 3. Text audit
  const userText = [
    `Topic: ${topic.title}`,
    `Section: ${topic.section}`,
    `URL: ${topic.url}`,
    "",
    "=== CURRENT TOPIC CONTENT (markdown) ===",
    pageMarkdown.slice(0, 12000),
    "",
    "=== AUTHORITATIVE REFERENCES ===",
    refs.length === 0
      ? "(no reference excerpts retrieved — flag this as a citation issue if topic relies on specific guideline numbers/doses)"
      : refs
          .map(
            (r, i) =>
              `--- Reference ${i + 1}: ${r.title}\n${r.url}\n${r.excerpt}`,
          )
          .join("\n\n"),
  ].join("\n");

  try {
    const textFindings = await callAI({
      system: TEXT_SYSTEM,
      userText,
    });
    all.push(...textFindings);
  } catch (e) {
    console.error(`text audit error for ${topic.id}`, e);
  }

  // 4. Diagram audit (vision) if a screenshot is available
  if (screenshot) {
    try {
      const diagramFindings = await callAI({
        system: DIAGRAM_SYSTEM,
        userText: `Topic: ${topic.title}\nSection: ${topic.section}\nURL: ${topic.url}\n\nInspect all visible diagrams.`,
        imageUrl: screenshot,
        model: "google/gemini-2.5-pro",
      });
      for (const f of diagramFindings) {
        f.category = "diagram";
        f.diagram_ref = screenshot;
      }
      all.push(...diagramFindings);
    } catch (e) {
      console.error(`diagram audit error for ${topic.id}`, e);
    }
  }

  // attach screenshot reference on any diagram finding missing it
  for (const f of all) {
    if (f.category === "diagram" && !f.diagram_ref && screenshot) {
      f.diagram_ref = screenshot;
    }
  }

  return all;
}

// ---------- Sweep runner ----------
async function runSweep(jobId: string, topics: TopicRef[]) {
  await supa.from("topic_audit_jobs").update({
    status: "running",
    total: topics.length,
  }).eq("id", jobId);

  let processed = 0,
    succeeded = 0,
    failed = 0,
    findingsCount = 0;

  for (const topic of topics) {
    // bail out if job was cancelled
    const { data: state } = await supa
      .from("topic_audit_jobs")
      .select("status")
      .eq("id", jobId)
      .maybeSingle();
    if (state?.status === "cancelled") {
      console.log(`job ${jobId} cancelled — stopping`);
      return;
    }

    await supa
      .from("topic_audit_jobs")
      .update({ current_topic: topic.title })
      .eq("id", jobId);

    try {
      const findings = await auditTopic(jobId, topic);
      if (findings.length > 0) {
        const rows = findings.map((f) => ({
          job_id: jobId,
          topic_id: topic.id,
          topic_title: topic.title,
          section: topic.section,
          topic_url: topic.url,
          severity: f.severity ?? "minor",
          category: f.category ?? "factual",
          summary: String(f.summary ?? "").slice(0, 500),
          details: f.details ?? "",
          suggested_fix: f.suggested_fix ?? null,
          sources: f.sources ?? [],
          diagram_ref: f.diagram_ref ?? null,
        }));
        const { error } = await supa
          .from("topic_audit_findings")
          .insert(rows);
        if (error) throw error;
        findingsCount += rows.length;
      }
      succeeded++;
    } catch (e) {
      failed++;
      console.error(`audit failed for ${topic.id}`, e);
      await supa.from("topic_audit_jobs").update({
        last_error: `${topic.id}: ${(e as Error).message}`.slice(0, 500),
      }).eq("id", jobId);
    }

    processed++;
    await supa.from("topic_audit_jobs").update({
      processed,
      succeeded,
      failed,
      findings_count: findingsCount,
    }).eq("id", jobId);

    // small delay to be polite to Firecrawl
    await new Promise((r) => setTimeout(r, 500));
  }

  await supa.from("topic_audit_jobs").update({
    status: "completed",
    current_topic: null,
    completed_at: new Date().toISOString(),
  }).eq("id", jobId);
}

// ---------- Sitemap discovery ----------
const SECTION_SLUGS = [
  "physics",
  "physiology",
  "pharmacology",
  "anatomy",
  "clinical",
  "intensive-care",
  "perioperative",
  "chemistry",
];

async function discoverTopicsFromSitemaps(): Promise<TopicRef[]> {
  const out: TopicRef[] = [];
  for (const section of SECTION_SLUGS) {
    try {
      const r = await fetch(`${SITE_BASE}/sitemaps/${section}.xml`);
      if (!r.ok) continue;
      const xml = await r.text();
      const locs = Array.from(
        xml.matchAll(/<loc>([^<]+)<\/loc>/g),
      ).map((m) => m[1]);
      for (const url of locs) {
        const m = url.match(
          new RegExp(`/${section}/([a-z0-9-]+)$`),
        );
        if (!m) continue;
        const id = m[1];
        const title = id
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        out.push({ id, title, section, description: "", url });
      }
    } catch (_e) {
      // skip
    }
  }
  // dedupe by id+section
  const seen = new Set<string>();
  return out.filter((t) => {
    const k = `${t.section}/${t.id}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

// ---------- HTTP handler ----------
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action ?? "start";

    if (action === "cancel" && body.job_id) {
      await supa.from("topic_audit_jobs").update({
        status: "cancelled",
        completed_at: new Date().toISOString(),
      }).eq("id", body.job_id);
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // start a new sweep
    let topics: TopicRef[] | undefined = body.topics;

    // Scheduled / no-payload path: discover topics from the live sitemaps
    if (!topics || topics.length === 0) {
      topics = await discoverTopicsFromSitemaps();
      if (topics.length === 0) {
        return new Response(
          JSON.stringify({
            error:
              "No topics supplied and sitemap discovery returned nothing.",
          }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
    }

    // Optional limit
    if (typeof body.limit === "number" && body.limit > 0) {
      topics = topics.slice(0, body.limit);
    }

    // Normalise / clamp
    const norm: TopicRef[] = topics
      .filter((t) => t?.id && t?.title && t?.section)
      .map((t) => ({
        id: String(t.id),
        title: String(t.title),
        description: String(t.description ?? ""),
        section: String(t.section),
        url:
          t.url && /^https?:\/\//.test(t.url)
            ? t.url
            : `${SITE_BASE}/${t.section}/${t.id}`,
      }));

    const { data: job, error } = await supa
      .from("topic_audit_jobs")
      .insert({
        status: "pending",
        trigger: body.trigger ?? "manual",
        triggered_by: body.user_id ?? null,
        total: norm.length,
        options: body.options ?? {},
      })
      .select()
      .single();
    if (error) throw error;

    // background
    // @ts-ignore EdgeRuntime is global in Supabase Functions
    EdgeRuntime.waitUntil(runSweep(job.id, norm));

    return new Response(JSON.stringify({ ok: true, job_id: job.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: (e as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
