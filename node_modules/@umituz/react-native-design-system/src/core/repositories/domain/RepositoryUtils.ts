/**
 * Repository Utilities
 *
 * Common utilities for repository implementations.
 * Provides caching options and helper functions.
 */

import type { RepositoryOptions, ListParams } from './types';

/**
 * Default cache options
 */
const DEFAULT_CACHE_OPTIONS = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
};

/**
 * Merge repository options with defaults
 *
 * @param options - User provided options
 * @returns Merged options
 */
export function mergeRepositoryOptions(
  options: RepositoryOptions = {}
): Required<RepositoryOptions> {
  return {
    cache: {
      staleTime: options.cache?.staleTime ?? DEFAULT_CACHE_OPTIONS.staleTime,
      gcTime: options.cache?.gcTime ?? DEFAULT_CACHE_OPTIONS.gcTime,
    },
    debug: options.debug ?? __DEV__,
  };
}

/**
 * Get cache options from repository options
 *
 * @param options - Repository options
 * @returns Cache options with defaults
 */
export function getCacheOptions(options: RepositoryOptions): {
  staleTime: number;
  gcTime: number;
} {
  const cache = options.cache ?? {};
  return {
    staleTime: cache.staleTime ?? DEFAULT_CACHE_OPTIONS.staleTime,
    gcTime: cache.gcTime ?? DEFAULT_CACHE_OPTIONS.gcTime,
  };
}

/**
 * Normalize list parameters
 *
 * @param params - List parameters
 * @returns Normalized parameters
 */
export function normalizeListParams(params: ListParams = {}): ListParams {
  return {
    page: params.page ?? 1,
    limit: params.limit ?? 20,
    sort: params.sort ?? 'createdAt',
    filter: params.filter ?? {},
  };
}

/**
 * Create debug logger for repository
 *
 * @param resource - Resource name
 * @param enabled - Enable logging
 * @returns Logger function
 */
export function createRepositoryLogger(
  resource: string,
  enabled: boolean = __DEV__
): (method: string, ...args: unknown[]) => void {
  if (!enabled) {
    return () => {};
  }

  return (method: string, ...args: unknown[]) => {
    console.log(`[Repository:${resource}] ${method}`, ...args);
  };
}
