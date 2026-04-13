import { useState, useEffect } from "react";

type BondType = "ionic" | "covalent" | "metallic" | "hydrogen" | "vanderwaals";

const bondInfo: Record<BondType, { title: string; description: string }> = {
  ionic: {
    title: "Ionic Bonding",
    description: "Electron transfer between atoms of very different electronegativity. Forms crystal lattices. Example: NaCl (0.9% saline). Dissolved ions conduct electricity — basis of electrolyte physiology.",
  },
  covalent: {
    title: "Covalent Bonding",
    description: "Electron sharing between atoms of similar electronegativity. Forms strong, directional bonds. Most drug molecules (propofol, sevoflurane) are covalently bonded. Double/triple bonds create rigidity in molecular structure.",
  },
  metallic: {
    title: "Metallic Bonding",
    description: "Delocalised 'sea' of electrons shared between metal cations. Explains electrical conductivity (monitoring electrodes, diathermy), thermal conductivity (laryngoscope handles), and malleability.",
  },
  hydrogen: {
    title: "Hydrogen Bonding",
    description: "Electrostatic attraction between H bonded to N/O/F and a lone pair on another N/O/F. Gives water its high boiling point, surface tension, and specific heat capacity. Critical for protein folding and DNA base pairing.",
  },
  vanderwaals: {
    title: "Van der Waals Forces",
    description: "Weak, transient dipole interactions between all molecules. Strength increases with molecular size/surface area. Explains why larger volatile agents (desflurane > sevoflurane > isoflurane) have higher boiling points.",
  },
};

export const AtomicStructureDiagram = () => {
  const [activeBond, setActiveBond] = useState<BondType>("ionic");
  const [animFrame, setAnimFrame] = useState(0);
  const [showShells, setShowShells] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setAnimFrame((f) => (f + 1) % 180), 33);
    return () => clearInterval(interval);
  }, []);

  const t = animFrame / 180;
  const osc = Math.sin(t * Math.PI * 2) * 0.5 + 0.5;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Atom model toggle */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-foreground">Atomic Structure & Bonding</h4>
        <button
          onClick={() => setShowShells(!showShells)}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
            showShells ? "bg-chemistry/10 border-chemistry text-chemistry" : "border-border text-muted-foreground"
          }`}
        >
          {showShells ? "Atom Model" : "Show Atom"}
        </button>
      </div>

      {showShells && (
        <div className="mb-6">
          <svg viewBox="0 0 400 240" className="w-full">
            {/* Sodium atom - left */}
            <g>
              <text x={100} y={20} textAnchor="middle" fontSize="12" className="fill-foreground font-semibold">Sodium (Na) — Z = 11</text>
              {/* Nucleus */}
              <circle cx={100} cy={120} r={14} fill="hsl(95 55% 38%)" opacity="0.9" />
              <text x={100} y={124} textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">11p⁺</text>
              {/* Shell 1: 2e */}
              <circle cx={100} cy={120} r={30} fill="none" stroke="hsl(95 55% 38%)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <text x={100} y={85} textAnchor="middle" fontSize="8" className="fill-muted-foreground">n=1 (2e⁻)</text>
              {[0, Math.PI].map((angle, i) => (
                <circle key={i} cx={100 + Math.cos(angle + t * Math.PI * 2) * 30} cy={120 + Math.sin(angle + t * Math.PI * 2) * 30} r={3} fill="hsl(210 70% 50%)" />
              ))}
              {/* Shell 2: 8e */}
              <circle cx={100} cy={120} r={52} fill="none" stroke="hsl(95 55% 38%)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              <text x={100} y={63} textAnchor="middle" fontSize="8" className="fill-muted-foreground">n=2 (8e⁻)</text>
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2 + t * Math.PI;
                return <circle key={i} cx={100 + Math.cos(angle) * 52} cy={120 + Math.sin(angle) * 52} r={3} fill="hsl(210 70% 50%)" />;
              })}
              {/* Shell 3: 1e (valence) */}
              <circle cx={100} cy={120} r={72} fill="none" stroke="hsl(340 60% 50%)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <text x={100} y={42} textAnchor="middle" fontSize="8" className="fill-muted-foreground">n=3 (1e⁻)</text>
              <circle cx={100 + Math.cos(t * Math.PI * 2 * 0.7) * 72} cy={120 + Math.sin(t * Math.PI * 2 * 0.7) * 72} r={4} fill="hsl(340 60% 50%)" stroke="hsl(340 60% 40%)" strokeWidth="1" />
            </g>

            {/* Chlorine atom - right */}
            <g>
              <text x={300} y={20} textAnchor="middle" fontSize="12" className="fill-foreground font-semibold">Chlorine (Cl) — Z = 17</text>
              <circle cx={300} cy={120} r={14} fill="hsl(170 50% 40%)" opacity="0.9" />
              <text x={300} y={124} textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">17p⁺</text>
              {/* Shell 1 */}
              <circle cx={300} cy={120} r={28} fill="none" stroke="hsl(170 50% 40%)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              {[0, Math.PI].map((angle, i) => (
                <circle key={i} cx={300 + Math.cos(angle + t * Math.PI * 1.8) * 28} cy={120 + Math.sin(angle + t * Math.PI * 1.8) * 28} r={3} fill="hsl(210 70% 50%)" />
              ))}
              {/* Shell 2 */}
              <circle cx={300} cy={120} r={48} fill="none" stroke="hsl(170 50% 40%)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2 + t * Math.PI * 1.2;
                return <circle key={i} cx={300 + Math.cos(angle) * 48} cy={120 + Math.sin(angle) * 48} r={3} fill="hsl(210 70% 50%)" />;
              })}
              {/* Shell 3: 7e (needs 1 more) */}
              <circle cx={300} cy={120} r={70} fill="none" stroke="hsl(340 60% 50%)" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <text x={300} y={44} textAnchor="middle" fontSize="8" className="fill-muted-foreground">n=3 (7e⁻)</text>
              {Array.from({ length: 7 }).map((_, i) => {
                const angle = (i / 7) * Math.PI * 2 + t * Math.PI * 0.8;
                return <circle key={i} cx={300 + Math.cos(angle) * 70} cy={120 + Math.sin(angle) * 70} r={3} fill="hsl(210 70% 50%)" />;
              })}
              {/* Empty slot indicator */}
              <circle cx={300 + Math.cos(Math.PI * 0.3) * 70} cy={120 + Math.sin(Math.PI * 0.3) * 70} r={5} fill="none" stroke="hsl(340 60% 50%)" strokeWidth="1" strokeDasharray="2 2" />
            </g>

            {/* Key */}
            <circle cx={160} cy={230} r={3} fill="hsl(210 70% 50%)" />
            <text x={168} y={233} fontSize="9" className="fill-muted-foreground">Electron (e⁻)</text>
            <circle cx={230} cy={230} r={4} fill="hsl(340 60% 50%)" />
            <text x={238} y={233} fontSize="9" className="fill-muted-foreground">Valence e⁻</text>
          </svg>
        </div>
      )}

      {/* Bond type selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {(Object.keys(bondInfo) as BondType[]).map((bond) => (
          <button
            key={bond}
            onClick={() => setActiveBond(bond)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              activeBond === bond
                ? "bg-chemistry/10 border-chemistry text-chemistry"
                : "border-border text-muted-foreground hover:border-chemistry/50"
            }`}
          >
            {bondInfo[bond].title.replace(" Bonding", "").replace(" Forces", "")}
          </button>
        ))}
      </div>

      {/* Bond visualization */}
      <svg viewBox="0 0 400 180" className="w-full mb-3">
        {activeBond === "ionic" && (
          <g>
            {/* Na+ losing electron → Cl- gaining it */}
            <circle cx={120} cy={90} r={28} fill="hsl(95 55% 38%)" opacity={0.15} stroke="hsl(95 55% 38%)" strokeWidth="2" />
            <text x={120} y={95} textAnchor="middle" fontSize="16" className="fill-foreground font-bold">Na⁺</text>
            
            {/* Electron transfer arrow */}
            <path d={`M 155 ${90 - osc * 20} Q 200 ${50 - osc * 30} 245 ${90 - osc * 20}`} fill="none" stroke="hsl(340 60% 50%)" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx={155 + osc * 90} cy={90 - 20 - Math.sin(osc * Math.PI) * 25} r={4} fill="hsl(340 60% 50%)" />
            <text x={200} y={42} textAnchor="middle" fontSize="9" className="fill-muted-foreground">e⁻ transfer</text>

            <circle cx={280} cy={90} r={32} fill="hsl(170 50% 40%)" opacity={0.15} stroke="hsl(170 50% 40%)" strokeWidth="2" />
            <text x={280} y={95} textAnchor="middle" fontSize="16" className="fill-foreground font-bold">Cl⁻</text>

            {/* Electrostatic attraction */}
            <line x1={148} y1={100} x2={248} y2={100} stroke="hsl(25 80% 50%)" strokeWidth="1" strokeDasharray="6 3" />
            <text x={200} y={118} textAnchor="middle" fontSize="9" className="fill-muted-foreground">Electrostatic attraction</text>

            {/* Crystal lattice hint */}
            {[[-60,0],[60,0],[0,-60],[0,60]].map(([dx,dy], i) => (
              <g key={i} opacity="0.25">
                <circle cx={200+dx*1.5} cy={90+dy*1.5} r={8} fill={i%2===0 ? "hsl(95 55% 38%)" : "hsl(170 50% 40%)"} />
              </g>
            ))}
            <text x={200} y={170} textAnchor="middle" fontSize="10" className="fill-foreground font-medium">NaCl crystal lattice — ions in solution conduct electricity</text>
          </g>
        )}

        {activeBond === "covalent" && (
          <g>
            {/* Two oxygen atoms sharing electrons */}
            <circle cx={160} cy={90} r={35} fill="hsl(210 70% 50%)" opacity={0.1} stroke="hsl(210 70% 50%)" strokeWidth="1.5" />
            <text x={135} y={95} textAnchor="middle" fontSize="14" className="fill-foreground font-bold">O</text>
            
            <circle cx={240} cy={90} r={35} fill="hsl(210 70% 50%)" opacity={0.1} stroke="hsl(210 70% 50%)" strokeWidth="1.5" />
            <text x={265} y={95} textAnchor="middle" fontSize="14" className="fill-foreground font-bold">O</text>

            {/* Shared electron pairs (double bond) */}
            <circle cx={195 + Math.sin(t * Math.PI * 4) * 5} cy={82} r={3.5} fill="hsl(340 60% 50%)" />
            <circle cx={205 + Math.sin(t * Math.PI * 4 + 1) * 5} cy={82} r={3.5} fill="hsl(95 55% 38%)" />
            <circle cx={195 + Math.sin(t * Math.PI * 4 + 2) * 5} cy={98} r={3.5} fill="hsl(340 60% 50%)" />
            <circle cx={205 + Math.sin(t * Math.PI * 4 + 3) * 5} cy={98} r={3.5} fill="hsl(95 55% 38%)" />

            {/* Bond lines */}
            <line x1={178} y1={82} x2={222} y2={82} stroke="hsl(210 70% 50%)" strokeWidth="2.5" />
            <line x1={178} y1={98} x2={222} y2={98} stroke="hsl(210 70% 50%)" strokeWidth="2.5" />

            <text x={200} y={50} textAnchor="middle" fontSize="10" className="fill-muted-foreground">Double bond: 2 shared pairs</text>
            <text x={200} y={145} textAnchor="middle" fontSize="10" className="fill-foreground font-medium">O=O — shared electrons sit between nuclei</text>
            <text x={200} y={165} textAnchor="middle" fontSize="9" className="fill-muted-foreground">Most drug molecules held together by covalent bonds</text>
          </g>
        )}

        {activeBond === "metallic" && (
          <g>
            {/* Metal cation grid */}
            {[0,1,2,3,4].map(col => [0,1,2].map(row => (
              <circle key={`${col}-${row}`} cx={100 + col * 50} cy={50 + row * 50} r={14} fill="hsl(45 70% 50%)" opacity="0.3" stroke="hsl(45 70% 50%)" strokeWidth="1.5" />
            )))}
            {[0,1,2,3,4].map(col => [0,1,2].map(row => (
              <text key={`t${col}-${row}`} x={100 + col * 50} y={54 + row * 50} textAnchor="middle" fontSize="8" className="fill-foreground font-semibold">M⁺</text>
            )))}
            {/* Delocalised electrons */}
            {Array.from({ length: 12 }).map((_, i) => {
              const px = 80 + ((i * 37 + animFrame * 1.5) % 220);
              const py = 40 + ((i * 53 + animFrame * 2.3) % 120);
              return <circle key={i} cx={px} cy={py} r={2.5} fill="hsl(210 70% 60%)" opacity="0.7" />;
            })}
            <text x={200} y={175} textAnchor="middle" fontSize="10" className="fill-foreground font-medium">Delocalised electrons → electrical & thermal conductivity</text>
          </g>
        )}

        {activeBond === "hydrogen" && (
          <g>
            {/* Water molecule 1 */}
            <circle cx={140} cy={80} r={18} fill="hsl(0 70% 55%)" opacity="0.2" stroke="hsl(0 70% 55%)" strokeWidth="1.5" />
            <text x={140} y={84} textAnchor="middle" fontSize="11" className="fill-foreground font-bold">O</text>
            <text x={140} y={68} textAnchor="middle" fontSize="7" className="fill-muted-foreground">δ⁻</text>
            <line x1={125} y1={92} x2={112} y2={108} stroke="hsl(210 70% 50%)" strokeWidth="2" />
            <circle cx={108} cy={112} r={10} fill="hsl(210 70% 50%)" opacity="0.2" stroke="hsl(210 70% 50%)" strokeWidth="1.5" />
            <text x={108} y={116} textAnchor="middle" fontSize="9" className="fill-foreground font-bold">H</text>
            <text x={98} y={120} textAnchor="middle" fontSize="7" className="fill-muted-foreground">δ⁺</text>
            <line x1={155} y1={92} x2={168} y2={108} stroke="hsl(210 70% 50%)" strokeWidth="2" />
            <circle cx={172} cy={112} r={10} fill="hsl(210 70% 50%)" opacity="0.2" stroke="hsl(210 70% 50%)" strokeWidth="1.5" />
            <text x={172} y={116} textAnchor="middle" fontSize="9" className="fill-foreground font-bold">H</text>

            {/* Hydrogen bond (dashed) */}
            <line x1={172} y1={102} x2={240} y2={80 + osc * 5} stroke="hsl(340 60% 50%)" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x={210} y={82} textAnchor="middle" fontSize="8" fill="hsl(340 60% 50%)" fontWeight="600">H-bond</text>

            {/* Water molecule 2 */}
            <circle cx={260} cy={75 + osc * 5} r={18} fill="hsl(0 70% 55%)" opacity="0.2" stroke="hsl(0 70% 55%)" strokeWidth="1.5" />
            <text x={260} y={79 + osc * 5} textAnchor="middle" fontSize="11" className="fill-foreground font-bold">O</text>
            <text x={260} y={63 + osc * 5} textAnchor="middle" fontSize="7" className="fill-muted-foreground">δ⁻</text>

            <text x={200} y={155} textAnchor="middle" fontSize="10" className="fill-foreground font-medium">H-bonds give water high bp, specific heat capacity & surface tension</text>
            <text x={200} y={170} textAnchor="middle" fontSize="9" className="fill-muted-foreground">~20 kJ/mol — much weaker than covalent (~400 kJ/mol)</text>
          </g>
        )}

        {activeBond === "vanderwaals" && (
          <g>
            {/* Two non-polar molecules with transient dipoles */}
            <ellipse cx={150} cy={90} rx={40} ry={25} fill="hsl(170 50% 40%)" opacity="0.12" stroke="hsl(170 50% 40%)" strokeWidth="1.5" />
            <text x={150} y={85} textAnchor="middle" fontSize="9" className="fill-foreground font-semibold">Molecule A</text>
            
            {/* Transient dipole indicators */}
            <text x={120 - osc * 5} y={100} textAnchor="middle" fontSize="10" fill="hsl(210 70% 50%)" fontWeight="bold">{osc > 0.5 ? "δ⁻" : ""}</text>
            <text x={180 + osc * 5} y={100} textAnchor="middle" fontSize="10" fill="hsl(340 60% 50%)" fontWeight="bold">{osc > 0.5 ? "δ⁺" : ""}</text>

            <ellipse cx={260} cy={90} rx={40} ry={25} fill="hsl(95 55% 38%)" opacity="0.12" stroke="hsl(95 55% 38%)" strokeWidth="1.5" />
            <text x={260} y={85} textAnchor="middle" fontSize="9" className="fill-foreground font-semibold">Molecule B</text>
            
            <text x={230 - osc * 5} y={100} textAnchor="middle" fontSize="10" fill="hsl(340 60% 50%)" fontWeight="bold">{osc > 0.5 ? "δ⁺" : ""}</text>
            <text x={290 + osc * 5} y={100} textAnchor="middle" fontSize="10" fill="hsl(210 70% 50%)" fontWeight="bold">{osc > 0.5 ? "δ⁻" : ""}</text>

            {osc > 0.5 && (
              <line x1={190} y1={90} x2={220} y2={90} stroke="hsl(25 80% 50%)" strokeWidth="1" strokeDasharray="3 3" opacity={osc - 0.5} />
            )}

            <text x={200} y={140} textAnchor="middle" fontSize="9" className="fill-muted-foreground">Transient dipoles form and induce dipoles in neighbours</text>
            <text x={200} y={158} textAnchor="middle" fontSize="10" className="fill-foreground font-medium">↑ Molecular weight → ↑ VdW forces → ↑ boiling point</text>
            <text x={200} y={175} textAnchor="middle" fontSize="9" className="fill-muted-foreground">Desflurane bp 23°C &lt; Sevoflurane 59°C &lt; Isoflurane 49°C</text>
          </g>
        )}
      </svg>

      {/* Info panel */}
      <div className="bg-secondary/30 rounded-xl p-4 border border-border">
        <h4 className="text-sm font-semibold text-foreground mb-1">{bondInfo[activeBond].title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{bondInfo[activeBond].description}</p>
      </div>

      {/* Electronegativity scale */}
      <div className="mt-4 bg-card rounded-xl border border-border p-4">
        <h4 className="text-xs font-semibold text-foreground mb-2">Electronegativity Scale (Pauling) — Key Elements</h4>
        <svg viewBox="0 0 400 60" className="w-full">
          {[
            { el: "Na", en: 0.93, color: "hsl(95 55% 38%)" },
            { el: "C", en: 2.55, color: "hsl(45 70% 45%)" },
            { el: "N", en: 3.04, color: "hsl(210 70% 50%)" },
            { el: "O", en: 3.44, color: "hsl(0 70% 55%)" },
            { el: "Cl", en: 3.16, color: "hsl(170 50% 40%)" },
            { el: "F", en: 3.98, color: "hsl(340 60% 50%)" },
          ].sort((a,b) => a.en - b.en).map((item, i) => {
            const x = 30 + (item.en / 4.2) * 340;
            return (
              <g key={i}>
                <line x1={x} y1={30} x2={x} y2={45} stroke={item.color} strokeWidth="2" />
                <text x={x} y={22} textAnchor="middle" fontSize="10" fill={item.color} fontWeight="bold">{item.el}</text>
                <text x={x} y={55} textAnchor="middle" fontSize="7" className="fill-muted-foreground">{item.en}</text>
              </g>
            );
          })}
          <line x1={25} y1={38} x2={385} y2={38} stroke="hsl(var(--border))" strokeWidth="1" />
          <text x={15} y={42} fontSize="7" className="fill-muted-foreground">0</text>
          <text x={390} y={42} fontSize="7" className="fill-muted-foreground">4</text>
        </svg>
        <p className="text-xs text-muted-foreground mt-1">Large ΔEN → ionic bond · Small ΔEN → covalent bond · ΔEN = 0 → pure covalent (e.g. O₂)</p>
      </div>
    </div>
  );
};
