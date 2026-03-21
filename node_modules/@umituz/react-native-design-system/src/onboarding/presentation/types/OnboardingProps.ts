/**
 * Onboarding Screen Content Props
 */

import type React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";
import type { OnboardingAnswerValue } from "../../domain/entities/OnboardingQuestion";

export interface OnboardingScreenContentProps {
  containerStyle?: StyleProp<ViewStyle>;
  useCustomBackground: boolean;
  currentSlide: OnboardingSlide | undefined;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  currentIndex: number;
  totalSlides: number;
  currentAnswer: OnboardingAnswerValue;
  isAnswerValid: boolean;
  showBackButton: boolean;
  showSkipButton: boolean;
  showProgressBar: boolean;
  showDots: boolean;
  showProgressText: boolean;
  skipButtonText?: string;
  nextButtonText?: string;
  getStartedButtonText?: string;
  onBack: () => void;
  onSkip: () => void;
  onNext: () => void;
  onAnswerChange: (value: OnboardingAnswerValue) => void;
  renderHeader?: (props: {
    isFirstSlide: boolean;
    onBack: () => void;
    onSkip: () => void;
  }) => React.ReactNode;
  renderFooter?: (props: {
    currentIndex: number;
    totalSlides: number;
    isLastSlide: boolean;
    onNext: () => void;
    onUpgrade?: () => void;
    showPaywallOnComplete?: boolean;
  }) => React.ReactNode;
  renderSlide?: (slide: OnboardingSlide) => React.ReactNode;
  onUpgrade?: () => void;
  showPaywallOnComplete?: boolean;
  variant?: "default" | "card" | "minimal" | "fullscreen";
  VideoComponent?: React.ComponentType<{ source: unknown; overlayOpacity?: number }>;
}
