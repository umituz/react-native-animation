/**
 * useGesture Hook
 *
 * React hook for gesture handling using react-native-gesture-handler.
 * Provides simple API for common gesture patterns.
 */

import { useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

/**
 * Tap gesture options
 */
export interface TapGestureOptions {
  numberOfTaps?: number;
  maxDuration?: number;
  onTap?: () => void;
}

/**
 * Pan gesture options
 */
export interface PanGestureOptions {
  onStart?: () => void;
  onUpdate?: (x: number, y: number) => void;
  onEnd?: (x: number, y: number) => void;
}

/**
 * Pinch gesture options
 */
export interface PinchGestureOptions {
  onStart?: () => void;
  onUpdate?: (scale: number) => void;
  onEnd?: (scale: number) => void;
}

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
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const savedScale = useSharedValue(1);

  /**
   * Create tap gesture
   */
  const createTapGesture = useCallback(
    (options: TapGestureOptions = {}) => {
      const { numberOfTaps = 1, maxDuration = 500, onTap } = options;

      return Gesture.Tap()
        .numberOfTaps(numberOfTaps)
        .maxDuration(maxDuration)
        .onStart(() => {
          if (onTap) {
            runOnJS(onTap)();
          }
        });
    },
    []
  );

  /**
   * Create pan gesture
   */
  const createPanGesture = useCallback(
    (options: PanGestureOptions = {}) => {
      const { onStart, onUpdate, onEnd } = options;

      return Gesture.Pan()
        .onStart(() => {
          savedTranslateX.value = translateX.value;
          savedTranslateY.value = translateY.value;
          if (onStart) {
            runOnJS(onStart)();
          }
        })
        .onUpdate((event) => {
          translateX.value = savedTranslateX.value + event.translationX;
          translateY.value = savedTranslateY.value + event.translationY;
          if (onUpdate) {
            runOnJS(onUpdate)(translateX.value, translateY.value);
          }
        })
        .onEnd(() => {
          if (onEnd) {
            runOnJS(onEnd)(translateX.value, translateY.value);
          }
        });
    },
    [translateX, translateY, savedTranslateX, savedTranslateY]
  );

  /**
   * Create pinch gesture
   */
  const createPinchGesture = useCallback(
    (options: PinchGestureOptions = {}) => {
      const { onStart, onUpdate, onEnd } = options;

      return Gesture.Pinch()
        .onStart(() => {
          savedScale.value = scale.value;
          if (onStart) {
            runOnJS(onStart)();
          }
        })
        .onUpdate((event) => {
          scale.value = savedScale.value * event.scale;
          if (onUpdate) {
            runOnJS(onUpdate)(scale.value);
          }
        })
        .onEnd(() => {
          if (onEnd) {
            runOnJS(onEnd)(scale.value);
          }
        });
    },
    [scale, savedScale]
  );

  /**
   * Create long press gesture
   */
  const createLongPressGesture = useCallback(
    (options: { minDuration?: number; onLongPress?: () => void } = {}) => {
      const { minDuration = 500, onLongPress } = options;

      return Gesture.LongPress()
        .minDuration(minDuration)
        .onStart(() => {
          if (onLongPress) {
            runOnJS(onLongPress)();
          }
        });
    },
    []
  );

  /**
   * Reset gesture state
   */
  const reset = useCallback(() => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
    savedScale.value = 1;
  }, [translateX, translateY, scale, savedTranslateX, savedTranslateY, savedScale]);

  /**
   * Animated style for gesture transforms
   */
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return {
    // Gesture creators
    createTapGesture,
    createPanGesture,
    createPinchGesture,
    createLongPressGesture,
    // Shared values (for custom gestures)
    translateX,
    translateY,
    scale,
    // Utilities
    reset,
    // Animated style
    animatedStyle,
    // Re-export GestureDetector for convenience
    GestureDetector: GestureDetector as typeof GestureDetector,
  };
};

