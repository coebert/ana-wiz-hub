import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { operations } from "@/data/operativeSteps";
import { topicReferences } from "@/data/references";
import { ACLF_CLASSIFICATION, adultAcsDefinition } from "@/lib/c4-clinical-rules";
import CLIF from "@/components/diagrams/intensive-care/CLIFCACLFDiagram";
import ALFDiagram from "@/components/diagrams/intensive-care/ALFCerebralOedemaDiagram";
import { AdrenalCrisisTreatmentTeaching, AdrenalCrisisRecoveryTeaching } from "@/components/topic/AdrenalCrisisTeaching";
import { liverDiseaseQuestions } from "@/data/quizzes";
afterEach(cleanup);
const text = (path: string) => readFileSync(path, "utf8");
const show = (node: React.ReactNode) => render(<MemoryRouter>{node}</MemoryRouter>);
const operation = (id: string) => {
  const op = operations.find(o => o.id === id);
  if (!op) throw new Error(`Missing real operation ${id}`);
  return op;
};

describe("C4 operative safety", () => {
  it("CL35 bougie remains intentionally in situ with all devices clear of jaws", () => {
    const op = operation("sleeve-gastrectomy");
    expect(op.steps[3].anaesthetic).toContain("deliberately in situ");
    expect(op.steps[3].anaesthetic).toContain("Before every firing");
    expect(op.steps[3].anaesthetic).not.toContain("Withdraw the bougie before the final");
    expect(op.criticalMoments.join(" ")).toContain("all devices clear of staple jaws");
  });
  it("CL36 distinguishes randomised agent comparisons from omission evidence", () => {
    const op = operation("adrenalectomy-phaeochromocytoma");
    expect(op.anaestheticNotes.join(" ")).toContain("PRESCRIPT");
    expect(op.anaestheticNotes.join(" ")).toContain("case-control");
    expect(op.steps[0].anaesthetic).toContain("do not establish equivalent safety");
  });
  it("CL37 placement needs sustained CO2 independently of tube depth", () => {
    const op = operation("cleft-lip-palate-repair");
    expect(op.steps[1].anaesthetic).toContain("sustained waveform capnography");
    expect(op.steps[1].anaesthetic).toContain("capnography alone cannot establish correct depth");
    expect(op.steps[2].anaesthetic).toContain("after head movement or gag placement");
  });
  it("CL38 tilt does not certify hepatic venous pressure reduction", () => {
    expect(operation("liver-resection").steps[2].anaesthetic).toContain("without necessarily reducing hepatic venous pressure");
    expect(operation("liver-resection").steps[2].anaesthetic).not.toContain("restricting fluid, head-down");
  });
});

describe("C4 liver and neonatal records", () => {
  it("CL39 excludes neonatal age alone as irradiation indication in both copies", () => {
    for (const path of ["src/pages/topics/PaediatricIcuTopic.tsx", "src/components/diagrams/clinical/PaediatricSurgicalProceduresDiagram.tsx"]) expect(text(path)).toMatch(/neonatal (age alone does not require irradiation|top-up red cells do not require irradiation solely)/i);
  });
  it("CL60 current HRS complete criteria and protected drug treatment remain", () => {
    const s = text("src/pages/topics/AcuteLiverFailureTopic.tsx");
    expect(s).toContain("cirrhosis with ascites"); expect(s).toContain("≤0.5 mL/kg/h for ≥6 h");
    expect(s).toContain("within 24 h"); expect(s).not.toContain("Failure to respond to albumin volume expansion confirms");
    expect(s).toContain("Structural injury"); expect(s).not.toContain("3–90 days");
    expect(s).toContain("maximum of 12 mg/24 h"); expect(s).toContain("maximum 14-day course");
    expect(s).toContain("2009 regeneration warning comes from mice");
    expect(liverDiseaseQuestions.find(q => q.question.includes("ADQI–ICA"))?.explanation).toContain("not day 4 alone");
  });
  it("CL61 grade3 alone is not futility in rendered figure", () => {
    show(<CLIF />);
    expect(screen.getByText(/grade alone is not futility/)).toBeInTheDocument();
    expect(screen.getByText(/≥4 organ failures OR CLIF-C ACLF >70/)).toBeInTheDocument();
    expect(screen.queryByText(/90% mortality/)).not.toBeInTheDocument();
  });
  it("CL62 shared complete single-brain exceptions and HE alternatives", () => {
    expect(ACLF_CLASSIFICATION[0].description).toContain("isolated brain failure with creatinine <1.5 mg/dL");
    expect(ACLF_CLASSIFICATION[1].description).toContain("isolated brain failure with creatinine 1.5–1.9 mg/dL");
    expect(ACLF_CLASSIFICATION[1].description).toContain("and/or HE grade I–II");
    show(<CLIF />); for (const grade of ACLF_CLASSIFICATION) expect(screen.getByText(grade.description)).toBeInTheDocument();
  });
  it("CL63/64/67 clicked cascade distinguishes rescue, referral and mitochondrial hypothesis", () => {
    show(<ALFDiagram />);
    fireEvent.click(screen.getByRole("tab", { name: /ICP/ }));
    expect(screen.getByText(/Avoid routine prophylactic forced hyperventilation/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: /Astrocyte glutamine/ }));
    expect(screen.getByText(/glutaminase releases ammonia/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: /Herniation/ }));
    expect(screen.getByText(/some patients recover with their native liver/)).toBeInTheDocument();
  });
  it("D89 keeps DOI and correct Yang R55 mouse-study attribution", () => {
    const r = topicReferences["acute-liver-failure"].find(r => r.label === "NAC Prolonged 2009");
    expect(r?.citation).toContain("Yang R, Miki K, He X, Killeen ME, Fink MP");
    expect(r?.citation).toContain("13(2):R55"); expect(r?.url).toBe("https://doi.org/10.1186/cc7782");
  });
});

describe("CL65 adult ACS definition independent of treatment trial", () => {
  it.each([[19.999,false],[20,false],[20.001,true]])("IAP%s threshold%s", (iap, result) => expect(adultAcsDefinition(iap,true,true)).toBe(result));
  it("requires sustained pressure and new dysfunction; invalid stays unknown", () => {
    expect(adultAcsDefinition(24,false,true)).toBe(false); expect(adultAcsDefinition(24,true,false)).toBe(false); expect(adultAcsDefinition(NaN,true,true)).toBeNull();
  });
});

describe("CL66 current NICE adrenal treatment and recovery", () => {
  it("renders1L30min with further response-guided saline and dated historical quote", () => {
    show(<AdrenalCrisisTreatmentTeaching />);
    expect(screen.getByText(/1 litre 0.9% sodium chloride IV over 30 minutes/)).toBeInTheDocument();
    expect(screen.getByText(/not a fixed target/)).toBeInTheDocument();
  });
  it("stress dosing has minimums, pred10 exception and vomiting escalation", () => {
    show(<AdrenalCrisisRecoveryTeaching />);
    expect(screen.getByText(/at least 40 mg oral hydrocortisone daily in 2–4/)).toBeInTheDocument();
    expect(screen.getByText(/≥10 mg\/day need no additional/)).toBeInTheDocument();
    expect(screen.getByText(/repeat at double the original dose/)).toBeInTheDocument();
    expect(screen.getByText(/Inability to absorb oral glucocorticoids/)).toBeInTheDocument();
  });
});

it("all scoped C4 citation mappings resolve", () => {
  for (const [id, labels] of Object.entries({ "adrenal-crisis":["NICE NG243 2024 fluids","NICE NG243 2024 sick day","NICE NG243 2024 vomiting"], "acute-liver-failure":["ADQI–ICA HRS 2024","ADQI–ICA RRT 2024","EASL ACLF 2023","NHS GGC ALF referral"], "operative-steps":["PRESCRIPT 2020","Alpha blockade comparison 2022","RCoA sustained CO2 PUMA","Liver tilt pressures 2011"], "paediatric-icu":["BSH Irradiation 2020","NHS GGC Neonatal transfusion"] })) for (const label of labels) expect(topicReferences[id].find(r => r.label === label)?.url, `${id}/${label}`).toMatch(/^https:/);
});