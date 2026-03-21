import React, { useMemo, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AtomicText } from "../../../atoms/AtomicText";
import { useOnboardingProvider } from "../providers/OnboardingProvider";
import { calculateStepProgress } from "../../../utils/math";
import { createMappedArray } from "../../../utils";

export interface OnboardingFooterProps {
  currentIndex: number;
  totalSlides: number;
  isLastSlide: boolean;
  onNext: () => void;
  showProgressBar?: boolean;
  showDots?: boolean;
  showProgressText?: boolean;
  disabled?: boolean;
}

export const OnboardingFooter = React.memo<OnboardingFooterProps>(({
  currentIndex,
  totalSlides,
  isLastSlide,
  onNext,
  showProgressBar = true,
  showDots = true,
  showProgressText = true,
  disabled = false,
}) => {
  const insets = useSafeAreaInsets();
  const { theme: { colors }, translations } = useOnboardingProvider();

  const buttonText = useMemo(
    () => isLastSlide ? translations.getStartedButton : translations.nextButton,
    [isLastSlide, translations.getStartedButton, translations.nextButton]
  );

  const progressPercent = useMemo(
    () => calculateStepProgress(currentIndex + 1, totalSlides),
    [currentIndex, totalSlides]
  );

  const footerStyle = useMemo(
    () => [styles.footer, { paddingBottom: insets.bottom + 24 }],
    [insets.bottom]
  );

  const progressBarBgStyle = useMemo(
    () => [styles.progressBar, { backgroundColor: colors.progressBarBg }],
    [colors.progressBarBg]
  );

  const progressFillStyle = useMemo(
    () => ({
      ...styles.progressFill,
      width: `${progressPercent}%` as `${number}%`,
      backgroundColor: colors.progressFillColor,
    }),
    [progressPercent, colors.progressFillColor]
  );

  const dots = useMemo(
    () => createMappedArray(totalSlides, (index) => {
      const isActive = index === currentIndex;
      return {
        key: index,
        style: [
          styles.dot,
          { backgroundColor: colors.dotColor },
          isActive && {
            width: 12,
            backgroundColor: colors.activeDotColor
          }
        ]
      };
    }),
    [totalSlides, currentIndex, colors.dotColor, colors.activeDotColor]
  );

  const buttonStyle = useMemo(
    () => [
      styles.button,
      {
        backgroundColor: colors.buttonBg,
        opacity: disabled ? 0.5 : 1,
      },
    ],
    [colors.buttonBg, disabled]
  );

  const buttonTextStyle = useMemo(
    () => [styles.buttonText, { color: colors.buttonTextColor }],
    [colors.buttonTextColor]
  );

  const progressTextStyle = useMemo(
    () => [styles.progressText, { color: colors.progressTextColor }],
    [colors.progressTextColor]
  );

  const handlePress = useCallback(() => {
    if (!disabled) {
      onNext();
    }
  }, [disabled, onNext]);

  return (
    <View style={footerStyle}>
      {showProgressBar && (
        <View style={styles.progressContainer}>
          <View style={progressBarBgStyle}>
            <View style={progressFillStyle} />
          </View>
        </View>
      )}

      {showDots && (
        <View style={styles.dots}>
          {dots.map(({ key, style: dotStyle }) => (
            <View key={key} style={dotStyle} />
          ))}
        </View>
      )}

      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={buttonText}
        accessibilityState={{ disabled }}
        style={buttonStyle}
      >
        <AtomicText
          type="labelLarge"
          style={buttonTextStyle}
        >
          {buttonText}
        </AtomicText>
      </TouchableOpacity>

      {showProgressText && (
        <AtomicText
          type="labelSmall"
          style={progressTextStyle}
        >
          {currentIndex + 1} {translations.of} {totalSlides}
        </AtomicText>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  progressText: {
    marginTop: 12,
    textAlign: "center",
  },
  button: {
    width: "100%",
    minHeight: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    fontWeight: "700",
  },
});


