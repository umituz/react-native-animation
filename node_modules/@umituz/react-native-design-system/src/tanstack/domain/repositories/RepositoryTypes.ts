/**
 * Repository Types
 * Interfaces for data repository operations
 */

import type { CacheConfig } from '../types/CacheStrategy';

export interface CreateParams<TVariables> {
  variables: TVariables;
}

export interface UpdateParams<TVariables> {
  id: string | number;
  variables: TVariables;
}

export interface ListParams {
  page?: number;
  limit?: number;
  filter?: Record<string, unknown>;
}

export interface RepositoryOptions {
  /**
   * Cache strategy for queries
   * @default CacheStrategies.PUBLIC_DATA
   */
  cacheStrategy?: CacheConfig;

  /**
   * Stale time override
   */
  staleTime?: number;

  /**
   * GC time override
   */
  gcTime?: number;
}
