import {useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {PageSection} from '@/components/layout/PageSection';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {vivaManifest,useVivaDeck} from '@/hooks/useVivaDeck';
import {EXAMS,examLabels,type VivaExam} from '@/lib/viva-deck';
export default function VivaQuestionLibrary(){
 const [params,setParams]=useSearchParams();const exam:VivaExam=EXAMS.find(e=>e===params.get('exam')) ?? 'final';const [search,setSearch]=useState('');
 const topics=vivaManifest.topics.filter(t=>t.exams.includes(exam)&&t.count);
 const selected=params.get('topic') ?? topics[0]?.id ?? '';const {deck,loading,error,retry}=useVivaDeck(selected);
 const cards=deck?.cards.filter(c=>`${c.question} ${c.answer}`.toLowerCase().includes(search.toLowerCase())) ?? [];
 return <PageSection spacing="tight" width="wide"><Helmet><title>Sourced Viva Question Library — AnaesthesiaCore</title><meta name="description" content="Browse current canonical teaching FAQs and rehearse source answers without AI clinical scoring."/><link rel="canonical" href="https://anaesthesiacore.app/viva/library"/><meta property="og:title" content="Sourced Viva Question Library"/><meta property="og:description" content="Current teaching FAQs with source answers and topic links."/><meta property="og:url" content="https://anaesthesiacore.app/viva/library"/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary"/></Helmet>
 <h1 className="h1">Viva question library</h1><p className="text-muted-foreground my-4">Current teaching FAQs. Practice opens the same source answer with unscored self-review; historical AI answers are not used.</p><div className="flex flex-wrap gap-2 mb-5">{EXAMS.map(e=><Button key={e} aria-pressed={exam===e} variant={exam===e?'default':'outline'} onClick={()=>setParams({exam:e})}>{examLabels[e]}</Button>)}<Button asChild variant="outline"><Link to="/viva">Viva hub</Link></Button><Button asChild variant="ghost"><Link to="/viva/scores">Previous score history</Link></Button></div>
 <div className="grid md:grid-cols-2 gap-4 mb-6"><div><label htmlFor="library-topic">Topic</label><select id="library-topic" className="w-full min-h-11 border border-input bg-background rounded-md px-3" value={selected} onChange={e=>setParams({exam,topic:e.target.value})}>{topics.map(t=><option key={t.id} value={t.id}>{t.title} ({t.count})</option>)}</select></div><div><label htmlFor="library-search">Search this topic’s questions and answers</label><Input id="library-search" value={search} maxLength={120} onChange={e=>setSearch(e.target.value)}/></div></div>
 {loading && <p role="status">Loading current questions…</p>}{error && <div role="alert">{error}<Button onClick={retry}>Retry content</Button></div>}
 <ul className="divide-y divide-border">{cards.map(c=><li key={c.id} className="py-5 space-y-3"><h2 className="h3 whitespace-pre-wrap">{c.question}</h2><div className="flex gap-3 flex-wrap"><Button asChild><Link to={`/viva?exam=${exam}&topic=${selected}&card=${c.id}`}>Practise question</Link></Button><Button asChild variant="outline"><Link to={deck?.path ?? '/viva'}>Topic and sources</Link></Button></div></li>)}</ul>{!loading&&!error&&!cards.length && <p>No questions match. Choose another topic or read its teaching page.</p>}
 </PageSection>;
}
