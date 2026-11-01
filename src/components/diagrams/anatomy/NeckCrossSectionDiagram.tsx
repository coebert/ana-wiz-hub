/** Text-only anatomy: malformed axial vertebral/fascial geometry withdrawn pending reviewed replacement. */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InlineRef } from "@/components/references/InlineRef";
import { NECK_SPATIAL, NECK_FASCIA_CONVENTION } from "@/components/topic/AnatomySpatialTeaching";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Structure = {
  id: string;
  label: string;
  desc: string;
  color: string;
  paths: string[];
};

const structures: Structure[] = [
  {
    id: "skin",
    label: "Skin & Platysma",
    desc: "Superficial layer. Platysma — thin sheet muscle in superficial fascia, supplied by facial nerve (VII). Covers anterior and lateral neck.",
    color: "#e8c9a0",
    paths: [],
  },
  {
    id: "scf",
    label: "Superficial Cervical Fascia",
    desc: "Loose areolar tissue deep to platysma. Contains cutaneous nerves, superficial veins (EJV, anterior jugular), and lymph nodes.",
    color: "#f5deb3",
    paths: [],
  },
  {
    id: "investing",
    label: "Investing (Superficial) Layer of DCF",
    desc: "Encircles entire neck. Splits to enclose SCM and trapezius. Attaches to mandible, mastoid, hyoid, spine of scapula, clavicle. Forms roof of posterior triangle.",
    color: "#a8d5ba",
    paths: [],
  },
  {
    id: "pretracheal",
    label: "Pretracheal (Middle) Layer",
    desc: "Muscular layer: encloses infrahyoid strap muscles. Visceral layer: encloses thyroid, trachea, oesophagus, recurrent laryngeal nerve. Blends with pericardium inferiorly — spread of neck infections to mediastinum.",
    color: "#93c5fd",
    paths: [],
  },
  {
    id: "prevertebral",
    label: "Prevertebral (Deep) Layer",
    desc: "Covers prevertebral muscles (longus colli/capitis) and vertebral column. Forms floor of posterior triangle. Alar fascia anteriorly creates 'danger space' — connects to posterior mediastinum.",
    color: "#c4b5fd",
    paths: [],
  },
  { id: "alar", label: "Alar Fascia & Danger Space", desc: NECK_FASCIA_CONVENTION, color: "hsl(var(--anatomy))", paths: [] },
  {
    id: "carotid",
    label: "Carotid Sheath",
    desc: "Condensation of all three DCF layers. Contains: CCA (medial), IJV (lateral), vagus nerve (posterior, between vessels). Also contains deep cervical lymph nodes and ansa cervicalis root. IJV sits lateral and slightly anterior to CCA at C6.",
    color: "#fca5a5",
    paths: [],
  },
  {
    id: "trachea",
    label: "Trachea & Oesophagus",
    desc: "Trachea anterior, oesophagus posterior (slightly left). C6 = cricoid cartilage level. Recurrent laryngeal nerve in tracheo-oesophageal groove. Isthmus of thyroid overlies tracheal rings 2–4.",
    color: "#fcd34d",
    paths: [],
  },
  {
    id: "thyroid",
    label: "Thyroid Gland",
    desc: "Lateral lobes flank trachea, connected by isthmus. Enclosed by pretracheal fascia. Blood supply: superior (ECA) and inferior (thyrocervical trunk) thyroid arteries. Intimate relation to RLN.",
    color: "#f9a8d4",
    paths: [],
  },
  {
    id: "vertebral",
    label: "Vertebral Body & Muscles",
    desc: "Cord lies within the canal posterior to the body; the spinous process attaches to the posterior arch. C6 vertebral body with carotid tubercle (Chassaignac's) — landmark for stellate ganglion block, vertebral artery entry into transverse foramen. Longus colli muscles anterolateral to body.",
    color: "#d4d4d8",
    paths: [],
  },
  {
    id: "scm",
    label: "Sternocleidomastoid",
    desc: "Key landmark muscle. Enclosed by investing layer. Divides neck into anterior and posterior triangles. Motor: accessory nerve (XI). Sensory: C2,3. Surface marking for IJV access.",
    color: "#f87171",
    paths: [],
  },
];

const NeckCrossSectionDiagram = () => {
  const [selected, setSelected] = useState<string | null>("vertebral");

  const info = selected ? structures.find((s) => s.id === selected) : null;

  return (
    <DiagramFigure
      id="neck-cross-section-diagram"
      title="Neck cross section"
      description="Neck cross section: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
                  <div className="my-6">
        <DiagramToggleBar
          title="Neck at C6 — Spatial Relationships"
          subtitle="Tap a structure to explore its contents and clinical relevance."
          toggles={[]}
        />
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 min-w-0 border-l-4 border-anatomy pl-4">
            <p className="text-sm font-semibold text-foreground">Spatial relationships — C6 cross-section withdrawn</p>
            <p className="text-sm text-muted-foreground mt-2">{NECK_SPATIAL}</p>
            <p className="text-sm text-muted-foreground mt-2">{NECK_FASCIA_CONVENTION}</p>
            <InlineRef topicId="head-neck-anatomy" refLabel="Michigan vertebral anatomy" /><InlineRef topicId="head-neck-anatomy" refLabel="UAMS neck fascia" /><InlineRef topicId="head-neck-anatomy" refLabel="Alar fascia review 2023" />
          </div>
          {/* Legend / selection panel */}
          <div className="flex flex-col gap-1.5 min-w-[180px]">
            {structures.map((s) => (
              <Button variant="outline"
                key={s.id}
                onClick={() => setSelected(selected === s.id ? null : s.id)}
                className={`text-left text-xs px-2.5 py-1.5 rounded border transition-all ${
                  selected === s.id
                    ? "border-primary bg-primary/10 font-semibold text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {s.label}
              </Button>
            ))}
          </div>
        </div>
  
        {info && (
          <div className="mt-4 p-4 rounded-lg border border-primary/30 bg-primary/5">
            <p className="font-semibold text-foreground text-sm">{info.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{info.desc}</p>
          </div>
        )}
      </div>
    </DiagramFigure>
  );
};

export default NeckCrossSectionDiagram;
