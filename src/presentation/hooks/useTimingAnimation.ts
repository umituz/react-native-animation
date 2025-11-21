/**
 * useTimingAnimation Hook
 *
 * Hook for timing-based animations (fade, slide).
 * Single Responsibility: Handle timing animations only.
 */

import { useCallback } from 'react';
import {
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import type { AnimationTimingConfig } from '../../domain/entities/Animation';
import {
  AnimationPreset,
  ANIMATION_CONSTANTS,
} from '../../domain/entities/Animation';
import { AnimationConfigService } from '../../infrastructure/services/AnimationConfigService';

/**
 * Hook for timing-based animations
 */
export const useTimingAnimation = () => {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  const fadeIn = useCallback(
    (config?: AnimationTimingConfig) => {
      const timing = config || AnimationConfigService.getTimingConfig(AnimationPreset.FADE_IN);
      opacity.value = withTiming(1, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.ease,
      });
    },
    [opacity]
  );

  const fadeOut = useCallback(
    (config?: AnimationTimingConfig) => {
      const timing = config || AnimationConfigService.getTimingConfig(AnimationPreset.FADE_OUT);
      opacity.value = withTiming(0, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.ease,
      });
    },
    [opacity]
  );

  const slideInUp = useCallback(
    (distance = 100, config?: AnimationTimingConfig) => {
      const timing = config || AnimationConfigService.getTimingConfig(AnimationPreset.SLIDE_IN_UP);
      translateY.value = distance;
      translateY.value = withTiming(0, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.out(Easing.cubic),
      });
    },
    [translateY]
  );

  const slideInDown = useCallback(
    (distance = 100, config?: AnimationTimingConfig) => {
      const timing = config || AnimationConfigService.getTimingConfig(AnimationPreset.SLIDE_IN_DOWN);
      translateY.value = -distance;
      translateY.value = withTiming(0, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.out(Easing.cubic),
      });
    },
    [translateY]
  );

  const slideInLeft = useCallback(
    (distance = 100, config?: AnimationTimingConfig) => {
      const timing = config || AnimationConfigService.getTimingConfig(AnimationPreset.SLIDE_IN_LEFT);
      translateX.value = -distance;
      translateX.value = withTiming(0, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.out(Easing.cubic),
      });
    },
    [translateX]
  );

  const slideInRight = useCallback(
    (distance = 100, config?: AnimationTimingConfig) => {
      const timing = config || AnimationConfigService.getTimingConfig(AnimationPreset.SLIDE_IN_RIGHT);
      translateX.value = distance;
      translateX.value = withTiming(0, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.out(Easing.cubic),
      });
    },
    [translateX]
  );

  return {
    fadeIn,
    fadeOut,
    slideInUp,
    slideInDown,
    slideInLeft,
    slideInRight,
    opacity,
    translateY,
    translateX,
  };
};

