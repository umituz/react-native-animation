import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicIcon, AtomicText } from "../../../../atoms";
import { useOnboardingProvider } from "../../providers/OnboardingProvider";
import type { OnboardingQuestion } from "../../../domain/entities/OnboardingQuestion";
import { createMappedArray } from "../../../../utils/arrayUtils";

export interface RatingQuestionProps {
  question: OnboardingQuestion;
  value: number | undefined;
  onChange: (value: number) => void;
}

export const RatingQuestion = ({
  question,
  value = 0,
  onChange,
}: RatingQuestionProps) => {
  const {
    theme: { colors },
  } = useOnboardingProvider();
  const max = question.validation?.max ?? 5;

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {createMappedArray(max, (i) => {
          const isFilled = i < value;
          return (
            <TouchableOpacity
                key={i}
                onPress={() => onChange(i + 1)}
                activeOpacity={0.8}
                style={styles.star}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                accessibilityRole="button"
                accessibilityLabel={`Rate ${i + 1} out of ${max}`}
                accessibilityState={{ selected: isFilled }}
              >
              <AtomicIcon
                name={isFilled ? "star" : "star-outline"}
                customSize={48}
                customColor={isFilled ? colors.iconColor : colors.headerButtonBorder}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {value > 0 && (
        <AtomicText type="headlineSmall" style={[styles.valueText, { color: colors.textColor, marginTop: 12 }]}>
          {value} <AtomicText type="bodyMedium" color="textSecondary">/ {max}</AtomicText>
        </AtomicText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  star: {
    padding: 2,
  },
  valueText: {
    fontWeight: "800",
  },
});


