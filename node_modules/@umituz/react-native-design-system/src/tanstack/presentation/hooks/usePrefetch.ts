/**
 * usePrefetch Hook
 * Presentation layer - Query prefetching utilities
 *
 * General-purpose prefetching for any React Native app
 */

import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import type { QueryKey, QueryFunction } from '@tanstack/react-query';
import type { PrefetchOptions } from './types/prefetchTypes';

export type { PrefetchOptions };

function getPrefetchConfig(options: PrefetchOptions) {
  return {
    staleTime: options.staleTime,
    gcTime: options.gcTime,
  };
}

export function usePrefetchQuery<
  TQueryFnData = unknown,
  TVariables = string | number,
>(
  queryKey: QueryKey,
  queryFn: (variables: TVariables) => Promise<TQueryFnData>,
  options: PrefetchOptions = {},
) {
  const queryClient = useQueryClient();
  const prefetchingRef = useRef(new Set<TVariables>());

  // Cleanup on unmount
  useEffect(() => {
    const currentRef = prefetchingRef.current;
    return () => {
      currentRef.clear();
    };
  }, []);

  return useCallback(
    async (variables: TVariables) => {
      if (prefetchingRef.current.has(variables)) return;

      prefetchingRef.current.add(variables);

      try {
        await queryClient.prefetchQuery({
          queryKey: [...queryKey, variables],
          queryFn: () => queryFn(variables),
          ...getPrefetchConfig(options),
        });
      } finally {
        prefetchingRef.current.delete(variables);
      }
    },
    [queryClient, queryKey, queryFn, options],
  );
}

export function usePrefetchInfiniteQuery<
  TQueryFnData = unknown,
  TPageParam = unknown,
>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TQueryFnData, QueryKey, TPageParam>,
  initialPageParam: TPageParam,
  options: PrefetchOptions = {},
) {
  const queryClient = useQueryClient();
  const hasPrefetchedRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      hasPrefetchedRef.current = false;
    };
  }, []);

  return useCallback(async () => {
    if (hasPrefetchedRef.current) return;

    hasPrefetchedRef.current = true;

    try {
      await queryClient.prefetchInfiniteQuery({
        queryKey,
        queryFn,
        ...getPrefetchConfig(options),
        initialPageParam,
      });
    } catch {
      hasPrefetchedRef.current = false;
    }
  }, [queryClient, queryKey, queryFn, options, initialPageParam]);
}

export function usePrefetchOnMount<TData = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options: PrefetchOptions = {},
) {
  const queryClient = useQueryClient();
  const hasPrefetchedRef = useRef(false);

  useEffect(() => {
    if (hasPrefetchedRef.current) return;

    hasPrefetchedRef.current = true;
    queryClient.prefetchQuery({
      queryKey,
      queryFn,
      ...getPrefetchConfig(options),
    });
  }, [queryClient, queryKey, queryFn, options]);
}

export function usePrefetchMultiple<TData = unknown>() {
  const queryClient = useQueryClient();

  return useCallback(
    async (queries: Array<{
      queryKey: QueryKey;
      queryFn: () => Promise<TData>;
      staleTime?: number;
      gcTime?: number;
    }>) => {
      await Promise.all(
        queries.map(({ queryKey, queryFn, staleTime, gcTime }) =>
          queryClient.prefetchQuery({ queryKey, queryFn, staleTime, gcTime }),
        ),
      );
    },
    [queryClient],
  );
}
