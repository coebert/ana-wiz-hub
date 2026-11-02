import {useEffect,useState} from 'react';
import manifestData from '@/data/viva-deck/manifest.json';
import {loadTopicDeck,type DeckManifest,type TopicDeck} from '@/lib/viva-deck';
export const vivaManifest=manifestData as DeckManifest;
export function useVivaDeck(topicId:string) {
 const topic=vivaManifest.topics.find(t=>t.id===topicId);
 const [deck,setDeck]=useState<TopicDeck | null>(null);const [error,setError]=useState('');const [loading,setLoading]=useState(true);const [retry,setRetry]=useState(0);
 useEffect(()=>{const controller=new AbortController();setDeck(null);setError('');setLoading(true);
  if(!topic?.asset){setLoading(false);return;}
  loadTopicDeck(topic,controller.signal).then(d=>{if(!controller.signal.aborted)setDeck(d);}).catch(e=>{if(!controller.signal.aborted)setError(e instanceof Error?e.message:'Practice content unavailable.');}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
  return()=>controller.abort();
 },[topicId,retry]);
 return {topic,deck,error,loading,retry:()=>setRetry(n=>n+1)};
}
