const ICPMonitoringDevicesDiagram = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-serif font-bold text-foreground">ICP Monitoring Devices — Comparative Diagram</h3>
      <p className="text-sm text-muted-foreground">
        Cross-sectional views showing catheter/sensor placement within the cranial vault for each device type.
      </p>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* EVD - Intraventricular */}
        <div className="space-y-2">
          <svg viewBox="0 0 300 260" className="w-full max-w-xs mx-auto" aria-label="External Ventricular Drain (EVD)">
            {/* Skull */}
            <ellipse cx="150" cy="140" rx="120" ry="110" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />
            {/* Dura */}
            <ellipse cx="150" cy="140" rx="112" ry="102" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.4" />
            {/* Brain parenchyma */}
            <ellipse cx="150" cy="140" rx="105" ry="95" fill="hsl(var(--secondary))" opacity="0.4" />
            {/* Lateral ventricle */}
            <path d="M110,110 Q120,90 150,95 Q180,90 190,110 Q185,135 170,140 Q150,145 130,140 Q115,135 110,110Z" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <text x="150" y="122" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="600">Lateral ventricle</text>
            {/* Burr hole */}
            <circle cx="160" cy="35" r="6" fill="hsl(var(--foreground))" opacity="0.3" />
            {/* Catheter through brain into ventricle */}
            <line x1="160" y1="35" x2="155" y2="105" stroke="hsl(var(--destructive))" strokeWidth="2.5" />
            {/* Catheter tip in CSF */}
            <circle cx="155" cy="105" r="3" fill="hsl(var(--destructive))" />
            {/* External drainage line going up */}
            <line x1="160" y1="35" x2="160" y2="10" stroke="hsl(var(--destructive))" strokeWidth="2.5" />
            <line x1="160" y1="10" x2="220" y2="10" stroke="hsl(var(--destructive))" strokeWidth="2" />
            {/* Collection bag icon */}
            <rect x="220" y="2" width="30" height="16" rx="3" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
            <text x="235" y="13" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">CSF</text>
            {/* Labels */}
            <text x="30" y="35" fontSize="8" fill="hsl(var(--muted-foreground))">Burr hole</text>
            <line x1="80" y1="35" x2="154" y2="35" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
            <text x="30" y="75" fontSize="8" fill="hsl(var(--destructive))">Catheter</text>
            <line x1="72" y1="73" x2="158" y2="65" stroke="hsl(var(--destructive))" strokeWidth="0.5" />
            {/* Transducer label */}
            <text x="235" y="28" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">External</text>
            <text x="235" y="36" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">transducer</text>
          </svg>
          <div className="text-center">
            <p className="font-semibold text-foreground text-sm">EVD (Intraventricular)</p>
            <p className="text-xs text-muted-foreground">Gold standard. Measures global ICP. Can drain CSF therapeutically. Requires transducer zeroed at tragus. Risk: infection (5–10%), haemorrhage (1–2%), ventriculitis.</p>
          </div>
        </div>

        {/* Intraparenchymal (Codman/Camino) */}
        <div className="space-y-2">
          <svg viewBox="0 0 300 260" className="w-full max-w-xs mx-auto" aria-label="Intraparenchymal ICP monitor">
            <ellipse cx="150" cy="140" rx="120" ry="110" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />
            <ellipse cx="150" cy="140" rx="112" ry="102" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.4" />
            <ellipse cx="150" cy="140" rx="105" ry="95" fill="hsl(var(--secondary))" opacity="0.4" />
            {/* Lateral ventricle (reference) */}
            <path d="M110,110 Q120,90 150,95 Q180,90 190,110 Q185,135 170,140 Q150,145 130,140 Q115,135 110,110Z" fill="hsl(var(--primary))" opacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,3" />
            {/* Burr hole */}
            <circle cx="155" cy="35" r="6" fill="hsl(var(--foreground))" opacity="0.3" />
            {/* Bolt/probe — shorter, tip in parenchyma NOT ventricle */}
            <line x1="155" y1="35" x2="152" y2="80" stroke="hsl(var(--chart-2))" strokeWidth="3" />
            {/* Sensor tip — fibreoptic/strain gauge */}
            <circle cx="152" cy="80" r="4" fill="hsl(var(--chart-2))" />
            <text x="152" y="82" textAnchor="middle" fontSize="5" fill="hsl(var(--background))" fontWeight="bold">S</text>
            {/* Cable out */}
            <line x1="155" y1="35" x2="155" y2="10" stroke="hsl(var(--chart-2))" strokeWidth="2" />
            <line x1="155" y1="10" x2="230" y2="10" stroke="hsl(var(--chart-2))" strokeWidth="1.5" />
            <rect x="230" y="2" width="40" height="16" rx="3" fill="none" stroke="hsl(var(--chart-2))" strokeWidth="1.5" />
            <text x="250" y="13" textAnchor="middle" fontSize="6" fill="hsl(var(--chart-2))">Monitor</text>
            {/* Labels */}
            <text x="30" y="80" fontSize="8" fill="hsl(var(--chart-2))">Sensor tip</text>
            <line x1="72" y1="78" x2="148" y2="80" stroke="hsl(var(--chart-2))" strokeWidth="0.5" />
            <text x="30" y="65" fontSize="8" fill="hsl(var(--chart-2))">(in parenchyma)</text>
            <text x="220" y="35" fontSize="7" fill="hsl(var(--muted-foreground))">Integrated</text>
            <text x="220" y="43" fontSize="7" fill="hsl(var(--muted-foreground))">sensor</text>
          </svg>
          <div className="text-center">
            <p className="font-semibold text-foreground text-sm">Intraparenchymal (Codman / Camino)</p>
            <p className="text-xs text-muted-foreground">Fibreoptic or strain gauge sensor in brain tissue. Easy insertion. Cannot drain CSF. Cannot re-zero after insertion → baseline drift. Measures local pressure (may differ from global ICP in compartmentalised pathology).</p>
          </div>
        </div>

        {/* Subdural */}
        <div className="space-y-2">
          <svg viewBox="0 0 300 260" className="w-full max-w-xs mx-auto" aria-label="Subdural ICP monitor">
            <ellipse cx="150" cy="140" rx="120" ry="110" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />
            <ellipse cx="150" cy="140" rx="112" ry="102" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.4" />
            <ellipse cx="150" cy="140" rx="105" ry="95" fill="hsl(var(--secondary))" opacity="0.4" />
            {/* Burr hole */}
            <circle cx="150" cy="33" r="6" fill="hsl(var(--foreground))" opacity="0.3" />
            {/* Flat sensor sitting on brain surface under dura */}
            <path d="M130,42 Q150,38 170,42" stroke="hsl(var(--chart-4))" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Sensor highlight */}
            <circle cx="150" cy="40" r="3" fill="hsl(var(--chart-4))" />
            {/* Cable */}
            <line x1="150" y1="33" x2="150" y2="10" stroke="hsl(var(--chart-4))" strokeWidth="2" />
            {/* Labels */}
            <text x="30" y="45" fontSize="8" fill="hsl(var(--chart-4))">Flat sensor</text>
            <text x="30" y="55" fontSize="8" fill="hsl(var(--chart-4))">under dura</text>
            <line x1="80" y1="50" x2="130" y2="42" stroke="hsl(var(--chart-4))" strokeWidth="0.5" />
            {/* Dura label */}
            <text x="240" y="48" fontSize="7" fill="hsl(var(--muted-foreground))">Dura</text>
            <line x1="235" y1="46" x2="195" y2="42" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
            {/* Brain surface label */}
            <text x="240" y="60" fontSize="7" fill="hsl(var(--muted-foreground))">Brain surface</text>
            <line x1="235" y1="58" x2="195" y2="50" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          </svg>
          <div className="text-center">
            <p className="font-semibold text-foreground text-sm">Subdural</p>
            <p className="text-xs text-muted-foreground">Flat sensor placed between dura and brain surface. Less invasive — no brain penetration. Less accurate than EVD or intraparenchymal. Prone to measurement drift and damping. Rarely used as primary monitor.</p>
          </div>
        </div>

        {/* Epidural */}
        <div className="space-y-2">
          <svg viewBox="0 0 300 260" className="w-full max-w-xs mx-auto" aria-label="Epidural ICP monitor">
            <ellipse cx="150" cy="140" rx="120" ry="110" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.3" />
            {/* Dura — intact */}
            <ellipse cx="150" cy="140" rx="112" ry="102" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.5" />
            <ellipse cx="150" cy="140" rx="105" ry="95" fill="hsl(var(--secondary))" opacity="0.4" />
            {/* Burr hole */}
            <circle cx="150" cy="33" r="6" fill="hsl(var(--foreground))" opacity="0.3" />
            {/* Sensor ON TOP of dura (epidural space) */}
            <path d="M130,35 Q150,32 170,35" stroke="hsl(var(--chart-5))" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="150" cy="33" r="3" fill="hsl(var(--chart-5))" />
            {/* Cable */}
            <line x1="150" y1="28" x2="150" y2="10" stroke="hsl(var(--chart-5))" strokeWidth="2" />
            {/* Labels */}
            <text x="30" y="30" fontSize="8" fill="hsl(var(--chart-5))">Sensor above</text>
            <text x="30" y="40" fontSize="8" fill="hsl(var(--chart-5))">intact dura</text>
            <line x1="85" y1="35" x2="130" y2="34" stroke="hsl(var(--chart-5))" strokeWidth="0.5" />
            <text x="240" y="40" fontSize="7" fill="hsl(var(--muted-foreground))">Dura intact</text>
            <line x1="235" y1="38" x2="200" y2="38" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          </svg>
          <div className="text-center">
            <p className="font-semibold text-foreground text-sm">Epidural</p>
            <p className="text-xs text-muted-foreground">Sensor placed between skull and dura — dura not breached. Lowest infection risk. Least accurate — measures indirectly through dura. Significant measurement error. Rarely used in modern practice.</p>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-foreground font-semibold">Feature</th>
              <th className="text-left py-2 text-foreground font-semibold">EVD</th>
              <th className="text-left py-2 text-foreground font-semibold">Intraparenchymal</th>
              <th className="text-left py-2 text-foreground font-semibold">Subdural</th>
              <th className="text-left py-2 text-foreground font-semibold">Epidural</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border">
              <td className="py-1.5 font-medium text-foreground">Location</td>
              <td>Lateral ventricle</td><td>Brain parenchyma</td><td>Subdural space</td><td>Epidural space</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-1.5 font-medium text-foreground">Accuracy</td>
              <td>Gold standard</td><td>Good (local)</td><td>Fair</td><td>Poor</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-1.5 font-medium text-foreground">CSF drainage</td>
              <td>Yes — therapeutic</td><td>No</td><td>No</td><td>No</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-1.5 font-medium text-foreground">Re-zero</td>
              <td>Yes (external)</td><td>No (drift)</td><td>No</td><td>No</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-1.5 font-medium text-foreground">Infection risk</td>
              <td>5–10%</td><td>Low</td><td>Low</td><td>Lowest</td>
            </tr>
            <tr>
              <td className="py-1.5 font-medium text-foreground">Haemorrhage risk</td>
              <td>1–2%</td><td>&lt;1%</td><td>Minimal</td><td>Minimal</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ONSD Section */}
      <div className="mt-8">
        <h3 className="text-lg font-serif font-bold text-foreground mb-3">Trans-Ocular Optic Nerve Sheath Diameter (ONSD)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Non-invasive ultrasound screening tool for raised ICP. The optic nerve sheath is a continuation of the dura mater and is in direct communication with subarachnoid CSF. Raised ICP distends the sheath, measurable by point-of-care ultrasound.
        </p>

        <svg viewBox="0 0 440 220" className="w-full max-w-lg mx-auto mb-4" aria-label="Optic nerve sheath diameter measurement">
          {/* Eye globe */}
          <circle cx="150" cy="110" r="55" fill="hsl(var(--secondary))" opacity="0.3" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.4" />
          {/* Lens */}
          <ellipse cx="105" cy="110" rx="8" ry="18" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.3" />
          {/* Optic nerve */}
          <rect x="205" y="104" width="120" height="12" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.3" />
          <text x="265" y="100" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Optic nerve</text>
          {/* Optic nerve sheath — normal */}
          <rect x="205" y="97" width="120" height="26" rx="6" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          {/* 3mm behind globe measurement line */}
          <line x1="222" y1="88" x2="222" y2="132" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="3,2" />
          <text x="222" y="82" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="600">3 mm behind globe</text>
          {/* ONSD measurement arrows */}
          <line x1="210" y1="97" x2="210" y2="123" stroke="hsl(var(--chart-2))" strokeWidth="1.5" />
          <line x1="206" y1="97" x2="214" y2="97" stroke="hsl(var(--chart-2))" strokeWidth="1.5" />
          <line x1="206" y1="123" x2="214" y2="123" stroke="hsl(var(--chart-2))" strokeWidth="1.5" />
          <text x="196" y="114" textAnchor="end" fontSize="8" fill="hsl(var(--chart-2))" fontWeight="600">ONSD</text>
          {/* Ultrasound probe on closed eyelid */}
          <rect x="55" y="55" width="30" height="12" rx="4" fill="hsl(var(--foreground))" opacity="0.5" />
          <text x="70" y="50" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Linear probe</text>
          <text x="70" y="80" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">(closed eyelid)</text>
          {/* Ultrasound beam */}
          <path d="M85,61 L150,90 L150,130 L85,61" fill="hsl(var(--primary))" opacity="0.05" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="2,2" />
          {/* Sheath label */}
          <text x="340" y="92" fontSize="8" fill="hsl(var(--primary))">Nerve sheath</text>
          <text x="340" y="102" fontSize="8" fill="hsl(var(--primary))">(dural extension)</text>
          <line x1="335" y1="97" x2="326" y2="100" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          {/* CSF in sheath */}
          <text x="340" y="118" fontSize="7" fill="hsl(var(--muted-foreground))">Subarachnoid</text>
          <text x="340" y="127" fontSize="7" fill="hsl(var(--muted-foreground))">CSF space</text>
          {/* Globe label */}
          <text x="150" y="115" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" opacity="0.5">Globe</text>
          {/* Threshold info box */}
          <rect x="10" y="155" width="420" height="55" rx="6" fill="hsl(var(--secondary))" opacity="0.3" />
          <text x="220" y="172" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">Interpretation</text>
          <text x="220" y="186" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">ONSD &gt;5.0 mm → suggests ICP &gt;20 mmHg (sensitivity ~90%, specificity ~85%)</text>
          <text x="220" y="199" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Normal ONSD: 3.5–5.0 mm | Measured 3 mm posterior to globe in transverse & sagittal planes</text>
        </svg>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-sm">Technique</p>
            <p className="text-xs text-muted-foreground mt-1">
              High-frequency linear probe (≥7.5 MHz) placed on closed eyelid with gel. Reduce power/MI to minimum (ALARA — eye is AIUM Category III). Measure ONSD 3 mm behind the globe in both transverse and sagittal planes. Average at least 2 measurements per eye. Bilateral measurement recommended.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-sm">Evidence & Limitations</p>
            <p className="text-xs text-muted-foreground mt-1">
              Meta-analysis (Dubourg 2011): pooled sensitivity 90%, specificity 85% for ICP &gt;20 mmHg using 5.0 mm cut-off. Limitations: operator-dependent, not validated for continuous monitoring, affected by optic nerve pathology (glioma, papilloedema from other causes, prior optic neuritis). Does not replace invasive monitoring — screening tool only.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-sm">Clinical Applications</p>
            <p className="text-xs text-muted-foreground mt-1">
              Rapid bedside screening in ED/ICU when invasive monitoring not yet available. Useful in: TBI assessment, post-craniotomy, hepatic encephalopathy, suspected idiopathic intracranial hypertension, meningitis. Can be performed by non-neurosurgeons. Helps triage need for CT/neurosurgical referral.
            </p>
          </div>
          <div className="p-4 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-sm">Contraindications</p>
            <p className="text-xs text-muted-foreground mt-1">
              Suspected/confirmed globe rupture or penetrating eye injury. Recent ophthalmic surgery. Periorbital fractures with globe instability. Use minimal pressure on closed eyelid — excessive pressure can cause artefactual readings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICPMonitoringDevicesDiagram;
