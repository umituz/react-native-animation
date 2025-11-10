/**
 * useAnimation Hook
 *
 * React hook for declarative animations using react-native-reanimated.
 * Provides simple API for common animation patterns.
 */

import { useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import type {
  AnimationTimingConfig,
  AnimationSpringConfig,
} from '../../domain/entities/Animation';
import {
  AnimationPreset,
  ANIMATION_CONSTANTS,
  AnimationUtils,
} from '../../domain/entities/Animation';

/**
 * Hook for declarative animations
 *
 * @example
 * const { fadeIn, fadeOut, animatedStyle } = useAnimation();
 *
 * // Trigger animations
 * fadeIn();
 * fadeOut();
 *
 * // Apply to component
 * <Animated.View style={animatedStyle}>...</Animated.View>
 */
export const useAnimation = () => {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  /**
   * Fade in animation
   */
  const fadeIn = useCallback(
    (config?: AnimationTimingConfig) => {
      const timing = config || AnimationUtils.getTimingConfig(AnimationPreset.FADE_IN);
      opacity.value = withTiming(1, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.ease,
      });
    },
    [opacity]
  );

  /**
   * Fade out animation
   */
  const fadeOut = useCallback(
    (config?: AnimationTimingConfig) => {
      const timing = config || AnimationUtils.getTimingConfig(AnimationPreset.FADE_OUT);
      opacity.value = withTiming(0, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.ease,
      });
    },
    [opacity]
  );

  /**
   * Slide in from bottom
   */
  const slideInUp = useCallback(
    (distance = 100, config?: AnimationTimingConfig) => {
      const timing = config || AnimationUtils.getTimingConfig(AnimationPreset.SLIDE_IN_UP);
      translateY.value = distance;
      translateY.value = withTiming(0, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.out(Easing.cubic),
      });
    },
    [translateY]
  );

  /**
   * Slide in from top
   */
  const slideInDown = useCallback(
    (distance = 100, config?: AnimationTimingConfig) => {
      const timing = config || AnimationUtils.getTimingConfig(AnimationPreset.SLIDE_IN_DOWN);
      translateY.value = -distance;
      translateY.value = withTiming(0, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.out(Easing.cubic),
      });
    },
    [translateY]
  );

  /**
   * Slide in from left
   */
  const slideInLeft = useCallback(
    (distance = 100, config?: AnimationTimingConfig) => {
      const timing = config || AnimationUtils.getTimingConfig(AnimationPreset.SLIDE_IN_LEFT);
      translateX.value = -distance;
      translateX.value = withTiming(0, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.out(Easing.cubic),
      });
    },
    [translateX]
  );

  /**
   * Slide in from right
   */
  const slideInRight = useCallback(
    (distance = 100, config?: AnimationTimingConfig) => {
      const timing = config || AnimationUtils.getTimingConfig(AnimationPreset.SLIDE_IN_RIGHT);
      translateX.value = distance;
      translateX.value = withTiming(0, {
        duration: timing.duration || ANIMATION_CONSTANTS.DURATION.NORMAL,
        easing: Easing.out(Easing.cubic),
      });
    },
    [translateX]
  );

  /**
   * Scale in animation (spring-based)
   */
  const scaleIn = useCallback(
    (config?: AnimationSpringConfig) => {
      const spring = config || AnimationUtils.getSpringConfig(AnimationPreset.SCALE_IN);
      scale.value = 0;
      scale.value = withSpring(1, {
        damping: spring.damping || ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: spring.stiffness || ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      });
    },
    [scale]
  );

  /**
   * Scale out animation (spring-based)
   */
  const scaleOut = useCallback(
    (config?: AnimationSpringConfig) => {
      const spring = config || AnimationUtils.getSpringConfig(AnimationPreset.SCALE_OUT);
      scale.value = withSpring(0, {
        damping: spring.damping || ANIMATION_CONSTANTS.SPRING.DAMPING,
        stiffness: spring.stiffness || ANIMATION_CONSTANTS.SPRING.STIFFNESS,
      });
    },
    [scale]
  );

  /**
   * Bounce animation
   */
  const bounce = useCallback(
    (config?: AnimationSpringConfig) => {
      const spring = config || AnimationUtils.getSpringConfig(AnimationPreset.BOUNCE);
      scale.value = withSequence(
        withSpring(0.8, spring),
        withSpring(1.2, spring),
        withSpring(1, spring)
      );
    },
    [scale]
  );

  /**
   * Shake animation
   */
  const shake = useCallback(() => {
    translateX.value = withSequence(
      withTiming(-10, { duration: 50 }),
      withRepeat(withTiming(10, { duration: 50 }), 4, true),
      withTiming(0, { duration: 50 })
    );
  }, [translateX]);

  /**
   * Pulse animation (repeating scale)
   */
  const pulse = useCallback((repeatCount = -1) => {
    scale.value = withRepeat(
      withSequence(withTiming(1.1, { duration: 500 }), withTiming(1, { duration: 500 })),
      repeatCount,
      false
    );
  }, [scale]);

  /**
   * Spin animation (continuous rotation)
   */
  const spin = useCallback((repeatCount = -1) => {
    rotate.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      repeatCount,
      false
    );
  }, [rotate]);

  /**
   * Animated style
   */
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  return {
    // Animation functions
    fadeIn,
    fadeOut,
    slideInUp,
    slideInDown,
    slideInLeft,
    slideInRight,
    scaleIn,
    scaleOut,
    bounce,
    shake,
    pulse,
    spin,
    // Shared values (for custom animations)
    opacity,
    translateY,
    translateX,
    scale,
    rotate,
    // Animated style
    animatedStyle,
  };
};

