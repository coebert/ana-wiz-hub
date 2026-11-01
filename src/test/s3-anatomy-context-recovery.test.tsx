import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { extractFaqsByPath } from "../../scripts/extract-faqs";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { spinalAnatomyQuestions, brachialPlexusQuestions, regionalAnaesthesiaQuestions, upperLimbAnatomyQuestions } from "@/data/quizzes";
import { INTERSCALENE_PHRENIC, ALLEN_LIMITATIONS } from "@/lib/anatomy-context-teaching";
import Brachial from "@/components/diagrams/anatomy/BrachialPlexusDiagram";
import Branches from "@/components/diagrams/anatomy/UpperLimbBranchesDiagram";
import Regional from "@/components/diagrams/clinical/RegionalBlocksDiagram";
const faqs = Object.values(extractFaqsByPath()).flat();
afterEach(cleanup);
const mount=(C:React.ComponentType)=>render(<HelmetProvider><MemoryRouter><C/></MemoryRouter></HelmetProvider>);
function openFaq(question:string){const pair=faqs.find(([q])=>q===question);if(!pair)throw Error("FAQ missing");render(<HelmetProvider><MemoryRouter><TopicFaqs faqs={[pair]}/></MemoryRouter></HelmetProvider>);screen.getByText('Frequently asked').closest('details')?.setAttribute('open','');fireEvent.click(screen.getByRole('button',{name:question}));return pair[1];}
describe("S3 anatomy context recovery",()=>{
 it("SCI020 intercristal choice/index and uncertainty agree",()=>{const q=spinalAnatomyQuestions.find(q=>q.question.includes('intercristal'));expect(q?.correctIndex).toBe(2);expect(q?.options[2]).toBe('L4 or L4/5 interspace');expect(q?.explanation).toContain('more cephalad');expect(q?.explanation).toContain('not a guarantee');});
 it("SCI023 actual spleen FAQ separates association and nonresponding unstable imaging",()=>{openFaq('Why is the spleen at risk from left-sided rib fractures?');expect(screen.getByText(/marker of associated splenic injury/)).toHaveTextContent('mandatory CT must not delay it');});
 it("SCI031 actual shunts FAQ separates hepatic and pulmonary bypass",()=>{openFaq('Describe the three fetal shunts and what they become postnatally.');expect(screen.getByText(/past part of the liver/)).toHaveTextContent('foramen ovale and ductus arteriosus divert blood away from fetal pulmonary circulation');});
 it("SCI034 dominance FAQ is not nodal origin equivalence",()=>{openFaq('How does coronary dominance differ from nodal artery supply?');expect(screen.getByText(/defined by posterior descending artery origin/)).toHaveTextContent('not SA nodal artery origin');});
 it("SCI035 selected posterior thigh FAQ distinguishes skin from sciatic motor supply",()=>{openFaq('What does a femoral nerve block cover, and what does it miss?');expect(screen.getByText(/posterior femoral cutaneous nerve/)).toHaveTextContent('S1–S3');});
 it("SCI035 selected foot FAQ does not assign sural border to isolated peroneal block",()=>{openFaq('Where does the sciatic nerve divide and why does that matter for popliteal block?');expect(screen.getByText(/lateral border of the foot is sural/)).toHaveTextContent('isolated peroneal block cannot be assumed');});
 it("SCI041 both quiz answers reject low-volume zero risk",()=>{for(const pool of [brachialPlexusQuestions,regionalAnaesthesiaQuestions]){const q=pool.find(q=>q.question.includes('hemidiaphragmatic'));expect(q?.correctIndex).toBe(3);expect(q?.explanation).toContain('do not eliminate risk');expect(q?.explanation).toContain('respiratory reserve');}});
 it("SCI041 actual brachial selected block retains qualified risk",()=>{const {container}=mount(Brachial);fireEvent.click(screen.getByRole("button",{name:/Block sites/}));fireEvent.click(screen.getByRole('button',{name:/Interscalene/}));expect(container).toHaveTextContent(INTERSCALENE_PHRENIC);});
 it("SCI041 actual branches block-coverage selection retains risk",()=>{const {container}=mount(Branches);fireEvent.click(screen.getByRole('button',{name:'Block coverage'}));fireEvent.click(screen.getByRole('button',{name:/Interscalene/}));expect(container).toHaveTextContent(INTERSCALENE_PHRENIC);});
 it("SCI041 regional selected pitfalls retain risk",()=>{const {container}=mount(Regional);fireEvent.click(screen.getByRole('button',{name:/Interscalene/}));expect(container).toHaveTextContent(INTERSCALENE_PHRENIC);});
 it("SCI045 FAQ and anatomy quiz preserve perfusion and conditional evidence",()=>{openFaq('Where is the radial artery best palpated for arterial line insertion and why?');expect(screen.getByText(/normal modified Allen test does not guarantee/)).toHaveTextContent('low-certainty evidence (2C)');const q=upperLimbAnatomyQuestions.find(q=>q.question.startsWith("Allen's"));expect(q?.correctIndex).toBe(1);expect(q?.explanation).toContain('normal modified Allen test cannot guarantee');expect(ALLEN_LIMITATIONS).toContain('Vascular disease or abnormal perfusion still requires assessment');});
});
