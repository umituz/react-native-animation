/**
 * useStaggeredEntrance Hook
 *
 * Provides staggered entrance animations for onboarding slides and similar components.
 * Uses React Native Animated API for smooth, performant animations.
 *
 * @example
 * ```tsx
 * const { iconScale, iconOpacity, titleOpacity } = useStaggeredEntrance();
 *
 * <Animated.View style={{ transform: [{ scale: iconScale }], opacity: iconOpacity }}>
 *   <Icon />
 * </Animated.View>
 * ```
 */

import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export interface UseStaggeredEntranceReturn {
  iconScale: Animated.Value;
  iconOpacity: Animated.Value;
  titleOpacity: Animated.Value;
  titleTranslateY: Animated.Value;
  descriptionOpacity: Animated.Value;
  descriptionTranslateY: Animated.Value;
  featuresOpacity: Animated.Value;
  featuresTranslateY: Animated.Value;
}

export interface UseStaggeredEntranceOptions {
  /**
   * Delay before starting animations (ms)
   * @default 100
   */
  delay?: number;
  /**
   * Duration of each animation (ms)
   * @default 600
   */
  duration?: number;
  /**
   * Initial translateY offset
   * @default 30
   */
  translateYOffset?: number;
  /**
   * Whether to enable animations
   * @default true
   */
  enabled?: boolean;
}

/**
 * Hook for staggered entrance animations
 *
 * @param options - Animation configuration options
 * @returns Animation values for icon, title, description, and features
 */
export const useStaggeredEntrance = (
  options: UseStaggeredEntranceOptions = {}
): UseStaggeredEntranceReturn => {
  const {
    delay = 100,
    duration = 600,
    translateYOffset = 30,
    enabled = true,
  } = options;

  // Animation values
  const iconScale = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(translateYOffset)).current;
  const descriptionOpacity = useRef(new Animated.Value(0)).current;
  const descriptionTranslateY = useRef(new Animated.Value(translateYOffset)).current;
  const featuresOpacity = useRef(new Animated.Value(0)).current;
  const featuresTranslateY = useRef(new Animated.Value(translateYOffset)).current;

  useEffect(() => {
    if (!enabled) {
      // Set to final values immediately
      iconScale.setValue(1);
      iconOpacity.setValue(1);
      titleOpacity.setValue(1);
      titleTranslateY.setValue(0);
      descriptionOpacity.setValue(1);
      descriptionTranslateY.setValue(0);
      featuresOpacity.setValue(1);
      featuresTranslateY.setValue(0);
      return;
    }

    // Staggered animation sequence
    Animated.sequence([
      // Icon animation (scale + opacity)
      Animated.parallel([
        Animated.spring(iconScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: duration * 0.8,
          useNativeDriver: true,
        }),
      ]),
      // Title animation (opacity + translateY)
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      // Description animation (opacity + translateY)
      Animated.parallel([
        Animated.timing(descriptionOpacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.spring(descriptionTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      // Features animation (opacity + translateY)
      Animated.parallel([
        Animated.timing(featuresOpacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.spring(featuresTranslateY, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [
    enabled,
    delay,
    duration,
    translateYOffset,
    iconScale,
    iconOpacity,
    titleOpacity,
    titleTranslateY,
    descriptionOpacity,
    descriptionTranslateY,
    featuresOpacity,
    featuresTranslateY,
  ]);

  return {
    iconScale,
    iconOpacity,
    titleOpacity,
    titleTranslateY,
    descriptionOpacity,
    descriptionTranslateY,
    featuresOpacity,
    featuresTranslateY,
  };
};

