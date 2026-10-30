import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {
  burnFirstDayPlan, burnSourceScope, devineIbwKg, omeddFromOral, omeddFromPatch, oralTargetDailyMg, rchPaedsPca, sedationMlPerHour,
  exceedsTargetLimit,
} from "@/lib/calculators/t1-calculators";
import OpioidConversionCalculator from "../clinical/OpioidConversionCalculator";
import PcaEpiduralCalculator from "../clinical/PcaEpiduralCalculator";
import ParklandCalculator from "../intensive-care/ParklandCalculator";
import SedationCalculatorTool from "@/pages/tools/SedationCalculatorTool";
import { burnsIcuQuestions, burnsPlasticsQuestions } from "@/data/quizzes";

const sed = () => render(<HelmetProvider><MemoryRouter><SedationCalculatorTool /></MemoryRouter></HelmetProvider>);

describe("T1b helpers", () => {
  it("52.5 µg/h buprenorphine lookup = 126 mg; 52 no longer listed", () => {
    expect(omeddFromPatch("buprenorphine-twice-weekly", 52.5)).toBe(126);
    expect(omeddFromPatch("buprenorphine-twice-weekly", 52)).toBeNull();
  });
  it("PCA 44.9 / 45 / 45.1 kg", () => {
    expect(rchPaedsPca("morphine", 44.9)).toMatchObject({ band: "<45 kg" });
    expect(rchPaedsPca("morphine", 45)).toMatchObject({ boundary: true });
    expect(rchPaedsPca("morphine", 45.1)).toMatchObject({ band: ">45 kg" });
  });
  it("hydromorphone >45 kg gives 60–120 micrograms/h and flags the RCH parenthesis", () => {
    const r = rchPaedsPca("hydromorphone", 50) as { backgroundDose: string; flag?: string };
    expect(r.backgroundDose).toMatch(/60–120 micrograms\/h/);
    expect(r.flag).toMatch(/CPMS/);
    expect((120 / 50).toFixed(1)).toBe("2.4"); // 1.2–2.4 µg/kg/h at 50 kg
  });
  it("overflow returns null", () => {
    expect(omeddFromOral("morphine", 1e308, 24)).toBeNull();
    expect(oralTargetDailyMg(1e308, "codeine", 0)).toBeNull();
    expect(sedationMlPerHour("mg/kg/h", 1e308, 300, 1)).toBeNull();
  });
  it("arithmetic: midazolam 70 kg 2.1–14 mL/h; remifentanil 4.2–6.3 mL/h; Devine 170 cm male", () => {
    expect(sedationMlPerHour("micrograms/kg/h", 30, 70, 1000)).toBeCloseTo(2.1);
    expect(sedationMlPerHour("micrograms/kg/h", 200, 70, 1000)).toBeCloseTo(14);
    expect(sedationMlPerHour("micrograms/kg/min", 0.1, 70, 100)).toBeCloseTo(4.2);
    expect(sedationMlPerHour("micrograms/kg/min", 0.15, 70, 100)).toBeCloseTo(6.3);
    expect(devineIbwKg(170, "male")).toBeCloseTo(65.937, 3);
  });
  it("codeine/tramadol limits trigger for oxycodone 20 mg bd at 25%", () => {
    const omedd = omeddFromOral("oxycodone", 20, 2)!;
    expect(oralTargetDailyMg(omedd, "codeine", 25)).toBeCloseTo(450);
    expect(exceedsTargetLimit("codeine", 450)).toBe(true);
    expect(exceedsTargetLimit("tramadol", 450)).toBe(true);
    expect(exceedsTargetLimit("tramadol", 400)).toBe(false);
    expect(exceedsTargetLimit("morphine", 5000)).toBe(false);
  });
  it("burns: elapsed ≥24 h always expired; invalid inputs rejected first", () => {
    expect(burnFirstDayPlan(12800, 24, null)?.status).toBe("expired");
    expect(burnFirstDayPlan(12800, 24, 0)?.status).toBe("expired");
    expect(burnFirstDayPlan(12800, -1, null)?.status).toBe("invalid");
    expect(burnFirstDayPlan(12800, NaN, 0)?.status).toBe("invalid");
    expect(burnFirstDayPlan(12800, 30, -5)?.status).toBe("invalid");
    expect(burnFirstDayPlan(12800, null, Infinity)?.status).toBe("invalid");
  });
  it("burns source scope", () => {
    expect(burnSourceScope("aba-adult", "adult", 19)).not.toBeNull();
    expect(burnSourceScope("aba-adult", "adult", 20)).toBeNull();
    expect(burnSourceScope("aba-adult", "child", 30)).not.toBeNull();
    expect(burnSourceScope("nsw-modified-parkland", "adult", 20)).not.toBeNull();
    expect(burnSourceScope("nsw-modified-parkland", "adult", 21)).toBeNull();
    expect(burnSourceScope("nsw-modified-parkland", "child", 10)).not.toBeNull();
    expect(burnSourceScope("nsw-modified-parkland", "child", 11)).toBeNull();
  });
});

describe("T1b rendered", () => {
  it("remifentanil: no rates until basis chosen; IBW branch with blank/invalid height never shows actual-weight rates", () => {
    const { container } = sed();
    fireEvent.click(screen.getByRole("button", { name: /Remifentanil/ }));
    fireEvent.change(container.querySelector('input[type="number"]')!, { target: { value: "120" } });
    expect(container.textContent).toMatch(/Select the remifentanil dosing-weight basis/);
    expect(container.textContent).not.toMatch(/\d mL\/h/);
    expect(screen.queryByTestId("dose-basis")).toBeNull();
    fireEvent.change(screen.getByLabelText("Remifentanil dosing-weight basis"), { target: { value: "ibw" } });
    expect(container.textContent).toMatch(/valid height ≥152.4 cm/);
    expect(container.textContent).not.toMatch(/120 kg/);
    const h = screen.getByLabelText(/Height/);
    fireEvent.change(h, { target: { value: "150" } });
    expect(container.textContent).toMatch(/valid height/);
    fireEvent.change(h, { target: { value: "170" } });
    expect(screen.getByTestId("dose-basis").textContent).toMatch(/65\.937 kg.*ideal body weight/);
    expect(container.textContent).toContain("0.006 µg/kg/min");
    fireEvent.change(screen.getByLabelText("Remifentanil dosing-weight basis"), { target: { value: "actual" } });
    expect(screen.getByTestId("dose-basis").textContent).toMatch(/120 kg.*actual/);
  });
  it("remifentanil 70 kg actual: initial range 4.2–6.3 mL/h", () => {
    const { container } = sed();
    fireEvent.click(screen.getByRole("button", { name: /Remifentanil/ }));
    fireEvent.change(screen.getByLabelText("Remifentanil dosing-weight basis"), { target: { value: "actual" } });
    expect(container.textContent).toContain("4.2 mL/h");
    expect(container.textContent).toContain("6.3 mL/h");
  });
  it("midazolam 70 kg: 2.1–14 mL/h, no universal 'Start at'", () => {
    const { container } = sed();
    fireEvent.click(screen.getByRole("button", { name: /Midazolam/ }));
    expect(container.textContent).toContain("2.1 mL/h");
    expect(container.textContent).toContain("14 mL/h");
    expect(container.textContent).not.toMatch(/Start at\b(?! the lower end)/);
  });
  it("opioid default → codeine and tramadol warnings, no per-dose", () => {
    const { container } = render(<OpioidConversionCalculator />);
    for (const t of ["codeine", "tramadol"]) {
      fireEvent.change(screen.getByLabelText("Target oral opioid"), { target: { value: t } });
      expect(screen.getByRole("alert").textContent).toMatch(t === "codeine" ? /240 mg\/day/ : /400 mg\/day/);
      expect(screen.getByTestId("reduced-equivalent").textContent).toMatch(/Not presented/);
    }
    expect(container.textContent).not.toMatch(/Per dose/);
  });
  it("PCA 45 kg boundary message and no recipe", () => {
    const { container } = render(<PcaEpiduralCalculator />);
    fireEvent.click(screen.getByRole("button", { name: /Paediatric/ }));
    fireEvent.change(container.querySelector('input[type="number"]')!, { target: { value: "45" } });
    expect(container.textContent).toMatch(/Exactly 45 kg/);
    expect(container.textContent).not.toMatch(/in 50 mL 0.9% saline/);
  });
  it("burns: 24 h with blank or 0 fluid → expired, no first-8/next-16 cards; invalid hours → no volumes; source scope; other fluids", () => {
    const { container } = render(<ParklandCalculator />);
    const hours = screen.getByLabelText(/Hours since injury/);
    fireEvent.change(hours, { target: { value: "24" } });
    expect(container.textContent).toMatch(/first-day formula window has expired/);
    expect(container.textContent).not.toMatch(/Next 16 h|First 8 h from injury/);
    fireEvent.change(screen.getByLabelText(/Resuscitation fluid given/), { target: { value: "0" } });
    expect(container.textContent).not.toMatch(/Next 16 h|First 8 h from injury/);
    fireEvent.change(hours, { target: { value: "-3" } });
    expect(container.textContent).toMatch(/No timed volumes/);
    expect(container.textContent).not.toMatch(/Next 16 h/);
    fireEvent.change(hours, { target: { value: "" } });
    expect(container.textContent).toMatch(/Formula subtotal only/);
    expect(container.textContent).not.toMatch(/not above 250/);
    fireEvent.change(screen.getByLabelText(/Other prescribed fluids/), { target: { value: "0" } });
    expect(container.textContent).toMatch(/Ivy index check/);
    fireEvent.click(screen.getByRole("button", { name: /ABA 2024/ }));
    fireEvent.change(screen.getByLabelText(/%TBSA/), { target: { value: "15" } });
    expect(container.textContent).toMatch(/No source-specific estimate/);
    expect(container.textContent).not.toMatch(/24 h formula estimate/);
  });
});

describe("D72 quiz residuals", () => {
  it("no blanket first-24h safety or fixed end dates", () => {
    const all = JSON.stringify([...burnsIcuQuestions, ...burnsPlasticsQuestions]);
    expect(all).not.toMatch(/Sux is safe within the first 24 h|approximately 2 years|can safely be used/);
    const q = burnsIcuQuestions.find((x) => /Salisbury burns anaesthetic protocol recommends/.test(x.question))!;
    expect(q.options[q.correctIndex]).toMatch(/Avoid it after the initial 24 h/);
  });
});
