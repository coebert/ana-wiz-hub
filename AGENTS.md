- Audit corpus lives in the private `audit-corpus` storage bucket (built to data-build/ by `npm run build:audit-corpus`, then uploaded); the audit-topics function downloads it at runtime — bundling it made the function too large to deploy.
- Diagram snapshot discovery recursively scans diagram folders and topic atlases, including static SVG plates, so moving a file or omitting interaction cannot silently remove it from visual review.
- Anatomy root verification recursively parses TSX object properties; positional heuristics are limited to declared anterior projections because label positions and other views cannot prove anatomical laterality.
- Painted anatomy plates carry optional plate-specific audit warnings beside the artwork so uncorrected printed labels cannot silently appear verified.
- Anatomy source directory is generated from component/atlas metadata before dev/build, with one entry per atlas plate and explicit missing-source flags; citations must never imply anatomical certification.
- Anatomy topic bibliographies reuse editorial topicReferences through anatomyReferences; automation checks record integrity without AI, because a generated verdict cannot establish source support or anatomical accuracy.
- Keep detailed APRV teaching in the shared APRVSection rendered by the mechanical ventilation topic, so its source-linked guidance and learning checks stay together.

- Keep expanded safety-critical teaching in source-linked Teaching components imported relatively by their topics; the audit corpus prioritises those components so detailed guidance is not silently truncated.
- Keep curriculum subsection coverage in curriculum-expansion.md and mark batches checked only after source, rendering and audit-corpus verification, so partial expansion cannot imply whole-topic completion.
