/**
 * Environment Configuration Types
 */

/**
 * Environment source configuration
 */
export interface EnvSourceConfig {
  /** Expo Constants extra config */
  expoExtra?: Record<string, unknown>;
  /** Process env (for EXPO_PUBLIC_ vars) */
  processEnv?: Record<string, string | undefined>;
}

/**
 * Key mapping from EXPO_PUBLIC_ to extra key
 */
export interface EnvKeyMapping {
  /** Environment variable name (e.g., 'EXPO_PUBLIC_FAL_API_KEY') */
  envKey: string;
  /** Extra config key (e.g., 'falApiKey') */
  extraKey: string;
}

/**
 * RevenueCat configuration
 */
export interface RevenueCatEnvConfig {
  /** iOS API key */
  iosKey?: string;
  /** Android API key */
  androidKey?: string;
  /** Test store key (for development) */
  testStoreKey?: string;
}

/**
 * FAL AI configuration
 */
export interface FalEnvConfig {
  /** API key */
  apiKey?: string;
  /** Base URL (default: https://fal.run) */
  baseUrl?: string;
}

/**
 * Firebase configuration
 */
export interface FirebaseEnvConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

/**
 * Full environment configuration
 */
export interface EnvConfig {
  revenueCat?: RevenueCatEnvConfig;
  fal?: FalEnvConfig;
  firebase?: FirebaseEnvConfig;
  /** Custom keys */
  custom?: Record<string, string | undefined>;
}

/**
 * Created environment accessor
 */
export interface EnvAccessor {
  /** Get RevenueCat API key (platform-specific) */
  getRevenueCatApiKey: () => string;
  /** Get RevenueCat test store key (dev only) */
  getRevenueCatTestStoreKey: () => string | undefined;
  /** Get FAL API key */
  getFalApiKey: () => string;
  /** Get FAL base URL */
  getFalBaseUrl: () => string;
  /** Get Firebase config */
  getFirebaseConfig: () => FirebaseEnvConfig;
  /** Get custom env value */
  get: (key: string) => string | undefined;
}
