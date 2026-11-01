const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'); const path=require('node:path'); const vm=require('node:vm');
const ts=require('typescript');
const ROOT=path.resolve(__dirname,'..');
function compile(source,filename){const result=ts.transpileModule(source,{fileName:filename,reportDiagnostics:true,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}});assert.deepEqual((result.diagnostics??[]).filter(d=>d.category===ts.DiagnosticCategory.Error),[]);return result.outputText;}
function endpoint(name,authed=true){
 let handler; const calls={model:0,embed:0,db:0,provider:0};
 const context={exports:{},Response,Request,Headers,TextEncoder,console,crypto:require('node:crypto').webcrypto,
 Deno:{serve:f=>handler=f,env:{get:()=> 'test-only-configuration'}},
 fetch:async()=>{calls.provider++;throw Error('External request forbidden in test');}};
 const reqUser={getAuthedUserId:async()=>authed?'test-user':null,isAdminUser:async()=>false};
 const client={auth:{getUser:async()=>({data:{user:authed?{id:'test-user'}:null},error:null})},from:()=>{calls.db++;throw Error('Cache access forbidden');},rpc:()=>{calls.db++;throw Error('Retrieval forbidden during containment');}};
 const helper={exports:{},Response,Headers};vm.runInNewContext(compile(fs.readFileSync(path.join(ROOT,'supabase/functions/_shared/source-unavailable.ts'),'utf8'),'source-unavailable.ts'),helper);
 context.require=module=>{
  if(module.includes('source-unavailable'))return helper.exports;
  if(module.includes('require-user'))return reqUser;
  if(module==='npm:ai')return {streamText:()=>{calls.model++;throw Error('Model call');},convertToModelMessages:async()=>[]};
  if(module.includes('supabase-js')&&module.endsWith('/cors'))return {corsHeaders:{'Access-Control-Allow-Origin':'*'}};
  if(module.includes('supabase-js'))return {createClient:()=>client};
  if(module.includes('ai-gateway'))return {embedTexts:async()=>{calls.embed++;throw Error('Embedding call');},createLovableAiGatewayProvider:()=>{calls.model++;throw Error('Gateway');}};
  if(module.includes('moderation'))return {moderateText:async()=>{throw Error('Moderation call');}};
  throw Error('Unmocked dependency '+module);
 };
 vm.runInNewContext(compile(fs.readFileSync(path.join(ROOT,`supabase/functions/${name}/index.ts`),'utf8'),name+'.ts'),context);
 return {handler,calls};
}
const payloads={
 'kb-chat':{messages:[{id:'1',role:'user',parts:[{type:'text',text:'Give an exact drug dose'}]}]},
 'viva':{mode:'model-answer',topicTitle:'Airway',exam:'final',question:'Give a dose',context:'fake current evidence',approved:true},
 'viva-voice-token':{topicTitle:'Airway',exam:'final',topicDescription:'fake current evidence'},
};
for(const name of Object.keys(payloads)){
 test(name+': authenticated request is typed unavailable, zero clinical/provider/cache calls',async()=>{
  const {handler,calls}=endpoint(name); const response=await handler(new Request('https://example.test',{method:'POST',headers:{Authorization:'Bearer test'},body:JSON.stringify(payloads[name])}));
  assert.equal(response.status,503);const data=await response.json();assert.equal(data.code,'SOURCE_UNAVAILABLE');assert.equal(data.clinicalScore,null);assert.equal(response.headers.get('Cache-Control'),'no-store');
  assert.deepEqual(calls,{model:0,embed:0,db:0,provider:0});
 });
 test(name+': unauthenticated request still denied before feature response',async()=>{
  const {handler,calls}=endpoint(name,false); const response=await handler(new Request('https://example.test',{method:'POST',headers:{Authorization:'Bearer test'},body:JSON.stringify(payloads[name])}));assert.equal(response.status,401);assert.deepEqual(calls,{model:0,embed:0,db:0,provider:0});
 });
}
for(const mode of ['question','feedback','annotate','model-answer']) test('viva '+mode+' cannot reach legacy cache, waiter, generation or grade',async()=>{
 const {handler,calls}=endpoint('viva'); const response=await handler(new Request('https://example.test',{method:'POST',body:JSON.stringify({...payloads.viva,mode})})); assert.equal(response.status,503);assert.equal((await response.json()).clinicalScore,null);assert.equal(calls.db+calls.model+calls.provider,0);
});
test('bad JSON and methods keep original validation; CORS works',async()=>{
 for(const name of ['kb-chat','viva']){
  const {handler}=endpoint(name);
  assert.equal((await handler(new Request('https://example.test',{method:'POST',body:'not JSON'}))).status,400);
  assert.equal((await handler(new Request('https://example.test',{method:'GET'}))).status,405);
  assert.equal((await handler(new Request('https://example.test',{method:'OPTIONS'}))).status,200);
 }
});
function functionFrom(pathname,name){
 const source=fs.readFileSync(path.join(ROOT,pathname),'utf8');const sf=ts.createSourceFile(pathname,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const node=sf.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text===name);assert.ok(node,name);return compile(node.getText(sf),pathname);
}
test('Ask exact/fuzzy library and fetch gates return empty without any network',async()=>{
 const context={calls:0};vm.runInNewContext(functionFrom('src/pages/AskAi.tsx','fetchLibrary')+'\n'+functionFrom('src/pages/AskAi.tsx','findCachedMatch'),context);
 assert.equal((await context.fetchLibrary()).length,0);assert.equal(context.findCachedMatch('dose',[{question:'dose',answer:'old',normalized:'dose'}]),null);
 const ask=fs.readFileSync(path.join(ROOT,'src/pages/AskAi.tsx'),'utf8');assert.ok(!ask.includes('.channel('));assert.ok(!ask.includes('.from("ask_qa_library")'));assert.ok(!ask.includes('const cached = findCachedMatch'));assert.ok(ask.includes('window.localStorage.getItem(STORAGE_KEY)'));assert.ok(ask.includes('historical, not a verified current source'));
 const library=fs.readFileSync(path.join(ROOT,'src/pages/VivaQuestionLibrary.tsx'),'utf8');assert.ok(!library.includes('.from("viva_model_answers")'));assert.ok(library.includes('setRows([])'));
});
test('typed unavailable is shown as understandable UI error; genuine stream responses pass through',async()=>{
 let response=new Response(JSON.stringify({code:'SOURCE_UNAVAILABLE'}),{status:503,headers:{'Content-Type':'application/json'}});
 const scope={exports:{},Response,fetch:async()=>response,require:()=>({supabase:{functions:{invoke:async()=>({data:null,error:{context:response}})}}})};
 vm.runInNewContext(compile(fs.readFileSync(path.join(ROOT,'src/lib/sourceUnavailable.ts'),'utf8'),'sourceUnavailable.ts'),scope);
 await assert.rejects(()=>scope.exports.sourceAwareFetch('https://example.test'),/Current source material/);
 const result=await scope.exports.invokeViva({body:{mode:'feedback'}});assert.match(result.error.message,/Current source material/);assert.equal(result.data,null);
 response=new Response('event stream',{headers:{'Content-Type':'text/event-stream'}});assert.equal(await scope.exports.sourceAwareFetch('https://example.test'),response);
});
test('held podcast cannot count as background success; only job item is failed, original is untouched',async()=>{
 const updates=[];const episode={status:'ready',regenerating:false,audio_path:'old.mp3',updated_at:new Date().toISOString(),audit_hold:true,audit_hold_reason:'Needs review'};
 const admin={from(table){let update;return {select(){return this;},eq(){return this;},maybeSingle:async()=>({data:episode}),update(value){update=value;updates.push({table,value});return this;},then(resolve){resolve({data:null,error:null});}};}};
 const source=fs.readFileSync(path.join(ROOT,'supabase/functions/process-podcast-rerecord/index.ts'),'utf8');const sf=ts.createSourceFile('worker.ts',source,ts.ScriptTarget.Latest,true);const node=sf.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='settleItem');
 const scope={admin,Date,MAX_ATTEMPTS:3};vm.runInNewContext(compile(node.getText(sf),'worker.ts'),scope);
 const result=await scope.settleItem({id:'item',topic_id:'airway',voice:'voice',started_at:new Date().toISOString()});assert.equal(result,'failed');assert.equal(updates.length,1);assert.equal(updates[0].table,'podcast_rerecord_items');assert.equal(updates[0].value.status,'failed');assert.equal(episode.audit_hold,true);assert.equal(episode.audio_path,'old.mp3');
});
test('all touched TS/TSX files parse',()=>{
 const paths=['supabase/functions/_shared/source-unavailable.ts','src/lib/sourceUnavailable.ts','supabase/functions/kb-chat/index.ts','supabase/functions/viva/index.ts','supabase/functions/viva-voice-token/index.ts','supabase/functions/process-podcast-rerecord/index.ts','src/pages/AskAi.tsx','src/pages/VivaQuestionLibrary.tsx','src/pages/VoiceViva.tsx','src/components/viva/VivaSession.tsx','src/components/viva/DemoVivaInteractive.tsx'];
 for(const file of paths)compile(fs.readFileSync(path.join(ROOT,file),'utf8'),file);
});
test('draft containment policies are restrictive, additive, and do not delete history',()=>{
 const sql=fs.readFileSync(path.join(ROOT,'supabase/migrations/202611010001_contain_legacy_ai_library.sql'),'utf8').split('\n').filter(l=>!l.trim().startsWith('--')).join('\n');
 assert.equal((sql.match(/AS RESTRICTIVE FOR SELECT TO anon, authenticated USING \(false\)/g)||[]).length,2);assert.ok(!/\b(DELETE|DROP|UPDATE|TRUNCATE)\b/i.test(sql));
});
