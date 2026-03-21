/**
 * Answer Actions
 * Single Responsibility: Save and update user answers
 */

import { storageRepository } from "../../../../storage";
import type { OnboardingAnswerValue } from "../../../domain/entities/OnboardingQuestion";
import type { OnboardingUserData } from "../../../domain/entities/OnboardingUserData";
import type { OnboardingStoreState } from "../OnboardingStoreState";
import { USER_DATA_STORAGE_KEY, handleError, logSuccess } from "./storageHelpers";

export async function saveAnswerAction(
  set: (state: Partial<OnboardingStoreState>) => void,
  get: () => OnboardingStoreState,
  questionId: string,
  answer: unknown
): Promise<void> {
  try {
    const userData: OnboardingUserData = {
      ...get().userData,
      answers: {
        ...get().userData.answers,
        [questionId]: answer as OnboardingAnswerValue,
      },
    };

    await storageRepository.setItem(USER_DATA_STORAGE_KEY, userData);
    set({ userData });

    logSuccess(`Answer saved for question: ${questionId}`);
  } catch (error) {
    handleError(error, "save answer");
  }
}

export async function setUserDataAction(
  set: (state: Partial<OnboardingStoreState>) => void,
  data: OnboardingUserData
): Promise<void> {
  try {
    await storageRepository.setItem(USER_DATA_STORAGE_KEY, data);
    set({ userData: data });

    logSuccess("User data updated successfully");
  } catch (error) {
    handleError(error, "set user data");
  }
}
