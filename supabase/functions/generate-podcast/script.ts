type Chat = (payload: Record<string, unknown>) => Promise<Response>;
type SourceSection = { source: string; targetWords: number };

export function scriptSections(content: string): SourceSection[] {
  const words = [...content.matchAll(/\S+/g)];
  if (!words.length) throw new Error("No source text for the podcast");
  const target = Math.max(900, Math.round(words.length * 0.35));
  const sections: SourceSection[] = [];
  let start = 0;
  while (start < words.length) {
    const first = words[start].index;
    // Use the original whole-episode word target. Balance the remaining source
    // across calls so the final section normally has a similar speaking time.
    const remaining = words.length - start;
    const count = Math.max(Math.ceil(remaining / 5500), Math.ceil((content.length - first) / 50000));
    let end = start + Math.ceil(remaining / count);
    while (end > start + 1 && words[end - 1].index + words[end - 1][0].length - first > 50000) end--;
    if (end < words.length) {
      const minimum = start + Math.ceil((end - start) * 0.82);
      // Prefer a paragraph or a complete sentence near the end of the section.
      for (let at = end; at >= minimum; at--) {
        const last = words[at - 1];
        if (/[.!?][)”"']?$/.test(last[0]) || /\n\s*\n/.test(content.slice(last.index + last[0].length, words[at].index))) {
          end = at;
          break;
        }
      }
    }
    const last = words[end - 1];
    const section = content.slice(first, last.index + last[0].length);
    const apportioned = Math.round(target * end / words.length) - Math.round(target * start / words.length);
    sections.push({source:section, targetWords:Math.max(1,apportioned)});
    start = end;
  }
  return sections;
}

function contentText(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.map(contentText).join("\n").trim();
  if (!value || typeof value !== "object") throw new Error("Script generation returned malformed content");
  const item = value as {type?:unknown;text?:unknown;content?:unknown};
  if (item.type !== undefined && item.type !== "text" && item.type !== "output_text") throw new Error("Script generation returned a non-text part");
  if (typeof item.text === "string") return item.text.trim();
  if (item.content && typeof item.content === "object" && !Array.isArray(item.content)) {
    const nested = item.content as {text?:unknown};
    if (typeof nested.text === "string") return nested.text.trim();
  }
  throw new Error("Script generation returned malformed content");
}

export async function generatePodcastScript(
  title: string, content: string,
  buildPrompt: (minutes: number, words: number) => string,
  chat: Chat,
): Promise<string> {
  const sections = scriptSections(content);
  const requests = sections.map((section, index) => {
    const minutes = Math.max(sections.length === 1 ? 6 : 1, Math.round(section.targetWords / 150));
    let system = buildPrompt(minutes, section.targetWords);
    if (sections.length > 1) {
      const opening = index === 0 ? "Give the episode opening." : "Continue directly, without an introduction.";
      const closing = index === sections.length - 1 ? "Finish the episode." : "End this section naturally, without an episode conclusion.";
      system += `\nThis is section ${index + 1} of ${sections.length} in one recording. Apply the overall episode structure across sections. ${opening} ${closing} Cover only this section's source material.`;
    }
    const prompt = `Topic: ${title}\n\n--- SOURCE CONTENT (use only this) ---\n\n${section.source}\n\n--- END SOURCE ---\n\nWrite approximately ${section.targetWords} words of spoken narration, covering this source thoroughly.`;
    const payload = { messages:[{role:"system",content:system},{role:"user",content:prompt}], max_tokens:8192 };
    if (prompt.length > 160000 || new TextEncoder().encode(JSON.stringify({operation:"chat",payload})).length > 512 * 1024) {
      throw new Error("Podcast section exceeds the AI request limit");
    }
    return payload;
  });
  const parts: string[] = [];
  for (const [index, payload] of requests.entries()) {
    // Stop before any subsequent paid section or narration if this one fails.
    const response = await chat(payload);
    if (!response.ok) {
      await response.body?.cancel();
      if (response.status === 429) throw new Error("Rate limit reached generating script. Try again in a moment.");
      if (response.status === 402) throw new Error("Base44 AI credits exhausted.");
      throw new Error(`Script generation failed (${response.status})`);
    }
    const result = await response.json();
    const choice = result?.choices?.[0];
    if (choice?.finish_reason !== "stop" || choice.message?.refusal) {
      throw new Error(`The model did not complete podcast section ${index + 1} of ${sections.length}; narration was stopped.`);
    }
    const text = contentText(choice.message?.content);
    if (!text) throw new Error("Script generation returned empty content");
    parts.push(text);
  }
  return parts.join("\n\n");
}
