import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { CardiacOutputMonitorDiagram } from "@/components/diagrams/CardiacOutputMonitorDiagram";
import PiCCODiagram from "@/components/diagrams/PiCCODiagram";
import PACDiagram from "@/components/diagrams/PACDiagram";
import EchoDiagram from "@/components/diagrams/EchoDiagram";
import TOEViewsDiagram from "@/components/diagrams/TOEViewsDiagram";
import MModeDiagram from "@/components/diagrams/MModeDiagram";
import MModePathologyDiagram from "@/components/diagrams/MModePathologyDiagram";
import OesophagealDopplerDiagram from "@/components/diagrams/OesophagealDopplerDiagram";
import { cardiacOutputMonitoringQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import COPitfallsChecklist from "@/components/diagrams/COPitfallsChecklist";

const CardiacOutputMonitoringTopic = () => {
  return (
    <SectionLayout title="Cardiac Output Monitoring" subtitle="FRCA Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        {/* 1. Introduction & curriculum scope */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">1. Introduction & Curriculum Scope</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cardiac output (CO) monitoring quantifies the volume of blood ejected by the left ventricle per minute (CO = SV × HR, normal 4–8 L/min; CI 2.5–4.0 L/min/m²). It underpins assessment of shock, fluid responsiveness, and the response to vasoactive therapy. No single device is "best" — each technology trades invasiveness, accuracy, continuity, and the range of derived variables.
          </p>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="font-semibold text-foreground text-sm mb-2">Curriculum mapping</p>
            <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
              <li><span className="font-medium text-foreground">FRCA Final (RCoA):</span> principles of CO measurement; Fick principle; indicator dilution and thermodilution; pulse contour analysis; oesophageal Doppler; echocardiography for haemodynamic assessment; advantages and limitations of available monitors.</li>
              <li><span className="font-medium text-foreground">FFICM (FICM):</span> haemodynamic monitoring in shock; fluid responsiveness assessment; SvO₂/ScvO₂ interpretation; appropriate selection and interpretation of CO monitoring; evidence base (PAC-Man, FACTT, OPTIMISE) and limitations of each modality.</li>
              <li><span className="font-medium text-foreground">Common SBA / structured oral themes:</span> Stewart-Hamilton equation, dynamic vs static preload markers, sources of error, choosing a monitor for a clinical scenario.</li>
            </ul>
          </div>
        </div>

        {/* 2. Why measure CO */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">2. Why Measure Cardiac Output?</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Blood pressure alone is a poor surrogate for tissue perfusion: MAP can be preserved despite a falling CO through compensatory vasoconstriction. Direct or derived CO measurement allows the clinician to:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
            <li><span className="font-medium text-foreground">Define the type of shock</span> using a haemodynamic profile (CO, SVR, preload, oxygenation indices).</li>
            <li><span className="font-medium text-foreground">Predict fluid responsiveness</span> before committing to volume that may worsen lung water.</li>
            <li><span className="font-medium text-foreground">Titrate vasoactive drugs</span> (inotropes vs vasopressors) to a physiological endpoint.</li>
            <li><span className="font-medium text-foreground">Calculate oxygen delivery</span> (DO₂ = CO × CaO₂) — the link between haemodynamics and tissue oxygenation.</li>
            <li><span className="font-medium text-foreground">Detect and trend deterioration</span> earlier than BP, lactate, or urine output.</li>
          </ul>
        </div>

        {/* 3. Physiological foundations */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">3. Physiological Foundations</h2>

          <div className="space-y-4">
            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-foreground text-sm mb-1">Fick principle (the reference standard)</p>
              <p className="text-sm text-muted-foreground">
                CO = VO₂ / (CaO₂ − CvO₂). The volume of oxygen consumed per minute equals the difference in O₂ content between arterial and mixed venous blood multiplied by the flow. Requires steady-state VO₂ (metabolic cart), arterial blood gas, and a true mixed venous sample from the PA. Accurate but cumbersome — used to validate other methods rather than at the bedside.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-foreground text-sm mb-1">Indicator dilution & the Stewart-Hamilton equation</p>
              <p className="text-sm text-muted-foreground mb-2">
                A known dose of indicator (cold saline, lithium, dye) is injected upstream and its concentration sampled downstream. CO is inversely proportional to the area under the resulting concentration-time curve:
              </p>
              <div className="bg-muted/40 rounded px-3 py-2 font-mono text-xs text-foreground">CO = (V<sub>i</sub> × (T<sub>b</sub> − T<sub>i</sub>) × K) / ∫ ΔT · dt</div>
              <p className="text-xs text-muted-foreground mt-2">
                Where V<sub>i</sub> = volume injected, T<sub>b</sub>/T<sub>i</sub> = blood/injectate temperature, K = computation constant, and ∫ΔT·dt = area under the temperature-time curve at the thermistor. A small AUC reflects rapid wash-out and high CO; a large AUC reflects slow wash-out and low CO.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-foreground text-sm mb-1">Doppler principle</p>
              <p className="text-sm text-muted-foreground">
                Frequency shift of reflected ultrasound is proportional to red cell velocity: Δf = (2 f<sub>0</sub> v cos θ) / c. Multiplying the velocity-time integral (VTI, "stroke distance") by the cross-sectional area of the vessel gives stroke volume. Underpins both the oesophageal Doppler (descending aorta) and echocardiographic SV (LVOT VTI × LVOT area).
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-foreground text-sm mb-1">Pulse contour analysis</p>
              <p className="text-sm text-muted-foreground">
                Stroke volume is estimated beat-to-beat from the area under the systolic portion of the arterial pressure waveform, scaled by an estimate of aortic compliance. Requires either a calibration step (PiCCO via TPTD, LiDCO via lithium) or a demographic/waveform-derived compliance estimate (FloTrac — uncalibrated). Accuracy degrades when compliance changes rapidly (vasoplegia, vasopressor titration, aortic regurgitation, IABP, arrhythmia).
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-foreground text-sm mb-1">Bioimpedance & bioreactance</p>
              <p className="text-sm text-muted-foreground">
                Thoracic bioimpedance measures changes in resistance to a small applied current as blood volume in the aorta varies. Bioreactance (NICOM) measures the phase shift of the signal — less susceptible to motion and electrical noise. Completely non-invasive but limited absolute accuracy, particularly in low-flow states, oedema, and with diathermy.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Reference standard & validation hierarchy */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">4. Reference Standard & Validation Hierarchy</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Devices are validated by Bland-Altman analysis (bias, precision, limits of agreement) and percentage error vs a reference. A percentage error ≤30% (Critchley & Critchley, 1999) is regarded as clinically interchangeable.
          </p>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Tier</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Method</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                <tr><td className="px-3 py-2 font-medium text-foreground">Gold standard (research)</td><td className="px-3 py-2">Direct Fick</td><td className="px-3 py-2">Validation only — too cumbersome clinically</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">Clinical reference</td><td className="px-3 py-2">PAC bolus thermodilution (mean of 3)</td><td className="px-3 py-2">Reference for new device studies</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">Calibrated continuous</td><td className="px-3 py-2">PiCCO / LiDCO / continuous-CO PAC</td><td className="px-3 py-2">Bedside, beat-to-beat, periodic recalibration</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">Uncalibrated continuous</td><td className="px-3 py-2">FloTrac, oesophageal Doppler</td><td className="px-3 py-2">Trending, intra-operative GDT</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">Non-invasive</td><td className="px-3 py-2">NICOM, ClearSight (volume-clamp), TTE</td><td className="px-3 py-2">Screening, ambulatory, perioperative</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Equipment comparison (existing diagram) */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">5. Equipment Comparison</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Side-by-side comparison of the four mainstream technologies — principles, waveforms, and clinical application.
          </p>
          <div className="rounded-xl border border-border bg-card p-4">
            <CardiacOutputMonitorDiagram />
          </div>
        </div>

        {/* 6. Thermodilution methods */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">6. Thermodilution Methods</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Both PAC and PiCCO use cold saline as the indicator and the Stewart-Hamilton equation, but the geometry of the dilution path differs.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Right-heart thermodilution (PAC)</p>
              <p className="text-sm text-muted-foreground mt-1">10 mL iced saline injected via the RA port; thermistor at the PA tip detects the temperature change. Short transit time. Provides intermittent (or continuous via a heated filament) CO, plus PAOP, CVP, PAP, SvO₂, and derived PVR/SVR.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Transpulmonary thermodilution (TPTD, PiCCO/EV1000)</p>
              <p className="text-sm text-muted-foreground mt-1">15–20 mL iced saline via CVC; thermistor at the femoral artery. The longer transit through both ventricles and the pulmonary circulation allows mathematical derivation of GEDV (preload) and EVLW (lung water) from the mean transit time and exponential down-slope of the curve.</p>
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Sources of error:</span> respiratory variation (inject at end-expiration), tricuspid regurgitation (recirculation distorts the curve), intracardiac shunts (loss of indicator), warm/incorrect injectate volume, thermistor drift, and rapid changes in patient temperature (CRRT, ECMO).</p>
          </div>
        </div>

        {/* 7. Pulse contour & uncalibrated devices */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">7. Pulse Contour & Uncalibrated Devices</h2>
          <div className="space-y-3">
            {[
              { device: "PiCCO (calibrated pulse contour)", desc: "Pulse contour CO recalibrated against TPTD every 8 h or after major haemodynamic change. Provides GEDI, EVLWI, PVPI, GEF, SVV, PPV. Inaccurate with severe aortic regurgitation, IABP, and during the immediate vasopressor titration window." },
              { device: "LiDCO / LiDCOplus (calibrated pulse power)", desc: "0.15–0.30 mmol lithium chloride bolus via any central or peripheral vein; lithium-sensitive electrode on a standard arterial line. PulseCO algorithm derives continuous CO from the pulse power. Avoid: first-trimester pregnancy, lithium therapy (baseline lithium present), and within 30 min of non-depolarising NMBA (cross-reacts with the electrode)." },
              { device: "FloTrac/Vigileo (uncalibrated pulse contour)", desc: "Standard arterial line + dedicated transducer. Compliance estimated from age, sex, height, weight, and the waveform itself; updated every 20 s. Convenient (no calibration) but accuracy degrades in vasoplegia, rapid SVR change, severe arrhythmia, and aortic regurgitation. Latest software (4th-generation) has improved performance in low-SVR states." },
              { device: "ClearSight / Nexfin (volume-clamp)", desc: "Inflatable finger cuff maintains constant arterial volume; reconstructs a brachial-equivalent waveform for pulse contour analysis. Truly non-invasive continuous CO; useful perioperatively. Limited by peripheral vasoconstriction and finger oedema." },
              { device: "Oesophageal Doppler (ODM, CardioQ)", desc: "Doppler probe placed in the mid-oesophagus measures descending aortic velocity. CO = VTI × aortic CSA × HR × correction factor (assumes 70% of CO via descending aorta). FTc < 330 ms suggests hypovolaemia; peak velocity reflects contractility. Operator-dependent (probe focusing) and uncomfortable in awake patients — best in the anaesthetised, intubated patient. Strongest evidence base for intra-operative GDT." },
              { device: "NICOM (bioreactance)", desc: "Four electrode pads on the thorax; analyses phase shift of a low-amplitude high-frequency signal. Completely non-invasive. Reasonable trending ability but limited absolute accuracy in low-flow states, lung oedema, large pleural effusions, and with diathermy." },
            ].map((d) => (
              <div key={d.device} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{d.device}</p>
                <p className="text-sm text-muted-foreground mt-1">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Echocardiography */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">8. Echocardiography for Haemodynamic Assessment</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Echo is unique in that it identifies the <span className="italic">cause</span> of haemodynamic derangement, not just the haemodynamic profile. SV is calculated as LVOT VTI × LVOT cross-sectional area (π × (LVOT diameter / 2)²); CO = SV × HR.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-foreground text-sm">TTE — focused protocols</p>
              <p className="text-sm text-muted-foreground mt-1">FATE, FUSIC HD, FOCUS, RUSH. Rapid binary assessment of LV function, RV strain, pericardial fluid, IVC collapsibility, and gross valve disease. Accreditation routes via BSE Level 1 / FUSIC.</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-foreground text-sm">TOE — when to use</p>
              <p className="text-sm text-muted-foreground mt-1">Better windows in the ventilated, obese, or post-cardiac-surgery patient; intra-operative cardiac surgery; suspected endocarditis or aortic dissection; persistent unexplained shock when TTE windows are inadequate. Risks: oesophageal injury (~0.02%), bleeding, displacement of ETT.</p>
            </div>
          </div>
        </div>

        {/* 9. Fluid responsiveness */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">9. Assessing Fluid Responsiveness</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            "Fluid responsive" means a ≥10–15% increase in SV after a 250–500 mL fluid challenge — i.e. operating on the steep portion of the Starling curve. Static markers (CVP, PAOP) are poor predictors; dynamic markers exploit heart-lung interactions.
          </p>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Marker</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Threshold</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Requirements / pitfalls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                <tr><td className="px-3 py-2 font-medium text-foreground">SVV / PPV</td><td className="px-3 py-2">&gt;10–13%</td><td className="px-3 py-2">Sinus rhythm, mandatory ventilation, V<sub>T</sub> ≥ 8 mL/kg, closed chest, no significant RV failure or raised intra-abdominal pressure</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">Passive leg raise (PLR)</td><td className="px-3 py-2">↑ SV ≥10%</td><td className="px-3 py-2">Reversible "auto-bolus" of ~300 mL — works in spontaneous breathing and arrhythmia. Needs continuous SV monitoring (Doppler, PiCCO, echo VTI)</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">End-expiratory occlusion</td><td className="px-3 py-2">↑ CO ≥5%</td><td className="px-3 py-2">15 s expiratory hold ↑ preload; useful when SVV/PPV unreliable</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">IVC distensibility (TTE)</td><td className="px-3 py-2">ΔIVC &gt;18% (vent) / &gt;50% collapse (SB)</td><td className="px-3 py-2">Subcostal view; affected by raised intra-abdominal pressure and RV failure</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">Mini-fluid challenge</td><td className="px-3 py-2">↑ SV ≥6% after 100 mL over 1 min</td><td className="px-3 py-2">Avoids overload if non-responsive</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">FTc (oesophageal Doppler)</td><td className="px-3 py-2">&lt;330 ms</td><td className="px-3 py-2">Static surrogate of preload — historically used to drive intra-op GDT</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 10. Oxygen delivery */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">10. Oxygen Delivery, SvO₂ & ScvO₂</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            CO matters because it drives oxygen delivery: <span className="font-mono text-foreground">DO₂ = CO × CaO₂ = CO × (1.34 × Hb × SaO₂ + 0.003 × PaO₂)</span> ≈ 1000 mL/min in a 70 kg adult. Tissue extraction (VO₂ ≈ 250 mL/min) gives a normal mixed venous saturation of 65–75%.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-foreground text-sm">SvO₂ (PA sample)</p>
              <p className="text-sm text-muted-foreground mt-1">True mixed venous, sampled from the PA via a PAC. Normal 65–75%. Falls when DO₂ falls (low CO, anaemia, hypoxaemia) or VO₂ rises (fever, shivering, agitation). Continuous fibre-optic measurement is possible.</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="font-semibold text-foreground text-sm">ScvO₂ (CVC sample)</p>
              <p className="text-sm text-muted-foreground mt-1">Sampled from a CVC tip in the SVC — surrogate for SvO₂, usually ~5% higher. Easier to obtain. Used in early goal-directed sepsis bundles (target &gt;70%); subsequent trials (ProCESS, ARISE, ProMISe) showed no mortality benefit from protocolised ScvO₂-guided care, but it remains a useful marker of global DO₂/VO₂ balance.</p>
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">Veno-arterial CO₂ gap (Pv-aCO₂):</span> a normal gap is &lt;6 mmHg. A widened gap with normal ScvO₂ suggests inadequate CO despite preserved oxygen extraction — useful when ScvO₂ is misleadingly high (sepsis, cyanide, AV shunting).
          </div>
        </div>

        {/* 11. Choosing a monitor */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">11. Choosing a Monitor — Clinical Scenarios</h2>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Scenario</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Preferred monitor</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                <tr><td className="px-3 py-2 font-medium text-foreground">Major non-cardiac surgery (GDT)</td><td className="px-3 py-2">Oesophageal Doppler / FloTrac</td><td className="px-3 py-2">Quick, intra-operative, evidence-based for SV optimisation (OPTIMISE, NICE MTG3)</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">Severe ARDS with shock</td><td className="px-3 py-2">PiCCO (TPTD)</td><td className="px-3 py-2">EVLWI quantifies pulmonary oedema; PVPI distinguishes hydrostatic vs permeability oedema; supports conservative fluid strategy (FACTT)</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">Severe pulmonary hypertension / RV failure</td><td className="px-3 py-2">PAC</td><td className="px-3 py-2">Direct PAP, PVR, response to pulmonary vasodilators; SvO₂ trending</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">Cardiogenic shock / mechanical complications post-MI</td><td className="px-3 py-2">PAC + echo</td><td className="px-3 py-2">Identify VSD, papillary muscle rupture; titrate inotropes, IABP, MCS</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">Undifferentiated shock</td><td className="px-3 py-2">Focused TTE/TOE first</td><td className="px-3 py-2">Identifies cause (tamponade, RV strain, severe LV failure, hypovolaemia) before committing to invasive monitoring</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">Day-case / ambulatory perioperative</td><td className="px-3 py-2">ClearSight / NICOM</td><td className="px-3 py-2">Non-invasive, continuous, no arterial line</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 12. Pitfalls checklist (interactive, per-modality) */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">12. Pitfalls & Sources of Error</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Use the interactive checklist below to revise the most exam-relevant error sources for each CO modality. Each pitfall is graded by severity, with a one-line "why" and an exam pearl.
          </p>
          <COPitfallsChecklist />
        </div>

        {/* 13. Evidence base */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">13. Evidence Base — Key Trials</h2>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Trial</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Question</th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                <tr><td className="px-3 py-2 font-medium text-foreground">PAC-Man (2005)</td><td className="px-3 py-2">Routine PAC in ICU</td><td className="px-3 py-2">No mortality benefit; 10% complication rate — PAC use should be selective, not routine</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">ESCAPE (2005)</td><td className="px-3 py-2">PAC in severe heart failure</td><td className="px-3 py-2">No improvement in days alive out of hospital</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">FACTT (2006)</td><td className="px-3 py-2">PAC vs CVC in ARDS; conservative vs liberal fluids</td><td className="px-3 py-2">PAC no benefit over CVC; conservative fluids ↑ ventilator-free days</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">OPTIMISE (2014)</td><td className="px-3 py-2">Intra-operative GDT (Doppler/LiDCO) in major GI surgery</td><td className="px-3 py-2">Reduced complications (30-day composite); mortality not significant alone — meta-analysis supports benefit</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">ProCESS / ARISE / ProMISe (2014–15)</td><td className="px-3 py-2">Protocolised EGDT (incl. ScvO₂) in septic shock</td><td className="px-3 py-2">No mortality benefit over usual care — early antibiotics & fluids are the key drivers</td></tr>
                <tr><td className="px-3 py-2 font-medium text-foreground">NICE MTG3 (2011, updated)</td><td className="px-3 py-2">Oesophageal Doppler intra-operatively</td><td className="px-3 py-2">Recommended for major or high-risk surgery — reduces complications and length of stay</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 14. Acronyms (kept) */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">14. Acronyms & Abbreviations</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A glossary of abbreviations used throughout this topic and its diagrams. Grouped by theme for quick reference.
          </p>

          <div className="space-y-4">
            {[
              {
                group: "Devices & techniques",
                items: [
                  ["PAC", "Pulmonary Artery Catheter (Swan-Ganz catheter)"],
                  ["PiCCO", "Pulse Contour Cardiac Output (transpulmonary thermodilution + pulse contour analysis)"],
                  ["TPTD", "Transpulmonary Thermodilution — cold indicator injected centrally, detected at a peripheral (femoral) artery thermistor"],
                  ["LiDCO", "Lithium Dilution Cardiac Output (lithium chloride indicator + arterial sensor, calibrates pulse power analysis)"],
                  ["PulseCO", "Pulse Power Analysis — the continuous CO algorithm used by LiDCO between calibrations"],
                  ["FloTrac/Vigileo", "Uncalibrated arterial pulse contour CO monitor (Edwards)"],
                  ["NICOM", "Non-Invasive Cardiac Output Monitor — bioreactance (phase-shift) analysis via thoracic electrodes"],
                  ["ODM", "Oesophageal Doppler Monitor"],
                  ["TTE / TOE", "Transthoracic / Transoesophageal Echocardiography (TEE in US usage)"],
                  ["FOCUS / FATE / FUSIC", "Focused critical-care echo protocols"],
                  ["BSE", "British Society of Echocardiography (accreditation body)"],
                  ["CVC", "Central Venous Catheter"],
                ],
              },
              {
                group: "Flow, pressure & resistance",
                items: [
                  ["CO", "Cardiac Output (L/min)"],
                  ["CI", "Cardiac Index — CO indexed to body surface area (L/min/m²)"],
                  ["SV", "Stroke Volume (mL)"],
                  ["SVI", "Stroke Volume Index (mL/m²)"],
                  ["HR", "Heart Rate"],
                  ["BSA", "Body Surface Area"],
                  ["PBW", "Predicted Body Weight (used for EVLWI indexing)"],
                  ["MAP", "Mean Arterial Pressure"],
                  ["CVP", "Central Venous Pressure"],
                  ["PA / PAP", "Pulmonary Artery / Pulmonary Artery Pressure"],
                  ["RA / RV / LA / LV", "Right Atrium / Right Ventricle / Left Atrium / Left Ventricle"],
                  ["PAOP / PCWP", "Pulmonary Artery Occlusion Pressure / Pulmonary Capillary Wedge Pressure (estimate of LA pressure)"],
                  ["LVEDP", "Left Ventricular End-Diastolic Pressure"],
                  ["SVR / SVRI", "Systemic Vascular Resistance / Resistance Index"],
                  ["PVR", "Pulmonary Vascular Resistance"],
                ],
              },
              {
                group: "PiCCO-derived volumes & thermodilution maths",
                items: [
                  ["MTt", "Mean Transit Time of the thermal indicator from injection to detection"],
                  ["DSt", "Down-Slope Time — exponential decay time of the thermodilution curve (reflects largest mixing chamber, the lungs)"],
                  ["ITTV", "Intrathoracic Thermal Volume = CO × MTt (total volume the indicator passes through between CVC and femoral artery)"],
                  ["PTV", "Pulmonary Thermal Volume = CO × DSt (volume of the lungs as the largest mixing chamber)"],
                  ["GEDV", "Global End-Diastolic Volume = ITTV − PTV (combined end-diastolic volume of all four cardiac chambers)"],
                  ["GEDI", "Global End-Diastolic Volume Index = GEDV / BSA — volumetric preload marker"],
                  ["ITBV", "Intrathoracic Blood Volume ≈ 1.25 × GEDV (empirical relationship)"],
                  ["PBV", "Pulmonary Blood Volume = ITBV − GEDV"],
                  ["EVLW", "Extravascular Lung Water = ITTV − ITBV (water in lung interstitium and alveoli)"],
                  ["EVLWI", "EVLW indexed to predicted body weight (mL/kg)"],
                  ["PVPI", "Pulmonary Vascular Permeability Index = EVLW / PBV (distinguishes hydrostatic vs permeability oedema)"],
                  ["GEF", "Global Ejection Fraction = 4 × SV / GEDV (biventricular contractility surrogate)"],
                  ["CFI", "Cardiac Function Index = CO / GEDV"],
                  ["dP/dt", "Rate of pressure rise — contractility index from arterial waveform"],
                ],
              },
              {
                group: "Dynamic & oxygenation indices",
                items: [
                  ["SVV", "Stroke Volume Variation (%) — fluid responsiveness marker"],
                  ["PPV", "Pulse Pressure Variation (%) — fluid responsiveness marker"],
                  ["PLR", "Passive Leg Raise — reversible auto-bolus test of fluid responsiveness"],
                  ["FTc", "Corrected Flow Time (oesophageal Doppler); <330 ms suggests hypovolaemia"],
                  ["PV", "Peak Velocity (oesophageal Doppler) — surrogate for contractility"],
                  ["VTI / LVOT VTI", "Velocity-Time Integral / VTI across the LV outflow tract"],
                  ["LVOT", "Left Ventricular Outflow Tract"],
                  ["LVEF / EF", "Left Ventricular Ejection Fraction"],
                  ["SvO₂", "Mixed Venous Oxygen Saturation (PA sample)"],
                  ["ScvO₂", "Central Venous Oxygen Saturation (CVC sample)"],
                  ["CaO₂ / CvO₂", "Arterial / Venous Oxygen Content (Fick equation)"],
                  ["VO₂", "Oxygen Consumption (mL/min)"],
                  ["DO₂", "Oxygen Delivery = CO × CaO₂"],
                  ["Pv-aCO₂", "Veno-arterial CO₂ gap — marker of CO adequacy"],
                ],
              },
              {
                group: "Clinical, ventilation & trial terms",
                items: [
                  ["GDT", "Goal-Directed (fluid) Therapy"],
                  ["NMBA", "Neuromuscular Blocking Agent"],
                  ["MV", "Mechanical Ventilation (or Minute Ventilation — context-dependent)"],
                  ["VT", "Tidal Volume"],
                  ["IABP / MCS", "Intra-Aortic Balloon Pump / Mechanical Circulatory Support"],
                  ["ARDS", "Acute Respiratory Distress Syndrome"],
                  ["IVC / SVC", "Inferior / Superior Vena Cava"],
                  ["AF", "Atrial Fibrillation"],
                  ["EGDT", "Early Goal-Directed Therapy (Rivers protocol)"],
                  ["PAC-Man / FACTT / OPTIMISE", "Landmark RCTs of CO monitoring & fluid strategy"],
                ],
              },
            ].map((section) => (
              <div key={section.group} className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="px-4 py-2 bg-muted/50 border-b border-border">
                  <p className="font-semibold text-foreground text-sm">{section.group}</p>
                </div>
                <dl className="divide-y divide-border">
                  {section.items.map(([abbr, expansion]) => (
                    <div key={abbr} className="grid grid-cols-[7rem_1fr] sm:grid-cols-[9rem_1fr] gap-3 px-4 py-2.5">
                      <dt className="font-mono text-xs sm:text-sm font-semibold text-foreground">{abbr}</dt>
                      <dd className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{expansion}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>

        {/* 15. Interactive diagrams header */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">15. Interactive Device Diagrams</h2>
          <p className="text-muted-foreground leading-relaxed">
            The diagrams below explore each technology in depth — circuit setup, derived parameters, waveforms, and worked clinical scenarios.
          </p>
        </div>
      </section>

      <OesophagealDopplerDiagram />
      <PiCCODiagram />
      <PACDiagram />
      <EchoDiagram />
      <MModeDiagram />
      <MModePathologyDiagram />
      <TOEViewsDiagram />

      <KeyLearningPoints points={[
        "CO = SV × HR; CI 2.5–4.0 L/min/m². BP can be preserved despite a falling CO via compensatory vasoconstriction — measure flow, don't assume it.",
        "Direct Fick is the research gold standard; bolus PAC thermodilution is the clinical reference against which other devices are validated (Bland-Altman, percentage error ≤30% = interchangeable).",
        "Stewart-Hamilton: CO is inversely proportional to the area under the indicator concentration-time curve.",
        "TPTD (PiCCO) uniquely yields GEDI (volumetric preload), EVLWI (lung water) and PVPI (permeability vs hydrostatic oedema) because of the longer pulmonary transit time.",
        "Pulse contour devices need calibration (PiCCO, LiDCO) or a demographic compliance estimate (FloTrac); all degrade in aortic regurgitation, IABP, severe arrhythmia and rapid SVR change.",
        "Oesophageal Doppler is the workhorse of intra-operative GDT (NICE MTG3, OPTIMISE) — FTc < 330 ms suggests hypovolaemia.",
        "SVV / PPV > 10–13% predicts fluid responsiveness only with sinus rhythm, mandatory ventilation, V_T ≥ 8 mL/kg and a closed chest. Passive leg raise works when these conditions fail.",
        "ScvO₂ is a useful surrogate for SvO₂ but protocolised EGDT targeting ScvO₂ > 70% does not improve mortality (ProCESS / ARISE / ProMISe).",
        "PAC-Man and FACTT showed routine PAC use does not improve mortality — reserve for selective indications (RV failure, pulmonary hypertension, complex cardiogenic shock).",
        "Echo is unique: it identifies the cause of shock, not just the haemodynamic profile. Use focused TTE/TOE first in undifferentiated shock.",
      ]} />

      <QuizSection questions={cardiacOutputMonitoringQuestions} />
      <ReferencesList topicId="cardiac-output-monitoring" />

      <SeeAlso topicId="cardiac-output-monitoring" />
        <TopicCompletionToggle topicId="cardiac-output-monitoring" topicTitle="Cardiac Output Monitoring" />
    </SectionLayout>
  );
};

export default CardiacOutputMonitoringTopic;
