import { useState } from "react";

type DeviceId = "AAI" | "VVI" | "DDD" | "CRT-P" | "CRT-D" | "ICD" | "leadless";

interface DeviceInfo {
  id: DeviceId;
  name: string;
  nbg: string;
  leads: { ra: boolean; rv: boolean; lv: boolean; shock?: boolean; leadless?: boolean };
  indication: string;
  pathophys: string;
  pearl: string;
  complications: string[];
}

// Generic complications shared by any transvenous lead-based device
const COMMON_TRANSVENOUS = [
  "Pneumothorax (subclavian puncture, ~1–2%)",
  "Pocket haematoma / infection",
  "Lead displacement (early, especially RA & LV)",
  "Twiddler's syndrome — patient rotates generator → lead dislodgement",
  "Generator pocket erosion / chronic pain",
  "Venous thrombosis / SVC obstruction",
];

const DEVICES: Record<DeviceId, DeviceInfo> = {
  AAI: {
    id: "AAI",
    name: "AAI — Atrial demand",
    nbg: "A / A / I — pace atrium, sense atrium, inhibit on sensed P",
    leads: { ra: true, rv: false, lv: false },
    indication: "Sick sinus syndrome with intact AV conduction",
    pathophys: "Single RA lead paces and senses the atrium; no ventricular backup.",
    pearl: "Avoid if any AV nodal disease — risk of asystole if AV block develops.",
    complications: [
      "Progression to AV block → asystole (no ventricular backup)",
      "RA lead displacement (appendage is unstable site)",
      ...COMMON_TRANSVENOUS,
    ],
  },
  VVI: {
    id: "VVI",
    name: "VVI — Ventricular demand",
    nbg: "V / V / I — pace ventricle, sense ventricle, inhibit on sensed R",
    leads: { ra: false, rv: true, lv: false },
    indication: "Permanent AF with slow ventricular response; bail-out single-lead",
    pathophys: "Single RV apical lead paces ventricle on demand. No AV synchrony.",
    pearl: "Pacemaker syndrome from loss of AV synchrony — fatigue, dyspnoea, cannon a-waves.",
    complications: [
      "Pacemaker syndrome (loss of AV synchrony)",
      "RV apical pacing-induced cardiomyopathy (chronic dyssynchrony)",
      "RV lead perforation → tamponade",
      ...COMMON_TRANSVENOUS,
    ],
  },
  DDD: {
    id: "DDD",
    name: "DDD — Dual chamber",
    nbg: "D / D / D — pace both, sense both, dual response (track + inhibit)",
    leads: { ra: true, rv: true, lv: false },
    indication: "AV block (Mobitz II, complete) with sinus rhythm; preserves AV synchrony",
    pathophys: "RA lead tracks intrinsic P-waves; RV lead delivers paced QRS after programmed AV delay.",
    pearl: "Mode-switches to DDI/VVI during AT/AF to prevent rapid ventricular tracking.",
    complications: [
      "Pacemaker-mediated tachycardia (endless-loop via retrograde P)",
      "Cross-talk (atrial output sensed on V channel) → V output inhibited",
      "Lead displacement (RA more common than RV)",
      ...COMMON_TRANSVENOUS,
    ],
  },
  "CRT-P": {
    id: "CRT-P",
    name: "CRT-P — Biventricular pacemaker",
    nbg: "Adds LV lead via coronary sinus to lateral wall",
    leads: { ra: true, rv: true, lv: true },
    indication: "HFrEF (EF ≤ 35%), LBBB with QRS ≥ 130 ms, NYHA II–IV on optimal medical therapy",
    pathophys: "Simultaneous (or sequential) RV + LV pacing resynchronises septal-lateral wall contraction.",
    pearl: "Aim for > 95% biventricular capture; phrenic nerve stimulation is the classic LV-lead complication.",
    complications: [
      "Phrenic nerve stimulation (LV lead — diaphragmatic twitching)",
      "LV lead dislodgement (coronary sinus — highest of all leads)",
      "Coronary sinus dissection during implant",
      "Loss of biventricular capture → CRT non-responder",
      ...COMMON_TRANSVENOUS,
    ],
  },
  "CRT-D": {
    id: "CRT-D",
    name: "CRT-D — Biventricular ICD",
    nbg: "CRT-P + high-voltage shock coil on RV lead",
    leads: { ra: true, rv: true, lv: true, shock: true },
    indication: "CRT indications + primary/secondary VT/VF prevention (e.g. ischaemic CM, EF ≤ 35%)",
    pathophys: "Adds tiered therapy: ATP, then synchronised cardioversion, then defibrillation.",
    pearl: "Most modern CRT implants are CRT-D unless frailty / short prognosis favours CRT-P.",
    complications: [
      "Inappropriate shocks (AF, lead noise, T-wave oversensing)",
      "Phrenic nerve stimulation from LV lead",
      "LV lead dislodgement",
      "Electrical storm (≥ 3 shocks in 24 h)",
      "Psychological impact of shocks",
      ...COMMON_TRANSVENOUS,
    ],
  },
  ICD: {
    id: "ICD",
    name: "ICD — Implantable defibrillator",
    nbg: "RV shock lead ± RA lead; primary therapy is defibrillation",
    leads: { ra: false, rv: true, lv: false, shock: true },
    indication: "Secondary prevention (VF/VT arrest); primary in EF ≤ 35%, HCM, LQTS, Brugada with risk factors",
    pathophys: "Senses VT/VF, delivers ATP for VT, biphasic shock (30–40 J) for VF.",
    pearl: "Magnet over generator suspends shock therapy — use perioperatively with diathermy.",
    complications: [
      "Inappropriate shocks (most common — AF, SVT, T-wave oversensing, lead fracture)",
      "Lead fracture / insulation breach → noise → spurious shocks",
      "Failure to defibrillate (rare; check DFT)",
      "Diathermy-induced inappropriate therapy (use magnet perioperatively)",
      "Electrical storm; psychological morbidity",
      ...COMMON_TRANSVENOUS,
    ],
  },
  leadless: {
    id: "leadless",
    name: "Leadless (Micra) — VVI",
    nbg: "V / V / I — entire device anchored in RV septum, no transvenous lead",
    leads: { ra: false, rv: false, lv: false, leadless: true },
    indication: "Bradycardia in AF, limited venous access, high infection risk, dialysis patients",
    pathophys: "Self-contained pacemaker delivered via femoral vein, tined into RV septum.",
    pearl: "No pocket, no lead — eliminates pocket infection and lead fracture; battery ~ 12 yrs.",
    complications: [
      "Femoral vascular access complications (haematoma, AV fistula, pseudoaneurysm)",
      "Cardiac perforation / tamponade at deployment (~1%)",
      "Device embolisation",
      "Dislodgement (rare once tined)",
      "End-of-life: device left in situ, new one implanted (no extraction)",
      "Same VVI dyssynchrony issues as transvenous VVI",
    ],
  },
};

const HeartWithLeads = ({ device }: { device: DeviceInfo }) => {
  const { ra, rv, lv, shock, leadless } = device.leads;
  return (
    <svg viewBox="0 0 240 220" className="w-full h-auto" role="img" aria-label={`${device.name} lead positions`}>
      {/* Heart silhouette */}
      <path
        d="M 120 50 C 90 30, 50 45, 50 90 C 50 140, 100 175, 120 195 C 140 175, 190 140, 190 90 C 190 45, 150 30, 120 50 Z"
        fill="hsl(var(--muted) / 0.25)"
        stroke="hsl(var(--border))"
        strokeWidth="1.2"
      />
      {/* Septum */}
      <path d="M 120 55 Q 122 120 120 190" stroke="hsl(var(--border))" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />

      {/* Chamber labels */}
      <text x="80" y="80" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">RA</text>
      <text x="160" y="80" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">LA</text>
      <text x="85" y="150" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">RV</text>
      <text x="160" y="150" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">LV</text>

      {/* Pulse generator (subclavian pocket) — hide for leadless */}
      {!leadless && (
        <g>
          <rect x="20" y="18" width="22" height="14" rx="3" fill="hsl(var(--foreground))" />
          <text x="31" y="28" fontSize="7" fill="hsl(var(--background))" textAnchor="middle" fontWeight="bold">PG</text>
          <line x1="42" y1="25" x2="70" y2="55" stroke="hsl(var(--foreground))" strokeWidth="1" />
        </g>
      )}

      {/* RA lead (blue) — into right atrial appendage */}
      {ra && (
        <g>
          <path d="M 70 55 Q 78 65 82 75 Q 78 82 72 78" stroke="hsl(var(--chart-1, 210 90% 55%))" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="72" cy="78" r="2.5" fill="hsl(var(--chart-1, 210 90% 55%))" />
          <text x="55" y="50" fontSize="7" fill="hsl(var(--chart-1, 210 90% 55%))" fontWeight="bold">RA</text>
        </g>
      )}

      {/* RV lead (amber) — through tricuspid to RV apex */}
      {rv && (
        <g>
          <path d="M 70 55 Q 90 90 105 160" stroke="hsl(var(--chart-4, 38 92% 50%))" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="105" cy="160" r="2.5" fill="hsl(var(--chart-4, 38 92% 50%))" />
          <text x="92" y="172" fontSize="7" fill="hsl(var(--chart-4, 38 92% 50%))" fontWeight="bold">RV</text>
          {/* Shock coil */}
          {shock && (
            <path d="M 95 130 Q 97 135 99 130 Q 101 135 103 130 Q 105 135 107 130"
              stroke="hsl(var(--destructive))" strokeWidth="2.5" fill="none" />
          )}
        </g>
      )}

      {/* LV lead (red dashed) — via coronary sinus to lateral wall */}
      {lv && (
        <g>
          <path d="M 70 55 Q 110 70 150 90 Q 170 110 165 145"
            stroke="hsl(var(--destructive))" strokeWidth="2" fill="none"
            strokeDasharray="4 2" strokeLinecap="round" />
          <circle cx="165" cy="145" r="2.5" fill="hsl(var(--destructive))" />
          <text x="170" y="158" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">LV</text>
        </g>
      )}

      {/* Leadless capsule in RV septum */}
      {leadless && (
        <g>
          <ellipse cx="118" cy="150" rx="6" ry="10" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" strokeWidth="0.8" />
          <text x="118" y="153" fontSize="6" fill="hsl(var(--primary-foreground))" textAnchor="middle" fontWeight="bold">M</text>
          <text x="135" y="152" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">Micra</text>
        </g>
      )}

      {/* Shock legend */}
      {shock && (
        <text x="120" y="212" fontSize="7" fill="hsl(var(--destructive))" textAnchor="middle" fontWeight="bold">
          ⚡ Shock coil
        </text>
      )}
    </svg>
  );
};

const ORDER: DeviceId[] = ["AAI", "VVI", "DDD", "CRT-P", "CRT-D", "ICD", "leadless"];

const PacingDevicesDiagram = () => {
  const [active, setActive] = useState<DeviceId | null>(null);
  const detail = active ? DEVICES[active] : null;

  return (
    <div className="my-6 p-4 rounded-lg border border-border bg-card">
      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground">Pacing & Defibrillator Devices</h3>
          <p className="text-xs text-muted-foreground mt-1">
            NBG code, lead permutations, indications. Click a card for detail.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[hsl(210_90%_55%)]" />RA</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[hsl(38_92%_50%)]" />RV</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive" />LV / shock</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {ORDER.map((id) => {
          const d = DEVICES[id];
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(isActive ? null : id)}
              className={`text-left p-2 rounded-md border transition-colors ${
                isActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-foreground">{d.id}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                  {[d.leads.ra && "RA", d.leads.rv && "RV", d.leads.lv && "LV", d.leads.shock && "⚡", d.leads.leadless && "leadless"]
                    .filter(Boolean).join(" + ") || "—"}
                </span>
              </div>
              <HeartWithLeads device={d} />
              <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{d.indication}</p>
              <div className="mt-1.5 pt-1.5 border-t border-border/60">
                <p className="text-[9px] font-semibold text-destructive/80 uppercase tracking-wide mb-0.5">⚠ Top complication</p>
                <p className="text-[10px] text-muted-foreground line-clamp-2">{d.complications[0]}</p>
              </div>
            </button>
          );
        })}
      </div>

      {detail && (
        <div className="mt-4 p-3 rounded-md border border-primary/30 bg-primary/5">
          <div className="flex items-baseline justify-between gap-2 flex-wrap">
            <h4 className="font-semibold text-foreground text-sm">{detail.name}</h4>
            <span className="text-[10px] font-mono text-primary">{detail.nbg}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-2 text-xs">
            <div>
              <p className="font-semibold text-foreground mb-0.5">Indication</p>
              <p className="text-muted-foreground">{detail.indication}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-0.5">Mechanism</p>
              <p className="text-muted-foreground">{detail.pathophys}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="font-semibold text-foreground mb-0.5">Clinical pearl</p>
              <p className="text-muted-foreground">{detail.pearl}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PacingDevicesDiagram;
