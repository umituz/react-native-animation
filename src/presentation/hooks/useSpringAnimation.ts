/**
 * useSpringAnimation Hook
 *
 * Hook for spring-based animations (scale, bounce).
 * Single Responsibility: Handle spring animations only.
 */

import { useCallback } from 'react';
import {
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import type { AnimationSpringConfig } from '../../domain/entities/Animation';
import {
  AnimationPreset,
  ANIMATION_CONSTANTS,
} from '../../domain/entities/Animation';
import { AnimationConfigService } from '../../infrastructure/services/AnimationConfigService';

/**
 * Hook for spring-based animations
 */
export const useSpringAnimation = () => {
  const scale = useSharedValue(1);

  const scaleIn = useCallback(
    (config?: AnimationSpringConfig) => {
      const spring = config || AnimationConfigService.getSpringConfig(AnimationPreset.SCALE_IN);
      scale.value = 0;
      scale.value = withSpring(1, {
        damping: spring.damping || ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: spring.stiffness || ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      });
    },
    [scale]
  );

  const scaleOut = useCallback(
    (config?: AnimationSpringConfig) => {
      const spring = config || AnimationConfigService.getSpringConfig(AnimationPreset.SCALE_OUT);
      scale.value = withSpring(0, {
        damping: spring.damping || ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: spring.stiffness || ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      });
    },
    [scale]
  );

  const bounce = useCallback(
    (config?: AnimationSpringConfig) => {
      const spring = config || AnimationConfigService.getSpringConfig(AnimationPreset.BOUNCE);
      scale.value = withSequence(
        withSpring(0.8, spring),
        withSpring(1.2, spring),
        withSpring(1, spring)
      );
    },
    [scale]
  );

  return {
    scaleIn,
    scaleOut,
    bounce,
    scale,
  };
};

