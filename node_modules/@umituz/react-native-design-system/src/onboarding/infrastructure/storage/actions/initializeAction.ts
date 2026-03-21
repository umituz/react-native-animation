/**
 * Initialize Action
 * Single Responsibility: Load initial onboarding state from storage
 */

import type { OnboardingUserData } from "../../../domain/entities/OnboardingUserData";
import type { OnboardingStoreState } from "../OnboardingStoreState";
import {
  loadCompletionStatus,
  loadUserData,
  handleError,
  logSuccess,
} from "./storageHelpers";

export async function initializeAction(
  set: (state: Partial<OnboardingStoreState>) => void,
  storageKey: string
): Promise<void> {
  try {
    set({ loading: true, error: null });

    const isComplete = await loadCompletionStatus(storageKey);
    const defaultData: OnboardingUserData = { answers: {} };
    const userData = await loadUserData(defaultData);

    set({
      isOnboardingComplete: isComplete,
      userData,
      loading: false,
      error: null,
    });

    logSuccess(`Initialized with completion status: ${isComplete}`);
  } catch (error) {
    set({
      loading: false,
      error: handleError(error, "initialize onboarding"),
    });
  }
}
