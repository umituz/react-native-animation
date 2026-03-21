/**
 * Onboarding Screen Content Component
 * Single Responsibility: Render onboarding screen content (header, slide, footer)
 */

import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "../../../theme/infrastructure/stores/themeStore";
import { OnboardingHeader } from "./OnboardingHeader";
import { OnboardingSlide as OnboardingSlideComponent } from "./OnboardingSlide";
import { QuestionSlide } from "./QuestionSlide";
import { OnboardingFooter } from "./OnboardingFooter";
import { OnboardingBackground } from "./OnboardingBackground";
import { useOnboardingGestures } from "../hooks/useOnboardingGestures";
import { useOnboardingProvider } from "../providers/OnboardingProvider";
import type { OnboardingScreenContentProps } from "../types/OnboardingProps";

export const OnboardingScreenContent = ({
  containerStyle,
  useCustomBackground,
  currentSlide,
  isFirstSlide,
  isLastSlide,
  currentIndex,
  totalSlides,
  currentAnswer,
  isAnswerValid,
  showBackButton,
  showSkipButton,
  showProgressBar,
  showDots,
  showProgressText,
  skipButtonText,
  nextButtonText: _nextButtonText,
  getStartedButtonText: _getStartedButtonText,
  onBack,
  onSkip,
  onNext,
  onAnswerChange,
  renderHeader,
  renderFooter,
  renderSlide,
  onUpgrade,
  showPaywallOnComplete,
  variant = "default",
  VideoComponent,
}: OnboardingScreenContentProps) => {
  const { themeMode } = useTheme();
  const { backgroundColor } = useOnboardingProvider();

  const panResponder = useOnboardingGestures({
    isFirstSlide,
    isAnswerValid,
    onNext,
    onBack,
  });

  const hasMedia =
    !!currentSlide?.backgroundImage || 
    !!currentSlide?.backgroundVideo ||
    (!!currentSlide?.backgroundImages && currentSlide.backgroundImages.length > 0);
  const overlayOpacity = currentSlide?.overlayOpacity ?? 0.5;
  const showOverlay = useCustomBackground || hasMedia;

  return (
    <View
      style={[styles.container, containerStyle]}
      {...panResponder.panHandlers}
    >
      <StatusBar
        barStyle={
          themeMode === "dark" || showOverlay
            ? "light-content"
            : "dark-content"
        }
      />

      <OnboardingBackground
        currentSlide={currentSlide}
        useCustomBackground={useCustomBackground}
        showOverlay={showOverlay}
        overlayOpacity={overlayOpacity}
        backgroundColor={backgroundColor}
        VideoComponent={VideoComponent}
      />

      {renderHeader ? (
        renderHeader({ isFirstSlide, onBack, onSkip })
      ) : (
        <OnboardingHeader
          isFirstSlide={isFirstSlide}
          onBack={onBack}
          onSkip={onSkip}
          showBackButton={showBackButton}
          showSkipButton={showSkipButton}
          skipButtonText={skipButtonText}
        />
      )}

      {currentSlide && (
        <View style={styles.content}>
          {renderSlide ? (
            renderSlide(currentSlide)
          ) : currentSlide.type === "question" && currentSlide.question ? (
            <QuestionSlide
              slide={currentSlide}
              value={currentAnswer}
              onChange={onAnswerChange}
              variant={variant}
            />
          ) : (
            <OnboardingSlideComponent slide={currentSlide} variant={variant} />
          )}
        </View>
      )}

      {renderFooter ? (
        renderFooter({
          currentIndex,
          totalSlides,
          isLastSlide,
          onNext,
          onUpgrade,
          showPaywallOnComplete,
        })
      ) : (
        <OnboardingFooter
          currentIndex={currentIndex}
          totalSlides={totalSlides}
          isLastSlide={isLastSlide}
          onNext={onNext}
          showProgressBar={showProgressBar}
          showDots={showDots}
          showProgressText={showProgressText}
          disabled={!isAnswerValid}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
