/**
 * useTransformAnimation Hook
 *
 * Hook for transform-based animations (spin, pulse, shake).
 * Single Responsibility: Handle transform animations only.
 */

import { useCallback } from 'react';
import {
  useSharedValue,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

/**
 * Hook for transform-based animations
 */
export const useTransformAnimation = () => {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const shake = useCallback(() => {
    translateX.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(withTiming(10, { duration: 50 }), 4, true),
      withTiming(0, { duration: 50 })
    );
  }, [translateX]);

  const pulse = useCallback((repeatCount = -1) => {
    scale.value = withRepeat(
      withSequence(withTiming(1.1, { duration: 500 }), withTiming(1, { duration: 500 })),
      repeatCount,
      false
    );
  }, [scale]);

  const spin = useCallback((repeatCount = -1) => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      repeatCount,
      false
    );
  }, [rotate]);

  return {
    shake,
    pulse,
    spin,
    translateX,
    scale,
    rotate,
  };
};

