import { imported } from './imported';
export const pool = { 'single-key': [...imported, { label: 'Merged', citation: 'Merged source' }], "double-key": imported.slice() };
pool['single-key'].push({ label: 'Appended', citation: 'Runtime append' });
