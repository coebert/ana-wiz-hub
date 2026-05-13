import { DiagramFigure } from "./_shared/DiagramFigure";
const BrainBase = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <svg viewBox="0 0 300 280" className="w-full max-w-xs mx-auto" aria-label={label}>
    {/* Skull outer table */}
    <ellipse cx="150" cy="150" rx="125" ry="115" fill="none" stroke="hsl(var(--foreground))" strokeWidth="3" opacity="0.25" />
    {/* Skull inner table */}
    <ellipse cx="150" cy="150" rx="119" ry="109" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.15" />
    {/* Dura mater */}
    <ellipse cx="150" cy="150" rx="114" ry="104" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.35" />
    {/* Brain parenchyma fill */}
    <ellipse cx="150" cy="150" rx="108" ry="98" fill="hsl(var(--secondary))" opacity="0.35" />
    {/* Cortical sulci — left hemisphere */}
    <path d="M60,120 Q80,115 95,130" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.3" />
    <path d="M50,150 Q70,140 90,155" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.3" />
    <path d="M55,180 Q75,170 95,182" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.3" />
    <path d="M70,100 Q85,95 100,108" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.25" />
    <path d="M65,205 Q85,195 100,208" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.25" />
    {/* Cortical sulci — right hemisphere */}
    <path d="M205,130 Q220,115 240,120" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.3" />
    <path d="M210,155 Q230,140 250,150" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.3" />
    <path d="M205,182 Q225,170 245,180" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.3" />
    <path d="M200,108 Q215,95 230,100" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.25" />
    <path d="M200,208 Q215,195 235,205" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" opacity="0.25" />
    {/* Falx cerebri (midline) */}
    <line x1="150" y1="46" x2="150" y2="145" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />
    {/* Right lateral ventricle */}
    <path d="M160,110 Q170,95 190,100 Q200,108 198,125 Q195,140 180,145 Q165,148 158,140 Q155,130 160,110Z" fill="hsl(var(--primary))" opacity="0.12" stroke="hsl(var(--primary))" strokeWidth="1" />
    {/* Left lateral ventricle */}
    <path d="M140,110 Q130,95 110,100 Q100,108 102,125 Q105,140 120,145 Q135,148 142,140 Q145,130 140,110Z" fill="hsl(var(--primary))" opacity="0.12" stroke="hsl(var(--primary))" strokeWidth="1" />
    {/* Third ventricle (midline slit) */}
    <path d="M147,140 Q150,155 153,140" fill="hsl(var(--primary))" opacity="0.12" stroke="hsl(var(--primary))" strokeWidth="1" />
    <ellipse cx="150" cy="155" rx="4" ry="10" fill="hsl(var(--primary))" opacity="0.12" stroke="hsl(var(--primary))" strokeWidth="1" />
    {/* Foramina of Monro (connecting lateral to 3rd) */}
    <line x1="142" y1="140" x2="148" y2="147" stroke="hsl(var(--primary))" strokeWidth="0.75" opacity="0.4" />
    <line x1="158" y1="140" x2="152" y2="147" stroke="hsl(var(--primary))" strokeWidth="0.75" opacity="0.4" />
    {/* Ventricle labels */}
    <text x="120" y="125" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="500" opacity="0.8">L. lat.</text>
    <text x="120" y="133" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="500" opacity="0.8">vent.</text>
    <text x="180" y="125" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="500" opacity="0.8">R. lat.</text>
    <text x="180" y="133" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="500" opacity="0.8">vent.</text>
    <text x="150" y="180" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" opacity="0.7">3rd vent.</text>
    {/* Grey matter / cortex hint */}
    <ellipse cx="150" cy="150" rx="108" ry="98" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.15" />
    {children}
  </svg>
);

const ICPMonitoringDevicesDiagram = () => {
  return (
    <DiagramFigure
      id="icp-monitoring-devices-diagram"
      title="ICP monitoring devices"
      description="Auto-generated wrapper for the ICP monitoring devices anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="space-y-6">
        <h3 className="text-lg font-serif font-bold text-foreground">ICP Monitoring Devices — Comparative Diagram</h3>
        <p className="text-sm text-muted-foreground">
          Axial cross-sections at ventricular level showing catheter/sensor placement. Both lateral ventricles, third ventricle, falx cerebri, and cortical surface are shown.
        </p>
  
        <div className="grid sm:grid-cols-2 gap-6">
          {/* EVD - Intraventricular */}
          <div className="space-y-2">
            <BrainBase label="External Ventricular Drain (EVD)">
              {/* Burr hole — right frontal (Kocher's point) */}
              <circle cx="165" cy="40" r="5" fill="hsl(var(--foreground))" opacity="0.3" />
              {/* Catheter traversing parenchyma into R lateral ventricle */}
              <line x1="165" y1="40" x2="170" y2="108" stroke="hsl(var(--destructive))" strokeWidth="2" />
              {/* Catheter tip inside ventricle */}
              <circle cx="170" cy="108" r="3" fill="hsl(var(--destructive))" />
              {/* External tubing */}
              <line x1="165" y1="40" x2="165" y2="12" stroke="hsl(var(--destructive))" strokeWidth="2" />
              <line x1="165" y1="12" x2="235" y2="12" stroke="hsl(var(--destructive))" strokeWidth="2" />
              {/* Collection system */}
              <rect x="235" y="4" width="32" height="16" rx="3" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
              <text x="251" y="15" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">CSF</text>
              {/* Labels with leader lines */}
              <text x="22" y="38" fontSize="8" fill="hsl(var(--muted-foreground))">Kocher's</text>
              <text x="22" y="47" fontSize="8" fill="hsl(var(--muted-foreground))">point</text>
              <line x1="55" y1="42" x2="160" y2="40" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
              <text x="22" y="80" fontSize="8" fill="hsl(var(--destructive))">Catheter</text>
              <line x1="55" y1="78" x2="167" y2="70" stroke="hsl(var(--destructive))" strokeWidth="0.5" />
              <text x="240" y="30" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">External</text>
              <text x="240" y="38" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">transducer</text>
            </BrainBase>
            <div className="text-center">
              <p className="font-semibold text-foreground text-sm">EVD (Intraventricular)</p>
              <p className="text-xs text-muted-foreground">Gold standard. Catheter tip in lateral ventricle (usually right, via Kocher's point
    </DiagramFigure>
  ). Measures global ICP. Can drain CSF therapeutically. Risk: infection (5–10%), haemorrhage (1–2%).</p>
          </div>
        </div>

        {/* Intraparenchymal */}
        <div className="space-y-2">
          <BrainBase label="Intraparenchymal ICP monitor">
            {/* Burr hole */}
            <circle cx="165" cy="40" r="5" fill="hsl(var(--foreground))" opacity="0.3" />
            {/* Bolt/probe — shorter, tip in parenchyma, NOT reaching ventricle */}
            <line x1="165" y1="40" x2="163" y2="85" stroke="hsl(var(--chart-2))" strokeWidth="3" />
            {/* Sensor tip */}
            <circle cx="163" cy="85" r="4" fill="hsl(var(--chart-2))" />
            <text x="163" y="87" textAnchor="middle" fontSize="5" fill="hsl(var(--background))" fontWeight="bold">S</text>
            {/* Cable out */}
            <line x1="165" y1="40" x2="165" y2="12" stroke="hsl(var(--chart-2))" strokeWidth="2" />
            <line x1="165" y1="12" x2="240" y2="12" stroke="hsl(var(--chart-2))" strokeWidth="1.5" />
            <rect x="240" y="4" width="35" height="16" rx="3" fill="none" stroke="hsl(var(--chart-2))" strokeWidth="1.5" />
            <text x="258" y="15" textAnchor="middle" fontSize="6" fill="hsl(var(--chart-2))">Monitor</text>
            {/* Labels */}
            <text x="22" y="82" fontSize="8" fill="hsl(var(--chart-2))">Sensor tip</text>
            <text x="22" y="91" fontSize="8" fill="hsl(var(--chart-2))">(parenchyma)</text>
            <line x1="72" y1="86" x2="159" y2="85" stroke="hsl(var(--chart-2))" strokeWidth="0.5" />
            <text x="240" y="32" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Integrated</text>
            <text x="240" y="40" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">sensor</text>
          </BrainBase>
          <div className="text-center">
            <p className="font-semibold text-foreground text-sm">Intraparenchymal (Codman / Camino)</p>
            <p className="text-xs text-muted-foreground">Fibreoptic or strain gauge sensor in brain tissue. Easy insertion. Cannot drain CSF. Cannot re-zero after insertion → baseline drift. Measures local pressure.</p>
          </div>
        </div>

        {/* Subdural */}
        <div className="space-y-2">
          <BrainBase label="Subdural ICP monitor">
            {/* Burr hole */}
            <circle cx="165" cy="40" r="5" fill="hsl(var(--foreground))" opacity="0.3" />
            {/* Flat sensor under dura, on brain surface */}
            <path d="M145,50 Q165,46 185,50" stroke="hsl(var(--chart-4))" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="165" cy="48" r="3" fill="hsl(var(--chart-4))" />
            {/* Cable */}
            <line x1="165" y1="40" x2="165" y2="12" stroke="hsl(var(--chart-4))" strokeWidth="2" />
            {/* Labels */}
            <text x="22" y="52" fontSize="8" fill="hsl(var(--chart-4))">Flat sensor</text>
            <text x="22" y="61" fontSize="8" fill="hsl(var(--chart-4))">under dura</text>
            <line x1="72" y1="56" x2="145" y2="50" stroke="hsl(var(--chart-4))" strokeWidth="0.5" />
            <text x="245" y="52" fontSize="7" fill="hsl(var(--muted-foreground))">Dura</text>
            <line x1="240" y1="50" x2="210" y2="48" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
            <text x="245" y="63" fontSize="7" fill="hsl(var(--muted-foreground))">Brain surface</text>
            <line x1="240" y1="61" x2="210" y2="55" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          </BrainBase>
          <div className="text-center">
            <p className="font-semibold text-foreground text-sm">Subdural</p>
            <p className="text-xs text-muted-foreground">Flat sensor between dura and brain surface. No brain penetration. Less accurate — prone to drift and damping. Rarely used as primary monitor.</p>
          </div>
        </div>

        {/* Epidural */}
        <div className="space-y-2">
          <BrainBase label="Epidural ICP monitor">
            {/* Burr hole */}
            <circle cx="165" cy="40" r="5" fill="hsl(var(--foreground))" opacity="0.3" />
            {/* Sensor ON TOP of dura (between skull and dura) */}
            <path d="M145,42 Q165,38 185,42" stroke="hsl(var(--chart-5))" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="165" cy="40" r="3" fill="hsl(var(--chart-5))" />
            {/* Cable */}
            <line x1="165" y1="34" x2="165" y2="12" stroke="hsl(var(--chart-5))" strokeWidth="2" />
            {/* Labels */}
            <text x="22" y="36" fontSize="8" fill="hsl(var(--chart-5))">Sensor above</text>
            <text x="22" y="45" fontSize="8" fill="hsl(var(--chart-5))">intact dura</text>
            <line x1="78" y1="40" x2="145" y2="41" stroke="hsl(var(--chart-5))" strokeWidth="0.5" />
            <text x="245" y="42" fontSize="7" fill="hsl(var(--muted-foreground))">Dura intact ✓</text>
            <line x1="240" y1="40" x2="210" y2="42" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          </BrainBase>
          <div className="text-center">
            <p className="font-semibold text-foreground text-sm">Epidural</p>
            <p className="text-xs text-muted-foreground">Sensor between skull and dura — dura not breached. Lowest infection risk. Least accurate — measures indirectly through dura. Rarely used in modern practice.</p>
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
          <circle cx="150" cy="110" r="55" fill="hsl(var(--secondary))" stroke="hsl(var(--foreground))" strokeWidth="2" opacity="0.4" />
          {/* Lens */}
          <ellipse cx="105" cy="110" rx="8" ry="18" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.3" />
          {/* Optic nerve */}
          <rect x="205" y="104" width="120" height="12" rx="4" fill="hsl(var(--muted-foreground))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.75" />
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
          <rect x="55" y="55" width="30" height="12" rx="4" fill="hsl(var(--foreground))" opacity="0.5" stroke="hsl(var(--border))" strokeWidth="0.75" />
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
          <rect x="10" y="155" width="420" height="55" rx="6" fill="hsl(var(--secondary))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.75" />
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
