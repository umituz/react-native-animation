/**
 * useAppInitialization Hook
 * Manages app initialization state in React components
 */

import { useMemo } from "react";
import type {
  UseAppInitializationOptions,
  UseAppInitializationReturn,
  AppInitializerResult,
} from "./types";
import { useAsyncOperation } from "../utils/hooks";

/**
 * Hook to manage app initialization
 *
 * @example
 * ```typescript
 * const { isReady, isLoading, error } = useAppInitialization(initializeApp, {
 * });
 *
 * if (isLoading) return <SplashScreen />;
 * if (error) return <ErrorScreen error={error} />;
 * return <App />;
 * ```
 */
export function useAppInitialization(
  initializer: () => Promise<AppInitializerResult>,
  options: UseAppInitializationOptions = {}
): UseAppInitializationReturn {
  const { skip = false, onReady, onError } = options;

  const { data, isLoading, error } = useAsyncOperation<AppInitializerResult, Error>(
    async () => {
      const result = await initializer();

      if (!result.success && result.failedModules.length > 0) {
        throw new Error(
          `Initialization failed: ${result.failedModules.join(", ")}`
        );
      }

      return result;
    },
    {
      immediate: !skip,
      skip,
      errorHandler: (err) => err instanceof Error ? err : new Error(String(err)),
      onSuccess: () => onReady?.(),
      onError: (err) => onError?.(err),
    }
  );

  return useMemo(() => ({
    isReady: data?.success ?? false,
    isLoading,
    error,
  }), [data, isLoading, error]);
}
