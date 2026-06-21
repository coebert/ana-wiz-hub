// Admin-only Google Search Console "searchAnalytics" reader.
//
// Returns clicks/impressions for the last N days (default 30), grouped by:
//   - date         → for the daily real-vs-spoof comparison
//   - page         → top landing URLs receiving genuine Google clicks
//   - query        → top search queries driving real Google clicks
//
// The site URL is the canonical project domain registered in Search Console.

import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_search_console'
const SITE_URL = 'https://anaesthesiacore.app/'

type Row = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number }

async function gscQuery(startDate: string, endDate: string, dimensions: string[], rowLimit = 100) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
  const GSC_KEY = Deno.env.get('GOOGLE_SEARCH_CONSOLE_API_KEY')
  if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured')
  if (!GSC_KEY) throw new Error('GOOGLE_SEARCH_CONSOLE_API_KEY is not configured')

  const encodedSite = encodeURIComponent(SITE_URL)
  const res = await fetch(
    `${GATEWAY_URL}/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': GSC_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ startDate, endDate, dimensions, rowLimit, dataState: 'all' }),
    },
  )
  const text = await res.text()
  if (!res.ok) {
    throw new Error(`GSC searchAnalytics failed [${res.status}]: ${text}`)
  }
  const body = text ? JSON.parse(text) : {}
  return (body.rows ?? []) as Row[]
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

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const guard = await requireAdmin(req)
  if (guard instanceof Response) return guard

  try {
    const url = new URL(req.url)
    const days = Math.min(90, Math.max(1, Number(url.searchParams.get('days') ?? 30)))
    const end = new Date()
    const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000)
    const fmt = (d: Date) => d.toISOString().slice(0, 10)
    const startDate = fmt(start)
    const endDate = fmt(end)

    const [byDate, byPage, byQuery] = await Promise.all([
      gscQuery(startDate, endDate, ['date'], 400),
      gscQuery(startDate, endDate, ['page'], 250),
      gscQuery(startDate, endDate, ['query'], 250),
    ])

    return new Response(
      JSON.stringify({
        site: SITE_URL,
        startDate,
        endDate,
        days,
        byDate: byDate.map((r) => ({
          date: r.keys[0],
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          position: r.position,
        })),
        byPage: byPage.map((r) => ({
          page: r.keys[0],
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          position: r.position,
        })),
        byQuery: byQuery.map((r) => ({
          query: r.keys[0],
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          position: r.position,
        })),
        fetchedAt: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('gsc-search-analytics error:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
