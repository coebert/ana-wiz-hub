type Snippet = {id:string; source:string; text:string};
export type RequestBody = {
  candidate: {label:string;intent:string;contentType?:string}; topicId?:string; snippets:Snippet[];
};
type Match = {snippetId:string;score:number;relation:string;rationale:string};
type Verdict = {matches:Match[];topMatchId:string;overallRecommendation:string;verdictLine:string};
type Chat = (payload: Record<string,unknown>) => Promise<Response>;

export class SemanticError extends Error {
  readonly status: number;
  constructor(status:number, message:string) { super(message); this.status=status; }
}
const invalidOutput = () => new SemanticError(502,"Incomplete or inconsistent semantic comparison");
const utf8 = new TextEncoder();
function relation(score:number) {
  if (score >= 0.85) return "duplicate";
  if (score >= 0.60) return "extend";
  if (score >= 0.35) return "cross-reference";
  return "novel";
}
function batchVerdict(result: unknown, expected: Snippet[]): Verdict {
  const verdict = result as Verdict | null;
  if (!verdict || !Array.isArray(verdict.matches) || verdict.matches.length !== expected.length ||
      typeof verdict.verdictLine !== "string" || !verdict.verdictLine.trim() || typeof verdict.topMatchId !== "string") throw invalidOutput();
  const expectedIds = new Set(expected.map(s => s.id));
  const byId = new Map<string,Match>();
  for (const m of verdict.matches) {
    if (!m || !expectedIds.has(m.snippetId) || byId.has(m.snippetId) ||
        typeof m.score !== "number" || !Number.isFinite(m.score) || m.score < 0 || m.score > 1 ||
        m.relation !== relation(m.score) || typeof m.rationale !== "string" || !m.rationale.trim()) throw invalidOutput();
    byId.set(m.snippetId,{snippetId:m.snippetId,score:m.score,relation:m.relation,rationale:m.rationale});
  }
  const matches = expected.map(s => byId.get(s.id)!);
  const strongest = Math.max(...matches.map(m => m.score));
  const top = byId.get(verdict.topMatchId);
  if (verdict.overallRecommendation !== relation(strongest) ||
      !(top?.score === strongest || (verdict.topMatchId === "" && verdict.overallRecommendation === "novel"))) throw invalidOutput();
  return {matches,topMatchId:verdict.topMatchId,overallRecommendation:verdict.overallRecommendation,verdictLine:verdict.verdictLine};
}

export async function compareSnippets(body:RequestBody, system:string, tool:unknown, chat:Chat):Promise<Verdict> {
  const candidate = body?.candidate;
  if (typeof candidate?.label !== "string" || !candidate.label.trim() || typeof candidate.intent !== "string" || !candidate.intent.trim() ||
      (candidate.contentType !== undefined && typeof candidate.contentType !== "string") ||
      (body.topicId !== undefined && typeof body.topicId !== "string") || !Array.isArray(body.snippets)) {
    throw new SemanticError(400,"Expected a candidate label, intent and a snippet list");
  }
  if (!body.snippets.length) return {matches:[],topMatchId:"",overallRecommendation:"novel",verdictLine:"Semantic dedupe: no existing snippets supplied — treat as novel."};
  const ids = new Set<string>();
  const snippets = body.snippets.map(s => {
    if (!s || typeof s.id !== "string" || !s.id.trim() || ids.has(s.id) || typeof s.source !== "string" || typeof s.text !== "string") {
      throw new SemanticError(400,"Each snippet needs a unique ID, a source and text");
    }
    ids.add(s.id);
    return {id:s.id,source:s.source,text:s.text.length > 800 ? s.text.slice(0,800) + "…" : s.text};
  });
  function request(batch:Snippet[]) {
    const user = "Compare the CANDIDATE against each EXISTING snippet. Score conceptually, not lexically.\n\n" +
      JSON.stringify({candidate:{label:candidate.label,intent:candidate.intent,contentType:candidate.contentType},topicId:body.topicId ?? null,snippets:batch});
    const payload = {messages:[{role:"system",content:system},{role:"user",content:user}],tools:[tool],
      tool_choice:{type:"function",function:{name:"report_semantic_overlap"}}};
    return {payload,user};
  }
  // Preflight every batch before spending credits. 24 output rows leave room
  // for a rationale per snippet, even when the inputs themselves are small.
  const batches: Snippet[][] = [];
  let batch: Snippet[] = [];
  function fits(items:Snippet[]) {
    const {payload,user} = request(items);
    return user.length <= 160000 && utf8.encode(JSON.stringify({operation:"chat",payload})).length <= 512 * 1024;
  }
  for (const snippet of snippets) {
    if (batch.length === 24 || !fits([...batch,snippet])) {
      if (batch.length) batches.push(batch);
      batch = [];
    }
    if (!batch.length && !fits([snippet])) throw new SemanticError(413,"A candidate or snippet identifier is too large for the AI request");
    batch.push(snippet);
  }
  if (batch.length) batches.push(batch);
  // Admin-only original requests have no total count limit. The existing relay
  // imposes the project quota. Process one batch at a time and never auto-retry.
  const allMatches: Match[] = [];
  let winner: Verdict | undefined;
  let winningScore = -1;
  for (const items of batches) {
    const response = await chat(request(items).payload);
    if (!response.ok) {
      await response.body?.cancel();
      if (response.status === 429) throw new SemanticError(429,"Rate limit exceeded — try again shortly.");
      if (response.status === 402) throw new SemanticError(402,"Base44 AI credits are unavailable. Check the integration usage in Base44.");
      throw new SemanticError(502,"AI gateway error");
    }
    let verdict: Verdict;
    try {
      const choice = (await response.json())?.choices?.[0];
      const calls = choice?.message?.tool_calls;
      if (!["tool_calls","stop"].includes(choice?.finish_reason) || choice?.message?.refusal || !Array.isArray(calls) || calls.length !== 1 ||
          calls[0]?.type !== "function" || calls[0].function?.name !== "report_semantic_overlap" || typeof calls[0].function.arguments !== "string") throw invalidOutput();
      verdict = batchVerdict(JSON.parse(calls[0].function.arguments),items);
    } catch { throw invalidOutput(); }
    allMatches.push(...verdict.matches);
    const score = Math.max(...verdict.matches.map(m => m.score));
    if (score > winningScore) { winner = verdict; winningScore = score; }
  }
  return {matches:allMatches,topMatchId:winner!.topMatchId,overallRecommendation:winner!.overallRecommendation,verdictLine:winner!.verdictLine};
}
