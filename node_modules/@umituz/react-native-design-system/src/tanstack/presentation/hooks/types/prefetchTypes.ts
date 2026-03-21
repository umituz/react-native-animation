/**
 * Prefetch Hook Types
 * Type definitions for prefetch hooks
 */

import type { QueryFunction, QueryKey } from '@tanstack/react-query';

export interface PrefetchOptions {
  /**
   * Time in ms that the prefetched data should stay fresh
   */
  staleTime?: number;

  /**
   * Time in ms that unused data stays in cache
   */
  gcTime?: number;
}

export interface PrefetchQuery<TData = unknown, TVariables = string | number> {
  queryKey: QueryKey;
  queryFn: (variables: TVariables) => Promise<TData>;
  staleTime?: number;
  gcTime?: number;
}

export interface PrefetchInfiniteQuery<TData = unknown, TPageParam = unknown> {
  queryKey: QueryKey;
  queryFn: QueryFunction<TData, QueryKey, TPageParam>;
  initialPageParam: TPageParam;
  staleTime?: number;
  gcTime?: number;
}
