/**
 * Question Option Item Component
 * Single Responsibility: Render a single selectable option
 */

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicIcon, AtomicText } from "../../../../atoms";
import type { QuestionOption } from "../../../domain/entities/OnboardingQuestion";
import type { OnboardingColors } from "../../types/OnboardingTheme";
import { questionStyles, OPTION_ICON_SIZE, OPTION_EMOJI_SIZE } from "./questionStyles";

export interface QuestionOptionItemProps {
  option: QuestionOption;
  isSelected: boolean;
  onPress: () => void;
  colors: OnboardingColors;
}

export const QuestionOptionItem = React.memo(({
  option,
  isSelected,
  onPress,
  colors,
}: QuestionOptionItemProps) => {
  const isEmoji = option.iconType === 'emoji';

  return (
    <TouchableOpacity
      style={[
        questionStyles.option,
        {
          backgroundColor: isSelected ? colors.iconBg : colors.featureItemBg,
          borderColor: isSelected ? colors.iconColor : colors.headerButtonBorder,
          borderWidth: isSelected ? 2 : 1,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={option.label}
      accessibilityState={{ selected: isSelected }}
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
      <AtomicText
        type="bodyLarge"
        style={[
          questionStyles.optionLabel,
          {
            color: isSelected ? colors.textColor : colors.subTextColor,
            fontWeight: isSelected ? '700' : '500'
          }
        ]}
      >
        {option.label}
      </AtomicText>
      <View style={[
        questionStyles.checkbox,
        {
          borderColor: isSelected ? colors.iconColor : colors.headerButtonBorder,
          backgroundColor: isSelected ? colors.iconColor : 'transparent',
          borderWidth: isSelected ? 0 : 2,
        }
      ]}>
        {isSelected && (
          <AtomicIcon
            name="checkmark"
            customSize={16}
            customColor={colors.buttonTextColor}
          />
        )}
      </View>
    </TouchableOpacity>
  );
});
