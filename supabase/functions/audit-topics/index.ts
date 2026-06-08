// Topic accuracy auditor.
// For each topic:
//   1. Scrape the live topic page (markdown + screenshot) via Firecrawl
//   2. Search BJA Education + other UK reputable sources via Firecrawl
//   3. Ask Gemini 2.5 Pro to compare and emit structured findings
//   4. If a screenshot/diagram is available, run a vision pass for anatomical accuracy
//
// Runs in the background via EdgeRuntime.waitUntil so the HTTP response returns immediately.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-internal-token",
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

// ---- FRCA / FFICM freshness anchors --------------------------------------
// Per-section hints of guidelines / consensus statements that frequently
// drive content drift. Surfaced to the FRESHNESS LLM pass as PROMPTS only —
// the model still has to verify against a quoted recent source before
// raising a finding. Keep entries short; do not assert they ARE outdated.
const FRESHNESS_ANCHORS_BY_SECTION: Record<string, string[]> = {
  physics: [
    "AAGBI/Anaesthetists.org Standards of Monitoring 2021 (and any 2024+ revision)",
    "MHRA device safety alerts on anaesthetic machines / vaporisers / ventilators",
    "ISO 80601-2-13 anaesthetic workstation updates",
  ],
  physiology: [
    "BJA Education review articles in the last 3 y on applied physiology",
    "ESICM / SCCM consensus statements affecting physiological targets",
  ],
  pharmacology: [
    "BNF / BNFc dose changes (most recent edition)",
    "MHRA Drug Safety Updates (e.g. opioids, gabapentinoids, neuromuscular blockers)",
    "NICE TA / NG updates on perioperative drug therapy",
    "Sugammadex, remimazolam, ciprofol — UK licensing status updates",
  ],
  clinical: [
    "Difficult Airway Society (DAS) guidelines — most recent edition",
    "RCoA / AAGBI consent, monitoring, and preoperative assessment updates",
    "NAP7 (perioperative cardiac arrest, 2023) implications",
    "NICE NG45 routine preoperative tests — current revision",
  ],
  "intensive-care": [
    "Surviving Sepsis Campaign (most recent update)",
    "FICM / ICS guidelines: rehabilitation after critical illness, organ donation, prognostication",
    "ARDS Berlin / global definition (2023) updates",
    "ESICM consensus statements (last 3 y)",
    "NAP7 ICU implications",
  ],
  perioperative: [
    "RCUK ALS / paediatric ALS — most recent edition",
    "AAGBI peri-operative blood transfusion / anaphylaxis / massive haemorrhage guidance",
    "NICE NG: VTE prophylaxis, perioperative care in adults (NG180)",
    "Centre for Perioperative Care (CPOC) consensus documents",
    "NAP7 (2023) and NAP6 (anaphylaxis) implications",
  ],
};

function freshnessHintsFor(section: string): string {
  const list = FRESHNESS_ANCHORS_BY_SECTION[section];
  if (!list || list.length === 0) {
    return "(no section-specific hints — use general UK FRCA/FFICM guideline knowledge)";
  }
  return list.map((s, i) => `  ${i + 1}. ${s}`).join("\n");
}


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
// Transient HTTP statuses that warrant a retry. Everything else (4xx auth/
// validation errors) is treated as terminal so we don't burn the budget.
const RETRYABLE_STATUSES = new Set([408, 425, 429, 500, 502, 503, 504]);

function isRetryableStatus(status: number) {
  return status === 0 || RETRYABLE_STATUSES.has(status);
}

// Exponential backoff with jitter. Base doubles each attempt and is capped
// at 8s so a 4-attempt sequence sleeps roughly: 1s → 2s → 4s → 8s (±30%).
// 408 (request timeout) gets an extra +1.5s on top because Firecrawl's
// upstream render usually needs cool-down time before it will succeed.
function backoffDelayMs(attempt: number, status = 0) {
  const base = Math.min(8000, 1000 * Math.pow(2, attempt));
  const jittered = Math.round(base * (0.7 + Math.random() * 0.6));
  return status === 408 ? jittered + 1500 : jittered;
}

/**
 * Per-attempt diagnostic record. Surfaced via stages.scrape_diagnostics so
 * operators can see exactly why a topic failed to retrieve (URL tried, HTTP
 * status, retry count, error snippet, wall-clock duration).
 */
export type AttemptRecord = {
  url?: string;
  attempt: number;
  status: number;
  duration_ms: number;
  ok: boolean;
  error?: string;
};

/**
 * Run `op` up to `maxAttempts` times, retrying on transient failures.
 * Returns `{ value, attempts }` so the caller can record diagnostics
 * (URL, status, retries, error snippet, duration) for observability.
 */
async function retryWithBackoff<T>(
  label: string,
  totalBudgetMs: number,
  maxAttempts: number,
  op: (attemptTimeoutMs: number, attempt: number) => Promise<{ ok: boolean; status: number; value: T | null; error?: string; url?: string }>,
): Promise<{ value: T | null; attempts: AttemptRecord[] }> {
  const startedAt = Date.now();
  let lastValue: T | null = null;
  const attempts: AttemptRecord[] = [];
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const elapsed = Date.now() - startedAt;
    const remaining = totalBudgetMs - elapsed;
    if (remaining < 4_000) {
      console.warn(`[audit-topics] ${label} retry aborted: budget exhausted (remaining=${remaining}ms)`);
      attempts.push({ attempt: attempt + 1, status: 0, duration_ms: 0, ok: false, error: `budget exhausted (remaining=${remaining}ms)` });
      break;
    }
    const attemptsLeft = maxAttempts - attempt;
    const attemptTimeout = attemptsLeft > 1
      ? Math.max(6_000, Math.floor(remaining / attemptsLeft))
      : remaining;

    const attemptStart = Date.now();
    let result: { ok: boolean; status: number; value: T | null; error?: string; url?: string };
    try {
      result = await op(attemptTimeout, attempt);
    } catch (e) {
      result = { ok: false, status: 0, value: null, error: (e as Error).message };
    }
    const duration = Date.now() - attemptStart;
    attempts.push({
      url: result.url,
      attempt: attempt + 1,
      status: result.status,
      duration_ms: duration,
      ok: result.ok,
      error: result.error,
    });
    lastValue = result.value ?? lastValue;
    if (result.ok) return { value: result.value, attempts };

    if (!isRetryableStatus(result.status) || attempt === maxAttempts - 1) {
      if (!result.ok) {
        console.warn(
          `[audit-topics] ${label} failed attempt ${attempt + 1}/${maxAttempts} ` +
          `status=${result.status} ${result.error ?? ""} (no more retries)`,
        );
      }
      break;
    }

    const delay = backoffDelayMs(attempt, result.status);
    const remainingAfter = totalBudgetMs - (Date.now() - startedAt);
    if (remainingAfter - delay < 6_000) {
      console.warn(`[audit-topics] ${label} skipping retry: not enough budget after backoff`);
      break;
    }
    console.warn(
      `[audit-topics] ${label} transient failure status=${result.status} ` +
      `attempt=${attempt + 1}/${maxAttempts} — retrying in ${delay}ms`,
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return { value: lastValue, attempts };
}

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

export type ScrapeDiagnostics = {
  primary_url: string;
  final_url?: string;
  attempts: AttemptRecord[];
  last_status: number;
  last_error?: string;
  retry_count: number;
  total_duration_ms: number;
};

export type ScrapeResult = {
  data: any | null;
  diagnostics: ScrapeDiagnostics;
};

async function firecrawlScrape(
  url: string,
  withScreenshot: boolean,
  timeoutMs = 50_000,
): Promise<ScrapeResult> {
  // Always request html as well — we use it to extract SVG label text for the
  // per-diagram audit pass. Markdown alone strips <svg><text> nodes.
  const formats: any[] = ["markdown", "html"];
  if (withScreenshot) formats.push("screenshot");

  const startedAtTotal = Date.now();
  const allAttempts: AttemptRecord[] = [];
  let finalUrl: string | undefined;

  const scrape = async (
    targetUrl: string,
    budgetMs: number,
    opts: {
      actions?: unknown[];
      onlyMainContent?: boolean;
      waitFor?: number;
      strategy?: string;
    } = {},
  ) => {
    const onlyMainContent = opts.onlyMainContent ?? true;
    const requestedWaitFor = opts.waitFor ?? (opts.actions ? 1200 : 8000);
    const strategy = opts.strategy ?? "default";
    const { value, attempts } = await retryWithBackoff<any>(
      `scrape[${strategy}] ${targetUrl}`,
      budgetMs,
      3,
      async (attemptTimeoutMs) => {
        // Firecrawl v2 requires `waitFor <= timeout / 2`. The client-side
        // AbortController fires at `attemptTimeoutMs`, so the value we send
        // as `timeout` must be a little smaller than that, and the
        // resulting `waitFor` cap is roughly half of it.
        const firecrawlTimeout = Math.max(6_000, attemptTimeoutMs - 2_000);
        const waitForCap = Math.max(500, Math.floor(firecrawlTimeout / 2) - 500);
        const waitFor = Math.min(requestedWaitFor, waitForCap);

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
              onlyMainContent,
              waitFor,
              timeout: firecrawlTimeout,
              actions: opts.actions,
              storeInCache: false,
              blockAds: true,
            }),
          },
          attemptTimeoutMs,
        );
        const data = r.json as any;
        const value = data?.data ?? data;
        const markdownLen = String(value?.markdown ?? "").length;
        const usable = r.ok && markdownLen >= 200;
        return {
          ok: usable,
          status: r.ok && !usable ? 502 : r.status,
          value,
          url: targetUrl,
          error: r.ok
            ? (usable ? undefined : `[${strategy}] empty markdown (got ${markdownLen} chars)`)
            : `[${strategy}] ${r.text?.slice(0, 200) ?? ""}`,
        };
      },
    );

    allAttempts.push(...attempts);
    finalUrl = targetUrl;
    return value;
  };

  const buildDiagnostics = (): ScrapeDiagnostics => {
    const last = allAttempts[allAttempts.length - 1];
    return {
      primary_url: url,
      final_url: finalUrl,
      attempts: allAttempts,
      last_status: last?.status ?? 0,
      last_error: last?.error,
      retry_count: Math.max(0, allAttempts.length - 1),
      total_duration_ms: Date.now() - startedAtTotal,
    };
  };

  // Track best result across all strategies — never throw away a partial page
  // just because a later attempt also failed. (Some topics return e.g. 150
  // chars of header markdown; not enough to audit but better than `null`.)
  let bestData: any = null;
  let bestLen = 0;
  const remember = (d: any) => {
    const len = String(d?.markdown ?? "").length;
    if (len > bestLen) {
      bestData = d;
      bestLen = len;
    }
  };

  try {
    // Strategy A — direct URL, main-content extraction, generous client-side
    // hydration wait. Covers most topics.
    const startedAt = Date.now();
    const directBudget = Math.max(10_000, Math.floor(timeoutMs * 0.40));
    const direct = await scrape(url, directBudget, { strategy: "direct" });
    remember(direct);
    if (bestLen >= 200) {
      return { data: bestData, diagnostics: buildDiagnostics() };
    }

    // Strategy B — same URL but relaxed: `onlyMainContent: false` and a
    // longer wait. Pages where the main-content heuristic strips the SPA
    // body (the dominant failure mode for organ-donation,
    // prognostication-ethics-icu, perioperative-fluids) succeed here.
    let elapsed = Date.now() - startedAt;
    let remaining = timeoutMs - elapsed;
    if (remaining >= 12_000) {
      const relaxedBudget = Math.max(10_000, Math.floor(remaining * 0.55));
      const relaxed = await scrape(url, relaxedBudget, {
        strategy: "relaxed",
        onlyMainContent: false,
        waitFor: 10_000,
      });
      remember(relaxed);
      if (bestLen >= 200) {
        return { data: bestData, diagnostics: buildDiagnostics() };
      }
    }

    // Strategy C — last resort: navigate to the section index and click
    // through to the topic. Slow but bypasses CDN/edge oddities tied to the
    // deep-link URL.
    elapsed = Date.now() - startedAt;
    remaining = timeoutMs - elapsed;
    if (remaining < 10_000) {
      return { data: bestData, diagnostics: buildDiagnostics() };
    }
    const { sectionUrl, actions } = buildTopicScrapeActions(url, withScreenshot);
    const viaSection = await scrape(sectionUrl, remaining, {
      strategy: "section-click",
      actions,
      onlyMainContent: false,
    });
    remember(viaSection);
    return { data: bestData, diagnostics: buildDiagnostics() };
  } catch (e) {
    allAttempts.push({
      attempt: allAttempts.length + 1,
      status: 0,
      duration_ms: 0,
      ok: false,
      error: `unexpected: ${(e as Error).message}`,
    });
    return { data: bestData, diagnostics: buildDiagnostics() };
  }
}


async function firecrawlSearch(
  query: string,
  limit = 3,
  timeoutMs = 20_000,
  opts: { tbs?: string } = {},
) {
  const { value } = await retryWithBackoff<any[]>(
    `search "${query.slice(0, 60)}"`,
    timeoutMs,
    3,
    async (attemptTimeoutMs) => {
      const body: Record<string, unknown> = {
        query,
        limit,
        scrapeOptions: { formats: ["markdown"] },
      };
      // Firecrawl v2 supports Google-style time filters via `tbs`
      // (qdr:d / qdr:w / qdr:m / qdr:y / qdr:y3 etc.). Surfaces recent
      // guidelines for the freshness pass without scraping the whole web.
      if (opts.tbs) body.tbs = opts.tbs;
      const r = await fetchJsonWithTimeout(
        "https://api.firecrawl.dev/v2/search",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
        attemptTimeoutMs,
      );
      const data = r.json as any;
      const list = data?.data ?? data?.web ?? [];
      const value = Array.isArray(list) ? list : [];
      return { ok: r.ok, status: r.status, value, error: r.ok ? undefined : r.text?.slice(0, 200) };
    },
  );
  return value ?? [];
}





// ---------- AI helpers ----------
const FINDING_TOOL = {
  type: "function",
  function: {
    name: "emit_findings",
    description:
      "Emit findings for the topic. Empty array means no issues detected. EVERY finding must include verbatim evidence (topic_quote AND source_quote where applicable) — never paraphrase.",
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
                  "thin",
                  "gap",
                  "update",
                ],
                description:
                  "factual = wrong fact; outdated = superseded by newer guideline; missing = key concept absent from a section that exists; citation = weak/missing source; diagram = figure issue; terminology = wrong/UK-incorrect wording; thin = section exists but is shallow and needs expanding; gap = a whole subtopic expected by the FRCA/FFICM curriculum is absent and should be added; update = current content is correct but a newer guideline/evidence/dose recommendation supersedes it.",
              },
              confidence: {
                type: "string",
                enum: ["low", "medium", "high"],
                description:
                  "high = directly contradicted (or for thin/gap, directly covered) by a quoted authoritative source; medium = strongly implied by references; low = general knowledge inference. NEVER mark factual/outdated/terminology findings 'high' unless source_quote contains an explicit contradiction.",
              },
              exam_relevance: {
                type: "string",
                enum: ["Primary", "Final", "FFICM", "All"],
                description:
                  "Which UK exam this matters for. 'All' only when it spans every level.",
              },
              summary: {
                type: "string",
                description:
                  "Concrete one-line headline. Bad: 'Improve accuracy of section'. Good: 'Paediatric arrest adrenaline dose stated as 100 mcg/kg — RCUK 2021 is 10 mcg/kg.'",
              },
              details: { type: "string" },
              topic_quote: {
                type: "string",
                description:
                  "VERBATIM ≤300-char passage from the topic markdown that is wrong/thin/superseded. For 'gap' findings (subtopic absent) use empty string. Never paraphrase, never use ellipsis at start/end.",
              },
              source_quote: {
                type: "string",
                description:
                  "VERBATIM ≤400-char passage from one of the supplied reference excerpts that supports the finding. Empty string is permitted ONLY for thin/gap findings when no excerpt was supplied; in that case `details` must name a specific guideline (title + year).",
              },
              suggested_fix: {
                type: "string",
                description:
                  "Actionable. For factual/outdated/update: state the correct value/dose/threshold and where to place it. For thin/gap: list the subheadings, bullet points, values, formulae or guideline references that should be added. Never write 'add a citation' or 'expand this section' alone.",
              },
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
              "confidence",
              "exam_relevance",
              "summary",
              "details",
              "topic_quote",
              "source_quote",
              "suggested_fix",
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

// ---- ACCURACY (Pass A) ---------------------------------------------------
const ACCURACY_SYSTEM = `You are a UK anaesthetic and intensive-care content auditor for FRCA/FFICM revision material. THIS PASS focuses ONLY on accuracy — NOT coverage.

You will be given:
- The current text of one topic on the AnaesthesiaCore revision site.
- The topic's stated scope (title + description).
- Excerpts from authoritative UK and international reference sources.
- A list of previously-raised findings, INCLUDING any already confirmed as FALSE POSITIVES by a human reviewer.

Raise findings ONLY for:
- factual     — a stated fact, mechanism, value, dose, or unit is wrong
- outdated    — content matches an older guideline that has since been replaced (name both old and new guideline + year)
- terminology — wrong/non-UK term, mis-spelled drug, wrong unit, deprecated nomenclature (e.g. 'peroneal' vs 'fibular')
- citation    — a specific number/threshold/dose is asserted with NO authoritative source AND a supplied reference contradicts or qualifies it

Hard rules (violations are discarded):
1. EVERY finding MUST include a verbatim topic_quote (≤300 char, copy-pasted from the markdown — no paraphrase, no ellipsis).
2. EVERY finding MUST include a verbatim source_quote from one of the supplied reference excerpts that explicitly contradicts or supersedes the topic_quote.
3. If no supplied excerpt explicitly contradicts the topic_quote, DO NOT raise the finding. Conservative is correct.
4. NEVER re-raise a finding that appears in the FALSE POSITIVES list — those have been reviewed and dismissed.
5. NEVER re-raise an open finding with the same offending passage.
6. Do NOT raise coverage / thin / gap / update issues here — separate pass handles those.
7. Drug doses, vasopressor infusion rates, resus-algorithm numbers, airway-rescue steps must be checked against BNF / RCoA / RCUK / NICE when covered by references. A wrong number here is "critical".
8. Tabbed / interactive diagrams (e.g. AntibioticPKPDPrimer) may render only one tab in scraped markdown — do NOT raise a "missing tab content" finding; the SVG label list is provided separately.

Severity:
- critical — patient-safety (wrong dose, wrong resus step, wrong airway algorithm)
- major    — wrong mechanism, wrong physiology, wrong threshold that would be examined
- minor    — imprecise wording, mildly dated phrasing
- info     — stylistic

Return ONLY the tool call.`;

// ---- COVERAGE (Pass B) ---------------------------------------------------
const COVERAGE_SYSTEM = `You are a UK FRCA / FFICM examiner reviewing one revision topic for COVERAGE AND DEPTH. You are NOT auditing accuracy.

You will be given:
- The current text of one topic.
- The topic's stated scope (title + description).
- Reference excerpts from BJA Education / RCoA / FICM / NICE / Resus Council / ESICM.
- A list of previously-raised coverage findings (open + dismissed as false positive).

Your job is to find places where the page is too thin for an FRCA/FFICM candidate, where a curriculum-expected subtopic is missing entirely, or where a newer guideline / dose / threshold should be added. You ARE EXPECTED TO FIND ISSUES — most revision pages have at least one coverage gap compared to the BJA Education / RCoA treatment of the same scope. An empty findings array is only acceptable when the page is genuinely comprehensive AND deep.

Use these categories:
- thin   — section exists but is too shallow (1–2 lines where the exam needs values, mechanisms, clinical context). topic_quote = the thin passage verbatim.
- gap    — a whole subtopic expected by the curriculum is absent. topic_quote = empty string; details MUST name the missing subtopic and what it should contain.
- update — current content is correct but superseded by a named newer guideline / dose / threshold. topic_quote = the now-outdated passage; source_quote = the newer recommendation.

For EVERY finding:
- summary names the missing/thin subtopic concretely (NOT 'expand this section').
- suggested_fix is an actionable outline: list the subheadings, bullet points, values, formulae or guideline references to add — aim for 4–8 concrete items.
- source_quote should be verbatim from supplied references showing the depth/topic missing. If no excerpt covers it, source_quote may be empty BUT details MUST name a specific BJA Education / RCoA / NICE document (with year) where the gap is addressed.
- exam_relevance set accurately — FFICM-only gaps must not be marked 'Final'.

Hard rules:
1. NEVER re-raise a finding from the FALSE POSITIVES list.
2. NEVER raise the same gap as an existing open finding — check the supplied list first.
3. Do NOT raise factual errors — separate pass handles those.
4. Use "high" confidence only when a supplied reference explicitly covers the missing material.
5. Tabbed / interactive diagrams may render only one tab in markdown — do NOT raise a thin/gap finding about a diagram's content unless the SVG label list confirms the missing content is genuinely absent.
6. Aim for QUALITY over quantity: 1–4 specific, actionable coverage findings beats 8 vague ones.

Severity:
- major — curriculum-required subtopic absent or so thin it would lose an exam mark
- minor — section present but should have more depth
- info  — nice-to-have expansion

Return ONLY the tool call.`;

// ---- FRESHNESS (Pass C) --------------------------------------------------
// Dedicated pass that asks the model whether any major UK/international
// guideline, dose, or threshold relevant to this FRCA/FFICM topic has been
// updated within the last ~3 years and is NOT yet reflected in the page.
// Runs against time-filtered Firecrawl search results so the model sees
// recent guideline excerpts rather than historic ones.
const FRESHNESS_SYSTEM = `You are a UK FRCA / FFICM curriculum maintainer auditing ONE revision topic for content freshness.

You will be given:
- The current text of one topic on the AnaesthesiaCore revision site.
- The topic's stated scope (title + description) and FRCA/FFICM curriculum section.
- Recent (last ~3 years) reference excerpts from authoritative UK / international bodies — BJA Education, RCoA, FICM, ICS, NICE, BNF, Resus Council UK, ESICM, AAGBI / Anaesthetists.org.
- Hints about which guidelines / consensus statements are commonly tested for this section (use as prompts, not gospel).
- A list of previously-raised findings (open + dismissed as false positive).

Your ONLY job is to surface freshness drift — situations where the page is internally consistent but a more recent named guideline, dose, threshold, drug licensing change, NAP report, or consensus statement supersedes or supplements it. You are NOT auditing accuracy or coverage here.

Use these categories:
- outdated — page repeats an OLD recommendation that has been REPLACED by a named newer guideline (name BOTH old and new + year). topic_quote = the now-outdated passage verbatim. source_quote = the new recommendation.
- update   — page is correct but does NOT mention a recent (≤3 y) named update / NAP report / NICE NG / consensus statement that an FRCA / FFICM candidate would be expected to know. topic_quote = the related current passage (may be empty if topic is silent). source_quote = the recent recommendation.
- missing  — a brand-new entity (new drug class, new device, new technique, new pathway) introduced into UK practice within the last ~3 years and clearly within scope is entirely absent. topic_quote = empty string; details MUST name the entity + year + sponsoring body.

Hard rules (violations are discarded):
1. Every finding must name BOTH the old reference (where applicable) AND the new one, each with year. Generic "this is outdated" without a specific newer source is rejected.
2. source_quote must be verbatim from one of the supplied recent reference excerpts. If you cannot quote a recent source, do NOT raise the finding.
3. The newer source must be ≤4 years old at time of writing. Older "updates" belong in the coverage pass, not here.
4. NEVER re-raise a finding from the FALSE POSITIVES list.
5. NEVER duplicate an already-open finding on the same passage.
6. Do NOT raise pure-accuracy findings (wrong fact unrelated to a guideline change) — separate pass handles those.
7. Quality over quantity: 0–3 specific, dated, sourced findings. An empty array IS the right answer when nothing on the page is genuinely stale.

Severity:
- critical — patient-safety: superseded resus / airway / dose recommendation still on the page
- major    — examined recommendation that has clearly moved on (e.g. NAP7 implications, NICE NG update, RCoA consensus)
- minor    — nomenclature / drug-class change, new guideline that supplements but does not contradict
- info     — nice-to-mention recent publication

Return ONLY the tool call.`;

// Back-compat alias (used by older code paths).
const TEXT_SYSTEM = ACCURACY_SYSTEM;


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
  coverage_findings?: number;
  freshness_findings?: number;
  freshness_refs_count?: number;
  diagram_findings: number;
  diagram_label_findings: number;
  svg_count: number;
  text_error?: string;
  coverage_error?: string;
  freshness_error?: string;
  diagram_error?: string;
  diagram_label_error?: string;

  scrape_error?: string;
  scrape_diagnostics?: ScrapeDiagnostics;
  scrape_last_status?: number;
  scrape_retry_count?: number;
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
  let scrapeDiagnostics: ScrapeDiagnostics | undefined;
  try {
    const result = await firecrawlScrape(
      topic.url,
      true,
      Math.min(90_000, Math.max(20_000, remainingBudget() - 25_000)),
    );
    page = result.data;
    scrapeDiagnostics = result.diagnostics;
  } catch (e) {
    stages.scrape_error = (e as Error).message;
  }
  const pageMarkdown: string = page?.markdown ?? "";
  const pageHtml: string = page?.html ?? page?.rawHtml ?? "";
  const screenshot: string | undefined = page?.screenshot;
  stages.page_chars = pageMarkdown.length;
  stages.screenshot = Boolean(screenshot);
  stages.scrape_ok = pageMarkdown.length >= 200;
  if (scrapeDiagnostics) {
    stages.scrape_diagnostics = scrapeDiagnostics;
    stages.scrape_last_status = scrapeDiagnostics.last_status;
    stages.scrape_retry_count = scrapeDiagnostics.retry_count;
    if (!stages.scrape_ok && !stages.scrape_error) {
      stages.scrape_error = scrapeDiagnostics.last_error
        ?? `last_status=${scrapeDiagnostics.last_status}`;
    }
    // Always log a one-line summary so failures are visible in edge logs even
    // when the job row diagnostics are not surfaced in the UI yet.
    console.log(
      `[audit-topics] scrape ${topic.id} url=${scrapeDiagnostics.primary_url} ` +
      `ok=${stages.scrape_ok} chars=${pageMarkdown.length} ` +
      `attempts=${scrapeDiagnostics.attempts.length} ` +
      `retries=${scrapeDiagnostics.retry_count} ` +
      `last_status=${scrapeDiagnostics.last_status} ` +
      `duration=${scrapeDiagnostics.total_duration_ms}ms` +
      (scrapeDiagnostics.last_error ? ` last_error="${scrapeDiagnostics.last_error}"` : ""),
    );
  }

  if (!pageMarkdown || pageMarkdown.length < 200) {
    const diagLines = scrapeDiagnostics
      ? [
          `Primary URL: ${scrapeDiagnostics.primary_url}`,
          scrapeDiagnostics.final_url && scrapeDiagnostics.final_url !== scrapeDiagnostics.primary_url
            ? `Final URL tried: ${scrapeDiagnostics.final_url}`
            : null,
          `Last HTTP status: ${scrapeDiagnostics.last_status}`,
          `Attempts: ${scrapeDiagnostics.attempts.length} (retries: ${scrapeDiagnostics.retry_count})`,
          `Total duration: ${scrapeDiagnostics.total_duration_ms}ms`,
          scrapeDiagnostics.last_error ? `Last error: ${scrapeDiagnostics.last_error}` : null,
          "Per-attempt breakdown:",
          ...scrapeDiagnostics.attempts.map((a) =>
            `  • attempt ${a.attempt}${a.url ? ` ${a.url}` : ""} → status=${a.status} ${a.ok ? "ok" : "fail"} (${a.duration_ms}ms)` +
            (a.error ? ` — ${a.error}` : ""),
          ),
        ].filter(Boolean).join("\n")
      : `No diagnostics available. Error: ${stages.scrape_error ?? "unknown"}`;

    const f = {
      severity: "major",
      category: "missing",
      summary: "Topic page could not be retrieved for audit",
      details: `Firecrawl returned no usable content for ${topic.url}.\n\n${diagLines}`,
      sources: [{ title: "Topic URL", url: topic.url }],
    };
    return { findings: [f], stages };
  }


  // 2. Search reputable sources (BJA Education first + a coverage-oriented query)
  const queryBJA = `site:bjaeducation.org ${topic.title}`;
  const queryGeneral = `${topic.title} anaesthesia UK guideline ${
    SOURCE_DOMAINS.slice(0, 3)
      .map((d) => `site:${d}`)
      .join(" OR ")
  }`;
  // A separate query aimed at table-of-contents / "what should this topic
  // cover" results — feeds the COVERAGE pass with structural depth.
  const queryCoverage = `${topic.title} FRCA exam syllabus BJA Education review`;

  const [bjaResults, generalResults, coverageResults] = hasBudget(40_000)
    ? await Promise.all([
        firecrawlSearch(queryBJA, 2, 12_000),
        firecrawlSearch(queryGeneral, 2, 12_000),
        firecrawlSearch(queryCoverage, 2, 12_000),
      ])
    : [[], [], []];

  const refs = [...bjaResults, ...generalResults, ...coverageResults]
    .filter((r) => r?.url && r?.markdown)
    // dedupe by url
    .filter((r, i, arr) => arr.findIndex((x) => x.url === r.url) === i)
    .slice(0, 6)
    .map((r) => ({
      title: r.title ?? r.metadata?.title ?? r.url,
      url: r.url,
      excerpt: String(r.markdown).slice(0, 3500),
    }));
  stages.refs_count = refs.length;
  stages.ref_titles = refs.map((r) => String(r.title).slice(0, 120));

  // 2b. Fetch prior findings for this topic so the model doesn't re-raise
  // confirmed false positives or already-open items. We pull both:
  //   - status='fixed' rows with an unverifiable_reason (= human-confirmed FP)
  //   - status='open' rows (so the model knows what's already on the list)
  let priorFalsePositives: Array<{ summary: string; reason: string; category: string }> = [];
  let priorOpen: Array<{ summary: string; category: string; in_topic_section: string | null }> = [];
  try {
    const { data: priors } = await supa
      .from("topic_audit_findings")
      .select("summary, category, status, unverifiable_reason, in_topic_section")
      .eq("topic_id", topic.id)
      .in("status", ["open", "fixed"])
      .order("created_at", { ascending: false })
      .limit(60);
    for (const p of priors ?? []) {
      if (p.status === "fixed" && p.unverifiable_reason) {
        priorFalsePositives.push({
          summary: String(p.summary ?? "").slice(0, 200),
          reason: String(p.unverifiable_reason ?? "").slice(0, 250),
          category: String(p.category ?? ""),
        });
      } else if (p.status === "open") {
        priorOpen.push({
          summary: String(p.summary ?? "").slice(0, 200),
          category: String(p.category ?? ""),
          in_topic_section: p.in_topic_section,
        });
      }
    }
  } catch (e) {
    console.warn(`[audit-topics] could not load prior findings for ${topic.id}: ${(e as Error).message}`);
  }

  const priorContextBlock = [
    "=== PREVIOUSLY-RAISED FINDINGS (do not duplicate) ===",
    priorFalsePositives.length === 0
      ? "Confirmed FALSE POSITIVES: (none)"
      : "Confirmed FALSE POSITIVES — these were reviewed by a human and dismissed; NEVER raise again:\n" +
        priorFalsePositives
          .slice(0, 20)
          .map((p, i) => `  ${i + 1}. [${p.category}] ${p.summary} — dismissed because: ${p.reason}`)
          .join("\n"),
    "",
    priorOpen.length === 0
      ? "Currently OPEN findings: (none)"
      : "Currently OPEN findings — skip if still valid, the dashboard already shows them:\n" +
        priorOpen
          .slice(0, 30)
          .map((p, i) => `  ${i + 1}. [${p.category}${p.in_topic_section ? " / " + p.in_topic_section : ""}] ${p.summary}`)
          .join("\n"),
  ].join("\n");

  // Larger content window — coverage pass particularly needs it.
  const pageExcerpt = pageMarkdown.slice(0, 20000);

  const refsBlock = refs.length === 0
    ? "(no reference excerpts retrieved — for accuracy pass, do not raise findings without a source quote; for coverage pass, name the specific BJA Educ / RCoA / NICE document by title + year inside details)"
    : refs
        .map((r, i) => `--- Reference ${i + 1}: ${r.title}\n${r.url}\n${r.excerpt}`)
        .join("\n\n");

  // 3a. ACCURACY pass
  try {
    const accuracyFindings = await callAI({
      system: ACCURACY_SYSTEM,
      userText: [
        `Topic: ${topic.title}`,
        `Section: ${topic.section}`,
        `URL: ${topic.url}`,
        `Stated scope: ${topic.description || "(none)"}`,
        "",
        "FOCUS: accuracy only. Every finding needs a verbatim topic_quote AND source_quote.",
        "",
        priorContextBlock,
        "",
        "=== CURRENT TOPIC CONTENT (markdown) ===",
        pageExcerpt,
        "",
        "=== AUTHORITATIVE REFERENCES ===",
        refsBlock,
      ].join("\n"),
      timeoutMs: Math.min(28_000, Math.max(10_000, Math.floor((remainingBudget() - 40_000) * 0.5))),
    });
    stages.text_findings = accuracyFindings.length;
    all.push(...accuracyFindings);
  } catch (e) {
    stages.text_error = (e as Error).message;
    console.error(`accuracy audit error for ${topic.id}`, e);
  }

  // 3b. COVERAGE pass — separate call so coverage isn't crowded out by accuracy.
  if (hasBudget(20_000)) {
    try {
      const coverageFindings = await callAI({
        system: COVERAGE_SYSTEM,
        userText: [
          `Topic: ${topic.title}`,
          `Section: ${topic.section}`,
          `URL: ${topic.url}`,
          `Stated scope: ${topic.description || "(none)"}`,
          "",
          "FOCUS: coverage and depth only. You are EXPECTED to find at least one gap on most topics. Compare to what an FRCA/FFICM-grade BJA Education / RCoA treatment of this scope would contain.",
          "",
          priorContextBlock,
          "",
          "=== CURRENT TOPIC CONTENT (markdown) ===",
          pageExcerpt,
          "",
          "=== AUTHORITATIVE REFERENCES (depth/structure cues) ===",
          refsBlock,
        ].join("\n"),
        timeoutMs: Math.min(28_000, Math.max(10_000, Math.floor((remainingBudget() - 25_000) * 0.6))),
      });
      stages.coverage_findings = coverageFindings.length;
      // Force category to be a coverage one if the model strayed.
      for (const f of coverageFindings) {
        if (!["thin", "gap", "update"].includes(f.category)) {
          f.category = f.category === "missing" ? "gap" : "thin";
        }
      }
      all.push(...coverageFindings);
    } catch (e) {
      stages.coverage_error = (e as Error).message;
      console.error(`coverage audit error for ${topic.id}`, e);
    }
  }

  // 3c. FRESHNESS pass — recency-filtered search + dedicated LLM call.
  // Surfaces `outdated` / `update` / `missing` findings tied to named
  // guidelines published in the last ~3 years. Runs only when we still have
  // a comfortable budget; the section→guideline registry is included as a
  // prompt-hint so the model knows what to look for even when search is thin.
  if (hasBudget(28_000)) {
    try {
      // Time-filtered Firecrawl search (last year, last 3 years). Two narrow
      // queries beat one broad query for surfacing recent guideline PDFs.
      const freshQueryGuideline = `${topic.title} guideline update UK ${
        ["bjaeducation.org", "rcoa.ac.uk", "ficm.ac.uk", "nice.org.uk", "resus.org.uk", "ics.ac.uk"]
          .map((d) => `site:${d}`)
          .join(" OR ")
      }`;
      const freshQueryReview = `${topic.title} BJA Education review OR consensus statement`;

      const [g1, g2] = await Promise.all([
        firecrawlSearch(freshQueryGuideline, 3, 12_000, { tbs: "qdr:y3" }),
        firecrawlSearch(freshQueryReview, 2, 10_000, { tbs: "qdr:y3" }),
      ]);
      const recentRefs = [...g1, ...g2]
        .filter((r) => r?.url && r?.markdown)
        .filter((r, i, arr) => arr.findIndex((x) => x.url === r.url) === i)
        .slice(0, 5)
        .map((r) => ({
          title: r.title ?? r.metadata?.title ?? r.url,
          url: r.url,
          excerpt: String(r.markdown).slice(0, 3000),
        }));
      stages.freshness_refs_count = recentRefs.length;

      const recentBlock = recentRefs.length === 0
        ? "(no recent reference excerpts retrieved — only raise findings you can cite verbatim from a named ≤4y-old guideline; otherwise emit empty findings array)"
        : recentRefs
            .map((r, i) => `--- Recent Reference ${i + 1}: ${r.title}\n${r.url}\n${r.excerpt}`)
            .join("\n\n");

      const freshnessFindings = await callAI({
        system: FRESHNESS_SYSTEM,
        userText: [
          `Topic: ${topic.title}`,
          `Section: ${topic.section}`,
          `URL: ${topic.url}`,
          `Stated scope: ${topic.description || "(none)"}`,
          "",
          "FOCUS: content freshness only. Flag outdated content or missing recent (≤3 y) named guideline updates.",
          "",
          "=== SECTION FRESHNESS HINTS (prompt, not gospel — must still cite a recent source) ===",
          freshnessHintsFor(topic.section),
          "",
          priorContextBlock,
          "",
          "=== CURRENT TOPIC CONTENT (markdown) ===",
          pageExcerpt,
          "",
          "=== RECENT (last ~3 y) REFERENCES ===",
          recentBlock,
        ].join("\n"),
        timeoutMs: Math.min(28_000, Math.max(10_000, Math.floor((remainingBudget() - 25_000) * 0.5))),
      });
      stages.freshness_findings = freshnessFindings.length;
      // Force category to the freshness set if the model strayed.
      for (const f of freshnessFindings) {
        if (!["outdated", "update", "missing"].includes(f.category)) {
          f.category = "update";
        }
      }
      all.push(...freshnessFindings);
    } catch (e) {
      stages.freshness_error = (e as Error).message;
      console.error(`freshness audit error for ${topic.id}`, e);
    }
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
          "x-internal-token": SUPABASE_SERVICE_ROLE_KEY,
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
          // De-dupe against currently-open findings on the same topic so the
          // dashboard doesn't grow a fresh copy of an issue that's already there.
          const { data: existing } = await supa
            .from("topic_audit_findings")
            .select("summary, category, in_topic_section, status, unverifiable_reason")
            .eq("topic_id", topic.id)
            .in("status", ["open", "fixed"]);
          const norm = (s: string | null | undefined) =>
            String(s ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().slice(0, 120);
          const seenKeys = new Set<string>();
          const dismissedKeys = new Set<string>();
          for (const e of existing ?? []) {
            const k = `${e.category}|${norm(e.summary)}|${norm(e.in_topic_section)}`;
            if (e.status === "fixed" && e.unverifiable_reason) dismissedKeys.add(k);
            else if (e.status === "open") seenKeys.add(k);
          }

          // Build a structured, machine-parseable header block so downstream
          // fix-prompts can extract the verbatim quotes without DB migration.
          const buildDetails = (f: any) => {
            const header: string[] = [];
            if (f.confidence) header.push(`Confidence: ${f.confidence}`);
            if (f.exam_relevance) header.push(`Exam: ${f.exam_relevance}`);
            const meta = header.length ? `[${header.join(" · ")}]\n\n` : "";
            const topicQ = f.topic_quote && String(f.topic_quote).trim()
              ? `> Topic passage:\n> ${String(f.topic_quote).trim().replace(/\n/g, "\n> ").slice(0, 600)}\n\n`
              : "";
            const sourceQ = f.source_quote && String(f.source_quote).trim()
              ? `> Source evidence:\n> ${String(f.source_quote).trim().replace(/\n/g, "\n> ").slice(0, 800)}\n\n`
              : "";
            return `${meta}${topicQ}${sourceQ}${f.details ?? ""}`.trim();
          };

          const allRows = findings.map((f) => ({
            job_id: jobId,
            topic_id: topic.id,
            topic_title: topic.title,
            section: topic.section,
            topic_url: topic.url,
            severity: f.severity ?? "minor",
            category: f.category ?? "factual",
            summary: String(f.summary ?? "").slice(0, 500),
            details: buildDetails(f),
            suggested_fix: f.suggested_fix ?? null,
            sources: f.sources ?? [],
            diagram_ref: f.diagram_ref ?? null,
            in_topic_section:
              typeof f.in_topic_section === "string" && f.in_topic_section.trim()
                ? f.in_topic_section.trim().slice(0, 200)
                : null,
            _key: `${f.category ?? "factual"}|${norm(f.summary)}|${norm(f.in_topic_section)}`,
          }));

          // Skip rows that exactly match an already-open or human-dismissed finding.
          const rows = allRows.filter((r) => {
            if (seenKeys.has(r._key) || dismissedKeys.has(r._key)) return false;
            return true;
          }).map(({ _key, ...row }) => row);

          const skipped = allRows.length - rows.length;
          if (skipped > 0) {
            console.log(`[audit-topics] ${topic.id}: skipped ${skipped} duplicate/dismissed findings`);
            logStages.deduped = skipped;
          }

          if (rows.length > 0) {
            const { error } = await supa
              .from("topic_audit_findings")
              .insert(rows);
            if (error) throw error;
            findingsCount += rows.length;
            topicFindingsCount = rows.length;
          }
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

    // Authorise: either an internal token (self-chain / cron) or an admin JWT.
    const internalToken = req.headers.get("x-internal-token");
    const isInternal =
      !!internalToken && internalToken === SUPABASE_SERVICE_ROLE_KEY;

    if (!isInternal) {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(
          JSON.stringify({ error: "Unauthorized" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const userClient = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_ANON_KEY")!);
      const token = authHeader.replace(/^Bearer\s+/i, "");
      const { data: claimsData, error: userErr } = await userClient.auth.getClaims(token);
      if (userErr || !claimsData?.claims?.sub) {
        return new Response(
          JSON.stringify({ error: "Invalid token" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const userId = claimsData.claims.sub as string;
      const { data: roleRow } = await supa
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (!roleRow) {
        return new Response(
          JSON.stringify({ error: "Admin only" }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
    }


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
