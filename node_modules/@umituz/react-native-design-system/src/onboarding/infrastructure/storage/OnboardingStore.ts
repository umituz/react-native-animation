/**
 * Onboarding Store
 *
 * Zustand store for managing onboarding completion state
 * Uses @storage for persistence
 */

import { useMemo } from "react";
import { createStore } from "../../../storage";
import type { OnboardingStoreState } from "./OnboardingStoreState";
import { initialOnboardingState } from "./OnboardingStoreState";
import { createOnboardingStoreActions } from "./OnboardingStoreActions";
import type { OnboardingUserData } from "../../domain/entities/OnboardingUserData";
import { createOnboardingStoreSelectors } from "./OnboardingStoreSelectors";

interface OnboardingActions {
  // Simple actions
  setCurrentStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setState: (state: Partial<OnboardingStoreState>) => void;
  getState: () => OnboardingStoreState;
  // Async actions for initialization (match OnboardingStoreActions signatures)
  initialize: (storageKey?: string) => Promise<void>;
  complete: (storageKey?: string) => Promise<void>;
  skip: (storageKey?: string) => Promise<void>;
  reset: (storageKey?: string) => Promise<void>;
  saveAnswer: (questionId: string, answer: unknown) => Promise<void>;
  setUserData: (data: OnboardingUserData) => Promise<void>;
}

export const useOnboardingStore = createStore<
  OnboardingStoreState,
  OnboardingActions
>({
  name: "onboarding-store",
  initialState: initialOnboardingState,
  persist: false,
  actions: (
    set: (state: Partial<OnboardingStoreState>) => void,
    get: () => OnboardingStoreState
  ): OnboardingActions => {
    const actions = createOnboardingStoreActions(set, get);

    return {
      setCurrentStep: (step: number) => set({ currentStep: step }),
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      setState: set,
      getState: get,

      // Async actions from actions module
      initialize: actions.initialize,
      complete: actions.complete,
      skip: actions.skip,
      reset: actions.reset,
      saveAnswer: actions.saveAnswer,
      setUserData: actions.setUserData,
    };
  },
});

/**
 * Hook for accessing onboarding state
 * Memoized to prevent unnecessary re-renders in consumer components
 */
export const useOnboarding = () => {
  const store = useOnboardingStore();
  const setState = store.setState;
  const getState = store.getState;

  const actions = useMemo(() => createOnboardingStoreActions(setState, getState), [setState, getState]);
  const selectors = useMemo(() => createOnboardingStoreSelectors(getState), [getState]);

  return useMemo(() => ({
    // State
    isOnboardingComplete: store.isOnboardingComplete,
    currentStep: store.currentStep,
    loading: store.loading,
    error: store.error,
    userData: store.userData,

    // Actions
    initialize: actions.initialize,
    complete: actions.complete,
    skip: actions.skip,
    setCurrentStep: store.setCurrentStep,
    reset: actions.reset,
    setLoading: store.setLoading,
    setError: store.setError,
    saveAnswer: actions.saveAnswer,
    setUserData: actions.setUserData,

    // Selectors
    getAnswer: selectors.getAnswer,
    getUserData: selectors.getUserData,
  }), [store, actions, selectors]);
};

