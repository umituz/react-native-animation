/**
 * BaseSlide Component
 * Single Responsibility: Provide a base layout for all onboarding slides
 */

import React, { useMemo } from "react";
import { View, ScrollView } from "react-native";
import { useResponsive } from "../../../responsive/useResponsive";
import type { ContentPosition } from "../../domain/entities/OnboardingSlide";

export interface BaseSlideProps {
  children: React.ReactNode;
  contentPosition?: ContentPosition;
}

export const BaseSlide = ({
  children,
  contentPosition = "center",
}: BaseSlideProps) => {
  const { verticalPadding, horizontalPadding } = useResponsive();
  const isBottom = contentPosition === "bottom";

  const contentContainerStyle = useMemo(() => ({
    flexGrow: 1,
    paddingVertical: verticalPadding,
    justifyContent: isBottom ? "flex-end" as const : "center" as const,
    paddingBottom: isBottom ? verticalPadding : undefined,
  }), [verticalPadding, isBottom]);

  const slideContainerStyle = useMemo(() => ({
    width: "100%" as const,
    paddingHorizontal: horizontalPadding,
    alignItems: "center" as const,
  }), [horizontalPadding]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={slideContainerStyle}>{children}</View>
    </ScrollView>
  );
};
