import { useCallback, useRef } from 'react';
import {
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
  cancelAnimation,
  useAnimatedReaction,
  useAnimatedRef,
} from 'react-native-reanimated';

export type SpinCompleteCallback = (winnerIndex: number) => void;
export type SpinCompleteCallbackWithData = (result: { value: string; label: string }) => void;

export interface WheelSegment {
  value: string;
  label: string;
}

export interface WheelAnimationConfig {
  segmentsCount: number;
  segments?: WheelSegment[];  // Optional: provide segment data for data callbacks
  spinDuration?: number;
  onSpinComplete?: SpinCompleteCallback | SpinCompleteCallbackWithData;
  onSpinTick?: (currentIndex: number) => void;
}

export function useWheelAnimation({
  segmentsCount,
  segments,
  spinDuration = 5000,
  onSpinComplete,
  onSpinTick,
}: WheelAnimationConfig) {
  const rotation = useSharedValue(0);
  const isSpinningRef = useRef(false);

  // Monitor rotation to trigger ticks
  useAnimatedReaction(
    () => {
      const degreesPerSegment = 360 / segmentsCount;
      const normalizedAngle = ((rotation.value % 360) + 360) % 360;
      const currentIndex = Math.floor(normalizedAngle / degreesPerSegment) % segmentsCount;

      if (__DEV__) {
        console.log('[useWheelAnimation] AnimatedReaction:', {
          normalizedAngle,
          currentIndex,
          degreesPerSegment,
          rotationValue: rotation.value
        });
      }

      return currentIndex;
    },
    (current: number, previous: number | null) => {
      if (previous !== null && current !== previous && onSpinTick) {
        if (__DEV__) {
          console.log('[useWheelAnimation] Spin tick:', { current, previous });
        }
        runOnJS(onSpinTick)(current);
      }
    }
  );

  const spin = useCallback(() => {
    if (__DEV__) {
      console.log('[useWheelAnimation] Spin called', { isSpinning: isSpinningRef.current });
    }

    if (isSpinningRef.current) {
      if (__DEV__) {
        console.log('[useWheelAnimation] Already spinning, ignoring');
      }
      return;
    }

    isSpinningRef.current = true;

    if (__DEV__) {
      console.log('[useWheelAnimation] Starting spin animation');
    }

    // Stop any current animation
    cancelAnimation(rotation);

    // Calculate final rotation (at least 5 full turns + random angle)
    const extraTurns = 5 + Math.floor(Math.random() * 5);
    const randomAngle = Math.random() * 360;

    // Use a worklet to read the current rotation value safely
    const startSpin = () => {
      'worklet';
      const currentRotation = rotation.value;
      const finalValue = currentRotation + (extraTurns * 360) + randomAngle;

      if (__DEV__) {
        console.log('[useWheelAnimation] Animation params:', {
          currentRotation,
          extraTurns,
          randomAngle,
          finalValue,
          spinDuration
        });
      }

      rotation.value = withTiming(
        finalValue,
        {
          duration: spinDuration,
          easing: Easing.bezier(0.2, 0, 0, 1), // "Premium" ease-out
        },
        (finished?: boolean) => {
          if (__DEV__) {
            console.log('[useWheelAnimation] Animation finished:', { finished });
          }

          try {
            isSpinningRef.current = false;

            if (finished && onSpinComplete) {
              // Calculate winner based on final stopping point
              const normalizedAngle = ((finalValue % 360) + 360) % 360;
              const pointerAngleOnWheel = (360 - normalizedAngle) % 360;
              const degreesPerSegment = 360 / segmentsCount;
              const winnerIndex = Math.floor(pointerAngleOnWheel / degreesPerSegment) % segmentsCount;

              if (__DEV__) {
                console.log('[useWheelAnimation] Winner calculation:', {
                  finalValue,
                  normalizedAngle,
                  pointerAngleOnWheel,
                  winnerIndex,
                  hasSegments: !!(segments && segments.length > 0)
                });
              }

              // Determine callback type based on whether segments are provided
              const useDataCallback = segments && segments.length > 0;

              if (useDataCallback && segments[winnerIndex]) {
                // Callback expects { value, label }
                const jsCallback = () => {
                  try {
                    if (__DEV__) {
                      console.log('[useWheelAnimation] Calling data callback:', segments[winnerIndex]);
                    }
                    (onSpinComplete as SpinCompleteCallbackWithData)({ value: segments[winnerIndex].value, label: segments[winnerIndex].label });
                  } catch (error) {
                    if (__DEV__) {
                      console.error('[useWheelAnimation] Data callback error:', error);
                    }
                  }
                };
                runOnJS(jsCallback)();
              } else {
                // Callback expects index
                const jsCallback = () => {
                  try {
                    if (__DEV__) {
                      console.log('[useWheelAnimation] Calling index callback:', winnerIndex);
                    }
                    (onSpinComplete as SpinCompleteCallback)(winnerIndex);
                  } catch (error) {
                    if (__DEV__) {
                      console.error('[useWheelAnimation] Index callback error:', error);
                    }
                  }
                };
                runOnJS(jsCallback)();
              }
            }
          } catch (error) {
            if (__DEV__) {
              console.error('[useWheelAnimation] Completion callback error:', error);
            }
            isSpinningRef.current = false;
          }
        }
      );
    };

    // Execute the worklet
    startSpin();
  }, [spinDuration, segmentsCount, segments, onSpinComplete, onSpinTick]);

  const reset = useCallback(() => {
    if (__DEV__) {
      console.log('[useWheelAnimation] Reset called');
    }

    isSpinningRef.current = false;
    cancelAnimation(rotation);
    rotation.value = 0;
  }, []);

  return {
    rotation,
    spin,
    reset,
  };
}
