import { describe, it, expect, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { RenalAcidHandlingTeaching } from "@/components/topic/RenalAcidHandlingTeaching";
import { HepaticZonationTeaching } from "@/components/topic/HepaticZonationTeaching";
import { FoetalTransitionTeaching } from "@/components/topic/FoetalTransitionTeaching";
vi.mock("@/components/references/InlineRef", () => ({ InlineRef: ({ topicId, refLabel }: {topicId: string; refLabel: string}) => {
  if (!topicReferences[topicId]?.some(r => r.label === refLabel)) throw new Error(`Missing reference: ${refLabel}`);
  return <span>{refLabel}</span>;
} }));
const lessons = [
  { Component: RenalAcidHandlingTeaching, file: "RenalPhysiology", name: "RenalAcidHandlingTeaching", title: "Reclamation is not regeneration" },
  { Component: HepaticZonationTeaching, file: "HepaticPhysiology", name: "HepaticZonationTeaching", title: "Zonation is a gradient" },
  { Component: FoetalTransitionTeaching, file: "FoetalCirculation", name: "FoetalTransitionTeaching", title: "Birth changes preload" },
];
describe("Source-linked physiology depth", () => {
  for (const lesson of lessons) it(`${lesson.name} renders linked sources and learning check`, () => {
    const html = renderToStaticMarkup(<lesson.Component />);
    expect(html).toContain(lesson.title);expect(html).toContain("Learning check:");
    expect(html.match(/<h3/g)?.length).toBeGreaterThanOrEqual(4);
    expect(readFileSync(`src/pages/topics/${lesson.file}Topic.tsx`, "utf8")).toContain(`<${lesson.name} />`);
  });
  it("distinguishes net acid from urine pH and retains timed accounting", () => {
    const html = renderToStaticMarkup(<RenalAcidHandlingTeaching />);
    expect(html).toContain("60 mmol/day");expect(html).toContain("does not prove adequate total acid excretion");expect(html).toContain("Rh glycoproteins");
  });
  it("does not make zonation an exclusive distribution or fixed oxygen target", () => {
    const html = renderToStaticMarkup(<HepaticZonationTeaching />);
    expect(html).toContain("not fixed bedside oxygen targets");expect(html).toContain("not a diagnosis");
    expect(readFileSync("src/pages/topics/HepaticPhysiologyTopic.tsx", "utf8")).not.toContain("First affected by viral hepatitis");
  });
  it("does not use a lamb experiment as a universal human clamping instruction", () => {
    const html = renderToStaticMarkup(<FoetalTransitionTeaching />);
    expect(html).toContain("mechanistic animal evidence");expect(html).toContain("not prescribe a fixed interval");
  });
});