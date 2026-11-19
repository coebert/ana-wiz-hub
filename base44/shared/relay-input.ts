type ObjectMap = Record<string, unknown>;
export const MAX_BODY = 512 * 1024;
const name = /^[a-zA-Z0-9_-]{1,64}$/;
const voices = new Set(["alloy","ash","ballad","cedar","coral","echo","fable","marin","nova","onyx","sage","shimmer","verse"]);
function bad(): never { throw new Error("Unsupported AI request"); }
function obj(value: unknown): ObjectMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) bad();
  return value as ObjectMap;
}
function allow(value: ObjectMap, keys: string[]) {
  if (Object.keys(value).some(key => !keys.includes(key))) bad();
}
function string(value: unknown, max: number, min = 0): string {
  if (typeof value !== "string" || value.length > max || value.length < min) bad();
  return value;
}
function id(value: unknown) { if (typeof value !== "string" || !name.test(value)) bad(); return value; }
function schema(value: unknown) {
  const s = obj(value);
  if (s.type !== "object" || JSON.stringify(s).length > 48000) bad();
  // Schemas are passed to the model only. The relay never resolves remote references or executes tools.
  JSON.stringify(s, (key, v) => { if (key === "$ref" && (typeof v !== "string" || !v.startsWith("#/"))) bad(); return v; });
  return s;
}
function chatContent(content: unknown, role: string) {
  if (typeof content === "string") return string(content, 160000);
  if (role !== "user" || !Array.isArray(content) || !content.length || content.length > 8) bad();
  let images = 0;
  return content.map((part: unknown) => {
    const p = obj(part);
    if (p.type === "text") return { type: "text", text: string(p.text, 160000) };
    if (p.type !== "image_url" || ++images > 2) bad();
    const url = string(obj(p.image_url).url, 250000);
    if (!/^data:image\/(?:jpeg|png|webp);base64,[a-zA-Z0-9+/]+=*$/.test(url)) bad();
    return { type: "image_url", image_url: { url, detail: "low" } };
  });
}
function message(raw: unknown) {
  const m = obj(raw);
  if (!["system","user","assistant","tool"].includes(String(m.role))) bad();
  if (m.role === "tool") return { role: "tool", content: string(m.content, 160000), tool_call_id: id(m.tool_call_id) };
  const normalized: ObjectMap = { role: m.role };
  if (m.content !== null && m.content !== undefined) normalized.content = chatContent(m.content, String(m.role));
  if (m.tool_calls !== undefined) {
    if (m.role !== "assistant" || !Array.isArray(m.tool_calls) || !m.tool_calls.length || m.tool_calls.length > 12) bad();
    normalized.tool_calls = m.tool_calls.map(rawCall => {
      const c = obj(rawCall); const f = obj(c.function);
      if (c.type !== "function") bad();
      return { id: id(c.id), type: "function", function: { name: id(f.name), arguments: string(f.arguments, 48000) } };
    });
  }
  if (normalized.content === undefined && !normalized.tool_calls) bad();
  return normalized;
}
export function normalizeChat(raw: unknown): ObjectMap {
  const p = obj(raw);
  allow(p, ["model","messages","tools","tool_choice","response_format","stream","stream_options","temperature","max_tokens","max_completion_tokens","parallel_tool_calls"]);
  if (!Array.isArray(p.messages) || !p.messages.length || p.messages.length > 64) bad();
  const normalized: ObjectMap = { model: "automatic", messages: p.messages.map(message) };
  const limit = p.max_tokens ?? p.max_completion_tokens ?? 8192;
  if (typeof limit !== "number" || !Number.isInteger(limit) || limit < 1 || limit > 8192) bad();
  normalized.max_tokens = limit;
  if (p.temperature !== undefined) {
    if (typeof p.temperature !== "number" || !Number.isFinite(p.temperature) || p.temperature < 0 || p.temperature > 2) bad();
    normalized.temperature = p.temperature;
  }
  if (p.stream !== undefined) {
    if (typeof p.stream !== "boolean") bad();
    normalized.stream = p.stream;
  }
  if (p.stream_options !== undefined) {
    if (p.stream !== true || typeof obj(p.stream_options).include_usage !== "boolean") bad();
    normalized.stream_options = {include_usage: obj(p.stream_options).include_usage};
  }
  if (p.parallel_tool_calls !== undefined) {
    if (typeof p.parallel_tool_calls !== "boolean") bad();
    normalized.parallel_tool_calls = p.parallel_tool_calls;
  }
  const names = new Set<string>();
  if (p.tools !== undefined) {
    if (!Array.isArray(p.tools) || p.tools.length > 12 || JSON.stringify(p.tools).length > 64000) bad();
    normalized.tools = p.tools.map((rawTool: unknown) => {
      const tool = obj(rawTool); const fn = obj(tool.function);
      const toolName = id(fn.name);
      if (tool.type !== "function" || names.has(toolName)) bad();
      names.add(toolName);
      const definition: ObjectMap = {name:toolName, parameters:schema(fn.parameters)};
      if (fn.description !== undefined) definition.description = string(fn.description, 5000);
      if (fn.strict !== undefined) { if (typeof fn.strict !== "boolean") bad(); definition.strict = fn.strict; }
      return {type:"function",function:definition};
    });
  }
  if (p.tool_choice !== undefined) {
    if (typeof p.tool_choice === "string" && ["none","auto","required"].includes(p.tool_choice)) normalized.tool_choice = p.tool_choice;
    else {
      const choice = obj(p.tool_choice); const toolName = id(obj(choice.function).name);
      if (choice.type !== "function" || !names.has(toolName)) bad();
      normalized.tool_choice = {type:"function", function:{name:toolName}};
    }
  }
  if (p.response_format !== undefined) {
    const f = obj(p.response_format);
    if (f.type === "json_schema") {
      const r = obj(f.json_schema);
      if (r.strict !== undefined && typeof r.strict !== "boolean") bad();
      normalized.response_format = {type:"json_schema",json_schema:{name:id(r.name),schema:schema(r.schema),strict:r.strict}};
    } else if (f.type === "json_object" || f.type === "text") normalized.response_format = {type:f.type};
    else bad();
  }
  return normalized;
}
export function normalizeSpeech(raw: unknown): ObjectMap {
  const p = obj(raw);
  allow(p, ["model", "input", "voice", "response_format", "instructions", "speed"]);
  const input = string(p.input, 5000, 1);
  if (!input.trim() || !voices.has(String(p.voice)) || !["pcm","mp3"].includes(String(p.response_format))) bad();
  const payload: ObjectMap = {model:"gpt_4o_mini_tts",input,voice:p.voice,response_format:p.response_format};
  if (p.instructions !== undefined) payload.instructions = string(p.instructions,2000);
  if (p.speed !== undefined) { if (p.speed !== 1) bad(); payload.speed = 1; }
  return payload;
}

export function normalizeEmbeddings(raw: unknown): string[] {
  const p = obj(raw);
  allow(p, ["input"]);
  const inputs = typeof p.input === "string" ? [p.input] : p.input;
  if (!Array.isArray(inputs) || !inputs.length || inputs.length > 32) bad();
  const texts = inputs.map(input => string(input, 16000, 1));
  if (texts.some(t => !t.trim()) || texts.reduce((total,t) => total + t.length, 0) > 160000) bad();
  return texts;
}
