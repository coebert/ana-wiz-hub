import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Agent = "sevoflurane" | "desflurane" | "isoflurane" | "halothane" | "n2o";

const agents: { key: Agent; label: string }[] = [
  { key: "sevoflurane", label: "Sevoflurane" },
  { key: "desflurane", label: "Desflurane" },
  { key: "isoflurane", label: "Isoflurane" },
  { key: "halothane", label: "Halothane" },
  { key: "n2o", label: "N₂O" },
];

const info: Record<Agent, { name: string; formula: string; mw: string; features: string[] }> = {
  sevoflurane: {
    name: "Sevoflurane",
    formula: "C₄H₃F₇O", mw: "200.1",
    features: [
      "Fluorinated methyl isopropyl ether",
      "7 fluorine atoms — no chlorine or bromine → minimal organ toxicity",
      "Fluoromethyl group (CHF₂–O–) on one side of ether linkage",
      "Trifluoromethyl groups on isopropyl side → chemical stability",
      "Compound A produced by reaction with soda lime (difluoromethyl vinyl ether)",
      "BP 58.6°C, MAC 2.0% — pleasant smell, good for inhalational induction",
    ],
  },
  desflurane: {
    name: "Desflurane",
    formula: "C₃H₂F₆O", mw: "168.0",
    features: [
      "Fluorinated methyl ethyl ether — structurally similar to isoflurane",
      "6 fluorine atoms, NO chlorine (unlike isoflurane which has one Cl)",
      "Replacement of Cl with F → lower blood:gas solubility (0.42) → fastest wash-in/out",
      "BP 23.5°C — close to room temperature, requires heated pressurised vaporizer (TEC 6)",
      "MAC 6.0% — least potent modern volatile. High vapour pressure (669 mmHg at 20°C)",
      "Airway irritant — not suitable for inhalational induction",
    ],
  },
  isoflurane: {
    name: "Isoflurane",
    formula: "C₃H₂ClF₅O", mw: "184.5",
    features: [
      "Fluorinated methyl ethyl ether — structural isomer of enflurane",
      "5 fluorine atoms + 1 chlorine atom",
      "Chlorine atom on the terminal carbon (CHCl–F group)",
      "Ether linkage (C–O–C) is the structural backbone",
      "BP 48.5°C, MAC 1.15%. Blood:gas coefficient 1.46",
      "Pungent smell — causes airway irritation, unsuitable for gas induction",
      "Resistant to biodegradation — very low hepatic metabolism (<0.2%)",
    ],
  },
  halothane: {
    name: "Halothane",
    formula: "C₂HBrClF₃", mw: "197.4",
    features: [
      "Halogenated ethane (NOT an ether — no C–O–C linkage)",
      "Contains bromine, chlorine, AND fluorine — unique among modern agents",
      "Bromine atom → makes it a potent myocardial sensitiser to catecholamines",
      "Only 2 carbon atoms — simplest volatile anaesthetic structure",
      "20% hepatic metabolism → immune-mediated 'halothane hepatitis' (1:35,000)",
      "BP 50.2°C, MAC 0.75%. Non-pungent — pleasant for inhalational induction in children",
      "Thymol preservative required (prevents decomposition by light)",
    ],
  },
  n2o: {
    name: "Nitrous Oxide (N₂O)",
    formula: "N₂O", mw: "44.0",
    features: [
      "Linear triatomic molecule: N≡N⁺–O⁻ (resonance structures)",
      "NOT an ether — inorganic compound, simplest anaesthetic gas",
      "MAC 104% — cannot produce full anaesthesia at 1 atm alone",
      "Blood:gas solubility coefficient 0.47 — rapid onset/offset",
      "34× more soluble than N₂ → second gas effect and diffusion hypoxia",
      "Oxidises cobalt in vitamin B₁₂ → megaloblastic anaemia with prolonged use",
      "Critical temperature 36.5°C — stored as liquid in blue cylinders",
    ],
  },
};

const SevofluraneSVG = () => (
  <g transform="translate(60,30)">
    {/* Central ether oxygen */}
    <text x="180" y="90" textAnchor="middle" className="fill-destructive text-[14px] font-bold">O</text>
    {/* Left side: CHF2 */}
    <line x1="165" y1="85" x2="130" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="110" y="90" textAnchor="middle" className="fill-foreground text-[11px] font-medium">CHF₂</text>
    {/* Right side: C(CF3)2H */}
    <line x1="195" y1="85" x2="230" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="240" y="90" textAnchor="middle" className="fill-foreground text-[11px] font-medium">CH</text>
    {/* CF3 groups */}
    <line x1="245" y1="82" x2="280" y2="55" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="300" y="52" textAnchor="middle" className="fill-primary text-[11px] font-bold">CF₃</text>
    <line x1="245" y1="90" x2="280" y2="115" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="300" y="120" textAnchor="middle" className="fill-primary text-[11px] font-bold">CF₃</text>
    {/* Fluorine highlight */}
    <text x="180" y="150" textAnchor="middle" className="fill-accent text-[9px]">7 fluorine atoms — no Cl or Br</text>
  </g>
);

const DesfluraneSVG = () => (
  <g transform="translate(60,30)">
    {/* F2HC — O — CHF — CF3 */}
    <text x="80" y="90" textAnchor="middle" className="fill-foreground text-[12px] font-medium">F₂HC</text>
    <line x1="105" y1="85" x2="135" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="150" y="90" textAnchor="middle" className="fill-destructive text-[14px] font-bold">O</text>
    <line x1="165" y1="85" x2="195" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="215" y="90" textAnchor="middle" className="fill-foreground text-[12px] font-medium">CHF</text>
    <line x1="235" y1="85" x2="265" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="290" y="90" textAnchor="middle" className="fill-primary text-[12px] font-bold">CF₃</text>
    {/* Annotation */}
    <text x="185" y="130" textAnchor="middle" className="fill-accent text-[9px]">6 F atoms, no Cl — lowest blood:gas (0.42)</text>
    <text x="185" y="148" textAnchor="middle" className="fill-muted-foreground text-[8.5px]">cf. isoflurane: CHF₂–O–CHCl–CF₃ (Cl replaces F)</text>
  </g>
);

const IsofluraneSVG = () => (
  <g transform="translate(60,30)">
    {/* F2HC — O — CHCl — CF3 */}
    <text x="80" y="90" textAnchor="middle" className="fill-foreground text-[12px] font-medium">F₂HC</text>
    <line x1="105" y1="85" x2="135" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="150" y="90" textAnchor="middle" className="fill-destructive text-[14px] font-bold">O</text>
    <line x1="165" y1="85" x2="195" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="218" y="90" textAnchor="middle" className="fill-foreground text-[12px] font-medium">CHCl</text>
    <line x1="240" y1="85" x2="270" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="290" y="90" textAnchor="middle" className="fill-primary text-[12px] font-bold">CF₃</text>
    {/* Chlorine highlight */}
    <rect x="202" y="98" width="30" height="16" rx="3" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent))" strokeWidth="1" />
    <text x="217" y="110" textAnchor="middle" className="fill-accent text-[8px] font-bold">Cl</text>
    <text x="185" y="140" textAnchor="middle" className="fill-accent text-[9px]">Cl at terminal carbon → cf. desflurane has F here</text>
  </g>
);

const HalothaneSVG = () => (
  <g transform="translate(60,30)">
    {/* CF3 — CHBrCl  (2 carbons only, no ether!) */}
    <text x="130" y="90" textAnchor="middle" className="fill-primary text-[13px] font-bold">CF₃</text>
    <line x1="155" y1="85" x2="195" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="210" y="90" textAnchor="middle" className="fill-foreground text-[12px] font-medium">CH</text>
    {/* Br going up */}
    <line x1="215" y1="78" x2="215" y2="50" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="215" y="42" textAnchor="middle" className="fill-accent text-[13px] font-bold">Br</text>
    {/* Cl going down */}
    <line x1="215" y1="95" x2="215" y2="122" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="215" y="136" textAnchor="middle" className="fill-accent text-[13px] font-bold">Cl</text>
    {/* No ether annotation */}
    <rect x="100" y="155" width="200" height="20" rx="4" fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive)/0.3)" strokeWidth="1" />
    <text x="200" y="169" textAnchor="middle" className="fill-destructive text-[9px] font-bold">NOT an ether — halogenated ethane</text>
    <text x="200" y="195" textAnchor="middle" className="fill-accent text-[8.5px]">Br → catecholamine sensitisation | 20% hepatic metabolism</text>
  </g>
);

const N2OSVG = () => (
  <g transform="translate(60,20)">
    {/* Resonance structures */}
    <text x="180" y="45" textAnchor="middle" className="fill-foreground text-[11px] font-bold">Resonance structures:</text>
    {/* Structure 1 */}
    <text x="100" y="90" textAnchor="middle" className="fill-primary text-[16px] font-bold">N</text>
    <line x1="115" y1="85" x2="145" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="115" y1="89" x2="145" y2="89" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="160" y="90" textAnchor="middle" className="fill-primary text-[16px] font-bold">N</text>
    <line x1="175" y1="85" x2="205" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="175" y1="89" x2="205" y2="89" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="220" y="90" textAnchor="middle" className="fill-destructive text-[16px] font-bold">O</text>
    {/* Double-headed arrow */}
    <text x="260" y="90" textAnchor="middle" className="fill-muted-foreground text-[16px]">⟷</text>
    {/* Structure 2 */}
    <text x="300" y="90" textAnchor="middle" className="fill-primary text-[16px] font-bold">N</text>
    <line x1="315" y1="85" x2="345" y2="85" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="315" y1="89" x2="345" y2="89" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <line x1="315" y1="82" x2="345" y2="82" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="360" y="90" textAnchor="middle" className="fill-primary text-[16px] font-bold">N</text>
    <line x1="375" y1="87" x2="405" y2="87" stroke="hsl(var(--foreground))" strokeWidth="2" />
    <text x="420" y="92" textAnchor="middle" className="fill-destructive text-[16px] font-bold">O⁻</text>
    <text x="300" y="72" textAnchor="middle" className="fill-muted-foreground text-[9px]">⁻</text>
    {/* Charge annotations */}
    <text x="100" y="108" textAnchor="middle" className="fill-muted-foreground text-[10px]">⁻</text>
    <text x="160" y="108" textAnchor="middle" className="fill-muted-foreground text-[10px]">⁺</text>
    {/* Note */}
    <text x="220" y="140" textAnchor="middle" className="fill-foreground text-[9px]">Linear triatomic molecule — inorganic, not an ether</text>
    <text x="220" y="160" textAnchor="middle" className="fill-accent text-[9px]">MAC 104% — second gas effect — oxidises vitamin B₁₂</text>
  </g>
);

const svgComponents: Record<Agent, () => JSX.Element> = {
  sevoflurane: SevofluraneSVG,
  desflurane: DesfluraneSVG,
  isoflurane: IsofluraneSVG,
  halothane: HalothaneSVG,
  n2o: N2OSVG,
};

const VolatileAgentStructures = () => {
  const [selected, setSelected] = useState<Agent>("sevoflurane");
  const SVGComponent = svgComponents[selected];
  const d = info[selected];

  return (
    <DiagramFigure
      id="volatile-agent-structures"
      title="Volatile agent structures"
      description="Auto-generated wrapper for the Volatile agent structures anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Molecular Structures</h4>
        <div className="flex flex-wrap gap-2">
          {agents.map((a) => (
            <button
              key={a.key}
              onClick={() => setSelected(a.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selected === a.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
        <div className="bg-secondary/30 rounded-xl p-5 border border-border">
          <svg viewBox="0 0 480 210" className="w-full h-auto">
            <text x="240" y="16" textAnchor="middle" className="fill-foreground text-[13px] font-bold">{d.name}</text>
            <SVGComponent />
          </svg>
          <div className="mt-3 space-y-1">
            <p className="text-xs font-medium text-foreground">MW: {d.mw} | Formula: {d.formula}</p>
            <ul className="text-xs text-muted-foreground space-y-0.5">
              {d.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default VolatileAgentStructures;