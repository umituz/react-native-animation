/**
 * useOnboardingAnswers Hook
 *
 * Manages answer state and operations for onboarding questions
 * Follows Single Responsibility Principle
 */

import { useState, useEffect, useCallback } from "react";
import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";
import type { OnboardingAnswerValue } from "../../domain/entities/OnboardingQuestion";
import { useOnboarding } from "../storage/OnboardingStore";

export interface UseOnboardingAnswersReturn {
  currentAnswer: OnboardingAnswerValue;
  setCurrentAnswer: (answer: OnboardingAnswerValue) => void;
  loadAnswerForSlide: (slide: OnboardingSlide | undefined) => void;
  saveCurrentAnswer: (slide: OnboardingSlide | undefined) => Promise<void>;
}

/**
 * Hook for managing onboarding question answers
 * @param currentSlide - The current slide being displayed
 * @returns Answer state and operations
 */
export function useOnboardingAnswers(
  currentSlide: OnboardingSlide | undefined,
): UseOnboardingAnswersReturn {
  const onboardingStore = useOnboarding();
  const [currentAnswer, setCurrentAnswer] = useState<OnboardingAnswerValue>(undefined);

  /**
   * Load answer for a specific slide
   */
  const loadAnswerForSlide = useCallback(
    (slide: OnboardingSlide | undefined) => {
      if (slide?.question) {
        const savedAnswer = onboardingStore.getAnswer(slide.question.id);
        setCurrentAnswer(savedAnswer ?? slide.question.defaultValue);
      } else {
        setCurrentAnswer(undefined);
      }
    },
    [onboardingStore],
  );

  /**
   * Save current answer for a slide
   */
  const saveCurrentAnswer = useCallback(
    async (slide: OnboardingSlide | undefined) => {
      if (slide?.question && currentAnswer !== undefined) {
        await onboardingStore.saveAnswer(slide.question.id, currentAnswer);
      }
    },
    [currentAnswer, onboardingStore],
  );

  // Load answer when slide changes
  useEffect(() => {
    loadAnswerForSlide(currentSlide);
  }, [currentSlide, loadAnswerForSlide]);

  return {
    currentAnswer,
    setCurrentAnswer,
    loadAnswerForSlide,
    saveCurrentAnswer,
  };
}

