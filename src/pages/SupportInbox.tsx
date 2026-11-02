import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { manualReply, replySchema } from '@/lib/support';
import type { Tables } from '@/integrations/supabase/types';
import InaccuracyReportsPanel from '@/components/admin/InaccuracyReportsPanel';
import { toast } from 'sonner';
type Ticket = Tables<'support_tickets'>;
type Message = Tables<'support_messages'>;
export default function SupportInbox({admin = false}: {admin?: boolean}) {
 const {user,loading:authLoading} = useAuth(); const {ticketId} = useParams(); const navigate = useNavigate();
 const [tickets,setTickets] = useState<Ticket[]>([]); const [messages,setMessages] = useState<Message[]>([]);
 const [search,setSearch] = useState(''); const [status,setStatus] = useState(admin ? 'open' : 'all');
 const [error,setError] = useState(''); const [loading,setLoading] = useState(false); const [busy,setBusy] = useState(false);
 const [reply,setReply] = useState(''); const [cap,setCap] = useState<{ready:boolean;reason?:string}>({ready:false});
 const [outstanding,setOutstanding] = useState<number | null>(null); const [clinical,setClinical] = useState(false);
 const lock = useRef(false); const pending = useRef<{key:string;id:string} | null>(null); const generation = useRef(0);
 const base = admin ? '/admin/support' : '/my-enquiries';
 const selected = tickets.find(t=>t.id===ticketId);
 async function load() {
  const epoch = ++generation.current;
  if (!user) {setTickets([]);setMessages([]);return;}
  setLoading(true);setError('');
  // Server/RLS determine access; client admin flags never authorise private data.
  let query = supabase.from('support_tickets').select('*').order('updated_at',{ascending:false});
  if(!admin) query=query.eq('owner_id',user.id);
  const {data,error:readError} = await query;
  if(epoch!==generation.current)return;
  if(readError){setError('Could not load enquiries. Please retry.');setTickets([]);setLoading(false);return;}
  setTickets(data ?? []); setOutstanding((data ?? []).filter(t=>t.status==='open').length);
  if(ticketId && data?.some(t=>t.id===ticketId)) {
   const result = await supabase.from('support_messages').select('*').eq('ticket_id',ticketId).order('created_at');
   if(epoch!==generation.current)return;
   setMessages(result.data ?? []); if(result.error)setError('Could not load conversation. Please retry.');
  } else setMessages([]);
  setLoading(false);
 }
 useEffect(()=>{setTickets([]);setMessages([]);setReply('');pending.current=null;void load();return ()=>{generation.current++;};},[user?.id,ticketId,admin]);
 useEffect(()=>{if(admin && user) supabase.functions.invoke('support-inbox',{body:{action:'capabilities'}}).then(({data,error})=>setCap(!error && data ? data : {ready:false,reason:'Email delivery unavailable.'}));},[admin,user?.id]);
 async function act(action:'reply'|'status',newStatus?:string) {
  if(lock.current || !selected)return;
  const parsed=replySchema.safeParse(reply); if(action==='reply' && !parsed.success){toast.error('Enter a reply of 1–5,000 characters.');return;}
  const key=`${selected.id}:${action}:${newStatus ?? parsed.data}`;
  if(pending.current?.key!==key)pending.current={key,id:crypto.randomUUID()};
  lock.current=true;setBusy(true);
  try {
   const {data,error:sendError}=await supabase.functions.invoke('support-inbox',{body:{action,ticketId:selected.id,requestId:pending.current.id,...(action==='reply'?{message:parsed.data}:{status:newStatus})}});
   if(sendError || data?.error)throw new Error('Could not save. Retry without changing the reply to avoid a duplicate.');
   toast.success(action==='status'?'Status saved':data.delivery?.status==='sent'?'Reply saved; email accepted by the sending service.':`Reply saved; email ${data.delivery?.status ?? 'not sent'}.`);
   if(action==='reply')setReply('');pending.current=null;await load();
  } catch(e){toast.error(e instanceof Error?e.message:'Could not save.');} finally{lock.current=false;setBusy(false);}
 }
 const filtered=tickets.filter(t=>(status==='all'||t.status===status)&&`${t.subject} ${t.contact_name} ${t.reply_email ?? ''}`.toLowerCase().includes(search.toLowerCase()));
 const fallback=selected?.reply_email ? manualReply(selected.reply_email,selected.subject,reply || [...messages].reverse().find(m=>m.author_kind==='admin')?.body || '') : null;
 if(authLoading)return <main className="pt-24 px-4">Checking access…</main>;
 if(!user)return <main className="max-w-3xl mx-auto pt-24 px-4"><h1 className="h1">My enquiries</h1><p className="my-4">Sign in to see your private conversations. Anonymous submissions are not attached to an account by email address.</p><Button asChild><Link to="/admin/login">Sign in</Link></Button></main>;
 return <main className="max-w-6xl mx-auto pt-24 pb-12 px-4 space-y-5">
  <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="h1">{admin?'User enquiries / Support inbox':'My enquiries'}</h1><Button asChild variant="outline"><Link to={admin?'/admin':'/#support'}>{admin?'Admin dashboard':'Contact the team'}</Link></Button></div>
  {admin && <><p className="text-sm text-muted-foreground">{outstanding ?? '—'} outstanding. Old email-only submissions cannot automatically appear here or gain a reply address. Email replies received outside the app are not imported.</p><Button variant="outline" className="min-h-11" onClick={()=>setClinical(!clinical)} aria-expanded={clinical}>Clinical inaccuracy reports</Button>{clinical && <section aria-label="Clinical inaccuracy reports"><InaccuracyReportsPanel /></section>}</>}
  <div className="flex flex-wrap gap-3"><div className="flex-1 min-w-48"><label htmlFor="support-search" className="text-sm">Search enquiries</label><Input id="support-search" value={search} onChange={e=>setSearch(e.target.value)} maxLength={120}/></div><div><label htmlFor="support-status" className="block text-sm">Status</label><select id="support-status" className="min-h-11 rounded-md border border-input bg-background px-3" value={status} onChange={e=>setStatus(e.target.value)}><option value="all">All</option><option value="open">Outstanding</option><option value="awaiting_user">Awaiting user</option><option value="resolved">Resolved</option></select></div><Button variant="outline" className="self-end min-h-11" disabled={loading} onClick={()=>void load()}>Refresh</Button></div>
  {error && <p role="alert">{error}</p>}{loading && <p role="status">Loading enquiries…</p>}
  <div className="grid md:grid-cols-[minmax(220px,1fr)_minmax(0,2fr)] gap-6">
   <nav aria-label="Enquiries" className="divide-y divide-border">{filtered.map(t=><Link key={t.id} to={`${base}/${t.id}`} className={`block p-3 min-h-11 break-words focus-visible:ring-2 focus-visible:ring-ring ${t.id===ticketId?'bg-muted':''}`}><strong>{t.subject}</strong><p className="text-sm text-muted-foreground">{t.contact_name || 'Visitor'} · {t.status.replace('_',' ')}</p><time className="text-xs">{new Date(t.updated_at).toLocaleString()}</time></Link>)}{!loading && !filtered.length && <p className="text-muted-foreground py-4">No matching enquiries.</p>}</nav>
   <section aria-label="Conversation" className="min-w-0 space-y-4">{selected?<><h2 className="h2 break-words">{selected.subject}</h2><p className="text-sm break-words">{selected.reply_email || 'No reply email supplied'} · {selected.status.replace('_',' ')}</p><ol className="space-y-4">{messages.map(m=><li key={m.id} className="border-l-2 border-border pl-4"><p className="text-sm font-medium">{m.author_kind==='admin'?'AnaesthesiaCore team':m.author_kind==='status'?'Status update':'User'} · {new Date(m.created_at).toLocaleString()}</p><p className="whitespace-pre-wrap break-words mt-2">{m.body}</p>{admin && m.author_kind!=='status' && <p className="text-xs text-muted-foreground mt-2">Saved · Email {m.delivery_status==='sent'?'accepted by service':m.delivery_status}{m.delivery_error?` — ${m.delivery_error}`:''}</p>}</li>)}</ol>
    {admin && !cap.ready && <p role="status" className="text-sm text-muted-foreground">External email unavailable: {cap.reason || 'verified sender required'}. Replies are still saved in this conversation.</p>}
    <form onSubmit={e=>{e.preventDefault();void act('reply');}} className="space-y-3"><label htmlFor="support-reply" className="block font-medium">Reply</label><Textarea id="support-reply" value={reply} onChange={e=>setReply(e.target.value)} maxLength={5000} rows={6} required/><Button type="submit" className="min-h-11" disabled={busy}>{busy?'Saving…':admin && cap.ready?'Save and email reply':'Save reply'}</Button>{admin && fallback && <Button asChild variant="outline" className="ml-2 min-h-11"><a href={fallback}>Open manual email</a></Button>}</form>
    {admin && <div className="flex gap-3"><Button variant="outline" className="min-h-11" disabled={busy || selected.status==='resolved'} onClick={()=>void act('status','resolved')}>Resolve</Button><Button variant="outline" className="min-h-11" disabled={busy || selected.status==='open'} onClick={()=>void act('status','open')}>Reopen</Button></div>}
   </>:<p className="text-muted-foreground">{ticketId?'This enquiry is unavailable.':'Select an enquiry.'}</p>}</section>
  </div>
 </main>;
}
