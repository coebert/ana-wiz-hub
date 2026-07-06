import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * LaserAirwayDiagram
 * ------------------
 * Two-tab teaching diagram for laser airway surgery:
 *   1. Laser-resistant ETT designs (Laser-Flex, Bivona Fome-Cuf, Sheridan Laser-Trach)
 *      — annotated cross-section + features and pitfalls.
 *   2. Eye protection — wavelength-specific risks for patient and theatre staff,
 *      with the matching protective filter rationale.
 */

type ETTKey = "laserflex" | "bivona" | "sheridan";

const ETTS: Record<ETTKey, {
  name: string;
  brand: string;
  shaft: string;
  cuffs: string;
  pros: string[];
  cons: string[];
  notes: string;
  /** Renders the bespoke shaft cross-section into the SVG. */
  render: () => JSX.Element;
}> = {
  laserflex: {
    name: "Mallinckrodt Laser-Flex",
    brand: "Stainless-steel spiral wrapped tube",
    shaft:
      "Flexible corrugated stainless-steel shaft with a smooth PVC inner liner. Reflects/diffuses CO₂ and KTP energy. Not approved for Nd:YAG.",
    cuffs:
      "Two distal PVC cuffs in series — if the proximal cuff is breached by the laser, the distal cuff can still seal the airway.",
    pros: [
      "Reusable shaft is kink-resistant and MRI-incompatible (not for MRI use)",
      "Approved for CO₂ and KTP lasers up to manufacturer-stated power densities",
      "Two-cuff design preserves seal after a proximal cuff hit",
    ],
    cons: [
      "Larger external diameter than equivalent PVC tube — narrows surgical view",
      "Cuffs are PVC — flammable if struck directly; inflate with saline + dye",
      "Not laser-safe above the cuff zone if the wrap is breached",
    ],
    notes:
      "Inflate cuffs with saline coloured by methylene blue — a strike causes immediate visible leak and self-quenching.",
    render: () => (
      <g>
        {/* Stainless steel spiral shaft — alternating diagonal stripes */}
        <defs>
          <pattern id="steelSpiral" width="14" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
            <rect width="14" height="34" fill="hsl(210 10% 75%)" />
            <rect width="14" height="6" fill="hsl(210 12% 55%)" />
            <rect y="17" width="14" height="2" fill="hsl(210 15% 40%)" opacity="0.6" />
          </pattern>
        </defs>
        <rect x="40" y="78" width="280" height="34" rx="6" fill="url(#steelSpiral)" stroke="hsl(210 15% 35%)" strokeWidth="1" />
        {/* Inner PVC liner suggested by lighter band */}
        <rect x="40" y="90" width="280" height="10" fill="hsl(45 60% 92%)" opacity="0.55" />
        {/* Twin distal cuffs */}
        <ellipse cx="285" cy="95" rx="14" ry="22" fill="hsl(200 70% 60%)" opacity="0.55" stroke="hsl(200 60% 35%)" />
        <ellipse cx="315" cy="95" rx="14" ry="22" fill="hsl(200 70% 60%)" opacity="0.55" stroke="hsl(200 60% 35%)" />
        <text x="270" y="140" fontSize="9" textAnchor="middle" fill="hsl(var(--foreground))">prox cuff</text>
        <text x="330" y="140" fontSize="9" textAnchor="middle" fill="hsl(var(--foreground))">distal cuff</text>
        {/* Pilot lines */}
        <path d="M 285 73 Q 285 50 250 45" fill="none" stroke="hsl(200 60% 40%)" strokeWidth="1" />
        <path d="M 315 73 Q 315 35 270 30" fill="none" stroke="hsl(200 60% 40%)" strokeWidth="1" />
        {/* Annotations */}
        <text x="40" y="68" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">Stainless steel spiral wrap (CO₂/KTP)</text>
        <text x="40" y="135" fontSize="9" fill="hsl(var(--muted-foreground))">Smooth PVC inner channel</text>
      </g>
    ),
  },
  bivona: {
    name: "Bivona Fome-Cuf (laser variant)",
    brand: "Aluminium-foil wrapped silicone tube",
    shaft:
      "Silicone tube wrapped helically in aluminium foil, then over-wrapped with a fluoroplastic film. Reflects CO₂ and Nd:YAG; not for KTP.",
    cuffs:
      "Single self-inflating polyurethane foam cuff. Cuff is left open to atmosphere intra-operatively so a laser strike vents harmlessly rather than rupturing.",
    pros: [
      "Approved for CO₂ and Nd:YAG (the broadest wavelength coverage)",
      "Foam cuff conforms to irregular subglottic anatomy with low cuff pressure",
      "Self-sealing if the cuff envelope is perforated",
    ],
    cons: [
      "Foil wrap can crack on tight curves — inspect before use",
      "Reflective surface can scatter the beam back at staff and the cornea",
      "Cuff must be deflated, irrigated with saline, then left vented during lasing",
    ],
    notes:
      "Pack the supraglottis with saline-soaked neuro-pledgets — soaked gauze converts stray laser energy into harmless steam.",
    render: () => (
      <g>
        <defs>
          <pattern id="foilWrap" width="12" height="34" patternUnits="userSpaceOnUse" patternTransform="rotate(-15)">
            <rect width="12" height="34" fill="hsl(40 25% 90%)" />
            <rect x="0" y="0" width="12" height="2" fill="hsl(40 10% 55%)" opacity="0.7" />
            <rect x="0" y="17" width="12" height="2" fill="hsl(40 10% 55%)" opacity="0.5" />
          </pattern>
        </defs>
        {/* Silicone underlayer */}
        <rect x="40" y="78" width="240" height="34" rx="6" fill="hsl(35 45% 80%)" />
        {/* Foil wrap */}
        <rect x="40" y="78" width="240" height="34" rx="6" fill="url(#foilWrap)" opacity="0.85" stroke="hsl(40 15% 45%)" strokeWidth="1" />
        {/* Foam cuff */}
        <ellipse cx="270" cy="95" rx="38" ry="26" fill="hsl(30 60% 78%)" stroke="hsl(30 50% 45%)" strokeWidth="1" />
        <text x="270" y="140" fontSize="9" textAnchor="middle" fill="hsl(var(--foreground))">foam cuff (vented)</text>
        {/* Pilot vent open to air */}
        <path d="M 270 70 Q 270 40 230 35" fill="none" stroke="hsl(30 50% 45%)" strokeWidth="1" />
        <text x="225" y="32" fontSize="8" textAnchor="end" fill="hsl(var(--muted-foreground))">left to atmosphere</text>
        {/* Annotations */}
        <text x="40" y="68" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">Aluminium foil over silicone (CO₂/Nd:YAG)</text>
        <text x="40" y="135" fontSize="9" fill="hsl(var(--muted-foreground))">Self-sealing fluoroplastic outer film</text>
      </g>
    ),
  },
  sheridan: {
    name: "Sheridan Laser-Trach",
    brand: "Red-rubber tube with embossed copper foil + Merocel wrap",
    shaft:
      "Red rubber shaft wrapped in copper foil, then covered with a saline-soakable Merocel sponge envelope. Approved for CO₂ and Nd:YAG.",
    cuffs:
      "Two distal PVC cuffs filled with methylene-blue saline. Sponge cuff sleeve absorbs scatter at the glottis.",
    pros: [
      "Sponge wrap absorbs stray photons and can be re-soaked intra-operatively",
      "Twin-cuff redundancy if the proximal cuff is hit",
      "Copper foil dissipates focal heat better than aluminium",
    ],
    cons: [
      "Bulkier external diameter — uncomfortable in tight glottic surgery",
      "Sponge must be kept moist — dry sponge becomes flammable",
      "Single-use; relatively expensive",
    ],
    notes:
      "Re-irrigate the sponge envelope every few minutes — a desiccated wrap loses its protective effect entirely.",
    render: () => (
      <g>
        {/* Sponge envelope */}
        <rect x="38" y="74" width="244" height="42" rx="10" fill="hsl(35 35% 88%)" stroke="hsl(35 25% 55%)" strokeDasharray="2 2" />
        {/* Copper foil */}
        <defs>
          <pattern id="copperWrap" width="12" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
            <rect width="12" height="30" fill="hsl(20 60% 55%)" />
            <rect width="12" height="2" fill="hsl(15 70% 30%)" opacity="0.7" />
          </pattern>
        </defs>
        <rect x="44" y="80" width="232" height="30" rx="5" fill="url(#copperWrap)" stroke="hsl(15 60% 30%)" strokeWidth="1" />
        {/* Red rubber inner */}
        <rect x="44" y="92" width="232" height="6" fill="hsl(0 55% 35%)" opacity="0.7" />
        {/* Twin cuffs */}
        <ellipse cx="262" cy="95" rx="13" ry="20" fill="hsl(220 70% 50%)" opacity="0.55" stroke="hsl(220 60% 30%)" />
        <ellipse cx="290" cy="95" rx="13" ry="20" fill="hsl(220 70% 50%)" opacity="0.55" stroke="hsl(220 60% 30%)" />
        <text x="276" y="140" fontSize="9" textAnchor="middle" fill="hsl(var(--foreground))">methylene-blue saline cuffs</text>
        <text x="40" y="68" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">Copper foil + Merocel sponge wrap</text>
        <text x="40" y="135" fontSize="9" fill="hsl(var(--muted-foreground))">Sponge envelope — keep saturated</text>
      </g>
    ),
  },
};

interface Wavelength {
  laser: string;
  wavelength: string;
  ocularTarget: string;
  patientRisk: string;
  staffRisk: string;
  filter: string;
  od: string; // optical density
  colour: string;
}

const WAVELENGTHS: Wavelength[] = [
  {
    laser: "CO₂",
    wavelength: "10 600 nm (far-IR)",
    ocularTarget: "Cornea & conjunctiva — water absorbs photons in the surface",
    patientRisk: "Corneal burn, abrasion, scleral injury (eye must be taped closed and covered with saline-soaked gauze + metal shield)",
    staffRisk: "Corneal burn from stray reflection — clear polycarbonate or glass safety spectacles with side shields suffice",
    filter: "Clear glass / polycarbonate safety spectacles (CO₂ does not penetrate ordinary glass)",
    od: "OD ≥ 5 @ 10 600 nm",
    colour: "hsl(355 75% 55%)",
  },
  {
    laser: "Nd:YAG",
    wavelength: "1064 nm (near-IR, invisible)",
    ocularTarget: "Retina — beam transmitted through cornea & lens, focused onto fovea",
    patientRisk: "Direct retinal burn → permanent scotoma; deep tissue penetration (3–5 mm) so deep mucosal injury possible",
    staffRisk: "Permanent retinal scotoma from a single stray reflection — invisible beam, no blink reflex",
    filter: "Green/blue-green tinted goggles certified OD ≥ 5+ @ 1064 nm — wavelength-specific",
    od: "OD ≥ 5 @ 1064 nm",
    colour: "hsl(140 55% 40%)",
  },
  {
    laser: "KTP / Argon",
    wavelength: "532 nm (visible green) / 488–514 nm (blue-green)",
    ocularTarget: "Retina — preferentially absorbed by haemoglobin & melanin",
    patientRisk: "Retinal & macular burn; corneal epithelial damage if focused at surface",
    staffRisk: "Photochemical retinal injury — bright reflections also disabling glare",
    filter: "Orange/amber (KTP) or red-orange (Argon) wavelength-specific goggles, OD ≥ 4+",
    od: "OD ≥ 4 @ 532 nm",
    colour: "hsl(120 70% 45%)",
  },
];

type Tab = "ett" | "eyes";

const LaserAirwayDiagram = () => {
  const [tab, setTab] = useState<Tab>("ett");
  const [ettKey, setEttKey] = useState<ETTKey>("laserflex");
  const [waveIdx, setWaveIdx] = useState(0);

  const ett = ETTS[ettKey];
  const wave = WAVELENGTHS[waveIdx];

  return (
    <DiagramFigure
      id="laser-airway-diagram"
      title="Laser airway"
      description="Auto-generated wrapper for the Laser airway anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="my-6 p-4 rounded-xl border border-border bg-card">
        <div className="mb-3">
          <h3 className="text-lg font-serif font-bold text-foreground">Laser airway: tubes & ocular protection</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Annotated cross-sections of the three laser-resistant ETTs in common UK use, plus the
            wavelength-specific eye-protection rationale for patient and staff.
          </p>
        </div>
  
        <div className="flex gap-2 mb-3 flex-wrap">
          {([
            ["ett", "Laser-resistant ETTs"],
            ["eyes", "Eye protection"],
          ] as Array<[Tab, string]>).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors ${
                tab === k
                  ? "bg-clinical text-white border-clinical"
                  : "bg-background text-muted-foreground border-border hover:border-clinical/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
  
        {tab === "ett" && (
          <>
            <div className="flex gap-2 mb-3 flex-wrap">
              {(Object.keys(ETTS) as ETTKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => setEttKey(k)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors ${
                    ettKey === k
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {ETTS[k].name}
                </button>
              ))}
            </div>
  
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-4 items-start">
              <div className="rounded-lg border border-border bg-background p-2">
                <svg viewBox="0 0 360 170" className="w-full h-auto" role="img" aria-label={`${ett.name} cross-section`}>
                  {/* 15 mm connector */}
                  <rect x="6" y="84" width="34" height="22" rx="3" fill="hsl(0 0% 30%)" />
                  <text x="23" y="78" fontSize="8" textAnchor="middle" fill="hsl(var(--muted-foreground))">15 mm</text>
                  {ett.render()}
                </svg>
              </div>
  
              <div className="space-y-2">
                <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
                  <p className="text-sm font-bold text-foreground">{ett.name}</p>
                  <p className="text-xs text-muted-foreground italic mt-0.5">{ett.brand}</p>
                </div>
  
                <div className="p-2.5 rounded-lg border border-border bg-background">
                  <p className="text-xs font-semibold text-foreground mb-1">Shaft construction</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{ett.shaft}</p>
                </div>
  
                <div className="p-2.5 rounded-lg border border-border bg-background">
                  <p className="text-xs font-semibold text-foreground mb-1">Cuff design</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{ett.cuffs}</p>
                </div>
  
                <div className="grid sm:grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
                    <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Strengths</p>
                    <ul className="space-y-1">
                      {ett.pros.map((p, i) => (
                        <li key={i} className="text-[11px] text-muted-foreground leading-snug pl-3 relative">
                          <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-emerald-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-2.5 rounded-lg border border-amber-500/30 bg-amber-500/5">
                    <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mb-1">Pitfalls</p>
                    <ul className="space-y-1">
                      {ett.cons.map((p, i) => (
                        <li key={i} className="text-[11px] text-muted-foreground leading-snug pl-3 relative">
                          <span className="absolute left-0 top-1.5 w-1 h-1 rounded-full bg-amber-500" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
  
                <div className="p-2.5 rounded bg-clinical/5 border border-clinical/30 text-xs text-muted-foreground">
                  <strong className="text-foreground">Tip: </strong>{ett.notes}
                </div>
              </div>
            </div>
  
            <div className="mt-3 p-2.5 rounded bg-secondary/40 border border-border text-xs text-muted-foreground">
              <strong className="text-foreground">Universal precautions: </strong>
              FiO₂ ≤ 0.30, air/O₂ mix only (never N₂O), saline-soaked pledgets at the glottis,
              saline syringe primed on the airway trolley, surgeon and anaesthetist agree the laser-fire drill before draping,
              and a fresh ETT pre-loaded for emergency re-intubation.
            </div>
          </>
        )}
  
        {tab === "eyes" && (
          <>
            <div className="flex gap-2 mb-3 flex-wrap">
              {WAVELENGTHS.map((w, i) => (
                <button
                  key={w.laser}
                  onClick={() => setWaveIdx(i)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-colors ${
                    waveIdx === i
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-muted-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {w.laser}
                </button>
              ))}
            </div>
  
            <div className="grid lg:grid-cols-[1fr_1fr] gap-4 items-start">
              {/* Eye cross-section */}
              <div className="rounded-lg border border-border bg-background p-2">
                <svg viewBox="0 0 360 240" className="w-full h-auto" role="img" aria-label={`Eye cross-section showing ${wave.laser} target`}>
                  {/* Globe */}
                  <ellipse cx="180" cy="120" rx="120" ry="90" fill="hsl(0 0% 99%)" stroke="hsl(0 0% 35%)" strokeWidth="1.5" />
                  {/* Cornea bulge */}
                  <path d="M 60 120 Q 30 120 60 90 Q 70 80 75 90" fill="hsl(195 50% 92%)" stroke="hsl(0 0% 35%)" strokeWidth="1.5" />
                  <path d="M 60 120 Q 30 120 60 150 Q 70 160 75 150" fill="hsl(195 50% 92%)" stroke="hsl(0 0% 35%)" strokeWidth="1.5" />
                  {/* Iris + pupil */}
                  <ellipse cx="78" cy="120" rx="6" ry="22" fill="hsl(28 55% 35%)" />
                  <ellipse cx="78" cy="120" rx="3" ry="11" fill="hsl(0 0% 5%)" />
                  {/* Lens */}
                  <ellipse cx="100" cy="120" rx="14" ry="28" fill="hsl(45 50% 90%)" stroke="hsl(40 30% 55%)" />
                  {/* Vitreous label */}
                  <text x="200" y="115" fontSize="9" fill="hsl(var(--muted-foreground))">vitreous</text>
                  {/* Retina arc + fovea */}
                  <path d="M 290 70 Q 300 120 290 170" fill="none" stroke="hsl(355 70% 45%)" strokeWidth="3" />
                  <circle cx="297" cy="120" r="4" fill="hsl(355 70% 35%)" />
                  <text x="305" y="123" fontSize="9" fill="hsl(var(--foreground))">fovea</text>
                  <text x="305" y="80" fontSize="9" fill="hsl(355 70% 45%)">retina</text>
                  {/* Optic nerve */}
                  <path d="M 300 160 Q 330 175 345 195" fill="none" stroke="hsl(0 0% 30%)" strokeWidth="3" />
                  <text x="332" y="210" fontSize="9" fill="hsl(var(--muted-foreground))">optic n.</text>
  
                  {/* Beam — behaviour depends on wavelength */}
                  {wave.laser === "CO₂" && (
                    <>
                      <line x1="0" y1="120" x2="60" y2="120" stroke={wave.colour} strokeWidth="3" />
                      {/* Burst at cornea */}
                      <g fill={wave.colour} opacity="0.85">
                        <circle cx="62" cy="120" r="4" />
                        <line x1="55" y1="105" x2="68" y2="135" stroke={wave.colour} strokeWidth="1.5" />
                        <line x1="55" y1="135" x2="68" y2="105" stroke={wave.colour} strokeWidth="1.5" />
                      </g>
                      <text x="40" y="100" fontSize="9" fill={wave.colour} fontWeight="600">absorbed at cornea</text>
                    </>
                  )}
                  {(wave.laser === "Nd:YAG" || wave.laser === "KTP / Argon") && (
                    <>
                      {/* Beam through cornea, lens → focused on fovea */}
                      <line x1="0" y1="120" x2="297" y2="120" stroke={wave.colour} strokeWidth="2" />
                      <line x1="0" y1="116" x2="297" y2="118" stroke={wave.colour} strokeWidth="1" opacity="0.5" />
                      <line x1="0" y1="124" x2="297" y2="122" stroke={wave.colour} strokeWidth="1" opacity="0.5" />
                      {/* Focal burn at fovea */}
                      <circle cx="297" cy="120" r="8" fill="none" stroke={wave.colour} strokeWidth="1.5" opacity="0.7" />
                      <circle cx="297" cy="120" r="13" fill="none" stroke={wave.colour} strokeWidth="1" opacity="0.4" />
                      <text x="155" y="108" fontSize="9" fill={wave.colour} fontWeight="600">transmitted to retina</text>
                    </>
                  )}
  
                  {/* Wavelength label */}
                  <text x="10" y="20" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">
                    {wave.laser} — {wave.wavelength}
                  </text>
                  <text x="10" y="34" fontSize="9" fill="hsl(var(--muted-foreground))">target: {wave.ocularTarget}</text>
                </svg>
              </div>
  
              <div className="space-y-2">
                <div className="p-3 rounded-lg border border-clinical/30 bg-clinical/5">
                  <p className="text-sm font-bold text-foreground">Why eye protection matters</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    An anaesthetised patient cannot blink, avert their gaze or report pain — the lids are
                    often taped, and a stray reflection from a metal retractor or wet mucosa can deliver
                    the full focal energy of the beam to cornea or retina in microseconds. Theatre staff
                    face the same hazard from invisible (CO₂, Nd:YAG) or brilliantly visible (KTP)
                    reflections that easily outrun the blink reflex (~200 ms).
                  </p>
                </div>
  
                <div className="p-2.5 rounded-lg border border-border bg-background">
                  <p className="text-xs font-semibold text-foreground mb-1">Patient risk</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{wave.patientRisk}</p>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    <strong className="text-foreground">Patient eye protocol: </strong>
                    lids taped closed, lubricated with paraffin-free gel, covered with saline-soaked gauze
                    and a wet-cloth-wrapped metal eye shield. The whole face is then draped with
                    damp surgical drapes so any beam strike is absorbed before reaching skin or eye.
                  </p>
                </div>
  
                <div className="p-2.5 rounded-lg border border-border bg-background">
                  <p className="text-xs font-semibold text-foreground mb-1">Staff risk</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{wave.staffRisk}</p>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    <strong className="text-foreground">Required PPE: </strong>{wave.filter} ({wave.od}).
                    Eyewear is wavelength-specific — CO₂ glasses give zero retinal protection from Nd:YAG
                    and vice versa. Door warning sign, theatre windows covered, designated Laser Protection
                    Supervisor present, matt-finish instruments where possible.
                  </p>
                </div>
  
                <div className="p-2.5 rounded bg-destructive/5 border border-destructive/30 text-[11px] text-muted-foreground">
                  <strong className="text-foreground">Fire-triangle reminder: </strong>
                  the laser is the ignition source, the ETT/drapes/cuff/surgical swabs are the fuel, and
                  O₂ (± N₂O) is the oxidiser. Ocular injury and airway fire share the same root cause —
                  an unprotected target meeting an undiluted beam.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DiagramFigure>
  );
};

export default LaserAirwayDiagram;
