import React, { useMemo, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicIcon, useIconName } from "../../../atoms";
import { AtomicText } from "../../../atoms/AtomicText";
import { useOnboardingProvider } from "../providers/OnboardingProvider";

export interface OnboardingHeaderProps {
  isFirstSlide: boolean;
  onBack: () => void;
  onSkip: () => void;
  showBackButton?: boolean;
  showSkipButton?: boolean;
  skipButtonText?: string;
}

export const OnboardingHeader = React.memo<OnboardingHeaderProps>(({
  isFirstSlide,
  onBack,
  onSkip,
  showBackButton = true,
  showSkipButton = true,
  skipButtonText,
}) => {
  const {
    theme: { colors },
  } = useOnboardingProvider();
  const chevronLeftIcon = useIconName('chevronLeft');

  const handleBack = useCallback(() => {
    if (!isFirstSlide) {
      onBack?.();
    }
  }, [isFirstSlide, onBack]);

  const backButtonStyle = useMemo(
    () => [
      styles.headerButton,
      {
        backgroundColor: colors.headerButtonBg,
        borderColor: colors.headerButtonBorder,
      },
      isFirstSlide && styles.headerButtonDisabled,
    ],
    [colors.headerButtonBg, colors.headerButtonBorder, isFirstSlide]
  );

  const skipTextStyle = useMemo(
    () => [styles.skipText, { color: colors.textColor }],
    [colors.textColor]
  );

  const hitSlop = useMemo(
    () => ({ top: 10, bottom: 10, left: 10, right: 10 }),
    []
  );

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={handleBack}
          disabled={isFirstSlide}
          style={backButtonStyle}
          activeOpacity={0.7}
          hitSlop={hitSlop}
        >
          <AtomicIcon name={chevronLeftIcon} customSize={20} customColor={colors.iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerButton} />
      )}
      {showSkipButton && skipButtonText ? (
        <TouchableOpacity
          onPress={onSkip}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={skipButtonText}
          hitSlop={hitSlop}
        >
          <AtomicText
            type="labelLarge"
            style={skipTextStyle}
          >
            {skipButtonText}
          </AtomicText>
        </TouchableOpacity>
      ) : <View />}
    </View>
  );
});

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  headerButtonDisabled: {
    opacity: 0,
  },
  skipText: {
    fontWeight: "700",
  },
});


