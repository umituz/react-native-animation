/**
 * Animation Presets
 *
 * Common animation configurations for consistent timing and easing.
 */

import { Animated, Easing } from 'react-native';

export interface AnimationTimingConfig {
  duration: number;
  easing?: (value: number) => number;
  useNativeDriver?: boolean;
}

export interface AnimationSpringConfig {
  tension: number;
  friction: number;
  useNativeDriver?: boolean;
}

/**
 * Animation presets for common use cases
 */
export const AnimationPresets = {
  /**
   * Fast animation (200ms)
   */
  fast: {
    duration: 200,
    easing: Easing.out(Easing.quad),
    useNativeDriver: true,
  } as AnimationTimingConfig,

  /**
   * Normal animation (300ms)
   */
  normal: {
    duration: 300,
    easing: Easing.out(Easing.quad),
    useNativeDriver: true,
  } as AnimationTimingConfig,

  /**
   * Slow animation (500ms)
   */
  slow: {
    duration: 500,
    easing: Easing.out(Easing.quad),
    useNativeDriver: true,
  } as AnimationTimingConfig,

  /**
   * Spring animation (bouncy)
   */
  spring: {
    tension: 100,
    friction: 8,
    useNativeDriver: true,
  } as AnimationSpringConfig,

  /**
   * Spring animation (gentle)
   */
  springGentle: {
    tension: 50,
    friction: 7,
    useNativeDriver: true,
  } as AnimationSpringConfig,
};

/**
 * Create a timing animation with preset
 */
export const createTimingAnimation = (
  value: Animated.Value,
  toValue: number,
  preset: AnimationTimingConfig = AnimationPresets.normal
): Animated.CompositeAnimation => {
  return Animated.timing(value, {
    toValue,
    ...preset,
  });
};

/**
 * Create a spring animation with preset
 */
export const createSpringAnimation = (
  value: Animated.Value,
  toValue: number,
  preset: AnimationSpringConfig = AnimationPresets.spring
): Animated.CompositeAnimation => {
  return Animated.spring(value, {
    toValue,
    ...preset,
  });
};

