/**
 * Init - App initialization utilities
 *
 * Usage:
 *   import { createAppInitializer, createEnvConfig } from "@umituz/react-native-design-system/init";
 */

export { createAppInitializer } from './createAppInitializer';
export { useAppInitialization } from './useAppInitialization';

// Types
export type {
  InitModule,
  AppInitializerConfig,
  AppInitializerResult,
  UseAppInitializationOptions,
  UseAppInitializationReturn
} from './types';

// Environment
export * from './env';
