import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
import { topicReferences } from "@/data/references";

const T = "atomic-structure-bonding";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;

function SourceQuote({ label }: { label: string }) {
  const ref = topicReferences[T].find((item) => item.label === label);
  if (!ref?.excerpt) return null;
  return (
    <figure className="border-l-2 border-primary pl-4 space-y-2">
      <figcaption className="text-xs font-semibold text-foreground">From the source — {label}<R label={label} /></figcaption>
      <blockquote className="text-sm text-muted-foreground">{ref.excerpt}</blockquote>
    </figure>
  );
}

const H = ({ children }: { children: React.ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const Reasoning = () => <strong className="text-foreground">Teaching reasoning: </strong>;
function Check({ q, a }: { q: string; a: string }) {
  return (
    <details className="border-l-2 border-primary pl-4">
      <summary className="cursor-pointer font-semibold text-foreground">Learning check: {q}</summary>
      <p className="mt-2">{a}</p>
    </details>
  );
}
const wrap = "space-y-4 text-sm text-muted-foreground leading-relaxed";

/** Atoms, ions, isotopes and the mole — the vocabulary the rest of the page relies on. */
export function AtomsIonsTeaching() {
  return (
    <div className={wrap}>
      <p><Reasoning />this lesson sets out standard textbook chemistry; it carries no quoted source because these are definitions rather than contested claims.</p>
      <H>What an atom is made of</H>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong className="text-foreground">Protons</strong> (charge +1) and <strong className="text-foreground">neutrons</strong> (no charge) form the nucleus. The number of protons is the <em>atomic number</em> and defines the element: every sodium atom has 11 protons.</li>
        <li><strong className="text-foreground">Electrons</strong> (charge −1) occupy shells around the nucleus. A neutral atom has as many electrons as protons. Chemistry — bonding, ionisation, redox — is almost entirely about the outermost (valence) electrons.</li>
        <li>The <strong className="text-foreground">mass number</strong> is protons + neutrons. Atoms of one element with different neutron numbers are <strong className="text-foreground">isotopes</strong>: chemically near-identical, but differing in mass and sometimes in nuclear stability.</li>
      </ul>
      <H>Ions: why electrolytes carry charge</H>
      <p>An atom that loses electrons becomes a positive <strong className="text-foreground">cation</strong>; one that gains electrons becomes a negative <strong className="text-foreground">anion</strong>. Sodium readily loses its single valence electron to form Na⁺; chlorine gains one to form Cl⁻. Calcium and magnesium lose two (Ca²⁺, Mg²⁺). This is why plasma concentrations of divalent ions are sometimes quoted in mEq/L — 1 mmol of Ca²⁺ carries 2 mEq of charge (0.002 Eq); 1 mol carries 2 Eq.</p>
      <H>Isotopes you meet clinically</H>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong className="text-foreground">Radioactive tracers:</strong> unstable isotopes such as technetium-99m (nuclear medicine imaging) and iodine-131 (thyroid treatment) behave chemically like their stable counterparts, so they follow the same physiological pathways while emitting detectable radiation.</li>
        <li><strong className="text-foreground">Stable isotopes:</strong> carbon-13 in the urea breath test for <em>Helicobacter pylori</em> is not radioactive; it is detected by its different mass.</li>
      </ul>
      <H>The mole links atoms to doses</H>
      <p>One mole is Avogadro's number (about 6.022 × 10²³) of particles. A substance's molar mass in grams contains one mole: 58.44 g of NaCl contains one mole of formula units, and dissolves to give one mole of Na⁺ and one mole of Cl⁻. So 0.9% saline (9 g/L) contains about 154 mmol/L of each ion. Molar thinking is what lets you compare drugs, electrolytes and osmolality on the same footing — see Solutions & Concentration.</p>
      <Check q="9 g of NaCl is dissolved in 1 L of water. Roughly how many mmol of Na⁺ does it contain, and why?" a="About 154 mmol. 9 g ÷ 58.44 g/mol ≈ 0.154 mol of NaCl, and each formula unit releases one Na⁺ (and one Cl⁻) on dissolving." />
    </div>
  );
}

/** Electronegativity and bond polarity, with the limits of the ΔEN rule of thumb. */
export function ElectronegativityTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote label="IUPAC Electronegativity" />
      <p>On Pauling's scale fluorine is the most electronegative element (3.98), followed by oxygen (3.44), nitrogen and chlorine (both about 3.0–3.2), while sodium (0.93) and potassium (0.82) hold their valence electrons weakly. Electronegativity rises across a period and falls down a group.<R label="IUPAC Electronegativity" /></p>
      <H>From electronegativity difference to bond type</H>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong className="text-foreground">Large difference — ionic:</strong> Na (0.93) and Cl (3.16) differ by about 2.2. The electron is effectively transferred, giving a lattice of Na⁺ and Cl⁻.</li>
        <li><strong className="text-foreground">Intermediate difference — polar covalent:</strong> O–H (about 1.2) and C–F (about 1.4) share electrons unequally, giving partial charges (δ+ / δ−) and a bond dipole.</li>
        <li><strong className="text-foreground">Small difference — essentially non-polar:</strong> C–H (about 0.35) and C–C (zero).</li>
      </ul>
      <p><Reasoning />the commonly taught cut-off of about 1.7 between ionic and covalent is a rule of thumb, not a physical boundary. Bonding is a continuum: every "ionic" bond has some covalent character and vice versa. Answer exam questions with the trend and an example rather than defending a sharp threshold.</p>
      <H>Why bond polarity is not the same as molecular polarity</H>
      <p>A molecule can contain polar bonds but have no overall dipole if they cancel by symmetry. Carbon dioxide has two polar C=O bonds pointing in opposite directions, so the molecule is non-polar overall — yet it is very water-soluble because it reacts with water to form carbonic acid. Volatile agents have asymmetric C–F, C–Cl and C–O bonds, so they carry a net dipole, which contributes to their solubility in blood and tissue.</p>
      <Check q="C–F bonds are strongly polar. Does that mean a fluorinated molecule must be strongly polar overall?" a="No. Overall polarity depends on how bond dipoles add up in three dimensions. Symmetrical molecules (e.g. CF₄, CO₂) can be non-polar overall despite polar bonds." />
      <LessonSources topicId={T} labels={["IUPAC Electronegativity"]} />
    </div>
  );
}

/** Hydrogen bonding defined precisely, and why it matters for water and drug binding. */
export function HydrogenBondingTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote label="IUPAC Hydrogen Bond 2011" />
      <p>The 2011 IUPAC definition is broader than the classic school version ("H bonded to F, O or N"). Those are the strongest and most clinically relevant donors, but the definition requires only that X is more electronegative than H and that there is evidence of a bond actually forming.<R label="IUPAC Hydrogen Bond 2011" /></p>
      <H>Water: one molecule, up to four hydrogen bonds</H>
      <p><Reasoning />each water molecule can donate two hydrogen bonds (through its two O–H groups) and accept two (through the oxygen lone pairs). This extensive network is why water, despite its small molecular mass (18), is liquid at body temperature, has a high specific heat capacity (about 4.18 kJ/kg/K) and a high latent heat of vaporisation. Clinically, evaporation of sweat and of water from an open abdomen or airway removes large amounts of heat — one reason for heat loss during surgery.</p>
      <H>Hydrogen bonds in drug and protein structure</H>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong className="text-foreground">Protein shape:</strong> hydrogen bonds stabilise α-helices and β-sheets in receptors, ion channels and enzymes.</li>
        <li><strong className="text-foreground">Drug–receptor binding:</strong> most drugs bind reversibly through a combination of ionic, hydrogen-bond and van der Waals interactions. Each is individually weak, so binding depends on several fitting together — which is the basis of selectivity.</li>
        <li><strong className="text-foreground">Contrast with covalent binding:</strong> a few drugs form covalent bonds with their target, making the effect effectively irreversible until new protein is made — for example aspirin acetylating platelet cyclo-oxygenase, and phenoxybenzamine alkylating α-adrenoceptors. That is why their effects outlast their plasma half-lives.</li>
      </ul>
      <Check q="Why does aspirin's antiplatelet effect last for the life of the platelet, when its plasma half-life is short?" a="Aspirin forms a covalent bond (acetylation) with platelet cyclo-oxygenase. Platelets have no nucleus to make new enzyme, so the effect persists until new platelets are produced." />
      <LessonSources topicId={T} labels={["IUPAC Hydrogen Bond 2011"]} />
    </div>
  );
}

/** The C–F bond and why modern volatiles are fluorinated. */
export function CarbonFluorineTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote label="O'Hagan 2008 C–F bond" />
      <p>O'Hagan explains that although the C–F bond is highly polarised, it gains stability from the electrostatic attraction between the δ+ carbon and δ− fluorine. Fluorine is also a weak coordinator: its lone pairs are held tightly and are rarely donated.<R label="O'Hagan 2008 C–F bond" /></p>
      <H>Consequences for volatile anaesthetics</H>
      <p><Reasoning />these are the standard structure–property links taught for the Primary FRCA, derived from the bond chemistry above rather than quoted from the source.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong className="text-foreground">Metabolic stability:</strong> strong C–F bonds resist oxidative metabolism. Desflurane (halogenated with fluorine only) is metabolised far less than halothane, whose weaker C–Br and C–Cl bonds are attacked by hepatic enzymes — relevant to the immune-mediated hepatitis linked to halothane's trifluoroacetylated metabolite.</li>
        <li><strong className="text-foreground">Non-flammability:</strong> heavy halogenation makes modern agents non-flammable, unlike diethyl ether and cyclopropane.</li>
        <li><strong className="text-foreground">Low boiling point and low solubility:</strong> fluorine's tightly held electrons are poorly polarisable, so van der Waals attraction between molecules is weak. Desflurane boils at about 23 °C and has the lowest blood:gas partition coefficient of the volatiles (about 0.45), giving fast onset and offset.</li>
        <li><strong className="text-foreground">Environmental cost:</strong> the same stability means fluorinated agents persist in the atmosphere. Desflurane has much the highest global warming potential of the volatiles in use — a chemical property with direct consequences for agent choice.</li>
      </ul>
      <Check q="Halothane and desflurane are both halogenated. Give two chemical reasons desflurane is less metabolised and boils at a lower temperature." a="Desflurane relies on strong C–F bonds that resist oxidative metabolism, whereas halothane's weaker C–Br/C–Cl bonds are metabolised. Fluorine is poorly polarisable, so van der Waals forces between desflurane molecules are weak, lowering its boiling point; heavy bromine and chlorine make halothane's intermolecular forces stronger." />
      <LessonSources topicId={T} labels={["O'Hagan 2008 C–F bond"]} />
    </div>
  );
}

/** Vapour pressure, boiling point and the desflurane vaporiser — where intermolecular forces become equipment design. */
export function VapourPressureTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote label="WFSA Gases and Vapours 2008" />
      <p>The weaker the forces holding molecules in a liquid, the more escape into the vapour phase at a given temperature, and the higher the saturated vapour pressure (SVP). A liquid boils when its SVP equals the surrounding pressure. Rising temperature increases SVP; ambient pressure does not change it.<R label="WFSA Gases and Vapours 2008" /></p>
      <H>Desflurane: when SVP is close to atmospheric pressure</H>
      <p>Desflurane's SVP at 20 °C is close to one atmosphere, so in a conventional variable-bypass vaporiser small temperature changes would cause large, unpredictable changes in output.</p>
      <SourceQuote label="OpenAnesthesia Tec 6" />
      <p>The Tec 6 therefore heats and pressurises the agent and injects vapour into the fresh gas, rather than splitting gas through a vaporising chamber.<R label="OpenAnesthesia Tec 6" /></p>
      <H>Altitude: the common exam trap</H>
      <p>A conventional variable-bypass vaporiser delivers an approximately constant <em>partial pressure</em> at altitude: the percentage rises as barometric pressure falls, so no dial adjustment is needed. The heated desflurane vaporiser behaves differently.</p>
      <SourceQuote label="OpenAnesthesia Altitude" />
      <p>So at altitude the desflurane dial setting must be increased to achieve the same partial pressure — and hence the same clinical effect — as at sea level.<R label="OpenAnesthesia Altitude" /></p>
      <Check q="At 2,000 m, does a Tec 6 desflurane vaporiser set at 6% deliver the same anaesthetic effect as at sea level?" a="No. It delivers a constant volume percentage, so the partial pressure falls with barometric pressure and the patient is under-dosed. The dial must be turned up. A conventional sevoflurane vaporiser, by contrast, keeps partial pressure approximately constant." />
      <LessonSources topicId={T} labels={["WFSA Gases and Vapours 2008", "OpenAnesthesia Tec 6", "OpenAnesthesia Altitude"]} />
    </div>
  );
}
