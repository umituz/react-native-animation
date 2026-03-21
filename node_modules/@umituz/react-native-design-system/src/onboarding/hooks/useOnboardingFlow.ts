/**
 * Onboarding Flow Hook
 * Manages onboarding completion state with persistence
 */

import { useState, useEffect, useCallback } from 'react';
import { DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_KEY = 'onboarding_complete';

export interface UseOnboardingFlowResult {
  isOnboardingComplete: boolean;
  completeOnboarding: () => Promise<void>;
}

export const useOnboardingFlow = (): UseOnboardingFlowResult => {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  if (__DEV__) {
    console.log("[useOnboardingFlow] Hook initialized, isOnboardingComplete:", isOnboardingComplete);
  }

  // Load persisted state
  useEffect(() => {
    const isMounted = { current: true };

    if (__DEV__) {
      console.log("[useOnboardingFlow] useEffect - Loading persisted state");
    }

    const loadPersistedState = async () => {
      if (__DEV__) {
        console.log("[useOnboardingFlow] Reading from AsyncStorage:", ONBOARDING_KEY);
      }
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (__DEV__) {
        console.log("[useOnboardingFlow] AsyncStorage value:", value);
      }
      if (isMounted.current) {
        const complete = value === 'true';
        if (__DEV__) {
          console.log("[useOnboardingFlow] Setting isOnboardingComplete to:", complete);
        }
        setIsOnboardingComplete(complete);
      }
    };

    loadPersistedState();

    const subscription = DeviceEventEmitter.addListener(
      'onboarding-complete',
      () => {
        if (__DEV__) {
          console.log("[useOnboardingFlow] DeviceEventEmitter - onboarding-complete event");
        }
        if (isMounted.current) {
          setIsOnboardingComplete(true);
          AsyncStorage.setItem(ONBOARDING_KEY, 'true');
        }
      },
    );

    return () => {
      if (__DEV__) {
        console.log("[useOnboardingFlow] Cleanup - removing event listener");
      }
      isMounted.current = false;
      subscription.remove();
    };
  }, []);

  const completeOnboarding = useCallback(async () => {
    if (__DEV__) {
      console.log("[useOnboardingFlow] completeOnboarding called");
    }
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setIsOnboardingComplete(true);
    DeviceEventEmitter.emit('onboarding-complete');
    if (__DEV__) {
      console.log("[useOnboardingFlow] Onboarding marked as complete");
    }
  }, []);

  return {
    isOnboardingComplete,
    completeOnboarding,
  };
};
