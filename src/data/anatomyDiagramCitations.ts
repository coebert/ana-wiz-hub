/** Diagram-level reference figures and papers used to check each anatomy schematic.
 * Gray's Anatomy (1918) figures are public domain on Wikimedia Commons. A citation records
 * the reference used; it is not an anatomical certification. */
export interface DiagramCitation { label: string; detail: string; url: string }

export const anatomyDiagramCitations: Record<string, DiagramCitation[]> = {
  "AbdominalWallDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 392",
      "detail": "External oblique muscle, left",
      "url": "https://commons.wikimedia.org/wiki/File:Gray392.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 395",
      "detail": "Internal oblique muscle, left",
      "url": "https://commons.wikimedia.org/wiki/File:Gray395.png"
    }
  ],
  "AirwayInnervationDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 994",
      "detail": "Sagittal section of nose, mouth, pharynx, and larynx.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray994.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 793",
      "detail": "Course and distribution of the glossopharyngeal, vagus, and accessory nerves.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray793.png"
    }
  ],
  "AntecubitalFossaDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 525",
      "detail": "The brachial artery",
      "url": "https://commons.wikimedia.org/wiki/File:Gray525.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 574",
      "detail": "Superficial veins of the upper limb",
      "url": "https://commons.wikimedia.org/wiki/File:Gray574.png"
    }
  ],
  "AnteriorCardiacPlate": [
    {
      "label": "Gray's Anatomy (1918), Fig. 490",
      "detail": "Sternocostal surface of the heart",
      "url": "https://commons.wikimedia.org/wiki/File:Gray490.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 506",
      "detail": "Coronary arteries",
      "url": "https://commons.wikimedia.org/wiki/File:Gray506.png"
    }
  ],
  "BrachialPlexusDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 807",
      "detail": "Plan of brachial plexus.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray807.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 808",
      "detail": "The right brachial plexus with its short branches, viewed from in front. The sternomastoid and trapezius muscl",
      "url": "https://commons.wikimedia.org/wiki/File:Gray808.png"
    }
  ],
  "BrachialPlexusUltrasoundDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 384",
      "detail": "A cross-section diagram of the human neck at the level of C6 showing the fascia compartments, muscles, organs,",
      "url": "https://commons.wikimedia.org/wiki/File:Gray384.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 808",
      "detail": "The right brachial plexus with its short branches, viewed from in front. The sternomastoid and trapezius muscl",
      "url": "https://commons.wikimedia.org/wiki/File:Gray808.png"
    }
  ],
  "BronchoscopicViewDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 961",
      "detail": "Front view of cartilages of larynx, trachea, and bronchi.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray961.png"
    }
  ],
  "CardiacAnatomyDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 490",
      "detail": "Sternocostal surface of the heart",
      "url": "https://commons.wikimedia.org/wiki/File:Gray490.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 491",
      "detail": "Base and diaphragmatic surface of the heart",
      "url": "https://commons.wikimedia.org/wiki/File:Gray491.png"
    }
  ],
  "CaudalBlockDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 96",
      "detail": "Sacrum, dorsal surface.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray96.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 97",
      "detail": "Lateral surfaces of en:sacrum and en:coccyx.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray97.png"
    }
  ],
  "CaudalSurfaceAnatomyDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 96",
      "detail": "Sacrum, dorsal surface.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray96.png"
    }
  ],
  "CervicalPlexusDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 804",
      "detail": "Plan of the cervical plexus. (Gerrish.)",
      "url": "https://commons.wikimedia.org/wiki/File:Gray804.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 805",
      "detail": "The nerves of the scalp, face, and side of neck.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray805.png"
    }
  ],
  "CircleOfWillisDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 519",
      "detail": "\"Fig. 519. — iagram of the arterial circulation at the base of the brain. A.L. Antero-lateral. A.M. Antero-med",
      "url": "https://commons.wikimedia.org/wiki/File:Gray519.png"
    }
  ],
  "CoronaryTerritoryMapDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 506",
      "detail": "Coronary arteries",
      "url": "https://commons.wikimedia.org/wiki/File:Gray506.png"
    },
    {
      "label": "Cerqueira MD et al. Circulation 2002;105:539–42",
      "detail": "Assignment of the 17 segments to coronary artery territories",
      "url": "https://doi.org/10.1161/hc0402.102975"
    }
  ],
  "CoronaryTreeDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 506",
      "detail": "Coronary arteries",
      "url": "https://commons.wikimedia.org/wiki/File:Gray506.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 490",
      "detail": "Sternocostal surface of the heart",
      "url": "https://commons.wikimedia.org/wiki/File:Gray490.png"
    }
  ],
  "CorticalJuxtamedullaryDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 1128",
      "detail": "Scheme of renal tubule and its vascular supply.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray1128.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 1129",
      "detail": "Distribution of bloodvessels in cortex of kidney.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray1129.png"
    }
  ],
  "CsfFlowDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 720",
      "detail": "Median sagittal section of the brain",
      "url": "https://commons.wikimedia.org/wiki/File:Gray720.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 769",
      "detail": "Diagrammatic representation of a section across the top of the skull, showing the membranes of the brain, etc.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray769.png"
    }
  ],
  "DermatomeMapDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 812",
      "detail": "Diagram of segmental distribution of the cutaneous nerves of the right upper extremity. Anterior view. (\"Lat. ",
      "url": "https://commons.wikimedia.org/wiki/File:Gray812.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 826",
      "detail": "Diagram of segmental distribution of the cutaneous nerves of the right lower extremity. Front view.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray826.png"
    },
    {
      "label": "Lee MWL et al. Clin Anat 2008;21:363–73",
      "detail": "An evidence-based approach to human dermatomes",
      "url": "https://doi.org/10.1002/ca.20636"
    }
  ],
  "DermatomeMyotomeDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 812",
      "detail": "Diagram of segmental distribution of the cutaneous nerves of the right upper extremity. Anterior view. (\"Lat. ",
      "url": "https://commons.wikimedia.org/wiki/File:Gray812.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 826",
      "detail": "Diagram of segmental distribution of the cutaneous nerves of the right lower extremity. Front view.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray826.png"
    },
    {
      "label": "Lee MWL et al. Clin Anat 2008;21:363–73",
      "detail": "An evidence-based approach to human dermatomes",
      "url": "https://doi.org/10.1002/ca.20636"
    }
  ],
  "DiaphragmDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 391",
      "detail": "Zwerchfell von unten aus \"Anatomy of the Human Body\" von Henry Gray.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray391.png"
    }
  ],
  "EpiduralSpaceDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 301",
      "detail": "Median sagittal section of two lumbar vertebræ and their ligaments.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray301.png"
    }
  ],
  "FirstRibDiagram": [
    {
      "label": "Gray's Anatomy (1918) — First rib, superior surface",
      "detail": "Peculiar ribs: first rib (scalene tubercle, subclavian grooves)",
      "url": "https://commons.wikimedia.org/wiki/File:First_rib_Gray.png"
    }
  ],
  "InteractiveDermatomeMap": [
    {
      "label": "Gray's Anatomy (1918), Fig. 812",
      "detail": "Diagram of segmental distribution of the cutaneous nerves of the right upper extremity. Anterior view. (\"Lat. ",
      "url": "https://commons.wikimedia.org/wiki/File:Gray812.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 826",
      "detail": "Diagram of segmental distribution of the cutaneous nerves of the right lower extremity. Front view.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray826.png"
    },
    {
      "label": "Lee MWL et al. Clin Anat 2008;21:363–73",
      "detail": "An evidence-based approach to human dermatomes",
      "url": "https://doi.org/10.1002/ca.20636"
    }
  ],
  "IntercostalAnatomyDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 799",
      "detail": "Scheme showing structure of a typical spinal nerve. 1. Somatic efferent. 2. Somatic afferent. 3,4,5. Sympathet",
      "url": "https://commons.wikimedia.org/wiki/File:Gray799.png"
    }
  ],
  "LaryngealCrossSectionDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 954",
      "detail": "Coronal section of larynx and upper part of trachea.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray954.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 960",
      "detail": "Muscles of larynx, seen from above.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray960.png"
    }
  ],
  "LaryngealNervesDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 793",
      "detail": "Course and distribution of the glossopharyngeal, vagus, and accessory nerves.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray793.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 960",
      "detail": "Muscles of larynx, seen from above.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray960.png"
    }
  ],
  "LaryngoscopeBladesDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 994",
      "detail": "Sagittal section of nose, mouth, pharynx, and larynx.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray994.png"
    },
    {
      "label": "Macintosh RR. Lancet 1943;241:205",
      "detail": "A new laryngoscope",
      "url": "https://doi.org/10.1016/S0140-6736(00)89390-3"
    }
  ],
  "LowerLimbArteriesDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 548",
      "detail": "The femoral artery",
      "url": "https://commons.wikimedia.org/wiki/File:Gray548.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 554",
      "detail": "Arteries of the leg",
      "url": "https://commons.wikimedia.org/wiki/File:Gray554.png"
    }
  ],
  "LowerLimbBranchesDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 548",
      "detail": "The femoral artery",
      "url": "https://commons.wikimedia.org/wiki/File:Gray548.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 832",
      "detail": "Nerves of the right lower extremity Posterior view.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray832.png"
    }
  ],
  "LowerLimbInnervationDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 825",
      "detail": "Cutaneous nerves of right lower extremity. Front view.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray825.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 832",
      "detail": "Nerves of the right lower extremity Posterior view.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray832.png"
    }
  ],
  "LowerLimbVeinsDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 581",
      "detail": "The great saphenous vein and its tributaries",
      "url": "https://commons.wikimedia.org/wiki/File:Gray581.png"
    }
  ],
  "LumbosacralPlexusDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 822",
      "detail": "Plan of lumbar plexus.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray822.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 829",
      "detail": "Dissection of side wall of pelvis showing sacral and pudendal plexuses. (Testut.)",
      "url": "https://commons.wikimedia.org/wiki/File:Gray829.png"
    }
  ],
  "LVBullseyeDiagram": [
    {
      "label": "Cerqueira MD et al. Circulation 2002;105:539–42",
      "detail": "AHA standardized 17-segment myocardial segmentation and nomenclature",
      "url": "https://doi.org/10.1161/hc0402.102975"
    }
  ],
  "NeckCrossSectionDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 384",
      "detail": "A cross-section diagram of the human neck at the level of C6 showing the fascia compartments, muscles, organs,",
      "url": "https://commons.wikimedia.org/wiki/File:Gray384.png"
    }
  ],
  "NeckTrianglesDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 385",
      "detail": "Muscles of the neck. Lateral view",
      "url": "https://commons.wikimedia.org/wiki/File:Gray385.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 805",
      "detail": "The nerves of the scalp, face, and side of neck.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray805.png"
    }
  ],
  "NephronDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 1128",
      "detail": "Scheme of renal tubule and its vascular supply.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray1128.png"
    }
  ],
  "NerveDermatomeOverlayDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 812",
      "detail": "Diagram of segmental distribution of the cutaneous nerves of the right upper extremity. Anterior view. (\"Lat. ",
      "url": "https://commons.wikimedia.org/wiki/File:Gray812.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 825",
      "detail": "Cutaneous nerves of right lower extremity. Front view.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray825.png"
    }
  ],
  "OrbitAnatomyDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 889",
      "detail": "Muscles of the right orbit",
      "url": "https://commons.wikimedia.org/wiki/File:Gray889.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 890",
      "detail": "Blick in die rechte Orbita von vorne nach Entfernen des Bulbus und der vorderen Anteile der anderen Strukturen",
      "url": "https://commons.wikimedia.org/wiki/File:Gray890.png"
    }
  ],
  "OrbitBonyAnatomyDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 190",
      "detail": "The skull from the front.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray190.png"
    }
  ],
  "ParavertebralSpaceDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 799",
      "detail": "Scheme showing structure of a typical spinal nerve. 1. Somatic efferent. 2. Somatic afferent. 3,4,5. Sympathet",
      "url": "https://commons.wikimedia.org/wiki/File:Gray799.png"
    }
  ],
  "SkullBaseDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 193",
      "detail": "Base of the en:skull. Inner or cerebral surface.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray193.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 187",
      "detail": "Base of the Human skull. External surface.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray187.png"
    }
  ],
  "SpinalCordAxialDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 664",
      "detail": "Dibujo semiesquemático de Corte transversal de Médula espinal Torácica (ver lateral column).",
      "url": "https://commons.wikimedia.org/wiki/File:Gray664.png"
    }
  ],
  "SpinalCordCrossSectionDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 664",
      "detail": "Dibujo semiesquemático de Corte transversal de Médula espinal Torácica (ver lateral column).",
      "url": "https://commons.wikimedia.org/wiki/File:Gray664.png"
    }
  ],
  "SpinalCordSagittalDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 666",
      "detail": "Spinal cord sections at different levels",
      "url": "https://commons.wikimedia.org/wiki/File:Gray666.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 301",
      "detail": "Median sagittal section of two lumbar vertebræ and their ligaments.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray301.png"
    }
  ],
  "SpinalCordStimulatorDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 666",
      "detail": "Spinal cord sections at different levels",
      "url": "https://commons.wikimedia.org/wiki/File:Gray666.png"
    },
    {
      "label": "NICE TA159 (2008)",
      "detail": "Spinal cord stimulation for chronic pain of neuropathic or ischaemic origin",
      "url": "https://www.nice.org.uk/guidance/ta159"
    }
  ],
  "TracheobronchialTreeDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 961",
      "detail": "Front view of cartilages of larynx, trachea, and bronchi.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray961.png"
    }
  ],
  "UpperLimbArteriesDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 525",
      "detail": "The brachial artery",
      "url": "https://commons.wikimedia.org/wiki/File:Gray525.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 528",
      "detail": "The radial and ulnar arteries",
      "url": "https://commons.wikimedia.org/wiki/File:Gray528.png"
    }
  ],
  "UpperLimbBranchesDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 807",
      "detail": "Plan of brachial plexus.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray807.png"
    },
    {
      "label": "Gray's Anatomy (1918), Fig. 818",
      "detail": "The suprascapular, axillary, and radial nerves.",
      "url": "https://commons.wikimedia.org/wiki/File:Gray818.png"
    }
  ],
  "UpperLimbVeinsDiagram": [
    {
      "label": "Gray's Anatomy (1918), Fig. 574",
      "detail": "Superficial veins of the upper limb",
      "url": "https://commons.wikimedia.org/wiki/File:Gray574.png"
    }
  ]
};
