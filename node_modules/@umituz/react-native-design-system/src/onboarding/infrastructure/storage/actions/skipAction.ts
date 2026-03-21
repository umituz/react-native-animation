/**
 * Skip Action
 * Single Responsibility: Mark onboarding as skipped
 */

import type { OnboardingUserData } from "../../../domain/entities/OnboardingUserData";
import type { OnboardingStoreState } from "../OnboardingStoreState";
import {
  saveCompletionStatus,
  saveUserData,
  handleError,
  logSuccess,
} from "./storageHelpers";

export async function skipAction(
  set: (state: Partial<OnboardingStoreState>) => void,
  get: () => OnboardingStoreState,
  storageKey: string
): Promise<void> {
  try {
    set({ loading: true, error: null });

    await saveCompletionStatus(storageKey);

    const userData: OnboardingUserData = {
      ...get().userData,
      skipped: true,
      completedAt: new Date().toISOString(),
    };

    await saveUserData(userData);

    set({
      isOnboardingComplete: true,
      userData,
      loading: false,
      error: null,
    });

    logSuccess("Onboarding skipped and persisted successfully");
  } catch (error) {
    const errorMessage = handleError(error, "skip onboarding");
    set({ loading: false, error: errorMessage });
    throw error;
  }
}
