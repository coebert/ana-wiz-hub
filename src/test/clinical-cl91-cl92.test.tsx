import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { WorkedExamples } from "@/components/topic/WorkedExamples";
import { POST_ARREST_ECPR_TRIALS, POST_ARREST_VENTILATION, POST_ARREST_CO2 } from "@/components/topic/PostArrestReviewedFacts";
import { SCI_MAP_2024, CMD_INTERPRETATION } from "@/components/topic/NeuroIcuReviewedFacts";
import Prog from "@/components/diagrams/intensive-care/PostCardiacArrestProgDiagram";
import Cmd from "@/components/diagrams/intensive-care/CerebralMicrodialysisDiagram";
import Ecpr from "@/components/diagrams/intensive-care/EcprDecisionTreeDiagram";
import { extractFaqsByPath } from "../../scripts/extract-faqs";
import { topicReferences } from "@/data/references";
import { cardiacArrestPostResusQuestions } from "@/data/quizzes";
vi.mock("@/components/topic/TopicTemplate",()=>({TopicTemplate: (props: any)=><><WorkedExamples examples={props.workedExamples} topicId={props.topicId}/><div>{props.keyPoints?.map((p:any,i:number)=><p key={i}>{typeof p==='string'?p:p.text}</p>)}</div>{props.coreConcepts}</>}));
import Cardiac from "@/pages/topics/CardiacArrestPostResusTopic";
import Neuro from "@/pages/topics/NeurointensiveCareTopic";
afterEach(cleanup);
const mount=(C:React.ComponentType)=>render(<HelmetProvider><MemoryRouter><C/></MemoryRouter></HelmetProvider>);
describe("CL91 current post-arrest source scope",()=>{
 it("actual worked cases preserve arithmetic but remove automatic pressor/angiography/withdrawal/eligibility",()=>{
  const {container}=mount(Cardiac);const cases=container.querySelectorAll('#worked-examples > div > div');expect(cases.length).toBe(4);
  const first=cases[0].textContent;expect(first).toContain("TV 550 mL at PBW 70 kg is 7.9 mL/kg");expect(first).toContain("4.7–6.0 kPa");expect(first).toContain("Do not prescribe a fixed vasopressor escalation");expect(first).toContain("VF as the original rhythm alone");
  expect(cases[1].textContent).toContain("motor < 6");expect(cases[1].textContent).toContain("36 h without sedation alone does not establish drug clearance");expect(cases[1].textContent).toContain("does not automatically determine withdrawal");
  expect(cases[2].textContent).toContain("if accepted");expect(cases[2].textContent).toContain("should not delay initial restoration");
 });
 it("extracted FAQ answers remain complete and identical to shared reviewed facts",()=>{
  const faqs=extractFaqsByPath()['/intensive-care/cardiac-arrest-post-resus'];expect(faqs).toBeDefined();expect(faqs.map(f=>f[1])).toContain(POST_ARREST_ECPR_TRIALS);expect(faqs.map(f=>f[1])).toContain(POST_ARREST_VENTILATION);
  expect(POST_ARREST_CO2).toBe("4.7–6.0 kPa");expect(faqs.map(f=>f[1]).join(' ')).not.toContain('GCS motor ≤ 3');
 });
 it("selected ≥72 h / clinical / NSE / SSEP panels actually show current boundaries",()=>{
  mount(Prog);fireEvent.click(screen.getByRole('button',{name:/2 ≥72 h/}));expect(screen.getByText(/Consider current RCUK 2025/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:/Clinical Examination/}));expect(screen.getByText(/GCS motor < 6 at ≥ 72 h is the current consideration/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:/Biomarkers/}));expect(screen.getByText(/rising values can add information but are not a substitute/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:/Somatosensory Evoked/}));expect(screen.getByText(/Consider neuromuscular blockade to reduce artefact/)).toBeInTheDocument();
 });
 it("all checklist answers including adverse profile never issue clearance or exclusion",()=>{
  mount(Ecpr);for(const name of ['Yes','VF / pulseless VT','≤ 5 min','< 60 min','≥ 10 mmHg (1.3 kPa)','Age < 70, good baseline, no major comorbidity'])fireEvent.click(screen.getByRole('button',{name,exact:true}));
  expect(screen.getByText('Educational pathway checklist — specialist decision required')).toBeInTheDocument();expect(screen.queryByText('ECPR candidate',{exact:true})).toBeNull();
  fireEvent.click(screen.getByRole('button',{name:'No / unknown',exact:true}));expect(screen.getByText(/do not establish eligibility or exclusion/)).toBeInTheDocument();expect(screen.queryByText('Not an eCPR candidate',{exact:true})).toBeNull();
 });
 it("actual quiz answer values agree with current targets, motor entry and NSE scope",()=>{
  const q=cardiacArrestPostResusQuestions.find(q=>q.question.includes('ventilation target'));expect(q?.options[q.correctIndex]).toBe('SpO₂ 94–98 % and PaCO₂ 4.7–6.0 kPa');
  const n=cardiacArrestPostResusQuestions.find(q=>q.question.includes('Neuron-specific'));expect(n?.options[n.correctIndex]).toContain('48 h and/or 72 h');expect(n?.explanation).not.toContain('OR a rising trend');
 });
});
describe("CL92 denervation/SCI/CMD scope",()=>{
 it("actual SCI and microdialysis worked cases do not prescribe fixed window or CPP/Hb intervention",()=>{
  const {container}=mount(Neuro);const cases=container.querySelectorAll('#worked-examples > div > div');expect(cases.length).toBe(4);
  expect(cases[2].textContent).toContain('fixed calendar interval does not prove safety');expect(cases[2].textContent).not.toContain('Avoid suxamethonium between 48 h');
  expect(cases[3].textContent).toContain('CPP is already 70 mmHg');expect(cases[3].textContent).toContain('transfusing to a fixed Hb solely');expect(container.textContent).toContain(SCI_MAP_2024);
 });
 it("all five selected CMD profiles remain contextual not treatment predictions",()=>{
  const {container}=mount(Cmd);for(const name of ['Normal','Ischaemia','Mitochondrial','Neuroglycopenia','Excitotoxic']){fireEvent.click(screen.getByRole('button',{name,exact:true}));expect(container.textContent).not.toContain('Do NOT escalate CPP further');expect(container.textContent).not.toContain('Liberalise systemic glucose target');expect(container.textContent).toContain(CMD_INTERPRETATION);}
  expect(container.textContent).toContain('METABOLIC WARNING');
 });
 it("named source pools resolve uniquely without borrowing BTF for SCI",()=>{
  for(const [topic,labels] of Object.entries({'cardiac-arrest-post-resus':['RCUK PRC 2025','RCUK PRC Algorithm March 2026','ELSO ECPR 2021','ARREST 2020','Prague OHCA 2022','INCEPTION 2023'],'neurointensive-care':['AO Spine haemodynamics 2024','Suxamethonium SmPC denervation','CMD Forum 2014','CMD Delphi 2025','MG consensus 2016']}))for(const label of labels){const refs=topicReferences[topic].filter(r=>r.label===label);expect(refs).toHaveLength(1);expect(refs[0].url).toMatch(/^https:\/\//);}
 });
});
