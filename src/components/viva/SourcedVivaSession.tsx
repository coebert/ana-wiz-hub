import {useEffect,useId,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Volume2,Mic,Square,RotateCcw,ArrowRight} from 'lucide-react';
import {useVivaDeck} from '@/hooks/useVivaDeck';
import {examLabels,nextCardIndex,type VivaExam} from '@/lib/viva-deck';
import {playVivaSpeech,isCancelled,VIVA_AUDIO_ERROR,type SpeechPlayback} from '@/lib/viva-audio';
interface Recognition {lang:string;continuous:boolean;interimResults:boolean;onresult:((e:{resultIndex:number;results:ArrayLike<{isFinal:boolean;0:{transcript:string}}>})=>void)|null;onerror:((e:{error:string})=>void)|null;onend:(()=>void)|null;start():void;stop():void;abort():void}
type SpeechWindow=Window & {SpeechRecognition?:new()=>Recognition;webkitSpeechRecognition?:new()=>Recognition};
export default function SourcedVivaSession({topicId,topicTitle,exam,onClose,initialCardId}:{topicId:string;topicTitle:string;topicDescription?:string;exam:VivaExam;onClose?:()=>void;initialCardId?:string}) {
 const {topic,deck,error,loading,retry}=useVivaDeck(topicId);const [index,setIndex]=useState(0);const [answer,setAnswer]=useState('');const [revealed,setRevealed]=useState(false);const [review,setReview]=useState('');
 const [audioError,setAudioError]=useState('');const [speaking,setSpeaking]=useState(false);const playback=useRef<SpeechPlayback | null>(null);const audioRun=useRef(0);
 const [micError,setMicError]=useState('');const [listening,setListening]=useState(false);const recognition=useRef<Recognition | null>(null);const [interim,setInterim]=useState('');const answerId=useId();
 const Ctor=typeof window==='undefined'?undefined:(window as SpeechWindow).SpeechRecognition ?? (window as SpeechWindow).webkitSpeechRecognition;
 const card=deck?.cards[index];
 const stopAudio=()=>{audioRun.current++;playback.current?.stop();playback.current=null;setSpeaking(false);};
 const stopMic=()=>{recognition.current?.abort();recognition.current=null;setListening(false);setInterim('');};
 const reset=()=>{stopAudio();stopMic();setAnswer('');setRevealed(false);setReview('');setMicError('');setAudioError('');};
 useEffect(()=>{reset();setIndex(deck?Math.max(0,deck.cards.findIndex(c=>c.id===initialCardId)):0);},[deck?.revision,exam,initialCardId]);
 useEffect(()=>()=>{audioRun.current++;playback.current?.stop();recognition.current?.abort();},[]);
 async function speak(text:string) {
  stopAudio();const run=++audioRun.current;setAudioError('');setSpeaking(true);
  try{const p=playVivaSpeech(text,{voice:'onyx'});playback.current=p;await p.done;}catch(e){if(run===audioRun.current&&!isCancelled(e))setAudioError(VIVA_AUDIO_ERROR);}finally{if(run===audioRun.current){setSpeaking(false);playback.current=null;}}
 }
 function dictate() {
  if(!Ctor){setMicError('Dictation is unavailable in this browser. Type your answer instead.');return;}
  stopAudio();stopMic();setMicError('');
  try{const rec=new Ctor();rec.lang='en-GB';rec.continuous=true;rec.interimResults=true;
   rec.onresult=e=>{let temporary='';for(let i=e.resultIndex;i<e.results.length;i++){const r=e.results[i];if(r.isFinal)setAnswer(previous=>(previous+' '+r[0].transcript).trim().slice(0,20000));else temporary+=r[0].transcript;}setInterim(temporary);};
   rec.onerror=e=>{setMicError(e.error==='not-allowed'||e.error==='service-not-allowed'?'Microphone permission denied. You can type your answer or retry dictation.':'Dictation stopped. Your answer is retained; type or retry.');stopMic();};
   rec.onend=()=>{setListening(false);setInterim('');};recognition.current=rec;setListening(true);rec.start();
  }catch{setMicError('Could not start dictation. Type your answer or retry.');stopMic();}
 }
 if(loading)return <p role="status">Loading current practice cards…</p>;
 const teaching=topic?.path;
 if(error || !deck || !card || !topic?.exams.includes(exam))return <div className="space-y-3"><h2 className="h2">{topicTitle}</h2><p role="status">{error || 'No extractable cards for this topic and exam. Continue with its teaching page.'}</p>{error && <Button onClick={retry}>Retry content</Button>}{teaching && <Button asChild variant="outline"><Link to={teaching}>Open teaching page</Link></Button>}</div>;
 return <section className="space-y-5 min-w-0" aria-label="Sourced viva rehearsal">
  <header className="flex flex-wrap justify-between gap-3"><div><p className="text-xs text-muted-foreground">{examLabels[exam]} · Sourced rehearsal · {index+1} of {deck.cards.length}</p><h2 className="h2 break-words">{deck.title}</h2></div>{onClose && <Button variant="ghost" onClick={onClose}>Close practice</Button>}</header>
  <p className="text-sm text-muted-foreground">Current teaching FAQs, unchanged. Extraction is not clinical certification. Free-form AI marking and the live examiner remain under review.</p>
  <h3 className="text-lg font-serif font-semibold break-words whitespace-pre-wrap" data-testid="viva-question">{card.question}</h3>
  <div className="flex flex-wrap gap-2"><Button variant="outline" className="min-h-11" onClick={()=>void speak(card.question)} disabled={speaking}><Volume2 className="h-4 w-4 mr-2"/>Read question</Button>{speaking && <Button variant="outline" onClick={stopAudio}><Square className="h-4 w-4 mr-2"/>Stop audio</Button>}</div>
  {audioError && <p role="alert" className="text-sm">{audioError}</p>}
  <div><label htmlFor={answerId} className="block font-medium mb-2">Your answer</label><Textarea id={answerId} value={answer} onChange={e=>setAnswer(e.target.value)} rows={6} maxLength={20000} disabled={listening}/>{interim && <p className="text-muted-foreground">{interim}</p>}</div>
  <div className="flex flex-wrap items-center gap-3"><Button variant="outline" className="min-h-11" onClick={listening?()=>{recognition.current?.stop();}:dictate}><Mic className="h-4 w-4 mr-2"/>{listening?'Stop dictation':'Dictate answer'}</Button><span className="text-xs text-muted-foreground">{Ctor?'Optional browser dictation may use your browser provider’s speech service.':'Dictation unsupported here; typed answers work.'} Your answer is not sent for AI marking.</span></div>
  {micError && <p role="alert" className="text-sm">{micError}</p>}
  <Button className="min-h-11" onClick={()=>{recognition.current?.stop();setRevealed(true);}} disabled={revealed}>Reveal source answer</Button>
  {revealed && <div className="border-t border-border pt-5 space-y-4"><h3 className="h3">Source answer</h3><p className="whitespace-pre-wrap break-words leading-relaxed" data-testid="viva-source-answer">{card.answer}</p><Button variant="outline" onClick={()=>void speak(card.answer)} disabled={speaking}><Volume2 className="h-4 w-4 mr-2"/>Read source answer</Button>
   <fieldset className="space-y-2"><legend className="font-semibold">Self-assessment — unscored</legend><p className="text-sm text-muted-foreground">Compare your answer with the teaching. This rehearsal does not add a numerical score or change your saved score history.</p><div className="flex flex-wrap gap-2">{['Needs revision','Partly recalled','Recalled confidently'].map(label=><Button key={label} variant={review===label?'default':'outline'} aria-pressed={review===label} onClick={()=>setReview(label)} className="min-h-11">{label}</Button>)}</div>{review && <p role="status" className="text-sm">Your self-review: {review} · this session only.</p>}</fieldset>
  </div>}
  <div className="flex flex-wrap gap-3 border-t border-border pt-4"><Button onClick={()=>{reset();setIndex(i=>nextCardIndex(i,deck.cards.length));}} className="min-h-11">Next question<ArrowRight className="h-4 w-4 ml-2"/></Button><Button variant="outline" onClick={()=>{reset();setIndex(0);}} className="min-h-11"><RotateCcw className="h-4 w-4 mr-2"/>Restart</Button><Button asChild variant="outline"><Link to={deck.path}>Topic teaching</Link></Button><Button asChild variant="ghost"><Link to="/viva/scores">Previous score history</Link></Button></div>
  <details className="text-sm border-t border-border pt-3"><summary className="cursor-pointer min-h-11">Topic references and review notes ({deck.references.length})</summary><p className="text-muted-foreground mb-3">Topic bibliography, not a per-answer certification or independent review.</p><ul className="space-y-4">{deck.references.map((ref,i)=><li key={`${ref.label}-${i}`} className="break-words"><strong>{ref.label}</strong><p>{ref.citation}</p>{ref.url && /^https?:\/\//.test(ref.url) && <a className="text-primary underline" href={ref.url} target="_blank" rel="noopener noreferrer">Open source</a>}{ref.excerpt && <blockquote className="border-l-2 border-border pl-3 mt-2 whitespace-pre-wrap">{ref.excerpt}</blockquote>}{ref.reviewNote && <p className="text-muted-foreground mt-2">Review note: {ref.reviewNote}</p>}</li>)}</ul>{!deck.references.length && <p>No topic reference records supplied; use the teaching page’s source context.</p>}</details>
  <p className="text-xs text-muted-foreground break-all">Content revision {deck.revision.slice(0,16)} · canonical FAQ {card.tupleIndex+1}</p>
 </section>;
}
