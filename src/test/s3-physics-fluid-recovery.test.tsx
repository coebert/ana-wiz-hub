import {afterEach,describe,it,expect,vi} from 'vitest';
import {render,screen,fireEvent,cleanup} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {protonLarmor,arterialFundamental,STARLING_STEADY,STARLING_BARRIER,STARLING_ANP,STARLING_FLUID,UK_WORKER_DOSE,MAINSTREAM_CAPABILITIES} from '@/lib/physics-fluid-teaching';
import MRI from '@/components/diagrams/physics/MRIPhysicsDiagram';
import Glycocalyx from '@/components/diagrams/physiology/GlycocalyxDiagram';
import {ultrasoundPhysicsQuiz,ventilationPerfusionQuestions,starlingForcesQuestions,mriPhysicsQuiz} from '@/data/quizzes';
vi.mock('@/components/topic/TopicTemplate',()=>({TopicTemplate:(p:any)=><>{p.keyPoints?.map((q:any,i:number)=><p key={i}>{q.text}</p>)}{p.workedExamples?.map((e:any,i:number)=><div key={i}>{e.scenario}{e.working}{e.answer}</div>)}{p.coreConcepts}</>}));
import Starling from '@/pages/topics/StarlingForcesTopic';
const mount=(C:React.ComponentType)=>render(<HelmetProvider><MemoryRouter><C/></MemoryRouter></HelmetProvider>);
afterEach(cleanup);
describe('SCI027/029 numerical units',()=>{
 it('120/min is 2 Hz and tenth harmonic 20 Hz, not equipment clearance',()=>{expect(arterialFundamental(120)).toBe(2);expect((arterialFundamental(120)??0)*10).toBe(20);expect(arterialFundamental(NaN)).toBeNull();});
 it('1.5/3 T cyclic frequencies and angular units',()=>{expect(protonLarmor(1.5)?.frequencyHz).toBe(63.87e6);expect(protonLarmor(3)?.frequencyHz).toBe(127.74e6);expect(protonLarmor(3)?.angularRadPerSecond).toBeCloseTo(2*Math.PI*127.74e6);expect(protonLarmor(-1)).toBeNull();});
 it('actual MRI spin/relaxation states retain distinct units and sequence-dependent fat',()=>{mount(MRI);expect(screen.getByText(/angular frequency is 2π/)).toBeInTheDocument();fireEvent.click(screen.getByRole('tab',{name:'T1/T2 Relaxation'}));expect(screen.getByText(/fat signal depends on the pulse sequence/)).toBeInTheDocument();expect(screen.queryByText('Fat = DARK')).toBeNull();});
});
describe('SCI026/039 quiz-only repairs',()=>{
 it('A-lines correct option includes health and pneumothorax; B-lines are contextual',()=>{const a=ultrasoundPhysicsQuiz.find(q=>q.question.startsWith('A-lines'));expect(a?.correctIndex).toBe(3);expect(a?.options[3]).toContain('Both normally aerated lung and pneumothorax');const b=ultrasoundPhysicsQuiz.find(q=>q.question.startsWith('B-lines'));expect(b?.correctIndex).toBe(1);expect(b?.explanation).toContain('no single universal per-space cutoff');});
 it('shunt equation retained, response not universally futile',()=>{const q=ventilationPerfusionQuestions.find(q=>q.question.startsWith('Which equation'));expect(q?.explanation).toContain('Qs/Qt = (CcO₂ − CaO₂) / (CcO₂ − CvO₂)');expect(q?.explanation).toContain('Whole-arterial response varies');});
});
describe('SCI028/030 scope',()=>{
 it('routine 20 calendar-year and separate approved eye/special limits',()=>{expect(UK_WORKER_DOSE).toContain('20 mSv in any calendar year');expect(UK_WORKER_DOSE).toContain('regulation 12(2)');expect(UK_WORKER_DOSE).toContain('100 mSv over five consecutive');expect(UK_WORKER_DOSE).toContain('maximum 50 mSv');});
 it('mainstream is not CO2-only capability',()=>{expect(MAINSTREAM_CAPABILITIES).toContain('mainstream multigas analysers also exist');});
});
describe('SCI044 coherent revised model',()=>{
 it('rendered topic exposes steady/transient/specialised and shared evidence without bolus promise',()=>{const {container}=mount(Starling);const text=container.textContent??'';for(const s of [STARLING_STEADY,STARLING_BARRIER,STARLING_ANP,STARLING_FLUID])expect(text).toContain(s);expect(text).not.toContain('directly cleaves glycocalyx');expect(text).not.toContain('avoid glycocalyx damage from excessive');});
 it('intact and damage states retain limitations rather than universal zero/protective treatment',async()=>{mount(Glycocalyx);expect(screen.getByText(/Subglycocalyx protein concentration/)).toBeInTheDocument();fireEvent.click(screen.getByRole('tab',{name:'Shedding & Oedema'}));expect((await screen.findByText('Clinical interpretation:')).parentElement).toHaveTextContent(STARLING_FLUID);});
 it('quiz answers retain model without exclusive lymphatics/direct ANP claims',()=>{expect(starlingForcesQuestions[1].options[1]).toBe('Predominantly via lymphatics in most tissues');expect(starlingForcesQuestions[1].explanation).toBe(STARLING_STEADY);expect(starlingForcesQuestions[3].explanation).toBe(STARLING_ANP);expect(mriPhysicsQuiz[0].explanation).toContain('rad/s');});
});
