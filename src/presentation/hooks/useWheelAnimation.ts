import { useCallback } from 'react';
import {
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
  cancelAnimation,
  useAnimatedReaction,
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

  // Monitor rotation to trigger ticks
  useAnimatedReaction(
    () => {
      const degreesPerSegment = 360 / segmentsCount;
      const normalizedAngle = ((rotation.value % 360) + 360) % 360;
      return Math.floor(normalizedAngle / degreesPerSegment) % segmentsCount;
    },
    (current: number, previous: number | undefined | null) => {
      if (previous !== null && previous !== undefined && current !== previous && onSpinTick) {
        runOnJS(onSpinTick)(current);
      }
    }
  );

  const spin = useCallback(() => {
    // Stop any current animation
    cancelAnimation(rotation);

    // Calculate final rotation (at least 5 full turns + random angle)
    const extraTurns = 5 + Math.floor(Math.random() * 5);
    const randomAngle = Math.random() * 360;
    const finalValue = rotation.value + (extraTurns * 360) + randomAngle;

    rotation.value = withTiming(
      finalValue,
      {
        duration: spinDuration,
        easing: Easing.bezier(0.2, 0, 0, 1), // "Premium" ease-out
      },
      (finished?: boolean) => {
        if (finished && onSpinComplete) {
          // Calculate winner based on final stopping point
          const normalizedAngle = ((finalValue % 360) + 360) % 360;
          const pointerAngleOnWheel = (360 - normalizedAngle) % 360;
          const degreesPerSegment = 360 / segmentsCount;
          const winnerIndex = Math.floor(pointerAngleOnWheel / degreesPerSegment) % segmentsCount;

          // Determine callback type based on whether segments are provided
          const useDataCallback = segments && segments.length > 0;

          if (useDataCallback && segments[winnerIndex]) {
            // Callback expects { value, label }
            const jsCallback = () => {
              (onSpinComplete as SpinCompleteCallbackWithData)({ value: segments[winnerIndex].value, label: segments[winnerIndex].label });
            };
            runOnJS(jsCallback)();
          } else {
            // Callback expects index
            const jsCallback = () => {
              (onSpinComplete as SpinCompleteCallback)(winnerIndex);
            };
            runOnJS(jsCallback)();
          }
        }
      }
    );
  }, [rotation, spinDuration, segmentsCount, segments, onSpinComplete]);

  const reset = useCallback(() => {
    cancelAnimation(rotation);
    rotation.value = 0;
  }, [rotation]);

  return {
    rotation,
    spin,
    reset,
  };
}
