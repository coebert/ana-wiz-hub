import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { generatePodcastScript, scriptSections } from "../supabase/functions/generate-podcast/script.ts";
import { compareSnippets } from "../supabase/functions/semantic-dedupe/batches.ts";

const build=(min,words)=>`Original prompt: ${min} minutes, ${words} words.`;
const completed=(finish_reason,content)=>Response.json({choices:[{finish_reason,message:{content}}]});
const source=Array.from({length:20000},(_,i)=>`w${i}${i%20===19?".":""}`).join(" ");
const tool={type:"function",function:{name:"report_semantic_overlap",parameters:{type:"object"}}};
const candidate={label:"Synthetic",intent:"Compare test packets"};
const snippets=n=>Array.from({length:n},(_,i)=>({id:"id-"+i,source:"synthetic",text:"v".repeat(805)}));
function input(payload){return JSON.parse(payload.messages[1].content.split("\n\n")[1]);}
function verdict(payload,choose=()=>0.1) {
  const rows=input(payload).snippets;
  const matches=rows.map(({id})=>{
    const score=choose(id);const relation= score>=0.85?"duplicate":score>=0.60?"extend":score>=0.35?"cross-reference":"novel";
    return {snippetId:id,score,relation,rationale:"Synthetic rationale."};
  });
  const top=matches.reduce((best,m)=>best.score>=m.score?best:m);
  return {matches,topMatchId:top.snippetId,overallRecommendation:top.relation,verdictLine:"Review "+top.snippetId};
}
function comparison(payload,choose,edit=x=>x) {
  const decision=edit(verdict(payload,choose));
  return Response.json({choices:[{finish_reason:"tool_calls",message:{tool_calls:[{type:"function",function:{name:"report_semantic_overlap",arguments:JSON.stringify(decision)}}]}}]});
}
test("short and long scripts preserve word targets, intact source and completion order",async()=>{
  const normal=await generatePodcastScript("Topic","Simple source.",build,async p=>{
    assert.equal(p.messages[0].content,build(6,900));return completed("stop",[{type:"text",text:"Complete synthetic episode."}]);
  });assert.equal(normal,"Complete synthetic episode.");
  const pieces=scriptSections(source);assert.ok(pieces.length>1);assert.equal(pieces.reduce((a,x)=>a+x.targetWords,0),7000);
  assert.equal(pieces.map(x=>x.source).join(" "),source);
  let i=0;
  const result=await generatePodcastScript("Topic",source,build,async p=>{
    assert.equal(p.max_tokens,8192);assert.ok(p.messages[1].content.includes(pieces[i].source));
    assert.ok(p.messages[0].content.includes(`section ${i+1} of ${pieces.length}`));return completed("stop","Complete section "+(++i)+".");
  });
  assert.equal(result,Array.from({length:pieces.length},(_,j)=>`Complete section ${j+1}.`).join("\n\n"));
});
test("an incomplete, refused or malformed section cannot become a ready podcast",async()=>{
  for(const response of [()=>completed("length","Truncated"),()=>completed("content_filter","Omitted"),
    ()=>completed(undefined,"End unknown"),()=>completed("stop","   "),()=>completed("stop",[{text:"short"},{type:"refusal",refusal:"no"}]),
    ()=>Response.json({choices:[{finish_reason:"stop",message:{refusal:"declined",content:"Text"}}]})]){
    let calls=0;
    await assert.rejects(generatePodcastScript("Topic",source,build,async()=>++calls===1?completed("stop","First section."):response()));
    assert.equal(calls,2);
  }
  const handler=readFileSync(new URL("../supabase/functions/generate-podcast/index.ts",import.meta.url),"utf8");
  assert.ok(handler.indexOf("return generatePodcastScript(")<handler.indexOf("const chunks = chunkScript(script)"));
  assert.ok(handler.indexOf("const chunks = chunkScript(script)")<handler.indexOf(".upload(audioPath"));
});
test("oversized or missing source is rejected before a paid request",async()=>{
  let calls=0;
  await assert.rejects(generatePodcastScript("x".repeat(160001),source,build,async()=>{calls++;}));
  await assert.rejects(generatePodcastScript("Topic","   ",build,async()=>{calls++;}));
  assert.equal(calls,0);
});
test("empty and normal editorial decisions keep the original result shape and order",async()=>{
  assert.equal((await compareSnippets({candidate,snippets:[]},"system",tool,()=>assert.fail())).overallRecommendation,"novel");
  const rows=snippets(3);let calls=0;
  const decision=await compareSnippets({candidate,snippets:rows},"system",tool,async p=>{
    calls++;assert.equal(p.tools[0],tool);assert.equal(p.tool_choice.function.name,tool.function.name);
    assert.equal(input(p).snippets[0].text.length,801);return comparison(p, id=>id==="id-1"?0.78:0.25,v=>({...v,matches:v.matches.reverse()}));
  });
  assert.equal(calls,1);assert.deepEqual(decision.matches.map(m=>m.snippetId),rows.map(s=>s.id));
  assert.equal(decision.topMatchId,"id-1");assert.equal(decision.overallRecommendation,"extend");
});
test("large dedupe requests compare every original ID, aggregate the global strongest and never exceed relay budgets",async()=>{
  const rows=snippets(240),sizes=[];
  const result=await compareSnippets({candidate,snippets:rows},"system",tool,async p=>{
    const batch=input(p).snippets;sizes.push(batch.length);
    assert.ok(p.messages[1].content.length<=160000);assert.ok(Buffer.byteLength(JSON.stringify({operation:"chat",payload:p}))<=524288);
    return comparison(p,id=>id==="id-189"?0.94:id==="id-4"?0.79:0.22);
  });
  assert.ok(Math.max(...sizes)<=24);assert.equal(sizes.length,10);assert.deepEqual(result.matches.map(x=>x.snippetId),rows.map(x=>x.id));
  assert.equal(result.topMatchId,"id-189");assert.equal(result.verdictLine,"Review id-189");assert.equal(result.overallRecommendation,"duplicate");
});
test("partial, truncated, wrongly keyed, inconsistent or missing comparisons never yield an editorial verdict",async()=>{
  const rows=snippets(55);
  for(const malformed of [(p)=>completed("length",""),(p)=>comparison(p,undefined,v=>({...v,matches:v.matches.slice(1)})),
    (p)=>comparison(p,undefined,v=>({...v,topMatchId:"not-provided"})),(p)=>comparison(p,undefined,v=>({...v,overallRecommendation:"duplicate"})),
    (p)=>comparison(p,undefined,v=>({...v,matches:v.matches.map(x=>({...x,score:1.2}))})),
    (p)=>Response.json({choices:[{finish_reason:"tool_calls",message:{tool_calls:[{type:"function",function:{name:"other",arguments:"{}"}}]}}]})]){
    let calls=0;
    await assert.rejects(compareSnippets({candidate,snippets:rows},"system",tool,async p=>++calls===1?comparison(p):malformed(p)),e=>e.status===502);
    assert.equal(calls,2);
  }
});
test("bad editorial input or oversized last items are detected before any billing; provider denial stops subsequent batches",async()=>{
  let calls=0;const chat=async()=>{calls++;return new Response(null,{status:429});};
  await assert.rejects(compareSnippets({candidate,snippets:[...snippets(24),{id:"x",source:"y".repeat(161000),text:"t"}]},"system",tool,chat),e=>e.status===413);
  await assert.rejects(compareSnippets({candidate,snippets:[...snippets(24),...snippets(1)]},"system",tool,chat),e=>e.status===400);
  assert.equal(calls,0);
  await assert.rejects(compareSnippets({candidate,snippets:snippets(55)},"system",tool,chat),e=>e.status===429);
  assert.equal(calls,1);
});
