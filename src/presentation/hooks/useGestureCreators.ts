/**
 * useGestureCreators Hook
 *
 * Hook for creating gesture handlers.
 * Single Responsibility: Create gesture handlers only.
 */

import { useCallback } from 'react';
import {
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
} from 'react-native-gesture-handler';
import type {
  SharedValue,
} from 'react-native-reanimated';

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
 * Long press gesture options
 */
export interface LongPressGestureOptions {
  minDuration?: number;
  onLongPress?: () => void;
}

/**
 * Gesture state interface
 */
export interface GestureState {
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  scale: SharedValue<number>;
  savedTranslateX: SharedValue<number>;
  savedTranslateY: SharedValue<number>;
  savedScale: SharedValue<number>;
}

/**
 * Hook for creating gesture handlers
 */
export const useGestureCreators = (state: GestureState) => {
  const { translateX, translateY, scale, savedTranslateX, savedTranslateY, savedScale } = state;

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

  const createLongPressGesture = useCallback(
    (options: LongPressGestureOptions = {}) => {
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

  return {
    createTapGesture,
    createPanGesture,
    createPinchGesture,
    createLongPressGesture,
  };
};

