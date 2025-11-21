/**
 * useGesture Hook
 *
 * Orchestrator hook that combines gesture creators and state.
 * Single Responsibility: Compose and expose gesture functionality.
 */

import { GestureDetector } from 'react-native-gesture-handler';
import { useGestureState } from './useGestureState';
import { useGestureCreators } from './useGestureCreators';
import type {
  TapGestureOptions,
  PanGestureOptions,
  PinchGestureOptions,
} from './useGestureCreators';

/**
 * Hook for gesture handling
 *
 * @example
 * const { createPanGesture, animatedStyle, GestureDetector } = useGesture();
 *
 * const panGesture = createPanGesture({
 *   onEnd: (x, y) => console.log('Dragged to:', x, y),
 * });
 *
 * return (
 *   <GestureDetector gesture={panGesture}>
 *     <Animated.View style={animatedStyle}>...</Animated.View>
 *   </GestureDetector>
 * );
 */
export const useGesture = () => {
  const state = useGestureState();
  const creators = useGestureCreators(state);

  return {
    // Gesture creators
    createTapGesture: creators.createTapGesture,
    createPanGesture: creators.createPanGesture,
    createPinchGesture: creators.createPinchGesture,
    createLongPressGesture: creators.createLongPressGesture,
    // Shared values (for custom gestures)
    translateX: state.translateX,
    translateY: state.translateY,
    scale: state.scale,
    // Utilities
    reset: state.reset,
    // Animated style
    animatedStyle: state.animatedStyle,
    // Re-export GestureDetector for convenience
    GestureDetector: GestureDetector as typeof GestureDetector,
  };
};

// Re-export types for convenience
export type {
  TapGestureOptions,
  PanGestureOptions,
  PinchGestureOptions,
} from './useGestureCreators';

