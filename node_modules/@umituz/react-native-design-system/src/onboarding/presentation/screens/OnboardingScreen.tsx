/**
 * Onboarding Screen
 *
 * Main onboarding screen component with theme-aware colors
 * Generic and reusable across hundreds of apps
 *
 * This component only handles UI coordination - no business logic
 */

import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useAppDesignTokens } from "../../../theme/hooks/useAppDesignTokens";
import type { OnboardingOptions } from "../../domain/entities/OnboardingOptions";
import { useOnboardingScreenState } from "../hooks/useOnboardingScreenState";
import { OnboardingScreenContent } from "../components/OnboardingScreenContent";
import { OnboardingProvider, type OnboardingTranslations } from "../providers/OnboardingProvider";
import type { OnboardingColors } from "../types/OnboardingTheme";

export interface OnboardingScreenProps extends OnboardingOptions {
  /**
   * Optional custom header component
   */
  renderHeader?: (props: {
    isFirstSlide: boolean;
    onBack: () => void;
    onSkip: () => void;
  }) => React.ReactNode;

  /**
   * Optional custom footer component
   */
  renderFooter?: (props: {
    currentIndex: number;
    totalSlides: number;
    isLastSlide: boolean;
    onNext: () => void;
    onUpgrade?: () => void;
    showPaywallOnComplete?: boolean;
  }) => React.ReactNode;

  /**
   * Optional custom slide component
   */
  renderSlide?: (slide: OnboardingOptions["slides"][0]) => React.ReactNode;

  /**
   * Optional upgrade callback for premium features
   * Called when user wants to upgrade from onboarding
   */
  onUpgrade?: () => void;

  /**
   * Show paywall modal on onboarding completion (default: false)
   * When true, shows premium paywall before completing onboarding
   */
  showPaywallOnComplete?: boolean;

  /**
   * Theme colors for the onboarding (Optional - will use design tokens if not provided)
   */
  themeColors?: OnboardingColors;

  /**
   * All translations for the onboarding (required)
   */
  translations: OnboardingTranslations;

  /**
   * Optional video background component.
   * Required only when slides use `backgroundVideo`.
   * Import from expo-video in apps that have it installed.
   *
   * @example
   * import { BackgroundVideo } from '@umituz/react-native-design-system/onboarding';
   * <OnboardingScreen VideoComponent={BackgroundVideo} ... />
   */
  VideoComponent?: React.ComponentType<{ source: unknown; overlayOpacity?: number }>;
}

export const OnboardingScreen = ({
  slides,
  onComplete,
  onSkip,
  skipButtonText,
  nextButtonText,
  getStartedButtonText,
  showSkipButton = true,
  showBackButton = true,
  showProgressBar = true,
  showDots = true,
  showProgressText = true,
  storageKey,
  renderHeader,
  renderFooter,
  renderSlide,
  onUpgrade,
  showPaywallOnComplete = false,
  useCustomBackground: globalUseCustomBackground = false,
  themeVariant = "default",
  themeColors: providedThemeColors,
  translations,
  VideoComponent,
}: OnboardingScreenProps) => {
  if (__DEV__) {
    console.log("[OnboardingScreen] Component rendering");
    console.log("[OnboardingScreen] Props:", {
      slidesCount: slides?.length || 0,
      storageKey,
      showSkipButton,
      showBackButton,
      showProgressBar,
      translationsProvided: !!translations,
    });
  }

  const tokens = useAppDesignTokens();

  const themeColors = useMemo(
    () =>
      providedThemeColors ?? {
        iconColor: tokens.colors.primary,
        textColor: tokens.colors.textPrimary,
        subTextColor: tokens.colors.textSecondary,
        buttonBg: tokens.colors.primary,
        buttonTextColor: tokens.colors.onPrimary,
        progressBarBg: tokens.colors.surfaceSecondary,
        progressFillColor: tokens.colors.primary,
        dotColor: tokens.colors.surfaceSecondary,
        activeDotColor: tokens.colors.primary,
        progressTextColor: tokens.colors.textSecondary,
        headerButtonBg: tokens.colors.surface,
        headerButtonBorder: tokens.colors.borderLight,
        iconBg: tokens.colors.surfaceSecondary,
        iconBorder: tokens.colors.borderLight,
        errorColor: tokens.colors.error,
        // Use surfaceVariant for better contrast with textPrimary in both light/dark modes
        featureItemBg: tokens.colors.surfaceVariant,
      },
    [providedThemeColors, tokens]
  );

  const {
    filteredSlides,
    currentSlide,
    currentIndex,
    isFirstSlide,
    isLastSlide,
    currentAnswer,
    isAnswerValid,
    useCustomBackground,
    containerStyle,
    handleNext,
    handlePrevious,
    handleSkip,
    setCurrentAnswer,
  } = useOnboardingScreenState({
    slides,
    storageKey,
    onComplete,
    onSkip,
    globalUseCustomBackground,
  });

  // Early return if no slides - prevents rendering empty/broken screen
  if (filteredSlides.length === 0) {
    if (__DEV__) {
      console.warn("[OnboardingScreen] No slides to display - filteredSlides is empty");
    }
    return null;
  }

  if (__DEV__) {
    console.log("[OnboardingScreen] Rendering with", filteredSlides.length, "slides");
  }

  return (
    <OnboardingProvider useCustomBackground={useCustomBackground} colors={themeColors} translations={translations}>
      <OnboardingScreenContent
        containerStyle={[styles.container, containerStyle]}
        useCustomBackground={useCustomBackground}
        currentSlide={currentSlide}
        isFirstSlide={isFirstSlide}
        isLastSlide={isLastSlide}
        currentIndex={currentIndex}
        totalSlides={filteredSlides.length}
        currentAnswer={currentAnswer}
        isAnswerValid={isAnswerValid}
        showBackButton={showBackButton}
        showSkipButton={showSkipButton}
        showProgressBar={showProgressBar}
        showDots={showDots}
        showProgressText={showProgressText}
        skipButtonText={skipButtonText}
        nextButtonText={nextButtonText}
        getStartedButtonText={getStartedButtonText}
        onBack={handlePrevious}
        onSkip={handleSkip}
        onNext={handleNext}
        onAnswerChange={setCurrentAnswer}
        renderHeader={renderHeader}
        renderFooter={renderFooter}
        renderSlide={renderSlide}
        onUpgrade={onUpgrade}
        showPaywallOnComplete={showPaywallOnComplete}
        variant={themeVariant}
        VideoComponent={VideoComponent}
      />
    </OnboardingProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
