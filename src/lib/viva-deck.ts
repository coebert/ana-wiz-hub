import { z } from 'zod';
export const EXAMS = ['primary','final','fficm'] as const;
export type VivaExam = typeof EXAMS[number];
export const examLabels: Record<VivaExam,string> = {primary:'Primary',final:'Final',fficm:'FFICM'};
const referenceSchema = z.object({label:z.string(),citation:z.string(),url:z.string().optional(),pmid:z.string().optional(),excerpt:z.string().optional(),reviewNote:z.string().optional()});
export const cardSchema = z.object({id:z.string(),question:z.string().min(1),answer:z.string().min(1),sourceFile:z.string(),tupleIndex:z.number().int().nonnegative(),contentHash:z.string().length(64)});
export const topicDeckSchema = z.object({schema:z.literal(1),topicId:z.string(),title:z.string(),path:z.string().startsWith('/'),exams:z.array(z.enum(EXAMS)),revision:z.string().length(64),references:z.array(referenceSchema),cards:z.array(cardSchema)});
export type TopicDeck = z.infer<typeof topicDeckSchema>;
export type VivaCard = TopicDeck['cards'][number];
export interface DeckTopic {id:string;title:string;path:string;exams:VivaExam[];count:number;revision:string;asset:string | null}
export interface DeckManifest {schema:1;revision:string;topics:DeckTopic[];coverage:{cards:number;topics:number;missing:number}}
export class DeckError extends Error {constructor(public kind:'network'|'content',message:string){super(message);}}
export function cardsForExam(topic: DeckTopic, exam: VivaExam) { return topic.exams.includes(exam) && topic.count > 0; }
export function nextCardIndex(index: number, length: number) {return length ? (index+1)%length : 0;}
export async function verifyDeck(raw:unknown,topic:DeckTopic):Promise<TopicDeck> {
 const parsed=topicDeckSchema.safeParse(raw);
 if(!parsed.success)throw new DeckError('content','This practice deck is unavailable. Read the teaching page while it is rebuilt.');
 const {revision,...payload}=raw as TopicDeck;
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(payload)));
 const actual=Array.from(new Uint8Array(digest),b=>b.toString(16).padStart(2,'0')).join('');
 if(actual!==revision || revision!==topic.revision || payload.topicId!==topic.id || payload.path!==topic.path || JSON.stringify(payload.exams)!==JSON.stringify(topic.exams))throw new DeckError('content','Practice content revision does not match. Refresh or use the teaching page.');
 return parsed.data;
}
const cache=new Map<string,TopicDeck>();
export async function loadTopicDeck(topic:DeckTopic,signal?:AbortSignal):Promise<TopicDeck> {
 if(!topic.asset)throw new DeckError('content','No extractable practice cards for this topic. Read its teaching page.');
 const cached=cache.get(topic.revision);if(cached)return cached;
 let response:Response;
 try{response=await fetch(`${import.meta.env.BASE_URL}${topic.asset}`,{signal});}catch(e){if(signal?.aborted)throw e;throw new DeckError('network','Could not download practice content. Check your connection and retry; no sign-in is required.');}
 if(!response.ok)throw new DeckError(response.status===404?'content':'network',response.status===404?'Practice content is unavailable. Open the teaching page.':'Could not download practice content. Check your connection and retry; no sign-in is required.');
 let raw:unknown;try{raw=await response.json();}catch{throw new DeckError('content','Practice content is unreadable. Refresh or open the teaching page.');}
 const deck=await verifyDeck(raw,topic);cache.set(topic.revision,deck);return deck;
}
