import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicIcon, AtomicText } from "../../../../atoms";
import { useOnboardingProvider } from "../../providers/OnboardingProvider";
import type { OnboardingQuestion, QuestionOption } from "../../../domain/entities/OnboardingQuestion";
import { questionStyles, OPTION_ICON_SIZE, OPTION_EMOJI_SIZE } from "./questionStyles";

export interface SingleChoiceQuestionProps {
  question: OnboardingQuestion;
  value: string | undefined;
  onChange: (value: string) => void;
}

export const SingleChoiceQuestion = ({
  question,
  value,
  onChange,
}: SingleChoiceQuestionProps) => {
  const {
    theme: { colors },
  } = useOnboardingProvider();

  const renderOption = (option: QuestionOption) => {
    const isSelected = value === option.id;
    const isEmoji = option.iconType === 'emoji';

    return (
      <TouchableOpacity
        key={option.id}
        style={[
          questionStyles.option,
          {
            backgroundColor: isSelected ? colors.iconBg : colors.featureItemBg,
            borderColor: isSelected ? colors.iconColor : colors.headerButtonBorder,
            borderWidth: isSelected ? 2 : 1,
          }
        ]}
        onPress={() => onChange(option.id)}
        activeOpacity={0.8}
      >
        {option.icon && (
          <View style={[
            questionStyles.optionIcon,
            { backgroundColor: isSelected ? colors.iconColor : colors.featureItemBg }
          ]}>
            {isEmoji ? (
              <AtomicText style={{ fontSize: OPTION_EMOJI_SIZE }}>{option.icon}</AtomicText>
            ) : (
              <AtomicIcon
                name={option.icon}
                customSize={OPTION_ICON_SIZE}
                customColor={isSelected ? colors.buttonTextColor : colors.subTextColor}
              />
            )}
          </View>
        )}
        <AtomicText type="bodyLarge" style={[questionStyles.optionLabel, { color: isSelected ? colors.textColor : colors.subTextColor, fontWeight: isSelected ? '700' : '500' }]}>
          {option.label}
        </AtomicText>
        <View style={[
          questionStyles.radioOuter,
          { borderColor: isSelected ? colors.iconColor : colors.headerButtonBorder }
        ]}>
          {isSelected && (
            <View style={[questionStyles.radioInner, { backgroundColor: colors.iconColor }]} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[questionStyles.container, { gap: 12 }]}>
      {question.options?.map(renderOption)}
    </View>
  );
};
