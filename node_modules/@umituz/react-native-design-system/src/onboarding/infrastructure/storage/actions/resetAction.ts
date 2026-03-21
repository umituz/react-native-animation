/**
 * Reset Action
 * Single Responsibility: Reset onboarding state
 */

import type { OnboardingStoreState } from "../OnboardingStoreState";
import {
  removeStorageKeys,
  handleError,
  logSuccess,
} from "./storageHelpers";

export async function resetAction(
  set: (state: Partial<OnboardingStoreState>) => void,
  storageKey: string
): Promise<void> {
  try {
    set({ loading: true, error: null });

    await removeStorageKeys(storageKey);

    set({
      isOnboardingComplete: false,
      currentStep: 0,
      userData: { answers: {} },
      loading: false,
      error: null,
    });

    logSuccess("Onboarding reset successfully");
  } catch (error) {
    set({
      loading: false,
      error: handleError(error, "reset onboarding"),
    });
  }
}
