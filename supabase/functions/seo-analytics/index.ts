// SEO analytics for admin dashboard: pulls Google Search Console metrics
// (clicks, impressions, CTR, average position) for the site, plus top
// queries, top pages, and daily trend over a configurable window.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_search_console'
const SITE_URL = 'https://anaesthesiacore.app/'

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

import { createClient } from 'npm:@supabase/supabase-js@2'

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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const guard = await requireAdmin(req)
  if (guard instanceof Response) return guard

  try {
    let days = 28
    try {
      const body = req.method === 'POST' ? await req.json() : null
      if (body && typeof body.days === 'number' && body.days > 0 && body.days <= 90) {
        days = Math.floor(body.days)
      }
    } catch { /* default */ }

    const siteEnc = encodeURIComponent(SITE_URL)
    // GSC data lags ~2 days; end window 2 days ago for stable numbers.
    const end = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    const start = new Date(end.getTime() - (days - 1) * 24 * 60 * 60 * 1000)
    const startStr = fmtDate(start)
    const endStr = fmtDate(end)

    const query = (extra: Record<string, unknown>) =>
      gscFetch(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
        method: 'POST',
        body: JSON.stringify({ startDate: startStr, endDate: endStr, ...extra }),
      }).catch((e) => ({ error: String(e) }))

    const [totals, byDate, topQueries, topPages, topCountries, byDevice] = await Promise.all([
      query({ dimensions: [] }),
      query({ dimensions: ['date'], rowLimit: days }),
      query({ dimensions: ['query'], rowLimit: 25 }),
      query({ dimensions: ['page'], rowLimit: 15 }),
      query({ dimensions: ['country'], rowLimit: 10 }),
      query({ dimensions: ['device'] }),
    ])

    return new Response(
      JSON.stringify({
        site: SITE_URL,
        range: { startDate: startStr, endDate: endStr, days },
        totals,
        byDate,
        topQueries,
        topPages,
        topCountries,
        byDevice,
        fetchedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('seo-analytics error:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
