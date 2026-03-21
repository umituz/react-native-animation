/**
 * Repository Helper Functions
 * Common helper functions for repository operations
 */

import type { RepositoryOptions } from '../RepositoryTypes';
import { CacheStrategies } from '../../../infrastructure/config/QueryClientConfig';

/**
 * Gets cache options for repository queries
 *
 * @param options - Repository options
 * @returns Cache options with staleTime and gcTime
 */
export function getCacheOptions(
  options: RepositoryOptions
): { staleTime: number; gcTime: number } {
  return {
    staleTime:
      options.staleTime ??
      options.cacheStrategy?.staleTime ??
      CacheStrategies.PUBLIC_DATA.staleTime,
    gcTime:
      options.gcTime ??
      options.cacheStrategy?.gcTime ??
      CacheStrategies.PUBLIC_DATA.gcTime,
  };
}

/**
 * Merges repository options with defaults
 *
 * @param options - User provided options
 * @returns Merged options
 */
export function mergeRepositoryOptions(
  options: RepositoryOptions = {}
): Required<Pick<RepositoryOptions, 'cacheStrategy'>> & RepositoryOptions {
  return {
    cacheStrategy: options.cacheStrategy ?? CacheStrategies.PUBLIC_DATA,
    ...options,
  };
}

/**
 * Checks if a query key matches a resource
 *
 * @param queryKey - Query key to check
 * @param resource - Resource name to match
 * @returns True if query key matches resource
 */
export function matchesResource(
  queryKey: readonly unknown[],
  resource: string
): boolean {
  const key = queryKey[0] as string;
  return key === resource;
}
