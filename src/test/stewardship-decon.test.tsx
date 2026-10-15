import { render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { topicReferences } from "@/data/references";
import { StewardshipTrialsTeaching } from "@/components/topic/StewardshipTrialsTeaching";
import { MassCasualtyDecontaminationTeaching } from "@/components/topic/MassCasualtyTeaching";
vi.mock("@/components/references/InlineRef", () => ({ default: ({ refLabel }: { refLabel: string }) => <span>{refLabel}</span>, InlineRef: ({ refLabel }: { refLabel: string }) => <span>{refLabel}</span> }));
afterEach(cleanup);
const norm = (s: string) => s.replace(/[“”"]/g, "").replace(/\s+/g, " ").trim();
describe.each([[StewardshipTrialsTeaching, "antimicrobials-pharm"], [MassCasualtyDecontaminationTeaching, "mass-casualty-military"]] as const)("%o", (Lesson, topic) => {
  it("quotes verbatim and resolves sources", () => {
    const { container } = render(<MemoryRouter><Lesson /></MemoryRouter>);
    expect(container.textContent).toContain("Learning check:");
    expect(container.textContent).toContain("Sources for this lesson");
    expect(container.textContent).not.toContain("is missing from the topic list");
    for (const q of container.querySelectorAll("blockquote")) {
      const c = q.cloneNode(true) as HTMLElement; c.querySelectorAll("span").forEach(s => s.remove());
      const t = norm(c.textContent!);
      expect(topicReferences[topic].some(r => r.excerpt && norm(r.excerpt) === t), t).toBe(true);
    }
  });
});
