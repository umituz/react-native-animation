/**
 * Onboarding Provider
 * 
 * Central manager for onboarding theme and configuration.
 * All values are passed from the main application.
 */

import React, { createContext, useContext, useMemo } from "react";
import type { OnboardingTheme, OnboardingColors } from "../types/OnboardingTheme";

export interface OnboardingTranslations {
  nextButton: string;
  getStartedButton: string;
  of?: string;
}

interface OnboardingProviderValue {
  theme: OnboardingTheme;
  translations: OnboardingTranslations;
  backgroundColor?: string;
}

const OnboardingScope = createContext<OnboardingProviderValue | undefined>(undefined);

export interface OnboardingProviderProps {
  children: React.ReactNode;
  useCustomBackground: boolean;
  colors: OnboardingColors;
  translations: OnboardingTranslations;
}

export const OnboardingProvider = ({
  children,
  useCustomBackground,
  colors,
  translations,
}: OnboardingProviderProps) => {
  const value = useMemo(
    () => ({
      theme: {
        colors,
        useCustomBackground,
      },
      translations,
      backgroundColor: colors.background,
    }),
    [colors, useCustomBackground, translations]
  );

  return (
    <OnboardingScope.Provider value={value}>
      {children}
    </OnboardingScope.Provider>
  );
};

export const useOnboardingProvider = (): OnboardingProviderValue => {
  const scope = useContext(OnboardingScope);
  if (!scope) {
    throw new Error("useOnboardingProvider must be used within OnboardingProvider");
  }
  return scope;
};
