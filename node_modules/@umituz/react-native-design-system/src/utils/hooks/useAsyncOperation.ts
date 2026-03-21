/**
 * useAsyncOperation Hook
 *
 * Eliminates duplicate async error handling patterns across hooks.
 * Handles isMountedRef + try-catch-finally + loading/error state management.
 *
 * Based on the useAsyncData pattern from useDeviceInfo.ts but generalized
 * for broader use cases.
 *
 * @example
 * ```typescript
 * // Simple usage (like useAsyncData)
 * const { data, isLoading, error, execute } = useAsyncOperation(
 *   async () => await fetchData(),
 *   { immediate: true }
 * );
 *
 * // Manual execution (like useMedia)
 * const { execute, isLoading, error } = useAsyncOperation(
 *   async (uri: string) => await pickImage(uri),
 *   { immediate: false }
 * );
 * const result = await execute('file://...');
 *
 * // With custom error handling
 * const { data, error } = useAsyncOperation(
 *   async () => await riskyOperation(),
 *   {
 *     errorHandler: (err) => err instanceof Error ? err.message : 'Failed',
 *     onError: (err) => console.error('Operation failed:', err),
 *   }
 * );
 * ```
 */

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import type {
  AsyncOperationOptions,
  AsyncOperationReturn,
  ErrorHandler,
} from './types/AsyncOperationTypes';

const defaultErrorHandler: ErrorHandler<Error> = (error: unknown): Error => {
  if (error instanceof Error) return error;
  return new Error(String(error));
};

export function useAsyncOperation<T, E = Error>(
  operation: (...args: any[]) => Promise<T>,
  options: AsyncOperationOptions<T, E> = {}
): AsyncOperationReturn<T, E> {
  const {
    skip = false,
    immediate = false,
    initialData = null,
    errorHandler = defaultErrorHandler as ErrorHandler<E>,
    onSuccess,
    onError,
    onFinally,
    enableRetry = false,
    maxRetries = 3,
  } = options;

  // State
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorState] = useState<E | null>(null);
  const [isIdle, setIsIdle] = useState(true);

  // Refs for cleanup and retry
  const isMountedRef = useRef(true);
  const lastArgsRef = useRef<any[]>([]);
  const retryCountRef = useRef(0);

  // Stable callback refs — prevents inline functions from causing execute to be recreated
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const onFinallyRef = useRef(onFinally);
  const operationRef = useRef(operation);
  const errorHandlerRef = useRef(errorHandler);

  // Keep all callback refs in sync with latest values - use useEffect to prevent updates on every render
  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    onFinallyRef.current = onFinally;
    operationRef.current = operation;
    errorHandlerRef.current = errorHandler;
  }, [onSuccess, onError, onFinally, operation, errorHandler]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      if (!isMountedRef.current || skip) return null;

      // Store args for retry
      lastArgsRef.current = args;

      if (isMountedRef.current) {
        setIsLoading(true);
        setErrorState(null);
        setIsIdle(false);
      }

      try {
        const result = await operationRef.current(...args);

        if (isMountedRef.current) {
          setData(result);
          onSuccessRef.current?.(result);
          retryCountRef.current = 0; // Reset retry count on success
        }

        return result;
      } catch (err) {
        const handledError = errorHandlerRef.current(err);

        if (isMountedRef.current) {
          setErrorState(handledError);
          onErrorRef.current?.(handledError);
        }

        return null;
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
          onFinallyRef.current?.();
        }
      }
    },
    [skip]
  );

  const retry = useCallback(async (): Promise<T | null> => {
    if (!enableRetry) {
      if (__DEV__) {
        console.warn('Retry is not enabled for this operation');
      }
      return null;
    }

    if (retryCountRef.current >= maxRetries) {
      if (__DEV__) {
        console.warn(`Max retries (${maxRetries}) reached`);
      }
      return null;
    }

    retryCountRef.current++;
    return execute(...lastArgsRef.current);
  }, [execute, enableRetry, maxRetries]);

  const reset = useCallback(() => {
    if (isMountedRef.current) {
      setData(initialData);
      setErrorState(null);
      setIsLoading(false);
      setIsIdle(true);
      retryCountRef.current = 0;
      lastArgsRef.current = [];
    }
  }, [initialData]);

  const setDataManual = useCallback((newData: T | null) => {
    if (isMountedRef.current) {
      setData(newData);
      setErrorState(null);
      setIsIdle(false);
    }
  }, []);

  const setErrorManual = useCallback((newError: E | null) => {
    if (isMountedRef.current) {
      setErrorState(newError);
      setIsIdle(false);
    }
  }, []);

  // Auto-execute on mount if immediate
  useEffect(() => {
    if (immediate && !skip) {
      execute();
    }
  }, [immediate, skip, execute]);

  // Derived state
  const isSuccess = !isIdle && !isLoading && error === null && data !== null;
  const isError = !isIdle && !isLoading && error !== null;

  return useMemo(
    () => ({
      // State
      data,
      isLoading,
      error,
      isIdle,
      isSuccess,
      isError,

      // Actions
      execute,
      retry,
      reset,
      setData: setDataManual,
      setError: setErrorManual,
    }),
    [
      data,
      isLoading,
      error,
      isIdle,
      isSuccess,
      isError,
      execute,
      retry,
      reset,
      setDataManual,
      setErrorManual,
    ]
  );
}
