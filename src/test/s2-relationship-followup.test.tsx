import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Larynx from "@/components/diagrams/anatomy/LaryngealCrossSectionDiagram";
import Cervical from "@/components/diagrams/anatomy/CervicalPlexusDiagram";
import Intercostal from "@/components/diagrams/anatomy/IntercostalAnatomyDiagram";
import Neck from "@/components/diagrams/anatomy/NeckCrossSectionDiagram";
import Pvs from "@/components/diagrams/anatomy/ParavertebralSpaceDiagram";
import Epidural from "@/components/diagrams/anatomy/EpiduralSpaceDiagram";
import { topicReferences } from "@/data/references";
afterEach(cleanup);
const mount = (C: React.ComponentType) => render(<MemoryRouter><C /></MemoryRouter>);
const number = (el: Element | null, attribute: string) => Number(el?.getAttribute(attribute));
const geometry = (svg: Element) => [...svg.querySelectorAll("path,rect,circle,ellipse,line")].map(e => [e.tagName,...["d","x","y","cx","cy","r","rx","ry","width","height","x1","y1","x2","y2"].map(a=>e.getAttribute(a))]);
const tab = (name: string) => { const b = screen.getByRole("tab",{name}); fireEvent.mouseDown(b,{button:0}); fireEvent.click(b); };
describe("S2 relationship/UI scope, no procedural certification", () => {
  for (const name of ["Coronal View", "Axial (Superior)"]) it(`SCI074 ${name} labels hide/restore without geometry loss`, () => {
    mount(Larynx); tab(name);
    const svg = screen.getByRole("tabpanel").querySelector("svg"); if (!svg) throw new Error("missing view");
    const before = geometry(svg); const labels = svg.querySelectorAll("text").length; expect(labels).toBeGreaterThan(10);
    fireEvent.click(screen.getByRole("button",{name:/Labels/})); expect(svg.querySelectorAll("text")).toHaveLength(0); expect(geometry(svg)).toEqual(before); expect(svg.querySelector("title")).not.toBeNull();
    fireEvent.click(screen.getByRole("button",{name:/Labels/})); expect(svg.querySelectorAll("text")).toHaveLength(labels);
    tab("Intrinsic Muscles"); fireEvent.click(screen.getByRole("button",{name:/Labels/})); expect(screen.getByRole("table").querySelectorAll("tbody tr")).toHaveLength(6);
  });
  it("SCI075/041 actual cervical selected panels are qualified and cited", () => {
    mount(Cervical); expect(screen.getByText(/approximate midpoint of the posterior SCM border/)).toBeInTheDocument();
    expect(screen.getByText(/supplemental local anaesthetic by the surgeon/)).toBeInTheDocument();
    expect(screen.getByText(/bilateral blocks as an adjunct to general anaesthesia/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", {name:"Phrenic N."})); expect(screen.getByText(/Reduced-volume techniques do not eliminate risk/)).toBeInTheDocument(); expect(screen.getByText(/Assess respiratory reserve/)).toBeInTheDocument();
    for(const label of ["ACEP superficial cervical plexus 2022","Syal thyroidectomy 2020","Stoneham carotid 1998"]) expect(topicReferences["head-neck-anatomy"].filter(r=>r.label===label)).toHaveLength(1);
  });
  it("SCI067/070 generated chest wall bands, ribs and VAN have separate axes", () => {
    const {container}=mount(Intercostal);
    const main=container.querySelector('svg[viewBox]'); if(!main) throw new Error("missing figure");
    const xs=["ext-intercostal","int-intercostal","innermost","endothoracic","parietal-pleura","pleural-space","visceral-pleura","lung"].map(id=>number(main.querySelector(`[data-structure="${id}"] rect`),"x")); expect(xs).toEqual([...xs].sort((a,b)=>a-b));
    const bundle=main.querySelector('[data-vessel="vein"] circle'); expect(number(bundle,"cx")).toBeGreaterThan(165); expect(number(bundle,"cx")).toBeLessThan(189);
    const ys=["vein","artery","nerve"].map(id=>number(main.querySelector(`[data-vessel="${id}"] circle`),"cy"));expect(ys).toEqual([151,174,197]);
    for(const rib of ["rib-above","rib-below"]){const r=main.querySelector(`[data-structure="${rib}"] rect`);expect(number(r,"x")+number(r,"width")).toBeLessThan(248);}
    for(const b of screen.getAllByRole("button").filter(b=>b.getAttribute("aria-pressed")!==null && b.textContent!=="Labels")){fireEvent.click(b);expect(main.querySelector('[data-selected="true"]')).not.toBeNull();}
    expect(main.querySelector('[data-part="catheter"]')).toBeNull();
  });
  it("SCI071/072 central body/canal, envelopes and danger-space geometry reconcile selections", () => {
    const {container}=mount(Neck); const q=(part:string)=>container.querySelector(`[data-part="${part}"]`);
    expect(number(q("body"),"y")+number(q("body"),"height")).toBeLessThan(number(q("cord"),"cy")-number(q("cord"),"ry"));
    expect(number(q("trachea"),"cy")).toBeLessThan(number(q("oesophagus"),"cy"));
    expect(number(q("longus-colli-left"),"cy")).toBeLessThan(number(q("body"),"y"));
    expect(q("posterior-arch")).toHaveAttribute("d","M229 305L218 342Q224 375 263 383H297Q336 375 342 342L331 305");
    expect(number(q("danger-space"),"y")).toBeGreaterThan(169); expect(number(q("danger-space"),"y")+number(q("danger-space"),"height")).toBeLessThan(192);
    fireEvent.click(screen.getByRole("button",{name:"Alar Fascia & Danger Space"}));expect(container.querySelector('[data-structure="alar"]')).toHaveAttribute("data-selected","true");
    fireEvent.click(screen.getByRole("button",{name:"Carotid Sheath"}));expect(screen.getByText(/Text-only detail/)).toBeInTheDocument();
  });
  it("SCI069 each boundary selection highlights its edge, omitted contents stay text-only", () => {
    const {container}=mount(Pvs);
    for(const [name,id] of [["Vertebral Body","medial"],["Intervertebral Foramen","medial"],["Parietal Pleura","anterolateral"],["Superior Costotransverse Ligament","posterior"]]) {fireEvent.click(screen.getByRole("button",{name}));expect(container.querySelector(`[data-boundary="${id}"]`)).toHaveAttribute("data-selected","true");}
    fireEvent.click(screen.getByRole("button",{name:"Spinal Nerve"}));expect(screen.getByText(/Text-only detail/)).toBeInTheDocument(); expect(container.querySelector('[data-boundary][data-selected="true"]')).toBeNull();
  });
  it("SCI053 inset catheter/arrow stays entirely epidural in all selected states; arachnoid explicit", () => {
    const {container}=mount(Epidural);
    for(const name of ["Epidural space (fat)","Dura mater","Subarachnoid space (CSF)","Tuohy needle (16–18G)","Lamina"]){fireEvent.click(screen.getByRole("button",{name}));
      expect(container.querySelector('[data-part="catheter-segment"]')).toHaveAttribute("d","M147 350V180Q147 152 171 127");expect(container.querySelector('[data-part="cranial-arrow"]')).toHaveAttribute("d","M160 130L175 123L171 139");
      const area=container.querySelector('[data-part="epidural-compartment"]');expect(number(area,"x")).toBe(70);expect(number(area,"width")).toBe(160);expect(175+2).toBeLessThan(number(container.querySelector('[data-part="dura"]'),"x"));
    }
    expect(container.querySelector('[data-part="arachnoid"]')).not.toBeNull();expect(screen.getByText("Subarachnoid CSF")).toBeInTheDocument();
  });
});
