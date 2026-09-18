# Export project source as ZIP

## Goal
Provide a downloadable ZIP file of the app’s underlying source code, suitable for opening in another editor.

## Plan
1. Stage a clean source folder under `/tmp` containing the project root files.
2. Exclude Git metadata, dependencies, and generated build output:
   - `.git/`, `.github/` (CI workflows can be excluded unless requested)
   - `node_modules/`, `dist/`, `build/`, `.cache/`, `.vite/`, `coverage/`
   - lock files (`bun.lockb`, `bun.lock`, `package-lock.json`)
   - generated Supabase types and any compiled assets
3. List staged entries recursively (including hidden files) and review for any files that should be removed.
4. Create the ZIP archive in `/tmp`, inspect its entries, then copy the final archive into `/mnt/documents`.
5. Present the file in chat with a `<presentation-artifact>` tag.

## Clarification
- Should `.github/` CI workflows be included, or only the runnable source code?
- Should environment files (`.env`) be included? They typically contain secrets/keys and should be excluded unless you specifically need a template.

## Technical notes
- Project path: `/dev-server` (current working directory).
- Destination: `/mnt/documents/<app-name>-source.zip`.
- The archive will include `src/`, `supabase/`, `public/`, config files, and other source assets needed to run the app, but no build artifacts or installed packages.
