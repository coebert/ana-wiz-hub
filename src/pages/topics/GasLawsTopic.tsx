import { SectionLayout } from "@/components/SectionLayout";
import { GasLawsDiagram } from "@/components/diagrams/GasLawsDiagram";
import { CriticalTemperatureDiagram } from "@/components/diagrams/CriticalTemperatureDiagram";
import { AndrewsIsothermsDiagram } from "@/components/diagrams/AndrewsIsothermsDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { gasLawsQuiz } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const GasLawsTopic = () => {
  return (
    <SectionLayout
      title="Gas Laws"
      subtitle="FRCA Primary — Physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Understanding gas behaviour is fundamental to anaesthetic practice. Gases are used for patient ventilation, as
            carrier gases for volatile agents, and in various monitoring systems. The gas laws describe the relationships
            between pressure, volume, temperature, and amount of gas under defined conditions.
          </p>
          <p className="text-sm text-muted-foreground italic mt-2">
            Reference: Magee P, Tooley M. The physics, clinical measurement and equipment of anaesthetic practice. Oxford University Press, 2011.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Interactive Gas Laws</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Use the buttons below to explore each gas law with animated visualisation. Observe how changes in one variable
            affect others when remaining variables are held constant.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <GasLawsDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Boyle's Law</h2>
          <p className="text-foreground/90 leading-relaxed">
            At constant temperature, the volume of a given mass of gas is inversely proportional to its pressure
            (<strong>P₁V₁ = P₂V₂</strong>). This is clinically relevant to the function of bellows ventilators,
            compression of gas in closed spaces (e.g., pneumothorax, air emboli), and the behaviour of gas cylinders.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              A pneumothorax at altitude: as atmospheric pressure decreases, Boyle's law predicts the trapped gas will
              expand, potentially converting a simple pneumothorax to a tension pneumothorax.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Charles' Law</h2>
          <p className="text-foreground/90 leading-relaxed">
            At constant pressure, the volume of a gas is directly proportional to its absolute temperature
            (<strong>V₁/T₁ = V₂/T₂</strong>). Temperature must be measured in Kelvin. This explains why gas volumes
            measured at room temperature differ from those at body temperature.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              Spirometry measurements taken at room temperature (ATPS) must be corrected to body conditions (BTPS) using
              Charles' law, as gas expands approximately 6% when warmed from 20°C to 37°C (310/293 = 1.058).
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Gay-Lussac's Law</h2>
          <p className="text-foreground/90 leading-relaxed">
            At constant volume, the pressure of a fixed mass of gas is directly proportional to its absolute temperature
            (<strong>P₁/T₁ = P₂/T₂</strong>). As temperature rises, gas molecules move faster and strike the rigid
            container walls more frequently and forcefully, raising the measured pressure.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              The pressure inside a full oxygen cylinder rises if the cylinder is stored in a hot environment, and falls
              if it is cooled. This is why cylinder pressures should be interpreted in the context of ambient temperature,
              and why cylinders must be protected from fire — a heated cylinder can develop dangerously high internal
              pressures and rupture.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Combined Gas Law</h2>
          <p className="text-foreground/90 leading-relaxed">
            Boyle's, Charles' and Gay-Lussac's laws can be unified into a single expression that relates pressure,
            volume and absolute temperature for a fixed mass of gas:
          </p>
          <div className="bg-card border border-border rounded-lg p-4 mt-3 text-center">
            <p className="text-lg font-mono text-foreground">
              (P₁ × V₁) / T₁ = (P₂ × V₂) / T₂
            </p>
          </div>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Each individual gas law is a special case in which one of the three variables is held constant:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-foreground/90">
            <li><strong>Constant T</strong> → P₁V₁ = P₂V₂ (Boyle's law)</li>
            <li><strong>Constant P</strong> → V₁/T₁ = V₂/T₂ (Charles' law)</li>
            <li><strong>Constant V</strong> → P₁/T₁ = P₂/T₂ (Gay-Lussac's law)</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mt-3">
            The combined gas law is the practical bridge to the ideal gas equation (PV = nRT): when the amount of gas
            (n) is also allowed to vary, the constant of proportionality becomes nR. Temperature must always be in
            Kelvin, and pressures must be absolute (not gauge) for the relationship to hold.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              Converting a measured gas volume between conditions — for example, expired gas volumes measured at ATPS
              (ambient temperature and pressure, saturated) being corrected to BTPS (body temperature and pressure,
              saturated) or STPD (standard temperature and pressure, dry) for metabolic calculations — relies directly
              on the combined gas law.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Dalton's Law of Partial Pressures</h2>
          <p className="text-foreground/90 leading-relaxed">
            In a mixture of gases, the total pressure equals the sum of the partial pressures of each constituent gas
            (<strong>Pₜₒₜₐₗ = P₁ + P₂ + P₃ + ...</strong>). The partial pressure of each gas is proportional to its
            fractional concentration.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              Calculating alveolar oxygen tension using the alveolar gas equation depends on Dalton's law. At sea level,
              PaO₂ ≈ FiO₂ × (Patm − PH₂O) − PaCO₂/R. Understanding partial pressures is essential for calculating safe
              FiO₂ at altitude and during hyperbaric therapy.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Ideal Gas Law</h2>
          <p className="text-foreground/90 leading-relaxed">
            The ideal gas equation <strong>PV = nRT</strong> combines all three laws into a single expression, where
            P = pressure, V = volume, n = number of moles, R = universal gas constant (8.314 J·mol⁻¹·K⁻¹), and
            T = absolute temperature. Real gases deviate from ideal behaviour at high pressures and low temperatures,
            described by the van der Waals equation.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Critical Temperature & Critical Pressure</h2>
          <p className="text-foreground/90 leading-relaxed">
            The <strong>critical temperature</strong> of a substance is the temperature above which it cannot be
            liquefied by the application of pressure alone, no matter how great. The <strong>critical pressure</strong>
            is the pressure required to liquefy the gas at exactly its critical temperature. Above the critical
            temperature, the substance can only exist as a gas; below it, gas and liquid phases can coexist if the
            pressure is high enough.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Key values for anaesthetic gases</p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-5">
              <li><strong>Oxygen:</strong> critical temperature −118 °C, critical pressure 50 bar</li>
              <li><strong>Nitrous oxide:</strong> critical temperature 36.5 °C, critical pressure 72 bar</li>
              <li><strong>Carbon dioxide:</strong> critical temperature 31 °C, critical pressure 74 bar</li>
              <li><strong>Air:</strong> critical temperature −141 °C (pseudo-critical, as it is a mixture)</li>
            </ul>
          </div>

          <h3 className="text-xl font-serif font-bold text-foreground mt-6">Cylinder Behaviour: N₂O vs O₂</h3>
          <p className="text-foreground/90 leading-relaxed mt-2 mb-4">
            Use the slider below to empty each cylinder and observe how the pressure gauge behaves. The contrast
            between N₂O and O₂ is a direct consequence of where room temperature sits relative to each gas's critical
            temperature.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <CriticalTemperatureDiagram />
          </div>

          <h3 className="text-xl font-serif font-bold text-foreground mt-6">Why N₂O cylinder pressure is constant</h3>
          <p className="text-foreground/90 leading-relaxed mt-2">
            At a typical room temperature of 20 °C, N₂O is <em>below</em> its critical temperature of 36.5 °C. When
            it is compressed into a cylinder it partially liquefies, so the cylinder contains a two-phase system: a
            pool of liquid N₂O at the bottom in equilibrium with N₂O vapour above it. The pressure of the vapour
            phase is the <strong>saturated vapour pressure</strong> (SVP) of N₂O, which depends only on temperature —
            approximately 52 bar at 20 °C.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-2">
            As gas is drawn off, more liquid evaporates to replace it and the vapour pressure stays constant. The
            gauge therefore continues to read ~52 bar throughout the working life of the cylinder, even as the
            contents progressively diminish. Only once the very last drop of liquid has evaporated does the cylinder
            behave as a simple gas reservoir — and at that point the pressure falls rapidly as the remaining vapour
            is consumed (typically when ~20% of the original mass remains).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-2">
            By contrast, O₂ has a critical temperature of −118 °C, far below room temperature. It cannot be liquefied
            by pressure alone at 20 °C and is stored as a compressed gas only. The cylinder pressure therefore obeys
            Boyle's law and falls linearly as oxygen is used, making the gauge a reliable indicator of remaining
            contents.
          </p>

          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              The contents of an N₂O cylinder are determined by <strong>weighing</strong> (full weight − tare weight),
              not by the pressure gauge. Cylinders are filled to a <strong>filling ratio</strong> (mass of N₂O / mass
              of water that would fill the cylinder) of 0.75 in temperate climates and 0.67 in the tropics, to leave
              vapour headspace and prevent dangerous pressure rises if the cylinder warms. As N₂O vaporises, latent
              heat of vaporisation cools the cylinder and the vapour pressure (and hence delivered pressure) actually
              <em> falls</em> during heavy use — frost may form on the outside of the cylinder.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Andrews' Isotherms — N₂O on a P–V Diagram</h2>
          <p className="text-foreground/90 leading-relaxed">
            Thomas Andrews' classic 1869 experiments on CO₂ produced the first family of isotherms — curves of
            pressure against volume at constant temperature — that revealed the nature of the critical point. The same
            picture applies to N₂O, which is the anaesthetic gas most often discussed in these terms because its
            critical temperature (36.5 °C) sits within the clinical range.
          </p>

          <div className="bg-card rounded-xl border border-border p-6 mt-4">
            <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive P–V Diagram</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag the temperature slider to see the isotherm change shape. Below Tc the curve enters the two-phase
              dome and is replaced by a horizontal tie-line at the saturated vapour pressure (liquid and vapour
              coexist). At Tc the inflection becomes a single point — the critical point. Above Tc the gas can no
              longer be liquefied at any pressure and the isotherm approaches a smooth Boyle's-law hyperbola.
            </p>
            <AndrewsIsothermsDiagram />
          </div>

          <h3 className="text-xl font-serif font-bold text-foreground mt-6">How to read the diagram</h3>
          <ul className="text-foreground/90 leading-relaxed mt-2 list-disc pl-6 space-y-2">
            <li>
              <strong>Sub-critical isotherms (T &lt; Tc).</strong> Starting from large volume (right) and compressing
              the gas, pressure rises along the vapour branch until it meets the dashed dome at the saturated-vapour
              point. Further compression occurs at <em>constant pressure</em> (the horizontal tie-line) as vapour
              condenses to liquid — this is the two-phase region. Once all the vapour is liquid (saturated-liquid
              point on the left of the dome), pressure rises almost vertically because liquids are nearly
              incompressible.
            </li>
            <li>
              <strong>The critical isotherm (T = Tc, 36.5 °C for N₂O).</strong> The horizontal tie-line shrinks to a
              single point — the <strong>critical point</strong> — where the densities of liquid and vapour become
              equal and the meniscus disappears (critical opalescence). The isotherm has a point of inflection here
              with (∂P/∂V)<sub>T</sub> = 0 and (∂²P/∂V²)<sub>T</sub> = 0.
            </li>
            <li>
              <strong>Super-critical isotherms (T &gt; Tc).</strong> No phase change is possible at any pressure. The
              substance exists as a single fluid phase whose density rises smoothly with pressure. At high T the curve
              tends to PV = constant (Boyle's law).
            </li>
            <li>
              <strong>The dashed dome</strong> is the locus of all saturated-liquid and saturated-vapour points; its
              apex is the critical point. Inside the dome, liquid and vapour coexist; outside it, only one phase
              exists.
            </li>
          </ul>

          <h3 className="text-xl font-serif font-bold text-foreground mt-6">Pseudo-critical temperature</h3>
          <p className="text-foreground/90 leading-relaxed mt-2">
            For a <em>mixture</em> of gases there is no single critical temperature. Instead a{" "}
            <strong>pseudo-critical temperature</strong> is defined: the temperature below which the components of
            the mixture may separate into two phases. Two clinically important examples:
          </p>
          <ul className="text-foreground/90 leading-relaxed mt-2 list-disc pl-6 space-y-2">
            <li>
              <strong>Air (≈79 % N₂, 21 % O₂):</strong> pseudo-critical temperature −141 °C — the temperature below
              which air, if compressed, can separate into liquid O₂ and gaseous N₂. Industrially exploited in
              fractional distillation of liquid air to produce medical O₂.
            </li>
            <li>
              <strong>Entonox (50 % N₂O / 50 % O₂):</strong> pseudo-critical temperature{" "}
              <strong>−5.5 °C at 137 bar</strong> (the cylinder pressure). Below this, the N₂O can liquefy out and
              pool at the bottom of the cylinder, leaving an O₂-rich gas to be delivered first and a hypoxic
              N₂O-rich mixture later — the so-called <em>Poynting effect failure</em>. Cylinders left in cold
              environments must be re-warmed (≥10 °C for at least 2 h, or 24 h with inversion) and inverted three
              times before clinical use.
            </li>
          </ul>

          <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              Andrews' isotherms explain why N₂O behaves so differently from O₂ in storage: N₂O is operated <em>just
              below</em> its Tc, sitting inside the two-phase dome where vapour pressure is essentially independent
              of cylinder volume. O₂ at room temperature lies on a super-critical isotherm — far above its Tc of
              −118 °C — so its cylinder pressure tracks contents linearly. The same diagram also predicts that on a
              hot day (&gt;36.5 °C) an N₂O cylinder transitions to a super-critical state, the liquid disappears, and
              the contents can no longer be estimated by weighing alone.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Joule–Thomson Effect & Adiabatic Expansion</h2>
          <p className="text-foreground/90 leading-relaxed">
            When a real gas expands, its temperature changes. Two distinct mechanisms operate in clinical practice:
            <strong> adiabatic expansion</strong> (work done by the gas as it pushes back its surroundings, no heat
            exchange) and the <strong>Joule–Thomson effect</strong> (isenthalpic throttling through a restriction with
            no external work). Both produce cooling on cylinder discharge but for different physical reasons.
          </p>

          <h3 className="text-xl font-serif font-bold text-foreground mt-6">Adiabatic expansion</h3>
          <p className="text-foreground/90 leading-relaxed mt-2">
            An <em>adiabatic</em> process exchanges no heat with the surroundings (Q = 0). For an ideal gas the first
            law gives ΔU = −W; the gas does work at the expense of its own internal energy, so its temperature falls.
            For a reversible adiabatic process:
          </p>
          <div className="bg-muted/40 rounded-lg p-4 mt-2 border border-border">
            <p className="text-foreground font-mono text-center">
              PV<sup>γ</sup> = constant &nbsp;&nbsp; and &nbsp;&nbsp; T₁V₁<sup>γ−1</sup> = T₂V₂<sup>γ−1</sup>
            </p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              where γ = Cp/Cv (1.40 for diatomic gases such as O₂ and N₂; 1.31 for N₂O; 1.67 for monatomic helium).
            </p>
          </div>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Adiabatic expansion underlies <strong>cryotherapy probes</strong> (rapid expansion of high-pressure gas at
            the probe tip cools tissue to −70 °C or below for ablation of tumours, arrhythmic foci or skin lesions),
            and the <strong>cooling of an O₂ cylinder during fast discharge</strong> — the gas remaining in the
            cylinder expands almost adiabatically as molecules leave, so the cylinder body cools and any moisture in
            the surrounding air condenses or freezes on it.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Worked example — adiabatic emptying of an O₂ cylinder</p>
            <p className="text-sm text-muted-foreground mt-1">
              An E-size O₂ cylinder is opened from 137 bar (absolute ≈138 bar) to atmospheric pressure (1 bar) so
              quickly that no heat enters from the cylinder wall. With γ = 1.40 and T₁ = 293 K (20 °C):
            </p>
            <p className="text-foreground font-mono text-center mt-2">
              T₂ = T₁ (P₂/P₁)<sup>(γ−1)/γ</sup> = 293 × (1/138)<sup>0.286</sup> ≈ 78 K (−195 °C)
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              In practice heat conduction from the cylinder wall and ambient air limits cooling to a much smaller
              drop (~30–50 °C surface temperature fall during fast discharge), but it explains the frost on a
              rapidly discharged O₂ cylinder despite O₂ being well above its J–T inversion temperature.
            </p>
          </div>

          <h3 className="text-xl font-serif font-bold text-foreground mt-6">The Joule–Thomson (throttling) effect</h3>
          <p className="text-foreground/90 leading-relaxed mt-2">
            When a real gas is forced through a porous plug, narrow valve or other restriction without doing external
            work and without heat exchange, the process is <strong>isenthalpic</strong> (H = constant). For an ideal
            gas H depends only on T, so there is no temperature change. For a <em>real</em> gas there is, because of
            the work done against (or by) intermolecular forces:
          </p>
          <div className="bg-muted/40 rounded-lg p-4 mt-2 border border-border">
            <p className="text-foreground font-mono text-center">
              μ<sub>JT</sub> = (∂T/∂P)<sub>H</sub>
            </p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              μ<sub>JT</sub> &gt; 0: gas <strong>cools</strong> on expansion. μ<sub>JT</sub> &lt; 0: gas <strong>warms</strong>.
            </p>
          </div>
          <p className="text-foreground/90 leading-relaxed mt-3">
            At low temperatures, attractive intermolecular forces dominate; the gas does work against them as it
            expands and so cools (μ<sub>JT</sub> &gt; 0). At very high temperatures, repulsive forces dominate; the
            gas warms on expansion (μ<sub>JT</sub> &lt; 0). The temperature at which μ<sub>JT</sub> = 0 — the dividing
            line between cooling and warming — is the <strong>inversion temperature</strong>.
          </p>

          <div className="overflow-x-auto rounded-xl border border-border bg-card mt-4">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-foreground">Gas</th>
                  <th className="text-left p-3 font-semibold text-foreground">Inversion T (max)</th>
                  <th className="text-left p-3 font-semibold text-foreground">Behaviour at room T (293 K) on throttling</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 font-medium text-foreground">N₂O</td>
                  <td className="p-3 text-foreground/80">~1500 K</td>
                  <td className="p-3 text-foreground/80">Cools strongly (~0.25 K per bar)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-foreground">CO₂</td>
                  <td className="p-3 text-foreground/80">~1500 K</td>
                  <td className="p-3 text-foreground/80">Cools strongly — used in cryotherapy</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-foreground">N₂</td>
                  <td className="p-3 text-foreground/80">~620 K</td>
                  <td className="p-3 text-foreground/80">Cools modestly</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-foreground">O₂</td>
                  <td className="p-3 text-foreground/80">~760 K</td>
                  <td className="p-3 text-foreground/80">Cools modestly (~0.31 K per bar)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-foreground">H₂</td>
                  <td className="p-3 text-foreground/80">~205 K</td>
                  <td className="p-3 text-foreground/80"><strong>Warms</strong> — must be pre-cooled below 205 K to liquefy</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-foreground">He</td>
                  <td className="p-3 text-foreground/80">~45 K</td>
                  <td className="p-3 text-foreground/80"><strong>Warms</strong> — must be pre-cooled to liquefy (key to MRI cryostat design)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-serif font-bold text-foreground mt-6">Worked example — frost on an N₂O cylinder</h3>
          <p className="text-foreground/90 leading-relaxed mt-2">
            During heavy use (e.g. continuous flow at 6 L/min during a long case), liquid N₂O at the bottom of the
            cylinder evaporates to replace withdrawn vapour. Two cooling mechanisms now act in concert:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mt-2 text-foreground/90">
            <li>
              <strong>Latent heat of vaporisation</strong> (~376 kJ/kg) — energy is taken from the remaining liquid
              and the cylinder wall to convert liquid N₂O to vapour, cooling the cylinder.
            </li>
            <li>
              <strong>Joule–Thomson cooling at the regulator</strong> — vapour at ~52 bar is throttled to pipeline
              pressure (~4 bar). With μ<sub>JT</sub> ≈ 0.25 K/bar, the temperature drop across the regulator is
              roughly (52 − 4) × 0.25 ≈ <strong>12 °C</strong>.
            </li>
          </ol>
          <p className="text-foreground/90 leading-relaxed mt-3">
            As the cylinder cools, saturated vapour pressure of N₂O <em>falls</em> (hence delivered pressure drops
            during fast discharge), the cylinder body may cool below the dew-point of room air, and a ring of frost
            forms at the level of the liquid–vapour interface. The height of the frost line gives a rough visual
            indication of remaining liquid contents.
          </p>

          <h3 className="text-xl font-serif font-bold text-foreground mt-6">Worked example — cryotherapy probe</h3>
          <p className="text-foreground/90 leading-relaxed mt-2">
            A typical cryoprobe uses N₂O or CO₂ supplied at ~50 bar and throttled at the probe tip to ~1 bar through
            a Joule–Thomson nozzle. Because both gases are well below their inversion temperatures, the throttling
            cools the tip:
          </p>
          <div className="bg-muted/40 rounded-lg p-4 mt-2 border border-border">
            <p className="text-foreground font-mono text-center">
              ΔT ≈ μ<sub>JT</sub> × ΔP ≈ 0.25 × 49 ≈ 12 °C per pass
            </p>
          </div>
          <p className="text-foreground/90 leading-relaxed mt-2">
            Repeated cycling of the gas through a counter-current heat exchanger (the <strong>Linde process</strong>,
            same principle as the Hampson–Linde liquefier) achieves probe-tip temperatures of −70 °C with N₂O/CO₂ and
            below −180 °C with liquid-nitrogen-cooled systems. Used clinically for cryoablation of cardiac arrhythmias
            (pulmonary vein isolation), prostate and renal tumours, retinal detachment repair, and dermatological
            lesions.
          </p>

          <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application — H₂ and He</p>
            <p className="text-sm text-muted-foreground mt-1">
              Hydrogen and helium have inversion temperatures below room temperature (205 K and 45 K respectively),
              so they <em>warm</em> on throttling at 20 °C. To liquefy them they must first be pre-cooled below the
              inversion temperature (e.g. by liquid nitrogen for H₂, by liquid hydrogen for He) before throttling
              becomes useful. This is why MRI cryostats use liquid helium that has been laboriously pre-cooled
              through a multi-stage cascade — and why a sudden quench of an MRI magnet vents enormous volumes of
              warming He gas rather than a self-cooling jet.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Henry's Law</h2>
          <p className="text-foreground/90 leading-relaxed">
            At constant temperature, the amount of gas dissolved in a liquid is directly proportional to the partial
            pressure of that gas above the liquid. This is fundamental to understanding oxygen and carbon dioxide transport
            in blood, and the uptake of volatile anaesthetic agents.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Application</p>
            <p className="text-sm text-muted-foreground mt-1">
              Nitrogen narcosis during deep diving occurs because increased PN₂ at depth drives more nitrogen into solution
              in neural tissue. Similarly, the solubility coefficient determines how much volatile agent dissolves in blood
              at a given partial pressure.
            </p>
          </div>
        </section>
      </div>

      <KeyLearningPoints points={[
        "Boyle's law (P₁V₁ = P₂V₂): at constant temperature, pressure and volume are inversely proportional. Relevant to pneumothorax expansion and gas cylinder contents.",
        "Charles' law (V₁/T₁ = V₂/T₂): at constant pressure, volume is proportional to absolute temperature. Explains ATPS to BTPS correction.",
        "Dalton's law: total pressure equals the sum of partial pressures. Fundamental to the alveolar gas equation and FiO₂ calculations.",
        "The ideal gas equation (PV = nRT) combines all individual gas laws. Real gases deviate at high pressure and low temperature.",
        "Henry's law: gas dissolved in liquid is proportional to its partial pressure. Governs O₂/CO₂ transport and volatile agent uptake.",
        "Adiabatic expansion (PVγ = constant) cools a gas as it does work — explains rapid O₂ cylinder cooling and reversible adiabatic processes.",
        "Joule–Thomson effect: isenthalpic throttling cools real gases below their inversion temperature (N₂O, CO₂, O₂, N₂ at room T) and warms H₂ and He.",
        "Understanding gas behaviour is critical for safe use of medical gas systems, ventilation, and altitude/diving physiology."
      ]} />
      <QuizSection questions={gasLawsQuiz} />
      <ReferencesList topicId="gas-laws" />

      <SeeAlso topicId="gas-laws" />
        <TopicCompletionToggle topicId="gas-laws" topicTitle="Gas Laws" />
    </SectionLayout>
  );
};

export default GasLawsTopic;
