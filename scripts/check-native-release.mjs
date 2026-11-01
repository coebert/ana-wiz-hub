import { existsSync, readFileSync } from 'node:fs';

if (process.env.CAPACITOR_PREVIEW === '1') {
  throw new Error('Release sync refuses preview mode. Use native:preview only for development.');
}
if (!existsSync('dist/native/index.html')) {
  throw new Error('No native assets. Run npm run build:native on your local project first.');
}
const html = readFileSync('dist/native/index.html', 'utf8');
if (!html.includes('viewport-fit=cover') || html.includes('registerSW') || existsSync('dist/native/sw.js')) {
  throw new Error('Expected isolated native assets with safe-area viewport and no web service worker.');
}
console.log('Native asset preflight passed; this does not establish App Store readiness.');