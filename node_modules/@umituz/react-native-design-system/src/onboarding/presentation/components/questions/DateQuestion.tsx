import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { AtomicDatePicker } from "../../../../atoms/AtomicDatePicker";
import { useOnboardingProvider } from "../../providers/OnboardingProvider";
import type { OnboardingQuestion } from "../../../domain/entities/OnboardingQuestion";

export interface DateQuestionProps {
  question: OnboardingQuestion;
  value: string | undefined;
  onChange: (value: string) => void;
}

export const DateQuestion = ({
  question,
  value,
  onChange,
}: DateQuestionProps) => {
  const {
    theme: { colors },
  } = useOnboardingProvider();

  const dateValue = value ? new Date(value) : null;

  const handleChange = useCallback(
    (date: Date) => {
      onChange(date.toISOString());
    },
    [onChange],
  );

  return (
    <View style={styles.container}>
      <AtomicDatePicker
        value={dateValue}
        onChange={handleChange}
        placeholder={question.placeholder}
        maximumDate={new Date()}
        style={[
          styles.picker,
          {
            borderColor: dateValue ? colors.iconColor : colors.headerButtonBorder,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  picker: {
    borderRadius: 16,
    borderWidth: 2,
    overflow: "hidden",
  },
});
