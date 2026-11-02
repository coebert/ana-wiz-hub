import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, readdirSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { extractFaqsByPath, buildRouteMap } from './extract-faqs';
import { allTopics } from '../src/data/curriculum';
import { topicReferences } from '../src/data/references';
import type { DeckManifest, TopicDeck, VivaExam } from '../src/lib/viva-deck';
const hash=(data:unknown)=>createHash('sha256').update(JSON.stringify(data)).digest('hex');
export function generateVivaDeck() {
 const faqs=extractFaqsByPath({strict:true});const routes=buildRouteMap().pathToFile;
 const entries:DeckManifest['topics']=[];const decks:TopicDeck[]=[];
 for(const topic of [...allTopics].filter(t=>t.available).sort((a,b)=>a.id.localeCompare(b.id))) {
  const path=`/${topic.section}/${topic.id}`;
  if(!routes[path])throw new Error(`Missing canonical topic route: ${path}`);
  const exams=topic.examTags.filter((e):e is VivaExam=>e==='primary'||e==='final'||e==='fficm');
  if(!exams.length)continue;
  const pairs=faqs[path] ?? [];
  const sourceFile=routes[path].replace(resolve('.')+'/', '');
  const cards=pairs.map(([question,answer],tupleIndex)=>({id:`faq-${hash([topic.id,question,answer]).slice(0,24)}`,question,answer,sourceFile,tupleIndex,contentHash:hash([question,answer])}));
  const payload={schema:1 as const,topicId:topic.id,title:topic.title,path,exams,references:topicReferences[topic.id] ?? [],cards};
  const revision=hash(payload);
  // Source text is unchanged. Topic references are contextual, not certification of each FAQ.
  const deck={...payload,revision};decks.push(deck);
  entries.push({id:topic.id,title:topic.title,path,exams,count:cards.length,revision,asset:cards.length?`viva-deck/${revision}.json`:null});
 }
 if(!decks.some(d=>d.cards.length))throw new Error('Refusing empty viva deck');
 for(const exam of ['primary','final','fficm'])if(!entries.some(t=>t.exams.includes(exam as VivaExam)&&t.count))throw new Error(`Empty exam ${exam}`);
 const inputs={extractor:readFileSync('scripts/extract-faqs.ts','utf8'),routes:readFileSync('src/routes/topicRoutes.ts','utf8'),curriculum:readFileSync('src/data/curriculum.ts','utf8')};
 const manifest:DeckManifest={schema:1,revision:hash({topics:entries,inputs}),topics:entries,coverage:{cards:decks.reduce((n,d)=>n+d.cards.length,0),topics:entries.filter(t=>t.count).length,missing:entries.filter(t=>!t.count).length}};
 return {manifest,decks};
}
if(import.meta.url===`file://${process.argv[1]}`) {
 const {manifest,decks}=generateVivaDeck();mkdirSync('public/viva-deck',{recursive:true});mkdirSync('src/data/viva-deck',{recursive:true});
 const used=new Set(decks.filter(d=>d.cards.length).map(d=>`${d.revision}.json`));
 for(const entry of readdirSync('public/viva-deck'))if(entry.endsWith('.json')&&!used.has(entry))unlinkSync(`public/viva-deck/${entry}`);
 for(const deck of decks)if(deck.cards.length)writeFileSync(`public/viva-deck/${deck.revision}.json`,JSON.stringify(deck));
 writeFileSync('src/data/viva-deck/manifest.json',JSON.stringify(manifest));
 console.log('Canonical viva deck',manifest.coverage,'revision',manifest.revision);
}
