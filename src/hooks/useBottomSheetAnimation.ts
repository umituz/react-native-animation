/**
 * useBottomSheetAnimation Hook
 *
 * Provides slide and backdrop animations for bottom sheet components.
 * Uses React Native Animated API.
 *
 * @example
 * ```tsx
 * const { slideAnim, backdropOpacity } = useBottomSheetAnimation(visible);
 *
 * <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
 *   <BottomSheetContent />
 * </Animated.View>
 * ```
 */

import { useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface UseBottomSheetAnimationOptions {
  /**
   * Animation duration (ms)
   * @default 300
   */
  duration?: number;
  /**
   * Close animation duration (ms)
   * @default 250
   */
  closeDuration?: number;
}

export interface UseBottomSheetAnimationReturn {
  slideAnim: Animated.Value;
  backdropOpacity: Animated.Value;
}

/**
 * Hook for bottom sheet slide and backdrop animations
 *
 * @param visible - Whether the bottom sheet is visible
 * @param options - Animation configuration options
 * @returns Animation values for slide and backdrop
 */
export const useBottomSheetAnimation = (
  visible: boolean,
  options: UseBottomSheetAnimationOptions = {}
): UseBottomSheetAnimationReturn => {
  const { duration = 300, closeDuration = 250 } = options;

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: closeDuration,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: closeDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, duration, closeDuration, slideAnim, backdropOpacity]);

  return {
    slideAnim,
    backdropOpacity,
  };
};

