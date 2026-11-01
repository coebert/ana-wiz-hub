import { describe, expect, it } from 'vitest';
import { createNativeConfig } from '../../scripts/native-config';

describe('paid iPhone release configuration', () => {
  it('bundles the FRCA/FFICM app without a remote preview server', () => {
    const config = createNativeConfig();
    expect(config.appId).toBe('app.lovable.p639dd1cfba5d4be18c49a0b9a3d29143');
    expect(config.appName).toBe('AnaesthesiaCore');
    expect(config.webDir).toBe('dist/native');
    expect(config.server).toBeUndefined();
  });
  it('only enables guide hot reload when explicitly requested', () => {
    expect(createNativeConfig(true).server?.url).toBe('https://639dd1cf-ba5d-4be1-8c49-a0b9a3d29143.lovableproject.com?forceHideBadge=true');
    expect(createNativeConfig(false).server).toBeUndefined();
  });
});