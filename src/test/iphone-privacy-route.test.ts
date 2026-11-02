import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { iphonePrivacyPage } from '../../scripts/iphone-privacy-page';

describe('standalone iPhone privacy delivery', () => {
  it('emits the exact extensionless public route, not the app entry', () => {
    const plugin = iphonePrivacyPage();
    const emitted: Array<{ fileName: string; source: string }> = [];
    const hook = plugin.generateBundle;
    if (typeof hook !== 'function') throw new Error('Missing output hook');
    hook.call({ emitFile: (asset: { fileName: string; source: string }) => emitted.push(asset) } as never, {} as never, {}, false);
    expect(emitted.map(asset => asset.fileName)).toEqual(['iphone/privacy/index.html']);
    expect(emitted[0]?.source).toBe(readFileSync('public/iphone/privacy.html', 'utf8'));
  });
  it('serves GET and HEAD without auth and leaves unrelated requests alone', () => {
    const plugin = iphonePrivacyPage();
    let handler: ((request: { url: string; method: string }, response: { setHeader: (key: string, value: string) => void; end: (body?: string) => void }, next: () => void) => void) | undefined;
    const hook = plugin.configureServer;
    if (typeof hook !== 'function') throw new Error('Missing server hook');
    hook({ middlewares: { use: (middleware: typeof handler) => { handler = middleware; } } } as never);
    if (!handler) throw new Error('No middleware registered');
    const headers: Record<string, string> = {};
    let body: string | undefined;
    let passed = false;
    const response = { setHeader: (key: string, value: string) => { headers[key] = value; }, end: (value?: string) => { body = value; } };
    handler({ url: '/iphone/privacy?review=1', method: 'GET' }, response, () => { passed = true; });
    expect(passed).toBe(false);
    expect(headers['Content-Type']).toBe('text/html; charset=utf-8');
    expect(body).toBe(readFileSync('public/iphone/privacy.html', 'utf8'));
    handler({ url: '/iphone/privacy', method: 'HEAD' }, response, () => { passed = true; });
    expect(body).toBeUndefined();
    handler({ url: '/revise', method: 'GET' }, response, () => { passed = true; });
    expect(passed).toBe(true);
  });
});