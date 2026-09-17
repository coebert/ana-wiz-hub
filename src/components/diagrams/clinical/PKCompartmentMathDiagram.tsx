import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Tab = "structure" | "odes" | "solution" | "effect";

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "structure", label: "1. Model structure" },
  { id: "odes", label: "2. Differential equations" },
  { id: "solution", label: "3. Tri-exponential solution" },
  { id: "effect", label: "4. Effect site & ke0" },
];

/**
 * Mathematical anatomy of the three-compartment mammillary model used by every
 * commercial TCI pump, presented in four steps: structure, mass-balance ODEs,
 * the tri-exponential analytical solution (macro-constants), and the link
 * between the plasma and the effect compartment via ke0 / t-peak.
 */
const PKCompartmentMathDiagram = () => {
  const [tab, setTab] = useState<Tab>("structure");

  return (
    <DiagramFigure
      id="pk-compartment-math"
      title="Mathematical structure of the three-compartment mammillary model with effect site"
      description="Central compartment V1 exchanges drug with a rapidly equilibrating compartment V2 (rate constants k12 and k21) and a slowly equilibrating compartment V3 (k13 and k31), and eliminates drug irreversibly by k10. A fourth, volume-less effect compartment is linked to V1 by ke0. Mass balance gives three coupled linear differential equations whose solution after a bolus is a tri-exponential decay with coefficients A, B, C and exponents alpha, beta, gamma. TCI pumps solve these equations every 10 seconds to choose the next infusion rate."
      showCaption
      className="rounded-lg border border-border p-4"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              tab === t.id
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "structure" && (
        <div className="space-y-3">
          <svg
            viewBox="0 0 620 300"
            role="img"
            aria-label="Three-compartment mammillary model schematic: V2 on the left and V3 on the right both exchange with the central compartment V1; elimination k10 leaves V1 downwards; an effect compartment sits above V1 connected by ke0 and ke1."
            className="w-full h-auto"
          >
            {/* V2 */}
            <rect x="20" y="120" width="130" height="70" rx="8" className="fill-secondary" stroke="hsl(var(--border))" />
            <text x="85" y="148" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="700">V2</text>
            <text x="85" y="166" textAnchor="middle" className="fill-muted-foreground" fontSize="10">rapid: muscle, viscera</text>
            <text x="85" y="180" textAnchor="middle" className="fill-muted-foreground" fontSize="10">amount A2</text>

            {/* V1 */}
            <rect x="235" y="115" width="150" height="80" rx="8" className="fill-primary/10" stroke="hsl(var(--primary))" />
            <text x="310" y="145" textAnchor="middle" className="fill-foreground" fontSize="15" fontWeight="700">V1 (central)</text>
            <text x="310" y="162" textAnchor="middle" className="fill-muted-foreground" fontSize="10">blood + vessel-rich group</text>
            <text x="310" y="178" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Cp = A1 / V1 — drug enters here</text>

            {/* V3 */}
            <rect x="470" y="120" width="130" height="70" rx="8" className="fill-secondary" stroke="hsl(var(--border))" />
            <text x="535" y="148" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="700">V3</text>
            <text x="535" y="166" textAnchor="middle" className="fill-muted-foreground" fontSize="10">slow: fat, bone</text>
            <text x="535" y="180" textAnchor="middle" className="fill-muted-foreground" fontSize="10">amount A3</text>

            {/* Effect site */}
            <rect x="245" y="20" width="130" height="52" rx="8" className="fill-clinical/10" stroke="hsl(var(--border))" />
            <text x="310" y="42" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">Effect site</text>
            <text x="310" y="58" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Ce — negligible volume</text>

            {/* Infusion arrow */}
            <line x1="310" y1="245" x2="310" y2="200" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#pkm-arrow)" />
            <text x="318" y="240" className="fill-muted-foreground" fontSize="10">infusion / bolus (mg·min⁻¹)</text>

            {/* V1<->V2 */}
            <line x1="235" y1="140" x2="150" y2="140" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#pkm-arrow)" />
            <text x="192" y="133" textAnchor="middle" className="fill-muted-foreground" fontSize="10">k12</text>
            <line x1="150" y1="170" x2="235" y2="170" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#pkm-arrow)" />
            <text x="192" y="186" textAnchor="middle" className="fill-muted-foreground" fontSize="10">k21</text>

            {/* V1<->V3 */}
            <line x1="385" y1="140" x2="470" y2="140" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#pkm-arrow)" />
            <text x="428" y="133" textAnchor="middle" className="fill-muted-foreground" fontSize="10">k13</text>
            <line x1="470" y1="170" x2="385" y2="170" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#pkm-arrow)" />
            <text x="428" y="186" textAnchor="middle" className="fill-muted-foreground" fontSize="10">k31</text>

            {/* ke0 / ke1 */}
            <line x1="290" y1="115" x2="290" y2="72" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#pkm-arrow)" />
            <text x="262" y="98" className="fill-muted-foreground" fontSize="10">ke0</text>
            <line x1="335" y1="72" x2="335" y2="115" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#pkm-arrow)" />
            <text x="342" y="98" className="fill-muted-foreground" fontSize="10">ke0 (out)</text>

            {/* elimination */}
            <line x1="260" y1="195" x2="215" y2="255" stroke="hsl(var(--destructive))" strokeWidth="1.8" markerEnd="url(#pkm-arrow-red)" />
            <text x="150" y="272" className="fill-muted-foreground" fontSize="10">k10 — metabolic clearance (CL = k10 × V1)</text>

            <defs>
              <marker id="pkm-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="hsl(var(--foreground))" />
              </marker>
              <marker id="pkm-arrow-red" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="hsl(var(--destructive))" />
              </marker>
            </defs>
          </svg>
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Mammillary</strong> means every peripheral compartment connects only to the central compartment, never to each other. Compartments are
            mathematical constructs fitted to measured plasma concentrations, not anatomical spaces. A model is fully defined by six micro-rate constants
            (k10, k12, k21, k13, k31, ke0) plus V1; V2 = V1·k12/k21 and V3 = V1·k13/k31.
          </p>
        </div>
      )}

      {tab === "odes" && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border p-4 bg-secondary/30 font-mono text-xs text-foreground space-y-2 overflow-x-auto">
            <p>dA1/dt = I(t) − (k10 + k12 + k13)·A1 + k21·A2 + k31·A3</p>
            <p>dA2/dt = k12·A1 − k21·A2</p>
            <p>dA3/dt = k13·A1 − k31·A3</p>
            <p>dCe/dt = ke0·(Cp − Ce),&nbsp;&nbsp; where Cp = A1 / V1</p>
          </div>
          <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
            <li><strong className="text-foreground">A1, A2, A3</strong> = drug amount (mg or µg) in each compartment; <strong className="text-foreground">I(t)</strong> = the pump's instantaneous delivery rate.</li>
            <li>The system is <strong className="text-foreground">linear and first-order</strong>: doubling the dose doubles every predicted concentration. This superposition property is what allows the pump to add the effect of each new 10-second infusion step to the decaying effect of all previous steps.</li>
            <li>The effect-site equation has <strong className="text-foreground">no volume term</strong> — drug flow into the effect site is assumed too small to alter Cp, so ke0 changes only the timing of effect, never the amount of drug in the body.</li>
            <li>A TCI pump integrates these equations numerically (typically every 10 s), compares the prediction with the target, and solves for the infusion rate that will reach the target without exceeding it — the Shafer–Gregg algorithm for effect-site targeting.</li>
          </ul>
        </div>
      )}

      {tab === "solution" && (
        <div className="space-y-3">
          <div className="rounded-lg border border-border p-4 bg-secondary/30 font-mono text-xs text-foreground space-y-2 overflow-x-auto">
            <p>After a bolus dose D:</p>
            <p>Cp(t) = A·e^(−α·t) + B·e^(−β·t) + C·e^(−γ·t)</p>
            <p>V1 = D / (A + B + C)&nbsp;&nbsp;·&nbsp;&nbsp;Vd(ss) = V1 + V2 + V3</p>
            <p>CL = k10 · V1&nbsp;&nbsp;·&nbsp;&nbsp;t½α ≈ 0.693/α, t½β ≈ 0.693/β, t½γ ≈ 0.693/γ</p>
            <p>Steady-state infusion rate = Cp(target) × CL</p>
            <p>Bolus to fill the central compartment = Cp(target) × V1</p>
          </div>
          <svg
            viewBox="0 0 620 210"
            role="img"
            aria-label="Semi-logarithmic plasma concentration versus time curve after a bolus, showing three straight-line phases: a steep rapid distribution phase alpha, an intermediate slow distribution phase beta, and a shallow terminal elimination phase gamma."
            className="w-full h-auto"
          >
            <line x1="55" y1="20" x2="55" y2="170" stroke="hsl(var(--border))" />
            <line x1="55" y1="170" x2="600" y2="170" stroke="hsl(var(--border))" />
            <text x="18" y="26" className="fill-muted-foreground" fontSize="10">log Cp</text>
            <text x="540" y="188" className="fill-muted-foreground" fontSize="10">time →</text>
            <path d="M55,30 L150,95" stroke="hsl(200,65%,50%)" strokeWidth="2.5" fill="none" />
            <path d="M150,95 L320,130" stroke="hsl(45,70%,45%)" strokeWidth="2.5" fill="none" />
            <path d="M320,130 L595,158" stroke="hsl(0,60%,50%)" strokeWidth="2.5" fill="none" />
            <text x="95" y="52" className="fill-foreground" fontSize="11" fontWeight="600">α — rapid distribution</text>
            <text x="95" y="66" className="fill-muted-foreground" fontSize="9">propofol t½α ≈ 2–4 min (fills V2)</text>
            <text x="200" y="112" className="fill-foreground" fontSize="11" fontWeight="600">β — slow distribution</text>
            <text x="200" y="125" className="fill-muted-foreground" fontSize="9">t½β ≈ 30–60 min (fills V3)</text>
            <text x="360" y="146" className="fill-foreground" fontSize="11" fontWeight="600">γ — terminal elimination</text>
            <text x="360" y="159" className="fill-muted-foreground" fontSize="9">t½γ ≈ 3–8 h (return from fat)</text>
          </svg>
          <p className="text-xs text-muted-foreground">
            A, B, C and α, β, γ are the <strong className="text-foreground">macro-constants</strong> obtained by fitting measured concentrations; the pump's
            micro-rate constants (k10, k12, k21…) are derived algebraically from them. The terminal half-life is clinically almost useless for TIVA because,
            after realistic infusions, recovery is governed by redistribution out of the effect site plus clearance — i.e. by the context-sensitive
            decrement time, not by t½γ.
          </p>
        </div>
      )}

      {tab === "effect" && (
        <div className="space-y-3">
          <svg
            viewBox="0 0 620 230"
            role="img"
            aria-label="Plasma and effect-site concentration curves after a bolus. The plasma curve peaks immediately and falls, the effect-site curve rises more slowly and peaks later at time to peak effect, where the two curves cross; the vertical gap between them is hysteresis."
            className="w-full h-auto"
          >
            <line x1="50" y1="15" x2="50" y2="185" stroke="hsl(var(--border))" />
            <line x1="50" y1="185" x2="600" y2="185" stroke="hsl(var(--border))" />
            <text x="12" y="22" className="fill-muted-foreground" fontSize="10">Conc.</text>
            <text x="545" y="203" className="fill-muted-foreground" fontSize="10">time (min)</text>
            {/* Cp */}
            <path d="M50,180 L62,25 C90,60 130,105 190,128 C280,155 420,168 598,175" stroke="hsl(200,65%,50%)" strokeWidth="2.5" fill="none" />
            {/* Ce */}
            <path d="M50,183 C90,175 130,150 190,140 C260,132 320,140 400,152 C480,163 540,170 598,176" stroke="hsl(280,55%,55%)" strokeWidth="2.5" fill="none" />
            <text x="80" y="20" className="fill-foreground" fontSize="11" fontWeight="600" fill="hsl(200,65%,50%)">Cp (plasma)</text>
            <text x="300" y="122" className="fill-foreground" fontSize="11" fontWeight="600">Ce (effect site)</text>
            {/* tpeak marker */}
            <line x1="215" y1="15" x2="215" y2="185" stroke="hsl(var(--muted-foreground))" strokeDasharray="4 3" />
            <text x="222" y="40" className="fill-muted-foreground" fontSize="10">t-peak: Cp = Ce, Ce is maximal</text>
            <text x="222" y="54" className="fill-muted-foreground" fontSize="10">propofol ≈ 1.6 min, remifentanil ≈ 1.6 min</text>
            {/* hysteresis bracket */}
            <line x1="120" y1="98" x2="120" y2="148" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
            <text x="128" y="118" className="fill-muted-foreground" fontSize="10">hysteresis</text>
          </svg>
          <div className="rounded-lg border border-border p-4 bg-secondary/30 font-mono text-xs text-foreground space-y-2 overflow-x-auto">
            <p>Ce(t) = ke0 · ∫₀ᵗ Cp(τ)·e^(−ke0·(t−τ)) dτ&nbsp;&nbsp;(a first-order lag on Cp)</p>
            <p>t½ke0 = 0.693 / ke0&nbsp;&nbsp;→&nbsp;&nbsp;Marsh 0.26 min⁻¹ ⇒ 2.7 min; Schnider 0.456 min⁻¹ ⇒ 1.5 min; modified Marsh 1.2 min⁻¹ ⇒ 0.6 min</p>
          </div>
          <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1">
            <li><strong className="text-foreground">ke0 is a fitted PK–PD parameter, not a physiological constant.</strong> It is derived by collapsing the hysteresis loop between measured concentration and measured effect (usually a processed EEG measure), so it belongs to the model that generated it — mixing a ke0 from one model with the volumes of another is invalid.</li>
            <li><strong className="text-foreground">t-peak is the more transferable quantity.</strong> Two models with different ke0 values can share the same time to peak effect; Schnider was published with a ke0 fitted to a t-peak of about 1.6 min, and the "modified Marsh" ke0 of 1.2 min⁻¹ was chosen to reproduce that same t-peak with Marsh volumes.</li>
            <li><strong className="text-foreground">Consequence for practice:</strong> in effect-site mode the pump must overshoot Cp to force Ce upwards. The lower the ke0, the larger and longer that overshoot, and the larger the transient haemodynamic insult at induction.</li>
          </ul>
        </div>
      )}
    </DiagramFigure>
  );
};

export default PKCompartmentMathDiagram;
