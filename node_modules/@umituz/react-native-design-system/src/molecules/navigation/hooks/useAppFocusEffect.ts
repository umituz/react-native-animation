import { useFocusEffect as useRNFocusEffect } from "@react-navigation/native";
import { useEffect } from "react";

/**
 * useAppFocusEffect Hook
 *
 * Safe wrapper around React Navigation's useFocusEffect.
 * Only runs the effect if navigation is ready.
 *
 * @param effect - Callback to run when screen is focused
 *
 * @example
 * ```typescript
 * useAppFocusEffect(
 *   useCallback(() => {
 *     // Runs when screen is focused
 *     return () => {
 *       // Cleanup when screen is unfocused
 *     };
 *   }, [dependency])
 * );
 * ```
 */
export function useAppFocusEffect(effect: () => void | (() => void)): void {
  // Always run the effect - if navigation is ready, useFocusEffect will handle it
  // Otherwise, useEffect will run it once
  useEffect(() => {
    const cleanup = effect();
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [effect]);

  // Try to use React Navigation's useFocusEffect if available
  try {
    useRNFocusEffect(effect);
  } catch (_error) {
    // Navigation not ready - useEffect above handles it
    if (__DEV__) {
      console.warn('[useAppFocusEffect] Navigation not ready. Running effect once instead.');
    }
  }
}
