/**
 * Animation Domain Entity
 *
 * Core animation types and configurations for React Native.
 * Wraps react-native-reanimated and react-native-gesture-handler.
 */

import type { WithSpringConfig, WithTimingConfig } from 'react-native-reanimated';

/**
 * Animation timing configuration
 */
export type AnimationTimingConfig = WithTimingConfig & {
  duration?: number;
};

/**
 * Animation spring configuration
 */
export type AnimationSpringConfig = WithSpringConfig & {
  damping?: number;
  stiffness?: number;
  mass?: number;
};

/**
 * Animation preset types
 */
export enum AnimationPreset {
  FADE_IN = 'fadeIn',
  FADE_OUT = 'fadeOut',
  SLIDE_IN_UP = 'slideInUp',
  SLIDE_IN_DOWN = 'slideInDown',
  SLIDE_IN_LEFT = 'slideInLeft',
  SLIDE_IN_RIGHT = 'slideInRight',
  SCALE_IN = 'scaleIn',
  SCALE_OUT = 'scaleOut',
  BOUNCE = 'bounce',
  SHAKE = 'shake',
}

/**
 * Gesture type
 */
export enum GestureType {
  TAP = 'tap',
  PAN = 'pan',
  PINCH = 'pinch',
  ROTATION = 'rotation',
  LONG_PRESS = 'longPress',
}

/**
 * Animation easing functions
 */
export enum AnimationEasing {
  LINEAR = 'linear',
  EASE_IN = 'easeIn',
  EASE_OUT = 'easeOut',
  EASE_IN_OUT = 'easeInOut',
  BOUNCE = 'bounce',
  ELASTIC = 'elastic',
}

/**
 * Animation constants
 */
export const ANIMATION_CONSTANTS = {
  DURATION: {
    INSTANT: 0,
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
  },
  SPRING: {
    DAMPING: 10,
    STIFFNESS: 100,
    MASS: 1,
  },
} as const;

/**
 * Animation utility functions
 */
export class AnimationUtils {
  /**
   * Get preset timing config
   */
  static getTimingConfig(preset: AnimationPreset): AnimationTimingConfig {
    const configs: Record<AnimationPreset, AnimationTimingConfig> = {
      [AnimationPreset.FADE_IN]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.FADE_OUT]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.SLIDE_IN_UP]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.SLIDE_IN_DOWN]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.SLIDE_IN_LEFT]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.SLIDE_IN_RIGHT]: {
        duration: ANIMATION_CONSTANTS.DURATION.NORMAL,
      },
      [AnimationPreset.SCALE_IN]: {
        duration: ANIMATION_CONSTANTS.DURATION.FAST,
      },
      [AnimationPreset.SCALE_OUT]: {
        duration: ANIMATION_CONSTANTS.DURATION.FAST,
      },
      [AnimationPreset.BOUNCE]: {
        duration: ANIMATION_CONSTANTS.DURATION.SLOW,
      },
      [AnimationPreset.SHAKE]: {
        duration: ANIMATION_CONSTANTS.DURATION.FAST,
      },
    };
    return configs[preset];
  }

  /**
   * Get preset spring config
   */
  static getSpringConfig(preset: AnimationPreset): AnimationSpringConfig {
    const configs: Record<AnimationPreset, AnimationSpringConfig> = {
      [AnimationPreset.FADE_IN]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.FADE_OUT]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.SLIDE_IN_UP]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.SLIDE_IN_DOWN]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.SLIDE_IN_LEFT]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.SLIDE_IN_RIGHT]: {
        damping: ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      },
      [AnimationPreset.SCALE_IN]: {
        damping: 15,
        stiffness: 150,
      },
      [AnimationPreset.SCALE_OUT]: {
        damping: 15,
        stiffness: 150,
      },
      [AnimationPreset.BOUNCE]: {
        damping: 5,
        stiffness: 120,
      },
      [AnimationPreset.SHAKE]: {
        damping: 8,
        stiffness: 200,
      },
    };
    return configs[preset];
  }
}

