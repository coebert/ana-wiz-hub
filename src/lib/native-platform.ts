import { Capacitor } from '@capacitor/core';

export function isNativeApp(): boolean {
  return import.meta.env.MODE === 'native' || Capacitor.isNativePlatform();
}