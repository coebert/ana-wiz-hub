import abdominalWall from "@/assets/atlas/abdominal-wall.jpg";
import calots from "@/assets/atlas/calots-triangle.jpg";
import colon from "@/assets/atlas/colon-blood-supply.jpg";
import pelvis from "@/assets/atlas/pelvis-rectum.jpg";
import oesophagus from "@/assets/atlas/oesophagus-relations.jpg";

const plates = [
  {
    img: abdominalWall,
    title: "Anterior abdominal wall",
    alt: "Anterior abdominal wall showing rectus abdominis, linea alba, the three lateral muscle layers and inferior epigastric vessels",
    landmarks: [
      "Linea alba — avascular midline for laparotomy; umbilicus ≈ T10 dermatome",
      "Rectus sheath — posterior sheath deficient below the arcuate line; target plane for rectus sheath blocks/catheters (T7–T11 terminal branches)",
      "Lateral layers: external oblique, internal oblique, transversus abdominis — TAP block plane lies between internal oblique and transversus",
      "Inferior epigastric vessels run behind rectus — risk with lateral port placement and rectus sheath injection",
    ],
    relevance: "Incision site drives analgesia choice: midline → rectus sheath catheters/epidural; lateral or port sites → TAP or local infiltration.",
  },
  {
    img: calots,
    title: "Hepatocystic (Calot's) triangle",
    alt: "Gallbladder retracted upward exposing the cystic duct, common bile duct and cystic artery",
    landmarks: [
      "Boundaries: cystic duct, common hepatic duct, inferior surface of the liver",
      "Contents: cystic artery (usually from the right hepatic artery), cystic lymph node",
      "Critical view of safety: only two structures (duct and artery) enter the gallbladder before clipping",
      "Variant anatomy (e.g. aberrant right hepatic artery) is common",
    ],
    relevance: "Bile duct injury is the feared complication. Reverse Trendelenburg with left tilt and good muscle relaxation help exposure; vagal bradycardia can occur with peritoneal stretch.",
  },
  {
    img: colon,
    title: "Colon and its arterial supply",
    alt: "Large bowel with branches of the superior and inferior mesenteric arteries and the marginal artery",
    landmarks: [
      "SMA (midgut): ileocolic, right colic, middle colic — caecum to distal two-thirds of transverse colon",
      "IMA (hindgut): left colic, sigmoid, superior rectal — high ligation in anterior/AP resection",
      "Marginal artery links both systems; watershed at the splenic flexure (Griffiths' point)",
      "Ureters and gonadal vessels lie behind the left and right colon — identified in mobilisation",
    ],
    relevance: "Anastomotic perfusion depends on the marginal arcade: avoid hypotension and excessive vasoconstriction; maintain euvolaemia.",
  },
  {
    img: pelvis,
    title: "Pelvis, rectum and mesorectum",
    alt: "Side cross-section of the pelvis showing rectum within mesorectal fat, sacrum with presacral veins, bladder and pelvic floor",
    landmarks: [
      "Mesorectal fascia — the plane for total mesorectal excision (TME)",
      "Presacral venous plexus — source of sudden, hard-to-control haemorrhage",
      "Hypogastric nerves and pelvic plexus on the sidewall — injury causes bladder and sexual dysfunction",
      "Levator ani and anal canal — excised in the perineal phase of abdominoperineal resection",
    ],
    relevance: "Plan for steep Trendelenburg/lithotomy, a possible prone perineal phase, large-bore access and cross-matched blood for presacral bleeding.",
  },
  {
    img: oesophagus,
    title: "Oesophagus and its relations",
    alt: "Oesophagus behind the trachea descending past the aortic arch through the diaphragmatic hiatus to the stomach",
    landmarks: [
      "Cervical: behind trachea; recurrent laryngeal nerves in the tracheo-oesophageal grooves (left loops under the aortic arch)",
      "Thoracic: azygos vein arches over the right main bronchus — divided in the right thoracic (Ivor Lewis) approach",
      "Hiatus at ≈T10; gastro-oesophageal junction below",
      "Conduit blood supply: right gastroepiploic arcade along the greater curvature",
    ],
    relevance: "Right thoracotomy needs left one-lung ventilation; recurrent laryngeal nerve injury raises aspiration risk; conduit perfusion depends on avoiding hypotension.",
  },
];

export const GeneralSurgeryAtlas = () => (
  <section id="anatomy-atlas" className="scroll-mt-24 mb-10">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Atlas of Surgical Anatomy &amp; Key Landmarks</h2>
    <p className="text-sm text-muted-foreground mb-4">
      Illustrations are simplified teaching images and not anatomically exact; use the landmark lists, and a standard anatomy atlas, for detail.
    </p>
    <div className="grid gap-6 md:grid-cols-2">
      {plates.map((p) => (
        <figure key={p.title} className="rounded-lg border border-border bg-card overflow-hidden">
          <img src={p.img} alt={p.alt} loading="lazy" width={1024} height={1024} className="w-full aspect-square object-cover bg-background" />
          <figcaption className="p-4 space-y-2">
            <p className="font-semibold text-foreground">{p.title}</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {p.landmarks.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <p className="text-sm text-foreground"><strong>Anaesthetic relevance:</strong> {p.relevance}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
);
