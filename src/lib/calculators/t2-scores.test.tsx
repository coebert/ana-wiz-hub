import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import {
  apacheII, apAge, apChronic, apCreat, apOxy, sofaResp, sofaLiver, sofaCreat, sofaRenal, sofaCv, sofa,
  news2, qsofa, type ApacheInputs, type News2Inputs,
} from "./t2-scores";
import APACHEIICalculator from "@/components/diagrams/intensive-care/APACHEIICalculator";
import SepsisScoreCalculator from "@/components/diagrams/intensive-care/SepsisScoreCalculator";

const normalApache: ApacheInputs = {
  temp: 37, map: 90, hr: 80, rr: 16, fio2: 0.21, aaO2: null, pao2: 95, ph: 7.4, na: 140, k: 4.2,
  creat: 80, acuteRenalFailure: false, hct: 40, wcc: 8, gcs: 15, age: 30, chronic: "none",
};

describe("APACHE II helper", () => {
  it("normal = 0, maximal = 71", () => {
    expect(apacheII(normalApache).total).toBe(0);
    expect(apacheII({ temp: 29, map: 40, hr: 30, rr: 4, fio2: 1, aaO2: 600, pao2: null, ph: 7.0, na: 105, k: 2, creat: 400,
      acuteRenalFailure: true, hct: 15, wcc: 0.5, gcs: 3, age: 80, chronic: "emergencyOrMedical" }).total).toBe(71);
  });
  it("age and chronic boundaries", () => {
    expect([44, 45, 54, 55, 64, 65, 74, 75].map(apAge)).toEqual([0, 2, 2, 3, 3, 5, 5, 6]);
    expect(apChronic("elective")).toBe(2);
    expect(apChronic("emergencyOrMedical")).toBe(5);
  });
  it("Féry-Lemonnier SI creatinine boundaries; ARF doubles renal only", () => {
    expect([52, 53, 132, 133, 176, 177, 308, 309].map(apCreat)).toEqual([2, 0, 0, 2, 2, 3, 3, 4]);
    const a = apacheII({ ...normalApache, creat: 200 });
    const b = apacheII({ ...normalApache, creat: 200, acuteRenalFailure: true });
    expect(a.total).toBe(3);
    expect(b.total).toBe(6);
  });
  it("FiO2 0.49 vs 0.50", () => {
    expect(apOxy(0.49, 500, 100)).toBe(0);
    expect(apOxy(0.5, 500, 100)).toBe(4);
  });
  it("blank/NaN/Infinity/impossible GCS/percent FiO2 → incomplete", () => {
    for (const bad of [null, NaN, Infinity]) expect(apacheII({ ...normalApache, ph: bad }).total).toBeNull();
    expect(apacheII({ ...normalApache, gcs: 16 }).total).toBeNull();
    expect(apacheII({ ...normalApache, gcs: 2 }).total).toBeNull();
    expect(apacheII({ ...normalApache, fio2: 40 }).total).toBeNull();
  });
});

describe("SOFA helper", () => {
  it("respiratory support", () => {
    expect([sofaResp(150, "no"), sofaResp(90, "no"), sofaResp(150, "yes"), sofaResp(90, "yes")]).toEqual([2, 2, 3, 4]);
    expect([200, 199, 100, 99].map((p) => sofaResp(p, "yes"))).toEqual([2, 3, 3, 4]);
    expect(sofaResp(150, "unknown")).toBeNull();
  });
  it("bilirubin and creatinine SI boundaries", () => {
    expect([19, 20, 32, 33, 101, 102, 204, 205].map(sofaLiver)).toEqual([0, 1, 1, 2, 2, 3, 3, 4]);
    expect([109, 110, 170, 171, 299, 300, 440, 441].map(sofaCreat)).toEqual([0, 1, 1, 2, 2, 3, 3, 4]);
  });
  it("urine alternative; worse wins", () => {
    expect([500, 499, 200, 199].map((u) => sofaRenal(80, u))).toEqual([0, 3, 3, 4]);
    expect(sofaRenal(450, 2000)).toBe(4);
    expect(sofaRenal(null, 1000)).toBeNull();
    expect(sofaRenal(80, null)).toBeNull(); // missing urine never normalised to 0
    expect(sofaRenal(441, null)).toBe(4);
    expect(sofaRenal(null, 199)).toBe(4);
    for (const u of [null, -1, NaN, Infinity]) {
      const r = sofa({ ...sofaBase, creatinine: 80, urine24h: u });
      const renal = r.breakdown.find((b) => b.key === "renal")!;
      expect(renal.points).toBeNull();
      expect(r.total).toBeNull();
      expect(renal.note).toMatch(u === null ? /not entered/ : /invalid/);
      expect(renal.note).toMatch(/lower bound/);
    }
    expect([500, 499, 200, 199].map((u) => sofa({ ...sofaBase, creatinine: 80, urine24h: u }).breakdown.find((b) => b.key === "renal")!.points)).toEqual([0, 3, 3, 4]);
    expect(sofa({ ...sofaBase, creatinine: 441, urine24h: NaN }).breakdown.find((b) => b.key === "renal")!.points).toBe(4);
    expect(sofa({ ...sofaBase, creatinine: null, urine24h: 199 }).breakdown.find((b) => b.key === "renal")!.points).toBe(4);
  });
  it("vasopressors", () => {
    const one = (a: "dopamine" | "dobutamine" | "adrenaline" | "noradrenaline", d: number | null) =>
      sofaCv(90, { [a]: { given: true, doseUgKgMin: d } }, "atLeast1h").points;
    expect([5, 5.1, 15, 15.1].map((d) => one("dopamine", d))).toEqual([2, 3, 3, 4]);
    expect([0.1, 0.1001].map((d) => one("adrenaline", d))).toEqual([3, 4]);
    expect([0.1, 0.1001].map((d) => one("noradrenaline", d))).toEqual([3, 4]);
    expect(one("dobutamine", 2)).toBe(2);
    expect(sofaCv(90, { dobutamine: { given: true, doseUgKgMin: 5 }, noradrenaline: { given: true, doseUgKgMin: 0.2 } }, "atLeast1h").points).toBe(4);
    expect(one("noradrenaline", 0)).toBeNull();
    expect(one("noradrenaline", null)).toBeNull();
    expect(sofaCv(90, { noradrenaline: { given: true, doseUgKgMin: 0.2 } }, "unknown").points).toBeNull();
    expect(sofaCv(65, { noradrenaline: { given: true, doseUgKgMin: 0.2 } }, "lessThan1h").points).toBe(1);
    expect(sofaCv(75, {}, "unknown").points).toBe(0);
    expect(sofaCv(69, {}, "unknown").points).toBe(1);
  });
  it("unknown stays incomplete", () => {
    const r = sofa({ pf: 450, respSupport: "unknown", platelets: null, bilirubin: 10, gcs: 15, map: 80, agents: {}, vasoDuration: "unknown", creatinine: 80, urine24h: null });
    expect(r.total).toBeNull();
    expect(r.missing).toContain("Coagulation (platelets)");
  });
});

const sofaBase = { pf: 450, respSupport: "no" as const, platelets: 200, bilirubin: 10, gcs: 15, map: 80, agents: {}, vasoDuration: "unknown" as const, creatinine: 80, urine24h: 1000 };
const normalNews: News2Inputs = { rr: 16, spo2: 98, onO2: false, temp: 37, sbp: 120, hr: 70, acvpu: "A", scale2Prescribed: false };
describe("NEWS2 / qSOFA helper", () => {
  it("response priority", () => {
    const rr8 = news2({ ...normalNews, rr: 8 });
    expect([rr8.total, rr8.response]).toEqual([3, "redComponent"]);
    const low = news2({ ...normalNews, rr: 21, spo2: 94 });
    expect([low.total, low.response]).toEqual([3, "low"]);
    expect(news2({ ...normalNews, rr: 25, spo2: 94, hr: 95 }).response).toBe("urgent"); // 3+1+1=5
    expect(news2({ ...normalNews, rr: 25, spo2: 94, onO2: true }).response).toBe("urgent"); // 6
    expect(news2({ ...normalNews, rr: 25, spo2: 94, onO2: true, hr: 95 }).response).toBe("emergency"); // 7
    expect(news2(normalNews).response).toBe("zero");
  });
  it("SBP, ACVPU, Scale 2, unknowns", () => {
    expect(news2({ ...normalNews, sbp: 219 }).total).toBe(0);
    expect(news2({ ...normalNews, sbp: 220 }).total).toBe(3);
    expect(news2({ ...normalNews, acvpu: "C" }).total).toBe(3);
    expect(news2({ ...normalNews, scale2Prescribed: true }).notApplicable).toBe(true);
    expect(news2({ ...normalNews, onO2: null }).total).toBeNull();
    expect(news2({ ...normalNews, rr: Infinity }).total).toBeNull();
  });
  it("qSOFA uses current GCS (<15), unknown stays incomplete", () => {
    expect([15, 14].map((g) => qsofa({ rr: 16, sbp: 120, currentGcs: g }).total)).toEqual([0, 1]);
    for (const g of [null, 2, 16, 14.5, NaN]) expect(qsofa({ rr: 16, sbp: 120, currentGcs: g }).total).toBeNull();
  });
  it("qSOFA boundaries", () => {
    expect([21, 22].map((rr) => qsofa({ rr, sbp: 120, currentGcs: 15 }).total)).toEqual([0, 1]);
    expect([100, 101].map((sbp) => qsofa({ rr: 16, sbp, currentGcs: 15 }).total)).toEqual([1, 0]);
  });
});

const FORBIDDEN = [/mortality\s*\d|\d+(\.\d+)?\s*%\s*mortality|predicted (in-hospital |hospital )?mortality/i, /frailty[- ]adjusted/i, /OR ×/,
  /comfort[- ]focused/i, /step-down/i, /ceiling of care/i, /No organ dysfunction/i, /No current evidence of sepsis/i,
  /No clinical concern/i, /start sepsis bundle/i, /3–14×/];

describe("rendered components", () => {
  it("APACHE: no mortality/frailty/treatment output; breakdown updates; FiO2 0.50 selectable; incomplete on blank", () => {
    const { container } = render(<APACHEIICalculator />);
    for (const f of FORBIDDEN) expect(container.textContent).not.toMatch(f);
    expect(container.textContent).toContain("Example values (fictional)");
    const fio2 = screen.getByLabelText(/^FiO₂/);
    fireEvent.change(fio2, { target: { value: "0.50" } });
    const aa = screen.getByLabelText(/A–a gradient/);
    fireEvent.change(aa, { target: { value: "500" } });
    const row = screen.getByText("Oxygenation (A–a gradient)").closest("tr")!;
    expect(within(row).getByText("4")).toBeTruthy();
    const creat = screen.getByLabelText(/^Creatinine/);
    fireEvent.change(creat, { target: { value: "133" } });
    expect(within(screen.getByText("Creatinine", { selector: "td" }).closest("tr")!).getByText("2")).toBeTruthy();
    fireEvent.change(screen.getByLabelText(/Arterial pH/), { target: { value: "" } });
    expect(screen.getByTestId("apache-total").textContent).toMatch(/Incomplete/);
  });
  it("Sepsis: Scale 1 restriction, zero not reassuring, no orders, incomplete on blank", () => {
    const { container } = render(<SepsisScoreCalculator />);
    for (const f of FORBIDDEN) expect(container.textContent).not.toMatch(f);
    expect(container.textContent).toContain("SpO₂ Scale 1 only");
    // default respiratory support unknown + P/F 280 → resp 2 → fine; set normal obs → NEWS2 0
    const set = (re: RegExp, v: string) => fireEvent.change(screen.getAllByLabelText(re)[0], { target: { value: v } });
    set(/Respiration rate/, "16"); set(/SpO₂/, "98"); set(/Systolic BP/, "120"); set(/Pulse/, "70"); set(/Temperature/, "37");
    fireEvent.change(screen.getByLabelText(/Air or oxygen/), { target: { value: "no" } });
    fireEvent.change(screen.getByLabelText(/ACVPU/), { target: { value: "A" } });
    expect(screen.getByTestId("total-news2").textContent).toMatch(/^0/);
    expect(screen.getByTestId("band-news2").textContent).toMatch(/does not exclude illness/);
    set(/Current GCS for qSOFA/, "15");
    expect(screen.getByTestId("total-qsofa").textContent).toMatch(/^0/);
    set(/Current GCS for qSOFA/, "14");
    expect(screen.getByTestId("total-qsofa").textContent).toMatch(/^1/);
    // NEWS2 ACVPU Alert does not determine qSOFA; worst-period SOFA GCS does not either
    set(/Worst-period GCS/, "3");
    expect(screen.getByTestId("total-qsofa").textContent).toMatch(/^1/);
    set(/Worst-period GCS/, "15");
    set(/Current GCS for qSOFA/, "15");
    expect(screen.getByTestId("total-qsofa").textContent).toMatch(/^0/);
    set(/Current GCS for qSOFA/, "");
    expect(screen.getByTestId("total-qsofa").textContent).toMatch(/Incomplete/);
    set(/Respiration rate/, "8");
    expect(screen.getByTestId("band-news2").textContent).toMatch(/medical team/);
    set(/Respiration rate/, "");
    expect(screen.getByTestId("total-news2").textContent).toMatch(/Incomplete/);
    fireEvent.click(screen.getByLabelText(/prescribed SpO₂ Scale 2/));
    expect(screen.getByTestId("band-news2").textContent).toMatch(/Not applicable/);
  });
  it("Sepsis: respiratory support control changes SOFA respiratory points", () => {
    render(<SepsisScoreCalculator />);
    fireEvent.change(screen.getByLabelText(/PaO₂\/FiO₂/), { target: { value: "90" } });
    const resp = () => within(screen.getByTestId("card-sofa")).getByText("Respiratory (P/F)").parentElement!.textContent;
    expect(resp()).toMatch(/—$/);
    fireEvent.change(screen.getByLabelText(/Respiratory support/), { target: { value: "no" } });
    expect(resp()).toMatch(/2$/);
    fireEvent.change(screen.getByLabelText(/Respiratory support/), { target: { value: "yes" } });
    expect(resp()).toMatch(/4$/);
  });
});

describe("Sepsis rendered renal completeness", () => {
  it("creatinine 80 with blank/invalid urine is incomplete; valid urine scores", () => {
    render(<SepsisScoreCalculator />);
    const set = (re: RegExp, v: string) => fireEvent.change(screen.getAllByLabelText(re)[0], { target: { value: v } });
    set(/^Creatinine/, "80");
    const renalRow = () => screen.getByText(/^Renal \(creatinine \/ urine\)/).closest("li")!;
    for (const u of ["", "-1", "NaN", "Infinity"]) {
      set(/24 h urine output/, u);
      expect(screen.getByTestId("total-sofa").textContent).toMatch(/Incomplete/);
      expect(renalRow().textContent).toMatch(/lower bound/);
    }
    for (const [u, p] of [["500", "0"], ["499", "3"], ["200", "3"], ["199", "4"]]) {
      set(/24 h urine output/, u);
      expect(renalRow().textContent!.trim().endsWith(p)).toBe(true);
    }
    set(/24 h urine output/, ""); set(/^Creatinine/, "441");
    expect(renalRow().textContent!.trim().endsWith("4")).toBe(true);
  });
});
