import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

type Severity = "critical" | "major" | "minor";

interface Pitfall {
  id: string;
  title: string;
  why: string;
  examPearl: string;
  severity: Severity;
}

interface Modality {
  id: string;
  label: string;
  fullName: string;
  oneLiner: string;
  pitfalls: Pitfall[];
}

const severityStyles: Record<Severity, { dot: string; badge: string; label: string }> = {
  critical: {
    dot: "bg-destructive",
    badge: "bg-destructive/15 text-destructive border-destructive/30",
    label: "Critical",
  },
  major: {
    dot: "bg-icu",
    badge: "bg-icu/15 text-icu border-icu/30",
    label: "Major",
  },
  minor: {
    dot: "bg-muted-foreground",
    badge: "bg-muted text-muted-foreground border-border",
    label: "Minor",
  },
};

const modalities: Modality[] = [
  {
    id: "thermo",
    label: "Thermodilution",
    fullName: "Thermodilution (PAC bolus / continuous, PiCCO TPTD)",
    oneLiner: "Indicator (cold saline) area-under-the-curve. Vulnerable to anything that changes injectate, transit, or baseline temperature.",
    pitfalls: [
      { id: "t1", severity: "critical", title: "Tricuspid regurgitation", why: "Recirculation of cold indicator across the incompetent valve broadens the curve and overestimates CO.", examPearl: "Classic SBA: \"PAC overestimates CO in...\" → severe TR." },
      { id: "t2", severity: "critical", title: "Intracardiac shunt (ASD/VSD/PFO)", why: "Indicator bypasses the systemic circulation — left-to-right shunt loses cold to the lungs (overestimates CO); right-to-left loses indicator to systemic circulation (underestimates).", examPearl: "Use Fick or echo if shunt suspected; thermodilution invalid." },
      { id: "t3", severity: "major", title: "Wrong injectate volume or temperature", why: "Stewart-Hamilton numerator depends on (Vᵢ × ΔT). 5 mL instead of 10 mL halves the calculated CO; warm 'iced' saline does the same.", examPearl: "Always 10 mL of 0–5 °C saline for adult PAC; volume entered must match the syringe." },
      { id: "t4", severity: "major", title: "Respiratory cycle variation", why: "Cyclic changes in venous return alter CO across a breath; single injections can vary ±10–20%.", examPearl: "Inject at end-expiration; take the mean of three injections within 10%." },
      { id: "t5", severity: "major", title: "Rapid temperature drift (CRRT, ECMO, warming devices)", why: "Baseline blood temperature is unstable so the curve cannot be integrated reliably.", examPearl: "Pause warming/CRRT for the measurement, or use an alternative monitor (echo, pulse contour with calibration when stable)." },
      { id: "t6", severity: "major", title: "Low cardiac output states", why: "Slow transit allows indicator loss to surrounding tissues — small numerator and broad curve overestimates CO at the low end.", examPearl: "Thermodilution is least accurate when you most need it (CO < 2.5 L/min)." },
      { id: "t7", severity: "minor", title: "Catheter malposition / thrombus on thermistor", why: "Damped thermistor signal flattens the curve; CO appears spuriously low or noisy.", examPearl: "Check PA waveform and CXR position; flush carefully." },
      { id: "t8", severity: "minor", title: "Arrhythmia between injections", why: "Beat-to-beat SV variability widens scatter; mean of three may not reflect steady-state.", examPearl: "Document rhythm at the time of measurement." },
      { id: "t9", severity: "critical", title: "VA-ECMO support", why: "Extracorporeal circuit diverts a variable fraction of venous return and re-warms/cools blood; thermistor sees indicator that has bypassed the heart entirely.", examPearl: "Native CO on VA-ECMO cannot be measured by thermodilution — use echo (LVOT VTI) or pulsatility of arterial trace." },
      { id: "t10", severity: "major", title: "Open chest / post-cardiotomy", why: "Loss of intrathoracic pressure swing alters venous return between injections; surgical handling of the heart distorts indicator transit.", examPearl: "Wait until chest closed and steady-state before trusting absolute CO." },
      { id: "t11", severity: "major", title: "Pneumonectomy / single-lung ventilation", why: "Altered pulmonary vascular bed changes indicator transit time and curve shape, particularly for TPTD-derived volumes (EVLW, GEDV).", examPearl: "TPTD volumetric indices unvalidated post-pneumonectomy." },
      { id: "t12", severity: "major", title: "Aortic aneurysm or aortic stent graft (TPTD)", why: "PiCCO assumes a normal arterial tree between injection and femoral detection; large aneurysmal volume prolongs MTt and overestimates GEDV/ITTV.", examPearl: "TPTD volumes unreliable in large AAA." },
      { id: "t13", severity: "minor", title: "Femoral arterial line in severe PVD (TPTD)", why: "Damped detection thermistor signal blunts the curve.", examPearl: "Consider axillary access if femoral inadequate." },
    ],
  },
  {
    id: "pulse",
    label: "Pulse contour",
    fullName: "Pulse contour / pulse power analysis (PiCCO, LiDCO, FloTrac, ProAQT)",
    oneLiner: "Beat-to-beat SV from the systolic area of the arterial waveform, scaled by an estimate of aortic compliance. Anything that changes compliance or distorts the trace causes error.",
    pitfalls: [
      { id: "p1", severity: "critical", title: "Aortic regurgitation", why: "Diastolic regurgitant flow corrupts the pulse contour; systolic area no longer equates to forward SV.", examPearl: "Severe AR is an absolute pitfall for all pulse contour devices." },
      { id: "p2", severity: "critical", title: "Intra-aortic balloon pump (IABP)", why: "Counterpulsation distorts the systolic area and adds a second pressure wave.", examPearl: "Pulse contour CO unreliable on IABP; use TPTD calibration value or echo." },
      { id: "p3", severity: "critical", title: "Severe arrhythmia (AF with rapid ventricular response, ectopy)", why: "Beat-to-beat SV varies widely; uncalibrated devices (FloTrac) particularly susceptible.", examPearl: "Trends are more reliable than absolute numbers." },
      { id: "p4", severity: "major", title: "Damped or over-resonant arterial line", why: "Damping flattens the systolic peak (under-reads SV); resonance exaggerates it (over-reads).", examPearl: "Always perform a fast-flush (square-wave) test before trusting pulse contour CO." },
      { id: "p5", severity: "major", title: "Rapid changes in SVR (vasopressor titration, vasoplegia)", why: "Aortic compliance is recalculated only periodically; uncalibrated FloTrac historically performed poorly in low-SVR sepsis (improved in 4th-generation algorithm).", examPearl: "Recalibrate (PiCCO/LiDCO) after any major vasoactive change." },
      { id: "p6", severity: "major", title: "Prolonged interval since last calibration", why: "Drift over 8 h, particularly with thermal events or position change.", examPearl: "PiCCO/LiDCO: recalibrate every 8 h or after any major haemodynamic change." },
      { id: "p7", severity: "major", title: "Peripheral arterial line in shock", why: "Radial-aortic pressure gradient widens in vasoplegia; the radial waveform underestimates central SV.", examPearl: "Femoral access preferred for PiCCO; check for radial-femoral gradient in profound shock." },
      { id: "p8", severity: "minor", title: "LiDCO-specific: lithium therapy or first-trimester pregnancy", why: "Baseline lithium invalidates calibration; teratogenicity concern.", examPearl: "Also avoid within 30 min of non-depolarising NMBA (electrode cross-reactivity)." },
      { id: "p9", severity: "critical", title: "VA-ECMO / non-pulsatile flow", why: "Pulse contour algorithms require a pulsatile arterial waveform; ECMO flattens or abolishes pulsatility.", examPearl: "Pulse contour CO invalid on full VA-ECMO support; reduces with VAD too." },
      { id: "p10", severity: "critical", title: "LVAD (continuous-flow)", why: "Minimal arterial pulsatility; pulse contour and finger-cuff devices fail.", examPearl: "Use echo or thermodilution (if PAC in situ)." },
      { id: "p11", severity: "major", title: "Open chest / sternotomy open", why: "Loss of pleural pressure transmission changes aortic compliance estimate and abolishes meaningful SVV/PPV.", examPearl: "Recalibrate after chest closure; SVV/PPV not interpretable with open chest." },
      { id: "p12", severity: "major", title: "ECMO cannula in femoral artery (TPTD/pulse contour)", why: "Retrograde flow from return cannula corrupts both the calibration thermal curve and the pulse contour upstream of detection.", examPearl: "Avoid PiCCO on the cannulated limb." },
      { id: "p13", severity: "major", title: "Transducer height / zero errors", why: "Transducer above phlebostatic axis under-reads MAP and shifts pulse contour SV; below over-reads. 10 cm error ≈ 7.5 mmHg.", examPearl: "Re-zero at the phlebostatic axis after every position change — classic SOE pitfall." },
      { id: "p14", severity: "minor", title: "Air bubble or clot in tubing", why: "Damps high-frequency components, flattens dicrotic notch, degrades pulse contour analysis.", examPearl: "Square-wave test should return to baseline after 1–2 oscillations." },
    ],
  },
  {
    id: "doppler",
    label: "Doppler",
    fullName: "Oesophageal Doppler (CardioQ) and echo-derived CO",
    oneLiner: "Δf = (2 f₀ v cos θ) / c. Errors come from beam alignment, fixed-area assumptions, and operator factors.",
    pitfalls: [
      { id: "d1", severity: "critical", title: "Probe malposition / loss of focus", why: "Off-axis beam underestimates velocity (cos θ); the assumed descending aortic area no longer matches.", examPearl: "Constantly re-focus the signal — operator dependence is the dominant error source." },
      { id: "d2", severity: "critical", title: "Aortic disease (aneurysm, dissection, coarctation)", why: "Distorts the descending aortic geometry; nomogram-based area is wrong.", examPearl: "Contraindicated in known aortic pathology." },
      { id: "d3", severity: "major", title: "Assumed 70:30 split between descending and brachiocephalic flow", why: "Ratio changes with cross-clamp, brain injury, or anaesthesia depth — absolute CO becomes inaccurate.", examPearl: "Best used as a trend monitor for SV optimisation, not absolute CO." },
      { id: "d4", severity: "major", title: "LVOT VTI off-axis (echo)", why: "cos θ error: a 20° angulation underestimates SV by ~6%.", examPearl: "Apical 5-chamber view; align Doppler beam parallel to flow." },
      { id: "d5", severity: "major", title: "LVOT diameter measurement error (echo)", why: "Diameter is squared in the area calculation — a 10% error becomes 20% in SV.", examPearl: "Measure in mid-systole, parasternal long-axis, inner-edge to inner-edge." },
      { id: "d6", severity: "major", title: "Awake patient discomfort / movement", why: "Probe shift loses focus, gag interferes; not tolerated unsedated.", examPearl: "Best in the anaesthetised, intubated patient." },
      { id: "d7", severity: "minor", title: "Recent oesophageal/upper GI surgery, varices, coagulopathy", why: "Risk of perforation or bleeding from probe insertion.", examPearl: "Relative contraindications — risk-benefit assessment." },
      { id: "d8", severity: "critical", title: "Absolute contraindications to oesophageal probe", why: "Severe oropharyngeal/oesophageal pathology, recent oesophagectomy, oesophageal stents, severe bleeding diathesis, intra-aortic balloon pump in descending aorta.", examPearl: "Know the absolute list — common SOE recall question." },
      { id: "d9", severity: "major", title: "Aortic cross-clamp / cardiopulmonary bypass", why: "Descending aortic flow no longer reflects systemic CO; nomogram invalid during bypass.", examPearl: "Suspend Doppler interpretation during cross-clamp and CPB." },
      { id: "d10", severity: "major", title: "Severe AS or AR (echo CO)", why: "AS: turbulent jet violates laminar-flow assumption; AR: regurgitant volume not subtracted from forward SV.", examPearl: "LVOT VTI overestimates forward SV in AR; use 3D echo or MRI." },
      { id: "d11", severity: "major", title: "Subaortic / dynamic LVOT obstruction (HOCM)", why: "Velocity profile is not flat across LVOT; assumption of uniform velocity fails.", examPearl: "Continuity equation needs different sampling site." },
      { id: "d12", severity: "minor", title: "Pacing or arrhythmia (echo)", why: "Beat-to-beat SV variability — single-beat VTI unrepresentative.", examPearl: "Average ≥3 beats in sinus, ≥5 beats in AF." },
    ],
  },
  {
    id: "impedance",
    label: "Impedance / Bioreactance",
    fullName: "Thoracic bioimpedance and bioreactance (NICOM, Cheetah)",
    oneLiner: "Detects volumetric blood movement in the aorta from changes in thoracic electrical resistance (impedance) or signal phase (bioreactance).",
    pitfalls: [
      { id: "i1", severity: "critical", title: "Diathermy / electrocautery interference", why: "High-frequency electrosurgical noise saturates the receiver.", examPearl: "Unusable intra-operatively when diathermy is active." },
      { id: "i2", severity: "critical", title: "Pulmonary oedema, large pleural effusion or pneumothorax", why: "Extra fluid or air dramatically alters thoracic impedance independent of CO.", examPearl: "Avoid in florid ARDS, severe pulmonary oedema, or post-thoracic surgery." },
      { id: "i3", severity: "major", title: "Patient motion / shivering", why: "Movement artefact dominates the small impedance changes from cardiac ejection.", examPearl: "Bioreactance (phase shift) is more robust than classic impedance but still motion-sensitive." },
      { id: "i4", severity: "major", title: "Low-flow / shock states", why: "Signal-to-noise ratio collapses; trending and absolute values both deteriorate.", examPearl: "Reasonable for trending in stable patients; not for severe shock." },
      { id: "i5", severity: "major", title: "Severe arrhythmia", why: "Beat-to-beat variability and irregular timing degrade signal averaging.", examPearl: "AF reduces accuracy similarly to other beat-to-beat methods." },
      { id: "i6", severity: "minor", title: "Electrode placement / skin contact", why: "Sweating, hair, or oedema increase impedance at the skin interface.", examPearl: "Clean, dry skin; replace electrodes per manufacturer." },
      { id: "i7", severity: "minor", title: "Pacing spikes", why: "May be misinterpreted as cardiac signal in classic impedance devices.", examPearl: "Bioreactance less affected." },
      { id: "i8", severity: "critical", title: "Implanted devices crossing the thorax (CIED leads, CRT, ICD)", why: "Metal leads alter the electrical field; pacing artefact may be counted as ejection.", examPearl: "Avoid in CRT/ICD patients, particularly with biventricular pacing." },
      { id: "i9", severity: "critical", title: "Open chest / mediastinal drains / large dressings", why: "Disrupts the closed thoracic volume conductor model.", examPearl: "Not for use in cardiothoracic ICU early post-op." },
      { id: "i10", severity: "major", title: "Aortic balloon pump / VA-ECMO", why: "Non-physiological flow patterns are not modelled.", examPearl: "Bioreactance unvalidated on mechanical circulatory support." },
      { id: "i11", severity: "major", title: "Morbid obesity or very low BMI", why: "Signal attenuation (obesity) or anatomic mismatch with nomograms.", examPearl: "Accuracy degrades at BMI extremes." },
    ],
  },
  {
    id: "noninv",
    label: "Non-invasive",
    fullName: "Volume-clamp finger cuff (ClearSight/Nexfin) & dynamic indices (SVV/PPV)",
    oneLiner: "Continuous brachial-equivalent pressure reconstruction or respiratory variation analysis. Sensitive to peripheral perfusion and ventilatory conditions.",
    pitfalls: [
      { id: "n1", severity: "critical", title: "Peripheral vasoconstriction / cold fingers", why: "Volume-clamp depends on a pulsatile finger arteriole; vasoconstriction loses the signal.", examPearl: "Unreliable in profound shock, hypothermia, or high-dose noradrenaline." },
      { id: "n2", severity: "critical", title: "SVV/PPV in spontaneous breathing or open chest", why: "Heart-lung interactions absent or unpredictable; the variation does not reflect preload reserve.", examPearl: "SVV/PPV require mandatory ventilation, V_T ≥ 8 mL/kg, sinus rhythm, closed chest." },
      { id: "n3", severity: "critical", title: "SVV/PPV in arrhythmia", why: "Beat-to-beat SV variation is not respiratory in origin.", examPearl: "Atrial fibrillation invalidates SVV/PPV — use passive leg raise instead." },
      { id: "n4", severity: "major", title: "Low tidal volume (lung-protective ventilation)", why: "V_T < 8 mL/kg generates insufficient cyclic preload change to drive measurable SVV.", examPearl: "Use end-expiratory occlusion or PLR in ARDS." },
      { id: "n5", severity: "major", title: "Right ventricular failure", why: "Cyclic SVV is generated by RV-LV interaction; severe RV failure reverses or abolishes the relationship.", examPearl: "False positives and negatives both occur." },
      { id: "n6", severity: "major", title: "Raised intra-abdominal pressure", why: "Alters transmission of pleural pressure to the heart; SVV/PPV thresholds become unreliable.", examPearl: "Common pitfall in liver failure, abdominal compartment syndrome." },
      { id: "n7", severity: "major", title: "Finger oedema or prolonged cuff use", why: "Volume-clamp accuracy drops; risk of digital ischaemia with continuous use > 8 h.", examPearl: "Alternate fingers; remove for ≥30 min every 8 h." },
      { id: "n8", severity: "minor", title: "Brachial-equivalent reconstruction error", why: "Algorithm assumes typical age/sex/BP relationships; outliers (vascular disease) less accurate.", examPearl: "Trends more reliable than absolute values." },
      { id: "n9", severity: "critical", title: "Atrial/ventricular pacing dependence (SVV/PPV)", why: "Fixed-rate pacing can synchronise with the ventilator producing spurious SVV; loss of atrial kick alters baseline SV.", examPearl: "Interpret SVV cautiously in any paced rhythm." },
      { id: "n10", severity: "critical", title: "VA-ECMO / IABP / LVAD (volume-clamp)", why: "Non-pulsatile or counterpulsated flow violates finger-cuff reconstruction.", examPearl: "Volume-clamp devices fail on mechanical circulatory support." },
      { id: "n11", severity: "major", title: "High PEEP (> 10 cmH₂O)", why: "Exaggerates cyclic preload swing — over-estimates SVV/PPV and may falsely predict fluid responsiveness.", examPearl: "Adjust threshold upwards or use PLR." },
      { id: "n12", severity: "major", title: "Severe pulmonary hypertension / cor pulmonale", why: "RV unable to transmit cyclic preload changes to LV; SVV/PPV unreliable.", examPearl: "Echo or PAC preferred." },
      { id: "n13", severity: "major", title: "Prone position", why: "Altered chest wall and abdominal compliance change SVV/PPV thresholds; volume-clamp finger access difficult.", examPearl: "Use PLR substitute (Trendelenburg) or end-expiratory occlusion." },
      { id: "n14", severity: "minor", title: "Arteriovenous fistula on cuff arm", why: "Distorts pulsation; risk of fistula damage with prolonged cuff inflation.", examPearl: "Use opposite hand." },
    ],
  },
];

const COPitfallsChecklist = () => {
  const [active, setActive] = useState<string>(modalities[0].id);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<Severity | "all">("all");

  const current = modalities.find((m) => m.id === active)!;
  const visible = useMemo(
    () => (filter === "all" ? current.pitfalls : current.pitfalls.filter((p) => p.severity === filter)),
    [current, filter],
  );
  const completed = current.pitfalls.filter((p) => checked[`${current.id}:${p.id}`]).length;
  const total = current.pitfalls.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  const toggle = (pitfallId: string) => {
    const key = `${current.id}:${pitfallId}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetCurrent = () => {
    setChecked((prev) => {
      const next = { ...prev };
      current.pitfalls.forEach((p) => delete next[`${current.id}:${p.id}`]);
      return next;
    });
  };

  return (
        <div className="my-6 rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="mb-3">
        <h3 className="text-lg font-bold text-foreground">CO Monitoring — Pitfalls Checklist</h3>
        <p className="text-sm text-muted-foreground">
          One-page exam-ready error sources for each modality. Tick as you revise; switch tabs to compare.
        </p>
      </div>

      <Tabs value={active} onValueChange={setActive} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4 h-auto">
          {modalities.map((m) => (
            <TabsTrigger key={m.id} value={m.id} className="text-[11px] sm:text-xs px-1.5 py-2 leading-tight whitespace-normal">
              {m.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {modalities.map((m) => (
          <TabsContent key={m.id} value={m.id} className="mt-0">
            {/* Header card */}
            <div className="rounded-lg border border-border bg-muted/30 p-3 mb-3">
              <p className="font-semibold text-foreground text-sm">{m.fullName}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{m.oneLiner}</p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex flex-wrap gap-1.5">
                {(["all", "critical", "major", "minor"] as const).map((f) => (
                  <Button
                    key={f}
                    size="sm"
                    variant={filter === f ? "default" : "outline"}
                    className="h-7 px-2.5 text-xs capitalize"
                    onClick={() => setFilter(f)}
                  >
                    {f}
                    {f !== "all" && (
                      <span className="ml-1.5 opacity-70">
                        {m.pitfalls.filter((p) => p.severity === f).length}
                      </span>
                    )}
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{completed}/{total} reviewed</span>
                <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                </div>
                <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={resetCurrent}>
                  Reset
                </Button>
              </div>
            </div>

            {/* Pitfall list */}
            <ul className="space-y-2">
              {visible.map((p) => {
                const key = `${m.id}:${p.id}`;
                const isChecked = !!checked[key];
                const sev = severityStyles[p.severity];
                return (
                      <li
                    key={p.id}
                    className={`rounded-lg border border-border p-3 transition-colors ${isChecked ? "bg-muted/40 opacity-70" : "bg-background"}`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={key}
                        checked={isChecked}
                        onCheckedChange={() => toggle(p.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <label
                            htmlFor={key}
                            className={`font-semibold text-sm text-foreground cursor-pointer ${isChecked ? "line-through" : ""}`}
                          >
                            <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle ${sev.dot}`} />
                            {p.title}
                          </label>
                          <Badge variant="outline" className={`text-[10px] uppercase tracking-wide ${sev.badge}`}>
                            {sev.label}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          <span className="font-medium text-foreground">Why:</span> {p.why}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          <span className="font-medium text-foreground">Exam pearl:</span> {p.examPearl}
                        </p>
                      </div>
                    </div>
                  </li>
  );
              })}
              {visible.length === 0 && (
                <li className="text-xs text-muted-foreground text-center py-6">No pitfalls in this severity for this modality.</li>
              )}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default COPitfallsChecklist;
