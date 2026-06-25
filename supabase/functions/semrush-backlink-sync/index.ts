/**
 * Pulls the current referring-domain list from Semrush for the project's
 * canonical site, applies spoof heuristics, and upserts new flagged
 * domains into `public.flagged_domains` with status = 'pending'.
 *
 * Heuristics (any match flags the domain):
 *   - Authority Score ≤ 5  (current spam farms all score 2/100)
 *   - TLD in .shop / .site / .xyz / .top / .click
 *   - Anchor text contains spam keywords (seo, fiverr, boost, revenue, $, 💰, etc.)
 *
 * Admin-only — gates on `has_role(auth.uid(), 'admin')`.
 */
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/semrush";
const TARGET = "anaesthesiacore.app";

// Per-run row budgets. Semrush bills ~10 API units per backlink/refdomain row;
// keep these conservative so a single run can't drain a low monthly quota.
const REFDOMAINS_LIMIT = 200;
const BACKLINKS_LIMIT = 100;
// Skip a call entirely if remaining monthly units would drop below this floor.
const MIN_UNITS_FLOOR = 500;

const SPAM_TLDS = new Set([".shop", ".site", ".xyz", ".top", ".click"]);
const SPAM_ANCHOR_RX = /\b(fiverr|seo|boost|revenue|ranking|traffic|backlink|authority)\b|💰|💵|💸|\$\d|\$\s?\d/i;
const AUTHORITY_THRESHOLD = 5;

async function getRemainingUnits(): Promise<number | null> {
  try {
    const data = await semrushFetch(`/user/limits`);
    const idx = Object.fromEntries(data.columnNames.map((c, i) => [c, i]));
    const row = data.rows[0] ?? [];
    // Common column names across Semrush plans
    const remainingCol = idx.api_units_remaining ?? idx.remaining ?? idx.units_left;
    if (remainingCol == null) return null;
    const n = Number(row[remainingCol]);
    return Number.isFinite(n) ? n : null;
  } catch (e) {
    console.warn("could not read /user/limits:", (e as Error).message);
    return null;
  }
}


async function semrushFetch(path: string): Promise<{ columnNames: string[]; rows: string[][] }> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const SEMRUSH_API_KEY = Deno.env.get("SEMRUSH_API_KEY");
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
  if (!SEMRUSH_API_KEY) throw new Error("SEMRUSH_API_KEY is not configured");

  const res = await fetch(`${GATEWAY_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": SEMRUSH_API_KEY,
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Semrush ${path} failed [${res.status}]: ${text}`);
  }
  const body = JSON.parse(text);
  if (body?.error) {
    throw new Error(`Semrush ${path} error: ${body.error}`);
  }
  return body.data ?? { columnNames: [], rows: [] };
}

function classify(domain: string, authorityScore: number | null, anchorSample: string | null): string[] {
  const reasons: string[] = [];
  if (authorityScore !== null && authorityScore <= AUTHORITY_THRESHOLD) {
    reasons.push(`authority score ${authorityScore} ≤ ${AUTHORITY_THRESHOLD}`);
  }
  const dotIdx = domain.lastIndexOf(".");
  const tld = dotIdx >= 0 ? domain.slice(dotIdx).toLowerCase() : "";
  if (SPAM_TLDS.has(tld)) reasons.push(`spam-prone TLD ${tld}`);
  if (anchorSample && SPAM_ANCHOR_RX.test(anchorSample)) {
    reasons.push("spam-keyword anchor text");
  }
  return reasons;
}

async function requireAdmin(req: Request): Promise<Response | { userId: string }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const token = authHeader.slice(7);
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );
  const { data, error } = await supabase.auth.getClaims(token);
  if (error || !data?.claims?.sub) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const userId = data.claims.sub as string;
  const { data: isAdmin, error: roleErr } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin",
  });
  if (roleErr || !isAdmin) {
    return new Response(JSON.stringify({ error: "Forbidden — admin role required" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  return { userId };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const guard = await requireAdmin(req);
  if (guard instanceof Response) return guard;

  try {
    // 0) Pre-flight: read remaining monthly API units so we can skip calls
    //    that would blow the quota instead of hitting ERROR 134 mid-run.
    const remainingUnits = await getRemainingUnits();
    const canAfford = (rows: number) =>
      remainingUnits == null ? true : remainingUnits - rows * 10 >= MIN_UNITS_FLOOR;

    // 1) Pull current referring domains (with authority score).
    if (!canAfford(REFDOMAINS_LIMIT)) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: `Semrush quota too low (${remainingUnits} units remaining) — skipping run to avoid TOTAL LIMIT EXCEEDED.`,
          remainingUnits,
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const refDomains = await semrushFetch(
      `/backlinks/backlinks_refdomains?target=${TARGET}&target_type=root_domain` +
        `&export_columns=domain,domain_ascore,backlinks_num,first_seen,last_seen&display_limit=${REFDOMAINS_LIMIT}`,
    );
    const refIdx = Object.fromEntries(refDomains.columnNames.map((c, i) => [c, i]));

    // 2) Pull individual backlinks so we can sample anchor text per source domain.
    //    Best-effort: skip if budget can't cover it, or if the live call still
    //    returns ERROR 134 (e.g. /user/limits wasn't available).
    const anchorByDomain = new Map<string, string>();
    let anchorEnrichmentSkipped: string | null = null;
    if (!canAfford(REFDOMAINS_LIMIT + BACKLINKS_LIMIT)) {
      anchorEnrichmentSkipped =
        `Skipped anchor-text enrichment to preserve Semrush quota (${remainingUnits} units remaining).`;
    } else {
      try {
        const backlinks = await semrushFetch(
          `/backlinks/backlinks?target=${TARGET}&target_type=root_domain` +
            `&export_columns=source_url,anchor,last_seen&display_limit=${BACKLINKS_LIMIT}`,
        );
        const blIdx = Object.fromEntries(backlinks.columnNames.map((c, i) => [c, i]));
        for (const row of backlinks.rows) {
          const sourceUrl = row[blIdx.source_url] ?? "";
          const anchor = row[blIdx.anchor] ?? "";
          try {
            const host = new URL(sourceUrl).hostname.replace(/^www\./, "");
            if (!anchorByDomain.has(host)) anchorByDomain.set(host, anchor);
          } catch { /* skip malformed urls */ }
        }
      } catch (err) {
        const msg = (err as Error).message;
        anchorEnrichmentSkipped = /TOTAL LIMIT EXCEEDED|ERROR 134/i.test(msg)
          ? "Semrush API quota exhausted — anchor-text enrichment skipped. Referring-domain scan still ran."
          : `Anchor-text enrichment skipped: ${msg}`;
        console.warn("anchor enrichment skipped:", msg);
      }
    }


    // 3) Apply heuristics, build upserts.
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const now = new Date().toISOString();
    const scanned: Array<{ domain: string; ascore: number; flagged: boolean; reasons: string[] }> = [];
    const upserts: Array<Record<string, unknown>> = [];

    for (const row of refDomains.rows) {
      const domain = (row[refIdx.domain] ?? "").toLowerCase();
      if (!domain) continue;
      const ascoreRaw = row[refIdx.domain_ascore];
      const ascore = ascoreRaw === "" || ascoreRaw == null ? null : Number(ascoreRaw);
      const anchorSample = anchorByDomain.get(domain) ?? null;
      const reasons = classify(domain, ascore, anchorSample);

      scanned.push({ domain, ascore: ascore ?? -1, flagged: reasons.length > 0, reasons });
      if (reasons.length === 0) continue;

      upserts.push({
        domain,
        status: "pending",
        source: "semrush",
        authority_score: ascore,
        anchor_text_sample: anchorSample,
        reason: reasons.join("; "),
        last_seen_at: now,
      });
    }

    // 4) Upsert — on conflict, refresh last_seen_at and metadata but do not
    // overwrite admin's status / notes if they've already triaged it.
    let inserted = 0;
    let refreshed = 0;
    if (upserts.length > 0) {
      // Fetch existing rows so we can report inserted vs refreshed counts.
      const { data: existing } = await admin
        .from("flagged_domains")
        .select("domain")
        .in("domain", upserts.map((u) => u.domain as string));
      const existingSet = new Set((existing ?? []).map((r) => r.domain));
      inserted = upserts.filter((u) => !existingSet.has(u.domain as string)).length;
      refreshed = upserts.length - inserted;

      // Upsert preserving existing status by only updating non-status fields.
      // We do two passes: insert new domains, then update last_seen_at for existing.
      const newRows = upserts.filter((u) => !existingSet.has(u.domain as string));
      if (newRows.length > 0) {
        const { error } = await admin.from("flagged_domains").insert(newRows);
        if (error) throw new Error(`Insert failed: ${error.message}`);
      }
      const refreshDomains = upserts
        .filter((u) => existingSet.has(u.domain as string))
        .map((u) => u.domain as string);
      if (refreshDomains.length > 0) {
        const { error } = await admin
          .from("flagged_domains")
          .update({ last_seen_at: now })
          .in("domain", refreshDomains);
        if (error) throw new Error(`Refresh failed: ${error.message}`);
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        scannedDomains: refDomains.rows.length,
        flaggedDomains: upserts.length,
        inserted,
        refreshed,
        scanned,
        remainingUnits,
        anchorEnrichmentSkipped,
        ranAt: now,
      }),

      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("semrush-backlink-sync error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
