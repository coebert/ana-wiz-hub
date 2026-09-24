// Crawls a deployed site's sitemap.xml, audits each URL for SEO basics,
// and stores the result in `seo_scans`. Triggered post-publish from CI
// or on demand from the admin UI.

import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const ingestToken = Deno.env.get("LIGHTHOUSE_INGEST_TOKEN")!; // shared CI secret
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY"); // optional; required when rendered=true

const BodySchema = z.object({
  base_url: z.string().url(),
  commit_sha: z.string().max(64).optional().nullable(),
  max_pages: z.number().int().positive().max(200).optional().default(60),
  // When true, render each page with a headless browser (Firecrawl) so
  // client-side Helmet meta tags are visible. Slower + uses Firecrawl credits.
  rendered: z.boolean().optional().default(false),
});

interface PageAudit {
  url: string;
  status: number;
  response_ms: number;
  title: string | null;
  description: string | null;
  canonical: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_card: string | null;
  h1_count: number;
  robots_meta: string | null;
  byte_size: number;
  findings: string[];
}

const META_RE = (name: string, attr: "name" | "property") =>
  new RegExp(
    `<meta[^>]+${attr}=["']${name}["'][^>]*content=["']([^"']*)["']`,
    "i",
  );
const META_RE_REV = (name: string, attr: "name" | "property") =>
  new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]*${attr}=["']${name}["']`,
    "i",
  );

function pickMeta(html: string, name: string, attr: "name" | "property"): string | null {
  return (
    html.match(META_RE(name, attr))?.[1] ??
    html.match(META_RE_REV(name, attr))?.[1] ??
    null
  );
}

async function parseSitemap(baseUrl: string): Promise<string[]> {
  const res = await fetch(new URL("/sitemap.xml", baseUrl).toString());
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)).map((m) => m[1]);
  return [...new Set(urls)];
}

async function fetchStatic(url: string): Promise<{ status: number; html: string }> {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "AnaesthesiaCore-SEO-Scanner/1.0" },
  });
  return { status: res.status, html: await res.text() };
}

// Transient Firecrawl/HTTP statuses worth retrying. 408 (request timeout) is
// the dominant failure mode for cold-render scrapes of large SPA pages.
const RENDERED_RETRYABLE = new Set([408, 425, 429, 500, 502, 503, 504]);

function renderedBackoffMs(attempt: number, status: number) {
  const base = Math.min(8000, 1000 * Math.pow(2, attempt));
  const jittered = Math.round(base * (0.7 + Math.random() * 0.6));
  return status === 408 ? jittered + 1500 : jittered;
}

async function fetchRendered(url: string): Promise<{ status: number; html: string }> {
  // Firecrawl v2 scrape — returns the post-JS HTML so client-side Helmet
  // meta tags are present. Retries on transient 408/429/5xx with growing
  // per-attempt timeouts so a cold upstream render doesn't fail the scan.
  const maxAttempts = 4;
  let lastStatus = 0;
  let lastError = "";
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Per-attempt timeout grows: 30s → 45s → 60s → 75s.
    const attemptTimeoutMs = 30_000 + attempt * 15_000;
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), attemptTimeoutMs);
    try {
      const res = await fetch("https://api.firecrawl.dev/v2/scrape", {
        method: "POST",
        signal: ac.signal,
        headers: {
          Authorization: `Bearer ${firecrawlKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          formats: ["rawHtml"],
          onlyMainContent: false,
          waitFor: 2000 + attempt * 500,
          // Tell Firecrawl itself how long it may spend before returning 408,
          // leaving a 3s buffer for response transit.
          timeout: Math.max(15_000, attemptTimeoutMs - 3_000),
          storeInCache: false,
          blockAds: true,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        lastStatus = res.status;
        lastError = `firecrawl_${res.status}: ${text.slice(0, 200)}`;
        if (RENDERED_RETRYABLE.has(res.status) && attempt < maxAttempts - 1) {
          const delay = renderedBackoffMs(attempt, res.status);
          console.warn(
            `[run-seo-scan] rendered scrape ${url} status=${res.status} ` +
            `attempt=${attempt + 1}/${maxAttempts} — retrying in ${delay}ms`,
          );
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }
        throw new Error(lastError);
      }
      const data = await res.json();
      const root = data?.data ?? data;
      const html: string = root?.rawHtml ?? root?.html ?? "";
      const status: number = root?.metadata?.statusCode ?? 200;
      return { status, html };
    } catch (e) {
      lastError = (e as Error).message;
      const aborted = (e as Error).name === "AbortError";
      // AbortError ≈ client-side 408 — treat as retryable.
      const retryable = aborted || RENDERED_RETRYABLE.has(lastStatus);
      if (retryable && attempt < maxAttempts - 1) {
        const delay = renderedBackoffMs(attempt, aborted ? 408 : lastStatus);
        console.warn(
          `[run-seo-scan] rendered scrape ${url} error="${lastError}" ` +
          `attempt=${attempt + 1}/${maxAttempts} — retrying in ${delay}ms`,
        );
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw e;
    } finally {
      clearTimeout(t);
    }
  }
  throw new Error(lastError || "rendered scrape failed after retries");
}

async function auditPage(url: string, rendered: boolean): Promise<PageAudit> {
  const t0 = performance.now();
  const findings: string[] = [];
  let status = 0;
  let html = "";
  try {
    const result = rendered ? await fetchRendered(url) : await fetchStatic(url);
    status = result.status;
    html = result.html;
  } catch (e) {
    return {
      url,
      status: 0,
      response_ms: Math.round(performance.now() - t0),
      title: null,
      description: null,
      canonical: null,
      og_title: null,
      og_description: null,
      og_image: null,
      twitter_card: null,
      h1_count: 0,
      robots_meta: null,
      byte_size: 0,
      findings: [`fetch_failed: ${(e as Error).message}`],
    };
  }
  const response_ms = Math.round(performance.now() - t0);

  if (status >= 400) findings.push(`http_${status}`);

  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? null;
  const description = pickMeta(html, "description", "name");
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1]
    ?? null;
  const og_title = pickMeta(html, "og:title", "property");
  const og_description = pickMeta(html, "og:description", "property");
  const og_image = pickMeta(html, "og:image", "property");
  const twitter_card = pickMeta(html, "twitter:card", "name");
  const robots_meta = pickMeta(html, "robots", "name");
  const h1_count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const byte_size = html.length;

  if (!title) findings.push("missing_title");
  else if (title.length < 10) findings.push("title_too_short");
  else if (title.length > 60) findings.push("title_too_long");

  if (!description) findings.push("missing_description");
  else if (description.length < 50) findings.push("description_too_short");
  else if (description.length > 160) findings.push("description_too_long");

  if (!canonical) findings.push("missing_canonical");
  if (!og_title) findings.push("missing_og_title");
  if (!og_description) findings.push("missing_og_description");
  if (!og_image) findings.push("missing_og_image");
  if (!twitter_card) findings.push("missing_twitter_card");

  if (h1_count === 0) findings.push("missing_h1");
  else if (h1_count > 1) findings.push("multiple_h1");

  if (robots_meta && /noindex/i.test(robots_meta)) findings.push("noindex_meta");

  return {
    url,
    status,
    response_ms,
    title,
    description,
    canonical,
    og_title,
    og_description,
    og_image,
    twitter_card,
    h1_count,
    robots_meta,
    byte_size,
    findings,
  };
}

async function authorize(req: Request): Promise<{ ok: boolean; reason?: string }> {
  // Path A: shared CI token (used by GH Actions)
  const shared = req.headers.get("x-seo-scan-token");
  if (shared && ingestToken && shared === ingestToken) return { ok: true };

  // Path B: signed-in admin (used by the dashboard "Run scan now" button)
  const authHeader = req.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.replace("Bearer ", "");
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false },
    });
    const { data, error } = await userClient.auth.getClaims(token);
    if (!error && data?.claims?.sub) {
      const admin = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false } });
      const { data: roleRow } = await admin
        .from("user_roles")
        .select("role")
        .eq("user_id", data.claims.sub)
        .eq("role", "admin")
        .maybeSingle();
      if (roleRow) return { ok: true };
      return { ok: false, reason: "Not an admin" };
    }
  }

  return { ok: false, reason: "Missing or invalid credentials" };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const auth = await authorize(req);
  if (!auth.ok) {
    return new Response(JSON.stringify({ error: auth.reason ?? "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Validation failed", details: parsed.error.flatten() }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
  const { base_url, commit_sha, max_pages, rendered } = parsed.data;
  const ALLOWED_SCAN_HOSTS = new Set(["anaesthesiacore.app", "www.anaesthesiacore.app", "ana-wiz-hub.lovable.app"]);
  let scanHost = "";
  try {
    const u = new URL(base_url);
    scanHost = u.protocol === "https:" ? u.hostname : "";
  } catch { /* invalid */ }
  if (!ALLOWED_SCAN_HOSTS.has(scanHost)) {
    return new Response(JSON.stringify({ error: "base_url must be an AnaesthesiaCore site" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (rendered && !firecrawlKey) {
    return new Response(
      JSON.stringify({
        error:
          "Rendered scan requested but FIRECRAWL_API_KEY is not configured. Connect Firecrawl in Connectors and retry.",
      }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  const t0 = performance.now();
  let urls: string[];
  try {
    urls = await parseSitemap(base_url);
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (urls.length === 0) {
    return new Response(JSON.stringify({ error: "Sitemap is empty" }), {
      status: 422,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const limited = urls.slice(0, max_pages);

  // Cross-page checks: duplicate titles / descriptions / canonicals
  const audits: PageAudit[] = [];
  // Headless rendering is much slower and uses Firecrawl credits, so cap at 3.
  const concurrency = rendered ? 3 : 6;
  for (let i = 0; i < limited.length; i += concurrency) {
    const batch = limited.slice(i, i + concurrency);
    const results = await Promise.all(batch.map((u) => auditPage(u, rendered)));
    audits.push(...results);
  }

  // Normalize text for duplicate detection: collapse whitespace, lowercase, strip
  // trailing punctuation. Avoids flagging trivial differences like extra spaces or
  // capitalization as meaningful duplicates.
  const normText = (s: string | undefined | null): string => {
    if (!s) return "";
    return s
      .replace(/\s+/g, " ")
      .trim()
      .replace(/[.\s]+$/g, "")
      .toLowerCase();
  };
  // Normalize URLs for canonical comparison: lowercase host, strip trailing slash,
  // drop hash, drop common tracking params, ignore default ports.
  const normUrl = (s: string | undefined | null): string => {
    if (!s) return "";
    try {
      const u = new URL(s);
      u.hash = "";
      u.hostname = u.hostname.toLowerCase();
      const drop = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "ref"];
      for (const k of drop) u.searchParams.delete(k);
      // Sort params for stable comparison
      const sorted = [...u.searchParams.entries()].sort(([a], [b]) => a.localeCompare(b));
      u.search = "";
      for (const [k, v] of sorted) u.searchParams.append(k, v);
      let out = u.toString();
      if (u.pathname !== "/" && out.endsWith("/")) out = out.slice(0, -1);
      return out.toLowerCase();
    } catch {
      return s.trim().toLowerCase().replace(/\/+$/, "");
    }
  };

  const titleMap = new Map<string, number>();
  const descMap = new Map<string, number>();
  const canonMap = new Map<string, number>();
  for (const a of audits) {
    const t = normText(a.title);
    const d = normText(a.description);
    const c = normUrl(a.canonical);
    if (t) titleMap.set(t, (titleMap.get(t) ?? 0) + 1);
    if (d) descMap.set(d, (descMap.get(d) ?? 0) + 1);
    if (c) canonMap.set(c, (canonMap.get(c) ?? 0) + 1);
  }
  for (const a of audits) {
    const t = normText(a.title);
    const d = normText(a.description);
    const c = normUrl(a.canonical);
    if (t && (titleMap.get(t) ?? 0) > 1) a.findings.push("duplicate_title");
    if (d && (descMap.get(d) ?? 0) > 1) a.findings.push("duplicate_description");
    if (c && (canonMap.get(c) ?? 0) > 1) a.findings.push("duplicate_canonical");
  }

  const pages_ok = audits.filter((a) => a.status >= 200 && a.status < 400).length;
  const pages_failed = audits.length - pages_ok;
  const findings_count = audits.reduce((sum, a) => sum + a.findings.length, 0);
  const duration_ms = Math.round(performance.now() - t0);

  // Aggregate finding counts for quick summary
  const findingTotals: Record<string, number> = {};
  for (const a of audits) {
    for (const f of a.findings) {
      const key = f.split(":")[0];
      findingTotals[key] = (findingTotals[key] ?? 0) + 1;
    }
  }

  const admin = createClient(supabaseUrl, serviceRole, { auth: { persistSession: false } });
  const { data, error } = await admin
    .from("seo_scans")
    .insert({
      base_url,
      commit_sha: commit_sha ?? null,
      pages_total: audits.length,
      pages_ok,
      pages_failed,
      findings_count,
      duration_ms,
      results: { pages: audits, finding_totals: findingTotals, sitemap_size: urls.length, rendered },
    })
    .select("id")
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      ok: true,
      id: data.id,
      pages_total: audits.length,
      pages_ok,
      pages_failed,
      findings_count,
      duration_ms,
      finding_totals: findingTotals,
    }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
