---
name: Anatomy diagram orientation rule
description: Standard anatomical convention (viewer faces patient) for every anatomy SVG plate and leader line audit
type: design
---

ALL anatomy SVG plates and diagrams use the **standard anatomical convention**: viewer faces patient, so **patient's RIGHT = viewer's LEFT**.

Apply to every anterior/AP view (cardiac, thoracic, abdominal, airway, neck, brachial plexus, upper/lower limb, neuro):
- Right-sided structures (RA, SVC, RCA, right lung, liver, right kidney, right brachial plexus, right femoral, right hemisphere etc.) drawn on the **viewer's LEFT half** of the SVG.
- Left-sided structures (LV, aortic arch curving down to descending aorta, LAD, LCx, spleen, left kidney) drawn on the **viewer's RIGHT half**.
- Posterior views (spinal posterior, dermatome posterior, popliteal) follow the convention for that view (posterior = mirror of anterior).
- Lateral / sagittal views: anterior = viewer's left or right depending on side; declare orientation with a header comment in the file.

Every plate file MUST include a top-of-file comment declaring: view (anterior / posterior / sagittal / axial), and which viewer side maps to which patient side.

Every label `target=[x,y]` MUST land on the actual drawn structure path. When drafting a label, annotate the target coordinate in the source with the structure name it points at, so leader accuracy is one-read verifiable.
