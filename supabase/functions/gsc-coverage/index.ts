// Coverage breakdown: calls Google Search Console URL Inspection API for a
// batch of URLs taken from the project's sitemap index. Admin-only.
//
// Response shape:
// {
//   site, fetchedAt,
//   total: <urls discovered in sitemap>,
//   inspected: <count actually inspected this call>,
//   limit, offset,
//   results: [{ url, verdict, coverageState, indexingState, robotsTxtState,
//               pageFetchState, lastCrawlTime, googleCanonical, userCanonical,
//               error? }]
// }

import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_search_console'
const SITE_URL = 'https://anaesthesiacore.app/'
const SITEMAP_URL = 'https://anaesthesiacore.app/sitemap.xml'

async function gscFetch(path: string, init?: RequestInit) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
  const GSC_KEY = Deno.env.get('GOOGLE_SEARCH_CONSOLE_API_KEY')
  if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured')
  if (!GSC_KEY) throw new Error('GOOGLE_SEARCH_CONSOLE_API_KEY is not configured')
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': GSC_KEY,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  })
  const text = await res.text()
  let body: unknown = text
  try { body = text ? JSON.parse(text) : null } catch { /* keep text */ }
  if (!res.ok) {
    throw new Error(`GSC ${path} failed [${res.status}]: ${typeof body === 'string' ? body : JSON.stringify(body)}`)
  }
  return body as any
}

async function requireAdmin(req: Request): Promise<Response | { userId: string }> {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  const token = authHeader.replace('Bearer ', '')
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } },
  )
  const { data, error } = await supabase.auth.getClaims(token)
  if (error || !data?.claims?.sub) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  const userId = data.claims.sub as string
  const { data: isAdmin, error: roleErr } = await supabase.rpc('has_role', {
    _user_id: userId, _role: 'admin',
  })
  if (roleErr || !isAdmin) {
    return new Response(JSON.stringify({ error: 'Forbidden — admin role required' }), {
      status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  return { userId }
}

// Pull all <loc> values out of an XML document.
function extractLocs(xml: string): string[] {
  const out: string[] = []
  const re = /<loc>([^<]+)<\/loc>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(xml)) !== null) out.push(m[1].trim())
  return out
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { 'user-agent': 'AnaesthesiaCore-Coverage/1.0' } })
  if (!res.ok) throw new Error(`Fetch ${url} failed: ${res.status}`)
  return await res.text()
}

async function collectSitemapUrls(): Promise<string[]> {
  const indexXml = await fetchText(SITEMAP_URL)
  const childSitemaps = extractLocs(indexXml).filter((u) => u.endsWith('.xml'))
  // If sitemap.xml is itself a flat urlset (no child sitemaps), use its locs.
  if (childSitemaps.length === 0) return extractLocs(indexXml)
  const all: string[] = []
  for (const child of childSitemaps) {
    try {
      const xml = await fetchText(child)
      for (const u of extractLocs(xml)) all.push(u)
    } catch (e) {
      console.warn('skip sitemap', child, String(e))
    }
  }
  // De-dupe, stable order.
  return Array.from(new Set(all))
}

async function inspectUrl(url: string) {
  try {
    const body = await gscFetch('/v1/urlInspection/index:inspect', {
      method: 'POST',
      body: JSON.stringify({
        inspectionUrl: url,
        siteUrl: SITE_URL,
        languageCode: 'en-GB',
      }),
    })
    const r = body?.inspectionResult?.indexStatusResult ?? {}
    return {
      url,
      verdict: r.verdict ?? null,
      coverageState: r.coverageState ?? null,
      indexingState: r.indexingState ?? null,
      robotsTxtState: r.robotsTxtState ?? null,
      pageFetchState: r.pageFetchState ?? null,
      lastCrawlTime: r.lastCrawlTime ?? null,
      googleCanonical: r.googleCanonical ?? null,
      userCanonical: r.userCanonical ?? null,
    }
  } catch (e) {
    return { url, error: String(e instanceof Error ? e.message : e) }
  }
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let i = 0
  async function worker() {
    while (true) {
      const idx = i++
      if (idx >= items.length) return
      results[idx] = await fn(items[idx])
    }
  }
  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker())
  await Promise.all(workers)
  return results
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const guard = await requireAdmin(req)
  if (guard instanceof Response) return guard

  try {
    const url = new URL(req.url)
    const limit = Math.min(50, Math.max(1, Number(url.searchParams.get('limit') ?? 25)))
    const offset = Math.max(0, Number(url.searchParams.get('offset') ?? 0))

    const all = await collectSitemapUrls()
    const slice = all.slice(offset, offset + limit)
    const results = await mapWithConcurrency(slice, 3, inspectUrl)

    return new Response(
      JSON.stringify({
        site: SITE_URL,
        sitemapUrl: SITEMAP_URL,
        total: all.length,
        inspected: results.length,
        limit,
        offset,
        results,
        fetchedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('gsc-coverage error:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
