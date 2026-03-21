import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { useMemo } from "react";

/**
 * useAppRoute Hook
 *
 * Safe wrapper around React Navigation's useRoute hook.
 * Returns empty route params if called outside NavigationContainer.
 *
 * @example
 * ```typescript
 * const route = useAppRoute();
 * if (route.isReady) {
 *   const params = route.params;
 * }
 * ```
 */
export interface AppRouteResult<T = unknown> {
  key: string;
  name: string;
  params: T | undefined;
  path: string | undefined;
  isReady: boolean;
}

export function useAppRoute<T = unknown>(): AppRouteResult<T> {
  // Always call hooks - no conditional calls
  const route = useRoute<any>();

  // Check if route is ready
  const isReady = Boolean(route);

  return useMemo(
    () => ({
      key: route?.key ?? '',
      name: route?.name ?? '',
      params: route?.params as T | undefined,
      path: route?.path ?? undefined,
      isReady,
    }),
    [route, isReady]
  );
}

export type { RouteProp };
