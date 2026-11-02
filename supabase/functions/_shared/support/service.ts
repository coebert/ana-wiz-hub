import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3';
import { canAccess, contactIdentity, persistThenNotify, verifiedSender, type Actor } from './rules.ts';
const adminEmail = 'coebert@gmail.com';
const site = 'https://anaesthesiacore.app';
const gateway = 'https://connector-gateway.lovable.dev/resend';
const text = (max: number) => z.string().trim().min(1).max(max);
export const feedbackSchema = z.object({ requestId: z.string().uuid().optional(), type: z.enum(['support','topic','error']), subject: text(120), message: text(2000), name: z.string().trim().max(100).optional(), replyEmail: z.union([z.string().trim().email().max(254), z.literal('')]).optional(), website: z.string().max(200).optional() });
const actionSchema = z.discriminatedUnion('action', [
 z.object({action:z.literal('reply'),ticketId:z.string().uuid(),requestId:z.string().uuid(),message:text(5000)}),
 z.object({action:z.literal('status'),ticketId:z.string().uuid(),requestId:z.string().uuid(),status:z.enum(['open','awaiting_user','resolved'])}),
 z.object({action:z.literal('capabilities')}),
]);
function json(data: unknown, status = 200) { return new Response(JSON.stringify(data), {status, headers:{...corsHeaders,'Content-Type':'application/json','Cache-Control':'no-store'}}); }
async function emailCapability() {
 const key = Deno.env.get('LOVABLE_API_KEY'); const connection = Deno.env.get('RESEND_API_KEY'); const from = Deno.env.get('SUPPORT_FROM_EMAIL') ?? '';
 if (!key || !connection || !from) return {ready:false, reason:'A verified support sender is not configured.', from};
 try {
  const response = await fetch(`${gateway}/domains`, {headers:{Authorization:`Bearer ${key}`,'X-Connection-Api-Key':connection}});
  const data = await response.json();
  return {ready:response.ok && verifiedSender(from, Array.isArray(data.data) ? data.data : []), reason:'Sender verification unavailable or domain not verified.',from};
 } catch { return {ready:false,reason:'Email service unavailable.',from}; }
}
async function notify(to: string | null, subject: string, body: string, replyTo: string | null, id: string) {
 if (!to) return {status:'unavailable',error:'No reply email was supplied. The conversation is saved in the app.'};
 const cap = await emailCapability();
 if (!cap.ready) return {status:'unavailable',error:cap.reason};
 const response = await fetch(`${gateway}/emails`, {method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,'X-Connection-Api-Key':Deno.env.get('RESEND_API_KEY') ?? '', 'Idempotency-Key':`support-${id}`},body:JSON.stringify({from:`AnaesthesiaCore <${cap.from}>`,to:[to],subject,text:body,...(replyTo ? {reply_to:replyTo} : {})})});
 if (!response.ok) return {status:'failed',error:'Email service did not accept this message. Use manual email; the message is saved.'};
 return {status:'sent'};
}
export async function handleSupport(req: Request, feedback = false) {
 if (req.method === 'OPTIONS') return new Response('ok',{headers:corsHeaders});
 if (req.method !== 'POST') return json({error:'Method not allowed'},405);
 try {
  const url = Deno.env.get('SUPABASE_URL'); const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !service) return json({error:'Support storage unavailable'},503);
  const db = createClient(url,service,{auth:{persistSession:false}});
  const token = (req.headers.get('Authorization') ?? '').replace(/^Bearer\s+/i,'');
  let actor: Actor | null = null;
  // The public anon API key is not a user identity. Invalid session tokens fail closed.
  if (token && token !== Deno.env.get('SUPABASE_ANON_KEY') && token !== req.headers.get('apikey')) {
   const {data,error} = await db.auth.getUser(token);
   if (error || !data.user) return json({error:'Please sign in again before submitting.'},401);
   const {data:role,error:roleError} = await db.rpc('has_role',{_user_id:data.user.id,_role:'admin'});
   if (roleError) return json({error:'Access verification unavailable'},503);
   actor = {id:data.user.id,email:data.user.email_confirmed_at ? data.user.email : undefined,name:typeof data.user.user_metadata?.full_name === 'string' ? data.user.user_metadata.full_name.slice(0,100) : undefined,admin:role === true};
  }
  const raw = await req.json();
  const parsed = (feedback ? feedbackSchema : actionSchema).safeParse(raw);
  if (!parsed.success) return json({error:'Invalid enquiry. Check the required fields and length limits.'},400);
  const record = async (id: string,status: string,error?: string) => {
   const {error:updateError} = await db.from('support_messages').update({delivery_status:status,delivery_error:error ?? null}).eq('id',id);
   if (updateError) throw updateError;
  };
  if (feedback) {
   const input = feedbackSchema.parse(raw);
   if (input.website?.trim()) return json({success:true});
   const identity = contactIdentity(actor,input);
   const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? req.headers.get('cf-connecting-ip') ?? 'unknown';
   const hashBytes = await crypto.subtle.digest('SHA-256',new TextEncoder().encode(`${service}:${actor?.id ?? ip}`));
   const hash = Array.from(new Uint8Array(hashBytes),b=>b.toString(16).padStart(2,'0')).join('');
   const saved = await persistThenNotify(async () => {
    const {data,error} = await db.rpc('create_support_enquiry',{_request_id:input.requestId ?? crypto.randomUUID(),_owner_id:identity.owner,_name:identity.name,_email:identity.email || null,_category:input.type,_subject:input.subject,_body:input.message,_submitter_hash:hash});
    if (error) throw error;
    return data;
   }, s => notify(adminEmail,`[User enquiry] ${input.subject}`,`${identity.name || 'Visitor'}\n${input.message}\n\nOpen privately: ${site}/admin/support/${s.ticket.id}`,identity.email || null,s.message.id),record);
   return json({success:true,ticketId:saved.ticket.id,duplicate:saved.duplicate,delivery:saved.delivery ?? {status:saved.message.delivery_status}});
  }
  if (!actor) return json({error:'Sign in required'},401);
  const input = actionSchema.parse(raw);
  if (input.action === 'capabilities') {
   if (!actor.admin) return json({error:'Access denied'},403);
   const cap = await emailCapability(); return json({ready:cap.ready,reason:cap.ready ? null : cap.reason});
  }
  const {data:ticket,error} = await db.from('support_tickets').select('*').eq('id',input.ticketId).maybeSingle();
  if (error) return json({error:'Support storage unavailable'},503);
  if (!ticket || !canAccess(actor,ticket.owner_id) || (input.action === 'status' && !actor.admin)) return json({error:'Enquiry unavailable'},403);
  const saved = await persistThenNotify(async () => {
   const {data,error:writeError} = await db.rpc('append_support_message',{_ticket_id:input.ticketId,_request_id:input.requestId,_actor_id:actor.id,_admin:actor.admin,_body:input.action === 'reply' ? input.message : '',_status:input.action === 'status' ? input.status : null});
   if (writeError) throw writeError; return data;
  }, s => input.action === 'status' ? Promise.resolve({status:'saved'}) : notify(actor.admin ? ticket.reply_email : adminEmail,`Re: ${ticket.subject}`,`${input.action === 'reply' ? input.message : ''}\n\n${actor.admin ? (ticket.owner_id ? `Your private conversation: ${site}/my-enquiries/${ticket.id}` : 'Reply to this email to contact the team. Email replies are not automatically imported into the app.') : `Open privately: ${site}/admin/support/${ticket.id}`}`,actor.admin ? adminEmail : ticket.reply_email,s.message.id),record);
  return json({success:true,duplicate:saved.duplicate,delivery:saved.delivery ?? {status:saved.message.delivery_status}});
 } catch (error) {
  const message = error instanceof Error ? error.message : String((error as {message?: string})?.message ?? '');
  return json({error:message.includes('Too many') ? 'Too many submissions. Please wait ten minutes.' : 'Could not save your enquiry. Retry with the same submission.'},message.includes('Too many') ? 429 : 500);
 }
}
