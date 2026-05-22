import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

// Per-IP rate limit (in-memory, best-effort)
const RATE_LIMIT_MAX = 3
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

async function moderateWithAI(text: string): Promise<{ allowed: boolean; reason?: string }> {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
  if (!LOVABLE_API_KEY) {
    console.error('LOVABLE_API_KEY missing — defaulting to block')
    return { allowed: false, reason: 'Moderation unavailable' }
  }

  const resp = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash-lite',
      messages: [
        {
          role: 'system',
          content:
            'You are a strict content moderator for a medical education app review wall. Classify the user submission. Reject if it contains: profanity, expletives, slurs, racism, sexism, homophobia, threats, sexual content, harassment, doxxing, spam/advertising, or any clearly offensive language. Negative but civil criticism is ALLOWED. Respond ONLY with strict JSON: {"allowed": true} or {"allowed": false, "reason": "<short reason>"}. No prose.',
        },
        { role: 'user', content: text },
      ],
      temperature: 0,
    }),
  })

  if (resp.status === 429) return { allowed: false, reason: 'Moderation rate limit, try again shortly' }
  if (!resp.ok) {
    console.error('AI moderation failed', resp.status, await resp.text())
    return { allowed: false, reason: 'Moderation unavailable' }
  }

  const data = await resp.json()
  const content: string = data?.choices?.[0]?.message?.content ?? ''
  try {
    const cleaned = content.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(cleaned)
    if (parsed?.allowed === true) return { allowed: true }
    return { allowed: false, reason: typeof parsed?.reason === 'string' ? parsed.reason : 'Content flagged' }
  } catch {
    console.error('Could not parse moderation response:', content)
    return { allowed: false, reason: 'Content flagged' }
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const body = await req.json()

    // Honeypot
    if (String(body?.website ?? '').trim().length > 0) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const ip = getClientIp(req)
    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: 'Too many submissions. Please wait a few minutes.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const author_name = String(body?.author_name ?? '').trim().slice(0, 60)
    const comment = String(body?.comment ?? '').trim().slice(0, 1000)
    const ratingRaw = Number(body?.rating)
    const rating = Number.isFinite(ratingRaw) ? Math.round(ratingRaw) : NaN

    if (!author_name || author_name.length < 2) {
      return new Response(JSON.stringify({ error: 'Please enter a name (2+ characters).' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (!comment || comment.length < 3) {
      return new Response(JSON.stringify({ error: 'Please write a short review.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      return new Response(JSON.stringify({ error: 'Rating must be 0–5 stars.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Moderate both name and comment together
    const moderation = await moderateWithAI(`Name: ${author_name}\nReview: ${comment}`)
    if (!moderation.allowed) {
      return new Response(
        JSON.stringify({
          error:
            'Your review could not be posted because it appears to contain offensive language. Please revise and try again.',
          reason: moderation.reason,
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, serviceKey)

    const { data, error } = await supabase
      .from('reviews')
      .insert({ author_name, rating, comment, status: 'approved' })
      .select('id, author_name, rating, comment, created_at')
      .single()

    if (error) {
      console.error('insert error', error)
      return new Response(JSON.stringify({ error: 'Could not save review.' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, review: data }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('submit-review error', err)
    return new Response(JSON.stringify({ error: 'Unexpected error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
