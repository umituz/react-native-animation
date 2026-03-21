import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicIcon, AtomicText } from "../../../atoms";
import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";
import { useOnboardingProvider } from "../providers/OnboardingProvider";

export interface QuestionSlideHeaderProps {
  slide: OnboardingSlide;
}

export const QuestionSlideHeader = ({ slide }: QuestionSlideHeaderProps) => {
  const {
    theme: { colors },
  } = useOnboardingProvider();
  const isEmoji = slide.iconType === 'emoji';

  return (
    <View style={styles.container}>
      {!slide.hideIcon && (
        <View style={[
          styles.iconContainer,
          {
            backgroundColor: colors.iconBg,
            borderColor: colors.iconBorder,
          }
        ]}>
          {isEmoji ? (
            <AtomicText style={{ fontSize: 48 }}>{slide.icon}</AtomicText>
          ) : (
            <AtomicIcon name={slide.icon} customSize={48} customColor={colors.textColor} />
          )}
        </View>
      )}

      <AtomicText type="headlineMedium" style={[styles.title, { color: colors.textColor }]}>
        {slide.title}
      </AtomicText>

      {slide.description && (
        <AtomicText type="bodyMedium" style={[styles.description, { color: colors.subTextColor }]}>
          {slide.description}
        </AtomicText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 2,
  },
  title: {
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
});






