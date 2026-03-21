/**
 * Onboarding Store Actions
 * Single Responsibility: Async store actions interface and factory
 */

import type { OnboardingUserData } from "../../domain/entities/OnboardingUserData";
import type { OnboardingStoreState } from "./OnboardingStoreState";
import {
  initializeAction,
  completeAction,
  skipAction,
  resetAction,
  saveAnswerAction,
  setUserDataAction,
  DEFAULT_STORAGE_KEY,
} from "./actions";

export interface OnboardingStoreActions {
  initialize: (storageKey?: string) => Promise<void>;
  complete: (storageKey?: string) => Promise<void>;
  skip: (storageKey?: string) => Promise<void>;
  reset: (storageKey?: string) => Promise<void>;
  saveAnswer: (questionId: string, answer: unknown) => Promise<void>;
  setUserData: (data: OnboardingUserData) => Promise<void>;
}

export function createOnboardingStoreActions(
  set: (state: Partial<OnboardingStoreState>) => void,
  get: () => OnboardingStoreState
): OnboardingStoreActions {
  return {
    initialize: (storageKey = DEFAULT_STORAGE_KEY) =>
      initializeAction(set, storageKey),

    complete: (storageKey = DEFAULT_STORAGE_KEY) =>
      completeAction(set, get, storageKey),

    skip: (storageKey = DEFAULT_STORAGE_KEY) =>
      skipAction(set, get, storageKey),

    reset: (storageKey = DEFAULT_STORAGE_KEY) =>
      resetAction(set, storageKey),

    saveAnswer: (questionId: string, answer: unknown) =>
      saveAnswerAction(set, get, questionId, answer),

    setUserData: (data: OnboardingUserData) =>
      setUserDataAction(set, data),
  };
}
