/**
 * useOnboardingScreenHandlers Hook
 * Single Responsibility: Handle onboarding screen user interactions
 */

import { useCallback } from "react";
import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";
import { SlideManager } from "../../infrastructure/services/SlideManager";

export interface UseOnboardingScreenHandlersProps {
  filteredSlides: OnboardingSlide[];
  currentSlide: OnboardingSlide | undefined;
  currentIndex: number;
  isLastSlide: boolean;
  saveCurrentAnswer: (slide: OnboardingSlide) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  goToNext: () => void;
  goToPrevious: () => void;
  skipOnboarding: () => Promise<void>;
  loadAnswerForSlide: (slide: OnboardingSlide) => void;
}

export interface UseOnboardingScreenHandlersReturn {
  handleNext: () => Promise<void>;
  handlePrevious: () => void;
  handleSkip: () => Promise<void>;
}

export function useOnboardingScreenHandlers({
  filteredSlides,
  currentSlide,
  currentIndex,
  isLastSlide,
  saveCurrentAnswer,
  completeOnboarding,
  goToNext,
  goToPrevious,
  skipOnboarding,
  loadAnswerForSlide,
}: UseOnboardingScreenHandlersProps): UseOnboardingScreenHandlersReturn {
  const handleNext = useCallback(async () => {
    if (!currentSlide) return;

    try {
      await saveCurrentAnswer(currentSlide);

      if (isLastSlide) {
        await completeOnboarding();
      } else {
        goToNext();

        const nextSlide = SlideManager.getSlideAtIndex(
          filteredSlides,
          currentIndex + 1
        );

        if (nextSlide) {
          loadAnswerForSlide(nextSlide);
        }
      }
    } catch (_error) {
      if (__DEV__) {
      }
    }
  }, [
    currentSlide,
    isLastSlide,
    saveCurrentAnswer,
    completeOnboarding,
    goToNext,
    filteredSlides,
    currentIndex,
    loadAnswerForSlide,
  ]);

  const handlePrevious = useCallback(() => {
    try {
      goToPrevious();

      const prevSlide = SlideManager.getSlideAtIndex(
        filteredSlides,
        currentIndex - 1
      );

      if (prevSlide) {
        loadAnswerForSlide(prevSlide);
      }
    } catch (error) {
      if (__DEV__) {
        console.error(
          "[useOnboardingScreenHandlers] Error in handlePrevious:",
          error
        );
      }
    }
  }, [goToPrevious, filteredSlides, currentIndex, loadAnswerForSlide]);

  const handleSkip = useCallback(async () => {
    try {
      await skipOnboarding();
    } catch (_error) {
      if (__DEV__) {
      }
    }
  }, [skipOnboarding]);

  return {
    handleNext,
    handlePrevious,
    handleSkip,
  };
}
