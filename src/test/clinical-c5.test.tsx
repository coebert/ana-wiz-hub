import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { WATERFALL_OUTCOMES, glasgowPrediction, PANCREATITIS_FLUIDS, PANCREATITIS_NUTRITION, PANCREATITIS_INFECTION, PANCREATITIS_SOURCE_CONTROL, HTG_MANAGEMENT } from "@/lib/pancreatitis-clinical-rules";
import Waterfall from "@/components/diagrams/intensive-care/WaterfallFluidDiagram";
import Glasgow from "@/components/diagrams/intensive-care/GlasgowImrieScoreDiagram";
import CT from "@/components/diagrams/intensive-care/SeverePancreatitisCTDiagram";
import { acutePancreatitisQuestions } from "@/data/quizzes";
import { topicReferences } from "@/data/references";
import { extractFaqsByPath } from "../../scripts/extract-faqs";
afterEach(cleanup);
const show = (node: React.ReactNode) => render(<MemoryRouter>{node}</MemoryRouter>);
const page = () => readFileSync("src/pages/topics/AcutePancreatitisTopic.tsx", "utf8");

describe("C5 pancreatitis clinical regressions", () => {
  it("CL68 early overload review precedes later checks; arm is not maintenance or shock protocol", () => {
    expect(PANCREATITIS_FLUIDS).toContain("3 ±1 hours");
    expect(PANCREATITIS_FLUIDS).toContain("not an automatic maintenance prescription");
    expect(PANCREATITIS_FLUIDS).toContain("excluded baseline shock/respiratory failure");
    expect(PANCREATITIS_FLUIDS).toContain("baseline eGFR <60");
    expect(PANCREATITIS_FLUIDS).toContain("Reduce or stop fluid for overload");
    expect(acutePancreatitisQuestions[1].explanation).toBe(PANCREATITIS_FLUIDS);
  });
  it("CL69 concrete group outcomes and uncertainty remain", () => {
    expect(WATERFALL_OUTCOMES.map(o => [o.aggressive,o.moderate])).toEqual([[20.5,6.3],[22.1,17.3],[6,5],[6.6,1.6]]);
    expect(WATERFALL_OUTCOMES.map(o => o.demonstratedIncrease)).toEqual([true,false,false,false]);
    show(<Waterfall />);
    expect(screen.getByText("5 days")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^Aggressive$/ }));
    expect(screen.getByText("6 days")).toBeInTheDocument();
    expect(screen.getByText("6.6%" )).toBeInTheDocument();
    expect(screen.getByText(/0.56–12.88/)).toBeInTheDocument();
  });
  it("CL70 PYTHON population/comparator not TPN; general feeding differs from HTG fasting", () => {
    expect(PANCREATITIS_NUTRITION).toContain("208 high-predicted-risk patients");
    expect(PANCREATITIS_NUTRITION).toContain("30% vs 27%");
    expect(PANCREATITIS_NUTRITION).toContain("69%");
    expect(PANCREATITIS_NUTRITION).toContain("not TPN");
    expect(PANCREATITIS_NUTRITION).toContain("initial 48-hour fast");
    expect(PANCREATITIS_NUTRITION).toContain("vomiting, ileus or obstruction");
    expect(acutePancreatitisQuestions[5].explanation).toBe(PANCREATITIS_NUTRITION);
  });
  it("CL71 treats suspicion and separates early drainage from delayed debridement", () => {
    expect(PANCREATITIS_INFECTION).toContain("do not wait for gas or positive FNA");
    expect(PANCREATITIS_SOURCE_CONTROL).toContain("including within 2 weeks");
    expect(PANCREATITIS_SOURCE_CONTROL).toContain("Drainage and debridement are different decisions");
    show(<CT />);fireEvent.click(screen.getByRole("button", { name: "Gas bubbles: suspect infection" }));
    expect(screen.getByText(/Gas strongly suggests infection, but can also reflect enteric fistula/)).toBeInTheDocument();
  });
  it("CL72 resolves corrected primary identities, not pouchitis/cervical-spine/RV", () => {
    const refs = topicReferences["acute-pancreatitis"];
    expect(refs.find(r => r.label === "BJA Educ 2008")?.url).toBe("https://doi.org/10.1093/bjaceaccp/mkn020");
    expect(refs.find(r => r.label === "HTG insulin protocol 2023")?.citation).toContain("J Pharm Technol. 2023;39(2):55–61");
    expect(refs.some(r => ["BSG 2024","AGA 2024"].includes(r.label))).toBe(false);
    expect(page()).toContain("no recommendation between normal saline and Ringer’s lactate");
  });
  it("CL73 diagnostic early CT and AKI emergency exception remain", () => {
    expect(page()).toContain("earlier diagnostic CT may be indicated for uncertainty");
    expect(page()).toContain("do not delay essential emergency imaging solely for renal impairment");
    expect(page()).not.toContain("Repeat CECT</strong> at 7–10 days");
  });
  it("CL74 score2 does not diagnose mild disease; score3 only predicts", () => {
    expect(glasgowPrediction(2)).toBe("Below prediction threshold; continue clinical reassessment");
    expect(glasgowPrediction(3)).toBe("Predicts a potentially severe course; assess organ failure and complications");
    expect(glasgowPrediction(9)).toBe("Invalid score");
    show(<Glasgow />);expect(screen.getByText(/Below prediction threshold/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /PaO₂ < 8 kPa/ }));
    fireEvent.click(screen.getByRole("button", { name: /Age > 55 years/ }));
    fireEvent.click(screen.getByRole("button", { name: /Calcium < 2.0/ }));
    expect(screen.getByText(/Score 3 \/ 8 — Predicts a potentially severe course/)).toBeInTheDocument();
  });
  it("CL74 clicked effusion is BISAP not Glasgow criterion", () => {
    show(<CT />);fireEvent.click(screen.getByRole("button", { name: "Left pleural effusion" }));
    expect(screen.getByText(/Pleural effusion is a BISAP variable/)).toBeInTheDocument();
  });
  it("CL75 EPIPAN retained with analgesia versus systemic endpoints", () => {
    expect(page()).toContain("148 enrolled,135 analysed");
    expect(page()).toContain("no difference in ventilator-free days");
    expect(page()).toContain("secondary result, not definitive proof of harm");
    expect(page()).not.toContain("no large RCT");
  });
  it("CL76 no blanket anticoagulation or absolute never-treat splenic rule", () => {
    expect(page()).toContain("iLATAM-AP 2026 also considers progressive splenic thrombosis");
    expect(page()).toContain("No current bleeding alone is insufficient");
    expect(page()).not.toContain("anticoagulate if no bleeding");
  });
  it("D96 exact reviewed selection/monitoring statements and no automatic threshold", () => {
    expect(HTG_MANAGEMENT[0].detail).toContain("Endocrine Society2020 advises against routine insulin without diabetes");
    expect(HTG_MANAGEMENT[0].detail).toContain("0.1–0.3 units/kg/h range is not a universal prescription");
    expect(HTG_MANAGEMENT[1].detail).toContain("a triglyceride value alone is not an automatic indication");
    expect(HTG_MANAGEMENT[2].detail).toContain("recurrence-prevention target, not proof");
    expect(HTG_MANAGEMENT[2].detail).toContain("LMWH for less than 3 days");
    expect(page()).not.toContain("extreme levels &gt;22.6");
  });
  it("generated FAQ retains corrected nutrition/infection and HTG distinction", () => {
    const faq = extractFaqsByPath()["/intensive-care/acute-pancreatitis"];
    expect(faq).toHaveLength(3);
    expect(faq[1][1]).toContain("initial 48-hour fast");
    expect(faq[1][1]).toContain("not TPN");
    expect(faq[2][1]).toBe(PANCREATITIS_INFECTION);
  });
});