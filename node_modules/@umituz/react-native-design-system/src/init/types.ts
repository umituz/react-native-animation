/**
 * App Initialization Types
 */

/**
 * Single initialization module
 */
export interface InitModule {
  /** Module name for logging */
  name: string;
  /** Initialize function - returns success status */
  init: () => Promise<boolean> | boolean;
  /** Optional: Whether this module is critical (default: false) */
  critical?: boolean;
  /** Optional: Dependencies - other module names that must run first */
  dependsOn?: string[];
}

/**
 * App initializer configuration
 */
export interface AppInitializerConfig {
  /** Initialization modules to run */
  modules: InitModule[];
  /** Enable debug logging (default: __DEV__) */
  debug?: boolean;
  /** Continue on non-critical module failure (default: true) */
  continueOnError?: boolean;
  /** Callback when all modules complete */
  onComplete?: () => void;
  /** Callback on error */
  onError?: (moduleName: string, error: unknown) => void;
}

/**
 * App initializer result
 */
export interface AppInitializerResult {
  success: boolean;
  failedModules: string[];
  duration: number;
}

/**
 * useAppInitialization hook options
 */
export interface UseAppInitializationOptions {
  /** Skip initialization (useful for testing) */
  skip?: boolean;
  /** Callback when initialization completes */
  onReady?: () => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

/**
 * useAppInitialization hook return type
 */
export interface UseAppInitializationReturn {
  isReady: boolean;
  isLoading: boolean;
  error: Error | null;
}
