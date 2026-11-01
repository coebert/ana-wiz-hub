# AnaesthesiaCore — native iPhone foundation

The Capacitor 7 iOS source project is created in `ios/`. The native target opens the unified FRCA Primary, Final and FFICM curriculum and reuses current notes, quizzes, diagrams and progress. Web routes and donation settings are preserved. Native home omits the free/donation banner and active-viva promotion; other inherited external support links still need the AS06 policy review before submission.

## Purchase model
**One-time paid App Store download**, set in App Store Connect, not a second in-app purchase. No Stripe/Paddle setup, StoreKit subscription, entitlement database or in-app paywall was added. Apple purchase/pricing is not configured until the owner creates the paid listing; no price is assumed. No lifetime update commitment is implied.

## Local Mac workflow
1. Connect/export this project to your own GitHub repository in Lovable, then get the latest code on your Mac. Install Node 22+, Xcode and CocoaPods.
2. Run `npm install`. Dependencies include Capacitor core/iOS/Android and the CLI as a development dependency. Only iOS is scaffolded.
3. Run `npm run build:native`. This invokes existing source-generation checks then creates bundled assets in `dist/native`; it deliberately avoids the website's SEO postbuild/sitemap submission. Use the native build, not `npm run build` followed by syncing unrelated web/PWA assets.
4. Run `npm run native:sync` (release asset preflight plus `npx cap sync ios`). The iOS project already exists: do **not** run `npx cap add ios` again. For future dependency updates, `npx cap update ios` may also be needed.
5. Run `npm run native:open`, select your Apple Developer Team in Signing & Capabilities, then run on an iPhone simulator/device. `npx cap run ios` is an alternative. The target is iPhone only, bundle version 1 / marketing version 1.0 from the template; choose release versions before uploading.
6. After every app update, get the latest repository code, rebuild with `npm run build:native`, then run `npx cap sync` (or the guarded `npm run native:sync`) before testing again.
7. Only after the release gates are met, archive in Xcode and upload to TestFlight. Set one-time availability/price and Paid Apps Agreement, tax and banking in App Store Connect. No upload or submission was performed here.

## Preview is not a release
`npm run native:preview` explicitly enables the guide's sandbox hot-reload address. Never archive that configuration. Return to bundled release assets by clearing `CAPACITOR_PREVIEW`, running `npm run build:native` and `npm run native:sync`. The release configuration has **no `server.url`**, no cleartext override and no PWA worker. Web stale-chunk/version reload helpers are skipped only for native mode.

## Must finish before App Store submission
- Native sign-in and email/OAuth return flow is **not implemented or verified for a packaged `capacitor://` origin**. Current web sign-in is preserved, not claimed working on iPhone. Requires a separate approved callback/hosted-auth task and controlled account test. Account deletion/privacy disclosures remain AS02/AS03 blockers.
- Keep all Ask/viva generation and clinical holds paused. Do not advertise paused AI as paid functionality. Native microphone/camera/background-audio permissions were not added.
- Commercial artwork/media/excerpt rights, independent clinical review, inherited external support links, Apple SDK privacy requirements and app-specific disclosure remain unresolved release gates in `docs/app-store-readiness-2026-11-01.md`.
- Test safe areas, Dynamic Type, VoiceOver, text zoom, keyboard, native navigation/reloads, loss of internet, source opening, authenticated account isolation and local/cloud resume on real iPhones. Bundled core files do not imply a complete offline product; cloud drugs, CDN artwork, fonts, source pages and signed-in features may require internet.
- Icons reuse the existing project brain mark with an opaque background; source rights are not established by this reuse. Launch artwork is branding only.

## Validation actually performed
Capacitor init/add iOS succeeded; add reported missing native assets, so **no sync, Pods installation, native binary, Xcode compile or signing** was performed in this Linux environment. Manual Vite build/typecheck is restricted by the builder; automatic web validation is separate from native release evidence.

Configuration and retained SCI052 tests: four tests passed initially. Chromium QA used a simulated Capacitor bridge, not an actual iOS WebView, at 390 × 844 and 1280 × 1800: native entry redirected to `/revise`, web home stayed unchanged, no horizontal overflow or uncaught errors; native MRI diagram selection and Ask pause rendered. Latest follow-up test/browser results are recorded in the roadmap. Real iPhone, native asset boot and OAuth remain unverified.

Read the [native development guide](https://lovable.dev/blog/capacitor-mobile-development) alongside these release-specific safeguards.