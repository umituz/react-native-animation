/**
 * useReanimatedReady Hook
 *
 * React hook to check if react-native-reanimated is fully initialized and ready.
 * This prevents errors when Reanimated's internal state (like layoutState) is accessed
 * before it's fully ready.
 *
 * Usage:
 * ```tsx
 * const { isReady } = useReanimatedReady();
 *
 * if (!isReady) {
 *   return null; // Don't render Reanimated components until ready
 * }
 *
 * return <Animated.View>...</Animated.View>;
 * ```
 */

import { useState, useEffect } from 'react';

/**
 * Hook to check if Reanimated is ready
 *
 * Returns a boolean indicating if Reanimated is fully initialized.
 * Uses a delay + multiple animation frames to ensure Reanimated worklets are ready.
 *
 * @returns {boolean} True if Reanimated is ready, false otherwise
 */
export const useReanimatedReady = (): boolean => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // CRITICAL: Wait for Reanimated to be fully initialized
    // Reanimated's internal hooks (useAnimatedLayout, useAnimatedDetents, etc.)
    // access containerLayoutState.get during initialization
    // If we don't wait, we get "containerLayoutState.get is not a function" errors
    // 
    // Strategy:
    // 1. Wait 500ms for Reanimated to initialize (minimal delay)
    // 2. Use 3 requestAnimationFrame calls to ensure worklets are ready
    // 3. This ensures @gorhom/bottom-sheet's internal hooks can safely access Reanimated state
    const timer = setTimeout(() => {
      // Use multiple animation frames to ensure Reanimated worklets are ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsReady(true);
          });
        });
      });
    }, 500); // Minimal delay to ensure Reanimated is initialized

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isReady;
};

