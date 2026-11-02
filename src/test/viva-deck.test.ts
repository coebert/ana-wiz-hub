import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {webcrypto} from 'node:crypto';
import {generateVivaDeck} from '../../scripts/generate-viva-deck';
import {extractFaqsByPath,buildRouteMap} from '../../scripts/extract-faqs';
import {allTopics} from '@/data/curriculum';
import {topicReferences} from '@/data/references';
import {verifyDeck,nextCardIndex,EXAMS,type DeckManifest} from '@/lib/viva-deck';
const generated=generateVivaDeck();
describe('canonical versioned viva deck',()=>{
 it('matches every exact current canonical FAQ tuple, route, exam and topic reference record',()=>{
  const faqs=extractFaqsByPath({strict:true});const routes=buildRouteMap().pathToFile;
  for(const deck of generated.decks){const topic=allTopics.find(t=>t.id===deck.topicId);expect(topic).toBeDefined();expect(deck.cards.map(c=>[c.question,c.answer])).toEqual(faqs[deck.path] ?? []);expect(routes[deck.path]).toBeDefined();expect(deck.exams).toEqual(topic?.examTags.filter(e=>EXAMS.includes(e as typeof EXAMS[number])));expect(deck.references).toEqual(topicReferences[deck.topicId] ?? []);for(const c of deck.cards){expect(routes[deck.path].endsWith(c.sourceFile)).toBe(true);expect(c.contentHash).toHaveLength(64);}}
 });
 it('has a reproducible revision and shipped content identical to fresh generation',()=>{
  expect(generateVivaDeck().manifest).toEqual(generated.manifest);
  const shipped=JSON.parse(readFileSync('src/data/viva-deck/manifest.json','utf8')) as DeckManifest;
  expect(shipped).toEqual(generated.manifest);
  for(const t of shipped.topics)if(t.asset)expect(JSON.parse(readFileSync('public/'+t.asset,'utf8'))).toEqual(generated.decks.find(d=>d.topicId===t.id));
 });
 it.each(EXAMS)('includes nonempty cards for %s using only tagged topics',exam=>{const topics=generated.manifest.topics.filter(t=>t.exams.includes(exam)&&t.count);expect(topics.length).toBeGreaterThan(0);expect(topics.every(t=>allTopics.find(a=>a.id===t.id)?.examTags.includes(exam))).toBe(true);});
 it('validates revision and rejects tampered answer or wrong topic',async()=>{
  Object.defineProperty(globalThis,'crypto',{value:webcrypto,configurable:true});
  const deck=generated.decks.find(d=>d.cards.length);const topic=generated.manifest.topics.find(t=>t.id===deck?.topicId);if(!deck||!topic)throw new Error('No deck');
  await expect(verifyDeck(deck,topic)).resolves.toEqual(deck);
  await expect(verifyDeck({...deck,cards:[{...deck.cards[0],answer:'changed'}]},topic)).rejects.toThrow('revision');
  await expect(verifyDeck(deck,{...topic,id:'another-topic'})).rejects.toThrow('revision');
 });
 it('advances and restarts without creating zero scores',()=>{expect(nextCardIndex(0,3)).toBe(1);expect(nextCardIndex(2,3)).toBe(0);expect(nextCardIndex(0,0)).toBe(0);const source=readFileSync('src/components/viva/SourcedVivaSession.tsx','utf8');expect(source).not.toMatch(/viva_attempts|viva_model_answers|functions\.invoke|score:\s*0/);});
});
