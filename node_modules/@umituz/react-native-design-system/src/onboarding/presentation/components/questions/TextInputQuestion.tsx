import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { AtomicText } from "../../../../atoms/AtomicText";
import { useOnboardingProvider } from "../../providers/OnboardingProvider";
import type { OnboardingQuestion } from "../../../domain/entities/OnboardingQuestion";

export interface TextInputQuestionProps {
  question: OnboardingQuestion;
  value: string | undefined;
  onChange: (value: string) => void;
}

export const TextInputQuestion = ({
  question,
  value = "",
  onChange,
}: TextInputQuestionProps) => {
  const {
    theme: { colors },
  } = useOnboardingProvider();
  const { validation } = question;

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.featureItemBg,
            borderColor: value ? colors.iconColor : colors.headerButtonBorder,
            color: colors.textColor,
          }
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={question.placeholder}
        placeholderTextColor={colors.subTextColor}
        maxLength={validation?.maxLength}
        multiline={(validation?.maxLength ?? 0) > 100}
        numberOfLines={(validation?.maxLength ?? 0) > 100 ? 5 : 1}
        autoCapitalize="sentences"
        autoCorrect={true}
        textAlignVertical="top"
      />
      {validation?.maxLength && (
        <AtomicText type="labelSmall" style={[styles.charCount, { color: colors.subTextColor }]}>
          {value.length} / {validation.maxLength}
        </AtomicText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
    borderWidth: 2,
    minHeight: 60,
  },
  charCount: {
    textAlign: "right",
    marginTop: 8,
    fontWeight: "600",
  },
});

