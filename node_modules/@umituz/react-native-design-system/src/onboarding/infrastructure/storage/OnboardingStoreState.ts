/**
 * Onboarding Store State
 * Single Responsibility: Store state interface and initial state
 */

import type { OnboardingUserData } from "../../domain/entities/OnboardingUserData";

export interface OnboardingStoreState {
  isOnboardingComplete: boolean;
  currentStep: number;
  loading: boolean;
  error: string | null;
  userData: OnboardingUserData;
}

export const initialOnboardingState: OnboardingStoreState = {
  isOnboardingComplete: false,
  currentStep: 0,
  loading: false,
  error: null,
  userData: { answers: {} },
};