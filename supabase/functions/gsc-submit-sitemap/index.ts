// Submits the canonical sitemap to Google Search Console via the
// google_search_console connector gateway, then re-reads its status so the
// caller (CI script) can report submitted/downloaded timestamps and any
// warnings/errors Google has for it.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_search_console'
const SITE_URL = 'https://anaesthesiacore.app/'
const SITEMAP_URL = 'https://anaesthesiacore.app/sitemap.xml'

async function gsc(path: string, init?: RequestInit) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
  const GSC_KEY = Deno.env.get('GOOGLE_SEARCH_CONSOLE_API_KEY')
  if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured')
  if (!GSC_KEY) throw new Error('GOOGLE_SEARCH_CONSOLE_API_KEY is not configured')
  const res = await fetch(`${GATEWAY_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': GSC_KEY,
      ...(init?.headers ?? {}),
    },
  })
  const text = await res.text()
  let body: unknown = text
  try { body = text ? JSON.parse(text) : null } catch { /* keep text */ }
  if (!res.ok) {
    throw new Error(
      `GSC ${init?.method ?? 'GET'} ${path} failed [${res.status}]: ${
        typeof body === 'string' ? body : JSON.stringify(body)
      }`,
    )
  }
  return body
}

import { createClient } from 'npm:@supabase/supabase-js@2'

/**
 * Authorize callers as either:
 *   - an authenticated admin user (dashboard usage), OR
 *   - a service-role JWT (CI deploy hook using SUPABASE_SERVICE_ROLE_KEY).
 */
async function authorize(req: Request): Promise<Response | null> {
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
  if (error || !data?.claims) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  const role = data.claims.role
  if (role === 'service_role') return null
  const sub = data.claims.sub as string | undefined
  if (!sub) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  const { data: isAdmin, error: roleErr } = await supabase.rpc('has_role', {
    _user_id: sub, _role: 'admin',
  })
  if (roleErr || !isAdmin) {
    return new Response(JSON.stringify({ error: 'Forbidden — admin role required' }), {
      status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
  return null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const denied = await authorize(req)
  if (denied) return denied

  const siteEnc = encodeURIComponent(SITE_URL)
  const sitemapEnc = encodeURIComponent(SITEMAP_URL)

  try {
    const submittedAt = new Date().toISOString()
    // PUT submits or refreshes the sitemap. 200/204 means accepted.
    await gsc(`/webmasters/v3/sites/${siteEnc}/sitemaps/${sitemapEnc}`, { method: 'PUT' })
    // Re-read status so CI can print warnings/errors.
    const status = await gsc(`/webmasters/v3/sites/${siteEnc}/sitemaps/${sitemapEnc}`)

    return new Response(
      JSON.stringify({ ok: true, site: SITE_URL, sitemapUrl: SITEMAP_URL, submittedAt, status }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('gsc-submit-sitemap error:', message)
    return new Response(
      JSON.stringify({ ok: false, site: SITE_URL, sitemapUrl: SITEMAP_URL, error: message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 },
    )
  }
})
