/**
 * OnboardingSlide Component
 * Single Responsibility: Render a single onboarding slide
 */

import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicIcon, useIconName } from "../../../atoms";
import { AtomicText } from "../../../atoms/AtomicText";
import type { OnboardingSlide as OnboardingSlideType } from "../../domain/entities/OnboardingSlide";
import { BaseSlide } from "./BaseSlide";
import { useOnboardingProvider } from "../providers/OnboardingProvider";

export interface OnboardingSlideProps {
  slide: OnboardingSlideType;
  variant?: "default" | "card" | "minimal" | "fullscreen";
}

export const OnboardingSlide = React.memo(({
  slide,
  variant = "default",
}: OnboardingSlideProps) => {
  const {
    theme: { colors },
  } = useOnboardingProvider();
  const checkCircleIcon = useIconName('checkCircle');

  const shouldShowIcon = slide.icon && !slide.hideIcon;
  const isEmoji = slide.iconType === 'emoji';
  const iconSize = variant === "minimal" ? 80 : 72;
  const contentPosition = slide.contentPosition || "center";

  return (
    <BaseSlide contentPosition={contentPosition}>
      {shouldShowIcon && slide.icon && (
        <View style={styles.iconBox}>
          {isEmoji ? (
            <AtomicText style={{ fontSize: iconSize }}>{slide.icon}</AtomicText>
          ) : (
            <AtomicIcon
              name={slide.icon}
              customSize={iconSize}
              customColor={colors.iconColor}
            />
          )}
        </View>
      )}

      <AtomicText
        type="displaySmall"
        style={[styles.title, { color: colors.textColor }]}
      >
        {slide.title}
      </AtomicText>

      {slide.description && (
        <AtomicText
          type="bodyLarge"
          style={[styles.description, { color: colors.subTextColor }]}
        >
          {slide.description}
        </AtomicText>
      )}

      {slide.features && slide.features.length > 0 && (
        <View style={styles.features}>
          {slide.features.map((feature) => (
            <View
              key={feature}
              style={[
                styles.featureItem,
                { backgroundColor: colors.featureItemBg },
              ]}
            >
              <AtomicIcon
                name={checkCircleIcon}
                size="sm"
                customColor={colors.iconColor}
              />
              <AtomicText
                type="bodyMedium"
                style={[styles.featureText, { color: colors.textColor }]}
              >
                {feature}
              </AtomicText>
            </View>
          ))}
        </View>
      )}
    </BaseSlide>
  );
});

const styles = StyleSheet.create({
  iconBox: {
    marginBottom: 32,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  features: {
    width: "100%",
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  featureText: {
    fontWeight: "600",
    flex: 1,
  },
});
