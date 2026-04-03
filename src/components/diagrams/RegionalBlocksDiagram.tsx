import { useState } from "react";

interface BlockData {
  id: string;
  name: string;
  probe: string;
  orientation: string;
  landmark: string;
  depth: string;
  needle: string;
  target: string;
  structures: string[];
  sonoAnatomy: string;
  laVolume: string;
  tips: string[];
  pitfalls: string[];
  svgContent: React.ReactNode;
}

const blocks: BlockData[] = [
  {
    id: "interscalene",
    name: "Interscalene",
    probe: "Linear (high-frequency, 6–13 MHz)",
    orientation: "Transverse, at C6 level (cricoid cartilage)",
    landmark: "Posterior border of SCM, cricoid cartilage level",
    depth: "1–3 cm",
    needle: "In-plane, lateral to medial",
    target: "Between anterior & middle scalene muscles, around C5-C6 roots",
    structures: ["C5, C6, C7 nerve roots (hypoechoic circles)", "Anterior scalene muscle", "Middle scalene muscle", "Carotid artery (medial)", "Internal jugular vein", "Vertebral artery (deep)"],
    sonoAnatomy: "Nerve roots appear as hypoechoic round/oval structures ('traffic light sign') between the anterior and middle scalene muscles. The sternocleidomastoid overlies the field.",
    laVolume: "15–20 ml (0.375–0.5% ropivacaine/levobupivacaine)",
    tips: ["Scan caudad from C5 to identify roots clearly", "Confirm with nerve stimulator if needed", "Reduce volume to 5–10 ml to reduce phrenic palsy risk"],
    pitfalls: ["100% ipsilateral phrenic nerve palsy — avoid bilateral/contralateral lung pathology", "Horner's syndrome", "Recurrent laryngeal nerve block", "Vertebral artery injection (catastrophic)"],
    svgContent: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <rect x="0" y="0" width="300" height="200" fill="hsl(var(--muted))" rx="8" />
        <text x="150" y="16" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Interscalene — Transverse View at C6</text>
        {/* SCM */}
        <path d="M60,30 Q150,25 240,30 L240,55 Q150,60 60,55 Z" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="150" y="46" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">SCM</text>
        {/* Anterior scalene */}
        <path d="M100,60 L155,60 L155,140 L100,140 Z" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent-foreground)/0.4)" strokeWidth="1" />
        <text x="127" y="105" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.7)">Anterior</text>
        <text x="127" y="115" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.7)">Scalene</text>
        {/* Middle scalene */}
        <path d="M175,60 L240,60 L240,140 L175,140 Z" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent-foreground)/0.4)" strokeWidth="1" />
        <text x="207" y="105" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.7)">Middle</text>
        <text x="207" y="115" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.7)">Scalene</text>
        {/* Nerve roots between scalenes */}
        <circle cx="165" cy="78" r="7" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1.5" />
        <text x="165" y="81" textAnchor="middle" fontSize="6" fontWeight="bold" fill="hsl(var(--foreground))">C5</text>
        <circle cx="165" cy="100" r="7" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1.5" />
        <text x="165" y="103" textAnchor="middle" fontSize="6" fontWeight="bold" fill="hsl(var(--foreground))">C6</text>
        <circle cx="165" cy="122" r="7" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1.5" />
        <text x="165" y="125" textAnchor="middle" fontSize="6" fontWeight="bold" fill="hsl(var(--foreground))">C7</text>
        {/* Carotid */}
        <circle cx="75" cy="100" r="16" fill="hsl(var(--destructive)/0.2)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="75" y="103" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">CA</text>
        {/* IJV */}
        <ellipse cx="75" cy="70" rx="12" ry="8" fill="hsl(var(--chart-1)/0.2)" stroke="hsl(var(--chart-1))" strokeWidth="1" />
        <text x="75" y="73" textAnchor="middle" fontSize="5" fill="hsl(var(--chart-1))">IJV</text>
        {/* Needle path */}
        <line x1="270" y1="50" x2="170" y2="100" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points="172,98 168,104 175,102" fill="hsl(var(--foreground))" />
        <text x="255" y="45" fontSize="7" fill="hsl(var(--foreground))">Needle</text>
        {/* Probe */}
        <rect x="50" y="22" width="200" height="5" fill="hsl(var(--foreground))" rx="2" />
        {/* Depth markers */}
        <text x="25" y="65" fontSize="6" fill="hsl(var(--muted-foreground))">1 cm</text>
        <text x="25" y="105" fontSize="6" fill="hsl(var(--muted-foreground))">2 cm</text>
        <text x="25" y="145" fontSize="6" fill="hsl(var(--muted-foreground))">3 cm</text>
        {/* Legend */}
        <rect x="10" y="160" width="280" height="35" fill="hsl(var(--card))" rx="4" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <circle cx="25" cy="175" r="4" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <text x="33" y="178" fontSize="6" fill="hsl(var(--muted-foreground))">Nerve roots</text>
        <circle cx="100" cy="175" r="4" fill="hsl(var(--destructive)/0.2)" stroke="hsl(var(--destructive))" strokeWidth="1" />
        <text x="108" y="178" fontSize="6" fill="hsl(var(--muted-foreground))">Carotid</text>
        <rect x="160" y="171" width="8" height="8" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent-foreground)/0.4)" strokeWidth="0.5" />
        <text x="172" y="178" fontSize="6" fill="hsl(var(--muted-foreground))">Scalene muscles</text>
      </svg>
    ),
  },
  {
    id: "supraclavicular",
    name: "Supraclavicular",
    probe: "Linear (high-frequency, 6–13 MHz)",
    orientation: "Coronal oblique, supraclavicular fossa",
    landmark: "Clavicle, subclavian artery pulsation",
    depth: "1–3 cm",
    needle: "In-plane, lateral to medial (or vice versa)",
    target: "Brachial plexus divisions/trunks at 'corner pocket' (junction of 1st rib & subclavian artery)",
    structures: ["Brachial plexus (cluster of hypoechoic grapes)", "Subclavian artery", "First rib (hyperechoic with shadow)", "Pleura (sliding, deep to rib)", "Subclavian vein (medial, compressible)"],
    sonoAnatomy: "Plexus appears as a 'cluster of grapes' — multiple hypoechoic nodules lateral and posterior to the subclavian artery, sitting on the hyperechoic first rib. The pleura slides deep to the rib.",
    laVolume: "20–30 ml (0.375–0.5% ropivacaine)",
    tips: ["Identify first rib before needling — your safety net", "Target the 'corner pocket' between artery and rib", "Tilt probe to see pleura sliding below"],
    pitfalls: ["Pneumothorax (0.5–1% blind, rare with US)", "Phrenic nerve palsy (50–67%)", "Subclavian artery puncture"],
    svgContent: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <rect x="0" y="0" width="300" height="200" fill="hsl(var(--muted))" rx="8" />
        <text x="150" y="16" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Supraclavicular — Coronal Oblique View</text>
        <rect x="50" y="22" width="200" height="5" fill="hsl(var(--foreground))" rx="2" />
        {/* First rib */}
        <path d="M30,150 Q150,140 270,150 L270,165 Q150,155 30,165 Z" fill="hsl(var(--foreground)/0.3)" stroke="hsl(var(--foreground)/0.6)" strokeWidth="1.5" />
        <text x="150" y="162" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.8)">First Rib</text>
        {/* Acoustic shadow */}
        <path d="M30,165 L30,195 L270,195 L270,165 Q150,155 30,165 Z" fill="hsl(var(--foreground)/0.08)" />
        <text x="150" y="185" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground)/0.5)">Acoustic Shadow</text>
        {/* Pleura */}
        <path d="M40,145 Q150,135 260,145" fill="none" stroke="hsl(var(--chart-2))" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="270" y="143" fontSize="6" fill="hsl(var(--chart-2))">Pleura</text>
        {/* Subclavian artery */}
        <circle cx="130" cy="105" r="20" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="130" y="108" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))">SCA</text>
        {/* Brachial plexus - cluster of grapes */}
        <circle cx="170" cy="90" r="6" fill="hsl(var(--chart-4)/0.5)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <circle cx="182" cy="95" r="6" fill="hsl(var(--chart-4)/0.5)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <circle cx="175" cy="105" r="6" fill="hsl(var(--chart-4)/0.5)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <circle cx="187" cy="108" r="6" fill="hsl(var(--chart-4)/0.5)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <circle cx="165" cy="103" r="6" fill="hsl(var(--chart-4)/0.5)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <text x="195" y="85" fontSize="7" fill="hsl(var(--chart-4))" fontWeight="bold">BP</text>
        {/* Corner pocket label */}
        <path d="M155,125 L155,135 L175,135" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2,2" />
        <text x="165" y="143" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))" fontWeight="bold">Corner Pocket</text>
        {/* Needle */}
        <line x1="270" y1="40" x2="175" y2="105" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points="177,103 173,109 180,107" fill="hsl(var(--foreground))" />
        <text x="255" y="35" fontSize="7" fill="hsl(var(--foreground))">Needle</text>
      </svg>
    ),
  },
  {
    id: "axillary",
    name: "Axillary",
    probe: "Linear (high-frequency, 6–13 MHz)",
    orientation: "Transverse, axilla (arm abducted 90°)",
    landmark: "Axillary artery pulsation, coracobrachialis",
    depth: "1–2 cm",
    needle: "In-plane (either direction) or perivascular multi-injection",
    target: "Individual terminal nerves around axillary artery",
    structures: ["Axillary artery (central, pulsatile)", "Median nerve (superficial, lateral)", "Ulnar nerve (superficial, medial)", "Radial nerve (posterior/deep to artery)", "Musculocutaneous nerve (within coracobrachialis)", "Axillary vein (medial, compressible)"],
    sonoAnatomy: "Axillary artery is the central landmark. Median nerve lies lateral and superficial (often at 12 o'clock), ulnar nerve medial (2–3 o'clock), and radial nerve deep/posterior (6 o'clock). Musculocutaneous nerve is seen as a hyperechoic oval within the coracobrachialis muscle.",
    laVolume: "5–8 ml per nerve (total 20–30 ml, 0.375% ropivacaine)",
    tips: ["Block musculocutaneous nerve separately — it leaves the sheath early", "Use multi-injection technique (each nerve individually) for best success", "Compress to distinguish vein from artery"],
    pitfalls: ["Incomplete radial nerve block (deepest, hardest to reach)", "Vascular puncture", "Must block musculocutaneous nerve separately for complete arm block"],
    svgContent: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <rect x="0" y="0" width="300" height="200" fill="hsl(var(--muted))" rx="8" />
        <text x="150" y="16" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Axillary — Transverse View</text>
        <rect x="50" y="22" width="200" height="5" fill="hsl(var(--foreground))" rx="2" />
        {/* Biceps */}
        <path d="M40,35 L160,35 L160,75 L40,75 Z" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent-foreground)/0.3)" strokeWidth="1" />
        <text x="100" y="58" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.6)">Biceps</text>
        {/* Coracobrachialis */}
        <path d="M170,35 L260,35 L260,80 L170,80 Z" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent-foreground)/0.4)" strokeWidth="1" />
        <text x="215" y="52" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.6)">Coraco-</text>
        <text x="215" y="61" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.6)">brachialis</text>
        {/* Musculocutaneous nerve in coracobrachialis */}
        <ellipse cx="210" cy="72" rx="6" ry="4" fill="hsl(var(--chart-5)/0.6)" stroke="hsl(var(--chart-5))" strokeWidth="1.5" />
        <text x="235" y="75" fontSize="5" fill="hsl(var(--chart-5))" fontWeight="bold">MCN</text>
        {/* Axillary artery */}
        <circle cx="140" cy="110" r="18" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="140" y="113" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))">AA</text>
        {/* Axillary vein */}
        <ellipse cx="105" cy="120" rx="12" ry="8" fill="hsl(var(--chart-1)/0.2)" stroke="hsl(var(--chart-1))" strokeWidth="1" />
        <text x="105" y="123" textAnchor="middle" fontSize="5" fill="hsl(var(--chart-1))">AV</text>
        {/* Median nerve - lateral/superficial */}
        <circle cx="125" cy="88" r="6" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1.5" />
        <text x="110" y="84" fontSize="6" fill="hsl(var(--chart-4))" fontWeight="bold">M</text>
        {/* Ulnar nerve - medial */}
        <circle cx="118" cy="115" r="6" fill="hsl(var(--chart-2)/0.6)" stroke="hsl(var(--chart-2))" strokeWidth="1.5" />
        <text x="100" y="112" fontSize="6" fill="hsl(var(--chart-2))" fontWeight="bold">U</text>
        {/* Radial nerve - posterior/deep */}
        <circle cx="145" cy="135" r="6" fill="hsl(var(--chart-3)/0.6)" stroke="hsl(var(--chart-3))" strokeWidth="1.5" />
        <text x="155" y="140" fontSize="6" fill="hsl(var(--chart-3))" fontWeight="bold">R</text>
        {/* Triceps deep */}
        <path d="M40,145 L260,145 L260,195 L40,195 Z" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent-foreground)/0.2)" strokeWidth="1" />
        <text x="150" y="175" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.5)">Triceps / Humerus</text>
        {/* Legend */}
        <circle cx="50" cy="155" r="3" fill="hsl(var(--chart-4)/0.6)" />
        <text x="57" y="158" fontSize="5" fill="hsl(var(--muted-foreground))">Median</text>
        <circle cx="50" cy="165" r="3" fill="hsl(var(--chart-2)/0.6)" />
        <text x="57" y="168" fontSize="5" fill="hsl(var(--muted-foreground))">Ulnar</text>
        <circle cx="50" cy="175" r="3" fill="hsl(var(--chart-3)/0.6)" />
        <text x="57" y="178" fontSize="5" fill="hsl(var(--muted-foreground))">Radial</text>
      </svg>
    ),
  },
  {
    id: "femoral",
    name: "Femoral",
    probe: "Linear (high-frequency, 6–13 MHz)",
    orientation: "Transverse, inguinal crease",
    landmark: "Inguinal ligament, femoral artery pulsation",
    depth: "2–4 cm (body habitus dependent)",
    needle: "In-plane, lateral to medial",
    target: "Femoral nerve (lateral to femoral artery, deep to fascia iliaca)",
    structures: ["Femoral nerve (hyperechoic, triangular/oval)", "Femoral artery", "Femoral vein (medial, compressible)", "Fascia lata (superficial fascia)", "Fascia iliaca (deep fascia — 'double pop')", "Iliopsoas muscle"],
    sonoAnatomy: "The femoral nerve appears as a hyperechoic triangular or flattened oval structure lateral to the femoral artery, deep to the fascia iliaca and superficial to the iliopsoas muscle. 'VAN' mnemonic: Vein–Artery–Nerve (medial to lateral).",
    laVolume: "15–20 ml (0.375–0.5% ropivacaine)",
    tips: ["Identify two fascial layers — fascia lata and fascia iliaca", "Inject deep to fascia iliaca for reliable spread", "Scan proximally if nerve not well seen at crease"],
    pitfalls: ["Quadriceps weakness — high fall risk postoperatively", "Femoral artery puncture", "Consider adductor canal block as motor-sparing alternative for knee surgery"],
    svgContent: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <rect x="0" y="0" width="300" height="200" fill="hsl(var(--muted))" rx="8" />
        <text x="150" y="16" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Femoral — Transverse View at Inguinal Crease</text>
        <rect x="50" y="22" width="200" height="5" fill="hsl(var(--foreground))" rx="2" />
        {/* Fascia lata */}
        <line x1="30" y1="50" x2="270" y2="50" stroke="hsl(var(--foreground)/0.5)" strokeWidth="1.5" />
        <text x="280" y="50" fontSize="6" fill="hsl(var(--muted-foreground))">FL</text>
        {/* Fascia iliaca */}
        <line x1="130" y1="75" x2="270" y2="75" stroke="hsl(var(--foreground)/0.4)" strokeWidth="1.5" strokeDasharray="3,2" />
        <text x="280" y="75" fontSize="6" fill="hsl(var(--muted-foreground))">FI</text>
        {/* Sartorius */}
        <path d="M130,50 L200,50 L200,75 L130,75 Z" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent-foreground)/0.3)" strokeWidth="1" />
        <text x="165" y="66" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.6)">Sartorius</text>
        {/* Iliopsoas */}
        <path d="M130,80 L270,80 L270,160 L130,160 Z" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent-foreground)/0.2)" strokeWidth="1" />
        <text x="200" y="130" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.5)">Iliopsoas</text>
        {/* Femoral vein */}
        <ellipse cx="70" cy="95" rx="15" ry="12" fill="hsl(var(--chart-1)/0.2)" stroke="hsl(var(--chart-1))" strokeWidth="1.5" />
        <text x="70" y="98" textAnchor="middle" fontSize="7" fill="hsl(var(--chart-1))">FV</text>
        {/* Femoral artery */}
        <circle cx="115" cy="95" r="16" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="115" y="98" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))">FA</text>
        {/* Femoral nerve */}
        <path d="M150,82 L175,82 L175,95 L150,95 Z" fill="hsl(var(--chart-4)/0.5)" stroke="hsl(var(--chart-4))" strokeWidth="1.5" rx="3" />
        <text x="162" y="91" textAnchor="middle" fontSize="7" fill="hsl(var(--chart-4))" fontWeight="bold">FN</text>
        {/* VAN label */}
        <text x="115" y="140" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">V — A — N</text>
        <text x="115" y="150" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">(medial → lateral)</text>
        {/* Needle */}
        <line x1="260" y1="40" x2="168" y2="88" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points="170,86 166,92 173,90" fill="hsl(var(--foreground))" />
        <text x="250" y="35" fontSize="7" fill="hsl(var(--foreground))">Needle</text>
        {/* Depth */}
        <text x="25" y="55" fontSize="6" fill="hsl(var(--muted-foreground))">1 cm</text>
        <text x="25" y="95" fontSize="6" fill="hsl(var(--muted-foreground))">2 cm</text>
        <text x="25" y="135" fontSize="6" fill="hsl(var(--muted-foreground))">3 cm</text>
      </svg>
    ),
  },
  {
    id: "adductor-canal",
    name: "Adductor Canal",
    probe: "Linear (high-frequency, 6–13 MHz)",
    orientation: "Transverse, mid-thigh (midpoint ASIS to patella)",
    landmark: "Sartorius muscle at mid-thigh, femoral/superficial femoral artery",
    depth: "2–4 cm",
    needle: "In-plane, lateral to medial (through sartorius)",
    target: "Saphenous nerve within the adductor canal, deep to sartorius",
    structures: ["Saphenous nerve (small, hyperechoic, lateral to artery)", "Superficial femoral artery (SFA)", "Superficial femoral vein", "Sartorius muscle (roof of canal)", "Vastus medialis (lateral wall)", "Adductor longus/magnus (medial/floor)"],
    sonoAnatomy: "The adductor canal is a triangular space: sartorius forms the roof, vastus medialis the lateral wall, and adductor longus/magnus the medial wall/floor. The SFA and saphenous nerve sit within this canal. The subsartorial fascia (vasoadductor membrane) covers the canal.",
    laVolume: "10–15 ml (0.25–0.375% ropivacaine)",
    tips: ["Follow the SFA distally from the femoral triangle — it dives under sartorius", "Motor-sparing alternative to femoral nerve block for knee surgery", "Saphenous nerve is small — inject around the artery within the canal"],
    pitfalls: ["Too proximal injection → femoral nerve block (with quadriceps weakness)", "SFA puncture", "Block may miss posterior knee innervation — consider adding iPACK or sciatic"],
    svgContent: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <rect x="0" y="0" width="300" height="200" fill="hsl(var(--muted))" rx="8" />
        <text x="150" y="16" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Adductor Canal — Transverse View, Mid-Thigh</text>
        <rect x="50" y="22" width="200" height="5" fill="hsl(var(--foreground))" rx="2" />
        {/* Sartorius — roof */}
        <path d="M80,45 Q150,40 220,45 L220,70 Q150,65 80,70 Z" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent-foreground)/0.4)" strokeWidth="1" />
        <text x="150" y="60" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.7)">Sartorius (roof)</text>
        {/* Vastus medialis — lateral */}
        <path d="M200,45 L270,45 L270,150 L200,100 Z" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent-foreground)/0.3)" strokeWidth="1" />
        <text x="240" y="85" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.5)">Vastus</text>
        <text x="240" y="95" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.5)">Medialis</text>
        {/* Adductor — medial/floor */}
        <path d="M80,70 L80,150 L200,150 L200,100 Z" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent-foreground)/0.2)" strokeWidth="1" />
        <text x="130" y="140" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.5)">Adductor Longus</text>
        {/* Canal space */}
        <path d="M100,72 L190,72 L190,100 L100,100 Z" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" strokeDasharray="3,2" />
        {/* SFA */}
        <circle cx="140" cy="88" r="12" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="140" y="91" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">SFA</text>
        {/* SFV */}
        <ellipse cx="120" cy="92" rx="8" ry="6" fill="hsl(var(--chart-1)/0.2)" stroke="hsl(var(--chart-1))" strokeWidth="1" />
        <text x="120" y="95" textAnchor="middle" fontSize="5" fill="hsl(var(--chart-1))">V</text>
        {/* Saphenous nerve */}
        <circle cx="165" cy="82" r="5" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1.5" />
        <text x="175" y="80" fontSize="6" fill="hsl(var(--chart-4))" fontWeight="bold">SN</text>
        {/* Needle */}
        <line x1="260" y1="35" x2="168" y2="82" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points="170,80 166,86 173,84" fill="hsl(var(--foreground))" />
        {/* Label */}
        <text x="150" y="112" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">Adductor Canal</text>
        <text x="25" y="55" fontSize="6" fill="hsl(var(--muted-foreground))">1 cm</text>
        <text x="25" y="90" fontSize="6" fill="hsl(var(--muted-foreground))">2 cm</text>
        <text x="25" y="125" fontSize="6" fill="hsl(var(--muted-foreground))">3 cm</text>
      </svg>
    ),
  },
  {
    id: "popliteal-sciatic",
    name: "Popliteal Sciatic",
    probe: "Linear (high-frequency, 6–13 MHz) or curvilinear for larger patients",
    orientation: "Transverse, popliteal fossa (8–10 cm above popliteal crease)",
    landmark: "Popliteal crease, biceps femoris & semimembranosus tendons",
    depth: "2–5 cm",
    needle: "In-plane, lateral to medial",
    target: "Sciatic nerve before bifurcation (or tibial + common peroneal individually)",
    structures: ["Sciatic nerve (large, hyperechoic, oval)", "Tibial nerve (larger, medial division)", "Common peroneal nerve (smaller, lateral division)", "Popliteal artery & vein (deep, anterior)", "Biceps femoris (lateral)", "Semimembranosus/semitendinosus (medial)"],
    sonoAnatomy: "The sciatic nerve appears as a large hyperechoic oval structure superficial to the popliteal vessels. Scanning proximally from the popliteal crease, the tibial and common peroneal nerves converge at the bifurcation point (typically 5–8 cm above the crease). Pre-bifurcation block provides more reliable anaesthesia.",
    laVolume: "20–30 ml (0.375–0.5% ropivacaine)",
    tips: ["Scan from crease proximally to find bifurcation point", "Block proximal to bifurcation for complete coverage", "Use a 'seesaw' sign — rocking the probe shows nerve movement relative to vessels", "Lateral position with knee flexed improves access"],
    pitfalls: ["Foot drop risk with excessive volume or intraneural injection", "Missed common peroneal if blocked too distally (after bifurcation)", "Popliteal vessel puncture"],
    svgContent: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <rect x="0" y="0" width="300" height="200" fill="hsl(var(--muted))" rx="8" />
        <text x="150" y="16" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Popliteal Sciatic — Transverse View</text>
        <rect x="50" y="22" width="200" height="5" fill="hsl(var(--foreground))" rx="2" />
        {/* Biceps femoris - lateral */}
        <path d="M190,35 L270,35 L270,130 L190,100 Z" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent-foreground)/0.3)" strokeWidth="1" />
        <text x="235" y="70" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.5)">Biceps</text>
        <text x="235" y="80" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.5)">Femoris</text>
        {/* Semimembranosus - medial */}
        <path d="M30,35 L110,35 L110,100 L30,130 Z" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent-foreground)/0.3)" strokeWidth="1" />
        <text x="70" y="70" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.5)">Semi-</text>
        <text x="70" y="80" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.5)">membranosus</text>
        {/* Popliteal fat */}
        <path d="M110,35 L190,35 L190,100 L110,100 Z" fill="hsl(var(--accent)/0.08)" />
        {/* Sciatic nerve — pre-bifurcation */}
        <ellipse cx="150" cy="65" rx="16" ry="12" fill="hsl(var(--chart-4)/0.5)" stroke="hsl(var(--chart-4))" strokeWidth="1.5" />
        <text x="150" y="62" textAnchor="middle" fontSize="6" fontWeight="bold" fill="hsl(var(--foreground))">Sciatic</text>
        <text x="150" y="71" textAnchor="middle" fontSize="5" fill="hsl(var(--foreground)/0.7)">Nerve</text>
        {/* Show bifurcation hint */}
        <line x1="140" y1="77" x2="130" y2="95" stroke="hsl(var(--chart-4))" strokeWidth="1" strokeDasharray="2,2" />
        <line x1="160" y1="77" x2="170" y2="95" stroke="hsl(var(--chart-4))" strokeWidth="1" strokeDasharray="2,2" />
        <circle cx="130" cy="100" r="7" fill="hsl(var(--chart-4)/0.3)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <text x="130" y="103" textAnchor="middle" fontSize="5" fill="hsl(var(--chart-4))">TN</text>
        <circle cx="170" cy="100" r="6" fill="hsl(var(--chart-4)/0.3)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <text x="170" y="103" textAnchor="middle" fontSize="5" fill="hsl(var(--chart-4))">CPN</text>
        {/* Popliteal artery & vein — deep/anterior */}
        <circle cx="145" cy="140" r="12" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="145" y="143" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">PA</text>
        <ellipse cx="165" cy="142" rx="9" ry="7" fill="hsl(var(--chart-1)/0.2)" stroke="hsl(var(--chart-1))" strokeWidth="1" />
        <text x="165" y="145" textAnchor="middle" fontSize="5" fill="hsl(var(--chart-1))">PV</text>
        {/* Needle */}
        <line x1="260" y1="35" x2="165" y2="63" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points="167,61 163,67 170,65" fill="hsl(var(--foreground))" />
        <text x="250" y="32" fontSize="7" fill="hsl(var(--foreground))">Needle</text>
        {/* Depth */}
        <text x="15" y="45" fontSize="6" fill="hsl(var(--muted-foreground))">1 cm</text>
        <text x="15" y="85" fontSize="6" fill="hsl(var(--muted-foreground))">3 cm</text>
        <text x="15" y="125" fontSize="6" fill="hsl(var(--muted-foreground))">5 cm</text>
        {/* Legend */}
        <rect x="30" y="165" width="240" height="28" fill="hsl(var(--card))" rx="4" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="50" y="180" fontSize="6" fill="hsl(var(--muted-foreground))">TN = Tibial Nerve</text>
        <text x="145" y="180" fontSize="6" fill="hsl(var(--muted-foreground))">CPN = Common Peroneal</text>
        <text x="100" y="190" fontSize="6" fill="hsl(var(--primary))">↑ Block proximal to bifurcation</text>
      </svg>
    ),
  },
  {
    id: "tap",
    name: "TAP Block",
    probe: "Linear (high-frequency, 6–13 MHz)",
    orientation: "Transverse, between costal margin and iliac crest (mid-axillary line)",
    landmark: "Anterior axillary line, between 12th rib and iliac crest",
    depth: "1–3 cm",
    needle: "In-plane, anterior to posterior",
    target: "Transversus abdominis plane — between internal oblique and transversus abdominis",
    structures: ["External oblique (superficial muscle layer)", "Internal oblique (middle muscle layer)", "Transversus abdominis (deepest muscle layer)", "Peritoneum (deep, sliding with respiration)", "T6-L1 intercostal nerves (within TAP)", "Fascial layers between muscles"],
    sonoAnatomy: "Three muscle layers visible as a 'layered cake' between skin and peritoneum. The TAP lies between internal oblique and transversus abdominis. On injection, LA should spread as a hypoechoic lens separating these two layers. The peritoneum is seen sliding deep to transversus abdominis.",
    laVolume: "20 ml per side (0.25–0.375% ropivacaine/levobupivacaine). Bilateral = high total LA dose — beware toxicity",
    tips: ["Identify all three muscle layers before needling", "Watch for hydrodissection — LA spreading in the correct plane", "Lateral TAP (mid-axillary) covers T10-L1; subcostal TAP covers T6-T10", "Use pop technique — feel two fascial pops"],
    pitfalls: ["Visceral injury (bowel perforation) if needle too deep", "LA toxicity with bilateral blocks (large volumes)", "Only covers somatic abdominal wall pain — not visceral", "Superficial injection (between EO and IO) = ineffective block"],
    svgContent: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <rect x="0" y="0" width="300" height="200" fill="hsl(var(--muted))" rx="8" />
        <text x="150" y="16" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">TAP Block — Transverse View, Mid-Axillary Line</text>
        <rect x="50" y="22" width="200" height="5" fill="hsl(var(--foreground))" rx="2" />
        {/* Skin/subcut */}
        <rect x="30" y="30" width="240" height="15" fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--accent-foreground)/0.2)" strokeWidth="0.5" />
        <text x="150" y="41" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.4)">Subcutaneous</text>
        {/* External oblique */}
        <rect x="30" y="48" width="240" height="25" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent-foreground)/0.4)" strokeWidth="1" />
        <text x="150" y="64" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.7)">External Oblique</text>
        {/* Internal oblique */}
        <rect x="30" y="76" width="240" height="28" fill="hsl(var(--accent)/0.25)" stroke="hsl(var(--accent-foreground)/0.4)" strokeWidth="1" />
        <text x="150" y="93" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.7)">Internal Oblique</text>
        {/* TAP — target plane */}
        <rect x="30" y="105" width="240" height="8" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4,2" />
        <text x="280" y="112" fontSize="6" fill="hsl(var(--primary))" fontWeight="bold">TAP</text>
        {/* LA spread in TAP */}
        <ellipse cx="170" cy="109" rx="40" ry="5" fill="hsl(var(--chart-4)/0.3)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <text x="170" y="111" textAnchor="middle" fontSize="5" fill="hsl(var(--chart-4))">LA spread</text>
        {/* Transversus abdominis */}
        <rect x="30" y="115" width="240" height="22" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent-foreground)/0.3)" strokeWidth="1" />
        <text x="150" y="130" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.7)">Transversus Abdominis</text>
        {/* Peritoneum */}
        <path d="M30,140 Q150,145 270,140" fill="none" stroke="hsl(var(--chart-2))" strokeWidth="1.5" />
        <text x="280" y="143" fontSize="6" fill="hsl(var(--chart-2))">Peritoneum</text>
        {/* Peritoneal cavity */}
        <rect x="30" y="145" width="240" height="30" fill="hsl(var(--destructive)/0.05)" />
        <text x="150" y="163" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground)/0.5)">Peritoneal Cavity</text>
        {/* Intercostal nerves in TAP */}
        <circle cx="100" cy="109" r="3" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <circle cx="130" cy="109" r="3" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <circle cx="210" cy="109" r="3" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        {/* Needle */}
        <line x1="40" y1="35" x2="160" y2="107" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points="158,105 162,111 155,109" fill="hsl(var(--foreground))" />
        <text x="35" y="33" fontSize="7" fill="hsl(var(--foreground))">Needle</text>
        {/* Labels showing two pops */}
        <text x="80" y="55" fontSize="6" fill="hsl(var(--primary))" fontWeight="bold">Pop 1 →</text>
        <text x="120" y="80" fontSize="6" fill="hsl(var(--primary))" fontWeight="bold">Pop 2 →</text>
        {/* Depth */}
        <text x="15" y="55" fontSize="6" fill="hsl(var(--muted-foreground))">1 cm</text>
        <text x="15" y="95" fontSize="6" fill="hsl(var(--muted-foreground))">2 cm</text>
        <text x="15" y="135" fontSize="6" fill="hsl(var(--muted-foreground))">3 cm</text>
        {/* Legend */}
        <rect x="30" y="178" width="240" height="18" fill="hsl(var(--card))" rx="4" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <circle cx="45" cy="188" r="3" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <text x="52" y="191" fontSize="6" fill="hsl(var(--muted-foreground))">T6-L1 nerves</text>
        <text x="130" y="191" fontSize="6" fill="hsl(var(--primary))">Three muscle layers = 'layered cake'</text>
      </svg>
    ),
  },
  {
    id: "esp",
    name: "Erector Spinae Plane",
    probe: "Linear (high-frequency) or curvilinear (deeper patients)",
    orientation: "Parasagittal, 2–3 cm lateral to midline (over transverse process)",
    landmark: "Spinous processes, transverse process at target level (T5 for thoracic, L3-4 for lumbar)",
    depth: "2–4 cm (to transverse process)",
    needle: "In-plane, cranial to caudal (or caudal to cranial)",
    target: "Deep to erector spinae muscle, superficial to transverse process",
    structures: ["Erector spinae muscle group (superficial)", "Transverse process (hyperechoic, flat, with acoustic shadow)", "Costotransverse ligament/intertransverse membrane", "Paravertebral space (deep to transverse process)", "Trapezius/rhomboid (superficial, thoracic levels)"],
    sonoAnatomy: "In parasagittal view, the transverse processes appear as flat hyperechoic structures with acoustic shadows ('trident sign' when multiple levels visible). The erector spinae muscles overlie the transverse processes. LA is deposited deep to the muscle, lifting it off the transverse process. Spread occurs cranio-caudally and into the paravertebral and epidural spaces.",
    laVolume: "20–30 ml per side (0.25–0.375% ropivacaine). Large volume needed for multi-dermatomal spread",
    tips: ["Count spinous processes from C7 (vertebra prominens) to identify level", "Needle tip should contact transverse process — then inject to hydrodissect muscle off bone", "Bilateral blocks needed for midline surgery", "Works for thoracic (T5), abdominal (T7-9), and hip (L3-4) surgery"],
    pitfalls: ["Pneumothorax (very rare — transverse process is your backstop)", "Inconsistent paravertebral spread — may not reliably block ventral rami", "Large LA volumes — beware systemic toxicity with bilateral blocks", "Evidence base still emerging — mechanism debated"],
    svgContent: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <rect x="0" y="0" width="300" height="200" fill="hsl(var(--muted))" rx="8" />
        <text x="150" y="16" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">ESP Block — Parasagittal View</text>
        <rect x="50" y="22" width="200" height="5" fill="hsl(var(--foreground))" rx="2" />
        {/* Skin/subcut */}
        <rect x="30" y="30" width="240" height="10" fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--accent-foreground)/0.15)" strokeWidth="0.5" />
        {/* Trapezius */}
        <rect x="30" y="42" width="240" height="15" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent-foreground)/0.3)" strokeWidth="1" />
        <text x="150" y="53" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.5)">Trapezius</text>
        {/* Erector spinae */}
        <rect x="30" y="60" width="240" height="30" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent-foreground)/0.4)" strokeWidth="1" />
        <text x="150" y="78" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground)/0.7)">Erector Spinae Muscle</text>
        {/* ESP target plane */}
        <rect x="30" y="91" width="240" height="7" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4,2" />
        <text x="280" y="97" fontSize="6" fill="hsl(var(--primary))" fontWeight="bold">ESP</text>
        {/* LA spread */}
        <ellipse cx="150" cy="95" rx="50" ry="4" fill="hsl(var(--chart-4)/0.3)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        {/* Transverse processes — trident sign */}
        <rect x="55" y="100" width="30" height="20" fill="hsl(var(--foreground)/0.3)" stroke="hsl(var(--foreground)/0.6)" strokeWidth="1.5" rx="2" />
        <text x="70" y="113" textAnchor="middle" fontSize="5" fill="hsl(var(--foreground)/0.8)">TP</text>
        <rect x="135" y="100" width="30" height="20" fill="hsl(var(--foreground)/0.3)" stroke="hsl(var(--foreground)/0.6)" strokeWidth="1.5" rx="2" />
        <text x="150" y="113" textAnchor="middle" fontSize="5" fill="hsl(var(--foreground)/0.8)">TP</text>
        <rect x="215" y="100" width="30" height="20" fill="hsl(var(--foreground)/0.3)" stroke="hsl(var(--foreground)/0.6)" strokeWidth="1.5" rx="2" />
        <text x="230" y="113" textAnchor="middle" fontSize="5" fill="hsl(var(--foreground)/0.8)">TP</text>
        {/* Acoustic shadows */}
        <rect x="55" y="120" width="30" height="35" fill="hsl(var(--foreground)/0.06)" />
        <rect x="135" y="120" width="30" height="35" fill="hsl(var(--foreground)/0.06)" />
        <rect x="215" y="120" width="30" height="35" fill="hsl(var(--foreground)/0.06)" />
        {/* Paravertebral space between TPs */}
        <rect x="90" y="102" width="40" height="15" fill="hsl(var(--chart-2)/0.1)" stroke="hsl(var(--chart-2)/0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
        <text x="110" y="112" textAnchor="middle" fontSize="5" fill="hsl(var(--chart-2))">PVS</text>
        <rect x="170" y="102" width="40" height="15" fill="hsl(var(--chart-2)/0.1)" stroke="hsl(var(--chart-2)/0.3)" strokeWidth="0.5" strokeDasharray="2,2" />
        <text x="190" y="112" textAnchor="middle" fontSize="5" fill="hsl(var(--chart-2))">PVS</text>
        {/* Pleura deep */}
        <path d="M85,125 Q110,130 130,125" fill="none" stroke="hsl(var(--destructive)/0.5)" strokeWidth="1" strokeDasharray="2,2" />
        <path d="M165,125 Q190,130 210,125" fill="none" stroke="hsl(var(--destructive)/0.5)" strokeWidth="1" strokeDasharray="2,2" />
        <text x="110" y="135" textAnchor="middle" fontSize="5" fill="hsl(var(--destructive)/0.5)">Pleura</text>
        {/* Needle */}
        <line x1="40" y1="35" x2="145" y2="93" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points="143,91 147,97 140,95" fill="hsl(var(--foreground))" />
        <text x="35" y="33" fontSize="7" fill="hsl(var(--foreground))">Needle</text>
        {/* Spread arrows */}
        <line x1="100" y1="95" x2="60" y2="95" stroke="hsl(var(--chart-4))" strokeWidth="1" markerEnd="url(#arrowESP)" />
        <line x1="200" y1="95" x2="240" y2="95" stroke="hsl(var(--chart-4))" strokeWidth="1" markerEnd="url(#arrowESP)" />
        <defs>
          <marker id="arrowESP" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="hsl(var(--chart-4))" />
          </marker>
        </defs>
        <text x="150" y="88" textAnchor="middle" fontSize="5" fill="hsl(var(--chart-4))">Cranio-caudal LA spread</text>
        {/* Depth */}
        <text x="15" y="50" fontSize="6" fill="hsl(var(--muted-foreground))">1 cm</text>
        <text x="15" y="80" fontSize="6" fill="hsl(var(--muted-foreground))">2 cm</text>
        <text x="15" y="110" fontSize="6" fill="hsl(var(--muted-foreground))">3 cm</text>
        {/* Legend */}
        <rect x="30" y="160" width="240" height="35" fill="hsl(var(--card))" rx="4" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <rect x="45" y="170" width="8" height="6" fill="hsl(var(--foreground)/0.3)" stroke="hsl(var(--foreground)/0.6)" strokeWidth="0.5" />
        <text x="58" y="176" fontSize="6" fill="hsl(var(--muted-foreground))">Transverse process</text>
        <rect x="145" y="170" width="8" height="6" fill="hsl(var(--chart-2)/0.1)" stroke="hsl(var(--chart-2)/0.3)" strokeWidth="0.5" />
        <text x="158" y="176" fontSize="6" fill="hsl(var(--muted-foreground))">Paravertebral space</text>
        <text x="150" y="190" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))">TP = 'Trident sign' on parasagittal scan</text>
      </svg>
    ),
  },
  {
    id: "rectus-sheath",
    name: "Rectus Sheath",
    probe: "Linear (high-frequency, 6–13 MHz)",
    orientation: "Transverse, paramedian (over rectus abdominis)",
    landmark: "Umbilicus level, lateral border of rectus abdominis",
    depth: "1–2 cm",
    needle: "In-plane, lateral to medial",
    target: "Posterior rectus sheath — between rectus abdominis and posterior sheath",
    structures: ["Rectus abdominis muscle", "Anterior rectus sheath", "Posterior rectus sheath", "Linea semilunaris (lateral border)", "Peritoneum (deep to posterior sheath)", "T9-T11 intercostal nerves (within posterior sheath)"],
    sonoAnatomy: "Rectus abdominis appears as a hypoechoic rectangular muscle enclosed by the hyperechoic anterior and posterior rectus sheaths. Below the arcuate line (below umbilicus), the posterior sheath is absent — only transversalis fascia and peritoneum remain. LA is deposited between the muscle and posterior sheath.",
    laVolume: "10–15 ml per side (0.25–0.375% ropivacaine). Bilateral for midline incisions",
    tips: ["Inject between rectus muscle and posterior sheath — watch for hydrodissection", "Below arcuate line, posterior sheath absent — greater risk of peritoneal puncture", "Excellent for midline laparotomy and umbilical hernia repair", "Bilateral blocks needed for midline surgery"],
    pitfalls: ["Peritoneal puncture and bowel injury — especially below arcuate line", "Only covers midline (T9-T11) — not lateral abdominal wall", "Haematoma within rectus sheath (inferior epigastric artery)", "Short duration compared to TAP — consider catheter"],
    svgContent: (
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <rect x="0" y="0" width="300" height="200" fill="hsl(var(--muted))" rx="8" />
        <text x="150" y="16" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Rectus Sheath Block — Transverse View</text>
        <rect x="50" y="22" width="200" height="5" fill="hsl(var(--foreground))" rx="2" />
        {/* Skin */}
        <rect x="30" y="30" width="240" height="10" fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--accent-foreground)/0.15)" strokeWidth="0.5" />
        {/* Anterior rectus sheath */}
        <rect x="80" y="43" width="140" height="5" fill="hsl(var(--foreground)/0.25)" stroke="hsl(var(--foreground)/0.5)" strokeWidth="1.5" />
        <text x="280" y="49" fontSize="5" fill="hsl(var(--muted-foreground))">ARS</text>
        {/* Lateral muscles (EO/IO/TA forming sheath) */}
        <rect x="30" y="43" width="45" height="65" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent-foreground)/0.2)" strokeWidth="0.5" />
        <text x="52" y="75" textAnchor="middle" fontSize="5" fill="hsl(var(--foreground)/0.4)">Lateral</text>
        <text x="52" y="83" textAnchor="middle" fontSize="5" fill="hsl(var(--foreground)/0.4)">muscles</text>
        <rect x="225" y="43" width="45" height="65" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent-foreground)/0.2)" strokeWidth="0.5" />
        {/* Rectus abdominis */}
        <rect x="80" y="50" width="140" height="40" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent-foreground)/0.4)" strokeWidth="1" />
        <text x="150" y="73" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground)/0.7)">Rectus Abdominis</text>
        {/* Linea alba */}
        <line x1="150" y1="43" x2="150" y2="113" stroke="hsl(var(--foreground)/0.4)" strokeWidth="2" />
        <text x="150" y="120" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.5)">Linea Alba</text>
        {/* Posterior rectus sheath */}
        <rect x="80" y="92" width="140" height="5" fill="hsl(var(--foreground)/0.2)" stroke="hsl(var(--foreground)/0.5)" strokeWidth="1.5" />
        <text x="280" y="98" fontSize="5" fill="hsl(var(--muted-foreground))">PRS</text>
        {/* Target plane — LA spread */}
        <ellipse cx="120" cy="92" rx="30" ry="4" fill="hsl(var(--chart-4)/0.3)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <text x="120" y="94" textAnchor="middle" fontSize="5" fill="hsl(var(--chart-4))">LA</text>
        {/* Nerves */}
        <circle cx="100" cy="92" r="3" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        <circle cx="140" cy="92" r="3" fill="hsl(var(--chart-4)/0.6)" stroke="hsl(var(--chart-4))" strokeWidth="1" />
        {/* Peritoneum */}
        <path d="M30,113 Q150,118 270,113" fill="none" stroke="hsl(var(--chart-2))" strokeWidth="1.5" />
        <text x="280" y="117" fontSize="5" fill="hsl(var(--chart-2))">Peritoneum</text>
        {/* Peritoneal cavity */}
        <rect x="30" y="120" width="240" height="30" fill="hsl(var(--destructive)/0.05)" />
        <text x="150" y="138" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground)/0.4)">Peritoneal Cavity</text>
        {/* Linea semilunaris labels */}
        <text x="78" y="42" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">LS</text>
        <text x="222" y="42" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">LS</text>
        {/* Needle */}
        <line x1="250" y1="35" x2="130" y2="90" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points="132,88 128,94 135,92" fill="hsl(var(--foreground))" />
        <text x="248" y="32" fontSize="7" fill="hsl(var(--foreground))">Needle</text>
        {/* Depth */}
        <text x="15" y="50" fontSize="6" fill="hsl(var(--muted-foreground))">0.5</text>
        <text x="15" y="75" fontSize="6" fill="hsl(var(--muted-foreground))">1 cm</text>
        <text x="15" y="100" fontSize="6" fill="hsl(var(--muted-foreground))">1.5</text>
        {/* Legend */}
        <rect x="30" y="155" width="240" height="40" fill="hsl(var(--card))" rx="4" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <text x="150" y="168" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">ARS = Anterior Rectus Sheath | PRS = Posterior Rectus Sheath</text>
        <text x="150" y="180" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">LS = Linea Semilunaris</text>
        <text x="150" y="190" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))">Inject between muscle and posterior sheath</text>
      </svg>
    ),
  },
  {
    id: "ql",
    name: "Quadratus Lumborum",
    probe: "Curvilinear (low-frequency, 2–5 MHz) or linear",
    orientation: "Transverse, posterior axillary line at L2–L4 level",
    landmark: "Posterior axillary line, iliac crest, 12th rib, 'shamrock sign'",
    depth: "3–6 cm (body habitus dependent)",
    needle: "In-plane, posterior to anterior (QL1/QL2) or anterior approach (QL3/transmuscular)",
    target: "Variable — anterior, lateral, or posterior to quadratus lumborum muscle",
    structures: ["Quadratus lumborum (QL) muscle", "Transverse process of L-spine (forms the 'stem' of shamrock)", "Psoas major (anterior to TP)", "Erector spinae (posterior to TP)", "Transversalis fascia / thoracolumbar fascia", "Kidney (deep, anterior — beware)"],
    sonoAnatomy: "The 'Shamrock sign' is the key landmark: the transverse process is the stem, with three leaves — QL (posterior), psoas major (anterior), and erector spinae (posterolateral). The QL is a flat, quadrilateral muscle between the 12th rib and iliac crest. Three approaches target different fascial planes around the QL.",
    laVolume: "20–30 ml per side (0.25–0.375% ropivacaine)",
    tips: ["Identify the 'shamrock sign' — TP as stem, three muscles as leaves", "QL1 (lateral): inject at lateral border of QL", "QL2 (posterior): inject between QL and erector spinae", "QL3/Transmuscular (anterior): inject between QL and psoas — most paravertebral-like spread", "Provides both somatic and visceral analgesia (paravertebral spread)"],
    pitfalls: ["Renal injury (kidney lies anterior to QL)", "LA systemic toxicity with bilateral blocks", "Variable and unpredictable spread between approaches", "Deep block — poor needle visibility in obese patients", "Lumbar plexus injury with transmuscular approach (rare)"],
    svgContent: (
      <svg viewBox="0 0 300 220" className="w-full h-auto">
        <rect x="0" y="0" width="300" height="220" fill="hsl(var(--muted))" rx="8" />
        <text x="150" y="16" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Quadratus Lumborum — Transverse View ('Shamrock Sign')</text>
        <rect x="50" y="22" width="200" height="5" fill="hsl(var(--foreground))" rx="2" />
        {/* Skin/subcut */}
        <rect x="30" y="30" width="240" height="10" fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--accent-foreground)/0.15)" strokeWidth="0.5" />
        {/* Erector spinae — posterior */}
        <path d="M30,45 L120,45 L120,95 L30,95 Z" fill="hsl(var(--accent)/0.25)" stroke="hsl(var(--accent-foreground)/0.4)" strokeWidth="1" />
        <text x="75" y="73" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground)/0.6)">Erector Spinae</text>
        {/* Transverse process — 'stem' */}
        <rect x="125" y="70" width="12" height="30" fill="hsl(var(--foreground)/0.35)" stroke="hsl(var(--foreground)/0.6)" strokeWidth="1.5" rx="2" />
        <text x="131" y="60" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground)/0.7)" fontWeight="bold">TP</text>
        {/* QL — posterior leaf */}
        <path d="M140,45 L230,45 L230,90 L140,90 Z" fill="hsl(var(--chart-4)/0.15)" stroke="hsl(var(--chart-4)/0.5)" strokeWidth="1.5" />
        <text x="185" y="70" textAnchor="middle" fontSize="8" fill="hsl(var(--chart-4))" fontWeight="bold">Quadratus</text>
        <text x="185" y="82" textAnchor="middle" fontSize="8" fill="hsl(var(--chart-4))" fontWeight="bold">Lumborum</text>
        {/* Psoas — anterior leaf */}
        <path d="M140,105 L230,105 L230,160 L140,160 Z" fill="hsl(var(--chart-2)/0.15)" stroke="hsl(var(--chart-2)/0.5)" strokeWidth="1" />
        <text x="185" y="135" textAnchor="middle" fontSize="8" fill="hsl(var(--chart-2))">Psoas Major</text>
        {/* Thoracolumbar fascia between QL and ES */}
        <line x1="120" y1="45" x2="120" y2="95" stroke="hsl(var(--primary)/0.5)" strokeWidth="1.5" strokeDasharray="3,2" />
        {/* QL3 target — between QL and psoas */}
        <rect x="140" y="92" width="90" height="10" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" />
        <text x="280" y="100" fontSize="5" fill="hsl(var(--primary))" fontWeight="bold">QL3</text>
        {/* QL1 target — lateral border */}
        <rect x="232" y="55" width="8" height="35" fill="hsl(var(--chart-3)/0.2)" stroke="hsl(var(--chart-3))" strokeWidth="1" strokeDasharray="3,2" />
        <text x="255" y="73" fontSize="5" fill="hsl(var(--chart-3))" fontWeight="bold">QL1</text>
        {/* QL2 target — posterior (between ES and QL) */}
        <rect x="122" y="50" width="15" height="40" fill="hsl(var(--chart-5)/0.15)" stroke="hsl(var(--chart-5))" strokeWidth="1" strokeDasharray="3,2" />
        <text x="110" y="55" fontSize="5" fill="hsl(var(--chart-5))" fontWeight="bold">QL2</text>
        {/* Kidney — anterior danger */}
        <ellipse cx="200" cy="170" rx="25" ry="12" fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive)/0.4)" strokeWidth="1" strokeDasharray="3,2" />
        <text x="200" y="173" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive)/0.6)">Kidney</text>
        {/* Needle — transmuscular (QL3) approach */}
        <line x1="260" y1="35" x2="175" y2="97" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
        <polygon points="177,95 173,101 180,99" fill="hsl(var(--foreground))" />
        <text x="252" y="32" fontSize="7" fill="hsl(var(--foreground))">Needle</text>
        {/* Shamrock label */}
        <text x="131" y="115" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))" fontWeight="bold">☘ Shamrock</text>
        {/* Depth */}
        <text x="15" y="50" fontSize="6" fill="hsl(var(--muted-foreground))">1 cm</text>
        <text x="15" y="85" fontSize="6" fill="hsl(var(--muted-foreground))">3 cm</text>
        <text x="15" y="120" fontSize="6" fill="hsl(var(--muted-foreground))">5 cm</text>
        {/* Legend */}
        <rect x="20" y="187" width="260" height="28" fill="hsl(var(--card))" rx="4" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <rect x="30" y="195" width="6" height="6" fill="hsl(var(--chart-3)/0.2)" stroke="hsl(var(--chart-3))" strokeWidth="0.5" />
        <text x="40" y="201" fontSize="5" fill="hsl(var(--muted-foreground))">QL1 (lateral)</text>
        <rect x="100" y="195" width="6" height="6" fill="hsl(var(--chart-5)/0.15)" stroke="hsl(var(--chart-5))" strokeWidth="0.5" />
        <text x="110" y="201" fontSize="5" fill="hsl(var(--muted-foreground))">QL2 (posterior)</text>
        <rect x="185" y="195" width="6" height="6" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <text x="195" y="201" fontSize="5" fill="hsl(var(--muted-foreground))">QL3 (transmuscular)</text>
        <text x="150" y="212" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">QL3 gives most paravertebral-like spread</text>
      </svg>
    ),
  },
];

const RegionalBlocksDiagram = () => {
  const [selectedBlock, setSelectedBlock] = useState<string>("interscalene");
  const block = blocks.find((b) => b.id === selectedBlock)!;

  return (
    <div className="my-8 space-y-4">
      <h3 className="text-xl font-serif font-bold text-foreground">Ultrasound-Guided Nerve Blocks</h3>
      <p className="text-sm text-muted-foreground">Select a block to view probe position, sonoanatomy, and technique details.</p>

      {/* Block selector */}
      <div className="flex flex-wrap gap-2">
        {blocks.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBlock(b.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              selectedBlock === b.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary/50 text-muted-foreground border-border hover:bg-secondary"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* SVG Diagram */}
      <div className="rounded-lg border border-border overflow-hidden bg-card">
        {block.svgContent}
      </div>

      {/* Details */}
      <div className="grid gap-3">
        {/* Technique */}
        <div className="p-4 rounded-lg border border-border bg-card space-y-2">
          <h4 className="font-semibold text-foreground text-sm">Technique</h4>
          <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <p><strong className="text-foreground">Probe:</strong> {block.probe}</p>
            <p><strong className="text-foreground">Orientation:</strong> {block.orientation}</p>
            <p><strong className="text-foreground">Landmark:</strong> {block.landmark}</p>
            <p><strong className="text-foreground">Depth:</strong> {block.depth}</p>
            <p><strong className="text-foreground">Needle:</strong> {block.needle}</p>
            <p><strong className="text-foreground">LA Volume:</strong> {block.laVolume}</p>
          </div>
          <p className="text-xs text-muted-foreground"><strong className="text-foreground">Target:</strong> {block.target}</p>
        </div>

        {/* Sonoanatomy */}
        <div className="p-4 rounded-lg border border-border bg-primary/5 space-y-2">
          <h4 className="font-semibold text-foreground text-sm">Sonoanatomy</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{block.sonoAnatomy}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {block.structures.map((s, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border">{s}</span>
            ))}
          </div>
        </div>

        {/* Tips & Pitfalls */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-border bg-card">
            <h4 className="font-semibold text-foreground text-xs mb-2">✅ Tips</h4>
            <ul className="space-y-1">
              {block.tips.map((t, i) => (
                <li key={i} className="text-xs text-muted-foreground">• {t}</li>
              ))}
            </ul>
          </div>
          <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
            <h4 className="font-semibold text-destructive text-xs mb-2">⚠️ Pitfalls</h4>
            <ul className="space-y-1">
              {block.pitfalls.map((p, i) => (
                <li key={i} className="text-xs text-muted-foreground">• {p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionalBlocksDiagram;
