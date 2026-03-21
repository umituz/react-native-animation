/**
 * Complete Action
 * Single Responsibility: Mark onboarding as completed
 */

import type { OnboardingUserData } from "../../../domain/entities/OnboardingUserData";
import type { OnboardingStoreState } from "../OnboardingStoreState";
import {
  saveCompletionStatus,
  saveUserData,
  handleError,
  logSuccess,
} from "./storageHelpers";

export async function completeAction(
  set: (state: Partial<OnboardingStoreState>) => void,
  get: () => OnboardingStoreState,
  storageKey: string
): Promise<void> {
  try {
    set({ loading: true, error: null });

    await saveCompletionStatus(storageKey);

    const userData: OnboardingUserData = {
      ...get().userData,
      completedAt: new Date().toISOString(),
    };

    await saveUserData(userData);

    set({
      isOnboardingComplete: true,
      userData,
      loading: false,
      error: null,
    });

    logSuccess("Onboarding completed and persisted successfully");
  } catch (error) {
    const errorMessage = handleError(error, "complete onboarding");
    set({ loading: false, error: errorMessage });
    throw error;
  }
}
