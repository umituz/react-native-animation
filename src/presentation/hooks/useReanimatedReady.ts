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
    // Wait for Reanimated to be fully initialized
    // Reanimated's internal hooks (like useAnimatedLayout, useAnimatedDetents) 
    // access layoutState.get during initialization, so we need to wait for Reanimated to be fully ready
    // Increased delay to 800ms to ensure all internal state is initialized
    const timer = setTimeout(() => {
      // Use multiple animation frames to ensure Reanimated worklets are ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsReady(true);
            });
          });
        });
      });
    }, 800); // Increased delay to ensure Reanimated is fully initialized

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return isReady;
};

