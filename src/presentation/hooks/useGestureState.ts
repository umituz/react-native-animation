/**
 * useGestureState Hook
 *
 * Hook for managing gesture state (shared values, reset).
 * Single Responsibility: Manage gesture state only.
 */

import { useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

/**
 * Hook for managing gesture state
 */
export const useGestureState = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const savedScale = useSharedValue(1);

  const reset = useCallback(() => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
    savedScale.value = 1;
  }, [translateX, translateY, scale, savedTranslateX, savedTranslateY, savedScale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return {
    translateX,
    translateY,
    scale,
    savedTranslateX,
    savedTranslateY,
    savedScale,
    reset,
    animatedStyle,
  };
};

