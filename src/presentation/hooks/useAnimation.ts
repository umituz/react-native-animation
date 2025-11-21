/**
 * useAnimation Hook
 *
 * Orchestrator hook that combines all animation types.
 * Single Responsibility: Compose and expose animation hooks.
 */

import { useAnimatedStyle } from 'react-native-reanimated';
import { useTimingAnimation } from './useTimingAnimation';
import { useSpringAnimation } from './useSpringAnimation';
import { useTransformAnimation } from './useTransformAnimation';

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
  const timing = useTimingAnimation();
  const spring = useSpringAnimation();
  const transform = useTransformAnimation();

  // Combine all shared values for animated style
  const animatedStyle = useAnimatedStyle(() => {
    // Use transform values if they're non-zero, otherwise use timing/spring values
    const translateXValue = transform.translateX.value !== 0 
      ? transform.translateX.value 
      : timing.translateX.value;
    const scaleValue = transform.scale.value !== 1 
      ? transform.scale.value 
      : spring.scale.value;

    return {
      opacity: timing.opacity.value,
      transform: [
        { translateY: timing.translateY.value },
        { translateX: translateXValue },
        { scale: scaleValue },
        { rotate: `${transform.rotate.value}deg` },
      ],
    };
  });

  return {
    // Timing animations
    fadeIn: timing.fadeIn,
    fadeOut: timing.fadeOut,
    slideInUp: timing.slideInUp,
    slideInDown: timing.slideInDown,
    slideInLeft: timing.slideInLeft,
    slideInRight: timing.slideInRight,
    // Spring animations
    scaleIn: spring.scaleIn,
    scaleOut: spring.scaleOut,
    bounce: spring.bounce,
    // Transform animations
    shake: transform.shake,
    pulse: transform.pulse,
    spin: transform.spin,
    // Shared values (for custom animations)
    opacity: timing.opacity,
    translateY: timing.translateY,
    translateX: timing.translateX,
    scale: spring.scale,
    rotate: transform.rotate,
    // Animated style
    animatedStyle,
  };
};

