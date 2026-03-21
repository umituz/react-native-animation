/**
 * useInfiniteScroll Hook
 *
 * Supports page-based and cursor-based pagination
 */

import { useState, useCallback, useEffect, useRef } from "react";
import type { InfiniteScrollConfig } from "../../domain/types/infinite-scroll-config";
import type { InfiniteScrollState } from "../../domain/types/infinite-scroll-state";
import type { UseInfiniteScrollReturn } from "../../domain/types/infinite-scroll-return";
import {
  loadData,
  loadMoreData,
  isCursorMode,
  createInitialState,
  retryWithBackoff,
} from "./pagination.helper";

const DEFAULT_CONFIG = {
  pageSize: 20,
  threshold: 5,
  autoLoad: true,
  initialPage: 0,
  maxRetries: 3,
  retryDelay: 1000,
};

export function useInfiniteScroll<T>(
  config: InfiniteScrollConfig<T>,
): UseInfiniteScrollReturn<T> {
  const {
    pageSize = DEFAULT_CONFIG.pageSize,
    autoLoad = DEFAULT_CONFIG.autoLoad,
    totalItems,
  } = config;

  const initialPage =
    "initialPage" in config ? config.initialPage || 0 : DEFAULT_CONFIG.initialPage;

  const maxRetries = DEFAULT_CONFIG.maxRetries;
  const retryDelay = DEFAULT_CONFIG.retryDelay;

  const [state, setState] = useState<InfiniteScrollState<T>>(() =>
    createInitialState<T>(initialPage, totalItems),
  );

  const isLoadingRef = useRef(false);
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const stateRef = useRef(state);

  // Keep stateRef in sync with state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  const cancelPendingRequests = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
  }, []);

  const loadMore = useCallback(async () => {
    // Get fresh state from ref to avoid stale closure
    const currentState = stateRef.current;

    if (
      isLoadingRef.current ||
      !currentState.hasMore ||
      currentState.isLoadingMore ||
      currentState.isLoading
    )
      return;

    if (isCursorMode(config) && !currentState.cursor) return;

    isLoadingRef.current = true;
    if (isMountedRef.current) setState((prev) => ({ ...prev, isLoadingMore: true, error: null }));

    try {
      const updates = await retryWithBackoff(
        () => loadMoreData(config, currentState, pageSize),
        maxRetries,
        retryDelay,
      );

      if (isMountedRef.current) {
        setState((prev) => ({ ...prev, ...updates }));
      }
    } catch (error) {
      if (isMountedRef.current) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load more items";
        setState((prev) => ({ ...prev, isLoadingMore: false, error: errorMessage }));
      }
    } finally {
      isLoadingRef.current = false;
    }
  }, [config, pageSize, maxRetries, retryDelay]);

  const refresh = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    cancelPendingRequests();

    if (isMountedRef.current) setState((prev) => ({ ...prev, isRefreshing: true, error: null }));

    try {
      const newState = await retryWithBackoff(
        () => loadData(config, initialPage, pageSize, totalItems),
        maxRetries,
        retryDelay,
      );

      if (isMountedRef.current) {
        setState(newState);
      }
    } catch (error) {
      if (isMountedRef.current) {
        const errorMessage = error instanceof Error ? error.message : "Failed to refresh data";
        setState((prev) => ({ ...prev, isRefreshing: false, error: errorMessage }));
      }
    } finally {
      isLoadingRef.current = false;
    }
  }, [config, initialPage, pageSize, totalItems, maxRetries, retryDelay, cancelPendingRequests]);

  const reset = useCallback(() => {
    isLoadingRef.current = false;
    cancelPendingRequests();
    setState(createInitialState<T>(initialPage, totalItems));
  }, [initialPage, totalItems, cancelPendingRequests]);

  useEffect(() => {
    if (autoLoad) {
      const initialize = async () => {
        if (isLoadingRef.current) return;

        isLoadingRef.current = true;
        cancelPendingRequests();

        if (isMountedRef.current) setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
          const newState = await retryWithBackoff(
            () => loadData(config, initialPage, pageSize, totalItems),
            maxRetries,
            retryDelay,
          );

          if (isMountedRef.current) {
            setState(newState);
          }
        } catch (error) {
          if (isMountedRef.current) {
            const errorMessage = error instanceof Error ? error.message : "Failed to load data";
            setState((prev) => ({ ...prev, isLoading: false, error: errorMessage }));
          }
        } finally {
          isLoadingRef.current = false;
        }
      };
      initialize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLoad]);

  const canLoadMore = state.hasMore && !state.isLoadingMore && !state.isLoading;

  return { items: state.items, state, loadMore, refresh, reset, canLoadMore };
}

