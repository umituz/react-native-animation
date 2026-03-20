import { useCallback } from 'react';
import {
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
  cancelAnimation,
  useAnimatedReaction,
} from 'react-native-reanimated';

export interface WheelAnimationConfig {
  segmentsCount: number;
  spinDuration?: number;
  onSpinComplete?: (winnerIndex: number) => void;
  onSpinTick?: (currentIndex: number) => void;
}

export function useWheelAnimation({
  segmentsCount,
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
          
          runOnJS(onSpinComplete)(winnerIndex);
        }
      }
    );
  }, [rotation, spinDuration, segmentsCount, onSpinComplete]);

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
