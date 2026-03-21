/**
 * Cache Factory
 *
 * Factory for creating cache instances with common configurations.
 * Provides convenient methods for different cache types.
 */

import { UnifiedCache } from '../domain/UnifiedCache';
import { IntervalCleanupStrategy, TimeoutCleanupStrategy } from '../domain/CleanupStrategy';
import type { UnifiedCacheConfig } from '../domain/UnifiedCache';

/**
 * Factory for creating cache instances
 */
export class CacheFactory {
  /**
   * Create cache with interval-based cleanup (like TTLCache)
   *
   * @param defaultTTL - Default time-to-live in milliseconds
   * @param cleanupInterval - Cleanup interval in milliseconds
   *
   * @example
   * ```ts
   * const cache = CacheFactory.createIntervalCache(60000, 60000);
   * ```
   */
  static createIntervalCache<T = unknown>(
    defaultTTL: number = 60000,
    cleanupInterval: number = 60000
  ): UnifiedCache<T> {
    return new UnifiedCache<T>({
      defaultTTL,
      cleanupStrategy: new IntervalCleanupStrategy(cleanupInterval),
    });
  }

  /**
   * Create cache with timeout-based cleanup (like SimpleCache)
   *
   * @param defaultTTL - Default time-to-live in milliseconds
   * @param cleanupTimeout - Cleanup timeout in milliseconds
   *
   * @example
   * ```ts
   * const cache = CacheFactory.createTimeoutCache(60000, 60000);
   * ```
   */
  static createTimeoutCache<T = unknown>(
    defaultTTL: number = 60000,
    cleanupTimeout: number = 60000
  ): UnifiedCache<T> {
    return new UnifiedCache<T>({
      defaultTTL,
      cleanupStrategy: new TimeoutCleanupStrategy(cleanupTimeout),
    });
  }

  /**
   * Create cache with custom configuration
   *
   * @example
   * ```ts
   * const cache = CacheFactory.createCustomCache({
   *   defaultTTL: 120000,
   *   cleanupStrategy: new IntervalCleanupStrategy(30000),
   *   onExpired: (key, count) => console.log(`Expired ${count} items`)
   * });
   * ```
   */
  static createCustomCache<T = unknown>(
    config: UnifiedCacheConfig
  ): UnifiedCache<T> {
    return new UnifiedCache<T>(config);
  }

  /**
   * Create cache without automatic cleanup (manual cleanup only)
   *
   * @param defaultTTL - Default time-to-live in milliseconds
   *
   * @example
   * ```ts
   * const cache = CacheFactory.createManualCache(60000);
   * // ... later
   * cache.cleanup(); // Manual cleanup
   * ```
   */
  static createManualCache<T = unknown>(
    defaultTTL: number = 60000
  ): UnifiedCache<T> {
    return new UnifiedCache<T>({
      defaultTTL,
      cleanupStrategy: {
        start: () => {},
        stop: () => {},
        get type(): 'interval' | 'timeout' {
          return 'interval';
        },
      },
    });
  }
}
