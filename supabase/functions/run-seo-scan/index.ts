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

async function auditPage(url: string): Promise<PageAudit> {
  const t0 = performance.now();
  const findings: string[] = [];
  let status = 0;
  let html = "";
  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "user-agent": "AnaesthesiaCore-SEO-Scanner/1.0" },
    });
    status = res.status;
    html = await res.text();
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
  const { base_url, commit_sha, max_pages } = parsed.data;

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
  const concurrency = 6;
  for (let i = 0; i < limited.length; i += concurrency) {
    const batch = limited.slice(i, i + concurrency);
    const results = await Promise.all(batch.map(auditPage));
    audits.push(...results);
  }

  const titleMap = new Map<string, number>();
  const descMap = new Map<string, number>();
  const canonMap = new Map<string, number>();
  for (const a of audits) {
    if (a.title) titleMap.set(a.title, (titleMap.get(a.title) ?? 0) + 1);
    if (a.description) descMap.set(a.description, (descMap.get(a.description) ?? 0) + 1);
    if (a.canonical) canonMap.set(a.canonical, (canonMap.get(a.canonical) ?? 0) + 1);
  }
  for (const a of audits) {
    if (a.title && (titleMap.get(a.title) ?? 0) > 1) a.findings.push("duplicate_title");
    if (a.description && (descMap.get(a.description) ?? 0) > 1) a.findings.push("duplicate_description");
    if (a.canonical && (canonMap.get(a.canonical) ?? 0) > 1) a.findings.push("duplicate_canonical");
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
      results: { pages: audits, finding_totals: findingTotals, sitemap_size: urls.length },
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
