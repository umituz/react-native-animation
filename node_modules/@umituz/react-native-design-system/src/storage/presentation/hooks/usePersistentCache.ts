/**
 * usePersistentCache Hook
 * Presentation layer - Hook for persistent caching with TTL
 *
 * General-purpose cache hook for any app
 */

import { useEffect, useCallback, useMemo, useRef } from 'react';
import { useCacheState } from './useCacheState';
import { CacheStorageOperations } from './CacheStorageOperations';
import { isCacheExpired } from '../../domain/entities/CachedValue';
import { DEFAULT_TTL } from '../../domain/constants/CacheDefaults';

/**
 * Options for persistent cache
 */
export interface PersistentCacheOptions {
  /**
   * Time-to-live in milliseconds
   * @default DEFAULT_TTL.MEDIUM (30 minutes)
   */
  ttl?: number;

  /**
   * Cache version for invalidation
   * Increment to invalidate existing caches
   */
  version?: number;

  /**
   * Whether cache is enabled
   * @default true
   */
  enabled?: boolean;
}

/**
 * Result from usePersistentCache hook
 */
export interface PersistentCacheResult<T> {
  /**
   * Cached data (null if not loaded or expired)
   */
  data: T | null;

  /**
   * Whether data is being loaded from storage
   */
  isLoading: boolean;

  /**
   * Whether cached data is expired
   */
  isExpired: boolean;

  /**
   * Set data to cache
   */
  setData: (value: T) => Promise<void>;

  /**
   * Clear cached data
   */
  clearData: () => Promise<void>;

  /**
   * Refresh cache (reload from storage)
   */
  refresh: () => Promise<void>;
}

/**
 * Hook for persistent caching with TTL support
 *
 * @example
 * ```typescript
 * const { data, setData, isExpired } = usePersistentCache<Post[]>('posts-page-1', {
 *   ttl: TIME_MS.HOUR,
 *   version: 1,
 * });
 *
 * // Check if need to fetch
 * if (!data || isExpired) {
 *   const freshData = await fetchPosts();
 *   await setData(freshData);
 * }
 * ```
 */
export function usePersistentCache<T>(
  key: string,
  options: PersistentCacheOptions = {},
): PersistentCacheResult<T> {
  const { ttl = DEFAULT_TTL.MEDIUM, version, enabled = true } = options;
  const [state, actions] = useCacheState<T>();

  // Use singleton pattern to prevent memory leaks
  const cacheOps = useMemo(() => CacheStorageOperations.getInstance(), []);

  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);

  // Stabilize actions to prevent circular dependency
  const stableActionsRef = useRef(actions);
  stableActionsRef.current = actions;

  const loadFromStorage = useCallback(async () => {
    const currentActions = stableActionsRef.current;

    if (!enabled) {
      if (isMountedRef.current) {
        currentActions.setLoading(false);
      }
      return;
    }

    if (isMountedRef.current) {
      currentActions.setLoading(true);
    }

    try {
      const cached = await cacheOps.loadFromStorage<T>(key);

      if (isMountedRef.current) {
        if (cached) {
          const expired = isCacheExpired(cached, version);
          currentActions.setData(cached.value);
          currentActions.setExpired(expired);
        } else {
          currentActions.clearData();
        }
      }
    } catch {
      if (isMountedRef.current) {
        currentActions.clearData();
      }
    } finally {
      if (isMountedRef.current) {
        currentActions.setLoading(false);
      }
    }
  }, [key, version, enabled, cacheOps]); // Removed actions from dependencies

  const setData = useCallback(
    async (value: T) => {
      // Optimistic update
      const previousData = state.data;
      stableActionsRef.current.setData(value);

      try {
        await cacheOps.saveToStorage(key, value, { ttl, version, enabled });
      } catch (error) {
        // Rollback on error
        if (previousData !== null) {
          stableActionsRef.current.setData(previousData);
        } else {
          stableActionsRef.current.clearData();
        }
        if (__DEV__) {
          console.warn('[usePersistentCache] Failed to save to storage, rolling back:', error);
        }
      }
    },
    [key, ttl, version, enabled, cacheOps, state.data],
  );

  const clearData = useCallback(async () => {
    await cacheOps.clearFromStorage(key, enabled);
    stableActionsRef.current.clearData();
  }, [key, enabled, cacheOps]);

  const refresh = useCallback(async () => {
    await loadFromStorage();
  }, [loadFromStorage]);

  // Load from storage when key, enabled, or version changes
  useEffect(() => {
    isMountedRef.current = true;
    loadFromStorage();

    return () => {
      isMountedRef.current = false;
    };
  }, [loadFromStorage]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    isExpired: state.isExpired,
    setData,
    clearData,
    refresh,
  };
}
