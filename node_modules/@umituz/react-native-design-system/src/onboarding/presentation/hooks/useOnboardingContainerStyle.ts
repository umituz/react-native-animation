/**
 * useOnboardingContainerStyle Hook
 * Single Responsibility: Manage container styling for onboarding screen
 */

import { useMemo } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDesignTokens } from "../../../theme/hooks/useAppDesignTokens";

export interface UseOnboardingContainerStyleProps {
  useCustomBackground: boolean;
}

export interface UseOnboardingContainerStyleReturn {
  containerStyle: StyleProp<ViewStyle>;
}

export function useOnboardingContainerStyle({
  useCustomBackground,
}: UseOnboardingContainerStyleProps): UseOnboardingContainerStyleReturn {
  const insets = useSafeAreaInsets();
  const tokens = useAppDesignTokens();

  const containerStyle = useMemo(
    () => [
      {
        paddingTop: insets.top,
        backgroundColor: useCustomBackground ? "transparent" : tokens.colors.backgroundPrimary,
      },
    ],
    [insets.top, useCustomBackground, tokens.colors.backgroundPrimary],
  );

  return {
    containerStyle,
  };
}