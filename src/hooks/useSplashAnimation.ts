/**
 * useSplashAnimation Hook
 *
 * Provides fade, scale, and slide animations for splash screens.
 * Uses React Native Animated API.
 *
 * @example
 * ```tsx
 * const { fadeAnim, scaleAnim, slideAnim } = useSplashAnimation();
 *
 * <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
 *   <SplashContent />
 * </Animated.View>
 * ```
 */

import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export interface UseSplashAnimationOptions {
  /**
   * Fade animation duration (ms)
   * @default 1000
   */
  fadeDuration?: number;
  /**
   * Scale animation spring tension
   * @default 100
   */
  springTension?: number;
  /**
   * Scale animation spring friction
   * @default 8
   */
  springFriction?: number;
  /**
   * Slide animation duration (ms)
   * @default 800
   */
  slideDuration?: number;
  /**
   * Initial slide offset
   * @default 50
   */
  slideOffset?: number;
  /**
   * Whether to enable animations
   * @default true
   */
  enabled?: boolean;
}

export interface UseSplashAnimationReturn {
  fadeAnim: Animated.Value;
  scaleAnim: Animated.Value;
  slideAnim: Animated.Value;
}

/**
 * Hook for splash screen animations
 *
 * @param options - Animation configuration options
 * @returns Animation values for fade, scale, and slide
 */
export const useSplashAnimation = (
  options: UseSplashAnimationOptions = {}
): UseSplashAnimationReturn => {
  const {
    fadeDuration = 1000,
    springTension = 100,
    springFriction = 8,
    slideDuration = 800,
    slideOffset = 50,
    enabled = true,
  } = options;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(slideOffset)).current;

  useEffect(() => {
    if (!enabled) {
      fadeAnim.setValue(1);
      scaleAnim.setValue(1);
      slideAnim.setValue(0);
      return;
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: fadeDuration,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: springTension,
        friction: springFriction,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: slideDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [
    enabled,
    fadeDuration,
    springTension,
    springFriction,
    slideDuration,
    slideOffset,
    fadeAnim,
    scaleAnim,
    slideAnim,
  ]);

  return {
    fadeAnim,
    scaleAnim,
    slideAnim,
  };
};

