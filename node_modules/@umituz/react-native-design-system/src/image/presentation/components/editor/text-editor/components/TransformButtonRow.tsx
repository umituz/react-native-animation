/**
 * Transform Button Row Component
 *
 * Reusable horizontal scrollable row of transform buttons.
 */

import React from "react";
import { ScrollView, TouchableOpacity, View, type StyleProp, type ViewStyle } from "react-native";
import { AtomicText, AtomicIcon } from "../../../../../../atoms";
import { useAppDesignTokens } from "../../../../../../theme/hooks/useAppDesignTokens";
import { textEditorStyles } from "../TextEditorTabs.styles";

interface TransformButton {
  value: number;
  label: string;
}

interface TransformButtonRowProps {
  title: string;
  buttons: TransformButton[];
  selectedValue: number;
  onSelect: (value: number) => void;
  formatLabel?: (value: number) => string;
  formatTitle?: (selectedValue: number) => string;
  style?: StyleProp<ViewStyle>;
}

export const TransformButtonRow: React.FC<TransformButtonRowProps> = ({
  title,
  buttons,
  selectedValue,
  onSelect,
  formatLabel = (v) => v.toString(),
  formatTitle = (v) => v.toString(),
  style,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={style}>
      <AtomicText
        style={{
          ...tokens.typography.labelMedium,
          marginBottom: tokens.spacing.xs,
        }}
      >
        {title}: {formatTitle(selectedValue)}
      </AtomicText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: tokens.spacing.sm }}
      >
        {buttons.map((button) => {
          const isSelected = selectedValue === button.value;
          return (
            <TouchableOpacity
              key={button.value}
              onPress={() => onSelect(button.value)}
              style={[
                textEditorStyles.transformButton,
                {
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.borders.radius.md,
                  borderWidth: 1,
                  borderColor: isSelected ? tokens.colors.primary : tokens.colors.border,
                  backgroundColor: isSelected ? tokens.colors.primary : tokens.colors.surface,
                },
              ]}
            >
              <AtomicText
                style={{ color: isSelected ? "white" : tokens.colors.textPrimary }}
              >
                {formatLabel(button.value)}
              </AtomicText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

interface DeleteButtonProps {
  onPress: () => void;
  label?: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  onPress,
  label = "Delete Layer",
}) => {
  const tokens = useAppDesignTokens();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        textEditorStyles.deleteButton,
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: tokens.spacing.sm,
          padding: tokens.spacing.md,
          borderRadius: tokens.borders.radius.md,
          borderWidth: 1,
          borderColor: tokens.colors.error,
        },
      ]}
    >
      <AtomicIcon name="trash" size={20} color="error" />
      <AtomicText
        style={{
          ...tokens.typography.labelMedium,
          color: tokens.colors.error,
        }}
      >
        {label}
      </AtomicText>
    </TouchableOpacity>
  );
};
