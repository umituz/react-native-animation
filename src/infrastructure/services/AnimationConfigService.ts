/**
 * Animation Config Service
 *
 * Infrastructure service for providing animation configurations.
 * Separates configuration logic from domain entities.
 */

import type {
  AnimationTimingConfig,
  AnimationSpringConfig,
} from '../../domain/entities/Animation';
import {
  AnimationPreset,
  ANIMATION_CONSTANTS,
} from '../../domain/entities/Animation';

/**
 * Service for providing animation configurations
 */
export class AnimationConfigService {
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

