import { corsHeaders } from '@supabase/supabase-js/cors'

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'
const RECIPIENT = 'coebert@gmail.com'

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
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
