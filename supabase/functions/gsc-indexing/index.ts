// Proxies Google Search Console for the indexing dashboard.
// Returns sitemap status, indexed page totals (last 28d), and crawl stats.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_search_console'
const SITE_URL = 'https://anaesthesiacore.app/'
const SITEMAP_URL = 'https://anaesthesiacore.app/sitemap.xml'

function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10)
}

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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const siteEnc = encodeURIComponent(SITE_URL)
    const sitemapEnc = encodeURIComponent(SITEMAP_URL)

    const end = new Date()
    const start = new Date(end.getTime() - 28 * 24 * 60 * 60 * 1000)
    const startStr = fmtDate(start)
    const endStr = fmtDate(end)

    const [sitemap, totals, byDate, topPages] = await Promise.all([
      gscFetch(`/webmasters/v3/sites/${siteEnc}/sitemaps/${sitemapEnc}`).catch((e) => ({ error: String(e) })),
      gscFetch(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
        method: 'POST',
        body: JSON.stringify({ startDate: startStr, endDate: endStr, dimensions: [] }),
      }).catch((e) => ({ error: String(e) })),
      gscFetch(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
        method: 'POST',
        body: JSON.stringify({ startDate: startStr, endDate: endStr, dimensions: ['date'], rowLimit: 28 }),
      }).catch((e) => ({ error: String(e) })),
      gscFetch(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
        method: 'POST',
        body: JSON.stringify({ startDate: startStr, endDate: endStr, dimensions: ['page'], rowLimit: 10 }),
      }).catch((e) => ({ error: String(e) })),
    ])

    return new Response(
      JSON.stringify({
        site: SITE_URL,
        sitemapUrl: SITEMAP_URL,
        range: { startDate: startStr, endDate: endStr },
        sitemap,
        totals,
        byDate,
        topPages,
        fetchedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('gsc-indexing error:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
