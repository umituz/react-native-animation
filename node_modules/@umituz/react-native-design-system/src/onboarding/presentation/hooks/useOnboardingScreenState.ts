/**
 * useOnboardingScreenState Hook
 * Single Responsibility: Coordinate onboarding screen state
 */

import { useMemo, useEffect } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";
import type { OnboardingAnswerValue } from "../../domain/entities/OnboardingQuestion";
import { useOnboarding } from "../../infrastructure/storage/OnboardingStore";
import { useOnboardingNavigation } from "../../infrastructure/hooks/useOnboardingNavigation";
import { useOnboardingAnswers } from "../../infrastructure/hooks/useOnboardingAnswers";
import { useOnboardingContainerStyle } from "./useOnboardingContainerStyle";
import { useOnboardingScreenHandlers } from "./useOnboardingScreenHandlers";
import { SlideManager } from "../../infrastructure/services/SlideManager";
import { ValidationManager } from "../../infrastructure/services/ValidationManager";
import { shouldUseCustomBackground } from "../../infrastructure/utils/backgroundUtils";

export interface UseOnboardingScreenStateProps {
  slides: OnboardingSlide[] | undefined;
  storageKey?: string;
  onComplete?: () => void | Promise<void>;
  onSkip?: () => void | Promise<void>;
  globalUseCustomBackground?: boolean;
}

export interface UseOnboardingScreenStateReturn {
  filteredSlides: OnboardingSlide[];
  currentSlide: OnboardingSlide | undefined;
  currentIndex: number;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  currentAnswer: OnboardingAnswerValue;
  isAnswerValid: boolean;
  useCustomBackground: boolean;
  containerStyle: StyleProp<ViewStyle>;
  handleNext: () => Promise<void>;
  handlePrevious: () => void;
  handleSkip: () => Promise<void>;
  setCurrentAnswer: (value: OnboardingAnswerValue) => void;
}

export function useOnboardingScreenState({
  slides,
  storageKey,
  onComplete,
  onSkip,
  globalUseCustomBackground = false,
}: UseOnboardingScreenStateProps): UseOnboardingScreenStateReturn {
  const onboardingStore = useOnboarding();

  const filteredSlides = useMemo(() => {
    if (!slides || !Array.isArray(slides) || slides.length === 0) {
      return [];
    }
    const userData = onboardingStore.userData;
    return SlideManager.filterSlides(slides, userData);
  }, [slides, onboardingStore.userData]);

  const {
    currentIndex,
    goToNext,
    goToPrevious,
    complete: completeOnboarding,
    skip: skipOnboarding,
    isLastSlide,
    isFirstSlide,
  } = useOnboardingNavigation(
    filteredSlides.length,
    async () => {
      await onboardingStore.complete(storageKey);
      if (onComplete) {
        await onComplete();
      }
    },
    async () => {
      await onboardingStore.skip(storageKey);
      if (onSkip) {
        await onSkip();
      }
    }
  );

  const currentSlide = useMemo(
    () => SlideManager.getSlideAtIndex(filteredSlides, currentIndex),
    [filteredSlides, currentIndex]
  );

  const {
    currentAnswer,
    setCurrentAnswer,
    loadAnswerForSlide,
    saveCurrentAnswer,
  } = useOnboardingAnswers(currentSlide);

  const { handleNext, handlePrevious, handleSkip } = useOnboardingScreenHandlers(
    {
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
    }
  );

  const useCustomBackground = shouldUseCustomBackground(currentSlide, globalUseCustomBackground);

  const isAnswerValid = useMemo(() => {
    if (!currentSlide?.question) {
      return true;
    }
    return ValidationManager.validateAnswer(
      currentSlide.question,
      currentAnswer
    );
  }, [currentSlide, currentAnswer]);

  const { containerStyle } = useOnboardingContainerStyle({ useCustomBackground });

  useEffect(() => {
    return () => {
      if (__DEV__) {
      }
    };
  }, []);

  return {
    filteredSlides,
    currentSlide,
    currentIndex,
    isFirstSlide,
    isLastSlide,
    currentAnswer,
    isAnswerValid,
    useCustomBackground,
    containerStyle,
    handleNext,
    handlePrevious,
    handleSkip,
    setCurrentAnswer,
  };
}
