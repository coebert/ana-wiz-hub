import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { unchargedWeakBaseFraction, ESTER_DRUG_DISTINCTIONS, AMIDE_NAME_AID } from "@/lib/teaching-chemistry";
import { ketamineConnectionTables } from "@/components/diagrams/chemistry/ketamineConnectionTables";
import { OrganicChemistryDiagram } from "@/components/diagrams/chemistry/OrganicChemistryDiagram";
import AmineComparisonDiagram from "@/components/diagrams/chemistry/AmineComparisonDiagram";
import { organicChemistryQuiz } from "@/data/quizzes";
import { extractFaqsByPath } from "../../scripts/extract-faqs";
vi.mock("@/components/topic/TopicTemplate", () => ({ TopicTemplate: (p: any) => <>{p.keyPoints.map((x: any,i: number)=><p key={i}>{x.text}</p>)}{p.coreConcepts}</> }));
import Redox from "@/pages/topics/OxidationReductionTopic";
const mount=(C:React.ComponentType)=>render(<HelmetProvider><MemoryRouter><C /></MemoryRouter></HelmetProvider>);
afterEach(cleanup);
describe("SCI047 source-scoped amino groups",()=>{
  it("computes the given equilibrium without rounding its decision",()=>{
    expect(unchargedWeakBaseFraction(7.4,7.5)).toBeCloseTo(0.4426883662,10);
    expect(unchargedWeakBaseFraction(7.4,7.5)).toBeLessThan(0.5);
  });
  it("rejects non-finite and invalid equilibrium numbers",()=>{
    for(const [pH,pKa] of [[NaN,7.5],[7.4,Infinity],[-1,7.5],[7.4,15]]) expect(unchargedWeakBaseFraction(pH,pKa)).toBeNull();
  });
  it("actual selections put ephedrine/ketamine only in secondary, preserving other classes",()=>{
    mount(AmineComparisonDiagram);
    expect(screen.queryByText("Ketamine")).toBeNull();expect(screen.queryByText("Ephedrine")).toBeNull();expect(screen.getByText("Lidocaine")).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button',{name:'Secondary amine (R₂NH)'}));
    expect(screen.getByText("Ketamine")).toBeInTheDocument();expect(screen.getByText("Ephedrine")).toBeInTheDocument();
    expect(screen.getByText(/0.4426883662/)).toBeInTheDocument();expect(screen.queryByText("Lidocaine")).toBeNull();
    fireEvent.click(screen.getByRole('button',{name:'Quaternary amine (R₄N⁺)'}));expect(screen.getByText("Glycopyrrolate")).toBeInTheDocument();expect(screen.queryByText("Ketamine")).toBeNull();
  });
});
describe("SCI048 source-defined ketamine graph",()=>{
  for(const record of ketamineConnectionTables) it(`${record.configuration} CID ${record.cid} retains ring connectivity and source-directed stereobond`,()=>{
    const neighbour=(id:number)=>record.bonds.flatMap(b=>b.fromAtom===id?[b.toAtom]:b.toAtom===id?[b.fromAtom]:[]);
    const element=(id:number)=>record.atoms.find(a=>a.id===id)?.element;
    const nitrogen=record.atoms.find(a=>a.element==='N');expect(nitrogen).toBeDefined();if(!nitrogen)return;
    expect(neighbour(nitrogen.id).filter(id=>element(id)==='C')).toHaveLength(2);
    const centre=neighbour(nitrogen.id).find(id=>neighbour(id).length===4);expect(centre).toBeDefined();if(centre===undefined)return;
    expect(centre).toBe(record.stereocentre);
    const cl=record.atoms.find(a=>a.element==='Cl');if(!cl)throw new Error('Missing chlorine');
    expect(neighbour(cl.id)).toHaveLength(1);expect(neighbour(cl.id)).not.toContain(centre);
    const aryl=neighbour(centre).find(id=>record.bonds.some(b=>b.order===2&&(b.fromAtom===id||b.toAtom===id)) && !neighbour(id).some(n=>element(n)==='O'));
    expect(aryl).toBeDefined();if(aryl===undefined)return;
    expect(neighbour(aryl)).toContain(neighbour(cl.id)[0]); // ortho, not direct stereocentre–Cl
    // Two closed six-membered rings, one carbonyl-bearing and one alternating phenyl.
    const cycleSet=new Set<string>();
    function visit(path:number[]){for(const n of neighbour(path[path.length-1])){if(n===path[0]&&path.length===6)cycleSet.add([...path].sort((a,b)=>a-b).join(','));else if(path.length<6&&!path.includes(n))visit([...path,n]);}}
    record.atoms.forEach(a=>visit([a.id]));expect(cycleSet.size).toBe(2);
    const carbonyl=record.bonds.find(b=>b.order===2&&(element(b.fromAtom)==='O'||element(b.toAtom)==='O'));expect(carbonyl).toBeDefined();if(!carbonyl)return;
    const carbon=element(carbonyl.fromAtom)==='C'?carbonyl.fromAtom:carbonyl.toAtom;expect(neighbour(centre)).toContain(carbon);
    expect([...cycleSet].some(c=>c.split(',').map(Number).includes(carbon)&&c.split(',').map(Number).includes(centre))).toBe(true);
    const stereo=record.bonds.filter(b=>b.stereo!==0);expect(stereo).toHaveLength(1);expect(stereo[0].fromAtom).toBe(centre);expect(stereo[0].toAtom).toBe(nitrogen.id);expect(stereo[0].order).toBe(1);
    expect(stereo[0].stereo).toBe(record.configuration==='S'?6:1);
    expect(record.cid).toBe(record.configuration==='S'?182137:644025);
  });
});
describe("SCI049–051 actual group selections and quiz",()=>{
  it("ester selection retains drug-specific hydrolysis and duration distinction",()=>{
    mount(OrganicChemistryDiagram);fireEvent.click(screen.getByRole('button',{name:'Ester'}));
    expect(screen.getByText(new RegExp('Hydrolysis depends on the drug:'))).toHaveTextContent(ESTER_DRUG_DISTINCTIONS);
    expect(screen.getByText(/Hydrolysis depends/)).toHaveTextContent('Systemic elimination half-life is not block duration');
  });
  it("amide selection matches complete-name mnemonic and answer rationale",()=>{
    mount(OrganicChemistryDiagram);fireEvent.click(screen.getByRole('button',{name:'Amide'}));
    expect(screen.getByText(/More stable than esters/)).toHaveTextContent(AMIDE_NAME_AID);
    const q=organicChemistryQuiz.find(q=>q.question.includes('distinguish an ester'));expect(q).toBeDefined();if(!q)return;
    expect(q.options[q.correctIndex]).toBe("Common amide names have two letters i in the complete name, one in -caine");expect(q.explanation).toContain('classify by the amide versus ester linkage');
  });
  it("benzene selection excludes thiopentone as aromatic example",()=>{
    mount(OrganicChemistryDiagram);fireEvent.click(screen.getByRole('button',{name:'Benzene Ring'}));
    expect(screen.getByText('Propofol, midazolam')).toBeInTheDocument();expect(screen.getByText(/Thiopentone is a substituted thiobarbiturate/)).toBeInTheDocument();
  });
});
describe("SCI032 matching body and extracted FAQ",()=>{
  it("fuel-cell FAQ specifies cathodic oxygen reduction and anodic lead oxidation",()=>{
    const faq=extractFaqsByPath()['/chemistry/oxidation-reduction'].find(([q])=>q.includes('fuel cell'));expect(faq).toBeDefined();if(!faq)return;
    expect(faq[1]).toContain('oxygen is reduced at the gold cathode');expect(faq[1]).toContain('lead is oxidised at the anode');expect(faq[1]).not.toContain('consumes O₂ at a lead anode');
  });
  it("rendered redox teaching separates radical and nonradical species",()=>{
    mount(Redox);expect(screen.getByText(/Free radicals have unpaired electrons:/)).toHaveTextContent('nitric oxide');expect(screen.getByText(/nonradical reactive nitrogen species/)).toHaveTextContent('peroxynitrite');
  });
});