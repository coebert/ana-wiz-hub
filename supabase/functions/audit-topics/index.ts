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

function normalizeTopicUrl(section: string, id: string, rawUrl?: string | null) {
  const cleanSection = String(section).replace(/^\/+|\/+$/g, "");
  const cleanId = String(id).replace(/^\/+|\/+$/g, "");

  if (!rawUrl) return `${SITE_BASE}/${cleanSection}/${cleanId}`;

  try {
    const parsed = new URL(rawUrl);
    parsed.pathname = parsed.pathname.replace(/\/+/g, "/");
    parsed.pathname = parsed.pathname.replace(/\/$/, "");
    return parsed.toString();
  } catch {
    return `${SITE_BASE}/${cleanSection}/${cleanId}`;
  }
}

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
// NOTE: the previous version of this helper called clearTimeout as soon as
// fetch() resolved its headers, which left subsequent `await res.json()` /
// `res.text()` body reads with NO timeout. A slow/stalled response body
// (common with Firecrawl scrape and AI gateway hangs) would then run until
// the outer per-topic guard fired at 90s, causing every topic to time out.
//
// We now expose a helper that runs the *full* fetch+parse inside the abort
// window, so a hung body stream is aborted just like a hung connection.
async function fetchJsonWithTimeout<T = any>(
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<{ ok: boolean; status: number; json: T | null; text: string }> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const r = await fetch(url, { ...init, signal: ac.signal });
    const text = await r.text();
    let json: T | null = null;
    try {
      json = text ? (JSON.parse(text) as T) : null;
    } catch {
      json = null;
    }
    return { ok: r.ok, status: r.status, json, text };
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

async function firecrawlScrape(
  url: string,
  withScreenshot: boolean,
  timeoutMs = 35_000,
) {
  // Always request html as well — we use it to extract SVG label text for the
  // per-diagram audit pass. Markdown alone strips <svg><text> nodes.
  const formats: any[] = ["markdown", "html"];
  if (withScreenshot) formats.push("screenshot");

  const scrape = async (
    targetUrl: string,
    requestTimeoutMs: number,
    actions?: unknown[],
  ) => {
    const r = await fetchJsonWithTimeout(
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
          timeout: Math.max(8_000, requestTimeoutMs - 3_000),
          actions,
          storeInCache: false,
        }),
      },
      requestTimeoutMs,
    );
    if (!r.ok) return null;
    const data = r.json as any;
    return data?.data ?? data;
  };

  try {
    const startedAt = Date.now();
    const directBudget = Math.max(12_000, Math.floor(timeoutMs * 0.55));
    const direct = await scrape(url, directBudget);
    const directMarkdown = String(direct?.markdown ?? "");
    if (directMarkdown.length >= 200) return direct;

    const { sectionUrl, actions } = buildTopicScrapeActions(url, withScreenshot);
    const elapsed = Date.now() - startedAt;
    const remaining = timeoutMs - elapsed;
    if (remaining < 10_000) return direct;

    const viaSection = await scrape(sectionUrl, remaining, actions);
    const sectionMarkdown = String(viaSection?.markdown ?? "");
    return sectionMarkdown.length >= 200 ? viaSection : direct;
  } catch (_e) {
    return null;
  }
}

async function firecrawlSearch(query: string, limit = 3, timeoutMs = 15_000) {
  try {
    const r = await fetchJsonWithTimeout(
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
      timeoutMs,
    );
    if (!r.ok) return [];
    const data = r.json as any;
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
              in_topic_section: {
                type: "string",
                description:
                  "Verbatim heading of the in-page section / CollapsibleSubsection the finding refers to (e.g. 'Inguinal Canal', 'Pharmacokinetics'). Use the closest visible <h2>/<h3> heading above the offending passage. Empty string only if no section heading applies.",
              },
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
- Excerpts from authoritative UK and international reference sources (preferred: BJA Education, BJA, RCoA, FICM, ICS, AAGBI/Association of Anaesthetists, NICE, BNF, Resuscitation Council UK, ESICM).

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

const DIAGRAM_SYSTEM = `You are an anatomy / physiology / pharmacology illustration reviewer for UK anaesthetic teaching (FRCA / FFICM).

You will be shown a full-page screenshot of one topic page that contains one or more diagrams (anatomy plates, waveforms, pressure-volume loops, capnography traces, drug-receptor schematics, ventilator loops, flow-charts, dose-response curves, cardiac cycle / Wiggers, ECGs, anatomical cross-sections, etc.) plus the topic title and section.

Audit EVERY visible diagram against the standard UK and international references (BJA Education, Gray's Anatomy 42e, Hadzic Regional Anesthesia 2e, West's Respiratory Physiology, Pappano Cardiovascular Physiology, RCoA / FICM curriculum, BNF, ESICM). Look hard for:
- anatomical structures in wrong positions, missing, mislabelled, or on the wrong side (remember the convention: patient-RIGHT = viewer-LEFT in anterior views)
- spinal nerve-root contributions that do not match canon (e.g. femoral L2–L4, sciatic L4–S3, phrenic C3–C5, brachial plexus C5–T1)
- vessels on the wrong side of midline (descending aorta should be patient-LEFT; SVC/IVC right)
- waveforms / loops whose shape, axis, or annotated value contradicts standard physiology (e.g. capnography α/β/γ angles, ICP waveform P1>P2>P3 normally, oxyhaemoglobin curve P50≈3.5 kPa)
- flow-charts / algorithms with wrong directionality, missing step, or step in wrong order vs the cited guideline
- labelling typos, abbreviations not used in UK practice, mis-spelled drug names, wrong units (kPa vs mmHg confusion, mg vs mcg)
- units/value mismatches between graph axis and quoted text

DO NOT be conservative. If you have any reasonable suspicion supported by the topic title + visible content, raise a finding at appropriate severity. It is better to surface a false positive that the reviewer dismisses than to silently pass over a real diagram error. Empty findings is reserved for the case where there are genuinely zero diagrams on the page.

For each issue emit a finding with category="diagram", quote the specific label/region in "details", and cite the relevant authoritative source URL when known (BJA Educ, Gray's, Hadzic, NICE, BNF, RCoA, ESICM, etc.). Return ONLY the tool call.`;

// Text-only per-diagram audit: feeds extracted <text> labels from each SVG
// directly to the model, so the audit no longer depends on screenshot quality.
const DIAGRAM_LABELS_SYSTEM = `You are auditing the label text extracted from ONE SVG diagram on a UK FRCA / FFICM revision page. You will be given the diagram's contextual heading, the topic title, and the verbatim list of every <text> label inside the SVG.

Cross-check the labels against canonical anatomy / physiology / pharmacology for that topic:
- Are the named structures plausibly present in this kind of diagram?
- For nerves: do listed spinal roots match canon (femoral L2–L4, sciatic L4–S3, obturator L2–L4, phrenic C3–C5, lumbar plexus L1–L4, brachial plexus C5–T1, pudendal S2–S4)?
- For vessels / chambers / valves: is the named side / position correct?
- For physiology / pharmacology: are quoted values, axis units, or pathway directions correct?
- Are there UK-style typos, mis-spelled drug names, deprecated terminology (e.g. "peroneal" vs "fibular"), or wrong abbreviations?

Raise any genuine mismatch as category="diagram". You do NOT need a screenshot to comment on labels — work from the text list alone. Empty findings means the labels look correct and complete. Return ONLY the tool call.`;

async function callAI(args: {
  system: string;
  userText: string;
  imageUrl?: string;
  model?: string;
  timeoutMs?: number;
}): Promise<any[]> {
  const userContent: any = args.imageUrl
    ? [
        { type: "text", text: args.userText },
        { type: "image_url", image_url: { url: args.imageUrl } },
      ]
    : args.userText;

  const res = await fetchJsonWithTimeout(
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
    args.timeoutMs ?? (args.imageUrl ? 25_000 : 30_000),
  );
  if (!res.ok) {
    throw new Error(`AI gateway ${res.status}: ${res.text.slice(0, 300)}`);
  }
  const data = res.json as any;
  const call = data?.choices?.[0]?.message?.tool_calls?.[0];
  if (!call) return [];
  try {
    const parsed = JSON.parse(call.function.arguments);
    return Array.isArray(parsed.findings) ? parsed.findings : [];
  } catch {
    return [];
  }
}

// ---------- SVG label extraction ----------
// Pulls every <svg> from a scraped HTML page along with its enclosing
// section heading (if any) and the verbatim list of <text> labels. We feed
// this to the diagram-labels AI pass so the auditor can comment on each
// diagram by its actual labels rather than relying on a screenshot.
interface ExtractedSvg {
  heading: string;
  labels: string[];
  charCount: number;
}

function extractSvgsFromHtml(html: string): ExtractedSvg[] {
  if (!html) return [];
  const out: ExtractedSvg[] = [];
  // Find each <svg ...>...</svg> (non-greedy, with nested-tag tolerance via
  // non-backtracking pattern). SVGs are not allowed to nest in valid HTML.
  const svgRx = /<svg\b[^>]*>([\s\S]*?)<\/svg>/gi;
  let m: RegExpExecArray | null;
  while ((m = svgRx.exec(html)) !== null) {
    const inner = m[1];
    // Pull <text>...</text> contents, stripping nested <tspan> wrappers.
    const labels: string[] = [];
    const textRx = /<text\b[^>]*>([\s\S]*?)<\/text>/gi;
    let t: RegExpExecArray | null;
    while ((t = textRx.exec(inner)) !== null) {
      const raw = t[1]
        .replace(/<tspan\b[^>]*>/gi, "")
        .replace(/<\/tspan>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (raw && raw.length <= 200) labels.push(raw);
    }
    if (labels.length < 2) continue; // skip ornamental SVGs / icons

    // Find the nearest preceding <h2>/<h3> as heading context.
    const before = html.slice(0, m.index);
    const hMatch = before.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>(?![\s\S]*<h[23])/i);
    const heading = hMatch
      ? hMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      : "";

    out.push({ heading, labels, charCount: inner.length });
    if (out.length >= 12) break; // cap to keep AI budget reasonable
  }
  return out;
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
  diagram_label_findings: number;
  svg_count: number;
  text_error?: string;
  diagram_error?: string;
  diagram_label_error?: string;
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
    diagram_label_findings: 0,
    svg_count: 0,
  };

  const topicStartedAt = Date.now();
  const remainingBudget = () => PER_TOPIC_TIMEOUT_MS - (Date.now() - topicStartedAt);
  const hasBudget = (ms: number) => remainingBudget() > ms;

  // 1. Scrape current topic page (markdown + html + screenshot)
  let page: any = null;
  try {
    page = await firecrawlScrape(
      topic.url,
      true,
      Math.min(35_000, Math.max(12_000, remainingBudget() - 25_000)),
    );
  } catch (e) {
    stages.scrape_error = (e as Error).message;
  }
  const pageMarkdown: string = page?.markdown ?? "";
  const pageHtml: string = page?.html ?? page?.rawHtml ?? "";
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

  const [bjaResults, generalResults] = hasBudget(35_000)
    ? await Promise.all([
        firecrawlSearch(queryBJA, 2, 12_000),
        firecrawlSearch(queryGeneral, 2, 12_000),
      ])
    : [[], []];

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
      // Tightened to leave room for the diagram passes below.
      timeoutMs: Math.min(24_000, Math.max(10_000, remainingBudget() - 30_000)),
    });
    stages.text_findings = textFindings.length;
    all.push(...textFindings);
  } catch (e) {
    stages.text_error = (e as Error).message;
    console.error(`text audit error for ${topic.id}`, e);
  }

  // 4a. Per-diagram label audit (text-only, from extracted SVG labels).
  // This runs even when the screenshot pass fails — it depends only on the
  // scraped HTML, so anatomy labels, axis units, nerve roots etc. are
  // always inspected for every SVG on the page.
  const svgs = extractSvgsFromHtml(pageHtml);
  stages.svg_count = svgs.length;
  if (svgs.length > 0 && hasBudget(12_000)) {
    const diagramSummaryForRef = svgs
      .slice(0, 12)
      .map(
        (s, i) =>
          `--- Diagram ${i + 1} (heading: ${s.heading || "—"})\nLabels: ${s.labels
            .slice(0, 80)
            .map((l) => `"${l}"`)
            .join(", ")}`,
      )
      .join("\n\n");

    try {
      const labelFindings = await callAI({
        system: DIAGRAM_LABELS_SYSTEM,
        userText: [
          `Topic: ${topic.title}`,
          `Section: ${topic.section}`,
          `URL: ${topic.url}`,
          "",
          "=== EXTRACTED SVG LABELS ===",
          diagramSummaryForRef,
          "",
          "=== AUTHORITATIVE REFERENCE EXCERPTS (for cross-check) ===",
          refs.length === 0
            ? "(none available — rely on canonical anatomy/physiology)"
            : refs
                .map(
                  (r, i) =>
                    `--- Reference ${i + 1}: ${r.title}\n${r.url}\n${r.excerpt.slice(0, 1500)}`,
                )
                .join("\n\n"),
        ].join("\n"),
        timeoutMs: Math.min(20_000, Math.max(10_000, remainingBudget() - 18_000)),
      });
      stages.diagram_label_findings = labelFindings.length;
      for (const f of labelFindings) {
        f.category = "diagram";
      }
      all.push(...labelFindings);
    } catch (e) {
      stages.diagram_label_error = (e as Error).message;
      console.error(`diagram-label audit error for ${topic.id}`, e);
    }
  }

  // 4b. Diagram vision audit. ALWAYS run when a screenshot was returned —
  // previously this was gated behind a ~20s budget check and routinely
  // skipped, which is why the audit never surfaced diagram findings. The
  // dedicated budget here is the real cap so it cannot starve job chaining.
  if (screenshot) {
    if (hasBudget(8_000)) {
      try {
        const diagramFindings = await callAI({
          system: DIAGRAM_SYSTEM,
          userText: [
            `Topic: ${topic.title}`,
            `Section: ${topic.section}`,
            `URL: ${topic.url}`,
            "",
            svgs.length > 0
              ? `This page contains ${svgs.length} SVG diagram(s). Diagram headings:\n${svgs
                  .map((s, i) => `  ${i + 1}. ${s.heading || "(no heading)"}`)
                  .join("\n")}`
              : "Inspect all visible diagrams.",
            "",
            "Audit every diagram for visual / anatomical / physiological accuracy.",
          ].join("\n"),
          imageUrl: screenshot,
          model: "google/gemini-2.5-pro",
          timeoutMs: Math.min(22_000, Math.max(10_000, remainingBudget() - 4_000)),
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
    } else {
      stages.diagram_error = "Skipped vision pass (insufficient budget)";
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
// runtime's ~150s limit. Invocations must run strictly one-at-a-time for a
// given job; scheduling the successor before the current topic completed led
// to overlapping workers, false "failed" states, and racing job counters.
const BATCH_SIZE = 1;
// Hard cap per topic. Stage budgets sum to ~70s in the happy path
// (scrape 30 + search 10 + AI text 25 + diagram 0–15); the extra headroom
// here absorbs occasional latency spikes from Firecrawl or the AI gateway
// without firing the topic-level guard. Still well under the edge runtime's
// ~150s wall-clock so the timeout + finally + chainOnce all run.
const PER_TOPIC_TIMEOUT_MS = 130_000;
const STALE_RUNNING_LOG_MS = 5 * 60_000;

async function reinvokeContinue(jobId: string) {
  try {
    await fetchJsonWithTimeout(
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
  if (
    job.status === "cancelled" ||
    job.status === "completed" ||
    job.status === "completed_with_errors" ||
    job.status === "failed"
  ) {
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

  // Heal genuinely stale "running" rows from a prior killed runtime, but do
  // not touch fresh rows because active invocations update them.
  await supa
    .from("topic_audit_topic_logs")
    .update({
      status: "failed",
      error_message: "Runtime terminated before topic completed; auto-marked failed on resume.",
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("job_id", jobId)
    .eq("status", "running")
    .lt("updated_at", new Date(Date.now() - STALE_RUNNING_LOG_MS).toISOString());

  await supa.from("topic_audit_jobs").update({
    status: "running",
    updated_at: new Date().toISOString(),
  }).eq("id", jobId);

  let processed = job.processed ?? 0;
  let succeeded = job.succeeded ?? 0;
  let failed = job.failed ?? 0;
  let findingsCount = job.findings_count ?? 0;

  const end = Math.min(cursor + BATCH_SIZE, queue.length);
  let jobLastError: string | null = null;

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

      await supa.from("topic_audit_jobs").update({
        current_topic: topic.title,
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
            in_topic_section:
              typeof f.in_topic_section === "string" && f.in_topic_section.trim()
                ? f.in_topic_section.trim().slice(0, 200)
                : null,
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
        jobLastError = `${topic.id}: ${(e as Error).message}`.slice(0, 500);
        console.error(`audit failed for ${topic.id}`, e);
        await supa.from("topic_audit_jobs").update({
          last_error: jobLastError,
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
      cursor = i + 1;
      await supa.from("topic_audit_jobs").update({
        processed,
        succeeded,
        failed,
        findings_count: findingsCount,
        current_topic: cursor < queue.length ? queue[cursor]?.title ?? null : null,
        options: { ...opts, cursor },
        updated_at: new Date().toISOString(),
      }).eq("id", jobId);

      await new Promise((r) => setTimeout(r, 300));
  }

  if (cursor >= queue.length) {
    await supa.from("topic_audit_jobs").update({
      status: failed > 0 ? "completed_with_errors" : "completed",
      current_topic: null,
      last_error: jobLastError,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }).eq("id", jobId);
    return;
  }

  if (cursor < queue.length) {
    await reinvokeContinue(jobId);
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
        url: normalizeTopicUrl(String(t.section), String(t.id), t.url),
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
