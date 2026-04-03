import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MaplesonTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Mapleson Classification</h3>
    <p className="text-sm text-muted-foreground">
      Semi-open breathing circuits classified A–F by arrangement of fresh gas flow (FGF), reservoir bag, expiratory valve, and tubing.
    </p>
    <svg viewBox="0 0 400 420" className="w-full max-w-md mx-auto">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Mapleson A–F Circuits</text>

      {/* Mapleson A (Magill) */}
      <g transform="translate(0,25)">
        <text x="15" y="18" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">A (Magill)</text>
        <rect x="80" y="5" width="280" height="30" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* FGF at bag end */}
        <circle cx="95" cy="20" r="8" fill="#10B981" opacity="0.3" stroke="#10B981" strokeWidth="1.5" />
        <text x="95" y="24" textAnchor="middle" fontSize="6" fill="#10B981" fontWeight="bold">FGF</text>
        {/* Reservoir bag */}
        <ellipse cx="125" cy="20" rx="12" ry="8" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="125" y="23" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">Bag</text>
        {/* Tubing */}
        <line x1="137" y1="20" x2="310" y2="20" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />
        {/* APL valve at patient end */}
        <rect x="310" y="10" width="18" height="20" rx="3" fill="hsl(var(--destructive)/0.2)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="319" y="23" textAnchor="middle" fontSize="5" fill="hsl(var(--destructive))">APL</text>
        {/* Patient */}
        <circle cx="348" cy="20" r="10" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <text x="348" y="23" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))">Pt</text>
      </g>

      {/* Mapleson B */}
      <g transform="translate(0,85)">
        <text x="15" y="18" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">B</text>
        <rect x="80" y="5" width="280" height="30" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <ellipse cx="95" cy="20" rx="12" ry="8" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="95" y="23" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">Bag</text>
        <line x1="107" y1="20" x2="310" y2="20" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />
        {/* FGF near patient */}
        <circle cx="310" cy="20" r="8" fill="#10B981" opacity="0.3" stroke="#10B981" strokeWidth="1.5" />
        <text x="310" y="24" textAnchor="middle" fontSize="6" fill="#10B981" fontWeight="bold">FGF</text>
        <rect x="322" y="10" width="18" height="20" rx="3" fill="hsl(var(--destructive)/0.2)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="331" y="23" textAnchor="middle" fontSize="5" fill="hsl(var(--destructive))">APL</text>
        <circle cx="355" cy="20" r="10" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <text x="355" y="23" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))">Pt</text>
      </g>

      {/* Mapleson C */}
      <g transform="translate(0,145)">
        <text x="15" y="18" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">C (Waters)</text>
        <rect x="80" y="5" width="280" height="30" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <ellipse cx="95" cy="20" rx="12" ry="8" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="95" y="23" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">Bag</text>
        <circle cx="130" cy="20" r="8" fill="#10B981" opacity="0.3" stroke="#10B981" strokeWidth="1.5" />
        <text x="130" y="24" textAnchor="middle" fontSize="6" fill="#10B981" fontWeight="bold">FGF</text>
        <rect x="142" y="10" width="18" height="20" rx="3" fill="hsl(var(--destructive)/0.2)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="151" y="23" textAnchor="middle" fontSize="5" fill="hsl(var(--destructive))">APL</text>
        {/* Short tubing */}
        <line x1="160" y1="20" x2="330" y2="20" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />
        <circle cx="348" cy="20" r="10" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <text x="348" y="23" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))">Pt</text>
      </g>

      {/* Mapleson D (Bain) */}
      <g transform="translate(0,205)">
        <text x="15" y="18" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">D (Bain)</text>
        <rect x="80" y="5" width="280" height="30" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* FGF near patient (inner tube) */}
        <line x1="95" y1="20" x2="330" y2="20" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />
        <line x1="95" y1="20" x2="330" y2="20" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4,2" />
        <text x="200" y="16" textAnchor="middle" fontSize="5" fill="#10B981">FGF inner tube →</text>
        <rect x="88" y="10" width="18" height="20" rx="3" fill="hsl(var(--destructive)/0.2)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="97" y="23" textAnchor="middle" fontSize="5" fill="hsl(var(--destructive))">APL</text>
        <ellipse cx="120" cy="20" rx="12" ry="8" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="120" y="23" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">Bag</text>
        <circle cx="348" cy="20" r="10" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <text x="348" y="23" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))">Pt</text>
      </g>

      {/* Mapleson E (Ayre's T-piece) */}
      <g transform="translate(0,265)">
        <text x="15" y="18" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">E (T-piece)</text>
        <rect x="80" y="5" width="280" height="30" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <circle cx="310" cy="20" r="8" fill="#10B981" opacity="0.3" stroke="#10B981" strokeWidth="1.5" />
        <text x="310" y="24" textAnchor="middle" fontSize="6" fill="#10B981" fontWeight="bold">FGF</text>
        <line x1="95" y1="20" x2="300" y2="20" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />
        <text x="200" y="28" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">Open expiratory limb (no valve, no bag)</text>
        <circle cx="348" cy="20" r="10" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <text x="348" y="23" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))">Pt</text>
      </g>

      {/* Mapleson F (Jackson-Rees) */}
      <g transform="translate(0,325)">
        <text x="15" y="18" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">F (J-Rees)</text>
        <rect x="80" y="5" width="280" height="30" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <circle cx="310" cy="20" r="8" fill="#10B981" opacity="0.3" stroke="#10B981" strokeWidth="1.5" />
        <text x="310" y="24" textAnchor="middle" fontSize="6" fill="#10B981" fontWeight="bold">FGF</text>
        <line x1="95" y1="20" x2="300" y2="20" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />
        <ellipse cx="110" cy="20" rx="12" ry="8" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="110" y="23" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">Bag</text>
        <text x="140" y="28" fontSize="5" fill="hsl(var(--muted-foreground))">Open-tail bag</text>
        <circle cx="348" cy="20" r="10" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <text x="348" y="23" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))">Pt</text>
      </g>

      {/* Efficiency summary */}
      <rect x="20" y="370" width="360" height="42" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="386" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Most Efficient: Spontaneous = A &gt; D,E,F &gt; C &gt; B</text>
      <text x="200" y="402" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Most Efficient: Controlled = D,E,F &gt; B &gt; C &gt; A</text>
    </svg>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Points</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Mapleson A (Magill)</strong>: most efficient for spontaneous ventilation; FGF ≈ MV (≈70 mL/kg/min)</li>
        <li><strong>Mapleson D (Bain)</strong>: coaxial circuit; most efficient for controlled ventilation; FGF ≈ 70–100 mL/kg/min (2–3× MV)</li>
        <li><strong>Mapleson E (Ayre's T-piece)</strong>: no valves/bag → minimal resistance → ideal for neonates/infants</li>
        <li><strong>Mapleson F (Jackson-Rees)</strong>: T-piece + open-tail bag → allows IPPV in children</li>
        <li>All Mapleson circuits are <strong>semi-open</strong> (no rebreathing by design) and require high FGF</li>
      </ul>
    </div>
  </div>
);

const CircleTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Circle Breathing System</h3>
    <svg viewBox="0 0 400 340" className="w-full max-w-md mx-auto">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Circle System with CO₂ Absorber</text>

      {/* Circle path */}
      <ellipse cx="200" cy="170" rx="140" ry="110" fill="none" stroke="hsl(var(--primary)/0.3)" strokeWidth="8" />

      {/* Inspiratory valve */}
      <rect x="60" y="85" width="50" height="25" rx="5" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" />
      <text x="85" y="101" textAnchor="middle" fontSize="7" fill="#10B981" fontWeight="bold">Insp. V</text>
      <text x="85" y="78" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Unidirectional</text>

      {/* Expiratory valve */}
      <rect x="290" y="85" width="50" height="25" rx="5" fill="hsl(var(--destructive)/0.2)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
      <text x="315" y="101" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">Exp. V</text>

      {/* Patient - Y-piece at top */}
      <rect x="175" y="55" width="50" height="20" rx="4" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1" />
      <text x="200" y="69" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Y-piece</text>
      <circle cx="200" cy="42" r="12" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <text x="200" y="46" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))">Pt</text>

      {/* CO₂ absorber at bottom */}
      <rect x="155" y="250" width="90" height="40" rx="8" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2">
        <animate attributeName="fill-opacity" values="0.1;0.25;0.1" dur="3s" repeatCount="indefinite" />
      </rect>
      <text x="200" y="268" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">CO₂ Absorber</text>
      <text x="200" y="282" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">(Soda lime)</text>

      {/* FGF inlet */}
      <circle cx="200" cy="215" r="10" fill="#10B981" opacity="0.3" stroke="#10B981" strokeWidth="1.5" />
      <text x="200" y="219" textAnchor="middle" fontSize="6" fill="#10B981" fontWeight="bold">FGF</text>
      <text x="230" y="220" fontSize="6" fill="hsl(var(--muted-foreground))">Fresh gas inlet</text>

      {/* APL valve */}
      <rect x="280" y="200" width="40" height="20" rx="4" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
      <text x="300" y="214" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))" fontWeight="bold">APL</text>

      {/* Reservoir bag */}
      <ellipse cx="115" cy="230" rx="20" ry="14" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="115" y="234" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))" fontWeight="bold">Bag</text>

      {/* Flow arrows */}
      <path d="M 110 95 L 175 65" stroke="#10B981" strokeWidth="1.5" markerEnd="url(#bcArrowG)" fill="none" />
      <path d="M 225 65 L 290 95" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#bcArrowR)" fill="none" />

      {/* Advantages box */}
      <rect x="10" y="300" width="380" height="35" rx="6" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="315" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">Low-flow anaesthesia: FGF as low as 0.5 L/min (closed circuit)</text>
      <text x="200" y="328" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Conserves volatile agents • Humidifies gas • Reduces theatre pollution</text>

      <defs>
        <marker id="bcArrowG" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
        </marker>
        <marker id="bcArrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--destructive))" />
        </marker>
      </defs>
    </svg>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Circle System Components</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>7 components</strong>: FGF inlet, inspiratory & expiratory unidirectional valves, Y-piece, APL valve, reservoir bag, CO₂ absorber</li>
        <li><strong>Unidirectional valves</strong> prevent rebreathing and ensure one-way flow through the circle</li>
        <li>Allows <strong>low-flow</strong> (0.5–1 L/min) and <strong>minimal-flow</strong> (&lt;0.5 L/min) anaesthesia</li>
        <li><strong>Advantages</strong>: conserves volatile agents, warms & humidifies inspired gas, reduces environmental pollution</li>
        <li><strong>Disadvantages</strong>: bulky, high resistance, risk of compound A (sevoflurane + desiccated soda lime), valve malfunction</li>
      </ul>
    </div>
  </div>
);

const SodaLimeTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Soda Lime & CO₂ Absorption</h3>
    <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">CO₂ Absorption Chemistry</text>

      {/* Canister */}
      <rect x="130" y="30" width="140" height="120" rx="10" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="200" y="50" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">Soda Lime Canister</text>

      {/* Granules */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = 145 + (i % 5) * 25;
        const y = 65 + Math.floor(i / 5) * 20;
        return <circle key={i} cx={x} cy={y} r="6" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary)/0.4)" strokeWidth="0.5" />;
      })}

      {/* Indicator colour change */}
      <circle cx="170" cy="125" r="6" fill="#E879F9" stroke="#A855F7" strokeWidth="1" />
      <circle cx="195" cy="125" r="6" fill="#E879F9" stroke="#A855F7" strokeWidth="1" />
      <text x="200" y="145" textAnchor="middle" fontSize="7" fill="#A855F7" fontWeight="bold">Exhausted → purple/violet</text>

      {/* Gas flow */}
      <path d="M 200 155 L 200 170" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#slDown)" />

      {/* Reactions */}
      <rect x="20" y="170" width="360" height="90" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="200" y="188" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Chemical Reactions</text>

      <text x="200" y="206" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">CO₂ + H₂O → H₂CO₃</text>
      <text x="200" y="222" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">H₂CO₃ + 2NaOH → Na₂CO₃ + 2H₂O + Heat</text>
      <text x="200" y="238" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">Na₂CO₃ + Ca(OH)₂ → CaCO₃ + 2NaOH</text>
      <text x="200" y="254" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">NaOH regenerated • Ca(OH)₂ consumed • Net: CO₂ → CaCO₃ + H₂O + Heat</text>

      {/* Composition */}
      <rect x="20" y="270" width="170" height="25" rx="6" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="105" y="286" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Ca(OH)₂ 80% + NaOH 4% + H₂O 14%</text>

      <rect x="210" y="270" width="170" height="25" rx="6" fill="#F59E0B" fillOpacity="0.08" stroke="#F59E0B" strokeOpacity="0.3" strokeWidth="1" />
      <text x="295" y="286" textAnchor="middle" fontSize="7" fill="#F59E0B" fontWeight="bold">Exothermic: ΔT up to 40-60°C</text>

      <defs>
        <marker id="slDown" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 5 10 L 10 0 z" fill="hsl(var(--foreground))" />
        </marker>
      </defs>
    </svg>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Soda Lime Key Facts</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Composition</strong>: Ca(OH)₂ ~80%, NaOH ~4%, KOH ~1%, water ~14%, silica (hardener), indicator dye</li>
        <li><strong>Granule size</strong>: 4–8 mesh (too fine → ↑ resistance; too coarse → ↓ surface area)</li>
        <li><strong>Indicator</strong>: ethyl violet (white → purple when exhausted); may reverse colour overnight ("regeneration")</li>
        <li><strong>Exothermic reaction</strong>: produces heat (beneficial — warms inspired gas) and water (humidifies)</li>
        <li><strong>Capacity</strong>: ~26 L CO₂ per 100g; typically lasts 6–8 hours at normal FGF</li>
        <li><strong>Compound A</strong>: sevoflurane + desiccated soda lime → nephrotoxic fluoromethyl-2,2-difluoro-1-vinyl ether</li>
        <li><strong>Carbon monoxide</strong>: desflurane + desiccated soda lime (especially baralyme/KOH) → CO production</li>
        <li><strong>Calcium hydroxide lime</strong> (Amsorb®): NaOH/KOH-free → no compound A or CO; less reactive</li>
      </ul>
    </div>
  </div>
);

const ScavengingTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Scavenging Systems</h3>
    <svg viewBox="0 0 400 280" className="w-full max-w-md mx-auto">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Anaesthetic Gas Scavenging System (AGSS)</text>

      {/* Patient circuit → collecting */}
      <rect x="30" y="40" width="80" height="35" rx="6" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="1" />
      <text x="70" y="58" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">APL / Vent</text>
      <text x="70" y="68" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">exhaust port</text>

      <path d="M 110 57 L 150 57" stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#scavArrow)" />

      {/* Collecting system */}
      <rect x="150" y="35" width="80" height="45" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="190" y="55" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">Collecting</text>
      <text x="190" y="67" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">30mm connector</text>
      <text x="190" y="77" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">(not 22mm!)</text>

      <path d="M 230 57 L 270 57" stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#scavArrow)" />

      {/* Transfer system */}
      <rect x="270" y="35" width="60" height="45" rx="8" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="300" y="55" textAnchor="middle" fontSize="7" fill="#F59E0B" fontWeight="bold">Transfer</text>
      <text x="300" y="67" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Tubing</text>

      <path d="M 300 80 L 300 110" stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#scavDown)" />

      {/* Receiving / reservoir */}
      <rect x="250" y="115" width="100" height="50" rx="8" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="300" y="135" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">Receiving</text>
      <text x="300" y="148" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Reservoir bag</text>
      <text x="300" y="160" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">(open-ended)</text>

      <path d="M 300 165 L 300 195" stroke="hsl(var(--foreground))" strokeWidth="2" markerEnd="url(#scavDown)" />

      {/* Disposal */}
      <rect x="240" y="200" width="120" height="50" rx="8" fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
      <text x="300" y="220" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">Disposal</text>
      <text x="300" y="235" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Active (fan/pump)</text>
      <text x="300" y="245" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">or Passive (to outside)</text>

      {/* Active vs Passive comparison */}
      <rect x="20" y="110" width="200" height="140" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="120" y="128" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Active vs Passive</text>

      <rect x="30" y="135" width="85" height="55" rx="6" fill="#10B981" fillOpacity="0.08" stroke="#10B981" strokeOpacity="0.3" strokeWidth="1" />
      <text x="73" y="150" textAnchor="middle" fontSize="7" fill="#10B981" fontWeight="bold">Active</text>
      <text x="73" y="162" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Fan/pump driven</text>
      <text x="73" y="174" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Negative pressure</text>
      <text x="73" y="186" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">More reliable</text>

      <rect x="125" y="135" width="85" height="55" rx="6" fill="#6366F1" fillOpacity="0.08" stroke="#6366F1" strokeOpacity="0.3" strokeWidth="1" />
      <text x="168" y="150" textAnchor="middle" fontSize="7" fill="#6366F1" fontWeight="bold">Passive</text>
      <text x="168" y="162" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Vents to outside</text>
      <text x="168" y="174" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">No power needed</text>
      <text x="168" y="186" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Wind-dependent</text>

      <text x="120" y="210" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">⚠ Safety valves prevent</text>
      <text x="120" y="222" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">±0.5 cmH₂O pressure</text>
      <text x="120" y="234" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">transmission to patient</text>

      {/* COSHH limits */}
      <rect x="20" y="255" width="360" height="20" rx="4" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="269" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">COSHH limits: N₂O &lt;100 ppm (8hr TWA) • Volatiles &lt;50 ppm</text>

      <defs>
        <marker id="scavArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--foreground))" />
        </marker>
        <marker id="scavDown" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 5 10 L 10 0 z" fill="hsl(var(--foreground))" />
        </marker>
      </defs>
    </svg>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Scavenging Key Facts</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>4 components</strong>: collecting (30mm connector), transfer (tubing), receiving (reservoir), disposal (active/passive)</li>
        <li><strong>30mm connector</strong>: distinguished from 22mm/15mm breathing circuit connectors to prevent misconnection</li>
        <li><strong>Safety valves</strong>: positive and negative pressure relief valves prevent barotrauma (±0.5 cmH₂O)</li>
        <li><strong>Active</strong>: uses fan or piped vacuum; more reliable; requires flow rate 75 L/min</li>
        <li><strong>Passive</strong>: vents directly to outside atmosphere; wind-dependent; simpler</li>
        <li><strong>COSHH limits</strong>: N₂O &lt;100 ppm (8hr TWA), halogenated agents &lt;50 ppm</li>
      </ul>
    </div>
  </div>
);

const BreathingCircuitsDiagram = () => {
  const [activeTab, setActiveTab] = useState("mapleson");

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="mapleson" className="text-xs">Mapleson</TabsTrigger>
          <TabsTrigger value="circle" className="text-xs">Circle</TabsTrigger>
          <TabsTrigger value="sodalime" className="text-xs">Soda Lime</TabsTrigger>
          <TabsTrigger value="scavenging" className="text-xs">Scavenging</TabsTrigger>
        </TabsList>
        <TabsContent value="mapleson"><MaplesonTab /></TabsContent>
        <TabsContent value="circle"><CircleTab /></TabsContent>
        <TabsContent value="sodalime"><SodaLimeTab /></TabsContent>
        <TabsContent value="scavenging"><ScavengingTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default BreathingCircuitsDiagram;
