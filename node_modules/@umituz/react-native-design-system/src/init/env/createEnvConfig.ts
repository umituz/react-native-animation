/**
 * Environment Configuration Factory
 * Creates type-safe environment accessors
 */

import { Platform } from "react-native";
import Constants from "expo-constants";
import type {
  EnvConfig,
  EnvAccessor,
  EnvSourceConfig,
  FirebaseEnvConfig,
} from "./types";


/**
 * Default key mappings for environment variables
 */
const DEFAULT_KEY_MAPPINGS: Record<string, string> = {
  // RevenueCat
  EXPO_PUBLIC_REVENUECAT_PROD_API_KEY_IOS: "revenueCatApiKeyIos",
  EXPO_PUBLIC_REVENUECAT_PROD_API_KEY_ANDROID: "revenueCatApiKeyAndroid",
  EXPO_PUBLIC_REVENUECAT_IOS_KEY: "revenueCatApiKeyIos",
  EXPO_PUBLIC_REVENUECAT_ANDROID_KEY: "revenueCatApiKeyAndroid",
  // FAL AI
  EXPO_PUBLIC_FAL_AI_API_KEY: "falApiKey",
  EXPO_PUBLIC_FAL_AI_BASE_URL: "falBaseUrl",
  // Firebase
  EXPO_PUBLIC_FIREBASE_API_KEY: "firebaseApiKey",
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: "firebaseAuthDomain",
  EXPO_PUBLIC_FIREBASE_PROJECT_ID: "firebaseProjectId",
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: "firebaseStorageBucket",
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "firebaseMessagingSenderId",
  EXPO_PUBLIC_FIREBASE_APP_ID: "firebaseAppId",
  // OpenAI
  EXPO_PUBLIC_OPENAI_API_KEY: "openAIApiKey",
};

/**
 * Get environment value with fallback chain
 */
function getEnvValue(
  key: string,
  sources: EnvSourceConfig,
  keyMappings: Record<string, string>
): string | undefined {
  // 1. Try process.env first
  if (sources.processEnv?.[key]) {
    return sources.processEnv[key];
  }

  // 2. Try mapped extra key
  const mappedKey = keyMappings[key];
  if (mappedKey && sources.expoExtra) {
    const value = sources.expoExtra[mappedKey];
    // Filter out placeholder strings
    if (typeof value === "string" && !value.startsWith("$EXPO_PUBLIC_")) {
      return value;
    }
  }

  return undefined;
}

/**
 * Create environment configuration accessor
 *
 * @example
 * ```typescript
 * import Constants from 'expo-constants';
 *
 * const env = createEnvConfig({
 *   revenueCat: {
 *     testStoreKey: 'test_xxx', // Only used in __DEV__
 *   },
 *   fal: {
 *     baseUrl: 'https://fal.run',
 *   },
 * }, {
 *   expoExtra: Constants.expoConfig?.extra,
 *   processEnv: process.env,
 * });
 *
 * const apiKey = env.getRevenueCatApiKey();
 * ```
 */
export function createEnvConfig(
  config: EnvConfig = {},
  sources: EnvSourceConfig = {}
): EnvAccessor {
  // Default sources
  const resolvedSources: EnvSourceConfig = {
    expoExtra: sources.expoExtra ?? {},
    processEnv: sources.processEnv ?? (process.env as Record<string, string>),
  };

  const get = (key: string): string | undefined => {
    // Check custom config first
    if (config.custom?.[key]) {
      return config.custom[key];
    }
    return getEnvValue(key, resolvedSources, DEFAULT_KEY_MAPPINGS);
  };

  const getRevenueCatApiKey = (): string => {
    // Auto-select test store key in Expo Go (appOwnership === 'expo')
    const isExpoGo = Constants.appOwnership === "expo";
    const testStoreKey = config.revenueCat?.testStoreKey;

    if (isExpoGo && testStoreKey) {
      return testStoreKey;
    }

    // Use platform-specific production key
    const platformKey =
      Platform.OS === "ios"
        ? config.revenueCat?.iosKey ||
          get("EXPO_PUBLIC_REVENUECAT_PROD_API_KEY_IOS") ||
          get("EXPO_PUBLIC_REVENUECAT_IOS_KEY")
        : config.revenueCat?.androidKey ||
          get("EXPO_PUBLIC_REVENUECAT_PROD_API_KEY_ANDROID") ||
          get("EXPO_PUBLIC_REVENUECAT_ANDROID_KEY");

    return platformKey || "";
  };

  const getRevenueCatTestStoreKey = (): string | undefined => {
    // Only return test store key in development
    if (__DEV__) {
      return config.revenueCat?.testStoreKey;
    }
    return undefined;
  };

  const getFalApiKey = (): string => {
    return (
      config.fal?.apiKey || get("EXPO_PUBLIC_FAL_AI_API_KEY") || ""
    );
  };

  const getFalBaseUrl = (): string => {
    return (
      config.fal?.baseUrl ||
      get("EXPO_PUBLIC_FAL_AI_BASE_URL") ||
      "https://fal.run"
    );
  };

  const getFirebaseConfig = (): FirebaseEnvConfig => ({
    apiKey:
      config.firebase?.apiKey || get("EXPO_PUBLIC_FIREBASE_API_KEY") || "",
    authDomain:
      config.firebase?.authDomain ||
      get("EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN") ||
      "",
    projectId:
      config.firebase?.projectId ||
      get("EXPO_PUBLIC_FIREBASE_PROJECT_ID") ||
      "",
    storageBucket:
      config.firebase?.storageBucket ||
      get("EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET") ||
      "",
    messagingSenderId:
      config.firebase?.messagingSenderId ||
      get("EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID") ||
      "",
    appId: config.firebase?.appId || get("EXPO_PUBLIC_FIREBASE_APP_ID") || "",
  });

  return {
    getRevenueCatApiKey,
    getRevenueCatTestStoreKey,
    getFalApiKey,
    getFalBaseUrl,
    getFirebaseConfig,
    get,
  };
}
