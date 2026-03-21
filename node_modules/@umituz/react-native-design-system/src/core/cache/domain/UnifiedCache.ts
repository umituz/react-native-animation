/**
 * Unified Cache
 *
 * Generic TTL-based cache with pluggable cleanup strategy.
 * Merges functionality from SimpleCache and TTLCache.
 *
 * @example
 * ```ts
 * // With interval cleanup (like TTLCache)
 * const cache = new UnifiedCache<string>({
 *   defaultTTL: 60000,
 *   cleanupStrategy: new IntervalCleanupStrategy(60000)
 * });
 *
 * // With timeout cleanup (like SimpleCache)
 * const cache = new UnifiedCache<string>({
 *   defaultTTL: 60000,
 *   cleanupStrategy: new TimeoutCleanupStrategy(60000)
 * });
 * ```
 */

import type { CacheEntry, CacheConfig } from './types';
import { CleanupStrategy, IntervalCleanupStrategy } from './CleanupStrategy';

export interface UnifiedCacheConfig extends CacheConfig {
  cleanupStrategy?: CleanupStrategy;
  onExpired?: (key: string, count: number) => void;
}

/**
 * Unified generic cache with TTL support and pluggable cleanup
 */
export class UnifiedCache<T = unknown> {
  protected cache = new Map<string, CacheEntry<T>>();
  protected defaultTTL: number;
  private cleanupStrategy: CleanupStrategy;
  private isDestroyed = false;
  private onExpiredCallback?: (key: string, count: number) => void;

  constructor(config: UnifiedCacheConfig = {}) {
    this.defaultTTL = config.defaultTTL ?? 60000;
    this.cleanupStrategy = config.cleanupStrategy ?? new IntervalCleanupStrategy(60000);
    this.onExpiredCallback = config.onExpired;

    this.cleanupStrategy.start(() => this.cleanup());
  }

  /**
   * Set value with optional TTL override
   */
  set(key: string, value: T, ttl?: number): void {
    if (this.isDestroyed) {
      this.warnDestroyed('set');
      return;
    }

    const now = Date.now();
    this.cache.set(key, {
      value,
      expires: now + (ttl ?? this.defaultTTL),
      timestamp: now,
    });
  }

  /**
   * Get value, returns undefined if expired or not found
   */
  get(key: string): T | undefined {
    if (this.isDestroyed) {
      this.warnDestroyed('get');
      return undefined;
    }

    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    if (this.isExpired(entry)) {
      this.cache.delete(key);
      return undefined;
    }

    return entry.value;
  }

  /**
   * Check if key exists and is not expired
   */
  has(key: string): boolean {
    if (this.isDestroyed) {
      return false;
    }

    return this.get(key) !== undefined;
  }

  /**
   * Delete specific key
   */
  delete(key: string): boolean {
    if (this.isDestroyed) {
      return false;
    }

    return this.cache.delete(key);
  }

  /**
   * Clear all entries
   */
  clear(): void {
    if (this.isDestroyed) {
      return;
    }

    this.cache.clear();
  }

  /**
   * Get all non-expired keys
   */
  keys(): string[] {
    if (this.isDestroyed) {
      return [];
    }

    return Array.from(this.cache.keys()).filter((key) => {
      const entry = this.cache.get(key);
      return entry && !this.isExpired(entry);
    });
  }

  /**
   * Get cache size (excluding expired entries)
   */
  size(): number {
    return this.keys().length;
  }

  /**
   * Destroy cache and stop cleanup
   */
  destroy(): void {
    if (this.isDestroyed) {
      return;
    }

    this.isDestroyed = true;
    this.cleanupStrategy.stop();
    this.cache.clear();
  }

  /**
   * Cleanup expired entries
   */
  protected cleanup(): void {
    if (this.isDestroyed) {
      return;
    }

    const now = Date.now();
    let cleanedCount = 0;

    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expires) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0 && this.onExpiredCallback) {
      this.onExpiredCallback('cleanup', cleanedCount);
    }
  }

  /**
   * Check if entry is expired
   */
  private isExpired(entry: CacheEntry<T>): boolean {
    return Date.now() > entry.expires;
  }

  /**
   * Warn about operation on destroyed cache
   */
  private warnDestroyed(operation: string): void {
    if (__DEV__) {
      console.warn(
        `[UnifiedCache] Cannot perform "${operation}" on destroyed cache`
      );
    }
  }
}
