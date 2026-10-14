import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { topicReferences } from "@/data/references";
import { TransformerTeaching } from "@/components/topic/TransformerTeaching";
import { JouleThomsonTeaching } from "@/components/topic/JouleThomsonTeaching";
import { DopplerInterpretationTeaching } from "@/components/topic/DopplerInterpretationTeaching";
import { ArterialDynamicResponseTeaching } from "@/components/topic/ArterialDynamicResponseTeaching";
import { FlowRegimeTeaching } from "@/components/topic/FlowRegimeTeaching";
import { TemperatureErrorTeaching } from "@/components/topic/TemperatureErrorTeaching";

vi.mock("@/components/references/InlineRef", () => ({
  InlineRef: ({ topicId, refLabel }: { topicId: string; refLabel: string }) => {
    const ref = topicReferences[topicId]?.find((r) => r.label === refLabel);
    expect(ref?.url).toMatch(/^https:\/\//);
    if (ref?.excerpt) expect(ref.excerpt.length).toBeLessThanOrEqual(600);
    return <sup data-testid="source">{refLabel}</sup>;
  },
}));
afterEach(cleanup);

describe("Source-led physics expansion", () => {
  it.each([
    [TransformerTeaching, "Isolation is one layer of protection, not immunity from shock", "ElectricityMagnetismTopic", "TransformerTeaching"],
    [JouleThomsonTeaching, "Choose the system boundary before choosing an equation", "GasLawsTopic", "JouleThomsonTeaching"],
    [DopplerInterpretationTeaching, "Aliasing is a sampling limit, not spectral broadening", "UltrasoundPhysicsTopic", "DopplerInterpretationTeaching"],
    [ArterialDynamicResponseTeaching, "What the fast-flush test actually tells you", "PressureMeasurementTopic", "ArterialDynamicResponseTeaching"],
    [FlowRegimeTeaching, "Heliox: a physiological rationale, not a guaranteed outcome", "FlowMeasurementTopic", "FlowRegimeTeaching"],
    [TemperatureErrorTeaching, "Sensitivity, accuracy and response time are different properties", "TemperatureMeasurementTopic", "TemperatureErrorTeaching"],
  ] as const)("renders linked teaching and remains discoverable by the audit: %s", (Component, heading, page, module) => {
    render(<Component />);
    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    expect(screen.getAllByTestId("source").length).toBeGreaterThan(5);
    expect(screen.getByText(/Learning check:/)).toBeInTheDocument();
    const topic = readFileSync(`src/pages/topics/${page}.tsx`, "utf8");
    expect(topic).toContain(`from "../../components/topic/${module}"`);
    expect(topic).toContain(`<${module} />`);
  });
  it("checks the illustrative calculations without converting them into clinical guarantees", () => {
    expect(230 / 10).toBe(23);
    expect(46 / 23).toBe(2);
    expect(Math.cos(Math.PI / 3) / Math.cos(65 * Math.PI / 180)).toBeCloseTo(1.18, 2);
    expect(25 / 5).toBe(5);
    expect(Math.pow(0.5, 4)).toBe(1 / 16);
    render(<FlowRegimeTeaching />);
    expect(screen.getByText(/not a prediction of a patient’s minute ventilation/)).toBeInTheDocument();
  });
  it("retains explicit limitations rather than promising reliability", () => {
    render(<ArterialDynamicResponseTeaching />);
    expect(screen.getByText(/does not mean always reliable/)).toBeInTheDocument();
    cleanup();
    render(<JouleThomsonTeaching />);
    expect(screen.getByText(/not a reliable quantitative contents gauge/)).toBeInTheDocument();
  });
});