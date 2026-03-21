/**
 * Persister Configuration
 * Infrastructure layer - AsyncStorage persistence setup
 *
 * General-purpose persistence configuration for any React Native app
 * Lazy loads TanStack persistence packages to reduce bundle size
 */

import { storageService } from '../../../storage';


/**
 * Persister factory options
 */
export interface PersisterFactoryOptions {
  /**
   * Storage key prefix
   * @default 'tanstack-query'
   */
  keyPrefix?: string;

  /**
   * Maximum age of cached data in milliseconds
   * Data older than this will be discarded on restore
   * @default 24 hours
   */
  maxAge?: number;

  /**
   * Cache version for invalidation
   * Increment this to invalidate all existing caches
   * @default 1
   */
  busterVersion?: string;

  /**
   * Throttle time for persistence writes (in ms)
   * Prevents excessive writes to AsyncStorage
   * @default 1000
   */
  throttleTime?: number;
}

/**
 * Clear all persisted cache data
 * Useful for logout or cache reset scenarios
 *
 * @example
 * ```typescript
 * await clearPersistedCache('myapp');
 * ```
 */
export async function clearPersistedCache(keyPrefix: string = 'tanstack-query'): Promise<void> {
  try {
    await storageService.removeItem(`${keyPrefix}-cache`);
    if (__DEV__) {
      console.log(`[TanStack Query] Cleared persisted cache for keyPrefix: ${keyPrefix}`);
    }
  } catch (error) {
    if (__DEV__) {
      console.error('[TanStack Query] Error clearing persisted cache:', error);
    }
  }
}

/**
 * Get persisted cache size (in bytes)
 * Useful for monitoring storage usage
 *
 * @example
 * ```typescript
 * const size = await getPersistedCacheSize('myapp');
 * ```
 */
export async function getPersistedCacheSize(
  keyPrefix: string = 'tanstack-query',
): Promise<number> {
  try {
    const data = await storageService.getItem(`${keyPrefix}-cache`);
    return data ? new Blob([data]).size : 0;
  } catch (error) {
    if (__DEV__) {
      console.error('[TanStack Query] Error getting persisted cache size:', error);
    }
    return 0;
  }
}
