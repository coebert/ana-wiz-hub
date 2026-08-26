// Provisions a deterministic, pre-confirmed test account for the e2e suite.
//
// Hardening:
//   * Only e-mails in the reserved, non-routable domain `e2e.anaesthesiacore.test`
//     matching `e2e-<slug>@...` can ever be created or deleted here.
//   * Never touches, reads or returns data for any real user account.
//   * Best-effort per-IP rate limit.
// Anyone can already self-serve a normal signup, so the only extra capability
// exposed is bypassing e-mail confirmation for a throwaway reserved domain.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const EMAIL_RE = /^e2e-[a-z0-9-]{1,60}@e2e\.anaesthesiacore\.test$/

const RATE_LIMIT_MAX = 20
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const ipHits = new Map<string, number[]>()

function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('cf-connecting-ip') ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const recent = (ipHits.get(ip) ?? []).filter((t) => t > cutoff)
  if (recent.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, recent)
    return true
  }
  recent.push(now)
  ipHits.set(ip, recent)
  return false
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  if (isRateLimited(getClientIp(req))) return json({ error: 'Rate limited' }, 429)

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const adminHeaders = {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
  }

  let body: { email?: string; password?: string; action?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const email = (body.email ?? '').trim().toLowerCase()
  const password = body.password ?? ''
  const action =
    body.action === 'delete' || body.action === 'confirm' ? body.action : 'provision'

  if (!EMAIL_RE.test(email)) {
    return json({ error: 'Email must match e2e-<slug>@e2e.anaesthesiacore.test' }, 400)
  }
  if (action === 'provision' && password.length < 10) {
    return json({ error: 'Password must be at least 10 characters' }, 400)
  }

  // Look the user up (reserved domain only, enforced above).
  const listRes = await fetch(
    `${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=200&filter=${encodeURIComponent(email)}`,
    { headers: adminHeaders },
  )
  if (!listRes.ok) {
    return json({ error: 'Lookup failed', detail: await listRes.text() }, 500)
  }
  const listed = await listRes.json()
  const existing = (listed.users ?? []).find(
    (u: { id: string; email?: string }) => (u.email ?? '').toLowerCase() === email,
  )

  // Confirm an account that was just created through the normal signup UI,
  // so the e2e run doesn't need access to the confirmation e-mail.
  if (action === 'confirm') {
    if (!existing) return json({ error: 'No such test user', email }, 404)
    const patch: Record<string, unknown> = { email_confirm: true }
    if (password.length >= 10) patch.password = password
    const upRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${existing.id}`, {
      method: 'PUT',
      headers: adminHeaders,
      body: JSON.stringify(patch),
    })
    if (!upRes.ok) return json({ error: 'Confirm failed', detail: await upRes.text() }, 500)
    return json({ email, userId: existing.id, confirmed: true })
  }

  if (existing) {

    const delRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${existing.id}`, {
      method: 'DELETE',
      headers: adminHeaders,
    })
    if (!delRes.ok && delRes.status !== 404) {
      return json({ error: 'Delete failed', detail: await delRes.text() }, 500)
    }
  }

  if (action === 'delete') return json({ deleted: Boolean(existing), email })

  const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: adminHeaders,
    body: JSON.stringify({ email, password, email_confirm: true }),
  })
  if (!createRes.ok) {
    return json({ error: 'Create failed', detail: await createRes.text() }, 500)
  }
  const created = await createRes.json()
  return json({ email, userId: created.id, provisioned: true })
})
