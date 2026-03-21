/**
 * useOnboardingNavigation Hook
 *
 * Manages navigation state and callbacks for onboarding flow
 */

import { useState, useCallback } from "react";
import { DeviceEventEmitter } from "react-native";

export interface UseOnboardingNavigationReturn {
  currentIndex: number;
  goToNext: () => void;
  goToPrevious: () => void;
  complete: () => Promise<void>;
  skip: () => Promise<void>;
  isLastSlide: boolean;
  isFirstSlide: boolean;
}

/**
 * Hook for managing onboarding navigation
 *
 * @param totalSlides - Total number of slides
 * @param onComplete - Callback when onboarding completes
 * @param onSkip - Callback when onboarding is skipped
 * @returns Navigation state and handlers
 */
export const useOnboardingNavigation = (
  totalSlides: number,
  onComplete?: () => void | Promise<void>,
  onSkip?: () => void | Promise<void>,
): UseOnboardingNavigationReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev < totalSlides - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [totalSlides]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const complete = useCallback(async () => {
    if (onComplete) {
      await onComplete();
    }
    // Emit event for app-level handling
     
    DeviceEventEmitter.emit("onboarding-complete");
  }, [onComplete]);

  const skip = useCallback(async () => {
    if (onSkip) {
      await onSkip();
    }
    // Emit event for app-level handling
    DeviceEventEmitter.emit("onboarding-complete");
  }, [onSkip]);

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    complete,
    skip,
    isLastSlide: currentIndex === totalSlides - 1,
    isFirstSlide: currentIndex === 0,
  };
};

