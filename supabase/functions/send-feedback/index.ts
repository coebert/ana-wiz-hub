const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'
const RECIPIENT = 'coebert@gmail.com'

// Per-IP rate limiting (in-memory, resets on cold start, per-instance only).
// Best-effort defence against casual spam, NOT a hardened control.
const RATE_LIMIT_MAX = 3 // max submissions
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // per 10 minutes
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
  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      const kept = v.filter((t) => t > cutoff)
      if (kept.length === 0) ipHits.delete(k)
      else ipHits.set(k, kept)
    }
  }
  return false
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured')
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured')

    const body = await req.json()

    // Honeypot: a hidden field real users never fill in. Bots scraping the
    // DOM will populate every input. If present and non-empty, silently
    // accept and discard — don't tell the bot it failed.
    const honeypot = String(body?.website ?? '').trim()
    if (honeypot.length > 0) {
      console.warn('Honeypot triggered, dropping submission')
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Per-IP rate limit
    const ip = getClientIp(req)
    if (isRateLimited(ip)) {
      console.warn('Rate limit hit for IP', ip)
      return new Response(
        JSON.stringify({
          error: 'Too many submissions. Please wait a few minutes and try again.',
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Retry-After': String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)),
          },
        },
      )
    }

    const type = body?.type === 'error' ? 'error' : 'topic'
    const subject = String(body?.subject ?? '').trim().slice(0, 200)
    const message = String(body?.message ?? '').trim().slice(0, 5000)

    if (!subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Subject and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const prefix = type === 'topic' ? '[Topic request]' : '[Possible error]'
    const mailSubject = `${prefix} ${subject}`
    const escape = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    const html = `
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#222;line-height:1.5">
        <p><strong>Type:</strong> ${type === 'topic' ? 'Topic request' : 'Possible error'}</p>
        <p><strong>Subject:</strong> ${escape(subject)}</p>
        <p style="color:#888;font-size:12px"><strong>From IP:</strong> ${escape(ip)}</p>
        <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
        <pre style="white-space:pre-wrap;font-family:Arial,sans-serif;margin:0">${escape(message)}</pre>
        <hr style="border:none;border-top:1px solid #ddd;margin:16px 0" />
        <p style="color:#888;font-size:12px">Sent from AnaesthesiaCore feedback form</p>
      </div>`

    const resp = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'AnaesthesiaCore <onboarding@resend.dev>',
        to: [RECIPIENT],
        subject: mailSubject,
        html,
        reply_to: RECIPIENT,
      }),
    })

    const data = await resp.json()
    if (!resp.ok) {
      console.error('Resend error', resp.status, data)
      return new Response(
        JSON.stringify({ error: 'Failed to send', details: data }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('send-feedback error', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
