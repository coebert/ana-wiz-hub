import {useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {PageSection} from '@/components/layout/PageSection';
import VivaSession from '@/components/viva/VivaSession';
import {vivaManifest} from '@/hooks/useVivaDeck';
import {EXAMS,examLabels,cardsForExam,type VivaExam} from '@/lib/viva-deck';
export default function VivaHub(){
 const [params,setParams]=useSearchParams();const requested=params.get('exam');const exam:VivaExam=EXAMS.find(e=>e===requested) ?? 'final';
 const topicId=params.get('topic') ?? '';const [query,setQuery]=useState('');
 const topics=vivaManifest.topics.filter(t=>t.exams.includes(exam)&&t.title.toLowerCase().includes(query.toLowerCase()));
 const active=vivaManifest.topics.find(t=>t.id===topicId);
 const choose=(id:string)=>setParams({exam,topic:id});
 return <div className="min-h-screen bg-background"><Helmet><title>Sourced Viva Practice — FRCA & FFICM | AnaesthesiaCore</title><meta name="description" content="Rehearse current teaching FAQs, reveal exact source answers and self-review for FRCA Primary, Final and FFICM."/><link rel="canonical" href="https://anaesthesiacore.app/viva"/><meta property="og:title" content="Sourced Viva Practice — AnaesthesiaCore"/><meta property="og:description" content="Current teaching questions, source answers and unscored self-review."/><meta property="og:url" content="https://anaesthesiacore.app/viva"/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary"/></Helmet>
 <PageSection spacing="tight" width="wide"><header className="mb-6"><h1 className="h1">Viva practice</h1><p className="text-muted-foreground mt-3">Rehearse current teaching questions, then compare with the source answer. Free-form AI clinical marking and the live examiner remain under review.</p></header>
 <div role="group" aria-label="Choose exam" className="flex flex-wrap gap-2 mb-5">{EXAMS.map(e=><Button key={e} className="min-h-11" variant={exam===e?'default':'outline'} aria-pressed={exam===e} onClick={()=>setParams({exam:e})}>{examLabels[e]}</Button>)}</div>
 <div className="flex flex-wrap gap-3 mb-6"><Button asChild variant="outline"><Link to={`/viva/library?exam=${exam}`}>Question library</Link></Button><Button asChild variant="outline"><Link to="/viva/scores">Previous score history</Link></Button><Button variant="secondary" onClick={()=>{const eligible=topics.filter(t=>cardsForExam(t,exam));if(eligible.length)choose(eligible[Math.floor(Math.random()*eligible.length)].id);}} disabled={!topics.some(t=>t.count)}>Random topic</Button></div>
 {active?<><Button className="mb-5" variant="ghost" onClick={()=>setParams({exam})}>Back to topics</Button><VivaSession key={`${active.id}-${exam}`} topicId={active.id} topicTitle={active.title} exam={exam} initialCardId={params.get('card') ?? undefined}/></>:<><label htmlFor="viva-search" className="text-sm">Find a topic</label><Input id="viva-search" value={query} onChange={e=>setQuery(e.target.value)} className="mb-5" maxLength={120}/><ul className="divide-y divide-border">{topics.map(t=><li key={t.id} className="py-4 flex flex-wrap justify-between gap-3"><div className="min-w-0"><h2 className="h3 break-words">{t.title}</h2><p className="text-sm text-muted-foreground">{t.count ? `${t.count} sourced questions`:'No extractable FAQ cards — teaching available'}</p></div><div className="flex flex-wrap gap-2">{t.count>0 && <Button className="min-h-11" onClick={()=>choose(t.id)}>Practise {t.title}</Button>}<Button asChild variant="outline"><Link to={t.path}>Teaching</Link></Button>{t.count>0 && <Button asChild variant="ghost"><Link to={`/viva/voice?topic=${t.id}&exam=${exam}`}>Spoken rehearsal</Link></Button>}</div></li>)}</ul>{!topics.length && <p>No topics match this search.</p>}</>}
 <p className="text-xs text-muted-foreground mt-6">{vivaManifest.coverage.cards} exact FAQ cards · deck revision {vivaManifest.revision.slice(0,16)}</p></PageSection></div>;
}
