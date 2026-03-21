/**
 * useGlobalLoading Hook
 * Manual control for global loading state
 */

import { useCallback } from 'react';
import { useLoadingStore } from '../../infrastructure/store/LoadingStore';
import type { LoadingSource } from '../../domain/types/loading.types';

interface UseGlobalLoadingReturn {
  isLoading: boolean;
  message?: string;
  show: (message?: string) => void;
  hide: () => void;
  withLoading: <T>(
    asyncFn: () => Promise<T>,
    message?: string
  ) => Promise<T>;
}

export function useGlobalLoading(): UseGlobalLoadingReturn {
  const { isLoading, message, show, hide } = useLoadingStore();

  const showLoading = useCallback((msg?: string) => {
    show(msg, 'manual' as LoadingSource);
  }, [show]);

  const hideLoading = useCallback(() => {
    hide();
  }, [hide]);

  const withLoading = useCallback(
    async <T>(asyncFn: () => Promise<T>, msg?: string): Promise<T> => {
      showLoading(msg);
      try {
        return await asyncFn();
      } finally {
        hideLoading();
      }
    },
    [showLoading, hideLoading]
  );

  return {
    isLoading,
    message,
    show: showLoading,
    hide: hideLoading,
    withLoading,
  };
}
