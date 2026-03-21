/**
 * usePaginatedQuery Hook
 * Presentation layer - Pagination helper
 */

import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

/**
 * Page parameter for cursor-based pagination
 */
export interface CursorPageParam {
  cursor?: string;
  limit?: number;
}

/**
 * Page parameter for offset-based pagination
 */
export interface OffsetPageParam {
  offset: number;
  limit: number;
}

/**
 * Paginated response with cursor
 */
export interface CursorPaginatedResponse<TData> {
  items: TData[];
  nextCursor?: string;
  hasMore: boolean;
}

/**
 * Paginated response with offset
 */
export interface OffsetPaginatedResponse<TData> {
  items: TData[];
  total: number;
  offset: number;
  limit: number;
}

/**
 * Cursor pagination options
 */
export interface CursorPaginationOptions<TData> {
  queryKey: readonly unknown[];
  queryFn: (context: { pageParam?: string }) => Promise<CursorPaginatedResponse<TData>>;
  limit?: number;
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  refetchOnMount?: boolean | 'always';
  refetchOnWindowFocus?: boolean | 'always';
}

/**
 * Hook for cursor-based infinite scroll
 */
export function useCursorPagination<TData>(options: CursorPaginationOptions<TData>) {
  const { queryKey, queryFn, ...restOptions } = options;

  const result = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }: { pageParam: string | undefined }) => queryFn({ pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: CursorPaginatedResponse<TData>) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    ...restOptions,
  });

  const flatData = useMemo(() => {
    if (!result.data?.pages) return [];
    return result.data.pages.flatMap((page: CursorPaginatedResponse<TData>) => page.items);
  }, [result.data]);

  return {
    ...result,
    flatData,
    totalItems: flatData.length,
  };
}

/**
 * Offset pagination options
 */
export interface OffsetPaginationOptions<TData> {
  queryKey: readonly unknown[];
  queryFn: (context: { pageParam: OffsetPageParam }) => Promise<OffsetPaginatedResponse<TData>>;
  limit?: number;
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
  refetchOnMount?: boolean | 'always';
  refetchOnWindowFocus?: boolean | 'always';
}

/**
 * Hook for offset-based pagination
 */
export function useOffsetPagination<TData>(options: OffsetPaginationOptions<TData>) {
  const { queryKey, queryFn, limit = 20, ...restOptions } = options;

  const result = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }: { pageParam: OffsetPageParam }) => queryFn({ pageParam }),
    initialPageParam: { offset: 0, limit },
    getNextPageParam: (lastPage: OffsetPaginatedResponse<TData>) => {
      const nextOffset = lastPage.offset + lastPage.limit;
      return nextOffset < lastPage.total ? { offset: nextOffset, limit } : undefined;
    },
    ...restOptions,
  });

  const flatData = useMemo(() => {
    if (!result.data?.pages) return [];
    return result.data.pages.flatMap((page: OffsetPaginatedResponse<TData>) => page.items);
  }, [result.data]);

  const total = result.data?.pages?.[result.data.pages.length - 1]?.total ?? 0;

  return {
    ...result,
    flatData,
    totalItems: flatData.length,
    total,
  };
}
