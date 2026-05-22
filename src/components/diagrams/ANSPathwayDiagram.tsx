import { useState } from "react";
import { svgNodeProps } from "./_shared/DiagramFigure";

type View = "overview" | "sympathetic" | "parasympathetic" | "adrenal" | "enteric";

interface ViewInfo {
  id: View;
  label: string;
  color: string;
  description: string;
}

const views: ViewInfo[] = [
  { id: "overview", label: "Side-by-Side Comparison", color: "hsl(var(--foreground))",
    description: "Sympathetic pathways have short preganglionic and long postganglionic neurones. Parasympathetic pathways have long preganglionic and short postganglionic neurones. All preganglionic neurones release ACh acting on nicotinic receptors (nAChR) at the ganglion." },
  { id: "sympathetic", label: "Sympathetic Detail", color: "hsl(0 55% 50%)",
    description: "Thoracolumbar outflow T1–L2. Preganglionic cell bodies in the intermediolateral horn (IML). Short myelinated preganglionic fibres (white rami communicantes) → paravertebral sympathetic chain or prevertebral ganglia (coeliac, superior/inferior mesenteric). Long unmyelinated postganglionic fibres release noradrenaline (NA) acting on adrenoceptors (α₁, α₂, β₁, β₂, β₃). Two key exceptions to the noradrenergic postganglionic rule: (1) sweat glands receive sympathetic cholinergic (ACh → muscarinic) innervation; (2) the adrenal medulla — preganglionic fibres synapse directly on chromaffin cells (no postganglionic neurone), which release adrenaline (~80%) and noradrenaline (~20%) directly into the bloodstream (see 'Adrenal Medulla' view)." },
  { id: "parasympathetic", label: "Parasympathetic Detail", color: "hsl(210 60% 50%)",
    description: "Craniosacral outflow: CN III (Edinger-Westphal → ciliary ganglion → pupil constriction), CN VII (superior salivatory nucleus → pterygopalatine/submandibular ganglia → lacrimation/salivation), CN IX (inferior salivatory → otic ganglion → parotid), CN X (dorsal motor nucleus + nucleus ambiguus → ganglia near/within target organs → heart, lungs, GI to splenic flexure), S2–S4 (pelvic splanchnic nerves → descending colon, rectum, bladder, genitalia). Postganglionic NT = ACh → muscarinic receptors (M₁, M₂, M₃)." },
  { id: "adrenal", label: "Adrenal Medulla", color: "hsl(30 60% 50%)",
    description: "The adrenal medulla is a modified sympathetic ganglion. Preganglionic fibres (from greater splanchnic nerve, T5–T9) synapse directly on chromaffin cells — there is NO postganglionic neurone. Chromaffin cells release adrenaline (80%) and noradrenaline (20%) directly into the bloodstream. Conversion of NA → adrenaline requires PNMT (phenylethanolamine N-methyltransferase), induced by cortisol from the adjacent adrenal cortex (portal blood flow)." },
  { id: "enteric", label: "Enteric NS", color: "hsl(150 45% 45%)",
    description: "The 'third division' of the ANS. Contains ~100 million neurones — as many as the spinal cord. Two plexuses: Auerbach's (myenteric, between longitudinal and circular muscle — motility) and Meissner's (submucosal — secretion, blood flow). Can function independently but modulated by sympathetic (inhibits) and parasympathetic (excites). Uses ACh, substance P, VIP, NO, serotonin, and many other neurotransmitters." },
];

export const ANSPathwayDiagram = () => {
  const [view, setView] = useState<View>("overview");
  const info = views.find(v => v.id === view)!;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {views.map(v => (
          <button key={v.id} onClick={() => setView(v.id)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
              view === v.id ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
            }`}>{v.label}</button>
        ))}
      </div>

      <svg viewBox="0 0 560 480" className="w-full" role="img" aria-label="ANS pathway comparison diagram">
        <defs>
          <marker id="ansArrRed" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="hsl(0 55% 50%)" />
          </marker>
          <marker id="ansArrBlue" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="hsl(210 60% 50%)" />
          </marker>
          <marker id="ansArrOrange" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="hsl(30 60% 50%)" />
          </marker>
          <marker id="ansArrGrey" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="hsl(var(--muted-foreground))" opacity="0.5" />
          </marker>
        </defs>

        {/* ===== CENTRAL (Spinal Cord / Brainstem) ===== */}
        <rect x={240} y={10} width={80} height={60} rx={8}
          fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x={280} y={32} textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="700">CNS</text>
        <text x={280} y={44} textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Brainstem /</text>
        <text x={280} y={53} textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Spinal Cord</text>

        {/* ==================== SYMPATHETIC (LEFT) ==================== */}
        {(view === "overview" || view === "sympathetic" || view === "adrenal") && (
          <g opacity={view === "overview" ? 1 : view === "sympathetic" ? 1 : view === "adrenal" ? 1 : 0.2} {...svgNodeProps("Pathway 1/4: Sympathetic — T1–L2; short pre-, long post-ganglionic; noradrenaline")}>
            {/* Title */}
            <text x={120} y={22} textAnchor="middle" fontSize="10" fill="hsl(0 55% 50%)" fontWeight="700">SYMPATHETIC</text>
            <text x={120} y={34} textAnchor="middle" fontSize="7" fill="hsl(0 40% 50%)">Thoracolumbar T1–L2</text>

            {/* Origin */}
            <rect x={80} y={55} width={80} height={22} rx={4}
              fill="hsl(0 55% 50%/0.08)" stroke="hsl(0 55% 50%)" strokeWidth="0.75" />
            <text x={120} y={70} textAnchor="middle" fontSize="6.5" fill="hsl(0 55% 50%)" fontWeight="600">IML Column</text>

            {/* PREGANGLIONIC — SHORT, myelinated */}
            <line x1={120} y1={77} x2={120} y2={155} stroke="hsl(0 55% 50%)" strokeWidth="2" markerEnd="url(#ansArrRed)" />
            {/* Length label */}
            <rect x={38} y={95} width={55} height={40} rx={4}
              fill="hsl(0 55% 50%/0.06)" stroke="hsl(0 55% 50%)" strokeWidth="0.5" strokeDasharray="3 2" />
            <text x={65} y={108} textAnchor="middle" fontSize="6" fill="hsl(0 55% 50%)" fontWeight="600">SHORT</text>
            <text x={65} y={118} textAnchor="middle" fontSize="5" fill="hsl(0 40% 50%)">Myelinated</text>
            <text x={65} y={128} textAnchor="middle" fontSize="5" fill="hsl(0 40% 50%)">(B fibres)</text>

            {/* NT label: ACh → nAChR */}
            <rect x={128} y={100} width={60} height={28} rx={4}
              fill="hsl(170 50% 45%/0.1)" stroke="hsl(170 50% 45%)" strokeWidth="0.5" />
            <text x={158} y={112} textAnchor="middle" fontSize="6" fill="hsl(170 50% 45%)" fontWeight="700">ACh</text>
            <text x={158} y={122} textAnchor="middle" fontSize="5" fill="hsl(170 50% 45%)">→ nAChR</text>

            {/* GANGLION */}
            <ellipse cx={120} cy={170} rx={35} ry={15}
              fill="hsl(0 55% 50%/0.12)" stroke="hsl(0 55% 50%)" strokeWidth="1.5" />
            <text x={120} y={168} textAnchor="middle" fontSize="6" fill="hsl(0 55% 50%)" fontWeight="600">Sympathetic</text>
            <text x={120} y={177} textAnchor="middle" fontSize="5" fill="hsl(0 40% 50%)">Ganglion</text>
            {view === "sympathetic" && (
              <text x={120} y={196} textAnchor="middle" fontSize="5" fill="hsl(0 40% 50%)" opacity="0.6">(paravertebral chain / prevertebral)</text>
            )}

            {/* POSTGANGLIONIC — LONG, unmyelinated */}
            <line x1={120} y1={185} x2={120} y2={340} stroke="hsl(0 55% 50%)" strokeWidth="2" strokeDasharray="6 2" markerEnd="url(#ansArrRed)" />
            <rect x={38} y={230} width={55} height={40} rx={4}
              fill="hsl(0 55% 50%/0.06)" stroke="hsl(0 55% 50%)" strokeWidth="0.5" strokeDasharray="3 2" />
            <text x={65} y={243} textAnchor="middle" fontSize="6" fill="hsl(0 55% 50%)" fontWeight="600">LONG</text>
            <text x={65} y={253} textAnchor="middle" fontSize="5" fill="hsl(0 40% 50%)">Unmyelinated</text>
            <text x={65} y={263} textAnchor="middle" fontSize="5" fill="hsl(0 40% 50%)">(C fibres)</text>

            {/* NT label: NA → adrenoceptors */}
            <rect x={128} y={260} width={72} height={28} rx={4}
              fill="hsl(0 55% 50%/0.1)" stroke="hsl(0 55% 50%)" strokeWidth="0.5" />
            <text x={164} y={272} textAnchor="middle" fontSize="6" fill="hsl(0 55% 50%)" fontWeight="700">Noradrenaline</text>
            <text x={164} y={282} textAnchor="middle" fontSize="5" fill="hsl(0 40% 50%)">→ α₁ α₂ β₁ β₂ β₃</text>

            {/* TARGET ORGAN */}
            <rect x={80} y={345} width={80} height={28} rx={6}
              fill="hsl(0 55% 50%/0.1)" stroke="hsl(0 55% 50%)" strokeWidth="1" />
            <text x={120} y={363} textAnchor="middle" fontSize="7" fill="hsl(0 55% 50%)" fontWeight="600">Target Organ</text>

            {/* Exception: sweat glands */}
            <g opacity={view === "sympathetic" ? 0.8 : 0.5}>
              <rect x={30} y={310} width={68} height={28} rx={4}
                fill="hsl(170 50% 45%/0.08)" stroke="hsl(170 50% 45%)" strokeWidth="0.5" />
              <text x={64} y={322} textAnchor="middle" fontSize="5" fill="hsl(170 50% 45%)" fontWeight="600">Exception:</text>
              <text x={64} y={332} textAnchor="middle" fontSize="4.5" fill="hsl(170 50% 45%)">Sweat glands = ACh</text>
            </g>
          </g>
        )}

        {/* ==================== PARASYMPATHETIC (RIGHT) ==================== */}
        {(view === "overview" || view === "parasympathetic") && (
          <g opacity={1} {...svgNodeProps("Pathway 2/4: Parasympathetic — CN III, VII, IX, X + S2–S4; long pre-, short post-ganglionic; acetylcholine")}>
            <text x={440} y={22} textAnchor="middle" fontSize="10" fill="hsl(210 60% 50%)" fontWeight="700">PARASYMPATHETIC</text>
            <text x={440} y={34} textAnchor="middle" fontSize="7" fill="hsl(210 45% 50%)">Craniosacral (III,VII,IX,X + S2-4)</text>

            {/* Origin */}
            <rect x={400} y={55} width={80} height={22} rx={4}
              fill="hsl(210 60% 50%/0.08)" stroke="hsl(210 60% 50%)" strokeWidth="0.75" />
            <text x={440} y={70} textAnchor="middle" fontSize="6.5" fill="hsl(210 60% 50%)" fontWeight="600">Brainstem / S2-4</text>

            {/* PREGANGLIONIC — LONG, myelinated */}
            <line x1={440} y1={77} x2={440} y2={275} stroke="hsl(210 60% 50%)" strokeWidth="2" markerEnd="url(#ansArrBlue)" />
            <rect x={467} y={130} width={55} height={40} rx={4}
              fill="hsl(210 60% 50%/0.06)" stroke="hsl(210 60% 50%)" strokeWidth="0.5" strokeDasharray="3 2" />
            <text x={494} y={143} textAnchor="middle" fontSize="6" fill="hsl(210 60% 50%)" fontWeight="600">LONG</text>
            <text x={494} y={153} textAnchor="middle" fontSize="5" fill="hsl(210 45% 50%)">Myelinated</text>
            <text x={494} y={163} textAnchor="middle" fontSize="5" fill="hsl(210 45% 50%)">(B fibres)</text>

            {/* NT: ACh → nAChR */}
            <rect x={370} y={155} width={60} height={28} rx={4}
              fill="hsl(170 50% 45%/0.1)" stroke="hsl(170 50% 45%)" strokeWidth="0.5" />
            <text x={400} y={167} textAnchor="middle" fontSize="6" fill="hsl(170 50% 45%)" fontWeight="700">ACh</text>
            <text x={400} y={177} textAnchor="middle" fontSize="5" fill="hsl(170 50% 45%)">→ nAChR</text>

            {/* GANGLION (near/in target organ) */}
            <ellipse cx={440} cy={290} rx={40} ry={15}
              fill="hsl(210 60% 50%/0.12)" stroke="hsl(210 60% 50%)" strokeWidth="1.5" />
            <text x={440} y={288} textAnchor="middle" fontSize="6" fill="hsl(210 60% 50%)" fontWeight="600">Parasympathetic</text>
            <text x={440} y={297} textAnchor="middle" fontSize="5" fill="hsl(210 45% 50%)">Ganglion</text>
            {view === "parasympathetic" && (
              <text x={440} y={315} textAnchor="middle" fontSize="5" fill="hsl(210 45% 50%)" opacity="0.6">(near or within target organ)</text>
            )}

            {/* POSTGANGLIONIC — SHORT, unmyelinated */}
            <line x1={440} y1={305} x2={440} y2={340} stroke="hsl(210 60% 50%)" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#ansArrBlue)" />
            <rect x={467} y={310} width={55} height={40} rx={4}
              fill="hsl(210 60% 50%/0.06)" stroke="hsl(210 60% 50%)" strokeWidth="0.5" strokeDasharray="3 2" />
            <text x={494} y={323} textAnchor="middle" fontSize="6" fill="hsl(210 60% 50%)" fontWeight="600">SHORT</text>
            <text x={494} y={333} textAnchor="middle" fontSize="5" fill="hsl(210 45% 50%)">Unmyelinated</text>
            <text x={494} y={343} textAnchor="middle" fontSize="5" fill="hsl(210 45% 50%)">(C fibres)</text>

            {/* NT: ACh → mAChR */}
            <rect x={370} y={320} width={60} height={28} rx={4}
              fill="hsl(210 60% 50%/0.1)" stroke="hsl(210 60% 50%)" strokeWidth="0.5" />
            <text x={400} y={332} textAnchor="middle" fontSize="6" fill="hsl(210 60% 50%)" fontWeight="700">ACh</text>
            <text x={400} y={342} textAnchor="middle" fontSize="5" fill="hsl(210 45% 50%)">→ mAChR</text>

            {/* TARGET ORGAN */}
            <rect x={400} y={345} width={80} height={28} rx={6}
              fill="hsl(210 60% 50%/0.1)" stroke="hsl(210 60% 50%)" strokeWidth="1" />
            <text x={440} y={363} textAnchor="middle" fontSize="7" fill="hsl(210 60% 50%)" fontWeight="600">Target Organ</text>

            {/* Cranial nerve detail */}
            {view === "parasympathetic" && (
              <g opacity="0.6">
                {[
                  { y: 90, text: "CN III → ciliary ganglion → pupil (miosis)" },
                  { y: 101, text: "CN VII → pterygopalatine / submandibular → tears, saliva" },
                  { y: 112, text: "CN IX → otic ganglion → parotid gland" },
                  { y: 123, text: "CN X → heart, lungs, GI (→ splenic flexure)" },
                  { y: 134, text: "S2-4 → pelvic splanchnic → bladder, colon, genitalia" },
                ].map((l, i) => (
                  <text key={i} x={340} y={l.y} fontSize="5" fill="hsl(210 50% 50%)">{l.text}</text>
                ))}
              </g>
            )}
          </g>
        )}

        {/* ==================== ADRENAL MEDULLA ==================== */}
        {(view === "adrenal" || view === "sympathetic" || view === "overview") && (
          <g {...svgNodeProps("Pathway 3/4: Adrenal medulla — T5–T9 splanchnic → chromaffin cells; 80% adrenaline, 20% noradrenaline")}>
            {/* Preganglionic direct to adrenal */}
            <text x={370} y={60} textAnchor="middle" fontSize="9" fill="hsl(30 60% 50%)" fontWeight="700">ADRENAL MEDULLA</text>
            <text x={370} y={72} textAnchor="middle" fontSize="6" fill="hsl(30 50% 50%)">Modified sympathetic ganglion</text>

            <rect x={330} y={80} width={80} height={22} rx={4}
              fill="hsl(30 60% 50%/0.08)" stroke="hsl(30 60% 50%)" strokeWidth="0.75" />
            <text x={370} y={95} textAnchor="middle" fontSize="6" fill="hsl(30 60% 50%)" fontWeight="600">T5–T9 (IML)</text>

            {/* Long preganglionic (splanchnic nerve) */}
            <line x1={370} y1={102} x2={370} y2={210} stroke="hsl(30 60% 50%)" strokeWidth="2" markerEnd="url(#ansArrOrange)" />
            <rect x={385} y={130} width={80} height={35} rx={4}
              fill="hsl(30 60% 50%/0.06)" stroke="hsl(30 60% 50%)" strokeWidth="0.5" strokeDasharray="3 2" />
            <text x={425} y={143} textAnchor="middle" fontSize="6" fill="hsl(30 60% 50%)" fontWeight="600">Preganglionic</text>
            <text x={425} y={153} textAnchor="middle" fontSize="5" fill="hsl(30 50% 50%)">Greater splanchnic</text>
            <text x={425} y={161} textAnchor="middle" fontSize="5" fill="hsl(30 50% 50%)">nerve (ACh→nAChR)</text>

            {/* Chromaffin cells */}
            <ellipse cx={370} cy={235} rx={50} ry={25}
              fill="hsl(30 60% 50%/0.15)" stroke="hsl(30 60% 50%)" strokeWidth="1.5" />
            <text x={370} y={232} textAnchor="middle" fontSize="6.5" fill="hsl(30 60% 50%)" fontWeight="700">Chromaffin</text>
            <text x={370} y={242} textAnchor="middle" fontSize="6" fill="hsl(30 60% 50%)" fontWeight="700">Cells</text>

            {/* No postganglionic! */}
            <rect x={430} y={220} width={90} height={30} rx={4}
              fill="hsl(0 55% 50%/0.08)" stroke="hsl(0 55% 50%)" strokeWidth="0.75" />
            <text x={475} y={234} textAnchor="middle" fontSize="6" fill="hsl(0 55% 50%)" fontWeight="700">NO postganglionic</text>
            <text x={475} y={244} textAnchor="middle" fontSize="5" fill="hsl(0 40% 50%)">neurone!</text>

            {/* Release into blood */}
            <line x1={370} y1={260} x2={370} y2={310} stroke="hsl(30 60% 50%)" strokeWidth="2" markerEnd="url(#ansArrOrange)" />
            <rect x={310} y={315} width={120} height={50} rx={6}
              fill="hsl(30 60% 50%/0.1)" stroke="hsl(30 60% 50%)" strokeWidth="1" />
            <text x={370} y={332} textAnchor="middle" fontSize="7" fill="hsl(30 60% 50%)" fontWeight="700">Bloodstream</text>
            <text x={370} y={344} textAnchor="middle" fontSize="6" fill="hsl(30 50% 50%)">Adrenaline 80%</text>
            <text x={370} y={355} textAnchor="middle" fontSize="6" fill="hsl(30 50% 50%)">Noradrenaline 20%</text>

            <text x={370} y={380} textAnchor="middle" fontSize="5" fill="hsl(30 45% 50%)" opacity="0.6">
              PNMT converts NA→Adrenaline (requires cortisol from adrenal cortex)
            </text>
          </g>
        )}

        {/* ==================== ENTERIC ==================== */}
        {view === "enteric" && (
          <g {...svgNodeProps("Pathway 4/4: Enteric — Auerbach myenteric (motility); Meissner submucosal (secretion)")}>
            <text x={400} y={60} textAnchor="middle" fontSize="9" fill="hsl(150 45% 45%)" fontWeight="700">ENTERIC NERVOUS SYSTEM</text>
            <text x={400} y={72} textAnchor="middle" fontSize="6" fill="hsl(150 35% 45%)">"The Third Division" — ~100 million neurones</text>

            {/* Two plexuses */}
            <rect x={300} y={90} width={200} height={80} rx={8}
              fill="hsl(150 45% 45%/0.06)" stroke="hsl(150 45% 45%)" strokeWidth="1" />
            {/* Auerbach */}
            <rect x={310} y={100} width={85} height={55} rx={5}
              fill="hsl(150 45% 45%/0.1)" stroke="hsl(150 45% 45%)" strokeWidth="0.75" />
            <text x={352} y={115} textAnchor="middle" fontSize="6.5" fill="hsl(150 45% 45%)" fontWeight="700">Auerbach's</text>
            <text x={352} y={125} textAnchor="middle" fontSize="5.5" fill="hsl(150 35% 45%)">(Myenteric)</text>
            <text x={352} y={138} textAnchor="middle" fontSize="5" fill="hsl(150 35% 45%)">→ Motility</text>
            <text x={352} y={148} textAnchor="middle" fontSize="4.5" fill="hsl(150 35% 45%)" opacity="0.7">Between muscle layers</text>
            {/* Meissner */}
            <rect x={405} y={100} width={85} height={55} rx={5}
              fill="hsl(150 45% 45%/0.1)" stroke="hsl(150 45% 45%)" strokeWidth="0.75" />
            <text x={447} y={115} textAnchor="middle" fontSize="6.5" fill="hsl(150 45% 45%)" fontWeight="700">Meissner's</text>
            <text x={447} y={125} textAnchor="middle" fontSize="5.5" fill="hsl(150 35% 45%)">(Submucosal)</text>
            <text x={447} y={138} textAnchor="middle" fontSize="5" fill="hsl(150 35% 45%)">→ Secretion</text>
            <text x={447} y={148} textAnchor="middle" fontSize="4.5" fill="hsl(150 35% 45%)" opacity="0.7">Blood flow</text>

            {/* Modulation arrows */}
            <text x={400} y={195} textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))" fontWeight="600">Modulated by:</text>
            <text x={340} y={210} textAnchor="middle" fontSize="5.5" fill="hsl(0 50% 50%)">Sympathetic → Inhibits</text>
            <text x={460} y={210} textAnchor="middle" fontSize="5.5" fill="hsl(210 55% 50%)">Parasympathetic → Excites</text>

            {/* NTs */}
            <rect x={310} y={225} width={180} height={45} rx={5}
              fill="hsl(150 45% 45%/0.06)" stroke="hsl(150 45% 45%)" strokeWidth="0.5" />
            <text x={400} y={238} textAnchor="middle" fontSize="5.5" fill="hsl(150 45% 45%)" fontWeight="600">Neurotransmitters:</text>
            <text x={400} y={250} textAnchor="middle" fontSize="5" fill="hsl(150 35% 45%)">ACh, Substance P, VIP, NO, Serotonin (5-HT),</text>
            <text x={400} y={260} textAnchor="middle" fontSize="5" fill="hsl(150 35% 45%)">ATP, CGRP, Enkephalins, Somatostatin</text>
          </g>
        )}

        {/* ===== COMPARISON SUMMARY (overview only) ===== */}
        {view === "overview" && (
          <g>
            {/* Legend */}
            <rect x={170} y={390} width={220} height={80} rx={6}
              fill="hsl(var(--secondary))" fillOpacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.75" />
            <text x={280} y={405} textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="700">Key Comparison</text>
            <line x1={185} y1={415} x2={210} y2={415} stroke="hsl(var(--foreground))" strokeWidth="2" />
            <text x={220} y={418} fontSize="5.5" fill="hsl(var(--muted-foreground))">Preganglionic (myelinated, B fibres)</text>
            <line x1={185} y1={430} x2={210} y2={430} stroke="hsl(var(--foreground))" strokeWidth="2" strokeDasharray="6 2" />
            <text x={220} y={433} fontSize="5.5" fill="hsl(var(--muted-foreground))">Postganglionic (unmyelinated, C fibres)</text>
            <circle cx={192} cy={445} r={4} fill="hsl(170 50% 45%/0.3)" stroke="hsl(170 50% 45%)" strokeWidth="0.75" />
            <text x={220} y={448} fontSize="5.5" fill="hsl(170 50% 45%)" fontWeight="600">ACh (both ganglia)</text>
            <text x={220} y={460} fontSize="5.5" fill="hsl(var(--muted-foreground))">All preganglionic fibres release ACh → nAChR</text>

            {/* Arrows from CNS */}
            <path d="M 250 40 Q 200 40 160 55" fill="none" stroke="hsl(0 55% 50%)" strokeWidth="1" markerEnd="url(#ansArrRed)" opacity="0.5" />
            <path d="M 310 40 Q 360 40 400 55" fill="none" stroke="hsl(210 60% 50%)" strokeWidth="1" markerEnd="url(#ansArrBlue)" opacity="0.5" />
          </g>
        )}
      </svg>

      {/* Info panel */}
      <div className="rounded-lg border border-border bg-secondary/30 p-4" key={view}>
        <h4 className="text-sm font-semibold text-foreground mb-1">{info.label}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
      </div>
    </div>
  );
};
