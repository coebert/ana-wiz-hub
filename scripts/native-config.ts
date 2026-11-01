import type { CapacitorConfig } from '@capacitor/cli';

/** Preview must be explicitly selected; archives always use bundled assets. */
export function createNativeConfig(preview = false): CapacitorConfig {
  return {
    appId: 'app.lovable.p639dd1cfba5d4be18c49a0b9a3d29143',
    appName: 'AnaesthesiaCore',
    webDir: 'dist/native',
    ios: { preferredContentMode: 'mobile' },
    ...(preview ? {
      server: {
        url: 'https://639dd1cf-ba5d-4be1-8c49-a0b9a3d29143.lovableproject.com?forceHideBadge=true',
        cleartext: true,
      },
    } : {}),
  };
}