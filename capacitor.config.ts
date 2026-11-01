import { createNativeConfig } from './scripts/native-config';

const config = createNativeConfig(process.env.CAPACITOR_PREVIEW === '1');

export default config;
