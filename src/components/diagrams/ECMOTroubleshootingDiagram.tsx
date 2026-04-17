import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";

type Scenario = "desaturation" | "circuit" | "pump";

const scenarios: Record<Scenario, {
  label: string;
  icon: string;
  color: string;
  steps: { action: string; detail: string; priority?: "critical" | "high" | "normal" }[];
}> = {
  desaturation: {
    label: "Acute Desaturation",
    icon: "📉",
    color: "hsl(0, 60%, 50%)",
    steps: [
      { action: "Confirm genuine desaturation", detail: "Check probe position, arterial blood gas. Artefact? Compare pre- and post-oxygenator gases.", priority: "critical" },
      { action: "Increase FiO₂ to 1.0 on ventilator", detail: "Maximise native lung contribution. This buys time while troubleshooting ECMO circuit.", priority: "critical" },
      { action: "Increase ECMO blood flow", detail: "↑ RPM to increase flow (target 60–80 ml/kg/min). Higher flow = more blood oxygenated per minute. Check for access insufficiency (line chattering = hypovolaemia/kinking).", priority: "high" },
      { action: "Increase FdO₂ (sweep gas O₂)", detail: "Increase fraction of O₂ in sweep gas to 1.0 if not already. Usually already maximal.", priority: "high" },
      { action: "Check for recirculation (VV-ECMO)", detail: "Oxygenated return blood re-entering drainage cannula. SaO₂ in drainage limb >75% suggests significant recirculation. Reposition cannulae, check with TOE/fluoroscopy.", priority: "high" },
      { action: "Assess oxygenator function", detail: "Compare pre- and post-oxygenator PaO₂. Post-membrane PaO₂ should be >300 mmHg on FdO₂ 1.0. If low → oxygenator failure (clot/plasma leak) → plan oxygenator exchange.", priority: "high" },
      { action: "Check haemoglobin", detail: "Anaemia ↓ O₂ carrying capacity even with adequate oxygenation. Transfuse to Hb >70–80 g/L (some centres target >100 g/L in refractory hypoxia).", priority: "normal" },
      { action: "Optimise native lung", detail: "Recruitment manoeuvre (cautious), increase PEEP, prone positioning, bronchoscopy for mucus plug/collapse. Consider lung compliance changes.", priority: "normal" },
      { action: "Consider VA-ECMO / VAV configuration", detail: "If cardiac output inadequate (VV-ECMO depends on native CO). In Harlequin (VA-ECMO): add return cannula to IJV (VAV). Monitor right radial SpO₂.", priority: "normal" },
    ],
  },
  circuit: {
    label: "Circuit Emergency",
    icon: "⚠️",
    color: "hsl(45, 80%, 50%)",
    steps: [
      { action: "AIR IN CIRCUIT — Clamp immediately", detail: "Clamp drainage (venous) line FIRST, then return line. Stop pump. Air enters via negative pressure on drainage side. Trendelenburg position. Do NOT unclamp until air aspirated from circuit. Hand-ventilate patient.", priority: "critical" },
      { action: "CIRCUIT RUPTURE / DISCONNECTION", detail: "Clamp both lines immediately. Stop pump. Apply direct pressure to any bleeding site. Emergency re-clamping at cannula level. Do NOT attempt reconnection without senior ECMO specialist. Ventilate patient conventionally.", priority: "critical" },
      { action: "Oxygenator thrombosis", detail: "Signs: ↑ transmembrane pressure gradient (ΔP across oxygenator >50 mmHg), ↓ post-membrane PaO₂, visible clot in housing. Plan controlled oxygenator exchange. Do NOT clamp for extended periods — plan swap with perfusionist.", priority: "high" },
      { action: "Circuit clot / fibrin stranding", detail: "Inspect entire circuit with torch/light. Fibrin strands in connector sites, pump head, oxygenator. Assess significance — small strands may be monitored, large clots require circuit exchange. Check D-dimer trend, ACT/APTT.", priority: "high" },
      { action: "Plasma leak (oxygenator)", detail: "Serous fluid dripping from oxygenator gas outlet. Indicates membrane degradation. Progressively impairs gas exchange. Requires oxygenator exchange — plan electively if gas exchange still adequate.", priority: "normal" },
      { action: "High circuit pressures", detail: "Check for kinking (tubing, cannula), clot in circuit, high blood flow against small cannula. Assess P-venous (drainage) and P-arterial (return). High return pressure + low flow = obstruction distal to pump.", priority: "normal" },
      { action: "Access insufficiency ('chugging')", detail: "Drainage cannula sucks against vessel wall / IVC. Causes: hypovolaemia, malposition, high RPM. Management: ↓ RPM, fluid bolus, reposition patient, check cannula position (CXR/echo). Persistent → consider additional drainage cannula.", priority: "normal" },
    ],
  },
  pump: {
    label: "Pump Failure",
    icon: "🔧",
    color: "hsl(210, 60%, 50%)",
    steps: [
      { action: "COMPLETE PUMP STOP — Emergency protocol", detail: "Clamp BOTH lines immediately (prevent backflow and exsanguination). Maximise conventional ventilation: FiO₂ 1.0, ↑ PEEP, ↑ RR. Inotropic support if VA-ECMO. Hand-crank pump if available. Call perfusionist + ECMO specialist STAT.", priority: "critical" },
      { action: "Prepare backup pump", detail: "Every ECMO bedspace must have a backup pump head and drive unit. Emergency pump exchange: clamp → disconnect → swap → reconnect → unclamp → restart. Time off circuit should be <60 seconds. Pre-prime new pump if possible.", priority: "critical" },
      { action: "Power failure", detail: "All ECMO pumps have battery backup (typically 30–60 min). If battery failing: connect to backup power, prepare hand-crank. During hospital power outage: ECMO patients are top priority for generator power.", priority: "high" },
      { action: "Pump head thrombus", detail: "Signs: ↑ RPM required for same flow, unusual pump noise/vibration, haemolysis markers (↑ plasma-free Hb, ↑ LDH, ↓ haptoglobin). Controlled pump head exchange required. Increase anticoagulation if safe.", priority: "high" },
      { action: "De-coupling / drive unit failure", detail: "Magnetic coupling between drive motor and pump head lost. Pump head stops spinning. Reconnect/reseat pump head. If drive unit failed → swap to backup drive unit. Clamp lines during exchange.", priority: "high" },
      { action: "Haemolysis management", detail: "Acute haemolysis from pump malfunction: check plasma-free Hb (>50 mg/dL = significant), LDH, haptoglobin, K⁺. Manage hyperkalaemia (ECG, calcium, insulin/dextrose). Alkalinise urine if Hb >100 mg/dL. Reduce RPM, fix underlying cause.", priority: "normal" },
      { action: "Post-emergency assessment", detail: "After any pump emergency: full circuit inspection, check all connections, baseline bloods (Hb, coag, haemolysis markers, ABG). Document event. Debrief team. Review anticoagulation strategy.", priority: "normal" },
    ],
  },
};

const ECMOTroubleshootingDiagram = () => {
  const [selected, setSelected] = useState<Scenario>("desaturation");
  const info = scenarios[selected];

  const priorityStyles = {
    critical: { bg: "bg-destructive/10", border: "border-destructive/40", badge: "bg-destructive text-destructive-foreground", label: "CRITICAL" },
    high: { bg: "bg-primary/5", border: "border-primary/30", badge: "bg-primary text-primary-foreground", label: "HIGH" },
    normal: { bg: "", border: "border-border", badge: "bg-muted text-muted-foreground", label: "STEP" },
  };

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">ECMO Troubleshooting Algorithm</h3>
      <p className="text-xs text-muted-foreground mb-4">Structured approach to ECMO emergencies — select a scenario</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {(Object.keys(scenarios) as Scenario[]).map((s) => (
          <button key={s} onClick={() => setSelected(s)}
            className="px-3 py-2 rounded-lg text-sm font-medium border transition-all flex items-center gap-2"
            style={{
              borderColor: selected === s ? scenarios[s].color : "hsl(var(--border))",
              backgroundColor: selected === s ? withAlpha(scenarios[s].color, 0.08) : "transparent",
              color: selected === s ? scenarios[s].color : "hsl(var(--muted-foreground))",
            }}>
            <span>{scenarios[s].icon}</span>
            {scenarios[s].label}
          </button>
        ))}
      </div>

      <div className="animate-fade-in" key={selected}>
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 p-3 rounded-lg border" style={{ borderColor: withAlpha(info.color, 0.25), backgroundColor: withAlpha(info.color, 0.03) }}>
          <span className="text-2xl">{info.icon}</span>
          <div>
            <p className="font-bold text-foreground">{info.label}</p>
            <p className="text-xs text-muted-foreground">Follow steps sequentially — address critical actions first</p>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          {info.steps.map((step, i) => {
            const p = priorityStyles[step.priority || "normal"];
            return (
              <div key={i} className={`p-3 rounded-lg border ${p.bg} ${p.border} transition-all`}>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${p.badge}`}>{i + 1}</span>
                    {i < info.steps.length - 1 && (
                      <div className="w-px h-full min-h-[8px] bg-border mt-1" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-foreground text-sm">{step.action}</p>
                      {step.priority === "critical" && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-destructive text-destructive-foreground">CRITICAL</span>
                      )}
                      {step.priority === "high" && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-primary/20 text-primary">HIGH</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency reminder */}
        <div className="mt-4 p-3 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="text-xs font-bold text-destructive mb-1">⚡ Universal ECMO Emergency Principles</p>
          <p className="text-xs text-muted-foreground">
            <strong>1.</strong> If in doubt, CLAMP both lines and ventilate conventionally. <strong>2.</strong> Never leave an ECMO patient unattended. <strong>3.</strong> Emergency equipment at bedside: clamps (×2 per line), backup oxygenator, backup pump head, hand-crank. <strong>4.</strong> Call for help early — perfusionist + senior intensivist + ECMO coordinator. <strong>5.</strong> The patient survives on their native physiology while the circuit is down — optimise ventilation and haemodynamics immediately.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ECMOTroubleshootingDiagram;
