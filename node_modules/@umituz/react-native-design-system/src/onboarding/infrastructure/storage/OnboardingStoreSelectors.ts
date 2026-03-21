/**
 * Onboarding Store Selectors
 * Single Responsibility: Store state selectors
 */

import type { OnboardingAnswerValue } from "../../domain/entities/OnboardingQuestion";
import type { OnboardingStoreState } from "./OnboardingStoreState";

export interface OnboardingStoreSelectors {
  getAnswer: (questionId: string) => OnboardingAnswerValue;
  getUserData: () => OnboardingStoreState['userData'];
}

export function createOnboardingStoreSelectors(
  get: () => OnboardingStoreState
): OnboardingStoreSelectors {
  return {
    getAnswer: (questionId: string) => {
      return get().userData.answers[questionId];
    },

    getUserData: () => {
      return get().userData;
    },
  };
}