import React from "react";
import { View, StyleSheet } from "react-native";
import { AtomicText } from "../../../atoms/AtomicText";
import type { OnboardingSlide } from "../../domain/entities/OnboardingSlide";
import type { OnboardingAnswerValue } from "../../domain/entities/OnboardingQuestion";
import { QuestionSlideHeader } from "./QuestionSlideHeader";
import { QuestionRenderer } from "./QuestionRenderer";
import { BaseSlide } from "./BaseSlide";
import { useOnboardingProvider } from "../providers/OnboardingProvider";

export interface QuestionSlideProps {
  slide: OnboardingSlide;
  value: OnboardingAnswerValue;
  onChange: (value: OnboardingAnswerValue) => void;
  variant?: "default" | "card" | "minimal" | "fullscreen";
  fieldRequiredText?: string;
}

export const QuestionSlide = ({
  slide,
  value,
  onChange,
  fieldRequiredText,
}: QuestionSlideProps) => {
  const {
    theme: { colors },
  } = useOnboardingProvider();
  const { question } = slide;

  if (!question) return null;

  return (
    <BaseSlide contentPosition={slide.contentPosition}>
      <QuestionSlideHeader slide={slide} />

      <View style={styles.questionContainer}>
        <QuestionRenderer question={question} value={value} onChange={onChange} />
      </View>

      {question.validation?.required && !value && fieldRequiredText && (
        <AtomicText
          type="labelSmall"
          style={[styles.requiredHint, { color: colors.errorColor }]}
        >
          {fieldRequiredText}
        </AtomicText>
      )}
    </BaseSlide>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    marginTop: 24,
    width: "100%",
  },
  requiredHint: {
    marginTop: 12,
    textAlign: "center",
    fontWeight: "600",
  },
});
