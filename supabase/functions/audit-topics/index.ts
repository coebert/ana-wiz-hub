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

// ---------- Fetch helpers ----------
async function fetchWithTimeout(
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: ac.signal });
  } finally {
    clearTimeout(t);
  }
}

// ---------- Firecrawl helpers ----------
function buildTopicScrapeActions(url: string, withScreenshot: boolean) {
  const parsed = new URL(url);
  const pathParts = parsed.pathname.split("/").filter(Boolean);
  const [section, topicId] = pathParts;
  const sectionUrl = `${parsed.origin}/${section}`;

  return {
    sectionUrl,
    actions: [
      {
        type: "click",
        selector: `a[href="/${section}/${topicId}"]`,
      },
      {
        type: "wait",
        milliseconds: 2500,
      },
      ...(withScreenshot ? [{ type: "screenshot", full_page: true }] : []),
    ],
  };
}

async function firecrawlScrape(url: string, withScreenshot: boolean) {
  const formats: any[] = ["markdown"];
  if (withScreenshot) formats.push("screenshot");

  const scrape = async (targetUrl: string, actions?: unknown[]) => {
    const r = await fetchWithTimeout(
      "https://api.firecrawl.dev/v2/scrape",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: targetUrl,
          formats,
          onlyMainContent: true,
          waitFor: actions ? 1200 : 8000,
          timeout: 60000,
          actions,
          storeInCache: false,
        }),
      },
      75_000,
    );
    if (!r.ok) return null;
    const data = await r.json();
    return data?.data ?? data;
  };

  try {
    const direct = await scrape(url);
    const directMarkdown = String(direct?.markdown ?? "");
    if (directMarkdown.length >= 200) return direct;

    const { sectionUrl, actions } = buildTopicScrapeActions(url, withScreenshot);
    const viaSection = await scrape(sectionUrl, actions);
    const sectionMarkdown = String(viaSection?.markdown ?? "");
    return sectionMarkdown.length >= 200 ? viaSection : direct;
  } catch (_e) {
    return null;
  }
}

async function firecrawlSearch(query: string, limit = 3) {
  try {
    const r = await fetchWithTimeout(
      "https://api.firecrawl.dev/v2/search",
      {
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
      },
      45_000,
    );
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

  const res = await fetchWithTimeout(
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
    args.imageUrl ? 90_000 : 60_000,
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
type Stages = {
  scrape_ok: boolean;
  page_chars: number;
  screenshot: boolean;
  refs_count: number;
  ref_titles: string[];
  text_findings: number;
  diagram_findings: number;
  text_error?: string;
  diagram_error?: string;
  scrape_error?: string;
};

async function auditTopic(
  jobId: string,
  topic: TopicRef,
): Promise<{ findings: any[]; stages: Stages }> {
  const all: any[] = [];
  const stages: Stages = {
    scrape_ok: false,
    page_chars: 0,
    screenshot: false,
    refs_count: 0,
    ref_titles: [],
    text_findings: 0,
    diagram_findings: 0,
  };

  // 1. Scrape current topic page (markdown + screenshot)
  let page: any = null;
  try {
    page = await firecrawlScrape(topic.url, true);
  } catch (e) {
    stages.scrape_error = (e as Error).message;
  }
  const pageMarkdown: string = page?.markdown ?? "";
  const screenshot: string | undefined = page?.screenshot;
  stages.page_chars = pageMarkdown.length;
  stages.screenshot = Boolean(screenshot);
  stages.scrape_ok = pageMarkdown.length >= 200;

  if (!pageMarkdown || pageMarkdown.length < 200) {
    const f = {
      severity: "major",
      category: "missing",
      summary: "Topic page could not be retrieved for audit",
      details: `Firecrawl returned no usable content for ${topic.url}`,
      sources: [{ title: "Topic URL", url: topic.url }],
    };
    return { findings: [f], stages };
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
  stages.refs_count = refs.length;
  stages.ref_titles = refs.map((r) => String(r.title).slice(0, 120));

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
    stages.text_findings = textFindings.length;
    all.push(...textFindings);
  } catch (e) {
    stages.text_error = (e as Error).message;
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
      stages.diagram_findings = diagramFindings.length;
      for (const f of diagramFindings) {
        f.category = "diagram";
        f.diagram_ref = screenshot;
      }
      all.push(...diagramFindings);
    } catch (e) {
      stages.diagram_error = (e as Error).message;
      console.error(`diagram audit error for ${topic.id}`, e);
    }
  }

  // attach screenshot reference on any diagram finding missing it
  for (const f of all) {
    if (f.category === "diagram" && !f.diagram_ref && screenshot) {
      f.diagram_ref = screenshot;
    }
  }

  return { findings: all, stages };
}


// ---------- Sweep runner (batched + self-chaining) ----------
// One topic per invocation keeps total wall-clock comfortably under the edge
// runtime's ~150s limit. We also fire the next chain BEFORE awaiting the
// topic, so if this runtime is killed mid-await (e.g. AI gateway hang), the
// successor invocation is already queued and will pick up the NEXT topic
// (cursor is advanced before work starts).
const BATCH_SIZE = 1;
// Hard cap per topic — kept well below the edge wall-clock so the timeout
// reliably fires and the catch/finally runs BEFORE the runtime is killed.
const PER_TOPIC_TIMEOUT_MS = 110_000;

async function reinvokeContinue(jobId: string) {
  try {
    await fetchWithTimeout(
      `${SUPABASE_URL}/functions/v1/audit-topics`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          "Content-Type": "application/json",
          apikey: SUPABASE_SERVICE_ROLE_KEY,
        },
        body: JSON.stringify({ action: "continue", job_id: jobId }),
      },
      10_000,
    );
  } catch (e) {
    console.error(`failed to re-invoke for job ${jobId}`, e);
  }
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(
      () => reject(new Error(`${label} exceeded ${ms}ms`)),
      ms,
    );
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });
}

async function runBatch(jobId: string) {
  const { data: job } = await supa
    .from("topic_audit_jobs")
    .select("id, status, processed, succeeded, failed, findings_count, options")
    .eq("id", jobId)
    .maybeSingle();

  if (!job) return;
  if (job.status === "cancelled" || job.status === "completed" || job.status === "failed") {
    return;
  }

  const opts = (job.options ?? {}) as { topics?: TopicRef[]; cursor?: number };
  const queue: TopicRef[] = Array.isArray(opts.topics) ? opts.topics : [];
  let cursor: number = typeof opts.cursor === "number" ? opts.cursor : 0;

  if (queue.length === 0) {
    await supa.from("topic_audit_jobs").update({
      status: "failed",
      last_error: "Job options missing topics queue",
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).eq("id", jobId);
    return;
  }

  // Heal any "running" log row from a prior killed runtime so the UI doesn't
  // see ghosts.
  await supa
    .from("topic_audit_topic_logs")
    .update({
      status: "failed",
      error_message: "Runtime terminated before topic completed; auto-marked failed on resume.",
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("job_id", jobId)
    .eq("status", "running");

  await supa.from("topic_audit_jobs").update({
    status: "running",
    updated_at: new Date().toISOString(),
  }).eq("id", jobId);

  let processed = job.processed ?? 0;
  let succeeded = job.succeeded ?? 0;
  let failed = job.failed ?? 0;
  let findingsCount = job.findings_count ?? 0;

  const end = Math.min(cursor + BATCH_SIZE, queue.length);
  let chained = false;
  // Schedule the next batch exactly once, no matter how this invocation exits.
  const chainOnce = async () => {
    if (chained) return;
    chained = true;
    if (cursor < queue.length) {
      await reinvokeContinue(jobId);
    }
  };

  try {
    for (let i = cursor; i < end; i++) {
      const { data: state } = await supa
        .from("topic_audit_jobs")
        .select("status")
        .eq("id", jobId)
        .maybeSingle();
      if (state?.status === "cancelled") {
        console.log(`job ${jobId} cancelled — stopping`);
        return;
      }

      const topic = queue[i];
      const startedAt = new Date();

      // Advance the persisted cursor BEFORE running the topic so that if the
      // edge runtime is killed mid-topic, the next chain skips past it
      // instead of restarting the same hung topic forever.
      cursor = i + 1;
      await supa.from("topic_audit_jobs").update({
        current_topic: topic.title,
        options: { ...opts, cursor },
        updated_at: startedAt.toISOString(),
      }).eq("id", jobId);

      await supa.from("topic_audit_topic_logs").upsert(
        {
          job_id: jobId,
          topic_id: topic.id,
          topic_title: topic.title,
          section: topic.section,
          topic_url: topic.url,
          status: "running",
          started_at: startedAt.toISOString(),
          completed_at: null,
          duration_ms: null,
          error_message: null,
          stages: {},
          findings_count: 0,
          updated_at: startedAt.toISOString(),
        },
        { onConflict: "job_id,section,topic_id" },
      );

      // Fire the successor chain BEFORE awaiting the topic. If this runtime
      // is killed mid-await (edge wall-clock / AI gateway hang), the next
      // invocation is already in flight and — because cursor was advanced
      // above — will pick up the NEXT topic, not retry the stuck one.
      // chainOnce is idempotent, so the finally block becomes a no-op when
      // this succeeds normally.
      await chainOnce();


      let logStatus: "succeeded" | "failed" = "succeeded";
      let logError: string | null = null;
      let logStages: Record<string, unknown> = {};
      let topicFindingsCount = 0;

      try {
        const { findings, stages } = await withTimeout(
          auditTopic(jobId, topic),
          PER_TOPIC_TIMEOUT_MS,
          `auditTopic(${topic.id})`,
        );
        logStages = stages as unknown as Record<string, unknown>;
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
          topicFindingsCount = rows.length;
        }
        succeeded++;
      } catch (e) {
        failed++;
        logStatus = "failed";
        logError = (e as Error).message;
        console.error(`audit failed for ${topic.id}`, e);
        await supa.from("topic_audit_jobs").update({
          last_error: `${topic.id}: ${(e as Error).message}`.slice(0, 500),
          updated_at: new Date().toISOString(),
        }).eq("id", jobId);
      }

      const completedAt = new Date();
      await supa
        .from("topic_audit_topic_logs")
        .update({
          status: logStatus,
          completed_at: completedAt.toISOString(),
          duration_ms: completedAt.getTime() - startedAt.getTime(),
          error_message: logError,
          stages: logStages,
          findings_count: topicFindingsCount,
          updated_at: completedAt.toISOString(),
        })
        .eq("job_id", jobId)
        .eq("section", topic.section)
        .eq("topic_id", topic.id);

      processed++;
      await supa.from("topic_audit_jobs").update({
        processed,
        succeeded,
        failed,
        findings_count: findingsCount,
        updated_at: new Date().toISOString(),
      }).eq("id", jobId);

      await new Promise((r) => setTimeout(r, 300));
    }

    if (cursor >= queue.length) {
      await supa.from("topic_audit_jobs").update({
        status: "completed",
        current_topic: null,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }).eq("id", jobId);
      return;
    }
  } finally {
    await chainOnce();
  }
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

    // Continue an existing job (self-chain): skip topic discovery entirely.
    if (action === "continue" && body.job_id) {
      // @ts-ignore EdgeRuntime global
      EdgeRuntime.waitUntil(runBatch(body.job_id));
      return new Response(JSON.stringify({ ok: true, continued: body.job_id }), {
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
        options: { ...(body.options ?? {}), topics: norm, cursor: 0 },
      })
      .select()
      .single();
    if (error) throw error;

    // @ts-ignore EdgeRuntime is global in Supabase Functions
    EdgeRuntime.waitUntil(runBatch(job.id));

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
